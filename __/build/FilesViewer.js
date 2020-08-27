"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || require('react');

var FileViewer = require('./FileViewer');

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