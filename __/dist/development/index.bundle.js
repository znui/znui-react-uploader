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

var ReactFA = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");

var ReactSVGIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");

module.exports = znui.react.createClass({
  displayName: 'AjaxUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      action: '',
      changeSubmit: true,
      hiddens: null,
      multiple: true,
      size: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      loading: false
    };
  },
  __onInputChange: function __onInputChange(event) {
    if (this.state.loading) {
      return false;
    }

    var _files = event.nativeEvent.target.files;

    if (_files.length) {
      var _result = this.props.onChange && this.props.onChange(_files, this);

      if (_result !== false && this.props.changeSubmit) {
        var _formData = new FormData(),
            _hiddens = this.props.hiddens || {},
            _hidden = null;

        if (zn.is(_result, 'object')) {
          zn.extend(_hiddens, _result);
        } //console.log(_hiddens);


        for (var key in _hiddens) {
          _hidden = _hiddens[key];

          if (_typeof(_hidden) == 'object') {
            _hidden = JSON.stringify(_hidden);
          }

          _formData.append(key, _hidden);
        }

        for (var i = 0, _len = _files.length; i < _len; i++) {
          _formData.append('upload_file_' + i, _files[i]);
        }

        this.ajaxUpload(_formData);
      }
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
    this.setState({
      loading: true
    });
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", this.__ajaxUploadProgress, false);
    xhr.addEventListener("load", this.__ajaxUploadComplete, false);
    xhr.addEventListener("error", this.__ajaxUploadError, false);
    xhr.addEventListener("abort", this.__ajaxUploadAbort, false);
    xhr.open("POST", zn.http.fixURL(this.props.action), "true");
    xhr.send(data);
  },
  __ajaxUploadProgress: function __ajaxUploadProgress(evt) {
    if (evt.lengthComputable) {
      evt.progress = Math.round(evt.loaded * 100 / evt.total);
    }

    console.log(evt);
    this.props.onUploading && this.props.onUploading(evt, this);
  },
  __ajaxUploadComplete: function __ajaxUploadComplete(evt) {
    this.reset();

    var _data = JSON.parse(evt.target.responseText);

    if (_data.status == 200) {
      this.props.onComplete && this.props.onComplete(_data.result, this);
    } else {
      zn.confirm(_data.result);
      this.props.onError && this.props.onError(_data.result, this);
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
  render: function render() {
    return /*#__PURE__*/React.createElement("form", {
      className: znui.react.classname("zr-ajax-uploader", this.props.className),
      style: this.props.style,
      "data-loading": this.state.loading,
      action: zn.http.fixURL(this.props.action || ''),
      encType: "multipart/form-data",
      method: "POST"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-container"
    }, this.props.children), this.props.size && /*#__PURE__*/React.createElement("span", {
      className: "size"
    }, this.props.size), /*#__PURE__*/React.createElement("input", {
      multiple: this.props.multiple,
      className: "input",
      type: "file",
      name: this.props.name || 'upload_file_' + new Date().getTime(),
      onChange: this.__onInputChange,
      onClick: this.__onInputClick
    }), /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-icon"
    }, /*#__PURE__*/React.createElement(ReactFA.FontAwesomeIcon, {
      icon: ReactSVGIcons.faUpload
    })));
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

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

var ReactFA = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");

var ReactSVGIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");

module.exports = znui.react.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      editable: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: ','
    };
  },
  __onChange: function __onChange(files) {
    var _file = files[0];
    this.props.onChange && this.props.onChange(_file);
  },
  __onComplete: function __onComplete(data, uploader) {
    var _values = (data || []).map(function (file) {
      return file.url;
    });

    this.state.value = this.state.value + _values.join(',') + ',';
    this.forceUpdate();
    this.props.onComplete && this.props.onComplete(data, uploader);
  },
  getValue: function getValue() {
    return this.state.value;
  },
  setValue: function setValue(value) {
    this.setState({
      value: value
    });
  },
  __onPreview: function __onPreview(item) {
    this.props.onPreview && this.props.onPreview(item);
  },
  __renderContent: function __renderContent(item) {
    var _this = this;

    var _temp = this.props.onFileRender && this.props.onFileRender(item);

    if (_temp) {
      return _temp;
    }

    return /*#__PURE__*/React.createElement("a", {
      onClick: function onClick() {
        return _this.__onPreview(item);
      }
    }, this.__renderFileByType(item.split('.').pop().toLowerCase(), item));
  },
  __renderPreviewFileByType: function __renderPreviewFileByType(type, value) {
    if (this.props.isImage) {
      return /*#__PURE__*/React.createElement("img", {
        width: "100%",
        height: "100%",
        src: zn.http.fixURL(value)
      });
    }

    switch (type) {
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'gif':
        return /*#__PURE__*/React.createElement("img", {
          width: "100%",
          height: "100%",
          src: zn.http.fixURL(value)
        });

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
        return /*#__PURE__*/React.createElement("video", {
          width: "100%",
          height: "100%",
          preload: "auto",
          loop: "loop",
          autoplay: "autoplay",
          controls: "controls"
        }, /*#__PURE__*/React.createElement("source", {
          src: zn.http.fixURL(value),
          type: "video/ogg"
        }), /*#__PURE__*/React.createElement("source", {
          src: zn.http.fixURL(value),
          type: "video/mp4"
        }), "Your browser does not support the video tag.");

      default:
        return value.split('/').pop();
    }
  },
  __renderFileByType: function __renderFileByType(type, value) {
    if (this.props.isImage) {
      return /*#__PURE__*/React.createElement("img", {
        src: zn.http.fixURL(value)
      });
    }

    switch (type) {
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'gif':
        return /*#__PURE__*/React.createElement("img", {
          src: zn.http.fixURL(value)
        });

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
        return /*#__PURE__*/React.createElement("video", {
          width: "96",
          height: "96"
        }, /*#__PURE__*/React.createElement("source", {
          src: zn.http.fixURL(value),
          type: "video/ogg"
        }), /*#__PURE__*/React.createElement("source", {
          src: zn.http.fixURL(value),
          type: "video/mp4"
        }), "Your browser does not support the video tag.");

      default:
        return value.split('/').pop();
    }
  },
  __onRemove: function __onRemove(item, index) {
    this.state.value = this.state.value.replace(item, '');
    this.forceUpdate();
  },
  render: function render() {
    var _values = this.state.value.split(',');

    var _editable = this.props.editable && !this.props.disabled && !this.props.readonly;

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-file-uploader", this.props.className),
      style: this.props.style
    }, _editable && /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      style: this.props.uploaderStyle,
      onChange: this.__onChange,
      onComplete: this.__onComplete
    }), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-upload-icon"
    }, /*#__PURE__*/React.createElement(ReactFA.FontAwesomeIcon, {
      icon: ReactSVGIcons.faFileUpload
    })))), /*#__PURE__*/React.createElement("ul", {
      className: "file-list"
    }, _values.map(function (item, index) {
      var _this2 = this;

      if (item) {
        return /*#__PURE__*/React.createElement("li", {
          key: index,
          className: "file"
        }, _editable && /*#__PURE__*/React.createElement("i", {
          className: "fa fa-remove zr-hover-self-loading",
          onClick: function onClick() {
            return _this2.__onRemove(item, index);
          }
        }), this.__renderContent(item));
      }
    }.bind(this))));
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

var ReactFA = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");

var ReactSVGIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      value: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },
  __onChange: function __onChange(files) {
    var _file = files[0];

    if (_file.type.indexOf('image') == -1) {
      alert('文件[' + _file.name + ']不是图片类型');
      return false;
    }
  },
  __onComplete: function __onComplete(data, uploader) {
    var _file = data[0];

    if (_file) {
      var _value = _file.url;

      if (_value.indexOf('/') != 0) {
        _value = "/" + _value;
      }

      this.setValue(_value);
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
  render: function render() {
    var _src = this.state.value;

    if (_src.indexOf('/') == 0) {
      _src = zn.http.fixURL(this.state.value);
    }

    return /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      className: znui.react.classname("zr-image-uploader", this.props.className),
      onChange: this.__onChange,
      onComplete: this.__onComplete,
      multipart: false
    }), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, !!_src ? /*#__PURE__*/React.createElement("img", {
      className: "img",
      src: _src
    }) : /*#__PURE__*/React.createElement("div", {
      className: "image-upload-icon"
    }, /*#__PURE__*/React.createElement(ReactFA.FontAwesomeIcon, {
      icon: ReactSVGIcons.faImage
    }))));
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'AjaxUploader': __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js"),
  'FileUploader': __webpack_require__(/*! ./FileUploader */ "./FileUploader.js"),
  'ImageUploader': __webpack_require__(/*! ./ImageUploader */ "./ImageUploader.js")
};

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!***********************!*\
  !*** external "fssi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["fssi"]; }());

