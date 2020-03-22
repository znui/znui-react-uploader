"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || require('react');

var AjaxUploader = require('./AjaxUploader');

var ReactFA = require('@fortawesome/react-fontawesome');

var ReactSVGIcons = require('@fortawesome/free-solid-svg-icons');

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