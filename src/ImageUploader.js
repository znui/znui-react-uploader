var React = znui.React || require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = React.createClass({
	displayName:'ImageUploader',
	getDefaultProps: function () {
		return {
			value: '',
			compress: {
				maxWidth: 1024,
				maxHeight: 768,
				quality: 1
			}
		};
	},
	getInitialState: function() {
    	return {
			value: this.props.value,
			imageDataURL: null,
			original: null,
			compress: null,
			compressing: false
		};
  	},
	__onChange: function (files, ajaxUploader){
		var _file = files[0];
		if(_file.type.indexOf('image') == -1){
			return alert(_file.name + ' 不是图片文件'), false;
		}
		if(!FileReader || !Image) {
			return alert('浏览器不支持预览功能'), false;
		}

		if(this.props.compress) {
			this.setState({
				compressing: true
			});
			var _self = this,
				_compress = zn.extend({
					maxWidth: 1024,
					maxHeight: 768,
					quality: 1
				}, this.props.compress),
				_imageReader = new FileReader(),
				_img = new Image();
			_imageReader.onload = function (event){
				_img.src = event.target.result;
			};
			_imageReader.readAsDataURL(_file);
			_img.onload = function (){
				_self.state.original = {
					size: znui.react.stringifyFileSize(_file.size),
					width: _img.width,
					height: _img.height
				};
				var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);
				_self.state.imageDataURL = _canvas.toDataURL(_file.type, _compress.quality);
				_canvas.toBlob(function (blob){
					_self.state.compressing = false;
					if(blob){
						_self.state.compress = {
							size: znui.react.stringifyFileSize(blob.size),
							width: _canvas.width,
							height: _canvas.height
						};
						ajaxUploader.submit([
							new File([blob], _file.name, { 
								lastModifiedDate: new Date().getTime(),
								type: _file.type
							})
						]);
					}
					_self.forceUpdate();
				}, _file.type, _compress.quality);
			}

			return false;
		}else{
			var _imageReader = new FileReader();
			_imageReader.onload = function (event){
				this.setState({
					imageDataURL: event.target.result
				});
			}.bind(this);
			_imageReader.readAsDataURL(_file);
		}
	},
	__onComplete: function (data, uploader){
		var _file = data[0];
		if(_file){
			this.setValue(_file[this.props.valueKey || 'savedName']);
		}
		this.props.onComplete && this.props.onComplete(_file, this);
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value }, function (){
			this.props.onChange && this.props.onChange({ value: value }, this);
		}.bind(this));
	},
	__renderImage: function (){
		var _src = this.state.imageDataURL;
		if(!_src){
			_src = this.state.value;
			if(_src && _src.indexOf('http') != 0){
				if(_src.indexOf('/') != -1){
					_src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + _src;
				}else{
					_src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + (zn.setting.path('zr.uploader.fetchImageApi') || '') + _src;
				}
			}
		}
		
		if(_src){
			return <img className="img" src={_src} />;
		}else{
			return <div className="img-upload-icon">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" className="svg-inline--fa fa-image fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>
			</div>;
		}
	},
	render:function(){
		return (
			<AjaxUploader
				{...this.props}
				className={znui.react.classname("zr-image-uploader", this.props.className)}
				onChange={this.__onChange}
				onComplete={this.__onComplete}
				multiple={false} >
				<div className="image-container" style={this.props.style}>
					{this.__renderImage()}
					{
						this.state.compress && <div className="compress-info">
							<div className="original">压缩前：{this.state.original.width} x {this.state.original.height} ({this.state.original.size})</div>
							<div className="compress">压缩后：{this.state.compress.width} x {this.state.compress.height} ({this.state.compress.size})</div>
						</div>
					}
					{
						this.state.compressing && <span className="compressing">压缩中...</span>
					}
				</div>
			</AjaxUploader>
		);
	}
});