/***/ }),

/***/ "@fortawesome/react-fontawesome":
/*!*********************!*\
  !*** external "rf" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["rf"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQWpheFVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL0ZpbGVVcGxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9JbWFnZVVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzc2lcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwiUmVhY3RET00iLCJSZWFjdEZBIiwiUmVhY3RTVkdJY29ucyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWFjdCIsImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJhY3Rpb24iLCJjaGFuZ2VTdWJtaXQiLCJoaWRkZW5zIiwibXVsdGlwbGUiLCJzaXplIiwiZ2V0SW5pdGlhbFN0YXRlIiwibG9hZGluZyIsIl9fb25JbnB1dENoYW5nZSIsImV2ZW50Iiwic3RhdGUiLCJfZmlsZXMiLCJuYXRpdmVFdmVudCIsInRhcmdldCIsImZpbGVzIiwibGVuZ3RoIiwiX3Jlc3VsdCIsInByb3BzIiwib25DaGFuZ2UiLCJfZm9ybURhdGEiLCJGb3JtRGF0YSIsIl9oaWRkZW5zIiwiX2hpZGRlbiIsInpuIiwiaXMiLCJleHRlbmQiLCJrZXkiLCJKU09OIiwic3RyaW5naWZ5IiwiYXBwZW5kIiwiaSIsIl9sZW4iLCJhamF4VXBsb2FkIiwiX19vbklucHV0Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJvblVwbG9hZGVyQ2xpY2siLCJkYXRhIiwic2V0U3RhdGUiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfX2FqYXhVcGxvYWRQcm9ncmVzcyIsIl9fYWpheFVwbG9hZENvbXBsZXRlIiwiX19hamF4VXBsb2FkRXJyb3IiLCJfX2FqYXhVcGxvYWRBYm9ydCIsIm9wZW4iLCJodHRwIiwiZml4VVJMIiwic2VuZCIsImV2dCIsImxlbmd0aENvbXB1dGFibGUiLCJwcm9ncmVzcyIsIk1hdGgiLCJyb3VuZCIsImxvYWRlZCIsInRvdGFsIiwiY29uc29sZSIsImxvZyIsIm9uVXBsb2FkaW5nIiwicmVzZXQiLCJfZGF0YSIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzIiwib25Db21wbGV0ZSIsInJlc3VsdCIsImNvbmZpcm0iLCJvbkVycm9yIiwibWVzc2FnZSIsIm9uQWJvcnQiLCJmaW5kRE9NTm9kZSIsInJlbmRlciIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwiY2hpbGRyZW4iLCJuYW1lIiwiRGF0ZSIsImdldFRpbWUiLCJmYVVwbG9hZCIsIkFqYXhVcGxvYWRlciIsImVkaXRhYmxlIiwidmFsdWUiLCJfX29uQ2hhbmdlIiwiX2ZpbGUiLCJfX29uQ29tcGxldGUiLCJ1cGxvYWRlciIsIl92YWx1ZXMiLCJtYXAiLCJmaWxlIiwidXJsIiwiam9pbiIsImZvcmNlVXBkYXRlIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsIl9fb25QcmV2aWV3IiwiaXRlbSIsIm9uUHJldmlldyIsIl9fcmVuZGVyQ29udGVudCIsIl90ZW1wIiwib25GaWxlUmVuZGVyIiwiX19yZW5kZXJGaWxlQnlUeXBlIiwic3BsaXQiLCJwb3AiLCJ0b0xvd2VyQ2FzZSIsIl9fcmVuZGVyUHJldmlld0ZpbGVCeVR5cGUiLCJ0eXBlIiwiaXNJbWFnZSIsIl9fb25SZW1vdmUiLCJpbmRleCIsInJlcGxhY2UiLCJfZWRpdGFibGUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwidXBsb2FkZXJTdHlsZSIsImZhRmlsZVVwbG9hZCIsImJpbmQiLCJpbmRleE9mIiwiYWxlcnQiLCJfdmFsdWUiLCJfc3JjIiwiZmFJbWFnZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSUEsS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBY0UsbUJBQU8sQ0FBQyxvQkFBRCxDQUFqQzs7QUFDQSxJQUFJQyxRQUFRLEdBQUdGLElBQUksQ0FBQ0UsUUFBTCxJQUFpQkQsbUJBQU8sQ0FBQyw0QkFBRCxDQUF2Qzs7QUFDQSxJQUFJRSxPQUFPLEdBQUdGLG1CQUFPLENBQUMsc0VBQUQsQ0FBckI7O0FBQ0EsSUFBSUcsYUFBYSxHQUFHSCxtQkFBTyxDQUFDLDRFQUFELENBQTNCOztBQUVBSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJOLElBQUksQ0FBQ08sS0FBTCxDQUFXQyxXQUFYLENBQXVCO0FBQ3ZDQyxhQUFXLEVBQUMsY0FEMkI7QUFFdkNDLGlCQUFlLEVBQUUsMkJBQVk7QUFDNUIsV0FBTztBQUNOQyxZQUFNLEVBQUUsRUFERjtBQUVOQyxrQkFBWSxFQUFFLElBRlI7QUFHTkMsYUFBTyxFQUFFLElBSEg7QUFJTkMsY0FBUSxFQUFFLElBSko7QUFLTkMsVUFBSSxFQUFFO0FBTEEsS0FBUDtBQU9BLEdBVnNDO0FBV3ZDQyxpQkFBZSxFQUFFLDJCQUFXO0FBQzNCLFdBQU87QUFDTkMsYUFBTyxFQUFFO0FBREgsS0FBUDtBQUdBLEdBZnNDO0FBZ0J2Q0MsaUJBQWUsRUFBRSx5QkFBVUMsS0FBVixFQUFnQjtBQUNoQyxRQUFHLEtBQUtDLEtBQUwsQ0FBV0gsT0FBZCxFQUFzQjtBQUNyQixhQUFPLEtBQVA7QUFDQTs7QUFDRCxRQUFJSSxNQUFNLEdBQUdGLEtBQUssQ0FBQ0csV0FBTixDQUFrQkMsTUFBbEIsQ0FBeUJDLEtBQXRDOztBQUNBLFFBQUdILE1BQU0sQ0FBQ0ksTUFBVixFQUFpQjtBQUNoQixVQUFJQyxPQUFPLEdBQUcsS0FBS0MsS0FBTCxDQUFXQyxRQUFYLElBQXVCLEtBQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQlAsTUFBcEIsRUFBNEIsSUFBNUIsQ0FBckM7O0FBQ0EsVUFBR0ssT0FBTyxLQUFHLEtBQVYsSUFBbUIsS0FBS0MsS0FBTCxDQUFXZixZQUFqQyxFQUE4QztBQUM3QyxZQUFJaUIsU0FBUyxHQUFHLElBQUlDLFFBQUosRUFBaEI7QUFBQSxZQUNDQyxRQUFRLEdBQUcsS0FBS0osS0FBTCxDQUFXZCxPQUFYLElBQW9CLEVBRGhDO0FBQUEsWUFFQ21CLE9BQU8sR0FBRyxJQUZYOztBQUlBLFlBQUdDLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNUixPQUFOLEVBQWUsUUFBZixDQUFILEVBQTRCO0FBQzNCTyxZQUFFLENBQUNFLE1BQUgsQ0FBVUosUUFBVixFQUFvQkwsT0FBcEI7QUFDQSxTQVA0QyxDQVE3Qzs7O0FBQ0EsYUFBSSxJQUFJVSxHQUFSLElBQWVMLFFBQWYsRUFBd0I7QUFDdkJDLGlCQUFPLEdBQUdELFFBQVEsQ0FBQ0ssR0FBRCxDQUFsQjs7QUFDQSxjQUFHLFFBQU9KLE9BQVAsS0FBa0IsUUFBckIsRUFBOEI7QUFDN0JBLG1CQUFPLEdBQUdLLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixPQUFmLENBQVY7QUFDQTs7QUFFREgsbUJBQVMsQ0FBQ1UsTUFBVixDQUFpQkgsR0FBakIsRUFBc0JKLE9BQXRCO0FBQ0E7O0FBQ0QsYUFBSSxJQUFJUSxDQUFDLEdBQUMsQ0FBTixFQUFTQyxJQUFJLEdBQUdwQixNQUFNLENBQUNJLE1BQTNCLEVBQW1DZSxDQUFDLEdBQUNDLElBQXJDLEVBQTJDRCxDQUFDLEVBQTVDLEVBQStDO0FBQzlDWCxtQkFBUyxDQUFDVSxNQUFWLENBQWlCLGlCQUFpQkMsQ0FBbEMsRUFBcUNuQixNQUFNLENBQUNtQixDQUFELENBQTNDO0FBQ0E7O0FBQ0QsYUFBS0UsVUFBTCxDQUFnQmIsU0FBaEI7QUFDQTtBQUNEO0FBQ0QsR0E5Q3NDO0FBK0N2Q2MsZ0JBQWMsRUFBRSx3QkFBVXhCLEtBQVYsRUFBZ0I7QUFDL0IsUUFBRyxLQUFLQyxLQUFMLENBQVdILE9BQWQsRUFBc0I7QUFDckIsYUFBTyxLQUFQO0FBQ0E7O0FBQ0RFLFNBQUssQ0FBQ3lCLGVBQU47QUFDQSxTQUFLakIsS0FBTCxDQUFXa0IsZUFBWCxJQUE4QixLQUFLbEIsS0FBTCxDQUFXa0IsZUFBWCxDQUEyQjFCLEtBQTNCLEVBQWtDLElBQWxDLENBQTlCO0FBQ0EsR0FyRHNDO0FBc0R2Q3VCLFlBQVUsRUFBRSxvQkFBVUksSUFBVixFQUFlO0FBQzFCLFNBQUtDLFFBQUwsQ0FBYztBQUFFOUIsYUFBTyxFQUFFO0FBQVgsS0FBZDtBQUNBLFFBQUkrQixHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWO0FBQ01ELE9BQUcsQ0FBQ0UsTUFBSixDQUFXQyxnQkFBWCxDQUE0QixVQUE1QixFQUF3QyxLQUFLQyxvQkFBN0MsRUFBbUUsS0FBbkU7QUFDTkosT0FBRyxDQUFDRyxnQkFBSixDQUFxQixNQUFyQixFQUE2QixLQUFLRSxvQkFBbEMsRUFBd0QsS0FBeEQ7QUFDQUwsT0FBRyxDQUFDRyxnQkFBSixDQUFxQixPQUFyQixFQUE4QixLQUFLRyxpQkFBbkMsRUFBc0QsS0FBdEQ7QUFDQU4sT0FBRyxDQUFDRyxnQkFBSixDQUFxQixPQUFyQixFQUE4QixLQUFLSSxpQkFBbkMsRUFBc0QsS0FBdEQ7QUFDQVAsT0FBRyxDQUFDUSxJQUFKLENBQVMsTUFBVCxFQUFpQnZCLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlLEtBQUsvQixLQUFMLENBQVdoQixNQUExQixDQUFqQixFQUFvRCxNQUFwRDtBQUNBcUMsT0FBRyxDQUFDVyxJQUFKLENBQVNiLElBQVQ7QUFDQSxHQS9Ec0M7QUFnRXZDTSxzQkFBb0IsRUFBRSw4QkFBVVEsR0FBVixFQUFjO0FBQ25DLFFBQUlBLEdBQUcsQ0FBQ0MsZ0JBQVIsRUFBMEI7QUFDekJELFNBQUcsQ0FBQ0UsUUFBSixHQUFlQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osR0FBRyxDQUFDSyxNQUFKLEdBQWEsR0FBYixHQUFtQkwsR0FBRyxDQUFDTSxLQUFsQyxDQUFmO0FBQ0E7O0FBQ0RDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZUixHQUFaO0FBQ0EsU0FBS2pDLEtBQUwsQ0FBVzBDLFdBQVgsSUFBMEIsS0FBSzFDLEtBQUwsQ0FBVzBDLFdBQVgsQ0FBdUJULEdBQXZCLEVBQTRCLElBQTVCLENBQTFCO0FBQ0EsR0F0RXNDO0FBdUV2Q1Asc0JBQW9CLEVBQUUsOEJBQVVPLEdBQVYsRUFBYztBQUNuQyxTQUFLVSxLQUFMOztBQUNBLFFBQUlDLEtBQUssR0FBR2xDLElBQUksQ0FBQ21DLEtBQUwsQ0FBV1osR0FBRyxDQUFDckMsTUFBSixDQUFXa0QsWUFBdEIsQ0FBWjs7QUFDQSxRQUFHRixLQUFLLENBQUNHLE1BQU4sSUFBYyxHQUFqQixFQUFxQjtBQUNwQixXQUFLL0MsS0FBTCxDQUFXZ0QsVUFBWCxJQUF5QixLQUFLaEQsS0FBTCxDQUFXZ0QsVUFBWCxDQUFzQkosS0FBSyxDQUFDSyxNQUE1QixFQUFvQyxJQUFwQyxDQUF6QjtBQUNBLEtBRkQsTUFFTTtBQUNMM0MsUUFBRSxDQUFDNEMsT0FBSCxDQUFXTixLQUFLLENBQUNLLE1BQWpCO0FBQ0EsV0FBS2pELEtBQUwsQ0FBV21ELE9BQVgsSUFBc0IsS0FBS25ELEtBQUwsQ0FBV21ELE9BQVgsQ0FBbUJQLEtBQUssQ0FBQ0ssTUFBekIsRUFBaUMsSUFBakMsQ0FBdEI7QUFDQTtBQUNELEdBaEZzQztBQWlGdkN0QixtQkFBaUIsRUFBRSwyQkFBVW5DLEtBQVYsRUFBZ0I7QUFDbEMsU0FBS21ELEtBQUw7QUFDQSxTQUFLM0MsS0FBTCxDQUFXbUQsT0FBWCxJQUFzQixLQUFLbkQsS0FBTCxDQUFXbUQsT0FBWCxDQUFtQjNELEtBQUssQ0FBQzRELE9BQXpCLEVBQWtDLElBQWxDLENBQXRCO0FBQ0EsR0FwRnNDO0FBcUZ2Q3hCLG1CQUFpQixFQUFFLDJCQUFVcEMsS0FBVixFQUFnQjtBQUNsQyxTQUFLbUQsS0FBTDtBQUNBLFNBQUszQyxLQUFMLENBQVdxRCxPQUFYLElBQXNCLEtBQUtyRCxLQUFMLENBQVdxRCxPQUFYLENBQW1CN0QsS0FBbkIsRUFBMEIsSUFBMUIsQ0FBdEI7QUFDQSxHQXhGc0M7QUF5RnZDbUQsT0FBSyxFQUFFLGlCQUFXO0FBQ2pCLFNBQUt2QixRQUFMLENBQWM7QUFBRTlCLGFBQU8sRUFBRTtBQUFYLEtBQWQ7QUFDQWYsWUFBUSxDQUFDK0UsV0FBVCxDQUFxQixJQUFyQixFQUEyQlgsS0FBM0I7QUFDQSxHQTVGc0M7QUE2RnZDWSxRQUFNLEVBQUUsa0JBQVU7QUFDakIsd0JBQ0M7QUFBTSxlQUFTLEVBQUVsRixJQUFJLENBQUNPLEtBQUwsQ0FBVzRFLFNBQVgsQ0FBcUIsa0JBQXJCLEVBQXlDLEtBQUt4RCxLQUFMLENBQVd5RCxTQUFwRCxDQUFqQjtBQUNDLFdBQUssRUFBRSxLQUFLekQsS0FBTCxDQUFXMEQsS0FEbkI7QUFFQyxzQkFBYyxLQUFLakUsS0FBTCxDQUFXSCxPQUYxQjtBQUdDLFlBQU0sRUFBRWdCLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlLEtBQUsvQixLQUFMLENBQVdoQixNQUFYLElBQW1CLEVBQWxDLENBSFQ7QUFJQyxhQUFPLEVBQUMscUJBSlQ7QUFLQyxZQUFNLEVBQUM7QUFMUixvQkFNQztBQUFLLGVBQVMsRUFBQztBQUFmLE9BQXdDLEtBQUtnQixLQUFMLENBQVcyRCxRQUFuRCxDQU5ELEVBT0UsS0FBSzNELEtBQUwsQ0FBV1osSUFBWCxpQkFBbUI7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBd0IsS0FBS1ksS0FBTCxDQUFXWixJQUFuQyxDQVByQixlQVFDO0FBQU8sY0FBUSxFQUFFLEtBQUtZLEtBQUwsQ0FBV2IsUUFBNUI7QUFBc0MsZUFBUyxFQUFDLE9BQWhEO0FBQXdELFVBQUksRUFBQyxNQUE3RDtBQUFvRSxVQUFJLEVBQUUsS0FBS2EsS0FBTCxDQUFXNEQsSUFBWCxJQUFrQixpQkFBa0IsSUFBSUMsSUFBSixFQUFELENBQWFDLE9BQWIsRUFBN0c7QUFBc0ksY0FBUSxFQUFFLEtBQUt2RSxlQUFySjtBQUFzSyxhQUFPLEVBQUUsS0FBS3lCO0FBQXBMLE1BUkQsZUFTQztBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUFrQyxvQkFBQyxPQUFELENBQVMsZUFBVDtBQUF5QixVQUFJLEVBQUV2QyxhQUFhLENBQUNzRjtBQUE3QyxNQUFsQyxDQVRELENBREQ7QUFhQTtBQTNHc0MsQ0FBdkIsQ0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ0xBLElBQUkzRixLQUFLLEdBQUdDLElBQUksQ0FBQ0QsS0FBTCxJQUFjRSxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUNBLElBQUkwRixZQUFZLEdBQUcxRixtQkFBTyxDQUFDLHlDQUFELENBQTFCOztBQUNBLElBQUlFLE9BQU8sR0FBR0YsbUJBQU8sQ0FBQyxzRUFBRCxDQUFyQjs7QUFDQSxJQUFJRyxhQUFhLEdBQUdILG1CQUFPLENBQUMsNEVBQUQsQ0FBM0I7O0FBRUFJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQk4sSUFBSSxDQUFDTyxLQUFMLENBQVdDLFdBQVgsQ0FBdUI7QUFDdkNFLGlCQUFlLEVBQUUsMkJBQVc7QUFDM0IsV0FBTztBQUNOa0YsY0FBUSxFQUFFO0FBREosS0FBUDtBQUdBLEdBTHNDO0FBTXZDNUUsaUJBQWUsRUFBRSwyQkFBWTtBQUN6QixXQUFPO0FBQ1Q2RSxXQUFLLEVBQUU7QUFERSxLQUFQO0FBR0QsR0FWb0M7QUFXdkNDLFlBQVUsRUFBRSxvQkFBVXRFLEtBQVYsRUFBZ0I7QUFDM0IsUUFBSXVFLEtBQUssR0FBR3ZFLEtBQUssQ0FBQyxDQUFELENBQWpCO0FBQ0EsU0FBS0csS0FBTCxDQUFXQyxRQUFYLElBQXVCLEtBQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQm1FLEtBQXBCLENBQXZCO0FBQ0EsR0Fkc0M7QUFldkNDLGNBQVksRUFBRSxzQkFBVWxELElBQVYsRUFBZ0JtRCxRQUFoQixFQUF5QjtBQUN0QyxRQUFJQyxPQUFPLEdBQUcsQ0FBQ3BELElBQUksSUFBRSxFQUFQLEVBQVdxRCxHQUFYLENBQWUsVUFBVUMsSUFBVixFQUFlO0FBQzNDLGFBQU9BLElBQUksQ0FBQ0MsR0FBWjtBQUNBLEtBRmEsQ0FBZDs7QUFHQSxTQUFLakYsS0FBTCxDQUFXeUUsS0FBWCxHQUFtQixLQUFLekUsS0FBTCxDQUFXeUUsS0FBWCxHQUFtQkssT0FBTyxDQUFDSSxJQUFSLENBQWEsR0FBYixDQUFuQixHQUF1QyxHQUExRDtBQUNBLFNBQUtDLFdBQUw7QUFDQSxTQUFLNUUsS0FBTCxDQUFXZ0QsVUFBWCxJQUF5QixLQUFLaEQsS0FBTCxDQUFXZ0QsVUFBWCxDQUFzQjdCLElBQXRCLEVBQTRCbUQsUUFBNUIsQ0FBekI7QUFDQSxHQXRCc0M7QUF1QnZDTyxVQUFRLEVBQUUsb0JBQVc7QUFDcEIsV0FBTyxLQUFLcEYsS0FBTCxDQUFXeUUsS0FBbEI7QUFDQSxHQXpCc0M7QUEwQnZDWSxVQUFRLEVBQUUsa0JBQVVaLEtBQVYsRUFBZ0I7QUFDekIsU0FBSzlDLFFBQUwsQ0FBYztBQUFFOEMsV0FBSyxFQUFFQTtBQUFULEtBQWQ7QUFDQSxHQTVCc0M7QUE2QnZDYSxhQUFXLEVBQUUscUJBQVVDLElBQVYsRUFBZTtBQUMzQixTQUFLaEYsS0FBTCxDQUFXaUYsU0FBWCxJQUF3QixLQUFLakYsS0FBTCxDQUFXaUYsU0FBWCxDQUFxQkQsSUFBckIsQ0FBeEI7QUFDQSxHQS9Cc0M7QUFnQ3ZDRSxpQkFBZSxFQUFFLHlCQUFVRixJQUFWLEVBQWU7QUFBQTs7QUFDL0IsUUFBSUcsS0FBSyxHQUFHLEtBQUtuRixLQUFMLENBQVdvRixZQUFYLElBQTJCLEtBQUtwRixLQUFMLENBQVdvRixZQUFYLENBQXdCSixJQUF4QixDQUF2Qzs7QUFDQSxRQUFHRyxLQUFILEVBQVM7QUFDUixhQUFPQSxLQUFQO0FBQ0E7O0FBRUQsd0JBQU87QUFBRyxhQUFPLEVBQUU7QUFBQSxlQUFJLEtBQUksQ0FBQ0osV0FBTCxDQUFpQkMsSUFBakIsQ0FBSjtBQUFBO0FBQVosT0FBeUMsS0FBS0ssa0JBQUwsQ0FBd0JMLElBQUksQ0FBQ00sS0FBTCxDQUFXLEdBQVgsRUFBZ0JDLEdBQWhCLEdBQXNCQyxXQUF0QixFQUF4QixFQUE2RFIsSUFBN0QsQ0FBekMsQ0FBUDtBQUNBLEdBdkNzQztBQXdDdkNTLDJCQUF5QixFQUFFLG1DQUFVQyxJQUFWLEVBQWdCeEIsS0FBaEIsRUFBc0I7QUFDaEQsUUFBRyxLQUFLbEUsS0FBTCxDQUFXMkYsT0FBZCxFQUFzQjtBQUNyQiwwQkFBTztBQUFLLGFBQUssRUFBQyxNQUFYO0FBQWtCLGNBQU0sRUFBQyxNQUF6QjtBQUFnQyxXQUFHLEVBQUVyRixFQUFFLENBQUN3QixJQUFILENBQVFDLE1BQVIsQ0FBZW1DLEtBQWY7QUFBckMsUUFBUDtBQUNBOztBQUNELFlBQVF3QixJQUFSO0FBQ0MsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0MsNEJBQU87QUFBSyxlQUFLLEVBQUMsTUFBWDtBQUFrQixnQkFBTSxFQUFDLE1BQXpCO0FBQWdDLGFBQUcsRUFBRXBGLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlbUMsS0FBZjtBQUFyQyxVQUFQOztBQUNELFdBQUssS0FBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssTUFBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssTUFBTDtBQUNBLFdBQUssSUFBTDtBQUNBLFdBQUssS0FBTDtBQUNDLDRCQUFPO0FBQU8sZUFBSyxFQUFDLE1BQWI7QUFBb0IsZ0JBQU0sRUFBQyxNQUEzQjtBQUFrQyxpQkFBTyxFQUFDLE1BQTFDO0FBQWlELGNBQUksRUFBQyxNQUF0RDtBQUE2RCxrQkFBUSxFQUFDLFVBQXRFO0FBQWlGLGtCQUFRLEVBQUM7QUFBMUYsd0JBQ0o7QUFBUSxhQUFHLEVBQUU1RCxFQUFFLENBQUN3QixJQUFILENBQVFDLE1BQVIsQ0FBZW1DLEtBQWYsQ0FBYjtBQUFvQyxjQUFJLEVBQUM7QUFBekMsVUFESSxlQUVKO0FBQVEsYUFBRyxFQUFFNUQsRUFBRSxDQUFDd0IsSUFBSCxDQUFRQyxNQUFSLENBQWVtQyxLQUFmLENBQWI7QUFBb0MsY0FBSSxFQUFDO0FBQXpDLFVBRkksaURBQVA7O0FBS0Q7QUFDQyxlQUFPQSxLQUFLLENBQUNvQixLQUFOLENBQVksR0FBWixFQUFpQkMsR0FBakIsRUFBUDtBQXRCRjtBQXdCQSxHQXBFc0M7QUFxRXZDRixvQkFBa0IsRUFBRSw0QkFBVUssSUFBVixFQUFnQnhCLEtBQWhCLEVBQXNCO0FBQ3pDLFFBQUcsS0FBS2xFLEtBQUwsQ0FBVzJGLE9BQWQsRUFBc0I7QUFDckIsMEJBQU87QUFBSyxXQUFHLEVBQUVyRixFQUFFLENBQUN3QixJQUFILENBQVFDLE1BQVIsQ0FBZW1DLEtBQWY7QUFBVixRQUFQO0FBQ0E7O0FBQ0QsWUFBUXdCLElBQVI7QUFDQyxXQUFLLEtBQUw7QUFDQSxXQUFLLEtBQUw7QUFDQSxXQUFLLE1BQUw7QUFDQSxXQUFLLEtBQUw7QUFDQyw0QkFBTztBQUFLLGFBQUcsRUFBRXBGLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlbUMsS0FBZjtBQUFWLFVBQVA7O0FBQ0QsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0MsNEJBQU87QUFBTyxlQUFLLEVBQUMsSUFBYjtBQUFrQixnQkFBTSxFQUFDO0FBQXpCLHdCQUNKO0FBQVEsYUFBRyxFQUFFNUQsRUFBRSxDQUFDd0IsSUFBSCxDQUFRQyxNQUFSLENBQWVtQyxLQUFmLENBQWI7QUFBb0MsY0FBSSxFQUFDO0FBQXpDLFVBREksZUFFSjtBQUFRLGFBQUcsRUFBRTVELEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlbUMsS0FBZixDQUFiO0FBQW9DLGNBQUksRUFBQztBQUF6QyxVQUZJLGlEQUFQOztBQUtEO0FBQ0MsZUFBT0EsS0FBSyxDQUFDb0IsS0FBTixDQUFZLEdBQVosRUFBaUJDLEdBQWpCLEVBQVA7QUF0QkY7QUF3QkEsR0FqR3NDO0FBa0d2Q0ssWUFBVSxFQUFFLG9CQUFVWixJQUFWLEVBQWdCYSxLQUFoQixFQUFzQjtBQUNqQyxTQUFLcEcsS0FBTCxDQUFXeUUsS0FBWCxHQUFtQixLQUFLekUsS0FBTCxDQUFXeUUsS0FBWCxDQUFpQjRCLE9BQWpCLENBQXlCZCxJQUF6QixFQUErQixFQUEvQixDQUFuQjtBQUNBLFNBQUtKLFdBQUw7QUFDQSxHQXJHc0M7QUFzR3ZDckIsUUFBTSxFQUFFLGtCQUFVO0FBQ2pCLFFBQUlnQixPQUFPLEdBQUcsS0FBSzlFLEtBQUwsQ0FBV3lFLEtBQVgsQ0FBaUJvQixLQUFqQixDQUF1QixHQUF2QixDQUFkOztBQUNBLFFBQUlTLFNBQVMsR0FBSSxLQUFLL0YsS0FBTCxDQUFXaUUsUUFBWCxJQUF1QixDQUFDLEtBQUtqRSxLQUFMLENBQVdnRyxRQUFuQyxJQUErQyxDQUFDLEtBQUtoRyxLQUFMLENBQVdpRyxRQUE1RTs7QUFDQSx3QkFDQztBQUFLLGVBQVMsRUFBRTVILElBQUksQ0FBQ08sS0FBTCxDQUFXNEUsU0FBWCxDQUFxQixrQkFBckIsRUFBeUMsS0FBS3hELEtBQUwsQ0FBV3lELFNBQXBELENBQWhCO0FBQWdGLFdBQUssRUFBRSxLQUFLekQsS0FBTCxDQUFXMEQ7QUFBbEcsT0FDRXFDLFNBQVMsaUJBQUksb0JBQUMsWUFBRCxlQUNULEtBQUsvRixLQURJO0FBRWIsV0FBSyxFQUFFLEtBQUtBLEtBQUwsQ0FBV2tHLGFBRkw7QUFHYixjQUFRLEVBQUUsS0FBSy9CLFVBSEY7QUFJYixnQkFBVSxFQUFFLEtBQUtFO0FBSkoscUJBS2I7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDQztBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUFrQyxvQkFBQyxPQUFELENBQVMsZUFBVDtBQUF5QixVQUFJLEVBQUU1RixhQUFhLENBQUMwSDtBQUE3QyxNQUFsQyxDQURELENBTGEsQ0FEZixlQVVDO0FBQUksZUFBUyxFQUFDO0FBQWQsT0FFRTVCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVVRLElBQVYsRUFBZ0JhLEtBQWhCLEVBQXNCO0FBQUE7O0FBQ2pDLFVBQUdiLElBQUgsRUFBUTtBQUNQLDRCQUFPO0FBQUksYUFBRyxFQUFFYSxLQUFUO0FBQWdCLG1CQUFTLEVBQUM7QUFBMUIsV0FDSkUsU0FBUyxpQkFBSTtBQUFHLG1CQUFTLEVBQUMsb0NBQWI7QUFBa0QsaUJBQU8sRUFBRTtBQUFBLG1CQUFJLE1BQUksQ0FBQ0gsVUFBTCxDQUFnQlosSUFBaEIsRUFBc0JhLEtBQXRCLENBQUo7QUFBQTtBQUEzRCxVQURULEVBRUwsS0FBS1gsZUFBTCxDQUFxQkYsSUFBckIsQ0FGSyxDQUFQO0FBSUE7QUFDRCxLQVBXLENBT1ZvQixJQVBVLENBT0wsSUFQSyxDQUFaLENBRkYsQ0FWRCxDQUREO0FBeUJBO0FBbElzQyxDQUF2QixDQUFqQixDOzs7Ozs7Ozs7Ozs7O0FDTEEsSUFBSWhJLEtBQUssR0FBR0MsSUFBSSxDQUFDRCxLQUFMLElBQWNFLG1CQUFPLENBQUMsb0JBQUQsQ0FBakM7O0FBQ0EsSUFBSTBGLFlBQVksR0FBRzFGLG1CQUFPLENBQUMseUNBQUQsQ0FBMUI7O0FBQ0EsSUFBSUUsT0FBTyxHQUFHRixtQkFBTyxDQUFDLHNFQUFELENBQXJCOztBQUNBLElBQUlHLGFBQWEsR0FBR0gsbUJBQU8sQ0FBQyw0RUFBRCxDQUEzQjs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCUCxLQUFLLENBQUNTLFdBQU4sQ0FBa0I7QUFBQTtBQUNsQ0UsaUJBQWUsRUFBRSwyQkFBWTtBQUM1QixXQUFPO0FBQ05tRixXQUFLLEVBQUU7QUFERCxLQUFQO0FBR0EsR0FMaUM7QUFNbEM3RSxpQkFBZSxFQUFFLDJCQUFXO0FBQ3hCLFdBQU87QUFDVDZFLFdBQUssRUFBRSxLQUFLbEUsS0FBTCxDQUFXa0U7QUFEVCxLQUFQO0FBR0QsR0FWK0I7QUFXbENDLFlBQVUsRUFBRSxvQkFBVXRFLEtBQVYsRUFBZ0I7QUFDM0IsUUFBSXVFLEtBQUssR0FBR3ZFLEtBQUssQ0FBQyxDQUFELENBQWpCOztBQUNBLFFBQUd1RSxLQUFLLENBQUNzQixJQUFOLENBQVdXLE9BQVgsQ0FBbUIsT0FBbkIsS0FBNkIsQ0FBQyxDQUFqQyxFQUFtQztBQUNsQ0MsV0FBSyxDQUFDLFFBQVFsQyxLQUFLLENBQUNSLElBQWQsR0FBcUIsU0FBdEIsQ0FBTDtBQUNBLGFBQU8sS0FBUDtBQUNBO0FBQ0QsR0FqQmlDO0FBa0JsQ1MsY0FBWSxFQUFFLHNCQUFVbEQsSUFBVixFQUFnQm1ELFFBQWhCLEVBQXlCO0FBQ3RDLFFBQUlGLEtBQUssR0FBR2pELElBQUksQ0FBQyxDQUFELENBQWhCOztBQUNBLFFBQUdpRCxLQUFILEVBQVM7QUFDUixVQUFJbUMsTUFBTSxHQUFHbkMsS0FBSyxDQUFDTSxHQUFuQjs7QUFDQSxVQUFHNkIsTUFBTSxDQUFDRixPQUFQLENBQWUsR0FBZixLQUFxQixDQUF4QixFQUEwQjtBQUN6QkUsY0FBTSxHQUFHLE1BQU1BLE1BQWY7QUFDQTs7QUFDRCxXQUFLekIsUUFBTCxDQUFjeUIsTUFBZDtBQUNBOztBQUNELFNBQUt2RyxLQUFMLENBQVdnRCxVQUFYLElBQXlCLEtBQUtoRCxLQUFMLENBQVdnRCxVQUFYLENBQXNCb0IsS0FBdEIsRUFBNkIsSUFBN0IsQ0FBekI7QUFDQSxHQTVCaUM7QUE2QmxDUyxVQUFRLEVBQUUsb0JBQVc7QUFDcEIsV0FBTyxLQUFLcEYsS0FBTCxDQUFXeUUsS0FBbEI7QUFDQSxHQS9CaUM7QUFnQ2xDWSxVQUFRLEVBQUUsa0JBQVVaLEtBQVYsRUFBZ0I7QUFDekIsU0FBSzlDLFFBQUwsQ0FBYztBQUFFOEMsV0FBSyxFQUFFQTtBQUFULEtBQWQsRUFBZ0MsWUFBVztBQUMxQyxXQUFLbEUsS0FBTCxDQUFXQyxRQUFYLElBQXVCLEtBQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQmlFLEtBQXBCLEVBQTJCLElBQTNCLENBQXZCO0FBQ0EsS0FGK0IsQ0FFOUJrQyxJQUY4QixDQUV6QixJQUZ5QixDQUFoQztBQUdBLEdBcENpQztBQXFDbEM3QyxRQUFNLEVBQUMsa0JBQVU7QUFDaEIsUUFBSWlELElBQUksR0FBRyxLQUFLL0csS0FBTCxDQUFXeUUsS0FBdEI7O0FBQ0EsUUFBR3NDLElBQUksQ0FBQ0gsT0FBTCxDQUFhLEdBQWIsS0FBbUIsQ0FBdEIsRUFBd0I7QUFDdkJHLFVBQUksR0FBR2xHLEVBQUUsQ0FBQ3dCLElBQUgsQ0FBUUMsTUFBUixDQUFlLEtBQUt0QyxLQUFMLENBQVd5RSxLQUExQixDQUFQO0FBQ0E7O0FBQ0Qsd0JBQ0Msb0JBQUMsWUFBRCxlQUNLLEtBQUtsRSxLQURWO0FBRUMsZUFBUyxFQUFFM0IsSUFBSSxDQUFDTyxLQUFMLENBQVc0RSxTQUFYLENBQXFCLG1CQUFyQixFQUEwQyxLQUFLeEQsS0FBTCxDQUFXeUQsU0FBckQsQ0FGWjtBQUdDLGNBQVEsRUFBRSxLQUFLVSxVQUhoQjtBQUlDLGdCQUFVLEVBQUUsS0FBS0UsWUFKbEI7QUFLQyxlQUFTLEVBQUU7QUFMWixxQkFNQztBQUFLLGVBQVMsRUFBQztBQUFmLE9BRUUsQ0FBQyxDQUFDbUMsSUFBRixnQkFBUztBQUFLLGVBQVMsRUFBQyxLQUFmO0FBQXFCLFNBQUcsRUFBRUE7QUFBMUIsTUFBVCxnQkFBNkM7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFBbUMsb0JBQUMsT0FBRCxDQUFTLGVBQVQ7QUFBeUIsVUFBSSxFQUFFL0gsYUFBYSxDQUFDZ0k7QUFBN0MsTUFBbkMsQ0FGL0MsQ0FORCxDQUREO0FBY0E7QUF4RGlDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDTEEvSCxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYixrQkFBZ0JMLG1CQUFPLENBQUMseUNBQUQsQ0FEVjtBQUViLGtCQUFnQkEsbUJBQU8sQ0FBQyx5Q0FBRCxDQUZWO0FBR2IsbUJBQWlCQSxtQkFBTyxDQUFDLDJDQUFEO0FBSFgsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQSxhQUFhLCtCQUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsNkJBQTZCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUMsYUFBYSxnQ0FBZ0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0EvQyxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSB6bnVpLlJlYWN0RE9NIHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJlYWN0RkEgPSByZXF1aXJlKCdAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWUnKTtcbnZhciBSZWFjdFNWR0ljb25zID0gcmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidBamF4VXBsb2FkZXInLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YWN0aW9uOiAnJyxcblx0XHRcdGNoYW5nZVN1Ym1pdDogdHJ1ZSxcblx0XHRcdGhpZGRlbnM6IG51bGwsXG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblx0XHRcdHNpemU6ICcnXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bG9hZGluZzogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRfX29uSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0aWYodGhpcy5zdGF0ZS5sb2FkaW5nKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dmFyIF9maWxlcyA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5maWxlcztcblx0XHRpZihfZmlsZXMubGVuZ3RoKXtcblx0XHRcdHZhciBfcmVzdWx0ID0gdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKF9maWxlcywgdGhpcyk7XG5cdFx0XHRpZihfcmVzdWx0IT09ZmFsc2UgJiYgdGhpcy5wcm9wcy5jaGFuZ2VTdWJtaXQpe1xuXHRcdFx0XHR2YXIgX2Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCksXG5cdFx0XHRcdFx0X2hpZGRlbnMgPSB0aGlzLnByb3BzLmhpZGRlbnN8fHt9LFxuXHRcdFx0XHRcdF9oaWRkZW4gPSBudWxsO1xuXG5cdFx0XHRcdGlmKHpuLmlzKF9yZXN1bHQsICdvYmplY3QnKSl7XG5cdFx0XHRcdFx0em4uZXh0ZW5kKF9oaWRkZW5zLCBfcmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKF9oaWRkZW5zKTtcblx0XHRcdFx0Zm9yKHZhciBrZXkgaW4gX2hpZGRlbnMpe1xuXHRcdFx0XHRcdF9oaWRkZW4gPSBfaGlkZGVuc1trZXldO1xuXHRcdFx0XHRcdGlmKHR5cGVvZiBfaGlkZGVuID09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRcdF9oaWRkZW4gPSBKU09OLnN0cmluZ2lmeShfaGlkZGVuKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfZm9ybURhdGEuYXBwZW5kKGtleSwgX2hpZGRlbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yKHZhciBpPTAsIF9sZW4gPSBfZmlsZXMubGVuZ3RoOyBpPF9sZW47IGkrKyl7XG5cdFx0XHRcdFx0X2Zvcm1EYXRhLmFwcGVuZCgndXBsb2FkX2ZpbGVfJyArIGksIF9maWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hamF4VXBsb2FkKF9mb3JtRGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRfX29uSW5wdXRDbGljazogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRpZih0aGlzLnN0YXRlLmxvYWRpbmcpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayAmJiB0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayhldmVudCwgdGhpcyk7XG5cdH0sXG5cdGFqYXhVcGxvYWQ6IGZ1bmN0aW9uIChkYXRhKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIHRoaXMuX19hamF4VXBsb2FkUHJvZ3Jlc3MsIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5fX2FqYXhVcGxvYWRDb21wbGV0ZSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcy5fX2FqYXhVcGxvYWRFcnJvciwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgdGhpcy5fX2FqYXhVcGxvYWRBYm9ydCwgZmFsc2UpO1xuXHRcdHhoci5vcGVuKFwiUE9TVFwiLCB6bi5odHRwLmZpeFVSTCh0aGlzLnByb3BzLmFjdGlvbiksIFwidHJ1ZVwiKTtcblx0XHR4aHIuc2VuZChkYXRhKTtcblx0fSxcblx0X19hamF4VXBsb2FkUHJvZ3Jlc3M6IGZ1bmN0aW9uIChldnQpe1xuXHRcdGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuXHRcdFx0ZXZ0LnByb2dyZXNzID0gTWF0aC5yb3VuZChldnQubG9hZGVkICogMTAwIC8gZXZ0LnRvdGFsKTtcblx0XHR9XG5cdFx0Y29uc29sZS5sb2coZXZ0KTtcblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkaW5nICYmIHRoaXMucHJvcHMub25VcGxvYWRpbmcoZXZ0LCB0aGlzKTtcblx0fSxcblx0X19hamF4VXBsb2FkQ29tcGxldGU6IGZ1bmN0aW9uIChldnQpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR2YXIgX2RhdGEgPSBKU09OLnBhcnNlKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0KTtcblx0XHRpZihfZGF0YS5zdGF0dXM9PTIwMCl7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKF9kYXRhLnJlc3VsdCwgdGhpcyk7XG5cdFx0fWVsc2Uge1xuXHRcdFx0em4uY29uZmlybShfZGF0YS5yZXN1bHQpO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkVycm9yICYmIHRoaXMucHJvcHMub25FcnJvcihfZGF0YS5yZXN1bHQsIHRoaXMpO1xuXHRcdH1cblx0fSxcblx0X19hamF4VXBsb2FkRXJyb3I6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHRcdHRoaXMucHJvcHMub25FcnJvciAmJiB0aGlzLnByb3BzLm9uRXJyb3IoZXZlbnQubWVzc2FnZSwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZEFib3J0OiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnByb3BzLm9uQWJvcnQgJiYgdGhpcy5wcm9wcy5vbkFib3J0KGV2ZW50LCB0aGlzKTtcblx0fSxcblx0cmVzZXQ6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiBmYWxzZSB9KTtcblx0XHRSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5yZXNldCgpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1hamF4LXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG5cdFx0XHRcdGRhdGEtbG9hZGluZz17dGhpcy5zdGF0ZS5sb2FkaW5nfVxuXHRcdFx0XHRhY3Rpb249e3puLmh0dHAuZml4VVJMKHRoaXMucHJvcHMuYWN0aW9ufHwnJyl9XG5cdFx0XHRcdGVuY1R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcblx0XHRcdFx0bWV0aG9kPVwiUE9TVFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFqYXgtdXBsb2FkLWNvbnRhaW5lclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5zaXplICYmIDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57dGhpcy5wcm9wcy5zaXplfTwvc3Bhbj59XG5cdFx0XHRcdDxpbnB1dCBtdWx0aXBsZT17dGhpcy5wcm9wcy5tdWx0aXBsZX0gY2xhc3NOYW1lPVwiaW5wdXRcIiB0eXBlPVwiZmlsZVwiIG5hbWU9e3RoaXMucHJvcHMubmFtZXx8KCd1cGxvYWRfZmlsZV8nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSl9IG9uQ2hhbmdlPXt0aGlzLl9fb25JbnB1dENoYW5nZX0gb25DbGljaz17dGhpcy5fX29uSW5wdXRDbGlja30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhamF4LXVwbG9hZC1pY29uXCI+PFJlYWN0RkEuRm9udEF3ZXNvbWVJY29uIGljb249e1JlYWN0U1ZHSWNvbnMuZmFVcGxvYWR9IC8+PC9kaXY+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQWpheFVwbG9hZGVyID0gcmVxdWlyZSgnLi9BamF4VXBsb2FkZXInKTtcbnZhciBSZWFjdEZBID0gcmVxdWlyZSgnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJyk7XG52YXIgUmVhY3RTVkdJY29ucyA9IHJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRlZGl0YWJsZTogdHJ1ZVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiAnLCdcblx0XHR9O1xuICBcdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcyl7XG5cdFx0dmFyIF9maWxlID0gZmlsZXNbMF07XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKF9maWxlKTtcblx0fSxcblx0X19vbkNvbXBsZXRlOiBmdW5jdGlvbiAoZGF0YSwgdXBsb2FkZXIpe1xuXHRcdHZhciBfdmFsdWVzID0gKGRhdGF8fFtdKS5tYXAoZnVuY3Rpb24gKGZpbGUpe1xuXHRcdFx0cmV0dXJuIGZpbGUudXJsO1xuXHRcdH0pO1xuXHRcdHRoaXMuc3RhdGUudmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlICsgX3ZhbHVlcy5qb2luKCcsJykgKyAnLCc7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdHRoaXMucHJvcHMub25Db21wbGV0ZSAmJiB0aGlzLnByb3BzLm9uQ29tcGxldGUoZGF0YSwgdXBsb2FkZXIpO1xuXHR9LFxuXHRnZXRWYWx1ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG5cdH0sXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSk7XG5cdH0sXG5cdF9fb25QcmV2aWV3OiBmdW5jdGlvbiAoaXRlbSl7XG5cdFx0dGhpcy5wcm9wcy5vblByZXZpZXcgJiYgdGhpcy5wcm9wcy5vblByZXZpZXcoaXRlbSk7XG5cdH0sXG5cdF9fcmVuZGVyQ29udGVudDogZnVuY3Rpb24gKGl0ZW0pe1xuXHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGl0ZW0pO1xuXHRcdGlmKF90ZW1wKXtcblx0XHRcdHJldHVybiBfdGVtcDtcblx0XHR9XG5cblx0XHRyZXR1cm4gPGEgb25DbGljaz17KCk9PnRoaXMuX19vblByZXZpZXcoaXRlbSl9Pnt0aGlzLl9fcmVuZGVyRmlsZUJ5VHlwZShpdGVtLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKSwgaXRlbSl9PC9hPjtcblx0fSxcblx0X19yZW5kZXJQcmV2aWV3RmlsZUJ5VHlwZTogZnVuY3Rpb24gKHR5cGUsIHZhbHVlKXtcblx0XHRpZih0aGlzLnByb3BzLmlzSW1hZ2Upe1xuXHRcdFx0cmV0dXJuIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHNyYz17em4uaHR0cC5maXhVUkwodmFsdWUpfSAvPjtcblx0XHR9XG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlICdqcGcnOlxuXHRcdFx0Y2FzZSAncG5nJzpcblx0XHRcdGNhc2UgJ2pwZWcnOlxuXHRcdFx0Y2FzZSAnZ2lmJzpcblx0XHRcdFx0cmV0dXJuIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHNyYz17em4uaHR0cC5maXhVUkwodmFsdWUpfSAvPjtcblx0XHRcdGNhc2UgJ21wNCc6XG5cdFx0XHRjYXNlICdtcGcnOlxuXHRcdFx0Y2FzZSAnbXBlZyc6XG5cdFx0XHRjYXNlICdtb3YnOlxuXHRcdFx0Y2FzZSAnb2dnJzpcblx0XHRcdGNhc2UgJ2F2aSc6XG5cdFx0XHRjYXNlICdhYWMnOlxuXHRcdFx0Y2FzZSAnYWlmZic6XG5cdFx0XHRjYXNlICdxdCc6XG5cdFx0XHRjYXNlICd2aXYnOlxuXHRcdFx0XHRyZXR1cm4gPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBwcmVsb2FkPVwiYXV0b1wiIGxvb3A9XCJsb29wXCIgYXV0b3BsYXk9XCJhdXRvcGxheVwiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5cblx0XHRcdFx0ICBcdDxzb3VyY2Ugc3JjPXt6bi5odHRwLmZpeFVSTCh2YWx1ZSl9IHR5cGU9XCJ2aWRlby9vZ2dcIiAvPlxuXHRcdFx0XHQgIFx0PHNvdXJjZSBzcmM9e3puLmh0dHAuZml4VVJMKHZhbHVlKX0gdHlwZT1cInZpZGVvL21wNFwiIC8+XG5cdFx0XHRcdFx0WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cblx0XHRcdFx0PC92aWRlbz47XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUuc3BsaXQoJy8nKS5wb3AoKTtcblx0XHR9XG5cdH0sXG5cdF9fcmVuZGVyRmlsZUJ5VHlwZTogZnVuY3Rpb24gKHR5cGUsIHZhbHVlKXtcblx0XHRpZih0aGlzLnByb3BzLmlzSW1hZ2Upe1xuXHRcdFx0cmV0dXJuIDxpbWcgc3JjPXt6bi5odHRwLmZpeFVSTCh2YWx1ZSl9IC8+O1xuXHRcdH1cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgJ2pwZyc6XG5cdFx0XHRjYXNlICdwbmcnOlxuXHRcdFx0Y2FzZSAnanBlZyc6XG5cdFx0XHRjYXNlICdnaWYnOlxuXHRcdFx0XHRyZXR1cm4gPGltZyBzcmM9e3puLmh0dHAuZml4VVJMKHZhbHVlKX0gLz47XG5cdFx0XHRjYXNlICdtcDQnOlxuXHRcdFx0Y2FzZSAnbXBnJzpcblx0XHRcdGNhc2UgJ21wZWcnOlxuXHRcdFx0Y2FzZSAnbW92Jzpcblx0XHRcdGNhc2UgJ29nZyc6XG5cdFx0XHRjYXNlICdhdmknOlxuXHRcdFx0Y2FzZSAnYWFjJzpcblx0XHRcdGNhc2UgJ2FpZmYnOlxuXHRcdFx0Y2FzZSAncXQnOlxuXHRcdFx0Y2FzZSAndml2Jzpcblx0XHRcdFx0cmV0dXJuIDx2aWRlbyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIj5cblx0XHRcdFx0ICBcdDxzb3VyY2Ugc3JjPXt6bi5odHRwLmZpeFVSTCh2YWx1ZSl9IHR5cGU9XCJ2aWRlby9vZ2dcIiAvPlxuXHRcdFx0XHQgIFx0PHNvdXJjZSBzcmM9e3puLmh0dHAuZml4VVJMKHZhbHVlKX0gdHlwZT1cInZpZGVvL21wNFwiIC8+XG5cdFx0XHRcdFx0WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cblx0XHRcdFx0PC92aWRlbz47XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUuc3BsaXQoJy8nKS5wb3AoKTtcblx0XHR9XG5cdH0sXG5cdF9fb25SZW1vdmU6IGZ1bmN0aW9uIChpdGVtLCBpbmRleCl7XG5cdFx0dGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuc3RhdGUudmFsdWUucmVwbGFjZShpdGVtLCAnJyk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIF92YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlLnNwbGl0KCcsJyk7XG5cdFx0dmFyIF9lZGl0YWJsZSA9ICh0aGlzLnByb3BzLmVkaXRhYmxlICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRvbmx5KTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItZmlsZS11cGxvYWRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0e19lZGl0YWJsZSAmJiA8QWpheFVwbG9hZGVyXG5cdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMudXBsb2FkZXJTdHlsZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5fX29uQ2hhbmdlfVxuXHRcdFx0XHRcdG9uQ29tcGxldGU9e3RoaXMuX19vbkNvbXBsZXRlfSA+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmlsZS11cGxvYWQtaWNvblwiPjxSZWFjdEZBLkZvbnRBd2Vzb21lSWNvbiBpY29uPXtSZWFjdFNWR0ljb25zLmZhRmlsZVVwbG9hZH0gLz48L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9BamF4VXBsb2FkZXI+fVxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZmlsZS1saXN0XCI+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0X3ZhbHVlcy5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0XHRcdFx0aWYoaXRlbSl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxsaSBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJmaWxlXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHR7IF9lZGl0YWJsZSAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1yZW1vdmUgenItaG92ZXItc2VsZi1sb2FkaW5nXCIgb25DbGljaz17KCk9PnRoaXMuX19vblJlbW92ZShpdGVtLCBpbmRleCl9IC8+fVxuXHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMuX19yZW5kZXJDb250ZW50KGl0ZW0pfVxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQWpheFVwbG9hZGVyID0gcmVxdWlyZSgnLi9BamF4VXBsb2FkZXInKTtcbnZhciBSZWFjdEZBID0gcmVxdWlyZSgnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJyk7XG52YXIgUmVhY3RTVkdJY29ucyA9IHJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWVcblx0XHR9O1xuICBcdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcyl7XG5cdFx0dmFyIF9maWxlID0gZmlsZXNbMF07XG5cdFx0aWYoX2ZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpPT0tMSl7XG5cdFx0XHRhbGVydCgn5paH5Lu2WycgKyBfZmlsZS5uYW1lICsgJ13kuI3mmK/lm77niYfnsbvlnosnKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0sXG5cdF9fb25Db21wbGV0ZTogZnVuY3Rpb24gKGRhdGEsIHVwbG9hZGVyKXtcblx0XHR2YXIgX2ZpbGUgPSBkYXRhWzBdO1xuXHRcdGlmKF9maWxlKXtcblx0XHRcdHZhciBfdmFsdWUgPSBfZmlsZS51cmw7XG5cdFx0XHRpZihfdmFsdWUuaW5kZXhPZignLycpIT0wKXtcblx0XHRcdFx0X3ZhbHVlID0gXCIvXCIgKyBfdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFZhbHVlKF92YWx1ZSk7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25Db21wbGV0ZSAmJiB0aGlzLnByb3BzLm9uQ29tcGxldGUoX2ZpbGUsIHRoaXMpO1xuXHR9LFxuXHRnZXRWYWx1ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG5cdH0sXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSwgZnVuY3Rpb24gKCl7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlICYmIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUsIHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBfc3JjID0gdGhpcy5zdGF0ZS52YWx1ZTtcblx0XHRpZihfc3JjLmluZGV4T2YoJy8nKT09MCl7XG5cdFx0XHRfc3JjID0gem4uaHR0cC5maXhVUkwodGhpcy5zdGF0ZS52YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8QWpheFVwbG9hZGVyXG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfVxuXHRcdFx0XHRjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItaW1hZ2UtdXBsb2FkZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5fX29uQ2hhbmdlfVxuXHRcdFx0XHRvbkNvbXBsZXRlPXt0aGlzLl9fb25Db21wbGV0ZX1cblx0XHRcdFx0bXVsdGlwYXJ0PXtmYWxzZX0gPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCEhX3NyYyA/IDxpbWcgY2xhc3NOYW1lPVwiaW1nXCIgc3JjPXtfc3JjfSAvPjogPGRpdiBjbGFzc05hbWU9XCJpbWFnZS11cGxvYWQtaWNvblwiPjxSZWFjdEZBLkZvbnRBd2Vzb21lSWNvbiBpY29uPXtSZWFjdFNWR0ljb25zLmZhSW1hZ2V9IC8+PC9kaXY+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvQWpheFVwbG9hZGVyPlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ0FqYXhVcGxvYWRlcic6IHJlcXVpcmUoJy4vQWpheFVwbG9hZGVyJyksXG4gICAgJ0ZpbGVVcGxvYWRlcic6IHJlcXVpcmUoJy4vRmlsZVVwbG9hZGVyJyksXG4gICAgJ0ltYWdlVXBsb2FkZXInOiByZXF1aXJlKCcuL0ltYWdlVXBsb2FkZXInKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImZzc2lcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJyZlwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RET01cIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==