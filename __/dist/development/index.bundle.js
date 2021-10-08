(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/pdfobject/pdfobject.js":
/*!**********************************************!*\
  !*** ../node_modules/pdfobject/pdfobject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 *  PDFObject v2.2.5
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2021 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {

    "use strict";

    //PDFObject is designed for client-side (browsers), not server-side (node)
    //Will choke on undefined navigator and window vars when run on server
    //Return boolean false and exit function when running server-side

    if( typeof window === "undefined" || 
        window.navigator === undefined || 
        window.navigator.userAgent === undefined || 
        window.navigator.mimeTypes === undefined){ 
            return false;
    }

    let pdfobjectversion = "2.2.3";
    let nav = window.navigator;
    let ua = window.navigator.userAgent;

    //Time to jump through hoops -- browser vendors do not make it easy to detect PDF support.

    /*
        IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose window.ActiveXObject the same way 
        previous versions of IE did. window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject" 
        in window evaluates to true.

        MS Edge does not support ActiveX so this test will evaluate false
    */
    let isIE = ("ActiveXObject" in window);

    /*
        There is a coincidental correlation between implementation of window.promises and native PDF support in desktop browsers
        We use this to assume if the browser supports promises it supports embedded PDFs
        Is this fragile? Sort of. But browser vendors removed mimetype detection, so we're left to improvise
    */
    let isModernBrowser = (window.Promise !== undefined);

    //Older browsers still expose the mimeType
    let supportsPdfMimeType = (nav.mimeTypes["application/pdf"] !== undefined);

    //Safari on iPadOS doesn't report as 'mobile' when requesting desktop site, yet still fails to embed PDFs
    let isSafariIOSDesktopMode = (  nav.platform !== undefined && 
                                    nav.platform === "MacIntel" && 
                                    nav.maxTouchPoints !== undefined && 
                                    nav.maxTouchPoints > 1 );

    //Quick test for mobile devices.
    let isMobileDevice = (isSafariIOSDesktopMode || /Mobi|Tablet|Android|iPad|iPhone/.test(ua));

    //Safari desktop requires special handling 
    let isSafariDesktop = ( !isMobileDevice && 
                            nav.vendor !== undefined && 
                            /Apple/.test(nav.vendor) && 
                            /Safari/.test(ua) );
    
    //Firefox started shipping PDF.js in Firefox 19. If this is Firefox 19 or greater, assume PDF.js is available
    let isFirefoxWithPDFJS = (!isMobileDevice && /irefox/.test(ua) && ua.split("rv:").length > 1) ? (parseInt(ua.split("rv:")[1].split(".")[0], 10) > 18) : false;


    /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

    let createAXO = function (type){
        var ax;
        try {
            ax = new ActiveXObject(type);
        } catch (e) {
            ax = null; //ensure ax remains null
        }
        return ax;
    };

    //If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    let supportsPdfActiveX = function (){ return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl")); };

    //Determines whether PDF support is available
    let supportsPDFs = (
        //As of Sept 2020 no mobile browsers properly support PDF embeds
        !isMobileDevice && (
            //We're moving into the age of MIME-less browsers. They mostly all support PDF rendering without plugins.
            isModernBrowser ||
            //Modern versions of Firefox come bundled with PDFJS
            isFirefoxWithPDFJS ||
            //Browsers that still support the original MIME type check
            supportsPdfMimeType ||
            //Pity the poor souls still using IE
            (isIE && supportsPdfActiveX())
        )
    );

    //Create a fragment identifier for using PDF Open parameters when embedding PDF
    let buildURLFragmentString = function(pdfParams){

        let string = "";
        let prop;

        if(pdfParams){

            for (prop in pdfParams) {
                if (pdfParams.hasOwnProperty(prop)) {
                    string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
                }
            }

            //The string will be empty if no PDF Params found
            if(string){

                string = "#" + string;

                //Remove last ampersand
                string = string.slice(0, string.length - 1);

            }

        }

        return string;

    };

    let embedError = function (msg, suppressConsole){
        if(!suppressConsole){
            console.log("[PDFObject] " + msg);
        }
        return false;
    };

    let emptyNodeContents = function (node){
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
    };

    let getTargetElement = function (targetSelector){

        //Default to body for full-browser PDF
        let targetNode = document.body;

        //If a targetSelector is specified, check to see whether
        //it's passing a selector, jQuery object, or an HTML element

        if(typeof targetSelector === "string"){

            //Is CSS selector
            targetNode = document.querySelector(targetSelector);

        } else if (window.jQuery !== undefined && targetSelector instanceof jQuery && targetSelector.length) {

            //Is jQuery element. Extract HTML node
            targetNode = targetSelector.get(0);

        } else if (targetSelector.nodeType !== undefined && targetSelector.nodeType === 1){

            //Is HTML element
            targetNode = targetSelector;

        }

        return targetNode;

    };

    let generatePDFJSMarkup = function (targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles){

        //Ensure target element is empty first
        emptyNodeContents(targetNode);

        let fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;
        let div = document.createElement("div");
        let iframe = document.createElement("iframe");
        
        iframe.src = fullURL;
        iframe.className = "pdfobject";
        iframe.type = "application/pdf";
        iframe.frameborder = "0";
        iframe.allow = "fullscreen";
        
        if(id){
            iframe.id = id;
        }

        if(!omitInlineStyles){
            div.style.cssText = "position: absolute; top: 0; right: 0; bottom: 0; left: 0;";
            iframe.style.cssText = "border: none; width: 100%; height: 100%;";
            targetNode.style.position = "relative";
            targetNode.style.overflow = "auto";        
        }

        div.appendChild(iframe);
        targetNode.appendChild(div);
        targetNode.classList.add("pdfobject-container");
        
        return targetNode.getElementsByTagName("iframe")[0];

    };

    let generatePDFObjectMarkup = function (embedType, targetNode, targetSelector, url, pdfOpenFragment, width, height, id, omitInlineStyles){

        //Ensure target element is empty first
        emptyNodeContents(targetNode);

        let embed = document.createElement(embedType);
        embed.src = url + pdfOpenFragment;
        embed.className = "pdfobject";
        embed.type = "application/pdf";

        if(id){
            embed.id = id;
        }

        if(embedType === "iframe"){
            embed.allow = "fullscreen";
        }

        if(!omitInlineStyles){

            let style = (embedType === "embed") ? "overflow: auto;" : "border: none;";

            if(targetSelector && targetSelector !== document.body){
                style += "width: " + width + "; height: " + height + ";";
            } else {
                style += "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
            }

            embed.style.cssText = style; 

        }

        targetNode.classList.add("pdfobject-container");
        targetNode.appendChild(embed);

        return targetNode.getElementsByTagName(embedType)[0];

    };

    let embed = function(url, targetSelector, options){

        //If targetSelector is not defined, convert to boolean
        let selector = targetSelector || false;

        //Ensure options object is not undefined -- enables easier error checking below
        let opt = options || {};

        //Get passed options, or set reasonable defaults
        let id = (typeof opt.id === "string") ? opt.id : "";
        let page = opt.page || false;
        let pdfOpenParams = opt.pdfOpenParams || {};
        let fallbackLink = opt.fallbackLink || true;
        let width = opt.width || "100%";
        let height = opt.height || "100%";
        let assumptionMode = (typeof opt.assumptionMode === "boolean") ? opt.assumptionMode : true;
        let forcePDFJS = (typeof opt.forcePDFJS === "boolean") ? opt.forcePDFJS : false;
        let supportRedirect = (typeof opt.supportRedirect === "boolean") ? opt.supportRedirect : false;
        let omitInlineStyles = (typeof opt.omitInlineStyles === "boolean") ? opt.omitInlineStyles : false;
        let suppressConsole = (typeof opt.suppressConsole === "boolean") ? opt.suppressConsole : false;
        let forceIframe = (typeof opt.forceIframe === "boolean") ? opt.forceIframe : false;
        let PDFJS_URL = opt.PDFJS_URL || false;
        let targetNode = getTargetElement(selector);
        let fallbackHTML = "";
        let pdfOpenFragment = "";
        let fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";

        //Ensure URL is available. If not, exit now.
        if(typeof url !== "string"){ return embedError("URL is not valid", suppressConsole); }

        //If target element is specified but is not valid, exit without doing anything
        if(!targetNode){ return embedError("Target element cannot be determined", suppressConsole); }

        //page option overrides pdfOpenParams, if found
        if(page){ pdfOpenParams.page = page; }

        //Stringify optional Adobe params for opening document (as fragment identifier)
        pdfOpenFragment = buildURLFragmentString(pdfOpenParams);


        // --== Do the dance: Embed attempt #1 ==--

        //If the forcePDFJS option is invoked, skip everything else and embed as directed
        if(forcePDFJS && PDFJS_URL){
            return generatePDFJSMarkup(targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles);
        }
 
        // --== Embed attempt #2 ==--

        //Embed PDF if traditional support is provided, or if this developer is willing to roll with assumption
        //that modern desktop (not mobile) browsers natively support PDFs 
        if(supportsPDFs || (assumptionMode && !isMobileDevice)){
            
            //Should we use <embed> or <iframe>? In most cases <embed>. 
            //Allow developer to force <iframe>, if desired
            //There is an edge case where Safari does not respect 302 redirect requests for PDF files when using <embed> element.
            //Redirect appears to work fine when using <iframe> instead of <embed> (Addresses issue #210)
            let embedtype = (forceIframe || (supportRedirect && isSafariDesktop)) ? "iframe" : "embed";
            
            return generatePDFObjectMarkup(embedtype, targetNode, targetSelector, url, pdfOpenFragment, width, height, id, omitInlineStyles);

        }
        
        // --== Embed attempt #3 ==--
        
        //If everything else has failed and a PDFJS fallback is provided, try to use it
        if(PDFJS_URL){
            return generatePDFJSMarkup(targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles);
        }
        
        // --== PDF embed not supported! Use fallback ==-- 

        //Display the fallback link if available
        if(fallbackLink){

            fallbackHTML = (typeof fallbackLink === "string") ? fallbackLink : fallbackHTML_default;
            targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);

        }

        return embedError("This browser does not support embedded PDFs", suppressConsole);

    };

    return {
        embed: function (a,b,c){ return embed(a,b,c); },
        pdfobjectversion: (function () { return pdfobjectversion; })(),
        supportsPDFs: (function (){ return supportsPDFs; })()
    };

}));


/***/ }),

/***/ "../node_modules/react-pdfobject/lib/index.js":
/*!****************************************************!*\
  !*** ../node_modules/react-pdfobject/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var pdfobject = __webpack_require__(/*! pdfobject */ "../node_modules/pdfobject/pdfobject.js");
var PDFObject = /** @class */ (function (_super) {
    __extends(PDFObject, _super);
    function PDFObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.embed = function () {
            var _a = _this.props, url = _a.url, containerId = _a.containerId, containerProps = _a.containerProps, options = __rest(_a, ["url", "containerId", "containerProps"]);
            if (pdfobject) {
                pdfobject.embed(url, "#" + containerId, options);
            }
        };
        return _this;
    }
    PDFObject.prototype.componentDidMount = function () {
        this.embed();
    };
    PDFObject.prototype.componentDidUpdate = function (prevProps) {
        // check for different props.url
        if (prevProps.url !== this.props.url) {
            this.embed();
        }
    };
    PDFObject.prototype.render = function () {
        return React.createElement("div", __assign({}, this.props.containerProps, { id: this.props.containerId }));
    };
    PDFObject.defaultProps = {
        width: '100%',
        height: '100%',
        containerId: 'pdfobject',
        forcePDFJS: false,
        assumptionMode: true,
    };
    return PDFObject;
}(React.PureComponent));
exports.PDFObject = PDFObject;


/***/ }),

/***/ "./AjaxUploader.js":
/*!*************************!*\
  !*** ./AjaxUploader.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var ReactDOM = znui.ReactDOM || __webpack_require__(/*! react-dom */ "react-dom");

module.exports = znui.react.createClass({
  displayName: 'AjaxUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      name: 'zr_ajax_uploader_file',
      action: '/zxnz.core.fs/upload/files',
      types: [],
      changeSubmit: true,
      hiddens: null,
      multiple: true,
      hint: false,
      maxFileSize: 200 * 1024 * 1024,
      size: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      host: this.props.host,
      loading: false,
      files: [],
      progress: 0,
      timeStamp: 0
    };
  },
  __onInputChange: function __onInputChange(event) {
    if (this.state.loading) {
      return false;
    }

    this.state.files = [];
    var _files = event.nativeEvent.target.files,
        _file = null;

    if (!_files.length) {
      return alert('未选择文件');
    }

    for (var i = 0, _len = _files.length; i < _len; i++) {
      _file = _files[i];

      if (_file.size > this.props.maxFileSize) {
        alert(_file.name + " 文件大小是" + znui.react.stringifyFileSize(_file.size) + ", 不能超过" + znui.react.stringifyFileSize(this.props.maxFileSize));
        return event.nativeEvent.target.form.reset(), false;
      }

      if (this.props.types.length) {
        if (this.props.types.indexOf(_file.type.split('/')[0]) == -1) {
          return alert('只支持' + this.props.types.join(',') + '的文件类型'), false;
        }
      }

      this.state.files.push(_file);
    }

    var _result = this.props.onChange && this.props.onChange(this.state.files, this);

    if (_result !== false && this.props.changeSubmit) {
      this.submit(this.state.files, _result);
    }
  },
  __onInputClick: function __onInputClick(event) {
    if (this.state.loading) {
      return false;
    }

    event.stopPropagation();
    this.props.onUploaderClick && this.props.onUploaderClick(event, this);
  },
  __resolveUploadAction: function __resolveUploadAction() {
    var _host = this.state.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
        _api = this.props.action || this.props.uploadApi || zn.setting.path('zr.uploader.uploadApi') || '';

    _api = _host + _api;
    if (!_api) return console.error("文件上传接口未输入"), false;
    return _api;
  },
  submit: function submit(files, data) {
    var _file = files || this.state.files,
        _formData = new FormData(),
        _hiddens = this.props.hiddens || {},
        _hidden = null;

    if (zn.is(data, 'object')) {
      zn.extend(_hiddens, data);
    }

    for (var i = 0, _len = _file.length; i < _len; i++) {
      _formData.append(this.props.name + '_' + i, _file[i]);
    }

    for (var key in _hiddens) {
      _hidden = _hiddens[key];

      if (_typeof(_hidden) == 'object') {
        _hidden = JSON.stringify(_hidden);
      }

      _formData.append(key, _hidden);
    }

    this.ajaxUpload(_formData);
  },
  ajaxUpload: function ajaxUpload(data) {
    var _this = this;

    var _api = this.__resolveUploadAction();

    if (!_api) return;
    this.setState({
      loading: true
    });
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (event) {
      return _this.__ajaxUploadProgress(event, xhr);
    }, false);
    xhr.addEventListener("load", function (event) {
      return _this.__ajaxUploadComplete(event, xhr);
    }, false);
    xhr.addEventListener("error", function (event) {
      return _this.__ajaxUploadError(event, xhr);
    }, false);
    xhr.addEventListener("abort", function (event) {
      return _this.__ajaxUploadAbort(event, xhr);
    }, false);
    xhr.open("POST", _api, "true");
    xhr.withCredentials = true;

    if (this.props.responseType) {
      xhr.responseType = 'blob';
    }

    if (this.props.headers) {
      for (var _key in this.props.headers) {
        xhr.setRequestHeader(_key, this.props.headers[_key]);
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.props.onFinished && this.props.onFinished(xhr, this);
      }
    }.bind(this);

    xhr.send(data);
  },
  __ajaxUploadProgress: function __ajaxUploadProgress(evt, xhr) {
    if (evt.lengthComputable) {
      evt.progress = Math.round(evt.loaded * 100 / evt.total);
      this.state.progress = evt.progress;
      this.state.timeStamp = evt.timeStamp;
      this.forceUpdate();
    }

    this.props.onUploading && this.props.onUploading(evt, xhr, this);
  },
  __ajaxUploadComplete: function __ajaxUploadComplete(evt, xhr) {
    this.reset();
    this.state.progress = 0;
    this.state.timeStamp = 0;
    this.forceUpdate();

    if (typeof evt.target.response == 'string' && (evt.target.responseType == 'text' || evt.target.responseType == '')) {
      if (evt.target.responseText.indexOf('<!DOCTYPE html>') == 0) {
        return alert(evt.target.responseText), false;
      }

      if (evt.target.responseText.indexOf('{') == 0 || evt.target.responseText.indexOf('[') == 0) {
        var _data = JSON.parse(evt.target.responseText);

        if (_data.code == 200) {
          this.props.onComplete && this.props.onComplete(_data.result, evt, xhr, this);
        } else {
          zn.error(_data.result || _data.message);
          this.props.onError && this.props.onError(_data.result, evt, xhr, this);
        }
      }
    }
  },
  __ajaxUploadError: function __ajaxUploadError(event, xhr) {
    this.reset();
    this.props.onError && this.props.onError(event.message, xhr, this);
  },
  __ajaxUploadAbort: function __ajaxUploadAbort(event, xhr) {
    this.reset();
    this.props.onAbort && this.props.onAbort(event, xhr, this);
  },
  reset: function reset() {
    this.setState({
      loading: false
    });
    ReactDOM.findDOMNode(this).reset();
  },
  __renderProcess: function __renderProcess() {
    if (this.state.progress) {
      if (this.state.progress == 100) {
        return /*#__PURE__*/React.createElement("div", {
          className: "upload-progress",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "check",
          className: "svg-inline--fa fa-check fa-w-16 ",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512"
        }, /*#__PURE__*/React.createElement("path", {
          fill: "currentColor",
          d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        })));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "upload-progress",
          style: {
            height: this.state.progress + '%'
          }
        }, this.state.progress + '%', "(", (this.state.timeStamp / 1000).toFixed(1), "s)");
      }
    }
  },
  render: function render() {
    var _api = this.__resolveUploadAction();

    if (!_api) return;
    return /*#__PURE__*/React.createElement("form", {
      className: znui.react.classname("zr-ajax-uploader", this.props.className),
      "data-loading": this.state.loading,
      action: _api,
      encType: "multipart/form-data",
      method: "POST"
    }, this.__renderProcess(), /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-container"
    }, this.props.children), this.props.hint && /*#__PURE__*/React.createElement("span", {
      className: "size"
    }, this.props.size + ' ' + znui.react.stringifyFileSize(this.props.maxFileSize)), /*#__PURE__*/React.createElement("input", {
      multiple: this.props.multiple,
      className: "input",
      type: "file",
      name: this.props.name || 'zr_ajax_uploader_file_' + Date.now(),
      onChange: this.__onInputChange,
      onClick: this.__onInputClick
    }), /*#__PURE__*/React.createElement("div", {
      className: "ajax-upload-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "upload",
      className: "svg-inline--fa fa-upload fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
    }))));
  }
});

