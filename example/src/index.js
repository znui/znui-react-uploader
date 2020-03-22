require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var uploader = require('../../src/index');

znui.react.createApplication({
    render: <div>
        <uploader.FileUploader />
        <uploader.ImageUploader />
    </div>
});