/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

const strAnimations = {
    pulse: `@keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }`,
    spin: `@keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }`,
    cleaning: `@keyframes cleaning {
        0% {
            transform: rotate(0) translate(0);
        }
        5% {
            transform: rotate(0) translate(0, -3px);
        }
        10% {
            transform: rotate(0) translate(0, 1px);
        }
        15% {
            transform: rotate(0) translate(0);
        }

        20% {
            transform: rotate(30deg) translate(0);
        }
        25% {
            transform: rotate(30deg) translate(0, -3px);
        }
        30% {
            transform: rotate(30deg) translate(0, 1px);
        }
        35% {
            transform: rotate(30deg) translate(0);
        }
        40% {
            transform: rotate(0) translate(0);
        }

        45% {
            transform: rotate(-30deg) translate(0);
        }
        50% {
            transform: rotate(-30deg) translate(0, -3px);
        }
        55% {
            transform: rotate(-30deg) translate(0, 1px);
        }
        60% {
            transform: rotate(-30deg) translate(0);
        }
        70% {
            transform: rotate(0deg) translate(0);
        }
        100% {
            transform: rotate(0deg);
        }
    }`,
    returning: `@keyframes returning {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(20deg);
        }
        50% {
            transform: rotate(0);
        }
        75% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0);
        }
    }`,
};
({
    pulse: i$5 `
    ${r$4(strAnimations.pulse)}
  `,
    spin: i$5 `
    ${r$4(strAnimations.spin)}
  `,
    cleaning: i$5 `
    ${r$4(strAnimations.cleaning)}
  `,
    returning: i$5 `
    ${r$4(strAnimations.returning)}
  `,
});
const animations = i$5 `
  ${r$4(Object.values(strAnimations).join("\n"))}
`;

const defaultColorCss = i$5 `
  --rgb-error-color: 219, 68, 55;
  --default-green: 76, 175, 80;
  --default-orange: 255, 152, 0;
  --default-red: 244, 67, 54;
  --default-disabled: 189, 189, 189;
`;
const defaultDarkColorCss = i$5 `
  --default-disabled: 111, 111, 111;
`;

const themeVariables = i$5 `
  /* Equitherm-specific colors (no HA equivalent) */
  --rgb-heating: var(--eq-rgb-heating, 249, 115, 22);
  --rgb-cold: var(--eq-rgb-cold, 59, 130, 246);
  --gradient-cold: var(--eq-gradient-cold, #3b82f6);
  --gradient-hot: var(--eq-gradient-hot, #f97316);
  --dot-glow: var(--eq-dot-glow, rgba(var(--rgb-heating), 0.4));

  /* Curve gradient */
  --curve-gradient-start: var(--eq-curve-gradient-start, 211, 47, 47);
  --curve-gradient-end: var(--eq-curve-gradient-end, var(--rgb-state-climate-cool));

  /* Badge colors */
  --badge-heating-bg: var(--eq-badge-heating-bg, #f97316);
  --badge-heating-color: var(--eq-badge-heating-color, #ffffff);
  --badge-cooling-bg: var(--eq-badge-cooling-bg, #3b82f6);
  --badge-cooling-color: var(--eq-badge-cooling-color, #ffffff);
  --badge-drying-bg: var(--eq-badge-drying-bg, #4caf50);
  --badge-drying-color: var(--eq-badge-drying-color, #ffffff);
  --badge-idle-bg: var(--eq-badge-idle-bg, var(--secondary-background-color, #e5e5e5));
  --badge-idle-color: var(--eq-badge-idle-color, var(--secondary-text-color, #666));

  /* Title */
  --title-padding: var(--eq-title-padding, 24px 12px 8px);
  --title-spacing: var(--eq-title-spacing, 8px);
  --title-font-size: var(--eq-title-font-size, 24px);
  --title-font-weight: var(--eq-title-font-weight, normal);
  --title-line-height: var(--eq-title-line-height, 32px);
  --title-color: var(--eq-title-color, var(--primary-text-color));
  --title-letter-spacing: var(--eq-title-letter-spacing, -0.288px);
  --subtitle-font-size: var(--eq-subtitle-font-size, 16px);
  --subtitle-font-weight: var(--eq-subtitle-font-weight, normal);
  --subtitle-line-height: var(--eq-subtitle-line-height, 24px);
  --subtitle-color: var(--eq-subtitle-color, var(--secondary-text-color));
  --subtitle-letter-spacing: var(--eq-subtitle-letter-spacing, 0px);
`;
const themeColorCss = i$5 `
  /* Equitherm-specific colors */
  --rgb-success: var(--eq-rgb-success, var(--default-green));
  --rgb-warning: var(--eq-rgb-warning, var(--default-orange));
  --rgb-danger: var(--eq-rgb-danger, var(--default-red));
  --rgb-disabled: var(--eq-rgb-disabled, var(--default-disabled));

  /* State climate colors — kept as RGB triples for eq-badge-info and ECharts */
  --rgb-state-climate-auto: var(--eq-rgb-state-climate-auto, 146, 107, 199);
  --rgb-state-climate-cool: var(--eq-rgb-state-climate-cool, 59, 130, 246);
  --rgb-state-climate-dry: var(--eq-rgb-state-climate-dry, 76, 175, 80);
  --rgb-state-climate-fan-only: var(--eq-rgb-state-climate-fan-only, 158, 158, 158);
  --rgb-state-climate-heat: var(--eq-rgb-state-climate-heat, 249, 115, 22);
  --rgb-state-climate-heat-cool: var(--eq-rgb-state-climate-heat-cool, 146, 107, 199);
  --rgb-state-climate-idle: var(--eq-rgb-state-climate-idle, 158, 158, 158);
  --rgb-state-climate-off: var(--eq-rgb-state-climate-off, 158, 158, 158);
`;

/** Temperature unit conversion utilities. */
const FACTOR = 9 / 5;
function isImperial(hass) {
    return hass?.config?.unit_system?.temperature === '°F';
}
/** Convert an absolute °C value to the user's display unit (°F: × 9/5 + 32). */
function celsiusToDisplay(celsius, imperial) {
    return imperial ? celsius * FACTOR + 32 : celsius;
}
/** Convert a display-unit value back to °C. */
function displayToCelsius(display, imperial) {
    return imperial ? (display - 32) / FACTOR : display;
}
/** Convert a °C delta to the user's display unit (°F: × 9/5, no offset). */
function celsiusToDisplayDelta(celsius, imperial) {
    return imperial ? celsius * FACTOR : celsius;
}
/** Convert a display-unit delta back to °C. */
function displayDeltaToCelsius(display, imperial) {
    return imperial ? display / FACTOR : display;
}

function computeDarkMode(hass) {
    if (!hass)
        return false;
    return hass.themes.darkMode;
}
class EquithermBaseElement extends i$2 {
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            const currentDarkMode = computeDarkMode(changedProps.get("hass"));
            const newDarkMode = computeDarkMode(this.hass);
            if (currentDarkMode !== newDarkMode) {
                this.toggleAttribute("dark-mode", newDarkMode);
            }
        }
    }
    /** Whether HA is configured for °F */
    get _isImperial() {
        return isImperial(this.hass);
    }
    /** Convert an absolute °C value to the user's display unit */
    _toDisplayTemp(celsius) {
        return celsiusToDisplay(celsius, this._isImperial);
    }
    /** Convert a display-unit value (°F or °C) back to °C for calculations */
    _fromDisplayTemp(display) {
        return displayToCelsius(display, this._isImperial);
    }
    /** Convert a °C delta to the user's display unit (scales only, no offset) */
    _toDisplayDelta(celsius) {
        return celsiusToDisplayDelta(celsius, this._isImperial);
    }
    /** Convert a display-unit delta back to °C */
    _fromDisplayDelta(display) {
        return displayDeltaToCelsius(display, this._isImperial);
    }
    static get styles() {
        return [
            animations,
            i$5 `
        :host {
          ${defaultColorCss}
        }
        :host([dark-mode]) {
          ${defaultDarkColorCss}
        }
        :host {
          ${themeColorCss}
          ${themeVariables}
        }
      `,
        ];
    }
}
__decorate([
    n$1({ attribute: false })
], EquithermBaseElement.prototype, "hass", void 0);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

// Polymer legacy event helpers used courtesy of the Polymer project.
//
// Copyright (c) 2017 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param {{ bubbles: (boolean|undefined),
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

const computeDomain = (entityId) => entityId.substring(0, entityId.indexOf("."));

function ensureArray(value) {
    if (value === undefined || value === null || Array.isArray(value)) {
        return value;
    }
    return [value];
}

const computeAreaName = (area) => area.name?.trim();

const computeDeviceName = (device) => (device.name_by_user || device.name)?.trim();

/** Compute the object ID of a state. */
const computeObjectId = (entityId) => entityId.slice(entityId.indexOf(".") + 1);

const computeStateNameFromEntityAttributes = (entityId, attributes) => attributes.friendly_name === undefined
    ? computeObjectId(entityId).replace(/_/g, " ")
    : (attributes.friendly_name ?? "").toString();
const computeStateName = (stateObj) => computeStateNameFromEntityAttributes(stateObj.entity_id, stateObj.attributes);

const SUFFIXES = [" ", ": ", " - "];
/**
 * Strips a device name from an entity name.
 */
const stripPrefixFromEntityName = (entityName, prefix) => {
    const lowerCasedEntityName = entityName.toLowerCase();
    const lowerCasedPrefix = prefix.toLowerCase();
    for (const suffix of SUFFIXES) {
        const lowerCasedPrefixWithSuffix = `${lowerCasedPrefix}${suffix}`;
        if (lowerCasedEntityName.startsWith(lowerCasedPrefixWithSuffix)) {
            const newName = entityName.substring(lowerCasedPrefixWithSuffix.length);
            if (newName.length) {
                return hasUpperCase(newName.substring(0, newName.indexOf(" ")))
                    ? newName
                    : newName[0].toUpperCase() + newName.slice(1);
            }
        }
    }
    return undefined;
};
const hasUpperCase = (str) => str.toLowerCase() !== str;

const computeEntityName = (stateObj, entities, devices) => {
    const entry = entities[stateObj.entity_id];
    if (!entry) {
        return computeStateName(stateObj);
    }
    return computeEntityEntryName(entry, devices);
};
const computeEntityEntryName = (entry, devices) => {
    const name = entry.name ||
        ("original_name" in entry && entry.original_name != null
            ? String(entry.original_name)
            : undefined);
    const device = entry.device_id ? devices[entry.device_id] : undefined;
    if (!device) {
        return name;
    }
    const deviceName = computeDeviceName(device);
    // If the device name is the same as the entity name, consider empty entity name
    if (deviceName === name) {
        return undefined;
    }
    // Remove the device name from the entity name if it starts with it
    if (deviceName && name) {
        return stripPrefixFromEntityName(name, deviceName) || name;
    }
    return name;
};
const entityUseDeviceName = (stateObj, entities, devices) => !computeEntityName(stateObj, entities, devices);

const computeFloorName = (floor) => floor.name?.trim();

const getEntityContext = (stateObj, entities, devices, areas, floors) => {
    const entry = entities[stateObj.entity_id];
    if (!entry) {
        return {
            entity: null,
            device: null,
            area: null,
            floor: null,
        };
    }
    const entity = entities[entry.entity_id];
    const deviceId = entry.device_id;
    const device = deviceId ? devices[deviceId] : undefined;
    const areaId = entry.area_id || device?.area_id;
    const area = areaId ? areas[areaId] : undefined;
    const floorId = area?.floor_id;
    const floor = floorId ? floors[floorId] : undefined;
    return {
        entity: entity || null,
        device: device || null,
        area: area || null,
        floor: floor || null,
    };
};

const DEFAULT_SEPARATOR = " ";
const computeEntityNameDisplay = (stateObj, name, hass, options) => {
    const { entities, devices, areas, floors } = hass;
    if (typeof name === "string") {
        return name;
    }
    // If no name config is provided, fall back to the friendly name
    if (!name) {
        return computeStateName(stateObj);
    }
    let items = ensureArray(name);
    const separator = DEFAULT_SEPARATOR;
    // If all items are text, just join them
    if (items.every((n) => n.type === "text")) {
        return items.map((item) => ("text" in item ? item.text : "")).join(separator);
    }
    const useDeviceName = entityUseDeviceName(stateObj, entities, devices);
    // If entity uses device name, and device is not already included, replace it with device name
    if (useDeviceName) {
        const hasDevice = items.some((n) => n.type === "device");
        if (!hasDevice) {
            items = items.map((n) => (n.type === "entity" ? { type: "device" } : n));
        }
    }
    const names = computeEntityNameList(stateObj, items, entities, devices, areas, floors);
    // If after processing there is only one name, return that
    if (names.length === 1) {
        return names[0] || "";
    }
    return names.filter((n) => n).join(separator);
};
const computeEntityNameList = (stateObj, name, entities, devices, areas, floors) => {
    const { device, area, floor } = getEntityContext(stateObj, entities, devices, areas, floors);
    return name.map((item) => {
        switch (item.type) {
            case "entity":
                return computeEntityName(stateObj, entities, devices);
            case "device":
                return device ? computeDeviceName(device) : undefined;
            case "area":
                return area ? computeAreaName(area) : undefined;
            case "floor":
                return floor ? computeFloorName(floor) : undefined;
            case "text":
                return item.text;
            default:
                return "";
        }
    });
};

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

const useAmPm = memoizeOne((locale) => {
    if (locale.time_format === "language" || locale.time_format === "system") {
        const testLanguage = locale.time_format === "language" ? locale.language : undefined;
        const test = new Date("January 1, 2023 22:00:00").toLocaleString(testLanguage);
        return test.includes("10");
    }
    return locale.time_format === "12";
});

// 9:15 PM || 21:15
const formatTime = (dateObj, locale) => formatTimeMem(locale).format(dateObj);
const formatTimeMem = memoizeOne((locale) => new Intl.DateTimeFormat(locale.language, {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: useAmPm(locale) ? "h12" : "h23",
}));

var NumberFormat;
(function (NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["quote_decimal"] = "quote_decimal";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
})(NumberFormat || (NumberFormat = {}));
const numberFormatToLocale = (localeOptions) => {
    switch (localeOptions.number_format) {
        case NumberFormat.comma_decimal:
            return ["en-US", "en"];
        case NumberFormat.decimal_comma:
            return ["de", "es", "it"];
        case NumberFormat.space_comma:
            return ["fr", "sv", "cs"];
        case NumberFormat.quote_decimal:
            return ["de-CH"];
        case NumberFormat.system:
            return undefined;
        default:
            return localeOptions.language;
    }
};
const formatNumber = (num, localeOptions, options) => formatNumberToParts(num, localeOptions, options)
    .map((part) => part.value)
    .join("");
const formatNumberToParts = (num, localeOptions, options) => {
    const locale = localeOptions
        ? numberFormatToLocale(localeOptions)
        : undefined;
    if (localeOptions?.number_format !== NumberFormat.none &&
        !Number.isNaN(Number(num))) {
        return new Intl.NumberFormat(locale, getDefaultFormatOptions(num, options)).formatToParts(Number(num));
    }
    if (!Number.isNaN(Number(num)) &&
        num !== "" &&
        localeOptions?.number_format === NumberFormat.none) {
        return new Intl.NumberFormat("en-US", getDefaultFormatOptions(num, {
            ...options,
            useGrouping: false,
        })).formatToParts(Number(num));
    }
    return [{ type: "literal", value: num }];
};
const getDefaultFormatOptions = (num, options) => {
    const defaultOptions = {
        maximumFractionDigits: 2,
        ...options,
    };
    if (typeof num !== "string") {
        return defaultOptions;
    }
    if (!options ||
        (options.minimumFractionDigits === undefined &&
            options.maximumFractionDigits === undefined)) {
        const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
        defaultOptions.minimumFractionDigits = digits;
        defaultOptions.maximumFractionDigits = digits;
    }
    return defaultOptions;
};

// Climate icon/color mappings - backported from HA frontend src/data/climate.ts
const CLIMATE_HVAC_ACTION_TO_MODE = {
    cooling: "cool",
    defrosting: "heat",
    drying: "dry",
    fan: "fan_only",
    heating: "heat",
    idle: "off",
    off: "off",
    preheating: "heat",
};

function memoize(fn, options) {
	const cache = options && options.cache ? options.cache : cacheDefault;
	const serializer = options && options.serializer ? options.serializer : serializerDefault;
	const strategy = options && options.strategy ? options.strategy : strategyDefault;
	return strategy(fn, {
		cache,
		serializer
	});
}
//
// Strategy
//
function isPrimitive(value) {
	return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
	const cacheKey = isPrimitive(arg) ? arg : serializer(arg);
	let computedValue = cache.get(cacheKey);
	if (typeof computedValue === "undefined") {
		computedValue = fn.call(this, arg);
		cache.set(cacheKey, computedValue);
	}
	return computedValue;
}
function variadic(fn, cache, serializer) {
	const args = Array.prototype.slice.call(arguments, 3);
	const cacheKey = serializer(args);
	let computedValue = cache.get(cacheKey);
	if (typeof computedValue === "undefined") {
		computedValue = fn.apply(this, args);
		cache.set(cacheKey, computedValue);
	}
	return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
	return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
	const strategy = fn.length === 1 ? monadic : variadic;
	return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
	return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
const serializerDefault = function() {
	return JSON.stringify(arguments);
};
//
// Cache
//
class ObjectWithoutPrototypeCache {
	cache;
	constructor() {
		this.cache = Object.create(null);
	}
	get(key) {
		return this.cache[key];
	}
	set(key, value) {
		this.cache[key] = value;
	}
}
const cacheDefault = { create: function create() {
	return new ObjectWithoutPrototypeCache();
} };
const strategies = {
	variadic: strategyVariadic};

/**
* https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
* with some tweaks
*/
const DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
* Parse Date time skeleton into Intl.DateTimeFormatOptions
* Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* @public
* @param skeleton skeleton string
*/
function parseDateTimeSkeleton(skeleton) {
	const result = {};
	skeleton.replace(DATE_TIME_REGEX, (match) => {
		const len = match.length;
		switch (match[0]) {
			case "G":
				result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "y":
				result.year = len === 2 ? "2-digit" : "numeric";
				break;
			case "Y":
			case "u":
			case "U":
			case "r": throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
			case "q":
			case "Q": throw new RangeError("`q/Q` (quarter) patterns are not supported");
			case "M":
			case "L":
				result.month = [
					"numeric",
					"2-digit",
					"short",
					"long",
					"narrow"
				][len - 1];
				break;
			case "w":
			case "W": throw new RangeError("`w/W` (week) patterns are not supported");
			case "d":
				result.day = ["numeric", "2-digit"][len - 1];
				break;
			case "D":
			case "F":
			case "g": throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
			case "E":
				result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "e":
				if (len < 4) {
					throw new RangeError("`e..eee` (weekday) patterns are not supported");
				}
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 4];
				break;
			case "c":
				if (len < 4) {
					throw new RangeError("`c..ccc` (weekday) patterns are not supported");
				}
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 4];
				break;
			case "a":
				result.hour12 = true;
				break;
			case "b":
			case "B": throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
			case "h":
				result.hourCycle = "h12";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "H":
				result.hourCycle = "h23";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "K":
				result.hourCycle = "h11";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "k":
				result.hourCycle = "h24";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "j":
			case "J":
			case "C": throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
			case "m":
				result.minute = ["numeric", "2-digit"][len - 1];
				break;
			case "s":
				result.second = ["numeric", "2-digit"][len - 1];
				break;
			case "S":
			case "A": throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
			case "z":
				result.timeZoneName = len < 4 ? "short" : "long";
				break;
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x": throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
		}
		return "";
	});
	return result;
}

// @generated from regex-gen.ts
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function parseNumberSkeletonFromString(skeleton) {
	if (skeleton.length === 0) {
		throw new Error("Number skeleton cannot be empty");
	}
	// Parse the skeleton
	const stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter((x) => x.length > 0);
	const tokens = [];
	for (const stringToken of stringTokens) {
		let stemAndOptions = stringToken.split("/");
		if (stemAndOptions.length === 0) {
			throw new Error("Invalid number skeleton");
		}
		const [stem, ...options] = stemAndOptions;
		for (const option of options) {
			if (option.length === 0) {
				throw new Error("Invalid number skeleton");
			}
		}
		tokens.push({
			stem,
			options
		});
	}
	return tokens;
}
function icuUnitToEcma(unit) {
	return unit.replace(/^(.*?)-/, "");
}
const FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
const SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
const INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
const CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
	const result = {};
	if (str[str.length - 1] === "r") {
		result.roundingPriority = "morePrecision";
	} else if (str[str.length - 1] === "s") {
		result.roundingPriority = "lessPrecision";
	}
	str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
		// @@@ case
		if (typeof g2 !== "string") {
			result.minimumSignificantDigits = g1.length;
			result.maximumSignificantDigits = g1.length;
		} else if (g2 === "+") {
			result.minimumSignificantDigits = g1.length;
		} else if (g1[0] === "#") {
			result.maximumSignificantDigits = g1.length;
		} else {
			result.minimumSignificantDigits = g1.length;
			result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
		}
		return "";
	});
	return result;
}
function parseSign(str) {
	switch (str) {
		case "sign-auto": return { signDisplay: "auto" };
		case "sign-accounting":
		case "()": return { currencySign: "accounting" };
		case "sign-always":
		case "+!": return { signDisplay: "always" };
		case "sign-accounting-always":
		case "()!": return {
			signDisplay: "always",
			currencySign: "accounting"
		};
		case "sign-except-zero":
		case "+?": return { signDisplay: "exceptZero" };
		case "sign-accounting-except-zero":
		case "()?": return {
			signDisplay: "exceptZero",
			currencySign: "accounting"
		};
		case "sign-never":
		case "+_": return { signDisplay: "never" };
	}
}
function parseConciseScientificAndEngineeringStem(stem) {
	// Engineering
	let result;
	if (stem[0] === "E" && stem[1] === "E") {
		result = { notation: "engineering" };
		stem = stem.slice(2);
	} else if (stem[0] === "E") {
		result = { notation: "scientific" };
		stem = stem.slice(1);
	}
	if (result) {
		const signDisplay = stem.slice(0, 2);
		if (signDisplay === "+!") {
			result.signDisplay = "always";
			stem = stem.slice(2);
		} else if (signDisplay === "+?") {
			result.signDisplay = "exceptZero";
			stem = stem.slice(2);
		}
		if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
			throw new Error("Malformed concise eng/scientific notation");
		}
		result.minimumIntegerDigits = stem.length;
	}
	return result;
}
function parseNotationOptions(opt) {
	const result = {};
	const signOpts = parseSign(opt);
	if (signOpts) {
		return signOpts;
	}
	return result;
}
/**
* https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
*/
function parseNumberSkeleton(tokens) {
	let result = {};
	for (const token of tokens) {
		switch (token.stem) {
			case "percent":
			case "%":
				result.style = "percent";
				continue;
			case "%x100":
				result.style = "percent";
				result.scale = 100;
				continue;
			case "currency":
				result.style = "currency";
				result.currency = token.options[0];
				continue;
			case "group-off":
			case ",_":
				result.useGrouping = false;
				continue;
			case "precision-integer":
			case ".":
				result.maximumFractionDigits = 0;
				continue;
			case "measure-unit":
			case "unit":
				result.style = "unit";
				result.unit = icuUnitToEcma(token.options[0]);
				continue;
			case "compact-short":
			case "K":
				result.notation = "compact";
				result.compactDisplay = "short";
				continue;
			case "compact-long":
			case "KK":
				result.notation = "compact";
				result.compactDisplay = "long";
				continue;
			case "scientific":
				result = {
					...result,
					notation: "scientific",
					...token.options.reduce((all, opt) => ({
						...all,
						...parseNotationOptions(opt)
					}), {})
				};
				continue;
			case "engineering":
				result = {
					...result,
					notation: "engineering",
					...token.options.reduce((all, opt) => ({
						...all,
						...parseNotationOptions(opt)
					}), {})
				};
				continue;
			case "notation-simple":
				result.notation = "standard";
				continue;
			case "unit-width-narrow":
				result.currencyDisplay = "narrowSymbol";
				result.unitDisplay = "narrow";
				continue;
			case "unit-width-short":
				result.currencyDisplay = "code";
				result.unitDisplay = "short";
				continue;
			case "unit-width-full-name":
				result.currencyDisplay = "name";
				result.unitDisplay = "long";
				continue;
			case "unit-width-iso-code":
				result.currencyDisplay = "symbol";
				continue;
			case "scale":
				result.scale = parseFloat(token.options[0]);
				continue;
			case "rounding-mode-floor":
				result.roundingMode = "floor";
				continue;
			case "rounding-mode-ceiling":
				result.roundingMode = "ceil";
				continue;
			case "rounding-mode-down":
				result.roundingMode = "trunc";
				continue;
			case "rounding-mode-up":
				result.roundingMode = "expand";
				continue;
			case "rounding-mode-half-even":
				result.roundingMode = "halfEven";
				continue;
			case "rounding-mode-half-down":
				result.roundingMode = "halfTrunc";
				continue;
			case "rounding-mode-half-up":
				result.roundingMode = "halfExpand";
				continue;
			case "integer-width":
				if (token.options.length > 1) {
					throw new RangeError("integer-width stems only accept a single optional option");
				}
				token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
					if (g1) {
						result.minimumIntegerDigits = g2.length;
					} else if (g3 && g4) {
						throw new Error("We currently do not support maximum integer digits");
					} else if (g5) {
						throw new Error("We currently do not support exact integer digits");
					}
					return "";
				});
				continue;
		}
		// https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
		if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
			result.minimumIntegerDigits = token.stem.length;
			continue;
		}
		if (FRACTION_PRECISION_REGEX.test(token.stem)) {
			// Precision
			// https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
			// precision-integer case
			if (token.options.length > 1) {
				throw new RangeError("Fraction-precision stems only accept a single optional option");
			}
			token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
				// .000* case (before ICU67 it was .000+)
				if (g2 === "*") {
					result.minimumFractionDigits = g1.length;
				} else if (g3 && g3[0] === "#") {
					result.maximumFractionDigits = g3.length;
				} else if (g4 && g5) {
					result.minimumFractionDigits = g4.length;
					result.maximumFractionDigits = g4.length + g5.length;
				} else {
					result.minimumFractionDigits = g1.length;
					result.maximumFractionDigits = g1.length;
				}
				return "";
			});
			const opt = token.options[0];
			// https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
			if (opt === "w") {
				result = {
					...result,
					trailingZeroDisplay: "stripIfInteger"
				};
			} else if (opt) {
				result = {
					...result,
					...parseSignificantPrecision(opt)
				};
			}
			continue;
		}
		// https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
		if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
			result = {
				...result,
				...parseSignificantPrecision(token.stem)
			};
			continue;
		}
		const signOpts = parseSign(token.stem);
		if (signOpts) {
			result = {
				...result,
				...signOpts
			};
		}
		const conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
		if (conciseScientificAndEngineeringOpts) {
			result = {
				...result,
				...conciseScientificAndEngineeringOpts
			};
		}
	}
	return result;
}

