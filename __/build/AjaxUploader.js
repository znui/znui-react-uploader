"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || require('react');

var ReactDOM = znui.ReactDOM || require('react-dom');

var ReactFA = require('@fortawesome/react-fontawesome');

var ReactSVGIcons = require('@fortawesome/free-solid-svg-icons');

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