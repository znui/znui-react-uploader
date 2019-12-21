require('znui-react');
var React = require('react');
var ReactDOM = require('react-dom');
require('../src/index.less');
require('./index.less');
var uploader = require('../src/index.js');

ReactDOM.render(
    <div>
        <uploader.FileUploader />
        <uploader.ImageUploader />
    </div>,
    document.getElementById('container'),
);

