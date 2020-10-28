var React = znui.React || require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = znui.react.createClass({
	displayName:'FileUploader',
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
			host: this.props.host || zn.setting.path('zr.uploader.host'),
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
	initValue: function (value){
		if(!value) return;
		var _host = this.state.host,
			_api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');
		_api = _host + _api;
		if(!_api) return console.error("文件验证接口未输入"), false;
		if(zn.is(value, 'array')){
			value = value.join(',');
		}
		zn.data.get(_api + value).then(function (response){
			if(zn.is(response, 'array')){
				this.setFiles(response);
			}else if(zn.is(response, 'object')){
				if(response.status==200 && typeof response.data == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')){
					this.setFiles(response.data.result);
				}else{
					console.error("网络请求错误: ", response);
				}
			}
		}.bind(this), function (){
			console.error("网络请求错误");
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
	__onFileClick: function (file, index){
		var _return  = this.props.onFileClick && this.props.onFileClick(file, index);
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
	__fileDownloadRender: function (file){
		var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
			_api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');
		_api = _host + _api;
		if(_api){
			return <span onClick={()=>znui.downloadURL(_api + file[this.props.valueKey], file.name)} className="download">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" className="svg-inline--fa fa-download fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
			</span>;
		}
	},
	__renderFiles: function (){
		if(this.state.files){
			var _editable = (this.props.editable && !this.props.disabled && !this.props.readonly);
			return <ul className="file-list">
				{
					this.state.files.map(function (file, index){
						if(file){
							var _temp = this.props.onFileRender && this.props.onFileRender(file, index);
							if(_temp){
								return _temp;
							}
							return <li key={file[this.props.valueKey]} className="file">
								{ _editable && <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" onClick={()=>this.__onRemove(file, index)} className="svg-inline--fa fa-remove zr-hover-self-loading fa-trash-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>}
								{this.__fileDownloadRender(file, index)}
								<a className="link" onClick={()=>this.__onFileClick(file, index)}>{file.name}</a>
								<span className="size">{znui.react.stringifyFileSize(+file.size)}</span>
							</li>;
						}
					}.bind(this))
				}
			</ul>;
		}
	},
	render: function(){
		var _editable = (this.props.editable && !this.props.disabled && !this.props.readonly);
		return (
			<div className={znui.react.classname("zr-file-uploader", this.props.className)}>
				{
					_editable && <AjaxUploader
						{...this.props}
						style={this.props.uploaderStyle}
						onChange={this.__onChange}
						onComplete={this.__onComplete} >
						<div className="upload-container" style={this.props.style}>
							<div className="file-upload-icon">
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" className="svg-inline--fa fa-file-upload fa-w-12 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
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
