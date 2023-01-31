var React = znui.React || require('react');
var PDFObject = require('react-pdfobject').PDFObject; 
var OFFICE_TYPE = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

module.exports = znui.react.createClass({
	displayName:'FileListItem',
	getInitialState: function () {
    	return {
			host: this.props.host,
			fullScreen: false
		};
	},
	__fileDownloadRender: function (file){
		var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
			_api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');
		_api = _host + _api;
		if(_api){
			return (
				<span onClick={()=>znui.downloadURL(_api + file[this.props.valueKey], file.name)} className="download">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" className="svg-inline--fa fa-download fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
				</span>
			);
		}
	},
	__renderFileContent: function (file){
		var _view = null, _src = '';
		if(file.type.indexOf('image') == 0){
			_src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + ('/zxnz.core.fs/fetch/image/') + file[this.props.valueKey || 'tempName'];
			_view = <img style={{ width: '100%', height: 'auto' }} className="view img-view" src={_src} />;
		}else if(file.type.indexOf('video') == 0){
			_src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + ('/zxnz.core.fs/fetch/video.play/') + file[this.props.valueKey || 'tempName'];
			_view = <video
				className="view ideo-view"
				controls
				preload="auto"
				width={this.props.width} 
				height={this.props.height}
				poster={this.props.poster}>
				<source src={_src} type="video/mp4" />
				<source src={_src} type="video/webm" />
				<p className="tips">
					To view this video please enable JavaScript, and consider upgrading to a web browser that
					<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
				</p>
			</video>;
		}else if(OFFICE_TYPE.indexOf(file.ext) != -1){
			_src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + ('/zxnz.core.fs/fetch/readAsPDF/') + file[this.props.valueKey || 'tempName'];
			_view = <PDFObject url={_src} height="100%" />;
		}

		return (
			<div className="file-content" >
				{_view}
			</div>
		);
	},
	__fullScreen: function (){
		this.setState({
			fullScreen: !this.state.fullScreen
		});
	},
	__renderFullscreen: function (){
		if(this.state.fullScreen) {
			return <svg onClick={this.__fullScreen} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" className="svg-inline--fa fa-window-close fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>;
		}

		return <svg onClick={this.__fullScreen} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tv" className="svg-inline--fa fa-tv fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"></path></svg>;
	},
	__fileDownloadRender: function (file){
		var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
			_api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');
		_api = _host + _api;
		if(_api){
			return (
				<span onClick={()=>znui.downloadURL(_api + file[this.props.valueKey], file.name)} className="download">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" className="svg-inline--fa fa-download fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
				</span>
			);
		}
	},
	__onRemove: function (){
		this.props.onRemove && this.props.onRemove(this.props.data);
	},
	render: function(){
		var file = this.props.data;
		return (
			<div className={znui.react.classname("zr-file-list-item", this.props.className, (this.state.fullScreen?'full-screen':''))} style={znui.react.style(this.props.style)}>
				<div className="file-info">
					<div className="item-btns">
						{this.__renderFullscreen()}
						{this.__fileDownloadRender(file)}
					</div>
					<div className="file-detail">
						<a className="link" onClick={()=>this.__onPreview(file)}>{file.name}</a>
						<span className="time">{file.lastModifiedDate}</span>
					</div>
					<div>
						<span className="size">{znui.react.stringifyFileSize(+file.size)}</span>
						{
							this.props.editable && <svg onClick={this.__onRemove} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
							</svg>
						}
					</div>
				</div>
				{
					this.state.fullScreen && this.__renderFileContent(file)
				}
			</div>
		);
	}
});
