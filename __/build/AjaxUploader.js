"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || require('react');

var ReactDOM = znui.ReactDOM || require('react-dom');

module.exports = znui.react.createClass({
  displayName: 'AjaxUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      name: 'zr_ajax_uploader_file',
      action: '/zxnz.core.fs/upload/files',
      types: [],
      changeSubmit: true,
      hiddens: null,
      multiple: true,
      hint: false,
      maxFileSize: 200 * 1024 * 1024,
      size: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      host: this.props.host,
      loading: false,
      files: [],
      progress: 0,
      timeStamp: 0
    };
  },
  __onInputChange: function __onInputChange(event) {
    if (this.state.loading) {
      return false;
    }

    this.state.files = [];
    var _files = event.nativeEvent.target.files,
        _file = null;

    if (!_files.length) {
      return alert('未选择文件');
    }

    for (var i = 0, _len = _files.length; i < _len; i++) {
      _file = _files[i];

      if (_file.size > this.props.maxFileSize) {
        alert(_file.name + " 文件大小是" + znui.react.stringifyFileSize(_file.size) + ", 不能超过" + znui.react.stringifyFileSize(this.props.maxFileSize));
        return event.nativeEvent.target.form.reset(), false;
      }

      if (this.props.types.length) {
        if (this.props.types.indexOf(_file.type.split('/')[0]) == -1) {
          return alert('只支持' + this.props.types.join(',') + '的文件类型'), false;
        }
      }

      this.state.files.push(_file);
    }

    var _result = this.props.onChange && this.props.onChange(this.state.files, this);

    if (_result !== false && this.props.changeSubmit) {
      this.submit(this.state.files, _result);
    }
  },
  __onInputClick: function __onInputClick(event) {
    if (this.state.loading) {
      return false;
    }

    event.stopPropagation();
    this.props.onUploaderClick && this.props.onUploaderClick(event, this);
  },
  __resolveUploadAction: function __resolveUploadAction() {
    var _host = this.state.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
        _api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi') || '';

    if (_api.indexOf('http') != 0 && _api.indexOf('https') != 0) {
      _api = _host + _api;
    }

    if (!_api) return console.error("文件上传接口未输入"), false;
    return _api;
  },
  submit: function submit(files, data) {
    var _file = files || this.state.files,
        _formData = new FormData(),
        _hiddens = this.props.hiddens || {},
        _hidden = null;

    if (zn.is(data, 'object')) {
      zn.extend(_hiddens, data);
    }

    for (var i = 0, _len = _file.length; i < _len; i++) {
      _formData.append(this.props.name + '_' + i, _file[i]);
    }

    for (var key in _hiddens) {
      _hidden = _hiddens[key];

      if (_typeof(_hidden) == 'object') {
        _hidden = JSON.stringify(_hidden);
      }

      _formData.append(key, _hidden);
    }

    this.ajaxUpload(_formData);
  },
  ajaxUpload: function ajaxUpload(data) {
    var _this = this;

    var _api = this.__resolveUploadAction();

    if (!_api) return;
    this.setState({
      loading: true
    });
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (event) {
      return _this.__ajaxUploadProgress(event, xhr);
    }, false);
    xhr.addEventListener("load", function (event) {
      return _this.__ajaxUploadComplete(event, xhr);
    }, false);
    xhr.addEventListener("error", function (event) {
      return _this.__ajaxUploadError(event, xhr);
    }, false);
    xhr.addEventListener("abort", function (event) {
      return _this.__ajaxUploadAbort(event, xhr);
    }, false);
    xhr.open("POST", _api, "true");
    xhr.withCredentials = true;

    if (this.props.responseType) {
      xhr.responseType = 'blob';
    }

    if (this.props.headers) {
      for (var _key in this.props.headers) {
        xhr.setRequestHeader(_key, this.props.headers[_key]);
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.props.onFinished && this.props.onFinished(xhr, this);
      }
    }.bind(this);

    xhr.send(data);
  },
  __ajaxUploadProgress: function __ajaxUploadProgress(evt, xhr) {
    if (evt.lengthComputable) {
      evt.progress = Math.round(evt.loaded * 100 / evt.total);
      this.state.progress = evt.progress;
      this.state.timeStamp = evt.timeStamp;
      this.forceUpdate();
    }

    this.props.onUploading && this.props.onUploading(evt, xhr, this);
  },
  __ajaxUploadComplete: function __ajaxUploadComplete(evt, xhr) {
    this.reset();
    this.state.progress = 0;
    this.state.timeStamp = 0;
    this.forceUpdate();

    if (typeof evt.target.response == 'string' && (evt.target.responseType == 'text' || evt.target.responseType == '')) {
      if (evt.target.responseText.indexOf('<!DOCTYPE html>') == 0) {
        return alert(evt.target.responseText), false;
      }

      if (evt.target.responseText.indexOf('{') == 0 || evt.target.responseText.indexOf('[') == 0) {
        var _data = JSON.parse(evt.target.responseText);

        if (_data.code == 200) {
          this.props.onComplete && this.props.onComplete(_data.result, evt, xhr, this);
        } else {
          zn.error(_data.result || _data.message);
          this.props.onError && this.props.onError(_data.result, evt, xhr, this);
        }
      }
    }
  },
  __ajaxUploadError: function __ajaxUploadError(event, xhr) {
    this.reset();
    this.props.onError && this.props.onError(event.message, xhr, this);
  },
  __ajaxUploadAbort: function __ajaxUploadAbort(event, xhr) {
    this.reset();
    this.props.onAbort && this.props.onAbort(event, xhr, this);
  },
  reset: function reset() {
    this.setState({
      loading: false
    });
    ReactDOM.findDOMNode(this).reset();
  },
  __renderProcess: function __renderProcess() {
    if (this.state.progress) {
      if (this.state.progress == 100) {
        return /*#__PURE__*/React.createElement("div", {
          className: "upload-progress",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "check",
          className: "svg-inline--fa fa-check fa-w-16 ",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512"
        }, /*#__PURE__*/React.createElement("path", {
          fill: "currentColor",
          d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        })));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "upload-progress",
          style: {
            height: this.state.progress + '%'
          }
        }, this.state.progress + '%', "(", (this.state.timeStamp / 1000).toFixed(1), "s)");
      }
    }
  },
  render: function render() {
    var _api = this.__resolveUploadAction();

    if (!_api) return;
    return /*#__PURE__*/React.createElement("form", {
      className: znui.react.classname("zr-ajax-uploader", this.props.className),
      "data-loading": this.state.loading,
      action: _api,
      encType: "multipart/form-data",
      method: "POST"
    }, this.__renderProcess(), /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-container"
    }, this.props.children), this.props.hint && /*#__PURE__*/React.createElement("span", {
      className: "size"
    }, this.props.size + ' ' + znui.react.stringifyFileSize(this.props.maxFileSize)), /*#__PURE__*/React.createElement("input", {
      multiple: this.props.multiple,
      className: "input",
      type: "file",
      name: this.props.name || 'zr_ajax_uploader_file_' + Date.now(),
      onChange: this.__onInputChange,
      onClick: this.__onInputClick
    }), /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "upload",
      className: "svg-inline--fa fa-upload fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
    }))));
  }
});