/***/ }),

/***/ "./FileListItem.js":
/*!*************************!*\
  !*** ./FileListItem.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _znui$react$createCla;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = znui.React || __webpack_require__(/*! react */ "react");

var PDFObject = __webpack_require__(/*! react-pdfobject */ "../node_modules/react-pdfobject/lib/index.js").PDFObject;

var OFFICE_TYPE = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
module.exports = znui.react.createClass((_znui$react$createCla = {
  displayName: 'FileListItem',
  getInitialState: function getInitialState() {
    return {
      host: this.props.host,
      fullScreen: false
    };
  },
  __fileDownloadRender: function __fileDownloadRender(file) {
    var _this = this;

    var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
        _api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');

    _api = _host + _api;

    if (_api) {
      return /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return znui.downloadURL(_api + file[_this.props.valueKey], file.name);
        },
        className: "download"
      }, /*#__PURE__*/React.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "download",
        className: "svg-inline--fa fa-download fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
      })));
    }
  },
  __renderFileContent: function __renderFileContent(file) {
    var _view = null,
        _src = '';

    if (file.type.indexOf('image') == 0) {
      _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + '/zxnz.core.fs/fetch/image/' + file[this.props.valueKey || 'tempName'];
      _view = /*#__PURE__*/React.createElement("img", {
        style: {
          width: '100%',
          height: 'auto'
        },
        className: "view img-view",
        src: _src
      });
    } else if (file.type.indexOf('video') == 0) {
      _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + '/zxnz.core.fs/fetch/video.play/' + file[this.props.valueKey || 'tempName'];
      _view = /*#__PURE__*/React.createElement("video", {
        className: "view ideo-view",
        controls: true,
        preload: "auto",
        width: this.props.width,
        height: this.props.height,
        poster: this.props.poster
      }, /*#__PURE__*/React.createElement("source", {
        src: _src,
        type: "video/mp4"
      }), /*#__PURE__*/React.createElement("source", {
        src: _src,
        type: "video/webm"
      }), /*#__PURE__*/React.createElement("p", {
        className: "tips"
      }, "To view this video please enable JavaScript, and consider upgrading to a web browser that", /*#__PURE__*/React.createElement("a", {
        href: "https://videojs.com/html5-video-support/",
        target: "_blank"
      }, "supports HTML5 video")));
    } else if (OFFICE_TYPE.indexOf(file.ext) != -1) {
      _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + '/zxnz.core.fs/fetch/readAsPDF/' + file[this.props.valueKey || 'tempName'];
      _view = /*#__PURE__*/React.createElement(PDFObject, {
        url: _src,
        height: "100%"
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "file-content"
    }, _view);
  },
  __fullScreen: function __fullScreen() {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  },
  __renderFullscreen: function __renderFullscreen() {
    if (this.state.fullScreen) {
      return /*#__PURE__*/React.createElement("svg", {
        onClick: this.__fullScreen,
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "window-close",
        className: "svg-inline--fa fa-window-close fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
      }));
    }

    return /*#__PURE__*/React.createElement("svg", {
      onClick: this.__fullScreen,
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "tv",
      className: "svg-inline--fa fa-tv fa-w-20 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 640 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"
    }));
  }
}, _defineProperty(_znui$react$createCla, "__fileDownloadRender", function __fileDownloadRender(file) {
  var _this2 = this;

  var _host = this.state.host || zn.setting.path('zr.uploader.downloadHost'),
      _api = this.props.downloadApi || zn.setting.path('zr.uploader.downloadApi');

  _api = _host + _api;

  if (_api) {
    return /*#__PURE__*/React.createElement("span", {
      onClick: function onClick() {
        return znui.downloadURL(_api + file[_this2.props.valueKey], file.name);
      },
      className: "download"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "download",
      className: "svg-inline--fa fa-download fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
    })));
  }
}), _defineProperty(_znui$react$createCla, "render", function render() {
  var _this3 = this;

  var file = this.props.data;
  return /*#__PURE__*/React.createElement("div", {
    className: znui.react.classname("zr-file-list-item", this.props.className, this.state.fullScreen ? 'full-screen' : ''),
    style: znui.react.style(this.props.style)
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "item-btns"
  }, this.__renderFullscreen(), this.__fileDownloadRender(file)), /*#__PURE__*/React.createElement("div", {
    className: "file-detail"
  }, /*#__PURE__*/React.createElement("a", {
    className: "link",
    onClick: function onClick() {
      return _this3.__onPreview(file);
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    className: "time"
  }, file.lastModifiedDate)), /*#__PURE__*/React.createElement("span", {
    className: "size"
  }, znui.react.stringifyFileSize(+file.size))), this.state.fullScreen && this.__renderFileContent(file));
}), _znui$react$createCla));

/***/ }),

/***/ "./FileUploader.js":
/*!*************************!*\
  !*** ./FileUploader.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

var FileListItem = __webpack_require__(/*! ./FileListItem */ "./FileListItem.js");

module.exports = znui.react.createClass({
  displayName: 'FileUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      valueKey: 'tempName',
      editable: true,
      compress: {
        maxWidth: 1024,
        maxHeight: 768,
        quality: 1
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: [],
      files: [],
      compressing: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _return = this.props.didMount && this.props.didMount(this);

    if (_return !== false) {
      this.initValue(this.props.value);
    }
  },
  __onChange: function __onChange(files, ajaxUploader) {
    if (this.props.compress) {
      var _files = [],
          _queue = zn.queue({}, {
        every: function every(sender, file) {
          _files.push(file);
        },
        "finally": function (sender) {
          this.setState({
            compressing: false
          });
          ajaxUploader.submit(_files);
        }.bind(this)
      }),
          _compress = zn.extend({
        maxWidth: 1024,
        maxHeight: 768,
        quality: 1
      }, this.props.compress),
          _imageReader = new FileReader(),
          _img = new Image();

      _imageReader.onload = function (event) {
        _img.src = event.target.result;
      };

      this.setState({
        compressing: true
      });

      var _iterator = _createForOfIteratorHelper(files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;

          if (file.type.indexOf('image') === 0) {
            (function (file) {
              _queue.push(function (task) {
                _imageReader.readAsDataURL(file);

                _img.onload = function () {
                  var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);

                  _canvas.toBlob(function (blob) {
                    task.done(new File([blob], file.name, {
                      lastModifiedDate: new Date().getTime(),
                      type: file.type
                    }));
                  }, file.type, _compress.quality);
                };
              });
            })(file);
          } else {
            (function (file) {
              _queue.push(function (task) {
                task.done(file);
              });
            })(file);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      _queue.start();

      return false;
    }

    this.props.onUploaderChange && this.props.onUploaderChange(files, ajaxUploader, this);
  },
  __resolveFileApi: function __resolveFileApi() {
    var _host = this.state.host || zn.setting.path('zr.uploader.host') || zn.setting.path('zr.uploader.uploadHost') || '',
        _api = this.props.fetchsApi || zn.setting.path('zr.uploader.fetchsApi');

    _api = _host + _api;
    if (!_api) return console.error("文件接口未输入"), false;
    return _api;
  },
  initValue: function initValue(value) {
    var _api = this.__resolveFileApi();

    if (!value || !_api) return;

    if (zn.is(value, 'array')) {
      value = value.join(',');
    }

    zn.data.get(_api + value).then(function (response) {
      var _files = znui.react.resolveArrayResult(response);

      if (_files) {
        this.setFiles(_files);
      } else {
        console.error("FileUploader.js - 网络请求错误: ", response);
      }
    }.bind(this), function (err) {
      console.error("FileUploader.js - 网络请求错误: ", err);
    });
  },
  __onComplete: function __onComplete(data, uploader) {
    this.setFiles(data);
    this.props.onChange && this.props.onChange({
      value: this.state.value
    }, this);
    this.props.onComplete && this.props.onComplete(data, uploader, this);
  },
  setFiles: function setFiles(files) {
    var _valueKey = this.props.valueKey;

    var _values = (files || []).map(function (file) {
      if (file && file[_valueKey]) {
        return file[_valueKey];
      }
    });

    this.state.value = this.state.value.concat(_values);
    this.state.files = this.state.files.concat(files);
    this.forceUpdate();
  },
  getValue: function getValue() {
    return this.state.value;
  },
  setValue: function setValue(value) {
    this.setState({
      value: value
    });
  },
  __editable: function __editable() {
    return this.props.editable || !this.props.disabled || !this.props.readonly;
  },
  __onRemove: function __onRemove(file, index) {
    this.state.files.splice(index, 1);
    this.state.value.splice(index, 1);
    this.forceUpdate();
    this.props.onChange && this.props.onChange({
      file: file,
      index: index,
      value: this.state.value,
      files: this.state.files
    }, this);
  },
  __renderFiles: function __renderFiles() {
    if (this.state.files && this.state.files.length) {
      var _editable = this.__editable();

      return /*#__PURE__*/React.createElement("div", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        var _this = this;

        if (file) {
          var _temp = this.props.onFileRender && this.props.onFileRender(file, index);

          if (_temp) {
            return _temp;
          }

          return /*#__PURE__*/React.createElement(FileListItem, {
            key: file[this.props.valueKey],
            editable: _editable,
            data: file,
            onRemove: function onRemove() {
              return _this.__onRemove(file, index);
            }
          });
        }
      }.bind(this)));
    }
  },
  render: function render() {
    var _editable = this.__editable();

    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-file-uploader", this.props.className)
    }, _editable && /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      style: this.props.uploaderStyle,
      onChange: this.__onChange,
      onComplete: this.__onComplete
    }), /*#__PURE__*/React.createElement("div", {
      className: "upload-container",
      style: this.props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-upload-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "file-upload",
      className: "svg-inline--fa fa-file-upload fa-w-12 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
    })), this.state.compressing && /*#__PURE__*/React.createElement("span", {
      className: "compressing"
    }, "\u538B\u7F29\u4E2D...")))), this.__renderFiles());
  }
});

/***/ }),

/***/ "./FilesViewer.js":
/*!************************!*\
  !*** ./FilesViewer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

var FileListItem = __webpack_require__(/*! ./FileListItem */ "./FileListItem.js");

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
    if (this.state.files) {
      return /*#__PURE__*/React.createElement("div", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        if (file) {
          var _return = this.props.onFileRender && this.props.onFileRender(file, index, this);

          if (_return) {
            return _return;
          }

          return /*#__PURE__*/React.createElement(FileListItem, {
            host: this.props.host,
            key: index,
            data: file,
            editable: this.props.editable
          });
        }
      }.bind(this)));
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

/***/ }),

