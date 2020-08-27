(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./AjaxUploader.js":
/*!*************************!*\
  !*** ./AjaxUploader.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var ReactDOM = znui.ReactDOM || __webpack_require__(/*! react-dom */ "react-dom");

module.exports = znui.react.createClass({
  displayName: 'AjaxUploader',
  getDefaultProps: function getDefaultProps() {
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
  getInitialState: function getInitialState() {
    return {
      host: this.props.host || zn.setting.path('zr.uploader.host'),
      loading: false,
      progress: 0,
      timeStamp: 0
    };
  },
  __onInputChange: function __onInputChange(event) {
    if (this.state.loading) {
      return false;
    }

    var _files = event.nativeEvent.target.files,
        _formData = new FormData(),
        _tempFiles = [];

    if (!_files.length) {
      return alert('未选择文件');
    }

    for (var i = 0, _len = _files.length; i < _len; i++) {
      if (_files[i].size > this.props.maxFileSize) {
        alert(_files[i].name + " 文件大小是" + znui.react.stringifyFileSize(_files[i].size) + ", 不能超过" + znui.react.stringifyFileSize(this.props.maxFileSize));
        return event.nativeEvent.target.form.reset(), false;
      }

      _tempFiles.push(_files[i]);

      _formData.append(this.props.name + '_' + i, _files[i]);
    }

    var _result = this.props.onChange && this.props.onChange(_tempFiles, this);

    if (_result !== false && this.props.changeSubmit) {
      var _hiddens = this.props.hiddens || {},
          _hidden = null;

      if (zn.is(_result, 'object')) {
        zn.extend(_hiddens, _result);
      }

      for (var key in _hiddens) {
        _hidden = _hiddens[key];

        if (_typeof(_hidden) == 'object') {
          _hidden = JSON.stringify(_hidden);
        }

        _formData.append(key, _hidden);
      }

      this.ajaxUpload(_formData);
    }
  },
  __onInputClick: function __onInputClick(event) {
    if (this.state.loading) {
      return false;
    }

    event.stopPropagation();
    this.props.onUploaderClick && this.props.onUploaderClick(event, this);
  },
  ajaxUpload: function ajaxUpload(data) {
    var _host = this.state.host || zn.setting.path('zr.uploader.uploadHost'),
        _api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi');

    _api = _host + _api;
    if (!_api) return console.error("文件上传接口未输入"), false;
    this.setState({
      loading: true
    });
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", this.__ajaxUploadProgress, false);
    xhr.addEventListener("load", this.__ajaxUploadComplete, false);
    xhr.addEventListener("error", this.__ajaxUploadError, false);
    xhr.addEventListener("abort", this.__ajaxUploadAbort, false);
    xhr.open("POST", _api, "true");
    xhr.send(data);
  },
  __ajaxUploadProgress: function __ajaxUploadProgress(evt) {
    if (evt.lengthComputable) {
      evt.progress = Math.round(evt.loaded * 100 / evt.total);
      this.state.progress = evt.progress;
      this.state.timeStamp = evt.timeStamp;
      this.forceUpdate();
    }

    this.props.onUploading && this.props.onUploading(evt, this);
  },
  __ajaxUploadComplete: function __ajaxUploadComplete(evt) {
    this.reset();
    this.state.progress = 0;
    this.state.timeStamp = 0;
    this.forceUpdate();

    if (evt.target.responseText.indexOf('<!DOCTYPE html>') == 0) {
      return alert(evt.target.responseText), false;
    }

    if (evt.target.responseText.indexOf('{') == 0 || evt.target.responseText.indexOf('[') == 0) {
      var _data = JSON.parse(evt.target.responseText);

      if (_data.code == 200) {
        this.props.onComplete && this.props.onComplete(_data.result, this);
      } else {
        alert(_data.result || _data.message);
        this.props.onError && this.props.onError(_data.result, this);
      }
    }
  },
  __ajaxUploadError: function __ajaxUploadError(event) {
    this.reset();
    this.props.onError && this.props.onError(event.message, this);
  },
  __ajaxUploadAbort: function __ajaxUploadAbort(event) {
    this.reset();
    this.props.onAbort && this.props.onAbort(event, this);
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
    var _host = this.state.host || zn.setting.path('zr.uploader.uploadHost'),
        _api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi');

    _api = _host + _api;
    if (!_api) console.error("文件上传接口未输入");
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

/***/ }),

/***/ "./FileUploader.js":
/*!*************************!*\
  !*** ./FileUploader.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

module.exports = znui.react.createClass({
  displayName: 'FileUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      valueKey: 'tempName',
      editable: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      host: this.props.host || zn.setting.path('zr.uploader.host'),
      value: [],
      files: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      this.initValue(this.props.value);
    }
  },
  __onChange: function __onChange(files, ajaxUploader) {
    this.props.onUploaderChange && this.props.onUploaderChange(files, ajaxUploader, this);
  },
  initValue: function initValue(value) {
    if (!value) return;

    var _host = this.state.host,
        _api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');

    _api = _host + _api;
    if (!_api) return console.error("文件验证接口未输入"), false;

    if (zn.is(value, 'array')) {
      value = value.join(',');
    }

    zn.data.get(_api + value).then(function (response) {
      if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')) {
        this.setFiles(response.data.result);
      } else {
        console.error("网络请求错误");
      }
    }.bind(this), function () {
      console.error("网络请求错误");
    });
  },
  __onComplete: function __onComplete(data, uploader) {
    this.setFiles(data);
    this.props.onChange && this.props.onChange(this.state.value, this);
    this.props.onComplete && this.props.onComplete(data, uploader, this);
  },
  setFiles: function setFiles(files) {
    var _valueKey = this.props.valueKey;

    var _values = (files || []).map(function (file) {
      if (file && file[_valueKey]) {
        return file[_valueKey];
      }
    });

    this.state.value = this.state.value.concat(_values);
    this.state.files = this.state.files.concat(files);
    this.forceUpdate();
  },
  getValue: function getValue() {
    return this.state.value;
  },
  setValue: function setValue(value) {
    this.setState({
      value: value
    });
  },
  __onFileClick: function __onFileClick(file, index) {
    var _return = this.props.onFileClick && this.props.onFileClick(file, index);
  },
  __onRemove: function __onRemove(file, index) {
    this.state.files.splice(index, 1);
    this.state.value.splice(index, 1);
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
  __renderFiles: function __renderFiles() {
    if (this.state.files) {
      var _editable = this.props.editable && !this.props.disabled && !this.props.readonly;

      return /*#__PURE__*/React.createElement("ul", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        var _this2 = this;

        if (file) {
          var _temp = this.props.onFileRender && this.props.onFileRender(file, index);

          if (_temp) {
            return _temp;
          }

          return /*#__PURE__*/React.createElement("li", {
            key: file[this.props.valueKey],
            className: "file"
          }, _editable && /*#__PURE__*/React.createElement("svg", {
            "aria-hidden": "true",
            focusable: "false",
            "data-prefix": "fas",
            "data-icon": "trash-alt",
            onClick: function onClick() {
              return _this2.__onRemove(file, index);
            },
            className: "svg-inline--fa fa-remove zr-hover-self-loading fa-trash-alt fa-w-14 ",
            role: "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 448 512"
          }, /*#__PURE__*/React.createElement("path", {
            fill: "currentColor",
            d: "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
          })), this.__fileDownloadRender(file, index), /*#__PURE__*/React.createElement("a", {
            className: "link",
            onClick: function onClick() {
              return _this2.__onFileClick(file, index);
            }
          }, file.name), /*#__PURE__*/React.createElement("span", {
            className: "size"
          }, znui.react.stringifyFileSize(+file.size)));
        }
      }.bind(this)));
    }
  },
  render: function render() {
    var _editable = this.props.editable && !this.props.disabled && !this.props.readonly;

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-file-uploader", this.props.className)
    }, _editable && /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      style: this.props.uploaderStyle,
      onChange: this.__onChange,
      onComplete: this.__onComplete
    }), /*#__PURE__*/React.createElement("div", {
      className: "upload-container",
      style: this.props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-upload-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "file-upload",
      className: "svg-inline--fa fa-file-upload fa-w-12 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
    }))))), this.__renderFiles());
  }
});

/***/ }),

/***/ "./FileViewer.js":
/*!***********************!*\
  !*** ./FileViewer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

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
        if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'object')) {
          this.setFiles(response.data.result);
        } else {
          console.error("FileViewer.js 网络请求错误");
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
        width: this.props.width,
        height: this.props.height,
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

/***/ }),

/***/ "./FilesViewer.js":
/*!************************!*\
  !*** ./FilesViewer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var FileViewer = __webpack_require__(/*! ./FileViewer */ "./FileViewer.js");

module.exports = znui.react.createClass({
  displayName: 'FilesViewer',
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
      files: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      this.initValue(this.props.value);
    }
  },
  initValue: function initValue(value) {
    if (!value) return;

    if (zn.is(value[0], 'object')) {
      return this.setFiles([value]), false;
    }

    if (zn.is(value, 'array') && value.length && zn.is(value[0], 'object')) {
      return this.setFiles(value), false;
    }

    var _host = this.state.host,
        _api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');

    _api = _host + _api;
    if (!_api) return alert("文件验证接口未输入"), false;

    if (zn.is(value, 'array')) {
      value = value.join(',');
    }

    zn.data.get(_api + value).then(function (response) {
      if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')) {
        this.setFiles(response.data.result);
      } else {
        alert("FilesViewer.js 网络请求错误");
      }
    }.bind(this), function () {
      alert("FilesViewer.js 网络请求错误");
    });
  },
  setFiles: function setFiles(files) {
    this.state.files = files;
    this.forceUpdate();
  },
  __renderFiles: function __renderFiles() {
    if (this.state.files) {
      return /*#__PURE__*/React.createElement("div", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        if (file) {
          var _temp = this.props.onFileRender && this.props.onFileRender(file, index);

          if (_temp) {
            return _temp;
          }

          return /*#__PURE__*/React.createElement(FileViewer, {
            key: index,
            width: this.props.width,
            height: this.props.height,
            value: file,
            valueKey: this.props.valueKey
          });
        }
      }.bind(this)));
    }
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-file-viewer", this.props.className),
      style: znui.react.style(this.props.style)
    }, this.__renderFiles());
  }
});

/***/ }),

/***/ "./ImageUploader.js":
/*!**************************!*\
  !*** ./ImageUploader.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

module.exports = React.createClass({
  displayName: 'ImageUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      value: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      imageDataURL: null
    };
  },
  __onChange: function __onChange(files) {
    var _file = files[0];

    if (_file.type.indexOf('image') == -1) {
      alert(_file.name + ' 不是图片文件');
      return false;
    }

    if (FileReader) {
      var _imageReader = new FileReader();

      _imageReader.onload = function (event) {
        this.setState({
          imageDataURL: event.target.result
        });
      }.bind(this);

      _imageReader.readAsDataURL(_file);
    }
  },
  __onComplete: function __onComplete(data, uploader) {
    var _file = data[0];

    if (_file) {
      this.setValue(_file[this.props.valueKey || 'savedName']);
    }

    this.props.onComplete && this.props.onComplete(_file, this);
  },
  getValue: function getValue() {
    return this.state.value;
  },
  setValue: function setValue(value) {
    this.setState({
      value: value
    }, function () {
      this.props.onChange && this.props.onChange(value, this);
    }.bind(this));
  },
  __renderImage: function __renderImage() {
    var _src = this.state.imageDataURL;

    if (!_src) {
      _src = this.state.value;

      if (_src && _src.indexOf('http') != 0) {
        if (_src.indexOf('/') != -1) {
          _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + _src;
        } else {
          _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + (zn.setting.path('zr.uploader.fetchImageApi') || '') + _src;
        }
      }
    }

    if (_src) {
      return /*#__PURE__*/React.createElement("img", {
        className: "img",
        src: _src
      });
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "img-upload-icon"
      }, /*#__PURE__*/React.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "image",
        className: "svg-inline--fa fa-image fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
      })));
    }
  },
  render: function render() {
    return /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      className: znui.react.classname("zr-image-uploader", this.props.className),
      onChange: this.__onChange,
      onComplete: this.__onComplete,
      multiple: false
    }), /*#__PURE__*/React.createElement("div", {
      className: "image-container",
      style: this.props.style
    }, this.__renderImage()));
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

