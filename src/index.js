zn.setting.setKey('zr.uploader', zn.deepAssign({}, zn.setting.getKey('zr.uploader'), {
    uploadApi: '/zxnz.core.fs/upload/files',
    fetchApi: '/zxnz.core.fs/fetch/file/',
    fetchsApi: '/zxnz.core.fs/fetch/files/',
    fetchImageApi: '/zxnz.core.fs/fetch/image/',
    downloadApi: '/zxnz.core.fs/download/file/'
}));

module.exports = {
    AjaxUploader: require('./AjaxUploader'),
    FileListItem: require('./FileListItem'),
    FileUploader: require('./FileUploader'),
    FilesViewer: require('./FilesViewer'),
    ImageUploader: require('./ImageUploader')
};