/***/ "./ImageUploader.js":
/*!**************************!*\
  !*** ./ImageUploader.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var AjaxUploader = __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js");

module.exports = React.createClass({
  displayName: 'ImageUploader',
  getDefaultProps: function getDefaultProps() {
    return {
      value: '',
      compress: {
        maxWidth: 1024,
        maxHeight: 768,
        quality: 1
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      imageDataURL: null,
      original: null,
      compress: null,
      compressing: false
    };
  },
  __onChange: function __onChange(files, ajaxUploader) {
    var _file = files[0];

    if (_file.type.indexOf('image') == -1) {
      return alert(_file.name + ' 不是图片文件'), false;
    }

    if (!FileReader || !Image) {
      return alert('浏览器不支持预览功能'), false;
    }

    if (this.props.compress) {
      this.setState({
        compressing: true
      });

      var _self = this,
          _compress = zn.extend({
        maxWidth: 1024,
        maxHeight: 768,
        quality: 1
      }, this.props.compress),
          _imageReader = new FileReader(),
          _img = new Image();

      _imageReader.onload = function (event) {
        _img.src = event.target.result;
      };

      _imageReader.readAsDataURL(_file);

      _img.onload = function () {
        _self.state.original = {
          size: znui.react.stringifyFileSize(_file.size),
          width: _img.width,
          height: _img.height
        };

        var _canvas = znui.imageToCanvas(_img, _compress.maxWidth, _compress.maxHeight);

        _self.state.imageDataURL = _canvas.toDataURL(_file.type, _compress.quality);

        _canvas.toBlob(function (blob) {
          _self.state.compressing = false;

          if (blob) {
            _self.state.compress = {
              size: znui.react.stringifyFileSize(blob.size),
              width: _canvas.width,
              height: _canvas.height
            };
            ajaxUploader.submit([new File([blob], _file.name, {
              lastModifiedDate: new Date().getTime(),
              type: _file.type
            })]);
          }

          _self.forceUpdate();
        }, _file.type, _compress.quality);
      };

      return false;
    } else {
      var _imageReader = new FileReader();

      _imageReader.onload = function (event) {
        this.setState({
          imageDataURL: event.target.result
        });
      }.bind(this);

      _imageReader.readAsDataURL(_file);
    }
  },
  __onComplete: function __onComplete(data, uploader) {
    var _file = data[0];

    if (_file) {
      this.setValue(_file[this.props.valueKey || 'tempName']);
    }

    this.props.onComplete && this.props.onComplete(_file, this);
  },
  getValue: function getValue() {
    return this.state.value;
  },
  setValue: function setValue(value) {
    this.setState({
      value: value
    }, function () {
      this.props.onChange && this.props.onChange({
        value: value
      }, this);
    }.bind(this));
  },
  __renderImage: function __renderImage() {
    var _src = this.state.imageDataURL;

    if (!_src) {
      _src = this.state.value;

      if (_src && _src.indexOf('http') != 0) {
        if (_src.indexOf('/') != -1) {
          _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + _src;
        } else {
          _src = (this.props.host || zn.setting.path('zr.uploader.host') || '') + (zn.setting.path('zr.uploader.fetchImageApi') || '') + _src;
        }
      }
    }

    if (_src) {
      return /*#__PURE__*/React.createElement("img", {
        className: "img",
        src: _src
      });
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "img-upload-icon"
      }, /*#__PURE__*/React.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "image",
        className: "svg-inline--fa fa-image fa-w-16 ",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
      })));
    }
  },
  render: function render() {
    return /*#__PURE__*/React.createElement(AjaxUploader, _extends({}, this.props, {
      className: znui.react.classname("zr-image-uploader", this.props.className),
      onChange: this.__onChange,
      onComplete: this.__onComplete,
      multiple: false
    }), /*#__PURE__*/React.createElement("div", {
      className: "image-container",
      style: this.props.style
    }, this.__renderImage(), this.state.compress && /*#__PURE__*/React.createElement("div", {
      className: "compress-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "original"
    }, "\u524D\uFF1A", this.state.original.width, " x ", this.state.original.height, " (", this.state.original.size, ")"), /*#__PURE__*/React.createElement("div", {
      className: "compress"
    }, "\u540E\uFF1A", this.state.compress.width, " x ", this.state.compress.height, " (", this.state.compress.size, ")")), this.state.compressing && /*#__PURE__*/React.createElement("span", {
      className: "compressing"
    }, "\u538B\u7F29\u4E2D...")));
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

