function t(t,e,i,r){var n,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s<3?n(o):s>3?n(e,i,o):n(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=t=>new s("string"==typeof t?t:t+"",void 0,r),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(i,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",y=_.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!h(t,e),E={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=E){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??E}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),n=e.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const s=n.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(void 0!==t){const s=this.constructor;if(!1===r&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??w)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,y?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,S=t=>t,T=$.trustedTypes,C=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+H,P=`<${N}>`,D=document,k=()=>D.createComment(""),B=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,I="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,L=/>/g,F=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,q=/"/g,G=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,X=D.createTreeWalker(D,129);function K(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let n,s=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===O?"!--"===l[1]?o=R:void 0!==l[1]?o=L:void 0!==l[2]?(G.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=F):void 0!==l[3]&&(o=F):o===F?">"===l[0]?(o=n??O,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?F:'"'===l[3]?q:U):o===q||o===U?o=F:o===R||o===L?o=O:(o=F,n=void 0);const u=o===F&&t[e+1].startsWith("/>")?" ":"";s+=o===O?i+P:h>=0?(r.push(a),i.slice(0,h)+A+i.slice(h)+H+u):i+H+(-2===h?e:u)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Z{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,s=0;const o=t.length-1,a=this.parts,[l,h]=Y(t,e);if(this.el=Z.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=X.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=h[s++],i=r.getAttribute(t).split(H),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?rt:"@"===o[1]?nt:et}),r.removeAttribute(t)}else t.startsWith(H)&&(a.push({type:6,index:n}),r.removeAttribute(t));if(G.test(r.tagName)){const t=r.textContent.split(H),e=t.length-1;if(e>0){r.textContent=T?T.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],k()),X.nextNode(),a.push({type:2,index:++n});r.append(t[e],k())}}}else if(8===r.nodeType)if(r.data===N)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(H,t+1));)a.push({type:7,index:n}),t+=H.length-1}n++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,r){if(e===j)return e;let n=void 0!==r?i._$Co?.[r]:i._$Cl;const s=B(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??D).importNode(e,!0);X.currentNode=r;let n=X.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new tt(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}s!==a?.index&&(n=X.nextNode(),s++)}return X.currentNode=D,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),B(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new tt(this.O(k()),this.O(k()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const n=this.strings;let s=!1;if(void 0===n)t=J(this,t,e,0),s=!B(t)||t!==this._$AH&&t!==j,s&&(this._$AH=t);else{const r=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=J(this,r[i+o],e,o),a===j&&(a=this._$AH[o]),s||=!B(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}s&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends et{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===j)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(Z,tt),($.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let lt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let n=r._$litPart$;if(void 0===n){const t=i?.renderBefore??null;r._$litPart$=n=new tt(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ht=at.litElementPolyfillSupport;ht?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:w},dt=(t=ut,e,i)=>{const{kind:r,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,n,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const n=this[r];e.call(this,i),this.requestUpdate(r,n,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return pt({...t,state:!0,attribute:!1})}const _t={pulse:"@keyframes pulse {\n        0% {\n            opacity: 1;\n        }\n        50% {\n            opacity: 0;\n        }\n        100% {\n            opacity: 1;\n        }\n    }",spin:"@keyframes spin {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }",cleaning:"@keyframes cleaning {\n        0% {\n            transform: rotate(0) translate(0);\n        }\n        5% {\n            transform: rotate(0) translate(0, -3px);\n        }\n        10% {\n            transform: rotate(0) translate(0, 1px);\n        }\n        15% {\n            transform: rotate(0) translate(0);\n        }\n\n        20% {\n            transform: rotate(30deg) translate(0);\n        }\n        25% {\n            transform: rotate(30deg) translate(0, -3px);\n        }\n        30% {\n            transform: rotate(30deg) translate(0, 1px);\n        }\n        35% {\n            transform: rotate(30deg) translate(0);\n        }\n        40% {\n            transform: rotate(0) translate(0);\n        }\n\n        45% {\n            transform: rotate(-30deg) translate(0);\n        }\n        50% {\n            transform: rotate(-30deg) translate(0, -3px);\n        }\n        55% {\n            transform: rotate(-30deg) translate(0, 1px);\n        }\n        60% {\n            transform: rotate(-30deg) translate(0);\n        }\n        70% {\n            transform: rotate(0deg) translate(0);\n        }\n        100% {\n            transform: rotate(0deg);\n        }\n    }",returning:"@keyframes returning {\n        0% {\n            transform: rotate(0);\n        }\n        25% {\n            transform: rotate(20deg);\n        }\n        50% {\n            transform: rotate(0);\n        }\n        75% {\n            transform: rotate(-20deg);\n        }\n        100% {\n            transform: rotate(0);\n        }\n    }"};a`
    ${o(_t.pulse)}
  `,a`
    ${o(_t.spin)}
  `,a`
    ${o(_t.cleaning)}
  `,a`
    ${o(_t.returning)}
  `;const ft=a`
  ${o(Object.values(_t).join("\n"))}
`,gt=a`
  --rgb-error-color: 219, 68, 55;
  --default-green: 76, 175, 80;
  --default-orange: 255, 152, 0;
  --default-red: 244, 67, 54;
  --default-disabled: 189, 189, 189;
`,yt=a`
  --default-disabled: 111, 111, 111;
`,bt=a`
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
`,vt=a`
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
`,wt=1.8;function Et(t){return"°F"===t?.config?.unit_system?.temperature}function xt(t,e){return e?t*wt+32:t}function $t(t,e){return e?(t-32)/wt:t}function St(t,e){return e?t*wt:t}function Tt(t,e){return e?t/wt:t}function Ct(t){return!!t&&t.themes.darkMode}class At extends lt{updated(t){if(super.updated(t),t.has("hass")&&this.hass){const e=Ct(t.get("hass")),i=Ct(this.hass);e!==i&&this.toggleAttribute("dark-mode",i)}}get _isImperial(){return Et(this.hass)}_toDisplayTemp(t){return xt(t,this._isImperial)}_fromDisplayTemp(t){return $t(t,this._isImperial)}_toDisplayDelta(t){return St(t,this._isImperial)}_fromDisplayDelta(t){return Tt(t,this._isImperial)}static get styles(){return[ft,a`
        :host {
          display: block;
          height: 100%;
          ${gt}
        }
        :host([dark-mode]) {
          ${yt}
        }
        :host {
          ${vt}
          ${bt}
        }
      `]}}t([pt({attribute:!1})],At.prototype,"hass",void 0);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht=1,Nt=t=>(...e)=>({_$litDirective$:t,values:e});let Pt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt="important",kt=" !"+Dt,Bt=Nt(class extends Pt{constructor(t){if(super(t),t.type!==Ht||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return null==r?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const r=e[t];if(null!=r){this.ft.add(t);const e="string"==typeof r&&r.endsWith(kt);t.includes("-")||e?i.setProperty(t,e?r.slice(0,-11):r,e?Dt:""):i[t]=r}}return j}}),Mt=(t,e,i,r)=>{r=r||{},i=null==i?{}:i;const n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=i,t.dispatchEvent(n),n},It=t=>t.substring(0,t.indexOf("."));const Ot=t=>(t.name_by_user||t.name)?.trim(),Rt=t=>{return e=t.entity_id,void 0===(i=t.attributes).friendly_name?(t=>t.slice(t.indexOf(".")+1))(e).replace(/_/g," "):(i.friendly_name??"").toString();var e,i},Lt=[" ",": "," - "],Ft=t=>t.toLowerCase()!==t,Ut=(t,e,i)=>{const r=e[t.entity_id];return r?qt(r,i):Rt(t)},qt=(t,e)=>{const i=t.name||("original_name"in t&&null!=t.original_name?String(t.original_name):void 0),r=t.device_id?e[t.device_id]:void 0;if(!r)return i;const n=Ot(r);return n!==i?n&&i&&((t,e)=>{const i=t.toLowerCase(),r=e.toLowerCase();for(const e of Lt){const n=`${r}${e}`;if(i.startsWith(n)){const e=t.substring(n.length);if(e.length)return Ft(e.substring(0,e.indexOf(" ")))?e:e[0].toUpperCase()+e.slice(1)}}})(i,n)||i:void 0},Gt=(t,e,i,r)=>{const{entities:n,devices:s,areas:o,floors:a}=i;if("string"==typeof e)return e;if(!e)return Rt(t);let l=null==(h=e)||Array.isArray(h)?h:[h];var h;if(l.every(t=>"text"===t.type))return l.map(t=>"text"in t?t.text:"").join(" ");const c=((t,e,i)=>!Ut(t,e,i))(t,n,s);if(c){const t=l.some(t=>"device"===t.type);t||(l=l.map(t=>"entity"===t.type?{type:"device"}:t))}const u=zt(t,l,n,s,o,a);return 1===u.length?u[0]||"":u.filter(t=>t).join(" ")},zt=(t,e,i,r,n,s)=>{const{device:o,area:a,floor:l}=((t,e,i,r,n)=>{const s=e[t.entity_id];if(!s)return{entity:null,device:null,area:null,floor:null};const o=e[s.entity_id],a=s.device_id,l=a?i[a]:void 0,h=s.area_id||l?.area_id,c=h?r[h]:void 0,u=c?.floor_id;return{entity:o||null,device:l||null,area:c||null,floor:(u?n[u]:void 0)||null}})(t,i,r,n,s);return e.map(e=>{switch(e.type){case"entity":return Ut(t,i,r);case"device":return o?Ot(o):void 0;case"area":return a?(t=>t.name?.trim())(a):void 0;case"floor":return l?(t=>t.name?.trim())(l):void 0;case"text":return e.text;default:return""}})};var jt=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function Vt(t,e){return t===e||!(!jt(t)||!jt(e))}function Wt(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!Vt(t[i],e[i]))return!1;return!0}function Xt(t,e){void 0===e&&(e=Wt);var i=null;function r(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(i&&i.lastThis===this&&e(r,i.lastArgs))return i.lastResult;var s=t.apply(this,r);return i={lastResult:s,lastArgs:r,lastThis:this},s}return r.clear=function(){i=null},r}const Kt=Xt(t=>{if("language"===t.time_format||"system"===t.time_format){const e="language"===t.time_format?t.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(e).includes("10")}return"12"===t.time_format}),Yt=(t,e)=>Zt(e).format(t),Zt=Xt(t=>new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hourCycle:Kt(t)?"h12":"h23"}));var Jt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.quote_decimal="quote_decimal",t.space_comma="space_comma",t.none="none"}(Jt||(Jt={}));const Qt=(t,e,i)=>te(t,e,i).map(t=>t.value).join(""),te=(t,e,i)=>{const r=e?(t=>{switch(t.number_format){case Jt.comma_decimal:return["en-US","en"];case Jt.decimal_comma:return["de","es","it"];case Jt.space_comma:return["fr","sv","cs"];case Jt.quote_decimal:return["de-CH"];case Jt.system:return;default:return t.language}})(e):void 0;return e?.number_format===Jt.none||Number.isNaN(Number(t))?Number.isNaN(Number(t))||""===t||e?.number_format!==Jt.none?[{type:"literal",value:t}]:new Intl.NumberFormat("en-US",ee(t,{...i,useGrouping:!1})).formatToParts(Number(t)):new Intl.NumberFormat(r,ee(t,i)).formatToParts(Number(t))},ee=(t,e)=>{const i={maximumFractionDigits:2,...e};if("string"!=typeof t)return i;if(!e||void 0===e.minimumFractionDigits&&void 0===e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i},ie={cooling:"cool",defrosting:"heat",drying:"dry",fan:"fan_only",heating:"heat",idle:"off",off:"off",preheating:"heat"};function re(t,e){const i=e&&e.cache?e.cache:ce,r=e&&e.serializer?e.serializer:le;return(e&&e.strategy?e.strategy:ae)(t,{cache:i,serializer:r})}function ne(t,e,i,r){const n=null==(s=r)||"number"==typeof s||"boolean"==typeof s?r:i(r);var s;let o=e.get(n);return void 0===o&&(o=t.call(this,r),e.set(n,o)),o}function se(t,e,i){const r=Array.prototype.slice.call(arguments,3),n=i(r);let s=e.get(n);return void 0===s&&(s=t.apply(this,r),e.set(n,s)),s}function oe(t,e,i,r,n){return i.bind(e,t,r,n)}function ae(t,e){return oe(t,this,1===t.length?ne:se,e.cache.create(),e.serializer)}const le=function(){return JSON.stringify(arguments)};class he{cache;constructor(){this.cache=Object.create(null)}get(t){return this.cache[t]}set(t,e){this.cache[t]=e}}const ce={create:function(){return new he}},ue={variadic:function(t,e){return oe(t,this,se,e.cache.create(),e.serializer)}},de=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function pe(t){const e={};return t.replace(de,t=>{const i=t.length;switch(t[0]){case"G":e.era=4===i?"long":5===i?"narrow":"short";break;case"y":e.year=2===i?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":e.month=["numeric","2-digit","short","long","narrow"][i-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":e.day=["numeric","2-digit"][i-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":e.weekday=4===i?"long":5===i?"narrow":"short";break;case"e":if(i<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"c":if(i<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"a":e.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":e.hourCycle="h12",e.hour=["numeric","2-digit"][i-1];break;case"H":e.hourCycle="h23",e.hour=["numeric","2-digit"][i-1];break;case"K":e.hourCycle="h11",e.hour=["numeric","2-digit"][i-1];break;case"k":e.hourCycle="h24",e.hour=["numeric","2-digit"][i-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":e.minute=["numeric","2-digit"][i-1];break;case"s":e.second=["numeric","2-digit"][i-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":e.timeZoneName=i<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),e}const me=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function _e(t){return t.replace(/^(.*?)-/,"")}const fe=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,ge=/^(@+)?(\+|#+)?[rs]?$/g,ye=/(\*)(0+)|(#+)(0+)|(0+)/g,be=/^(0+)$/;function ve(t){const e={};return"r"===t[t.length-1]?e.roundingPriority="morePrecision":"s"===t[t.length-1]&&(e.roundingPriority="lessPrecision"),t.replace(ge,function(t,i,r){return"string"!=typeof r?(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length):"+"===r?e.minimumSignificantDigits=i.length:"#"===i[0]?e.maximumSignificantDigits=i.length:(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length+("string"==typeof r?r.length:0)),""}),e}function we(t){switch(t){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function Ee(t){let e;if("E"===t[0]&&"E"===t[1]?(e={notation:"engineering"},t=t.slice(2)):"E"===t[0]&&(e={notation:"scientific"},t=t.slice(1)),e){const i=t.slice(0,2);if("+!"===i?(e.signDisplay="always",t=t.slice(2)):"+?"===i&&(e.signDisplay="exceptZero",t=t.slice(2)),!be.test(t))throw new Error("Malformed concise eng/scientific notation");e.minimumIntegerDigits=t.length}return e}function xe(t){const e=we(t);return e||{}}function $e(t){let e={};for(const i of t){switch(i.stem){case"percent":case"%":e.style="percent";continue;case"%x100":e.style="percent",e.scale=100;continue;case"currency":e.style="currency",e.currency=i.options[0];continue;case"group-off":case",_":e.useGrouping=!1;continue;case"precision-integer":case".":e.maximumFractionDigits=0;continue;case"measure-unit":case"unit":e.style="unit",e.unit=_e(i.options[0]);continue;case"compact-short":case"K":e.notation="compact",e.compactDisplay="short";continue;case"compact-long":case"KK":e.notation="compact",e.compactDisplay="long";continue;case"scientific":e={...e,notation:"scientific",...i.options.reduce((t,e)=>({...t,...xe(e)}),{})};continue;case"engineering":e={...e,notation:"engineering",...i.options.reduce((t,e)=>({...t,...xe(e)}),{})};continue;case"notation-simple":e.notation="standard";continue;case"unit-width-narrow":e.currencyDisplay="narrowSymbol",e.unitDisplay="narrow";continue;case"unit-width-short":e.currencyDisplay="code",e.unitDisplay="short";continue;case"unit-width-full-name":e.currencyDisplay="name",e.unitDisplay="long";continue;case"unit-width-iso-code":e.currencyDisplay="symbol";continue;case"scale":e.scale=parseFloat(i.options[0]);continue;case"rounding-mode-floor":e.roundingMode="floor";continue;case"rounding-mode-ceiling":e.roundingMode="ceil";continue;case"rounding-mode-down":e.roundingMode="trunc";continue;case"rounding-mode-up":e.roundingMode="expand";continue;case"rounding-mode-half-even":e.roundingMode="halfEven";continue;case"rounding-mode-half-down":e.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":e.roundingMode="halfExpand";continue;case"integer-width":if(i.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");i.options[0].replace(ye,function(t,i,r,n,s,o){if(i)e.minimumIntegerDigits=r.length;else{if(n&&s)throw new Error("We currently do not support maximum integer digits");if(o)throw new Error("We currently do not support exact integer digits")}return""});continue}if(be.test(i.stem)){e.minimumIntegerDigits=i.stem.length;continue}if(fe.test(i.stem)){if(i.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");i.stem.replace(fe,function(t,i,r,n,s,o){return"*"===r?e.minimumFractionDigits=i.length:n&&"#"===n[0]?e.maximumFractionDigits=n.length:s&&o?(e.minimumFractionDigits=s.length,e.maximumFractionDigits=s.length+o.length):(e.minimumFractionDigits=i.length,e.maximumFractionDigits=i.length),""});const t=i.options[0];"w"===t?e={...e,trailingZeroDisplay:"stripIfInteger"}:t&&(e={...e,...ve(t)});continue}if(ge.test(i.stem)){e={...e,...ve(i.stem)};continue}const t=we(i.stem);t&&(e={...e,...t});const r=Ee(i.stem);r&&(e={...e,...r})}return e}let Se=function(t){return t[t.literal=0]="literal",t[t.argument=1]="argument",t[t.number=2]="number",t[t.date=3]="date",t[t.time=4]="time",t[t.select=5]="select",t[t.plural=6]="plural",t[t.pound=7]="pound",t[t.tag=8]="tag",t}({}),Te=function(t){return t[t.number=0]="number",t[t.dateTime=1]="dateTime",t}({});function Ce(t){return t.type===Se.literal}function Ae(t){return t.type===Se.argument}function He(t){return t.type===Se.number}function Ne(t){return t.type===Se.date}function Pe(t){return t.type===Se.time}function De(t){return t.type===Se.select}function ke(t){return t.type===Se.plural}function Be(t){return t.type===Se.pound}function Me(t){return t.type===Se.tag}function Ie(t){return!(!t||"object"!=typeof t||t.type!==Te.number)}function Oe(t){return!(!t||"object"!=typeof t||t.type!==Te.dateTime)}let Re=function(t){return t[t.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",t[t.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",t[t.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",t[t.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",t[t.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",t[t.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",t[t.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",t[t.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",t[t.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",t[t.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",t[t.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",t[t.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",t[t.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",t[t.INVALID_TAG=23]="INVALID_TAG",t[t.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",t[t.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",t[t.UNCLOSED_TAG=27]="UNCLOSED_TAG",t}({});const Le=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,Fe={"001":["H","h"],419:["h","H","hB","hb"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["h","H","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["h","H","hB","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["h","H","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["h","H","hB","hb"],CU:["h","H","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["h","H","hB","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GS:["H","h","hb","hB"],GT:["h","H","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["h","H","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["h","H","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["h","H","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["h","H","hB","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["h","H","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["h","H","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["h","H","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"en-HK":["h","hb","H","hB"],"en-IL":["H","h","hb","hB"],"en-MY":["h","hb","H","hB"],"es-BR":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ku-SY":["H","hB"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function Ue(t){let e=t.hourCycle;if(void 0===e&&t.hourCycles&&t.hourCycles.length&&(e=t.hourCycles[0]),e)switch(e){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}const i=t.language;let r;"root"!==i&&(r=t.maximize().region);return(Fe[r||""]||Fe[i||""]||Fe[`${i}-001`]||Fe["001"])[0]}const qe=new RegExp(`^${Le.source}*`),Ge=new RegExp(`${Le.source}*$`);function ze(t,e){return{start:t,end:e}}const je=!!Object.fromEntries,Ve=!!String.prototype.trimStart,We=!!String.prototype.trimEnd,Xe=je?Object.fromEntries:function(t){const e={};for(const[i,r]of t)e[i]=r;return e},Ke=Ve?function(t){return t.trimStart()}:function(t){return t.replace(qe,"")},Ye=We?function(t){return t.trimEnd()}:function(t){return t.replace(Ge,"")},Ze=new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");class Je{message;position;locale;ignoreTag;requiresOtherClause;shouldParseSkeletons;constructor(t,e={}){this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!e.ignoreTag,this.locale=e.locale,this.requiresOtherClause=!!e.requiresOtherClause,this.shouldParseSkeletons=!!e.shouldParseSkeletons}parse(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)}parseMessage(t,e,i){let r=[];for(;!this.isEOF();){const n=this.char();if(123===n){const e=this.parseArgument(t,i);if(e.err)return e;r.push(e.val)}else{if(125===n&&t>0)break;if(35!==n||"plural"!==e&&"selectordinal"!==e){if(60===n&&!this.ignoreTag&&47===this.peek()){if(i)break;return this.error(Re.UNMATCHED_CLOSING_TAG,ze(this.clonePosition(),this.clonePosition()))}if(60===n&&!this.ignoreTag&&Qe(this.peek()||0)){const i=this.parseTag(t,e);if(i.err)return i;r.push(i.val)}else{const i=this.parseLiteral(t,e);if(i.err)return i;r.push(i.val)}}else{const t=this.clonePosition();this.bump(),r.push({type:Se.pound,location:ze(t,this.clonePosition())})}}}return{val:r,err:null}}parseTag(t,e){const i=this.clonePosition();this.bump();const r=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:Se.literal,value:`<${r}/>`,location:ze(i,this.clonePosition())},err:null};if(this.bumpIf(">")){const n=this.parseMessage(t+1,e,!0);if(n.err)return n;const s=n.val,o=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Qe(this.char()))return this.error(Re.INVALID_TAG,ze(o,this.clonePosition()));const t=this.clonePosition();return r!==this.parseTagName()?this.error(Re.UNMATCHED_CLOSING_TAG,ze(t,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:Se.tag,value:r,children:s,location:ze(i,this.clonePosition())},err:null}:this.error(Re.INVALID_TAG,ze(o,this.clonePosition())))}return this.error(Re.UNCLOSED_TAG,ze(i,this.clonePosition()))}return this.error(Re.INVALID_TAG,ze(i,this.clonePosition()))}parseTagName(){const t=this.offset();for(this.bump();!this.isEOF()&&ti(this.char());)this.bump();return this.message.slice(t,this.offset())}parseLiteral(t,e){const i=this.clonePosition();let r="";for(;;){const i=this.tryParseQuote(e);if(i){r+=i;continue}const n=this.tryParseUnquoted(t,e);if(n){r+=n;continue}const s=this.tryParseLeftAngleBracket();if(!s)break;r+=s}const n=ze(i,this.clonePosition());return{val:{type:Se.literal,value:r,location:n},err:null}}tryParseLeftAngleBracket(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(Qe(t=this.peek()||0)||47===t)?null:(this.bump(),"<");var t}tryParseQuote(t){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===t||"selectordinal"===t)break;return null;default:return null}this.bump();const e=[this.char()];for(this.bump();!this.isEOF();){const t=this.char();if(39===t){if(39!==this.peek()){this.bump();break}e.push(39),this.bump()}else e.push(t);this.bump()}return String.fromCodePoint(...e)}tryParseUnquoted(t,e){if(this.isEOF())return null;const i=this.char();return 60===i||123===i||35===i&&("plural"===e||"selectordinal"===e)||125===i&&t>0?null:(this.bump(),String.fromCodePoint(i))}parseArgument(t,e){const i=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(Re.EXPECT_ARGUMENT_CLOSING_BRACE,ze(i,this.clonePosition()));if(125===this.char())return this.bump(),this.error(Re.EMPTY_ARGUMENT,ze(i,this.clonePosition()));let r=this.parseIdentifierIfPossible().value;if(!r)return this.error(Re.MALFORMED_ARGUMENT,ze(i,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(Re.EXPECT_ARGUMENT_CLOSING_BRACE,ze(i,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:Se.argument,value:r,location:ze(i,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(Re.EXPECT_ARGUMENT_CLOSING_BRACE,ze(i,this.clonePosition())):this.parseArgumentOptions(t,e,r,i);default:return this.error(Re.MALFORMED_ARGUMENT,ze(i,this.clonePosition()))}}parseIdentifierIfPossible(){const t=this.clonePosition(),e=this.offset(),i=function(t,e){return Ze.lastIndex=e,Ze.exec(t)[1]??""}(this.message,e),r=e+i.length;this.bumpTo(r);return{value:i,location:ze(t,this.clonePosition())}}parseArgumentOptions(t,e,i,r){let n=this.clonePosition(),s=this.parseIdentifierIfPossible().value,o=this.clonePosition();switch(s){case"":return this.error(Re.EXPECT_ARGUMENT_TYPE,ze(n,o));case"number":case"date":case"time":{this.bumpSpace();let t=null;if(this.bumpIf(",")){this.bumpSpace();const e=this.clonePosition(),i=this.parseSimpleArgStyleIfPossible();if(i.err)return i;const r=Ye(i.val);if(0===r.length)return this.error(Re.EXPECT_ARGUMENT_STYLE,ze(this.clonePosition(),this.clonePosition()));t={style:r,styleLocation:ze(e,this.clonePosition())}}const e=this.tryParseArgumentClose(r);if(e.err)return e;const n=ze(r,this.clonePosition());if(t&&t.style.startsWith("::")){let e=Ke(t.style.slice(2));if("number"===s){const r=this.parseNumberSkeletonFromString(e,t.styleLocation);return r.err?r:{val:{type:Se.number,value:i,location:n,style:r.val},err:null}}{if(0===e.length)return this.error(Re.EXPECT_DATE_TIME_SKELETON,n);let r=e;this.locale&&(r=function(t,e){let i="";for(let r=0;r<t.length;r++){const n=t.charAt(r);if("j"===n){let s=0;for(;r+1<t.length&&t.charAt(r+1)===n;)s++,r++;let o=1+(1&s),a=s<2?1:3+(s>>1),l="a",h=Ue(e);for("H"!=h&&"k"!=h||(a=0);a-- >0;)i+=l;for(;o-- >0;)i=h+i}else i+="J"===n?"H":n}return i}(e,this.locale));const o={type:Te.dateTime,pattern:r,location:t.styleLocation,parsedOptions:this.shouldParseSkeletons?pe(r):{}};return{val:{type:"date"===s?Se.date:Se.time,value:i,location:n,style:o},err:null}}}return{val:{type:"number"===s?Se.number:"date"===s?Se.date:Se.time,value:i,location:n,style:t?.style??null},err:null}}case"plural":case"selectordinal":case"select":{const n=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(Re.EXPECT_SELECT_ARGUMENT_OPTIONS,ze(n,{...n}));this.bumpSpace();let o=this.parseIdentifierIfPossible(),a=0;if("select"!==s&&"offset"===o.value){if(!this.bumpIf(":"))return this.error(Re.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,ze(this.clonePosition(),this.clonePosition()));this.bumpSpace();const t=this.tryParseDecimalInteger(Re.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,Re.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(t.err)return t;this.bumpSpace(),o=this.parseIdentifierIfPossible(),a=t.val}const l=this.tryParsePluralOrSelectOptions(t,s,e,o);if(l.err)return l;const h=this.tryParseArgumentClose(r);if(h.err)return h;const c=ze(r,this.clonePosition());return"select"===s?{val:{type:Se.select,value:i,options:Xe(l.val),location:c},err:null}:{val:{type:Se.plural,value:i,options:Xe(l.val),offset:a,pluralType:"plural"===s?"cardinal":"ordinal",location:c},err:null}}default:return this.error(Re.INVALID_ARGUMENT_TYPE,ze(n,o))}}tryParseArgumentClose(t){return this.isEOF()||125!==this.char()?this.error(Re.EXPECT_ARGUMENT_CLOSING_BRACE,ze(t,this.clonePosition())):(this.bump(),{val:!0,err:null})}parseSimpleArgStyleIfPossible(){let t=0;const e=this.clonePosition();for(;!this.isEOF();){switch(this.char()){case 39:{this.bump();let t=this.clonePosition();if(!this.bumpUntil("'"))return this.error(Re.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,ze(t,this.clonePosition()));this.bump();break}case 123:t+=1,this.bump();break;case 125:if(!(t>0))return{val:this.message.slice(e.offset,this.offset()),err:null};t-=1;break;default:this.bump()}}return{val:this.message.slice(e.offset,this.offset()),err:null}}parseNumberSkeletonFromString(t,e){let i=[];try{i=function(t){if(0===t.length)throw new Error("Number skeleton cannot be empty");const e=t.split(me).filter(t=>t.length>0),i=[];for(const t of e){let e=t.split("/");if(0===e.length)throw new Error("Invalid number skeleton");const[r,...n]=e;for(const t of n)if(0===t.length)throw new Error("Invalid number skeleton");i.push({stem:r,options:n})}return i}(t)}catch{return this.error(Re.INVALID_NUMBER_SKELETON,e)}return{val:{type:Te.number,tokens:i,location:e,parsedOptions:this.shouldParseSkeletons?$e(i):{}},err:null}}tryParsePluralOrSelectOptions(t,e,i,r){let n=!1;const s=[],o=new Set;let{value:a,location:l}=r;for(;;){if(0===a.length){const t=this.clonePosition();if("select"===e||!this.bumpIf("="))break;{const e=this.tryParseDecimalInteger(Re.EXPECT_PLURAL_ARGUMENT_SELECTOR,Re.INVALID_PLURAL_ARGUMENT_SELECTOR);if(e.err)return e;l=ze(t,this.clonePosition()),a=this.message.slice(t.offset,this.offset())}}if(o.has(a))return this.error("select"===e?Re.DUPLICATE_SELECT_ARGUMENT_SELECTOR:Re.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,l);"other"===a&&(n=!0),this.bumpSpace();const r=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===e?Re.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:Re.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,ze(this.clonePosition(),this.clonePosition()));const h=this.parseMessage(t+1,e,i);if(h.err)return h;const c=this.tryParseArgumentClose(r);if(c.err)return c;s.push([a,{value:h.val,location:ze(r,this.clonePosition())}]),o.add(a),this.bumpSpace(),({value:a,location:l}=this.parseIdentifierIfPossible())}return 0===s.length?this.error("select"===e?Re.EXPECT_SELECT_ARGUMENT_SELECTOR:Re.EXPECT_PLURAL_ARGUMENT_SELECTOR,ze(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!n?this.error(Re.MISSING_OTHER_CLAUSE,ze(this.clonePosition(),this.clonePosition())):{val:s,err:null}}tryParseDecimalInteger(t,e){let i=1;const r=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(i=-1);let n=!1,s=0;for(;!this.isEOF();){const t=this.char();if(!(t>=48&&t<=57))break;n=!0,s=10*s+(t-48),this.bump()}const o=ze(r,this.clonePosition());return n?(s*=i,Number.isSafeInteger(s)?{val:s,err:null}:this.error(e,o)):this.error(t,o)}offset(){return this.position.offset}isEOF(){return this.offset()===this.message.length}clonePosition(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}}char(){const t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");const e=this.message.codePointAt(t);if(void 0===e)throw Error(`Offset ${t} is at invalid UTF-16 code unit boundary`);return e}error(t,e){return{val:null,err:{kind:t,message:this.message,location:e}}}bump(){if(this.isEOF())return;const t=this.char();10===t?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}bumpIf(t){if(this.message.startsWith(t,this.offset())){for(let e=0;e<t.length;e++)this.bump();return!0}return!1}bumpUntil(t){const e=this.offset(),i=this.message.indexOf(t,e);return i>=0?(this.bumpTo(i),!0):(this.bumpTo(this.message.length),!1)}bumpTo(t){if(this.offset()>t)throw Error(`targetOffset ${t} must be greater than or equal to the current offset ${this.offset()}`);for(t=Math.min(t,this.message.length);;){const e=this.offset();if(e===t)break;if(e>t)throw Error(`targetOffset ${t} is at invalid UTF-16 code unit boundary`);if(this.bump(),this.isEOF())break}}bumpSpace(){for(;!this.isEOF()&&ei(this.char());)this.bump()}peek(){if(this.isEOF())return null;const t=this.char(),e=this.offset();return this.message.charCodeAt(e+(t>=65536?2:1))??null}}function Qe(t){return t>=97&&t<=122||t>=65&&t<=90}function ti(t){return 45===t||46===t||t>=48&&t<=57||95===t||t>=97&&t<=122||t>=65&&t<=90||183==t||t>=192&&t<=214||t>=216&&t<=246||t>=248&&t<=893||t>=895&&t<=8191||t>=8204&&t<=8205||t>=8255&&t<=8256||t>=8304&&t<=8591||t>=11264&&t<=12271||t>=12289&&t<=55295||t>=63744&&t<=64975||t>=65008&&t<=65533||t>=65536&&t<=983039}function ei(t){return t>=9&&t<=13||32===t||133===t||t>=8206&&t<=8207||8232===t||8233===t}function ii(t){t.forEach(t=>{if(delete t.location,De(t)||ke(t))for(const e in t.options)delete t.options[e].location,ii(t.options[e].value);else He(t)&&Ie(t.style)||(Ne(t)||Pe(t))&&Oe(t.style)?delete t.style.location:Me(t)&&ii(t.children)})}function ri(t,e={}){e={shouldParseSkeletons:!0,requiresOtherClause:!0,...e};const i=new Je(t,e).parse();if(i.err){const t=SyntaxError(Re[i.err.kind]);throw t.location=i.err.location,t.originalMessage=i.err.message,t}return e?.captureLocation||ii(i.val),i.val}let ni=function(t){return t.MISSING_VALUE="MISSING_VALUE",t.INVALID_VALUE="INVALID_VALUE",t.MISSING_INTL_API="MISSING_INTL_API",t}({});class si extends Error{code;originalMessage;constructor(t,e,i){super(t),this.code=e,this.originalMessage=i}toString(){return`[formatjs Error: ${this.code}] ${this.message}`}}class oi extends si{constructor(t,e,i,r){super(`Invalid values for "${t}": "${e}". Options are "${Object.keys(i).join('", "')}"`,ni.INVALID_VALUE,r)}}class ai extends si{constructor(t,e,i){super(`Value for "${t}" must be of type ${e}`,ni.INVALID_VALUE,i)}}class li extends si{constructor(t,e){super(`The intl string context variable "${t}" was not provided to the string "${e}"`,ni.MISSING_VALUE,e)}}let hi=function(t){return t[t.literal=0]="literal",t[t.object=1]="object",t}({});function ci(t){return"function"==typeof t}function ui(t,e,i,r,n,s,o){if(1===t.length&&Ce(t[0]))return[{type:hi.literal,value:t[0].value}];const a=[];for(const l of t){if(Ce(l)){a.push({type:hi.literal,value:l.value});continue}if(Be(l)){"number"==typeof s&&a.push({type:hi.literal,value:i.getNumberFormat(e).format(s)});continue}const{value:t}=l;if(!n||!(t in n))throw new li(t,o);let h=n[t];if(Ae(l))h&&"string"!=typeof h&&"number"!=typeof h&&"bigint"!=typeof h||(h="string"==typeof h||"number"==typeof h||"bigint"==typeof h?String(h):""),a.push({type:"string"==typeof h?hi.literal:hi.object,value:h});else{if(Ne(l)){const t="string"==typeof l.style?r.date[l.style]:Oe(l.style)?l.style.parsedOptions:void 0;a.push({type:hi.literal,value:i.getDateTimeFormat(e,t).format(h)});continue}if(Pe(l)){const t="string"==typeof l.style?r.time[l.style]:Oe(l.style)?l.style.parsedOptions:r.time.medium;a.push({type:hi.literal,value:i.getDateTimeFormat(e,t).format(h)});continue}if(He(l)){const t="string"==typeof l.style?r.number[l.style]:Ie(l.style)?l.style.parsedOptions:void 0;if(t&&t.scale){const e=t.scale||1;if("bigint"==typeof h){if(!Number.isInteger(e))throw new TypeError(`Cannot apply fractional scale ${e} to bigint value. Scale must be an integer when formatting bigint.`);h*=BigInt(e)}else h*=e}a.push({type:hi.literal,value:i.getNumberFormat(e,t).format(h)});continue}if(Me(l)){const{children:t,value:h}=l,c=n[h];if(!ci(c))throw new ai(h,"function",o);let u=c(ui(t,e,i,r,n,s).map(t=>t.value));Array.isArray(u)||(u=[u]),a.push(...u.map(t=>({type:"string"==typeof t?hi.literal:hi.object,value:t})))}if(De(l)){const t=h,s=(Object.prototype.hasOwnProperty.call(l.options,t)?l.options[t]:void 0)||l.options.other;if(!s)throw new oi(l.value,h,Object.keys(l.options),o);a.push(...ui(s.value,e,i,r,n));continue}if(ke(l)){const t=`=${h}`;let s=Object.prototype.hasOwnProperty.call(l.options,t)?l.options[t]:void 0;if(!s){if(!Intl.PluralRules)throw new si('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',ni.MISSING_INTL_API,o);const t="bigint"==typeof h?Number(h):h,r=i.getPluralRules(e,{type:l.pluralType}).select(t-(l.offset||0));s=(Object.prototype.hasOwnProperty.call(l.options,r)?l.options[r]:void 0)||l.options.other}if(!s)throw new oi(l.value,h,Object.keys(l.options),o);const c="bigint"==typeof h?Number(h):h;a.push(...ui(s.value,e,i,r,n,c-(l.offset||0)));continue}}}return(l=a).length<2?l:l.reduce((t,e)=>{const i=t[t.length-1];return i&&i.type===hi.literal&&e.type===hi.literal?i.value+=e.value:t.push(e),t},[]);var l}function di(t,e){return e?Object.keys(t).reduce((i,r)=>{var n,s;return i[r]=(n=t[r],(s=e[r])?{...n,...s,...Object.keys(n).reduce((t,e)=>(t[e]={...n[e],...s[e]},t),{})}:n),i},{...t}):t}function pi(t){return{create:()=>({get:e=>t[e],set(e,i){t[e]=i}})}}class mi{ast;locales;resolvedLocale;formatters;formats;message;formatterCache={number:{},dateTime:{},pluralRules:{}};constructor(t,e=mi.defaultLocale,i,r){if(this.locales=e,this.resolvedLocale=mi.resolveLocale(e),"string"==typeof t){if(this.message=t,!mi.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");const{...e}=r||{};this.ast=mi.__parse(t,{...e,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=di(mi.formats,i),this.formatters=r&&r.formatters||function(t={number:{},dateTime:{},pluralRules:{}}){return{getNumberFormat:re((...t)=>new Intl.NumberFormat(...t),{cache:pi(t.number),strategy:ue.variadic}),getDateTimeFormat:re((...t)=>new Intl.DateTimeFormat(...t),{cache:pi(t.dateTime),strategy:ue.variadic}),getPluralRules:re((...t)=>new Intl.PluralRules(...t),{cache:pi(t.pluralRules),strategy:ue.variadic})}}(this.formatterCache)}format=t=>{const e=this.formatToParts(t);if(1===e.length)return e[0].value;const i=e.reduce((t,e)=>(t.length&&e.type===hi.literal&&"string"==typeof t[t.length-1]?t[t.length-1]+=e.value:t.push(e.value),t),[]);return i.length<=1?i[0]||"":i};formatToParts=t=>ui(this.ast,this.locales,this.formatters,this.formats,t,void 0,this.message);resolvedOptions=()=>({locale:this.resolvedLocale?.toString()||Intl.NumberFormat.supportedLocalesOf(this.locales)[0]});getAst=()=>this.ast;static memoizedDefaultLocale=null;static get defaultLocale(){return mi.memoizedDefaultLocale||(mi.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),mi.memoizedDefaultLocale}static resolveLocale=t=>{if(void 0===Intl.Locale)return;const e=Intl.NumberFormat.supportedLocalesOf(t);return e.length>0?new Intl.Locale(e[0]):new Intl.Locale("string"==typeof t?t:t[0])};static __parse=ri;static formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}}}var _i={outdoor:"Outdoor",flow:"Flow",room:"Room",adjusting:"Adjusting",heating:"Heating",cooling:"Cooling",drying:"Drying",idle:"Idle",off:"Off",fan:"Fan",defrosting:"Defrosting",preheating:"Preheating",not_found:"{entity} not found",wwsd:"Standby",wwsd_label:"Outdoor temperature meets room setpoint",manual:"Manual",manual_override:"Manual override"},fi={name:"Equitherm Status Card",description:"Display heating status with temperature readings",default_title:"Heating Status"},gi={name:"Equitherm Curve Card",description:"Interactive heating curve visualization",default_title:"Heating Curve",flow_temp:"Flow Temp",outdoor_axis_suffix:"outdoor",flow_axis_suffix:"flow"},yi={default_title:"Curve Tuning",current:"Current",proposed:"Proposed",apply:"Apply",applying:"Applying...",applied:"Applied",reset:"Reset",outdoor_axis_suffix:"outdoor",flow_axis_suffix:"flow",edit:"Edit",hc_short:"HC",shift_short:"Shift",tune:"Tune"},bi={name:"Equitherm Forecast Card",description:"Heating forecast based on weather predictions",default_title:"Heating Forecast",flow_temp:"Flow Temp",outdoor_temp:"Outdoor",peak:"Peak"},vi={required:"Required",optional:"Optional",appearance:"Appearance",climate_entity:"Climate Entity",outdoor_entity:"Outdoor Temperature",flow_entity:"Flow Setpoint",curve_output_entity:"Curve Output",pid_output_entity:"PID Output",rate_limiting_entity:"Rate Limiting",pid_active_entity:"PID Active",wws_entity:"WWS Active",title:"Title (optional)",name:"Name",entities:"Entities",curve_parameters:"Curve Parameters",display_range:"Display Range",curve_from_entities:"Live parameters from device",hc_entity:"Heat Curve Entity",n_entity:"Exponent Entity",shift_entity:"Shift Entity",hc:"Heat Curve (hc)",n:"Exponent (n)",shift:"Shift",min_flow:"Min Flow",max_flow:"Max Flow",min_flow_entity:"Min Flow Entity",max_flow_entity:"Max Flow Entity",t_out_min:"Min Outdoor",t_out_max:"Max Outdoor",weather_entity:"Weather Entity",hours:"Hours",forecast_settings:"Forecast",recalculate_service:"Recalculate Service",tunable:"Enable Tuning",tuning:"Tuning",advanced:"Advanced",show_last_updated:"Show last updated",show_kpi_footer:"Show temperatures",show_params_footer:"Show curve parameters",pid_correction_entity:"PID Correction",pid_proportional_entity:"PID Proportional",pid_integral_entity:"PID Integral",pid_derivative_entity:"PID Derivative",boiler_temp_entity:"Boiler Flow Temperature",return_temp_entity:"Return Temperature",flame_entity:"Flame Status",setpoint_entity:"Flow Setpoint",modulation_entity:"Modulation Level",max_modulation_entity:"Max Modulation Entity",ch_active_entity:"Central Heating Active",dhw_active_entity:"DHW Active",dhw_enable_entity:"DHW Enable",dhw_setpoint_entity:"DHW Setpoint",dhw_temp_entity:"DHW Temperature",condensing_threshold:"Condensing Threshold",display:"Display",helper:{curve_from_entities:"Read from ESPHome runtime-tunable numbers instead of static values",hc:"How aggressively heating responds to cold — increase if room is too cold in winter",n:"Radiator type — 1.0 underfloor, 1.25 panel (default), 1.3 cast iron",shift:"Move the whole curve up or down — increase if too cold in mild weather",min_flow:"Minimum boiler output, prevents condensation and protects heat exchanger",max_flow:"Maximum boiler output, protects system and limits energy use",t_out_min:"Left edge of chart (coldest outdoor temperature displayed)",t_out_max:"Right edge of chart (warmest outdoor temperature displayed)",hours:"Number of hours of data to display",hc_entity:"Runtime-adjustable heat curve coefficient number",n_entity:"Runtime-adjustable radiator exponent number",shift_entity:"Runtime-adjustable curve shift number",curve_output_entity:"Pure heating curve output before PID and rate limiting",pid_output_entity:"Curve output after PID correction (before rate limiting)",rate_limiting_entity:"ON when output is ramping to prevent thermal shock",pid_active_entity:"ON when at least one PID gain (kp, ki, kd) is non-zero",outdoor_entity:"Overrides the weather entity's current temperature for footer display",min_flow_entity:"Runtime-adjustable minimum flow temperature number",max_flow_entity:"Runtime-adjustable maximum flow temperature number",recalculate_service:"Service to call after applying a value, e.g. climate.equitherm_force_recalculate. Only called if the service exists.",tunable:"Show tuning controls to adjust hc and shift values interactively",show_last_updated:"Display when sensor data was last received",show_kpi_footer:"Display outdoor, flow, and room temperature readings",show_params_footer:"Display HC, n, and Shift curve parameters",pid_correction_entity:"Total PID correction applied to the curve output",pid_proportional_entity:"Proportional term output (response to current error)",pid_integral_entity:"Integral term output (response to accumulated error)",pid_derivative_entity:"Derivative term output (response to error rate of change)",boiler_temp_entity:"Boiler flow (supply) water temperature sensor",return_temp_entity:"Return water temperature sensor",flame_entity:"Binary sensor indicating boiler flame is on",setpoint_entity:"Target flow temperature setpoint",modulation_entity:"Current boiler modulation level (%)",ch_active_entity:"Recommended to avoid false positives during DHW cycles. If absent, flame is used as proxy.",dhw_active_entity:"Binary sensor indicating domestic hot water is actively heating",dhw_temp_entity:"DHW temperature sensor showing current hot water temperature"}},wi={status_card:{name:"OpenTherm Status",description:"Boiler status at a glance",default_title:"Boiler",flow:"Flow",return:"Return",modulation:"Modulation",flame:"Flame",ch:"CH",dhw:"DHW"},dhw_card:{name:"OpenTherm DHW",description:"Domestic hot water control",default_title:"Hot Water",enable:"Enable",setpoint:"Setpoint",dhw:"DHW"},efficiency_card:{name:"OpenTherm Efficiency",description:"Boiler condensing efficiency chart",default_title:"Efficiency",temp_axis:"Temperature",condensing:"Condensing",non_condensing:"Non-condensing",too_hot:"Return too hot"},modulation_card:{name:"OpenTherm Modulation",description:"Boiler modulation and short-cycle diagnostics",default_title:"Modulation",current:"Current",max:"Max",cycles_per_hour:"cycles/h"}},Ei={common:_i,status_card:fi,curve_card:gi,tuning_dialog:yi,forecast_card:bi,editor:vi,opentherm:wi},xi={outdoor:"Extérieur",flow:"Départ",room:"Pièce",adjusting:"Ajustement",heating:"Chauffage",cooling:"Refroidissement",drying:"Déshumidification",idle:"Inactif",off:"Éteint",fan:"Ventilation",defrosting:"Dégivrage",preheating:"Préchauffage",not_found:"{entity} introuvable",wwsd:"Veille",wwsd_label:"Température extérieure ≥ consigne"},$i={name:"Carte Status Equitherm",description:"Affiche le statut du chauffage avec les températures",default_title:"Statut Chauffage"},Si={name:"Carte Courbe Equitherm",description:"Visualisation interactive de la courbe de chauffage",default_title:"Courbe de Chauffage",flow_temp:"Temp. Départ",outdoor_axis_suffix:"extérieur",flow_axis_suffix:"départ"},Ti={default_title:"Réglage Courbe",current:"Actuelle",proposed:"Proposée",apply:"Appliquer",applying:"Application...",applied:"Appliqué",reset:"Réinitialiser",outdoor_axis_suffix:"extérieur",flow_axis_suffix:"départ",edit:"Régler",hc_short:"HC",shift_short:"Décalage",tune:"Régler"},Ci={name:"Carte Prévision Equitherm",description:"Prévision de chauffage basée sur les prévisions météo",default_title:"Prévision Chauffage",flow_temp:"Temp. Départ",outdoor_temp:"Extérieur",peak:"Pic"},Ai={required:"Requis",optional:"Optionnel",appearance:"Apparence",climate_entity:"Entité Climat",outdoor_entity:"Température Extérieure",flow_entity:"Consigne Départ",curve_output_entity:"Sortie Courbe",pid_output_entity:"Sortie PID",rate_limiting_entity:"Limitation",pid_active_entity:"PID Actif",wws_entity:"WWS Actif",title:"Titre (optionnel)",name:"Nom",entities:"Entités",curve_parameters:"Paramètres Courbe",display_range:"Plage d'Affichage",curve_from_entities:"Paramètres live depuis l'appareil",hc_entity:"Entité Coeff. Courbe",n_entity:"Entité Exposant",shift_entity:"Entité Décalage",hc:"Coeff. Courbe (hc)",n:"Exposant (n)",shift:"Décalage",min_flow:"Départ Min",max_flow:"Départ Max",min_flow_entity:"Entité Départ Min",max_flow_entity:"Entité Départ Max",t_out_min:"Extérieur Min",t_out_max:"Extérieur Max",weather_entity:"Entité Météo",hours:"Heures",forecast_settings:"Prévision",recalculate_service:"Service de Recalcul",tunable:"Activer le Réglage",tuning:"Réglage",advanced:"Avancé",show_last_updated:"Afficher dernière mise à jour",show_kpi_footer:"Afficher les températures",show_params_footer:"Afficher les paramètres de courbe",pid_correction_entity:"Correction PID",pid_proportional_entity:"PID Proportionnel",pid_integral_entity:"PID Intégral",pid_derivative_entity:"PID Dérivé",boiler_temp_entity:"Température Départ Chaudière",return_temp_entity:"Température Retour",flame_entity:"Statut Flamme",setpoint_entity:"Consigne Départ",modulation_entity:"Niveau Modulation",max_modulation_entity:"Entité modulation max",ch_active_entity:"Chauffage Central Actif",dhw_active_entity:"ECS Actif",dhw_enable_entity:"ECS Activé",dhw_setpoint_entity:"Consigne ECS",dhw_temp_entity:"Température ECS",condensing_threshold:"Seuil de Condensation",display:"Affichage",helper:{curve_from_entities:"Lire depuis les nombres ESPHome ajustables au lieu de valeurs statiques",hc:"Agressivité du chauffage par temps froid — augmenter si la pièce est trop froide en hiver",n:"Type de radiateur — 1.0 plancher chauffant, 1.25 panneau (défaut), 1.3 fonte",shift:"Décaler toute la courbe vers le haut ou le bas — augmenter si trop froid par temps doux",min_flow:"Sortie minimale de la chaudière, évite la condensation et protège l'échangeur",max_flow:"Sortie maximale de la chaudière, protège le système et limite la consommation",t_out_min:"Bord gauche du graphique (température extérieure la plus froide affichée)",t_out_max:"Bord droit du graphique (température extérieure la plus chaude affichée)",hours:"Nombre d'heures de données à afficher",hc_entity:"Nombre ajustable du coefficient de courbe de chauffage",n_entity:"Nombre ajustable de l'exposant de radiateur",shift_entity:"Nombre ajustable du décalage de courbe",curve_output_entity:"Sortie pure de la courbe de chauffage avant PID et limitation",pid_output_entity:"Sortie de courbe après correction PID (avant limitation)",rate_limiting_entity:"ON quand la sortie est en rampe pour éviter le choc thermique",pid_active_entity:"ON quand au moins un gain PID (kp, ki, kd) est non nul",outdoor_entity:"Remplace la température actuelle de l'entité météo pour l'affichage",min_flow_entity:"Nombre ajustable de la température de départ minimale",max_flow_entity:"Nombre ajustable de la température de départ maximale",recalculate_service:"Service à appeler après l'application d'une valeur, ex. climate.equitherm_force_recalculate. Appelé uniquement si le service existe.",tunable:"Afficher les commandes de réglage pour ajuster hc et shift interactivement",show_last_updated:"Afficher l'heure de la dernière réception des données du capteur",show_kpi_footer:"Afficher les températures extérieure, départ et pièce",show_params_footer:"Afficher les paramètres HC, n et Shift de la courbe",pid_correction_entity:"Correction totale du PID appliquée à la sortie de courbe",pid_proportional_entity:"Terme proportionnel (réponse à l'erreur actuelle)",pid_integral_entity:"Terme intégral (réponse à l'erreur accumulée)",pid_derivative_entity:"Terme dérivé (réponse à la vitesse de changement de l'erreur)",boiler_temp_entity:"Capteur de température d'eau de départ (supply) chaudière",return_temp_entity:"Capteur de température de retour d'eau",flame_entity:"Capteur binaire indiquant que la flamme chaudière est allumée",setpoint_entity:"Consigne de température de départ cible",modulation_entity:"Niveau actuel de modulation chaudière (%)",ch_active_entity:"Recommandé pour éviter les faux positifs lors des cycles ECS. Si absent, la flamme est utilisée comme proxy.",dhw_active_entity:"Capteur binaire indiquant que l'eau chaude sanitaire chauffe activement",dhw_temp_entity:"Capteur de température ECS affichant la température actuelle de l'eau chaude"}},Hi={status_card:{name:"Statut OpenTherm",description:"Statut chaudière en un coup d'œil",default_title:"Chaudière",flow:"Départ",return:"Retour",modulation:"Modulation",flamme:"Flamme",ch:"CH",dhw:"ECS"},dhw_card:{name:"OpenTherm ECS",description:"Contrôle de l'eau chaude sanitaire",default_title:"Eau Chaude",enable:"Activer",setpoint:"Consigne",dhw:"ECS"},efficiency_card:{name:"Efficacité OpenTherm",description:"Graphique d'efficacité de condensation chaudière",default_title:"Efficacité",temp_axis:"Température",condensing:"Condensation",non_condensing:"Sans condensation",too_hot:"Retour trop chaud"},modulation_card:{name:"Modulation OpenTherm",description:"Diagnostics modulation et court-cycles chaudière",default_title:"Modulation",current:"Actuelle",max:"Max",cycles_per_hour:"cycles/h"}},Ni={common:xi,status_card:$i,curve_card:Si,tuning_dialog:Ti,forecast_card:Ci,editor:Ai,opentherm:Hi};const Pi={en:Object.freeze({__proto__:null,common:_i,curve_card:gi,default:Ei,editor:vi,forecast_card:bi,opentherm:wi,status_card:fi,tuning_dialog:yi}),fr:Object.freeze({__proto__:null,common:xi,curve_card:Si,default:Ni,editor:Ai,forecast_card:Ci,opentherm:Hi,status_card:$i,tuning_dialog:Ti})};function Di(t,e){try{return t.split(".").reduce((t,e)=>t[e],Pi[e])}catch(t){return}}const ki=new Map;function Bi(t){const e=t?.locale.language??"en";let i=ki.get(e);return i||(i=function(t,i={}){let r=Di(t,e);if(r||(r=Di(t,"en")),!r)return t;try{return new mi(r,e).format(i)}catch(i){return console.error(`Error formatting message for key "${t}" with lang "${e}":`,i),r}},ki.set(e,i),i)}class Mi extends At{_entityState(t){if(t&&this.hass)return this.hass.states[t]}_entityAttr(t,e){return this._entityState(t)?.attributes?.[e]}_resolveEntityNumber(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:r}_resolveEntityTemp(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:this._fromDisplayTemp(r)}_entityExists(t){return!!this._entityState(t)}_formatEntityTemp(t){const e=this._entityState(t);return e?this.hass.formatEntityState(e):"—"}_formatCalcTemp(t){if(null==t||isNaN(t))return"—";const e=this._toDisplayTemp(t),i=this.hass?.config?.unit_system?.temperature??"°C";return`${Qt(e,this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} ${i}`}_openMoreInfo(t){t&&this.hass&&function(t,e,i,r){if(i&&"none"!==i.action)switch(i.action){case"more-info":Mt(t,"hass-more-info",{entityId:r});break;case"navigate":i.navigation_path&&(window.history.pushState(null,"",i.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(i.service){const[t,r]=i.service.split(".",2);e.callService(t,r,i.service_data??{})}break;case"url":i.url_path&&window.open(i.url_path,"_blank");break;case"assist":t.dispatchEvent(new CustomEvent("hass-assist",{bubbles:!0,composed:!0}))}}(this,this.hass,{action:"more-info"},t)}_titleEntity(){}_computeCardTitle(t){const e=Bi(this.hass)(t),i=this._entityState(this._titleEntity()),r=this._config.name;return i?Gt(i,r,this.hass)||r||e:r??e}_showFooterMeta(){return!!this._config?.show_last_updated}_lastUpdatedEntity(){}_isFooterVisible(){const t=this._lastUpdatedEntity(),e=this._entityState(t);if(!t||!e||!this.hass)return!1;const i="unavailable"===e.state||"unknown"===e.state,r=Date.now()-new Date(e.last_updated).getTime();return i||r>3e5}_renderFooterMeta(){if(!this._showFooterMeta()||!this._isFooterVisible())return V;const t=this._entityState(this._lastUpdatedEntity()),e="unavailable"===t.state||"unknown"===t.state;return z`
      <div class="footer-meta${e?" footer-meta--warn":""}">
        <ha-relative-time .hass=${this.hass} .datetime=${t.last_updated} capitalize></ha-relative-time>
      </div>
    `}_headerIconColor(){return"var(--rgb-disabled, 158,158,158)"}_renderHeaderIcon(t,e){return z`
      <ha-tile-icon
        .interactive=${!0}
        style=${Bt({"--tile-icon-color":`rgb(${this._headerIconColor()})`,"--tile-icon-size":"42px"})}
        @click=${()=>this._openMoreInfo(e)}
      >
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
    `:V}getGridOptions(){return{columns:6,rows:2,min_rows:1}}getCardSize(){return 2}}t([mt()],Mi.prototype,"_config",void 0);const Ii={heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",idle:"mdi:clock-outline",off:null,fan:"mdi:fan",defrosting:"mdi:snowflake-melt",preheating:"mdi:fire"};function Oi(t){return Ii[t??"off"]??null}function Ri(t){switch(t){case"heating":case"heat":return"heating";case"cooling":case"cool":return"cooling";case"drying":case"dry":return"drying";case"fan":case"fan_only":return"fan";case"defrosting":return"defrosting";case"preheating":return"preheating";case"off":return"off";default:return"idle"}}function Li(t){const e=ie[t]??"off";return`var(--rgb-state-climate-${"heat_cool"===e?"heat-cool":e})`}const Fi=new Set(["heating","cooling","drying","defrosting","preheating"]);function Ui(t,e){const i=Li(e),r=i.match(/var\((--[^)]+)\)/);if(!r)return i;const n=getComputedStyle(t).getPropertyValue(r[1]).trim();return n?`rgb(${n})`:i}function qi(t,e){return!!t.rate_limiting_entity&&"on"===e(t.rate_limiting_entity)?.state}function Gi(t){return t.pid_output_entity??t.curve_output_entity}function zi(t,e){if(!qi(t,e))return null;const i=Gi(t);if(!i)return null;const r=e(t.flow_entity),n=e(i);if(!r||!n)return null;const s=parseFloat(r.state),o=parseFloat(n.state);return isNaN(s)||isNaN(o)?null:s<o?"rising":s>o?"falling":null}let ji=class extends lt{constructor(){super(...arguments),this.min=0,this.max=100,this.value=null,this.centered=!1,this.indicator=!1,this.minFill=4,this.step=1,this.interactive=!1,this.hideDragTip=!1,this._pressed=!1,this._trackEl=null}_pct(t){const e=this.max-this.min;return 0===e?0:Math.max(0,Math.min(100,(t-this.min)/e*100))}_onRangeInput(t){const e=parseFloat(t.target.value);e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})))}_onPointerDown(t){this.interactive&&(this._pressed=!0,this._trackEl=t.currentTarget,this._trackEl.setPointerCapture(t.pointerId),this._updateFromPointer(t,!1))}_onPointerMove(t){this.interactive&&1&t.buttons&&this._updateFromPointer(t,!1)}_onPointerUp(t){this.interactive&&(this._pressed=!1,this._updateFromPointer(t,!0),this._trackEl=null,this.renderRoot.querySelector("input.sr-only")?.focus())}_onClick(t){this.interactive&&t.stopPropagation()}_onPointerCancel(){this._pressed=!1,this._trackEl=null}_updateFromPointer(t,e){const i=this._trackEl??this.renderRoot.querySelector(".track");if(!i)return;const r=i.getBoundingClientRect(),n=Math.max(0,Math.min(1,(t.clientX-r.left)/r.width)),s=this.min+n*(this.max-this.min),o=this.step||1,a=Math.round(s/o)*o,l=parseFloat(Math.max(this.min,Math.min(this.max,a)).toFixed(10));(e||l!==this.value)&&(this.value=l,this.dispatchEvent(new CustomEvent(e?"value-changed":"slider-moved",{detail:{value:l},bubbles:!0,composed:!0})))}render(){if(null===this.value)return z`<div class="track"></div>`;const t=this.color??"var(--eq-bar-fill-color)",e=t,i=this.interactive?z`<input
          type="range"
          class="sr-only"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.value??0}
          aria-valuetext="${this.value} ${this.ariaUnit??""}"
          @input=${this._onRangeInput}
        />`:V;if(this.centered){const r=this._pct(0),n=this._pct(this.value),s=Math.min(r,n),o=Math.abs(n-r);return z`
        <div class="track${this._pressed?" pressed":""}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @click=${this._onClick}
        >
          <div class="center-mark"></div>
          ${o>0?z`
            <div class="fill" style=${Bt({left:`${s}%`,width:`${o}%`,background:t,minWidth:`${this.minFill}px`})}></div>
          `:V}
          ${this.indicator?z`
            <div class="dot" style=${Bt({left:`${n}%`,background:e})}></div>
          `:V}
          ${this._pressed&&!this.hideDragTip?z`
            <span class="drag-tip" style=${Bt({"--tip-left":`${n}%`})}>${this.value}${this.ariaUnit?` ${this.ariaUnit}`:""}</span>
          `:V}
          ${i}
        </div>
      `}const r=this._pct(this.value);return z`
      <div class="track${this._pressed?" pressed":""}"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @click=${this._onClick}
      >
        <div class="fill" style=${Bt({width:`${r}%`,left:"0",background:t})}></div>
        ${this.indicator?z`
          <div class="dot" style=${Bt({left:`${r}%`,background:t})}></div>
        `:V}
        ${this._pressed&&!this.hideDragTip?z`
          <span class="drag-tip" style=${Bt({"--tip-left":`${r}%`})}>${this.value}${this.ariaUnit?` ${this.ariaUnit}`:""}</span>
        `:V}
        ${i}
      </div>
    `}};ji.styles=a`
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
  `,t([pt({type:Number})],ji.prototype,"min",void 0),t([pt({type:Number})],ji.prototype,"max",void 0),t([pt({type:Number,reflect:!0})],ji.prototype,"value",void 0),t([pt({type:Boolean})],ji.prototype,"centered",void 0),t([pt({type:Boolean})],ji.prototype,"indicator",void 0),t([pt({type:String})],ji.prototype,"color",void 0),t([pt({type:Number})],ji.prototype,"minFill",void 0),t([pt({type:Number})],ji.prototype,"step",void 0),t([pt({type:Boolean,reflect:!0})],ji.prototype,"interactive",void 0),t([pt({type:String})],ji.prototype,"ariaUnit",void 0),t([pt({type:Boolean})],ji.prototype,"hideDragTip",void 0),t([mt()],ji.prototype,"_pressed",void 0),ji=t([ct("eq-param-bar")],ji);const Vi=a`
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
`;class Wi extends Mi{constructor(){super(...arguments),this._showTuningDialog=!1,this._openTuningDialog=()=>{this._showTuningDialog=!0},this._onDeltaParamChanged=t=>{const e=t.target.dataset.entityId;if(!e||!this.hass)return;const i=this._fromDisplayDelta(t.detail.value);this.hass.callService(It(e),"set_value",{entity_id:e,value:i})},this._onParamChanged=t=>{const e=t.target.dataset.entityId;e&&this.hass&&this.hass.callService(It(e),"set_value",{entity_id:e,value:t.detail.value})}}get _climate(){return this._entityState(this._config.climate_entity)}get _isManualPreset(){return"Manual"===this._climate?.attributes.preset_mode}updated(t){super.updated(t),t.has("hass")&&this.hass&&this.toggleAttribute("manual-override",this._isManualPreset)}get _roomTemp(){const t=this._climate?.attributes.current_temperature;return this._formatCalcTemp(t)}get _outdoorTempFormatted(){return this._formatEntityTemp(this._config.outdoor_entity)}get _flowTempFormatted(){return this._formatEntityTemp(this._config.flow_entity)}get _curveOutputTempFormatted(){const t=Gi(this._config);return t?this._formatEntityTemp(t):""}get _isWWSD(){if(this._config?.wws_entity){const t=this._entityState(this._config.wws_entity);return"on"===t?.state}if(!this._config?.climate_entity)return!1;const t=this._climate?.attributes.temperature;if(null==t)return!1;if(!this._config.outdoor_entity)return!1;const e=this._entityState(this._config.outdoor_entity);if(!e)return!1;const i=parseFloat(e.state),r=isNaN(i)?NaN:this._fromDisplayTemp(i);return!isNaN(r)&&r>=t}_wwsdDescription(){const t=Bi(this.hass),e=this._climate?.attributes.temperature,i=this._config.outdoor_entity,r=i?this._entityState(i):void 0,n=r?this._fromDisplayTemp(parseFloat(r.state)):NaN;return isNaN(n)||null==e?t("common.wwsd_label"):`${t("common.outdoor")} ${this._formatEntityTemp(i)} ≥ ${this._formatCalcTemp(e)}`}_renderNotFound(t,e){if(!t||this._entityExists(t))return V;const i=Bi(this.hass);return z`
      <div class="not-found">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${i("common.not_found",{entity:e??t})}</span>
      </div>
    `}_titleEntity(){return this._config.climate_entity}_headerIconColor(){return Li(Ri(this._climate?.attributes.hvac_action??"off"))}_renderHeaderInfo(t,e){const i=void 0!==e?e===V?V:z`<span class="state">${e}</span>`:null!=this._climate?.attributes.temperature?z`<span class="state">· ${this._formatCalcTemp(this._climate.attributes.temperature)}</span>`:V;return z`
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
    `}_renderWwsdBadge(){if(!this._isWWSD)return V;const t=Bi(this.hass);return z`
      <eq-badge-info
        id="wwsd-badge"
        .label=${t("common.wwsd")}
        style=${"--badge-info-color: var(--rgb-warning, 255, 167, 38)"}
        .icon=${"mdi:weather-sunny-alert"}
        .active=${!0}
      ></eq-badge-info>
      <ha-tooltip for="wwsd-badge" placement="top" without-arrow>
        <span style="white-space: nowrap">${this._wwsdDescription()}</span>
      </ha-tooltip>
    `}_renderManualBadge(){if(!this._isManualPreset)return V;const t=Bi(this.hass);return z`
      <eq-badge-info
        .label=${t("common.manual")}
        style=${"--badge-info-color: var(--rgb-warning, 255, 167, 38)"}
        .icon=${"mdi:hand-back-right"}
      ></eq-badge-info>
    `}_renderHvacBadge(){const t=Bi(this.hass),e=Ri(this._climate?.attributes.hvac_action??"off"),i=t=>this._entityState(t),r=this._config,n=function(t,e,i=!1,r=null){if(i){const e="rising"===r?"mdi:trending-up":"falling"===r?"mdi:trending-down":"mdi:trending-neutral";return{label:t("common.adjusting"),color:Li("heating"),icon:e,active:!0}}return{label:t({heating:"common.heating",cooling:"common.cooling",drying:"common.drying",idle:"common.idle",off:"common.off",fan:"common.fan",defrosting:"common.defrosting",preheating:"common.preheating"}[e]),color:Li(e),icon:Oi(e)??void 0,active:Fi.has(e)}}(t,e,qi(r,i),zi(r,i));return z`
      <eq-badge-info
        .label=${n.label}
        style=${`--badge-info-color: ${n.color}`}
        .icon=${n.icon}
        .active=${n.active}
      ></eq-badge-info>
    `}_renderExtraBadges(){return V}_renderTuneButton(){return this._config.tunable?z`
      <ha-icon-button
        @click=${this._openTuningDialog}
        style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
      ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
    `:V}_renderHeaderBadges(){const t=this._isManualPreset;return z`
      <div class="badges">
        ${t?V:this._renderPidBadge()}
        ${t?V:this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderExtraBadges()}
        ${this._renderHvacBadge()}
        ${this._renderTuneButton()}
      </div>
    `}_renderKpiFooter(t){if(!1===this._config.show_kpi_footer)return V;if(!this._config||!this.hass)return V;const e=Bi(this.hass),i=t?.outdoorClickEntity??this._config.outdoor_entity,r=!this._entityExists(i),n=!this._entityExists(this._config.flow_entity),s=!this._entityExists(this._config.climate_entity);return z`
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
        <div class="kpi-block${s?" missing":""}" @click=${s?void 0:()=>this._openMoreInfo(this._config.climate_entity)}>
          <div class="kpi-value">${this._roomTemp}</div>
          <div class="kpi-label">${e("common.room")}</div>
        </div>
      </div>
    `}_getEntityRange(t,e,i){if(!t)return[e,i];return[this._entityAttr(t,"min")??e,this._entityAttr(t,"max")??i]}_getEntityStep(t,e){return t?this._entityAttr(t,"step")??e:e}_formatParamNum(t,e,i){return Qt(t,this.hass?.locale,{minimumFractionDigits:e,maximumFractionDigits:e,...i})}_renderDeltaParamItem(t,e,i,r,n){const s=this._resolveEntityNumber(e,i),[o,a]=this._getEntityRange(e,r[0],r[1]),l=this._getEntityStep(e,1),h=this._toDisplayDelta(s),c=this._toDisplayDelta(o),u=this._toDisplayDelta(a),d=this._toDisplayDelta(l),p=this.hass?.config?.unit_system?.temperature??"°C",m=this._formatParamNum(h,1,{signDisplay:"always"})+p,_=h>0?"positive":h<0?"negative":"",f=h>=0?"var(--success-color, #4caf50)":"var(--error-color, #e53935)",g=!!e&&!!this.hass;return z`
      <div class="param-item" @click=${n}>
        <span class="param-label">${t}</span>
        <span class="param-value ${_}">${m}</span>
        <eq-param-bar
          .min=${c} .max=${u} .step=${d}
          .value=${h} centered .color=${f} indicator
          ?interactive=${g}
          data-entity-id=${e}
          @value-changed=${g?this._onDeltaParamChanged:V}
        ></eq-param-bar>
      </div>
    `}_renderParamsFooter(t){if(!1===this._config.show_params_footer)return V;const e=[];if(t.hc){const i=t.hc.entity,r=this._resolveEntityNumber(i,t.hc.fallback),[n,s]=this._getEntityRange(i,.5,3),o=this._getEntityStep(i,.1),a=()=>t.hc.onClick?t.hc.onClick():this._openMoreInfo(i),l=!!i&&!!this.hass;e.push(z`
        <div class="param-item" @click=${a}>
          <span class="param-label">HC</span>
          <span class="param-value">${this._formatParamNum(r,2)}</span>
          <eq-param-bar
            .min=${n} .max=${s} .step=${o} .value=${r} indicator
            ?interactive=${l}
            data-entity-id=${i}
            @value-changed=${l?this._onParamChanged:V}
          ></eq-param-bar>
        </div>
      `)}if(t.n){const i=t.n.entity,r=this._resolveEntityNumber(i,t.n.fallback),[n,s]=this._getEntityRange(i,1,2),o=this._getEntityStep(i,.01),a=()=>t.n.onClick?t.n.onClick():this._openMoreInfo(i),l=!!i&&!!this.hass;e.push(z`
        <div class="param-item" @click=${a}>
          <span class="param-label">n</span>
          <span class="param-value">${this._formatParamNum(r,2)}</span>
          <eq-param-bar
            .min=${n} .max=${s} .step=${o} .value=${r} indicator
            ?interactive=${l}
            data-entity-id=${i}
            @value-changed=${l?this._onParamChanged:V}
          ></eq-param-bar>
        </div>
      `)}return t.shift&&e.push(this._renderDeltaParamItem("Shift",t.shift.entity,t.shift.fallback,[-15,15],()=>t.shift.onClick?t.shift.onClick():this._openMoreInfo(t.shift.entity))),t.pid_correction&&e.push(this._renderDeltaParamItem("Σ",t.pid_correction.entity,t.pid_correction.fallback??0,[-10,10],()=>this._openMoreInfo(t.pid_correction.entity))),0===e.length?V:z`<div class="params-footer">${e}</div>`}_renderTunableParamsFooter(t,e){const i=this._renderParamsFooter(t);return i===V?V:this._config.tunable?z`
      <div class="params-footer-tunable" @click=${e}>
        ${i}
        <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
      </div>
    `:i}}t([mt()],Wi.prototype,"_showTuningDialog",void 0),t([mt()],Wi.prototype,"_dialogConfig",void 0);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi=Nt(class extends Pt{constructor(t){if(super(t),t.type!==Ht||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const r=!!e[t];r===this.st.has(t)||this.nt?.has(t)||(r?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return j}});class Ki extends Wi{getGridOptions(){return{columns:12,rows:"auto",min_rows:3}}getCardSize(){return 3}get _hasFixedHeight(){const t=this._config?.grid_options,e=t?.rows;return"number"==typeof e}get _hasRows(){const t=this._config?.grid_options;return!!t?.rows}_formatChartTime(t){return Yt(new Date(t),this.hass.locale)}_formatChartDateTime(t){const e=new Date(t);return`${e.toLocaleDateString(this.hass?.locale?.language,{weekday:"short"})} ${Yt(e,this.hass.locale)}`}_updateChartConfig(){this._config&&this.hass&&(this._echartConfig=this._buildEChartOptions())}updated(t){if(super.updated(t),t.has("hass")){const e=t.get("hass"),i=e&&this.hass?.config?.unit_system?.temperature!==e.config?.unit_system?.temperature,r=e&&this.hass?.locale?.time_format!==e.locale?.time_format;(i||r)&&this._updateChartConfig()}}_onChartReconnected(){}_onChartDisconnecting(){}connectedCallback(){super.connectedCallback(),this._config&&this.hass&&this._onChartReconnected()}disconnectedCallback(){this._onChartDisconnecting(),super.disconnectedCallback()}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper ${Xi({"has-rows":this._hasRows})}">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          .height=${this._hasFixedHeight?"100%":void 0}
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
        flex: 1 1 200px;
        min-height: 0;
        position: relative;
      }
      .chart-wrapper ha-chart-base {
        height: 100%;
      }
      .chart-wrapper.has-rows {
        --chart-max-height: 100%;
      }
    `]}}t([mt()],Ki.prototype,"_echartConfig",void 0);class Yi extends lt{constructor(){super(...arguments),this._computeLabel=t=>{const e=Bi(this.hass),i=`editor.${t.name}`,r=e(i),n=r!==i?r:t.name;return!1===t.required?`${n} (${e("editor.optional")})`:n},this._computeHelper=t=>{const e=Bi(this.hass),i=`editor.helper.${t.name}`,r=e(i);return r!==i?r:""}}_transformConfig(t){return t}_getDisplayConfig(){return this._config}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value},i=this._transformConfig(e);try{this._validate(i),this._error=void 0,Mt(this,"config-changed",{config:i})}catch(t){this._error={base:t.message}}}render(){return this.hass&&this._config?z`
      <ha-form
        .hass=${this.hass}
        .data=${this._getDisplayConfig()}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}}Yi.styles=a`
    ha-form {
      display: block;
    }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `,t([pt({attribute:!1})],Yi.prototype,"hass",void 0),t([mt()],Yi.prototype,"_config",void 0),t([mt()],Yi.prototype,"_error",void 0);const Zi=a`
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
`,Ji=a`
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
`,Qi=a`
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
`,tr=a`
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
`;function er(t){const e=window;e.customCards=e.customCards||[];const i=t.type.replace("-card","").replace("equitherm-","");e.customCards.push({...t,preview:!0,documentationURL:`https://github.com/equitherm/lovelace/blob/main/docs/cards/${i}.md`})}const ir=t=>`${t}-editor`;class rr extends TypeError{constructor(t,e){let i;const{message:r,explanation:n,...s}=t,{path:o}=t,a=0===o.length?r:`At path: ${o.join(".")} -- ${r}`;super(n??a),null!=n&&(this.cause=a),Object.assign(this,s),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function nr(t){return"object"==typeof t&&null!=t}function sr(t){return nr(t)&&!Array.isArray(t)}function or(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function ar(t,e,i,r){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:n,branch:s}=e,{type:o}=i,{refinement:a,message:l=`Expected a value of type \`${o}\`${a?` with refinement \`${a}\``:""}, but received: \`${or(r)}\``}=t;return{value:r,type:o,refinement:a,key:n[n.length-1],path:n,branch:s,...t,message:l}}function*lr(t,e,i,r){(function(t){return nr(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const n of t){const t=ar(n,e,i,r);t&&(yield t)}}function*hr(t,e,i={}){const{path:r=[],branch:n=[t],coerce:s=!1,mask:o=!1}=i,a={path:r,branch:n,mask:o};s&&(t=e.coercer(t,a));let l="valid";for(const r of e.validator(t,a))r.explanation=i.message,l="not_valid",yield[r,void 0];for(let[h,c,u]of e.entries(t,a)){const e=hr(c,u,{path:void 0===h?r:[...r,h],branch:void 0===h?n:[...n,c],coerce:s,mask:o,message:i.message});for(const i of e)i[0]?(l=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):s&&(c=i[1],void 0===h?t=c:t instanceof Map?t.set(h,c):t instanceof Set?t.add(c):nr(t)&&(void 0!==c||h in t)&&(t[h]=c))}if("not_valid"!==l)for(const r of e.refiner(t,a))r.explanation=i.message,l="not_refined",yield[r,void 0];"valid"===l&&(yield[void 0,t])}class cr{constructor(t){const{type:e,schema:i,validator:r,refiner:n,coercer:s=t=>t,entries:o=function*(){}}=t;this.type=e,this.schema=i,this.entries=o,this.coercer=s,this.validator=r?(t,e)=>lr(r(t,e),e,this,t):()=>[],this.refiner=n?(t,e)=>lr(n(t,e),e,this,t):()=>[]}assert(t,e){return ur(t,this,e)}create(t,e){return function(t,e,i){const r=dr(t,e,{coerce:!0,message:i});if(r[0])throw r[0];return r[1]}(t,this,e)}is(t){return function(t,e){const i=dr(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const r=dr(t,e,{coerce:!0,mask:!0,message:i});if(r[0])throw r[0];return r[1]}(t,this,e)}validate(t,e={}){return dr(t,this,e)}}function ur(t,e,i){const r=dr(t,e,{message:i});if(r[0])throw r[0]}function dr(t,e,i={}){const r=hr(t,e,i),n=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(r);if(n[0]){const t=new rr(n[0],function*(){for(const t of r)t[0]&&(yield t[0])});return[t,void 0]}return[void 0,n[1]]}function pr(t,e){return new cr({type:t,schema:null,validator:e})}function mr(){return pr("any",()=>!0)}function _r(){return pr("boolean",t=>"boolean"==typeof t)}function fr(){return pr("number",t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${or(t)}`)}function gr(t){return new cr({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function yr(){return pr("string",t=>"string"==typeof t||`Expected a string, but received: ${or(t)}`)}function br(t){const e=Object.keys(t);return new cr({type:"type",schema:t,*entries(i){if(nr(i))for(const r of e)yield[r,i[r],t[r]]},validator:t=>sr(t)||`Expected an object, but received: ${or(t)}`,coercer:t=>sr(t)?{...t}:t})}const vr=br({type:yr(),climate_entity:yr(),outdoor_entity:yr(),flow_entity:yr(),curve_output_entity:gr(yr()),pid_output_entity:gr(yr()),rate_limiting_entity:gr(yr()),pid_active_entity:gr(yr()),pid_correction_entity:gr(yr()),wws_entity:gr(yr()),hc_entity:gr(yr()),shift_entity:gr(yr()),n_entity:gr(yr()),show_last_updated:gr(_r()),show_params_footer:gr(_r()),tunable:gr(_r()),recalculate_service:gr(yr()),name:gr(mr())});function wr(t){const e={...t};return"title"in e&&!("name"in e)&&(e.name=e.title),delete e.title,ur(e,vr),e}const Er="equitherm",xr=`${Er}-status-card`,$r=ir(xr),Sr=["climate"],Tr=["sensor"];function Cr(t){return Object.keys(t.states).find(t=>Sr.includes(It(t)))}function Ar(t){return Object.keys(t.states).find(t=>"weather"===It(t))}function Hr(t){const e=t.states;return Object.keys(e).filter(t=>{const i=e[t];return Tr.includes(It(t))&&"temperature"===i?.attributes?.device_class})}function Nr(t){const e=Hr(t);return e.find(t=>t.includes("outdoor")||t.includes("outside")||t.includes("exterior"))??e[0]}function Pr(t){const e=Hr(t);return e.find(t=>t.includes("flow")||t.includes("supply")||t.includes("forward"))??e[0]}function Dr(t){return Hr(t).find(t=>t.includes("curve_output"))??""}let kr=class extends lt{constructor(){super(...arguments),this.label="",this.active=!1}static get styles(){return a`
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
      <span class=${Xi({badge:!0,active:this.active})}>
        ${t}${this.label}
      </span>
    `}};function Br(t){const{tTarget:e,tOutdoor:i,hc:r,n:n,shift:s,minFlow:o,maxFlow:a}=t,l=o??20,h=a??70;if(isNaN(e)||isNaN(i)||isNaN(r)||isNaN(n)||isNaN(s)||isNaN(l)||isNaN(h))return l;if(n<=0)return l;const c=Math.min(l,h),u=Math.max(l,h),d=e-i;if(d<=0)return Math.round(10*c)/10;const p=e+s+r*Math.pow(d,1/n),m=Math.max(c,Math.min(u,p));return Math.round(10*m)/10}function Mr(t,e,i){const r=Math.round((i-e)/.1)+1;return Array.from({length:r},(i,r)=>{const n=e+.1*r,s=Br({...t,tOutdoor:n});return{x:n,y:parseFloat(s.toFixed(1))}})}function Ir(t,e){return Br({...t,tOutdoor:e})}t([pt()],kr.prototype,"label",void 0),t([pt()],kr.prototype,"icon",void 0),t([pt({type:Boolean})],kr.prototype,"active",void 0),kr=t([ct("eq-badge-info")],kr);let Or=class extends At{constructor(){super(...arguments),this.open=!1,this._proposedHc=.9,this._proposedShift=0,this._applying=!1,this._applySuccess=!1,this._lastHcState=null,this._lastShiftState=null,this._onHcMoved=t=>{this._proposedHc=t.detail.value},this._onHcChanged=t=>{this._proposedHc=t.detail.value},this._onShiftMoved=t=>{this._proposedShift=this._fromDisplayDelta(t.detail.value)},this._onShiftChanged=t=>{this._proposedShift=this._fromDisplayDelta(t.detail.value)}}get _hcChanged(){return Math.abs(this._proposedHc-this._currentHc)>this._hcStep/2}get _shiftChanged(){return Math.abs(this._proposedShift-this._currentShift)>this._shiftStep/2}get _isDirty(){return this._hcChanged||this._shiftChanged}disconnectedCallback(){clearTimeout(this._successTimer),super.disconnectedCallback()}willUpdate(t){if(super.willUpdate(t),t.has("config")&&this.config?(this._lastHcState=null,this._lastShiftState=null,this._syncProposedValues()):(t.has("open")&&this.open||t.has("hass")&&this.hass&&this.config&&!this._isDirty)&&this._syncProposedValues(),this.config&&this.hass&&this.open){(t.has("config")||t.has("open")||t.has("_proposedHc")||t.has("_proposedShift")||t.has("hass")&&this._hassRelevantChange(t))&&(this._chartConfig=this._buildChart())}}_hassRelevantChange(t){const e=t.get("hass");return!e||this._relevantStateChanged(e)}_relevantStateChanged(t){const e=this.config;return[e.outdoor_entity,e.climate_entity,e.hc_entity,e.shift_entity,e.n_entity,e.min_flow_entity,e.max_flow_entity].filter(Boolean).some(e=>this.hass.states[e]?.state!==t.states[e]?.state)}_entityState(t){if(t&&this.hass)return this.hass.states[t]}_entityAttr(t,e){return this._entityState(t)?.attributes?.[e]}_resolveEntityNumber(t,e){const i=this._entityState(t);if(!i)return e;const r=parseFloat(i.state);return isNaN(r)?e:r}_openMoreInfo(t){if(t&&this.hass){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}}get _climateState(){return this._entityState(this.config.climate_entity)}get _tTarget(){return this._climateState?.attributes?.temperature??21}get _currentN(){const t=this.config;return t.curve_from_entities?this._resolveEntityNumber(t.n_entity,t.n):t.n}get _currentHc(){return this._resolveEntityNumber(this.config.hc_entity,.9)}get _currentShift(){return this._resolveEntityNumber(this.config.shift_entity,0)}get _tOutdoor(){const t=this._entityState(this.config.outdoor_entity);if(!t)return null;const e=parseFloat(t.state);return isNaN(e)?null:this._fromDisplayTemp(e)}get _hcMin(){return this._entityAttr(this.config.hc_entity,"min")??.5}get _hcMax(){return this._entityAttr(this.config.hc_entity,"max")??3}get _hcStep(){return this._entityAttr(this.config.hc_entity,"step")??.1}get _shiftMin(){return this._entityAttr(this.config.shift_entity,"min")??-15}get _shiftMax(){return this._entityAttr(this.config.shift_entity,"max")??15}get _shiftStep(){return this._entityAttr(this.config.shift_entity,"step")??1}get _isWWSD(){if(!this.config?.climate_entity)return!1;const t=this._tOutdoor;return null!==t&&t>=this._tTarget}_syncProposedValues(){if(!this.hass||!this.config)return;const t=this._currentHc,e=this._currentShift;this._lastHcState!==t&&(this._proposedHc=t,this._lastHcState=t),this._lastShiftState!==e&&(this._proposedShift=e,this._lastShiftState=e)}_buildChart(){const t=Bi(this.hass),e=this.config,i=e.curve_from_entities?this._resolveEntityNumber(e.min_flow_entity,e.min_flow):e.min_flow,r=e.curve_from_entities?this._resolveEntityNumber(e.max_flow_entity,e.max_flow):e.max_flow,n={tTarget:this._tTarget,hc:this._currentHc,n:this._currentN,shift:this._currentShift,minFlow:i,maxFlow:r},s={tTarget:this._tTarget,hc:this._proposedHc??this._currentHc,n:this._currentN,shift:this._proposedShift??this._currentShift,minFlow:i,maxFlow:r},o=Ui(this,"heating"),a=`rgb(${getComputedStyle(this).getPropertyValue("--rgb-state-climate-cool").trim()||getComputedStyle(this).getPropertyValue("--rgb-primary-color").trim()||"33, 150, 243"})`,l=`rgba(${getComputedStyle(this).getPropertyValue("--rgb-warning").trim()||"255, 167, 38"}, 0.08)`,h=Mr(n,e.t_out_min,e.t_out_max),c=Mr(s,e.t_out_min,e.t_out_max),u=h.map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),d=c.map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),p=this._tOutdoor,m=[];if(null!==p){const t=Ir(n,p);m.push({type:"line",name:"operating-point",data:[{value:[this._toDisplayTemp(p),this._toDisplayTemp(t)],symbolSize:9,itemStyle:{color:o,borderColor:"#ffffff",borderWidth:2}}],showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}})}const _=[];this._isWWSD&&_.push({type:"line",name:"wwsd",data:[[this._toDisplayTemp(e.t_out_max),this._toDisplayTemp(r+5)],[this._toDisplayTemp(this._tTarget),this._toDisplayTemp(r+5)]],showSymbol:!1,lineStyle:{width:0},areaStyle:{color:l},tooltip:{show:!1}});const f=this.hass?.config?.unit_system?.temperature??"°C";return{options:{animation:!1,xAxis:{type:"value",min:this._toDisplayTemp(e.t_out_min),max:this._toDisplayTemp(e.t_out_max),inverse:!0,axisLabel:{fontSize:10,formatter:t=>`${t.toFixed(0)}`,hideOverlap:!0},axisTick:{show:!1},axisLine:{show:!1}},yAxis:{type:"value",min:this._toDisplayTemp(i-5),max:this._toDisplayTemp(r+5),axisLabel:{fontSize:10}},grid:{top:10,right:15,bottom:25,left:35},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:e=>{const i=Array.isArray(e)?e:[e],r=i.find(e=>e.seriesName===t("tuning_dialog.current")||e.seriesName===t("tuning_dialog.proposed"));if(!r)return"";const n=r.value[0];let s="";for(const e of i){if("operating-point"===e.seriesName||"wwsd"===e.seriesName)continue;const i=`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>`,r="dashed"===e.lineStyle?.type?` (${t("tuning_dialog.proposed")})`:"";s+=`${i}${e.seriesName}${r}: <b>${e.value[1].toFixed(1)}${f}</b><br/>`}return s+=`<span style="opacity:0.6">${n.toFixed(1)}${f} ${t("tuning_dialog.outdoor_axis_suffix")}</span>`,s}},legend:{show:!1}},data:[{type:"line",name:t("tuning_dialog.current"),data:u.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:o}},{type:"line",name:t("tuning_dialog.proposed"),data:d.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2,type:"dashed"},itemStyle:{color:a}},...m,..._]}}async _recalculate(){const t=this.config.recalculate_service;if(!t||!this.hass)return;const[e,i]=t.split(".",2);e&&i&&this.hass.services[e]?.[i]&&await this.hass.callService(e,i,{})}async _applyAll(){if(this.hass&&this.config){this._applying=!0;try{const t=this._hcChanged,e=this._shiftChanged;t&&await this.hass.callService(It(this.config.hc_entity),"set_value",{entity_id:this.config.hc_entity,value:this._proposedHc}),e&&await this.hass.callService(It(this.config.shift_entity),"set_value",{entity_id:this.config.shift_entity,value:this._proposedShift}),(t||e)&&await this._recalculate(),this._applySuccess=!0,clearTimeout(this._successTimer),this._successTimer=setTimeout(()=>{this._applySuccess=!1},1500)}catch(t){console.warn("Failed to apply tuning:",t)}finally{this._applying=!1}}}_resetAll(){this._proposedHc=this._currentHc,this._proposedShift=this._currentShift}render(){if(!this.open||!this.config||!this.hass)return V;const t=Bi(this.hass),e=this._hcStep<1?Math.ceil(-Math.log10(this._hcStep)):0,i=this._toDisplayDelta(this._shiftStep),r=i<1?Math.ceil(-Math.log10(i)):0,n=this._isDirty,s=this._proposedHc-this._currentHc,o=this._proposedShift-this._currentShift;return z`
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
              <span class="hero-value">${Qt(this._proposedHc,this.hass?.locale,{minimumFractionDigits:e,maximumFractionDigits:e})}</span>
              ${Math.abs(s)>this._hcStep/2?z`
                <span class="ctrl-delta ${s>0?"pos":"neg"}">${Qt(s,this.hass?.locale,{minimumFractionDigits:e,maximumFractionDigits:e,signDisplay:"always"})}</span>
              `:V}
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
            <span class="ctrl-label">${t("tuning_dialog.shift_short")}</span>
            <div class="hero-row">
              <span class="hero-value">${Qt(this._toDisplayDelta(this._proposedShift),this.hass?.locale,{minimumFractionDigits:r,maximumFractionDigits:r})}${this.hass?.config?.unit_system?.temperature??"°C"}</span>
              ${Math.abs(o)>this._shiftStep/2?z`
                <span class="ctrl-delta ${o>0?"pos":"neg"}">${Qt(this._toDisplayDelta(o),this.hass?.locale,{minimumFractionDigits:r,maximumFractionDigits:r,signDisplay:"always"})}${this.hass?.config?.unit_system?.temperature??"°C"}</span>
              `:V}
            </div>
            <eq-param-bar
              .min=${this._toDisplayDelta(this._shiftMin)}
              .max=${this._toDisplayDelta(this._shiftMax)}
              .step=${this._toDisplayDelta(this._shiftStep)}
              .value=${this._toDisplayDelta(this._proposedShift)}
              centered indicator interactive hideDragTip
              ariaUnit=${this.hass?.config?.unit_system?.temperature??"°C"}
              @slider-moved=${this._onShiftMoved}
              @value-changed=${this._onShiftChanged}
            ></eq-param-bar>
          </div>
        </div>

        ${this._renderKpi()}

        <div slot="footer">
          <ha-button size="small" @click=${this._resetAll} .disabled=${!n}>${t("tuning_dialog.reset")}</ha-button>
          <ha-button variant="brand" appearance="filled" size="small"
            .disabled=${!n||this._applying} .loading=${this._applying}
            @click=${async()=>{await this._applyAll(),this._applySuccess&&(this.open=!1,this.dispatchEvent(new CustomEvent("closed")))}}
          >${this._applySuccess?z`<ha-icon icon="mdi:check" slot="start"></ha-icon>`:V}${t("tuning_dialog.apply")}</ha-button>
        </div>
      </ha-dialog>
    `}_renderKpi(){if(!this.config||!this.hass)return V;const t=Bi(this.hass),e=this.hass?.config?.unit_system?.temperature??"°C",i=t=>`${Qt(t,this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} ${e}`,r=this._entityState(this.config.outdoor_entity),n=r?parseFloat(r.state):NaN,s=isNaN(n)?"—":i(n),o=this._entityState(this.config.flow_entity),a=o?parseFloat(o.state):NaN,l=isNaN(a)?"—":i(a),h=this._climateState?.attributes?.current_temperature,c=null==h||isNaN(h)?"—":i(h);return z`
      <div class="kpi-footer">
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.outdoor_entity)}>
          <div class="kpi-value">${s}</div>
          <div class="kpi-label">${t("common.outdoor")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.flow_entity)}>
          <div class="kpi-value flow">${l}</div>
          <div class="kpi-label">${t("common.flow")}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${()=>this._openMoreInfo(this.config.climate_entity)}>
          <div class="kpi-value">${c}</div>
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
      `]}};t([pt({attribute:!1})],Or.prototype,"hass",void 0),t([pt({attribute:!1})],Or.prototype,"config",void 0),t([pt({type:Boolean})],Or.prototype,"open",void 0),t([mt()],Or.prototype,"_proposedHc",void 0),t([mt()],Or.prototype,"_proposedShift",void 0),t([mt()],Or.prototype,"_applying",void 0),t([mt()],Or.prototype,"_applySuccess",void 0),t([mt()],Or.prototype,"_chartConfig",void 0),Or=t([ct("eq-tuning-dialog")],Or);const Rr={n:1.25,min_flow:20,max_flow:70,t_out_min:-20,t_out_max:20},Lr={n:gr(fr()),min_flow:gr(fr()),max_flow:gr(fr()),t_out_min:gr(fr()),t_out_max:gr(fr())},Fr={min_flow_entity:gr(yr()),max_flow_entity:gr(yr())};function Ur(t){const e=t.hc_entity,i=t.shift_entity;if(e&&i)return{climate_entity:t.climate_entity,outdoor_entity:t.outdoor_entity,flow_entity:t.flow_entity,hc_entity:e,shift_entity:i,n_entity:t.n_entity,min_flow_entity:t.min_flow_entity,max_flow_entity:t.max_flow_entity,recalculate_service:t.recalculate_service,curve_from_entities:t.curve_from_entities??!!t.n_entity,n:t.n??Rr.n,min_flow:t.min_flow??Rr.min_flow,max_flow:t.max_flow??Rr.max_flow,t_out_min:t.t_out_min??Rr.t_out_min,t_out_max:t.t_out_max??Rr.t_out_max}}er({type:xr,name:"Equitherm Status",description:"Compact heating status tile with temperature displays"});let qr=class extends Wi{getGridOptions(){return{columns:12,rows:this._config.show_last_updated?4:3,min_rows:3}}static async getStubConfig(t){return{type:"custom:equitherm-status-card",climate_entity:Cr(t),outdoor_entity:Nr(t),flow_entity:Pr(t)}}static async getConfigElement(){return await Promise.resolve().then(function(){return sn}),document.createElement($r)}setConfig(t){this._config=wr(t),this._dialogConfig=Ur(this._config)}_lastUpdatedEntity(){return this._config.flow_entity}get _hasParamsFooter(){const t=this._config;return!!(t.hc_entity||t.shift_entity||t.n_entity||t.pid_correction_entity)}static get styles(){return[super.styles,Zi,Vi,Qi,tr,Ji,a`
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
      `]}_renderParamsFooterWithTune(){return this._renderTunableParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:.9}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:1.25}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:0}:void 0,pid_correction:this._config.pid_correction_entity?{entity:this._config.pid_correction_entity}:void 0},()=>{this._showTuningDialog=!0})}render(){if(!this._config||!this.hass)return V;const t=zi(this._config,t=>this._entityState(t)),e=this._computeCardTitle("status_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:thermostat",clickEntity:this._config.climate_entity,title:e})}

        ${this._renderKpiFooter({adjustingDir:t??void 0,curveOutput:this._curveOutputTempFormatted||void 0})}
        ${this._renderParamsFooterWithTune()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig&&this._showTuningDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${()=>{this._showTuningDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};qr=t([ct(xr)],qr);const Gr=`${Er}-curve-card`,zr=ir(Gr),jr=br({type:yr(),climate_entity:yr(),outdoor_entity:yr(),curve_output_entity:gr(yr()),pid_output_entity:gr(yr()),flow_entity:yr(),rate_limiting_entity:gr(yr()),pid_active_entity:gr(yr()),wws_entity:gr(yr()),show_last_updated:gr(_r()),show_kpi_footer:gr(_r()),show_params_footer:gr(_r()),name:gr(mr()),curve_from_entities:gr(mr()),hc_entity:gr(yr()),n_entity:gr(yr()),shift_entity:gr(yr()),tunable:gr(_r()),recalculate_service:gr(yr()),...Fr,hc:gr(fr()),shift:gr(fr()),...Lr}),Vr={hc:.9,shift:0,...Rr};function Wr(t){const e={...t};return"title"in e&&!("name"in e)&&(e.name=e.title),delete e.title,ur(e,jr),{...Vr,...e}}let Xr=class extends lt{constructor(){super(...arguments),this._active=!1}connectedCallback(){super.connectedCallback();const t=this.getRootNode();this._hostEl=t.host,this._hostEl&&(this._active=this._hostEl.hasAttribute("manual-override"),this._observer=new MutationObserver(()=>{this._active=this._hostEl.hasAttribute("manual-override")}),this._observer.observe(this._hostEl,{attributes:!0,attributeFilter:["manual-override"]}))}disconnectedCallback(){this._observer?.disconnect(),super.disconnectedCallback()}static get styles(){return a`
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
    `}render(){if(!this._active)return V;const t=Bi(this.getRootNode()?.host?.hass);return z`
      <div class="chip">
        <ha-icon icon="mdi:hand-back-right"></ha-icon>
        ${t("common.manual_override")}
      </div>
    `}};t([mt()],Xr.prototype,"_active",void 0),Xr=t([ct("eq-manual-overlay")],Xr),er({type:Gr,name:"Equitherm Curve",description:"Heating curve visualization with current operating point"});let Kr=class extends Ki{willUpdate(t){if(super.willUpdate(t),t.has("_config"))this._updateChartConfig();else if(t.has("hass")&&this.hass){const e=t.get("hass");e&&!this._relevantStateChanged(e)||this._updateChartConfig()}}_relevantStateChanged(t){return[this._config.outdoor_entity,this._config.flow_entity,this._config.climate_entity,this._config.rate_limiting_entity,this._config.pid_output_entity,this._config.curve_output_entity,this._config.pid_active_entity,...this._config.curve_from_entities||this._config.tunable?[this._config.hc_entity,this._config.shift_entity,this._config.n_entity,this._config.min_flow_entity,this._config.max_flow_entity]:[]].filter(Boolean).some(e=>this.hass.states[e]?.state!==t.states[e]?.state)}static async getStubConfig(t){return{type:"custom:equitherm-curve-card",climate_entity:Cr(t),outdoor_entity:Nr(t),curve_output_entity:Dr(t),flow_entity:Pr(t),hc:1.2,n:1.25,shift:0,min_flow:25,max_flow:70,t_out_min:-20,t_out_max:20}}static async getConfigElement(){return await Promise.resolve().then(function(){return an}),document.createElement(zr)}setConfig(t){this._config=Wr(t),this._dialogConfig=Ur(this._config)}_lastUpdatedEntity(){return this._config.flow_entity}get _tTarget(){return this._climate?.attributes.temperature??21}get _tOutdoor(){const t=this._entityState(this._config.outdoor_entity);if(!t)return null;const e=parseFloat(t.state);return isNaN(e)?null:this._fromDisplayTemp(e)}get _flowTemp(){const t=this._entityState(this._config.flow_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}return this._config.min_flow}get _currentN(){return this._config.curve_from_entities?this._resolveEntityNumber(this._config.n_entity,this._config.n):this._config.n}_renderParamsFooterContent(){return this._config.curve_from_entities?this._renderTunableParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:this._config.hc,onClick:this._config.tunable?void 0:()=>{this._showTuningDialog=!0}}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:this._config.n}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:this._config.shift,onClick:this._config.tunable?void 0:()=>{this._showTuningDialog=!0}}:void 0},()=>{this._showTuningDialog=!0}):V}_buildEChartOptions(){return this._buildSingleCurveOptions()}_buildSingleCurveOptions(){const t=Bi(this.hass),e=this._config,i={tTarget:this._tTarget,hc:e.curve_from_entities?this._resolveEntityNumber(e.hc_entity,e.hc):e.hc,n:e.curve_from_entities?this._resolveEntityNumber(e.n_entity,e.n):e.n,shift:e.curve_from_entities?this._resolveEntityTemp(e.shift_entity,e.shift):e.shift,minFlow:e.curve_from_entities?this._resolveEntityTemp(e.min_flow_entity,e.min_flow):e.min_flow,maxFlow:e.curve_from_entities?this._resolveEntityTemp(e.max_flow_entity,e.max_flow):e.max_flow},r=getComputedStyle(this),n=r.getPropertyValue("--curve-gradient-start").trim(),s=r.getPropertyValue("--curve-gradient-end").trim(),o=n?`rgb(${n})`:Ui(this,"heating"),a=s?`rgb(${s})`:Ui(this,"cooling"),l=`rgba(${r.getPropertyValue("--rgb-warning").trim()||"255, 167, 38"}, 0.08)`,h=Mr(i,e.t_out_min,e.t_out_max).map(t=>({x:this._toDisplayTemp(t.x),y:this._toDisplayTemp(t.y)})),c=this._tOutdoor,u=[],d=qi(this._config,t=>this._entityState(t)),p=Gi(this._config);if(null!==c){const t=this._toDisplayTemp(c),e=Ir(i,c),r=this._toDisplayTemp(e);if(d){const e=p&&this._entityState(p)?parseFloat(this._entityState(p).state):r;if(this._config.pid_output_entity&&this._config.curve_output_entity){const e=this._entityState(this._config.curve_output_entity),i=e?parseFloat(e.state):r;u.push({value:[t,i],symbolSize:8,itemStyle:{color:"transparent",borderColor:o,borderWidth:1.5}})}u.push({value:[t,e],symbolSize:10,itemStyle:{color:o,borderColor:"#ffffff",borderWidth:2}}),u.push({value:[t,this._toDisplayTemp(this._flowTemp)],symbolSize:8,itemStyle:{color:"transparent",borderColor:o,borderWidth:2}})}else u.push({value:[t,r],symbolSize:9,itemStyle:{color:o,borderColor:"#ffffff",borderWidth:2}})}const m=h.filter((t,e)=>e%50==0).map(t=>[t.x,t.y]);return{options:{animation:!1,xAxis:{type:"value",min:this._toDisplayTemp(e.t_out_min),max:this._toDisplayTemp(e.t_out_max),inverse:!0,axisLabel:{fontSize:10,formatter:t=>`${parseFloat(t.toFixed(1))}`},axisTick:{show:!1},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{fontSize:10,formatter:t=>`${parseFloat(t.toFixed(1))}`},min:this._toDisplayTemp(10*Math.floor((i.minFlow-1)/10)),max:this._toDisplayTemp(10*Math.ceil((i.maxFlow+1)/10))},grid:{top:5,right:5,bottom:20,left:30},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:e=>{const i=(Array.isArray(e)?e:[]).find(e=>e.seriesName===t("curve_card.flow_temp"));if(!i)return"";const r=i.value[0],n=i.value[1],s=this.hass?.config?.unit_system?.temperature??"°C",a=t=>`${parseFloat(t.toFixed(1))} ${s}`;return`<div style="margin-bottom:4px;font-weight:600">${a(r)} ${t("curve_card.outdoor_axis_suffix")}</div><div>${l=o,`<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background-color:${l}"></span>`}${a(n)} ${t("curve_card.flow_axis_suffix")}</div>`;var l}},legend:{show:!1}},data:[{type:"line",name:t("curve_card.flow_temp"),data:h.map(t=>[t.x,t.y]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:o},areaStyle:{color:{type:"linear",x:0,y:0,x2:1,y2:0,colorStops:[{offset:0,color:o},{offset:1,color:a}]}}},{type:"line",name:"markers",data:m,showSymbol:!0,symbol:"circle",symbolSize:3,lineStyle:{width:0},itemStyle:{color:o,borderColor:"#fff",borderWidth:1},tooltip:{show:!1}},{type:"line",name:"operating-point",data:u,showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}},...this._isWWSD?[{type:"line",name:"wwsd",data:[[this._toDisplayTemp(e.t_out_max),this._toDisplayTemp(i.maxFlow+5)],[this._toDisplayTemp(this._tTarget),this._toDisplayTemp(i.maxFlow+5)]],showSymbol:!1,lineStyle:{width:0},areaStyle:{color:l},tooltip:{show:!1}}]:[]]}}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper ${Xi({"has-rows":this._hasRows})}">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          .height=${this._hasFixedHeight?"100%":void 0}
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `}static get styles(){return[super.styles,Zi,Vi,Qi,tr,Ji,a`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
          padding: 0 8px;
        }
      `]}render(){if(!this._config||!this.hass)return V;const t=zi(this._config,t=>this._entityState(t)),e=this._computeCardTitle("curve_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:thermostat",clickEntity:this._config.climate_entity,title:e})}
        ${this._renderChart()}
        ${this._renderKpiFooter({adjustingDir:t??void 0,curveOutput:this._curveOutputTempFormatted||void 0})}
        ${this._renderParamsFooterContent()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig&&this._showTuningDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${()=>{this._showTuningDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};Kr=t([ct(Gr)],Kr);const Yr=`${Er}-forecast-card`,Zr=ir(Yr),Jr=br({type:yr(),weather_entity:yr(),climate_entity:yr(),flow_entity:yr(),hours:gr(fr()),name:gr(mr()),curve_from_entities:gr(mr()),hc_entity:gr(yr()),n_entity:gr(yr()),shift_entity:gr(yr()),...Fr,outdoor_entity:gr(yr()),pid_active_entity:gr(yr()),wws_entity:gr(yr()),show_last_updated:gr(_r()),show_kpi_footer:gr(_r()),show_params_footer:gr(_r()),tunable:gr(_r()),recalculate_service:gr(yr()),hc:gr(fr()),...Lr,shift:gr(fr())}),Qr={hours:24,hc:.9,shift:0,...Rr};function tn(t){return ur(t,Jr),{...Qr,...t}}er({type:Yr,name:"Equitherm Forecast",description:"Heating forecast based on weather predictions"});let en=class extends Ki{constructor(){super(...arguments),this._forecastPoints=[]}updated(t){super.updated(t),(t.has("_config")||!this._unsub&&t.has("hass"))&&this._subscribeForecast(),t.has("_forecastPoints")&&this._updateChartConfig()}static async getStubConfig(t){return{type:"custom:equitherm-forecast-card",weather_entity:Ar(t)??"",climate_entity:Cr(t)??"",flow_entity:Pr(t)??"",hours:24,hc:1.2,n:1.25,shift:0,min_flow:25,max_flow:70}}static async getConfigElement(){return await Promise.resolve().then(function(){return hn}),document.createElement(Zr)}setConfig(t){this._config=tn(t),this._dialogConfig=Ur(this._config)}_lastUpdatedEntity(){return this._config.weather_entity}get _tTarget(){return this._climate?.attributes.temperature??21}get _flowTemp(){const t=this._entityState(this._config.flow_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}return this._config.min_flow}get _outdoorTemp(){if(this._config.outdoor_entity){const t=this._entityState(this._config.outdoor_entity);if(t){const e=parseFloat(t.state);if(!isNaN(e))return this._fromDisplayTemp(e)}}const t=this._entityState(this._config.weather_entity);if(t){const e=parseFloat(t.attributes.temperature);if(!isNaN(e))return this._fromDisplayTemp(e)}return NaN}get _outdoorTempFormatted(){const t=this._outdoorTemp;return isNaN(t)?"—":this._formatCalcTemp(t)}get _isWWSD(){if(this._config?.wws_entity){const t=this._entityState(this._config.wws_entity);return"on"===t?.state}const t=this._climate?.attributes.temperature;return null!=t&&(!isNaN(this._outdoorTemp)&&this._outdoorTemp>=t)}_wwsdDescription(){const t=Bi(this.hass),e=this._climate?.attributes.temperature;return isNaN(this._outdoorTemp)||null==e?t("common.wwsd_label"):`${t("common.outdoor")} ${this._formatCalcTemp(this._outdoorTemp)} ≥ ${this._formatCalcTemp(e)}`}get _curveParams(){const t=this._config;return{tTarget:this._tTarget,hc:t.curve_from_entities?this._resolveEntityNumber(t.hc_entity,t.hc):t.hc,n:t.curve_from_entities?this._resolveEntityNumber(t.n_entity,t.n):t.n,shift:t.curve_from_entities?this._resolveEntityNumber(t.shift_entity,t.shift):t.shift,minFlow:t.curve_from_entities?this._resolveEntityNumber(t.min_flow_entity,t.min_flow):t.min_flow,maxFlow:t.curve_from_entities?this._resolveEntityNumber(t.max_flow_entity,t.max_flow):t.max_flow}}_processForecast(t){const e=t.map(t=>({datetime:t.datetime,temperature:this._fromDisplayTemp(t.temperature)}));this._forecastPoints=function(t,e,i){return t.slice(0,i).map(t=>({datetime:t.datetime,hour:new Date(t.datetime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),tOutdoor:t.temperature,tFlow:Br({...e,tOutdoor:t.temperature})}))}(e,this._curveParams,this._config.hours)}_unsubscribeForecast(){this._unsub&&(this._unsub(),this._unsub=void 0)}async _subscribeForecast(){if(this._unsubscribeForecast(),this.isConnected&&this.hass&&this._config?.weather_entity)try{const t=await this.hass.connection.subscribeMessage(t=>{t.forecast&&this._processForecast(t.forecast)},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:this._config.weather_entity});this._unsub?t():this._unsub=t}catch(t){console.warn("Failed to subscribe to weather forecast:",t)}}_buildEChartOptions(){const t=this._forecastPoints,e=Bi(this.hass),i=Ui(this,"heating"),r=Ui(this,"cooling"),n=function(t){if(0!==t.length)return t.reduce((t,e)=>e.tFlow>(t?.tFlow??0)?e:t,t[0])}(t),s=n?[{value:[new Date(n.datetime).getTime(),this._toDisplayTemp(n.tFlow)],symbolSize:6,itemStyle:{color:i,borderColor:"#fff",borderWidth:2},label:{show:!0,formatter:`${e("forecast_card.peak")}: ${this._toDisplayTemp(n.tFlow).toFixed(1)}${this.hass?.config?.unit_system?.temperature??"°C"}`,color:"#fff",backgroundColor:i,fontSize:11,fontWeight:600,padding:[2,6],borderRadius:3,position:"top"}}]:[];return{options:{animation:!1,xAxis:{type:"time",axisLabel:{fontSize:10,hideOverlap:!0,formatter:t=>this._formatChartTime(t)},axisTick:{show:!1},axisLine:{show:!1}},yAxis:[{type:"value",axisLabel:{fontSize:10},min:this._toDisplayTemp(10*Math.floor(((this._curveParams.minFlow??20)-1)/10)),max:this._toDisplayTemp(10*Math.ceil(((this._curveParams.maxFlow??70)+1)/10))},{type:"value",axisLabel:{fontSize:10}}],grid:{top:15,right:15,bottom:25,left:35},tooltip:{trigger:"axis",backgroundColor:"rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)",borderColor:"var(--divider-color, rgba(0,0,0,0.12))",borderWidth:1,padding:[8,12],textStyle:{color:"var(--primary-text-color)",fontSize:12},formatter:t=>{const e=this._formatChartTime(t[0].value[0]),i=this.hass?.config?.unit_system?.temperature??"°C";let r=`<span style="opacity:0.6">${e}</span><br/>`;for(const e of t){if("peak"===e.seriesName)continue;r+=`${`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>`}${e.seriesName}: <b>${e.value[1].toFixed(1)}${i}</b><br/>`}return r}},legend:{show:!1}},data:[{type:"line",name:e("forecast_card.flow_temp"),data:t.map(t=>[new Date(t.datetime).getTime(),this._toDisplayTemp(t.tFlow)]),showSymbol:!1,lineStyle:{width:2},itemStyle:{color:i},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:`rgba(${i.replace("rgb(","").replace(")","")}, 0.4)`},{offset:1,color:`rgba(${i.replace("rgb(","").replace(")","")}, 0.05)`}]}}},{type:"line",name:e("forecast_card.outdoor_temp"),data:t.map(t=>[new Date(t.datetime).getTime(),this._toDisplayTemp(t.tOutdoor)]),yAxisIndex:1,showSymbol:!1,lineStyle:{width:1.5,type:"dashed"},itemStyle:{color:r}},...n?[{type:"line",name:"peak",data:s,showSymbol:!0,symbol:"circle",lineStyle:{width:0},tooltip:{show:!1}}]:[]]}}_renderChart(){if(!this._echartConfig)return V;const{options:t,data:e}=this._echartConfig;return z`
      <div class="chart-wrapper ${Xi({"has-rows":this._hasRows})}">
        <ha-chart-base
          .hass=${this.hass}
          .options=${t}
          .data=${e}
          .height=${this._hasFixedHeight?"100%":void 0}
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `}_onChartDisconnecting(){this._unsubscribeForecast()}_onChartReconnected(){this._subscribeForecast()}static get styles(){return[super.styles,Zi,Vi,Qi,Ji,tr,a`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
        }
      `]}render(){if(!this._config||!this.hass)return V;const t=this._computeCardTitle("forecast_card.default_title");return z`
      <ha-card>
        ${this._renderHeader({iconName:"mdi:weather-partly-cloudy",clickEntity:this._config.weather_entity,title:t})}
        ${this._renderChart()}
        ${this._renderKpiFooter({outdoorClickEntity:this._config.outdoor_entity??this._config.weather_entity})}
        ${this._config.curve_from_entities?this._renderTunableParamsFooter({hc:this._config.hc_entity?{entity:this._config.hc_entity,fallback:this._config.hc}:void 0,n:this._config.n_entity?{entity:this._config.n_entity,fallback:this._config.n}:void 0,shift:this._config.shift_entity?{entity:this._config.shift_entity,fallback:this._config.shift}:void 0},()=>{this._showTuningDialog=!0}):V}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig&&this._showTuningDialog?z`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${()=>{this._showTuningDialog=!1}}
        ></eq-tuning-dialog>
      `:V}
    `}};t([mt()],en.prototype,"_forecastPoints",void 0),en=t([ct(Yr)],en),console.info("%c EQUITHERM-CARDS %c 1.6.0 ","color: white; background: #f97316; font-weight: bold;","color: #f97316; background: white; font-weight: bold;");const rn={entity:function(t,e={}){return{name:t,required:e.required??!0,selector:{entity:{domain:e.domain,device_class:e.device_class}}}},number:function(t,e,i,r=1,n={}){return{name:t,required:n.required??!1,...void 0!==n.default&&{default:n.default},selector:{number:{min:e,max:i,step:r,mode:n.mode??"box",unit_of_measurement:n.unit_of_measurement}}}},text:function(t,e=!1){return{name:t,required:e,selector:{text:{}}}},entityName:function(t,e){return{name:t,selector:{entity_name:{}},context:e}},grid:function(t){return{type:"grid",name:"",schema:t}},expandable:function(t,e,i){return{type:"expandable",flatten:!0,title:t,icon:e,name:"",schema:i}}};let nn=class extends Yi{constructor(){super(...arguments),this._schemaMemo=Xt(t=>{const e=Bi(this.hass);return[rn.entity("climate_entity",{domain:"climate"}),rn.entityName("name",{entity:"climate_entity"}),rn.entity("outdoor_entity",{domain:["sensor","input_number"],device_class:"temperature"}),rn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_params_footer",selector:{boolean:{}},default:!0},{name:"tunable",selector:{boolean:{}},default:!1},...t?[rn.expandable(e("editor.tuning"),"mdi:tune-variant",[rn.entity("hc_entity",{domain:["number","input_number"]}),rn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],rn.expandable(e("editor.optional"),"mdi:connection",[rn.entity("curve_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),rn.entity("pid_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),rn.entity("rate_limiting_entity",{domain:["binary_sensor"],required:!1}),rn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1}),rn.entity("wws_entity",{domain:["binary_sensor"],required:!1}),rn.entity("pid_correction_entity",{domain:["sensor","input_number"],device_class:"temperature",required:!1})]),rn.expandable(e("editor.curve_parameters"),"mdi:chart-bell-curve-cumulative",[rn.entity("hc_entity",{domain:["number","input_number"],required:!1}),rn.entity("shift_entity",{domain:["number","input_number"],required:!1}),rn.entity("n_entity",{domain:["number","input_number"],required:!1})])]})}setConfig(t){this._config={...t}}_validate(t){wr(t)}_getSchema(){return this._schemaMemo(!!this._config.tunable)}};nn=t([ct($r)],nn);var sn=Object.freeze({__proto__:null,get StatusCardEditor(){return nn}});let on=class extends Yi{constructor(){super(...arguments),this._schemaMemo=Xt((t,e,i)=>{const r=this.hass?.config?.unit_system?.temperature??"°C",n=t=>Math.round(10*xt(t,i))/10,s=t=>Math.round(10*St(t,i))/10,o=Bi(this.hass);return[rn.entity("climate_entity",{domain:"climate"}),rn.entityName("name",{entity:"climate_entity"}),rn.entity("outdoor_entity",{domain:["sensor","input_number"],device_class:"temperature"}),rn.entity("curve_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),rn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"tunable",selector:{boolean:{}},default:!1},{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_kpi_footer",selector:{boolean:{}},default:!0},{name:"show_params_footer",selector:{boolean:{}},default:!0},...e?[rn.expandable(o("editor.tuning"),"mdi:tune-variant",[rn.entity("hc_entity",{domain:["number","input_number"]}),rn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],rn.expandable(o("editor.optional"),"mdi:connection",[rn.entity("pid_output_entity",{domain:["sensor"],device_class:"temperature",required:!1}),rn.entity("rate_limiting_entity",{domain:["binary_sensor"],required:!1}),rn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1}),rn.entity("wws_entity",{domain:["binary_sensor"],required:!1})]),rn.expandable(o("editor.curve_parameters"),"mdi:chart-bell-curve",[{name:"curve_from_entities",selector:{boolean:{}}},...t?[rn.entity("hc_entity",{domain:"number"}),rn.entity("n_entity",{domain:"number"}),rn.entity("shift_entity",{domain:"number"}),rn.entity("min_flow_entity",{domain:["sensor","number"],required:!1}),rn.entity("max_flow_entity",{domain:["sensor","number"],required:!1})]:[rn.grid([rn.number("hc",.5,3,.1,{default:.9}),rn.number("n",1,2,.05,{default:1.25})]),rn.number("shift",s(-15),s(15),1,{unit_of_measurement:r,default:s(0)}),rn.grid([rn.number("min_flow",n(15),n(35),1,{unit_of_measurement:r,default:n(20)}),rn.number("max_flow",n(50),n(90),1,{unit_of_measurement:r,default:n(70)})])]]),rn.expandable(o("editor.display_range"),"mdi:arrow-expand-horizontal",[rn.grid([rn.number("t_out_min",n(-30),n(5),1,{unit_of_measurement:r,default:n(-20)}),rn.number("t_out_max",n(0),n(30),1,{unit_of_measurement:r,default:n(20)})])])]})}setConfig(t){this._config={...t}}_validate(t){Wr(t)}_transformConfig(t){if(!Et(this.hass))return t;const e={...t};null!=e.shift&&(e.shift=Tt(e.shift,!0));for(const t of["min_flow","max_flow","t_out_min","t_out_max"])null!=e[t]&&(e[t]=$t(e[t],!0));return e}_getDisplayConfig(){if(!Et(this.hass))return this._config;const t={...this._config};null!=t.shift&&(t.shift=Math.round(10*St(t.shift,!0))/10);for(const e of["min_flow","max_flow","t_out_min","t_out_max"])null!=t[e]&&(t[e]=Math.round(10*xt(t[e],!0))/10);return t}_getSchema(){return this._schemaMemo(!!this._config.curve_from_entities,!!this._config.tunable,Et(this.hass))}};on=t([ct(zr)],on);var an=Object.freeze({__proto__:null,get EquithermCurveCardEditor(){return on}});let ln=class extends Yi{constructor(){super(...arguments),this._schemaMemo=Xt((t,e)=>{const i=Bi(this.hass);return[rn.entity("weather_entity",{domain:"weather"}),rn.entity("climate_entity",{domain:"climate"}),rn.entityName("name",{entity:"climate_entity"}),rn.entity("flow_entity",{domain:["sensor","number","input_number"],device_class:"temperature"}),{name:"show_last_updated",selector:{boolean:{}},default:!1},{name:"show_kpi_footer",selector:{boolean:{}},default:!0},{name:"show_params_footer",selector:{boolean:{}},default:!0},{name:"tunable",selector:{boolean:{}},default:!1},...e?[rn.expandable(i("editor.tuning"),"mdi:tune-variant",[rn.entity("hc_entity",{domain:["number","input_number"]}),rn.entity("shift_entity",{domain:["number","input_number"]}),{name:"recalculate_service",selector:{text:{}}}])]:[],rn.expandable(i("editor.optional"),"mdi:connection",[rn.entity("outdoor_entity",{domain:["sensor","number","input_number"],device_class:"temperature",required:!1}),rn.entity("pid_active_entity",{domain:["binary_sensor"],required:!1}),rn.entity("wws_entity",{domain:["binary_sensor"],required:!1})]),rn.expandable(i("editor.forecast_settings"),"mdi:clock-outline",[rn.number("hours",1,48,1,{unit_of_measurement:"h",default:24})]),rn.expandable(i("editor.curve_parameters"),"mdi:chart-bell-curve",[{name:"curve_from_entities",selector:{boolean:{}}},...t?[rn.entity("hc_entity",{domain:"number"}),rn.entity("n_entity",{domain:"number"}),rn.entity("shift_entity",{domain:"number"}),rn.entity("min_flow_entity",{domain:["sensor","number"],required:!1}),rn.entity("max_flow_entity",{domain:["sensor","number"],required:!1})]:[rn.grid([rn.number("hc",.5,3,.1,{default:.9}),rn.number("n",1,2,.05,{default:1.25})]),rn.number("shift",-15,15,1,{unit_of_measurement:"°C",default:0}),rn.grid([rn.number("min_flow",15,35,1,{unit_of_measurement:"°C",default:20}),rn.number("max_flow",50,90,1,{unit_of_measurement:"°C",default:70})])]])]})}setConfig(t){this._config={...t}}_validate(t){tn(t)}_getSchema(){return this._schemaMemo(!!this._config.curve_from_entities,!!this._config.tunable)}};ln=t([ct(Zr)],ln);var hn=Object.freeze({__proto__:null,get EquithermForecastCardEditor(){return ln}});