let TYPE = /* @__PURE__ */ function(TYPE) {
	/**
	* Raw text
	*/
	TYPE[TYPE["literal"] = 0] = "literal";
	/**
	* Variable w/o any format, e.g `var` in `this is a {var}`
	*/
	TYPE[TYPE["argument"] = 1] = "argument";
	/**
	* Variable w/ number format
	*/
	TYPE[TYPE["number"] = 2] = "number";
	/**
	* Variable w/ date format
	*/
	TYPE[TYPE["date"] = 3] = "date";
	/**
	* Variable w/ time format
	*/
	TYPE[TYPE["time"] = 4] = "time";
	/**
	* Variable w/ select format
	*/
	TYPE[TYPE["select"] = 5] = "select";
	/**
	* Variable w/ plural format
	*/
	TYPE[TYPE["plural"] = 6] = "plural";
	/**
	* Only possible within plural argument.
	* This is the `#` symbol that will be substituted with the count.
	*/
	TYPE[TYPE["pound"] = 7] = "pound";
	/**
	* XML-like tag
	*/
	TYPE[TYPE["tag"] = 8] = "tag";
	return TYPE;
}({});
let SKELETON_TYPE = /* @__PURE__ */ function(SKELETON_TYPE) {
	SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
	SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
	return SKELETON_TYPE;
}({});
/**
* Type Guards
*/
function isLiteralElement(el) {
	return el.type === TYPE.literal;
}
function isArgumentElement(el) {
	return el.type === TYPE.argument;
}
function isNumberElement(el) {
	return el.type === TYPE.number;
}
function isDateElement(el) {
	return el.type === TYPE.date;
}
function isTimeElement(el) {
	return el.type === TYPE.time;
}
function isSelectElement(el) {
	return el.type === TYPE.select;
}
function isPluralElement(el) {
	return el.type === TYPE.plural;
}
function isPoundElement(el) {
	return el.type === TYPE.pound;
}
function isTagElement(el) {
	return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
	return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
	return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
}

let ErrorKind = /* @__PURE__ */ function(ErrorKind) {
	/** Argument is unclosed (e.g. `{0`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
	/** Argument is empty (e.g. `{}`). */
	ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
	/** Argument is malformed (e.g. `{foo!}``) */
	ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
	/** Expect an argument type (e.g. `{foo,}`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
	/** Unsupported argument type (e.g. `{foo,foo}`) */
	ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
	/** Expect an argument style (e.g. `{foo, number, }`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
	/** The number skeleton is invalid. */
	ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
	/** The date time skeleton is invalid. */
	ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
	/** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
	ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
	/** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
	ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
	/** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
	ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
	/** Missing select argument options (e.g. `{foo, select}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
	/** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
	/** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
	ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
	/** Expecting a selector in `select` argument (e.g `{foo, select}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
	/** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
	/** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
	/**
	* Expecting a message fragment after the `plural` or `selectordinal` selector
	* (e.g. `{foo, plural, one}`)
	*/
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
	/** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
	ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
	/**
	* Duplicate selectors in `plural` or `selectordinal` argument.
	* (e.g. {foo, plural, one {#} one {#}})
	*/
	ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
	/** Duplicate selectors in `select` argument.
	* (e.g. {foo, select, apple {apple} apple {apple}})
	*/
	ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
	/** Plural or select argument option must have `other` clause. */
	ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
	/** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
	ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
	/** The tag name is invalid. (e.g. `<123>foo</123>`) */
	ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
	/** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
	ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
	/** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
	ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
	return ErrorKind;
}({});

// @generated from regex-gen.ts
const SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

// @generated from time-data-gen.ts
// prettier-ignore
const timeData = {
	"001": ["H", "h"],
	"419": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"AC": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"AD": ["H", "hB"],
	"AE": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"AF": [
		"H",
		"hb",
		"hB",
		"h"
	],
	"AG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"AI": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"AL": [
		"h",
		"H",
		"hB"
	],
	"AM": ["H", "hB"],
	"AO": ["H", "hB"],
	"AR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"AS": ["h", "H"],
	"AT": ["H", "hB"],
	"AU": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"AW": ["H", "hB"],
	"AX": ["H"],
	"AZ": [
		"H",
		"hB",
		"h"
	],
	"BA": [
		"H",
		"hB",
		"h"
	],
	"BB": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BD": [
		"h",
		"hB",
		"H"
	],
	"BE": ["H", "hB"],
	"BF": ["H", "hB"],
	"BG": [
		"H",
		"hB",
		"h"
	],
	"BH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"BI": ["H", "h"],
	"BJ": ["H", "hB"],
	"BL": ["H", "hB"],
	"BM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BN": [
		"hb",
		"hB",
		"h",
		"H"
	],
	"BO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"BQ": ["H"],
	"BR": ["H", "hB"],
	"BS": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BT": ["h", "H"],
	"BW": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"BY": ["H", "h"],
	"BZ": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CA": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"CC": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CD": ["hB", "H"],
	"CF": [
		"H",
		"h",
		"hB"
	],
	"CG": ["H", "hB"],
	"CH": [
		"H",
		"hB",
		"h"
	],
	"CI": ["H", "hB"],
	"CK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CL": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CM": [
		"H",
		"h",
		"hB"
	],
	"CN": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"CO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CP": ["H"],
	"CR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CU": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CV": ["H", "hB"],
	"CW": ["H", "hB"],
	"CX": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CY": [
		"h",
		"H",
		"hb",
		"hB"
	],
	"CZ": ["H"],
	"DE": ["H", "hB"],
	"DG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"DJ": ["h", "H"],
	"DK": ["H"],
	"DM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"DO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"DZ": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"EA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"EC": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"EE": ["H", "hB"],
	"EG": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"EH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"ER": ["h", "H"],
	"ES": [
		"H",
		"hB",
		"h",
		"hb"
	],
	"ET": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"FI": ["H"],
	"FJ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"FK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"FM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"FO": ["H", "h"],
	"FR": ["H", "hB"],
	"GA": ["H", "hB"],
	"GB": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GD": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GE": [
		"H",
		"hB",
		"h"
	],
	"GF": ["H", "hB"],
	"GG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GH": ["h", "H"],
	"GI": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GL": ["H", "h"],
	"GM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GN": ["H", "hB"],
	"GP": ["H", "hB"],
	"GQ": [
		"H",
		"hB",
		"h",
		"hb"
	],
	"GR": [
		"h",
		"H",
		"hb",
		"hB"
	],
	"GS": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GT": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"GU": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GW": ["H", "hB"],
	"GY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"HK": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"HN": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"HR": ["H", "hB"],
	"HU": ["H", "h"],
	"IC": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"ID": ["H"],
	"IE": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IL": ["H", "hB"],
	"IM": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IN": ["h", "H"],
	"IO": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IQ": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"IR": ["hB", "H"],
	"IS": ["H"],
	"IT": ["H", "hB"],
	"JE": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"JM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"JO": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"JP": [
		"H",
		"K",
		"h"
	],
	"KE": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"KG": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"KH": [
		"hB",
		"h",
		"H",
		"hb"
	],
	"KI": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KM": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"KN": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KP": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"KR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"KW": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"KY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KZ": ["H", "hB"],
	"LA": [
		"H",
		"hb",
		"hB",
		"h"
	],
	"LB": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"LC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"LI": [
		"H",
		"hB",
		"h"
	],
	"LK": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"LR": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"LS": ["h", "H"],
	"LT": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"LU": [
		"H",
		"h",
		"hB"
	],
	"LV": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"LY": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"MC": ["H", "hB"],
	"MD": ["H", "hB"],
	"ME": [
		"H",
		"hB",
		"h"
	],
	"MF": ["H", "hB"],
	"MG": ["H", "h"],
	"MH": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"ML": ["H"],
	"MM": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"MN": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"MO": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MP": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MQ": ["H", "hB"],
	"MR": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MS": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"MT": ["H", "h"],
	"MU": ["H", "h"],
	"MV": ["H", "h"],
	"MW": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MX": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"MY": [
		"hb",
		"hB",
		"h",
		"H"
	],
	"MZ": ["H", "hB"],
	"NA": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"NC": ["H", "hB"],
	"NE": ["H"],
	"NF": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NI": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"NL": ["H", "hB"],
	"NO": ["H", "h"],
	"NP": [
		"H",
		"h",
		"hB"
	],
	"NR": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NU": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NZ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"OM": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PA": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PE": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PF": [
		"H",
		"h",
		"hB"
	],
	"PG": ["h", "H"],
	"PH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PK": [
		"h",
		"hB",
		"H"
	],
	"PL": ["H", "h"],
	"PM": ["H", "hB"],
	"PN": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"PR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PS": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PT": ["H", "hB"],
	"PW": ["h", "H"],
	"PY": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"QA": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"RE": ["H", "hB"],
	"RO": ["H", "hB"],
	"RS": [
		"H",
		"hB",
		"h"
	],
	"RU": ["H"],
	"RW": ["H", "h"],
	"SA": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SB": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SC": [
		"H",
		"h",
		"hB"
	],
	"SD": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SE": ["H"],
	"SG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SH": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"SI": ["H", "hB"],
	"SJ": ["H"],
	"SK": ["H"],
	"SL": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SM": [
		"H",
		"h",
		"hB"
	],
	"SN": [
		"H",
		"h",
		"hB"
	],
	"SO": ["h", "H"],
	"SR": ["H", "hB"],
	"SS": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"ST": ["H", "hB"],
	"SV": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"SX": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"SY": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SZ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TA": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"TC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TD": [
		"h",
		"H",
		"hB"
	],
	"TF": [
		"H",
		"h",
		"hB"
	],
	"TG": ["H", "hB"],
	"TH": ["H", "h"],
	"TJ": ["H", "h"],
	"TL": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"TM": ["H", "h"],
	"TN": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"TO": ["h", "H"],
	"TR": ["H", "hB"],
	"TT": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TW": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"TZ": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"UA": [
		"H",
		"hB",
		"h"
	],
	"UG": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"UM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"US": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"UY": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"UZ": [
		"H",
		"hB",
		"h"
	],
	"VA": [
		"H",
		"h",
		"hB"
	],
	"VC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VE": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"VG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VI": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VN": ["H", "h"],
	"VU": ["h", "H"],
	"WF": ["H", "hB"],
	"WS": ["h", "H"],
	"XK": [
		"H",
		"hB",
		"h"
	],
	"YE": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"YT": ["H", "hB"],
	"ZA": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"ZM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"ZW": ["H", "h"],
	"af-ZA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"ar-001": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"ca-ES": [
		"H",
		"h",
		"hB"
	],
	"en-001": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-HK": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-IL": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"en-MY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"es-BR": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-ES": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-GQ": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"fr-CA": [
		"H",
		"h",
		"hB"
	],
	"gl-ES": [
		"H",
		"h",
		"hB"
	],
	"gu-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"hi-IN": [
		"hB",
		"h",
		"H"
	],
	"it-CH": [
		"H",
		"h",
		"hB"
	],
	"it-IT": [
		"H",
		"h",
		"hB"
	],
	"kn-IN": [
		"hB",
		"h",
		"H"
	],
	"ku-SY": ["H", "hB"],
	"ml-IN": [
		"hB",
		"h",
		"H"
	],
	"mr-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"pa-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"ta-IN": [
		"hB",
		"h",
		"hb",
		"H"
	],
	"te-IN": [
		"hB",
		"h",
		"H"
	],
	"zu-ZA": [
		"H",
		"hB",
		"hb",
		"h"
	]
};

/**
* Returns the best matching date time pattern if a date time skeleton
* pattern is provided with a locale. Follows the Unicode specification:
* https://www.unicode.org/reports/tr35/tr35-dates.html#table-mapping-requested-time-skeletons-to-patterns
* @param skeleton date time skeleton pattern that possibly includes j, J or C
* @param locale
*/
function getBestPattern(skeleton, locale) {
	let skeletonCopy = "";
	for (let patternPos = 0; patternPos < skeleton.length; patternPos++) {
		const patternChar = skeleton.charAt(patternPos);
		if (patternChar === "j") {
			let extraLength = 0;
			while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
				extraLength++;
				patternPos++;
			}
			let hourLen = 1 + (extraLength & 1);
			let dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
			let dayPeriodChar = "a";
			let hourChar = getDefaultHourSymbolFromLocale(locale);
			if (hourChar == "H" || hourChar == "k") {
				dayPeriodLen = 0;
			}
			while (dayPeriodLen-- > 0) {
				skeletonCopy += dayPeriodChar;
			}
			while (hourLen-- > 0) {
				skeletonCopy = hourChar + skeletonCopy;
			}
		} else if (patternChar === "J") {
			skeletonCopy += "H";
		} else {
			skeletonCopy += patternChar;
		}
	}
	return skeletonCopy;
}
/**
* Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
* of the given `locale` to the corresponding time pattern.
* @param locale
*/
function getDefaultHourSymbolFromLocale(locale) {
	let hourCycle = locale.hourCycle;
	if (hourCycle === undefined && locale.hourCycles && locale.hourCycles.length) {
		// @ts-ignore
		hourCycle = locale.hourCycles[0];
	}
	if (hourCycle) {
		switch (hourCycle) {
			case "h24": return "k";
			case "h23": return "H";
			case "h12": return "h";
			case "h11": return "K";
			default: throw new Error("Invalid hourCycle");
		}
	}
	// TODO: Once hourCycle is fully supported remove the following with data generation
	const languageTag = locale.language;
	let regionTag;
	if (languageTag !== "root") {
		regionTag = locale.maximize().region;
	}
	const hourCycles = timeData[regionTag || ""] || timeData[languageTag || ""] || timeData[`${languageTag}-001`] || timeData["001"];
	return hourCycles[0];
}

const SPACE_SEPARATOR_START_REGEX = new RegExp(`^${SPACE_SEPARATOR_REGEX.source}*`);
const SPACE_SEPARATOR_END_REGEX = new RegExp(`${SPACE_SEPARATOR_REGEX.source}*$`);
function createLocation(start, end) {
	return {
		start,
		end
	};
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
const hasNativeFromEntries = !!Object.fromEntries;
const hasTrimStart = !!String.prototype.trimStart;
const hasTrimEnd = !!String.prototype.trimEnd;
const fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries(entries) {
	const obj = {};
	for (const [k, v] of entries) {
		obj[k] = v;
	}
	return obj;
};
const trimStart = hasTrimStart ? function trimStart(s) {
	return s.trimStart();
} : function trimStart(s) {
	return s.replace(SPACE_SEPARATOR_START_REGEX, "");
};
const trimEnd = hasTrimEnd ? function trimEnd(s) {
	return s.trimEnd();
} : function trimEnd(s) {
	return s.replace(SPACE_SEPARATOR_END_REGEX, "");
};
// #endregion
const IDENTIFIER_PREFIX_RE = new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function matchIdentifierAtIndex(s, index) {
	IDENTIFIER_PREFIX_RE.lastIndex = index;
	const match = IDENTIFIER_PREFIX_RE.exec(s);
	return match[1] ?? "";
}
class Parser {
	message;
	position;
	locale;
	ignoreTag;
	requiresOtherClause;
	shouldParseSkeletons;
	constructor(message, options = {}) {
		this.message = message;
		this.position = {
			offset: 0,
			line: 1,
			column: 1
		};
		this.ignoreTag = !!options.ignoreTag;
		this.locale = options.locale;
		this.requiresOtherClause = !!options.requiresOtherClause;
		this.shouldParseSkeletons = !!options.shouldParseSkeletons;
	}
	parse() {
		if (this.offset() !== 0) {
			throw Error("parser can only be used once");
		}
		return this.parseMessage(0, "", false);
	}
	parseMessage(nestingLevel, parentArgType, expectingCloseTag) {
		let elements = [];
		while (!this.isEOF()) {
			const char = this.char();
			if (char === 123) {
				const result = this.parseArgument(nestingLevel, expectingCloseTag);
				if (result.err) {
					return result;
				}
				elements.push(result.val);
			} else if (char === 125 && nestingLevel > 0) {
				break;
			} else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
				const position = this.clonePosition();
				this.bump();
				elements.push({
					type: TYPE.pound,
					location: createLocation(position, this.clonePosition())
				});
			} else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
				if (expectingCloseTag) {
					break;
				} else {
					return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
				}
			} else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
				const result = this.parseTag(nestingLevel, parentArgType);
				if (result.err) {
					return result;
				}
				elements.push(result.val);
			} else {
				const result = this.parseLiteral(nestingLevel, parentArgType);
				if (result.err) {
					return result;
				}
				elements.push(result.val);
			}
		}
		return {
			val: elements,
			err: null
		};
	}
	/**
	* A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
	* [custom element name][] except that a dash is NOT always mandatory and uppercase letters
	* are accepted:
	*
	* ```
	* tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
	* tagName ::= [a-z] (PENChar)*
	* PENChar ::=
	*     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
	*     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
	*     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	* ```
	*
	* [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	* NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
	* since other tag-based engines like React allow it
	*/
	parseTag(nestingLevel, parentArgType) {
		const startPosition = this.clonePosition();
		this.bump();
		const tagName = this.parseTagName();
		this.bumpSpace();
		if (this.bumpIf("/>")) {
			// Self closing tag
			return {
				val: {
					type: TYPE.literal,
					value: `<${tagName}/>`,
					location: createLocation(startPosition, this.clonePosition())
				},
				err: null
			};
		} else if (this.bumpIf(">")) {
			const childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
			if (childrenResult.err) {
				return childrenResult;
			}
			const children = childrenResult.val;
			// Expecting a close tag
			const endTagStartPosition = this.clonePosition();
			if (this.bumpIf("</")) {
				if (this.isEOF() || !_isAlpha(this.char())) {
					return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
				}
				const closingTagNameStartPosition = this.clonePosition();
				const closingTagName = this.parseTagName();
				if (tagName !== closingTagName) {
					return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
				}
				this.bumpSpace();
				if (!this.bumpIf(">")) {
					return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
				}
				return {
					val: {
						type: TYPE.tag,
						value: tagName,
						children,
						location: createLocation(startPosition, this.clonePosition())
					},
					err: null
				};
			} else {
				return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
			}
		} else {
			return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
		}
	}
	/**
	* This method assumes that the caller has peeked ahead for the first tag character.
	*/
	parseTagName() {
		const startOffset = this.offset();
		this.bump();
		while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
			this.bump();
		}
		return this.message.slice(startOffset, this.offset());
	}
	parseLiteral(nestingLevel, parentArgType) {
		const start = this.clonePosition();
		let value = "";
		while (true) {
			const parseQuoteResult = this.tryParseQuote(parentArgType);
			if (parseQuoteResult) {
				value += parseQuoteResult;
				continue;
			}
			const parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
			if (parseUnquotedResult) {
				value += parseUnquotedResult;
				continue;
			}
			const parseLeftAngleResult = this.tryParseLeftAngleBracket();
			if (parseLeftAngleResult) {
				value += parseLeftAngleResult;
				continue;
			}
			break;
		}
		const location = createLocation(start, this.clonePosition());
		return {
			val: {
				type: TYPE.literal,
				value,
				location
			},
			err: null
		};
	}
	tryParseLeftAngleBracket() {
		if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
			this.bump();
			return "<";
		}
		return null;
	}
	/**
	* Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
	* a character that requires quoting (that is, "only where needed"), and works the same in
	* nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
	*/
	tryParseQuote(parentArgType) {
		if (this.isEOF() || this.char() !== 39) {
			return null;
		}
		// Parse escaped char following the apostrophe, or early return if there is no escaped char.
		// Check if is valid escaped character
		switch (this.peek()) {
			case 39:
				// double quote, should return as a single quote.
				this.bump();
				this.bump();
				return "'";
			case 123:
			case 60:
			case 62:
			case 125: break;
			case 35:
				if (parentArgType === "plural" || parentArgType === "selectordinal") {
					break;
				}
				return null;
			default: return null;
		}
		this.bump();
		const codePoints = [this.char()];
		this.bump();
		// read chars until the optional closing apostrophe is found
		while (!this.isEOF()) {
			const ch = this.char();
			if (ch === 39) {
				if (this.peek() === 39) {
					codePoints.push(39);
					// Bump one more time because we need to skip 2 characters.
					this.bump();
				} else {
					// Optional closing apostrophe.
					this.bump();
					break;
				}
			} else {
				codePoints.push(ch);
			}
			this.bump();
		}
		return String.fromCodePoint(...codePoints);
	}
	tryParseUnquoted(nestingLevel, parentArgType) {
		if (this.isEOF()) {
			return null;
		}
		const ch = this.char();
		if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
			return null;
		} else {
			this.bump();
			return String.fromCodePoint(ch);
		}
	}
	parseArgument(nestingLevel, expectingCloseTag) {
		const openingBracePosition = this.clonePosition();
		this.bump();
		this.bumpSpace();
		if (this.isEOF()) {
			return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
		}
		if (this.char() === 125) {
			this.bump();
			return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
		}
		// argument name
		let value = this.parseIdentifierIfPossible().value;
		if (!value) {
			return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
		}
		this.bumpSpace();
		if (this.isEOF()) {
			return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
		}
		switch (this.char()) {
			case 125: {
				this.bump();
				return {
					val: {
						type: TYPE.argument,
						value,
						location: createLocation(openingBracePosition, this.clonePosition())
					},
					err: null
				};
			}
			case 44: {
				this.bump();
				this.bumpSpace();
				if (this.isEOF()) {
					return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
				}
				return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
			}
			default: return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
		}
	}
	/**
	* Advance the parser until the end of the identifier, if it is currently on
	* an identifier character. Return an empty string otherwise.
	*/
	parseIdentifierIfPossible() {
		const startingPosition = this.clonePosition();
		const startOffset = this.offset();
		const value = matchIdentifierAtIndex(this.message, startOffset);
		const endOffset = startOffset + value.length;
		this.bumpTo(endOffset);
		const endPosition = this.clonePosition();
		const location = createLocation(startingPosition, endPosition);
		return {
			value,
			location
		};
	}
	parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition) {
		// Parse this range:
		// {name, type, style}
		//        ^---^
		let typeStartPosition = this.clonePosition();
		let argType = this.parseIdentifierIfPossible().value;
		let typeEndPosition = this.clonePosition();
		switch (argType) {
			case "":
 // Expecting a style string number, date, time, plural, selectordinal, or select.
			return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
			case "number":
			case "date":
			case "time": {
				// Parse this range:
				// {name, number, style}
				//              ^-------^
				this.bumpSpace();
				let styleAndLocation = null;
				if (this.bumpIf(",")) {
					this.bumpSpace();
					const styleStartPosition = this.clonePosition();
					const result = this.parseSimpleArgStyleIfPossible();
					if (result.err) {
						return result;
					}
					const style = trimEnd(result.val);
					if (style.length === 0) {
						return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
					}
					const styleLocation = createLocation(styleStartPosition, this.clonePosition());
					styleAndLocation = {
						style,
						styleLocation
					};
				}
				const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
				if (argCloseResult.err) {
					return argCloseResult;
				}
				const location = createLocation(openingBracePosition, this.clonePosition());
				// Extract style or skeleton
				if (styleAndLocation && styleAndLocation.style.startsWith("::")) {
					// Skeleton starts with `::`.
					let skeleton = trimStart(styleAndLocation.style.slice(2));
					if (argType === "number") {
						const result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
						if (result.err) {
							return result;
						}
						return {
							val: {
								type: TYPE.number,
								value,
								location,
								style: result.val
							},
							err: null
						};
					} else {
						if (skeleton.length === 0) {
							return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location);
						}
						let dateTimePattern = skeleton;
						// Get "best match" pattern only if locale is passed, if not, let it
						// pass as-is where `parseDateTimeSkeleton()` will throw an error
						// for unsupported patterns.
						if (this.locale) {
							dateTimePattern = getBestPattern(skeleton, this.locale);
						}
						const style = {
							type: SKELETON_TYPE.dateTime,
							pattern: dateTimePattern,
							location: styleAndLocation.styleLocation,
							parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
						};
						const type = argType === "date" ? TYPE.date : TYPE.time;
						return {
							val: {
								type,
								value,
								location,
								style
							},
							err: null
						};
					}
				}
				// Regular style or no style.
				return {
					val: {
						type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
						value,
						location,
						style: styleAndLocation?.style ?? null
					},
					err: null
				};
			}
			case "plural":
			case "selectordinal":
			case "select": {
				// Parse this range:
				// {name, plural, options}
				//              ^---------^
				const typeEndPosition = this.clonePosition();
				this.bumpSpace();
				if (!this.bumpIf(",")) {
					return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition, { ...typeEndPosition }));
				}
				this.bumpSpace();
				// Parse offset:
				// {name, plural, offset:1, options}
				//                ^-----^
				//
				// or the first option:
				//
				// {name, plural, one {...} other {...}}
				//                ^--^
				let identifierAndLocation = this.parseIdentifierIfPossible();
				let pluralOffset = 0;
				if (argType !== "select" && identifierAndLocation.value === "offset") {
					if (!this.bumpIf(":")) {
						return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
					}
					this.bumpSpace();
					const result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
					if (result.err) {
						return result;
					}
					// Parse another identifier for option parsing
					this.bumpSpace();
					identifierAndLocation = this.parseIdentifierIfPossible();
					pluralOffset = result.val;
				}
				const optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
				if (optionsResult.err) {
					return optionsResult;
				}
				const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
				if (argCloseResult.err) {
					return argCloseResult;
				}
				const location = createLocation(openingBracePosition, this.clonePosition());
				if (argType === "select") {
					return {
						val: {
							type: TYPE.select,
							value,
							options: fromEntries(optionsResult.val),
							location
						},
						err: null
					};
				} else {
					return {
						val: {
							type: TYPE.plural,
							value,
							options: fromEntries(optionsResult.val),
							offset: pluralOffset,
							pluralType: argType === "plural" ? "cardinal" : "ordinal",
							location
						},
						err: null
					};
				}
			}
			default: return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
		}
	}
	tryParseArgumentClose(openingBracePosition) {
		// Parse: {value, number, ::currency/GBP }
		//
		if (this.isEOF() || this.char() !== 125) {
			return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
		}
		this.bump();
		return {
			val: true,
			err: null
		};
	}
	/**
	* See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
	*/
	parseSimpleArgStyleIfPossible() {
		let nestedBraces = 0;
		const startPosition = this.clonePosition();
		while (!this.isEOF()) {
			const ch = this.char();
			switch (ch) {
				case 39: {
					// Treat apostrophe as quoting but include it in the style part.
					// Find the end of the quoted literal text.
					this.bump();
					let apostrophePosition = this.clonePosition();
					if (!this.bumpUntil("'")) {
						return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
					}
					this.bump();
					break;
				}
				case 123: {
					nestedBraces += 1;
					this.bump();
					break;
				}
				case 125: {
					if (nestedBraces > 0) {
						nestedBraces -= 1;
					} else {
						return {
							val: this.message.slice(startPosition.offset, this.offset()),
							err: null
						};
					}
					break;
				}
				default:
					this.bump();
					break;
			}
		}
		return {
			val: this.message.slice(startPosition.offset, this.offset()),
			err: null
		};
	}
	parseNumberSkeletonFromString(skeleton, location) {
		let tokens = [];
		try {
			tokens = parseNumberSkeletonFromString(skeleton);
		} catch {
			return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
		}
		return {
			val: {
				type: SKELETON_TYPE.number,
				tokens,
				location,
				parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
			},
			err: null
		};
	}
	/**
	* @param nesting_level The current nesting level of messages.
	*     This can be positive when parsing message fragment in select or plural argument options.
	* @param parent_arg_type The parent argument's type.
	* @param parsed_first_identifier If provided, this is the first identifier-like selector of
	*     the argument. It is a by-product of a previous parsing attempt.
	* @param expecting_close_tag If true, this message is directly or indirectly nested inside
	*     between a pair of opening and closing tags. The nested message will not parse beyond
	*     the closing tag boundary.
	*/
	tryParsePluralOrSelectOptions(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
		let hasOtherClause = false;
		const options = [];
		const parsedSelectors = new Set();
		let { value: selector, location: selectorLocation } = parsedFirstIdentifier;
		// Parse:
		// one {one apple}
		// ^--^
		while (true) {
			if (selector.length === 0) {
				const startPosition = this.clonePosition();
				if (parentArgType !== "select" && this.bumpIf("=")) {
					// Try parse `={number}` selector
					const result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
					if (result.err) {
						return result;
					}
					selectorLocation = createLocation(startPosition, this.clonePosition());
					selector = this.message.slice(startPosition.offset, this.offset());
				} else {
					break;
				}
			}
			// Duplicate selector clauses
			if (parsedSelectors.has(selector)) {
				return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
			}
			if (selector === "other") {
				hasOtherClause = true;
			}
			// Parse:
			// one {one apple}
			//     ^----------^
			this.bumpSpace();
			const openingBracePosition = this.clonePosition();
			if (!this.bumpIf("{")) {
				return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
			}
			const fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
			if (fragmentResult.err) {
				return fragmentResult;
			}
			const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
			if (argCloseResult.err) {
				return argCloseResult;
			}
			options.push([selector, {
				value: fragmentResult.val,
				location: createLocation(openingBracePosition, this.clonePosition())
			}]);
			// Keep track of the existing selectors
			parsedSelectors.add(selector);
			// Prep next selector clause.
			this.bumpSpace();
			({value: selector, location: selectorLocation} = this.parseIdentifierIfPossible());
		}
		if (options.length === 0) {
			return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
		}
		if (this.requiresOtherClause && !hasOtherClause) {
			return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
		}
		return {
			val: options,
			err: null
		};
	}
	tryParseDecimalInteger(expectNumberError, invalidNumberError) {
		let sign = 1;
		const startingPosition = this.clonePosition();
		if (this.bumpIf("+")) ; else if (this.bumpIf("-")) {
			sign = -1;
		}
		let hasDigits = false;
		let decimal = 0;
		while (!this.isEOF()) {
			const ch = this.char();
			if (ch >= 48 && ch <= 57) {
				hasDigits = true;
				decimal = decimal * 10 + (ch - 48);
				this.bump();
			} else {
				break;
			}
		}
		const location = createLocation(startingPosition, this.clonePosition());
		if (!hasDigits) {
			return this.error(expectNumberError, location);
		}
		decimal *= sign;
		if (!Number.isSafeInteger(decimal)) {
			return this.error(invalidNumberError, location);
		}
		return {
			val: decimal,
			err: null
		};
	}
	offset() {
		return this.position.offset;
	}
	isEOF() {
		return this.offset() === this.message.length;
	}
	clonePosition() {
		// This is much faster than `Object.assign` or spread.
		return {
			offset: this.position.offset,
			line: this.position.line,
			column: this.position.column
		};
	}
	/**
	* Return the code point at the current position of the parser.
	* Throws if the index is out of bound.
	*/
	char() {
		const offset = this.position.offset;
		if (offset >= this.message.length) {
			throw Error("out of bound");
		}
		const code = this.message.codePointAt(offset);
		if (code === undefined) {
			throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
		}
		return code;
	}
	error(kind, location) {
		return {
			val: null,
			err: {
				kind,
				message: this.message,
				location
			}
		};
	}
	/** Bump the parser to the next UTF-16 code unit. */
	bump() {
		if (this.isEOF()) {
			return;
		}
		const code = this.char();
		if (code === 10) {
			this.position.line += 1;
			this.position.column = 1;
			this.position.offset += 1;
		} else {
			this.position.column += 1;
			// 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
			this.position.offset += code < 65536 ? 1 : 2;
		}
	}
	/**
	* If the substring starting at the current position of the parser has
	* the given prefix, then bump the parser to the character immediately
	* following the prefix and return true. Otherwise, don't bump the parser
	* and return false.
	*/
	bumpIf(prefix) {
		if (this.message.startsWith(prefix, this.offset())) {
			for (let i = 0; i < prefix.length; i++) {
				this.bump();
			}
			return true;
		}
		return false;
	}
	/**
	* Bump the parser until the pattern character is found and return `true`.
	* Otherwise bump to the end of the file and return `false`.
	*/
	bumpUntil(pattern) {
		const currentOffset = this.offset();
		const index = this.message.indexOf(pattern, currentOffset);
		if (index >= 0) {
			this.bumpTo(index);
			return true;
		} else {
			this.bumpTo(this.message.length);
			return false;
		}
	}
	/**
	* Bump the parser to the target offset.
	* If target offset is beyond the end of the input, bump the parser to the end of the input.
	*/
	bumpTo(targetOffset) {
		if (this.offset() > targetOffset) {
			throw Error(`targetOffset ${targetOffset} must be greater than or equal to the current offset ${this.offset()}`);
		}
		targetOffset = Math.min(targetOffset, this.message.length);
		while (true) {
			const offset = this.offset();
			if (offset === targetOffset) {
				break;
			}
			if (offset > targetOffset) {
				throw Error(`targetOffset ${targetOffset} is at invalid UTF-16 code unit boundary`);
			}
			this.bump();
			if (this.isEOF()) {
				break;
			}
		}
	}
	/** advance the parser through all whitespace to the next non-whitespace code unit. */
	bumpSpace() {
		while (!this.isEOF() && _isWhiteSpace(this.char())) {
			this.bump();
		}
	}
	/**
	* Peek at the *next* Unicode codepoint in the input without advancing the parser.
	* If the input has been exhausted, then this returns null.
	*/
	peek() {
		if (this.isEOF()) {
			return null;
		}
		const code = this.char();
		const offset = this.offset();
		const nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
		return nextCode ?? null;
	}
}
/**
* This check if codepoint is alphabet (lower & uppercase)
* @param codepoint
* @returns
*/
function _isAlpha(codepoint) {
	return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
	return _isAlpha(codepoint) || codepoint === 47;
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
	return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
/**
* Code point equivalent of regex `\p{White_Space}`.
* From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
*/
function _isWhiteSpace(c) {
	return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}

function pruneLocation(els) {
	els.forEach((el) => {
		delete el.location;
		if (isSelectElement(el) || isPluralElement(el)) {
			for (const k in el.options) {
				delete el.options[k].location;
				pruneLocation(el.options[k].value);
			}
		} else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
			delete el.style.location;
		} else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) {
			delete el.style.location;
		} else if (isTagElement(el)) {
			pruneLocation(el.children);
		}
	});
}
function parse(message, opts = {}) {
	opts = {
		shouldParseSkeletons: true,
		requiresOtherClause: true,
		...opts
	};
	const result = new Parser(message, opts).parse();
	if (result.err) {
		const error = SyntaxError(ErrorKind[result.err.kind]);
		// @ts-expect-error Assign to error object
		error.location = result.err.location;
		// @ts-expect-error Assign to error object
		error.originalMessage = result.err.message;
		throw error;
	}
	if (!opts?.captureLocation) {
		pruneLocation(result.val);
	}
	return result.val;
}

