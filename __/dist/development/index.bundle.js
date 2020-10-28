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
      types: [],
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
        console.error(_data.result || _data.message);
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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

module.exports = znui.react.createClass({
  displayName: 'FileUploader',
  getDefaultProps: function getDefaultProps() {
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
  getInitialState: function getInitialState() {
    return {
      host: this.props.host || zn.setting.path('zr.uploader.host'),
      value: [],
      files: [],
      compressing: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      this.initValue(this.props.value);
    }
  },
  __onChange: function __onChange(files, ajaxUploader) {
    if (this.props.compress) {
      var _files = [],
          _queue = zn.queue({}, {
        every: function every(sender, file) {
          _files.push(file);
        },
        "finally": function (sender) {
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

      _imageReader.onload = function (event) {
        _img.src = event.target.result;
      };

      this.setState({
        compressing: true
      });

      var _iterator = _createForOfIteratorHelper(files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;

          if (file.type.indexOf('image') === 0) {
            (function (file) {
              _queue.push(function (task) {
                _imageReader.readAsDataURL(file);

                _img.onload = function () {
                  var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);

                  _canvas.toBlob(function (blob) {
                    task.done(new File([blob], file.name, {
                      lastModifiedDate: new Date().getTime(),
                      type: file.type
                    }));
                  }, file.type, _compress.quality);
                };
              });
            })(file);
          } else {
            (function (file) {
              _queue.push(function (task) {
                task.done(file);
              });
            })(file);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      _queue.start();

      return false;
    }

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
      if (zn.is(response, 'array')) {
        this.setFiles(response);
      } else if (zn.is(response, 'object')) {
        if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')) {
          this.setFiles(response.data.result);
        } else {
          console.error("网络请求错误: ", response);
        }
      }
    }.bind(this), function () {
      console.error("网络请求错误");
    });
  },
  __onComplete: function __onComplete(data, uploader) {
    this.setFiles(data);
    this.props.onChange && this.props.onChange({
      value: this.state.value
    }, this);
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
    this.props.onChange && this.props.onChange({
      file: file,
      index: index,
      value: this.state.value,
      files: this.state.files
    }, this);
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
    })), this.state.compressing && /*#__PURE__*/React.createElement("span", {
      className: "compressing"
    }, "\u538B\u7F29\u4E2D...")))), this.__renderFiles());
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
    if (!_api) return console.error("FilesViewer.js 文件验证接口未输入"), false;

    if (zn.is(value, 'array')) {
      value = value.join(',');
    }

    zn.data.get(_api + value).then(function (response) {
      if (zn.is(response, 'array')) {
        this.setFiles(response);
      } else if (zn.is(response, 'object')) {
        if (response.status == 200 && _typeof(response.data) == 'object' && response.data.code == 200 && zn.is(response.data.result, 'array')) {
          this.setFiles(response.data.result);
        } else {
          console.error("FilesViewer.js 网络请求错误 ", response);
        }
      }
    }.bind(this), function () {
      console.error("FilesViewer.js 网络请求错误");
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
      className: znui.react.classname("zr-files-viewer", this.props.className),
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
      value: '',
      compress: {
        maxWidth: 1024,
        maxHeight: 768,
        quality: 1
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      imageDataURL: null,
      original: null,
      compress: null,
      compressing: false
    };
  },
  __onChange: function __onChange(files, ajaxUploader) {
    var _file = files[0];

    if (_file.type.indexOf('image') == -1) {
      return alert(_file.name + ' 不是图片文件'), false;
    }

    if (!FileReader || !Image) {
      return alert('浏览器不支持预览功能'), false;
    }

    if (this.props.compress) {
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

      _imageReader.onload = function (event) {
        _img.src = event.target.result;
      };

      _imageReader.readAsDataURL(_file);

      _img.onload = function () {
        _self.state.original = {
          size: znui.react.stringifyFileSize(_file.size),
          width: _img.width,
          height: _img.height
        };

        var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);

        _self.state.imageDataURL = _canvas.toDataURL(_file.type, _compress.quality);

        _canvas.toBlob(function (blob) {
          _self.state.compressing = false;

          if (blob) {
            _self.state.compress = {
              size: znui.react.stringifyFileSize(blob.size),
              width: _canvas.width,
              height: _canvas.height
            };
            ajaxUploader.submit([new File([blob], _file.name, {
              lastModifiedDate: new Date().getTime(),
              type: _file.type
            })]);
          }

          _self.forceUpdate();
        }, _file.type, _compress.quality);
      };

      return false;
    } else {
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
      this.props.onChange && this.props.onChange({
        value: value
      }, this);
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
    }, this.__renderImage(), this.state.compress && /*#__PURE__*/React.createElement("div", {
      className: "compress-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "original"
    }, "\u538B\u7F29\u524D\uFF1A", this.state.original.width, " x ", this.state.original.height, " (", this.state.original.size, ")"), /*#__PURE__*/React.createElement("div", {
      className: "compress"
    }, "\u538B\u7F29\u540E\uFF1A", this.state.compress.width, " x ", this.state.compress.height, " (", this.state.compress.size, ")")), this.state.compressing && /*#__PURE__*/React.createElement("span", {
      className: "compressing"
    }, "\u538B\u7F29\u4E2D...")));
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

