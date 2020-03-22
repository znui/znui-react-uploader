# znui-react-uploader
Uploader Component.


[![npm](https://img.shields.io/npm/v/znui-react-uploader.svg)](https://www.npmjs.com/package/znui-react-uploader)
[![npm](https://img.shields.io/npm/dm/znui-react-uploader.svg)](https://www.npmjs.com/package/znui-react-uploader)

## Demo

[Take a look at the demo](https://znui.github.io/znui-react-uploader/example/www/index.html)

## Installation

```bash
npm install znui-react-uploader -s
```

## Usage

```javascript

var ReactDOM = require('react-dom');
var uploader = require('znui-react-uploader');


ReactDOM.render(
    <div>
        <uploader.FileUploader />
        <uploader.ImageUploader />
    </div>,
    document.getElementById('container'),
);

```

## License

MIT