let ErrorCode = /* @__PURE__ */ function(ErrorCode) {
	// When we have a placeholder but no value to format
	ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
	// When value supplied is invalid
	ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
	// When we need specific Intl API but it's not available
	ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
	return ErrorCode;
}({});
class FormatError extends Error {
	code;
	/**
	* Original message we're trying to format
	* `undefined` if we're only dealing w/ AST
	*
	* @type {(string | undefined)}
	* @memberof FormatError
	*/
	originalMessage;
	constructor(msg, code, originalMessage) {
		super(msg);
		this.code = code;
		this.originalMessage = originalMessage;
	}
	toString() {
		return `[formatjs Error: ${this.code}] ${this.message}`;
	}
}
class InvalidValueError extends FormatError {
	constructor(variableId, value, options, originalMessage) {
		super(`Invalid values for "${variableId}": "${value}". Options are "${Object.keys(options).join("\", \"")}"`, ErrorCode.INVALID_VALUE, originalMessage);
	}
}
class InvalidValueTypeError extends FormatError {
	constructor(value, type, originalMessage) {
		super(`Value for "${value}" must be of type ${type}`, ErrorCode.INVALID_VALUE, originalMessage);
	}
}
class MissingValueError extends FormatError {
	constructor(variableId, originalMessage) {
		super(`The intl string context variable "${variableId}" was not provided to the string "${originalMessage}"`, ErrorCode.MISSING_VALUE, originalMessage);
	}
}

