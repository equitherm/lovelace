function t(t,e,i,r){var n,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,i,s):n(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const s=t=>new o("string"==typeof t?t:t+"",void 0,r),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return s(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",y=_.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),n=e.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const o=n.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(void 0!==t){const o=this.constructor;if(!1===r&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??w)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,y?.({ReactiveElement:$}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,S=t=>t,T=E.trustedTypes,C=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+A,k=`<${N}>`,P=document,D=()=>P.createComment(""),B=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,O="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,U=/"/g,G=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,K=P.createTreeWalker(P,129);function X(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let n,o=2===e?"<svg>":3===e?"<math>":"",s=L;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(s.lastIndex=h,c=s.exec(i),null!==c);)h=s.lastIndex,s===L?"!--"===c[1]?s=I:void 0!==c[1]?s=R:void 0!==c[2]?(G.test(c[2])&&(n=RegExp("</"+c[2],"g")),s=F):void 0!==c[3]&&(s=F):s===F?">"===c[0]?(s=n??L,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?F:'"'===c[3]?U:q):s===U||s===q?s=F:s===I||s===R?s=L:(s=F,n=void 0);const u=s===F&&t[e+1].startsWith("/>")?" ":"";o+=s===L?i+k:l>=0?(r.push(a),i.slice(0,l)+H+i.slice(l)+A+u):i+A+(-2===l?e:u)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Z{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0;const s=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=K.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(H)){const e=l[o++],i=r.getAttribute(t).split(A),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?it:"?"===s[1]?rt:"@"===s[1]?nt:et}),r.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:n}),r.removeAttribute(t));if(G.test(r.tagName)){const t=r.textContent.split(A),e=t.length-1;if(e>0){r.textContent=T?T.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],D()),K.nextNode(),a.push({type:2,index:++n});r.append(t[e],D())}}}else if(8===r.nodeType)if(r.data===N)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,r){if(e===j)return e;let n=void 0!==r?i._$Co?.[r]:i._$Cl;const o=B(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);K.currentNode=r;let n=K.nextNode(),o=0,s=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new ot(n,this,t)),this._$AV.push(e),a=i[++s]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=P,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),B(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new tt(this.O(D()),this.O(D()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!B(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const r=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=J(this,r[i+s],e,s),a===j&&(a=this._$AH[s]),o||=!B(a)||a!==this._$AH[s],a===V?t=V:t!==V&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}o&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends et{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===j)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=E.litHtmlPolyfillSupport;st?.(Z,tt),(E.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ct=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let n=r._$litPart$;if(void 0===n){const t=i?.renderBefore??null;r._$litPart$=n=new tt(e.insertBefore(D(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:w},dt=(t=ut,e,i)=>{const{kind:r,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,n,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const n=this[r];e.call(this,i),this.requestUpdate(r,n,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return pt({...t,state:!0,attribute:!1})}const _t=t=>t.substring(0,t.indexOf(".")),ft={pulse:"@keyframes pulse {\n        0% {\n            opacity: 1;\n        }\n        50% {\n            opacity: 0;\n        }\n        100% {\n            opacity: 1;\n        }\n    }",spin:"@keyframes spin {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }",cleaning:"@keyframes cleaning {\n        0% {\n            transform: rotate(0) translate(0);\n        }\n        5% {\n            transform: rotate(0) translate(0, -3px);\n        }\n        10% {\n            transform: rotate(0) translate(0, 1px);\n        }\n        15% {\n            transform: rotate(0) translate(0);\n        }\n\n        20% {\n            transform: rotate(30deg) translate(0);\n        }\n        25% {\n            transform: rotate(30deg) translate(0, -3px);\n        }\n        30% {\n            transform: rotate(30deg) translate(0, 1px);\n        }\n        35% {\n            transform: rotate(30deg) translate(0);\n        }\n        40% {\n            transform: rotate(0) translate(0);\n        }\n\n        45% {\n            transform: rotate(-30deg) translate(0);\n        }\n        50% {\n            transform: rotate(-30deg) translate(0, -3px);\n        }\n        55% {\n            transform: rotate(-30deg) translate(0, 1px);\n        }\n        60% {\n            transform: rotate(-30deg) translate(0);\n        }\n        70% {\n            transform: rotate(0deg) translate(0);\n        }\n        100% {\n            transform: rotate(0deg);\n        }\n    }",returning:"@keyframes returning {\n        0% {\n            transform: rotate(0);\n        }\n        25% {\n            transform: rotate(20deg);\n        }\n        50% {\n            transform: rotate(0);\n        }\n        75% {\n            transform: rotate(-20deg);\n        }\n        100% {\n            transform: rotate(0);\n        }\n    }"};a`
    ${s(ft.pulse)}
  `,a`
    ${s(ft.spin)}
  `,a`
    ${s(ft.cleaning)}
  `,a`
    ${s(ft.returning)}
  `;const gt=a`
  ${s(Object.values(ft).join("\n"))}
`,yt=a`
  --rgb-error-color: 219, 68, 55;
  --default-green: 76, 175, 80;
  --default-orange: 255, 152, 0;
  --default-red: 244, 67, 54;
  --default-disabled: 189, 189, 189;
`,bt=a`
  --default-disabled: 111, 111, 111;
`,vt=a`
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
`,wt=a`
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
`,xt=1.8;function $t(t){return"°F"===t?.config?.unit_system?.temperature}function Et(t,e){return e?t*xt+32:t}function St(t,e){return e?(t-32)/xt:t}function Tt(t,e){return e?t*xt:t}function Ct(t,e){return e?t/xt:t}function Ht(t){return!!t&&t.themes.darkMode}class At extends ct{updated(t){if(super.updated(t),t.has("hass")&&this.hass){const e=Ht(t.get("hass")),i=Ht(this.hass);e!==i&&this.toggleAttribute("dark-mode",i)}}get _isImperial(){return $t(this.hass)}_toDisplayTemp(t){return Et(t,this._isImperial)}_fromDisplayTemp(t){return St(t,this._isImperial)}_toDisplayDelta(t){return Tt(t,this._isImperial)}_fromDisplayDelta(t){return Ct(t,this._isImperial)}static get styles(){return[gt,a`
        :host {
          ${yt}
        }
        :host([dark-mode]) {
          ${bt}
        }
        :host {
          ${wt}
          ${vt}
        }
      `]}}t([pt({attribute:!1})],At.prototype,"hass",void 0);const Nt=(t,e,i,r)=>{r=r||{},i=null==i?{}:i;const n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=i,t.dispatchEvent(n),n};const kt=t=>(t.name_by_user||t.name)?.trim(),Pt=t=>{return e=t.entity_id,void 0===(i=t.attributes).friendly_name?(t=>t.slice(t.indexOf(".")+1))(e).replace(/_/g," "):(i.friendly_name??"").toString();var e,i},Dt=[" ",": "," - "],Bt=t=>t.toLowerCase()!==t,Mt=(t,e,i)=>{const r=e[t.entity_id];return r?Ot(r,i):Pt(t)},Ot=(t,e)=>{const i=t.name||("original_name"in t&&null!=t.original_name?String(t.original_name):void 0),r=t.device_id?e[t.device_id]:void 0;if(!r)return i;const n=kt(r);return n!==i?n&&i&&((t,e)=>{const i=t.toLowerCase(),r=e.toLowerCase();for(const e of Dt){const n=`${r}${e}`;if(i.startsWith(n)){const e=t.substring(n.length);if(e.length)return Bt(e.substring(0,e.indexOf(" ")))?e:e[0].toUpperCase()+e.slice(1)}}})(i,n)||i:void 0},Lt=(t,e,i,r)=>{const{entities:n,devices:o,areas:s,floors:a}=i;if("string"==typeof e)return e;if(!e)return Pt(t);let c=null==(l=e)||Array.isArray(l)?l:[l];var l;if(c.every(t=>"text"===t.type))return c.map(t=>"text"in t?t.text:"").join(" ");const h=((t,e,i)=>!Mt(t,e,i))(t,n,o);if(h){const t=c.some(t=>"device"===t.type);t||(c=c.map(t=>"entity"===t.type?{type:"device"}:t))}const u=It(t,c,n,o,s,a);return 1===u.length?u[0]||"":u.filter(t=>t).join(" ")},It=(t,e,i,r,n,o)=>{const{device:s,area:a,floor:c}=((t,e,i,r,n)=>{const o=e[t.entity_id];if(!o)return{entity:null,device:null,area:null,floor:null};const s=e[o.entity_id],a=o.device_id,c=a?i[a]:void 0,l=o.area_id||c?.area_id,h=l?r[l]:void 0,u=h?.floor_id;return{entity:s||null,device:c||null,area:h||null,floor:(u?n[u]:void 0)||null}})(t,i,r,n,o);return e.map(e=>{switch(e.type){case"entity":return Mt(t,i,r);case"device":return s?kt(s):void 0;case"area":return a?(t=>t.name?.trim())(a):void 0;case"floor":return c?(t=>t.name?.trim())(c):void 0;case"text":return e.text;default:return""}})};var Rt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.quote_decimal="quote_decimal",t.space_comma="space_comma",t.none="none"}(Rt||(Rt={}));const Ft=(t,e,i)=>qt(t,e,i).map(t=>t.value).join(""),qt=(t,e,i)=>{const r=e?(t=>{switch(t.number_format){case Rt.comma_decimal:return["en-US","en"];case Rt.decimal_comma:return["de","es","it"];case Rt.space_comma:return["fr","sv","cs"];case Rt.quote_decimal:return["de-CH"];case Rt.system:return;default:return t.language}})(e):void 0;return e?.number_format===Rt.none||Number.isNaN(Number(t))?Number.isNaN(Number(t))||""===t||e?.number_format!==Rt.none?[{type:"literal",value:t}]:new Intl.NumberFormat("en-US",Ut(t,{...i,useGrouping:!1})).formatToParts(Number(t)):new Intl.NumberFormat(r,Ut(t,i)).formatToParts(Number(t))},Ut=(t,e)=>{const i={maximumFractionDigits:2,...e};if("string"!=typeof t)return i;if(!e||void 0===e.minimumFractionDigits&&void 0===e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i},Gt={cooling:"cool",defrosting:"heat",drying:"dry",fan:"fan_only",heating:"heat",idle:"off",off:"off",preheating:"heat"};class zt extends At{_entityState(t){if(t&&this.hass)return this.hass.states[t]}_entityAttr(t,e){return this._entityState(t)?.attributes?.[e]}_resolveEntityNumber(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:r}_resolveEntityTemp(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:this._fromDisplayTemp(r)}_entityExists(t){return!!this._entityState(t)}_formatEntityTemp(t){const e=this._entityState(t);return e?this.hass.formatEntityState(e):"—"}_formatCalcTemp(t){if(null==t||isNaN(t))return"—";const e=this._toDisplayTemp(t),i=this.hass?.config?.unit_system?.temperature??"°C";return`${Ft(e,this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} ${i}`}_openMoreInfo(t){t&&this.hass&&function(t,e,i,r){if(i&&"none"!==i.action)switch(i.action){case"more-info":Nt(t,"hass-more-info",{entityId:r});break;case"navigate":i.navigation_path&&(window.history.pushState(null,"",i.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(i.service){const[t,r]=i.service.split(".",2);e.callService(t,r,i.service_data??{})}break;case"url":i.url_path&&window.open(i.url_path,"_blank");break;case"assist":t.dispatchEvent(new CustomEvent("hass-assist",{bubbles:!0,composed:!0}))}}(this,this.hass,{action:"more-info"},t)}_renderLastUpdated(t){if(!t||!this.hass)return V;const e=this._entityState(t);return e?z`
      <span class="last-updated">
        <ha-relative-time .hass=${this.hass} .datetime=${e.last_updated} capitalize></ha-relative-time>
      </span>
    `:V}getGridOptions(){return{columns:6,rows:2,min_rows:1}}getCardSize(){return 2}}t([mt()],zt.prototype,"_config",void 0);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt=1,Vt=t=>(...e)=>({_$litDirective$:t,values:e});let Wt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt="important",Xt=" !"+Kt,Yt=Vt(class extends Wt{constructor(t){if(super(t),t.type!==jt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return null==r?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const r=e[t];if(null!=r){this.ft.add(t);const e="string"==typeof r&&r.endsWith(Xt);t.includes("-")||e?i.setProperty(t,e?r.slice(0,-11):r,e?Kt:""):i[t]=r}}return j}}),Zt={heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",idle:"mdi:clock-outline",off:null,fan:"mdi:fan",defrosting:"mdi:snowflake-melt",preheating:"mdi:fire"};function Jt(t){return Zt[t??"off"]??null}function Qt(t){switch(t){case"heating":case"heat":return"heating";case"cooling":case"cool":return"cooling";case"drying":case"dry":return"drying";case"fan":case"fan_only":return"fan";case"defrosting":return"defrosting";case"preheating":return"preheating";case"off":return"off";default:return"idle"}}function te(t){const e=Gt[t]??"off";return`var(--rgb-state-climate-${"heat_cool"===e?"heat-cool":e})`}const ee=new Set(["heating","cooling","drying","defrosting","preheating"]);function ie(t,e){const i=te(e),r=i.match(/var\((--[^)]+)\)/);if(!r)return i;const n=getComputedStyle(t).getPropertyValue(r[1]).trim();return n?`rgb(${n})`:i}function re(t,e){return!!t.rate_limiting_entity&&"on"===e(t.rate_limiting_entity)?.state}function ne(t){return t.pid_output_entity??t.curve_output_entity}function oe(t,e){if(!re(t,e))return null;const i=ne(t);if(!i)return null;const r=e(t.flow_entity),n=e(i);if(!r||!n)return null;const o=parseFloat(r.state),s=parseFloat(n.state);return isNaN(o)||isNaN(s)?null:o<s?"rising":o>s?"falling":null}function se(t,e){const i=e&&e.cache?e.cache:pe,r=e&&e.serializer?e.serializer:ue;return(e&&e.strategy?e.strategy:he)(t,{cache:i,serializer:r})}function ae(t,e,i,r){const n=null==(o=r)||"number"==typeof o||"boolean"==typeof o?r:i(r);var o;let s=e.get(n);return void 0===s&&(s=t.call(this,r),e.set(n,s)),s}function ce(t,e,i){const r=Array.prototype.slice.call(arguments,3),n=i(r);let o=e.get(n);return void 0===o&&(o=t.apply(this,r),e.set(n,o)),o}function le(t,e,i,r,n){return i.bind(e,t,r,n)}function he(t,e){return le(t,this,1===t.length?ae:ce,e.cache.create(),e.serializer)}const ue=function(){return JSON.stringify(arguments)};class de{cache;constructor(){this.cache=Object.create(null)}get(t){return this.cache[t]}set(t,e){this.cache[t]=e}}const pe={create:function(){return new de}},me={variadic:function(t,e){return le(t,this,ce,e.cache.create(),e.serializer)}},_e=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function fe(t){const e={};return t.replace(_e,t=>{const i=t.length;switch(t[0]){case"G":e.era=4===i?"long":5===i?"narrow":"short";break;case"y":e.year=2===i?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":e.month=["numeric","2-digit","short","long","narrow"][i-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":e.day=["numeric","2-digit"][i-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":e.weekday=4===i?"long":5===i?"narrow":"short";break;case"e":if(i<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"c":if(i<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"a":e.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":e.hourCycle="h12",e.hour=["numeric","2-digit"][i-1];break;case"H":e.hourCycle="h23",e.hour=["numeric","2-digit"][i-1];break;case"K":e.hourCycle="h11",e.hour=["numeric","2-digit"][i-1];break;case"k":e.hourCycle="h24",e.hour=["numeric","2-digit"][i-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":e.minute=["numeric","2-digit"][i-1];break;case"s":e.second=["numeric","2-digit"][i-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":e.timeZoneName=i<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),e}const ge=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function ye(t){return t.replace(/^(.*?)-/,"")}const be=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,ve=/^(@+)?(\+|#+)?[rs]?$/g,we=/(\*)(0+)|(#+)(0+)|(0+)/g,xe=/^(0+)$/;function $e(t){const e={};return"r"===t[t.length-1]?e.roundingPriority="morePrecision":"s"===t[t.length-1]&&(e.roundingPriority="lessPrecision"),t.replace(ve,function(t,i,r){return"string"!=typeof r?(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length):"+"===r?e.minimumSignificantDigits=i.length:"#"===i[0]?e.maximumSignificantDigits=i.length:(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length+("string"==typeof r?r.length:0)),""}),e}function Ee(t){switch(t){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function Se(t){let e;if("E"===t[0]&&"E"===t[1]?(e={notation:"engineering"},t=t.slice(2)):"E"===t[0]&&(e={notation:"scientific"},t=t.slice(1)),e){const i=t.slice(0,2);if("+!"===i?(e.signDisplay="always",t=t.slice(2)):"+?"===i&&(e.signDisplay="exceptZero",t=t.slice(2)),!xe.test(t))throw new Error("Malformed concise eng/scientific notation");e.minimumIntegerDigits=t.length}return e}function Te(t){const e=Ee(t);return e||{}}function Ce(t){let e={};for(const i of t){switch(i.stem){case"percent":case"%":e.style="percent";continue;case"%x100":e.style="percent",e.scale=100;continue;case"currency":e.style="currency",e.currency=i.options[0];continue;case"group-off":case",_":e.useGrouping=!1;continue;case"precision-integer":case".":e.maximumFractionDigits=0;continue;case"measure-unit":case"unit":e.style="unit",e.unit=ye(i.options[0]);continue;case"compact-short":case"K":e.notation="compact",e.compactDisplay="short";continue;case"compact-long":case"KK":e.notation="compact",e.compactDisplay="long";continue;case"scientific":e={...e,notation:"scientific",...i.options.reduce((t,e)=>({...t,...Te(e)}),{})};continue;case"engineering":e={...e,notation:"engineering",...i.options.reduce((t,e)=>({...t,...Te(e)}),{})};continue;case"notation-simple":e.notation="standard";continue;case"unit-width-narrow":e.currencyDisplay="narrowSymbol",e.unitDisplay="narrow";continue;case"unit-width-short":e.currencyDisplay="code",e.unitDisplay="short";continue;case"unit-width-full-name":e.currencyDisplay="name",e.unitDisplay="long";continue;case"unit-width-iso-code":e.currencyDisplay="symbol";continue;case"scale":e.scale=parseFloat(i.options[0]);continue;case"rounding-mode-floor":e.roundingMode="floor";continue;case"rounding-mode-ceiling":e.roundingMode="ceil";continue;case"rounding-mode-down":e.roundingMode="trunc";continue;case"rounding-mode-up":e.roundingMode="expand";continue;case"rounding-mode-half-even":e.roundingMode="halfEven";continue;case"rounding-mode-half-down":e.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":e.roundingMode="halfExpand";continue;case"integer-width":if(i.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");i.options[0].replace(we,function(t,i,r,n,o,s){if(i)e.minimumIntegerDigits=r.length;else{if(n&&o)throw new Error("We currently do not support maximum integer digits");if(s)throw new Error("We currently do not support exact integer digits")}return""});continue}if(xe.test(i.stem)){e.minimumIntegerDigits=i.stem.length;continue}if(be.test(i.stem)){if(i.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");i.stem.replace(be,function(t,i,r,n,o,s){return"*"===r?e.minimumFractionDigits=i.length:n&&"#"===n[0]?e.maximumFractionDigits=n.length:o&&s?(e.minimumFractionDigits=o.length,e.maximumFractionDigits=o.length+s.length):(e.minimumFractionDigits=i.length,e.maximumFractionDigits=i.length),""});const t=i.options[0];"w"===t?e={...e,trailingZeroDisplay:"stripIfInteger"}:t&&(e={...e,...$e(t)});continue}if(ve.test(i.stem)){e={...e,...$e(i.stem)};continue}const t=Ee(i.stem);t&&(e={...e,...t});const r=Se(i.stem);r&&(e={...e,...r})}return e}let He=function(t){return t[t.literal=0]="literal",t[t.argument=1]="argument",t[t.number=2]="number",t[t.date=3]="date",t[t.time=4]="time",t[t.select=5]="select",t[t.plural=6]="plural",t[t.pound=7]="pound",t[t.tag=8]="tag",t}({}),Ae=function(t){return t[t.number=0]="number",t[t.dateTime=1]="dateTime",t}({});function Ne(t){return t.type===He.literal}function ke(t){return t.type===He.argument}function Pe(t){return t.type===He.number}function De(t){return t.type===He.date}function Be(t){return t.type===He.time}function Me(t){return t.type===He.select}function Oe(t){return t.type===He.plural}function Le(t){return t.type===He.pound}function Ie(t){return t.type===He.tag}function Re(t){return!(!t||"object"!=typeof t||t.type!==Ae.number)}function Fe(t){return!(!t||"object"!=typeof t||t.type!==Ae.dateTime)}let qe=function(t){return t[t.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",t[t.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",t[t.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",t[t.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",t[t.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",t[t.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",t[t.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",t[t.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",t[t.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",t[t.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",t[t.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",t[t.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",t[t.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",t[t.INVALID_TAG=23]="INVALID_TAG",t[t.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",t[t.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",t[t.UNCLOSED_TAG=27]="UNCLOSED_TAG",t}({});const Ue=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,Ge={"001":["H","h"],419:["h","H","hB","hb"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["h","H","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["h","H","hB","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["h","H","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["h","H","hB","hb"],CU:["h","H","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["h","H","hB","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GS:["H","h","hb","hB"],GT:["h","H","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["h","H","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["h","H","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["h","H","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["h","H","hB","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["h","H","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["h","H","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["h","H","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"en-HK":["h","hb","H","hB"],"en-IL":["H","h","hb","hB"],"en-MY":["h","hb","H","hB"],"es-BR":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ku-SY":["H","hB"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function ze(t){let e=t.hourCycle;if(void 0===e&&t.hourCycles&&t.hourCycles.length&&(e=t.hourCycles[0]),e)switch(e){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}const i=t.language;let r;"root"!==i&&(r=t.maximize().region);return(Ge[r||""]||Ge[i||""]||Ge[`${i}-001`]||Ge["001"])[0]}const je=new RegExp(`^${Ue.source}*`),Ve=new RegExp(`${Ue.source}*$`);function We(t,e){return{start:t,end:e}}const Ke=!!Object.fromEntries,Xe=!!String.prototype.trimStart,Ye=!!String.prototype.trimEnd,Ze=Ke?Object.fromEntries:function(t){const e={};for(const[i,r]of t)e[i]=r;return e},Je=Xe?function(t){return t.trimStart()}:function(t){return t.replace(je,"")},Qe=Ye?function(t){return t.trimEnd()}:function(t){return t.replace(Ve,"")},ti=new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");class ei{message;position;locale;ignoreTag;requiresOtherClause;shouldParseSkeletons;constructor(t,e={}){this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!e.ignoreTag,this.locale=e.locale,this.requiresOtherClause=!!e.requiresOtherClause,this.shouldParseSkeletons=!!e.shouldParseSkeletons}parse(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)}parseMessage(t,e,i){let r=[];for(;!this.isEOF();){const n=this.char();if(123===n){const e=this.parseArgument(t,i);if(e.err)return e;r.push(e.val)}else{if(125===n&&t>0)break;if(35!==n||"plural"!==e&&"selectordinal"!==e){if(60===n&&!this.ignoreTag&&47===this.peek()){if(i)break;return this.error(qe.UNMATCHED_CLOSING_TAG,We(this.clonePosition(),this.clonePosition()))}if(60===n&&!this.ignoreTag&&ii(this.peek()||0)){const i=this.parseTag(t,e);if(i.err)return i;r.push(i.val)}else{const i=this.parseLiteral(t,e);if(i.err)return i;r.push(i.val)}}else{const t=this.clonePosition();this.bump(),r.push({type:He.pound,location:We(t,this.clonePosition())})}}}return{val:r,err:null}}parseTag(t,e){const i=this.clonePosition();this.bump();const r=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:He.literal,value:`<${r}/>`,location:We(i,this.clonePosition())},err:null};if(this.bumpIf(">")){const n=this.parseMessage(t+1,e,!0);if(n.err)return n;const o=n.val,s=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!ii(this.char()))return this.error(qe.INVALID_TAG,We(s,this.clonePosition()));const t=this.clonePosition();return r!==this.parseTagName()?this.error(qe.UNMATCHED_CLOSING_TAG,We(t,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:He.tag,value:r,children:o,location:We(i,this.clonePosition())},err:null}:this.error(qe.INVALID_TAG,We(s,this.clonePosition())))}return this.error(qe.UNCLOSED_TAG,We(i,this.clonePosition()))}return this.error(qe.INVALID_TAG,We(i,this.clonePosition()))}parseTagName(){const t=this.offset();for(this.bump();!this.isEOF()&&ri(this.char());)this.bump();return this.message.slice(t,this.offset())}parseLiteral(t,e){const i=this.clonePosition();let r="";for(;;){const i=this.tryParseQuote(e);if(i){r+=i;continue}const n=this.tryParseUnquoted(t,e);if(n){r+=n;continue}const o=this.tryParseLeftAngleBracket();if(!o)break;r+=o}const n=We(i,this.clonePosition());return{val:{type:He.literal,value:r,location:n},err:null}}tryParseLeftAngleBracket(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(ii(t=this.peek()||0)||47===t)?null:(this.bump(),"<");var t}tryParseQuote(t){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===t||"selectordinal"===t)break;return null;default:return null}this.bump();const e=[this.char()];for(this.bump();!this.isEOF();){const t=this.char();if(39===t){if(39!==this.peek()){this.bump();break}e.push(39),this.bump()}else e.push(t);this.bump()}return String.fromCodePoint(...e)}tryParseUnquoted(t,e){if(this.isEOF())return null;const i=this.char();return 60===i||123===i||35===i&&("plural"===e||"selectordinal"===e)||125===i&&t>0?null:(this.bump(),String.fromCodePoint(i))}parseArgument(t,e){const i=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(qe.EXPECT_ARGUMENT_CLOSING_BRACE,We(i,this.clonePosition()));if(125===this.char())return this.bump(),this.error(qe.EMPTY_ARGUMENT,We(i,this.clonePosition()));let r=this.parseIdentifierIfPossible().value;if(!r)return this.error(qe.MALFORMED_ARGUMENT,We(i,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(qe.EXPECT_ARGUMENT_CLOSING_BRACE,We(i,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:He.argument,value:r,location:We(i,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(qe.EXPECT_ARGUMENT_CLOSING_BRACE,We(i,this.clonePosition())):this.parseArgumentOptions(t,e,r,i);default:return this.error(qe.MALFORMED_ARGUMENT,We(i,this.clonePosition()))}}parseIdentifierIfPossible(){const t=this.clonePosition(),e=this.offset(),i=function(t,e){return ti.lastIndex=e,ti.exec(t)[1]??""}(this.message,e),r=e+i.length;this.bumpTo(r);return{value:i,location:We(t,this.clonePosition())}}parseArgumentOptions(t,e,i,r){let n=this.clonePosition(),o=this.parseIdentifierIfPossible().value,s=this.clonePosition();switch(o){case"":return this.error(qe.EXPECT_ARGUMENT_TYPE,We(n,s));case"number":case"date":case"time":{this.bumpSpace();let t=null;if(this.bumpIf(",")){this.bumpSpace();const e=this.clonePosition(),i=this.parseSimpleArgStyleIfPossible();if(i.err)return i;const r=Qe(i.val);if(0===r.length)return this.error(qe.EXPECT_ARGUMENT_STYLE,We(this.clonePosition(),this.clonePosition()));t={style:r,styleLocation:We(e,this.clonePosition())}}const e=this.tryParseArgumentClose(r);if(e.err)return e;const n=We(r,this.clonePosition());if(t&&t.style.startsWith("::")){let e=Je(t.style.slice(2));if("number"===o){const r=this.parseNumberSkeletonFromString(e,t.styleLocation);return r.err?r:{val:{type:He.number,value:i,location:n,style:r.val},err:null}}{if(0===e.length)return this.error(qe.EXPECT_DATE_TIME_SKELETON,n);let r=e;this.locale&&(r=function(t,e){let i="";for(let r=0;r<t.length;r++){const n=t.charAt(r);if("j"===n){let o=0;for(;r+1<t.length&&t.charAt(r+1)===n;)o++,r++;let s=1+(1&o),a=o<2?1:3+(o>>1),c="a",l=ze(e);for("H"!=l&&"k"!=l||(a=0);a-- >0;)i+=c;for(;s-- >0;)i=l+i}else i+="J"===n?"H":n}return i}(e,this.locale));const s={type:Ae.dateTime,pattern:r,location:t.styleLocation,parsedOptions:this.shouldParseSkeletons?fe(r):{}};return{val:{type:"date"===o?He.date:He.time,value:i,location:n,style:s},err:null}}}return{val:{type:"number"===o?He.number:"date"===o?He.date:He.time,value:i,location:n,style:t?.style??null},err:null}}case"plural":case"selectordinal":case"select":{const n=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(qe.EXPECT_SELECT_ARGUMENT_OPTIONS,We(n,{...n}));this.bumpSpace();let s=this.parseIdentifierIfPossible(),a=0;if("select"!==o&&"offset"===s.value){if(!this.bumpIf(":"))return this.error(qe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,We(this.clonePosition(),this.clonePosition()));this.bumpSpace();const t=this.tryParseDecimalInteger(qe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,qe.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(t.err)return t;this.bumpSpace(),s=this.parseIdentifierIfPossible(),a=t.val}const c=this.tryParsePluralOrSelectOptions(t,o,e,s);if(c.err)return c;const l=this.tryParseArgumentClose(r);if(l.err)return l;const h=We(r,this.clonePosition());return"select"===o?{val:{type:He.select,value:i,options:Ze(c.val),location:h},err:null}:{val:{type:He.plural,value:i,options:Ze(c.val),offset:a,pluralType:"plural"===o?"cardinal":"ordinal",location:h},err:null}}default:return this.error(qe.INVALID_ARGUMENT_TYPE,We(n,s))}}tryParseArgumentClose(t){return this.isEOF()||125!==this.char()?this.error(qe.EXPECT_ARGUMENT_CLOSING_BRACE,We(t,this.clonePosition())):(this.bump(),{val:!0,err:null})}parseSimpleArgStyleIfPossible(){let t=0;const e=this.clonePosition();for(;!this.isEOF();){switch(this.char()){case 39:{this.bump();let t=this.clonePosition();if(!this.bumpUntil("'"))return this.error(qe.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,We(t,this.clonePosition()));this.bump();break}case 123:t+=1,this.bump();break;case 125:if(!(t>0))return{val:this.message.slice(e.offset,this.offset()),err:null};t-=1;break;default:this.bump()}}return{val:this.message.slice(e.offset,this.offset()),err:null}}parseNumberSkeletonFromString(t,e){let i=[];try{i=function(t){if(0===t.length)throw new Error("Number skeleton cannot be empty");const e=t.split(ge).filter(t=>t.length>0),i=[];for(const t of e){let e=t.split("/");if(0===e.length)throw new Error("Invalid number skeleton");const[r,...n]=e;for(const t of n)if(0===t.length)throw new Error("Invalid number skeleton");i.push({stem:r,options:n})}return i}(t)}catch{return this.error(qe.INVALID_NUMBER_SKELETON,e)}return{val:{type:Ae.number,tokens:i,location:e,parsedOptions:this.shouldParseSkeletons?Ce(i):{}},err:null}}tryParsePluralOrSelectOptions(t,e,i,r){let n=!1;const o=[],s=new Set;let{value:a,location:c}=r;for(;;){if(0===a.length){const t=this.clonePosition();if("select"===e||!this.bumpIf("="))break;{const e=this.tryParseDecimalInteger(qe.EXPECT_PLURAL_ARGUMENT_SELECTOR,qe.INVALID_PLURAL_ARGUMENT_SELECTOR);if(e.err)return e;c=We(t,this.clonePosition()),a=this.message.slice(t.offset,this.offset())}}if(s.has(a))return this.error("select"===e?qe.DUPLICATE_SELECT_ARGUMENT_SELECTOR:qe.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,c);"other"===a&&(n=!0),this.bumpSpace();const r=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===e?qe.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:qe.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,We(this.clonePosition(),this.clonePosition()));const l=this.parseMessage(t+1,e,i);if(l.err)return l;const h=this.tryParseArgumentClose(r);if(h.err)return h;o.push([a,{value:l.val,location:We(r,this.clonePosition())}]),s.add(a),this.bumpSpace(),({value:a,location:c}=this.parseIdentifierIfPossible())}return 0===o.length?this.error("select"===e?qe.EXPECT_SELECT_ARGUMENT_SELECTOR:qe.EXPECT_PLURAL_ARGUMENT_SELECTOR,We(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!n?this.error(qe.MISSING_OTHER_CLAUSE,We(this.clonePosition(),this.clonePosition())):{val:o,err:null}}tryParseDecimalInteger(t,e){let i=1;const r=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(i=-1);let n=!1,o=0;for(;!this.isEOF();){const t=this.char();if(!(t>=48&&t<=57))break;n=!0,o=10*o+(t-48),this.bump()}const s=We(r,this.clonePosition());return n?(o*=i,Number.isSafeInteger(o)?{val:o,err:null}:this.error(e,s)):this.error(t,s)}offset(){return this.position.offset}isEOF(){return this.offset()===this.message.length}clonePosition(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}}char(){const t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");const e=this.message.codePointAt(t);if(void 0===e)throw Error(`Offset ${t} is at invalid UTF-16 code unit boundary`);return e}error(t,e){return{val:null,err:{kind:t,message:this.message,location:e}}}bump(){if(this.isEOF())return;const t=this.char();10===t?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}bumpIf(t){if(this.message.startsWith(t,this.offset())){for(let e=0;e<t.length;e++)this.bump();return!0}return!1}bumpUntil(t){const e=this.offset(),i=this.message.indexOf(t,e);return i>=0?(this.bumpTo(i),!0):(this.bumpTo(this.message.length),!1)}bumpTo(t){if(this.offset()>t)throw Error(`targetOffset ${t} must be greater than or equal to the current offset ${this.offset()}`);for(t=Math.min(t,this.message.length);;){const e=this.offset();if(e===t)break;if(e>t)throw Error(`targetOffset ${t} is at invalid UTF-16 code unit boundary`);if(this.bump(),this.isEOF())break}}bumpSpace(){for(;!this.isEOF()&&ni(this.char());)this.bump()}peek(){if(this.isEOF())return null;const t=this.char(),e=this.offset();return this.message.charCodeAt(e+(t>=65536?2:1))??null}}function ii(t){return t>=97&&t<=122||t>=65&&t<=90}function ri(t){return 45===t||46===t||t>=48&&t<=57||95===t||t>=97&&t<=122||t>=65&&t<=90||183==t||t>=192&&t<=214||t>=216&&t<=246||t>=248&&t<=893||t>=895&&t<=8191||t>=8204&&t<=8205||t>=8255&&t<=8256||t>=8304&&t<=8591||t>=11264&&t<=12271||t>=12289&&t<=55295||t>=63744&&t<=64975||t>=65008&&t<=65533||t>=65536&&t<=983039}function ni(t){return t>=9&&t<=13||32===t||133===t||t>=8206&&t<=8207||8232===t||8233===t}function oi(t){t.forEach(t=>{if(delete t.location,Me(t)||Oe(t))for(const e in t.options)delete t.options[e].location,oi(t.options[e].value);else Pe(t)&&Re(t.style)||(De(t)||Be(t))&&Fe(t.style)?delete t.style.location:Ie(t)&&oi(t.children)})}function si(t,e={}){e={shouldParseSkeletons:!0,requiresOtherClause:!0,...e};const i=new ei(t,e).parse();if(i.err){const t=SyntaxError(qe[i.err.kind]);throw t.location=i.err.location,t.originalMessage=i.err.message,t}return e?.captureLocation||oi(i.val),i.val}let ai=function(t){return t.MISSING_VALUE="MISSING_VALUE",t.INVALID_VALUE="INVALID_VALUE",t.MISSING_INTL_API="MISSING_INTL_API",t}({});class ci extends Error{code;originalMessage;constructor(t,e,i){super(t),this.code=e,this.originalMessage=i}toString(){return`[formatjs Error: ${this.code}] ${this.message}`}}class li extends ci{constructor(t,e,i,r){super(`Invalid values for "${t}": "${e}". Options are "${Object.keys(i).join('", "')}"`,ai.INVALID_VALUE,r)}}class hi extends ci{constructor(t,e,i){super(`Value for "${t}" must be of type ${e}`,ai.INVALID_VALUE,i)}}class ui extends ci{constructor(t,e){super(`The intl string context variable "${t}" was not provided to the string "${e}"`,ai.MISSING_VALUE,e)}}let di=function(t){return t[t.literal=0]="literal",t[t.object=1]="object",t}({});function pi(t){return"function"==typeof t}function mi(t,e,i,r,n,o,s){if(1===t.length&&Ne(t[0]))return[{type:di.literal,value:t[0].value}];const a=[];for(const c of t){if(Ne(c)){a.push({type:di.literal,value:c.value});continue}if(Le(c)){"number"==typeof o&&a.push({type:di.literal,value:i.getNumberFormat(e).format(o)});continue}const{value:t}=c;if(!n||!(t in n))throw new ui(t,s);let l=n[t];if(ke(c))l&&"string"!=typeof l&&"number"!=typeof l&&"bigint"!=typeof l||(l="string"==typeof l||"number"==typeof l||"bigint"==typeof l?String(l):""),a.push({type:"string"==typeof l?di.literal:di.object,value:l});else{if(De(c)){const t="string"==typeof c.style?r.date[c.style]:Fe(c.style)?c.style.parsedOptions:void 0;a.push({type:di.literal,value:i.getDateTimeFormat(e,t).format(l)});continue}if(Be(c)){const t="string"==typeof c.style?r.time[c.style]:Fe(c.style)?c.style.parsedOptions:r.time.medium;a.push({type:di.literal,value:i.getDateTimeFormat(e,t).format(l)});continue}if(Pe(c)){const t="string"==typeof c.style?r.number[c.style]:Re(c.style)?c.style.parsedOptions:void 0;if(t&&t.scale){const e=t.scale||1;if("bigint"==typeof l){if(!Number.isInteger(e))throw new TypeError(`Cannot apply fractional scale ${e} to bigint value. Scale must be an integer when formatting bigint.`);l*=BigInt(e)}else l*=e}a.push({type:di.literal,value:i.getNumberFormat(e,t).format(l)});continue}if(Ie(c)){const{children:t,value:l}=c,h=n[l];if(!pi(h))throw new hi(l,"function",s);let u=h(mi(t,e,i,r,n,o).map(t=>t.value));Array.isArray(u)||(u=[u]),a.push(...u.map(t=>({type:"string"==typeof t?di.literal:di.object,value:t})))}if(Me(c)){const t=l,o=(Object.prototype.hasOwnProperty.call(c.options,t)?c.options[t]:void 0)||c.options.other;if(!o)throw new li(c.value,l,Object.keys(c.options),s);a.push(...mi(o.value,e,i,r,n));continue}if(Oe(c)){const t=`=${l}`;let o=Object.prototype.hasOwnProperty.call(c.options,t)?c.options[t]:void 0;if(!o){if(!Intl.PluralRules)throw new ci('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',ai.MISSING_INTL_API,s);const t="bigint"==typeof l?Number(l):l,r=i.getPluralRules(e,{type:c.pluralType}).select(t-(c.offset||0));o=(Object.prototype.hasOwnProperty.call(c.options,r)?c.options[r]:void 0)||c.options.other}if(!o)throw new li(c.value,l,Object.keys(c.options),s);const h="bigint"==typeof l?Number(l):l;a.push(...mi(o.value,e,i,r,n,h-(c.offset||0)));continue}}}return(c=a).length<2?c:c.reduce((t,e)=>{const i=t[t.length-1];return i&&i.type===di.literal&&e.type===di.literal?i.value+=e.value:t.push(e),t},[]);var c}function _i(t,e){return e?Object.keys(t).reduce((i,r)=>{var n,o;return i[r]=(n=t[r],(o=e[r])?{...n,...o,...Object.keys(n).reduce((t,e)=>(t[e]={...n[e],...o[e]},t),{})}:n),i},{...t}):t}function fi(t){return{create:()=>({get:e=>t[e],set(e,i){t[e]=i}})}}class gi{ast;locales;resolvedLocale;formatters;formats;message;formatterCache={number:{},dateTime:{},pluralRules:{}};constructor(t,e=gi.defaultLocale,i,r){if(this.locales=e,this.resolvedLocale=gi.resolveLocale(e),"string"==typeof t){if(this.message=t,!gi.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");const{...e}=r||{};this.ast=gi.__parse(t,{...e,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=_i(gi.formats,i),this.formatters=r&&r.formatters||function(t={number:{},dateTime:{},pluralRules:{}}){return{getNumberFormat:se((...t)=>new Intl.NumberFormat(...t),{cache:fi(t.number),strategy:me.variadic}),getDateTimeFormat:se((...t)=>new Intl.DateTimeFormat(...t),{cache:fi(t.dateTime),strategy:me.variadic}),getPluralRules:se((...t)=>new Intl.PluralRules(...t),{cache:fi(t.pluralRules),strategy:me.variadic})}}(this.formatterCache)}format=t=>{const e=this.formatToParts(t);if(1===e.length)return e[0].value;const i=e.reduce((t,e)=>(t.length&&e.type===di.literal&&"string"==typeof t[t.length-1]?t[t.length-1]+=e.value:t.push(e.value),t),[]);return i.length<=1?i[0]||"":i};formatToParts=t=>mi(this.ast,this.locales,this.formatters,this.formats,t,void 0,this.message);resolvedOptions=()=>({locale:this.resolvedLocale?.toString()||Intl.NumberFormat.supportedLocalesOf(this.locales)[0]});getAst=()=>this.ast;static memoizedDefaultLocale=null;static get defaultLocale(){return gi.memoizedDefaultLocale||(gi.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),gi.memoizedDefaultLocale}static resolveLocale=t=>{if(void 0===Intl.Locale)return;const e=Intl.NumberFormat.supportedLocalesOf(t);return e.length>0?new Intl.Locale(e[0]):new Intl.Locale("string"==typeof t?t:t[0])};static __parse=si;static formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}}}var yi={outdoor:"Outdoor",flow:"Flow",room:"Room",adjusting:"Adjusting",heating:"Heating",cooling:"Cooling",drying:"Drying",idle:"Idle",off:"Off",fan:"Fan",defrosting:"Defrosting",preheating:"Preheating",not_found:"{entity} not found",wwsd:"Standby",wwsd_label:"Outdoor temperature meets room setpoint",manual:"Manual",manual_override:"Manual override"},bi={name:"Equitherm Status Card",description:"Display heating status with temperature readings",default_title:"Heating Status"},vi={name:"Equitherm Curve Card",description:"Interactive heating curve visualization",default_title:"Heating Curve",flow_temp:"Flow Temp",outdoor_axis_suffix:"outdoor",flow_axis_suffix:"flow"},wi={default_title:"Curve Tuning",current:"Current",proposed:"Proposed",apply:"Apply",applying:"Applying...",applied:"Applied",reset:"Reset",outdoor_axis_suffix:"outdoor",flow_axis_suffix:"flow",edit:"Edit",hc_short:"HC",shift_short:"Shift",tune:"Tune"},xi={name:"Equitherm Forecast Card",description:"Heating forecast based on weather predictions",default_title:"Heating Forecast",flow_temp:"Flow Temp",outdoor_temp:"Outdoor",peak:"Peak"},$i={required:"Required",optional:"Optional",appearance:"Appearance",climate_entity:"Climate Entity",outdoor_entity:"Outdoor Temperature",flow_entity:"Flow Setpoint",curve_output_entity:"Curve Output",pid_output_entity:"PID Output",rate_limiting_entity:"Rate Limiting",pid_active_entity:"PID Active",title:"Title (optional)",name:"Name",entities:"Entities",curve_parameters:"Curve Parameters",display_range:"Display Range",curve_from_entities:"Live parameters from device",hc_entity:"Heat Curve Entity",n_entity:"Exponent Entity",shift_entity:"Shift Entity",hc:"Heat Curve (hc)",n:"Exponent (n)",shift:"Shift",min_flow:"Min Flow",max_flow:"Max Flow",min_flow_entity:"Min Flow Entity",max_flow_entity:"Max Flow Entity",t_out_min:"Min Outdoor",t_out_max:"Max Outdoor",weather_entity:"Weather Entity",hours:"Hours",forecast_settings:"Forecast",recalculate_service:"Recalculate Service",tunable:"Enable Tuning",tuning:"Tuning",advanced:"Advanced",show_last_updated:"Show last updated",show_kpi_footer:"Show temperatures",show_params_footer:"Show curve parameters",pid_correction_entity:"PID Correction",pid_proportional_entity:"PID Proportional",pid_integral_entity:"PID Integral",pid_derivative_entity:"PID Derivative",boiler_temp_entity:"Boiler Flow Temperature",return_temp_entity:"Return Temperature",flame_entity:"Flame Status",setpoint_entity:"Flow Setpoint",modulation_entity:"Modulation Level",max_modulation_entity:"Max Modulation Entity",ch_active_entity:"Central Heating Active",dhw_active_entity:"DHW Active",dhw_enable_entity:"DHW Enable",dhw_setpoint_entity:"DHW Setpoint",dhw_temp_entity:"DHW Temperature",condensing_threshold:"Condensing Threshold",display:"Display",helper:{curve_from_entities:"Read from ESPHome runtime-tunable numbers instead of static values",hc:"How aggressively heating responds to cold — increase if room is too cold in winter",n:"Radiator type — 1.0 underfloor, 1.25 panel (default), 1.3 cast iron",shift:"Move the whole curve up or down — increase if too cold in mild weather",min_flow:"Minimum boiler output, prevents condensation and protects heat exchanger",max_flow:"Maximum boiler output, protects system and limits energy use",t_out_min:"Left edge of chart (coldest outdoor temperature displayed)",t_out_max:"Right edge of chart (warmest outdoor temperature displayed)",hours:"Number of hours of data to display",hc_entity:"Runtime-adjustable heat curve coefficient number",n_entity:"Runtime-adjustable radiator exponent number",shift_entity:"Runtime-adjustable curve shift number",curve_output_entity:"Pure heating curve output before PID and rate limiting",pid_output_entity:"Curve output after PID correction (before rate limiting)",rate_limiting_entity:"ON when output is ramping to prevent thermal shock",pid_active_entity:"ON when at least one PID gain (kp, ki, kd) is non-zero",outdoor_entity:"Overrides the weather entity's current temperature for footer display",min_flow_entity:"Runtime-adjustable minimum flow temperature number",max_flow_entity:"Runtime-adjustable maximum flow temperature number",recalculate_service:"Service to call after applying a value, e.g. climate.equitherm_force_recalculate. Only called if the service exists.",tunable:"Show tuning controls to adjust hc and shift values interactively",show_last_updated:"Display when sensor data was last received",show_kpi_footer:"Display outdoor, flow, and room temperature readings",show_params_footer:"Display HC, n, and Shift curve parameters",pid_correction_entity:"Total PID correction applied to the curve output",pid_proportional_entity:"Proportional term output (response to current error)",pid_integral_entity:"Integral term output (response to accumulated error)",pid_derivative_entity:"Derivative term output (response to error rate of change)",boiler_temp_entity:"Boiler flow (supply) water temperature sensor",return_temp_entity:"Return water temperature sensor",flame_entity:"Binary sensor indicating boiler flame is on",setpoint_entity:"Target flow temperature setpoint",modulation_entity:"Current boiler modulation level (%)",ch_active_entity:"Binary sensor indicating central heating is actively running",dhw_active_entity:"Binary sensor indicating domestic hot water is actively heating",dhw_temp_entity:"DHW temperature sensor showing current hot water temperature"}},Ei={status_card:{name:"OpenTherm Status",description:"Boiler status at a glance",default_title:"Boiler",flow:"Flow",return:"Return",modulation:"Modulation",flame:"Flame",ch:"CH",dhw:"DHW"},dhw_card:{name:"OpenTherm DHW",description:"Domestic hot water control",default_title:"Hot Water",enable:"Enable",setpoint:"Setpoint",dhw:"DHW"},efficiency_card:{name:"OpenTherm Efficiency",description:"Boiler condensing efficiency chart",default_title:"Efficiency",temp_axis:"Temperature",condensing:"Condensing",non_condensing:"Non-condensing"},modulation_card:{name:"OpenTherm Modulation",description:"Boiler modulation and short-cycle diagnostics",default_title:"Modulation",current:"Current",max:"Max",cycles_per_hour:"cycles/h"}},Si={common:yi,status_card:bi,curve_card:vi,tuning_dialog:wi,forecast_card:xi,editor:$i,opentherm:Ei},Ti={outdoor:"Extérieur",flow:"Départ",room:"Pièce",adjusting:"Ajustement",heating:"Chauffage",cooling:"Refroidissement",drying:"Déshumidification",idle:"Inactif",off:"Éteint",fan:"Ventilation",defrosting:"Dégivrage",preheating:"Préchauffage",not_found:"{entity} introuvable",wwsd:"Veille",wwsd_label:"Température extérieure ≥ consigne"},Ci={name:"Carte Status Equitherm",description:"Affiche le statut du chauffage avec les températures",default_title:"Statut Chauffage"},Hi={name:"Carte Courbe Equitherm",description:"Visualisation interactive de la courbe de chauffage",default_title:"Courbe de Chauffage",flow_temp:"Temp. Départ",outdoor_axis_suffix:"extérieur",flow_axis_suffix:"départ"},Ai={default_title:"Réglage Courbe",current:"Actuelle",proposed:"Proposée",apply:"Appliquer",applying:"Application...",applied:"Appliqué",reset:"Réinitialiser",outdoor_axis_suffix:"extérieur",flow_axis_suffix:"départ",edit:"Régler",hc_short:"HC",shift_short:"Décalage",tune:"Régler"},Ni={name:"Carte Prévision Equitherm",description:"Prévision de chauffage basée sur les prévisions météo",default_title:"Prévision Chauffage",flow_temp:"Temp. Départ",outdoor_temp:"Extérieur",peak:"Pic"},ki={required:"Requis",optional:"Optionnel",appearance:"Apparence",climate_entity:"Entité Climat",outdoor_entity:"Température Extérieure",flow_entity:"Consigne Départ",curve_output_entity:"Sortie Courbe",pid_output_entity:"Sortie PID",rate_limiting_entity:"Limitation",pid_active_entity:"PID Actif",title:"Titre (optionnel)",name:"Nom",entities:"Entités",curve_parameters:"Paramètres Courbe",display_range:"Plage d'Affichage",curve_from_entities:"Paramètres live depuis l'appareil",hc_entity:"Entité Coeff. Courbe",n_entity:"Entité Exposant",shift_entity:"Entité Décalage",hc:"Coeff. Courbe (hc)",n:"Exposant (n)",shift:"Décalage",min_flow:"Départ Min",max_flow:"Départ Max",min_flow_entity:"Entité Départ Min",max_flow_entity:"Entité Départ Max",t_out_min:"Extérieur Min",t_out_max:"Extérieur Max",weather_entity:"Entité Météo",hours:"Heures",forecast_settings:"Prévision",recalculate_service:"Service de Recalcul",tunable:"Activer le Réglage",tuning:"Réglage",advanced:"Avancé",show_last_updated:"Afficher dernière mise à jour",show_kpi_footer:"Afficher les températures",show_params_footer:"Afficher les paramètres de courbe",pid_correction_entity:"Correction PID",pid_proportional_entity:"PID Proportionnel",pid_integral_entity:"PID Intégral",pid_derivative_entity:"PID Dérivé",boiler_temp_entity:"Température Départ Chaudière",return_temp_entity:"Température Retour",flame_entity:"Statut Flamme",setpoint_entity:"Consigne Départ",modulation_entity:"Niveau Modulation",max_modulation_entity:"Entité modulation max",ch_active_entity:"Chauffage Central Actif",dhw_active_entity:"ECS Actif",dhw_enable_entity:"ECS Activé",dhw_setpoint_entity:"Consigne ECS",dhw_temp_entity:"Température ECS",condensing_threshold:"Seuil de Condensation",display:"Affichage",helper:{curve_from_entities:"Lire depuis les nombres ESPHome ajustables au lieu de valeurs statiques",hc:"Agressivité du chauffage par temps froid — augmenter si la pièce est trop froide en hiver",n:"Type de radiateur — 1.0 plancher chauffant, 1.25 panneau (défaut), 1.3 fonte",shift:"Décaler toute la courbe vers le haut ou le bas — augmenter si trop froid par temps doux",min_flow:"Sortie minimale de la chaudière, évite la condensation et protège l'échangeur",max_flow:"Sortie maximale de la chaudière, protège le système et limite la consommation",t_out_min:"Bord gauche du graphique (température extérieure la plus froide affichée)",t_out_max:"Bord droit du graphique (température extérieure la plus chaude affichée)",hours:"Nombre d'heures de données à afficher",hc_entity:"Nombre ajustable du coefficient de courbe de chauffage",n_entity:"Nombre ajustable de l'exposant de radiateur",shift_entity:"Nombre ajustable du décalage de courbe",curve_output_entity:"Sortie pure de la courbe de chauffage avant PID et limitation",pid_output_entity:"Sortie de courbe après correction PID (avant limitation)",rate_limiting_entity:"ON quand la sortie est en rampe pour éviter le choc thermique",pid_active_entity:"ON quand au moins un gain PID (kp, ki, kd) est non nul",outdoor_entity:"Remplace la température actuelle de l'entité météo pour l'affichage",min_flow_entity:"Nombre ajustable de la température de départ minimale",max_flow_entity:"Nombre ajustable de la température de départ maximale",recalculate_service:"Service à appeler après l'application d'une valeur, ex. climate.equitherm_force_recalculate. Appelé uniquement si le service existe.",tunable:"Afficher les commandes de réglage pour ajuster hc et shift interactivement",show_last_updated:"Afficher l'heure de la dernière réception des données du capteur",show_kpi_footer:"Afficher les températures extérieure, départ et pièce",show_params_footer:"Afficher les paramètres HC, n et Shift de la courbe",pid_correction_entity:"Correction totale du PID appliquée à la sortie de courbe",pid_proportional_entity:"Terme proportionnel (réponse à l'erreur actuelle)",pid_integral_entity:"Terme intégral (réponse à l'erreur accumulée)",pid_derivative_entity:"Terme dérivé (réponse à la vitesse de changement de l'erreur)",boiler_temp_entity:"Capteur de température d'eau de départ (supply) chaudière",return_temp_entity:"Capteur de température de retour d'eau",flame_entity:"Capteur binaire indiquant que la flamme chaudière est allumée",setpoint_entity:"Consigne de température de départ cible",modulation_entity:"Niveau actuel de modulation chaudière (%)",ch_active_entity:"Capteur binaire indiquant que le chauffage central fonctionne activement",dhw_active_entity:"Capteur binaire indiquant que l'eau chaude sanitaire chauffe activement",dhw_temp_entity:"Capteur de température ECS affichant la température actuelle de l'eau chaude"}},Pi={status_card:{name:"Statut OpenTherm",description:"Statut chaudière en un coup d'œil",default_title:"Chaudière",flow:"Départ",return:"Retour",modulation:"Modulation",flamme:"Flamme",ch:"CH",dhw:"ECS"},dhw_card:{name:"OpenTherm ECS",description:"Contrôle de l'eau chaude sanitaire",default_title:"Eau Chaude",enable:"Activer",setpoint:"Consigne",dhw:"ECS"},efficiency_card:{name:"Efficacité OpenTherm",description:"Graphique d'efficacité de condensation chaudière",default_title:"Efficacité",temp_axis:"Température",condensing:"Condensation",non_condensing:"Sans condensation"},modulation_card:{name:"Modulation OpenTherm",description:"Diagnostics modulation et court-cycles chaudière",default_title:"Modulation",current:"Actuelle",max:"Max",cycles_per_hour:"cycles/h"}},Di={common:Ti,status_card:Ci,curve_card:Hi,tuning_dialog:Ai,forecast_card:Ni,editor:ki,opentherm:Pi};const Bi={en:Object.freeze({__proto__:null,common:yi,curve_card:vi,default:Si,editor:$i,forecast_card:xi,opentherm:Ei,status_card:bi,tuning_dialog:wi}),fr:Object.freeze({__proto__:null,common:Ti,curve_card:Hi,default:Di,editor:ki,forecast_card:Ni,opentherm:Pi,status_card:Ci,tuning_dialog:Ai})};function Mi(t,e){try{return t.split(".").reduce((t,e)=>t[e],Bi[e])}catch(t){return}}function Oi(t){return function(e,i={}){const r=t?.locale.language??"en";let n=Mi(e,r);if(n||(n=Mi(e,"en")),!n)return e;try{return new gi(n,r).format(i)}catch(t){return console.error(`Error formatting message for key "${e}" with lang "${r}":`,t),n}}}let Li=class extends ct{constructor(){super(...arguments),this.min=0,this.max=100,this.value=null,this.centered=!1,this.indicator=!1,this.minFill=4}_pct(t){return Math.max(0,Math.min(100,(t-this.min)/(this.max-this.min)*100))}render(){if(null===this.value)return z`<div class="track"></div>`;const t=this.color??"var(--eq-bar-fill-color)",e=t;if(this.centered){const i=this._pct(0),r=this._pct(this.value),n=Math.min(i,r),o=Math.abs(r-i);return z`
        <div class="track">
          <div class="center-mark"></div>
          ${o>0?z`
            <div class="fill" style=${Yt({left:`${n}%`,width:`${o}%`,background:t,minWidth:`${this.minFill}px`})}></div>
          `:V}
          ${this.indicator?z`
            <div class="dot" style=${Yt({left:`${r}%`,background:e})}></div>
          `:V}
        </div>
      `}const i=this._pct(this.value);return z`
      <div class="track">
        <div class="fill" style=${Yt({width:`${i}%`,left:"0",background:t})}></div>
        ${this.indicator?z`
          <div class="dot" style=${Yt({left:`${i}%`,background:t})}></div>
        `:V}
      </div>
    `}};Li.styles=a`
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
  `,t([pt({type:Number})],Li.prototype,"min",void 0),t([pt({type:Number})],Li.prototype,"max",void 0),t([pt({type:Number,reflect:!0})],Li.prototype,"value",void 0),t([pt({type:Boolean})],Li.prototype,"centered",void 0),t([pt({type:Boolean})],Li.prototype,"indicator",void 0),t([pt({type:String})],Li.prototype,"color",void 0),t([pt({type:Number})],Li.prototype,"minFill",void 0),Li=t([ht("eq-param-bar")],Li);const Ii=a`
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
`;class Ri extends zt{get _climate(){return this._entityState(this._config.climate_entity)}get _isManualPreset(){return"Manual"===this._climate?.attributes.preset_mode}updated(t){super.updated(t),t.has("hass")&&this.hass&&this.toggleAttribute("manual-override",this._isManualPreset)}get _roomTemp(){const t=this._climate?.attributes.current_temperature;return this._formatCalcTemp(t)}get _outdoorTempFormatted(){return this._formatEntityTemp(this._config.outdoor_entity)}get _flowTempFormatted(){return this._formatEntityTemp(this._config.flow_entity)}get _curveOutputTempFormatted(){const t=ne(this._config);return t?this._formatEntityTemp(t):""}get _isWWSD(){if(!this._config?.climate_entity)return!1;const t=this._climate?.attributes.temperature;if(null==t)return!1;if(!this._config.outdoor_entity)return!1;const e=this._entityState(this._config.outdoor_entity);if(!e)return!1;const i=parseFloat(e.state),r=isNaN(i)?NaN:this._fromDisplayTemp(i);return!isNaN(r)&&r>=t}_wwsdDescription(){const t=Oi(this.hass),e=this._climate?.attributes.temperature,i=this._config.outdoor_entity,r=i?this._entityState(i):void 0,n=r?this._fromDisplayTemp(parseFloat(r.state)):NaN;return isNaN(n)||null==e?t("common.wwsd_label"):`${t("common.outdoor")} ${this._formatEntityTemp(i)} ≥ ${this._formatCalcTemp(e)}`}_renderNotFound(t,e){if(!t||this._entityExists(t))return V;const i=Oi(this.hass);return z`
      <div class="not-found">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${i("common.not_found",{entity:e??t})}</span>
      </div>
    `}_renderHeaderIcon(t,e){const i=te(Qt(this._climate?.attributes.hvac_action??"off"));return z`
      <ha-tile-icon
        .interactive=${!0}
        style=${Yt({"--tile-icon-color":`rgb(${i})`,"--tile-icon-size":"42px"})}
        @click=${()=>this._openMoreInfo(e)}
      >
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderInfo(t,e){const i=void 0!==e?e===V?V:z`<span class="state">${e}</span>`:null!=this._climate?.attributes.temperature?z`<span class="state">· ${this._formatCalcTemp(this._climate.attributes.temperature)}</span>`:V;return z`
      <div class="header-info">
        <span class="title">${t}</span>
        ${i}
      </div>
    `}_renderPidBadge(){const t=this._config;if(!t.pid_active_entity)return V;const e=function(t,e){return!!t.pid_active_entity&&"on"===e(t.pid_active_entity)?.state}(t,t=>this._entityState(t));return z`
      <eq-badge-info
        .label=${"PID"}
        style=${"--badge-info-color: "+(e?"var(--rgb-success)":"var(--rgb-disabled)")}
        .icon=${e?void 0:"mdi:alert-circle-outline"}
      ></eq-badge-info>
    `}_renderWwsdBadge(){if(!this._isWWSD)return V;const t=Oi(this.hass);return z`
      <eq-badge-info
        id="wwsd-badge"
        .label=${t("common.wwsd")}
        style=${"--badge-info-color: var(--rgb-warning, 255, 167, 38)"}
        .icon=${"mdi:weather-sunny-alert"}
        .active=${!0}
      ></eq-badge-info>
      <ha-tooltip for="wwsd-badge" placement="top"><span style="white-space: nowrap">${this._wwsdDescription()}</span></ha-tooltip>
    `}_renderManualBadge(){if(!this._isManualPreset)return V;const t=Oi(this.hass);return z`
      <eq-badge-info
        .label=${t("common.manual")}
        style=${"--badge-info-color: var(--rgb-warning, 255, 167, 38)"}
        .icon=${"mdi:hand-back-right"}
      ></eq-badge-info>
    `}_renderHvacBadge(){const t=Oi(this.hass),e=Qt(this._climate?.attributes.hvac_action??"off"),i=t=>this._entityState(t),r=this._config,n=function(t,e,i=!1,r=null){if(i){const e="rising"===r?"mdi:trending-up":"falling"===r?"mdi:trending-down":"mdi:trending-neutral";return{label:t("common.adjusting"),color:te("heating"),icon:e,active:!0}}return{label:t({heating:"common.heating",cooling:"common.cooling",drying:"common.drying",idle:"common.idle",off:"common.off",fan:"common.fan",defrosting:"common.defrosting",preheating:"common.preheating"}[e]),color:te(e),icon:Jt(e)??void 0,active:ee.has(e)}}(t,e,re(r,i),oe(r,i));return z`
      <eq-badge-info
        .label=${n.label}
        style=${`--badge-info-color: ${n.color}`}
        .icon=${n.icon}
        .active=${n.active}
      ></eq-badge-info>
    `}_renderExtraBadges(){return V}_renderHeaderBadges(){const t=this._isManualPreset;return z`
      <div class="badges">
        ${t?V:this._renderPidBadge()}
        ${t?V:this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderExtraBadges()}
        ${this._renderHvacBadge()}
      </div>
    `}_renderHeader(t){return this._config&&this.hass?z`
      <div class="header">
        ${this._renderHeaderIcon(t.iconName,t.clickEntity)}
        ${this._renderHeaderInfo(t.title,t.subtitle)}
        ${this._renderHeaderBadges()}
      </div>
    `:V}_renderKpiFooter(t){if(!1===this._config.show_kpi_footer)return V;if(!this._config||!this.hass)return V;const e=Oi(this.hass),i=t?.outdoorClickEntity??this._config.outdoor_entity,r=!this._entityExists(i),n=!this._entityExists(this._config.flow_entity),o=!this._entityExists(this._config.climate_entity);return z`
      <div class="kpi-footer">
        <div class="kpi-block${r?" missing":""}" @click=${r?void 0:()=>this._openMoreInfo(i)}>
          <div class="kpi-value">${this._outdoorTempFormatted}</div>
          <div class="kpi-label">${e("common.outdoor")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${n?" missing":""}" @click=${n?void 0:()=>this._openMoreInfo(this._config.flow_entity)}>
          ${t?.adjustingDir&&t?.curveOutput?z`
            <div class="kpi-dual">
              <div class="kpi-value flow">${this._flowTempFormatted}</div>
              <div class="kpi-target">
                <ha-icon .icon=${"rising"===t.adjustingDir?"mdi:arrow-up-thin":"mdi:arrow-down-thin"}></ha-icon>
                ${t.curveOutput}
              </div>
            </div>
          `:z`<div class="kpi-value flow">${this._flowTempFormatted}</div>`}
          <div class="kpi-label">${e("common.flow")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${o?" missing":""}" @click=${o?void 0:()=>this._openMoreInfo(this._config.climate_entity)}>
          <div class="kpi-value">${this._roomTemp}</div>
          <div class="kpi-label">${e("common.room")}</div>
        </div>
      </div>
    `}_getEntityRange(t,e,i){if(!t)return[e,i];return[this._entityAttr(t,"min")??e,this._entityAttr(t,"max")??i]}_formatParamNum(t,e,i){return Ft(t,this.hass?.locale,{minimumFractionDigits:e,maximumFractionDigits:e,...i})}_renderParamsFooter(t){if(!1===this._config.show_params_footer)return V;const e=[];if(t.hc){const i=this._resolveEntityNumber(t.hc.entity,t.hc.fallback),[r,n]=this._getEntityRange(t.hc.entity,.5,3),o=()=>t.hc.onClick?t.hc.onClick():this._openMoreInfo(t.hc.entity);e.push(z`
        <div class="param-item" @click=${o}>
          <span class="param-label">HC</span>
          <span class="param-value">${this._formatParamNum(i,2)}</span>
          <eq-param-bar .min=${r} .max=${n} .value=${i} indicator></eq-param-bar>
        </div>
      `)}if(t.n){const i=this._resolveEntityNumber(t.n.entity,t.n.fallback),[r,n]=this._getEntityRange(t.n.entity,1,2),o=()=>t.n.onClick?t.n.onClick():this._openMoreInfo(t.n.entity);e.push(z`
        <div class="param-item" @click=${o}>
          <span class="param-label">n</span>
          <span class="param-value">${this._formatParamNum(i,2)}</span>
          <eq-param-bar .min=${r} .max=${n} .value=${i} indicator></eq-param-bar>
        </div>
      `)}if(t.shift){const i=this._resolveEntityNumber(t.shift.entity,t.shift.fallback),[r,n]=this._getEntityRange(t.shift.entity,-15,15),o=this._toDisplayDelta(i),s=this._toDisplayDelta(r),a=this._toDisplayDelta(n),c=this._formatParamNum(o,1,{signDisplay:"always"})+(this.hass?.config?.unit_system?.temperature??"°C"),l=o>0?"positive":o<0?"negative":"",h=o>=0?"var(--success-color, #4caf50)":"var(--error-color, #e53935)",u=()=>t.shift.onClick?t.shift.onClick():this._openMoreInfo(t.shift.entity);e.push(z`
        <div class="param-item" @click=${u}>
          <span class="param-label">Shift</span>
          <span class="param-value ${l}">${c}</span>
          <eq-param-bar .min=${s} .max=${a} .value=${o} centered .color=${h} indicator></eq-param-bar>
        </div>
      `)}if(t.pid_correction){const i=this._resolveEntityNumber(t.pid_correction.entity,t.pid_correction.fallback??0),[r,n]=this._getEntityRange(t.pid_correction.entity,-10,10),o=this._toDisplayDelta(i),s=this._toDisplayDelta(r),a=this._toDisplayDelta(n),c=this._formatParamNum(o,1,{signDisplay:"always"})+(this.hass?.config?.unit_system?.temperature??"°C"),l=o>0?"positive":o<0?"negative":"",h=o>=0?"var(--success-color, #4caf50)":"var(--error-color, #e53935)";e.push(z`
        <div class="param-item" @click=${()=>this._openMoreInfo(t.pid_correction.entity)}>
          <span class="param-label">Σ</span>
          <span class="param-value ${l}">${c}</span>
          <eq-param-bar .min=${s} .max=${a} .value=${o} centered .color=${h} indicator></eq-param-bar>
        </div>
      `)}return 0===e.length?V:z`<div class="params-footer">${e}</div>`}}class Fi extends Ri{getGridOptions(){return{columns:12,rows:5,min_rows:5}}getCardSize(){return 3}_updateChartConfig(){this._config&&this.hass&&(this._echartConfig=this._buildEChartOptions())}updated(t){if(super.updated(t),t.has("hass")){const e=t.get("hass");e&&this.hass?.config?.unit_system?.temperature!==e.config?.unit_system?.temperature&&this._updateChartConfig()}}_onChartReconnected(){}_onChartDisconnecting(){}connectedCallback(){super.connectedCallback(),this._config&&this.hass&&this._onChartReconnected()}disconnectedCallback(){this._onChartDisconnecting(),super.disconnectedCallback()}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          hide-reset-button
        ></ha-chart-base>
      </div>
    `}static get styles(){return[super.styles,a`
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
    `]}}t([mt()],Fi.prototype,"_echartConfig",void 0);class qi extends zt{_renderHeaderIcon(t,e){return z`
      <ha-tile-icon .interactive @click=${()=>this._openMoreInfo(e)}>
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderInfo(t,e){const i=void 0!==e&&e!==V?z`<span class="state">${e}</span>`:V;return z`
      <div class="header-info">
        <span class="title">${t}</span>
        ${i}
      </div>
    `}_renderHeaderBadges(){return V}_renderHeader(t){return this._config&&this.hass?z`
      <div class="header">
        ${this._renderHeaderIcon(t.iconName,t.clickEntity)}
        ${this._renderHeaderInfo(t.title,t.subtitle)}
        ${this._renderHeaderBadges()}
      </div>
    `:V}}const Ui=a`
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
    font-size: var(--ha-font-size-xs, 0.68rem);
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .unavailable {
    --main-color: rgb(var(--rgb-warning));
  }
  .not-found {
    --main-color: rgb(var(--rgb-danger));
  }
`,Gi=a`
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
`,zi=a`
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
`;function ji(t){const e=window;e.customCards=e.customCards||[];const i=t.type.replace("-card","").replace("equitherm-","");e.customCards.push({...t,preview:!0,documentationURL:`https://github.com/equitherm/lovelace/blob/main/docs/cards/${i}.md`})}class Vi extends TypeError{constructor(t,e){let i;const{message:r,explanation:n,...o}=t,{path:s}=t,a=0===s.length?r:`At path: ${s.join(".")} -- ${r}`;super(n??a),null!=n&&(this.cause=a),Object.assign(this,o),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function Wi(t){return"object"==typeof t&&null!=t}function Ki(t){return Wi(t)&&!Array.isArray(t)}function Xi(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Yi(t,e,i,r){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:n,branch:o}=e,{type:s}=i,{refinement:a,message:c=`Expected a value of type \`${s}\`${a?` with refinement \`${a}\``:""}, but received: \`${Xi(r)}\``}=t;return{value:r,type:s,refinement:a,key:n[n.length-1],path:n,branch:o,...t,message:c}}function*Zi(t,e,i,r){(function(t){return Wi(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const n of t){const t=Yi(n,e,i,r);t&&(yield t)}}function*Ji(t,e,i={}){const{path:r=[],branch:n=[t],coerce:o=!1,mask:s=!1}=i,a={path:r,branch:n,mask:s};o&&(t=e.coercer(t,a));let c="valid";for(const r of e.validator(t,a))r.explanation=i.message,c="not_valid",yield[r,void 0];for(let[l,h,u]of e.entries(t,a)){const e=Ji(h,u,{path:void 0===l?r:[...r,l],branch:void 0===l?n:[...n,h],coerce:o,mask:s,message:i.message});for(const i of e)i[0]?(c=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):o&&(h=i[1],void 0===l?t=h:t instanceof Map?t.set(l,h):t instanceof Set?t.add(h):Wi(t)&&(void 0!==h||l in t)&&(t[l]=h))}if("not_valid"!==c)for(const r of e.refiner(t,a))r.explanation=i.message,c="not_refined",yield[r,void 0];"valid"===c&&(yield[void 0,t])}class Qi{constructor(t){const{type:e,schema:i,validator:r,refiner:n,coercer:o=t=>t,entries:s=function*(){}}=t;this.type=e,this.schema=i,this.entries=s,this.coercer=o,this.validator=r?(t,e)=>Zi(r(t,e),e,this,t):()=>[],this.refiner=n?(t,e)=>Zi(n(t,e),e,this,t):()=>[]}assert(t,e){return tr(t,this,e)}create(t,e){return function(t,e,i){const r=er(t,e,{coerce:!0,message:i});if(r[0])throw r[0];return r[1]}(t,this,e)}is(t){return function(t,e){const i=er(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const r=er(t,e,{coerce:!0,mask:!0,message:i});if(r[0])throw r[0];return r[1]}(t,this,e)}validate(t,e={}){return er(t,this,e)}}function tr(t,e,i){const r=er(t,e,{message:i});if(r[0])throw r[0]}function er(t,e,i={}){const r=Ji(t,e,i),n=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(r);if(n[0]){const t=new Vi(n[0],function*(){for(const t of r)t[0]&&(yield t[0])});return[t,void 0]}return[void 0,n[1]]}function ir(t,e){return new Qi({type:t,schema:null,validator:e})}function rr(){return ir("any",()=>!0)}function nr(){return ir("boolean",t=>"boolean"==typeof t)}function or(){return ir("number",t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Xi(t)}`)}function sr(t){return new Qi({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function ar(){return ir("string",t=>"string"==typeof t||`Expected a string, but received: ${Xi(t)}`)}function cr(t){const e=Object.keys(t);return new Qi({type:"type",schema:t,*entries(i){if(Wi(i))for(const r of e)yield[r,i[r],t[r]]},validator:t=>Ki(t)||`Expected an object, but received: ${Xi(t)}`,coercer:t=>Ki(t)?{...t}:t})}const lr=cr({type:ar(),climate_entity:ar(),outdoor_entity:ar(),flow_entity:ar(),curve_output_entity:sr(ar()),pid_output_entity:sr(ar()),rate_limiting_entity:sr(ar()),pid_active_entity:sr(ar()),pid_correction_entity:sr(ar()),hc_entity:sr(ar()),shift_entity:sr(ar()),n_entity:sr(ar()),show_last_updated:sr(nr()),show_params_footer:sr(nr()),tunable:sr(nr()),recalculate_service:sr(ar()),name:sr(rr()),title:sr(rr())});function hr(t){return tr(t,lr),t}const ur="equitherm",dr=`${ur}-status-card`,pr=`${dr}-editor`,mr=["climate"],_r=["sensor"],fr=Vt(class extends Wt{constructor(t){if(super(t),t.type!==jt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const r=!!e[t];r===this.st.has(t)||this.nt?.has(t)||(r?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return j}});let gr=class extends ct{constructor(){super(...arguments),this.label="",this.active=!1}static get styles(){return a`
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
    `}render(){const t=this.icon?z`<ha-icon class="icon" icon=${this.icon}></ha-icon>`:V;return z`
      <span class=${fr({badge:!0,active:this.active})}>
        ${t}${this.label}
      </span>
    `}};function yr(t){const{tTarget:e,tOutdoor:i,hc:r,n:n,shift:o,minFlow:s,maxFlow:a}=t,c=s??20,l=a??70;if(isNaN(e)||isNaN(i)||isNaN(r)||isNaN(n)||isNaN(o)||isNaN(c)||isNaN(l))return c;if(n<=0)return c;const h=Math.min(c,l),u=Math.max(c,l),d=e-i;if(d<=0)return Math.round(10*h)/10;const p=e+o+r*Math.pow(d,1/n),m=Math.max(h,Math.min(u,p));return Math.round(10*m)/10}function br(t,e,i){const r=Math.round((i-e)/.1)+1;return Array.from({length:r},(i,r)=>{const n=e+.1*r,o=yr({...t,tOutdoor:n});return{x:n,y:parseFloat(o.toFixed(1))}})}function vr(t,e){return yr({...t,tOutdoor:e})}t([pt()],gr.prototype,"label",void 0),t([pt()],gr.prototype,"icon",void 0),t([pt({type:Boolean})],gr.prototype,"active",void 0),gr=t([ht("eq-badge-info")],gr);let wr=class extends At{constructor(){super(...arguments),this.open=!1,this._proposedHc=.9,this._proposedShift=0,this._applying=!1,this._applySuccess=!1,this._lastHcState=null,this._lastShiftState=null}get _hcChanged(){return Math.abs(this._proposedHc-this._currentHc)>this._hcStep/2}get _shiftChanged(){return Math.abs(this._proposedShift-this._currentShift)>this._shiftStep/2}get _isDirty(){return this._hcChanged||this._shiftChanged}disconnectedCallback(){clearTimeout(this._successTimer),super.disconnectedCallback()}willUpdate(t){if(super.willUpdate(t),t.has("config")&&this.config?(this._lastHcState=null,this._lastShiftState=null,this._syncProposedValues()):(t.has("open")&&this.open||t.has("hass")&&this.hass&&this.config)&&this._syncProposedValues(),this.config&&this.hass&&this.open){(t.has("config")||t.has("open")||t.has("_proposedHc")||t.has("_proposedShift")||t.has("hass")&&this._hassRelevantChange(t))&&(this._chartConfig=this._buildChart())}}_hassRelevantChange(t){const e=t.get("hass");return!e||this._relevantStateChanged(e)}_relevantStateChanged(t){const e=this.config;return[e.outdoor_entity,e.climate_entity,e.hc_entity,e.shift_entity,e.n_entity,e.min_flow_entity,e.max_flow_entity].filter(Boolean).some(e=>this.hass.states[e]?.state!==t.states[e]?.state)}_entityState(t){if(t&&this.hass)return this.hass.states[t]}_entityAttr(t,e){return this._entityState(t)?.attributes?.[e]}_resolveEntityNumber(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:r}_openMoreInfo(t){if(t&&this.hass){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}}get _climateState(){return this._entityState(this.config.climate_entity)}get _tTarget(){return this._climateState?.attributes?.temperature??21}get _currentN(){const t=this.config;return t.curve_from_entities?this._resolveEntityNumber(t.n_entity,t.n):t.n}get _currentHc(){return this._resolveEntityNumber(this.config.hc_entity,.9)}get _currentShift(){return this._resolveEntityNumber(this.config.shift_entity,0)}get _tOutdoor(){const t=this._entityState(this.config.outdoor_entity);if(!t)return null;const e=parseFloat(t.state);return isNaN(e)?null:this._fromDisplayTemp(e)}get _hcMin(){return this._entityAttr(this.config.hc_entity,"min")??.5}get _hcMax(){return this._entityAttr(this.config.hc_entity,"max")??3}get _hcStep(){return this._entityAttr(this.config.hc_entity,"step")??.1}get _shiftMin(){return this._entityAttr(this.config.shift_entity,"min")??-15}get _shiftMax(){return this._entityAttr(this.config.shift_entity,"max")??15}get _shiftStep(){return this._entityAttr(this.config.shift_entity,"step")??1}get _isWWSD(){if(!this.config?.climate_entity)return!1;const t=this._tOutdoor;return null!==t&&t>=this._tTarget}_syncProposedValues(){if(!this.hass||!this.config)return;const t=this._currentHc,e=this._currentShift;this._lastHcState!==t&&(this._proposedHc=t,this._lastHcState=t),this._lastShiftState!==e&&(this._proposedShift=e,this._lastShiftState=e)}_buildChart(){const t=Oi(this.hass),e=this.config,i=e.curve_from_entities?this._resolveEntityNumber(e.min_flow_entity,e.min_flow):e.min_flow,r=e.curve_from_entities?this._resolveEntityNumber(e.max_flow_entity,e.max_flow):e.max_flow,n={tTarget:this._tTarget,hc:this._currentHc,n:this._currentN,shift:this._currentShift,minFlow:i,maxFlow:r},o={tTarget:this._tTarget,hc:this._proposedHc??this._currentHc,n:this._currentN,shift:this._proposedShift??this._currentShift,minFlow:i,maxFlow:r},s=ie(this,"heating"),a=`rgb(${getComputedStyle(this).getPropertyValue("--rgb-state-climate-cool").trim()||getComputedStyle(this).getPropertyValue("--rgb-primary-color").trim()||"33, 150, 243"})`,c=`rgba(${getComputedStyle(this).getPropertyValue("--rgb-warning").trim()||"255, 167, 38"}, 0.08)`,l=br(n,e.t_out_min,e.t_out_max),h=br(o,e.t_out_min,e.t_out_max),u=l.map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),d=h.map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),p=this._tOutdoor,m=[];if(null!==p){const t=vr(n,p);m.push({type:"line",name:"operating-point",data:[{value:[this._toDisplayTemp(p),this._toDisplayTemp(t)],symbolSize:9,itemStyle:{color:s,borderColor:"#ffffff",borderWidth:2}}],showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}})}const _=[];this._isWWSD&&_.push({type:"line",name:"wwsd",data:[[this._toDisplayTemp(e.t_out_max),this._toDisplayTemp(r+5)],[this._toDisplayTemp(this._tTarget),this._toDisplayTemp(r+5)]],showSymbol:!1,lineStyle:{width:0},areaStyle:{color:c},tooltip:{show:!1}});const f=this.hass?.config?.unit_system?.temperature??"°C";return{options:{animation:!1,xAxis:{type:"value",min:this._toDisplayTemp(e.t_out_min),max:this._toDisplayTemp(e.t_out_max),inverse:!0,axisLabel:{fontSize:10,formatter:t=>`${t.toFixed(0)}`,hideOverlap:!0},axisTick:{show:!1},axisLine:{show:!1}},yAxis:{type:"value",min:this._toDisplayTemp(i-5),max:this._toDisplayTemp(r+5),axisLabel:{fontSize:10}},grid:{top:10,right:15,bottom:25,left:35},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:e=>{const i=Array.isArray(e)?e:[e],r=i.find(e=>e.seriesName===t("tuning_dialog.current")||e.seriesName===t("tuning_dialog.proposed"));if(!r)return"";const n=r.value[0];let o="";for(const e of i){if("operating-point"===e.seriesName||"wwsd"===e.seriesName)continue;const i=`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>`,r="dashed"===e.lineStyle?.type?` (${t("tuning_dialog.proposed")})`:"";o+=`${i}${e.seriesName}${r}: <b>${e.value[1].toFixed(1)}${f}</b><br/>`}return o+=`<span style="opacity:0.6">${n.toFixed(1)}${f} ${t("tuning_dialog.outdoor_axis_suffix")}</span>`,o}},legend:{show:!1}},data:[{type:"line",name:t("tuning_dialog.current"),data:u.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:s}},{type:"line",name:t("tuning_dialog.proposed"),data:d.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2,type:"dashed"},itemStyle:{color:a}},...m,..._]}}async _recalculate(){const t=this.config.recalculate_service;if(!t||!this.hass)return;const[e,i]=t.split(".",2);e&&i&&this.hass.services[e]?.[i]&&await this.hass.callService(e,i,{})}async _applyAll(){if(this.hass&&this.config){this._applying=!0;try{const t=this._hcChanged,e=this._shiftChanged;t&&await this.hass.callService("number","set_value",{entity_id:this.config.hc_entity,value:this._proposedHc}),e&&await this.hass.callService("number","set_value",{entity_id:this.config.shift_entity,value:this._proposedShift}),(t||e)&&await this._recalculate(),this._applySuccess=!0,clearTimeout(this._successTimer),this._successTimer=setTimeout(()=>{this._applySuccess=!1},1500)}catch(t){console.warn("Failed to apply tuning:",t)}finally{this._applying=!1}}}_resetAll(){this._proposedHc=this._currentHc,this._proposedShift=this._currentShift}_stepHc(t){this._proposedHc=Math.min(this._hcMax,Math.max(this._hcMin,parseFloat((this._proposedHc+t*this._hcStep).toFixed(4))))}_stepShift(t){this._proposedShift=Math.min(this._shiftMax,Math.max(this._shiftMin,parseFloat((this._proposedShift+t*this._shiftStep).toFixed(4))))}render(){if(!this.open||!this.config||!this.hass)return V;const t=Oi(this.hass),e=this._hcStep<1?Math.ceil(-Math.log10(this._hcStep)):0,i=this._shiftStep<1?Math.ceil(-Math.log10(this._shiftStep)):0,r=this._isDirty,n=this._proposedHc-this._currentHc,o=this._proposedShift-this._currentShift;return z`
      <ha-dialog
        .open=${!0}
        .headerTitle=${t("tuning_dialog.default_title")}
        @closed=${()=>{this.open=!1,this.dispatchEvent(new CustomEvent("closed"))}}
        flexcontent
      >
        <div class="dialog-chart">
          ${this._chartConfig?z`
            <ha-chart-base .hass=${this.hass} .options=${this._chartConfig.options} .data=${this._chartConfig.data} height="100%" hide-reset-button></ha-chart-base>
          `:V}
        </div>

        <div class="controls">
          <!-- HC panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${t("tuning_dialog.hc_short")}</span>
            <div class="hero-row">
              <span class="hero-value">${this._proposedHc.toFixed(e)}</span>
              ${Math.abs(n)>this._hcStep/2?z`
                <span class="ctrl-delta ${n>0?"pos":"neg"}">${Ft(n,this.hass?.locale,{minimumFractionDigits:e,maximumFractionDigits:e,signDisplay:"always"})}</span>
              `:V}
            </div>
            <div class="step-row">
              <ha-icon-button @click=${()=>this._stepHc(-1)}><ha-icon icon="mdi:minus"></ha-icon></ha-icon-button>
              <ha-icon-button @click=${()=>this._stepHc(1)}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
            </div>
            <eq-param-bar .min=${this._hcMin} .max=${this._hcMax} .value=${this._proposedHc} indicator></eq-param-bar>
          </div>
          <div class="ctrl-divider"></div>
          <!-- Shift panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${t("tuning_dialog.shift_short")}</span>
            <div class="hero-row">
              <span class="hero-value">${this._toDisplayDelta(this._proposedShift).toFixed(i)}${this.hass?.config?.unit_system?.temperature??"°C"}</span>
              ${Math.abs(o)>this._shiftStep/2?z`
                <span class="ctrl-delta ${o>0?"pos":"neg"}">${Ft(this._toDisplayDelta(o),this.hass?.locale,{minimumFractionDigits:i,maximumFractionDigits:i,signDisplay:"always"})}${this.hass?.config?.unit_system?.temperature??"°C"}</span>
              `:V}
            </div>
            <div class="step-row">
              <ha-icon-button @click=${()=>this._stepShift(-1)}><ha-icon icon="mdi:minus"></ha-icon></ha-icon-button>
              <ha-icon-button @click=${()=>this._stepShift(1)}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
            </div>
            <eq-param-bar .min=${this._toDisplayDelta(this._shiftMin)} .max=${this._toDisplayDelta(this._shiftMax)} .value=${this._toDisplayDelta(this._proposedShift)} centered indicator></eq-param-bar>
          </div>
        </div>

        ${this._renderKpi()}

        <div slot="footer">
          <ha-button size="small" @click=${this._resetAll} .disabled=${!r}>${t("tuning_dialog.reset")}</ha-button>
          <ha-button variant="brand" appearance="filled" size="small"
            .disabled=${!r||this._applying} .loading=${this._applying}
            @click=${async()=>{await this._applyAll(),this._applySuccess&&(this.open=!1,this.dispatchEvent(new CustomEvent("closed")))}}
          >${this._applySuccess?z`<ha-icon icon="mdi:check" slot="start"></ha-icon>`:V}${t("tuning_dialog.apply")}</ha-button>
        </div>
      </ha-dialog>
    `}_renderKpi(){if(!this.config||!this.hass)return V;const t=Oi(this.hass),e=this.hass?.config?.unit_system?.temperature??"°C",i=t=>`${Ft(t,this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} ${e}`,r=this._entityState(this.config.outdoor_entity),n=r?parseFloat(r.state):NaN,o=isNaN(n)?"—":i(n),s=this._entityState(this.config.flow_entity),a=s?parseFloat(s.state):NaN,c=isNaN(a)?"—":i(a),l=this._climateState?.attributes?.current_temperature,h=null==l||isNaN(l)?"—":i(l);return z`
      <div class="kpi-footer">
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.outdoor_entity)}>
          <div class="kpi-value">${o}</div>
          <div class="kpi-label">${t("common.outdoor")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.flow_entity)}>
          <div class="kpi-value flow">${c}</div>
          <div class="kpi-label">${t("common.flow")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.climate_entity)}>
          <div class="kpi-value">${h}</div>
          <div class="kpi-label">${t("common.room")}</div>
        </div>
      </div>
    `}static get styles(){return[super.styles,a`
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
        .step-row { display: flex; gap: 8px; }
        .step-row ha-icon-button {
          --mdc-icon-button-size: 36px; --mdc-icon-size: 20px;
          color: rgb(var(--rgb-primary, 33, 150, 243));
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
      `]}};t([pt({attribute:!1})],wr.prototype,"hass",void 0),t([pt({attribute:!1})],wr.prototype,"config",void 0),t([pt({type:Boolean})],wr.prototype,"open",void 0),t([mt()],wr.prototype,"_proposedHc",void 0),t([mt()],wr.prototype,"_proposedShift",void 0),t([mt()],wr.prototype,"_applying",void 0),t([mt()],wr.prototype,"_applySuccess",void 0),t([mt()],wr.prototype,"_chartConfig",void 0),wr=t([ht("eq-tuning-dialog")],wr),ji({type:dr,name:"Equitherm Status",description:"Compact heating status tile with temperature displays"});let xr=class extends Ri{constructor(){super(...arguments),this._showTuningDialog=!1}get _tuningDialogConfig(){const t=this._config;if(t?.hc_entity&&t?.shift_entity)return{climate_entity:t.climate_entity,outdoor_entity:t.outdoor_entity,hc_entity:t.hc_entity,shift_entity:t.shift_entity,flow_entity:t.flow_entity,n_entity:t.n_entity,curve_from_entities:!!t.n_entity,n:1.25,min_flow:20,max_flow:70,t_out_min:-20,t_out_max:20}}getGridOptions(){return{columns:12,rows:3,min_rows:1}}static async getStubConfig(t){const e=t.states,i=Object.keys(e),r=i.find(t=>mr.includes(_t(t))),n=i.filter(t=>{const i=e[t];return _r.includes(_t(t))&&"temperature"===i?.attributes?.device_class}),o=n.find(t=>t.includes("outdoor")||t.includes("outside")||t.includes("exterior"))??n[0],s=n.find(t=>t.includes("flow")||t.includes("supply")||t.includes("forward"))??n[0];return{type:"custom:equitherm-status-card",climate_entity:r,outdoor_entity:o,flow_entity:s}}static async getConfigElement(){return await Promise.resolve().then(function(){return vn}),document.createElement(pr)}setConfig(t){this._config=hr(t)}get _hasParamsFooter(){const t=this._config;return!!(t.hc_entity||t.shift_entity||t.n_entity||t.pid_correction_entity)}_renderHeaderBadges(){if(!this._config.tunable)return super._renderHeaderBadges();const t=this._isManualPreset;return z`
      <div class="badges">
        ${t?V:this._renderPidBadge()}
        ${t?V:this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderHvacBadge()}
        <ha-icon-button
          @click=${()=>{this._showTuningDialog=!0}}
          style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
        ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
      </div>
    `}static get styles(){return[super.styles,Ui,Ii,zi,Gi,a`
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
      `]}_renderParamsFooterWithTune(){const t=this._renderParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:.9}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:1.25}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:0}:void 0,pid_correction:this._config.pid_correction_entity?{entity:this._config.pid_correction_entity}:void 0});return t===V?V:this._config.tunable?z`
      <div class="params-footer-tunable" @click=${()=>{this._showTuningDialog=!0}}>
        ${t}
        <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
      </div>
    `:t}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=oe(this._config,t=>this._entityState(t)),i=this.hass.states[this._config.climate_entity],r=i?Lt(i,this._config.name??this._config.title,this.hass)||t("status_card.default_title"):this._config.title??t("status_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:thermostat",clickEntity:this._config.climate_entity,title:r})}

        ${this._renderKpiFooter({adjustingDir:e??void 0,curveOutput:this._curveOutputTempFormatted||void 0})}
        ${this._renderParamsFooterWithTune()}
        ${this._config.show_last_updated?z`
          <div class="footer-meta">
            ${this._renderLastUpdated(this._config.flow_entity)}
          </div>
        `:V}
      </ha-card>

      ${this._tuningDialogConfig&&this._showTuningDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._tuningDialogConfig}
          .open=${this._showTuningDialog}
          @closed=${()=>{this._showTuningDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};t([mt()],xr.prototype,"_showTuningDialog",void 0),xr=t([ht(dr)],xr);const $r=`${ur}-curve-card`,Er=`${$r}-editor`,Sr=["climate"],Tr=["sensor"],Cr={n:1.25,min_flow:20,max_flow:70},Hr={n:sr(or()),min_flow:sr(or()),max_flow:sr(or())},Ar={min_flow_entity:sr(ar()),max_flow_entity:sr(ar())},Nr=cr({type:ar(),climate_entity:ar(),outdoor_entity:ar(),curve_output_entity:sr(ar()),pid_output_entity:sr(ar()),flow_entity:ar(),rate_limiting_entity:sr(ar()),pid_active_entity:sr(ar()),show_last_updated:sr(nr()),show_kpi_footer:sr(nr()),show_params_footer:sr(nr()),title:sr(rr()),name:sr(rr()),curve_from_entities:sr(rr()),hc_entity:sr(ar()),n_entity:sr(ar()),shift_entity:sr(ar()),tunable:sr(nr()),recalculate_service:sr(ar()),...Ar,hc:sr(or()),...Hr,shift:sr(or()),t_out_min:sr(or()),t_out_max:sr(or())}),kr={hc:.9,shift:0,t_out_min:-20,t_out_max:20,...Cr};function Pr(t){return tr(t,Nr),{...kr,...t}}let Dr=class extends ct{constructor(){super(...arguments),this._active=!1}connectedCallback(){super.connectedCallback();const t=this.getRootNode();this._hostEl=t.host,this._hostEl&&(this._active=this._hostEl.hasAttribute("manual-override"),this._observer=new MutationObserver(()=>{this._active=this._hostEl.hasAttribute("manual-override")}),this._observer.observe(this._hostEl,{attributes:!0,attributeFilter:["manual-override"]}))}disconnectedCallback(){this._observer?.disconnect(),super.disconnectedCallback()}static get styles(){return a`
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
    `}render(){if(!this._active)return V;const t=Oi(this.getRootNode()?.host?.hass);return z`
      <div class="chip">
        <ha-icon icon="mdi:hand-back-right"></ha-icon>
        ${t("common.manual_override")}
      </div>
    `}};t([mt()],Dr.prototype,"_active",void 0),Dr=t([ht("eq-manual-overlay")],Dr),ji({type:$r,name:"Equitherm Curve",description:"Heating curve visualization with current operating point"});let Br=class extends Fi{constructor(){super(...arguments),this._showDialog=!1}willUpdate(t){if(super.willUpdate(t),t.has("_config"))return this._dialogConfig=this._computeDialogConfig(),void this._updateChartConfig();if(t.has("hass")&&this.hass){const e=t.get("hass");e&&!this._relevantStateChanged(e)||this._updateChartConfig()}}_relevantStateChanged(t){return[this._config.outdoor_entity,this._config.flow_entity,this._config.climate_entity,this._config.rate_limiting_entity,this._config.pid_output_entity,this._config.curve_output_entity,this._config.pid_active_entity,...this._config.curve_from_entities||this._config.tunable?[this._config.hc_entity,this._config.shift_entity,this._config.n_entity,this._config.min_flow_entity,this._config.max_flow_entity]:[]].filter(Boolean).some(e=>this.hass.states[e]?.state!==t.states[e]?.state)}static async getStubConfig(t){const e=t.states,i=Object.keys(e),r=i.find(t=>Sr.includes(_t(t))),n=i.filter(t=>{const i=e[t];return Tr.includes(_t(t))&&"temperature"===i?.attributes?.device_class}),o=n.find(t=>t.includes("outdoor")||t.includes("outside")||t.includes("exterior"))??n[0],s=n.find(t=>t.includes("flow")||t.includes("supply")||t.includes("forward"))??n[0],a=n.find(t=>t.includes("curve_output"))??"";return{type:"custom:equitherm-curve-card",climate_entity:r,outdoor_entity:o,curve_output_entity:a,flow_entity:s,hc:1.2,n:1.25,shift:0,min_flow:25,max_flow:70,t_out_min:-20,t_out_max:20}}static async getConfigElement(){return await Promise.resolve().then(function(){return xn}),document.createElement(Er)}setConfig(t){this._config=Pr(t)}get _tTarget(){return this._climate?.attributes.temperature??21}get _tOutdoor(){const t=this._entityState(this._config.outdoor_entity);if(!t)return null;const e=parseFloat(t.state);return isNaN(e)?null:this._fromDisplayTemp(e)}get _flowTemp(){const t=this._entityState(this._config.flow_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}return this._config.min_flow}get _currentN(){return this._config.curve_from_entities?this._resolveEntityNumber(this._config.n_entity,this._config.n):this._config.n}_computeDialogConfig(){const t=this._config;if(t?.hc_entity&&t?.shift_entity)return{climate_entity:t.climate_entity,outdoor_entity:t.outdoor_entity,hc_entity:t.hc_entity,shift_entity:t.shift_entity,flow_entity:t.flow_entity,n_entity:t.n_entity,min_flow_entity:t.min_flow_entity,max_flow_entity:t.max_flow_entity,recalculate_service:t.recalculate_service,curve_from_entities:t.curve_from_entities,n:t.n,min_flow:t.min_flow,max_flow:t.max_flow,t_out_min:t.t_out_min,t_out_max:t.t_out_max}}_renderHeaderBadges(){if(!this._config.tunable)return super._renderHeaderBadges();const t=this._isManualPreset;return z`
      <div class="badges">
        ${t?V:this._renderPidBadge()}
        ${t?V:this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderHvacBadge()}
        <ha-icon-button
          @click=${()=>{this._showDialog=!0}}
          style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
        ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
      </div>
    `}_renderParamsFooterContent(){if(!this._config.curve_from_entities)return V;if(this._config.tunable){const t=this._renderParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:this._config.hc}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:this._config.n}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:this._config.shift}:void 0});return t===V?V:z`
        <div class="params-footer-tunable" @click=${()=>{this._showDialog=!0}}>
          ${t}
          <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
        </div>
      `}return this._renderParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:this._config.hc,onClick:()=>{this._showDialog=!0}}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:this._config.n}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:this._config.shift,onClick:()=>{this._showDialog=!0}}:void 0})}_buildEChartOptions(){return this._buildSingleCurveOptions()}_buildSingleCurveOptions(){const t=Oi(this.hass),e=this._config,i={tTarget:this._tTarget,hc:e.curve_from_entities?this._resolveEntityNumber(e.hc_entity,e.hc):e.hc,n:e.curve_from_entities?this._resolveEntityNumber(e.n_entity,e.n):e.n,shift:e.curve_from_entities?this._resolveEntityTemp(e.shift_entity,e.shift):e.shift,minFlow:e.curve_from_entities?this._resolveEntityTemp(e.min_flow_entity,e.min_flow):e.min_flow,maxFlow:e.curve_from_entities?this._resolveEntityTemp(e.max_flow_entity,e.max_flow):e.max_flow},r=getComputedStyle(this),n=r.getPropertyValue("--curve-gradient-start").trim(),o=r.getPropertyValue("--curve-gradient-end").trim(),s=n?`rgb(${n})`:ie(this,"heating"),a=o?`rgb(${o})`:ie(this,"cooling"),c=`rgba(${r.getPropertyValue("--rgb-warning").trim()||"255, 167, 38"}, 0.08)`,l=br(i,e.t_out_min,e.t_out_max).map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),h=this._tOutdoor,u=[],d=re(this._config,t=>this._entityState(t)),p=ne(this._config);if(null!==h){const t=this._toDisplayTemp(h),e=vr(i,h),r=this._toDisplayTemp(e);if(d){const e=p&&this._entityState(p)?parseFloat(this._entityState(p).state):r;if(this._config.pid_output_entity&&this._config.curve_output_entity){const e=this._entityState(this._config.curve_output_entity),i=e?parseFloat(e.state):r;u.push({value:[t,i],symbolSize:8,itemStyle:{color:"transparent",borderColor:s,borderWidth:1.5}})}u.push({value:[t,e],symbolSize:10,itemStyle:{color:s,borderColor:"#ffffff",borderWidth:2}}),u.push({value:[t,this._toDisplayTemp(this._flowTemp)],symbolSize:8,itemStyle:{color:"transparent",borderColor:s,borderWidth:2}})}else u.push({value:[t,r],symbolSize:9,itemStyle:{color:s,borderColor:"#ffffff",borderWidth:2}})}const m=l.filter((t,e)=>e%50==0).map(t=>[t.x,t.y]);return{options:{animation:!1,xAxis:{type:"value",min:this._toDisplayTemp(e.t_out_min),max:this._toDisplayTemp(e.t_out_max),inverse:!0,axisLabel:{fontSize:10,formatter:t=>`${parseFloat(t.toFixed(1))}`},axisTick:{show:!1},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{fontSize:10,formatter:t=>`${parseFloat(t.toFixed(1))}`},min:this._toDisplayTemp(i.minFlow-5),max:this._toDisplayTemp(i.maxFlow+5)},grid:{top:5,right:5,bottom:20,left:30},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:e=>{const i=(Array.isArray(e)?e:[]).find(e=>e.seriesName===t("curve_card.flow_temp"));if(!i)return"";const r=i.value[0],n=i.value[1],o=this.hass?.config?.unit_system?.temperature??"°C",a=t=>`${parseFloat(t.toFixed(1))} ${o}`;return`<div style="margin-bottom:4px;font-weight:600">${a(r)} ${t("curve_card.outdoor_axis_suffix")}</div><div>${c=s,`<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background-color:${c}"></span>`}${a(n)} ${t("curve_card.flow_axis_suffix")}</div>`;var c}},legend:{show:!1}},data:[{type:"line",name:t("curve_card.flow_temp"),data:l.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:s},areaStyle:{color:{type:"linear",x:0,y:0,x2:1,y2:0,colorStops:[{offset:0,color:s},{offset:1,color:a}]}}},{type:"line",name:"markers",data:m,showSymbol:!0,symbol:"circle",symbolSize:3,lineStyle:{width:0},itemStyle:{color:s,borderColor:"#fff",borderWidth:1},tooltip:{show:!1}},{type:"line",name:"operating-point",data:u,showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}},...this._isWWSD?[{type:"line",name:"wwsd",data:[[this._toDisplayTemp(e.t_out_max),this._toDisplayTemp(i.maxFlow+5)],[this._toDisplayTemp(this._tTarget),this._toDisplayTemp(i.maxFlow+5)]],showSymbol:!1,lineStyle:{width:0},areaStyle:{color:c},tooltip:{show:!1}}]:[]]}}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          height="100%"
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `}static get styles(){return[super.styles,Ui,Ii,zi,Gi,a`
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
      `]}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=oe(this._config,t=>this._entityState(t)),i=this.hass.states[this._config.climate_entity],r=i?Lt(i,this._config.name??this._config.title,this.hass)||t("curve_card.default_title"):this._config.title??t("curve_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:thermostat",clickEntity:this._config.climate_entity,title:r})}
        ${this._renderChart()}
        ${this._renderKpiFooter({adjustingDir:e??void 0,curveOutput:this._curveOutputTempFormatted||void 0})}
        ${this._renderParamsFooterContent()}
        ${this._config.show_last_updated?z`
          <div class="footer-meta">
            ${this._renderLastUpdated(this._config.flow_entity)}
          </div>
        `:V}
      </ha-card>

      ${this._dialogConfig&&this._showDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showDialog}
          @closed=${()=>{this._showDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};t([mt()],Br.prototype,"_showDialog",void 0),t([mt()],Br.prototype,"_dialogConfig",void 0),Br=t([ht($r)],Br);const Mr=`${ur}-forecast-card`,Or=`${Mr}-editor`,Lr=["climate"],Ir=["sensor"],Rr=cr({type:ar(),weather_entity:ar(),climate_entity:ar(),flow_entity:ar(),hours:sr(or()),name:sr(rr()),curve_from_entities:sr(rr()),hc_entity:sr(ar()),n_entity:sr(ar()),shift_entity:sr(ar()),...Ar,outdoor_entity:sr(ar()),pid_active_entity:sr(ar()),show_last_updated:sr(nr()),show_kpi_footer:sr(nr()),show_params_footer:sr(nr()),tunable:sr(nr()),recalculate_service:sr(ar()),hc:sr(or()),...Hr,shift:sr(or())}),Fr={hours:24,hc:.9,shift:0,...Cr};function qr(t){return tr(t,Rr),{...Fr,...t}}ji({type:Mr,name:"Equitherm Forecast",description:"Heating forecast based on weather predictions"});let Ur=class extends Fi{constructor(){super(...arguments),this._forecastPoints=[],this._showDialog=!1}updated(t){super.updated(t),(t.has("_config")||!this._unsub&&t.has("hass"))&&this._subscribeForecast(),t.has("_forecastPoints")&&this._updateChartConfig()}static async getStubConfig(t){const e=t.states,i=Object.keys(e),r=i.find(t=>Lr.includes(_t(t))),n=i.find(t=>"weather"===_t(t)),o=i.filter(t=>{const i=e[t];return Ir.includes(_t(t))&&"temperature"===i?.attributes?.device_class}),s=o.find(t=>t.includes("flow")||t.includes("supply")||t.includes("forward"))??o[0];return{type:"custom:equitherm-forecast-card",weather_entity:n??"",climate_entity:r??"",flow_entity:s??"",hours:24,hc:1.2,n:1.25,shift:0,min_flow:25,max_flow:70}}static async getConfigElement(){return await Promise.resolve().then(function(){return En}),document.createElement(Or)}setConfig(t){this._config=qr(t)}get _tTarget(){return this._climate?.attributes.temperature??21}get _flowTemp(){const t=this._entityState(this._config.flow_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}return this._config.min_flow}get _outdoorTemp(){if(this._config.outdoor_entity){const t=this._entityState(this._config.outdoor_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}}const t=this._entityState(this._config.weather_entity);if(t){const e=parseFloat(t.attributes.temperature);if(!isNaN(e))return this._fromDisplayTemp(e)}return NaN}get _outdoorTempFormatted(){const t=this._outdoorTemp;return isNaN(t)?"—":this._formatCalcTemp(t)}get _isWWSD(){const t=this._climate?.attributes.temperature;return null!=t&&(!isNaN(this._outdoorTemp)&&this._outdoorTemp>=t)}_wwsdDescription(){const t=Oi(this.hass),e=this._climate?.attributes.temperature;return isNaN(this._outdoorTemp)||null==e?t("common.wwsd_label"):`${t("common.outdoor")} ${this._formatCalcTemp(this._outdoorTemp)} ≥ ${this._formatCalcTemp(e)}`}_renderHeaderBadges(){if(!this._config.tunable)return super._renderHeaderBadges();const t=this._isManualPreset;return z`
      <div class="badges">
        ${t?V:this._renderPidBadge()}
        ${t?V:this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderHvacBadge()}
        <ha-icon-button
          @click=${()=>{this._showDialog=!0}}
          style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
        ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
      </div>
    `}get _curveParams(){const t=this._config;return{tTarget:this._tTarget,hc:t.curve_from_entities?this._resolveEntityNumber(t.hc_entity,t.hc):t.hc,n:t.curve_from_entities?this._resolveEntityNumber(t.n_entity,t.n):t.n,shift:t.curve_from_entities?this._resolveEntityNumber(t.shift_entity,t.shift):t.shift,minFlow:t.curve_from_entities?this._resolveEntityNumber(t.min_flow_entity,t.min_flow):t.min_flow,maxFlow:t.curve_from_entities?this._resolveEntityNumber(t.max_flow_entity,t.max_flow):t.max_flow}}get _tuningDialogConfig(){const t=this._config;if(t?.hc_entity&&t?.shift_entity)return{climate_entity:t.climate_entity,outdoor_entity:t.outdoor_entity??"",hc_entity:t.hc_entity,shift_entity:t.shift_entity,flow_entity:t.flow_entity,n_entity:t.n_entity,min_flow_entity:t.min_flow_entity,max_flow_entity:t.max_flow_entity,curve_from_entities:t.curve_from_entities,n:t.n,min_flow:t.min_flow,max_flow:t.max_flow,t_out_min:-20,t_out_max:20}}_processForecast(t){const e=t.map(t=>({datetime:t.datetime,temperature:this._fromDisplayTemp(t.temperature)}));this._forecastPoints=function(t,e,i){return t.slice(0,i).map(t=>({datetime:t.datetime,hour:new Date(t.datetime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),tOutdoor:t.temperature,tFlow:yr({...e,tOutdoor:t.temperature})}))}(e,this._curveParams,this._config.hours)}_unsubscribeForecast(){this._unsub&&(this._unsub(),this._unsub=void 0)}async _subscribeForecast(){if(this._unsubscribeForecast(),this.isConnected&&this.hass&&this._config?.weather_entity)try{const t=await this.hass.connection.subscribeMessage(t=>{t.forecast&&this._processForecast(t.forecast)},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:this._config.weather_entity});this._unsub?t():this._unsub=t}catch(t){console.warn("Failed to subscribe to weather forecast:",t)}}_buildEChartOptions(){const t=this._forecastPoints,e=Oi(this.hass),i=ie(this,"heating"),r=ie(this,"cooling"),n=function(t){if(0!==t.length)return t.reduce((t,e)=>e.tFlow>(t?.tFlow??0)?e:t,t[0])}(t),o=n?[{value:[new Date(n.datetime).getTime(),this._toDisplayTemp(n.tFlow)],symbolSize:6,itemStyle:{color:i,borderColor:"#fff",borderWidth:2},label:{show:!0,formatter:`${e("forecast_card.peak")}: ${this._toDisplayTemp(n.tFlow).toFixed(1)}${this.hass?.config?.unit_system?.temperature??"°C"}`,color:"#fff",backgroundColor:i,fontSize:11,fontWeight:600,padding:[2,6],borderRadius:3,position:"top"}}]:[];return{options:{animation:!1,xAxis:{type:"time",axisLabel:{fontSize:10,hideOverlap:!0},axisTick:{show:!1},axisLine:{show:!1}},yAxis:[{type:"value",axisLabel:{fontSize:10},min:this._toDisplayTemp((this._curveParams.minFlow??20)-5),max:this._toDisplayTemp((this._curveParams.maxFlow??70)+5)},{type:"value",axisLabel:{fontSize:10}}],grid:{top:15,right:15,bottom:25,left:35},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:t=>{const e=new Date(t[0].value[0]).toLocaleTimeString(this.hass?.locale?.language,{hour:"2-digit",minute:"2-digit"}),i=this.hass?.config?.unit_system?.temperature??"°C";let r=`<span style="opacity:0.6">${e}</span><br/>`;for(const e of t){if("peak"===e.seriesName)continue;r+=`${`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>`}${e.seriesName}: <b>${e.value[1].toFixed(1)}${i}</b><br/>`}return r}},legend:{show:!1}},data:[{type:"line",name:e("forecast_card.flow_temp"),data:t.map(t=>[new Date(t.datetime).getTime(),this._toDisplayTemp(t.tFlow)]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:i},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:`rgba(${i.replace("rgb(","").replace(")","")}, 0.4)`},{offset:1,color:`rgba(${i.replace("rgb(","").replace(")","")}, 0.05)`}]}}},{type:"line",name:e("forecast_card.outdoor_temp"),data:t.map(t=>[new Date(t.datetime).getTime(),this._toDisplayTemp(t.tOutdoor)]),yAxisIndex:1,showSymbol:!1,lineStyle:{width:1.5,type:"dashed"},itemStyle:{color:r}},...n?[{type:"line",name:"peak",data:o,showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}}]:[]]}}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          height="100%"
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `}_renderParamsFooterWithTune(){const t=this._renderParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:this._config.hc}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:this._config.n}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:this._config.shift}:void 0});return t===V?V:this._config.tunable?z`
      <div class="params-footer-tunable" @click=${()=>{this._showDialog=!0}}>
        ${t}
        <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
      </div>
    `:t}_onChartDisconnecting(){this._unsubscribeForecast()}_onChartReconnected(){this._subscribeForecast()}static get styles(){return[super.styles,Ui,Ii,zi,Gi,a`
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
      `]}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=this.hass.states[this._config.climate_entity],i=e&&Lt(e,this._config.name,this.hass)||t("forecast_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:weather-partly-cloudy",clickEntity:this._config.weather_entity,title:i})}
        ${this._renderChart()}
        ${this._renderKpiFooter({outdoorClickEntity:this._config.outdoor_entity??this._config.weather_entity})}
        ${this._config.curve_from_entities?this._renderParamsFooterWithTune():V}
        ${this._config.show_last_updated?z`
          <div class="footer-meta">
            ${this._renderLastUpdated(this._config.weather_entity)}
          </div>
        `:V}
      </ha-card>

      ${this._tuningDialogConfig&&this._showDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._tuningDialogConfig}
          .open=${this._showDialog}
          @closed=${()=>{this._showDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};t([mt()],Ur.prototype,"_forecastPoints",void 0),t([mt()],Ur.prototype,"_showDialog",void 0),Ur=t([ht(Mr)],Ur),console.info("%c EQUITHERM-CARDS %c 1.5.0 ","color: white; background: #f97316; font-weight: bold;","color: #f97316; background: white; font-weight: bold;");const Gr="opentherm-status-card",zr=`${Gr}-editor`,jr=["binary_sensor","input_boolean"],Vr=["sensor","input_number"],Wr=cr({type:ar(),boiler_temp_entity:ar(),return_temp_entity:ar(),flame_entity:ar(),setpoint_entity:sr(ar()),modulation_entity:sr(ar()),ch_enable_entity:sr(ar()),dhw_active_entity:sr(ar()),name:sr(rr()),show_last_updated:sr(nr())});function Kr(t){return tr(t,Wr),t}ji({type:Gr,name:"OpenTherm Status",description:"Boiler status at a glance"});let Xr=class extends qi{static async getStubConfig(t){const e=Object.keys(t.states),i=e.filter(t=>Vr.includes(_t(t))),r=e.filter(t=>jr.includes(_t(t))),n=i.find(t=>t.includes("boiler")||t.includes("t_boiler"))??i[0]??"",o=i.find(t=>t.includes("ret")||t.includes("return"))??i[1]??"",s=r.find(t=>t.includes("flame"))??r[0]??"";return{type:`custom:${Gr}`,boiler_temp_entity:n,return_temp_entity:o,flame_entity:s}}static async getConfigElement(){return await Promise.resolve().then(function(){return Tn}),document.createElement(zr)}setConfig(t){this._config=Kr(t)}getGridOptions(){return{columns:12,rows:3,min_rows:1}}get _flameOn(){return"on"===this._entityState(this._config.flame_entity)?.state}get _boilerTemp(){return this._resolveEntityNumber(this._config.boiler_temp_entity,NaN)}get _returnTemp(){return this._resolveEntityNumber(this._config.return_temp_entity,NaN)}get _deltaT(){return this._boilerTemp-this._returnTemp}get _modulation(){return this._config.modulation_entity?this._resolveEntityNumber(this._config.modulation_entity,NaN):NaN}_renderHeaderIcon(t,e){const i=this._flameOn?"var(--rgb-state-climate-heat, 244,81,30)":"var(--rgb-disabled, 158,158,158)";return z`
      <ha-tile-icon .interactive=${!0}
        style="--tile-icon-color: rgb(${i}); --tile-icon-size: 42px"
        @click=${()=>this._openMoreInfo(e)}>
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderBadges(){const t=Oi(this.hass),e=this._config,i=!!e.ch_active_entity&&"on"===this._entityState(e.ch_active_entity)?.state,r=!!e.dhw_active_entity&&"on"===this._entityState(e.dhw_active_entity)?.state;return z`
      <div class="badges">
        ${this._flameOn?z`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${t("opentherm.status_card.flame")}
            .icon=${"mdi:fire"}
            .active=${!0}
          ></eq-badge-info>
        `:V}
        ${i?z`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-primary-color, 33, 150, 243)"
            .label=${t("opentherm.status_card.ch")}
            .icon=${"mdi:radiator"}
          ></eq-badge-info>
        `:V}
        ${r?z`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${t("opentherm.status_card.dhw")}
            .icon=${"mdi:water-boiler"}
          ></eq-badge-info>
        `:V}
      </div>
    `}static get styles(){return[super.styles,Ui,Ii,a`
        ha-card { height: 100%; }
        .body { padding: 8px 10px 10px; display: flex; flex-direction: column; gap: 8px; }
        .temps-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 8px;
        }
        .temp-block {
          text-align: center;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .temp-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .temp-value {
          font-size: 22px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .temp-value.hot { color: var(--gradient-hot, #f97316); }
        .temp-setpoint {
          font-size: 11px;
          color: var(--secondary-text-color);
          margin-top: 1px;
        }
        .temp-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          margin-top: 2px;
        }
        .divider { width: 1px; background: var(--divider-color); height: 32px; flex-shrink: 0; }
        .arrow { color: var(--divider-color); font-size: 0.9rem; padding-bottom: 14px; }
        .mod-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 4px;
        }
        .mod-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--secondary-text-color);
          white-space: nowrap;
          min-width: 70px;
        }
        .mod-track {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--secondary-background-color, rgba(0,0,0,0.08));
          overflow: hidden;
        }
        .mod-fill {
          height: 100%;
          border-radius: 3px;
          background: var(--gradient-hot, #f97316);
          transition: width 0.4s ease;
        }
        .mod-value {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 36px;
          text-align: right;
        }
      `]}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=this._config,i=this._flameOn,r=this._boilerTemp,n=this._returnTemp,o=this._deltaT,s=this._modulation,a=e.setpoint_entity?this._resolveEntityNumber(e.setpoint_entity,NaN):NaN,c=t=>isNaN(t)?"—":this._formatCalcTemp(t),l=this._entityState(e.boiler_temp_entity),h=l&&Lt(l,e.name,this.hass)||t("opentherm.status_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:i?"mdi:fire":"mdi:fire-off",clickEntity:e.boiler_temp_entity,title:h})}
        <div class="body">
          <div class="temps-row">
            <div class="temp-block" @click=${()=>this._openMoreInfo(e.boiler_temp_entity)}>
              <div class="temp-value hot">${c(r)}</div>
              ${isNaN(a)?V:z`<div class="temp-setpoint">→ ${c(a)}</div>`}
              <div class="temp-label">${t("opentherm.status_card.flow")}</div>
            </div>
            <div class="arrow" aria-hidden="true">→</div>
            <div class="temp-block" @click=${()=>this._openMoreInfo(e.return_temp_entity)}>
              <div class="temp-value">${c(n)}</div>
              <div class="temp-label">${t("opentherm.status_card.return")}</div>
            </div>
            <div class="divider"></div>
            <div class="temp-block">
              <div class="temp-value">${isNaN(o)?"—":`${o>0?"+":""}${o.toFixed(1)}${this.hass?.config?.unit_system?.temperature??"°C"}`}</div>
              <div class="temp-label">ΔT</div>
            </div>
          </div>
          ${isNaN(s)?V:z`
            <div class="mod-row">
              <span class="mod-label">${t("opentherm.status_card.modulation")}</span>
              <div class="mod-track">
                <div class="mod-fill" style="width: ${Math.max(0,Math.min(100,s))}%"></div>
              </div>
              <span class="mod-value">${s.toFixed(0)}%</span>
            </div>
          `}
        </div>
        ${e.show_last_updated?z`
          <div class="footer-meta">${this._renderLastUpdated(e.boiler_temp_entity)}</div>
        `:V}
      </ha-card>
    `}};Xr=t([ht(Gr)],Xr);const Yr="opentherm-dhw-card",Zr=`${Yr}-editor`,Jr=cr({type:ar(),dhw_enable_entity:ar(),dhw_setpoint_entity:ar(),dhw_active_entity:sr(ar()),dhw_temp_entity:sr(ar()),name:sr(rr()),show_last_updated:sr(nr())});function Qr(t){return tr(t,Jr),t}ji({type:Yr,name:"OpenTherm DHW",description:"Domestic hot water control"});let tn=class extends qi{static async getStubConfig(t){const e=Object.keys(t.states),i=e.find(t=>("switch"===_t(t)||"input_boolean"===_t(t))&&t.includes("dhw_enable"))??e.find(t=>"switch"===_t(t)||"input_boolean"===_t(t))??"",r=e.find(t=>("number"===_t(t)||"input_number"===_t(t))&&t.includes("dhw"))??e.find(t=>"number"===_t(t)||"input_number"===_t(t))??"";return{type:`custom:${Yr}`,dhw_enable_entity:i,dhw_setpoint_entity:r}}static async getConfigElement(){return await Promise.resolve().then(function(){return Hn}),document.createElement(Zr)}setConfig(t){this._config=Qr(t)}getGridOptions(){return{columns:6,rows:4,min_rows:1}}get _dhwEnabled(){return"on"===this._entityState(this._config.dhw_enable_entity)?.state}get _dhwActive(){return!!this._config.dhw_active_entity&&"on"===this._entityState(this._config.dhw_active_entity)?.state}get _setpointValue(){return this._resolveEntityNumber(this._config.dhw_setpoint_entity,NaN)}get _setpointMin(){return this._entityAttr(this._config.dhw_setpoint_entity,"min")??30}get _setpointMax(){return this._entityAttr(this._config.dhw_setpoint_entity,"max")??60}get _dhwTemp(){return this._config.dhw_temp_entity?this._resolveEntityNumber(this._config.dhw_temp_entity,NaN):NaN}get _setpointStep(){return this._entityAttr(this._config.dhw_setpoint_entity,"step")??.5}_renderHeaderIcon(t,e){const i=this._dhwEnabled?"var(--rgb-state-climate-heat, 244,81,30)":"var(--rgb-disabled, 158,158,158)";return z`
      <ha-tile-icon .interactive=${!0}
        style="--tile-icon-color: rgb(${i}); --tile-icon-size: 42px"
        @click=${()=>this._openMoreInfo(e)}>
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderBadges(){const t=Oi(this.hass);return z`
      <div class="badges">
        ${this._dhwActive?z`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .icon=${"mdi:water-boiler"}
            .label=${t("opentherm.dhw_card.dhw")}
            .active=${!0}
          ></eq-badge-info>
        `:V}
      </div>
    `}_toggleDhw(){if(!this.hass)return;const t=this._config.dhw_enable_entity,e=_t(t),i=this._dhwEnabled,r="switch"===e?i?"switch.turn_off":"switch.turn_on":i?"input_boolean.turn_off":"input_boolean.turn_on";this.hass.callService(r.split(".")[0],r.split(".")[1],{entity_id:t})}_setpointChanged(t){if(!this.hass)return;const e=t.target.value,i=parseFloat(e);if(isNaN(i))return;const r="input_number"===_t(this._config.dhw_setpoint_entity)?"input_number":"number";this.hass.callService(r,"set_value",{entity_id:this._config.dhw_setpoint_entity,value:i})}static get styles(){return[super.styles,Ui,Ii,a`
        ha-card { height: 100%; }
        .body {
          padding: 8px 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .control-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .control-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          min-width: 60px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toggle-label {
          font-size: var(--ha-font-size-m, 1rem);
          font-weight: 500;
          color: var(--primary-text-color);
        }
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .slider-value {
          font-size: 22px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
        }
        .hero-temp {
          text-align: center;
          padding: 4px 0;
        }
        .hero-value {
          font-size: 28px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--gradient-hot, #f97316);
          cursor: pointer;
        }
        .hero-target {
          font-size: 12px;
          color: var(--secondary-text-color);
          margin-top: 2px;
        }
        ha-slider {
          width: 100%;
        }
      `]}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=this._config,i=this._dhwEnabled,r=this._setpointValue,n=this._dhwTemp,o=e.dhw_temp_entity&&!isNaN(n),s=this._entityState(e.dhw_enable_entity),a=s&&Lt(s,e.name,this.hass)||t("opentherm.dhw_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:shower",clickEntity:e.dhw_enable_entity,title:a})}
        <div class="body">
          ${o?z`
            <div class="hero-temp">
              <div class="hero-value">${this._formatCalcTemp(n)}</div>
              <div class="hero-target">→ ${isNaN(r)?"—":this._formatCalcTemp(r)}</div>
            </div>
          `:V}
          <div class="toggle-row">
            <span class="toggle-label">${t("opentherm.dhw_card.enable")}</span>
            <ha-switch
              .checked=${i}
              @change=${this._toggleDhw}
            ></ha-switch>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="control-label">${t("opentherm.dhw_card.setpoint")}</span>
              <span class="slider-value">${isNaN(r)?"—":this._formatCalcTemp(r)}</span>
            </div>
            <ha-slider
              .min=${this._setpointMin}
              .max=${this._setpointMax}
              .step=${this._setpointStep}
              .value=${isNaN(r)?this._setpointMin:r}
              .disabled=${!i}
              pin
              @change=${this._setpointChanged}
            ></ha-slider>
          </div>
        </div>
        ${e.show_last_updated?z`
          <div class="footer-meta">${this._renderLastUpdated(e.dhw_setpoint_entity)}</div>
        `:V}
      </ha-card>
    `}};tn=t([ht(Yr)],tn);const en="opentherm-efficiency-card",rn=`${en}-editor`,nn=cr({type:ar(),boiler_temp_entity:ar(),return_temp_entity:ar(),condensing_threshold:sr(or()),hours:sr(or()),name:sr(rr()),show_last_updated:sr(nr())});function on(t){return tr(t,nn),t}class sn{static async fetch(t,e,i){const r=new Date,n=new Date(r.getTime()-3600*i*1e3),o=e.join(","),s=`history/period/${n.toISOString()}?filter_entity_id=${o}&end_time=${r.toISOString()}&minimal_response=true&no_attributes=true`;try{const i=await t.callApi("GET",s),r={};for(let t=0;t<e.length;t++)r[e[t]]=i[t]??[];return r}catch{return Object.fromEntries(e.map(t=>[t,[]]))}}static countCycles(t){let e=0;for(let i=1;i<t.length;i++)"off"===t[i-1].state&&"on"===t[i].state&&e++;return e}static toRangeBarSeries(t,e){const i=[];for(let r=0;r<t.length;r++){const n=new Date(t[r].last_changed).getTime(),o=r+1<t.length?new Date(t[r+1].last_changed).getTime():e;i.push({x:"on"===t[r].state?"On":"Off",y:[n,o]})}return i}}ji({type:en,name:"OpenTherm Efficiency",description:"Boiler condensing efficiency chart"});let an=class extends Fi{constructor(){super(...arguments),this._boilerHistory=[],this._returnHistory=[]}setConfig(t){this._config=on(t)}static async getConfigElement(){return await Promise.resolve().then(function(){return Nn}),document.createElement(rn)}static async getStubConfig(t){const e=Object.keys(t.states),i=e.find(t=>t.includes("boiler")||t.includes("t_boiler"))??"",r=e.find(t=>t.includes("ret")||t.includes("return"))??"";return{type:`custom:${en}`,boiler_temp_entity:i,return_temp_entity:r}}get _defaultThreshold(){return"°F"===this.hass?.config?.unit_system?.temperature?131:55}get _isCondensing(){const t=this._config.condensing_threshold??this._defaultThreshold,e=this._resolveEntityNumber(this._config.return_temp_entity,NaN);return!isNaN(e)&&e<t}_renderHeaderIcon(t,e){const i=this._isCondensing?"var(--rgb-success, 76,175,80)":"var(--rgb-disabled, 158,158,158)";return z`
      <ha-tile-icon .interactive=${!0}
        style="--tile-icon-color: rgb(${i}); --tile-icon-size: 42px"
        @click=${()=>this._openMoreInfo(e)}>
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderBadges(){const t=Oi(this.hass);return z`
      <div class="badges">
        ${this._isCondensing?z`
          <eq-badge-info .label=${t("opentherm.efficiency_card.condensing")} .icon=${"mdi:snowflake"} .active=${!0}
            style="--badge-info-color: var(--rgb-success, 76,175,80)">
          </eq-badge-info>
        `:V}
      </div>
    `}_onChartDisconnecting(){clearInterval(this._fetchTimer),this._fetchTimer=void 0}_onChartReconnected(){this._fetchHistory(),this._fetchTimer=setInterval(()=>this._fetchHistory(),6e4)}async _fetchHistory(){if(!this.hass)return;const t=this._config.hours??6,e=await sn.fetch(this.hass,[this._config.boiler_temp_entity,this._config.return_temp_entity],t);this._boilerHistory=e[this._config.boiler_temp_entity]??[],this._returnHistory=e[this._config.return_temp_entity]??[],this._updateChartConfig()}_buildEChartOptions(){const t=this._config.condensing_threshold??this._defaultThreshold,e=Oi(this.hass),i=ie(this,"heating"),r=ie(this,"cooling"),n=(t,e)=>{const i=t.map(t=>[new Date(t.last_changed).getTime(),parseFloat(t.state)]).filter(t=>!isNaN(t[1]));if(e){const t=this._resolveEntityNumber(e,NaN);isNaN(t)||i.push([Date.now(),t])}return i};return{options:{animation:!1,xAxis:{type:"time",axisTick:{show:!1},axisLine:{show:!1},axisLabel:{fontSize:10,hideOverlap:!0}},yAxis:{type:"value",name:`${e("opentherm.efficiency_card.temp_axis")} (${this.hass?.config?.unit_system?.temperature??"°C"})`,axisLabel:{fontSize:10,formatter:t=>`${t.toFixed(1)}`}},grid:{top:10,right:10,bottom:25,left:40},tooltip:{trigger:"axis",formatter:t=>{let e=`<span style="opacity:0.6">${new Date(t[0].value[0]).toLocaleTimeString(this.hass?.locale?.language,{hour:"2-digit",minute:"2-digit"})}</span><br/>`;for(const i of t){e+=`${`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${i.color};"></span>`}${i.seriesName}: <b>${i.value[1].toFixed(1)}${this.hass?.config?.unit_system?.temperature??"°C"}</b><br/>`}return e}},legend:{show:!1}},data:[{type:"line",name:"Flow",data:n(this._boilerHistory,this._config.boiler_temp_entity),smooth:!0,showSymbol:!1,lineStyle:{width:2},itemStyle:{color:i},markLine:{silent:!0,symbol:"none",lineStyle:{color:"rgba(76,175,80,0.5)",type:"dashed",width:1},data:[{yAxis:t,label:{formatter:`${t}${this.hass?.config?.unit_system?.temperature??"°C"}`,fontSize:10,position:"insideEndTop"}}]}},{type:"line",name:"Return",data:n(this._returnHistory,this._config.return_temp_entity),smooth:!0,showSymbol:!1,lineStyle:{width:1.5},itemStyle:{color:r}}]}}static get styles(){return[super.styles,Ui,Ii,a`
        ha-card { height: 100%; overflow: hidden; }
        .chart-wrapper { --chart-max-height: none; }
        .chart-wrapper ha-chart-base { height: 100%; }
      `]}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper">
        <ha-chart-base .hass=${this.hass} .options=${t} .data=${e} height="100%" hide-reset-button></ha-chart-base>
      </div>
    `}render(){if(!this._config||!this.hass)return V;const t=this._config,e=Oi(this.hass),i=this._entityState(t.boiler_temp_entity),r=i&&Lt(i,t.name,this.hass)||e("opentherm.efficiency_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:chart-areaspline",clickEntity:t.boiler_temp_entity,title:r})}
        ${this._renderChart()}
        ${t.show_last_updated?z`
          <div class="footer-meta">${this._renderLastUpdated(t.boiler_temp_entity)}</div>
        `:V}
      </ha-card>
    `}};an=t([ht(en)],an);const cn="opentherm-modulation-card",ln=`${cn}-editor`,hn=cr({type:ar(),modulation_entity:ar(),max_modulation_entity:ar(),flame_entity:ar(),hours:sr(or()),name:sr(rr()),show_last_updated:sr(nr())});function un(t){return tr(t,hn),t}let dn=class extends ct{constructor(){super(...arguments),this.segments=[],this.startTime=0,this.endTime=0,this.onColor="#f97316",this.offColor="rgba(128,128,128,0.15)",this.barHeight=16}static get styles(){return a`
      :host { display: block; }
      ha-chart-base {
        display: block;
        --chart-max-height: 55px;
        height: 55px;
      }
    `}render(){const t=this.segments.map(t=>[0,t.start,t.end,"on"===t.state?this.onColor:this.offColor]),e=this.onColor,i=this.barHeight,r=this.hass?.locale?.language,n={xAxis:{type:"time",min:this.startTime,max:this.endTime,axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!1},axisLabel:{fontSize:10,hideOverlap:!0}},yAxis:{type:"category",show:!1,data:["flame"]},grid:{top:5,bottom:20,left:0,right:0},tooltip:{show:!0,trigger:"item",confine:!0,position:"bottom",formatter:t=>{const i=t.value,n=i[1],o=i[2],s=i[3],a=s===e?"ON":"OFF",c=Math.round((o-n)/1e3);return`${`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${s};"></span>`}<b>${a}</b> &nbsp;${c>=60?`${Math.floor(c/60)}m ${c%60}s`:`${c}s`}<br/><span style="opacity:0.6">${new Date(n).toLocaleTimeString(r,{hour:"2-digit",minute:"2-digit"})}</span>`}},toolbox:{show:!1},dataZoom:[],legend:{show:!1}},o=[{type:"custom",renderItem:(t,e)=>{const r=e.value(0),n=e.coord([e.value(1),r]),o=e.coord([e.value(2),r]),s=t.coordSys;let a=n[0],c=n[1]-i/2,l=o[0]-n[0];return l<2&&(l=2),a<s.x&&(l-=s.x-a,a=s.x),a+l>s.x+s.width&&(l=s.x+s.width-a),l<=0?null:{type:"rect",shape:{x:a,y:c,width:Math.max(l,1),height:i,r:3},style:{fill:e.value(3)}}},data:t,dimensions:["id","start","end","color"],encode:{x:[1,2],y:0},progressive:0}];return z`
      <ha-chart-base
        .hass=${this.hass}
        .data=${o}
        .options=${n}
        hide-reset-button
      ></ha-chart-base>
    `}};t([pt({attribute:!1})],dn.prototype,"hass",void 0),t([pt({attribute:!1})],dn.prototype,"segments",void 0),t([pt({attribute:!1})],dn.prototype,"startTime",void 0),t([pt({attribute:!1})],dn.prototype,"endTime",void 0),t([pt({attribute:!1})],dn.prototype,"onColor",void 0),t([pt({attribute:!1})],dn.prototype,"offColor",void 0),t([pt({type:Number})],dn.prototype,"barHeight",void 0),dn=t([ht("eq-binary-timeline")],dn);ji({type:cn,name:"OpenTherm Modulation",description:"Boiler modulation and short-cycle diagnostics"});let pn=class extends qi{constructor(){super(...arguments),this._flameHistory=[],this._cyclesPerHour=0}setConfig(t){this._config=un(t)}static async getConfigElement(){return await Promise.resolve().then(function(){return Pn}),document.createElement(ln)}static async getStubConfig(t){const e=Object.keys(t.states),i=e.find(t=>t.includes("modulation")||t.includes("rel_mod"))??"",r=e.find(t=>t.includes("max_rel_mod")||t.includes("max_modulation"))??"",n=e.find(t=>t.includes("flame"))??"";return{type:`custom:${cn}`,modulation_entity:i,max_modulation_entity:r,flame_entity:n}}get _flameOn(){return"on"===this._entityState(this._config.flame_entity)?.state}_renderHeaderIcon(t,e){const i=this._flameOn?"var(--rgb-state-climate-heat, 244,81,30)":"var(--rgb-disabled, 158,158,158)";return z`
      <ha-tile-icon .interactive=${!0}
        style="--tile-icon-color: rgb(${i}); --tile-icon-size: 42px"
        @click=${()=>this._openMoreInfo(e)}>
        <ha-icon slot="icon" .icon=${t}></ha-icon>
      </ha-tile-icon>
    `}_renderHeaderBadges(){const t=Oi(this.hass),e=this._cyclesPerHour,i=e>6;return z`
      <div class="badges">
        ${e>0?z`
          <eq-badge-info .label=${`${e} ${t("opentherm.modulation_card.cycles_per_hour")}`}
            icon=${i?"mdi:alert":"mdi:lightning-bolt"}
            .active=${i}
            style="--badge-info-color: ${i?"var(--rgb-error, 229,57,53)":"var(--rgb-info, 3,169,244)"}">
          </eq-badge-info>
        `:V}
      </div>
    `}connectedCallback(){super.connectedCallback(),this._fetchHistory(),this._fetchTimer=setInterval(()=>this._fetchHistory(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._fetchTimer),this._fetchTimer=void 0}async _fetchHistory(){if(!this.hass)return;const t=this._config.hours??1,e=await sn.fetch(this.hass,[this._config.flame_entity],t);if(this._flameHistory=e[this._config.flame_entity]??[],t<=1)this._cyclesPerHour=sn.countCycles(this._flameHistory);else{const t=await sn.fetch(this.hass,[this._config.flame_entity],1);this._cyclesPerHour=sn.countCycles(t[this._config.flame_entity]??[])}}async _setMaxModulation(t){if(this.hass)try{await this.hass.callService("number","set_value",{entity_id:this._config.max_modulation_entity,value:t})}catch(t){console.warn("Failed to set max modulation:",t)}}_buildTimelineData(){const t=this._config.hours??1,e=Date.now(),i=e-3600*t*1e3,r=e,n=[],o=this._flameHistory.filter(t=>{const e=new Date(t.last_changed).getTime();return e>=i&&e<=r});for(let t=0;t<o.length;t++){const e=new Date(o[t].last_changed).getTime(),i=t+1<o.length?new Date(o[t+1].last_changed).getTime():r;n.push({start:e,end:i,state:"on"===o[t].state?"on":"off"})}return{segments:n,startTime:i,endTime:e}}static get styles(){return[super.styles,Ui,Ii,a`
        ha-card { height: 100%; overflow: hidden; display: flex; flex-direction: column; }
        .body { padding: 8px 12px 4px; display: flex; flex-direction: column; gap: 6px; }
        .mod-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mod-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--secondary-text-color);
          min-width: 56px;
        }
        .mod-row eq-param-bar {
          flex: 1;
          --eq-bar-height: 6px;
          --eq-bar-fill-color: var(--gradient-hot, #f97316);
        }
        .mod-row:hover eq-param-bar {
          --eq-bar-height: 8px;
        }
        .mod-value {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 36px;
          text-align: right;
        }
        .max-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        input[type="range"] {
          flex: 1;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--secondary-background-color, rgba(0,0,0,0.08));
          border-radius: 2px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          border: 2px solid var(--card-background-color, #fff);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          border: 2px solid var(--card-background-color, #fff);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .timeline-section {
          padding: 6px 12px 0;
          border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
          margin-top: 2px;
        }
        .timeline-label {
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
          opacity: 0.7;
        }
      `]}render(){if(!this._config||!this.hass)return V;const t=Oi(this.hass),e=this._config,i=this._resolveEntityNumber(e.modulation_entity,0),r=this._resolveEntityNumber(e.max_modulation_entity,100),n=this._entityAttr(e.max_modulation_entity,"min")??0,o=this._entityAttr(e.max_modulation_entity,"max")??100,s=this._entityState(e.modulation_entity),a=s&&Lt(s,e.name,this.hass)||t("opentherm.modulation_card.default_title"),{segments:c,startTime:l,endTime:h}=this._buildTimelineData();return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:lightning-bolt",clickEntity:e.modulation_entity,title:a})}
        <div class="body">
          <div class="mod-row">
            <span class="mod-label">${t("opentherm.modulation_card.current")}</span>
            <eq-param-bar .min=${0} .max=${100} .value=${i}></eq-param-bar>
            <span class="mod-value">${i.toFixed(0)}%</span>
          </div>
          <div class="max-row">
            <span class="mod-label">${t("opentherm.modulation_card.max")}</span>
            <input type="range"
              .min=${String(n)}
              .max=${String(o)}
              .step=${"1"}
              .value=${String(r)}
              @change=${t=>this._setMaxModulation(parseFloat(t.target.value))}
            />
            <span class="mod-value">${r.toFixed(0)}%</span>
          </div>
        </div>
        <div class="timeline-section">
          <div class="timeline-label">Flame</div>
          <eq-binary-timeline
            .hass=${this.hass}
            .segments=${c}
            .startTime=${l}
            .endTime=${h}
          ></eq-binary-timeline>
        </div>
        ${e.show_last_updated?z`
          <div class="footer-meta">${this._renderLastUpdated(e.flame_entity)}</div>
        `:V}
      </ha-card>
    `}};t([mt()],pn.prototype,"_flameHistory",void 0),t([mt()],pn.prototype,"_cyclesPerHour",void 0),pn=t([ht(cn)],pn),console.info("%c OPENTHERM-CARDS %c 1.5.0 ","color: white; background: #0ea5e9; font-weight: bold;","color: #0ea5e9; background: white; font-weight: bold;");var mn=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function _n(t,e){return t===e||!(!mn(t)||!mn(e))}function fn(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!_n(t[i],e[i]))return!1;return!0}function gn(t,e){void 0===e&&(e=fn);var i=null;function r(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(i&&i.lastThis===this&&e(r,i.lastArgs))return i.lastResult;var o=t.apply(this,r);return i={lastResult:o,lastArgs:r,lastThis:this},o}return r.clear=function(){i=null},r}const yn={entity:function(t,e={}){return{name:t,required:e.required??!0,selector:{entity:{domain:e.domain,device_class:e.device_class}}}},number:function(t,e,i,r=1,n={}){return{name:t,required:n.required??!1,...void 0!==n.default&&{default:n.default},selector:{number:{min:e,max:i,step:r,mode:n.mode??"box",unit_of_measurement:n.unit_of_measurement}}}},text:function(t,e=!1){return{name:t,required:e,selector:{text:{}}}},entityName:function(t,e){return{name:t,selector:{entity_name:{}},context:e}},grid:function(t){return{type:"grid",name:"",schema:t}},expandable:function(t,e,i){return{type:"expandable",flatten:!0,title:t,icon:e,name:"",schema:i}}};let bn=class extends ct{constructor(){super(...arguments),this._getSchema=gn(t=>{const e=Oi(this.hass);return[yn.entity("climate_entity",{domain:"climate"}),yn.entityName("name",{entity:"climate_entity"}),yn.entity("outdoor_entity",{domain:["sensor","input_number"],device_class:"temperature"}),yn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_params_footer",selector:{boolean:{}},default:!0},{name:"tunable",selector:{boolean:{}},default:!1},...t?[yn.expandable(e("editor.tuning"),"mdi:tune-variant",[yn.entity("hc_entity",{domain:["number","input_number"]}),yn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],yn.expandable(e("editor.optional"),"mdi:connection",[yn.entity("curve_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),yn.entity("pid_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),yn.entity("rate_limiting_entity",{domain:["binary_sensor"],required:!1}),yn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1}),yn.entity("pid_correction_entity",{domain:["sensor","input_number"],device_class:"temperature",required:!1})]),yn.expandable(e("editor.curve_parameters"),"mdi:chart-bell-curve-cumulative",[yn.entity("hc_entity",{domain:["number","input_number"],required:!1}),yn.entity("shift_entity",{domain:["number","input_number"],required:!1}),yn.entity("n_entity",{domain:["number","input_number"],required:!1})])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value};try{hr(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema(!!this._config.tunable)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};bn.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],bn.prototype,"hass",void 0),t([mt()],bn.prototype,"_config",void 0),t([mt()],bn.prototype,"_error",void 0),bn=t([ht(pr)],bn);var vn=Object.freeze({__proto__:null,get StatusCardEditor(){return bn}});let wn=class extends ct{constructor(){super(...arguments),this._getSchema=gn((t,e,i)=>{const r=this.hass?.config?.unit_system?.temperature??"°C",n=t=>Math.round(10*Et(t,i))/10,o=t=>Math.round(10*Tt(t,i))/10,s=Oi(this.hass);return[yn.entity("climate_entity",{domain:"climate"}),yn.entityName("name",{entity:"climate_entity"}),yn.entity("outdoor_entity",{domain:["sensor","input_number"],device_class:"temperature"}),yn.entity("curve_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),yn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"tunable",selector:{boolean:{}},default:!1},{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_kpi_footer",selector:{boolean:{}},default:!0},{name:"show_params_footer",selector:{boolean:{}},default:!0},...e?[yn.expandable(s("editor.tuning"),"mdi:tune-variant",[yn.entity("hc_entity",{domain:["number","input_number"]}),yn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],yn.expandable(s("editor.optional"),"mdi:connection",[yn.entity("pid_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),yn.entity("rate_limiting_entity",{domain:["binary_sensor"],required:!1}),yn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1})]),yn.expandable(s("editor.curve_parameters"),"mdi:chart-bell-curve",[{name:"curve_from_entities",selector:{boolean:{}}},...t?[yn.entity("hc_entity",{domain:"number"}),yn.entity("n_entity",{domain:"number"}),yn.entity("shift_entity",{domain:"number"}),yn.entity("min_flow_entity",{domain:["sensor","number"],required:!1}),yn.entity("max_flow_entity",{domain:["sensor","number"],required:!1})]:[yn.grid([yn.number("hc",.5,3,.1,{default:.9}),yn.number("n",1,2,.05,{default:1.25})]),yn.number("shift",o(-15),o(15),1,{unit_of_measurement:r,default:o(0)}),yn.grid([yn.number("min_flow",n(15),n(35),1,{unit_of_measurement:r,default:n(20)}),yn.number("max_flow",n(50),n(90),1,{unit_of_measurement:r,default:n(70)})])]]),yn.expandable(s("editor.display_range"),"mdi:arrow-expand-horizontal",[yn.grid([yn.number("t_out_min",n(-30),n(5),1,{unit_of_measurement:r,default:n(-20)}),yn.number("t_out_max",n(0),n(30),1,{unit_of_measurement:r,default:n(20)})])])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(!this._config)return;const e={...{...this._config,...t.detail.value}};if($t(this.hass)){null!=e.shift&&(e.shift=Ct(e.shift,!0));for(const t of["min_flow","max_flow","t_out_min","t_out_max"])null!=e[t]&&(e[t]=St(e[t],!0))}try{Pr(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){if(!this.hass||!this._config)return V;const t=$t(this.hass),e={...this._config};if(t){null!=e.shift&&(e.shift=Math.round(10*Tt(e.shift,!0))/10);for(const t of["min_flow","max_flow","t_out_min","t_out_max"])null!=e[t]&&(e[t]=Math.round(10*Et(e[t],!0))/10)}return z`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${this._getSchema(!!this._config.curve_from_entities,!!this._config.tunable,t)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}};wn.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],wn.prototype,"hass",void 0),t([mt()],wn.prototype,"_config",void 0),t([mt()],wn.prototype,"_error",void 0),wn=t([ht(Er)],wn);var xn=Object.freeze({__proto__:null,get EquithermCurveCardEditor(){return wn}});let $n=class extends ct{constructor(){super(...arguments),this._getSchema=gn((t,e)=>{const i=Oi(this.hass);return[yn.entity("weather_entity",{domain:"weather"}),yn.entity("climate_entity",{domain:"climate"}),yn.entityName("name",{entity:"climate_entity"}),yn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_kpi_footer",selector:{boolean:{}},default:!0},{name:"show_params_footer",selector:{boolean:{}},default:!0},{name:"tunable",selector:{boolean:{}},default:!1},...e?[yn.expandable(i("editor.tuning"),"mdi:tune-variant",[yn.entity("hc_entity",{domain:["number","input_number"]}),yn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],yn.expandable(i("editor.optional"),"mdi:connection",[yn.entity("outdoor_entity",{domain:["sensor","number","input_number"],device_class:"temperature",required:!1}),yn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1})]),yn.expandable(i("editor.forecast_settings"),"mdi:clock-outline",[yn.number("hours",1,48,1,{unit_of_measurement:"h",default:24})]),yn.expandable(i("editor.curve_parameters"),"mdi:chart-bell-curve",[{name:"curve_from_entities",selector:{boolean:{}}},...t?[yn.entity("hc_entity",{domain:"number"}),yn.entity("n_entity",{domain:"number"}),yn.entity("shift_entity",{domain:"number"}),yn.entity("min_flow_entity",{domain:["sensor","number"],required:!1}),yn.entity("max_flow_entity",{domain:["sensor","number"],required:!1})]:[yn.grid([yn.number("hc",.5,3,.1,{default:.9}),yn.number("n",1,2,.05,{default:1.25})]),yn.number("shift",-15,15,1,{unit_of_measurement:"°C",default:0}),yn.grid([yn.number("min_flow",15,35,1,{unit_of_measurement:"°C",default:20}),yn.number("max_flow",50,90,1,{unit_of_measurement:"°C",default:70})])]])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(!this._config)return;const e={...this._config,...t.detail.value};try{qr(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema(!!this._config.curve_from_entities,!!this._config.tunable)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};$n.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],$n.prototype,"hass",void 0),t([mt()],$n.prototype,"_config",void 0),t([mt()],$n.prototype,"_error",void 0),$n=t([ht(Or)],$n);var En=Object.freeze({__proto__:null,get EquithermForecastCardEditor(){return $n}});let Sn=class extends ct{constructor(){super(...arguments),this._getSchema=gn(()=>{const t=Oi(this.hass);return[yn.entity("boiler_temp_entity",{domain:["sensor","input_number"],device_class:"temperature"}),yn.entityName("name",{entity:"boiler_temp_entity"}),yn.entity("return_temp_entity",{domain:["sensor","input_number"],device_class:"temperature"}),yn.entity("flame_entity",{domain:["binary_sensor","input_boolean"]}),{name:"show_last_updated",selector:{boolean:{}}},yn.expandable(t("editor.optional"),"mdi:connection",[yn.entity("setpoint_entity",{domain:["sensor","number","input_number"],device_class:"temperature",required:!1}),yn.entity("modulation_entity",{domain:["sensor","input_number"],required:!1}),yn.entity("ch_active_entity",{domain:["binary_sensor","input_boolean"],required:!1}),yn.entity("dhw_active_entity",{domain:["binary_sensor","input_boolean"],required:!1})])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value};try{Kr(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};Sn.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],Sn.prototype,"hass",void 0),t([mt()],Sn.prototype,"_config",void 0),t([mt()],Sn.prototype,"_error",void 0),Sn=t([ht(zr)],Sn);var Tn=Object.freeze({__proto__:null,get OtStatusCardEditor(){return Sn}});let Cn=class extends ct{constructor(){super(...arguments),this._getSchema=gn(()=>{const t=Oi(this.hass);return[yn.entity("dhw_enable_entity",{domain:["switch","input_boolean"]}),yn.entityName("name",{entity:"dhw_enable_entity"}),yn.entity("dhw_setpoint_entity",{domain:["number","input_number"]}),{name:"show_last_updated",selector:{boolean:{}}},yn.expandable(t("editor.optional"),"mdi:connection",[yn.entity("dhw_active_entity",{domain:["binary_sensor","input_boolean"],required:!1}),yn.entity("dhw_temp_entity",{domain:["sensor","input_number"],required:!1})])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value};try{Qr(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};Cn.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],Cn.prototype,"hass",void 0),t([mt()],Cn.prototype,"_config",void 0),t([mt()],Cn.prototype,"_error",void 0),Cn=t([ht(Zr)],Cn);var Hn=Object.freeze({__proto__:null,get OtDhwCardEditor(){return Cn}});let An=class extends ct{constructor(){super(...arguments),this._getSchema=gn(()=>{const t=Oi(this.hass);return[yn.entity("boiler_temp_entity",{domain:["sensor","input_number"]}),yn.entityName("name",{entity:"boiler_temp_entity"}),yn.entity("return_temp_entity",{domain:["sensor","input_number"]}),yn.expandable(t("editor.optional"),"mdi:connection",[yn.number("condensing_threshold",30,80,1,{unit_of_measurement:"°C"}),yn.number("hours",1,48,1),{name:"show_last_updated",selector:{boolean:{}}}])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value};try{on(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};An.styles=a`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],An.prototype,"hass",void 0),t([mt()],An.prototype,"_config",void 0),t([mt()],An.prototype,"_error",void 0),An=t([ht(rn)],An);var Nn=Object.freeze({__proto__:null,get OtEfficiencyCardEditor(){return An}});let kn=class extends ct{constructor(){super(...arguments),this._getSchema=gn(()=>{const t=Oi(this.hass);return[yn.entity("modulation_entity",{domain:["sensor","input_number"]}),yn.entity("max_modulation_entity",{domain:["number","input_number"]}),yn.entity("flame_entity",{domain:["binary_sensor","input_boolean"]}),yn.entityName("name",{entity:"modulation_entity"}),{name:"show_last_updated",selector:{boolean:{}}},yn.expandable(t("editor.optional"),"mdi:tune",[{name:"hours",selector:{number:{min:1,max:24,step:1,mode:"box"}}}])]}),this._computeLabel=t=>{const e=Oi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Oi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}setConfig(t){this._config={...t}}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value};try{un(e),this._error=void 0,Nt(this,"config-changed",{config:e})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}};kn.styles=a`
    ha-form { display: block; }
    ha-expandable { margin: 8px 0; --ha-card-border-radius: 8px; }
  `,t([pt({attribute:!1})],kn.prototype,"hass",void 0),t([mt()],kn.prototype,"_config",void 0),t([mt()],kn.prototype,"_error",void 0),kn=t([ht(ln)],kn);var Pn=Object.freeze({__proto__:null,get OtModulationCardEditor(){return kn}});
