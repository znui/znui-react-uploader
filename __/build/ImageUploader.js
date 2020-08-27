"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || require('react');

var AjaxUploader = require('./AjaxUploader');

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