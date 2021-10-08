/*! For license information please see index.bundle.js.LICENSE.txt */
!function(e,t){for(var n in t)e[n]=t[n]}(this,function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){!function(){e.exports=this.React}()},function(e,t,n){function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s=znui.React||n(0),r=znui.ReactDOM||n(4);e.exports=znui.react.createClass({displayName:"AjaxUploader",getDefaultProps:function(){return{name:"zr_ajax_uploader_file",action:"/zxnz.core.fs/upload/files",types:[],changeSubmit:!0,hiddens:null,multiple:!0,hint:!1,maxFileSize:209715200,size:""}},getInitialState:function(){return{host:this.props.host,loading:!1,files:[],progress:0,timeStamp:0}},__onInputChange:function(e){if(this.state.loading)return!1;this.state.files=[];var t=e.nativeEvent.target.files,n=null;if(!t.length)return alert("未选择文件");for(var i=0,s=t.length;i<s;i++){if((n=t[i]).size>this.props.maxFileSize)return alert(n.name+" 文件大小是"+znui.react.stringifyFileSize(n.size)+", 不能超过"+znui.react.stringifyFileSize(this.props.maxFileSize)),e.nativeEvent.target.form.reset(),!1;if(this.props.types.length&&-1==this.props.types.indexOf(n.type.split("/")[0]))return alert("只支持"+this.props.types.join(",")+"的文件类型"),!1;this.state.files.push(n)}var r=this.props.onChange&&this.props.onChange(this.state.files,this);!1!==r&&this.props.changeSubmit&&this.submit(this.state.files,r)},__onInputClick:function(e){if(this.state.loading)return!1;e.stopPropagation(),this.props.onUploaderClick&&this.props.onUploaderClick(e,this)},__resolveUploadAction:function(){var e=this.state.host||zn.setting.path("zr.uploader.host")||zn.setting.path("zr.uploader.uploadHost")||"",t=this.props.action||this.props.uploadApi||zn.setting.path("zr.uploader.uploadApi")||"";return(t=e+t)||(console.error("文件上传接口未输入"),!1)},submit:function(e,t){var n=e||this.state.files,s=new FormData,r=this.props.hiddens||{},a=null;zn.is(t,"object")&&zn.extend(r,t);for(var o=0,l=n.length;o<l;o++)s.append(this.props.name+"_"+o,n[o]);for(var p in r)"object"==i(a=r[p])&&(a=JSON.stringify(a)),s.append(p,a);this.ajaxUpload(s)},ajaxUpload:function(e){var t=this,n=this.__resolveUploadAction();if(n){this.setState({loading:!0});var i=new XMLHttpRequest;if(i.upload.addEventListener("progress",(function(e){return t.__ajaxUploadProgress(e,i)}),!1),i.addEventListener("load",(function(e){return t.__ajaxUploadComplete(e,i)}),!1),i.addEventListener("error",(function(e){return t.__ajaxUploadError(e,i)}),!1),i.addEventListener("abort",(function(e){return t.__ajaxUploadAbort(e,i)}),!1),i.open("POST",n,"true"),i.withCredentials=!0,this.props.responseType&&(i.responseType="blob"),this.props.headers)for(var s in this.props.headers)i.setRequestHeader(s,this.props.headers[s]);i.onreadystatechange=function(){4===i.readyState&&200===i.status&&this.props.onFinished&&this.props.onFinished(i,this)}.bind(this),i.send(e)}},__ajaxUploadProgress:function(e,t){e.lengthComputable&&(e.progress=Math.round(100*e.loaded/e.total),this.state.progress=e.progress,this.state.timeStamp=e.timeStamp,this.forceUpdate()),this.props.onUploading&&this.props.onUploading(e,t,this)},__ajaxUploadComplete:function(e,t){if(this.reset(),this.state.progress=0,this.state.timeStamp=0,this.forceUpdate(),"string"==typeof e.target.response&&("text"==e.target.responseType||""==e.target.responseType)){if(0==e.target.responseText.indexOf("<!DOCTYPE html>"))return alert(e.target.responseText),!1;if(0==e.target.responseText.indexOf("{")||0==e.target.responseText.indexOf("[")){var n=JSON.parse(e.target.responseText);200==n.code?this.props.onComplete&&this.props.onComplete(n.result,e,t,this):(zn.error(n.result||n.message),this.props.onError&&this.props.onError(n.result,e,t,this))}}},__ajaxUploadError:function(e,t){this.reset(),this.props.onError&&this.props.onError(e.message,t,this)},__ajaxUploadAbort:function(e,t){this.reset(),this.props.onAbort&&this.props.onAbort(e,t,this)},reset:function(){this.setState({loading:!1}),r.findDOMNode(this).reset()},__renderProcess:function(){if(this.state.progress)return 100==this.state.progress?s.createElement("div",{className:"upload-progress",style:{height:"100%"}},s.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"check",className:"svg-inline--fa fa-check fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},s.createElement("path",{fill:"currentColor",d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"}))):s.createElement("div",{className:"upload-progress",style:{height:this.state.progress+"%"}},this.state.progress+"%","(",(this.state.timeStamp/1e3).toFixed(1),"s)")},render:function(){var e=this.__resolveUploadAction();if(e)return s.createElement("form",{className:znui.react.classname("zr-ajax-uploader",this.props.className),"data-loading":this.state.loading,action:e,encType:"multipart/form-data",method:"POST"},this.__renderProcess(),s.createElement("div",{className:"ajax-upload-container"},this.props.children),this.props.hint&&s.createElement("span",{className:"size"},this.props.size+" "+znui.react.stringifyFileSize(this.props.maxFileSize)),s.createElement("input",{multiple:this.props.multiple,className:"input",type:"file",name:this.props.name||"zr_ajax_uploader_file_"+Date.now(),onChange:this.__onInputChange,onClick:this.__onInputClick}),s.createElement("div",{className:"ajax-upload-icon"},s.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"upload",className:"svg-inline--fa fa-upload fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},s.createElement("path",{fill:"currentColor",d:"M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"}))))}})},function(e,t,n){var i;function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=znui.React||n(0),a=n(5).PDFObject,o=[".pdf",".doc",".docx",".xls",".xlsx",".ppt",".pptx"];e.exports=znui.react.createClass((s(i={displayName:"FileListItem",getInitialState:function(){return{host:this.props.host,fullScreen:!1}},__fileDownloadRender:function(e){var t=this,n=this.state.host||zn.setting.path("zr.uploader.downloadHost"),i=this.props.downloadApi||zn.setting.path("zr.uploader.downloadApi");if(i=n+i)return r.createElement("span",{onClick:function(){return znui.downloadURL(i+e[t.props.valueKey],e.name)},className:"download"},r.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"download",className:"svg-inline--fa fa-download fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{fill:"currentColor",d:"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"})))},__renderFileContent:function(e){var t=null,n="";return 0==e.type.indexOf("image")?(n=(this.props.host||zn.setting.path("zr.uploader.host")||"")+"/zxnz.core.fs/fetch/image/"+e[this.props.valueKey||"tempName"],t=r.createElement("img",{style:{width:"100%",height:"auto"},className:"view img-view",src:n})):0==e.type.indexOf("video")?(n=(this.props.host||zn.setting.path("zr.uploader.host")||"")+"/zxnz.core.fs/fetch/video.play/"+e[this.props.valueKey||"tempName"],t=r.createElement("video",{className:"view ideo-view",controls:!0,preload:"auto",width:this.props.width,height:this.props.height,poster:this.props.poster},r.createElement("source",{src:n,type:"video/mp4"}),r.createElement("source",{src:n,type:"video/webm"}),r.createElement("p",{className:"tips"},"To view this video please enable JavaScript, and consider upgrading to a web browser that",r.createElement("a",{href:"https://videojs.com/html5-video-support/",target:"_blank"},"supports HTML5 video")))):-1!=o.indexOf(e.ext)&&(n=(this.props.host||zn.setting.path("zr.uploader.host")||"")+"/zxnz.core.fs/fetch/readAsPDF/"+e[this.props.valueKey||"tempName"],t=r.createElement(a,{url:n,height:"100%"})),r.createElement("div",{className:"file-content"},t)},__fullScreen:function(){this.setState({fullScreen:!this.state.fullScreen})},__renderFullscreen:function(){return this.state.fullScreen?r.createElement("svg",{onClick:this.__fullScreen,"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"window-close",className:"svg-inline--fa fa-window-close fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{fill:"currentColor",d:"M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"})):r.createElement("svg",{onClick:this.__fullScreen,"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"tv",className:"svg-inline--fa fa-tv fa-w-20 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},r.createElement("path",{fill:"currentColor",d:"M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"}))}},"__fileDownloadRender",(function(e){var t=this,n=this.state.host||zn.setting.path("zr.uploader.downloadHost"),i=this.props.downloadApi||zn.setting.path("zr.uploader.downloadApi");if(i=n+i)return r.createElement("span",{onClick:function(){return znui.downloadURL(i+e[t.props.valueKey],e.name)},className:"download"},r.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"download",className:"svg-inline--fa fa-download fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{fill:"currentColor",d:"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"})))})),s(i,"render",(function(){var e=this,t=this.props.data;return r.createElement("div",{className:znui.react.classname("zr-file-list-item",this.props.className,this.state.fullScreen?"full-screen":""),style:znui.react.style(this.props.style)},r.createElement("div",{className:"file-info"},r.createElement("div",{className:"item-btns"},this.__renderFullscreen(),this.__fileDownloadRender(t)),r.createElement("div",{className:"file-detail"},r.createElement("a",{className:"link",onClick:function(){return e.__onPreview(t)}},t.name),r.createElement("span",{className:"time"},t.lastModifiedDate)),r.createElement("span",{className:"size"},znui.react.stringifyFileSize(+t.size))),this.state.fullScreen&&this.__renderFileContent(t))})),i))},function(e,t,n){zn.setting.setKey("zr.uploader",zn.deepAssign({},zn.setting.getKey("zr.uploader"),{uploadApi:"/zxnz.core.fs/upload/files",fetchApi:"/zxnz.core.fs/fetch/file/",fetchsApi:"/zxnz.core.fs/fetch/files/",fetchImageApi:"/zxnz.core.fs/fetch/image/",downloadApi:"/zxnz.core.fs/download/file/"})),e.exports={AjaxUploader:n(1),FileListItem:n(2),FileUploader:n(7),FilesViewer:n(8),ImageUploader:n(9)}},function(e,t){!function(){e.exports=this.ReactDOM}()},function(e,t,n){"use strict";var i,s=this&&this.__extends||(i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},a=this&&this.__rest||function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(i=Object.getOwnPropertySymbols(e);s<i.length;s++)t.indexOf(i[s])<0&&(n[i[s]]=e[i[s]])}return n};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),l=n(6),p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.embed=function(){var e=t.props,n=e.url,i=e.containerId,s=(e.containerProps,a(e,["url","containerId","containerProps"]));l&&l.embed(n,"#"+i,s)},t}return s(t,e),t.prototype.componentDidMount=function(){this.embed()},t.prototype.componentDidUpdate=function(e){e.url!==this.props.url&&this.embed()},t.prototype.render=function(){return o.createElement("div",r({},this.props.containerProps,{id:this.props.containerId}))},t.defaultProps={width:"100%",height:"100%",containerId:"pdfobject",forcePDFJS:!1,assumptionMode:!0},t}(o.PureComponent);t.PDFObject=p},function(e,t,n){var i,s,r;s=[],void 0===(r="function"==typeof(i=function(){"use strict";if("undefined"==typeof window||void 0===window.navigator||void 0===window.navigator.userAgent||void 0===window.navigator.mimeTypes)return!1;let e=window.navigator,t=window.navigator.userAgent,n="ActiveXObject"in window,i=void 0!==window.Promise,s=void 0!==e.mimeTypes["application/pdf"],r=void 0!==e.platform&&"MacIntel"===e.platform&&void 0!==e.maxTouchPoints&&e.maxTouchPoints>1||/Mobi|Tablet|Android|iPad|iPhone/.test(t),a=!r&&void 0!==e.vendor&&/Apple/.test(e.vendor)&&/Safari/.test(t),o=!!(!r&&/irefox/.test(t)&&t.split("rv:").length>1)&&parseInt(t.split("rv:")[1].split(".")[0],10)>18,l=function(e){var t;try{t=new ActiveXObject(e)}catch(e){t=null}return t},p=!r&&(i||o||s||n&&!(!l("AcroPDF.PDF")&&!l("PDF.PdfCtrl"))),c=function(e,t){return t||console.log("[PDFObject] "+e),!1},u=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},h=function(e,t,n,i,s,r){u(e);let a=i+"?file="+encodeURIComponent(t)+n,o=document.createElement("div"),l=document.createElement("iframe");return l.src=a,l.className="pdfobject",l.type="application/pdf",l.frameborder="0",l.allow="fullscreen",s&&(l.id=s),r||(o.style.cssText="position: absolute; top: 0; right: 0; bottom: 0; left: 0;",l.style.cssText="border: none; width: 100%; height: 100%;",e.style.position="relative",e.style.overflow="auto"),o.appendChild(l),e.appendChild(o),e.classList.add("pdfobject-container"),e.getElementsByTagName("iframe")[0]},d=function(e,t,n){let i=t||!1,s=n||{},o="string"==typeof s.id?s.id:"",l=s.page||!1,d=s.pdfOpenParams||{},f=s.fallbackLink||!0,m=s.width||"100%",g=s.height||"100%",v="boolean"!=typeof s.assumptionMode||s.assumptionMode,y="boolean"==typeof s.forcePDFJS&&s.forcePDFJS,w="boolean"==typeof s.supportRedirect&&s.supportRedirect,z="boolean"==typeof s.omitInlineStyles&&s.omitInlineStyles,b="boolean"==typeof s.suppressConsole&&s.suppressConsole,_="boolean"==typeof s.forceIframe&&s.forceIframe,x=s.PDFJS_URL||!1,E=function(e){let t=document.body;return"string"==typeof e?t=document.querySelector(e):void 0!==window.jQuery&&e instanceof jQuery&&e.length?t=e.get(0):void 0!==e.nodeType&&1===e.nodeType&&(t=e),t}(i),C="",S="";return"string"!=typeof e?c("URL is not valid",b):E?(l&&(d.page=l),S=function(e){let t,n="";if(e){for(t in e)e.hasOwnProperty(t)&&(n+=encodeURIComponent(t)+"="+encodeURIComponent(e[t])+"&");n&&(n="#"+n,n=n.slice(0,n.length-1))}return n}(d),y&&x?h(E,e,S,x,o,z):p||v&&!r?function(e,t,n,i,s,r,a,o,l){u(t);let p=document.createElement(e);if(p.src=i+s,p.className="pdfobject",p.type="application/pdf",o&&(p.id=o),"iframe"===e&&(p.allow="fullscreen"),!l){let t="embed"===e?"overflow: auto;":"border: none;";n&&n!==document.body?t+="width: "+r+"; height: "+a+";":t+="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;",p.style.cssText=t}return t.classList.add("pdfobject-container"),t.appendChild(p),t.getElementsByTagName(e)[0]}(_||w&&a?"iframe":"embed",E,t,e,S,m,g,o,z):x?h(E,e,S,x,o,z):(f&&(C="string"==typeof f?f:"<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>",E.innerHTML=C.replace(/\[url\]/g,e)),c("This browser does not support embedded PDFs",b))):c("Target element cannot be determined",b)};return{embed:function(e,t,n){return d(e,t,n)},pdfobjectversion:"2.2.3",supportsPDFs:p}})?i.apply(t,s):i)||(e.exports=r)},function(e,t,n){function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function s(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,s=function(){};return{s:s,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){l=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw a}}}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var a=znui.React||n(0),o=n(1),l=n(2);e.exports=znui.react.createClass({displayName:"FileUploader",getDefaultProps:function(){return{valueKey:"tempName",editable:!0,compress:{maxWidth:1024,maxHeight:768,quality:1}}},getInitialState:function(){return{value:[],files:[],compressing:!1}},componentDidMount:function(){!1!==(this.props.didMount&&this.props.didMount(this))&&this.initValue(this.props.value)},__onChange:function(e,t){if(this.props.compress){var n=[],i=zn.queue({},{every:function(e,t){n.push(t)},finally:function(e){this.setState({compressing:!1}),t.submit(n)}.bind(this)}),r=zn.extend({maxWidth:1024,maxHeight:768,quality:1},this.props.compress),a=new FileReader,o=new Image;a.onload=function(e){o.src=e.target.result},this.setState({compressing:!0});var l,p=s(e);try{for(p.s();!(l=p.n()).done;){var c=l.value;0===c.type.indexOf("image")?function(e){i.push((function(t){a.readAsDataURL(e),o.onload=function(){znui.imageToCanvas(o,r.maxWidth,r.maxHeight).toBlob((function(n){t.done(new File([n],e.name,{lastModifiedDate:(new Date).getTime(),type:e.type}))}),e.type,r.quality)}}))}(c):function(e){i.push((function(t){t.done(e)}))}(c)}}catch(e){p.e(e)}finally{p.f()}return i.start(),!1}this.props.onUploaderChange&&this.props.onUploaderChange(e,t,this)},__resolveFileApi:function(){var e=this.state.host||zn.setting.path("zr.uploader.host")||zn.setting.path("zr.uploader.uploadHost")||"",t=this.props.fetchsApi||zn.setting.path("zr.uploader.fetchsApi");return(t=e+t)||(console.error("文件接口未输入"),!1)},initValue:function(e){var t=this.__resolveFileApi();e&&t&&(zn.is(e,"array")&&(e=e.join(",")),zn.data.get(t+e).then(function(e){var t=znui.react.resolveArrayResult(e);t?this.setFiles(t):console.error("FileUploader.js - 网络请求错误: ",e)}.bind(this),(function(e){console.error("FileUploader.js - 网络请求错误: ",e)})))},__onComplete:function(e,t){this.setFiles(e),this.props.onChange&&this.props.onChange({value:this.state.value},this),this.props.onComplete&&this.props.onComplete(e,t,this)},setFiles:function(e){var t=this.props.valueKey,n=(e||[]).map((function(e){if(e&&e[t])return e[t]}));this.state.value=this.state.value.concat(n),this.state.files=this.state.files.concat(e),this.forceUpdate()},getValue:function(){return this.state.value},setValue:function(e){this.setState({value:e})},__editable:function(){return this.props.editable||!this.props.disabled||!this.props.readonly},__onRemove:function(e,t){this.state.files.splice(t,1),this.state.value.splice(t,1),this.forceUpdate(),this.props.onChange&&this.props.onChange({file:e,index:t,value:this.state.value,files:this.state.files},this)},__renderFiles:function(){if(this.state.files&&this.state.files.length){var e=this.__editable();return a.createElement("div",{className:"file-list"},this.state.files.map(function(t,n){var i=this;if(t){var s=this.props.onFileRender&&this.props.onFileRender(t,n);return s||a.createElement(l,{key:t[this.props.valueKey],editable:e,data:t,onRemove:function(){return i.__onRemove(t,n)}})}}.bind(this)))}},render:function(){var e=this.__editable();return a.createElement("div",{className:znui.react.classname("zr-file-uploader",this.props.className)},e&&a.createElement(o,i({},this.props,{style:this.props.uploaderStyle,onChange:this.__onChange,onComplete:this.__onComplete}),a.createElement("div",{className:"upload-container",style:this.props.style},a.createElement("div",{className:"file-upload-icon"},a.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"file-upload",className:"svg-inline--fa fa-file-upload fa-w-12 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},a.createElement("path",{fill:"currentColor",d:"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"})),this.state.compressing&&a.createElement("span",{className:"compressing"},"压缩中...")))),this.__renderFiles())}})},function(e,t,n){var i=znui.React||n(0),s=n(2);e.exports=znui.react.createClass({displayName:"FilesViewer",getDefaultProps:function(){return{valueKey:"tempName",width:480,height:320}},getInitialState:function(){return{files:[],value:[]}},componentDidMount:function(){!1!==(this.props.didMount&&this.props.didMount(this))&&this.initValue(this.props.value)},__resolveFileApi:function(){var e=this.props.host||zn.setting.path("zr.uploader.host")||zn.setting.path("zr.uploader.uploadHost")||"",t=this.props.fetchsApi||zn.setting.path("zr.uploader.fetchsApi");return(t=e+t)||(console.error("文件接口未输入"),!1)},initValue:function(e){var t=this.__resolveFileApi();if(t&&e){if(zn.is(e,"object"))return this.setFiles([e]),!1;if(zn.is(e,"array")&&e.length&&zn.is(e[0],"object"))return this.setFiles(e),!1;zn.is(e,"array")&&(e=e.join(",")),zn.data.get(t+e).then(function(e){var t=znui.react.resolveArrayResult(e);t?this.setFiles(t):console.error("FilesViewer.js - 网络请求错误: ",e)}.bind(this),(function(e){console.error("FilesViewer.js - 网络请求错误: ",e)}))}},setFiles:function(e){this.state.files=e,this.forceUpdate()},__renderFiles:function(){if(this.state.files)return i.createElement("div",{className:"file-list"},this.state.files.map(function(e,t){if(e){var n=this.props.onFileRender&&this.props.onFileRender(e,t,this);return n||i.createElement(s,{host:this.props.host,key:t,data:e,editable:this.props.editable})}}.bind(this)))},render:function(){return this.state.files?i.createElement("div",{className:znui.react.classname("zr-files-viewer",this.props.className),style:znui.react.style(this.props.style)},this.__renderFiles()):i.createElement("div",{className:"zr-file-viewer"},i.createElement("i",{className:"fa fa-spinner"}),i.createElement("span",null,"加载中 ... "))}})},function(e,t,n){function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var s=znui.React||n(0),r=n(1);e.exports=s.createClass({displayName:"ImageUploader",getDefaultProps:function(){return{value:"",compress:{maxWidth:1024,maxHeight:768,quality:1}}},getInitialState:function(){return{value:this.props.value,imageDataURL:null,original:null,compress:null,compressing:!1}},__onChange:function(e,t){var n=e[0];if(-1==n.type.indexOf("image"))return alert(n.name+" 不是图片文件"),!1;if(!FileReader||!Image)return alert("浏览器不支持预览功能"),!1;if(this.props.compress){this.setState({compressing:!0});var i=this,s=zn.extend({maxWidth:1024,maxHeight:768,quality:1},this.props.compress),r=new FileReader,a=new Image;return r.onload=function(e){a.src=e.target.result},r.readAsDataURL(n),a.onload=function(){i.state.original={size:znui.react.stringifyFileSize(n.size),width:a.width,height:a.height};var e=znui.imageToCanvas(a,s.maxWidth,s.maxHeight);i.state.imageDataURL=e.toDataURL(n.type,s.quality),e.toBlob((function(s){i.state.compressing=!1,s&&(i.state.compress={size:znui.react.stringifyFileSize(s.size),width:e.width,height:e.height},t.submit([new File([s],n.name,{lastModifiedDate:(new Date).getTime(),type:n.type})])),i.forceUpdate()}),n.type,s.quality)},!1}(r=new FileReader).onload=function(e){this.setState({imageDataURL:e.target.result})}.bind(this),r.readAsDataURL(n)},__onComplete:function(e,t){var n=e[0];n&&this.setValue(n[this.props.valueKey||"tempName"]),this.props.onComplete&&this.props.onComplete(n,this)},getValue:function(){return this.state.value},setValue:function(e){this.setState({value:e},function(){this.props.onChange&&this.props.onChange({value:e},this)}.bind(this))},__renderImage:function(){var e=this.state.imageDataURL;return e||(e=this.state.value)&&0!=e.indexOf("http")&&(e=-1!=e.indexOf("/")?(this.props.host||zn.setting.path("zr.uploader.host")||"")+e:(this.props.host||zn.setting.path("zr.uploader.host")||"")+(zn.setting.path("zr.uploader.fetchImageApi")||"")+e),e?s.createElement("img",{className:"img",src:e}):s.createElement("div",{className:"img-upload-icon"},s.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"image",className:"svg-inline--fa fa-image fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},s.createElement("path",{fill:"currentColor",d:"M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"})))},render:function(){return s.createElement(r,i({},this.props,{className:znui.react.classname("zr-image-uploader",this.props.className),onChange:this.__onChange,onComplete:this.__onComplete,multiple:!1}),s.createElement("div",{className:"image-container",style:this.props.style},this.__renderImage(),this.state.compress&&s.createElement("div",{className:"compress-info"},s.createElement("div",{className:"original"},"前：",this.state.original.width," x ",this.state.original.height," (",this.state.original.size,")"),s.createElement("div",{className:"compress"},"后：",this.state.compress.width," x ",this.state.compress.height," (",this.state.compress.size,")")),this.state.compressing&&s.createElement("span",{className:"compressing"},"压缩中...")))}})}]));
//# sourceMappingURL=index.bundle.js.map