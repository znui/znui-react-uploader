require('@zeanium/core');
var argv = zn.convertArrayArgv(process.argv).argv;
var _path = argv['znui-react.path'] || '';
module.exports = require(_path + 'znui-react/webpack').component.production(function (config){
    return {
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "znui-react": "zr",
            "@fortawesome/react-fontawesome":"rf",
            "@fortawesome/fontawesome-svg-core":"fsc",
            "@fortawesome/free-solid-svg-icons":"fssi"
        }
    };
});