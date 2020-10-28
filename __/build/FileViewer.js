"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || require('react');

module.exports = znui.react.createClass({
  displayName: 'FileViewer',
  getDefaultProps: function getDefaultProps() {
    return {
      valueKey: 'tempName',
      width: 480,
      height: 320
    };
  },
  getInitialState: function getInitialState() {
    return {
      host: this.props.host || zn.setting.path('zr.uploader.host'),
      fullScreen: false,
      files: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      console.log(this.props.value);
      this.initValue(this.props.value);
    }
  },
  initValue: function initValue(value) {
    if (!value) return;

    if (zn.is(value, 'object')) {
      return this.setFile(value), false;
    } else if (zn.is(value, 'string')) {
      var _host = this.state.host,
          _api = this.props.fetchApi || zn.setting.path('zr.uploader.fetchApi');

      _api = _host + _api;
      if (!_api) return console.error("文件验证接口未输入"), false;
      zn.data.get(_api + value).then(function (response) {
        if (zn.is(response, 'array')) {
          this.setFiles(response);
        } else if (zn.is(response, 'object')) {
          if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')) {
            this.setFiles(response.data.result);
          } else {
            console.error("FileViewer.js 网络请求错误: ", response);
          }
        }
      }.bind(this), function () {
        console.error("FileViewer.js 网络请求错误");
      });
    }
  },
  setFile: function setFile(file) {
    this.state.file = file;
    this.forceUpdate();
  },
  __fileDownloadRender: function __fileDownloadRender(file) {
    var _this = this;

    var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
        _api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');

    _api = _host + _api;

    if (_api) {
      return /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return znui.downloadURL(_api + file[_this.props.valueKey], file.name);
        },
        className: "download"
      }, /*#__PURE__*/React.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "download",
        className: "svg-inline--fa fa-download fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
      })));
    }
  },
  __renderFileContent: function __renderFileContent(file) {
    var _view = null,
        _src = '';

    if (file.type.indexOf('image') == 0) {
      _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + (zn.setting.path('zr.uploader.fetchImageApi') || '') + file[this.props.valueKey];
      _view = /*#__PURE__*/React.createElement("img", {
        style: {
          width: '100%',
          height: 'auto'
        },
        className: "view img-view",
        src: _src
      });
    } else if (file.type.indexOf('video') == 0) {
      _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + (zn.setting.path('zr.uploader.fetchImageApi') || '') + file[this.props.valueKey];
      _view = /*#__PURE__*/React.createElement("video", {
        className: "view ideo-view",
        controls: true,
        preload: "auto",
        width: this.props.width,
        height: this.props.height,
        poster: this.props.poster
      }, /*#__PURE__*/React.createElement("source", {
        src: _src,
        type: "video/mp4"
      }), /*#__PURE__*/React.createElement("source", {
        src: _src,
        type: "video/webm"
      }), /*#__PURE__*/React.createElement("p", {
        className: "tips"
      }, "To view this video please enable JavaScript, and consider upgrading to a web browser that", /*#__PURE__*/React.createElement("a", {
        href: "https://videojs.com/html5-video-support/",
        target: "_blank"
      }, "supports HTML5 video")));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "file-view"
    }, _view);
  },
  __fullScreen: function __fullScreen() {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  },
  render: function render() {
    var _this2 = this;

    var file = this.state.file;
    if (!file) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-file-viewer", this.props.className, this.state.fullScreen ? 'full-screen' : ''),
      style: znui.react.style(this.props.style)
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-info"
    }, this.state.fullScreen ? /*#__PURE__*/React.createElement("svg", {
      onClick: this.__fullScreen,
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "window-close",
      className: "svg-inline--fa fa-window-close fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
    })) : /*#__PURE__*/React.createElement("svg", {
      onClick: this.__fullScreen,
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "tv",
      className: "svg-inline--fa fa-tv fa-w-20 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 640 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"
    })), this.__fileDownloadRender(file), /*#__PURE__*/React.createElement("a", {
      className: "link",
      onClick: function onClick() {
        return _this2.__onPreview(file);
      }
    }, file.name), /*#__PURE__*/React.createElement("span", {
      className: "size"
    }, znui.react.stringifyFileSize(+file.size))), this.__renderFileContent(file));
  }
});