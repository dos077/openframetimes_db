"use strict";(self["webpackChunkframetime_db"]=self["webpackChunkframetime_db"]||[]).push([[845],{31:function(e,l,o){o.r(l),o.d(l,{default:function(){return ie}});var n=o(9269);const t={class:"row q-col-gutter-md"};function a(e,l,o,a,r,s){const i=(0,n.up)("profile-panel"),u=(0,n.up)("upload-panel"),d=(0,n.up)("runs-manager"),c=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(c,{padding:"",class:"text-left"},{default:(0,n.w5)((()=>[(0,n._)("div",t,[(0,n.Wm)(i),e.currentUser?((0,n.wg)(),(0,n.j4)(u,{key:0})):(0,n.kq)("",!0),e.currentUser?((0,n.wg)(),(0,n.j4)(d,{key:1})):(0,n.kq)("",!0)])])),_:1})}var r=o(3201);const s={class:"col-12 text-left"},i={class:"col-6"},u={class:"col-6"};function d(e,l,o,t,a,d){const c=(0,n.up)("q-toolbar-title"),p=(0,n.up)("q-toolbar"),m=(0,n.up)("q-input"),w=(0,n.up)("q-card-section"),f=(0,n.up)("q-btn"),h=(0,n.up)("q-card-actions"),g=(0,n.up)("q-card");return(0,n.wg)(),(0,n.iD)("div",s,[e.currentUser?((0,n.wg)(),(0,n.j4)(g,{key:0,flat:"",bordered:""},{default:(0,n.w5)((()=>[(0,n.Wm)(p,null,{default:(0,n.w5)((()=>[(0,n.Wm)(c,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Use Profile ")])),_:1})])),_:1}),(0,n.Wm)(w,{class:"row q-col-gutter-sm"},{default:(0,n.w5)((()=>[(0,n._)("div",i,[(0,n.Wm)(m,{modelValue:e.currentUser.email,"onUpdate:modelValue":l[0]||(l[0]=l=>e.currentUser.email=l),label:"email",readonly:""},null,8,["modelValue"])]),(0,n._)("div",u,[(0,n.Wm)(m,{modelValue:e.newName,"onUpdate:modelValue":l[1]||(l[1]=l=>e.newName=l),label:"user name"},null,8,["modelValue"])])])),_:1}),(0,n.Wm)(h,null,{default:(0,n.w5)((()=>[d.isChange?((0,n.wg)(),(0,n.j4)(f,{key:0,onClick:d.prepUpdate,flat:"",color:"blue"},{default:(0,n.w5)((()=>[(0,n.Uk)(" update ")])),_:1},8,["onClick"])):(0,n.kq)("",!0),(0,n.Wm)(f,{onClick:e.deleteUser,flat:"",size:"sm",color:"red"},{default:(0,n.w5)((()=>[(0,n.Uk)("delete profile")])),_:1},8,["onClick"])])),_:1}),(0,n.Wm)(h,null,{default:(0,n.w5)((()=>[(0,n.Wm)(f,{onClick:e.logOut,color:"grey-9",outline:""},{default:(0,n.w5)((()=>[(0,n.Uk)(" log out ")])),_:1},8,["onClick"])])),_:1})])),_:1})):(0,n.kq)("",!0),e.currentUser?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(g,{key:1,flat:"",bordered:"",style:{"max-width":"25rem",margin:"0 auto"}},{default:(0,n.w5)((()=>[(0,n.Wm)(p,null,{default:(0,n.w5)((()=>[(0,n.Wm)(c,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Login with Google ")])),_:1})])),_:1}),(0,n.Wm)(w,null,{default:(0,n.w5)((()=>[(0,n.Uk)((0,r.zw)(e.explainer),1)])),_:1}),(0,n.Wm)(h,null,{default:(0,n.w5)((()=>[(0,n.Wm)(f,{onClick:e.logIn,outline:""},{default:(0,n.w5)((()=>[(0,n.Uk)("login")])),_:1},8,["onClick"])])),_:1})])),_:1}))])}var c=o(6957);const p="This database identifies user and their captures with Google login. The only information collected through login is your email.";var m={name:"ProfilePanel",data:()=>({newName:null,confirmDelete:!1,explainer:p}),computed:{...(0,c.rn)(["currentUser"]),isChange(){return this.newName!==this.currentUser.displayName}},watch:{currentUser:{immediate:!0,handler(e){e&&(this.newName=e.displayName)}}},methods:{...(0,c.nv)(["logIn","logOut","deleteUser","updateUser"]),prepUpdate(){if(!this.isChange||!this.newName)return;const e={};e.displayName=this.newName,this.updateUser(e)}}},w=o(7617),f=o(8055),h=o(366),g=o(8623),b=o(9501),v=o(6053),k=o(4333),q=o(9804),y=o(1410),C=o.n(y);const U=(0,w.Z)(m,[["render",d]]);var _=U;C()(m,"components",{QCard:f.Z,QToolbar:h.Z,QToolbarTitle:g.Z,QCardSection:b.Z,QInput:v.Z,QCardActions:k.Z,QBtn:q.Z});const R={class:"col-12"},W={key:0},Z={key:1,class:"col-12"};function S(e,l,o,t,a,s){const i=(0,n.up)("q-toolbar-title"),u=(0,n.up)("run-filters"),d=(0,n.up)("q-btn-dropdown"),c=(0,n.up)("q-space"),p=(0,n.up)("q-btn"),m=(0,n.up)("q-toolbar"),w=(0,n.up)("q-table"),f=(0,n.up)("q-card-section"),h=(0,n.up)("q-card-actions"),g=(0,n.up)("q-card"),b=(0,n.up)("q-dialog"),v=(0,n.up)("simple-chart");return(0,n.wg)(),(0,n.iD)("div",R,[s.displayRuns&&s.displayRuns.length>0?((0,n.wg)(),(0,n.j4)(w,{key:0,rows:s.displayRuns,columns:e.tableCols,"row-key":"runId",selection:"multiple",selected:e.runsSelected,"onUpdate:selected":l[1]||(l[1]=l=>e.runsSelected=l),pagination:{rowsPerPage:10},bordered:"",flat:""},{top:(0,n.w5)((()=>[(0,n.Wm)(m,null,{default:(0,n.w5)((()=>[(0,n.Wm)(i,{shrink:""},{default:(0,n.w5)((()=>[(0,n.Uk)("Uploaded Runs")])),_:1}),(0,n.Wm)(d,{flat:"",label:"filters"},{default:(0,n.w5)((()=>[(0,n.Wm)(u,{metaPool:s.metaPool,runPool:s.runPool,onNewRuns:s.newFilteredRuns},null,8,["metaPool","runPool","onNewRuns"])])),_:1}),(0,n.Wm)(c),e.runsSelected.length>0?((0,n.wg)(),(0,n.iD)("span",W,[(0,n.Wm)(p,{onClick:s.showPreview,color:"blue",outline:"",class:"q-mr-md"},{default:(0,n.w5)((()=>[(0,n.Uk)(" preview ")])),_:1},8,["onClick"]),(0,n.Wm)(p,{onClick:l[0]||(l[0]=()=>e.confirmDelete=!0),color:"red",outline:""},{default:(0,n.w5)((()=>[(0,n.Uk)(" delete ")])),_:1})])):(0,n.kq)("",!0)])),_:1})])),_:1},8,["rows","columns","selected"])):(0,n.kq)("",!0),(0,n.Wm)(b,{modelValue:e.confirmDelete,"onUpdate:modelValue":l[4]||(l[4]=l=>e.confirmDelete=l)},{default:(0,n.w5)((()=>[(0,n.Wm)(g,null,{default:(0,n.w5)((()=>[(0,n.Wm)(f,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Deleting "+(0,r.zw)(e.runsSelected.length)+" runs ",1)])),_:1}),(0,n.Wm)(h,null,{default:(0,n.w5)((()=>[(0,n.Wm)(p,{color:"red",onClick:l[2]||(l[2]=e=>s.deleteRuns())},{default:(0,n.w5)((()=>[(0,n.Uk)(" confirm ")])),_:1}),(0,n.Wm)(p,{onClick:l[3]||(l[3]=()=>e.confirmDelete=!1)},{default:(0,n.w5)((()=>[(0,n.Uk)(" cancel ")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),e.previews&&e.previews.length>0?((0,n.wg)(),(0,n.iD)("div",Z,[(0,n.Wm)(v,{captures:e.previews},null,8,["captures"])])):(0,n.kq)("",!0)])}o(4719);var B=o(291),P=o(938),D=o(9550);const Q=B.Kn.map((e=>({label:e,field:e,align:"left",format:e=>!e||e.length<10?e:`...${e.slice(e.length-8)}`})));Q.push({label:"comment",field:"comment",align:"left"});var F={name:"RunsManager",components:{SimpleChart:P.Z,RunFilters:D.Z},data:()=>({tableCols:Q,previews:[],filteredRuns:[],runsSelected:[],confirmDelete:!1}),computed:{...(0,c.rn)(["currentUser","userRuns"]),metaPool(){return this.$store.state.metas.metas},runPool(){return this.userRuns?this.userRuns.map((({runId:e})=>e)):[]},displayRuns(){const{userRuns:e,filteredRuns:l}=this;return l&&0!==l.length?e.filter((({runId:e})=>l.includes(e))):e}},methods:{...(0,c.nv)(["removeRun"]),showPreview(){this.previews=this.runsSelected},closePreview(){this.previews=[]},deleteRuns(){this.runsSelected.forEach((e=>{this.$store.dispatch("removeRun",e)})),this.confirmDelete=!1},newFilteredRuns(e){this.filteredRuns=e,this.runsSelected=[]}},created(){this.$store.state.metas.metas||this.$store.dispatch("metas/loadMetas")}},V=o(8579),N=o(6237),T=o(4633),j=o(3856),x=o(64),A=(0,j.L)({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:l}){const o=(0,n.Fl)((()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter((l=>!0===e[l])).map((e=>`q-btn-group--${e}`)).join(" ");return"q-btn-group row no-wrap"+(0!==l.length?" "+l:"")+(!0===e.spread?" q-btn-group--spread":" inline")}));return()=>(0,n.h)("div",{class:o.value},(0,x.KR)(l.default))}}),O=o(5645),I=o(7396),$=o(959),H=o(3027),M=o(1878);const z=Object.keys(I.b7),L=e=>z.reduce(((l,o)=>{const n=e[o];return void 0!==n&&(l[o]=n),l}),{});var E=(0,j.L)({name:"QBtnDropdown",props:{...I.b7,...$.D,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:l,emit:o}){const{proxy:t}=(0,n.FN)(),a=(0,N.iH)(e.modelValue),r=(0,N.iH)(null),s=(0,M.Z)(),i=(0,n.Fl)((()=>{const l={"aria-expanded":!0===a.value?"true":"false","aria-haspopup":"true","aria-controls":s,"aria-label":e.toggleAriaLabel||t.$q.lang.label[!0===a.value?"collapse":"expand"](e.label)};return(!0===e.disable||!1===e.split&&!0===e.disableMainBtn||!0===e.disableDropdown)&&(l["aria-disabled"]="true"),l})),u=(0,n.Fl)((()=>"q-btn-dropdown__arrow"+(!0===a.value&&!1===e.noIconAnimation?" rotate-180":"")+(!1===e.split?" q-btn-dropdown__arrow-container":""))),d=(0,n.Fl)((()=>(0,I._V)(e))),c=(0,n.Fl)((()=>L(e)));function p(e){a.value=!0,o("beforeShow",e)}function m(e){o("show",e),o("update:modelValue",!0)}function w(e){a.value=!1,o("beforeHide",e)}function f(e){o("hide",e),o("update:modelValue",!1)}function h(e){o("click",e)}function g(e){(0,H.sT)(e),k(),o("click",e)}function b(e){null!==r.value&&r.value.toggle(e)}function v(e){null!==r.value&&r.value.show(e)}function k(e){null!==r.value&&r.value.hide(e)}return(0,n.YP)((()=>e.modelValue),(e=>{null!==r.value&&r.value[e?"show":"hide"]()})),(0,n.YP)((()=>e.split),k),Object.assign(t,{show:v,hide:k,toggle:b}),(0,n.bv)((()=>{!0===e.modelValue&&v()})),()=>{const o=[(0,n.h)(T.Z,{class:u.value,name:e.dropdownIcon||t.$q.iconSet.arrow.dropdown})];return!0!==e.disableDropdown&&o.push((0,n.h)(O.Z,{ref:r,id:s,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:p,onShow:m,onBeforeHide:w,onHide:f},l.default)),!1===e.split?(0,n.h)(q.Z,{class:"q-btn-dropdown q-btn-dropdown--simple",...c.value,...i.value,disable:!0===e.disable||!0===e.disableMainBtn,noWrap:!0,round:!1,onClick:h},{default:()=>(0,x.KR)(l.label,[]).concat(o),loading:l.loading}):(0,n.h)(A,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...d.value,glossy:e.glossy,stretch:e.stretch},(()=>[(0,n.h)(q.Z,{class:"q-btn-dropdown--current",...c.value,disable:!0===e.disable||!0===e.disableMainBtn,noWrap:!0,round:!1,onClick:g},{default:l.label,loading:l.loading}),(0,n.h)(q.Z,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...i.value,...d.value,disable:!0===e.disable||!0===e.disableDropdown,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},(()=>o))]))}}}),G=o(3139),K=o(1682);const X=(0,w.Z)(F,[["render",S]]);var Y=X;C()(F,"components",{QTable:V.Z,QToolbar:h.Z,QToolbarTitle:g.Z,QBtnDropdown:E,QSpace:G.Z,QBtn:q.Z,QDialog:K.Z,QCard:f.Z,QCardSection:b.Z,QCardActions:k.Z});const J={class:"col-12"};function ee(e,l,o,t,a,r){const s=(0,n.up)("q-toolbar-title"),i=(0,n.up)("q-toolbar"),u=(0,n.up)("q-card-section"),d=(0,n.up)("file-uploader"),c=(0,n.up)("simple-chart"),p=(0,n.up)("q-card");return(0,n.wg)(),(0,n.iD)("div",J,[(0,n.Wm)(p,{flat:"",bordered:""},{default:(0,n.w5)((()=>[(0,n.Wm)(i,null,{default:(0,n.w5)((()=>[(0,n.Wm)(s,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Upload to Database ")])),_:1})])),_:1}),(0,n.Wm)(u,{class:"text-caption"},{default:(0,n.w5)((()=>[(0,n.Uk)(" only captures from CapFrameX are supported at this time ")])),_:1}),(0,n.Wm)(d,{onNewPreview:r.setPreview,onFormValidated:l[0]||(l[0]=e=>r.setFormReady(!0)),onFormError:l[1]||(l[1]=e=>r.setFormReady(!1)),loading:e.loading,onNewUpload:r.addRun},null,8,["onNewPreview","loading","onNewUpload"]),e.previewCapture?((0,n.wg)(),(0,n.j4)(u,{key:0},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{captures:[e.previewCapture]},null,8,["captures"])])),_:1})):(0,n.kq)("",!0)])),_:1})])}var le=o(5892),oe={name:"UploadPanel",components:{SimpleChart:P.Z,FileUploader:le.Z},data:()=>({previewCapture:null,loading:!1,isFormReady:!1}),computed:{captureReady(){const{previewCapture:e,isFormReady:l}=this;return!(!e||!e.frameTimes)&&l}},watch:{parsed(e){e&&e.info&&["comment",...B.vO,...B.bX].forEach((l=>{e.info[l]?this[l]=e.info[l]:this[l]=null}))}},methods:{setPreview(e){this.previewCapture=e},async addRun(e){if(this.loading=!0,console.log("preparing preview for uploadt",e),!e||!e.frameTimes)return;if(B.vO.some((l=>!e[l])))return;const l={frameTimes:e.frameTimes};[...B.bX,...B.vO].forEach((o=>{e[o]&&(l[o]=e[o])})),this.$store.dispatch("addRun",l),this.localFile=null,this.loading=!1},async removeRun(e){this.$store.dispatch("removeRun",e)},setFormReady(e){this.isFormReady=e}}};const ne=(0,w.Z)(oe,[["render",ee]]);var te=ne;C()(oe,"components",{QCard:f.Z,QToolbar:h.Z,QToolbarTitle:g.Z,QCardSection:b.Z});var ae={name:"UserProfile",components:{ProfilePanel:_,RunsManager:Y,UploadPanel:te},computed:{...(0,c.rn)(["currentUser"])}},re=o(8906);const se=(0,w.Z)(ae,[["render",a]]);var ie=se;C()(ae,"components",{QPage:re.Z})}}]);
//# sourceMappingURL=profile.96c7bc40.js.map