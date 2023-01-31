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

    if (_api.indexOf('http') != 0 && _api.indexOf('https') != 0) {
      _api = _host + _api;
    }

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
}), _defineProperty(_znui$react$createCla, "__onRemove", function __onRemove() {
  this.props.onRemove && this.props.onRemove(this.props.data);
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
  }, file.lastModifiedDate)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "size"
  }, znui.react.stringifyFileSize(+file.size)), this.props.editable && /*#__PURE__*/React.createElement("svg", {
    onClick: this.__onRemove,
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "trash-alt",
    className: "svg-inline--fa fa-trash-alt fa-w-14 ",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
  })))), this.state.fullScreen && this.__renderFileContent(file));
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
    var _this = this;

    if (this.state.files && this.state.files.length) {
      var _editable = this.__editable();

      return /*#__PURE__*/React.createElement("div", {
        className: "file-list"
      }, this.state.files.map(function (file, index) {
        if (file) {
          var _temp = _this.props.onFileRender && _this.props.onFileRender(file, index);

          if (_temp) {
            return _temp;
          }

          return /*#__PURE__*/React.createElement(FileListItem, {
            key: file[_this.props.valueKey],
            editable: _editable,
            data: file,
            onRemove: function onRemove() {
              return _this.__onRemove(file, index);
            }
          });
        }
      }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wZGZvYmplY3QvcGRmb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QtcGRmb2JqZWN0L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9BamF4VXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vRmlsZUxpc3RJdGVtLmpzIiwid2VicGFjazovLy8uL0ZpbGVVcGxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9GaWxlc1ZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9JbWFnZVVwbG9hZGVyLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwiUmVhY3RET00iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVhY3QiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwibmFtZSIsImFjdGlvbiIsInR5cGVzIiwiY2hhbmdlU3VibWl0IiwiaGlkZGVucyIsIm11bHRpcGxlIiwiaGludCIsIm1heEZpbGVTaXplIiwic2l6ZSIsImdldEluaXRpYWxTdGF0ZSIsImhvc3QiLCJwcm9wcyIsImxvYWRpbmciLCJmaWxlcyIsInByb2dyZXNzIiwidGltZVN0YW1wIiwiX19vbklucHV0Q2hhbmdlIiwiZXZlbnQiLCJzdGF0ZSIsIl9maWxlcyIsIm5hdGl2ZUV2ZW50IiwidGFyZ2V0IiwiX2ZpbGUiLCJsZW5ndGgiLCJhbGVydCIsImkiLCJfbGVuIiwic3RyaW5naWZ5RmlsZVNpemUiLCJmb3JtIiwicmVzZXQiLCJpbmRleE9mIiwidHlwZSIsInNwbGl0Iiwiam9pbiIsInB1c2giLCJfcmVzdWx0Iiwib25DaGFuZ2UiLCJzdWJtaXQiLCJfX29uSW5wdXRDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm9uVXBsb2FkZXJDbGljayIsIl9fcmVzb2x2ZVVwbG9hZEFjdGlvbiIsIl9ob3N0Iiwiem4iLCJzZXR0aW5nIiwicGF0aCIsIl9hcGkiLCJ1cGxvYWRBcGkiLCJjb25zb2xlIiwiZXJyb3IiLCJkYXRhIiwiX2Zvcm1EYXRhIiwiRm9ybURhdGEiLCJfaGlkZGVucyIsIl9oaWRkZW4iLCJpcyIsImV4dGVuZCIsImFwcGVuZCIsImtleSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhamF4VXBsb2FkIiwic2V0U3RhdGUiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfX2FqYXhVcGxvYWRQcm9ncmVzcyIsIl9fYWpheFVwbG9hZENvbXBsZXRlIiwiX19hamF4VXBsb2FkRXJyb3IiLCJfX2FqYXhVcGxvYWRBYm9ydCIsIm9wZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJoZWFkZXJzIiwiX2tleSIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib25GaW5pc2hlZCIsImJpbmQiLCJzZW5kIiwiZXZ0IiwibGVuZ3RoQ29tcHV0YWJsZSIsIk1hdGgiLCJyb3VuZCIsImxvYWRlZCIsInRvdGFsIiwiZm9yY2VVcGRhdGUiLCJvblVwbG9hZGluZyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiX2RhdGEiLCJwYXJzZSIsImNvZGUiLCJvbkNvbXBsZXRlIiwicmVzdWx0IiwibWVzc2FnZSIsIm9uRXJyb3IiLCJvbkFib3J0IiwiZmluZERPTU5vZGUiLCJfX3JlbmRlclByb2Nlc3MiLCJoZWlnaHQiLCJ0b0ZpeGVkIiwicmVuZGVyIiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJEYXRlIiwibm93IiwiUERGT2JqZWN0IiwiT0ZGSUNFX1RZUEUiLCJmdWxsU2NyZWVuIiwiX19maWxlRG93bmxvYWRSZW5kZXIiLCJmaWxlIiwiZG93bmxvYWRBcGkiLCJkb3dubG9hZFVSTCIsInZhbHVlS2V5IiwiX19yZW5kZXJGaWxlQ29udGVudCIsIl92aWV3IiwiX3NyYyIsIndpZHRoIiwicG9zdGVyIiwiZXh0IiwiX19mdWxsU2NyZWVuIiwiX19yZW5kZXJGdWxsc2NyZWVuIiwib25SZW1vdmUiLCJzdHlsZSIsIl9fb25QcmV2aWV3IiwibGFzdE1vZGlmaWVkRGF0ZSIsImVkaXRhYmxlIiwiX19vblJlbW92ZSIsIkFqYXhVcGxvYWRlciIsIkZpbGVMaXN0SXRlbSIsImNvbXByZXNzIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJxdWFsaXR5IiwidmFsdWUiLCJjb21wcmVzc2luZyIsImNvbXBvbmVudERpZE1vdW50IiwiX3JldHVybiIsImRpZE1vdW50IiwiaW5pdFZhbHVlIiwiX19vbkNoYW5nZSIsImFqYXhVcGxvYWRlciIsIl9xdWV1ZSIsInF1ZXVlIiwiZXZlcnkiLCJzZW5kZXIiLCJfY29tcHJlc3MiLCJfaW1hZ2VSZWFkZXIiLCJGaWxlUmVhZGVyIiwiX2ltZyIsIkltYWdlIiwib25sb2FkIiwic3JjIiwidGFzayIsInJlYWRBc0RhdGFVUkwiLCJfY2FudmFzIiwiaW1hZ2VUb0NhbnZhcyIsInRvQmxvYiIsImJsb2IiLCJkb25lIiwiRmlsZSIsImdldFRpbWUiLCJzdGFydCIsIm9uVXBsb2FkZXJDaGFuZ2UiLCJfX3Jlc29sdmVGaWxlQXBpIiwiZmV0Y2hzQXBpIiwiZ2V0IiwidGhlbiIsInJlc29sdmVBcnJheVJlc3VsdCIsInNldEZpbGVzIiwiZXJyIiwiX19vbkNvbXBsZXRlIiwidXBsb2FkZXIiLCJfdmFsdWVLZXkiLCJfdmFsdWVzIiwibWFwIiwiY29uY2F0IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsIl9fZWRpdGFibGUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiaW5kZXgiLCJzcGxpY2UiLCJfX3JlbmRlckZpbGVzIiwiX2VkaXRhYmxlIiwiX3RlbXAiLCJvbkZpbGVSZW5kZXIiLCJ1cGxvYWRlclN0eWxlIiwiaW1hZ2VEYXRhVVJMIiwib3JpZ2luYWwiLCJfc2VsZiIsInRvRGF0YVVSTCIsIl9fcmVuZGVySW1hZ2UiLCJzZXRLZXkiLCJkZWVwQXNzaWduIiwiZ2V0S2V5IiwiZmV0Y2hBcGkiLCJmZXRjaEltYWdlQXBpIiwiRmlsZVVwbG9hZGVyIiwiRmlsZXNWaWV3ZXIiLCJJbWFnZVVwbG9hZGVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBMEM7QUFDbEQ7QUFDQSxRQUFRLGlDQUFPLEVBQUUsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxvR0FBQztBQUMzQixLQUFLLE1BQU0sRUFRUjtBQUNILENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FB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dmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCIvKipcbiAqICBQREZPYmplY3QgdjIuMi41XG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL3BpcHdlcmtzL1BERk9iamVjdFxuICogIEBsaWNlbnNlXG4gKiAgQ29weXJpZ2h0IChjKSAyMDA4LTIwMjEgUGhpbGlwIEh1dGNoaXNvblxuICogIE1JVC1zdHlsZSBsaWNlbnNlOiBodHRwOi8vcGlwd2Vya3MubWl0LWxpY2Vuc2Uub3JnL1xuICogIFVNRCBtb2R1bGUgcGF0dGVybiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvdGVtcGxhdGVzL3JldHVybkV4cG9ydHMuanNcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgICAgcm9vdC5QREZPYmplY3QgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvL1BERk9iamVjdCBpcyBkZXNpZ25lZCBmb3IgY2xpZW50LXNpZGUgKGJyb3dzZXJzKSwgbm90IHNlcnZlci1zaWRlIChub2RlKVxuICAgIC8vV2lsbCBjaG9rZSBvbiB1bmRlZmluZWQgbmF2aWdhdG9yIGFuZCB3aW5kb3cgdmFycyB3aGVuIHJ1biBvbiBzZXJ2ZXJcbiAgICAvL1JldHVybiBib29sZWFuIGZhbHNlIGFuZCBleGl0IGZ1bmN0aW9uIHdoZW4gcnVubmluZyBzZXJ2ZXItc2lkZVxuXG4gICAgaWYoIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IgPT09IHVuZGVmaW5lZCB8fCBcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgPT09IHVuZGVmaW5lZCB8fCBcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMgPT09IHVuZGVmaW5lZCl7IFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBwZGZvYmplY3R2ZXJzaW9uID0gXCIyLjIuM1wiO1xuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yO1xuICAgIGxldCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gICAgLy9UaW1lIHRvIGp1bXAgdGhyb3VnaCBob29wcyAtLSBicm93c2VyIHZlbmRvcnMgZG8gbm90IG1ha2UgaXQgZWFzeSB0byBkZXRlY3QgUERGIHN1cHBvcnQuXG5cbiAgICAvKlxuICAgICAgICBJRTExIHN0aWxsIHVzZXMgQWN0aXZlWCBmb3IgQWRvYmUgUmVhZGVyLCBidXQgSUUgMTEgZG9lc24ndCBleHBvc2Ugd2luZG93LkFjdGl2ZVhPYmplY3QgdGhlIHNhbWUgd2F5IFxuICAgICAgICBwcmV2aW91cyB2ZXJzaW9ucyBvZiBJRSBkaWQuIHdpbmRvdy5BY3RpdmVYT2JqZWN0IHdpbGwgZXZhbHVhdGUgdG8gZmFsc2UgaW4gSUUgMTEsIGJ1dCBcIkFjdGl2ZVhPYmplY3RcIiBcbiAgICAgICAgaW4gd2luZG93IGV2YWx1YXRlcyB0byB0cnVlLlxuXG4gICAgICAgIE1TIEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCBBY3RpdmVYIHNvIHRoaXMgdGVzdCB3aWxsIGV2YWx1YXRlIGZhbHNlXG4gICAgKi9cbiAgICBsZXQgaXNJRSA9IChcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpO1xuXG4gICAgLypcbiAgICAgICAgVGhlcmUgaXMgYSBjb2luY2lkZW50YWwgY29ycmVsYXRpb24gYmV0d2VlbiBpbXBsZW1lbnRhdGlvbiBvZiB3aW5kb3cucHJvbWlzZXMgYW5kIG5hdGl2ZSBQREYgc3VwcG9ydCBpbiBkZXNrdG9wIGJyb3dzZXJzXG4gICAgICAgIFdlIHVzZSB0aGlzIHRvIGFzc3VtZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBwcm9taXNlcyBpdCBzdXBwb3J0cyBlbWJlZGRlZCBQREZzXG4gICAgICAgIElzIHRoaXMgZnJhZ2lsZT8gU29ydCBvZi4gQnV0IGJyb3dzZXIgdmVuZG9ycyByZW1vdmVkIG1pbWV0eXBlIGRldGVjdGlvbiwgc28gd2UncmUgbGVmdCB0byBpbXByb3Zpc2VcbiAgICAqL1xuICAgIGxldCBpc01vZGVybkJyb3dzZXIgPSAod2luZG93LlByb21pc2UgIT09IHVuZGVmaW5lZCk7XG5cbiAgICAvL09sZGVyIGJyb3dzZXJzIHN0aWxsIGV4cG9zZSB0aGUgbWltZVR5cGVcbiAgICBsZXQgc3VwcG9ydHNQZGZNaW1lVHlwZSA9IChuYXYubWltZVR5cGVzW1wiYXBwbGljYXRpb24vcGRmXCJdICE9PSB1bmRlZmluZWQpO1xuXG4gICAgLy9TYWZhcmkgb24gaVBhZE9TIGRvZXNuJ3QgcmVwb3J0IGFzICdtb2JpbGUnIHdoZW4gcmVxdWVzdGluZyBkZXNrdG9wIHNpdGUsIHlldCBzdGlsbCBmYWlscyB0byBlbWJlZCBQREZzXG4gICAgbGV0IGlzU2FmYXJpSU9TRGVza3RvcE1vZGUgPSAoICBuYXYucGxhdGZvcm0gIT09IHVuZGVmaW5lZCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5wbGF0Zm9ybSA9PT0gXCJNYWNJbnRlbFwiICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm1heFRvdWNoUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYubWF4VG91Y2hQb2ludHMgPiAxICk7XG5cbiAgICAvL1F1aWNrIHRlc3QgZm9yIG1vYmlsZSBkZXZpY2VzLlxuICAgIGxldCBpc01vYmlsZURldmljZSA9IChpc1NhZmFyaUlPU0Rlc2t0b3BNb2RlIHx8IC9Nb2JpfFRhYmxldHxBbmRyb2lkfGlQYWR8aVBob25lLy50ZXN0KHVhKSk7XG5cbiAgICAvL1NhZmFyaSBkZXNrdG9wIHJlcXVpcmVzIHNwZWNpYWwgaGFuZGxpbmcgXG4gICAgbGV0IGlzU2FmYXJpRGVza3RvcCA9ICggIWlzTW9iaWxlRGV2aWNlICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdi52ZW5kb3IgIT09IHVuZGVmaW5lZCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvQXBwbGUvLnRlc3QobmF2LnZlbmRvcikgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL1NhZmFyaS8udGVzdCh1YSkgKTtcbiAgICBcbiAgICAvL0ZpcmVmb3ggc3RhcnRlZCBzaGlwcGluZyBQREYuanMgaW4gRmlyZWZveCAxOS4gSWYgdGhpcyBpcyBGaXJlZm94IDE5IG9yIGdyZWF0ZXIsIGFzc3VtZSBQREYuanMgaXMgYXZhaWxhYmxlXG4gICAgbGV0IGlzRmlyZWZveFdpdGhQREZKUyA9ICghaXNNb2JpbGVEZXZpY2UgJiYgL2lyZWZveC8udGVzdCh1YSkgJiYgdWEuc3BsaXQoXCJydjpcIikubGVuZ3RoID4gMSkgPyAocGFyc2VJbnQodWEuc3BsaXQoXCJydjpcIilbMV0uc3BsaXQoXCIuXCIpWzBdLCAxMCkgPiAxOCkgOiBmYWxzZTtcblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgIFN1cHBvcnRpbmcgZnVuY3Rpb25zXG4gICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgbGV0IGNyZWF0ZUFYTyA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICAgICAgdmFyIGF4O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXggPSBuZXcgQWN0aXZlWE9iamVjdCh0eXBlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXggPSBudWxsOyAvL2Vuc3VyZSBheCByZW1haW5zIG51bGxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXg7XG4gICAgfTtcblxuICAgIC8vSWYgZWl0aGVyIEFjdGl2ZVggc3VwcG9ydCBmb3IgXCJBY3JvUERGLlBERlwiIG9yIFwiUERGLlBkZkN0cmxcIiBhcmUgZm91bmQsIHJldHVybiB0cnVlXG4gICAgLy9Db25zdHJ1Y3RlZCBhcyBhIG1ldGhvZCAobm90IGEgcHJvcCkgdG8gYXZvaWQgdW5uZWNjZXNhcnJ5IG92ZXJoZWFkIC0tIHdpbGwgb25seSBiZSBldmFsdWF0ZWQgaWYgbmVlZGVkXG4gICAgbGV0IHN1cHBvcnRzUGRmQWN0aXZlWCA9IGZ1bmN0aW9uICgpeyByZXR1cm4gISEoY3JlYXRlQVhPKFwiQWNyb1BERi5QREZcIikgfHwgY3JlYXRlQVhPKFwiUERGLlBkZkN0cmxcIikpOyB9O1xuXG4gICAgLy9EZXRlcm1pbmVzIHdoZXRoZXIgUERGIHN1cHBvcnQgaXMgYXZhaWxhYmxlXG4gICAgbGV0IHN1cHBvcnRzUERGcyA9IChcbiAgICAgICAgLy9BcyBvZiBTZXB0IDIwMjAgbm8gbW9iaWxlIGJyb3dzZXJzIHByb3Blcmx5IHN1cHBvcnQgUERGIGVtYmVkc1xuICAgICAgICAhaXNNb2JpbGVEZXZpY2UgJiYgKFxuICAgICAgICAgICAgLy9XZSdyZSBtb3ZpbmcgaW50byB0aGUgYWdlIG9mIE1JTUUtbGVzcyBicm93c2Vycy4gVGhleSBtb3N0bHkgYWxsIHN1cHBvcnQgUERGIHJlbmRlcmluZyB3aXRob3V0IHBsdWdpbnMuXG4gICAgICAgICAgICBpc01vZGVybkJyb3dzZXIgfHxcbiAgICAgICAgICAgIC8vTW9kZXJuIHZlcnNpb25zIG9mIEZpcmVmb3ggY29tZSBidW5kbGVkIHdpdGggUERGSlNcbiAgICAgICAgICAgIGlzRmlyZWZveFdpdGhQREZKUyB8fFxuICAgICAgICAgICAgLy9Ccm93c2VycyB0aGF0IHN0aWxsIHN1cHBvcnQgdGhlIG9yaWdpbmFsIE1JTUUgdHlwZSBjaGVja1xuICAgICAgICAgICAgc3VwcG9ydHNQZGZNaW1lVHlwZSB8fFxuICAgICAgICAgICAgLy9QaXR5IHRoZSBwb29yIHNvdWxzIHN0aWxsIHVzaW5nIElFXG4gICAgICAgICAgICAoaXNJRSAmJiBzdXBwb3J0c1BkZkFjdGl2ZVgoKSlcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICAvL0NyZWF0ZSBhIGZyYWdtZW50IGlkZW50aWZpZXIgZm9yIHVzaW5nIFBERiBPcGVuIHBhcmFtZXRlcnMgd2hlbiBlbWJlZGRpbmcgUERGXG4gICAgbGV0IGJ1aWxkVVJMRnJhZ21lbnRTdHJpbmcgPSBmdW5jdGlvbihwZGZQYXJhbXMpe1xuXG4gICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBsZXQgcHJvcDtcblxuICAgICAgICBpZihwZGZQYXJhbXMpe1xuXG4gICAgICAgICAgICBmb3IgKHByb3AgaW4gcGRmUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBkZlBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGRmUGFyYW1zW3Byb3BdKSArIFwiJlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGUgc3RyaW5nIHdpbGwgYmUgZW1wdHkgaWYgbm8gUERGIFBhcmFtcyBmb3VuZFxuICAgICAgICAgICAgaWYoc3RyaW5nKXtcblxuICAgICAgICAgICAgICAgIHN0cmluZyA9IFwiI1wiICsgc3RyaW5nO1xuXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgbGFzdCBhbXBlcnNhbmRcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMCwgc3RyaW5nLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHJpbmc7XG5cbiAgICB9O1xuXG4gICAgbGV0IGVtYmVkRXJyb3IgPSBmdW5jdGlvbiAobXNnLCBzdXBwcmVzc0NvbnNvbGUpe1xuICAgICAgICBpZighc3VwcHJlc3NDb25zb2xlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1BERk9iamVjdF0gXCIgKyBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgbGV0IGVtcHR5Tm9kZUNvbnRlbnRzID0gZnVuY3Rpb24gKG5vZGUpe1xuICAgICAgICB3aGlsZShub2RlLmZpcnN0Q2hpbGQpe1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxldCBnZXRUYXJnZXRFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldFNlbGVjdG9yKXtcblxuICAgICAgICAvL0RlZmF1bHQgdG8gYm9keSBmb3IgZnVsbC1icm93c2VyIFBERlxuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgLy9JZiBhIHRhcmdldFNlbGVjdG9yIGlzIHNwZWNpZmllZCwgY2hlY2sgdG8gc2VlIHdoZXRoZXJcbiAgICAgICAgLy9pdCdzIHBhc3NpbmcgYSBzZWxlY3RvciwgalF1ZXJ5IG9iamVjdCwgb3IgYW4gSFRNTCBlbGVtZW50XG5cbiAgICAgICAgaWYodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSBcInN0cmluZ1wiKXtcblxuICAgICAgICAgICAgLy9JcyBDU1Mgc2VsZWN0b3JcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5qUXVlcnkgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXRTZWxlY3RvciBpbnN0YW5jZW9mIGpRdWVyeSAmJiB0YXJnZXRTZWxlY3Rvci5sZW5ndGgpIHtcblxuICAgICAgICAgICAgLy9JcyBqUXVlcnkgZWxlbWVudC4gRXh0cmFjdCBIVE1MIG5vZGVcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSB0YXJnZXRTZWxlY3Rvci5nZXQoMCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRTZWxlY3Rvci5ub2RlVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRhcmdldFNlbGVjdG9yLm5vZGVUeXBlID09PSAxKXtcblxuICAgICAgICAgICAgLy9JcyBIVE1MIGVsZW1lbnRcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSB0YXJnZXRTZWxlY3RvcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldE5vZGU7XG5cbiAgICB9O1xuXG4gICAgbGV0IGdlbmVyYXRlUERGSlNNYXJrdXAgPSBmdW5jdGlvbiAodGFyZ2V0Tm9kZSwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIFBERkpTX1VSTCwgaWQsIG9taXRJbmxpbmVTdHlsZXMpe1xuXG4gICAgICAgIC8vRW5zdXJlIHRhcmdldCBlbGVtZW50IGlzIGVtcHR5IGZpcnN0XG4gICAgICAgIGVtcHR5Tm9kZUNvbnRlbnRzKHRhcmdldE5vZGUpO1xuXG4gICAgICAgIGxldCBmdWxsVVJMID0gUERGSlNfVVJMICsgXCI/ZmlsZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICsgcGRmT3BlbkZyYWdtZW50O1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGV0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICAgIFxuICAgICAgICBpZnJhbWUuc3JjID0gZnVsbFVSTDtcbiAgICAgICAgaWZyYW1lLmNsYXNzTmFtZSA9IFwicGRmb2JqZWN0XCI7XG4gICAgICAgIGlmcmFtZS50eXBlID0gXCJhcHBsaWNhdGlvbi9wZGZcIjtcbiAgICAgICAgaWZyYW1lLmZyYW1lYm9yZGVyID0gXCIwXCI7XG4gICAgICAgIGlmcmFtZS5hbGxvdyA9IFwiZnVsbHNjcmVlblwiO1xuICAgICAgICBcbiAgICAgICAgaWYoaWQpe1xuICAgICAgICAgICAgaWZyYW1lLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb21pdElubGluZVN0eWxlcyl7XG4gICAgICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IGxlZnQ6IDA7XCI7XG4gICAgICAgICAgICBpZnJhbWUuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOiBub25lOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiO1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgIHRhcmdldE5vZGUuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjsgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIHRhcmdldE5vZGUuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QuYWRkKFwicGRmb2JqZWN0LWNvbnRhaW5lclwiKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0YXJnZXROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaWZyYW1lXCIpWzBdO1xuXG4gICAgfTtcblxuICAgIGxldCBnZW5lcmF0ZVBERk9iamVjdE1hcmt1cCA9IGZ1bmN0aW9uIChlbWJlZFR5cGUsIHRhcmdldE5vZGUsIHRhcmdldFNlbGVjdG9yLCB1cmwsIHBkZk9wZW5GcmFnbWVudCwgd2lkdGgsIGhlaWdodCwgaWQsIG9taXRJbmxpbmVTdHlsZXMpe1xuXG4gICAgICAgIC8vRW5zdXJlIHRhcmdldCBlbGVtZW50IGlzIGVtcHR5IGZpcnN0XG4gICAgICAgIGVtcHR5Tm9kZUNvbnRlbnRzKHRhcmdldE5vZGUpO1xuXG4gICAgICAgIGxldCBlbWJlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZW1iZWRUeXBlKTtcbiAgICAgICAgZW1iZWQuc3JjID0gdXJsICsgcGRmT3BlbkZyYWdtZW50O1xuICAgICAgICBlbWJlZC5jbGFzc05hbWUgPSBcInBkZm9iamVjdFwiO1xuICAgICAgICBlbWJlZC50eXBlID0gXCJhcHBsaWNhdGlvbi9wZGZcIjtcblxuICAgICAgICBpZihpZCl7XG4gICAgICAgICAgICBlbWJlZC5pZCA9IGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZW1iZWRUeXBlID09PSBcImlmcmFtZVwiKXtcbiAgICAgICAgICAgIGVtYmVkLmFsbG93ID0gXCJmdWxsc2NyZWVuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb21pdElubGluZVN0eWxlcyl7XG5cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IChlbWJlZFR5cGUgPT09IFwiZW1iZWRcIikgPyBcIm92ZXJmbG93OiBhdXRvO1wiIDogXCJib3JkZXI6IG5vbmU7XCI7XG5cbiAgICAgICAgICAgIGlmKHRhcmdldFNlbGVjdG9yICYmIHRhcmdldFNlbGVjdG9yICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgICAgICAgICAgICBzdHlsZSArPSBcIndpZHRoOiBcIiArIHdpZHRoICsgXCI7IGhlaWdodDogXCIgKyBoZWlnaHQgKyBcIjtcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gXCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW1iZWQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlOyBcblxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QuYWRkKFwicGRmb2JqZWN0LWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFyZ2V0Tm9kZS5hcHBlbmRDaGlsZChlbWJlZCk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZW1iZWRUeXBlKVswXTtcblxuICAgIH07XG5cbiAgICBsZXQgZW1iZWQgPSBmdW5jdGlvbih1cmwsIHRhcmdldFNlbGVjdG9yLCBvcHRpb25zKXtcblxuICAgICAgICAvL0lmIHRhcmdldFNlbGVjdG9yIGlzIG5vdCBkZWZpbmVkLCBjb252ZXJ0IHRvIGJvb2xlYW5cbiAgICAgICAgbGV0IHNlbGVjdG9yID0gdGFyZ2V0U2VsZWN0b3IgfHwgZmFsc2U7XG5cbiAgICAgICAgLy9FbnN1cmUgb3B0aW9ucyBvYmplY3QgaXMgbm90IHVuZGVmaW5lZCAtLSBlbmFibGVzIGVhc2llciBlcnJvciBjaGVja2luZyBiZWxvd1xuICAgICAgICBsZXQgb3B0ID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICAvL0dldCBwYXNzZWQgb3B0aW9ucywgb3Igc2V0IHJlYXNvbmFibGUgZGVmYXVsdHNcbiAgICAgICAgbGV0IGlkID0gKHR5cGVvZiBvcHQuaWQgPT09IFwic3RyaW5nXCIpID8gb3B0LmlkIDogXCJcIjtcbiAgICAgICAgbGV0IHBhZ2UgPSBvcHQucGFnZSB8fCBmYWxzZTtcbiAgICAgICAgbGV0IHBkZk9wZW5QYXJhbXMgPSBvcHQucGRmT3BlblBhcmFtcyB8fCB7fTtcbiAgICAgICAgbGV0IGZhbGxiYWNrTGluayA9IG9wdC5mYWxsYmFja0xpbmsgfHwgdHJ1ZTtcbiAgICAgICAgbGV0IHdpZHRoID0gb3B0LndpZHRoIHx8IFwiMTAwJVwiO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gb3B0LmhlaWdodCB8fCBcIjEwMCVcIjtcbiAgICAgICAgbGV0IGFzc3VtcHRpb25Nb2RlID0gKHR5cGVvZiBvcHQuYXNzdW1wdGlvbk1vZGUgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5hc3N1bXB0aW9uTW9kZSA6IHRydWU7XG4gICAgICAgIGxldCBmb3JjZVBERkpTID0gKHR5cGVvZiBvcHQuZm9yY2VQREZKUyA9PT0gXCJib29sZWFuXCIpID8gb3B0LmZvcmNlUERGSlMgOiBmYWxzZTtcbiAgICAgICAgbGV0IHN1cHBvcnRSZWRpcmVjdCA9ICh0eXBlb2Ygb3B0LnN1cHBvcnRSZWRpcmVjdCA9PT0gXCJib29sZWFuXCIpID8gb3B0LnN1cHBvcnRSZWRpcmVjdCA6IGZhbHNlO1xuICAgICAgICBsZXQgb21pdElubGluZVN0eWxlcyA9ICh0eXBlb2Ygb3B0Lm9taXRJbmxpbmVTdHlsZXMgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5vbWl0SW5saW5lU3R5bGVzIDogZmFsc2U7XG4gICAgICAgIGxldCBzdXBwcmVzc0NvbnNvbGUgPSAodHlwZW9mIG9wdC5zdXBwcmVzc0NvbnNvbGUgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5zdXBwcmVzc0NvbnNvbGUgOiBmYWxzZTtcbiAgICAgICAgbGV0IGZvcmNlSWZyYW1lID0gKHR5cGVvZiBvcHQuZm9yY2VJZnJhbWUgPT09IFwiYm9vbGVhblwiKSA/IG9wdC5mb3JjZUlmcmFtZSA6IGZhbHNlO1xuICAgICAgICBsZXQgUERGSlNfVVJMID0gb3B0LlBERkpTX1VSTCB8fCBmYWxzZTtcbiAgICAgICAgbGV0IHRhcmdldE5vZGUgPSBnZXRUYXJnZXRFbGVtZW50KHNlbGVjdG9yKTtcbiAgICAgICAgbGV0IGZhbGxiYWNrSFRNTCA9IFwiXCI7XG4gICAgICAgIGxldCBwZGZPcGVuRnJhZ21lbnQgPSBcIlwiO1xuICAgICAgICBsZXQgZmFsbGJhY2tIVE1MX2RlZmF1bHQgPSBcIjxwPlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGlubGluZSBQREZzLiBQbGVhc2UgZG93bmxvYWQgdGhlIFBERiB0byB2aWV3IGl0OiA8YSBocmVmPSdbdXJsXSc+RG93bmxvYWQgUERGPC9hPjwvcD5cIjtcblxuICAgICAgICAvL0Vuc3VyZSBVUkwgaXMgYXZhaWxhYmxlLiBJZiBub3QsIGV4aXQgbm93LlxuICAgICAgICBpZih0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKXsgcmV0dXJuIGVtYmVkRXJyb3IoXCJVUkwgaXMgbm90IHZhbGlkXCIsIHN1cHByZXNzQ29uc29sZSk7IH1cblxuICAgICAgICAvL0lmIHRhcmdldCBlbGVtZW50IGlzIHNwZWNpZmllZCBidXQgaXMgbm90IHZhbGlkLCBleGl0IHdpdGhvdXQgZG9pbmcgYW55dGhpbmdcbiAgICAgICAgaWYoIXRhcmdldE5vZGUpeyByZXR1cm4gZW1iZWRFcnJvcihcIlRhcmdldCBlbGVtZW50IGNhbm5vdCBiZSBkZXRlcm1pbmVkXCIsIHN1cHByZXNzQ29uc29sZSk7IH1cblxuICAgICAgICAvL3BhZ2Ugb3B0aW9uIG92ZXJyaWRlcyBwZGZPcGVuUGFyYW1zLCBpZiBmb3VuZFxuICAgICAgICBpZihwYWdlKXsgcGRmT3BlblBhcmFtcy5wYWdlID0gcGFnZTsgfVxuXG4gICAgICAgIC8vU3RyaW5naWZ5IG9wdGlvbmFsIEFkb2JlIHBhcmFtcyBmb3Igb3BlbmluZyBkb2N1bWVudCAoYXMgZnJhZ21lbnQgaWRlbnRpZmllcilcbiAgICAgICAgcGRmT3BlbkZyYWdtZW50ID0gYnVpbGRVUkxGcmFnbWVudFN0cmluZyhwZGZPcGVuUGFyYW1zKTtcblxuXG4gICAgICAgIC8vIC0tPT0gRG8gdGhlIGRhbmNlOiBFbWJlZCBhdHRlbXB0ICMxID09LS1cblxuICAgICAgICAvL0lmIHRoZSBmb3JjZVBERkpTIG9wdGlvbiBpcyBpbnZva2VkLCBza2lwIGV2ZXJ5dGhpbmcgZWxzZSBhbmQgZW1iZWQgYXMgZGlyZWN0ZWRcbiAgICAgICAgaWYoZm9yY2VQREZKUyAmJiBQREZKU19VUkwpe1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUERGSlNNYXJrdXAodGFyZ2V0Tm9kZSwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIFBERkpTX1VSTCwgaWQsIG9taXRJbmxpbmVTdHlsZXMpO1xuICAgICAgICB9XG4gXG4gICAgICAgIC8vIC0tPT0gRW1iZWQgYXR0ZW1wdCAjMiA9PS0tXG5cbiAgICAgICAgLy9FbWJlZCBQREYgaWYgdHJhZGl0aW9uYWwgc3VwcG9ydCBpcyBwcm92aWRlZCwgb3IgaWYgdGhpcyBkZXZlbG9wZXIgaXMgd2lsbGluZyB0byByb2xsIHdpdGggYXNzdW1wdGlvblxuICAgICAgICAvL3RoYXQgbW9kZXJuIGRlc2t0b3AgKG5vdCBtb2JpbGUpIGJyb3dzZXJzIG5hdGl2ZWx5IHN1cHBvcnQgUERGcyBcbiAgICAgICAgaWYoc3VwcG9ydHNQREZzIHx8IChhc3N1bXB0aW9uTW9kZSAmJiAhaXNNb2JpbGVEZXZpY2UpKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9TaG91bGQgd2UgdXNlIDxlbWJlZD4gb3IgPGlmcmFtZT4/IEluIG1vc3QgY2FzZXMgPGVtYmVkPi4gXG4gICAgICAgICAgICAvL0FsbG93IGRldmVsb3BlciB0byBmb3JjZSA8aWZyYW1lPiwgaWYgZGVzaXJlZFxuICAgICAgICAgICAgLy9UaGVyZSBpcyBhbiBlZGdlIGNhc2Ugd2hlcmUgU2FmYXJpIGRvZXMgbm90IHJlc3BlY3QgMzAyIHJlZGlyZWN0IHJlcXVlc3RzIGZvciBQREYgZmlsZXMgd2hlbiB1c2luZyA8ZW1iZWQ+IGVsZW1lbnQuXG4gICAgICAgICAgICAvL1JlZGlyZWN0IGFwcGVhcnMgdG8gd29yayBmaW5lIHdoZW4gdXNpbmcgPGlmcmFtZT4gaW5zdGVhZCBvZiA8ZW1iZWQ+IChBZGRyZXNzZXMgaXNzdWUgIzIxMClcbiAgICAgICAgICAgIGxldCBlbWJlZHR5cGUgPSAoZm9yY2VJZnJhbWUgfHwgKHN1cHBvcnRSZWRpcmVjdCAmJiBpc1NhZmFyaURlc2t0b3ApKSA/IFwiaWZyYW1lXCIgOiBcImVtYmVkXCI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVBERk9iamVjdE1hcmt1cChlbWJlZHR5cGUsIHRhcmdldE5vZGUsIHRhcmdldFNlbGVjdG9yLCB1cmwsIHBkZk9wZW5GcmFnbWVudCwgd2lkdGgsIGhlaWdodCwgaWQsIG9taXRJbmxpbmVTdHlsZXMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tPT0gRW1iZWQgYXR0ZW1wdCAjMyA9PS0tXG4gICAgICAgIFxuICAgICAgICAvL0lmIGV2ZXJ5dGhpbmcgZWxzZSBoYXMgZmFpbGVkIGFuZCBhIFBERkpTIGZhbGxiYWNrIGlzIHByb3ZpZGVkLCB0cnkgdG8gdXNlIGl0XG4gICAgICAgIGlmKFBERkpTX1VSTCl7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVQREZKU01hcmt1cCh0YXJnZXROb2RlLCB1cmwsIHBkZk9wZW5GcmFnbWVudCwgUERGSlNfVVJMLCBpZCwgb21pdElubGluZVN0eWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tPT0gUERGIGVtYmVkIG5vdCBzdXBwb3J0ZWQhIFVzZSBmYWxsYmFjayA9PS0tIFxuXG4gICAgICAgIC8vRGlzcGxheSB0aGUgZmFsbGJhY2sgbGluayBpZiBhdmFpbGFibGVcbiAgICAgICAgaWYoZmFsbGJhY2tMaW5rKXtcblxuICAgICAgICAgICAgZmFsbGJhY2tIVE1MID0gKHR5cGVvZiBmYWxsYmFja0xpbmsgPT09IFwic3RyaW5nXCIpID8gZmFsbGJhY2tMaW5rIDogZmFsbGJhY2tIVE1MX2RlZmF1bHQ7XG4gICAgICAgICAgICB0YXJnZXROb2RlLmlubmVySFRNTCA9IGZhbGxiYWNrSFRNTC5yZXBsYWNlKC9cXFt1cmxcXF0vZywgdXJsKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVtYmVkRXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBlbWJlZGRlZCBQREZzXCIsIHN1cHByZXNzQ29uc29sZSk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW1iZWQ6IGZ1bmN0aW9uIChhLGIsYyl7IHJldHVybiBlbWJlZChhLGIsYyk7IH0sXG4gICAgICAgIHBkZm9iamVjdHZlcnNpb246IChmdW5jdGlvbiAoKSB7IHJldHVybiBwZGZvYmplY3R2ZXJzaW9uOyB9KSgpLFxuICAgICAgICBzdXBwb3J0c1BERnM6IChmdW5jdGlvbiAoKXsgcmV0dXJuIHN1cHBvcnRzUERGczsgfSkoKVxuICAgIH07XG5cbn0pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgcGRmb2JqZWN0ID0gcmVxdWlyZShcInBkZm9iamVjdFwiKTtcbnZhciBQREZPYmplY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBERk9iamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQREZPYmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5lbWJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IF90aGlzLnByb3BzLCB1cmwgPSBfYS51cmwsIGNvbnRhaW5lcklkID0gX2EuY29udGFpbmVySWQsIGNvbnRhaW5lclByb3BzID0gX2EuY29udGFpbmVyUHJvcHMsIG9wdGlvbnMgPSBfX3Jlc3QoX2EsIFtcInVybFwiLCBcImNvbnRhaW5lcklkXCIsIFwiY29udGFpbmVyUHJvcHNcIl0pO1xuICAgICAgICAgICAgaWYgKHBkZm9iamVjdCkge1xuICAgICAgICAgICAgICAgIHBkZm9iamVjdC5lbWJlZCh1cmwsIFwiI1wiICsgY29udGFpbmVySWQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFBERk9iamVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW1iZWQoKTtcbiAgICB9O1xuICAgIFBERk9iamVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKHByZXZQcm9wcykge1xuICAgICAgICAvLyBjaGVjayBmb3IgZGlmZmVyZW50IHByb3BzLnVybFxuICAgICAgICBpZiAocHJldlByb3BzLnVybCAhPT0gdGhpcy5wcm9wcy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMuZW1iZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUERGT2JqZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9fYXNzaWduKHt9LCB0aGlzLnByb3BzLmNvbnRhaW5lclByb3BzLCB7IGlkOiB0aGlzLnByb3BzLmNvbnRhaW5lcklkIH0pKTtcbiAgICB9O1xuICAgIFBERk9iamVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICBjb250YWluZXJJZDogJ3BkZm9iamVjdCcsXG4gICAgICAgIGZvcmNlUERGSlM6IGZhbHNlLFxuICAgICAgICBhc3N1bXB0aW9uTW9kZTogdHJ1ZSxcbiAgICB9O1xuICAgIHJldHVybiBQREZPYmplY3Q7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpKTtcbmV4cG9ydHMuUERGT2JqZWN0ID0gUERGT2JqZWN0O1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gem51aS5SZWFjdERPTSB8fCByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB6bnVpLnJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0FqYXhVcGxvYWRlcicsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuYW1lOiAnenJfYWpheF91cGxvYWRlcl9maWxlJyxcblx0XHRcdGFjdGlvbjogJy96eG56LmNvcmUuZnMvdXBsb2FkL2ZpbGVzJyxcblx0XHRcdHR5cGVzOiBbXSxcblx0XHRcdGNoYW5nZVN1Ym1pdDogdHJ1ZSxcblx0XHRcdGhpZGRlbnM6IG51bGwsXG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblx0XHRcdGhpbnQ6IGZhbHNlLFxuXHRcdFx0bWF4RmlsZVNpemU6IDIwMCAqIDEwMjQgKiAxMDI0LFxuXHRcdFx0c2l6ZTogJydcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRob3N0OiB0aGlzLnByb3BzLmhvc3QsXG5cdFx0XHRsb2FkaW5nOiBmYWxzZSxcblx0XHRcdGZpbGVzOiBbXSxcblx0XHRcdHByb2dyZXNzOiAwLFxuXHRcdFx0dGltZVN0YW1wOiAwXG5cdFx0fTtcblx0fSxcblx0X19vbklucHV0Q2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdGlmKHRoaXMuc3RhdGUubG9hZGluZyl7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMuc3RhdGUuZmlsZXMgPSBbXTtcblx0XHR2YXIgX2ZpbGVzID0gZXZlbnQubmF0aXZlRXZlbnQudGFyZ2V0LmZpbGVzLFxuXHRcdFx0X2ZpbGUgPSBudWxsO1xuXHRcdGlmKCFfZmlsZXMubGVuZ3RoKXtcblx0XHRcdHJldHVybiBhbGVydCgn5pyq6YCJ5oup5paH5Lu2Jyk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gMCwgX2xlbiA9IF9maWxlcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspe1xuXHRcdFx0X2ZpbGUgPSBfZmlsZXNbaV07XG5cdFx0XHRpZihfZmlsZS5zaXplID4gdGhpcy5wcm9wcy5tYXhGaWxlU2l6ZSl7XG5cdFx0XHRcdGFsZXJ0KF9maWxlLm5hbWUgKyBcIiDmlofku7blpKflsI/mmK9cIiArIHpudWkucmVhY3Quc3RyaW5naWZ5RmlsZVNpemUoX2ZpbGUuc2l6ZSkrIFwiLCDkuI3og73otoXov4dcIiArIHpudWkucmVhY3Quc3RyaW5naWZ5RmlsZVNpemUodGhpcy5wcm9wcy5tYXhGaWxlU2l6ZSkpO1xuXHRcdFx0XHRyZXR1cm4gZXZlbnQubmF0aXZlRXZlbnQudGFyZ2V0LmZvcm0ucmVzZXQoKSwgZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLnByb3BzLnR5cGVzLmxlbmd0aCkge1xuXHRcdFx0XHRpZih0aGlzLnByb3BzLnR5cGVzLmluZGV4T2YoX2ZpbGUudHlwZS5zcGxpdCgnLycpWzBdKSA9PSAtMSl7XG5cdFx0XHRcdFx0cmV0dXJuIGFsZXJ0KCflj6rmlK/mjIEnICsgdGhpcy5wcm9wcy50eXBlcy5qb2luKCcsJykgKyAn55qE5paH5Lu257G75Z6LJyksIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc3RhdGUuZmlsZXMucHVzaChfZmlsZSk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBfcmVzdWx0ID0gdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUuZmlsZXMsIHRoaXMpO1xuXHRcdGlmKF9yZXN1bHQhPT1mYWxzZSAmJiB0aGlzLnByb3BzLmNoYW5nZVN1Ym1pdCl7XG5cdFx0XHR0aGlzLnN1Ym1pdCh0aGlzLnN0YXRlLmZpbGVzLCBfcmVzdWx0KTtcblx0XHR9XG5cdH0sXG5cdF9fb25JbnB1dENsaWNrOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdGlmKHRoaXMuc3RhdGUubG9hZGluZyl7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25VcGxvYWRlckNsaWNrICYmIHRoaXMucHJvcHMub25VcGxvYWRlckNsaWNrKGV2ZW50LCB0aGlzKTtcblx0fSxcblx0X19yZXNvbHZlVXBsb2FkQWN0aW9uOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRIb3N0JykgfHwgJycsXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5hY3Rpb24gfHwgdGhpcy5wcm9wcy51cGxvYWRBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRBcGknKSB8fCAnJztcblx0XHRpZihfYXBpLmluZGV4T2YoJ2h0dHAnKSAhPSAwICYmIF9hcGkuaW5kZXhPZignaHR0cHMnKSAhPSAwKSB7XG5cdFx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdH1cblx0XHRpZighX2FwaSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmlofku7bkuIrkvKDmjqXlj6PmnKrovpPlhaVcIiksIGZhbHNlO1xuXG5cdFx0cmV0dXJuIF9hcGk7XG5cdH0sXG5cdHN1Ym1pdDogZnVuY3Rpb24gKGZpbGVzLCBkYXRhKXtcblx0XHR2YXIgX2ZpbGUgPSBmaWxlcyB8fCB0aGlzLnN0YXRlLmZpbGVzLFxuXHRcdFx0X2Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCksXG5cdFx0XHRfaGlkZGVucyA9IHRoaXMucHJvcHMuaGlkZGVucyB8fCB7fSxcblx0XHRcdF9oaWRkZW4gPSBudWxsO1xuXG5cdFx0aWYoem4uaXMoZGF0YSwgJ29iamVjdCcpKXtcblx0XHRcdHpuLmV4dGVuZChfaGlkZGVucywgZGF0YSk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gMCwgX2xlbiA9IF9maWxlLmxlbmd0aDsgaSA8IF9sZW47IGkrKyl7XG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKHRoaXMucHJvcHMubmFtZSArICdfJyArIGksIF9maWxlW2ldKTtcblx0XHR9XG5cblx0XHRmb3IodmFyIGtleSBpbiBfaGlkZGVucyl7XG5cdFx0XHRfaGlkZGVuID0gX2hpZGRlbnNba2V5XTtcblx0XHRcdGlmKHR5cGVvZiBfaGlkZGVuID09ICdvYmplY3QnKXtcblx0XHRcdFx0X2hpZGRlbiA9IEpTT04uc3RyaW5naWZ5KF9oaWRkZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHRfZm9ybURhdGEuYXBwZW5kKGtleSwgX2hpZGRlbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5hamF4VXBsb2FkKF9mb3JtRGF0YSk7XG5cdH0sXG5cdGFqYXhVcGxvYWQ6IGZ1bmN0aW9uIChkYXRhKXtcblx0XHR2YXIgX2FwaSA9IHRoaXMuX19yZXNvbHZlVXBsb2FkQWN0aW9uKCk7XG5cdFx0aWYoIV9hcGkpIHJldHVybjtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIChldmVudCk9PnRoaXMuX19hamF4VXBsb2FkUHJvZ3Jlc3MoZXZlbnQsIHhociksIGZhbHNlKTtcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRDb21wbGV0ZShldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRFcnJvcihldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKGV2ZW50KT0+dGhpcy5fX2FqYXhVcGxvYWRBYm9ydChldmVudCwgeGhyKSwgZmFsc2UpO1xuXHRcdHhoci5vcGVuKFwiUE9TVFwiLCBfYXBpLCBcInRydWVcIik7XG5cdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0aWYodGhpcy5wcm9wcy5yZXNwb25zZVR5cGUpIHtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuaGVhZGVycykge1xuXHRcdFx0Zm9yKHZhciBfa2V5IGluIHRoaXMucHJvcHMuaGVhZGVycykge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihfa2V5LCB0aGlzLnByb3BzLmhlYWRlcnNbX2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25GaW5pc2hlZCAmJiB0aGlzLnByb3BzLm9uRmluaXNoZWQoeGhyLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0eGhyLnNlbmQoZGF0YSk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZFByb2dyZXNzOiBmdW5jdGlvbiAoZXZ0LCB4aHIpe1xuXHRcdGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuXHRcdFx0ZXZ0LnByb2dyZXNzID0gTWF0aC5yb3VuZChldnQubG9hZGVkICogMTAwIC8gZXZ0LnRvdGFsKTtcblx0XHRcdHRoaXMuc3RhdGUucHJvZ3Jlc3MgPSBldnQucHJvZ3Jlc3M7XG5cdFx0XHR0aGlzLnN0YXRlLnRpbWVTdGFtcCA9IGV2dC50aW1lU3RhbXA7XG5cdFx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25VcGxvYWRpbmcgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGluZyhldnQsIHhociwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZENvbXBsZXRlOiBmdW5jdGlvbiAoZXZ0LCB4aHIpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnN0YXRlLnByb2dyZXNzID0gMDtcblx0XHR0aGlzLnN0YXRlLnRpbWVTdGFtcCA9IDA7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdGlmKHR5cGVvZiBldnQudGFyZ2V0LnJlc3BvbnNlID09ICdzdHJpbmcnICYmIChldnQudGFyZ2V0LnJlc3BvbnNlVHlwZSA9PSAndGV4dCcgfHwgZXZ0LnRhcmdldC5yZXNwb25zZVR5cGUgPT0gJycpKXtcblx0XHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJzwhRE9DVFlQRSBodG1sPicpID09IDApe1xuXHRcdFx0XHRyZXR1cm4gYWxlcnQoZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpLCBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ3snKSA9PSAwIHx8IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ1snKSA9PSAwKXtcblx0XHRcdFx0dmFyIF9kYXRhID0gSlNPTi5wYXJzZShldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdGlmKF9kYXRhLmNvZGUgPT0gMjAwKXtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKF9kYXRhLnJlc3VsdCwgZXZ0LCB4aHIsIHRoaXMpO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0em4uZXJyb3IoX2RhdGEucmVzdWx0fHxfZGF0YS5tZXNzYWdlKTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKF9kYXRhLnJlc3VsdCwgZXZ0LCB4aHIsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRfX2FqYXhVcGxvYWRFcnJvcjogZnVuY3Rpb24gKGV2ZW50LCB4aHIpe1xuXHRcdHRoaXMucmVzZXQoKTtcblx0XHR0aGlzLnByb3BzLm9uRXJyb3IgJiYgdGhpcy5wcm9wcy5vbkVycm9yKGV2ZW50Lm1lc3NhZ2UsIHhociwgdGhpcyk7XG5cdH0sXG5cdF9fYWpheFVwbG9hZEFib3J0OiBmdW5jdGlvbiAoZXZlbnQsIHhocil7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHRcdHRoaXMucHJvcHMub25BYm9ydCAmJiB0aGlzLnByb3BzLm9uQWJvcnQoZXZlbnQsIHhociwgdGhpcyk7XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UgfSk7XG5cdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucmVzZXQoKTtcblx0fSxcblx0X19yZW5kZXJQcm9jZXNzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLnByb2dyZXNzKXtcblx0XHRcdGlmKHRoaXMuc3RhdGUucHJvZ3Jlc3MgPT0gMTAwKSB7XG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInVwbG9hZC1wcm9ncmVzc1wiIHN0eWxlPXt7aGVpZ2h0OiAnMTAwJSd9fT5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJjaGVja1wiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWNoZWNrIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNzMuODk4IDQzOS40MDRsLTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtcHJvZ3Jlc3NcIiBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS5wcm9ncmVzcyArICclJ319PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnByb2dyZXNzICsgJyUnfSh7KHRoaXMuc3RhdGUudGltZVN0YW1wLzEwMDApLnRvRml4ZWQoMSl9cylcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHZhciBfYXBpID0gdGhpcy5fX3Jlc29sdmVVcGxvYWRBY3Rpb24oKTtcblx0XHRpZighX2FwaSkgcmV0dXJuO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItYWpheC11cGxvYWRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG5cdFx0XHRcdGRhdGEtbG9hZGluZz17dGhpcy5zdGF0ZS5sb2FkaW5nfVxuXHRcdFx0XHRhY3Rpb249e19hcGl9XG5cdFx0XHRcdGVuY1R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcblx0XHRcdFx0bWV0aG9kPVwiUE9TVFwiPlxuXHRcdFx0XHR7dGhpcy5fX3JlbmRlclByb2Nlc3MoKX1cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhamF4LXVwbG9hZC1jb250YWluZXJcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cblx0XHRcdFx0e3RoaXMucHJvcHMuaGludCAmJiA8c3BhbiBjbGFzc05hbWU9XCJzaXplXCI+e3RoaXMucHJvcHMuc2l6ZSArICcgJyArIHpudWkucmVhY3Quc3RyaW5naWZ5RmlsZVNpemUodGhpcy5wcm9wcy5tYXhGaWxlU2l6ZSl9PC9zcGFuPn1cblx0XHRcdFx0PGlucHV0IG11bHRpcGxlPXt0aGlzLnByb3BzLm11bHRpcGxlfSBjbGFzc05hbWU9XCJpbnB1dFwiIHR5cGU9XCJmaWxlXCIgbmFtZT17dGhpcy5wcm9wcy5uYW1lfHwoJ3pyX2FqYXhfdXBsb2FkZXJfZmlsZV8nICsgRGF0ZS5ub3coKSl9IG9uQ2hhbmdlPXt0aGlzLl9fb25JbnB1dENoYW5nZX0gb25DbGljaz17dGhpcy5fX29uSW5wdXRDbGlja30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhamF4LXVwbG9hZC1pY29uXCI+XG5cdFx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwidXBsb2FkXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtdXBsb2FkIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yOTYgMzg0aC04MGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMTkyaC04Ny43Yy0xNy44IDAtMjYuNy0yMS41LTE0LjEtMzQuMUwyNDIuMyA1LjdjNy41LTcuNSAxOS44LTcuNSAyNy4zIDBsMTUyLjIgMTUyLjJjMTIuNiAxMi42IDMuNyAzNC4xLTE0LjEgMzQuMUgzMjB2MTY4YzAgMTMuMy0xMC43IDI0LTI0IDI0em0yMTYtOHYxMTJjMCAxMy4zLTEwLjcgMjQtMjQgMjRIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0VjM3NmMwLTEzLjMgMTAuNy0yNCAyNC0yNGgxMzZ2OGMwIDMwLjkgMjUuMSA1NiA1NiA1Nmg4MGMzMC45IDAgNTYtMjUuMSA1Ni01NnYtOGgxMzZjMTMuMyAwIDI0IDEwLjcgMjQgMjR6bS0xMjQgODhjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHptNjQgMGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwelwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUERGT2JqZWN0ID0gcmVxdWlyZSgncmVhY3QtcGRmb2JqZWN0JykuUERGT2JqZWN0OyBcbnZhciBPRkZJQ0VfVFlQRSA9IFsnLnBkZicsICcuZG9jJywgJy5kb2N4JywgJy54bHMnLCAnLnhsc3gnLCAnLnBwdCcsICcucHB0eCddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZUxpc3RJdGVtJyxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0aG9zdDogdGhpcy5wcm9wcy5ob3N0LFxuXHRcdFx0ZnVsbFNjcmVlbjogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRfX2ZpbGVEb3dubG9hZFJlbmRlcjogZnVuY3Rpb24gKGZpbGUpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMuc3RhdGUuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmRvd25sb2FkSG9zdCcpLFxuXHRcdFx0X2FwaSA9IHRoaXMucHJvcHMuZG93bmxvYWRBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEFwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cdFx0aWYoX2FwaSl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXsoKT0+em51aS5kb3dubG9hZFVSTChfYXBpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XSwgZmlsZS5uYW1lKX0gY2xhc3NOYW1lPVwiZG93bmxvYWRcIj5cblx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJkb3dubG9hZFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWRvd25sb2FkIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMTYgMGg4MGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYxNjhoODcuN2MxNy44IDAgMjYuNyAyMS41IDE0LjEgMzQuMUwyNjkuNyAzNzguM2MtNy41IDcuNS0xOS44IDcuNS0yNy4zIDBMOTAuMSAyMjYuMWMtMTIuNi0xMi42LTMuNy0zNC4xIDE0LjEtMzQuMUgxOTJWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjR6bTI5NiAzNzZ2MTEyYzAgMTMuMy0xMC43IDI0LTI0IDI0SDI0Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYzNzZjMC0xMy4zIDEwLjctMjQgMjQtMjRoMTQ2LjdsNDkgNDljMjAuMSAyMC4xIDUyLjUgMjAuMSA3Mi42IDBsNDktNDlINDg4YzEzLjMgMCAyNCAxMC43IDI0IDI0em0tMTI0IDg4YzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6bTY0IDBjMC0xMS05LTIwLTIwLTIwcy0yMCA5LTIwIDIwIDkgMjAgMjAgMjAgMjAtOSAyMC0yMHpcIj48L3BhdGg+PC9zdmc+XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRfX3JlbmRlckZpbGVDb250ZW50OiBmdW5jdGlvbiAoZmlsZSl7XG5cdFx0dmFyIF92aWV3ID0gbnVsbCwgX3NyYyA9ICcnO1xuXHRcdGlmKGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKCcvenhuei5jb3JlLmZzL2ZldGNoL2ltYWdlLycpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5IHx8ICd0ZW1wTmFtZSddO1xuXHRcdFx0X3ZpZXcgPSA8aW1nIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJ2F1dG8nIH19IGNsYXNzTmFtZT1cInZpZXcgaW1nLXZpZXdcIiBzcmM9e19zcmN9IC8+O1xuXHRcdH1lbHNlIGlmKGZpbGUudHlwZS5pbmRleE9mKCd2aWRlbycpID09IDApe1xuXHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKCcvenhuei5jb3JlLmZzL2ZldGNoL3ZpZGVvLnBsYXkvJykgKyBmaWxlW3RoaXMucHJvcHMudmFsdWVLZXkgfHwgJ3RlbXBOYW1lJ107XG5cdFx0XHRfdmlldyA9IDx2aWRlb1xuXHRcdFx0XHRjbGFzc05hbWU9XCJ2aWV3IGlkZW8tdmlld1wiXG5cdFx0XHRcdGNvbnRyb2xzXG5cdFx0XHRcdHByZWxvYWQ9XCJhdXRvXCJcblx0XHRcdFx0d2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IFxuXHRcdFx0XHRoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuXHRcdFx0XHRwb3N0ZXI9e3RoaXMucHJvcHMucG9zdGVyfT5cblx0XHRcdFx0PHNvdXJjZSBzcmM9e19zcmN9IHR5cGU9XCJ2aWRlby9tcDRcIiAvPlxuXHRcdFx0XHQ8c291cmNlIHNyYz17X3NyY30gdHlwZT1cInZpZGVvL3dlYm1cIiAvPlxuXHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0aXBzXCI+XG5cdFx0XHRcdFx0VG8gdmlldyB0aGlzIHZpZGVvIHBsZWFzZSBlbmFibGUgSmF2YVNjcmlwdCwgYW5kIGNvbnNpZGVyIHVwZ3JhZGluZyB0byBhIHdlYiBicm93c2VyIHRoYXRcblx0XHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly92aWRlb2pzLmNvbS9odG1sNS12aWRlby1zdXBwb3J0L1wiIHRhcmdldD1cIl9ibGFua1wiPnN1cHBvcnRzIEhUTUw1IHZpZGVvPC9hPlxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L3ZpZGVvPjtcblx0XHR9ZWxzZSBpZihPRkZJQ0VfVFlQRS5pbmRleE9mKGZpbGUuZXh0KSAhPSAtMSl7XG5cdFx0XHRfc3JjID0gKHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCAnJykgKyAoJy96eG56LmNvcmUuZnMvZmV0Y2gvcmVhZEFzUERGLycpICsgZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5IHx8ICd0ZW1wTmFtZSddO1xuXHRcdFx0X3ZpZXcgPSA8UERGT2JqZWN0IHVybD17X3NyY30gaGVpZ2h0PVwiMTAwJVwiIC8+O1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtY29udGVudFwiID5cblx0XHRcdFx0e192aWV3fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblx0X19mdWxsU2NyZWVuOiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZ1bGxTY3JlZW46ICF0aGlzLnN0YXRlLmZ1bGxTY3JlZW5cblx0XHR9KTtcblx0fSxcblx0X19yZW5kZXJGdWxsc2NyZWVuOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLmZ1bGxTY3JlZW4pIHtcblx0XHRcdHJldHVybiA8c3ZnIG9uQ2xpY2s9e3RoaXMuX19mdWxsU2NyZWVufSBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwid2luZG93LWNsb3NlXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtd2luZG93LWNsb3NlIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NjQgMzJINDhDMjEuNSAzMiAwIDUzLjUgMCA4MHYzNTJjMCAyNi41IDIxLjUgNDggNDggNDhoNDE2YzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjgwYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4em0tODMuNiAyOTAuNWM0LjggNC44IDQuOCAxMi42IDAgMTcuNGwtNDAuNSA0MC41Yy00LjggNC44LTEyLjYgNC44LTE3LjQgMEwyNTYgMzEzLjNsLTY2LjUgNjcuMWMtNC44IDQuOC0xMi42IDQuOC0xNy40IDBsLTQwLjUtNDAuNWMtNC44LTQuOC00LjgtMTIuNiAwLTE3LjRsNjcuMS02Ni41LTY3LjEtNjYuNWMtNC44LTQuOC00LjgtMTIuNiAwLTE3LjRsNDAuNS00MC41YzQuOC00LjggMTIuNi00LjggMTcuNCAwbDY2LjUgNjcuMSA2Ni41LTY3LjFjNC44LTQuOCAxMi42LTQuOCAxNy40IDBsNDAuNSA0MC41YzQuOCA0LjggNC44IDEyLjYgMCAxNy40TDMxMy4zIDI1Nmw2Ny4xIDY2LjV6XCI+PC9wYXRoPjwvc3ZnPjtcblx0XHR9XG5cblx0XHRyZXR1cm4gPHN2ZyBvbkNsaWNrPXt0aGlzLl9fZnVsbFNjcmVlbn0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInR2XCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtdHYgZmEtdy0yMCBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTU5MiAwSDQ4QTQ4IDQ4IDAgMCAwIDAgNDh2MzIwYTQ4IDQ4IDAgMCAwIDQ4IDQ4aDI0MHYzMkgxMTJhMTYgMTYgMCAwIDAtMTYgMTZ2MzJhMTYgMTYgMCAwIDAgMTYgMTZoNDE2YTE2IDE2IDAgMCAwIDE2LTE2di0zMmExNiAxNiAwIDAgMC0xNi0xNkgzNTJ2LTMyaDI0MGE0OCA0OCAwIDAgMCA0OC00OFY0OGE0OCA0OCAwIDAgMC00OC00OHptLTE2IDM1Mkg2NFY2NGg1MTJ6XCI+PC9wYXRoPjwvc3ZnPjtcblx0fSxcblx0X19maWxlRG93bmxvYWRSZW5kZXI6IGZ1bmN0aW9uIChmaWxlKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5kb3dubG9hZEhvc3QnKSxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmRvd25sb2FkQXBpIHx8IHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZG93bmxvYWRBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKF9hcGkpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PHNwYW4gb25DbGljaz17KCk9PnpudWkuZG93bmxvYWRVUkwoX2FwaSArIGZpbGVbdGhpcy5wcm9wcy52YWx1ZUtleV0sIGZpbGUubmFtZSl9IGNsYXNzTmFtZT1cImRvd25sb2FkXCI+XG5cdFx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiZG93bmxvYWRcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1kb3dubG9hZCBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjE2IDBoODBjMTMuMyAwIDI0IDEwLjcgMjQgMjR2MTY4aDg3LjdjMTcuOCAwIDI2LjcgMjEuNSAxNC4xIDM0LjFMMjY5LjcgMzc4LjNjLTcuNSA3LjUtMTkuOCA3LjUtMjcuMyAwTDkwLjEgMjI2LjFjLTEyLjYtMTIuNi0zLjctMzQuMSAxNC4xLTM0LjFIMTkyVjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0em0yOTYgMzc2djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDE0Ni43bDQ5IDQ5YzIwLjEgMjAuMSA1Mi41IDIwLjEgNzIuNiAwbDQ5LTQ5SDQ4OGMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPjwvc3ZnPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQpO1xuXHRcdH1cblx0fSxcblx0X19vblJlbW92ZTogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5wcm9wcy5vblJlbW92ZSAmJiB0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMuZGF0YSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHR2YXIgZmlsZSA9IHRoaXMucHJvcHMuZGF0YTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItZmlsZS1saXN0LWl0ZW1cIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUsICh0aGlzLnN0YXRlLmZ1bGxTY3JlZW4/J2Z1bGwtc2NyZWVuJzonJykpfSBzdHlsZT17em51aS5yZWFjdC5zdHlsZSh0aGlzLnByb3BzLnN0eWxlKX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmlsZS1pbmZvXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpdGVtLWJ0bnNcIj5cblx0XHRcdFx0XHRcdHt0aGlzLl9fcmVuZGVyRnVsbHNjcmVlbigpfVxuXHRcdFx0XHRcdFx0e3RoaXMuX19maWxlRG93bmxvYWRSZW5kZXIoZmlsZSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmaWxlLWRldGFpbFwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwibGlua1wiIG9uQ2xpY2s9eygpPT50aGlzLl9fb25QcmV2aWV3KGZpbGUpfT57ZmlsZS5uYW1lfTwvYT5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInRpbWVcIj57ZmlsZS5sYXN0TW9kaWZpZWREYXRlfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2l6ZVwiPnt6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKCtmaWxlLnNpemUpfTwvc3Bhbj5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5lZGl0YWJsZSAmJiA8c3ZnIG9uQ2xpY2s9e3RoaXMuX19vblJlbW92ZX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInRyYXNoLWFsdFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLXRyYXNoLWFsdCBmYS13LTE0IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzIgNDY0YTQ4IDQ4IDAgMCAwIDQ4IDQ4aDI4OGE0OCA0OCAwIDAgMCA0OC00OFYxMjhIMzJ6bTI3Mi0yNTZhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHptLTk2IDBhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHptLTk2IDBhMTYgMTYgMCAwIDEgMzIgMHYyMjRhMTYgMTYgMCAwIDEtMzIgMHpNNDMyIDMySDMxMmwtOS40LTE4LjdBMjQgMjQgMCAwIDAgMjgxLjEgMEgxNjYuOGEyMy43MiAyMy43MiAwIDAgMC0yMS40IDEzLjNMMTM2IDMySDE2QTE2IDE2IDAgMCAwIDAgNDh2MzJhMTYgMTYgMCAwIDAgMTYgMTZoNDE2YTE2IDE2IDAgMCAwIDE2LTE2VjQ4YTE2IDE2IDAgMCAwLTE2LTE2elwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5mdWxsU2NyZWVuICYmIHRoaXMuX19yZW5kZXJGaWxlQ29udGVudChmaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBamF4VXBsb2FkZXIgPSByZXF1aXJlKCcuL0FqYXhVcGxvYWRlcicpO1xudmFyIEZpbGVMaXN0SXRlbSA9IHJlcXVpcmUoJy4vRmlsZUxpc3RJdGVtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gem51aS5yZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnRmlsZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVLZXk6ICd0ZW1wTmFtZScsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBbXSxcblx0XHRcdGZpbGVzOiBbXSxcblx0XHRcdGNvbXByZXNzaW5nOiBmYWxzZVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdF9fb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWxlcywgYWpheFVwbG9hZGVyKXtcblx0XHRpZih0aGlzLnByb3BzLmNvbXByZXNzKSB7XG5cdFx0XHR2YXIgX2ZpbGVzID0gW10sXG5cdFx0XHRcdF9xdWV1ZSA9IHpuLnF1ZXVlKHt9LCB7XG5cdFx0XHRcdFx0ZXZlcnk6IGZ1bmN0aW9uIChzZW5kZXIsIGZpbGUpe1xuXHRcdFx0XHRcdFx0X2ZpbGVzLnB1c2goZmlsZSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5hbGx5OiBmdW5jdGlvbiAoc2VuZGVyKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRjb21wcmVzc2luZzogZmFsc2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YWpheFVwbG9hZGVyLnN1Ym1pdChfZmlsZXMpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0X2NvbXByZXNzID0gem4uZXh0ZW5kKHtcblx0XHRcdFx0XHRtYXhXaWR0aDogMTAyNCxcblx0XHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0XHRxdWFsaXR5OiAxXG5cdFx0XHRcdH0sIHRoaXMucHJvcHMuY29tcHJlc3MpLFxuXHRcdFx0XHRfaW1hZ2VSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpLFxuXHRcdFx0XHRfaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRcdFx0X2ltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wcmVzc2luZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRmb3IodmFyIGZpbGUgb2YgZmlsZXMpe1xuXHRcdFx0XHRpZihmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA9PT0gMCl7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0X2ltYWdlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdF9pbWcub25sb2FkID0gZnVuY3Rpb24gKCl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9jYW52YXMgPSB6bnVpLmltYWdlVG9DYW52YXMoX2ltZywgX2NvbXByZXNzLm1heFdpZHRoLCBfY29tcHJlc3MubWF4SGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRfY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYil7XG5cdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmRvbmUobmV3IEZpbGUoW2Jsb2JdLCBmaWxlLm5hbWUsIHsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZERhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBmaWxlLnR5cGVcblx0XHRcdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdFx0XHR9LCBmaWxlLnR5cGUsIF9jb21wcmVzcy5xdWFsaXR5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIChmaWxlKXtcblx0XHRcdFx0XHRcdF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICh0YXNrKXtcblx0XHRcdFx0XHRcdFx0dGFzay5kb25lKGZpbGUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoZmlsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0X3F1ZXVlLnN0YXJ0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnByb3BzLm9uVXBsb2FkZXJDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vblVwbG9hZGVyQ2hhbmdlKGZpbGVzLCBhamF4VXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRfX3Jlc29sdmVGaWxlQXBpOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX2hvc3QgPSB0aGlzLnN0YXRlLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci51cGxvYWRIb3N0JykgfHwgJycsXG5cdFx0XHRfYXBpID0gdGhpcy5wcm9wcy5mZXRjaHNBcGkgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5mZXRjaHNBcGknKTtcblx0XHRfYXBpID0gX2hvc3QgKyBfYXBpO1xuXHRcdGlmKCFfYXBpKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuaWh+S7tuaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cblx0XHRyZXR1cm4gX2FwaTtcblx0fSxcblx0aW5pdFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHZhciBfYXBpID0gdGhpcy5fX3Jlc29sdmVGaWxlQXBpKCk7XG5cdFx0aWYoIXZhbHVlIHx8ICFfYXBpKSByZXR1cm47XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpKXtcblx0XHRcdHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXHRcdH1cblx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdHZhciBfZmlsZXMgPSB6bnVpLnJlYWN0LnJlc29sdmVBcnJheVJlc3VsdChyZXNwb25zZSk7XG5cdFx0XHRpZihfZmlsZXMpe1xuXHRcdFx0XHR0aGlzLnNldEZpbGVzKF9maWxlcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVVcGxvYWRlci5qcyAtIOe9kee7nOivt+axgumUmeivrzogXCIsIHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyksIGZ1bmN0aW9uIChlcnIpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVVcGxvYWRlci5qcyAtIOe9kee7nOivt+axgumUmeivrzogXCIsIGVycik7XG5cdFx0fSk7XG5cdH0sXG5cdF9fb25Db21wbGV0ZTogZnVuY3Rpb24gKGRhdGEsIHVwbG9hZGVyKXtcblx0XHR0aGlzLnNldEZpbGVzKGRhdGEpO1xuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlIH0sIHRoaXMpO1xuXHRcdHRoaXMucHJvcHMub25Db21wbGV0ZSAmJiB0aGlzLnByb3BzLm9uQ29tcGxldGUoZGF0YSwgdXBsb2FkZXIsIHRoaXMpO1xuXHR9LFxuXHRzZXRGaWxlczogZnVuY3Rpb24gKGZpbGVzKXtcblx0XHR2YXIgX3ZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcblx0XHR2YXIgX3ZhbHVlcyA9IChmaWxlc3x8W10pLm1hcChmdW5jdGlvbiAoZmlsZSl7XG5cdFx0XHRpZihmaWxlICYmIGZpbGVbX3ZhbHVlS2V5XSl7XG5cdFx0XHRcdHJldHVybiBmaWxlW192YWx1ZUtleV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuc3RhdGUudmFsdWUuY29uY2F0KF92YWx1ZXMpO1xuXHRcdHRoaXMuc3RhdGUuZmlsZXMgPSB0aGlzLnN0YXRlLmZpbGVzLmNvbmNhdChmaWxlcyk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRnZXRWYWx1ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG5cdH0sXG5cdHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSk7XG5cdH0sXG5cdF9fZWRpdGFibGU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiAodGhpcy5wcm9wcy5lZGl0YWJsZSB8fCAhdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5yZWFkb25seSk7XG5cdH0sXG5cdF9fb25SZW1vdmU6IGZ1bmN0aW9uIChmaWxlLCBpbmRleCl7XG5cdFx0dGhpcy5zdGF0ZS5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdHRoaXMuc3RhdGUudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcblx0XHRcdGZpbGU6IGZpbGUsXG5cdFx0XHRpbmRleDogaW5kZXgsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSxcblx0XHRcdGZpbGVzOiB0aGlzLnN0YXRlLmZpbGVzXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cdF9fcmVuZGVyRmlsZXM6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZmlsZXMgJiYgdGhpcy5zdGF0ZS5maWxlcy5sZW5ndGgpe1xuXHRcdFx0dmFyIF9lZGl0YWJsZSA9IHRoaXMuX19lZGl0YWJsZSgpO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmaWxlLWxpc3RcIj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlLmZpbGVzLm1hcCgoZmlsZSwgaW5kZXgpPT57XG5cdFx0XHRcdFx0XHRcdGlmKGZpbGUpe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGZpbGUsIGluZGV4KTtcblx0XHRcdFx0XHRcdFx0XHRpZihfdGVtcCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RlbXA7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiA8RmlsZUxpc3RJdGVtIGtleT17ZmlsZVt0aGlzLnByb3BzLnZhbHVlS2V5XX0gZWRpdGFibGU9e19lZGl0YWJsZX0gZGF0YT17ZmlsZX0gb25SZW1vdmU9eygpPT50aGlzLl9fb25SZW1vdmUoZmlsZSwgaW5kZXgpfSAvPjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHR2YXIgX2VkaXRhYmxlID0gdGhpcy5fX2VkaXRhYmxlKCk7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWZpbGUtdXBsb2FkZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdF9lZGl0YWJsZSAmJiA8QWpheFVwbG9hZGVyXG5cdFx0XHRcdFx0XHR7Li4udGhpcy5wcm9wc31cblx0XHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnVwbG9hZGVyU3R5bGV9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5fX29uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0b25Db21wbGV0ZT17dGhpcy5fX29uQ29tcGxldGV9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1cGxvYWQtY29udGFpbmVyXCIgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkLWljb25cIj5cblx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJmaWxlLXVwbG9hZFwiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtdXBsb2FkIGZhLXctMTIgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIyNCAxMzZWMEgyNEMxMC43IDAgMCAxMC43IDAgMjR2NDY0YzAgMTMuMyAxMC43IDI0IDI0IDI0aDMzNmMxMy4zIDAgMjQtMTAuNyAyNC0yNFYxNjBIMjQ4Yy0xMy4yIDAtMjQtMTAuOC0yNC0yNHptNjUuMTggMjE2LjAxSDIyNHY4MGMwIDguODQtNy4xNiAxNi0xNiAxNmgtMzJjLTguODQgMC0xNi03LjE2LTE2LTE2di04MEg5NC44MmMtMTQuMjggMC0yMS40MS0xNy4yOS0xMS4yNy0yNy4zNmw5Ni40Mi05NS43YzYuNjUtNi42MSAxNy4zOS02LjYxIDI0LjA0IDBsOTYuNDIgOTUuN2MxMC4xNSAxMC4wNyAzLjAzIDI3LjM2LTExLjI1IDI3LjM2ek0zNzcgMTA1TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6XCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLmNvbXByZXNzaW5nICYmIDxzcGFuIGNsYXNzTmFtZT1cImNvbXByZXNzaW5nXCI+5Y6L57yp5LitLi4uPC9zcGFuPn1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L0FqYXhVcGxvYWRlcj5cblx0XHRcdFx0fVxuXHRcdFx0XHR7dGhpcy5fX3JlbmRlckZpbGVzKCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBGaWxlTGlzdEl0ZW0gPSByZXF1aXJlKCcuL0ZpbGVMaXN0SXRlbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHpudWkucmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmlsZXNWaWV3ZXInLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZUtleTogJ3RlbXBOYW1lJyxcblx0XHRcdHdpZHRoOiA0ODAsXG5cdFx0XHRoZWlnaHQ6IDMyMFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdGZpbGVzOiBbXSxcblx0XHRcdHZhbHVlOiBbXVxuXHRcdH07XG5cdCAgfSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmV0dXJuID0gdGhpcy5wcm9wcy5kaWRNb3VudCAmJiB0aGlzLnByb3BzLmRpZE1vdW50KHRoaXMpO1xuXHRcdGlmKF9yZXR1cm4hPT1mYWxzZSl7XG5cdFx0XHR0aGlzLmluaXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdF9fcmVzb2x2ZUZpbGVBcGk6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfaG9zdCA9IHRoaXMucHJvcHMuaG9zdCB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmhvc3QnKSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLnVwbG9hZEhvc3QnKSB8fCAnJyxcblx0XHRcdF9hcGkgPSB0aGlzLnByb3BzLmZldGNoc0FwaSB8fCB6bi5zZXR0aW5nLnBhdGgoJ3pyLnVwbG9hZGVyLmZldGNoc0FwaScpO1xuXHRcdF9hcGkgPSBfaG9zdCArIF9hcGk7XG5cblx0XHRpZihfYXBpKSB7XG5cdFx0XHRyZXR1cm4gX2FwaTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29uc29sZS5lcnJvcihcIuaWh+S7tuaOpeWPo+acqui+k+WFpVwiKSwgZmFsc2U7XG5cdH0sXG5cdGluaXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHR2YXIgX2FwaSA9IHRoaXMuX19yZXNvbHZlRmlsZUFwaSgpO1xuXHRcdGlmKCFfYXBpIHx8ICF2YWx1ZSkgcmV0dXJuO1xuXG5cdFx0aWYoem4uaXModmFsdWUsICdvYmplY3QnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0RmlsZXMoW3ZhbHVlXSksIGZhbHNlO1xuXHRcdH1cblx0XHRpZih6bi5pcyh2YWx1ZSwgJ2FycmF5JykgJiYgdmFsdWUubGVuZ3RoICYmIHpuLmlzKHZhbHVlWzBdLCAnb2JqZWN0Jykpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0RmlsZXModmFsdWUpLCBmYWxzZTtcblx0XHR9XG5cdFx0XG5cdFx0aWYoem4uaXModmFsdWUsICdhcnJheScpKXtcblx0XHRcdHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXHRcdH1cblx0XHR6bi5kYXRhLmdldChfYXBpICsgdmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdHZhciBfZmlsZXMgPSB6bnVpLnJlYWN0LnJlc29sdmVBcnJheVJlc3VsdChyZXNwb25zZSk7XG5cdFx0XHRpZihfZmlsZXMpe1xuXHRcdFx0XHR0aGlzLnNldEZpbGVzKF9maWxlcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZpbGVzVmlld2VyLmpzIC0g572R57uc6K+35rGC6ZSZ6K+vOiBcIiwgcmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gKGVycil7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRmlsZXNWaWV3ZXIuanMgLSDnvZHnu5zor7fmsYLplJnor686IFwiLCBlcnIpO1xuXHRcdH0pO1xuXHR9LFxuXHRzZXRGaWxlczogZnVuY3Rpb24gKGZpbGVzKXtcblx0XHR0aGlzLnN0YXRlLmZpbGVzID0gZmlsZXM7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRfX3JlbmRlckZpbGVzOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnN0YXRlLmZpbGVzKXtcblx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtbGlzdFwiPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5maWxlcy5tYXAoZnVuY3Rpb24gKGZpbGUsIGluZGV4KXtcblx0XHRcdFx0XHRcdGlmKGZpbGUpe1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JldHVybiA9IHRoaXMucHJvcHMub25GaWxlUmVuZGVyICYmIHRoaXMucHJvcHMub25GaWxlUmVuZGVyKGZpbGUsIGluZGV4LCB0aGlzKTtcblx0XHRcdFx0XHRcdFx0aWYoX3JldHVybil7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9yZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPEZpbGVMaXN0SXRlbSBob3N0PXt0aGlzLnByb3BzLmhvc3R9IGtleT17aW5kZXh9IGRhdGE9e2ZpbGV9IGVkaXRhYmxlPXt0aGlzLnByb3BzLmVkaXRhYmxlfSAvPjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2Pjtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5maWxlcyl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInpyLWZpbGUtdmlld2VyXCI+XG5cdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3Bpbm5lclwiIC8+XG5cdFx0XHRcdFx0PHNwYW4+5Yqg6L295LitIC4uLiA8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWZpbGVzLXZpZXdlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt6bnVpLnJlYWN0LnN0eWxlKHRoaXMucHJvcHMuc3R5bGUpfT5cblx0XHRcdFx0e3RoaXMuX19yZW5kZXJGaWxlcygpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQWpheFVwbG9hZGVyID0gcmVxdWlyZSgnLi9BamF4VXBsb2FkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidJbWFnZVVwbG9hZGVyJyxcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdG1heFdpZHRoOiAxMDI0LFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDc2OCxcblx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG5cdFx0XHRpbWFnZURhdGFVUkw6IG51bGwsXG5cdFx0XHRvcmlnaW5hbDogbnVsbCxcblx0XHRcdGNvbXByZXNzOiBudWxsLFxuXHRcdFx0Y29tcHJlc3Npbmc6IGZhbHNlXG5cdFx0fTtcbiAgXHR9LFxuXHRfX29uQ2hhbmdlOiBmdW5jdGlvbiAoZmlsZXMsIGFqYXhVcGxvYWRlcil7XG5cdFx0dmFyIF9maWxlID0gZmlsZXNbMF07XG5cdFx0aWYoX2ZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID09IC0xKXtcblx0XHRcdHJldHVybiBhbGVydChfZmlsZS5uYW1lICsgJyDkuI3mmK/lm77niYfmlofku7YnKSwgZmFsc2U7XG5cdFx0fVxuXHRcdGlmKCFGaWxlUmVhZGVyIHx8ICFJbWFnZSkge1xuXHRcdFx0cmV0dXJuIGFsZXJ0KCfmtY/op4jlmajkuI3mlK/mjIHpooTop4jlip/og70nKSwgZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wcm9wcy5jb21wcmVzcykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGNvbXByZXNzaW5nOiB0cnVlXG5cdFx0XHR9KTtcblx0XHRcdHZhciBfc2VsZiA9IHRoaXMsXG5cdFx0XHRcdF9jb21wcmVzcyA9IHpuLmV4dGVuZCh7XG5cdFx0XHRcdFx0bWF4V2lkdGg6IDEwMjQsXG5cdFx0XHRcdFx0bWF4SGVpZ2h0OiA3NjgsXG5cdFx0XHRcdFx0cXVhbGl0eTogMVxuXHRcdFx0XHR9LCB0aGlzLnByb3BzLmNvbXByZXNzKSxcblx0XHRcdFx0X2ltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKSxcblx0XHRcdFx0X2ltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0X2ltYWdlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0XHRcdF9pbWcuc3JjID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdH07XG5cdFx0XHRfaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChfZmlsZSk7XG5cdFx0XHRfaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpe1xuXHRcdFx0XHRfc2VsZi5zdGF0ZS5vcmlnaW5hbCA9IHtcblx0XHRcdFx0XHRzaXplOiB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKF9maWxlLnNpemUpLFxuXHRcdFx0XHRcdHdpZHRoOiBfaW1nLndpZHRoLFxuXHRcdFx0XHRcdGhlaWdodDogX2ltZy5oZWlnaHRcblx0XHRcdFx0fTtcblx0XHRcdFx0dmFyIF9jYW52YXMgPSB6bnVpLmltYWdlVG9DYW52YXMoX2ltZywgX2NvbXByZXNzLm1heFdpZHRoLCBfY29tcHJlc3MubWF4SGVpZ2h0KTtcblx0XHRcdFx0X3NlbGYuc3RhdGUuaW1hZ2VEYXRhVVJMID0gX2NhbnZhcy50b0RhdGFVUkwoX2ZpbGUudHlwZSwgX2NvbXByZXNzLnF1YWxpdHkpO1xuXHRcdFx0XHRfY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYil7XG5cdFx0XHRcdFx0X3NlbGYuc3RhdGUuY29tcHJlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRpZihibG9iKXtcblx0XHRcdFx0XHRcdF9zZWxmLnN0YXRlLmNvbXByZXNzID0ge1xuXHRcdFx0XHRcdFx0XHRzaXplOiB6bnVpLnJlYWN0LnN0cmluZ2lmeUZpbGVTaXplKGJsb2Iuc2l6ZSksXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiBfY2FudmFzLndpZHRoLFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IF9jYW52YXMuaGVpZ2h0XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YWpheFVwbG9hZGVyLnN1Ym1pdChbXG5cdFx0XHRcdFx0XHRcdG5ldyBGaWxlKFtibG9iXSwgX2ZpbGUubmFtZSwgeyBcblx0XHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWREYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBfZmlsZS50eXBlXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3NlbGYuZm9yY2VVcGRhdGUoKTtcblx0XHRcdFx0fSwgX2ZpbGUudHlwZSwgX2NvbXByZXNzLnF1YWxpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgX2ltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdF9pbWFnZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbWFnZURhdGFVUkw6IGV2ZW50LnRhcmdldC5yZXN1bHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0XHRfaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChfZmlsZSk7XG5cdFx0fVxuXHR9LFxuXHRfX29uQ29tcGxldGU6IGZ1bmN0aW9uIChkYXRhLCB1cGxvYWRlcil7XG5cdFx0dmFyIF9maWxlID0gZGF0YVswXTtcblx0XHRpZihfZmlsZSl7XG5cdFx0XHR0aGlzLnNldFZhbHVlKF9maWxlW3RoaXMucHJvcHMudmFsdWVLZXkgfHwgJ3RlbXBOYW1lJ10pO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ29tcGxldGUgJiYgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKF9maWxlLCB0aGlzKTtcblx0fSxcblx0Z2V0VmFsdWU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuXHR9LFxuXHRzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHZhbHVlIH0sIGZ1bmN0aW9uICgpe1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHsgdmFsdWU6IHZhbHVlIH0sIHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH0sXG5cdF9fcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfc3JjID0gdGhpcy5zdGF0ZS5pbWFnZURhdGFVUkw7XG5cdFx0aWYoIV9zcmMpe1xuXHRcdFx0X3NyYyA9IHRoaXMuc3RhdGUudmFsdWU7XG5cdFx0XHRpZihfc3JjICYmIF9zcmMuaW5kZXhPZignaHR0cCcpICE9IDApe1xuXHRcdFx0XHRpZihfc3JjLmluZGV4T2YoJy8nKSAhPSAtMSl7XG5cdFx0XHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgX3NyYztcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0X3NyYyA9ICh0aGlzLnByb3BzLmhvc3QgfHwgem4uc2V0dGluZy5wYXRoKCd6ci51cGxvYWRlci5ob3N0JykgfHwgJycpICsgKHpuLnNldHRpbmcucGF0aCgnenIudXBsb2FkZXIuZmV0Y2hJbWFnZUFwaScpIHx8ICcnKSArIF9zcmM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYoX3NyYyl7XG5cdFx0XHRyZXR1cm4gPGltZyBjbGFzc05hbWU9XCJpbWdcIiBzcmM9e19zcmN9IC8+O1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaW1nLXVwbG9hZC1pY29uXCI+XG5cdFx0XHRcdDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cImltYWdlXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtaW1hZ2UgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ2NCA0NDhINDhjLTI2LjUxIDAtNDgtMjEuNDktNDgtNDhWMTEyYzAtMjYuNTEgMjEuNDktNDggNDgtNDhoNDE2YzI2LjUxIDAgNDggMjEuNDkgNDggNDh2Mjg4YzAgMjYuNTEtMjEuNDkgNDgtNDggNDh6TTExMiAxMjBjLTMwLjkyOCAwLTU2IDI1LjA3Mi01NiA1NnMyNS4wNzIgNTYgNTYgNTYgNTYtMjUuMDcyIDU2LTU2LTI1LjA3Mi01Ni01Ni01NnpNNjQgMzg0aDM4NFYyNzJsLTg3LjUxNS04Ny41MTVjLTQuNjg2LTQuNjg2LTEyLjI4NC00LjY4Ni0xNi45NzEgMEwyMDggMzIwbC01NS41MTUtNTUuNTE1Yy00LjY4Ni00LjY4Ni0xMi4yODQtNC42ODYtMTYuOTcxIDBMNjQgMzM2djQ4elwiPjwvcGF0aD48L3N2Zz5cblx0XHRcdDwvZGl2Pjtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8QWpheFVwbG9hZGVyXG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfVxuXHRcdFx0XHRjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItaW1hZ2UtdXBsb2FkZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5fX29uQ2hhbmdlfVxuXHRcdFx0XHRvbkNvbXBsZXRlPXt0aGlzLl9fb25Db21wbGV0ZX1cblx0XHRcdFx0bXVsdGlwbGU9e2ZhbHNlfSA+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtY29udGFpbmVyXCIgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHRcdHt0aGlzLl9fcmVuZGVySW1hZ2UoKX1cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlLmNvbXByZXNzICYmIDxkaXYgY2xhc3NOYW1lPVwiY29tcHJlc3MtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm9yaWdpbmFsXCI+5YmN77yae3RoaXMuc3RhdGUub3JpZ2luYWwud2lkdGh9IHgge3RoaXMuc3RhdGUub3JpZ2luYWwuaGVpZ2h0fSAoe3RoaXMuc3RhdGUub3JpZ2luYWwuc2l6ZX0pPC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tcHJlc3NcIj7lkI7vvJp7dGhpcy5zdGF0ZS5jb21wcmVzcy53aWR0aH0geCB7dGhpcy5zdGF0ZS5jb21wcmVzcy5oZWlnaHR9ICh7dGhpcy5zdGF0ZS5jb21wcmVzcy5zaXplfSk8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlLmNvbXByZXNzaW5nICYmIDxzcGFuIGNsYXNzTmFtZT1cImNvbXByZXNzaW5nXCI+5Y6L57yp5LitLi4uPC9zcGFuPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L0FqYXhVcGxvYWRlcj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInpuLnNldHRpbmcuc2V0S2V5KCd6ci51cGxvYWRlcicsIHpuLmRlZXBBc3NpZ24oe30sIHpuLnNldHRpbmcuZ2V0S2V5KCd6ci51cGxvYWRlcicpLCB7XG4gICAgdXBsb2FkQXBpOiAnL3p4bnouY29yZS5mcy91cGxvYWQvZmlsZXMnLFxuICAgIGZldGNoQXBpOiAnL3p4bnouY29yZS5mcy9mZXRjaC9maWxlLycsXG4gICAgZmV0Y2hzQXBpOiAnL3p4bnouY29yZS5mcy9mZXRjaC9maWxlcy8nLFxuICAgIGZldGNoSW1hZ2VBcGk6ICcvenhuei5jb3JlLmZzL2ZldGNoL2ltYWdlLycsXG4gICAgZG93bmxvYWRBcGk6ICcvenhuei5jb3JlLmZzL2Rvd25sb2FkL2ZpbGUvJ1xufSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBBamF4VXBsb2FkZXI6IHJlcXVpcmUoJy4vQWpheFVwbG9hZGVyJyksXG4gICAgRmlsZUxpc3RJdGVtOiByZXF1aXJlKCcuL0ZpbGVMaXN0SXRlbScpLFxuICAgIEZpbGVVcGxvYWRlcjogcmVxdWlyZSgnLi9GaWxlVXBsb2FkZXInKSxcbiAgICBGaWxlc1ZpZXdlcjogcmVxdWlyZSgnLi9GaWxlc1ZpZXdlcicpLFxuICAgIEltYWdlVXBsb2FkZXI6IHJlcXVpcmUoJy4vSW1hZ2VVcGxvYWRlcicpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdERPTVwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9