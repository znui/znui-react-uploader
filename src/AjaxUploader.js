var React = znui.React || require('react');
var ReactDOM = znui.ReactDOM || require('react-dom');

module.exports = znui.react.createClass({
	displayName:'AjaxUploader',
	getDefaultProps: function () {
		return {
			name: 'zr_ajax_uploader_file',
			action: '/zxnz.core.fs/upload/files',
			changeSubmit: true,
			hiddens: null,
			multiple: true,
			hint: false,
			maxFileSize: 500 * 1024 * 1024,
			size: ''
		};
	},
	getInitialState: function (){
		return {
			host: this.props.host || zn.setting.path('zr.uploader.host'),
			loading: false,
			progress: 0,
			timeStamp: 0
		};
	},
	__onInputChange: function (event){
		if(this.state.loading){
			return false;
		}
		var _files = event.nativeEvent.target.files,
			_formData = new FormData(),
			_tempFiles = [];
		if(!_files.length){
			return alert('未选择文件');
		}

		for(var i = 0, _len = _files.length; i<_len; i++){
			if(_files[i].size > this.props.maxFileSize){
				alert(_files[i].name + " 文件大小是" + znui.react.stringifyFileSize(_files[i].size)+ ", 不能超过" + znui.react.stringifyFileSize(this.props.maxFileSize));
				return event.nativeEvent.target.form.reset(), false;
			}
			_tempFiles.push(_files[i]);
			_formData.append(this.props.name + '_' + i, _files[i]);
		}
		
		var _result = this.props.onChange && this.props.onChange(_tempFiles, this);
		if(_result!==false && this.props.changeSubmit){
			var _hiddens = this.props.hiddens||{},
				_hidden = null;

			if(zn.is(_result, 'object')){
				zn.extend(_hiddens, _result);
			}

			for(var key in _hiddens){
				_hidden = _hiddens[key];
				if(typeof _hidden == 'object'){
					_hidden = JSON.stringify(_hidden);
				}

				_formData.append(key, _hidden);
			}
			this.ajaxUpload(_formData);
		}
	},
	__onInputClick: function (event){
		if(this.state.loading){
			return false;
		}
		event.stopPropagation();
		this.props.onUploaderClick && this.props.onUploaderClick(event, this);
	},
	ajaxUpload: function (data){
		var _host = this.state.host || zn.setting.path('zr.uploader.uploadHost'),
			_api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi');
		_api = _host + _api;
		if(!_api) return console.error("文件上传接口未输入"), false;
		this.setState({ loading: true });
		var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.__ajaxUploadProgress, false);
		xhr.addEventListener("load", this.__ajaxUploadComplete, false);
		xhr.addEventListener("error", this.__ajaxUploadError, false);
		xhr.addEventListener("abort", this.__ajaxUploadAbort, false);
		xhr.open("POST", _api, "true");
		xhr.send(data);
	},
	__ajaxUploadProgress: function (evt){
		if (evt.lengthComputable) {
			evt.progress = Math.round(evt.loaded * 100 / evt.total);
			this.state.progress = evt.progress;
			this.state.timeStamp = evt.timeStamp;
			this.forceUpdate();
		}
		this.props.onUploading && this.props.onUploading(evt, this);
	},
	__ajaxUploadComplete: function (evt){
		this.reset();
		this.state.progress = 0;
		this.state.timeStamp = 0;
		this.forceUpdate();
		if(evt.target.responseText.indexOf('<!DOCTYPE html>') == 0){
			return alert(evt.target.responseText), false;
		}
		if(evt.target.responseText.indexOf('{') == 0 || evt.target.responseText.indexOf('[') == 0){
			var _data = JSON.parse(evt.target.responseText);
			if(_data.code == 200){
				this.props.onComplete && this.props.onComplete(_data.result, this);
			}else {
				alert(_data.result||_data.message);
				this.props.onError && this.props.onError(_data.result, this);
			}
		}
	},
	__ajaxUploadError: function (event){
		this.reset();
		this.props.onError && this.props.onError(event.message, this);
	},
	__ajaxUploadAbort: function (event){
		this.reset();
		this.props.onAbort && this.props.onAbort(event, this);
	},
	reset: function (){
		this.setState({ loading: false });
		ReactDOM.findDOMNode(this).reset();
	},
	__renderProcess: function (){
		if(this.state.progress){
			if(this.state.progress == 100) {
				return <div className="upload-progress" style={{height: '100%'}}>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="svg-inline--fa fa-check fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
				</div>;
			}else{
				return <div className="upload-progress" style={{height: this.state.progress + '%'}}>
					{this.state.progress + '%'}({(this.state.timeStamp/1000).toFixed(1)}s)
				</div>;
			}
		}
	},
	render: function(){
		var _host = this.state.host || zn.setting.path('zr.uploader.uploadHost'),
			_api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi');
		_api = _host + _api;
		if(!_api) console.error("文件上传接口未输入");
		return (
			<form className={znui.react.classname("zr-ajax-uploader", this.props.className)}
				data-loading={this.state.loading}
				action={_api}
				encType="multipart/form-data"
				method="POST">
				{this.__renderProcess()}
				<div className="ajax-upload-container">{this.props.children}</div>
				{this.props.hint && <span className="size">{this.props.size + ' ' + znui.react.stringifyFileSize(this.props.maxFileSize)}</span>}
				<input multiple={this.props.multiple} className="input" type="file" name={this.props.name||('zr_ajax_uploader_file_' + Date.now())} onChange={this.__onInputChange} onClick={this.__onInputClick} />
				<div className="ajax-upload-icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
				</div>
			</form>
		);
	}
});
