"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || require('react');

var AjaxUploader = require('./AjaxUploader');

var ReactFA = require('@fortawesome/react-fontawesome');

var ReactSVGIcons = require('@fortawesome/free-solid-svg-icons');

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