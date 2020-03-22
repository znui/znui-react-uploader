var React = znui.React || require('react');
var AjaxUploader = require('./AjaxUploader');
var ReactFA = require('@fortawesome/react-fontawesome');
var ReactSVGIcons = require('@fortawesome/free-solid-svg-icons');

module.exports = znui.react.createClass({
	getDefaultProps: function (){
		return {
			editable: true
		};
	},
	getInitialState: function () {
    	return {
			value: ','
		};
  	},
	__onChange: function (files){
		var _file = files[0];
		this.props.onChange && this.props.onChange(_file);
	},
	__onComplete: function (data, uploader){
		var _values = (data||[]).map(function (file){
			return file.url;
		});
		this.state.value = this.state.value + _values.join(',') + ',';
		this.forceUpdate();
		this.props.onComplete && this.props.onComplete(data, uploader);
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value });
	},
	__onPreview: function (item){
		this.props.onPreview && this.props.onPreview(item);
	},
	__renderContent: function (item){
		var _temp = this.props.onFileRender && this.props.onFileRender(item);
		if(_temp){
			return _temp;
		}

		return <a onClick={()=>this.__onPreview(item)}>{this.__renderFileByType(item.split('.').pop().toLowerCase(), item)}</a>;
	},
	__renderPreviewFileByType: function (type, value){
		if(this.props.isImage){
			return <img width="100%" height="100%" src={zn.http.fixURL(value)} />;
		}
		switch (type) {
			case 'jpg':
			case 'png':
			case 'jpeg':
			case 'gif':
				return <img width="100%" height="100%" src={zn.http.fixURL(value)} />;
			case 'mp4':
			case 'mpg':
			case 'mpeg':
			case 'mov':
			case 'ogg':
			case 'avi':
			case 'aac':
			case 'aiff':
			case 'qt':
			case 'viv':
				return <video width="100%" height="100%" preload="auto" loop="loop" autoplay="autoplay" controls="controls">
				  	<source src={zn.http.fixURL(value)} type="video/ogg" />
				  	<source src={zn.http.fixURL(value)} type="video/mp4" />
					Your browser does not support the video tag.
				</video>;
			default:
				return value.split('/').pop();
		}
	},
	__renderFileByType: function (type, value){
		if(this.props.isImage){
			return <img src={zn.http.fixURL(value)} />;
		}
		switch (type) {
			case 'jpg':
			case 'png':
			case 'jpeg':
			case 'gif':
				return <img src={zn.http.fixURL(value)} />;
			case 'mp4':
			case 'mpg':
			case 'mpeg':
			case 'mov':
			case 'ogg':
			case 'avi':
			case 'aac':
			case 'aiff':
			case 'qt':
			case 'viv':
				return <video width="96" height="96">
				  	<source src={zn.http.fixURL(value)} type="video/ogg" />
				  	<source src={zn.http.fixURL(value)} type="video/mp4" />
					Your browser does not support the video tag.
				</video>;
			default:
				return value.split('/').pop();
		}
	},
	__onRemove: function (item, index){
		this.state.value = this.state.value.replace(item, '');
		this.forceUpdate();
	},
	render: function(){
		var _values = this.state.value.split(',');
		var _editable = (this.props.editable && !this.props.disabled && !this.props.readonly);
		return (
			<div className={znui.react.classname("zr-file-uploader", this.props.className)} style={this.props.style}>
				{_editable && <AjaxUploader
					{...this.props}
					style={this.props.uploaderStyle}
					onChange={this.__onChange}
					onComplete={this.__onComplete} >
					<div className="container">
						<div className="file-upload-icon"><ReactFA.FontAwesomeIcon icon={ReactSVGIcons.faFileUpload} /></div>
					</div>
				</AjaxUploader>}
				<ul className="file-list">
					{
						_values.map(function (item, index){
							if(item){
								return <li key={index} className="file">
									{ _editable && <i className="fa fa-remove zr-hover-self-loading" onClick={()=>this.__onRemove(item, index)} />}
									{this.__renderContent(item)}
								</li>;
							}
						}.bind(this))
					}
				</ul>
			</div>
		);
	}
});
