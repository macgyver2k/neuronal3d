var sT=Object.defineProperty,aT=Object.defineProperties;var cT=Object.getOwnPropertyDescriptors;var E0=Object.getOwnPropertySymbols;var lT=Object.prototype.hasOwnProperty,uT=Object.prototype.propertyIsEnumerable;var S0=(n,e,t)=>e in n?sT(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,fe=(n,e)=>{for(var t in e||={})lT.call(e,t)&&S0(n,t,e[t]);if(E0)for(var t of E0(e))uT.call(e,t)&&S0(n,t,e[t]);return n},Se=(n,e)=>aT(n,cT(e));var Bt=(n,e,t)=>new Promise((i,r)=>{var o=c=>{try{a(t.next(c))}catch(l){r(l)}},s=c=>{try{a(t.throw(c))}catch(l){r(l)}},a=c=>c.done?i(c.value):Promise.resolve(c.value).then(o,s);a((t=t.apply(n,e)).next())});function ah(n,e){return Object.is(n,e)}var Jt=null,dl=!1,ch=1,oi=Symbol("SIGNAL");function Je(n){let e=Jt;return Jt=n,e}function lh(){return Jt}var Ko={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function wa(n){if(dl)throw new Error("");if(Jt===null)return;Jt.consumerOnSignalRead(n);let e=Jt.nextProducerIndex++;if(gl(Jt),e<Jt.producerNode.length&&Jt.producerNode[e]!==n&&Sa(Jt)){let t=Jt.producerNode[e];ml(t,Jt.producerIndexOfThis[e])}Jt.producerNode[e]!==n&&(Jt.producerNode[e]=n,Jt.producerIndexOfThis[e]=Sa(Jt)?T0(n,Jt,e):0),Jt.producerLastReadVersion[e]=n.version}function w0(){ch++}function uh(n){if(!(Sa(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===ch)){if(!n.producerMustRecompute(n)&&!pl(n)){sh(n);return}n.producerRecomputeValue(n),sh(n)}}function dh(n){if(n.liveConsumerNode===void 0)return;let e=dl;dl=!0;try{for(let t of n.liveConsumerNode)t.dirty||dT(t)}finally{dl=e}}function fh(){return Jt?.consumerAllowSignalWrites!==!1}function dT(n){n.dirty=!0,dh(n),n.consumerMarkedDirty?.(n)}function sh(n){n.dirty=!1,n.lastCleanEpoch=ch}function Ta(n){return n&&(n.nextProducerIndex=0),Je(n)}function hl(n,e){if(Je(e),!(!n||n.producerNode===void 0||n.producerIndexOfThis===void 0||n.producerLastReadVersion===void 0)){if(Sa(n))for(let t=n.nextProducerIndex;t<n.producerNode.length;t++)ml(n.producerNode[t],n.producerIndexOfThis[t]);for(;n.producerNode.length>n.nextProducerIndex;)n.producerNode.pop(),n.producerLastReadVersion.pop(),n.producerIndexOfThis.pop()}}function pl(n){gl(n);for(let e=0;e<n.producerNode.length;e++){let t=n.producerNode[e],i=n.producerLastReadVersion[e];if(i!==t.version||(uh(t),i!==t.version))return!0}return!1}function Ca(n){if(gl(n),Sa(n))for(let e=0;e<n.producerNode.length;e++)ml(n.producerNode[e],n.producerIndexOfThis[e]);n.producerNode.length=n.producerLastReadVersion.length=n.producerIndexOfThis.length=0,n.liveConsumerNode&&(n.liveConsumerNode.length=n.liveConsumerIndexOfThis.length=0)}function T0(n,e,t){if(C0(n),n.liveConsumerNode.length===0&&D0(n))for(let i=0;i<n.producerNode.length;i++)n.producerIndexOfThis[i]=T0(n.producerNode[i],n,i);return n.liveConsumerIndexOfThis.push(t),n.liveConsumerNode.push(e)-1}function ml(n,e){if(C0(n),n.liveConsumerNode.length===1&&D0(n))for(let i=0;i<n.producerNode.length;i++)ml(n.producerNode[i],n.producerIndexOfThis[i]);let t=n.liveConsumerNode.length-1;if(n.liveConsumerNode[e]=n.liveConsumerNode[t],n.liveConsumerIndexOfThis[e]=n.liveConsumerIndexOfThis[t],n.liveConsumerNode.length--,n.liveConsumerIndexOfThis.length--,e<n.liveConsumerNode.length){let i=n.liveConsumerIndexOfThis[e],r=n.liveConsumerNode[e];gl(r),r.producerIndexOfThis[i]=e}}function Sa(n){return n.consumerIsAlwaysLive||(n?.liveConsumerNode?.length??0)>0}function gl(n){n.producerNode??=[],n.producerIndexOfThis??=[],n.producerLastReadVersion??=[]}function C0(n){n.liveConsumerNode??=[],n.liveConsumerIndexOfThis??=[]}function D0(n){return n.producerNode!==void 0}function hh(n,e){let t=Object.create(fT);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(uh(t),wa(t),t.value===fl)throw t.error;return t.value};return i[oi]=t,i}var rh=Symbol("UNSET"),oh=Symbol("COMPUTING"),fl=Symbol("ERRORED"),fT=Se(fe({},Ko),{value:rh,dirty:!0,error:null,equal:ah,kind:"computed",producerMustRecompute(n){return n.value===rh||n.value===oh},producerRecomputeValue(n){if(n.value===oh)throw new Error("Detected cycle in computations.");let e=n.value;n.value=oh;let t=Ta(n),i,r=!1;try{i=n.computation(),Je(null),r=e!==rh&&e!==fl&&i!==fl&&n.equal(e,i)}catch(o){i=fl,n.error=o}finally{hl(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function hT(){throw new Error}var A0=hT;function I0(n){A0(n)}function ph(n){A0=n}var pT=null;function mh(n,e){let t=Object.create(yl);t.value=n,e!==void 0&&(t.equal=e);let i=()=>(wa(t),t.value);return i[oi]=t,i}function Da(n,e){fh()||I0(n),n.equal(n.value,e)||(n.value=e,mT(n))}function gh(n,e){fh()||I0(n),Da(n,e(n.value))}var yl=Se(fe({},Ko),{equal:ah,value:void 0,kind:"signal"});function mT(n){n.version++,w0(),dh(n),pT?.()}function yh(n){let e=Je(null);try{return n()}finally{Je(e)}}var vh;function Aa(){return vh}function Wi(n){let e=vh;return vh=n,e}var vl=Symbol("NotFound");function ze(n){return typeof n=="function"}function Jo(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var _l=Jo(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Qr(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var fn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(ze(i))try{i()}catch(o){e=o instanceof _l?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{R0(o)}catch(s){e=e??[],s instanceof _l?e=[...e,...s.errors]:e.push(s)}}if(e)throw new _l(e)}}add(e){var t;if(e&&e!==this)if(this.closed)R0(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Qr(t,e)}remove(e){let{_finalizers:t}=this;t&&Qr(t,e),e instanceof n&&e._removeParent(this)}};fn.EMPTY=(()=>{let n=new fn;return n.closed=!0,n})();var _h=fn.EMPTY;function xl(n){return n instanceof fn||n&&"closed"in n&&ze(n.remove)&&ze(n.add)&&ze(n.unsubscribe)}function R0(n){ze(n)?n():n.unsubscribe()}var si={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Qo={setTimeout(n,e,...t){let{delegate:i}=Qo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Qo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function Ml(n){Qo.setTimeout(()=>{let{onUnhandledError:e}=si;if(e)e(n);else throw n})}function $i(){}var N0=xh("C",void 0,void 0);function P0(n){return xh("E",void 0,n)}function L0(n){return xh("N",n,void 0)}function xh(n,e,t){return{kind:n,value:e,error:t}}var eo=null;function es(n){if(si.useDeprecatedSynchronousErrorHandling){let e=!eo;if(e&&(eo={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=eo;if(eo=null,t)throw i}}else n()}function O0(n){si.useDeprecatedSynchronousErrorHandling&&eo&&(eo.errorThrown=!0,eo.error=n)}var to=class extends fn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,xl(e)&&e.add(this)):this.destination=MT}static create(e,t,i){return new qi(e,t,i)}next(e){this.isStopped?bh(L0(e),this):this._next(e)}error(e){this.isStopped?bh(P0(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?bh(N0,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},_T=Function.prototype.bind;function Mh(n,e){return _T.call(n,e)}var Eh=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){bl(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){bl(i)}else bl(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){bl(t)}}},qi=class extends to{constructor(e,t,i){super();let r;if(ze(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let o;this&&si.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Mh(e.next,o),error:e.error&&Mh(e.error,o),complete:e.complete&&Mh(e.complete,o)}):r=e}this.destination=new Eh(r)}};function bl(n){si.useDeprecatedSynchronousErrorHandling?O0(n):Ml(n)}function xT(n){throw n}function bh(n,e){let{onStoppedNotification:t}=si;t&&Qo.setTimeout(()=>t(n,e))}var MT={closed:!0,next:$i,error:xT,complete:$i};var ts=typeof Symbol=="function"&&Symbol.observable||"@@observable";function wi(n){return n}function F0(n){return n.length===0?wi:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var ht=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let o=ET(t)?t:new qi(t,i,r);return es(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=k0(i),new i((r,o)=>{let s=new qi({next:a=>{try{t(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[ts](){return this}pipe(...t){return F0(t)(this)}toPromise(t){return t=k0(t),new t((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return n.create=e=>new n(e),n})();function k0(n){var e;return(e=n??si.Promise)!==null&&e!==void 0?e:Promise}function bT(n){return n&&ze(n.next)&&ze(n.error)&&ze(n.complete)}function ET(n){return n&&n instanceof to||bT(n)&&xl(n)}function ST(n){return ze(n?.lift)}function Ge(n){return e=>{if(ST(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function je(n,e,t,i,r){return new Ia(n,e,t,i,r)}var Ia=class extends to{constructor(e,t,i,r,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var U0=Jo(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var on=(()=>{class n extends ht{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new El(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new U0}next(t){es(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){es(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){es(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:o}=this;return i||r?_h:(this.currentObservers=null,o.push(t),new fn(()=>{this.currentObservers=null,Qr(o,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:o}=this;i?t.error(r):o&&t.complete()}asObservable(){let t=new ht;return t.source=this,t}}return n.create=(e,t)=>new El(e,t),n})(),El=class extends on{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:_h}};var Xi=class extends on{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var Ra={now(){return(Ra.delegate||Date).now()},delegate:void 0};var Na=class extends on{constructor(e=1/0,t=1/0,i=Ra){super(),this._bufferSize=e,this._windowTime=t,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,e),this._windowTime=Math.max(1,t)}next(e){let{isStopped:t,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;t||(i.push(e),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(e)}_subscribe(e){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(e),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!e.closed;s+=i?1:2)e.next(o[s]);return this._checkFinalizedStatuses(e),t}_trimBuffer(){let{_bufferSize:e,_timestampProvider:t,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*e;if(e<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=t.now(),a=0;for(let c=1;c<i.length&&i[c]<=s;c+=2)a=c;a&&i.splice(0,a+1)}}};var Sl=class extends fn{constructor(e,t){super()}schedule(e,t=0){return this}};var Pa={setInterval(n,e,...t){let{delegate:i}=Pa;return i?.setInterval?i.setInterval(n,e,...t):setInterval(n,e,...t)},clearInterval(n){let{delegate:e}=Pa;return(e?.clearInterval||clearInterval)(n)},delegate:void 0};var ns=class extends Sl{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){var i;if(this.closed)return this;this.state=e;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,t)),this.pending=!0,this.delay=t,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,t),this}requestAsyncId(e,t,i=0){return Pa.setInterval(e.flush.bind(e,this),i)}recycleAsyncId(e,t,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return t;t!=null&&Pa.clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(e,t);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let i=!1,r;try{this.work(e)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:e,scheduler:t}=this,{actions:i}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Qr(i,this),e!=null&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null,super.unsubscribe()}}};var is=class n{constructor(e,t=n.now){this.schedulerActionCtor=e,this.now=t}schedule(e,t=0,i){return new this.schedulerActionCtor(this,e).schedule(i,t)}};is.now=Ra.now;var rs=class extends is{constructor(e,t=is.now){super(e,t),this.actions=[],this._active=!1}flush(e){let{actions:t}=this;if(this._active){t.push(e);return}let i;this._active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=t.shift());if(this._active=!1,i){for(;e=t.shift();)e.unsubscribe();throw i}}};var wl=new rs(ns);var Tl=class extends ns{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}schedule(e,t=0){return t>0?super.schedule(e,t):(this.delay=t,this.state=e,this.scheduler.flush(this),this)}execute(e,t){return t>0||this.closed?super.execute(e,t):this._execute(e,t)}requestAsyncId(e,t,i=0){return i!=null&&i>0||i==null&&this.delay>0?super.requestAsyncId(e,t,i):(e.flush(this),0)}};var Cl=class extends rs{};var La=new Cl(Tl);var ai=new ht(n=>n.complete());function B0(n){return n&&ze(n.schedule)}function Sh(n){return n[n.length-1]}function V0(n){return ze(Sh(n))?n.pop():void 0}function Dl(n){return B0(Sh(n))?n.pop():void 0}function H0(n,e){return typeof Sh(n)=="number"?n.pop():e}function G0(n,e,t,i){function r(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(u){try{l(i.next(u))}catch(d){s(d)}}function c(u){try{l(i.throw(u))}catch(d){s(d)}}function l(u){u.done?o(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function z0(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function no(n){return this instanceof no?(this.v=n,this):new no(n)}function j0(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(y){return new Promise(function(m,p){o.push([h,y,m,p])>1||c(h,y)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(y){f(o[0][3],y)}}function l(h){h.value instanceof no?Promise.resolve(h.value.v).then(u,d):f(o[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),o.shift(),o.length&&c(o[0][0],o[0][1])}}function W0(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof z0=="function"?z0(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(o){t[o]=n[o]&&function(s){return new Promise(function(a,c){s=n[o](s),r(a,c,s.done,s.value)})}}function r(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var Al=n=>n&&typeof n.length=="number"&&typeof n!="function";function Il(n){return ze(n?.then)}function Rl(n){return ze(n[ts])}function Nl(n){return Symbol.asyncIterator&&ze(n?.[Symbol.asyncIterator])}function Pl(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function wT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ll=wT();function Ol(n){return ze(n?.[Ll])}function Fl(n){return j0(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield no(t.read());if(r)return yield no(void 0);yield yield no(i)}}finally{t.releaseLock()}})}function kl(n){return ze(n?.getReader)}function yt(n){if(n instanceof ht)return n;if(n!=null){if(Rl(n))return TT(n);if(Al(n))return CT(n);if(Il(n))return DT(n);if(Nl(n))return $0(n);if(Ol(n))return AT(n);if(kl(n))return IT(n)}throw Pl(n)}function TT(n){return new ht(e=>{let t=n[ts]();if(ze(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function CT(n){return new ht(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function DT(n){return new ht(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,Ml)})}function AT(n){return new ht(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function $0(n){return new ht(e=>{RT(n,e).catch(t=>e.error(t))})}function IT(n){return $0(Fl(n))}function RT(n,e){var t,i,r,o;return G0(this,void 0,void 0,function*(){try{for(t=W0(n);i=yield t.next(),!i.done;){let s=i.value;if(e.next(s),e.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=t.return)&&(yield o.call(t))}finally{if(r)throw r.error}}e.complete()})}function Pn(n,e,t,i=0,r=!1){let o=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(o),!r)return o}function Yi(n,e=0){return Ge((t,i)=>{t.subscribe(je(i,r=>Pn(i,n,()=>i.next(r),e),()=>Pn(i,n,()=>i.complete(),e),r=>Pn(i,n,()=>i.error(r),e)))})}function Ul(n,e=0){return Ge((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function q0(n,e){return yt(n).pipe(Ul(e),Yi(e))}function X0(n,e){return yt(n).pipe(Ul(e),Yi(e))}function Y0(n,e){return new ht(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function Z0(n,e){return new ht(t=>{let i;return Pn(t,e,()=>{i=n[Ll](),Pn(t,e,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){t.error(s);return}o?t.complete():t.next(r)},0,!0)}),()=>ze(i?.return)&&i.return()})}function Bl(n,e){if(!n)throw new Error("Iterable cannot be null");return new ht(t=>{Pn(t,e,()=>{let i=n[Symbol.asyncIterator]();Pn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function K0(n,e){return Bl(Fl(n),e)}function J0(n,e){if(n!=null){if(Rl(n))return q0(n,e);if(Al(n))return Y0(n,e);if(Il(n))return X0(n,e);if(Nl(n))return Bl(n,e);if(Ol(n))return Z0(n,e);if(kl(n))return K0(n,e)}throw Pl(n)}function io(n,e){return e?J0(n,e):yt(n)}function Zi(...n){let e=Dl(n);return io(n,e)}function Q0(n,e){let t=ze(n)?n:()=>n,i=r=>r.error(t());return new ht(e?r=>e.schedule(i,0,r):i)}var br=class n{constructor(e,t,i){this.kind=e,this.value=t,this.error=i,this.hasValue=e==="N"}observe(e){return wh(this,e)}do(e,t,i){let{kind:r,value:o,error:s}=this;return r==="N"?e?.(o):r==="E"?t?.(s):i?.()}accept(e,t,i){var r;return ze((r=e)===null||r===void 0?void 0:r.next)?this.observe(e):this.do(e,t,i)}toObservable(){let{kind:e,value:t,error:i}=this,r=e==="N"?Zi(t):e==="E"?Q0(()=>i):e==="C"?ai:0;if(!r)throw new TypeError(`Unexpected notification kind ${e}`);return r}static createNext(e){return new n("N",e)}static createError(e){return new n("E",void 0,e)}static createComplete(){return n.completeNotification}};br.completeNotification=new br("C");function wh(n,e){var t,i,r;let{kind:o,value:s,error:a}=n;if(typeof o!="string")throw new TypeError('Invalid notification, missing "kind"');o==="N"?(t=e.next)===null||t===void 0||t.call(e,s):o==="E"?(i=e.error)===null||i===void 0||i.call(e,a):(r=e.complete)===null||r===void 0||r.call(e)}function e_(n){return n instanceof Date&&!isNaN(n)}var NT=Jo(n=>function(t=null){n(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=t});function Th(n,e){let{first:t,each:i,with:r=PT,scheduler:o=e??wl,meta:s=null}=e_(n)?{first:n}:typeof n=="number"?{each:n}:n;if(t==null&&i==null)throw new TypeError("No timeout provided.");return Ge((a,c)=>{let l,u,d=null,f=0,h=g=>{u=Pn(c,o,()=>{try{l.unsubscribe(),yt(r({meta:s,lastValue:d,seen:f})).subscribe(c)}catch(y){c.error(y)}},g)};l=a.subscribe(je(c,g=>{u?.unsubscribe(),f++,c.next(d=g),i>0&&h(i)},void 0,void 0,()=>{u?.closed||u?.unsubscribe(),d=null})),!f&&h(t!=null?typeof t=="number"?t:+t-o.now():i)})}function PT(n){throw new NT(n)}function Vt(n,e){return Ge((t,i)=>{let r=0;t.subscribe(je(i,o=>{i.next(n.call(e,o,r++))}))})}function t_(n,e,t,i,r,o,s,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=y=>l<i?g(y):c.push(y),g=y=>{o&&e.next(y),l++;let m=!1;yt(t(y,u++)).subscribe(je(e,p=>{r?.(p),o?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(l--;c.length&&l<i;){let p=c.shift();s?Pn(e,s,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(je(e,h,()=>{d=!0,f()})),()=>{a?.()}}function Ti(n,e,t=1/0){return ze(e)?Ti((i,r)=>Vt((o,s)=>e(i,o,r,s))(yt(n(i,r))),t):(typeof e=="number"&&(t=e),Ge((i,r)=>t_(i,r,n,t)))}function n_(n=1/0){return Ti(wi,n)}function ro(...n){let e=Dl(n),t=H0(n,1/0),i=n;return i.length?i.length===1?yt(i[0]):n_(t)(io(i,e)):ai}function sn(n,e){return Ge((t,i)=>{let r=0;t.subscribe(je(i,o=>n.call(e,o,r++)&&i.next(o)))})}function os(n){return Ge((e,t)=>{let i=null,r=!1,o;i=e.subscribe(je(t,void 0,void 0,s=>{o=yt(n(s,os(n)(e))),i?(i.unsubscribe(),i=null,o.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(t))})}function i_(n,e,t,i,r){return(o,s)=>{let a=t,c=e,l=0;o.subscribe(je(s,u=>{let d=l++;c=a?n(c,u,d):(a=!0,u),i&&s.next(c)},r&&(()=>{a&&s.next(c),s.complete()})))}}function Vl(n,e){return ze(e)?Ti(n,e,1):Ti(n,1)}function ss(n,e=wl){return Ge((t,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let l=o;o=null,i.next(l)}};function c(){let l=s+n,u=e.now();if(u<l){r=this.schedule(void 0,l-u),i.add(r);return}a()}t.subscribe(je(i,l=>{o=l,s=e.now(),r||(r=e.schedule(c,n),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function Oa(n){return n<=0?()=>ai:Ge((e,t)=>{let i=0;e.subscribe(je(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function Ch(){return Ge((n,e)=>{n.subscribe(je(e,$i))})}function Dh(){return Ge((n,e)=>{n.subscribe(je(e,t=>wh(t,e)))})}function Ah(n,e=wi){return n=n??LT,Ge((t,i)=>{let r,o=!0;t.subscribe(je(i,s=>{let a=e(s);(o||!n(r,a))&&(o=!1,r=a,i.next(s))}))})}function LT(n,e){return n===e}function oo(n,e){return e?t=>t.pipe(oo((i,r)=>yt(n(i,r)).pipe(Vt((o,s)=>e(i,o,r,s))))):Ge((t,i)=>{let r=0,o=null,s=!1;t.subscribe(je(i,a=>{o||(o=je(i,void 0,()=>{o=null,s&&i.complete()}),yt(n(a,r++)).subscribe(o))},()=>{s=!0,!o&&i.complete()}))})}function Hl(n,e,t,i){return Ge((r,o)=>{let s;!e||typeof e=="function"?s=e:{duration:t,element:s,connector:i}=e;let a=new Map,c=g=>{a.forEach(g),g(o)},l=g=>c(y=>y.error(g)),u=0,d=!1,f=new Ia(o,g=>{try{let y=n(g),m=a.get(y);if(!m){a.set(y,m=i?i():new on);let p=h(y,m);if(o.next(p),t){let E=je(m,()=>{m.complete(),E?.unsubscribe()},void 0,void 0,()=>a.delete(y));f.add(yt(t(p)).subscribe(E))}}m.next(s?s(g):g)}catch(y){l(y)}},()=>c(g=>g.complete()),l,()=>a.clear(),()=>(d=!0,u===0));r.subscribe(f);function h(g,y){let m=new ht(p=>{u++;let E=y.subscribe(p);return()=>{E.unsubscribe(),--u===0&&d&&f.unsubscribe()}});return m.key=g,m}})}function Ih(){return Ge((n,e)=>{n.subscribe(je(e,t=>{e.next(br.createNext(t))},()=>{e.next(br.createComplete()),e.complete()},t=>{e.next(br.createError(t)),e.complete()}))})}function Rh(...n){let e=n.length;if(e===0)throw new Error("list of properties cannot be empty.");return Vt(t=>{let i=t;for(let r=0;r<e;r++){let o=i?.[n[r]];if(typeof o<"u")i=o;else return}return i})}function Fa(n,e){return Ge(i_(n,e,arguments.length>=2,!0))}function Ph(n={}){let{connector:e=()=>new on,resetOnError:t=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=n;return o=>{let s,a,c,l=0,u=!1,d=!1,f=()=>{a?.unsubscribe(),a=void 0},h=()=>{f(),s=c=void 0,u=d=!1},g=()=>{let y=s;h(),y?.unsubscribe()};return Ge((y,m)=>{l++,!d&&!u&&f();let p=c=c??e();m.add(()=>{l--,l===0&&!d&&!u&&(a=Nh(g,r))}),p.subscribe(m),!s&&l>0&&(s=new qi({next:E=>p.next(E),error:E=>{d=!0,f(),a=Nh(h,t,E),p.error(E)},complete:()=>{u=!0,f(),a=Nh(h,i),p.complete()}}),yt(y).subscribe(s))})(o)}}function Nh(n,e,...t){if(e===!0){n();return}if(e===!1)return;let i=new qi({next:()=>{i.unsubscribe(),n()}});return yt(e(...t)).subscribe(i)}function as(n){return sn((e,t)=>n<=t)}function so(n,e){return Ge((t,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();t.subscribe(je(i,c=>{r?.unsubscribe();let l=0,u=o++;yt(n(c,u)).subscribe(r=je(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function ka(n){return Ge((e,t)=>{yt(n).subscribe(je(t,()=>t.complete(),$i)),!t.closed&&e.subscribe(t)})}function Ht(n,e,t){let i=ze(n)||e||t?{next:n,error:e,complete:t}:n;return i?Ge((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(je(o,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),o.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),o.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),o.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):wi}function ci(...n){let e=V0(n);return Ge((t,i)=>{let r=n.length,o=new Array(r),s=n.map(()=>!1),a=!1;for(let c=0;c<r;c++)yt(n[c]).subscribe(je(i,l=>{o[c]=l,!a&&!s[c]&&(s[c]=!0,(a=s.every(wi))&&(s=null))},$i));t.subscribe(je(i,c=>{if(a){let l=[c,...o];i.next(e?e(...l):l)}}))})}var OT="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",Qe=class extends Error{code;constructor(e,t){super(kT(e,t)),this.code=e}};function FT(n){return`NG0${Math.abs(n)}`}function kT(n,e){return`${FT(n)}${e?": "+e:""}`}var z_=Symbol("InputSignalNode#UNSET"),UT=Se(fe({},yl),{transformFn:void 0,applyValueToInputSignal(n,e){Da(n,e)}});function G_(n,e){let t=Object.create(UT);t.value=n,t.transformFn=e?.transform;function i(){if(wa(t),t.value===z_){let r=null;throw new Qe(-950,r)}return t.value}return i[oi]=t,i}function Bp(n){return{toString:n}.toString()}var zl="__parameters__";function BT(n){return function(...t){if(n){let i=n(...t);for(let r in i)this[r]=i[r]}}}function VT(n,e,t){return Bp(()=>{let i=BT(e);function r(...o){if(this instanceof r)return i.apply(this,o),this;let s=new r(...o);return a.annotation=s,a;function a(c,l,u){let d=c.hasOwnProperty(zl)?c[zl]:Object.defineProperty(c,zl,{value:[]})[zl];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(s),c}}return r.prototype.ngMetadataName=n,r.annotationCls=r,r})}var Ba=globalThis;function Lt(n){for(let e in n)if(n[e]===Lt)return e;throw Error("Could not find renamed property on target object.")}function Qn(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(Qn).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function r_(n,e){return n?e?`${n} ${e}`:n:e||""}var HT=Lt({__forward_ref__:Lt});function j_(n){return n.__forward_ref__=j_,n.toString=function(){return Qn(this())},n}function Jn(n){return W_(n)?n():n}function W_(n){return typeof n=="function"&&n.hasOwnProperty(HT)&&n.__forward_ref__===j_}function Ye(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Vp(n){return o_(n,$_)||o_(n,q_)}function o_(n,e){return n.hasOwnProperty(e)?n[e]:null}function zT(n){let e=n&&(n[$_]||n[q_]);return e||null}function s_(n){return n&&(n.hasOwnProperty(a_)||n.hasOwnProperty(GT))?n[a_]:null}var $_=Lt({\u0275prov:Lt}),a_=Lt({\u0275inj:Lt}),q_=Lt({ngInjectableDef:Lt}),GT=Lt({ngInjectorDef:Lt}),ue=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Ye({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function X_(n){return n&&!!n.\u0275providers}var jT=Lt({\u0275cmp:Lt}),WT=Lt({\u0275dir:Lt}),$T=Lt({\u0275pipe:Lt});var Zl=Lt({\u0275fac:Lt}),za=Lt({__NG_ELEMENT_ID__:Lt}),c_=Lt({__NG_ENV_ID__:Lt});function Ga(n){return typeof n=="string"?n:n==null?"":String(n)}function qT(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():Ga(n)}function Y_(n,e){throw new Qe(-200,n)}function Hp(n,e){throw new Qe(-201,!1)}var tt=function(n){return n[n.Default=0]="Default",n[n.Host=1]="Host",n[n.Self=2]="Self",n[n.SkipSelf=4]="SkipSelf",n[n.Optional=8]="Optional",n}(tt||{}),qh;function Z_(){return qh}function Ln(n){let e=qh;return qh=n,e}function K_(n,e,t){let i=Vp(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&tt.Optional)return null;if(e!==void 0)return e;Hp(n,"Injector")}var XT={},co=XT,Xh="__NG_DI_FLAG__",Kl=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=t;return this.injector.get(e,i.optional?vl:co,i)}},Jl="ngTempTokenPath",YT="ngTokenPath",ZT=/\n/gm,KT="\u0275",l_="__source";function JT(n,e=tt.Default){if(Aa()===void 0)throw new Qe(-203,!1);if(Aa()===null)return K_(n,void 0,e);{let t=Aa(),i;return t instanceof Kl?i=t.injector:i=t,i.get(n,e&tt.Optional?null:void 0,e)}}function we(n,e=tt.Default){return(Z_()||JT)(Jn(n),e)}function ce(n,e=tt.Default){return we(n,xu(e))}function xu(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function Yh(n){let e=[];for(let t=0;t<n.length;t++){let i=Jn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Qe(900,!1);let r,o=tt.Default;for(let s=0;s<i.length;s++){let a=i[s],c=eC(a);typeof c=="number"?c===-1?r=a.token:o|=c:r=a}e.push(we(r,o))}else e.push(we(i))}return e}function QT(n,e){return n[Xh]=e,n.prototype[Xh]=e,n}function eC(n){return n[Xh]}function tC(n,e,t,i){let r=n[Jl];throw e[l_]&&r.unshift(e[l_]),n.message=nC(`
`+n.message,r,t,i),n[YT]=r,n[Jl]=null,n}function nC(n,e,t,i=null){n=n&&n.charAt(0)===`
`&&n.charAt(1)==KT?n.slice(2):n;let r=Qn(e);if(Array.isArray(e))r=e.map(Qn).join(" -> ");else if(typeof e=="object"){let o=[];for(let s in e)if(e.hasOwnProperty(s)){let a=e[s];o.push(s+":"+(typeof a=="string"?JSON.stringify(a):Qn(a)))}r=`{${o.join(", ")}}`}return`${t}${i?"("+i+")":""}[${r}]: ${n.replace(ZT,`
  `)}`}var zp=QT(VT("Inject",n=>({token:n})),-1);function fo(n,e){let t=n.hasOwnProperty(Zl);return t?n[Zl]:null}function iC(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],o=e[i];if(t&&(r=t(r),o=t(o)),o!==r)return!1}return!0}function rC(n){return n.flat(Number.POSITIVE_INFINITY)}function Gp(n,e){n.forEach(t=>Array.isArray(t)?Gp(t,e):e(t))}function J_(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function Ql(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function oC(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let o=r-2;n[r]=n[o],r--}n[e]=t,n[e+1]=i}}function sC(n,e,t){let i=ic(n,e);return i>=0?n[i|1]=t:(i=~i,oC(n,i,e,t)),i}function Lh(n,e){let t=ic(n,e);if(t>=0)return n[t|1]}function ic(n,e){return aC(n,e,1)}function aC(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let o=i+(r-i>>1),s=n[o<<t];if(e===s)return o<<t;s>e?r=o:i=o+1}return~(r<<t)}var fs={},ho=[],ja=new ue(""),Q_=new ue("",-1),ex=new ue(""),eu=class{get(e,t=co){if(t===co){let i=new Error(`NullInjectorError: No provider for ${Qn(e)}!`);throw i.name="NullInjectorError",i}return t}};function Wa(n){return n[jT]||null}function cC(n){return n[WT]||null}function lC(n){return n[$T]||null}function Qi(n){return{\u0275providers:n}}function rc(n){return Qi([{provide:ja,multi:!0,useValue:n}])}function uC(...n){return{\u0275providers:tx(!0,n),\u0275fromNgModule:!0}}function tx(n,...e){let t=[],i=new Set,r,o=s=>{t.push(s)};return Gp(e,s=>{let a=s;Zh(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&nx(r,o),t}function nx(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];jp(r,o=>{e(o,i)})}}function Zh(n,e,t,i){if(n=Jn(n),!n)return!1;let r=null,o=s_(n),s=!o&&Wa(n);if(!o&&!s){let c=n.ngModule;if(o=s_(c),o)r=c;else return!1}else{if(s&&!s.standalone)return!1;r=n}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)Zh(l,e,t,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let l;try{Gp(o.imports,u=>{Zh(u,e,t,i)&&(l||=[],l.push(u))})}finally{}l!==void 0&&nx(l,e)}if(!a){let l=fo(r)||(()=>new r);e({provide:r,useFactory:l,deps:ho},r),e({provide:ex,useValue:r,multi:!0},r),e({provide:ja,useValue:()=>we(r),multi:!0},r)}let c=o.providers;if(c!=null&&!a){let l=n;jp(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function jp(n,e){for(let t of n)X_(t)&&(t=t.\u0275providers),Array.isArray(t)?jp(t,e):e(t)}var dC=Lt({provide:String,useValue:Lt});function ix(n){return n!==null&&typeof n=="object"&&dC in n}function fC(n){return!!(n&&n.useExisting)}function hC(n){return!!(n&&n.useFactory)}function Kh(n){return typeof n=="function"}var Mu=new ue(""),jl={},u_={},Oh;function Wp(){return Oh===void 0&&(Oh=new eu),Oh}var wr=class{},$a=class extends wr{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Qh(e,s=>this.processProvider(s)),this.records.set(Q_,cs(void 0,this)),r.has("environment")&&this.records.set(wr,cs(void 0,this));let o=this.records.get(Mu);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(ex,ho,tt.Self))}retrieve(e,t){let i=t;return this.get(e,i.optional?vl:co,i)}destroy(){Va(this),this._destroyed=!0;let e=Je(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Je(e)}}onDestroy(e){return Va(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Va(this);let t=Wi(this),i=Ln(void 0),r;try{return e()}finally{Wi(t),Ln(i)}}get(e,t=co,i=tt.Default){if(Va(this),e.hasOwnProperty(c_))return e[c_](this);i=xu(i);let r,o=Wi(this),s=Ln(void 0);try{if(!(i&tt.SkipSelf)){let c=this.records.get(e);if(c===void 0){let l=_C(e)&&Vp(e);l&&this.injectableDefInScope(l)?c=cs(Jh(e),jl):c=null,this.records.set(e,c)}if(c!=null)return this.hydrate(e,c,i)}let a=i&tt.Self?Wp():this.parent;return t=i&tt.Optional&&t===co?null:t,a.get(e,t)}catch(a){if(a.name==="NullInjectorError"){if((a[Jl]=a[Jl]||[]).unshift(Qn(e)),o)throw a;return tC(a,e,"R3InjectorError",this.source)}else throw a}finally{Ln(s),Wi(o)}}resolveInjectorInitializers(){let e=Je(null),t=Wi(this),i=Ln(void 0),r;try{let o=this.get(ja,ho,tt.Self);for(let s of o)s()}finally{Wi(t),Ln(i),Je(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(Qn(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=Jn(e);let t=Kh(e)?e:Jn(e&&e.provide),i=mC(e);if(!Kh(e)&&e.multi===!0){let r=this.records.get(t);r||(r=cs(void 0,jl,!0),r.factory=()=>Yh(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Je(null);try{return t.value===u_?Y_(Qn(e)):t.value===jl&&(t.value=u_,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&vC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Je(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Jn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Jh(n){let e=Vp(n),t=e!==null?e.factory:fo(n);if(t!==null)return t;if(n instanceof ue)throw new Qe(204,!1);if(n instanceof Function)return pC(n);throw new Qe(204,!1)}function pC(n){if(n.length>0)throw new Qe(204,!1);let t=zT(n);return t!==null?()=>t.factory(n):()=>new n}function mC(n){if(ix(n))return cs(void 0,n.useValue);{let e=gC(n);return cs(e,jl)}}function gC(n,e,t){let i;if(Kh(n)){let r=Jn(n);return fo(r)||Jh(r)}else if(ix(n))i=()=>Jn(n.useValue);else if(hC(n))i=()=>n.useFactory(...Yh(n.deps||[]));else if(fC(n))i=(r,o)=>we(Jn(n.useExisting),o!==void 0&&o&tt.Optional?tt.Optional:void 0);else{let r=Jn(n&&(n.useClass||n.provide));if(yC(n))i=()=>new r(...Yh(n.deps));else return fo(r)||Jh(r)}return i}function Va(n){if(n.destroyed)throw new Qe(205,!1)}function cs(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function yC(n){return!!n.deps}function vC(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function _C(n){return typeof n=="function"||typeof n=="object"&&n instanceof ue}function Qh(n,e){for(let t of n)Array.isArray(t)?Qh(t,e):t&&X_(t)?Qh(t.\u0275providers,e):e(t)}function rx(n,e){let t;n instanceof $a?(Va(n),t=n):t=new Kl(n);let i,r=Wi(t),o=Ln(void 0);try{return e()}finally{Wi(r),Ln(o)}}function ox(){return Z_()!==void 0||Aa()!=null}function $p(n){if(!ox())throw new Qe(-203,!1)}function xC(n){return typeof n=="function"}var er=0,We=1,He=2,vn=3,ui=4,fi=5,qa=6,tu=7,Qt=8,hs=9,Tr=10,_n=11,Xa=12,d_=13,_s=14,Di=15,po=16,ls=17,Ki=18,bu=19,sx=20,Sr=21,Fh=22,mo=23,ei=24,kh=25,On=26,ax=1;var go=7,nu=8,ps=9,yn=10;function lo(n){return Array.isArray(n)&&typeof n[ax]=="object"}function tr(n){return Array.isArray(n)&&n[ax]===!0}function cx(n){return(n.flags&4)!==0}function oc(n){return n.componentOffset>-1}function qp(n){return(n.flags&1)===1}function xo(n){return!!n.template}function iu(n){return(n[He]&512)!==0}function xs(n){return(n[He]&256)===256}var ep=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function lx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}function MC(n){return n.type.prototype.ngOnChanges&&(n.setInput=EC),bC}function bC(){let n=dx(this),e=n?.current;if(e){let t=n.previous;if(t===fs)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function EC(n,e,t,i,r){let o=this.declaredInputs[i],s=dx(n)||SC(n,{previous:fs,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new ep(l&&l.currentValue,t,c===fs),lx(n,e,r,t)}var ux="__ngSimpleChanges__";function dx(n){return n[ux]||null}function SC(n,e){return n[ux]=e}var f_=null;var It=function(n,e=null,t){f_?.(n,e,t)},fx="svg",wC="math";function Ai(n){for(;Array.isArray(n);)n=n[er];return n}function hx(n,e){return Ai(e[n])}function Ri(n,e){return Ai(e[n.index])}function Xp(n,e){return n.data[e]}function TC(n,e){return n[e]}function CC(n,e,t,i){t>=n.data.length&&(n.data[t]=null,n.blueprint[t]=null),e[t]=i}function Cr(n,e){let t=e[n];return lo(t)?t:t[er]}function DC(n){return(n[He]&4)===4}function Yp(n){return(n[He]&128)===128}function AC(n){return tr(n[vn])}function ms(n,e){return e==null?null:n[e]}function px(n){n[ls]=0}function mx(n){n[He]&1024||(n[He]|=1024,Yp(n)&&sc(n))}function IC(n,e){for(;n>0;)e=e[_s],n--;return e}function Eu(n){return!!(n[He]&9216||n[ei]?.dirty)}function tp(n){n[Tr].changeDetectionScheduler?.notify(8),n[He]&64&&(n[He]|=1024),Eu(n)&&sc(n)}function sc(n){n[Tr].changeDetectionScheduler?.notify(0);let e=yo(n);for(;e!==null&&!(e[He]&8192||(e[He]|=8192,!Yp(e)));)e=yo(e)}function gx(n,e){if(xs(n))throw new Qe(911,!1);n[Sr]===null&&(n[Sr]=[]),n[Sr].push(e)}function RC(n,e){if(n[Sr]===null)return;let t=n[Sr].indexOf(e);t!==-1&&n[Sr].splice(t,1)}function yo(n){let e=n[vn];return tr(e)?e[vn]:e}function Zp(n){return n[tu]??=[]}function Kp(n){return n.cleanup??=[]}function NC(n,e,t,i){let r=Zp(e);r.push(t),n.firstCreatePass&&Kp(n).push(i,r.length-1)}var Xe={lFrame:wx(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var np=!1;function PC(){return Xe.lFrame.elementDepthCount}function LC(){Xe.lFrame.elementDepthCount++}function OC(){Xe.lFrame.elementDepthCount--}function yx(){return Xe.bindingsEnabled}function FC(){return Xe.skipHydrationRootTNode!==null}function kC(n){return Xe.skipHydrationRootTNode===n}function UC(){Xe.skipHydrationRootTNode=null}function xt(){return Xe.lFrame.lView}function Gn(){return Xe.lFrame.tView}function ac(n){return Xe.lFrame.contextLView=n,n[Qt]}function cc(n){return Xe.lFrame.contextLView=null,n}function nr(){let n=vx();for(;n!==null&&n.type===64;)n=n.parent;return n}function vx(){return Xe.lFrame.currentTNode}function BC(){let n=Xe.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function lc(n,e){let t=Xe.lFrame;t.currentTNode=n,t.isParent=e}function _x(){return Xe.lFrame.isParent}function VC(){Xe.lFrame.isParent=!1}function xx(){return np}function ru(n){let e=np;return np=n,e}function HC(){let n=Xe.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function zC(){return Xe.lFrame.bindingIndex}function GC(n){return Xe.lFrame.bindingIndex=n}function uc(){return Xe.lFrame.bindingIndex++}function Mx(n){let e=Xe.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function jC(){return Xe.lFrame.inI18n}function WC(n,e){let t=Xe.lFrame;t.bindingIndex=t.bindingRootIndex=n,ip(e)}function $C(){return Xe.lFrame.currentDirectiveIndex}function ip(n){Xe.lFrame.currentDirectiveIndex=n}function qC(n){let e=Xe.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function bx(){return Xe.lFrame.currentQueryIndex}function Jp(n){Xe.lFrame.currentQueryIndex=n}function XC(n){let e=n[We];return e.type===2?e.declTNode:e.type===1?n[fi]:null}function Ex(n,e,t){if(t&tt.SkipSelf){let r=e,o=n;for(;r=r.parent,r===null&&!(t&tt.Host);)if(r=XC(o),r===null||(o=o[_s],r.type&10))break;if(r===null)return!1;e=r,n=o}let i=Xe.lFrame=Sx();return i.currentTNode=e,i.lView=n,!0}function Qp(n){let e=Sx(),t=n[We];Xe.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function Sx(){let n=Xe.lFrame,e=n===null?null:n.child;return e===null?wx(n):e}function wx(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function Tx(){let n=Xe.lFrame;return Xe.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Cx=Tx;function em(){let n=Tx();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function YC(n){return(Xe.lFrame.contextLView=IC(n,Xe.lFrame.contextLView))[Qt]}function Ar(){return Xe.lFrame.selectedIndex}function vo(n){Xe.lFrame.selectedIndex=n}function Dx(){let n=Xe.lFrame;return Xp(n.tView,n.selectedIndex)}function Ms(){Xe.lFrame.currentNamespace=fx}function Ax(){ZC()}function ZC(){Xe.lFrame.currentNamespace=null}function KC(){return Xe.lFrame.currentNamespace}var Ix=!0;function tm(){return Ix}function nm(n){Ix=n}function JC(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=e.type.prototype;if(i){let s=MC(e);(t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s)}r&&(t.preOrderHooks??=[]).push(0-n,r),o&&((t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o))}function Rx(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let o=n.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=o;s&&(n.contentHooks??=[]).push(-t,s),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Wl(n,e,t){Nx(n,e,3,t)}function $l(n,e,t,i){(n[He]&3)===t&&Nx(n,e,t,i)}function Uh(n,e){let t=n[He];(t&3)===e&&(t&=16383,t+=1,n[He]=t)}function Nx(n,e,t,i){let r=i!==void 0?n[ls]&65535:0,o=i??-1,s=e.length-1,a=0;for(let c=r;c<s;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[ls]+=65536),(a<o||o==-1)&&(QC(n,t,e,c),n[ls]=(n[ls]&4294901760)+c+2),c++}function h_(n,e){It(4,n,e);let t=Je(null);try{e.call(n)}finally{Je(t),It(5,n,e)}}function QC(n,e,t,i){let r=t[i]<0,o=t[i+1],s=r?-t[i]:t[i],a=n[s];r?n[He]>>14<n[ls]>>16&&(n[He]&3)===e&&(n[He]+=16384,h_(a,o)):h_(a,o)}var ds=-1,Ya=class{factory;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i){this.factory=e,this.canSeeViewProviders=t,this.injectImpl=i}};function eD(n){return(n.flags&8)!==0}function tD(n){return(n.flags&16)!==0}function nD(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let o=t[i++],s=t[i++],a=t[i++];n.setAttribute(e,s,a,o)}else{let o=r,s=t[++i];rD(o)?n.setProperty(e,o,s):n.setAttribute(e,o,s),i++}}return i}function iD(n){return n===3||n===4||n===6}function rD(n){return n.charCodeAt(0)===64}function im(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?p_(n,t,r,null,e[++i]):p_(n,t,r,null,null))}}return n}function p_(n,e,t,i,r){let o=0,s=n.length;if(e===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===t){r!==null&&(n[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(n.splice(s,0,e),o=s+1),n.splice(o++,0,t),r!==null&&n.splice(o++,0,r)}function Px(n){return n!==ds}function ou(n){return n&32767}function oD(n){return n>>16}function su(n,e){let t=oD(n),i=e;for(;t>0;)i=i[_s],t--;return i}var rp=!0;function au(n){let e=rp;return rp=n,e}var sD=256,Lx=sD-1,Ox=5,aD=0,Ci={};function cD(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(za)&&(i=t[za]),i==null&&(i=t[za]=aD++);let r=i&Lx,o=1<<r;e.data[n+(r>>Ox)]|=o}function Fx(n,e){let t=kx(n,e);if(t!==-1)return t;let i=e[We];i.firstCreatePass&&(n.injectorIndex=e.length,Bh(i.data,n),Bh(e,null),Bh(i.blueprint,null));let r=rm(n,e),o=n.injectorIndex;if(Px(r)){let s=ou(r),a=su(r,e),c=a[We].data;for(let l=0;l<8;l++)e[o+l]=a[s+l]|c[s+l]}return e[o+8]=r,o}function Bh(n,e){n.push(0,0,0,0,0,0,0,0,e)}function kx(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function rm(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=zx(r),i===null)return ds;if(t++,r=r[_s],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return ds}function lD(n,e,t){cD(n,e,t)}function Ux(n,e,t){if(t&tt.Optional||n!==void 0)return n;Hp(e,"NodeInjector")}function Bx(n,e,t,i){if(t&tt.Optional&&i===void 0&&(i=null),(t&(tt.Self|tt.Host))===0){let r=n[hs],o=Ln(void 0);try{return r?r.get(e,i,t&tt.Optional):K_(e,i,t&tt.Optional)}finally{Ln(o)}}return Ux(i,e,t)}function Vx(n,e,t,i=tt.Default,r){if(n!==null){if(e[He]&2048&&!(i&tt.Self)){let s=hD(n,e,t,i,Ci);if(s!==Ci)return s}let o=Hx(n,e,t,i,Ci);if(o!==Ci)return o}return Bx(e,t,i,r)}function Hx(n,e,t,i,r){let o=dD(t);if(typeof o=="function"){if(!Ex(e,n,i))return i&tt.Host?Ux(r,t,i):Bx(e,t,i,r);try{let s;if(s=o(i),s==null&&!(i&tt.Optional))Hp(t);else return s}finally{Cx()}}else if(typeof o=="number"){let s=null,a=kx(n,e),c=ds,l=i&tt.Host?e[Di][fi]:null;for((a===-1||i&tt.SkipSelf)&&(c=a===-1?rm(n,e):e[a+8],c===ds||!g_(i,!1)?a=-1:(s=e[We],a=ou(c),e=su(c,e)));a!==-1;){let u=e[We];if(m_(o,a,u.data)){let d=uD(a,e,t,s,i,l);if(d!==Ci)return d}c=e[a+8],c!==ds&&g_(i,e[We].data[a+8]===l)&&m_(o,a,e)?(s=u,a=ou(c),e=su(c,e)):a=-1}}return r}function uD(n,e,t,i,r,o){let s=e[We],a=s.data[n+8],c=i==null?oc(a)&&rp:i!=s&&(a.type&3)!==0,l=r&tt.Host&&o===a,u=ql(a,s,t,c,l);return u!==null?cu(e,s,u,a,r):Ci}function ql(n,e,t,i,r){let o=n.providerIndexes,s=e.data,a=o&1048575,c=n.directiveStart,l=n.directiveEnd,u=o>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=s[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=s[c];if(h&&xo(h)&&h.type===t)return c}return null}function cu(n,e,t,i,r){let o=n[t],s=e.data;if(o instanceof Ya){let a=o;a.resolving&&Y_(qT(s[t]));let c=au(a.canSeeViewProviders);a.resolving=!0;let l,u=a.injectImpl?Ln(a.injectImpl):null,d=Ex(n,i,tt.Default);try{o=n[t]=a.factory(void 0,r,s,n,i),e.firstCreatePass&&t>=i.directiveStart&&JC(t,s[t],e)}finally{u!==null&&Ln(u),au(c),a.resolving=!1,Cx()}}return o}function dD(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(za)?n[za]:void 0;return typeof e=="number"?e>=0?e&Lx:fD:e}function m_(n,e,t){let i=1<<n;return!!(t[e+(n>>Ox)]&i)}function g_(n,e){return!(n&tt.Self)&&!(n&tt.Host&&e)}var uo=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Vx(this._tNode,this._lView,e,xu(i),t)}};function fD(){return new uo(nr(),xt())}function Su(n){return Bp(()=>{let e=n.prototype.constructor,t=e[Zl]||op(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let o=r[Zl]||op(r);if(o&&o!==t)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function op(n){return W_(n)?()=>{let e=op(Jn(n));return e&&e()}:fo(n)}function hD(n,e,t,i,r){let o=n,s=e;for(;o!==null&&s!==null&&s[He]&2048&&!iu(s);){let a=Hx(o,s,t,i|tt.Self,Ci);if(a!==Ci)return a;let c=o.parent;if(!c){let l=s[sx];if(l){let u=l.get(t,Ci,i);if(u!==Ci)return u}c=zx(s),s=s[_s]}o=c}return r}function zx(n){let e=n[We],t=e.type;return t===2?e.declTNode:t===1?n[fi]:null}function y_(n,e=null,t=null,i){let r=pD(n,e,t,i);return r.resolveInjectorInitializers(),r}function pD(n,e=null,t=null,i,r=new Set){let o=[t||ho,uC(n)];return i=i||(typeof n=="object"?void 0:Qn(n)),new $a(o,e||Wp(),i||null,r)}var di=class n{static THROW_IF_NOT_FOUND=co;static NULL=new eu;static create(e,t){if(Array.isArray(e))return y_({name:""},t,e,"");{let i=e.name??"";return y_({name:i},e.parent,e.providers,i)}}static \u0275prov=Ye({token:n,providedIn:"any",factory:()=>we(Q_)});static __NG_ELEMENT_ID__=-1};var mD=new ue("");mD.__NG_ELEMENT_ID__=n=>{let e=nr();if(e===null)throw new Qe(204,!1);if(e.type&2)return e.value;if(n&tt.Optional)return null;throw new Qe(204,!1)};var Gx=!1,bs=(()=>{class n{static __NG_ELEMENT_ID__=gD;static __NG_ENV_ID__=t=>t}return n})(),lu=class extends bs{_lView;constructor(e){super(),this._lView=e}onDestroy(e){let t=this._lView;return xs(t)?(e(),()=>{}):(gx(t,e),()=>RC(t,e))}};function gD(){return new lu(xt())}var gs=class{},om=new ue("",{providedIn:"root",factory:()=>!1});var jx=new ue(""),Wx=new ue(""),wu=(()=>{class n{taskId=0;pendingTasks=new Set;get _hasPendingTasks(){return this.hasPendingTasks.value}hasPendingTasks=new Xi(!1);add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static \u0275prov=Ye({token:n,providedIn:"root",factory:()=>new n})}return n})();var sp=class extends on{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,ox()&&(this.destroyRef=ce(bs,{optional:!0})??void 0,this.pendingTasks=ce(wu,{optional:!0})??void 0)}emit(e){let t=Je(null);try{super.next(e)}finally{Je(t)}}subscribe(e,t,i){let r=e,o=t||(()=>null),s=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return e instanceof fn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Er=sp;function Za(...n){}function $x(n){let e,t;function i(){n=Za;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function v_(n){return queueMicrotask(()=>n()),()=>{n=Za}}var sm="isAngularZone",uu=sm+"_ID",yD=0,Xt=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Er(!1);onMicrotaskEmpty=new Er(!1);onStable=new Er(!1);onError=new Er(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=Gx}=e;if(typeof Zone>"u")throw new Qe(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,xD(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(sm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Qe(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Qe(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,e,vD,Za,Za);try{return o.runTask(s,t,i)}finally{o.cancelTask(s)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},vD={};function am(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function _D(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){$x(()=>{n.callbackScheduled=!1,ap(n),n.isCheckStableRunning=!0,am(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),ap(n)}function xD(n){let e=()=>{_D(n)},t=yD++;n._inner=n._inner.fork({name:"angular",properties:{[sm]:!0,[uu]:t,[uu+t]:!0},onInvokeTask:(i,r,o,s,a,c)=>{if(MD(c))return i.invokeTask(o,s,a,c);try{return __(n),i.invokeTask(o,s,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),x_(n)}},onInvoke:(i,r,o,s,a,c,l)=>{try{return __(n),i.invoke(o,s,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!bD(c)&&e(),x_(n)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,ap(n),am(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function ap(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function __(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function x_(n){n._nesting--,am(n)}var cp=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Er;onMicrotaskEmpty=new Er;onStable=new Er;onError=new Er;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function MD(n){return qx(n,"__ignore_ng_zone__")}function bD(n){return qx(n,"__scheduler_tick__")}function qx(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var zn=class{_console=console;handleError(e){this._console.error("ERROR",e)}},ED=new ue("",{providedIn:"root",factory:()=>{let n=ce(Xt),e=ce(zn);return t=>n.runOutsideAngular(()=>e.handleError(t))}});function M_(n,e){return G_(n,e)}function SD(n){return G_(z_,n)}var cm=(M_.required=SD,M_);function wD(){return Es(nr(),xt())}function Es(n,e){return new Mo(Ri(n,e))}var Mo=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=wD}return n})();function TD(n){return n instanceof Mo?n.nativeElement:n}function hi(n,e){let t=mh(n,e?.equal),i=t[oi];return t.set=r=>Da(i,r),t.update=r=>gh(i,r),t.asReadonly=CD.bind(t),t}function CD(){let n=this[oi];if(n.readonlyFn===void 0){let e=()=>this();e[oi]=n,n.readonlyFn=e}return n.readonlyFn}function DD(){return this._results[Symbol.iterator]()}var lp=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new on}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=rC(e);(this._changesDetected=!iC(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=DD};function Xx(n){return(n.flags&128)===128}var Yx=function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n}(Yx||{}),Zx=new Map,AD=0;function ID(){return AD++}function RD(n){Zx.set(n[bu],n)}function up(n){Zx.delete(n[bu])}var b_="__ngContext__";function dc(n,e){lo(e)?(n[b_]=e[bu],RD(e)):n[b_]=e}function Kx(n){return Qx(n[Xa])}function Jx(n){return Qx(n[ui])}function Qx(n){for(;n!==null&&!tr(n);)n=n[ui];return n}var dp;function eM(n){dp=n}function ND(){if(dp!==void 0)return dp;if(typeof document<"u")return document;throw new Qe(210,!1)}var lm=new ue("",{providedIn:"root",factory:()=>PD}),PD="ng",um=new ue(""),fc=new ue("",{providedIn:"platform",factory:()=>"unknown"});var dm=new ue("",{providedIn:"root",factory:()=>ND().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var LD="h",OD="b";var tM=!1,FD=new ue("",{providedIn:"root",factory:()=>tM});var nM=function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n}(nM||{}),Tu=new ue(""),E_=new Set;function Cu(n){E_.has(n)||(E_.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var iM=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=kD}return n})();function kD(){return new iM(xt(),nr())}var UD=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Ye({token:n,providedIn:"root",factory:()=>new n})}return n})();var BD=(n,e,t,i)=>{};function VD(n,e,t,i){BD(n,e,t,i)}var HD=()=>null;function rM(n,e,t=!1){return HD(n,e,t)}function oM(n,e){let t=n.contentQueries;if(t!==null){let i=Je(null);try{for(let r=0;r<t.length;r+=2){let o=t[r],s=t[r+1];if(s!==-1){let a=n.data[s];Jp(o),a.contentQueries(2,e[s],s)}}}finally{Je(i)}}}function fp(n,e,t){Jp(0);let i=Je(null);try{e(n,t)}finally{Je(i)}}function sM(n,e,t){if(cx(e)){let i=Je(null);try{let r=e.directiveStart,o=e.directiveEnd;for(let s=r;s<o;s++){let a=n.data[s];if(a.contentQueries){let c=t[s];a.contentQueries(1,c,s)}}}finally{Je(i)}}}var Ii=function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n}(Ii||{});var hp=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${OT})`}};function zD(n){return n instanceof hp?n.changingThisBreaksApplicationSecurity:n}function GD(n,e){return n.createText(e)}function jD(n,e,t){n.setValue(e,t)}function aM(n,e,t){return n.createElement(e,t)}function du(n,e,t,i,r){n.insertBefore(e,t,i,r)}function cM(n,e,t){n.appendChild(e,t)}function S_(n,e,t,i,r){i!==null?du(n,e,t,i,r):cM(n,e,t)}function WD(n,e,t){n.removeChild(null,e,t)}function $D(n,e,t){n.setAttribute(e,"style",t)}function qD(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function lM(n,e,t){let{mergedAttrs:i,classes:r,styles:o}=t;i!==null&&nD(n,e,i),r!==null&&qD(n,e,r),o!==null&&$D(n,e,o)}function fm(n){return n.ownerDocument}function XD(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let o=e.length;if(r+o===i||n.charCodeAt(r+o)<=32)return r}t=r+1}}var uM="ng-template";function YD(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&XD(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(hm(n))return!1;if(r=e.indexOf(1,r),r>-1){let o;for(;++r<e.length&&typeof(o=e[r])=="string";)if(o.toLowerCase()===t)return!0}return!1}function hm(n){return n.type===4&&n.value!==uM}function ZD(n,e,t){let i=n.type===4&&!t?uM:n.value;return e===i}function KD(n,e,t){let i=4,r=n.attrs,o=r!==null?eA(r):0,s=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!s&&!li(i)&&!li(c))return!1;if(s&&li(c))continue;s=!1,i=c|i&1;continue}if(!s)if(i&4){if(i=2|i&1,c!==""&&!ZD(n,c,t)||c===""&&e.length===1){if(li(i))return!1;s=!0}}else if(i&8){if(r===null||!YD(n,r,c,t)){if(li(i))return!1;s=!0}}else{let l=e[++a],u=JD(c,r,hm(n),t);if(u===-1){if(li(i))return!1;s=!0;continue}if(l!==""){let d;if(u>o?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(li(i))return!1;s=!0}}}}return li(i)||s}function li(n){return(n&1)===0}function JD(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let o=!1;for(;r<e.length;){let s=e[r];if(s===n)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return tA(e,n)}function QD(n,e,t=!1){for(let i=0;i<e.length;i++)if(KD(n,e[i],t))return!0;return!1}function eA(n){for(let e=0;e<n.length;e++){let t=n[e];if(iD(t))return e}return n.length}function tA(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function w_(n,e){return n?":not("+e.trim()+")":e}function nA(n){let e=n[0],t=1,i=2,r="",o=!1;for(;t<n.length;){let s=n[t];if(typeof s=="string")if(i&2){let a=n[++t];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!li(s)&&(e+=w_(o,r),r=""),i=s,o=o||!li(i);t++}return r!==""&&(e+=w_(o,r)),e}function iA(n){return n.map(nA).join(",")}function rA(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let o=n[i];if(typeof o=="string")r===2?o!==""&&e.push(o,n[++i]):r===8&&t.push(o);else{if(!li(r))break;r=o}i++}return t.length&&e.push(1,...t),e}var Ni={};function pm(n,e,t,i,r,o,s,a,c,l,u){let d=On+i,f=d+r,h=oA(d,f),g=typeof l=="function"?l():l;return h[We]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function oA(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Ni);return t}function sA(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=pm(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function mm(n,e,t,i,r,o,s,a,c,l,u){let d=e.blueprint.slice();return d[er]=r,d[He]=i|4|128|8|64|1024,(l!==null||n&&n[He]&2048)&&(d[He]|=2048),px(d),d[vn]=d[_s]=n,d[Qt]=t,d[Tr]=s||n&&n[Tr],d[_n]=a||n&&n[_n],d[hs]=c||n&&n[hs]||null,d[fi]=o,d[bu]=ID(),d[qa]=u,d[sx]=l,d[Di]=e.type==2?n[Di]:d,d}function aA(n,e,t){let i=Ri(e,n),r=sA(t),o=n[Tr].rendererFactory,s=gm(n,mm(n,r,null,dM(t),i,e,null,o.createRenderer(i,t),null,null,null));return n[e.index]=s}function dM(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function fM(n,e,t,i){if(t===0)return-1;let r=e.length;for(let o=0;o<t;o++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function gm(n,e){return n[Xa]?n[d_][ui]=e:n[Xa]=e,n[d_]=e,e}function Te(n=1){hM(Gn(),xt(),Ar()+n,!1)}function hM(n,e,t,i){if(!i)if((e[He]&3)===3){let o=n.preOrderCheckHooks;o!==null&&Wl(e,o,t)}else{let o=n.preOrderHooks;o!==null&&$l(e,o,0,t)}vo(t)}var Du=function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n}(Du||{});function pp(n,e,t,i){let r=Je(null);try{let[o,s,a]=n.inputs[t],c=null;(s&Du.SignalBased)!==0&&(c=e[o][oi]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,o):lx(e,c,o,i)}finally{Je(r)}}function pM(n,e,t,i,r){let o=Ar(),s=i&2;try{vo(-1),s&&e.length>On&&hM(n,e,On,!1),It(s?2:0,r),t(i,r)}finally{vo(o),It(s?3:1,r)}}function ym(n,e,t){pA(n,e,t),(t.flags&64)===64&&mA(n,e,t)}function mM(n,e,t=Ri){let i=e.localNames;if(i!==null){let r=e.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?t(e,n):n[s];n[r++]=a}}}function cA(n,e,t,i){let o=i.get(FD,tM)||t===Ii.ShadowDom,s=n.selectRootElement(e,o);return lA(s),s}function lA(n){uA(n)}var uA=()=>null;function dA(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function fA(n,e,t,i,r,o,s,a){if(!a&&vm(e,n,t,i,r)){oc(e)&&hA(t,e.index);return}if(e.type&3){let c=Ri(e,t);i=dA(i),r=s!=null?s(r,e.value||"",i):r,o.setProperty(c,i,r)}else e.type&12}function hA(n,e){let t=Cr(e,n);t[He]&16||(t[He]|=64)}function pA(n,e,t){let i=t.directiveStart,r=t.directiveEnd;oc(t)&&aA(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||Fx(t,e);let o=t.initialInputs;for(let s=i;s<r;s++){let a=n.data[s],c=cu(e,n,s,t);if(dc(c,e),o!==null&&_A(e,s-i,c,a,t,o),xo(a)){let l=Cr(t.index,e);l[Qt]=cu(e,n,s,t)}}}function mA(n,e,t){let i=t.directiveStart,r=t.directiveEnd,o=t.index,s=$C();try{vo(o);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];ip(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&gA(c,l)}}finally{vo(-1),ip(s)}}function gA(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function gM(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let o=t[r];QD(e,o.selectors,!1)&&(i??=[],xo(o)?i.unshift(o):i.push(o))}return i}function yA(n,e,t,i,r,o){let s=Ri(n,e);vA(e[_n],s,o,n.value,t,i,r)}function vA(n,e,t,i,r,o,s){if(o==null)n.removeAttribute(e,r,t);else{let a=s==null?Ga(o):s(o,i||"",r);n.setAttribute(e,r,a,t)}}function _A(n,e,t,i,r,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];pp(i,t,c,l)}}function xA(n,e){let t=n[hs],i=t?t.get(zn,null):null;i&&i.handleError(e)}function vm(n,e,t,i,r){let o=n.inputs?.[i],s=n.hostDirectiveInputs?.[i],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=e.data[l];pp(d,t[l],u,r),a=!0}if(o)for(let c of o){let l=t[c],u=e.data[c];pp(u,l,i,r),a=!0}return a}function MA(n,e){let t=Cr(e,n),i=t[We];bA(i,t);let r=t[er];r!==null&&t[qa]===null&&(t[qa]=rM(r,t[hs])),It(18),_m(i,t,t[Qt]),It(19,t[Qt])}function bA(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function _m(n,e,t){Qp(e);try{let i=n.viewQuery;i!==null&&fp(1,i,t);let r=n.template;r!==null&&pM(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ki]?.finishViewCreation(n),n.staticContentQueries&&oM(n,e),n.staticViewQueries&&fp(2,n.viewQuery,t);let o=n.components;o!==null&&EA(e,o)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[He]&=-5,em()}}function EA(n,e){for(let t=0;t<e.length;t++)MA(n,e[t])}function Au(n,e,t,i){let r=Je(null);try{let o=e.tView,a=n[He]&4096?4096:16,c=mm(n,o,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[po]=l;let u=n[Ki];return u!==null&&(c[Ki]=u.createEmbeddedView(o)),_m(o,c,t),c}finally{Je(r)}}function Ka(n,e){return!e||e.firstChild===null||Xx(n)}var SA;function xm(n,e){return SA(n,e)}var Ji=function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n}(Ji||{});function yM(n){return(n.flags&32)===32}function us(n,e,t,i,r){if(i!=null){let o,s=!1;tr(i)?o=i:lo(i)&&(s=!0,i=i[er]);let a=Ai(i);n===0&&t!==null?r==null?cM(e,t,a):du(e,t,a,r||null,!0):n===1&&t!==null?du(e,t,a,r||null,!0):n===2?WD(e,a,s):n===3&&e.destroyNode(a),o!=null&&FA(e,n,o,t,r)}}function wA(n,e){vM(n,e),e[er]=null,e[fi]=null}function TA(n,e,t,i,r,o){i[er]=r,i[fi]=e,Ru(n,i,t,1,r,o)}function vM(n,e){e[Tr].changeDetectionScheduler?.notify(9),Ru(n,e,e[_n],2,null,null)}function CA(n){let e=n[Xa];if(!e)return Vh(n[We],n);for(;e;){let t=null;if(lo(e))t=e[Xa];else{let i=e[yn];i&&(t=i)}if(!t){for(;e&&!e[ui]&&e!==n;)lo(e)&&Vh(e[We],e),e=e[vn];e===null&&(e=n),lo(e)&&Vh(e[We],e),t=e&&e[ui]}e=t}}function Mm(n,e){let t=n[ps],i=t.indexOf(e);t.splice(i,1)}function Iu(n,e){if(xs(e))return;let t=e[_n];t.destroyNode&&Ru(n,e,t,3,null,null),CA(e)}function Vh(n,e){if(xs(e))return;let t=Je(null);try{e[He]&=-129,e[He]|=256,e[ei]&&Ca(e[ei]),AA(n,e),DA(n,e),e[We].type===1&&e[_n].destroy();let i=e[po];if(i!==null&&tr(e[vn])){i!==e[vn]&&Mm(i,e);let r=e[Ki];r!==null&&r.detachView(n)}up(e)}finally{Je(t)}}function DA(n,e){let t=n.cleanup,i=e[tu];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[t[s+1]];t[s].call(a)}i!==null&&(e[tu]=null);let r=e[Sr];if(r!==null){e[Sr]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=e[mo];if(o!==null){e[mo]=null;for(let s of o)s.destroy()}}function AA(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Ya)){let o=t[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],c=o[s+1];It(4,a,c);try{c.call(a)}finally{It(5,a,c)}}else{It(4,r,o);try{o.call(r)}finally{It(5,r,o)}}}}}function IA(n,e,t){return RA(n,e.parent,t)}function RA(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[er];if(oc(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Ii.None||r===Ii.Emulated)return null}return Ri(i,t)}function NA(n,e,t){return LA(n,e,t)}function PA(n,e,t){return n.type&40?Ri(n,t):null}var LA=PA,T_;function bm(n,e,t,i){let r=IA(n,i,e),o=e[_n],s=i.parent||e[fi],a=NA(s,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)S_(o,r,t[c],a,!1);else S_(o,r,t,a,!1);T_!==void 0&&T_(o,i,e,t,r)}function Ha(n,e){if(e!==null){let t=e.type;if(t&3)return Ri(e,n);if(t&4)return mp(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Ha(n,i);{let r=n[e.index];return tr(r)?mp(-1,r):Ai(r)}}else{if(t&128)return Ha(n,e.next);if(t&32)return xm(e,n)()||Ai(n[e.index]);{let i=_M(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=yo(n[Di]);return Ha(r,i)}else return Ha(n,e.next)}}}return null}function _M(n,e){if(e!==null){let i=n[Di][fi],r=e.projection;return i.projection[r]}return null}function mp(n,e){let t=yn+n+1;if(t<e.length){let i=e[t],r=i[We].firstChild;if(r!==null)return Ha(i,r)}return e[go]}function Em(n,e,t,i,r,o,s){for(;t!=null;){if(t.type===128){t=t.next;continue}let a=i[t.index],c=t.type;if(s&&e===0&&(a&&dc(Ai(a),i),t.flags|=2),!yM(t))if(c&8)Em(n,e,t.child,i,r,o,!1),us(e,n,r,a,o);else if(c&32){let l=xm(t,i),u;for(;u=l();)us(e,n,r,u,o);us(e,n,r,a,o)}else c&16?OA(n,e,i,t,r,o):us(e,n,r,a,o);t=s?t.projectionNext:t.next}}function Ru(n,e,t,i,r,o){Em(t,i,n.firstChild,e,r,o,!1)}function OA(n,e,t,i,r,o){let s=t[Di],c=s[fi].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];us(e,n,r,u,o)}else{let l=c,u=s[vn];Xx(i)&&(l.flags|=128),Em(n,e,l,u,r,o,!0)}}function FA(n,e,t,i,r){let o=t[go],s=Ai(t);o!==s&&us(e,n,i,o,r);for(let a=yn;a<t.length;a++){let c=t[a];Ru(c[We],c,n,e,i,o)}}function kA(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let o=i.indexOf("-")===-1?void 0:Ji.DashCase;r==null?n.removeStyle(t,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Ji.Important),n.setStyle(t,i,r,o))}}function fu(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let o=e[t.index];o!==null&&i.push(Ai(o)),tr(o)&&UA(o,i);let s=t.type;if(s&8)fu(n,e,t.child,i);else if(s&32){let a=xm(t,e),c;for(;c=a();)i.push(c)}else if(s&16){let a=_M(e,t);if(Array.isArray(a))i.push(...a);else{let c=yo(e[Di]);fu(c[We],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function UA(n,e){for(let t=yn;t<n.length;t++){let i=n[t],r=i[We].firstChild;r!==null&&fu(i[We],i,r,e)}n[go]!==n[er]&&e.push(n[go])}function xM(n){if(n[kh]!==null){for(let e of n[kh])e.impl.addSequence(e);n[kh].length=0}}var MM=[];function BA(n){return n[ei]??VA(n)}function VA(n){let e=MM.pop()??Object.create(zA);return e.lView=n,e}function HA(n){n.lView[ei]!==n&&(n.lView=null,MM.push(n))}var zA=Se(fe({},Ko),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{sc(n.lView)},consumerOnSignalRead(){this.lView[ei]=this}});function GA(n){let e=n[ei]??Object.create(jA);return e.lView=n,e}var jA=Se(fe({},Ko),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=yo(n.lView);for(;e&&!bM(e[We]);)e=yo(e);e&&mx(e)},consumerOnSignalRead(){this.lView[ei]=this}});function bM(n){return n.type!==2}function EM(n){if(n[mo]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[mo])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[He]&8192)}}var WA=100;function SM(n,e=!0,t=0){let r=n[Tr].rendererFactory,o=!1;o||r.begin?.();try{$A(n,t)}catch(s){throw e&&xA(n,s),s}finally{o||r.end?.()}}function $A(n,e){let t=xx();try{ru(!0),gp(n,e);let i=0;for(;Eu(n);){if(i===WA)throw new Qe(103,!1);i++,gp(n,1)}}finally{ru(t)}}function qA(n,e,t,i){if(xs(e))return;let r=e[He],o=!1,s=!1;Qp(e);let a=!0,c=null,l=null;o||(bM(n)?(l=BA(e),c=Ta(l)):lh()===null?(a=!1,l=GA(e),c=Ta(l)):e[ei]&&(Ca(e[ei]),e[ei]=null));try{px(e),GC(n.bindingStartIndex),t!==null&&pM(n,e,t,2,i);let u=(r&3)===3;if(!o)if(u){let h=n.preOrderCheckHooks;h!==null&&Wl(e,h,null)}else{let h=n.preOrderHooks;h!==null&&$l(e,h,0,null),Uh(e,0)}if(s||XA(e),EM(e),wM(e,0),n.contentQueries!==null&&oM(n,e),!o)if(u){let h=n.contentCheckHooks;h!==null&&Wl(e,h)}else{let h=n.contentHooks;h!==null&&$l(e,h,1),Uh(e,1)}ZA(n,e);let d=n.components;d!==null&&CM(e,d,0);let f=n.viewQuery;if(f!==null&&fp(2,f,i),!o)if(u){let h=n.viewCheckHooks;h!==null&&Wl(e,h)}else{let h=n.viewHooks;h!==null&&$l(e,h,2),Uh(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Fh]){for(let h of e[Fh])h();e[Fh]=null}o||(xM(e),e[He]&=-73)}catch(u){throw o||sc(e),u}finally{l!==null&&(hl(l,c),a&&HA(l)),em()}}function wM(n,e){for(let t=Kx(n);t!==null;t=Jx(t))for(let i=yn;i<t.length;i++){let r=t[i];TM(r,e)}}function XA(n){for(let e=Kx(n);e!==null;e=Jx(e)){if(!(e[He]&2))continue;let t=e[ps];for(let i=0;i<t.length;i++){let r=t[i];mx(r)}}}function YA(n,e,t){It(18);let i=Cr(e,n);TM(i,t),It(19,i[Qt])}function TM(n,e){Yp(n)&&gp(n,e)}function gp(n,e){let i=n[We],r=n[He],o=n[ei],s=!!(e===0&&r&16);if(s||=!!(r&64&&e===0),s||=!!(r&1024),s||=!!(o?.dirty&&pl(o)),s||=!1,o&&(o.dirty=!1),n[He]&=-9217,s)qA(i,n,i.template,n[Qt]);else if(r&8192){EM(n),wM(n,1);let a=i.components;a!==null&&CM(n,a,1),xM(n)}}function CM(n,e,t){for(let i=0;i<e.length;i++)YA(n,e[i],t)}function ZA(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)vo(~r);else{let o=r,s=t[++i],a=t[++i];WC(s,o);let c=e[o];It(24,c),a(2,c),It(25,c)}}}finally{vo(-1)}}function Sm(n,e){let t=xx()?64:1088;for(n[Tr].changeDetectionScheduler?.notify(e);n;){n[He]|=t;let i=yo(n);if(iu(n)&&!i)return n;n=i}return null}function DM(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function AM(n,e){let t=yn+e;if(t<n.length)return n[t]}function Nu(n,e,t,i=!0){let r=e[We];if(KA(r,e,n,t),i){let s=mp(t,n),a=e[_n],c=a.parentNode(n[go]);c!==null&&TA(r,n[fi],a,e,c,s)}let o=e[qa];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function IM(n,e){let t=Ja(n,e);return t!==void 0&&Iu(t[We],t),t}function Ja(n,e){if(n.length<=yn)return;let t=yn+e,i=n[t];if(i){let r=i[po];r!==null&&r!==n&&Mm(r,i),e>0&&(n[t-1][ui]=i[ui]);let o=Ql(n,yn+e);wA(i[We],i);let s=o[Ki];s!==null&&s.detachView(o[We]),i[vn]=null,i[ui]=null,i[He]&=-129}return i}function KA(n,e,t,i){let r=yn+i,o=t.length;i>0&&(t[r-1][ui]=e),i<o-yn?(e[ui]=t[r],J_(t,yn+i,e)):(t.push(e),e[ui]=null),e[vn]=t;let s=e[po];s!==null&&t!==s&&RM(s,e);let a=e[Ki];a!==null&&a.insertView(n),tp(e),e[He]|=128}function RM(n,e){let t=n[ps],i=e[vn];if(lo(i))n[He]|=2;else{let r=i[vn][Di];e[Di]!==r&&(n[He]|=2)}t===null?n[ps]=[e]:t.push(e)}var wm=class{_lView;_cdRefInjectingView;notifyErrorHandler;_appRef=null;_attachedToViewContainer=!1;get rootNodes(){let e=this._lView,t=e[We];return fu(t,e,t.firstChild,[])}constructor(e,t,i=!0){this._lView=e,this._cdRefInjectingView=t,this.notifyErrorHandler=i}get context(){return this._lView[Qt]}set context(e){this._lView[Qt]=e}get destroyed(){return xs(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[vn];if(tr(e)){let t=e[nu],i=t?t.indexOf(this):-1;i>-1&&(Ja(e,i),Ql(t,i))}this._attachedToViewContainer=!1}Iu(this._lView[We],this._lView)}onDestroy(e){gx(this._lView,e)}markForCheck(){Sm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[He]&=-129}reattach(){tp(this._lView),this._lView[He]|=128}detectChanges(){this._lView[He]|=1024,SM(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Qe(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=iu(this._lView),t=this._lView[po];t!==null&&!e&&Mm(t,this._lView),vM(this._lView[We],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Qe(902,!1);this._appRef=e;let t=iu(this._lView),i=this._lView[po];i!==null&&!t&&RM(i,this._lView),tp(this._lView)}};var Qa=(()=>{class n{static __NG_ELEMENT_ID__=eI}return n})(),JA=Qa,QA=class extends JA{_declarationLView;_declarationTContainer;elementRef;constructor(e,t,i){super(),this._declarationLView=e,this._declarationTContainer=t,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,t){return this.createEmbeddedViewImpl(e,t)}createEmbeddedViewImpl(e,t,i){let r=Au(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:t,dehydratedView:i});return new wm(r)}};function eI(){return Tm(nr(),xt())}function Tm(n,e){return n.type&4?new QA(e,n,Es(n,e)):null}function Cm(n,e,t,i,r){let o=n.data[e];if(o===null)o=tI(n,e,t,i,r),jC()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=i,o.attrs=r;let s=BC();o.injectorIndex=s===null?-1:s.injectorIndex}return lc(o,!0),o}function tI(n,e,t,i,r){let o=vx(),s=_x(),a=s?o:o&&o.parent,c=n.data[e]=iI(n,a,t,e,i,r);return nI(n,c,o,s),c}function nI(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function iI(n,e,t,i,r,o){let s=e?e.injectorIndex:-1,a=0;return FC()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var C5=new RegExp(`^(\\d+)*(${OD}|${LD})*(.*)`);var rI=()=>null;function ec(n,e){return rI(n,e)}var oI=class{},NM=class{},yp=class{resolveComponentFactory(e){throw Error(`No component factory found for ${Qn(e)}.`)}},Dm=class{static NULL=new yp},ys=class{};var sI=(()=>{class n{static \u0275prov=Ye({token:n,providedIn:"root",factory:()=>null})}return n})();var Hh={},vp=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){i=xu(i);let r=this.injector.get(e,Hh,i);return r!==Hh||t===Hh?r:this.parentInjector.get(e,t,i)}};function C_(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)r=r_(r,a);else if(o==2){let c=a,l=e[++s];i=r_(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function Pu(n,e=tt.Default){let t=xt();if(t===null)return we(n,e);let i=nr();return Vx(i,t,Jn(n),e)}function PM(n,e,t,i,r){let o=i===null?null:{"":-1},s=r(n,t);if(s!==null){let a,c=null,l=null,u=cI(s);u===null?a=s:[a,c,l]=u,dI(n,e,t,a,o,c,l)}o!==null&&i!==null&&aI(t,i,o)}function aI(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let o=t[e[r+1]];if(o==null)throw new Qe(-301,!1);i.push(e[r],o)}}function cI(n){let e=null,t=!1;for(let s=0;s<n.length;s++){let a=n[s];if(s===0&&xo(a)&&(e=a),a.findHostDirectiveDefs!==null){t=!0;break}}if(!t)return null;let i=null,r=null,o=null;for(let s of n)s.findHostDirectiveDefs!==null&&(i??=[],r??=new Map,o??=new Map,lI(s,i,o,r)),s===e&&(i??=[],i.push(s));return i!==null?(i.push(...e===null?n:n.slice(1)),[i,r,o]):null}function lI(n,e,t,i){let r=e.length;n.findHostDirectiveDefs(n,e,i),t.set(n,[r,e.length-1])}function uI(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function dI(n,e,t,i,r,o,s){let a=i.length,c=!1;for(let f=0;f<a;f++){let h=i[f];!c&&xo(h)&&(c=!0,uI(n,t,f)),lD(Fx(t,e),n,h.type)}yI(t,n.data.length,a);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=fM(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=im(t.mergedAttrs,h.hostAttrs),hI(n,t,e,d,h),gI(d,h,r),s!==null&&s.has(h)){let[y,m]=s.get(h);t.directiveToIndex.set(h.type,[d,y+t.directiveStart,m+t.directiveStart])}else(o===null||!o.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}fI(n,t,o)}function fI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))D_(0,e,r,i),D_(1,e,r,i),I_(e,i,!1);else{let o=t.get(r);A_(0,e,o,i),A_(1,e,o,i),I_(e,i,!0)}}}function D_(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;n===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(i),LM(e,o)}}function A_(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),LM(e,s)}}function LM(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function I_(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:o}=n;if(i===null||!t&&r===null||t&&o===null||hm(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){s??=[],s.push(c,i[a+1]);break}}else if(t&&o.hasOwnProperty(c)){let l=o[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){s??=[],s.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function hI(n,e,t,i,r){n.data[i]=r;let o=r.factory||(r.factory=fo(r.type,!0)),s=new Ya(o,xo(r),Pu);n.blueprint[i]=s,t[i]=s,pI(n,e,i,fM(n,t,r.hostVars,Ni),r)}function pI(n,e,t,i,r){let o=r.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~e.index;mI(s)!=a&&s.push(a),s.push(t,i,o)}}function mI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function gI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;xo(e)&&(t[""]=n)}}function yI(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function OM(n,e,t,i,r,o,s,a){let c=e.consts,l=ms(c,s),u=Cm(e,n,2,i,l);return o&&PM(e,t,u,ms(c,a),r),u.mergedAttrs=im(u.mergedAttrs,u.attrs),u.attrs!==null&&C_(u,u.attrs,!1),u.mergedAttrs!==null&&C_(u,u.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,u),u}function FM(n,e){Rx(n,e),cx(e)&&n.queries.elementEnd(e)}var _p=class extends Dm{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Wa(e);return new hu(t,this.ngModule)}};function vI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],o={propName:t,templateName:e,isSignal:(i&Du.SignalBased)!==0};return r&&(o.transform=r),o})}function _I(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function xI(n,e,t){let i=e instanceof wr?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new vp(t,i):t}function MI(n){let e=n.get(ys,null);if(e===null)throw new Qe(407,!1);let t=n.get(sI,null),i=n.get(gs,null);return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i}}function bI(n,e){let t=(n.selectors[0][0]||"div").toLowerCase();return aM(e,t,t==="svg"?fx:t==="math"?wC:null)}var hu=class extends NM{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=vI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=_I(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=iA(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r){It(22);let o=Je(null);try{let s=this.componentDef,a=i?["ng-version","19.2.21"]:rA(this.componentDef.selectors[0]),c=pm(0,null,null,1,0,null,null,null,null,[a],null),l=xI(s,r||this.ngModule,e),u=MI(l),d=u.rendererFactory.createRenderer(null,s),f=i?cA(d,i,s.encapsulation,l):bI(s,d),h=mm(null,c,null,512|dM(s),null,null,u,d,l,null,rM(f,l,!0));h[On]=f,Qp(h);let g=null;try{let y=OM(On,c,h,"#host",()=>[this.componentDef],!0,0);f&&(lM(d,f,y),dc(f,h)),ym(c,h,y),sM(c,y,h),FM(c,y),t!==void 0&&EI(y,this.ngContentSelectors,t),g=Cr(y.index,h),h[Qt]=g[Qt],_m(c,h,null)}catch(y){throw g!==null&&up(g),up(h),y}finally{It(23),em()}return new xp(this.componentType,h)}finally{Je(o)}}},xp=class extends oI{_rootLView;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t){super(),this._rootLView=t,this._tNode=Xp(t[We],On),this.location=Es(this._tNode,t),this.instance=Cr(this._tNode.index,t)[Qt],this.hostView=this.changeDetectorRef=new wm(t,void 0,!1),this.componentType=e}setInput(e,t){let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,o=vm(i,r[We],r,e,t);this.previousInputValues.set(e,t);let s=Cr(i.index,r);Sm(s,1)}get injector(){return new uo(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function EI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let o=t[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Lu=(()=>{class n{static __NG_ELEMENT_ID__=SI}return n})();function SI(){let n=nr();return UM(n,xt())}var wI=Lu,kM=class extends wI{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Es(this._hostTNode,this._hostLView)}get injector(){return new uo(this._hostTNode,this._hostLView)}get parentInjector(){let e=rm(this._hostTNode,this._hostLView);if(Px(e)){let t=su(e,this._hostLView),i=ou(e),r=t[We].data[i+8];return new uo(r,t)}else return new uo(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=R_(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-yn}createEmbeddedView(e,t,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=ec(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},o,s);return this.insertImpl(a,r,Ka(this._hostTNode,s)),a}createComponent(e,t,i,r,o){let s=e&&!xC(e),a;if(s)a=t;else{let g=t||{};a=g.index,i=g.injector,r=g.projectableNodes,o=g.environmentInjector||g.ngModuleRef}let c=s?e:new hu(Wa(e)),l=i||this.parentInjector;if(!o&&c.ngModule==null){let y=(s?l:this.parentInjector).get(wr,null);y&&(o=y)}let u=Wa(c.componentType??{}),d=ec(this._lContainer,u?.id??null),f=d?.firstChild??null,h=c.create(l,r,f,o);return this.insertImpl(h.hostView,a,Ka(this._hostTNode,d)),h}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(AC(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[vn],l=new kM(c,c[fi],c[vn]);l.detach(l.indexOf(e))}}let o=this._adjustIndex(t),s=this._lContainer;return Nu(s,r,o,i),e.attachToViewContainerRef(),J_(zh(s),o,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=R_(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Ja(this._lContainer,t);i&&(Ql(zh(this._lContainer),t),Iu(i[We],i))}detach(e){let t=this._adjustIndex(e,-1),i=Ja(this._lContainer,t);return i&&Ql(zh(this._lContainer),t)!=null?new wm(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function R_(n){return n[nu]}function zh(n){return n[nu]||(n[nu]=[])}function UM(n,e){let t,i=e[n.index];return tr(i)?t=i:(t=DM(i,e,null,n),e[n.index]=t,gm(e,t)),CI(t,e,n,i),new kM(t,n,e)}function TI(n,e){let t=n[_n],i=t.createComment(""),r=Ri(e,n),o=t.parentNode(r);return du(t,o,i,t.nextSibling(r),!1),i}var CI=II,DI=()=>!1;function AI(n,e,t){return DI(n,e,t)}function II(n,e,t,i){if(n[go])return;let r;t.type&8?r=Ai(i):r=TI(e,t),n[go]=r}var Mp=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},bp=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let o=0;o<i;o++){let s=t.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)Am(e,t).matches!==null&&this.queries[t].setDirty()}},Ep=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=UI(e):this.predicate=e}},Sp=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,o=this.getByIndex(i).embeddedTView(e,r);o&&(o.indexInDeclarationView=i,t!==null?t.push(o):t=[o])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},wp=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(e,t,RI(t,o)),this.matchTNodeWithReadOption(e,t,ql(t,e,o,!1,!1))}else i===Qa?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,ql(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Mo||r===Lu||r===Qa&&t.type&4)this.addMatch(t.index,-2);else{let o=ql(t,e,r,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function RI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function NI(n,e){return n.type&11?Es(n,e):n.type&4?Tm(n,e):null}function PI(n,e,t,i){return t===-1?NI(e,n):t===-2?LI(n,e,i):cu(n,n[We],t,e)}function LI(n,e,t){if(t===Mo)return Es(e,n);if(t===Qa)return Tm(e,n);if(t===Lu)return UM(e,n)}function BM(n,e,t,i){let r=e[Ki].queries[i];if(r.matches===null){let o=n.data,s=t.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let u=o[l];a.push(PI(e,u,s[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Tp(n,e,t,i){let r=n.queries.getByIndex(t),o=r.matches;if(o!==null){let s=BM(n,e,r,t);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)i.push(s[a/2]);else{let l=o[a+1],u=e[-c];for(let d=yn;d<u.length;d++){let f=u[d];f[po]===f[vn]&&Tp(f[We],f,l,i)}if(u[ps]!==null){let d=u[ps];for(let f=0;f<d.length;f++){let h=d[f];Tp(h[We],h,l,i)}}}}}return i}function OI(n,e){return n[Ki].queries[e].queryList}function FI(n,e,t){let i=new lp((t&4)===4);return NC(n,e,i,i.destroy),(e[Ki]??=new bp).queries.push(new Mp(i))-1}function kI(n,e,t){let i=Gn();return i.firstCreatePass&&(BI(i,new Ep(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),FI(i,xt(),e)}function UI(n){return n.split(",").map(e=>e.trim())}function BI(n,e,t){n.queries===null&&(n.queries=new Sp),n.queries.track(new wp(e,t))}function Am(n,e){return n.queries.getByIndex(e)}function VI(n,e){let t=n[We],i=Am(t,e);return i.crossesNgTemplate?Tp(t,n,e,[]):BM(t,n,i,e)}var pu=class{};var mu=class extends pu{injector;componentFactoryResolver=new _p(this);instance=null;constructor(e){super();let t=new $a([...e.providers,{provide:pu,useValue:this},{provide:Dm,useValue:this.componentFactoryResolver}],e.parent||Wp(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function HI(n,e,t=null){return new mu({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var zI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=tx(!1,t.type),r=i.length>0?HI([i],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Ye({token:n,providedIn:"environment",factory:()=>new n(we(wr))})}return n})();function an(n){return Bp(()=>{let e=qI(n),t=Se(fe({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Yx.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(zI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Ii.Emulated,styles:n.styles||ho,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Cu("NgStandalone"),XI(t);let i=n.dependencies;return t.directiveDefs=N_(i,!1),t.pipeDefs=N_(i,!0),t.id=YI(t),t})}function GI(n){return Wa(n)||cC(n)}function jI(n){return n!==null}function WI(n,e){if(n==null)return fs;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],o,s,a,c;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,c=r[3]||null):(o=r,s=r,a=Du.None,c=null),t[o]=[i,a,c],e[o]=s}return t}function $I(n){if(n==null)return fs;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function VM(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function qI(n){let e={};return{type:n.type,providersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||fs,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||ho,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:WI(n.inputs,e),outputs:$I(n.outputs),debugInfo:null}}function XI(n){n.features?.forEach(e=>e(n))}function N_(n,e){if(!n)return null;let t=e?lC:GI;return()=>(typeof n=="function"?n():n).map(i=>t(i)).filter(jI)}function YI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of i.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function ZI(n,e,t){return n[e]=t}function Dr(n,e,t){let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function HM(n,e,t,i){let r=Dr(n,e,t);return Dr(n,e+1,i)||r}function KI(n,e,t,i,r,o,s,a,c){let l=e.consts,u=Cm(e,n,4,s||null,a||null);yx()&&PM(e,t,u,ms(l,c),gM),u.mergedAttrs=im(u.mergedAttrs,u.attrs),Rx(e,u);let d=u.tView=pm(2,u,i,r,o,e.directiveRegistry,e.pipeRegistry,null,e.schemas,l,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function Cp(n,e,t,i,r,o,s,a,c,l){let u=t+On,d=e.firstCreatePass?KI(u,e,n,i,r,o,s,a,c):e.data[u];lc(d,!1);let f=JI(e,n,d,t);tm()&&bm(e,n,f,d),dc(f,n);let h=DM(f,n,f,d);return n[u]=h,gm(n,h),AI(h,d,n),qp(d)&&ym(e,n,d),c!=null&&mM(n,d,l),d}function ir(n,e,t,i,r,o,s,a){let c=xt(),l=Gn(),u=ms(l.consts,o);return Cp(c,l,n,e,t,i,r,u,s,a),ir}var JI=QI;function QI(n,e,t,i){return nm(!0),e[_n].createComment("")}var zM=new ue("");var GM=(()=>{class n{static \u0275prov=Ye({token:n,providedIn:"root",factory:()=>new Dp})}return n})(),Dp=class{queuedEffectCount=0;queues=new Map;schedule(e){this.enqueue(e)}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),this.queuedEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||(this.queuedEffectCount++,i.add(e))}flush(){for(;this.queuedEffectCount>0;)for(let[e,t]of this.queues)e===null?this.flushQueue(t):e.run(()=>this.flushQueue(t))}flushQueue(e){for(let t of e)e.delete(t),this.queuedEffectCount--,t.run()}};function Im(n){return!!n&&typeof n.then=="function"}function jM(n){return!!n&&typeof n.subscribe=="function"}var e1=new ue("");var WM=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=ce(e1,{optional:!0})??[];injector=ce(di);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let o=rx(this.injector,r);if(Im(o))t.push(o);else if(jM(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});t.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),t1=new ue("");function n1(){ph(()=>{throw new Qe(600,!1)})}function i1(n){return n.isBoundToModule}var r1=10;var tc=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=ce(ED);afterRenderManager=ce(UD);zonelessEnabled=ce(om);rootEffectScheduler=ce(GM);dirtyFlags=0;tracingSnapshot=null;externalTestViews=new Set;afterTick=new on;get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];isStable=ce(wu).hasPendingTasks.pipe(Vt(t=>!t));constructor(){ce(Tu,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=ce(wr);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=di.NULL){It(10);let o=t instanceof NM;if(!this._injector.get(WM).done){let h="";throw new Qe(405,h)}let a;o?a=t:a=this._injector.get(Dm).resolveComponentFactory(t),this.componentTypes.push(a.componentType);let c=i1(a)?void 0:this._injector.get(pu),l=i||a.selector,u=a.create(r,[],l,c),d=u.location.nativeElement,f=u.injector.get(zM,null);return f?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),Xl(this.components,u),f?.unregisterApplication(d)}),this._loadComponent(u),It(11,u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){It(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(nM.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new Qe(101,!1);let t=Je(null);try{this._runningTick=!0,this.synchronize()}catch(i){this.internalErrorHandler(i)}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Je(t),this.afterTick.next(),It(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(ys,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<r1;)It(14),this.synchronizeOnce(),It(15)}synchronizeOnce(){if(this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush()),this.dirtyFlags&7){let t=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i,notifyErrorHandler:r}of this.allViews)o1(i,r,t,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}else this._rendererFactory?.begin?.(),this._rendererFactory?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>Eu(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Xl(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t),this._injector.get(t1,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Xl(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Qe(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Xl(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function o1(n,e,t,i){if(!t&&!Eu(n))return;SM(n,e,t&&!i?0:1)}function Et(n,e,t,i){let r=xt(),o=uc();if(Dr(r,o,e)){let s=Gn(),a=Dx();yA(a,r,n,e,t,i)}return Et}function s1(n,e,t,i){return Dr(n,uc(),t)?e+Ga(t)+i:Ni}function a1(n,e,t,i,r,o){let s=zC(),a=HM(n,s,t,r);return Mx(2),a?e+Ga(t)+i+Ga(r)+o:Ni}function Gl(n,e){return n<<17|e<<2}function _o(n){return n>>17&32767}function c1(n){return(n&2)==2}function l1(n,e){return n&131071|e<<17}function Ap(n){return n|2}function vs(n){return(n&131068)>>2}function Gh(n,e){return n&-131069|e<<2}function u1(n){return(n&1)===1}function Ip(n){return n|1}function d1(n,e,t,i,r,o){let s=o?e.classBindings:e.styleBindings,a=_o(s),c=vs(s);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||ic(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=_o(n[a+1]);n[i+1]=Gl(f,a),f!==0&&(n[f+1]=Gh(n[f+1],i)),n[a+1]=l1(n[a+1],i)}else n[i+1]=Gl(a,0),a!==0&&(n[a+1]=Gh(n[a+1],i)),a=i;else n[i+1]=Gl(c,0),a===0?a=i:n[c+1]=Gh(n[c+1],i),c=i;l&&(n[i+1]=Ap(n[i+1])),P_(n,u,i,!0),P_(n,u,i,!1),f1(e,u,n,i,o),s=Gl(a,c),o?e.classBindings=s:e.styleBindings=s}function f1(n,e,t,i,r){let o=r?n.residualClasses:n.residualStyles;o!=null&&typeof e=="string"&&ic(o,e)>=0&&(t[i+1]=Ip(t[i+1]))}function P_(n,e,t,i){let r=n[t+1],o=e===null,s=i?_o(r):vs(r),a=!1;for(;s!==0&&(a===!1||o);){let c=n[s],l=n[s+1];h1(c,e)&&(a=!0,n[s+1]=i?Ip(l):Ap(l)),s=i?_o(l):vs(l)}a&&(n[t+1]=i?Ap(r):Ip(r))}function h1(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?ic(n,e)>=0:!1}function jn(n,e,t){let i=xt(),r=uc();if(Dr(i,r,e)){let o=Gn(),s=Dx();fA(o,s,i,n,e,i[_n],t,!1)}return jn}function L_(n,e,t,i,r){vm(e,n,t,r?"class":"style",i)}function rr(n,e){return p1(n,e,null,!0),rr}function p1(n,e,t,i){let r=xt(),o=Gn(),s=Mx(2);if(o.firstUpdatePass&&g1(o,n,s,i),e!==Ni&&Dr(r,s,e)){let a=o.data[Ar()];M1(o,a,r,r[_n],n,r[s+1]=b1(e,t),i,s)}}function m1(n,e){return e>=n.expandoStartIndex}function g1(n,e,t,i){let r=n.data;if(r[t+1]===null){let o=r[Ar()],s=m1(n,t);E1(o,i)&&e===null&&!s&&(e=!1),e=y1(r,o,e,i),d1(r,o,e,t,s,i)}}function y1(n,e,t,i){let r=qC(n),o=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=jh(null,n,e,t,i),t=nc(t,e.attrs,i),o=null);else{let s=e.directiveStylingLast;if(s===-1||n[s]!==r)if(t=jh(r,n,e,t,i),o===null){let c=v1(n,e,i);c!==void 0&&Array.isArray(c)&&(c=jh(null,n,e,c[1],i),c=nc(c,e.attrs,i),_1(n,e,i,c))}else o=x1(n,e,i)}return o!==void 0&&(i?e.residualClasses=o:e.residualStyles=o),t}function v1(n,e,t){let i=t?e.classBindings:e.styleBindings;if(vs(i)!==0)return n[_o(i)]}function _1(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[_o(r)]=i}function x1(n,e,t){let i,r=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<r;o++){let s=n[o].hostAttrs;i=nc(i,s,t)}return nc(i,e.attrs,t)}function jh(n,e,t,i,r){let o=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(o=e[a],i=nc(i,o.hostAttrs,r),o!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function nc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?r=s:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),sC(n,s,t?!0:e[++o]))}return n===void 0?null:n}function M1(n,e,t,i,r,o,s,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=u1(l)?O_(c,e,t,r,vs(l),s):void 0;if(!gu(u)){gu(o)||c1(l)&&(o=O_(c,null,t,r,a,s));let d=hx(Ar(),t);kA(i,s,d,r,o)}}function O_(n,e,t,i,r,o){let s=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===Ni&&(f=d?ho:void 0);let h=d?Lh(f,i):u===i?f:void 0;if(l&&!gu(h)&&(h=Lh(c,i)),gu(h)&&(a=h,s))return a;let g=n[r+1];r=s?_o(g):vs(g)}if(e!==null){let c=o?e.residualClasses:e.residualStyles;c!=null&&(a=Lh(c,i))}return a}function gu(n){return n!==void 0}function b1(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=Qn(zD(n)))),n}function E1(n,e){return(n.flags&(e?8:16))!==0}var Rp=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(e,t){this.attach(t,this.detach(e))}};function Wh(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function S1(n,e,t){let i,r,o=0,s=n.length-1,a=void 0;if(Array.isArray(e)){let c=e.length-1;for(;o<=s&&o<=c;){let l=n.at(o),u=e[o],d=Wh(o,l,o,u,t);if(d!==0){d<0&&n.updateValue(o,u),o++;continue}let f=n.at(s),h=e[c],g=Wh(s,f,c,h,t);if(g!==0){g<0&&n.updateValue(s,h),s--,c--;continue}let y=t(o,l),m=t(s,f),p=t(o,u);if(Object.is(p,m)){let E=t(c,h);Object.is(E,y)?(n.swap(o,s),n.updateValue(s,h),c--,s--):n.move(s,o),n.updateValue(o,u),o++;continue}if(i??=new yu,r??=k_(n,o,s,t),Np(n,i,o,p))n.updateValue(o,u),o++,s++;else if(r.has(p))i.set(y,n.detach(o)),s--;else{let E=n.create(o,e[o]);n.attach(o,E),o++,s++}}for(;o<=c;)F_(n,i,t,o,e[o]),o++}else if(e!=null){let c=e[Symbol.iterator](),l=c.next();for(;!l.done&&o<=s;){let u=n.at(o),d=l.value,f=Wh(o,u,o,d,t);if(f!==0)f<0&&n.updateValue(o,d),o++,l=c.next();else{i??=new yu,r??=k_(n,o,s,t);let h=t(o,d);if(Np(n,i,o,h))n.updateValue(o,d),o++,s++,l=c.next();else if(!r.has(h))n.attach(o,n.create(o,d)),o++,s++,l=c.next();else{let g=t(o,u);i.set(g,n.detach(o)),s--}}}for(;!l.done;)F_(n,i,t,n.length,l.value),l=c.next()}for(;o<=s;)n.destroy(n.detach(s--));i?.forEach(c=>{n.destroy(c)})}function Np(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function F_(n,e,t,i,r){if(Np(n,e,i,t(i,r)))n.updateValue(i,r);else{let o=n.create(i,r);n.attach(i,o)}}function k_(n,e,t,i){let r=new Set;for(let o=e;o<=t;o++)r.add(i(o,n.at(o)));return r}var yu=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function Ir(n,e){Cu("NgControlFlow");let t=xt(),i=uc(),r=t[i]!==Ni?t[i]:-1,o=r!==-1?vu(t,On+r):void 0,s=0;if(Dr(t,i,n)){let a=Je(null);try{if(o!==void 0&&IM(o,s),n!==-1){let c=On+n,l=vu(t,c),u=Fp(t[We],c),d=ec(l,u.tView.ssrId),f=Au(t,u,e,{dehydratedView:d});Nu(l,f,s,Ka(u,d))}}finally{Je(a)}}else if(o!==void 0){let a=AM(o,s);a!==void 0&&(a[Qt]=e)}}var Pp=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-yn}};function $M(n,e){return e}var Lp=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function Rr(n,e,t,i,r,o,s,a,c,l,u,d,f){Cu("NgControlFlow");let h=xt(),g=Gn(),y=c!==void 0,m=xt(),p=a?s.bind(m[Di][Qt]):s,E=new Lp(y,p);m[On+n]=E,Cp(h,g,n+1,e,t,i,r,ms(g.consts,o)),y&&Cp(h,g,n+2,c,l,u,d,ms(g.consts,f))}var Op=class extends Rp{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-yn}at(e){return this.getLView(e)[Qt].$implicit}attach(e,t){let i=t[qa];this.needsIndexUpdate||=e!==this.length,Nu(this.lContainer,t,e,Ka(this.templateTNode,i))}detach(e){return this.needsIndexUpdate||=e!==this.length-1,w1(this.lContainer,e)}create(e,t){let i=ec(this.lContainer,this.templateTNode.tView.ssrId),r=Au(this.hostLView,this.templateTNode,new Pp(this.lContainer,t,e),{dehydratedView:i});return this.operationsCounter?.recordCreate(),r}destroy(e){Iu(e[We],e),this.operationsCounter?.recordDestroy()}updateValue(e,t){this.getLView(e)[Qt].$implicit=t}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Qt].$index=e}getLView(e){return T1(this.lContainer,e)}};function Nr(n){let e=Je(null),t=Ar();try{let i=xt(),r=i[We],o=i[t],s=t+1,a=vu(i,s);if(o.liveCollection===void 0){let l=Fp(r,s);o.liveCollection=new Op(a,i,l)}else o.liveCollection.reset();let c=o.liveCollection;if(S1(c,n,o.trackByFn),c.updateIndexes(),o.hasEmptyBlock){let l=uc(),u=c.length===0;if(Dr(i,l,u)){let d=t+2,f=vu(i,d);if(u){let h=Fp(r,d),g=ec(f,h.tView.ssrId),y=Au(i,h,void 0,{dehydratedView:g});Nu(f,y,0,Ka(h,g))}else IM(f,0)}}}finally{Je(e)}}function vu(n,e){return n[e]}function w1(n,e){return Ja(n,e)}function T1(n,e){return AM(n,e)}function Fp(n,e){return Xp(n,e)}function K(n,e,t,i){let r=xt(),o=Gn(),s=On+n,a=r[_n],c=o.firstCreatePass?OM(s,o,r,e,gM,yx(),t,i):o.data[s],l=C1(o,r,c,a,e,n);r[s]=l;let u=qp(c);return lc(c,!0),lM(a,l,c),!yM(c)&&tm()&&bm(o,r,l,c),(PC()===0||u)&&dc(l,r),LC(),u&&(ym(o,r,c),sM(o,c,r)),i!==null&&mM(r,c),K}function ee(){let n=nr();_x()?VC():(n=n.parent,lc(n,!1));let e=n;kC(e)&&UC(),OC();let t=Gn();return t.firstCreatePass&&FM(t,e),e.classesWithoutHost!=null&&eD(e)&&L_(t,e,xt(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&tD(e)&&L_(t,e,xt(),e.stylesWithoutHost,!1),ee}function Mt(n,e,t,i){return K(n,e,t,i),ee(),Mt}var C1=(n,e,t,i,r,o)=>(nm(!0),aM(i,r,KC()));function Ou(){return xt()}var ao=void 0;function D1(n){let e=Math.floor(Math.abs(n)),t=n.toString().replace(/^[^.]*\.?/,"").length;return e===1&&t===0?1:5}var A1=["en",[["a","p"],["AM","PM"],ao],[["AM","PM"],ao,ao],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],ao,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],ao,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",ao,"{1} 'at' {0}",ao],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",D1],$h={};function Rm(n){let e=I1(n),t=U_(e);if(t)return t;let i=e.split("-")[0];if(t=U_(i),t)return t;if(i==="en")return A1;throw new Qe(701,!1)}function U_(n){return n in $h||($h[n]=Ba.ng&&Ba.ng.common&&Ba.ng.common.locales&&Ba.ng.common.locales[n]),$h[n]}var Ss=function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n}(Ss||{});function I1(n){return n.toLowerCase().replace(/_/g,"-")}var _u="en-US";var R1=_u;function N1(n){typeof n=="string"&&(R1=n.toLowerCase().replace(/_/g,"-"))}function B_(n,e,t){return function i(r){if(r===Function)return t;let o=oc(n)?Cr(n.index,e):e;Sm(o,5);let s=e[Qt],a=V_(e,s,t,r),c=i.__ngNextListenerFn__;for(;c;)a=V_(e,s,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function V_(n,e,t,i){let r=Je(null);try{return It(6,e,t),t(i)!==!1}catch(o){return P1(n,o),!1}finally{It(7,e,t),Je(r)}}function P1(n,e){let t=n[hs],i=t?t.get(zn,null):null;i&&i.handleError(e)}function H_(n,e,t,i,r,o){let s=e[t],a=e[We],l=a.data[t].outputs[i],u=s[l],d=a.firstCreatePass?Kp(a):null,f=Zp(e),h=u.subscribe(o),g=f.length;f.push(o,h),d&&d.push(r,n.index,g,-(g+1))}function nt(n,e,t,i){let r=xt(),o=Gn(),s=nr();return O1(o,r,r[_n],s,n,e,i),nt}function L1(n,e,t,i){let r=n.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===t&&r[o+1]===i){let a=e[tu],c=r[o+2];return a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function O1(n,e,t,i,r,o,s){let a=qp(i),l=n.firstCreatePass?Kp(n):null,u=Zp(e),d=!0;if(i.type&3||s){let f=Ri(i,e),h=s?s(f):f,g=u.length,y=s?p=>s(Ai(p[i.index])):i.index,m=null;if(!s&&a&&(m=L1(n,e,r,i.index)),m!==null){let p=m.__ngLastListenerFn__||m;p.__ngNextListenerFn__=o,m.__ngLastListenerFn__=o,d=!1}else{o=B_(i,e,o),VD(e,h,r,o);let p=t.listen(h,r,o);u.push(o,p),l&&l.push(r,y,g,g+1)}}else o=B_(i,e,o);if(d){let f=i.outputs?.[r],h=i.hostDirectiveOutputs?.[r];if(h&&h.length)for(let g=0;g<h.length;g+=2){let y=h[g],m=h[g+1];H_(i,e,y,m,r,o)}if(f&&f.length)for(let g of f)H_(i,e,g,r,r,o)}}function Wn(n=1){return YC(n)}function qM(n,e,t){kI(n,e,t)}function XM(n){let e=xt(),t=Gn(),i=bx();Jp(i+1);let r=Am(t,i);if(n.dirty&&DC(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let o=VI(e,i);n.reset(o,TD),n.notifyOnChanges()}return!0}return!1}function YM(){return OI(xt(),bx())}function ae(n,e=""){let t=xt(),i=Gn(),r=n+On,o=i.firstCreatePass?Cm(i,r,1,e,null):i.data[r],s=F1(i,t,o,e,n);t[r]=s,tm()&&bm(i,t,s,o),lc(o,!1)}var F1=(n,e,t,i,r)=>(nm(!0),GD(e[_n],i));function Tn(n){return pi("",n,""),Tn}function pi(n,e,t){let i=xt(),r=s1(i,n,e,t);return r!==Ni&&ZM(i,Ar(),r),pi}function Nm(n,e,t,i,r){let o=xt(),s=a1(o,n,e,t,i,r);return s!==Ni&&ZM(o,Ar(),s),Nm}function ZM(n,e,t){let i=hx(e,n);jD(n[_n],i,t)}function k1(n,e){let t=n[e];return t===Ni?void 0:t}function U1(n,e,t,i,r,o,s){let a=e+t;return HM(n,a,r,o)?ZI(n,a+2,s?i.call(s,r,o):i(r,o)):k1(n,a+2)}function Fu(n,e){let t=Gn(),i,r=n+On;t.firstCreatePass?(i=B1(e,t.pipeRegistry),t.data[r]=i,i.onDestroy&&(t.destroyHooks??=[]).push(r,i.onDestroy)):i=t.data[r];let o=i.factory||(i.factory=fo(i.type,!0)),s,a=Ln(Pu);try{let c=au(!1),l=o();return au(c),CC(t,xt(),r,l),l}finally{Ln(a)}}function B1(n,e){if(e)for(let t=e.length-1;t>=0;t--){let i=e[t];if(n===i.name)return i}}function ku(n,e,t,i){let r=n+On,o=xt(),s=TC(o,r);return V1(o,r)?U1(o,HC(),e,s.transform,t,i,s):s.transform(t,i)}function V1(n,e){return n[We].data[e].pure}var H1=(()=>{class n{zone=ce(Xt);changeDetectionScheduler=ce(gs);applicationRef=ce(tc);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),z1=new ue("",{factory:()=>!1});function KM({ngZoneFactory:n,ignoreChangesOutsideZone:e,scheduleInRootZone:t}){return n??=()=>new Xt(Se(fe({},QM()),{scheduleInRootZone:t})),[{provide:Xt,useFactory:n},{provide:ja,multi:!0,useFactory:()=>{let i=ce(H1,{optional:!0});return()=>i.initialize()}},{provide:ja,multi:!0,useFactory:()=>{let i=ce(G1);return()=>{i.initialize()}}},e===!0?{provide:jx,useValue:!0}:[],{provide:Wx,useValue:t??Gx}]}function JM(n){let e=n?.ignoreChangesOutsideZone,t=n?.scheduleInRootZone,i=KM({ngZoneFactory:()=>{let r=QM(n);return r.scheduleInRootZone=t,r.shouldCoalesceEventChangeDetection&&Cu("NgZone_CoalesceEvent"),new Xt(r)},ignoreChangesOutsideZone:e,scheduleInRootZone:t});return Qi([{provide:z1,useValue:!0},{provide:om,useValue:!1},i])}function QM(n){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:n?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:n?.runCoalescing??!1}}var G1=(()=>{class n{subscription=new fn;initialized=!1;zone=ce(Xt);pendingTasks=ce(wu);initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Xt.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Xt.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var j1=(()=>{class n{appRef=ce(tc);taskService=ce(wu);ngZone=ce(Xt);zonelessEnabled=ce(om);tracing=ce(Tu,{optional:!0});disableScheduling=ce(jx,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new fn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(uu):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(ce(Wx,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof cp||!this.zoneIsDefined)}notify(t){if(!this.zonelessEnabled&&t===5)return;let i=!1;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,i=!0;break}case 12:{this.appRef.dirtyFlags|=16,i=!0;break}case 13:{this.appRef.dirtyFlags|=2,i=!0;break}case 11:{i=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(i))return;let r=this.useMicrotaskScheduler?v_:$x;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(t){return!(this.disableScheduling&&!t||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(uu+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){throw this.taskService.remove(t),i}finally{this.cleanup()}this.useMicrotaskScheduler=!0,v_(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function W1(){return typeof $localize<"u"&&$localize.locale||_u}var Uu=new ue("",{providedIn:"root",factory:()=>ce(Uu,tt.Optional|tt.SkipSelf)||W1()});var kp=new ue(""),$1=new ue("");function Ua(n){return!n.moduleRef}function q1(n){let e=Ua(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Xt);return t.run(()=>{Ua(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(zn,null),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:o=>{i.handleError(o)}})}),Ua(n)){let o=()=>e.destroy(),s=n.platformInjector.get(kp);s.add(o),e.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(kp);s.add(o),n.moduleRef.onDestroy(()=>{Xl(n.allPlatformModules,n.moduleRef),r.unsubscribe(),s.delete(o)})}return Y1(i,t,()=>{let o=e.get(WM);return o.runInitializers(),o.donePromise.then(()=>{let s=e.get(Uu,_u);if(N1(s||_u),!e.get($1,!0))return Ua(n)?e.get(tc):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Ua(n)){let c=e.get(tc);return n.rootComponent!==void 0&&c.bootstrap(n.rootComponent),c}else return X1(n.moduleRef,n.allPlatformModules),n.moduleRef})})})}function X1(n,e){let t=n.injector.get(tc);if(n._bootstrapComponents.length>0)n._bootstrapComponents.forEach(i=>t.bootstrap(i));else if(n.instance.ngDoBootstrap)n.instance.ngDoBootstrap(t);else throw new Qe(-403,!1);e.push(n)}function Y1(n,e,t){try{let i=t();return Im(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n.handleError(i)),i}}var Yl=null;function Z1(n=[],e){return di.create({name:e,providers:[{provide:Mu,useValue:"platform"},{provide:kp,useValue:new Set([()=>Yl=null])},...n]})}function K1(n=[]){if(Yl)return Yl;let e=Z1(n);return Yl=e,n1(),J1(e),e}function J1(n){let e=n.get(um,null);rx(n,()=>{e?.forEach(t=>t())})}function hc(){return!1}function eb(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;It(8);try{let o=r?.injector??K1(i),s=[KM({}),{provide:gs,useExisting:j1},...t||[]],a=new mu({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return q1({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{It(9)}}function Bu(n){return yh(n)}function ws(n,e){return hh(n,e?.equal)}var Up=class{[oi];constructor(e){this[oi]=e}destroy(){this[oi].destroy()}};function Vu(n,e){!e?.injector&&$p(Vu);let t=e?.injector??ce(di),i=e?.manualCleanup!==!0?t.get(bs):null,r,o=t.get(iM,null,{optional:!0}),s=t.get(gs);return o!==null&&!e?.forceRoot?(r=tR(o.view,s,n),i instanceof lu&&i._lView===o.view&&(i=null)):r=nR(n,t.get(GM),s),r.injector=t,i!==null&&(r.onDestroyFn=i.onDestroy(()=>r.destroy())),new Up(r)}var tb=Se(fe({},Ko),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,cleanupFns:void 0,zone:null,kind:"effect",onDestroyFn:Za,run(){if(this.dirty=!1,this.hasRun&&!pl(this))return;this.hasRun=!0;let n=i=>(this.cleanupFns??=[]).push(i),e=Ta(this),t=ru(!1);try{this.maybeCleanup(),this.fn(n)}finally{ru(t),hl(this,e)}},maybeCleanup(){if(this.cleanupFns?.length)try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[]}}}),Q1=Se(fe({},tb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){Ca(this),this.onDestroyFn(),this.maybeCleanup(),this.scheduler.remove(this)}}),eR=Se(fe({},tb),{consumerMarkedDirty(){this.view[He]|=8192,sc(this.view),this.notifier.notify(13)},destroy(){Ca(this),this.onDestroyFn(),this.maybeCleanup(),this.view[mo]?.delete(this)}});function tR(n,e,t){let i=Object.create(eR);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=t,n[mo]??=new Set,n[mo].add(i),i.consumerMarkedDirty(i),i}function nR(n,e,t){let i=Object.create(Q1);return i.fn=n,i.scheduler=e,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.schedule(i),i.notifier.notify(12),i}var Pi=new ue("");var nb=null;function mc(){return nb}function Pm(n){nb??=n}var pc=class{};var Fm=function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n}(Fm||{});var Li={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Ts(n,e){let t=Rm(n),i=t[Ss.NumberSymbols][e];if(typeof i>"u"){if(e===Li.CurrencyDecimal)return t[Ss.NumberSymbols][Li.Decimal];if(e===Li.CurrencyGroup)return t[Ss.NumberSymbols][Li.Group]}return i}function rb(n,e){return Rm(n)[Ss.NumberFormats][e]}var iR=/^(\d+)?\.((\d+)(-(\d+))?)?$/,ib=22,Hu=".",gc="0",rR=";",oR=",",Lm="#";function sR(n,e,t,i,r,o,s=!1){let a="",c=!1;if(!isFinite(n))a=Ts(t,Li.Infinity);else{let l=lR(n);s&&(l=cR(l));let u=e.minInt,d=e.minFrac,f=e.maxFrac;if(o){let E=o.match(iR);if(E===null)throw new Error(`${o} is not a valid digit info`);let S=E[1],v=E[3],D=E[5];S!=null&&(u=Om(S)),v!=null&&(d=Om(v)),D!=null?f=Om(D):v!=null&&d>f&&(f=d)}uR(l,d,f);let h=l.digits,g=l.integerLen,y=l.exponent,m=[];for(c=h.every(E=>!E);g<u;g++)h.unshift(0);for(;g<0;g++)h.unshift(0);g>0?m=h.splice(g,h.length):(m=h,h=[0]);let p=[];for(h.length>=e.lgSize&&p.unshift(h.splice(-e.lgSize,h.length).join(""));h.length>e.gSize;)p.unshift(h.splice(-e.gSize,h.length).join(""));h.length&&p.unshift(h.join("")),a=p.join(Ts(t,i)),m.length&&(a+=Ts(t,r)+m.join("")),y&&(a+=Ts(t,Li.Exponential)+"+"+y)}return n<0&&!c?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function ob(n,e,t){let i=rb(e,Fm.Decimal),r=aR(i,Ts(e,Li.MinusSign));return sR(n,r,e,Li.Group,Li.Decimal,t)}function aR(n,e="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=n.split(rR),r=i[0],o=i[1],s=r.indexOf(Hu)!==-1?r.split(Hu):[r.substring(0,r.lastIndexOf(gc)+1),r.substring(r.lastIndexOf(gc)+1)],a=s[0],c=s[1]||"";t.posPre=a.substring(0,a.indexOf(Lm));for(let u=0;u<c.length;u++){let d=c.charAt(u);d===gc?t.minFrac=t.maxFrac=u+1:d===Lm?t.maxFrac=u+1:t.posSuf+=d}let l=a.split(oR);if(t.gSize=l[1]?l[1].length:0,t.lgSize=l[2]||l[1]?(l[2]||l[1]).length:0,o){let u=r.length-t.posPre.length-t.posSuf.length,d=o.indexOf(Lm);t.negPre=o.substring(0,d).replace(/'/g,""),t.negSuf=o.slice(d+u).replace(/'/g,"")}else t.negPre=e+t.posPre,t.negSuf=t.posSuf;return t}function cR(n){if(n.digits[0]===0)return n;let e=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(e===0?n.digits.push(0,0):e===1&&n.digits.push(0),n.integerLen+=2),n}function lR(n){let e=Math.abs(n)+"",t=0,i,r,o,s,a;for((r=e.indexOf(Hu))>-1&&(e=e.replace(Hu,"")),(o=e.search(/e/i))>0?(r<0&&(r=o),r+=+e.slice(o+1),e=e.substring(0,o)):r<0&&(r=e.length),o=0;e.charAt(o)===gc;o++);if(o===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===gc;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(e.charAt(o))}return r>ib&&(i=i.splice(0,ib-1),t=r-1,r=1),{digits:i,exponent:t,integerLen:r}}function uR(n,e,t){if(e>t)throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${t}).`);let i=n.digits,r=i.length-n.integerLen,o=Math.min(Math.max(e,r),t),s=o+n.integerLen,a=i[s];if(s>0){i.splice(Math.max(n.integerLen,s));for(let d=s;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),n.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let d=1;d<s;d++)i[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)i.unshift(0),n.integerLen++;i.unshift(1),n.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let c=o!==0,l=e+n.integerLen,u=i.reduceRight(function(d,f,h,g){return f=f+d,g[h]=f<10?f:f-10,c&&(g[h]===0&&h>=l?g.pop():c=!1),f>=10?1:0},0);u&&(i.unshift(u),n.integerLen++)}function Om(n){let e=parseInt(n);if(isNaN(e))throw new Error("Invalid integer literal when parsing "+n);return e}function dR(n,e){return new Qe(2100,!1)}var km=(()=>{class n{_locale;constructor(t){this._locale=t}transform(t,i,r){if(!fR(t))return null;r||=this._locale;try{let o=hR(t);return ob(o,r,i)}catch(o){throw dR(n,o.message)}}static \u0275fac=function(i){return new(i||n)(Pu(Uu,16))};static \u0275pipe=VM({name:"number",type:n,pure:!0})}return n})();function fR(n){return!(n==null||n===""||n!==n)}function hR(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new Error(`${n} is not a number`);return n}function Um(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,o]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(o)}return null}var Bm="browser",sb="server";function ju(n){return n===sb}var yc=class{};var qu=new ue(""),Gm=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(r=>{r.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,i,r,o){return this._findPluginFor(i).addEventListener(t,i,r,o)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(o=>o.supports(t)),!i)throw new Qe(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(we(qu),we(Xt))};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})(),vc=class{_doc;constructor(e){this._doc=e}manager},Wu="ng-app-id";function ab(n){for(let e of n)e.remove()}function cb(n,e){let t=e.createElement("style");return t.textContent=n,t}function gR(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Wu}="${e}"],link[${Wu}="${e}"]`);if(r)for(let o of r)o.removeAttribute(Wu),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]})}function Hm(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var jm=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(t,i,r,o={}){this.doc=t,this.appId=i,this.nonce=r,this.isServer=ju(o),gR(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,cb);i?.forEach(r=>this.addUsage(r,this.external,Hm))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let o=i.get(t);o?o.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(ab(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])ab(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,cb(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Hm(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),this.isServer&&i.setAttribute(Wu,this.appId),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(we(Pi),we(lm),we(dm,8),we(fc))};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})(),Vm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Wm=/%COMP%/g;var ub="%COMP%",yR=`_nghost-${ub}`,vR=`_ngcontent-${ub}`,_R=!0,xR=new ue("",{providedIn:"root",factory:()=>_R});function MR(n){return vR.replace(Wm,n)}function bR(n){return yR.replace(Wm,n)}function db(n,e){return e.map(t=>t.replace(Wm,n))}var $m=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(t,i,r,o,s,a,c,l=null,u=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.platformId=a,this.ngZone=c,this.nonce=l,this.tracingService=u,this.platformIsServer=ju(a),this.defaultRenderer=new _c(t,s,c,this.platformIsServer,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===Ii.ShadowDom&&(i=Se(fe({},i),{encapsulation:Ii.Emulated}));let r=this.getOrCreateRenderer(t,i);return r instanceof $u?r.applyToHost(t):r instanceof xc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,f=this.tracingService;switch(i.encapsulation){case Ii.Emulated:o=new $u(c,l,i,this.appId,u,s,a,d,f);break;case Ii.ShadowDom:return new zm(c,l,t,i,s,a,this.nonce,d,f);default:o=new xc(c,l,i,u,s,a,d,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(we(Gm),we(jm),we(lm),we(xR),we(Pi),we(fc),we(Xt),we(dm),we(Tu,8))};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})(),_c=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r,o){this.eventManager=e,this.doc=t,this.ngZone=i,this.platformIsServer=r,this.tracingService=o}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Vm[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(lb(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(lb(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Qe(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let o=Vm[r];o?e.setAttributeNS(o,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Vm[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Ji.DashCase|Ji.Important)?e.style.setProperty(t,i,r&Ji.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Ji.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=mc().getGlobalEventTarget(this.doc,e),!e))throw new Qe(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,t,o)),this.eventManager.addEventListener(e,t,o,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(t)):e(t))===!1&&t.preventDefault()}}};function lb(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var zm=class extends _c{sharedStylesHost;hostEl;shadowRoot;constructor(e,t,i,r,o,s,a,c,l){super(e,o,s,c,l),this.sharedStylesHost=t,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=db(r.id,u);for(let f of u){let h=document.createElement("style");a&&h.setAttribute("nonce",a),h.textContent=f,this.shadowRoot.appendChild(h)}let d=r.getExternalStyles?.();if(d)for(let f of d){let h=Hm(f,o);a&&h.setAttribute("nonce",a),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},xc=class extends _c{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,o,s,a,c,l){super(e,o,s,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=l?db(l,u):u,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},$u=class extends xc{contentAttr;hostAttr;constructor(e,t,i,r,o,s,a,c,l){let u=r+"-"+i.id;super(e,t,i,o,s,a,c,l,u),this.contentAttr=MR(u),this.hostAttr=bR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Xu=class n extends pc{supportsDOMEvents=!0;static makeCurrent(){Pm(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=ER();return t==null?null:SR(t)}resetBaseElement(){Mc=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return Um(document.cookie,e)}},Mc=null;function ER(){return Mc=Mc||document.head.querySelector("base"),Mc?Mc.getAttribute("href"):null}function SR(n){return new URL(n,document.baseURI).pathname}var wR=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})(),hb=(()=>{class n extends vc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,o){return t.addEventListener(i,r,o),()=>this.removeEventListener(t,i,r,o)}removeEventListener(t,i,r,o){return t.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||n)(we(Pi))};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})(),fb=["alt","control","meta","shift"],TR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},CR={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},pb=(()=>{class n extends vc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,o){let s=n.parseEventName(i),a=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>mc().onAndCancel(t,s.domEventName,a,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=n._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),fb.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),s+=l+".")}),s+=o,i.length!=0||o.length===0)return null;let c={};return c.domEventName=r,c.fullKey=s,c}static matchEventFullKeyCode(t,i){let r=TR[t.key]||t.key,o="";return i.indexOf("code.")>-1&&(r=t.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),fb.forEach(s=>{if(s!==r){let a=CR[s];a(t)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(t,i,r){return o=>{n.matchEventFullKeyCode(o,t)&&r.runGuarded(()=>i(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(we(Pi))};static \u0275prov=Ye({token:n,factory:n.\u0275fac})}return n})();function qm(n,e,t){return eb(fe({rootComponent:n,platformRef:t?.platformRef},DR(e)))}function DR(n){return{appProviders:[...PR,...n?.providers??[]],platformProviders:NR}}function AR(){Xu.makeCurrent()}function IR(){return new zn}function RR(){return eM(document),document}var NR=[{provide:fc,useValue:Bm},{provide:um,useValue:AR,multi:!0},{provide:Pi,useFactory:RR}];var PR=[{provide:Mu,useValue:"root"},{provide:zn,useFactory:IR},{provide:qu,useClass:hb,multi:!0,deps:[Pi]},{provide:qu,useClass:pb,multi:!0,deps:[Pi]},$m,jm,Gm,{provide:ys,useExisting:$m},{provide:yc,useClass:wR},[]];function Oi(n,e){let t=!e?.manualCleanup;t&&!e?.injector&&$p(Oi);let i=t?e?.injector?.get(bs)??ce(bs):null,r=LR(e?.equal),o;e?.requireSync?o=hi({kind:0},{equal:r}):o=hi({kind:1,value:e?.initialValue},{equal:r});let s,a=n.subscribe({next:c=>o.set({kind:1,value:c}),error:c=>{if(e?.rejectErrors)throw c;o.set({kind:2,error:c})},complete:()=>{s?.()}});if(e?.requireSync&&o().kind===0)throw new Qe(601,!1);return s=i?.onDestroy(a.unsubscribe.bind(a)),ws(()=>{let c=o();switch(c.kind){case 1:return c.value;case 2:throw c.error;case 0:throw new Qe(601,!1)}},{equal:e?.equal})}function LR(n=Object.is){return(e,t)=>e.kind===1&&t.kind===1&&n(e.value,t.value)}var Km={};function tg(n,e){if(Km[n]=(Km[n]||0)+1,typeof e=="function")return Xm(n,(...i)=>Se(fe({},e(...i)),{type:n}));switch(e?e._as:"empty"){case"empty":return Xm(n,()=>({type:n}));case"props":return Xm(n,i=>Se(fe({},i),{type:n}));default:throw new Error("Unexpected config.")}}function hn(){return{_as:"props",_p:void 0}}function Xm(n,e){return Object.defineProperty(e,"type",{value:n,writable:!1})}function OR(n){return n.charAt(0).toUpperCase()+n.substring(1)}function FR(n){return n.charAt(0).toLowerCase()+n.substring(1)}function kR(n,e){if(n==null)throw new Error(`${e} must be defined.`)}function Ib(n){let{source:e,events:t}=n;return Object.keys(t).reduce((i,r)=>Se(fe({},i),{[UR(r)]:tg(BR(e,r),t[r])}),{})}function Yt(){return hn()}function UR(n){return n.trim().split(" ").map((e,t)=>t===0?FR(e):OR(e)).join("")}function BR(n,e){return`[${n}] ${e}`}var Sc="@ngrx/store/init",Fi=(()=>{class n extends Xi{constructor(){super({type:Sc})}next(t){if(typeof t=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof t>"u")throw new TypeError("Actions must be objects");if(typeof t.type>"u")throw new TypeError("Actions must have a type property");super.next(t)}complete(){}ngOnDestroy(){super.complete()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),VR=[Fi],Rb=new ue("@ngrx/store Internal Root Guard"),mb=new ue("@ngrx/store Internal Initial State"),wc=new ue("@ngrx/store Initial State"),Nb=new ue("@ngrx/store Reducer Factory"),gb=new ue("@ngrx/store Internal Reducer Factory Provider"),Pb=new ue("@ngrx/store Initial Reducers"),Ym=new ue("@ngrx/store Internal Initial Reducers"),yb=new ue("@ngrx/store Store Features"),vb=new ue("@ngrx/store Internal Store Reducers"),Zm=new ue("@ngrx/store Internal Feature Reducers"),_b=new ue("@ngrx/store Internal Feature Configs"),Lb=new ue("@ngrx/store Internal Store Features"),xb=new ue("@ngrx/store Internal Feature Reducers Token"),Ob=new ue("@ngrx/store Feature Reducers"),Mb=new ue("@ngrx/store User Provided Meta Reducers"),Yu=new ue("@ngrx/store Meta Reducers"),bb=new ue("@ngrx/store Internal Resolved Meta Reducers"),Eb=new ue("@ngrx/store User Runtime Checks Config"),Sb=new ue("@ngrx/store Internal User Runtime Checks Config"),bc=new ue("@ngrx/store Internal Runtime Checks"),ng=new ue("@ngrx/store Check if Action types are unique"),Ec=new ue("@ngrx/store Root Store Provider"),Zu=new ue("@ngrx/store Feature State Provider");function ig(n,e={}){let t=Object.keys(n),i={};for(let o=0;o<t.length;o++){let s=t[o];typeof n[s]=="function"&&(i[s]=n[s])}let r=Object.keys(i);return function(s,a){s=s===void 0?e:s;let c=!1,l={};for(let u=0;u<r.length;u++){let d=r[u],f=i[d],h=s[d],g=f(h,a);l[d]=g,c=c||g!==h}return c?l:s}}function HR(n,e){return Object.keys(n).filter(t=>t!==e).reduce((t,i)=>Object.assign(t,{[i]:n[i]}),{})}function Fb(...n){return function(e){if(n.length===0)return e;let t=n[n.length-1];return n.slice(0,-1).reduceRight((r,o)=>o(r),t(e))}}function kb(n,e){return Array.isArray(e)&&e.length>0&&(n=Fb.apply(null,[...e,n])),(t,i)=>{let r=n(t);return(o,s)=>(o=o===void 0?i:o,r(o,s))}}function zR(n){let e=Array.isArray(n)&&n.length>0?Fb(...n):t=>t;return(t,i)=>(t=e(t),(r,o)=>(r=r===void 0?i:r,t(r,o)))}var bo=class extends ht{},Cs=class extends Fi{},Ju="@ngrx/store/update-reducers",Ku=(()=>{class n extends Xi{get currentReducers(){return this.reducers}constructor(t,i,r,o){super(o(r,i)),this.dispatcher=t,this.initialState=i,this.reducers=r,this.reducerFactory=o}addFeature(t){this.addFeatures([t])}addFeatures(t){let i=t.reduce((r,{reducers:o,reducerFactory:s,metaReducers:a,initialState:c,key:l})=>{let u=typeof o=="function"?zR(a)(o,c):kb(s,a)(o,c);return r[l]=u,r},{});this.addReducers(i)}removeFeature(t){this.removeFeatures([t])}removeFeatures(t){this.removeReducers(t.map(i=>i.key))}addReducer(t,i){this.addReducers({[t]:i})}addReducers(t){this.reducers=fe(fe({},this.reducers),t),this.updateReducers(Object.keys(t))}removeReducer(t){this.removeReducers([t])}removeReducers(t){t.forEach(i=>{this.reducers=HR(this.reducers,i)}),this.updateReducers(t)}updateReducers(t){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:Ju,features:t})}ngOnDestroy(){this.complete()}static{this.\u0275fac=function(i){return new(i||n)(we(Cs),we(wc),we(Pb),we(Nb))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),GR=[Ku,{provide:bo,useExisting:Ku},{provide:Cs,useExisting:Fi}],Eo=(()=>{class n extends on{ngOnDestroy(){this.complete()}static{this.\u0275fac=(()=>{let t;return function(r){return(t||(t=Su(n)))(r||n)}})()}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),jR=[Eo],Ds=class extends ht{},wb=(()=>{class n extends Xi{static{this.INIT=Sc}constructor(t,i,r,o){super(o);let a=t.pipe(Yi(La)).pipe(ci(i)),c={state:o},l=a.pipe(Fa(WR,c));this.stateSubscription=l.subscribe(({state:u,action:d})=>{this.next(u),r.next(d)}),this.state=Oi(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}static{this.\u0275fac=function(i){return new(i||n)(we(Fi),we(bo),we(Eo),we(wc))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})();function WR(n={state:void 0},[e,t]){let{state:i}=n;return{state:t(i,e),action:e}}var $R=[wb,{provide:Ds,useExisting:wb}],Wt=(()=>{class n extends ht{constructor(t,i,r,o){super(),this.actionsObserver=i,this.reducerManager=r,this.injector=o,this.source=t,this.state=t.state}select(t,...i){return XR.call(null,t,...i)(this)}selectSignal(t,i){return ws(()=>t(this.state()),i)}lift(t){let i=new n(this,this.actionsObserver,this.reducerManager);return i.operator=t,i}dispatch(t,i){if(typeof t=="function")return this.processDispatchFn(t,i);this.actionsObserver.next(t)}next(t){this.actionsObserver.next(t)}error(t){this.actionsObserver.error(t)}complete(){this.actionsObserver.complete()}addReducer(t,i){this.reducerManager.addReducer(t,i)}removeReducer(t){this.reducerManager.removeReducer(t)}processDispatchFn(t,i){kR(this.injector,"Store Injector");let r=i?.injector??YR()??this.injector;return Vu(()=>{let o=t();Bu(()=>this.dispatch(o))},{injector:r})}static{this.\u0275fac=function(i){return new(i||n)(we(Ds),we(Fi),we(Ku),we(di))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),qR=[Wt];function XR(n,e,...t){return function(r){let o;if(typeof n=="string"){let s=[e,...t].filter(Boolean);o=r.pipe(Rh(n,...s))}else if(typeof n=="function")o=r.pipe(Vt(s=>n(s,e)));else throw new TypeError(`Unexpected type '${typeof n}' in select operator, expected 'string' or 'function'`);return o.pipe(Ah())}}function YR(){try{return ce(di)}catch{return}}var rg="https://ngrx.io/guide/store/configuration/runtime-checks";function Tb(n){return n===void 0}function Cb(n){return n===null}function Ub(n){return Array.isArray(n)}function ZR(n){return typeof n=="string"}function KR(n){return typeof n=="boolean"}function JR(n){return typeof n=="number"}function Bb(n){return typeof n=="object"&&n!==null}function QR(n){return Bb(n)&&!Ub(n)}function eN(n){if(!QR(n))return!1;let e=Object.getPrototypeOf(n);return e===Object.prototype||e===null}function Jm(n){return typeof n=="function"}function tN(n){return Jm(n)&&n.hasOwnProperty("\u0275cmp")}function nN(n,e){return Object.prototype.hasOwnProperty.call(n,e)}var iN=!1;function rN(){return iN}function Db(n,e){return n===e}function oN(n,e,t){for(let i=0;i<n.length;i++)if(!t(n[i],e[i]))return!0;return!1}function Vb(n,e=Db,t=Db){let i=null,r=null,o;function s(){i=null,r=null}function a(u=void 0){o={result:u}}function c(){o=void 0}function l(){if(o!==void 0)return o.result;if(!i)return r=n.apply(null,arguments),i=arguments,r;if(!oN(arguments,i,e))return r;let u=n.apply(null,arguments);return i=arguments,t(r,u)?r:(r=u,u)}return{memoized:l,reset:s,setResult:a,clearResult:c}}function Tt(...n){return aN(Vb)(...n)}function sN(n,e,t,i){if(t===void 0){let o=e.map(s=>s(n));return i.memoized.apply(null,o)}let r=e.map(o=>o(n,t));return i.memoized.apply(null,[...r,t])}function aN(n,e={stateFn:sN}){return function(...t){let i=t;if(Array.isArray(i[0])){let[u,...d]=i;i=[...u,...d]}else i.length===1&&cN(i[0])&&(i=lN(i[0]));let r=i.slice(0,i.length-1),o=i[i.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),a=n(function(...u){return o.apply(null,u)}),c=Vb(function(u,d){return e.stateFn.apply(null,[u,r,d,a])});function l(){c.reset(),a.reset(),s.forEach(u=>u.release())}return Object.assign(c.memoized,{release:l,projector:a.memoized,setResult:c.setResult,clearResult:c.clearResult})}}function Hb(n){return Tt(e=>{let t=e[n];return!rN()&&hc()&&!(n in e)&&console.warn(`@ngrx/store: The feature name "${n}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${n}', ...) or StoreModule.forFeature('${n}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),t},e=>e)}function cN(n){return!!n&&typeof n=="object"&&Object.values(n).every(e=>typeof e=="function")}function lN(n){let e=Object.values(n),t=Object.keys(n),i=(...r)=>t.reduce((o,s,a)=>Se(fe({},o),{[s]:r[a]}),{});return[...e,i]}function uN(n){return n instanceof ue?ce(n):n}function dN(n,e){return e.map((t,i)=>{if(n[i]instanceof ue){let r=ce(n[i]);return{key:t.key,reducerFactory:r.reducerFactory?r.reducerFactory:ig,metaReducers:r.metaReducers?r.metaReducers:[],initialState:r.initialState}}return t})}function fN(n){return n.map(e=>e instanceof ue?ce(e):e)}function zb(n){return typeof n=="function"?n():n}function hN(n,e){return n.concat(e)}function pN(){if(ce(Wt,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function mN(n,e){return function(t,i){let r=e.action(i)?Qm(i):i,o=n(t,r);return e.state()?Qm(o):o}}function Qm(n){Object.freeze(n);let e=Jm(n);return Object.getOwnPropertyNames(n).forEach(t=>{if(!t.startsWith("\u0275")&&nN(n,t)&&(!e||t!=="caller"&&t!=="callee"&&t!=="arguments")){let i=n[t];(Bb(i)||Jm(i))&&!Object.isFrozen(i)&&Qm(i)}}),n}function gN(n,e){return function(t,i){if(e.action(i)){let o=eg(i);Ab(o,"action")}let r=n(t,i);if(e.state()){let o=eg(r);Ab(o,"state")}return r}}function eg(n,e=[]){return(Tb(n)||Cb(n))&&e.length===0?{path:["root"],value:n}:Object.keys(n).reduce((i,r)=>{if(i)return i;let o=n[r];return tN(o)?i:Tb(o)||Cb(o)||JR(o)||KR(o)||ZR(o)||Ub(o)?!1:eN(o)?eg(o,[...e,r]):{path:[...e,r],value:o}},!1)}function Ab(n,e){if(n===!1)return;let t=n.path.join("."),i=new Error(`Detected unserializable ${e} at "${t}". ${rg}#strict${e}serializability`);throw i.value=n.value,i.unserializablePath=t,i}function yN(n,e){return function(t,i){if(e.action(i)&&!Xt.isInAngularZone())throw new Error(`Action '${i.type}' running outside NgZone. ${rg}#strictactionwithinngzone`);return n(t,i)}}function vN(n){return hc()?fe({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},n):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function _N({strictActionSerializability:n,strictStateSerializability:e}){return t=>n||e?gN(t,{action:i=>n&&!og(i),state:()=>e}):t}function xN({strictActionImmutability:n,strictStateImmutability:e}){return t=>n||e?mN(t,{action:i=>n&&!og(i),state:()=>e}):t}function og(n){return n.type.startsWith("@ngrx")}function MN({strictActionWithinNgZone:n}){return e=>n?yN(e,{action:t=>n&&!og(t)}):e}function bN(n){return[{provide:Sb,useValue:n},{provide:Eb,useFactory:EN,deps:[Sb]},{provide:bc,deps:[Eb],useFactory:vN},{provide:Yu,multi:!0,deps:[bc],useFactory:xN},{provide:Yu,multi:!0,deps:[bc],useFactory:_N},{provide:Yu,multi:!0,deps:[bc],useFactory:MN}]}function Gb(){return[{provide:ng,multi:!0,deps:[bc],useFactory:SN}]}function EN(n){return n}function SN(n){if(!n.strictActionTypeUniqueness)return;let e=Object.entries(Km).filter(([,t])=>t>1).map(([t])=>t);if(e.length)throw new Error(`Action types are registered more than once, ${e.map(t=>`"${t}"`).join(", ")}. ${rg}#strictactiontypeuniqueness`)}function jb(n,e,t={}){return Qi([...IN(n,e,t),AN])}function wN(n={},e={}){return[{provide:Rb,useFactory:pN},{provide:mb,useValue:e.initialState},{provide:wc,useFactory:zb,deps:[mb]},{provide:Ym,useValue:n},{provide:vb,useExisting:n instanceof ue?n:Ym},{provide:Pb,deps:[Ym,[new zp(vb)]],useFactory:uN},{provide:Mb,useValue:e.metaReducers?e.metaReducers:[]},{provide:bb,deps:[Yu,Mb],useFactory:hN},{provide:gb,useValue:e.reducerFactory?e.reducerFactory:ig},{provide:Nb,deps:[gb,bb],useFactory:kb},VR,GR,jR,$R,qR,bN(e.runtimeChecks),Gb()]}function TN(){ce(Fi),ce(bo),ce(Eo),ce(Wt),ce(Rb,{optional:!0}),ce(ng,{optional:!0})}var CN=[{provide:Ec,useFactory:TN},rc(()=>ce(Ec))];function Wb(n,e){return Qi([...wN(n,e),CN])}function DN(){ce(Ec);let n=ce(Lb),e=ce(Ob),t=ce(Ku);ce(ng,{optional:!0});let i=n.map((r,o)=>{let a=e.shift()[o];return Se(fe({},r),{reducers:a,initialState:zb(r.initialState)})});t.addFeatures(i)}var AN=[{provide:Zu,useFactory:DN},rc(()=>ce(Zu))];function IN(n,e,t={}){return[{provide:_b,multi:!0,useValue:n instanceof Object?{}:t},{provide:yb,multi:!0,useValue:{key:n instanceof Object?n.name:n,reducerFactory:!(t instanceof ue)&&t.reducerFactory?t.reducerFactory:ig,metaReducers:!(t instanceof ue)&&t.metaReducers?t.metaReducers:[],initialState:!(t instanceof ue)&&t.initialState?t.initialState:void 0}},{provide:Lb,deps:[_b,yb],useFactory:dN},{provide:Zm,multi:!0,useValue:n instanceof Object?n.reducer:e},{provide:xb,multi:!0,useExisting:e instanceof ue?e:Zm},{provide:Ob,multi:!0,deps:[Zm,[new zp(xb)]],useFactory:fN},Gb()]}function xn(...n){let e=n.pop(),t=n.map(i=>i.type);return{reducer:e,types:t}}function $b(n,...e){let t=new Map;for(let i of e)for(let r of i.types){let o=t.get(r);if(o){let s=(a,c)=>i.reducer(o(a,c),c);t.set(r,s)}else t.set(r,i.reducer)}return function(i=n,r){let o=t.get(r.type);return o?o(i,r):i}}var RN={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},Qu="__@ngrx/effects_create__";function zt(n,e={}){let t=e.functional?n:n(),i=fe(fe({},RN),e);return Object.defineProperty(t,Qu,{value:i}),t}function NN(n){return Object.getOwnPropertyNames(n).filter(i=>n[i]&&n[i].hasOwnProperty(Qu)?n[i][Qu].hasOwnProperty("dispatch"):!1).map(i=>{let r=n[i][Qu];return fe({propertyName:i},r)})}function PN(n){return NN(n)}function Xb(n){return Object.getPrototypeOf(n)}function LN(n){return!!n.constructor&&n.constructor.name!=="Object"&&n.constructor.name!=="Function"}function Yb(n){return typeof n=="function"}function ON(n){return n.filter(Yb)}function FN(n,e,t){let i=Xb(n),o=!!i&&i.constructor.name!=="Object"?i.constructor.name:null,s=PN(n).map(({propertyName:a,dispatch:c,useEffectsErrorHandler:l})=>{let u=typeof n[a]=="function"?n[a]():n[a],d=l?t(u,e):u;return c===!1?d.pipe(Ch()):d.pipe(Ih()).pipe(Vt(h=>({effect:n[a],notification:h,propertyName:a,sourceName:o,sourceInstance:n})))});return ro(...s)}var kN=10;function Zb(n,e,t=kN){return n.pipe(os(i=>(e&&e.handleError(i),t<=1?n:Zb(n,e,t-1))))}var Kb=(()=>{class n extends ht{constructor(t){super(),t&&(this.source=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}static{this.\u0275fac=function(i){return new(i||n)(we(Eo))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function $t(...n){return sn(e=>n.some(t=>typeof t=="string"?t===e.type:t.type===e.type))}var T8=new ue("@ngrx/effects Internal Root Guard"),C8=new ue("@ngrx/effects User Provided Effects"),D8=new ue("@ngrx/effects Internal Root Effects"),A8=new ue("@ngrx/effects Internal Root Effects Instances"),I8=new ue("@ngrx/effects Internal Feature Effects"),R8=new ue("@ngrx/effects Internal Feature Effects Instance Groups"),UN=new ue("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>Zb}),BN="@ngrx/effects/init",VN=tg(BN);function HN(n,e){if(n.notification.kind==="N"){let t=n.notification.value;!zN(t)&&e.handleError(new Error(`Effect ${GN(n)} dispatched an invalid action: ${jN(t)}`))}}function zN(n){return typeof n!="function"&&n&&n.type&&typeof n.type=="string"}function GN({propertyName:n,sourceInstance:e,sourceName:t}){let i=typeof e[n]=="function";return!!t?`"${t}.${String(n)}${i?"()":""}"`:`"${String(n)}()"`}function jN(n){try{return JSON.stringify(n)}catch{return n}}var WN="ngrxOnIdentifyEffects";function $N(n){return sg(n,WN)}var qN="ngrxOnRunEffects";function XN(n){return sg(n,qN)}var YN="ngrxOnInitEffects";function ZN(n){return sg(n,YN)}function sg(n,e){return n&&e in n&&typeof n[e]=="function"}var Jb=(()=>{class n extends on{constructor(t,i){super(),this.errorHandler=t,this.effectsErrorHandler=i}addEffects(t){this.next(t)}toActions(){return this.pipe(Hl(t=>LN(t)?Xb(t):t),Ti(t=>t.pipe(Hl(KN))),Ti(t=>{let i=t.pipe(oo(o=>JN(this.errorHandler,this.effectsErrorHandler)(o)),Vt(o=>(HN(o,this.errorHandler),o.notification)),sn(o=>o.kind==="N"&&o.value!=null),Dh()),r=t.pipe(Oa(1),sn(ZN),Vt(o=>o.ngrxOnInitEffects()));return ro(i,r)}))}static{this.\u0275fac=function(i){return new(i||n)(we(zn),we(UN))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function KN(n){return $N(n)?n.ngrxOnIdentifyEffects():""}function JN(n,e){return t=>{let i=FN(t,n,e);return XN(t)?t.ngrxOnRunEffects(i):i}}var QN=(()=>{class n{get isStarted(){return!!this.effectsSubscription}constructor(t,i){this.effectSources=t,this.store=i,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}static{this.\u0275fac=function(i){return new(i||n)(we(Jb),we(Wt))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function Qb(...n){let e=n.flat(),t=ON(e);return Qi([t,rc(()=>{ce(Ec),ce(Zu,{optional:!0});let i=ce(QN),r=ce(Jb),o=!i.isStarted;o&&i.start();for(let s of e){let a=Yb(s)?ce(s):s;r.addEffects(a)}o&&ce(Wt).dispatch(VN())})])}var Cc="PERFORM_ACTION",eP="REFRESH",oE="RESET",sE="ROLLBACK",aE="COMMIT",cE="SWEEP",lE="TOGGLE_ACTION",tP="SET_ACTIONS_ACTIVE",uE="JUMP_TO_STATE",dE="JUMP_TO_ACTION",_g="IMPORT_STATE",fE="LOCK_CHANGES",hE="PAUSE_RECORDING",As=class{constructor(e,t){if(this.action=e,this.timestamp=t,this.type=Cc,typeof e.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},ag=class{constructor(){this.type=eP}},cg=class{constructor(e){this.timestamp=e,this.type=oE}},lg=class{constructor(e){this.timestamp=e,this.type=sE}},ug=class{constructor(e){this.timestamp=e,this.type=aE}},dg=class{constructor(){this.type=cE}},fg=class{constructor(e){this.id=e,this.type=lE}};var hg=class{constructor(e){this.index=e,this.type=uE}},pg=class{constructor(e){this.actionId=e,this.type=dE}},mg=class{constructor(e){this.nextLiftedState=e,this.type=_g}},gg=class{constructor(e){this.status=e,this.type=fE}},yg=class{constructor(e){this.status=e,this.type=hE}};var id=new ue("@ngrx/store-devtools Options"),eE=new ue("@ngrx/store-devtools Initial Config");function pE(){return null}var nP="NgRx Store DevTools";function iP(n){let e={maxAge:!1,monitor:pE,actionSanitizer:void 0,stateSanitizer:void 0,name:nP,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},t=typeof n=="function"?n():n,i=t.logOnly?{pause:!0,export:!0,test:!0}:!1,r=t.features||i||e.features;r.import===!0&&(r.import="custom");let o=Object.assign({},e,{features:r},t);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function tE(n,e){return n.filter(t=>e.indexOf(t)<0)}function mE(n){let{computedStates:e,currentStateIndex:t}=n;if(t>=e.length){let{state:r}=e[e.length-1];return r}let{state:i}=e[t];return i}function Tc(n){return new As(n,+Date.now())}function rP(n,e){return Object.keys(e).reduce((t,i)=>{let r=Number(i);return t[r]=gE(n,e[r],r),t},{})}function gE(n,e,t){return Se(fe({},e),{action:n(e.action,t)})}function oP(n,e){return e.map((t,i)=>({state:yE(n,t.state,i),error:t.error}))}function yE(n,e,t){return n(e,t)}function vE(n){return n.predicate||n.actionsSafelist||n.actionsBlocklist}function sP(n,e,t,i){let r=[],o={},s=[];return n.stagedActionIds.forEach((a,c)=>{let l=n.actionsById[a];l&&(c&&xg(n.computedStates[c],l,e,t,i)||(o[a]=l,r.push(a),s.push(n.computedStates[c])))}),Se(fe({},n),{stagedActionIds:r,actionsById:o,computedStates:s})}function xg(n,e,t,i,r){let o=t&&!t(n,e.action),s=i&&!e.action.type.match(i.map(c=>nE(c)).join("|")),a=r&&e.action.type.match(r.map(c=>nE(c)).join("|"));return o||s||a}function nE(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _E(n){return{ngZone:n?ce(Xt):null,connectInZone:n}}var rd=(()=>{class n extends Fi{static{this.\u0275fac=(()=>{let t;return function(r){return(t||(t=Su(n)))(r||n)}})()}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),ed={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},vg=new ue("@ngrx/store-devtools Redux Devtools Extension"),xE=(()=>{class n{constructor(t,i,r){this.config=i,this.dispatcher=r,this.zoneConfig=_E(this.config.connectInZone),this.devtoolsExtension=t,this.createActionStreams()}notify(t,i){if(this.devtoolsExtension)if(t.type===Cc){if(i.isLocked||i.isPaused)return;let r=mE(i);if(vE(this.config)&&xg(r,t,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let o=this.config.stateSanitizer?yE(this.config.stateSanitizer,r,i.currentStateIndex):r,s=this.config.actionSanitizer?gE(this.config.actionSanitizer,t,i.nextActionId):t;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,o))}else{let r=Se(fe({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?rP(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?oP(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new ht(t=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(r=>t.next(r)),i.unsubscribe}):ai}createActionStreams(){let t=this.createChangesObservable().pipe(Ph()),i=t.pipe(sn(l=>l.type===ed.START)),r=t.pipe(sn(l=>l.type===ed.STOP)),o=t.pipe(sn(l=>l.type===ed.DISPATCH),Vt(l=>this.unwrapAction(l.payload)),Vl(l=>l.type===_g?this.dispatcher.pipe(sn(u=>u.type===Ju),Th(1e3),ss(1e3),Vt(()=>l),os(()=>Zi(l)),Oa(1)):Zi(l))),a=t.pipe(sn(l=>l.type===ed.ACTION),Vt(l=>this.unwrapAction(l.payload))).pipe(ka(r)),c=o.pipe(ka(r));this.start$=i.pipe(ka(r)),this.actions$=this.start$.pipe(so(()=>a)),this.liftedActions$=this.start$.pipe(so(()=>c))}unwrapAction(t){return typeof t=="string"?(0,eval)(`(${t})`):t}getExtensionConfig(t){let i={name:t.name,features:t.features,serialize:t.serialize,autoPause:t.autoPause??!1,trace:t.trace??!1,traceLimit:t.traceLimit??75};return t.maxAge!==!1&&(i.maxAge=t.maxAge),i}sendToReduxDevtools(t){try{t()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}static{this.\u0275fac=function(i){return new(i||n)(we(vg),we(id),we(rd))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})(),nd={type:Sc},aP="@ngrx/store-devtools/recompute",cP={type:aP};function ME(n,e,t,i,r){if(i)return{state:t,error:"Interrupted by an error up the chain"};let o=t,s;try{o=n(t,e)}catch(a){s=a.toString(),r.handleError(a)}return{state:o,error:s}}function td(n,e,t,i,r,o,s,a,c){if(e>=n.length&&n.length===o.length)return n;let l=n.slice(0,e),u=o.length-(c?1:0);for(let d=e;d<u;d++){let f=o[d],h=r[f].action,g=l[d-1],y=g?g.state:i,m=g?g.error:void 0,E=s.indexOf(f)>-1?g:ME(t,h,y,m,a);l.push(E)}return c&&l.push(n[n.length-1]),l}function lP(n,e){return{monitorState:e(void 0,{}),nextActionId:1,actionsById:{0:Tc(nd)},stagedActionIds:[0],skippedActionIds:[],committedState:n,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function uP(n,e,t,i,r={}){return o=>(s,a)=>{let{monitorState:c,actionsById:l,nextActionId:u,stagedActionIds:d,skippedActionIds:f,committedState:h,currentStateIndex:g,computedStates:y,isLocked:m,isPaused:p}=s||e;s||(l=Object.create(l));function E(D){let T=D,C=d.slice(1,T+1);for(let I=0;I<C.length;I++)if(y[I+1].error){T=I,C=d.slice(1,T+1);break}else delete l[C[I]];f=f.filter(I=>C.indexOf(I)===-1),d=[0,...d.slice(T+1)],h=y[T].state,y=y.slice(T),g=g>T?g-T:0}function S(){l={0:Tc(nd)},u=1,d=[0],f=[],h=y[g].state,g=0,y=[]}let v=0;switch(a.type){case fE:{m=a.status,v=1/0;break}case hE:{p=a.status,p?(d=[...d,u],l[u]=new As({type:"@ngrx/devtools/pause"},+Date.now()),u++,v=d.length-1,y=y.concat(y[y.length-1]),g===d.length-2&&g++,v=1/0):S();break}case oE:{l={0:Tc(nd)},u=1,d=[0],f=[],h=n,g=0,y=[];break}case aE:{S();break}case sE:{l={0:Tc(nd)},u=1,d=[0],f=[],g=0,y=[];break}case lE:{let{id:D}=a;f.indexOf(D)===-1?f=[D,...f]:f=f.filter(C=>C!==D),v=d.indexOf(D);break}case tP:{let{start:D,end:T,active:C}=a,I=[];for(let b=D;b<T;b++)I.push(b);C?f=tE(f,I):f=[...f,...I],v=d.indexOf(D);break}case uE:{g=a.index,v=1/0;break}case dE:{let D=d.indexOf(a.actionId);D!==-1&&(g=D),v=1/0;break}case cE:{d=tE(d,f),f=[],g=Math.min(g,d.length-1);break}case Cc:{if(m)return s||e;if(p||s&&xg(s.computedStates[g],a,r.predicate,r.actionsSafelist,r.actionsBlocklist)){let T=y[y.length-1];y=[...y.slice(0,-1),ME(o,a.action,T.state,T.error,t)],v=1/0;break}r.maxAge&&d.length===r.maxAge&&E(1),g===d.length-1&&g++;let D=u++;l[D]=a,d=[...d,D],v=d.length-1;break}case _g:{({monitorState:c,actionsById:l,nextActionId:u,stagedActionIds:d,skippedActionIds:f,committedState:h,currentStateIndex:g,computedStates:y,isLocked:m,isPaused:p}=a.nextLiftedState);break}case Sc:{v=0,r.maxAge&&d.length>r.maxAge&&(y=td(y,v,o,h,l,d,f,t,p),E(d.length-r.maxAge),v=1/0);break}case Ju:{if(y.filter(T=>T.error).length>0)v=0,r.maxAge&&d.length>r.maxAge&&(y=td(y,v,o,h,l,d,f,t,p),E(d.length-r.maxAge),v=1/0);else{if(!p&&!m){g===d.length-1&&g++;let T=u++;l[T]=new As(a,+Date.now()),d=[...d,T],v=d.length-1,y=td(y,v,o,h,l,d,f,t,p)}y=y.map(T=>Se(fe({},T),{state:o(T.state,cP)})),g=d.length-1,r.maxAge&&d.length>r.maxAge&&E(d.length-r.maxAge),v=1/0}break}default:{v=1/0;break}}return y=td(y,v,o,h,l,d,f,t,p),c=i(c,a),{monitorState:c,actionsById:l,nextActionId:u,stagedActionIds:d,skippedActionIds:f,committedState:h,currentStateIndex:g,computedStates:y,isLocked:m,isPaused:p}}}var iE=(()=>{class n{constructor(t,i,r,o,s,a,c,l){let u=lP(c,l.monitor),d=uP(c,u,a,l.monitor,l),f=ro(ro(i.asObservable().pipe(as(1)),o.actions$).pipe(Vt(Tc)),t,o.liftedActions$).pipe(Yi(La)),h=r.pipe(Vt(d)),g=_E(l.connectInZone),y=new Na(1);this.liftedStateSubscription=f.pipe(ci(h),rE(g),Fa(({state:E},[S,v])=>{let D=v(E,S);return S.type!==Cc&&vE(l)&&(D=sP(D,l.predicate,l.actionsSafelist,l.actionsBlocklist)),o.notify(S,D),{state:D,action:S}},{state:u,action:null})).subscribe(({state:E,action:S})=>{if(y.next(E),S.type===Cc){let v=S.action;s.next(v)}}),this.extensionStartSubscription=o.start$.pipe(rE(g)).subscribe(()=>{this.refresh()});let m=y.asObservable(),p=m.pipe(Vt(mE));Object.defineProperty(p,"state",{value:Oi(p,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=t,this.liftedState=m,this.state=p}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(t){this.dispatcher.next(t)}next(t){this.dispatcher.next(t)}error(t){}complete(){}performAction(t){this.dispatch(new As(t,+Date.now()))}refresh(){this.dispatch(new ag)}reset(){this.dispatch(new cg(+Date.now()))}rollback(){this.dispatch(new lg(+Date.now()))}commit(){this.dispatch(new ug(+Date.now()))}sweep(){this.dispatch(new dg)}toggleAction(t){this.dispatch(new fg(t))}jumpToAction(t){this.dispatch(new pg(t))}jumpToState(t){this.dispatch(new hg(t))}importState(t){this.dispatch(new mg(t))}lockChanges(t){this.dispatch(new gg(t))}pauseRecording(t){this.dispatch(new yg(t))}static{this.\u0275fac=function(i){return new(i||n)(we(rd),we(Fi),we(bo),we(xE),we(Eo),we(zn),we(wc),we(id))}}static{this.\u0275prov=Ye({token:n,factory:n.\u0275fac})}}return n})();function rE({ngZone:n,connectInZone:e}){return t=>e?new ht(i=>t.subscribe({next:r=>n.run(()=>i.next(r)),error:r=>n.run(()=>i.error(r)),complete:()=>n.run(()=>i.complete())})):t}var dP=new ue("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function fP(n,e){return!!n||e.monitor!==pE}function hP(){let n="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[n]<"u"?window[n]:null}function pP(n){return n.state}function bE(n={}){return Qi([xE,rd,iE,{provide:eE,useValue:n},{provide:dP,deps:[vg,id],useFactory:fP},{provide:vg,useFactory:hP},{provide:id,deps:[eE],useFactory:iP},{provide:Ds,deps:[iE],useFactory:pP},{provide:Cs,useExisting:rd}])}var Dc=[64,32],EE=784,SE=10;var wE="neuronal3d:models:v3";function od(n){return n.version===1&&n.inputDim===EE&&n.outputDim===SE&&n.hidden.length===Dc.length&&n.hidden.every((e,t)=>e===Dc[t])}function Pr(n){try{localStorage.setItem(wE,JSON.stringify(n))}catch{}}function sd(){let n=localStorage.getItem(wE);if(n){let e=JSON.parse(n);if(e.version===3&&Array.isArray(e.models))return e}return{version:3,activeModelId:null,models:[]}}var re=Ib({source:"Neuronal",events:{"Model Store Hydrated":hn(),"Epoch Store Hydrated":hn(),"Active Model Id Set":hn(),"Model Entry Upserted":hn(),"Epoch View Sync From Model":hn(),"Epoch History Cleared":hn(),"Training Started":hn(),"Training Epoch Appended":hn(),"Training Finished":hn(),"Training Stop Requested":Yt(),"Training Pause Toggled":Yt(),"Model Dropdown Set Open":hn(),"Last Train Metrics Reset":Yt(),"New Model From Toolbar Requested":Yt(),"Active Model From Toolbar Requested":hn(),"Ui Model Dropdown Toggle Requested":Yt(),"Ui Model Select Changed":Yt(),"Ui Train Start Requested":Yt(),"Ui Export Bundle Requested":Yt(),"Ui Reset To Pretrained Files Requested":Yt(),"Ui Save As Requested":Yt(),"Ui Reset Requested":Yt(),"Ui Infer Random Requested":Yt(),"Ui Infer Draw Requested":Yt(),"Ui Clear Draw Requested":Yt(),"Ui Epoch Preset Requested":hn(),"Ui Epochs Input Changed":Yt(),"Ui Batch Size Input Changed":Yt(),"Ui Document Pointer Down":hn(),"Ui Draw Pointer Down":hn(),"Ui Draw Pointer Move":hn(),"Ui Draw Pointer Up":Yt(),"Ui Draw Pointer Cancel":Yt(),"Ui Draw Pointer Leave":Yt()}});var TE=n=>(e,t)=>{let i=n(e,t);return(t.type===re.modelEntryUpserted.type||t.type===re.activeModelIdSet.type)&&Pr(i.neuronal.modelCollection),i};var CE="neuronal3d:epochTrack:v1";function Mg(n){if(!n||typeof n!="object")return null;let e=n;if(e.version!==1||typeof e.byModelId!="object"||e.byModelId===null)return null;let t={};for(let[i,r]of Object.entries(e.byModelId)){if(!Array.isArray(r))continue;let o=[];for(let s of r){if(!s||typeof s!="object")continue;let a=s;typeof a.epoch!="number"||typeof a.loss!="number"||typeof a.trainAcc!="number"||o.push({epoch:a.epoch,loss:a.loss,trainAcc:a.trainAcc,savedAt:typeof a.savedAt=="string"?a.savedAt:"",run:typeof a.run=="number"?a.run:0,runStartedAt:typeof a.runStartedAt=="string"?a.runStartedAt:"",runElapsedMs:typeof a.runElapsedMs=="number"?a.runElapsedMs:0})}t[i]=o}return{version:1,byModelId:t}}function ad(){try{let n=localStorage.getItem(CE);if(!n)return{version:1,byModelId:{}};let e=JSON.parse(n);return Mg(e)??{version:1,byModelId:{}}}catch{return{version:1,byModelId:{}}}}function Lr(n){try{localStorage.setItem(CE,JSON.stringify(n))}catch{}}var Ot=Hb("neuronal");function cd(n){return n===null||!Number.isFinite(n)?"-":`${(n*100).toFixed(2)}%`}var mP=Tt(Ot,n=>n.modelCollection),gP=Tt(Ot,n=>n.modelStoreHydrated),DE=Tt(Ot,n=>{if(!n.modelStoreHydrated)return{name:"Modelle werden geladen \u2026",meta:""};if(n.modelCollection.models.length===0)return{name:"Kein Modell",meta:"Lege ein neues Modell an"};let e=n.modelCollection.activeModelId,t=e?n.modelCollection.models.find(i=>i.id===e):null;return t?{name:t.name,meta:`Epoch ${t.metrics.epochsTrained} \xB7 Test-Genauigkeit ${cd(t.metrics.testAcc)} \xB7 Fehlerrate ${cd(t.metrics.errorRate)}`}:{name:"Modell w\xE4hlen",meta:""}}),AE=Tt(Ot,n=>{if(!n.modelStoreHydrated)return{phase:"loading"};if(n.modelCollection.models.length===0)return{phase:"empty"};let e=n.modelCollection.activeModelId;return{phase:"list",items:n.modelCollection.models.map(i=>({id:i.id,name:i.name,epochValue:String(i.metrics.epochsTrained),accValue:cd(i.metrics.testAcc),errValue:cd(i.metrics.errorRate),active:i.id===e})),trainingRunning:n.training.running}}),IE=Tt(Ot,n=>n.training.running||!n.modelStoreHydrated||n.modelCollection.models.length===0),yP=Tt(Ot,n=>n.modelCollection.activeModelId),RE=Tt(Ot,n=>n.modelDropdownOpen),bg=Tt(DE,AE,RE,IE,(n,e,t,i)=>({label:n,menu:e,dropdownOpen:t,dropdownDisabled:i}));var Eg=Tt(Ot,n=>n.epochByModelId),NE=Tt(Ot,n=>n.epochDisplayRows),vP=Tt(NE,n=>n),Sg=Tt(Ot,n=>{let e=n.modelCollection.activeModelId,t=e?n.modelCollection.models.find(a=>a.id===e):null,i=e?n.epochByModelId[e]?.length??0:0,r=Math.max(t?.metrics.epochsTrained??0,i),o=n.epochDisplayRows,s=o.length===0?[]:[...o].slice(-200).reverse();return{epochsTotal:r,rows:s}});var _P=Tt(Ot,n=>n.training),xP=Tt(Ot,n=>n.lastTrainLoss),MP=Tt(Ot,n=>n.lastTrainBatchAcc),bP=Tt(Ot,n=>n.training.pause),EP=Tt(Ot,n=>n.training.shouldStop),So=Tt(Ot,n=>n.training.running),SP=Tt(Ot,n=>({running:n.training.running,pause:n.training.pause,lastTrainLoss:n.lastTrainLoss,lastTrainBatchAcc:n.lastTrainBatchAcc}));function wP(n){return n===null||!Number.isFinite(n)?"-":`${(n*100).toFixed(2)}%`}var TP=Tt(Ot,n=>{let e=n.modelCollection.activeModelId,t=e?n.modelCollection.models.find(i=>i.id===e):null;return t?{headline:t.name,detail:`${t.metrics.epochsTrained} Epochen gesamt \xB7 Test ${wP(t.metrics.testAcc)}`}:{headline:"Kein aktives Modell",detail:"Zuerst ein Modell w\xE4hlen oder anlegen."}});var ld=Tt(Ot,n=>n);function CP(n){let e=n.split(","),t=[];for(let i of e){let r=i.trim();r.length!==0&&t.push(Number(r))}return t}function DP(n){let e=CP(n);if(e.length!==785)return null;let t=e[0];if(!Number.isFinite(t))return null;let i=Math.round(t);if(!Number.isInteger(i)||i<0||i>9)return null;let r=e.slice(1,785);if(r.some(s=>!Number.isFinite(s)))return null;let o=r.map(s=>Math.max(0,Math.min(1,s/255)));return{label:i,pixels:o}}var AP=200;function wg(){let n=globalThis;return typeof n.scheduler?.yield=="function"?n.scheduler.yield():new Promise(e=>{setTimeout(e,0)})}function Tg(n){return Bt(this,null,function*(){let e=yield fetch(n);if(!e.ok)throw new Error(`HTTP ${e.status}`);if(n.endsWith(".gz")){let t=e.body;if(!t)return e.text();let i=new DecompressionStream("gzip");return yield new Response(t.pipeThrough(i)).text()}return e.text()})}function Cg(n){return Bt(this,null,function*(){let e=n.split(/\r?\n/).filter(i=>i.trim().length>0);if(e.length===0)return[];let t=[];for(let i=0;i<e.length;i++){let r=DP(e[i]);r&&t.push(r),i>0&&(i+1)%AP===0&&(yield wg())}return t})}function PE(n,e=Math.random){for(let t=n.length-1;t>0;t--){let i=Math.floor(e()*(t+1)),r=n[t];n[t]=n[i],n[i]=r}}function LE(n,e){let t=[];for(let i=0;i<n;i+=e){let r=[];for(let o=i;o<Math.min(i+e,n);o++)r.push(o);t.push(r)}return t}function ln(n,e){let t=[];for(let i=0;i<n;i++){let r=new Array(e).fill(0);t.push(r)}return t}function ud(n){let e=ln(n.length,1);for(let t=0;t<n.length;t++)e[t][0]=n[t];return e}function Ac(n,e){let t=n.length,i=n[0].length,r=e.length,o=e[0].length;if(i!==r)throw new Error("matMul shape");let s=ln(t,o);for(let a=0;a<t;a++)for(let c=0;c<i;c++){let l=n[a][c];for(let u=0;u<o;u++)s[a][u]+=l*e[c][u]}return s}function Dg(n,e){let t=ln(n.length,n[0].length);for(let i=0;i<n.length;i++)for(let r=0;r<n[0].length;r++)t[i][r]=n[i][r]*e;return t}function dd(n){let e=ln(n[0].length,n.length);for(let t=0;t<n.length;t++)for(let i=0;i<n[0].length;i++)e[i][t]=n[t][i];return e}function Ag(n,e,t){let i=Ac(e,n);for(let r=0;r<i.length;r++){let o=t[r][0];for(let s=0;s<i[0].length;s++)i[r][s]+=o}return i}function Ig(n){let e=ln(n.length,1);for(let t=0;t<n.length;t++){let i=0;for(let r=0;r<n[0].length;r++)i+=n[t][r];e[t][0]=i}return e}function Rg(n,e){let t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=n[i][e];return t}function Ng(n,e,t){for(let i=0;i<n.length;i++)for(let r=0;r<n[0].length;r++){let o=Number.isFinite(e[i][r])?e[i][r]:0,s=Math.max(-100,Math.min(100,o)),a=n[i][r]-t*s;Number.isFinite(a)&&(n[i][r]=Math.max(-1e4,Math.min(1e4,a)))}}function OE(n,e,t){let i=ln(n,e);for(let r=0;r<n;r++)for(let o=0;o<e;o++)i[r][o]=IP()*t;return i}function IP(){let n=0,e=0;for(;n===0;)n=Math.random();for(;e===0;)e=Math.random();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*e)}function FE(n,e=.01){let t=ln(n.length,n[0].length);for(let i=0;i<n.length;i++)for(let r=0;r<n[0].length;r++)t[i][r]=n[i][r]>0?n[i][r]:e*n[i][r];return t}function kE(n,e=.01){let t=ln(n.length,n[0].length);for(let i=0;i<n.length;i++)for(let r=0;r<n[0].length;r++)t[i][r]=n[i][r]>0?1:e;return t}function UE(n){let e=n.length,t=n[0].length,i=ln(e,t);for(let r=0;r<t;r++){let o=-1/0;for(let c=0;c<e;c++){let l=Number.isFinite(n[c][r])?n[c][r]:0;l>o&&(o=l)}Number.isFinite(o)||(o=0);let s=new Array(e),a=0;for(let c=0;c<e;c++){let l=Number.isFinite(n[c][r])?n[c][r]:0,u=Math.max(-60,Math.min(60,l-o)),d=Math.exp(u);s[c]=d,a+=d}if(!Number.isFinite(a)||a<=0){let c=1/Math.max(1,e);for(let l=0;l<e;l++)i[l][r]=c}else for(let c=0;c<e;c++)i[c][r]=s[c]/a}return i}function BE(n,e){let t=ln(n.length,n[0].length);for(let i=0;i<n.length;i++)for(let r=0;r<n[0].length;r++)t[i][r]=n[i][r]-e[i][r];return t}var wo=class{inputDim;hidden;outputDim;weights;biases;constructor(e,t,i){this.inputDim=e,this.hidden=[...t],this.outputDim=i;let r=[e,...t,i];this.weights=[],this.biases=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],c=Math.sqrt(2/Math.max(1,s));this.weights.push(OE(a,s,c)),this.biases.push(ln(a,1))}}forward(e){let t=[],i=e;for(let a=0;a<this.weights.length-1;a++){let c=Ag(i,this.weights[a],this.biases[a]),l=FE(c);t.push({z:c,a:l}),i=l}let r=this.weights.length-1,o=Ag(i,this.weights[r],this.biases[r]),s=UE(o);return t.push({z:o,a:s}),{layers:t,logits:o,prob:s}}crossEntropyLoss(e,t){let i=e[0].length,r=0;for(let o=0;o<i;o++)for(let s=0;s<e.length;s++){let a=Math.max(e[s][o],1e-12);r-=t[s][o]*Math.log(a)}return r/i}backward(e,t,i){let r=this.weights.map(l=>ln(l.length,l[0].length)),o=this.biases.map(l=>ln(l.length,l[0].length)),s=this.weights.length-1,a=BE(i.prob,t),c=s===0?e:i.layers[s-1].a;r[s]=Ac(a,dd(c)),o[s]=Ig(a);for(let l=s-1;l>=0;l--){a=Ac(dd(this.weights[l+1]),a);let u=kE(i.layers[l].z);for(let d=0;d<a.length;d++)for(let f=0;f<a[0].length;f++)a[d][f]*=u[d][f];c=l===0?e:i.layers[l-1].a,r[l]=Ac(a,dd(c)),o[l]=Ig(a)}return{dW:r,db:o}}applyGradients(e,t,i,r){let o=1/r;for(let s=0;s<this.weights.length;s++)Ng(this.weights[s],Dg(e[s],o),i),Ng(this.biases[s],Dg(t[s],o),i)}predictClass(e,t=0){let i=0,r=e[0][t];for(let o=1;o<e.length;o++){let s=e[o][t];s>r&&(r=s,i=o)}return i}countCorrectInBatch(e,t){let i=e[0].length,r=0;for(let o=0;o<i;o++)this.predictClass(e,o)===t[o]&&(r+=1);return r}};function fd(n,e,t=0){let i=[Rg(n,t)];for(let r of e.layers)i.push(Rg(r.a,t));return i}function VE(n,e,t,i,r,o,s){return Bt(this,null,function*(){let a=e.map((u,d)=>d),c=0,l=0;yield Ic(0);for(let u=0;u<t.epochs;u++){yield Ic(0),PE(a);let d=LE(e.length,t.batchSize),f=0,h=0,g=0,y=0;for(let m of d){for(yield Ic(0);o()&&!s();)yield Ic(50);if(s())return{lastTrainLoss:c,lastTrainBatchAcc:l};let p=m.length,E=ln(n.inputDim,p),S=ln(n.outputDim,p),v=new Array(p);for(let O=0;O<p;O++){let G=e[a[m[O]]];v[O]=G.label;for(let q=0;q<n.inputDim;q++)E[q][O]=G.pixels[q];S[G.label][O]=1}let D=n.forward(E),T=n.crossEntropyLoss(D.prob,S),C=T,I=n.countCorrectInBatch(D.prob,v),{dW:b,db:M}=n.backward(E,S,D),A=fd(E,D,p-1);n.applyGradients(b,M,t.lr,p);let z=I/p;c=C,l=z,h+=T*p,g+=I,y+=p,f%t.vizEveryNBatches===0&&i({epoch:u,batchIndex:f,loss:C,trainAccBatch:z,activations:A}),f+=1}r({epoch:u,loss:h/Math.max(1,y),trainAcc:g/Math.max(1,y)}),yield Ic(0)}return{lastTrainLoss:c,lastTrainBatchAcc:l}})}function Ic(n){return new Promise(e=>setTimeout(e,n))}var Cv="170",Ho={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},zo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},RP=0,HE=1,NP=2;var QS=1,PP=2,ur=3,Wr=0,kn=1,dr=2,Vi=0,Zs=1,$d=2,zE=3,GE=4,LP=5,Po=100,OP=101,FP=102,kP=103,UP=104,BP=200,VP=201,HP=202,zP=203,dy=204,fy=205,GP=206,jP=207,WP=208,$P=209,qP=210,XP=211,YP=212,ZP=213,KP=214,hy=0,py=1,my=2,ea=3,gy=4,yy=5,vy=6,_y=7,Dv=0,JP=1,QP=2,jr=0,Av=1,Iv=2,Rv=3,el=4,eL=5,Nv=6,Pv=7;var jE=300,ta=301,na=302,xy=303,My=304,Cf=306,by=1e3,Oo=1001,Ey=1002,Xn=1003,tL=1004;var hd=1005;var Ui=1006,Pg=1007;var Fo=1008;var mr=1009,ew=1010,tw=1011,qc=1012,Lv=1013,ko=1014,Bi=1015,Ei=1016,Ov=1017,Fv=1018,ia=1020,nw=35902,iw=1021,rw=1022,xi=1023,ow=1024,sw=1025,Ks=1026,ra=1027,kv=1028,Uv=1029,aw=1030,Bv=1031;var Vv=1033,Hd=33776,zd=33777,Gd=33778,jd=33779,Sy=35840,wy=35841,Ty=35842,Cy=35843,Dy=36196,Ay=37492,Iy=37496,Ry=37808,Ny=37809,Py=37810,Ly=37811,Oy=37812,Fy=37813,ky=37814,Uy=37815,By=37816,Vy=37817,Hy=37818,zy=37819,Gy=37820,jy=37821,Wd=36492,Wy=36494,$y=36495,cw=36283,qy=36284,Xy=36285,Yy=36286;var qd=2300,Zy=2301,Lg=2302,WE=2400,$E=2401,qE=2402;var nL=3200,iL=3201;var lw=0,rL=1,Hr="",Fn="srgb",ha="srgb-linear",Df="linear",vt="srgb";var Is=7680;var XE=519,oL=512,sL=513,aL=514,uw=515,cL=516,lL=517,uL=518,dL=519,Ky=35044,Af=35048;var YE="300 es",fr=2e3,Xd=2001,gr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ZE=1234567,jc=Math.PI/180,Xc=180/Math.PI;function hr(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function En(n,e,t){return Math.max(e,Math.min(t,n))}function Hv(n,e){return(n%e+e)%e}function fL(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function hL(n,e,t){return n!==e?(t-n)/(e-n):0}function Wc(n,e,t){return(1-t)*n+t*e}function pL(n,e,t,i){return Wc(n,e,1-Math.exp(-t*i))}function mL(n,e=1){return e-Math.abs(Hv(n,e*2)-e)}function gL(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function yL(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function vL(n,e){return n+Math.floor(Math.random()*(e-n+1))}function _L(n,e){return n+Math.random()*(e-n)}function xL(n){return n*(.5-Math.random())}function ML(n){n!==void 0&&(ZE=n);let e=ZE+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bL(n){return n*jc}function EL(n){return n*Xc}function SL(n){return(n&n-1)===0&&n!==0}function wL(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function TL(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function CL(n,e,t,i,r){let o=Math.cos,s=Math.sin,a=o(t/2),c=s(t/2),l=o((e+i)/2),u=s((e+i)/2),d=o((e-i)/2),f=s((e-i)/2),h=o((i-e)/2),g=s((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*h,a*l);break;case"YXY":n.set(c*h,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*h,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function _i(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var dw={DEG2RAD:jc,RAD2DEG:Xc,generateUUID:hr,clamp:En,euclideanModulo:Hv,mapLinear:fL,inverseLerp:hL,lerp:Wc,damp:pL,pingpong:mL,smoothstep:gL,smootherstep:yL,randInt:vL,randFloat:_L,randFloatSpread:xL,seededRandom:ML,degToRad:bL,radToDeg:EL,isPowerOfTwo:SL,ceilPowerOfTwo:wL,floorPowerOfTwo:TL,setQuaternionFromProperEuler:CL,normalize:bt,denormalize:_i},xe=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(En(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ze=class n{constructor(e,t,i,r,o,s,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,c,l)}set(e,t,i,r,o,s,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],y=r[0],m=r[3],p=r[6],E=r[1],S=r[4],v=r[7],D=r[2],T=r[5],C=r[8];return o[0]=s*y+a*E+c*D,o[3]=s*m+a*S+c*T,o[6]=s*p+a*v+c*C,o[1]=l*y+u*E+d*D,o[4]=l*m+u*S+d*T,o[7]=l*p+u*v+d*C,o[2]=f*y+h*E+g*D,o[5]=f*m+h*S+g*T,o[8]=f*p+h*v+g*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-i*o*u+i*a*c+r*o*l-r*s*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*s-a*l,f=a*c-u*o,h=l*o-s*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=d*y,e[1]=(r*l-u*i)*y,e[2]=(a*i-r*s)*y,e[3]=f*y,e[4]=(u*t-r*c)*y,e[5]=(r*o-a*t)*y,e[6]=h*y,e[7]=(i*c-l*t)*y,e[8]=(s*t-i*o)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Og.makeScale(e,t)),this}rotate(e){return this.premultiply(Og.makeRotation(-e)),this}translate(e,t){return this.premultiply(Og.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Og=new Ze;function fw(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Yd(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function DL(){let n=Yd("canvas");return n.style.display="block",n}var KE={};function zc(n){n in KE||(KE[n]=!0,console.warn(n))}function AL(n,e,t){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:i()}}setTimeout(o,t)})}function IL(n){let e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function RL(n){let e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var st={enabled:!0,workingColorSpace:ha,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===vt&&(n.r=pr(n.r),n.g=pr(n.g),n.b=pr(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===vt&&(n.r=Js(n.r),n.g=Js(n.g),n.b=Js(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Hr?Df:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function pr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var JE=[.64,.33,.3,.6,.15,.06],QE=[.2126,.7152,.0722],eS=[.3127,.329],tS=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nS=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);st.define({[ha]:{primaries:JE,whitePoint:eS,transfer:Df,toXYZ:tS,fromXYZ:nS,luminanceCoefficients:QE,workingColorSpaceConfig:{unpackColorSpace:Fn},outputColorSpaceConfig:{drawingBufferColorSpace:Fn}},[Fn]:{primaries:JE,whitePoint:eS,transfer:vt,toXYZ:tS,fromXYZ:nS,luminanceCoefficients:QE,outputColorSpaceConfig:{drawingBufferColorSpace:Fn}}});var Rs,Jy=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rs===void 0&&(Rs=Yd("canvas")),Rs.width=e.width,Rs.height=e.height;let i=Rs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Yd("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=pr(o[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(pr(t[i]/255)*255):t[i]=pr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},NL=0,Zd=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:NL++}),this.uuid=hr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(Fg(r[s].image)):o.push(Fg(r[s]))}else o=Fg(r);i.url=o}return t||(e.images[this.uuid]=i),i}};function Fg(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Jy.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var PL=0,_r=(()=>{class n extends gr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Oo,o=Oo,s=Ui,a=Fo,c=xi,l=mr,u=n.DEFAULT_ANISOTROPY,d=Hr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:PL++}),this.uuid=hr(),this.name="",this.source=new Zd(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jE)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case by:t.x=t.x-Math.floor(t.x);break;case Oo:t.x=t.x<0?0:1;break;case Ey:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case by:t.y=t.y-Math.floor(t.y);break;case Oo:t.y=t.y<0?0:1;break;case Ey:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=jE,n.DEFAULT_ANISOTROPY=1,n})(),St=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,o,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,v=(h+1)/2,D=(p+1)/2,T=(u+f)/4,C=(d+y)/4,I=(g+m)/4;return S>v&&S>D?S<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(S),r=T/i,o=C/i):v>D?v<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(v),i=T/r,o=I/r):D<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(D),i=C/o,r=I/o),this.set(i,r,o,t),this}let E=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-y)/E,this.z=(f-u)/E,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qy=class extends gr{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);let r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let o=new _r(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];let s=i.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Zd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends Qy{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Kd=class extends _r{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Oo,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ev=class extends _r{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Oo,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,o,s,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=o[s+0],h=o[s+1],g=o[s+2],y=o[s+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=y;return}if(d!==y||c!==f||l!==h||u!==g){let m=1-a,p=c*f+l*h+u*g+d*y,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){let D=Math.sqrt(S),T=Math.atan2(D,p*E);m=Math.sin(m*T)/D,a=Math.sin(a*T)/D}let v=a*E;if(c=c*m+f*v,l=l*m+h*v,u=u*m+g*v,d=d*m+y*v,m===1-a){let D=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=D,l*=D,u*=D,d*=D}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,o,s){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=o[s],f=o[s+1],h=o[s+2],g=o[s+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(o/2),f=c(i/2),h=c(r/2),g=c(o/2);switch(s){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(o-l)*h,this._z=(s-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+s)/h,this._z=(o+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(o-l)/h,this._x=(r+s)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(s-r)/h,this._x=(o+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(En(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-i*l,this._z=o*u+s*l+i*c-r*a,this._w=s*u-i*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;let c=1-a*a;if(c<=Number.EPSILON){let h=1-t;return this._w=h*s+t*this._w,this._x=h*i+t*this._x,this._y=h*r+t*this._y,this._z=h*o+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=s*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=o*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(iS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(iS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*r,this.y=o[1]*t+o[4]*i+o[7]*r,this.z=o[2]*t+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=2*(s*r-a*i),u=2*(a*t-o*r),d=2*(o*i-s*t);return this.x=t+c*l+s*d-a*u,this.y=i+c*u+a*l-o*d,this.z=r+c*d+o*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r,this.y=o[1]*t+o[5]*i+o[9]*r,this.z=o[2]*t+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-i*c,this.z=i*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return kg.copy(this).projectOnVector(e),this.sub(kg)}reflect(e){return this.sub(kg.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(En(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},kg=new R,iS=new Mi,yr=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,mi):mi.fromBufferAttribute(o,s),mi.applyMatrix4(e.matrixWorld),this.expandByPoint(mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pd.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pd.copy(i.boundingBox)),pd.applyMatrix4(e.matrixWorld),this.union(pd)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mi),mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rc),md.subVectors(this.max,Rc),Ns.subVectors(e.a,Rc),Ps.subVectors(e.b,Rc),Ls.subVectors(e.c,Rc),Or.subVectors(Ps,Ns),Fr.subVectors(Ls,Ps),To.subVectors(Ns,Ls);let t=[0,-Or.z,Or.y,0,-Fr.z,Fr.y,0,-To.z,To.y,Or.z,0,-Or.x,Fr.z,0,-Fr.x,To.z,0,-To.x,-Or.y,Or.x,0,-Fr.y,Fr.x,0,-To.y,To.x,0];return!Ug(t,Ns,Ps,Ls,md)||(t=[1,0,0,0,1,0,0,0,1],!Ug(t,Ns,Ps,Ls,md))?!1:(gd.crossVectors(Or,Fr),t=[gd.x,gd.y,gd.z],Ug(t,Ns,Ps,Ls,md))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},or=[new R,new R,new R,new R,new R,new R,new R,new R],mi=new R,pd=new yr,Ns=new R,Ps=new R,Ls=new R,Or=new R,Fr=new R,To=new R,Rc=new R,md=new R,gd=new R,Co=new R;function Ug(n,e,t,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){Co.fromArray(n,o);let a=r.x*Math.abs(Co.x)+r.y*Math.abs(Co.y)+r.z*Math.abs(Co.z),c=e.dot(Co),l=t.dot(Co),u=i.dot(Co);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var LL=new yr,Nc=new R,Bg=new R,$r=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):LL.setFromPoints(e).getCenter(i);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Nc.subVectors(e,this.center);let t=Nc.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Nc,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bg.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Nc.copy(e.center).add(Bg)),this.expandByPoint(Nc.copy(e.center).sub(Bg))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},sr=new R,Vg=new R,yd=new R,kr=new R,Hg=new R,vd=new R,zg=new R,oa=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=sr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sr.copy(this.origin).addScaledVector(this.direction,t),sr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Vg.copy(e).add(t).multiplyScalar(.5),yd.copy(t).sub(e).normalize(),kr.copy(this.origin).sub(Vg);let o=e.distanceTo(t)*.5,s=-this.direction.dot(yd),a=kr.dot(this.direction),c=-kr.dot(yd),l=kr.lengthSq(),u=Math.abs(1-s*s),d,f,h,g;if(u>0)if(d=s*c-a,f=s*a-c,g=o*u,d>=0)if(f>=-g)if(f<=g){let y=1/u;d*=y,f*=y,h=d*(d+s*f+2*a)+f*(s*d+f+2*c)+l}else f=o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;else f=-o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-s*o+a)),f=d>0?-o:Math.min(Math.max(-o,-c),o),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-o,-c),o),h=f*(f+2*c)+l):(d=Math.max(0,-(s*o+a)),f=d>0?o:Math.min(Math.max(-o,-c),o),h=-d*d+f*(f+2*c)+l);else f=s>0?-o:o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Vg).addScaledVector(yd,f),h}intersectSphere(e,t){sr.subVectors(e.center,this.origin);let i=sr.dot(this.direction),r=sr.dot(sr)-i*i,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=i-s,c=i+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(o=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,sr)!==null}intersectTriangle(e,t,i,r,o){Hg.subVectors(t,e),vd.subVectors(i,e),zg.crossVectors(Hg,vd);let s=this.direction.dot(zg),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;kr.subVectors(this.origin,e);let c=a*this.direction.dot(vd.crossVectors(kr,vd));if(c<0)return null;let l=a*this.direction.dot(Hg.cross(kr));if(l<0||c+l>s)return null;let u=-a*kr.dot(zg);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ct=class n{constructor(e,t,i,r,o,s,a,c,l,u,d,f,h,g,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,c,l,u,d,f,h,g,y,m)}set(e,t,i,r,o,s,a,c,l,u,d,f,h,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=o,p[5]=s,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/Os.setFromMatrixColumn(e,0).length(),o=1/Os.setFromMatrixColumn(e,1).length(),s=1/Os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,o=e.z,s=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let f=s*u,h=s*d,g=a*u,y=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+h*l,t[10]=s*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f+y*a,t[4]=g*a-h,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=h*a-g,t[6]=y+f*a,t[10]=s*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f-y*a,t[4]=-s*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=s*u,t[9]=y-f*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){let f=s*u,h=s*d,g=a*u,y=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+y,t[1]=c*d,t[5]=y*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){let f=s*c,h=s*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*d,t[8]=g*d+h,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-y*d}else if(e.order==="XZY"){let f=s*c,h=s*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+y,t[5]=s*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(OL,e,FL)}lookAt(e,t,i){let r=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Ur.crossVectors(i,$n),Ur.lengthSq()===0&&(Math.abs(i.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Ur.crossVectors(i,$n)),Ur.normalize(),_d.crossVectors($n,Ur),r[0]=Ur.x,r[4]=_d.x,r[8]=$n.x,r[1]=Ur.y,r[5]=_d.y,r[9]=$n.y,r[2]=Ur.z,r[6]=_d.z,r[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],y=i[6],m=i[10],p=i[14],E=i[3],S=i[7],v=i[11],D=i[15],T=r[0],C=r[4],I=r[8],b=r[12],M=r[1],A=r[5],z=r[9],O=r[13],G=r[2],q=r[6],W=r[10],Y=r[14],U=r[3],k=r[7],X=r[11],oe=r[15];return o[0]=s*T+a*M+c*G+l*U,o[4]=s*C+a*A+c*q+l*k,o[8]=s*I+a*z+c*W+l*X,o[12]=s*b+a*O+c*Y+l*oe,o[1]=u*T+d*M+f*G+h*U,o[5]=u*C+d*A+f*q+h*k,o[9]=u*I+d*z+f*W+h*X,o[13]=u*b+d*O+f*Y+h*oe,o[2]=g*T+y*M+m*G+p*U,o[6]=g*C+y*A+m*q+p*k,o[10]=g*I+y*z+m*W+p*X,o[14]=g*b+y*O+m*Y+p*oe,o[3]=E*T+S*M+v*G+D*U,o[7]=E*C+S*A+v*q+D*k,o[11]=E*I+S*z+v*W+D*X,o[15]=E*b+S*O+v*Y+D*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+o*c*d-r*l*d-o*a*f+i*l*f+r*a*h-i*c*h)+y*(+t*c*h-t*l*f+o*s*f-r*s*h+r*l*u-o*c*u)+m*(+t*l*d-t*a*h-o*s*d+i*s*h+o*a*u-i*l*u)+p*(-r*a*u-t*c*d+t*a*f+r*s*d-i*s*f+i*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],y=e[13],m=e[14],p=e[15],E=d*m*l-y*f*l+y*c*h-a*m*h-d*c*p+a*f*p,S=g*f*l-u*m*l-g*c*h+s*m*h+u*c*p-s*f*p,v=u*y*l-g*d*l+g*a*h-s*y*h-u*a*p+s*d*p,D=g*d*c-u*y*c-g*a*f+s*y*f+u*a*m-s*d*m,T=t*E+i*S+r*v+o*D;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return e[0]=E*C,e[1]=(y*f*o-d*m*o-y*r*h+i*m*h+d*r*p-i*f*p)*C,e[2]=(a*m*o-y*c*o+y*r*l-i*m*l-a*r*p+i*c*p)*C,e[3]=(d*c*o-a*f*o-d*r*l+i*f*l+a*r*h-i*c*h)*C,e[4]=S*C,e[5]=(u*m*o-g*f*o+g*r*h-t*m*h-u*r*p+t*f*p)*C,e[6]=(g*c*o-s*m*o-g*r*l+t*m*l+s*r*p-t*c*p)*C,e[7]=(s*f*o-u*c*o+u*r*l-t*f*l-s*r*h+t*c*h)*C,e[8]=v*C,e[9]=(g*d*o-u*y*o-g*i*h+t*y*h+u*i*p-t*d*p)*C,e[10]=(s*y*o-g*a*o+g*i*l-t*y*l-s*i*p+t*a*p)*C,e[11]=(u*a*o-s*d*o-u*i*l+t*d*l+s*i*h-t*a*h)*C,e[12]=D*C,e[13]=(u*y*r-g*d*r+g*i*f-t*y*f-u*i*m+t*d*m)*C,e[14]=(g*a*r-s*y*r-g*i*c+t*y*c+s*i*m-t*a*m)*C,e[15]=(s*d*r-u*a*r+u*i*c-t*d*c-s*i*f+t*a*f)*C,this}scale(e){let t=this.elements,i=e.x,r=e.y,o=e.z;return t[0]*=i,t[4]*=r,t[8]*=o,t[1]*=i,t[5]*=r,t[9]*=o,t[2]*=i,t[6]*=r,t[10]*=o,t[3]*=i,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),o=1-i,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,o,s){return this.set(1,i,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,d=a+a,f=o*l,h=o*u,g=o*d,y=s*u,m=s*d,p=a*d,E=c*l,S=c*u,v=c*d,D=i.x,T=i.y,C=i.z;return r[0]=(1-(y+p))*D,r[1]=(h+v)*D,r[2]=(g-S)*D,r[3]=0,r[4]=(h-v)*T,r[5]=(1-(f+p))*T,r[6]=(m+E)*T,r[7]=0,r[8]=(g+S)*C,r[9]=(m-E)*C,r[10]=(1-(f+y))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,o=Os.set(r[0],r[1],r[2]).length(),s=Os.set(r[4],r[5],r[6]).length(),a=Os.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],gi.copy(this);let l=1/o,u=1/s,d=1/a;return gi.elements[0]*=l,gi.elements[1]*=l,gi.elements[2]*=l,gi.elements[4]*=u,gi.elements[5]*=u,gi.elements[6]*=u,gi.elements[8]*=d,gi.elements[9]*=d,gi.elements[10]*=d,t.setFromRotationMatrix(gi),i.x=o,i.y=s,i.z=a,this}makePerspective(e,t,i,r,o,s,a=fr){let c=this.elements,l=2*o/(t-e),u=2*o/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r),h,g;if(a===fr)h=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===Xd)h=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=h,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,o,s,a=fr){let c=this.elements,l=1/(t-e),u=1/(i-r),d=1/(s-o),f=(t+e)*l,h=(i+r)*u,g,y;if(a===fr)g=(s+o)*d,y=-2*d;else if(a===Xd)g=o*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-h,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Os=new R,gi=new Ct,OL=new R(0,0,0),FL=new R(1,1,1),Ur=new R,_d=new R,$n=new R,rS=new Ct,oS=new Mi,Uo=(()=>{class n{constructor(t=0,i=0,r=0,o=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,o=this._order){return this._x=t,this._y=i,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let o=t.elements,s=o[0],a=o[4],c=o[8],l=o[1],u=o[5],d=o[9],f=o[2],h=o[6],g=o[10];switch(i){case"XYZ":this._y=Math.asin(En(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-En(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(En(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-En(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(En(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-En(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return rS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return oS.setFromEuler(this),this.setFromQuaternion(oS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Jd=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},kL=0,sS=new R,Fs=new Mi,ar=new Ct,xd=new R,Pc=new R,UL=new R,BL=new Mi,aS=new R(1,0,0),cS=new R(0,1,0),lS=new R(0,0,1),uS={type:"added"},VL={type:"removed"},ks={type:"childadded",child:null},Gg={type:"childremoved",child:null},Un=(()=>{class n extends gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kL++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new R,i=new Uo,r=new Mi,o=new R(1,1,1);function s(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(s),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ct},normalMatrix:{value:new Ze}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Fs.setFromAxisAngle(t,i),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(t,i){return Fs.setFromAxisAngle(t,i),this.quaternion.premultiply(Fs),this}rotateX(t){return this.rotateOnAxis(aS,t)}rotateY(t){return this.rotateOnAxis(cS,t)}rotateZ(t){return this.rotateOnAxis(lS,t)}translateOnAxis(t,i){return sS.copy(t).applyQuaternion(this.quaternion),this.position.add(sS.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(aS,t)}translateY(t){return this.translateOnAxis(cS,t)}translateZ(t){return this.translateOnAxis(lS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ar.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?xd.copy(t):xd.set(t,i,r);let o=this.parent;this.updateWorldMatrix(!0,!1),Pc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ar.lookAt(Pc,xd,this.up):ar.lookAt(xd,Pc,this.up),this.quaternion.setFromRotationMatrix(ar),o&&(ar.extractRotation(o.matrixWorld),Fs.setFromRotationMatrix(ar),this.quaternion.premultiply(Fs.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uS),ks.child=t,this.dispatchEvent(ks),ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(VL),Gg.child=t,this.dispatchEvent(Gg),Gg.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ar.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ar.multiply(t.parent.matrixWorld)),t.applyMatrix4(ar),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uS),ks.child=t,this.dispatchEvent(ks),ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,o=this.children.length;r<o;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pc,t,UL),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pc,BL,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=s(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(s(t.materials,this.material[l]));o.material=c}else o.material=s(t.materials,this.material);if(this.children.length>0){o.children=[];for(let c=0;c<this.children.length;c++)o.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];o.animations.push(s(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),y=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),y.length>0&&(r.nodes=y)}return r.object=o,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let o=t.children[r];this.add(o.clone())}return this}}return n.DEFAULT_UP=new R(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),yi=new R,cr=new R,jg=new R,lr=new R,Us=new R,Bs=new R,dS=new R,Wg=new R,$g=new R,qg=new R,Xg=new St,Yg=new St,Zg=new St,zr=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),yi.subVectors(e,t),r.cross(yi);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,i,r,o){yi.subVectors(r,t),cr.subVectors(i,t),jg.subVectors(e,t);let s=yi.dot(yi),a=yi.dot(cr),c=yi.dot(jg),l=cr.dot(cr),u=cr.dot(jg),d=s*l-a*a;if(d===0)return o.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(s*u-a*c)*f;return o.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(e,t,i,r,o,s,a,c){return this.getBarycoord(e,t,i,r,lr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,lr.x),c.addScaledVector(s,lr.y),c.addScaledVector(a,lr.z),c)}static getInterpolatedAttribute(e,t,i,r,o,s){return Xg.setScalar(0),Yg.setScalar(0),Zg.setScalar(0),Xg.fromBufferAttribute(e,t),Yg.fromBufferAttribute(e,i),Zg.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Xg,o.x),s.addScaledVector(Yg,o.y),s.addScaledVector(Zg,o.z),s}static isFrontFacing(e,t,i,r){return yi.subVectors(i,t),cr.subVectors(e,t),yi.cross(cr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yi.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),yi.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,o){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,o=this.c,s,a;Us.subVectors(r,i),Bs.subVectors(o,i),Wg.subVectors(e,i);let c=Us.dot(Wg),l=Bs.dot(Wg);if(c<=0&&l<=0)return t.copy(i);$g.subVectors(e,r);let u=Us.dot($g),d=Bs.dot($g);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(Us,s);qg.subVectors(e,o);let h=Us.dot(qg),g=Bs.dot(qg);if(g>=0&&h<=g)return t.copy(o);let y=h*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Bs,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return dS.subVectors(o,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(dS,a);let p=1/(m+y+f);return s=y*p,a=f*p,t.copy(i).addScaledVector(Us,s).addScaledVector(Bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},hw={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Br={h:0,s:0,l:0},Md={h:0,s:0,l:0};function Kg(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Oe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=Hv(e,1),t=En(t,0,1),i=En(i,0,1),t===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+t):i+t-i*t,s=2*i-o;this.r=Kg(s,o,e+1/3),this.g=Kg(s,o,e),this.b=Kg(s,o,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,t=Fn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fn){let i=hw[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fn){return st.fromWorkingColorSpace(bn.copy(this),e),Math.round(En(bn.r*255,0,255))*65536+Math.round(En(bn.g*255,0,255))*256+Math.round(En(bn.b*255,0,255))}getHexString(e=Fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(bn.copy(this),t);let i=bn.r,r=bn.g,o=bn.b,s=Math.max(i,r,o),a=Math.min(i,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let d=s-a;switch(l=u<=.5?d/(s+a):d/(2-s-a),s){case i:c=(r-o)/d+(r<o?6:0);break;case r:c=(o-i)/d+2;break;case o:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=Fn){st.fromWorkingColorSpace(bn.copy(this),e);let t=bn.r,i=bn.g,r=bn.b;return e!==Fn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Br),this.setHSL(Br.h+e,Br.s+t,Br.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Br),e.getHSL(Md);let i=Wc(Br.h,Md.h,t),r=Wc(Br.s,Md.s,t),o=Wc(Br.l,Md.l,t);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*r,this.g=o[1]*t+o[4]*i+o[7]*r,this.b=o[2]*t+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new Oe;Oe.NAMES=hw;var HL=0,vr=class extends gr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:HL++}),this.uuid=hr(),this.name="",this.blending=Zs,this.side=Wr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dy,this.blendDst=fy,this.blendEquation=Po,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=ea,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=XE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Is,this.stencilZFail=Is,this.stencilZPass=Is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(i.blending=this.blending),this.side!==Wr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==dy&&(i.blendSrc=this.blendSrc),this.blendDst!==fy&&(i.blendDst=this.blendDst),this.blendEquation!==Po&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ea&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==XE&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},qr=class extends vr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Uo,this.combine=Dv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Zt=new R,bd=new xe,mn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ky,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)bd.fromBufferAttribute(this,t),bd.applyMatrix3(e),this.setXY(t,bd.x,bd.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=_i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_i(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_i(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_i(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),o=bt(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ky&&(e.usage=this.usage),e}};var Qd=class extends mn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ef=class extends mn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Kt=class extends mn{constructor(e,t,i){super(new Float32Array(e),t,i)}},zL=0,ti=new Ct,Jg=new Un,Vs=new R,qn=new yr,Lc=new yr,un=new R,In=class n extends gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zL++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fw(e)?ef:Qd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new Ze().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,i){return ti.makeTranslation(e,t,i),this.applyMatrix4(ti),this}scale(e,t,i){return ti.makeScale(e,t,i),this.applyMatrix4(ti),this}lookAt(e){return Jg.lookAt(e),Jg.updateMatrix(),this.applyMatrix4(Jg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,o=e.length;r<o;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Kt(i,3))}else{for(let i=0,r=t.count;i<r;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let o=t[i];qn.setFromBufferAttribute(o),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $r);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(qn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];Lc.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(qn.min,Lc.min),qn.expandByPoint(un),un.addVectors(qn.max,Lc.max),qn.expandByPoint(un)):(qn.expandByPoint(Lc.min),qn.expandByPoint(Lc.max))}qn.getCenter(i);let r=0;for(let o=0,s=e.count;o<s;o++)un.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(un));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)un.fromBufferAttribute(a,l),c&&(Vs.fromBufferAttribute(e,l),un.add(Vs)),r=Math.max(r,i.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*i.count),4));let s=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<i.count;I++)a[I]=new R,c[I]=new R;let l=new R,u=new R,d=new R,f=new xe,h=new xe,g=new xe,y=new R,m=new R;function p(I,b,M){l.fromBufferAttribute(i,I),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,M),f.fromBufferAttribute(o,I),h.fromBufferAttribute(o,b),g.fromBufferAttribute(o,M),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let A=1/(h.x*g.y-g.x*h.y);isFinite(A)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(A),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(A),a[I].add(y),a[b].add(y),a[M].add(y),c[I].add(m),c[b].add(m),c[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,b=E.length;I<b;++I){let M=E[I],A=M.start,z=M.count;for(let O=A,G=A+z;O<G;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let S=new R,v=new R,D=new R,T=new R;function C(I){D.fromBufferAttribute(r,I),T.copy(D);let b=a[I];S.copy(b),S.sub(D.multiplyScalar(D.dot(b))).normalize(),v.crossVectors(T,b);let A=v.dot(c[I])<0?-1:1;s.setXYZW(I,S.x,S.y,S.z,A)}for(let I=0,b=E.length;I<b;++I){let M=E[I],A=M.start,z=M.count;for(let O=A,G=A+z;O<G;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new R,o=new R,s=new R,a=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,y),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?h=c[y]*a.data.stride+a.offset:h=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new mn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let o=e.morphAttributes;for(let l in o){let u=[],d=o[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fS=new Ct,Do=new oa,Ed=new $r,hS=new R,Sd=new R,wd=new R,Td=new R,Qg=new R,Cd=new R,pS=new R,Dd=new R,pn=class extends Un{constructor(e=new In,t=new qr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){Cd.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],d=o[c];u!==0&&(Qg.fromBufferAttribute(d,e),s?Cd.addScaledVector(Qg,u):Cd.addScaledVector(Qg.sub(t),u))}t.add(Cd)}return t}raycast(e,t){let i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ed.copy(i.boundingSphere),Ed.applyMatrix4(o),Do.copy(e.ray).recast(e.near),!(Ed.containsPoint(Do.origin)===!1&&(Do.intersectSphere(Ed,hS)===null||Do.origin.distanceToSquared(hS)>(e.far-e.near)**2))&&(fS.copy(o).invert(),Do.copy(e.ray).applyMatrix4(fS),!(i.boundingBox!==null&&Do.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Do)))}_computeIntersections(e,t,i){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,h=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=s[m.materialIndex],E=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=E,D=S;v<D;v+=3){let T=a.getX(v),C=a.getX(v+1),I=a.getX(v+2);r=Ad(this,p,e,i,l,u,d,T,C,I),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){let E=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);r=Ad(this,s,e,i,l,u,d,E,S,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=s[m.materialIndex],E=Math.max(m.start,h.start),S=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let v=E,D=S;v<D;v+=3){let T=v,C=v+1,I=v+2;r=Ad(this,p,e,i,l,u,d,T,C,I),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(c.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){let E=m,S=m+1,v=m+2;r=Ad(this,s,e,i,l,u,d,E,S,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function GL(n,e,t,i,r,o,s,a){let c;if(e.side===kn?c=i.intersectTriangle(s,o,r,!0,a):c=i.intersectTriangle(r,o,s,e.side===Wr,a),c===null)return null;Dd.copy(a),Dd.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Dd);return l<t.near||l>t.far?null:{distance:l,point:Dd.clone(),object:n}}function Ad(n,e,t,i,r,o,s,a,c,l){n.getVertexPosition(a,Sd),n.getVertexPosition(c,wd),n.getVertexPosition(l,Td);let u=GL(n,e,t,i,Sd,wd,Td,pS);if(u){let d=new R;zr.getBarycoord(pS,Sd,wd,Td,d),r&&(u.uv=zr.getInterpolatedAttribute(r,a,c,l,d,new xe)),o&&(u.uv1=zr.getInterpolatedAttribute(o,a,c,l,d,new xe)),s&&(u.normal=zr.getInterpolatedAttribute(s,a,c,l,d,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new R,materialIndex:0};zr.getNormal(Sd,wd,Td,f.normal),u.face=f,u.barycoord=d}return u}var Yc=class n extends In{constructor(e=1,t=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,s,o,0),g("z","y","x",1,-1,i,t,-e,s,o,1),g("x","z","y",1,1,e,i,t,r,s,2),g("x","z","y",1,-1,e,i,-t,r,s,3),g("x","y","z",1,-1,e,t,i,r,o,4),g("x","y","z",-1,-1,e,t,-i,r,o,5),this.setIndex(c),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(d,2));function g(y,m,p,E,S,v,D,T,C,I,b){let M=v/C,A=D/I,z=v/2,O=D/2,G=T/2,q=C+1,W=I+1,Y=0,U=0,k=new R;for(let X=0;X<W;X++){let oe=X*A-O;for(let Ne=0;Ne<q;Ne++){let it=Ne*M-z;k[y]=it*E,k[m]=oe*S,k[p]=G,l.push(k.x,k.y,k.z),k[y]=0,k[m]=0,k[p]=T>0?1:-1,u.push(k.x,k.y,k.z),d.push(Ne/C),d.push(1-X/I),Y+=1}}for(let X=0;X<I;X++)for(let oe=0;oe<C;oe++){let Ne=f+oe+q*X,it=f+oe+q*(X+1),$=f+(oe+1)+q*(X+1),ne=f+(oe+1)+q*X;c.push(Ne,it,ne),c.push(it,$,ne),U+=6}a.addGroup(h,U,b),h+=U,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function sa(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Dn(n){let e={};for(let t=0;t<n.length;t++){let i=sa(n[t]);for(let r in i)e[r]=i[r]}return e}function jL(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function pw(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var Xr={clone:sa,merge:Dn},WL=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$L=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends vr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=WL,this.fragmentShader=$L,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sa(e.uniforms),this.uniformsGroups=jL(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},tf=class extends Un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=fr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Vr=new R,mS=new xe,gS=new xe,Sn=class extends tf{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(jc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xc*2*Math.atan(Math.tan(jc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z),Vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z)}getViewSize(e,t){return this.getViewBounds(e,mS,gS),t.subVectors(gS,mS)}setViewOffset(e,t,i,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(jc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Hs=-90,zs=1,tv=class extends Un{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Sn(Hs,zs,e,t);r.layers=this.layers,this.add(r);let o=new Sn(Hs,zs,e,t);o.layers=this.layers,this.add(o);let s=new Sn(Hs,zs,e,t);s.layers=this.layers,this.add(s);let a=new Sn(Hs,zs,e,t);a.layers=this.layers,this.add(a);let c=new Sn(Hs,zs,e,t);c.layers=this.layers,this.add(c);let l=new Sn(Hs,zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,o,s,a,c]=t;for(let l of t)this.remove(l);if(e===fr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xd)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,o),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},nf=class extends _r{constructor(e,t,i,r,o,s,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:ta,super(e,t,i,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},nv=class extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new nf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ui}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Yc(5,5,5),o=new en({name:"CubemapFromEquirect",uniforms:sa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:kn,blending:Vi});o.uniforms.tEquirect.value=t;let s=new pn(r,o),a=t.minFilter;return t.minFilter===Fo&&(t.minFilter=Ui),new tv(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,r){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(o)}},ey=new R,qL=new R,XL=new Ze,vi=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=ey.subVectors(i,t).cross(qL.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(ey),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||XL.getNormalMatrix(e),r=this.coplanarPoint(ey).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ao=new $r,Id=new R,Zc=class{constructor(e=new vi,t=new vi,i=new vi,r=new vi,o=new vi,s=new vi){this.planes=[e,t,i,r,o,s]}set(e,t,i,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fr){let i=this.planes,r=e.elements,o=r[0],s=r[1],a=r[2],c=r[3],l=r[4],u=r[5],d=r[6],f=r[7],h=r[8],g=r[9],y=r[10],m=r[11],p=r[12],E=r[13],S=r[14],v=r[15];if(i[0].setComponents(c-o,f-l,m-h,v-p).normalize(),i[1].setComponents(c+o,f+l,m+h,v+p).normalize(),i[2].setComponents(c+s,f+u,m+g,v+E).normalize(),i[3].setComponents(c-s,f-u,m-g,v-E).normalize(),i[4].setComponents(c-a,f-d,m-y,v-S).normalize(),t===fr)i[5].setComponents(c+a,f+d,m+y,v+S).normalize();else if(t===Xd)i[5].setComponents(a,d,y,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ao.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ao.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ao)}intersectsSprite(e){return Ao.center.set(0,0,0),Ao.radius=.7071067811865476,Ao.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ao)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Id.x=r.normal.x>0?e.max.x:e.min.x,Id.y=r.normal.y>0?e.max.y:e.min.y,Id.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Id)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function mw(){let n=null,e=!1,t=null,i=null;function r(o,s){t(o,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function YL(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],y=d[h];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,d[f]=y)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let y=d[h];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function s(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:o,update:s}}var rf=class n extends In{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],y=[],m=[];for(let p=0;p<u;p++){let E=p*f-s;for(let S=0;S<l;S++){let v=S*d-o;g.push(v,-E,0),y.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let S=E+l*p,v=E+l*(p+1),D=E+1+l*(p+1),T=E+1+l*p;h.push(S,v,T),h.push(v,D,T)}this.setIndex(h),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(y,3)),this.setAttribute("uv",new Kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},ZL=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,KL=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,JL=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,QL=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eO=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tO=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nO=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,iO=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rO=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,oO=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sO=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,aO=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cO=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lO=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,uO=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,dO=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,fO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pO=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mO=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vO=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_O=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xO=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,MO=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bO=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,EO=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,SO=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wO=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TO="gl_FragColor = linearToOutputTexel( gl_FragColor );",CO=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,DO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,AO=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,IO=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,RO=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,NO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,PO=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,LO=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,OO=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,FO=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kO=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,UO=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,BO=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VO=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,HO=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zO=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,GO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jO=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,WO=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$O=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qO=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XO=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,YO=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ZO=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,KO=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,JO=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,QO=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eF=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tF=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nF=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iF=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rF=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,oF=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sF=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aF=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cF=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lF=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uF=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dF=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fF=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hF=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pF=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mF=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gF=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yF=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vF=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_F=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xF=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,MF=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bF=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,EF=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,SF=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wF=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TF=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,CF=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DF=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,AF=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IF=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,RF=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,NF=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,PF=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,LF=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,OF=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,FF=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kF=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,UF=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,BF=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VF=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,HF=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zF=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,GF=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jF=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,WF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$F=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,XF=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,YF=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ZF=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JF=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,r2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,o2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,u2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,y2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,x2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,S2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,w2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,C2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:ZL,alphahash_pars_fragment:KL,alphamap_fragment:JL,alphamap_pars_fragment:QL,alphatest_fragment:eO,alphatest_pars_fragment:tO,aomap_fragment:nO,aomap_pars_fragment:iO,batching_pars_vertex:rO,batching_vertex:oO,begin_vertex:sO,beginnormal_vertex:aO,bsdfs:cO,iridescence_fragment:lO,bumpmap_pars_fragment:uO,clipping_planes_fragment:dO,clipping_planes_pars_fragment:fO,clipping_planes_pars_vertex:hO,clipping_planes_vertex:pO,color_fragment:mO,color_pars_fragment:gO,color_pars_vertex:yO,color_vertex:vO,common:_O,cube_uv_reflection_fragment:xO,defaultnormal_vertex:MO,displacementmap_pars_vertex:bO,displacementmap_vertex:EO,emissivemap_fragment:SO,emissivemap_pars_fragment:wO,colorspace_fragment:TO,colorspace_pars_fragment:CO,envmap_fragment:DO,envmap_common_pars_fragment:AO,envmap_pars_fragment:IO,envmap_pars_vertex:RO,envmap_physical_pars_fragment:zO,envmap_vertex:NO,fog_vertex:PO,fog_pars_vertex:LO,fog_fragment:OO,fog_pars_fragment:FO,gradientmap_pars_fragment:kO,lightmap_pars_fragment:UO,lights_lambert_fragment:BO,lights_lambert_pars_fragment:VO,lights_pars_begin:HO,lights_toon_fragment:GO,lights_toon_pars_fragment:jO,lights_phong_fragment:WO,lights_phong_pars_fragment:$O,lights_physical_fragment:qO,lights_physical_pars_fragment:XO,lights_fragment_begin:YO,lights_fragment_maps:ZO,lights_fragment_end:KO,logdepthbuf_fragment:JO,logdepthbuf_pars_fragment:QO,logdepthbuf_pars_vertex:eF,logdepthbuf_vertex:tF,map_fragment:nF,map_pars_fragment:iF,map_particle_fragment:rF,map_particle_pars_fragment:oF,metalnessmap_fragment:sF,metalnessmap_pars_fragment:aF,morphinstance_vertex:cF,morphcolor_vertex:lF,morphnormal_vertex:uF,morphtarget_pars_vertex:dF,morphtarget_vertex:fF,normal_fragment_begin:hF,normal_fragment_maps:pF,normal_pars_fragment:mF,normal_pars_vertex:gF,normal_vertex:yF,normalmap_pars_fragment:vF,clearcoat_normal_fragment_begin:_F,clearcoat_normal_fragment_maps:xF,clearcoat_pars_fragment:MF,iridescence_pars_fragment:bF,opaque_fragment:EF,packing:SF,premultiplied_alpha_fragment:wF,project_vertex:TF,dithering_fragment:CF,dithering_pars_fragment:DF,roughnessmap_fragment:AF,roughnessmap_pars_fragment:IF,shadowmap_pars_fragment:RF,shadowmap_pars_vertex:NF,shadowmap_vertex:PF,shadowmask_pars_fragment:LF,skinbase_vertex:OF,skinning_pars_vertex:FF,skinning_vertex:kF,skinnormal_vertex:UF,specularmap_fragment:BF,specularmap_pars_fragment:VF,tonemapping_fragment:HF,tonemapping_pars_fragment:zF,transmission_fragment:GF,transmission_pars_fragment:jF,uv_pars_fragment:WF,uv_pars_vertex:$F,uv_vertex:qF,worldpos_vertex:XF,background_vert:YF,background_frag:ZF,backgroundCube_vert:KF,backgroundCube_frag:JF,cube_vert:QF,cube_frag:e2,depth_vert:t2,depth_frag:n2,distanceRGBA_vert:i2,distanceRGBA_frag:r2,equirect_vert:o2,equirect_frag:s2,linedashed_vert:a2,linedashed_frag:c2,meshbasic_vert:l2,meshbasic_frag:u2,meshlambert_vert:d2,meshlambert_frag:f2,meshmatcap_vert:h2,meshmatcap_frag:p2,meshnormal_vert:m2,meshnormal_frag:g2,meshphong_vert:y2,meshphong_frag:v2,meshphysical_vert:_2,meshphysical_frag:x2,meshtoon_vert:M2,meshtoon_frag:b2,points_vert:E2,points_frag:S2,shadow_vert:w2,shadow_frag:T2,sprite_vert:C2,sprite_frag:D2},he={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ki={basic:{uniforms:Dn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Dn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Oe(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Dn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Dn([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Dn([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Oe(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Dn([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Dn([he.points,he.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Dn([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Dn([he.common,he.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Dn([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Dn([he.sprite,he.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Dn([he.common,he.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Dn([he.lights,he.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};ki.physical={uniforms:Dn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var Rd={r:0,b:0,g:0},Io=new Uo,A2=new Ct;function I2(n,e,t,i,r,o,s){let a=new Oe(0),c=o===!0?0:1,l,u,d=null,f=0,h=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function y(E){let S=!1,v=g(E);v===null?p(a,c):v&&v.isColor&&(p(v,1),S=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,S){let v=g(S);v&&(v.isCubeTexture||v.mapping===Cf)?(u===void 0&&(u=new pn(new Yc(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:sa(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Io.copy(S.backgroundRotation),Io.x*=-1,Io.y*=-1,Io.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Io.y*=-1,Io.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(A2.makeRotationFromEuler(Io)),u.material.toneMapped=st.getTransfer(v.colorSpace)!==vt,(d!==v||f!==v.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,h=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new pn(new rf(2,2),new en({name:"BackgroundMaterial",uniforms:sa(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:Wr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=st.getTransfer(v.colorSpace)!==vt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=v,f=v.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,S){E.getRGB(Rd,pw(n)),i.buffers.color.setClear(Rd.r,Rd.g,Rd.b,S,s)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(a,c)},render:y,addToRenderList:m}}function R2(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),o=r,s=!1;function a(M,A,z,O,G){let q=!1,W=d(O,z,A);o!==W&&(o=W,l(o.object)),q=h(M,O,z,G),q&&g(M,O,z,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(q||s)&&(s=!1,v(M,A,z,O),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,A,z){let O=z.wireframe===!0,G=i[M.id];G===void 0&&(G={},i[M.id]=G);let q=G[A.id];q===void 0&&(q={},G[A.id]=q);let W=q[O];return W===void 0&&(W=f(c()),q[O]=W),W}function f(M){let A=[],z=[],O=[];for(let G=0;G<t;G++)A[G]=0,z[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:z,attributeDivisors:O,object:M,attributes:{},index:null}}function h(M,A,z,O){let G=o.attributes,q=A.attributes,W=0,Y=z.getAttributes();for(let U in Y)if(Y[U].location>=0){let X=G[U],oe=q[U];if(oe===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),X===void 0||X.attribute!==oe||oe&&X.data!==oe.data)return!0;W++}return o.attributesNum!==W||o.index!==O}function g(M,A,z,O){let G={},q=A.attributes,W=0,Y=z.getAttributes();for(let U in Y)if(Y[U].location>=0){let X=q[U];X===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(X=M.instanceColor));let oe={};oe.attribute=X,X&&X.data&&(oe.data=X.data),G[U]=oe,W++}o.attributes=G,o.attributesNum=W,o.index=O}function y(){let M=o.newAttributes;for(let A=0,z=M.length;A<z;A++)M[A]=0}function m(M){p(M,0)}function p(M,A){let z=o.newAttributes,O=o.enabledAttributes,G=o.attributeDivisors;z[M]=1,O[M]===0&&(n.enableVertexAttribArray(M),O[M]=1),G[M]!==A&&(n.vertexAttribDivisor(M,A),G[M]=A)}function E(){let M=o.newAttributes,A=o.enabledAttributes;for(let z=0,O=A.length;z<O;z++)A[z]!==M[z]&&(n.disableVertexAttribArray(z),A[z]=0)}function S(M,A,z,O,G,q,W){W===!0?n.vertexAttribIPointer(M,A,z,G,q):n.vertexAttribPointer(M,A,z,O,G,q)}function v(M,A,z,O){y();let G=O.attributes,q=z.getAttributes(),W=A.defaultAttributeValues;for(let Y in q){let U=q[Y];if(U.location>=0){let k=G[Y];if(k===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(k=M.instanceColor)),k!==void 0){let X=k.normalized,oe=k.itemSize,Ne=e.get(k);if(Ne===void 0)continue;let it=Ne.buffer,$=Ne.type,ne=Ne.bytesPerElement,le=$===n.INT||$===n.UNSIGNED_INT||k.gpuType===Lv;if(k.isInterleavedBufferAttribute){let de=k.data,Pe=de.stride,Be=k.offset;if(de.isInstancedInterleavedBuffer){for(let rt=0;rt<U.locationSize;rt++)p(U.location+rt,de.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let rt=0;rt<U.locationSize;rt++)m(U.location+rt);n.bindBuffer(n.ARRAY_BUFFER,it);for(let rt=0;rt<U.locationSize;rt++)S(U.location+rt,oe/U.locationSize,$,X,Pe*ne,(Be+oe/U.locationSize*rt)*ne,le)}else{if(k.isInstancedBufferAttribute){for(let de=0;de<U.locationSize;de++)p(U.location+de,k.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let de=0;de<U.locationSize;de++)m(U.location+de);n.bindBuffer(n.ARRAY_BUFFER,it);for(let de=0;de<U.locationSize;de++)S(U.location+de,oe/U.locationSize,$,X,oe*ne,oe/U.locationSize*de*ne,le)}}else if(W!==void 0){let X=W[Y];if(X!==void 0)switch(X.length){case 2:n.vertexAttrib2fv(U.location,X);break;case 3:n.vertexAttrib3fv(U.location,X);break;case 4:n.vertexAttrib4fv(U.location,X);break;default:n.vertexAttrib1fv(U.location,X)}}}}E()}function D(){I();for(let M in i){let A=i[M];for(let z in A){let O=A[z];for(let G in O)u(O[G].object),delete O[G];delete A[z]}delete i[M]}}function T(M){if(i[M.id]===void 0)return;let A=i[M.id];for(let z in A){let O=A[z];for(let G in O)u(O[G].object),delete O[G];delete A[z]}delete i[M.id]}function C(M){for(let A in i){let z=i[A];if(z[M.id]===void 0)continue;let O=z[M.id];for(let G in O)u(O[G].object),delete O[G];delete z[M.id]}}function I(){b(),s=!0,o!==r&&(o=r,l(o.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:m,disableUnusedAttributes:E}}function N2(n,e,t){let i;function r(l){i=l}function o(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function s(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)s(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y]*f[y];t.update(g,i,1)}}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function P2(n,e,t,i){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(C){return!(C!==xi&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==mr&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Bi&&!I)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:D,maxSamples:T}}function L2(n){let e=this,t=null,i=0,r=!1,o=!1,s=new vi,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||o&&!m)o?u(null):l();else{let E=o?0:i,S=E*4,v=p.clippingState||null;c.value=v,v=u(g,f,S,h);for(let D=0;D!==S;++D)v[D]=t[D];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=h+y*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=h;S!==y;++S,v+=4)s.copy(d[S]).applyMatrix4(E,a),s.normal.toArray(m,v),m[v+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function O2(n){let e=new WeakMap;function t(s,a){return a===xy?s.mapping=ta:a===My&&(s.mapping=na),s}function i(s){if(s&&s.isTexture){let a=s.mapping;if(a===xy||a===My)if(e.has(s)){let c=e.get(s).texture;return t(c,s.mapping)}else{let c=s.image;if(c&&c.height>0){let l=new nv(c.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){let a=s.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}var aa=class extends tf{constructor(e=-1,t=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=i-e,s=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ys=4,yS=[.125,.215,.35,.446,.526,.582],Lo=20,ty=new aa,vS=new Oe,ny=null,iy=0,ry=0,oy=!1,No=(1+Math.sqrt(5))/2,Gs=1/No,_S=[new R(-No,Gs,0),new R(No,Gs,0),new R(-Gs,0,No),new R(Gs,0,No),new R(0,No,-Gs),new R(0,No,Gs),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],of=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ny=this._renderer.getRenderTarget(),iy=this._renderer.getActiveCubeFace(),ry=this._renderer.getActiveMipmapLevel(),oy=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bS(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=MS(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ny,iy,ry),this._renderer.xr.enabled=oy,e.scissorTest=!1,Nd(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ta||e.mapping===na?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ny=this._renderer.getRenderTarget(),iy=this._renderer.getActiveCubeFace(),ry=this._renderer.getActiveMipmapLevel(),oy=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ui,minFilter:Ui,generateMipmaps:!1,type:Ei,format:xi,colorSpace:ha,depthBuffer:!1},r=xS(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xS(e,t,i);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=F2(o)),this._blurMaterial=k2(o,e,t)}return r}_compileMaterial(e){let t=new pn(this._lodPlanes[0],e);this._renderer.compile(t,ty)}_sceneToCubeUV(e,t,i,r){let a=new Sn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(vS),u.toneMapping=jr,u.autoClear=!1;let h=new qr({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),g=new pn(new Yc,h),y=!1,m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,y=!0):(h.color.copy(vS),y=!0);for(let p=0;p<6;p++){let E=p%3;E===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):E===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let S=this._cubeSize;Nd(r,E*S,p>2?S:0,S,S),u.setRenderTarget(r),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ta||e.mapping===na;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bS()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=MS());let o=r?this._cubemapMaterial:this._equirectMaterial,s=new pn(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let c=this._cubeSize;Nd(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,ty)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let o=1;o<r;o++){let s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=_S[(r-o-1)%_S.length];this._blur(e,o-1,o,s,a)}t.autoClear=i}_blur(e,t,i,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",o),this._halfBlur(s,e,i,i,r,"longitudinal",o)}_halfBlur(e,t,i,r,o,s,a){let c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new pn(this._lodPlanes[r],l),f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*Lo-1),y=o/g,m=isFinite(o)?1+Math.floor(u*y):Lo;m>Lo&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Lo}`);let p=[],E=0;for(let C=0;C<Lo;++C){let I=C/y,b=Math.exp(-I*I/2);p.push(b),C===0?E+=b:C<m&&(E+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-i;let v=this._sizeLods[r],D=3*v*(r>S-Ys?r-S+Ys:0),T=4*(this._cubeSize-v);Nd(t,D,T,3*v,2*v),c.setRenderTarget(t),c.render(d,ty)}};function F2(n){let e=[],t=[],i=[],r=n,o=n-Ys+1+yS.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);t.push(a);let c=1/a;s>n-Ys?c=yS[s-n+Ys-1]:s===0&&(c=0),i.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,y=3,m=2,p=1,E=new Float32Array(y*g*h),S=new Float32Array(m*g*h),v=new Float32Array(p*g*h);for(let T=0;T<h;T++){let C=T%3*2/3-1,I=T>2?0:-1,b=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];E.set(b,y*g*T),S.set(f,m*g*T);let M=[T,T,T,T,T,T];v.set(M,p*g*T)}let D=new In;D.setAttribute("position",new mn(E,y)),D.setAttribute("uv",new mn(S,m)),D.setAttribute("faceIndex",new mn(v,p)),e.push(D),r>Ys&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function xS(n,e,t){let i=new An(n,e,t);return i.texture.mapping=Cf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Nd(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function k2(n,e,t){let i=new Float32Array(Lo),r=new R(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Lo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:zv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function MS(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function bS(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function zv(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function U2(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===xy||c===My,u=c===ta||c===na;if(l||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new of(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let h=a.image;return l&&h&&h.height>0||u&&h&&r(h)?(t===null&&(t=new of(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){let c=a.target;c.removeEventListener("dispose",o);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function B2(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&zc("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function V2(n,e,t,i){let r={},o=new WeakMap;function s(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",s),delete r[f.id];let h=o.get(f);h&&(e.remove(h),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let g in f)e.update(f[g],n.ARRAY_BUFFER);let h=d.morphAttributes;for(let g in h){let y=h[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],n.ARRAY_BUFFER)}}function l(d){let f=[],h=d.index,g=d.attributes.position,y=0;if(h!==null){let E=h.array;y=h.version;for(let S=0,v=E.length;S<v;S+=3){let D=E[S+0],T=E[S+1],C=E[S+2];f.push(D,T,T,C,C,D)}}else if(g!==void 0){let E=g.array;y=g.version;for(let S=0,v=E.length/3-1;S<v;S+=3){let D=S+0,T=S+1,C=S+2;f.push(D,T,T,C,C,D)}}else return;let m=new(fw(f)?ef:Qd)(f,1);m.version=y;let p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){let f=o.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function H2(n,e,t){let i;function r(f){i=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function c(f,h){n.drawElements(i,h,o,f*s),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,o,f*s,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,o,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function d(f,h,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/s,h[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,o,f,0,y,0,g);let p=0;for(let E=0;E<g;E++)p+=h[E]*y[E];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function z2(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=a*(o/3);break;case n.LINES:t.lines+=a*(o/2);break;case n.LINE_STRIP:t.lines+=a*(o-1);break;case n.LINE_LOOP:t.lines+=a*o;break;case n.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function G2(n,e,t){let i=new WeakMap,r=new St;function o(s,a,c){let l=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let M=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var h=M;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],v=0;g===!0&&(v=1),y===!0&&(v=2),m===!0&&(v=3);let D=a.attributes.position.count*v,T=1;D>e.maxTextureSize&&(T=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);let C=new Float32Array(D*T*4*d),I=new Kd(C,D,T,d);I.type=Bi,I.needsUpdate=!0;let b=v*4;for(let A=0;A<d;A++){let z=p[A],O=E[A],G=S[A],q=D*T*4*A;for(let W=0;W<z.count;W++){let Y=W*b;g===!0&&(r.fromBufferAttribute(z,W),C[q+Y+0]=r.x,C[q+Y+1]=r.y,C[q+Y+2]=r.z,C[q+Y+3]=0),y===!0&&(r.fromBufferAttribute(O,W),C[q+Y+4]=r.x,C[q+Y+5]=r.y,C[q+Y+6]=r.z,C[q+Y+7]=0),m===!0&&(r.fromBufferAttribute(G,W),C[q+Y+8]=r.x,C[q+Y+9]=r.y,C[q+Y+10]=r.z,C[q+Y+11]=G.itemSize===4?r.w:1)}}f={count:d,texture:I,size:new xe(D,T)},i.set(a,f),a.addEventListener("dispose",M)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let y=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:o}}function j2(n,e,t,i){let r=new WeakMap;function o(c){let l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function s(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:s}}var sf=class extends _r{constructor(e,t,i,r,o,s,a,c,l,u=Ks){if(u!==Ks&&u!==ra)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ks&&(i=ko),i===void 0&&u===ra&&(i=ia),super(null,r,o,s,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Xn,this.minFilter=c!==void 0?c:Xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},gw=new _r,ES=new sf(1,1),yw=new Kd,vw=new ev,_w=new nf,SS=[],wS=[],TS=new Float32Array(16),CS=new Float32Array(9),DS=new Float32Array(4);function pa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,o=SS[r];if(o===void 0&&(o=new Float32Array(r),SS[r]=o),e!==0){i.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,n[s].toArray(o,a)}return o}function tn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function nn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function If(n,e){let t=wS[e];t===void 0&&(t=new Int32Array(e),wS[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function W2(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;n.uniform2fv(this.addr,e),nn(t,e)}}function q2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;n.uniform3fv(this.addr,e),nn(t,e)}}function X2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;n.uniform4fv(this.addr,e),nn(t,e)}}function Y2(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(tn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,i))return;DS.set(i),n.uniformMatrix2fv(this.addr,!1,DS),nn(t,i)}}function Z2(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(tn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,i))return;CS.set(i),n.uniformMatrix3fv(this.addr,!1,CS),nn(t,i)}}function K2(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(tn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,i))return;TS.set(i),n.uniformMatrix4fv(this.addr,!1,TS),nn(t,i)}}function J2(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Q2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;n.uniform2iv(this.addr,e),nn(t,e)}}function ek(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;n.uniform3iv(this.addr,e),nn(t,e)}}function tk(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;n.uniform4iv(this.addr,e),nn(t,e)}}function nk(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ik(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;n.uniform2uiv(this.addr,e),nn(t,e)}}function rk(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;n.uniform3uiv(this.addr,e),nn(t,e)}}function ok(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;n.uniform4uiv(this.addr,e),nn(t,e)}}function sk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(ES.compareFunction=uw,o=ES):o=gw,t.setTexture2D(e||o,r)}function ak(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||vw,r)}function ck(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||_w,r)}function lk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||yw,r)}function uk(n){switch(n){case 5126:return W2;case 35664:return $2;case 35665:return q2;case 35666:return X2;case 35674:return Y2;case 35675:return Z2;case 35676:return K2;case 5124:case 35670:return J2;case 35667:case 35671:return Q2;case 35668:case 35672:return ek;case 35669:case 35673:return tk;case 5125:return nk;case 36294:return ik;case 36295:return rk;case 36296:return ok;case 35678:case 36198:case 36298:case 36306:case 35682:return sk;case 35679:case 36299:case 36307:return ak;case 35680:case 36300:case 36308:case 36293:return ck;case 36289:case 36303:case 36311:case 36292:return lk}}function dk(n,e){n.uniform1fv(this.addr,e)}function fk(n,e){let t=pa(e,this.size,2);n.uniform2fv(this.addr,t)}function hk(n,e){let t=pa(e,this.size,3);n.uniform3fv(this.addr,t)}function pk(n,e){let t=pa(e,this.size,4);n.uniform4fv(this.addr,t)}function mk(n,e){let t=pa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function gk(n,e){let t=pa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function yk(n,e){let t=pa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function vk(n,e){n.uniform1iv(this.addr,e)}function _k(n,e){n.uniform2iv(this.addr,e)}function xk(n,e){n.uniform3iv(this.addr,e)}function Mk(n,e){n.uniform4iv(this.addr,e)}function bk(n,e){n.uniform1uiv(this.addr,e)}function Ek(n,e){n.uniform2uiv(this.addr,e)}function Sk(n,e){n.uniform3uiv(this.addr,e)}function wk(n,e){n.uniform4uiv(this.addr,e)}function Tk(n,e,t){let i=this.cache,r=e.length,o=If(t,r);tn(i,o)||(n.uniform1iv(this.addr,o),nn(i,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||gw,o[s])}function Ck(n,e,t){let i=this.cache,r=e.length,o=If(t,r);tn(i,o)||(n.uniform1iv(this.addr,o),nn(i,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||vw,o[s])}function Dk(n,e,t){let i=this.cache,r=e.length,o=If(t,r);tn(i,o)||(n.uniform1iv(this.addr,o),nn(i,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||_w,o[s])}function Ak(n,e,t){let i=this.cache,r=e.length,o=If(t,r);tn(i,o)||(n.uniform1iv(this.addr,o),nn(i,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||yw,o[s])}function Ik(n){switch(n){case 5126:return dk;case 35664:return fk;case 35665:return hk;case 35666:return pk;case 35674:return mk;case 35675:return gk;case 35676:return yk;case 5124:case 35670:return vk;case 35667:case 35671:return _k;case 35668:case 35672:return xk;case 35669:case 35673:return Mk;case 5125:return bk;case 36294:return Ek;case 36295:return Sk;case 36296:return wk;case 35678:case 36198:case 36298:case 36306:case 35682:return Tk;case 35679:case 36299:case 36307:return Ck;case 35680:case 36300:case 36308:case 36293:return Dk;case 36289:case 36303:case 36311:case 36292:return Ak}}var iv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=uk(t.type)}},rv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ik(t.type)}},ov=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],i)}}},sy=/(\w+)(\])?(\[|\.)?/g;function AS(n,e){n.seq.push(e),n.map[e.id]=e}function Rk(n,e,t){let i=n.name,r=i.length;for(sy.lastIndex=0;;){let o=sy.exec(i),s=sy.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){AS(t,l===void 0?new iv(a,n,e):new rv(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new ov(a),AS(t,d)),t=d}}}var Qs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);Rk(o,s,this)}}setValue(e,t,i,r){let o=this.map[t];o!==void 0&&o.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function IS(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Nk=37297,Pk=0;function Lk(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;i.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return i.join(`
`)}var RS=new Ze;function Ok(n){st._getMatrix(RS,st.workingColorSpace,n);let e=`mat3( ${RS.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case Df:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function NS(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Lk(n.getShaderSource(e),s)}else return r}function Fk(n,e){let t=Ok(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function kk(n,e){let t;switch(e){case Av:t="Linear";break;case Iv:t="Reinhard";break;case Rv:t="Cineon";break;case el:t="ACESFilmic";break;case Nv:t="AgX";break;case Pv:t="Neutral";break;case eL:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Pd=new R;function Uk(){st.getLuminanceCoefficients(Pd);let n=Pd.x.toFixed(4),e=Pd.y.toFixed(4),t=Pd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bk(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gc).join(`
`)}function Vk(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Hk(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=n.getActiveAttrib(e,r),s=o.name,a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:n.getAttribLocation(e,s),locationSize:a}}return t}function Gc(n){return n!==""}function PS(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function LS(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zk=/^[ \t]*#include +<([\w\d./]+)>/gm;function sv(n){return n.replace(zk,jk)}var Gk=new Map;function jk(n,e){let t=et[e];if(t===void 0){let i=Gk.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sv(t)}var Wk=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function OS(n){return n.replace(Wk,$k)}function $k(n,e,t,i){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function FS(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qk(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===QS?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===PP?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ur&&(e="SHADOWMAP_TYPE_VSM"),e}function Xk(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ta:case na:e="ENVMAP_TYPE_CUBE";break;case Cf:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Yk(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case na:e="ENVMAP_MODE_REFRACTION";break}return e}function Zk(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Dv:e="ENVMAP_BLENDING_MULTIPLY";break;case JP:e="ENVMAP_BLENDING_MIX";break;case QP:e="ENVMAP_BLENDING_ADD";break}return e}function Kk(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Jk(n,e,t,i){let r=n.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,c=qk(t),l=Xk(t),u=Yk(t),d=Zk(t),f=Kk(t),h=Bk(t),g=Vk(o),y=r.createProgram(),m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gc).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gc).join(`
`),p.length>0&&(p+=`
`)):(m=[FS(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gc).join(`
`),p=[FS(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jr?"#define TONE_MAPPING":"",t.toneMapping!==jr?et.tonemapping_pars_fragment:"",t.toneMapping!==jr?kk("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Fk("linearToOutputTexel",t.outputColorSpace),Uk(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gc).join(`
`)),s=sv(s),s=PS(s,t),s=LS(s,t),a=sv(a),a=PS(a,t),a=LS(a,t),s=OS(s),a=OS(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===YE?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===YE?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=E+m+s,v=E+p+a,D=IS(r,r.VERTEX_SHADER,S),T=IS(r,r.FRAGMENT_SHADER,v);r.attachShader(y,D),r.attachShader(y,T),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function C(A){if(n.debug.checkShaderErrors){let z=r.getProgramInfoLog(y).trim(),O=r.getShaderInfoLog(D).trim(),G=r.getShaderInfoLog(T).trim(),q=!0,W=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,D,T);else{let Y=NS(r,D,"vertex"),U=NS(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+z+`
`+Y+`
`+U)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||G==="")&&(W=!1);W&&(A.diagnostics={runnable:q,programLog:z,vertexShader:{log:O,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(D),r.deleteShader(T),I=new Qs(r,y),b=Hk(r,y)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(y,Nk)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Pk++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=T,this}var Qk=0,av=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new cv(e),t.set(e,i)),i}},cv=class{constructor(e){this.id=Qk++,this.code=e,this.usedTimes=0}};function eU(n,e,t,i,r,o,s){let a=new Jd,c=new av,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures,h=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,A,z,O){let G=z.fog,q=O.geometry,W=b.isMeshStandardMaterial?z.environment:null,Y=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),U=Y&&Y.mapping===Cf?Y.image.height:null,k=g[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let X=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,oe=X!==void 0?X.length:0,Ne=0;q.morphAttributes.position!==void 0&&(Ne=1),q.morphAttributes.normal!==void 0&&(Ne=2),q.morphAttributes.color!==void 0&&(Ne=3);let it,$,ne,le;if(k){let _t=ki[k];it=_t.vertexShader,$=_t.fragmentShader}else it=b.vertexShader,$=b.fragmentShader,c.update(b),ne=c.getVertexShaderID(b),le=c.getFragmentShaderID(b);let de=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Be=O.isInstancedMesh===!0,rt=O.isBatchedMesh===!0,kt=!!b.map,ut=!!b.matcap,jt=!!Y,F=!!b.aoMap,Zn=!!b.lightMap,at=!!b.bumpMap,ct=!!b.normalMap,Fe=!!b.displacementMap,Rt=!!b.emissiveMap,Le=!!b.metalnessMap,w=!!b.roughnessMap,_=b.anisotropy>0,B=b.clearcoat>0,J=b.dispersion>0,te=b.iridescence>0,Z=b.sheen>0,Ie=b.transmission>0,me=_&&!!b.anisotropyMap,Me=B&&!!b.clearcoatMap,dt=B&&!!b.clearcoatNormalMap,ie=B&&!!b.clearcoatRoughnessMap,be=te&&!!b.iridescenceMap,ke=te&&!!b.iridescenceThicknessMap,Ue=Z&&!!b.sheenColorMap,Ee=Z&&!!b.sheenRoughnessMap,lt=!!b.specularMap,Ke=!!b.specularColorMap,Dt=!!b.specularIntensityMap,N=Ie&&!!b.transmissionMap,pe=Ie&&!!b.thicknessMap,j=!!b.gradientMap,Q=!!b.alphaMap,_e=b.alphaTest>0,ge=!!b.alphaHash,$e=!!b.extensions,Ut=jr;b.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Ut=n.toneMapping);let gn={shaderID:k,shaderType:b.type,shaderName:b.name,vertexShader:it,fragmentShader:$,defines:b.defines,customVertexShaderID:ne,customFragmentShaderID:le,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:rt,batchingColor:rt&&O._colorsTexture!==null,instancing:Be,instancingColor:Be&&O.instanceColor!==null,instancingMorph:Be&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:de===null?n.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:ha,alphaToCoverage:!!b.alphaToCoverage,map:kt,matcap:ut,envMap:jt,envMapMode:jt&&Y.mapping,envMapCubeUVHeight:U,aoMap:F,lightMap:Zn,bumpMap:at,normalMap:ct,displacementMap:f&&Fe,emissiveMap:Rt,normalMapObjectSpace:ct&&b.normalMapType===rL,normalMapTangentSpace:ct&&b.normalMapType===lw,metalnessMap:Le,roughnessMap:w,anisotropy:_,anisotropyMap:me,clearcoat:B,clearcoatMap:Me,clearcoatNormalMap:dt,clearcoatRoughnessMap:ie,dispersion:J,iridescence:te,iridescenceMap:be,iridescenceThicknessMap:ke,sheen:Z,sheenColorMap:Ue,sheenRoughnessMap:Ee,specularMap:lt,specularColorMap:Ke,specularIntensityMap:Dt,transmission:Ie,transmissionMap:N,thicknessMap:pe,gradientMap:j,opaque:b.transparent===!1&&b.blending===Zs&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:_e,alphaHash:ge,combine:b.combine,mapUv:kt&&y(b.map.channel),aoMapUv:F&&y(b.aoMap.channel),lightMapUv:Zn&&y(b.lightMap.channel),bumpMapUv:at&&y(b.bumpMap.channel),normalMapUv:ct&&y(b.normalMap.channel),displacementMapUv:Fe&&y(b.displacementMap.channel),emissiveMapUv:Rt&&y(b.emissiveMap.channel),metalnessMapUv:Le&&y(b.metalnessMap.channel),roughnessMapUv:w&&y(b.roughnessMap.channel),anisotropyMapUv:me&&y(b.anisotropyMap.channel),clearcoatMapUv:Me&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:dt&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&y(b.sheenRoughnessMap.channel),specularMapUv:lt&&y(b.specularMap.channel),specularColorMapUv:Ke&&y(b.specularColorMap.channel),specularIntensityMapUv:Dt&&y(b.specularIntensityMap.channel),transmissionMapUv:N&&y(b.transmissionMap.channel),thicknessMapUv:pe&&y(b.thicknessMap.channel),alphaMapUv:Q&&y(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ct||_),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(kt||Q),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Pe,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:Ne,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ut,decodeVideoTexture:kt&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===vt,decodeVideoTextureEmissive:Rt&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===vt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===dr,flipSided:b.side===kn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:$e&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&b.extensions.multiDraw===!0||rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return gn.vertexUv1s=l.has(1),gn.vertexUv2s=l.has(2),gn.vertexUv3s=l.has(3),l.clear(),gn}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let A in b.defines)M.push(A),M.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(E(M,b),S(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function E(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){let M=g[b.type],A;if(M){let z=ki[M];A=Xr.clone(z.uniforms)}else A=b.uniforms;return A}function D(b,M){let A;for(let z=0,O=u.length;z<O;z++){let G=u[z];if(G.cacheKey===M){A=G,++A.usedTimes;break}}return A===void 0&&(A=new Jk(n,M,b,o),u.push(A)),A}function T(b){if(--b.usedTimes===0){let M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function C(b){c.remove(b)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:D,releaseProgram:T,releaseShaderCache:C,programs:u,dispose:I}}function tU(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function i(s){n.delete(s)}function r(s,a,c){n.get(s)[a]=c}function o(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:o}}function nU(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function kS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function US(){let n=[],e=0,t=[],i=[],r=[];function o(){e=0,t.length=0,i.length=0,r.length=0}function s(d,f,h,g,y,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=y,p.group=m),e++,p}function a(d,f,h,g,y,m){let p=s(d,f,h,g,y,m);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function c(d,f,h,g,y,m){let p=s(d,f,h,g,y,m);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,f){t.length>1&&t.sort(d||nU),i.length>1&&i.sort(f||kS),r.length>1&&r.sort(f||kS)}function u(){for(let d=e,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:o,push:a,unshift:c,finish:u,sort:l}}function iU(){let n=new WeakMap;function e(i,r){let o=n.get(i),s;return o===void 0?(s=new US,n.set(i,[s])):r>=o.length?(s=new US,o.push(s)):s=o[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function rU(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Oe};break;case"SpotLight":t={position:new R,direction:new R,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function oU(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var sU=0;function aU(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cU(n){let e=new rU,t=oU(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new R);let r=new R,o=new Ct,s=new Ct;function a(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,g=0,y=0,m=0,p=0,E=0,S=0,v=0,D=0,T=0,C=0;l.sort(aU);for(let b=0,M=l.length;b<M;b++){let A=l[b],z=A.color,O=A.intensity,G=A.distance,q=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=z.r*O,d+=z.g*O,f+=z.b*O;else if(A.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(A.sh.coefficients[W],O);C++}else if(A.isDirectionalLight){let W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let Y=A.shadow,U=t.get(A);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,i.directionalShadow[h]=U,i.directionalShadowMap[h]=q,i.directionalShadowMatrix[h]=A.shadow.matrix,E++}i.directional[h]=W,h++}else if(A.isSpotLight){let W=e.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(z).multiplyScalar(O),W.distance=G,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,i.spot[y]=W;let Y=A.shadow;if(A.map&&(i.spotLightMap[D]=A.map,D++,Y.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[y]=Y.matrix,A.castShadow){let U=t.get(A);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,i.spotShadow[y]=U,i.spotShadowMap[y]=q,v++}y++}else if(A.isRectAreaLight){let W=e.get(A);W.color.copy(z).multiplyScalar(O),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=W,m++}else if(A.isPointLight){let W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),W.distance=A.distance,W.decay=A.decay,A.castShadow){let Y=A.shadow,U=t.get(A);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,U.shadowCameraNear=Y.camera.near,U.shadowCameraFar=Y.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=A.shadow.matrix,S++}i.point[g]=W,g++}else if(A.isHemisphereLight){let W=e.get(A);W.skyColor.copy(A.color).multiplyScalar(O),W.groundColor.copy(A.groundColor).multiplyScalar(O),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let I=i.hash;(I.directionalLength!==h||I.pointLength!==g||I.spotLength!==y||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==E||I.numPointShadows!==S||I.numSpotShadows!==v||I.numSpotMaps!==D||I.numLightProbes!==C)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=v+D-T,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,I.directionalLength=h,I.pointLength=g,I.spotLength=y,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=E,I.numPointShadows=S,I.numSpotShadows=v,I.numSpotMaps=D,I.numLightProbes=C,i.version=sU++)}function c(l,u){let d=0,f=0,h=0,g=0,y=0,m=u.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let S=l[p];if(S.isDirectionalLight){let v=i.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(S.isSpotLight){let v=i.spot[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(S.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),s.identity(),o.copy(S.matrixWorld),o.premultiply(m),s.extractRotation(o),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),g++}else if(S.isPointLight){let v=i.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){let v=i.hemi[y];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:i}}function BS(n){let e=new cU(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function o(u){t.push(u)}function s(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:s}}function lU(n){let e=new WeakMap;function t(r,o=0){let s=e.get(r),a;return s===void 0?(a=new BS(n),e.set(r,[a])):o>=s.length?(a=new BS(n),s.push(a)):a=s[o],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var lv=class extends vr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=nL,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},uv=class extends vr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},uU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function fU(n,e,t){let i=new Zc,r=new xe,o=new xe,s=new St,a=new lv({depthPacking:iL}),c=new uv,l={},u=t.maxTextureSize,d={[Wr]:kn,[kn]:Wr,[dr]:dr},f=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:uU,fragmentShader:dU}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new In;g.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new pn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=QS;let p=this.type;this.render=function(T,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=n.getRenderTarget(),M=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),z=n.state;z.setBlending(Vi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let O=p!==ur&&this.type===ur,G=p===ur&&this.type!==ur;for(let q=0,W=T.length;q<W;q++){let Y=T[q],U=Y.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);let k=U.getFrameExtents();if(r.multiply(k),o.copy(U.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/k.x),r.x=o.x*k.x,U.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/k.y),r.y=o.y*k.y,U.mapSize.y=o.y)),U.map===null||O===!0||G===!0){let oe=this.type!==ur?{minFilter:Xn,magFilter:Xn}:{};U.map!==null&&U.map.dispose(),U.map=new An(r.x,r.y,oe),U.map.texture.name=Y.name+".shadowMap",U.camera.updateProjectionMatrix()}n.setRenderTarget(U.map),n.clear();let X=U.getViewportCount();for(let oe=0;oe<X;oe++){let Ne=U.getViewport(oe);s.set(o.x*Ne.x,o.y*Ne.y,o.x*Ne.z,o.y*Ne.w),z.viewport(s),U.updateMatrices(Y,oe),i=U.getFrustum(),v(C,I,U.camera,Y,this.type)}U.isPointLightShadow!==!0&&this.type===ur&&E(U,I),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,A)};function E(T,C){let I=e.update(y);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new An(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,I,f,y,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,I,h,y,null)}function S(T,C,I,b){let M=null,A=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)M=A;else if(M=I.isPointLight===!0?c:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let z=M.uuid,O=C.uuid,G=l[z];G===void 0&&(G={},l[z]=G);let q=G[O];q===void 0&&(q=M.clone(),G[O]=q,C.addEventListener("dispose",D)),M=q}if(M.visible=C.visible,M.wireframe=C.wireframe,b===ur?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:d[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=n.properties.get(M);z.light=I}return M}function v(T,C,I,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===ur)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let O=e.update(T),G=T.material;if(Array.isArray(G)){let q=O.groups;for(let W=0,Y=q.length;W<Y;W++){let U=q[W],k=G[U.materialIndex];if(k&&k.visible){let X=S(T,k,b,M);T.onBeforeShadow(n,T,C,I,O,X,U),n.renderBufferDirect(I,null,O,X,T,U),T.onAfterShadow(n,T,C,I,O,X,U)}}}else if(G.visible){let q=S(T,G,b,M);T.onBeforeShadow(n,T,C,I,O,q,null),n.renderBufferDirect(I,null,O,q,T,null),T.onAfterShadow(n,T,C,I,O,q,null)}}let z=T.children;for(let O=0,G=z.length;O<G;O++)v(z[O],C,I,b,M)}function D(T){T.target.removeEventListener("dispose",D);for(let I in l){let b=l[I],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var hU={[hy]:py,[my]:vy,[gy]:_y,[ea]:yy,[py]:hy,[vy]:my,[_y]:gy,[yy]:ea};function pU(n,e){function t(){let N=!1,pe=new St,j=null,Q=new St(0,0,0,0);return{setMask:function(_e){j!==_e&&!N&&(n.colorMask(_e,_e,_e,_e),j=_e)},setLocked:function(_e){N=_e},setClear:function(_e,ge,$e,Ut,gn){gn===!0&&(_e*=Ut,ge*=Ut,$e*=Ut),pe.set(_e,ge,$e,Ut),Q.equals(pe)===!1&&(n.clearColor(_e,ge,$e,Ut),Q.copy(pe))},reset:function(){N=!1,j=null,Q.set(-1,0,0,0)}}}function i(){let N=!1,pe=!1,j=null,Q=null,_e=null;return{setReversed:function(ge){if(pe!==ge){let $e=e.get("EXT_clip_control");pe?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT);let Ut=_e;_e=null,this.setClear(Ut)}pe=ge},getReversed:function(){return pe},setTest:function(ge){ge?de(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ge){j!==ge&&!N&&(n.depthMask(ge),j=ge)},setFunc:function(ge){if(pe&&(ge=hU[ge]),Q!==ge){switch(ge){case hy:n.depthFunc(n.NEVER);break;case py:n.depthFunc(n.ALWAYS);break;case my:n.depthFunc(n.LESS);break;case ea:n.depthFunc(n.LEQUAL);break;case gy:n.depthFunc(n.EQUAL);break;case yy:n.depthFunc(n.GEQUAL);break;case vy:n.depthFunc(n.GREATER);break;case _y:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Q=ge}},setLocked:function(ge){N=ge},setClear:function(ge){_e!==ge&&(pe&&(ge=1-ge),n.clearDepth(ge),_e=ge)},reset:function(){N=!1,j=null,Q=null,_e=null,pe=!1}}}function r(){let N=!1,pe=null,j=null,Q=null,_e=null,ge=null,$e=null,Ut=null,gn=null;return{setTest:function(_t){N||(_t?de(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(_t){pe!==_t&&!N&&(n.stencilMask(_t),pe=_t)},setFunc:function(_t,ii,Gi){(j!==_t||Q!==ii||_e!==Gi)&&(n.stencilFunc(_t,ii,Gi),j=_t,Q=ii,_e=Gi)},setOp:function(_t,ii,Gi){(ge!==_t||$e!==ii||Ut!==Gi)&&(n.stencilOp(_t,ii,Gi),ge=_t,$e=ii,Ut=Gi)},setLocked:function(_t){N=_t},setClear:function(_t){gn!==_t&&(n.clearStencil(_t),gn=_t)},reset:function(){N=!1,pe=null,j=null,Q=null,_e=null,ge=null,$e=null,Ut=null,gn=null}}}let o=new t,s=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,y=!1,m=null,p=null,E=null,S=null,v=null,D=null,T=null,C=new Oe(0,0,0),I=0,b=!1,M=null,A=null,z=null,O=null,G=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Y=0,U=n.getParameter(n.VERSION);U.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(U)[1]),W=Y>=1):U.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),W=Y>=2);let k=null,X={},oe=n.getParameter(n.SCISSOR_BOX),Ne=n.getParameter(n.VIEWPORT),it=new St().fromArray(oe),$=new St().fromArray(Ne);function ne(N,pe,j,Q){let _e=new Uint8Array(4),ge=n.createTexture();n.bindTexture(N,ge),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let $e=0;$e<j;$e++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(pe+$e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return ge}let le={};le[n.TEXTURE_2D]=ne(n.TEXTURE_2D,n.TEXTURE_2D,1),le[n.TEXTURE_CUBE_MAP]=ne(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[n.TEXTURE_2D_ARRAY]=ne(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),le[n.TEXTURE_3D]=ne(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),de(n.DEPTH_TEST),s.setFunc(ea),at(!1),ct(HE),de(n.CULL_FACE),F(Vi);function de(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Pe(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Be(N,pe){return d[N]!==pe?(n.bindFramebuffer(N,pe),d[N]=pe,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=pe),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function rt(N,pe){let j=h,Q=!1;if(N){j=f.get(pe),j===void 0&&(j=[],f.set(pe,j));let _e=N.textures;if(j.length!==_e.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,$e=_e.length;ge<$e;ge++)j[ge]=n.COLOR_ATTACHMENT0+ge;j.length=_e.length,Q=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,Q=!0);Q&&n.drawBuffers(j)}function kt(N){return g!==N?(n.useProgram(N),g=N,!0):!1}let ut={[Po]:n.FUNC_ADD,[OP]:n.FUNC_SUBTRACT,[FP]:n.FUNC_REVERSE_SUBTRACT};ut[kP]=n.MIN,ut[UP]=n.MAX;let jt={[BP]:n.ZERO,[VP]:n.ONE,[HP]:n.SRC_COLOR,[dy]:n.SRC_ALPHA,[qP]:n.SRC_ALPHA_SATURATE,[WP]:n.DST_COLOR,[GP]:n.DST_ALPHA,[zP]:n.ONE_MINUS_SRC_COLOR,[fy]:n.ONE_MINUS_SRC_ALPHA,[$P]:n.ONE_MINUS_DST_COLOR,[jP]:n.ONE_MINUS_DST_ALPHA,[XP]:n.CONSTANT_COLOR,[YP]:n.ONE_MINUS_CONSTANT_COLOR,[ZP]:n.CONSTANT_ALPHA,[KP]:n.ONE_MINUS_CONSTANT_ALPHA};function F(N,pe,j,Q,_e,ge,$e,Ut,gn,_t){if(N===Vi){y===!0&&(Pe(n.BLEND),y=!1);return}if(y===!1&&(de(n.BLEND),y=!0),N!==LP){if(N!==m||_t!==b){if((p!==Po||v!==Po)&&(n.blendEquation(n.FUNC_ADD),p=Po,v=Po),_t)switch(N){case Zs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $d:n.blendFunc(n.ONE,n.ONE);break;case zE:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case GE:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $d:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case zE:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case GE:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,S=null,D=null,T=null,C.set(0,0,0),I=0,m=N,b=_t}return}_e=_e||pe,ge=ge||j,$e=$e||Q,(pe!==p||_e!==v)&&(n.blendEquationSeparate(ut[pe],ut[_e]),p=pe,v=_e),(j!==E||Q!==S||ge!==D||$e!==T)&&(n.blendFuncSeparate(jt[j],jt[Q],jt[ge],jt[$e]),E=j,S=Q,D=ge,T=$e),(Ut.equals(C)===!1||gn!==I)&&(n.blendColor(Ut.r,Ut.g,Ut.b,gn),C.copy(Ut),I=gn),m=N,b=!1}function Zn(N,pe){N.side===dr?Pe(n.CULL_FACE):de(n.CULL_FACE);let j=N.side===kn;pe&&(j=!j),at(j),N.blending===Zs&&N.transparent===!1?F(Vi):F(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),o.setMask(N.colorWrite);let Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Rt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function at(N){M!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),M=N)}function ct(N){N!==RP?(de(n.CULL_FACE),N!==A&&(N===HE?n.cullFace(n.BACK):N===NP?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),A=N}function Fe(N){N!==z&&(W&&n.lineWidth(N),z=N)}function Rt(N,pe,j){N?(de(n.POLYGON_OFFSET_FILL),(O!==pe||G!==j)&&(n.polygonOffset(pe,j),O=pe,G=j)):Pe(n.POLYGON_OFFSET_FILL)}function Le(N){N?de(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function w(N){N===void 0&&(N=n.TEXTURE0+q-1),k!==N&&(n.activeTexture(N),k=N)}function _(N,pe,j){j===void 0&&(k===null?j=n.TEXTURE0+q-1:j=k);let Q=X[j];Q===void 0&&(Q={type:void 0,texture:void 0},X[j]=Q),(Q.type!==N||Q.texture!==pe)&&(k!==j&&(n.activeTexture(j),k=j),n.bindTexture(N,pe||le[N]),Q.type=N,Q.texture=pe)}function B(){let N=X[k];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ke(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ue(N){it.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),it.copy(N))}function Ee(N){$.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),$.copy(N))}function lt(N,pe){let j=l.get(pe);j===void 0&&(j=new WeakMap,l.set(pe,j));let Q=j.get(N);Q===void 0&&(Q=n.getUniformBlockIndex(pe,N.name),j.set(N,Q))}function Ke(N,pe){let Q=l.get(pe).get(N);c.get(pe)!==Q&&(n.uniformBlockBinding(pe,Q,N.__bindingPointIndex),c.set(pe,Q))}function Dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},k=null,X={},d={},f=new WeakMap,h=[],g=null,y=!1,m=null,p=null,E=null,S=null,v=null,D=null,T=null,C=new Oe(0,0,0),I=0,b=!1,M=null,A=null,z=null,O=null,G=null,it.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:de,disable:Pe,bindFramebuffer:Be,drawBuffers:rt,useProgram:kt,setBlending:F,setMaterial:Zn,setFlipSided:at,setCullFace:ct,setLineWidth:Fe,setPolygonOffset:Rt,setScissorTest:Le,activeTexture:w,bindTexture:_,unbindTexture:B,compressedTexImage2D:J,compressedTexImage3D:te,texImage2D:be,texImage3D:ke,updateUBOMapping:lt,uniformBlockBinding:Ke,texStorage2D:dt,texStorage3D:ie,texSubImage2D:Z,texSubImage3D:Ie,compressedTexSubImage2D:me,compressedTexSubImage3D:Me,scissor:Ue,viewport:Ee,reset:Dt}}function VS(n,e,t,i){let r=mU(i);switch(t){case iw:return n*e;case ow:return n*e;case sw:return n*e*2;case kv:return n*e/r.components*r.byteLength;case Uv:return n*e/r.components*r.byteLength;case aw:return n*e*2/r.components*r.byteLength;case Bv:return n*e*2/r.components*r.byteLength;case rw:return n*e*3/r.components*r.byteLength;case xi:return n*e*4/r.components*r.byteLength;case Vv:return n*e*4/r.components*r.byteLength;case Hd:case zd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Gd:case jd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wy:case Cy:return Math.max(n,16)*Math.max(e,8)/4;case Sy:case Ty:return Math.max(n,8)*Math.max(e,8)/2;case Dy:case Ay:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Iy:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ry:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ny:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Py:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ly:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Oy:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Fy:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ky:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Uy:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case By:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Vy:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Hy:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case zy:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Gy:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case jy:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Wd:case Wy:case $y:return Math.ceil(n/4)*Math.ceil(e/4)*16;case cw:case qy:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xy:case Yy:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mU(n){switch(n){case mr:case ew:return{byteLength:1,components:1};case qc:case tw:case Ei:return{byteLength:2,components:1};case Ov:case Fv:return{byteLength:2,components:4};case ko:case Lv:case Bi:return{byteLength:4,components:1};case nw:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function gU(n,e,t,i,r,o,s){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new xe,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return h?new OffscreenCanvas(w,_):Yd("canvas")}function y(w,_,B){let J=1,te=Le(w);if((te.width>B||te.height>B)&&(J=B/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let Z=Math.floor(J*te.width),Ie=Math.floor(J*te.height);d===void 0&&(d=g(Z,Ie));let me=_?g(Z,Ie):d;return me.width=Z,me.height=Ie,me.getContext("2d").drawImage(w,0,0,Z,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Z+"x"+Ie+")."),me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,_,B,J,te=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Z=_;if(_===n.RED&&(B===n.FLOAT&&(Z=n.R32F),B===n.HALF_FLOAT&&(Z=n.R16F),B===n.UNSIGNED_BYTE&&(Z=n.R8)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.R8UI),B===n.UNSIGNED_SHORT&&(Z=n.R16UI),B===n.UNSIGNED_INT&&(Z=n.R32UI),B===n.BYTE&&(Z=n.R8I),B===n.SHORT&&(Z=n.R16I),B===n.INT&&(Z=n.R32I)),_===n.RG&&(B===n.FLOAT&&(Z=n.RG32F),B===n.HALF_FLOAT&&(Z=n.RG16F),B===n.UNSIGNED_BYTE&&(Z=n.RG8)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RG8UI),B===n.UNSIGNED_SHORT&&(Z=n.RG16UI),B===n.UNSIGNED_INT&&(Z=n.RG32UI),B===n.BYTE&&(Z=n.RG8I),B===n.SHORT&&(Z=n.RG16I),B===n.INT&&(Z=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),B===n.UNSIGNED_INT&&(Z=n.RGB32UI),B===n.BYTE&&(Z=n.RGB8I),B===n.SHORT&&(Z=n.RGB16I),B===n.INT&&(Z=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),B===n.UNSIGNED_INT&&(Z=n.RGBA32UI),B===n.BYTE&&(Z=n.RGBA8I),B===n.SHORT&&(Z=n.RGBA16I),B===n.INT&&(Z=n.RGBA32I)),_===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),_===n.RGBA){let Ie=te?Df:st.getTransfer(J);B===n.FLOAT&&(Z=n.RGBA32F),B===n.HALF_FLOAT&&(Z=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Z=Ie===vt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function v(w,_){let B;return w?_===null||_===ko||_===ia?B=n.DEPTH24_STENCIL8:_===Bi?B=n.DEPTH32F_STENCIL8:_===qc&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ko||_===ia?B=n.DEPTH_COMPONENT24:_===Bi?B=n.DEPTH_COMPONENT32F:_===qc&&(B=n.DEPTH_COMPONENT16),B}function D(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Xn&&w.minFilter!==Ui?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){let _=w.target;_.removeEventListener("dispose",T),I(_),_.isVideoTexture&&u.delete(_)}function C(w){let _=w.target;_.removeEventListener("dispose",C),M(_)}function I(w){let _=i.get(w);if(_.__webglInit===void 0)return;let B=w.source,J=f.get(B);if(J){let te=J[_.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(w),Object.keys(J).length===0&&f.delete(B)}i.remove(w)}function b(w){let _=i.get(w);n.deleteTexture(_.__webglTexture);let B=w.source,J=f.get(B);delete J[_.__cacheKey],s.memory.textures--}function M(w){let _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(_.__webglFramebuffer[J]))for(let te=0;te<_.__webglFramebuffer[J].length;te++)n.deleteFramebuffer(_.__webglFramebuffer[J][te]);else n.deleteFramebuffer(_.__webglFramebuffer[J]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[J])}else{if(Array.isArray(_.__webglFramebuffer))for(let J=0;J<_.__webglFramebuffer.length;J++)n.deleteFramebuffer(_.__webglFramebuffer[J]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let J=0;J<_.__webglColorRenderbuffer.length;J++)_.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[J]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=w.textures;for(let J=0,te=B.length;J<te;J++){let Z=i.get(B[J]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),s.memory.textures--),i.remove(B[J])}i.remove(w)}let A=0;function z(){A=0}function O(){let w=A;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),A+=1,w}function G(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function q(w,_){let B=i.get(w);if(w.isVideoTexture&&Fe(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){let J=w.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(B,w,_);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function W(w,_){let B=i.get(w);if(w.version>0&&B.__version!==w.version){$(B,w,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function Y(w,_){let B=i.get(w);if(w.version>0&&B.__version!==w.version){$(B,w,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function U(w,_){let B=i.get(w);if(w.version>0&&B.__version!==w.version){ne(B,w,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let k={[by]:n.REPEAT,[Oo]:n.CLAMP_TO_EDGE,[Ey]:n.MIRRORED_REPEAT},X={[Xn]:n.NEAREST,[tL]:n.NEAREST_MIPMAP_NEAREST,[hd]:n.NEAREST_MIPMAP_LINEAR,[Ui]:n.LINEAR,[Pg]:n.LINEAR_MIPMAP_NEAREST,[Fo]:n.LINEAR_MIPMAP_LINEAR},oe={[oL]:n.NEVER,[dL]:n.ALWAYS,[sL]:n.LESS,[uw]:n.LEQUAL,[aL]:n.EQUAL,[uL]:n.GEQUAL,[cL]:n.GREATER,[lL]:n.NOTEQUAL};function Ne(w,_){if(_.type===Bi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ui||_.magFilter===Pg||_.magFilter===hd||_.magFilter===Fo||_.minFilter===Ui||_.minFilter===Pg||_.minFilter===hd||_.minFilter===Fo)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,k[_.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,k[_.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,k[_.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,X[_.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,X[_.minFilter]),_.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,oe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xn||_.minFilter!==hd&&_.minFilter!==Fo||_.type===Bi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function it(w,_){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));let J=_.source,te=f.get(J);te===void 0&&(te={},f.set(J,te));let Z=G(_);if(Z!==w.__cacheKey){te[Z]===void 0&&(te[Z]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,B=!0),te[Z].usedTimes++;let Ie=te[w.__cacheKey];Ie!==void 0&&(te[w.__cacheKey].usedTimes--,Ie.usedTimes===0&&b(_)),w.__cacheKey=Z,w.__webglTexture=te[Z].texture}return B}function $(w,_,B){let J=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=n.TEXTURE_3D);let te=it(w,_),Z=_.source;t.bindTexture(J,w.__webglTexture,n.TEXTURE0+B);let Ie=i.get(Z);if(Z.version!==Ie.__version||te===!0){t.activeTexture(n.TEXTURE0+B);let me=st.getPrimaries(st.workingColorSpace),Me=_.colorSpace===Hr?null:st.getPrimaries(_.colorSpace),dt=_.colorSpace===Hr||me===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let ie=y(_.image,!1,r.maxTextureSize);ie=Rt(_,ie);let be=o.convert(_.format,_.colorSpace),ke=o.convert(_.type),Ue=S(_.internalFormat,be,ke,_.colorSpace,_.isVideoTexture);Ne(J,_);let Ee,lt=_.mipmaps,Ke=_.isVideoTexture!==!0,Dt=Ie.__version===void 0||te===!0,N=Z.dataReady,pe=D(_,ie);if(_.isDepthTexture)Ue=v(_.format===ra,_.type),Dt&&(Ke?t.texStorage2D(n.TEXTURE_2D,1,Ue,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ue,ie.width,ie.height,0,be,ke,null));else if(_.isDataTexture)if(lt.length>0){Ke&&Dt&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,lt[0].width,lt[0].height);for(let j=0,Q=lt.length;j<Q;j++)Ee=lt[j],Ke?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Ee.width,Ee.height,be,ke,Ee.data):t.texImage2D(n.TEXTURE_2D,j,Ue,Ee.width,Ee.height,0,be,ke,Ee.data);_.generateMipmaps=!1}else Ke?(Dt&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,ie.width,ie.height),N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,be,ke,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Ue,ie.width,ie.height,0,be,ke,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ke&&Dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Ue,lt[0].width,lt[0].height,ie.depth);for(let j=0,Q=lt.length;j<Q;j++)if(Ee=lt[j],_.format!==xi)if(be!==null)if(Ke){if(N)if(_.layerUpdates.size>0){let _e=VS(Ee.width,Ee.height,_.format,_.type);for(let ge of _.layerUpdates){let $e=Ee.data.subarray(ge*_e/Ee.data.BYTES_PER_ELEMENT,(ge+1)*_e/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ge,Ee.width,Ee.height,1,be,$e)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,Ee.width,Ee.height,ie.depth,be,Ee.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,Ue,Ee.width,Ee.height,ie.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,Ee.width,Ee.height,ie.depth,be,ke,Ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,Ue,Ee.width,Ee.height,ie.depth,0,be,ke,Ee.data)}else{Ke&&Dt&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,lt[0].width,lt[0].height);for(let j=0,Q=lt.length;j<Q;j++)Ee=lt[j],_.format!==xi?be!==null?Ke?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,Ee.width,Ee.height,be,Ee.data):t.compressedTexImage2D(n.TEXTURE_2D,j,Ue,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Ee.width,Ee.height,be,ke,Ee.data):t.texImage2D(n.TEXTURE_2D,j,Ue,Ee.width,Ee.height,0,be,ke,Ee.data)}else if(_.isDataArrayTexture)if(Ke){if(Dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Ue,ie.width,ie.height,ie.depth),N)if(_.layerUpdates.size>0){let j=VS(ie.width,ie.height,_.format,_.type);for(let Q of _.layerUpdates){let _e=ie.data.subarray(Q*j/ie.data.BYTES_PER_ELEMENT,(Q+1)*j/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,ie.width,ie.height,1,be,ke,_e)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,be,ke,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,ie.width,ie.height,ie.depth,0,be,ke,ie.data);else if(_.isData3DTexture)Ke?(Dt&&t.texStorage3D(n.TEXTURE_3D,pe,Ue,ie.width,ie.height,ie.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,be,ke,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,ie.width,ie.height,ie.depth,0,be,ke,ie.data);else if(_.isFramebufferTexture){if(Dt)if(Ke)t.texStorage2D(n.TEXTURE_2D,pe,Ue,ie.width,ie.height);else{let j=ie.width,Q=ie.height;for(let _e=0;_e<pe;_e++)t.texImage2D(n.TEXTURE_2D,_e,Ue,j,Q,0,be,ke,null),j>>=1,Q>>=1}}else if(lt.length>0){if(Ke&&Dt){let j=Le(lt[0]);t.texStorage2D(n.TEXTURE_2D,pe,Ue,j.width,j.height)}for(let j=0,Q=lt.length;j<Q;j++)Ee=lt[j],Ke?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,be,ke,Ee):t.texImage2D(n.TEXTURE_2D,j,Ue,be,ke,Ee);_.generateMipmaps=!1}else if(Ke){if(Dt){let j=Le(ie);t.texStorage2D(n.TEXTURE_2D,pe,Ue,j.width,j.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,ke,ie)}else t.texImage2D(n.TEXTURE_2D,0,Ue,be,ke,ie);m(_)&&p(J),Ie.__version=Z.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ne(w,_,B){if(_.image.length!==6)return;let J=it(w,_),te=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);let Z=i.get(te);if(te.version!==Z.__version||J===!0){t.activeTexture(n.TEXTURE0+B);let Ie=st.getPrimaries(st.workingColorSpace),me=_.colorSpace===Hr?null:st.getPrimaries(_.colorSpace),Me=_.colorSpace===Hr||Ie===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let dt=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,be=[];for(let Q=0;Q<6;Q++)!dt&&!ie?be[Q]=y(_.image[Q],!0,r.maxCubemapSize):be[Q]=ie?_.image[Q].image:_.image[Q],be[Q]=Rt(_,be[Q]);let ke=be[0],Ue=o.convert(_.format,_.colorSpace),Ee=o.convert(_.type),lt=S(_.internalFormat,Ue,Ee,_.colorSpace),Ke=_.isVideoTexture!==!0,Dt=Z.__version===void 0||J===!0,N=te.dataReady,pe=D(_,ke);Ne(n.TEXTURE_CUBE_MAP,_);let j;if(dt){Ke&&Dt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,lt,ke.width,ke.height);for(let Q=0;Q<6;Q++){j=be[Q].mipmaps;for(let _e=0;_e<j.length;_e++){let ge=j[_e];_.format!==xi?Ue!==null?Ke?N&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,0,0,ge.width,ge.height,Ue,ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,lt,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,0,0,ge.width,ge.height,Ue,Ee,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,lt,ge.width,ge.height,0,Ue,Ee,ge.data)}}}else{if(j=_.mipmaps,Ke&&Dt){j.length>0&&pe++;let Q=Le(be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,lt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ie){Ke?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,be[Q].width,be[Q].height,Ue,Ee,be[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,lt,be[Q].width,be[Q].height,0,Ue,Ee,be[Q].data);for(let _e=0;_e<j.length;_e++){let $e=j[_e].image[Q].image;Ke?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,0,0,$e.width,$e.height,Ue,Ee,$e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,lt,$e.width,$e.height,0,Ue,Ee,$e.data)}}else{Ke?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ue,Ee,be[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,lt,Ue,Ee,be[Q]);for(let _e=0;_e<j.length;_e++){let ge=j[_e];Ke?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,0,0,Ue,Ee,ge.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,lt,Ue,Ee,ge.image[Q])}}}m(_)&&p(n.TEXTURE_CUBE_MAP),Z.__version=te.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function le(w,_,B,J,te,Z){let Ie=o.convert(B.format,B.colorSpace),me=o.convert(B.type),Me=S(B.internalFormat,Ie,me,B.colorSpace),dt=i.get(_),ie=i.get(B);if(ie.__renderTarget=_,!dt.__hasExternalTextures){let be=Math.max(1,_.width>>Z),ke=Math.max(1,_.height>>Z);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,Me,be,ke,_.depth,0,Ie,me,null):t.texImage2D(te,Z,Me,be,ke,0,Ie,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),ct(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,te,ie.__webglTexture,0,at(_)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,te,ie.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function de(w,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),_.depthBuffer){let J=_.depthTexture,te=J&&J.isDepthTexture?J.type:null,Z=v(_.stencilBuffer,te),Ie=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=at(_);ct(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,Z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ie,n.RENDERBUFFER,w)}else{let J=_.textures;for(let te=0;te<J.length;te++){let Z=J[te],Ie=o.convert(Z.format,Z.colorSpace),me=o.convert(Z.type),Me=S(Z.internalFormat,Ie,me,Z.colorSpace),dt=at(_);B&&ct(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,Me,_.width,_.height):ct(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt,Me,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Me,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(_.depthTexture);J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);let te=J.__webglTexture,Z=at(_);if(_.depthTexture.format===Ks)ct(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(_.depthTexture.format===ra)ct(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Be(w){let _=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let J=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),J){let te=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),_.__depthDisposeCallback=te}_.__boundDepthTexture=J}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pe(_.__webglFramebuffer,w)}else if(B){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]===void 0)_.__webglDepthbuffer[J]=n.createRenderbuffer(),de(_.__webglDepthbuffer[J],w,!1);else{let te=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),de(_.__webglDepthbuffer,w,!1);else{let J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,te)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(w,_,B){let J=i.get(w);_!==void 0&&le(J.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Be(w)}function kt(w){let _=w.texture,B=i.get(w),J=i.get(_);w.addEventListener("dispose",C);let te=w.textures,Z=w.isWebGLCubeRenderTarget===!0,Ie=te.length>1;if(Ie||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=_.version,s.memory.textures++),Z){B.__webglFramebuffer=[];for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[me]=[];for(let Me=0;Me<_.mipmaps.length;Me++)B.__webglFramebuffer[me][Me]=n.createFramebuffer()}else B.__webglFramebuffer[me]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let me=0;me<_.mipmaps.length;me++)B.__webglFramebuffer[me]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Ie)for(let me=0,Me=te.length;me<Me;me++){let dt=i.get(te[me]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),s.memory.textures++)}if(w.samples>0&&ct(w)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let me=0;me<te.length;me++){let Me=te[me];B.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[me]);let dt=o.convert(Me.format,Me.colorSpace),ie=o.convert(Me.type),be=S(Me.internalFormat,dt,ie,Me.colorSpace,w.isXRRenderTarget===!0),ke=at(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,be,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,B.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),de(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,_);for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0)for(let Me=0;Me<_.mipmaps.length;Me++)le(B.__webglFramebuffer[me][Me],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Me);else le(B.__webglFramebuffer[me],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let me=0,Me=te.length;me<Me;me++){let dt=te[me],ie=i.get(dt);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),Ne(n.TEXTURE_2D,dt),le(B.__webglFramebuffer,w,dt,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),m(dt)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,J.__webglTexture),Ne(me,_),_.mipmaps&&_.mipmaps.length>0)for(let Me=0;Me<_.mipmaps.length;Me++)le(B.__webglFramebuffer[Me],w,_,n.COLOR_ATTACHMENT0,me,Me);else le(B.__webglFramebuffer,w,_,n.COLOR_ATTACHMENT0,me,0);m(_)&&p(me),t.unbindTexture()}w.depthBuffer&&Be(w)}function ut(w){let _=w.textures;for(let B=0,J=_.length;B<J;B++){let te=_[B];if(m(te)){let Z=E(w),Ie=i.get(te).__webglTexture;t.bindTexture(Z,Ie),p(Z),t.unbindTexture()}}}let jt=[],F=[];function Zn(w){if(w.samples>0){if(ct(w)===!1){let _=w.textures,B=w.width,J=w.height,te=n.COLOR_BUFFER_BIT,Z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ie=i.get(w),me=_.length>1;if(me)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Me]);let dt=i.get(_[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,dt,0)}n.blitFramebuffer(0,0,B,J,0,0,B,J,te,n.NEAREST),c===!0&&(jt.length=0,F.length=0,jt.push(n.COLOR_ATTACHMENT0+Me),w.depthBuffer&&w.resolveDepthBuffer===!1&&(jt.push(Z),F.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,F)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,jt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Me]);let dt=i.get(_[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,dt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let _=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function at(w){return Math.min(r.maxSamples,w.samples)}function ct(w){let _=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Fe(w){let _=s.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function Rt(w,_){let B=w.colorSpace,J=w.format,te=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==ha&&B!==Hr&&(st.getTransfer(B)===vt?(J!==xi||te!==mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function Le(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=Y,this.setTextureCube=U,this.rebindTextures=rt,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Zn,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ct}function yU(n,e){function t(i,r=Hr){let o,s=st.getTransfer(r);if(i===mr)return n.UNSIGNED_BYTE;if(i===Ov)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fv)return n.UNSIGNED_SHORT_5_5_5_1;if(i===nw)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ew)return n.BYTE;if(i===tw)return n.SHORT;if(i===qc)return n.UNSIGNED_SHORT;if(i===Lv)return n.INT;if(i===ko)return n.UNSIGNED_INT;if(i===Bi)return n.FLOAT;if(i===Ei)return n.HALF_FLOAT;if(i===iw)return n.ALPHA;if(i===rw)return n.RGB;if(i===xi)return n.RGBA;if(i===ow)return n.LUMINANCE;if(i===sw)return n.LUMINANCE_ALPHA;if(i===Ks)return n.DEPTH_COMPONENT;if(i===ra)return n.DEPTH_STENCIL;if(i===kv)return n.RED;if(i===Uv)return n.RED_INTEGER;if(i===aw)return n.RG;if(i===Bv)return n.RG_INTEGER;if(i===Vv)return n.RGBA_INTEGER;if(i===Hd||i===zd||i===Gd||i===jd)if(s===vt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Hd)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zd)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Gd)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jd)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Hd)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zd)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Gd)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jd)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sy||i===wy||i===Ty||i===Cy)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Sy)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wy)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ty)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cy)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dy||i===Ay||i===Iy)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Dy||i===Ay)return s===vt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Iy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ry||i===Ny||i===Py||i===Ly||i===Oy||i===Fy||i===ky||i===Uy||i===By||i===Vy||i===Hy||i===zy||i===Gy||i===jy)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===Ry)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ny)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Py)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ly)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ky)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===By)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===zy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jy)return s===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Wd||i===Wy||i===$y)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===Wd)return s===vt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wy)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$y)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===cw||i===qy||i===Xy||i===Yy)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===Wd)return o.COMPRESSED_RED_RGTC1_EXT;if(i===qy)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xy)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Yy)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ia?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var dv=class extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Gr=class extends Un{constructor(){super(),this.isGroup=!0,this.type="Group"}},vU={type:"move"},$c=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,i),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vU)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},_U=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let r=new _r,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new en({vertexShader:_U,fragmentShader:xU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pn(new rf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hv=class extends gr{constructor(e,t){super();let i=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,y=new fv,m=t.getContextAttributes(),p=null,E=null,S=[],v=[],D=new xe,T=null,C=new Sn;C.viewport=new St;let I=new Sn;I.viewport=new St;let b=[C,I],M=new dv,A=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=S[$];return ne===void 0&&(ne=new $c,S[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=S[$];return ne===void 0&&(ne=new $c,S[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=S[$];return ne===void 0&&(ne=new $c,S[$]=ne),ne.getHandSpace()};function O($){let ne=v.indexOf($.inputSource);if(ne===-1)return;let le=S[ne];le!==void 0&&(le.update($.inputSource,$.frame,l||s),le.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",q);for(let $=0;$<S.length;$++){let ne=v[$];ne!==null&&(v[$]=null,S[$].disconnect(ne))}A=null,z=null,y.reset(),e.setRenderTarget(p),h=null,f=null,d=null,r=null,E=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=function($){return Bt(this,null,function*(){if(r=$,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",G),r.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&(yield t.makeXRCompatible()),T=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){let ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new An(h.framebufferWidth,h.framebufferHeight,{format:xi,type:mr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,le=null,de=null;m.depth&&(de=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?ra:Ks,le=m.stencil?ia:ko);let Pe={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:o};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(Pe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new An(f.textureWidth,f.textureHeight,{format:xi,type:mr,depthTexture:new sf(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=yield r.requestReferenceSpace(a),it.setContext(r),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function q($){for(let ne=0;ne<$.removed.length;ne++){let le=$.removed[ne],de=v.indexOf(le);de>=0&&(v[de]=null,S[de].disconnect(le))}for(let ne=0;ne<$.added.length;ne++){let le=$.added[ne],de=v.indexOf(le);if(de===-1){for(let Be=0;Be<S.length;Be++)if(Be>=v.length){v.push(le),de=Be;break}else if(v[Be]===null){v[Be]=le,de=Be;break}if(de===-1)break}let Pe=S[de];Pe&&Pe.connect(le)}}let W=new R,Y=new R;function U($,ne,le){W.setFromMatrixPosition(ne.matrixWorld),Y.setFromMatrixPosition(le.matrixWorld);let de=W.distanceTo(Y),Pe=ne.projectionMatrix.elements,Be=le.projectionMatrix.elements,rt=Pe[14]/(Pe[10]-1),kt=Pe[14]/(Pe[10]+1),ut=(Pe[9]+1)/Pe[5],jt=(Pe[9]-1)/Pe[5],F=(Pe[8]-1)/Pe[0],Zn=(Be[8]+1)/Be[0],at=rt*F,ct=rt*Zn,Fe=de/(-F+Zn),Rt=Fe*-F;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Rt),$.translateZ(Fe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pe[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let Le=rt+Fe,w=kt+Fe,_=at-Rt,B=ct+(de-Rt),J=ut*kt/w*Le,te=jt*kt/w*Le;$.projectionMatrix.makePerspective(_,B,J,te,Le,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function k($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ne=$.near,le=$.far;y.texture!==null&&(y.depthNear>0&&(ne=y.depthNear),y.depthFar>0&&(le=y.depthFar)),M.near=I.near=C.near=ne,M.far=I.far=C.far=le,(A!==M.near||z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),A=M.near,z=M.far),C.layers.mask=$.layers.mask|2,I.layers.mask=$.layers.mask|4,M.layers.mask=C.layers.mask|I.layers.mask;let de=$.parent,Pe=M.cameras;k(M,de);for(let Be=0;Be<Pe.length;Be++)k(Pe[Be],de);Pe.length===2?U(M,C,I):M.projectionMatrix.copy(C.projectionMatrix),X($,M,de)};function X($,ne,le){le===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(le.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Xc*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=$)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(M)};let oe=null;function Ne($,ne){if(u=ne.getViewerPose(l||s),g=ne,u!==null){let le=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let de=!1;le.length!==M.cameras.length&&(M.cameras.length=0,de=!0);for(let Be=0;Be<le.length;Be++){let rt=le[Be],kt=null;if(h!==null)kt=h.getViewport(rt);else{let jt=d.getViewSubImage(f,rt);kt=jt.viewport,Be===0&&(e.setRenderTargetTextures(E,jt.colorTexture,f.ignoreDepthValues?void 0:jt.depthStencilTexture),e.setRenderTarget(E))}let ut=b[Be];ut===void 0&&(ut=new Sn,ut.layers.enable(Be),ut.viewport=new St,b[Be]=ut),ut.matrix.fromArray(rt.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(rt.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(kt.x,kt.y,kt.width,kt.height),Be===0&&(M.matrix.copy(ut.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),de===!0&&M.cameras.push(ut)}let Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){let Be=d.getDepthInformation(le[0]);Be&&Be.isValid&&Be.texture&&y.init(e,Be,r.renderState)}}for(let le=0;le<S.length;le++){let de=v[le],Pe=S[le];de!==null&&Pe!==void 0&&Pe.update(de,ne,l||s)}oe&&oe($,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}let it=new mw;it.setAnimationLoop(Ne),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}},Ro=new Uo,MU=new Ct;function bU(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,pw(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,E,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),y(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,E,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===kn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===kn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=e.get(p),S=E.envMap,v=E.envMapRotation;S&&(m.envMap.value=S,Ro.copy(v),Ro.x*=-1,Ro.y*=-1,Ro.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ro.y*=-1,Ro.z*=-1),m.envMapRotation.value.setFromMatrix4(MU.makeRotationFromEuler(Ro)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===kn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function EU(n,e,t,i){let r={},o={},s=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){let v=S.program;i.uniformBlockBinding(E,v)}function l(E,S){let v=r[E.id];v===void 0&&(g(E),v=u(E),r[E.id]=v,E.addEventListener("dispose",m));let D=S.program;i.updateUBOMapping(E,D);let T=e.render.frame;o[E.id]!==T&&(f(E),o[E.id]=T)}function u(E){let S=d();E.__bindingPointIndex=S;let v=n.createBuffer(),D=E.__size,T=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,D,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,v),v}function d(){for(let E=0;E<a;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let S=r[E.id],v=E.uniforms,D=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let T=0,C=v.length;T<C;T++){let I=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,M=I.length;b<M;b++){let A=I[b];if(h(A,T,b,D)===!0){let z=A.__offset,O=Array.isArray(A.value)?A.value:[A.value],G=0;for(let q=0;q<O.length;q++){let W=O[q],Y=y(W);typeof W=="number"||typeof W=="boolean"?(A.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,z+G,A.__data)):W.isMatrix3?(A.__data[0]=W.elements[0],A.__data[1]=W.elements[1],A.__data[2]=W.elements[2],A.__data[3]=0,A.__data[4]=W.elements[3],A.__data[5]=W.elements[4],A.__data[6]=W.elements[5],A.__data[7]=0,A.__data[8]=W.elements[6],A.__data[9]=W.elements[7],A.__data[10]=W.elements[8],A.__data[11]=0):(W.toArray(A.__data,G),G+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(E,S,v,D){let T=E.value,C=S+"_"+v;if(D[C]===void 0)return typeof T=="number"||typeof T=="boolean"?D[C]=T:D[C]=T.clone(),!0;{let I=D[C];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return D[C]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(E){let S=E.uniforms,v=0,D=16;for(let C=0,I=S.length;C<I;C++){let b=Array.isArray(S[C])?S[C]:[S[C]];for(let M=0,A=b.length;M<A;M++){let z=b[M],O=Array.isArray(z.value)?z.value:[z.value];for(let G=0,q=O.length;G<q;G++){let W=O[G],Y=y(W),U=v%D,k=U%Y.boundary,X=U+k;v+=k,X!==0&&D-X<Y.storage&&(v+=D-X),z.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=v,v+=Y.storage}}}let T=v%D;return T>0&&(v+=D-T),E.__size=v,E.__cache={},this}function y(E){let S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){let S=E.target;S.removeEventListener("dispose",m);let v=s.indexOf(S.__bindingPointIndex);s.splice(v,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete o[S.id]}function p(){for(let E in r)n.deleteBuffer(r[E]);s=[],r={},o={}}return{bind:c,update:l,dispose:p}}var af=class{constructor(e={}){let{canvas:t=DL(),context:i=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=s;let g=new Uint32Array(4),y=new Int32Array(4),m=null,p=null,E=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fn,this.toneMapping=jr,this.toneMappingExposure=1;let v=this,D=!1,T=0,C=0,I=null,b=-1,M=null,A=new St,z=new St,O=null,G=new Oe(0),q=0,W=t.width,Y=t.height,U=1,k=null,X=null,oe=new St(0,0,W,Y),Ne=new St(0,0,W,Y),it=!1,$=new Zc,ne=!1,le=!1,de=new Ct,Pe=new Ct,Be=new R,rt=new St,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ut=!1;function jt(){return I===null?U:1}let F=i;function Zn(x,P){return t.getContext(x,P)}try{let x={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Cv}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",ge,!1),F===null){let P="webgl2";if(F=Zn(P,x),F===null)throw Zn(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let at,ct,Fe,Rt,Le,w,_,B,J,te,Z,Ie,me,Me,dt,ie,be,ke,Ue,Ee,lt,Ke,Dt,N;function pe(){at=new B2(F),at.init(),Ke=new yU(F,at),ct=new P2(F,at,e,Ke),Fe=new pU(F,at),ct.reverseDepthBuffer&&f&&Fe.buffers.depth.setReversed(!0),Rt=new z2(F),Le=new tU,w=new gU(F,at,Fe,Le,ct,Ke,Rt),_=new O2(v),B=new U2(v),J=new YL(F),Dt=new R2(F,J),te=new V2(F,J,Rt,Dt),Z=new j2(F,te,J,Rt),Ue=new G2(F,ct,w),ie=new L2(Le),Ie=new eU(v,_,B,at,ct,Dt,ie),me=new bU(v,Le),Me=new iU,dt=new lU(at),ke=new I2(v,_,B,Fe,Z,h,c),be=new fU(v,Z,ct),N=new EU(F,Rt,ct,Fe),Ee=new N2(F,at,Rt),lt=new H2(F,at,Rt),Rt.programs=Ie.programs,v.capabilities=ct,v.extensions=at,v.properties=Le,v.renderLists=Me,v.shadowMap=be,v.state=Fe,v.info=Rt}pe();let j=new hv(v,F);this.xr=j,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let x=at.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=at.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(x){x!==void 0&&(U=x,this.setSize(W,Y,!1))},this.getSize=function(x){return x.set(W,Y)},this.setSize=function(x,P,V=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=x,Y=P,t.width=Math.floor(x*U),t.height=Math.floor(P*U),V===!0&&(t.style.width=x+"px",t.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(W*U,Y*U).floor()},this.setDrawingBufferSize=function(x,P,V){W=x,Y=P,U=V,t.width=Math.floor(x*V),t.height=Math.floor(P*V),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(A)},this.getViewport=function(x){return x.copy(oe)},this.setViewport=function(x,P,V,H){x.isVector4?oe.set(x.x,x.y,x.z,x.w):oe.set(x,P,V,H),Fe.viewport(A.copy(oe).multiplyScalar(U).round())},this.getScissor=function(x){return x.copy(Ne)},this.setScissor=function(x,P,V,H){x.isVector4?Ne.set(x.x,x.y,x.z,x.w):Ne.set(x,P,V,H),Fe.scissor(z.copy(Ne).multiplyScalar(U).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(x){Fe.setScissorTest(it=x)},this.setOpaqueSort=function(x){k=x},this.setTransparentSort=function(x){X=x},this.getClearColor=function(x){return x.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(x=!0,P=!0,V=!0){let H=0;if(x){let L=!1;if(I!==null){let se=I.texture.format;L=se===Vv||se===Bv||se===Uv}if(L){let se=I.texture.type,ye=se===mr||se===ko||se===qc||se===ia||se===Ov||se===Fv,Ce=ke.getClearColor(),De=ke.getClearAlpha(),Ve=Ce.r,qe=Ce.g,Ae=Ce.b;ye?(g[0]=Ve,g[1]=qe,g[2]=Ae,g[3]=De,F.clearBufferuiv(F.COLOR,0,g)):(y[0]=Ve,y[1]=qe,y[2]=Ae,y[3]=De,F.clearBufferiv(F.COLOR,0,y))}else H|=F.COLOR_BUFFER_BIT}P&&(H|=F.DEPTH_BUFFER_BIT),V&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Me.dispose(),dt.dispose(),Le.dispose(),_.dispose(),B.dispose(),Z.dispose(),Dt.dispose(),N.dispose(),Ie.dispose(),j.dispose(),j.removeEventListener("sessionstart",m0),j.removeEventListener("sessionend",g0),Jr.stop()};function Q(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let x=Rt.autoReset,P=be.enabled,V=be.autoUpdate,H=be.needsUpdate,L=be.type;pe(),Rt.autoReset=x,be.enabled=P,be.autoUpdate=V,be.needsUpdate=H,be.type=L}function ge(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function $e(x){let P=x.target;P.removeEventListener("dispose",$e),Ut(P)}function Ut(x){gn(x),Le.remove(x)}function gn(x){let P=Le.get(x).programs;P!==void 0&&(P.forEach(function(V){Ie.releaseProgram(V)}),x.isShaderMaterial&&Ie.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,V,H,L,se){P===null&&(P=kt);let ye=L.isMesh&&L.matrixWorld.determinant()<0,Ce=iT(x,P,V,H,L);Fe.setMaterial(H,ye);let De=V.index,Ve=1;if(H.wireframe===!0){if(De=te.getWireframeAttribute(V),De===void 0)return;Ve=2}let qe=V.drawRange,Ae=V.attributes.position,ft=qe.start*Ve,At=(qe.start+qe.count)*Ve;se!==null&&(ft=Math.max(ft,se.start*Ve),At=Math.min(At,(se.start+se.count)*Ve)),De!==null?(ft=Math.max(ft,0),At=Math.min(At,De.count)):Ae!=null&&(ft=Math.max(ft,0),At=Math.min(At,Ae.count));let Nt=At-ft;if(Nt<0||Nt===1/0)return;Dt.setup(L,H,Ce,V,De);let Nn,mt=Ee;if(De!==null&&(Nn=J.get(De),mt=lt,mt.setIndex(Nn)),L.isMesh)H.wireframe===!0?(Fe.setLineWidth(H.wireframeLinewidth*jt()),mt.setMode(F.LINES)):mt.setMode(F.TRIANGLES);else if(L.isLine){let Re=H.linewidth;Re===void 0&&(Re=1),Fe.setLineWidth(Re*jt()),L.isLineSegments?mt.setMode(F.LINES):L.isLineLoop?mt.setMode(F.LINE_LOOP):mt.setMode(F.LINE_STRIP)}else L.isPoints?mt.setMode(F.POINTS):L.isSprite&&mt.setMode(F.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)mt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))mt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let Re=L._multiDrawStarts,ji=L._multiDrawCounts,gt=L._multiDrawCount,ri=De?J.get(De).bytesPerElement:1,Zo=Le.get(H).currentProgram.getUniforms();for(let Hn=0;Hn<gt;Hn++)Zo.setValue(F,"_gl_DrawID",Hn),mt.render(Re[Hn]/ri,ji[Hn])}else if(L.isInstancedMesh)mt.renderInstances(ft,Nt,L.count);else if(V.isInstancedBufferGeometry){let Re=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ji=Math.min(V.instanceCount,Re);mt.renderInstances(ft,Nt,ji)}else mt.render(ft,Nt)};function _t(x,P,V){x.transparent===!0&&x.side===dr&&x.forceSinglePass===!1?(x.side=kn,x.needsUpdate=!0,ul(x,P,V),x.side=Wr,x.needsUpdate=!0,ul(x,P,V),x.side=dr):ul(x,P,V)}this.compile=function(x,P,V=null){V===null&&(V=x),p=dt.get(V),p.init(P),S.push(p),V.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(p.pushLight(L),L.castShadow&&p.pushShadow(L))}),x!==V&&x.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(p.pushLight(L),L.castShadow&&p.pushShadow(L))}),p.setupLights();let H=new Set;return x.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let se=L.material;if(se)if(Array.isArray(se))for(let ye=0;ye<se.length;ye++){let Ce=se[ye];_t(Ce,V,L),H.add(Ce)}else _t(se,V,L),H.add(se)}),S.pop(),p=null,H},this.compileAsync=function(x,P,V=null){let H=this.compile(x,P,V);return new Promise(L=>{function se(){if(H.forEach(function(ye){Le.get(ye).currentProgram.isReady()&&H.delete(ye)}),H.size===0){L(x);return}setTimeout(se,10)}at.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let ii=null;function Gi(x){ii&&ii(x)}function m0(){Jr.stop()}function g0(){Jr.start()}let Jr=new mw;Jr.setAnimationLoop(Gi),typeof self<"u"&&Jr.setContext(self),this.setAnimationLoop=function(x){ii=x,j.setAnimationLoop(x),x===null?Jr.stop():Jr.start()},j.addEventListener("sessionstart",m0),j.addEventListener("sessionend",g0),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(P),P=j.getCamera()),x.isScene===!0&&x.onBeforeRender(v,x,P,I),p=dt.get(x,S.length),p.init(P),S.push(p),Pe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),$.setFromProjectionMatrix(Pe),le=this.localClippingEnabled,ne=ie.init(this.clippingPlanes,le),m=Me.get(x,E.length),m.init(),E.push(m),j.enabled===!0&&j.isPresenting===!0){let se=v.xr.getDepthSensingMesh();se!==null&&ih(se,P,-1/0,v.sortObjects)}ih(x,P,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(k,X),ut=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,ut&&ke.addToRenderList(m,x),this.info.render.frame++,ne===!0&&ie.beginShadows();let V=p.state.shadowsArray;be.render(V,x,P),ne===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=m.opaque,L=m.transmissive;if(p.setupLights(),P.isArrayCamera){let se=P.cameras;if(L.length>0)for(let ye=0,Ce=se.length;ye<Ce;ye++){let De=se[ye];v0(H,L,x,De)}ut&&ke.render(x);for(let ye=0,Ce=se.length;ye<Ce;ye++){let De=se[ye];y0(m,x,De,De.viewport)}}else L.length>0&&v0(H,L,x,P),ut&&ke.render(x),y0(m,x,P);I!==null&&(w.updateMultisampleRenderTarget(I),w.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(v,x,P),Dt.resetDefaultState(),b=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],ne===!0&&ie.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function ih(x,P,V,H){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$.intersectsSprite(x)){H&&rt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Pe);let ye=Z.update(x),Ce=x.material;Ce.visible&&m.push(x,ye,Ce,V,rt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||$.intersectsObject(x))){let ye=Z.update(x),Ce=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),rt.copy(x.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),rt.copy(ye.boundingSphere.center)),rt.applyMatrix4(x.matrixWorld).applyMatrix4(Pe)),Array.isArray(Ce)){let De=ye.groups;for(let Ve=0,qe=De.length;Ve<qe;Ve++){let Ae=De[Ve],ft=Ce[Ae.materialIndex];ft&&ft.visible&&m.push(x,ye,ft,V,rt.z,Ae)}}else Ce.visible&&m.push(x,ye,Ce,V,rt.z,null)}}let se=x.children;for(let ye=0,Ce=se.length;ye<Ce;ye++)ih(se[ye],P,V,H)}function y0(x,P,V,H){let L=x.opaque,se=x.transmissive,ye=x.transparent;p.setupLightsView(V),ne===!0&&ie.setGlobalState(v.clippingPlanes,V),H&&Fe.viewport(A.copy(H)),L.length>0&&ll(L,P,V),se.length>0&&ll(se,P,V),ye.length>0&&ll(ye,P,V),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function v0(x,P,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new An(1,1,{generateMipmaps:!0,type:at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float")?Ei:mr,minFilter:Fo,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));let se=p.state.transmissionRenderTarget[H.id],ye=H.viewport||A;se.setSize(ye.z,ye.w);let Ce=v.getRenderTarget();v.setRenderTarget(se),v.getClearColor(G),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),ut&&ke.render(V);let De=v.toneMapping;v.toneMapping=jr;let Ve=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ne===!0&&ie.setGlobalState(v.clippingPlanes,H),ll(x,V,H),w.updateMultisampleRenderTarget(se),w.updateRenderTargetMipmap(se),at.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Ae=0,ft=P.length;Ae<ft;Ae++){let At=P[Ae],Nt=At.object,Nn=At.geometry,mt=At.material,Re=At.group;if(mt.side===dr&&Nt.layers.test(H.layers)){let ji=mt.side;mt.side=kn,mt.needsUpdate=!0,_0(Nt,V,H,Nn,mt,Re),mt.side=ji,mt.needsUpdate=!0,qe=!0}}qe===!0&&(w.updateMultisampleRenderTarget(se),w.updateRenderTargetMipmap(se))}v.setRenderTarget(Ce),v.setClearColor(G,q),Ve!==void 0&&(H.viewport=Ve),v.toneMapping=De}function ll(x,P,V){let H=P.isScene===!0?P.overrideMaterial:null;for(let L=0,se=x.length;L<se;L++){let ye=x[L],Ce=ye.object,De=ye.geometry,Ve=H===null?ye.material:H,qe=ye.group;Ce.layers.test(V.layers)&&_0(Ce,P,V,De,Ve,qe)}}function _0(x,P,V,H,L,se){x.onBeforeRender(v,P,V,H,L,se),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),L.onBeforeRender(v,P,V,H,x,se),L.transparent===!0&&L.side===dr&&L.forceSinglePass===!1?(L.side=kn,L.needsUpdate=!0,v.renderBufferDirect(V,P,H,L,x,se),L.side=Wr,L.needsUpdate=!0,v.renderBufferDirect(V,P,H,L,x,se),L.side=dr):v.renderBufferDirect(V,P,H,L,x,se),x.onAfterRender(v,P,V,H,L,se)}function ul(x,P,V){P.isScene!==!0&&(P=kt);let H=Le.get(x),L=p.state.lights,se=p.state.shadowsArray,ye=L.state.version,Ce=Ie.getParameters(x,L.state,se,P,V),De=Ie.getProgramCacheKey(Ce),Ve=H.programs;H.environment=x.isMeshStandardMaterial?P.environment:null,H.fog=P.fog,H.envMap=(x.isMeshStandardMaterial?B:_).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Ve===void 0&&(x.addEventListener("dispose",$e),Ve=new Map,H.programs=Ve);let qe=Ve.get(De);if(qe!==void 0){if(H.currentProgram===qe&&H.lightsStateVersion===ye)return M0(x,Ce),qe}else Ce.uniforms=Ie.getUniforms(x),x.onBeforeCompile(Ce,v),qe=Ie.acquireProgram(Ce,De),Ve.set(De,qe),H.uniforms=Ce.uniforms;let Ae=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ae.clippingPlanes=ie.uniform),M0(x,Ce),H.needsLights=oT(x),H.lightsStateVersion=ye,H.needsLights&&(Ae.ambientLightColor.value=L.state.ambient,Ae.lightProbe.value=L.state.probe,Ae.directionalLights.value=L.state.directional,Ae.directionalLightShadows.value=L.state.directionalShadow,Ae.spotLights.value=L.state.spot,Ae.spotLightShadows.value=L.state.spotShadow,Ae.rectAreaLights.value=L.state.rectArea,Ae.ltc_1.value=L.state.rectAreaLTC1,Ae.ltc_2.value=L.state.rectAreaLTC2,Ae.pointLights.value=L.state.point,Ae.pointLightShadows.value=L.state.pointShadow,Ae.hemisphereLights.value=L.state.hemi,Ae.directionalShadowMap.value=L.state.directionalShadowMap,Ae.directionalShadowMatrix.value=L.state.directionalShadowMatrix,Ae.spotShadowMap.value=L.state.spotShadowMap,Ae.spotLightMatrix.value=L.state.spotLightMatrix,Ae.spotLightMap.value=L.state.spotLightMap,Ae.pointShadowMap.value=L.state.pointShadowMap,Ae.pointShadowMatrix.value=L.state.pointShadowMatrix),H.currentProgram=qe,H.uniformsList=null,qe}function x0(x){if(x.uniformsList===null){let P=x.currentProgram.getUniforms();x.uniformsList=Qs.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function M0(x,P){let V=Le.get(x);V.outputColorSpace=P.outputColorSpace,V.batching=P.batching,V.batchingColor=P.batchingColor,V.instancing=P.instancing,V.instancingColor=P.instancingColor,V.instancingMorph=P.instancingMorph,V.skinning=P.skinning,V.morphTargets=P.morphTargets,V.morphNormals=P.morphNormals,V.morphColors=P.morphColors,V.morphTargetsCount=P.morphTargetsCount,V.numClippingPlanes=P.numClippingPlanes,V.numIntersection=P.numClipIntersection,V.vertexAlphas=P.vertexAlphas,V.vertexTangents=P.vertexTangents,V.toneMapping=P.toneMapping}function iT(x,P,V,H,L){P.isScene!==!0&&(P=kt),w.resetTextureUnits();let se=P.fog,ye=H.isMeshStandardMaterial?P.environment:null,Ce=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ha,De=(H.isMeshStandardMaterial?B:_).get(H.envMap||ye),Ve=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,qe=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ae=!!V.morphAttributes.position,ft=!!V.morphAttributes.normal,At=!!V.morphAttributes.color,Nt=jr;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Nt=v.toneMapping);let Nn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,mt=Nn!==void 0?Nn.length:0,Re=Le.get(H),ji=p.state.lights;if(ne===!0&&(le===!0||x!==M)){let Kn=x===M&&H.id===b;ie.setState(H,x,Kn)}let gt=!1;H.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==ji.state.version||Re.outputColorSpace!==Ce||L.isBatchedMesh&&Re.batching===!1||!L.isBatchedMesh&&Re.batching===!0||L.isBatchedMesh&&Re.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Re.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Re.instancing===!1||!L.isInstancedMesh&&Re.instancing===!0||L.isSkinnedMesh&&Re.skinning===!1||!L.isSkinnedMesh&&Re.skinning===!0||L.isInstancedMesh&&Re.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Re.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Re.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Re.instancingMorph===!1&&L.morphTexture!==null||Re.envMap!==De||H.fog===!0&&Re.fog!==se||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ie.numPlanes||Re.numIntersection!==ie.numIntersection)||Re.vertexAlphas!==Ve||Re.vertexTangents!==qe||Re.morphTargets!==Ae||Re.morphNormals!==ft||Re.morphColors!==At||Re.toneMapping!==Nt||Re.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,Re.__version=H.version);let ri=Re.currentProgram;gt===!0&&(ri=ul(H,P,L));let Zo=!1,Hn=!1,ba=!1,Pt=ri.getUniforms(),Si=Re.uniforms;if(Fe.useProgram(ri.program)&&(Zo=!0,Hn=!0,ba=!0),H.id!==b&&(b=H.id,Hn=!0),Zo||M!==x){Fe.buffers.depth.getReversed()?(de.copy(x.projectionMatrix),IL(de),RL(de),Pt.setValue(F,"projectionMatrix",de)):Pt.setValue(F,"projectionMatrix",x.projectionMatrix),Pt.setValue(F,"viewMatrix",x.matrixWorldInverse);let xr=Pt.map.cameraPosition;xr!==void 0&&xr.setValue(F,Be.setFromMatrixPosition(x.matrixWorld)),ct.logarithmicDepthBuffer&&Pt.setValue(F,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Pt.setValue(F,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,Hn=!0,ba=!0)}if(L.isSkinnedMesh){Pt.setOptional(F,L,"bindMatrix"),Pt.setOptional(F,L,"bindMatrixInverse");let Kn=L.skeleton;Kn&&(Kn.boneTexture===null&&Kn.computeBoneTexture(),Pt.setValue(F,"boneTexture",Kn.boneTexture,w))}L.isBatchedMesh&&(Pt.setOptional(F,L,"batchingTexture"),Pt.setValue(F,"batchingTexture",L._matricesTexture,w),Pt.setOptional(F,L,"batchingIdTexture"),Pt.setValue(F,"batchingIdTexture",L._indirectTexture,w),Pt.setOptional(F,L,"batchingColorTexture"),L._colorsTexture!==null&&Pt.setValue(F,"batchingColorTexture",L._colorsTexture,w));let Ea=V.morphAttributes;if((Ea.position!==void 0||Ea.normal!==void 0||Ea.color!==void 0)&&Ue.update(L,V,ri),(Hn||Re.receiveShadow!==L.receiveShadow)&&(Re.receiveShadow=L.receiveShadow,Pt.setValue(F,"receiveShadow",L.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Si.envMap.value=De,Si.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&P.environment!==null&&(Si.envMapIntensity.value=P.environmentIntensity),Hn&&(Pt.setValue(F,"toneMappingExposure",v.toneMappingExposure),Re.needsLights&&rT(Si,ba),se&&H.fog===!0&&me.refreshFogUniforms(Si,se),me.refreshMaterialUniforms(Si,H,U,Y,p.state.transmissionRenderTarget[x.id]),Qs.upload(F,x0(Re),Si,w)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Qs.upload(F,x0(Re),Si,w),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Pt.setValue(F,"center",L.center),Pt.setValue(F,"modelViewMatrix",L.modelViewMatrix),Pt.setValue(F,"normalMatrix",L.normalMatrix),Pt.setValue(F,"modelMatrix",L.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Kn=H.uniformsGroups;for(let xr=0,Mr=Kn.length;xr<Mr;xr++){let b0=Kn[xr];N.update(b0,ri),N.bind(b0,ri)}}return ri}function rT(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function oT(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,P,V){Le.get(x.texture).__webglTexture=P,Le.get(x.depthTexture).__webglTexture=V;let H=Le.get(x);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=V===void 0,H.__autoAllocateDepthBuffer||at.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,P){let V=Le.get(x);V.__webglFramebuffer=P,V.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,V=0){I=x,T=P,C=V;let H=!0,L=null,se=!1,ye=!1;if(x){let De=Le.get(x);if(De.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(F.FRAMEBUFFER,null),H=!1;else if(De.__webglFramebuffer===void 0)w.setupRenderTarget(x);else if(De.__hasExternalTextures)w.rebindTextures(x,Le.get(x.texture).__webglTexture,Le.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Ae=x.depthTexture;if(De.__boundDepthTexture!==Ae){if(Ae!==null&&Le.has(Ae)&&(x.width!==Ae.image.width||x.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(x)}}let Ve=x.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ye=!0);let qe=Le.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(qe[P])?L=qe[P][V]:L=qe[P],se=!0):x.samples>0&&w.useMultisampledRTT(x)===!1?L=Le.get(x).__webglMultisampledFramebuffer:Array.isArray(qe)?L=qe[V]:L=qe,A.copy(x.viewport),z.copy(x.scissor),O=x.scissorTest}else A.copy(oe).multiplyScalar(U).floor(),z.copy(Ne).multiplyScalar(U).floor(),O=it;if(Fe.bindFramebuffer(F.FRAMEBUFFER,L)&&H&&Fe.drawBuffers(x,L),Fe.viewport(A),Fe.scissor(z),Fe.setScissorTest(O),se){let De=Le.get(x.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+P,De.__webglTexture,V)}else if(ye){let De=Le.get(x.texture),Ve=P||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,De.__webglTexture,V||0,Ve)}b=-1},this.readRenderTargetPixels=function(x,P,V,H,L,se,ye){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Le.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){Fe.bindFramebuffer(F.FRAMEBUFFER,Ce);try{let De=x.texture,Ve=De.format,qe=De.type;if(!ct.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-H&&V>=0&&V<=x.height-L&&F.readPixels(P,V,H,L,Ke.convert(Ve),Ke.convert(qe),se)}finally{let De=I!==null?Le.get(I).__webglFramebuffer:null;Fe.bindFramebuffer(F.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=function(x,P,V,H,L,se,ye){return Bt(this,null,function*(){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Le.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){let De=x.texture,Ve=De.format,qe=De.type;if(!ct.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=x.width-H&&V>=0&&V<=x.height-L){Fe.bindFramebuffer(F.FRAMEBUFFER,Ce);let Ae=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.bufferData(F.PIXEL_PACK_BUFFER,se.byteLength,F.STREAM_READ),F.readPixels(P,V,H,L,Ke.convert(Ve),Ke.convert(qe),0);let ft=I!==null?Le.get(I).__webglFramebuffer:null;Fe.bindFramebuffer(F.FRAMEBUFFER,ft);let At=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),yield AL(F,At,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,se),F.deleteBuffer(Ae),F.deleteSync(At),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}})},this.copyFramebufferToTexture=function(x,P=null,V=0){x.isTexture!==!0&&(zc("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,x=arguments[1]);let H=Math.pow(2,-V),L=Math.floor(x.image.width*H),se=Math.floor(x.image.height*H),ye=P!==null?P.x:0,Ce=P!==null?P.y:0;w.setTexture2D(x,0),F.copyTexSubImage2D(F.TEXTURE_2D,V,0,0,ye,Ce,L,se),Fe.unbindTexture()},this.copyTextureToTexture=function(x,P,V=null,H=null,L=0){x.isTexture!==!0&&(zc("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,x=arguments[1],P=arguments[2],L=arguments[3]||0,V=null);let se,ye,Ce,De,Ve,qe,Ae,ft,At,Nt=x.isCompressedTexture?x.mipmaps[L]:x.image;V!==null?(se=V.max.x-V.min.x,ye=V.max.y-V.min.y,Ce=V.isBox3?V.max.z-V.min.z:1,De=V.min.x,Ve=V.min.y,qe=V.isBox3?V.min.z:0):(se=Nt.width,ye=Nt.height,Ce=Nt.depth||1,De=0,Ve=0,qe=0),H!==null?(Ae=H.x,ft=H.y,At=H.z):(Ae=0,ft=0,At=0);let Nn=Ke.convert(P.format),mt=Ke.convert(P.type),Re;P.isData3DTexture?(w.setTexture3D(P,0),Re=F.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(w.setTexture2DArray(P,0),Re=F.TEXTURE_2D_ARRAY):(w.setTexture2D(P,0),Re=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,P.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,P.unpackAlignment);let ji=F.getParameter(F.UNPACK_ROW_LENGTH),gt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),ri=F.getParameter(F.UNPACK_SKIP_PIXELS),Zo=F.getParameter(F.UNPACK_SKIP_ROWS),Hn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Nt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Nt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,De),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ve),F.pixelStorei(F.UNPACK_SKIP_IMAGES,qe);let ba=x.isDataArrayTexture||x.isData3DTexture,Pt=P.isDataArrayTexture||P.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){let Si=Le.get(x),Ea=Le.get(P),Kn=Le.get(Si.__renderTarget),xr=Le.get(Ea.__renderTarget);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,Kn.__webglFramebuffer),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,xr.__webglFramebuffer);for(let Mr=0;Mr<Ce;Mr++)ba&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.get(x).__webglTexture,L,qe+Mr),x.isDepthTexture?(Pt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.get(P).__webglTexture,L,At+Mr),F.blitFramebuffer(De,Ve,se,ye,Ae,ft,se,ye,F.DEPTH_BUFFER_BIT,F.NEAREST)):Pt?F.copyTexSubImage3D(Re,L,Ae,ft,At+Mr,De,Ve,se,ye):F.copyTexSubImage2D(Re,L,Ae,ft,At+Mr,De,Ve,se,ye);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Pt?x.isDataTexture||x.isData3DTexture?F.texSubImage3D(Re,L,Ae,ft,At,se,ye,Ce,Nn,mt,Nt.data):P.isCompressedArrayTexture?F.compressedTexSubImage3D(Re,L,Ae,ft,At,se,ye,Ce,Nn,Nt.data):F.texSubImage3D(Re,L,Ae,ft,At,se,ye,Ce,Nn,mt,Nt):x.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,L,Ae,ft,se,ye,Nn,mt,Nt.data):x.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,L,Ae,ft,Nt.width,Nt.height,Nn,Nt.data):F.texSubImage2D(F.TEXTURE_2D,L,Ae,ft,se,ye,Nn,mt,Nt);F.pixelStorei(F.UNPACK_ROW_LENGTH,ji),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,gt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ri),F.pixelStorei(F.UNPACK_SKIP_ROWS,Zo),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Hn),L===0&&P.generateMipmaps&&F.generateMipmap(Re),Fe.unbindTexture()},this.copyTextureToTexture3D=function(x,P,V=null,H=null,L=0){return x.isTexture!==!0&&(zc("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,H=arguments[1]||null,x=arguments[2],P=arguments[3],L=arguments[4]||0),zc('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,P,V,H,L)},this.initRenderTarget=function(x){Le.get(x).__webglFramebuffer===void 0&&w.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?w.setTextureCube(x,0):x.isData3DTexture?w.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?w.setTexture2DArray(x,0):w.setTexture2D(x,0),Fe.unbindTexture()},this.resetState=function(){T=0,C=0,I=null,Fe.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var cf=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},lf=class extends Un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Uo,this.environmentIntensity=1,this.environmentRotation=new Uo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},pv=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ky,this.updateRanges=[],this.version=0,this.uuid=hr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Cn=new R,uf=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=_i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=_i(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=_i(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=_i(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=_i(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),o=bt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Kc=class extends vr{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},js,Oc=new R,Ws=new R,$s=new R,qs=new xe,Fc=new xe,xw=new Ct,Ld=new R,kc=new R,Od=new R,HS=new xe,ay=new xe,zS=new xe,df=class extends Un{constructor(e=new Kc){if(super(),this.isSprite=!0,this.type="Sprite",js===void 0){js=new In;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new pv(t,5);js.setIndex([0,1,2,0,2,3]),js.setAttribute("position",new uf(i,3,0,!1)),js.setAttribute("uv",new uf(i,2,3,!1))}this.geometry=js,this.material=e,this.center=new xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ws.setFromMatrixScale(this.matrixWorld),xw.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$s.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ws.multiplyScalar(-$s.z);let i=this.material.rotation,r,o;i!==0&&(o=Math.cos(i),r=Math.sin(i));let s=this.center;Fd(Ld.set(-.5,-.5,0),$s,s,Ws,r,o),Fd(kc.set(.5,-.5,0),$s,s,Ws,r,o),Fd(Od.set(.5,.5,0),$s,s,Ws,r,o),HS.set(0,0),ay.set(1,0),zS.set(1,1);let a=e.ray.intersectTriangle(Ld,kc,Od,!1,Oc);if(a===null&&(Fd(kc.set(-.5,.5,0),$s,s,Ws,r,o),ay.set(0,1),a=e.ray.intersectTriangle(Ld,Od,kc,!1,Oc),a===null))return;let c=e.ray.origin.distanceTo(Oc);c<e.near||c>e.far||t.push({distance:c,point:Oc.clone(),uv:zr.getInterpolation(Oc,Ld,kc,Od,HS,ay,zS,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Fd(n,e,t,i,r,o){qs.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Fc.x=o*qs.x-r*qs.y,Fc.y=r*qs.x+o*qs.y):Fc.copy(qs),n.copy(e),n.x+=Fc.x,n.y+=Fc.y,n.applyMatrix4(xw)}var mv=class extends _r{constructor(e=null,t=1,i=1,r,o,s,a,c,l=Xn,u=Xn,d,f){super(null,s,a,c,l,u,r,o,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ca=class extends mn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Xs=new Ct,GS=new Ct,kd=[],jS=new yr,SU=new Ct,Uc=new pn,Bc=new $r,ff=class extends pn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ca(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,SU)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xs),jS.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(jS)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xs),Bc.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Bc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=i.length+1,s=e*o+1;for(let a=0;a<i.length;a++)i[a]=r[s+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Uc.geometry=this.geometry,Uc.material=this.material,Uc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bc.copy(this.boundingSphere),Bc.applyMatrix4(i),e.ray.intersectsSphere(Bc)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,Xs),GS.multiplyMatrices(i,Xs),Uc.matrixWorld=GS,Uc.raycast(e,kd);for(let s=0,a=kd.length;s<a;s++){let c=kd[s];c.instanceId=o,c.object=this,t.push(c)}kd.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ca(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new mv(new Float32Array(r*this.count),r,this.count,kv,Bi));let o=this.morphTexture.source.data.data,s=0;for(let l=0;l<i.length;l++)s+=i[l];let a=this.geometry.morphTargetsRelative?1:1-s,c=r*e;o[c]=a,o.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Jc=class extends vr{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hf=new R,pf=new R,WS=new Ct,Vc=new oa,Ud=new $r,cy=new R,$S=new R,gv=class extends Un{constructor(e=new In,t=new Jc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,o=t.count;r<o;r++)hf.fromBufferAttribute(t,r-1),pf.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=hf.distanceTo(pf);e.setAttribute("lineDistance",new Kt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ud.copy(i.boundingSphere),Ud.applyMatrix4(r),Ud.radius+=o,e.ray.intersectsSphere(Ud)===!1)return;WS.copy(r).invert(),Vc.copy(e.ray).applyMatrix4(WS);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let h=Math.max(0,s.start),g=Math.min(u.count,s.start+s.count);for(let y=h,m=g-1;y<m;y+=l){let p=u.getX(y),E=u.getX(y+1),S=Bd(this,e,Vc,c,p,E);S&&t.push(S)}if(this.isLineLoop){let y=u.getX(g-1),m=u.getX(h),p=Bd(this,e,Vc,c,y,m);p&&t.push(p)}}else{let h=Math.max(0,s.start),g=Math.min(f.count,s.start+s.count);for(let y=h,m=g-1;y<m;y+=l){let p=Bd(this,e,Vc,c,y,y+1);p&&t.push(p)}if(this.isLineLoop){let y=Bd(this,e,Vc,c,g-1,h);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function Bd(n,e,t,i,r,o){let s=n.geometry.attributes.position;if(hf.fromBufferAttribute(s,r),pf.fromBufferAttribute(s,o),t.distanceSqToSegment(hf,pf,cy,$S)>i)return;cy.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(cy);if(!(c<e.near||c>e.far))return{distance:c,point:$S.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}var qS=new R,XS=new R,mf=class extends gv{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,o=t.count;r<o;r+=2)qS.fromBufferAttribute(t,r),XS.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+qS.distanceTo(XS);e.setAttribute("lineDistance",new Kt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var gf=class extends _r{constructor(e,t,i,r,o,s,a,c,l){super(e,t,i,r,o,s,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var yf=class n extends In{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let o=[],s=[],a=[],c=[],l=new R,u=new xe;s.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let h=i+d/t*r;l.x=e*Math.cos(h),l.y=e*Math.sin(h),s.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(s[f]/e+1)/2,u.y=(s[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new Kt(s,3)),this.setAttribute("normal",new Kt(a,3)),this.setAttribute("uv",new Kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var vf=class n extends In{constructor(e=1,t=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(s+a,Math.PI),l=0,u=[],d=new R,f=new R,h=[],g=[],y=[],m=[];for(let p=0;p<=i;p++){let E=[],S=p/i,v=0;p===0&&s===0?v=.5/t:p===i&&c===Math.PI&&(v=-.5/t);for(let D=0;D<=t;D++){let T=D/t;d.x=-e*Math.cos(r+T*o)*Math.sin(s+S*a),d.y=e*Math.cos(s+S*a),d.z=e*Math.sin(r+T*o)*Math.sin(s+S*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),m.push(T+v,1-S),E.push(l++)}u.push(E)}for(let p=0;p<i;p++)for(let E=0;E<t;E++){let S=u[p][E+1],v=u[p][E],D=u[p+1][E],T=u[p+1][E+1];(p!==0||s>0)&&h.push(S,v,T),(p!==i-1||c<Math.PI)&&h.push(v,D,T)}this.setIndex(h),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(y,3)),this.setAttribute("uv",new Kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var _f=class extends en{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}};var xf=class extends vr{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new Oe(16777215),this.specular=new Oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lw,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Uo,this.combine=Dv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Vd(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function wU(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var la=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],o=t[i-1];n:{e:{let s;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<o)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=t[++i],e<r)break e}s=t.length;break t}if(!(e>=o)){let a=t[1];e<a&&(i=2,o=a);for(let c=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=o,o=t[--i-1],e>=o)break e}s=i,i=0;break t}break n}for(;i<s;){let a=i+s>>>1;e<t[a]?s=a:i=a+1}if(r=t[i],o=t[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)t[s]=i[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yv=class extends la{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:WE,endingEnd:WE}}intervalChanged_(e,t,i){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case $E:o=e,a=2*t-i;break;case qE:o=r.length-2,a=t+r[o]-r[o+1];break;default:o=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case $E:s=e,c=2*i-t;break;case qE:s=1,c=i+r[1]-r[0];break;default:s=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),y=g*g,m=y*g,p=-f*m+2*f*y-f*g,E=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,S=(-1-h)*m+(1.5+h)*y+.5*g,v=h*m-h*y;for(let D=0;D!==a;++D)o[D]=p*s[u+D]+E*s[l+D]+S*s[c+D]+v*s[d+D];return o}},vv=class extends la{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)o[f]=s[l+f]*d+s[c+f]*u;return o}},_v=class extends la{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bi=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Vd(t,this.TimeBufferType),this.values=Vd(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Vd(e.times,Array),values:Vd(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new _v(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case qd:t=this.InterpolantFactoryMethodDiscrete;break;case Zy:t=this.InterpolantFactoryMethodLinear;break;case Lg:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qd;case this.InterpolantFactoryMethodLinear:return Zy;case this.InterpolantFactoryMethodSmooth:return Lg}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<e;)++o;for(;s!==-1&&i[s]>t;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(s!==null&&s>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,s),e=!1;break}s=c}if(r!==void 0&&wU(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Lg,o=e.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let y=t[d+g];if(y!==t[f+g]||y!==t[h+g]){c=!0;break}}}if(c){if(a!==s){e[s]=e[a];let d=a*i,f=s*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++s}}if(o>0){e[s]=e[o];for(let a=o*i,c=s*i,l=0;l!==i;++l)t[c+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};bi.prototype.TimeBufferType=Float32Array;bi.prototype.ValueBufferType=Float32Array;bi.prototype.DefaultInterpolation=Zy;var Bo=class extends bi{constructor(e,t,i){super(e,t,i)}};Bo.prototype.ValueTypeName="bool";Bo.prototype.ValueBufferType=Array;Bo.prototype.DefaultInterpolation=qd;Bo.prototype.InterpolantFactoryMethodLinear=void 0;Bo.prototype.InterpolantFactoryMethodSmooth=void 0;var xv=class extends bi{};xv.prototype.ValueTypeName="color";var Mv=class extends bi{};Mv.prototype.ValueTypeName="number";var bv=class extends la{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Mi.slerpFlat(o,0,s,l-a,s,l,c);return o}},Mf=class extends bi{InterpolantFactoryMethodLinear(e){return new bv(this.times,this.values,this.getValueSize(),e)}};Mf.prototype.ValueTypeName="quaternion";Mf.prototype.InterpolantFactoryMethodSmooth=void 0;var Vo=class extends bi{constructor(e,t,i){super(e,t,i)}};Vo.prototype.ValueTypeName="string";Vo.prototype.ValueBufferType=Array;Vo.prototype.DefaultInterpolation=qd;Vo.prototype.InterpolantFactoryMethodLinear=void 0;Vo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ev=class extends bi{};Ev.prototype.ValueTypeName="vector";var ua=class extends Un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},bf=class extends ua{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ly=new Ct,YS=new R,ZS=new R,Ef=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;YS.setFromMatrixPosition(e.matrixWorld),t.position.copy(YS),ZS.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ZS),t.updateMatrixWorld(),ly.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ly),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ly)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var KS=new Ct,Hc=new R,uy=new R,Sv=class extends Ef{constructor(){super(new Sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,o=e.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),Hc.setFromMatrixPosition(e.matrixWorld),i.position.copy(Hc),uy.copy(i.position),uy.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(uy),i.updateMatrixWorld(),r.makeTranslation(-Hc.x,-Hc.y,-Hc.z),KS.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(KS)}},Sf=class extends ua{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Sv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},wv=class extends Ef{constructor(){super(new aa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},da=class extends ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.shadow=new wv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wf=class extends ua{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var fa=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=JS(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=JS();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function JS(){return performance.now()}var Gv="\\[\\]\\.:\\/",TU=new RegExp("["+Gv+"]","g"),jv="[^"+Gv+"]",CU="[^"+Gv.replace("\\.","")+"]",DU=/((?:WC+[\/:])*)/.source.replace("WC",jv),AU=/(WCOD+)?/.source.replace("WCOD",CU),IU=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jv),RU=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jv),NU=new RegExp("^"+DU+AU+IU+RU+"$"),PU=["material","materials","bones","map"],Tv=class{constructor(e,t,i){let r=i||qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},qt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(TU,"")}static parseTrackName(t){let i=NU.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},o=r.nodeName&&r.nodeName.lastIndexOf(".");if(o!==void 0&&o!==-1){let s=r.nodeName.substring(o+1);PU.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,o),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(s){for(let a=0;a<s.length;a++){let c=s[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},o=r(t.children);if(o)return o}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)t[i++]=r[o]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,o=i.propertyName,s=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[o];if(a===void 0){let u=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+o+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?c=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(o==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=o;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Tv,n})();qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qt.prototype.GetterByBindingType=[qt.prototype._getValue_direct,qt.prototype._getValue_array,qt.prototype._getValue_arrayElement,qt.prototype._getValue_toArray];qt.prototype.SetterByBindingTypeAndVersioning=[[qt.prototype._setValue_direct,qt.prototype._setValue_direct_setNeedsUpdate,qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_array,qt.prototype._setValue_array_setNeedsUpdate,qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_arrayElement,qt.prototype._setValue_arrayElement_setNeedsUpdate,qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_fromArray,qt.prototype._setValue_fromArray_setNeedsUpdate,qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var O$=new Float32Array(1);var Qc=class{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(En(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Tf=class extends gr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cv}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cv);function LU(n){let e=document.createElement("canvas");e.width=128,e.height=128;let t=e.getContext("2d");if(!t)throw new Error("canvas2d");t.clearRect(0,0,128,128),t.fillStyle="#ffffff",t.textAlign="center",t.textBaseline="middle",t.font="bold 92px system-ui, sans-serif",t.fillText(String(n),64,68);let i=new gf(e);return i.needsUpdate=!0,i}var Nf=4,tl=.34*Nf,OU=.46*Nf,FU=.48*Nf,bw=.42*Nf,nl=3.2,Ew=1.8,Sw=2.4,kU=.92,Wv=new Oe,$v=new Oe,ww=["ring","grid","line","arc","arcAlt"],Yv=.25,Zv=2.5,Tw=.05,ma=1;function UU(n){return Math.min(Zv,Math.max(Yv,n))}var Kv=.05,Jv=2.5,Cw=.05,Qv=1,qv=.17,BU=.06,VU=.98,HU=.07,zU=1.28;function GU(n){return Math.min(Jv,Math.max(Kv,n))}function Xv(n,e,t,i,r){let o=.35+Math.min(1.4,n*.018);if(t==="ring")for(let s=0;s<n;s++){let a=s/Math.max(1,n)*Math.PI*2;i[s].set(e,Math.sin(a)*o,Math.cos(a)*o)}else if(t==="grid"){let s=Math.ceil(Math.sqrt(n)),a=0;for(let c=0;c<s&&a<n;c++)for(let l=0;l<s&&a<n;l++){let u=(c/Math.max(1,s-1)-.5)*2.2,d=(l/Math.max(1,s-1)-.5)*2.2;i[a].set(e,u,d),a++}}else if(t==="line"){let a=Math.max(o*3.5,1.4,.34*Math.max(0,n-1)),c=n>1?a/(n-1):0,l=-((n-1)*.5)*c;for(let u=0;u<n;u++)i[u].set(e,0,l+u*c)}else{let s=t==="arc"?0:Math.PI;for(let a=0;a<n;a++){let c=n<=1?s+Math.PI*.5:s+a/(n-1)*Math.PI;i[a].set(e,Math.sin(c)*o,Math.cos(c)*o)}}if(r!==1)for(let s=0;s<n;s++){let a=i[s];a.set(a.x,a.y*r,a.z*r)}}function jU(n,e,t){let i=[],r=n.length-1;for(let o=0;o<n.length;o++){let s=n[o],a=o*nl,c=[];if(o===0&&s===784)for(let l=0;l<784;l++){let u=l%28,d=27-Math.floor(l/28);c.push(new R(a,(d-13.5)*.12,(u-13.5)*.12))}else if(o===r&&o>0){let l=r*nl+Ew,u=Sw-kU;for(let d=0;d<s;d++){let f=(d-(s-1)*.5)*bw;c.push(new R(l,u,f))}}else{for(let f=0;f<s;f++)c.push(new R);let l=o-1,u=e[l]??"ring",d=t[l]??ma;Xv(s,a,u,c,d)}i.push(c)}return i}function WU(n){return new Array(Math.max(0,n.length-2)).fill("ring")}function $U(n){return new Array(Math.max(0,n.length-2)).fill(ma)}var Rf=class{root=new Gr;meshes=[];edgeLines=[];edgeFromTo=[];edgeWeightScale=[];activationScale=[];dummy=new Un;layerSizes;positions;outputDigitSprites=[];edgeFocusMode="off";edgeFocusActivations=null;edgeFocusThreshold=.22;edgeFocusThresholdFirstLayer=.38;edgeRecentLastWeight=[];edgeRecentDelta=[];edgeRecentAge=[];edgeRecentHighlightT=[];edgeRecentDeltaAbsMin=8e-4;edgeRecentWindow=12;trainPrevActivations=null;trainActStepEps=1e-4;edgeBaseOpacity=[];idleDimmed=!1;inferPredictedDigit=null;inferExpectedDigit=null;hiddenLayouts=[];hiddenLayoutScales=[];activeNeuronMaxScaleMul=Qv;constructor(e){this.layerSizes=[...e],this.hiddenLayouts=WU(this.layerSizes),this.hiddenLayoutScales=$U(this.layerSizes),this.positions=jU(this.layerSizes,this.hiddenLayouts,this.hiddenLayoutScales);let t=new vf(.09,10,8);for(let a=0;a<this.layerSizes.length;a++){let c=this.layerSizes[a],l=new xf({shininess:0,specular:0,emissive:2780159,emissiveIntensity:1.9,toneMapped:!1,vertexColors:!0}),u=new ff(t,l,c);u.instanceMatrix.setUsage(Af);let d=new Float32Array(c*3),f=new ca(d,3);f.setUsage(Af),u.instanceColor=f;let h=this.positions[a];for(let g=0;g<c;g++){this.dummy.position.copy(h[g]);let y=qv;this.dummy.scale.setScalar(y),this.dummy.updateMatrix(),u.setMatrixAt(g,this.dummy.matrix),d[g*3+0]=.18,d[g*3+1]=.5,d[g*3+2]=1}u.instanceMatrix.needsUpdate=!0,f.needsUpdate=!0,this.meshes.push(u),this.activationScale.push(1),this.root.add(u)}for(let a=0;a<this.layerSizes.length-1;a++){let c=this.layerSizes[a],l=this.layerSizes[a+1],u=c*l,d=new Float32Array(u*2*3),f=new Float32Array(u*2*3),h=new Array(u),g=0;for(let D=0;D<l;D++){let T=this.positions[a+1][D];for(let C=0;C<c;C++){let I=this.positions[a][C],b=g*6;d[b+0]=I.x,d[b+1]=I.y,d[b+2]=I.z,d[b+3]=T.x,d[b+4]=T.y,d[b+5]=T.z,f[b+0]=.35,f[b+1]=.35,f[b+2]=.38,f[b+3]=.35,f[b+4]=.35,f[b+5]=.38,h[g]={from:C,to:D},g++}}let y=new In;y.setAttribute("position",new mn(d,3));let m=new mn(f,3);m.setUsage(Af),y.setAttribute("color",m);let p=a===0?.25:.55,E=new Jc({vertexColors:!0,transparent:!0,opacity:p}),S=new mf(y,E);this.edgeLines.push(S),this.edgeBaseOpacity.push(p),this.edgeFromTo.push(h),this.edgeWeightScale.push(0),this.edgeRecentLastWeight.push(new Float32Array(u)),this.edgeRecentDelta.push(new Float32Array(u));let v=new Uint16Array(u);v.fill(this.edgeRecentWindow+1),this.edgeRecentAge.push(v),this.edgeRecentHighlightT.push(new Float32Array(u)),this.root.add(S)}let i=this.layerSizes.length-1,r=this.layerSizes[i],o=i*nl+Ew,s=Sw;for(let a=0;a<r;a++){let c=(a-(r-1)*.5)*bw,l=LU(a),u=new Kc({map:l,transparent:!0,opacity:.16,color:6252400,depthWrite:!1}),d=new df(u);d.position.set(o,s,c),d.scale.setScalar(tl),this.outputDigitSprites.push(d),this.root.add(d)}this.setIdleDim(!0)}setHiddenLayerLayout(e,t){if(e<0||e>=this.hiddenLayouts.length||this.hiddenLayouts[e]===t)return;this.hiddenLayouts[e]=t;let i=e+1,r=this.layerSizes[i],o=i*nl,s=this.hiddenLayoutScales[e]??ma;Xv(r,o,t,this.positions[i],s)}setHiddenLayerLayoutScale(e,t){if(e<0||e>=this.hiddenLayoutScales.length)return;let i=UU(t);if(this.hiddenLayoutScales[e]===i)return;this.hiddenLayoutScales[e]=i;let r=e+1,o=this.layerSizes[r],s=r*nl,a=this.hiddenLayouts[e];Xv(o,s,a,this.positions[r],i)}setActiveNeuronMaxScaleMul(e){let t=GU(e);this.activeNeuronMaxScaleMul!==t&&(this.activeNeuronMaxScaleMul=t)}resetActivationScaling(){for(let e=0;e<this.activationScale.length;e++)this.activationScale[e]=1}setEdgeFocus(e,t){let i=this.edgeFocusMode;if(i!==e&&(e==="trainRecent"||i==="trainRecent"))for(let r=0;r<this.edgeRecentAge.length;r++)this.edgeRecentAge[r].fill(this.edgeRecentWindow+1),this.edgeRecentHighlightT[r].fill(0);this.edgeFocusMode=e,this.edgeFocusActivations=t?t.map(r=>[...r]):null}setInferResult(e,t){this.inferPredictedDigit=e,this.inferExpectedDigit=t}activationStepChanged(e,t,i){if(this.trainPrevActivations===null)return!0;let r=this.trainPrevActivations[e];if(!r||t>=r.length)return!0;let o=Number.isFinite(r[t])?r[t]:0,s=Number.isFinite(i)?i:0;return Math.abs(s-o)>this.trainActStepEps}setIdleDim(e){if(this.idleDimmed===e)return;this.idleDimmed=e;let t=e?.28:1.9;for(let r of this.meshes){let o=r.material;o.emissiveIntensity=t}let i=e?.33:1;for(let r=0;r<this.edgeLines.length;r++){let o=this.edgeLines[r].material;o.opacity=this.edgeBaseOpacity[r]*i}for(let r of this.outputDigitSprites){let o=r.material;o.opacity<=.16&&(o.opacity=e?.05:.16)}}setActivations(e){let t=this.edgeFocusMode==="trainRecent";t||(this.trainPrevActivations=null);for(let i=0;i<this.meshes.length;i++){let r=this.meshes[i],o=this.positions[i],s=e[i];if(!s||s.length!==this.layerSizes[i])continue;let a=r.instanceColor,c=a.array;if(i===this.meshes.length-1){let u=0,d=-1/0;for(let y=0;y<s.length;y++){let m=Number.isFinite(s[y])?s[y]:0;u+=m,m>d&&(d=m)}u/=Math.max(1,s.length);let f=Math.max(1e-6,d-u);for(let y=0;y<s.length;y++){let m=Number.isFinite(s[y])?s[y]:0;if(t&&!this.activationStepChanged(i,y,m)){this.dummy.position.copy(o[y]),this.dummy.scale.setScalar(0),this.dummy.updateMatrix(),r.setMatrixAt(y,this.dummy.matrix),c[y*3+0]=.02,c[y*3+1]=.02,c[y*3+2]=.03;continue}let p=(m-u)/f,E=Math.min(1,Math.max(0,Math.pow(p,.65)));this.dummy.position.copy(o[y]);let S=E<=1e-10?qv:HU+zU*E*this.activeNeuronMaxScaleMul;this.dummy.scale.setScalar(S),this.dummy.updateMatrix(),r.setMatrixAt(y,this.dummy.matrix),c[y*3+0]=.2+.4*E,c[y*3+1]=.45+.4*E,c[y*3+2]=.85+.15*E}let h=0,g=-1/0;for(let y=0;y<s.length;y++){let m=Number.isFinite(s[y])?s[y]:-1/0;m>g&&(g=m,h=y)}for(let y=0;y<this.outputDigitSprites.length;y++){let m=this.outputDigitSprites[y],p=m.material,E=y<s.length&&Number.isFinite(s[y])?s[y]:0;if(t&&!this.activationStepChanged(i,y,E)){p.opacity=0,m.scale.setScalar(1e-4);continue}let S=Math.max(0,Math.min(1,E)),v=Math.pow(S,.48),D=this.idleDimmed,T=D?.042:.075,I=T+((D?.38:.96)-T)*v,b=this.inferPredictedDigit??h,M=this.inferExpectedDigit,A=M!==null&&b!==M,z=tl+(OU-tl)*v*.95,O=tl+(FU-tl)*v*.95;this.edgeFocusMode==="infer"&&A&&y===M?(p.opacity=I,p.color.copy(Wv.setHex(4869976)).lerp($v.setHex(16726832),.2+.8*v),m.scale.setScalar(O)):this.edgeFocusMode==="infer"&&y===b?(p.opacity=I,p.color.copy(Wv.setHex(6252400)).lerp($v.setHex(16763981),.18+.82*v),m.scale.setScalar(z)):(p.opacity=I,p.color.copy(Wv.setHex(6252400)).lerp($v.setHex(15265528),v),m.scale.setScalar(z))}}else{let u=1e-12;for(let f=0;f<s.length;f++){let h=Number.isFinite(s[f])?s[f]:0;h>u&&(u=h)}let d=Math.max(u,1e-6);this.activationScale[i]=d;for(let f=0;f<s.length;f++){let h=Number.isFinite(s[f])?s[f]:0;if(t&&i!==0&&!this.activationStepChanged(i,f,h)){this.dummy.position.copy(o[f]),this.dummy.scale.setScalar(0),this.dummy.updateMatrix(),r.setMatrixAt(f,this.dummy.matrix),c[f*3+0]=.02,c[f*3+1]=.02,c[f*3+2]=.03;continue}let g=Math.max(0,h/d),y=Math.min(1,Math.pow(g,.7));this.dummy.position.copy(o[f]);let m=h<=1e-12?qv:BU+VU*y*this.activeNeuronMaxScaleMul;if(this.dummy.scale.setScalar(m),this.dummy.updateMatrix(),r.setMatrixAt(f,this.dummy.matrix),i===0){let p=.12+.25*y,E=.35+.45*y,S=.8+.2*y,v=y*y;c[f*3+0]=p+(1-p)*v,c[f*3+1]=E+(1-E)*v,c[f*3+2]=S+(1-S)*v}else c[f*3+0]=.12+.25*y,c[f*3+1]=.35+.45*y,c[f*3+2]=.8+.2*y}}r.instanceMatrix.needsUpdate=!0,a.needsUpdate=!0}t&&(this.trainPrevActivations=e.map(i=>[...i]))}setWeights(e){for(let t=0;t<this.edgeLines.length;t++){let i=e[t];if(!i||i.length===0)continue;let r=this.edgeLines[t],o=r.geometry.getAttribute("color"),s=o.array,a=r.geometry.getAttribute("position"),c=a.array,l=this.edgeFromTo[t],u=this.edgeRecentLastWeight[t],d=this.edgeRecentDelta[t],f=1e-12,h=1e-12,g=1e-12,y=this.edgeFocusMode==="infer"&&this.edgeFocusActivations&&this.edgeFocusActivations[t]?this.edgeFocusActivations[t]:null,m=t===0?this.edgeFocusThresholdFirstLayer:this.edgeFocusThreshold;if(this.edgeFocusMode==="infer"&&y!==null&&this.edgeWeightScale[t]>1e-9)for(let v=0;v<l.length;v++){let D=l[v],T=i[D.to][D.from]??0,C=Number.isFinite(T)?T:0;if(D.from<y.length){let I=Number.isFinite(y[D.from])?Math.max(0,y[D.from]):0,b=Math.abs(C)*I;b>h&&(h=b)}}else{for(let T=0;T<i.length;T++)for(let C=0;C<i[T].length;C++){let I=Number.isFinite(i[T][C])?i[T][C]:0,b=Math.abs(I);b>f&&(f=b);let M=T*i[T].length+C,A=Math.abs(I-u[M]);if(d[M]=A,A>g&&(g=A),y&&C<y.length){let z=Number.isFinite(y[C])?Math.max(0,y[C]):0,O=Math.abs(I)*z;O>h&&(h=O)}}let v=this.edgeWeightScale[t],D=v<=0?f:Math.max(f,v*.995);this.edgeWeightScale[t]=Math.max(D,1e-6)}let E=this.edgeRecentAge[t],S=this.edgeRecentHighlightT[t];for(let v=0;v<l.length;v++){let D=l[v],T=i[D.to][D.from]??0,C=Number.isFinite(T)?T:0,I=D.to*i[D.to].length+D.from,b=d[I];this.edgeFocusMode==="trainRecent"&&(g>1e-12&&b>=this.edgeRecentDeltaAbsMin?(E[v]=0,S[v]=Math.min(1,Math.pow(b/g,.52))):E[v]=Math.min(this.edgeRecentWindow+1,(E[v]??0)+1)),u[I]=C;let M=!0,A=1;if(y&&D.from<y.length){let oe=Number.isFinite(y[D.from])?Math.max(0,y[D.from]):0;A=Math.abs(C)*oe/Math.max(1e-9,h),M=A>=m}this.edgeFocusMode==="trainRecent"&&(M=E[v]<=this.edgeRecentWindow);let z=Math.min(1,Math.pow(Math.abs(C)/this.edgeWeightScale[t],.65)),O=y&&M?Math.min(1,Math.max(0,(A-m)/Math.max(1e-9,1-m))):0,G=this.edgeFocusMode==="trainRecent"?M?1:0:y?M?O:0:z,q=0,W=0,Y=0;if(M)if(this.edgeFocusMode==="trainRecent"){let oe=.15+.85*S[v],Ne=1-E[v]/(this.edgeRecentWindow+1),it=Math.pow(Ne,.7);q=.95*oe*it,W=.62*oe*it,Y=.18*oe*it}else C>=0?(q=.25+.75*G,W=.14+.58*G,Y=.07+.16*G):(q=.06+.28*G,W=.22+.48*G,Y=.32+.68*G);else this.edgeFocusMode==="infer"&&(q=.05,W=.07,Y=.09);let U=v*6,k=this.positions[t][D.from],X=this.positions[t+1][D.to];(this.edgeFocusMode==="infer"||this.edgeFocusMode==="trainRecent")&&!M?(c[U+0]=k.x,c[U+1]=k.y,c[U+2]=k.z,c[U+3]=k.x,c[U+4]=k.y,c[U+5]=k.z):(c[U+0]=k.x,c[U+1]=k.y,c[U+2]=k.z,c[U+3]=X.x,c[U+4]=X.y,c[U+5]=X.z),s[U+0]=q,s[U+1]=W,s[U+2]=Y,s[U+3]=q,s[U+4]=W,s[U+5]=Y}a.needsUpdate=!0,o.needsUpdate=!0}}dispose(){for(let e of this.meshes)e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose();for(let e of this.edgeLines)e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose();for(let e of this.outputDigitSprites){let t=e.material;t.map?.dispose(),t.dispose()}}};var Dw={type:"change"},t0={type:"start"},Iw={type:"end"},Pf=new oa,Aw=new vi,qU=Math.cos(70*dw.DEG2RAD),rn=new R,Bn=2*Math.PI,wt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},e0=1e-6,Lf=class extends Tf{constructor(e,t=null){super(e,t),this.state=wt.NONE,this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ho.ROTATE,MIDDLE:Ho.DOLLY,RIGHT:Ho.PAN},this.touches={ONE:zo.ROTATE,TWO:zo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Mi,this._lastTargetPosition=new R,this._quat=new Mi().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qc,this._sphericalDelta=new Qc,this._scale=1,this._panOffset=new R,this._rotateStart=new xe,this._rotateEnd=new xe,this._rotateDelta=new xe,this._panStart=new xe,this._panEnd=new xe,this._panDelta=new xe,this._dollyStart=new xe,this._dollyEnd=new xe,this._dollyDelta=new xe,this._dollyDirection=new R,this._mouse=new xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=YU.bind(this),this._onPointerDown=XU.bind(this),this._onPointerUp=ZU.bind(this),this._onContextMenu=i3.bind(this),this._onMouseWheel=QU.bind(this),this._onKeyDown=e3.bind(this),this._onTouchStart=t3.bind(this),this._onTouchMove=n3.bind(this),this._onMouseDown=KU.bind(this),this._onMouseMove=JU.bind(this),this._interceptControlDown=r3.bind(this),this._interceptControlUp=o3.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dw),this.update(),this.state=wt.NONE}update(e=null){let t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===wt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Bn:i>Math.PI&&(i-=Bn),r<-Math.PI?r+=Bn:r>Math.PI&&(r-=Bn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=s!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){let a=rn.length();s=this._clampDistance(a*this._scale);let c=a-s;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),o=!!c}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=c!==this.object.zoom;let l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),s=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Pf.origin.copy(this.object.position),Pf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pf.direction))<qU?this.object.lookAt(this.target):(Aw.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pf.intersectPlane(Aw,this.target))))}else if(this.object.isOrthographicCamera){let s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>e0||8*(1-this._lastQuaternion.dot(this.object.quaternion))>e0||this._lastTargetPosition.distanceToSquared(this.target)>e0?(this.dispatchEvent(Dw),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bn/60*this.autoRotateSpeed*e:Bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;rn.copy(r).sub(this.target);let o=rn.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/i.clientHeight,this.object.matrix),this._panUp(2*t*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,o=t-i.top,s=i.width,a=i.height;this._mouse.x=r/s*2-1,this._mouse.y=-(o/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Bn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Bn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Bn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Bn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,o=Math.sqrt(i*i+r*r);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),o=.5*(e.pageY+i.y);this._rotateEnd.set(r,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,o=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let s=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(s,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new xe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function XU(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function YU(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function ZU(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Iw),this.state=wt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function KU(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ho.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=wt.DOLLY;break;case Ho.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}break;case Ho.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(t0)}function JU(n){switch(this.state){case wt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case wt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case wt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function QU(n){this.enabled===!1||this.enableZoom===!1||this.state!==wt.NONE||(n.preventDefault(),this.dispatchEvent(t0),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Iw))}function e3(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function t3(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case zo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=wt.TOUCH_ROTATE;break;case zo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=wt.TOUCH_PAN;break;default:this.state=wt.NONE}break;case 2:switch(this.touches.TWO){case zo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=wt.TOUCH_DOLLY_PAN;break;case zo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=wt.TOUCH_DOLLY_ROTATE;break;default:this.state=wt.NONE}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(t0)}function n3(n){switch(this._trackPointer(n),this.state){case wt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case wt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case wt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case wt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=wt.NONE}}function i3(n){this.enabled!==!1&&n.preventDefault()}function r3(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function o3(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Of={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Yn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},s3=new aa(-1,1,1,-1,0,1),n0=class extends In{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}},a3=new n0,Yr=class{constructor(e){this._mesh=new pn(a3,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,s3)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ga=class extends Yn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof en?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Xr.clone(e.uniforms),this.material=new en({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Yr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var il=class extends Yn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let s,a;this.inverse?(s=0,a=1):(s=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),o.buffers.stencil.setFunc(r.ALWAYS,s,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(r.EQUAL,1,4294967295),o.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),o.buffers.stencil.setLocked(!0)}},Ff=class extends Yn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var kf=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new xe);this._width=i.width,this._height=i.height,t=new An(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ei}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ga(Of),this.copyPass.material.blending=Vi,this.clock=new fa}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,o=this.passes.length;r<o;r++){let s=this.passes[r];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),s.needsSwap){if(i){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}il!==void 0&&(s instanceof il?i=!0:s instanceof Ff&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new xe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Uf=class extends Yn{constructor(e,t,i=null,r=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Oe}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let o,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=r}};var Rw={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Bf=class extends Yn{constructor(){super();let e=Rw;this.uniforms=Xr.clone(e.uniforms),this.material=new _f({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Yr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},st.getTransfer(this._outputColorSpace)===vt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Av?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Iv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Rv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===el?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Nv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Pv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Nw={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new xe(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		// FXAA algorithm from NVIDIA, C# implementation by Jasper Flick, GLSL port by Dave Hoskins
		// http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf
		// https://catlikecoding.com/unity/tutorials/advanced-rendering/fxaa/

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;
			
			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {
				
				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );
			
		}`};var Pw={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Oe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ya=class n extends Yn{constructor(e,t,i,r){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new xe(e.x,e.y):new xe(256,256),this.clearColor=new Oe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new An(o,s,{type:Ei}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let f=new An(o,s,{type:Ei});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let h=new An(o,s,{type:Ei});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),o=Math.round(o/2),s=Math.round(s/2)}let a=Pw;this.highPassUniforms=Xr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new en({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let c=[3,5,7,9,11];o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new xe(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let u=Of;this.copyUniforms=Xr.clone(u.uniforms),this.blendMaterial=new en({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:$d,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Oe,this.oldClearAlpha=1,this.basic=new qr,this.fsQuad=new Yr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(i,r),this.renderTargetsVertical[o].setSize(i,r),this.separableBlurMaterials[o].uniforms.invSize.value=new xe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,o){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){let t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new en({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new xe(.5,.5)},direction:{value:new xe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new en({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};ya.BlurDirectionX=new xe(1,0);ya.BlurDirectionY=new xe(0,1);function Lw(n){let e=new lf;e.background=new Oe(2765120),e.fog=new cf(2765120,12,40);let t=new Sn(55,Math.max(1,n.clientWidth)/Math.max(1,n.clientHeight),.1,200);t.position.set(-8,4,4);let i=new af({antialias:!0,alpha:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(n.clientWidth,n.clientHeight),i.outputColorSpace=Fn,i.toneMapping=el,i.toneMappingExposure=1.35;let r=new bf(14082815,4937320,1.7);e.add(r);let o=new wf(16777215,.95);e.add(o);let s=new da(16775151,2.8);s.position.set(7,10,8),e.add(s);let a=new da(11453439,1.6);a.position.set(-6,4,-3),e.add(a);let c=new da(10350847,1.2);c.position.set(-2,7,12),e.add(c);let l=new Sf(6280191,14,24,2);l.position.set(-4,3,-10),e.add(l);let u=new pn(new yf(60,96),new qr({color:4015704}));u.rotation.x=-Math.PI/2,u.position.y=-3.2,e.add(u);let d=new Lf(t,i.domElement);d.enableDamping=!0,d.target.set(4,0,0);let f=new Set(["KeyW","KeyS","KeyA","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),h=new Set,g=new fa,y=new R,m=new R,p=new R,E=12,S=k=>k instanceof HTMLElement&&k.closest("input, textarea, [contenteditable='true']")!==null,v=k=>{!f.has(k.code)||S(k.target)||(h.add(k.code),k.preventDefault())},D=k=>{f.has(k.code)&&(h.delete(k.code),k.preventDefault())},T=()=>{h.clear()},C=()=>{document.hidden&&T()},I=()=>{T()};window.addEventListener("keydown",v),window.addEventListener("keyup",D),window.addEventListener("blur",T),window.addEventListener("focus",T),window.addEventListener("pagehide",I),document.addEventListener("visibilitychange",C);let b=new kf(i);b.addPass(new Uf(e,t));let M=new ya(new xe(Math.max(1,n.clientWidth),Math.max(1,n.clientHeight)),.55,.45,.22);b.addPass(M);let A=new ga(Nw),z=new Bf,O=()=>{let k=Math.max(1,n.clientWidth),X=Math.max(1,n.clientHeight),oe=i.getPixelRatio();A.material.uniforms.resolution.value.set(1/(k*oe),1/(X*oe))};O(),b.addPass(A),b.addPass(z),n.appendChild(i.domElement);let G=()=>{let k=n.clientWidth,X=n.clientHeight;t.aspect=k/Math.max(1,X),t.updateProjectionMatrix(),i.setSize(k,X),b.setSize(k,X),O()};window.addEventListener("resize",G);let q=()=>{window.removeEventListener("resize",G),window.removeEventListener("keydown",v),window.removeEventListener("keyup",D),window.removeEventListener("blur",T),window.removeEventListener("focus",T),window.removeEventListener("pagehide",I),document.removeEventListener("visibilitychange",C),d.dispose(),u.geometry.dispose(),u.material.dispose(),A.dispose(),z.dispose(),i.dispose(),i.domElement.parentElement===n&&n.removeChild(i.domElement)},W=()=>{let k=g.getDelta();if(k<=0)return;let X=h.has("KeyW")||h.has("ArrowUp"),oe=h.has("KeyS")||h.has("ArrowDown"),Ne=h.has("KeyA")||h.has("ArrowLeft"),it=h.has("KeyD")||h.has("ArrowRight");if(!X&&!oe&&!Ne&&!it)return;let $=E*Math.min(k,.1);t.updateMatrixWorld(),y.setFromMatrixColumn(t.matrixWorld,0).normalize(),t.getWorldDirection(m),p.set(0,0,0),X&&p.addScaledVector(m,$),oe&&p.addScaledVector(m,-$),it&&p.addScaledVector(y,$),Ne&&p.addScaledVector(y,-$),p.lengthSq()>1e-10&&(t.position.add(p),d.target.add(p))},Y=()=>{b.render()};return{scene:e,camera:t,renderer:i,controls:d,render:()=>{W(),Y()},renderDisplay:Y,dispose:q}}function Ow(n,e,t){let i=0,r=()=>{i=requestAnimationFrame(r),t?.(),e.update(),n()};return r(),()=>cancelAnimationFrame(i)}var Gw=[784,64,32,10],i0=[...Dc],Wo={lr:.02,batchSize:32,epochs:1,vizEveryNBatches:4},c3=150,Fw=typeof globalThis.location<"u"&&new URLSearchParams(globalThis.location.search).has("vizdebug"),l3="data/csv/mnist_train.csv.gz",u3="data/csv/mnist_test.csv.gz",Hi="MNIST",ve,wn,kw=14,d3=32;function f3(n){let e=t=>{let i=n.id===t?n:n.querySelector(`#${CSS.escape(t)}`);if(!i)throw new Error(`#${t}`);return i};return{app:e("app"),dockTrain:e("dockTrain"),dockInfer:e("dockInfer"),btnNewModel:e("btnNewModel"),btnTrain:e("btnTrain"),btnPause:e("btnPause"),modelSelect:e("modelSelect"),modelDropdownButton:e("modelDropdownButton"),modelDropdownMenu:e("modelDropdownMenu"),activeModelTitle:e("activeModelTitle"),activeModelDetail:e("activeModelDetail"),inferModelContext:e("inferModelContext"),datasetRibbon:e("datasetRibbon"),epochStepHint:e("epochStepHint"),btnSaveModelAs:e("btnSaveModelAs"),btnResetModel:e("btnResetModel"),epochsInput:e("epochsInput"),lrInput:e("lrInput"),batchSizeInput:e("batchSizeInput"),vizEveryInput:e("vizEveryInput"),btnInferRandom:e("btnInferRandom"),btnInferDraw:e("btnInferDraw"),btnClearDraw:e("btnClearDraw"),status:e("status"),viz:e("viz"),drawCanvas:e("drawCanvas")}}var ni=[],Rn=[],dn,ot,pt=null,Ft=null,rl=0,s0=-1,qo=null,Go=0,ol=!1,$o=null,a0=0,h3=48;function Uw(n){let e=ve.drawCanvas.getBoundingClientRect(),t=ve.drawCanvas.width/e.width,i=ve.drawCanvas.height/e.height;return{x:(n.clientX-e.left)*t,y:(n.clientY-e.top)*i}}function jw(){$o!==null&&(cancelAnimationFrame($o),$o=null)}function Vf(){if(jw(),!pt||!Ft)return;a0=performance.now();let n=d0();Wf(n,void 0,void 0,{live:!0})}function p3(){if($o!==null)return;let n=()=>{if($o=null,!pt||!Ft)return;let e=performance.now();if(e-a0<h3){$o=requestAnimationFrame(n);return}a0=e;let t=d0();Wf(t,void 0,void 0,{live:!0})};$o=requestAnimationFrame(n)}function m3(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,'<span class="n3-status-val">$1</span>')}function Gt(n){ve.status.innerHTML=m3(n)}function cl(n){ot.modelDropdownOpen!==n&&dn.dispatch(re.modelDropdownSetOpen({open:n}))}function g3(n,e="Aktiv"){if(!n)return!1;if(!Ww(n))return Gt("Modell konnte nicht geladen werden."),!1;let t=ot.modelCollection.models.find(i=>i.id===n);return Gt(`${e}: ${t?.name??n}`),!0}function y3(n){let e=new Date(n);return Number.isFinite(e.getTime())?e.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}function v3(n,e){let t=e[n]??[];if(t.length===0)return 1;let i=0;for(let r of t)i=Math.max(i,r.run);return i+1}function Bw(n){dn.dispatch(re.epochViewSyncFromModel({modelId:n??""}))}function _3(n){dn.dispatch(re.epochHistoryCleared({modelId:n}))}function jo(n,e){return String(n).padStart(e," ")}function Hf(n,e,t){return n.toFixed(t).padStart(e," ")}function x3(n,e){if(n.length!==e.length)return"";let t=[];for(let i=0;i<e.length;i++){let r=e[i],o=n[i];if(!r||!o||r.length!==o.length)continue;let s=0;for(let a=0;a<r.length;a++)s=Math.max(s,Math.abs(r[a]-o[a]));t.push(`${i}:${s.toExponential(2)}`)}return t.length?`  \u0394max ${t.join(" ")}`:""}function c0(){let n=ni.length>0,e=Rn.length>0,t=ot.training.running;ve.btnTrain.disabled=!n||t,ve.btnPause.disabled=!t,ve.modelSelect.disabled=t,t&&ot.modelDropdownOpen&&cl(!1),ve.btnSaveModelAs.disabled=!pt||t,ve.btnResetModel.disabled=!pt||t,ve.btnInferRandom.disabled=!pt||!e,ve.btnInferDraw.disabled=!pt,ve.btnNewModel.disabled=t||!ot.modelStoreHydrated,ve.epochsInput.disabled=t,ve.lrInput.disabled=t,ve.batchSizeInput.disabled=t,ve.vizEveryInput.disabled=t;for(let i of document.querySelectorAll(".epochPresetBtn"))i.disabled=t;xa(),Yo(),jf()}function _a(n,e,t,i){let r=Number.parseInt(n,10);return Number.isFinite(r)?Math.min(i,Math.max(t,r)):e}function M3(n,e,t,i){let r=Number.parseFloat(n);return Number.isFinite(r)?Math.min(i,Math.max(t,r)):e}function b3(){let n=_a(ve.epochsInput.value,Wo.epochs,1,200),e=M3(ve.lrInput.value,Wo.lr,1e-4,1),t=_a(ve.batchSizeInput.value,Wo.batchSize,1,512),i=_a(ve.vizEveryInput.value,Wo.vizEveryNBatches,1,1e3);return ve.epochsInput.value=String(n),ve.lrInput.value=String(e),ve.batchSizeInput.value=String(t),ve.vizEveryInput.value=String(i),{lr:e,batchSize:t,epochs:n,vizEveryNBatches:i}}function Xo(n){return n===null||!Number.isFinite(n)?"-":`${(n*100).toFixed(2)}%`}function r0(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}function sl(n){return{version:1,inputDim:n.inputDim,hidden:[...n.hidden],outputDim:n.outputDim,weights:n.weights.map(e=>e.map(t=>[...t])),biases:n.biases.map(e=>e.map(t=>[...t]))}}function E3(n){let e=new wo(n.inputDim,n.hidden,n.outputDim);return e.weights=n.weights.map(t=>t.map(i=>[...i])),e.biases=n.biases.map(t=>t.map(i=>[...i])),e}function S3(){let n=ot.modelCollection,e=n.activeModelId??ve.modelSelect.value;if(ve.modelSelect.innerHTML="",!ot.modelStoreHydrated){let t=document.createElement("option");t.value="",t.textContent="Modelle werden geladen \u2026",t.selected=!0,ve.modelSelect.append(t),cl(!1),jf(),Yo(),xa();return}if(n.models.length===0){let t=document.createElement("option");t.value="",t.textContent="Kein Modell",t.selected=!0,ve.modelSelect.append(t),cl(!1),jf(),Yo(),xa();return}for(let t of n.models){let i=document.createElement("option");i.value=t.id,i.textContent=`${t.name} | err ${Xo(t.metrics.errorRate)} | acc ${Xo(t.metrics.testAcc)} | ep ${t.metrics.epochsTrained}`,ve.modelSelect.append(i)}e&&n.models.some(t=>t.id===e)?ve.modelSelect.value=e:n.models.length>0&&(ve.modelSelect.value=n.models[0].id),jf(),Yo(),xa()}function jf(){if(!pt){ve.activeModelTitle.textContent="Noch kein Netz geladen",ve.activeModelDetail.textContent="Oben \u201AAktives Modell\u2018 w\xE4hlen \u2014 oder \u201ETraining starten\u201C ohne vorherigen Stand legt automatisch einen ersten Stand an.",ve.inferModelContext.textContent="Kein aktives Modell \u2014 zuerst ein Modell w\xE4hlen oder anlegen.";return}let n=ot.modelCollection.activeModelId??ve.modelSelect.value,e=n?ot.modelCollection.models.find(t=>t.id===n):null;e?(ve.activeModelTitle.textContent=e.name,ve.activeModelDetail.textContent=`Test ${Xo(e.metrics.testAcc)} \xB7 Fehlerquote ${Xo(e.metrics.errorRate)} \xB7 ${e.metrics.epochsTrained} trainierte Epochen (Summe) \xB7 zuletzt ${y3(e.updatedAt)}`,ve.inferModelContext.textContent=`Inferenz nutzt: ${e.name} \xB7 ${e.metrics.epochsTrained} Epochen gesamt \xB7 Test ${Xo(e.metrics.testAcc)}`):(ve.activeModelTitle.textContent="Netz im Arbeitsspeicher",ve.activeModelDetail.textContent="Kein passender Eintrag in der Bibliothek gefunden.",ve.inferModelContext.textContent="Inferenz nutzt das Netz im Arbeitsspeicher (ohne Bibliothekseintrag).")}function w3(){if(ni.length===0&&Rn.length===0){ve.datasetRibbon.textContent=`${Hi}: Train 0 \xB7 Test 0 \u2014 warten auf erfolgreichen Abruf (Statuszeile).`;return}if(ni.length===0){ve.datasetRibbon.textContent=`${Hi}: Trainingsdaten fehlen \xB7 Test ${Rn.length}.`;return}if(Rn.length===0){ve.datasetRibbon.textContent=`${Hi}: Train ${ni.length} \xB7 Testdaten fehlen.`;return}ve.datasetRibbon.textContent=`${Hi}: ${ni.length} Train-Bilder \xB7 ${Rn.length} Test-Bilder bereit.`}function Yo(){let n=_a(ve.batchSizeInput.value,Wo.batchSize,1,512),e=_a(ve.epochsInput.value,Wo.epochs,1,200),t=ni.length;if(t<=0){ve.epochStepHint.textContent="Sobald Trainingsdaten geladen sind, erscheint hier die ungef\xE4hre Anzahl Gradientenschritte.";return}let i=Math.max(1,Math.ceil(t/n)),r=i*e;ve.epochStepHint.textContent=`Bei Batchgr\xF6\xDFe ${n}: rund ${i} Schritte pro Epoche, etwa ${r} f\xFCr ${e} Epoche(n).`}function xa(){let n=_a(ve.epochsInput.value,Wo.epochs,1,200),e=new Set([1,3,10,30]);for(let t of document.querySelectorAll(".epochPresetBtn")){let i=Number.parseInt(t.dataset.epochs??"",10);t.classList.toggle("epochPresetBtn--active",e.has(n)&&i===n)}}function al(n){dn.dispatch(re.modelEntryUpserted({entry:n}))}function Vw(n,e){return Bt(this,null,function*(){if(e.length===0)return null;let t=0,i=0;for(let o=0;o<e.length;o++){let s=e[o],a=ud(s.pixels),c=n.forward(a),l=new Array(10).fill(0);l[s.label]=1,t+=n.crossEntropyLoss(c.prob,ud(l)),n.predictClass(c.prob)===s.label&&(i+=1),o>0&&o%c3===0&&(yield wg())}let r=i/e.length;return{accuracy:r,errorRate:1-r,loss:t/e.length}})}function Ww(n){let e=ot.modelCollection.models.find(i=>i.id===n);if(!e||!od(e.model))return!1;let t=1+e.model.hidden.length;return e.model.weights.length!==t||e.model.biases.length!==t?!1:(pt=E3(e.model),qo=null,dn.dispatch(re.activeModelIdSet({id:e.id})),Zr("idle",va()),!0)}function va(){return Gw.map(n=>new Array(n).fill(0))}function T3(){return Bt(this,null,function*(){let n=[l3],e=[u3];try{Gt(`${Hi}: Train-CSV wird geladen \u2026`);let t="",i=[];for(let r of n)try{let o=yield Tg(r),s=yield Cg(o);if(s.length===0){t="Train-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){t=String(o)}if(i.length===0)throw new Error(t||"Train-CSV konnte nicht geladen werden");ni=i,Gt(`${Hi}: Train geladen (${ni.length} Zeilen)`)}catch(t){Gt(`${Hi}: Fehler Train-CSV: ${t}`),ni=[]}try{Gt(`${Hi}: Test-CSV wird geladen \u2026`);let t="",i=[];for(let r of e)try{let o=yield Tg(r),s=yield Cg(o);if(s.length===0){t="Test-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){t=String(o)}if(i.length===0)throw new Error(t||"Test-CSV konnte nicht geladen werden");Rn=i,Gt(`${Hi}: Train ${ni.length} | Test ${Rn.length} geladen`)}catch(t){Gt(`${Hi}: Fehler Test-CSV: ${t}`),Rn=[]}s0=-1,w3(),c0()})}var Hw=()=>{},l0=()=>{},zf=null,Gf=null;function $w(){l0()}var qw=0,zw=0,Vn=null;function Zr(n,e){Vn={stamp:++qw,mode:n,activations:e.map(t=>[...t])},u0()&&Ft&&pt&&Ft.setWeights(pt.weights)}function u0(){return!Ft||!Vn||Vn.stamp===zw?!1:(Ft.setIdleDim(Vn.mode==="idle"),Vn.mode!=="infer"&&Ft.setInferResult(null,null),Ft.setEdgeFocus(Vn.mode==="infer"?"infer":Vn.mode==="train"?"trainRecent":"off",Vn.mode==="infer"?Vn.activations:null),Ft.setActivations(Vn.activations),zw=Vn.stamp,!0)}function C3(n){return ww.includes(n)?n:null}function o0(){Ft&&(Vn?(Vn=Se(fe({},Vn),{stamp:++qw}),u0(),pt&&Ft.setWeights(pt.weights)):Zr("idle",va()),$w())}function D3(){u0()&&Ft&&pt&&Ft.setWeights(pt.weights)}function d0(){let n=ve.drawCanvas.width,e=ve.drawCanvas.height,i=wn.getImageData(0,0,n,e).data,r=n,o=e,s=-1,a=-1,c=20;for(let v=0;v<e;v++)for(let D=0;D<n;D++){let T=(v*n+D)*4;(i[T]+i[T+1]+i[T+2])/3>c&&(D<r&&(r=D),v<o&&(o=v),D>s&&(s=D),v>a&&(a=v))}if(s<r||a<o)return new Array(784).fill(0);let l=s-r+1,u=a-o+1,d=Math.max(l,u),f=Math.max(2,Math.floor(d*.2)),h=(r+s)*.5,g=(o+a)*.5,y=d+f*2,m=h-y*.5,p=g-y*.5,E=new Array(784),S=0;for(let v=0;v<28;v++)for(let D=0;D<28;D++){let T=m+D/28*y,C=p+v/28*y,I=m+(D+1)/28*y,b=p+(v+1)/28*y,M=Math.max(0,Math.floor(T)),A=Math.max(0,Math.floor(C)),z=Math.min(n,Math.ceil(I)),O=Math.min(e,Math.ceil(b)),G=0,q=0;for(let W=A;W<O;W++)for(let Y=M;Y<z;Y++){let U=(W*n+Y)*4;G+=(i[U]+i[U+1]+i[U+2])/3,q++}E[S++]=q>0?G/q/255:0}return E}function Wf(n,e,t,i){if(!pt||!Ft)return;let r=i?.live===!0;try{r||(rl+=1);let o=ud(n),s=pt.forward(o),a=pt.predictClass(s.prob),c=s.prob.some(g=>!Number.isFinite(g[0])),l=fd(o,s),u="";Fw&&qo&&(u=x3(qo,l)),Fw&&(qo=l.map(g=>[...g])),Ft.setInferResult(a,e??null),Zr("infer",l),r||$w();let d=s.prob.map((g,y)=>({digit:y,p:g[0]})),f=d.map(g=>g.p.toFixed(4)).join(" "),h=[...d].sort((g,y)=>y.p-g.p).slice(0,3).map(g=>`${g.digit}:${(g.p*100).toFixed(2)}%`).join(" ");if(e!==void 0)if(c)Gt(`Infer #${jo(rl,4)}: ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);else{let g=t===void 0?"":` idx=${jo(t,5)} `;Gt(`Infer #${jo(rl,4)}:${g}wahr=${e} pred=${a}  softmax ${f}  top ${h}${u}`)}else Gt(c?r?"Canvas (live): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren":`Infer #${jo(rl,4)} (Canvas): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`:r?`Canvas (live): pred=${a}  softmax ${f}  top ${h}${u}`:`Infer #${jo(rl,4)} (Canvas): pred=${a}  softmax ${f}  top ${h}${u}`)}catch(o){Gt(`Infer-Fehler: ${String(o)}`)}}function Xw(n,e,t){dn=n,ve=f3(e);let i=dn.select(ld).subscribe(k=>{ot=k,ve.btnPause.textContent=k.training.pause?"Fortsetzen":"Anhalten",Go!==0&&cancelAnimationFrame(Go),Go=requestAnimationFrame(()=>{Go=0,c0(),S3()})}),r=()=>{if(ot.training.running)return;let k=new wo(784,i0,10);pt=k,qo=null,dn.dispatch(re.lastTrainMetricsReset());let X=new Date().toISOString(),oe=crypto.randomUUID();al({id:oe,name:r0(),createdAt:X,updatedAt:X,model:sl(k),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}),Bw(oe),Zr("idle",va()),Gt(`Neues Modell: ${ot.modelCollection.models.find(Ne=>Ne.id===oe)?.name??oe}`)},o=k=>{ot.training.running||k&&g3(k,"Aktives Modell")};t.connect({newModelFromToolbar:r,activeModelFromToolbar:o}),cl(!1);let s=ve.drawCanvas.getContext("2d");if(!s)throw new Error("canvas");wn=s,wn.fillStyle="#000000",wn.fillRect(0,0,ve.drawCanvas.width,ve.drawCanvas.height),wn.lineWidth=kw,wn.lineCap="round",wn.lineJoin="round",wn.strokeStyle="#ffffff";let{scene:a,controls:c,render:l,renderDisplay:u,dispose:d}=Lw(ve.viz);Hw=l,l0=u,zf=d;let f=new Rf(Gw);Ft=f,a.add(f.root),Gf=Ow(l,c,D3);let h=k=>{if(k.button!==0&&k.button!==2)return;k.button===2&&k.preventDefault(),ol=!0,wn.strokeStyle=k.button===2?"#000000":"#ffffff",wn.lineWidth=k.button===2?d3:kw,ve.drawCanvas.setPointerCapture(k.pointerId);let X=Uw(k);wn.beginPath(),wn.moveTo(X.x,X.y)},g=k=>{if(!ol)return;let X=Uw(k);wn.lineTo(X.x,X.y),wn.stroke(),p3()},y=()=>{ol=!1,Vf()},m=()=>{ol=!1,Vf()},p=()=>{ol=!1,Vf()},E=(k,X)=>{let oe=C3(X);!oe||!Ft||(Ft.setHiddenLayerLayout(k,oe),o0())},S=(k,X)=>{!Ft||!Number.isFinite(X)||(Ft.setHiddenLayerLayoutScale(k,X),o0())},v=k=>{!Ft||!Number.isFinite(k)||(Ft.setActiveNeuronMaxScaleMul(k),o0())},D=()=>{wn.fillStyle="#000000",wn.fillRect(0,0,ve.drawCanvas.width,ve.drawCanvas.height),Vf()},T=()=>{if(!pt||Rn.length===0)return;let k=Math.floor(Math.random()*Rn.length);Rn.length>1&&k===s0&&(k=(k+1)%Rn.length),s0=k;let X=Rn[k];Wf(X.pixels,X.label,k)},C=()=>{if(!pt)return;let k=d0();Wf(k)},I=()=>{dn.dispatch(re.trainingPauseToggled())},b=()=>{let k=ve.modelSelect.value;k&&dn.dispatch(re.activeModelFromToolbarRequested({id:k}))},M=k=>{let X=k.target;X instanceof Node&&(X===ve.modelDropdownButton||ve.modelDropdownButton.contains(X)||ve.modelDropdownMenu.contains(X)||cl(!1))},A=()=>{dn.dispatch(re.newModelFromToolbarRequested())},z=()=>{if(!pt)return;let k=(window.prompt("Name f\xFCr den neuen Modellstand:",r0())??"").trim();if(!k)return;let X=pt;Bt(null,null,function*(){let oe=new Date().toISOString(),Ne=yield Vw(X,Rn);al({id:crypto.randomUUID(),name:k,createdAt:oe,updatedAt:oe,model:sl(X),metrics:{lastLoss:ot.lastTrainLoss,lastBatchAcc:ot.lastTrainBatchAcc,testAcc:Ne?Ne.accuracy:null,errorRate:Ne?Ne.errorRate:null,epochsTrained:0}}),Gt(`Neuer Modellstand gespeichert: ${k}`)})},O=()=>{if(ot.training.running)return;let k=ot.modelCollection.activeModelId??ve.modelSelect.value;if(!k)return;let X=ot.modelCollection.models.find(Ne=>Ne.id===k);if(!X)return;let oe=new wo(784,i0,10);pt=oe,qo=null,dn.dispatch(re.lastTrainMetricsReset()),_3(k),al(Se(fe({},X),{updatedAt:new Date().toISOString(),model:sl(oe),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}})),Bw(k),Zr("idle",va()),Gt(`Modell neu initialisiert: ${X.name}`)},G=()=>{Bt(null,null,function*(){if(yield new Promise(le=>{setTimeout(le,0)}),ni.length===0)return;let k=b3();if(!pt){pt=new wo(784,i0,10);let le=new Date().toISOString();al({id:crypto.randomUUID(),name:r0(),createdAt:le,updatedAt:le,model:sl(pt),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}})}qo=null;let X=ot.modelCollection.activeModelId??ve.modelSelect.value;if(!X)return;dn.dispatch(re.lastTrainMetricsReset());let oe=Date.now(),Ne=new Date(oe).toISOString(),it=v3(X,ot.epochByModelId);dn.dispatch(re.trainingStarted({modelId:X,run:it,runStartedAt:Ne,runStartedMs:oe})),ve.btnPause.textContent="Anhalten",yield new Promise(le=>{setTimeout(le,0)}),Zr("train",va());let $=yield VE(pt,ni,k,le=>{setTimeout(()=>{pt&&Zr("train",le.activations),Gt(`Ep ${jo(le.epoch+1,3)}  Batch ${jo(le.batchIndex,5)}  loss ${Hf(le.loss,8,4)}  acc ${Hf(le.trainAccBatch*100,6,1)}%`)},0)},le=>{let de=Se(fe({},le),{run:it,savedAt:new Date().toISOString(),runStartedAt:Ne,runElapsedMs:Date.now()-oe});dn.dispatch(re.trainingEpochAppended({modelId:X,row:de}))},()=>ot.training.pause,()=>ot.training.shouldStop);if(dn.dispatch(re.trainingFinished($)),pt){let le=yield Vw(pt,Rn),de=ot.modelCollection.activeModelId??ve.modelSelect.value,Pe=de?ot.modelCollection.models.find(Be=>Be.id===de):null;Pe&&al(Se(fe({},Pe),{updatedAt:new Date().toISOString(),model:sl(pt),metrics:{lastLoss:$.lastTrainLoss,lastBatchAcc:$.lastTrainBatchAcc,testAcc:le?le.accuracy:Pe.metrics.testAcc,errorRate:le?le.errorRate:Pe.metrics.errorRate,epochsTrained:Pe.metrics.epochsTrained+k.epochs}}))}pt&&Zr("idle",va());let ne=ot.modelCollection.activeModelId?ot.modelCollection.models.find(le=>le.id===ot.modelCollection.activeModelId):null;Gt(`Training beendet | aktiv: ${ne?.name??"-"} | loss ${Hf($.lastTrainLoss,8,4)} | batch-acc ${Hf($.lastTrainBatchAcc*100,6,2)}% | err ${Xo(ne?.metrics.errorRate??null)} | acc ${Xo(ne?.metrics.testAcc??null)}`)})},q=()=>{xa(),Yo()},W=()=>{Yo()},Y=k=>{Number.isFinite(k)&&(ve.epochsInput.value=String(Math.min(200,Math.max(1,k))),xa(),Yo())},U=()=>{Pr(ot.modelCollection),Lr({version:1,byModelId:ot.epochByModelId}),dn.dispatch(re.trainingStopRequested()),Gf?.(),Ft?.dispose(),zf?.()};window.addEventListener("beforeunload",U),Gt("MNIST wird geladen \u2026"),c0(),T3();try{if(ot.modelStoreHydrated){let k=ot.modelCollection.activeModelId;if(k&&Ww(k)){let X=ot.modelCollection.models.find(oe=>oe.id===k);Gt(`Modell aus Browser-Speicher geladen: ${X?.name??k}`)}else ot.modelCollection.models.length>0&&Gt(`${ot.modelCollection.models.length} Modellst\xE4nde im Browser gefunden`)}}catch{Gt("MNIST wird geladen \u2026")}return{destroy:()=>{try{Pr(ot.modelCollection),Lr({version:1,byModelId:ot.epochByModelId})}catch{}jw(),Go!==0&&(cancelAnimationFrame(Go),Go=0),dn.dispatch(re.trainingStopRequested()),t.connect({newModelFromToolbar:()=>{},activeModelFromToolbar:k=>{}}),i.unsubscribe(),window.removeEventListener("beforeunload",U),Gf?.(),Ft?.dispose(),zf?.(),Ft=null,Gf=null,zf=null,Hw=()=>{},l0=()=>{}},onTrain:G,onPause:I,onModelSelectChange:b,onNewModel:A,onSaveAs:z,onReset:O,onInferRandom:T,onInferDraw:C,onClearDraw:D,onEpochsInput:q,onBatchSizeInput:W,onEpochPreset:Y,onDocumentPointerDown:M,onDrawPointerDown:h,onDrawPointerMove:g,onDrawPointerUp:y,onDrawPointerCancel:m,onDrawPointerLeave:p,onHiddenLayerLayoutChange:E,onHiddenLayerLayoutScaleChange:S,onActiveNeuronMaxScaleMulChange:v}}var A3="pretrained/models.json",I3="pretrained/epochs.json";function R3(){return sd().models.length===0}function N3(n){if(!n||typeof n!="object")return null;let e=n;if(typeof e.lastLoss!="number"||typeof e.lastBatchAcc!="number")return null;let t=e.testAcc;if(t!==null&&typeof t!="number")return null;let i=e.errorRate;return i!==null&&typeof i!="number"||typeof e.epochsTrained!="number"?null:{lastLoss:e.lastLoss,lastBatchAcc:e.lastBatchAcc,testAcc:t,errorRate:i,epochsTrained:e.epochsTrained}}function P3(n){if(!n||typeof n!="object")return null;let e=n;if(typeof e.id!="string"||e.id.length===0||typeof e.name!="string"||typeof e.createdAt!="string"||typeof e.updatedAt!="string")return null;let t=e.model;if(!t||typeof t!="object"||!od(t))return null;let i=N3(e.metrics);return i?{id:e.id,name:e.name,createdAt:e.createdAt,updatedAt:e.updatedAt,model:t,metrics:i}:null}function L3(n){if(!n||typeof n!="object")return null;let e=n;if(e.version!==3||!Array.isArray(e.models))return null;let t=[];for(let r of e.models){let o=P3(r);if(!o)return null;t.push(o)}let i=e.activeModelId;return i!==null&&typeof i!="string"||i!==null&&!t.some(r=>r.id===i)?null:{version:3,activeModelId:i,models:t}}function Yw(n){return Bt(this,null,function*(){try{let e=yield fetch(n);return e.ok?yield e.json():null}catch{return null}})}function Zw(){return Bt(this,null,function*(){let n=yield Yw(A3),e=L3(n);if(!e)return null;let t=yield Yw(I3),i=Mg(t)??{version:1,byModelId:{}};return{modelCollection:e,epochStore:i}})}function Kw(){return Bt(this,null,function*(){if(!R3())return;let n=yield Zw();!n||n.modelCollection.models.length===0||(Pr(n.modelCollection),Lr(n.epochStore))})}function Jw(){return Bt(this,null,function*(){let n=yield Zw();return n?(Pr(n.modelCollection),Lr(n.epochStore),n):null})}var zi=class n{store=ce(Wt);runtime=null;start(e,t){let i=!1,r=null;return Bt(this,null,function*(){if(yield Kw(),i)return;let o=sd(),{byModelId:s}=ad();i||(this.store.dispatch(re.modelStoreHydrated({modelCollection:o})),this.store.dispatch(re.epochStoreHydrated({byModelId:fe({},s)})),!i&&(this.runtime=Xw(this.store,e,t),r=()=>{this.runtime?.destroy(),this.runtime=null}))}),()=>{i=!0,r?(r(),r=null):(this.runtime?.destroy(),this.runtime=null)}}dispatch(e){this.store.dispatch(e)}onTrain=()=>{this.runtime?.onTrain()};onPause=()=>{this.runtime?.onPause()};onModelSelectChange=()=>{this.runtime?.onModelSelectChange()};onActiveModelFromMenu=e=>{this.store.dispatch(re.activeModelFromToolbarRequested({id:e}))};onNewModel=()=>{this.runtime?.onNewModel()};onSaveAs=()=>{this.runtime?.onSaveAs()};onReset=()=>{this.runtime?.onReset()};onInferRandom=()=>{this.runtime?.onInferRandom()};onInferDraw=()=>{this.runtime?.onInferDraw()};onClearDraw=()=>{this.runtime?.onClearDraw()};onEpochsInput=()=>{this.runtime?.onEpochsInput()};onBatchSizeInput=()=>{this.runtime?.onBatchSizeInput()};onEpochPreset=e=>{this.runtime?.onEpochPreset(e)};onDocumentPointerDown=e=>{this.runtime?.onDocumentPointerDown(e)};onDrawPointerDown=e=>{this.runtime?.onDrawPointerDown(e)};onDrawPointerMove=e=>{this.runtime?.onDrawPointerMove(e)};onDrawPointerUp=()=>{this.runtime?.onDrawPointerUp()};onDrawPointerCancel=()=>{this.runtime?.onDrawPointerCancel()};onDrawPointerLeave=()=>{this.runtime?.onDrawPointerLeave()};onHiddenLayerLayoutChange=(e,t)=>{this.runtime?.onHiddenLayerLayoutChange(e,t)};onHiddenLayerLayoutScaleChange=(e,t)=>{this.runtime?.onHiddenLayerLayoutScaleChange(e,t)};onActiveNeuronMaxScaleMulChange=e=>{this.runtime?.onActiveNeuronMaxScaleMulChange(e)};static \u0275fac=function(t){return new(t||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})};var Ma=class n{newModel=()=>{};selectModel=e=>{};connect(e){this.newModel=e.newModelFromToolbar,this.selectModel=e.activeModelFromToolbar}newModelFromToolbar(){this.newModel()}activeModelFromToolbar(e){this.selectModel(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac,providedIn:"root"})};function f0(n,e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=n,r.rel="noopener",document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(i)}var $f=class n{store=ce(Wt);actions$=ce(Kb);app=ce(Ma);neuronalApp=ce(zi);newModelFromToolbar$=zt(()=>this.actions$.pipe($t(re.newModelFromToolbarRequested),ci(this.store.select(So)),sn(([,e])=>!e),Ht(()=>{this.app.newModelFromToolbar()})),{dispatch:!1});activeModelFromToolbar$=zt(()=>this.actions$.pipe($t(re.activeModelFromToolbarRequested),ci(this.store.select(So)),sn(([e,t])=>!t&&e.id.length>0),Ht(([e])=>{this.app.activeModelFromToolbar(e.id)})),{dispatch:!1});uiModelSelectChanged$=zt(()=>this.actions$.pipe($t(re.uiModelSelectChanged),Ht(()=>{this.neuronalApp.onModelSelectChange()})),{dispatch:!1});uiTrainStart$=zt(()=>this.actions$.pipe($t(re.uiTrainStartRequested),Ht(()=>{this.neuronalApp.onTrain()})),{dispatch:!1});uiSaveAs$=zt(()=>this.actions$.pipe($t(re.uiSaveAsRequested),Ht(()=>{this.neuronalApp.onSaveAs()})),{dispatch:!1});uiReset$=zt(()=>this.actions$.pipe($t(re.uiResetRequested),Ht(()=>{this.neuronalApp.onReset()})),{dispatch:!1});uiInferRandom$=zt(()=>this.actions$.pipe($t(re.uiInferRandomRequested),Ht(()=>{this.neuronalApp.onInferRandom()})),{dispatch:!1});uiInferDraw$=zt(()=>this.actions$.pipe($t(re.uiInferDrawRequested),Ht(()=>{this.neuronalApp.onInferDraw()})),{dispatch:!1});uiClearDraw$=zt(()=>this.actions$.pipe($t(re.uiClearDrawRequested),Ht(()=>{this.neuronalApp.onClearDraw()})),{dispatch:!1});uiEpochPreset$=zt(()=>this.actions$.pipe($t(re.uiEpochPresetRequested),Ht(({epochs:e})=>{this.neuronalApp.onEpochPreset(e)})),{dispatch:!1});uiEpochsInput$=zt(()=>this.actions$.pipe($t(re.uiEpochsInputChanged),Ht(()=>{this.neuronalApp.onEpochsInput()})),{dispatch:!1});uiBatchSizeInput$=zt(()=>this.actions$.pipe($t(re.uiBatchSizeInputChanged),Ht(()=>{this.neuronalApp.onBatchSizeInput()})),{dispatch:!1});uiDocumentPointerDown$=zt(()=>this.actions$.pipe($t(re.uiDocumentPointerDown),Ht(({event:e})=>{this.neuronalApp.onDocumentPointerDown(e)})),{dispatch:!1});uiDrawPointerDown$=zt(()=>this.actions$.pipe($t(re.uiDrawPointerDown),Ht(({event:e})=>{this.neuronalApp.onDrawPointerDown(e)})),{dispatch:!1});uiDrawPointerMove$=zt(()=>this.actions$.pipe($t(re.uiDrawPointerMove),Ht(({event:e})=>{this.neuronalApp.onDrawPointerMove(e)})),{dispatch:!1});uiDrawPointerUp$=zt(()=>this.actions$.pipe($t(re.uiDrawPointerUp),Ht(()=>{this.neuronalApp.onDrawPointerUp()})),{dispatch:!1});uiDrawPointerCancel$=zt(()=>this.actions$.pipe($t(re.uiDrawPointerCancel),Ht(()=>{this.neuronalApp.onDrawPointerCancel()})),{dispatch:!1});uiDrawPointerLeave$=zt(()=>this.actions$.pipe($t(re.uiDrawPointerLeave),Ht(()=>{this.neuronalApp.onDrawPointerLeave()})),{dispatch:!1});uiExportBundle$=zt(()=>this.actions$.pipe($t(re.uiExportBundleRequested),ci(this.store.select(ld)),Ht(([,e])=>{f0("neuronal3d-models.json",e.modelCollection),f0("neuronal3d-epochs.json",{version:1,byModelId:e.epochByModelId})})),{dispatch:!1});uiResetToPretrainedFiles$=zt(()=>this.actions$.pipe($t(re.uiResetToPretrainedFilesRequested),ci(this.store.select(So)),sn(([,e])=>!e),oo(()=>io(Jw()).pipe(so(e=>{if(!e)return ai;let t=e.modelCollection.activeModelId??e.modelCollection.models[0]?.id??"",i=[re.modelStoreHydrated({modelCollection:e.modelCollection}),re.epochStoreHydrated({byModelId:fe({},e.epochStore.byModelId)})];return t.length>0?Zi(...i,re.activeModelFromToolbarRequested({id:t})):Zi(...i)})))));persistEpoch$=zt(()=>this.store.select(Eg).pipe(as(1),ss(200),Ht(e=>{Lr({version:1,byModelId:e})})),{dispatch:!1});static \u0275fac=function(t){return new(t||n)};static \u0275prov=Ye({token:n,factory:n.\u0275fac})};var O3=()=>({version:3,activeModelId:null,models:[]});function qf(n,e){let t=e.activeModelId;return t?[...n[t]??[]]:[]}function Qw(){let n=O3(),e=fe({},ad().byModelId);return{modelCollection:n,modelStoreHydrated:!1,epochByModelId:e,epochDisplayRows:qf(e,n),training:{running:!1,pause:!1,shouldStop:!1,currentRun:0,currentRunStartedAt:"",currentRunStartedMs:0},lastTrainLoss:0,lastTrainBatchAcc:0,modelDropdownOpen:!1}}function F3(n,e,t){let r=[...n[e]??[],t];return r.length>500&&r.splice(0,r.length-500),Se(fe({},n),{[e]:r})}function k3(n,e){let t=[...n.models],i=t.findIndex(r=>r.id===e.id);return i>=0?t[i]=e:t.unshift(e),Se(fe({},n),{activeModelId:e.id,models:t})}function h0(n,e){return[...n.epochByModelId[e]??[]]}var U3=Qw(),tT=$b(U3,xn(re.modelStoreHydrated,(n,{modelCollection:e})=>Se(fe({},n),{modelCollection:e,modelStoreHydrated:!0,epochDisplayRows:qf(n.epochByModelId,e)})),xn(re.epochStoreHydrated,(n,{byModelId:e})=>Se(fe({},n),{epochByModelId:fe({},e),epochDisplayRows:qf(e,n.modelCollection)})),xn(re.activeModelIdSet,(n,{id:e})=>Se(fe({},n),{modelCollection:Se(fe({},n.modelCollection),{activeModelId:e}),epochDisplayRows:h0(n,e)})),xn(re.modelEntryUpserted,(n,{entry:e})=>{let t=n.modelCollection.models.some(r=>r.id===e.id),i=k3(n.modelCollection,e);return Se(fe({},n),{modelCollection:i,epochDisplayRows:t?n.epochDisplayRows:h0(n,e.id)})}),xn(re.epochViewSyncFromModel,(n,{modelId:e})=>{if(!e)return Se(fe({},n),{epochDisplayRows:[]});let t=n.epochByModelId[e]??[];return Se(fe({},n),{epochDisplayRows:[...t]})}),xn(re.epochHistoryCleared,(n,{modelId:e})=>{let t=fe({},n.epochByModelId);delete t[e];let i=n.modelCollection.activeModelId;return Se(fe({},n),{epochByModelId:t,epochDisplayRows:i===e?[]:n.epochDisplayRows})}),xn(re.trainingStarted,(n,e)=>Se(fe({},n),{training:Se(fe({},n.training),{running:!0,shouldStop:!1,pause:!1,currentRun:e.run,currentRunStartedAt:e.runStartedAt,currentRunStartedMs:e.runStartedMs}),epochDisplayRows:h0(n,e.modelId),modelDropdownOpen:!1})),xn(re.trainingEpochAppended,(n,{modelId:e,row:t})=>{let i=F3(n.epochByModelId,e,t);return Se(fe({},n),{epochByModelId:i,epochDisplayRows:[...n.epochDisplayRows,t]})}),xn(re.trainingFinished,(n,{lastTrainLoss:e,lastTrainBatchAcc:t})=>Se(fe({},n),{lastTrainLoss:e,lastTrainBatchAcc:t,training:Se(fe({},n.training),{running:!1,shouldStop:!1,pause:!1})})),xn(re.trainingStopRequested,n=>Se(fe({},n),{training:Se(fe({},n.training),{shouldStop:!0})})),xn(re.trainingPauseToggled,n=>Se(fe({},n),{training:Se(fe({},n.training),{pause:!n.training.pause})})),xn(re.uiModelDropdownToggleRequested,n=>n.training.running||!n.modelStoreHydrated||n.modelCollection.models.length===0?n:Se(fe({},n),{modelDropdownOpen:!n.modelDropdownOpen})),xn(re.activeModelFromToolbarRequested,n=>Se(fe({},n),{modelDropdownOpen:!1})),xn(re.modelDropdownSetOpen,(n,{open:e})=>Se(fe({},n),{modelDropdownOpen:e})),xn(re.lastTrainMetricsReset,n=>Se(fe({},n),{lastTrainLoss:0,lastTrainBatchAcc:0})));var nT={providers:[Wb(void 0,{metaReducers:[TE]}),jb("neuronal",tT),Qb([$f]),...hc()?[bE({maxAge:30,trace:!1})]:[],JM({eventCoalescing:!0})]};function B3(n,e){return this.rowKey(e)}var p0=(n,e)=>e.pos+e.label;function V3(n,e){n&1&&(K(0,"li",9),ae(1,"Noch kein Training"),ee())}function H3(n,e){if(n&1&&(K(0,"li",10)(1,"span",11),ae(2),ee(),K(3,"span",12),ae(4),ee(),K(5,"span",13),ae(6),ee(),K(7,"span",14),ae(8),ee(),K(9,"span",15),ae(10),ee()()),n&2){let t=e.$implicit,i=Wn(3);Te(2),pi("R",i.runLabel(t.run),""),Te(2),pi("Ep ",t.epoch+1,""),Te(2),pi("loss ",t.loss.toFixed(4),""),Te(2),pi("",(t.trainAcc*100).toFixed(2),"%"),Te(2),Nm("",i.timeLabel(t.savedAt)," | Dauer ",i.durationLabel(t.runElapsedMs),"")}}function z3(n,e){if(n&1&&Rr(0,H3,11,6,"li",10,B3,!0),n&2){let t=Wn(2);Nr(t.view().rows)}}function G3(n,e){if(n&1&&(K(0,"div",6)(1,"ul",8),ir(2,V3,2,0,"li",9)(3,z3,2,0),ee()()),n&2){let t=Wn();Te(2),Ir(t.view().rows.length===0?2:3)}}function j3(n,e){if(n&1&&(Ms(),Mt(0,"line",19)),n&2){let t=e.$implicit,i=Wn();Et("x1",i.marginLeft)("y1",t)("x2",i.marginLeft+i.plotW)("y2",t)}}function W3(n,e){if(n&1&&(Ms(),K(0,"text",24),ae(1),ee()),n&2){let t=e.$implicit,i=Wn();Et("x",i.marginLeft-4)("y",t.pos),Te(),pi(" ",t.label," ")}}function $3(n,e){if(n&1&&(Ms(),K(0,"text",25),ae(1),ee()),n&2){let t=e.$implicit,i=Wn();Et("x",i.marginLeft+i.plotW+4)("y",t.pos),Te(),pi(" ",t.label," ")}}function q3(n,e){if(n&1&&(Ms(),K(0,"text",26),ae(1),ee()),n&2){let t=e.$implicit,i=Wn();Et("x",t.pos)("y",i.marginTop+i.plotH+14),Te(),pi(" ",t.label," ")}}function X3(n,e){if(n&1&&(Ms(),K(0,"svg",16)(1,"defs")(2,"clipPath",17),Mt(3,"rect"),ee()(),Mt(4,"rect",18),Rr(5,j3,1,4,":svg:line",19,$M),Mt(7,"line",20)(8,"line",20)(9,"line",20),K(10,"g",21),Mt(11,"polyline",22)(12,"polyline",23),ee(),Rr(13,W3,2,3,":svg:text",24,p0),Rr(15,$3,2,3,":svg:text",25,p0),Rr(17,q3,2,3,":svg:text",26,p0),K(19,"text",27),ae(20," Schritt "),ee()(),Ax(),K(21,"div",28)(22,"span",29),ae(23,"Loss"),ee(),K(24,"span",30),ae(25,"Train-Acc"),ee()()),n&2){let t=e;Et("viewBox","0 0 "+t.vbW+" "+t.vbH),Te(3),Et("x",t.marginLeft)("y",t.marginTop)("width",t.plotW)("height",t.plotH),Te(),Et("width",t.vbW)("height",t.vbH),Te(),Nr(t.gridYs),Te(2),Et("x1",t.marginLeft)("y1",t.marginTop)("x2",t.marginLeft)("y2",t.marginTop+t.plotH),Te(),Et("x1",t.marginLeft+t.plotW)("y1",t.marginTop)("x2",t.marginLeft+t.plotW)("y2",t.marginTop+t.plotH),Te(),Et("x1",t.marginLeft)("y1",t.marginTop+t.plotH)("x2",t.marginLeft+t.plotW)("y2",t.marginTop+t.plotH),Te(2),Et("points",t.pointsLoss),Te(),Et("points",t.pointsAcc),Te(),Nr(t.leftTicks),Te(2),Nr(t.rightTicks),Te(2),Nr(t.bottomTicks),Te(2),Et("x",t.marginLeft+t.plotW/2)("y",t.vbH-2)}}function Y3(n,e){n&1&&(K(0,"p",9),ae(1,"Noch kein Training"),ee())}function Z3(n,e){if(n&1&&(K(0,"div",7),ir(1,X3,26,23)(2,Y3,2,0,"p",9),ee()),n&2){let t,i=Wn();Te(),Ir((t=i.chartModel())?1:2,t)}}var Xf=class n{store=ce(Wt);view=Oi(this.store.select(Sg),{requireSync:!0});epochTab=hi("list");chartModel=ws(()=>{let e=this.view().rows;if(e.length===0)return null;let t=[...e].reverse(),i=t.length,r=34,o=38,s=10,a=26,c=148,l=70,u=r+c+o,d=s+l+a,f=t.map(O=>O.loss),h=Math.min(...f),g=Math.max(...f),y=Math.max(g-h,1e-9),m=O=>r+(i<=1?c/2:O/(i-1)*c),p=O=>s+(1-(O-h)/y)*l,E=O=>s+(1-O)*l,S=t.map((O,G)=>`${m(G)},${p(O.loss)}`).join(" "),v=t.map((O,G)=>`${m(G)},${E(O.trainAcc)}`).join(" "),D=O=>{let G=Math.abs(O);return G>=100?O.toFixed(0):G>=10?O.toFixed(1):G>=1?O.toFixed(2):O.toFixed(3)},T=s+l,C=s+l/2,I=g-h<1e-8,b=I?[{pos:C,label:D(h)}]:[{pos:s,label:D(h)},{pos:C,label:D((h+g)/2)},{pos:T,label:D(g)}],M=[{pos:s,label:"100%"},{pos:C,label:"50%"},{pos:T,label:"0%"}],A=I?[C]:[s,C,T],z=[];if(i===1)z.push({pos:m(0),label:"1"});else{if(z.push({pos:m(0),label:"1"}),i>2){let O=Math.floor((i-1)/2);O!==0&&O!==i-1&&z.push({pos:m(O),label:String(O+1)})}z.push({pos:m(i-1),label:String(i)})}return{vbW:u,vbH:d,marginLeft:r,marginRight:o,marginTop:s,marginBottom:a,plotW:c,plotH:l,pointsLoss:S,pointsAcc:v,leftTicks:b,rightTicks:M,bottomTicks:z,gridYs:A}});rowKey(e){return`${e.run}-${e.epoch}-${e.savedAt}`}runLabel(e){return String(e).padStart(2,"0")}timeLabel(e){let t=new Date(e);return Number.isFinite(t.getTime())?t.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}durationLabel(e){let t=Math.max(0,Math.round(e/1e3)),i=Math.floor(t/3600),r=Math.floor(t%3600/60),o=t%60;return i>0?`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-epoch-track-list"]],decls:11,vars:8,consts:[[1,"n3-panel","n3-panel--epochs"],["role","tablist","aria-label","Epoch-Ansicht",1,"n3-sidebartabs","n3-epochtabs"],["type","button","role","tab","id","tab-epoch-list","aria-controls","panel-epoch-list",1,"n3-sidebartab",3,"click"],["type","button","role","tab","id","tab-epoch-chart","aria-controls","panel-epoch-chart",1,"n3-sidebartab",3,"click"],[1,"n3-epochwrap"],[1,"n3-epochhead"],["id","panel-epoch-list","role","tabpanel","aria-labelledby","tab-epoch-list",1,"n3-epochtabpanel"],["id","panel-epoch-chart","role","tabpanel","aria-labelledby","tab-epoch-chart",1,"n3-epochtabpanel","n3-epochchart"],[1,"n3-epochlist"],[1,"epochEmpty"],[1,"epochRow"],[1,"epochRun"],[1,"epochNum"],[1,"epochLoss"],[1,"epochAcc"],[1,"epochMeta"],["preserveAspectRatio","xMidYMid meet",1,"n3-epochchart-svg"],["id","n3-epoch-plot-clip"],["x","0","y","0",1,"n3-epochchart-bg"],[1,"n3-epochchart-grid"],[1,"n3-epochchart-axis"],["clip-path","url(#n3-epoch-plot-clip)"],["fill","none",1,"n3-epochchart-line","n3-epochchart-line--loss"],["fill","none",1,"n3-epochchart-line","n3-epochchart-line--acc"],["text-anchor","end","dominant-baseline","middle",1,"n3-epochchart-ticklabel","n3-epochchart-ticklabel--loss"],["text-anchor","start","dominant-baseline","middle",1,"n3-epochchart-ticklabel","n3-epochchart-ticklabel--acc"],["text-anchor","middle","dominant-baseline","middle",1,"n3-epochchart-ticklabel","n3-epochchart-ticklabel--x"],["text-anchor","middle","dominant-baseline","auto",1,"n3-epochchart-axis-title"],["aria-hidden","true",1,"n3-epochchart-legend"],[1,"n3-epochchart-legend-item","n3-epochchart-legend-item--loss"],[1,"n3-epochchart-legend-item","n3-epochchart-legend-item--acc"]],template:function(t,i){t&1&&(K(0,"article",0)(1,"div",1)(2,"button",2),nt("click",function(){return i.epochTab.set("list")}),ae(3," Liste "),ee(),K(4,"button",3),nt("click",function(){return i.epochTab.set("chart")}),ae(5," Diagramm "),ee()(),K(6,"div",4)(7,"p",5),ae(8),ee(),ir(9,G3,4,1,"div",6)(10,Z3,3,1,"div",7),ee()()),t&2&&(Te(2),rr("n3-sidebartab--active",i.epochTab()==="list"),Et("aria-selected",i.epochTab()==="list"),Te(2),rr("n3-sidebartab--active",i.epochTab()==="chart"),Et("aria-selected",i.epochTab()==="chart"),Te(4),pi("Epochs (",i.view().epochsTotal,")"),Te(),Ir(i.epochTab()==="list"?9:10))},encapsulation:2,changeDetection:0})};var Yf=class n{store=ce(Wt);neuronalApp=ce(zi);inferRandom(){this.store.dispatch(re.uiInferRandomRequested())}inferDraw(){this.store.dispatch(re.uiInferDrawRequested())}clearDraw(){this.store.dispatch(re.uiClearDrawRequested())}drawDown(e){this.neuronalApp.onDrawPointerDown(e)}drawMove(e){this.neuronalApp.onDrawPointerMove(e)}drawUp(){this.neuronalApp.onDrawPointerUp()}drawCancel(){this.neuronalApp.onDrawPointerCancel()}drawLeave(){this.neuronalApp.onDrawPointerLeave()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-infer-panel"]],decls:16,vars:0,consts:[["id","dockInfer",1,"n3-panel","n3-panel--infer"],[1,"n3-panelhead","shrink-0"],[1,"n3-paneltitle","text-foreground"],[1,"n3-panelsub","text-muted"],["id","inferModelContext","aria-live","polite",1,"n3-inferctx"],[1,"n3-row","flex","flex-wrap","gap-2"],["id","btnInferRandom","type","button","disabled","",1,"n3-btn","border-border",3,"click"],["id","drawCanvas","width","320","height","320",1,"aspect-square","max-w-[290px]","w-full","touch-none","self-center","rounded-xl","border","border-border-soft","bg-black","shadow-xl",3,"contextmenu","pointerdown","pointermove","pointerup","pointercancel","pointerleave"],["id","drawActions",1,"n3-drawactions","grid","w-full","max-w-[290px]","grid-cols-2","gap-2","self-center"],["id","btnInferDraw","type","button","disabled","",1,"n3-btn","border-border",3,"click"],["id","btnClearDraw","type","button",1,"n3-btn","n3-btn--ghost",3,"click"]],template:function(t,i){t&1&&(K(0,"article",0)(1,"div",1)(2,"h2",2),ae(3,"Inferenz"),ee(),K(4,"p",3),ae(5,"Direkt mit dem aktiven Modell testen"),ee()(),Mt(6,"p",4),K(7,"div",5)(8,"button",6),nt("click",function(){return i.inferRandom()}),ae(9," Zuf\xE4lliges Testbild "),ee()(),K(10,"canvas",7),nt("contextmenu",function(o){return o.preventDefault()})("pointerdown",function(o){return i.drawDown(o)})("pointermove",function(o){return i.drawMove(o)})("pointerup",function(){return i.drawUp()})("pointercancel",function(){return i.drawCancel()})("pointerleave",function(){return i.drawLeave()}),ee(),K(11,"div",8)(12,"button",9),nt("click",function(){return i.inferDraw()}),ae(13," Zeichnung auswerten "),ee(),K(14,"button",10),nt("click",function(){return i.clearDraw()}),ae(15," Leeren "),ee()()())},encapsulation:2,changeDetection:0})};var K3=(n,e)=>e.id;function J3(n,e){if(n&1&&(K(0,"span",5)(1,"span",11),ae(2),ee(),K(3,"span",12),ae(4),ee()()),n&2){let t=e;Te(2),Tn(t.name),Te(2),Tn(t.meta)}}function Q3(n,e){n&1&&(K(0,"div",13),ae(1,"Modelle werden geladen \u2026"),ee())}function eB(n,e){n&1&&(K(0,"div",13),ae(1,"Keine Modelle vorhanden"),ee())}function tB(n,e){if(n&1){let t=Ou();K(0,"button",15),nt("click",function(){let r=ac(t).$implicit,o=Wn(3);return cc(o.pickActiveModel(r.id))}),K(1,"span",16),ae(2),ee(),K(3,"div",17)(4,"div",18)(5,"span",19),ae(6,"Epoch"),ee(),K(7,"span",20),ae(8),ee()(),K(9,"div",21)(10,"span",19),ae(11,"Test-Genauigkeit"),ee(),K(12,"span",20),ae(13),ee()(),K(14,"div",22)(15,"span",19),ae(16,"Fehlerrate"),ee(),K(17,"span",20),ae(18),ee()()()()}if(n&2){let t=e.$implicit,i=Wn(2);rr("n3-modelbar-option--active",t.active),jn("disabled",i.trainingRunning),Et("aria-selected",t.active?"true":"false"),Te(2),Tn(t.name),Te(6),Tn(t.epochValue),Te(5),Tn(t.accValue),Te(5),Tn(t.errValue)}}function nB(n,e){if(n&1&&Rr(0,tB,19,8,"button",14,K3),n&2){let t=Wn();Nr(t.items)}}function iB(n,e){if(n&1&&ir(0,Q3,2,0,"div",13)(1,eB,2,0,"div",13)(2,nB,2,0),n&2){let t;Ir((t=e.phase)==="loading"?0:t==="empty"?1:t==="list"?2:-1)}}var Zf=class n{store=ce(Wt);model=Oi(this.store.select(bg),{requireSync:!0});trainingRunning=Oi(this.store.select(So),{initialValue:!1});dropdownToggle(){this.store.dispatch(re.uiModelDropdownToggleRequested())}newModel(){this.store.dispatch(re.newModelFromToolbarRequested())}pickActiveModel(e){this.store.dispatch(re.activeModelFromToolbarRequested({id:e}))}modelSelectChanged(){this.store.dispatch(re.uiModelSelectChanged())}exportJson(){this.store.dispatch(re.uiExportBundleRequested())}resetToPretrained(){this.store.dispatch(re.uiResetToPretrainedFilesRequested())}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-neuronal-model-bar"]],decls:16,vars:6,consts:[[1,"n3-modelbar","flex","min-w-0","flex-col","gap-1.5"],[1,"n3-modelbar-label","font-semibold","uppercase","tracking-widest","text-muted","text-[0.62rem]"],[1,"n3-modelbar-row","flex","min-w-0","flex-wrap","items-stretch","gap-2"],[1,"n3-modelbar-dropdown","relative","z-[60]","min-w-0","flex-1",3,"pointerdown"],["id","modelDropdownButton","type","button","aria-haspopup","listbox",1,"n3-modelbar-button",3,"click","disabled"],[1,"n3-modelbar-selected","flex","min-w-0","flex-col","gap-0.5"],["id","modelDropdownMenu","role","listbox",1,"n3-modelbar-menu",3,"hidden"],["id","btnNewModel","type","button",1,"n3-btn","n3-btn--accent","shrink-0",3,"click"],["id","btnExportJson","type","button",1,"n3-btn","border-border","shrink-0",3,"click"],["id","btnResetToPretrained","type","button",1,"n3-btn","n3-btn--ghost","shrink-0",3,"click","disabled"],["id","modelSelect","tabindex","-1","aria-hidden","true",1,"sr-only",3,"change"],[1,"n3-modelbar-selected-name"],[1,"n3-modelbar-selected-meta"],[1,"n3-modelbar-empty"],["type","button","role","option",1,"n3-modelbar-option",3,"n3-modelbar-option--active","disabled"],["type","button","role","option",1,"n3-modelbar-option",3,"click","disabled"],[1,"n3-modelbar-option-name"],[1,"n3-modelbar-option-stats"],[1,"n3-modelbar-stat","n3-modelbar-stat--epoch"],[1,"n3-modelbar-stat-label"],[1,"n3-modelbar-stat-value"],[1,"n3-modelbar-stat","n3-modelbar-stat--acc"],[1,"n3-modelbar-stat","n3-modelbar-stat--err"]],template:function(t,i){if(t&1&&(K(0,"div",0)(1,"span",1),ae(2,"Aktives Modell"),ee(),K(3,"div",2)(4,"div",3),nt("pointerdown",function(o){return o.stopPropagation()}),K(5,"button",4),nt("click",function(){return i.dropdownToggle()}),ir(6,J3,5,2,"span",5),ee(),K(7,"div",6),ir(8,iB,3,1),ee()(),K(9,"button",7),nt("click",function(){return i.newModel()}),ae(10," Neues Modell starten "),ee(),K(11,"button",8),nt("click",function(){return i.exportJson()}),ae(12," JSON exportieren "),ee(),K(13,"button",9),nt("click",function(){return i.resetToPretrained()}),ae(14," Auf Vorgaben zur\xFCcksetzen "),ee()(),K(15,"select",10),nt("change",function(){return i.modelSelectChanged()}),ee()()),t&2){let r,o;Te(5),jn("disabled",i.model().dropdownDisabled),Et("aria-expanded",i.model().dropdownOpen?"true":"false"),Te(),Ir((r=i.model().label)?6:-1,r),Te(),jn("hidden",!i.model().dropdownOpen),Te(),Ir((o=i.model().menu)?8:-1,o),Te(5),jn("disabled",i.trainingRunning())}},encapsulation:2,changeDetection:0})};var Kf=class n{app=ce(zi);scaleMin=Yv;scaleMax=Zv;scaleStep=Tw;scale0=hi(ma);scale1=hi(ma);neuronMulMin=Kv;neuronMulMax=Jv;neuronMulStep=Cw;activeNeuronMaxMul=hi(Qv);onHiddenLayout(e,t){let i=t.target;i instanceof HTMLSelectElement&&this.app.onHiddenLayerLayoutChange(e,i.value)}onScale(e,t){let i=t.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&(e===0?this.scale0.set(r):this.scale1.set(r),this.app.onHiddenLayerLayoutScaleChange(e,r))}onActiveNeuronMaxMul(e){let t=e.target;if(!(t instanceof HTMLInputElement)||t.type!=="range")return;let i=parseFloat(t.value);Number.isFinite(i)&&(this.activeNeuronMaxMul.set(i),this.app.onActiveNeuronMaxScaleMulChange(i))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-network-viz3d-shell"]],decls:55,vars:24,consts:[[1,"n3-vizshell","relative","h-full","min-h-0","w-full","bg-background","bg-[radial-gradient(100%_80%_at_50%_0%,rgba(54,211,166,0.09),transparent_58%)]"],["aria-label","3D-Netz Darstellung",1,"absolute","left-2","top-2","z-10","flex","max-w-[min(100%,22rem)]","flex-col","gap-2","rounded-md","border","border-border","bg-background/85","px-2","py-1.5","text-foreground","shadow-sm","backdrop-blur-sm"],[1,"flex","min-w-0","flex-col","gap-1"],[1,"flex","flex-wrap","items-center","gap-2"],["for","hiddenLayerVizLayout0",1,"w-8","shrink-0","text-[0.7rem]","font-medium","text-muted"],["id","hiddenLayerVizLayout0",1,"min-w-0","flex-1","rounded","border","border-border","bg-background","px-2","py-1","text-sm","text-foreground",3,"change"],["value","ring","selected",""],["value","grid"],["value","line"],["value","arc"],["value","arcAlt"],[1,"flex","min-w-0","items-center","gap-1.5","pl-8"],["for","hiddenLayerVizScale0",1,"shrink-0","text-[0.65rem]","text-muted"],["id","hiddenLayerVizScale0","type","range",1,"h-1.5","min-w-0","flex-1","cursor-pointer","accent-primary",3,"input","min","max","step","value"],[1,"w-7","shrink-0","text-right","text-[0.65rem]","tabular-nums","text-muted"],["for","hiddenLayerVizLayout1",1,"w-8","shrink-0","text-[0.7rem]","font-medium","text-muted"],["id","hiddenLayerVizLayout1",1,"min-w-0","flex-1","rounded","border","border-border","bg-background","px-2","py-1","text-sm","text-foreground",3,"change"],["for","hiddenLayerVizScale1",1,"shrink-0","text-[0.65rem]","text-muted"],["id","hiddenLayerVizScale1","type","range",1,"h-1.5","min-w-0","flex-1","cursor-pointer","accent-primary",3,"input","min","max","step","value"],[1,"mt-1","flex","min-w-0","flex-col","gap-1","border-t","border-border","pt-2"],[1,"flex","min-w-0","items-center","gap-1.5"],["for","activeNeuronMaxMul",1,"max-w-[5.5rem]","shrink-0","text-[0.65rem]","leading-tight","text-muted"],["id","activeNeuronMaxMul","type","range",1,"h-1.5","min-w-0","flex-1","cursor-pointer","accent-primary",3,"input","min","max","step","value"],["id","viz",1,"absolute","inset-0","min-h-0"]],template:function(t,i){t&1&&(K(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"label",4),ae(5,"H1"),ee(),K(6,"select",5),nt("change",function(o){return i.onHiddenLayout(0,o)}),K(7,"option",6),ae(8,"Ring"),ee(),K(9,"option",7),ae(10,"Raster"),ee(),K(11,"option",8),ae(12,"Linie"),ee(),K(13,"option",9),ae(14,"Bogen, Richtung 1"),ee(),K(15,"option",10),ae(16,"Bogen, Richtung 2"),ee()()(),K(17,"div",11)(18,"label",12),ae(19,"Skala"),ee(),K(20,"input",13),nt("input",function(o){return i.onScale(0,o)}),ee(),K(21,"span",14),ae(22),Fu(23,"number"),ee()()(),K(24,"div",2)(25,"div",3)(26,"label",15),ae(27,"H2"),ee(),K(28,"select",16),nt("change",function(o){return i.onHiddenLayout(1,o)}),K(29,"option",6),ae(30,"Ring"),ee(),K(31,"option",7),ae(32,"Raster"),ee(),K(33,"option",8),ae(34,"Linie"),ee(),K(35,"option",9),ae(36,"Bogen, Richtung 1"),ee(),K(37,"option",10),ae(38,"Bogen, Richtung 2"),ee()()(),K(39,"div",11)(40,"label",17),ae(41,"Skala"),ee(),K(42,"input",18),nt("input",function(o){return i.onScale(1,o)}),ee(),K(43,"span",14),ae(44),Fu(45,"number"),ee()()(),K(46,"div",19)(47,"div",20)(48,"label",21),ae(49,"Max. Gr\xF6\xDFe aktiv"),ee(),K(50,"input",22),nt("input",function(o){return i.onActiveNeuronMaxMul(o)}),ee(),K(51,"span",14),ae(52),Fu(53,"number"),ee()()()(),Mt(54,"div",23),ee()),t&2&&(Te(20),jn("min",i.scaleMin)("max",i.scaleMax)("step",i.scaleStep)("value",i.scale0()),Te(2),Tn(ku(23,15,i.scale0(),"1.0-2")),Te(20),jn("min",i.scaleMin)("max",i.scaleMax)("step",i.scaleStep)("value",i.scale1()),Te(2),Tn(ku(45,18,i.scale1(),"1.0-2")),Te(6),jn("min",i.neuronMulMin)("max",i.neuronMulMax)("step",i.neuronMulStep)("value",i.activeNeuronMaxMul()),Te(2),Tn(ku(53,21,i.activeNeuronMaxMul(),"1.0-2")))},dependencies:[km],encapsulation:2,changeDetection:0})};var Jf=class n{store=ce(Wt);saveAs(){this.store.dispatch(re.uiSaveAsRequested())}reset(){this.store.dispatch(re.uiResetRequested())}epochPreset(e){this.store.dispatch(re.uiEpochPresetRequested({epochs:e}))}epochsInput(){this.store.dispatch(re.uiEpochsInputChanged())}batchSizeInput(){this.store.dispatch(re.uiBatchSizeInputChanged())}trainStart(){this.store.dispatch(re.uiTrainStartRequested())}pauseToggle(){this.store.dispatch(re.trainingPauseToggled())}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-training-panel"]],decls:49,vars:4,consts:[["id","dockTrain",1,"n3-panel","n3-panel--train"],[1,"n3-panelhead","shrink-0"],[1,"n3-paneltitle","text-foreground"],[1,"n3-panelsub","text-muted"],["id","datasetRibbon","aria-live","polite",1,"n3-ribbon","text-muted"],[1,"n3-active","flex","flex-col","gap-1"],["id","activeModelTitle",1,"n3-active-title","text-foreground"],["id","activeModelDetail",1,"n3-active-detail","text-muted"],[1,"n3-row","flex","flex-wrap","items-center","gap-2"],["id","btnSaveModelAs","type","button","disabled","",1,"n3-btn","border-border",3,"click"],["id","btnResetModel","type","button","disabled","",1,"n3-btn","n3-btn--ghost",3,"click"],[1,"n3-field","flex","flex-col","gap-1.5"],[1,"n3-label","font-semibold","uppercase","tracking-widest","text-muted","text-[0.65rem]"],["id","epochPresetRow",1,"n3-chips","flex","flex-wrap","gap-1.5"],["type","button",1,"epochPresetBtn",3,"click"],["for","epochsInput",1,"n3-labelrow","text-[0.72rem]","text-muted"],["id","epochsInput","type","number","min","1","max","200","step","1","value","1",3,"input"],["id","epochStepHint","aria-live","polite",1,"n3-hint","text-muted"],[1,"n3-row","n3-row--grow","flex","flex-wrap","items-center","gap-2"],["id","btnTrain","type","button","disabled","",1,"n3-btn","n3-btn--primary",3,"click"],["id","btnPause","type","button","disabled","",1,"n3-btn","border-border",3,"click"],["id","trainAdvanced",1,"n3-advanced","border-border-soft"],[1,"cursor-pointer","text-[0.74rem]","text-muted"],[1,"n3-advancedgrid","mt-2","grid","grid-cols-2","gap-x-3","gap-y-2"],["for","lrInput",1,"text-[0.68rem]","text-muted"],["id","lrInput","type","number","min","0.0001","max","1","step","0.0001","value","0.02"],["for","batchSizeInput",1,"text-[0.68rem]","text-muted"],["id","batchSizeInput","type","number","min","1","max","512","step","1","value","32",3,"input"],["for","vizEveryInput",1,"text-[0.68rem]","text-muted"],["id","vizEveryInput","type","number","min","1","max","1000","step","1","value","4"]],template:function(t,i){t&1&&(K(0,"article",0)(1,"div",1)(2,"h2",2),ae(3,"Training"),ee(),K(4,"p",3),ae(5,"Weiterlernen mit dem aktuell gew\xE4hlten Modell"),ee()(),Mt(6,"p",4),K(7,"div",5),Mt(8,"p",6)(9,"p",7),K(10,"div",8)(11,"button",9),nt("click",function(){return i.saveAs()}),ae(12," Als neuen Stand speichern "),ee(),K(13,"button",10),nt("click",function(){return i.reset()}),ae(14," Gewichte zur\xFCcksetzen "),ee()()(),K(15,"div",11)(16,"span",12),ae(17,"Epochen"),ee(),K(18,"div",13)(19,"button",14),nt("click",function(){return i.epochPreset(1)}),ae(20," 1 "),ee(),K(21,"button",14),nt("click",function(){return i.epochPreset(3)}),ae(22," 3 "),ee(),K(23,"button",14),nt("click",function(){return i.epochPreset(10)}),ae(24," 10 "),ee(),K(25,"button",14),nt("click",function(){return i.epochPreset(30)}),ae(26," 30 "),ee()(),K(27,"label",15),ae(28,"Anzahl (1\u2013200)"),ee(),K(29,"input",16),nt("input",function(){return i.epochsInput()}),ee()(),Mt(30,"p",17),K(31,"div",18)(32,"button",19),nt("click",function(){return i.trainStart()}),ae(33," Training starten "),ee(),K(34,"button",20),nt("click",function(){return i.pauseToggle()}),ae(35," Anhalten "),ee()(),K(36,"details",21)(37,"summary",22),ae(38,"Erweitert"),ee(),K(39,"div",23)(40,"label",24),ae(41,"Lernrate"),ee(),Mt(42,"input",25),K(43,"label",26),ae(44,"Batch"),ee(),K(45,"input",27),nt("input",function(){return i.batchSizeInput()}),ee(),K(46,"label",28),ae(47,"3D alle N Batches"),ee(),Mt(48,"input",29),ee()()()),t&2&&(Te(19),Et("data-epochs",1),Te(2),Et("data-epochs",3),Te(2),Et("data-epochs",10),Te(2),Et("data-epochs",30))},encapsulation:2,changeDetection:0})};var Qf=class n{title=cm("Neuronal3D");subtitle=cm("MNIST \xB7 MLP 784 \u2192 64 \u2192 32 \u2192 10");static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-workspace-brand"]],inputs:{title:[1,"title"],subtitle:[1,"subtitle"]},decls:7,vars:2,consts:[[1,"n3-brand","flex","items-center","gap-3","min-w-0"],["aria-hidden","true",1,"n3-logo","shrink-0"],[1,"n3-brandtext","flex","min-w-0","flex-col","gap-0.5"],[1,"n3-brandtitle","text-foreground","text-[1.05rem]","font-bold","tracking-tight"],[1,"n3-brandsub","text-muted","text-[0.7rem]","tracking-wide"]],template:function(t,i){t&1&&(K(0,"div",0),Mt(1,"div",1),K(2,"div",2)(3,"span",3),ae(4),ee(),K(5,"span",4),ae(6),ee()()()),t&2&&(Te(4),Tn(i.title()),Te(2),Tn(i.subtitle()))},encapsulation:2,changeDetection:0})};var eh=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-workspace-status"]],decls:4,vars:0,consts:[[1,"n3-statusbar"],[1,"n3-statusbar-kicker"],["id","status","role","status","aria-live","polite","aria-atomic","true",1,"n3-status"]],template:function(t,i){t&1&&(K(0,"div",0)(1,"span",1),ae(2,"Aktueller Zustand"),ee(),Mt(3,"span",2),ee())},encapsulation:2,changeDetection:0})};var rB=["appRoot"],th=class n{appRoot;sidebarTab=hi("train");store=ce(Wt);neuronalApp=ce(zi);appInstance=ce(Ma);teardown=null;ngAfterViewInit(){this.teardown=this.neuronalApp.start(this.appRoot.nativeElement,this.appInstance)}ngOnDestroy(){this.teardown?.(),this.teardown=null}onDocumentPointerDown(e){this.store.dispatch(re.uiDocumentPointerDown({event:e}))}onDocumentKeydown(e){e.key==="Escape"&&this.store.dispatch(re.modelDropdownSetOpen({open:!1}))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-neuronal-workspace"]],viewQuery:function(t,i){if(t&1&&qM(rB,5,Mo),t&2){let r;XM(r=YM())&&(i.appRoot=r.first)}},hostBindings:function(t,i){t&1&&nt("pointerdown",function(o){return i.onDocumentPointerDown(o)},!1,fm)("keydown",function(o){return i.onDocumentKeydown(o)},!1,fm)},decls:23,vars:8,consts:[["appRoot",""],["id","app",1,"n3-root"],[1,"n3-topbar"],[1,"n3-topcontrols"],[1,"n3-layout"],[1,"n3-main"],["aria-label","Netzwerk-Visualisierung",1,"n3-stagecard"],["aria-label","Training, Epochen und Inferenz",1,"n3-sidebar"],["role","tablist","aria-label","Seitenleiste",1,"n3-sidebartabs"],["type","button","role","tab","id","tab-sidebar-train","aria-controls","panel-sidebar-train",1,"n3-sidebartab",3,"click"],["type","button","role","tab","id","tab-sidebar-infer","aria-controls","panel-sidebar-infer",1,"n3-sidebartab",3,"click"],[1,"n3-sidebarbody"],["id","panel-sidebar-train","role","tabpanel","aria-labelledby","tab-sidebar-train",1,"n3-sidebarpanel","n3-sidebarpanel--train",3,"hidden"],["id","panel-sidebar-infer","role","tabpanel","aria-labelledby","tab-sidebar-infer",1,"n3-sidebarpanel","n3-sidebarpanel--infer",3,"hidden"]],template:function(t,i){if(t&1){let r=Ou();K(0,"div",1,0)(2,"header",2),Mt(3,"app-workspace-brand"),K(4,"div",3),Mt(5,"app-neuronal-model-bar")(6,"app-workspace-status"),ee()(),K(7,"div",4)(8,"main",5)(9,"section",6),Mt(10,"app-network-viz3d-shell"),ee()(),K(11,"section",7)(12,"div",8)(13,"button",9),nt("click",function(){return ac(r),cc(i.sidebarTab.set("train"))}),ae(14," Training "),ee(),K(15,"button",10),nt("click",function(){return ac(r),cc(i.sidebarTab.set("infer"))}),ae(16," Inferenz "),ee()(),K(17,"div",11)(18,"div",12),Mt(19,"app-training-panel")(20,"app-epoch-track-list"),ee(),K(21,"div",13),Mt(22,"app-infer-panel"),ee()()()()()}t&2&&(Te(13),rr("n3-sidebartab--active",i.sidebarTab()==="train"),Et("aria-selected",i.sidebarTab()==="train"),Te(2),rr("n3-sidebartab--active",i.sidebarTab()==="infer"),Et("aria-selected",i.sidebarTab()==="infer"),Te(3),jn("hidden",i.sidebarTab()!=="train"),Te(3),jn("hidden",i.sidebarTab()!=="infer"))},dependencies:[Qf,Zf,eh,Kf,Jf,Xf,Yf],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}"]})};var nh=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=an({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Mt(0,"app-neuronal-workspace")},dependencies:[th],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"]})};qm(nh,nT).catch(n=>console.error(n));