zn.setting.setKey('zr.uploader', zn.deepAssign({}, zn.setting.getKey('zr.uploader'), {
  uploadApi: '/zxnz.core.fs/upload/files',
  fetchApi: '/zxnz.core.fs/fetch/file/',
  fetchsApi: '/zxnz.core.fs/fetch/files/',
  fetchImageApi: '/zxnz.core.fs/fetch/image/',
  downloadApi: '/zxnz.core.fs/download/file/'
}));
module.exports = {
  AjaxUploader: __webpack_require__(/*! ./AjaxUploader */ "./AjaxUploader.js"),
  FileListItem: __webpack_require__(/*! ./FileListItem */ "./FileListItem.js"),
  FileUploader: __webpack_require__(/*! ./FileUploader */ "./FileUploader.js"),
  FilesViewer: __webpack_require__(/*! ./FilesViewer */ "./FilesViewer.js"),
  ImageUploader: __webpack_require__(/*! ./ImageUploader */ "./ImageUploader.js")
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["ReactDOM"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wZGZvYmplY3QvcGRmb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcGRmb2JqZWN0L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9BamF4VXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vRmlsZUxpc3RJdGVtLmpzIiwid2VicGFjazovLy8uL0ZpbGVVcGxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9GaWxlc1ZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9JbWFnZVVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwiUmVhY3RET00iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVhY3QiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwibmFtZSIsImFjdGlvbiIsInR5cGVzIiwiY2hhbmdlU3VibWl0IiwiaGlkZGVucyIsIm11bHRpcGxlIiwiaGludCIsIm1heEZpbGVTaXplIiwic2l6ZSIsImdldEluaXRpYWxTdGF0ZSIsImhvc3QiLCJwcm9wcyIsImxvYWRpbmciLCJmaWxlcyIsInByb2dyZXNzIiwidGltZVN0YW1wIiwiX19vbklucHV0Q2hhbmdlIiwiZXZlbnQiLCJzdGF0ZSIsIl9maWxlcyIsIm5hdGl2ZUV2ZW50IiwidGFyZ2V0IiwiX2ZpbGUiLCJsZW5ndGgiLCJhbGVydCIsImkiLCJfbGVuIiwic3RyaW5naWZ5RmlsZVNpemUiLCJmb3JtIiwicmVzZXQiLCJpbmRleE9mIiwidHlwZSIsInNwbGl0Iiwiam9pbiIsInB1c2giLCJfcmVzdWx0Iiwib25DaGFuZ2UiLCJzdWJtaXQiLCJfX29uSW5wdXRDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm9uVXBsb2FkZXJDbGljayIsIl9fcmVzb2x2ZVVwbG9hZEFjdGlvbiIsIl9ob3N0Iiwiem4iLCJzZXR0aW5nIiwicGF0aCIsIl9hcGkiLCJ1cGxvYWRBcGkiLCJjb25zb2xlIiwiZXJyb3IiLCJkYXRhIiwiX2Zvcm1EYXRhIiwiRm9ybURhdGEiLCJfaGlkZGVucyIsIl9oaWRkZW4iLCJpcyIsImV4dGVuZCIsImFwcGVuZCIsImtleSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhamF4VXBsb2FkIiwic2V0U3RhdGUiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfX2FqYXhVcGxvYWRQcm9ncmVzcyIsIl9fYWpheFVwbG9hZENvbXBsZXRlIiwiX19hamF4VXBsb2FkRXJyb3IiLCJfX2FqYXhVcGxvYWRBYm9ydCIsIm9wZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJoZWFkZXJzIiwiX2tleSIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib25GaW5pc2hlZCIsImJpbmQiLCJzZW5kIiwiZXZ0IiwibGVuZ3RoQ29tcHV0YWJsZSIsIk1hdGgiLCJyb3VuZCIsImxvYWRlZCIsInRvdGFsIiwiZm9yY2VVcGRhdGUiLCJvblVwbG9hZGluZyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiX2RhdGEiLCJwYXJzZSIsImNvZGUiLCJvbkNvbXBsZXRlIiwicmVzdWx0IiwibWVzc2FnZSIsIm9uRXJyb3IiLCJvbkFib3J0IiwiZmluZERPTU5vZGUiLCJfX3JlbmRlclByb2Nlc3MiLCJoZWlnaHQiLCJ0b0ZpeGVkIiwicmVuZGVyIiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJEYXRlIiwibm93IiwiUERGT2JqZWN0IiwiT0ZGSUNFX1RZUEUiLCJmdWxsU2NyZWVuIiwiX19maWxlRG93bmxvYWRSZW5kZXIiLCJmaWxlIiwiZG93bmxvYWRBcGkiLCJkb3dubG9hZFVSTCIsInZhbHVlS2V5IiwiX19yZW5kZXJGaWxlQ29udGVudCIsIl92aWV3IiwiX3NyYyIsIndpZHRoIiwicG9zdGVyIiwiZXh0IiwiX19mdWxsU2NyZWVuIiwiX19yZW5kZXJGdWxsc2NyZWVuIiwic3R5bGUiLCJfX29uUHJldmlldyIsImxhc3RNb2RpZmllZERhdGUiLCJBamF4VXBsb2FkZXIiLCJGaWxlTGlzdEl0ZW0iLCJlZGl0YWJsZSIsImNvbXByZXNzIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJxdWFsaXR5IiwidmFsdWUiLCJjb21wcmVzc2luZyIsImNvbXBvbmVudERpZE1vdW50IiwiX3JldHVybiIsImRpZE1vdW50IiwiaW5pdFZhbHVlIiwiX19vbkNoYW5nZSIsImFqYXhVcGxvYWRlciIsIl9xdWV1ZSIsInF1ZXVlIiwiZXZlcnkiLCJzZW5kZXIiLCJfY29tcHJlc3MiLCJfaW1hZ2VSZWFkZXIiLCJGaWxlUmVhZGVyIiwiX2ltZyIsIkltYWdlIiwib25sb2FkIiwic3JjIiwidGFzayIsInJlYWRBc0RhdGFVUkwiLCJfY2FudmFzIiwiaW1hZ2VUb0NhbnZhcyIsInRvQmxvYiIsImJsb2IiLCJkb25lIiwiRmlsZSIsImdldFRpbWUiLCJzdGFydCIsIm9uVXBsb2FkZXJDaGFuZ2UiLCJfX3Jlc29sdmVGaWxlQXBpIiwiZmV0Y2hzQXBpIiwiZ2V0IiwidGhlbiIsInJlc29sdmVBcnJheVJlc3VsdCIsInNldEZpbGVzIiwiZXJyIiwiX19vbkNvbXBsZXRlIiwidXBsb2FkZXIiLCJfdmFsdWVLZXkiLCJfdmFsdWVzIiwibWFwIiwiY29uY2F0IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsIl9fZWRpdGFibGUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiX19vblJlbW92ZSIsImluZGV4Iiwic3BsaWNlIiwiX19yZW5kZXJGaWxlcyIsIl9lZGl0YWJsZSIsIl90ZW1wIiwib25GaWxlUmVuZGVyIiwidXBsb2FkZXJTdHlsZSIsImltYWdlRGF0YVVSTCIsIm9yaWdpbmFsIiwiX3NlbGYiLCJ0b0RhdGFVUkwiLCJfX3JlbmRlckltYWdlIiwic2V0S2V5IiwiZGVlcEFzc2lnbiIsImdldEtleSIsImZldGNoQXBpIiwiZmV0Y2hJbWFnZUFwaSIsIkZpbGVVcGxvYWRlciIsIkZpbGVzVmlld2VyIiwiSW1hZ2VVcGxvYWRlciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQTBDO0FBQ2xEO0FBQ0EsUUFBUSxpQ0FBTyxFQUFFLG9DQUFFLE9BQU87QUFBQTtBQUFBO0FBQUEsb0dBQUM7QUFDM0IsS0FBSyxNQUFNLEVBUVI7QUFDSCxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FB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LDRCQUprRTtBQUtqRnRGLGFBQVcsRUFBRTtBQUxvRSxDQUFwRCxDQUFqQztBQVFBMUgsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2J1SSxjQUFZLEVBQUUxSSxtQkFBTyxDQUFDLHlDQUFELENBRFI7QUFFYjJJLGNBQVksRUFBRTNJLG1CQUFPLENBQUMseUNBQUQsQ0FGUjtBQUdibU4sY0FBWSxFQUFFbk4sbUJBQU8sQ0FBQyx5Q0FBRCxDQUhSO0FBSWJvTixhQUFXLEVBQUVwTixtQkFBTyxDQUFDLHVDQUFELENBSlA7QUFLYnFOLGVBQWEsRUFBRXJOLG1CQUFPLENBQUMsMkNBQUQ7QUFMVCxDQUFqQixDOzs7Ozs7Ozs7OztBQ1JBLGFBQWEsZ0NBQWdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBL0MsYUFBYSxtQ0FBbUMsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiAgUERGT2JqZWN0IHYyLjIuNVxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9waXB3ZXJrcy9QREZPYmplY3RcbiAqICBAbGljZW5zZVxuICogIENvcHlyaWdodCAoYykgMjAwOC0yMDIxIFBoaWxpcCBIdXRjaGlzb25cbiAqICBNSVQtc3R5bGUgbGljZW5zZTogaHR0cDovL3BpcHdlcmtzLm1pdC1saWNlbnNlLm9yZy9cbiAqICBVTUQgbW9kdWxlIHBhdHRlcm4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3RlbXBsYXRlcy9yZXR1cm5FeHBvcnRzLmpzXG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICAvLyBsaWtlIE5vZGUuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICAgIHJvb3QuUERGT2JqZWN0ID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy9QREZPYmplY3QgaXMgZGVzaWduZWQgZm9yIGNsaWVudC1zaWRlIChicm93c2VycyksIG5vdCBzZXJ2ZXItc2lkZSAobm9kZSlcbiAgICAvL1dpbGwgY2hva2Ugb24gdW5kZWZpbmVkIG5hdmlnYXRvciBhbmQgd2luZG93IHZhcnMgd2hlbiBydW4gb24gc2VydmVyXG4gICAgLy9SZXR1cm4gYm9vbGVhbiBmYWxzZSBhbmQgZXhpdCBmdW5jdGlvbiB3aGVuIHJ1bm5pbmcgc2VydmVyLXNpZGVcblxuICAgIGlmKCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IFxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yID09PSB1bmRlZmluZWQgfHwgXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ID09PSB1bmRlZmluZWQgfHwgXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzID09PSB1bmRlZmluZWQpeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgcGRmb2JqZWN0dmVyc2lvbiA9IFwiMi4yLjNcIjtcbiAgICBsZXQgbmF2ID0gd2luZG93Lm5hdmlnYXRvcjtcbiAgICBsZXQgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIC8vVGltZSB0byBqdW1wIHRocm91Z2ggaG9vcHMgLS0gYnJvd3NlciB2ZW5kb3JzIGRvIG5vdCBtYWtlIGl0IGVhc3kgdG8gZGV0ZWN0IFBERiBzdXBwb3J0LlxuXG4gICAgLypcbiAgICAgICAgSUUxMSBzdGlsbCB1c2VzIEFjdGl2ZVggZm9yIEFkb2JlIFJlYWRlciwgYnV0IElFIDExIGRvZXNuJ3QgZXhwb3NlIHdpbmRvdy5BY3RpdmVYT2JqZWN0IHRoZSBzYW1lIHdheSBcbiAgICAgICAgcHJldmlvdXMgdmVyc2lvbnMgb2YgSUUgZGlkLiB3aW5kb3cuQWN0aXZlWE9iamVjdCB3aWxsIGV2YWx1YXRlIHRvIGZhbHNlIGluIElFIDExLCBidXQgXCJBY3RpdmVYT2JqZWN0XCIgXG4gICAgICAgIGluIHdpbmRvdyBldmFsdWF0ZXMgdG8gdHJ1ZS5cblxuICAgICAgICBNUyBFZGdlIGRvZXMgbm90IHN1cHBvcnQgQWN0aXZlWCBzbyB0aGlzIHRlc3Qgd2lsbCBldmFsdWF0ZSBmYWxzZVxuICAgICovXG4gICAgbGV0IGlzSUUgPSAoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KTtcblxuICAgIC8qXG4gICAgICAgIFRoZXJlIGlzIGEgY29pbmNpZGVudGFsIGNvcnJlbGF0aW9uIGJldHdlZW4gaW1wbGVtZW50YXRpb24gb2Ygd2luZG93LnByb21pc2VzIGFuZCBuYXRpdmUgUERGIHN1cHBvcnQgaW4gZGVza3RvcCBicm93c2Vyc1xuICAgICAgICBXZSB1c2UgdGhpcyB0byBhc3N1bWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcHJvbWlzZXMgaXQgc3VwcG9ydHMgZW1iZWRkZWQgUERGc1xuICAgICAgICBJcyB0aGlzIGZyYWdpbGU/IFNvcnQgb2YuIEJ1dCBicm93c2VyIHZlbmRvcnMgcmVtb3ZlZCBtaW1ldHlwZSBkZXRlY3Rpb24sIHNvIHdlJ3JlIGxlZnQgdG8gaW1wcm92aXNlXG4gICAgKi9cbiAgICBsZXQgaXNNb2Rlcm5Ccm93c2VyID0gKHdpbmRvdy5Qcm9taXNlICE9PSB1bmRlZmluZWQpO1xuXG4gICAgLy9PbGRlciBicm93c2VycyBzdGlsbCBleHBvc2UgdGhlIG1pbWVUeXBlXG4gICAgbGV0IHN1cHBvcnRzUGRmTWltZVR5cGUgPSAobmF2Lm1pbWVUeXBlc1tcImFwcGxpY2F0aW9uL3BkZlwiXSAhPT0gdW5kZWZpbmVkKTtcblxuICAgIC8vU2FmYXJpIG9uIGlQYWRPUyBkb2Vzbid0IHJlcG9ydCBhcyAnbW9iaWxlJyB3aGVuIHJlcXVlc3RpbmcgZGVza3RvcCBzaXRlLCB5ZXQgc3RpbGwgZmFpbHMgdG8gZW1iZWQgUERGc1xuICAgIGxldCBpc1NhZmFyaUlPU0Rlc2t0b3BNb2RlID0gKCAgbmF2LnBsYXRmb3JtICE9PSB1bmRlZmluZWQgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYucGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIiAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5tYXhUb3VjaFBvaW50cyAhPT0gdW5kZWZpbmVkICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm1heFRvdWNoUG9pbnRzID4gMSApO1xuXG4gICAgLy9RdWljayB0ZXN0IGZvciBtb2JpbGUgZGV2aWNlcy5cbiAgICBsZXQgaXNNb2JpbGVEZXZpY2UgPSAoaXNTYWZhcmlJT1NEZXNrdG9wTW9kZSB8fCAvTW9iaXxUYWJsZXR8QW5kcm9pZHxpUGFkfGlQaG9uZS8udGVzdCh1YSkpO1xuXG4gICAgLy9TYWZhcmkgZGVza3RvcCByZXF1aXJlcyBzcGVjaWFsIGhhbmRsaW5nIFxuICAgIGxldCBpc1NhZmFyaURlc2t0b3AgPSAoICFpc01vYmlsZURldmljZSAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYudmVuZG9yICE9PSB1bmRlZmluZWQgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL0FwcGxlLy50ZXN0KG5hdi52ZW5kb3IpICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9TYWZhcmkvLnRlc3QodWEpICk7XG4gICAgXG4gICAgLy9GaXJlZm94IHN0YXJ0ZWQgc2hpcHBpbmcgUERGLmpzIGluIEZpcmVmb3ggMTkuIElmIHRoaXMgaXMgRmlyZWZveCAxOSBvciBncmVhdGVyLCBhc3N1bWUgUERGLmpzIGlzIGF2YWlsYWJsZVxuICAgIGxldCBpc0ZpcmVmb3hXaXRoUERGSlMgPSAoIWlzTW9iaWxlRGV2aWNlICYmIC9pcmVmb3gvLnRlc3QodWEpICYmIHVhLnNwbGl0KFwicnY6XCIpLmxlbmd0aCA+IDEpID8gKHBhcnNlSW50KHVhLnNwbGl0KFwicnY6XCIpWzFdLnNwbGl0KFwiLlwiKVswXSwgMTApID4gMTgpIDogZmFsc2U7XG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICBTdXBwb3J0aW5nIGZ1bmN0aW9uc1xuICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGxldCBjcmVhdGVBWE8gPSBmdW5jdGlvbiAodHlwZSl7XG4gICAgICAgIHZhciBheDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF4ID0gbmV3IEFjdGl2ZVhPYmplY3QodHlwZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF4ID0gbnVsbDsgLy9lbnN1cmUgYXggcmVtYWlucyBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4O1xuICAgIH07XG5cbiAgICAvL0lmIGVpdGhlciBBY3RpdmVYIHN1cHBvcnQgZm9yIFwiQWNyb1BERi5QREZcIiBvciBcIlBERi5QZGZDdHJsXCIgYXJlIGZvdW5kLCByZXR1cm4gdHJ1ZVxuICAgIC8vQ29uc3RydWN0ZWQgYXMgYSBtZXRob2QgKG5vdCBhIHByb3ApIHRvIGF2b2lkIHVubmVjY2VzYXJyeSBvdmVyaGVhZCAtLSB3aWxsIG9ubHkgYmUgZXZhbHVhdGVkIGlmIG5lZWRlZFxuICAgIGxldCBzdXBwb3J0c1BkZkFjdGl2ZVggPSBmdW5jdGlvbiAoKXsgcmV0dXJuICEhKGNyZWF0ZUFYTyhcIkFjcm9QREYuUERGXCIpIHx8IGNyZWF0ZUFYTyhcIlBERi5QZGZDdHJsXCIpKTsgfTtcblxuICAgIC8vRGV0ZXJtaW5lcyB3aGV0aGVyIFBERiBzdXBwb3J0IGlzIGF2YWlsYWJsZVxuICAgIGxldCBzdXBwb3J0c1BERnMgPSAoXG4gICAgICAgIC8vQXMgb2YgU2VwdCAyMDIwIG5vIG1vYmlsZSBicm93c2VycyBwcm9wZXJseSBzdXBwb3J0IFBERiBlbWJlZHNcbiAgICAgICAgIWlzTW9iaWxlRGV2aWNlICYmIChcbiAgICAgICAgICAgIC8vV2UncmUgbW92aW5nIGludG8gdGhlIGFnZSBvZiBNSU1FLWxlc3MgYnJvd3NlcnMuIFRoZXkgbW9zdGx5IGFsbCBzdXBwb3J0IFBERiByZW5kZXJpbmcgd2l0aG91dCBwbHVnaW5zLlxuICAgICAgICAgICAgaXNNb2Rlcm5Ccm93c2VyIHx8XG4gICAgICAgICAgICAvL01vZGVybiB2ZXJzaW9ucyBvZiBGaXJlZm94IGNvbWUgYnVuZGxlZCB3aXRoIFBERkpTXG4gICAgICAgICAgICBpc0ZpcmVmb3hXaXRoUERGSlMgfHxcbiAgICAgICAgICAgIC8vQnJvd3NlcnMgdGhhdCBzdGlsbCBzdXBwb3J0IHRoZSBvcmlnaW5hbCBNSU1FIHR5cGUgY2hlY2tcbiAgICAgICAgICAgIHN1cHBvcnRzUGRmTWltZVR5cGUgfHxcbiAgICAgICAgICAgIC8vUGl0eSB0aGUgcG9vciBzb3VscyBzdGlsbCB1c2luZyBJRVxuICAgICAgICAgICAgKGlzSUUgJiYgc3VwcG9ydHNQZGZBY3RpdmVYKCkpXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgLy9DcmVhdGUgYSBmcmFnbWVudCBpZGVudGlmaWVyIGZvciB1c2luZyBQREYgT3BlbiBwYXJhbWV0ZXJzIHdoZW4gZW1iZWRkaW5nIFBERlxuICAgIGxldCBidWlsZFVSTEZyYWdtZW50U3RyaW5nID0gZnVuY3Rpb24ocGRmUGFyYW1zKXtcblxuICAgICAgICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgICAgICAgbGV0IHByb3A7XG5cbiAgICAgICAgaWYocGRmUGFyYW1zKXtcblxuICAgICAgICAgICAgZm9yIChwcm9wIGluIHBkZlBhcmFtcykge1xuICAgICAgICAgICAgICAgIGlmIChwZGZQYXJhbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGVuY29kZVVSSUNvbXBvbmVudChwcm9wKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBkZlBhcmFtc1twcm9wXSkgKyBcIiZcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGhlIHN0cmluZyB3aWxsIGJlIGVtcHR5IGlmIG5vIFBERiBQYXJhbXMgZm91bmRcbiAgICAgICAgICAgIGlmKHN0cmluZyl7XG5cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBcIiNcIiArIHN0cmluZztcblxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIGxhc3QgYW1wZXJzYW5kXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnNsaWNlKDAsIHN0cmluZy5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuXG4gICAgfTtcblxuICAgIGxldCBlbWJlZEVycm9yID0gZnVuY3Rpb24gKG1zZywgc3VwcHJlc3NDb25zb2xlKXtcbiAgICAgICAgaWYoIXN1cHByZXNzQ29uc29sZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltQREZPYmplY3RdIFwiICsgbXNnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGxldCBlbXB0eU5vZGVDb250ZW50cyA9IGZ1bmN0aW9uIChub2RlKXtcbiAgICAgICAgd2hpbGUobm9kZS5maXJzdENoaWxkKXtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgZ2V0VGFyZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXRTZWxlY3Rvcil7XG5cbiAgICAgICAgLy9EZWZhdWx0IHRvIGJvZHkgZm9yIGZ1bGwtYnJvd3NlciBQREZcbiAgICAgICAgbGV0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIC8vSWYgYSB0YXJnZXRTZWxlY3RvciBpcyBzcGVjaWZpZWQsIGNoZWNrIHRvIHNlZSB3aGV0aGVyXG4gICAgICAgIC8vaXQncyBwYXNzaW5nIGEgc2VsZWN0b3IsIGpRdWVyeSBvYmplY3QsIG9yIGFuIEhUTUwgZWxlbWVudFxuXG4gICAgICAgIGlmKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gXCJzdHJpbmdcIil7XG5cbiAgICAgICAgICAgIC8vSXMgQ1NTIHNlbGVjdG9yXG4gICAgICAgICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRTZWxlY3Rvcik7XG5cbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cualF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0U2VsZWN0b3IgaW5zdGFuY2VvZiBqUXVlcnkgJiYgdGFyZ2V0U2VsZWN0b3IubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIC8vSXMgalF1ZXJ5IGVsZW1lbnQuIEV4dHJhY3QgSFRNTCBub2RlXG4gICAgICAgICAgICB0YXJnZXROb2RlID0gdGFyZ2V0U2VsZWN0b3IuZ2V0KDApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2VsZWN0b3Iubm9kZVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXRTZWxlY3Rvci5ub2RlVHlwZSA9PT0gMSl7XG5cbiAgICAgICAgICAgIC8vSXMgSFRNTCBlbGVtZW50XG4gICAgICAgICAgICB0YXJnZXROb2RlID0gdGFyZ2V0U2VsZWN0b3I7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXROb2RlO1xuXG4gICAgfTtcblxuICAgIGxldCBnZW5lcmF0ZVBERkpTTWFya3VwID0gZnVuY3Rpb24gKHRhcmdldE5vZGUsIHVybCwgcGRmT3BlbkZyYWdtZW50LCBQREZKU19VUkwsIGlkLCBvbWl0SW5saW5lU3R5bGVzKXtcblxuICAgICAgICAvL0Vuc3VyZSB0YXJnZXQgZWxlbWVudCBpcyBlbXB0eSBmaXJzdFxuICAgICAgICBlbXB0eU5vZGVDb250ZW50cyh0YXJnZXROb2RlKTtcblxuICAgICAgICBsZXQgZnVsbFVSTCA9IFBERkpTX1VSTCArIFwiP2ZpbGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArIHBkZk9wZW5GcmFnbWVudDtcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgICAgICBcbiAgICAgICAgaWZyYW1lLnNyYyA9IGZ1bGxVUkw7XG4gICAgICAgIGlmcmFtZS5jbGFzc05hbWUgPSBcInBkZm9iamVjdFwiO1xuICAgICAgICBpZnJhbWUudHlwZSA9IFwiYXBwbGljYXRpb24vcGRmXCI7XG4gICAgICAgIGlmcmFtZS5mcmFtZWJvcmRlciA9IFwiMFwiO1xuICAgICAgICBpZnJhbWUuYWxsb3cgPSBcImZ1bGxzY3JlZW5cIjtcbiAgICAgICAgXG4gICAgICAgIGlmKGlkKXtcbiAgICAgICAgICAgIGlmcmFtZS5pZCA9IGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9taXRJbmxpbmVTdHlsZXMpe1xuICAgICAgICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyByaWdodDogMDsgYm90dG9tOiAwOyBsZWZ0OiAwO1wiO1xuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjogbm9uZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIjtcbiAgICAgICAgICAgIHRhcmdldE5vZGUuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgICAgICB0YXJnZXROb2RlLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB0YXJnZXROb2RlLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LmFkZChcInBkZm9iamVjdC1jb250YWluZXJcIik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGFyZ2V0Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKVswXTtcblxuICAgIH07XG5cbiAgICBsZXQgZ2VuZXJhdGVQREZPYmplY3RNYXJrdXAgPSBmdW5jdGlvbiAoZW1iZWRUeXBlLCB0YXJnZXROb2RlLCB0YXJnZXRTZWxlY3RvciwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIHdpZHRoLCBoZWlnaHQsIGlkLCBvbWl0SW5saW5lU3R5bGVzKXtcblxuICAgICAgICAvL0Vuc3VyZSB0YXJnZXQgZWxlbWVudCBpcyBlbXB0eSBmaXJzdFxuICAgICAgICBlbXB0eU5vZGVDb250ZW50cyh0YXJnZXROb2RlKTtcblxuICAgICAgICBsZXQgZW1iZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVtYmVkVHlwZSk7XG4gICAgICAgIGVtYmVkLnNyYyA9IHVybCArIHBkZk9wZW5GcmFnbWVudDtcbiAgICAgICAgZW1iZWQuY2xhc3NOYW1lID0gXCJwZGZvYmplY3RcIjtcbiAgICAgICAgZW1iZWQudHlwZSA9IFwiYXBwbGljYXRpb24vcGRmXCI7XG5cbiAgICAgICAgaWYoaWQpe1xuICAgICAgICAgICAgZW1iZWQuaWQgPSBpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVtYmVkVHlwZSA9PT0gXCJpZnJhbWVcIil7XG4gICAgICAgICAgICBlbWJlZC5hbGxvdyA9IFwiZnVsbHNjcmVlblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9taXRJbmxpbmVTdHlsZXMpe1xuXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSAoZW1iZWRUeXBlID09PSBcImVtYmVkXCIpID8gXCJvdmVyZmxvdzogYXV0bztcIiA6IFwiYm9yZGVyOiBub25lO1wiO1xuXG4gICAgICAgICAgICBpZih0YXJnZXRTZWxlY3RvciAmJiB0YXJnZXRTZWxlY3RvciAhPT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gXCJ3aWR0aDogXCIgKyB3aWR0aCArIFwiOyBoZWlnaHQ6IFwiICsgaGVpZ2h0ICsgXCI7XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlICs9IFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVtYmVkLnN0eWxlLmNzc1RleHQgPSBzdHlsZTsgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LmFkZChcInBkZm9iamVjdC1jb250YWluZXJcIik7XG4gICAgICAgIHRhcmdldE5vZGUuYXBwZW5kQ2hpbGQoZW1iZWQpO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKGVtYmVkVHlwZSlbMF07XG5cbiAgICB9O1xuXG4gICAgbGV0IGVtYmVkID0gZnVuY3Rpb24odXJsLCB0YXJnZXRTZWxlY3Rvciwgb3B0aW9ucyl7XG5cbiAgICAgICAgLy9JZiB0YXJnZXRTZWxlY3RvciBpcyBub3QgZGVmaW5lZCwgY29udmVydCB0byBib29sZWFuXG4gICAgICAgIGxldCBzZWxlY3RvciA9IHRhcmdldFNlbGVjdG9yIHx8IGZhbHNlO1xuXG4gICAgICAgIC8vRW5zdXJlIG9wdGlvbnMgb2JqZWN0IGlzIG5vdCB1bmRlZmluZWQgLS0gZW5hYmxlcyBlYXNpZXIgZXJyb3IgY2hlY2tpbmcgYmVsb3dcbiAgICAgICAgbGV0IG9wdCA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgLy9HZXQgcGFzc2VkIG9wdGlvbnMsIG9yIHNldCByZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICAgIGxldCBpZCA9ICh0eXBlb2Ygb3B0LmlkID09PSBcInN0cmluZ1wiKSA/IG9wdC5pZCA6IFwiXCI7XG4gICAgICAgIGxldCBwYWdlID0gb3B0LnBhZ2UgfHwgZmFsc2U7XG4gICAgICAgIGxldCBwZGZPcGVuUGFyYW1zID0gb3B0LnBkZk9wZW5QYXJhbXMgfHwge307XG4gICAgICAgIGxldCBmYWxsYmFja0xpbmsgPSBvcHQuZmFsbGJhY2tMaW5rIHx8IHRydWU7XG4gICAgICAgIGxldCB3aWR0aCA9IG9wdC53aWR0aCB8fCBcIjEwMCVcIjtcbiAgICAgICAgbGV0IGhlaWdodCA9IG9wdC5oZWlnaHQgfHwgXCIxMDAlXCI7XG4gICAgICAgIGxldCBhc3N1bXB0aW9uTW9kZSA9ICh0eXBlb2Ygb3B0LmFzc3VtcHRpb25Nb2RlID09PSBcImJvb2xlYW5cIikgPyBvcHQuYXNzdW1wdGlvbk1vZGUgOiB0cnVlO1xuICAgICAgICBsZXQgZm9yY2VQREZKUyA9ICh0eXBlb2Ygb3B0LmZvcmNlUERGSlMgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5mb3JjZVBERkpTIDogZmFsc2U7XG4gICAgICAgIGxldCBzdXBwb3J0UmVkaXJlY3QgPSAodHlwZW9mIG9wdC5zdXBwb3J0UmVkaXJlY3QgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5zdXBwb3J0UmVkaXJlY3QgOiBmYWxzZTtcbiAgICAgICAgbGV0IG9taXRJbmxpbmVTdHlsZXMgPSAodHlwZW9mIG9wdC5vbWl0SW5saW5lU3R5bGVzID09PSBcImJvb2xlYW5cIikgPyBvcHQub21pdElubGluZVN0eWxlcyA6IGZhbHNlO1xuICAgICAgICBsZXQgc3VwcHJlc3NDb25zb2xlID0gKHR5cGVvZiBvcHQuc3VwcHJlc3NDb25zb2xlID09PSBcImJvb2xlYW5cIikgPyBvcHQuc3VwcHJlc3NDb25zb2xlIDogZmFsc2U7XG4gICAgICAgIGxldCBmb3JjZUlmcmFtZSA9ICh0eXBlb2Ygb3B0LmZvcmNlSWZyYW1lID09PSBcImJvb2xlYW5cIikgPyBvcHQuZm9yY2VJZnJhbWUgOiBmYWxzZTtcbiAgICAgICAgbGV0IFBERkpTX1VSTCA9IG9wdC5QREZKU19VUkwgfHwgZmFsc2U7XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gZ2V0VGFyZ2V0RWxlbWVudChzZWxlY3Rvcik7XG4gICAgICAgIGxldCBmYWxsYmFja0hUTUwgPSBcIlwiO1xuICAgICAgICBsZXQgcGRmT3BlbkZyYWdtZW50ID0gXCJcIjtcbiAgICAgICAgbGV0IGZhbGxiYWNrSFRNTF9kZWZhdWx0ID0gXCI8cD5UaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBpbmxpbmUgUERGcy4gUGxlYXNlIGRvd25sb2FkIHRoZSBQREYgdG8gdmlldyBpdDogPGEgaHJlZj0nW3VybF0nPkRvd25sb2FkIFBERjwvYT48L3A+XCI7XG5cbiAgICAgICAgLy9FbnN1cmUgVVJMIGlzIGF2YWlsYWJsZS4gSWYgbm90LCBleGl0IG5vdy5cbiAgICAgICAgaWYodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIil7IHJldHVybiBlbWJlZEVycm9yKFwiVVJMIGlzIG5vdCB2YWxpZFwiLCBzdXBwcmVzc0NvbnNvbGUpOyB9XG5cbiAgICAgICAgLy9JZiB0YXJnZXQgZWxlbWVudCBpcyBzcGVjaWZpZWQgYnV0IGlzIG5vdCB2YWxpZCwgZXhpdCB3aXRob3V0IGRvaW5nIGFueXRoaW5nXG4gICAgICAgIGlmKCF0YXJnZXROb2RlKXsgcmV0dXJuIGVtYmVkRXJyb3IoXCJUYXJnZXQgZWxlbWVudCBjYW5ub3QgYmUgZGV0ZXJtaW5lZFwiLCBzdXBwcmVzc0NvbnNvbGUpOyB9XG5cbiAgICAgICAgLy9wYWdlIG9wdGlvbiBvdmVycmlkZXMgcGRmT3BlblBhcmFtcywgaWYgZm91bmRcbiAgICAgICAgaWYocGFnZSl7IHBkZk9wZW5QYXJhbXMucGFnZSA9IHBhZ2U7IH1cblxuICAgICAgICAvL1N0cmluZ2lmeSBvcHRpb25hbCBBZG9iZSBwYXJhbXMgZm9yIG9wZW5pbmcgZG9jdW1lbnQgKGFzIGZyYWdtZW50IGlkZW50aWZpZXIpXG4gICAgICAgIHBkZk9wZW5GcmFnbWVudCA9IGJ1aWxkVVJMRnJhZ21lbnRTdHJpbmcocGRmT3BlblBhcmFtcyk7XG5cblxuICAgICAgICAvLyAtLT09IERvIHRoZSBkYW5jZTogRW1iZWQgYXR0ZW1wdCAjMSA9PS0tXG5cbiAgICAgICAgLy9JZiB0aGUgZm9yY2VQREZKUyBvcHRpb24gaXMgaW52b2tlZCwgc2tpcCBldmVyeXRoaW5nIGVsc2UgYW5kIGVtYmVkIGFzIGRpcmVjdGVkXG4gICAgICAgIGlmKGZvcmNlUERGSlMgJiYgUERGSlNfVVJMKXtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVBERkpTTWFya3VwKHRhcmdldE5vZGUsIHVybCwgcGRmT3BlbkZyYWdtZW50LCBQREZKU19VUkwsIGlkLCBvbWl0SW5saW5lU3R5bGVzKTtcbiAgICAgICAgfVxuIFxuICAgICAgICAvLyAtLT09IEVtYmVkIGF0dGVtcHQgIzIgPT0tLVxuXG4gICAgICAgIC8vRW1iZWQgUERGIGlmIHRyYWRpdGlvbmFsIHN1cHBvcnQgaXMgcHJvdmlkZWQsIG9yIGlmIHRoaXMgZGV2ZWxvcGVyIGlzIHdpbGxpbmcgdG8gcm9sbCB3aXRoIGFzc3VtcHRpb25cbiAgICAgICAgLy90aGF0IG1vZGVybiBkZXNrdG9wIChub3QgbW9iaWxlKSBicm93c2VycyBuYXRpdmVseSBzdXBwb3J0IFBERnMgXG4gICAgICAgIGlmKHN1cHBvcnRzUERGcyB8fCAoYXNzdW1wdGlvbk1vZGUgJiYgIWlzTW9iaWxlRGV2aWNlKSl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vU2hvdWxkIHdlIHVzZSA8ZW1iZWQ+IG9yIDxpZnJhbWU+PyBJbiBtb3N0IGNhc2VzIDxlbWJlZD4uIFxuICAgICAgICAgICAgLy9BbGxvdyBkZXZlbG9wZXIgdG8gZm9yY2UgPGlmcmFtZT4sIGlmIGRlc2lyZWRcbiAgICAgICAgICAgIC8vVGhlcmUgaXMgYW4gZWRnZSBjYXNlIHdoZXJlIFNhZmFyaSBkb2VzIG5vdCByZXNwZWN0IDMwMiByZWRpcmVjdCByZXF1ZXN0cyBmb3IgUERGIGZpbGVzIHdoZW4gdXNpbmcgPGVtYmVkPiBlbGVtZW50LlxuICAgICAgICAgICAgLy9SZWRpcmVjdCBhcHBlYXJzIHRvIHdvcmsgZmluZSB3aGVuIHVzaW5nIDxpZnJhbWU+IGluc3RlYWQgb2YgPGVtYmVkPiAoQWRkcmVzc2VzIGlzc3VlICMyMTApXG4gICAgICAgICAgICBsZXQgZW1iZWR0eXBlID0gKGZvcmNlSWZyYW1lIHx8IChzdXBwb3J0UmVkaXJlY3QgJiYgaXNTYWZhcmlEZXNrdG9wKSkgPyBcImlmcmFtZVwiIDogXCJlbWJlZFwiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVQREZPYmplY3RNYXJrdXAoZW1iZWR0eXBlLCB0YXJnZXROb2RlLCB0YXJnZXRTZWxlY3RvciwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIHdpZHRoLCBoZWlnaHQsIGlkLCBvbWl0SW5saW5lU3R5bGVzKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAtLT09IEVtYmVkIGF0dGVtcHQgIzMgPT0tLVxuICAgICAgICBcbiAgICAgICAgLy9JZiBldmVyeXRoaW5nIGVsc2UgaGFzIGZhaWxlZCBhbmQgYSBQREZKUyBmYWxsYmFjayBpcyBwcm92aWRlZCwgdHJ5IHRvIHVzZSBpdFxuICAgICAgICBpZihQREZKU19VUkwpe1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUERGSlNNYXJrdXAodGFyZ2V0Tm9kZSwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIFBERkpTX1VSTCwgaWQsIG9taXRJbmxpbmVTdHlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAtLT09IFBERiBlbWJlZCBub3Qgc3VwcG9ydGVkISBVc2UgZmFsbGJhY2sgPT0tLSBcblxuICAgICAgICAvL0Rpc3BsYXkgdGhlIGZhbGxiYWNrIGxpbmsgaWYgYXZhaWxhYmxlXG4gICAgICAgIGlmKGZhbGxiYWNrTGluayl7XG5cbiAgICAgICAgICAgIGZhbGxiYWNrSFRNTCA9ICh0eXBlb2YgZmFsbGJhY2tMaW5rID09PSBcInN0cmluZ1wiKSA/IGZhbGxiYWNrTGluayA6IGZhbGxiYWNrSFRNTF9kZWZhdWx0O1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5pbm5lckhUTUwgPSBmYWxsYmFja0hUTUwucmVwbGFjZSgvXFxbdXJsXFxdL2csIHVybCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbWJlZEVycm9yKFwiVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZW1iZWRkZWQgUERGc1wiLCBzdXBwcmVzc0NvbnNvbGUpO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGVtYmVkOiBmdW5jdGlvbiAoYSxiLGMpeyByZXR1cm4gZW1iZWQoYSxiLGMpOyB9LFxuICAgICAgICBwZGZvYmplY3R2ZXJzaW9uOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gcGRmb2JqZWN0dmVyc2lvbjsgfSkoKSxcbiAgICAgICAgc3VwcG9ydHNQREZzOiAoZnVuY3Rpb24gKCl7IHJldHVybiBzdXBwb3J0c1BERnM7IH0pKClcbiAgICB9O1xuXG59KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIHBkZm9iamVjdCA9IHJlcXVpcmUoXCJwZGZvYmplY3RcIik7XG52YXIgUERGT2JqZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQREZPYmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUERGT2JqZWN0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZW1iZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5wcm9wcywgdXJsID0gX2EudXJsLCBjb250YWluZXJJZCA9IF9hLmNvbnRhaW5lcklkLCBjb250YWluZXJQcm9wcyA9IF9hLmNvbnRhaW5lclByb3BzLCBvcHRpb25zID0gX19yZXN0KF9hLCBbXCJ1cmxcIiwgXCJjb250YWluZXJJZFwiLCBcImNvbnRhaW5lclByb3BzXCJdKTtcbiAgICAgICAgICAgIGlmIChwZGZvYmplY3QpIHtcbiAgICAgICAgICAgICAgICBwZGZvYmplY3QuZW1iZWQodXJsLCBcIiNcIiArIGNvbnRhaW5lcklkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBQREZPYmplY3QucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVtYmVkKCk7XG4gICAgfTtcbiAgICBQREZPYmplY3QucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGRpZmZlcmVudCBwcm9wcy51cmxcbiAgICAgICAgaWYgKHByZXZQcm9wcy51cmwgIT09IHRoaXMucHJvcHMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLmVtYmVkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBERk9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfX2Fzc2lnbih7fSwgdGhpcy5wcm9wcy5jb250YWluZXJQcm9wcywgeyBpZDogdGhpcy5wcm9wcy5jb250YWluZXJJZCB9KSk7XG4gICAgfTtcbiAgICBQREZPYmplY3QuZGVmYXVsdFByb3BzID0ge1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgY29udGFpbmVySWQ6ICdwZGZvYmplY3QnLFxuICAgICAgICBmb3JjZVBERkpTOiBmYWxzZSxcbiAgICAgICAgYXNzdW1wdGlvbk1vZGU6IHRydWUsXG4gICAgfTtcbiAgICByZXR1cm4gUERGT2JqZWN0O1xufShSZWFjdC5QdXJlQ29tcG9uZW50KSk7XG5leHBvcnRzLlBERk9iamVjdCA9IFBERk9iamVjdDtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHpudWkuUmVhY3RET00gfHwgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidBamF4VXBsb2FkZXInLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogJ3pyX2FqYXhfdXBsb2FkZXJfZmlsZScsXG5cdFx0XHRhY3Rpb246ICcvenhuei5jb3JlLmZzL3VwbG9hZC9maWxlcycsXG5cdFx0XHR0eXBlczogW10sXG5cdFx0XHRjaGFuZ2VTdWJtaXQ6IHRydWUsXG5cdFx0XHRoaWRkZW5zOiBudWxsLFxuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cdFx0XHRoaW50OiBmYWxzZSxcblx0XHRcdG1heEZpbGVTaXplOiAyMDAgKiAxMDI0ICogMTAyNCxcblx0XHRcdHNpemU6ICcnXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0LFxuXHRcdFx0bG9hZGluZzogZmFsc2UsXG5cdFx0XHRmaWxlczogW10sXG5cdFx0XHRwcm9ncmVzczogMCxcblx0XHRcdHRpbWVTdGFtcDogMFxuXHRcdH07XG5cdH0sXG5cdF9fb25JbnB1dENoYW5nZTogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRpZih0aGlzLnN0YXRlLmxvYWRpbmcpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLnN0YXRlLmZpbGVzID0gW107XG5cdFx0dmFyIF9maWxlcyA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5maWxlcyxcblx0XHRcdF9maWxlID0gbnVsbDtcblx0XHRpZighX2ZpbGVzLmxlbmd0aCl7XG5cdFx0XHRyZXR1cm4gYWxlcnQoJ+acqumAieaLqeaWh+S7ticpO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfZmlsZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKXtcblx0XHRcdF9maWxlID0gX2ZpbGVzW2ldO1xuXHRcdFx0aWYoX2ZpbGUuc2l6ZSA+IHRoaXMucHJvcHMubWF4RmlsZVNpemUpe1xuXHRcdFx0XHRhbGVydChfZmlsZS5uYW1lICsgXCIg5paH5Lu25aSn5bCP5pivXCIgKyB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKF9maWxlLnNpemUpKyBcIiwg5LiN6IO96LaF6L+HXCIgKyB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKHRoaXMucHJvcHMubWF4RmlsZVNpemUpKTtcblx0XHRcdFx0cmV0dXJuIGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5mb3JtLnJlc2V0KCksIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5wcm9wcy50eXBlcy5sZW5ndGgpIHtcblx0XHRcdFx0aWYodGhpcy5wcm9wcy50eXBlcy5pbmRleE9mKF9maWxlLnR5cGUuc3BsaXQoJy8nKVswXSkgPT0gLTEpe1xuXHRcdFx0XHRcdHJldHVybiBhbGVydCgn5Y+q5pSv5oyBJyArIHRoaXMucHJvcHMudHlwZXMuam9pbignLCcpICsgJ+eahOaWh+S7tuexu+WeiycpLCBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnN0YXRlLmZpbGVzLnB1c2goX2ZpbGUpO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgX3Jlc3VsdCA9IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmZpbGVzLCB0aGlzKTtcblx0XHRpZihfcmVzdWx0IT09ZmFsc2UgJiYgdGhpcy5wcm9wcy5jaGFuZ2VTdWJtaXQpe1xuXHRcdFx0dGhpcy5zdWJtaXQodGhpcy5zdGF0ZS5maWxlcywgX3Jlc3VsdCk7XG5cdFx0fVxuXHR9LFxuXHRfX29uSW5wdXRDbGljazogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRpZih0aGlzLnN0YXRlLmxvYWRpbmcpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayAmJiB0aGlzLnByb3BzLm9uVXBsb2FkZXJDbGljayhldmVudCwgdGhpcyk7XG5cdH0sXG5cdF9fcmVzb2x2ZVVwbG9hZEFjdGlvbjogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9ob3N0ID0gdGhpcy5zdGF0ZS5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIudXBsb2FkSG9zdCcpIHx8ICcnLFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuYWN0aW9uIHx8IHRoaXMucHJvcHMudXBsb2FkQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIudXBsb2FkQXBpJykgfHwgJyc7XG5cdFx0X2FwaSA9IF9ob3N0ICsgX2FwaTtcblx0XHRpZighX2FwaSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bkuIrkvKDmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXG5cdFx0cmV0dXJuIF9hcGk7XG5cdH0sXG5cdHN1Ym1pdDogZnVuY3Rpb24gKGZpbGVzLCBkYXRhKXtcblx0XHR2YXIgX2ZpbGUgPSBmaWxlcyB8fCB0aGlzLnN0YXRlLmZpbGVzLFxuXHRcdFx0X2Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCksXG5cdFx0XHRfaGlkZGVucyA9IHRoaXMucHJvcHMuaGlkZGVucyB8fCB7fSxcblx0XHRcdF9oaWRkZW4gPSBudWxsO1xuXG5cdFx0aWYoem4uaXMoZGF0YSwgJ29iamVjdCcpKXtcblx0XHRcdHpuLmV4dGVuZChfaGlkZGVucywgZGF0YSk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gMCwgX2xlbiA9IF9maWxlLmxlbmd0aDsgaSA8IF9sZW47IGkrKyl7XG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKHRoaXMucHJvcHMubmFtZSArICdfJyArIGksIF9maWxlW2ldKTtcblx0XHR9XG5cblx0XHRmb3IodmFyIGtleSBpbiBfaGlkZGVucyl7XG5cdFx0XHRfaGlkZGVuID0gX2hpZGRlbnNba2V5XTtcblx0XHRcdGlmKHR5cGVvZiBfaGlkZGVuID09ICdvYmplY3QnKXtcblx0XHRcdFx0X2hpZGRlbiA9IEpTT04uc3RyaW5naWZ5KF9oaWRkZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKGtleSwgX2hpZGRlbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5hamF4VXBsb2FkKF9mb3JtRGF0YSk7XG5cdH0sXG5cdGFqYXhVcGxvYWQ6IGZ1bmN0aW9uIChkYXRhKXtcblx0XHR2YXIgX2FwaSA9IHRoaXMuX19yZXNvbHZlVXBsb2FkQWN0aW9uKCk7XG5cdFx0aWYoIV9hcGkpIHJldHVybjtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIChldmVudCk9PnRoaXMuX19hamF4VXBsb2FkUHJvZ3Jlc3MoZXZlbnQsIHhociksIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRDb21wbGV0ZShldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRFcnJvcihldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRBYm9ydChldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5vcGVuKFwiUE9TVFwiLCBfYXBpLCBcInRydWVcIik7XG5cdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0aWYodGhpcy5wcm9wcy5yZXNwb25zZVR5cGUpIHtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuaGVhZGVycykge1xuXHRcdFx0Zm9yKHZhciBfa2V5IGluIHRoaXMucHJvcHMuaGVhZGVycykge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihfa2V5LCB0aGlzLnByb3BzLmhlYWRlcnNbX2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25GaW5pc2hlZCAmJiB0aGlzLnByb3BzLm9uRmluaXNoZWQoeGhyLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0eGhyLnNlbmQoZGF0YSk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZFByb2dyZXNzOiBmdW5jdGlvbiAoZXZ0LCB4aHIpe1xuXHRcdGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuXHRcdFx0ZXZ0LnByb2dyZXNzID0gTWF0aC5yb3VuZChldnQubG9hZGVkICogMTAwIC8gZXZ0LnRvdGFsKTtcblx0XHRcdHRoaXMuc3RhdGUucHJvZ3Jlc3MgPSBldnQucHJvZ3Jlc3M7XG5cdFx0XHR0aGlzLnN0YXRlLnRpbWVTdGFtcCA9IGV2dC50aW1lU3RhbXA7XG5cdFx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25VcGxvYWRpbmcgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGluZyhldnQsIHhociwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZENvbXBsZXRlOiBmdW5jdGlvbiAoZXZ0LCB4aHIpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnN0YXRlLnByb2dyZXNzID0gMDtcblx0XHR0aGlzLnN0YXRlLnRpbWVTdGFtcCA9IDA7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdGlmKHR5cGVvZiBldnQudGFyZ2V0LnJlc3BvbnNlID09ICdzdHJpbmcnICYmIChldnQudGFyZ2V0LnJlc3BvbnNlVHlwZSA9PSAndGV4dCcgfHwgZXZ0LnRhcmdldC5yZXNwb25zZVR5cGUgPT0gJycpKXtcblx0XHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJzwhRE9DVFlQRSBodG1sPicpID09IDApe1xuXHRcdFx0XHRyZXR1cm4gYWxlcnQoZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpLCBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ3snKSA9PSAwIHx8IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ1snKSA9PSAwKXtcblx0XHRcdFx0dmFyIF9kYXRhID0gSlNPTi5wYXJzZShldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdGlmKF9kYXRhLmNvZGUgPT0gMjAwKXtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKF9kYXRhLnJlc3VsdCwgZXZ0LCB4aHIsIHRoaXMpO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0em4uZXJyb3IoX2RhdGEucmVzdWx0fHxfZGF0YS5tZXNzYWdlKTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKF9kYXRhLnJlc3VsdCwgZXZ0LCB4aHIsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRfX2FqYXhVcGxvYWRFcnJvcjogZnVuY3Rpb24gKGV2ZW50LCB4aHIpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKGV2ZW50Lm1lc3NhZ2UsIHhociwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZEFib3J0OiBmdW5jdGlvbiAoZXZlbnQsIHhocil7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHRcdHRoaXMucHJvcHMub25BYm9ydCAmJiB0aGlzLnByb3BzLm9uQWJvcnQoZXZlbnQsIHhociwgdGhpcyk7XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XG5cdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucmVzZXQoKTtcblx0fSxcblx0X19yZW5kZXJQcm9jZXNzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLnByb2dyZXNzKXtcblx0XHRcdGlmKHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT0gMTAwKSB7XG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1wcm9ncmVzc1wiIHN0eWxlPXt7aGVpZ2h0OiAnMTAwJSd9fT5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJjaGVja1wiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWNoZWNrIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNzMuODk4IDQzOS40MDRsLTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtcHJvZ3Jlc3NcIiBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS5wcm9ncmVzcyArICclJ319PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnByb2dyZXNzICsgJyUnfSh7KHRoaXMuc3RhdGUudGltZVN0YW1wLzEwMDApLnRvRml4ZWQoMSl9cylcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBfYXBpID0gdGhpcy5fX3Jlc29sdmVVcGxvYWRBY3Rpb24oKTtcblx0XHRpZighX2FwaSkgcmV0dXJuO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItYWpheC11cGxvYWRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG5cdFx0XHRcdGRhdGEtbG9hZGluZz17dGhpcy5zdGF0ZS5sb2FkaW5nfVxuXHRcdFx0XHRhY3Rpb249e19hcGl9XG5cdFx0XHRcdGVuY1R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcblx0XHRcdFx0bWV0aG9kPVwiUE9TVFwiPlxuXHRcdFx0XHR7dGhpcy5fX3JlbmRlclByb2Nlc3MoKX1cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhamF4LXVwbG9hZC1jb250YWluZXJcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cblx0XHRcdFx0e3RoaXMucHJvcHMuaGludCAmJiA8c3BhbiBjbGFzc05hbWU9XCJzaXplXCI+e3RoaXMucHJvcHMuc2l6ZSArICcgJyArIHpudWkucmVhY3Quc3RyaW5naWZ5RmlsZVNpemUodGhpcy5wcm9wcy5tYXhGaWxlU2l6ZSl9PC9zcGFuPn1cblx0XHRcdFx0PGlucHV0IG11bHRpcGxlPXt0aGlzLnByb3BzLm11bHRpcGxlfSBjbGFzc05hbWU9XCJpbnB1dFwiIHR5cGU9XCJmaWxlXCIgbmFtZT17dGhpcy5wcm9wcy5uYW1lfHwoJ3pyX2FqYXhfdXBsb2FkZXJfZmlsZV8nICsgRGF0ZS5ub3coKSl9IG9uQ2hhbmdlPXt0aGlzLl9fb25JbnB1dENoYW5nZX0gb25DbGljaz17dGhpcy5fX29uSW5wdXRDbGlja30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhamF4LXVwbG9hZC1pY29uXCI+XG5cdFx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwidXBsb2FkXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtdXBsb2FkIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yOTYgMzg0aC04MGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMTkyaC04Ny43Yy0xNy44IDAtMjYuNy0yMS41LTE0LjEtMzQuMUwyNDIuMyA1LjdjNy41LTcuNSAxOS44LTcuNSAyNy4zIDBsMTUyLjIgMTUyLjJjMTIuNiAxMi42IDMuNyAzNC4xLTE0LjEgMzQuMUgzMjB2MTY4YzAgMTMuMy0xMC43IDI0LTI0IDI0em0yMTYtOHYxMTJjMCAxMy4zLTEwLjcgMjQtMjQgMjRIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0VjM3NmMwLTEzLjMgMTAuNy0yNCAyNC0yNGgxMzZ2OGMwIDMwLjkgMjUuMSA1NiA1NiA1Nmg4MGMzMC45IDAgNTYtMjUuMSA1Ni01NnYtOGgxMzZjMTMuMyAwIDI0IDEwLjcgMjQgMjR6bS0xMjQgODhjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHptNjQgMGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwelwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUERGT2JqZWN0ID0gcmVxdWlyZSgncmVhY3QtcGRmb2JqZWN0JykuUERGT2JqZWN0OyBcbnZhciBPRkZJQ0VfVFlQRSA9IFsnLnBkZicsICcuZG9jJywgJy5kb2N4JywgJy54bHMnLCAnLnhsc3gnLCAnLnBwdCcsICcucHB0eCddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZUxpc3RJdGVtJyxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0LFxuXHRcdFx0ZnVsbFNjcmVlbjogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRfX2ZpbGVEb3dubG9hZFJlbmRlcjogZnVuY3Rpb24gKGZpbGUpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmRvd25sb2FkSG9zdCcpLFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZG93bmxvYWRBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoX2FwaSl7XG5cdFx0XHRyZXR1cm4gPHNwYW4gb25DbGljaz17KCk9PnpudWkuZG93bmxvYWRVUkwoX2FwaSArIGZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV0sIGZpbGUubmFtZSl9IGNsYXNzTmFtZT1cImRvd25sb2FkXCI+XG5cdFx0XHRcdDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cImRvd25sb2FkXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtZG93bmxvYWQgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxNiAwaDgwYzEzLjMgMCAyNCAxMC43IDI0IDI0djE2OGg4Ny43YzE3LjggMCAyNi43IDIxLjUgMTQuMSAzNC4xTDI2OS43IDM3OC4zYy03LjUgNy41LTE5LjggNy41LTI3LjMgMEw5MC4xIDIyNi4xYy0xMi42LTEyLjYtMy43LTM0LjEgMTQuMS0zNC4xSDE5MlYyNGMwLTEzLjMgMTAuNy0yNCAyNC0yNHptMjk2IDM3NnYxMTJjMCAxMy4zLTEwLjcgMjQtMjQgMjRIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0VjM3NmMwLTEzLjMgMTAuNy0yNCAyNC0yNGgxNDYuN2w0OSA0OWMyMC4xIDIwLjEgNTIuNSAyMC4xIDcyLjYgMGw0OS00OUg0ODhjMTMuMyAwIDI0IDEwLjcgMjQgMjR6bS0xMjQgODhjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHptNjQgMGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwelwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdDwvc3Bhbj47XG5cdFx0fVxuXHR9LFxuXHRfX3JlbmRlckZpbGVDb250ZW50OiBmdW5jdGlvbiAoZmlsZSl7XG5cdFx0dmFyIF92aWV3ID0gbnVsbCwgX3NyYyA9ICcnO1xuXHRcdGlmKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKCcvenhuei5jb3JlLmZzL2ZldGNoL2ltYWdlLycpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5IHx8ICd0ZW1wTmFtZSddO1xuXHRcdFx0X3ZpZXcgPSA8aW1nIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJ2F1dG8nIH19IGNsYXNzTmFtZT1cInZpZXcgaW1nLXZpZXdcIiBzcmM9e19zcmN9IC8+O1xuXHRcdH1lbHNlIGlmKGZpbGUudHlwZS5pbmRleE9mKCd2aWRlbycpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKCcvenhuei5jb3JlLmZzL2ZldGNoL3ZpZGVvLnBsYXkvJykgKyBmaWxlW3RoaXMucHJvcHMudmFsdWVLZXkgfHwgJ3RlbXBOYW1lJ107XG5cdFx0XHRfdmlldyA9IDx2aWRlb1xuXHRcdFx0XHRjbGFzc05hbWU9XCJ2aWV3IGlkZW8tdmlld1wiXG5cdFx0XHRcdGNvbnRyb2xzXG5cdFx0XHRcdHByZWxvYWQ9XCJhdXRvXCJcblx0XHRcdFx0d2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IFxuXHRcdFx0XHRoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuXHRcdFx0XHRwb3N0ZXI9e3RoaXMucHJvcHMucG9zdGVyfT5cblx0XHRcdFx0PHNvdXJjZSBzcmM9e19zcmN9IHR5cGU9XCJ2aWRlby9tcDRcIiAvPlxuXHRcdFx0XHQ8c291cmNlIHNyYz17X3NyY30gdHlwZT1cInZpZGVvL3dlYm1cIiAvPlxuXHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0aXBzXCI+XG5cdFx0XHRcdFx0VG8gdmlldyB0aGlzIHZpZGVvIHBsZWFzZSBlbmFibGUgSmF2YVNjcmlwdCwgYW5kIGNvbnNpZGVyIHVwZ3JhZGluZyB0byBhIHdlYiBicm93c2VyIHRoYXRcblx0XHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly92aWRlb2pzLmNvbS9odG1sNS12aWRlby1zdXBwb3J0L1wiIHRhcmdldD1cIl9ibGFua1wiPnN1cHBvcnRzIEhUTUw1IHZpZGVvPC9hPlxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L3ZpZGVvPjtcblx0XHR9ZWxzZSBpZihPRkZJQ0VfVFlQRS5pbmRleE9mKGZpbGUuZXh0KSAhPSAtMSl7XG5cdFx0XHRfc3JjID0gKHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCAnJykgKyAoJy96eG56LmNvcmUuZnMvZmV0Y2gvcmVhZEFzUERGLycpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5IHx8ICd0ZW1wTmFtZSddO1xuXHRcdFx0X3ZpZXcgPSA8UERGT2JqZWN0IHVybD17X3NyY30gaGVpZ2h0PVwiMTAwJVwiIC8+O1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtY29udGVudFwiID5cblx0XHRcdFx0e192aWV3fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblx0X19mdWxsU2NyZWVuOiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZ1bGxTY3JlZW46ICF0aGlzLnN0YXRlLmZ1bGxTY3JlZW5cblx0XHR9KTtcblx0fSxcblx0X19yZW5kZXJGdWxsc2NyZWVuOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLmZ1bGxTY3JlZW4pIHtcblx0XHRcdHJldHVybiA8c3ZnIG9uQ2xpY2s9e3RoaXMuX19mdWxsU2NyZWVufSBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwid2luZG93LWNsb3NlXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtd2luZG93LWNsb3NlIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NjQgMzJINDhDMjEuNSAzMiAwIDUzLjUgMCA4MHYzNTJjMCAyNi41IDIxLjUgNDggNDggNDhoNDE2YzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjgwYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4em0tODMuNiAyOTAuNWM0LjggNC44IDQuOCAxMi42IDAgMTcuNGwtNDAuNSA0MC41Yy00LjggNC44LTEyLjYgNC44LTE3LjQgMEwyNTYgMzEzLjNsLTY2LjUgNjcuMWMtNC44IDQuOC0xMi42IDQuOC0xNy40IDBsLTQwLjUtNDAuNWMtNC44LTQuOC00LjgtMTIuNiAwLTE3LjRsNjcuMS02Ni41LTY3LjEtNjYuNWMtNC44LTQuOC00LjgtMTIuNiAwLTE3LjRsNDAuNS00MC41YzQuOC00LjggMTIuNi00LjggMTcuNCAwbDY2LjUgNjcuMSA2Ni41LTY3LjFjNC44LTQuOCAxMi42LTQuOCAxNy40IDBsNDAuNSA0MC41YzQuOCA0LjggNC44IDEyLjYgMCAxNy40TDMxMy4zIDI1Nmw2Ny4xIDY2LjV6XCI+PC9wYXRoPjwvc3ZnPjtcblx0XHR9XG5cblx0XHRyZXR1cm4gPHN2ZyBvbkNsaWNrPXt0aGlzLl9fZnVsbFNjcmVlbn0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInR2XCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtdHYgZmEtdy0yMCBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTU5MiAwSDQ4QTQ4IDQ4IDAgMCAwIDAgNDh2MzIwYTQ4IDQ4IDAgMCAwIDQ4IDQ4aDI0MHYzMkgxMTJhMTYgMTYgMCAwIDAtMTYgMTZ2MzJhMTYgMTYgMCAwIDAgMTYgMTZoNDE2YTE2IDE2IDAgMCAwIDE2LTE2di0zMmExNiAxNiAwIDAgMC0xNi0xNkgzNTJ2LTMyaDI0MGE0OCA0OCAwIDAgMCA0OC00OFY0OGE0OCA0OCAwIDAgMC00OC00OHptLTE2IDM1Mkg2NFY2NGg1MTJ6XCI+PC9wYXRoPjwvc3ZnPjtcblx0fSxcblx0X19maWxlRG93bmxvYWRSZW5kZXI6IGZ1bmN0aW9uIChmaWxlKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmRvd25sb2FkQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZG93bmxvYWRBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKF9hcGkpe1xuXHRcdFx0cmV0dXJuIDxzcGFuIG9uQ2xpY2s9eygpPT56bnVpLmRvd25sb2FkVVJMKF9hcGkgKyBmaWxlW3RoaXMucHJvcHMudmFsdWVLZXldLCBmaWxlLm5hbWUpfSBjbGFzc05hbWU9XCJkb3dubG9hZFwiPlxuXHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJkb3dubG9hZFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWRvd25sb2FkIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMTYgMGg4MGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYxNjhoODcuN2MxNy44IDAgMjYuNyAyMS41IDE0LjEgMzQuMUwyNjkuNyAzNzguM2MtNy41IDcuNS0xOS44IDcuNS0yNy4zIDBMOTAuMSAyMjYuMWMtMTIuNi0xMi42LTMuNy0zNC4xIDE0LjEtMzQuMUgxOTJWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjR6bTI5NiAzNzZ2MTEyYzAgMTMuMy0xMC43IDI0LTI0IDI0SDI0Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYzNzZjMC0xMy4zIDEwLjctMjQgMjQtMjRoMTQ2LjdsNDkgNDljMjAuMSAyMC4xIDUyLjUgMjAuMSA3Mi42IDBsNDktNDlINDg4YzEzLjMgMCAyNCAxMC43IDI0IDI0em0tMTI0IDg4YzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6bTY0IDBjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHQ8L3NwYW4+O1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBmaWxlID0gdGhpcy5wcm9wcy5kYXRhO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1maWxlLWxpc3QtaXRlbVwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwgKHRoaXMuc3RhdGUuZnVsbFNjcmVlbj8nZnVsbC1zY3JlZW4nOicnKSl9IHN0eWxlPXt6bnVpLnJlYWN0LnN0eWxlKHRoaXMucHJvcHMuc3R5bGUpfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmaWxlLWluZm9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tYnRuc1wiPlxuXHRcdFx0XHRcdFx0e3RoaXMuX19yZW5kZXJGdWxsc2NyZWVuKCl9XG5cdFx0XHRcdFx0XHR7dGhpcy5fX2ZpbGVEb3dubG9hZFJlbmRlcihmaWxlKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtZGV0YWlsXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJsaW5rXCIgb25DbGljaz17KCk9PnRoaXMuX19vblByZXZpZXcoZmlsZSl9PntmaWxlLm5hbWV9PC9hPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwidGltZVwiPntmaWxlLmxhc3RNb2RpZmllZERhdGV9PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNpemVcIj57em51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZSgrZmlsZS5zaXplKX08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5mdWxsU2NyZWVuICYmIHRoaXMuX19yZW5kZXJGaWxlQ29udGVudChmaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBamF4VXBsb2FkZXIgPSByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpO1xudmFyIEZpbGVMaXN0SXRlbSA9IHJlcXVpcmUoJy4vRmlsZUxpc3RJdGVtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnRmlsZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBbXSxcblx0XHRcdGZpbGVzOiBbXSxcblx0XHRcdGNvbXByZXNzaW5nOiBmYWxzZVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcywgYWpheFVwbG9hZGVyKXtcblx0XHRpZih0aGlzLnByb3BzLmNvbXByZXNzKSB7XG5cdFx0XHR2YXIgX2ZpbGVzID0gW10sXG5cdFx0XHRcdF9xdWV1ZSA9IHpuLnF1ZXVlKHt9LCB7XG5cdFx0XHRcdFx0ZXZlcnk6IGZ1bmN0aW9uIChzZW5kZXIsIGZpbGUpe1xuXHRcdFx0XHRcdFx0X2ZpbGVzLnB1c2goZmlsZSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5hbGx5OiBmdW5jdGlvbiAoc2VuZGVyKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRjb21wcmVzc2luZzogZmFsc2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YWpheFVwbG9hZGVyLnN1Ym1pdChfZmlsZXMpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0X2NvbXByZXNzID0gem4uZXh0ZW5kKHtcblx0XHRcdFx0XHRtYXhXaWR0aDogMTAyNCxcblx0XHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0XHRxdWFsaXR5OiAxXG5cdFx0XHRcdH0sIHRoaXMucHJvcHMuY29tcHJlc3MpLFxuXHRcdFx0XHRfaW1hZ2VSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpLFxuXHRcdFx0XHRfaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRcdFx0X2ltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wcmVzc2luZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRmb3IodmFyIGZpbGUgb2YgZmlsZXMpe1xuXHRcdFx0XHRpZihmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PT0gMCl7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0X2ltYWdlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdF9pbWcub25sb2FkID0gZnVuY3Rpb24gKCl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9jYW52YXMgPSB6bnVpLmltYWdlVG9DYW52YXMoX2ltZywgX2NvbXByZXNzLm1heFdpZHRoLCBfY29tcHJlc3MubWF4SGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRfY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYil7XG5cdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmRvbmUobmV3IEZpbGUoW2Jsb2JdLCBmaWxlLm5hbWUsIHsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZERhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBmaWxlLnR5cGVcblx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHR9LCBmaWxlLnR5cGUsIF9jb21wcmVzcy5xdWFsaXR5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0dGFzay5kb25lKGZpbGUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0X3F1ZXVlLnN0YXJ0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGVyQ2hhbmdlKGZpbGVzLCBhamF4VXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRfX3Jlc29sdmVGaWxlQXBpOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRIb3N0JykgfHwgJycsXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5mZXRjaHNBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaHNBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKCFfYXBpKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuaWh+S7tuaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cblx0XHRyZXR1cm4gX2FwaTtcblx0fSxcblx0aW5pdFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHZhciBfYXBpID0gdGhpcy5fX3Jlc29sdmVGaWxlQXBpKCk7XG5cdFx0aWYoIXZhbHVlIHx8ICFfYXBpKSByZXR1cm47XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpKXtcblx0XHRcdHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXHRcdH1cblx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdHZhciBfZmlsZXMgPSB6bnVpLnJlYWN0LnJlc29sdmVBcnJheVJlc3VsdChyZXNwb25zZSk7XG5cdFx0XHRpZihfZmlsZXMpe1xuXHRcdFx0XHR0aGlzLnNldEZpbGVzKF9maWxlcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVVcGxvYWRlci5qcyAtIOe9kee7nOivt+axgumUmeivrzogXCIsIHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uIChlcnIpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVVcGxvYWRlci5qcyAtIOe9kee7nOivt+axgumUmeivrzogXCIsIGVycik7XG5cdFx0fSk7XG5cdH0sXG5cdF9fb25Db21wbGV0ZTogZnVuY3Rpb24gKGRhdGEsIHVwbG9hZGVyKXtcblx0XHR0aGlzLnNldEZpbGVzKGRhdGEpO1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlIH0sIHRoaXMpO1xuXHRcdHRoaXMucHJvcHMub25Db21wbGV0ZSAmJiB0aGlzLnByb3BzLm9uQ29tcGxldGUoZGF0YSwgdXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRzZXRGaWxlczogZnVuY3Rpb24gKGZpbGVzKXtcblx0XHR2YXIgX3ZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcblx0XHR2YXIgX3ZhbHVlcyA9IChmaWxlc3x8W10pLm1hcChmdW5jdGlvbiAoZmlsZSl7XG5cdFx0XHRpZihmaWxlICYmIGZpbGVbX3ZhbHVlS2V5XSl7XG5cdFx0XHRcdHJldHVybiBmaWxlW192YWx1ZUtleV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuc3RhdGUudmFsdWUuY29uY2F0KF92YWx1ZXMpO1xuXHRcdHRoaXMuc3RhdGUuZmlsZXMgPSB0aGlzLnN0YXRlLmZpbGVzLmNvbmNhdChmaWxlcyk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRnZXRWYWx1ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG5cdH0sXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSk7XG5cdH0sXG5cdF9fZWRpdGFibGU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiAodGhpcy5wcm9wcy5lZGl0YWJsZSB8fCAhdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5yZWFkb25seSk7XG5cdH0sXG5cdF9fb25SZW1vdmU6IGZ1bmN0aW9uIChmaWxlLCBpbmRleCl7XG5cdFx0dGhpcy5zdGF0ZS5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdHRoaXMuc3RhdGUudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcblx0XHRcdGZpbGU6IGZpbGUsXG5cdFx0XHRpbmRleDogaW5kZXgsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSxcblx0XHRcdGZpbGVzOiB0aGlzLnN0YXRlLmZpbGVzXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cdF9fcmVuZGVyRmlsZXM6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZmlsZXMgJiYgdGhpcy5zdGF0ZS5maWxlcy5sZW5ndGgpe1xuXHRcdFx0dmFyIF9lZGl0YWJsZSA9IHRoaXMuX19lZGl0YWJsZSgpO1xuXHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZmlsZS1saXN0XCI+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmZpbGVzLm1hcChmdW5jdGlvbiAoZmlsZSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0aWYoZmlsZSl7XG5cdFx0XHRcdFx0XHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGZpbGUsIGluZGV4KTtcblx0XHRcdFx0XHRcdFx0aWYoX3RlbXApe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGVtcDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPEZpbGVMaXN0SXRlbSBrZXk9e2ZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV19IGVkaXRhYmxlPXtfZWRpdGFibGV9IGRhdGE9e2ZpbGV9IG9uUmVtb3ZlPXsoKT0+dGhpcy5fX29uUmVtb3ZlKGZpbGUsIGluZGV4KX0gLz47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIF9lZGl0YWJsZSA9IHRoaXMuX19lZGl0YWJsZSgpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1maWxlLXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRfZWRpdGFibGUgJiYgPEFqYXhVcGxvYWRlclxuXHRcdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdFx0XHRzdHlsZT17dGhpcy5wcm9wcy51cGxvYWRlclN0eWxlfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuX19vbkNoYW5nZX1cblx0XHRcdFx0XHRcdG9uQ29tcGxldGU9e3RoaXMuX19vbkNvbXBsZXRlfT5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidXBsb2FkLWNvbnRhaW5lclwiIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZC1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiZmlsZS11cGxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1maWxlLXVwbG9hZCBmYS13LTEyIFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAzODQgNTEyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQgMTM2VjBIMjRDMTAuNyAwIDAgMTAuNyAwIDI0djQ2NGMwIDEzLjMgMTAuNyAyNCAyNCAyNGgzMzZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMTYwSDI0OGMtMTMuMiAwLTI0LTEwLjgtMjQtMjR6bTY1LjE4IDIxNi4wMUgyMjR2ODBjMCA4Ljg0LTcuMTYgMTYtMTYgMTZoLTMyYy04Ljg0IDAtMTYtNy4xNi0xNi0xNnYtODBIOTQuODJjLTE0LjI4IDAtMjEuNDEtMTcuMjktMTEuMjctMjcuMzZsOTYuNDItOTUuN2M2LjY1LTYuNjEgMTcuMzktNi42MSAyNC4wNCAwbDk2LjQyIDk1LjdjMTAuMTUgMTAuMDcgMy4wMyAyNy4zNi0xMS4yNSAyNy4zNnpNMzc3IDEwNUwyNzkuMSA3Yy00LjUtNC41LTEwLjYtNy0xNy03SDI1NnYxMjhoMTI4di02LjFjMC02LjMtMi41LTEyLjQtNy0xNi45elwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5jb21wcmVzc2luZyAmJiA8c3BhbiBjbGFzc05hbWU9XCJjb21wcmVzc2luZ1wiPuWOi+e8qeS4rS4uLjwvc3Bhbj59XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9BamF4VXBsb2FkZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0e3RoaXMuX19yZW5kZXJGaWxlcygpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRmlsZUxpc3RJdGVtID0gcmVxdWlyZSgnLi9GaWxlTGlzdEl0ZW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB6bnVpLnJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0ZpbGVzVmlld2VyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHR3aWR0aDogNDgwLFxuXHRcdFx0aGVpZ2h0OiAzMjBcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBcdHJldHVybiB7XG5cdFx0XHRmaWxlczogW10sXG5cdFx0XHR2YWx1ZTogW11cblx0XHR9O1xuXHQgIH0sXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3JldHVybiA9IHRoaXMucHJvcHMuZGlkTW91bnQgJiYgdGhpcy5wcm9wcy5kaWRNb3VudCh0aGlzKTtcblx0XHRpZihfcmV0dXJuIT09ZmFsc2Upe1xuXHRcdFx0dGhpcy5pbml0VmFsdWUodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0fVxuXHR9LFxuXHRfX3Jlc29sdmVGaWxlQXBpOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRIb3N0JykgfHwgJycsXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5mZXRjaHNBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaHNBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXG5cdFx0aWYoX2FwaSkge1xuXHRcdFx0cmV0dXJuIF9hcGk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXHR9LFxuXHRpbml0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0dmFyIF9hcGkgPSB0aGlzLl9fcmVzb2x2ZUZpbGVBcGkoKTtcblx0XHRpZighX2FwaSB8fCAhdmFsdWUpIHJldHVybjtcblxuXHRcdGlmKHpuLmlzKHZhbHVlLCAnb2JqZWN0JykpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldEZpbGVzKFt2YWx1ZV0pLCBmYWxzZTtcblx0XHR9XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpICYmIHZhbHVlLmxlbmd0aCAmJiB6bi5pcyh2YWx1ZVswXSwgJ29iamVjdCcpKXtcblx0XHRcdHJldHVybiB0aGlzLnNldEZpbGVzKHZhbHVlKSwgZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGlmKHpuLmlzKHZhbHVlLCAnYXJyYXknKSl7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcblx0XHR9XG5cdFx0em4uZGF0YS5nZXQoX2FwaSArIHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHR2YXIgX2ZpbGVzID0gem51aS5yZWFjdC5yZXNvbHZlQXJyYXlSZXN1bHQocmVzcG9uc2UpO1xuXHRcdFx0aWYoX2ZpbGVzKXtcblx0XHRcdFx0dGhpcy5zZXRGaWxlcyhfZmlsZXMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGaWxlc1ZpZXdlci5qcyAtIOe9kee7nOivt+axgumUmeivrzogXCIsIHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uIChlcnIpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVzVmlld2VyLmpzIC0g572R57uc6K+35rGC6ZSZ6K+vOiBcIiwgZXJyKTtcblx0XHR9KTtcblx0fSxcblx0c2V0RmlsZXM6IGZ1bmN0aW9uIChmaWxlcyl7XG5cdFx0dGhpcy5zdGF0ZS5maWxlcyA9IGZpbGVzO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0X19yZW5kZXJGaWxlczogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5zdGF0ZS5maWxlcyl7XG5cdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmaWxlLWxpc3RcIj5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUuZmlsZXMubWFwKGZ1bmN0aW9uIChmaWxlLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRpZihmaWxlKXtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZXR1cm4gPSB0aGlzLnByb3BzLm9uRmlsZVJlbmRlciAmJiB0aGlzLnByb3BzLm9uRmlsZVJlbmRlcihmaWxlLCBpbmRleCwgdGhpcyk7XG5cdFx0XHRcdFx0XHRcdGlmKF9yZXR1cm4pe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxGaWxlTGlzdEl0ZW0gaG9zdD17dGhpcy5wcm9wcy5ob3N0fSBrZXk9e2luZGV4fSBkYXRhPXtmaWxlfSBlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZX0gLz47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0aWYoIXRoaXMuc3RhdGUuZmlsZXMpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ6ci1maWxlLXZpZXdlclwiPlxuXHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW5uZXJcIiAvPlxuXHRcdFx0XHRcdDxzcGFuPuWKoOi9veS4rSAuLi4gPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1maWxlcy12aWV3ZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17em51aS5yZWFjdC5zdHlsZSh0aGlzLnByb3BzLnN0eWxlKX0+XG5cdFx0XHRcdHt0aGlzLl9fcmVuZGVyRmlsZXMoKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFqYXhVcGxvYWRlciA9IHJlcXVpcmUoJy4vQWpheFVwbG9hZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonSW1hZ2VVcGxvYWRlcicsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRjb21wcmVzczoge1xuXHRcdFx0XHRtYXhXaWR0aDogMTAyNCxcblx0XHRcdFx0bWF4SGVpZ2h0OiA3NjgsXG5cdFx0XHRcdHF1YWxpdHk6IDFcblx0XHRcdH1cblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuXHRcdFx0aW1hZ2VEYXRhVVJMOiBudWxsLFxuXHRcdFx0b3JpZ2luYWw6IG51bGwsXG5cdFx0XHRjb21wcmVzczogbnVsbCxcblx0XHRcdGNvbXByZXNzaW5nOiBmYWxzZVxuXHRcdH07XG4gIFx0fSxcblx0X19vbkNoYW5nZTogZnVuY3Rpb24gKGZpbGVzLCBhamF4VXBsb2FkZXIpe1xuXHRcdHZhciBfZmlsZSA9IGZpbGVzWzBdO1xuXHRcdGlmKF9maWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PSAtMSl7XG5cdFx0XHRyZXR1cm4gYWxlcnQoX2ZpbGUubmFtZSArICcg5LiN5piv5Zu+54mH5paH5Lu2JyksIGZhbHNlO1xuXHRcdH1cblx0XHRpZighRmlsZVJlYWRlciB8fCAhSW1hZ2UpIHtcblx0XHRcdHJldHVybiBhbGVydCgn5rWP6KeI5Zmo5LiN5pSv5oyB6aKE6KeI5Yqf6IO9JyksIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMucHJvcHMuY29tcHJlc3MpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wcmVzc2luZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHR2YXIgX3NlbGYgPSB0aGlzLFxuXHRcdFx0XHRfY29tcHJlc3MgPSB6bi5leHRlbmQoe1xuXHRcdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRcdG1heEhlaWdodDogNzY4LFxuXHRcdFx0XHRcdHF1YWxpdHk6IDFcblx0XHRcdFx0fSwgdGhpcy5wcm9wcy5jb21wcmVzcyksXG5cdFx0XHRcdF9pbWFnZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCksXG5cdFx0XHRcdF9pbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdF9pbWFnZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdFx0XHRfaW1nLnNyYyA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdFx0X2ltYWdlUmVhZGVyLnJlYWRBc0RhdGFVUkwoX2ZpbGUpO1xuXHRcdFx0X2ltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKXtcblx0XHRcdFx0X3NlbGYuc3RhdGUub3JpZ2luYWwgPSB7XG5cdFx0XHRcdFx0c2l6ZTogem51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZShfZmlsZS5zaXplKSxcblx0XHRcdFx0XHR3aWR0aDogX2ltZy53aWR0aCxcblx0XHRcdFx0XHRoZWlnaHQ6IF9pbWcuaGVpZ2h0XG5cdFx0XHRcdH07XG5cdFx0XHRcdHZhciBfY2FudmFzID0gem51aS5pbWFnZVRvQ2FudmFzKF9pbWcsIF9jb21wcmVzcy5tYXhXaWR0aCwgX2NvbXByZXNzLm1heEhlaWdodCk7XG5cdFx0XHRcdF9zZWxmLnN0YXRlLmltYWdlRGF0YVVSTCA9IF9jYW52YXMudG9EYXRhVVJMKF9maWxlLnR5cGUsIF9jb21wcmVzcy5xdWFsaXR5KTtcblx0XHRcdFx0X2NhbnZhcy50b0Jsb2IoZnVuY3Rpb24gKGJsb2Ipe1xuXHRcdFx0XHRcdF9zZWxmLnN0YXRlLmNvbXByZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYoYmxvYil7XG5cdFx0XHRcdFx0XHRfc2VsZi5zdGF0ZS5jb21wcmVzcyA9IHtcblx0XHRcdFx0XHRcdFx0c2l6ZTogem51aS5yZWFjdC5zdHJpbmdpZnlGaWxlU2l6ZShibG9iLnNpemUpLFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogX2NhbnZhcy53aWR0aCxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBfY2FudmFzLmhlaWdodFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGFqYXhVcGxvYWRlci5zdWJtaXQoW1xuXHRcdFx0XHRcdFx0XHRuZXcgRmlsZShbYmxvYl0sIF9maWxlLm5hbWUsIHsgXG5cdFx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkRGF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogX2ZpbGUudHlwZVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF9zZWxmLmZvcmNlVXBkYXRlKCk7XG5cdFx0XHRcdH0sIF9maWxlLnR5cGUsIF9jb21wcmVzcy5xdWFsaXR5KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFyIF9pbWFnZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aW1hZ2VEYXRhVVJMOiBldmVudC50YXJnZXQucmVzdWx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdFx0X2ltYWdlUmVhZGVyLnJlYWRBc0RhdGFVUkwoX2ZpbGUpO1xuXHRcdH1cblx0fSxcblx0X19vbkNvbXBsZXRlOiBmdW5jdGlvbiAoZGF0YSwgdXBsb2FkZXIpe1xuXHRcdHZhciBfZmlsZSA9IGRhdGFbMF07XG5cdFx0aWYoX2ZpbGUpe1xuXHRcdFx0dGhpcy5zZXRWYWx1ZShfZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5IHx8ICd0ZW1wTmFtZSddKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNvbXBsZXRlICYmIHRoaXMucHJvcHMub25Db21wbGV0ZShfZmlsZSwgdGhpcyk7XG5cdH0sXG5cdGdldFZhbHVlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcblx0fSxcblx0c2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBmdW5jdGlvbiAoKXtcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB2YWx1ZSB9LCB0aGlzKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9LFxuXHRfX3JlbmRlckltYWdlOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3NyYyA9IHRoaXMuc3RhdGUuaW1hZ2VEYXRhVVJMO1xuXHRcdGlmKCFfc3JjKXtcblx0XHRcdF9zcmMgPSB0aGlzLnN0YXRlLnZhbHVlO1xuXHRcdFx0aWYoX3NyYyAmJiBfc3JjLmluZGV4T2YoJ2h0dHAnKSAhPSAwKXtcblx0XHRcdFx0aWYoX3NyYy5pbmRleE9mKCcvJykgIT0gLTEpe1xuXHRcdFx0XHRcdF9zcmMgPSAodGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8ICcnKSArIF9zcmM7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdF9zcmMgPSAodGhpcy5wcm9wcy5ob3N0IHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuaG9zdCcpIHx8ICcnKSArICh6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmZldGNoSW1hZ2VBcGknKSB8fCAnJykgKyBfc3JjO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmKF9zcmMpe1xuXHRcdFx0cmV0dXJuIDxpbWcgY2xhc3NOYW1lPVwiaW1nXCIgc3JjPXtfc3JjfSAvPjtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImltZy11cGxvYWQtaWNvblwiPlxuXHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJpbWFnZVwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWltYWdlIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NjQgNDQ4SDQ4Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4VjExMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDQxNmMyNi41MSAwIDQ4IDIxLjQ5IDQ4IDQ4djI4OGMwIDI2LjUxLTIxLjQ5IDQ4LTQ4IDQ4ek0xMTIgMTIwYy0zMC45MjggMC01NiAyNS4wNzItNTYgNTZzMjUuMDcyIDU2IDU2IDU2IDU2LTI1LjA3MiA1Ni01Ni0yNS4wNzItNTYtNTYtNTZ6TTY0IDM4NGgzODRWMjcybC04Ny41MTUtODcuNTE1Yy00LjY4Ni00LjY4Ni0xMi4yODQtNC42ODYtMTYuOTcxIDBMMjA4IDMyMGwtNTUuNTE1LTU1LjUxNWMtNC42ODYtNC42ODYtMTIuMjg0LTQuNjg2LTE2Ljk3MSAwTDY0IDMzNnY0OHpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHQ8L2Rpdj47XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFqYXhVcGxvYWRlclxuXHRcdFx0XHR7Li4udGhpcy5wcm9wc31cblx0XHRcdFx0Y2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWltYWdlLXVwbG9hZGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuX19vbkNoYW5nZX1cblx0XHRcdFx0b25Db21wbGV0ZT17dGhpcy5fX29uQ29tcGxldGV9XG5cdFx0XHRcdG11bHRpcGxlPXtmYWxzZX0gPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNvbnRhaW5lclwiIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0XHR7dGhpcy5fX3JlbmRlckltYWdlKCl9XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5jb21wcmVzcyAmJiA8ZGl2IGNsYXNzTmFtZT1cImNvbXByZXNzLWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJvcmlnaW5hbFwiPuWJje+8mnt0aGlzLnN0YXRlLm9yaWdpbmFsLndpZHRofSB4IHt0aGlzLnN0YXRlLm9yaWdpbmFsLmhlaWdodH0gKHt0aGlzLnN0YXRlLm9yaWdpbmFsLnNpemV9KTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbXByZXNzXCI+5ZCO77yae3RoaXMuc3RhdGUuY29tcHJlc3Mud2lkdGh9IHgge3RoaXMuc3RhdGUuY29tcHJlc3MuaGVpZ2h0fSAoe3RoaXMuc3RhdGUuY29tcHJlc3Muc2l6ZX0pPC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5jb21wcmVzc2luZyAmJiA8c3BhbiBjbGFzc05hbWU9XCJjb21wcmVzc2luZ1wiPuWOi+e8qeS4rS4uLjwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9BamF4VXBsb2FkZXI+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ6bi5zZXR0aW5nLnNldEtleSgnenIudXBsb2FkZXInLCB6bi5kZWVwQXNzaWduKHt9LCB6bi5zZXR0aW5nLmdldEtleSgnenIudXBsb2FkZXInKSwge1xuICAgIHVwbG9hZEFwaTogJy96eG56LmNvcmUuZnMvdXBsb2FkL2ZpbGVzJyxcbiAgICBmZXRjaEFwaTogJy96eG56LmNvcmUuZnMvZmV0Y2gvZmlsZS8nLFxuICAgIGZldGNoc0FwaTogJy96eG56LmNvcmUuZnMvZmV0Y2gvZmlsZXMvJyxcbiAgICBmZXRjaEltYWdlQXBpOiAnL3p4bnouY29yZS5mcy9mZXRjaC9pbWFnZS8nLFxuICAgIGRvd25sb2FkQXBpOiAnL3p4bnouY29yZS5mcy9kb3dubG9hZC9maWxlLydcbn0pKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQWpheFVwbG9hZGVyOiByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpLFxuICAgIEZpbGVMaXN0SXRlbTogcmVxdWlyZSgnLi9GaWxlTGlzdEl0ZW0nKSxcbiAgICBGaWxlVXBsb2FkZXI6IHJlcXVpcmUoJy4vRmlsZVVwbG9hZGVyJyksXG4gICAgRmlsZXNWaWV3ZXI6IHJlcXVpcmUoJy4vRmlsZXNWaWV3ZXInKSxcbiAgICBJbWFnZVVwbG9hZGVyOiByZXF1aXJlKCcuL0ltYWdlVXBsb2FkZXInKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RET01cIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==