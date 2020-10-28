require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var uploader = require('../../src/index');

zn.setting.setKey('zr.uploader', {
    host: "http://127.0.0.1:4545"
});

znui.react.createApplication({
    render: <div>
        <uploader.FileUploader value={',upload_a1e429631d76e90b36d8e75451570e61,upload_ee0eac01c790d829c841e5ef116108dd,upload_f9d4729527cb59f9308256c76621f622,'} name="xxxx" style={{  }} />
        <uploader.FilesViewer value={',upload_a1e429631d76e90b36d8e75451570e61,upload_ee0eac01c790d829c841e5ef116108dd,upload_f9d4729527cb59f9308256c76621f622,'} name="xxxx" style={{  }} />
        <uploader.ImageUploader style={{width: 128, height: 128}} value='upload_a1e429631d76e90b36d8e75451570e61' />
        <uploader.ImageUploader style={{width: 128, height: 128, borderRadius: 128, border: 'none'}} />
        <uploader.ImageUploader style={{width: 'auto !important', height: 'auto !important'}} />
    </div>
});