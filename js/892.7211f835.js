"use strict";(self["webpackChunkframetime_db"]=self["webpackChunkframetime_db"]||[]).push([[892],{6053:function(e,t,l){l.d(t,{Z:function(){return k}});var a=l(9269),n=l(6237),i=l(6632),o=(l(4719),l(6809));const r={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},s={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},u=Object.keys(s);u.forEach((e=>{s[e].regex=new RegExp(s[e].pattern)}));const c=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+u.join("")+"])|(.)","g"),d=/[.*+?^${}()|[\]\\]/g,m=String.fromCharCode(1),f={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function p(e,t,l,i){let u,f,p,v,g,h;const y=(0,n.iH)(null),b=(0,n.iH)(F());function w(){return!0===e.autogrow||["textarea","text","search","url","tel","password"].includes(e.type)}function F(){if(x(),!0===y.value){const t=R(q(e.modelValue));return!1!==e.fillMask?A(t):t}return e.modelValue}function k(e){if(e<u.length)return u.slice(-e);let t="",l=u;const a=l.indexOf(m);if(a>-1){for(let a=e-l.length;a>0;a--)t+=m;l=l.slice(0,a)+t+l.slice(a)}return l}function x(){if(y.value=void 0!==e.mask&&0!==e.mask.length&&w(),!1===y.value)return v=void 0,u="",void(f="");const t=void 0===r[e.mask]?e.mask:r[e.mask],l="string"===typeof e.fillMask&&0!==e.fillMask.length?e.fillMask.slice(0,1):"_",a=l.replace(d,"\\$&"),n=[],i=[],o=[];let g=!0===e.reverseFillMask,h="",b="";t.replace(c,((e,t,l,a,r)=>{if(void 0!==a){const e=s[a];o.push(e),b=e.negate,!0===g&&(i.push("(?:"+b+"+)?("+e.pattern+"+)?(?:"+b+"+)?("+e.pattern+"+)?"),g=!1),i.push("(?:"+b+"+)?("+e.pattern+")?")}else if(void 0!==l)h="\\"+("\\"===l?"":l),o.push(l),n.push("([^"+h+"]+)?"+h+"?");else{const e=void 0!==t?t:r;h="\\"===e?"\\\\\\\\":e.replace(d,"\\\\$&"),o.push(e),n.push("([^"+h+"]+)?"+h+"?")}}));const F=new RegExp("^"+n.join("")+"("+(""===h?".":"[^"+h+"]")+"+)?"+(""===h?"":"["+h+"]*")+"$"),k=i.length-1,x=i.map(((t,l)=>0===l&&!0===e.reverseFillMask?new RegExp("^"+a+"*"+t):l===k?new RegExp("^"+t+"("+(""===b?".":b)+"+)?"+(!0===e.reverseFillMask?"$":a+"*")):new RegExp("^"+t)));p=o,v=t=>{const l=F.exec(!0===e.reverseFillMask?t:t.slice(0,o.length+1));null!==l&&(t=l.slice(1).join(""));const a=[],n=x.length;for(let e=0,i=t;e<n;e++){const t=x[e].exec(i);if(null===t)break;i=i.slice(t.shift().length),a.push(...t)}return 0!==a.length?a.join(""):t},u=o.map((e=>"string"===typeof e?e:m)).join(""),f=u.split(m).join(l)}function C(t,n,o){const r=i.value,s=r.selectionEnd,c=r.value.length-s,d=q(t);!0===n&&x();const p=R(d),v=!1!==e.fillMask?A(p):p,h=b.value!==v;r.value!==v&&(r.value=v),!0===h&&(b.value=v),document.activeElement===r&&(0,a.Y3)((()=>{if(v!==f)if("insertFromPaste"!==o||!0===e.reverseFillMask)if(["deleteContentBackward","deleteContentForward"].indexOf(o)>-1){const t=!0===e.reverseFillMask?0===s?v.length>p.length?1:0:Math.max(0,v.length-(v===f?0:Math.min(p.length,c)+1))+1:s;r.setSelectionRange(t,t,"forward")}else if(!0===e.reverseFillMask)if(!0===h){const e=Math.max(0,v.length-(v===f?0:Math.min(p.length,c+1)));1===e&&1===s?r.setSelectionRange(e,e,"forward"):S.rightReverse(r,e)}else{const e=v.length-c;r.setSelectionRange(e,e,"backward")}else if(!0===h){const e=Math.max(0,u.indexOf(m),Math.min(p.length,s)-1);S.right(r,e)}else{const e=s-1;S.right(r,e)}else{const e=r.selectionEnd;let t=s-1;for(let l=g;l<=t&&l<e;l++)u[l]!==m&&t++;S.right(r,t)}else{const t=!0===e.reverseFillMask?f.length:0;r.setSelectionRange(t,t,"forward")}}));const y=!0===e.unmaskedValue?q(v):v;String(e.modelValue)!==y&&l(y,!0)}function V(e,t,l){const a=R(q(e.value));t=Math.max(0,u.indexOf(m),Math.min(a.length,t)),g=t,e.setSelectionRange(t,l,"forward")}(0,a.YP)((()=>e.type+e.autogrow),x),(0,a.YP)((()=>e.mask),(l=>{if(void 0!==l)C(b.value,!0);else{const l=q(b.value);x(),e.modelValue!==l&&t("update:modelValue",l)}})),(0,a.YP)((()=>e.fillMask+e.reverseFillMask),(()=>{!0===y.value&&C(b.value,!0)})),(0,a.YP)((()=>e.unmaskedValue),(()=>{!0===y.value&&C(b.value)}));const S={left(e,t){const l=-1===u.slice(t-1).indexOf(m);let a=Math.max(0,t-1);for(;a>=0;a--)if(u[a]===m){t=a,!0===l&&t++;break}if(a<0&&void 0!==u[t]&&u[t]!==m)return S.right(e,0);t>=0&&e.setSelectionRange(t,t,"backward")},right(e,t){const l=e.value.length;let a=Math.min(l,t+1);for(;a<=l;a++){if(u[a]===m){t=a;break}u[a-1]===m&&(t=a)}if(a>l&&void 0!==u[t-1]&&u[t-1]!==m)return S.left(e,l);e.setSelectionRange(t,t,"forward")},leftReverse(e,t){const l=k(e.value.length);let a=Math.max(0,t-1);for(;a>=0;a--){if(l[a-1]===m){t=a;break}if(l[a]===m&&(t=a,0===a))break}if(a<0&&void 0!==l[t]&&l[t]!==m)return S.rightReverse(e,0);t>=0&&e.setSelectionRange(t,t,"backward")},rightReverse(e,t){const l=e.value.length,a=k(l),n=-1===a.slice(0,t+1).indexOf(m);let i=Math.min(l,t+1);for(;i<=l;i++)if(a[i-1]===m){t=i,t>0&&!0===n&&t--;break}if(i>l&&void 0!==a[t-1]&&a[t-1]!==m)return S.leftReverse(e,l);e.setSelectionRange(t,t,"forward")}};function P(e){t("click",e),h=void 0}function M(l){if(t("keydown",l),!0===(0,o.Wm)(l)||!0===l.altKey)return;const a=i.value,n=a.selectionStart,r=a.selectionEnd;if(l.shiftKey||(h=void 0),37===l.keyCode||39===l.keyCode){l.shiftKey&&void 0===h&&(h="forward"===a.selectionDirection?n:r);const t=S[(39===l.keyCode?"right":"left")+(!0===e.reverseFillMask?"Reverse":"")];if(l.preventDefault(),t(a,h===n?r:n),l.shiftKey){const e=a.selectionStart;a.setSelectionRange(Math.min(h,e),Math.max(h,e),"forward")}}else 8===l.keyCode&&!0!==e.reverseFillMask&&n===r?(S.left(a,n),a.setSelectionRange(a.selectionStart,r,"backward")):46===l.keyCode&&!0===e.reverseFillMask&&n===r&&(S.rightReverse(a,r),a.setSelectionRange(n,a.selectionEnd,"forward"))}function R(t){if(void 0===t||null===t||""===t)return"";if(!0===e.reverseFillMask)return U(t);const l=p;let a=0,n="";for(let e=0;e<l.length;e++){const i=t[a],o=l[e];if("string"===typeof o)n+=o,i===o&&a++;else{if(void 0===i||!o.regex.test(i))return n;n+=void 0!==o.transform?o.transform(i):i,a++}}return n}function U(e){const t=p,l=u.indexOf(m);let a=e.length-1,n="";for(let i=t.length-1;i>=0&&a>-1;i--){const o=t[i];let r=e[a];if("string"===typeof o)n=o+n,r===o&&a--;else{if(void 0===r||!o.regex.test(r))return n;do{n=(void 0!==o.transform?o.transform(r):r)+n,a--,r=e[a]}while(l===i&&void 0!==r&&o.regex.test(r))}}return n}function q(e){return"string"!==typeof e||void 0===v?"number"===typeof e?v(""+e):e:v(e)}function A(t){return f.length-t.length<=0?t:!0===e.reverseFillMask&&0!==t.length?f.slice(0,-t.length)+t:t+f.slice(t.length)}return{innerValue:b,hasMask:y,moveCursorForPaste:V,updateMaskValue:C,onMaskedKeydown:M,onMaskedClick:P}}var v=l(9724),g=l(9976),h=l(447),y=l(3856),b=l(3027),w=l(6146),F=l(3613),k=(0,y.L)({name:"QInput",inheritAttrs:!1,props:{...i.Cl,...f,...v.Fz,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...i.HJ,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:l}){const{proxy:o}=(0,a.FN)(),{$q:r}=o,s={};let u,c,d,m=NaN,f=null;const y=(0,n.iH)(null),k=(0,v.Do)(e),{innerValue:x,hasMask:C,moveCursorForPaste:V,updateMaskValue:S,onMaskedKeydown:P,onMaskedClick:M}=p(e,t,W,y),R=(0,g.Z)(e,!0),U=(0,a.Fl)((()=>(0,i.yV)(x.value))),q=(0,h.Z)(Z),A=(0,i.tL)(),O=(0,a.Fl)((()=>"textarea"===e.type||!0===e.autogrow)),E=(0,a.Fl)((()=>!0===O.value||["text","search","url","tel","password"].includes(e.type))),N=(0,a.Fl)((()=>{const t={...A.splitAttrs.listeners.value,onInput:Z,onPaste:T,onChange:Y,onBlur:L,onFocus:b.sT};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=q,!0===C.value&&(t.onKeydown=P,t.onClick=M),!0===e.autogrow&&(t.onAnimationend=$),t})),_=(0,a.Fl)((()=>{const t={tabindex:0,"data-autofocus":!0===e.autofocus||void 0,rows:"textarea"===e.type?6:void 0,"aria-label":e.label,name:k.value,...A.splitAttrs.attributes.value,id:A.targetUid.value,maxlength:e.maxlength,disabled:!0===e.disable,readonly:!0===e.readonly};return!1===O.value&&(t.type=e.type),!0===e.autogrow&&(t.rows=1),t}));function j(){(0,w.jd)((()=>{const e=document.activeElement;null===y.value||y.value===e||null!==e&&e.id===A.targetUid.value||y.value.focus({preventScroll:!0})}))}function z(){null!==y.value&&y.value.select()}function T(l){if(!0===C.value&&!0!==e.reverseFillMask){const e=l.target;V(e,e.selectionStart,e.selectionEnd)}t("paste",l)}function Z(l){if(!l||!l.target)return;if("file"===e.type)return void t("update:modelValue",l.target.files);const n=l.target.value;if(!0!==l.target.qComposing){if(!0===C.value)S(n,!1,l.inputType);else if(W(n),!0===E.value&&l.target===document.activeElement){const{selectionStart:e,selectionEnd:t}=l.target;void 0!==e&&void 0!==t&&(0,a.Y3)((()=>{l.target===document.activeElement&&0===n.indexOf(l.target.value)&&l.target.setSelectionRange(e,t)}))}!0===e.autogrow&&D()}else s.value=n}function $(e){t("animationend",e),D()}function W(l,n){d=()=>{f=null,"number"!==e.type&&!0===s.hasOwnProperty("value")&&delete s.value,e.modelValue!==l&&m!==l&&(m=l,!0===n&&(c=!0),t("update:modelValue",l),(0,a.Y3)((()=>{m===l&&(m=NaN)}))),d=void 0},"number"===e.type&&(u=!0,s.value=l),void 0!==e.debounce?(null!==f&&clearTimeout(f),s.value=l,f=setTimeout(d,e.debounce)):d()}function D(){requestAnimationFrame((()=>{const e=y.value;if(null!==e){const t=e.parentNode.style,{scrollTop:l}=e,{overflowY:a,maxHeight:n}=!0===r.platform.is.firefox?{}:window.getComputedStyle(e),i=void 0!==a&&"scroll"!==a;!0===i&&(e.style.overflowY="hidden"),t.marginBottom=e.scrollHeight-1+"px",e.style.height="1px",e.style.height=e.scrollHeight+"px",!0===i&&(e.style.overflowY=parseInt(n,10)<e.scrollHeight?"auto":"hidden"),t.marginBottom="",e.scrollTop=l}}))}function Y(e){q(e),null!==f&&(clearTimeout(f),f=null),void 0!==d&&d(),t("change",e.target.value)}function L(t){void 0!==t&&(0,b.sT)(t),null!==f&&(clearTimeout(f),f=null),void 0!==d&&d(),u=!1,c=!1,delete s.value,"file"!==e.type&&setTimeout((()=>{null!==y.value&&(y.value.value=void 0!==x.value?x.value:"")}))}function B(){return!0===s.hasOwnProperty("value")?s.value:void 0!==x.value?x.value:""}(0,a.YP)((()=>e.type),(()=>{y.value&&(y.value.value=e.modelValue)})),(0,a.YP)((()=>e.modelValue),(t=>{if(!0===C.value){if(!0===c&&(c=!1,String(t)===m))return;S(t)}else x.value!==t&&(x.value=t,"number"===e.type&&!0===s.hasOwnProperty("value")&&(!0===u?u=!1:delete s.value));!0===e.autogrow&&(0,a.Y3)(D)})),(0,a.YP)((()=>e.autogrow),(e=>{!0===e?(0,a.Y3)(D):null!==y.value&&l.rows>0&&(y.value.style.height="auto")})),(0,a.YP)((()=>e.dense),(()=>{!0===e.autogrow&&(0,a.Y3)(D)})),(0,a.Jd)((()=>{L()})),(0,a.bv)((()=>{!0===e.autogrow&&D()})),Object.assign(A,{innerValue:x,fieldClass:(0,a.Fl)((()=>"q-"+(!0===O.value?"textarea":"input")+(!0===e.autogrow?" q-textarea--autogrow":""))),hasShadow:(0,a.Fl)((()=>"file"!==e.type&&"string"===typeof e.shadowText&&0!==e.shadowText.length)),inputRef:y,emitValue:W,hasValue:U,floatingLabel:(0,a.Fl)((()=>!0===U.value&&("number"!==e.type||!1===isNaN(x.value))||(0,i.yV)(e.displayValue))),getControl:()=>(0,a.h)(!0===O.value?"textarea":"input",{ref:y,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,..._.value,...N.value,..."file"!==e.type?{value:B()}:R.value}),getShadowControl:()=>(0,a.h)("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(!0===O.value?"":" text-no-wrap")},[(0,a.h)("span",{class:"invisible"},B()),(0,a.h)("span",e.shadowText)])});const I=(0,i.ZP)(A);return Object.assign(o,{focus:j,select:z,getNativeElement:()=>y.value}),(0,F.g)(o,"nativeEl",(()=>y.value)),I}})},9976:function(e,t,l){l.d(t,{Z:function(){return n}});var a=l(9269);function n(e,t){function l(){const t=e.modelValue;try{const e="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(t)===t&&("length"in t?Array.from(t):[t]).forEach((t=>{e.items.add(t)})),{files:e.files}}catch(l){return{files:void 0}}}return!0===t?(0,a.Fl)((()=>{if("file"===e.type)return l()})):(0,a.Fl)(l)}},5892:function(e,t,l){l.d(t,{Z:function(){return H}});var a=l(9269),n=l(3201);function i(e,t,l,i,o,r){const s=(0,a.up)("q-item-label"),u=(0,a.up)("q-item-section"),c=(0,a.up)("q-item"),d=(0,a.up)("q-list"),m=(0,a.up)("q-file"),f=(0,a.up)("q-card-section"),p=(0,a.up)("q-input"),v=(0,a.up)("q-select"),g=(0,a.up)("q-form"),h=(0,a.up)("q-btn"),y=(0,a.up)("simple-chart"),b=(0,a.up)("q-card");return(0,a.wg)(),(0,a.j4)(b,{flat:""},{default:(0,a.w5)((()=>[l.mini&&e.currentFile?((0,a.wg)(),(0,a.j4)(d,{key:0},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(Object.entries(r.metaPicks),(([t,l])=>((0,a.wg)(),(0,a.j4)(c,{key:t},{default:(0,a.w5)((()=>[(0,a.Wm)(u,null,{default:(0,a.w5)((()=>[(0,a.Wm)(s,null,{default:(0,a.w5)((()=>[(0,a.Uk)((0,n.zw)(t),1)])),_:2},1024),(0,a.Wm)(s,{caption:"",class:(0,n.C_)(`text-${e.setColor}-7`)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,n.zw)(l),1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1024)))),128))])),_:1})):(0,a.kq)("",!0),l.mini?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(f,{key:1},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{modelValue:e.localFiles,"onUpdate:modelValue":t[0]||(t[0]=t=>e.localFiles=t),label:"frametime capture json",clearable:"","max-files":10,multiple:""},null,8,["modelValue"])])),_:1})),!l.mini&&e.currentFile?((0,a.wg)(),(0,a.j4)(f,{key:2},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{class:"row q-col-gutter-sm"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{modelValue:e.comment,"onUpdate:modelValue":t[1]||(t[1]=t=>e.comment=t),label:"comment",clearable:"",class:"col-6"},null,8,["modelValue"]),(0,a.Wm)(p,{modelValue:e.gameName,"onUpdate:modelValue":t[2]||(t[2]=t=>e.gameName=t),label:"game",readonly:"",class:"col-6","error-message":"game name required",error:!r.isNameValid},null,8,["modelValue","error"]),(0,a.Wm)(p,{modelValue:e.CPU,"onUpdate:modelValue":t[3]||(t[3]=t=>e.CPU=t),label:"CPU",disable:!e.currentFile,readonly:"",class:"col-6","error-message":"CPU required",error:!r.isCPUValid},null,8,["modelValue","disable","error"]),(0,a.Wm)(p,{modelValue:e.GPU,"onUpdate:modelValue":t[4]||(t[4]=t=>e.GPU=t),label:"GPU",disable:!e.currentFile,readonly:"",class:"col-6","error-message":"GPU required",error:!r.isGPUValid},null,8,["modelValue","disable","error"]),(0,a.Wm)(p,{modelValue:e.RAM,"onUpdate:modelValue":t[5]||(t[5]=t=>e.RAM=t),label:"RAM",disable:!e.currentFile,readonly:"",class:"col-6","error-message":"RAM required",error:!r.isRAMValid},null,8,["modelValue","disable","error"]),(0,a.Wm)(v,{modelValue:e.resolution,"onUpdate:modelValue":t[6]||(t[6]=t=>e.resolution=t),options:e.resOptions,label:"resolution",disable:!e.currentFile,class:"col-6","error-message":"invalid resolution",error:!r.isResValid},null,8,["modelValue","options","disable","error"]),(0,a.Wm)(v,{modelValue:e.gamePreset,"onUpdate:modelValue":t[7]||(t[7]=t=>e.gamePreset=t),options:e.presetOptions,label:"preset",disable:!e.currentFile,class:"col-6","error-message":"invalid game preset",error:!r.isPresetValid},null,8,["modelValue","options","disable","error"]),(0,a.Wm)(v,{modelValue:e.upscale,"onUpdate:modelValue":t[8]||(t[8]=t=>e.upscale=t),options:e.upscaleOptions,label:"upscale",disable:!e.currentFile,class:"col-6","error-message":"invalid upscale preset",error:!r.isUpscaleValid},null,8,["modelValue","options","disable","error"])])),_:1})])),_:1})):(0,a.kq)("",!0),e.previewCapture?((0,a.wg)(),(0,a.j4)(f,{key:3},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{class:"row q-col-gutter-sm"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{"model-value":e.currentFile,readonly:"",clearable:"",class:"col-6",label:"1/"+e.localFiles.length},{append:(0,a.w5)((()=>[(0,a.Wm)(h,{onClick:t[9]||(t[9]=t=>e.localFiles=e.localFiles.slice(1)),color:"red-8",outline:"",class:"q-mr-sm",size:"small"},{default:(0,a.w5)((()=>[(0,a.Uk)(" remove ")])),_:1}),(0,a.Wm)(h,{onClick:r.confirm,color:"blue-8",disable:l.loading||!e.captureReady,outline:"",size:"small"},{default:(0,a.w5)((()=>[(0,a.Uk)(" add ")])),_:1},8,["onClick","disable"])])),_:1},8,["model-value","label"])])),_:1}),(0,a.Wm)(y,{captures:[e.previewCapture],mini:!0},null,8,["captures"])])),_:1})):(0,a.kq)("",!0)])),_:1})}l(4719);var o=l(6957),r=l(225),s=l(291),u=l(1421);const c=["Name","CPU","GPU","RAM","Res","Preset","Upscale"].map((e=>`is${e}Valid`)),d=["FSR","DLSS"],m=["quality","balance","performance"],f=[];d.forEach((e=>{m.forEach((t=>{f.push(`${e}-${t}`)}))}));var p={name:"FileUploader",components:{SimpleChart:u.Z},props:["mini","loading"],data:()=>({localFile:null,localFiles:null,CPU:null,GPU:null,RAM:null,resolution:null,resOptions:["720p","1080p","1440p","WQHD","4K"],syncCap:null,syncCapOptions:[null,40,60,120,144,165],gamePreset:null,presetOptions:["low","medium","high","ultra"],upscale:"off",upscaleOptions:["off",...f],comment:null,gameName:null,parsed:null,creationDate:null,driver:null,previewCapture:null,currentFile:null,captureReady:!1}),computed:{...(0,o.rn)(["currentUser","userRuns"]),metaPicks(){const e={};return this.parsed&&[...s.vO,...s.bX].forEach((t=>{const l=this.parsed.info[t];l&&(e[t]=l)})),e},isNameValid(){return!!this.gameName},isCPUValid(){return!!this.CPU},isGPUValid(){return!!this.GPU},isRAMValid(){return!!this.RAM},isResValid(){const{resolution:e,resOptions:t}=this;return t.includes(e)},isPresetValid(){const{gamePreset:e,presetOptions:t}=this;return t.includes(e)},isUpscaleValid(){const{upscale:e,upscaleOptions:t}=this;return t.includes(e)}},watch:{async localFile(e){if(e){console.log("reading new file");const t=await(0,r.W2)(e);this.parsed=t}else this.parsed=null},parsed(e){e&&e.info?([...s.vO,...s.bX].forEach((t=>{e.info[t]?this[t]=e.info[t]:this[t]=null})),this.sendPreview()):this.$emit("newPreview",null)},async localFiles(e){let t=null;e&&(e.length>0?(this.currentFile=e[0].name,t=await(0,r.W2)(e[0])):this.currentFile=null),t&&t.info?([...s.vO,...s.bX].forEach((e=>{t.info[e]?this[e]=t.info[e]:this[e]=null})),console.log("sending preview",t),this.setPreview(t)):this.previewCapture=null},userRuns(){this.localFile=null}},methods:{setPreview(e){this.previewCapture=e},sendPreview(){const{parsed:e,CPU:t,GPU:l,RAM:a,resolution:n,gamePreset:i,upscale:o,gameName:r,syncCap:s,comment:u}=this;if(e){const c=this.currentUser?this.currentUser.uid:null,d={userId:c,CPU:t,GPU:l,RAM:a,resolution:n,syncCap:s,gameName:r,gamePreset:i,upscale:o,comment:u,frameTimes:e.frameTimes};console.log("sending preview",d)}else this.$emit("newPreview",null)},validateKeys(e,t){if(!t)return this.$emit("formError"),void(this.captureReady=!1);const l=c.filter((t=>t!==e)),a=l.every((e=>this[e]));if(!a)return this.$emit("formError"),void(this.captureReady=!1);this.sendPreview(),this.$emit("formValidated"),this.captureReady=!0},testInvalid(){this.gamePreset=null},confirm(){if(this.loading)throw Error("loading");const{previewCapture:e,CPU:t,GPU:l,RAM:a,resolution:n,gamePreset:i,upscale:o,gameName:r,syncCap:s,comment:u}=this,c=this.currentUser?this.currentUser.uid:null,d={userId:c,CPU:t,GPU:l,RAM:a,resolution:n,syncCap:s,gameName:r,gamePreset:i,upscale:o,comment:u,frameTimes:e.frameTimes};this.$emit("newUpload",d),this.localFiles=this.localFiles.slice(1)}},created(){const{validateKeys:e}=this;c.forEach((t=>{this.$watch(t,(l=>{e(t,l)}))}))}},v=l(7617),g=l(8055),h=l(2146),y=l(5246),b=l(2278),w=l(3712),F=l(9501),k=l(6237),x=l(1384),C=l(6632),V=l(9724),S=l(1013),P=l(3027);function M(e,t,l,a){const n=[];return e.forEach((e=>{!0===a(e)?n.push(e):t.push({failedPropValidation:l,file:e})})),n}function R(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),(0,P.NS)(e)}const U={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},q=["rejected"];function A({editable:e,dnd:t,getFileInput:l,addFilesToQueue:n}){const{props:i,emit:o,proxy:r}=(0,a.FN)(),s=(0,k.iH)(null),u=(0,a.Fl)((()=>void 0!==i.accept?i.accept.split(",").map((e=>(e=e.trim(),"*"===e?"*/":(e.endsWith("/*")&&(e=e.slice(0,e.length-1)),e.toUpperCase())))):null)),c=(0,a.Fl)((()=>parseInt(i.maxFiles,10))),d=(0,a.Fl)((()=>parseInt(i.maxTotalSize,10)));function m(t){if(e.value)if(t!==Object(t)&&(t={target:null}),null!==t.target&&!0===t.target.matches('input[type="file"]'))0===t.clientX&&0===t.clientY&&(0,P.sT)(t);else{const e=l();e&&e!==t.target&&e.click(t)}}function f(t){e.value&&t&&n(null,t)}function p(e,t,l,a){let n=Array.from(t||e.target.files);const r=[],s=()=>{0!==r.length&&o("rejected",r)};if(void 0!==i.accept&&-1===u.value.indexOf("*/")&&(n=M(n,r,"accept",(e=>u.value.some((t=>e.type.toUpperCase().startsWith(t)||e.name.toUpperCase().endsWith(t))))),0===n.length))return s();if(void 0!==i.maxFileSize){const e=parseInt(i.maxFileSize,10);if(n=M(n,r,"max-file-size",(t=>t.size<=e)),0===n.length)return s()}if(!0!==i.multiple&&0!==n.length&&(n=[n[0]]),n.forEach((e=>{e.__key=e.webkitRelativePath+e.lastModified+e.name+e.size})),!0===a){const e=l.map((e=>e.__key));n=M(n,r,"duplicate",(t=>!1===e.includes(t.__key)))}if(0===n.length)return s();if(void 0!==i.maxTotalSize){let e=!0===a?l.reduce(((e,t)=>e+t.size),0):0;if(n=M(n,r,"max-total-size",(t=>(e+=t.size,e<=d.value))),0===n.length)return s()}if("function"===typeof i.filter){const e=i.filter(n);n=M(n,r,"filter",(t=>e.includes(t)))}if(void 0!==i.maxFiles){let e=!0===a?l.length:0;if(n=M(n,r,"max-files",(()=>(e++,e<=c.value))),0===n.length)return s()}return s(),0!==n.length?n:void 0}function v(e){R(e),!0!==t.value&&(t.value=!0)}function g(e){(0,P.NS)(e);const l=null!==e.relatedTarget||!0!==S.client.is.safari?e.relatedTarget!==s.value:!1===document.elementsFromPoint(e.clientX,e.clientY).includes(s.value);!0===l&&(t.value=!1)}function h(e){R(e);const l=e.dataTransfer.files;0!==l.length&&n(null,l),t.value=!1}function y(e){if(!0===t.value)return(0,a.h)("div",{ref:s,class:`q-${e}__dnd absolute-full`,onDragenter:R,onDragover:R,onDragleave:g,onDrop:h})}return Object.assign(r,{pickFiles:m,addFiles:f}),{pickFiles:m,addFiles:f,onDragover:v,onDragleave:g,processFiles:p,getDndNode:y,maxFilesNumber:c,maxTotalSizeNumber:d}}var O=l(9976),E=l(3856),N=l(7328),_=l(3613),j=(0,E.L)({name:"QFile",inheritAttrs:!1,props:{...C.Cl,...V.Fz,...U,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...C.HJ,...q],setup(e,{slots:t,emit:l,attrs:n}){const{proxy:i}=(0,a.FN)(),o=(0,C.tL)(),r=(0,k.iH)(null),s=(0,k.iH)(!1),u=(0,V.Do)(e),{pickFiles:c,onDragover:d,onDragleave:m,processFiles:f,getDndNode:p}=A({editable:o.editable,dnd:s,getFileInput:z,addFilesToQueue:T}),v=(0,O.Z)(e),g=(0,a.Fl)((()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[])),h=(0,a.Fl)((()=>(0,C.yV)(g.value))),y=(0,a.Fl)((()=>g.value.map((e=>e.name)).join(", "))),b=(0,a.Fl)((()=>(0,N.rB)(g.value.reduce(((e,t)=>e+t.size),0)))),w=(0,a.Fl)((()=>({totalSize:b.value,filesNumber:g.value.length,maxFiles:e.maxFiles}))),F=(0,a.Fl)((()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:u.value,...n,id:o.targetUid.value,disabled:!0!==o.editable.value}))),S=(0,a.Fl)((()=>"q-file q-field--auto-height"+(!0===s.value?" q-file--dnd":""))),M=(0,a.Fl)((()=>!0===e.multiple&&!0===e.append));function R(e){const t=g.value.slice();t.splice(e,1),q(t)}function U(e){const t=g.value.indexOf(e);t>-1&&R(t)}function q(t){l("update:modelValue",!0===e.multiple?t:t[0])}function E(e){13===e.keyCode&&(0,P.X$)(e)}function j(e){13!==e.keyCode&&32!==e.keyCode||c(e)}function z(){return r.value}function T(t,l){const a=f(t,l,g.value,M.value),n=z();void 0!==n&&null!==n&&(n.value=""),void 0!==a&&((!0===e.multiple?e.modelValue&&a.every((e=>g.value.includes(e))):e.modelValue===a[0])||q(!0===M.value?g.value.concat(a):a))}function Z(){return[(0,a.h)("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function $(){if(void 0!==t.file)return 0===g.value.length?Z():g.value.map(((e,l)=>t.file({index:l,file:e,ref:this})));if(void 0!==t.selected)return 0===g.value.length?Z():t.selected({files:g.value,ref:this});if(!0===e.useChips)return 0===g.value.length?Z():g.value.map(((t,l)=>(0,a.h)(x.Z,{key:"file-"+l,removable:o.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{R(l)}},(()=>(0,a.h)("span",{class:"ellipsis",textContent:t.name})))));const l=void 0!==e.displayValue?e.displayValue:y.value;return 0!==l.length?[(0,a.h)("div",{class:e.inputClass,style:e.inputStyle,textContent:l})]:Z()}function W(){const t={ref:r,...F.value,...v.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:T};return!0===e.multiple&&(t.multiple=!0),(0,a.h)("input",t)}return Object.assign(o,{fieldClass:S,emitValue:q,hasValue:h,inputRef:r,innerValue:g,floatingLabel:(0,a.Fl)((()=>!0===h.value||(0,C.yV)(e.displayValue))),computedCounter:(0,a.Fl)((()=>{if(void 0!==e.counterLabel)return e.counterLabel(w.value);const t=e.maxFiles;return`${g.value.length}${void 0!==t?" / "+t:""} (${b.value})`})),getControlChild:()=>p("file"),getControl:()=>{const t={ref:o.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return!0===o.editable.value&&Object.assign(t,{onDragover:d,onDragleave:m,onKeydown:E,onKeyup:j}),(0,a.h)("div",t,[W()].concat($()))}}),Object.assign(i,{removeAtIndex:R,removeFile:U,getNativeElement:()=>r.value}),(0,_.g)(i,"nativeEl",(()=>r.value)),(0,C.ZP)(o)}}),z=l(6146),T=l(64),Z=l(4300),$=l(6380),W=(0,E.L)({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:l}){const n=(0,a.FN)(),i=(0,k.iH)(null);let o=0;const r=[];function s(t){const a="boolean"===typeof t?t:!0!==e.noErrorFocus,n=++o,i=(e,t)=>{l("validation"+(!0===e?"Success":"Error"),t)},s=e=>{const t=e.validate();return"function"===typeof t.then?t.then((t=>({valid:t,comp:e})),(t=>({valid:!1,comp:e,err:t}))):Promise.resolve({valid:t,comp:e})},u=!0===e.greedy?Promise.all(r.map(s)).then((e=>e.filter((e=>!0!==e.valid)))):r.reduce(((e,t)=>e.then((()=>s(t).then((e=>{if(!1===e.valid)return Promise.reject(e)}))))),Promise.resolve()).catch((e=>[e]));return u.then((e=>{if(void 0===e||0===e.length)return n===o&&i(!0),!0;if(n===o){const{comp:t,err:l}=e[0];if(void 0!==l&&console.error(l),i(!1,t),!0===a){const t=e.find((({comp:e})=>"function"===typeof e.focus&&!1===(0,$.$D)(e.$)));void 0!==t&&t.comp.focus()}}return!1}))}function u(){o++,r.forEach((e=>{"function"===typeof e.resetValidation&&e.resetValidation()}))}function c(t){void 0!==t&&(0,P.NS)(t);const a=o+1;s().then((n=>{a===o&&!0===n&&(void 0!==e.onSubmit?l("submit",t):void 0!==t&&void 0!==t.target&&"function"===typeof t.target.submit&&t.target.submit())}))}function d(t){void 0!==t&&(0,P.NS)(t),l("reset"),(0,a.Y3)((()=>{u(),!0===e.autofocus&&!0!==e.noResetFocus&&m()}))}function m(){(0,z.jd)((()=>{if(null===i.value)return;const e=i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"),(e=>e.tabIndex>-1));null!==e&&void 0!==e&&e.focus({preventScroll:!0})}))}(0,a.JJ)(Z.vh,{bindComponent(e){r.push(e)},unbindComponent(e){const t=r.indexOf(e);t>-1&&r.splice(t,1)}});let f=!1;return(0,a.se)((()=>{f=!0})),(0,a.dl)((()=>{!0===f&&!0===e.autofocus&&m()})),(0,a.bv)((()=>{!0===e.autofocus&&m()})),Object.assign(n.proxy,{validate:s,resetValidation:u,submit:c,reset:d,focus:m,getValidationComponents:()=>r}),()=>(0,a.h)("form",{class:"q-form",ref:i,onSubmit:c,onReset:d},(0,T.KR)(t.default))}}),D=l(6053),Y=l(4949),L=l(9804),B=l(1410),I=l.n(B);const Q=(0,v.Z)(p,[["render",i]]);var H=Q;I()(p,"components",{QCard:g.Z,QList:h.Z,QItem:y.Z,QItemSection:b.Z,QItemLabel:w.Z,QCardSection:F.Z,QFile:j,QForm:W,QInput:D.Z,QSelect:Y.Z,QBtn:L.Z})}}]);
//# sourceMappingURL=892.7211f835.js.map