let PART_TYPE = /* @__PURE__ */ function(PART_TYPE) {
	PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
	PART_TYPE[PART_TYPE["object"] = 1] = "object";
	return PART_TYPE;
}({});
function mergeLiteral(parts) {
	if (parts.length < 2) {
		return parts;
	}
	return parts.reduce((all, part) => {
		const lastPart = all[all.length - 1];
		if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
			all.push(part);
		} else {
			lastPart.value += part.value;
		}
		return all;
	}, []);
}
function isFormatXMLElementFn(el) {
	return typeof el === "function";
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
	// Hot path for straight simple msg translations
	if (els.length === 1 && isLiteralElement(els[0])) {
		return [{
			type: PART_TYPE.literal,
			value: els[0].value
		}];
	}
	const result = [];
	for (const el of els) {
		// Exit early for string parts.
		if (isLiteralElement(el)) {
			result.push({
				type: PART_TYPE.literal,
				value: el.value
			});
			continue;
		}
		// TODO: should this part be literal type?
		// Replace `#` in plural rules with the actual numeric value.
		if (isPoundElement(el)) {
			if (typeof currentPluralValue === "number") {
				result.push({
					type: PART_TYPE.literal,
					value: formatters.getNumberFormat(locales).format(currentPluralValue)
				});
			}
			continue;
		}
		const { value: varName } = el;
		// Enforce that all required values are provided by the caller.
		if (!(values && varName in values)) {
			throw new MissingValueError(varName, originalMessage);
		}
		let value = values[varName];
		if (isArgumentElement(el)) {
			if (!value || typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
				value = typeof value === "string" || typeof value === "number" || typeof value === "bigint" ? String(value) : "";
			}
			result.push({
				type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
				value
			});
			continue;
		}
		// Recursively format plural and select parts' option — which can be a
		// nested pattern structure. The choosing of the option to use is
		// abstracted-by and delegated-to the part helper object.
		if (isDateElement(el)) {
			const style = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : undefined;
			result.push({
				type: PART_TYPE.literal,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTimeElement(el)) {
			const style = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
			result.push({
				type: PART_TYPE.literal,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isNumberElement(el)) {
			const style = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : undefined;
			if (style && style.scale) {
				const scale = style.scale || 1;
				// Handle bigint scale multiplication
				// BigInt can only be multiplied by BigInt
				if (typeof value === "bigint") {
					// Check if scale is a safe integer that can be converted to BigInt
					if (!Number.isInteger(scale)) {
						throw new TypeError(`Cannot apply fractional scale ${scale} to bigint value. Scale must be an integer when formatting bigint.`);
					}
					value = value * BigInt(scale);
				} else {
					value = value * scale;
				}
			}
			result.push({
				type: PART_TYPE.literal,
				value: formatters.getNumberFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTagElement(el)) {
			const { children, value } = el;
			const formatFn = values[value];
			if (!isFormatXMLElementFn(formatFn)) {
				throw new InvalidValueTypeError(value, "function", originalMessage);
			}
			const parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
			let chunks = formatFn(parts.map((p) => p.value));
			if (!Array.isArray(chunks)) {
				chunks = [chunks];
			}
			result.push(...chunks.map((c) => {
				return {
					type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
					value: c
				};
			}));
		}
		if (isSelectElement(el)) {
			// GH #4490: Use hasOwnProperty to avoid prototype chain issues with keys like "constructor"
			const key = value;
			const opt = (Object.prototype.hasOwnProperty.call(el.options, key) ? el.options[key] : undefined) || el.options.other;
			if (!opt) {
				throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			}
			result.push(...formatToParts(opt.value, locales, formatters, formats, values));
			continue;
		}
		if (isPluralElement(el)) {
			// GH #4490: Use hasOwnProperty to avoid prototype chain issues
			const exactKey = `=${value}`;
			let opt = Object.prototype.hasOwnProperty.call(el.options, exactKey) ? el.options[exactKey] : undefined;
			if (!opt) {
				if (!Intl.PluralRules) {
					throw new FormatError(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, ErrorCode.MISSING_INTL_API, originalMessage);
				}
				// Convert bigint to number for PluralRules (which only accepts number)
				const numericValue = typeof value === "bigint" ? Number(value) : value;
				const rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(numericValue - (el.offset || 0));
				opt = (Object.prototype.hasOwnProperty.call(el.options, rule) ? el.options[rule] : undefined) || el.options.other;
			}
			if (!opt) {
				throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			}
			// Convert bigint to number for currentPluralValue
			const numericValue = typeof value === "bigint" ? Number(value) : value;
			result.push(...formatToParts(opt.value, locales, formatters, formats, values, numericValue - (el.offset || 0)));
			continue;
		}
	}
	return mergeLiteral(result);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
	if (!c2) {
		return c1;
	}
	return {
		...c1,
		...c2,
		...Object.keys(c1).reduce((all, k) => {
			all[k] = {
				...c1[k],
				...c2[k]
			};
			return all;
		}, {})
	};
}
function mergeConfigs(defaultConfig, configs) {
	if (!configs) {
		return defaultConfig;
	}
	return Object.keys(defaultConfig).reduce((all, k) => {
		all[k] = mergeConfig(defaultConfig[k], configs[k]);
		return all;
	}, { ...defaultConfig });
}
function createFastMemoizeCache(store) {
	return { create() {
		return {
			get(key) {
				return store[key];
			},
			set(key, value) {
				store[key] = value;
			}
		};
	} };
}
function createDefaultFormatters(cache = {
	number: {},
	dateTime: {},
	pluralRules: {}
}) {
	return {
		getNumberFormat: memoize((...args) => new Intl.NumberFormat(...args), {
			cache: createFastMemoizeCache(cache.number),
			strategy: strategies.variadic
		}),
		getDateTimeFormat: memoize((...args) => new Intl.DateTimeFormat(...args), {
			cache: createFastMemoizeCache(cache.dateTime),
			strategy: strategies.variadic
		}),
		getPluralRules: memoize((...args) => new Intl.PluralRules(...args), {
			cache: createFastMemoizeCache(cache.pluralRules),
			strategy: strategies.variadic
		})
	};
}
class IntlMessageFormat {
	ast;
	locales;
	resolvedLocale;
	formatters;
	formats;
	message;
	formatterCache = {
		number: {},
		dateTime: {},
		pluralRules: {}
	};
	constructor(message, locales = IntlMessageFormat.defaultLocale, overrideFormats, opts) {
		// Defined first because it's used to build the format pattern.
		this.locales = locales;
		this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
		if (typeof message === "string") {
			this.message = message;
			if (!IntlMessageFormat.__parse) {
				throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
			}
			const { ...parseOpts } = opts || {};
			// Parse string messages into an AST.
			this.ast = IntlMessageFormat.__parse(message, {
				...parseOpts,
				locale: this.resolvedLocale
			});
		} else {
			this.ast = message;
		}
		if (!Array.isArray(this.ast)) {
			throw new TypeError("A message must be provided as a String or AST.");
		}
		// Creates a new object with the specified `formats` merged with the default
		// formats.
		this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
		this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
	}
	format = (values) => {
		const parts = this.formatToParts(values);
		// Hot path for straight simple msg translations
		if (parts.length === 1) {
			return parts[0].value;
		}
		const result = parts.reduce((all, part) => {
			if (!all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
				all.push(part.value);
			} else {
				all[all.length - 1] += part.value;
			}
			return all;
		}, []);
		if (result.length <= 1) {
			return result[0] || "";
		}
		return result;
	};
	formatToParts = (values) => formatToParts(this.ast, this.locales, this.formatters, this.formats, values, undefined, this.message);
	resolvedOptions = () => ({ locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0] });
	getAst = () => this.ast;
	static memoizedDefaultLocale = null;
	static get defaultLocale() {
		if (!IntlMessageFormat.memoizedDefaultLocale) {
			IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
		}
		return IntlMessageFormat.memoizedDefaultLocale;
	}
	static resolveLocale = (locales) => {
		if (typeof Intl.Locale === "undefined") {
			return;
		}
		const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
		if (supportedLocales.length > 0) {
			return new Intl.Locale(supportedLocales[0]);
		}
		return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
	};
	static __parse = parse;
	// Default format options used as the prototype of the `formats` provided to the
	// constructor. These are used when constructing the internal Intl.NumberFormat
	// and Intl.DateTimeFormat instances.
	static formats = {
		number: {
			integer: { maximumFractionDigits: 0 },
			currency: { style: "currency" },
			percent: { style: "percent" }
		},
		date: {
			short: {
				month: "numeric",
				day: "numeric",
				year: "2-digit"
			},
			medium: {
				month: "short",
				day: "numeric",
				year: "numeric"
			},
			long: {
				month: "long",
				day: "numeric",
				year: "numeric"
			},
			full: {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric"
			}
		},
		time: {
			short: {
				hour: "numeric",
				minute: "numeric"
			},
			medium: {
				hour: "numeric",
				minute: "numeric",
				second: "numeric"
			},
			long: {
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
				timeZoneName: "short"
			},
			full: {
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
				timeZoneName: "short"
			}
		}
	};
}

var common$1 = {
	outdoor: "Outdoor",
	flow: "Flow",
	room: "Room",
	adjusting: "Adjusting",
	heating: "Heating",
	cooling: "Cooling",
	drying: "Drying",
	idle: "Idle",
	off: "Off",
	fan: "Fan",
	defrosting: "Defrosting",
	preheating: "Preheating",
	not_found: "{entity} not found",
	wwsd: "Standby",
	wwsd_label: "Outdoor temperature meets room setpoint",
	manual: "Manual",
	manual_override: "Manual override"
};
var status_card$1 = {
	name: "Equitherm Status Card",
	description: "Display heating status with temperature readings",
	default_title: "Heating Status"
};
var curve_card$1 = {
	name: "Equitherm Curve Card",
	description: "Interactive heating curve visualization",
	default_title: "Heating Curve",
	flow_temp: "Flow Temp",
	outdoor_axis_suffix: "outdoor",
	flow_axis_suffix: "flow"
};
var tuning_dialog$1 = {
	default_title: "Curve Tuning",
	current: "Current",
	proposed: "Proposed",
	apply: "Apply",
	applying: "Applying...",
	applied: "Applied",
	reset: "Reset",
	outdoor_axis_suffix: "outdoor",
	flow_axis_suffix: "flow",
	edit: "Edit",
	hc_short: "HC",
	shift_short: "Shift",
	tune: "Tune"
};
var forecast_card$1 = {
	name: "Equitherm Forecast Card",
	description: "Heating forecast based on weather predictions",
	default_title: "Heating Forecast",
	flow_temp: "Flow Temp",
	outdoor_temp: "Outdoor",
	peak: "Peak"
};
var editor$1 = {
	required: "Required",
	optional: "Optional",
	appearance: "Appearance",
	climate_entity: "Climate Entity",
	outdoor_entity: "Outdoor Temperature",
	flow_entity: "Flow Setpoint",
	curve_output_entity: "Curve Output",
	pid_output_entity: "PID Output",
	rate_limiting_entity: "Rate Limiting",
	pid_active_entity: "PID Active",
	wws_entity: "WWS Active",
	title: "Title (optional)",
	name: "Name",
	entities: "Entities",
	curve_parameters: "Curve Parameters",
	display_range: "Display Range",
	curve_from_entities: "Live parameters from device",
	hc_entity: "Heat Curve Entity",
	n_entity: "Exponent Entity",
	shift_entity: "Shift Entity",
	hc: "Heat Curve (hc)",
	n: "Exponent (n)",
	shift: "Shift",
	min_flow: "Min Flow",
	max_flow: "Max Flow",
	min_flow_entity: "Min Flow Entity",
	max_flow_entity: "Max Flow Entity",
	t_out_min: "Min Outdoor",
	t_out_max: "Max Outdoor",
	weather_entity: "Weather Entity",
	hours: "Hours",
	forecast_settings: "Forecast",
	recalculate_service: "Recalculate Service",
	tunable: "Enable Tuning",
	tuning: "Tuning",
	advanced: "Advanced",
	show_last_updated: "Show last updated",
	show_kpi_footer: "Show temperatures",
	show_params_footer: "Show curve parameters",
	pid_correction_entity: "PID Correction",
	pid_proportional_entity: "PID Proportional",
	pid_integral_entity: "PID Integral",
	pid_derivative_entity: "PID Derivative",
	boiler_temp_entity: "Boiler Flow Temperature",
	return_temp_entity: "Return Temperature",
	flame_entity: "Flame Status",
	setpoint_entity: "Flow Setpoint",
	modulation_entity: "Modulation Level",
	max_modulation_entity: "Max Modulation Entity",
	ch_active_entity: "Central Heating Active",
	dhw_active_entity: "DHW Active",
	dhw_enable_entity: "DHW Enable",
	dhw_setpoint_entity: "DHW Setpoint",
	dhw_temp_entity: "DHW Temperature",
	condensing_threshold: "Condensing Threshold",
	display: "Display",
	helper: {
		curve_from_entities: "Read from ESPHome runtime-tunable numbers instead of static values",
		hc: "How aggressively heating responds to cold — increase if room is too cold in winter",
		n: "Radiator type — 1.0 underfloor, 1.25 panel (default), 1.3 cast iron",
		shift: "Move the whole curve up or down — increase if too cold in mild weather",
		min_flow: "Minimum boiler output, prevents condensation and protects heat exchanger",
		max_flow: "Maximum boiler output, protects system and limits energy use",
		t_out_min: "Left edge of chart (coldest outdoor temperature displayed)",
		t_out_max: "Right edge of chart (warmest outdoor temperature displayed)",
		hours: "Number of hours of data to display",
		hc_entity: "Runtime-adjustable heat curve coefficient number",
		n_entity: "Runtime-adjustable radiator exponent number",
		shift_entity: "Runtime-adjustable curve shift number",
		curve_output_entity: "Pure heating curve output before PID and rate limiting",
		pid_output_entity: "Curve output after PID correction (before rate limiting)",
		rate_limiting_entity: "ON when output is ramping to prevent thermal shock",
		pid_active_entity: "ON when at least one PID gain (kp, ki, kd) is non-zero",
		outdoor_entity: "Overrides the weather entity's current temperature for footer display",
		min_flow_entity: "Runtime-adjustable minimum flow temperature number",
		max_flow_entity: "Runtime-adjustable maximum flow temperature number",
		recalculate_service: "Service to call after applying a value, e.g. climate.equitherm_force_recalculate. Only called if the service exists.",
		tunable: "Show tuning controls to adjust hc and shift values interactively",
		show_last_updated: "Display when sensor data was last received",
		show_kpi_footer: "Display outdoor, flow, and room temperature readings",
		show_params_footer: "Display HC, n, and Shift curve parameters",
		pid_correction_entity: "Total PID correction applied to the curve output",
		pid_proportional_entity: "Proportional term output (response to current error)",
		pid_integral_entity: "Integral term output (response to accumulated error)",
		pid_derivative_entity: "Derivative term output (response to error rate of change)",
		boiler_temp_entity: "Boiler flow (supply) water temperature sensor",
		return_temp_entity: "Return water temperature sensor",
		flame_entity: "Binary sensor indicating boiler flame is on",
		setpoint_entity: "Target flow temperature setpoint",
		modulation_entity: "Current boiler modulation level (%)",
		ch_active_entity: "Recommended to avoid false positives during DHW cycles. If absent, flame is used as proxy.",
		dhw_active_entity: "Binary sensor indicating domestic hot water is actively heating",
		dhw_temp_entity: "DHW temperature sensor showing current hot water temperature"
	}
};
var opentherm$1 = {
	status_card: {
		name: "OpenTherm Status",
		description: "Boiler status at a glance",
		default_title: "Boiler",
		flow: "Flow",
		"return": "Return",
		modulation: "Modulation",
		flame: "Flame",
		ch: "CH",
		dhw: "DHW"
	},
	dhw_card: {
		name: "OpenTherm DHW",
		description: "Domestic hot water control",
		default_title: "Hot Water",
		enable: "Enable",
		setpoint: "Setpoint",
		dhw: "DHW"
	},
	efficiency_card: {
		name: "OpenTherm Efficiency",
		description: "Boiler condensing efficiency chart",
		default_title: "Efficiency",
		temp_axis: "Temperature",
		condensing: "Condensing",
		non_condensing: "Non-condensing",
		too_hot: "Return too hot"
	},
	modulation_card: {
		name: "OpenTherm Modulation",
		description: "Boiler modulation and short-cycle diagnostics",
		default_title: "Modulation",
		current: "Current",
		max: "Max",
		cycles_per_hour: "cycles/h"
	}
};
var en = {
	common: common$1,
	status_card: status_card$1,
	curve_card: curve_card$1,
	tuning_dialog: tuning_dialog$1,
	forecast_card: forecast_card$1,
	editor: editor$1,
	opentherm: opentherm$1
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$1,
    curve_card: curve_card$1,
    default: en,
    editor: editor$1,
    forecast_card: forecast_card$1,
    opentherm: opentherm$1,
    status_card: status_card$1,
    tuning_dialog: tuning_dialog$1
});

var common = {
	outdoor: "Extérieur",
	flow: "Départ",
	room: "Pièce",
	adjusting: "Ajustement",
	heating: "Chauffage",
	cooling: "Refroidissement",
	drying: "Déshumidification",
	idle: "Inactif",
	off: "Éteint",
	fan: "Ventilation",
	defrosting: "Dégivrage",
	preheating: "Préchauffage",
	not_found: "{entity} introuvable",
	wwsd: "Veille",
	wwsd_label: "Température extérieure ≥ consigne"
};
var status_card = {
	name: "Carte Status Equitherm",
	description: "Affiche le statut du chauffage avec les températures",
	default_title: "Statut Chauffage"
};
var curve_card = {
	name: "Carte Courbe Equitherm",
	description: "Visualisation interactive de la courbe de chauffage",
	default_title: "Courbe de Chauffage",
	flow_temp: "Temp. Départ",
	outdoor_axis_suffix: "extérieur",
	flow_axis_suffix: "départ"
};
var tuning_dialog = {
	default_title: "Réglage Courbe",
	current: "Actuelle",
	proposed: "Proposée",
	apply: "Appliquer",
	applying: "Application...",
	applied: "Appliqué",
	reset: "Réinitialiser",
	outdoor_axis_suffix: "extérieur",
	flow_axis_suffix: "départ",
	edit: "Régler",
	hc_short: "HC",
	shift_short: "Décalage",
	tune: "Régler"
};
var forecast_card = {
	name: "Carte Prévision Equitherm",
	description: "Prévision de chauffage basée sur les prévisions météo",
	default_title: "Prévision Chauffage",
	flow_temp: "Temp. Départ",
	outdoor_temp: "Extérieur",
	peak: "Pic"
};
var editor = {
	required: "Requis",
	optional: "Optionnel",
	appearance: "Apparence",
	climate_entity: "Entité Climat",
	outdoor_entity: "Température Extérieure",
	flow_entity: "Consigne Départ",
	curve_output_entity: "Sortie Courbe",
	pid_output_entity: "Sortie PID",
	rate_limiting_entity: "Limitation",
	pid_active_entity: "PID Actif",
	wws_entity: "WWS Actif",
	title: "Titre (optionnel)",
	name: "Nom",
	entities: "Entités",
	curve_parameters: "Paramètres Courbe",
	display_range: "Plage d'Affichage",
	curve_from_entities: "Paramètres live depuis l'appareil",
	hc_entity: "Entité Coeff. Courbe",
	n_entity: "Entité Exposant",
	shift_entity: "Entité Décalage",
	hc: "Coeff. Courbe (hc)",
	n: "Exposant (n)",
	shift: "Décalage",
	min_flow: "Départ Min",
	max_flow: "Départ Max",
	min_flow_entity: "Entité Départ Min",
	max_flow_entity: "Entité Départ Max",
	t_out_min: "Extérieur Min",
	t_out_max: "Extérieur Max",
	weather_entity: "Entité Météo",
	hours: "Heures",
	forecast_settings: "Prévision",
	recalculate_service: "Service de Recalcul",
	tunable: "Activer le Réglage",
	tuning: "Réglage",
	advanced: "Avancé",
	show_last_updated: "Afficher dernière mise à jour",
	show_kpi_footer: "Afficher les températures",
	show_params_footer: "Afficher les paramètres de courbe",
	pid_correction_entity: "Correction PID",
	pid_proportional_entity: "PID Proportionnel",
	pid_integral_entity: "PID Intégral",
	pid_derivative_entity: "PID Dérivé",
	boiler_temp_entity: "Température Départ Chaudière",
	return_temp_entity: "Température Retour",
	flame_entity: "Statut Flamme",
	setpoint_entity: "Consigne Départ",
	modulation_entity: "Niveau Modulation",
	max_modulation_entity: "Entité modulation max",
	ch_active_entity: "Chauffage Central Actif",
	dhw_active_entity: "ECS Actif",
	dhw_enable_entity: "ECS Activé",
	dhw_setpoint_entity: "Consigne ECS",
	dhw_temp_entity: "Température ECS",
	condensing_threshold: "Seuil de Condensation",
	display: "Affichage",
	helper: {
		curve_from_entities: "Lire depuis les nombres ESPHome ajustables au lieu de valeurs statiques",
		hc: "Agressivité du chauffage par temps froid — augmenter si la pièce est trop froide en hiver",
		n: "Type de radiateur — 1.0 plancher chauffant, 1.25 panneau (défaut), 1.3 fonte",
		shift: "Décaler toute la courbe vers le haut ou le bas — augmenter si trop froid par temps doux",
		min_flow: "Sortie minimale de la chaudière, évite la condensation et protège l'échangeur",
		max_flow: "Sortie maximale de la chaudière, protège le système et limite la consommation",
		t_out_min: "Bord gauche du graphique (température extérieure la plus froide affichée)",
		t_out_max: "Bord droit du graphique (température extérieure la plus chaude affichée)",
		hours: "Nombre d'heures de données à afficher",
		hc_entity: "Nombre ajustable du coefficient de courbe de chauffage",
		n_entity: "Nombre ajustable de l'exposant de radiateur",
		shift_entity: "Nombre ajustable du décalage de courbe",
		curve_output_entity: "Sortie pure de la courbe de chauffage avant PID et limitation",
		pid_output_entity: "Sortie de courbe après correction PID (avant limitation)",
		rate_limiting_entity: "ON quand la sortie est en rampe pour éviter le choc thermique",
		pid_active_entity: "ON quand au moins un gain PID (kp, ki, kd) est non nul",
		outdoor_entity: "Remplace la température actuelle de l'entité météo pour l'affichage",
		min_flow_entity: "Nombre ajustable de la température de départ minimale",
		max_flow_entity: "Nombre ajustable de la température de départ maximale",
		recalculate_service: "Service à appeler après l'application d'une valeur, ex. climate.equitherm_force_recalculate. Appelé uniquement si le service existe.",
		tunable: "Afficher les commandes de réglage pour ajuster hc et shift interactivement",
		show_last_updated: "Afficher l'heure de la dernière réception des données du capteur",
		show_kpi_footer: "Afficher les températures extérieure, départ et pièce",
		show_params_footer: "Afficher les paramètres HC, n et Shift de la courbe",
		pid_correction_entity: "Correction totale du PID appliquée à la sortie de courbe",
		pid_proportional_entity: "Terme proportionnel (réponse à l'erreur actuelle)",
		pid_integral_entity: "Terme intégral (réponse à l'erreur accumulée)",
		pid_derivative_entity: "Terme dérivé (réponse à la vitesse de changement de l'erreur)",
		boiler_temp_entity: "Capteur de température d'eau de départ (supply) chaudière",
		return_temp_entity: "Capteur de température de retour d'eau",
		flame_entity: "Capteur binaire indiquant que la flamme chaudière est allumée",
		setpoint_entity: "Consigne de température de départ cible",
		modulation_entity: "Niveau actuel de modulation chaudière (%)",
		ch_active_entity: "Recommandé pour éviter les faux positifs lors des cycles ECS. Si absent, la flamme est utilisée comme proxy.",
		dhw_active_entity: "Capteur binaire indiquant que l'eau chaude sanitaire chauffe activement",
		dhw_temp_entity: "Capteur de température ECS affichant la température actuelle de l'eau chaude"
	}
};
var opentherm = {
	status_card: {
		name: "Statut OpenTherm",
		description: "Statut chaudière en un coup d'œil",
		default_title: "Chaudière",
		flow: "Départ",
		"return": "Retour",
		modulation: "Modulation",
		flamme: "Flamme",
		ch: "CH",
		dhw: "ECS"
	},
	dhw_card: {
		name: "OpenTherm ECS",
		description: "Contrôle de l'eau chaude sanitaire",
		default_title: "Eau Chaude",
		enable: "Activer",
		setpoint: "Consigne",
		dhw: "ECS"
	},
	efficiency_card: {
		name: "Efficacité OpenTherm",
		description: "Graphique d'efficacité de condensation chaudière",
		default_title: "Efficacité",
		temp_axis: "Température",
		condensing: "Condensation",
		non_condensing: "Sans condensation",
		too_hot: "Retour trop chaud"
	},
	modulation_card: {
		name: "Modulation OpenTherm",
		description: "Diagnostics modulation et court-cycles chaudière",
		default_title: "Modulation",
		current: "Actuelle",
		max: "Max",
		cycles_per_hour: "cycles/h"
	}
};
var fr = {
	common: common,
	status_card: status_card,
	curve_card: curve_card,
	tuning_dialog: tuning_dialog,
	forecast_card: forecast_card,
	editor: editor,
	opentherm: opentherm
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common,
    curve_card: curve_card,
    default: fr,
    editor: editor,
    forecast_card: forecast_card,
    opentherm: opentherm,
    status_card: status_card,
    tuning_dialog: tuning_dialog
});

const languages = {
    en: en$1,
    fr: fr$1,
};
const DEFAULT_LANG = "en";
function getTranslatedString(key, lang) {
    try {
        return key
            .split(".")
            .reduce((o, i) => o[i], languages[lang]);
    }
    catch (_) {
        return undefined;
    }
}
const localizeCache = new Map();
function setupCustomlocalize(hass) {
    const lang = hass?.locale.language ?? DEFAULT_LANG;
    let cached = localizeCache.get(lang);
    if (cached)
        return cached;
    cached = function localize(key, argObject = {}) {
        let translated = getTranslatedString(key, lang);
        if (!translated)
            translated = getTranslatedString(key, DEFAULT_LANG);
        if (!translated)
            return key;
        try {
            const translatedMessage = new IntlMessageFormat(translated, lang);
            return translatedMessage.format(argObject);
        }
        catch (e) {
            console.error(`Error formatting message for key "${key}" with lang "${lang}":`, e);
            return translated;
        }
    };
    localizeCache.set(lang, cached);
    return cached;
}

// src/utils/actions.ts
/**
 * Action handling utilities for Lovelace cards.
 * Based on Mushroom's action patterns.
 */
/** Execute a Lovelace action (more-info, navigate, call-service, url) */
function executeAction(element, hass, action, entityId) {
    if (!action || action.action === 'none')
        return;
    switch (action.action) {
        case 'more-info':
            fireEvent(element, 'hass-more-info', {
                entityId,
            });
            break;
        case 'navigate':
            if (action.navigation_path) {
                // Use History API directly for navigation (Mushroom pattern)
                window.history.pushState(null, '', action.navigation_path);
                window.dispatchEvent(new Event('location-changed'));
            }
            break;
        case 'call-service':
            if (action.service) {
                const [domain, service] = action.service.split('.', 2);
                hass.callService(domain, service, action.service_data ?? {});
            }
            break;
        case 'url':
            if (action.url_path) {
                window.open(action.url_path, '_blank');
            }
            break;
        case 'assist':
            // HA 2024.x+ assist action - use custom event
            element.dispatchEvent(new CustomEvent('hass-assist', { bubbles: true, composed: true }));
            break;
    }
}

class BaseCard extends EquithermBaseElement {
    _entityState(entityId) {
        if (!entityId || !this.hass)
            return undefined;
        return this.hass.states[entityId];
    }
    _entityAttr(entityId, key) {
        return this._entityState(entityId)?.attributes?.[key];
    }
    _resolveEntityNumber(entityId, fallback) {
        const s = this._entityState(entityId);
        if (!s)
            return fallback;
        const val = parseFloat(s.state);
        return isNaN(val) ? fallback : val;
    }
    /** Resolve an entity's numeric state, converting from display unit to °C. */
    _resolveEntityTemp(entityId, fallback) {
        const s = this._entityState(entityId);
        if (!s)
            return fallback;
        const val = parseFloat(s.state);
        return isNaN(val) ? fallback : this._fromDisplayTemp(val);
    }
    _entityExists(entityId) {
        return !!this._entityState(entityId);
    }
    /** Format a temperature from an entity's state using HA's native formatter. */
    _formatEntityTemp(entityId) {
        const stateObj = this._entityState(entityId);
        if (!stateObj)
            return '—';
        return this.hass.formatEntityState(stateObj);
    }
    /** Format a computed temperature value (always °C) for display. Converts to the user's unit via _toDisplayTemp. */
    _formatCalcTemp(value) {
        if (value == null || isNaN(value))
            return '—';
        const display = this._toDisplayTemp(value);
        const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
        return `${formatNumber(display, this.hass?.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;
    }
    _openMoreInfo(entityId) {
        if (entityId && this.hass) {
            executeAction(this, this.hass, { action: 'more-info' }, entityId);
        }
    }
    /** Hook — override to return the primary entity used for the card title. */
    _titleEntity() {
        return undefined;
    }
    /** Resolve card title: entity name → config.name → fallback i18n key. */
    _computeCardTitle(fallbackKey) {
        const localize = setupCustomlocalize(this.hass);
        const fallback = localize(fallbackKey);
        const stateObj = this._entityState(this._titleEntity());
        const configName = this._config.name;
        if (!stateObj)
            return configName ?? fallback;
        return computeEntityNameDisplay(stateObj, configName, this.hass) || configName || fallback;
    }
    /** Override to control footer visibility. Defaults to checking config.show_last_updated. */
    _showFooterMeta() {
        return !!this._config?.show_last_updated;
    }
    /** Override to specify which entity's freshness the footer should track. */
    _lastUpdatedEntity() {
        return undefined;
    }
    /** Whether the tracked entity is stale (>5 min) or unavailable. */
    _isFooterVisible() {
        const entityId = this._lastUpdatedEntity();
        const state = this._entityState(entityId);
        if (!entityId || !state || !this.hass)
            return false;
        const isUnavailable = state.state === 'unavailable' || state.state === 'unknown';
        const age = Date.now() - new Date(state.last_updated).getTime();
        return isUnavailable || age > 5 * 60 * 1000;
    }
    /** Render the footer meta line — only visible when entity is stale (>5 min) or unavailable. */
    _renderFooterMeta() {
        if (!this._showFooterMeta() || !this._isFooterVisible())
            return A;
        const state = this._entityState(this._lastUpdatedEntity());
        const isUnavailable = state.state === 'unavailable' || state.state === 'unknown';
        return b `
      <div class="footer-meta${isUnavailable ? ' footer-meta--warn' : ''}">
        <ha-relative-time .hass=${this.hass} .datetime=${state.last_updated} capitalize></ha-relative-time>
      </div>
    `;
    }
    // === Shared Header ===
    /** Hook to customize header icon color. Return a CSS rgb() value or var() reference. */
    _headerIconColor() {
        return 'var(--rgb-disabled, 158,158,158)';
    }
    /** Render the header icon tile with customizable color via _headerIconColor(). */
    _renderHeaderIcon(iconName, clickEntity) {
        return b `
      <ha-tile-icon
        .interactive=${true}
        style=${o({ '--tile-icon-color': `rgb(${this._headerIconColor()})`, '--tile-icon-size': '42px' })}
        @click=${() => this._openMoreInfo(clickEntity)}
      >
        <ha-icon slot="icon" .icon=${iconName}></ha-icon>
      </ha-tile-icon>
    `;
    }
    /** Render the title and optional subtitle. */
    _renderHeaderInfo(title, subtitle) {
        const stateLine = subtitle !== undefined && subtitle !== A
            ? b `<span class="state">${subtitle}</span>` : A;
        return b `
      <div class="header-info">
        <span class="title">${title}</span>
        ${stateLine}
      </div>
    `;
    }
    /** Override to add badges to the header. */
    _renderHeaderBadges() {
        return A;
    }
    /** Shared header renderer for all cards. */
    _renderHeader(opts) {
        if (!this._config || !this.hass)
            return A;
        return b `
      <div class="header">
        ${this._renderHeaderIcon(opts.iconName, opts.clickEntity)}
        ${this._renderHeaderInfo(opts.title, opts.subtitle)}
        ${this._renderHeaderBadges()}
      </div>
    `;
    }
    getGridOptions() {
        return { columns: 6, rows: 2, min_rows: 1 };
    }
    getCardSize() {
        return 2;
    }
}
__decorate([
    r()
], BaseCard.prototype, "_config", void 0);

// ============================================================================
// HVAC Action Icons (no HA equivalent — HA uses async attribute-icon lookup)
// ============================================================================
const HVAC_ACTION_ICONS = {
    heating: 'mdi:fire',
    cooling: 'mdi:snowflake',
    drying: 'mdi:water-percent',
    idle: 'mdi:clock-outline',
    off: null,
    fan: 'mdi:fan',
    defrosting: 'mdi:snowflake-melt',
    preheating: 'mdi:fire',
};
function getHvacActionIcon(action) {
    return HVAC_ACTION_ICONS[action ?? 'off'] ?? null;
}
// ============================================================================
// Action Normalization (equitherm-specific)
// ============================================================================
function normalizeHvacAction(action) {
    switch (action) {
        case 'heating':
        case 'heat':
            return 'heating';
        case 'cooling':
        case 'cool':
            return 'cooling';
        case 'drying':
        case 'dry':
            return 'drying';
        case 'fan':
        case 'fan_only':
            return 'fan';
        case 'defrosting':
            return 'defrosting';
        case 'preheating':
            return 'preheating';
        case 'off':
            return 'off';
        case 'idle':
        default:
            return 'idle';
    }
}
// ============================================================================
// Color Helpers (bridge between stateColorCss and RGB triple consumers)
// ============================================================================
/**
 * Get RGB triple CSS var for an HVAC action.
 * Maps action → mode → --rgb-state-climate-{mode} CSS variable.
 * Used by eq-badge-info and ECharts which need RGB triples.
 */
function getHvacActionColor(action) {
    const mode = CLIMATE_HVAC_ACTION_TO_MODE[action] ?? 'off';
    return `var(--rgb-state-climate-${mode === 'heat_cool' ? 'heat-cool' : mode})`;
}
// ============================================================================
// HVAC Badge Builder (shared by all 3 cards)
// ============================================================================
const ACTIVE_ACTIONS = new Set(['heating', 'cooling', 'drying', 'defrosting', 'preheating']);
/**
 * Build eq-badge-info props for an HVAC action state.
 * Handles adjusting mode (shows trend icon + "Adjusting" label).
 */
function getHvacBadgeProps(localize, action, adjusting = false, direction = null) {
    if (adjusting) {
        const trendIcon = direction === 'rising' ? 'mdi:trending-up'
            : direction === 'falling' ? 'mdi:trending-down'
                : 'mdi:trending-neutral';
        return {
            label: localize('common.adjusting'),
            color: getHvacActionColor('heating'),
            icon: trendIcon,
            active: true,
        };
    }
    const actionLabels = {
        heating: 'common.heating',
        cooling: 'common.cooling',
        drying: 'common.drying',
        idle: 'common.idle',
        off: 'common.off',
        fan: 'common.fan',
        defrosting: 'common.defrosting',
        preheating: 'common.preheating',
    };
    return {
        label: localize(actionLabels[action]),
        color: getHvacActionColor(action),
        icon: getHvacActionIcon(action) ?? undefined,
        active: ACTIVE_ACTIONS.has(action),
    };
}
// ============================================================================
// Runtime Color Resolution (for ECharts)
// ============================================================================
/**
 * Resolve a CSS variable to its actual RGB value at runtime.
 * Used for ECharts which can't parse CSS variables.
 */
function resolveRgbColor(element, action) {
    const cssVar = getHvacActionColor(action);
    const varMatch = cssVar.match(/var\((--[^)]+)\)/);
    if (!varMatch)
        return cssVar;
    const value = getComputedStyle(element).getPropertyValue(varMatch[1]).trim();
    return value ? `rgb(${value})` : cssVar;
}

function isRateLimitingActive(config, lookup) {
    if (!config.rate_limiting_entity)
        return false;
    return lookup(config.rate_limiting_entity)?.state === 'on';
}
function isPidActive(config, lookup) {
    if (!config.pid_active_entity)
        return false;
    return lookup(config.pid_active_entity)?.state === 'on';
}
function getRateTargetEntity(config) {
    return config.pid_output_entity ?? config.curve_output_entity;
}
function getAdjustingDirection(config, lookup) {
    if (!isRateLimitingActive(config, lookup))
        return null;
    const target = getRateTargetEntity(config);
    if (!target)
        return null;
    const flowState = lookup(config.flow_entity);
    const targetState = lookup(target);
    if (!flowState || !targetState)
        return null;
    const flow = parseFloat(flowState.state);
    const t = parseFloat(targetState.state);
    if (isNaN(flow) || isNaN(t))
        return null;
    if (flow < t)
        return 'rising';
    if (flow > t)
        return 'falling';
    return null;
}

let EqParamBar = class EqParamBar extends i$2 {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = null;
        this.centered = false;
        this.indicator = false;
        this.minFill = 4;
        this.step = 1;
        this.interactive = false;
        this.hideDragTip = false;
        this._pressed = false;
        /** Cached track element reference from pointerdown, avoids null issues during drag */
        this._trackEl = null;
    }
    _pct(v) {
        const range = this.max - this.min;
        if (range === 0)
            return 0;
        return Math.max(0, Math.min(100, ((v - this.min) / range) * 100));
    }
    _onRangeInput(e) {
        const value = parseFloat(e.target.value);
        if (value === this.value)
            return;
        this.value = value;
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
    }
    _onPointerDown(e) {
        if (!this.interactive)
            return;
        this._pressed = true;
        this._trackEl = e.currentTarget;
        this._trackEl.setPointerCapture(e.pointerId);
        this._updateFromPointer(e, false);
    }
    _onPointerMove(e) {
        if (!this.interactive || !(e.buttons & 1))
            return;
        this._updateFromPointer(e, false);
    }
    _onPointerUp(e) {
        if (!this.interactive)
            return;
        this._pressed = false;
        this._updateFromPointer(e, true);
        this._trackEl = null;
        this.renderRoot.querySelector('input.sr-only')?.focus();
    }
    _onClick(e) {
        // When interactive, the bar IS the control — consume the click
        // so it doesn't bubble to parent .param-item or .params-footer-tunable
        if (this.interactive)
            e.stopPropagation();
    }
    _onPointerCancel() {
        this._pressed = false;
        this._trackEl = null;
    }
    _updateFromPointer(e, final) {
        const track = this._trackEl ?? this.renderRoot.querySelector('.track');
        if (!track)
            return;
        const rect = track.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const raw = this.min + pct * (this.max - this.min);
        const effectiveStep = this.step || 1;
        const snapped = Math.round(raw / effectiveStep) * effectiveStep;
        const clamped = parseFloat(Math.max(this.min, Math.min(this.max, snapped)).toFixed(10));
        if (!final && clamped === this.value)
            return;
        this.value = clamped;
        this.dispatchEvent(new CustomEvent(final ? 'value-changed' : 'slider-moved', {
            detail: { value: clamped },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        if (this.value === null)
            return b `<div class="track"></div>`;
        const fillColor = this.color ?? 'var(--eq-bar-fill-color)';
        const dotColor = fillColor;
        const hiddenRange = this.interactive
            ? b `<input
          type="range"
          class="sr-only"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.value ?? 0}
          aria-valuetext="${this.value} ${this.ariaUnit ?? ''}"
          @input=${this._onRangeInput}
        />`
            : A;
        if (this.centered) {
            const centerPct = this._pct(0);
            const valPct = this._pct(this.value);
            const barLeft = Math.min(centerPct, valPct);
            const rawWidth = Math.abs(valPct - centerPct);
            return b `
        <div class="track${this._pressed ? ' pressed' : ''}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @click=${this._onClick}
        >
          <div class="center-mark"></div>
          ${rawWidth > 0 ? b `
            <div class="fill" style=${o({
                left: `${barLeft}%`,
                width: `${rawWidth}%`,
                background: fillColor,
                minWidth: `${this.minFill}px`,
            })}></div>
          ` : A}
          ${this.indicator ? b `
            <div class="dot" style=${o({
                left: `${valPct}%`,
                background: dotColor,
            })}></div>
          ` : A}
          ${this._pressed && !this.hideDragTip ? b `
            <span class="drag-tip" style=${o({ '--tip-left': `${valPct}%` })}>${this.value}${this.ariaUnit ? ` ${this.ariaUnit}` : ''}</span>
          ` : A}
          ${hiddenRange}
        </div>
      `;
        }
        const pct = this._pct(this.value);
        return b `
      <div class="track${this._pressed ? ' pressed' : ''}"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @click=${this._onClick}
      >
        <div class="fill" style=${o({
            width: `${pct}%`,
            left: '0',
            background: fillColor,
        })}></div>
        ${this.indicator ? b `
          <div class="dot" style=${o({
            left: `${pct}%`,
            background: fillColor,
        })}></div>
        ` : A}
        ${this._pressed && !this.hideDragTip ? b `
          <span class="drag-tip" style=${o({ '--tip-left': `${pct}%` })}>${this.value}${this.ariaUnit ? ` ${this.ariaUnit}` : ''}</span>
        ` : A}
        ${hiddenRange}
      </div>
    `;
    }
};
EqParamBar.styles = i$5 `
    :host {
      display: block;
      width: 100%;
      --eq-bar-height: 4px;
      --eq-bar-track-color: var(--secondary-background-color, rgba(0,0,0,0.08));
      --eq-bar-fill-color: var(--primary-color);
      --eq-bar-radius: 2px;
    }
    .track {
      width: 100%;
      height: var(--eq-bar-height);
      border-radius: var(--eq-bar-radius);
      background: var(--eq-bar-track-color);
      position: relative;
    }
    :host([interactive]) .track {
      cursor: pointer;
      touch-action: none;
    }
    .fill {
      height: 100%;
      border-radius: var(--eq-bar-radius);
      background: var(--eq-bar-fill-color);
      transition: width 0.3s ease, left 0.3s ease;
      position: absolute;
      top: 0;
    }
    .center-mark {
      position: absolute;
      top: -1px;
      left: 50%;
      width: 2px;
      height: calc(100% + 2px);
      border-radius: 1px;
      background: var(--divider-color, rgba(0,0,0,0.2));
      transform: translateX(-1px);
    }
    .dot {
      position: absolute;
      top: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--eq-bar-fill-color);
      border: 2px solid var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transform: translate(-50%, -50%);
      transition: left 0.3s ease;
      z-index: 1;
    }
    .pressed .fill,
    .pressed .dot {
      transition: none;
    }
    .drag-tip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: var(--tip-left, 50%);
      transform: translateX(-50%);
      font-size: var(--ha-font-size-xs, 0.75rem);
      font-weight: var(--ha-font-weight-medium, 500);
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 4px;
      padding: 1px 5px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
__decorate([
    n$1({ type: Number })
], EqParamBar.prototype, "min", void 0);
__decorate([
    n$1({ type: Number })
], EqParamBar.prototype, "max", void 0);
__decorate([
    n$1({ type: Number, reflect: true })
], EqParamBar.prototype, "value", void 0);
__decorate([
    n$1({ type: Boolean })
], EqParamBar.prototype, "centered", void 0);
__decorate([
    n$1({ type: Boolean })
], EqParamBar.prototype, "indicator", void 0);
__decorate([
    n$1({ type: String })
], EqParamBar.prototype, "color", void 0);
__decorate([
    n$1({ type: Number })
], EqParamBar.prototype, "minFill", void 0);
__decorate([
    n$1({ type: Number })
], EqParamBar.prototype, "step", void 0);
__decorate([
    n$1({ type: Boolean, reflect: true })
], EqParamBar.prototype, "interactive", void 0);
__decorate([
    n$1({ type: String })
], EqParamBar.prototype, "ariaUnit", void 0);
__decorate([
    n$1({ type: Boolean })
], EqParamBar.prototype, "hideDragTip", void 0);
__decorate([
    r()
], EqParamBar.prototype, "_pressed", void 0);
EqParamBar = __decorate([
    t$1('eq-param-bar')
], EqParamBar);

/** Shared CSS for card headers (used by all equitherm and opentherm cards) */
const headerStyles = i$5 `
  .header {
    display: flex;
    align-items: center;
    padding: 10px 10px 0;
    margin-bottom: 12px;
    gap: 12px;
    flex-shrink: 0;
  }
  ha-tile-icon {
    cursor: pointer;
    flex-shrink: 0;
  }
  .header-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title {
    font-size: var(--ha-font-size-m, 1rem);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .state {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: var(--ha-line-height-condensed, 1.2);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`;

/**
 * Base class for equitherm cards.
 * Extends BaseCard with equitherm-specific helpers.
 */
class EquithermBaseCard extends BaseCard {
    constructor() {
        super(...arguments);
        this._showTuningDialog = false;
        this._openTuningDialog = () => {
            this._showTuningDialog = true;
        };
        this._onDeltaParamChanged = (e) => {
            const entityId = e.target.dataset.entityId;
            if (!entityId || !this.hass)
                return;
            const celsiusValue = this._fromDisplayDelta(e.detail.value);
            this.hass.callService(computeDomain(entityId), 'set_value', {
                entity_id: entityId,
                value: celsiusValue,
            });
        };
        this._onParamChanged = (e) => {
            const entityId = e.target.dataset.entityId;
            if (!entityId || !this.hass)
                return;
            this.hass.callService(computeDomain(entityId), 'set_value', {
                entity_id: entityId,
                value: e.detail.value,
            });
        };
    }
    /** Get the climate entity state */
    get _climate() {
        return this._entityState(this._config.climate_entity);
    }
    /** Whether climate preset_mode is "Manual" (curve bypassed) */
    get _isManualPreset() {
        return this._climate?.attributes.preset_mode === 'Manual';
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has('hass') && this.hass) {
            this.toggleAttribute('manual-override', this._isManualPreset);
        }
    }
    /** Formatted room temperature from climate entity */
    get _roomTemp() {
        const temp = this._climate?.attributes.current_temperature;
        return this._formatCalcTemp(temp);
    }
    /** Formatted outdoor temperature from outdoor_entity */
    get _outdoorTempFormatted() {
        return this._formatEntityTemp(this._config.outdoor_entity);
    }
    /** Formatted flow temperature from flow_entity */
    get _flowTempFormatted() {
        return this._formatEntityTemp(this._config.flow_entity);
    }
    /** Formatted curve output temp from rate target entity (for adjusting indicator) */
    get _curveOutputTempFormatted() {
        const entity = getRateTargetEntity(this._config);
        if (!entity)
            return '';
        return this._formatEntityTemp(entity);
    }
    /** Whether Warm Weather Shutdown is active.
     *  When wws_entity is configured, uses its state directly (authoritative).
     *  Otherwise falls back to inferring from outdoor >= target. */
    get _isWWSD() {
        if (this._config?.wws_entity) {
            const s = this._entityState(this._config.wws_entity);
            return s?.state === 'on';
        }
        if (!this._config?.climate_entity)
            return false;
        const tTarget = this._climate?.attributes.temperature;
        if (tTarget == null)
            return false;
        if (!this._config.outdoor_entity)
            return false;
        const s = this._entityState(this._config.outdoor_entity);
        if (!s)
            return false;
        const val = parseFloat(s.state);
        const tOutdoor = isNaN(val) ? NaN : this._fromDisplayTemp(val);
        return !isNaN(tOutdoor) && tOutdoor >= tTarget;
    }
    /** Formatted WWSD explanation with actual temperatures, e.g. "Outdoor 22.0°C ≥ 21.0°C" */
    _wwsdDescription() {
        const localize = setupCustomlocalize(this.hass);
        const tTarget = this._climate?.attributes.temperature;
        const outdoorEntity = this._config.outdoor_entity;
        const s = outdoorEntity ? this._entityState(outdoorEntity) : undefined;
        const tOutdoor = s ? this._fromDisplayTemp(parseFloat(s.state)) : NaN;
        if (!isNaN(tOutdoor) && tTarget != null) {
            return `${localize('common.outdoor')} ${this._formatEntityTemp(outdoorEntity)} ≥ ${this._formatCalcTemp(tTarget)}`;
        }
        return localize('common.wwsd_label');
    }
    // === Render Helpers ===
    /** Render a not-found state for missing entity */
    _renderNotFound(entityId, label) {
        if (!entityId || this._entityExists(entityId))
            return A;
        const localize = setupCustomlocalize(this.hass);
        const display = label ?? entityId;
        return b `
      <div class="not-found">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${localize('common.not_found', { entity: display })}</span>
      </div>
    `;
    }
    _titleEntity() {
        return this._config.climate_entity;
    }
    // === Header ===
    /** HVAC action color for header icon. */
    _headerIconColor() {
        const rawAction = this._climate?.attributes.hvac_action ?? 'off';
        return getHvacActionColor(normalizeHvacAction(rawAction));
    }
    /** Render the title and optional climate target temp state line. */
    _renderHeaderInfo(title, subtitle) {
        const stateLine = subtitle !== undefined
            ? (subtitle === A ? A : b `<span class="state">${subtitle}</span>`)
            : (this._climate?.attributes.temperature != null
                ? b `<span class="state">· ${this._formatCalcTemp(this._climate.attributes.temperature)}</span>`
                : A);
        return b `
      <div class="header-info">
        <span class="title">${title}</span>
        ${stateLine}
      </div>
    `;
    }
    /** Render PID status chip. */
    _renderPidBadge() {
        const cfg = this._config;
        if (!cfg.pid_active_entity)
            return A;
        const lookup = (id) => this._entityState(id);
        const active = isPidActive(cfg, lookup);
        return b `
      <eq-badge-info
        .label=${'PID'}
        style=${`--badge-info-color: ${active ? 'var(--rgb-success)' : 'var(--rgb-disabled)'}`}
        .icon=${active ? undefined : 'mdi:alert-circle-outline'}
      ></eq-badge-info>
    `;
    }
    /** Render WWSD warning badge. */
    _renderWwsdBadge() {
        if (!this._isWWSD)
            return A;
        const localize = setupCustomlocalize(this.hass);
        return b `
      <eq-badge-info
        id="wwsd-badge"
        .label=${localize('common.wwsd')}
        style=${`--badge-info-color: var(--rgb-warning, 255, 167, 38)`}
        .icon=${'mdi:weather-sunny-alert'}
        .active=${true}
      ></eq-badge-info>
      <ha-tooltip for="wwsd-badge" placement="top" without-arrow>
        <span style="white-space: nowrap">${this._wwsdDescription()}</span>
      </ha-tooltip>
    `;
    }
    /** Render Manual preset badge when curve is bypassed. */
    _renderManualBadge() {
        if (!this._isManualPreset)
            return A;
        const localize = setupCustomlocalize(this.hass);
        return b `
      <eq-badge-info
        .label=${localize('common.manual')}
        style=${`--badge-info-color: var(--rgb-warning, 255, 167, 38)`}
        .icon=${'mdi:hand-back-right'}
      ></eq-badge-info>
    `;
    }
    /** Render HVAC action badge with optional rate-limiting indicator. */
    _renderHvacBadge() {
        const localize = setupCustomlocalize(this.hass);
        const rawAction = this._climate?.attributes.hvac_action ?? 'off';
        const hvacAction = normalizeHvacAction(rawAction);
        const lookup = (id) => this._entityState(id);
        const cfg = this._config;
        const badge = getHvacBadgeProps(localize, hvacAction, isRateLimitingActive(cfg, lookup), getAdjustingDirection(cfg, lookup));
        return b `
      <eq-badge-info
        .label=${badge.label}
        style=${`--badge-info-color: ${badge.color}`}
        .icon=${badge.icon}
        .active=${badge.active}
      ></eq-badge-info>
    `;
    }
    /** Override to inject extra badges into the header. */
    _renderExtraBadges() {
        return A;
    }
    /** Render the tune button when tunable mode is active. */
    _renderTuneButton() {
        if (!this._config.tunable)
            return A;
        return b `
      <ha-icon-button
        @click=${this._openTuningDialog}
        style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
      ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
    `;
    }
    /** Render the full badges row. */
    _renderHeaderBadges() {
        const manual = this._isManualPreset;
        return b `
      <div class="badges">
        ${manual ? A : this._renderPidBadge()}
        ${manual ? A : this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderExtraBadges()}
        ${this._renderHvacBadge()}
        ${this._renderTuneButton()}
      </div>
    `;
    }
    // ── KPI footer (shared) ──
    _renderKpiFooter(opts) {
        if (this._config.show_kpi_footer === false)
            return A;
        if (!this._config || !this.hass)
            return A;
        const localize = setupCustomlocalize(this.hass);
        const outdoorEntity = opts?.outdoorClickEntity ?? this._config.outdoor_entity;
        const outdoorMissing = !this._entityExists(outdoorEntity);
        const flowMissing = !this._entityExists(this._config.flow_entity);
        const climateMissing = !this._entityExists(this._config.climate_entity);
        return b `
      <div class="kpi-footer">
        <div class="kpi-block${outdoorMissing ? ' missing' : ''}" @click=${outdoorMissing ? undefined : () => this._openMoreInfo(outdoorEntity)}>
          <div class="kpi-value">${this._outdoorTempFormatted}</div>
          <div class="kpi-label">${localize('common.outdoor')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${flowMissing ? ' missing' : ''}" @click=${flowMissing ? undefined : () => this._openMoreInfo(this._config.flow_entity)}>
          ${opts?.adjustingDir && opts?.curveOutput ? b `
            <div class="kpi-dual">
              <div class="kpi-value flow">${this._flowTempFormatted}</div>
              <div class="kpi-target">
                <ha-icon .icon=${opts.adjustingDir === 'rising' ? 'mdi:arrow-up-thin' : 'mdi:arrow-down-thin'}></ha-icon>
                ${opts.curveOutput}
              </div>
            </div>
          ` : b `<div class="kpi-value flow">${this._flowTempFormatted}</div>`}
          <div class="kpi-label">${localize('common.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${climateMissing ? ' missing' : ''}" @click=${climateMissing ? undefined : () => this._openMoreInfo(this._config.climate_entity)}>
          <div class="kpi-value">${this._roomTemp}</div>
          <div class="kpi-label">${localize('common.room')}</div>
        </div>
      </div>
    `;
    }
    // ── Params footer (shared) ──
    _getEntityRange(entityId, defaultMin, defaultMax) {
        if (!entityId)
            return [defaultMin, defaultMax];
        const min = this._entityAttr(entityId, 'min');
        const max = this._entityAttr(entityId, 'max');
        return [min ?? defaultMin, max ?? defaultMax];
    }
    _getEntityStep(entityId, defaultStep) {
        if (!entityId)
            return defaultStep;
        return this._entityAttr(entityId, 'step') ?? defaultStep;
    }
    _formatParamNum(value, decimals, options) {
        return formatNumber(value, this.hass?.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, ...options });
    }
    _renderDeltaParamItem(label, entityId, fallback, defaultRange, onClick) {
        const rawValue = this._resolveEntityNumber(entityId, fallback);
        const [rawMin, rawMax] = this._getEntityRange(entityId, defaultRange[0], defaultRange[1]);
        const rawStep = this._getEntityStep(entityId, 1);
        const displayVal = this._toDisplayDelta(rawValue);
        const displayMin = this._toDisplayDelta(rawMin);
        const displayMax = this._toDisplayDelta(rawMax);
        const displayStep = this._toDisplayDelta(rawStep);
        const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
        const formatted = this._formatParamNum(displayVal, 1, { signDisplay: 'always' }) + unit;
        const valClass = displayVal > 0 ? 'positive' : displayVal < 0 ? 'negative' : '';
        const color = displayVal >= 0 ? 'var(--success-color, #4caf50)' : 'var(--error-color, #e53935)';
        const canInteract = !!entityId && !!this.hass;
        return b `
      <div class="param-item" @click=${onClick}>
        <span class="param-label">${label}</span>
        <span class="param-value ${valClass}">${formatted}</span>
        <eq-param-bar
          .min=${displayMin} .max=${displayMax} .step=${displayStep}
          .value=${displayVal} centered .color=${color} indicator
          ?interactive=${canInteract}
          data-entity-id=${entityId}
          @value-changed=${canInteract ? this._onDeltaParamChanged : A}
        ></eq-param-bar>
      </div>
    `;
    }
    _renderParamsFooter(params) {
        if (this._config.show_params_footer === false)
            return A;
        const items = [];
        if (params.hc) {
            const entity = params.hc.entity;
            const value = this._resolveEntityNumber(entity, params.hc.fallback);
            const [min, max] = this._getEntityRange(entity, 0.5, 3.0);
            const step = this._getEntityStep(entity, 0.1);
            const hcClick = () => params.hc.onClick ? params.hc.onClick() : this._openMoreInfo(entity);
            const canInteract = !!entity && !!this.hass;
            items.push(b `
        <div class="param-item" @click=${hcClick}>
          <span class="param-label">HC</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar
            .min=${min} .max=${max} .step=${step} .value=${value} indicator
            ?interactive=${canInteract}
            data-entity-id=${entity}
            @value-changed=${canInteract ? this._onParamChanged : A}
          ></eq-param-bar>
        </div>
      `);
        }
        if (params.n) {
            const entity = params.n.entity;
            const value = this._resolveEntityNumber(entity, params.n.fallback);
            const [min, max] = this._getEntityRange(entity, 1.0, 2.0);
            const step = this._getEntityStep(entity, 0.01);
            const nClick = () => params.n.onClick ? params.n.onClick() : this._openMoreInfo(entity);
            const canInteract = !!entity && !!this.hass;
            items.push(b `
        <div class="param-item" @click=${nClick}>
          <span class="param-label">n</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar
            .min=${min} .max=${max} .step=${step} .value=${value} indicator
            ?interactive=${canInteract}
            data-entity-id=${entity}
            @value-changed=${canInteract ? this._onParamChanged : A}
          ></eq-param-bar>
        </div>
      `);
        }
        if (params.shift) {
            items.push(this._renderDeltaParamItem('Shift', params.shift.entity, params.shift.fallback, [-15, 15], () => params.shift.onClick ? params.shift.onClick() : this._openMoreInfo(params.shift.entity)));
        }
        if (params.pid_correction) {
            items.push(this._renderDeltaParamItem('Σ', params.pid_correction.entity, params.pid_correction.fallback ?? 0, [-10, 10], () => this._openMoreInfo(params.pid_correction.entity)));
        }
        if (items.length === 0)
            return A;
        return b `<div class="params-footer">${items}</div>`;
    }
    _renderTunableParamsFooter(params, onTune) {
        const inner = this._renderParamsFooter(params);
        if (inner === A)
            return A;
        if (!this._config.tunable)
            return inner;
        return b `
      <div class="params-footer-tunable" @click=${onTune}>
        ${inner}
        <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
      </div>
    `;
    }
}
__decorate([
    r()
], EquithermBaseCard.prototype, "_showTuningDialog", void 0);
__decorate([
    r()
], EquithermBaseCard.prototype, "_dialogConfig", void 0);

class EquithermEChartCard extends EquithermBaseCard {
    getGridOptions() {
        return { columns: 12, rows: 5, min_rows: 5 };
    }
    getCardSize() {
        return 3;
    }
    _formatChartTime(timestampMs) {
        return formatTime(new Date(timestampMs), this.hass.locale);
    }
    _formatChartDateTime(timestampMs) {
        const date = new Date(timestampMs);
        const weekday = date.toLocaleDateString(this.hass?.locale?.language, { weekday: 'short' });
        return `${weekday} ${formatTime(date, this.hass.locale)}`;
    }
    _updateChartConfig() {
        if (this._config && this.hass) {
            this._echartConfig = this._buildEChartOptions();
        }
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has('hass')) {
            const oldHass = changedProps.get('hass');
            const tempChanged = oldHass &&
                this.hass?.config?.unit_system?.temperature !== oldHass.config?.unit_system?.temperature;
            const timeFormatChanged = oldHass &&
                this.hass?.locale?.time_format !== oldHass.locale?.time_format;
            if (tempChanged || timeFormatChanged) {
                this._updateChartConfig();
            }
        }
    }
    _onChartReconnected() { }
    _onChartDisconnecting() { }
    connectedCallback() {
        super.connectedCallback();
        if (this._config && this.hass) {
            this._onChartReconnected();
        }
    }
    disconnectedCallback() {
        this._onChartDisconnecting();
        super.disconnectedCallback();
    }
    _renderChart() {
        if (!this._echartConfig)
            return A;
        const { options, data } = this._echartConfig;
        return b `
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${options}
          .data=${data}
          hide-reset-button
        ></ha-chart-base>
      </div>
    `;
    }
    static get styles() {
        return [super.styles, i$5 `
      :host([manual-override]) .chart-wrapper {
        opacity: 0.18;
        transition: opacity 400ms ease;
        pointer-events: none;
      }
      .chart-wrapper {
        flex: 1;
        min-height: 0;
        position: relative;
      }
    `];
    }
}
__decorate([
    r()
], EquithermEChartCard.prototype, "_echartConfig", void 0);