zn.setting.setKey('zr.uploader', {
  host: '',
  uploadHost: '',
  fetchHost: '',
  downloadHost: '',
  uploadApi: '/zxnz.core.fs/upload/files',
  fetchApi: '/zxnz.core.fs/fetch/file/',
  fetchsApi: '/zxnz.core.fs/fetch/files/',
  fetchImageApi: '/zxnz.core.fs/fetch/image/',
  downloadApi: '/zxnz.core.fs/download/file/'
});
module.exports = {
  AjaxUploader: __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js"),
  FileUploader: __webpack_require__(/*! ./FileUploader */ "./FileUploader.js"),
  FileViewer: __webpack_require__(/*! ./FileViewer */ "./FileViewer.js"),
  FilesViewer: __webpack_require__(/*! ./FilesViewer */ "./FilesViewer.js"),
  ImageUploader: __webpack_require__(/*! ./ImageUploader */ "./ImageUploader.js")
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["ReactDOM"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQWpheFVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL0ZpbGVVcGxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9GaWxlVmlld2VyLmpzIiwid2VicGFjazovLy8uL0ZpbGVzVmlld2VyLmpzIiwid2VicGFjazovLy8uL0ltYWdlVXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIl0sIm5hbWVzIjpbIlJlYWN0Iiwiem51aSIsInJlcXVpcmUiLCJSZWFjdERPTSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWFjdCIsImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJuYW1lIiwiYWN0aW9uIiwiY2hhbmdlU3VibWl0IiwiaGlkZGVucyIsIm11bHRpcGxlIiwiaGludCIsIm1heEZpbGVTaXplIiwic2l6ZSIsImdldEluaXRpYWxTdGF0ZSIsImhvc3QiLCJwcm9wcyIsInpuIiwic2V0dGluZyIsInBhdGgiLCJsb2FkaW5nIiwicHJvZ3Jlc3MiLCJ0aW1lU3RhbXAiLCJfX29uSW5wdXRDaGFuZ2UiLCJldmVudCIsInN0YXRlIiwiX2ZpbGVzIiwibmF0aXZlRXZlbnQiLCJ0YXJnZXQiLCJmaWxlcyIsIl9mb3JtRGF0YSIsIkZvcm1EYXRhIiwiX3RlbXBGaWxlcyIsImxlbmd0aCIsImFsZXJ0IiwiaSIsIl9sZW4iLCJzdHJpbmdpZnlGaWxlU2l6ZSIsImZvcm0iLCJyZXNldCIsInB1c2giLCJhcHBlbmQiLCJfcmVzdWx0Iiwib25DaGFuZ2UiLCJfaGlkZGVucyIsIl9oaWRkZW4iLCJpcyIsImV4dGVuZCIsImtleSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhamF4VXBsb2FkIiwiX19vbklucHV0Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJvblVwbG9hZGVyQ2xpY2siLCJkYXRhIiwiX2hvc3QiLCJfYXBpIiwidXBsb2FkQXBpIiwiY29uc29sZSIsImVycm9yIiwic2V0U3RhdGUiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfX2FqYXhVcGxvYWRQcm9ncmVzcyIsIl9fYWpheFVwbG9hZENvbXBsZXRlIiwiX19hamF4VXBsb2FkRXJyb3IiLCJfX2FqYXhVcGxvYWRBYm9ydCIsIm9wZW4iLCJzZW5kIiwiZXZ0IiwibGVuZ3RoQ29tcHV0YWJsZSIsIk1hdGgiLCJyb3VuZCIsImxvYWRlZCIsInRvdGFsIiwiZm9yY2VVcGRhdGUiLCJvblVwbG9hZGluZyIsInJlc3BvbnNlVGV4dCIsImluZGV4T2YiLCJfZGF0YSIsInBhcnNlIiwiY29kZSIsIm9uQ29tcGxldGUiLCJyZXN1bHQiLCJtZXNzYWdlIiwib25FcnJvciIsIm9uQWJvcnQiLCJmaW5kRE9NTm9kZSIsIl9fcmVuZGVyUHJvY2VzcyIsImhlaWdodCIsInRvRml4ZWQiLCJyZW5kZXIiLCJjbGFzc25hbWUiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIkRhdGUiLCJub3ciLCJBamF4VXBsb2FkZXIiLCJ2YWx1ZUtleSIsImVkaXRhYmxlIiwidmFsdWUiLCJjb21wb25lbnREaWRNb3VudCIsIl9yZXR1cm4iLCJkaWRNb3VudCIsImluaXRWYWx1ZSIsIl9fb25DaGFuZ2UiLCJhamF4VXBsb2FkZXIiLCJvblVwbG9hZGVyQ2hhbmdlIiwiZmV0Y2hzQXBpIiwiam9pbiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsInNldEZpbGVzIiwiYmluZCIsIl9fb25Db21wbGV0ZSIsInVwbG9hZGVyIiwiX3ZhbHVlS2V5IiwiX3ZhbHVlcyIsIm1hcCIsImZpbGUiLCJjb25jYXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiX19vbkZpbGVDbGljayIsImluZGV4Iiwib25GaWxlQ2xpY2siLCJfX29uUmVtb3ZlIiwic3BsaWNlIiwiX19maWxlRG93bmxvYWRSZW5kZXIiLCJkb3dubG9hZEFwaSIsImRvd25sb2FkVVJMIiwiX19yZW5kZXJGaWxlcyIsIl9lZGl0YWJsZSIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJfdGVtcCIsIm9uRmlsZVJlbmRlciIsInVwbG9hZGVyU3R5bGUiLCJzdHlsZSIsIndpZHRoIiwiZnVsbFNjcmVlbiIsImxvZyIsInNldEZpbGUiLCJmZXRjaEFwaSIsIl9fcmVuZGVyRmlsZUNvbnRlbnQiLCJfdmlldyIsIl9zcmMiLCJ0eXBlIiwicG9zdGVyIiwiX19mdWxsU2NyZWVuIiwiX19vblByZXZpZXciLCJGaWxlVmlld2VyIiwiaW1hZ2VEYXRhVVJMIiwiX2ZpbGUiLCJGaWxlUmVhZGVyIiwiX2ltYWdlUmVhZGVyIiwib25sb2FkIiwicmVhZEFzRGF0YVVSTCIsIl9fcmVuZGVySW1hZ2UiLCJzZXRLZXkiLCJ1cGxvYWRIb3N0IiwiZmV0Y2hIb3N0IiwiZG93bmxvYWRIb3N0IiwiZmV0Y2hJbWFnZUFwaSIsIkZpbGVVcGxvYWRlciIsIkZpbGVzVmlld2VyIiwiSW1hZ2VVcGxvYWRlciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSUEsS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBY0UsbUJBQU8sQ0FBQyxvQkFBRCxDQUFqQzs7QUFDQSxJQUFJQyxRQUFRLEdBQUdGLElBQUksQ0FBQ0UsUUFBTCxJQUFpQkQsbUJBQU8sQ0FBQyw0QkFBRCxDQUF2Qzs7QUFFQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSixJQUFJLENBQUNLLEtBQUwsQ0FBV0MsV0FBWCxDQUF1QjtBQUN2Q0MsYUFBVyxFQUFDLGNBRDJCO0FBRXZDQyxpQkFBZSxFQUFFLDJCQUFZO0FBQzVCLFdBQU87QUFDTkMsVUFBSSxFQUFFLHVCQURBO0FBRU5DLFlBQU0sRUFBRSw0QkFGRjtBQUdOQyxrQkFBWSxFQUFFLElBSFI7QUFJTkMsYUFBTyxFQUFFLElBSkg7QUFLTkMsY0FBUSxFQUFFLElBTEo7QUFNTkMsVUFBSSxFQUFFLEtBTkE7QUFPTkMsaUJBQVcsRUFBRSxNQUFNLElBQU4sR0FBYSxJQVBwQjtBQVFOQyxVQUFJLEVBQUU7QUFSQSxLQUFQO0FBVUEsR0Fic0M7QUFjdkNDLGlCQUFlLEVBQUUsMkJBQVc7QUFDM0IsV0FBTztBQUNOQyxVQUFJLEVBQUUsS0FBS0MsS0FBTCxDQUFXRCxJQUFYLElBQW1CRSxFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQixrQkFBaEIsQ0FEbkI7QUFFTkMsYUFBTyxFQUFFLEtBRkg7QUFHTkMsY0FBUSxFQUFFLENBSEo7QUFJTkMsZUFBUyxFQUFFO0FBSkwsS0FBUDtBQU1BLEdBckJzQztBQXNCdkNDLGlCQUFlLEVBQUUseUJBQVVDLEtBQVYsRUFBZ0I7QUFDaEMsUUFBRyxLQUFLQyxLQUFMLENBQVdMLE9BQWQsRUFBc0I7QUFDckIsYUFBTyxLQUFQO0FBQ0E7O0FBQ0QsUUFBSU0sTUFBTSxHQUFHRixLQUFLLENBQUNHLFdBQU4sQ0FBa0JDLE1BQWxCLENBQXlCQyxLQUF0QztBQUFBLFFBQ0NDLFNBQVMsR0FBRyxJQUFJQyxRQUFKLEVBRGI7QUFBQSxRQUVDQyxVQUFVLEdBQUcsRUFGZDs7QUFHQSxRQUFHLENBQUNOLE1BQU0sQ0FBQ08sTUFBWCxFQUFrQjtBQUNqQixhQUFPQyxLQUFLLENBQUMsT0FBRCxDQUFaO0FBQ0E7O0FBRUQsU0FBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxJQUFJLEdBQUdWLE1BQU0sQ0FBQ08sTUFBN0IsRUFBcUNFLENBQUMsR0FBQ0MsSUFBdkMsRUFBNkNELENBQUMsRUFBOUMsRUFBaUQ7QUFDaEQsVUFBR1QsTUFBTSxDQUFDUyxDQUFELENBQU4sQ0FBVXRCLElBQVYsR0FBaUIsS0FBS0csS0FBTCxDQUFXSixXQUEvQixFQUEyQztBQUMxQ3NCLGFBQUssQ0FBQ1IsTUFBTSxDQUFDUyxDQUFELENBQU4sQ0FBVTdCLElBQVYsR0FBaUIsUUFBakIsR0FBNEJULElBQUksQ0FBQ0ssS0FBTCxDQUFXbUMsaUJBQVgsQ0FBNkJYLE1BQU0sQ0FBQ1MsQ0FBRCxDQUFOLENBQVV0QixJQUF2QyxDQUE1QixHQUEwRSxRQUExRSxHQUFxRmhCLElBQUksQ0FBQ0ssS0FBTCxDQUFXbUMsaUJBQVgsQ0FBNkIsS0FBS3JCLEtBQUwsQ0FBV0osV0FBeEMsQ0FBdEYsQ0FBTDtBQUNBLGVBQU9ZLEtBQUssQ0FBQ0csV0FBTixDQUFrQkMsTUFBbEIsQ0FBeUJVLElBQXpCLENBQThCQyxLQUE5QixJQUF1QyxLQUE5QztBQUNBOztBQUNEUCxnQkFBVSxDQUFDUSxJQUFYLENBQWdCZCxNQUFNLENBQUNTLENBQUQsQ0FBdEI7O0FBQ0FMLGVBQVMsQ0FBQ1csTUFBVixDQUFpQixLQUFLekIsS0FBTCxDQUFXVixJQUFYLEdBQWtCLEdBQWxCLEdBQXdCNkIsQ0FBekMsRUFBNENULE1BQU0sQ0FBQ1MsQ0FBRCxDQUFsRDtBQUNBOztBQUVELFFBQUlPLE9BQU8sR0FBRyxLQUFLMUIsS0FBTCxDQUFXMkIsUUFBWCxJQUF1QixLQUFLM0IsS0FBTCxDQUFXMkIsUUFBWCxDQUFvQlgsVUFBcEIsRUFBZ0MsSUFBaEMsQ0FBckM7O0FBQ0EsUUFBR1UsT0FBTyxLQUFHLEtBQVYsSUFBbUIsS0FBSzFCLEtBQUwsQ0FBV1IsWUFBakMsRUFBOEM7QUFDN0MsVUFBSW9DLFFBQVEsR0FBRyxLQUFLNUIsS0FBTCxDQUFXUCxPQUFYLElBQW9CLEVBQW5DO0FBQUEsVUFDQ29DLE9BQU8sR0FBRyxJQURYOztBQUdBLFVBQUc1QixFQUFFLENBQUM2QixFQUFILENBQU1KLE9BQU4sRUFBZSxRQUFmLENBQUgsRUFBNEI7QUFDM0J6QixVQUFFLENBQUM4QixNQUFILENBQVVILFFBQVYsRUFBb0JGLE9BQXBCO0FBQ0E7O0FBRUQsV0FBSSxJQUFJTSxHQUFSLElBQWVKLFFBQWYsRUFBd0I7QUFDdkJDLGVBQU8sR0FBR0QsUUFBUSxDQUFDSSxHQUFELENBQWxCOztBQUNBLFlBQUcsUUFBT0gsT0FBUCxLQUFrQixRQUFyQixFQUE4QjtBQUM3QkEsaUJBQU8sR0FBR0ksSUFBSSxDQUFDQyxTQUFMLENBQWVMLE9BQWYsQ0FBVjtBQUNBOztBQUVEZixpQkFBUyxDQUFDVyxNQUFWLENBQWlCTyxHQUFqQixFQUFzQkgsT0FBdEI7QUFDQTs7QUFDRCxXQUFLTSxVQUFMLENBQWdCckIsU0FBaEI7QUFDQTtBQUNELEdBN0RzQztBQThEdkNzQixnQkFBYyxFQUFFLHdCQUFVNUIsS0FBVixFQUFnQjtBQUMvQixRQUFHLEtBQUtDLEtBQUwsQ0FBV0wsT0FBZCxFQUFzQjtBQUNyQixhQUFPLEtBQVA7QUFDQTs7QUFDREksU0FBSyxDQUFDNkIsZUFBTjtBQUNBLFNBQUtyQyxLQUFMLENBQVdzQyxlQUFYLElBQThCLEtBQUt0QyxLQUFMLENBQVdzQyxlQUFYLENBQTJCOUIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBOUI7QUFDQSxHQXBFc0M7QUFxRXZDMkIsWUFBVSxFQUFFLG9CQUFVSSxJQUFWLEVBQWU7QUFDMUIsUUFBSUMsS0FBSyxHQUFHLEtBQUsvQixLQUFMLENBQVdWLElBQVgsSUFBbUJFLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLHdCQUFoQixDQUEvQjtBQUFBLFFBQ0NzQyxJQUFJLEdBQUcsS0FBS3pDLEtBQUwsQ0FBV1QsTUFBWCxJQUFxQixLQUFLUyxLQUFMLENBQVcwQyxTQUFoQyxJQUE2Q3pDLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLHVCQUFoQixDQURyRDs7QUFFQXNDLFFBQUksR0FBR0QsS0FBSyxHQUFHQyxJQUFmO0FBQ0EsUUFBRyxDQUFDQSxJQUFKLEVBQVUsT0FBT0UsT0FBTyxDQUFDQyxLQUFSLENBQWMsV0FBZCxHQUE0QixLQUFuQztBQUNWLFNBQUtDLFFBQUwsQ0FBYztBQUFFekMsYUFBTyxFQUFFO0FBQVgsS0FBZDtBQUNBLFFBQUkwQyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWO0FBQ01ELE9BQUcsQ0FBQ0UsTUFBSixDQUFXQyxnQkFBWCxDQUE0QixVQUE1QixFQUF3QyxLQUFLQyxvQkFBN0MsRUFBbUUsS0FBbkU7QUFDTkosT0FBRyxDQUFDRyxnQkFBSixDQUFxQixNQUFyQixFQUE2QixLQUFLRSxvQkFBbEMsRUFBd0QsS0FBeEQ7QUFDQUwsT0FBRyxDQUFDRyxnQkFBSixDQUFxQixPQUFyQixFQUE4QixLQUFLRyxpQkFBbkMsRUFBc0QsS0FBdEQ7QUFDQU4sT0FBRyxDQUFDRyxnQkFBSixDQUFxQixPQUFyQixFQUE4QixLQUFLSSxpQkFBbkMsRUFBc0QsS0FBdEQ7QUFDQVAsT0FBRyxDQUFDUSxJQUFKLENBQVMsTUFBVCxFQUFpQmIsSUFBakIsRUFBdUIsTUFBdkI7QUFDQUssT0FBRyxDQUFDUyxJQUFKLENBQVNoQixJQUFUO0FBQ0EsR0FsRnNDO0FBbUZ2Q1csc0JBQW9CLEVBQUUsOEJBQVVNLEdBQVYsRUFBYztBQUNuQyxRQUFJQSxHQUFHLENBQUNDLGdCQUFSLEVBQTBCO0FBQ3pCRCxTQUFHLENBQUNuRCxRQUFKLEdBQWVxRCxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsR0FBRyxDQUFDSSxNQUFKLEdBQWEsR0FBYixHQUFtQkosR0FBRyxDQUFDSyxLQUFsQyxDQUFmO0FBQ0EsV0FBS3BELEtBQUwsQ0FBV0osUUFBWCxHQUFzQm1ELEdBQUcsQ0FBQ25ELFFBQTFCO0FBQ0EsV0FBS0ksS0FBTCxDQUFXSCxTQUFYLEdBQXVCa0QsR0FBRyxDQUFDbEQsU0FBM0I7QUFDQSxXQUFLd0QsV0FBTDtBQUNBOztBQUNELFNBQUs5RCxLQUFMLENBQVcrRCxXQUFYLElBQTBCLEtBQUsvRCxLQUFMLENBQVcrRCxXQUFYLENBQXVCUCxHQUF2QixFQUE0QixJQUE1QixDQUExQjtBQUNBLEdBM0ZzQztBQTRGdkNMLHNCQUFvQixFQUFFLDhCQUFVSyxHQUFWLEVBQWM7QUFDbkMsU0FBS2pDLEtBQUw7QUFDQSxTQUFLZCxLQUFMLENBQVdKLFFBQVgsR0FBc0IsQ0FBdEI7QUFDQSxTQUFLSSxLQUFMLENBQVdILFNBQVgsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLd0QsV0FBTDs7QUFDQSxRQUFHTixHQUFHLENBQUM1QyxNQUFKLENBQVdvRCxZQUFYLENBQXdCQyxPQUF4QixDQUFnQyxpQkFBaEMsS0FBc0QsQ0FBekQsRUFBMkQ7QUFDMUQsYUFBTy9DLEtBQUssQ0FBQ3NDLEdBQUcsQ0FBQzVDLE1BQUosQ0FBV29ELFlBQVosQ0FBTCxFQUFnQyxLQUF2QztBQUNBOztBQUNELFFBQUdSLEdBQUcsQ0FBQzVDLE1BQUosQ0FBV29ELFlBQVgsQ0FBd0JDLE9BQXhCLENBQWdDLEdBQWhDLEtBQXdDLENBQXhDLElBQTZDVCxHQUFHLENBQUM1QyxNQUFKLENBQVdvRCxZQUFYLENBQXdCQyxPQUF4QixDQUFnQyxHQUFoQyxLQUF3QyxDQUF4RixFQUEwRjtBQUN6RixVQUFJQyxLQUFLLEdBQUdqQyxJQUFJLENBQUNrQyxLQUFMLENBQVdYLEdBQUcsQ0FBQzVDLE1BQUosQ0FBV29ELFlBQXRCLENBQVo7O0FBQ0EsVUFBR0UsS0FBSyxDQUFDRSxJQUFOLElBQWMsR0FBakIsRUFBcUI7QUFDcEIsYUFBS3BFLEtBQUwsQ0FBV3FFLFVBQVgsSUFBeUIsS0FBS3JFLEtBQUwsQ0FBV3FFLFVBQVgsQ0FBc0JILEtBQUssQ0FBQ0ksTUFBNUIsRUFBb0MsSUFBcEMsQ0FBekI7QUFDQSxPQUZELE1BRU07QUFDTHBELGFBQUssQ0FBQ2dELEtBQUssQ0FBQ0ksTUFBTixJQUFjSixLQUFLLENBQUNLLE9BQXJCLENBQUw7QUFDQSxhQUFLdkUsS0FBTCxDQUFXd0UsT0FBWCxJQUFzQixLQUFLeEUsS0FBTCxDQUFXd0UsT0FBWCxDQUFtQk4sS0FBSyxDQUFDSSxNQUF6QixFQUFpQyxJQUFqQyxDQUF0QjtBQUNBO0FBQ0Q7QUFDRCxHQTdHc0M7QUE4R3ZDbEIsbUJBQWlCLEVBQUUsMkJBQVU1QyxLQUFWLEVBQWdCO0FBQ2xDLFNBQUtlLEtBQUw7QUFDQSxTQUFLdkIsS0FBTCxDQUFXd0UsT0FBWCxJQUFzQixLQUFLeEUsS0FBTCxDQUFXd0UsT0FBWCxDQUFtQmhFLEtBQUssQ0FBQytELE9BQXpCLEVBQWtDLElBQWxDLENBQXRCO0FBQ0EsR0FqSHNDO0FBa0h2Q2xCLG1CQUFpQixFQUFFLDJCQUFVN0MsS0FBVixFQUFnQjtBQUNsQyxTQUFLZSxLQUFMO0FBQ0EsU0FBS3ZCLEtBQUwsQ0FBV3lFLE9BQVgsSUFBc0IsS0FBS3pFLEtBQUwsQ0FBV3lFLE9BQVgsQ0FBbUJqRSxLQUFuQixFQUEwQixJQUExQixDQUF0QjtBQUNBLEdBckhzQztBQXNIdkNlLE9BQUssRUFBRSxpQkFBVztBQUNqQixTQUFLc0IsUUFBTCxDQUFjO0FBQUV6QyxhQUFPLEVBQUU7QUFBWCxLQUFkO0FBQ0FyQixZQUFRLENBQUMyRixXQUFULENBQXFCLElBQXJCLEVBQTJCbkQsS0FBM0I7QUFDQSxHQXpIc0M7QUEwSHZDb0QsaUJBQWUsRUFBRSwyQkFBVztBQUMzQixRQUFHLEtBQUtsRSxLQUFMLENBQVdKLFFBQWQsRUFBdUI7QUFDdEIsVUFBRyxLQUFLSSxLQUFMLENBQVdKLFFBQVgsSUFBdUIsR0FBMUIsRUFBK0I7QUFDOUIsNEJBQU87QUFBSyxtQkFBUyxFQUFDLGlCQUFmO0FBQWlDLGVBQUssRUFBRTtBQUFDdUUsa0JBQU0sRUFBRTtBQUFUO0FBQXhDLHdCQUNOO0FBQUsseUJBQVksTUFBakI7QUFBd0IsbUJBQVMsRUFBQyxPQUFsQztBQUEwQyx5QkFBWSxLQUF0RDtBQUE0RCx1QkFBVSxPQUF0RTtBQUE4RSxtQkFBUyxFQUFDLGtDQUF4RjtBQUEySCxjQUFJLEVBQUMsS0FBaEk7QUFBc0ksZUFBSyxFQUFDLDRCQUE1STtBQUF5SyxpQkFBTyxFQUFDO0FBQWpMLHdCQUErTDtBQUFNLGNBQUksRUFBQyxjQUFYO0FBQTBCLFdBQUMsRUFBQztBQUE1QixVQUEvTCxDQURNLENBQVA7QUFHQSxPQUpELE1BSUs7QUFDSiw0QkFBTztBQUFLLG1CQUFTLEVBQUMsaUJBQWY7QUFBaUMsZUFBSyxFQUFFO0FBQUNBLGtCQUFNLEVBQUUsS0FBS25FLEtBQUwsQ0FBV0osUUFBWCxHQUFzQjtBQUEvQjtBQUF4QyxXQUNMLEtBQUtJLEtBQUwsQ0FBV0osUUFBWCxHQUFzQixHQURqQixPQUN1QixDQUFDLEtBQUtJLEtBQUwsQ0FBV0gsU0FBWCxHQUFxQixJQUF0QixFQUE0QnVFLE9BQTVCLENBQW9DLENBQXBDLENBRHZCLE9BQVA7QUFHQTtBQUNEO0FBQ0QsR0F0SXNDO0FBdUl2Q0MsUUFBTSxFQUFFLGtCQUFVO0FBQ2pCLFFBQUl0QyxLQUFLLEdBQUcsS0FBSy9CLEtBQUwsQ0FBV1YsSUFBWCxJQUFtQkUsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0Isd0JBQWhCLENBQS9CO0FBQUEsUUFDQ3NDLElBQUksR0FBRyxLQUFLekMsS0FBTCxDQUFXVCxNQUFYLElBQXFCLEtBQUtTLEtBQUwsQ0FBVzBDLFNBQWhDLElBQTZDekMsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0IsdUJBQWhCLENBRHJEOztBQUVBc0MsUUFBSSxHQUFHRCxLQUFLLEdBQUdDLElBQWY7QUFDQSxRQUFHLENBQUNBLElBQUosRUFBVUUsT0FBTyxDQUFDQyxLQUFSLENBQWMsV0FBZDtBQUNWLHdCQUNDO0FBQU0sZUFBUyxFQUFFL0QsSUFBSSxDQUFDSyxLQUFMLENBQVc2RixTQUFYLENBQXFCLGtCQUFyQixFQUF5QyxLQUFLL0UsS0FBTCxDQUFXZ0YsU0FBcEQsQ0FBakI7QUFDQyxzQkFBYyxLQUFLdkUsS0FBTCxDQUFXTCxPQUQxQjtBQUVDLFlBQU0sRUFBRXFDLElBRlQ7QUFHQyxhQUFPLEVBQUMscUJBSFQ7QUFJQyxZQUFNLEVBQUM7QUFKUixPQUtFLEtBQUtrQyxlQUFMLEVBTEYsZUFNQztBQUFLLGVBQVMsRUFBQztBQUFmLE9BQXdDLEtBQUszRSxLQUFMLENBQVdpRixRQUFuRCxDQU5ELEVBT0UsS0FBS2pGLEtBQUwsQ0FBV0wsSUFBWCxpQkFBbUI7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBd0IsS0FBS0ssS0FBTCxDQUFXSCxJQUFYLEdBQWtCLEdBQWxCLEdBQXdCaEIsSUFBSSxDQUFDSyxLQUFMLENBQVdtQyxpQkFBWCxDQUE2QixLQUFLckIsS0FBTCxDQUFXSixXQUF4QyxDQUFoRCxDQVByQixlQVFDO0FBQU8sY0FBUSxFQUFFLEtBQUtJLEtBQUwsQ0FBV04sUUFBNUI7QUFBc0MsZUFBUyxFQUFDLE9BQWhEO0FBQXdELFVBQUksRUFBQyxNQUE3RDtBQUFvRSxVQUFJLEVBQUUsS0FBS00sS0FBTCxDQUFXVixJQUFYLElBQWtCLDJCQUEyQjRGLElBQUksQ0FBQ0MsR0FBTCxFQUF2SDtBQUFvSSxjQUFRLEVBQUUsS0FBSzVFLGVBQW5KO0FBQW9LLGFBQU8sRUFBRSxLQUFLNkI7QUFBbEwsTUFSRCxlQVNDO0FBQUssZUFBUyxFQUFDO0FBQWYsb0JBQ0M7QUFBSyxxQkFBWSxNQUFqQjtBQUF3QixlQUFTLEVBQUMsT0FBbEM7QUFBMEMscUJBQVksS0FBdEQ7QUFBNEQsbUJBQVUsUUFBdEU7QUFBK0UsZUFBUyxFQUFDLG1DQUF6RjtBQUE2SCxVQUFJLEVBQUMsS0FBbEk7QUFBd0ksV0FBSyxFQUFDLDRCQUE5STtBQUEySyxhQUFPLEVBQUM7QUFBbkwsb0JBQWlNO0FBQU0sVUFBSSxFQUFDLGNBQVg7QUFBMEIsT0FBQyxFQUFDO0FBQTVCLE1BQWpNLENBREQsQ0FURCxDQUREO0FBZUE7QUEzSnNDLENBQXZCLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7OztBQ0hBLElBQUl4RCxLQUFLLEdBQUdDLElBQUksQ0FBQ0QsS0FBTCxJQUFjRSxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUNBLElBQUlzRyxZQUFZLEdBQUd0RyxtQkFBTyxDQUFDLHlDQUFELENBQTFCOztBQUVBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJKLElBQUksQ0FBQ0ssS0FBTCxDQUFXQyxXQUFYLENBQXVCO0FBQ3ZDQyxhQUFXLEVBQUMsY0FEMkI7QUFFdkNDLGlCQUFlLEVBQUUsMkJBQVc7QUFDM0IsV0FBTztBQUNOZ0csY0FBUSxFQUFFLFVBREo7QUFFTkMsY0FBUSxFQUFFO0FBRkosS0FBUDtBQUlBLEdBUHNDO0FBUXZDeEYsaUJBQWUsRUFBRSwyQkFBWTtBQUN6QixXQUFPO0FBQ1RDLFVBQUksRUFBRSxLQUFLQyxLQUFMLENBQVdELElBQVgsSUFBbUJFLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLGtCQUFoQixDQURoQjtBQUVUb0YsV0FBSyxFQUFFLEVBRkU7QUFHVDFFLFdBQUssRUFBRTtBQUhFLEtBQVA7QUFLRCxHQWRvQztBQWV2QzJFLG1CQUFpQixFQUFFLDZCQUFXO0FBQzdCLFFBQUlDLE9BQU8sR0FBRyxLQUFLekYsS0FBTCxDQUFXMEYsUUFBWCxJQUF1QixLQUFLMUYsS0FBTCxDQUFXMEYsUUFBWCxDQUFvQixJQUFwQixDQUFyQzs7QUFDQSxRQUFHRCxPQUFPLEtBQUcsS0FBYixFQUFtQjtBQUNsQixXQUFLRSxTQUFMLENBQWUsS0FBSzNGLEtBQUwsQ0FBV3VGLEtBQTFCO0FBQ0E7QUFDRCxHQXBCc0M7QUFxQnZDSyxZQUFVLEVBQUUsb0JBQVUvRSxLQUFWLEVBQWlCZ0YsWUFBakIsRUFBOEI7QUFDekMsU0FBSzdGLEtBQUwsQ0FBVzhGLGdCQUFYLElBQStCLEtBQUs5RixLQUFMLENBQVc4RixnQkFBWCxDQUE0QmpGLEtBQTVCLEVBQW1DZ0YsWUFBbkMsRUFBaUQsSUFBakQsQ0FBL0I7QUFDQSxHQXZCc0M7QUF3QnZDRixXQUFTLEVBQUUsbUJBQVVKLEtBQVYsRUFBZ0I7QUFDMUIsUUFBRyxDQUFDQSxLQUFKLEVBQVc7O0FBQ1gsUUFBSS9DLEtBQUssR0FBRyxLQUFLL0IsS0FBTCxDQUFXVixJQUF2QjtBQUFBLFFBQ0MwQyxJQUFJLEdBQUcsS0FBS3pDLEtBQUwsQ0FBVytGLFNBQVgsSUFBd0I5RixFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQix1QkFBaEIsQ0FEaEM7O0FBRUFzQyxRQUFJLEdBQUdELEtBQUssR0FBR0MsSUFBZjtBQUNBLFFBQUcsQ0FBQ0EsSUFBSixFQUFVLE9BQU9FLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFdBQWQsR0FBNEIsS0FBbkM7O0FBQ1YsUUFBRzNDLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXlELEtBQU4sRUFBYSxPQUFiLENBQUgsRUFBeUI7QUFDeEJBLFdBQUssR0FBR0EsS0FBSyxDQUFDUyxJQUFOLENBQVcsR0FBWCxDQUFSO0FBQ0E7O0FBQ0QvRixNQUFFLENBQUNzQyxJQUFILENBQVEwRCxHQUFSLENBQVl4RCxJQUFJLEdBQUc4QyxLQUFuQixFQUEwQlcsSUFBMUIsQ0FBK0IsVUFBVUMsUUFBVixFQUFtQjtBQUNqRCxVQUFHQSxRQUFRLENBQUNDLE1BQVQsSUFBaUIsR0FBakIsSUFBd0IsUUFBT0QsUUFBUSxDQUFDNUQsSUFBaEIsS0FBd0IsUUFBaEQsSUFBNEQ0RCxRQUFRLENBQUM1RCxJQUFULENBQWM2QixJQUFkLElBQXNCLEdBQWxGLElBQXlGbkUsRUFBRSxDQUFDNkIsRUFBSCxDQUFNcUUsUUFBUSxDQUFDNUQsSUFBVCxDQUFjK0IsTUFBcEIsRUFBNEIsT0FBNUIsQ0FBNUYsRUFBaUk7QUFDaEksYUFBSytCLFFBQUwsQ0FBY0YsUUFBUSxDQUFDNUQsSUFBVCxDQUFjK0IsTUFBNUI7QUFDQSxPQUZELE1BRUs7QUFDSjNCLGVBQU8sQ0FBQ0MsS0FBUixDQUFjLFFBQWQ7QUFDQTtBQUNELEtBTjhCLENBTTdCMEQsSUFONkIsQ0FNeEIsSUFOd0IsQ0FBL0IsRUFNYyxZQUFXO0FBQ3hCM0QsYUFBTyxDQUFDQyxLQUFSLENBQWMsUUFBZDtBQUNBLEtBUkQ7QUFTQSxHQTFDc0M7QUEyQ3ZDMkQsY0FBWSxFQUFFLHNCQUFVaEUsSUFBVixFQUFnQmlFLFFBQWhCLEVBQXlCO0FBQ3RDLFNBQUtILFFBQUwsQ0FBYzlELElBQWQ7QUFDQSxTQUFLdkMsS0FBTCxDQUFXMkIsUUFBWCxJQUF1QixLQUFLM0IsS0FBTCxDQUFXMkIsUUFBWCxDQUFvQixLQUFLbEIsS0FBTCxDQUFXOEUsS0FBL0IsRUFBc0MsSUFBdEMsQ0FBdkI7QUFDQSxTQUFLdkYsS0FBTCxDQUFXcUUsVUFBWCxJQUF5QixLQUFLckUsS0FBTCxDQUFXcUUsVUFBWCxDQUFzQjlCLElBQXRCLEVBQTRCaUUsUUFBNUIsRUFBc0MsSUFBdEMsQ0FBekI7QUFDQSxHQS9Dc0M7QUFnRHZDSCxVQUFRLEVBQUUsa0JBQVV4RixLQUFWLEVBQWdCO0FBQ3pCLFFBQUk0RixTQUFTLEdBQUcsS0FBS3pHLEtBQUwsQ0FBV3FGLFFBQTNCOztBQUNBLFFBQUlxQixPQUFPLEdBQUcsQ0FBQzdGLEtBQUssSUFBRSxFQUFSLEVBQVk4RixHQUFaLENBQWdCLFVBQVVDLElBQVYsRUFBZTtBQUM1QyxVQUFHQSxJQUFJLElBQUlBLElBQUksQ0FBQ0gsU0FBRCxDQUFmLEVBQTJCO0FBQzFCLGVBQU9HLElBQUksQ0FBQ0gsU0FBRCxDQUFYO0FBQ0E7QUFDRCxLQUphLENBQWQ7O0FBS0EsU0FBS2hHLEtBQUwsQ0FBVzhFLEtBQVgsR0FBbUIsS0FBSzlFLEtBQUwsQ0FBVzhFLEtBQVgsQ0FBaUJzQixNQUFqQixDQUF3QkgsT0FBeEIsQ0FBbkI7QUFDQSxTQUFLakcsS0FBTCxDQUFXSSxLQUFYLEdBQW1CLEtBQUtKLEtBQUwsQ0FBV0ksS0FBWCxDQUFpQmdHLE1BQWpCLENBQXdCaEcsS0FBeEIsQ0FBbkI7QUFDQSxTQUFLaUQsV0FBTDtBQUNBLEdBMURzQztBQTJEdkNnRCxVQUFRLEVBQUUsb0JBQVc7QUFDcEIsV0FBTyxLQUFLckcsS0FBTCxDQUFXOEUsS0FBbEI7QUFDQSxHQTdEc0M7QUE4RHZDd0IsVUFBUSxFQUFFLGtCQUFVeEIsS0FBVixFQUFnQjtBQUN6QixTQUFLMUMsUUFBTCxDQUFjO0FBQUUwQyxXQUFLLEVBQUVBO0FBQVQsS0FBZDtBQUNBLEdBaEVzQztBQWlFdkN5QixlQUFhLEVBQUUsdUJBQVVKLElBQVYsRUFBZ0JLLEtBQWhCLEVBQXNCO0FBQ3BDLFFBQUl4QixPQUFPLEdBQUksS0FBS3pGLEtBQUwsQ0FBV2tILFdBQVgsSUFBMEIsS0FBS2xILEtBQUwsQ0FBV2tILFdBQVgsQ0FBdUJOLElBQXZCLEVBQTZCSyxLQUE3QixDQUF6QztBQUNBLEdBbkVzQztBQW9FdkNFLFlBQVUsRUFBRSxvQkFBVVAsSUFBVixFQUFnQkssS0FBaEIsRUFBc0I7QUFDakMsU0FBS3hHLEtBQUwsQ0FBV0ksS0FBWCxDQUFpQnVHLE1BQWpCLENBQXdCSCxLQUF4QixFQUErQixDQUEvQjtBQUNBLFNBQUt4RyxLQUFMLENBQVc4RSxLQUFYLENBQWlCNkIsTUFBakIsQ0FBd0JILEtBQXhCLEVBQStCLENBQS9CO0FBQ0EsU0FBS25ELFdBQUw7QUFDQSxHQXhFc0M7QUF5RXZDdUQsc0JBQW9CLEVBQUUsOEJBQVVULElBQVYsRUFBZTtBQUFBOztBQUNwQyxRQUFJcEUsS0FBSyxHQUFHLEtBQUsvQixLQUFMLENBQVdWLElBQVgsSUFBbUJFLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLDBCQUFoQixDQUEvQjtBQUFBLFFBQ0NzQyxJQUFJLEdBQUcsS0FBS3pDLEtBQUwsQ0FBV3NILFdBQVgsSUFBMEJySCxFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQix5QkFBaEIsQ0FEbEM7O0FBRUFzQyxRQUFJLEdBQUdELEtBQUssR0FBR0MsSUFBZjs7QUFDQSxRQUFHQSxJQUFILEVBQVE7QUFDUCwwQkFBTztBQUFNLGVBQU8sRUFBRTtBQUFBLGlCQUFJNUQsSUFBSSxDQUFDMEksV0FBTCxDQUFpQjlFLElBQUksR0FBR21FLElBQUksQ0FBQyxLQUFJLENBQUM1RyxLQUFMLENBQVdxRixRQUFaLENBQTVCLEVBQW1EdUIsSUFBSSxDQUFDdEgsSUFBeEQsQ0FBSjtBQUFBLFNBQWY7QUFBa0YsaUJBQVMsRUFBQztBQUE1RixzQkFDTjtBQUFLLHVCQUFZLE1BQWpCO0FBQXdCLGlCQUFTLEVBQUMsT0FBbEM7QUFBMEMsdUJBQVksS0FBdEQ7QUFBNEQscUJBQVUsVUFBdEU7QUFBaUYsaUJBQVMsRUFBQyxxQ0FBM0Y7QUFBaUksWUFBSSxFQUFDLEtBQXRJO0FBQTRJLGFBQUssRUFBQyw0QkFBbEo7QUFBK0ssZUFBTyxFQUFDO0FBQXZMLHNCQUFxTTtBQUFNLFlBQUksRUFBQyxjQUFYO0FBQTBCLFNBQUMsRUFBQztBQUE1QixRQUFyTSxDQURNLENBQVA7QUFHQTtBQUNELEdBbEZzQztBQW1GdkNrSSxlQUFhLEVBQUUseUJBQVc7QUFDekIsUUFBRyxLQUFLL0csS0FBTCxDQUFXSSxLQUFkLEVBQW9CO0FBQ25CLFVBQUk0RyxTQUFTLEdBQUksS0FBS3pILEtBQUwsQ0FBV3NGLFFBQVgsSUFBdUIsQ0FBQyxLQUFLdEYsS0FBTCxDQUFXMEgsUUFBbkMsSUFBK0MsQ0FBQyxLQUFLMUgsS0FBTCxDQUFXMkgsUUFBNUU7O0FBQ0EsMEJBQU87QUFBSSxpQkFBUyxFQUFDO0FBQWQsU0FFTCxLQUFLbEgsS0FBTCxDQUFXSSxLQUFYLENBQWlCOEYsR0FBakIsQ0FBcUIsVUFBVUMsSUFBVixFQUFnQkssS0FBaEIsRUFBc0I7QUFBQTs7QUFDMUMsWUFBR0wsSUFBSCxFQUFRO0FBQ1AsY0FBSWdCLEtBQUssR0FBRyxLQUFLNUgsS0FBTCxDQUFXNkgsWUFBWCxJQUEyQixLQUFLN0gsS0FBTCxDQUFXNkgsWUFBWCxDQUF3QmpCLElBQXhCLEVBQThCSyxLQUE5QixDQUF2Qzs7QUFDQSxjQUFHVyxLQUFILEVBQVM7QUFDUixtQkFBT0EsS0FBUDtBQUNBOztBQUNELDhCQUFPO0FBQUksZUFBRyxFQUFFaEIsSUFBSSxDQUFDLEtBQUs1RyxLQUFMLENBQVdxRixRQUFaLENBQWI7QUFBb0MscUJBQVMsRUFBQztBQUE5QyxhQUNKb0MsU0FBUyxpQkFBSTtBQUFLLDJCQUFZLE1BQWpCO0FBQXdCLHFCQUFTLEVBQUMsT0FBbEM7QUFBMEMsMkJBQVksS0FBdEQ7QUFBNEQseUJBQVUsV0FBdEU7QUFBa0YsbUJBQU8sRUFBRTtBQUFBLHFCQUFJLE1BQUksQ0FBQ04sVUFBTCxDQUFnQlAsSUFBaEIsRUFBc0JLLEtBQXRCLENBQUo7QUFBQSxhQUEzRjtBQUE2SCxxQkFBUyxFQUFDLHNFQUF2STtBQUE4TSxnQkFBSSxFQUFDLEtBQW5OO0FBQXlOLGlCQUFLLEVBQUMsNEJBQS9OO0FBQTRQLG1CQUFPLEVBQUM7QUFBcFEsMEJBQWtSO0FBQU0sZ0JBQUksRUFBQyxjQUFYO0FBQTBCLGFBQUMsRUFBQztBQUE1QixZQUFsUixDQURULEVBRUwsS0FBS0ksb0JBQUwsQ0FBMEJULElBQTFCLEVBQWdDSyxLQUFoQyxDQUZLLGVBR047QUFBRyxxQkFBUyxFQUFDLE1BQWI7QUFBb0IsbUJBQU8sRUFBRTtBQUFBLHFCQUFJLE1BQUksQ0FBQ0QsYUFBTCxDQUFtQkosSUFBbkIsRUFBeUJLLEtBQXpCLENBQUo7QUFBQTtBQUE3QixhQUFtRUwsSUFBSSxDQUFDdEgsSUFBeEUsQ0FITSxlQUlOO0FBQU0scUJBQVMsRUFBQztBQUFoQixhQUF3QlQsSUFBSSxDQUFDSyxLQUFMLENBQVdtQyxpQkFBWCxDQUE2QixDQUFDdUYsSUFBSSxDQUFDL0csSUFBbkMsQ0FBeEIsQ0FKTSxDQUFQO0FBTUE7QUFDRCxPQWJvQixDQWFuQnlHLElBYm1CLENBYWQsSUFiYyxDQUFyQixDQUZLLENBQVA7QUFrQkE7QUFDRCxHQXpHc0M7QUEwR3ZDeEIsUUFBTSxFQUFFLGtCQUFVO0FBQ2pCLFFBQUkyQyxTQUFTLEdBQUksS0FBS3pILEtBQUwsQ0FBV3NGLFFBQVgsSUFBdUIsQ0FBQyxLQUFLdEYsS0FBTCxDQUFXMEgsUUFBbkMsSUFBK0MsQ0FBQyxLQUFLMUgsS0FBTCxDQUFXMkgsUUFBNUU7O0FBQ0Esd0JBQ0M7QUFBSyxlQUFTLEVBQUU5SSxJQUFJLENBQUNLLEtBQUwsQ0FBVzZGLFNBQVgsQ0FBcUIsa0JBQXJCLEVBQXlDLEtBQUsvRSxLQUFMLENBQVdnRixTQUFwRDtBQUFoQixPQUVFeUMsU0FBUyxpQkFBSSxvQkFBQyxZQUFELGVBQ1IsS0FBS3pILEtBREc7QUFFWixXQUFLLEVBQUUsS0FBS0EsS0FBTCxDQUFXOEgsYUFGTjtBQUdaLGNBQVEsRUFBRSxLQUFLbEMsVUFISDtBQUlaLGdCQUFVLEVBQUUsS0FBS1c7QUFKTCxxQkFLWjtBQUFLLGVBQVMsRUFBQyxrQkFBZjtBQUFrQyxXQUFLLEVBQUUsS0FBS3ZHLEtBQUwsQ0FBVytIO0FBQXBELG9CQUNDO0FBQUssZUFBUyxFQUFDO0FBQWYsb0JBQ0M7QUFBSyxxQkFBWSxNQUFqQjtBQUF3QixlQUFTLEVBQUMsT0FBbEM7QUFBMEMscUJBQVksS0FBdEQ7QUFBNEQsbUJBQVUsYUFBdEU7QUFBb0YsZUFBUyxFQUFDLHdDQUE5RjtBQUF1SSxVQUFJLEVBQUMsS0FBNUk7QUFBa0osV0FBSyxFQUFDLDRCQUF4SjtBQUFxTCxhQUFPLEVBQUM7QUFBN0wsb0JBQTJNO0FBQU0sVUFBSSxFQUFDLGNBQVg7QUFBMEIsT0FBQyxFQUFDO0FBQTVCLE1BQTNNLENBREQsQ0FERCxDQUxZLENBRmYsRUFjRSxLQUFLUCxhQUFMLEVBZEYsQ0FERDtBQWtCQTtBQTlIc0MsQ0FBdkIsQ0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ0hBLElBQUk1SSxLQUFLLEdBQUdDLElBQUksQ0FBQ0QsS0FBTCxJQUFjRSxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUVBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJKLElBQUksQ0FBQ0ssS0FBTCxDQUFXQyxXQUFYLENBQXVCO0FBQ3ZDQyxhQUFXLEVBQUMsWUFEMkI7QUFFdkNDLGlCQUFlLEVBQUUsMkJBQVc7QUFDM0IsV0FBTztBQUNOZ0csY0FBUSxFQUFFLFVBREo7QUFFTjJDLFdBQUssRUFBRSxHQUZEO0FBR05wRCxZQUFNLEVBQUU7QUFIRixLQUFQO0FBS0EsR0FSc0M7QUFTdkM5RSxpQkFBZSxFQUFFLDJCQUFZO0FBQ3pCLFdBQU87QUFDVEMsVUFBSSxFQUFFLEtBQUtDLEtBQUwsQ0FBV0QsSUFBWCxJQUFtQkUsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0Isa0JBQWhCLENBRGhCO0FBRVQ4SCxnQkFBVSxFQUFFLEtBRkg7QUFHVHBILFdBQUssRUFBRTtBQUhFLEtBQVA7QUFLRCxHQWZvQztBQWdCdkMyRSxtQkFBaUIsRUFBRSw2QkFBVztBQUM3QixRQUFJQyxPQUFPLEdBQUcsS0FBS3pGLEtBQUwsQ0FBVzBGLFFBQVgsSUFBdUIsS0FBSzFGLEtBQUwsQ0FBVzBGLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBckM7O0FBQ0EsUUFBR0QsT0FBTyxLQUFHLEtBQWIsRUFBbUI7QUFDbEI5QyxhQUFPLENBQUN1RixHQUFSLENBQVksS0FBS2xJLEtBQUwsQ0FBV3VGLEtBQXZCO0FBQ0EsV0FBS0ksU0FBTCxDQUFlLEtBQUszRixLQUFMLENBQVd1RixLQUExQjtBQUNBO0FBQ0QsR0F0QnNDO0FBdUJ2Q0ksV0FBUyxFQUFFLG1CQUFVSixLQUFWLEVBQWdCO0FBQzFCLFFBQUcsQ0FBQ0EsS0FBSixFQUFXOztBQUNYLFFBQUd0RixFQUFFLENBQUM2QixFQUFILENBQU15RCxLQUFOLEVBQWEsUUFBYixDQUFILEVBQTJCO0FBQzFCLGFBQU8sS0FBSzRDLE9BQUwsQ0FBYTVDLEtBQWIsR0FBcUIsS0FBNUI7QUFDQSxLQUZELE1BRU0sSUFBR3RGLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXlELEtBQU4sRUFBYSxRQUFiLENBQUgsRUFBMEI7QUFDL0IsVUFBSS9DLEtBQUssR0FBRyxLQUFLL0IsS0FBTCxDQUFXVixJQUF2QjtBQUFBLFVBQ0MwQyxJQUFJLEdBQUcsS0FBS3pDLEtBQUwsQ0FBV29JLFFBQVgsSUFBdUJuSSxFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQixzQkFBaEIsQ0FEL0I7O0FBRUFzQyxVQUFJLEdBQUdELEtBQUssR0FBR0MsSUFBZjtBQUNBLFVBQUcsQ0FBQ0EsSUFBSixFQUFVLE9BQU9FLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFdBQWQsR0FBNEIsS0FBbkM7QUFDVjNDLFFBQUUsQ0FBQ3NDLElBQUgsQ0FBUTBELEdBQVIsQ0FBWXhELElBQUksR0FBRzhDLEtBQW5CLEVBQTBCVyxJQUExQixDQUErQixVQUFVQyxRQUFWLEVBQW1CO0FBQ2pELFlBQUdBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFpQixHQUFqQixJQUF3QixRQUFPRCxRQUFRLENBQUM1RCxJQUFoQixLQUF3QixRQUFoRCxJQUE0RDRELFFBQVEsQ0FBQzVELElBQVQsQ0FBYzZCLElBQWQsSUFBc0IsR0FBbEYsSUFBeUZuRSxFQUFFLENBQUM2QixFQUFILENBQU1xRSxRQUFRLENBQUM1RCxJQUFULENBQWMrQixNQUFwQixFQUE0QixRQUE1QixDQUE1RixFQUFrSTtBQUNqSSxlQUFLK0IsUUFBTCxDQUFjRixRQUFRLENBQUM1RCxJQUFULENBQWMrQixNQUE1QjtBQUNBLFNBRkQsTUFFSztBQUNKM0IsaUJBQU8sQ0FBQ0MsS0FBUixDQUFjLHNCQUFkO0FBQ0E7QUFDRCxPQU44QixDQU03QjBELElBTjZCLENBTXhCLElBTndCLENBQS9CLEVBTWMsWUFBVztBQUN4QjNELGVBQU8sQ0FBQ0MsS0FBUixDQUFjLHNCQUFkO0FBQ0EsT0FSRDtBQVNBO0FBQ0QsR0ExQ3NDO0FBMkN2Q3VGLFNBQU8sRUFBRSxpQkFBVXZCLElBQVYsRUFBZTtBQUN2QixTQUFLbkcsS0FBTCxDQUFXbUcsSUFBWCxHQUFrQkEsSUFBbEI7QUFDQSxTQUFLOUMsV0FBTDtBQUNBLEdBOUNzQztBQStDdkN1RCxzQkFBb0IsRUFBRSw4QkFBVVQsSUFBVixFQUFlO0FBQUE7O0FBQ3BDLFFBQUlwRSxLQUFLLEdBQUcsS0FBSy9CLEtBQUwsQ0FBV1YsSUFBWCxJQUFtQkUsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0IsMEJBQWhCLENBQS9CO0FBQUEsUUFDQ3NDLElBQUksR0FBRyxLQUFLekMsS0FBTCxDQUFXc0gsV0FBWCxJQUEwQnJILEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLHlCQUFoQixDQURsQzs7QUFFQXNDLFFBQUksR0FBR0QsS0FBSyxHQUFHQyxJQUFmOztBQUNBLFFBQUdBLElBQUgsRUFBUTtBQUNQLDBCQUFPO0FBQU0sZUFBTyxFQUFFO0FBQUEsaUJBQUk1RCxJQUFJLENBQUMwSSxXQUFMLENBQWlCOUUsSUFBSSxHQUFHbUUsSUFBSSxDQUFDLEtBQUksQ0FBQzVHLEtBQUwsQ0FBV3FGLFFBQVosQ0FBNUIsRUFBbUR1QixJQUFJLENBQUN0SCxJQUF4RCxDQUFKO0FBQUEsU0FBZjtBQUFrRixpQkFBUyxFQUFDO0FBQTVGLHNCQUNOO0FBQUssdUJBQVksTUFBakI7QUFBd0IsaUJBQVMsRUFBQyxPQUFsQztBQUEwQyx1QkFBWSxLQUF0RDtBQUE0RCxxQkFBVSxVQUF0RTtBQUFpRixpQkFBUyxFQUFDLHFDQUEzRjtBQUFpSSxZQUFJLEVBQUMsS0FBdEk7QUFBNEksYUFBSyxFQUFDLDRCQUFsSjtBQUErSyxlQUFPLEVBQUM7QUFBdkwsc0JBQXFNO0FBQU0sWUFBSSxFQUFDLGNBQVg7QUFBMEIsU0FBQyxFQUFDO0FBQTVCLFFBQXJNLENBRE0sQ0FBUDtBQUdBO0FBQ0QsR0F4RHNDO0FBeUR2QytJLHFCQUFtQixFQUFFLDZCQUFVekIsSUFBVixFQUFlO0FBQ25DLFFBQUkwQixLQUFLLEdBQUcsSUFBWjtBQUFBLFFBQ0NDLElBQUksR0FBRyxFQURSOztBQUVBLFFBQUczQixJQUFJLENBQUM0QixJQUFMLENBQVV2RSxPQUFWLENBQWtCLE9BQWxCLEtBQThCLENBQWpDLEVBQW1DO0FBQ2xDc0UsVUFBSSxHQUFHLENBQUMsS0FBS3ZJLEtBQUwsQ0FBV0QsSUFBWCxJQUFtQkUsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0Isa0JBQWhCLENBQW5CLElBQTBELEVBQTNELEtBQWtFRixFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQiwyQkFBaEIsS0FBZ0QsRUFBbEgsSUFBd0h5RyxJQUFJLENBQUMsS0FBSzVHLEtBQUwsQ0FBV3FGLFFBQVosQ0FBbkk7QUFDQWlELFdBQUssZ0JBQUc7QUFBSyxhQUFLLEVBQUUsS0FBS3RJLEtBQUwsQ0FBV2dJLEtBQXZCO0FBQThCLGNBQU0sRUFBRSxLQUFLaEksS0FBTCxDQUFXNEUsTUFBakQ7QUFBeUQsaUJBQVMsRUFBQyxlQUFuRTtBQUFtRixXQUFHLEVBQUUyRDtBQUF4RixRQUFSO0FBQ0EsS0FIRCxNQUdNLElBQUczQixJQUFJLENBQUM0QixJQUFMLENBQVV2RSxPQUFWLENBQWtCLE9BQWxCLEtBQThCLENBQWpDLEVBQW1DO0FBQ3hDc0UsVUFBSSxHQUFHLENBQUMsS0FBS3ZJLEtBQUwsQ0FBV0QsSUFBWCxJQUFtQkUsRUFBRSxDQUFDQyxPQUFILENBQVdDLElBQVgsQ0FBZ0Isa0JBQWhCLENBQW5CLElBQTBELEVBQTNELEtBQWtFRixFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQiwyQkFBaEIsS0FBZ0QsRUFBbEgsSUFBd0h5RyxJQUFJLENBQUMsS0FBSzVHLEtBQUwsQ0FBV3FGLFFBQVosQ0FBbkk7QUFDQWlELFdBQUssZ0JBQUc7QUFDUCxpQkFBUyxFQUFDLGdCQURIO0FBRVAsZ0JBQVEsTUFGRDtBQUdQLGVBQU8sRUFBQyxNQUhEO0FBSVAsYUFBSyxFQUFFLEtBQUt0SSxLQUFMLENBQVdnSSxLQUpYO0FBS1AsY0FBTSxFQUFFLEtBQUtoSSxLQUFMLENBQVc0RSxNQUxaO0FBTVAsY0FBTSxFQUFFLEtBQUs1RSxLQUFMLENBQVd5STtBQU5aLHNCQU9QO0FBQVEsV0FBRyxFQUFFRixJQUFiO0FBQW1CLFlBQUksRUFBQztBQUF4QixRQVBPLGVBUVA7QUFBUSxXQUFHLEVBQUVBLElBQWI7QUFBbUIsWUFBSSxFQUFDO0FBQXhCLFFBUk8sZUFTUDtBQUFHLGlCQUFTLEVBQUM7QUFBYixtSEFFQztBQUFHLFlBQUksRUFBQywwQ0FBUjtBQUFtRCxjQUFNLEVBQUM7QUFBMUQsZ0NBRkQsQ0FUTyxDQUFSO0FBY0E7O0FBQ0Qsd0JBQU87QUFBSyxlQUFTLEVBQUM7QUFBZixPQUNMRCxLQURLLENBQVA7QUFHQSxHQW5Gc0M7QUFvRnZDSSxjQUFZLEVBQUUsd0JBQVc7QUFDeEIsU0FBSzdGLFFBQUwsQ0FBYztBQUNib0YsZ0JBQVUsRUFBRSxDQUFDLEtBQUt4SCxLQUFMLENBQVd3SDtBQURYLEtBQWQ7QUFHQSxHQXhGc0M7QUF5RnZDbkQsUUFBTSxFQUFFLGtCQUFVO0FBQUE7O0FBQ2pCLFFBQUk4QixJQUFJLEdBQUcsS0FBS25HLEtBQUwsQ0FBV21HLElBQXRCO0FBQ0EsUUFBRyxDQUFDQSxJQUFKLEVBQVUsT0FBTyxJQUFQO0FBQ1Ysd0JBQ0M7QUFBSyxlQUFTLEVBQUUvSCxJQUFJLENBQUNLLEtBQUwsQ0FBVzZGLFNBQVgsQ0FBcUIsZ0JBQXJCLEVBQXVDLEtBQUsvRSxLQUFMLENBQVdnRixTQUFsRCxFQUE4RCxLQUFLdkUsS0FBTCxDQUFXd0gsVUFBWCxHQUFzQixhQUF0QixHQUFvQyxFQUFsRyxDQUFoQjtBQUF3SCxXQUFLLEVBQUVwSixJQUFJLENBQUNLLEtBQUwsQ0FBVzZJLEtBQVgsQ0FBaUIsS0FBSy9ILEtBQUwsQ0FBVytILEtBQTVCO0FBQS9ILG9CQUNDO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FFRSxLQUFLdEgsS0FBTCxDQUFXd0gsVUFBWCxnQkFBd0I7QUFBSyxhQUFPLEVBQUUsS0FBS1MsWUFBbkI7QUFBaUMscUJBQVksTUFBN0M7QUFBb0QsZUFBUyxFQUFDLE9BQTlEO0FBQXNFLHFCQUFZLEtBQWxGO0FBQXdGLG1CQUFVLGNBQWxHO0FBQWlILGVBQVMsRUFBQyx5Q0FBM0g7QUFBcUssVUFBSSxFQUFDLEtBQTFLO0FBQWdMLFdBQUssRUFBQyw0QkFBdEw7QUFBbU4sYUFBTyxFQUFDO0FBQTNOLG9CQUF5TztBQUFNLFVBQUksRUFBQyxjQUFYO0FBQTBCLE9BQUMsRUFBQztBQUE1QixNQUF6TyxDQUF4QixnQkFBcXVCO0FBQUssYUFBTyxFQUFFLEtBQUtBLFlBQW5CO0FBQWlDLHFCQUFZLE1BQTdDO0FBQW9ELGVBQVMsRUFBQyxPQUE5RDtBQUFzRSxxQkFBWSxLQUFsRjtBQUF3RixtQkFBVSxJQUFsRztBQUF1RyxlQUFTLEVBQUMsK0JBQWpIO0FBQWlKLFVBQUksRUFBQyxLQUF0SjtBQUE0SixXQUFLLEVBQUMsNEJBQWxLO0FBQStMLGFBQU8sRUFBQztBQUF2TSxvQkFBcU47QUFBTSxVQUFJLEVBQUMsY0FBWDtBQUEwQixPQUFDLEVBQUM7QUFBNUIsTUFBck4sQ0FGdnVCLEVBSUUsS0FBS3JCLG9CQUFMLENBQTBCVCxJQUExQixDQUpGLGVBS0M7QUFBRyxlQUFTLEVBQUMsTUFBYjtBQUFvQixhQUFPLEVBQUU7QUFBQSxlQUFJLE1BQUksQ0FBQytCLFdBQUwsQ0FBaUIvQixJQUFqQixDQUFKO0FBQUE7QUFBN0IsT0FBMERBLElBQUksQ0FBQ3RILElBQS9ELENBTEQsZUFNQztBQUFNLGVBQVMsRUFBQztBQUFoQixPQUF3QlQsSUFBSSxDQUFDSyxLQUFMLENBQVdtQyxpQkFBWCxDQUE2QixDQUFDdUYsSUFBSSxDQUFDL0csSUFBbkMsQ0FBeEIsQ0FORCxDQURELEVBU0UsS0FBS3dJLG1CQUFMLENBQXlCekIsSUFBekIsQ0FURixDQUREO0FBYUE7QUF6R3NDLENBQXZCLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7QUNGQSxJQUFJaEksS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBY0UsbUJBQU8sQ0FBQyxvQkFBRCxDQUFqQzs7QUFDQSxJQUFJOEosVUFBVSxHQUFHOUosbUJBQU8sQ0FBQyxxQ0FBRCxDQUF4Qjs7QUFFQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSixJQUFJLENBQUNLLEtBQUwsQ0FBV0MsV0FBWCxDQUF1QjtBQUN2Q0MsYUFBVyxFQUFDLGFBRDJCO0FBRXZDQyxpQkFBZSxFQUFFLDJCQUFXO0FBQzNCLFdBQU87QUFDTmdHLGNBQVEsRUFBRSxVQURKO0FBRU4yQyxXQUFLLEVBQUUsR0FGRDtBQUdOcEQsWUFBTSxFQUFFO0FBSEYsS0FBUDtBQUtBLEdBUnNDO0FBU3ZDOUUsaUJBQWUsRUFBRSwyQkFBWTtBQUN6QixXQUFPO0FBQ1RDLFVBQUksRUFBRSxLQUFLQyxLQUFMLENBQVdELElBQVgsSUFBbUJFLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLGtCQUFoQixDQURoQjtBQUVUVSxXQUFLLEVBQUU7QUFGRSxLQUFQO0FBSUQsR0Fkb0M7QUFldkMyRSxtQkFBaUIsRUFBRSw2QkFBVztBQUM3QixRQUFJQyxPQUFPLEdBQUcsS0FBS3pGLEtBQUwsQ0FBVzBGLFFBQVgsSUFBdUIsS0FBSzFGLEtBQUwsQ0FBVzBGLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBckM7O0FBQ0EsUUFBR0QsT0FBTyxLQUFHLEtBQWIsRUFBbUI7QUFDbEIsV0FBS0UsU0FBTCxDQUFlLEtBQUszRixLQUFMLENBQVd1RixLQUExQjtBQUNBO0FBQ0QsR0FwQnNDO0FBcUJ2Q0ksV0FBUyxFQUFFLG1CQUFVSixLQUFWLEVBQWdCO0FBQzFCLFFBQUcsQ0FBQ0EsS0FBSixFQUFXOztBQUNYLFFBQUd0RixFQUFFLENBQUM2QixFQUFILENBQU15RCxLQUFLLENBQUMsQ0FBRCxDQUFYLEVBQWdCLFFBQWhCLENBQUgsRUFBOEI7QUFDN0IsYUFBTyxLQUFLYyxRQUFMLENBQWMsQ0FBQ2QsS0FBRCxDQUFkLEdBQXdCLEtBQS9CO0FBQ0E7O0FBQ0QsUUFBR3RGLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXlELEtBQU4sRUFBYSxPQUFiLEtBQXlCQSxLQUFLLENBQUN0RSxNQUEvQixJQUF5Q2hCLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXlELEtBQUssQ0FBQyxDQUFELENBQVgsRUFBZ0IsUUFBaEIsQ0FBNUMsRUFBc0U7QUFDckUsYUFBTyxLQUFLYyxRQUFMLENBQWNkLEtBQWQsR0FBc0IsS0FBN0I7QUFDQTs7QUFDRCxRQUFJL0MsS0FBSyxHQUFHLEtBQUsvQixLQUFMLENBQVdWLElBQXZCO0FBQUEsUUFDQzBDLElBQUksR0FBRyxLQUFLekMsS0FBTCxDQUFXK0YsU0FBWCxJQUF3QjlGLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLHVCQUFoQixDQURoQzs7QUFFQXNDLFFBQUksR0FBR0QsS0FBSyxHQUFHQyxJQUFmO0FBQ0EsUUFBRyxDQUFDQSxJQUFKLEVBQVUsT0FBT3ZCLEtBQUssQ0FBQyxXQUFELENBQUwsRUFBb0IsS0FBM0I7O0FBQ1YsUUFBR2pCLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXlELEtBQU4sRUFBYSxPQUFiLENBQUgsRUFBeUI7QUFDeEJBLFdBQUssR0FBR0EsS0FBSyxDQUFDUyxJQUFOLENBQVcsR0FBWCxDQUFSO0FBQ0E7O0FBQ0QvRixNQUFFLENBQUNzQyxJQUFILENBQVEwRCxHQUFSLENBQVl4RCxJQUFJLEdBQUc4QyxLQUFuQixFQUEwQlcsSUFBMUIsQ0FBK0IsVUFBVUMsUUFBVixFQUFtQjtBQUNqRCxVQUFHQSxRQUFRLENBQUNDLE1BQVQsSUFBaUIsR0FBakIsSUFBd0IsUUFBT0QsUUFBUSxDQUFDNUQsSUFBaEIsS0FBd0IsUUFBaEQsSUFBNEQ0RCxRQUFRLENBQUM1RCxJQUFULENBQWM2QixJQUFkLElBQXNCLEdBQWxGLElBQXlGbkUsRUFBRSxDQUFDNkIsRUFBSCxDQUFNcUUsUUFBUSxDQUFDNUQsSUFBVCxDQUFjK0IsTUFBcEIsRUFBNEIsT0FBNUIsQ0FBNUYsRUFBaUk7QUFDaEksYUFBSytCLFFBQUwsQ0FBY0YsUUFBUSxDQUFDNUQsSUFBVCxDQUFjK0IsTUFBNUI7QUFDQSxPQUZELE1BRUs7QUFDSnBELGFBQUssQ0FBQyx1QkFBRCxDQUFMO0FBQ0E7QUFDRCxLQU44QixDQU03Qm9GLElBTjZCLENBTXhCLElBTndCLENBQS9CLEVBTWMsWUFBVztBQUN4QnBGLFdBQUssQ0FBQyx1QkFBRCxDQUFMO0FBQ0EsS0FSRDtBQVNBLEdBN0NzQztBQThDdkNtRixVQUFRLEVBQUUsa0JBQVV4RixLQUFWLEVBQWdCO0FBQ3pCLFNBQUtKLEtBQUwsQ0FBV0ksS0FBWCxHQUFtQkEsS0FBbkI7QUFDQSxTQUFLaUQsV0FBTDtBQUNBLEdBakRzQztBQWtEdkMwRCxlQUFhLEVBQUUseUJBQVc7QUFDekIsUUFBRyxLQUFLL0csS0FBTCxDQUFXSSxLQUFkLEVBQW9CO0FBQ25CLDBCQUFPO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBRUwsS0FBS0osS0FBTCxDQUFXSSxLQUFYLENBQWlCOEYsR0FBakIsQ0FBcUIsVUFBVUMsSUFBVixFQUFnQkssS0FBaEIsRUFBc0I7QUFDMUMsWUFBR0wsSUFBSCxFQUFRO0FBQ1AsY0FBSWdCLEtBQUssR0FBRyxLQUFLNUgsS0FBTCxDQUFXNkgsWUFBWCxJQUEyQixLQUFLN0gsS0FBTCxDQUFXNkgsWUFBWCxDQUF3QmpCLElBQXhCLEVBQThCSyxLQUE5QixDQUF2Qzs7QUFDQSxjQUFHVyxLQUFILEVBQVM7QUFDUixtQkFBT0EsS0FBUDtBQUNBOztBQUNELDhCQUFPLG9CQUFDLFVBQUQ7QUFBWSxlQUFHLEVBQUVYLEtBQWpCO0FBQXdCLGlCQUFLLEVBQUUsS0FBS2pILEtBQUwsQ0FBV2dJLEtBQTFDO0FBQWlELGtCQUFNLEVBQUUsS0FBS2hJLEtBQUwsQ0FBVzRFLE1BQXBFO0FBQTRFLGlCQUFLLEVBQUVnQyxJQUFuRjtBQUF5RixvQkFBUSxFQUFFLEtBQUs1RyxLQUFMLENBQVdxRjtBQUE5RyxZQUFQO0FBQ0E7QUFDRCxPQVJvQixDQVFuQmlCLElBUm1CLENBUWQsSUFSYyxDQUFyQixDQUZLLENBQVA7QUFhQTtBQUNELEdBbEVzQztBQW1FdkN4QixRQUFNLEVBQUUsa0JBQVU7QUFDakIsd0JBQ0M7QUFBSyxlQUFTLEVBQUVqRyxJQUFJLENBQUNLLEtBQUwsQ0FBVzZGLFNBQVgsQ0FBcUIsZ0JBQXJCLEVBQXVDLEtBQUsvRSxLQUFMLENBQVdnRixTQUFsRCxDQUFoQjtBQUE4RSxXQUFLLEVBQUVuRyxJQUFJLENBQUNLLEtBQUwsQ0FBVzZJLEtBQVgsQ0FBaUIsS0FBSy9ILEtBQUwsQ0FBVytILEtBQTVCO0FBQXJGLE9BQ0UsS0FBS1AsYUFBTCxFQURGLENBREQ7QUFLQTtBQXpFc0MsQ0FBdkIsQ0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ0hBLElBQUk1SSxLQUFLLEdBQUdDLElBQUksQ0FBQ0QsS0FBTCxJQUFjRSxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUNBLElBQUlzRyxZQUFZLEdBQUd0RyxtQkFBTyxDQUFDLHlDQUFELENBQTFCOztBQUVBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJMLEtBQUssQ0FBQ08sV0FBTixDQUFrQjtBQUNsQ0MsYUFBVyxFQUFDLGVBRHNCO0FBRWxDQyxpQkFBZSxFQUFFLDJCQUFZO0FBQzVCLFdBQU87QUFDTmtHLFdBQUssRUFBRTtBQURELEtBQVA7QUFHQSxHQU5pQztBQU9sQ3pGLGlCQUFlLEVBQUUsMkJBQVc7QUFDeEIsV0FBTztBQUNUeUYsV0FBSyxFQUFFLEtBQUt2RixLQUFMLENBQVd1RixLQURUO0FBRVRzRCxrQkFBWSxFQUFFO0FBRkwsS0FBUDtBQUlELEdBWitCO0FBYWxDakQsWUFBVSxFQUFFLG9CQUFVL0UsS0FBVixFQUFnQjtBQUMzQixRQUFJaUksS0FBSyxHQUFHakksS0FBSyxDQUFDLENBQUQsQ0FBakI7O0FBQ0EsUUFBR2lJLEtBQUssQ0FBQ04sSUFBTixDQUFXdkUsT0FBWCxDQUFtQixPQUFuQixLQUE2QixDQUFDLENBQWpDLEVBQW1DO0FBQ2xDL0MsV0FBSyxDQUFDNEgsS0FBSyxDQUFDeEosSUFBTixHQUFhLFNBQWQsQ0FBTDtBQUNBLGFBQU8sS0FBUDtBQUNBOztBQUNELFFBQUd5SixVQUFILEVBQWM7QUFDYixVQUFJQyxZQUFZLEdBQUcsSUFBSUQsVUFBSixFQUFuQjs7QUFDQUMsa0JBQVksQ0FBQ0MsTUFBYixHQUFzQixVQUFVekksS0FBVixFQUFnQjtBQUNyQyxhQUFLcUMsUUFBTCxDQUFjO0FBQ2JnRyxzQkFBWSxFQUFFckksS0FBSyxDQUFDSSxNQUFOLENBQWEwRDtBQURkLFNBQWQ7QUFHQSxPQUpxQixDQUlwQmdDLElBSm9CLENBSWYsSUFKZSxDQUF0Qjs7QUFLQTBDLGtCQUFZLENBQUNFLGFBQWIsQ0FBMkJKLEtBQTNCO0FBQ0E7QUFFRCxHQTdCaUM7QUE4QmxDdkMsY0FBWSxFQUFFLHNCQUFVaEUsSUFBVixFQUFnQmlFLFFBQWhCLEVBQXlCO0FBQ3RDLFFBQUlzQyxLQUFLLEdBQUd2RyxJQUFJLENBQUMsQ0FBRCxDQUFoQjs7QUFDQSxRQUFHdUcsS0FBSCxFQUFTO0FBQ1IsV0FBSy9CLFFBQUwsQ0FBYytCLEtBQUssQ0FBQyxLQUFLOUksS0FBTCxDQUFXcUYsUUFBWCxJQUF1QixXQUF4QixDQUFuQjtBQUNBOztBQUNELFNBQUtyRixLQUFMLENBQVdxRSxVQUFYLElBQXlCLEtBQUtyRSxLQUFMLENBQVdxRSxVQUFYLENBQXNCeUUsS0FBdEIsRUFBNkIsSUFBN0IsQ0FBekI7QUFDQSxHQXBDaUM7QUFxQ2xDaEMsVUFBUSxFQUFFLG9CQUFXO0FBQ3BCLFdBQU8sS0FBS3JHLEtBQUwsQ0FBVzhFLEtBQWxCO0FBQ0EsR0F2Q2lDO0FBd0NsQ3dCLFVBQVEsRUFBRSxrQkFBVXhCLEtBQVYsRUFBZ0I7QUFDekIsU0FBSzFDLFFBQUwsQ0FBYztBQUFFMEMsV0FBSyxFQUFFQTtBQUFULEtBQWQsRUFBZ0MsWUFBVztBQUMxQyxXQUFLdkYsS0FBTCxDQUFXMkIsUUFBWCxJQUF1QixLQUFLM0IsS0FBTCxDQUFXMkIsUUFBWCxDQUFvQjRELEtBQXBCLEVBQTJCLElBQTNCLENBQXZCO0FBQ0EsS0FGK0IsQ0FFOUJlLElBRjhCLENBRXpCLElBRnlCLENBQWhDO0FBR0EsR0E1Q2lDO0FBNkNsQzZDLGVBQWEsRUFBRSx5QkFBVztBQUN6QixRQUFJWixJQUFJLEdBQUcsS0FBSzlILEtBQUwsQ0FBV29JLFlBQXRCOztBQUNBLFFBQUcsQ0FBQ04sSUFBSixFQUFTO0FBQ1JBLFVBQUksR0FBRyxLQUFLOUgsS0FBTCxDQUFXOEUsS0FBbEI7O0FBQ0EsVUFBR2dELElBQUksSUFBSUEsSUFBSSxDQUFDdEUsT0FBTCxDQUFhLE1BQWIsS0FBd0IsQ0FBbkMsRUFBcUM7QUFDcEMsWUFBR3NFLElBQUksQ0FBQ3RFLE9BQUwsQ0FBYSxHQUFiLEtBQXFCLENBQUMsQ0FBekIsRUFBMkI7QUFDMUJzRSxjQUFJLEdBQUcsQ0FBQyxLQUFLdkksS0FBTCxDQUFXRCxJQUFYLElBQW1CRSxFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQixrQkFBaEIsQ0FBbkIsSUFBMEQsRUFBM0QsSUFBaUVvSSxJQUF4RTtBQUNBLFNBRkQsTUFFSztBQUNKQSxjQUFJLEdBQUcsQ0FBQyxLQUFLdkksS0FBTCxDQUFXRCxJQUFYLElBQW1CRSxFQUFFLENBQUNDLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQixrQkFBaEIsQ0FBbkIsSUFBMEQsRUFBM0QsS0FBa0VGLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxJQUFYLENBQWdCLDJCQUFoQixLQUFnRCxFQUFsSCxJQUF3SG9JLElBQS9IO0FBQ0E7QUFDRDtBQUNEOztBQUVELFFBQUdBLElBQUgsRUFBUTtBQUNQLDBCQUFPO0FBQUssaUJBQVMsRUFBQyxLQUFmO0FBQXFCLFdBQUcsRUFBRUE7QUFBMUIsUUFBUDtBQUNBLEtBRkQsTUFFSztBQUNKLDBCQUFPO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNOO0FBQUssdUJBQVksTUFBakI7QUFBd0IsaUJBQVMsRUFBQyxPQUFsQztBQUEwQyx1QkFBWSxLQUF0RDtBQUE0RCxxQkFBVSxPQUF0RTtBQUE4RSxpQkFBUyxFQUFDLGtDQUF4RjtBQUEySCxZQUFJLEVBQUMsS0FBaEk7QUFBc0ksYUFBSyxFQUFDLDRCQUE1STtBQUF5SyxlQUFPLEVBQUM7QUFBakwsc0JBQStMO0FBQU0sWUFBSSxFQUFDLGNBQVg7QUFBMEIsU0FBQyxFQUFDO0FBQTVCLFFBQS9MLENBRE0sQ0FBUDtBQUdBO0FBQ0QsR0FqRWlDO0FBa0VsQ3pELFFBQU0sRUFBQyxrQkFBVTtBQUNoQix3QkFDQyxvQkFBQyxZQUFELGVBQ0ssS0FBSzlFLEtBRFY7QUFFQyxlQUFTLEVBQUVuQixJQUFJLENBQUNLLEtBQUwsQ0FBVzZGLFNBQVgsQ0FBcUIsbUJBQXJCLEVBQTBDLEtBQUsvRSxLQUFMLENBQVdnRixTQUFyRCxDQUZaO0FBR0MsY0FBUSxFQUFFLEtBQUtZLFVBSGhCO0FBSUMsZ0JBQVUsRUFBRSxLQUFLVyxZQUpsQjtBQUtDLGNBQVEsRUFBRTtBQUxYLHFCQU1DO0FBQUssZUFBUyxFQUFDLGlCQUFmO0FBQWlDLFdBQUssRUFBRSxLQUFLdkcsS0FBTCxDQUFXK0g7QUFBbkQsT0FDRSxLQUFLb0IsYUFBTCxFQURGLENBTkQsQ0FERDtBQVlBO0FBL0VpQyxDQUFsQixDQUFqQixDOzs7Ozs7Ozs7OztBQ0hBbEosRUFBRSxDQUFDQyxPQUFILENBQVdrSixNQUFYLENBQWtCLGFBQWxCLEVBQWlDO0FBQzdCckosTUFBSSxFQUFFLEVBRHVCO0FBRTdCc0osWUFBVSxFQUFFLEVBRmlCO0FBRzdCQyxXQUFTLEVBQUUsRUFIa0I7QUFJN0JDLGNBQVksRUFBRSxFQUplO0FBSzdCN0csV0FBUyxFQUFFLDRCQUxrQjtBQU03QjBGLFVBQVEsRUFBRSwyQkFObUI7QUFPN0JyQyxXQUFTLEVBQUUsNEJBUGtCO0FBUTdCeUQsZUFBYSxFQUFFLDRCQVJjO0FBUzdCbEMsYUFBVyxFQUFFO0FBVGdCLENBQWpDO0FBWUF0SSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYm1HLGNBQVksRUFBRXRHLG1CQUFPLENBQUMseUNBQUQsQ0FEUjtBQUViMkssY0FBWSxFQUFFM0ssbUJBQU8sQ0FBQyx5Q0FBRCxDQUZSO0FBR2I4SixZQUFVLEVBQUU5SixtQkFBTyxDQUFDLHFDQUFELENBSE47QUFJYjRLLGFBQVcsRUFBRTVLLG1CQUFPLENBQUMsdUNBQUQsQ0FKUDtBQUtiNkssZUFBYSxFQUFFN0ssbUJBQU8sQ0FBQywyQ0FBRDtBQUxULENBQWpCLEM7Ozs7Ozs7Ozs7O0FDWkEsYUFBYSxnQ0FBZ0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0EvQyxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSB6bnVpLlJlYWN0RE9NIHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonQWpheFVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5hbWU6ICd6cl9hamF4X3VwbG9hZGVyX2ZpbGUnLFxuXHRcdFx0YWN0aW9uOiAnL3p4bnouY29yZS5mcy91cGxvYWQvZmlsZXMnLFxuXHRcdFx0Y2hhbmdlU3VibWl0OiB0cnVlLFxuXHRcdFx0aGlkZGVuczogbnVsbCxcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXHRcdFx0aGludDogZmFsc2UsXG5cdFx0XHRtYXhGaWxlU2l6ZTogNTAwICogMTAyNCAqIDEwMjQsXG5cdFx0XHRzaXplOiAnJ1xuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhvc3Q6IHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSxcblx0XHRcdGxvYWRpbmc6IGZhbHNlLFxuXHRcdFx0cHJvZ3Jlc3M6IDAsXG5cdFx0XHR0aW1lU3RhbXA6IDBcblx0XHR9O1xuXHR9LFxuXHRfX29uSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0aWYodGhpcy5zdGF0ZS5sb2FkaW5nKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dmFyIF9maWxlcyA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5maWxlcyxcblx0XHRcdF9mb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpLFxuXHRcdFx0X3RlbXBGaWxlcyA9IFtdO1xuXHRcdGlmKCFfZmlsZXMubGVuZ3RoKXtcblx0XHRcdHJldHVybiBhbGVydCgn5pyq6YCJ5oup5paH5Lu2Jyk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gMCwgX2xlbiA9IF9maWxlcy5sZW5ndGg7IGk8X2xlbjsgaSsrKXtcblx0XHRcdGlmKF9maWxlc1tpXS5zaXplID4gdGhpcy5wcm9wcy5tYXhGaWxlU2l6ZSl7XG5cdFx0XHRcdGFsZXJ0KF9maWxlc1tpXS5uYW1lICsgXCIg5paH5Lu25aSn5bCP5pivXCIgKyB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKF9maWxlc1tpXS5zaXplKSsgXCIsIOS4jeiDvei2hei/h1wiICsgem51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSh0aGlzLnByb3BzLm1heEZpbGVTaXplKSk7XG5cdFx0XHRcdHJldHVybiBldmVudC5uYXRpdmVFdmVudC50YXJnZXQuZm9ybS5yZXNldCgpLCBmYWxzZTtcblx0XHRcdH1cblx0XHRcdF90ZW1wRmlsZXMucHVzaChfZmlsZXNbaV0pO1xuXHRcdFx0X2Zvcm1EYXRhLmFwcGVuZCh0aGlzLnByb3BzLm5hbWUgKyAnXycgKyBpLCBfZmlsZXNbaV0pO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgX3Jlc3VsdCA9IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZShfdGVtcEZpbGVzLCB0aGlzKTtcblx0XHRpZihfcmVzdWx0IT09ZmFsc2UgJiYgdGhpcy5wcm9wcy5jaGFuZ2VTdWJtaXQpe1xuXHRcdFx0dmFyIF9oaWRkZW5zID0gdGhpcy5wcm9wcy5oaWRkZW5zfHx7fSxcblx0XHRcdFx0X2hpZGRlbiA9IG51bGw7XG5cblx0XHRcdGlmKHpuLmlzKF9yZXN1bHQsICdvYmplY3QnKSl7XG5cdFx0XHRcdHpuLmV4dGVuZChfaGlkZGVucywgX3Jlc3VsdCk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcih2YXIga2V5IGluIF9oaWRkZW5zKXtcblx0XHRcdFx0X2hpZGRlbiA9IF9oaWRkZW5zW2tleV07XG5cdFx0XHRcdGlmKHR5cGVvZiBfaGlkZGVuID09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRfaGlkZGVuID0gSlNPTi5zdHJpbmdpZnkoX2hpZGRlbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfZm9ybURhdGEuYXBwZW5kKGtleSwgX2hpZGRlbik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFqYXhVcGxvYWQoX2Zvcm1EYXRhKTtcblx0XHR9XG5cdH0sXG5cdF9fb25JbnB1dENsaWNrOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdGlmKHRoaXMuc3RhdGUubG9hZGluZyl7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25VcGxvYWRlckNsaWNrICYmIHRoaXMucHJvcHMub25VcGxvYWRlckNsaWNrKGV2ZW50LCB0aGlzKTtcblx0fSxcblx0YWpheFVwbG9hZDogZnVuY3Rpb24gKGRhdGEpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmFjdGlvbiB8fCB0aGlzLnByb3BzLnVwbG9hZEFwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoIV9hcGkpIHJldHVybiBjb25zb2xlLmVycm9yKFwi5paH5Lu25LiK5Lyg5o6l5Y+j5pyq6L6T5YWlXCIpLCBmYWxzZTtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIHRoaXMuX19hamF4VXBsb2FkUHJvZ3Jlc3MsIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5fX2FqYXhVcGxvYWRDb21wbGV0ZSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcy5fX2FqYXhVcGxvYWRFcnJvciwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgdGhpcy5fX2FqYXhVcGxvYWRBYm9ydCwgZmFsc2UpO1xuXHRcdHhoci5vcGVuKFwiUE9TVFwiLCBfYXBpLCBcInRydWVcIik7XG5cdFx0eGhyLnNlbmQoZGF0YSk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZFByb2dyZXNzOiBmdW5jdGlvbiAoZXZ0KXtcblx0XHRpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcblx0XHRcdGV2dC5wcm9ncmVzcyA9IE1hdGgucm91bmQoZXZ0LmxvYWRlZCAqIDEwMCAvIGV2dC50b3RhbCk7XG5cdFx0XHR0aGlzLnN0YXRlLnByb2dyZXNzID0gZXZ0LnByb2dyZXNzO1xuXHRcdFx0dGhpcy5zdGF0ZS50aW1lU3RhbXAgPSBldnQudGltZVN0YW1wO1xuXHRcdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkaW5nICYmIHRoaXMucHJvcHMub25VcGxvYWRpbmcoZXZ0LCB0aGlzKTtcblx0fSxcblx0X19hamF4VXBsb2FkQ29tcGxldGU6IGZ1bmN0aW9uIChldnQpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnN0YXRlLnByb2dyZXNzID0gMDtcblx0XHR0aGlzLnN0YXRlLnRpbWVTdGFtcCA9IDA7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJzwhRE9DVFlQRSBodG1sPicpID09IDApe1xuXHRcdFx0cmV0dXJuIGFsZXJ0KGV2dC50YXJnZXQucmVzcG9uc2VUZXh0KSwgZmFsc2U7XG5cdFx0fVxuXHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ3snKSA9PSAwIHx8IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ1snKSA9PSAwKXtcblx0XHRcdHZhciBfZGF0YSA9IEpTT04ucGFyc2UoZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuXHRcdFx0aWYoX2RhdGEuY29kZSA9PSAyMDApe1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKF9kYXRhLnJlc3VsdCwgdGhpcyk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KF9kYXRhLnJlc3VsdHx8X2RhdGEubWVzc2FnZSk7XG5cdFx0XHRcdHRoaXMucHJvcHMub25FcnJvciAmJiB0aGlzLnByb3BzLm9uRXJyb3IoX2RhdGEucmVzdWx0LCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdF9fYWpheFVwbG9hZEVycm9yOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKGV2ZW50Lm1lc3NhZ2UsIHRoaXMpO1xuXHR9LFxuXHRfX2FqYXhVcGxvYWRBYm9ydDogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0dGhpcy5wcm9wcy5vbkFib3J0ICYmIHRoaXMucHJvcHMub25BYm9ydChldmVudCwgdGhpcyk7XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XG5cdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucmVzZXQoKTtcblx0fSxcblx0X19yZW5kZXJQcm9jZXNzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLnByb2dyZXNzKXtcblx0XHRcdGlmKHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT0gMTAwKSB7XG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1wcm9ncmVzc1wiIHN0eWxlPXt7aGVpZ2h0OiAnMTAwJSd9fT5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJjaGVja1wiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWNoZWNrIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNzMuODk4IDQzOS40MDRsLTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtcHJvZ3Jlc3NcIiBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS5wcm9ncmVzcyArICclJ319PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnByb2dyZXNzICsgJyUnfSh7KHRoaXMuc3RhdGUudGltZVN0YW1wLzEwMDApLnRvRml4ZWQoMSl9cylcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmFjdGlvbiB8fCB0aGlzLnByb3BzLnVwbG9hZEFwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoIV9hcGkpIGNvbnNvbGUuZXJyb3IoXCLmlofku7bkuIrkvKDmjqXlj6PmnKrovpPlhaVcIik7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1hamF4LXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0ZGF0YS1sb2FkaW5nPXt0aGlzLnN0YXRlLmxvYWRpbmd9XG5cdFx0XHRcdGFjdGlvbj17X2FwaX1cblx0XHRcdFx0ZW5jVHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuXHRcdFx0XHRtZXRob2Q9XCJQT1NUXCI+XG5cdFx0XHRcdHt0aGlzLl9fcmVuZGVyUHJvY2VzcygpfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFqYXgtdXBsb2FkLWNvbnRhaW5lclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5oaW50ICYmIDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57dGhpcy5wcm9wcy5zaXplICsgJyAnICsgem51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSh0aGlzLnByb3BzLm1heEZpbGVTaXplKX08L3NwYW4+fVxuXHRcdFx0XHQ8aW5wdXQgbXVsdGlwbGU9e3RoaXMucHJvcHMubXVsdGlwbGV9IGNsYXNzTmFtZT1cImlucHV0XCIgdHlwZT1cImZpbGVcIiBuYW1lPXt0aGlzLnByb3BzLm5hbWV8fCgnenJfYWpheF91cGxvYWRlcl9maWxlXycgKyBEYXRlLm5vdygpKX0gb25DaGFuZ2U9e3RoaXMuX19vbklucHV0Q2hhbmdlfSBvbkNsaWNrPXt0aGlzLl9fb25JbnB1dENsaWNrfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFqYXgtdXBsb2FkLWljb25cIj5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJ1cGxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS11cGxvYWQgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI5NiAzODRoLTgwYy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYxOTJoLTg3LjdjLTE3LjggMC0yNi43LTIxLjUtMTQuMS0zNC4xTDI0Mi4zIDUuN2M3LjUtNy41IDE5LjgtNy41IDI3LjMgMGwxNTIuMiAxNTIuMmMxMi42IDEyLjYgMy43IDM0LjEtMTQuMSAzNC4xSDMyMHYxNjhjMCAxMy4zLTEwLjcgMjQtMjQgMjR6bTIxNi04djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDEzNnY4YzAgMzAuOSAyNS4xIDU2IDU2IDU2aDgwYzMwLjkgMCA1Ni0yNS4xIDU2LTU2di04aDEzNmMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBamF4VXBsb2FkZXIgPSByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdGhvc3Q6IHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHRcdGZpbGVzOiBbXVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcywgYWpheFVwbG9hZGVyKXtcblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGVyQ2hhbmdlKGZpbGVzLCBhamF4VXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRpbml0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0aWYoIXZhbHVlKSByZXR1cm47XG5cdFx0dmFyIF9ob3N0ID0gdGhpcy5zdGF0ZS5ob3N0LFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZmV0Y2hzQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hzQXBpJyk7XG5cdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRpZighX2FwaSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bpqozor4HmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXHRcdGlmKHpuLmlzKHZhbHVlLCAnYXJyYXknKSl7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcblx0XHR9XG5cdFx0em4uZGF0YS5nZXQoX2FwaSArIHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRpZihyZXNwb25zZS5zdGF0dXM9PTIwMCAmJiB0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PSAnb2JqZWN0JyAmJiByZXNwb25zZS5kYXRhLmNvZGUgPT0gMjAwICYmIHpuLmlzKHJlc3BvbnNlLmRhdGEucmVzdWx0LCAnYXJyYXknKSl7XG5cdFx0XHRcdHRoaXMuc2V0RmlsZXMocmVzcG9uc2UuZGF0YS5yZXN1bHQpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCLnvZHnu5zor7fmsYLplJnor69cIik7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbiAoKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCLnvZHnu5zor7fmsYLplJnor69cIik7XG5cdFx0fSk7XG5cdH0sXG5cdF9fb25Db21wbGV0ZTogZnVuY3Rpb24gKGRhdGEsIHVwbG9hZGVyKXtcblx0XHR0aGlzLnNldEZpbGVzKGRhdGEpO1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLnZhbHVlLCB0aGlzKTtcblx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKGRhdGEsIHVwbG9hZGVyLCB0aGlzKTtcblx0fSxcblx0c2V0RmlsZXM6IGZ1bmN0aW9uIChmaWxlcyl7XG5cdFx0dmFyIF92YWx1ZUtleSA9IHRoaXMucHJvcHMudmFsdWVLZXk7XG5cdFx0dmFyIF92YWx1ZXMgPSAoZmlsZXN8fFtdKS5tYXAoZnVuY3Rpb24gKGZpbGUpe1xuXHRcdFx0aWYoZmlsZSAmJiBmaWxlW192YWx1ZUtleV0pe1xuXHRcdFx0XHRyZXR1cm4gZmlsZVtfdmFsdWVLZXldO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuc3RhdGUudmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlLmNvbmNhdChfdmFsdWVzKTtcblx0XHR0aGlzLnN0YXRlLmZpbGVzID0gdGhpcy5zdGF0ZS5maWxlcy5jb25jYXQoZmlsZXMpO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0Z2V0VmFsdWU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuXHR9LFxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHZhbHVlIH0pO1xuXHR9LFxuXHRfX29uRmlsZUNsaWNrOiBmdW5jdGlvbiAoZmlsZSwgaW5kZXgpe1xuXHRcdHZhciBfcmV0dXJuICA9IHRoaXMucHJvcHMub25GaWxlQ2xpY2sgJiYgdGhpcy5wcm9wcy5vbkZpbGVDbGljayhmaWxlLCBpbmRleCk7XG5cdH0sXG5cdF9fb25SZW1vdmU6IGZ1bmN0aW9uIChmaWxlLCBpbmRleCl7XG5cdFx0dGhpcy5zdGF0ZS5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdHRoaXMuc3RhdGUudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdF9fZmlsZURvd25sb2FkUmVuZGVyOiBmdW5jdGlvbiAoZmlsZSl7XG5cdFx0dmFyIF9ob3N0ID0gdGhpcy5zdGF0ZS5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZG93bmxvYWRIb3N0JyksXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5kb3dubG9hZEFwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmRvd25sb2FkQXBpJyk7XG5cdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRpZihfYXBpKXtcblx0XHRcdHJldHVybiA8c3BhbiBvbkNsaWNrPXsoKT0+em51aS5kb3dubG9hZFVSTChfYXBpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XSwgZmlsZS5uYW1lKX0gY2xhc3NOYW1lPVwiZG93bmxvYWRcIj5cblx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiZG93bmxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1kb3dubG9hZCBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjE2IDBoODBjMTMuMyAwIDI0IDEwLjcgMjQgMjR2MTY4aDg3LjdjMTcuOCAwIDI2LjcgMjEuNSAxNC4xIDM0LjFMMjY5LjcgMzc4LjNjLTcuNSA3LjUtMTkuOCA3LjUtMjcuMyAwTDkwLjEgMjI2LjFjLTEyLjYtMTIuNi0zLjctMzQuMSAxNC4xLTM0LjFIMTkyVjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0em0yOTYgMzc2djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDE0Ni43bDQ5IDQ5YzIwLjEgMjAuMSA1Mi41IDIwLjEgNzIuNiAwbDQ5LTQ5SDQ4OGMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0PC9zcGFuPjtcblx0XHR9XG5cdH0sXG5cdF9fcmVuZGVyRmlsZXM6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZmlsZXMpe1xuXHRcdFx0dmFyIF9lZGl0YWJsZSA9ICh0aGlzLnByb3BzLmVkaXRhYmxlICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRvbmx5KTtcblx0XHRcdHJldHVybiA8dWwgY2xhc3NOYW1lPVwiZmlsZS1saXN0XCI+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmZpbGVzLm1hcChmdW5jdGlvbiAoZmlsZSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0aWYoZmlsZSl7XG5cdFx0XHRcdFx0XHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGZpbGUsIGluZGV4KTtcblx0XHRcdFx0XHRcdFx0aWYoX3RlbXApe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGVtcDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPGxpIGtleT17ZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XX0gY2xhc3NOYW1lPVwiZmlsZVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgX2VkaXRhYmxlICYmIDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInRyYXNoLWFsdFwiIG9uQ2xpY2s9eygpPT50aGlzLl9fb25SZW1vdmUoZmlsZSwgaW5kZXgpfSBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1yZW1vdmUgenItaG92ZXItc2VsZi1sb2FkaW5nIGZhLXRyYXNoLWFsdCBmYS13LTE0IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzIgNDY0YTQ4IDQ4IDAgMCAwIDQ4IDQ4aDI4OGE0OCA0OCAwIDAgMCA0OC00OFYxMjhIMzJ6bTI3Mi0yNTZhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHptLTk2IDBhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHptLTk2IDBhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHpNNDMyIDMySDMxMmwtOS40LTE4LjdBMjQgMjQgMCAwIDAgMjgxLjEgMEgxNjYuOGEyMy43MiAyMy43MiAwIDAgMC0yMS40IDEzLjNMMTM2IDMySDE2QTE2IDE2IDAgMCAwIDAgNDh2MzJhMTYgMTYgMCAwIDAgMTYgMTZoNDE2YTE2IDE2IDAgMCAwIDE2LTE2VjQ4YTE2IDE2IDAgMCAwLTE2LTE2elwiPjwvcGF0aD48L3N2Zz59XG5cdFx0XHRcdFx0XHRcdFx0e3RoaXMuX19maWxlRG93bmxvYWRSZW5kZXIoZmlsZSwgaW5kZXgpfVxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXsoKT0+dGhpcy5fX29uRmlsZUNsaWNrKGZpbGUsIGluZGV4KX0+e2ZpbGUubmFtZX08L2E+XG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2l6ZVwiPnt6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKCtmaWxlLnNpemUpfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9saT47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3VsPjtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHR2YXIgX2VkaXRhYmxlID0gKHRoaXMucHJvcHMuZWRpdGFibGUgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZG9ubHkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1maWxlLXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRfZWRpdGFibGUgJiYgPEFqYXhVcGxvYWRlclxuXHRcdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdFx0XHRzdHlsZT17dGhpcy5wcm9wcy51cGxvYWRlclN0eWxlfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuX19vbkNoYW5nZX1cblx0XHRcdFx0XHRcdG9uQ29tcGxldGU9e3RoaXMuX19vbkNvbXBsZXRlfSA+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1jb250YWluZXJcIiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmlsZS11cGxvYWQtaWNvblwiPlxuXHRcdFx0XHRcdFx0XHRcdDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cImZpbGUtdXBsb2FkXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtZmlsZS11cGxvYWQgZmEtdy0xMiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzg0IDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIyNCAxMzZWMEgyNEMxMC43IDAgMCAxMC43IDAgMjR2NDY0YzAgMTMuMyAxMC43IDI0IDI0IDI0aDMzNmMxMy4zIDAgMjQtMTAuNyAyNC0yNFYxNjBIMjQ4Yy0xMy4yIDAtMjQtMTAuOC0yNC0yNHptNjUuMTggMjE2LjAxSDIyNHY4MGMwIDguODQtNy4xNiAxNi0xNiAxNmgtMzJjLTguODQgMC0xNi03LjE2LTE2LTE2di04MEg5NC44MmMtMTQuMjggMC0yMS40MS0xNy4yOS0xMS4yNy0yNy4zNmw5Ni40Mi05NS43YzYuNjUtNi42MSAxNy4zOS02LjYxIDI0LjA0IDBsOTYuNDIgOTUuN2MxMC4xNSAxMC4wNyAzLjAzIDI3LjM2LTExLjI1IDI3LjM2ek0zNzcgMTA1TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvQWpheFVwbG9hZGVyPlxuXHRcdFx0XHR9XG5cdFx0XHRcdHt0aGlzLl9fcmVuZGVyRmlsZXMoKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZVZpZXdlcicsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlS2V5OiAndGVtcE5hbWUnLFxuXHRcdFx0d2lkdGg6IDQ4MCxcblx0XHRcdGhlaWdodDogMzIwXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpLFxuXHRcdFx0ZnVsbFNjcmVlbjogZmFsc2UsXG5cdFx0XHRmaWxlczogW11cblx0XHR9O1xuXHQgIH0sXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3JldHVybiA9IHRoaXMucHJvcHMuZGlkTW91bnQgJiYgdGhpcy5wcm9wcy5kaWRNb3VudCh0aGlzKTtcblx0XHRpZihfcmV0dXJuIT09ZmFsc2Upe1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdGluaXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHRpZighdmFsdWUpIHJldHVybjtcblx0XHRpZih6bi5pcyh2YWx1ZSwgJ29iamVjdCcpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRGaWxlKHZhbHVlKSwgZmFsc2U7XG5cdFx0fWVsc2UgaWYoem4uaXModmFsdWUsICdzdHJpbmcnKSl7XG5cdFx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QsXG5cdFx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmZldGNoQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hBcGknKTtcblx0XHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0XHRpZighX2FwaSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bpqozor4HmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXHRcdFx0em4uZGF0YS5nZXQoX2FwaSArIHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cz09MjAwICYmIHR5cGVvZiByZXNwb25zZS5kYXRhID09ICdvYmplY3QnICYmIHJlc3BvbnNlLmRhdGEuY29kZSA9PSAyMDAgJiYgem4uaXMocmVzcG9uc2UuZGF0YS5yZXN1bHQsICdvYmplY3QnKSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRGaWxlcyhyZXNwb25zZS5kYXRhLnJlc3VsdCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGaWxlVmlld2VyLmpzIOe9kee7nOivt+axgumUmeivr1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbiAoKXtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVWaWV3ZXIuanMg572R57uc6K+35rGC6ZSZ6K+vXCIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRzZXRGaWxlOiBmdW5jdGlvbiAoZmlsZSl7XG5cdFx0dGhpcy5zdGF0ZS5maWxlID0gZmlsZTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdF9fZmlsZURvd25sb2FkUmVuZGVyOiBmdW5jdGlvbiAoZmlsZSl7XG5cdFx0dmFyIF9ob3N0ID0gdGhpcy5zdGF0ZS5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZG93bmxvYWRIb3N0JyksXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5kb3dubG9hZEFwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmRvd25sb2FkQXBpJyk7XG5cdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRpZihfYXBpKXtcblx0XHRcdHJldHVybiA8c3BhbiBvbkNsaWNrPXsoKT0+em51aS5kb3dubG9hZFVSTChfYXBpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XSwgZmlsZS5uYW1lKX0gY2xhc3NOYW1lPVwiZG93bmxvYWRcIj5cblx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiZG93bmxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1kb3dubG9hZCBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjE2IDBoODBjMTMuMyAwIDI0IDEwLjcgMjQgMjR2MTY4aDg3LjdjMTcuOCAwIDI2LjcgMjEuNSAxNC4xIDM0LjFMMjY5LjcgMzc4LjNjLTcuNSA3LjUtMTkuOCA3LjUtMjcuMyAwTDkwLjEgMjI2LjFjLTEyLjYtMTIuNi0zLjctMzQuMSAxNC4xLTM0LjFIMTkyVjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0em0yOTYgMzc2djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDE0Ni43bDQ5IDQ5YzIwLjEgMjAuMSA1Mi41IDIwLjEgNzIuNiAwbDQ5LTQ5SDQ4OGMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0PC9zcGFuPjtcblx0XHR9XG5cdH0sXG5cdF9fcmVuZGVyRmlsZUNvbnRlbnQ6IGZ1bmN0aW9uIChmaWxlKXtcblx0XHR2YXIgX3ZpZXcgPSBudWxsLFxuXHRcdFx0X3NyYyA9ICcnO1xuXHRcdGlmKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hJbWFnZUFwaScpIHx8ICcnKSArIGZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHRfdmlldyA9IDxpbWcgd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9IGNsYXNzTmFtZT1cInZpZXcgaW1nLXZpZXdcIiBzcmM9e19zcmN9IC8+O1xuXHRcdH1lbHNlIGlmKGZpbGUudHlwZS5pbmRleE9mKCd2aWRlbycpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hJbWFnZUFwaScpIHx8ICcnKSArIGZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHRfdmlldyA9IDx2aWRlb1xuXHRcdFx0XHRjbGFzc05hbWU9XCJ2aWV3IGlkZW8tdmlld1wiXG5cdFx0XHRcdGNvbnRyb2xzXG5cdFx0XHRcdHByZWxvYWQ9XCJhdXRvXCJcblx0XHRcdFx0d2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IFxuXHRcdFx0XHRoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuXHRcdFx0XHRwb3N0ZXI9e3RoaXMucHJvcHMucG9zdGVyfT5cblx0XHRcdFx0PHNvdXJjZSBzcmM9e19zcmN9IHR5cGU9XCJ2aWRlby9tcDRcIiAvPlxuXHRcdFx0XHQ8c291cmNlIHNyYz17X3NyY30gdHlwZT1cInZpZGVvL3dlYm1cIiAvPlxuXHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0aXBzXCI+XG5cdFx0XHRcdFx0VG8gdmlldyB0aGlzIHZpZGVvIHBsZWFzZSBlbmFibGUgSmF2YVNjcmlwdCwgYW5kIGNvbnNpZGVyIHVwZ3JhZGluZyB0byBhIHdlYiBicm93c2VyIHRoYXRcblx0XHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly92aWRlb2pzLmNvbS9odG1sNS12aWRlby1zdXBwb3J0L1wiIHRhcmdldD1cIl9ibGFua1wiPnN1cHBvcnRzIEhUTUw1IHZpZGVvPC9hPlxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L3ZpZGVvPjtcblx0XHR9XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZmlsZS12aWV3XCIgPlxuXHRcdFx0e192aWV3fVxuXHRcdDwvZGl2Pjtcblx0fSxcblx0X19mdWxsU2NyZWVuOiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZ1bGxTY3JlZW46ICF0aGlzLnN0YXRlLmZ1bGxTY3JlZW5cblx0XHR9KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBmaWxlID0gdGhpcy5zdGF0ZS5maWxlO1xuXHRcdGlmKCFmaWxlKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItZmlsZS12aWV3ZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUsICh0aGlzLnN0YXRlLmZ1bGxTY3JlZW4/J2Z1bGwtc2NyZWVuJzonJykpfSBzdHlsZT17em51aS5yZWFjdC5zdHlsZSh0aGlzLnByb3BzLnN0eWxlKX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmlsZS1pbmZvXCI+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5mdWxsU2NyZWVuID8gPHN2ZyBvbkNsaWNrPXt0aGlzLl9fZnVsbFNjcmVlbn0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cIndpbmRvdy1jbG9zZVwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLXdpbmRvdy1jbG9zZSBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDY0IDMySDQ4QzIxLjUgMzIgMCA1My41IDAgODB2MzUyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDQxNmMyNi41IDAgNDgtMjEuNSA0OC00OFY4MGMwLTI2LjUtMjEuNS00OC00OC00OHptLTgzLjYgMjkwLjVjNC44IDQuOCA0LjggMTIuNiAwIDE3LjRsLTQwLjUgNDAuNWMtNC44IDQuOC0xMi42IDQuOC0xNy40IDBMMjU2IDMxMy4zbC02Ni41IDY3LjFjLTQuOCA0LjgtMTIuNiA0LjgtMTcuNCAwbC00MC41LTQwLjVjLTQuOC00LjgtNC44LTEyLjYgMC0xNy40bDY3LjEtNjYuNS02Ny4xLTY2LjVjLTQuOC00LjgtNC44LTEyLjYgMC0xNy40bDQwLjUtNDAuNWM0LjgtNC44IDEyLjYtNC44IDE3LjQgMGw2Ni41IDY3LjEgNjYuNS02Ny4xYzQuOC00LjggMTIuNi00LjggMTcuNCAwbDQwLjUgNDAuNWM0LjggNC44IDQuOCAxMi42IDAgMTcuNEwzMTMuMyAyNTZsNjcuMSA2Ni41elwiPjwvcGF0aD48L3N2Zz4gOiA8c3ZnIG9uQ2xpY2s9e3RoaXMuX19mdWxsU2NyZWVufSBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwidHZcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS10diBmYS13LTIwIFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNTkyIDBINDhBNDggNDggMCAwIDAgMCA0OHYzMjBhNDggNDggMCAwIDAgNDggNDhoMjQwdjMySDExMmExNiAxNiAwIDAgMC0xNiAxNnYzMmExNiAxNiAwIDAgMCAxNiAxNmg0MTZhMTYgMTYgMCAwIDAgMTYtMTZ2LTMyYTE2IDE2IDAgMCAwLTE2LTE2SDM1MnYtMzJoMjQwYTQ4IDQ4IDAgMCAwIDQ4LTQ4VjQ4YTQ4IDQ4IDAgMCAwLTQ4LTQ4em0tMTYgMzUySDY0VjY0aDUxMnpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHt0aGlzLl9fZmlsZURvd25sb2FkUmVuZGVyKGZpbGUpfVxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXsoKT0+dGhpcy5fX29uUHJldmlldyhmaWxlKX0+e2ZpbGUubmFtZX08L2E+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2l6ZVwiPnt6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKCtmaWxlLnNpemUpfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHt0aGlzLl9fcmVuZGVyRmlsZUNvbnRlbnQoZmlsZSl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBGaWxlVmlld2VyID0gcmVxdWlyZSgnLi9GaWxlVmlld2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidGaWxlc1ZpZXdlcicsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlS2V5OiAndGVtcE5hbWUnLFxuXHRcdFx0d2lkdGg6IDQ4MCxcblx0XHRcdGhlaWdodDogMzIwXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpLFxuXHRcdFx0ZmlsZXM6IFtdXG5cdFx0fTtcblx0ICB9LFxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9yZXR1cm4gPSB0aGlzLnByb3BzLmRpZE1vdW50ICYmIHRoaXMucHJvcHMuZGlkTW91bnQodGhpcyk7XG5cdFx0aWYoX3JldHVybiE9PWZhbHNlKXtcblx0XHRcdHRoaXMuaW5pdFZhbHVlKHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdH1cblx0fSxcblx0aW5pdFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdGlmKCF2YWx1ZSkgcmV0dXJuO1xuXHRcdGlmKHpuLmlzKHZhbHVlWzBdLCAnb2JqZWN0JykpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldEZpbGVzKFt2YWx1ZV0pLCBmYWxzZTtcblx0XHR9XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpICYmIHZhbHVlLmxlbmd0aCAmJiB6bi5pcyh2YWx1ZVswXSwgJ29iamVjdCcpKXtcblx0XHRcdHJldHVybiB0aGlzLnNldEZpbGVzKHZhbHVlKSwgZmFsc2U7XG5cdFx0fVxuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmZldGNoc0FwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmZldGNoc0FwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoIV9hcGkpIHJldHVybiBhbGVydChcIuaWh+S7tumqjOivgeaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpKXtcblx0XHRcdHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXHRcdH1cblx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cz09MjAwICYmIHR5cGVvZiByZXNwb25zZS5kYXRhID09ICdvYmplY3QnICYmIHJlc3BvbnNlLmRhdGEuY29kZSA9PSAyMDAgJiYgem4uaXMocmVzcG9uc2UuZGF0YS5yZXN1bHQsICdhcnJheScpKXtcblx0XHRcdFx0dGhpcy5zZXRGaWxlcyhyZXNwb25zZS5kYXRhLnJlc3VsdCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0YWxlcnQoXCJGaWxlc1ZpZXdlci5qcyDnvZHnu5zor7fmsYLplJnor69cIik7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbiAoKXtcblx0XHRcdGFsZXJ0KFwiRmlsZXNWaWV3ZXIuanMg572R57uc6K+35rGC6ZSZ6K+vXCIpO1xuXHRcdH0pO1xuXHR9LFxuXHRzZXRGaWxlczogZnVuY3Rpb24gKGZpbGVzKXtcblx0XHR0aGlzLnN0YXRlLmZpbGVzID0gZmlsZXM7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRfX3JlbmRlckZpbGVzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLmZpbGVzKXtcblx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtbGlzdFwiPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5maWxlcy5tYXAoZnVuY3Rpb24gKGZpbGUsIGluZGV4KXtcblx0XHRcdFx0XHRcdGlmKGZpbGUpe1xuXHRcdFx0XHRcdFx0XHR2YXIgX3RlbXAgPSB0aGlzLnByb3BzLm9uRmlsZVJlbmRlciAmJiB0aGlzLnByb3BzLm9uRmlsZVJlbmRlcihmaWxlLCBpbmRleCk7XG5cdFx0XHRcdFx0XHRcdGlmKF90ZW1wKXtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RlbXA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxGaWxlVmlld2VyIGtleT17aW5kZXh9IHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fSB2YWx1ZT17ZmlsZX0gdmFsdWVLZXk9e3RoaXMucHJvcHMudmFsdWVLZXl9IC8+O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+O1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1maWxlLXZpZXdlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt6bnVpLnJlYWN0LnN0eWxlKHRoaXMucHJvcHMuc3R5bGUpfT5cblx0XHRcdFx0e3RoaXMuX19yZW5kZXJGaWxlcygpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQWpheFVwbG9hZGVyID0gcmVxdWlyZSgnLi9BamF4VXBsb2FkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidJbWFnZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG5cdFx0XHRpbWFnZURhdGFVUkw6IG51bGxcblx0XHR9O1xuICBcdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcyl7XG5cdFx0dmFyIF9maWxlID0gZmlsZXNbMF07XG5cdFx0aWYoX2ZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpPT0tMSl7XG5cdFx0XHRhbGVydChfZmlsZS5uYW1lICsgJyDkuI3mmK/lm77niYfmlofku7YnKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYoRmlsZVJlYWRlcil7XG5cdFx0XHR2YXIgX2ltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdF9pbWFnZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbWFnZURhdGFVUkw6IGV2ZW50LnRhcmdldC5yZXN1bHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChfZmlsZSk7XG5cdFx0fVxuXHRcdFxuXHR9LFxuXHRfX29uQ29tcGxldGU6IGZ1bmN0aW9uIChkYXRhLCB1cGxvYWRlcil7XG5cdFx0dmFyIF9maWxlID0gZGF0YVswXTtcblx0XHRpZihfZmlsZSl7XG5cdFx0XHR0aGlzLnNldFZhbHVlKF9maWxlW3RoaXMucHJvcHMudmFsdWVLZXkgfHwgJ3NhdmVkTmFtZSddKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNvbXBsZXRlICYmIHRoaXMucHJvcHMub25Db21wbGV0ZShfZmlsZSwgdGhpcyk7XG5cdH0sXG5cdGdldFZhbHVlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcblx0fSxcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBmdW5jdGlvbiAoKXtcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSwgdGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fSxcblx0X19yZW5kZXJJbWFnZTogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9zcmMgPSB0aGlzLnN0YXRlLmltYWdlRGF0YVVSTDtcblx0XHRpZighX3NyYyl7XG5cdFx0XHRfc3JjID0gdGhpcy5zdGF0ZS52YWx1ZTtcblx0XHRcdGlmKF9zcmMgJiYgX3NyYy5pbmRleE9mKCdodHRwJykgIT0gMCl7XG5cdFx0XHRcdGlmKF9zcmMuaW5kZXhPZignLycpICE9IC0xKXtcblx0XHRcdFx0XHRfc3JjID0gKHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCAnJykgKyBfc3JjO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRfc3JjID0gKHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCAnJykgKyAoem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaEltYWdlQXBpJykgfHwgJycpICsgX3NyYztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRpZihfc3JjKXtcblx0XHRcdHJldHVybiA8aW1nIGNsYXNzTmFtZT1cImltZ1wiIHNyYz17X3NyY30gLz47XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJpbWctdXBsb2FkLWljb25cIj5cblx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiaW1hZ2VcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1pbWFnZSBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDY0IDQ0OEg0OGMtMjYuNTEgMC00OC0yMS40OS00OC00OFYxMTJjMC0yNi41MSAyMS40OS00OCA0OC00OGg0MTZjMjYuNTEgMCA0OCAyMS40OSA0OCA0OHYyODhjMCAyNi41MS0yMS40OSA0OC00OCA0OHpNMTEyIDEyMGMtMzAuOTI4IDAtNTYgMjUuMDcyLTU2IDU2czI1LjA3MiA1NiA1NiA1NiA1Ni0yNS4wNzIgNTYtNTYtMjUuMDcyLTU2LTU2LTU2ek02NCAzODRoMzg0VjI3MmwtODcuNTE1LTg3LjUxNWMtNC42ODYtNC42ODYtMTIuMjg0LTQuNjg2LTE2Ljk3MSAwTDIwOCAzMjBsLTU1LjUxNS01NS41MTVjLTQuNjg2LTQuNjg2LTEyLjI4NC00LjY4Ni0xNi45NzEgMEw2NCAzMzZ2NDh6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0PC9kaXY+O1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxBamF4VXBsb2FkZXJcblx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1pbWFnZS11cGxvYWRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLl9fb25DaGFuZ2V9XG5cdFx0XHRcdG9uQ29tcGxldGU9e3RoaXMuX19vbkNvbXBsZXRlfVxuXHRcdFx0XHRtdWx0aXBsZT17ZmFsc2V9ID5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbWFnZS1jb250YWluZXJcIiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG5cdFx0XHRcdFx0e3RoaXMuX19yZW5kZXJJbWFnZSgpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvQWpheFVwbG9hZGVyPlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwiem4uc2V0dGluZy5zZXRLZXkoJ3pyLnVwbG9hZGVyJywge1xuICAgIGhvc3Q6ICcnLFxuICAgIHVwbG9hZEhvc3Q6ICcnLFxuICAgIGZldGNoSG9zdDogJycsXG4gICAgZG93bmxvYWRIb3N0OiAnJyxcbiAgICB1cGxvYWRBcGk6ICcvenhuei5jb3JlLmZzL3VwbG9hZC9maWxlcycsXG4gICAgZmV0Y2hBcGk6ICcvenhuei5jb3JlLmZzL2ZldGNoL2ZpbGUvJyxcbiAgICBmZXRjaHNBcGk6ICcvenhuei5jb3JlLmZzL2ZldGNoL2ZpbGVzLycsXG4gICAgZmV0Y2hJbWFnZUFwaTogJy96eG56LmNvcmUuZnMvZmV0Y2gvaW1hZ2UvJyxcbiAgICBkb3dubG9hZEFwaTogJy96eG56LmNvcmUuZnMvZG93bmxvYWQvZmlsZS8nXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQWpheFVwbG9hZGVyOiByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpLFxuICAgIEZpbGVVcGxvYWRlcjogcmVxdWlyZSgnLi9GaWxlVXBsb2FkZXInKSxcbiAgICBGaWxlVmlld2VyOiByZXF1aXJlKCcuL0ZpbGVWaWV3ZXInKSxcbiAgICBGaWxlc1ZpZXdlcjogcmVxdWlyZSgnLi9GaWxlc1ZpZXdlcicpLFxuICAgIEltYWdlVXBsb2FkZXI6IHJlcXVpcmUoJy4vSW1hZ2VVcGxvYWRlcicpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdERPTVwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9