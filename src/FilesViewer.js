var React = znui.React || require('react');
var FileListItem = require('./FileListItem');

module.exports = znui.react.createClass({
	displayName:'FilesViewer',
	getDefaultProps: function (){
		return {
			valueKey: 'tempName',
			width: 480,
			height: 320
		};
	},
	getInitialState: function () {
    	return {
			files: [],
			value: []
		};
	  },
	componentDidMount: function (){
		var _return = this.props.didMount && this.props.didMount(this);
		if(_return!==false){
			this.initValue(this.props.value);
		}
	},
	__resolveFileApi: function (){
		var _host = this.props.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
			_api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');
		_api = _host + _api;

		if(_api) {
			return _api;
		}

		return console.error("文件接口未输入"), false;
	},
	initValue: function (value){
		var _api = this.__resolveFileApi();
		if(!_api || !value) return;

		if(zn.is(value, 'object')) {
			return this.setFiles([value]), false;
		}
		if(zn.is(value, 'array') && value.length && zn.is(value[0], 'object')){
			return this.setFiles(value), false;
		}
		
		if(zn.is(value, 'array')){
			value = value.join(',');
		}
		zn.data.get(_api + value).then(function (response){
			var _files = znui.react.resolveArrayResult(response);
			if(_files){
				this.setFiles(_files);
			}else{
				console.error("FilesViewer.js - 网络请求错误: ", response);
			}
		}.bind(this), function (err){
			console.error("FilesViewer.js - 网络请求错误: ", err);
		});
	},
	setFiles: function (files){
		this.state.files = files;
		this.forceUpdate();
	},
	__renderFiles: function (){
		if(this.state.files){
			return <div className="file-list">
				{
					this.state.files.map(function (file, index){
						if(file){
							var _return = this.props.onFileRender && this.props.onFileRender(file, index, this);
							if(_return){
								return _return;
							}

							return <FileListItem host={this.props.host} key={index} data={file} editable={this.props.editable} />;
						}
					}.bind(this))
				}
			</div>;
		}
	},
	render: function(){
		if(!this.state.files){
			return (
				<div className="zr-file-viewer">
					<i className="fa fa-spinner" />
					<span>加载中 ... </span>
				</div>
			);
		}
		return (
			<div className={znui.react.classname("zr-files-viewer", this.props.className)} style={znui.react.style(this.props.style)}>
				{this.__renderFiles()}
			</div>
		);
	}
});
