var React = znui.React || require('react');
var AjaxUploader = require('./AjaxUploader');
var FileListItem = require('./FileListItem');

module.exports = znui.react.createClass({
	displayName: 'FileUploader',
	getDefaultProps: function (){
		return {
			valueKey: 'tempName',
			editable: true,
			compress: {
				maxWidth: 1024,
				maxHeight: 768,
				quality: 1
			}
		};
	},
	getInitialState: function () {
    	return {
			value: [],
			files: [],
			compressing: false
		};
	  },
	componentDidMount: function (){
		var _return = this.props.didMount && this.props.didMount(this);
		if(_return!==false){
			this.initValue(this.props.value);
		}
	},
	__onChange: function (files, ajaxUploader){
		if(this.props.compress) {
			var _files = [],
				_queue = zn.queue({}, {
					every: function (sender, file){
						_files.push(file);
					},
					finally: function (sender){
						this.setState({
							compressing: false
						});
						ajaxUploader.submit(_files);
					}.bind(this)
				}),
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
			this.setState({
				compressing: true
			});
			for(var file of files){
				if(file.type.indexOf('image') === 0){
					(function (file){
						_queue.push(function (task){
							_imageReader.readAsDataURL(file);
							_img.onload = function (){
								var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);
								_canvas.toBlob(function (blob){
									task.done(new File([blob], file.name, { 
										lastModifiedDate: new Date().getTime(),
										type: file.type
									}));
								}, file.type, _compress.quality);
							}
						});
					})(file);
				} else {
					(function (file){
						_queue.push(function (task){
							task.done(file);
						});
					})(file);
				}
			}
			
			_queue.start();

			return false;
		}

		this.props.onUploaderChange && this.props.onUploaderChange(files, ajaxUploader, this);
	},
	__resolveFileApi: function (){
		var _host = this.state.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
			_api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');
		_api = _host + _api;
		if(!_api) return console.error("文件接口未输入"), false;

		return _api;
	},
	initValue: function (value){
		var _api = this.__resolveFileApi();
		if(!value || !_api) return;
		if(zn.is(value, 'array')){
			value = value.join(',');
		}
		zn.data.get(_api + value).then(function (response){
			var _files = znui.react.resolveArrayResult(response);
			if(_files){
				this.setFiles(_files);
			}else{
				console.error("FileUploader.js - 网络请求错误: ", response);
			}
		}.bind(this), function (err){
			console.error("FileUploader.js - 网络请求错误: ", err);
		});
	},
	__onComplete: function (data, uploader){
		this.setFiles(data);
		this.props.onChange && this.props.onChange({ value: this.state.value }, this);
		this.props.onComplete && this.props.onComplete(data, uploader, this);
	},
	setFiles: function (files){
		var _valueKey = this.props.valueKey;
		var _values = (files||[]).map(function (file){
			if(file && file[_valueKey]){
				return file[_valueKey];
			}
		});
		this.state.value = this.state.value.concat(_values);
		this.state.files = this.state.files.concat(files);
		this.forceUpdate();
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value });
	},
	__editable: function (){
		return (this.props.editable || !this.props.disabled || !this.props.readonly);
	},
	__onRemove: function (file, index){
		this.state.files.splice(index, 1);
		this.state.value.splice(index, 1);
		this.forceUpdate();
		this.props.onChange && this.props.onChange({
			file: file,
			index: index,
			value: this.state.value,
			files: this.state.files
		}, this);
	},
	__renderFiles: function (){
		if(this.state.files && this.state.files.length){
			var _editable = this.__editable();
			return (
				<div className="file-list">
					{
						this.state.files.map((file, index)=>{
							if(file){
								var _temp = this.props.onFileRender && this.props.onFileRender(file, index);
								if(_temp){
									return _temp;
								}
								return <FileListItem key={file[this.props.valueKey]} editable={_editable} data={file} onRemove={()=>this.__onRemove(file, index)} />;
							}
						})
					}
				</div>
			);
		}
	},
	render: function(){
		var _editable = this.__editable();
		return (
			<div className={znui.react.classname("zr-file-uploader", this.props.className)}>
				{
					_editable && <AjaxUploader
						{...this.props}
						style={this.props.uploaderStyle}
						onChange={this.__onChange}
						onComplete={this.__onComplete}>
						<div className="upload-container" style={this.props.style}>
							<div className="file-upload-icon">
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" className="svg-inline--fa fa-file-upload fa-w-12 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
									<path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
								</svg>
								{this.state.compressing && <span className="compressing">压缩中...</span>}
							</div>
						</div>
					</AjaxUploader>
				}
				{this.__renderFiles()}
			</div>
		);
	}
});