/**
 * Abstract base class for all equitherm card editors.
 *
 * Extracts the shared boilerplate from every editor in this project:
 *   - `hass` property
 *   - `_config` / `_error` reactive state
 *   - `setConfig()` spread pattern
 *   - `_valueChanged()` (spread → transform → validate → fireEvent)
 *   - `_computeLabel` / `_computeHelper` localization helpers
 *   - Shared `static styles`
 *   - `render()` with `<ha-form>` template
 *
 * Subclasses must implement:
 *   - `setConfig(config)` — assign config (usually `{ ...config }`)
 *   - `_getSchema()` — return the ha-form schema array
 *   - `_validate(config)` — throw on invalid config
 *
 * Subclasses may override:
 *   - `_transformConfig(raw)` — pre-validation transform hook (default: identity)
 *   - `_getDisplayConfig()` — transform config for display in ha-form (default: identity)
 */
class EquithermBaseEditor extends i$2 {
    constructor() {
        super(...arguments);
        this._computeLabel = (schema) => {
            const localize = setupCustomlocalize(this.hass);
            const key = `editor.${schema.name}`;
            const localized = localize(key);
            const label = localized !== key ? localized : schema.name;
            return schema.required === false
                ? `${label} (${localize('editor.optional')})`
                : label;
        };
        this._computeHelper = (schema) => {
            const localize = setupCustomlocalize(this.hass);
            const key = `editor.helper.${schema.name}`;
            const localized = localize(key);
            return localized !== key ? localized : '';
        };
    }
    /**
     * Pre-validation transform hook.
     * Called in `_valueChanged` after merging user input but before `_validate`.
     * Use this for unit conversions (e.g. imperial → °C) or other transforms.
     * Default: identity (no-op).
     */
    _transformConfig(raw) {
        return raw;
    }
    /**
     * Transform config for display in ha-form.
     * Called in `render()` before passing `.data` to `<ha-form>`.
     * Use this for unit conversions (e.g. °C → imperial) for display.
     * Default: identity (returns `_config` as-is).
     */
    _getDisplayConfig() {
        return this._config;
    }
    _valueChanged(ev) {
        ev.stopPropagation();
        if (!this._config)
            return;
        const merged = { ...this._config, ...ev.detail.value };
        const transformed = this._transformConfig(merged);
        try {
            this._validate(transformed);
            this._error = undefined;
            fireEvent(this, 'config-changed', { config: transformed });
        }
        catch (err) {
            this._error = { base: err.message };
        }
    }
    render() {
        if (!this.hass || !this._config)
            return A;
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._getDisplayConfig()}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
}
EquithermBaseEditor.styles = i$5 `
    ha-form {
      display: block;
    }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `;
__decorate([
    n$1({ attribute: false })
], EquithermBaseEditor.prototype, "hass", void 0);
__decorate([
    r()
], EquithermBaseEditor.prototype, "_config", void 0);
__decorate([
    r()
], EquithermBaseEditor.prototype, "_error", void 0);

