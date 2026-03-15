function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,g?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=t=>t,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+q,P=`<${k}>`,O=document,T=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,J=O.createTreeWalker(O,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===H?"!--"===c[1]?n=R:void 0!==c[1]?n=z:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=o??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?L:D):n===L||n===D?n=j:n===R||n===z?n=H:(n=j,o=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+P:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+q+d):i+q+(-2===l?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=s.getAttribute(t).split(q),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(q)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(q),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(q,t+1));)a.push({type:7,index:o}),t+=q.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===B)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=J.nextNode(),r++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===B&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===B)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}const _t=n`
  :host {
    --eq-gradient-cold: #3b82f6;
    --eq-gradient-hot: #f97316;
    --eq-dot-glow: rgba(249, 115, 22, 0.4);
    --eq-badge-heating-bg: #f97316;
    --eq-badge-heating-color: #ffffff;
    --eq-badge-idle-bg: var(--secondary-background-color, #e5e5e5);
    --eq-badge-idle-color: var(--secondary-text-color, #666);
    --eq-badge-fault-bg: var(--error-color, #db4437);
    --eq-badge-fault-color: #ffffff;
    --eq-card-padding: 16px;
    --eq-font-size-large: 1.8rem;
    --eq-font-size-medium: 1rem;
    --eq-font-size-small: 0.8rem;
  }
`,ft=n`
  ha-card {
    padding: var(--eq-card-padding);
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;var mt,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(mt||(mt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var yt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};let $t=class extends at{constructor(){super(...arguments),this.action="idle"}render(){const t="heating"===this.action?"Heating":"idle"===this.action?"Idle":"Off";return I`
      <span class="badge ${this.action}">
        <span class="dot"></span>
        ${t}
      </span>
    `}};$t.styles=n`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
    .badge.heating {
      background: var(--eq-badge-heating-bg, #f97316);
      color: var(--eq-badge-heating-color, #fff);
    }
    .badge.heating .dot {
      background: #fff;
      box-shadow: 0 0 6px rgba(255,255,255,0.8);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .badge.idle {
      background: var(--eq-badge-idle-bg, #e5e5e5);
      color: var(--eq-badge-idle-color, #666);
    }
    .badge.idle .dot { background: currentColor; }
    .badge.off {
      background: var(--eq-badge-idle-bg, #e5e5e5);
      color: var(--eq-badge-idle-color, #666);
    }
    .badge.off .dot { background: currentColor; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `,t([ut()],$t.prototype,"action",void 0),$t=t([lt("eq-action-badge")],$t);let vt=class extends at{get hass(){return this._hass}set hass(t){const e=[this._config?.climate_entity,this._config?.outdoor_entity,this._config?.flow_entity,this._config?.curve_output_entity,this._config?.rate_limiting_entity,this._config?.outdoor_fault_entity,this._config?.indoor_fault_entity,this._config?.control_mode_entity];var i,s,o;i=this._hass,s=t,o=e,(!i||o.filter(t=>!!t).some(t=>i.states[t]!==s.states[t]))&&(this._hass=t)}getGridOptions(){return{columns:12,rows:2,min_rows:1}}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("climate."));return{type:"custom:equitherm-status-card",climate_entity:e[0]??"climate.equitherm",outdoor_entity:"sensor.outdoor_temperature",flow_entity:"sensor.flow_setpoint",curve_output_entity:"sensor.heating_curve_output"}}static getConfigElement(){return document.createElement("equitherm-status-card-editor")}setConfig(t){if(!t.climate_entity)throw new Error("climate_entity is required");if(!t.outdoor_entity)throw new Error("outdoor_entity is required");if(!t.flow_entity)throw new Error("flow_entity is required");this._config={...t}}getCardSize(){return 2}get _climate(){return this.hass?.states[this._config.climate_entity]}_formatTemp(t,e){if(null==t||isNaN(t))return"—";const i=this.hass?.config?.unit_system?.temperature??"°C",s=e??"°C";let o=t,r=i;return"°C"===s&&"°F"===i?o=9*t/5+32:"°F"===s&&"°C"===i&&(o=5*(t-32)/9),`${o.toFixed(1)}${r}`}get _outdoorTemp(){const t=this.hass?.states[this._config.outdoor_entity];if(!t)return"—";const e=parseFloat(t.state),i=t.attributes?.unit_of_measurement;return this._formatTemp(e,i)}get _flowTemp(){const t=this.hass?.states[this._config.flow_entity];if(!t)return"—";const e=parseFloat(t.state),i=t.attributes?.unit_of_measurement;return this._formatTemp(e,i)}get _roomTemp(){const t=this._climate?.attributes.current_temperature;return this._formatTemp(t,this.hass?.config?.unit_system?.temperature)}get _controlMode(){return this._config.control_mode_entity?this.hass?.states[this._config.control_mode_entity]?.state??"":""}get _outdoorFault(){return!!this._config.outdoor_fault_entity&&"on"===this.hass?.states[this._config.outdoor_fault_entity]?.state}get _indoorFault(){return!!this._config.indoor_fault_entity&&"on"===this.hass?.states[this._config.indoor_fault_entity]?.state}get _rateLimitingActive(){return!!this._config.rate_limiting_entity&&"on"===this.hass?.states[this._config.rate_limiting_entity]?.state}get _adjustingDirection(){if(!this._rateLimitingActive)return null;if(!this._config.curve_output_entity)return null;const t=this.hass?.states[this._config.flow_entity],e=this.hass?.states[this._config.curve_output_entity];if(!t||!e)return null;const i=parseFloat(t.state),s=parseFloat(e.state);return isNaN(i)||isNaN(s)?null:i<s?"rising":i>s?"falling":null}get _curveOutputTemp(){if(!this._config.curve_output_entity)return"";const t=this.hass?.states[this._config.curve_output_entity];if(!t)return"";const e=parseFloat(t.state);if(isNaN(e))return"";const i=t.attributes?.unit_of_measurement;return this._formatTemp(e,i)}_handleClick(t){t&&yt(this,"hass-more-info",{entityId:t})}render(){if(!this._config||!this.hass)return V;const t=this._climate?.attributes.hvac_action??"off",e=this._adjustingDirection,i=this._curveOutputTemp;return I`
      <ha-card>
        <div class="header">
          <eq-action-badge .action=${t} @click=${()=>this._handleClick(this._config.climate_entity)}></eq-action-badge>
          ${this._outdoorFault||this._indoorFault?I`
            <span class="fault-badge" @click=${()=>this._handleClick(this._outdoorFault?this._config.outdoor_fault_entity:this._config.indoor_fault_entity)}>
              <ha-icon .icon=${"mdi:alert-circle"}></ha-icon>
            </span>
          `:V}
          ${e?I`
            <span class="ramping">
              <ha-icon .icon=${"rising"===e?"mdi:trending-up":"mdi:trending-down"}></ha-icon>
              ADJUSTING
            </span>
          `:V}
          ${this._controlMode?I`<span class="mode" @click=${()=>this._handleClick(this._config.control_mode_entity)}>${this._controlMode}</span>`:V}
        </div>

        <div class="temps">
          <div class="temp-block" @click=${()=>this._handleClick(this._config.outdoor_entity)}>
            <div class="temp-value">${this._outdoorTemp}</div>
            <div class="temp-label">Outdoor</div>
          </div>
          <div class="arrow" aria-hidden="true">→</div>
          <div class="temp-block" @click=${()=>this._handleClick(this._config.flow_entity)}>
            ${e&&i?I`
              <div class="flow-dual">
                <div class="temp-value">${this._flowTemp}</div>
                <div class="target">→ ${i}</div>
              </div>
            `:I`
              <div class="temp-value">${this._flowTemp}</div>
            `}
            <div class="temp-label">Flow</div>
          </div>
          <div class="divider"></div>
          <div class="temp-block" @click=${()=>this._handleClick(this._config.climate_entity)}>
            <div class="temp-value">${this._roomTemp}</div>
            <div class="temp-label">Room</div>
          </div>
        </div>
      </ha-card>
    `}};vt.styles=[_t,ft,n`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        gap: 8px;
      }
      .header eq-action-badge { cursor: pointer; }
      .mode { cursor: pointer; }
      .temps {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }
      .temp-block {
        text-align: center;
        min-width: 0;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .temp-block:hover {
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
      }
      .temp-value {
        font-size: var(--eq-font-size-large);
        font-weight: 600;
        line-height: 1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .temp-label {
        font-size: var(--eq-font-size-small);
        color: var(--secondary-text-color);
        margin-top: 4px;
        white-space: nowrap;
      }
      .arrow { color: var(--secondary-text-color); font-size: 1.2rem; }
      .divider { width: 1px; background: var(--divider-color, #e0e0e0); height: 40px; flex-shrink: 0; }
      .mode { font-size: var(--eq-font-size-small); color: var(--secondary-text-color); cursor: pointer; }
      .fault-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 3px 6px;
        border-radius: 999px;
        background: var(--eq-badge-fault-bg, #db4437);
        color: var(--eq-badge-fault-color, #fff);
        cursor: pointer;
      }
      .fault-badge ha-icon { --mdc-icon-size: 14px; }
      .ramping {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        background: var(--eq-badge-idle-bg, #e5e5e5);
        color: var(--eq-badge-idle-color, #666);
      }
      .ramping ha-icon { --mdc-icon-size: 14px; }
      .flow-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .flow-dual .target { font-size: 0.7rem; color: var(--secondary-text-color); }
    `],t([pt()],vt.prototype,"_hass",void 0),t([pt()],vt.prototype,"_config",void 0),vt=t([lt("equitherm-status-card")],vt);let bt=class extends at{constructor(){super(...arguments),this._schema=[{name:"climate_entity",required:!0,selector:{entity:{domain:["climate"]}}},{name:"outdoor_entity",required:!0,selector:{entity:{domain:["sensor","input_number"]}}},{name:"flow_entity",required:!0,selector:{entity:{domain:["sensor","number","input_number"]}}},{name:"curve_output_entity",required:!1,selector:{entity:{domain:["sensor"]}}},{name:"rate_limiting_entity",required:!1,selector:{entity:{domain:["binary_sensor"]}}},{name:"outdoor_fault_entity",required:!1,selector:{entity:{domain:["binary_sensor"]}}},{name:"indoor_fault_entity",required:!1,selector:{entity:{domain:["binary_sensor"]}}},{name:"control_mode_entity",required:!1,selector:{entity:{domain:["sensor"]}}}],this._computeLabel=t=>({climate_entity:"Climate Entity",outdoor_entity:"Outdoor Temperature Entity",flow_entity:"Flow Setpoint Entity (rate-limited)",curve_output_entity:"Heating Curve Output Entity (pre-rate-limit, optional)",rate_limiting_entity:"Rate Limiting Active Entity (optional)",outdoor_fault_entity:"Outdoor Sensor Fault Entity (optional)",indoor_fault_entity:"Indoor Sensor Fault Entity (optional)",control_mode_entity:"Control Mode Entity (optional)"}[t.name]??t.name)}setConfig(t){this._config={...t}}_valueChanged(t){const e=t.target;if(!this._config||void 0===e.configValue)return;const i=e.value??e.checked,s={...this._config,[e.configValue]:i};yt(this,"config-changed",{config:s})}render(){return this._config?I`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:I``}};bt.styles=n`ha-form { display: block; }`,t([ut({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),bt=t([lt("equitherm-status-card-editor")],bt),console.info("%c EQUITHERM-CARDS %c 0.1.0 ","color: white; background: #f97316; font-weight: bold;","color: #f97316; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"equitherm-status-card",name:"Equitherm Status",description:"Compact heating status tile with fault indicators",preview:!0},{type:"equitherm-curve-card",name:"Equitherm Curve",description:"Heating curve visualization with live operating point",preview:!0},{type:"equitherm-forecast-card",name:"Equitherm Forecast",description:"Predicted flow temperatures from weather forecast",preview:!1},{type:"equitherm-tuning-card",name:"Equitherm Tuning",description:"Compare heating curves and tune parameters live",preview:!1});