zn.setting.setKey('zr.uploader', zn.deepAssign({}, zn.setting.getKey('zr.uploader'), {
  uploadApi: '/zxnz.core.fs/upload/files',
  fetchApi: '/zxnz.core.fs/fetch/file/',
  fetchsApi: '/zxnz.core.fs/fetch/files/',
  fetchImageApi: '/zxnz.core.fs/fetch/image/',
  downloadApi: '/zxnz.core.fs/download/file/'
}));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQWpheFVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL0ZpbGVVcGxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9GaWxlVmlld2VyLmpzIiwid2VicGFjazovLy8uL0ZpbGVzVmlld2VyLmpzIiwid2VicGFjazovLy8uL0ltYWdlVXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIl0sIm5hbWVzIjpbIlJlYWN0Iiwiem51aSIsInJlcXVpcmUiLCJSZWFjdERPTSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWFjdCIsImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJuYW1lIiwiYWN0aW9uIiwidHlwZXMiLCJjaGFuZ2VTdWJtaXQiLCJoaWRkZW5zIiwibXVsdGlwbGUiLCJoaW50IiwibWF4RmlsZVNpemUiLCJzaXplIiwiZ2V0SW5pdGlhbFN0YXRlIiwiaG9zdCIsInByb3BzIiwiem4iLCJzZXR0aW5nIiwicGF0aCIsImxvYWRpbmciLCJmaWxlcyIsInByb2dyZXNzIiwidGltZVN0YW1wIiwiX19vbklucHV0Q2hhbmdlIiwiZXZlbnQiLCJzdGF0ZSIsIl9maWxlcyIsIm5hdGl2ZUV2ZW50IiwidGFyZ2V0IiwiX2ZpbGUiLCJsZW5ndGgiLCJhbGVydCIsImkiLCJfbGVuIiwic3RyaW5naWZ5RmlsZVNpemUiLCJmb3JtIiwicmVzZXQiLCJpbmRleE9mIiwidHlwZSIsInNwbGl0Iiwiam9pbiIsInB1c2giLCJfcmVzdWx0Iiwib25DaGFuZ2UiLCJzdWJtaXQiLCJfX29uSW5wdXRDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm9uVXBsb2FkZXJDbGljayIsImRhdGEiLCJfZm9ybURhdGEiLCJGb3JtRGF0YSIsIl9oaWRkZW5zIiwiX2hpZGRlbiIsImlzIiwiZXh0ZW5kIiwiYXBwZW5kIiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFqYXhVcGxvYWQiLCJfaG9zdCIsIl9hcGkiLCJ1cGxvYWRBcGkiLCJjb25zb2xlIiwiZXJyb3IiLCJzZXRTdGF0ZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwidXBsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fYWpheFVwbG9hZFByb2dyZXNzIiwiX19hamF4VXBsb2FkQ29tcGxldGUiLCJfX2FqYXhVcGxvYWRFcnJvciIsIl9fYWpheFVwbG9hZEFib3J0Iiwib3BlbiIsInNlbmQiLCJldnQiLCJsZW5ndGhDb21wdXRhYmxlIiwiTWF0aCIsInJvdW5kIiwibG9hZGVkIiwidG90YWwiLCJmb3JjZVVwZGF0ZSIsIm9uVXBsb2FkaW5nIiwicmVzcG9uc2VUZXh0IiwiX2RhdGEiLCJwYXJzZSIsImNvZGUiLCJvbkNvbXBsZXRlIiwicmVzdWx0IiwibWVzc2FnZSIsIm9uRXJyb3IiLCJvbkFib3J0IiwiZmluZERPTU5vZGUiLCJfX3JlbmRlclByb2Nlc3MiLCJoZWlnaHQiLCJ0b0ZpeGVkIiwicmVuZGVyIiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJEYXRlIiwibm93IiwiQWpheFVwbG9hZGVyIiwidmFsdWVLZXkiLCJlZGl0YWJsZSIsImNvbXByZXNzIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJxdWFsaXR5IiwidmFsdWUiLCJjb21wcmVzc2luZyIsImNvbXBvbmVudERpZE1vdW50IiwiX3JldHVybiIsImRpZE1vdW50IiwiaW5pdFZhbHVlIiwiX19vbkNoYW5nZSIsImFqYXhVcGxvYWRlciIsIl9xdWV1ZSIsInF1ZXVlIiwiZXZlcnkiLCJzZW5kZXIiLCJmaWxlIiwiYmluZCIsIl9jb21wcmVzcyIsIl9pbWFnZVJlYWRlciIsIkZpbGVSZWFkZXIiLCJfaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJzcmMiLCJ0YXNrIiwicmVhZEFzRGF0YVVSTCIsIl9jYW52YXMiLCJpbWFnZVRvQ2FudmFzIiwidG9CbG9iIiwiYmxvYiIsImRvbmUiLCJGaWxlIiwibGFzdE1vZGlmaWVkRGF0ZSIsImdldFRpbWUiLCJzdGFydCIsIm9uVXBsb2FkZXJDaGFuZ2UiLCJmZXRjaHNBcGkiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzZXRGaWxlcyIsInN0YXR1cyIsIl9fb25Db21wbGV0ZSIsInVwbG9hZGVyIiwiX3ZhbHVlS2V5IiwiX3ZhbHVlcyIsIm1hcCIsImNvbmNhdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJfX29uRmlsZUNsaWNrIiwiaW5kZXgiLCJvbkZpbGVDbGljayIsIl9fb25SZW1vdmUiLCJzcGxpY2UiLCJfX2ZpbGVEb3dubG9hZFJlbmRlciIsImRvd25sb2FkQXBpIiwiZG93bmxvYWRVUkwiLCJfX3JlbmRlckZpbGVzIiwiX2VkaXRhYmxlIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsIl90ZW1wIiwib25GaWxlUmVuZGVyIiwidXBsb2FkZXJTdHlsZSIsInN0eWxlIiwid2lkdGgiLCJmdWxsU2NyZWVuIiwibG9nIiwic2V0RmlsZSIsImZldGNoQXBpIiwiX19yZW5kZXJGaWxlQ29udGVudCIsIl92aWV3IiwiX3NyYyIsInBvc3RlciIsIl9fZnVsbFNjcmVlbiIsIl9fb25QcmV2aWV3IiwiRmlsZVZpZXdlciIsImltYWdlRGF0YVVSTCIsIm9yaWdpbmFsIiwiX3NlbGYiLCJ0b0RhdGFVUkwiLCJfX3JlbmRlckltYWdlIiwic2V0S2V5IiwiZGVlcEFzc2lnbiIsImdldEtleSIsImZldGNoSW1hZ2VBcGkiLCJGaWxlVXBsb2FkZXIiLCJGaWxlc1ZpZXdlciIsIkltYWdlVXBsb2FkZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFD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LENBQWMsRUFBZCxFQUFrQi9LLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXK0ssTUFBWCxDQUFrQixhQUFsQixDQUFsQixFQUFvRDtBQUNqRmxJLFdBQVMsRUFBRSw0QkFEc0U7QUFFakZtSCxVQUFRLEVBQUUsMkJBRnVFO0FBR2pGbEMsV0FBUyxFQUFFLDRCQUhzRTtBQUlqRmtELGVBQWEsRUFBRSw0QkFKa0U7QUFLakY5QixhQUFXLEVBQUU7QUFMb0UsQ0FBcEQsQ0FBakM7QUFRQXJLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNid0csY0FBWSxFQUFFM0csbUJBQU8sQ0FBQyx5Q0FBRCxDQURSO0FBRWJzTSxjQUFZLEVBQUV0TSxtQkFBTyxDQUFDLHlDQUFELENBRlI7QUFHYjRMLFlBQVUsRUFBRTVMLG1CQUFPLENBQUMscUNBQUQsQ0FITjtBQUlidU0sYUFBVyxFQUFFdk0sbUJBQU8sQ0FBQyx1Q0FBRCxDQUpQO0FBS2J3TSxlQUFhLEVBQUV4TSxtQkFBTyxDQUFDLDJDQUFEO0FBTFQsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNSQSxhQUFhLGdDQUFnQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQS9DLGFBQWEsbUNBQW1DLEVBQUUsSSIsImZpbGUiOiIuL2Rpc3QvZGV2ZWxvcG1lbnQvaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHpudWkuUmVhY3RET00gfHwgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidBamF4VXBsb2FkZXInLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogJ3pyX2FqYXhfdXBsb2FkZXJfZmlsZScsXG5cdFx0XHRhY3Rpb246ICcvenhuei5jb3JlLmZzL3VwbG9hZC9maWxlcycsXG5cdFx0XHR0eXBlczogW10sXG5cdFx0XHRjaGFuZ2VTdWJtaXQ6IHRydWUsXG5cdFx0XHRoaWRkZW5zOiBudWxsLFxuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cdFx0XHRoaW50OiBmYWxzZSxcblx0XHRcdG1heEZpbGVTaXplOiA1MDAgKiAxMDI0ICogMTAyNCxcblx0XHRcdHNpemU6ICcnXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpLFxuXHRcdFx0bG9hZGluZzogZmFsc2UsXG5cdFx0XHRmaWxlczogW10sXG5cdFx0XHRwcm9ncmVzczogMCxcblx0XHRcdHRpbWVTdGFtcDogMFxuXHRcdH07XG5cdH0sXG5cdF9fb25JbnB1dENoYW5nZTogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRpZih0aGlzLnN0YXRlLmxvYWRpbmcpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLnN0YXRlLmZpbGVzID0gW107XG5cdFx0dmFyIF9maWxlcyA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5maWxlcyxcblx0XHRcdF9maWxlID0gbnVsbDtcblx0XHRpZighX2ZpbGVzLmxlbmd0aCl7XG5cdFx0XHRyZXR1cm4gYWxlcnQoJ+acqumAieaLqeaWh+S7ticpO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfZmlsZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKXtcblx0XHRcdF9maWxlID0gX2ZpbGVzW2ldO1xuXHRcdFx0aWYoX2ZpbGUuc2l6ZSA+IHRoaXMucHJvcHMubWF4RmlsZVNpemUpe1xuXHRcdFx0XHRhbGVydChfZmlsZS5uYW1lICsgXCIg5paH5Lu25aSn5bCP5pivXCIgKyB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKF9maWxlLnNpemUpKyBcIiwg5LiN6IO96LaF6L+HXCIgKyB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKHRoaXMucHJvcHMubWF4RmlsZVNpemUpKTtcblx0XHRcdFx0cmV0dXJuIGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5mb3JtLnJlc2V0KCksIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5wcm9wcy50eXBlcy5sZW5ndGgpIHtcblx0XHRcdFx0aWYodGhpcy5wcm9wcy50eXBlcy5pbmRleE9mKF9maWxlLnR5cGUuc3BsaXQoJy8nKVswXSkgPT0gLTEpe1xuXHRcdFx0XHRcdHJldHVybiBhbGVydCgn5Y+q5pSv5oyBJyArIHRoaXMucHJvcHMudHlwZXMuam9pbignLCcpICsgJ+eahOaWh+S7tuexu+WeiycpLCBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnN0YXRlLmZpbGVzLnB1c2goX2ZpbGUpO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgX3Jlc3VsdCA9IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmZpbGVzLCB0aGlzKTtcblx0XHRpZihfcmVzdWx0IT09ZmFsc2UgJiYgdGhpcy5wcm9wcy5jaGFuZ2VTdWJtaXQpe1xuXHRcdFx0dGhpcy5zdWJtaXQodGhpcy5zdGF0ZS5maWxlcywgX3Jlc3VsdCk7XG5cdFx0fVxuXHR9LFxuXHRfX29uSW5wdXRDbGljazogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRpZih0aGlzLnN0YXRlLmxvYWRpbmcpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayAmJiB0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayhldmVudCwgdGhpcyk7XG5cdH0sXG5cdHN1Ym1pdDogZnVuY3Rpb24gKGZpbGVzLCBkYXRhKXtcblx0XHR2YXIgX2ZpbGUgPSBmaWxlcyB8fCB0aGlzLnN0YXRlLmZpbGVzLFxuXHRcdFx0X2Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCksXG5cdFx0XHRfaGlkZGVucyA9IHRoaXMucHJvcHMuaGlkZGVucyB8fCB7fSxcblx0XHRcdF9oaWRkZW4gPSBudWxsO1xuXG5cdFx0aWYoem4uaXMoZGF0YSwgJ29iamVjdCcpKXtcblx0XHRcdHpuLmV4dGVuZChfaGlkZGVucywgZGF0YSk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gMCwgX2xlbiA9IF9maWxlLmxlbmd0aDsgaSA8IF9sZW47IGkrKyl7XG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKHRoaXMucHJvcHMubmFtZSArICdfJyArIGksIF9maWxlW2ldKTtcblx0XHR9XG5cblx0XHRmb3IodmFyIGtleSBpbiBfaGlkZGVucyl7XG5cdFx0XHRfaGlkZGVuID0gX2hpZGRlbnNba2V5XTtcblx0XHRcdGlmKHR5cGVvZiBfaGlkZGVuID09ICdvYmplY3QnKXtcblx0XHRcdFx0X2hpZGRlbiA9IEpTT04uc3RyaW5naWZ5KF9oaWRkZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKGtleSwgX2hpZGRlbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5hamF4VXBsb2FkKF9mb3JtRGF0YSk7XG5cdH0sXG5cdGFqYXhVcGxvYWQ6IGZ1bmN0aW9uIChkYXRhKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRIb3N0JyksXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5hY3Rpb24gfHwgdGhpcy5wcm9wcy51cGxvYWRBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKCFfYXBpKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuaWh+S7tuS4iuS8oOaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCB0aGlzLl9fYWpheFVwbG9hZFByb2dyZXNzLCBmYWxzZSk7XG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMuX19hamF4VXBsb2FkQ29tcGxldGUsIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRoaXMuX19hamF4VXBsb2FkRXJyb3IsIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIHRoaXMuX19hamF4VXBsb2FkQWJvcnQsIGZhbHNlKTtcblx0XHR4aHIub3BlbihcIlBPU1RcIiwgX2FwaSwgXCJ0cnVlXCIpO1xuXHRcdHhoci5zZW5kKGRhdGEpO1xuXHR9LFxuXHRfX2FqYXhVcGxvYWRQcm9ncmVzczogZnVuY3Rpb24gKGV2dCl7XG5cdFx0aWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG5cdFx0XHRldnQucHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKGV2dC5sb2FkZWQgKiAxMDAgLyBldnQudG90YWwpO1xuXHRcdFx0dGhpcy5zdGF0ZS5wcm9ncmVzcyA9IGV2dC5wcm9ncmVzcztcblx0XHRcdHRoaXMuc3RhdGUudGltZVN0YW1wID0gZXZ0LnRpbWVTdGFtcDtcblx0XHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vblVwbG9hZGluZyAmJiB0aGlzLnByb3BzLm9uVXBsb2FkaW5nKGV2dCwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZENvbXBsZXRlOiBmdW5jdGlvbiAoZXZ0KXtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0dGhpcy5zdGF0ZS5wcm9ncmVzcyA9IDA7XG5cdFx0dGhpcy5zdGF0ZS50aW1lU3RhbXAgPSAwO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0XHRpZihldnQudGFyZ2V0LnJlc3BvbnNlVGV4dC5pbmRleE9mKCc8IURPQ1RZUEUgaHRtbD4nKSA9PSAwKXtcblx0XHRcdHJldHVybiBhbGVydChldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCksIGZhbHNlO1xuXHRcdH1cblx0XHRpZihldnQudGFyZ2V0LnJlc3BvbnNlVGV4dC5pbmRleE9mKCd7JykgPT0gMCB8fCBldnQudGFyZ2V0LnJlc3BvbnNlVGV4dC5pbmRleE9mKCdbJykgPT0gMCl7XG5cdFx0XHR2YXIgX2RhdGEgPSBKU09OLnBhcnNlKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0KTtcblx0XHRcdGlmKF9kYXRhLmNvZGUgPT0gMjAwKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNvbXBsZXRlICYmIHRoaXMucHJvcHMub25Db21wbGV0ZShfZGF0YS5yZXN1bHQsIHRoaXMpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKF9kYXRhLnJlc3VsdHx8X2RhdGEubWVzc2FnZSk7XG5cdFx0XHRcdHRoaXMucHJvcHMub25FcnJvciAmJiB0aGlzLnByb3BzLm9uRXJyb3IoX2RhdGEucmVzdWx0LCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdF9fYWpheFVwbG9hZEVycm9yOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKGV2ZW50Lm1lc3NhZ2UsIHRoaXMpO1xuXHR9LFxuXHRfX2FqYXhVcGxvYWRBYm9ydDogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0dGhpcy5wcm9wcy5vbkFib3J0ICYmIHRoaXMucHJvcHMub25BYm9ydChldmVudCwgdGhpcyk7XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XG5cdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucmVzZXQoKTtcblx0fSxcblx0X19yZW5kZXJQcm9jZXNzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLnByb2dyZXNzKXtcblx0XHRcdGlmKHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT0gMTAwKSB7XG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1wcm9ncmVzc1wiIHN0eWxlPXt7aGVpZ2h0OiAnMTAwJSd9fT5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJjaGVja1wiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWNoZWNrIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNzMuODk4IDQzOS40MDRsLTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtcHJvZ3Jlc3NcIiBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS5wcm9ncmVzcyArICclJ319PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnByb2dyZXNzICsgJyUnfSh7KHRoaXMuc3RhdGUudGltZVN0YW1wLzEwMDApLnRvRml4ZWQoMSl9cylcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmFjdGlvbiB8fCB0aGlzLnByb3BzLnVwbG9hZEFwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoIV9hcGkpIGNvbnNvbGUuZXJyb3IoXCLmlofku7bkuIrkvKDmjqXlj6PmnKrovpPlhaVcIik7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1hamF4LXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0ZGF0YS1sb2FkaW5nPXt0aGlzLnN0YXRlLmxvYWRpbmd9XG5cdFx0XHRcdGFjdGlvbj17X2FwaX1cblx0XHRcdFx0ZW5jVHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuXHRcdFx0XHRtZXRob2Q9XCJQT1NUXCI+XG5cdFx0XHRcdHt0aGlzLl9fcmVuZGVyUHJvY2VzcygpfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFqYXgtdXBsb2FkLWNvbnRhaW5lclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5oaW50ICYmIDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57dGhpcy5wcm9wcy5zaXplICsgJyAnICsgem51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSh0aGlzLnByb3BzLm1heEZpbGVTaXplKX08L3NwYW4+fVxuXHRcdFx0XHQ8aW5wdXQgbXVsdGlwbGU9e3RoaXMucHJvcHMubXVsdGlwbGV9IGNsYXNzTmFtZT1cImlucHV0XCIgdHlwZT1cImZpbGVcIiBuYW1lPXt0aGlzLnByb3BzLm5hbWV8fCgnenJfYWpheF91cGxvYWRlcl9maWxlXycgKyBEYXRlLm5vdygpKX0gb25DaGFuZ2U9e3RoaXMuX19vbklucHV0Q2hhbmdlfSBvbkNsaWNrPXt0aGlzLl9fb25JbnB1dENsaWNrfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFqYXgtdXBsb2FkLWljb25cIj5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJ1cGxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS11cGxvYWQgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI5NiAzODRoLTgwYy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYxOTJoLTg3LjdjLTE3LjggMC0yNi43LTIxLjUtMTQuMS0zNC4xTDI0Mi4zIDUuN2M3LjUtNy41IDE5LjgtNy41IDI3LjMgMGwxNTIuMiAxNTIuMmMxMi42IDEyLjYgMy43IDM0LjEtMTQuMSAzNC4xSDMyMHYxNjhjMCAxMy4zLTEwLjcgMjQtMjQgMjR6bTIxNi04djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDEzNnY4YzAgMzAuOSAyNS4xIDU2IDU2IDU2aDgwYzMwLjkgMCA1Ni0yNS4xIDU2LTU2di04aDEzNmMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBamF4VXBsb2FkZXIgPSByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdGhvc3Q6IHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHRcdGZpbGVzOiBbXSxcblx0XHRcdGNvbXByZXNzaW5nOiBmYWxzZVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcywgYWpheFVwbG9hZGVyKXtcblx0XHRpZih0aGlzLnByb3BzLmNvbXByZXNzKSB7XG5cdFx0XHR2YXIgX2ZpbGVzID0gW10sXG5cdFx0XHRcdF9xdWV1ZSA9IHpuLnF1ZXVlKHt9LCB7XG5cdFx0XHRcdFx0ZXZlcnk6IGZ1bmN0aW9uIChzZW5kZXIsIGZpbGUpe1xuXHRcdFx0XHRcdFx0X2ZpbGVzLnB1c2goZmlsZSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5hbGx5OiBmdW5jdGlvbiAoc2VuZGVyKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRjb21wcmVzc2luZzogZmFsc2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YWpheFVwbG9hZGVyLnN1Ym1pdChfZmlsZXMpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0X2NvbXByZXNzID0gem4uZXh0ZW5kKHtcblx0XHRcdFx0XHRtYXhXaWR0aDogMTAyNCxcblx0XHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0XHRxdWFsaXR5OiAxXG5cdFx0XHRcdH0sIHRoaXMucHJvcHMuY29tcHJlc3MpLFxuXHRcdFx0XHRfaW1hZ2VSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpLFxuXHRcdFx0XHRfaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRcdFx0X2ltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wcmVzc2luZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRmb3IodmFyIGZpbGUgb2YgZmlsZXMpe1xuXHRcdFx0XHRpZihmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PT0gMCl7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0X2ltYWdlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdF9pbWcub25sb2FkID0gZnVuY3Rpb24gKCl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9jYW52YXMgPSB6bnVpLmltYWdlVG9DYW52YXMoX2ltZywgX2NvbXByZXNzLm1heFdpZHRoLCBfY29tcHJlc3MubWF4SGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRfY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYil7XG5cdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmRvbmUobmV3IEZpbGUoW2Jsb2JdLCBmaWxlLm5hbWUsIHsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZERhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBmaWxlLnR5cGVcblx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHR9LCBmaWxlLnR5cGUsIF9jb21wcmVzcy5xdWFsaXR5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0dGFzay5kb25lKGZpbGUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0X3F1ZXVlLnN0YXJ0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGVyQ2hhbmdlKGZpbGVzLCBhamF4VXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRpbml0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0aWYoIXZhbHVlKSByZXR1cm47XG5cdFx0dmFyIF9ob3N0ID0gdGhpcy5zdGF0ZS5ob3N0LFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZmV0Y2hzQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hzQXBpJyk7XG5cdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRpZighX2FwaSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bpqozor4HmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXHRcdGlmKHpuLmlzKHZhbHVlLCAnYXJyYXknKSl7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcblx0XHR9XG5cdFx0em4uZGF0YS5nZXQoX2FwaSArIHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRpZih6bi5pcyhyZXNwb25zZSwgJ2FycmF5Jykpe1xuXHRcdFx0XHR0aGlzLnNldEZpbGVzKHJlc3BvbnNlKTtcblx0XHRcdH1lbHNlIGlmKHpuLmlzKHJlc3BvbnNlLCAnb2JqZWN0Jykpe1xuXHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXM9PTIwMCAmJiB0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PSAnb2JqZWN0JyAmJiByZXNwb25zZS5kYXRhLmNvZGUgPT0gMjAwICYmIHpuLmlzKHJlc3BvbnNlLmRhdGEucmVzdWx0LCAnYXJyYXknKSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRGaWxlcyhyZXNwb25zZS5kYXRhLnJlc3VsdCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCLnvZHnu5zor7fmsYLplJnor686IFwiLCByZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uICgpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIue9kee7nOivt+axgumUmeivr1wiKTtcblx0XHR9KTtcblx0fSxcblx0X19vbkNvbXBsZXRlOiBmdW5jdGlvbiAoZGF0YSwgdXBsb2FkZXIpe1xuXHRcdHRoaXMuc2V0RmlsZXMoZGF0YSk7XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHsgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUgfSwgdGhpcyk7XG5cdFx0dGhpcy5wcm9wcy5vbkNvbXBsZXRlICYmIHRoaXMucHJvcHMub25Db21wbGV0ZShkYXRhLCB1cGxvYWRlciwgdGhpcyk7XG5cdH0sXG5cdHNldEZpbGVzOiBmdW5jdGlvbiAoZmlsZXMpe1xuXHRcdHZhciBfdmFsdWVLZXkgPSB0aGlzLnByb3BzLnZhbHVlS2V5O1xuXHRcdHZhciBfdmFsdWVzID0gKGZpbGVzfHxbXSkubWFwKGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdGlmKGZpbGUgJiYgZmlsZVtfdmFsdWVLZXldKXtcblx0XHRcdFx0cmV0dXJuIGZpbGVbX3ZhbHVlS2V5XTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnN0YXRlLnZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZS5jb25jYXQoX3ZhbHVlcyk7XG5cdFx0dGhpcy5zdGF0ZS5maWxlcyA9IHRoaXMuc3RhdGUuZmlsZXMuY29uY2F0KGZpbGVzKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdGdldFZhbHVlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcblx0fSxcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9KTtcblx0fSxcblx0X19vbkZpbGVDbGljazogZnVuY3Rpb24gKGZpbGUsIGluZGV4KXtcblx0XHR2YXIgX3JldHVybiAgPSB0aGlzLnByb3BzLm9uRmlsZUNsaWNrICYmIHRoaXMucHJvcHMub25GaWxlQ2xpY2soZmlsZSwgaW5kZXgpO1xuXHR9LFxuXHRfX29uUmVtb3ZlOiBmdW5jdGlvbiAoZmlsZSwgaW5kZXgpe1xuXHRcdHRoaXMuc3RhdGUuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR0aGlzLnN0YXRlLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XG5cdFx0XHRmaWxlOiBmaWxlLFxuXHRcdFx0aW5kZXg6IGluZGV4LFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsXG5cdFx0XHRmaWxlczogdGhpcy5zdGF0ZS5maWxlc1xuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXHRfX2ZpbGVEb3dubG9hZFJlbmRlcjogZnVuY3Rpb24gKGZpbGUpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmRvd25sb2FkSG9zdCcpLFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZG93bmxvYWRBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoX2FwaSl7XG5cdFx0XHRyZXR1cm4gPHNwYW4gb25DbGljaz17KCk9PnpudWkuZG93bmxvYWRVUkwoX2FwaSArIGZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV0sIGZpbGUubmFtZSl9IGNsYXNzTmFtZT1cImRvd25sb2FkXCI+XG5cdFx0XHRcdDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cImRvd25sb2FkXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtZG93bmxvYWQgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxNiAwaDgwYzEzLjMgMCAyNCAxMC43IDI0IDI0djE2OGg4Ny43YzE3LjggMCAyNi43IDIxLjUgMTQuMSAzNC4xTDI2OS43IDM3OC4zYy03LjUgNy41LTE5LjggNy41LTI3LjMgMEw5MC4xIDIyNi4xYy0xMi42LTEyLjYtMy43LTM0LjEgMTQuMS0zNC4xSDE5MlYyNGMwLTEzLjMgMTAuNy0yNCAyNC0yNHptMjk2IDM3NnYxMTJjMCAxMy4zLTEwLjcgMjQtMjQgMjRIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0VjM3NmMwLTEzLjMgMTAuNy0yNCAyNC0yNGgxNDYuN2w0OSA0OWMyMC4xIDIwLjEgNTIuNSAyMC4xIDcyLjYgMGw0OS00OUg0ODhjMTMuMyAwIDI0IDEwLjcgMjQgMjR6bS0xMjQgODhjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHptNjQgMGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwelwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdDwvc3Bhbj47XG5cdFx0fVxuXHR9LFxuXHRfX3JlbmRlckZpbGVzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLmZpbGVzKXtcblx0XHRcdHZhciBfZWRpdGFibGUgPSAodGhpcy5wcm9wcy5lZGl0YWJsZSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkb25seSk7XG5cdFx0XHRyZXR1cm4gPHVsIGNsYXNzTmFtZT1cImZpbGUtbGlzdFwiPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5maWxlcy5tYXAoZnVuY3Rpb24gKGZpbGUsIGluZGV4KXtcblx0XHRcdFx0XHRcdGlmKGZpbGUpe1xuXHRcdFx0XHRcdFx0XHR2YXIgX3RlbXAgPSB0aGlzLnByb3BzLm9uRmlsZVJlbmRlciAmJiB0aGlzLnByb3BzLm9uRmlsZVJlbmRlcihmaWxlLCBpbmRleCk7XG5cdFx0XHRcdFx0XHRcdGlmKF90ZW1wKXtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RlbXA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxsaSBrZXk9e2ZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV19IGNsYXNzTmFtZT1cImZpbGVcIj5cblx0XHRcdFx0XHRcdFx0XHR7IF9lZGl0YWJsZSAmJiA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJ0cmFzaC1hbHRcIiBvbkNsaWNrPXsoKT0+dGhpcy5fX29uUmVtb3ZlKGZpbGUsIGluZGV4KX0gY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtcmVtb3ZlIHpyLWhvdmVyLXNlbGYtbG9hZGluZyBmYS10cmFzaC1hbHQgZmEtdy0xNCBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTMyIDQ2NGE0OCA0OCAwIDAgMCA0OCA0OGgyODhhNDggNDggMCAwIDAgNDgtNDhWMTI4SDMyem0yNzItMjU2YTE2IDE2IDAgMCAxIDMyIDB2MjI0YTE2IDE2IDAgMCAxLTMyIDB6bS05NiAwYTE2IDE2IDAgMCAxIDMyIDB2MjI0YTE2IDE2IDAgMCAxLTMyIDB6bS05NiAwYTE2IDE2IDAgMCAxIDMyIDB2MjI0YTE2IDE2IDAgMCAxLTMyIDB6TTQzMiAzMkgzMTJsLTkuNC0xOC43QTI0IDI0IDAgMCAwIDI4MS4xIDBIMTY2LjhhMjMuNzIgMjMuNzIgMCAwIDAtMjEuNCAxMy4zTDEzNiAzMkgxNkExNiAxNiAwIDAgMCAwIDQ4djMyYTE2IDE2IDAgMCAwIDE2IDE2aDQxNmExNiAxNiAwIDAgMCAxNi0xNlY0OGExNiAxNiAwIDAgMC0xNi0xNnpcIj48L3BhdGg+PC9zdmc+fVxuXHRcdFx0XHRcdFx0XHRcdHt0aGlzLl9fZmlsZURvd25sb2FkUmVuZGVyKGZpbGUsIGluZGV4KX1cblx0XHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJsaW5rXCIgb25DbGljaz17KCk9PnRoaXMuX19vbkZpbGVDbGljayhmaWxlLCBpbmRleCl9PntmaWxlLm5hbWV9PC9hPlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57em51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSgrZmlsZS5zaXplKX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvbGk+O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0fVxuXHRcdFx0PC91bD47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIF9lZGl0YWJsZSA9ICh0aGlzLnByb3BzLmVkaXRhYmxlICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRvbmx5KTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItZmlsZS11cGxvYWRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0X2VkaXRhYmxlICYmIDxBamF4VXBsb2FkZXJcblx0XHRcdFx0XHRcdHsuLi50aGlzLnByb3BzfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMudXBsb2FkZXJTdHlsZX1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLl9fb25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRvbkNvbXBsZXRlPXt0aGlzLl9fb25Db21wbGV0ZX0gPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtY29udGFpbmVyXCIgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkLWljb25cIj5cblx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJmaWxlLXVwbG9hZFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtdXBsb2FkIGZhLXctMTIgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQgMTM2VjBIMjRDMTAuNyAwIDAgMTAuNyAwIDI0djQ2NGMwIDEzLjMgMTAuNyAyNCAyNCAyNGgzMzZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMTYwSDI0OGMtMTMuMiAwLTI0LTEwLjgtMjQtMjR6bTY1LjE4IDIxNi4wMUgyMjR2ODBjMCA4Ljg0LTcuMTYgMTYtMTYgMTZoLTMyYy04Ljg0IDAtMTYtNy4xNi0xNi0xNnYtODBIOTQuODJjLTE0LjI4IDAtMjEuNDEtMTcuMjktMTEuMjctMjcuMzZsOTYuNDItOTUuN2M2LjY1LTYuNjEgMTcuMzktNi42MSAyNC4wNCAwbDk2LjQyIDk1LjdjMTAuMTUgMTAuMDcgMy4wMyAyNy4zNi0xMS4yNSAyNy4zNnpNMzc3IDEwNUwyNzkuMSA3Yy00LjUtNC41LTEwLjYtNy0xNy03SDI1NnYxMjhoMTI4di02LjFjMC02LjMtMi41LTEyLjQtNy0xNi45elwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdFx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5jb21wcmVzc2luZyAmJiA8c3BhbiBjbGFzc05hbWU9XCJjb21wcmVzc2luZ1wiPuWOi+e8qeS4rS4uLjwvc3Bhbj59XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9BamF4VXBsb2FkZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0e3RoaXMuX19yZW5kZXJGaWxlcygpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidGaWxlVmlld2VyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHR3aWR0aDogNDgwLFxuXHRcdFx0aGVpZ2h0OiAzMjBcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG5cdFx0XHRob3N0OiB0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JyksXG5cdFx0XHRmdWxsU2NyZWVuOiBmYWxzZSxcblx0XHRcdGZpbGVzOiBbXVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdHRoaXMuaW5pdFZhbHVlKHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdH1cblx0fSxcblx0aW5pdFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdGlmKCF2YWx1ZSkgcmV0dXJuO1xuXHRcdGlmKHpuLmlzKHZhbHVlLCAnb2JqZWN0JykpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldEZpbGUodmFsdWUpLCBmYWxzZTtcblx0XHR9ZWxzZSBpZih6bi5pcyh2YWx1ZSwgJ3N0cmluZycpKXtcblx0XHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCxcblx0XHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZmV0Y2hBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaEFwaScpO1xuXHRcdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRcdGlmKCFfYXBpKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuaWh+S7tumqjOivgeaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cdFx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdFx0aWYoem4uaXMocmVzcG9uc2UsICdhcnJheScpKXtcblx0XHRcdFx0XHR0aGlzLnNldEZpbGVzKHJlc3BvbnNlKTtcblx0XHRcdFx0fWVsc2UgaWYoem4uaXMocmVzcG9uc2UsICdvYmplY3QnKSl7XG5cdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzPT0yMDAgJiYgdHlwZW9mIHJlc3BvbnNlLmRhdGEgPT0gJ29iamVjdCcgJiYgcmVzcG9uc2UuZGF0YS5jb2RlID09IDIwMCAmJiB6bi5pcyhyZXNwb25zZS5kYXRhLnJlc3VsdCwgJ2FycmF5Jykpe1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRGaWxlcyhyZXNwb25zZS5kYXRhLnJlc3VsdCk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRmlsZVZpZXdlci5qcyDnvZHnu5zor7fmsYLplJnor686IFwiLCByZXNwb25zZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uICgpe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRmlsZVZpZXdlci5qcyDnvZHnu5zor7fmsYLplJnor69cIik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdHNldEZpbGU6IGZ1bmN0aW9uIChmaWxlKXtcblx0XHR0aGlzLnN0YXRlLmZpbGUgPSBmaWxlO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0X19maWxlRG93bmxvYWRSZW5kZXI6IGZ1bmN0aW9uIChmaWxlKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmRvd25sb2FkQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZG93bmxvYWRBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKF9hcGkpe1xuXHRcdFx0cmV0dXJuIDxzcGFuIG9uQ2xpY2s9eygpPT56bnVpLmRvd25sb2FkVVJMKF9hcGkgKyBmaWxlW3RoaXMucHJvcHMudmFsdWVLZXldLCBmaWxlLm5hbWUpfSBjbGFzc05hbWU9XCJkb3dubG9hZFwiPlxuXHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJkb3dubG9hZFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWRvd25sb2FkIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMTYgMGg4MGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYxNjhoODcuN2MxNy44IDAgMjYuNyAyMS41IDE0LjEgMzQuMUwyNjkuNyAzNzguM2MtNy41IDcuNS0xOS44IDcuNS0yNy4zIDBMOTAuMSAyMjYuMWMtMTIuNi0xMi42LTMuNy0zNC4xIDE0LjEtMzQuMUgxOTJWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjR6bTI5NiAzNzZ2MTEyYzAgMTMuMy0xMC43IDI0LTI0IDI0SDI0Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYzNzZjMC0xMy4zIDEwLjctMjQgMjQtMjRoMTQ2LjdsNDkgNDljMjAuMSAyMC4xIDUyLjUgMjAuMSA3Mi42IDBsNDktNDlINDg4YzEzLjMgMCAyNCAxMC43IDI0IDI0em0tMTI0IDg4YzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6bTY0IDBjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHQ8L3NwYW4+O1xuXHRcdH1cblx0fSxcblx0X19yZW5kZXJGaWxlQ29udGVudDogZnVuY3Rpb24gKGZpbGUpe1xuXHRcdHZhciBfdmlldyA9IG51bGwsXG5cdFx0XHRfc3JjID0gJyc7XG5cdFx0aWYoZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPT0gMCl7XG5cdFx0XHRfc3JjID0gKHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCAnJykgKyAoem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaEltYWdlQXBpJykgfHwgJycpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XTtcblx0XHRcdF92aWV3ID0gPGltZyBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICdhdXRvJyB9fSBjbGFzc05hbWU9XCJ2aWV3IGltZy12aWV3XCIgc3JjPXtfc3JjfSAvPjtcblx0XHR9ZWxzZSBpZihmaWxlLnR5cGUuaW5kZXhPZigndmlkZW8nKSA9PSAwKXtcblx0XHRcdF9zcmMgPSAodGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8ICcnKSArICh6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmZldGNoSW1hZ2VBcGknKSB8fCAnJykgKyBmaWxlW3RoaXMucHJvcHMudmFsdWVLZXldO1xuXHRcdFx0X3ZpZXcgPSA8dmlkZW9cblx0XHRcdFx0Y2xhc3NOYW1lPVwidmlldyBpZGVvLXZpZXdcIlxuXHRcdFx0XHRjb250cm9sc1xuXHRcdFx0XHRwcmVsb2FkPVwiYXV0b1wiXG5cdFx0XHRcdHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBcblx0XHRcdFx0aGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH1cblx0XHRcdFx0cG9zdGVyPXt0aGlzLnByb3BzLnBvc3Rlcn0+XG5cdFx0XHRcdDxzb3VyY2Ugc3JjPXtfc3JjfSB0eXBlPVwidmlkZW8vbXA0XCIgLz5cblx0XHRcdFx0PHNvdXJjZSBzcmM9e19zcmN9IHR5cGU9XCJ2aWRlby93ZWJtXCIgLz5cblx0XHRcdFx0PHAgY2xhc3NOYW1lPVwidGlwc1wiPlxuXHRcdFx0XHRcdFRvIHZpZXcgdGhpcyB2aWRlbyBwbGVhc2UgZW5hYmxlIEphdmFTY3JpcHQsIGFuZCBjb25zaWRlciB1cGdyYWRpbmcgdG8gYSB3ZWIgYnJvd3NlciB0aGF0XG5cdFx0XHRcdFx0PGEgaHJlZj1cImh0dHBzOi8vdmlkZW9qcy5jb20vaHRtbDUtdmlkZW8tc3VwcG9ydC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5zdXBwb3J0cyBIVE1MNSB2aWRlbzwvYT5cblx0XHRcdFx0PC9wPlxuXHRcdFx0PC92aWRlbz47XG5cdFx0fVxuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdmlld1wiID5cblx0XHRcdHtfdmlld31cblx0XHQ8L2Rpdj47XG5cdH0sXG5cdF9fZnVsbFNjcmVlbjogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmdWxsU2NyZWVuOiAhdGhpcy5zdGF0ZS5mdWxsU2NyZWVuXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHR2YXIgZmlsZSA9IHRoaXMuc3RhdGUuZmlsZTtcblx0XHRpZighZmlsZSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWZpbGUtdmlld2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCAodGhpcy5zdGF0ZS5mdWxsU2NyZWVuPydmdWxsLXNjcmVlbic6JycpKX0gc3R5bGU9e3pudWkucmVhY3Quc3R5bGUodGhpcy5wcm9wcy5zdHlsZSl9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtaW5mb1wiPlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGUuZnVsbFNjcmVlbiA/IDxzdmcgb25DbGljaz17dGhpcy5fX2Z1bGxTY3JlZW59IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJ3aW5kb3ctY2xvc2VcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS13aW5kb3ctY2xvc2UgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ2NCAzMkg0OEMyMS41IDMyIDAgNTMuNSAwIDgwdjM1MmMwIDI2LjUgMjEuNSA0OCA0OCA0OGg0MTZjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWODBjMC0yNi41LTIxLjUtNDgtNDgtNDh6bS04My42IDI5MC41YzQuOCA0LjggNC44IDEyLjYgMCAxNy40bC00MC41IDQwLjVjLTQuOCA0LjgtMTIuNiA0LjgtMTcuNCAwTDI1NiAzMTMuM2wtNjYuNSA2Ny4xYy00LjggNC44LTEyLjYgNC44LTE3LjQgMGwtNDAuNS00MC41Yy00LjgtNC44LTQuOC0xMi42IDAtMTcuNGw2Ny4xLTY2LjUtNjcuMS02Ni41Yy00LjgtNC44LTQuOC0xMi42IDAtMTcuNGw0MC41LTQwLjVjNC44LTQuOCAxMi42LTQuOCAxNy40IDBsNjYuNSA2Ny4xIDY2LjUtNjcuMWM0LjgtNC44IDEyLjYtNC44IDE3LjQgMGw0MC41IDQwLjVjNC44IDQuOCA0LjggMTIuNiAwIDE3LjRMMzEzLjMgMjU2bDY3LjEgNjYuNXpcIj48L3BhdGg+PC9zdmc+IDogPHN2ZyBvbkNsaWNrPXt0aGlzLl9fZnVsbFNjcmVlbn0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInR2XCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtdHYgZmEtdy0yMCBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTU5MiAwSDQ4QTQ4IDQ4IDAgMCAwIDAgNDh2MzIwYTQ4IDQ4IDAgMCAwIDQ4IDQ4aDI0MHYzMkgxMTJhMTYgMTYgMCAwIDAtMTYgMTZ2MzJhMTYgMTYgMCAwIDAgMTYgMTZoNDE2YTE2IDE2IDAgMCAwIDE2LTE2di0zMmExNiAxNiAwIDAgMC0xNi0xNkgzNTJ2LTMyaDI0MGE0OCA0OCAwIDAgMCA0OC00OFY0OGE0OCA0OCAwIDAgMC00OC00OHptLTE2IDM1Mkg2NFY2NGg1MTJ6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR7dGhpcy5fX2ZpbGVEb3dubG9hZFJlbmRlcihmaWxlKX1cblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJsaW5rXCIgb25DbGljaz17KCk9PnRoaXMuX19vblByZXZpZXcoZmlsZSl9PntmaWxlLm5hbWV9PC9hPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57em51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSgrZmlsZS5zaXplKX08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7dGhpcy5fX3JlbmRlckZpbGVDb250ZW50KGZpbGUpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRmlsZVZpZXdlciA9IHJlcXVpcmUoJy4vRmlsZVZpZXdlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZXNWaWV3ZXInLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZUtleTogJ3RlbXBOYW1lJyxcblx0XHRcdHdpZHRoOiA0ODAsXG5cdFx0XHRoZWlnaHQ6IDMyMFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdGhvc3Q6IHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSxcblx0XHRcdGZpbGVzOiBbXVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdGluaXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHRpZighdmFsdWUpIHJldHVybjtcblx0XHRpZih6bi5pcyh2YWx1ZVswXSwgJ29iamVjdCcpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRGaWxlcyhbdmFsdWVdKSwgZmFsc2U7XG5cdFx0fVxuXHRcdGlmKHpuLmlzKHZhbHVlLCAnYXJyYXknKSAmJiB2YWx1ZS5sZW5ndGggJiYgem4uaXModmFsdWVbMF0sICdvYmplY3QnKSl7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRGaWxlcyh2YWx1ZSksIGZhbHNlO1xuXHRcdH1cblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QsXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5mZXRjaHNBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaHNBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKCFfYXBpKSByZXR1cm4gY29uc29sZS5lcnJvcihcIkZpbGVzVmlld2VyLmpzIOaWh+S7tumqjOivgeaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpKXtcblx0XHRcdHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXHRcdH1cblx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdGlmKHpuLmlzKHJlc3BvbnNlLCAnYXJyYXknKSl7XG5cdFx0XHRcdHRoaXMuc2V0RmlsZXMocmVzcG9uc2UpO1xuXHRcdFx0fWVsc2UgaWYoem4uaXMocmVzcG9uc2UsICdvYmplY3QnKSl7XG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cz09MjAwICYmIHR5cGVvZiByZXNwb25zZS5kYXRhID09ICdvYmplY3QnICYmIHJlc3BvbnNlLmRhdGEuY29kZSA9PSAyMDAgJiYgem4uaXMocmVzcG9uc2UuZGF0YS5yZXN1bHQsICdhcnJheScpKXtcblx0XHRcdFx0XHR0aGlzLnNldEZpbGVzKHJlc3BvbnNlLmRhdGEucmVzdWx0KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVzVmlld2VyLmpzIOe9kee7nOivt+axgumUmeivryBcIiwgcmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpLCBmdW5jdGlvbiAoKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGaWxlc1ZpZXdlci5qcyDnvZHnu5zor7fmsYLplJnor69cIik7XG5cdFx0fSk7XG5cdH0sXG5cdHNldEZpbGVzOiBmdW5jdGlvbiAoZmlsZXMpe1xuXHRcdHRoaXMuc3RhdGUuZmlsZXMgPSBmaWxlcztcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdF9fcmVuZGVyRmlsZXM6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZmlsZXMpe1xuXHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZmlsZS1saXN0XCI+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmZpbGVzLm1hcChmdW5jdGlvbiAoZmlsZSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0aWYoZmlsZSl7XG5cdFx0XHRcdFx0XHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGZpbGUsIGluZGV4KTtcblx0XHRcdFx0XHRcdFx0aWYoX3RlbXApe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGVtcDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPEZpbGVWaWV3ZXIga2V5PXtpbmRleH0gd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9IHZhbHVlPXtmaWxlfSB2YWx1ZUtleT17dGhpcy5wcm9wcy52YWx1ZUtleX0gLz47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWZpbGVzLXZpZXdlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt6bnVpLnJlYWN0LnN0eWxlKHRoaXMucHJvcHMuc3R5bGUpfT5cblx0XHRcdFx0e3RoaXMuX19yZW5kZXJGaWxlcygpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQWpheFVwbG9hZGVyID0gcmVxdWlyZSgnLi9BamF4VXBsb2FkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidJbWFnZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG5cdFx0XHRpbWFnZURhdGFVUkw6IG51bGwsXG5cdFx0XHRvcmlnaW5hbDogbnVsbCxcblx0XHRcdGNvbXByZXNzOiBudWxsLFxuXHRcdFx0Y29tcHJlc3Npbmc6IGZhbHNlXG5cdFx0fTtcbiAgXHR9LFxuXHRfX29uQ2hhbmdlOiBmdW5jdGlvbiAoZmlsZXMsIGFqYXhVcGxvYWRlcil7XG5cdFx0dmFyIF9maWxlID0gZmlsZXNbMF07XG5cdFx0aWYoX2ZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKXtcblx0XHRcdHJldHVybiBhbGVydChfZmlsZS5uYW1lICsgJyDkuI3mmK/lm77niYfmlofku7YnKSwgZmFsc2U7XG5cdFx0fVxuXHRcdGlmKCFGaWxlUmVhZGVyIHx8ICFJbWFnZSkge1xuXHRcdFx0cmV0dXJuIGFsZXJ0KCfmtY/op4jlmajkuI3mlK/mjIHpooTop4jlip/og70nKSwgZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wcm9wcy5jb21wcmVzcykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGNvbXByZXNzaW5nOiB0cnVlXG5cdFx0XHR9KTtcblx0XHRcdHZhciBfc2VsZiA9IHRoaXMsXG5cdFx0XHRcdF9jb21wcmVzcyA9IHpuLmV4dGVuZCh7XG5cdFx0XHRcdFx0bWF4V2lkdGg6IDEwMjQsXG5cdFx0XHRcdFx0bWF4SGVpZ2h0OiA3NjgsXG5cdFx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0XHR9LCB0aGlzLnByb3BzLmNvbXByZXNzKSxcblx0XHRcdFx0X2ltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKSxcblx0XHRcdFx0X2ltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0X2ltYWdlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0XHRcdF9pbWcuc3JjID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdH07XG5cdFx0XHRfaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChfZmlsZSk7XG5cdFx0XHRfaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpe1xuXHRcdFx0XHRfc2VsZi5zdGF0ZS5vcmlnaW5hbCA9IHtcblx0XHRcdFx0XHRzaXplOiB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKF9maWxlLnNpemUpLFxuXHRcdFx0XHRcdHdpZHRoOiBfaW1nLndpZHRoLFxuXHRcdFx0XHRcdGhlaWdodDogX2ltZy5oZWlnaHRcblx0XHRcdFx0fTtcblx0XHRcdFx0dmFyIF9jYW52YXMgPSB6bnVpLmltYWdlVG9DYW52YXMoX2ltZywgX2NvbXByZXNzLm1heFdpZHRoLCBfY29tcHJlc3MubWF4SGVpZ2h0KTtcblx0XHRcdFx0X3NlbGYuc3RhdGUuaW1hZ2VEYXRhVVJMID0gX2NhbnZhcy50b0RhdGFVUkwoX2ZpbGUudHlwZSwgX2NvbXByZXNzLnF1YWxpdHkpO1xuXHRcdFx0XHRfY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYil7XG5cdFx0XHRcdFx0X3NlbGYuc3RhdGUuY29tcHJlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRpZihibG9iKXtcblx0XHRcdFx0XHRcdF9zZWxmLnN0YXRlLmNvbXByZXNzID0ge1xuXHRcdFx0XHRcdFx0XHRzaXplOiB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKGJsb2Iuc2l6ZSksXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiBfY2FudmFzLndpZHRoLFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IF9jYW52YXMuaGVpZ2h0XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YWpheFVwbG9hZGVyLnN1Ym1pdChbXG5cdFx0XHRcdFx0XHRcdG5ldyBGaWxlKFtibG9iXSwgX2ZpbGUubmFtZSwgeyBcblx0XHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWREYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBfZmlsZS50eXBlXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3NlbGYuZm9yY2VVcGRhdGUoKTtcblx0XHRcdFx0fSwgX2ZpbGUudHlwZSwgX2NvbXByZXNzLnF1YWxpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgX2ltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdF9pbWFnZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbWFnZURhdGFVUkw6IGV2ZW50LnRhcmdldC5yZXN1bHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChfZmlsZSk7XG5cdFx0fVxuXHR9LFxuXHRfX29uQ29tcGxldGU6IGZ1bmN0aW9uIChkYXRhLCB1cGxvYWRlcil7XG5cdFx0dmFyIF9maWxlID0gZGF0YVswXTtcblx0XHRpZihfZmlsZSl7XG5cdFx0XHR0aGlzLnNldFZhbHVlKF9maWxlW3RoaXMucHJvcHMudmFsdWVLZXkgfHwgJ3NhdmVkTmFtZSddKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNvbXBsZXRlICYmIHRoaXMucHJvcHMub25Db21wbGV0ZShfZmlsZSwgdGhpcyk7XG5cdH0sXG5cdGdldFZhbHVlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcblx0fSxcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBmdW5jdGlvbiAoKXtcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB2YWx1ZSB9LCB0aGlzKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9LFxuXHRfX3JlbmRlckltYWdlOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3NyYyA9IHRoaXMuc3RhdGUuaW1hZ2VEYXRhVVJMO1xuXHRcdGlmKCFfc3JjKXtcblx0XHRcdF9zcmMgPSB0aGlzLnN0YXRlLnZhbHVlO1xuXHRcdFx0aWYoX3NyYyAmJiBfc3JjLmluZGV4T2YoJ2h0dHAnKSAhPSAwKXtcblx0XHRcdFx0aWYoX3NyYy5pbmRleE9mKCcvJykgIT0gLTEpe1xuXHRcdFx0XHRcdF9zcmMgPSAodGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8ICcnKSArIF9zcmM7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdF9zcmMgPSAodGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8ICcnKSArICh6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmZldGNoSW1hZ2VBcGknKSB8fCAnJykgKyBfc3JjO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmKF9zcmMpe1xuXHRcdFx0cmV0dXJuIDxpbWcgY2xhc3NOYW1lPVwiaW1nXCIgc3JjPXtfc3JjfSAvPjtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImltZy11cGxvYWQtaWNvblwiPlxuXHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJpbWFnZVwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWltYWdlIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NjQgNDQ4SDQ4Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4VjExMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDQxNmMyNi41MSAwIDQ4IDIxLjQ5IDQ4IDQ4djI4OGMwIDI2LjUxLTIxLjQ5IDQ4LTQ4IDQ4ek0xMTIgMTIwYy0zMC45MjggMC01NiAyNS4wNzItNTYgNTZzMjUuMDcyIDU2IDU2IDU2IDU2LTI1LjA3MiA1Ni01Ni0yNS4wNzItNTYtNTYtNTZ6TTY0IDM4NGgzODRWMjcybC04Ny41MTUtODcuNTE1Yy00LjY4Ni00LjY4Ni0xMi4yODQtNC42ODYtMTYuOTcxIDBMMjA4IDMyMGwtNTUuNTE1LTU1LjUxNWMtNC42ODYtNC42ODYtMTIuMjg0LTQuNjg2LTE2Ljk3MSAwTDY0IDMzNnY0OHpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHQ8L2Rpdj47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFqYXhVcGxvYWRlclxuXHRcdFx0XHR7Li4udGhpcy5wcm9wc31cblx0XHRcdFx0Y2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWltYWdlLXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuX19vbkNoYW5nZX1cblx0XHRcdFx0b25Db21wbGV0ZT17dGhpcy5fX29uQ29tcGxldGV9XG5cdFx0XHRcdG11bHRpcGxlPXtmYWxzZX0gPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNvbnRhaW5lclwiIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0XHR7dGhpcy5fX3JlbmRlckltYWdlKCl9XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5jb21wcmVzcyAmJiA8ZGl2IGNsYXNzTmFtZT1cImNvbXByZXNzLWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJvcmlnaW5hbFwiPuWOi+e8qeWJje+8mnt0aGlzLnN0YXRlLm9yaWdpbmFsLndpZHRofSB4IHt0aGlzLnN0YXRlLm9yaWdpbmFsLmhlaWdodH0gKHt0aGlzLnN0YXRlLm9yaWdpbmFsLnNpemV9KTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbXByZXNzXCI+5Y6L57yp5ZCO77yae3RoaXMuc3RhdGUuY29tcHJlc3Mud2lkdGh9IHgge3RoaXMuc3RhdGUuY29tcHJlc3MuaGVpZ2h0fSAoe3RoaXMuc3RhdGUuY29tcHJlc3Muc2l6ZX0pPC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5jb21wcmVzc2luZyAmJiA8c3BhbiBjbGFzc05hbWU9XCJjb21wcmVzc2luZ1wiPuWOi+e8qeS4rS4uLjwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9BamF4VXBsb2FkZXI+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ6bi5zZXR0aW5nLnNldEtleSgnenIudXBsb2FkZXInLCB6bi5kZWVwQXNzaWduKHt9LCB6bi5zZXR0aW5nLmdldEtleSgnenIudXBsb2FkZXInKSwge1xuICAgIHVwbG9hZEFwaTogJy96eG56LmNvcmUuZnMvdXBsb2FkL2ZpbGVzJyxcbiAgICBmZXRjaEFwaTogJy96eG56LmNvcmUuZnMvZmV0Y2gvZmlsZS8nLFxuICAgIGZldGNoc0FwaTogJy96eG56LmNvcmUuZnMvZmV0Y2gvZmlsZXMvJyxcbiAgICBmZXRjaEltYWdlQXBpOiAnL3p4bnouY29yZS5mcy9mZXRjaC9pbWFnZS8nLFxuICAgIGRvd25sb2FkQXBpOiAnL3p4bnouY29yZS5mcy9kb3dubG9hZC9maWxlLydcbn0pKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQWpheFVwbG9hZGVyOiByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpLFxuICAgIEZpbGVVcGxvYWRlcjogcmVxdWlyZSgnLi9GaWxlVXBsb2FkZXInKSxcbiAgICBGaWxlVmlld2VyOiByZXF1aXJlKCcuL0ZpbGVWaWV3ZXInKSxcbiAgICBGaWxlc1ZpZXdlcjogcmVxdWlyZSgnLi9GaWxlc1ZpZXdlcicpLFxuICAgIEltYWdlVXBsb2FkZXI6IHJlcXVpcmUoJy4vSW1hZ2VVcGxvYWRlcicpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdERPTVwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9