const cardStyle = i$5 `
  :host {
    --eq-flow-color: var(--gradient-hot, var(--warning-color, #ff9800));
  }
  ha-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0;
    overflow: hidden;
    container-type: inline-size;
    border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
  }
  ha-card.fill-container {
    height: 100%;
  }
  :host([layout="grid"]) ha-card {
    height: 100%;
  }
  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    padding: 12px;
    padding-top: 0;
    box-sizing: border-box;
    gap: 12px;
  }
  .actions::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    height: 0px;
  }
  .footer-meta {
    display: flex;
    justify-content: center;
    padding: 4px 10px 10px;
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .footer-meta--warn {
    color: var(--warning-color, rgb(var(--rgb-warning)));
  }
  .unavailable {
    --main-color: rgb(var(--rgb-warning));
  }
  .not-found {
    --main-color: rgb(var(--rgb-danger));
  }
`;
const kpiFooterStyles = i$5 `
  .kpi-footer {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    align-items: center;
    gap: 8px;
    padding: 0 10px var(--eq-kpi-padding-bottom, 8px);
    flex-shrink: 0;
  }
  .kpi-block {
    text-align: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    transition: background 0.2s;
  }
  .kpi-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
  .kpi-block.missing { opacity: 0.4; cursor: default; }
  .kpi-block.missing:hover { background: transparent; }
  .kpi-value {
    font-size: var(--eq-kpi-font-size, var(--ha-font-size-xl, 1.4rem));
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: var(--primary-text-color);
    white-space: nowrap;
  }
  .kpi-value.flow { color: var(--eq-flow-color); }
  .kpi-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin-top: 4px;
    white-space: nowrap;
  }
  .kpi-divider { width: 1px; background: var(--divider-color, rgba(0,0,0,0.12)); height: 32px; }
  .kpi-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .kpi-target {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .kpi-target ha-icon {
    --mdc-icon-size: 12px;
    color: var(--eq-flow-color);
  }
  @container (max-width: 260px) {
    .kpi-footer {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .kpi-footer .kpi-divider {
      display: none;
    }
  }
`;
const paramsFooterStyles = i$5 `
  .params-footer {
    display: flex;
    align-items: stretch;
    gap: 4px;
    padding: var(--eq-params-padding, 8px 12px);
    border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .params-footer .param-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    border-radius: 8px;
    padding: 4px 6px;
    transition: background 0.2s;
  }
  .params-footer .param-item:hover {
    background: var(--secondary-background-color, rgba(0,0,0,0.04));
  }
  .params-footer .param-label {
    font-size: 10px;
    font-weight: var(--ha-font-weight-medium, 500);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    line-height: 1;
  }
  .params-footer .param-value {
    font-size: var(--ha-font-size-s, 0.85rem);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1;
  }
  .params-footer .param-value.positive { color: var(--success-color, #4caf50); }
  .params-footer .param-value.negative { color: var(--error-color, #e53935); }
`;
const tunableFooterStyles = i$5 `
  .params-footer-tunable {
    display: flex;
    align-items: stretch;
    gap: 4px;
    padding: var(--eq-params-padding, 8px 12px);
    border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
  }
  .params-footer-tunable:hover {
    background: rgba(var(--rgb-primary, 33, 150, 243), 0.06);
  }
  .params-footer-tunable .params-footer {
    border-top: none;
    padding: 0;
    flex: 1;
  }
  .params-footer-tunable .param-item {
    pointer-events: none;
  }
  .params-footer-tunable .pencil-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    opacity: 0.5;
    align-self: center;
    flex-shrink: 0;
  }
  .params-footer-tunable:hover .pencil-icon {
    opacity: 0.8;
  }
`;

function registerCustomCard(params) {
    const windowWithCards = window;
    windowWithCards.customCards = windowWithCards.customCards || [];
    const cardPage = params.type.replace("-card", "").replace("equitherm-", "");
    windowWithCards.customCards.push({
        ...params,
        preview: true,
        documentationURL: `${"https://github.com/equitherm/lovelace"}/blob/main/docs/cards/${cardPage}.md`,
    });
}
const editorName = (cardName) => `${cardName}-editor`;

/**
 * A `StructFailure` represents a single specific failure in validation.
 */
/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
class StructError extends TypeError {
    constructor(failure, failures) {
        let cached;
        const { message, explanation, ...rest } = failure;
        const { path } = failure;
        const msg = path.length === 0 ? message : `At path: ${path.join('.')} -- ${message}`;
        super(explanation ?? msg);
        if (explanation != null)
            this.cause = msg;
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => {
            return (cached ?? (cached = [failure, ...failures()]));
        };
    }
}

/**
 * Check if a value is an iterator.
 */
