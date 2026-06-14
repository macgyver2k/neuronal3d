var ZE=Object.defineProperty,KE=Object.defineProperties;var JE=Object.getOwnPropertyDescriptors;var Bv=Object.getOwnPropertySymbols;var QE=Object.prototype.hasOwnProperty,eC=Object.prototype.propertyIsEnumerable;var Hv=(t,e,n)=>e in t?ZE(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,y=(t,e)=>{for(var n in e||={})QE.call(e,n)&&Hv(t,n,e[n]);if(Bv)for(var n of Bv(e))eC.call(e,n)&&Hv(t,n,e[n]);return t},M=(t,e)=>KE(t,JE(e));var X=(t,e,n)=>new Promise((i,r)=>{var o=l=>{try{a(n.next(l))}catch(c){r(c)}},s=l=>{try{a(n.throw(l))}catch(c){r(c)}},a=l=>l.done?i(l.value):Promise.resolve(l.value).then(o,s);a((n=n.apply(t,e)).next())});function Wd(t,e){return Object.is(t,e)}var rt=null,hl=!1,jd=1,jt=Symbol("SIGNAL");function ae(t){let e=rt;return rt=t,e}function Gd(){return rt}var Kr={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Ds(t){if(hl)throw new Error("");if(rt===null)return;rt.consumerOnSignalRead(t);let e=rt.nextProducerIndex++;if(yl(rt),e<rt.producerNode.length&&rt.producerNode[e]!==t&&Is(rt)){let n=rt.producerNode[e];vl(n,rt.producerIndexOfThis[e])}rt.producerNode[e]!==t&&(rt.producerNode[e]=t,rt.producerIndexOfThis[e]=Is(rt)?jv(t,rt,e):0),rt.producerLastReadVersion[e]=t.version}function Wv(){jd++}function $d(t){if(!(Is(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===jd)){if(!t.producerMustRecompute(t)&&!gl(t)){Hd(t);return}t.producerRecomputeValue(t),Hd(t)}}function qd(t){if(t.liveConsumerNode===void 0)return;let e=hl;hl=!0;try{for(let n of t.liveConsumerNode)n.dirty||tC(n)}finally{hl=e}}function Xd(){return rt?.consumerAllowSignalWrites!==!1}function tC(t){t.dirty=!0,qd(t),t.consumerMarkedDirty?.(t)}function Hd(t){t.dirty=!1,t.lastCleanEpoch=jd}function As(t){return t&&(t.nextProducerIndex=0),ae(t)}function ml(t,e){if(ae(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(Is(t))for(let n=t.nextProducerIndex;n<t.producerNode.length;n++)vl(t.producerNode[n],t.producerIndexOfThis[n]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function gl(t){yl(t);for(let e=0;e<t.producerNode.length;e++){let n=t.producerNode[e],i=t.producerLastReadVersion[e];if(i!==n.version||($d(n),i!==n.version))return!0}return!1}function Rs(t){if(yl(t),Is(t))for(let e=0;e<t.producerNode.length;e++)vl(t.producerNode[e],t.producerIndexOfThis[e]);t.producerNode.length=t.producerLastReadVersion.length=t.producerIndexOfThis.length=0,t.liveConsumerNode&&(t.liveConsumerNode.length=t.liveConsumerIndexOfThis.length=0)}function jv(t,e,n){if(Gv(t),t.liveConsumerNode.length===0&&$v(t))for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=jv(t.producerNode[i],t,i);return t.liveConsumerIndexOfThis.push(n),t.liveConsumerNode.push(e)-1}function vl(t,e){if(Gv(t),t.liveConsumerNode.length===1&&$v(t))for(let i=0;i<t.producerNode.length;i++)vl(t.producerNode[i],t.producerIndexOfThis[i]);let n=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[n],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[n],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let i=t.liveConsumerIndexOfThis[e],r=t.liveConsumerNode[e];yl(r),r.producerIndexOfThis[i]=e}}function Is(t){return t.consumerIsAlwaysLive||(t?.liveConsumerNode?.length??0)>0}function yl(t){t.producerNode??=[],t.producerIndexOfThis??=[],t.producerLastReadVersion??=[]}function Gv(t){t.liveConsumerNode??=[],t.liveConsumerIndexOfThis??=[]}function $v(t){return t.producerNode!==void 0}function _l(t,e){let n=Object.create(nC);n.computation=t,e!==void 0&&(n.equal=e);let i=()=>{if($d(n),Ds(n),n.value===pl)throw n.error;return n.value};return i[jt]=n,i}var zd=Symbol("UNSET"),Bd=Symbol("COMPUTING"),pl=Symbol("ERRORED"),nC=M(y({},Kr),{value:zd,dirty:!0,error:null,equal:Wd,kind:"computed",producerMustRecompute(t){return t.value===zd||t.value===Bd},producerRecomputeValue(t){if(t.value===Bd)throw new Error("Detected cycle in computations.");let e=t.value;t.value=Bd;let n=As(t),i,r=!1;try{i=t.computation(),ae(null),r=e!==zd&&e!==pl&&i!==pl&&t.equal(e,i)}catch(o){i=pl,t.error=o}finally{ml(t,n)}if(r){t.value=e;return}t.value=i,t.version++}});function iC(){throw new Error}var qv=iC;function Xv(t){qv(t)}function Yd(t){qv=t}var rC=null;function Zd(t,e){let n=Object.create(xl);n.value=t,e!==void 0&&(n.equal=e);let i=()=>(Ds(n),n.value);return i[jt]=n,i}function Ns(t,e){Xd()||Xv(t),t.equal(t.value,e)||(t.value=e,oC(t))}function Kd(t,e){Xd()||Xv(t),Ns(t,e(t.value))}var xl=M(y({},Kr),{equal:Wd,value:void 0,kind:"signal"});function oC(t){t.version++,Wv(),qd(t),rC?.()}function Jd(t){let e=ae(null);try{return t()}finally{ae(e)}}var Qd;function Ps(){return Qd}function Zn(t){let e=Qd;return Qd=t,e}var bl=Symbol("NotFound");function J(t){return typeof t=="function"}function bi(t){let n=t(i=>{Error.call(i),i.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Sl=bi(t=>function(n){t(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function qi(t,e){if(t){let n=t.indexOf(e);0<=n&&t.splice(n,1)}}var $e=class t{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let o of n)o.remove(this);else n.remove(this);let{initialTeardown:i}=this;if(J(i))try{i()}catch(o){e=o instanceof Sl?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{Yv(o)}catch(s){e=e??[],s instanceof Sl?e=[...e,...s.errors]:e.push(s)}}if(e)throw new Sl(e)}}add(e){var n;if(e&&e!==this)if(this.closed)Yv(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(e)}}_hasParent(e){let{_parentage:n}=this;return n===e||Array.isArray(n)&&n.includes(e)}_addParent(e){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(e),n):n?[n,e]:e}_removeParent(e){let{_parentage:n}=this;n===e?this._parentage=null:Array.isArray(n)&&qi(n,e)}remove(e){let{_finalizers:n}=this;n&&qi(n,e),e instanceof t&&e._removeParent(this)}};$e.EMPTY=(()=>{let t=new $e;return t.closed=!0,t})();var ef=$e.EMPTY;function wl(t){return t instanceof $e||t&&"closed"in t&&J(t.remove)&&J(t.add)&&J(t.unsubscribe)}function Yv(t){J(t)?t():t.unsubscribe()}var dn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Jr={setTimeout(t,e,...n){let{delegate:i}=Jr;return i?.setTimeout?i.setTimeout(t,e,...n):setTimeout(t,e,...n)},clearTimeout(t){let{delegate:e}=Jr;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Ml(t){Jr.setTimeout(()=>{let{onUnhandledError:e}=dn;if(e)e(t);else throw t})}function Kn(){}var Zv=tf("C",void 0,void 0);function Kv(t){return tf("E",void 0,t)}function Jv(t){return tf("N",t,void 0)}function tf(t,e,n){return{kind:t,value:e,error:n}}var Xi=null;function Qr(t){if(dn.useDeprecatedSynchronousErrorHandling){let e=!Xi;if(e&&(Xi={errorThrown:!1,error:null}),t(),e){let{errorThrown:n,error:i}=Xi;if(Xi=null,n)throw i}}else t()}function Qv(t){dn.useDeprecatedSynchronousErrorHandling&&Xi&&(Xi.errorThrown=!0,Xi.error=t)}var Yi=class extends $e{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,wl(e)&&e.add(this)):this.destination=dC}static create(e,n,i){return new fn(e,n,i)}next(e){this.isStopped?rf(Jv(e),this):this._next(e)}error(e){this.isStopped?rf(Kv(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?rf(Zv,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},cC=Function.prototype.bind;function nf(t,e){return cC.call(t,e)}var of=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:n}=this;if(n.next)try{n.next(e)}catch(i){El(i)}}error(e){let{partialObserver:n}=this;if(n.error)try{n.error(e)}catch(i){El(i)}else El(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(n){El(n)}}},fn=class extends Yi{constructor(e,n,i){super();let r;if(J(e)||!e)r={next:e??void 0,error:n??void 0,complete:i??void 0};else{let o;this&&dn.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&nf(e.next,o),error:e.error&&nf(e.error,o),complete:e.complete&&nf(e.complete,o)}):r=e}this.destination=new of(r)}};function El(t){dn.useDeprecatedSynchronousErrorHandling?Qv(t):Ml(t)}function uC(t){throw t}function rf(t,e){let{onStoppedNotification:n}=dn;n&&Jr.setTimeout(()=>n(t,e))}var dC={closed:!0,next:Kn,error:uC,complete:Kn};var eo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function dt(t){return t}function sf(...t){return af(t)}function af(t){return t.length===0?dt:t.length===1?t[0]:function(n){return t.reduce((i,r)=>r(i),n)}}var le=(()=>{class t{constructor(n){n&&(this._subscribe=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}subscribe(n,i,r){let o=hC(n)?n:new fn(n,i,r);return Qr(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(n){try{return this._subscribe(n)}catch(i){n.error(i)}}forEach(n,i){return i=ey(i),new i((r,o)=>{let s=new fn({next:a=>{try{n(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(n){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(n)}[eo](){return this}pipe(...n){return af(n)(this)}toPromise(n){return n=ey(n),new n((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=e=>new t(e),t})();function ey(t){var e;return(e=t??dn.Promise)!==null&&e!==void 0?e:Promise}function fC(t){return t&&J(t.next)&&J(t.error)&&J(t.complete)}function hC(t){return t&&t instanceof Yi||fC(t)&&wl(t)}function lf(t){return J(t?.lift)}function G(t){return e=>{if(lf(e))return e.lift(function(n){try{return t(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function $(t,e,n,i,r){return new Ls(t,e,n,i,r)}var Ls=class extends Yi{constructor(e,n,i,r,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(l){e.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){e.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function to(){return G((t,e)=>{let n=null;t._refCount++;let i=$(e,void 0,void 0,void 0,()=>{if(!t||t._refCount<=0||0<--t._refCount){n=null;return}let r=t._connection,o=n;n=null,r&&(!o||r===o)&&r.unsubscribe(),e.unsubscribe()});t.subscribe(i),i.closed||(n=t.connect())})}var no=class extends le{constructor(e,n){super(),this.source=e,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,lf(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new $e;let n=this.getSubject();e.add(this.source.subscribe($(n,void 0,()=>{this._teardown(),n.complete()},i=>{this._teardown(),n.error(i)},()=>this._teardown()))),e.closed&&(this._connection=null,e=$e.EMPTY)}return e}refCount(){return to()(this)}};var ty=bi(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ae=(()=>{class t extends le{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let i=new Cl(this,this);return i.operator=n,i}_throwIfClosed(){if(this.closed)throw new ty}next(n){Qr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(n)}})}error(n){Qr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:i}=this;for(;i.length;)i.shift().error(n)}})}complete(){Qr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:i,isStopped:r,observers:o}=this;return i||r?ef:(this.currentObservers=null,o.push(n),new $e(()=>{this.currentObservers=null,qi(o,n)}))}_checkFinalizedStatuses(n){let{hasError:i,thrownError:r,isStopped:o}=this;i?n.error(r):o&&n.complete()}asObservable(){let n=new le;return n.source=this,n}}return t.create=(e,n)=>new Cl(e,n),t})(),Cl=class extends Ae{constructor(e,n){super(),this.destination=e,this.source=n}next(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.next)===null||i===void 0||i.call(n,e)}error(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.error)===null||i===void 0||i.call(n,e)}complete(){var e,n;(n=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||n===void 0||n.call(e)}_subscribe(e){var n,i;return(i=(n=this.source)===null||n===void 0?void 0:n.subscribe(e))!==null&&i!==void 0?i:ef}};var Xe=class extends Ae{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let n=super._subscribe(e);return!n.closed&&e.next(this._value),n}getValue(){let{hasError:e,thrownError:n,_value:i}=this;if(e)throw n;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var Os={now(){return(Os.delegate||Date).now()},delegate:void 0};var ks=class extends Ae{constructor(e=1/0,n=1/0,i=Os){super(),this._bufferSize=e,this._windowTime=n,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,e),this._windowTime=Math.max(1,n)}next(e){let{isStopped:n,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;n||(i.push(e),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(e)}_subscribe(e){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(e),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!e.closed;s+=i?1:2)e.next(o[s]);return this._checkFinalizedStatuses(e),n}_trimBuffer(){let{_bufferSize:e,_timestampProvider:n,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*e;if(e<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=n.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Tl=class extends $e{constructor(e,n){super()}schedule(e,n=0){return this}};var Fs={setInterval(t,e,...n){let{delegate:i}=Fs;return i?.setInterval?i.setInterval(t,e,...n):setInterval(t,e,...n)},clearInterval(t){let{delegate:e}=Fs;return(e?.clearInterval||clearInterval)(t)},delegate:void 0};var io=class extends Tl{constructor(e,n){super(e,n),this.scheduler=e,this.work=n,this.pending=!1}schedule(e,n=0){var i;if(this.closed)return this;this.state=e;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,n)),this.pending=!0,this.delay=n,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,n),this}requestAsyncId(e,n,i=0){return Fs.setInterval(e.flush.bind(e,this),i)}recycleAsyncId(e,n,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return n;n!=null&&Fs.clearInterval(n)}execute(e,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(e,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,n){let i=!1,r;try{this.work(e)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:e,scheduler:n}=this,{actions:i}=n;this.work=this.state=this.scheduler=null,this.pending=!1,qi(i,this),e!=null&&(this.id=this.recycleAsyncId(n,e,null)),this.delay=null,super.unsubscribe()}}};var ro=class t{constructor(e,n=t.now){this.schedulerActionCtor=e,this.now=n}schedule(e,n=0,i){return new this.schedulerActionCtor(this,e).schedule(i,n)}};ro.now=Os.now;var oo=class extends ro{constructor(e,n=ro.now){super(e,n),this.actions=[],this._active=!1}flush(e){let{actions:n}=this;if(this._active){n.push(e);return}let i;this._active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=n.shift());if(this._active=!1,i){for(;e=n.shift();)e.unsubscribe();throw i}}};var Jn=new oo(io);var Il=class extends io{constructor(e,n){super(e,n),this.scheduler=e,this.work=n}schedule(e,n=0){return n>0?super.schedule(e,n):(this.delay=n,this.state=e,this.scheduler.flush(this),this)}execute(e,n){return n>0||this.closed?super.execute(e,n):this._execute(e,n)}requestAsyncId(e,n,i=0){return i!=null&&i>0||i==null&&this.delay>0?super.requestAsyncId(e,n,i):(e.flush(this),0)}};var Dl=class extends oo{};var Vs=new Dl(Il);var We=new le(t=>t.complete());function ny(t){return t&&J(t.schedule)}function cf(t){return t[t.length-1]}function Al(t){return J(cf(t))?t.pop():void 0}function Dn(t){return ny(cf(t))?t.pop():void 0}function iy(t,e){return typeof cf(t)=="number"?t.pop():e}function oy(t,e,n,i){function r(o){return o instanceof n?o:new n(function(s){s(o)})}return new(n||(n=Promise))(function(o,s){function a(u){try{c(i.next(u))}catch(d){s(d)}}function l(u){try{c(i.throw(u))}catch(d){s(d)}}function c(u){u.done?o(u.value):r(u.value).then(a,l)}c((i=i.apply(t,e||[])).next())})}function ry(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Zi(t){return this instanceof Zi?(this.v=t,this):new Zi(t)}function sy(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(t,e||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(f){return function(v){return Promise.resolve(v).then(f,d)}}function a(f,v){i[f]&&(r[f]=function(b){return new Promise(function(R,P){o.push([f,b,R,P])>1||l(f,b)})},v&&(r[f]=v(r[f])))}function l(f,v){try{c(i[f](v))}catch(b){m(o[0][3],b)}}function c(f){f.value instanceof Zi?Promise.resolve(f.value.v).then(u,d):m(o[0][2],f)}function u(f){l("next",f)}function d(f){l("throw",f)}function m(f,v){f(v),o.shift(),o.length&&l(o[0][0],o[0][1])}}function ay(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],n;return e?e.call(t):(t=typeof ry=="function"?ry(t):t[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(o){n[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var Rl=t=>t&&typeof t.length=="number"&&typeof t!="function";function Nl(t){return J(t?.then)}function Pl(t){return J(t[eo])}function Ll(t){return Symbol.asyncIterator&&J(t?.[Symbol.asyncIterator])}function Ol(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function pC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var kl=pC();function Fl(t){return J(t?.[kl])}function Vl(t){return sy(this,arguments,function*(){let n=t.getReader();try{for(;;){let{value:i,done:r}=yield Zi(n.read());if(r)return yield Zi(void 0);yield yield Zi(i)}}finally{n.releaseLock()}})}function Ul(t){return J(t?.getReader)}function Se(t){if(t instanceof le)return t;if(t!=null){if(Pl(t))return mC(t);if(Rl(t))return gC(t);if(Nl(t))return vC(t);if(Ll(t))return ly(t);if(Fl(t))return yC(t);if(Ul(t))return _C(t)}throw Ol(t)}function mC(t){return new le(e=>{let n=t[eo]();if(J(n.subscribe))return n.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function gC(t){return new le(e=>{for(let n=0;n<t.length&&!e.closed;n++)e.next(t[n]);e.complete()})}function vC(t){return new le(e=>{t.then(n=>{e.closed||(e.next(n),e.complete())},n=>e.error(n)).then(null,Ml)})}function yC(t){return new le(e=>{for(let n of t)if(e.next(n),e.closed)return;e.complete()})}function ly(t){return new le(e=>{xC(t,e).catch(n=>e.error(n))})}function _C(t){return ly(Vl(t))}function xC(t,e){var n,i,r,o;return oy(this,void 0,void 0,function*(){try{for(n=ay(t);i=yield n.next(),!i.done;){let s=i.value;if(e.next(s),e.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=n.return)&&(yield o.call(n))}finally{if(r)throw r.error}}e.complete()})}function yt(t,e,n,i=0,r=!1){let o=e.schedule(function(){n(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function hn(t,e=0){return G((n,i)=>{n.subscribe($(i,r=>yt(i,t,()=>i.next(r),e),()=>yt(i,t,()=>i.complete(),e),r=>yt(i,t,()=>i.error(r),e)))})}function zl(t,e=0){return G((n,i)=>{i.add(t.schedule(()=>n.subscribe(i),e))})}function cy(t,e){return Se(t).pipe(zl(e),hn(e))}function uy(t,e){return Se(t).pipe(zl(e),hn(e))}function dy(t,e){return new le(n=>{let i=0;return e.schedule(function(){i===t.length?n.complete():(n.next(t[i++]),n.closed||this.schedule())})})}function fy(t,e){return new le(n=>{let i;return yt(n,e,()=>{i=t[kl](),yt(n,e,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){n.error(s);return}o?n.complete():n.next(r)},0,!0)}),()=>J(i?.return)&&i.return()})}function Bl(t,e){if(!t)throw new Error("Iterable cannot be null");return new le(n=>{yt(n,e,()=>{let i=t[Symbol.asyncIterator]();yt(n,e,()=>{i.next().then(r=>{r.done?n.complete():n.next(r.value)})},0,!0)})})}function hy(t,e){return Bl(Vl(t),e)}function py(t,e){if(t!=null){if(Pl(t))return cy(t,e);if(Rl(t))return dy(t,e);if(Nl(t))return uy(t,e);if(Ll(t))return Bl(t,e);if(Fl(t))return fy(t,e);if(Ul(t))return hy(t,e)}throw Ol(t)}function Fe(t,e){return e?py(t,e):Se(t)}function q(...t){let e=Dn(t);return Fe(t,e)}function Si(t,e){let n=J(t)?t:()=>t,i=r=>r.error(n());return new le(e?r=>e.schedule(i,0,r):i)}var wi=class t{constructor(e,n,i){this.kind=e,this.value=n,this.error=i,this.hasValue=e==="N"}observe(e){return uf(this,e)}do(e,n,i){let{kind:r,value:o,error:s}=this;return r==="N"?e?.(o):r==="E"?n?.(s):i?.()}accept(e,n,i){var r;return J((r=e)===null||r===void 0?void 0:r.next)?this.observe(e):this.do(e,n,i)}toObservable(){let{kind:e,value:n,error:i}=this,r=e==="N"?q(n):e==="E"?Si(()=>i):e==="C"?We:0;if(!r)throw new TypeError(`Unexpected notification kind ${e}`);return r}static createNext(e){return new t("N",e)}static createError(e){return new t("E",void 0,e)}static createComplete(){return t.completeNotification}};wi.completeNotification=new wi("C");function uf(t,e){var n,i,r;let{kind:o,value:s,error:a}=t;if(typeof o!="string")throw new TypeError('Invalid notification, missing "kind"');o==="N"?(n=e.next)===null||n===void 0||n.call(e,s):o==="E"?(i=e.error)===null||i===void 0||i.call(e,a):(r=e.complete)===null||r===void 0||r.call(e)}function df(t){return!!t&&(t instanceof le||J(t.lift)&&J(t.subscribe))}var pn=bi(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function Us(t,e){let n=typeof e=="object";return new Promise((i,r)=>{let o=new fn({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{n?i(e.defaultValue):r(new pn)}});t.subscribe(o)})}function my(t){return t instanceof Date&&!isNaN(t)}var bC=bi(t=>function(n=null){t(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=n});function ff(t,e){let{first:n,each:i,with:r=SC,scheduler:o=e??Jn,meta:s=null}=my(t)?{first:t}:typeof t=="number"?{each:t}:t;if(n==null&&i==null)throw new TypeError("No timeout provided.");return G((a,l)=>{let c,u,d=null,m=0,f=v=>{u=yt(l,o,()=>{try{c.unsubscribe(),Se(r({meta:s,lastValue:d,seen:m})).subscribe(l)}catch(b){l.error(b)}},v)};c=a.subscribe($(l,v=>{u?.unsubscribe(),m++,l.next(d=v),i>0&&f(i)},void 0,void 0,()=>{u?.closed||u?.unsubscribe(),d=null})),!m&&f(n!=null?typeof n=="number"?n:+n-o.now():i)})}function SC(t){throw new bC(t)}function W(t,e){return G((n,i)=>{let r=0;n.subscribe($(i,o=>{i.next(t.call(e,o,r++))}))})}var{isArray:wC}=Array;function MC(t,e){return wC(e)?t(...e):t(e)}function gy(t){return W(e=>MC(t,e))}var{isArray:EC}=Array,{getPrototypeOf:CC,prototype:TC,keys:IC}=Object;function vy(t){if(t.length===1){let e=t[0];if(EC(e))return{args:e,keys:null};if(DC(e)){let n=IC(e);return{args:n.map(i=>e[i]),keys:n}}}return{args:t,keys:null}}function DC(t){return t&&typeof t=="object"&&CC(t)===TC}function yy(t,e){return t.reduce((n,i,r)=>(n[i]=e[r],n),{})}function Hl(...t){let e=Dn(t),n=Al(t),{args:i,keys:r}=vy(t);if(i.length===0)return Fe([],e);let o=new le(AC(i,e,r?s=>yy(r,s):dt));return n?o.pipe(gy(n)):o}function AC(t,e,n=dt){return i=>{_y(e,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)_y(e,()=>{let c=Fe(t[l],e),u=!1;c.subscribe($(i,d=>{o[l]=d,u||(u=!0,a--),a||i.next(n(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function _y(t,e,n){t?yt(n,t,e):e()}function xy(t,e,n,i,r,o,s,a){let l=[],c=0,u=0,d=!1,m=()=>{d&&!l.length&&!c&&e.complete()},f=b=>c<i?v(b):l.push(b),v=b=>{o&&e.next(b),c++;let R=!1;Se(n(b,u++)).subscribe($(e,P=>{r?.(P),o?f(P):e.next(P)},()=>{R=!0},void 0,()=>{if(R)try{for(c--;l.length&&c<i;){let P=l.shift();s?yt(e,s,()=>v(P)):v(P)}m()}catch(P){e.error(P)}}))};return t.subscribe($(e,f,()=>{d=!0,m()})),()=>{a?.()}}function Ve(t,e,n=1/0){return J(e)?Ve((i,r)=>W((o,s)=>e(i,o,r,s))(Se(t(i,r))),n):(typeof e=="number"&&(n=e),G((i,r)=>xy(i,r,t,n)))}function Wl(t=1/0){return Ve(dt,t)}function by(){return Wl(1)}function so(...t){return by()(Fe(t,Dn(t)))}function zs(t){return new le(e=>{Se(t()).subscribe(e)})}function Ki(...t){let e=Dn(t),n=iy(t,1/0),i=t;return i.length?i.length===1?Se(i[0]):Wl(n)(Fe(i,e)):We}function ge(t,e){return G((n,i)=>{let r=0;n.subscribe($(i,o=>t.call(e,o,r++)&&i.next(o)))})}function Qt(t){return G((e,n)=>{let i=null,r=!1,o;i=e.subscribe($(n,void 0,void 0,s=>{o=Se(t(s,Qt(t)(e))),i?(i.unsubscribe(),i=null,o.subscribe(n)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(n))})}function Sy(t,e,n,i,r){return(o,s)=>{let a=n,l=e,c=0;o.subscribe($(s,u=>{let d=c++;l=a?t(l,u,d):(a=!0,u),i&&s.next(l)},r&&(()=>{a&&s.next(l),s.complete()})))}}function At(t,e){return J(e)?Ve(t,e,1):Ve(t,1)}function ao(t,e=Jn){return G((n,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,u=e.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}a()}n.subscribe($(i,c=>{o=c,s=e.now(),r||(r=e.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function Mi(t){return G((e,n)=>{let i=!1;e.subscribe($(n,r=>{i=!0,n.next(r)},()=>{i||n.next(t),n.complete()}))})}function Ye(t){return t<=0?()=>We:G((e,n)=>{let i=0;e.subscribe($(n,r=>{++i<=t&&(n.next(r),t<=i&&n.complete())}))})}function hf(){return G((t,e)=>{t.subscribe($(e,Kn))})}function pf(){return G((t,e)=>{t.subscribe($(e,n=>uf(n,e)))})}function mf(t,e=dt){return t=t??RC,G((n,i)=>{let r,o=!0;n.subscribe($(i,s=>{let a=e(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function RC(t,e){return t===e}function jl(t=NC){return G((e,n)=>{let i=!1;e.subscribe($(n,r=>{i=!0,n.next(r)},()=>i?n.complete():n.error(t())))})}function NC(){return new pn}function Ji(t,e){return e?n=>n.pipe(Ji((i,r)=>Se(t(i,r)).pipe(W((o,s)=>e(i,o,r,s))))):G((n,i)=>{let r=0,o=null,s=!1;n.subscribe($(i,a=>{o||(o=$(i,void 0,()=>{o=null,s&&i.complete()}),Se(t(a,r++)).subscribe(o))},()=>{s=!0,!o&&i.complete()}))})}function lo(t){return G((e,n)=>{try{e.subscribe(n)}finally{n.add(t)}})}function Qn(t,e){let n=arguments.length>=2;return i=>i.pipe(t?ge((r,o)=>t(r,o,i)):dt,Ye(1),n?Mi(e):jl(()=>new pn))}function Gl(t,e,n,i){return G((r,o)=>{let s;!e||typeof e=="function"?s=e:{duration:n,element:s,connector:i}=e;let a=new Map,l=v=>{a.forEach(v),v(o)},c=v=>l(b=>b.error(v)),u=0,d=!1,m=new Ls(o,v=>{try{let b=t(v),R=a.get(b);if(!R){a.set(b,R=i?i():new Ae);let P=f(b,R);if(o.next(P),n){let H=$(R,()=>{R.complete(),H?.unsubscribe()},void 0,void 0,()=>a.delete(b));m.add(Se(n(P)).subscribe(H))}}R.next(s?s(v):v)}catch(b){c(b)}},()=>l(v=>v.complete()),c,()=>a.clear(),()=>(d=!0,u===0));r.subscribe(m);function f(v,b){let R=new le(P=>{u++;let H=b.subscribe(P);return()=>{H.unsubscribe(),--u===0&&d&&m.unsubscribe()}});return R.key=v,R}})}function co(t){return t<=0?()=>We:G((e,n)=>{let i=[];e.subscribe($(n,r=>{i.push(r),t<i.length&&i.shift()},()=>{for(let r of i)n.next(r);n.complete()},void 0,()=>{i=null}))})}function gf(t,e){let n=arguments.length>=2;return i=>i.pipe(t?ge((r,o)=>t(r,o,i)):dt,co(1),n?Mi(e):jl(()=>new pn))}function vf(){return G((t,e)=>{t.subscribe($(e,n=>{e.next(wi.createNext(n))},()=>{e.next(wi.createComplete()),e.complete()},n=>{e.next(wi.createError(n)),e.complete()}))})}function yf(...t){let e=t.length;if(e===0)throw new Error("list of properties cannot be empty.");return W(n=>{let i=n;for(let r=0;r<e;r++){let o=i?.[t[r]];if(typeof o<"u")i=o;else return}return i})}function Qi(t,e){return G(Sy(t,e,arguments.length>=2,!0))}function xf(t={}){let{connector:e=()=>new Ae,resetOnError:n=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,u=!1,d=!1,m=()=>{a?.unsubscribe(),a=void 0},f=()=>{m(),s=l=void 0,u=d=!1},v=()=>{let b=s;f(),b?.unsubscribe()};return G((b,R)=>{c++,!d&&!u&&m();let P=l=l??e();R.add(()=>{c--,c===0&&!d&&!u&&(a=_f(v,r))}),P.subscribe(R),!s&&c>0&&(s=new fn({next:H=>P.next(H),error:H=>{d=!0,m(),a=_f(f,n,H),P.error(H)},complete:()=>{u=!0,m(),a=_f(f,i),P.complete()}}),Se(b).subscribe(s))})(o)}}function _f(t,e,...n){if(e===!0){t();return}if(e===!1)return;let i=new fn({next:()=>{i.unsubscribe(),t()}});return Se(e(...n)).subscribe(i)}function uo(t){return ge((e,n)=>t<=n)}function bf(...t){let e=Dn(t);return G((n,i)=>{(e?so(t,n,e):so(t,n)).subscribe(i)})}function ft(t,e){return G((n,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();n.subscribe($(i,l=>{r?.unsubscribe();let c=0,u=o++;Se(t(l,u)).subscribe(r=$(i,d=>i.next(e?e(l,d,u,c++):d),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function er(t){return G((e,n)=>{Se(t).subscribe($(n,()=>n.complete(),Kn)),!n.closed&&e.subscribe(n)})}function K(t,e,n){let i=J(t)||e||n?{next:t,error:e,complete:n}:t;return i?G((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe($(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):dt}function Be(...t){let e=Al(t);return G((n,i)=>{let r=t.length,o=new Array(r),s=t.map(()=>!1),a=!1;for(let l=0;l<r;l++)Se(t[l]).subscribe($(i,c=>{o[l]=c,!a&&!s[l]&&(s[l]=!0,(a=s.every(dt))&&(s=null))},Kn));n.subscribe($(i,l=>{if(a){let c=[l,...o];i.next(e?e(...c):c)}}))})}var f0="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",B=class extends Error{code;constructor(e,n){super(h0(e,n)),this.code=e}};function PC(t){return`NG0${Math.abs(t)}`}function h0(t,e){return`${PC(t)}${e?": "+e:""}`}var p0=Symbol("InputSignalNode#UNSET"),LC=M(y({},xl),{transformFn:void 0,applyValueToInputSignal(t,e){Ns(t,e)}});function m0(t,e){let n=Object.create(LC);n.value=t,n.transformFn=e?.transform;function i(){if(Ds(n),n.value===p0){let r=null;throw new B(-950,r)}return n.value}return i[jt]=n,i}function Tc(t){return{toString:t}.toString()}var $l="__parameters__";function OC(t){return function(...n){if(t){let i=t(...n);for(let r in i)this[r]=i[r]}}}function kC(t,e,n){return Tc(()=>{let i=OC(e);function r(...o){if(this instanceof r)return i.apply(this,o),this;let s=new r(...o);return a.annotation=s,a;function a(l,c,u){let d=l.hasOwnProperty($l)?l[$l]:Object.defineProperty(l,$l,{value:[]})[$l];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(s),l}}return r.prototype.ngMetadataName=t,r.annotationCls=r,r})}var An=globalThis;function Oe(t){for(let e in t)if(t[e]===Oe)return e;throw Error("Could not find renamed property on target object.")}function Nt(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Nt).join(", ")}]`;if(t==null)return""+t;let e=t.overriddenName||t.name;if(e)return`${e}`;let n=t.toString();if(n==null)return""+n;let i=n.indexOf(`
`);return i>=0?n.slice(0,i):n}function Of(t,e){return t?e?`${t} ${e}`:t:e||""}var FC=Oe({__forward_ref__:Oe});function g0(t){return t.__forward_ref__=g0,t.toString=function(){return Nt(this())},t}function en(t){return v0(t)?t():t}function v0(t){return typeof t=="function"&&t.hasOwnProperty(FC)&&t.__forward_ref__===g0}function k(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function Ic(t){return wy(t,_0)||wy(t,x0)}function y0(t){return Ic(t)!==null}function wy(t,e){return t.hasOwnProperty(e)?t[e]:null}function VC(t){let e=t&&(t[_0]||t[x0]);return e||null}function My(t){return t&&(t.hasOwnProperty(Ey)||t.hasOwnProperty(UC))?t[Ey]:null}var _0=Oe({\u0275prov:Oe}),Ey=Oe({\u0275inj:Oe}),x0=Oe({ngInjectableDef:Oe}),UC=Oe({ngInjectorDef:Oe}),A=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,n){this._desc=e,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=k({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function b0(t){return t&&!!t.\u0275providers}var zC=Oe({\u0275cmp:Oe}),BC=Oe({\u0275dir:Oe}),HC=Oe({\u0275pipe:Oe}),WC=Oe({\u0275mod:Oe}),ic=Oe({\u0275fac:Oe}),js=Oe({__NG_ELEMENT_ID__:Oe}),Cy=Oe({__NG_ENV_ID__:Oe});function Nn(t){return typeof t=="string"?t:t==null?"":String(t)}function jC(t){return typeof t=="function"?t.name||t.toString():typeof t=="object"&&t!=null&&typeof t.type=="function"?t.type.name||t.type.toString():Nn(t)}function S0(t,e){throw new B(-200,t)}function Fh(t,e){throw new B(-201,!1)}var oe=function(t){return t[t.Default=0]="Default",t[t.Host=1]="Host",t[t.Self=2]="Self",t[t.SkipSelf=4]="SkipSelf",t[t.Optional=8]="Optional",t}(oe||{}),kf;function w0(){return kf}function Rt(t){let e=kf;return kf=t,e}function M0(t,e,n){let i=Ic(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(n&oe.Optional)return null;if(e!==void 0)return e;Fh(t,"Injector")}var GC={},nr=GC,Ff="__NG_DI_FLAG__",rc=class{injector;constructor(e){this.injector=e}retrieve(e,n){let i=n;return this.injector.get(e,i.optional?bl:nr,i)}},oc="ngTempTokenPath",$C="ngTokenPath",qC=/\n/gm,XC="\u0275",Ty="__source";function YC(t,e=oe.Default){if(Ps()===void 0)throw new B(-203,!1);if(Ps()===null)return M0(t,void 0,e);{let n=Ps(),i;return n instanceof rc?i=n.injector:i=n,i.get(t,e&oe.Optional?null:void 0,e)}}function L(t,e=oe.Default){return(w0()||YC)(en(t),e)}function w(t,e=oe.Default){return L(t,Dc(e))}function Dc(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function Vf(t){let e=[];for(let n=0;n<t.length;n++){let i=en(t[n]);if(Array.isArray(i)){if(i.length===0)throw new B(900,!1);let r,o=oe.Default;for(let s=0;s<i.length;s++){let a=i[s],l=KC(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}e.push(L(r,o))}else e.push(L(i))}return e}function ZC(t,e){return t[Ff]=e,t.prototype[Ff]=e,t}function KC(t){return t[Ff]}function JC(t,e,n,i){let r=t[oc];throw e[Ty]&&r.unshift(e[Ty]),t.message=QC(`
`+t.message,r,n,i),t[$C]=r,t[oc]=null,t}function QC(t,e,n,i=null){t=t&&t.charAt(0)===`
`&&t.charAt(1)==XC?t.slice(2):t;let r=Nt(e);if(Array.isArray(e))r=e.map(Nt).join(" -> ");else if(typeof e=="object"){let o=[];for(let s in e)if(e.hasOwnProperty(s)){let a=e[s];o.push(s+":"+(typeof a=="string"?JSON.stringify(a):Nt(a)))}r=`{${o.join(", ")}}`}return`${n}${i?"("+i+")":""}[${r}]: ${t.replace(qC,`
  `)}`}var Vh=ZC(kC("Inject",t=>({token:t})),-1);function rr(t,e){let n=t.hasOwnProperty(ic);return n?t[ic]:null}function eT(t,e,n){if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=e[i];if(n&&(r=n(r),o=n(o)),o!==r)return!1}return!0}function tT(t){return t.flat(Number.POSITIVE_INFINITY)}function Uh(t,e){t.forEach(n=>Array.isArray(n)?Uh(n,e):e(n))}function E0(t,e,n){e>=t.length?t.push(n):t.splice(e,0,n)}function sc(t,e){return e>=t.length-1?t.pop():t.splice(e,1)[0]}function nT(t,e){let n=[];for(let i=0;i<t;i++)n.push(e);return n}function iT(t,e,n,i){let r=t.length;if(r==e)t.push(n,i);else if(r===1)t.push(i,t[0]),t[0]=n;else{for(r--,t.push(t[r-1],t[r]);r>e;){let o=r-2;t[r]=t[o],r--}t[e]=n,t[e+1]=i}}function zh(t,e,n){let i=ea(t,e);return i>=0?t[i|1]=n:(i=~i,iT(t,i,e,n)),i}function Sf(t,e){let n=ea(t,e);if(n>=0)return t[n|1]}function ea(t,e){return rT(t,e,1)}function rT(t,e,n){let i=0,r=t.length>>n;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<n];if(e===s)return o<<n;s>e?r=o:i=o+1}return~(r<<n)}var go={},Pn=[],or=new A(""),C0=new A("",-1),T0=new A(""),ac=class{get(e,n=nr){if(n===nr){let i=new Error(`NullInjectorError: No provider for ${Nt(e)}!`);throw i.name="NullInjectorError",i}return n}};function I0(t,e){let n=t[WC]||null;if(!n&&e===!0)throw new Error(`Type ${Nt(t)} does not have '\u0275mod' property.`);return n}function vo(t){return t[zC]||null}function oT(t){return t[BC]||null}function sT(t){return t[HC]||null}function Pt(t){return{\u0275providers:t}}function fr(t){return Pt([{provide:or,multi:!0,useValue:t}])}function aT(...t){return{\u0275providers:D0(!0,t),\u0275fromNgModule:!0}}function D0(t,...e){let n=[],i=new Set,r,o=s=>{n.push(s)};return Uh(e,s=>{let a=s;Uf(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&A0(r,o),n}function A0(t,e){for(let n=0;n<t.length;n++){let{ngModule:i,providers:r}=t[n];Bh(r,o=>{e(o,i)})}}function Uf(t,e,n,i){if(t=en(t),!t)return!1;let r=null,o=My(t),s=!o&&vo(t);if(!o&&!s){let l=t.ngModule;if(o=My(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Uf(c,e,n,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;try{Uh(o.imports,u=>{Uf(u,e,n,i)&&(c||=[],c.push(u))})}finally{}c!==void 0&&A0(c,e)}if(!a){let c=rr(r)||(()=>new r);e({provide:r,useFactory:c,deps:Pn},r),e({provide:T0,useValue:r,multi:!0},r),e({provide:or,useValue:()=>L(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;Bh(l,u=>{e(u,c)})}}else return!1;return r!==t&&t.providers!==void 0}function Bh(t,e){for(let n of t)b0(n)&&(n=n.\u0275providers),Array.isArray(n)?Bh(n,e):e(n)}var lT=Oe({provide:String,useValue:Oe});function R0(t){return t!==null&&typeof t=="object"&&lT in t}function cT(t){return!!(t&&t.useExisting)}function uT(t){return!!(t&&t.useFactory)}function zf(t){return typeof t=="function"}var Ac=new A(""),Kl={},Iy={},wf;function Hh(){return wf===void 0&&(wf=new ac),wf}var Gt=class{},Gs=class extends Gt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,n,i,r){super(),this.parent=n,this.source=i,this.scopes=r,Hf(e,s=>this.processProvider(s)),this.records.set(C0,fo(void 0,this)),r.has("environment")&&this.records.set(Gt,fo(void 0,this));let o=this.records.get(Ac);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(T0,Pn,oe.Self))}retrieve(e,n){let i=n;return this.get(e,i.optional?bl:nr,i)}destroy(){Hs(this),this._destroyed=!0;let e=ae(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of n)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ae(e)}}onDestroy(e){return Hs(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Hs(this);let n=Zn(this),i=Rt(void 0),r;try{return e()}finally{Zn(n),Rt(i)}}get(e,n=nr,i=oe.Default){if(Hs(this),e.hasOwnProperty(Cy))return e[Cy](this);i=Dc(i);let r,o=Zn(this),s=Rt(void 0);try{if(!(i&oe.SkipSelf)){let l=this.records.get(e);if(l===void 0){let c=gT(e)&&Ic(e);c&&this.injectableDefInScope(c)?l=fo(Bf(e),Kl):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,i)}let a=i&oe.Self?Hh():this.parent;return n=i&oe.Optional&&n===nr?null:n,a.get(e,n)}catch(a){if(a.name==="NullInjectorError"){if((a[oc]=a[oc]||[]).unshift(Nt(e)),o)throw a;return JC(a,e,"R3InjectorError",this.source)}else throw a}finally{Rt(s),Zn(o)}}resolveInjectorInitializers(){let e=ae(null),n=Zn(this),i=Rt(void 0),r;try{let o=this.get(or,Pn,oe.Self);for(let s of o)s()}finally{Zn(n),Rt(i),ae(e)}}toString(){let e=[],n=this.records;for(let i of n.keys())e.push(Nt(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=en(e);let n=zf(e)?e:en(e&&e.provide),i=fT(e);if(!zf(e)&&e.multi===!0){let r=this.records.get(n);r||(r=fo(void 0,Kl,!0),r.factory=()=>Vf(r.multi),this.records.set(n,r)),n=e,r.multi.push(e)}this.records.set(n,i)}hydrate(e,n,i){let r=ae(null);try{return n.value===Iy?S0(Nt(e)):n.value===Kl&&(n.value=Iy,n.value=n.factory(void 0,i)),typeof n.value=="object"&&n.value&&mT(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{ae(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let n=en(e.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(e){let n=this._onDestroyHooks.indexOf(e);n!==-1&&this._onDestroyHooks.splice(n,1)}};function Bf(t){let e=Ic(t),n=e!==null?e.factory:rr(t);if(n!==null)return n;if(t instanceof A)throw new B(204,!1);if(t instanceof Function)return dT(t);throw new B(204,!1)}function dT(t){if(t.length>0)throw new B(204,!1);let n=VC(t);return n!==null?()=>n.factory(t):()=>new t}function fT(t){if(R0(t))return fo(void 0,t.useValue);{let e=hT(t);return fo(e,Kl)}}function hT(t,e,n){let i;if(zf(t)){let r=en(t);return rr(r)||Bf(r)}else if(R0(t))i=()=>en(t.useValue);else if(uT(t))i=()=>t.useFactory(...Vf(t.deps||[]));else if(cT(t))i=(r,o)=>L(en(t.useExisting),o!==void 0&&o&oe.Optional?oe.Optional:void 0);else{let r=en(t&&(t.useClass||t.provide));if(pT(t))i=()=>new r(...Vf(t.deps));else return rr(r)||Bf(r)}return i}function Hs(t){if(t.destroyed)throw new B(205,!1)}function fo(t,e,n=!1){return{factory:t,value:e,multi:n?[]:void 0}}function pT(t){return!!t.deps}function mT(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function gT(t){return typeof t=="function"||typeof t=="object"&&t instanceof A}function Hf(t,e){for(let n of t)Array.isArray(n)?Hf(n,e):n&&b0(n)?Hf(n.\u0275providers,e):e(n)}function _n(t,e){let n;t instanceof Gs?(Hs(t),n=t):n=new rc(t);let i,r=Zn(n),o=Rt(void 0);try{return e()}finally{Zn(r),Rt(o)}}function N0(){return w0()!==void 0||Ps()!=null}function Wh(t){if(!N0())throw new B(-203,!1)}function vT(t){return typeof t=="function"}var ri=0,ie=1,Q=2,bt=3,vn=4,Lt=5,yo=6,lc=7,ot=8,_o=9,ei=10,st=11,$s=12,Dy=13,Io=14,$t=15,sr=16,ho=17,ti=18,Rc=19,P0=20,Ei=21,Mf=22,ar=23,tn=24,Ef=25,ht=26,L0=1;var lr=7,cc=8,xo=9,xt=10;function Ci(t){return Array.isArray(t)&&typeof t[L0]=="object"}function oi(t){return Array.isArray(t)&&t[L0]===!0}function O0(t){return(t.flags&4)!==0}function Do(t){return t.componentOffset>-1}function jh(t){return(t.flags&1)===1}function hr(t){return!!t.template}function uc(t){return(t[Q]&512)!==0}function Ao(t){return(t[Q]&256)===256}var Wf=class{previousValue;currentValue;firstChange;constructor(e,n,i){this.previousValue=e,this.currentValue=n,this.firstChange=i}isFirstChange(){return this.firstChange}};function k0(t,e,n,i){e!==null?e.applyValueToInputSignal(e,i):t[n]=i}var pr=(()=>{let t=()=>F0;return t.ngInherit=!0,t})();function F0(t){return t.type.prototype.ngOnChanges&&(t.setInput=_T),yT}function yT(){let t=U0(this),e=t?.current;if(e){let n=t.previous;if(n===go)t.previous=e;else for(let i in e)n[i]=e[i];t.current=null,this.ngOnChanges(e)}}function _T(t,e,n,i,r){let o=this.declaredInputs[i],s=U0(t)||xT(t,{previous:go,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Wf(c&&c.currentValue,n,l===go),k0(t,e,r,n)}var V0="__ngSimpleChanges__";function U0(t){return t[V0]||null}function xT(t,e){return t[V0]=e}var Ay=null;var ke=function(t,e=null,n){Ay?.(t,e,n)},z0="svg",bT="math";function Ln(t){for(;Array.isArray(t);)t=t[ri];return t}function B0(t,e){return Ln(e[t])}function Fn(t,e){return Ln(e[t.index])}function Gh(t,e){return t.data[e]}function H0(t,e){return t[e]}function ST(t,e,n,i){n>=t.data.length&&(t.data[n]=null,t.blueprint[n]=null),e[n]=i}function On(t,e){let n=e[t];return Ci(n)?n:n[ri]}function wT(t){return(t[Q]&4)===4}function $h(t){return(t[Q]&128)===128}function MT(t){return oi(t[bt])}function bo(t,e){return e==null?null:t[e]}function W0(t){t[ho]=0}function j0(t){t[Q]&1024||(t[Q]|=1024,$h(t)&&ta(t))}function ET(t,e){for(;t>0;)e=e[Io],t--;return e}function Nc(t){return!!(t[Q]&9216||t[tn]?.dirty)}function jf(t){t[ei].changeDetectionScheduler?.notify(8),t[Q]&64&&(t[Q]|=1024),Nc(t)&&ta(t)}function ta(t){t[ei].changeDetectionScheduler?.notify(0);let e=cr(t);for(;e!==null&&!(e[Q]&8192||(e[Q]|=8192,!$h(e)));)e=cr(e)}function G0(t,e){if(Ao(t))throw new B(911,!1);t[Ei]===null&&(t[Ei]=[]),t[Ei].push(e)}function CT(t,e){if(t[Ei]===null)return;let n=t[Ei].indexOf(e);n!==-1&&t[Ei].splice(n,1)}function cr(t){let e=t[bt];return oi(e)?e[bt]:e}function qh(t){return t[lc]??=[]}function Xh(t){return t.cleanup??=[]}function TT(t,e,n,i){let r=qh(e);r.push(n),t.firstCreatePass&&Xh(t).push(i,r.length-1)}var se={lFrame:t_(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Gf=!1;function IT(){return se.lFrame.elementDepthCount}function DT(){se.lFrame.elementDepthCount++}function AT(){se.lFrame.elementDepthCount--}function $0(){return se.bindingsEnabled}function q0(){return se.skipHydrationRootTNode!==null}function RT(t){return se.skipHydrationRootTNode===t}function NT(){se.skipHydrationRootTNode=null}function ue(){return se.lFrame.lView}function Ct(){return se.lFrame.tView}function T(t){return se.lFrame.contextLView=t,t[ot]}function I(t){return se.lFrame.contextLView=null,t}function nn(){let t=X0();for(;t!==null&&t.type===64;)t=t.parent;return t}function X0(){return se.lFrame.currentTNode}function PT(){let t=se.lFrame,e=t.currentTNode;return t.isParent?e:e.parent}function na(t,e){let n=se.lFrame;n.currentTNode=t,n.isParent=e}function Y0(){return se.lFrame.isParent}function Z0(){se.lFrame.isParent=!1}function K0(){return Gf}function dc(t){let e=Gf;return Gf=t,e}function Yh(){let t=se.lFrame,e=t.bindingRootIndex;return e===-1&&(e=t.bindingRootIndex=t.tView.bindingStartIndex),e}function J0(){return se.lFrame.bindingIndex}function LT(t){return se.lFrame.bindingIndex=t}function ia(){return se.lFrame.bindingIndex++}function Pc(t){let e=se.lFrame,n=e.bindingIndex;return e.bindingIndex=e.bindingIndex+t,n}function OT(){return se.lFrame.inI18n}function kT(t,e){let n=se.lFrame;n.bindingIndex=n.bindingRootIndex=t,$f(e)}function FT(){return se.lFrame.currentDirectiveIndex}function $f(t){se.lFrame.currentDirectiveIndex=t}function VT(t){let e=se.lFrame.currentDirectiveIndex;return e===-1?null:t[e]}function Zh(){return se.lFrame.currentQueryIndex}function Lc(t){se.lFrame.currentQueryIndex=t}function UT(t){let e=t[ie];return e.type===2?e.declTNode:e.type===1?t[Lt]:null}function Q0(t,e,n){if(n&oe.SkipSelf){let r=e,o=t;for(;r=r.parent,r===null&&!(n&oe.Host);)if(r=UT(o),r===null||(o=o[Io],r.type&10))break;if(r===null)return!1;e=r,t=o}let i=se.lFrame=e_();return i.currentTNode=e,i.lView=t,!0}function Kh(t){let e=e_(),n=t[ie];se.lFrame=e,e.currentTNode=n.firstChild,e.lView=t,e.tView=n,e.contextLView=t,e.bindingIndex=n.bindingStartIndex,e.inI18n=!1}function e_(){let t=se.lFrame,e=t===null?null:t.child;return e===null?t_(t):e}function t_(t){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=e),e}function n_(){let t=se.lFrame;return se.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var i_=n_;function Jh(){let t=n_();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function zT(t){return(se.lFrame.contextLView=ET(t,se.lFrame.contextLView))[ot]}function Vn(){return se.lFrame.selectedIndex}function ur(t){se.lFrame.selectedIndex=t}function r_(){let t=se.lFrame;return Gh(t.tView,t.selectedIndex)}function Ro(){se.lFrame.currentNamespace=z0}function o_(){BT()}function BT(){se.lFrame.currentNamespace=null}function HT(){return se.lFrame.currentNamespace}var s_=!0;function Qh(){return s_}function ep(t){s_=t}function WT(t,e,n){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=e.type.prototype;if(i){let s=F0(e);(n.preOrderHooks??=[]).push(t,s),(n.preOrderCheckHooks??=[]).push(t,s)}r&&(n.preOrderHooks??=[]).push(0-t,r),o&&((n.preOrderHooks??=[]).push(t,o),(n.preOrderCheckHooks??=[]).push(t,o))}function a_(t,e){for(let n=e.directiveStart,i=e.directiveEnd;n<i;n++){let o=t.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(t.contentHooks??=[]).push(-n,s),a&&((t.contentHooks??=[]).push(n,a),(t.contentCheckHooks??=[]).push(n,a)),l&&(t.viewHooks??=[]).push(-n,l),c&&((t.viewHooks??=[]).push(n,c),(t.viewCheckHooks??=[]).push(n,c)),u!=null&&(t.destroyHooks??=[]).push(n,u)}}function Jl(t,e,n){l_(t,e,3,n)}function Ql(t,e,n,i){(t[Q]&3)===n&&l_(t,e,n,i)}function Cf(t,e){let n=t[Q];(n&3)===e&&(n&=16383,n+=1,t[Q]=n)}function l_(t,e,n,i){let r=i!==void 0?t[ho]&65535:0,o=i??-1,s=e.length-1,a=0;for(let l=r;l<s;l++)if(typeof e[l+1]=="number"){if(a=e[l],i!=null&&a>=i)break}else e[l]<0&&(t[ho]+=65536),(a<o||o==-1)&&(jT(t,n,e,l),t[ho]=(t[ho]&4294901760)+l+2),l++}function Ry(t,e){ke(4,t,e);let n=ae(null);try{e.call(t)}finally{ae(n),ke(5,t,e)}}function jT(t,e,n,i){let r=n[i]<0,o=n[i+1],s=r?-n[i]:n[i],a=t[s];r?t[Q]>>14<t[ho]>>16&&(t[Q]&3)===e&&(t[Q]+=16384,Ry(a,o)):Ry(a,o)}var mo=-1,qs=class{factory;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,n,i){this.factory=e,this.canSeeViewProviders=n,this.injectImpl=i}};function GT(t){return(t.flags&8)!==0}function $T(t){return(t.flags&16)!==0}function qT(t,e,n){let i=0;for(;i<n.length;){let r=n[i];if(typeof r=="number"){if(r!==0)break;i++;let o=n[i++],s=n[i++],a=n[i++];t.setAttribute(e,s,a,o)}else{let o=r,s=n[++i];XT(o)?t.setProperty(e,o,s):t.setAttribute(e,o,s),i++}}return i}function c_(t){return t===3||t===4||t===6}function XT(t){return t.charCodeAt(0)===64}function tp(t,e){if(!(e===null||e.length===0))if(t===null||t.length===0)t=e.slice();else{let n=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?n=r:n===0||(n===-1||n===2?Ny(t,n,r,null,e[++i]):Ny(t,n,r,null,null))}}return t}function Ny(t,e,n,i,r){let o=0,s=t.length;if(e===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===n){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,e),o=s+1),t.splice(o++,0,n),r!==null&&t.splice(o++,0,r)}function u_(t){return t!==mo}function fc(t){return t&32767}function YT(t){return t>>16}function hc(t,e){let n=YT(t),i=e;for(;n>0;)i=i[Io],n--;return i}var qf=!0;function pc(t){let e=qf;return qf=t,e}var ZT=256,d_=ZT-1,f_=5,KT=0,Rn={};function JT(t,e,n){let i;typeof n=="string"?i=n.charCodeAt(0)||0:n.hasOwnProperty(js)&&(i=n[js]),i==null&&(i=n[js]=KT++);let r=i&d_,o=1<<r;e.data[t+(r>>f_)]|=o}function h_(t,e){let n=p_(t,e);if(n!==-1)return n;let i=e[ie];i.firstCreatePass&&(t.injectorIndex=e.length,Tf(i.data,t),Tf(e,null),Tf(i.blueprint,null));let r=np(t,e),o=t.injectorIndex;if(u_(r)){let s=fc(r),a=hc(r,e),l=a[ie].data;for(let c=0;c<8;c++)e[o+c]=a[s+c]|l[s+c]}return e[o+8]=r,o}function Tf(t,e){t.push(0,0,0,0,0,0,0,0,e)}function p_(t,e){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||e[t.injectorIndex+8]===null?-1:t.injectorIndex}function np(t,e){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let n=0,i=null,r=e;for(;r!==null;){if(i=__(r),i===null)return mo;if(n++,r=r[Io],i.injectorIndex!==-1)return i.injectorIndex|n<<16}return mo}function QT(t,e,n){JT(t,e,n)}function eI(t,e){if(e==="class")return t.classes;if(e==="style")return t.styles;let n=t.attrs;if(n){let i=n.length,r=0;for(;r<i;){let o=n[r];if(c_(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof n[r]=="string";)r++;else{if(o===e)return n[r+1];r=r+2}}}return null}function m_(t,e,n){if(n&oe.Optional||t!==void 0)return t;Fh(e,"NodeInjector")}function g_(t,e,n,i){if(n&oe.Optional&&i===void 0&&(i=null),(n&(oe.Self|oe.Host))===0){let r=t[_o],o=Rt(void 0);try{return r?r.get(e,i,n&oe.Optional):M0(e,i,n&oe.Optional)}finally{Rt(o)}}return m_(i,e,n)}function v_(t,e,n,i=oe.Default,r){if(t!==null){if(e[Q]&2048&&!(i&oe.Self)){let s=rI(t,e,n,i,Rn);if(s!==Rn)return s}let o=y_(t,e,n,i,Rn);if(o!==Rn)return o}return g_(e,n,i,r)}function y_(t,e,n,i,r){let o=nI(n);if(typeof o=="function"){if(!Q0(e,t,i))return i&oe.Host?m_(r,n,i):g_(e,n,i,r);try{let s;if(s=o(i),s==null&&!(i&oe.Optional))Fh(n);else return s}finally{i_()}}else if(typeof o=="number"){let s=null,a=p_(t,e),l=mo,c=i&oe.Host?e[$t][Lt]:null;for((a===-1||i&oe.SkipSelf)&&(l=a===-1?np(t,e):e[a+8],l===mo||!Ly(i,!1)?a=-1:(s=e[ie],a=fc(l),e=hc(l,e)));a!==-1;){let u=e[ie];if(Py(o,a,u.data)){let d=tI(a,e,n,s,i,c);if(d!==Rn)return d}l=e[a+8],l!==mo&&Ly(i,e[ie].data[a+8]===c)&&Py(o,a,e)?(s=u,a=fc(l),e=hc(l,e)):a=-1}}return r}function tI(t,e,n,i,r,o){let s=e[ie],a=s.data[t+8],l=i==null?Do(a)&&qf:i!=s&&(a.type&3)!==0,c=r&oe.Host&&o===a,u=ec(a,s,n,l,c);return u!==null?mc(e,s,u,a,r):Rn}function ec(t,e,n,i,r){let o=t.providerIndexes,s=e.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,d=i?a:a+u,m=r?a+u:c;for(let f=d;f<m;f++){let v=s[f];if(f<l&&n===v||f>=l&&v.type===n)return f}if(r){let f=s[l];if(f&&hr(f)&&f.type===n)return l}return null}function mc(t,e,n,i,r){let o=t[n],s=e.data;if(o instanceof qs){let a=o;a.resolving&&S0(jC(s[n]));let l=pc(a.canSeeViewProviders);a.resolving=!0;let c,u=a.injectImpl?Rt(a.injectImpl):null,d=Q0(t,i,oe.Default);try{o=t[n]=a.factory(void 0,r,s,t,i),e.firstCreatePass&&n>=i.directiveStart&&WT(n,s[n],e)}finally{u!==null&&Rt(u),pc(l),a.resolving=!1,i_()}}return o}function nI(t){if(typeof t=="string")return t.charCodeAt(0)||0;let e=t.hasOwnProperty(js)?t[js]:void 0;return typeof e=="number"?e>=0?e&d_:iI:e}function Py(t,e,n){let i=1<<t;return!!(n[e+(t>>f_)]&i)}function Ly(t,e){return!(t&oe.Self)&&!(t&oe.Host&&e)}var ir=class{_tNode;_lView;constructor(e,n){this._tNode=e,this._lView=n}get(e,n,i){return v_(this._tNode,this._lView,e,Dc(i),n)}};function iI(){return new ir(nn(),ue())}function mr(t){return Tc(()=>{let e=t.prototype.constructor,n=e[ic]||Xf(e),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[ic]||Xf(r);if(o&&o!==n)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Xf(t){return v0(t)?()=>{let e=Xf(en(t));return e&&e()}:rr(t)}function rI(t,e,n,i,r){let o=t,s=e;for(;o!==null&&s!==null&&s[Q]&2048&&!uc(s);){let a=y_(o,s,n,i|oe.Self,Rn);if(a!==Rn)return a;let l=o.parent;if(!l){let c=s[P0];if(c){let u=c.get(n,Rn,i);if(u!==Rn)return u}l=__(s),s=s[Io]}o=l}return r}function __(t){let e=t[ie],n=e.type;return n===2?e.declTNode:n===1?t[Lt]:null}function ip(t){return eI(nn(),t)}function Oy(t,e=null,n=null,i){let r=x_(t,e,n,i);return r.resolveInjectorInitializers(),r}function x_(t,e=null,n=null,i,r=new Set){let o=[n||Pn,aT(t)];return i=i||(typeof t=="object"?void 0:Nt(t)),new Gs(o,e||Hh(),i||null,r)}var Mt=class t{static THROW_IF_NOT_FOUND=nr;static NULL=new ac;static create(e,n){if(Array.isArray(e))return Oy({name:""},n,e,"");{let i=e.name??"";return Oy({name:i},e.parent,e.providers,i)}}static \u0275prov=k({token:t,providedIn:"any",factory:()=>L(C0)});static __NG_ELEMENT_ID__=-1};var oI=new A("");oI.__NG_ELEMENT_ID__=t=>{let e=nn();if(e===null)throw new B(204,!1);if(e.type&2)return e.value;if(t&oe.Optional)return null;throw new B(204,!1)};var b_=!1,rn=(()=>{class t{static __NG_ELEMENT_ID__=sI;static __NG_ENV_ID__=n=>n}return t})(),gc=class extends rn{_lView;constructor(e){super(),this._lView=e}onDestroy(e){let n=this._lView;return Ao(n)?(e(),()=>{}):(G0(n,e),()=>CT(n,e))}};function sI(){return new gc(ue())}var So=class{},Oc=new A("",{providedIn:"root",factory:()=>!1});var S_=new A(""),w_=new A(""),No=(()=>{class t{taskId=0;pendingTasks=new Set;get _hasPendingTasks(){return this.hasPendingTasks.value}hasPendingTasks=new Xe(!1);add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static \u0275prov=k({token:t,providedIn:"root",factory:()=>new t})}return t})();var Yf=class extends Ae{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,N0()&&(this.destroyRef=w(rn,{optional:!0})??void 0,this.pendingTasks=w(No,{optional:!0})??void 0)}emit(e){let n=ae(null);try{super.next(e)}finally{ae(n)}}subscribe(e,n,i){let r=e,o=n||(()=>null),s=i;if(e&&typeof e=="object"){let l=e;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return e instanceof $e&&e.add(a),a}wrapInTimeout(e){return n=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(n)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},_t=Yf;function Xs(...t){}function M_(t){let e,n;function i(){t=Xs;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{t(),i()})),()=>i()}function ky(t){return queueMicrotask(()=>t()),()=>{t=Xs}}var rp="isAngularZone",vc=rp+"_ID",aI=0,Le=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new _t(!1);onMicrotaskEmpty=new _t(!1);onStable=new _t(!1);onError=new _t(!1);constructor(e){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=b_}=e;if(typeof Zone>"u")throw new B(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,uI(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(rp)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new B(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new B(909,!1)}run(e,n,i){return this._inner.run(e,n,i)}runTask(e,n,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,e,lI,Xs,Xs);try{return o.runTask(s,n,i)}finally{o.cancelTask(s)}}runGuarded(e,n,i){return this._inner.runGuarded(e,n,i)}runOutsideAngular(e){return this._outer.run(e)}},lI={};function op(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function cI(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function e(){M_(()=>{t.callbackScheduled=!1,Zf(t),t.isCheckStableRunning=!0,op(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{e()}):t._outer.run(()=>{e()}),Zf(t)}function uI(t){let e=()=>{cI(t)},n=aI++;t._inner=t._inner.fork({name:"angular",properties:{[rp]:!0,[vc]:n,[vc+n]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(dI(l))return i.invokeTask(o,s,a,l);try{return Fy(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&e(),Vy(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return Fy(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!fI(l)&&e(),Vy(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,Zf(t),op(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function Zf(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function Fy(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function Vy(t){t._nesting--,op(t)}var Kf=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new _t;onMicrotaskEmpty=new _t;onStable=new _t;onError=new _t;run(e,n,i){return e.apply(n,i)}runGuarded(e,n,i){return e.apply(n,i)}runOutsideAngular(e){return e()}runTask(e,n,i,r){return e.apply(n,i)}};function dI(t){return E_(t,"__ignore_ng_zone__")}function fI(t){return E_(t,"__scheduler_tick__")}function E_(t,e){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[e]===!0}var Et=class{_console=console;handleError(e){this._console.error("ERROR",e)}},hI=new A("",{providedIn:"root",factory:()=>{let t=w(Le),e=w(Et);return n=>t.runOutsideAngular(()=>e.handleError(n))}});function Uy(t,e){return m0(t,e)}function pI(t){return m0(p0,t)}var ra=(Uy.required=pI,Uy);function mI(){return Po(nn(),ue())}function Po(t,e){return new gr(Fn(t,e))}var gr=(()=>{class t{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=mI}return t})();function C_(t){return t instanceof gr?t.nativeElement:t}function Ie(t,e){let n=Zd(t,e?.equal),i=n[jt];return n.set=r=>Ns(i,r),n.update=r=>Kd(i,r),n.asReadonly=gI.bind(n),n}function gI(){let t=this[jt];if(t.readonlyFn===void 0){let e=()=>this();e[jt]=t,t.readonlyFn=e}return t.readonlyFn}function vI(){return this._results[Symbol.iterator]()}var Jf=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ae}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,n){return this._results.reduce(e,n)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,n){this.dirty=!1;let i=tT(e);(this._changesDetected=!eT(this._results,i,n))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=vI};function T_(t){return(t.flags&128)===128}var I_=function(t){return t[t.OnPush=0]="OnPush",t[t.Default=1]="Default",t}(I_||{}),D_=new Map,yI=0;function _I(){return yI++}function xI(t){D_.set(t[Rc],t)}function Qf(t){D_.delete(t[Rc])}var zy="__ngContext__";function oa(t,e){Ci(e)?(t[zy]=e[Rc],xI(e)):t[zy]=e}function A_(t){return N_(t[$s])}function R_(t){return N_(t[vn])}function N_(t){for(;t!==null&&!oi(t);)t=t[vn];return t}var eh;function P_(t){eh=t}function L_(){if(eh!==void 0)return eh;if(typeof document<"u")return document;throw new B(210,!1)}var sp=new A("",{providedIn:"root",factory:()=>bI}),bI="ng",ap=new A(""),sa=new A("",{providedIn:"platform",factory:()=>"unknown"});var lp=new A("",{providedIn:"root",factory:()=>L_().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var SI="h",wI="b";var O_=!1,MI=new A("",{providedIn:"root",factory:()=>O_});var k_=function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t}(k_||{}),kc=new A(""),By=new Set;function aa(t){By.has(t)||(By.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var F_=(()=>{class t{view;node;constructor(n,i){this.view=n,this.node=i}static __NG_ELEMENT_ID__=EI}return t})();function EI(){return new F_(ue(),nn())}var CI=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=k({token:t,providedIn:"root",factory:()=>new t})}return t})();var TI=(t,e,n,i)=>{};function II(t,e,n,i){TI(t,e,n,i)}var DI=()=>null;function V_(t,e,n=!1){return DI(t,e,n)}function U_(t,e){let n=t.contentQueries;if(n!==null){let i=ae(null);try{for(let r=0;r<n.length;r+=2){let o=n[r],s=n[r+1];if(s!==-1){let a=t.data[s];Lc(o),a.contentQueries(2,e[s],s)}}}finally{ae(i)}}}function th(t,e,n){Lc(0);let i=ae(null);try{e(t,n)}finally{ae(i)}}function z_(t,e,n){if(O0(e)){let i=ae(null);try{let r=e.directiveStart,o=e.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=n[s];a.contentQueries(1,l,s)}}}finally{ae(i)}}}var kn=function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t}(kn||{});var ql;function AI(){if(ql===void 0&&(ql=null,An.trustedTypes))try{ql=An.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return ql}function Fc(t){return AI()?.createHTML(t)||t}var Xl;function B_(){if(Xl===void 0&&(Xl=null,An.trustedTypes))try{Xl=An.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Xl}function Hy(t){return B_()?.createHTML(t)||t}function Wy(t){return B_()?.createScriptURL(t)||t}var ni=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${f0})`}},nh=class extends ni{getTypeName(){return"HTML"}},ih=class extends ni{getTypeName(){return"Style"}},rh=class extends ni{getTypeName(){return"Script"}},oh=class extends ni{getTypeName(){return"URL"}},sh=class extends ni{getTypeName(){return"ResourceURL"}};function xn(t){return t instanceof ni?t.changingThisBreaksApplicationSecurity:t}function si(t,e){let n=RI(t);if(n!=null&&n!==e){if(n==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${n} (see ${f0})`)}return n===e}function RI(t){return t instanceof ni&&t.getTypeName()||null}function H_(t){return new nh(t)}function W_(t){return new ih(t)}function j_(t){return new rh(t)}function G_(t){return new oh(t)}function $_(t){return new sh(t)}function NI(t){let e=new lh(t);return PI()?new ah(e):e}var ah=class{inertDocumentHelper;constructor(e){this.inertDocumentHelper=e}getInertBodyElement(e){e="<body><remove></remove>"+e;try{let n=new window.DOMParser().parseFromString(Fc(e),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(e):(n.firstChild?.remove(),n)}catch{return null}}},lh=class{defaultDoc;inertDocument;constructor(e){this.defaultDoc=e,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(e){let n=this.inertDocument.createElement("template");return n.innerHTML=Fc(e),n}};function PI(){try{return!!new window.DOMParser().parseFromString(Fc(""),"text/html")}catch{return!1}}var LI=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Vc(t){return t=String(t),t.match(LI)?t:"unsafe:"+t}function ai(t){let e={};for(let n of t.split(","))e[n]=!0;return e}function la(...t){let e={};for(let n of t)for(let i in n)n.hasOwnProperty(i)&&(e[i]=!0);return e}var q_=ai("area,br,col,hr,img,wbr"),X_=ai("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Y_=ai("rp,rt"),OI=la(Y_,X_),kI=la(X_,ai("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),FI=la(Y_,ai("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),jy=la(q_,kI,FI,OI),Z_=ai("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),VI=ai("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),UI=ai("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),zI=la(Z_,VI,UI),BI=ai("script,style,template");var ch=class{sanitizedSomething=!1;buf=[];sanitizeChildren(e){let n=e.firstChild,i=!0,r=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?i=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,i&&n.firstChild){r.push(n),n=jI(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let o=WI(n);if(o){n=o;break}n=r.pop()}}return this.buf.join("")}startElement(e){let n=Gy(e).toLowerCase();if(!jy.hasOwnProperty(n))return this.sanitizedSomething=!0,!BI.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let i=e.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!zI.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;Z_[a]&&(l=Vc(l)),this.buf.push(" ",s,'="',$y(l),'"')}return this.buf.push(">"),!0}endElement(e){let n=Gy(e).toLowerCase();jy.hasOwnProperty(n)&&!q_.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(e){this.buf.push($y(e))}};function HI(t,e){return(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function WI(t){let e=t.nextSibling;if(e&&t!==e.previousSibling)throw K_(e);return e}function jI(t){let e=t.firstChild;if(e&&HI(t,e))throw K_(e);return e}function Gy(t){let e=t.nodeName;return typeof e=="string"?e:"FORM"}function K_(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var GI=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,$I=/([^\#-~ |!])/g;function $y(t){return t.replace(/&/g,"&amp;").replace(GI,function(e){let n=e.charCodeAt(0),i=e.charCodeAt(1);return"&#"+((n-55296)*1024+(i-56320)+65536)+";"}).replace($I,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Yl;function cp(t,e){let n=null;try{Yl=Yl||NI(t);let i=e?String(e):"";n=Yl.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=n.innerHTML,n=Yl.getInertBodyElement(i)}while(i!==o);let a=new ch().sanitizeChildren(qy(n)||n);return Fc(a)}finally{if(n){let i=qy(n)||n;for(;i.firstChild;)i.firstChild.remove()}}}function qy(t){return"content"in t&&qI(t)?t.content:null}function qI(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function XI(t,e){return t.createText(e)}function YI(t,e,n){t.setValue(e,n)}function J_(t,e,n){return t.createElement(e,n)}function yc(t,e,n,i,r){t.insertBefore(e,n,i,r)}function Q_(t,e,n){t.appendChild(e,n)}function Xy(t,e,n,i,r){i!==null?yc(t,e,n,i,r):Q_(t,e,n)}function ZI(t,e,n){t.removeChild(null,e,n)}function KI(t,e,n){t.setAttribute(e,"style",n)}function JI(t,e,n){n===""?t.removeAttribute(e,"class"):t.setAttribute(e,"class",n)}function ex(t,e,n){let{mergedAttrs:i,classes:r,styles:o}=n;i!==null&&qT(t,e,i),r!==null&&JI(t,e,r),o!==null&&KI(t,e,o)}var bn=function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t}(bn||{});function tx(t){let e=up();return e?Hy(e.sanitize(bn.HTML,t)||""):si(t,"HTML")?Hy(xn(t)):cp(L_(),Nn(t))}function QI(t){let e=up();return e?e.sanitize(bn.URL,t)||"":si(t,"URL")?xn(t):Vc(Nn(t))}function eD(t){let e=up();if(e)return Wy(e.sanitize(bn.RESOURCE_URL,t)||"");if(si(t,"ResourceURL"))return Wy(xn(t));throw new B(904,!1)}var tD=new Set(["embed","frame","iframe","media","script"]),nD=new Set(["base","link","script"]);function iD(t,e){return e==="src"&&tD.has(t)||e==="href"&&nD.has(t)||e==="xlink:href"&&t==="script"?eD:QI}function nx(t,e,n){return iD(e,n)(t)}function up(){let t=ue();return t&&t[ei].sanitizer}function ca(t){return t.ownerDocument}function ix(t){return t instanceof Function?t():t}function rD(t,e,n){let i=t.length;for(;;){let r=t.indexOf(e,n);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=e.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}n=r+1}}var rx="ng-template";function oD(t,e,n,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&rD(e[r+1].toLowerCase(),n,0)!==-1)return!0}else if(dp(t))return!1;if(r=e.indexOf(1,r),r>-1){let o;for(;++r<e.length&&typeof(o=e[r])=="string";)if(o.toLowerCase()===n)return!0}return!1}function dp(t){return t.type===4&&t.value!==rx}function sD(t,e,n){let i=t.type===4&&!n?rx:t.value;return e===i}function aD(t,e,n){let i=4,r=t.attrs,o=r!==null?uD(r):0,s=!1;for(let a=0;a<e.length;a++){let l=e[a];if(typeof l=="number"){if(!s&&!mn(i)&&!mn(l))return!1;if(s&&mn(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!sD(t,l,n)||l===""&&e.length===1){if(mn(i))return!1;s=!0}}else if(i&8){if(r===null||!oD(t,r,l,n)){if(mn(i))return!1;s=!0}}else{let c=e[++a],u=lD(l,r,dp(t),n);if(u===-1){if(mn(i))return!1;s=!0;continue}if(c!==""){let d;if(u>o?d="":d=r[u+1].toLowerCase(),i&2&&c!==d){if(mn(i))return!1;s=!0}}}}return mn(i)||s}function mn(t){return(t&1)===0}function lD(t,e,n,i){if(e===null)return-1;let r=0;if(i||!n){let o=!1;for(;r<e.length;){let s=e[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return dD(e,t)}function ox(t,e,n=!1){for(let i=0;i<e.length;i++)if(aD(t,e[i],n))return!0;return!1}function cD(t){let e=t.attrs;if(e!=null){let n=e.indexOf(5);if((n&1)===0)return e[n+1]}return null}function uD(t){for(let e=0;e<t.length;e++){let n=t[e];if(c_(n))return e}return t.length}function dD(t,e){let n=t.indexOf(4);if(n>-1)for(n++;n<t.length;){let i=t[n];if(typeof i=="number")return-1;if(i===e)return n;n++}return-1}function fD(t,e){e:for(let n=0;n<e.length;n++){let i=e[n];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function Yy(t,e){return t?":not("+e.trim()+")":e}function hD(t){let e=t[0],n=1,i=2,r="",o=!1;for(;n<t.length;){let s=t[n];if(typeof s=="string")if(i&2){let a=t[++n];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!mn(s)&&(e+=Yy(o,r),r=""),i=s,o=o||!mn(i);n++}return r!==""&&(e+=Yy(o,r)),e}function pD(t){return t.map(hD).join(",")}function mD(t){let e=[],n=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&e.push(o,t[++i]):r===8&&n.push(o);else{if(!mn(r))break;r=o}i++}return n.length&&e.push(1,...n),e}var Ot={};function fp(t,e,n,i,r,o,s,a,l,c,u){let d=ht+i,m=d+r,f=gD(d,m),v=typeof c=="function"?c():c;return f[ie]={type:t,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:e,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:u}}function gD(t,e){let n=[];for(let i=0;i<e;i++)n.push(i<t?null:Ot);return n}function vD(t){let e=t.tView;return e===null||e.incompleteFirstPass?t.tView=fp(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):e}function hp(t,e,n,i,r,o,s,a,l,c,u){let d=e.blueprint.slice();return d[ri]=r,d[Q]=i|4|128|8|64|1024,(c!==null||t&&t[Q]&2048)&&(d[Q]|=2048),W0(d),d[bt]=d[Io]=t,d[ot]=n,d[ei]=s||t&&t[ei],d[st]=a||t&&t[st],d[_o]=l||t&&t[_o]||null,d[Lt]=o,d[Rc]=_I(),d[yo]=u,d[P0]=c,d[$t]=e.type==2?t[$t]:d,d}function yD(t,e,n){let i=Fn(e,t),r=vD(n),o=t[ei].rendererFactory,s=pp(t,hp(t,r,null,sx(n),i,e,null,o.createRenderer(i,n),null,null,null));return t[e.index]=s}function sx(t){let e=16;return t.signals?e=4096:t.onPush&&(e=64),e}function ax(t,e,n,i){if(n===0)return-1;let r=e.length;for(let o=0;o<n;o++)e.push(i),t.blueprint.push(i),t.data.push(null);return r}function pp(t,e){return t[$s]?t[Dy][vn]=e:t[$s]=e,t[Dy]=e,e}function _(t=1){lx(Ct(),ue(),Vn()+t,!1)}function lx(t,e,n,i){if(!i)if((e[Q]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Jl(e,o,n)}else{let o=t.preOrderHooks;o!==null&&Ql(e,o,0,n)}ur(n)}var Uc=function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t}(Uc||{});function uh(t,e,n,i){let r=ae(null);try{let[o,s,a]=t.inputs[n],l=null;(s&Uc.SignalBased)!==0&&(l=e[o][jt]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(e,i)),t.setInput!==null?t.setInput(e,l,i,n,o):k0(e,l,o,i)}finally{ae(r)}}function cx(t,e,n,i,r){let o=Vn(),s=i&2;try{ur(-1),s&&e.length>ht&&lx(t,e,ht,!1),ke(s?2:0,r),n(i,r)}finally{ur(o),ke(s?3:1,r)}}function mp(t,e,n){ED(t,e,n),(n.flags&64)===64&&CD(t,e,n)}function ux(t,e,n=Fn){let i=e.localNames;if(i!==null){let r=e.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?n(e,t):t[s];t[r++]=a}}}function _D(t,e,n,i){let o=i.get(MI,O_)||n===kn.ShadowDom,s=t.selectRootElement(e,o);return xD(s),s}function xD(t){bD(t)}var bD=()=>null;function SD(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function wD(t,e,n,i,r,o,s,a){if(!a&&gp(e,t,n,i,r)){Do(e)&&MD(n,e.index);return}if(e.type&3){let l=Fn(e,n);i=SD(i),r=s!=null?s(r,e.value||"",i):r,o.setProperty(l,i,r)}else e.type&12}function MD(t,e){let n=On(e,t);n[Q]&16||(n[Q]|=64)}function ED(t,e,n){let i=n.directiveStart,r=n.directiveEnd;Do(n)&&yD(e,n,t.data[i+n.componentOffset]),t.firstCreatePass||h_(n,e);let o=n.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=mc(e,t,s,n);if(oa(l,e),o!==null&&AD(e,s-i,l,a,n,o),hr(a)){let c=On(n.index,e);c[ot]=mc(e,t,s,n)}}}function CD(t,e,n){let i=n.directiveStart,r=n.directiveEnd,o=n.index,s=FT();try{ur(o);for(let a=i;a<r;a++){let l=t.data[a],c=e[a];$f(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&TD(l,c)}}finally{ur(-1),$f(s)}}function TD(t,e){t.hostBindings!==null&&t.hostBindings(1,e)}function dx(t,e){let n=t.directiveRegistry,i=null;if(n)for(let r=0;r<n.length;r++){let o=n[r];ox(e,o.selectors,!1)&&(i??=[],hr(o)?i.unshift(o):i.push(o))}return i}function ID(t,e,n,i,r,o){let s=Fn(t,e);DD(e[st],s,o,t.value,n,i,r)}function DD(t,e,n,i,r,o,s){if(o==null)t.removeAttribute(e,r,n);else{let a=s==null?Nn(o):s(o,i||"",r);t.setAttribute(e,r,a,n)}}function AD(t,e,n,i,r,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];uh(i,n,l,c)}}function RD(t,e){let n=t[_o],i=n?n.get(Et,null):null;i&&i.handleError(e)}function gp(t,e,n,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],d=e.data[c];uh(d,n[c],u,r),a=!0}if(o)for(let l of o){let c=n[l],u=e.data[l];uh(u,c,i,r),a=!0}return a}function ND(t,e){let n=On(e,t),i=n[ie];PD(i,n);let r=n[ri];r!==null&&n[yo]===null&&(n[yo]=V_(r,n[_o])),ke(18),vp(i,n,n[ot]),ke(19,n[ot])}function PD(t,e){for(let n=e.length;n<t.blueprint.length;n++)e.push(t.blueprint[n])}function vp(t,e,n){Kh(e);try{let i=t.viewQuery;i!==null&&th(1,i,n);let r=t.template;r!==null&&cx(t,e,r,1,n),t.firstCreatePass&&(t.firstCreatePass=!1),e[ti]?.finishViewCreation(t),t.staticContentQueries&&U_(t,e),t.staticViewQueries&&th(2,t.viewQuery,n);let o=t.components;o!==null&&LD(e,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{e[Q]&=-5,Jh()}}function LD(t,e){for(let n=0;n<e.length;n++)ND(t,e[n])}function ua(t,e,n,i){let r=ae(null);try{let o=e.tView,a=t[Q]&4096?4096:16,l=hp(t,o,n,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[e.index];l[sr]=c;let u=t[ti];return u!==null&&(l[ti]=u.createEmbeddedView(o)),vp(o,l,n),l}finally{ae(r)}}function wo(t,e){return!e||e.firstChild===null||T_(t)}var OD;function yp(t,e){return OD(t,e)}var ii=function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t}(ii||{});function _p(t){return(t.flags&32)===32}function po(t,e,n,i,r){if(i!=null){let o,s=!1;oi(i)?o=i:Ci(i)&&(s=!0,i=i[ri]);let a=Ln(i);t===0&&n!==null?r==null?Q_(e,n,a):yc(e,n,a,r||null,!0):t===1&&n!==null?yc(e,n,a,r||null,!0):t===2?ZI(e,a,s):t===3&&e.destroyNode(a),o!=null&&GD(e,t,o,n,r)}}function kD(t,e){fx(t,e),e[ri]=null,e[Lt]=null}function FD(t,e,n,i,r,o){i[ri]=r,i[Lt]=e,Bc(t,i,n,1,r,o)}function fx(t,e){e[ei].changeDetectionScheduler?.notify(9),Bc(t,e,e[st],2,null,null)}function VD(t){let e=t[$s];if(!e)return If(t[ie],t);for(;e;){let n=null;if(Ci(e))n=e[$s];else{let i=e[xt];i&&(n=i)}if(!n){for(;e&&!e[vn]&&e!==t;)Ci(e)&&If(e[ie],e),e=e[bt];e===null&&(e=t),Ci(e)&&If(e[ie],e),n=e&&e[vn]}e=n}}function xp(t,e){let n=t[xo],i=n.indexOf(e);n.splice(i,1)}function zc(t,e){if(Ao(e))return;let n=e[st];n.destroyNode&&Bc(t,e,n,3,null,null),VD(e)}function If(t,e){if(Ao(e))return;let n=ae(null);try{e[Q]&=-129,e[Q]|=256,e[tn]&&Rs(e[tn]),zD(t,e),UD(t,e),e[ie].type===1&&e[st].destroy();let i=e[sr];if(i!==null&&oi(e[bt])){i!==e[bt]&&xp(i,e);let r=e[ti];r!==null&&r.detachView(t)}Qf(e)}finally{ae(n)}}function UD(t,e){let n=t.cleanup,i=e[lc];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[n[s+1]];n[s].call(a)}i!==null&&(e[lc]=null);let r=e[Ei];if(r!==null){e[Ei]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=e[ar];if(o!==null){e[ar]=null;for(let s of o)s.destroy()}}function zD(t,e){let n;if(t!=null&&(n=t.destroyHooks)!=null)for(let i=0;i<n.length;i+=2){let r=e[n[i]];if(!(r instanceof qs)){let o=n[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];ke(4,a,l);try{l.call(a)}finally{ke(5,a,l)}}else{ke(4,r,o);try{o.call(r)}finally{ke(5,r,o)}}}}}function hx(t,e,n){return BD(t,e.parent,n)}function BD(t,e,n){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return n[ri];if(Do(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===kn.None||r===kn.Emulated)return null}return Fn(i,n)}function px(t,e,n){return WD(t,e,n)}function HD(t,e,n){return t.type&40?Fn(t,n):null}var WD=HD,Zy;function bp(t,e,n,i){let r=hx(t,i,e),o=e[st],s=i.parent||e[Lt],a=px(s,i,e);if(r!=null)if(Array.isArray(n))for(let l=0;l<n.length;l++)Xy(o,r,n[l],a,!1);else Xy(o,r,n,a,!1);Zy!==void 0&&Zy(o,i,e,n,r)}function Ws(t,e){if(e!==null){let n=e.type;if(n&3)return Fn(e,t);if(n&4)return dh(-1,t[e.index]);if(n&8){let i=e.child;if(i!==null)return Ws(t,i);{let r=t[e.index];return oi(r)?dh(-1,r):Ln(r)}}else{if(n&128)return Ws(t,e.next);if(n&32)return yp(e,t)()||Ln(t[e.index]);{let i=mx(t,e);if(i!==null){if(Array.isArray(i))return i[0];let r=cr(t[$t]);return Ws(r,i)}else return Ws(t,e.next)}}}return null}function mx(t,e){if(e!==null){let i=t[$t][Lt],r=e.projection;return i.projection[r]}return null}function dh(t,e){let n=xt+t+1;if(n<e.length){let i=e[n],r=i[ie].firstChild;if(r!==null)return Ws(i,r)}return e[lr]}function Sp(t,e,n,i,r,o,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=i[n.index],l=n.type;if(s&&e===0&&(a&&oa(Ln(a),i),n.flags|=2),!_p(n))if(l&8)Sp(t,e,n.child,i,r,o,!1),po(e,t,r,a,o);else if(l&32){let c=yp(n,i),u;for(;u=c();)po(e,t,r,u,o);po(e,t,r,a,o)}else l&16?gx(t,e,i,n,r,o):po(e,t,r,a,o);n=s?n.projectionNext:n.next}}function Bc(t,e,n,i,r,o){Sp(n,i,t.firstChild,e,r,o,!1)}function jD(t,e,n){let i=e[st],r=hx(t,n,e),o=n.parent||e[Lt],s=px(o,n,e);gx(i,0,e,n,r,s)}function gx(t,e,n,i,r,o){let s=n[$t],l=s[Lt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];po(e,t,r,u,o)}else{let c=l,u=s[bt];T_(i)&&(c.flags|=128),Sp(t,e,c,u,r,o,!0)}}function GD(t,e,n,i,r){let o=n[lr],s=Ln(n);o!==s&&po(e,t,i,o,r);for(let a=xt;a<n.length;a++){let l=n[a];Bc(l[ie],l,t,e,i,o)}}function $D(t,e,n,i,r){if(e)r?t.addClass(n,i):t.removeClass(n,i);else{let o=i.indexOf("-")===-1?void 0:ii.DashCase;r==null?t.removeStyle(n,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=ii.Important),t.setStyle(n,i,r,o))}}function _c(t,e,n,i,r=!1){for(;n!==null;){if(n.type===128){n=r?n.projectionNext:n.next;continue}let o=e[n.index];o!==null&&i.push(Ln(o)),oi(o)&&qD(o,i);let s=n.type;if(s&8)_c(t,e,n.child,i);else if(s&32){let a=yp(n,e),l;for(;l=a();)i.push(l)}else if(s&16){let a=mx(e,n);if(Array.isArray(a))i.push(...a);else{let l=cr(e[$t]);_c(l[ie],l,a,i,!0)}}n=r?n.projectionNext:n.next}return i}function qD(t,e){for(let n=xt;n<t.length;n++){let i=t[n],r=i[ie].firstChild;r!==null&&_c(i[ie],i,r,e)}t[lr]!==t[ri]&&e.push(t[lr])}function vx(t){if(t[Ef]!==null){for(let e of t[Ef])e.impl.addSequence(e);t[Ef].length=0}}var yx=[];function XD(t){return t[tn]??YD(t)}function YD(t){let e=yx.pop()??Object.create(KD);return e.lView=t,e}function ZD(t){t.lView[tn]!==t&&(t.lView=null,yx.push(t))}var KD=M(y({},Kr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{ta(t.lView)},consumerOnSignalRead(){this.lView[tn]=this}});function JD(t){let e=t[tn]??Object.create(QD);return e.lView=t,e}var QD=M(y({},Kr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let e=cr(t.lView);for(;e&&!_x(e[ie]);)e=cr(e);e&&j0(e)},consumerOnSignalRead(){this.lView[tn]=this}});function _x(t){return t.type!==2}function xx(t){if(t[ar]===null)return;let e=!0;for(;e;){let n=!1;for(let i of t[ar])i.dirty&&(n=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=n&&!!(t[Q]&8192)}}var eA=100;function bx(t,e=!0,n=0){let r=t[ei].rendererFactory,o=!1;o||r.begin?.();try{tA(t,n)}catch(s){throw e&&RD(t,s),s}finally{o||r.end?.()}}function tA(t,e){let n=K0();try{dc(!0),fh(t,e);let i=0;for(;Nc(t);){if(i===eA)throw new B(103,!1);i++,fh(t,1)}}finally{dc(n)}}function nA(t,e,n,i){if(Ao(e))return;let r=e[Q],o=!1,s=!1;Kh(e);let a=!0,l=null,c=null;o||(_x(t)?(c=XD(e),l=As(c)):Gd()===null?(a=!1,c=JD(e),l=As(c)):e[tn]&&(Rs(e[tn]),e[tn]=null));try{W0(e),LT(t.bindingStartIndex),n!==null&&cx(t,e,n,2,i);let u=(r&3)===3;if(!o)if(u){let f=t.preOrderCheckHooks;f!==null&&Jl(e,f,null)}else{let f=t.preOrderHooks;f!==null&&Ql(e,f,0,null),Cf(e,0)}if(s||iA(e),xx(e),Sx(e,0),t.contentQueries!==null&&U_(t,e),!o)if(u){let f=t.contentCheckHooks;f!==null&&Jl(e,f)}else{let f=t.contentHooks;f!==null&&Ql(e,f,1),Cf(e,1)}oA(t,e);let d=t.components;d!==null&&Mx(e,d,0);let m=t.viewQuery;if(m!==null&&th(2,m,i),!o)if(u){let f=t.viewCheckHooks;f!==null&&Jl(e,f)}else{let f=t.viewHooks;f!==null&&Ql(e,f,2),Cf(e,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),e[Mf]){for(let f of e[Mf])f();e[Mf]=null}o||(vx(e),e[Q]&=-73)}catch(u){throw o||ta(e),u}finally{c!==null&&(ml(c,l),a&&ZD(c)),Jh()}}function Sx(t,e){for(let n=A_(t);n!==null;n=R_(n))for(let i=xt;i<n.length;i++){let r=n[i];wx(r,e)}}function iA(t){for(let e=A_(t);e!==null;e=R_(e)){if(!(e[Q]&2))continue;let n=e[xo];for(let i=0;i<n.length;i++){let r=n[i];j0(r)}}}function rA(t,e,n){ke(18);let i=On(e,t);wx(i,n),ke(19,i[ot])}function wx(t,e){$h(t)&&fh(t,e)}function fh(t,e){let i=t[ie],r=t[Q],o=t[tn],s=!!(e===0&&r&16);if(s||=!!(r&64&&e===0),s||=!!(r&1024),s||=!!(o?.dirty&&gl(o)),s||=!1,o&&(o.dirty=!1),t[Q]&=-9217,s)nA(i,t,i.template,t[ot]);else if(r&8192){xx(t),Sx(t,1);let a=i.components;a!==null&&Mx(t,a,1),vx(t)}}function Mx(t,e,n){for(let i=0;i<e.length;i++)rA(t,e[i],n)}function oA(t,e){let n=t.hostBindingOpCodes;if(n!==null)try{for(let i=0;i<n.length;i++){let r=n[i];if(r<0)ur(~r);else{let o=r,s=n[++i],a=n[++i];kT(s,o);let l=e[o];ke(24,l),a(2,l),ke(25,l)}}}finally{ur(-1)}}function wp(t,e){let n=K0()?64:1088;for(t[ei].changeDetectionScheduler?.notify(e);t;){t[Q]|=n;let i=cr(t);if(uc(t)&&!i)return t;t=i}return null}function Ex(t,e,n,i){return[t,!0,0,e,null,i,null,n,null,null]}function Cx(t,e){let n=xt+e;if(n<t.length)return t[n]}function da(t,e,n,i=!0){let r=e[ie];if(sA(r,e,t,n),i){let s=dh(n,t),a=e[st],l=a.parentNode(t[lr]);l!==null&&FD(r,t[Lt],a,e,l,s)}let o=e[yo];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Tx(t,e){let n=Ys(t,e);return n!==void 0&&zc(n[ie],n),n}function Ys(t,e){if(t.length<=xt)return;let n=xt+e,i=t[n];if(i){let r=i[sr];r!==null&&r!==t&&xp(r,i),e>0&&(t[n-1][vn]=i[vn]);let o=sc(t,xt+e);kD(i[ie],i);let s=o[ti];s!==null&&s.detachView(o[ie]),i[bt]=null,i[vn]=null,i[Q]&=-129}return i}function sA(t,e,n,i){let r=xt+i,o=n.length;i>0&&(n[r-1][vn]=e),i<o-xt?(e[vn]=n[r],E0(n,xt+i,e)):(n.push(e),e[vn]=null),e[bt]=n;let s=e[sr];s!==null&&n!==s&&Ix(s,e);let a=e[ti];a!==null&&a.insertView(t),jf(e),e[Q]|=128}function Ix(t,e){let n=t[xo],i=e[bt];if(Ci(i))t[Q]|=2;else{let r=i[bt][$t];e[$t]!==r&&(t[Q]|=2)}n===null?t[xo]=[e]:n.push(e)}var Zs=class{_lView;_cdRefInjectingView;notifyErrorHandler;_appRef=null;_attachedToViewContainer=!1;get rootNodes(){let e=this._lView,n=e[ie];return _c(n,e,n.firstChild,[])}constructor(e,n,i=!0){this._lView=e,this._cdRefInjectingView=n,this.notifyErrorHandler=i}get context(){return this._lView[ot]}set context(e){this._lView[ot]=e}get destroyed(){return Ao(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[bt];if(oi(e)){let n=e[cc],i=n?n.indexOf(this):-1;i>-1&&(Ys(e,i),sc(n,i))}this._attachedToViewContainer=!1}zc(this._lView[ie],this._lView)}onDestroy(e){G0(this._lView,e)}markForCheck(){wp(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Q]&=-129}reattach(){jf(this._lView),this._lView[Q]|=128}detectChanges(){this._lView[Q]|=1024,bx(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new B(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=uc(this._lView),n=this._lView[sr];n!==null&&!e&&xp(n,this._lView),fx(this._lView[ie],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new B(902,!1);this._appRef=e;let n=uc(this._lView),i=this._lView[sr];i!==null&&!n&&Ix(i,this._lView),jf(this._lView)}};var Ks=(()=>{class t{static __NG_ELEMENT_ID__=cA}return t})(),aA=Ks,lA=class extends aA{_declarationLView;_declarationTContainer;elementRef;constructor(e,n,i){super(),this._declarationLView=e,this._declarationTContainer=n,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,n){return this.createEmbeddedViewImpl(e,n)}createEmbeddedViewImpl(e,n,i){let r=ua(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:n,dehydratedView:i});return new Zs(r)}};function cA(){return Mp(nn(),ue())}function Mp(t,e){return t.type&4?new lA(e,t,Po(t,e)):null}function Hc(t,e,n,i,r){let o=t.data[e];if(o===null)o=uA(t,e,n,i,r),OT()&&(o.flags|=32);else if(o.type&64){o.type=n,o.value=i,o.attrs=r;let s=PT();o.injectorIndex=s===null?-1:s.injectorIndex}return na(o,!0),o}function uA(t,e,n,i,r){let o=X0(),s=Y0(),a=s?o:o&&o.parent,l=t.data[e]=fA(t,a,n,e,i,r);return dA(t,l,o,s),l}function dA(t,e,n,i){t.firstChild===null&&(t.firstChild=e),n!==null&&(i?n.child==null&&e.parent!==null&&(n.child=e):n.next===null&&(n.next=e,e.prev=n))}function fA(t,e,n,i,r,o){let s=e?e.injectorIndex:-1,a=0;return q0()&&(a|=128),{type:n,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var AW=new RegExp(`^(\\d+)*(${wI}|${SI})*(.*)`);var hA=()=>null;function Mo(t,e){return hA(t,e)}var pA=class{},Dx=class{},hh=class{resolveComponentFactory(e){throw Error(`No component factory found for ${Nt(e)}.`)}},Wc=class{static NULL=new hh},Eo=class{},Ep=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>mA()}return t})();function mA(){let t=ue(),e=nn(),n=On(e.index,t);return(Ci(n)?n:t)[st]}var gA=(()=>{class t{static \u0275prov=k({token:t,providedIn:"root",factory:()=>null})}return t})();var Df={},ph=class{injector;parentInjector;constructor(e,n){this.injector=e,this.parentInjector=n}get(e,n,i){i=Dc(i);let r=this.injector.get(e,Df,i);return r!==Df||n===Df?r:this.parentInjector.get(e,n,i)}};function Ky(t,e,n){let i=n?t.styles:null,r=n?t.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)r=Of(r,a);else if(o==2){let l=a,c=e[++s];i=Of(i,l+": "+c+";")}}n?t.styles=i:t.stylesWithoutHost=i,n?t.classes=r:t.classesWithoutHost=r}function Un(t,e=oe.Default){let n=ue();if(n===null)return L(t,e);let i=nn();return v_(i,n,en(t),e)}function Ax(t,e,n,i,r){let o=i===null?null:{"":-1},s=r(t,n);if(s!==null){let a,l=null,c=null,u=yA(s);u===null?a=s:[a,l,c]=u,bA(t,e,n,a,o,l,c)}o!==null&&i!==null&&vA(n,i,o)}function vA(t,e,n){let i=t.localNames=[];for(let r=0;r<e.length;r+=2){let o=n[e[r+1]];if(o==null)throw new B(-301,!1);i.push(e[r],o)}}function yA(t){let e=null,n=!1;for(let s=0;s<t.length;s++){let a=t[s];if(s===0&&hr(a)&&(e=a),a.findHostDirectiveDefs!==null){n=!0;break}}if(!n)return null;let i=null,r=null,o=null;for(let s of t)s.findHostDirectiveDefs!==null&&(i??=[],r??=new Map,o??=new Map,_A(s,i,o,r)),s===e&&(i??=[],i.push(s));return i!==null?(i.push(...e===null?t:t.slice(1)),[i,r,o]):null}function _A(t,e,n,i){let r=e.length;t.findHostDirectiveDefs(t,e,i),n.set(t,[r,e.length-1])}function xA(t,e,n){e.componentOffset=n,(t.components??=[]).push(e.index)}function bA(t,e,n,i,r,o,s){let a=i.length,l=!1;for(let m=0;m<a;m++){let f=i[m];!l&&hr(f)&&(l=!0,xA(t,n,m)),QT(h_(n,e),t,f.type)}TA(n,t.data.length,a);for(let m=0;m<a;m++){let f=i[m];f.providersResolver&&f.providersResolver(f)}let c=!1,u=!1,d=ax(t,e,a,null);a>0&&(n.directiveToIndex=new Map);for(let m=0;m<a;m++){let f=i[m];if(n.mergedAttrs=tp(n.mergedAttrs,f.hostAttrs),wA(t,n,e,d,f),CA(d,f,r),s!==null&&s.has(f)){let[b,R]=s.get(f);n.directiveToIndex.set(f.type,[d,b+n.directiveStart,R+n.directiveStart])}else(o===null||!o.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let v=f.type.prototype;!c&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((t.preOrderHooks??=[]).push(n.index),c=!0),!u&&(v.ngOnChanges||v.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}SA(t,n,o)}function SA(t,e,n){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=t.data[i];if(n===null||!n.has(r))Jy(0,e,r,i),Jy(1,e,r,i),e0(e,i,!1);else{let o=n.get(r);Qy(0,e,o,i),Qy(1,e,o,i),e0(e,i,!0)}}}function Jy(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(i),Rx(e,o)}}function Qy(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),Rx(e,s)}}function Rx(t,e){e==="class"?t.flags|=8:e==="style"&&(t.flags|=16)}function e0(t,e,n){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!n&&r===null||n&&o===null||dp(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!n&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===e){s??=[],s.push(l,i[a+1]);break}}else if(n&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===e){s??=[],s.push(c[u+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function wA(t,e,n,i,r){t.data[i]=r;let o=r.factory||(r.factory=rr(r.type,!0)),s=new qs(o,hr(r),Un);t.blueprint[i]=s,n[i]=s,MA(t,e,i,ax(t,n,r.hostVars,Ot),r)}function MA(t,e,n,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~e.index;EA(s)!=a&&s.push(a),s.push(n,i,o)}}function EA(t){let e=t.length;for(;e>0;){let n=t[--e];if(typeof n=="number"&&n<0)return n}return 0}function CA(t,e,n){if(n){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)n[e.exportAs[i]]=t;hr(e)&&(n[""]=t)}}function TA(t,e,n){t.flags|=1,t.directiveStart=e,t.directiveEnd=e+n,t.providerIndexes=e}function Nx(t,e,n,i,r,o,s,a){let l=e.consts,c=bo(l,s),u=Hc(e,t,2,i,c);return o&&Ax(e,n,u,bo(l,a),r),u.mergedAttrs=tp(u.mergedAttrs,u.attrs),u.attrs!==null&&Ky(u,u.attrs,!1),u.mergedAttrs!==null&&Ky(u,u.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,u),u}function Px(t,e){a_(t,e),O0(e)&&t.queries.elementEnd(e)}var xc=class extends Wc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let n=vo(e);return new Js(n,this.ngModule)}};function IA(t){return Object.keys(t).map(e=>{let[n,i,r]=t[e],o={propName:n,templateName:e,isSignal:(i&Uc.SignalBased)!==0};return r&&(o.transform=r),o})}function DA(t){return Object.keys(t).map(e=>({propName:t[e],templateName:e}))}function AA(t,e,n){let i=e instanceof Gt?e:e?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new ph(n,i):n}function RA(t){let e=t.get(Eo,null);if(e===null)throw new B(407,!1);let n=t.get(gA,null),i=t.get(So,null);return{rendererFactory:e,sanitizer:n,changeDetectionScheduler:i}}function NA(t,e){let n=(t.selectors[0][0]||"div").toLowerCase();return J_(e,n,n==="svg"?z0:n==="math"?bT:null)}var Js=class extends Dx{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=IA(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=DA(this.componentDef.outputs),this.cachedOutputs}constructor(e,n){super(),this.componentDef=e,this.ngModule=n,this.componentType=e.type,this.selector=pD(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!n}create(e,n,i,r){ke(22);let o=ae(null);try{let s=this.componentDef,a=i?["ng-version","19.2.21"]:mD(this.componentDef.selectors[0]),l=fp(0,null,null,1,0,null,null,null,null,[a],null),c=AA(s,r||this.ngModule,e),u=RA(c),d=u.rendererFactory.createRenderer(null,s),m=i?_D(d,i,s.encapsulation,c):NA(s,d),f=hp(null,l,null,512|sx(s),null,null,u,d,c,null,V_(m,c,!0));f[ht]=m,Kh(f);let v=null;try{let b=Nx(ht,l,f,"#host",()=>[this.componentDef],!0,0);m&&(ex(d,m,b),oa(m,f)),mp(l,f,b),z_(l,b,f),Px(l,b),n!==void 0&&PA(b,this.ngContentSelectors,n),v=On(b.index,f),f[ot]=v[ot],vp(l,f,null)}catch(b){throw v!==null&&Qf(v),Qf(f),b}finally{ke(23),Jh()}return new mh(this.componentType,f)}finally{ae(o)}}},mh=class extends pA{_rootLView;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,n){super(),this._rootLView=n,this._tNode=Gh(n[ie],ht),this.location=Po(this._tNode,n),this.instance=On(this._tNode.index,n)[ot],this.hostView=this.changeDetectorRef=new Zs(n,void 0,!1),this.componentType=e}setInput(e,n){let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),n))return;let r=this._rootLView,o=gp(i,r[ie],r,e,n);this.previousInputValues.set(e,n);let s=On(i.index,r);wp(s,1)}get injector(){return new ir(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function PA(t,e,n){let i=t.projection=[];for(let r=0;r<e.length;r++){let o=n[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Lo=(()=>{class t{static __NG_ELEMENT_ID__=LA}return t})();function LA(){let t=nn();return Ox(t,ue())}var OA=Lo,Lx=class extends OA{_lContainer;_hostTNode;_hostLView;constructor(e,n,i){super(),this._lContainer=e,this._hostTNode=n,this._hostLView=i}get element(){return Po(this._hostTNode,this._hostLView)}get injector(){return new ir(this._hostTNode,this._hostLView)}get parentInjector(){let e=np(this._hostTNode,this._hostLView);if(u_(e)){let n=hc(e,this._hostLView),i=fc(e),r=n[ie].data[i+8];return new ir(r,n)}else return new ir(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let n=t0(this._lContainer);return n!==null&&n[e]||null}get length(){return this._lContainer.length-xt}createEmbeddedView(e,n,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=Mo(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(n||{},o,s);return this.insertImpl(a,r,wo(this._hostTNode,s)),a}createComponent(e,n,i,r,o){let s=e&&!vT(e),a;if(s)a=n;else{let v=n||{};a=v.index,i=v.injector,r=v.projectableNodes,o=v.environmentInjector||v.ngModuleRef}let l=s?e:new Js(vo(e)),c=i||this.parentInjector;if(!o&&l.ngModule==null){let b=(s?c:this.parentInjector).get(Gt,null);b&&(o=b)}let u=vo(l.componentType??{}),d=Mo(this._lContainer,u?.id??null),m=d?.firstChild??null,f=l.create(c,r,m,o);return this.insertImpl(f.hostView,a,wo(this._hostTNode,d)),f}insert(e,n){return this.insertImpl(e,n,!0)}insertImpl(e,n,i){let r=e._lView;if(MT(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let l=r[bt],c=new Lx(l,l[Lt],l[bt]);c.detach(c.indexOf(e))}}let o=this._adjustIndex(n),s=this._lContainer;return da(s,r,o,i),e.attachToViewContainerRef(),E0(Af(s),o,e),e}move(e,n){return this.insert(e,n)}indexOf(e){let n=t0(this._lContainer);return n!==null?n.indexOf(e):-1}remove(e){let n=this._adjustIndex(e,-1),i=Ys(this._lContainer,n);i&&(sc(Af(this._lContainer),n),zc(i[ie],i))}detach(e){let n=this._adjustIndex(e,-1),i=Ys(this._lContainer,n);return i&&sc(Af(this._lContainer),n)!=null?new Zs(i):null}_adjustIndex(e,n=0){return e??this.length+n}};function t0(t){return t[cc]}function Af(t){return t[cc]||(t[cc]=[])}function Ox(t,e){let n,i=e[t.index];return oi(i)?n=i:(n=Ex(i,e,null,t),e[t.index]=n,pp(e,n)),FA(n,e,t,i),new Lx(n,t,e)}function kA(t,e){let n=t[st],i=n.createComment(""),r=Fn(e,t),o=n.parentNode(r);return yc(n,o,i,n.nextSibling(r),!1),i}var FA=zA,VA=()=>!1;function UA(t,e,n){return VA(t,e,n)}function zA(t,e,n,i){if(t[lr])return;let r;n.type&8?r=Ln(i):r=kA(e,n),t[lr]=r}var gh=class t{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},vh=class t{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let n=e.queries;if(n!==null){let i=e.contentQueries!==null?e.contentQueries[0]:n.length,r=[];for(let o=0;o<i;o++){let s=n.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let n=0;n<this.queries.length;n++)Tp(e,n).matches!==null&&this.queries[n].setDirty()}},yh=class{flags;read;predicate;constructor(e,n,i=null){this.flags=n,this.read=i,typeof e=="string"?this.predicate=$A(e):this.predicate=e}},_h=class t{queries;constructor(e=[]){this.queries=e}elementStart(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,n)}elementEnd(e){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(e)}embeddedTView(e){let n=null;for(let i=0;i<this.length;i++){let r=n!==null?n.length:0,o=this.getByIndex(i).embeddedTView(e,r);o&&(o.indexInDeclarationView=i,n!==null?n.push(o):n=[o])}return n!==null?new t(n):null}template(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,n)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},xh=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,n=-1){this.metadata=e,this._declarationNodeIndex=n}elementStart(e,n){this.isApplyingToNode(n)&&this.matchTNode(e,n)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,n){this.elementStart(e,n)}embeddedTView(e,n){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,n),new t(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==n;)i=i.parent;return n===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,n){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(e,n,BA(n,o)),this.matchTNodeWithReadOption(e,n,ec(n,e,o,!1,!1))}else i===Ks?n.type&4&&this.matchTNodeWithReadOption(e,n,-1):this.matchTNodeWithReadOption(e,n,ec(n,e,i,!1,!1))}matchTNodeWithReadOption(e,n,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===gr||r===Lo||r===Ks&&n.type&4)this.addMatch(n.index,-2);else{let o=ec(n,e,r,!1,!1);o!==null&&this.addMatch(n.index,o)}else this.addMatch(n.index,i)}}addMatch(e,n){this.matches===null?this.matches=[e,n]:this.matches.push(e,n)}};function BA(t,e){let n=t.localNames;if(n!==null){for(let i=0;i<n.length;i+=2)if(n[i]===e)return n[i+1]}return null}function HA(t,e){return t.type&11?Po(t,e):t.type&4?Mp(t,e):null}function WA(t,e,n,i){return n===-1?HA(e,t):n===-2?jA(t,e,i):mc(t,t[ie],n,e)}function jA(t,e,n){if(n===gr)return Po(e,t);if(n===Ks)return Mp(e,t);if(n===Lo)return Ox(e,t)}function kx(t,e,n,i){let r=e[ti].queries[i];if(r.matches===null){let o=t.data,s=n.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(WA(e,u,s[l+1],n.metadata.read))}}r.matches=a}return r.matches}function bh(t,e,n,i){let r=t.queries.getByIndex(n),o=r.matches;if(o!==null){let s=kx(t,e,r,n);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],u=e[-l];for(let d=xt;d<u.length;d++){let m=u[d];m[sr]===m[bt]&&bh(m[ie],m,c,i)}if(u[xo]!==null){let d=u[xo];for(let m=0;m<d.length;m++){let f=d[m];bh(f[ie],f,c,i)}}}}}return i}function Cp(t,e){return t[ti].queries[e].queryList}function GA(t,e,n){let i=new Jf((n&4)===4);return TT(t,e,i,i.destroy),(e[ti]??=new vh).queries.push(new gh(i))-1}function Fx(t,e,n){let i=Ct();return i.firstCreatePass&&(qA(i,new yh(t,e,n),-1),(e&2)===2&&(i.staticViewQueries=!0)),GA(i,ue(),e)}function $A(t){return t.split(",").map(e=>e.trim())}function qA(t,e,n){t.queries===null&&(t.queries=new _h),t.queries.track(new xh(e,n))}function Tp(t,e){return t.queries.getByIndex(e)}function Vx(t,e){let n=t[ie],i=Tp(n,e);return i.crossesNgTemplate?bh(n,t,e,[]):kx(n,t,i,e)}function Ux(t,e,n){let i,r=_l(()=>{i._dirtyCounter();let o=KA(i,t);if(e&&o===void 0)throw new B(-951,!1);return o});return i=r[jt],i._dirtyCounter=Ie(0),i._flatValue=void 0,r}function XA(t){return Ux(!0,!1,t)}function YA(t){return Ux(!0,!0,t)}function ZA(t,e){let n=t[jt];n._lView=ue(),n._queryIndex=e,n._queryList=Cp(n._lView,e),n._queryList.onDirty(()=>n._dirtyCounter.update(i=>i+1))}function KA(t,e){let n=t._lView,i=t._queryIndex;if(n===void 0||i===void 0||n[Q]&4)return e?void 0:Pn;let r=Cp(n,i),o=Vx(n,i);return r.reset(o,C_),e?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}function n0(t,e){return XA(e)}function JA(t,e){return YA(e)}var Oo=(n0.required=JA,n0);var Co=class{},Ip=class{};var Sh=class extends Co{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new xc(this);constructor(e,n,i,r=!0){super(),this.ngModuleType=e,this._parent=n;let o=I0(e);this._bootstrapComponents=ix(o.bootstrap),this._r3Injector=x_(e,n,[{provide:Co,useValue:this},{provide:Wc,useValue:this.componentFactoryResolver},...i],Nt(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},wh=class extends Ip{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new Sh(this.moduleType,e,[])}};var bc=class extends Co{injector;componentFactoryResolver=new xc(this);instance=null;constructor(e){super();let n=new Gs([...e.providers,{provide:Co,useValue:this},{provide:Wc,useValue:this.componentFactoryResolver}],e.parent||Hh(),e.debugName,new Set(["environment"]));this.injector=n,e.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function jc(t,e,n=null){return new bc({providers:t,parent:e,debugName:n,runEnvironmentInitializers:!0}).injector}var QA=(()=>{class t{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let i=D0(!1,n.type),r=i.length>0?jc([i],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,r)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=k({token:t,providedIn:"environment",factory:()=>new t(L(Gt))})}return t})();function De(t){return Tc(()=>{let e=zx(t),n=M(y({},e),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===I_.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&t.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(QA).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||kn.Emulated,styles:t.styles||Pn,_:null,schemas:t.schemas||null,tView:null,id:""});e.standalone&&aa("NgStandalone"),Bx(n);let i=t.dependencies;return n.directiveDefs=i0(i,!1),n.pipeDefs=i0(i,!0),n.id=r1(n),n})}function e1(t){return vo(t)||oT(t)}function t1(t){return t!==null}function n1(t,e){if(t==null)return go;let n={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=Uc.None,l=null),n[o]=[i,a,l],e[o]=s}return n}function i1(t){if(t==null)return go;let e={};for(let n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}function fa(t){return Tc(()=>{let e=zx(t);return Bx(e),e})}function Gc(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function zx(t){let e={};return{type:t.type,providersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:e,inputConfig:t.inputs||go,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||Pn,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:n1(t.inputs,e),outputs:i1(t.outputs),debugInfo:null}}function Bx(t){t.features?.forEach(e=>e(t))}function i0(t,e){if(!t)return null;let n=e?sT:e1;return()=>(typeof t=="function"?t():t).map(i=>n(i)).filter(t1)}function r1(t){let e=0,n=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,n,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function Hx(t,e,n){return t[e]=n}function yn(t,e,n){let i=t[e];return Object.is(i,n)?!1:(t[e]=n,!0)}function Dp(t,e,n,i){let r=yn(t,e,n);return yn(t,e+1,i)||r}function o1(t,e,n,i,r){let o=Dp(t,e,n,i);return yn(t,e+2,r)||o}function s1(t,e,n,i,r,o,s,a,l){let c=e.consts,u=Hc(e,t,4,s||null,a||null);$0()&&Ax(e,n,u,bo(c,l),dx),u.mergedAttrs=tp(u.mergedAttrs,u.attrs),a_(e,u);let d=u.tView=fp(2,u,i,r,o,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function Sc(t,e,n,i,r,o,s,a,l,c){let u=n+ht,d=e.firstCreatePass?s1(u,e,t,i,r,o,s,a,l):e.data[u];na(d,!1);let m=a1(e,t,d,n);Qh()&&bp(e,t,m,d),oa(m,t);let f=Ex(m,t,m,d);return t[u]=f,pp(t,f),UA(f,d,t),jh(d)&&mp(e,t,d),l!=null&&ux(t,d,c),d}function Ue(t,e,n,i,r,o,s,a){let l=ue(),c=Ct(),u=bo(c.consts,o);return Sc(l,c,t,e,n,i,r,u,s,a),Ue}var a1=l1;function l1(t,e,n,i){return ep(!0),e[st].createComment("")}var Ap=(()=>{class t{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();var Wx=new A("");var jx=(()=>{class t{static \u0275prov=k({token:t,providedIn:"root",factory:()=>new Mh})}return t})(),Mh=class{queuedEffectCount=0;queues=new Map;schedule(e){this.enqueue(e)}remove(e){let n=e.zone,i=this.queues.get(n);i.has(e)&&(i.delete(e),this.queuedEffectCount--)}enqueue(e){let n=e.zone;this.queues.has(n)||this.queues.set(n,new Set);let i=this.queues.get(n);i.has(e)||(this.queuedEffectCount++,i.add(e))}flush(){for(;this.queuedEffectCount>0;)for(let[e,n]of this.queues)e===null?this.flushQueue(n):e.run(()=>this.flushQueue(n))}flushQueue(e){for(let n of e)e.delete(n),this.queuedEffectCount--,n.run()}};function ha(t){return!!t&&typeof t.then=="function"}function Gx(t){return!!t&&typeof t.subscribe=="function"}var c1=new A("");var $x=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,i)=>{this.resolve=n,this.reject=i});appInits=w(c1,{optional:!0})??[];injector=w(Mt);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let r of this.appInits){let o=_n(this.injector,r);if(ha(o))n.push(o);else if(Gx(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});n.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{i()}).catch(r=>{this.reject(r)}),n.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Rp=new A("");function u1(){Yd(()=>{throw new B(600,!1)})}function d1(t){return t.isBoundToModule}var f1=10;var Ti=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=w(hI);afterRenderManager=w(CI);zonelessEnabled=w(Oc);rootEffectScheduler=w(jx);dirtyFlags=0;tracingSnapshot=null;externalTestViews=new Set;afterTick=new Ae;get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];isStable=w(No).hasPendingTasks.pipe(W(n=>!n));constructor(){w(kc,{optional:!0})}whenStable(){let n;return new Promise(i=>{n=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{n.unsubscribe()})}_injector=w(Gt);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,i){return this.bootstrapImpl(n,i)}bootstrapImpl(n,i,r=Mt.NULL){ke(10);let o=n instanceof Dx;if(!this._injector.get($x).done){let f="";throw new B(405,f)}let a;o?a=n:a=this._injector.get(Wc).resolveComponentFactory(n),this.componentTypes.push(a.componentType);let l=d1(a)?void 0:this._injector.get(Co),c=i||a.selector,u=a.create(r,[],c,l),d=u.location.nativeElement,m=u.injector.get(Wx,null);return m?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),tc(this.components,u),m?.unregisterApplication(d)}),this._loadComponent(u),ke(11,u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ke(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(k_.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new B(101,!1);let n=ae(null);try{this._runningTick=!0,this.synchronize()}catch(i){this.internalErrorHandler(i)}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ae(n),this.afterTick.next(),ke(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Eo,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<f1;)ke(14),this.synchronizeOnce(),ke(15)}synchronizeOnce(){if(this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush()),this.dirtyFlags&7){let n=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i,notifyErrorHandler:r}of this.allViews)h1(i,r,n,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}else this._rendererFactory?.begin?.(),this._rendererFactory?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>Nc(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let i=n;this._views.push(i),i.attachToAppRef(this)}detachView(n){let i=n;tc(this._views,i),i.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView),this.tick(),this.components.push(n),this._injector.get(Rp,[]).forEach(r=>r(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>tc(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new B(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function tc(t,e){let n=t.indexOf(e);n>-1&&t.splice(n,1)}function h1(t,e,n,i){if(!n&&!Nc(t))return;bx(t,e,n&&!i?0:1)}function ee(t,e,n,i){let r=ue(),o=ia();if(yn(r,o,e)){let s=Ct(),a=r_();ID(a,r,t,e,n,i)}return ee}function p1(t,e,n,i){return yn(t,ia(),n)?e+Nn(n)+i:Ot}function m1(t,e,n,i,r,o){let s=J0(),a=Dp(t,s,n,r);return Pc(2),a?e+Nn(n)+i+Nn(r)+o:Ot}function g1(t,e,n,i,r,o,s,a){let l=J0(),c=o1(t,l,n,r,s);return Pc(3),c?e+Nn(n)+i+Nn(r)+o+Nn(s)+a:Ot}function Zl(t,e){return t<<17|e<<2}function dr(t){return t>>17&32767}function v1(t){return(t&2)==2}function y1(t,e){return t&131071|e<<17}function Eh(t){return t|2}function To(t){return(t&131068)>>2}function Rf(t,e){return t&-131069|e<<2}function _1(t){return(t&1)===1}function Ch(t){return t|1}function x1(t,e,n,i,r,o){let s=o?e.classBindings:e.styleBindings,a=dr(s),l=To(s);t[i]=n;let c=!1,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||ea(d,u)>0)&&(c=!0)}else u=n;if(r)if(l!==0){let m=dr(t[a+1]);t[i+1]=Zl(m,a),m!==0&&(t[m+1]=Rf(t[m+1],i)),t[a+1]=y1(t[a+1],i)}else t[i+1]=Zl(a,0),a!==0&&(t[a+1]=Rf(t[a+1],i)),a=i;else t[i+1]=Zl(l,0),a===0?a=i:t[l+1]=Rf(t[l+1],i),l=i;c&&(t[i+1]=Eh(t[i+1])),r0(t,u,i,!0),r0(t,u,i,!1),b1(e,u,t,i,o),s=Zl(a,l),o?e.classBindings=s:e.styleBindings=s}function b1(t,e,n,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof e=="string"&&ea(o,e)>=0&&(n[i+1]=Ch(n[i+1]))}function r0(t,e,n,i){let r=t[n+1],o=e===null,s=i?dr(r):To(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];S1(l,e)&&(a=!0,t[s+1]=i?Ch(c):Eh(c)),s=i?dr(c):To(c)}a&&(t[n+1]=i?Eh(r):Ch(r))}function S1(t,e){return t===null||e==null||(Array.isArray(t)?t[1]:t)===e?!0:Array.isArray(t)&&typeof e=="string"?ea(t,e)>=0:!1}var gn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function w1(t){return t.substring(gn.key,gn.keyEnd)}function M1(t){return E1(t),qx(t,Xx(t,0,gn.textEnd))}function qx(t,e){let n=gn.textEnd;return n===e?-1:(e=gn.keyEnd=C1(t,gn.key=e,n),Xx(t,e,n))}function E1(t){gn.key=0,gn.keyEnd=0,gn.value=0,gn.valueEnd=0,gn.textEnd=t.length}function Xx(t,e,n){for(;e<n&&t.charCodeAt(e)<=32;)e++;return e}function C1(t,e,n){for(;e<n&&t.charCodeAt(e)>32;)e++;return e}function N(t,e,n){let i=ue(),r=ia();if(yn(i,r,e)){let o=Ct(),s=r_();wD(o,s,i,t,e,i[st],n,!1)}return N}function Th(t,e,n,i,r){gp(e,t,n,r?"class":"style",i)}function ko(t,e,n){return Zx(t,e,n,!1),ko}function qe(t,e){return Zx(t,e,null,!0),qe}function Yx(t){I1(L1,T1,t,!0)}function T1(t,e){for(let n=M1(e);n>=0;n=qx(e,n))zh(t,w1(e),!0)}function Zx(t,e,n,i){let r=ue(),o=Ct(),s=Pc(2);if(o.firstUpdatePass&&Jx(o,t,s,i),e!==Ot&&yn(r,s,e)){let a=o.data[Vn()];Qx(o,a,r,r[st],t,r[s+1]=k1(e,n),i,s)}}function I1(t,e,n,i){let r=Ct(),o=Pc(2);r.firstUpdatePass&&Jx(r,null,o,i);let s=ue();if(n!==Ot&&yn(s,o,n)){let a=r.data[Vn()];if(eb(a,i)&&!Kx(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(n=Of(l,n||"")),Th(r,a,s,n,i)}else O1(r,a,s,s[st],s[o+1],s[o+1]=P1(t,e,n),i,o)}}function Kx(t,e){return e>=t.expandoStartIndex}function Jx(t,e,n,i){let r=t.data;if(r[n+1]===null){let o=r[Vn()],s=Kx(t,n);eb(o,i)&&e===null&&!s&&(e=!1),e=D1(r,o,e,i),x1(r,o,e,n,s,i)}}function D1(t,e,n,i){let r=VT(t),o=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(n=Nf(null,t,e,n,i),n=Qs(n,e.attrs,i),o=null);else{let s=e.directiveStylingLast;if(s===-1||t[s]!==r)if(n=Nf(r,t,e,n,i),o===null){let l=A1(t,e,i);l!==void 0&&Array.isArray(l)&&(l=Nf(null,t,e,l[1],i),l=Qs(l,e.attrs,i),R1(t,e,i,l))}else o=N1(t,e,i)}return o!==void 0&&(i?e.residualClasses=o:e.residualStyles=o),n}function A1(t,e,n){let i=n?e.classBindings:e.styleBindings;if(To(i)!==0)return t[dr(i)]}function R1(t,e,n,i){let r=n?e.classBindings:e.styleBindings;t[dr(r)]=i}function N1(t,e,n){let i,r=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=Qs(i,s,n)}return Qs(i,e.attrs,n)}function Nf(t,e,n,i,r){let o=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(o=e[a],i=Qs(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(n.directiveStylingLast=a),i}function Qs(t,e,n){let i=n?1:2,r=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),zh(t,s,n?!0:e[++o]))}return t===void 0?null:t}function P1(t,e,n){if(n==null||n==="")return Pn;let i=[],r=xn(n);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&e(i,r);return i}function L1(t,e,n){let i=String(e);i!==""&&!i.includes(" ")&&zh(t,i,n)}function O1(t,e,n,i,r,o,s,a){r===Ot&&(r=Pn);let l=0,c=0,u=0<r.length?r[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let m=l<r.length?r[l+1]:void 0,f=c<o.length?o[c+1]:void 0,v=null,b;u===d?(l+=2,c+=2,m!==f&&(v=d,b=f)):d===null||u!==null&&u<d?(l+=2,v=u):(c+=2,v=d,b=f),v!==null&&Qx(t,e,n,i,v,b,s,a),u=l<r.length?r[l]:null,d=c<o.length?o[c]:null}}function Qx(t,e,n,i,r,o,s,a){if(!(e.type&3))return;let l=t.data,c=l[a+1],u=_1(c)?o0(l,e,n,r,To(c),s):void 0;if(!wc(u)){wc(o)||v1(c)&&(o=o0(l,null,n,r,a,s));let d=B0(Vn(),n);$D(i,s,d,r,o)}}function o0(t,e,n,i,r,o){let s=e===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,d=u===null,m=n[r+1];m===Ot&&(m=d?Pn:void 0);let f=d?Sf(m,i):u===i?m:void 0;if(c&&!wc(f)&&(f=Sf(l,i)),wc(f)&&(a=f,s))return a;let v=t[r+1];r=s?dr(v):To(v)}if(e!==null){let l=o?e.residualClasses:e.residualStyles;l!=null&&(a=Sf(l,i))}return a}function wc(t){return t!==void 0}function k1(t,e){return t==null||t===""||(typeof e=="string"?t=t+e:typeof t=="object"&&(t=Nt(xn(t)))),t}function eb(t,e){return(t.flags&(e?8:16))!==0}var Ih=class{destroy(e){}updateValue(e,n){}swap(e,n){let i=Math.min(e,n),r=Math.max(e,n),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(e,n){this.attach(n,this.detach(e))}};function Pf(t,e,n,i,r){return t===n&&Object.is(e,i)?1:Object.is(r(t,e),r(n,i))?-1:0}function F1(t,e,n){let i,r,o=0,s=t.length-1,a=void 0;if(Array.isArray(e)){let l=e.length-1;for(;o<=s&&o<=l;){let c=t.at(o),u=e[o],d=Pf(o,c,o,u,n);if(d!==0){d<0&&t.updateValue(o,u),o++;continue}let m=t.at(s),f=e[l],v=Pf(s,m,l,f,n);if(v!==0){v<0&&t.updateValue(s,f),s--,l--;continue}let b=n(o,c),R=n(s,m),P=n(o,u);if(Object.is(P,R)){let H=n(l,f);Object.is(H,b)?(t.swap(o,s),t.updateValue(s,f),l--,s--):t.move(s,o),t.updateValue(o,u),o++;continue}if(i??=new Mc,r??=a0(t,o,s,n),Dh(t,i,o,P))t.updateValue(o,u),o++,s++;else if(r.has(P))i.set(b,t.detach(o)),s--;else{let H=t.create(o,e[o]);t.attach(o,H),o++,s++}}for(;o<=l;)s0(t,i,n,o,e[o]),o++}else if(e!=null){let l=e[Symbol.iterator](),c=l.next();for(;!c.done&&o<=s;){let u=t.at(o),d=c.value,m=Pf(o,u,o,d,n);if(m!==0)m<0&&t.updateValue(o,d),o++,c=l.next();else{i??=new Mc,r??=a0(t,o,s,n);let f=n(o,d);if(Dh(t,i,o,f))t.updateValue(o,d),o++,s++,c=l.next();else if(!r.has(f))t.attach(o,t.create(o,d)),o++,s++,c=l.next();else{let v=n(o,u);i.set(v,t.detach(o)),s--}}}for(;!c.done;)s0(t,i,n,t.length,c.value),c=l.next()}for(;o<=s;)t.destroy(t.detach(s--));i?.forEach(l=>{t.destroy(l)})}function Dh(t,e,n,i){return e!==void 0&&e.has(i)?(t.attach(n,e.get(i)),e.delete(i),!0):!1}function s0(t,e,n,i,r){if(Dh(t,e,i,n(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function a0(t,e,n,i){let r=new Set;for(let o=e;o<=n;o++)r.add(i(o,t.at(o)));return r}var Mc=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let n=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(e,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,n){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,n)}else this.kvMap.set(e,n)}forEach(e){for(let[n,i]of this.kvMap)if(e(i,n),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,n)}}};function ze(t,e){aa("NgControlFlow");let n=ue(),i=ia(),r=n[i]!==Ot?n[i]:-1,o=r!==-1?Ec(n,ht+r):void 0,s=0;if(yn(n,i,t)){let a=ae(null);try{if(o!==void 0&&Tx(o,s),t!==-1){let l=ht+t,c=Ec(n,l),u=Ph(n[ie],l),d=Mo(c,u.tView.ssrId),m=ua(n,u,e,{dehydratedView:d});da(c,m,s,wo(u,d))}}finally{ae(a)}}else if(o!==void 0){let a=Cx(o,s);a!==void 0&&(a[ot]=e)}}var Ah=class{lContainer;$implicit;$index;constructor(e,n,i){this.lContainer=e,this.$implicit=n,this.$index=i}get $count(){return this.lContainer.length-xt}};function Ii(t,e){return e}var Rh=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,n,i){this.hasEmptyBlock=e,this.trackByFn=n,this.liveCollection=i}};function Ze(t,e,n,i,r,o,s,a,l,c,u,d,m){aa("NgControlFlow");let f=ue(),v=Ct(),b=l!==void 0,R=ue(),P=a?s.bind(R[$t][ot]):s,H=new Rh(b,P);R[ht+t]=H,Sc(f,v,t+1,e,n,i,r,bo(v.consts,o)),b&&Sc(f,v,t+2,l,c,u,d,bo(v.consts,m))}var Nh=class extends Ih{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,n,i){super(),this.lContainer=e,this.hostLView=n,this.templateTNode=i}get length(){return this.lContainer.length-xt}at(e){return this.getLView(e)[ot].$implicit}attach(e,n){let i=n[yo];this.needsIndexUpdate||=e!==this.length,da(this.lContainer,n,e,wo(this.templateTNode,i))}detach(e){return this.needsIndexUpdate||=e!==this.length-1,V1(this.lContainer,e)}create(e,n){let i=Mo(this.lContainer,this.templateTNode.tView.ssrId),r=ua(this.hostLView,this.templateTNode,new Ah(this.lContainer,n,e),{dehydratedView:i});return this.operationsCounter?.recordCreate(),r}destroy(e){zc(e[ie],e),this.operationsCounter?.recordDestroy()}updateValue(e,n){this.getLView(e)[ot].$implicit=n}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[ot].$index=e}getLView(e){return U1(this.lContainer,e)}};function Ke(t){let e=ae(null),n=Vn();try{let i=ue(),r=i[ie],o=i[n],s=n+1,a=Ec(i,s);if(o.liveCollection===void 0){let c=Ph(r,s);o.liveCollection=new Nh(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(F1(l,t,o.trackByFn),l.updateIndexes(),o.hasEmptyBlock){let c=ia(),u=l.length===0;if(yn(i,c,u)){let d=n+2,m=Ec(i,d);if(u){let f=Ph(r,d),v=Mo(m,f.tView.ssrId),b=ua(i,f,void 0,{dehydratedView:v});da(m,b,0,wo(f,v))}else Tx(m,0)}}}finally{ae(e)}}function Ec(t,e){return t[e]}function V1(t,e){return Ys(t,e)}function U1(t,e){return Cx(t,e)}function Ph(t,e){return Gh(t,e)}function h(t,e,n,i){let r=ue(),o=Ct(),s=ht+t,a=r[st],l=o.firstCreatePass?Nx(s,o,r,e,dx,$0(),n,i):o.data[s],c=z1(o,r,l,a,e,t);r[s]=c;let u=jh(l);return na(l,!0),ex(a,c,l),!_p(l)&&Qh()&&bp(o,r,c,l),(IT()===0||u)&&oa(c,r),DT(),u&&(mp(o,r,l),z_(o,l,r)),i!==null&&ux(r,l),h}function p(){let t=nn();Y0()?Z0():(t=t.parent,na(t,!1));let e=t;RT(e)&&NT(),AT();let n=Ct();return n.firstCreatePass&&Px(n,e),e.classesWithoutHost!=null&&GT(e)&&Th(n,e,ue(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&$T(e)&&Th(n,e,ue(),e.stylesWithoutHost,!1),p}function be(t,e,n,i){return h(t,e,n,i),p(),be}var z1=(t,e,n,i,r,o)=>(ep(!0),J_(i,r,HT()));function pt(){return ue()}var tr=void 0;function B1(t){let e=Math.floor(Math.abs(t)),n=t.toString().replace(/^[^.]*\.?/,"").length;return e===1&&n===0?1:5}var H1=["en",[["a","p"],["AM","PM"],tr],[["AM","PM"],tr,tr],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],tr,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],tr,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",tr,"{1} 'at' {0}",tr],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",B1],Lf={};function Np(t){let e=W1(t),n=l0(e);if(n)return n;let i=e.split("-")[0];if(n=l0(i),n)return n;if(i==="en")return H1;throw new B(701,!1)}function l0(t){return t in Lf||(Lf[t]=An.ng&&An.ng.common&&An.ng.common.locales&&An.ng.common.locales[t]),Lf[t]}var Fo=function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t}(Fo||{});function W1(t){return t.toLowerCase().replace(/_/g,"-")}var Cc="en-US";var j1=Cc;function G1(t){typeof t=="string"&&(j1=t.toLowerCase().replace(/_/g,"-"))}function c0(t,e,n){return function i(r){if(r===Function)return n;let o=Do(t)?On(t.index,e):e;wp(o,5);let s=e[ot],a=u0(e,s,n,r),l=i.__ngNextListenerFn__;for(;l;)a=u0(e,s,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function u0(t,e,n,i){let r=ae(null);try{return ke(6,e,n),n(i)!==!1}catch(o){return $1(t,o),!1}finally{ke(7,e,n),ae(r)}}function $1(t,e){let n=t[_o],i=n?n.get(Et,null):null;i&&i.handleError(e)}function d0(t,e,n,i,r,o){let s=e[n],a=e[ie],c=a.data[n].outputs[i],u=s[c],d=a.firstCreatePass?Xh(a):null,m=qh(e),f=u.subscribe(o),v=m.length;m.push(o,f),d&&d.push(r,t.index,v,-(v+1))}function C(t,e,n,i){let r=ue(),o=Ct(),s=nn();return X1(o,r,r[st],s,t,e,i),C}function q1(t,e,n,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===n&&r[o+1]===i){let a=e[lc],l=r[o+2];return a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function X1(t,e,n,i,r,o,s){let a=jh(i),c=t.firstCreatePass?Xh(t):null,u=qh(e),d=!0;if(i.type&3||s){let m=Fn(i,e),f=s?s(m):m,v=u.length,b=s?P=>s(Ln(P[i.index])):i.index,R=null;if(!s&&a&&(R=q1(t,e,r,i.index)),R!==null){let P=R.__ngLastListenerFn__||R;P.__ngNextListenerFn__=o,R.__ngLastListenerFn__=o,d=!1}else{o=c0(i,e,o),II(e,f,r,o);let P=n.listen(f,r,o);u.push(o,P),c&&c.push(r,b,v,v+1)}}else o=c0(i,e,o);if(d){let m=i.outputs?.[r],f=i.hostDirectiveOutputs?.[r];if(f&&f.length)for(let v=0;v<f.length;v+=2){let b=f[v],R=f[v+1];d0(i,e,b,R,r,o)}if(m&&m.length)for(let v of m)d0(i,e,v,r,r,o)}}function E(t=1){return zT(t)}function Y1(t,e){let n=null,i=cD(t);for(let r=0;r<e.length;r++){let o=e[r];if(o==="*"){n=r;continue}if(i===null?ox(t,o,!0):fD(i,o))return r}return n}function tb(t){let e=ue()[$t][Lt];if(!e.projection){let n=t?t.length:1,i=e.projection=nT(n,null),r=i.slice(),o=e.child;for(;o!==null;){if(o.type!==128){let s=t?Y1(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function nb(t,e=0,n,i,r,o){let s=ue(),a=Ct(),l=i?t+1:null;l!==null&&Sc(s,a,l,i,r,o,null,n);let c=Hc(a,ht+t,16,null,n||null);c.projection===null&&(c.projection=e),Z0();let d=!s[yo]||q0();s[$t][Lt].projection[c.projection]===null&&l!==null?Z1(s,a,l):d&&!_p(c)&&jD(a,s,c)}function Z1(t,e,n){let i=ht+n,r=e.data[i],o=t[i],s=Mo(o,r.tView.ssrId),a=ua(t,r,void 0,{dehydratedView:s});da(o,a,0,wo(r,s))}function pa(t,e,n){Fx(t,e,n)}function Vo(t){let e=ue(),n=Ct(),i=Zh();Lc(i+1);let r=Tp(n,i);if(t.dirty&&wT(e)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=Vx(e,i);t.reset(o,C_),t.notifyOnChanges()}return!0}return!1}function Uo(){return Cp(ue(),Zh())}function zo(t,e,n,i){ZA(t,Fx(e,n,i))}function $c(t=1){Lc(Zh()+t)}function x(t,e=""){let n=ue(),i=Ct(),r=t+ht,o=i.firstCreatePass?Hc(i,r,1,e,null):i.data[r],s=K1(i,n,o,e,t);n[r]=s,Qh()&&bp(i,n,s,o),na(o,!1)}var K1=(t,e,n,i,r)=>(ep(!0),XI(e[st],i));function we(t){return pe("",t,""),we}function pe(t,e,n){let i=ue(),r=p1(i,t,e,n);return r!==Ot&&Pp(i,Vn(),r),pe}function Bo(t,e,n,i,r){let o=ue(),s=m1(o,t,e,n,i,r);return s!==Ot&&Pp(o,Vn(),s),Bo}function ma(t,e,n,i,r,o,s){let a=ue(),l=g1(a,t,e,n,i,r,o,s);return l!==Ot&&Pp(a,Vn(),l),ma}function Pp(t,e,n){let i=B0(e,t);YI(t[st],i,n)}function ib(t,e,n,i){return ob(ue(),Yh(),t,e,n,i)}function rb(t,e){let n=t[e];return n===Ot?void 0:n}function ob(t,e,n,i,r,o){let s=e+n;return yn(t,s,r)?Hx(t,s+1,o?i.call(o,r):i(r)):rb(t,s+1)}function J1(t,e,n,i,r,o,s){let a=e+n;return Dp(t,a,r,o)?Hx(t,a+2,s?i.call(s,r,o):i(r,o)):rb(t,a+2)}function je(t,e){let n=Ct(),i,r=t+ht;n.firstCreatePass?(i=Q1(e,n.pipeRegistry),n.data[r]=i,i.onDestroy&&(n.destroyHooks??=[]).push(r,i.onDestroy)):i=n.data[r];let o=i.factory||(i.factory=rr(i.type,!0)),s,a=Rt(Un);try{let l=pc(!1),c=o();return pc(l),ST(n,ue(),r,c),c}finally{Rt(a)}}function Q1(t,e){if(e)for(let n=e.length-1;n>=0;n--){let i=e[n];if(t===i.name)return i}}function sb(t,e,n){let i=t+ht,r=ue(),o=H0(r,i);return ab(r,i)?ob(r,Yh(),e,o.transform,n,o):o.transform(n)}function Je(t,e,n,i){let r=t+ht,o=ue(),s=H0(o,r);return ab(o,r)?J1(o,Yh(),e,s.transform,n,i,s):s.transform(n,i)}function ab(t,e){return t[ie].data[e].pure}var Lh=class{ngModuleFactory;componentFactories;constructor(e,n){this.ngModuleFactory=e,this.componentFactories=n}},lb=(()=>{class t{compileModuleSync(n){return new wh(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let i=this.compileModuleSync(n),r=I0(n),o=ix(r.declarations).reduce((s,a)=>{let l=vo(a);return l&&s.push(new Js(l)),s},[]);return new Lh(i,o)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var eR=(()=>{class t{zone=w(Le);changeDetectionScheduler=w(So);applicationRef=w(Ti);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),tR=new A("",{factory:()=>!1});function cb({ngZoneFactory:t,ignoreChangesOutsideZone:e,scheduleInRootZone:n}){return t??=()=>new Le(M(y({},db()),{scheduleInRootZone:n})),[{provide:Le,useFactory:t},{provide:or,multi:!0,useFactory:()=>{let i=w(eR,{optional:!0});return()=>i.initialize()}},{provide:or,multi:!0,useFactory:()=>{let i=w(nR);return()=>{i.initialize()}}},e===!0?{provide:S_,useValue:!0}:[],{provide:w_,useValue:n??b_}]}function ub(t){let e=t?.ignoreChangesOutsideZone,n=t?.scheduleInRootZone,i=cb({ngZoneFactory:()=>{let r=db(t);return r.scheduleInRootZone=n,r.shouldCoalesceEventChangeDetection&&aa("NgZone_CoalesceEvent"),new Le(r)},ignoreChangesOutsideZone:e,scheduleInRootZone:n});return Pt([{provide:tR,useValue:!0},{provide:Oc,useValue:!1},i])}function db(t){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:t?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:t?.runCoalescing??!1}}var nR=(()=>{class t{subscription=new $e;initialized=!1;zone=w(Le);pendingTasks=w(No);initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Le.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Le.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var iR=(()=>{class t{appRef=w(Ti);taskService=w(No);ngZone=w(Le);zonelessEnabled=w(Oc);tracing=w(kc,{optional:!0});disableScheduling=w(S_,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new $e;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(vc):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(w(w_,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Kf||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;let i=!1;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,i=!0;break}case 12:{this.appRef.dirtyFlags|=16,i=!0;break}case 13:{this.appRef.dirtyFlags|=2,i=!0;break}case 11:{i=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(i))return;let r=this.useMicrotaskScheduler?ky:M_;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(n){return!(this.disableScheduling&&!n||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(vc+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){throw this.taskService.remove(n),i}finally{this.cleanup()}this.useMicrotaskScheduler=!0,ky(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function rR(){return typeof $localize<"u"&&$localize.locale||Cc}var qc=new A("",{providedIn:"root",factory:()=>w(qc,oe.Optional|oe.SkipSelf)||rR()});var Oh=new A(""),oR=new A("");function Bs(t){return!t.moduleRef}function sR(t){let e=Bs(t)?t.r3Injector:t.moduleRef.injector,n=e.get(Le);return n.run(()=>{Bs(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=e.get(Et,null),r;if(n.runOutsideAngular(()=>{r=n.onError.subscribe({next:o=>{i.handleError(o)}})}),Bs(t)){let o=()=>e.destroy(),s=t.platformInjector.get(Oh);s.add(o),e.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(Oh);s.add(o),t.moduleRef.onDestroy(()=>{tc(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return lR(i,n,()=>{let o=e.get($x);return o.runInitializers(),o.donePromise.then(()=>{let s=e.get(qc,Cc);if(G1(s||Cc),!e.get(oR,!0))return Bs(t)?e.get(Ti):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Bs(t)){let l=e.get(Ti);return t.rootComponent!==void 0&&l.bootstrap(t.rootComponent),l}else return aR(t.moduleRef,t.allPlatformModules),t.moduleRef})})})}function aR(t,e){let n=t.injector.get(Ti);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(i=>n.bootstrap(i));else if(t.instance.ngDoBootstrap)t.instance.ngDoBootstrap(n);else throw new B(-403,!1);e.push(t)}function lR(t,e,n){try{let i=n();return ha(i)?i.catch(r=>{throw e.runOutsideAngular(()=>t.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>t.handleError(i)),i}}var nc=null;function cR(t=[],e){return Mt.create({name:e,providers:[{provide:Ac,useValue:"platform"},{provide:Oh,useValue:new Set([()=>nc=null])},...t]})}function uR(t=[]){if(nc)return nc;let e=cR(t);return nc=e,u1(),dR(e),e}function dR(t){let e=t.get(ap,null);_n(t,()=>{e?.forEach(n=>n())})}function vr(){return!1}var Ho=(()=>{class t{static __NG_ELEMENT_ID__=fR}return t})();function fR(t){return hR(nn(),ue(),(t&16)===16)}function hR(t,e,n){if(Do(t)&&!n){let i=On(t.index,e);return new Zs(i,i)}else if(t.type&175){let i=e[$t];return new Zs(i,e)}return null}function fb(t){let{rootComponent:e,appProviders:n,platformProviders:i,platformRef:r}=t;ke(8);try{let o=r?.injector??uR(i),s=[cb({}),{provide:So,useExisting:iR},...n||[]],a=new bc({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return sR({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{ke(9)}}function Xc(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function Yc(t){return Jd(t)}function mt(t,e){return _l(t,e?.equal)}var kh=class{[jt];constructor(e){this[jt]=e}destroy(){this[jt].destroy()}};function zn(t,e){!e?.injector&&Wh(zn);let n=e?.injector??w(Mt),i=e?.manualCleanup!==!0?n.get(rn):null,r,o=n.get(F_,null,{optional:!0}),s=n.get(So);return o!==null&&!e?.forceRoot?(r=gR(o.view,s,t),i instanceof gc&&i._lView===o.view&&(i=null)):r=vR(t,n.get(jx),s),r.injector=n,i!==null&&(r.onDestroyFn=i.onDestroy(()=>r.destroy())),new kh(r)}var hb=M(y({},Kr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,cleanupFns:void 0,zone:null,kind:"effect",onDestroyFn:Xs,run(){if(this.dirty=!1,this.hasRun&&!gl(this))return;this.hasRun=!0;let t=i=>(this.cleanupFns??=[]).push(i),e=As(this),n=dc(!1);try{this.maybeCleanup(),this.fn(t)}finally{dc(n),ml(this,e)}},maybeCleanup(){if(this.cleanupFns?.length)try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[]}}}),pR=M(y({},hb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){Rs(this),this.onDestroyFn(),this.maybeCleanup(),this.scheduler.remove(this)}}),mR=M(y({},hb),{consumerMarkedDirty(){this.view[Q]|=8192,ta(this.view),this.notifier.notify(13)},destroy(){Rs(this),this.onDestroyFn(),this.maybeCleanup(),this.view[ar]?.delete(this)}});function gR(t,e,n){let i=Object.create(mR);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=n,t[ar]??=new Set,t[ar].add(i),i.consumerMarkedDirty(i),i}function vR(t,e,n){let i=Object.create(pR);return i.fn=t,i.scheduler=e,i.notifier=n,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.schedule(i),i.notifier.notify(12),i}var Ge=new A("");var gb=null;function li(){return gb}function Lp(t){gb??=t}var ga=class{},Op=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(vb),providedIn:"platform"})}return t})();var vb=(()=>{class t extends Op{_location;_history;_doc=w(Ge);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return li().getBaseHref(this._doc)}onPopState(n){let i=li().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",n,!1),()=>i.removeEventListener("popstate",n)}onHashChange(n){let i=li().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",n,!1),()=>i.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,i,r){this._history.pushState(n,i,r)}replaceState(n,i,r){this._history.replaceState(n,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function yb(t,e){return t?e?t.endsWith("/")?e.startsWith("/")?t+e.slice(1):t+e:e.startsWith("/")?t+e:`${t}/${e}`:t:e}function pb(t){let e=t.search(/#|\?|$/);return t[e-1]==="/"?t.slice(0,e-1)+t.slice(e):t}function Di(t){return t&&t[0]!=="?"?`?${t}`:t}var Wo=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(xb),providedIn:"root"})}return t})(),_b=new A(""),xb=(()=>{class t extends Wo{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,i){super(),this._platformLocation=n,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??w(Ge).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return yb(this._baseHref,n)}path(n=!1){let i=this._platformLocation.pathname+Di(this._platformLocation.search),r=this._platformLocation.hash;return r&&n?`${i}${r}`:i}pushState(n,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.pushState(n,i,s)}replaceState(n,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.replaceState(n,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(i){return new(i||t)(L(Op),L(_b,8))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),jo=(()=>{class t{_subject=new Ae;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let i=this._locationStrategy.getBaseHref();this._basePath=xR(pb(mb(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,i=""){return this.path()==this.normalize(n+Di(i))}normalize(n){return t.stripTrailingSlash(_R(this._basePath,mb(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,i="",r=null){this._locationStrategy.pushState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Di(i)),r)}replaceState(n,i="",r=null){this._locationStrategy.replaceState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Di(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",i){this._urlChangeListeners.forEach(r=>r(n,i))}subscribe(n,i,r){return this._subject.subscribe({next:n,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Di;static joinWithSlash=yb;static stripTrailingSlash=pb;static \u0275fac=function(i){return new(i||t)(L(Wo))};static \u0275prov=k({token:t,factory:()=>yR(),providedIn:"root"})}return t})();function yR(){return new jo(L(Wo))}function _R(t,e){if(!t||!e.startsWith(t))return e;let n=e.substring(t.length);return n===""||["/",";","?","#"].includes(n[0])?n:e}function mb(t){return t.replace(/\/index.html$/,"")}function xR(t){if(new RegExp("^(https?:)?//").test(t)){let[,n]=t.split(/\/\/[^\/]+/);return n}return t}var Vp=function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t}(Vp||{});var Bn={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Go(t,e){let n=Np(t),i=n[Fo.NumberSymbols][e];if(typeof i>"u"){if(e===Bn.CurrencyDecimal)return n[Fo.NumberSymbols][Bn.Decimal];if(e===Bn.CurrencyGroup)return n[Fo.NumberSymbols][Bn.Group]}return i}function Sb(t,e){return Np(t)[Fo.NumberFormats][e]}var bR=/^(\d+)?\.((\d+)(-(\d+))?)?$/,bb=22,Zc=".",va="0",SR=";",wR=",",kp="#";function MR(t,e,n,i,r,o,s=!1){let a="",l=!1;if(!isFinite(t))a=Go(n,Bn.Infinity);else{let c=TR(t);s&&(c=CR(c));let u=e.minInt,d=e.minFrac,m=e.maxFrac;if(o){let H=o.match(bR);if(H===null)throw new Error(`${o} is not a valid digit info`);let fe=H[1],z=H[3],F=H[5];fe!=null&&(u=Fp(fe)),z!=null&&(d=Fp(z)),F!=null?m=Fp(F):z!=null&&d>m&&(m=d)}IR(c,d,m);let f=c.digits,v=c.integerLen,b=c.exponent,R=[];for(l=f.every(H=>!H);v<u;v++)f.unshift(0);for(;v<0;v++)f.unshift(0);v>0?R=f.splice(v,f.length):(R=f,f=[0]);let P=[];for(f.length>=e.lgSize&&P.unshift(f.splice(-e.lgSize,f.length).join(""));f.length>e.gSize;)P.unshift(f.splice(-e.gSize,f.length).join(""));f.length&&P.unshift(f.join("")),a=P.join(Go(n,i)),R.length&&(a+=Go(n,r)+R.join("")),b&&(a+=Go(n,Bn.Exponential)+"+"+b)}return t<0&&!l?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function wb(t,e,n){let i=Sb(e,Vp.Decimal),r=ER(i,Go(e,Bn.MinusSign));return MR(t,r,e,Bn.Group,Bn.Decimal,n)}function ER(t,e="-"){let n={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=t.split(SR),r=i[0],o=i[1],s=r.indexOf(Zc)!==-1?r.split(Zc):[r.substring(0,r.lastIndexOf(va)+1),r.substring(r.lastIndexOf(va)+1)],a=s[0],l=s[1]||"";n.posPre=a.substring(0,a.indexOf(kp));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===va?n.minFrac=n.maxFrac=u+1:d===kp?n.maxFrac=u+1:n.posSuf+=d}let c=a.split(wR);if(n.gSize=c[1]?c[1].length:0,n.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let u=r.length-n.posPre.length-n.posSuf.length,d=o.indexOf(kp);n.negPre=o.substring(0,d).replace(/'/g,""),n.negSuf=o.slice(d+u).replace(/'/g,"")}else n.negPre=e+n.posPre,n.negSuf=n.posSuf;return n}function CR(t){if(t.digits[0]===0)return t;let e=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(e===0?t.digits.push(0,0):e===1&&t.digits.push(0),t.integerLen+=2),t}function TR(t){let e=Math.abs(t)+"",n=0,i,r,o,s,a;for((r=e.indexOf(Zc))>-1&&(e=e.replace(Zc,"")),(o=e.search(/e/i))>0?(r<0&&(r=o),r+=+e.slice(o+1),e=e.substring(0,o)):r<0&&(r=e.length),o=0;e.charAt(o)===va;o++);if(o===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===va;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(e.charAt(o))}return r>bb&&(i=i.splice(0,bb-1),n=r-1,r=1),{digits:i,exponent:n,integerLen:r}}function IR(t,e,n){if(e>n)throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`);let i=t.digits,r=i.length-t.integerLen,o=Math.min(Math.max(e,r),n),s=o+t.integerLen,a=i[s];if(s>0){i.splice(Math.max(t.integerLen,s));for(let d=s;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),t.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let d=1;d<s;d++)i[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)i.unshift(0),t.integerLen++;i.unshift(1),t.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=e+t.integerLen,u=i.reduceRight(function(d,m,f,v){return m=m+d,v[f]=m<10?m:m-10,l&&(v[f]===0&&f>=c?v.pop():l=!1),m>=10?1:0},0);u&&(i.unshift(u),t.integerLen++)}function Fp(t){let e=parseInt(t);if(isNaN(e))throw new Error("Invalid integer literal when parsing "+t);return e}function DR(t,e){return new B(2100,!1)}var Up=(()=>{class t{_locale;constructor(n){this._locale=n}transform(n,i,r){if(!AR(n))return null;r||=this._locale;try{let o=RR(n);return wb(o,r,i)}catch(o){throw DR(t,o.message)}}static \u0275fac=function(i){return new(i||t)(Un(qc,16))};static \u0275pipe=Gc({name:"number",type:t,pure:!0})}return t})();function AR(t){return!(t==null||t===""||t!==t)}function RR(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new Error(`${t} is not a number`);return t}function zp(t,e){e=encodeURIComponent(e);for(let n of t.split(";")){let i=n.indexOf("="),[r,o]=i==-1?[n,""]:[n.slice(0,i),n.slice(i+1)];if(r.trim()===e)return decodeURIComponent(o)}return null}var Bp="browser",Mb="server";function Kc(t){return t===Mb}var ya=class{};var eu=new A(""),Gp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,i){this._zone=i,n.forEach(r=>{r.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,i,r,o){return this._findPluginFor(i).addEventListener(n,i,r,o)}getZone(){return this._zone}_findPluginFor(n){let i=this._eventNameToPlugin.get(n);if(i)return i;if(i=this._plugins.find(o=>o.supports(n)),!i)throw new B(5101,!1);return this._eventNameToPlugin.set(n,i),i}static \u0275fac=function(i){return new(i||t)(L(eu),L(Le))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),_a=class{_doc;constructor(e){this._doc=e}manager},Jc="ng-app-id";function Eb(t){for(let e of t)e.remove()}function Cb(t,e){let n=e.createElement("style");return n.textContent=t,n}function OR(t,e,n,i){let r=t.head?.querySelectorAll(`style[${Jc}="${e}"],link[${Jc}="${e}"]`);if(r)for(let o of r)o.removeAttribute(Jc),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&n.set(o.textContent,{usage:0,elements:[o]})}function Wp(t,e){let n=e.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",t),n}var $p=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(n,i,r,o={}){this.doc=n,this.appId=i,this.nonce=r,this.isServer=Kc(o),OR(n,i,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,i){for(let r of n)this.addUsage(r,this.inline,Cb);i?.forEach(r=>this.addUsage(r,this.external,Wp))}removeStyles(n,i){for(let r of n)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(n,i,r){let o=i.get(n);o?o.usage++:i.set(n,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(n,this.doc)))})}removeUsage(n,i){let r=i.get(n);r&&(r.usage--,r.usage<=0&&(Eb(r.elements),i.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])Eb(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(n,Cb(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(n,Wp(i,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,i){return this.nonce&&i.setAttribute("nonce",this.nonce),this.isServer&&i.setAttribute(Jc,this.appId),n.appendChild(i)}static \u0275fac=function(i){return new(i||t)(L(Ge),L(sp),L(lp,8),L(sa))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),Hp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},qp=/%COMP%/g;var Ib="%COMP%",kR=`_nghost-${Ib}`,FR=`_ngcontent-${Ib}`,VR=!0,UR=new A("",{providedIn:"root",factory:()=>VR});function zR(t){return FR.replace(qp,t)}function BR(t){return kR.replace(qp,t)}function Db(t,e){return e.map(n=>n.replace(qp,t))}var Xp=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(n,i,r,o,s,a,l,c=null,u=null){this.eventManager=n,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.platformId=a,this.ngZone=l,this.nonce=c,this.tracingService=u,this.platformIsServer=Kc(a),this.defaultRenderer=new xa(n,s,l,this.platformIsServer,this.tracingService)}createRenderer(n,i){if(!n||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===kn.ShadowDom&&(i=M(y({},i),{encapsulation:kn.Emulated}));let r=this.getOrCreateRenderer(n,i);return r instanceof Qc?r.applyToHost(n):r instanceof ba&&r.applyStyles(),r}getOrCreateRenderer(n,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,m=this.tracingService;switch(i.encapsulation){case kn.Emulated:o=new Qc(l,c,i,this.appId,u,s,a,d,m);break;case kn.ShadowDom:return new jp(l,c,n,i,s,a,this.nonce,d,m);default:o=new ba(l,c,i,u,s,a,d,m);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(i){return new(i||t)(L(Gp),L($p),L(sp),L(UR),L(Ge),L(sa),L(Le),L(lp),L(kc,8))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),xa=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,n,i,r,o){this.eventManager=e,this.doc=n,this.ngZone=i,this.platformIsServer=r,this.tracingService=o}destroy(){}destroyNode=null;createElement(e,n){return n?this.doc.createElementNS(Hp[n]||n,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,n){(Tb(e)?e.content:e).appendChild(n)}insertBefore(e,n,i){e&&(Tb(e)?e.content:e).insertBefore(n,i)}removeChild(e,n){n.remove()}selectRootElement(e,n){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new B(-5104,!1);return n||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,n,i,r){if(r){n=r+":"+n;let o=Hp[r];o?e.setAttributeNS(o,n,i):e.setAttribute(n,i)}else e.setAttribute(n,i)}removeAttribute(e,n,i){if(i){let r=Hp[i];r?e.removeAttributeNS(r,n):e.removeAttribute(`${i}:${n}`)}else e.removeAttribute(n)}addClass(e,n){e.classList.add(n)}removeClass(e,n){e.classList.remove(n)}setStyle(e,n,i,r){r&(ii.DashCase|ii.Important)?e.style.setProperty(n,i,r&ii.Important?"important":""):e.style[n]=i}removeStyle(e,n,i){i&ii.DashCase?e.style.removeProperty(n):e.style[n]=""}setProperty(e,n,i){e!=null&&(e[n]=i)}setValue(e,n){e.nodeValue=n}listen(e,n,i,r){if(typeof e=="string"&&(e=li().getGlobalEventTarget(this.doc,e),!e))throw new B(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,n,o)),this.eventManager.addEventListener(e,n,o,r)}decoratePreventDefault(e){return n=>{if(n==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(n)):e(n))===!1&&n.preventDefault()}}};function Tb(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var jp=class extends xa{sharedStylesHost;hostEl;shadowRoot;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,l,c),this.sharedStylesHost=n,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=Db(r.id,u);for(let m of u){let f=document.createElement("style");a&&f.setAttribute("nonce",a),f.textContent=m,this.shadowRoot.appendChild(f)}let d=r.getExternalStyles?.();if(d)for(let m of d){let f=Wp(m,o);a&&f.setAttribute("nonce",a),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,n){return super.appendChild(this.nodeOrShadowRoot(e),n)}insertBefore(e,n,i){return super.insertBefore(this.nodeOrShadowRoot(e),n,i)}removeChild(e,n){return super.removeChild(null,n)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},ba=class extends xa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,a,l),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=c?Db(c,u):u,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Qc=class extends ba{contentAttr;hostAttr;constructor(e,n,i,r,o,s,a,l,c){let u=r+"-"+i.id;super(e,n,i,o,s,a,l,c,u),this.contentAttr=zR(u),this.hostAttr=BR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,n){let i=super.createElement(e,n);return super.setAttribute(i,this.contentAttr,""),i}};var tu=class t extends ga{supportsDOMEvents=!0;static makeCurrent(){Lp(new t)}onAndCancel(e,n,i,r){return e.addEventListener(n,i,r),()=>{e.removeEventListener(n,i,r)}}dispatchEvent(e,n){e.dispatchEvent(n)}remove(e){e.remove()}createElement(e,n){return n=n||this.getDefaultDocument(),n.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,n){return n==="window"?window:n==="document"?e:n==="body"?e.body:null}getBaseHref(e){let n=HR();return n==null?null:WR(n)}resetBaseElement(){Sa=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return zp(document.cookie,e)}},Sa=null;function HR(){return Sa=Sa||document.head.querySelector("base"),Sa?Sa.getAttribute("href"):null}function WR(t){return new URL(t,document.baseURI).pathname}var jR=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),Rb=(()=>{class t extends _a{constructor(n){super(n)}supports(n){return!0}addEventListener(n,i,r,o){return n.addEventListener(i,r,o),()=>this.removeEventListener(n,i,r,o)}removeEventListener(n,i,r,o){return n.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(L(Ge))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),Ab=["alt","control","meta","shift"],GR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},$R={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},Nb=(()=>{class t extends _a{constructor(n){super(n)}supports(n){return t.parseEventName(n)!=null}addEventListener(n,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>li().onAndCancel(n,s.domEventName,a,o))}static parseEventName(n){let i=n.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),Ab.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(n,i){let r=GR[n.key]||n.key,o="";return i.indexOf("code.")>-1&&(r=n.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Ab.forEach(s=>{if(s!==r){let a=$R[s];a(n)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(n,i,r){return o=>{t.matchEventFullKeyCode(o,n)&&r.runGuarded(()=>i(o))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(i){return new(i||t)(L(Ge))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();function Yp(t,e,n){return fb(y({rootComponent:t,platformRef:n?.platformRef},qR(e)))}function qR(t){return{appProviders:[...JR,...t?.providers??[]],platformProviders:KR}}function XR(){tu.makeCurrent()}function YR(){return new Et}function ZR(){return P_(document),document}var KR=[{provide:sa,useValue:Bp},{provide:ap,useValue:XR,multi:!0},{provide:Ge,useFactory:ZR}];var JR=[{provide:Ac,useValue:"root"},{provide:Et,useFactory:YR},{provide:eu,useClass:Rb,multi:!0,deps:[Ge]},{provide:eu,useClass:Nb,multi:!0,deps:[Ge]},Xp,$p,Gp,{provide:Eo,useExisting:Xp},{provide:ya,useClass:jR},[]];var Pb=(()=>{class t{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(i){return new(i||t)(L(Ge))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Zp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=L(QR),r},providedIn:"root"})}return t})(),QR=(()=>{class t extends Zp{_doc;constructor(n){super(),this._doc=n}sanitize(n,i){if(i==null)return null;switch(n){case bn.NONE:return i;case bn.HTML:return si(i,"HTML")?xn(i):cp(this._doc,String(i)).toString();case bn.STYLE:return si(i,"Style")?xn(i):i;case bn.SCRIPT:if(si(i,"Script"))return xn(i);throw new B(5200,!1);case bn.URL:return si(i,"URL")?xn(i):Vc(String(i));case bn.RESOURCE_URL:if(si(i,"ResourceURL"))return xn(i);throw new B(5201,!1);default:throw new B(5202,!1)}}bypassSecurityTrustHtml(n){return H_(n)}bypassSecurityTrustStyle(n){return W_(n)}bypassSecurityTrustScript(n){return j_(n)}bypassSecurityTrustUrl(n){return G_(n)}bypassSecurityTrustResourceUrl(n){return $_(n)}static \u0275fac=function(i){return new(i||t)(L(Ge))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var re="primary",Oa=Symbol("RouteTitle"),tm=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n[0]:n}return null}getAll(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function Sr(t){return new tm(t)}function Bb(t,e,n){let i=n.path.split("/");if(i.length>t.length||n.pathMatch==="full"&&(e.hasChildren()||i.length<t.length))return null;let r={};for(let o=0;o<i.length;o++){let s=i[o],a=t[o];if(s[0]===":")r[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:t.slice(0,i.length),posParams:r}}function tN(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(!Hn(t[n],e[n]))return!1;return!0}function Hn(t,e){let n=t?nm(t):void 0,i=e?nm(e):void 0;if(!n||!i||n.length!=i.length)return!1;let r;for(let o=0;o<n.length;o++)if(r=n[o],!Hb(t[r],e[r]))return!1;return!0}function nm(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function Hb(t,e){if(Array.isArray(t)&&Array.isArray(e)){if(t.length!==e.length)return!1;let n=[...t].sort(),i=[...e].sort();return n.every((r,o)=>i[o]===r)}else return t===e}function Wb(t){return t.length>0?t[t.length-1]:null}function Pi(t){return df(t)?t:ha(t)?Fe(Promise.resolve(t)):q(t)}var nN={exact:Gb,subset:$b},jb={exact:iN,subset:rN,ignored:()=>!0};function Lb(t,e,n){return nN[n.paths](t.root,e.root,n.matrixParams)&&jb[n.queryParams](t.queryParams,e.queryParams)&&!(n.fragment==="exact"&&t.fragment!==e.fragment)}function iN(t,e){return Hn(t,e)}function Gb(t,e,n){if(!xr(t.segments,e.segments)||!ru(t.segments,e.segments,n)||t.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!t.children[i]||!Gb(t.children[i],e.children[i],n))return!1;return!0}function rN(t,e){return Object.keys(e).length<=Object.keys(t).length&&Object.keys(e).every(n=>Hb(t[n],e[n]))}function $b(t,e,n){return qb(t,e,e.segments,n)}function qb(t,e,n,i){if(t.segments.length>n.length){let r=t.segments.slice(0,n.length);return!(!xr(r,n)||e.hasChildren()||!ru(r,n,i))}else if(t.segments.length===n.length){if(!xr(t.segments,n)||!ru(t.segments,n,i))return!1;for(let r in e.children)if(!t.children[r]||!$b(t.children[r],e.children[r],i))return!1;return!0}else{let r=n.slice(0,t.segments.length),o=n.slice(t.segments.length);return!xr(t.segments,r)||!ru(t.segments,r,i)||!t.children[re]?!1:qb(t.children[re],e,o,i)}}function ru(t,e,n){return e.every((i,r)=>jb[n](t[r].parameters,i.parameters))}var Wn=class{root;queryParams;fragment;_queryParamMap;constructor(e=new Te([],{}),n={},i=null){this.root=e,this.queryParams=n,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Sr(this.queryParams),this._queryParamMap}toString(){return aN.serialize(this)}},Te=class{segments;children;parent=null;constructor(e,n){this.segments=e,this.children=n,Object.values(n).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ou(this)}},Ai=class{path;parameters;_parameterMap;constructor(e,n){this.path=e,this.parameters=n}get parameterMap(){return this._parameterMap??=Sr(this.parameters),this._parameterMap}toString(){return Yb(this)}};function oN(t,e){return xr(t,e)&&t.every((n,i)=>Hn(n.parameters,e[i].parameters))}function xr(t,e){return t.length!==e.length?!1:t.every((n,i)=>n.path===e[i].path)}function sN(t,e){let n=[];return Object.entries(t.children).forEach(([i,r])=>{i===re&&(n=n.concat(e(r,i)))}),Object.entries(t.children).forEach(([i,r])=>{i!==re&&(n=n.concat(e(r,i)))}),n}var ka=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>new wr,providedIn:"root"})}return t})(),wr=class{parse(e){let n=new rm(e);return new Wn(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(e){let n=`/${wa(e.root,!0)}`,i=uN(e.queryParams),r=typeof e.fragment=="string"?`#${lN(e.fragment)}`:"";return`${n}${i}${r}`}},aN=new wr;function ou(t){return t.segments.map(e=>Yb(e)).join("/")}function wa(t,e){if(!t.hasChildren())return ou(t);if(e){let n=t.children[re]?wa(t.children[re],!1):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==re&&i.push(`${r}:${wa(o,!1)}`)}),i.length>0?`${n}(${i.join("//")})`:n}else{let n=sN(t,(i,r)=>r===re?[wa(t.children[re],!1)]:[`${r}:${wa(i,!1)}`]);return Object.keys(t.children).length===1&&t.children[re]!=null?`${ou(t)}/${n[0]}`:`${ou(t)}/(${n.join("//")})`}}function Xb(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function nu(t){return Xb(t).replace(/%3B/gi,";")}function lN(t){return encodeURI(t)}function im(t){return Xb(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function su(t){return decodeURIComponent(t)}function Ob(t){return su(t.replace(/\+/g,"%20"))}function Yb(t){return`${im(t.path)}${cN(t.parameters)}`}function cN(t){return Object.entries(t).map(([e,n])=>`;${im(e)}=${im(n)}`).join("")}function uN(t){let e=Object.entries(t).map(([n,i])=>Array.isArray(i)?i.map(r=>`${nu(n)}=${nu(r)}`).join("&"):`${nu(n)}=${nu(i)}`).filter(n=>n);return e.length?`?${e.join("&")}`:""}var dN=/^[^\/()?;#]+/;function Kp(t){let e=t.match(dN);return e?e[0]:""}var fN=/^[^\/()?;=#]+/;function hN(t){let e=t.match(fN);return e?e[0]:""}var pN=/^[^=?&#]+/;function mN(t){let e=t.match(pN);return e?e[0]:""}var gN=/^[^&#]+/;function vN(t){let e=t.match(gN);return e?e[0]:""}var rm=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Te([],{}):new Te([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1)),(e.length>0||Object.keys(n).length>0)&&(i[re]=new Te(e,n)),i}parseSegment(){let e=Kp(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new B(4009,!1);return this.capture(e),new Ai(su(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let n=hN(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let r=Kp(this.remaining);r&&(i=r,this.capture(i))}e[su(n)]=su(i)}parseQueryParam(e){let n=mN(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let s=vN(this.remaining);s&&(i=s,this.capture(i))}let r=Ob(n),o=Ob(i);if(e.hasOwnProperty(r)){let s=e[r];Array.isArray(s)||(s=[s],e[r]=s),s.push(o)}else e[r]=o}parseParens(e){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Kp(this.remaining),r=this.remaining[i.length];if(r!=="/"&&r!==")"&&r!==";")throw new B(4010,!1);let o;i.indexOf(":")>-1?(o=i.slice(0,i.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=re);let s=this.parseChildren();n[o]=Object.keys(s).length===1?s[re]:new Te([],s),this.consumeOptional("//")}return n}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new B(4011,!1)}};function Zb(t){return t.segments.length>0?new Te([],{[re]:t}):t}function Kb(t){let e={};for(let[i,r]of Object.entries(t.children)){let o=Kb(r);if(i===re&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))e[s]=a;else(o.segments.length>0||o.hasChildren())&&(e[i]=o)}let n=new Te(t.segments,e);return yN(n)}function yN(t){if(t.numberOfChildren===1&&t.children[re]){let e=t.children[re];return new Te(t.segments.concat(e.segments),e.children)}return t}function Ri(t){return t instanceof Wn}function Jb(t,e,n=null,i=null){let r=Qb(t);return eS(r,e,n,i)}function Qb(t){let e;function n(o){let s={};for(let l of o.children){let c=n(l);s[l.outlet]=c}let a=new Te(o.url,s);return o===t&&(e=a),a}let i=n(t.root),r=Zb(i);return e??r}function eS(t,e,n,i){let r=t;for(;r.parent;)r=r.parent;if(e.length===0)return Jp(r,r,r,n,i);let o=_N(e);if(o.toRoot())return Jp(r,r,new Te([],{}),n,i);let s=xN(o,r,t),a=s.processChildren?Ea(s.segmentGroup,s.index,o.commands):nS(s.segmentGroup,s.index,o.commands);return Jp(r,s.segmentGroup,a,n,i)}function lu(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function Ta(t){return typeof t=="object"&&t!=null&&t.outlets}function Jp(t,e,n,i,r){let o={};i&&Object.entries(i).forEach(([l,c])=>{o[l]=Array.isArray(c)?c.map(u=>`${u}`):`${c}`});let s;t===e?s=n:s=tS(t,e,n);let a=Zb(Kb(s));return new Wn(a,o,r)}function tS(t,e,n){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===e?i[r]=n:i[r]=tS(o,e,n)}),new Te(t.segments,i)}var cu=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,n,i){if(this.isAbsolute=e,this.numberOfDoubleDots=n,this.commands=i,e&&i.length>0&&lu(i[0]))throw new B(4003,!1);let r=i.find(Ta);if(r&&r!==Wb(i))throw new B(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function _N(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new cu(!0,0,t);let e=0,n=!1,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?n=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new cu(n,e,i)}var Xo=class{segmentGroup;processChildren;index;constructor(e,n,i){this.segmentGroup=e,this.processChildren=n,this.index=i}};function xN(t,e,n){if(t.isAbsolute)return new Xo(e,!0,0);if(!n)return new Xo(e,!1,NaN);if(n.parent===null)return new Xo(n,!0,0);let i=lu(t.commands[0])?0:1,r=n.segments.length-1+i;return bN(n,r,t.numberOfDoubleDots)}function bN(t,e,n){let i=t,r=e,o=n;for(;o>r;){if(o-=r,i=i.parent,!i)throw new B(4005,!1);r=i.segments.length}return new Xo(i,!1,r-o)}function SN(t){return Ta(t[0])?t[0].outlets:{[re]:t}}function nS(t,e,n){if(t??=new Te([],{}),t.segments.length===0&&t.hasChildren())return Ea(t,e,n);let i=wN(t,e,n),r=n.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new Te(t.segments.slice(0,i.pathIndex),{});return o.children[re]=new Te(t.segments.slice(i.pathIndex),t.children),Ea(o,0,r)}else return i.match&&r.length===0?new Te(t.segments,{}):i.match&&!t.hasChildren()?om(t,e,n):i.match?Ea(t,0,r):om(t,e,n)}function Ea(t,e,n){if(n.length===0)return new Te(t.segments,{});{let i=SN(n),r={};if(Object.keys(i).some(o=>o!==re)&&t.children[re]&&t.numberOfChildren===1&&t.children[re].segments.length===0){let o=Ea(t.children[re],e,n);return new Te(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=nS(t.children[o],e,s))}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new Te(t.segments,r)}}function wN(t,e,n){let i=0,r=e,o={match:!1,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=n.length)return o;let s=t.segments[r],a=n[i];if(Ta(a))break;let l=`${a}`,c=i<n.length-1?n[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!Fb(l,c,s))return o;i+=2}else{if(!Fb(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function om(t,e,n){let i=t.segments.slice(0,e),r=0;for(;r<n.length;){let o=n[r];if(Ta(o)){let l=MN(o.outlets);return new Te(i,l)}if(r===0&&lu(n[0])){let l=t.segments[e];i.push(new Ai(l.path,kb(n[0]))),r++;continue}let s=Ta(o)?o.outlets[re]:`${o}`,a=r<n.length-1?n[r+1]:null;s&&a&&lu(a)?(i.push(new Ai(s,kb(a))),r+=2):(i.push(new Ai(s,{})),r++)}return new Te(i,{})}function MN(t){let e={};return Object.entries(t).forEach(([n,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[n]=om(new Te([],{}),0,i))}),e}function kb(t){let e={};return Object.entries(t).forEach(([n,i])=>e[n]=`${i}`),e}function Fb(t,e,n){return t==n.path&&Hn(e,n.parameters)}var au="imperative",lt=function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t}(lt||{}),Xt=class{id;url;constructor(e,n){this.id=e,this.url=n}},jn=class extends Xt{type=lt.NavigationStart;navigationTrigger;restoredState;constructor(e,n,i="imperative",r=null){super(e,n),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Ft=class extends Xt{urlAfterRedirects;type=lt.NavigationEnd;constructor(e,n,i){super(e,n),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},kt=function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t}(kt||{}),Ia=function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t}(Ia||{}),on=class extends Xt{reason;code;type=lt.NavigationCancel;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},ci=class extends Xt{reason;code;type=lt.NavigationSkipped;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}},ui=class extends Xt{error;target;type=lt.NavigationError;constructor(e,n,i,r){super(e,n),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ni=class extends Xt{urlAfterRedirects;state;type=lt.RoutesRecognized;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},uu=class extends Xt{urlAfterRedirects;state;type=lt.GuardsCheckStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},du=class extends Xt{urlAfterRedirects;state;shouldActivate;type=lt.GuardsCheckEnd;constructor(e,n,i,r,o){super(e,n),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},fu=class extends Xt{urlAfterRedirects;state;type=lt.ResolveStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},hu=class extends Xt{urlAfterRedirects;state;type=lt.ResolveEnd;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},pu=class{route;type=lt.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},mu=class{route;type=lt.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},gu=class{snapshot;type=lt.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},vu=class{snapshot;type=lt.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},yu=class{snapshot;type=lt.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},_u=class{snapshot;type=lt.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Da=class{},Zo=class{url;navigationBehaviorOptions;constructor(e,n){this.url=e,this.navigationBehaviorOptions=n}};function EN(t,e){return t.providers&&!t._injector&&(t._injector=jc(t.providers,e,`Route: ${t.path}`)),t._injector??e}function Sn(t){return t.outlet||re}function CN(t,e){let n=t.filter(i=>Sn(i)===e);return n.push(...t.filter(i=>Sn(i)!==e)),n}function Fa(t){if(!t)return null;if(t.routeConfig?._injector)return t.routeConfig._injector;for(let e=t.parent;e;e=e.parent){let n=e.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var xu=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return Fa(this.route?.snapshot)??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new Qo(this.rootInjector)}},Qo=(()=>{class t{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,i){let r=this.getOrCreateContext(n);r.outlet=i,this.contexts.set(n,r)}onChildOutletDestroyed(n){let i=this.getContext(n);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let i=this.getContext(n);return i||(i=new xu(this.rootInjector),this.contexts.set(n,i)),i}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(i){return new(i||t)(L(Gt))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),bu=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let n=this.pathFromRoot(e);return n.length>1?n[n.length-2]:null}children(e){let n=sm(e,this._root);return n?n.children.map(i=>i.value):[]}firstChild(e){let n=sm(e,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(e){let n=am(e,this._root);return n.length<2?[]:n[n.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return am(e,this._root).map(n=>n.value)}};function sm(t,e){if(t===e.value)return e;for(let n of e.children){let i=sm(t,n);if(i)return i}return null}function am(t,e){if(t===e.value)return[e];for(let n of e.children){let i=am(t,n);if(i.length)return i.unshift(e),i}return[]}var qt=class{value;children;constructor(e,n){this.value=e,this.children=n}toString(){return`TreeNode(${this.value})`}};function qo(t){let e={};return t&&t.children.forEach(n=>e[n.value.outlet]=n),e}var Aa=class extends bu{snapshot;constructor(e,n){super(e),this.snapshot=n,mm(this,e)}toString(){return this.snapshot.toString()}};function iS(t){let e=TN(t),n=new Xe([new Ai("",{})]),i=new Xe({}),r=new Xe({}),o=new Xe({}),s=new Xe(""),a=new di(n,i,o,s,r,re,t,e.root);return a.snapshot=e.root,new Aa(new qt(a,[]),e)}function TN(t){let e={},n={},i={},r="",o=new br([],e,i,r,n,re,t,null,{});return new Ra("",new qt(o,[]))}var di=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,n,i,r,o,s,a,l){this.urlSubject=e,this.paramsSubject=n,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(W(c=>c[Oa]))??q(void 0),this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(W(e=>Sr(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(W(e=>Sr(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Su(t,e,n="emptyOnly"){let i,{routeConfig:r}=t;return e!==null&&(n==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:y(y({},e.params),t.params),data:y(y({},e.data),t.data),resolve:y(y(y(y({},t.data),e.data),r?.data),t._resolvedData)}:i={params:y({},t.params),data:y({},t.data),resolve:y(y({},t.data),t._resolvedData??{})},r&&oS(r)&&(i.resolve[Oa]=r.title),i}var br=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[Oa]}constructor(e,n,i,r,o,s,a,l,c){this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Sr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Sr(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${n}')`}},Ra=class extends bu{url;constructor(e,n){super(n),this.url=e,mm(this,n)}toString(){return rS(this._root)}};function mm(t,e){e.value._routerState=t,e.children.forEach(n=>mm(t,n))}function rS(t){let e=t.children.length>0?` { ${t.children.map(rS).join(", ")} } `:"";return`${t.value}${e}`}function Qp(t){if(t.snapshot){let e=t.snapshot,n=t._futureSnapshot;t.snapshot=n,Hn(e.queryParams,n.queryParams)||t.queryParamsSubject.next(n.queryParams),e.fragment!==n.fragment&&t.fragmentSubject.next(n.fragment),Hn(e.params,n.params)||t.paramsSubject.next(n.params),tN(e.url,n.url)||t.urlSubject.next(n.url),Hn(e.data,n.data)||t.dataSubject.next(n.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function lm(t,e){let n=Hn(t.params,e.params)&&oN(t.url,e.url),i=!t.parent!=!e.parent;return n&&!i&&(!t.parent||lm(t.parent,e.parent))}function oS(t){return typeof t.title=="string"||t.title===null}var sS=new A(""),Mr=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=re;activateEvents=new _t;deactivateEvents=new _t;attachEvents=new _t;detachEvents=new _t;routerOutletData=ra(void 0);parentContexts=w(Qo);location=w(Lo);changeDetector=w(Ho);inputBinder=w(Cu,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:i,previousValue:r}=n.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new B(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new B(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new B(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,i){this.activated=n,this._activatedRoute=i,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,i){if(this.isActivated)throw new B(4013,!1);this._activatedRoute=n;let r=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new cm(n,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=fa({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[pr]})}return t})(),cm=class{route;childContexts;parent;outletData;constructor(e,n,i,r){this.route=e,this.childContexts=n,this.parent=i,this.outletData=r}get(e,n){return e===di?this.route:e===Qo?this.childContexts:e===sS?this.outletData:this.parent.get(e,n)}},Cu=new A("");var gm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=De({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&be(0,"router-outlet")},dependencies:[Mr],encapsulation:2})}return t})();function vm(t){let e=t.children&&t.children.map(vm),n=e?M(y({},t),{children:e}):y({},t);return!n.component&&!n.loadComponent&&(e||n.loadChildren)&&n.outlet&&n.outlet!==re&&(n.component=gm),n}function IN(t,e,n){let i=Na(t,e._root,n?n._root:void 0);return new Aa(i,e)}function Na(t,e,n){if(n&&t.shouldReuseRoute(e.value,n.value.snapshot)){let i=n.value;i._futureSnapshot=e.value;let r=DN(t,e,n);return new qt(i,r)}else{if(t.shouldAttach(e.value)){let o=t.retrieve(e.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=e.value,s.children=e.children.map(a=>Na(t,a)),s}}let i=AN(e.value),r=e.children.map(o=>Na(t,o));return new qt(i,r)}}function DN(t,e,n){return e.children.map(i=>{for(let r of n.children)if(t.shouldReuseRoute(i.value,r.value.snapshot))return Na(t,i,r);return Na(t,i)})}function AN(t){return new di(new Xe(t.url),new Xe(t.params),new Xe(t.queryParams),new Xe(t.fragment),new Xe(t.data),t.outlet,t.component,t)}var Ko=class{redirectTo;navigationBehaviorOptions;constructor(e,n){this.redirectTo=e,this.navigationBehaviorOptions=n}},aS="ngNavigationCancelingError";function wu(t,e){let{redirectTo:n,navigationBehaviorOptions:i}=Ri(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=lS(!1,kt.Redirect);return r.url=n,r.navigationBehaviorOptions=i,r}function lS(t,e){let n=new Error(`NavigationCancelingError: ${t||""}`);return n[aS]=!0,n.cancellationCode=e,n}function RN(t){return cS(t)&&Ri(t.url)}function cS(t){return!!t&&t[aS]}var NN=(t,e,n,i)=>W(r=>(new um(e,r.targetRouterState,r.currentRouterState,n,i).activate(t),r)),um=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,n,i,r,o){this.routeReuseStrategy=e,this.futureState=n,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(e){let n=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,i,e),Qp(this.futureState.root),this.activateChildRoutes(n,i,e)}deactivateChildRoutes(e,n,i){let r=qo(n);e.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(e,n,s.children)}else this.deactivateChildRoutes(e,n,i);else o&&this.deactivateRouteAndItsChildren(n,i)}deactivateRouteAndItsChildren(e,n){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,n):this.deactivateRouteAndOutlet(e,n)}detachAndStoreRouteSubtree(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=qo(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:s,route:e,contexts:a})}}deactivateRouteAndOutlet(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=qo(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,n,i){let r=qo(n);e.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new _u(o.value.snapshot))}),e.children.length&&this.forwardEvent(new vu(e.value.snapshot))}activateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(Qp(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,n,s.children)}else this.activateChildRoutes(e,n,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Qp(a.route.value),this.activateChildRoutes(e,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(e,null,s.children)}else this.activateChildRoutes(e,null,i)}},Mu=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Yo=class{component;route;constructor(e,n){this.component=e,this.route=n}};function PN(t,e,n){let i=t._root,r=e?e._root:null;return Ma(i,r,n,[i.value])}function LN(t){let e=t.routeConfig?t.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:t,guards:e}}function es(t,e){let n=Symbol(),i=e.get(t,n);return i===n?typeof t=="function"&&!y0(t)?t:e.get(t):i}function Ma(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=qo(e);return t.children.forEach(s=>{ON(s,o[s.value.outlet],n,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Ca(a,n.getContext(s),r)),r}function ON(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=e?e.value:null,a=n?n.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=kN(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new Mu(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Ma(t,e,a?a.children:null,i,r):Ma(t,e,n,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Yo(a.outlet.component,s))}else s&&Ca(e,a,r),r.canActivateChecks.push(new Mu(i)),o.component?Ma(t,null,a?a.children:null,i,r):Ma(t,null,n,i,r);return r}function kN(t,e,n){if(typeof n=="function")return n(t,e);switch(n){case"pathParamsChange":return!xr(t.url,e.url);case"pathParamsOrQueryParamsChange":return!xr(t.url,e.url)||!Hn(t.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!lm(t,e)||!Hn(t.queryParams,e.queryParams);case"paramsChange":default:return!lm(t,e)}}function Ca(t,e,n){let i=qo(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?e?Ca(s,e.children.getContext(o),n):Ca(s,null,n):Ca(s,e,n)}),r.component?e&&e.outlet&&e.outlet.isActivated?n.canDeactivateChecks.push(new Yo(e.outlet.component,r)):n.canDeactivateChecks.push(new Yo(null,r)):n.canDeactivateChecks.push(new Yo(null,r))}function Va(t){return typeof t=="function"}function FN(t){return typeof t=="boolean"}function VN(t){return t&&Va(t.canLoad)}function UN(t){return t&&Va(t.canActivate)}function zN(t){return t&&Va(t.canActivateChild)}function BN(t){return t&&Va(t.canDeactivate)}function HN(t){return t&&Va(t.canMatch)}function uS(t){return t instanceof pn||t?.name==="EmptyError"}var iu=Symbol("INITIAL_VALUE");function Jo(){return ft(t=>Hl(t.map(e=>e.pipe(Ye(1),bf(iu)))).pipe(W(e=>{for(let n of e)if(n!==!0){if(n===iu)return iu;if(n===!1||WN(n))return n}return!0}),ge(e=>e!==iu),Ye(1)))}function WN(t){return Ri(t)||t instanceof Ko}function jN(t,e){return Ve(n=>{let{targetSnapshot:i,currentSnapshot:r,guards:{canActivateChecks:o,canDeactivateChecks:s}}=n;return s.length===0&&o.length===0?q(M(y({},n),{guardsResult:!0})):GN(s,i,r,t).pipe(Ve(a=>a&&FN(a)?$N(i,o,t,e):q(a)),W(a=>M(y({},n),{guardsResult:a})))})}function GN(t,e,n,i){return Fe(t).pipe(Ve(r=>KN(r.component,r.route,n,e,i)),Qn(r=>r!==!0,!0))}function $N(t,e,n,i){return Fe(e).pipe(At(r=>so(XN(r.route.parent,i),qN(r.route,i),ZN(t,r.path,n),YN(t,r.route,n))),Qn(r=>r!==!0,!0))}function qN(t,e){return t!==null&&e&&e(new yu(t)),q(!0)}function XN(t,e){return t!==null&&e&&e(new gu(t)),q(!0)}function YN(t,e,n){let i=e.routeConfig?e.routeConfig.canActivate:null;if(!i||i.length===0)return q(!0);let r=i.map(o=>zs(()=>{let s=Fa(e)??n,a=es(o,s),l=UN(a)?a.canActivate(e,t):_n(s,()=>a(e,t));return Pi(l).pipe(Qn())}));return q(r).pipe(Jo())}function ZN(t,e,n){let i=e[e.length-1],o=e.slice(0,e.length-1).reverse().map(s=>LN(s)).filter(s=>s!==null).map(s=>zs(()=>{let a=s.guards.map(l=>{let c=Fa(s.node)??n,u=es(l,c),d=zN(u)?u.canActivateChild(i,t):_n(c,()=>u(i,t));return Pi(d).pipe(Qn())});return q(a).pipe(Jo())}));return q(o).pipe(Jo())}function KN(t,e,n,i,r){let o=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!o||o.length===0)return q(!0);let s=o.map(a=>{let l=Fa(e)??r,c=es(a,l),u=BN(c)?c.canDeactivate(t,e,n,i):_n(l,()=>c(t,e,n,i));return Pi(u).pipe(Qn())});return q(s).pipe(Jo())}function JN(t,e,n,i){let r=e.canLoad;if(r===void 0||r.length===0)return q(!0);let o=r.map(s=>{let a=es(s,t),l=VN(a)?a.canLoad(e,n):_n(t,()=>a(e,n));return Pi(l)});return q(o).pipe(Jo(),dS(i))}function dS(t){return sf(K(e=>{if(typeof e!="boolean")throw wu(t,e)}),W(e=>e===!0))}function QN(t,e,n,i){let r=e.canMatch;if(!r||r.length===0)return q(!0);let o=r.map(s=>{let a=es(s,t),l=HN(a)?a.canMatch(e,n):_n(t,()=>a(e,n));return Pi(l)});return q(o).pipe(Jo(),dS(i))}var Pa=class{segmentGroup;constructor(e){this.segmentGroup=e||null}},La=class extends Error{urlTree;constructor(e){super(),this.urlTree=e}};function $o(t){return Si(new Pa(t))}function eP(t){return Si(new B(4e3,!1))}function tP(t){return Si(lS(!1,kt.GuardRejected))}var dm=class{urlSerializer;urlTree;constructor(e,n){this.urlSerializer=e,this.urlTree=n}lineralizeSegments(e,n){let i=[],r=n.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return q(i);if(r.numberOfChildren>1||!r.children[re])return eP(`${e.redirectTo}`);r=r.children[re]}}applyRedirectCommands(e,n,i,r,o){if(typeof n!="string"){let a=n,{queryParams:l,fragment:c,routeConfig:u,url:d,outlet:m,params:f,data:v,title:b}=r,R=_n(o,()=>a({params:f,data:v,queryParams:l,fragment:c,routeConfig:u,url:d,outlet:m,title:b}));if(R instanceof Wn)throw new La(R);n=R}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),e,i);if(n[0]==="/")throw new La(s);return s}applyRedirectCreateUrlTree(e,n,i,r){let o=this.createSegmentGroup(e,n.root,i,r);return new Wn(o,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(e,n){let i={};return Object.entries(e).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=n[a]}else i[r]=o}),i}createSegmentGroup(e,n,i,r){let o=this.createSegments(e,n.segments,i,r),s={};return Object.entries(n.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(e,l,i,r)}),new Te(o,s)}createSegments(e,n,i,r){return n.map(o=>o.path[0]===":"?this.findPosParam(e,o,r):this.findOrReturn(o,i))}findPosParam(e,n,i){let r=i[n.path.substring(1)];if(!r)throw new B(4001,!1);return r}findOrReturn(e,n){let i=0;for(let r of n){if(r.path===e.path)return n.splice(i),r;i++}return e}},fm={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function nP(t,e,n,i,r){let o=fS(t,e,n);return o.matched?(i=EN(e,i),QN(i,e,n,r).pipe(W(s=>s===!0?o:y({},fm)))):q(o)}function fS(t,e,n){if(e.path==="**")return iP(n);if(e.path==="")return e.pathMatch==="full"&&(t.hasChildren()||n.length>0)?y({},fm):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let r=(e.matcher||Bb)(n,t,e);if(!r)return y({},fm);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?y(y({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:n.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function iP(t){return{matched:!0,parameters:t.length>0?Wb(t).parameters:{},consumedSegments:t,remainingSegments:[],positionalParamSegments:{}}}function Vb(t,e,n,i){return n.length>0&&sP(t,n,i)?{segmentGroup:new Te(e,oP(i,new Te(n,t.children))),slicedSegments:[]}:n.length===0&&aP(t,n,i)?{segmentGroup:new Te(t.segments,rP(t,n,i,t.children)),slicedSegments:n}:{segmentGroup:new Te(t.segments,t.children),slicedSegments:n}}function rP(t,e,n,i){let r={};for(let o of n)if(Tu(t,e,o)&&!i[Sn(o)]){let s=new Te([],{});r[Sn(o)]=s}return y(y({},i),r)}function oP(t,e){let n={};n[re]=e;for(let i of t)if(i.path===""&&Sn(i)!==re){let r=new Te([],{});n[Sn(i)]=r}return n}function sP(t,e,n){return n.some(i=>Tu(t,e,i)&&Sn(i)!==re)}function aP(t,e,n){return n.some(i=>Tu(t,e,i))}function Tu(t,e,n){return(t.hasChildren()||e.length>0)&&n.pathMatch==="full"?!1:n.path===""}function lP(t,e,n){return e.length===0&&!t.children[n]}var hm=class{};function cP(t,e,n,i,r,o,s="emptyOnly"){return new pm(t,e,n,i,r,s,o).recognize()}var uP=31,pm=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,n,i,r,o,s,a){this.injector=e,this.configLoader=n,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new dm(this.urlSerializer,this.urlTree)}noMatchError(e){return new B(4002,`'${e.segmentGroup}'`)}recognize(){let e=Vb(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(e).pipe(W(({children:n,rootSnapshot:i})=>{let r=new qt(i,n),o=new Ra("",r),s=Jb(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}))}match(e){let n=new br([],Object.freeze({}),Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),re,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,e,re,n).pipe(W(i=>({children:i,rootSnapshot:n})),Qt(i=>{if(i instanceof La)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof Pa?this.noMatchError(i):i}))}processSegmentGroup(e,n,i,r,o){return i.segments.length===0&&i.hasChildren()?this.processChildren(e,n,i,o):this.processSegment(e,n,i,i.segments,r,!0,o).pipe(W(s=>s instanceof qt?[s]:[]))}processChildren(e,n,i,r){let o=[];for(let s of Object.keys(i.children))s==="primary"?o.unshift(s):o.push(s);return Fe(o).pipe(At(s=>{let a=i.children[s],l=CN(n,s);return this.processSegmentGroup(e,l,a,s,r)}),Qi((s,a)=>(s.push(...a),s)),Mi(null),gf(),Ve(s=>{if(s===null)return $o(i);let a=hS(s);return dP(a),q(a)}))}processSegment(e,n,i,r,o,s,a){return Fe(n).pipe(At(l=>this.processSegmentAgainstRoute(l._injector??e,n,l,i,r,o,s,a).pipe(Qt(c=>{if(c instanceof Pa)return q(null);throw c}))),Qn(l=>!!l),Qt(l=>{if(uS(l))return lP(i,r,o)?q(new hm):$o(i);throw l}))}processSegmentAgainstRoute(e,n,i,r,o,s,a,l){return Sn(i)!==s&&(s===re||!Tu(r,o,i))?$o(r):i.redirectTo===void 0?this.matchSegmentAgainstRoute(e,r,i,o,s,l):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(e,r,n,i,o,s,l):$o(r)}expandSegmentAgainstRouteUsingRedirect(e,n,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:d,remainingSegments:m}=fS(n,r,o);if(!l)return $o(n);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>uP&&(this.allowRedirects=!1));let f=new br(o,c,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Ub(r),Sn(r),r.component??r._loadedComponent??null,r,zb(r)),v=Su(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(v.params),f.data=Object.freeze(v.data);let b=this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,f,e);return this.applyRedirects.lineralizeSegments(r,b).pipe(Ve(R=>this.processSegment(e,i,n,R.concat(m),s,!1,a)))}matchSegmentAgainstRoute(e,n,i,r,o,s){let a=nP(n,i,r,e,this.urlSerializer);return i.path==="**"&&(n.children={}),a.pipe(ft(l=>l.matched?(e=i._injector??e,this.getChildConfig(e,i,r).pipe(ft(({routes:c})=>{let u=i._loadedInjector??e,{parameters:d,consumedSegments:m,remainingSegments:f}=l,v=new br(m,d,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Ub(i),Sn(i),i.component??i._loadedComponent??null,i,zb(i)),b=Su(v,s,this.paramsInheritanceStrategy);v.params=Object.freeze(b.params),v.data=Object.freeze(b.data);let{segmentGroup:R,slicedSegments:P}=Vb(n,m,f,c);if(P.length===0&&R.hasChildren())return this.processChildren(u,c,R,v).pipe(W(fe=>new qt(v,fe)));if(c.length===0&&P.length===0)return q(new qt(v,[]));let H=Sn(i)===o;return this.processSegment(u,c,R,P,H?re:o,!0,v).pipe(W(fe=>new qt(v,fe instanceof qt?[fe]:[])))}))):$o(n)))}getChildConfig(e,n,i){return n.children?q({routes:n.children,injector:e}):n.loadChildren?n._loadedRoutes!==void 0?q({routes:n._loadedRoutes,injector:n._loadedInjector}):JN(e,n,i,this.urlSerializer).pipe(Ve(r=>r?this.configLoader.loadChildren(e,n).pipe(K(o=>{n._loadedRoutes=o.routes,n._loadedInjector=o.injector})):tP(n))):q({routes:[],injector:e})}};function dP(t){t.sort((e,n)=>e.value.outlet===re?-1:n.value.outlet===re?1:e.value.outlet.localeCompare(n.value.outlet))}function fP(t){let e=t.value.routeConfig;return e&&e.path===""}function hS(t){let e=[],n=new Set;for(let i of t){if(!fP(i)){e.push(i);continue}let r=e.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),n.add(r)):e.push(i)}for(let i of n){let r=hS(i.children);e.push(new qt(i.value,r))}return e.filter(i=>!n.has(i))}function Ub(t){return t.data||{}}function zb(t){return t.resolve||{}}function hP(t,e,n,i,r,o){return Ve(s=>cP(t,e,n,i,s.extractedUrl,r,o).pipe(W(({state:a,tree:l})=>M(y({},s),{targetSnapshot:a,urlAfterRedirects:l}))))}function pP(t,e){return Ve(n=>{let{targetSnapshot:i,guards:{canActivateChecks:r}}=n;if(!r.length)return q(n);let o=new Set(r.map(l=>l.route)),s=new Set;for(let l of o)if(!s.has(l))for(let c of pS(l))s.add(c);let a=0;return Fe(s).pipe(At(l=>o.has(l)?mP(l,i,t,e):(l.data=Su(l,l.parent,t).resolve,q(void 0))),K(()=>a++),co(1),Ve(l=>a===s.size?q(n):We))})}function pS(t){let e=t.children.map(n=>pS(n)).flat();return[t,...e]}function mP(t,e,n,i){let r=t.routeConfig,o=t._resolve;return r?.title!==void 0&&!oS(r)&&(o[Oa]=r.title),gP(o,t,e,i).pipe(W(s=>(t._resolvedData=s,t.data=Su(t,t.parent,n).resolve,null)))}function gP(t,e,n,i){let r=nm(t);if(r.length===0)return q({});let o={};return Fe(r).pipe(Ve(s=>vP(t[s],e,n,i).pipe(Qn(),K(a=>{if(a instanceof Ko)throw wu(new wr,a);o[s]=a}))),co(1),W(()=>o),Qt(s=>uS(s)?We:Si(s)))}function vP(t,e,n,i){let r=Fa(e)??i,o=es(t,r),s=o.resolve?o.resolve(e,n):_n(r,()=>o(e,n));return Pi(s)}function em(t){return ft(e=>{let n=t(e);return n?Fe(n).pipe(W(()=>e)):q(e)})}var ym=(()=>{class t{buildTitle(n){let i,r=n.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===re);return i}getResolvedTitleForRoute(n){return n.data[Oa]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(mS),providedIn:"root"})}return t})(),mS=(()=>{class t extends ym{title;constructor(n){super(),this.title=n}updateTitle(n){let i=this.buildTitle(n);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||t)(L(Pb))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ua=new A("",{providedIn:"root",factory:()=>({})}),za=new A(""),gS=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=w(lb);loadComponent(n){if(this.componentLoaders.get(n))return this.componentLoaders.get(n);if(n._loadedComponent)return q(n._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(n);let i=Pi(n.loadComponent()).pipe(W(yS),K(o=>{this.onLoadEndListener&&this.onLoadEndListener(n),n._loadedComponent=o}),lo(()=>{this.componentLoaders.delete(n)})),r=new no(i,()=>new Ae).pipe(to());return this.componentLoaders.set(n,r),r}loadChildren(n,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return q({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let o=vS(i,this.compiler,n,this.onLoadEndListener).pipe(lo(()=>{this.childrenLoaders.delete(i)})),s=new no(o,()=>new Ae).pipe(to());return this.childrenLoaders.set(i,s),s}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function vS(t,e,n,i){return Pi(t.loadChildren()).pipe(W(yS),Ve(r=>r instanceof Ip||Array.isArray(r)?q(r):Fe(e.compileModuleAsync(r))),W(r=>{i&&i(t);let o,s,a=!1;return Array.isArray(r)?(s=r,a=!0):(o=r.create(n).injector,s=o.get(za,[],{optional:!0,self:!0}).flat()),{routes:s.map(vm),injector:o}}))}function yP(t){return t&&typeof t=="object"&&"default"in t}function yS(t){return yP(t)?t.default:t}var Iu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(_P),providedIn:"root"})}return t})(),_P=(()=>{class t{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,i){return n}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),_S=new A("");var xS=new A(""),bS=(()=>{class t{currentNavigation=null;currentTransition=null;lastSuccessfulNavigation=null;events=new Ae;transitionAbortSubject=new Ae;configLoader=w(gS);environmentInjector=w(Gt);destroyRef=w(rn);urlSerializer=w(ka);rootContexts=w(Qo);location=w(jo);inputBindingEnabled=w(Cu,{optional:!0})!==null;titleStrategy=w(ym);options=w(Ua,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=w(Iu);createViewTransition=w(_S,{optional:!0});navigationErrorHandler=w(xS,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>q(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=r=>this.events.next(new pu(r)),i=r=>this.events.next(new mu(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let i=++this.navigationId;this.transitions?.next(M(y({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i}))}setupNavigations(n){return this.transitions=new Xe(null),this.transitions.pipe(ge(i=>i!==null),ft(i=>{let r=!1,o=!1;return q(i).pipe(ft(s=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",kt.SupersededByNewNavigation),We;this.currentTransition=i,this.currentNavigation={id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:this.lastSuccessfulNavigation?M(y({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let a=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),l=s.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!a&&l!=="reload"){let c="";return this.events.next(new ci(s.id,this.urlSerializer.serialize(s.rawUrl),c,Ia.IgnoredSameUrlNavigation)),s.resolve(!1),We}if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return q(s).pipe(ft(c=>(this.events.next(new jn(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?We:Promise.resolve(c))),hP(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),K(c=>{i.targetSnapshot=c.targetSnapshot,i.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation=M(y({},this.currentNavigation),{finalUrl:c.urlAfterRedirects});let u=new Ni(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}));if(a&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:c,extractedUrl:u,source:d,restoredState:m,extras:f}=s,v=new jn(c,this.urlSerializer.serialize(u),d,m);this.events.next(v);let b=iS(this.rootComponentType).snapshot;return this.currentTransition=i=M(y({},s),{targetSnapshot:b,urlAfterRedirects:u,extras:M(y({},f),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=u,q(i)}else{let c="";return this.events.next(new ci(s.id,this.urlSerializer.serialize(s.extractedUrl),c,Ia.IgnoredByUrlHandlingStrategy)),s.resolve(!1),We}}),K(s=>{let a=new uu(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(a)}),W(s=>(this.currentTransition=i=M(y({},s),{guards:PN(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),i)),jN(this.environmentInjector,s=>this.events.next(s)),K(s=>{if(i.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw wu(this.urlSerializer,s.guardsResult);let a=new du(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);this.events.next(a)}),ge(s=>s.guardsResult?!0:(this.cancelNavigationTransition(s,"",kt.GuardRejected),!1)),em(s=>{if(s.guards.canActivateChecks.length!==0)return q(s).pipe(K(a=>{let l=new fu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}),ft(a=>{let l=!1;return q(a).pipe(pP(this.paramsInheritanceStrategy,this.environmentInjector),K({next:()=>l=!0,complete:()=>{l||this.cancelNavigationTransition(a,"",kt.NoDataFromResolver)}}))}),K(a=>{let l=new hu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}))}),em(s=>{let a=l=>{let c=[];l.routeConfig?.loadComponent&&!l.routeConfig._loadedComponent&&c.push(this.configLoader.loadComponent(l.routeConfig).pipe(K(u=>{l.component=u}),W(()=>{})));for(let u of l.children)c.push(...a(u));return c};return Hl(a(s.targetSnapshot.root)).pipe(Mi(null),Ye(1))}),em(()=>this.afterPreactivation()),ft(()=>{let{currentSnapshot:s,targetSnapshot:a}=i,l=this.createViewTransition?.(this.environmentInjector,s.root,a.root);return l?Fe(l).pipe(W(()=>i)):q(i)}),W(s=>{let a=IN(n.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=i=M(y({},s),{targetRouterState:a}),this.currentNavigation.targetRouterState=a,i}),K(()=>{this.events.next(new Da)}),NN(this.rootContexts,n.routeReuseStrategy,s=>this.events.next(s),this.inputBindingEnabled),Ye(1),K({next:s=>{r=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Ft(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(!0)},complete:()=>{r=!0}}),er(this.transitionAbortSubject.pipe(K(s=>{throw s}))),lo(()=>{!r&&!o&&this.cancelNavigationTransition(i,"",kt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation=null,this.currentTransition=null)}),Qt(s=>{if(this.destroyed)return i.resolve(!1),We;if(o=!0,cS(s))this.events.next(new on(i.id,this.urlSerializer.serialize(i.extractedUrl),s.message,s.cancellationCode)),RN(s)?this.events.next(new Zo(s.url,s.navigationBehaviorOptions)):i.resolve(!1);else{let a=new ui(i.id,this.urlSerializer.serialize(i.extractedUrl),s,i.targetSnapshot??void 0);try{let l=_n(this.environmentInjector,()=>this.navigationErrorHandler?.(a));if(l instanceof Ko){let{message:c,cancellationCode:u}=wu(this.urlSerializer,l);this.events.next(new on(i.id,this.urlSerializer.serialize(i.extractedUrl),c,u)),this.events.next(new Zo(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(a),s}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return We}))}))}cancelNavigationTransition(n,i,r){let o=new on(n.id,this.urlSerializer.serialize(n.extractedUrl),i,r);this.events.next(o),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return n.toString()!==i?.toString()&&!this.currentNavigation?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function xP(t){return t!==au}var SS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(bP),providedIn:"root"})}return t})(),Eu=class{shouldDetach(e){return!1}store(e,n){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,n){return e.routeConfig===n.routeConfig}},bP=(()=>{class t extends Eu{static \u0275fac=(()=>{let n;return function(r){return(n||(n=mr(t)))(r||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),wS=(()=>{class t{urlSerializer=w(ka);options=w(Ua,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=w(jo);urlHandlingStrategy=w(Iu);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Wn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:i,targetBrowserUrl:r}){let o=n!==void 0?this.urlHandlingStrategy.merge(n,i):i,s=r??o;return s instanceof Wn?this.urlSerializer.serialize(s):s}commitTransition({targetRouterState:n,finalUrl:i,initialUrl:r}){i&&n?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=n):this.rawUrlTree=r}routerState=iS(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(SP),providedIn:"root"})}return t})(),SP=(()=>{class t extends wS{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{n(i.url,i.state,"popstate")})})}handleRouterEvent(n,i){n instanceof jn?this.updateStateMemento():n instanceof ci?this.commitTransition(i):n instanceof Ni?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof Da?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof on&&(n.code===kt.GuardRejected||n.code===kt.NoDataFromResolver)?this.restoreHistory(i):n instanceof ui?this.restoreHistory(i,!0):n instanceof Ft&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,{extras:i,id:r}){let{replaceUrl:o,state:s}=i;if(this.location.isCurrentPathEqualTo(n)||o){let a=this.browserPageId,l=y(y({},s),this.generateNgRouterState(r,a));this.location.replaceState(n,"",l)}else{let a=y(y({},s),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(n,"",a)}}restoreHistory(n,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===n.finalUrl&&o===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,i){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:i}:{navigationId:n}}static \u0275fac=(()=>{let n;return function(r){return(n||(n=mr(t)))(r||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function _m(t,e){t.events.pipe(ge(n=>n instanceof Ft||n instanceof on||n instanceof ui||n instanceof ci),W(n=>n instanceof Ft||n instanceof ci?0:(n instanceof on?n.code===kt.Redirect||n.code===kt.SupersededByNewNavigation:!1)?2:1),ge(n=>n!==2),Ye(1)).subscribe(()=>{e()})}var wP={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},MP={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},Yt=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=w(Ap);stateManager=w(wS);options=w(Ua,{optional:!0})||{};pendingTasks=w(No);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=w(bS);urlSerializer=w(ka);location=w(jo);urlHandlingStrategy=w(Iu);_events=new Ae;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=w(SS);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=w(za,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!w(Cu,{optional:!0});constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}eventsSubscription=new $e;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=this.navigationTransitions.currentNavigation;if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof on&&i.code!==kt.Redirect&&i.code!==kt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Ft)this.navigated=!0;else if(i instanceof Zo){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=y({browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||xP(r.source)},s);this.scheduleNavigation(a,au,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}CP(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortSubject.next(r)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),au,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,i,r)=>{this.navigateToSyncWithBrowser(n,r,i)})}navigateToSyncWithBrowser(n,i,r){let o={replaceUrl:!0},s=r?.navigationId?r:null;if(r){let l=y({},r);delete l.navigationId,delete l.\u0275routerPageId,Object.keys(l).length!==0&&(o.state=l)}let a=this.parseUrl(n);this.scheduleNavigation(a,i,s,o)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(vm),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=y(y({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let m=r?r.snapshot:this.routerState.snapshot.root;d=Qb(m)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return eS(d,n,u,c??null)}navigateByUrl(n,i={skipLocationChange:!1}){let r=Ri(n)?n:this.parseUrl(n),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,au,null,i)}navigate(n,i={skipLocationChange:!1}){return EP(n),this.navigateByUrl(this.createUrlTree(n,i),i)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,i){let r;if(i===!0?r=y({},wP):i===!1?r=y({},MP):r=i,Ri(n))return Lb(this.currentUrlTree,n,r);let o=this.parseUrl(n);return Lb(this.currentUrlTree,o,r)}removeEmptyProps(n){return Object.entries(n).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(n,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((d,m)=>{a=d,l=m});let u=this.pendingTasks.add();return _m(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(d=>Promise.reject(d))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function EP(t){for(let e=0;e<t.length;e++)if(t[e]==null)throw new B(4008,!1)}function CP(t){return!(t instanceof Da)&&!(t instanceof Zo)}var ts=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;href=null;target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new Ae;constructor(n,i,r,o,s,a){this.router=n,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area",this.isAnchorElement?this.subscription=n.events.subscribe(c=>{c instanceof Ft&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}routerLinkInput=null;set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Ri(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,i,r,o,s){let a=this.urlTree;if(a===null||this.isAnchorElement&&(n!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.href=n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n)):null;let i=this.href===null?null:nx(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",i)}applyAttributeValue(n,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,n,i):r.removeAttribute(o,n)}get urlTree(){return this.routerLinkInput===null?null:Ri(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(i){return new(i||t)(Un(Yt),Un(di),ip("tabindex"),Un(Ep),Un(gr),Un(Wo))};static \u0275dir=fa({type:t,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(i,r){i&1&&C("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&ee("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",Xc],skipLocationChange:[2,"skipLocationChange","skipLocationChange",Xc],replaceUrl:[2,"replaceUrl","replaceUrl",Xc],routerLink:"routerLink"},features:[pr]})}return t})();var IP=new A("");function xm(t,...e){return Pt([{provide:za,multi:!0,useValue:t},[],{provide:di,useFactory:DP,deps:[Yt]},{provide:Rp,multi:!0,useFactory:AP},e.map(n=>n.\u0275providers)])}function DP(t){return t.routerState.root}function AP(){let t=w(Mt);return e=>{let n=t.get(Ti);if(e!==n.components[0])return;let i=t.get(Yt),r=t.get(RP);t.get(NP)===1&&i.initialNavigation(),t.get(PP,null,oe.Optional)?.setUpPreloading(),t.get(IP,null,oe.Optional)?.init(),i.resetRootComponentType(n.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var RP=new A("",{factory:()=>new Ae}),NP=new A("",{providedIn:"root",factory:()=>1});var PP=new A("");function _e(t,e){let n=!e?.manualCleanup;n&&!e?.injector&&Wh(_e);let i=n?e?.injector?.get(rn)??w(rn):null,r=OP(e?.equal),o;e?.requireSync?o=Ie({kind:0},{equal:r}):o=Ie({kind:1,value:e?.initialValue},{equal:r});let s,a=t.subscribe({next:l=>o.set({kind:1,value:l}),error:l=>{if(e?.rejectErrors)throw l;o.set({kind:2,error:l})},complete:()=>{s?.()}});if(e?.requireSync&&o().kind===0)throw new B(601,!1);return s=i?.onDestroy(a.unsubscribe.bind(a)),mt(()=>{let l=o();switch(l.kind){case 1:return l.value;case 2:throw l.error;case 0:throw new B(601,!1)}},{equal:e?.equal})}function OP(t=Object.is){return(e,n)=>e.kind===1&&n.kind===1&&t(e.value,n.value)}var Mm={};function fi(t,e){if(Mm[t]=(Mm[t]||0)+1,typeof e=="function")return bm(t,(...i)=>M(y({},e(...i)),{type:t}));switch(e?e._as:"empty"){case"empty":return bm(t,()=>({type:t}));case"props":return bm(t,i=>M(y({},i),{type:t}));default:throw new Error("Unexpected config.")}}function te(){return{_as:"props",_p:void 0}}function bm(t,e){return Object.defineProperty(e,"type",{value:t,writable:!1})}function kP(t){return t.charAt(0).toUpperCase()+t.substring(1)}function FP(t){return t.charAt(0).toLowerCase()+t.substring(1)}function VP(t,e){if(t==null)throw new Error(`${e} must be defined.`)}function US(t){let{source:e,events:n}=t;return Object.keys(n).reduce((i,r)=>M(y({},i),{[UP(r)]:fi(zP(e,r),n[r])}),{})}function tt(){return te()}function UP(t){return t.trim().split(" ").map((e,n)=>n===0?FP(e):kP(e)).join("")}function zP(t,e){return`[${t}] ${e}`}var Ha="@ngrx/store/init",Gn=(()=>{class t extends Xe{constructor(){super({type:Ha})}next(n){if(typeof n=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof n>"u")throw new TypeError("Actions must be objects");if(typeof n.type>"u")throw new TypeError("Actions must have a type property");super.next(n)}complete(){}ngOnDestroy(){super.complete()}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),BP=[Gn],zS=new A("@ngrx/store Internal Root Guard"),MS=new A("@ngrx/store Internal Initial State"),Wa=new A("@ngrx/store Initial State"),BS=new A("@ngrx/store Reducer Factory"),ES=new A("@ngrx/store Internal Reducer Factory Provider"),HS=new A("@ngrx/store Initial Reducers"),Sm=new A("@ngrx/store Internal Initial Reducers"),CS=new A("@ngrx/store Store Features"),TS=new A("@ngrx/store Internal Store Reducers"),wm=new A("@ngrx/store Internal Feature Reducers"),IS=new A("@ngrx/store Internal Feature Configs"),WS=new A("@ngrx/store Internal Store Features"),DS=new A("@ngrx/store Internal Feature Reducers Token"),jS=new A("@ngrx/store Feature Reducers"),AS=new A("@ngrx/store User Provided Meta Reducers"),Du=new A("@ngrx/store Meta Reducers"),RS=new A("@ngrx/store Internal Resolved Meta Reducers"),NS=new A("@ngrx/store User Runtime Checks Config"),PS=new A("@ngrx/store Internal User Runtime Checks Config"),Er=new A("@ngrx/store Internal Runtime Checks"),Im=new A("@ngrx/store Check if Action types are unique"),Ba=new A("@ngrx/store Root Store Provider"),Au=new A("@ngrx/store Feature State Provider");function Dm(t,e={}){let n=Object.keys(t),i={};for(let o=0;o<n.length;o++){let s=n[o];typeof t[s]=="function"&&(i[s]=t[s])}let r=Object.keys(i);return function(s,a){s=s===void 0?e:s;let l=!1,c={};for(let u=0;u<r.length;u++){let d=r[u],m=i[d],f=s[d],v=m(f,a);c[d]=v,l=l||v!==f}return l?c:s}}function HP(t,e){return Object.keys(t).filter(n=>n!==e).reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{})}function GS(...t){return function(e){if(t.length===0)return e;let n=t[t.length-1];return t.slice(0,-1).reduceRight((r,o)=>o(r),n(e))}}function $S(t,e){return Array.isArray(e)&&e.length>0&&(t=GS.apply(null,[...e,t])),(n,i)=>{let r=t(n);return(o,s)=>(o=o===void 0?i:o,r(o,s))}}function WP(t){let e=Array.isArray(t)&&t.length>0?GS(...t):n=>n;return(n,i)=>(n=e(n),(r,o)=>(r=r===void 0?i:r,n(r,o)))}var Cr=class extends le{},ns=class extends Gn{},Nu="@ngrx/store/update-reducers",Ru=(()=>{class t extends Xe{get currentReducers(){return this.reducers}constructor(n,i,r,o){super(o(r,i)),this.dispatcher=n,this.initialState=i,this.reducers=r,this.reducerFactory=o}addFeature(n){this.addFeatures([n])}addFeatures(n){let i=n.reduce((r,{reducers:o,reducerFactory:s,metaReducers:a,initialState:l,key:c})=>{let u=typeof o=="function"?WP(a)(o,l):$S(s,a)(o,l);return r[c]=u,r},{});this.addReducers(i)}removeFeature(n){this.removeFeatures([n])}removeFeatures(n){this.removeReducers(n.map(i=>i.key))}addReducer(n,i){this.addReducers({[n]:i})}addReducers(n){this.reducers=y(y({},this.reducers),n),this.updateReducers(Object.keys(n))}removeReducer(n){this.removeReducers([n])}removeReducers(n){n.forEach(i=>{this.reducers=HP(this.reducers,i)}),this.updateReducers(n)}updateReducers(n){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:Nu,features:n})}ngOnDestroy(){this.complete()}static{this.\u0275fac=function(i){return new(i||t)(L(ns),L(Wa),L(HS),L(BS))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),jP=[Ru,{provide:Cr,useExisting:Ru},{provide:ns,useExisting:Gn}],Tr=(()=>{class t extends Ae{ngOnDestroy(){this.complete()}static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=mr(t)))(r||t)}})()}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),GP=[Tr],is=class extends le{},LS=(()=>{class t extends Xe{static{this.INIT=Ha}constructor(n,i,r,o){super(o);let a=n.pipe(hn(Vs)).pipe(Be(i)),l={state:o},c=a.pipe(Qi($P,l));this.stateSubscription=c.subscribe(({state:u,action:d})=>{this.next(u),r.next(d)}),this.state=_e(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}static{this.\u0275fac=function(i){return new(i||t)(L(Gn),L(Cr),L(Tr),L(Wa))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function $P(t={state:void 0},[e,n]){let{state:i}=t;return{state:n(i,e),action:e}}var qP=[LS,{provide:is,useExisting:LS}],me=(()=>{class t extends le{constructor(n,i,r,o){super(),this.actionsObserver=i,this.reducerManager=r,this.injector=o,this.source=n,this.state=n.state}select(n,...i){return Am.call(null,n,...i)(this)}selectSignal(n,i){return mt(()=>n(this.state()),i)}lift(n){let i=new t(this,this.actionsObserver,this.reducerManager);return i.operator=n,i}dispatch(n,i){if(typeof n=="function")return this.processDispatchFn(n,i);this.actionsObserver.next(n)}next(n){this.actionsObserver.next(n)}error(n){this.actionsObserver.error(n)}complete(){this.actionsObserver.complete()}addReducer(n,i){this.reducerManager.addReducer(n,i)}removeReducer(n){this.reducerManager.removeReducer(n)}processDispatchFn(n,i){VP(this.injector,"Store Injector");let r=i?.injector??YP()??this.injector;return zn(()=>{let o=n();Yc(()=>this.dispatch(o))},{injector:r})}static{this.\u0275fac=function(i){return new(i||t)(L(is),L(Gn),L(Ru),L(Mt))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),XP=[me];function Am(t,e,...n){return function(r){let o;if(typeof t=="string"){let s=[e,...n].filter(Boolean);o=r.pipe(yf(t,...s))}else if(typeof t=="function")o=r.pipe(W(s=>t(s,e)));else throw new TypeError(`Unexpected type '${typeof t}' in select operator, expected 'string' or 'function'`);return o.pipe(mf())}}function YP(){try{return w(Mt)}catch{return}}var Rm="https://ngrx.io/guide/store/configuration/runtime-checks";function OS(t){return t===void 0}function kS(t){return t===null}function qS(t){return Array.isArray(t)}function ZP(t){return typeof t=="string"}function KP(t){return typeof t=="boolean"}function JP(t){return typeof t=="number"}function XS(t){return typeof t=="object"&&t!==null}function QP(t){return XS(t)&&!qS(t)}function eL(t){if(!QP(t))return!1;let e=Object.getPrototypeOf(t);return e===Object.prototype||e===null}function Em(t){return typeof t=="function"}function tL(t){return Em(t)&&t.hasOwnProperty("\u0275cmp")}function nL(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var iL=!1;function Nm(){return iL}function FS(t,e){return t===e}function rL(t,e,n){for(let i=0;i<t.length;i++)if(!n(t[i],e[i]))return!0;return!1}function YS(t,e=FS,n=FS){let i=null,r=null,o;function s(){i=null,r=null}function a(u=void 0){o={result:u}}function l(){o=void 0}function c(){if(o!==void 0)return o.result;if(!i)return r=t.apply(null,arguments),i=arguments,r;if(!rL(arguments,i,e))return r;let u=t.apply(null,arguments);return i=arguments,n(r,u)?r:(r=u,u)}return{memoized:c,reset:s,setResult:a,clearResult:l}}function ne(...t){return sL(YS)(...t)}function oL(t,e,n,i){if(n===void 0){let o=e.map(s=>s(t));return i.memoized.apply(null,o)}let r=e.map(o=>o(t,n));return i.memoized.apply(null,[...r,n])}function sL(t,e={stateFn:oL}){return function(...n){let i=n;if(Array.isArray(i[0])){let[u,...d]=i;i=[...u,...d]}else i.length===1&&aL(i[0])&&(i=lL(i[0]));let r=i.slice(0,i.length-1),o=i[i.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),a=t(function(...u){return o.apply(null,u)}),l=YS(function(u,d){return e.stateFn.apply(null,[u,r,d,a])});function c(){l.reset(),a.reset(),s.forEach(u=>u.release())}return Object.assign(l.memoized,{release:c,projector:a.memoized,setResult:l.setResult,clearResult:l.clearResult})}}function Pm(t){return ne(e=>{let n=e[t];return!Nm()&&vr()&&!(t in e)&&console.warn(`@ngrx/store: The feature name "${t}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${t}', ...) or StoreModule.forFeature('${t}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),n},e=>e)}function aL(t){return!!t&&typeof t=="object"&&Object.values(t).every(e=>typeof e=="function")}function lL(t){let e=Object.values(t),n=Object.keys(t),i=(...r)=>n.reduce((o,s,a)=>M(y({},o),{[s]:r[a]}),{});return[...e,i]}function cL(t){return t instanceof A?w(t):t}function uL(t,e){return e.map((n,i)=>{if(t[i]instanceof A){let r=w(t[i]);return{key:n.key,reducerFactory:r.reducerFactory?r.reducerFactory:Dm,metaReducers:r.metaReducers?r.metaReducers:[],initialState:r.initialState}}return n})}function dL(t){return t.map(e=>e instanceof A?w(e):e)}function ZS(t){return typeof t=="function"?t():t}function fL(t,e){return t.concat(e)}function hL(){if(w(me,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function pL(t,e){return function(n,i){let r=e.action(i)?Cm(i):i,o=t(n,r);return e.state()?Cm(o):o}}function Cm(t){Object.freeze(t);let e=Em(t);return Object.getOwnPropertyNames(t).forEach(n=>{if(!n.startsWith("\u0275")&&nL(t,n)&&(!e||n!=="caller"&&n!=="callee"&&n!=="arguments")){let i=t[n];(XS(i)||Em(i))&&!Object.isFrozen(i)&&Cm(i)}}),t}function mL(t,e){return function(n,i){if(e.action(i)){let o=Tm(i);VS(o,"action")}let r=t(n,i);if(e.state()){let o=Tm(r);VS(o,"state")}return r}}function Tm(t,e=[]){return(OS(t)||kS(t))&&e.length===0?{path:["root"],value:t}:Object.keys(t).reduce((i,r)=>{if(i)return i;let o=t[r];return tL(o)?i:OS(o)||kS(o)||JP(o)||KP(o)||ZP(o)||qS(o)?!1:eL(o)?Tm(o,[...e,r]):{path:[...e,r],value:o}},!1)}function VS(t,e){if(t===!1)return;let n=t.path.join("."),i=new Error(`Detected unserializable ${e} at "${n}". ${Rm}#strict${e}serializability`);throw i.value=t.value,i.unserializablePath=n,i}function gL(t,e){return function(n,i){if(e.action(i)&&!Le.isInAngularZone())throw new Error(`Action '${i.type}' running outside NgZone. ${Rm}#strictactionwithinngzone`);return t(n,i)}}function vL(t){return vr()?y({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},t):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function yL({strictActionSerializability:t,strictStateSerializability:e}){return n=>t||e?mL(n,{action:i=>t&&!Lm(i),state:()=>e}):n}function _L({strictActionImmutability:t,strictStateImmutability:e}){return n=>t||e?pL(n,{action:i=>t&&!Lm(i),state:()=>e}):n}function Lm(t){return t.type.startsWith("@ngrx")}function xL({strictActionWithinNgZone:t}){return e=>t?gL(e,{action:n=>t&&!Lm(n)}):e}function bL(t){return[{provide:PS,useValue:t},{provide:NS,useFactory:SL,deps:[PS]},{provide:Er,deps:[NS],useFactory:vL},{provide:Du,multi:!0,deps:[Er],useFactory:_L},{provide:Du,multi:!0,deps:[Er],useFactory:yL},{provide:Du,multi:!0,deps:[Er],useFactory:xL}]}function KS(){return[{provide:Im,multi:!0,deps:[Er],useFactory:wL}]}function SL(t){return t}function wL(t){if(!t.strictActionTypeUniqueness)return;let e=Object.entries(Mm).filter(([,n])=>n>1).map(([n])=>n);if(e.length)throw new Error(`Action types are registered more than once, ${e.map(n=>`"${n}"`).join(", ")}. ${Rm}#strictactiontypeuniqueness`)}function Om(t,e,n={}){return Pt([...DL(t,e,n),IL])}function ML(t={},e={}){return[{provide:zS,useFactory:hL},{provide:MS,useValue:e.initialState},{provide:Wa,useFactory:ZS,deps:[MS]},{provide:Sm,useValue:t},{provide:TS,useExisting:t instanceof A?t:Sm},{provide:HS,deps:[Sm,[new Vh(TS)]],useFactory:cL},{provide:AS,useValue:e.metaReducers?e.metaReducers:[]},{provide:RS,deps:[Du,AS],useFactory:fL},{provide:ES,useValue:e.reducerFactory?e.reducerFactory:Dm},{provide:BS,deps:[ES,RS],useFactory:$S},BP,jP,GP,qP,XP,bL(e.runtimeChecks),KS()]}function EL(){w(Gn),w(Cr),w(Tr),w(me),w(zS,{optional:!0}),w(Im,{optional:!0})}var CL=[{provide:Ba,useFactory:EL},fr(()=>w(Ba))];function JS(t,e){return Pt([...ML(t,e),CL])}function TL(){w(Ba);let t=w(WS),e=w(jS),n=w(Ru);w(Im,{optional:!0});let i=t.map((r,o)=>{let a=e.shift()[o];return M(y({},r),{reducers:a,initialState:ZS(r.initialState)})});n.addFeatures(i)}var IL=[{provide:Au,useFactory:TL},fr(()=>w(Au))];function DL(t,e,n={}){return[{provide:IS,multi:!0,useValue:t instanceof Object?{}:n},{provide:CS,multi:!0,useValue:{key:t instanceof Object?t.name:t,reducerFactory:!(n instanceof A)&&n.reducerFactory?n.reducerFactory:Dm,metaReducers:!(n instanceof A)&&n.metaReducers?n.metaReducers:[],initialState:!(n instanceof A)&&n.initialState?n.initialState:void 0}},{provide:WS,deps:[IS,CS],useFactory:uL},{provide:wm,multi:!0,useValue:t instanceof Object?t.reducer:e},{provide:DS,multi:!0,useExisting:e instanceof A?e:wm},{provide:jS,multi:!0,deps:[wm,[new Vh(DS)]],useFactory:dL},KS()]}function de(...t){let e=t.pop(),n=t.map(i=>i.type);return{reducer:e,types:n}}function QS(t,...e){let n=new Map;for(let i of e)for(let r of i.types){let o=n.get(r);if(o){let s=(a,l)=>i.reducer(o(a,l),l);n.set(r,s)}else n.set(r,i.reducer)}return function(i=t,r){let o=n.get(r.type);return o?o(i,r):i}}var AL={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},Pu="__@ngrx/effects_create__";function Me(t,e={}){let n=e.functional?t:t(),i=y(y({},AL),e);return Object.defineProperty(n,Pu,{value:i}),n}function RL(t){return Object.getOwnPropertyNames(t).filter(i=>t[i]&&t[i].hasOwnProperty(Pu)?t[i][Pu].hasOwnProperty("dispatch"):!1).map(i=>{let r=t[i][Pu];return y({propertyName:i},r)})}function NL(t){return RL(t)}function ew(t){return Object.getPrototypeOf(t)}function PL(t){return!!t.constructor&&t.constructor.name!=="Object"&&t.constructor.name!=="Function"}function tw(t){return typeof t=="function"}function LL(t){return t.filter(tw)}function OL(t,e,n){let i=ew(t),o=!!i&&i.constructor.name!=="Object"?i.constructor.name:null,s=NL(t).map(({propertyName:a,dispatch:l,useEffectsErrorHandler:c})=>{let u=typeof t[a]=="function"?t[a]():t[a],d=c?n(u,e):u;return l===!1?d.pipe(hf()):d.pipe(vf()).pipe(W(f=>({effect:t[a],notification:f,propertyName:a,sourceName:o,sourceInstance:t})))});return Ki(...s)}var kL=10;function nw(t,e,n=kL){return t.pipe(Qt(i=>(e&&e.handleError(i),n<=1?t:nw(t,e,n-1))))}var Lu=(()=>{class t extends le{constructor(n){super(),n&&(this.source=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}static{this.\u0275fac=function(i){return new(i||t)(L(Tr))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function Ee(...t){return ge(e=>t.some(n=>typeof n=="string"?n===e.type:n.type===e.type))}var V$=new A("@ngrx/effects Internal Root Guard"),U$=new A("@ngrx/effects User Provided Effects"),z$=new A("@ngrx/effects Internal Root Effects"),B$=new A("@ngrx/effects Internal Root Effects Instances"),H$=new A("@ngrx/effects Internal Feature Effects"),W$=new A("@ngrx/effects Internal Feature Effects Instance Groups"),FL=new A("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>nw}),VL="@ngrx/effects/init",UL=fi(VL);function zL(t,e){if(t.notification.kind==="N"){let n=t.notification.value;!BL(n)&&e.handleError(new Error(`Effect ${HL(t)} dispatched an invalid action: ${WL(n)}`))}}function BL(t){return typeof t!="function"&&t&&t.type&&typeof t.type=="string"}function HL({propertyName:t,sourceInstance:e,sourceName:n}){let i=typeof e[t]=="function";return!!n?`"${n}.${String(t)}${i?"()":""}"`:`"${String(t)}()"`}function WL(t){try{return JSON.stringify(t)}catch{return t}}var jL="ngrxOnIdentifyEffects";function GL(t){return Fm(t,jL)}var $L="ngrxOnRunEffects";function qL(t){return Fm(t,$L)}var XL="ngrxOnInitEffects";function YL(t){return Fm(t,XL)}function Fm(t,e){return t&&e in t&&typeof t[e]=="function"}var iw=(()=>{class t extends Ae{constructor(n,i){super(),this.errorHandler=n,this.effectsErrorHandler=i}addEffects(n){this.next(n)}toActions(){return this.pipe(Gl(n=>PL(n)?ew(n):n),Ve(n=>n.pipe(Gl(ZL))),Ve(n=>{let i=n.pipe(Ji(o=>KL(this.errorHandler,this.effectsErrorHandler)(o)),W(o=>(zL(o,this.errorHandler),o.notification)),ge(o=>o.kind==="N"&&o.value!=null),pf()),r=n.pipe(Ye(1),ge(YL),W(o=>o.ngrxOnInitEffects()));return Ki(i,r)}))}static{this.\u0275fac=function(i){return new(i||t)(L(Et),L(FL))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function ZL(t){return GL(t)?t.ngrxOnIdentifyEffects():""}function KL(t,e){return n=>{let i=OL(n,t,e);return qL(n)?n.ngrxOnRunEffects(i):i}}var JL=(()=>{class t{get isStarted(){return!!this.effectsSubscription}constructor(n,i){this.effectSources=n,this.store=i,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}static{this.\u0275fac=function(i){return new(i||t)(L(iw),L(me))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function rw(...t){let e=t.flat(),n=LL(e);return Pt([n,fr(()=>{w(Ba),w(Au,{optional:!0});let i=w(JL),r=w(iw),o=!i.isStarted;o&&i.start();for(let s of e){let a=tw(s)?w(s):s;r.addEffects(a)}o&&w(me).dispatch(UL())})])}var lw="@ngrx/router-store/request",Q$=fi(lw,te()),Vm="@ngrx/router-store/navigation",e9=fi(Vm,te()),Um="@ngrx/router-store/cancel",t9=fi(Um,te()),zm="@ngrx/router-store/error",n9=fi(zm,te()),cw="@ngrx/router-store/navigated",i9=fi(cw,te());function uw(t,e){let n=e;switch(n.type){case Vm:case zm:case Um:return{state:n.payload.routerState,navigationId:n.payload.event.id};default:return t}}var Ou=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:typeof e.routeConfig.title=="string"?e.routeConfig.title:void 0}:null,queryParams:e.queryParams,fragment:e.fragment,firstChild:n[0],children:n}}},Bm=function(t){return t[t.PreActivation=1]="PreActivation",t[t.PostActivation=2]="PostActivation",t}(Bm||{}),QL="router",ow=new A("@ngrx/router-store Internal Configuration"),dw=new A("@ngrx/router-store Configuration"),Hm=function(t){return t[t.Full=0]="Full",t[t.Minimal=1]="Minimal",t}(Hm||{});function e2(t){return y({stateKey:QL,serializer:Ou,navigationActionTiming:Bm.PreActivation},t)}var ku=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,paramMap:e.paramMap,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{component:e.routeConfig.component,path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:e.routeConfig.title}:null,queryParams:e.queryParams,queryParamMap:e.queryParamMap,fragment:e.fragment,component:e.routeConfig?e.routeConfig.component:void 0,root:void 0,parent:void 0,firstChild:n[0],pathFromRoot:void 0,children:n}}},Fu=class{},$n=function(t){return t[t.NONE=1]="NONE",t[t.ROUTER=2]="ROUTER",t[t.STORE=3]="STORE",t}($n||{}),sw=(()=>{class t{constructor(n,i,r,o,s,a){this.store=n,this.router=i,this.serializer=r,this.errorHandler=o,this.config=s,this.activeRuntimeChecks=a,this.lastEvent=null,this.routerState=null,this.trigger=$n.NONE,this.stateKey=this.config.stateKey,!Nm()&&vr()&&(a?.strictActionSerializability||a?.strictStateSerializability)&&this.serializer instanceof ku&&console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer."),this.setUpStoreStateListener(),this.setUpRouterEventsListener()}setUpStoreStateListener(){this.store.pipe(Am(this.stateKey),Be(this.store)).subscribe(([n,i])=>{this.navigateIfNeeded(n,i)})}navigateIfNeeded(n,i){if(!n||!n.state||this.trigger===$n.ROUTER||this.lastEvent instanceof jn)return;let r=n.state.url;t2(this.router.url,r)||(this.storeState=i,this.trigger=$n.STORE,this.router.navigateByUrl(r).catch(o=>{this.errorHandler.handleError(o)}))}setUpRouterEventsListener(){let n=this.config.navigationActionTiming===Bm.PostActivation,i;this.router.events.pipe(Be(this.store)).subscribe(([r,o])=>{this.lastEvent=r,r instanceof jn?(this.routerState=this.serializer.serialize(this.router.routerState.snapshot),this.trigger!==$n.STORE&&(this.storeState=o,this.dispatchRouterRequest(r))):r instanceof Ni?(i=r,!n&&this.trigger!==$n.STORE&&this.dispatchRouterNavigation(r)):r instanceof on?(this.dispatchRouterCancel(r),this.reset()):r instanceof ui?(this.dispatchRouterError(r),this.reset()):r instanceof Ft&&(this.trigger!==$n.STORE&&(n&&this.dispatchRouterNavigation(i),this.dispatchRouterNavigated(r)),this.reset())})}dispatchRouterRequest(n){this.dispatchRouterAction(lw,{event:n})}dispatchRouterNavigation(n){let i=this.serializer.serialize(n.state);this.dispatchRouterAction(Vm,{routerState:i,event:new Ni(n.id,n.url,n.urlAfterRedirects,i)})}dispatchRouterCancel(n){this.dispatchRouterAction(Um,{storeState:this.storeState,event:n})}dispatchRouterError(n){this.dispatchRouterAction(zm,{storeState:this.storeState,event:new ui(n.id,n.url,`${n}`)})}dispatchRouterNavigated(n){let i=this.serializer.serialize(this.router.routerState.snapshot);this.dispatchRouterAction(cw,{event:n,routerState:i})}dispatchRouterAction(n,i){this.trigger=$n.ROUTER;try{this.store.dispatch({type:n,payload:M(y({routerState:this.routerState},i),{event:this.config.routerState===Hm.Full?i.event:{id:i.event.id,url:i.event.url,urlAfterRedirects:i.event.urlAfterRedirects}})})}finally{this.trigger=$n.NONE}}reset(){this.trigger=$n.NONE,this.storeState=null,this.routerState=null}static{this.\u0275fac=function(i){return new(i||t)(L(me),L(Yt),L(Fu),L(Et),L(dw),L(Er))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function t2(t,e){return aw(t)===aw(e)}function aw(t){return t?.length>0&&t[t.length-1]==="/"?t.substring(0,t.length-1):t}function fw(t={}){return Pt([{provide:ow,useValue:t},{provide:dw,useFactory:e2,deps:[ow]},{provide:Fu,useClass:t.serializer?t.serializer:t.routerState===Hm.Full?ku:Ou},fr(()=>w(sw)),sw])}var Ga="PERFORM_ACTION",n2="REFRESH",yw="RESET",_w="ROLLBACK",xw="COMMIT",bw="SWEEP",Sw="TOGGLE_ACTION",i2="SET_ACTIONS_ACTIVE",ww="JUMP_TO_STATE",Mw="JUMP_TO_ACTION",tg="IMPORT_STATE",Ew="LOCK_CHANGES",Cw="PAUSE_RECORDING",rs=class{constructor(e,n){if(this.action=e,this.timestamp=n,this.type=Ga,typeof e.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Wm=class{constructor(){this.type=n2}},jm=class{constructor(e){this.timestamp=e,this.type=yw}},Gm=class{constructor(e){this.timestamp=e,this.type=_w}},$m=class{constructor(e){this.timestamp=e,this.type=xw}},qm=class{constructor(){this.type=bw}},Xm=class{constructor(e){this.id=e,this.type=Sw}};var Ym=class{constructor(e){this.index=e,this.type=ww}},Zm=class{constructor(e){this.actionId=e,this.type=Mw}},Km=class{constructor(e){this.nextLiftedState=e,this.type=tg}},Jm=class{constructor(e){this.status=e,this.type=Ew}},Qm=class{constructor(e){this.status=e,this.type=Cw}};var Bu=new A("@ngrx/store-devtools Options"),hw=new A("@ngrx/store-devtools Initial Config");function Tw(){return null}var r2="NgRx Store DevTools";function o2(t){let e={maxAge:!1,monitor:Tw,actionSanitizer:void 0,stateSanitizer:void 0,name:r2,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},n=typeof t=="function"?t():t,i=n.logOnly?{pause:!0,export:!0,test:!0}:!1,r=n.features||i||e.features;r.import===!0&&(r.import="custom");let o=Object.assign({},e,{features:r},n);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function pw(t,e){return t.filter(n=>e.indexOf(n)<0)}function Iw(t){let{computedStates:e,currentStateIndex:n}=t;if(n>=e.length){let{state:r}=e[e.length-1];return r}let{state:i}=e[n];return i}function ja(t){return new rs(t,+Date.now())}function s2(t,e){return Object.keys(e).reduce((n,i)=>{let r=Number(i);return n[r]=Dw(t,e[r],r),n},{})}function Dw(t,e,n){return M(y({},e),{action:t(e.action,n)})}function a2(t,e){return e.map((n,i)=>({state:Aw(t,n.state,i),error:n.error}))}function Aw(t,e,n){return t(e,n)}function Rw(t){return t.predicate||t.actionsSafelist||t.actionsBlocklist}function l2(t,e,n,i){let r=[],o={},s=[];return t.stagedActionIds.forEach((a,l)=>{let c=t.actionsById[a];c&&(l&&ng(t.computedStates[l],c,e,n,i)||(o[a]=c,r.push(a),s.push(t.computedStates[l])))}),M(y({},t),{stagedActionIds:r,actionsById:o,computedStates:s})}function ng(t,e,n,i,r){let o=n&&!n(t,e.action),s=i&&!e.action.type.match(i.map(l=>mw(l)).join("|")),a=r&&e.action.type.match(r.map(l=>mw(l)).join("|"));return o||s||a}function mw(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Nw(t){return{ngZone:t?w(Le):null,connectInZone:t}}var Hu=(()=>{class t extends Gn{static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=mr(t)))(r||t)}})()}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),Vu={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},eg=new A("@ngrx/store-devtools Redux Devtools Extension"),Pw=(()=>{class t{constructor(n,i,r){this.config=i,this.dispatcher=r,this.zoneConfig=Nw(this.config.connectInZone),this.devtoolsExtension=n,this.createActionStreams()}notify(n,i){if(this.devtoolsExtension)if(n.type===Ga){if(i.isLocked||i.isPaused)return;let r=Iw(i);if(Rw(this.config)&&ng(r,n,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let o=this.config.stateSanitizer?Aw(this.config.stateSanitizer,r,i.currentStateIndex):r,s=this.config.actionSanitizer?Dw(this.config.actionSanitizer,n,i.nextActionId):n;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,o))}else{let r=M(y({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?s2(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?a2(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new le(n=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(r=>n.next(r)),i.unsubscribe}):We}createActionStreams(){let n=this.createChangesObservable().pipe(xf()),i=n.pipe(ge(c=>c.type===Vu.START)),r=n.pipe(ge(c=>c.type===Vu.STOP)),o=n.pipe(ge(c=>c.type===Vu.DISPATCH),W(c=>this.unwrapAction(c.payload)),At(c=>c.type===tg?this.dispatcher.pipe(ge(u=>u.type===Nu),ff(1e3),ao(1e3),W(()=>c),Qt(()=>q(c)),Ye(1)):q(c))),a=n.pipe(ge(c=>c.type===Vu.ACTION),W(c=>this.unwrapAction(c.payload))).pipe(er(r)),l=o.pipe(er(r));this.start$=i.pipe(er(r)),this.actions$=this.start$.pipe(ft(()=>a)),this.liftedActions$=this.start$.pipe(ft(()=>l))}unwrapAction(n){return typeof n=="string"?(0,eval)(`(${n})`):n}getExtensionConfig(n){let i={name:n.name,features:n.features,serialize:n.serialize,autoPause:n.autoPause??!1,trace:n.trace??!1,traceLimit:n.traceLimit??75};return n.maxAge!==!1&&(i.maxAge=n.maxAge),i}sendToReduxDevtools(n){try{n()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}static{this.\u0275fac=function(i){return new(i||t)(L(eg),L(Bu),L(Hu))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),zu={type:Ha},c2="@ngrx/store-devtools/recompute",u2={type:c2};function Lw(t,e,n,i,r){if(i)return{state:n,error:"Interrupted by an error up the chain"};let o=n,s;try{o=t(n,e)}catch(a){s=a.toString(),r.handleError(a)}return{state:o,error:s}}function Uu(t,e,n,i,r,o,s,a,l){if(e>=t.length&&t.length===o.length)return t;let c=t.slice(0,e),u=o.length-(l?1:0);for(let d=e;d<u;d++){let m=o[d],f=r[m].action,v=c[d-1],b=v?v.state:i,R=v?v.error:void 0,H=s.indexOf(m)>-1?v:Lw(n,f,b,R,a);c.push(H)}return l&&c.push(t[t.length-1]),c}function d2(t,e){return{monitorState:e(void 0,{}),nextActionId:1,actionsById:{0:ja(zu)},stagedActionIds:[0],skippedActionIds:[],committedState:t,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function f2(t,e,n,i,r={}){return o=>(s,a)=>{let{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:R,isPaused:P}=s||e;s||(c=Object.create(c));function H(F){let Y=F,he=d.slice(1,Y+1);for(let O=0;O<he.length;O++)if(b[O+1].error){Y=O,he=d.slice(1,Y+1);break}else delete c[he[O]];m=m.filter(O=>he.indexOf(O)===-1),d=[0,...d.slice(Y+1)],f=b[Y].state,b=b.slice(Y),v=v>Y?v-Y:0}function fe(){c={0:ja(zu)},u=1,d=[0],m=[],f=b[v].state,v=0,b=[]}let z=0;switch(a.type){case Ew:{R=a.status,z=1/0;break}case Cw:{P=a.status,P?(d=[...d,u],c[u]=new rs({type:"@ngrx/devtools/pause"},+Date.now()),u++,z=d.length-1,b=b.concat(b[b.length-1]),v===d.length-2&&v++,z=1/0):fe();break}case yw:{c={0:ja(zu)},u=1,d=[0],m=[],f=t,v=0,b=[];break}case xw:{fe();break}case _w:{c={0:ja(zu)},u=1,d=[0],m=[],v=0,b=[];break}case Sw:{let{id:F}=a;m.indexOf(F)===-1?m=[F,...m]:m=m.filter(he=>he!==F),z=d.indexOf(F);break}case i2:{let{start:F,end:Y,active:he}=a,O=[];for(let at=F;at<Y;at++)O.push(at);he?m=pw(m,O):m=[...m,...O],z=d.indexOf(F);break}case ww:{v=a.index,z=1/0;break}case Mw:{let F=d.indexOf(a.actionId);F!==-1&&(v=F),z=1/0;break}case bw:{d=pw(d,m),m=[],v=Math.min(v,d.length-1);break}case Ga:{if(R)return s||e;if(P||s&&ng(s.computedStates[v],a,r.predicate,r.actionsSafelist,r.actionsBlocklist)){let Y=b[b.length-1];b=[...b.slice(0,-1),Lw(o,a.action,Y.state,Y.error,n)],z=1/0;break}r.maxAge&&d.length===r.maxAge&&H(1),v===d.length-1&&v++;let F=u++;c[F]=a,d=[...d,F],z=d.length-1;break}case tg:{({monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:R,isPaused:P}=a.nextLiftedState);break}case Ha:{z=0,r.maxAge&&d.length>r.maxAge&&(b=Uu(b,z,o,f,c,d,m,n,P),H(d.length-r.maxAge),z=1/0);break}case Nu:{if(b.filter(Y=>Y.error).length>0)z=0,r.maxAge&&d.length>r.maxAge&&(b=Uu(b,z,o,f,c,d,m,n,P),H(d.length-r.maxAge),z=1/0);else{if(!P&&!R){v===d.length-1&&v++;let Y=u++;c[Y]=new rs(a,+Date.now()),d=[...d,Y],z=d.length-1,b=Uu(b,z,o,f,c,d,m,n,P)}b=b.map(Y=>M(y({},Y),{state:o(Y.state,u2)})),v=d.length-1,r.maxAge&&d.length>r.maxAge&&H(d.length-r.maxAge),z=1/0}break}default:{z=1/0;break}}return b=Uu(b,z,o,f,c,d,m,n,P),l=i(l,a),{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:R,isPaused:P}}}var gw=(()=>{class t{constructor(n,i,r,o,s,a,l,c){let u=d2(l,c.monitor),d=f2(l,u,a,c.monitor,c),m=Ki(Ki(i.asObservable().pipe(uo(1)),o.actions$).pipe(W(ja)),n,o.liftedActions$).pipe(hn(Vs)),f=r.pipe(W(d)),v=Nw(c.connectInZone),b=new ks(1);this.liftedStateSubscription=m.pipe(Be(f),vw(v),Qi(({state:H},[fe,z])=>{let F=z(H,fe);return fe.type!==Ga&&Rw(c)&&(F=l2(F,c.predicate,c.actionsSafelist,c.actionsBlocklist)),o.notify(fe,F),{state:F,action:fe}},{state:u,action:null})).subscribe(({state:H,action:fe})=>{if(b.next(H),fe.type===Ga){let z=fe.action;s.next(z)}}),this.extensionStartSubscription=o.start$.pipe(vw(v)).subscribe(()=>{this.refresh()});let R=b.asObservable(),P=R.pipe(W(Iw));Object.defineProperty(P,"state",{value:_e(P,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=n,this.liftedState=R,this.state=P}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(n){this.dispatcher.next(n)}next(n){this.dispatcher.next(n)}error(n){}complete(){}performAction(n){this.dispatch(new rs(n,+Date.now()))}refresh(){this.dispatch(new Wm)}reset(){this.dispatch(new jm(+Date.now()))}rollback(){this.dispatch(new Gm(+Date.now()))}commit(){this.dispatch(new $m(+Date.now()))}sweep(){this.dispatch(new qm)}toggleAction(n){this.dispatch(new Xm(n))}jumpToAction(n){this.dispatch(new Zm(n))}jumpToState(n){this.dispatch(new Ym(n))}importState(n){this.dispatch(new Km(n))}lockChanges(n){this.dispatch(new Jm(n))}pauseRecording(n){this.dispatch(new Qm(n))}static{this.\u0275fac=function(i){return new(i||t)(L(Hu),L(Gn),L(Cr),L(Pw),L(Tr),L(Et),L(Wa),L(Bu))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function vw({ngZone:t,connectInZone:e}){return n=>e?new le(i=>n.subscribe({next:r=>t.run(()=>i.next(r)),error:r=>t.run(()=>i.error(r)),complete:()=>t.run(()=>i.complete())})):n}var h2=new A("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function p2(t,e){return!!t||e.monitor!==Tw}function m2(){let t="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[t]<"u"?window[t]:null}function g2(t){return t.state}function Ow(t={}){return Pt([Pw,Hu,gw,{provide:hw,useValue:t},{provide:h2,deps:[eg,Bu],useFactory:p2},{provide:eg,useFactory:m2},{provide:Bu,deps:[hw],useFactory:o2},{provide:is,deps:[gw],useFactory:g2},{provide:ns,useExisting:Hu}])}var S=US({source:"Neuronal",events:{"Model Store Load Requested":tt(),"Model Store Hydrated":te(),"Epoch Store Hydrated":te(),"Active Model Id From Route Set":te(),"Active Model Id Set":te(),"Model Entry Upserted":te(),"Epoch View Sync From Model":te(),"Epoch History Cleared":te(),"Training Started":te(),"Training Epoch Appended":te(),"Training Finished":te(),"Training Stop Requested":tt(),"Training Pause Toggled":tt(),"Model Dropdown Set Open":te(),"Last Train Metrics Reset":tt(),"New Model From List Requested":tt(),"New Model From Toolbar Requested":tt(),"Active Model From Toolbar Requested":te(),"Ui Model Dropdown Toggle Requested":tt(),"Runtime Status Plain Set":te(),"Runtime Kernel Caps Updated":te(),"Train Hyperparams Patch":te(),"Ui Train Start Requested":tt(),"Ui Export Bundle Requested":tt(),"Ui Save As Requested":tt(),"Ui Reset Requested":tt(),"Ui Infer Random Requested":tt(),"Ui Infer Draw Requested":tt(),"Ui Clear Draw Requested":tt(),"Ui Epoch Preset Requested":te(),"Ui Epochs Input Changed":te(),"Ui Batch Size Input Changed":te(),"Ui Train Lr Input Changed":te(),"Ui Train Viz Every Input Changed":te(),"Ui Draw Pointer Down":te(),"Ui Draw Pointer Move":te(),"Ui Draw Pointer Up":tt(),"Ui Draw Pointer Cancel":tt(),"Ui Draw Pointer Leave":tt(),"Viz Input Layer Layout Changed":te(),"Viz Input Layer Scale Changed":te(),"Viz Hidden Layer Layout Changed":te(),"Viz Hidden Layer Scale Changed":te(),"Viz Active Neuron Max Scale Mul Changed":te(),"Viz Scene Color Changed":te(),"Viz Scene Colors Patch":te(),"Viz Light Color Changed":te(),"Viz Network Colors Patch":te(),"Viz Post Process Patch":te(),"Viz Vibe Camera Profile Changed":te(),"Viz Vibe Camera Tuning Patch":te(),"Ui Viz Immersive Toggled":tt(),"Daisy Ui App Theme Changed":te(),"Viz 3d Colors Sync From Daisy Requested":tt(),"Viz 3d Color Preset Mode Changed":te(),"Viz 3d Daisy Palette Applied":te()}});var ce=Pm("neuronal");var ig=ne(ce,t=>t.epochByModelId),kw=ne(ce,t=>t.epochDisplayRows),v2=ne(kw,t=>t),rg=ne(ce,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(a=>a.id===e):null,i=e?t.epochByModelId[e]?.length??0:0,r=Math.max(n?.metrics.epochsTrained??0,i),o=t.epochDisplayRows,s=o.length===0?[]:[...o].slice(-200).reverse();return{epochsTotal:r,rows:s}});function $a(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var os=ne(ce,t=>t.modelCollection),Ir=ne(ce,t=>t.modelStoreHydrated),Fw=ne(ce,t=>{if(!t.modelStoreHydrated)return{name:"Modelle werden geladen \u2026",meta:""};if(t.modelCollection.models.length===0)return{name:"Kein Modell",meta:"Lege ein neues Modell an"};let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{name:n.name,meta:`Epoch ${n.metrics.epochsTrained} \xB7 Test-Genauigkeit ${$a(n.metrics.testAcc)} \xB7 Fehlerrate ${$a(n.metrics.errorRate)}`}:{name:"Modell w\xE4hlen",meta:""}}),Vw=ne(ce,t=>{if(!t.modelStoreHydrated)return{phase:"loading"};if(t.modelCollection.models.length===0)return{phase:"empty"};let e=t.modelCollection.activeModelId;return{phase:"list",items:t.modelCollection.models.map(i=>({id:i.id,name:i.name,epochValue:String(i.metrics.epochsTrained),accValue:$a(i.metrics.testAcc),errValue:$a(i.metrics.errorRate),active:i.id===e})),trainingRunning:t.training.running}}),Uw=ne(ce,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0),og=ne(ce,t=>t.modelCollection.activeModelId),sg=ne(os,t=>{let e=t.activeModelId;if(!e)return null;let n=t.models.find(i=>i.id===e);return n?{title:n.name,subtitle:`MNIST \xB7 MLP \xB7 Test ${$a(n.metrics.testAcc)} \xB7 Epoche ${n.metrics.epochsTrained}`}:null}),zw=ne(ce,t=>t.modelDropdownOpen),ag=ne(Fw,Vw,zw,Uw,(t,e,n,i)=>({label:t,menu:e,dropdownOpen:n,dropdownDisabled:i}));var ss={lr:.02,batchSize:32,epochs:1,vizEveryNBatches:4};function lg(t,e,n,i){let r=Number.parseInt(t,10);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function y2(t,e,n,i){let r=Number.parseFloat(t);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function Dr(t,e){let n=y(y({},t),e);return{epochs:lg(String(n.epochs),ss.epochs,1,200),lr:y2(String(n.lr),ss.lr,1e-4,1),batchSize:lg(String(n.batchSize),ss.batchSize,1,512),vizEveryNBatches:lg(String(n.vizEveryNBatches),ss.vizEveryNBatches,1,1e3)}}function Bw(t,e){let n=e.batchSize,i=e.epochs,r=t;if(r<=0)return"Sobald Trainingsdaten geladen sind, erscheint hier die ungef\xE4hre Anzahl Gradientenschritte.";let o=Math.max(1,Math.ceil(r/n)),s=o*i;return`Bei Batchgr\xF6\xDFe ${n}: rund ${o} Schritte pro Epoche, etwa ${s} f\xFCr ${i} Epoche(n).`}var Wu="MNIST";function Hw(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function _2(t){let e=new Date(t);return Number.isFinite(e.getTime())?e.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}var cg=ne(ce,t=>t.runtimeStatusPlain),ug=ne(ce,t=>{let e=t.runtimeKernelCaps.mnistTrainCount,n=t.runtimeKernelCaps.mnistTestCount;return e===0&&n===0?`${Wu}: Train 0 \xB7 Test 0 \u2014 warten auf erfolgreichen Abruf (Statuszeile).`:e===0?`${Wu}: Trainingsdaten fehlen \xB7 Test ${n}.`:n===0?`${Wu}: Train ${e} \xB7 Testdaten fehlen.`:`${Wu}: ${e} Train-Bilder \xB7 ${n} Test-Bilder bereit.`}),dg=ne(ce,t=>{if(!t.runtimeKernelCaps.hasNet)return"Noch kein Netz geladen";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?n.name:"Netz im Arbeitsspeicher"}),fg=ne(ce,t=>{if(!t.runtimeKernelCaps.hasNet)return"Oben \u201AAktives Modell\u2018 w\xE4hlen \u2014 oder \u201ETraining starten\u201C ohne vorherigen Stand legt automatisch einen ersten Stand an.";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?`Test ${Hw(n.metrics.testAcc)} \xB7 Fehlerquote ${Hw(n.metrics.errorRate)} \xB7 ${n.metrics.epochsTrained} trainierte Epochen (Summe) \xB7 zuletzt ${_2(n.updatedAt)}`:"Kein passender Eintrag in der Bibliothek gefunden."}),hg=ne(ce,t=>Bw(t.runtimeKernelCaps.mnistTrainCount,t.trainHyperparams)),pg=ne(ce,t=>t.trainHyperparams),x2=ne(ce,t=>t.runtimeKernelCaps),mg=ne(ce,t=>{let e=t.training.running,n=t.runtimeKernelCaps.mnistTrainCount,i=t.runtimeKernelCaps.hasNet;return{trainDisabled:n<=0||e,pauseDisabled:!e,saveDisabled:!i||e,resetDisabled:!i||e,trainFormLocked:e}}),gg=ne(ce,t=>{let e=t.training.running,n=t.runtimeKernelCaps.hasNet,i=t.runtimeKernelCaps.mnistTestCount;return{inferRandomDisabled:!n||i<=0,carouselDisabled:!n||i<=0||e,inferDrawDisabled:!n}}),vg=ne(ce,t=>t.training.running||!t.modelStoreHydrated);var b2=ne(ce,t=>t.training),S2=ne(ce,t=>t.lastTrainLoss),w2=ne(ce,t=>t.lastTrainBatchAcc),M2=ne(ce,t=>t.training.pause),E2=ne(ce,t=>t.training.shouldStop),hi=ne(ce,t=>t.training.running),yg=ne(ce,t=>({running:t.training.running,pause:t.training.pause,lastTrainLoss:t.lastTrainLoss,lastTrainBatchAcc:t.lastTrainBatchAcc}));function C2(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var _g=ne(ce,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{headline:n.name,detail:`${n.metrics.epochsTrained} Epochen gesamt \xB7 Test ${C2(n.metrics.testAcc)}`}:{headline:"Kein aktives Modell",detail:"Zuerst ein Modell w\xE4hlen oder anlegen."}});var xg={followPath:"Pfad folgen",freeLook:"Frei bewegen"},bg={random:"Zuf\xE4llige Farben",themeGradient:"Theme-Verlauf"},Sg={primary:"Primary",accent:"Accent",secondary:"Secondary",info:"Info"},He={profileMode:"balanced",controlMode:"freeLook",speed:50,pullOut:.5,pathWildness:.5,pathTraverse:.45,lookWander:.5,pathQueueSize:100,maxSegmentChord:40,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16,pathHorizonRadiusScale:1,pathHorizonSpherePreview:!1,pathPreviewColorMode:"random",pathPreviewThemeColor:"primary"},Ww={smooth:M(y({},He),{speed:25,pullOut:.4,pathWildness:.2,pathTraverse:.15,lookWander:.3,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),balanced:M(y({},He),{speed:50,pullOut:.5,pathWildness:.5,pathTraverse:.45,lookWander:.5,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),funky:M(y({},He),{speed:55,pullOut:.52,pathWildness:.75,pathTraverse:.72,lookWander:.7,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),rocket:M(y({},He),{speed:100,pullOut:.38,pathWildness:.65,pathTraverse:.58,lookWander:.55,pathQueueSize:6,maxSegmentChord:14,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.14})},wg={smooth:"Ruhig",balanced:"Ausgewogen",funky:"Funky",rocket:"Rakete"},Mg=.2,Eg=3;var ju=t=>t<0?0:t>1?1:t,T2=t=>Math.min(100,Math.max(0,t));var I2=1,D2=1e3,A2=2,R2=80;var N2=.04,P2=.8,L2=t=>Math.min(Eg,Math.max(Mg,t)),O2=t=>Math.round(Math.min(D2,Math.max(I2,t))),k2=t=>Math.min(R2,Math.max(A2,t)),F2=t=>Math.min(P2,Math.max(N2,t));function gt(t){let e=t??{},n=e.controlMode??He.controlMode;return{profileMode:e.profileMode??He.profileMode,controlMode:n==="freeLook"?"freeLook":"followPath",speed:T2(e.speed??He.speed),pullOut:ju(e.pullOut??He.pullOut),pathWildness:ju(e.pathWildness??He.pathWildness),pathTraverse:ju(e.pathTraverse??He.pathTraverse),lookWander:ju(e.lookWander??He.lookWander),pathQueueSize:O2(e.pathQueueSize??He.pathQueueSize),maxSegmentChord:k2(e.maxSegmentChord??He.maxSegmentChord),pathPreview:e.pathPreview??He.pathPreview,pathPreviewMarkers:e.pathPreviewMarkers??He.pathPreviewMarkers,pathPreviewMarkerSize:F2(e.pathPreviewMarkerSize??He.pathPreviewMarkerSize),pathHorizonRadiusScale:L2(e.pathHorizonRadiusScale??He.pathHorizonRadiusScale),pathHorizonSpherePreview:e.pathHorizonSpherePreview??He.pathHorizonSpherePreview,pathPreviewColorMode:e.pathPreviewColorMode==="themeGradient"?"themeGradient":He.pathPreviewColorMode,pathPreviewThemeColor:e.pathPreviewThemeColor==="accent"||e.pathPreviewThemeColor==="secondary"||e.pathPreviewThemeColor==="info"?e.pathPreviewThemeColor:He.pathPreviewThemeColor}}function Gu(t){return gt(y({profileMode:t},Ww[t]))}function jw(t,e){let n=Ww[t],i=.6,r=(o,s)=>Math.abs(o-s)<i;return e.controlMode===n.controlMode&&r(e.speed,n.speed)&&r(e.pullOut,n.pullOut)&&r(e.pathWildness,n.pathWildness)&&r(e.pathTraverse,n.pathTraverse)&&r(e.lookWander,n.lookWander)&&e.pathQueueSize===n.pathQueueSize&&r(e.maxSegmentChord,n.maxSegmentChord)&&e.pathPreview===n.pathPreview&&e.pathPreviewMarkers===n.pathPreviewMarkers&&r(e.pathPreviewMarkerSize,n.pathPreviewMarkerSize)&&r(e.pathHorizonRadiusScale,n.pathHorizonRadiusScale)&&e.pathHorizonSpherePreview===n.pathHorizonSpherePreview&&e.pathPreviewColorMode===n.pathPreviewColorMode&&e.pathPreviewThemeColor===n.pathPreviewThemeColor}var Cg=ne(ce,t=>t.viz3d),Tg=ne(ce,t=>gt(t.viz3d.vibeCamera)),qa=ne(ce,t=>t.vizImmersiveUi);var wn=ne(ce,t=>t);var $u=class t{store=w(me);newModelDisabled=_e(this.store.select(vg),{requireSync:!0});newModel(){this.store.dispatch(S.newModelFromToolbarRequested())}exportJson(){this.store.dispatch(S.uiExportBundleRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-neuronal-model-bar"]],decls:12,vars:1,consts:[[1,"flex","min-w-0","flex-col","gap-1.5"],[1,"flex","min-w-0","flex-wrap","items-stretch","gap-2"],["id","btnNewModel","type","button",1,"btn","btn-accent","btn-sm","min-w-0","flex-1","whitespace-normal","sm:btn-md","sm:flex-none","sm:whitespace-nowrap",3,"click","disabled"],[1,"sm:hidden"],[1,"hidden","sm:inline"],["id","btnExportJson","type","button",1,"btn","btn-outline","btn-sm","min-w-0","flex-1","sm:btn-md","sm:flex-none",3,"click"]],template:function(n,i){n&1&&(h(0,"div",0)(1,"div",1)(2,"button",2),C("click",function(){return i.newModel()}),h(3,"span",3),x(4,"Neues Modell"),p(),h(5,"span",4),x(6,"Neues Modell starten"),p()(),h(7,"button",5),C("click",function(){return i.exportJson()}),h(8,"span",3),x(9,"Export"),p(),h(10,"span",4),x(11,"JSON exportieren"),p()()()()),n&2&&(_(2),N("disabled",i.newModelDisabled()))},encapsulation:2,changeDetection:0})};var Gw="neuronal3d-daisyui-theme",pi="dark",Li=["light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","dim","nord","sunset","caramellatte","abyss","silk"];function qn(t){return Li.includes(t)}function $w(t){let e=t.document;try{let n=t.localStorage.getItem(Gw);if(n&&qn(n)){e.documentElement.setAttribute("data-theme",n);return}}catch{}e.documentElement.setAttribute("data-theme",pi)}function Ar(t){let e=t.documentElement.getAttribute("data-theme")??pi;return qn(e)?e:pi}function qu(t,e){t.documentElement.setAttribute("data-theme",e);try{localStorage.setItem(Gw,e)}catch{}}function V2(t,e){if(t&1&&(h(0,"option",3),x(1),p()),t&2){let n=e.$implicit,i=E();N("value",n)("selected",n===i.currentTheme()),_(),we(n)}}var Xu=class t{doc=w(Ge);destroyRef=w(rn);store=w(me);themes=Li;currentTheme=Ie(Ar(this.doc));constructor(){let e=new MutationObserver(()=>{this.currentTheme.set(Ar(this.doc))});e.observe(this.doc.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.destroyRef.onDestroy(()=>e.disconnect())}onThemePick(e){let i=e.target.value;qn(i)&&(qu(this.doc,i),this.store.dispatch(S.daisyUiAppThemeChanged({theme:i})))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-theme-switcher"]],decls:6,vars:0,consts:[[1,"flex","flex-wrap","items-center","justify-end","gap-2"],[1,"text-[0.65rem]","font-semibold","uppercase","tracking-widest","opacity-70"],[1,"select","select-bordered","select-sm","max-w-[11.5rem]","text-sm",3,"change"],[3,"value","selected"]],template:function(n,i){n&1&&(h(0,"label",0)(1,"span",1),x(2,"Theme"),p(),h(3,"select",2),C("change",function(o){return i.onThemePick(o)}),Ze(4,V2,2,3,"option",3,Ii),p()()),n&2&&(_(4),Ke(i.themes))},encapsulation:2,changeDetection:0})};var U2=(t,e)=>e.id;function z2(t,e){t&1&&(h(0,"option",7),x(1,"Modelle werden geladen \u2026"),p())}function B2(t,e){t&1&&(h(0,"option",7),x(1,"Keine Modelle vorhanden"),p())}function H2(t,e){t&1&&(h(0,"option",7),x(1,"Modell w\xE4hlen"),p())}function W2(t,e){if(t&1&&(h(0,"option",10),x(1),p()),t&2){let n=e.$implicit;N("value",n.id),_(),ma(" ",n.name," \xB7 Ep. ",n.epochValue," \xB7 Test ",n.accValue," ")}}function j2(t,e){if(t&1&&(Ue(0,H2,2,0,"option",7),Ze(1,W2,2,4,"option",10,U2)),t&2){let n=E();ze(n.activeModelId()?-1:0),_(),Ke(n.listMenuItems())}}var Yu=class t{store=w(me);modelBar=_e(this.store.select(ag),{requireSync:!0});activeModelId=_e(this.store.select(og),{initialValue:null});listMenuItems=mt(()=>{let e=this.modelBar().menu;return e.phase==="list"?e.items:[]});selectedModelIdValue(){return this.activeModelId()??""}onModelSelectChange(e){let i=e.target.value;i&&this.store.dispatch(S.activeModelFromToolbarRequested({id:i}))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-shell-header"]],decls:15,vars:3,consts:[[1,"border-base-200","bg-base-100","flex","flex-wrap","items-center","justify-between","gap-2","border-b","px-3","py-2","shadow-sm","sm:gap-3","sm:px-4"],["aria-label","Brotkr\xFCmel",1,"breadcrumbs","min-w-0","flex","w-full","flex-col","gap-2","text-sm","sm:w-auto","sm:flex-row","sm:items-center","sm:gap-3"],[1,"flex","min-w-0","flex-wrap","items-center","gap-2"],[1,"shrink-0"],["routerLink","/",1,"link-hover","link","text-lg","font-medium","sm:text-2xl"],[1,"min-w-0","max-w-full","flex-1","sm:max-w-md","sm:flex-none"],["aria-label","Aktives Modell",1,"select","select-bordered","select-sm","w-full","min-w-0","max-w-full","sm:select-md","sm:min-w-40",3,"change","disabled","value"],["disabled","","value",""],[1,"min-w-0","w-full","sm:w-auto"],[1,"flex","w-full","shrink-0","items-center","justify-end","gap-2","sm:w-auto"],[3,"value"]],template:function(n,i){if(n&1&&(h(0,"header",0)(1,"nav",1)(2,"ul",2)(3,"li",3)(4,"a",4),x(5,"Modelle"),p()(),h(6,"li",5)(7,"select",6),C("change",function(o){return i.onModelSelectChange(o)}),Ue(8,z2,2,0,"option",7)(9,B2,2,0,"option",7)(10,j2,3,1),p()()(),h(11,"div",8),be(12,"app-neuronal-model-bar"),p()(),h(13,"div",9),be(14,"app-theme-switcher"),p()()),n&2){let r;_(7),N("disabled",i.modelBar().dropdownDisabled)("value",i.selectedModelIdValue()),_(),ze((r=i.modelBar().menu.phase)==="loading"?8:r==="empty"?9:r==="list"?10:-1)}},dependencies:[ts,Xu,$u],encapsulation:2,changeDetection:0})};var Zu=class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-shell"]],decls:4,vars:0,consts:[[1,"bg-base-100","text-base-content","flex","h-full","min-h-dvh","min-h-0","flex-col"],[1,"flex","min-h-0","flex-1","flex-col"]],template:function(n,i){n&1&&(h(0,"div",0),be(1,"app-shell-header"),h(2,"div",1),be(3,"router-outlet"),p()())},dependencies:[Mr,Yu],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"],changeDetection:0})};function Tt(t,e){let n=[];for(let i=0;i<t;i++){let r=new Array(e).fill(0);n.push(r)}return n}function Xa(t){let e=Tt(t.length,1);for(let n=0;n<t.length;n++)e[n][0]=t[n];return e}function Ya(t,e){let n=t.length,i=t[0].length,r=e.length,o=e[0].length;if(i!==r)throw new Error("matMul shape");let s=Tt(n,o);for(let a=0;a<n;a++)for(let l=0;l<i;l++){let c=t[a][l];for(let u=0;u<o;u++)s[a][u]+=c*e[l][u]}return s}function Ig(t,e){let n=Tt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]*e;return n}function Ku(t){let e=Tt(t[0].length,t.length);for(let n=0;n<t.length;n++)for(let i=0;i<t[0].length;i++)e[i][n]=t[n][i];return e}function Dg(t,e,n){let i=Ya(e,t);for(let r=0;r<i.length;r++){let o=n[r][0];for(let s=0;s<i[0].length;s++)i[r][s]+=o}return i}function Ag(t){let e=Tt(t.length,1);for(let n=0;n<t.length;n++){let i=0;for(let r=0;r<t[0].length;r++)i+=t[n][r];e[n][0]=i}return e}function Rg(t,e){let n=new Array(t.length);for(let i=0;i<t.length;i++)n[i]=t[i][e];return n}function Ng(t,e,n){for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++){let o=Number.isFinite(e[i][r])?e[i][r]:0,s=Math.max(-100,Math.min(100,o)),a=t[i][r]-n*s;Number.isFinite(a)&&(t[i][r]=Math.max(-1e4,Math.min(1e4,a)))}}function qw(t,e,n){let i=Tt(t,e);for(let r=0;r<t;r++)for(let o=0;o<e;o++)i[r][o]=G2()*n;return i}function G2(){let t=0,e=0;for(;t===0;)t=Math.random();for(;e===0;)e=Math.random();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*e)}function Xw(t,e=.01){let n=Tt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?t[i][r]:e*t[i][r];return n}function Yw(t,e=.01){let n=Tt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?1:e;return n}function Zw(t){let e=t.length,n=t[0].length,i=Tt(e,n);for(let r=0;r<n;r++){let o=-1/0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0;c>o&&(o=c)}Number.isFinite(o)||(o=0);let s=new Array(e),a=0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0,u=Math.max(-60,Math.min(60,c-o)),d=Math.exp(u);s[l]=d,a+=d}if(!Number.isFinite(a)||a<=0){let l=1/Math.max(1,e);for(let c=0;c<e;c++)i[c][r]=l}else for(let l=0;l<e;l++)i[l][r]=s[l]/a}return i}function Kw(t,e){let n=Tt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]-e[i][r];return n}var mi=class{inputDim;hidden;outputDim;weights;biases;constructor(e,n,i){this.inputDim=e,this.hidden=[...n],this.outputDim=i;let r=[e,...n,i];this.weights=[],this.biases=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],l=Math.sqrt(2/Math.max(1,s));this.weights.push(qw(a,s,l)),this.biases.push(Tt(a,1))}}forward(e){let n=[],i=e;for(let a=0;a<this.weights.length-1;a++){let l=Dg(i,this.weights[a],this.biases[a]),c=Xw(l);n.push({z:l,a:c}),i=c}let r=this.weights.length-1,o=Dg(i,this.weights[r],this.biases[r]),s=Zw(o);return n.push({z:o,a:s}),{layers:n,logits:o,prob:s}}crossEntropyLoss(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)for(let s=0;s<e.length;s++){let a=Math.max(e[s][o],1e-12);r-=n[s][o]*Math.log(a)}return r/i}backward(e,n,i){let r=this.weights.map(c=>Tt(c.length,c[0].length)),o=this.biases.map(c=>Tt(c.length,c[0].length)),s=this.weights.length-1,a=Kw(i.prob,n),l=s===0?e:i.layers[s-1].a;r[s]=Ya(a,Ku(l)),o[s]=Ag(a);for(let c=s-1;c>=0;c--){a=Ya(Ku(this.weights[c+1]),a);let u=Yw(i.layers[c].z);for(let d=0;d<a.length;d++)for(let m=0;m<a[0].length;m++)a[d][m]*=u[d][m];l=c===0?e:i.layers[c-1].a,r[c]=Ya(a,Ku(l)),o[c]=Ag(a)}return{dW:r,db:o}}applyGradients(e,n,i,r){let o=1/r;for(let s=0;s<this.weights.length;s++)Ng(this.weights[s],Ig(e[s],o),i),Ng(this.biases[s],Ig(n[s],o),i)}predictClass(e,n=0){let i=0,r=e[0][n];for(let o=1;o<e.length;o++){let s=e[o][n];s>r&&(r=s,i=o)}return i}countCorrectInBatch(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)this.predictClass(e,o)===n[o]&&(r+=1);return r}};function Jw(t,e,n=0){let i=[Rg(t,n)];for(let r of e.layers)i.push(Rg(r.a,n));return i}function Za(){if(typeof crypto?.randomUUID=="function")return crypto.randomUUID();let t=new Uint8Array(16);crypto.getRandomValues(t),t[6]=t[6]&15|64,t[8]=t[8]&63|128;let e=Array.from(t,n=>n.toString(16).padStart(2,"0")).join("");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20)}`}var Rr=[64,32],Ju=784,Qu=10;function $2(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}function q2(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function ed(){let t=new mi(Ju,[...Rr],Qu),e=new Date().toISOString();return{id:Za(),name:$2(),createdAt:e,updatedAt:e,model:q2(t),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}}var X2="neuronal3d:epochTrack:v1";function Qw(){try{localStorage.removeItem(X2)}catch{}}var Y2="neuronal3d";var ct="models",nt="epochTracks",Vt="meta",Ka="activeModelId",eM="dataRevision";var td=null;function Z2(t){return X(this,null,function*(){let n=t.transaction(Vt,"readonly").objectStore(Vt),i=yield Re(n.get(eM));if(i?.value==null||i.value==="")return 0;let r=Number(i.value);return Number.isFinite(r)?r:0})}function tM(){return X(this,null,function*(){let t=yield ut();if((yield Z2(t))===2)return;let n=t.transaction([ct,nt,Vt],"readwrite");yield Re(n.objectStore(ct).clear()),yield Re(n.objectStore(nt).clear());let i=n.objectStore(Vt);yield Re(i.clear()),yield Re(i.put({key:Ka,value:null})),yield Re(i.put({key:eM,value:String(2)})),yield Nr(n)})}function ut(){return td||(td=new Promise((t,e)=>{let n=indexedDB.open(Y2,4);n.onerror=()=>e(n.error??new Error("IndexedDB open failed")),n.onsuccess=()=>{let i=n.result;i.onversionchange=()=>{i.close(),td=null},t(i)},n.onupgradeneeded=i=>{let r=n.result;if(i.oldVersion<4)for(let o of[ct,nt,Vt])r.objectStoreNames.contains(o)&&r.deleteObjectStore(o);r.objectStoreNames.contains(ct)||r.createObjectStore(ct,{keyPath:"id"}),r.objectStoreNames.contains(nt)||r.createObjectStore(nt,{keyPath:"modelId"}),r.objectStoreNames.contains(Vt)||r.createObjectStore(Vt,{keyPath:"key"})}})),td}function Re(t){return new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function Nr(t){return new Promise((e,n)=>{t.addEventListener("complete",()=>e()),t.addEventListener("error",()=>n(t.error??new Error("IndexedDB transaction failed"))),t.addEventListener("abort",()=>n(t.error??new Error("IndexedDB transaction aborted")))})}var Pr=class t{getEpochsForModel(e){return X(this,null,function*(){let r=(yield ut()).transaction(nt,"readonly").objectStore(nt);return(yield Re(r.get(e)))?.rows??[]})}setEpochsForModel(e,n){return X(this,null,function*(){let r=(yield ut()).transaction(nt,"readwrite"),o=r.objectStore(nt);yield Re(o.put({modelId:e,rows:n})),yield Nr(r)})}appendEpoch(e,n){return X(this,null,function*(){let i=yield this.getEpochsForModel(e);i.push(n);let r=i.slice(-500);yield this.setEpochsForModel(e,r)})}deleteEpochTrack(e){return X(this,null,function*(){let i=(yield ut()).transaction(nt,"readwrite"),r=i.objectStore(nt);yield Re(r.delete(e)),yield Nr(i)})}listModelIdsWithEpochTracks(){return X(this,null,function*(){let i=(yield ut()).transaction(nt,"readonly").objectStore(nt);return(yield Re(i.getAllKeys())).map(o=>String(o))})}epochTrackCount(){return X(this,null,function*(){let i=(yield ut()).transaction(nt,"readonly").objectStore(nt);return Re(i.count())})}loadEpochStore(){return X(this,null,function*(){let i=(yield ut()).transaction(nt,"readonly").objectStore(nt),r=yield Re(i.getAll()),o={};for(let s of r)o[s.modelId]=[...s.rows];return{version:1,byModelId:o}})}saveEpochStore(e){return X(this,null,function*(){let i=(yield ut()).transaction(nt,"readwrite"),r=i.objectStore(nt),o=yield Re(r.getAllKeys()),s=new Set(Object.keys(e.byModelId));for(let a of o){let l=String(a);s.has(l)||(yield Re(r.delete(a)))}for(let[a,l]of Object.entries(e.byModelId))yield Re(r.put({modelId:a,rows:l}));yield Nr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};var gi=class t{listModels(){return X(this,null,function*(){let i=(yield ut()).transaction(ct,"readonly").objectStore(ct);return Re(i.getAll())})}getModel(e){return X(this,null,function*(){let r=(yield ut()).transaction(ct,"readonly").objectStore(ct);return(yield Re(r.get(e)))??void 0})}upsertModel(e){return X(this,null,function*(){let r=(yield ut()).transaction(ct,"readwrite").objectStore(ct);yield Re(r.put(e))})}deleteModel(e){return X(this,null,function*(){let r=(yield ut()).transaction(ct,"readwrite").objectStore(ct);yield Re(r.delete(e))})}modelCount(){return X(this,null,function*(){let i=(yield ut()).transaction(ct,"readonly").objectStore(ct);return Re(i.count())})}getActiveModelId(){return X(this,null,function*(){let i=(yield ut()).transaction(Vt,"readonly").objectStore(Vt);return(yield Re(i.get(Ka)))?.value??null})}setActiveModelId(e){return X(this,null,function*(){let r=(yield ut()).transaction(Vt,"readwrite").objectStore(Vt);yield Re(r.put({key:Ka,value:e}))})}loadCollection(){return X(this,null,function*(){let[e,n]=yield Promise.all([this.listModels(),this.getActiveModelId()]);return{version:3,activeModelId:n,models:e}})}saveCollection(e){return X(this,null,function*(){let i=(yield ut()).transaction([ct,Vt],"readwrite"),r=i.objectStore(ct),o=i.objectStore(Vt),s=yield Re(r.getAllKeys()),a=new Set(e.models.map(l=>l.id));for(let l of s){let c=String(l);a.has(c)||(yield Re(r.delete(l)))}for(let l of e.models)yield Re(r.put(l));yield Re(o.put({key:Ka,value:e.activeModelId})),yield Nr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};function as(){return typeof window>"u"?!1:window.matchMedia("(max-width: 1023px)").matches||window.matchMedia("(pointer: coarse)").matches}function Pg(){return as()?1:2}var K2=150,J2=48;function nM(){return as()?K2:J2}function Lg(){return as()?{bloomEnabled:!1,fxaaEnabled:!1}:{}}function id(){return!as()}var iM=33,rM=500;var Oi={backgroundFog:"#2a3140",floor:"#3d4658",floorVisible:!1,fogNear:12,fogFar:120},Q2=.5,eO=80,tO=5,oM=200,sM=1;function Lr(t,e){let n=y({},t);typeof e.backgroundFog=="string"&&It(e.backgroundFog)&&(n.backgroundFog=e.backgroundFog),typeof e.floor=="string"&&It(e.floor)&&(n.floor=e.floor),typeof e.floorVisible=="boolean"&&(n.floorVisible=e.floorVisible);let i=e.fogNear;typeof i=="number"&&Number.isFinite(i)&&(n.fogNear=Math.min(eO,Math.max(Q2,i)));let r=e.fogFar;return typeof r=="number"&&Number.isFinite(r)&&(n.fogFar=Math.min(oM,Math.max(tO,r))),n.fogFar<=n.fogNear+sM&&(n.fogFar=Math.min(oM,n.fogNear+sM)),n}var Or={hemiSky:"#d6e2ff",hemiGround:"#4b5668",ambient:"#ffffff",key:"#fff7ef",fill:"#aec3ff",rim:"#9df0ff",backAccent:"#5fd3ff"};function It(t){return typeof t=="string"&&/^#[0-9A-Fa-f]{6}$/.test(t)}function ls(t){if(!It(t))return 0;let e=parseInt(t.slice(1),16),n=s=>{let a=s/255;return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},i=n(e>>16&255),r=n(e>>8&255),o=n(e&255);return .2126*i+.7152*r+.0722*o}var kr={neuronEmissive:"#2a6bff",neuronEmissiveIntensityActive:1.9,neuronEmissiveIntensityIdle:.28,neuronHiddenCold:"#1f59cc",neuronHiddenHot:"#5eccff",neuronInputCold:"#1f59cc",neuronInputHot:"#ffffff",neuronOutputCold:"#3373d9",neuronOutputHot:"#99d9ff",edgePositiveCold:"#40240f",edgePositiveHot:"#ffb83a",edgeNegativeCold:"#0f3852",edgeNegativeHot:"#57b3ff",edgeInferMuted:"#0d1217",edgeTrainRecent:"#f29e2e"},vi={bloomEnabled:!0,bloomStrength:.55,bloomRadius:.45,bloomThreshold:.22,fxaaEnabled:!0,toneMappingExposure:1.35},aM=["neuronEmissive","neuronHiddenCold","neuronHiddenHot","neuronInputCold","neuronInputHot","neuronOutputCold","neuronOutputHot","edgePositiveCold","edgePositiveHot","edgeNegativeCold","edgeNegativeHot","edgeInferMuted","edgeTrainRecent"];function lM(t){for(let e of aM)if(typeof t[e]=="string")return!0;return!1}function Fr(t,e){let n=y({},t);for(let o of aM){let s=e[o];typeof s=="string"&&It(s)&&(n[o]=s)}let i=e.neuronEmissiveIntensityActive;typeof i=="number"&&Number.isFinite(i)&&(n.neuronEmissiveIntensityActive=Math.min(4,Math.max(.05,i)));let r=e.neuronEmissiveIntensityIdle;return typeof r=="number"&&Number.isFinite(r)&&(n.neuronEmissiveIntensityIdle=Math.min(2,Math.max(0,r))),n}function ki(t,e){let n=y({},t);typeof e.bloomEnabled=="boolean"&&(n.bloomEnabled=e.bloomEnabled),typeof e.fxaaEnabled=="boolean"&&(n.fxaaEnabled=e.fxaaEnabled);let i=e.bloomStrength;typeof i=="number"&&Number.isFinite(i)&&(n.bloomStrength=Math.min(3,Math.max(0,i)));let r=e.bloomRadius;typeof r=="number"&&Number.isFinite(r)&&(n.bloomRadius=Math.min(1,Math.max(0,r)));let o=e.bloomThreshold;typeof o=="number"&&Number.isFinite(o)&&(n.bloomThreshold=Math.min(1,Math.max(0,o)));let s=e.toneMappingExposure;return typeof s=="number"&&Number.isFinite(s)&&(n.toneMappingExposure=Math.min(3,Math.max(.2,s))),n}var rd=[784,64,32,10],Og=[...Rr],cM=150,kg=typeof globalThis.location<"u"&&new URLSearchParams(globalThis.location.search).has("vizdebug"),uM="data/csv/mnist_train.csv.gz",dM="data/csv/mnist_test.csv.gz",Vr="MNIST",Qe=28,fM=1,hM=7,od=320;function nO(t){let e=t.split(","),n=[];for(let i of e){let r=i.trim();r.length!==0&&n.push(Number(r))}return n}function iO(t){let e=nO(t);if(e.length!==785)return null;let n=e[0];if(!Number.isFinite(n))return null;let i=Math.round(n);if(!Number.isInteger(i)||i<0||i>9)return null;let r=e.slice(1,785);if(r.some(s=>!Number.isFinite(s)))return null;let o=r.map(s=>Math.max(0,Math.min(1,s/255)));return{label:i,pixels:o}}var rO=200;function Fg(){let t=globalThis;return typeof t.scheduler?.yield=="function"?t.scheduler.yield():new Promise(e=>{setTimeout(e,0)})}function Vg(t){return X(this,null,function*(){let e=yield fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);let n=yield e.arrayBuffer(),i=new Uint8Array(n);if(i.length>=2&&i[0]===31&&i[1]===139){let r=new DecompressionStream("gzip");return yield new Response(new Blob([n]).stream().pipeThrough(r)).text()}return new TextDecoder().decode(n)})}function Ug(t){return X(this,null,function*(){let e=t.split(/\r?\n/).filter(i=>i.trim().length>0);if(e.length===0)return[];let n=[];for(let i=0;i<e.length;i++){let r=iO(e[i]);r&&n.push(r),i>0&&(i+1)%rO===0&&(yield Fg())}return n})}var sn=28,zg=sn*sn;function sd(t,e){if(e.length!==zg)return;let n=t.getContext("2d");if(!n)return;let i=t.width,r=t.height,o=n.createImageData(sn,sn),s=o.data;for(let c=0;c<sn;c++)for(let u=0;u<sn;u++){let d=Math.round(Math.max(0,Math.min(1,e[c*sn+u]))*255),m=(c*sn+u)*4;s[m]=d,s[m+1]=d,s[m+2]=d,s[m+3]=255}if(n.fillStyle="#000000",n.fillRect(0,0,i,r),i===sn&&r===sn){n.putImageData(o,0,0);return}let a=document.createElement("canvas");a.width=sn,a.height=sn;let l=a.getContext("2d");l&&(l.putImageData(o,0,0),n.imageSmoothingEnabled=!1,n.drawImage(a,0,0,i,r))}function Bg(t,e){return X(this,null,function*(){if(e.length===0)return null;let n=0,i=0;for(let o=0;o<e.length;o++){let s=e[o],a=Xa(s.pixels),l=t.forward(a),c=new Array(10).fill(0);c[s.label]=1,n+=t.crossEntropyLoss(l.prob,Xa(c)),t.predictClass(l.prob)===s.label&&(i+=1),o>0&&o%cM===0&&(yield Fg())}let r=i/e.length;return{accuracy:r,errorRate:1-r,loss:n/e.length}})}var g={surfaceVizMount:null,surfaceDrawCanvas:null,ctx2d:null,appStore:null,reconcileWorkspaceUrlForModelSelection:void 0,nLatest:null,net:null,net3d:null,inferWorkerHost:null,inferCounter:0,lastInferSampleIndex:-1,lastInferActsDebug:null,drawing:!1,liveCanvasInferRaf:null,liveInferLastRun:0,drawLastCell:null,drawLastSoftPoint:null,drawSoftIsPen:!0,drawInk:"#ffffff",drawBrushChebR:0,renderSceneBound:()=>{},renderDisplayBound:()=>{},disposeSceneBound:null,stopAnimCleanup:null};var ad=4,pM="pixels";function Hg(){return Math.min(6,Math.max(0,ad-1))}function mM(){return Math.min(6,Hg()+1)}function ld(){return .52+ad*.11}function Wg(t){pM=t,g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null}function cs(){return pM}function jg(t){let e=Math.round(Number(t));Number.isFinite(e)&&(ad=Math.min(hM,Math.max(fM,e)))}function Gg(){return ad}function $g(){g.ctx2d.shadowBlur=0,g.ctx2d.shadowColor="transparent"}function Xn(){$g(),g.ctx2d.globalCompositeOperation="source-over",g.ctx2d.globalAlpha=1}function qg(){return Math.min(g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height)}function oO(){return Math.max(2,36*qg()/od)*ld()}function sO(){return Math.max(2.2,42*qg()/od)*ld()}function aO(){return Math.max(.3,2.5*qg()/od)/Math.sqrt(ld())}function Xg(t,e){g.ctx2d.globalCompositeOperation="source-over",g.ctx2d.globalAlpha=1,$g();let n=oO(),i=g.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.1,"rgba(255,255,255,1)"),i.addColorStop(.22,"rgba(255,255,255,0.88)"),i.addColorStop(.38,"rgba(255,255,255,0.55)"),i.addColorStop(.55,"rgba(255,255,255,0.32)"),i.addColorStop(.72,"rgba(255,255,255,0.14)"),i.addColorStop(.88,"rgba(255,255,255,0.05)"),i.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=i,g.ctx2d.beginPath(),g.ctx2d.arc(t,e,n,0,Math.PI*2),g.ctx2d.fill()}function Yg(t,e){$g(),g.ctx2d.globalAlpha=1;let n=sO();g.ctx2d.globalCompositeOperation="destination-out";let i=g.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,0.94)"),i.addColorStop(.22,"rgba(255,255,255,0.55)"),i.addColorStop(.48,"rgba(255,255,255,0.22)"),i.addColorStop(.72,"rgba(255,255,255,0.08)"),i.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=i,g.ctx2d.beginPath(),g.ctx2d.arc(t,e,n,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.globalCompositeOperation="source-over"}function gM(t,e,n,i,r){let o=n-t,s=i-e,a=Math.hypot(o,s),l=aO(),c=Math.max(1,Math.ceil(a/l));for(let u=0;u<=c;u++){let d=u/c,m=t+o*d,f=e+s*d;r?Xg(m,f):Yg(m,f)}}function vM(){let t=g.surfaceDrawCanvas.width,e=g.surfaceDrawCanvas.height;return{cellW:t/Qe,cellH:e/Qe}}function Ja(t){let e=g.surfaceDrawCanvas.getBoundingClientRect(),n=g.surfaceDrawCanvas.width/e.width,i=g.surfaceDrawCanvas.height/e.height;return{x:(t.clientX-e.left)*n,y:(t.clientY-e.top)*i}}function Zg(t){let{cellW:e,cellH:n}=vM();return{gx:Math.max(0,Math.min(Qe-1,Math.floor(t.x/e))),gy:Math.max(0,Math.min(Qe-1,Math.floor(t.y/n)))}}function lO(t,e,n){Xn();let{cellW:i,cellH:r}=vM(),o=t*i,s=e*r,a=Math.ceil(i),l=Math.ceil(r),c=o+i*.5,u=s+r*.5,d=Math.max(i,r),m=Math.hypot(i,r)*.505,f=d*2.18;if(n==="#000000"||n.toLowerCase()==="#000000"){g.ctx2d.globalCompositeOperation="destination-out",g.ctx2d.fillStyle="rgba(255,255,255,1)",g.ctx2d.fillRect(o,s,a,l);let b=g.ctx2d.createRadialGradient(c,u,m,c,u,f*1.06);b.addColorStop(0,"rgba(255,255,255,0)"),b.addColorStop(.08,"rgba(255,255,255,0.38)"),b.addColorStop(.26,"rgba(255,255,255,0.2)"),b.addColorStop(.48,"rgba(255,255,255,0.1)"),b.addColorStop(.72,"rgba(255,255,255,0.04)"),b.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=b,g.ctx2d.beginPath(),g.ctx2d.arc(c,u,f*1.06,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.globalCompositeOperation="source-over"}else{g.ctx2d.fillStyle="#ffffff",g.ctx2d.fillRect(o,s,a,l);let b=g.ctx2d.createRadialGradient(c,u,m,c,u,f);b.addColorStop(0,"rgba(255,255,255,0)"),b.addColorStop(.06,"rgba(255,255,255,0.38)"),b.addColorStop(.18,"rgba(255,255,255,0.24)"),b.addColorStop(.35,"rgba(255,255,255,0.14)"),b.addColorStop(.55,"rgba(255,255,255,0.07)"),b.addColorStop(.78,"rgba(255,255,255,0.03)"),b.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=b,g.ctx2d.beginPath(),g.ctx2d.arc(c,u,f,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.fillStyle="#ffffff",g.ctx2d.fillRect(o,s,a,l)}}function Kg(t,e,n,i){for(let r=-n;r<=n;r++)for(let o=-n;o<=n;o++){let s=t+o,a=e+r;s>=0&&s<Qe&&a>=0&&a<Qe&&lO(s,a,i)}}function yM(t,e,n,i,r,o){let s=t,a=e,l=Math.abs(n-t),c=Math.abs(i-e),u=t<n?1:-1,d=e<i?1:-1,m=l-c;for(;Kg(s,a,r,o),!(s===n&&a===i);){let f=2*m;f>-c&&(m-=c,s+=u),f<l&&(m+=l,a+=d)}}var Qa=[],_M=[];function Jg(){return Qa.length}function Ur(t){if(!Number.isFinite(t))return null;let e=Math.floor(t);return e<0||e>=Qa.length?null:Qa[e]}function Yn(){return Qa}function Mn(){return _M}function el(t,e){Qa=t,_M=e}function Ne(t){g.appStore.dispatch(S.runtimeStatusPlainSet({plain:t}))}function yi(){let t=Yn(),e=Mn();g.appStore.dispatch(S.runtimeKernelCapsUpdated({caps:{hasNet:g.net!==null,mnistTrainCount:t.length,mnistTestCount:e.length}}))}function xM(t){g.nLatest.modelDropdownOpen!==t&&g.appStore.dispatch(S.modelDropdownSetOpen({open:t}))}function Qg(t){g.appStore.dispatch(S.epochViewSyncFromModel({modelId:t??""}))}function bM(t){g.appStore.dispatch(S.epochHistoryCleared({modelId:t}))}function us(t){g.appStore.dispatch(S.modelEntryUpserted({entry:t}))}function SM(){let t=g.nLatest.trainHyperparams;return{lr:t.lr,batchSize:t.batchSize,epochs:t.epochs,vizEveryNBatches:t.vizEveryNBatches}}function wM(t,e){let n=e[t]??[];if(n.length===0)return 1;let i=0;for(let r of n)i=Math.max(i,r.run);return i+1}function _i(t,e){return String(t).padStart(e," ")}function tl(t,e,n){return t.toFixed(n).padStart(e," ")}function ev(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function tv(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}var HM="170";var MM=0,EM=1,CM=2,TM=3,IM=4,DM=5,AM=6,RM=7;var pd=2300,lv=2301,nv=2302,NM=2400,PM=2401,LM=2402;var cO="",Cn="srgb",WM="srgb-linear",jM="linear",cv="srgb";var E7=Math.PI/180,C7=180/Math.PI;function zi(t,e,n){return Math.max(e,Math.min(n,t))}function uO(t,e){return(t%e+e)%e}function iv(t,e,n){return(1-n)*t+n*e}var Wr=class t{constructor(e=0,n=0){t.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(zi(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xe=class t{constructor(e,n,i,r,o,s,a,l,c){t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,o,s,a,l,c)}set(e,n,i,r,o,s,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=o,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],m=i[2],f=i[5],v=i[8],b=r[0],R=r[3],P=r[6],H=r[1],fe=r[4],z=r[7],F=r[2],Y=r[5],he=r[8];return o[0]=s*b+a*H+l*F,o[3]=s*R+a*fe+l*Y,o[6]=s*P+a*z+l*he,o[1]=c*b+u*H+d*F,o[4]=c*R+u*fe+d*Y,o[7]=c*P+u*z+d*he,o[2]=m*b+f*H+v*F,o[5]=m*R+f*fe+v*Y,o[8]=m*P+f*z+v*he,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*s*u-n*a*c-i*o*u+i*a*l+r*o*c-r*s*l}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,m=a*l-u*o,f=c*o-s*l,v=n*d+i*m+r*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return e[0]=d*b,e[1]=(r*c-u*i)*b,e[2]=(a*i-r*s)*b,e[3]=m*b,e[4]=(u*n-r*l)*b,e[5]=(r*o-a*n)*b,e[6]=f*b,e[7]=(i*l-c*n)*b,e[8]=(s*n-i*o)*b,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,o,s,a){let l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+e,-r*c,r*l,-r*(-c*s+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(rv.makeScale(e,n)),this}rotate(e){return this.premultiply(rv.makeRotation(-e)),this}translate(e,n){return this.premultiply(rv.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},rv=new xe;var an={enabled:!0,workingColorSpace:WM,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===cv&&(t.r=ms(t.r),t.g=ms(t.g),t.b=ms(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===cv&&(t.r=gs(t.r),t.g=gs(t.g),t.b=gs(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===cO?jM:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function ms(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function gs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}var OM=[.64,.33,.3,.6,.15,.06],kM=[.2126,.7152,.0722],FM=[.3127,.329],VM=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),UM=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);an.define({[WM]:{primaries:OM,whitePoint:FM,transfer:jM,toXYZ:VM,fromXYZ:UM,luminanceCoefficients:kM,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:OM,whitePoint:FM,transfer:cv,toXYZ:VM,fromXYZ:UM,luminanceCoefficients:kM,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}});var md=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,o,s,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],m=o[s+0],f=o[s+1],v=o[s+2],b=o[s+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=m,e[n+1]=f,e[n+2]=v,e[n+3]=b;return}if(d!==b||l!==m||c!==f||u!==v){let R=1-a,P=l*m+c*f+u*v+d*b,H=P>=0?1:-1,fe=1-P*P;if(fe>Number.EPSILON){let F=Math.sqrt(fe),Y=Math.atan2(F,P*H);R=Math.sin(R*Y)/F,a=Math.sin(a*Y)/F}let z=a*H;if(l=l*R+m*z,c=c*R+f*z,u=u*R+v*z,d=d*R+b*z,R===1-a){let F=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=F,c*=F,u*=F,d*=F}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,o,s){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=o[s],m=o[s+1],f=o[s+2],v=o[s+3];return e[n]=a*v+u*d+l*f-c*m,e[n+1]=l*v+u*m+c*d-a*f,e[n+2]=c*v+u*f+a*m-l*d,e[n+3]=u*v-a*d-l*m-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(o/2),m=l(i/2),f=l(r/2),v=l(o/2);switch(s){case"XYZ":this._x=m*u*d+c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d-m*f*v;break;case"YXZ":this._x=m*u*d+c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d+m*f*v;break;case"ZXY":this._x=m*u*d-c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d-m*f*v;break;case"ZYX":this._x=m*u*d-c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d+m*f*v;break;case"YZX":this._x=m*u*d+c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d-m*f*v;break;case"XZY":this._x=m*u*d-c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d+m*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],o=n[8],s=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],m=i+a+d;if(m>0){let f=.5/Math.sqrt(m+1);this._w=.25/f,this._x=(u-l)*f,this._y=(o-c)*f,this._z=(s-r)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(o+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(o-c)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(s-r)/f,this._x=(o+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zi(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,o=e._z,s=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+s*a+r*c-o*l,this._y=r*u+s*l+o*a-i*c,this._z=o*u+s*c+i*l-r*a,this._w=s*u-i*a-r*l-o*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-n;return this._w=f*s+n*this._w,this._x=f*i+n*this._x,this._y=f*r+n*this._y,this._z=f*o+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,m=Math.sin(n*u)/c;return this._w=s*d+this._w*m,this._x=i*d+this._x*m,this._y=r*d+this._y*m,this._z=o*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(n),o*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ye=class t{constructor(e=0,n=0,i=0){t.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(zM.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(zM.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[3]*i+o[6]*r,this.y=o[1]*n+o[4]*i+o[7]*r,this.z=o[2]*n+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*n+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*n+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*n+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*n+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*r-a*i),u=2*(a*n-o*r),d=2*(o*i-s*n);return this.x=n+l*c+s*d-a*u,this.y=i+l*u+a*c-o*d,this.z=r+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r,this.y=o[1]*n+o[5]*i+o[9]*r,this.z=o[2]*n+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,o=e.z,s=n.x,a=n.y,l=n.z;return this.x=r*l-o*a,this.y=o*s-i*l,this.z=i*a-r*s,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ov.copy(this).projectOnVector(e),this.sub(ov)}reflect(e){return this.sub(ov.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(zi(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ov=new ye,zM=new md,vs=class{constructor(e=new ye(1/0,1/0,1/0),n=new ye(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(En.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(En.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){let i=En.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(n===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,En):En.fromBufferAttribute(o,s),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cd.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cd.copy(i.boundingBox)),cd.applyMatrix4(e.matrixWorld),this.union(cd)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nl),ud.subVectors(this.max,nl),ds.subVectors(e.a,nl),fs.subVectors(e.b,nl),hs.subVectors(e.c,nl),Fi.subVectors(fs,ds),Vi.subVectors(hs,fs),zr.subVectors(ds,hs);let n=[0,-Fi.z,Fi.y,0,-Vi.z,Vi.y,0,-zr.z,zr.y,Fi.z,0,-Fi.x,Vi.z,0,-Vi.x,zr.z,0,-zr.x,-Fi.y,Fi.x,0,-Vi.y,Vi.x,0,-zr.y,zr.x,0];return!sv(n,ds,fs,hs,ud)||(n=[1,0,0,0,1,0,0,0,1],!sv(n,ds,fs,hs,ud))?!1:(dd.crossVectors(Fi,Vi),n=[dd.x,dd.y,dd.z],sv(n,ds,fs,hs,ud))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},xi=[new ye,new ye,new ye,new ye,new ye,new ye,new ye,new ye],En=new ye,cd=new vs,ds=new ye,fs=new ye,hs=new ye,Fi=new ye,Vi=new ye,zr=new ye,nl=new ye,ud=new ye,dd=new ye,Br=new ye;function sv(t,e,n,i,r){for(let o=0,s=t.length-3;o<=s;o+=3){Br.fromArray(t,o);let a=r.x*Math.abs(Br.x)+r.y*Math.abs(Br.y)+r.z*Math.abs(Br.z),l=e.dot(Br),c=n.dot(Br),u=i.dot(Br);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var GM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},fd={h:0,s:0,l:0};function av(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}var it=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,an.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=an.workingColorSpace){return this.r=e,this.g=n,this.b=i,an.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=an.workingColorSpace){if(e=uO(e,1),n=zi(n,0,1),i=zi(i,0,1),n===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+n):i+n-i*n,s=2*i-o;this.r=av(s,o,e+1/3),this.g=av(s,o,e),this.b=av(s,o,e-1/3)}return an.toWorkingColorSpace(this,r),this}setStyle(e,n=Cn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,n);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,n);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(o,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Cn){let i=GM[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}copyLinearToSRGB(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return an.fromWorkingColorSpace(St.copy(this),e),Math.round(zi(St.r*255,0,255))*65536+Math.round(zi(St.g*255,0,255))*256+Math.round(zi(St.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=an.workingColorSpace){an.fromWorkingColorSpace(St.copy(this),n);let i=St.r,r=St.g,o=St.b,s=Math.max(i,r,o),a=Math.min(i,r,o),l,c,u=(a+s)/2;if(a===s)l=0,c=0;else{let d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case i:l=(r-o)/d+(r<o?6:0);break;case r:l=(o-i)/d+2;break;case o:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=an.workingColorSpace){return an.fromWorkingColorSpace(St.copy(this),n),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Cn){an.fromWorkingColorSpace(St.copy(this),e);let n=St.r,i=St.g,r=St.b;return e!==Cn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+n,Ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ui),e.getHSL(fd);let i=iv(Ui.h,fd.h,n),r=iv(Ui.s,fd.s,n),o=iv(Ui.l,fd.l,n);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*n+o[3]*i+o[6]*r,this.g=o[1]*n+o[4]*i+o[7]*r,this.b=o[2]*n+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},St=new it;it.NAMES=GM;function dO(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Ut(t){let e={};for(let n=0;n<t.length;n++){let i=dO(t[n]);for(let r in i)e[r]=i[r]}return e}var fO=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hO=`#ifdef USE_ALPHAHASH
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
#endif`,pO=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mO=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gO=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vO=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yO=`#ifdef USE_AOMAP
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
#endif`,_O=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xO=`#ifdef USE_BATCHING
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
#endif`,bO=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,SO=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wO=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,MO=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,EO=`#ifdef USE_IRIDESCENCE
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
#endif`,CO=`#ifdef USE_BUMPMAP
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
#endif`,TO=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,IO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,DO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,AO=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RO=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,NO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,PO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,LO=`#if defined( USE_COLOR_ALPHA )
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
#endif`,OO=`#define PI 3.141592653589793
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
} // validated`,kO=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,FO=`vec3 transformedNormal = objectNormal;
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
#endif`,VO=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,UO=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zO=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,BO=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,HO="gl_FragColor = linearToOutputTexel( gl_FragColor );",WO=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jO=`#ifdef USE_ENVMAP
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
#endif`,GO=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$O=`#ifdef USE_ENVMAP
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
#endif`,qO=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XO=`#ifdef USE_ENVMAP
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
#endif`,YO=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ZO=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,KO=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,JO=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QO=`#ifdef USE_GRADIENTMAP
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
}`,ek=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tk=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nk=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ik=`uniform bool receiveShadow;
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
#endif`,rk=`#ifdef USE_ENVMAP
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
#endif`,ok=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sk=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ak=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lk=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ck=`PhysicalMaterial material;
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
#endif`,uk=`struct PhysicalMaterial {
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
}`,dk=`
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
#endif`,fk=`#if defined( RE_IndirectDiffuse )
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
#endif`,hk=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pk=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mk=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gk=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vk=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yk=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_k=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xk=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bk=`#if defined( USE_POINTS_UV )
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
#endif`,Sk=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wk=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mk=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ek=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ck=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tk=`#ifdef USE_MORPHTARGETS
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
#endif`,Ik=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dk=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ak=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rk=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nk=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pk=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lk=`#ifdef USE_NORMALMAP
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
#endif`,Ok=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kk=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fk=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vk=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uk=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zk=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bk=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hk=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wk=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jk=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gk=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$k=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qk=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xk=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yk=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zk=`float getShadowMask() {
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
}`,Kk=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jk=`#ifdef USE_SKINNING
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
#endif`,Qk=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eF=`#ifdef USE_SKINNING
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
#endif`,tF=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nF=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iF=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rF=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,oF=`#ifdef USE_TRANSMISSION
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
#endif`,sF=`#ifdef USE_TRANSMISSION
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
#endif`,aF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uF=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dF=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fF=`uniform sampler2D t2D;
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
}`,hF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pF=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gF=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vF=`#include <common>
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
}`,yF=`#if DEPTH_PACKING == 3200
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
}`,_F=`#define DISTANCE
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
}`,xF=`#define DISTANCE
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
}`,bF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,SF=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wF=`uniform float scale;
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
}`,MF=`uniform vec3 diffuse;
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
}`,EF=`#include <common>
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
}`,CF=`uniform vec3 diffuse;
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
}`,TF=`#define LAMBERT
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
}`,IF=`#define LAMBERT
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
}`,DF=`#define MATCAP
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
}`,AF=`#define MATCAP
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
}`,RF=`#define NORMAL
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
}`,NF=`#define NORMAL
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
}`,PF=`#define PHONG
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
}`,LF=`#define PHONG
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
}`,OF=`#define STANDARD
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
}`,kF=`#define STANDARD
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
}`,FF=`#define TOON
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
}`,VF=`#define TOON
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
}`,UF=`uniform float size;
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
}`,zF=`uniform vec3 diffuse;
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
}`,BF=`#include <common>
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
}`,HF=`uniform vec3 color;
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
}`,WF=`uniform float rotation;
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
}`,jF=`uniform vec3 diffuse;
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
}`,ve={alphahash_fragment:fO,alphahash_pars_fragment:hO,alphamap_fragment:pO,alphamap_pars_fragment:mO,alphatest_fragment:gO,alphatest_pars_fragment:vO,aomap_fragment:yO,aomap_pars_fragment:_O,batching_pars_vertex:xO,batching_vertex:bO,begin_vertex:SO,beginnormal_vertex:wO,bsdfs:MO,iridescence_fragment:EO,bumpmap_pars_fragment:CO,clipping_planes_fragment:TO,clipping_planes_pars_fragment:IO,clipping_planes_pars_vertex:DO,clipping_planes_vertex:AO,color_fragment:RO,color_pars_fragment:NO,color_pars_vertex:PO,color_vertex:LO,common:OO,cube_uv_reflection_fragment:kO,defaultnormal_vertex:FO,displacementmap_pars_vertex:VO,displacementmap_vertex:UO,emissivemap_fragment:zO,emissivemap_pars_fragment:BO,colorspace_fragment:HO,colorspace_pars_fragment:WO,envmap_fragment:jO,envmap_common_pars_fragment:GO,envmap_pars_fragment:$O,envmap_pars_vertex:qO,envmap_physical_pars_fragment:rk,envmap_vertex:XO,fog_vertex:YO,fog_pars_vertex:ZO,fog_fragment:KO,fog_pars_fragment:JO,gradientmap_pars_fragment:QO,lightmap_pars_fragment:ek,lights_lambert_fragment:tk,lights_lambert_pars_fragment:nk,lights_pars_begin:ik,lights_toon_fragment:ok,lights_toon_pars_fragment:sk,lights_phong_fragment:ak,lights_phong_pars_fragment:lk,lights_physical_fragment:ck,lights_physical_pars_fragment:uk,lights_fragment_begin:dk,lights_fragment_maps:fk,lights_fragment_end:hk,logdepthbuf_fragment:pk,logdepthbuf_pars_fragment:mk,logdepthbuf_pars_vertex:gk,logdepthbuf_vertex:vk,map_fragment:yk,map_pars_fragment:_k,map_particle_fragment:xk,map_particle_pars_fragment:bk,metalnessmap_fragment:Sk,metalnessmap_pars_fragment:wk,morphinstance_vertex:Mk,morphcolor_vertex:Ek,morphnormal_vertex:Ck,morphtarget_pars_vertex:Tk,morphtarget_vertex:Ik,normal_fragment_begin:Dk,normal_fragment_maps:Ak,normal_pars_fragment:Rk,normal_pars_vertex:Nk,normal_vertex:Pk,normalmap_pars_fragment:Lk,clearcoat_normal_fragment_begin:Ok,clearcoat_normal_fragment_maps:kk,clearcoat_pars_fragment:Fk,iridescence_pars_fragment:Vk,opaque_fragment:Uk,packing:zk,premultiplied_alpha_fragment:Bk,project_vertex:Hk,dithering_fragment:Wk,dithering_pars_fragment:jk,roughnessmap_fragment:Gk,roughnessmap_pars_fragment:$k,shadowmap_pars_fragment:qk,shadowmap_pars_vertex:Xk,shadowmap_vertex:Yk,shadowmask_pars_fragment:Zk,skinbase_vertex:Kk,skinning_pars_vertex:Jk,skinning_vertex:Qk,skinnormal_vertex:eF,specularmap_fragment:tF,specularmap_pars_fragment:nF,tonemapping_fragment:iF,tonemapping_pars_fragment:rF,transmission_fragment:oF,transmission_pars_fragment:sF,uv_pars_fragment:aF,uv_pars_vertex:lF,uv_vertex:cF,worldpos_vertex:uF,background_vert:dF,background_frag:fF,backgroundCube_vert:hF,backgroundCube_frag:pF,cube_vert:mF,cube_frag:gF,depth_vert:vF,depth_frag:yF,distanceRGBA_vert:_F,distanceRGBA_frag:xF,equirect_vert:bF,equirect_frag:SF,linedashed_vert:wF,linedashed_frag:MF,meshbasic_vert:EF,meshbasic_frag:CF,meshlambert_vert:TF,meshlambert_frag:IF,meshmatcap_vert:DF,meshmatcap_frag:AF,meshnormal_vert:RF,meshnormal_frag:NF,meshphong_vert:PF,meshphong_frag:LF,meshphysical_vert:OF,meshphysical_frag:kF,meshtoon_vert:FF,meshtoon_frag:VF,points_vert:UF,points_frag:zF,shadow_vert:BF,shadow_frag:HF,sprite_vert:WF,sprite_frag:jF},V={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Wr(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Wr(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},BM={basic:{uniforms:Ut([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.fog]),vertexShader:ve.meshbasic_vert,fragmentShader:ve.meshbasic_frag},lambert:{uniforms:Ut([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new it(0)}}]),vertexShader:ve.meshlambert_vert,fragmentShader:ve.meshlambert_frag},phong:{uniforms:Ut([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:ve.meshphong_vert,fragmentShader:ve.meshphong_frag},standard:{uniforms:Ut([V.common,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.roughnessmap,V.metalnessmap,V.fog,V.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag},toon:{uniforms:Ut([V.common,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.gradientmap,V.fog,V.lights,{emissive:{value:new it(0)}}]),vertexShader:ve.meshtoon_vert,fragmentShader:ve.meshtoon_frag},matcap:{uniforms:Ut([V.common,V.bumpmap,V.normalmap,V.displacementmap,V.fog,{matcap:{value:null}}]),vertexShader:ve.meshmatcap_vert,fragmentShader:ve.meshmatcap_frag},points:{uniforms:Ut([V.points,V.fog]),vertexShader:ve.points_vert,fragmentShader:ve.points_frag},dashed:{uniforms:Ut([V.common,V.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ve.linedashed_vert,fragmentShader:ve.linedashed_frag},depth:{uniforms:Ut([V.common,V.displacementmap]),vertexShader:ve.depth_vert,fragmentShader:ve.depth_frag},normal:{uniforms:Ut([V.common,V.bumpmap,V.normalmap,V.displacementmap,{opacity:{value:1}}]),vertexShader:ve.meshnormal_vert,fragmentShader:ve.meshnormal_frag},sprite:{uniforms:Ut([V.sprite,V.fog]),vertexShader:ve.sprite_vert,fragmentShader:ve.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ve.background_vert,fragmentShader:ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:ve.backgroundCube_vert,fragmentShader:ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ve.cube_vert,fragmentShader:ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ve.equirect_vert,fragmentShader:ve.equirect_frag},distanceRGBA:{uniforms:Ut([V.common,V.displacementmap,{referencePosition:{value:new ye},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ve.distanceRGBA_vert,fragmentShader:ve.distanceRGBA_frag},shadow:{uniforms:Ut([V.lights,V.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:ve.shadow_vert,fragmentShader:ve.shadow_frag}};BM.physical={uniforms:Ut([BM.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Wr(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Wr},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Wr},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag};var Hr=(1+Math.sqrt(5))/2,ps=1/Hr,T7=[new ye(-Hr,ps,0),new ye(Hr,ps,0),new ye(-ps,0,Hr),new ye(ps,0,Hr),new ye(0,Hr,-ps),new ye(0,Hr,ps),new ye(-1,1,-1),new ye(1,1,-1),new ye(-1,1,1),new ye(1,1,1)];var I7=new Float32Array(16),D7=new Float32Array(9),A7=new Float32Array(4);var R7={[MM]:EM,[CM]:AM,[IM]:RM,[TM]:DM,[EM]:MM,[AM]:CM,[RM]:IM,[DM]:TM};function hd(t,e,n){return!t||!n&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function GF(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}var ys=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],o=n[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<o)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=n[++i],e<r)break t}s=n.length;break n}if(!(e>=o)){let a=n[1];e<a&&(i=2,o=a);for(let l=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=o,o=n[--i-1],e>=o)break t}s=i,i=0;break n}break e}for(;i<s;){let a=i+s>>>1;e<n[a]?s=a:i=a+1}if(r=n[i],o=n[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)n[s]=i[o+s];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},uv=class extends ys{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:NM,endingEnd:NM}}intervalChanged_(e,n,i){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],l=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case PM:o=e,a=2*n-i;break;case LM:o=r.length-2,a=n+r[o]-r[o+1];break;default:o=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case PM:s=e,l=2*i-n;break;case LM:s=1,l=i+r[1]-r[0];break;default:s=e-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-a),this._weightNext=c/(l-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,m=this._weightPrev,f=this._weightNext,v=(i-n)/(r-n),b=v*v,R=b*v,P=-m*R+2*m*b-m*v,H=(1+m)*R+(-1.5-2*m)*b+(-.5+m)*v+1,fe=(-1-f)*R+(1.5+f)*b+.5*v,z=f*R-f*b;for(let F=0;F!==a;++F)o[F]=P*s[u+F]+H*s[c+F]+fe*s[l+F]+z*s[d+F];return o}},dv=class extends ys{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-n)/(r-n),d=1-u;for(let m=0;m!==a;++m)o[m]=s[c+m]*d+s[l+m]*u;return o}},fv=class extends ys{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Tn=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=hd(n,this.TimeBufferType),this.values=hd(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:hd(e.times,Array),values:hd(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new fv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case pd:n=this.InterpolantFactoryMethodDiscrete;break;case lv:n=this.InterpolantFactoryMethodLinear;break;case nv:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pd;case this.InterpolantFactoryMethodLinear:return lv;case this.InterpolantFactoryMethodSmooth:return nv}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<e;)++o;for(;s!==-1&&i[s]>n;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),e=!1;break}s=l}if(r!==void 0&&GF(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===nv,o=e.length-1,s=1;for(let a=1;a<o;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,m=d-i,f=d+i;for(let v=0;v!==i;++v){let b=n[d+v];if(b!==n[m+v]||b!==n[f+v]){l=!0;break}}}if(l){if(a!==s){e[s]=e[a];let d=a*i,m=s*i;for(let f=0;f!==i;++f)n[m+f]=n[d+f]}++s}}if(o>0){e[s]=e[o];for(let a=o*i,l=s*i,c=0;c!==i;++c)n[l+c]=n[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=n.slice(0,s*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=lv;var jr=class extends Tn{constructor(e,n,i){super(e,n,i)}};jr.prototype.ValueTypeName="bool";jr.prototype.ValueBufferType=Array;jr.prototype.DefaultInterpolation=pd;jr.prototype.InterpolantFactoryMethodLinear=void 0;jr.prototype.InterpolantFactoryMethodSmooth=void 0;var hv=class extends Tn{};hv.prototype.ValueTypeName="color";var pv=class extends Tn{};pv.prototype.ValueTypeName="number";var mv=class extends ys{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(i-n)/(r-n),c=e*a;for(let u=c+a;c!==u;c+=4)md.slerpFlat(o,0,s,c-a,s,c,l);return o}},gd=class extends Tn{InterpolantFactoryMethodLinear(e){return new mv(this.times,this.values,this.getValueSize(),e)}};gd.prototype.ValueTypeName="quaternion";gd.prototype.InterpolantFactoryMethodSmooth=void 0;var Gr=class extends Tn{constructor(e,n,i){super(e,n,i)}};Gr.prototype.ValueTypeName="string";Gr.prototype.ValueBufferType=Array;Gr.prototype.DefaultInterpolation=pd;Gr.prototype.InterpolantFactoryMethodLinear=void 0;Gr.prototype.InterpolantFactoryMethodSmooth=void 0;var gv=class extends Tn{};gv.prototype.ValueTypeName="vector";var yv="\\[\\]\\.:\\/",$F=new RegExp("["+yv+"]","g"),_v="[^"+yv+"]",qF="[^"+yv.replace("\\.","")+"]",XF=/((?:WC+[\/:])*)/.source.replace("WC",_v),YF=/(WCOD+)?/.source.replace("WCOD",qF),ZF=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_v),KF=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_v),JF=new RegExp("^"+XF+YF+ZF+KF+"$"),QF=["material","materials","bones","map"],vv=class{constructor(e,n,i){let r=i||et.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},et=(()=>{class t{constructor(n,i,r){this.path=i,this.parsedPath=r||t.parseTrackName(i),this.node=t.findNode(n,this.parsedPath.nodeName),this.rootNode=n,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(n,i,r){return n&&n.isAnimationObjectGroup?new t.Composite(n,i,r):new t(n,i,r)}static sanitizeNodeName(n){return n.replace(/\s/g,"_").replace($F,"")}static parseTrackName(n){let i=JF.exec(n);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+n);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},o=r.nodeName&&r.nodeName.lastIndexOf(".");if(o!==void 0&&o!==-1){let s=r.nodeName.substring(o+1);QF.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,o),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+n);return r}static findNode(n,i){if(i===void 0||i===""||i==="."||i===-1||i===n.name||i===n.uuid)return n;if(n.skeleton){let r=n.skeleton.getBoneByName(i);if(r!==void 0)return r}if(n.children){let r=function(s){for(let a=0;a<s.length;a++){let l=s[a];if(l.name===i||l.uuid===i)return l;let c=r(l.children);if(c)return c}return null},o=r(n.children);if(o)return o}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(n,i){n[i]=this.targetObject[this.propertyName]}_getValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)n[i++]=r[o]}_getValue_arrayElement(n,i){n[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(n,i){this.resolvedProperty.toArray(n,i)}_setValue_direct(n,i){this.targetObject[this.propertyName]=n[i]}_setValue_direct_setNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++]}_setValue_array_setNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(n,i){this.resolvedProperty[this.propertyIndex]=n[i]}_setValue_arrayElement_setNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(n,i){this.resolvedProperty.fromArray(n,i)}_setValue_fromArray_setNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(n,i){this.bind(),this.getValue(n,i)}_setValue_unbound(n,i){this.bind(),this.setValue(n,i)}bind(){let n=this.node,i=this.parsedPath,r=i.objectName,o=i.propertyName,s=i.propertyIndex;if(n||(n=t.findNode(this.rootNode,i.nodeName),this.node=n),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!n){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}n=n.material.materials;break;case"bones":if(!n.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}n=n.skeleton.bones;for(let d=0;d<n.length;d++)if(n[d].name===u){u=d;break}break;case"map":if("map"in n){n=n.map;break}if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}n=n.material.map;break;default:if(n[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}n=n[r]}if(u!==void 0){if(n[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,n);return}n=n[u]}}let a=n[o];if(a===void 0){let u=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+o+" but it wasn't found.",n);return}let l=this.Versioning.None;this.targetObject=n,n.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:n.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(o==="morphTargetInfluences"){if(!n.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!n.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}n.morphTargetDictionary[s]!==void 0&&(s=n.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=o;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return t.Composite=vv,t})();et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};et.prototype.GetterByBindingType=[et.prototype._getValue_direct,et.prototype._getValue_array,et.prototype._getValue_arrayElement,et.prototype._getValue_toArray];et.prototype.SetterByBindingTypeAndVersioning=[[et.prototype._setValue_direct,et.prototype._setValue_direct_setNeedsUpdate,et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[et.prototype._setValue_array,et.prototype._setValue_array_setNeedsUpdate,et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[et.prototype._setValue_arrayElement,et.prototype._setValue_arrayElement_setNeedsUpdate,et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[et.prototype._setValue_fromArray,et.prototype._setValue_fromArray_setNeedsUpdate,et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var N7=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:HM}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=HM);var U7=new vs,z7=new vs;var vd=4,nX=.34*vd,iX=.46*vd,rX=.48*vd,oX=.42*vd;var sX=new it,aX=new it,$r=["ring","grid","line","arc","arcAlt"],il="pixels",_s=[il,...$r],xv=.25,bv=2.5,qM=.05,Bi=1;function rl(t){return Math.min(bv,Math.max(xv,t))}var Sv=.05,wv=2.5,XM=.05,yd=1;function _d(t){return Math.min(wv,Math.max(Sv,t))}function Hi(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function ol(t){let e=new mi(t.inputDim,t.hidden,t.outputDim);return e.weights=t.weights.map(n=>n.map(i=>[...i])),e.biases=t.biases.map(n=>n.map(i=>[...i])),e}var ZM=0,YM=0,zt=null;function Wi(){return rd.map(t=>new Array(t).fill(0))}function In(t,e,n,i){zt={stamp:++ZM,mode:t,activations:e.map(r=>[...r]),weightsForViz:n,predictedDigit:i?.predictedDigit??null,expectedDigit:i?.expectedDigit??null},Mv()}function ji(){!g.net3d||!g.net||(g.net3d.setWeights(g.net.weights),g.inferWorkerHost?.syncModel(Hi(g.net)))}function Mv(){return!g.net3d||!zt||zt.stamp===YM?!1:(g.net3d.applyVizState(zt.mode,zt.activations,zt.mode==="infer"?zt.predictedDigit:null,zt.mode==="infer"?zt.expectedDigit:null,zt.weightsForViz),YM=zt.stamp,!0)}function KM(t){return $r.includes(t)?t:null}function JM(t){return _s.includes(t)?t:null}function xs(){g.net3d&&(zt?(zt=M(y({},zt),{stamp:++ZM}),Mv()):In("idle",Wi()),g.renderDisplayBound())}function QM(){Mv()}function n3(t,e){if(t.length!==e.length)return"";let n=[];for(let i=0;i<e.length;i++){let r=e[i],o=t[i];if(!r||!o||r.length!==o.length)continue;let s=0;for(let a=0;a<r.length;a++)s=Math.max(s,Math.abs(r[a]-o[a]));n.push(`${i}:${s.toExponential(2)}`)}return n.length?`  \u0394max ${n.join(" ")}`:""}var eE=0;function i3(t){let e=t.map((r,o)=>({digit:o,probability:r})),n=e.map(r=>r.probability.toFixed(4)).join(" "),i=[...e].sort((r,o)=>o.probability-r.probability).slice(0,3).map(r=>`${r.digit}:${(r.probability*100).toFixed(2)}%`).join(" ");return{probStr:n,top:i}}function tE(t,e,n,i,r){if(!g.net3d)return;let o="";kg&&g.lastInferActsDebug&&(o=n3(g.lastInferActsDebug,t.activations)),kg&&(g.lastInferActsDebug=t.activations.map(u=>[...u])),In("infer",t.activations,void 0,{predictedDigit:t.predictedDigit,expectedDigit:e??null}),n!==void 0&&o3(i),r||g.renderDisplayBound();let{probStr:s,top:a}=i3(t.prob),l=performance.now();if(!r||l-eE>=rM){if(r&&(eE=l),e!==void 0){if(t.invalidProb){Ne(`Infer #${_i(g.inferCounter,4)}: ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);return}let u=n===void 0?"":` idx=${_i(n,5)} `;Ne(`Infer #${_i(g.inferCounter,4)}:${u}wahr=${e} pred=${t.predictedDigit}  softmax ${s}  top ${a}${o}`);return}if(t.invalidProb){Ne(r?"Canvas (live): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren":`Infer #${_i(g.inferCounter,4)} (Canvas): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);return}Ne(r?`Canvas (live): pred=${t.predictedDigit}  softmax ${s}  top ${a}${o}`:`Infer #${_i(g.inferCounter,4)} (Canvas): pred=${t.predictedDigit}  softmax ${s}  top ${a}${o}`)}}function r3(t,e,n,i){if(!g.net||!g.net3d)return;let r=Xa(t),o=g.net.forward(r),s=g.net.predictClass(o.prob),a=Jw(r,o),l=o.prob.map(u=>u[0]),c=l.some(u=>!Number.isFinite(u));tE({predictedDigit:s,activations:a,prob:l,invalidProb:c},e,n,t,i)}function xd(){g.liveCanvasInferRaf!==null&&(cancelAnimationFrame(g.liveCanvasInferRaf),g.liveCanvasInferRaf=null)}function sl(){if(xd(),!g.net||!g.net3d)return;g.liveInferLastRun=performance.now();let t=bd();qr(t,void 0,void 0,{live:!0})}function al(){if(g.liveCanvasInferRaf!==null)return;let t=()=>{if(g.liveCanvasInferRaf=null,!g.net||!g.net3d)return;let e=performance.now();if(e-g.liveInferLastRun<nM()){g.liveCanvasInferRaf=requestAnimationFrame(t);return}g.liveInferLastRun=e;let n=bd();qr(n,void 0,void 0,{live:!0})};g.liveCanvasInferRaf=requestAnimationFrame(t)}function bd(){let t=g.surfaceDrawCanvas.width,e=g.surfaceDrawCanvas.height,i=g.ctx2d.getImageData(0,0,t,e).data;if(t===Qe&&e===Qe){let z=new Array(784),F=0;for(let Y=0;Y<Qe;Y++)for(let he=0;he<Qe;he++){let O=(Y*t+he)*4;z[F++]=(i[O]+i[O+1]+i[O+2])/3/255}return z}let r=t,o=e,s=-1,a=-1,l=20;for(let z=0;z<e;z++)for(let F=0;F<t;F++){let Y=(z*t+F)*4;(i[Y]+i[Y+1]+i[Y+2])/3>l&&(F<r&&(r=F),z<o&&(o=z),F>s&&(s=F),z>a&&(a=z))}if(s<r||a<o)return new Array(784).fill(0);let c=s-r+1,u=a-o+1,d=Math.max(c,u),m=Math.max(2,Math.floor(d*.2)),f=(r+s)*.5,v=(o+a)*.5,b=d+m*2,R=f-b*.5,P=v-b*.5,H=new Array(784),fe=0;for(let z=0;z<Qe;z++)for(let F=0;F<Qe;F++){let Y=R+F/Qe*b,he=P+z/Qe*b,O=R+(F+1)/Qe*b,at=P+(z+1)/Qe*b,wt=Math.max(0,Math.floor(Y)),un=Math.max(0,Math.floor(he)),Ht=Math.min(t,Math.ceil(O)),Pe=Math.min(e,Math.ceil(at)),Jt=0,ws=0;for(let Xr=un;Xr<Pe;Xr++)for(let Ms=wt;Ms<Ht;Ms++){let Es=(Xr*t+Ms)*4;Jt+=(i[Es]+i[Es+1]+i[Es+2])/3,ws++}H[fe++]=ws>0?Jt/ws/255:0}return H}function o3(t){t.length===zg&&(xd(),Xn(),sd(g.surfaceDrawCanvas,t))}function qr(t,e,n,i){if(!g.net||!g.net3d)return;let r=i?.live===!0;try{r||(g.inferCounter+=1);let o=g.inferWorkerHost;if(o?.isReady()){o.inferAsync(t,{live:r}).then(s=>tE(s,e,n,t,r)).catch(s=>Ne(`Infer-Fehler: ${String(s)}`));return}r3(t,e,n,r)}catch(o){Ne(`Infer-Fehler: ${String(o)}`)}}function nE(){return X(this,null,function*(){let t=[uM],e=[dM];try{Ne(`${Vr}: Train-CSV wird geladen \u2026`);let n="",i=[];for(let r of t)try{let o=yield Vg(r),s=yield Ug(o);if(s.length===0){n="Train-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Train-CSV konnte nicht geladen werden");el(i,Mn()),Ne(`${Vr}: Train geladen (${Yn().length} Zeilen)`)}catch(n){Ne(`${Vr}: Fehler Train-CSV: ${n}`),el([],Mn())}try{Ne(`${Vr}: Test-CSV wird geladen \u2026`);let n="",i=[];for(let r of e)try{let o=yield Vg(r),s=yield Ug(o);if(s.length===0){n="Test-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Test-CSV konnte nicht geladen werden");el(Yn(),i),Ne(`${Vr}: Train ${Yn().length} | Test ${i.length} geladen`)}catch(n){Ne(`${Vr}: Fehler Test-CSV: ${n}`),el(Yn(),[])}g.lastInferSampleIndex=-1,yi()})}var iE=(t,e)=>{let n=t.length,i=new Uint8Array(n),r=new Float32Array(n*e);for(let o=0;o<n;o++){let s=t[o];if(i[o]=s.label,s.pixels.length!==e)throw new Error(`MNIST-Pack: erwartet ${e} Pixel pro Zeile`);r.set(s.pixels,o*e)}return{trainingRows:{kind:"rowMajor",rowCount:n,inputDim:e,labels:i,pixels:r},transferables:[i.buffer,r.buffer]}};var s3="neuronal3d:models:v3";function rE(t){return t.version===1&&t.inputDim===Ju&&t.outputDim===Qu&&t.hidden.length===Rr.length&&t.hidden.every((e,n)=>e===Rr[n])}function oE(){try{localStorage.removeItem(s3)}catch{}}function Ev(t){let e=g.nLatest.modelCollection.models.find(r=>r.id===t);if(!e||!rE(e.model))return!1;let n=1+e.model.hidden.length;if(e.model.weights.length!==n||e.model.biases.length!==n)return!1;g.net=ol(e.model),g.lastInferActsDebug=null;let i=g.reconcileWorkspaceUrlForModelSelection?.(e.id)??null;return g.appStore.dispatch(S.activeModelIdSet({id:e.id,routeModelSegmentFromUrl:i})),ji(),In("idle",Wi()),yi(),!0}function sE(t,e="Aktiv"){if(!t)return!1;if(!Ev(t))return Ne("Modell konnte nicht geladen werden."),!1;let n=g.nLatest.modelCollection.models.find(i=>i.id===t);return Ne(`${e}: ${n?.name??t}`),!0}var Sd=class{worker=null;ready=!1;nextRequestId=0;latestLiveRequestId=0;pendingByRequestId=new Map;onMessage=e=>{let n=e.data;if(!(!n||typeof n!="object"))switch(n.type){case"inferWorkerReady":{this.ready=!0;return}case"inferResult":{let i=this.pendingByRequestId.get(n.requestId);this.pendingByRequestId.delete(n.requestId),i?.resolve({predictedDigit:n.predictedDigit,activations:n.activations,prob:n.prob,invalidProb:n.invalidProb});return}case"inferFailed":{let i=this.pendingByRequestId.get(n.requestId);this.pendingByRequestId.delete(n.requestId),i?.reject(new Error(n.message));return}default:return}};whenReady(){return X(this,null,function*(){if(this.worker)return;let e=new Worker(new URL("worker-NUZA4XEY.js",import.meta.url),{type:"module",name:"neuronal-infer"});this.worker=e,e.addEventListener("message",this.onMessage),yield new Promise((n,i)=>{let r=window.setTimeout(()=>{i(new Error("Infer-Worker: Timeout beim Start"))},2e4),o=s=>{s.data?.type==="inferWorkerReady"&&(window.clearTimeout(r),e.removeEventListener("message",o),n())};e.addEventListener("message",o)})})}isReady(){return this.ready&&this.worker!==null}syncModel(e){this.worker?.postMessage({type:"syncModel",storedModel:e})}inferAsync(e,n){if(!this.worker)return Promise.reject(new Error("Infer-Worker nicht gestartet"));let i=++this.nextRequestId;return n?.live===!0&&(this.latestLiveRequestId=i),new Promise((r,o)=>{this.pendingByRequestId.set(i,{resolve:s=>{n?.live===!0&&i!==this.latestLiveRequestId||r(s)},reject:s=>{n?.live===!0&&i!==this.latestLiveRequestId||o(s)}}),this.worker.postMessage({type:"infer",requestId:i,pixels:e})})}destroy(){this.pendingByRequestId.clear(),this.worker?.removeEventListener("message",this.onMessage),this.worker?.terminate(),this.worker=null,this.ready=!1}};var wd=class{worker=null;busy=!1;callbacks=null;pending=null;lastControl={pause:!1,stop:!1};onMessage=e=>{let n=e.data;if(!(!n||typeof n!="object"))switch(n.type){case"trainWorkerReady":return;case"trainSnapshot":this.callbacks?.onSnapshot(n);return;case"trainEpochEnd":this.callbacks?.onEpochEnd(n.summary);return;case"trainFinished":{this.busy=!1,this.callbacks=null,this.pending?.resolve({runMetrics:n.runMetrics,storedModel:n.storedModel}),this.pending=null;return}case"trainFailed":{this.busy=!1,this.callbacks=null;let i=new Error(n.message);this.pending?.reject(i),this.pending=null;return}default:return}};whenReady(){return X(this,null,function*(){if(this.worker)return;let e=new Worker(new URL("worker-HWXCR5PM.js",import.meta.url),{type:"module",name:"neuronal-train"});this.worker=e,e.addEventListener("message",this.onMessage),yield new Promise((n,i)=>{let r=window.setTimeout(()=>{i(new Error("Train-Worker: Timeout beim Start"))},2e4),o=s=>{s.data?.type==="trainWorkerReady"&&(window.clearTimeout(r),e.removeEventListener("message",o),n())};e.addEventListener("message",o)})})}syncControlFromState(e,n){if(!n.training.running||!this.busy)return;let i=n.training.pause,r=n.training.shouldStop;e.training.pause===i&&e.training.shouldStop===r||this.postTrainControl(i,r)}runTrain(e,n,i,r,o){return!this.worker||this.busy?Promise.reject(new Error("Train-Worker nicht bereit")):(this.busy=!0,this.lastControl={pause:!1,stop:!1},this.callbacks=r,new Promise((s,a)=>{this.pending={resolve:s,reject:a},this.worker.postMessage({type:"trainRun",storedModel:e,trainingRows:n,trainConfig:i},o)}))}dispose(){let e=this.worker;this.worker=null,this.busy=!1,this.callbacks=null,this.pending&&(this.pending.reject(new Error("Train-Worker beendet")),this.pending=null),e?.removeEventListener("message",this.onMessage),e?.terminate()}postTrainControl(e,n){this.lastControl.pause===e&&this.lastControl.stop===n||(this.lastControl={pause:e,stop:n},this.worker?.postMessage({type:"trainControl",pause:e,stop:n}))}};var aE=new Set(["KeyW","KeyS","KeyA","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);function a3(t){return t instanceof HTMLElement&&t.closest("input, textarea, [contenteditable='true']")!==null}function Md(t,e){let n=t.getBoundingClientRect(),i=e.clientX-n.left,r=e.clientY-n.top;return{pointerId:e.pointerId,pointerType:e.pointerType,clientX:i,clientY:r,pageX:i,pageY:r,offsetX:i,offsetY:r,buttons:e.buttons,button:e.button,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0,isPrimary:e.isPrimary,pressure:e.pressure}}function Cv(t){return t.pointerType==="touch"||t.pointerType==="pen"}function l3(t){Cv(t)&&t.preventDefault()}function c3(t,e){let n=t.getBoundingClientRect();return{deltaX:e.deltaX,deltaY:e.deltaY,deltaZ:e.deltaZ,deltaMode:e.deltaMode,clientX:e.clientX-n.left,clientY:e.clientY-n.top,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}function u3(t,e){let n=t.getBoundingClientRect();return{clientX:e.clientX-n.left,clientY:e.clientY-n.top,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}var Tv=class{constructor(e){this.postToWorker=e}setWeights(e){this.postToWorker({type:"setWeights",weights:e})}setIdleDim(e){this.postToWorker({type:"setIdleDim",dim:e})}setInferResult(e,n){this.postToWorker({type:"setInferResult",predictedDigit:e,expectedDigit:n})}setEdgeFocus(e,n){this.postToWorker({type:"setEdgeFocus",mode:e,activations:n})}setActivations(e){this.postToWorker({type:"setActivations",activations:e})}applyVizState(e,n,i,r,o){this.postToWorker({type:"applyVizState",mode:e,activations:n,predictedDigit:i,expectedDigit:r,weightsForViz:o})}setHiddenLayerLayout(e,n){this.postToWorker({type:"setHiddenLayerLayout",index:e,layout:n})}setHiddenLayerLayoutScale(e,n){this.postToWorker({type:"setHiddenLayerLayoutScale",index:e,scale:n})}setInputLayerLayout(e){this.postToWorker({type:"setInputLayerLayout",layout:e})}setInputLayerLayoutScale(e){this.postToWorker({type:"setInputLayerLayoutScale",scale:e})}setActiveNeuronMaxScaleMul(e){this.postToWorker({type:"setActiveNeuronMaxScaleMul",mul:e})}applyVizNetworkColors(e){this.postToWorker({type:"applyVizNetworkColors",colors:e})}dispose(){}},Ed=class{constructor(e){this.container=e;this.surfaceBridge=new Tv(n=>this.postToWorker(n)),this.vizSurface=this.surfaceBridge}vizSurface;onWorkerSideMessage=e=>{e.data?.type==="vizWorkerFpsSample"&&this.fpsSampleListener?.(e.data.fps)};worker=null;canvas=null;resizeObserver=null;resizeObserverRaf=0;stopMainVizTick=null;detachCanvasListeners=null;surfaceBridge;latestPixelRatio=1;fpsSampleListener=null;pointerMoveRaf=0;pointerMoveFlushAt=0;pendingPointerMove=null;mobileQuality=as();postPointerMove(e){if(!this.mobileQuality){this.postToWorker({type:"canvasPointer",eventType:"pointermove",initDict:e});return}if(this.pendingPointerMove=e,performance.now()-this.pointerMoveFlushAt>=iM){this.flushPendingPointerMove();return}this.pointerMoveRaf===0&&(this.pointerMoveRaf=requestAnimationFrame(()=>{this.pointerMoveRaf=0,this.flushPendingPointerMove()}))}flushPendingPointerMove(){if(!this.pendingPointerMove)return;let e=this.pendingPointerMove;this.pendingPointerMove=null,this.pointerMoveFlushAt=performance.now(),this.postToWorker({type:"canvasPointer",eventType:"pointermove",initDict:e})}postToWorker(e){this.worker?.postMessage(e)}measureDrawable(){let e=Math.max(1,Math.floor(this.container.clientWidth)),n=Math.max(1,Math.floor(this.container.clientHeight));return{width:e,height:n}}pushResize(){if(!this.worker||!this.canvas)return;let{width:e,height:n}=this.measureDrawable();this.latestPixelRatio=Pg(),this.worker.postMessage({type:"resize",width:e,height:n,pixelRatio:this.latestPixelRatio})}startMainThreadVizTick(){let e=0,n=!1,i=()=>{n||(QM(),e=window.requestAnimationFrame(i))};return e=window.requestAnimationFrame(i),()=>{n=!0,window.cancelAnimationFrame(e)}}start(){return X(this,null,function*(){let e=new Worker(new URL("worker-MLEHFL7A.js",import.meta.url),{type:"module",name:"neuronal-viz"});this.worker=e,e.addEventListener("message",this.onWorkerSideMessage),yield new Promise((O,at)=>{let wt=window.setTimeout(()=>{at(new Error("3D-Render-Worker: Timeout beim Start"))},2e4),un=Ht=>{Ht.data?.type==="vizWorkerReady"&&(window.clearTimeout(wt),e.removeEventListener("message",un),O())};e.addEventListener("message",un)});let n=document.createElement("canvas");this.canvas=n,n.style.display="block",n.style.width="100%",n.style.height="100%",n.style.touchAction="none",this.container.appendChild(n);let{width:i,height:r}=this.measureDrawable();this.latestPixelRatio=Pg();let o=n.transferControlToOffscreen();yield new Promise((O,at)=>{let wt=window.setTimeout(()=>{at(new Error("3D-Render-Worker: Timeout WebGL-Init"))},2e4),un=Ht=>{Ht.data?.type==="vizWorkerGlReady"&&(window.clearTimeout(wt),e.removeEventListener("message",un),O())};e.addEventListener("message",un),e.postMessage({type:"init",canvas:o,width:i,height:r,pixelRatio:this.latestPixelRatio,layerSizes:rd,mobileQuality:this.mobileQuality},[o])}),this.resizeObserver=typeof ResizeObserver<"u"?new ResizeObserver(()=>{this.resizeObserverRaf!==0&&cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=requestAnimationFrame(()=>{this.resizeObserverRaf=0,this.pushResize()})}):null,this.resizeObserver?.observe(this.container),window.addEventListener("resize",this.onWindowResize);let s=O=>{if(l3(O),Cv(O))try{n.setPointerCapture(O.pointerId)}catch{}this.postToWorker({type:"canvasPointer",eventType:"pointerdown",initDict:Md(n,O)})},a=O=>{Cv(O)&&n.hasPointerCapture(O.pointerId)&&O.preventDefault(),this.postPointerMove(Md(n,O))},l=O=>{if(n.hasPointerCapture(O.pointerId))try{n.releasePointerCapture(O.pointerId)}catch{}this.postToWorker({type:"canvasPointer",eventType:"pointerup",initDict:Md(n,O)})},c=O=>{if(n.hasPointerCapture(O.pointerId))try{n.releasePointerCapture(O.pointerId)}catch{}this.postToWorker({type:"canvasPointer",eventType:"pointercancel",initDict:Md(n,O)})},u=O=>{O.preventDefault(),this.postToWorker({type:"canvasWheel",initDict:c3(n,O)})},d=O=>{O.preventDefault(),this.postToWorker({type:"canvasContextMenu",initDict:u3(n,O)})},m={passive:!1};n.addEventListener("pointerdown",s,m),n.addEventListener("pointermove",a,m),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",c),n.addEventListener("wheel",u,{passive:!1}),n.addEventListener("contextmenu",d);let f=O=>{!aE.has(O.code)||a3(O.target)||(O.preventDefault(),this.postToWorker({type:"navKeyDown",code:O.code}))},v=O=>{aE.has(O.code)&&(O.preventDefault(),this.postToWorker({type:"navKeyUp",code:O.code}))},b=()=>{this.postToWorker({type:"navKeysClear"})},R=()=>{this.postToWorker({type:"documentVisibilityHidden",hidden:document.hidden})};return window.addEventListener("keydown",f),window.addEventListener("keyup",v),window.addEventListener("blur",b),window.addEventListener("focus",b),window.addEventListener("pagehide",b),document.addEventListener("visibilitychange",R),this.stopMainVizTick=this.startMainThreadVizTick(),this.detachCanvasListeners=()=>{n.removeEventListener("pointerdown",s,m),n.removeEventListener("pointermove",a,m),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",c),n.removeEventListener("wheel",u),n.removeEventListener("contextmenu",d),window.removeEventListener("keydown",f),window.removeEventListener("keyup",v),window.removeEventListener("blur",b),window.removeEventListener("focus",b),window.removeEventListener("pagehide",b),document.removeEventListener("visibilitychange",R)},{render:()=>{},renderDisplay:()=>{},setVibeCameraMode:O=>{this.postToWorker({type:"setVibeCameraMode",enabled:O})},applyVibeCameraSettings:O=>{this.postToWorker({type:"applyVibeCameraSettings",tuning:O})},applyVizSceneColors:O=>{this.postToWorker({type:"applyVizSceneColors",colors:O})},applyVizLightColors:O=>{this.postToWorker({type:"applyVizLightColors",colors:O})},applyVizPostProcess:O=>{this.postToWorker({type:"applyVizPostProcess",settings:O})}}})}setFpsReporting(e,n){this.fpsSampleListener=e&&n?n:null,this.postToWorker({type:"setFpsOverlayEnabled",enabled:e})}onWindowResize=()=>{this.pushResize()};stopMainVizTickOnly(){this.stopMainVizTick?.(),this.stopMainVizTick=null}destroy(){this.setFpsReporting(!1,null),this.stopMainVizTickOnly(),this.pointerMoveRaf!==0&&(cancelAnimationFrame(this.pointerMoveRaf),this.pointerMoveRaf=0),this.pendingPointerMove=null,window.removeEventListener("resize",this.onWindowResize),this.resizeObserverRaf!==0&&(cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=0),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.detachCanvasListeners?.(),this.detachCanvasListeners=null;let e=this.worker;this.worker=null,e?.removeEventListener("message",this.onWorkerSideMessage),e&&new Promise(i=>{let r=o=>{o.data?.type==="vizWorkerDisposed"&&(e.removeEventListener("message",r),i())};e.addEventListener("message",r),e.postMessage({type:"dispose"}),window.setTimeout(()=>i(),800)}).then(()=>e.terminate()),this.canvas?.remove(),this.canvas=null}};function Iv(){g.renderDisplayBound()}function Dv(t,e,n,i){return X(this,null,function*(){g.appStore=t,g.reconcileWorkspaceUrlForModelSelection=i,g.surfaceVizMount=e.vizMount,g.surfaceDrawCanvas=e.inferDrawCanvas;let r=null,o=null,s=g.appStore.select(wn).subscribe(D=>{let U=g.nLatest;g.nLatest=D,U!=null&&r?.syncControlFromState(U,D)}),a=()=>{if(g.nLatest.training.running)return;let D=ed();g.net=ol(D.model),g.lastInferActsDebug=null,g.appStore.dispatch(S.lastTrainMetricsReset()),us(D),Qg(D.id),ji(),In("idle",Wi()),Ne(`Neues Modell: ${D.name}`),yi()},l=D=>{g.nLatest.training.running||D&&sE(D,"Aktives Modell")};xM(!1),g.surfaceDrawCanvas.width=Qe,g.surfaceDrawCanvas.height=Qe;let c=g.surfaceDrawCanvas.getContext("2d");if(!c)throw new Error("canvas");g.ctx2d=c,Xn(),g.ctx2d.fillStyle="#000000",g.ctx2d.fillRect(0,0,g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height);let u=null;u=new Ed(g.surfaceVizMount);let{render:d,renderDisplay:m,setVibeCameraMode:f,applyVibeCameraSettings:v,applyVizSceneColors:b,applyVizLightColors:R,applyVizPostProcess:P}=yield u.start();r=new wd,yield r.whenReady(),o=new Sd,yield o.whenReady(),g.inferWorkerHost=o,b(g.nLatest.viz3d.sceneColors),R(g.nLatest.viz3d.lightColors);let H=ki(g.nLatest.viz3d.postProcess,Lg());P(H),v(gt(g.nLatest.viz3d.vibeCamera));let fe=y({},g.nLatest.viz3d.sceneColors),z=y({},g.nLatest.viz3d.lightColors),F=y({},g.nLatest.viz3d.networkColors),Y=y({},H),he=0,O={},at=0,wt={},un=()=>{if(Object.keys(O).length===0)return;let D=y({},fe);Object.keys(O).forEach(U=>{let Z=O[U];if(Z!==void 0){if(U==="floorVisible"){typeof Z=="boolean"&&(D.floorVisible=Z);return}if(U==="fogNear"||U==="fogFar"){typeof Z=="number"&&Number.isFinite(Z)&&(D[U]=Z);return}typeof Z=="string"&&It(Z)&&(D[U]=Z)}}),O={},b(D)},Ht=()=>{if(Object.keys(wt).length===0)return;let D=y({},z);Object.keys(wt).forEach(U=>{let Z=wt[U];Z!==void 0&&It(Z)&&(D[U]=Z)}),wt={},R(D)},Pe=()=>{he!==0&&(cancelAnimationFrame(he),he=0),O={},at!==0&&(cancelAnimationFrame(at),at=0),wt={}},Jt=(D,U)=>{It(U)&&(O=M(y({},O),{[D]:U}),he===0&&(he=requestAnimationFrame(()=>{he=0,un()})))},ws=(D,U)=>{It(U)&&(wt=M(y({},wt),{[D]:U}),at===0&&(at=requestAnimationFrame(()=>{at=0,Ht()})))};g.renderSceneBound=d,g.renderDisplayBound=m,g.disposeSceneBound=()=>{u?.destroy(),u=null},f(id());let Xr=u.vizSurface;g.net3d=Xr,Xr.applyVizNetworkColors(F),ji(),g.stopAnimCleanup=()=>{u?.stopMainVizTickOnly()},n.connect({newModelFromToolbar:a,activeModelFromToolbar:l});let Ms=D=>{if(D.button!==0&&D.button!==2)return;if(D.button===2&&D.preventDefault(),g.drawing=!0,g.surfaceDrawCanvas.setPointerCapture(D.pointerId),cs()==="soft"){Xn(),g.drawSoftIsPen=D.button===0;let Z=Ja(D);g.drawSoftIsPen?Xg(Z.x,Z.y):Yg(Z.x,Z.y),g.drawLastSoftPoint=Z,g.drawLastCell=null,al();return}g.drawInk=D.button===2?"#000000":"#ffffff",g.drawBrushChebR=D.button===2?mM():Hg();let U=Zg(Ja(D));g.drawLastCell=U,g.drawLastSoftPoint=null,Kg(U.gx,U.gy,g.drawBrushChebR,g.drawInk),al()},Es=D=>{if(!g.drawing)return;if(cs()==="soft"){if(g.drawLastSoftPoint===null)return;let Z=Ja(D);gM(g.drawLastSoftPoint.x,g.drawLastSoftPoint.y,Z.x,Z.y,g.drawSoftIsPen),g.drawLastSoftPoint=Z,al();return}if(g.drawLastCell===null)return;let U=Zg(Ja(D));yM(g.drawLastCell.gx,g.drawLastCell.gy,U.gx,U.gy,g.drawBrushChebR,g.drawInk),g.drawLastCell=U,al()},wE=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,Xn(),sl()},ME=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,Xn(),sl()},EE=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,Xn(),sl()},CE=(D,U)=>{let Z=KM(U);!Z||!g.net3d||(g.net3d.setHiddenLayerLayout(D,Z),xs())},TE=(D,U)=>{!g.net3d||!Number.isFinite(U)||(g.net3d.setHiddenLayerLayoutScale(D,U),xs())},IE=D=>{let U=JM(D);!U||!g.net3d||(g.net3d.setInputLayerLayout(U),xs())},DE=D=>{!g.net3d||!Number.isFinite(D)||(g.net3d.setInputLayerLayoutScale(D),xs())},AE=D=>{!g.net3d||!Number.isFinite(D)||(g.net3d.setActiveNeuronMaxScaleMul(D),xs())},RE=D=>{fe=y({},D),b(fe)},NE=D=>{z=y({},D),R(z)},PE=D=>{F=y({},D),g.net3d&&(g.net3d.applyVizNetworkColors(F),ji()),Iv()},LE=D=>{Y=ki(D,Lg()),P(Y),Iv()},OE=D=>{v(gt(D)),Iv()},kE=()=>{Xn(),g.ctx2d.fillStyle="#000000",g.ctx2d.fillRect(0,0,g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height),sl()},FE=()=>{let D=Mn();if(!g.net||D.length===0)return;let U=Math.floor(Math.random()*D.length);D.length>1&&U===g.lastInferSampleIndex&&(U=(U+1)%D.length),g.lastInferSampleIndex=U;let Z=D[U];qr(Z.pixels,Z.label,U)},VE=D=>{fl();let U=Yn();if(!g.net||U.length===0)return;let Z=Math.max(0,Math.min(U.length-1,Math.floor(D)));g.lastInferSampleIndex=Z;let Wt=U[Z];qr(Wt.pixels,Wt.label,Z)},ul=null,Vd=0,UE=2800,dl=null,Yr=0,zE=()=>{Yr=0;let D=dl;dl=null,D&&(In("train",D.activations,D.weights),Ne(`Ep ${_i(D.epoch+1,3)}  Batch ${_i(D.batchIndex,5)}  loss ${tl(D.loss,8,4)}  acc ${tl(D.trainAccBatch*100,6,1)}%`))},BE=D=>{dl=D,Yr===0&&(Yr=requestAnimationFrame(zE))},kv=()=>{Yr!==0&&(cancelAnimationFrame(Yr),Yr=0),dl=null},fl=()=>{ul!==null&&(window.clearInterval(ul),ul=null)},Fv=()=>{let D=Mn();if(!g.net||D.length===0){fl();return}let U=Vd%D.length,Z=D[U];g.lastInferSampleIndex=U,qr(Z.pixels,Z.label,U),Vd=(Vd+1)%D.length},HE=D=>{if(fl(),!D)return!1;let U=Mn();return!g.net||U.length===0?!1:(Fv(),ul=window.setInterval(Fv,UE),!0)},WE=()=>{if(!g.net)return;let D=bd();qr(D)},jE=()=>{g.appStore.dispatch(S.trainingPauseToggled())},GE=()=>{g.appStore.dispatch(S.newModelFromToolbarRequested())},$E=()=>{if(!g.net)return;let D=(window.prompt("Name f\xFCr den neuen Modellstand:",tv())??"").trim();if(!D)return;let U=g.net;X(null,null,function*(){let Z=new Date().toISOString(),Wt=yield Bg(U,Mn());us({id:Za(),name:D,createdAt:Z,updatedAt:Z,model:Hi(U),metrics:{lastLoss:g.nLatest.lastTrainLoss,lastBatchAcc:g.nLatest.lastTrainBatchAcc,testAcc:Wt?Wt.accuracy:null,errorRate:Wt?Wt.errorRate:null,epochsTrained:0}}),Ne(`Neuer Modellstand gespeichert: ${D}`)})},qE=()=>{if(g.nLatest.training.running)return;let D=g.nLatest.modelCollection.activeModelId;if(!D)return;let U=g.nLatest.modelCollection.models.find(Wt=>Wt.id===D);if(!U)return;let Z=new mi(784,Og,10);g.net=Z,g.lastInferActsDebug=null,g.appStore.dispatch(S.lastTrainMetricsReset()),bM(D),us(M(y({},U),{updatedAt:new Date().toISOString(),model:Hi(Z),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}})),Qg(D),ji(),In("idle",Wi()),Ne(`Modell neu initialisiert: ${U.name}`),yi()},XE=()=>{X(null,null,function*(){yield new Promise(vt=>{setTimeout(vt,0)});let D=Yn();if(D.length===0)return;let U=SM();if(!g.net){g.net=new mi(784,Og,10);let vt=new Date().toISOString();us({id:Za(),name:tv(),createdAt:vt,updatedAt:vt,model:Hi(g.net),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}),yi()}g.lastInferActsDebug=null;let Z=g.nLatest.modelCollection.activeModelId;if(!Z)return;g.appStore.dispatch(S.lastTrainMetricsReset());let Wt=Date.now(),Uv=new Date(Wt).toISOString(),zv=wM(Z,g.nLatest.epochByModelId);g.appStore.dispatch(S.trainingStarted({modelId:Z,run:zv,runStartedAt:Uv,runStartedMs:Wt})),yield new Promise(vt=>{setTimeout(vt,0)}),In("train",Wi());let Cs=null;try{if(!r)throw new Error("Train-Worker nicht initialisiert");let vt=iE(D,g.net.inputDim);Cs=yield r.runTrain(Hi(g.net),vt.trainingRows,U,{onSnapshot:Zr=>{BE(Zr)},onEpochEnd:Zr=>{let $i=M(y({},Zr),{run:zv,savedAt:new Date().toISOString(),runStartedAt:Uv,runElapsedMs:Date.now()-Wt});g.appStore.dispatch(S.trainingEpochAppended({modelId:Z,row:$i}))}},vt.transferables)}catch{Ne("Training-Worker-Fehler")}Cs&&(g.net=ol(Cs.storedModel));let Ts=Cs?.runMetrics??{lastTrainLoss:0,lastTrainBatchAcc:0};if(g.appStore.dispatch(S.trainingFinished(Ts)),g.net&&Cs){let vt=yield Bg(g.net,Mn()),Zr=g.nLatest.modelCollection.activeModelId,$i=Zr?g.nLatest.modelCollection.models.find(YE=>YE.id===Zr):null;$i&&us(M(y({},$i),{updatedAt:new Date().toISOString(),model:Hi(g.net),metrics:{lastLoss:Ts.lastTrainLoss,lastBatchAcc:Ts.lastTrainBatchAcc,testAcc:vt?vt.accuracy:$i.metrics.testAcc,errorRate:vt?vt.errorRate:$i.metrics.errorRate,epochsTrained:$i.metrics.epochsTrained+U.epochs}}))}kv(),g.net&&(ji(),In("idle",Wi()));let Ud=g.nLatest.modelCollection.activeModelId?g.nLatest.modelCollection.models.find(vt=>vt.id===g.nLatest.modelCollection.activeModelId):null;Ne(`Training beendet | aktiv: ${Ud?.name??"-"} | loss ${tl(Ts.lastTrainLoss,8,4)} | batch-acc ${tl(Ts.lastTrainBatchAcc*100,6,2)}% | err ${ev(Ud?.metrics.errorRate??null)} | acc ${ev(Ud?.metrics.testAcc??null)}`)})},Vv=()=>{new gi().saveCollection(g.nLatest.modelCollection),new Pr().saveEpochStore({version:1,byModelId:g.nLatest.epochByModelId}),g.appStore.dispatch(S.trainingStopRequested()),g.stopAnimCleanup?.(),g.net3d?.dispose(),g.disposeSceneBound?.()};window.addEventListener("beforeunload",Vv),Ne("MNIST wird geladen \u2026"),yi(),nE();try{if(g.nLatest.modelStoreHydrated){let D=g.nLatest.modelCollection.activeModelId;if(D&&Ev(D)){let U=g.nLatest.modelCollection.models.find(Z=>Z.id===D);Ne(`Modell aus Browser-Speicher geladen: ${U?.name??D}`)}else g.nLatest.modelCollection.models.length>0&&Ne(`${g.nLatest.modelCollection.models.length} Modellst\xE4nde im Browser gefunden`)}}catch{Ne("MNIST wird geladen \u2026")}return{destroy:()=>{try{new gi().saveCollection(g.nLatest.modelCollection),new Pr().saveEpochStore({version:1,byModelId:g.nLatest.epochByModelId})}catch{}xd(),kv(),Pe(),fl(),g.appStore.dispatch(S.trainingStopRequested()),n.disconnect(),s.unsubscribe(),window.removeEventListener("beforeunload",Vv),g.stopAnimCleanup?.(),g.net3d?.dispose(),g.disposeSceneBound?.(),r?.dispose(),r=null,o?.destroy(),o=null,g.inferWorkerHost=null,g.net3d=null,g.stopAnimCleanup=null,g.disposeSceneBound=null,g.reconcileWorkspaceUrlForModelSelection=void 0,g.renderSceneBound=()=>{},g.renderDisplayBound=()=>{}},onTrain:XE,onPause:jE,onNewModel:GE,onSaveAs:$E,onReset:qE,onInferRandom:FE,onInferTrainSample:VE,onInferDraw:WE,onClearDraw:kE,onDrawPointerDown:Ms,onDrawPointerMove:Es,onDrawPointerUp:wE,onDrawPointerCancel:ME,onDrawPointerLeave:EE,onHiddenLayerLayoutChange:CE,onHiddenLayerLayoutScaleChange:TE,onInputLayerLayoutChange:IE,onInputLayerLayoutScaleChange:DE,onActiveNeuronMaxScaleMulChange:AE,onVizSceneColorsApply:RE,onVizLightColorsApply:NE,onVizNetworkColorsApply:PE,onVizPostProcessApply:LE,onVibeCameraSettingsApply:OE,previewVizSceneColor:Jt,previewVizLightColor:ws,cancelPendingVizColorPreviews:Pe,setVibeCameraMode:f,setTestImageCarouselMode:HE,setVizFpsOverlay:(D,U)=>{u?.setFpsReporting(D,U)}}})}var Gi=class t{newModel=()=>{};selectModel=e=>{};runtimeAttached=!1;pendingNew=!1;pendingSelectId=null;connect(e){this.newModel=e.newModelFromToolbar,this.selectModel=e.activeModelFromToolbar,this.runtimeAttached=!0,this.flushPending()}disconnect(){this.newModel=()=>{},this.selectModel=()=>{},this.runtimeAttached=!1,this.pendingNew=!1,this.pendingSelectId=null}flushPending(){if(this.pendingNew){this.pendingNew=!1,this.pendingSelectId=null,this.newModel();return}if(this.pendingSelectId!==null){let e=this.pendingSelectId;this.pendingSelectId=null,this.selectModel(e)}}newModelFromToolbar(){if(!this.runtimeAttached){this.pendingNew=!0,this.pendingSelectId=null;return}this.newModel()}activeModelFromToolbar(e){if(!this.runtimeAttached){this.pendingSelectId=e,this.pendingNew=!1;return}this.selectModel(e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};function Av(t){let n=t.split("?")[0].split("#")[0].split("/").filter(Boolean),i=n.indexOf("model");if(i<0)return null;let r=n[i+1];return!r||r==="new"?null:r}function lE(t){return Av(t)!=null}var ln=class t{inferDrawBrushSizeUi={min:1,max:7};store=w(me);router=w(Yt);appInstance=w(Gi);actions$=w(Lu);runtime=null;hydrateOnce=null;constructor(){this.actions$.pipe(Ee(S.activeModelIdFromRouteSet),Be(this.store.select(hi)),ge(([,e])=>!e)).subscribe(([{id:e}])=>{Jn.schedule(()=>this.appInstance.activeModelFromToolbar(e))})}ensureStoreHydrated(){return X(this,null,function*(){this.hydrateOnce||(this.hydrateOnce=Us(this.store.select(Ir).pipe(ge(e=>e),Ye(1))).then(()=>{})),yield this.hydrateOnce})}bindRuntime(e,n){return X(this,null,function*(){yield this.ensureStoreHydrated(),this.runtime?.destroy();let i=yield Dv(this.store,e,n,r=>{let o=Av(this.router.url);return o!=null&&o!==r&&this.router.navigate(["/model",r],{replaceUrl:!0}),o});return this.runtime=i,()=>{this.runtime===i?(i.destroy(),this.runtime=null):i.destroy()}})}dispatch(e){this.store.dispatch(e)}onTrain=()=>{this.runtime?.onTrain()};onPause=()=>{this.runtime?.onPause()};onActiveModelFromMenu=e=>{this.store.dispatch(S.activeModelFromToolbarRequested({id:e}))};onNewModel=()=>{this.runtime?.onNewModel()};onSaveAs=()=>{this.runtime?.onSaveAs()};onReset=()=>{this.runtime?.onReset()};onInferRandom=()=>{this.runtime?.onInferRandom()};onInferTrainSample(e){this.runtime?.onInferTrainSample(e)}setVizFpsOverlay(e,n){this.runtime?.setVizFpsOverlay(e,n)}onInferDraw=()=>{this.runtime?.onInferDraw()};onClearDraw=()=>{this.runtime?.onClearDraw()};onDrawPointerDown=e=>{this.runtime?.onDrawPointerDown(e)};onDrawPointerMove=e=>{this.runtime?.onDrawPointerMove(e)};onDrawPointerUp=()=>{this.runtime?.onDrawPointerUp()};onDrawPointerCancel=()=>{this.runtime?.onDrawPointerCancel()};onDrawPointerLeave=()=>{this.runtime?.onDrawPointerLeave()};onHiddenLayerLayoutChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutChange(e,n)};onHiddenLayerLayoutScaleChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutScaleChange(e,n)};onInputLayerLayoutChange=e=>{this.runtime?.onInputLayerLayoutChange(e)};onInputLayerLayoutScaleChange=e=>{this.runtime?.onInputLayerLayoutScaleChange(e)};onActiveNeuronMaxScaleMulChange=e=>{this.runtime?.onActiveNeuronMaxScaleMulChange(e)};onVizSceneColorsApply=e=>{this.runtime?.onVizSceneColorsApply(e)};onVizLightColorsApply=e=>{this.runtime?.onVizLightColorsApply(e)};onVizNetworkColorsApply=e=>{this.runtime?.onVizNetworkColorsApply(e)};onVizPostProcessApply=e=>{this.runtime?.onVizPostProcessApply(e)};onVibeCameraSettingsApply=e=>{this.runtime?.onVibeCameraSettingsApply(e)};previewVizSceneColor=(e,n)=>{this.runtime?.previewVizSceneColor(e,n)};previewVizLightColor=(e,n)=>{this.runtime?.previewVizLightColor(e,n)};cancelPendingVizColorPreviews=()=>{this.runtime?.cancelPendingVizColorPreviews()};toggleVibeCameraState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setVibeCameraMode(n),n}setTestImageCarouselMode(e){return this.runtime?.setTestImageCarouselMode(e)??!1}toggleTestImageCarouselState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setTestImageCarouselMode(n)}stopTestImageCarousel(){this.runtime?.setTestImageCarouselMode(!1)}setInferDrawBrushMode(e){Wg(e)}getInferDrawBrushMode(){return cs()}setInferDrawBrushSize(e){jg(e)}getInferDrawBrushSize(){return Gg()}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};var d3=t=>["/model",t],f3=(t,e)=>e.id;function h3(t,e){t&1&&(h(0,"div",1),x(1," Wird geladen \u2026 "),p())}function p3(t,e){t&1&&(h(0,"div",1),x(1," Modelle werden vorbereitet \u2026 "),p())}function m3(t,e){if(t&1){let n=pt();h(0,"div",2)(1,"p",3),x(2," Noch keine gespeicherten Modelle. Lege ein neues Netz an \u2014 es erscheint in der Liste; \xF6ffne es dort f\xFCr die Arbeitsfl\xE4che. "),p(),h(3,"button",4),C("click",function(){T(n);let r=E();return I(r.createNew())}),x(4," Neues Modell anlegen "),p()()}}function g3(t,e){if(t&1&&(h(0,"li")(1,"a",9)(2,"div",10)(3,"span",11),x(4),p(),h(5,"div",12)(6,"span"),x(7),p(),h(8,"span"),x(9),p()(),h(10,"div",13)(11,"div",14)(12,"span"),x(13,"Trainierte Epochen"),p(),h(14,"span",15),x(15),p()(),h(16,"div",16),be(17,"div",17),p()()()()()),t&2){let n=e.$implicit,i=E(2);_(),N("routerLink",ib(8,d3,n.id)),_(3),we(n.name),_(3),pe("Test: ",i.fmtPct(n.metrics.testAcc),""),_(2),pe("Fehlerrate: ",i.fmtPct(n.metrics.errorRate),""),_(6),we(n.metrics.epochsTrained),_(),ee("aria-label","Epochen "+n.metrics.epochsTrained+" im Vergleich zur Liste"),_(),ko("width",i.epochBarRelativePct(n.metrics.epochsTrained),"%")}}function v3(t,e){if(t&1){let n=pt();h(0,"div",5)(1,"h1",6),x(2," Gespeicherte Modelle "),p(),h(3,"button",7),C("click",function(){T(n);let r=E();return I(r.createNew())}),x(4," Neues Modell anlegen "),p()(),h(5,"ul",8),Ze(6,g3,18,10,"li",null,f3),p()}if(t&2){let n=E();_(6),Ke(n.models())}}var Cd=class t{neuronalApp=w(ln);store=w(me);ready=Ie(!1);hydrated=_e(this.store.select(Ir),{initialValue:!1});models=_e(this.store.select(os).pipe(W(e=>e.models)),{initialValue:[]});constructor(){this.neuronalApp.ensureStoreHydrated().then(()=>{this.ready.set(!0)})}fmtPct(e){return e===null||!Number.isFinite(e)?"\u2014":`${(e*100).toFixed(2)} %`}epochBarRelativePct(e){let n=this.models(),i=0;for(let s of n){let a=s.metrics.epochsTrained;Number.isFinite(a)&&a>i&&(i=a)}let r=Math.max(1,i),o=Number.isFinite(e)?Math.max(0,e):0;return Math.min(100,o/r*100)}createNew(){this.store.dispatch(S.newModelFromListRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-model-list"]],hostAttrs:[1,"flex","min-h-0","flex-1","flex-col"],decls:5,vars:1,consts:[[1,"flex","min-h-0","flex-1","flex-col","gap-4","p-4"],[1,"text-base-content/70","border-base-300/50","bg-base-200/50","rounded-box","border","border-dashed","p-6","text-sm"],[1,"flex","flex-col","gap-4","rounded-box","border","border-dashed","border-base-300/60","bg-base-200/40","p-6"],[1,"text-base-content/80","text-sm"],["type","button",1,"btn","btn-accent","w-fit",3,"click"],[1,"flex","flex-col","gap-3","sm:flex-row","sm:items-center","sm:justify-between"],[1,"text-lg","font-semibold","tracking-tight"],["type","button",1,"btn","btn-accent","shrink-0",3,"click"],["role","list",1,"flex","flex-col","gap-2"],[1,"card","border-base-300","bg-base-200","hover:border-primary/50","hover:bg-base-200/90","block","rounded-box","border","shadow-sm","transition-colors",3,"routerLink"],[1,"card-body","gap-1","p-4"],[1,"card-title","text-base"],[1,"text-base-content/65","flex","flex-wrap","gap-x-4","gap-y-1","text-xs"],[1,"mt-2.5","flex","flex-col","gap-1.5"],["aria-hidden","true",1,"text-base-content/50","flex","items-baseline","justify-between","gap-2","text-[0.65rem]","font-medium","uppercase","tracking-wider"],[1,"text-base-content/70","tabular-nums","normal-case"],["role","img",1,"bg-base-300/40","h-2.5","w-full","overflow-hidden","rounded-full"],[1,"from-primary","to-secondary","bg-gradient-to-r","h-full","min-h-full","min-w-0","rounded-full","shadow-sm","shadow-primary/25","transition-[width]","duration-500","ease-out"]],template:function(n,i){n&1&&(h(0,"main",0),Ue(1,h3,2,0,"div",1)(2,p3,2,0,"div",1)(3,m3,5,0,"div",2)(4,v3,8,0),p()),n&2&&(_(),ze(i.ready()?i.hydrated()?i.models().length===0?3:4:2:1))},dependencies:[ts],encapsulation:2,changeDetection:0})};function cE(t){let e=w(me),n=w(Yt);return e.select(Ir).pipe(ge(i=>i),Ye(1),At(()=>e.select(os).pipe(Ye(1))),W(i=>{let r=(t.params.modelId??"").trim();return r?i.models.some(o=>o.id===r)?(e.dispatch(S.activeModelIdFromRouteSet({id:r})),!0):n.parseUrl("/"):!0}))}function y3(t,e){return this.rowKey(e)}var Rv=(t,e)=>e.pos+e.label;function _3(t,e){t&1&&(h(0,"li",10),x(1," Noch kein Training "),p())}function x3(t,e){if(t&1&&(h(0,"li",11)(1,"span",12),x(2),p(),h(3,"span"),x(4),p(),h(5,"span"),x(6),p(),h(7,"span"),x(8),p(),h(9,"span",13),x(10),p()()),t&2){let n=e.$implicit,i=E(3);_(2),pe("R",i.runLabel(n.run),""),_(2),pe("Ep ",n.epoch+1,""),_(2),pe("loss ",n.loss.toFixed(4),""),_(2),pe("",(n.trainAcc*100).toFixed(2),"%"),_(2),Bo("",i.timeLabel(n.savedAt)," | Dauer ",i.durationLabel(n.runElapsedMs),"")}}function b3(t,e){if(t&1&&Ze(0,x3,11,6,"li",11,y3,!0),t&2){let n=E(2);Ke(n.view().rows)}}function S3(t,e){if(t&1&&(h(0,"div",7)(1,"ul",9),Ue(2,_3,2,0,"li",10)(3,b3,2,0),p()()),t&2){let n=E();_(2),ze(n.view().rows.length===0?2:3)}}function w3(t,e){if(t&1&&(Ro(),be(0,"line",17)),t&2){let n=e.$implicit,i=E();ee("x1",i.marginLeft)("y1",n)("x2",i.marginLeft+i.plotW)("y2",n)}}function M3(t,e){if(t&1&&(Ro(),h(0,"text",22),x(1),p()),t&2){let n=e.$implicit,i=E();ee("x",i.marginLeft-4)("y",n.pos),_(),pe(" ",n.label," ")}}function E3(t,e){if(t&1&&(Ro(),h(0,"text",23),x(1),p()),t&2){let n=e.$implicit,i=E();ee("x",i.marginLeft+i.plotW+4)("y",n.pos),_(),pe(" ",n.label," ")}}function C3(t,e){if(t&1&&(Ro(),h(0,"text",24),x(1),p()),t&2){let n=e.$implicit,i=E();ee("x",n.pos)("y",i.marginTop+i.plotH+14),_(),pe(" ",n.label," ")}}function T3(t,e){if(t&1&&(Ro(),h(0,"svg",14)(1,"defs")(2,"clipPath",15),be(3,"rect"),p()(),be(4,"rect",16),Ze(5,w3,1,4,":svg:line",17,Ii),be(7,"line",18)(8,"line",18)(9,"line",18),h(10,"g",19),be(11,"polyline",20)(12,"polyline",21),p(),Ze(13,M3,2,3,":svg:text",22,Rv),Ze(15,E3,2,3,":svg:text",23,Rv),Ze(17,C3,2,3,":svg:text",24,Rv),h(19,"text",25),x(20," Schritt "),p()(),o_(),h(21,"div",26)(22,"span",27),x(23,"Loss"),p(),h(24,"span",28),x(25,"Train-Acc"),p()()),t&2){let n=e;ee("viewBox","0 0 "+n.vbW+" "+n.vbH),_(3),ee("x",n.marginLeft)("y",n.marginTop)("width",n.plotW)("height",n.plotH),_(),ee("width",n.vbW)("height",n.vbH),_(),Ke(n.gridYs),_(2),ee("x1",n.marginLeft)("y1",n.marginTop)("x2",n.marginLeft)("y2",n.marginTop+n.plotH),_(),ee("x1",n.marginLeft+n.plotW)("y1",n.marginTop)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),_(),ee("x1",n.marginLeft)("y1",n.marginTop+n.plotH)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),_(2),ee("points",n.pointsLoss),_(),ee("points",n.pointsAcc),_(),Ke(n.leftTicks),_(2),Ke(n.rightTicks),_(2),Ke(n.bottomTicks),_(2),ee("x",n.marginLeft+n.plotW/2)("y",n.vbH-2)}}function I3(t,e){t&1&&(h(0,"p",10),x(1," Noch kein Training "),p())}function D3(t,e){if(t&1&&(h(0,"div",8),Ue(1,T3,26,23)(2,I3,2,0,"p",10),p()),t&2){let n,i=E();_(),ze((n=i.chartModel())?1:2,n)}}var Td=class t{store=w(me);view=_e(this.store.select(rg),{requireSync:!0});epochTab=Ie("list");chartModel=mt(()=>{let e=this.view().rows;if(e.length===0)return null;let n=[...e].reverse(),i=n.length,r=34,o=38,s=10,a=26,l=148,c=70,u=r+l+o,d=s+c+a,m=n.map(Pe=>Pe.loss),f=Math.min(...m),v=Math.max(...m),b=Math.max(v-f,1e-9),R=Pe=>r+(i<=1?l/2:Pe/(i-1)*l),P=Pe=>s+(1-(Pe-f)/b)*c,H=Pe=>s+(1-Pe)*c,fe=n.map((Pe,Jt)=>`${R(Jt)},${P(Pe.loss)}`).join(" "),z=n.map((Pe,Jt)=>`${R(Jt)},${H(Pe.trainAcc)}`).join(" "),F=Pe=>{let Jt=Math.abs(Pe);return Jt>=100?Pe.toFixed(0):Jt>=10?Pe.toFixed(1):Jt>=1?Pe.toFixed(2):Pe.toFixed(3)},Y=s+c,he=s+c/2,O=v-f<1e-8,at=O?[{pos:he,label:F(f)}]:[{pos:s,label:F(f)},{pos:he,label:F((f+v)/2)},{pos:Y,label:F(v)}],wt=[{pos:s,label:"100%"},{pos:he,label:"50%"},{pos:Y,label:"0%"}],un=O?[he]:[s,he,Y],Ht=[];if(i===1)Ht.push({pos:R(0),label:"1"});else{if(Ht.push({pos:R(0),label:"1"}),i>2){let Pe=Math.floor((i-1)/2);Pe!==0&&Pe!==i-1&&Ht.push({pos:R(Pe),label:String(Pe+1)})}Ht.push({pos:R(i-1),label:String(i)})}return{vbW:u,vbH:d,marginLeft:r,marginRight:o,marginTop:s,marginBottom:a,plotW:l,plotH:c,pointsLoss:fe,pointsAcc:z,leftTicks:at,rightTicks:wt,bottomTicks:Ht,gridYs:un}});rowKey(e){return`${e.run}-${e.epoch}-${e.savedAt}`}runLabel(e){return String(e).padStart(2,"0")}timeLabel(e){let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}durationLabel(e){let n=Math.max(0,Math.round(e/1e3)),i=Math.floor(n/3600),r=Math.floor(n%3600/60),o=n%60;return i>0?`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-epoch-track-list"]],decls:12,vars:8,consts:[[1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden","border","shadow-xl"],[1,"card-body","flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","p-4"],["role","tablist","aria-label","Epoch-Ansicht",1,"tabs","tabs-boxed","bg-base-300/30","p-1"],["type","button","role","tab","id","tab-epoch-list","aria-controls","panel-epoch-list",1,"tab","flex-1","text-xs",3,"click"],["type","button","role","tab","id","tab-epoch-chart","aria-controls","panel-epoch-chart",1,"tab","flex-1","text-xs",3,"click"],[1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden","pt-1"],[1,"text-success/90","m-0","text-[0.68rem]","font-bold","uppercase","tracking-widest"],["id","panel-epoch-list","role","tabpanel","aria-labelledby","tab-epoch-list",1,"flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden"],["id","panel-epoch-chart","role","tabpanel","aria-labelledby","tab-epoch-chart",1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","min-h-0","flex-1","list-none","flex-col","gap-2","overflow-y-auto","overflow-x-hidden","p-0"],[1,"text-base-content/60","rounded-btn","border-base-300/60","border","border-dashed","p-3","text-xs"],[1,"border-base-300/80","bg-base-100/40","rounded-btn","grid","grid-cols-[2.5rem_3rem_1fr_auto]","items-center","gap-1.5","border","p-2","font-mono","text-[0.64rem]","tabular-nums","sm:grid-cols-[3.2rem_4rem_1fr_auto]","sm:gap-2","sm:text-[0.68rem]"],[1,"text-base-content/60"],[1,"text-base-content/60","border-base-300/40","col-span-4","border-t","pt-1","text-[0.64rem]"],["preserveAspectRatio","xMidYMid meet",1,"border-base-300/60","block","max-h-[14rem]","min-h-[6.5rem]","w-full","flex-1","rounded-lg","border"],["id","n3-epoch-plot-clip"],["x","0","y","0",1,"fill-base-300/35"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/10"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/45"],["clip-path","url(#n3-epoch-plot-clip)"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-primary"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-info"],["text-anchor","end","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","start","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","middle","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium"],["text-anchor","middle","dominant-baseline","auto",1,"fill-base-content/55","text-[6px]","font-semibold","uppercase","tracking-wide"],["aria-hidden","true",1,"text-base-content/60","flex","flex-wrap","gap-x-4","gap-y-1","text-[0.65rem]"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-primary","before:content-['']"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-info","before:content-['']"]],template:function(n,i){n&1&&(h(0,"article",0)(1,"div",1)(2,"div",2)(3,"button",3),C("click",function(){return i.epochTab.set("list")}),x(4," Liste "),p(),h(5,"button",4),C("click",function(){return i.epochTab.set("chart")}),x(6," Diagramm "),p()(),h(7,"div",5)(8,"div",6),x(9),p(),Ue(10,S3,4,1,"div",7)(11,D3,3,1,"div",8),p()()()),n&2&&(_(3),qe("tab-active",i.epochTab()==="list"),ee("aria-selected",i.epochTab()==="list"),_(2),qe("tab-active",i.epochTab()==="chart"),ee("aria-selected",i.epochTab()==="chart"),_(4),pe(" Epochs (",i.view().epochsTotal,") "),_(),ze(i.epochTab()==="list"?10:11))},styles:["[_nghost-%COMP%]{display:flex;overflow:auto}"],changeDetection:0})};var A3=["cv"],Id=class t{cdr=w(Ho);cv;index;pick=new _t;displayNr=0;labelStr="\u2014";ngAfterViewInit(){this.paint()}ngOnChanges(){queueMicrotask(()=>this.paint())}paint(){let e=this.cv?.nativeElement;if(!e)return;let n=Ur(this.index);if(this.displayNr=this.index+1,!n){this.labelStr="\u2014",this.cdr.markForCheck();return}this.labelStr=String(n.label),sd(e,n.pixels),this.cdr.markForCheck()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-train-infer-thumb"]],viewQuery:function(n,i){if(n&1&&pa(A3,7),n&2){let r;Vo(r=Uo())&&(i.cv=r.first)}},inputs:{index:"index"},outputs:{pick:"pick"},features:[pr],decls:8,vars:2,consts:[["cv",""],["type","button",1,"border-base-300","bg-base-300/40","hover:bg-base-300/60","flex","w-full","items-center","gap-3","rounded-lg","border","px-2","py-1","text-left","transition-colors",3,"click"],["width","28","height","28",1,"border-base-content/20","h-11","w-11","shrink-0","rounded","border","bg-black","[image-rendering:pixelated]"],[1,"flex","min-w-0","flex-1","flex-col","gap-0.5"],[1,"text-base-content","font-mono","text-xs","font-medium","tabular-nums"],[1,"text-base-content/60","text-[11px]"]],template:function(n,i){if(n&1){let r=pt();h(0,"button",1),C("click",function(){return T(r),I(i.pick.emit())}),be(1,"canvas",2,0),h(3,"div",3)(4,"span",4),x(5),p(),h(6,"span",5),x(7),p()()()}n&2&&(_(5),pe("Nr. ",i.displayNr,""),_(2),pe("Label ",i.labelStr,""))},encapsulation:2,changeDetection:0})};var R3=["trainGalleryScroll"],N3=["inferDrawCanvas"],P3=(t,e)=>e.row;function L3(t,e){if(t&1){let n=pt();h(0,"div",10)(1,"div",12)(2,"button",13),C("click",function(){T(n);let r=E();return I(r.inferRandom())}),x(3," Zuf\xE4lliges Testbild "),p(),h(4,"button",14),C("click",function(){T(n);let r=E();return I(r.toggleTestCarousel())}),x(5),p()(),h(6,"div",15)(7,"div",16)(8,"span",17),x(9,"Pinselgr\xF6\xDFe"),p(),h(10,"span",18),x(11),p()(),h(12,"input",19),C("input",function(r){T(n);let o=E();return I(o.onBrushSizeInput(r))}),p()(),h(13,"canvas",20,0),C("contextmenu",function(r){return T(n),I(r.preventDefault())})("pointerdown",function(r){T(n);let o=E();return I(o.drawDown(r))})("pointermove",function(r){T(n);let o=E();return I(o.drawMove(r))})("pointerup",function(){T(n);let r=E();return I(r.drawUp())})("pointercancel",function(){T(n);let r=E();return I(r.drawCancel())})("pointerleave",function(){T(n);let r=E();return I(r.drawLeave())}),p(),h(15,"div",21)(16,"div",22)(17,"button",23),C("click",function(){T(n);let r=E();return I(r.inferDraw())}),x(18," Zeichnung auswerten "),p(),h(19,"button",24),C("click",function(){T(n);let r=E();return I(r.clearDraw())}),x(20," Leeren "),p()(),h(21,"button",25),C("click",function(){T(n);let r=E();return I(r.toggleSoftBrush())}),x(22),p()()()}if(t&2){let n=E();_(2),N("disabled",n.inferCtrl().inferRandomDisabled),_(2),N("disabled",n.inferCtrl().carouselDisabled),ee("aria-pressed",n.testCarouselOn()),_(),pe(" ",n.testCarouselOn()?"Testbild-Karussell aus":"Testbild-Karussell"," "),_(6),Bo("Stift ",n.penStampCells(),"\xD7",n.penStampCells(),""),_(),N("min",n.neuronalApp.inferDrawBrushSizeUi.min)("max",n.neuronalApp.inferDrawBrushSizeUi.max)("value",n.brushSize()),ee("aria-valuetext","Pinselstufe "+n.brushSize()),_(5),N("disabled",n.inferCtrl().inferDrawDisabled),_(4),ee("aria-pressed",n.softBrushOn()),_(),pe(" ",n.softBrushOn()?"Pinsel: weich (AA)":"Pinsel: Pixel-Raster"," ")}}function O3(t,e){if(t&1){let n=pt();h(0,"button",40),C("click",function(){let r=T(n).$implicit,o=E(2);return I(o.setTrainFilterDigit(r))}),x(1),p()}if(t&2){let n=e.$implicit,i=E(2);qe("btn-primary",i.trainFilterDigit()===n),ee("aria-pressed",i.trainFilterDigit()===n),_(),pe(" ",n," ")}}function k3(t,e){t&1&&(h(0,"p",35),x(1," Noch keine Trainingsdaten geladen \u2026 "),p())}function F3(t,e){if(t&1){let n=pt();h(0,"div",41)(1,"app-train-infer-thumb",42),C("pick",function(){let r=T(n).$implicit,o=E(2);return I(o.selectTrainForInfer(r.sampleIndex))}),p()()}if(t&2){let n=e.$implicit,i=E(2);ko("top",n.row*i.trainRowHeight,"px")("height",i.trainRowHeight,"px"),_(),N("index",n.sampleIndex)}}function V3(t,e){if(t&1&&x(0),t&2){let n=E(2);Bo(" ",n.trainOrderedCount()," / ",n.trainCount()," Bilder ")}}function U3(t,e){if(t&1&&x(0),t&2){let n=E(2);ma(" ",n.trainOrderedCount()," Bilder (Ziffer ",n.trainFilterDigit(),", von ",n.trainCount()," gesamt) ")}}function z3(t,e){if(t&1){let n=pt();h(0,"div",11)(1,"p",26),x(2," Alle geladenen Trainingsbilder \u2014 Klick setzt das Bild f\xFCr die Inferenz (wie das Zeichen-Canvas) und stoppt das Test-Karussell. "),p(),h(3,"div",27)(4,"div",28)(5,"span",29),x(6,"Sortierung"),p(),h(7,"button",30),C("click",function(){T(n);let r=E();return I(r.setTrainSortBy("index"))}),x(8," Nummer (Index) "),p(),h(9,"button",30),C("click",function(){T(n);let r=E();return I(r.setTrainSortBy("digit"))}),x(10," Ziffer zuerst "),p()(),h(11,"div",31)(12,"span",29),x(13,"Ziffer-Filter"),p(),h(14,"div",32)(15,"button",33),C("click",function(){T(n);let r=E();return I(r.setTrainFilterDigit(null))}),x(16," Alle "),p(),Ze(17,O3,2,4,"button",34,Ii),p()()(),Ue(19,k3,2,0,"p",35),h(20,"div",36,1),C("scroll",function(r){T(n);let o=E();return I(o.onTrainGalleryScroll(r))}),h(22,"div",37),Ze(23,F3,2,5,"div",38,P3),p()(),h(25,"p",39),Ue(26,V3,1,2)(27,U3,1,3),p()()}if(t&2){let n=E();_(7),ee("aria-pressed",n.trainSortBy()==="index"),_(2),ee("aria-pressed",n.trainSortBy()==="digit"),_(6),qe("btn-primary",n.trainFilterDigit()===null),ee("aria-pressed",n.trainFilterDigit()===null),_(2),Ke(n.trainDigitKeys),_(2),ze(n.trainCount()===0?19:-1),_(3),ko("height",n.trainGalleryTotalHeight(),"px"),_(),Ke(n.visibleTrainGalleryRows()),_(3),ze(n.trainFilterDigit()===null?26:27)}}var ll=class t{store=w(me);neuronalApp=w(ln);inferCtrl=_e(this.store.select(gg),{requireSync:!0});inferPanelModel=_e(this.store.select(_g),{requireSync:!0});inferUiTab=Ie("draw");testCarouselOn=Ie(!1);softBrushOn=Ie(!1);brushSize=Ie(4);trainRowHeight=58;trainGalleryViewportPx=280;trainCount=Ie(0);trainScrollTop=Ie(0);trainSortBy=Ie("index");trainFilterDigit=Ie(null);trainDigitKeys=[0,1,2,3,4,5,6,7,8,9];trainOrderedIndices=Ie([]);trainGalleryScrollEl=Oo("trainGalleryScroll");inferDrawCanvasEl=Oo("inferDrawCanvas");trainOrderedCount=mt(()=>this.trainOrderedIndices().length);trainGalleryTotalHeight=mt(()=>this.trainOrderedCount()*this.trainRowHeight);visibleTrainGalleryRows=mt(()=>{let e=this.trainOrderedIndices(),n=e.length;if(n<=0)return[];let i=this.trainScrollTop(),r=this.trainGalleryViewportPx,o=this.trainRowHeight,s=Math.max(0,Math.floor(i/o)-2),a=Math.min(n-1,Math.ceil((i+r)/o)+2),l=[];for(let c=s;c<=a;c++)l.push({row:c,sampleIndex:e[c]});return l});penStampCells=mt(()=>2*Math.min(6,Math.max(0,this.brushSize()-1))+1);trainingRunning=_e(this.store.select(hi),{initialValue:!1});constructor(){zn(()=>{this.trainingRunning()&&(this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1))}),zn(e=>{if(this.inferUiTab()!=="train"||(this.refreshTrainCount(),this.trainCount()>0))return;let n=window.setInterval(()=>{this.refreshTrainCount()},500);e(()=>window.clearInterval(n))}),zn(()=>{let e=this.trainCount(),n=this.trainSortBy(),i=this.trainFilterDigit();if(e<=0){this.trainOrderedIndices.set([]);return}let r;if(i===null)r=Array.from({length:e},(o,s)=>s);else{r=[];for(let o=0;o<e;o++){let s=Ur(o);s&&s.label===i&&r.push(o)}}n==="digit"&&r.sort((o,s)=>{let a=Ur(o),l=Ur(s),c=a?.label??-1,u=l?.label??-1;return c!==u?c-u:o-s}),this.trainOrderedIndices.set(r)})}ngAfterViewInit(){queueMicrotask(()=>{this.softBrushOn.set(this.neuronalApp.getInferDrawBrushMode()==="soft"),this.brushSize.set(this.neuronalApp.getInferDrawBrushSize())})}ngOnDestroy(){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1)}onTrainGalleryScroll(e){let n=e.target;this.trainScrollTop.set(n.scrollTop)}resetTrainGalleryScroll(){this.trainScrollTop.set(0);let e=this.trainGalleryScrollEl()?.nativeElement;e&&(e.scrollTop=0)}setTrainSortBy(e){this.trainSortBy()!==e&&(this.trainSortBy.set(e),this.resetTrainGalleryScroll())}setTrainFilterDigit(e){this.trainFilterDigit()!==e&&(this.trainFilterDigit.set(e),this.resetTrainGalleryScroll())}refreshTrainCount(){this.trainCount.set(Jg())}selectTrainForInfer(e){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1),this.neuronalApp.onInferTrainSample(e)}inferRandom(){this.store.dispatch(S.uiInferRandomRequested())}toggleTestCarousel(){let e=this.neuronalApp.toggleTestImageCarouselState(this.testCarouselOn());e!==null&&this.testCarouselOn.set(e)}toggleSoftBrush(){let e=!this.softBrushOn();this.neuronalApp.setInferDrawBrushMode(e?"soft":"pixels"),this.softBrushOn.set(e)}onBrushSizeInput(e){let n=Number(e.target.value);this.brushSize.set(n),this.neuronalApp.setInferDrawBrushSize(n)}inferDraw(){this.store.dispatch(S.uiInferDrawRequested())}clearDraw(){this.store.dispatch(S.uiClearDrawRequested())}drawDown(e){this.neuronalApp.onDrawPointerDown(e)}drawMove(e){this.neuronalApp.onDrawPointerMove(e)}drawUp(){this.neuronalApp.onDrawPointerUp()}drawCancel(){this.neuronalApp.onDrawPointerCancel()}drawLeave(){this.neuronalApp.onDrawPointerLeave()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-infer-panel"]],viewQuery:function(n,i){n&1&&(zo(i.trainGalleryScrollEl,R3,5),zo(i.inferDrawCanvasEl,N3,5)),n&2&&$c(2)},decls:14,vars:7,consts:[["inferDrawCanvas",""],["trainGalleryScroll",""],["id","dockInfer",1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","flex-col","gap-3","border","shadow-xl","lg:flex-1"],[1,"card-body","min-h-0","flex","flex-1","flex-col","gap-3","p-3","sm:p-5"],[1,"shrink-0"],[1,"card-title","text-base"],[1,"text-base-content/60","text-xs"],["role","tablist","aria-label","Inferenz-Modus",1,"tabs","tabs-boxed","bg-base-300/50","shrink-0","p-1"],["type","button","role","tab","id","tab-infer-draw","aria-controls","panel-infer-draw",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["type","button","role","tab","id","tab-infer-train","aria-controls","panel-infer-train",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["id","panel-infer-draw","role","tabpanel","aria-labelledby","tab-infer-draw",1,"flex","min-h-0","flex-1","flex-col","gap-3"],["id","panel-infer-train","role","tabpanel","aria-labelledby","tab-infer-train",1,"flex","min-h-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","flex-wrap","gap-2"],["id","btnInferRandom","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnTestCarousel","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],[1,"flex","w-full","max-w-[min(280px,100%)]","flex-col","gap-1","self-center"],[1,"text-base-content/70","flex","items-center","justify-between","gap-2","text-xs"],[1,"text-base-content","font-medium"],[1,"tabular-nums"],["type","range","step","1",1,"range","range-primary","range-sm","w-full",3,"input","min","max","value"],["id","drawCanvas","width","28","height","28",1,"border-base-300/60","h-auto","w-[min(280px,100%)]","touch-none","self-center","rounded-xl","border","bg-black","shadow-xl","[image-rendering:pixelated]",3,"contextmenu","pointerdown","pointermove","pointerup","pointercancel","pointerleave"],["id","drawActions",1,"flex","w-full","max-w-[290px]","flex-col","gap-2","self-center"],[1,"grid","grid-cols-2","gap-2"],["id","btnInferDraw","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnClearDraw","type","button",1,"btn","btn-ghost","btn-sm",3,"click"],["type","button",1,"btn","btn-ghost","btn-sm","w-full",3,"click"],[1,"text-base-content/60","shrink-0","text-xs","leading-snug"],[1,"flex","shrink-0","flex-col","gap-2"],[1,"flex","flex-wrap","items-center","gap-2"],[1,"text-base-content/70","text-[11px]"],["type","button",1,"btn","btn-outline","btn-xs","sm:btn-sm",3,"click"],[1,"flex","flex-col","gap-1"],[1,"flex","flex-wrap","gap-1"],["type","button",1,"btn","btn-xs","flex-1","min-w-10","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"btn-primary"],[1,"text-warning","shrink-0","text-xs"],[1,"border-base-300/60","min-h-0","flex-1","overflow-y-auto","rounded-lg","border",2,"max-height","min(22rem, 50vh)",3,"scroll"],[1,"relative","w-full"],[1,"absolute","box-border","w-full","px-1","py-0.5",3,"top","height"],[1,"text-base-content/50","shrink-0","text-[11px]","tabular-nums"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"click"],[1,"absolute","box-border","w-full","px-1","py-0.5"],[3,"pick","index"]],template:function(n,i){n&1&&(h(0,"article",2)(1,"div",3)(2,"div",4)(3,"h2",5),x(4,"Inferenz"),p(),h(5,"p",6),x(6," Direkt mit dem aktiven Modell testen "),p()(),h(7,"div",7)(8,"button",8),C("click",function(){return i.inferUiTab.set("draw")}),x(9," Zeichnung & Test "),p(),h(10,"button",9),C("click",function(){return i.inferUiTab.set("train")}),x(11," Trainingsbilder "),p()(),Ue(12,L3,23,13,"div",10)(13,z3,28,9,"div",11),p()()),n&2&&(_(8),qe("tab-active",i.inferUiTab()==="draw"),ee("aria-selected",i.inferUiTab()==="draw"),_(2),qe("tab-active",i.inferUiTab()==="train"),ee("aria-selected",i.inferUiTab()==="train"),_(2),ze(i.inferUiTab()==="draw"?12:13))},dependencies:[Id],encapsulation:2,changeDetection:0})};var B3=["*"];function H3(t,e){t&1&&be(0,"input",1)}function W3(t,e){t&1&&be(0,"input",2)}var Dd=class t{heading=ra.required();defaultExpanded=ra(!0);static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-viz-settings-block"]],inputs:{heading:[1,"heading"],defaultExpanded:[1,"defaultExpanded"]},ngContentSelectors:B3,decls:8,vars:2,consts:[[1,"collapse","collapse-arrow","min-w-0","border","border-base-300","bg-base-100"],["type","checkbox","checked","",1,"min-h-0"],["type","checkbox",1,"min-h-0"],[1,"collapse-title","py-2","text-[0.62rem]","font-semibold","uppercase","tracking-[0.14em]"],[1,"collapse-content","text-sm"],[1,"flex","min-w-0","flex-col","gap-3","pb-1","pt-0"]],template:function(n,i){n&1&&(tb(),h(0,"div",0),Ue(1,H3,1,0,"input",1)(2,W3,1,0,"input",2),h(3,"div",3),x(4),p(),h(5,"div",4)(6,"div",5),nb(7),p()()()),n&2&&(_(),ze(i.defaultExpanded()?1:2),_(3),pe(" ",i.heading()," "))},encapsulation:2,changeDetection:0})};var j3=["fpsSparkline"],G3=["vizMount"],Ad=(t,e)=>e.id;function $3(t,e){if(t&1){let n=pt();h(0,"button",15),C("click",function(){T(n);let r=E();return I(r.closeVizSettings())}),p()}}function q3(t,e){if(t&1&&(h(0,"option",51),x(1),p()),t&2){let n=e.$implicit,i=E(2);N("value",n.id)("selected",n.id===i.model().vibeCamera.controlMode),_(),pe(" ",n.label," ")}}function X3(t,e){t&1&&(h(0,"option",54),x(1," Benutzerdefiniert "),p())}function Y3(t,e){if(t&1&&(h(0,"option",55),x(1),p()),t&2){let n=e.$implicit;N("value",n.id),_(),we(n.label)}}function Z3(t,e){if(t&1&&(h(0,"option",55),x(1),p()),t&2){let n=e.$implicit;N("value",n.id),_(),we(n.label)}}function K3(t,e){if(t&1&&(h(0,"option",55),x(1),p()),t&2){let n=e.$implicit;N("value",n.id),_(),we(n.label)}}function J3(t,e){t&1&&(h(0,"option",54),x(1," Benutzerdefiniert (Farben manuell ge\xE4ndert) "),p())}function Q3(t,e){if(t&1&&(h(0,"option",55),x(1),p()),t&2){let n=e.$implicit;N("value",n),_(),we(n)}}function eV(t,e){if(t&1){let n=pt();h(0,"aside",16)(1,"div",17)(2,"span",18),x(3,"3D-Einstellungen"),p(),h(4,"button",19),C("click",function(){T(n);let r=E();return I(r.closeVizSettings())}),x(5," \u2715 "),p()(),h(6,"app-viz-settings-block",20)(7,"div",21)(8,"label",22),x(9,"Darstellung"),p(),h(10,"select",23),C("change",function(r){T(n);let o=E();return I(o.onInputLayout(r))}),h(11,"option",24),x(12,"28\xD728 Pixel"),p(),h(13,"option",25),x(14,"Ring"),p(),h(15,"option",26),x(16,"Raster"),p(),h(17,"option",27),x(18,"Linie"),p(),h(19,"option",28),x(20,"Bogen, Richtung 1"),p(),h(21,"option",29),x(22,"Bogen, Richtung 2"),p()()(),h(23,"div",21)(24,"label",30),x(25,"Skala"),p(),h(26,"div",31)(27,"input",32),C("input",function(r){T(n);let o=E();return I(o.onInputScale(r))}),p(),h(28,"span",33),x(29),je(30,"number"),p()()()(),h(31,"app-viz-settings-block",34)(32,"div",21)(33,"label",35),x(34,"Darstellung"),p(),h(35,"select",36),C("change",function(r){T(n);let o=E();return I(o.onHiddenLayout(0,r))}),h(36,"option",25),x(37,"Ring"),p(),h(38,"option",26),x(39,"Raster"),p(),h(40,"option",27),x(41,"Linie"),p(),h(42,"option",28),x(43,"Bogen, Richtung 1"),p(),h(44,"option",29),x(45,"Bogen, Richtung 2"),p()()(),h(46,"div",21)(47,"label",37),x(48,"Skala"),p(),h(49,"div",31)(50,"input",38),C("input",function(r){T(n);let o=E();return I(o.onScale(0,r))}),p(),h(51,"span",33),x(52),je(53,"number"),p()()()(),h(54,"app-viz-settings-block",39)(55,"div",21)(56,"label",40),x(57,"Darstellung"),p(),h(58,"select",41),C("change",function(r){T(n);let o=E();return I(o.onHiddenLayout(1,r))}),h(59,"option",25),x(60,"Ring"),p(),h(61,"option",26),x(62,"Raster"),p(),h(63,"option",27),x(64,"Linie"),p(),h(65,"option",28),x(66,"Bogen, Richtung 1"),p(),h(67,"option",29),x(68,"Bogen, Richtung 2"),p()()(),h(69,"div",21)(70,"label",42),x(71,"Skala"),p(),h(72,"div",31)(73,"input",43),C("input",function(r){T(n);let o=E();return I(o.onScale(1,r))}),p(),h(74,"span",33),x(75),je(76,"number"),p()()()(),h(77,"app-viz-settings-block",44)(78,"div",21)(79,"label",45),x(80,"Max. Gr\xF6\xDFe aktiver Neuronen"),p(),h(81,"div",31)(82,"input",46),C("input",function(r){T(n);let o=E();return I(o.onActiveNeuronMaxMul(r))}),p(),h(83,"span",33),x(84),je(85,"number"),p()()()(),h(86,"app-viz-settings-block",47)(87,"div",48)(88,"div",21)(89,"label",49),x(90,"Steuerung"),p(),h(91,"select",50),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraControlMode(r))}),Ze(92,q3,2,3,"option",51,Ad),p()(),h(94,"div",21)(95,"label",52),x(96,"Stil"),p(),h(97,"select",53),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraProfile(r))}),Ue(98,X3,2,0,"option",54),Ze(99,Y3,2,2,"option",55,Ad),p()(),h(101,"div",21)(102,"label",56),x(103,"Tempo"),p(),h(104,"div",31)(105,"input",57),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraTuning("speed",r))}),p(),h(106,"span",58),x(107),je(108,"number"),p()()(),h(109,"div",21)(110,"label",59),x(111,"Weitwinkel"),p(),h(112,"div",31)(113,"input",60),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraTuning("pullOut",r))}),p(),h(114,"span",33),x(115),je(116,"number"),p()()(),h(117,"div",21)(118,"label",61),x(119,"Pfad-Wildheit"),p(),h(120,"div",31)(121,"input",62),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraTuning("pathWildness",r))}),p(),h(122,"span",33),x(123),je(124,"number"),p()()(),h(125,"div",21)(126,"label",63),x(127,"Durchquerung"),p(),h(128,"div",31)(129,"input",64),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraTuning("pathTraverse",r))}),p(),h(130,"span",33),x(131),je(132,"number"),p()()(),h(133,"div",21)(134,"label",65),x(135,"Blick-Wanderung"),p(),h(136,"div",31)(137,"input",66),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraTuning("lookWander",r))}),p(),h(138,"span",33),x(139),je(140,"number"),p()()(),h(141,"div",21)(142,"label",67),x(143,"Pfad-Segmente voraus"),p(),h(144,"div",31)(145,"input",68),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraPlanning("pathQueueSize",r))}),p(),h(146,"span",69),x(147),p()()(),h(148,"div",21)(149,"label",70),x(150,"Max. Segmentl\xE4nge"),p(),h(151,"div",31)(152,"input",71),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraPlanning("maxSegmentChord",r))}),p(),h(153,"span",69),x(154),je(155,"number"),p()()(),h(156,"div",21)(157,"label",72),x(158,"Pfad-Radius"),p(),h(159,"div",31)(160,"input",73),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraPlanning("pathHorizonRadiusScale",r))}),p(),h(161,"span",69),x(162),je(163,"number"),p()()(),h(164,"label",74)(165,"span",75),x(166,"Radius-Vorschau"),p(),h(167,"input",76),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraPathHorizonSpherePreview(r))}),p()(),h(168,"label",74)(169,"span",75),x(170,"Pfad-Vorschau"),p(),h(171,"input",76),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraPathPreview(r))}),p()(),h(172,"div",21)(173,"label",77),x(174,"Pfad-Farben"),p(),h(175,"select",78),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraPathPreviewColorMode(r))}),Ze(176,Z3,2,2,"option",55,Ad),p()(),h(178,"div",21)(179,"label",79),x(180,"Theme-Farbe"),p(),h(181,"select",80),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraPathPreviewThemeColor(r))}),Ze(182,K3,2,2,"option",55,Ad),p()(),h(184,"label",74)(185,"span",75),x(186,"Pfad-Kugeln"),p(),h(187,"input",81),C("change",function(r){T(n);let o=E();return I(o.onVibeCameraPathPreviewMarkers(r))}),p()(),h(188,"div",21)(189,"label",82),x(190,"Kugelgr\xF6\xDFe"),p(),h(191,"div",31)(192,"input",83),C("input",function(r){T(n);let o=E();return I(o.onVibeCameraPlanning("pathPreviewMarkerSize",r))}),p(),h(193,"span",69),x(194),je(195,"number"),p()()()()(),h(196,"app-viz-settings-block",84)(197,"div",85)(198,"div",86)(199,"label",87),x(200,"Emissive"),p(),h(201,"input",88),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronEmissive",r))}),p()(),h(202,"div",21)(203,"label",89),x(204,"Intensit\xE4t (aktiv)"),p(),h(205,"div",31)(206,"input",90),C("input",function(r){T(n);let o=E();return I(o.onNetworkNumber("neuronEmissiveIntensityActive",r))}),p(),h(207,"span",69),x(208),je(209,"number"),p()()(),h(210,"div",21)(211,"label",91),x(212,"Intensit\xE4t (ruhend)"),p(),h(213,"div",31)(214,"input",92),C("input",function(r){T(n);let o=E();return I(o.onNetworkNumber("neuronEmissiveIntensityIdle",r))}),p(),h(215,"span",69),x(216),je(217,"number"),p()()()()(),h(218,"app-viz-settings-block",93)(219,"div",85)(220,"div",94)(221,"span",95),x(222,"Zwischenlagen kalt"),p(),h(223,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronHiddenCold",r))}),p()(),h(224,"div",94)(225,"span",95),x(226,"Zwischenlagen warm"),p(),h(227,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronHiddenHot",r))}),p()(),h(228,"div",94)(229,"span",95),x(230,"Eingabe kalt"),p(),h(231,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronInputCold",r))}),p()(),h(232,"div",94)(233,"span",95),x(234,"Eingabe warm"),p(),h(235,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronInputHot",r))}),p()(),h(236,"div",94)(237,"span",95),x(238,"Ausgabe kalt"),p(),h(239,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronOutputCold",r))}),p()(),h(240,"div",94)(241,"span",95),x(242,"Ausgabe warm"),p(),h(243,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("neuronOutputHot",r))}),p()()()(),h(244,"app-viz-settings-block",97)(245,"div",85)(246,"div",94)(247,"span",95),x(248,"Positiv schwach"),p(),h(249,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgePositiveCold",r))}),p()(),h(250,"div",94)(251,"span",95),x(252,"Positiv stark"),p(),h(253,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgePositiveHot",r))}),p()(),h(254,"div",94)(255,"span",95),x(256,"Negativ schwach"),p(),h(257,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgeNegativeCold",r))}),p()(),h(258,"div",94)(259,"span",95),x(260,"Negativ stark"),p(),h(261,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgeNegativeHot",r))}),p()(),h(262,"div",94)(263,"span",95),x(264,"Inferenz ausgeblendet"),p(),h(265,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgeInferMuted",r))}),p()(),h(266,"div",94)(267,"span",95),x(268,"Training (zuletzt)"),p(),h(269,"input",96),C("change",function(r){T(n);let o=E();return I(o.onNetworkColorHex("edgeTrainRecent",r))}),p()()()(),h(270,"app-viz-settings-block",98)(271,"div",48)(272,"label",74)(273,"span",75),x(274,"Bloom (Glow)"),p(),h(275,"input",76),C("change",function(r){T(n);let o=E();return I(o.onPostBool("bloomEnabled",r))}),p()(),h(276,"div",21)(277,"label",99),x(278,"Bloom-St\xE4rke"),p(),h(279,"div",31)(280,"input",100),C("input",function(r){T(n);let o=E();return I(o.onPostNumber("bloomStrength",r))}),p(),h(281,"span",58),x(282),je(283,"number"),p()()(),h(284,"div",21)(285,"label",99),x(286,"Bloom-Radius"),p(),h(287,"div",31)(288,"input",101),C("input",function(r){T(n);let o=E();return I(o.onPostNumber("bloomRadius",r))}),p(),h(289,"span",58),x(290),je(291,"number"),p()()(),h(292,"div",21)(293,"label",99),x(294,"Bloom-Schwelle"),p(),h(295,"div",31)(296,"input",101),C("input",function(r){T(n);let o=E();return I(o.onPostNumber("bloomThreshold",r))}),p(),h(297,"span",58),x(298),je(299,"number"),p()()(),h(300,"label",74)(301,"span",75),x(302,"FXAA (Kantengl\xE4ttung)"),p(),h(303,"input",76),C("change",function(r){T(n);let o=E();return I(o.onPostBool("fxaaEnabled",r))}),p()(),h(304,"div",21)(305,"label",99),x(306,"Belichtung (Tone mapping)"),p(),h(307,"div",31)(308,"input",102),C("input",function(r){T(n);let o=E();return I(o.onPostNumber("toneMappingExposure",r))}),p(),h(309,"span",58),x(310),je(311,"number"),p()()()()(),h(312,"app-viz-settings-block",103)(313,"div",104)(314,"label",105),x(315,"Vorlage f\xFCr Szene, Licht und Netzwerkfarben"),p(),h(316,"select",106),C("change",function(r){T(n);let o=E();return I(o.onColorPresetSelect(r))}),Ue(317,J3,2,0,"option",54),h(318,"option",107),x(319,"Wie App-Theme"),p(),Ze(320,Q3,2,2,"option",55,Ii),p(),h(322,"p",108),x(323," Die Werte werden aus den DaisyUI-Theme-Variablen abgeleitet. Bei \u201EWie App-Theme\u201C aktualisiert sich die 3D-Palette automatisch, wenn du das App-Theme wechselst. "),p()()(),h(324,"app-viz-settings-block",109)(325,"div",85)(326,"div",86)(327,"label",110),x(328,"Hintergrund & Nebel"),p(),h(329,"input",111),C("input",function(r){T(n);let o=E();return I(o.onSceneColorInput("backgroundFog",r))})("change",function(r){T(n);let o=E();return I(o.onSceneColorCommit("backgroundFog",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(330,"div",112)(331,"label",113),x(332,"Nebel nah (Sichtbeginn)"),p(),h(333,"div",31)(334,"input",114),C("input",function(r){T(n);let o=E();return I(o.onSceneFogNumber("fogNear",r))}),p(),h(335,"span",115),x(336),je(337,"number"),p()()(),h(338,"div",112)(339,"label",116),x(340,"Nebel weit (Sichtende)"),p(),h(341,"div",31)(342,"input",117),C("input",function(r){T(n);let o=E();return I(o.onSceneFogNumber("fogFar",r))}),p(),h(343,"span",115),x(344),je(345,"number"),p()()(),h(346,"label",74)(347,"span",75),x(348,"Boden anzeigen"),p(),h(349,"input",76),C("change",function(r){T(n);let o=E();return I(o.onSceneFloorVisible(r))}),p()(),h(350,"div",86)(351,"label",118),x(352,"Bodenfarbe"),p(),h(353,"input",119),C("input",function(r){T(n);let o=E();return I(o.onSceneColorInput("floor",r))})("change",function(r){T(n);let o=E();return I(o.onSceneColorCommit("floor",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()()()(),h(354,"app-viz-settings-block",120)(355,"div",85)(356,"div",86)(357,"label",121),x(358,"Hemisph\xE4re (oben)"),p(),h(359,"input",122),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("hemiSky",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("hemiSky",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(360,"div",86)(361,"label",123),x(362,"Hemisph\xE4re (unten)"),p(),h(363,"input",124),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("hemiGround",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("hemiGround",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(364,"div",86)(365,"label",125),x(366,"Umgebungslicht"),p(),h(367,"input",126),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("ambient",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("ambient",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(368,"div",86)(369,"label",127),x(370,"Key-Licht"),p(),h(371,"input",128),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("key",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("key",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(372,"div",86)(373,"label",129),x(374,"Fill-Licht"),p(),h(375,"input",130),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("fill",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("fill",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(376,"div",86)(377,"label",131),x(378,"Rim-Licht"),p(),h(379,"input",132),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("rim",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("rim",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()(),h(380,"div",86)(381,"label",133),x(382,"Akzent hinten"),p(),h(383,"input",134),C("input",function(r){T(n);let o=E();return I(o.onLightColorInput("backAccent",r))})("change",function(r){T(n);let o=E();return I(o.onLightColorCommit("backAccent",r))})("blur",function(){T(n);let r=E();return I(r.onVizColorPickerBlur())}),p()()()()()}if(t&2){let n=E();qe("max-lg:-translate-x-full",!n.vizSettingsOpen()),_(10),N("value",n.model().inputLayerLayout),_(17),N("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().inputLayerScale),_(2),we(Je(30,100,n.model().inputLayerScale,"1.0-2")),_(6),N("value",n.model().hiddenLayerLayouts[0]),_(15),N("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[0]),_(2),we(Je(53,103,n.model().hiddenLayerScales[0],"1.0-2")),_(6),N("value",n.model().hiddenLayerLayouts[1]),_(15),N("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[1]),_(2),we(Je(76,106,n.model().hiddenLayerScales[1],"1.0-2")),_(7),N("min",n.neuronMulMin)("max",n.neuronMulMax)("step",n.neuronMulStep)("value",n.model().activeNeuronMaxScaleMul),_(2),we(Je(85,109,n.model().activeNeuronMaxScaleMul,"1.0-2")),_(8),Ke(n.vibeCameraControlModeEntries),_(5),N("value",n.vibeCameraProfileSelectValue()),_(),ze(n.model().vibeCamera.profileMode==="custom"?98:-1),_(),Ke(n.vibeCameraProfileEntries),_(6),N("value",n.model().vibeCamera.speed),_(2),we(Je(108,112,n.model().vibeCamera.speed,"1.0-0")),_(6),N("value",n.model().vibeCamera.pullOut),_(2),we(Je(116,115,n.model().vibeCamera.pullOut,"1.0-2")),_(6),N("value",n.model().vibeCamera.pathWildness),_(2),we(Je(124,118,n.model().vibeCamera.pathWildness,"1.0-2")),_(6),N("value",n.model().vibeCamera.pathTraverse),_(2),we(Je(132,121,n.model().vibeCamera.pathTraverse,"1.0-2")),_(6),N("value",n.model().vibeCamera.lookWander),_(2),we(Je(140,124,n.model().vibeCamera.lookWander,"1.0-2")),_(6),N("value",n.model().vibeCamera.pathQueueSize),_(2),we(n.model().vibeCamera.pathQueueSize),_(5),N("value",n.model().vibeCamera.maxSegmentChord),_(2),we(Je(155,127,n.model().vibeCamera.maxSegmentChord,"1.0-1")),_(6),N("min",n.pathHorizonRadiusMin)("max",n.pathHorizonRadiusMax)("value",n.model().vibeCamera.pathHorizonRadiusScale),_(2),we(Je(163,130,n.model().vibeCamera.pathHorizonRadiusScale,"1.0-2")),_(5),N("checked",n.model().vibeCamera.pathHorizonSpherePreview),_(4),N("checked",n.model().vibeCamera.pathPreview),_(4),N("disabled",!n.model().vibeCamera.pathPreview)("value",n.model().vibeCamera.pathPreviewColorMode),_(),Ke(n.vibePathPreviewColorModeEntries),_(5),N("disabled",!n.model().vibeCamera.pathPreview||n.model().vibeCamera.pathPreviewColorMode!=="themeGradient")("value",n.model().vibeCamera.pathPreviewThemeColor),_(),Ke(n.vibePathPreviewThemeColorEntries),_(5),N("checked",n.model().vibeCamera.pathPreviewMarkers)("disabled",!n.model().vibeCamera.pathPreview),_(5),N("value",n.model().vibeCamera.pathPreviewMarkerSize)("disabled",!n.model().vibeCamera.pathPreview||!n.model().vibeCamera.pathPreviewMarkers),_(2),we(Je(195,133,n.model().vibeCamera.pathPreviewMarkerSize,"1.0-2")),_(7),N("value",n.model().networkColors.neuronEmissive),_(5),N("value",n.model().networkColors.neuronEmissiveIntensityActive),_(2),we(Je(209,136,n.model().networkColors.neuronEmissiveIntensityActive,"1.0-2")),_(6),N("value",n.model().networkColors.neuronEmissiveIntensityIdle),_(2),we(Je(217,139,n.model().networkColors.neuronEmissiveIntensityIdle,"1.0-2")),_(7),N("value",n.model().networkColors.neuronHiddenCold),_(4),N("value",n.model().networkColors.neuronHiddenHot),_(4),N("value",n.model().networkColors.neuronInputCold),_(4),N("value",n.model().networkColors.neuronInputHot),_(4),N("value",n.model().networkColors.neuronOutputCold),_(4),N("value",n.model().networkColors.neuronOutputHot),_(6),N("value",n.model().networkColors.edgePositiveCold),_(4),N("value",n.model().networkColors.edgePositiveHot),_(4),N("value",n.model().networkColors.edgeNegativeCold),_(4),N("value",n.model().networkColors.edgeNegativeHot),_(4),N("value",n.model().networkColors.edgeInferMuted),_(4),N("value",n.model().networkColors.edgeTrainRecent),_(6),N("checked",n.model().postProcess.bloomEnabled),_(5),N("value",n.model().postProcess.bloomStrength),_(2),we(Je(283,142,n.model().postProcess.bloomStrength,"1.0-2")),_(6),N("value",n.model().postProcess.bloomRadius),_(2),we(Je(291,145,n.model().postProcess.bloomRadius,"1.0-2")),_(6),N("value",n.model().postProcess.bloomThreshold),_(2),we(Je(299,148,n.model().postProcess.bloomThreshold,"1.0-2")),_(5),N("checked",n.model().postProcess.fxaaEnabled),_(5),N("value",n.model().postProcess.toneMappingExposure),_(2),we(Je(311,151,n.model().postProcess.toneMappingExposure,"1.0-2")),_(6),N("value",n.colorPresetSelectValue()),_(),ze(n.model().colorPresetMode==="custom"?317:-1),_(3),Ke(n.daisyThemeNames),_(9),N("value",n.model().sceneColors.backgroundFog),_(5),N("value",n.model().sceneColors.fogNear),_(2),we(Je(337,154,n.model().sceneColors.fogNear,"1.0-1")),_(6),N("value",n.model().sceneColors.fogFar),_(2),we(Je(345,157,n.model().sceneColors.fogFar,"1.0-0")),_(5),N("checked",n.model().sceneColors.floorVisible),_(4),N("value",n.model().sceneColors.floor)("disabled",!n.model().sceneColors.floorVisible),_(6),N("value",n.model().lightColors.hemiSky),_(4),N("value",n.model().lightColors.hemiGround),_(4),N("value",n.model().lightColors.ambient),_(4),N("value",n.model().lightColors.key),_(4),N("value",n.model().lightColors.fill),_(4),N("value",n.model().lightColors.rim),_(4),N("value",n.model().lightColors.backAccent)}}function tV(t,e){if(t&1){let n=pt();h(0,"button",135),C("click",function(){T(n);let r=E();return I(r.toggleVizSettings())}),x(1),p()}if(t&2){let n=E();ee("aria-expanded",n.vizSettingsOpen()),_(),pe(" ",n.vizSettingsOpen()?"Schlie\xDFen":"3D-Einst."," ")}}function nV(t,e){if(t&1&&(h(0,"div",14)(1,"div",136),x(2),p(),be(3,"canvas",137,1),p()),t&2){let n=E();_(2),pe(" ",n.fpsDisplay()," FPS ")}}var cl=class t{static THEME_ROTATE_MS=4200;doc=w(Ge);store=w(me);ngZone=w(Le);neuronalApp=w(ln);daisyThemeNames=[...Li];vibeCameraOn=Ie(id());themeRotateOn=Ie(!1);fpsOverlayOn=Ie(!1);vizSettingsOpen=Ie(!1);fpsDisplay=Ie(0);fpsHistory=Ie([]);themeRotateTimer=null;themeRotateIndex=0;fpsSmoothingAnimationFrame=0;pendingFramesPerSecond=0;fpsSparklineCanvasRef=Oo("fpsSparkline");redrawFpsSparklineEffect=zn(()=>{let e=this.fpsHistory(),n=this.fpsSparklineCanvasRef();n&&queueMicrotask(()=>this.drawFpsSparkline(n.nativeElement,e))});scaleMin=xv;scaleMax=bv;scaleStep=qM;model=_e(this.store.select(Cg),{requireSync:!0});immersive=_e(this.store.select(qa),{initialValue:!1});neuronMulMin=Sv;neuronMulMax=wv;neuronMulStep=XM;vibeCameraProfileEntries=Object.keys(wg).map(e=>({id:e,label:wg[e]}));vibeCameraControlModeEntries=Object.keys(xg).map(e=>({id:e,label:xg[e]}));vibePathPreviewColorModeEntries=Object.keys(bg).map(e=>({id:e,label:bg[e]}));vibePathPreviewThemeColorEntries=Object.keys(Sg).map(e=>({id:e,label:Sg[e]}));pathHorizonRadiusMin=Mg;pathHorizonRadiusMax=Eg;vizMountEl=Oo("vizMount");onVizFramesPerSecondSample=e=>{this.pendingFramesPerSecond=e,this.fpsSmoothingAnimationFrame===0&&(this.fpsSmoothingAnimationFrame=requestAnimationFrame(()=>{this.fpsSmoothingAnimationFrame=0;let n=this.pendingFramesPerSecond;this.ngZone.run(()=>{this.fpsOverlayOn()&&(this.fpsDisplay.set(Math.round(n)),this.fpsHistory.update(i=>{let r=[...i,n];return r.length>96?r.slice(-96):r}))})}))};onNetworkColorHex(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizNetworkColorsPatch({patch:{[e]:i.value}}))}onNetworkNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizNetworkColorsPatch({patch:{[e]:r}}))}onPostBool(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="checkbox"||this.store.dispatch(S.vizPostProcessPatch({patch:{[e]:i.checked}}))}onPostNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizPostProcessPatch({patch:{[e]:r}}))}colorPresetSelectValue(){let e=this.model();return e.colorPresetMode==="custom"?"__custom__":e.colorPresetMode==="followUi"?"followUi":e.colorPresetFixedTheme}onColorPresetSelect(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="__custom__"){if(i==="followUi"){this.store.dispatch(S.viz3dColorPresetModeChanged({mode:"followUi"}));return}qn(i)&&this.store.dispatch(S.viz3dColorPresetModeChanged({mode:"fixedTheme",fixedTheme:i}))}}onInputLayout(e){let n=e.target;n instanceof HTMLSelectElement&&this.store.dispatch(S.vizInputLayerLayoutChanged({raw:n.value}))}onInputScale(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(S.vizInputLayerScaleChanged({scale:i}))}onHiddenLayout(e,n){let i=n.target;i instanceof HTMLSelectElement&&this.store.dispatch(S.vizHiddenLayerLayoutChanged({index:e,raw:i.value}))}onScale(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizHiddenLayerScaleChanged({index:e,scale:r}))}onActiveNeuronMaxMul(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(S.vizActiveNeuronMaxScaleMulChanged({mul:i}))}vibeCameraProfileSelectValue(){let e=this.model().vibeCamera.profileMode;return e==="custom"?"__custom__":e}onVibeCameraControlMode(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="followPath"&&i!=="freeLook")return;let r=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",controlMode:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{controlMode:r.controlMode}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraProfile(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="__custom__"&&(i==="smooth"||i==="balanced"||i==="funky"||i==="rocket")){let r=Gu(i);this.store.dispatch(S.vizVibeCameraProfileChanged({profile:i})),this.pushVibeCameraTuningToRuntime(r)}}onVibeCameraTuning(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);if(!Number.isFinite(r))return;let o=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",[e]:r}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{[e]:r}})),this.pushVibeCameraTuningToRuntime(o)}onVibeCameraPlanning(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=e==="pathQueueSize"?parseInt(i.value,10):parseFloat(i.value);if(!Number.isFinite(r))return;let o=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",[e]:r})),s=e==="pathQueueSize"?o.pathQueueSize:e==="maxSegmentChord"?o.maxSegmentChord:e==="pathHorizonRadiusScale"?o.pathHorizonRadiusScale:o.pathPreviewMarkerSize;this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{[e]:s}})),this.pushVibeCameraTuningToRuntime(o)}onVibeCameraPathPreviewColorMode(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="random"&&i!=="themeGradient")return;let r=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewColorMode:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewColorMode:r.pathPreviewColorMode}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraPathPreviewThemeColor(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="primary"&&i!=="accent"&&i!=="secondary"&&i!=="info")return;let r=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewThemeColor:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewThemeColor:r.pathPreviewThemeColor}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraPathPreviewMarkers(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewMarkers:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewMarkers:i.pathPreviewMarkers}})),this.pushVibeCameraTuningToRuntime(i)}onVibeCameraPathHorizonSpherePreview(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",pathHorizonSpherePreview:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathHorizonSpherePreview:n.checked}})),this.pushVibeCameraTuningToRuntime(i)}onVibeCameraPathPreview(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=gt(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreview:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreview:n.checked}})),this.pushVibeCameraTuningToRuntime(i)}pushVibeCameraTuningToRuntime(e){this.ngZone.runOutsideAngular(()=>{this.neuronalApp.onVibeCameraSettingsApply(e)})}onSceneColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizSceneColor(e,r)})}onSceneColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizSceneColorChanged({key:e,color:i.value}))}onSceneFogNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizSceneColorsPatch({patch:{[e]:r}}))}onSceneFloorVisible(e){let n=e.target;!(n instanceof HTMLInputElement)||n.type!=="checkbox"||this.store.dispatch(S.vizSceneColorsPatch({patch:{floorVisible:n.checked}}))}onLightColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizLightColor(e,r)})}onLightColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizLightColorChanged({key:e,color:i.value}))}onVizColorPickerBlur(){this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}ngOnDestroy(){this.clearFpsOverlayState(),this.clearThemeRotateTimer(),this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}toggleImmersive(){this.vizSettingsOpen.set(!1),this.store.dispatch(S.uiVizImmersiveToggled())}toggleVizSettings(){this.vizSettingsOpen.update(e=>!e)}closeVizSettings(){this.vizSettingsOpen.set(!1)}onDocumentKeydown(e){e.key!=="Escape"||!this.vizSettingsOpen()||this.closeVizSettings()}toggleVibeCamera(){let e=this.neuronalApp.toggleVibeCameraState(this.vibeCameraOn());e!==null&&this.vibeCameraOn.set(e)}toggleFpsOverlay(){if(this.fpsOverlayOn()){this.clearFpsOverlayState();return}this.fpsOverlayOn.set(!0),this.fpsHistory.set([]),this.fpsDisplay.set(0),this.neuronalApp.setVizFpsOverlay(!0,this.onVizFramesPerSecondSample)}clearFpsOverlayState(){this.neuronalApp.setVizFpsOverlay(!1,null),this.fpsOverlayOn.set(!1),this.fpsSmoothingAnimationFrame!==0&&(cancelAnimationFrame(this.fpsSmoothingAnimationFrame),this.fpsSmoothingAnimationFrame=0),this.fpsHistory.set([])}drawFpsSparkline(e,n){let i=Math.min(window.devicePixelRatio,2),r=112,o=32;e.width=Math.round(r*i),e.height=Math.round(o*i),e.style.width=`${r}px`,e.style.height=`${o}px`;let s=e.getContext("2d");if(!s)return;s.setTransform(i,0,0,i,0,0),s.clearRect(0,0,r,o);let a=2,l=r-a*2,c=o-a*2;if(n.length<2){s.fillStyle="rgba(148, 163, 184, 0.15)",s.fillRect(a,a,l,c);return}let u=n.reduce((v,b)=>b>v?b:v,48),d=Math.max(u*1.08,50),m=l/Math.max(1,n.length-1),f=v=>a+c-Math.min(d,Math.max(0,v))/d*c;s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((v,b)=>{s.lineTo(a+b*m,f(v))}),s.strokeStyle="rgba(148, 163, 184, 0.95)",s.lineWidth=1,s.lineJoin="round",s.stroke(),s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((v,b)=>{s.lineTo(a+b*m,f(v))}),s.lineTo(a+l,a+c),s.lineTo(a,a+c),s.closePath(),s.fillStyle="rgba(148, 163, 184, 0.14)",s.fill()}toggleThemeRotate(){if(this.themeRotateOn()){this.clearThemeRotateTimer(),this.themeRotateOn.set(!1);return}this.themeRotateOn.set(!0);let e=Ar(this.doc),n=Li.indexOf(e);this.themeRotateIndex=n>=0?n:0;let i=()=>{this.themeRotateIndex=(this.themeRotateIndex+1)%Li.length;let r=Li[this.themeRotateIndex];qu(this.doc,r),this.ngZone.run(()=>{this.store.dispatch(S.daisyUiAppThemeChanged({theme:r}))})};this.themeRotateTimer=window.setInterval(i,t.THEME_ROTATE_MS)}clearThemeRotateTimer(){this.themeRotateTimer!==null&&(window.clearInterval(this.themeRotateTimer),this.themeRotateTimer=null)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-network-viz3d-shell"]],viewQuery:function(n,i){n&1&&(zo(i.fpsSparklineCanvasRef,j3,5),zo(i.vizMountEl,G3,5)),n&2&&$c(2)},hostAttrs:[1,"flex","min-h-0","min-w-0","flex-1","flex-col"],hostBindings:function(n,i){n&1&&C("keydown",function(o){return i.onDocumentKeydown(o)},!1,ca)},decls:18,vars:12,consts:[["vizMount",""],["fpsSparkline",""],[1,"relative","flex","min-h-0","min-w-0","flex-1","flex-col","bg-base-300/25","lg:flex-row"],["type","button","aria-label","3D-Einstellungen schlie\xDFen",1,"fixed","inset-0","z-40","bg-black/40","max-lg:backdrop-blur-none","lg:hidden","lg:backdrop-blur-[2px]"],["aria-label","3D-Netz Darstellung",1,"flex","max-h-full","min-h-0","w-[min(100%,22rem)]","max-w-[22rem]","shrink-0","flex-col","gap-3","overflow-y-auto","overflow-x-hidden","border-r","border-base-300","bg-base-200","px-3","py-3","text-base-content","shadow-md","max-lg:fixed","max-lg:inset-y-0","max-lg:left-0","max-lg:z-50","max-lg:max-h-dvh","max-lg:transition-transform","max-lg:duration-200","lg:relative","lg:translate-x-0","lg:bg-base-200/90","lg:backdrop-blur-md",3,"max-lg:-translate-x-full"],[1,"relative","grid","min-h-0","min-w-0","flex-1","grid-cols-1","grid-rows-[minmax(0,1fr)]"],["id","viz",1,"col-start-1","row-start-1","min-h-0","min-w-0","size-full","max-h-full","touch-none"],[1,"pointer-events-none","col-start-1","row-start-1","z-10","relative","size-full"],["type","button",1,"btn","btn-outline","btn-xs","pointer-events-auto","absolute","left-2","top-2","z-20","shadow-lg","sm:btn-sm","lg:hidden"],[1,"pointer-events-auto","absolute","right-1","top-1","flex","max-w-[calc(100%-5.5rem)]","flex-row","flex-wrap","items-start","justify-end","gap-1","sm:right-2","sm:top-2","sm:max-w-none","sm:flex-col","sm:gap-2"],["type","button",1,"btn","btn-outline","btn-xs","shadow-lg","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-secondary","btn-xs","shadow-lg","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-accent","btn-xs","shadow-lg","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-ghost","btn-xs","border","border-base-300/80","bg-base-100","shadow-lg","max-lg:backdrop-blur-none","lg:bg-base-100/70","lg:backdrop-blur-sm","sm:btn-sm",3,"click"],["aria-live","polite",1,"absolute","bottom-2","left-2","flex","max-w-[min(100%,12rem)]","flex-col","gap-1","rounded-box","border","border-base-300/60","bg-base-100","px-2","py-1.5","text-[0.68rem]","shadow-lg","max-lg:backdrop-blur-none","lg:bg-base-100/75","lg:backdrop-blur-md"],["type","button","aria-label","3D-Einstellungen schlie\xDFen",1,"fixed","inset-0","z-40","bg-black/40","max-lg:backdrop-blur-none","lg:hidden","lg:backdrop-blur-[2px]",3,"click"],["aria-label","3D-Netz Darstellung",1,"flex","max-h-full","min-h-0","w-[min(100%,22rem)]","max-w-[22rem]","shrink-0","flex-col","gap-3","overflow-y-auto","overflow-x-hidden","border-r","border-base-300","bg-base-200","px-3","py-3","text-base-content","shadow-md","max-lg:fixed","max-lg:inset-y-0","max-lg:left-0","max-lg:z-50","max-lg:max-h-dvh","max-lg:transition-transform","max-lg:duration-200","lg:relative","lg:translate-x-0","lg:bg-base-200/90","lg:backdrop-blur-md"],[1,"flex","shrink-0","items-center","justify-between","gap-2","lg:hidden"],[1,"text-sm","font-semibold"],["type","button","aria-label","Schlie\xDFen",1,"btn","btn-ghost","btn-sm","btn-square",3,"click"],["heading","Eingabelayer"],[1,"min-w-0"],["for","inputLayerVizLayout",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","inputLayerVizLayout",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["value","pixels"],["value","ring"],["value","grid"],["value","line"],["value","arc"],["value","arcAlt"],["for","inputLayerVizScale",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],[1,"flex","min-w-0","items-center","gap-2"],["id","inputLayerVizScale","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],[1,"text-base-content/60","w-8","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["heading","Zwischenlage 1"],["for","hiddenLayerVizLayout0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout0",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale0","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Zwischenlage 2"],["for","hiddenLayerVizLayout1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout1",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale1","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Aktivit\xE4t"],["for","activeNeuronMaxMul",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","activeNeuronMaxMul","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Kamera-Vibe"],[1,"flex","flex-col","gap-3"],["for","vibeCameraControlMode",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraControlMode",1,"select","select-bordered","select-sm","w-full",3,"change"],[3,"value","selected"],["for","vibeCameraProfile",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraProfile",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["value","__custom__","disabled",""],[3,"value"],["for","vibeCameraSpeed",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraSpeed","type","range","min","0","max","100","step","1",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-9","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["for","vibeCameraPullOut",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPullOut","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraWildness",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraWildness","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathTraverse",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathTraverse","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraLookWander",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraLookWander","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathQueueSize",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathQueueSize","type","range","min","1","max","1000","step","1",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-10","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["for","vibeCameraMaxSegmentChord",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraMaxSegmentChord","type","range","min","2","max","80","step","0.5",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathHorizonRadius",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathHorizonRadius","type","range","step","0.05",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","value"],[1,"flex","cursor-pointer","items-center","justify-between","gap-2"],[1,"text-[0.68rem]","font-medium","text-base-content"],["type","checkbox",1,"toggle","toggle-primary","toggle-sm",3,"change","checked"],["for","vibeCameraPathPreviewColorMode",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathPreviewColorMode",1,"select","select-bordered","select-sm","w-full","min-w-0",3,"change","disabled","value"],["for","vibeCameraPathPreviewThemeColor",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathPreviewThemeColor",1,"select","select-bordered","select-sm","w-full","min-w-0",3,"change","disabled","value"],["type","checkbox",1,"toggle","toggle-primary","toggle-sm",3,"change","checked","disabled"],["for","vibeCameraPathMarkerSize",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathMarkerSize","type","range","min","0.04","max","0.8","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value","disabled"],["heading","Neuronen (Leuchten)"],[1,"flex","flex-col","gap-2.5"],[1,"flex","min-w-0","items-center","justify-between","gap-2"],["for","vizNeuronEmissive",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissive","type","color","title","Leuchtfarbe der Neuronen",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["for","vizNeuronEmissiveAct",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveAct","type","range","min","0.05","max","4","step","0.05",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vizNeuronEmissiveIdle",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveIdle","type","range","min","0","max","2","step","0.02",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["heading","Neuronen (Aktivit\xE4t)"],[1,"flex","min-w-0","flex-wrap","items-center","justify-between","gap-2"],[1,"text-[0.65rem]","text-base-content/80"],["type","color",1,"border-base-300","bg-base-100","h-8","w-14","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["heading","Kanten (Gewichte)"],["heading","Nachbearbeitung"],[1,"mb-1","block","text-[0.65rem]","font-medium","text-base-content/90"],["type","range","min","0","max","3","step","0.02",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],["type","range","min","0","max","1","step","0.01",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],["type","range","min","0.2","max","3","step","0.02",1,"range","range-accent","flex-1","min-w-0",3,"input","value"],["heading","3D-Farbschema (DaisyUI)"],[1,"flex","flex-col","gap-2"],["for","viz3dColorPreset",1,"text-[0.68rem]","font-medium","text-base-content/90"],["id","viz3dColorPreset",1,"select","select-bordered","select-sm","w-full","max-w-full","text-sm",3,"change","value"],["value","followUi"],[1,"text-[0.62rem]","leading-snug","text-base-content/55"],["heading","Szene & Umgebung"],["for","vizSceneBgFog",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneBgFog","type","color","title","Hintergrund und Nebelfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],[1,"flex","flex-col","gap-1"],["for","vizSceneFogNear",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFogNear","type","range","min","0.5","max","80","step","0.5",1,"range","range-xs","range-primary","min-w-0","flex-1",3,"input","value"],[1,"text-base-content/70","w-9","shrink-0","text-right","text-[0.62rem]","tabular-nums"],["for","vizSceneFogFar",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFogFar","type","range","min","5","max","200","step","1",1,"range","range-xs","range-primary","min-w-0","flex-1",3,"input","value"],["for","vizSceneFloor",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFloor","type","color","title","Bodenfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value","disabled"],["heading","Lichtfarben"],["for","vizLightHemiSky",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiSky","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightHemiGrd",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiGrd","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightAmb",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightAmb","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightKey",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightKey","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightFill",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightFill","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightRim",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightRim","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightBack",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightBack","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["type","button",1,"btn","btn-outline","btn-xs","pointer-events-auto","absolute","left-2","top-2","z-20","shadow-lg","sm:btn-sm","lg:hidden",3,"click"],[1,"text-base-content/90","font-medium","tabular-nums","leading-none"],["width","112","height","32","aria-hidden","true",1,"block","h-8","w-28","max-w-full","rounded-sm"]],template:function(n,i){if(n&1){let r=pt();h(0,"div",2),Ue(1,$3,1,0,"button",3)(2,eV,384,160,"aside",4),h(3,"div",5),be(4,"div",6,0),h(6,"div",7),Ue(7,tV,2,2,"button",8),h(8,"div",9)(9,"button",10),C("click",function(){return T(r),I(i.toggleImmersive())}),x(10),p(),h(11,"button",11),C("click",function(){return T(r),I(i.toggleVibeCamera())}),x(12),p(),h(13,"button",12),C("click",function(){return T(r),I(i.toggleThemeRotate())}),x(14),p(),h(15,"button",13),C("click",function(){return T(r),I(i.toggleFpsOverlay())}),x(16),p()(),Ue(17,nV,5,1,"div",14),p()()()}n&2&&(_(),ze(!i.immersive()&&i.vizSettingsOpen()?1:-1),_(),ze(i.immersive()?-1:2),_(5),ze(i.immersive()?-1:7),_(2),ee("aria-pressed",i.immersive()),_(),pe(" ",i.immersive()?"Leisten":"Nur 3D"," "),_(),ee("aria-pressed",i.vibeCameraOn()),_(),pe(" ",i.vibeCameraOn()?"Vibe aus":"Vibe"," "),_(),ee("aria-pressed",i.themeRotateOn()),_(),pe(" ",i.themeRotateOn()?"Theme aus":"Theme"," "),_(),ee("aria-pressed",i.fpsOverlayOn()),_(),pe(" ",i.fpsOverlayOn()?"FPS aus":"FPS"," "),_(),ze(i.fpsOverlayOn()?17:-1))},dependencies:[Up,Dd],encapsulation:2,changeDetection:0})};var Rd=class t{store=w(me);hp=_e(this.store.select(pg),{requireSync:!0});ui=_e(this.store.select(mg),{requireSync:!0});panel=_e(this.store.select(yg),{requireSync:!0});datasetRibbon=_e(this.store.select(ug),{requireSync:!0});activeTitle=_e(this.store.select(dg),{requireSync:!0});activeDetail=_e(this.store.select(fg),{requireSync:!0});epochHint=_e(this.store.select(hg),{requireSync:!0});saveAs(){this.store.dispatch(S.uiSaveAsRequested())}reset(){this.store.dispatch(S.uiResetRequested())}epochPreset(e){this.store.dispatch(S.uiEpochPresetRequested({epochs:e}))}epochsInput(e){let n=e.target.value;this.store.dispatch(S.uiEpochsInputChanged({raw:n}))}batchSizeInput(e){let n=e.target.value;this.store.dispatch(S.uiBatchSizeInputChanged({raw:n}))}lrInput(e){let n=e.target.value;this.store.dispatch(S.uiTrainLrInputChanged({raw:n}))}vizEveryInput(e){let n=e.target.value;this.store.dispatch(S.uiTrainVizEveryInputChanged({raw:n}))}trainStart(){this.store.dispatch(S.uiTrainStartRequested())}pauseToggle(){this.store.dispatch(S.trainingPauseToggled())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-training-panel"]],decls:48,vars:41,consts:[["id","dockTrain","aria-label","Training",1,"border-base-300","bg-base-200","rounded-box","flex","w-full","min-w-0","shrink-0","flex-wrap","items-center","gap-x-2","gap-y-2","border","px-2","py-2","shadow-sm","sm:gap-x-3","sm:px-3"],["aria-live","polite",1,"text-base-content/70","w-full","max-w-none","truncate","text-xs","sm:max-w-[14rem]","sm:w-auto"],[1,"border-base-300/50","flex","min-w-0","max-w-full","flex-col","gap-0.5","sm:max-w-[18rem]","sm:border-l","sm:pl-3"],[1,"text-base-content","truncate","text-sm","font-semibold"],[1,"text-base-content/60","truncate","text-xs","leading-snug"],[1,"border-base-300/50","flex","w-full","flex-wrap","items-center","gap-2","sm:w-auto","sm:border-l","sm:pl-3"],["id","btnSaveModelAs","type","button","title","Als neuen Stand speichern",1,"btn","btn-outline","btn-xs","flex-1","sm:btn-sm","sm:flex-none",3,"click","disabled"],["id","btnResetModel","type","button","title","Gewichte zur\xFCcksetzen",1,"btn","btn-ghost","btn-xs","flex-1","sm:btn-sm","sm:flex-none",3,"click","disabled"],[1,"text-base-content/60","text-[0.65rem]","font-semibold","uppercase","tracking-wide"],["id","epochPresetRow",1,"join","join-horizontal","flex-wrap"],["type","button",1,"epochPresetBtn","btn","join-item","btn-outline","btn-xs","sm:btn-sm",3,"click","disabled"],["for","epochsInput",1,"sr-only"],["id","epochsInput","type","number","min","1","max","200","step","1",1,"input","input-bordered","input-xs","w-14","sm:input-sm","sm:w-16",3,"input","disabled","value"],["aria-live","polite",1,"text-base-content/60","hidden","max-w-[10rem]","truncate","text-[0.65rem]","lg:block","xl:max-w-[14rem]"],["id","btnTrain","type","button",1,"btn","btn-primary","btn-sm","flex-1","sm:flex-none",3,"click","disabled"],["id","btnPause","type","button",1,"btn","btn-outline","btn-sm","flex-1","sm:flex-none",3,"click","disabled"],["id","trainAdvanced",1,"border-base-300/60","bg-base-300/30","rounded-btn","w-full","border","sm:w-auto"],[1,"text-base-content/70","cursor-pointer","px-2","py-1.5","text-xs","sm:px-3","sm:py-2","sm:text-sm"],[1,"border-base-300/40","grid","grid-cols-2","gap-x-3","gap-y-2","border-t","px-2","pb-2","pt-2","text-sm","sm:px-3","sm:pb-3"],["for","lrInput",1,"text-base-content/60","self-center","text-xs"],["id","lrInput","type","number","min","0.0001","max","1","step","0.0001",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","batchSizeInput",1,"text-base-content/60","self-center","text-xs"],["id","batchSizeInput","type","number","min","1","max","512","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","vizEveryInput",1,"text-base-content/60","self-center","text-xs"],["id","vizEveryInput","type","number","min","1","max","1000","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"]],template:function(n,i){n&1&&(h(0,"article",0)(1,"p",1),x(2),p(),h(3,"div",2)(4,"p",3),x(5),p(),h(6,"p",4),x(7),p()(),h(8,"div",5)(9,"button",6),C("click",function(){return i.saveAs()}),x(10," Speichern "),p(),h(11,"button",7),C("click",function(){return i.reset()}),x(12," Zur\xFCcksetzen "),p()(),h(13,"div",5)(14,"span",8),x(15,"Epochen"),p(),h(16,"div",9)(17,"button",10),C("click",function(){return i.epochPreset(1)}),x(18," 1 "),p(),h(19,"button",10),C("click",function(){return i.epochPreset(3)}),x(20," 3 "),p(),h(21,"button",10),C("click",function(){return i.epochPreset(10)}),x(22," 10 "),p(),h(23,"button",10),C("click",function(){return i.epochPreset(30)}),x(24," 30 "),p()(),h(25,"label",11),x(26,"Anzahl Epochen (1\u2013200)"),p(),h(27,"input",12),C("input",function(o){return i.epochsInput(o)}),p(),h(28,"p",13),x(29),p()(),h(30,"div",5)(31,"button",14),C("click",function(){return i.trainStart()}),x(32," Starten "),p(),h(33,"button",15),C("click",function(){return i.pauseToggle()}),x(34),p()(),h(35,"details",16)(36,"summary",17),x(37," Erweitert "),p(),h(38,"div",18)(39,"label",19),x(40,"Lernrate"),p(),h(41,"input",20),C("input",function(o){return i.lrInput(o)}),p(),h(42,"label",21),x(43,"Batch"),p(),h(44,"input",22),C("input",function(o){return i.batchSizeInput(o)}),p(),h(45,"label",23),x(46,"3D alle N Batches"),p(),h(47,"input",24),C("input",function(o){return i.vizEveryInput(o)}),p()()()()),n&2&&(_(),ee("title",i.datasetRibbon()),_(),pe(" ",i.datasetRibbon()," "),_(3),pe(" ",i.activeTitle()," "),_(),ee("title",i.activeDetail()),_(),pe(" ",i.activeDetail()," "),_(2),N("disabled",i.ui().saveDisabled),_(2),N("disabled",i.ui().resetDisabled),_(2),ee("title",i.epochHint()),_(4),qe("btn-primary",i.hp().epochs===1)("btn-outline",i.hp().epochs!==1),N("disabled",i.ui().trainFormLocked),_(2),qe("btn-primary",i.hp().epochs===3)("btn-outline",i.hp().epochs!==3),N("disabled",i.ui().trainFormLocked),_(2),qe("btn-primary",i.hp().epochs===10)("btn-outline",i.hp().epochs!==10),N("disabled",i.ui().trainFormLocked),_(2),qe("btn-primary",i.hp().epochs===30)("btn-outline",i.hp().epochs!==30),N("disabled",i.ui().trainFormLocked),_(4),N("disabled",i.ui().trainFormLocked)("value",i.hp().epochs),_(),ee("title",i.epochHint()),_(),pe(" ",i.epochHint()," "),_(2),N("disabled",i.ui().trainDisabled),_(2),N("disabled",i.ui().pauseDisabled),_(),pe(" ",i.panel().pause?"Weiter":"Pause"," "),_(7),N("disabled",i.ui().trainFormLocked)("value",i.hp().lr),_(3),N("disabled",i.ui().trainFormLocked)("value",i.hp().batchSize),_(3),N("disabled",i.ui().trainFormLocked)("value",i.hp().vizEveryNBatches))},encapsulation:2,changeDetection:0})};function uE(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,'<span class="badge badge-primary badge-sm mx-0.5 font-semibold tabular-nums">$1</span>')}var Nd=class t{sanitizer=w(Zp);transform(e){return this.sanitizer.bypassSecurityTrustHtml(uE(e??""))}static \u0275fac=function(n){return new(n||t)};static \u0275pipe=Gc({name:"neuronalStatusRich",type:t,pure:!0})};var Pd=class t{store=w(me);statusPlain=_e(this.store.select(cg),{requireSync:!0});static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-workspace-status"]],decls:5,vars:3,consts:[[1,"flex","w-full","min-w-0","flex-col","gap-2"],[1,"text-base-content/60","text-[0.62rem]","font-semibold","uppercase","tracking-widest"],["id","status","role","status","aria-live","polite","aria-atomic","true",1,"rounded-box","border-base-300","bg-base-300/30","font-mono","text-sm","leading-relaxed","tracking-tight","text-base-content/80","block","min-h-[2.5rem]","w-full","whitespace-pre-wrap","break-words","border","p-3","shadow-inner",3,"innerHTML"]],template:function(n,i){n&1&&(h(0,"div",0)(1,"span",1),x(2,"Aktueller Zustand"),p(),be(3,"span",2),je(4,"neuronalStatusRich"),p()),n&2&&(_(3),N("innerHTML",sb(4,1,i.statusPlain()),tx))},dependencies:[Nd],encapsulation:2,changeDetection:0})};function iV(t,e){t&1&&(h(0,"div",1)(1,"div",6),be(2,"app-training-panel")(3,"app-workspace-status"),p()())}function rV(t,e){if(t&1){let n=pt();h(0,"section",5)(1,"div",7)(2,"button",8),C("click",function(){T(n);let r=E();return I(r.mobilePanelTab.set("infer"))}),x(3," Inferenz "),p(),h(4,"button",9),C("click",function(){T(n);let r=E();return I(r.mobilePanelTab.set("epochs"))}),x(5," Epochen "),p()(),be(6,"app-infer-panel")(7,"app-epoch-track-list"),p()}if(t&2){let n=E();_(2),qe("tab-active",n.mobilePanelTab()==="infer"),ee("aria-selected",n.mobilePanelTab()==="infer"),_(2),qe("tab-active",n.mobilePanelTab()==="epochs"),ee("aria-selected",n.mobilePanelTab()==="epochs"),_(2),qe("hidden",n.inferPanelHidden()),_(),qe("hidden",n.epochPanelHidden())}}var Ld=class t{vizShell;inferPanel;store=w(me);headerModel=_e(this.store.select(sg),{initialValue:null});immersive=_e(this.store.select(qa),{initialValue:!1});workspaceContentGridClass=mt(()=>this.immersive()?"grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)]":"flex shrink-0 flex-col gap-2 p-2 sm:gap-3 sm:p-3 lg:min-h-0 lg:flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]");mobilePanelTab=Ie("infer");viewportIsWide=Ie(oV());inferPanelHidden=mt(()=>!this.viewportIsWide()&&this.mobilePanelTab()!=="infer");epochPanelHidden=mt(()=>!this.viewportIsWide()&&this.mobilePanelTab()!=="epochs");destroyRef=w(rn);neuronalApp=w(ln);appInstance=w(Gi);router=w(Yt);teardown=null;bindGen=0;constructor(){if(typeof window>"u")return;let e=window.matchMedia("(min-width: 1024px)"),n=()=>this.viewportIsWide.set(e.matches);e.addEventListener("change",n),this.destroyRef.onDestroy(()=>e.removeEventListener("change",n))}ngAfterViewInit(){this.bootstrapRuntime()}modelWorkspacePathMatches(){return lE(this.router.url)}waitForModelWorkspaceRouterPath(e){return X(this,null,function*(){e===this.bindGen&&(this.modelWorkspacePathMatches()||(yield Us(this.router.events.pipe(ge(n=>n instanceof Ft),ge(()=>e===this.bindGen&&this.modelWorkspacePathMatches()),Ye(1)))))})}waitForRuntimeSurfaces(e){return X(this,null,function*(){let n=performance.now()+8e3;for(;;){if(e!==this.bindGen)throw new Error("aborted");let i=this.vizShell?.vizMountEl()?.nativeElement,r=this.inferPanel?.inferDrawCanvasEl()?.nativeElement;if(i&&r)return{vizMount:i,inferDrawCanvas:r};if(performance.now()>n)throw new Error("surfaces-timeout");yield new Promise(o=>requestAnimationFrame(()=>o()))}})}bootstrapRuntime(){return X(this,null,function*(){let e=++this.bindGen;try{if(yield this.waitForModelWorkspaceRouterPath(e),e!==this.bindGen)return;let n=yield this.waitForRuntimeSurfaces(e);if(e!==this.bindGen)return;let i=yield this.neuronalApp.bindRuntime(n,this.appInstance);if(e!==this.bindGen){i();return}this.teardown=i}catch{this.router.navigate(["/"])}})}ngOnDestroy(){this.bindGen++,this.teardown?.(),this.teardown=null}onDocumentPointerDown(e){let n=e.target;if(!(n instanceof Node))return;let i=document.getElementById("modelDropdownButton"),r=document.getElementById("modelDropdownMenu");i&&r&&(n===i||i.contains(n)||r.contains(n))||this.store.dispatch(S.modelDropdownSetOpen({open:!1}))}onDocumentKeydown(e){if(e.key==="Escape"){if(this.immersive()){this.store.dispatch(S.uiVizImmersiveToggled());return}this.store.dispatch(S.modelDropdownSetOpen({open:!1}))}}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-neuronal-workspace"]],viewQuery:function(n,i){if(n&1&&(pa(cl,5),pa(ll,5)),n&2){let r;Vo(r=Uo())&&(i.vizShell=r.first),Vo(r=Uo())&&(i.inferPanel=r.first)}},hostBindings:function(n,i){n&1&&C("pointerdown",function(o){return i.onDocumentPointerDown(o)},!1,ca)("keydown",function(o){return i.onDocumentKeydown(o)},!1,ca)},decls:8,vars:16,consts:[["id","app",1,"bg-base-100","text-base-content","flex","min-h-0","flex-1","flex-col","max-lg:overflow-y-auto","lg:overflow-hidden"],["role","region","aria-label","Modell-Arbeitsbereich",1,"border-base-300/60","bg-base-100","flex","shrink-0","flex-col","gap-2","border-b","px-2","py-2","sm:px-4","sm:py-3"],[1,"grid","h-[45dvh]","max-h-[50dvh]","min-w-0","shrink-0","grid-rows-[minmax(0,1fr)]","sm:h-[50dvh]","lg:h-full","lg:max-h-none","lg:min-h-0","lg:overflow-hidden"],["aria-label","Netzwerk-Visualisierung",1,"flex","h-full","min-h-0","min-w-0","flex-col","overflow-hidden"],[1,"card-body","flex","min-h-0","flex-1","flex-col","p-0"],["aria-label","Epochen und Inferenz",1,"relative","flex","min-w-0","shrink-0","flex-col","gap-3","lg:min-h-0","lg:shrink","lg:overflow-hidden"],[1,"flex","flex-col","gap-2"],["role","tablist","aria-label","Arbeitsbereich",1,"tabs","tabs-boxed","bg-base-300/40","shrink-0","p-1","lg:hidden"],["type","button","role","tab","id","tab-workspace-infer",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["type","button","role","tab","id","tab-workspace-epochs",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"]],template:function(n,i){n&1&&(h(0,"div",0),Ue(1,iV,4,0,"div",1),h(2,"div")(3,"main",2)(4,"section",3)(5,"div",4),be(6,"app-network-viz3d-shell"),p()()(),Ue(7,rV,8,10,"section",5),p()()),n&2&&(_(),ze(i.immersive()?-1:1),_(),Yx(i.workspaceContentGridClass()),_(2),qe("card",!i.immersive())("border-base-300",!i.immersive())("bg-base-200",!i.immersive())("rounded-box",!i.immersive())("border",!i.immersive())("shadow-xl",!i.immersive()),_(3),ze(i.immersive()?-1:7))},dependencies:[Pd,cl,Rd,Td,ll],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}"]})};function oV(){return typeof window>"u"?!0:window.matchMedia("(min-width: 1024px)").matches}var dE=[{path:"",component:Zu,children:[{path:"",pathMatch:"full",component:Cd},{path:"model/new",pathMatch:"full",redirectTo:""},{path:"model/:modelId",canActivate:[cE],component:Ld}]},{path:"**",redirectTo:""}];var sV=new gi,fE=t=>(e,n)=>{let i=t(e,n);return(n.type===S.modelStoreHydrated.type||n.type===S.modelEntryUpserted.type||n.type===S.activeModelIdSet.type||n.type===S.activeModelIdFromRouteSet.type)&&i.neuronal?.modelCollection&&sV.saveCollection(i.neuronal.modelCollection),i};function Bt(t){return Math.max(0,Math.min(255,Math.round(t)))}function bs(t){let e=t.trim();return e.endsWith("%")?Bt(parseFloat(e)/100*255):Bt(parseFloat(e))}function aV(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);if(n){let o=bs(n[1]),s=bs(n[2]),a=bs(n[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let i=e.match(/^rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*([\d.%]+))?\s*\)$/i);if(i){let o=bs(i[1]),s=bs(i[2]),a=bs(i[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let r=e.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);if(r){let o=Bt(parseFloat(r[1])*255),s=Bt(parseFloat(r[2])*255),a=Bt(parseFloat(r[3])*255);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}return/^#[0-9A-Fa-f]{6}$/i.test(e)?e.toLowerCase():/^#[0-9A-Fa-f]{8}$/i.test(e)?e.slice(0,7).toLowerCase():null}function lV(t,e){let n=e.trim();if(!n)return null;let i=t.createElement("canvas");i.width=1,i.height=1;let r=i.getContext("2d",{willReadFrequently:!0});if(!r)return null;try{r.clearRect(0,0,1,1),r.fillStyle=n,r.fillRect(0,0,1,1);let o=r.getImageData(0,0,1,1).data;if(o[3]<16)return null;let s=o[0],a=o[1],l=o[2];return`#${((1<<24)+(s<<16)+(a<<8)+l).toString(16).slice(1)}`}catch{return null}}function hE(t,e){let n=e.trim();if(!n)return null;let i=aV(n);return i||lV(t,n)}function j(t,e,n){let i=parseInt(t.slice(1),16),r=parseInt(e.slice(1),16),o=i>>16&255,s=i>>8&255,a=i&255,l=r>>16&255,c=r>>8&255,u=r&255,d=Math.max(0,Math.min(1,n)),m=Bt(o+(l-o)*d),f=Bt(s+(c-s)*d),v=Bt(a+(u-a)*d);return`#${((1<<24)+(m<<16)+(f<<8)+v).toString(16).slice(1)}`}function Dt(t,e){let n=parseInt(t.slice(1),16),i=(n>>16&255)*e,r=(n>>8&255)*e,o=(n&255)*e;return`#${((1<<24)+(Bt(i)<<16)+(Bt(r)<<8)+Bt(o)).toString(16).slice(1)}`}function cn(t,e){let n=parseInt(t.slice(1),16),i=Bt((n>>16&255)+(255-(n>>16&255))*e),r=Bt((n>>8&255)+(255-(n>>8&255))*e),o=Bt((n&255)+(255-(n&255))*e);return`#${((1<<24)+(i<<16)+(r<<8)+o).toString(16).slice(1)}`}function Ss(t,e,n){return j(t,e,Math.max(0,Math.min(1,n)))}function Kt(t,e,n){let i=t.body;if(!i)return"#808080";let r=t.createElement("div");r.setAttribute("data-theme",e),r.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none",r.style.color=`var(${n})`,i.appendChild(r);let o=t.defaultView?.getComputedStyle(r),s=o?hE(t,o.color):null,a=o?.getPropertyValue(n).trim()??"",l=a?hE(t,a):null;return i.removeChild(r),s??l??"#808080"}function cV(t,e){let n=t,i=e;ls(n.backgroundFog)<.06&&(n=M(y({},n),{backgroundFog:cn(n.backgroundFog,.2),floor:cn(n.floor,.16)}));let o=ls(n.backgroundFog),s=ls(i.neuronEmissive);return o<.16&&s<.16&&Math.abs(o-s)<.048&&(i=Fr(i,{neuronEmissive:cn(i.neuronEmissive,.38),neuronHiddenCold:cn(i.neuronHiddenCold,.38*.85),neuronHiddenHot:cn(i.neuronHiddenHot,.38*.45),neuronInputCold:cn(i.neuronInputCold,.38*.85),neuronOutputCold:cn(i.neuronOutputCold,.38*.75),edgeInferMuted:cn(i.edgeInferMuted,.38*.55)})),{sceneColors:n,networkColors:i}}function pE(t,e){let n=Kt(t,e,"--color-base-100"),i=Kt(t,e,"--color-base-200"),r=Kt(t,e,"--color-base-300"),o=Kt(t,e,"--color-base-content"),s=Kt(t,e,"--color-primary"),a=Kt(t,e,"--color-primary-content"),l=Kt(t,e,"--color-secondary"),c=Kt(t,e,"--color-accent"),u=Kt(t,e,"--color-info"),d=Kt(t,e,"--color-warning"),m=Kt(t,e,"--color-error"),f=Kt(t,e,"--color-neutral"),v=Kt(t,e,"--color-neutral-content"),b=ls(n),R=ls(o),P=b<.38&&R>b+.12,H=M(y({},P?{backgroundFog:Ss(j(r,i,.35),j(r,s,.14),.55),floor:Ss(j(r,i,.5),j(r,f,.12),.35)}:{backgroundFog:Dt(Ss(j(j(r,o,.26),j(r,f,.14),.52),j(s,o,.55),.14),.9),floor:Dt(j(j(r,o,.2),j(r,j(f,s,.08),.35),.48),.93)}),{fogNear:Oi.fogNear,fogFar:Oi.fogFar}),fe=Lr(Oi,H),z=P?{hemiSky:Ss(j(n,j(n,u,.22),.55),s,.12),hemiGround:j(r,j(i,f,.18),.42),ambient:j(j(r,i,.35),j(o,s,.1),.5),key:Ss(j(s,a,.38),n,.22),fill:j(j(l,r,.45),j(l,u,.15),.35),rim:j(c,j(n,c,.55),.4),backAccent:j(u,j(s,v,.25),.35)}:{hemiSky:Dt(Ss(j(j(r,o,.12),j(i,r,.55),.38),j(u,s,.4),.2),.94),hemiGround:Dt(j(r,j(f,j(o,r,.25),.28),.5),.92),ambient:Dt(j(j(r,o,.18),j(f,j(s,r,.1),.15),.45),.93),key:Dt(j(s,j(a,r,.42),.45),.94),fill:Dt(j(l,j(r,j(u,o,.12),.28),.42),.93),rim:Dt(j(c,j(r,j(l,o,.12),.3),.4),.93),backAccent:Dt(j(u,j(r,j(c,s,.22),.24),.38),.92)},F=P?{toneMappingExposure:vi.toneMappingExposure,bloomStrength:vi.bloomStrength,bloomThreshold:vi.bloomThreshold,bloomRadius:vi.bloomRadius}:{toneMappingExposure:.78,bloomStrength:.14,bloomThreshold:.62,bloomRadius:.32},Y=Fr(kr,{neuronEmissive:s,neuronHiddenCold:Dt(s,.72),neuronHiddenHot:cn(j(s,c,.45),.35),neuronInputCold:Dt(s,.75),neuronInputHot:cn(o,.45),neuronOutputCold:Dt(j(s,u,.35),.82),neuronOutputHot:cn(j(c,u,.5),.25),edgePositiveCold:Dt(d,.42),edgePositiveHot:d,edgeNegativeCold:Dt(u,.38),edgeNegativeHot:cn(u,.18),edgeInferMuted:Dt(j(r,o,.3),.55),edgeTrainRecent:j(d,m,.35)}),{sceneColors:he,networkColors:O}=cV(fe,Y);return{sceneColors:{backgroundFog:he.backgroundFog,floor:he.floor,fogNear:he.fogNear,fogFar:he.fogFar},lightColors:z,networkColors:O,postProcessPatch:F}}function Nv(t,e){let n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=t,r.rel="noopener",document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(i)}var Od=class t{store=w(me);actions$=w(Lu);zone=w(Le);doc=w(Ge);app=w(Gi);neuronalApp=w(ln);modelsIdb=w(gi);epochsIdb=w(Pr);viz3dBootstrapDaisySync$=Me(()=>q(S.viz3dColorsSyncFromDaisyRequested()));viz3dDaisyPaletteSync$=Me(()=>this.actions$.pipe(Ee(S.daisyUiAppThemeChanged,S.viz3dColorsSyncFromDaisyRequested,S.viz3dColorPresetModeChanged),Be(this.store.select(wn)),Ve(([e,n])=>{if(n.viz3d.colorPresetMode==="custom")return We;if("theme"in e&&n.viz3d.colorPresetMode!=="followUi")return We;let i=n.viz3d.colorPresetMode==="fixedTheme"?n.viz3d.colorPresetFixedTheme:"theme"in e?e.theme:Ar(this.doc),r=pE(this.doc,i);return q(S.viz3dDaisyPaletteApplied({sceneColors:r.sceneColors,lightColors:r.lightColors,networkColors:r.networkColors,postProcessPatch:r.postProcessPatch}))})));viz3dDaisyPaletteAppliedToRuntime$=Me(()=>this.actions$.pipe(Ee(S.viz3dDaisyPaletteApplied),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors),this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors),this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors),this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});modelStoreFromIdbLoad$=Me(()=>this.actions$.pipe(Ee(S.modelStoreLoadRequested),Ji(()=>Fe(X(this,null,function*(){oE(),Qw(),yield tM();let[e,n]=yield Promise.all([this.modelsIdb.loadCollection(),this.epochsIdb.loadEpochStore()]);return{modelCollection:e,epochStore:n}})).pipe(ft(({modelCollection:e,epochStore:n})=>q(S.epochStoreHydrated({byModelId:y({},n.byModelId)}),S.modelStoreHydrated({modelCollection:e})))))));newModelFromToolbar$=Me(()=>this.actions$.pipe(Ee(S.newModelFromToolbarRequested),Be(this.store.select(hi)),ge(([,e])=>!e),K(()=>{this.app.newModelFromToolbar()})),{dispatch:!1});newModelFromListRequested$=Me(()=>this.actions$.pipe(Ee(S.newModelFromListRequested),Be(this.store.select(hi)),ge(([,e])=>!e),At(()=>{let e=ed();return Fe([S.lastTrainMetricsReset(),S.modelEntryUpserted({entry:e}),S.epochViewSyncFromModel({modelId:e.id})])})));activeModelFromToolbar$=Me(()=>this.actions$.pipe(Ee(S.activeModelFromToolbarRequested),Be(this.store.select(hi)),ge(([e,n])=>!n&&e.id.length>0),hn(Jn),K(([e])=>{this.app.activeModelFromToolbar(e.id)})),{dispatch:!1});uiTrainStart$=Me(()=>this.actions$.pipe(Ee(S.uiTrainStartRequested),K(()=>{this.neuronalApp.onTrain()})),{dispatch:!1});uiSaveAs$=Me(()=>this.actions$.pipe(Ee(S.uiSaveAsRequested),K(()=>{this.neuronalApp.onSaveAs()})),{dispatch:!1});uiReset$=Me(()=>this.actions$.pipe(Ee(S.uiResetRequested),K(()=>{this.neuronalApp.onReset()})),{dispatch:!1});uiInferRandom$=Me(()=>this.actions$.pipe(Ee(S.uiInferRandomRequested),K(()=>{this.neuronalApp.onInferRandom()})),{dispatch:!1});uiInferDraw$=Me(()=>this.actions$.pipe(Ee(S.uiInferDrawRequested),K(()=>{this.neuronalApp.onInferDraw()})),{dispatch:!1});uiClearDraw$=Me(()=>this.actions$.pipe(Ee(S.uiClearDrawRequested),K(()=>{this.neuronalApp.onClearDraw()})),{dispatch:!1});uiDrawPointerDown$=Me(()=>this.actions$.pipe(Ee(S.uiDrawPointerDown),K(({event:e})=>{this.neuronalApp.onDrawPointerDown(e)})),{dispatch:!1});uiDrawPointerMove$=Me(()=>this.actions$.pipe(Ee(S.uiDrawPointerMove),K(({event:e})=>{this.neuronalApp.onDrawPointerMove(e)})),{dispatch:!1});uiDrawPointerUp$=Me(()=>this.actions$.pipe(Ee(S.uiDrawPointerUp),K(()=>{this.neuronalApp.onDrawPointerUp()})),{dispatch:!1});uiDrawPointerCancel$=Me(()=>this.actions$.pipe(Ee(S.uiDrawPointerCancel),K(()=>{this.neuronalApp.onDrawPointerCancel()})),{dispatch:!1});uiDrawPointerLeave$=Me(()=>this.actions$.pipe(Ee(S.uiDrawPointerLeave),K(()=>{this.neuronalApp.onDrawPointerLeave()})),{dispatch:!1});vizInputLayerLayout$=Me(()=>this.actions$.pipe(Ee(S.vizInputLayerLayoutChanged),K(({raw:e})=>{this.neuronalApp.onInputLayerLayoutChange(e)})),{dispatch:!1});vizInputLayerScale$=Me(()=>this.actions$.pipe(Ee(S.vizInputLayerScaleChanged),K(({scale:e})=>{this.neuronalApp.onInputLayerLayoutScaleChange(e)})),{dispatch:!1});vizHiddenLayerLayout$=Me(()=>this.actions$.pipe(Ee(S.vizHiddenLayerLayoutChanged),K(({index:e,raw:n})=>{this.neuronalApp.onHiddenLayerLayoutChange(e,n)})),{dispatch:!1});vizHiddenLayerScale$=Me(()=>this.actions$.pipe(Ee(S.vizHiddenLayerScaleChanged),K(({index:e,scale:n})=>{this.neuronalApp.onHiddenLayerLayoutScaleChange(e,n)})),{dispatch:!1});vizActiveNeuronMaxScaleMul$=Me(()=>this.actions$.pipe(Ee(S.vizActiveNeuronMaxScaleMulChanged),K(({mul:e})=>{this.neuronalApp.onActiveNeuronMaxScaleMulChange(e)})),{dispatch:!1});vizSceneColor$=Me(()=>this.actions$.pipe(Ee(S.vizSceneColorChanged),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors)})})),{dispatch:!1});vizSceneColorsPatch$=Me(()=>this.actions$.pipe(Ee(S.vizSceneColorsPatch),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors)})})),{dispatch:!1});vizLightColor$=Me(()=>this.actions$.pipe(Ee(S.vizLightColorChanged),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors)})})),{dispatch:!1});vizNetworkColors$=Me(()=>this.actions$.pipe(Ee(S.vizNetworkColorsPatch),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors)})})),{dispatch:!1});vizPostProcess$=Me(()=>this.actions$.pipe(Ee(S.vizPostProcessPatch),Be(this.store.select(wn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});vizVibeCamera$=Me(()=>this.actions$.pipe(Ee(S.vizVibeCameraProfileChanged,S.vizVibeCameraTuningPatch),Be(this.store.select(Tg)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVibeCameraSettingsApply(e)})})),{dispatch:!1});uiExportBundle$=Me(()=>this.actions$.pipe(Ee(S.uiExportBundleRequested),Be(this.store.select(wn)),K(([,e])=>{Nv("neuronal3d-models.json",e.modelCollection),Nv("neuronal3d-epochs.json",{version:1,byModelId:e.epochByModelId})})),{dispatch:!1});persistEpoch$=Me(()=>this.store.select(ig).pipe(uo(1),ao(200),K(e=>{this.epochsIdb.saveEpochStore({version:1,byModelId:e})})),{dispatch:!1});static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac})};var gE="neuronal3d:viz3d:v1",uV=t=>typeof t=="string"&&_s.includes(t)?t:il,mE=t=>typeof t=="string"&&$r.includes(t)?t:"ring",dV=t=>t==="fixedTheme"||t==="custom"?t:"followUi",Pv=t=>typeof t=="number"&&Number.isFinite(t)?rl(t):Bi,fV=t=>!Array.isArray(t)||t.length<2?["ring","ring"]:[mE(t[0]),mE(t[1])],hV=t=>!Array.isArray(t)||t.length<2?[Bi,Bi]:[Pv(t[0]),Pv(t[1])],pV=t=>{let e=y({},Or);if(!t||typeof t!="object")return e;let n=t;for(let i of Object.keys(Or)){let r=n[i];typeof r=="string"&&It(r)&&(e[i]=r)}return e};function mV(t){if(!t||typeof t!="object")return null;let e=t,n=e.version,i=e.viz3d;if(n!==1||!i||typeof i!="object")return null;let r=i;return{inputLayerLayout:uV(r.inputLayerLayout),inputLayerScale:Pv(r.inputLayerScale),hiddenLayerLayouts:fV(r.hiddenLayerLayouts),hiddenLayerScales:hV(r.hiddenLayerScales),activeNeuronMaxScaleMul:typeof r.activeNeuronMaxScaleMul=="number"&&Number.isFinite(r.activeNeuronMaxScaleMul)?_d(r.activeNeuronMaxScaleMul):yd,colorPresetMode:dV(r.colorPresetMode),colorPresetFixedTheme:(()=>{let o=r.colorPresetFixedTheme;return typeof o=="string"&&qn(o)?o:pi})(),sceneColors:Lr(Oi,r.sceneColors??{}),lightColors:pV(r.lightColors),networkColors:Fr(kr,r.networkColors??{}),postProcess:ki(vi,r.postProcess??{}),vibeCamera:gt(r.vibeCamera)}}function vE(){try{let t=localStorage.getItem(gE);return t?mV(JSON.parse(t)):null}catch{return null}}function yE(t){let e={version:1,viz3d:t};try{localStorage.setItem(gE,JSON.stringify(e))}catch{}}var gV=()=>({version:3,activeModelId:null,models:[]});function Lv(){return{inputLayerLayout:il,inputLayerScale:Bi,hiddenLayerLayouts:["ring","ring"],hiddenLayerScales:[Bi,Bi],activeNeuronMaxScaleMul:yd,colorPresetMode:"followUi",colorPresetFixedTheme:pi,sceneColors:y({},Oi),lightColors:y({},Or),networkColors:y({},kr),postProcess:y({},vi),vibeCamera:y({},He)}}function kd(t,e){let n=e.activeModelId;return n?[...t[n]??[]]:[]}function _E(){let t=gV(),e={};return{modelCollection:t,modelStoreHydrated:!1,epochByModelId:e,epochDisplayRows:kd(e,t),viz3d:Lv(),trainHyperparams:y({},ss),runtimeStatusPlain:"",runtimeKernelCaps:{hasNet:!1,mnistTrainCount:0,mnistTestCount:0},training:{running:!1,pause:!1,shouldStop:!1,currentRun:0,currentRunStartedAt:"",currentRunStartedMs:0},lastTrainLoss:0,lastTrainBatchAcc:0,modelDropdownOpen:!1,vizImmersiveUi:!1}}function vV(t){return _s.includes(t)?t:null}function yV(t){return $r.includes(t)?t:null}function _V(t,e,n){let r=[...t[e]??[],n];return r.length>500&&r.splice(0,r.length-500),M(y({},t),{[e]:r})}function xV(t,e){let n=[...t.models],i=n.findIndex(r=>r.id===e.id);return i>=0?n[i]=e:n.unshift(e),M(y({},t),{activeModelId:e.id,models:n})}function Ov(t,e){return[...t.epochByModelId[e]??[]]}var bV=M(y({},_E()),{viz3d:vE()??Lv()}),xE=QS(bV,de(S.modelStoreHydrated,(t,{modelCollection:e})=>M(y({},t),{modelCollection:e,modelStoreHydrated:!0,epochDisplayRows:kd(t.epochByModelId,e)})),de(S.epochStoreHydrated,(t,{byModelId:e})=>M(y({},t),{epochByModelId:y({},e),epochDisplayRows:kd(e,t.modelCollection)})),de(S.activeModelIdSet,S.activeModelIdFromRouteSet,(t,{id:e})=>M(y({},t),{modelCollection:M(y({},t.modelCollection),{activeModelId:e}),epochDisplayRows:Ov(t,e)})),de(S.modelEntryUpserted,(t,{entry:e})=>{let n=t.modelCollection.models.some(r=>r.id===e.id),i=xV(t.modelCollection,e);return M(y({},t),{modelCollection:i,epochDisplayRows:n?t.epochDisplayRows:Ov(t,e.id)})}),de(S.epochViewSyncFromModel,(t,{modelId:e})=>{if(!e)return M(y({},t),{epochDisplayRows:[]});let n=t.epochByModelId[e]??[];return M(y({},t),{epochDisplayRows:[...n]})}),de(S.epochHistoryCleared,(t,{modelId:e})=>{let n=y({},t.epochByModelId);delete n[e];let i=t.modelCollection.activeModelId;return M(y({},t),{epochByModelId:n,epochDisplayRows:i===e?[]:t.epochDisplayRows})}),de(S.trainingStarted,(t,e)=>M(y({},t),{training:M(y({},t.training),{running:!0,shouldStop:!1,pause:!1,currentRun:e.run,currentRunStartedAt:e.runStartedAt,currentRunStartedMs:e.runStartedMs}),epochDisplayRows:Ov(t,e.modelId),modelDropdownOpen:!1})),de(S.trainingEpochAppended,(t,{modelId:e,row:n})=>{let i=_V(t.epochByModelId,e,n);return M(y({},t),{epochByModelId:i,epochDisplayRows:[...t.epochDisplayRows,n]})}),de(S.trainingFinished,(t,{lastTrainLoss:e,lastTrainBatchAcc:n})=>M(y({},t),{lastTrainLoss:e,lastTrainBatchAcc:n,training:M(y({},t.training),{running:!1,shouldStop:!1,pause:!1})})),de(S.trainingStopRequested,t=>M(y({},t),{training:M(y({},t.training),{shouldStop:!0})})),de(S.trainingPauseToggled,t=>M(y({},t),{training:M(y({},t.training),{pause:!t.training.pause})})),de(S.uiModelDropdownToggleRequested,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0?t:M(y({},t),{modelDropdownOpen:!t.modelDropdownOpen})),de(S.activeModelFromToolbarRequested,t=>M(y({},t),{modelDropdownOpen:!1})),de(S.modelDropdownSetOpen,(t,{open:e})=>M(y({},t),{modelDropdownOpen:e})),de(S.lastTrainMetricsReset,t=>M(y({},t),{lastTrainLoss:0,lastTrainBatchAcc:0})),de(S.vizInputLayerLayoutChanged,(t,{raw:e})=>{let n=vV(e);return n?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerLayout:n})}):t}),de(S.vizInputLayerScaleChanged,(t,{scale:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerScale:rl(e)})}):t),de(S.vizHiddenLayerLayoutChanged,(t,{index:e,raw:n})=>{let i=yV(n);if(!i)return t;let r=[t.viz3d.hiddenLayerLayouts[0],t.viz3d.hiddenLayerLayouts[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerLayouts:r})})}),de(S.vizHiddenLayerScaleChanged,(t,{index:e,scale:n})=>{if(!Number.isFinite(n))return t;let i=rl(n),r=[t.viz3d.hiddenLayerScales[0],t.viz3d.hiddenLayerScales[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerScales:r})})}),de(S.vizActiveNeuronMaxScaleMulChanged,(t,{mul:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{activeNeuronMaxScaleMul:_d(e)})}):t),de(S.vizSceneColorChanged,(t,{key:e,color:n})=>!It(n)||e!=="backgroundFog"&&e!=="floor"?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",sceneColors:M(y({},t.viz3d.sceneColors),{[e]:n})})})),de(S.vizSceneColorsPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",sceneColors:Lr(t.viz3d.sceneColors,e)})})),de(S.vizLightColorChanged,(t,{key:e,color:n})=>!It(n)||!(e in Or)?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",lightColors:M(y({},t.viz3d.lightColors),{[e]:n})})})),de(S.vizNetworkColorsPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:lM(e)?"custom":t.viz3d.colorPresetMode,networkColors:Fr(t.viz3d.networkColors,e)})})),de(S.viz3dColorPresetModeChanged,(t,{mode:e,fixedTheme:n})=>{if(e==="followUi")return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"followUi"})});let i=n&&qn(n)?n:pi;return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"fixedTheme",colorPresetFixedTheme:i})})}),de(S.viz3dDaisyPaletteApplied,(t,{sceneColors:e,lightColors:n,networkColors:i,postProcessPatch:r})=>M(y({},t),{viz3d:M(y({},t.viz3d),{sceneColors:Lr(t.viz3d.sceneColors,e),lightColors:y({},n),networkColors:y({},i),postProcess:ki(t.viz3d.postProcess,r)})})),de(S.vizPostProcessPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{postProcess:ki(t.viz3d.postProcess,e)})})),de(S.vizVibeCameraProfileChanged,(t,{profile:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{vibeCamera:Gu(e)})})),de(S.vizVibeCameraTuningPatch,(t,{patch:e})=>{let n=y(y({},t.viz3d.vibeCamera??He),e),i=n.profileMode!=="custom"&&jw(n.profileMode,n)?n.profileMode:"custom";return M(y({},t),{viz3d:M(y({},t.viz3d),{vibeCamera:M(y({},n),{profileMode:i})})})}),de(S.uiVizImmersiveToggled,t=>M(y({},t),{vizImmersiveUi:!t.vizImmersiveUi})),de(S.runtimeStatusPlainSet,(t,{plain:e})=>M(y({},t),{runtimeStatusPlain:e})),de(S.runtimeKernelCapsUpdated,(t,{caps:e})=>M(y({},t),{runtimeKernelCaps:y({},e)})),de(S.trainHyperparamsPatch,(t,{patch:e})=>M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,e)})),de(S.uiEpochPresetRequested,(t,{epochs:e})=>M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,{epochs:Number.isFinite(e)?Math.min(200,Math.max(1,Math.floor(e))):t.trainHyperparams.epochs})})),de(S.uiEpochsInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,{epochs:Number.isFinite(n)?n:t.trainHyperparams.epochs})})}),de(S.uiBatchSizeInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,{batchSize:Number.isFinite(n)?n:t.trainHyperparams.batchSize})})}),de(S.uiTrainLrInputChanged,(t,{raw:e})=>{let n=Number.parseFloat(e);return M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,{lr:Number.isFinite(n)?n:t.trainHyperparams.lr})})}),de(S.uiTrainVizEveryInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:Dr(t.trainHyperparams,{vizEveryNBatches:Number.isFinite(n)?n:t.trainHyperparams.vizEveryNBatches})})}));var bE=t=>(e,n)=>{let i=t(e,n);if(!i.neuronal)return i;let r=e?.neuronal?.viz3d,o=i.neuronal.viz3d;return r!==o&&yE(o),i};var SE={providers:[JS(void 0,{metaReducers:[fE,bE]}),Om("neuronal",xE),Om("router",uw),rw([Od]),...vr()?[Ow({maxAge:30,trace:!1})]:[],ub({eventCoalescing:!0}),xm(dE),fw()]};var Fd=class t{constructor(){w(me).dispatch(S.modelStoreLoadRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=De({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(n,i){n&1&&be(0,"router-outlet")},dependencies:[Mr],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"]})};$w(window);Yp(Fd,SE).catch(t=>console.error(t));
