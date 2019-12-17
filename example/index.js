var React = require('react');
var ReactDOM = require('react-dom');
var createClass = require('create-react-class');
require('../../znui-react/index.all.js');
znui.react.fixCreateReactClass(React, createClass);
var uploader = require('../src/index.js');
require('./index.less');

ReactDOM.render(
    <div>
        <uploader.FileUploader />
        <uploader.ImageUploader />
    </div>,
    document.getElementById('container'),
);

