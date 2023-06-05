"use strict";

var React = znui.React || require('react');

var FileListItem = require('./FileListItem');

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
      files: [],
      value: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      this.initValue(this.props.value);
    }
  },
  __resolveFileApi: function __resolveFileApi() {
    var _host = this.props.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
        _api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');

    _api = _host + _api;

    if (_api) {
      return _api;
    }

    return console.error("文件接口未输入"), false;
  },
  initValue: function initValue(value) {
    var _api = this.__resolveFileApi();

    if (!_api || !value) return;

    if (zn.is(value, 'object')) {
      return this.setFiles([value]), false;
    }

    if (zn.is(value, 'array') && value.length && zn.is(value[0], 'object')) {
      return this.setFiles(value), false;
    }

    if (zn.is(value, 'array')) {
      value = value.join(',');
    }

    zn.data.get(_api + value).then(function (response) {
      var _files = znui.react.resolveArrayResult(response);

      if (_files) {
        this.setFiles(_files);
      } else {
        console.error("FilesViewer.js - 网络请求错误: ", response);
      }
    }.bind(this), function (err) {
      console.error("FilesViewer.js - 网络请求错误: ", err);
    });
  },
  setFiles: function setFiles(files) {
    this.state.files = files;
    this.forceUpdate();
  },
  __renderFiles: function __renderFiles() {
    var _this = this;

    if (this.state.files) {
      return /*#__PURE__*/React.createElement("div", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        if (file) {
          var _return = _this.props.onFileRender && _this.props.onFileRender(file, index, _this);

          if (_return) {
            return _return;
          }

          return /*#__PURE__*/React.createElement(FileListItem, {
            key: index,
            valueKey: "tempName",
            host: _this.props.host,
            data: file,
            editable: _this.props.editable
          });
        }
      }));
    }
  },
  render: function render() {
    if (!this.state.files) {
      return /*#__PURE__*/React.createElement("div", {
        className: "zr-file-viewer"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-spinner"
      }), /*#__PURE__*/React.createElement("span", null, "\u52A0\u8F7D\u4E2D ... "));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-files-viewer", this.props.className),
      style: znui.react.style(this.props.style)
    }, this.__renderFiles());
  }
});