function isIterable(x) {
    return isObject(x) && typeof x[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 */
function isObject(x) {
    return typeof x === 'object' && x != null;
}
/**
 * Check if a value is a non-array object.
 */
function isNonArrayObject(x) {
    return isObject(x) && !Array.isArray(x);
}
/**
 * Return a value as a printable string.
 */
function print(value) {
    if (typeof value === 'symbol') {
        return value.toString();
    }
    return typeof value === 'string' ? JSON.stringify(value) : `${value}`;
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */
function shiftIterator(input) {
    const { done, value } = input.next();
    return done ? undefined : value;
}
/**
 * Convert a single validation result to a failure.
 */
function toFailure(result, context, struct, value) {
    if (result === true) {
        return;
    }
    else if (result === false) {
        result = {};
    }
    else if (typeof result === 'string') {
        result = { message: result };
    }
    const { path, branch } = context;
    const { type } = struct;
    const { refinement, message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ''}, but received: \`${print(value)}\``, } = result;
    return {
        value,
        type,
        refinement,
        key: path[path.length - 1],
        path,
        branch,
        ...result,
        message,
    };
}
/**
 * Convert a validation result to an iterable of failures.
 */
function* toFailures(result, context, struct, value) {
    if (!isIterable(result)) {
        result = [result];
    }
    for (const r of result) {
        const failure = toFailure(r, context, struct, value);
        if (failure) {
            yield failure;
        }
    }
}
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */
function* run(value, struct, options = {}) {
    const { path = [], branch = [value], coerce = false, mask = false } = options;
    const ctx = { path, branch, mask };
    if (coerce) {
        value = struct.coercer(value, ctx);
    }
    let status = 'valid';
    for (const failure of struct.validator(value, ctx)) {
        failure.explanation = options.message;
        status = 'not_valid';
        yield [failure, undefined];
    }
    for (let [k, v, s] of struct.entries(value, ctx)) {
        const ts = run(v, s, {
            path: k === undefined ? path : [...path, k],
            branch: k === undefined ? branch : [...branch, v],
            coerce,
            mask,
            message: options.message,
        });
        for (const t of ts) {
            if (t[0]) {
                status = t[0].refinement != null ? 'not_refined' : 'not_valid';
                yield [t[0], undefined];
            }
            else if (coerce) {
                v = t[1];
                if (k === undefined) {
                    value = v;
                }
                else if (value instanceof Map) {
                    value.set(k, v);
                }
                else if (value instanceof Set) {
                    value.add(v);
                }
                else if (isObject(value)) {
                    if (v !== undefined || k in value)
                        value[k] = v;
                }
            }
        }
    }
    if (status !== 'not_valid') {
        for (const failure of struct.refiner(value, ctx)) {
            failure.explanation = options.message;
            status = 'not_refined';
            yield [failure, undefined];
        }
    }
    if (status === 'valid') {
        yield [undefined, value];
    }
}

/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */
class Struct {
    constructor(props) {
        const { type, schema, validator, refiner, coercer = (value) => value, entries = function* () { }, } = props;
        this.type = type;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
            this.validator = (value, context) => {
                const result = validator(value, context);
                return toFailures(result, context, this, value);
            };
        }
        else {
            this.validator = () => [];
        }
        if (refiner) {
            this.refiner = (value, context) => {
                const result = refiner(value, context);
                return toFailures(result, context, this, value);
            };
        }
        else {
            this.refiner = () => [];
        }
    }
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */
    assert(value, message) {
        return assert(value, this, message);
    }
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */
    create(value, message) {
        return create(value, this, message);
    }
    /**
     * Check if a value passes the struct's validation.
     */
    is(value) {
        return is(value, this);
    }
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema. Masking applies recursively to
     * props of `object` structs only.
     */
    mask(value, message) {
        return mask(value, this, message);
    }
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `coerce` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful. Also, `mask` will turn on
     * masking of the unknown `object` props recursively if passed.
     */
    validate(value, options = {}) {
        return validate(value, this, options);
    }
}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 */
function assert(value, struct, message) {
    const result = validate(value, struct, { message });
    if (result[0]) {
        throw result[0];
    }
}
/**
 * Create a value with the coercion logic of struct and validate it.
 */
function create(value, struct, message) {
    const result = validate(value, struct, { coerce: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 */
function mask(value, struct, message) {
    const result = validate(value, struct, { coerce: true, mask: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
/**
 * Check if a value passes a struct.
 */
function is(value, struct) {
    const result = validate(value, struct);
    return !result[0];
}
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */
function validate(value, struct, options = {}) {
    const tuples = run(value, struct, options);
    const tuple = shiftIterator(tuples);
    if (tuple[0]) {
        const error = new StructError(tuple[0], function* () {
            for (const t of tuples) {
                if (t[0]) {
                    yield t[0];
                }
            }
        });
        return [error, undefined];
    }
    else {
        const v = tuple[1];
        return [undefined, v];
    }
}
/**
 * Define a new struct type with a custom validation function.
 */
function define(name, validator) {
    return new Struct({ type: name, schema: null, validator });
}

/**
 * Ensure that any value passes validation.
 */
function any() {
    return define('any', () => true);
}
/**
 * Ensure that a value is a boolean.
 */
function boolean() {
    return define('boolean', (value) => {
        return typeof value === 'boolean';
    });
}
/**
 * Ensure that a value is a number.
 */
function number$1() {
    return define('number', (value) => {
        return ((typeof value === 'number' && !isNaN(value)) ||
            `Expected a number, but received: ${print(value)}`);
    });
}
/**
 * Augment a struct to allow `undefined` values.
 */
function optional(struct) {
    return new Struct({
        ...struct,
        validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
        refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),
    });
}
/**
 * Ensure that a value is a string.
 */
function string() {
    return define('string', (value) => {
        return (typeof value === 'string' ||
            `Expected a string, but received: ${print(value)}`);
    });
}
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */
function type(schema) {
    const keys = Object.keys(schema);
    return new Struct({
        type: 'type',
        schema,
        *entries(value) {
            if (isObject(value)) {
                for (const k of keys) {
                    yield [k, value[k], schema[k]];
                }
            }
        },
        validator(value) {
            return (isNonArrayObject(value) ||
                `Expected an object, but received: ${print(value)}`);
        },
        coercer(value) {
            return isNonArrayObject(value) ? { ...value } : value;
        },
    });
}

// src/cards/status-card/status-card-config.ts
/** Runtime validation schema for StatusCardConfig */
const StatusCardConfigStruct = type({
    type: string(),
    climate_entity: string(),
    outdoor_entity: string(),
    flow_entity: string(),
    curve_output_entity: optional(string()),
    pid_output_entity: optional(string()),
    rate_limiting_entity: optional(string()),
    pid_active_entity: optional(string()),
    pid_correction_entity: optional(string()),
    wws_entity: optional(string()),
    hc_entity: optional(string()),
    shift_entity: optional(string()),
    n_entity: optional(string()),
    show_last_updated: optional(boolean()),
    show_params_footer: optional(boolean()),
    tunable: optional(boolean()),
    recalculate_service: optional(string()),
    name: optional(any()),
});
/** Validate and apply defaults */
function validateStatusCardConfig(config) {
    const c = { ...config };
    if ('title' in c && !('name' in c))
        c.name = c.title;
    delete c.title;
    assert(c, StatusCardConfigStruct);
    return c;
}

const PREFIX_NAME = "equitherm";

const STATUS_CARD_NAME = `${PREFIX_NAME}-status-card`;
const STATUS_CARD_EDITOR_NAME = editorName(STATUS_CARD_NAME);

const CLIMATE_DOMAINS = ['climate'];
const SENSOR_DOMAINS = ['sensor'];
function findClimateEntity(hass) {
    return Object.keys(hass.states).find(e => CLIMATE_DOMAINS.includes(computeDomain(e)));
}
function findWeatherEntity(hass) {
    return Object.keys(hass.states).find(e => computeDomain(e) === 'weather');
}
function findTempSensors(hass) {
    const states = hass.states;
    return Object.keys(states).filter(e => {
        const state = states[e];
        return SENSOR_DOMAINS.includes(computeDomain(e))
            && state?.attributes?.device_class === 'temperature';
    });
}
function findOutdoorEntity(hass) {
    const temps = findTempSensors(hass);
    return temps.find(e => e.includes('outdoor') || e.includes('outside') || e.includes('exterior')) ?? temps[0];
}
function findFlowEntity(hass) {
    const temps = findTempSensors(hass);
    return temps.find(e => e.includes('flow') || e.includes('supply') || e.includes('forward')) ?? temps[0];
}
function findCurveOutputEntity(hass) {
    return findTempSensors(hass).find(e => e.includes('curve_output')) ?? '';
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

/**
 * Generic status badge (pill-shaped chip).
 * Renders a colored label with an optional leading icon.
 * Colors are inherited from parent via CSS variables.
 *
 * Usage:
 * ```html
 * <eq-badge-info
 *   style="--badge-info-color: var(--rgb-state-climate-heat)"
 *   .label=${'Heating'}
 *   .active=${true}
 * ></eq-badge-info>
 * <eq-badge-info .label=${'PID'} style="--badge-info-color: var(--rgb-success)"></eq-badge-info>
 * ```
 */
let BadgeInfo = class BadgeInfo extends i$2 {
    constructor() {
        super(...arguments);
        /** Display text */
        this.label = '';
        /** Enables pulse animation on the icon */
        this.active = false;
    }
    static get styles() {
        return i$5 `
      :host {
        --badge-info-color: 158, 158, 158;
        display: inline-flex;
        align-items: center;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 10px;
        border-radius: 999px;
        color: rgb(var(--badge-info-color));
        background-color: rgba(var(--badge-info-color), 0.15);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        transition: background-color 280ms ease-in-out;
      }
      .icon {
        --mdc-icon-size: 14px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
      .active .icon {
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
    }
    render() {
        const icon = this.icon
            ? b `<ha-icon class="icon" icon=${this.icon}></ha-icon>`
            : A;
        return b `
      <span class=${e({ badge: true, active: this.active })}>
        ${icon}${this.label}
      </span>
    `;
    }
};
__decorate([
    n$1()
], BadgeInfo.prototype, "label", void 0);
__decorate([
    n$1()
], BadgeInfo.prototype, "icon", void 0);
__decorate([
    n$1({ type: Boolean })
], BadgeInfo.prototype, "active", void 0);
BadgeInfo = __decorate([
    t$1('eq-badge-info')
], BadgeInfo);

/**
 * Compute flow temperature using equitherm curve formula
 * t_flow = t_target + shift + hc × (t_target - t_outdoor)^(1/n)
 */
function computeFlowTemperature(params) {
    const { tTarget, tOutdoor, hc, n, shift, minFlow, maxFlow } = params;
    // Default values for optional params
    const min = minFlow ?? 20;
    const max = maxFlow ?? 70;
    // Validate all required numeric parameters
    if (isNaN(tTarget) || isNaN(tOutdoor) || isNaN(hc) || isNaN(n) ||
        isNaN(shift) || isNaN(min) || isNaN(max)) {
        return min;
    }
    // Validate exponent is positive (required for power operation)
    if (n <= 0) {
        return min;
    }
    // Handle inverted min/max gracefully
    const effectiveMin = Math.min(min, max);
    const effectiveMax = Math.max(min, max);
    const deltaT = tTarget - tOutdoor;
    // Warm weather shutdown: no heating demand when outdoor >= target
    if (deltaT <= 0) {
        return Math.round(effectiveMin * 10) / 10;
    }
    const tFlow = tTarget + shift + hc * Math.pow(deltaT, 1.0 / n);
    // Clamp to min/max
    const clamped = Math.max(effectiveMin, Math.min(effectiveMax, tFlow));
    // Round to 0.1°C precision - aligns with OpenTherm convention
    return Math.round(clamped * 10) / 10;
}

/**
 * Generate points along the heating curve for chart rendering.
 * Uses 0.1° step size for smooth hover interpolation.
 */
function buildCurveSeries(params, tOutMin, tOutMax) {
    const step = 0.1;
    const points = Math.round((tOutMax - tOutMin) / step) + 1;
    return Array.from({ length: points }, (_, i) => {
        const x = tOutMin + i * step;
        const y = computeFlowTemperature({ ...params, tOutdoor: x });
        return { x, y: parseFloat(y.toFixed(1)) };
    });
}
/**
 * Find the flow temp for a given outdoor temp on the curve.
 */
function flowAtOutdoor(params, tOutdoor) {
    return computeFlowTemperature({ ...params, tOutdoor });
}

let EqTuningDialog = class EqTuningDialog extends EquithermBaseElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this._proposedHc = 0.9;
        this._proposedShift = 0;
        this._applying = false;
        this._applySuccess = false;
        this._lastHcState = null;
        this._lastShiftState = null;
        this._onHcMoved = (e) => {
            this._proposedHc = e.detail.value;
        };
        this._onHcChanged = (e) => {
            this._proposedHc = e.detail.value;
        };
        this._onShiftMoved = (e) => {
            this._proposedShift = this._fromDisplayDelta(e.detail.value);
        };
        this._onShiftChanged = (e) => {
            this._proposedShift = this._fromDisplayDelta(e.detail.value);
        };
    }
    // --- Dirty state ---
    get _hcChanged() {
        return Math.abs(this._proposedHc - this._currentHc) > this._hcStep / 2;
    }
    get _shiftChanged() {
        return Math.abs(this._proposedShift - this._currentShift) > this._shiftStep / 2;
    }
    get _isDirty() {
        return this._hcChanged || this._shiftChanged;
    }
    // --- Lifecycle ---
    disconnectedCallback() {
        clearTimeout(this._successTimer);
        super.disconnectedCallback();
    }
    willUpdate(changedProps) {
        super.willUpdate(changedProps);
        // Sync proposed values when source data changes
        if (changedProps.has('config') && this.config) {
            this._lastHcState = null;
            this._lastShiftState = null;
            this._syncProposedValues();
        }
        else if (changedProps.has('open') && this.open) {
            this._syncProposedValues();
        }
        else if (changedProps.has('hass') && this.hass && this.config && !this._isDirty) {
            this._syncProposedValues();
        }
        // Rebuild chart in the same update cycle to avoid double-render flash
        if (this.config && this.hass && this.open) {
            const chartNeedsUpdate = changedProps.has('config') ||
                changedProps.has('open') ||
                changedProps.has('_proposedHc') ||
                changedProps.has('_proposedShift') ||
                (changedProps.has('hass') && this._hassRelevantChange(changedProps));
            if (chartNeedsUpdate) {
                this._chartConfig = this._buildChart();
            }
        }
    }
    _hassRelevantChange(changedProps) {
        const oldHass = changedProps.get('hass');
        return !oldHass || this._relevantStateChanged(oldHass);
    }
    _relevantStateChanged(oldHass) {
        const cfg = this.config;
        const entities = [
            cfg.outdoor_entity, cfg.climate_entity, cfg.hc_entity, cfg.shift_entity,
            cfg.n_entity, cfg.min_flow_entity, cfg.max_flow_entity,
        ].filter(Boolean);
        return entities.some(id => this.hass.states[id]?.state !== oldHass.states[id]?.state);
    }
    // --- Entity helpers ---
    _entityState(entityId) {
        if (!entityId || !this.hass)
            return undefined;
        return this.hass.states[entityId];
    }
    _entityAttr(entityId, key) {
        return this._entityState(entityId)?.attributes?.[key];
    }
    _resolveEntityNumber(entityId, fallback) {
        const s = this._entityState(entityId);
        if (!s)
            return fallback;
        const val = parseFloat(s.state);
        return isNaN(val) ? fallback : val;
    }
    _openMoreInfo(entityId) {
        if (entityId && this.hass) {
            const event = new CustomEvent('hass-more-info', {
                bubbles: true,
                composed: true,
                detail: { entityId },
            });
            this.dispatchEvent(event);
        }
    }
    // --- Entity getters ---
    get _climateState() {
        return this._entityState(this.config.climate_entity);
    }
    get _tTarget() {
        return this._climateState?.attributes?.temperature ?? 21;
    }
    get _currentN() {
        const cfg = this.config;
        return cfg.curve_from_entities
            ? this._resolveEntityNumber(cfg.n_entity, cfg.n)
            : cfg.n;
    }
    get _currentHc() {
        return this._resolveEntityNumber(this.config.hc_entity, 0.9);
    }
    get _currentShift() {
        return this._resolveEntityNumber(this.config.shift_entity, 0);
    }
    get _tOutdoor() {
        const s = this._entityState(this.config.outdoor_entity);
        if (!s)
            return null;
        const v = parseFloat(s.state);
        return isNaN(v) ? null : this._fromDisplayTemp(v);
    }
    get _hcMin() { return this._entityAttr(this.config.hc_entity, 'min') ?? 0.5; }
    get _hcMax() { return this._entityAttr(this.config.hc_entity, 'max') ?? 3.0; }
    get _hcStep() { return this._entityAttr(this.config.hc_entity, 'step') ?? 0.1; }
    get _shiftMin() { return this._entityAttr(this.config.shift_entity, 'min') ?? -15; }
    get _shiftMax() { return this._entityAttr(this.config.shift_entity, 'max') ?? 15; }
    get _shiftStep() { return this._entityAttr(this.config.shift_entity, 'step') ?? 1; }
    get _isWWSD() {
        if (!this.config?.climate_entity)
            return false;
        const tOutdoor = this._tOutdoor;
        return tOutdoor !== null && tOutdoor >= this._tTarget;
    }
    _syncProposedValues() {
        if (!this.hass || !this.config)
            return;
        const hc = this._currentHc;
        const shift = this._currentShift;
        if (this._lastHcState !== hc) {
            this._proposedHc = hc;
            this._lastHcState = hc;
        }
        if (this._lastShiftState !== shift) {
            this._proposedShift = shift;
            this._lastShiftState = shift;
        }
    }
    // --- Chart ---
    _buildChart() {
        const localize = setupCustomlocalize(this.hass);
        const cfg = this.config;
        const minFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow;
        const maxFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow;
        const currentParams = { tTarget: this._tTarget, hc: this._currentHc, n: this._currentN, shift: this._currentShift, minFlow, maxFlow };
        const proposedParams = { tTarget: this._tTarget, hc: this._proposedHc ?? this._currentHc, n: this._currentN, shift: this._proposedShift ?? this._currentShift, minFlow, maxFlow };
        const heatingColor = resolveRgbColor(this, 'heating');
        const rawProposed = getComputedStyle(this).getPropertyValue('--rgb-state-climate-cool').trim()
            || getComputedStyle(this).getPropertyValue('--rgb-primary-color').trim()
            || '33, 150, 243';
        const proposedColor = `rgb(${rawProposed})`;
        const wwsdFill = `rgba(${getComputedStyle(this).getPropertyValue('--rgb-warning').trim() || '255, 167, 38'}, 0.08)`;
        const currentSeries = buildCurveSeries(currentParams, cfg.t_out_min, cfg.t_out_max);
        const proposedSeries = buildCurveSeries(proposedParams, cfg.t_out_min, cfg.t_out_max);
        // Convert curve data from °C to display units for the chart
        const currentDisplaySeries = currentSeries.map(p => ({
            x: this._toDisplayTemp(p.x),
            y: this._toDisplayTemp(p.y),
        }));
        const proposedDisplaySeries = proposedSeries.map(p => ({
            x: this._toDisplayTemp(p.x),
            y: this._toDisplayTemp(p.y),
        }));
        const tOutdoor = this._tOutdoor;
        const operatingPointSeries = [];
        if (tOutdoor !== null) {
            const currentFlow = flowAtOutdoor(currentParams, tOutdoor);
            operatingPointSeries.push({
                type: 'line',
                name: 'operating-point',
                data: [{
                        value: [this._toDisplayTemp(tOutdoor), this._toDisplayTemp(currentFlow)],
                        symbolSize: 9,
                        itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
                    }],
                showSymbol: true,
                symbol: 'circle',
                lineStyle: { width: 0 },
                tooltip: { show: false },
            });
        }
        const wwsdSeries = [];
        if (this._isWWSD) {
            wwsdSeries.push({
                type: 'line',
                name: 'wwsd',
                data: [
                    [this._toDisplayTemp(cfg.t_out_max), this._toDisplayTemp(maxFlow + 5)],
                    [this._toDisplayTemp(this._tTarget), this._toDisplayTemp(maxFlow + 5)],
                ],
                showSymbol: false,
                lineStyle: { width: 0 },
                areaStyle: { color: wwsdFill },
                tooltip: { show: false },
            });
        }
        const tempUnit = this.hass?.config?.unit_system?.temperature ?? '°C';
        return {
            options: {
                animation: false,
                xAxis: {
                    type: 'value',
                    min: this._toDisplayTemp(cfg.t_out_min),
                    max: this._toDisplayTemp(cfg.t_out_max),
                    inverse: true,
                    axisLabel: { fontSize: 10, formatter: (val) => `${val.toFixed(0)}`, hideOverlap: true },
                    axisTick: { show: false },
                    axisLine: { show: false },
                },
                yAxis: {
                    type: 'value',
                    min: this._toDisplayTemp(minFlow - 5),
                    max: this._toDisplayTemp(maxFlow + 5),
                    axisLabel: { fontSize: 10 },
                },
                grid: { top: 10, right: 15, bottom: 25, left: 35 },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
                    borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
                    borderWidth: 1,
                    padding: [8, 12],
                    textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter: (params) => {
                        const arr = Array.isArray(params) ? params : [params];
                        const curveParam = arr.find((p) => p.seriesName === localize('tuning_dialog.current') || p.seriesName === localize('tuning_dialog.proposed'));
                        if (!curveParam)
                            return '';
                        const outdoorVal = curveParam.value[0];
                        let out = '';
                        for (const p of arr) {
                            if (p.seriesName === 'operating-point' || p.seriesName === 'wwsd')
                                continue;
                            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${p.color};"></span>`;
                            const dashLabel = p.lineStyle?.type === 'dashed' ? ` (${localize('tuning_dialog.proposed')})` : '';
                            out += `${marker}${p.seriesName}${dashLabel}: <b>${p.value[1].toFixed(1)}${tempUnit}</b><br/>`;
                        }
                        out += `<span style="opacity:0.6">${outdoorVal.toFixed(1)}${tempUnit} ${localize('tuning_dialog.outdoor_axis_suffix')}</span>`;
                        return out;
                    },
                },
                legend: { show: false },
            },
            data: [
                {
                    type: 'line',
                    name: localize('tuning_dialog.current'),
                    data: currentDisplaySeries.map(p => [p.x, p.y]),
                    showSymbol: false,
                    lineStyle: { width: 2 },
                    itemStyle: { color: heatingColor },
                },
                {
                    type: 'line',
                    name: localize('tuning_dialog.proposed'),
                    data: proposedDisplaySeries.map(p => [p.x, p.y]),
                    showSymbol: false,
                    lineStyle: { width: 2, type: 'dashed' },
                    itemStyle: { color: proposedColor },
                },
                ...operatingPointSeries,
                ...wwsdSeries,
            ],
        };
    }
    // --- Service calls ---
    async _recalculate() {
        const svc = this.config.recalculate_service;
        if (!svc || !this.hass)
            return;
        const [domain, service] = svc.split('.', 2);
        if (!domain || !service)
            return;
        if (!this.hass.services[domain]?.[service])
            return;
        await this.hass.callService(domain, service, {});
    }
    async _applyAll() {
        if (!this.hass || !this.config)
            return;
        this._applying = true;
        try {
            const hcChanged = this._hcChanged;
            const shiftChanged = this._shiftChanged;
            if (hcChanged)
                await this.hass.callService(computeDomain(this.config.hc_entity), 'set_value', { entity_id: this.config.hc_entity, value: this._proposedHc });
            if (shiftChanged)
                await this.hass.callService(computeDomain(this.config.shift_entity), 'set_value', { entity_id: this.config.shift_entity, value: this._proposedShift });
            if (hcChanged || shiftChanged)
                await this._recalculate();
            this._applySuccess = true;
            clearTimeout(this._successTimer);
            this._successTimer = setTimeout(() => { this._applySuccess = false; }, 1500);
        }
        catch (err) {
            console.warn('Failed to apply tuning:', err);
        }
        finally {
            this._applying = false;
        }
    }
    _resetAll() {
        this._proposedHc = this._currentHc;
        this._proposedShift = this._currentShift;
    }
    // --- Render ---
    render() {
        if (!this.open || !this.config || !this.hass)
            return A;
        const localize = setupCustomlocalize(this.hass);
        const hcDecimals = this._hcStep < 1 ? Math.ceil(-Math.log10(this._hcStep)) : 0;
        const shiftDisplayStep = this._toDisplayDelta(this._shiftStep);
        const shiftDecimals = shiftDisplayStep < 1 ? Math.ceil(-Math.log10(shiftDisplayStep)) : 0;
        const dirty = this._isDirty;
        const hcDelta = this._proposedHc - this._currentHc;
        const shiftDelta = this._proposedShift - this._currentShift;
        return b `
      <ha-dialog
        .open=${true}
        .headerTitle=${localize('tuning_dialog.default_title')}
        @closed=${() => { this.open = false; this.dispatchEvent(new CustomEvent('closed')); }}
        flexcontent
      >
        <div class="dialog-chart">
          ${this._chartConfig ? b `
            <ha-chart-base .hass=${this.hass} .options=${this._chartConfig.options} .data=${this._chartConfig.data} height="100%" hide-reset-button></ha-chart-base>
          ` : A}
        </div>

        <div class="controls">
          <!-- HC panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('tuning_dialog.hc_short')}</span>
            <div class="hero-row">
              <span class="hero-value">${formatNumber(this._proposedHc, this.hass?.locale, { minimumFractionDigits: hcDecimals, maximumFractionDigits: hcDecimals })}</span>
              ${Math.abs(hcDelta) > this._hcStep / 2 ? b `
                <span class="ctrl-delta ${hcDelta > 0 ? 'pos' : 'neg'}">${formatNumber(hcDelta, this.hass?.locale, { minimumFractionDigits: hcDecimals, maximumFractionDigits: hcDecimals, signDisplay: 'always' })}</span>
              ` : A}
            </div>
            <eq-param-bar
              .min=${this._hcMin} .max=${this._hcMax}
              .step=${this._hcStep}
              .value=${this._proposedHc}
              interactive indicator hideDragTip
              ariaUnit="HC"
              @slider-moved=${this._onHcMoved}
              @value-changed=${this._onHcChanged}
            ></eq-param-bar>
          </div>
          <div class="ctrl-divider"></div>
          <!-- Shift panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('tuning_dialog.shift_short')}</span>
            <div class="hero-row">
              <span class="hero-value">${formatNumber(this._toDisplayDelta(this._proposedShift), this.hass?.locale, { minimumFractionDigits: shiftDecimals, maximumFractionDigits: shiftDecimals })}${this.hass?.config?.unit_system?.temperature ?? '°C'}</span>
              ${Math.abs(shiftDelta) > this._shiftStep / 2 ? b `
                <span class="ctrl-delta ${shiftDelta > 0 ? 'pos' : 'neg'}">${formatNumber(this._toDisplayDelta(shiftDelta), this.hass?.locale, { minimumFractionDigits: shiftDecimals, maximumFractionDigits: shiftDecimals, signDisplay: 'always' })}${this.hass?.config?.unit_system?.temperature ?? '°C'}</span>
              ` : A}
            </div>
            <eq-param-bar
              .min=${this._toDisplayDelta(this._shiftMin)}
              .max=${this._toDisplayDelta(this._shiftMax)}
              .step=${this._toDisplayDelta(this._shiftStep)}
              .value=${this._toDisplayDelta(this._proposedShift)}
              centered indicator interactive hideDragTip
              ariaUnit=${this.hass?.config?.unit_system?.temperature ?? '°C'}
              @slider-moved=${this._onShiftMoved}
              @value-changed=${this._onShiftChanged}
            ></eq-param-bar>
          </div>
        </div>

        ${this._renderKpi()}

        <div slot="footer">
          <ha-button size="small" @click=${this._resetAll} .disabled=${!dirty}>${localize('tuning_dialog.reset')}</ha-button>
          <ha-button variant="brand" appearance="filled" size="small"
            .disabled=${!dirty || this._applying} .loading=${this._applying}
            @click=${async () => { await this._applyAll(); if (this._applySuccess) {
            this.open = false;
            this.dispatchEvent(new CustomEvent('closed'));
        } }}
          >${this._applySuccess ? b `<ha-icon icon="mdi:check" slot="start"></ha-icon>` : A}${localize('tuning_dialog.apply')}</ha-button>
        </div>
      </ha-dialog>
    `;
    }
    _renderKpi() {
        if (!this.config || !this.hass)
            return A;
        const localize = setupCustomlocalize(this.hass);
        const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
        const fmtNum = (v) => `${formatNumber(v, this.hass?.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;
        const outdoorState = this._entityState(this.config.outdoor_entity);
        const outdoorVal = outdoorState ? parseFloat(outdoorState.state) : NaN;
        const outdoor = isNaN(outdoorVal) ? '—' : fmtNum(outdoorVal);
        const flowState = this._entityState(this.config.flow_entity);
        const flowVal = flowState ? parseFloat(flowState.state) : NaN;
        const flow = isNaN(flowVal) ? '—' : fmtNum(flowVal);
        const roomTemp = this._climateState?.attributes?.current_temperature;
        const room = roomTemp != null && !isNaN(roomTemp) ? fmtNum(roomTemp) : '—';
        return b `
      <div class="kpi-footer">
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config.outdoor_entity)}>
          <div class="kpi-value">${outdoor}</div>
          <div class="kpi-label">${localize('common.outdoor')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config.flow_entity)}>
          <div class="kpi-value flow">${flow}</div>
          <div class="kpi-label">${localize('common.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config.climate_entity)}>
          <div class="kpi-value">${room}</div>
          <div class="kpi-label">${localize('common.room')}</div>
        </div>
      </div>
    `;
    }
    static get styles() {
        return [
            super.styles,
            i$5 `
        .dialog-chart { height: 250px; padding: 0 4px; }
        .dialog-chart ha-chart-base { height: 100%; }
        .controls {
          display: flex; flex-shrink: 0;
          border-top: 1px solid var(--divider-color);
          margin-top: 4px;
        }
        .ctrl-panel {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: 10px 4px 6px; gap: 4px;
        }
        .ctrl-divider {
          width: 1px; background: var(--divider-color);
          margin: 6px 0; flex-shrink: 0;
        }
        .ctrl-label {
          font-size: 10px; font-weight: var(--ha-font-weight-medium, 500);
          text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--secondary-text-color);
        }
        .hero-row { display: flex; align-items: baseline; gap: 6px; }
        .hero-value {
          font-size: 1.5rem; font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color); line-height: 1;
        }
        .ctrl-delta {
          font-size: 10px; font-weight: var(--ha-font-weight-medium, 500);
          font-variant-numeric: tabular-nums; line-height: 1;
        }
        .ctrl-delta.pos { color: var(--success-color, #4caf50); }
        .ctrl-delta.neg { color: var(--error-color, #e53935); }
        .ctrl-panel eq-param-bar {
          width: 100%; padding: 4px 8px 0; box-sizing: border-box;
        }
        .kpi-footer {
          display: flex; align-items: center; padding: 8px 12px;
          gap: 0; flex-shrink: 0;
        }
        .kpi-block {
          flex: 1; text-align: center; cursor: pointer;
          padding: 4px 0;
        }
        .kpi-value {
          font-size: var(--ha-font-size-l, 1.1rem);
          font-weight: 600; font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
        }
        .kpi-label {
          font-size: 10px; color: var(--secondary-text-color);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .kpi-divider {
          width: 1px; height: 28px;
          background: var(--divider-color); flex-shrink: 0;
        }
      `,
        ];
    }
};
__decorate([
    n$1({ attribute: false })
], EqTuningDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], EqTuningDialog.prototype, "config", void 0);
__decorate([
    n$1({ type: Boolean })
], EqTuningDialog.prototype, "open", void 0);
__decorate([
    r()
], EqTuningDialog.prototype, "_proposedHc", void 0);
__decorate([
    r()
], EqTuningDialog.prototype, "_proposedShift", void 0);
__decorate([
    r()
], EqTuningDialog.prototype, "_applying", void 0);
__decorate([
    r()
], EqTuningDialog.prototype, "_applySuccess", void 0);
__decorate([
    r()
], EqTuningDialog.prototype, "_chartConfig", void 0);
EqTuningDialog = __decorate([
    t$1('eq-tuning-dialog')
], EqTuningDialog);

/** Default values for shared curve parameters (matching @equitherm/core defaults) */
const CURVE_CONFIG_DEFAULTS = {
    n: 1.25,
    min_flow: 20,
    max_flow: 70,
    t_out_min: -20,
    t_out_max: 20,
};
/** Superstruct fields for shared curve params — spread into a card's config struct */
const curveConfigStructFields = {
    n: optional(number$1()),
    min_flow: optional(number$1()),
    max_flow: optional(number$1()),
    t_out_min: optional(number$1()),
    t_out_max: optional(number$1()),
};
/** Superstruct fields for live entity overrides — spread when curve_from_entities is enabled */
const curveEntityStructFields = {
    min_flow_entity: optional(string()),
    max_flow_entity: optional(string()),
};

function buildTuningDialogConfig(cfg) {
    const hc_entity = cfg.hc_entity;
    const shift_entity = cfg.shift_entity;
    if (!hc_entity || !shift_entity)
        return undefined;
    return {
        climate_entity: cfg.climate_entity,
        outdoor_entity: cfg.outdoor_entity,
        flow_entity: cfg.flow_entity,
        hc_entity,
        shift_entity,
        n_entity: cfg.n_entity,
        min_flow_entity: cfg.min_flow_entity,
        max_flow_entity: cfg.max_flow_entity,
        recalculate_service: cfg.recalculate_service,
        curve_from_entities: cfg.curve_from_entities
            ?? !!(cfg.n_entity),
        n: cfg.n ?? CURVE_CONFIG_DEFAULTS.n,
        min_flow: cfg.min_flow ?? CURVE_CONFIG_DEFAULTS.min_flow,
        max_flow: cfg.max_flow ?? CURVE_CONFIG_DEFAULTS.max_flow,
        t_out_min: cfg.t_out_min ?? CURVE_CONFIG_DEFAULTS.t_out_min,
        t_out_max: cfg.t_out_max ?? CURVE_CONFIG_DEFAULTS.t_out_max,
    };
}

registerCustomCard({
    type: STATUS_CARD_NAME,
    name: 'Equitherm Status',
    description: 'Compact heating status tile with temperature displays',
});
let EquithermStatusCard = class EquithermStatusCard extends EquithermBaseCard {
    getGridOptions() {
        return { columns: 12, rows: this._config.show_last_updated ? 4 : 3, min_rows: 3 };
    }
    static async getStubConfig(hass) {
        return {
            type: 'custom:equitherm-status-card',
            climate_entity: findClimateEntity(hass),
            outdoor_entity: findOutdoorEntity(hass),
            flow_entity: findFlowEntity(hass),
        };
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return statusCardEditor; });
        return document.createElement(STATUS_CARD_EDITOR_NAME);
    }
    setConfig(config) {
        this._config = validateStatusCardConfig(config);
        this._dialogConfig = buildTuningDialogConfig(this._config);
    }
    _lastUpdatedEntity() {
        return this._config.flow_entity;
    }
    get _hasParamsFooter() {
        const cfg = this._config;
        return !!cfg.hc_entity || !!cfg.shift_entity || !!cfg.n_entity || !!cfg.pid_correction_entity;
    }
    static get styles() {
        return [
            super.styles,
            cardStyle,
            headerStyles,
            paramsFooterStyles,
            tunableFooterStyles,
            kpiFooterStyles,
            i$5 `
        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .kpi-footer {
          flex: 1;
          min-width: 0;
          place-content: center;
        }
      `,
        ];
    }
    _renderParamsFooterWithTune() {
        return this._renderTunableParamsFooter({
            hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: 0.9 } : undefined,
            n: this._config.n_entity ? { entity: this._config.n_entity, fallback: 1.25 } : undefined,
            shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: 0 } : undefined,
            pid_correction: this._config.pid_correction_entity ? { entity: this._config.pid_correction_entity } : undefined,
        }, () => { this._showTuningDialog = true; });
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        const lookup = (id) => this._entityState(id);
        const adjustingDir = getAdjustingDirection(this._config, lookup);
        const title = this._computeCardTitle('status_card.default_title');
        return b `
      <ha-card>
        ${this._renderHeader({
            iconName: 'mdi:thermostat',
            clickEntity: this._config.climate_entity,
            title,
        })}

        ${this._renderKpiFooter({
            adjustingDir: adjustingDir ?? undefined,
            curveOutput: this._curveOutputTempFormatted || undefined,
        })}
        ${this._renderParamsFooterWithTune()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showTuningDialog ? b `
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : A}
    `;
    }
};
EquithermStatusCard = __decorate([
    t$1(STATUS_CARD_NAME)
], EquithermStatusCard);

const CURVE_CARD_NAME = `${PREFIX_NAME}-curve-card`;
const CURVE_CARD_EDITOR_NAME = editorName(CURVE_CARD_NAME);

// src/cards/curve-card/curve-card-config.ts
/** Runtime validation schema for CurveCardConfig */
const CurveCardConfigStruct = type({
    type: string(),
    climate_entity: string(),
    outdoor_entity: string(),
    curve_output_entity: optional(string()),
    pid_output_entity: optional(string()),
    flow_entity: string(),
    rate_limiting_entity: optional(string()),
    pid_active_entity: optional(string()),
    wws_entity: optional(string()),
    show_last_updated: optional(boolean()),
    show_kpi_footer: optional(boolean()),
    show_params_footer: optional(boolean()),
    name: optional(any()),
    curve_from_entities: optional(any()),
    hc_entity: optional(string()),
    n_entity: optional(string()),
    shift_entity: optional(string()),
    tunable: optional(boolean()),
    recalculate_service: optional(string()),
    ...curveEntityStructFields,
    hc: optional(number$1()),
    shift: optional(number$1()),
    ...curveConfigStructFields,
});
/** Default curve parameter values (matching @equitherm/core defaults) */
const CURVE_CARD_DEFAULTS = {
    hc: 0.9,
    shift: 0,
    ...CURVE_CONFIG_DEFAULTS,
};
/** Validate and apply defaults */
function validateCurveCardConfig(config) {
    const c = { ...config };
    if ('title' in c && !('name' in c))
        c.name = c.title;
    delete c.title;
    assert(c, CurveCardConfigStruct);
    return { ...CURVE_CARD_DEFAULTS, ...c };
}

let EqManualOverlay = class EqManualOverlay extends i$2 {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    connectedCallback() {
        super.connectedCallback();
        const root = this.getRootNode();
        this._hostEl = root.host;
        if (!this._hostEl)
            return;
        this._active = this._hostEl.hasAttribute('manual-override');
        this._observer = new MutationObserver(() => {
            this._active = this._hostEl.hasAttribute('manual-override');
        });
        this._observer.observe(this._hostEl, {
            attributes: true,
            attributeFilter: ['manual-override'],
        });
    }
    disconnectedCallback() {
        this._observer?.disconnect();
        super.disconnectedCallback();
    }
    static get styles() {
        return i$5 `
      :host {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 10;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 99px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color, rgba(0,0,0,0.12)) 60%, transparent);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .chip ha-icon {
        --mdc-icon-size: 14px;
        opacity: 0.7;
      }
    `;
    }
    render() {
        if (!this._active)
            return A;
        const localize = setupCustomlocalize(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.getRootNode()?.host?.hass);
        return b `
      <div class="chip">
        <ha-icon icon="mdi:hand-back-right"></ha-icon>
        ${localize('common.manual_override')}
      </div>
    `;
    }
};
__decorate([
    r()
], EqManualOverlay.prototype, "_active", void 0);
EqManualOverlay = __decorate([
    t$1('eq-manual-overlay')
], EqManualOverlay);

registerCustomCard({
    type: CURVE_CARD_NAME,
    name: 'Equitherm Curve',
    description: 'Heating curve visualization with current operating point',
});
/** Marker sizes for chart annotations */
const MARKER_SINGLE = 9;
const MARKER_CURVE_OUTPUT = 10;
const MARKER_RATE_LIMITED = 8;
let EquithermCurveCard = class EquithermCurveCard extends EquithermEChartCard {
    willUpdate(changedProps) {
        super.willUpdate(changedProps);
        if (changedProps.has('_config')) {
            this._updateChartConfig();
            return;
        }
        if (changedProps.has('hass') && this.hass) {
            const oldHass = changedProps.get('hass');
            if (!oldHass || this._relevantStateChanged(oldHass)) {
                this._updateChartConfig();
            }
        }
    }
    _relevantStateChanged(oldHass) {
        const entities = [
            this._config.outdoor_entity,
            this._config.flow_entity,
            this._config.climate_entity,
            this._config.rate_limiting_entity,
            this._config.pid_output_entity,
            this._config.curve_output_entity,
            this._config.pid_active_entity,
            ...((this._config.curve_from_entities || this._config.tunable) ? [this._config.hc_entity, this._config.shift_entity, this._config.n_entity, this._config.min_flow_entity, this._config.max_flow_entity] : []),
        ].filter(Boolean);
        return entities.some(id => this.hass.states[id]?.state !== oldHass.states[id]?.state);
    }
    static async getStubConfig(hass) {
        return {
            type: 'custom:equitherm-curve-card',
            climate_entity: findClimateEntity(hass),
            outdoor_entity: findOutdoorEntity(hass),
            curve_output_entity: findCurveOutputEntity(hass),
            flow_entity: findFlowEntity(hass),
            hc: 1.2,
            n: 1.25,
            shift: 0,
            min_flow: 25,
            max_flow: 70,
            t_out_min: -20,
            t_out_max: 20,
        };
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return curveCardEditor; });
        return document.createElement(CURVE_CARD_EDITOR_NAME);
    }
    setConfig(config) {
        this._config = validateCurveCardConfig(config);
        this._dialogConfig = buildTuningDialogConfig(this._config);
    }
    _lastUpdatedEntity() {
        return this._config.flow_entity;
    }
    get _tTarget() {
        return this._climate?.attributes.temperature ?? 21;
    }
    get _tOutdoor() {
        const s = this._entityState(this._config.outdoor_entity);
        if (!s)
            return null;
        const val = parseFloat(s.state);
        return isNaN(val) ? null : this._fromDisplayTemp(val);
    }
    get _flowTemp() {
        const s = this._entityState(this._config.flow_entity);
        if (s) {
            const val = parseFloat(s.state);
            if (!isNaN(val))
                return this._fromDisplayTemp(val);
        }
        return this._config.min_flow;
    }
    get _currentN() {
        return this._config.curve_from_entities
            ? this._resolveEntityNumber(this._config.n_entity, this._config.n)
            : this._config.n;
    }
    _renderParamsFooterContent() {
        if (!this._config.curve_from_entities)
            return A;
        return this._renderTunableParamsFooter({
            hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: this._config.hc, onClick: this._config.tunable ? undefined : () => { this._showTuningDialog = true; } } : undefined,
            n: this._config.n_entity ? { entity: this._config.n_entity, fallback: this._config.n } : undefined,
            shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: this._config.shift, onClick: this._config.tunable ? undefined : () => { this._showTuningDialog = true; } } : undefined,
        }, () => { this._showTuningDialog = true; });
    }
    _buildEChartOptions() {
        return this._buildSingleCurveOptions();
    }
    _buildSingleCurveOptions() {
        const localize = setupCustomlocalize(this.hass);
        const cfg = this._config;
        const curveParams = {
            tTarget: this._tTarget,
            hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
            n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
            shift: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.shift_entity, cfg.shift) : cfg.shift,
            minFlow: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow,
            maxFlow: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow,
        };
        // Resolve colors at runtime from CSS variables
        const style = getComputedStyle(this);
        const gradientStart = style.getPropertyValue('--curve-gradient-start').trim();
        const gradientEnd = style.getPropertyValue('--curve-gradient-end').trim();
        const heatingColor = gradientStart ? `rgb(${gradientStart})` : resolveRgbColor(this, 'heating');
        const coolingColor = gradientEnd ? `rgb(${gradientEnd})` : resolveRgbColor(this, 'cooling');
        const wwsdFill = `rgba(${style.getPropertyValue('--rgb-warning').trim() || '255, 167, 38'}, 0.08)`;
        const curveSeries = buildCurveSeries(curveParams, cfg.t_out_min, cfg.t_out_max);
        // Convert curve data to display units for charting
        const displaySeries = curveSeries.map(p => ({
            x: this._toDisplayTemp(p.x),
            y: this._toDisplayTemp(p.y),
        }));
        const tOutdoor = this._tOutdoor;
        // Build operating point data for a line series (markPoint doesn't work through ha-chart-base)
        const operatingPoints = [];
        const lookup = (id) => this._entityState(id);
        const rateLimiting = isRateLimitingActive(this._config, lookup);
        const rateTarget = getRateTargetEntity(this._config);
        if (tOutdoor !== null) {
            const tOutdoorDisplay = this._toDisplayTemp(tOutdoor);
            const currentFlow = flowAtOutdoor(curveParams, tOutdoor);
            const currentFlowDisplay = this._toDisplayTemp(currentFlow);
            if (rateLimiting) {
                // rateTarget entity state is already in display units
                const rateTargetValue = rateTarget
                    ? (this._entityState(rateTarget) ? parseFloat(this._entityState(rateTarget).state) : currentFlowDisplay)
                    : currentFlowDisplay;
                if (this._config.pid_output_entity && this._config.curve_output_entity) {
                    // curveOutput entity state is already in display units
                    const curveOutput = this._entityState(this._config.curve_output_entity);
                    const curveValue = curveOutput ? parseFloat(curveOutput.state) : currentFlowDisplay;
                    operatingPoints.push({
                        value: [tOutdoorDisplay, curveValue],
                        symbolSize: MARKER_RATE_LIMITED,
                        itemStyle: { color: 'transparent', borderColor: heatingColor, borderWidth: 1.5 },
                    });
                }
                operatingPoints.push({
                    value: [tOutdoorDisplay, rateTargetValue],
                    symbolSize: MARKER_CURVE_OUTPUT,
                    itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
                });
                operatingPoints.push({
                    value: [tOutdoorDisplay, this._toDisplayTemp(this._flowTemp)],
                    symbolSize: MARKER_RATE_LIMITED,
                    itemStyle: { color: 'transparent', borderColor: heatingColor, borderWidth: 2 },
                });
            }
            else {
                operatingPoints.push({
                    value: [tOutdoorDisplay, currentFlowDisplay],
                    symbolSize: MARKER_SINGLE,
                    itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
                });
            }
        }
        // Discrete markers: sample every 50th point
        const discretePoints = displaySeries
            .filter((_p, i) => i % 50 === 0)
            .map(p => [p.x, p.y]);
        return {
            options: {
                animation: false,
                xAxis: {
                    type: 'value',
                    min: this._toDisplayTemp(cfg.t_out_min),
                    max: this._toDisplayTemp(cfg.t_out_max),
                    inverse: true,
                    axisLabel: {
                        fontSize: 10,
                        formatter: (val) => `${parseFloat(val.toFixed(1))}`,
                    },
                    axisTick: { show: false },
                    axisLine: { show: false },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        formatter: (v) => `${parseFloat(v.toFixed(1))}`,
                    },
                    min: this._toDisplayTemp(curveParams.minFlow - 5),
                    max: this._toDisplayTemp(curveParams.maxFlow + 5),
                },
                grid: { top: 5, right: 5, bottom: 20, left: 30 },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
                    borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
                    borderWidth: 1,
                    padding: [8, 12],
                    textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
                    formatter: (params) => {
                        const curveParam = (Array.isArray(params) ? params : []).find((p) => p.seriesName === localize('curve_card.flow_temp'));
                        if (!curveParam)
                            return '';
                        const outdoorVal = curveParam.value[0];
                        const flowVal = curveParam.value[1];
                        const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
                        const fmt = (v) => `${parseFloat(v.toFixed(1))} ${unit}`;
                        const marker = (color) => `<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background-color:${color}"></span>`;
                        return `<div style="margin-bottom:4px;font-weight:600">${fmt(outdoorVal)} ${localize('curve_card.outdoor_axis_suffix')}</div>`
                            + `<div>${marker(heatingColor)}${fmt(flowVal)} ${localize('curve_card.flow_axis_suffix')}</div>`;
                    },
                },
                legend: { show: false },
            },
            data: [
                {
                    type: 'line',
                    name: localize('curve_card.flow_temp'),
                    data: displaySeries.map(p => [p.x, p.y]),
                    showSymbol: false,
                    lineStyle: { width: 2 },
                    itemStyle: { color: heatingColor },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 1, y2: 0,
                            colorStops: [
                                { offset: 0, color: heatingColor },
                                { offset: 1, color: coolingColor },
                            ],
                        },
                    },
                },
                // Discrete markers (every 50th point) — line series with no line
                {
                    type: 'line',
                    name: 'markers',
                    data: discretePoints,
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 3,
                    lineStyle: { width: 0 },
                    itemStyle: { color: heatingColor, borderColor: '#fff', borderWidth: 1 },
                    tooltip: { show: false },
                },
                // Operating point(s) — line series with no line (markPoint workaround)
                {
                    type: 'line',
                    name: 'operating-point',
                    data: operatingPoints,
                    showSymbol: true,
                    symbol: 'circle',
                    lineStyle: { width: 0 },
                    tooltip: { show: false },
                },
                // WWSD zone — filled area from t_out_max to tTarget
                ...(this._isWWSD ? [{
                        type: 'line',
                        name: 'wwsd',
                        data: [
                            [this._toDisplayTemp(cfg.t_out_max), this._toDisplayTemp(curveParams.maxFlow + 5)],
                            [this._toDisplayTemp(this._tTarget), this._toDisplayTemp(curveParams.maxFlow + 5)],
                        ],
                        showSymbol: false,
                        lineStyle: { width: 0 },
                        areaStyle: { color: wwsdFill },
                        tooltip: { show: false },
                    }] : []),
            ],
        };
    }
    _renderChart() {
        if (!this._echartConfig)
            return A;
        const { options, data } = this._echartConfig;
        return b `
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${options}
          .data=${data}
          height="100%"
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `;
    }
    static get styles() {
        return [
            super.styles,
            cardStyle,
            headerStyles,
            paramsFooterStyles,
            tunableFooterStyles,
            kpiFooterStyles,
            i$5 `
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
          padding: 0 8px;
        }
        .chart-wrapper ha-chart-base {
          height: 100%;
        }
      `,
        ];
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        const lookup = (id) => this._entityState(id);
        const adjustingDir = getAdjustingDirection(this._config, lookup);
        const title = this._computeCardTitle('curve_card.default_title');
        return b `
      <ha-card>
        ${this._renderHeader({
            iconName: 'mdi:thermostat',
            clickEntity: this._config.climate_entity,
            title,
        })}
        ${this._renderChart()}
        ${this._renderKpiFooter({
            adjustingDir: adjustingDir ?? undefined,
            curveOutput: this._curveOutputTempFormatted || undefined,
        })}
        ${this._renderParamsFooterContent()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showTuningDialog ? b `
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : A}
    `;
    }
};
EquithermCurveCard = __decorate([
    t$1(CURVE_CARD_NAME)
], EquithermCurveCard);

const FORECAST_CARD_NAME = `${PREFIX_NAME}-forecast-card`;
const FORECAST_CARD_EDITOR_NAME = editorName(FORECAST_CARD_NAME);

// src/cards/forecast-card/forecast-card-config.ts
/** Runtime validation schema for ForecastCardConfig */
const ForecastCardConfigStruct = type({
    type: string(),
    weather_entity: string(),
    climate_entity: string(),
    flow_entity: string(),
    hours: optional(number$1()),
    name: optional(any()),
    curve_from_entities: optional(any()),
    hc_entity: optional(string()),
    n_entity: optional(string()),
    shift_entity: optional(string()),
    ...curveEntityStructFields,
    outdoor_entity: optional(string()),
    pid_active_entity: optional(string()),
    wws_entity: optional(string()),
    show_last_updated: optional(boolean()),
    show_kpi_footer: optional(boolean()),
    show_params_footer: optional(boolean()),
    tunable: optional(boolean()),
    recalculate_service: optional(string()),
    hc: optional(number$1()),
    ...curveConfigStructFields,
    shift: optional(number$1()),
});
const FORECAST_CARD_DEFAULTS = {
    hours: 24,
    hc: 0.9,
    shift: 0,
    ...CURVE_CONFIG_DEFAULTS,
};
/** Validate and apply defaults */
function validateForecastCardConfig(config) {
    assert(config, ForecastCardConfigStruct);
    return { ...FORECAST_CARD_DEFAULTS, ...config };
}

function buildForecastSeries(forecast, params, hours) {
    return forecast.slice(0, hours).map((entry) => ({
        datetime: entry.datetime,
        hour: new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tOutdoor: entry.temperature,
        tFlow: computeFlowTemperature({ ...params, tOutdoor: entry.temperature }),
    }));
}
function peakDemand(points) {
    if (points.length === 0)
        return undefined;
    return points.reduce((max, p) => (p.tFlow > (max?.tFlow ?? 0) ? p : max), points[0]);
}

registerCustomCard({
    type: FORECAST_CARD_NAME,
    name: 'Equitherm Forecast',
    description: 'Heating forecast based on weather predictions',
});
let EquithermForecastCard = class EquithermForecastCard extends EquithermEChartCard {
    constructor() {
        super(...arguments);
        this._forecastPoints = [];
    }
    updated(changedProps) {
        super.updated(changedProps);
        // Subscribe to forecast on config change or first hass
        if (changedProps.has('_config') || (!this._unsub && changedProps.has('hass'))) {
            this._subscribeForecast();
        }
        if (changedProps.has('_forecastPoints')) {
            this._updateChartConfig();
        }
    }
    static async getStubConfig(hass) {
        return {
            type: 'custom:equitherm-forecast-card',
            weather_entity: findWeatherEntity(hass) ?? '',
            climate_entity: findClimateEntity(hass) ?? '',
            flow_entity: findFlowEntity(hass) ?? '',
            hours: 24,
            hc: 1.2,
            n: 1.25,
            shift: 0,
            min_flow: 25,
            max_flow: 70,
        };
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return forecastCardEditor; });
        return document.createElement(FORECAST_CARD_EDITOR_NAME);
    }
    setConfig(config) {
        this._config = validateForecastCardConfig(config);
        this._dialogConfig = buildTuningDialogConfig(this._config);
    }
    _lastUpdatedEntity() {
        return this._config.weather_entity;
    }
    get _tTarget() {
        return this._climate?.attributes.temperature ?? 21;
    }
    get _flowTemp() {
        const s = this._entityState(this._config.flow_entity);
        if (s) {
            const val = parseFloat(s.state);
            if (!isNaN(val))
                return this._fromDisplayTemp(val);
        }
        return this._config.min_flow; // config values always °C
    }
    /** Current outdoor temp from dedicated sensor (Kalman etc.) or weather entity (always °C) */
    get _outdoorTemp() {
        if (this._config.outdoor_entity) {
            const s = this._entityState(this._config.outdoor_entity);
            if (s) {
                const val = parseFloat(s.state);
                if (!isNaN(val))
                    return this._fromDisplayTemp(val);
            }
        }
        const weather = this._entityState(this._config.weather_entity);
        if (weather) {
            const val = parseFloat(weather.attributes.temperature);
            if (!isNaN(val))
                return this._fromDisplayTemp(val);
        }
        return NaN;
    }
    /** Override: outdoor formatted with weather entity fallback */
    get _outdoorTempFormatted() {
        const temp = this._outdoorTemp;
        return isNaN(temp) ? '—' : this._formatCalcTemp(temp);
    }
    /** Whether Warm Weather Shutdown is active.
     *  Prefers wws_entity when configured, otherwise infers from forecast outdoor temp. */
    get _isWWSD() {
        if (this._config?.wws_entity) {
            const s = this._entityState(this._config.wws_entity);
            return s?.state === 'on';
        }
        const tTarget = this._climate?.attributes.temperature;
        if (tTarget == null)
            return false;
        return !isNaN(this._outdoorTemp) && this._outdoorTemp >= tTarget;
    }
    _wwsdDescription() {
        const localize = setupCustomlocalize(this.hass);
        const tTarget = this._climate?.attributes.temperature;
        if (!isNaN(this._outdoorTemp) && tTarget != null) {
            return `${localize('common.outdoor')} ${this._formatCalcTemp(this._outdoorTemp)} ≥ ${this._formatCalcTemp(tTarget)}`;
        }
        return localize('common.wwsd_label');
    }
    /** Build the curve params from config, optionally reading from live entities */
    get _curveParams() {
        const cfg = this._config;
        return {
            tTarget: this._tTarget,
            hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
            n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
            shift: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.shift_entity, cfg.shift) : cfg.shift,
            minFlow: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow,
            maxFlow: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow,
        };
    }
    /** Process forecast data and update chart (converts display units to °C for computation) */
    _processForecast(forecast) {
        const celsiusForecast = forecast.map(f => ({
            datetime: f.datetime,
            temperature: this._fromDisplayTemp(f.temperature),
        }));
        this._forecastPoints = buildForecastSeries(celsiusForecast, this._curveParams, this._config.hours);
    }
    /** Unsubscribe from forecast updates */
    _unsubscribeForecast() {
        if (this._unsub) {
            this._unsub();
            this._unsub = undefined;
        }
    }
    /** Subscribe to weather forecast via HA WebSocket (real-time updates) */
    async _subscribeForecast() {
        this._unsubscribeForecast();
        if (!this.isConnected || !this.hass || !this._config?.weather_entity)
            return;
        try {
            const unsub = await this.hass.connection.subscribeMessage((event) => {
                if (event.forecast) {
                    this._processForecast(event.forecast);
                }
            }, {
                type: 'weather/subscribe_forecast',
                forecast_type: 'hourly',
                entity_id: this._config.weather_entity,
            });
            // Only store if still the active subscription (not replaced by a newer call)
            if (!this._unsub) {
                this._unsub = unsub;
            }
            else {
                unsub(); // Another subscription was already set, discard this one
            }
        }
        catch (err) {
            console.warn('Failed to subscribe to weather forecast:', err);
        }
    }
    _buildEChartOptions() {
        const points = this._forecastPoints;
        const localize = setupCustomlocalize(this.hass);
        const heatingColor = resolveRgbColor(this, 'heating');
        const coolingColor = resolveRgbColor(this, 'cooling');
        const peak = peakDemand(points);
        // Peak marker data (markPoint workaround)
        const peakData = peak ? [{
                value: [new Date(peak.datetime).getTime(), this._toDisplayTemp(peak.tFlow)],
                symbolSize: 6,
                itemStyle: { color: heatingColor, borderColor: '#fff', borderWidth: 2 },
                label: {
                    show: true,
                    formatter: `${localize('forecast_card.peak')}: ${this._toDisplayTemp(peak.tFlow).toFixed(1)}${this.hass?.config?.unit_system?.temperature ?? '°C'}`,
                    color: '#fff',
                    backgroundColor: heatingColor,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: [2, 6],
                    borderRadius: 3,
                    position: 'top',
                },
            }] : [];
        return {
            options: {
                animation: false,
                xAxis: {
                    type: 'time',
                    axisLabel: { fontSize: 10, hideOverlap: true, formatter: (value) => this._formatChartTime(value) },
                    axisTick: { show: false },
                    axisLine: { show: false },
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: { fontSize: 10 },
                        min: this._toDisplayTemp((this._curveParams.minFlow ?? 20) - 5),
                        max: this._toDisplayTemp((this._curveParams.maxFlow ?? 70) + 5),
                    },
                    {
                        type: 'value',
                        axisLabel: { fontSize: 10 },
                    },
                ],
                grid: { top: 15, right: 15, bottom: 25, left: 35 },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
                    borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
                    borderWidth: 1,
                    padding: [8, 12],
                    textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
                    formatter: (params) => {
                        const time = this._formatChartTime(params[0].value[0]);
                        const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
                        let out = `<span style="opacity:0.6">${time}</span><br/>`;
                        for (const p of params) {
                            if (p.seriesName === 'peak')
                                continue;
                            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${p.color};"></span>`;
                            out += `${marker}${p.seriesName}: <b>${p.value[1].toFixed(1)}${unit}</b><br/>`;
                        }
                        return out;
                    },
                },
                legend: { show: false },
            },
            data: [
                {
                    type: 'line',
                    name: localize('forecast_card.flow_temp'),
                    data: points.map(p => [new Date(p.datetime).getTime(), this._toDisplayTemp(p.tFlow)]),
                    showSymbol: false,
                    lineStyle: { width: 2 },
                    itemStyle: { color: heatingColor },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: `rgba(${heatingColor.replace('rgb(', '').replace(')', '')}, 0.4)` },
                                { offset: 1, color: `rgba(${heatingColor.replace('rgb(', '').replace(')', '')}, 0.05)` },
                            ],
                        },
                    },
                },
                {
                    type: 'line',
                    name: localize('forecast_card.outdoor_temp'),
                    data: points.map(p => [new Date(p.datetime).getTime(), this._toDisplayTemp(p.tOutdoor)]),
                    yAxisIndex: 1,
                    showSymbol: false,
                    lineStyle: { width: 1.5, type: 'dashed' },
                    itemStyle: { color: coolingColor },
                },
                // Peak marker (markPoint workaround)
                ...(peak ? [{
                        type: 'line',
                        name: 'peak',
                        data: peakData,
                        showSymbol: true,
                        symbol: 'circle',
                        lineStyle: { width: 0 },
                        tooltip: { show: false },
                    }] : []),
            ],
        };
    }
    _renderChart() {
        if (!this._echartConfig)
            return A;
        const { options, data } = this._echartConfig;
        return b `
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${options}
          .data=${data}
          height="100%"
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `;
    }
    _onChartDisconnecting() {
        this._unsubscribeForecast();
    }
    _onChartReconnected() {
        this._subscribeForecast();
    }
    static get styles() {
        return [
            super.styles,
            cardStyle,
            headerStyles,
            paramsFooterStyles,
            kpiFooterStyles,
            tunableFooterStyles,
            i$5 `
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
        }
        .chart-wrapper ha-chart-base {
          height: 100%;
        }
      `,
        ];
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        const title = this._computeCardTitle('forecast_card.default_title');
        return b `
      <ha-card>
        ${this._renderHeader({
            iconName: 'mdi:weather-partly-cloudy',
            clickEntity: this._config.weather_entity,
            title,
        })}
        ${this._renderChart()}
        ${this._renderKpiFooter({
            outdoorClickEntity: this._config.outdoor_entity ?? this._config.weather_entity,
        })}
        ${this._config.curve_from_entities
            ? this._renderTunableParamsFooter({
                hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: this._config.hc } : undefined,
                n: this._config.n_entity ? { entity: this._config.n_entity, fallback: this._config.n } : undefined,
                shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: this._config.shift } : undefined,
            }, () => { this._showTuningDialog = true; })
            : A}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showTuningDialog ? b `
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : A}
    `;
    }
};
__decorate([
    r()
], EquithermForecastCard.prototype, "_forecastPoints", void 0);
EquithermForecastCard = __decorate([
    t$1(FORECAST_CARD_NAME)
], EquithermForecastCard);

console.info('%c EQUITHERM-CARDS %c 1.5.0 ', 'color: white; background: #f97316; font-weight: bold;', 'color: #f97316; background: white; font-weight: bold;');

/** Create an entity selector field */
function entity(name, opts = {}) {
    return {
        name,
        required: opts.required ?? true,
        selector: { entity: { domain: opts.domain, device_class: opts.device_class } },
    };
}
/** Create a number field */
function number(name, min, max, step = 1, opts = {}) {
    return {
        name,
        required: opts.required ?? false,
        ...(opts.default !== undefined && { default: opts.default }),
        selector: { number: { min, max, step, mode: opts.mode ?? 'box', unit_of_measurement: opts.unit_of_measurement } },
    };
}
/** Create a text input field */
function text(name, required = false) {
    return {
        name,
        required,
        selector: { text: {} },
    };
}
/** Create an entity name picker field */
function entityName(name, context) {
    return {
        name,
        selector: { entity_name: {} },
        context,
    };
}
/** Group fields side-by-side in a grid */
function grid(fields) {
    return {
        type: 'grid',
        name: '',
        schema: fields,
    };
}
/** Create a collapsible section */
function expandable(title, icon, schema) {
    return {
        type: 'expandable',
        flatten: true,
        title,
        icon,
        name: '',
        schema,
    };
}
/** Convenience object for namespaced imports */
const schemaHelpers = {
    entity,
    number,
    text,
    entityName,
    grid,
    expandable,
};

let StatusCardEditor = class StatusCardEditor extends EquithermBaseEditor {
    constructor() {
        super(...arguments);
        this._schemaMemo = memoizeOne((tunable) => {
            const localize = setupCustomlocalize(this.hass);
            return [
                // Required entities
                schemaHelpers.entity('climate_entity', { domain: 'climate' }),
                schemaHelpers.entityName('name', { entity: 'climate_entity' }),
                schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
                schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
                { name: 'show_last_updated', selector: { boolean: {} }, default: false },
                { name: 'show_params_footer', selector: { boolean: {} }, default: true },
                { name: 'tunable', selector: { boolean: {} }, default: false },
                ...(tunable
                    ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
                            schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
                            schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
                            { name: 'recalculate_service', selector: { text: {} } },
                        ])]
                    : []),
                // Optional entities
                schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
                    schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
                    schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
                    schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('wws_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('pid_correction_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature', required: false }),
                ]),
                schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve-cumulative', [
                    schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'], required: false }),
                    schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'], required: false }),
                    schemaHelpers.entity('n_entity', { domain: ['number', 'input_number'], required: false }),
                ]),
            ];
        });
    }
    setConfig(config) {
        this._config = { ...config };
    }
    _validate(config) {
        validateStatusCardConfig(config);
    }
    _getSchema() {
        return this._schemaMemo(!!this._config.tunable);
    }
};
StatusCardEditor = __decorate([
    t$1(STATUS_CARD_EDITOR_NAME)
], StatusCardEditor);

var statusCardEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get StatusCardEditor () { return StatusCardEditor; }
});

let EquithermCurveCardEditor = class EquithermCurveCardEditor extends EquithermBaseEditor {
    constructor() {
        super(...arguments);
        this._schemaMemo = memoizeOne((curveFromEntities, tunable, imperial) => {
            const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
            const abs = (c) => Math.round(celsiusToDisplay(c, imperial) * 10) / 10;
            const delta = (c) => Math.round(celsiusToDisplayDelta(c, imperial) * 10) / 10;
            const localize = setupCustomlocalize(this.hass);
            return [
                // Required entities — top level
                schemaHelpers.entity('climate_entity', { domain: 'climate' }),
                // Name (depends on climate_entity for context)
                schemaHelpers.entityName('name', { entity: 'climate_entity' }),
                schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
                schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
                schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
                { name: 'tunable', selector: { boolean: {} }, default: false },
                { name: 'show_last_updated', selector: { boolean: {} }, default: false },
                { name: 'show_kpi_footer', selector: { boolean: {} }, default: true },
                { name: 'show_params_footer', selector: { boolean: {} }, default: true },
                // Tuning entities (only when tunable enabled)
                ...(tunable
                    ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
                            schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
                            schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
                            { name: 'recalculate_service', selector: { text: {} } },
                        ])]
                    : []),
                // Optional entities
                schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
                    schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
                    schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('wws_entity', { domain: ['binary_sensor'], required: false }),
                ]),
                // Curve parameters
                schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve', [
                    { name: 'curve_from_entities', selector: { boolean: {} } },
                    ...(curveFromEntities
                        ? [
                            schemaHelpers.entity('hc_entity', { domain: 'number' }),
                            schemaHelpers.entity('n_entity', { domain: 'number' }),
                            schemaHelpers.entity('shift_entity', { domain: 'number' }),
                            schemaHelpers.entity('min_flow_entity', { domain: ['sensor', 'number'], required: false }),
                            schemaHelpers.entity('max_flow_entity', { domain: ['sensor', 'number'], required: false }),
                        ]
                        : [
                            schemaHelpers.grid([
                                schemaHelpers.number('hc', 0.5, 3.0, 0.1, { default: 0.9 }),
                                schemaHelpers.number('n', 1.0, 2.0, 0.05, { default: 1.25 }),
                            ]),
                            schemaHelpers.number('shift', delta(-15), delta(15), 1, { unit_of_measurement: unit, default: delta(0) }),
                            schemaHelpers.grid([
                                schemaHelpers.number('min_flow', abs(15), abs(35), 1, { unit_of_measurement: unit, default: abs(20) }),
                                schemaHelpers.number('max_flow', abs(50), abs(90), 1, { unit_of_measurement: unit, default: abs(70) }),
                            ]),
                        ]),
                ]),
                // Display range
                schemaHelpers.expandable(localize('editor.display_range'), 'mdi:arrow-expand-horizontal', [
                    schemaHelpers.grid([
                        schemaHelpers.number('t_out_min', abs(-30), abs(5), 1, { unit_of_measurement: unit, default: abs(-20) }),
                        schemaHelpers.number('t_out_max', abs(0), abs(30), 1, { unit_of_measurement: unit, default: abs(20) }),
                    ]),
                ]),
            ];
        });
    }
    setConfig(config) {
        this._config = { ...config };
    }
    _validate(config) {
        validateCurveCardConfig(config);
    }
    /** Convert user-entered imperial values to °C before validation. */
    _transformConfig(raw) {
        const imp = isImperial(this.hass);
        if (!imp)
            return raw;
        const cfg = { ...raw };
        if (cfg.shift != null)
            cfg.shift = displayDeltaToCelsius(cfg.shift, true);
        for (const f of ['min_flow', 'max_flow', 't_out_min', 't_out_max']) {
            if (cfg[f] != null)
                cfg[f] = displayToCelsius(cfg[f], true);
        }
        return cfg;
    }
    /** Convert internal °C values to display units for the form. */
    _getDisplayConfig() {
        const imp = isImperial(this.hass);
        if (!imp)
            return this._config;
        const cfg = { ...this._config };
        if (cfg.shift != null)
            cfg.shift = Math.round(celsiusToDisplayDelta(cfg.shift, true) * 10) / 10;
        for (const f of ['min_flow', 'max_flow', 't_out_min', 't_out_max']) {
            if (cfg[f] != null)
                cfg[f] = Math.round(celsiusToDisplay(cfg[f], true) * 10) / 10;
        }
        return cfg;
    }
    _getSchema() {
        return this._schemaMemo(!!this._config.curve_from_entities, !!this._config.tunable, isImperial(this.hass));
    }
};
EquithermCurveCardEditor = __decorate([
    t$1(CURVE_CARD_EDITOR_NAME)
], EquithermCurveCardEditor);

var curveCardEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get EquithermCurveCardEditor () { return EquithermCurveCardEditor; }
});

let EquithermForecastCardEditor = class EquithermForecastCardEditor extends EquithermBaseEditor {
    constructor() {
        super(...arguments);
        this._schemaMemo = memoizeOne((curveFromEntities, tunable) => {
            const localize = setupCustomlocalize(this.hass);
            return [
                // Required entities — top level
                schemaHelpers.entity('weather_entity', { domain: 'weather' }),
                schemaHelpers.entity('climate_entity', { domain: 'climate' }),
                schemaHelpers.entityName('name', { entity: 'climate_entity' }),
                schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
                { name: 'show_last_updated', selector: { boolean: {} }, default: false },
                { name: 'show_kpi_footer', selector: { boolean: {} }, default: true },
                { name: 'show_params_footer', selector: { boolean: {} }, default: true },
                { name: 'tunable', selector: { boolean: {} }, default: false },
                ...(tunable
                    ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
                            schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
                            schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
                            { name: 'recalculate_service', selector: { text: {} } },
                        ])]
                    : []),
                // Optional entities
                schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
                    schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature', required: false }),
                    schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
                    schemaHelpers.entity('wws_entity', { domain: ['binary_sensor'], required: false }),
                ]),
                // Forecast settings
                schemaHelpers.expandable(localize('editor.forecast_settings'), 'mdi:clock-outline', [
                    schemaHelpers.number('hours', 1, 48, 1, { unit_of_measurement: 'h', default: 24 }),
                ]),
                // Curve parameters
                schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve', [
                    { name: 'curve_from_entities', selector: { boolean: {} } },
                    ...(curveFromEntities
                        ? [
                            schemaHelpers.entity('hc_entity', { domain: 'number' }),
                            schemaHelpers.entity('n_entity', { domain: 'number' }),
                            schemaHelpers.entity('shift_entity', { domain: 'number' }),
                            schemaHelpers.entity('min_flow_entity', { domain: ['sensor', 'number'], required: false }),
                            schemaHelpers.entity('max_flow_entity', { domain: ['sensor', 'number'], required: false }),
                        ]
                        : [
                            schemaHelpers.grid([
                                schemaHelpers.number('hc', 0.5, 3.0, 0.1, { default: 0.9 }),
                                schemaHelpers.number('n', 1.0, 2.0, 0.05, { default: 1.25 }),
                            ]),
                            schemaHelpers.number('shift', -15, 15, 1, { unit_of_measurement: '°C', default: 0 }),
                            schemaHelpers.grid([
                                schemaHelpers.number('min_flow', 15, 35, 1, { unit_of_measurement: '°C', default: 20 }),
                                schemaHelpers.number('max_flow', 50, 90, 1, { unit_of_measurement: '°C', default: 70 }),
                            ]),
                        ]),
                ]),
            ];
        });
    }
    setConfig(config) {
        this._config = { ...config };
    }
    _validate(config) {
        validateForecastCardConfig(config);
    }
    _getSchema() {
        return this._schemaMemo(!!this._config.curve_from_entities, !!this._config.tunable);
    }
};
EquithermForecastCardEditor = __decorate([
    t$1(FORECAST_CARD_EDITOR_NAME)
], EquithermForecastCardEditor);

var forecastCardEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get EquithermForecastCardEditor () { return EquithermForecastCardEditor; }
});
//# sourceMappingURL=equitherm-cards.js.map
