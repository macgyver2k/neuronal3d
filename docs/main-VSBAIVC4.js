var pE=Object.defineProperty,mE=Object.defineProperties;var gE=Object.getOwnPropertyDescriptors;var mv=Object.getOwnPropertySymbols;var vE=Object.prototype.hasOwnProperty,yE=Object.prototype.propertyIsEnumerable;var gv=(t,e,n)=>e in t?pE(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,y=(t,e)=>{for(var n in e||={})vE.call(e,n)&&gv(t,n,e[n]);if(mv)for(var n of mv(e))yE.call(e,n)&&gv(t,n,e[n]);return t},M=(t,e)=>mE(t,gE(e));var Z=(t,e,n)=>new Promise((i,r)=>{var o=l=>{try{a(n.next(l))}catch(c){r(c)}},s=l=>{try{a(n.throw(l))}catch(c){r(c)}},a=l=>l.done?i(l.value):Promise.resolve(l.value).then(o,s);a((n=n.apply(t,e)).next())});function _d(t,e){return Object.is(t,e)}var tt=null,qa=!1,xd=1,zt=Symbol("SIGNAL");function ae(t){let e=tt;return tt=t,e}function bd(){return tt}var Or={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function us(t){if(qa)throw new Error("");if(tt===null)return;tt.consumerOnSignalRead(t);let e=tt.nextProducerIndex++;if(Ja(tt),e<tt.producerNode.length&&tt.producerNode[e]!==t&&cs(tt)){let n=tt.producerNode[e];Ka(n,tt.producerIndexOfThis[e])}tt.producerNode[e]!==t&&(tt.producerNode[e]=t,tt.producerIndexOfThis[e]=cs(tt)?yv(t,tt,e):0),tt.producerLastReadVersion[e]=t.version}function vv(){xd++}function Sd(t){if(!(cs(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===xd)){if(!t.producerMustRecompute(t)&&!Za(t)){yd(t);return}t.producerRecomputeValue(t),yd(t)}}function wd(t){if(t.liveConsumerNode===void 0)return;let e=qa;qa=!0;try{for(let n of t.liveConsumerNode)n.dirty||_E(n)}finally{qa=e}}function Md(){return tt?.consumerAllowSignalWrites!==!1}function _E(t){t.dirty=!0,wd(t),t.consumerMarkedDirty?.(t)}function yd(t){t.dirty=!1,t.lastCleanEpoch=xd}function ds(t){return t&&(t.nextProducerIndex=0),ae(t)}function Ya(t,e){if(ae(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(cs(t))for(let n=t.nextProducerIndex;n<t.producerNode.length;n++)Ka(t.producerNode[n],t.producerIndexOfThis[n]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Za(t){Ja(t);for(let e=0;e<t.producerNode.length;e++){let n=t.producerNode[e],i=t.producerLastReadVersion[e];if(i!==n.version||(Sd(n),i!==n.version))return!0}return!1}function fs(t){if(Ja(t),cs(t))for(let e=0;e<t.producerNode.length;e++)Ka(t.producerNode[e],t.producerIndexOfThis[e]);t.producerNode.length=t.producerLastReadVersion.length=t.producerIndexOfThis.length=0,t.liveConsumerNode&&(t.liveConsumerNode.length=t.liveConsumerIndexOfThis.length=0)}function yv(t,e,n){if(_v(t),t.liveConsumerNode.length===0&&xv(t))for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=yv(t.producerNode[i],t,i);return t.liveConsumerIndexOfThis.push(n),t.liveConsumerNode.push(e)-1}function Ka(t,e){if(_v(t),t.liveConsumerNode.length===1&&xv(t))for(let i=0;i<t.producerNode.length;i++)Ka(t.producerNode[i],t.producerIndexOfThis[i]);let n=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[n],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[n],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let i=t.liveConsumerIndexOfThis[e],r=t.liveConsumerNode[e];Ja(r),r.producerIndexOfThis[i]=e}}function cs(t){return t.consumerIsAlwaysLive||(t?.liveConsumerNode?.length??0)>0}function Ja(t){t.producerNode??=[],t.producerIndexOfThis??=[],t.producerLastReadVersion??=[]}function _v(t){t.liveConsumerNode??=[],t.liveConsumerIndexOfThis??=[]}function xv(t){return t.producerNode!==void 0}function Qa(t,e){let n=Object.create(xE);n.computation=t,e!==void 0&&(n.equal=e);let i=()=>{if(Sd(n),us(n),n.value===Xa)throw n.error;return n.value};return i[zt]=n,i}var gd=Symbol("UNSET"),vd=Symbol("COMPUTING"),Xa=Symbol("ERRORED"),xE=M(y({},Or),{value:gd,dirty:!0,error:null,equal:_d,kind:"computed",producerMustRecompute(t){return t.value===gd||t.value===vd},producerRecomputeValue(t){if(t.value===vd)throw new Error("Detected cycle in computations.");let e=t.value;t.value=vd;let n=ds(t),i,r=!1;try{i=t.computation(),ae(null),r=e!==gd&&e!==Xa&&i!==Xa&&t.equal(e,i)}catch(o){i=Xa,t.error=o}finally{Ya(t,n)}if(r){t.value=e;return}t.value=i,t.version++}});function bE(){throw new Error}var bv=bE;function Sv(t){bv(t)}function Ed(t){bv=t}var SE=null;function Cd(t,e){let n=Object.create(el);n.value=t,e!==void 0&&(n.equal=e);let i=()=>(us(n),n.value);return i[zt]=n,i}function hs(t,e){Md()||Sv(t),t.equal(t.value,e)||(t.value=e,wE(t))}function Td(t,e){Md()||Sv(t),hs(t,e(t.value))}var el=M(y({},Or),{equal:_d,value:void 0,kind:"signal"});function wE(t){t.version++,vv(),wd(t),SE?.()}function Id(t){let e=ae(null);try{return t()}finally{ae(e)}}var Dd;function ps(){return Dd}function Xn(t){let e=Dd;return Dd=t,e}var tl=Symbol("NotFound");function J(t){return typeof t=="function"}function gi(t){let n=t(i=>{Error.call(i),i.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var nl=gi(t=>function(n){t(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Fi(t,e){if(t){let n=t.indexOf(e);0<=n&&t.splice(n,1)}}var We=class t{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let o of n)o.remove(this);else n.remove(this);let{initialTeardown:i}=this;if(J(i))try{i()}catch(o){e=o instanceof nl?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{wv(o)}catch(s){e=e??[],s instanceof nl?e=[...e,...s.errors]:e.push(s)}}if(e)throw new nl(e)}}add(e){var n;if(e&&e!==this)if(this.closed)wv(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(e)}}_hasParent(e){let{_parentage:n}=this;return n===e||Array.isArray(n)&&n.includes(e)}_addParent(e){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(e),n):n?[n,e]:e}_removeParent(e){let{_parentage:n}=this;n===e?this._parentage=null:Array.isArray(n)&&Fi(n,e)}remove(e){let{_finalizers:n}=this;n&&Fi(n,e),e instanceof t&&e._removeParent(this)}};We.EMPTY=(()=>{let t=new We;return t.closed=!0,t})();var Ad=We.EMPTY;function il(t){return t instanceof We||t&&"closed"in t&&J(t.remove)&&J(t.add)&&J(t.unsubscribe)}function wv(t){J(t)?t():t.unsubscribe()}var ln={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Fr={setTimeout(t,e,...n){let{delegate:i}=Fr;return i?.setTimeout?i.setTimeout(t,e,...n):setTimeout(t,e,...n)},clearTimeout(t){let{delegate:e}=Fr;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function rl(t){Fr.setTimeout(()=>{let{onUnhandledError:e}=ln;if(e)e(t);else throw t})}function Yn(){}var Mv=Rd("C",void 0,void 0);function Ev(t){return Rd("E",void 0,t)}function Cv(t){return Rd("N",t,void 0)}function Rd(t,e,n){return{kind:t,value:e,error:n}}var ki=null;function kr(t){if(ln.useDeprecatedSynchronousErrorHandling){let e=!ki;if(e&&(ki={errorThrown:!1,error:null}),t(),e){let{errorThrown:n,error:i}=ki;if(ki=null,n)throw i}}else t()}function Tv(t){ln.useDeprecatedSynchronousErrorHandling&&ki&&(ki.errorThrown=!0,ki.error=t)}var Ui=class extends We{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,il(e)&&e.add(this)):this.destination=DE}static create(e,n,i){return new cn(e,n,i)}next(e){this.isStopped?Pd(Cv(e),this):this._next(e)}error(e){this.isStopped?Pd(Ev(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Pd(Mv,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},TE=Function.prototype.bind;function Nd(t,e){return TE.call(t,e)}var Ld=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:n}=this;if(n.next)try{n.next(e)}catch(i){ol(i)}}error(e){let{partialObserver:n}=this;if(n.error)try{n.error(e)}catch(i){ol(i)}else ol(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(n){ol(n)}}},cn=class extends Ui{constructor(e,n,i){super();let r;if(J(e)||!e)r={next:e??void 0,error:n??void 0,complete:i??void 0};else{let o;this&&ln.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Nd(e.next,o),error:e.error&&Nd(e.error,o),complete:e.complete&&Nd(e.complete,o)}):r=e}this.destination=new Ld(r)}};function ol(t){ln.useDeprecatedSynchronousErrorHandling?Tv(t):rl(t)}function IE(t){throw t}function Pd(t,e){let{onStoppedNotification:n}=ln;n&&Fr.setTimeout(()=>n(t,e))}var DE={closed:!0,next:Yn,error:IE,complete:Yn};var Ur=typeof Symbol=="function"&&Symbol.observable||"@@observable";function at(t){return t}function Od(...t){return Fd(t)}function Fd(t){return t.length===0?at:t.length===1?t[0]:function(n){return t.reduce((i,r)=>r(i),n)}}var le=(()=>{class t{constructor(n){n&&(this._subscribe=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}subscribe(n,i,r){let o=RE(n)?n:new cn(n,i,r);return kr(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(n){try{return this._subscribe(n)}catch(i){n.error(i)}}forEach(n,i){return i=Iv(i),new i((r,o)=>{let s=new cn({next:a=>{try{n(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(n){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(n)}[Ur](){return this}pipe(...n){return Fd(n)(this)}toPromise(n){return n=Iv(n),new n((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=e=>new t(e),t})();function Iv(t){var e;return(e=t??ln.Promise)!==null&&e!==void 0?e:Promise}function AE(t){return t&&J(t.next)&&J(t.error)&&J(t.complete)}function RE(t){return t&&t instanceof Ui||AE(t)&&il(t)}function kd(t){return J(t?.lift)}function $(t){return e=>{if(kd(e))return e.lift(function(n){try{return t(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function q(t,e,n,i,r){return new ms(t,e,n,i,r)}var ms=class extends Ui{constructor(e,n,i,r,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(l){e.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){e.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function Vr(){return $((t,e)=>{let n=null;t._refCount++;let i=q(e,void 0,void 0,void 0,()=>{if(!t||t._refCount<=0||0<--t._refCount){n=null;return}let r=t._connection,o=n;n=null,r&&(!o||r===o)&&r.unsubscribe(),e.unsubscribe()});t.subscribe(i),i.closed||(n=t.connect())})}var Br=class extends le{constructor(e,n){super(),this.source=e,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,kd(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new We;let n=this.getSubject();e.add(this.source.subscribe(q(n,void 0,()=>{this._teardown(),n.complete()},i=>{this._teardown(),n.error(i)},()=>this._teardown()))),e.closed&&(this._connection=null,e=We.EMPTY)}return e}refCount(){return Vr()(this)}};var Dv=gi(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ie=(()=>{class t extends le{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let i=new sl(this,this);return i.operator=n,i}_throwIfClosed(){if(this.closed)throw new Dv}next(n){kr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(n)}})}error(n){kr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:i}=this;for(;i.length;)i.shift().error(n)}})}complete(){kr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Ad:(this.currentObservers=null,o.push(n),new We(()=>{this.currentObservers=null,Fi(o,n)}))}_checkFinalizedStatuses(n){let{hasError:i,thrownError:r,isStopped:o}=this;i?n.error(r):o&&n.complete()}asObservable(){let n=new le;return n.source=this,n}}return t.create=(e,n)=>new sl(e,n),t})(),sl=class extends Ie{constructor(e,n){super(),this.destination=e,this.source=n}next(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.next)===null||i===void 0||i.call(n,e)}error(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.error)===null||i===void 0||i.call(n,e)}complete(){var e,n;(n=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||n===void 0||n.call(e)}_subscribe(e){var n,i;return(i=(n=this.source)===null||n===void 0?void 0:n.subscribe(e))!==null&&i!==void 0?i:Ad}};var $e=class extends Ie{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let n=super._subscribe(e);return!n.closed&&e.next(this._value),n}getValue(){let{hasError:e,thrownError:n,_value:i}=this;if(e)throw n;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var gs={now(){return(gs.delegate||Date).now()},delegate:void 0};var vs=class extends Ie{constructor(e=1/0,n=1/0,i=gs){super(),this._bufferSize=e,this._windowTime=n,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,e),this._windowTime=Math.max(1,n)}next(e){let{isStopped:n,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;n||(i.push(e),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(e)}_subscribe(e){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(e),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!e.closed;s+=i?1:2)e.next(o[s]);return this._checkFinalizedStatuses(e),n}_trimBuffer(){let{_bufferSize:e,_timestampProvider:n,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*e;if(e<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=n.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var al=class extends We{constructor(e,n){super()}schedule(e,n=0){return this}};var ys={setInterval(t,e,...n){let{delegate:i}=ys;return i?.setInterval?i.setInterval(t,e,...n):setInterval(t,e,...n)},clearInterval(t){let{delegate:e}=ys;return(e?.clearInterval||clearInterval)(t)},delegate:void 0};var zr=class extends al{constructor(e,n){super(e,n),this.scheduler=e,this.work=n,this.pending=!1}schedule(e,n=0){var i;if(this.closed)return this;this.state=e;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,n)),this.pending=!0,this.delay=n,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,n),this}requestAsyncId(e,n,i=0){return ys.setInterval(e.flush.bind(e,this),i)}recycleAsyncId(e,n,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return n;n!=null&&ys.clearInterval(n)}execute(e,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(e,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,n){let i=!1,r;try{this.work(e)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:e,scheduler:n}=this,{actions:i}=n;this.work=this.state=this.scheduler=null,this.pending=!1,Fi(i,this),e!=null&&(this.id=this.recycleAsyncId(n,e,null)),this.delay=null,super.unsubscribe()}}};var Hr=class t{constructor(e,n=t.now){this.schedulerActionCtor=e,this.now=n}schedule(e,n=0,i){return new this.schedulerActionCtor(this,e).schedule(i,n)}};Hr.now=gs.now;var Gr=class extends Hr{constructor(e,n=Hr.now){super(e,n),this.actions=[],this._active=!1}flush(e){let{actions:n}=this;if(this._active){n.push(e);return}let i;this._active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=n.shift());if(this._active=!1,i){for(;e=n.shift();)e.unsubscribe();throw i}}};var Zn=new Gr(zr);var ll=class extends zr{constructor(e,n){super(e,n),this.scheduler=e,this.work=n}schedule(e,n=0){return n>0?super.schedule(e,n):(this.delay=n,this.state=e,this.scheduler.flush(this),this)}execute(e,n){return n>0||this.closed?super.execute(e,n):this._execute(e,n)}requestAsyncId(e,n,i=0){return i!=null&&i>0||i==null&&this.delay>0?super.requestAsyncId(e,n,i):(e.flush(this),0)}};var cl=class extends Gr{};var _s=new cl(ll);var ze=new le(t=>t.complete());function Av(t){return t&&J(t.schedule)}function Ud(t){return t[t.length-1]}function ul(t){return J(Ud(t))?t.pop():void 0}function Cn(t){return Av(Ud(t))?t.pop():void 0}function Rv(t,e){return typeof Ud(t)=="number"?t.pop():e}function Pv(t,e,n,i){function r(o){return o instanceof n?o:new n(function(s){s(o)})}return new(n||(n=Promise))(function(o,s){function a(u){try{c(i.next(u))}catch(d){s(d)}}function l(u){try{c(i.throw(u))}catch(d){s(d)}}function c(u){u.done?o(u.value):r(u.value).then(a,l)}c((i=i.apply(t,e||[])).next())})}function Nv(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Vi(t){return this instanceof Vi?(this.v=t,this):new Vi(t)}function Lv(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(t,e||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(f){return function(v){return Promise.resolve(v).then(f,d)}}function a(f,v){i[f]&&(r[f]=function(b){return new Promise(function(N,P){o.push([f,b,N,P])>1||l(f,b)})},v&&(r[f]=v(r[f])))}function l(f,v){try{c(i[f](v))}catch(b){m(o[0][3],b)}}function c(f){f.value instanceof Vi?Promise.resolve(f.value.v).then(u,d):m(o[0][2],f)}function u(f){l("next",f)}function d(f){l("throw",f)}function m(f,v){f(v),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Ov(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],n;return e?e.call(t):(t=typeof Nv=="function"?Nv(t):t[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(o){n[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var dl=t=>t&&typeof t.length=="number"&&typeof t!="function";function fl(t){return J(t?.then)}function hl(t){return J(t[Ur])}function pl(t){return Symbol.asyncIterator&&J(t?.[Symbol.asyncIterator])}function ml(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function NE(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var gl=NE();function vl(t){return J(t?.[gl])}function yl(t){return Lv(this,arguments,function*(){let n=t.getReader();try{for(;;){let{value:i,done:r}=yield Vi(n.read());if(r)return yield Vi(void 0);yield yield Vi(i)}}finally{n.releaseLock()}})}function _l(t){return J(t?.getReader)}function be(t){if(t instanceof le)return t;if(t!=null){if(hl(t))return PE(t);if(dl(t))return LE(t);if(fl(t))return OE(t);if(pl(t))return Fv(t);if(vl(t))return FE(t);if(_l(t))return kE(t)}throw ml(t)}function PE(t){return new le(e=>{let n=t[Ur]();if(J(n.subscribe))return n.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function LE(t){return new le(e=>{for(let n=0;n<t.length&&!e.closed;n++)e.next(t[n]);e.complete()})}function OE(t){return new le(e=>{t.then(n=>{e.closed||(e.next(n),e.complete())},n=>e.error(n)).then(null,rl)})}function FE(t){return new le(e=>{for(let n of t)if(e.next(n),e.closed)return;e.complete()})}function Fv(t){return new le(e=>{UE(t,e).catch(n=>e.error(n))})}function kE(t){return Fv(yl(t))}function UE(t,e){var n,i,r,o;return Pv(this,void 0,void 0,function*(){try{for(n=Ov(t);i=yield n.next(),!i.done;){let s=i.value;if(e.next(s),e.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=n.return)&&(yield o.call(n))}finally{if(r)throw r.error}}e.complete()})}function dt(t,e,n,i=0,r=!1){let o=e.schedule(function(){n(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function un(t,e=0){return $((n,i)=>{n.subscribe(q(i,r=>dt(i,t,()=>i.next(r),e),()=>dt(i,t,()=>i.complete(),e),r=>dt(i,t,()=>i.error(r),e)))})}function xl(t,e=0){return $((n,i)=>{i.add(t.schedule(()=>n.subscribe(i),e))})}function kv(t,e){return be(t).pipe(xl(e),un(e))}function Uv(t,e){return be(t).pipe(xl(e),un(e))}function Vv(t,e){return new le(n=>{let i=0;return e.schedule(function(){i===t.length?n.complete():(n.next(t[i++]),n.closed||this.schedule())})})}function Bv(t,e){return new le(n=>{let i;return dt(n,e,()=>{i=t[gl](),dt(n,e,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){n.error(s);return}o?n.complete():n.next(r)},0,!0)}),()=>J(i?.return)&&i.return()})}function bl(t,e){if(!t)throw new Error("Iterable cannot be null");return new le(n=>{dt(n,e,()=>{let i=t[Symbol.asyncIterator]();dt(n,e,()=>{i.next().then(r=>{r.done?n.complete():n.next(r.value)})},0,!0)})})}function zv(t,e){return bl(yl(t),e)}function Hv(t,e){if(t!=null){if(hl(t))return kv(t,e);if(dl(t))return Vv(t,e);if(fl(t))return Uv(t,e);if(pl(t))return bl(t,e);if(vl(t))return Bv(t,e);if(_l(t))return zv(t,e)}throw ml(t)}function Fe(t,e){return e?Hv(t,e):be(t)}function X(...t){let e=Cn(t);return Fe(t,e)}function vi(t,e){let n=J(t)?t:()=>t,i=r=>r.error(n());return new le(e?r=>e.schedule(i,0,r):i)}var yi=class t{constructor(e,n,i){this.kind=e,this.value=n,this.error=i,this.hasValue=e==="N"}observe(e){return Vd(this,e)}do(e,n,i){let{kind:r,value:o,error:s}=this;return r==="N"?e?.(o):r==="E"?n?.(s):i?.()}accept(e,n,i){var r;return J((r=e)===null||r===void 0?void 0:r.next)?this.observe(e):this.do(e,n,i)}toObservable(){let{kind:e,value:n,error:i}=this,r=e==="N"?X(n):e==="E"?vi(()=>i):e==="C"?ze:0;if(!r)throw new TypeError(`Unexpected notification kind ${e}`);return r}static createNext(e){return new t("N",e)}static createError(e){return new t("E",void 0,e)}static createComplete(){return t.completeNotification}};yi.completeNotification=new yi("C");function Vd(t,e){var n,i,r;let{kind:o,value:s,error:a}=t;if(typeof o!="string")throw new TypeError('Invalid notification, missing "kind"');o==="N"?(n=e.next)===null||n===void 0||n.call(e,s):o==="E"?(i=e.error)===null||i===void 0||i.call(e,a):(r=e.complete)===null||r===void 0||r.call(e)}function Bd(t){return!!t&&(t instanceof le||J(t.lift)&&J(t.subscribe))}var dn=gi(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function xs(t,e){let n=typeof e=="object";return new Promise((i,r)=>{let o=new cn({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{n?i(e.defaultValue):r(new dn)}});t.subscribe(o)})}function Gv(t){return t instanceof Date&&!isNaN(t)}var VE=gi(t=>function(n=null){t(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=n});function zd(t,e){let{first:n,each:i,with:r=BE,scheduler:o=e??Zn,meta:s=null}=Gv(t)?{first:t}:typeof t=="number"?{each:t}:t;if(n==null&&i==null)throw new TypeError("No timeout provided.");return $((a,l)=>{let c,u,d=null,m=0,f=v=>{u=dt(l,o,()=>{try{c.unsubscribe(),be(r({meta:s,lastValue:d,seen:m})).subscribe(l)}catch(b){l.error(b)}},v)};c=a.subscribe(q(l,v=>{u?.unsubscribe(),m++,l.next(d=v),i>0&&f(i)},void 0,void 0,()=>{u?.closed||u?.unsubscribe(),d=null})),!m&&f(n!=null?typeof n=="number"?n:+n-o.now():i)})}function BE(t){throw new VE(t)}function G(t,e){return $((n,i)=>{let r=0;n.subscribe(q(i,o=>{i.next(t.call(e,o,r++))}))})}var{isArray:zE}=Array;function HE(t,e){return zE(e)?t(...e):t(e)}function jv(t){return G(e=>HE(t,e))}var{isArray:GE}=Array,{getPrototypeOf:jE,prototype:WE,keys:$E}=Object;function Wv(t){if(t.length===1){let e=t[0];if(GE(e))return{args:e,keys:null};if(qE(e)){let n=$E(e);return{args:n.map(i=>e[i]),keys:n}}}return{args:t,keys:null}}function qE(t){return t&&typeof t=="object"&&jE(t)===WE}function $v(t,e){return t.reduce((n,i,r)=>(n[i]=e[r],n),{})}function Sl(...t){let e=Cn(t),n=ul(t),{args:i,keys:r}=Wv(t);if(i.length===0)return Fe([],e);let o=new le(XE(i,e,r?s=>$v(r,s):at));return n?o.pipe(jv(n)):o}function XE(t,e,n=at){return i=>{qv(e,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)qv(e,()=>{let c=Fe(t[l],e),u=!1;c.subscribe(q(i,d=>{o[l]=d,u||(u=!0,a--),a||i.next(n(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function qv(t,e,n){t?dt(n,t,e):e()}function Xv(t,e,n,i,r,o,s,a){let l=[],c=0,u=0,d=!1,m=()=>{d&&!l.length&&!c&&e.complete()},f=b=>c<i?v(b):l.push(b),v=b=>{o&&e.next(b),c++;let N=!1;be(n(b,u++)).subscribe(q(e,P=>{r?.(P),o?f(P):e.next(P)},()=>{N=!0},void 0,()=>{if(N)try{for(c--;l.length&&c<i;){let P=l.shift();s?dt(e,s,()=>v(P)):v(P)}m()}catch(P){e.error(P)}}))};return t.subscribe(q(e,f,()=>{d=!0,m()})),()=>{a?.()}}function ke(t,e,n=1/0){return J(e)?ke((i,r)=>G((o,s)=>e(i,o,r,s))(be(t(i,r))),n):(typeof e=="number"&&(n=e),$((i,r)=>Xv(i,r,t,n)))}function wl(t=1/0){return ke(at,t)}function Yv(){return wl(1)}function jr(...t){return Yv()(Fe(t,Cn(t)))}function bs(t){return new le(e=>{be(t()).subscribe(e)})}function Bi(...t){let e=Cn(t),n=Rv(t,1/0),i=t;return i.length?i.length===1?be(i[0]):wl(n)(Fe(i,e)):ze}function pe(t,e){return $((n,i)=>{let r=0;n.subscribe(q(i,o=>t.call(e,o,r++)&&i.next(o)))})}function Kt(t){return $((e,n)=>{let i=null,r=!1,o;i=e.subscribe(q(n,void 0,void 0,s=>{o=be(t(s,Kt(t)(e))),i?(i.unsubscribe(),i=null,o.subscribe(n)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(n))})}function Zv(t,e,n,i,r){return(o,s)=>{let a=n,l=e,c=0;o.subscribe(q(s,u=>{let d=c++;l=a?t(l,u,d):(a=!0,u),i&&s.next(l)},r&&(()=>{a&&s.next(l),s.complete()})))}}function Tt(t,e){return J(e)?ke(t,e,1):ke(t,1)}function Wr(t,e=Zn){return $((n,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,u=e.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}a()}n.subscribe(q(i,c=>{o=c,s=e.now(),r||(r=e.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function _i(t){return $((e,n)=>{let i=!1;e.subscribe(q(n,r=>{i=!0,n.next(r)},()=>{i||n.next(t),n.complete()}))})}function qe(t){return t<=0?()=>ze:$((e,n)=>{let i=0;e.subscribe(q(n,r=>{++i<=t&&(n.next(r),t<=i&&n.complete())}))})}function Hd(){return $((t,e)=>{t.subscribe(q(e,Yn))})}function Gd(){return $((t,e)=>{t.subscribe(q(e,n=>Vd(n,e)))})}function jd(t,e=at){return t=t??YE,$((n,i)=>{let r,o=!0;n.subscribe(q(i,s=>{let a=e(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function YE(t,e){return t===e}function Ml(t=ZE){return $((e,n)=>{let i=!1;e.subscribe(q(n,r=>{i=!0,n.next(r)},()=>i?n.complete():n.error(t())))})}function ZE(){return new dn}function zi(t,e){return e?n=>n.pipe(zi((i,r)=>be(t(i,r)).pipe(G((o,s)=>e(i,o,r,s))))):$((n,i)=>{let r=0,o=null,s=!1;n.subscribe(q(i,a=>{o||(o=q(i,void 0,()=>{o=null,s&&i.complete()}),be(t(a,r++)).subscribe(o))},()=>{s=!0,!o&&i.complete()}))})}function $r(t){return $((e,n)=>{try{e.subscribe(n)}finally{n.add(t)}})}function Kn(t,e){let n=arguments.length>=2;return i=>i.pipe(t?pe((r,o)=>t(r,o,i)):at,qe(1),n?_i(e):Ml(()=>new dn))}function El(t,e,n,i){return $((r,o)=>{let s;!e||typeof e=="function"?s=e:{duration:n,element:s,connector:i}=e;let a=new Map,l=v=>{a.forEach(v),v(o)},c=v=>l(b=>b.error(v)),u=0,d=!1,m=new ms(o,v=>{try{let b=t(v),N=a.get(b);if(!N){a.set(b,N=i?i():new Ie);let P=f(b,N);if(o.next(P),n){let H=q(N,()=>{N.complete(),H?.unsubscribe()},void 0,void 0,()=>a.delete(b));m.add(be(n(P)).subscribe(H))}}N.next(s?s(v):v)}catch(b){c(b)}},()=>l(v=>v.complete()),c,()=>a.clear(),()=>(d=!0,u===0));r.subscribe(m);function f(v,b){let N=new le(P=>{u++;let H=b.subscribe(P);return()=>{H.unsubscribe(),--u===0&&d&&m.unsubscribe()}});return N.key=v,N}})}function qr(t){return t<=0?()=>ze:$((e,n)=>{let i=[];e.subscribe(q(n,r=>{i.push(r),t<i.length&&i.shift()},()=>{for(let r of i)n.next(r);n.complete()},void 0,()=>{i=null}))})}function Wd(t,e){let n=arguments.length>=2;return i=>i.pipe(t?pe((r,o)=>t(r,o,i)):at,qr(1),n?_i(e):Ml(()=>new dn))}function $d(){return $((t,e)=>{t.subscribe(q(e,n=>{e.next(yi.createNext(n))},()=>{e.next(yi.createComplete()),e.complete()},n=>{e.next(yi.createError(n)),e.complete()}))})}function qd(...t){let e=t.length;if(e===0)throw new Error("list of properties cannot be empty.");return G(n=>{let i=n;for(let r=0;r<e;r++){let o=i?.[t[r]];if(typeof o<"u")i=o;else return}return i})}function Hi(t,e){return $(Zv(t,e,arguments.length>=2,!0))}function Yd(t={}){let{connector:e=()=>new Ie,resetOnError:n=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,u=!1,d=!1,m=()=>{a?.unsubscribe(),a=void 0},f=()=>{m(),s=l=void 0,u=d=!1},v=()=>{let b=s;f(),b?.unsubscribe()};return $((b,N)=>{c++,!d&&!u&&m();let P=l=l??e();N.add(()=>{c--,c===0&&!d&&!u&&(a=Xd(v,r))}),P.subscribe(N),!s&&c>0&&(s=new cn({next:H=>P.next(H),error:H=>{d=!0,m(),a=Xd(f,n,H),P.error(H)},complete:()=>{u=!0,m(),a=Xd(f,i),P.complete()}}),be(b).subscribe(s))})(o)}}function Xd(t,e,...n){if(e===!0){t();return}if(e===!1)return;let i=new cn({next:()=>{i.unsubscribe(),t()}});return be(e(...n)).subscribe(i)}function Xr(t){return pe((e,n)=>t<=n)}function Zd(...t){let e=Cn(t);return $((n,i)=>{(e?jr(t,n,e):jr(t,n)).subscribe(i)})}function lt(t,e){return $((n,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();n.subscribe(q(i,l=>{r?.unsubscribe();let c=0,u=o++;be(t(l,u)).subscribe(r=q(i,d=>i.next(e?e(l,d,u,c++):d),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function Gi(t){return $((e,n)=>{be(t).subscribe(q(n,()=>n.complete(),Yn)),!n.closed&&e.subscribe(n)})}function K(t,e,n){let i=J(t)||e||n?{next:t,error:e,complete:n}:t;return i?$((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(q(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):at}function Ue(...t){let e=ul(t);return $((n,i)=>{let r=t.length,o=new Array(r),s=t.map(()=>!1),a=!1;for(let l=0;l<r;l++)be(t[l]).subscribe(q(i,c=>{o[l]=c,!a&&!s[l]&&(s[l]=!0,(a=s.every(at))&&(s=null))},Yn));n.subscribe(q(i,l=>{if(a){let c=[l,...o];i.next(e?e(...c):c)}}))})}var B0="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",z=class extends Error{code;constructor(e,n){super(z0(e,n)),this.code=e}};function KE(t){return`NG0${Math.abs(t)}`}function z0(t,e){return`${KE(t)}${e?": "+e:""}`}var H0=Symbol("InputSignalNode#UNSET"),JE=M(y({},el),{transformFn:void 0,applyValueToInputSignal(t,e){hs(t,e)}});function G0(t,e){let n=Object.create(JE);n.value=t,n.transformFn=e?.transform;function i(){if(us(n),n.value===H0){let r=null;throw new z(-950,r)}return n.value}return i[zt]=n,i}function ac(t){return{toString:t}.toString()}var Cl="__parameters__";function QE(t){return function(...n){if(t){let i=t(...n);for(let r in i)this[r]=i[r]}}}function eC(t,e,n){return ac(()=>{let i=QE(e);function r(...o){if(this instanceof r)return i.apply(this,o),this;let s=new r(...o);return a.annotation=s,a;function a(l,c,u){let d=l.hasOwnProperty(Cl)?l[Cl]:Object.defineProperty(l,Cl,{value:[]})[Cl];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(s),l}}return r.prototype.ngMetadataName=t,r.annotationCls=r,r})}var Tn=globalThis;function Re(t){for(let e in t)if(t[e]===Re)return e;throw Error("Could not find renamed property on target object.")}function Dt(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Dt).join(", ")}]`;if(t==null)return""+t;let e=t.overriddenName||t.name;if(e)return`${e}`;let n=t.toString();if(n==null)return""+n;let i=n.indexOf(`
`);return i>=0?n.slice(0,i):n}function df(t,e){return t?e?`${t} ${e}`:t:e||""}var tC=Re({__forward_ref__:Re});function j0(t){return t.__forward_ref__=j0,t.toString=function(){return Dt(this())},t}function Jt(t){return W0(t)?t():t}function W0(t){return typeof t=="function"&&t.hasOwnProperty(tC)&&t.__forward_ref__===j0}function k(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function lc(t){return Kv(t,q0)||Kv(t,X0)}function $0(t){return lc(t)!==null}function Kv(t,e){return t.hasOwnProperty(e)?t[e]:null}function nC(t){let e=t&&(t[q0]||t[X0]);return e||null}function Jv(t){return t&&(t.hasOwnProperty(Qv)||t.hasOwnProperty(iC))?t[Qv]:null}var q0=Re({\u0275prov:Re}),Qv=Re({\u0275inj:Re}),X0=Re({ngInjectableDef:Re}),iC=Re({ngInjectorDef:Re}),A=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,n){this._desc=e,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=k({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Y0(t){return t&&!!t.\u0275providers}var rC=Re({\u0275cmp:Re}),oC=Re({\u0275dir:Re}),sC=Re({\u0275pipe:Re}),aC=Re({\u0275mod:Re}),kl=Re({\u0275fac:Re}),Es=Re({__NG_ELEMENT_ID__:Re}),e0=Re({__NG_ENV_ID__:Re});function Dn(t){return typeof t=="string"?t:t==null?"":String(t)}function lC(t){return typeof t=="function"?t.name||t.toString():typeof t=="object"&&t!=null&&typeof t.type=="function"?t.type.name||t.type.toString():Dn(t)}function Z0(t,e){throw new z(-200,t)}function hh(t,e){throw new z(-201,!1)}var re=function(t){return t[t.Default=0]="Default",t[t.Host=1]="Host",t[t.Self=2]="Self",t[t.SkipSelf=4]="SkipSelf",t[t.Optional=8]="Optional",t}(re||{}),ff;function K0(){return ff}function It(t){let e=ff;return ff=t,e}function J0(t,e,n){let i=lc(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(n&re.Optional)return null;if(e!==void 0)return e;hh(t,"Injector")}var cC={},Wi=cC,hf="__NG_DI_FLAG__",Ul=class{injector;constructor(e){this.injector=e}retrieve(e,n){let i=n;return this.injector.get(e,i.optional?tl:Wi,i)}},Vl="ngTempTokenPath",uC="ngTokenPath",dC=/\n/gm,fC="\u0275",t0="__source";function hC(t,e=re.Default){if(ps()===void 0)throw new z(-203,!1);if(ps()===null)return J0(t,void 0,e);{let n=ps(),i;return n instanceof Ul?i=n.injector:i=n,i.get(t,e&re.Optional?null:void 0,e)}}function L(t,e=re.Default){return(K0()||hC)(Jt(t),e)}function w(t,e=re.Default){return L(t,cc(e))}function cc(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function pf(t){let e=[];for(let n=0;n<t.length;n++){let i=Jt(t[n]);if(Array.isArray(i)){if(i.length===0)throw new z(900,!1);let r,o=re.Default;for(let s=0;s<i.length;s++){let a=i[s],l=mC(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}e.push(L(r,o))}else e.push(L(i))}return e}function pC(t,e){return t[hf]=e,t.prototype[hf]=e,t}function mC(t){return t[hf]}function gC(t,e,n,i){let r=t[Vl];throw e[t0]&&r.unshift(e[t0]),t.message=vC(`
`+t.message,r,n,i),t[uC]=r,t[Vl]=null,t}function vC(t,e,n,i=null){t=t&&t.charAt(0)===`
`&&t.charAt(1)==fC?t.slice(2):t;let r=Dt(e);if(Array.isArray(e))r=e.map(Dt).join(" -> ");else if(typeof e=="object"){let o=[];for(let s in e)if(e.hasOwnProperty(s)){let a=e[s];o.push(s+":"+(typeof a=="string"?JSON.stringify(a):Dt(a)))}r=`{${o.join(", ")}}`}return`${n}${i?"("+i+")":""}[${r}]: ${t.replace(dC,`
  `)}`}var ph=pC(eC("Inject",t=>({token:t})),-1);function qi(t,e){let n=t.hasOwnProperty(kl);return n?t[kl]:null}function yC(t,e,n){if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=e[i];if(n&&(r=n(r),o=n(o)),o!==r)return!1}return!0}function _C(t){return t.flat(Number.POSITIVE_INFINITY)}function mh(t,e){t.forEach(n=>Array.isArray(n)?mh(n,e):e(n))}function Q0(t,e,n){e>=t.length?t.push(n):t.splice(e,0,n)}function Bl(t,e){return e>=t.length-1?t.pop():t.splice(e,1)[0]}function xC(t,e){let n=[];for(let i=0;i<t;i++)n.push(e);return n}function bC(t,e,n,i){let r=t.length;if(r==e)t.push(n,i);else if(r===1)t.push(i,t[0]),t[0]=n;else{for(r--,t.push(t[r-1],t[r]);r>e;){let o=r-2;t[r]=t[o],r--}t[e]=n,t[e+1]=i}}function gh(t,e,n){let i=Os(t,e);return i>=0?t[i|1]=n:(i=~i,bC(t,i,e,n)),i}function Kd(t,e){let n=Os(t,e);if(n>=0)return t[n|1]}function Os(t,e){return SC(t,e,1)}function SC(t,e,n){let i=0,r=t.length>>n;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<n];if(e===s)return o<<n;s>e?r=o:i=o+1}return~(r<<n)}var Qr={},An=[],Xi=new A(""),ey=new A("",-1),ty=new A(""),zl=class{get(e,n=Wi){if(n===Wi){let i=new Error(`NullInjectorError: No provider for ${Dt(e)}!`);throw i.name="NullInjectorError",i}return n}};function ny(t,e){let n=t[aC]||null;if(!n&&e===!0)throw new Error(`Type ${Dt(t)} does not have '\u0275mod' property.`);return n}function eo(t){return t[rC]||null}function wC(t){return t[oC]||null}function MC(t){return t[sC]||null}function At(t){return{\u0275providers:t}}function tr(t){return At([{provide:Xi,multi:!0,useValue:t}])}function EC(...t){return{\u0275providers:iy(!0,t),\u0275fromNgModule:!0}}function iy(t,...e){let n=[],i=new Set,r,o=s=>{n.push(s)};return mh(e,s=>{let a=s;mf(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&ry(r,o),n}function ry(t,e){for(let n=0;n<t.length;n++){let{ngModule:i,providers:r}=t[n];vh(r,o=>{e(o,i)})}}function mf(t,e,n,i){if(t=Jt(t),!t)return!1;let r=null,o=Jv(t),s=!o&&eo(t);if(!o&&!s){let l=t.ngModule;if(o=Jv(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)mf(c,e,n,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;try{mh(o.imports,u=>{mf(u,e,n,i)&&(c||=[],c.push(u))})}finally{}c!==void 0&&ry(c,e)}if(!a){let c=qi(r)||(()=>new r);e({provide:r,useFactory:c,deps:An},r),e({provide:ty,useValue:r,multi:!0},r),e({provide:Xi,useValue:()=>L(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;vh(l,u=>{e(u,c)})}}else return!1;return r!==t&&t.providers!==void 0}function vh(t,e){for(let n of t)Y0(n)&&(n=n.\u0275providers),Array.isArray(n)?vh(n,e):e(n)}var CC=Re({provide:String,useValue:Re});function oy(t){return t!==null&&typeof t=="object"&&CC in t}function TC(t){return!!(t&&t.useExisting)}function IC(t){return!!(t&&t.useFactory)}function gf(t){return typeof t=="function"}var uc=new A(""),Rl={},n0={},Jd;function yh(){return Jd===void 0&&(Jd=new zl),Jd}var Ht=class{},Cs=class extends Ht{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,n,i,r){super(),this.parent=n,this.source=i,this.scopes=r,yf(e,s=>this.processProvider(s)),this.records.set(ey,Yr(void 0,this)),r.has("environment")&&this.records.set(Ht,Yr(void 0,this));let o=this.records.get(uc);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(ty,An,re.Self))}retrieve(e,n){let i=n;return this.get(e,i.optional?tl:Wi,i)}destroy(){ws(this),this._destroyed=!0;let e=ae(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of n)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ae(e)}}onDestroy(e){return ws(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){ws(this);let n=Xn(this),i=It(void 0),r;try{return e()}finally{Xn(n),It(i)}}get(e,n=Wi,i=re.Default){if(ws(this),e.hasOwnProperty(e0))return e[e0](this);i=cc(i);let r,o=Xn(this),s=It(void 0);try{if(!(i&re.SkipSelf)){let l=this.records.get(e);if(l===void 0){let c=LC(e)&&lc(e);c&&this.injectableDefInScope(c)?l=Yr(vf(e),Rl):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,i)}let a=i&re.Self?yh():this.parent;return n=i&re.Optional&&n===Wi?null:n,a.get(e,n)}catch(a){if(a.name==="NullInjectorError"){if((a[Vl]=a[Vl]||[]).unshift(Dt(e)),o)throw a;return gC(a,e,"R3InjectorError",this.source)}else throw a}finally{It(s),Xn(o)}}resolveInjectorInitializers(){let e=ae(null),n=Xn(this),i=It(void 0),r;try{let o=this.get(Xi,An,re.Self);for(let s of o)s()}finally{Xn(n),It(i),ae(e)}}toString(){let e=[],n=this.records;for(let i of n.keys())e.push(Dt(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=Jt(e);let n=gf(e)?e:Jt(e&&e.provide),i=AC(e);if(!gf(e)&&e.multi===!0){let r=this.records.get(n);r||(r=Yr(void 0,Rl,!0),r.factory=()=>pf(r.multi),this.records.set(n,r)),n=e,r.multi.push(e)}this.records.set(n,i)}hydrate(e,n,i){let r=ae(null);try{return n.value===n0?Z0(Dt(e)):n.value===Rl&&(n.value=n0,n.value=n.factory(void 0,i)),typeof n.value=="object"&&n.value&&PC(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{ae(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let n=Jt(e.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(e){let n=this._onDestroyHooks.indexOf(e);n!==-1&&this._onDestroyHooks.splice(n,1)}};function vf(t){let e=lc(t),n=e!==null?e.factory:qi(t);if(n!==null)return n;if(t instanceof A)throw new z(204,!1);if(t instanceof Function)return DC(t);throw new z(204,!1)}function DC(t){if(t.length>0)throw new z(204,!1);let n=nC(t);return n!==null?()=>n.factory(t):()=>new t}function AC(t){if(oy(t))return Yr(void 0,t.useValue);{let e=RC(t);return Yr(e,Rl)}}function RC(t,e,n){let i;if(gf(t)){let r=Jt(t);return qi(r)||vf(r)}else if(oy(t))i=()=>Jt(t.useValue);else if(IC(t))i=()=>t.useFactory(...pf(t.deps||[]));else if(TC(t))i=(r,o)=>L(Jt(t.useExisting),o!==void 0&&o&re.Optional?re.Optional:void 0);else{let r=Jt(t&&(t.useClass||t.provide));if(NC(t))i=()=>new r(...pf(t.deps));else return qi(r)||vf(r)}return i}function ws(t){if(t.destroyed)throw new z(205,!1)}function Yr(t,e,n=!1){return{factory:t,value:e,multi:n?[]:void 0}}function NC(t){return!!t.deps}function PC(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function LC(t){return typeof t=="function"||typeof t=="object"&&t instanceof A}function yf(t,e){for(let n of t)Array.isArray(n)?yf(n,e):n&&Y0(n)?yf(n.\u0275providers,e):e(n)}function gn(t,e){let n;t instanceof Cs?(ws(t),n=t):n=new Ul(t);let i,r=Xn(n),o=It(void 0);try{return e()}finally{Xn(r),It(o)}}function sy(){return K0()!==void 0||ps()!=null}function _h(t){if(!sy())throw new z(-203,!1)}function OC(t){return typeof t=="function"}var ni=0,ne=1,Q=2,pt=3,pn=4,Rt=5,to=6,Hl=7,nt=8,no=9,Jn=10,it=11,Ts=12,i0=13,fo=14,Gt=15,Yi=16,Zr=17,Qn=18,dc=19,ay=20,xi=21,Qd=22,Zi=23,Qt=24,ef=25,ct=26,ly=1;var Ki=7,Gl=8,io=9,ht=10;function bi(t){return Array.isArray(t)&&typeof t[ly]=="object"}function ii(t){return Array.isArray(t)&&t[ly]===!0}function cy(t){return(t.flags&4)!==0}function ho(t){return t.componentOffset>-1}function xh(t){return(t.flags&1)===1}function nr(t){return!!t.template}function jl(t){return(t[Q]&512)!==0}function po(t){return(t[Q]&256)===256}var _f=class{previousValue;currentValue;firstChange;constructor(e,n,i){this.previousValue=e,this.currentValue=n,this.firstChange=i}isFirstChange(){return this.firstChange}};function uy(t,e,n,i){e!==null?e.applyValueToInputSignal(e,i):t[n]=i}var ir=(()=>{let t=()=>dy;return t.ngInherit=!0,t})();function dy(t){return t.type.prototype.ngOnChanges&&(t.setInput=kC),FC}function FC(){let t=hy(this),e=t?.current;if(e){let n=t.previous;if(n===Qr)t.previous=e;else for(let i in e)n[i]=e[i];t.current=null,this.ngOnChanges(e)}}function kC(t,e,n,i,r){let o=this.declaredInputs[i],s=hy(t)||UC(t,{previous:Qr,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new _f(c&&c.currentValue,n,l===Qr),uy(t,e,r,n)}var fy="__ngSimpleChanges__";function hy(t){return t[fy]||null}function UC(t,e){return t[fy]=e}var r0=null;var Le=function(t,e=null,n){r0?.(t,e,n)},py="svg",VC="math";function Rn(t){for(;Array.isArray(t);)t=t[ni];return t}function my(t,e){return Rn(e[t])}function Ln(t,e){return Rn(e[t.index])}function bh(t,e){return t.data[e]}function gy(t,e){return t[e]}function BC(t,e,n,i){n>=t.data.length&&(t.data[n]=null,t.blueprint[n]=null),e[n]=i}function Nn(t,e){let n=e[t];return bi(n)?n:n[ni]}function zC(t){return(t[Q]&4)===4}function Sh(t){return(t[Q]&128)===128}function HC(t){return ii(t[pt])}function ro(t,e){return e==null?null:t[e]}function vy(t){t[Zr]=0}function yy(t){t[Q]&1024||(t[Q]|=1024,Sh(t)&&Fs(t))}function GC(t,e){for(;t>0;)e=e[fo],t--;return e}function fc(t){return!!(t[Q]&9216||t[Qt]?.dirty)}function xf(t){t[Jn].changeDetectionScheduler?.notify(8),t[Q]&64&&(t[Q]|=1024),fc(t)&&Fs(t)}function Fs(t){t[Jn].changeDetectionScheduler?.notify(0);let e=Ji(t);for(;e!==null&&!(e[Q]&8192||(e[Q]|=8192,!Sh(e)));)e=Ji(e)}function _y(t,e){if(po(t))throw new z(911,!1);t[xi]===null&&(t[xi]=[]),t[xi].push(e)}function jC(t,e){if(t[xi]===null)return;let n=t[xi].indexOf(e);n!==-1&&t[xi].splice(n,1)}function Ji(t){let e=t[pt];return ii(e)?e[pt]:e}function wh(t){return t[Hl]??=[]}function Mh(t){return t.cleanup??=[]}function WC(t,e,n,i){let r=wh(e);r.push(n),t.firstCreatePass&&Mh(t).push(i,r.length-1)}var oe={lFrame:Dy(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var bf=!1;function $C(){return oe.lFrame.elementDepthCount}function qC(){oe.lFrame.elementDepthCount++}function XC(){oe.lFrame.elementDepthCount--}function xy(){return oe.bindingsEnabled}function by(){return oe.skipHydrationRootTNode!==null}function YC(t){return oe.skipHydrationRootTNode===t}function ZC(){oe.skipHydrationRootTNode=null}function ue(){return oe.lFrame.lView}function xt(){return oe.lFrame.tView}function I(t){return oe.lFrame.contextLView=t,t[nt]}function D(t){return oe.lFrame.contextLView=null,t}function en(){let t=Sy();for(;t!==null&&t.type===64;)t=t.parent;return t}function Sy(){return oe.lFrame.currentTNode}function KC(){let t=oe.lFrame,e=t.currentTNode;return t.isParent?e:e.parent}function ks(t,e){let n=oe.lFrame;n.currentTNode=t,n.isParent=e}function wy(){return oe.lFrame.isParent}function My(){oe.lFrame.isParent=!1}function Ey(){return bf}function Wl(t){let e=bf;return bf=t,e}function Eh(){let t=oe.lFrame,e=t.bindingRootIndex;return e===-1&&(e=t.bindingRootIndex=t.tView.bindingStartIndex),e}function Cy(){return oe.lFrame.bindingIndex}function JC(t){return oe.lFrame.bindingIndex=t}function Us(){return oe.lFrame.bindingIndex++}function hc(t){let e=oe.lFrame,n=e.bindingIndex;return e.bindingIndex=e.bindingIndex+t,n}function QC(){return oe.lFrame.inI18n}function eT(t,e){let n=oe.lFrame;n.bindingIndex=n.bindingRootIndex=t,Sf(e)}function tT(){return oe.lFrame.currentDirectiveIndex}function Sf(t){oe.lFrame.currentDirectiveIndex=t}function nT(t){let e=oe.lFrame.currentDirectiveIndex;return e===-1?null:t[e]}function Ch(){return oe.lFrame.currentQueryIndex}function pc(t){oe.lFrame.currentQueryIndex=t}function iT(t){let e=t[ne];return e.type===2?e.declTNode:e.type===1?t[Rt]:null}function Ty(t,e,n){if(n&re.SkipSelf){let r=e,o=t;for(;r=r.parent,r===null&&!(n&re.Host);)if(r=iT(o),r===null||(o=o[fo],r.type&10))break;if(r===null)return!1;e=r,t=o}let i=oe.lFrame=Iy();return i.currentTNode=e,i.lView=t,!0}function Th(t){let e=Iy(),n=t[ne];oe.lFrame=e,e.currentTNode=n.firstChild,e.lView=t,e.tView=n,e.contextLView=t,e.bindingIndex=n.bindingStartIndex,e.inI18n=!1}function Iy(){let t=oe.lFrame,e=t===null?null:t.child;return e===null?Dy(t):e}function Dy(t){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=e),e}function Ay(){let t=oe.lFrame;return oe.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Ry=Ay;function Ih(){let t=Ay();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function rT(t){return(oe.lFrame.contextLView=GC(t,oe.lFrame.contextLView))[nt]}function On(){return oe.lFrame.selectedIndex}function Qi(t){oe.lFrame.selectedIndex=t}function Ny(){let t=oe.lFrame;return bh(t.tView,t.selectedIndex)}function mo(){oe.lFrame.currentNamespace=py}function Py(){oT()}function oT(){oe.lFrame.currentNamespace=null}function sT(){return oe.lFrame.currentNamespace}var Ly=!0;function Dh(){return Ly}function Ah(t){Ly=t}function aT(t,e,n){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=e.type.prototype;if(i){let s=dy(e);(n.preOrderHooks??=[]).push(t,s),(n.preOrderCheckHooks??=[]).push(t,s)}r&&(n.preOrderHooks??=[]).push(0-t,r),o&&((n.preOrderHooks??=[]).push(t,o),(n.preOrderCheckHooks??=[]).push(t,o))}function Oy(t,e){for(let n=e.directiveStart,i=e.directiveEnd;n<i;n++){let o=t.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(t.contentHooks??=[]).push(-n,s),a&&((t.contentHooks??=[]).push(n,a),(t.contentCheckHooks??=[]).push(n,a)),l&&(t.viewHooks??=[]).push(-n,l),c&&((t.viewHooks??=[]).push(n,c),(t.viewCheckHooks??=[]).push(n,c)),u!=null&&(t.destroyHooks??=[]).push(n,u)}}function Nl(t,e,n){Fy(t,e,3,n)}function Pl(t,e,n,i){(t[Q]&3)===n&&Fy(t,e,n,i)}function tf(t,e){let n=t[Q];(n&3)===e&&(n&=16383,n+=1,t[Q]=n)}function Fy(t,e,n,i){let r=i!==void 0?t[Zr]&65535:0,o=i??-1,s=e.length-1,a=0;for(let l=r;l<s;l++)if(typeof e[l+1]=="number"){if(a=e[l],i!=null&&a>=i)break}else e[l]<0&&(t[Zr]+=65536),(a<o||o==-1)&&(lT(t,n,e,l),t[Zr]=(t[Zr]&4294901760)+l+2),l++}function o0(t,e){Le(4,t,e);let n=ae(null);try{e.call(t)}finally{ae(n),Le(5,t,e)}}function lT(t,e,n,i){let r=n[i]<0,o=n[i+1],s=r?-n[i]:n[i],a=t[s];r?t[Q]>>14<t[Zr]>>16&&(t[Q]&3)===e&&(t[Q]+=16384,o0(a,o)):o0(a,o)}var Jr=-1,Is=class{factory;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,n,i){this.factory=e,this.canSeeViewProviders=n,this.injectImpl=i}};function cT(t){return(t.flags&8)!==0}function uT(t){return(t.flags&16)!==0}function dT(t,e,n){let i=0;for(;i<n.length;){let r=n[i];if(typeof r=="number"){if(r!==0)break;i++;let o=n[i++],s=n[i++],a=n[i++];t.setAttribute(e,s,a,o)}else{let o=r,s=n[++i];fT(o)?t.setProperty(e,o,s):t.setAttribute(e,o,s),i++}}return i}function ky(t){return t===3||t===4||t===6}function fT(t){return t.charCodeAt(0)===64}function Rh(t,e){if(!(e===null||e.length===0))if(t===null||t.length===0)t=e.slice();else{let n=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?n=r:n===0||(n===-1||n===2?s0(t,n,r,null,e[++i]):s0(t,n,r,null,null))}}return t}function s0(t,e,n,i,r){let o=0,s=t.length;if(e===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===n){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,e),o=s+1),t.splice(o++,0,n),r!==null&&t.splice(o++,0,r)}function Uy(t){return t!==Jr}function $l(t){return t&32767}function hT(t){return t>>16}function ql(t,e){let n=hT(t),i=e;for(;n>0;)i=i[fo],n--;return i}var wf=!0;function Xl(t){let e=wf;return wf=t,e}var pT=256,Vy=pT-1,By=5,mT=0,In={};function gT(t,e,n){let i;typeof n=="string"?i=n.charCodeAt(0)||0:n.hasOwnProperty(Es)&&(i=n[Es]),i==null&&(i=n[Es]=mT++);let r=i&Vy,o=1<<r;e.data[t+(r>>By)]|=o}function zy(t,e){let n=Hy(t,e);if(n!==-1)return n;let i=e[ne];i.firstCreatePass&&(t.injectorIndex=e.length,nf(i.data,t),nf(e,null),nf(i.blueprint,null));let r=Nh(t,e),o=t.injectorIndex;if(Uy(r)){let s=$l(r),a=ql(r,e),l=a[ne].data;for(let c=0;c<8;c++)e[o+c]=a[s+c]|l[s+c]}return e[o+8]=r,o}function nf(t,e){t.push(0,0,0,0,0,0,0,0,e)}function Hy(t,e){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||e[t.injectorIndex+8]===null?-1:t.injectorIndex}function Nh(t,e){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let n=0,i=null,r=e;for(;r!==null;){if(i=qy(r),i===null)return Jr;if(n++,r=r[fo],i.injectorIndex!==-1)return i.injectorIndex|n<<16}return Jr}function vT(t,e,n){gT(t,e,n)}function yT(t,e){if(e==="class")return t.classes;if(e==="style")return t.styles;let n=t.attrs;if(n){let i=n.length,r=0;for(;r<i;){let o=n[r];if(ky(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof n[r]=="string";)r++;else{if(o===e)return n[r+1];r=r+2}}}return null}function Gy(t,e,n){if(n&re.Optional||t!==void 0)return t;hh(e,"NodeInjector")}function jy(t,e,n,i){if(n&re.Optional&&i===void 0&&(i=null),(n&(re.Self|re.Host))===0){let r=t[no],o=It(void 0);try{return r?r.get(e,i,n&re.Optional):J0(e,i,n&re.Optional)}finally{It(o)}}return Gy(i,e,n)}function Wy(t,e,n,i=re.Default,r){if(t!==null){if(e[Q]&2048&&!(i&re.Self)){let s=ST(t,e,n,i,In);if(s!==In)return s}let o=$y(t,e,n,i,In);if(o!==In)return o}return jy(e,n,i,r)}function $y(t,e,n,i,r){let o=xT(n);if(typeof o=="function"){if(!Ty(e,t,i))return i&re.Host?Gy(r,n,i):jy(e,n,i,r);try{let s;if(s=o(i),s==null&&!(i&re.Optional))hh(n);else return s}finally{Ry()}}else if(typeof o=="number"){let s=null,a=Hy(t,e),l=Jr,c=i&re.Host?e[Gt][Rt]:null;for((a===-1||i&re.SkipSelf)&&(l=a===-1?Nh(t,e):e[a+8],l===Jr||!l0(i,!1)?a=-1:(s=e[ne],a=$l(l),e=ql(l,e)));a!==-1;){let u=e[ne];if(a0(o,a,u.data)){let d=_T(a,e,n,s,i,c);if(d!==In)return d}l=e[a+8],l!==Jr&&l0(i,e[ne].data[a+8]===c)&&a0(o,a,e)?(s=u,a=$l(l),e=ql(l,e)):a=-1}}return r}function _T(t,e,n,i,r,o){let s=e[ne],a=s.data[t+8],l=i==null?ho(a)&&wf:i!=s&&(a.type&3)!==0,c=r&re.Host&&o===a,u=Ll(a,s,n,l,c);return u!==null?Yl(e,s,u,a,r):In}function Ll(t,e,n,i,r){let o=t.providerIndexes,s=e.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,d=i?a:a+u,m=r?a+u:c;for(let f=d;f<m;f++){let v=s[f];if(f<l&&n===v||f>=l&&v.type===n)return f}if(r){let f=s[l];if(f&&nr(f)&&f.type===n)return l}return null}function Yl(t,e,n,i,r){let o=t[n],s=e.data;if(o instanceof Is){let a=o;a.resolving&&Z0(lC(s[n]));let l=Xl(a.canSeeViewProviders);a.resolving=!0;let c,u=a.injectImpl?It(a.injectImpl):null,d=Ty(t,i,re.Default);try{o=t[n]=a.factory(void 0,r,s,t,i),e.firstCreatePass&&n>=i.directiveStart&&aT(n,s[n],e)}finally{u!==null&&It(u),Xl(l),a.resolving=!1,Ry()}}return o}function xT(t){if(typeof t=="string")return t.charCodeAt(0)||0;let e=t.hasOwnProperty(Es)?t[Es]:void 0;return typeof e=="number"?e>=0?e&Vy:bT:e}function a0(t,e,n){let i=1<<t;return!!(n[e+(t>>By)]&i)}function l0(t,e){return!(t&re.Self)&&!(t&re.Host&&e)}var $i=class{_tNode;_lView;constructor(e,n){this._tNode=e,this._lView=n}get(e,n,i){return Wy(this._tNode,this._lView,e,cc(i),n)}};function bT(){return new $i(en(),ue())}function rr(t){return ac(()=>{let e=t.prototype.constructor,n=e[kl]||Mf(e),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[kl]||Mf(r);if(o&&o!==n)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Mf(t){return W0(t)?()=>{let e=Mf(Jt(t));return e&&e()}:qi(t)}function ST(t,e,n,i,r){let o=t,s=e;for(;o!==null&&s!==null&&s[Q]&2048&&!jl(s);){let a=$y(o,s,n,i|re.Self,In);if(a!==In)return a;let l=o.parent;if(!l){let c=s[ay];if(c){let u=c.get(n,In,i);if(u!==In)return u}l=qy(s),s=s[fo]}o=l}return r}function qy(t){let e=t[ne],n=e.type;return n===2?e.declTNode:n===1?t[Rt]:null}function Ph(t){return yT(en(),t)}function c0(t,e=null,n=null,i){let r=Xy(t,e,n,i);return r.resolveInjectorInitializers(),r}function Xy(t,e=null,n=null,i,r=new Set){let o=[n||An,EC(t)];return i=i||(typeof t=="object"?void 0:Dt(t)),new Cs(o,e||yh(),i||null,r)}var yt=class t{static THROW_IF_NOT_FOUND=Wi;static NULL=new zl;static create(e,n){if(Array.isArray(e))return c0({name:""},n,e,"");{let i=e.name??"";return c0({name:i},e.parent,e.providers,i)}}static \u0275prov=k({token:t,providedIn:"any",factory:()=>L(ey)});static __NG_ELEMENT_ID__=-1};var wT=new A("");wT.__NG_ELEMENT_ID__=t=>{let e=en();if(e===null)throw new z(204,!1);if(e.type&2)return e.value;if(t&re.Optional)return null;throw new z(204,!1)};var Yy=!1,Fn=(()=>{class t{static __NG_ELEMENT_ID__=MT;static __NG_ENV_ID__=n=>n}return t})(),Zl=class extends Fn{_lView;constructor(e){super(),this._lView=e}onDestroy(e){let n=this._lView;return po(n)?(e(),()=>{}):(_y(n,e),()=>jC(n,e))}};function MT(){return new Zl(ue())}var oo=class{},mc=new A("",{providedIn:"root",factory:()=>!1});var Zy=new A(""),Ky=new A(""),go=(()=>{class t{taskId=0;pendingTasks=new Set;get _hasPendingTasks(){return this.hasPendingTasks.value}hasPendingTasks=new $e(!1);add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static \u0275prov=k({token:t,providedIn:"root",factory:()=>new t})}return t})();var Ef=class extends Ie{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,sy()&&(this.destroyRef=w(Fn,{optional:!0})??void 0,this.pendingTasks=w(go,{optional:!0})??void 0)}emit(e){let n=ae(null);try{super.next(e)}finally{ae(n)}}subscribe(e,n,i){let r=e,o=n||(()=>null),s=i;if(e&&typeof e=="object"){let l=e;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return e instanceof We&&e.add(a),a}wrapInTimeout(e){return n=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(n)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},ft=Ef;function Ds(...t){}function Jy(t){let e,n;function i(){t=Ds;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{t(),i()})),()=>i()}function u0(t){return queueMicrotask(()=>t()),()=>{t=Ds}}var Lh="isAngularZone",Kl=Lh+"_ID",ET=0,Ae=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ft(!1);onMicrotaskEmpty=new ft(!1);onStable=new ft(!1);onError=new ft(!1);constructor(e){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=Yy}=e;if(typeof Zone>"u")throw new z(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,IT(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Lh)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new z(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new z(909,!1)}run(e,n,i){return this._inner.run(e,n,i)}runTask(e,n,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,e,CT,Ds,Ds);try{return o.runTask(s,n,i)}finally{o.cancelTask(s)}}runGuarded(e,n,i){return this._inner.runGuarded(e,n,i)}runOutsideAngular(e){return this._outer.run(e)}},CT={};function Oh(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function TT(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function e(){Jy(()=>{t.callbackScheduled=!1,Cf(t),t.isCheckStableRunning=!0,Oh(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{e()}):t._outer.run(()=>{e()}),Cf(t)}function IT(t){let e=()=>{TT(t)},n=ET++;t._inner=t._inner.fork({name:"angular",properties:{[Lh]:!0,[Kl]:n,[Kl+n]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(DT(l))return i.invokeTask(o,s,a,l);try{return d0(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&e(),f0(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return d0(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!AT(l)&&e(),f0(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,Cf(t),Oh(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function Cf(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function d0(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function f0(t){t._nesting--,Oh(t)}var Tf=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ft;onMicrotaskEmpty=new ft;onStable=new ft;onError=new ft;run(e,n,i){return e.apply(n,i)}runGuarded(e,n,i){return e.apply(n,i)}runOutsideAngular(e){return e()}runTask(e,n,i,r){return e.apply(n,i)}};function DT(t){return Qy(t,"__ignore_ng_zone__")}function AT(t){return Qy(t,"__scheduler_tick__")}function Qy(t,e){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[e]===!0}var _t=class{_console=console;handleError(e){this._console.error("ERROR",e)}},RT=new A("",{providedIn:"root",factory:()=>{let t=w(Ae),e=w(_t);return n=>t.runOutsideAngular(()=>e.handleError(n))}});function h0(t,e){return G0(t,e)}function NT(t){return G0(H0,t)}var Vs=(h0.required=NT,h0);function PT(){return vo(en(),ue())}function vo(t,e){return new or(Ln(t,e))}var or=(()=>{class t{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=PT}return t})();function e_(t){return t instanceof or?t.nativeElement:t}function Oe(t,e){let n=Cd(t,e?.equal),i=n[zt];return n.set=r=>hs(i,r),n.update=r=>Td(i,r),n.asReadonly=LT.bind(n),n}function LT(){let t=this[zt];if(t.readonlyFn===void 0){let e=()=>this();e[zt]=t,t.readonlyFn=e}return t.readonlyFn}function OT(){return this._results[Symbol.iterator]()}var If=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ie}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,n){return this._results.reduce(e,n)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,n){this.dirty=!1;let i=_C(e);(this._changesDetected=!yC(this._results,i,n))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=OT};function t_(t){return(t.flags&128)===128}var n_=function(t){return t[t.OnPush=0]="OnPush",t[t.Default=1]="Default",t}(n_||{}),i_=new Map,FT=0;function kT(){return FT++}function UT(t){i_.set(t[dc],t)}function Df(t){i_.delete(t[dc])}var p0="__ngContext__";function Bs(t,e){bi(e)?(t[p0]=e[dc],UT(e)):t[p0]=e}function r_(t){return s_(t[Ts])}function o_(t){return s_(t[pn])}function s_(t){for(;t!==null&&!ii(t);)t=t[pn];return t}var Af;function a_(t){Af=t}function l_(){if(Af!==void 0)return Af;if(typeof document<"u")return document;throw new z(210,!1)}var Fh=new A("",{providedIn:"root",factory:()=>VT}),VT="ng",kh=new A(""),zs=new A("",{providedIn:"platform",factory:()=>"unknown"});var Uh=new A("",{providedIn:"root",factory:()=>l_().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var BT="h",zT="b";var c_=!1,HT=new A("",{providedIn:"root",factory:()=>c_});var u_=function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t}(u_||{}),gc=new A(""),m0=new Set;function Hs(t){m0.has(t)||(m0.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var d_=(()=>{class t{view;node;constructor(n,i){this.view=n,this.node=i}static __NG_ELEMENT_ID__=GT}return t})();function GT(){return new d_(ue(),en())}var jT=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=k({token:t,providedIn:"root",factory:()=>new t})}return t})();var WT=(t,e,n,i)=>{};function $T(t,e,n,i){WT(t,e,n,i)}var qT=()=>null;function f_(t,e,n=!1){return qT(t,e,n)}function h_(t,e){let n=t.contentQueries;if(n!==null){let i=ae(null);try{for(let r=0;r<n.length;r+=2){let o=n[r],s=n[r+1];if(s!==-1){let a=t.data[s];pc(o),a.contentQueries(2,e[s],s)}}}finally{ae(i)}}}function Rf(t,e,n){pc(0);let i=ae(null);try{e(t,n)}finally{ae(i)}}function p_(t,e,n){if(cy(e)){let i=ae(null);try{let r=e.directiveStart,o=e.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=n[s];a.contentQueries(1,l,s)}}}finally{ae(i)}}}var Pn=function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t}(Pn||{});var Tl;function XT(){if(Tl===void 0&&(Tl=null,Tn.trustedTypes))try{Tl=Tn.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Tl}function vc(t){return XT()?.createHTML(t)||t}var Il;function m_(){if(Il===void 0&&(Il=null,Tn.trustedTypes))try{Il=Tn.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Il}function g0(t){return m_()?.createHTML(t)||t}function v0(t){return m_()?.createScriptURL(t)||t}var ei=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${B0})`}},Nf=class extends ei{getTypeName(){return"HTML"}},Pf=class extends ei{getTypeName(){return"Style"}},Lf=class extends ei{getTypeName(){return"Script"}},Of=class extends ei{getTypeName(){return"URL"}},Ff=class extends ei{getTypeName(){return"ResourceURL"}};function vn(t){return t instanceof ei?t.changingThisBreaksApplicationSecurity:t}function ri(t,e){let n=YT(t);if(n!=null&&n!==e){if(n==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${n} (see ${B0})`)}return n===e}function YT(t){return t instanceof ei&&t.getTypeName()||null}function g_(t){return new Nf(t)}function v_(t){return new Pf(t)}function y_(t){return new Lf(t)}function __(t){return new Of(t)}function x_(t){return new Ff(t)}function ZT(t){let e=new Uf(t);return KT()?new kf(e):e}var kf=class{inertDocumentHelper;constructor(e){this.inertDocumentHelper=e}getInertBodyElement(e){e="<body><remove></remove>"+e;try{let n=new window.DOMParser().parseFromString(vc(e),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(e):(n.firstChild?.remove(),n)}catch{return null}}},Uf=class{defaultDoc;inertDocument;constructor(e){this.defaultDoc=e,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(e){let n=this.inertDocument.createElement("template");return n.innerHTML=vc(e),n}};function KT(){try{return!!new window.DOMParser().parseFromString(vc(""),"text/html")}catch{return!1}}var JT=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function yc(t){return t=String(t),t.match(JT)?t:"unsafe:"+t}function oi(t){let e={};for(let n of t.split(","))e[n]=!0;return e}function Gs(...t){let e={};for(let n of t)for(let i in n)n.hasOwnProperty(i)&&(e[i]=!0);return e}var b_=oi("area,br,col,hr,img,wbr"),S_=oi("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),w_=oi("rp,rt"),QT=Gs(w_,S_),eI=Gs(S_,oi("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),tI=Gs(w_,oi("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),y0=Gs(b_,eI,tI,QT),M_=oi("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),nI=oi("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),iI=oi("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),rI=Gs(M_,nI,iI),oI=oi("script,style,template");var Vf=class{sanitizedSomething=!1;buf=[];sanitizeChildren(e){let n=e.firstChild,i=!0,r=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?i=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,i&&n.firstChild){r.push(n),n=lI(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let o=aI(n);if(o){n=o;break}n=r.pop()}}return this.buf.join("")}startElement(e){let n=_0(e).toLowerCase();if(!y0.hasOwnProperty(n))return this.sanitizedSomething=!0,!oI.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let i=e.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!rI.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;M_[a]&&(l=yc(l)),this.buf.push(" ",s,'="',x0(l),'"')}return this.buf.push(">"),!0}endElement(e){let n=_0(e).toLowerCase();y0.hasOwnProperty(n)&&!b_.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(e){this.buf.push(x0(e))}};function sI(t,e){return(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function aI(t){let e=t.nextSibling;if(e&&t!==e.previousSibling)throw E_(e);return e}function lI(t){let e=t.firstChild;if(e&&sI(t,e))throw E_(e);return e}function _0(t){let e=t.nodeName;return typeof e=="string"?e:"FORM"}function E_(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var cI=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,uI=/([^\#-~ |!])/g;function x0(t){return t.replace(/&/g,"&amp;").replace(cI,function(e){let n=e.charCodeAt(0),i=e.charCodeAt(1);return"&#"+((n-55296)*1024+(i-56320)+65536)+";"}).replace(uI,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Dl;function Vh(t,e){let n=null;try{Dl=Dl||ZT(t);let i=e?String(e):"";n=Dl.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=n.innerHTML,n=Dl.getInertBodyElement(i)}while(i!==o);let a=new Vf().sanitizeChildren(b0(n)||n);return vc(a)}finally{if(n){let i=b0(n)||n;for(;i.firstChild;)i.firstChild.remove()}}}function b0(t){return"content"in t&&dI(t)?t.content:null}function dI(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function fI(t,e){return t.createText(e)}function hI(t,e,n){t.setValue(e,n)}function C_(t,e,n){return t.createElement(e,n)}function Jl(t,e,n,i,r){t.insertBefore(e,n,i,r)}function T_(t,e,n){t.appendChild(e,n)}function S0(t,e,n,i,r){i!==null?Jl(t,e,n,i,r):T_(t,e,n)}function pI(t,e,n){t.removeChild(null,e,n)}function mI(t,e,n){t.setAttribute(e,"style",n)}function gI(t,e,n){n===""?t.removeAttribute(e,"class"):t.setAttribute(e,"class",n)}function I_(t,e,n){let{mergedAttrs:i,classes:r,styles:o}=n;i!==null&&dT(t,e,i),r!==null&&gI(t,e,r),o!==null&&mI(t,e,o)}var yn=function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t}(yn||{});function D_(t){let e=Bh();return e?g0(e.sanitize(yn.HTML,t)||""):ri(t,"HTML")?g0(vn(t)):Vh(l_(),Dn(t))}function vI(t){let e=Bh();return e?e.sanitize(yn.URL,t)||"":ri(t,"URL")?vn(t):yc(Dn(t))}function yI(t){let e=Bh();if(e)return v0(e.sanitize(yn.RESOURCE_URL,t)||"");if(ri(t,"ResourceURL"))return v0(vn(t));throw new z(904,!1)}var _I=new Set(["embed","frame","iframe","media","script"]),xI=new Set(["base","link","script"]);function bI(t,e){return e==="src"&&_I.has(t)||e==="href"&&xI.has(t)||e==="xlink:href"&&t==="script"?yI:vI}function A_(t,e,n){return bI(e,n)(t)}function Bh(){let t=ue();return t&&t[Jn].sanitizer}function zh(t){return t.ownerDocument}function R_(t){return t instanceof Function?t():t}function SI(t,e,n){let i=t.length;for(;;){let r=t.indexOf(e,n);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=e.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}n=r+1}}var N_="ng-template";function wI(t,e,n,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&SI(e[r+1].toLowerCase(),n,0)!==-1)return!0}else if(Hh(t))return!1;if(r=e.indexOf(1,r),r>-1){let o;for(;++r<e.length&&typeof(o=e[r])=="string";)if(o.toLowerCase()===n)return!0}return!1}function Hh(t){return t.type===4&&t.value!==N_}function MI(t,e,n){let i=t.type===4&&!n?N_:t.value;return e===i}function EI(t,e,n){let i=4,r=t.attrs,o=r!==null?II(r):0,s=!1;for(let a=0;a<e.length;a++){let l=e[a];if(typeof l=="number"){if(!s&&!fn(i)&&!fn(l))return!1;if(s&&fn(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!MI(t,l,n)||l===""&&e.length===1){if(fn(i))return!1;s=!0}}else if(i&8){if(r===null||!wI(t,r,l,n)){if(fn(i))return!1;s=!0}}else{let c=e[++a],u=CI(l,r,Hh(t),n);if(u===-1){if(fn(i))return!1;s=!0;continue}if(c!==""){let d;if(u>o?d="":d=r[u+1].toLowerCase(),i&2&&c!==d){if(fn(i))return!1;s=!0}}}}return fn(i)||s}function fn(t){return(t&1)===0}function CI(t,e,n,i){if(e===null)return-1;let r=0;if(i||!n){let o=!1;for(;r<e.length;){let s=e[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return DI(e,t)}function P_(t,e,n=!1){for(let i=0;i<e.length;i++)if(EI(t,e[i],n))return!0;return!1}function TI(t){let e=t.attrs;if(e!=null){let n=e.indexOf(5);if((n&1)===0)return e[n+1]}return null}function II(t){for(let e=0;e<t.length;e++){let n=t[e];if(ky(n))return e}return t.length}function DI(t,e){let n=t.indexOf(4);if(n>-1)for(n++;n<t.length;){let i=t[n];if(typeof i=="number")return-1;if(i===e)return n;n++}return-1}function AI(t,e){e:for(let n=0;n<e.length;n++){let i=e[n];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function w0(t,e){return t?":not("+e.trim()+")":e}function RI(t){let e=t[0],n=1,i=2,r="",o=!1;for(;n<t.length;){let s=t[n];if(typeof s=="string")if(i&2){let a=t[++n];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!fn(s)&&(e+=w0(o,r),r=""),i=s,o=o||!fn(i);n++}return r!==""&&(e+=w0(o,r)),e}function NI(t){return t.map(RI).join(",")}function PI(t){let e=[],n=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&e.push(o,t[++i]):r===8&&n.push(o);else{if(!fn(r))break;r=o}i++}return n.length&&e.push(1,...n),e}var Nt={};function Gh(t,e,n,i,r,o,s,a,l,c,u){let d=ct+i,m=d+r,f=LI(d,m),v=typeof c=="function"?c():c;return f[ne]={type:t,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:e,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:u}}function LI(t,e){let n=[];for(let i=0;i<e;i++)n.push(i<t?null:Nt);return n}function OI(t){let e=t.tView;return e===null||e.incompleteFirstPass?t.tView=Gh(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):e}function jh(t,e,n,i,r,o,s,a,l,c,u){let d=e.blueprint.slice();return d[ni]=r,d[Q]=i|4|128|8|64|1024,(c!==null||t&&t[Q]&2048)&&(d[Q]|=2048),vy(d),d[pt]=d[fo]=t,d[nt]=n,d[Jn]=s||t&&t[Jn],d[it]=a||t&&t[it],d[no]=l||t&&t[no]||null,d[Rt]=o,d[dc]=kT(),d[to]=u,d[ay]=c,d[Gt]=e.type==2?t[Gt]:d,d}function FI(t,e,n){let i=Ln(e,t),r=OI(n),o=t[Jn].rendererFactory,s=Wh(t,jh(t,r,null,L_(n),i,e,null,o.createRenderer(i,n),null,null,null));return t[e.index]=s}function L_(t){let e=16;return t.signals?e=4096:t.onPush&&(e=64),e}function O_(t,e,n,i){if(n===0)return-1;let r=e.length;for(let o=0;o<n;o++)e.push(i),t.blueprint.push(i),t.data.push(null);return r}function Wh(t,e){return t[Ts]?t[i0][pn]=e:t[Ts]=e,t[i0]=e,e}function _(t=1){F_(xt(),ue(),On()+t,!1)}function F_(t,e,n,i){if(!i)if((e[Q]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Nl(e,o,n)}else{let o=t.preOrderHooks;o!==null&&Pl(e,o,0,n)}Qi(n)}var _c=function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t}(_c||{});function Bf(t,e,n,i){let r=ae(null);try{let[o,s,a]=t.inputs[n],l=null;(s&_c.SignalBased)!==0&&(l=e[o][zt]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(e,i)),t.setInput!==null?t.setInput(e,l,i,n,o):uy(e,l,o,i)}finally{ae(r)}}function k_(t,e,n,i,r){let o=On(),s=i&2;try{Qi(-1),s&&e.length>ct&&F_(t,e,ct,!1),Le(s?2:0,r),n(i,r)}finally{Qi(o),Le(s?3:1,r)}}function $h(t,e,n){GI(t,e,n),(n.flags&64)===64&&jI(t,e,n)}function U_(t,e,n=Ln){let i=e.localNames;if(i!==null){let r=e.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?n(e,t):t[s];t[r++]=a}}}function kI(t,e,n,i){let o=i.get(HT,c_)||n===Pn.ShadowDom,s=t.selectRootElement(e,o);return UI(s),s}function UI(t){VI(t)}var VI=()=>null;function BI(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function zI(t,e,n,i,r,o,s,a){if(!a&&qh(e,t,n,i,r)){ho(e)&&HI(n,e.index);return}if(e.type&3){let l=Ln(e,n);i=BI(i),r=s!=null?s(r,e.value||"",i):r,o.setProperty(l,i,r)}else e.type&12}function HI(t,e){let n=Nn(e,t);n[Q]&16||(n[Q]|=64)}function GI(t,e,n){let i=n.directiveStart,r=n.directiveEnd;ho(n)&&FI(e,n,t.data[i+n.componentOffset]),t.firstCreatePass||zy(n,e);let o=n.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=Yl(e,t,s,n);if(Bs(l,e),o!==null&&XI(e,s-i,l,a,n,o),nr(a)){let c=Nn(n.index,e);c[nt]=Yl(e,t,s,n)}}}function jI(t,e,n){let i=n.directiveStart,r=n.directiveEnd,o=n.index,s=tT();try{Qi(o);for(let a=i;a<r;a++){let l=t.data[a],c=e[a];Sf(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&WI(l,c)}}finally{Qi(-1),Sf(s)}}function WI(t,e){t.hostBindings!==null&&t.hostBindings(1,e)}function V_(t,e){let n=t.directiveRegistry,i=null;if(n)for(let r=0;r<n.length;r++){let o=n[r];P_(e,o.selectors,!1)&&(i??=[],nr(o)?i.unshift(o):i.push(o))}return i}function $I(t,e,n,i,r,o){let s=Ln(t,e);qI(e[it],s,o,t.value,n,i,r)}function qI(t,e,n,i,r,o,s){if(o==null)t.removeAttribute(e,r,n);else{let a=s==null?Dn(o):s(o,i||"",r);t.setAttribute(e,r,a,n)}}function XI(t,e,n,i,r,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];Bf(i,n,l,c)}}function YI(t,e){let n=t[no],i=n?n.get(_t,null):null;i&&i.handleError(e)}function qh(t,e,n,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],d=e.data[c];Bf(d,n[c],u,r),a=!0}if(o)for(let l of o){let c=n[l],u=e.data[l];Bf(u,c,i,r),a=!0}return a}function ZI(t,e){let n=Nn(e,t),i=n[ne];KI(i,n);let r=n[ni];r!==null&&n[to]===null&&(n[to]=f_(r,n[no])),Le(18),Xh(i,n,n[nt]),Le(19,n[nt])}function KI(t,e){for(let n=e.length;n<t.blueprint.length;n++)e.push(t.blueprint[n])}function Xh(t,e,n){Th(e);try{let i=t.viewQuery;i!==null&&Rf(1,i,n);let r=t.template;r!==null&&k_(t,e,r,1,n),t.firstCreatePass&&(t.firstCreatePass=!1),e[Qn]?.finishViewCreation(t),t.staticContentQueries&&h_(t,e),t.staticViewQueries&&Rf(2,t.viewQuery,n);let o=t.components;o!==null&&JI(e,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{e[Q]&=-5,Ih()}}function JI(t,e){for(let n=0;n<e.length;n++)ZI(t,e[n])}function js(t,e,n,i){let r=ae(null);try{let o=e.tView,a=t[Q]&4096?4096:16,l=jh(t,o,n,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[e.index];l[Yi]=c;let u=t[Qn];return u!==null&&(l[Qn]=u.createEmbeddedView(o)),Xh(o,l,n),l}finally{ae(r)}}function so(t,e){return!e||e.firstChild===null||t_(t)}var QI;function Yh(t,e){return QI(t,e)}var ti=function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t}(ti||{});function Zh(t){return(t.flags&32)===32}function Kr(t,e,n,i,r){if(i!=null){let o,s=!1;ii(i)?o=i:bi(i)&&(s=!0,i=i[ni]);let a=Rn(i);t===0&&n!==null?r==null?T_(e,n,a):Jl(e,n,a,r||null,!0):t===1&&n!==null?Jl(e,n,a,r||null,!0):t===2?pI(e,a,s):t===3&&e.destroyNode(a),o!=null&&cD(e,t,o,n,r)}}function eD(t,e){B_(t,e),e[ni]=null,e[Rt]=null}function tD(t,e,n,i,r,o){i[ni]=r,i[Rt]=e,bc(t,i,n,1,r,o)}function B_(t,e){e[Jn].changeDetectionScheduler?.notify(9),bc(t,e,e[it],2,null,null)}function nD(t){let e=t[Ts];if(!e)return rf(t[ne],t);for(;e;){let n=null;if(bi(e))n=e[Ts];else{let i=e[ht];i&&(n=i)}if(!n){for(;e&&!e[pn]&&e!==t;)bi(e)&&rf(e[ne],e),e=e[pt];e===null&&(e=t),bi(e)&&rf(e[ne],e),n=e&&e[pn]}e=n}}function Kh(t,e){let n=t[io],i=n.indexOf(e);n.splice(i,1)}function xc(t,e){if(po(e))return;let n=e[it];n.destroyNode&&bc(t,e,n,3,null,null),nD(e)}function rf(t,e){if(po(e))return;let n=ae(null);try{e[Q]&=-129,e[Q]|=256,e[Qt]&&fs(e[Qt]),rD(t,e),iD(t,e),e[ne].type===1&&e[it].destroy();let i=e[Yi];if(i!==null&&ii(e[pt])){i!==e[pt]&&Kh(i,e);let r=e[Qn];r!==null&&r.detachView(t)}Df(e)}finally{ae(n)}}function iD(t,e){let n=t.cleanup,i=e[Hl];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[n[s+1]];n[s].call(a)}i!==null&&(e[Hl]=null);let r=e[xi];if(r!==null){e[xi]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=e[Zi];if(o!==null){e[Zi]=null;for(let s of o)s.destroy()}}function rD(t,e){let n;if(t!=null&&(n=t.destroyHooks)!=null)for(let i=0;i<n.length;i+=2){let r=e[n[i]];if(!(r instanceof Is)){let o=n[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Le(4,a,l);try{l.call(a)}finally{Le(5,a,l)}}else{Le(4,r,o);try{o.call(r)}finally{Le(5,r,o)}}}}}function z_(t,e,n){return oD(t,e.parent,n)}function oD(t,e,n){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return n[ni];if(ho(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Pn.None||r===Pn.Emulated)return null}return Ln(i,n)}function H_(t,e,n){return aD(t,e,n)}function sD(t,e,n){return t.type&40?Ln(t,n):null}var aD=sD,M0;function Jh(t,e,n,i){let r=z_(t,i,e),o=e[it],s=i.parent||e[Rt],a=H_(s,i,e);if(r!=null)if(Array.isArray(n))for(let l=0;l<n.length;l++)S0(o,r,n[l],a,!1);else S0(o,r,n,a,!1);M0!==void 0&&M0(o,i,e,n,r)}function Ms(t,e){if(e!==null){let n=e.type;if(n&3)return Ln(e,t);if(n&4)return zf(-1,t[e.index]);if(n&8){let i=e.child;if(i!==null)return Ms(t,i);{let r=t[e.index];return ii(r)?zf(-1,r):Rn(r)}}else{if(n&128)return Ms(t,e.next);if(n&32)return Yh(e,t)()||Rn(t[e.index]);{let i=G_(t,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Ji(t[Gt]);return Ms(r,i)}else return Ms(t,e.next)}}}return null}function G_(t,e){if(e!==null){let i=t[Gt][Rt],r=e.projection;return i.projection[r]}return null}function zf(t,e){let n=ht+t+1;if(n<e.length){let i=e[n],r=i[ne].firstChild;if(r!==null)return Ms(i,r)}return e[Ki]}function Qh(t,e,n,i,r,o,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=i[n.index],l=n.type;if(s&&e===0&&(a&&Bs(Rn(a),i),n.flags|=2),!Zh(n))if(l&8)Qh(t,e,n.child,i,r,o,!1),Kr(e,t,r,a,o);else if(l&32){let c=Yh(n,i),u;for(;u=c();)Kr(e,t,r,u,o);Kr(e,t,r,a,o)}else l&16?j_(t,e,i,n,r,o):Kr(e,t,r,a,o);n=s?n.projectionNext:n.next}}function bc(t,e,n,i,r,o){Qh(n,i,t.firstChild,e,r,o,!1)}function lD(t,e,n){let i=e[it],r=z_(t,n,e),o=n.parent||e[Rt],s=H_(o,n,e);j_(i,0,e,n,r,s)}function j_(t,e,n,i,r,o){let s=n[Gt],l=s[Rt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];Kr(e,t,r,u,o)}else{let c=l,u=s[pt];t_(i)&&(c.flags|=128),Qh(t,e,c,u,r,o,!0)}}function cD(t,e,n,i,r){let o=n[Ki],s=Rn(n);o!==s&&Kr(e,t,i,o,r);for(let a=ht;a<n.length;a++){let l=n[a];bc(l[ne],l,t,e,i,o)}}function uD(t,e,n,i,r){if(e)r?t.addClass(n,i):t.removeClass(n,i);else{let o=i.indexOf("-")===-1?void 0:ti.DashCase;r==null?t.removeStyle(n,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=ti.Important),t.setStyle(n,i,r,o))}}function Ql(t,e,n,i,r=!1){for(;n!==null;){if(n.type===128){n=r?n.projectionNext:n.next;continue}let o=e[n.index];o!==null&&i.push(Rn(o)),ii(o)&&dD(o,i);let s=n.type;if(s&8)Ql(t,e,n.child,i);else if(s&32){let a=Yh(n,e),l;for(;l=a();)i.push(l)}else if(s&16){let a=G_(e,n);if(Array.isArray(a))i.push(...a);else{let l=Ji(e[Gt]);Ql(l[ne],l,a,i,!0)}}n=r?n.projectionNext:n.next}return i}function dD(t,e){for(let n=ht;n<t.length;n++){let i=t[n],r=i[ne].firstChild;r!==null&&Ql(i[ne],i,r,e)}t[Ki]!==t[ni]&&e.push(t[Ki])}function W_(t){if(t[ef]!==null){for(let e of t[ef])e.impl.addSequence(e);t[ef].length=0}}var $_=[];function fD(t){return t[Qt]??hD(t)}function hD(t){let e=$_.pop()??Object.create(mD);return e.lView=t,e}function pD(t){t.lView[Qt]!==t&&(t.lView=null,$_.push(t))}var mD=M(y({},Or),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{Fs(t.lView)},consumerOnSignalRead(){this.lView[Qt]=this}});function gD(t){let e=t[Qt]??Object.create(vD);return e.lView=t,e}var vD=M(y({},Or),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let e=Ji(t.lView);for(;e&&!q_(e[ne]);)e=Ji(e);e&&yy(e)},consumerOnSignalRead(){this.lView[Qt]=this}});function q_(t){return t.type!==2}function X_(t){if(t[Zi]===null)return;let e=!0;for(;e;){let n=!1;for(let i of t[Zi])i.dirty&&(n=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=n&&!!(t[Q]&8192)}}var yD=100;function Y_(t,e=!0,n=0){let r=t[Jn].rendererFactory,o=!1;o||r.begin?.();try{_D(t,n)}catch(s){throw e&&YI(t,s),s}finally{o||r.end?.()}}function _D(t,e){let n=Ey();try{Wl(!0),Hf(t,e);let i=0;for(;fc(t);){if(i===yD)throw new z(103,!1);i++,Hf(t,1)}}finally{Wl(n)}}function xD(t,e,n,i){if(po(e))return;let r=e[Q],o=!1,s=!1;Th(e);let a=!0,l=null,c=null;o||(q_(t)?(c=fD(e),l=ds(c)):bd()===null?(a=!1,c=gD(e),l=ds(c)):e[Qt]&&(fs(e[Qt]),e[Qt]=null));try{vy(e),JC(t.bindingStartIndex),n!==null&&k_(t,e,n,2,i);let u=(r&3)===3;if(!o)if(u){let f=t.preOrderCheckHooks;f!==null&&Nl(e,f,null)}else{let f=t.preOrderHooks;f!==null&&Pl(e,f,0,null),tf(e,0)}if(s||bD(e),X_(e),Z_(e,0),t.contentQueries!==null&&h_(t,e),!o)if(u){let f=t.contentCheckHooks;f!==null&&Nl(e,f)}else{let f=t.contentHooks;f!==null&&Pl(e,f,1),tf(e,1)}wD(t,e);let d=t.components;d!==null&&J_(e,d,0);let m=t.viewQuery;if(m!==null&&Rf(2,m,i),!o)if(u){let f=t.viewCheckHooks;f!==null&&Nl(e,f)}else{let f=t.viewHooks;f!==null&&Pl(e,f,2),tf(e,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),e[Qd]){for(let f of e[Qd])f();e[Qd]=null}o||(W_(e),e[Q]&=-73)}catch(u){throw o||Fs(e),u}finally{c!==null&&(Ya(c,l),a&&pD(c)),Ih()}}function Z_(t,e){for(let n=r_(t);n!==null;n=o_(n))for(let i=ht;i<n.length;i++){let r=n[i];K_(r,e)}}function bD(t){for(let e=r_(t);e!==null;e=o_(e)){if(!(e[Q]&2))continue;let n=e[io];for(let i=0;i<n.length;i++){let r=n[i];yy(r)}}}function SD(t,e,n){Le(18);let i=Nn(e,t);K_(i,n),Le(19,i[nt])}function K_(t,e){Sh(t)&&Hf(t,e)}function Hf(t,e){let i=t[ne],r=t[Q],o=t[Qt],s=!!(e===0&&r&16);if(s||=!!(r&64&&e===0),s||=!!(r&1024),s||=!!(o?.dirty&&Za(o)),s||=!1,o&&(o.dirty=!1),t[Q]&=-9217,s)xD(i,t,i.template,t[nt]);else if(r&8192){X_(t),Z_(t,1);let a=i.components;a!==null&&J_(t,a,1),W_(t)}}function J_(t,e,n){for(let i=0;i<e.length;i++)SD(t,e[i],n)}function wD(t,e){let n=t.hostBindingOpCodes;if(n!==null)try{for(let i=0;i<n.length;i++){let r=n[i];if(r<0)Qi(~r);else{let o=r,s=n[++i],a=n[++i];eT(s,o);let l=e[o];Le(24,l),a(2,l),Le(25,l)}}}finally{Qi(-1)}}function ep(t,e){let n=Ey()?64:1088;for(t[Jn].changeDetectionScheduler?.notify(e);t;){t[Q]|=n;let i=Ji(t);if(jl(t)&&!i)return t;t=i}return null}function Q_(t,e,n,i){return[t,!0,0,e,null,i,null,n,null,null]}function ex(t,e){let n=ht+e;if(n<t.length)return t[n]}function Ws(t,e,n,i=!0){let r=e[ne];if(MD(r,e,t,n),i){let s=zf(n,t),a=e[it],l=a.parentNode(t[Ki]);l!==null&&tD(r,t[Rt],a,e,l,s)}let o=e[to];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function tx(t,e){let n=As(t,e);return n!==void 0&&xc(n[ne],n),n}function As(t,e){if(t.length<=ht)return;let n=ht+e,i=t[n];if(i){let r=i[Yi];r!==null&&r!==t&&Kh(r,i),e>0&&(t[n-1][pn]=i[pn]);let o=Bl(t,ht+e);eD(i[ne],i);let s=o[Qn];s!==null&&s.detachView(o[ne]),i[pt]=null,i[pn]=null,i[Q]&=-129}return i}function MD(t,e,n,i){let r=ht+i,o=n.length;i>0&&(n[r-1][pn]=e),i<o-ht?(e[pn]=n[r],Q0(n,ht+i,e)):(n.push(e),e[pn]=null),e[pt]=n;let s=e[Yi];s!==null&&n!==s&&nx(s,e);let a=e[Qn];a!==null&&a.insertView(t),xf(e),e[Q]|=128}function nx(t,e){let n=t[io],i=e[pt];if(bi(i))t[Q]|=2;else{let r=i[pt][Gt];e[Gt]!==r&&(t[Q]|=2)}n===null?t[io]=[e]:n.push(e)}var Rs=class{_lView;_cdRefInjectingView;notifyErrorHandler;_appRef=null;_attachedToViewContainer=!1;get rootNodes(){let e=this._lView,n=e[ne];return Ql(n,e,n.firstChild,[])}constructor(e,n,i=!0){this._lView=e,this._cdRefInjectingView=n,this.notifyErrorHandler=i}get context(){return this._lView[nt]}set context(e){this._lView[nt]=e}get destroyed(){return po(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[pt];if(ii(e)){let n=e[Gl],i=n?n.indexOf(this):-1;i>-1&&(As(e,i),Bl(n,i))}this._attachedToViewContainer=!1}xc(this._lView[ne],this._lView)}onDestroy(e){_y(this._lView,e)}markForCheck(){ep(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Q]&=-129}reattach(){xf(this._lView),this._lView[Q]|=128}detectChanges(){this._lView[Q]|=1024,Y_(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new z(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=jl(this._lView),n=this._lView[Yi];n!==null&&!e&&Kh(n,this._lView),B_(this._lView[ne],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new z(902,!1);this._appRef=e;let n=jl(this._lView),i=this._lView[Yi];i!==null&&!n&&nx(i,this._lView),xf(this._lView)}};var Ns=(()=>{class t{static __NG_ELEMENT_ID__=TD}return t})(),ED=Ns,CD=class extends ED{_declarationLView;_declarationTContainer;elementRef;constructor(e,n,i){super(),this._declarationLView=e,this._declarationTContainer=n,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,n){return this.createEmbeddedViewImpl(e,n)}createEmbeddedViewImpl(e,n,i){let r=js(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:n,dehydratedView:i});return new Rs(r)}};function TD(){return tp(en(),ue())}function tp(t,e){return t.type&4?new CD(e,t,vo(t,e)):null}function Sc(t,e,n,i,r){let o=t.data[e];if(o===null)o=ID(t,e,n,i,r),QC()&&(o.flags|=32);else if(o.type&64){o.type=n,o.value=i,o.attrs=r;let s=KC();o.injectorIndex=s===null?-1:s.injectorIndex}return ks(o,!0),o}function ID(t,e,n,i,r){let o=Sy(),s=wy(),a=s?o:o&&o.parent,l=t.data[e]=AD(t,a,n,e,i,r);return DD(t,l,o,s),l}function DD(t,e,n,i){t.firstChild===null&&(t.firstChild=e),n!==null&&(i?n.child==null&&e.parent!==null&&(n.child=e):n.next===null&&(n.next=e,e.prev=n))}function AD(t,e,n,i,r,o){let s=e?e.injectorIndex:-1,a=0;return by()&&(a|=128),{type:n,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var L8=new RegExp(`^(\\d+)*(${zT}|${BT})*(.*)`);var RD=()=>null;function ao(t,e){return RD(t,e)}var ND=class{},ix=class{},Gf=class{resolveComponentFactory(e){throw Error(`No component factory found for ${Dt(e)}.`)}},wc=class{static NULL=new Gf},lo=class{},np=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>PD()}return t})();function PD(){let t=ue(),e=en(),n=Nn(e.index,t);return(bi(n)?n:t)[it]}var LD=(()=>{class t{static \u0275prov=k({token:t,providedIn:"root",factory:()=>null})}return t})();var of={},jf=class{injector;parentInjector;constructor(e,n){this.injector=e,this.parentInjector=n}get(e,n,i){i=cc(i);let r=this.injector.get(e,of,i);return r!==of||n===of?r:this.parentInjector.get(e,n,i)}};function E0(t,e,n){let i=n?t.styles:null,r=n?t.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)r=df(r,a);else if(o==2){let l=a,c=e[++s];i=df(i,l+": "+c+";")}}n?t.styles=i:t.stylesWithoutHost=i,n?t.classes=r:t.classesWithoutHost=r}function kn(t,e=re.Default){let n=ue();if(n===null)return L(t,e);let i=en();return Wy(i,n,Jt(t),e)}function rx(t,e,n,i,r){let o=i===null?null:{"":-1},s=r(t,n);if(s!==null){let a,l=null,c=null,u=FD(s);u===null?a=s:[a,l,c]=u,VD(t,e,n,a,o,l,c)}o!==null&&i!==null&&OD(n,i,o)}function OD(t,e,n){let i=t.localNames=[];for(let r=0;r<e.length;r+=2){let o=n[e[r+1]];if(o==null)throw new z(-301,!1);i.push(e[r],o)}}function FD(t){let e=null,n=!1;for(let s=0;s<t.length;s++){let a=t[s];if(s===0&&nr(a)&&(e=a),a.findHostDirectiveDefs!==null){n=!0;break}}if(!n)return null;let i=null,r=null,o=null;for(let s of t)s.findHostDirectiveDefs!==null&&(i??=[],r??=new Map,o??=new Map,kD(s,i,o,r)),s===e&&(i??=[],i.push(s));return i!==null?(i.push(...e===null?t:t.slice(1)),[i,r,o]):null}function kD(t,e,n,i){let r=e.length;t.findHostDirectiveDefs(t,e,i),n.set(t,[r,e.length-1])}function UD(t,e,n){e.componentOffset=n,(t.components??=[]).push(e.index)}function VD(t,e,n,i,r,o,s){let a=i.length,l=!1;for(let m=0;m<a;m++){let f=i[m];!l&&nr(f)&&(l=!0,UD(t,n,m)),vT(zy(n,e),t,f.type)}WD(n,t.data.length,a);for(let m=0;m<a;m++){let f=i[m];f.providersResolver&&f.providersResolver(f)}let c=!1,u=!1,d=O_(t,e,a,null);a>0&&(n.directiveToIndex=new Map);for(let m=0;m<a;m++){let f=i[m];if(n.mergedAttrs=Rh(n.mergedAttrs,f.hostAttrs),zD(t,n,e,d,f),jD(d,f,r),s!==null&&s.has(f)){let[b,N]=s.get(f);n.directiveToIndex.set(f.type,[d,b+n.directiveStart,N+n.directiveStart])}else(o===null||!o.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let v=f.type.prototype;!c&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((t.preOrderHooks??=[]).push(n.index),c=!0),!u&&(v.ngOnChanges||v.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}BD(t,n,o)}function BD(t,e,n){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=t.data[i];if(n===null||!n.has(r))C0(0,e,r,i),C0(1,e,r,i),I0(e,i,!1);else{let o=n.get(r);T0(0,e,o,i),T0(1,e,o,i),I0(e,i,!0)}}}function C0(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(i),ox(e,o)}}function T0(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),ox(e,s)}}function ox(t,e){e==="class"?t.flags|=8:e==="style"&&(t.flags|=16)}function I0(t,e,n){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!n&&r===null||n&&o===null||Hh(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!n&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===e){s??=[],s.push(l,i[a+1]);break}}else if(n&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===e){s??=[],s.push(c[u+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function zD(t,e,n,i,r){t.data[i]=r;let o=r.factory||(r.factory=qi(r.type,!0)),s=new Is(o,nr(r),kn);t.blueprint[i]=s,n[i]=s,HD(t,e,i,O_(t,n,r.hostVars,Nt),r)}function HD(t,e,n,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~e.index;GD(s)!=a&&s.push(a),s.push(n,i,o)}}function GD(t){let e=t.length;for(;e>0;){let n=t[--e];if(typeof n=="number"&&n<0)return n}return 0}function jD(t,e,n){if(n){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)n[e.exportAs[i]]=t;nr(e)&&(n[""]=t)}}function WD(t,e,n){t.flags|=1,t.directiveStart=e,t.directiveEnd=e+n,t.providerIndexes=e}function sx(t,e,n,i,r,o,s,a){let l=e.consts,c=ro(l,s),u=Sc(e,t,2,i,c);return o&&rx(e,n,u,ro(l,a),r),u.mergedAttrs=Rh(u.mergedAttrs,u.attrs),u.attrs!==null&&E0(u,u.attrs,!1),u.mergedAttrs!==null&&E0(u,u.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,u),u}function ax(t,e){Oy(t,e),cy(e)&&t.queries.elementEnd(e)}var ec=class extends wc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let n=eo(e);return new Ps(n,this.ngModule)}};function $D(t){return Object.keys(t).map(e=>{let[n,i,r]=t[e],o={propName:n,templateName:e,isSignal:(i&_c.SignalBased)!==0};return r&&(o.transform=r),o})}function qD(t){return Object.keys(t).map(e=>({propName:t[e],templateName:e}))}function XD(t,e,n){let i=e instanceof Ht?e:e?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new jf(n,i):n}function YD(t){let e=t.get(lo,null);if(e===null)throw new z(407,!1);let n=t.get(LD,null),i=t.get(oo,null);return{rendererFactory:e,sanitizer:n,changeDetectionScheduler:i}}function ZD(t,e){let n=(t.selectors[0][0]||"div").toLowerCase();return C_(e,n,n==="svg"?py:n==="math"?VC:null)}var Ps=class extends ix{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=$D(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=qD(this.componentDef.outputs),this.cachedOutputs}constructor(e,n){super(),this.componentDef=e,this.ngModule=n,this.componentType=e.type,this.selector=NI(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!n}create(e,n,i,r){Le(22);let o=ae(null);try{let s=this.componentDef,a=i?["ng-version","19.2.21"]:PI(this.componentDef.selectors[0]),l=Gh(0,null,null,1,0,null,null,null,null,[a],null),c=XD(s,r||this.ngModule,e),u=YD(c),d=u.rendererFactory.createRenderer(null,s),m=i?kI(d,i,s.encapsulation,c):ZD(s,d),f=jh(null,l,null,512|L_(s),null,null,u,d,c,null,f_(m,c,!0));f[ct]=m,Th(f);let v=null;try{let b=sx(ct,l,f,"#host",()=>[this.componentDef],!0,0);m&&(I_(d,m,b),Bs(m,f)),$h(l,f,b),p_(l,b,f),ax(l,b),n!==void 0&&KD(b,this.ngContentSelectors,n),v=Nn(b.index,f),f[nt]=v[nt],Xh(l,f,null)}catch(b){throw v!==null&&Df(v),Df(f),b}finally{Le(23),Ih()}return new Wf(this.componentType,f)}finally{ae(o)}}},Wf=class extends ND{_rootLView;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,n){super(),this._rootLView=n,this._tNode=bh(n[ne],ct),this.location=vo(this._tNode,n),this.instance=Nn(this._tNode.index,n)[nt],this.hostView=this.changeDetectorRef=new Rs(n,void 0,!1),this.componentType=e}setInput(e,n){let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),n))return;let r=this._rootLView,o=qh(i,r[ne],r,e,n);this.previousInputValues.set(e,n);let s=Nn(i.index,r);ep(s,1)}get injector(){return new $i(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function KD(t,e,n){let i=t.projection=[];for(let r=0;r<e.length;r++){let o=n[r];i.push(o!=null&&o.length?Array.from(o):null)}}var yo=(()=>{class t{static __NG_ELEMENT_ID__=JD}return t})();function JD(){let t=en();return cx(t,ue())}var QD=yo,lx=class extends QD{_lContainer;_hostTNode;_hostLView;constructor(e,n,i){super(),this._lContainer=e,this._hostTNode=n,this._hostLView=i}get element(){return vo(this._hostTNode,this._hostLView)}get injector(){return new $i(this._hostTNode,this._hostLView)}get parentInjector(){let e=Nh(this._hostTNode,this._hostLView);if(Uy(e)){let n=ql(e,this._hostLView),i=$l(e),r=n[ne].data[i+8];return new $i(r,n)}else return new $i(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let n=D0(this._lContainer);return n!==null&&n[e]||null}get length(){return this._lContainer.length-ht}createEmbeddedView(e,n,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=ao(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(n||{},o,s);return this.insertImpl(a,r,so(this._hostTNode,s)),a}createComponent(e,n,i,r,o){let s=e&&!OC(e),a;if(s)a=n;else{let v=n||{};a=v.index,i=v.injector,r=v.projectableNodes,o=v.environmentInjector||v.ngModuleRef}let l=s?e:new Ps(eo(e)),c=i||this.parentInjector;if(!o&&l.ngModule==null){let b=(s?c:this.parentInjector).get(Ht,null);b&&(o=b)}let u=eo(l.componentType??{}),d=ao(this._lContainer,u?.id??null),m=d?.firstChild??null,f=l.create(c,r,m,o);return this.insertImpl(f.hostView,a,so(this._hostTNode,d)),f}insert(e,n){return this.insertImpl(e,n,!0)}insertImpl(e,n,i){let r=e._lView;if(HC(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let l=r[pt],c=new lx(l,l[Rt],l[pt]);c.detach(c.indexOf(e))}}let o=this._adjustIndex(n),s=this._lContainer;return Ws(s,r,o,i),e.attachToViewContainerRef(),Q0(sf(s),o,e),e}move(e,n){return this.insert(e,n)}indexOf(e){let n=D0(this._lContainer);return n!==null?n.indexOf(e):-1}remove(e){let n=this._adjustIndex(e,-1),i=As(this._lContainer,n);i&&(Bl(sf(this._lContainer),n),xc(i[ne],i))}detach(e){let n=this._adjustIndex(e,-1),i=As(this._lContainer,n);return i&&Bl(sf(this._lContainer),n)!=null?new Rs(i):null}_adjustIndex(e,n=0){return e??this.length+n}};function D0(t){return t[Gl]}function sf(t){return t[Gl]||(t[Gl]=[])}function cx(t,e){let n,i=e[t.index];return ii(i)?n=i:(n=Q_(i,e,null,t),e[t.index]=n,Wh(e,n)),t1(n,e,t,i),new lx(n,t,e)}function e1(t,e){let n=t[it],i=n.createComment(""),r=Ln(e,t),o=n.parentNode(r);return Jl(n,o,i,n.nextSibling(r),!1),i}var t1=r1,n1=()=>!1;function i1(t,e,n){return n1(t,e,n)}function r1(t,e,n,i){if(t[Ki])return;let r;n.type&8?r=Rn(i):r=e1(e,n),t[Ki]=r}var $f=class t{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},qf=class t{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let n=e.queries;if(n!==null){let i=e.contentQueries!==null?e.contentQueries[0]:n.length,r=[];for(let o=0;o<i;o++){let s=n.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let n=0;n<this.queries.length;n++)rp(e,n).matches!==null&&this.queries[n].setDirty()}},Xf=class{flags;read;predicate;constructor(e,n,i=null){this.flags=n,this.read=i,typeof e=="string"?this.predicate=u1(e):this.predicate=e}},Yf=class t{queries;constructor(e=[]){this.queries=e}elementStart(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,n)}elementEnd(e){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(e)}embeddedTView(e){let n=null;for(let i=0;i<this.length;i++){let r=n!==null?n.length:0,o=this.getByIndex(i).embeddedTView(e,r);o&&(o.indexInDeclarationView=i,n!==null?n.push(o):n=[o])}return n!==null?new t(n):null}template(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,n)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Zf=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,n=-1){this.metadata=e,this._declarationNodeIndex=n}elementStart(e,n){this.isApplyingToNode(n)&&this.matchTNode(e,n)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,n){this.elementStart(e,n)}embeddedTView(e,n){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,n),new t(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==n;)i=i.parent;return n===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,n){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(e,n,o1(n,o)),this.matchTNodeWithReadOption(e,n,Ll(n,e,o,!1,!1))}else i===Ns?n.type&4&&this.matchTNodeWithReadOption(e,n,-1):this.matchTNodeWithReadOption(e,n,Ll(n,e,i,!1,!1))}matchTNodeWithReadOption(e,n,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===or||r===yo||r===Ns&&n.type&4)this.addMatch(n.index,-2);else{let o=Ll(n,e,r,!1,!1);o!==null&&this.addMatch(n.index,o)}else this.addMatch(n.index,i)}}addMatch(e,n){this.matches===null?this.matches=[e,n]:this.matches.push(e,n)}};function o1(t,e){let n=t.localNames;if(n!==null){for(let i=0;i<n.length;i+=2)if(n[i]===e)return n[i+1]}return null}function s1(t,e){return t.type&11?vo(t,e):t.type&4?tp(t,e):null}function a1(t,e,n,i){return n===-1?s1(e,t):n===-2?l1(t,e,i):Yl(t,t[ne],n,e)}function l1(t,e,n){if(n===or)return vo(e,t);if(n===Ns)return tp(e,t);if(n===yo)return cx(e,t)}function ux(t,e,n,i){let r=e[Qn].queries[i];if(r.matches===null){let o=t.data,s=n.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(a1(e,u,s[l+1],n.metadata.read))}}r.matches=a}return r.matches}function Kf(t,e,n,i){let r=t.queries.getByIndex(n),o=r.matches;if(o!==null){let s=ux(t,e,r,n);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],u=e[-l];for(let d=ht;d<u.length;d++){let m=u[d];m[Yi]===m[pt]&&Kf(m[ne],m,c,i)}if(u[io]!==null){let d=u[io];for(let m=0;m<d.length;m++){let f=d[m];Kf(f[ne],f,c,i)}}}}}return i}function ip(t,e){return t[Qn].queries[e].queryList}function c1(t,e,n){let i=new If((n&4)===4);return WC(t,e,i,i.destroy),(e[Qn]??=new qf).queries.push(new $f(i))-1}function dx(t,e,n){let i=xt();return i.firstCreatePass&&(d1(i,new Xf(t,e,n),-1),(e&2)===2&&(i.staticViewQueries=!0)),c1(i,ue(),e)}function u1(t){return t.split(",").map(e=>e.trim())}function d1(t,e,n){t.queries===null&&(t.queries=new Yf),t.queries.track(new Zf(e,n))}function rp(t,e){return t.queries.getByIndex(e)}function fx(t,e){let n=t[ne],i=rp(n,e);return i.crossesNgTemplate?Kf(n,t,e,[]):ux(n,t,i,e)}function hx(t,e,n){let i,r=Qa(()=>{i._dirtyCounter();let o=m1(i,t);if(e&&o===void 0)throw new z(-951,!1);return o});return i=r[zt],i._dirtyCounter=Oe(0),i._flatValue=void 0,r}function f1(t){return hx(!0,!1,t)}function h1(t){return hx(!0,!0,t)}function p1(t,e){let n=t[zt];n._lView=ue(),n._queryIndex=e,n._queryList=ip(n._lView,e),n._queryList.onDirty(()=>n._dirtyCounter.update(i=>i+1))}function m1(t,e){let n=t._lView,i=t._queryIndex;if(n===void 0||i===void 0||n[Q]&4)return e?void 0:An;let r=ip(n,i),o=fx(n,i);return r.reset(o,e_),e?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}function A0(t,e){return f1(e)}function g1(t,e){return h1(e)}var _o=(A0.required=g1,A0);var co=class{},op=class{};var Jf=class extends co{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new ec(this);constructor(e,n,i,r=!0){super(),this.ngModuleType=e,this._parent=n;let o=ny(e);this._bootstrapComponents=R_(o.bootstrap),this._r3Injector=Xy(e,n,[{provide:co,useValue:this},{provide:wc,useValue:this.componentFactoryResolver},...i],Dt(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},Qf=class extends op{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new Jf(this.moduleType,e,[])}};var tc=class extends co{injector;componentFactoryResolver=new ec(this);instance=null;constructor(e){super();let n=new Cs([...e.providers,{provide:co,useValue:this},{provide:wc,useValue:this.componentFactoryResolver}],e.parent||yh(),e.debugName,new Set(["environment"]));this.injector=n,e.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Mc(t,e,n=null){return new tc({providers:t,parent:e,debugName:n,runEnvironmentInitializers:!0}).injector}var v1=(()=>{class t{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let i=iy(!1,n.type),r=i.length>0?Mc([i],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,r)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=k({token:t,providedIn:"environment",factory:()=>new t(L(Ht))})}return t})();function Te(t){return ac(()=>{let e=px(t),n=M(y({},e),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===n_.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&t.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(v1).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Pn.Emulated,styles:t.styles||An,_:null,schemas:t.schemas||null,tView:null,id:""});e.standalone&&Hs("NgStandalone"),mx(n);let i=t.dependencies;return n.directiveDefs=R0(i,!1),n.pipeDefs=R0(i,!0),n.id=S1(n),n})}function y1(t){return eo(t)||wC(t)}function _1(t){return t!==null}function x1(t,e){if(t==null)return Qr;let n={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=_c.None,l=null),n[o]=[i,a,l],e[o]=s}return n}function b1(t){if(t==null)return Qr;let e={};for(let n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}function $s(t){return ac(()=>{let e=px(t);return mx(e),e})}function Ec(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function px(t){let e={};return{type:t.type,providersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:e,inputConfig:t.inputs||Qr,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||An,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:x1(t.inputs,e),outputs:b1(t.outputs),debugInfo:null}}function mx(t){t.features?.forEach(e=>e(t))}function R0(t,e){if(!t)return null;let n=e?MC:y1;return()=>(typeof t=="function"?t():t).map(i=>n(i)).filter(_1)}function S1(t){let e=0,n=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,n,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function gx(t,e,n){return t[e]=n}function mn(t,e,n){let i=t[e];return Object.is(i,n)?!1:(t[e]=n,!0)}function sp(t,e,n,i){let r=mn(t,e,n);return mn(t,e+1,i)||r}function w1(t,e,n,i,r){let o=sp(t,e,n,i);return mn(t,e+2,r)||o}function M1(t,e,n,i,r,o,s,a,l){let c=e.consts,u=Sc(e,t,4,s||null,a||null);xy()&&rx(e,n,u,ro(c,l),V_),u.mergedAttrs=Rh(u.mergedAttrs,u.attrs),Oy(e,u);let d=u.tView=Gh(2,u,i,r,o,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function nc(t,e,n,i,r,o,s,a,l,c){let u=n+ct,d=e.firstCreatePass?M1(u,e,t,i,r,o,s,a,l):e.data[u];ks(d,!1);let m=E1(e,t,d,n);Dh()&&Jh(e,t,m,d),Bs(m,t);let f=Q_(m,t,m,d);return t[u]=f,Wh(t,f),i1(f,d,t),xh(d)&&$h(e,t,d),l!=null&&U_(t,d,c),d}function Ve(t,e,n,i,r,o,s,a){let l=ue(),c=xt(),u=ro(c.consts,o);return nc(l,c,t,e,n,i,r,u,s,a),Ve}var E1=C1;function C1(t,e,n,i){return Ah(!0),e[it].createComment("")}var ap=(()=>{class t{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();var vx=new A("");var yx=(()=>{class t{static \u0275prov=k({token:t,providedIn:"root",factory:()=>new eh})}return t})(),eh=class{queuedEffectCount=0;queues=new Map;schedule(e){this.enqueue(e)}remove(e){let n=e.zone,i=this.queues.get(n);i.has(e)&&(i.delete(e),this.queuedEffectCount--)}enqueue(e){let n=e.zone;this.queues.has(n)||this.queues.set(n,new Set);let i=this.queues.get(n);i.has(e)||(this.queuedEffectCount++,i.add(e))}flush(){for(;this.queuedEffectCount>0;)for(let[e,n]of this.queues)e===null?this.flushQueue(n):e.run(()=>this.flushQueue(n))}flushQueue(e){for(let n of e)e.delete(n),this.queuedEffectCount--,n.run()}};function qs(t){return!!t&&typeof t.then=="function"}function _x(t){return!!t&&typeof t.subscribe=="function"}var T1=new A("");var xx=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,i)=>{this.resolve=n,this.reject=i});appInits=w(T1,{optional:!0})??[];injector=w(yt);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let r of this.appInits){let o=gn(this.injector,r);if(qs(o))n.push(o);else if(_x(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});n.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{i()}).catch(r=>{this.reject(r)}),n.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),lp=new A("");function I1(){Ed(()=>{throw new z(600,!1)})}function D1(t){return t.isBoundToModule}var A1=10;var Si=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=w(RT);afterRenderManager=w(jT);zonelessEnabled=w(mc);rootEffectScheduler=w(yx);dirtyFlags=0;tracingSnapshot=null;externalTestViews=new Set;afterTick=new Ie;get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];isStable=w(go).hasPendingTasks.pipe(G(n=>!n));constructor(){w(gc,{optional:!0})}whenStable(){let n;return new Promise(i=>{n=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{n.unsubscribe()})}_injector=w(Ht);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,i){return this.bootstrapImpl(n,i)}bootstrapImpl(n,i,r=yt.NULL){Le(10);let o=n instanceof ix;if(!this._injector.get(xx).done){let f="";throw new z(405,f)}let a;o?a=n:a=this._injector.get(wc).resolveComponentFactory(n),this.componentTypes.push(a.componentType);let l=D1(a)?void 0:this._injector.get(co),c=i||a.selector,u=a.create(r,[],c,l),d=u.location.nativeElement,m=u.injector.get(vx,null);return m?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),Ol(this.components,u),m?.unregisterApplication(d)}),this._loadComponent(u),Le(11,u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Le(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(u_.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new z(101,!1);let n=ae(null);try{this._runningTick=!0,this.synchronize()}catch(i){this.internalErrorHandler(i)}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ae(n),this.afterTick.next(),Le(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(lo,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<A1;)Le(14),this.synchronizeOnce(),Le(15)}synchronizeOnce(){if(this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush()),this.dirtyFlags&7){let n=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i,notifyErrorHandler:r}of this.allViews)R1(i,r,n,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}else this._rendererFactory?.begin?.(),this._rendererFactory?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>fc(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let i=n;this._views.push(i),i.attachToAppRef(this)}detachView(n){let i=n;Ol(this._views,i),i.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView),this.tick(),this.components.push(n),this._injector.get(lp,[]).forEach(r=>r(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>Ol(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new z(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ol(t,e){let n=t.indexOf(e);n>-1&&t.splice(n,1)}function R1(t,e,n,i){if(!n&&!fc(t))return;Y_(t,e,n&&!i?0:1)}function se(t,e,n,i){let r=ue(),o=Us();if(mn(r,o,e)){let s=xt(),a=Ny();$I(a,r,t,e,n,i)}return se}function N1(t,e,n,i){return mn(t,Us(),n)?e+Dn(n)+i:Nt}function P1(t,e,n,i,r,o){let s=Cy(),a=sp(t,s,n,r);return hc(2),a?e+Dn(n)+i+Dn(r)+o:Nt}function L1(t,e,n,i,r,o,s,a){let l=Cy(),c=w1(t,l,n,r,s);return hc(3),c?e+Dn(n)+i+Dn(r)+o+Dn(s)+a:Nt}function Al(t,e){return t<<17|e<<2}function er(t){return t>>17&32767}function O1(t){return(t&2)==2}function F1(t,e){return t&131071|e<<17}function th(t){return t|2}function uo(t){return(t&131068)>>2}function af(t,e){return t&-131069|e<<2}function k1(t){return(t&1)===1}function nh(t){return t|1}function U1(t,e,n,i,r,o){let s=o?e.classBindings:e.styleBindings,a=er(s),l=uo(s);t[i]=n;let c=!1,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||Os(d,u)>0)&&(c=!0)}else u=n;if(r)if(l!==0){let m=er(t[a+1]);t[i+1]=Al(m,a),m!==0&&(t[m+1]=af(t[m+1],i)),t[a+1]=F1(t[a+1],i)}else t[i+1]=Al(a,0),a!==0&&(t[a+1]=af(t[a+1],i)),a=i;else t[i+1]=Al(l,0),a===0?a=i:t[l+1]=af(t[l+1],i),l=i;c&&(t[i+1]=th(t[i+1])),N0(t,u,i,!0),N0(t,u,i,!1),V1(e,u,t,i,o),s=Al(a,l),o?e.classBindings=s:e.styleBindings=s}function V1(t,e,n,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof e=="string"&&Os(o,e)>=0&&(n[i+1]=nh(n[i+1]))}function N0(t,e,n,i){let r=t[n+1],o=e===null,s=i?er(r):uo(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];B1(l,e)&&(a=!0,t[s+1]=i?nh(c):th(c)),s=i?er(c):uo(c)}a&&(t[n+1]=i?th(r):nh(r))}function B1(t,e){return t===null||e==null||(Array.isArray(t)?t[1]:t)===e?!0:Array.isArray(t)&&typeof e=="string"?Os(t,e)>=0:!1}var hn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function z1(t){return t.substring(hn.key,hn.keyEnd)}function H1(t){return G1(t),bx(t,Sx(t,0,hn.textEnd))}function bx(t,e){let n=hn.textEnd;return n===e?-1:(e=hn.keyEnd=j1(t,hn.key=e,n),Sx(t,e,n))}function G1(t){hn.key=0,hn.keyEnd=0,hn.value=0,hn.valueEnd=0,hn.textEnd=t.length}function Sx(t,e,n){for(;e<n&&t.charCodeAt(e)<=32;)e++;return e}function j1(t,e,n){for(;e<n&&t.charCodeAt(e)>32;)e++;return e}function R(t,e,n){let i=ue(),r=Us();if(mn(i,r,e)){let o=xt(),s=Ny();zI(o,s,i,t,e,i[it],n,!1)}return R}function ih(t,e,n,i,r){qh(e,t,n,r?"class":"style",i)}function xo(t,e,n){return Mx(t,e,n,!1),xo}function mt(t,e){return Mx(t,e,null,!0),mt}function wx(t){$1(J1,W1,t,!0)}function W1(t,e){for(let n=H1(e);n>=0;n=bx(e,n))gh(t,z1(e),!0)}function Mx(t,e,n,i){let r=ue(),o=xt(),s=hc(2);if(o.firstUpdatePass&&Cx(o,t,s,i),e!==Nt&&mn(r,s,e)){let a=o.data[On()];Tx(o,a,r,r[it],t,r[s+1]=eA(e,n),i,s)}}function $1(t,e,n,i){let r=xt(),o=hc(2);r.firstUpdatePass&&Cx(r,null,o,i);let s=ue();if(n!==Nt&&mn(s,o,n)){let a=r.data[On()];if(Ix(a,i)&&!Ex(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(n=df(l,n||"")),ih(r,a,s,n,i)}else Q1(r,a,s,s[it],s[o+1],s[o+1]=K1(t,e,n),i,o)}}function Ex(t,e){return e>=t.expandoStartIndex}function Cx(t,e,n,i){let r=t.data;if(r[n+1]===null){let o=r[On()],s=Ex(t,n);Ix(o,i)&&e===null&&!s&&(e=!1),e=q1(r,o,e,i),U1(r,o,e,n,s,i)}}function q1(t,e,n,i){let r=nT(t),o=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(n=lf(null,t,e,n,i),n=Ls(n,e.attrs,i),o=null);else{let s=e.directiveStylingLast;if(s===-1||t[s]!==r)if(n=lf(r,t,e,n,i),o===null){let l=X1(t,e,i);l!==void 0&&Array.isArray(l)&&(l=lf(null,t,e,l[1],i),l=Ls(l,e.attrs,i),Y1(t,e,i,l))}else o=Z1(t,e,i)}return o!==void 0&&(i?e.residualClasses=o:e.residualStyles=o),n}function X1(t,e,n){let i=n?e.classBindings:e.styleBindings;if(uo(i)!==0)return t[er(i)]}function Y1(t,e,n,i){let r=n?e.classBindings:e.styleBindings;t[er(r)]=i}function Z1(t,e,n){let i,r=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=Ls(i,s,n)}return Ls(i,e.attrs,n)}function lf(t,e,n,i,r){let o=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(o=e[a],i=Ls(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(n.directiveStylingLast=a),i}function Ls(t,e,n){let i=n?1:2,r=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),gh(t,s,n?!0:e[++o]))}return t===void 0?null:t}function K1(t,e,n){if(n==null||n==="")return An;let i=[],r=vn(n);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&e(i,r);return i}function J1(t,e,n){let i=String(e);i!==""&&!i.includes(" ")&&gh(t,i,n)}function Q1(t,e,n,i,r,o,s,a){r===Nt&&(r=An);let l=0,c=0,u=0<r.length?r[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let m=l<r.length?r[l+1]:void 0,f=c<o.length?o[c+1]:void 0,v=null,b;u===d?(l+=2,c+=2,m!==f&&(v=d,b=f)):d===null||u!==null&&u<d?(l+=2,v=u):(c+=2,v=d,b=f),v!==null&&Tx(t,e,n,i,v,b,s,a),u=l<r.length?r[l]:null,d=c<o.length?o[c]:null}}function Tx(t,e,n,i,r,o,s,a){if(!(e.type&3))return;let l=t.data,c=l[a+1],u=k1(c)?P0(l,e,n,r,uo(c),s):void 0;if(!ic(u)){ic(o)||O1(c)&&(o=P0(l,null,n,r,a,s));let d=my(On(),n);uD(i,s,d,r,o)}}function P0(t,e,n,i,r,o){let s=e===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,d=u===null,m=n[r+1];m===Nt&&(m=d?An:void 0);let f=d?Kd(m,i):u===i?m:void 0;if(c&&!ic(f)&&(f=Kd(l,i)),ic(f)&&(a=f,s))return a;let v=t[r+1];r=s?er(v):uo(v)}if(e!==null){let l=o?e.residualClasses:e.residualStyles;l!=null&&(a=Kd(l,i))}return a}function ic(t){return t!==void 0}function eA(t,e){return t==null||t===""||(typeof e=="string"?t=t+e:typeof t=="object"&&(t=Dt(vn(t)))),t}function Ix(t,e){return(t.flags&(e?8:16))!==0}var rh=class{destroy(e){}updateValue(e,n){}swap(e,n){let i=Math.min(e,n),r=Math.max(e,n),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(e,n){this.attach(n,this.detach(e))}};function cf(t,e,n,i,r){return t===n&&Object.is(e,i)?1:Object.is(r(t,e),r(n,i))?-1:0}function tA(t,e,n){let i,r,o=0,s=t.length-1,a=void 0;if(Array.isArray(e)){let l=e.length-1;for(;o<=s&&o<=l;){let c=t.at(o),u=e[o],d=cf(o,c,o,u,n);if(d!==0){d<0&&t.updateValue(o,u),o++;continue}let m=t.at(s),f=e[l],v=cf(s,m,l,f,n);if(v!==0){v<0&&t.updateValue(s,f),s--,l--;continue}let b=n(o,c),N=n(s,m),P=n(o,u);if(Object.is(P,N)){let H=n(l,f);Object.is(H,b)?(t.swap(o,s),t.updateValue(s,f),l--,s--):t.move(s,o),t.updateValue(o,u),o++;continue}if(i??=new rc,r??=O0(t,o,s,n),oh(t,i,o,P))t.updateValue(o,u),o++,s++;else if(r.has(P))i.set(b,t.detach(o)),s--;else{let H=t.create(o,e[o]);t.attach(o,H),o++,s++}}for(;o<=l;)L0(t,i,n,o,e[o]),o++}else if(e!=null){let l=e[Symbol.iterator](),c=l.next();for(;!c.done&&o<=s;){let u=t.at(o),d=c.value,m=cf(o,u,o,d,n);if(m!==0)m<0&&t.updateValue(o,d),o++,c=l.next();else{i??=new rc,r??=O0(t,o,s,n);let f=n(o,d);if(oh(t,i,o,f))t.updateValue(o,d),o++,s++,c=l.next();else if(!r.has(f))t.attach(o,t.create(o,d)),o++,s++,c=l.next();else{let v=n(o,u);i.set(v,t.detach(o)),s--}}}for(;!c.done;)L0(t,i,n,t.length,c.value),c=l.next()}for(;o<=s;)t.destroy(t.detach(s--));i?.forEach(l=>{t.destroy(l)})}function oh(t,e,n,i){return e!==void 0&&e.has(i)?(t.attach(n,e.get(i)),e.delete(i),!0):!1}function L0(t,e,n,i,r){if(oh(t,e,i,n(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function O0(t,e,n,i){let r=new Set;for(let o=e;o<=n;o++)r.add(i(o,t.at(o)));return r}var rc=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let n=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(e,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,n){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,n)}else this.kvMap.set(e,n)}forEach(e){for(let[n,i]of this.kvMap)if(e(i,n),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,n)}}};function He(t,e){Hs("NgControlFlow");let n=ue(),i=Us(),r=n[i]!==Nt?n[i]:-1,o=r!==-1?oc(n,ct+r):void 0,s=0;if(mn(n,i,t)){let a=ae(null);try{if(o!==void 0&&tx(o,s),t!==-1){let l=ct+t,c=oc(n,l),u=ch(n[ne],l),d=ao(c,u.tView.ssrId),m=js(n,u,e,{dehydratedView:d});Ws(c,m,s,so(u,d))}}finally{ae(a)}}else if(o!==void 0){let a=ex(o,s);a!==void 0&&(a[nt]=e)}}var sh=class{lContainer;$implicit;$index;constructor(e,n,i){this.lContainer=e,this.$implicit=n,this.$index=i}get $count(){return this.lContainer.length-ht}};function wi(t,e){return e}var ah=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,n,i){this.hasEmptyBlock=e,this.trackByFn=n,this.liveCollection=i}};function Xe(t,e,n,i,r,o,s,a,l,c,u,d,m){Hs("NgControlFlow");let f=ue(),v=xt(),b=l!==void 0,N=ue(),P=a?s.bind(N[Gt][nt]):s,H=new ah(b,P);N[ct+t]=H,nc(f,v,t+1,e,n,i,r,ro(v.consts,o)),b&&nc(f,v,t+2,l,c,u,d,ro(v.consts,m))}var lh=class extends rh{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,n,i){super(),this.lContainer=e,this.hostLView=n,this.templateTNode=i}get length(){return this.lContainer.length-ht}at(e){return this.getLView(e)[nt].$implicit}attach(e,n){let i=n[to];this.needsIndexUpdate||=e!==this.length,Ws(this.lContainer,n,e,so(this.templateTNode,i))}detach(e){return this.needsIndexUpdate||=e!==this.length-1,nA(this.lContainer,e)}create(e,n){let i=ao(this.lContainer,this.templateTNode.tView.ssrId),r=js(this.hostLView,this.templateTNode,new sh(this.lContainer,n,e),{dehydratedView:i});return this.operationsCounter?.recordCreate(),r}destroy(e){xc(e[ne],e),this.operationsCounter?.recordDestroy()}updateValue(e,n){this.getLView(e)[nt].$implicit=n}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[nt].$index=e}getLView(e){return iA(this.lContainer,e)}};function Ye(t){let e=ae(null),n=On();try{let i=ue(),r=i[ne],o=i[n],s=n+1,a=oc(i,s);if(o.liveCollection===void 0){let c=ch(r,s);o.liveCollection=new lh(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(tA(l,t,o.trackByFn),l.updateIndexes(),o.hasEmptyBlock){let c=Us(),u=l.length===0;if(mn(i,c,u)){let d=n+2,m=oc(i,d);if(u){let f=ch(r,d),v=ao(m,f.tView.ssrId),b=js(i,f,void 0,{dehydratedView:v});Ws(m,b,0,so(f,v))}else tx(m,0)}}}finally{ae(e)}}function oc(t,e){return t[e]}function nA(t,e){return As(t,e)}function iA(t,e){return ex(t,e)}function ch(t,e){return bh(t,e)}function h(t,e,n,i){let r=ue(),o=xt(),s=ct+t,a=r[it],l=o.firstCreatePass?sx(s,o,r,e,V_,xy(),n,i):o.data[s],c=rA(o,r,l,a,e,t);r[s]=c;let u=xh(l);return ks(l,!0),I_(a,c,l),!Zh(l)&&Dh()&&Jh(o,r,c,l),($C()===0||u)&&Bs(c,r),qC(),u&&($h(o,r,l),p_(o,l,r)),i!==null&&U_(r,l),h}function p(){let t=en();wy()?My():(t=t.parent,ks(t,!1));let e=t;YC(e)&&ZC(),XC();let n=xt();return n.firstCreatePass&&ax(n,e),e.classesWithoutHost!=null&&cT(e)&&ih(n,e,ue(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&uT(e)&&ih(n,e,ue(),e.stylesWithoutHost,!1),p}function xe(t,e,n,i){return h(t,e,n,i),p(),xe}var rA=(t,e,n,i,r,o)=>(Ah(!0),C_(i,r,sT()));function jt(){return ue()}var ji=void 0;function oA(t){let e=Math.floor(Math.abs(t)),n=t.toString().replace(/^[^.]*\.?/,"").length;return e===1&&n===0?1:5}var sA=["en",[["a","p"],["AM","PM"],ji],[["AM","PM"],ji,ji],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],ji,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],ji,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",ji,"{1} 'at' {0}",ji],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",oA],uf={};function cp(t){let e=aA(t),n=F0(e);if(n)return n;let i=e.split("-")[0];if(n=F0(i),n)return n;if(i==="en")return sA;throw new z(701,!1)}function F0(t){return t in uf||(uf[t]=Tn.ng&&Tn.ng.common&&Tn.ng.common.locales&&Tn.ng.common.locales[t]),uf[t]}var bo=function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t}(bo||{});function aA(t){return t.toLowerCase().replace(/_/g,"-")}var sc="en-US";var lA=sc;function cA(t){typeof t=="string"&&(lA=t.toLowerCase().replace(/_/g,"-"))}function k0(t,e,n){return function i(r){if(r===Function)return n;let o=ho(t)?Nn(t.index,e):e;ep(o,5);let s=e[nt],a=U0(e,s,n,r),l=i.__ngNextListenerFn__;for(;l;)a=U0(e,s,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function U0(t,e,n,i){let r=ae(null);try{return Le(6,e,n),n(i)!==!1}catch(o){return uA(t,o),!1}finally{Le(7,e,n),ae(r)}}function uA(t,e){let n=t[no],i=n?n.get(_t,null):null;i&&i.handleError(e)}function V0(t,e,n,i,r,o){let s=e[n],a=e[ne],c=a.data[n].outputs[i],u=s[c],d=a.firstCreatePass?Mh(a):null,m=wh(e),f=u.subscribe(o),v=m.length;m.push(o,f),d&&d.push(r,t.index,v,-(v+1))}function C(t,e,n,i){let r=ue(),o=xt(),s=en();return fA(o,r,r[it],s,t,e,i),C}function dA(t,e,n,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===n&&r[o+1]===i){let a=e[Hl],l=r[o+2];return a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function fA(t,e,n,i,r,o,s){let a=xh(i),c=t.firstCreatePass?Mh(t):null,u=wh(e),d=!0;if(i.type&3||s){let m=Ln(i,e),f=s?s(m):m,v=u.length,b=s?P=>s(Rn(P[i.index])):i.index,N=null;if(!s&&a&&(N=dA(t,e,r,i.index)),N!==null){let P=N.__ngLastListenerFn__||N;P.__ngNextListenerFn__=o,N.__ngLastListenerFn__=o,d=!1}else{o=k0(i,e,o),$T(e,f,r,o);let P=n.listen(f,r,o);u.push(o,P),c&&c.push(r,b,v,v+1)}}else o=k0(i,e,o);if(d){let m=i.outputs?.[r],f=i.hostDirectiveOutputs?.[r];if(f&&f.length)for(let v=0;v<f.length;v+=2){let b=f[v],N=f[v+1];V0(i,e,b,N,r,o)}if(m&&m.length)for(let v of m)V0(i,e,v,r,r,o)}}function E(t=1){return rT(t)}function hA(t,e){let n=null,i=TI(t);for(let r=0;r<e.length;r++){let o=e[r];if(o==="*"){n=r;continue}if(i===null?P_(t,o,!0):AI(i,o))return r}return n}function Dx(t){let e=ue()[Gt][Rt];if(!e.projection){let n=t?t.length:1,i=e.projection=xC(n,null),r=i.slice(),o=e.child;for(;o!==null;){if(o.type!==128){let s=t?hA(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function Ax(t,e=0,n,i,r,o){let s=ue(),a=xt(),l=i?t+1:null;l!==null&&nc(s,a,l,i,r,o,null,n);let c=Sc(a,ct+t,16,null,n||null);c.projection===null&&(c.projection=e),My();let d=!s[to]||by();s[Gt][Rt].projection[c.projection]===null&&l!==null?pA(s,a,l):d&&!Zh(c)&&lD(a,s,c)}function pA(t,e,n){let i=ct+n,r=e.data[i],o=t[i],s=ao(o,r.tView.ssrId),a=js(t,r,void 0,{dehydratedView:s});Ws(o,a,0,so(r,s))}function Xs(t,e,n){dx(t,e,n)}function So(t){let e=ue(),n=xt(),i=Ch();pc(i+1);let r=rp(n,i);if(t.dirty&&zC(e)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=fx(e,i);t.reset(o,e_),t.notifyOnChanges()}return!0}return!1}function wo(){return ip(ue(),Ch())}function Mo(t,e,n,i){p1(t,dx(e,n,i))}function Cc(t=1){pc(Ch()+t)}function x(t,e=""){let n=ue(),i=xt(),r=t+ct,o=i.firstCreatePass?Sc(i,r,1,e,null):i.data[r],s=mA(i,n,o,e,t);n[r]=s,Dh()&&Jh(i,n,s,o),ks(o,!1)}var mA=(t,e,n,i,r)=>(Ah(!0),fI(e[it],i));function Se(t){return me("",t,""),Se}function me(t,e,n){let i=ue(),r=N1(i,t,e,n);return r!==Nt&&up(i,On(),r),me}function Eo(t,e,n,i,r){let o=ue(),s=P1(o,t,e,n,i,r);return s!==Nt&&up(o,On(),s),Eo}function Ys(t,e,n,i,r,o,s){let a=ue(),l=L1(a,t,e,n,i,r,o,s);return l!==Nt&&up(a,On(),l),Ys}function up(t,e,n){let i=my(e,t);hI(t[it],i,n)}function Rx(t,e,n,i){return Px(ue(),Eh(),t,e,n,i)}function Nx(t,e){let n=t[e];return n===Nt?void 0:n}function Px(t,e,n,i,r,o){let s=e+n;return mn(t,s,r)?gx(t,s+1,o?i.call(o,r):i(r)):Nx(t,s+1)}function gA(t,e,n,i,r,o,s){let a=e+n;return sp(t,a,r,o)?gx(t,a+2,s?i.call(s,r,o):i(r,o)):Nx(t,a+2)}function Ge(t,e){let n=xt(),i,r=t+ct;n.firstCreatePass?(i=vA(e,n.pipeRegistry),n.data[r]=i,i.onDestroy&&(n.destroyHooks??=[]).push(r,i.onDestroy)):i=n.data[r];let o=i.factory||(i.factory=qi(i.type,!0)),s,a=It(kn);try{let l=Xl(!1),c=o();return Xl(l),BC(n,ue(),r,c),c}finally{It(a)}}function vA(t,e){if(e)for(let n=e.length-1;n>=0;n--){let i=e[n];if(t===i.name)return i}}function Lx(t,e,n){let i=t+ct,r=ue(),o=gy(r,i);return Ox(r,i)?Px(r,Eh(),e,o.transform,n,o):o.transform(n)}function Ze(t,e,n,i){let r=t+ct,o=ue(),s=gy(o,r);return Ox(o,r)?gA(o,Eh(),e,s.transform,n,i,s):s.transform(n,i)}function Ox(t,e){return t[ne].data[e].pure}var uh=class{ngModuleFactory;componentFactories;constructor(e,n){this.ngModuleFactory=e,this.componentFactories=n}},Fx=(()=>{class t{compileModuleSync(n){return new Qf(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let i=this.compileModuleSync(n),r=ny(n),o=R_(r.declarations).reduce((s,a)=>{let l=eo(a);return l&&s.push(new Ps(l)),s},[]);return new uh(i,o)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var yA=(()=>{class t{zone=w(Ae);changeDetectionScheduler=w(oo);applicationRef=w(Si);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),_A=new A("",{factory:()=>!1});function kx({ngZoneFactory:t,ignoreChangesOutsideZone:e,scheduleInRootZone:n}){return t??=()=>new Ae(M(y({},Vx()),{scheduleInRootZone:n})),[{provide:Ae,useFactory:t},{provide:Xi,multi:!0,useFactory:()=>{let i=w(yA,{optional:!0});return()=>i.initialize()}},{provide:Xi,multi:!0,useFactory:()=>{let i=w(xA);return()=>{i.initialize()}}},e===!0?{provide:Zy,useValue:!0}:[],{provide:Ky,useValue:n??Yy}]}function Ux(t){let e=t?.ignoreChangesOutsideZone,n=t?.scheduleInRootZone,i=kx({ngZoneFactory:()=>{let r=Vx(t);return r.scheduleInRootZone=n,r.shouldCoalesceEventChangeDetection&&Hs("NgZone_CoalesceEvent"),new Ae(r)},ignoreChangesOutsideZone:e,scheduleInRootZone:n});return At([{provide:_A,useValue:!0},{provide:mc,useValue:!1},i])}function Vx(t){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:t?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:t?.runCoalescing??!1}}var xA=(()=>{class t{subscription=new We;initialized=!1;zone=w(Ae);pendingTasks=w(go);initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Ae.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Ae.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var bA=(()=>{class t{appRef=w(Si);taskService=w(go);ngZone=w(Ae);zonelessEnabled=w(mc);tracing=w(gc,{optional:!0});disableScheduling=w(Zy,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new We;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Kl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(w(Ky,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Tf||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;let i=!1;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,i=!0;break}case 12:{this.appRef.dirtyFlags|=16,i=!0;break}case 13:{this.appRef.dirtyFlags|=2,i=!0;break}case 11:{i=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(i))return;let r=this.useMicrotaskScheduler?u0:Jy;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(n){return!(this.disableScheduling&&!n||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Kl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){throw this.taskService.remove(n),i}finally{this.cleanup()}this.useMicrotaskScheduler=!0,u0(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function SA(){return typeof $localize<"u"&&$localize.locale||sc}var Tc=new A("",{providedIn:"root",factory:()=>w(Tc,re.Optional|re.SkipSelf)||SA()});var dh=new A(""),wA=new A("");function Ss(t){return!t.moduleRef}function MA(t){let e=Ss(t)?t.r3Injector:t.moduleRef.injector,n=e.get(Ae);return n.run(()=>{Ss(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=e.get(_t,null),r;if(n.runOutsideAngular(()=>{r=n.onError.subscribe({next:o=>{i.handleError(o)}})}),Ss(t)){let o=()=>e.destroy(),s=t.platformInjector.get(dh);s.add(o),e.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(dh);s.add(o),t.moduleRef.onDestroy(()=>{Ol(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return CA(i,n,()=>{let o=e.get(xx);return o.runInitializers(),o.donePromise.then(()=>{let s=e.get(Tc,sc);if(cA(s||sc),!e.get(wA,!0))return Ss(t)?e.get(Si):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Ss(t)){let l=e.get(Si);return t.rootComponent!==void 0&&l.bootstrap(t.rootComponent),l}else return EA(t.moduleRef,t.allPlatformModules),t.moduleRef})})})}function EA(t,e){let n=t.injector.get(Si);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(i=>n.bootstrap(i));else if(t.instance.ngDoBootstrap)t.instance.ngDoBootstrap(n);else throw new z(-403,!1);e.push(t)}function CA(t,e,n){try{let i=n();return qs(i)?i.catch(r=>{throw e.runOutsideAngular(()=>t.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>t.handleError(i)),i}}var Fl=null;function TA(t=[],e){return yt.create({name:e,providers:[{provide:uc,useValue:"platform"},{provide:dh,useValue:new Set([()=>Fl=null])},...t]})}function IA(t=[]){if(Fl)return Fl;let e=TA(t);return Fl=e,I1(),DA(e),e}function DA(t){let e=t.get(kh,null);gn(t,()=>{e?.forEach(n=>n())})}function sr(){return!1}var Co=(()=>{class t{static __NG_ELEMENT_ID__=AA}return t})();function AA(t){return RA(en(),ue(),(t&16)===16)}function RA(t,e,n){if(ho(t)&&!n){let i=Nn(t.index,e);return new Rs(i,i)}else if(t.type&175){let i=e[Gt];return new Rs(i,e)}return null}function Bx(t){let{rootComponent:e,appProviders:n,platformProviders:i,platformRef:r}=t;Le(8);try{let o=r?.injector??IA(i),s=[kx({}),{provide:oo,useExisting:bA},...n||[]],a=new tc({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return MA({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{Le(9)}}function Ic(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function Dc(t){return Id(t)}function bt(t,e){return Qa(t,e?.equal)}var fh=class{[zt];constructor(e){this[zt]=e}destroy(){this[zt].destroy()}};function Un(t,e){!e?.injector&&_h(Un);let n=e?.injector??w(yt),i=e?.manualCleanup!==!0?n.get(Fn):null,r,o=n.get(d_,null,{optional:!0}),s=n.get(oo);return o!==null&&!e?.forceRoot?(r=LA(o.view,s,t),i instanceof Zl&&i._lView===o.view&&(i=null)):r=OA(t,n.get(yx),s),r.injector=n,i!==null&&(r.onDestroyFn=i.onDestroy(()=>r.destroy())),new fh(r)}var zx=M(y({},Or),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,cleanupFns:void 0,zone:null,kind:"effect",onDestroyFn:Ds,run(){if(this.dirty=!1,this.hasRun&&!Za(this))return;this.hasRun=!0;let t=i=>(this.cleanupFns??=[]).push(i),e=ds(this),n=Wl(!1);try{this.maybeCleanup(),this.fn(t)}finally{Wl(n),Ya(this,e)}},maybeCleanup(){if(this.cleanupFns?.length)try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[]}}}),NA=M(y({},zx),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){fs(this),this.onDestroyFn(),this.maybeCleanup(),this.scheduler.remove(this)}}),PA=M(y({},zx),{consumerMarkedDirty(){this.view[Q]|=8192,Fs(this.view),this.notifier.notify(13)},destroy(){fs(this),this.onDestroyFn(),this.maybeCleanup(),this.view[Zi]?.delete(this)}});function LA(t,e,n){let i=Object.create(PA);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=n,t[Zi]??=new Set,t[Zi].add(i),i.consumerMarkedDirty(i),i}function OA(t,e,n){let i=Object.create(NA);return i.fn=t,i.scheduler=e,i.notifier=n,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.schedule(i),i.notifier.notify(12),i}var je=new A("");var jx=null;function si(){return jx}function dp(t){jx??=t}var Zs=class{},fp=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(Wx),providedIn:"platform"})}return t})();var Wx=(()=>{class t extends fp{_location;_history;_doc=w(je);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return si().getBaseHref(this._doc)}onPopState(n){let i=si().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",n,!1),()=>i.removeEventListener("popstate",n)}onHashChange(n){let i=si().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",n,!1),()=>i.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,i,r){this._history.pushState(n,i,r)}replaceState(n,i,r){this._history.replaceState(n,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function $x(t,e){return t?e?t.endsWith("/")?e.startsWith("/")?t+e.slice(1):t+e:e.startsWith("/")?t+e:`${t}/${e}`:t:e}function Hx(t){let e=t.search(/#|\?|$/);return t[e-1]==="/"?t.slice(0,e-1)+t.slice(e):t}function Mi(t){return t&&t[0]!=="?"?`?${t}`:t}var To=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(Xx),providedIn:"root"})}return t})(),qx=new A(""),Xx=(()=>{class t extends To{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,i){super(),this._platformLocation=n,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??w(je).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return $x(this._baseHref,n)}path(n=!1){let i=this._platformLocation.pathname+Mi(this._platformLocation.search),r=this._platformLocation.hash;return r&&n?`${i}${r}`:i}pushState(n,i,r,o){let s=this.prepareExternalUrl(r+Mi(o));this._platformLocation.pushState(n,i,s)}replaceState(n,i,r,o){let s=this.prepareExternalUrl(r+Mi(o));this._platformLocation.replaceState(n,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(i){return new(i||t)(L(fp),L(qx,8))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Io=(()=>{class t{_subject=new Ie;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let i=this._locationStrategy.getBaseHref();this._basePath=UA(Hx(Gx(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,i=""){return this.path()==this.normalize(n+Mi(i))}normalize(n){return t.stripTrailingSlash(kA(this._basePath,Gx(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,i="",r=null){this._locationStrategy.pushState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Mi(i)),r)}replaceState(n,i="",r=null){this._locationStrategy.replaceState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Mi(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",i){this._urlChangeListeners.forEach(r=>r(n,i))}subscribe(n,i,r){return this._subject.subscribe({next:n,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Mi;static joinWithSlash=$x;static stripTrailingSlash=Hx;static \u0275fac=function(i){return new(i||t)(L(To))};static \u0275prov=k({token:t,factory:()=>FA(),providedIn:"root"})}return t})();function FA(){return new Io(L(To))}function kA(t,e){if(!t||!e.startsWith(t))return e;let n=e.substring(t.length);return n===""||["/",";","?","#"].includes(n[0])?n:e}function Gx(t){return t.replace(/\/index.html$/,"")}function UA(t){if(new RegExp("^(https?:)?//").test(t)){let[,n]=t.split(/\/\/[^\/]+/);return n}return t}var mp=function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t}(mp||{});var Vn={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Do(t,e){let n=cp(t),i=n[bo.NumberSymbols][e];if(typeof i>"u"){if(e===Vn.CurrencyDecimal)return n[bo.NumberSymbols][Vn.Decimal];if(e===Vn.CurrencyGroup)return n[bo.NumberSymbols][Vn.Group]}return i}function Zx(t,e){return cp(t)[bo.NumberFormats][e]}var VA=/^(\d+)?\.((\d+)(-(\d+))?)?$/,Yx=22,Ac=".",Ks="0",BA=";",zA=",",hp="#";function HA(t,e,n,i,r,o,s=!1){let a="",l=!1;if(!isFinite(t))a=Do(n,Vn.Infinity);else{let c=WA(t);s&&(c=jA(c));let u=e.minInt,d=e.minFrac,m=e.maxFrac;if(o){let H=o.match(VA);if(H===null)throw new Error(`${o} is not a valid digit info`);let fe=H[1],B=H[3],O=H[5];fe!=null&&(u=pp(fe)),B!=null&&(d=pp(B)),O!=null?m=pp(O):B!=null&&d>m&&(m=d)}$A(c,d,m);let f=c.digits,v=c.integerLen,b=c.exponent,N=[];for(l=f.every(H=>!H);v<u;v++)f.unshift(0);for(;v<0;v++)f.unshift(0);v>0?N=f.splice(v,f.length):(N=f,f=[0]);let P=[];for(f.length>=e.lgSize&&P.unshift(f.splice(-e.lgSize,f.length).join(""));f.length>e.gSize;)P.unshift(f.splice(-e.gSize,f.length).join(""));f.length&&P.unshift(f.join("")),a=P.join(Do(n,i)),N.length&&(a+=Do(n,r)+N.join("")),b&&(a+=Do(n,Vn.Exponential)+"+"+b)}return t<0&&!l?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function Kx(t,e,n){let i=Zx(e,mp.Decimal),r=GA(i,Do(e,Vn.MinusSign));return HA(t,r,e,Vn.Group,Vn.Decimal,n)}function GA(t,e="-"){let n={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=t.split(BA),r=i[0],o=i[1],s=r.indexOf(Ac)!==-1?r.split(Ac):[r.substring(0,r.lastIndexOf(Ks)+1),r.substring(r.lastIndexOf(Ks)+1)],a=s[0],l=s[1]||"";n.posPre=a.substring(0,a.indexOf(hp));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===Ks?n.minFrac=n.maxFrac=u+1:d===hp?n.maxFrac=u+1:n.posSuf+=d}let c=a.split(zA);if(n.gSize=c[1]?c[1].length:0,n.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let u=r.length-n.posPre.length-n.posSuf.length,d=o.indexOf(hp);n.negPre=o.substring(0,d).replace(/'/g,""),n.negSuf=o.slice(d+u).replace(/'/g,"")}else n.negPre=e+n.posPre,n.negSuf=n.posSuf;return n}function jA(t){if(t.digits[0]===0)return t;let e=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(e===0?t.digits.push(0,0):e===1&&t.digits.push(0),t.integerLen+=2),t}function WA(t){let e=Math.abs(t)+"",n=0,i,r,o,s,a;for((r=e.indexOf(Ac))>-1&&(e=e.replace(Ac,"")),(o=e.search(/e/i))>0?(r<0&&(r=o),r+=+e.slice(o+1),e=e.substring(0,o)):r<0&&(r=e.length),o=0;e.charAt(o)===Ks;o++);if(o===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===Ks;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(e.charAt(o))}return r>Yx&&(i=i.splice(0,Yx-1),n=r-1,r=1),{digits:i,exponent:n,integerLen:r}}function $A(t,e,n){if(e>n)throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`);let i=t.digits,r=i.length-t.integerLen,o=Math.min(Math.max(e,r),n),s=o+t.integerLen,a=i[s];if(s>0){i.splice(Math.max(t.integerLen,s));for(let d=s;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),t.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let d=1;d<s;d++)i[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)i.unshift(0),t.integerLen++;i.unshift(1),t.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=e+t.integerLen,u=i.reduceRight(function(d,m,f,v){return m=m+d,v[f]=m<10?m:m-10,l&&(v[f]===0&&f>=c?v.pop():l=!1),m>=10?1:0},0);u&&(i.unshift(u),t.integerLen++)}function pp(t){let e=parseInt(t);if(isNaN(e))throw new Error("Invalid integer literal when parsing "+t);return e}function qA(t,e){return new z(2100,!1)}var gp=(()=>{class t{_locale;constructor(n){this._locale=n}transform(n,i,r){if(!XA(n))return null;r||=this._locale;try{let o=YA(n);return Kx(o,r,i)}catch(o){throw qA(t,o.message)}}static \u0275fac=function(i){return new(i||t)(kn(Tc,16))};static \u0275pipe=Ec({name:"number",type:t,pure:!0})}return t})();function XA(t){return!(t==null||t===""||t!==t)}function YA(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new Error(`${t} is not a number`);return t}function vp(t,e){e=encodeURIComponent(e);for(let n of t.split(";")){let i=n.indexOf("="),[r,o]=i==-1?[n,""]:[n.slice(0,i),n.slice(i+1)];if(r.trim()===e)return decodeURIComponent(o)}return null}var yp="browser",Jx="server";function Rc(t){return t===Jx}var Js=class{};var Lc=new A(""),Sp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,i){this._zone=i,n.forEach(r=>{r.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,i,r,o){return this._findPluginFor(i).addEventListener(n,i,r,o)}getZone(){return this._zone}_findPluginFor(n){let i=this._eventNameToPlugin.get(n);if(i)return i;if(i=this._plugins.find(o=>o.supports(n)),!i)throw new z(5101,!1);return this._eventNameToPlugin.set(n,i),i}static \u0275fac=function(i){return new(i||t)(L(Lc),L(Ae))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),Qs=class{_doc;constructor(e){this._doc=e}manager},Nc="ng-app-id";function Qx(t){for(let e of t)e.remove()}function eb(t,e){let n=e.createElement("style");return n.textContent=t,n}function QA(t,e,n,i){let r=t.head?.querySelectorAll(`style[${Nc}="${e}"],link[${Nc}="${e}"]`);if(r)for(let o of r)o.removeAttribute(Nc),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&n.set(o.textContent,{usage:0,elements:[o]})}function xp(t,e){let n=e.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",t),n}var wp=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(n,i,r,o={}){this.doc=n,this.appId=i,this.nonce=r,this.isServer=Rc(o),QA(n,i,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,i){for(let r of n)this.addUsage(r,this.inline,eb);i?.forEach(r=>this.addUsage(r,this.external,xp))}removeStyles(n,i){for(let r of n)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(n,i,r){let o=i.get(n);o?o.usage++:i.set(n,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(n,this.doc)))})}removeUsage(n,i){let r=i.get(n);r&&(r.usage--,r.usage<=0&&(Qx(r.elements),i.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])Qx(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(n,eb(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(n,xp(i,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,i){return this.nonce&&i.setAttribute("nonce",this.nonce),this.isServer&&i.setAttribute(Nc,this.appId),n.appendChild(i)}static \u0275fac=function(i){return new(i||t)(L(je),L(Fh),L(Uh,8),L(zs))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),_p={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Mp=/%COMP%/g;var nb="%COMP%",eR=`_nghost-${nb}`,tR=`_ngcontent-${nb}`,nR=!0,iR=new A("",{providedIn:"root",factory:()=>nR});function rR(t){return tR.replace(Mp,t)}function oR(t){return eR.replace(Mp,t)}function ib(t,e){return e.map(n=>n.replace(Mp,t))}var Ep=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(n,i,r,o,s,a,l,c=null,u=null){this.eventManager=n,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.platformId=a,this.ngZone=l,this.nonce=c,this.tracingService=u,this.platformIsServer=Rc(a),this.defaultRenderer=new ea(n,s,l,this.platformIsServer,this.tracingService)}createRenderer(n,i){if(!n||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===Pn.ShadowDom&&(i=M(y({},i),{encapsulation:Pn.Emulated}));let r=this.getOrCreateRenderer(n,i);return r instanceof Pc?r.applyToHost(n):r instanceof ta&&r.applyStyles(),r}getOrCreateRenderer(n,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,m=this.tracingService;switch(i.encapsulation){case Pn.Emulated:o=new Pc(l,c,i,this.appId,u,s,a,d,m);break;case Pn.ShadowDom:return new bp(l,c,n,i,s,a,this.nonce,d,m);default:o=new ta(l,c,i,u,s,a,d,m);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(i){return new(i||t)(L(Sp),L(wp),L(Fh),L(iR),L(je),L(zs),L(Ae),L(Uh),L(gc,8))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),ea=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,n,i,r,o){this.eventManager=e,this.doc=n,this.ngZone=i,this.platformIsServer=r,this.tracingService=o}destroy(){}destroyNode=null;createElement(e,n){return n?this.doc.createElementNS(_p[n]||n,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,n){(tb(e)?e.content:e).appendChild(n)}insertBefore(e,n,i){e&&(tb(e)?e.content:e).insertBefore(n,i)}removeChild(e,n){n.remove()}selectRootElement(e,n){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new z(-5104,!1);return n||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,n,i,r){if(r){n=r+":"+n;let o=_p[r];o?e.setAttributeNS(o,n,i):e.setAttribute(n,i)}else e.setAttribute(n,i)}removeAttribute(e,n,i){if(i){let r=_p[i];r?e.removeAttributeNS(r,n):e.removeAttribute(`${i}:${n}`)}else e.removeAttribute(n)}addClass(e,n){e.classList.add(n)}removeClass(e,n){e.classList.remove(n)}setStyle(e,n,i,r){r&(ti.DashCase|ti.Important)?e.style.setProperty(n,i,r&ti.Important?"important":""):e.style[n]=i}removeStyle(e,n,i){i&ti.DashCase?e.style.removeProperty(n):e.style[n]=""}setProperty(e,n,i){e!=null&&(e[n]=i)}setValue(e,n){e.nodeValue=n}listen(e,n,i,r){if(typeof e=="string"&&(e=si().getGlobalEventTarget(this.doc,e),!e))throw new z(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,n,o)),this.eventManager.addEventListener(e,n,o,r)}decoratePreventDefault(e){return n=>{if(n==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(n)):e(n))===!1&&n.preventDefault()}}};function tb(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var bp=class extends ea{sharedStylesHost;hostEl;shadowRoot;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,l,c),this.sharedStylesHost=n,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=ib(r.id,u);for(let m of u){let f=document.createElement("style");a&&f.setAttribute("nonce",a),f.textContent=m,this.shadowRoot.appendChild(f)}let d=r.getExternalStyles?.();if(d)for(let m of d){let f=xp(m,o);a&&f.setAttribute("nonce",a),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,n){return super.appendChild(this.nodeOrShadowRoot(e),n)}insertBefore(e,n,i){return super.insertBefore(this.nodeOrShadowRoot(e),n,i)}removeChild(e,n){return super.removeChild(null,n)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},ta=class extends ea{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,a,l),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=c?ib(c,u):u,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Pc=class extends ta{contentAttr;hostAttr;constructor(e,n,i,r,o,s,a,l,c){let u=r+"-"+i.id;super(e,n,i,o,s,a,l,c,u),this.contentAttr=rR(u),this.hostAttr=oR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,n){let i=super.createElement(e,n);return super.setAttribute(i,this.contentAttr,""),i}};var Oc=class t extends Zs{supportsDOMEvents=!0;static makeCurrent(){dp(new t)}onAndCancel(e,n,i,r){return e.addEventListener(n,i,r),()=>{e.removeEventListener(n,i,r)}}dispatchEvent(e,n){e.dispatchEvent(n)}remove(e){e.remove()}createElement(e,n){return n=n||this.getDefaultDocument(),n.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,n){return n==="window"?window:n==="document"?e:n==="body"?e.body:null}getBaseHref(e){let n=sR();return n==null?null:aR(n)}resetBaseElement(){na=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return vp(document.cookie,e)}},na=null;function sR(){return na=na||document.head.querySelector("base"),na?na.getAttribute("href"):null}function aR(t){return new URL(t,document.baseURI).pathname}var lR=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),ob=(()=>{class t extends Qs{constructor(n){super(n)}supports(n){return!0}addEventListener(n,i,r,o){return n.addEventListener(i,r,o),()=>this.removeEventListener(n,i,r,o)}removeEventListener(n,i,r,o){return n.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(L(je))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})(),rb=["alt","control","meta","shift"],cR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},uR={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},sb=(()=>{class t extends Qs{constructor(n){super(n)}supports(n){return t.parseEventName(n)!=null}addEventListener(n,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>si().onAndCancel(n,s.domEventName,a,o))}static parseEventName(n){let i=n.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),rb.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(n,i){let r=cR[n.key]||n.key,o="";return i.indexOf("code.")>-1&&(r=n.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),rb.forEach(s=>{if(s!==r){let a=uR[s];a(n)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(n,i,r){return o=>{t.matchEventFullKeyCode(o,n)&&r.runGuarded(()=>i(o))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(i){return new(i||t)(L(je))};static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();function Cp(t,e,n){return Bx(y({rootComponent:t,platformRef:n?.platformRef},dR(e)))}function dR(t){return{appProviders:[...gR,...t?.providers??[]],platformProviders:mR}}function fR(){Oc.makeCurrent()}function hR(){return new _t}function pR(){return a_(document),document}var mR=[{provide:zs,useValue:yp},{provide:kh,useValue:fR,multi:!0},{provide:je,useFactory:pR}];var gR=[{provide:uc,useValue:"root"},{provide:_t,useFactory:hR},{provide:Lc,useClass:ob,multi:!0,deps:[je]},{provide:Lc,useClass:sb,multi:!0,deps:[je]},Ep,wp,Sp,{provide:lo,useExisting:Ep},{provide:Js,useClass:lR},[]];var ab=(()=>{class t{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(i){return new(i||t)(L(je))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Tp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=L(vR),r},providedIn:"root"})}return t})(),vR=(()=>{class t extends Tp{_doc;constructor(n){super(),this._doc=n}sanitize(n,i){if(i==null)return null;switch(n){case yn.NONE:return i;case yn.HTML:return ri(i,"HTML")?vn(i):Vh(this._doc,String(i)).toString();case yn.STYLE:return ri(i,"Style")?vn(i):i;case yn.SCRIPT:if(ri(i,"Script"))return vn(i);throw new z(5200,!1);case yn.URL:return ri(i,"URL")?vn(i):yc(String(i));case yn.RESOURCE_URL:if(ri(i,"ResourceURL"))return vn(i);throw new z(5201,!1);default:throw new z(5202,!1)}}bypassSecurityTrustHtml(n){return g_(n)}bypassSecurityTrustStyle(n){return v_(n)}bypassSecurityTrustScript(n){return y_(n)}bypassSecurityTrustUrl(n){return __(n)}bypassSecurityTrustResourceUrl(n){return x_(n)}static \u0275fac=function(i){return new(i||t)(L(je))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ie="primary",ma=Symbol("RouteTitle"),Np=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n[0]:n}return null}getAll(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function dr(t){return new Np(t)}function mb(t,e,n){let i=n.path.split("/");if(i.length>t.length||n.pathMatch==="full"&&(e.hasChildren()||i.length<t.length))return null;let r={};for(let o=0;o<i.length;o++){let s=i[o],a=t[o];if(s[0]===":")r[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:t.slice(0,i.length),posParams:r}}function _R(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(!Bn(t[n],e[n]))return!1;return!0}function Bn(t,e){let n=t?Pp(t):void 0,i=e?Pp(e):void 0;if(!n||!i||n.length!=i.length)return!1;let r;for(let o=0;o<n.length;o++)if(r=n[o],!gb(t[r],e[r]))return!1;return!0}function Pp(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function gb(t,e){if(Array.isArray(t)&&Array.isArray(e)){if(t.length!==e.length)return!1;let n=[...t].sort(),i=[...e].sort();return n.every((r,o)=>i[o]===r)}else return t===e}function vb(t){return t.length>0?t[t.length-1]:null}function Ii(t){return Bd(t)?t:qs(t)?Fe(Promise.resolve(t)):X(t)}var xR={exact:_b,subset:xb},yb={exact:bR,subset:SR,ignored:()=>!0};function lb(t,e,n){return xR[n.paths](t.root,e.root,n.matrixParams)&&yb[n.queryParams](t.queryParams,e.queryParams)&&!(n.fragment==="exact"&&t.fragment!==e.fragment)}function bR(t,e){return Bn(t,e)}function _b(t,e,n){if(!cr(t.segments,e.segments)||!Uc(t.segments,e.segments,n)||t.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!t.children[i]||!_b(t.children[i],e.children[i],n))return!1;return!0}function SR(t,e){return Object.keys(e).length<=Object.keys(t).length&&Object.keys(e).every(n=>gb(t[n],e[n]))}function xb(t,e,n){return bb(t,e,e.segments,n)}function bb(t,e,n,i){if(t.segments.length>n.length){let r=t.segments.slice(0,n.length);return!(!cr(r,n)||e.hasChildren()||!Uc(r,n,i))}else if(t.segments.length===n.length){if(!cr(t.segments,n)||!Uc(t.segments,n,i))return!1;for(let r in e.children)if(!t.children[r]||!xb(t.children[r],e.children[r],i))return!1;return!0}else{let r=n.slice(0,t.segments.length),o=n.slice(t.segments.length);return!cr(t.segments,r)||!Uc(t.segments,r,i)||!t.children[ie]?!1:bb(t.children[ie],e,o,i)}}function Uc(t,e,n){return e.every((i,r)=>yb[n](t[r].parameters,i.parameters))}var zn=class{root;queryParams;fragment;_queryParamMap;constructor(e=new Ce([],{}),n={},i=null){this.root=e,this.queryParams=n,this.fragment=i}get queryParamMap(){return this._queryParamMap??=dr(this.queryParams),this._queryParamMap}toString(){return ER.serialize(this)}},Ce=class{segments;children;parent=null;constructor(e,n){this.segments=e,this.children=n,Object.values(n).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Vc(this)}},Ei=class{path;parameters;_parameterMap;constructor(e,n){this.path=e,this.parameters=n}get parameterMap(){return this._parameterMap??=dr(this.parameters),this._parameterMap}toString(){return wb(this)}};function wR(t,e){return cr(t,e)&&t.every((n,i)=>Bn(n.parameters,e[i].parameters))}function cr(t,e){return t.length!==e.length?!1:t.every((n,i)=>n.path===e[i].path)}function MR(t,e){let n=[];return Object.entries(t.children).forEach(([i,r])=>{i===ie&&(n=n.concat(e(r,i)))}),Object.entries(t.children).forEach(([i,r])=>{i!==ie&&(n=n.concat(e(r,i)))}),n}var ga=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>new fr,providedIn:"root"})}return t})(),fr=class{parse(e){let n=new Op(e);return new zn(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(e){let n=`/${ia(e.root,!0)}`,i=IR(e.queryParams),r=typeof e.fragment=="string"?`#${CR(e.fragment)}`:"";return`${n}${i}${r}`}},ER=new fr;function Vc(t){return t.segments.map(e=>wb(e)).join("/")}function ia(t,e){if(!t.hasChildren())return Vc(t);if(e){let n=t.children[ie]?ia(t.children[ie],!1):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==ie&&i.push(`${r}:${ia(o,!1)}`)}),i.length>0?`${n}(${i.join("//")})`:n}else{let n=MR(t,(i,r)=>r===ie?[ia(t.children[ie],!1)]:[`${r}:${ia(i,!1)}`]);return Object.keys(t.children).length===1&&t.children[ie]!=null?`${Vc(t)}/${n[0]}`:`${Vc(t)}/(${n.join("//")})`}}function Sb(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Fc(t){return Sb(t).replace(/%3B/gi,";")}function CR(t){return encodeURI(t)}function Lp(t){return Sb(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Bc(t){return decodeURIComponent(t)}function cb(t){return Bc(t.replace(/\+/g,"%20"))}function wb(t){return`${Lp(t.path)}${TR(t.parameters)}`}function TR(t){return Object.entries(t).map(([e,n])=>`;${Lp(e)}=${Lp(n)}`).join("")}function IR(t){let e=Object.entries(t).map(([n,i])=>Array.isArray(i)?i.map(r=>`${Fc(n)}=${Fc(r)}`).join("&"):`${Fc(n)}=${Fc(i)}`).filter(n=>n);return e.length?`?${e.join("&")}`:""}var DR=/^[^\/()?;#]+/;function Ip(t){let e=t.match(DR);return e?e[0]:""}var AR=/^[^\/()?;=#]+/;function RR(t){let e=t.match(AR);return e?e[0]:""}var NR=/^[^=?&#]+/;function PR(t){let e=t.match(NR);return e?e[0]:""}var LR=/^[^&#]+/;function OR(t){let e=t.match(LR);return e?e[0]:""}var Op=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Ce([],{}):new Ce([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1)),(e.length>0||Object.keys(n).length>0)&&(i[ie]=new Ce(e,n)),i}parseSegment(){let e=Ip(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new z(4009,!1);return this.capture(e),new Ei(Bc(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let n=RR(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let r=Ip(this.remaining);r&&(i=r,this.capture(i))}e[Bc(n)]=Bc(i)}parseQueryParam(e){let n=PR(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let s=OR(this.remaining);s&&(i=s,this.capture(i))}let r=cb(n),o=cb(i);if(e.hasOwnProperty(r)){let s=e[r];Array.isArray(s)||(s=[s],e[r]=s),s.push(o)}else e[r]=o}parseParens(e){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Ip(this.remaining),r=this.remaining[i.length];if(r!=="/"&&r!==")"&&r!==";")throw new z(4010,!1);let o;i.indexOf(":")>-1?(o=i.slice(0,i.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=ie);let s=this.parseChildren();n[o]=Object.keys(s).length===1?s[ie]:new Ce([],s),this.consumeOptional("//")}return n}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new z(4011,!1)}};function Mb(t){return t.segments.length>0?new Ce([],{[ie]:t}):t}function Eb(t){let e={};for(let[i,r]of Object.entries(t.children)){let o=Eb(r);if(i===ie&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))e[s]=a;else(o.segments.length>0||o.hasChildren())&&(e[i]=o)}let n=new Ce(t.segments,e);return FR(n)}function FR(t){if(t.numberOfChildren===1&&t.children[ie]){let e=t.children[ie];return new Ce(t.segments.concat(e.segments),e.children)}return t}function Ci(t){return t instanceof zn}function Cb(t,e,n=null,i=null){let r=Tb(t);return Ib(r,e,n,i)}function Tb(t){let e;function n(o){let s={};for(let l of o.children){let c=n(l);s[l.outlet]=c}let a=new Ce(o.url,s);return o===t&&(e=a),a}let i=n(t.root),r=Mb(i);return e??r}function Ib(t,e,n,i){let r=t;for(;r.parent;)r=r.parent;if(e.length===0)return Dp(r,r,r,n,i);let o=kR(e);if(o.toRoot())return Dp(r,r,new Ce([],{}),n,i);let s=UR(o,r,t),a=s.processChildren?oa(s.segmentGroup,s.index,o.commands):Ab(s.segmentGroup,s.index,o.commands);return Dp(r,s.segmentGroup,a,n,i)}function Hc(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function aa(t){return typeof t=="object"&&t!=null&&t.outlets}function Dp(t,e,n,i,r){let o={};i&&Object.entries(i).forEach(([l,c])=>{o[l]=Array.isArray(c)?c.map(u=>`${u}`):`${c}`});let s;t===e?s=n:s=Db(t,e,n);let a=Mb(Eb(s));return new zn(a,o,r)}function Db(t,e,n){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===e?i[r]=n:i[r]=Db(o,e,n)}),new Ce(t.segments,i)}var Gc=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,n,i){if(this.isAbsolute=e,this.numberOfDoubleDots=n,this.commands=i,e&&i.length>0&&Hc(i[0]))throw new z(4003,!1);let r=i.find(aa);if(r&&r!==vb(i))throw new z(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function kR(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new Gc(!0,0,t);let e=0,n=!1,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?n=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new Gc(n,e,i)}var No=class{segmentGroup;processChildren;index;constructor(e,n,i){this.segmentGroup=e,this.processChildren=n,this.index=i}};function UR(t,e,n){if(t.isAbsolute)return new No(e,!0,0);if(!n)return new No(e,!1,NaN);if(n.parent===null)return new No(n,!0,0);let i=Hc(t.commands[0])?0:1,r=n.segments.length-1+i;return VR(n,r,t.numberOfDoubleDots)}function VR(t,e,n){let i=t,r=e,o=n;for(;o>r;){if(o-=r,i=i.parent,!i)throw new z(4005,!1);r=i.segments.length}return new No(i,!1,r-o)}function BR(t){return aa(t[0])?t[0].outlets:{[ie]:t}}function Ab(t,e,n){if(t??=new Ce([],{}),t.segments.length===0&&t.hasChildren())return oa(t,e,n);let i=zR(t,e,n),r=n.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new Ce(t.segments.slice(0,i.pathIndex),{});return o.children[ie]=new Ce(t.segments.slice(i.pathIndex),t.children),oa(o,0,r)}else return i.match&&r.length===0?new Ce(t.segments,{}):i.match&&!t.hasChildren()?Fp(t,e,n):i.match?oa(t,0,r):Fp(t,e,n)}function oa(t,e,n){if(n.length===0)return new Ce(t.segments,{});{let i=BR(n),r={};if(Object.keys(i).some(o=>o!==ie)&&t.children[ie]&&t.numberOfChildren===1&&t.children[ie].segments.length===0){let o=oa(t.children[ie],e,n);return new Ce(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=Ab(t.children[o],e,s))}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new Ce(t.segments,r)}}function zR(t,e,n){let i=0,r=e,o={match:!1,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=n.length)return o;let s=t.segments[r],a=n[i];if(aa(a))break;let l=`${a}`,c=i<n.length-1?n[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!db(l,c,s))return o;i+=2}else{if(!db(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Fp(t,e,n){let i=t.segments.slice(0,e),r=0;for(;r<n.length;){let o=n[r];if(aa(o)){let l=HR(o.outlets);return new Ce(i,l)}if(r===0&&Hc(n[0])){let l=t.segments[e];i.push(new Ei(l.path,ub(n[0]))),r++;continue}let s=aa(o)?o.outlets[ie]:`${o}`,a=r<n.length-1?n[r+1]:null;s&&a&&Hc(a)?(i.push(new Ei(s,ub(a))),r+=2):(i.push(new Ei(s,{})),r++)}return new Ce(i,{})}function HR(t){let e={};return Object.entries(t).forEach(([n,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[n]=Fp(new Ce([],{}),0,i))}),e}function ub(t){let e={};return Object.entries(t).forEach(([n,i])=>e[n]=`${i}`),e}function db(t,e,n){return t==n.path&&Bn(e,n.parameters)}var zc="imperative",rt=function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t}(rt||{}),$t=class{id;url;constructor(e,n){this.id=e,this.url=n}},Hn=class extends $t{type=rt.NavigationStart;navigationTrigger;restoredState;constructor(e,n,i="imperative",r=null){super(e,n),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Lt=class extends $t{urlAfterRedirects;type=rt.NavigationEnd;constructor(e,n,i){super(e,n),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Pt=function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t}(Pt||{}),la=function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t}(la||{}),tn=class extends $t{reason;code;type=rt.NavigationCancel;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},ai=class extends $t{reason;code;type=rt.NavigationSkipped;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}},li=class extends $t{error;target;type=rt.NavigationError;constructor(e,n,i,r){super(e,n),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ti=class extends $t{urlAfterRedirects;state;type=rt.RoutesRecognized;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},jc=class extends $t{urlAfterRedirects;state;type=rt.GuardsCheckStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Wc=class extends $t{urlAfterRedirects;state;shouldActivate;type=rt.GuardsCheckEnd;constructor(e,n,i,r,o){super(e,n),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},$c=class extends $t{urlAfterRedirects;state;type=rt.ResolveStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},qc=class extends $t{urlAfterRedirects;state;type=rt.ResolveEnd;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Xc=class{route;type=rt.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Yc=class{route;type=rt.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Zc=class{snapshot;type=rt.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Kc=class{snapshot;type=rt.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Jc=class{snapshot;type=rt.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Qc=class{snapshot;type=rt.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ca=class{},Lo=class{url;navigationBehaviorOptions;constructor(e,n){this.url=e,this.navigationBehaviorOptions=n}};function GR(t,e){return t.providers&&!t._injector&&(t._injector=Mc(t.providers,e,`Route: ${t.path}`)),t._injector??e}function _n(t){return t.outlet||ie}function jR(t,e){let n=t.filter(i=>_n(i)===e);return n.push(...t.filter(i=>_n(i)!==e)),n}function va(t){if(!t)return null;if(t.routeConfig?._injector)return t.routeConfig._injector;for(let e=t.parent;e;e=e.parent){let n=e.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var eu=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return va(this.route?.snapshot)??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new ko(this.rootInjector)}},ko=(()=>{class t{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,i){let r=this.getOrCreateContext(n);r.outlet=i,this.contexts.set(n,r)}onChildOutletDestroyed(n){let i=this.getContext(n);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let i=this.getContext(n);return i||(i=new eu(this.rootInjector),this.contexts.set(n,i)),i}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(i){return new(i||t)(L(Ht))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),tu=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let n=this.pathFromRoot(e);return n.length>1?n[n.length-2]:null}children(e){let n=kp(e,this._root);return n?n.children.map(i=>i.value):[]}firstChild(e){let n=kp(e,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(e){let n=Up(e,this._root);return n.length<2?[]:n[n.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Up(e,this._root).map(n=>n.value)}};function kp(t,e){if(t===e.value)return e;for(let n of e.children){let i=kp(t,n);if(i)return i}return null}function Up(t,e){if(t===e.value)return[e];for(let n of e.children){let i=Up(t,n);if(i.length)return i.unshift(e),i}return[]}var Wt=class{value;children;constructor(e,n){this.value=e,this.children=n}toString(){return`TreeNode(${this.value})`}};function Ro(t){let e={};return t&&t.children.forEach(n=>e[n.value.outlet]=n),e}var ua=class extends tu{snapshot;constructor(e,n){super(e),this.snapshot=n,$p(this,e)}toString(){return this.snapshot.toString()}};function Rb(t){let e=WR(t),n=new $e([new Ei("",{})]),i=new $e({}),r=new $e({}),o=new $e({}),s=new $e(""),a=new ci(n,i,o,s,r,ie,t,e.root);return a.snapshot=e.root,new ua(new Wt(a,[]),e)}function WR(t){let e={},n={},i={},r="",o=new ur([],e,i,r,n,ie,t,null,{});return new da("",new Wt(o,[]))}var ci=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,n,i,r,o,s,a,l){this.urlSubject=e,this.paramsSubject=n,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(G(c=>c[ma]))??X(void 0),this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(G(e=>dr(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(G(e=>dr(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function nu(t,e,n="emptyOnly"){let i,{routeConfig:r}=t;return e!==null&&(n==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:y(y({},e.params),t.params),data:y(y({},e.data),t.data),resolve:y(y(y(y({},t.data),e.data),r?.data),t._resolvedData)}:i={params:y({},t.params),data:y({},t.data),resolve:y(y({},t.data),t._resolvedData??{})},r&&Pb(r)&&(i.resolve[ma]=r.title),i}var ur=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[ma]}constructor(e,n,i,r,o,s,a,l,c){this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=dr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=dr(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${n}')`}},da=class extends tu{url;constructor(e,n){super(n),this.url=e,$p(this,n)}toString(){return Nb(this._root)}};function $p(t,e){e.value._routerState=t,e.children.forEach(n=>$p(t,n))}function Nb(t){let e=t.children.length>0?` { ${t.children.map(Nb).join(", ")} } `:"";return`${t.value}${e}`}function Ap(t){if(t.snapshot){let e=t.snapshot,n=t._futureSnapshot;t.snapshot=n,Bn(e.queryParams,n.queryParams)||t.queryParamsSubject.next(n.queryParams),e.fragment!==n.fragment&&t.fragmentSubject.next(n.fragment),Bn(e.params,n.params)||t.paramsSubject.next(n.params),_R(e.url,n.url)||t.urlSubject.next(n.url),Bn(e.data,n.data)||t.dataSubject.next(n.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function Vp(t,e){let n=Bn(t.params,e.params)&&wR(t.url,e.url),i=!t.parent!=!e.parent;return n&&!i&&(!t.parent||Vp(t.parent,e.parent))}function Pb(t){return typeof t.title=="string"||t.title===null}var Lb=new A(""),hr=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=ie;activateEvents=new ft;deactivateEvents=new ft;attachEvents=new ft;detachEvents=new ft;routerOutletData=Vs(void 0);parentContexts=w(ko);location=w(yo);changeDetector=w(Co);inputBinder=w(su,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:i,previousValue:r}=n.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new z(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new z(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new z(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,i){this.activated=n,this._activatedRoute=i,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,i){if(this.isActivated)throw new z(4013,!1);this._activatedRoute=n;let r=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new Bp(n,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$s({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[ir]})}return t})(),Bp=class{route;childContexts;parent;outletData;constructor(e,n,i,r){this.route=e,this.childContexts=n,this.parent=i,this.outletData=r}get(e,n){return e===ci?this.route:e===ko?this.childContexts:e===Lb?this.outletData:this.parent.get(e,n)}},su=new A("");var qp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=Te({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&xe(0,"router-outlet")},dependencies:[hr],encapsulation:2})}return t})();function Xp(t){let e=t.children&&t.children.map(Xp),n=e?M(y({},t),{children:e}):y({},t);return!n.component&&!n.loadComponent&&(e||n.loadChildren)&&n.outlet&&n.outlet!==ie&&(n.component=qp),n}function $R(t,e,n){let i=fa(t,e._root,n?n._root:void 0);return new ua(i,e)}function fa(t,e,n){if(n&&t.shouldReuseRoute(e.value,n.value.snapshot)){let i=n.value;i._futureSnapshot=e.value;let r=qR(t,e,n);return new Wt(i,r)}else{if(t.shouldAttach(e.value)){let o=t.retrieve(e.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=e.value,s.children=e.children.map(a=>fa(t,a)),s}}let i=XR(e.value),r=e.children.map(o=>fa(t,o));return new Wt(i,r)}}function qR(t,e,n){return e.children.map(i=>{for(let r of n.children)if(t.shouldReuseRoute(i.value,r.value.snapshot))return fa(t,i,r);return fa(t,i)})}function XR(t){return new ci(new $e(t.url),new $e(t.params),new $e(t.queryParams),new $e(t.fragment),new $e(t.data),t.outlet,t.component,t)}var Oo=class{redirectTo;navigationBehaviorOptions;constructor(e,n){this.redirectTo=e,this.navigationBehaviorOptions=n}},Ob="ngNavigationCancelingError";function iu(t,e){let{redirectTo:n,navigationBehaviorOptions:i}=Ci(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=Fb(!1,Pt.Redirect);return r.url=n,r.navigationBehaviorOptions=i,r}function Fb(t,e){let n=new Error(`NavigationCancelingError: ${t||""}`);return n[Ob]=!0,n.cancellationCode=e,n}function YR(t){return kb(t)&&Ci(t.url)}function kb(t){return!!t&&t[Ob]}var ZR=(t,e,n,i)=>G(r=>(new zp(e,r.targetRouterState,r.currentRouterState,n,i).activate(t),r)),zp=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,n,i,r,o){this.routeReuseStrategy=e,this.futureState=n,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(e){let n=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,i,e),Ap(this.futureState.root),this.activateChildRoutes(n,i,e)}deactivateChildRoutes(e,n,i){let r=Ro(n);e.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(e,n,s.children)}else this.deactivateChildRoutes(e,n,i);else o&&this.deactivateRouteAndItsChildren(n,i)}deactivateRouteAndItsChildren(e,n){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,n):this.deactivateRouteAndOutlet(e,n)}detachAndStoreRouteSubtree(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=Ro(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:s,route:e,contexts:a})}}deactivateRouteAndOutlet(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=Ro(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,n,i){let r=Ro(n);e.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Qc(o.value.snapshot))}),e.children.length&&this.forwardEvent(new Kc(e.value.snapshot))}activateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(Ap(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,n,s.children)}else this.activateChildRoutes(e,n,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Ap(a.route.value),this.activateChildRoutes(e,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(e,null,s.children)}else this.activateChildRoutes(e,null,i)}},ru=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Po=class{component;route;constructor(e,n){this.component=e,this.route=n}};function KR(t,e,n){let i=t._root,r=e?e._root:null;return ra(i,r,n,[i.value])}function JR(t){let e=t.routeConfig?t.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:t,guards:e}}function Uo(t,e){let n=Symbol(),i=e.get(t,n);return i===n?typeof t=="function"&&!$0(t)?t:e.get(t):i}function ra(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=Ro(e);return t.children.forEach(s=>{QR(s,o[s.value.outlet],n,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>sa(a,n.getContext(s),r)),r}function QR(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=e?e.value:null,a=n?n.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=eN(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new ru(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?ra(t,e,a?a.children:null,i,r):ra(t,e,n,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Po(a.outlet.component,s))}else s&&sa(e,a,r),r.canActivateChecks.push(new ru(i)),o.component?ra(t,null,a?a.children:null,i,r):ra(t,null,n,i,r);return r}function eN(t,e,n){if(typeof n=="function")return n(t,e);switch(n){case"pathParamsChange":return!cr(t.url,e.url);case"pathParamsOrQueryParamsChange":return!cr(t.url,e.url)||!Bn(t.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Vp(t,e)||!Bn(t.queryParams,e.queryParams);case"paramsChange":default:return!Vp(t,e)}}function sa(t,e,n){let i=Ro(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?e?sa(s,e.children.getContext(o),n):sa(s,null,n):sa(s,e,n)}),r.component?e&&e.outlet&&e.outlet.isActivated?n.canDeactivateChecks.push(new Po(e.outlet.component,r)):n.canDeactivateChecks.push(new Po(null,r)):n.canDeactivateChecks.push(new Po(null,r))}function ya(t){return typeof t=="function"}function tN(t){return typeof t=="boolean"}function nN(t){return t&&ya(t.canLoad)}function iN(t){return t&&ya(t.canActivate)}function rN(t){return t&&ya(t.canActivateChild)}function oN(t){return t&&ya(t.canDeactivate)}function sN(t){return t&&ya(t.canMatch)}function Ub(t){return t instanceof dn||t?.name==="EmptyError"}var kc=Symbol("INITIAL_VALUE");function Fo(){return lt(t=>Sl(t.map(e=>e.pipe(qe(1),Zd(kc)))).pipe(G(e=>{for(let n of e)if(n!==!0){if(n===kc)return kc;if(n===!1||aN(n))return n}return!0}),pe(e=>e!==kc),qe(1)))}function aN(t){return Ci(t)||t instanceof Oo}function lN(t,e){return ke(n=>{let{targetSnapshot:i,currentSnapshot:r,guards:{canActivateChecks:o,canDeactivateChecks:s}}=n;return s.length===0&&o.length===0?X(M(y({},n),{guardsResult:!0})):cN(s,i,r,t).pipe(ke(a=>a&&tN(a)?uN(i,o,t,e):X(a)),G(a=>M(y({},n),{guardsResult:a})))})}function cN(t,e,n,i){return Fe(t).pipe(ke(r=>mN(r.component,r.route,n,e,i)),Kn(r=>r!==!0,!0))}function uN(t,e,n,i){return Fe(e).pipe(Tt(r=>jr(fN(r.route.parent,i),dN(r.route,i),pN(t,r.path,n),hN(t,r.route,n))),Kn(r=>r!==!0,!0))}function dN(t,e){return t!==null&&e&&e(new Jc(t)),X(!0)}function fN(t,e){return t!==null&&e&&e(new Zc(t)),X(!0)}function hN(t,e,n){let i=e.routeConfig?e.routeConfig.canActivate:null;if(!i||i.length===0)return X(!0);let r=i.map(o=>bs(()=>{let s=va(e)??n,a=Uo(o,s),l=iN(a)?a.canActivate(e,t):gn(s,()=>a(e,t));return Ii(l).pipe(Kn())}));return X(r).pipe(Fo())}function pN(t,e,n){let i=e[e.length-1],o=e.slice(0,e.length-1).reverse().map(s=>JR(s)).filter(s=>s!==null).map(s=>bs(()=>{let a=s.guards.map(l=>{let c=va(s.node)??n,u=Uo(l,c),d=rN(u)?u.canActivateChild(i,t):gn(c,()=>u(i,t));return Ii(d).pipe(Kn())});return X(a).pipe(Fo())}));return X(o).pipe(Fo())}function mN(t,e,n,i,r){let o=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!o||o.length===0)return X(!0);let s=o.map(a=>{let l=va(e)??r,c=Uo(a,l),u=oN(c)?c.canDeactivate(t,e,n,i):gn(l,()=>c(t,e,n,i));return Ii(u).pipe(Kn())});return X(s).pipe(Fo())}function gN(t,e,n,i){let r=e.canLoad;if(r===void 0||r.length===0)return X(!0);let o=r.map(s=>{let a=Uo(s,t),l=nN(a)?a.canLoad(e,n):gn(t,()=>a(e,n));return Ii(l)});return X(o).pipe(Fo(),Vb(i))}function Vb(t){return Od(K(e=>{if(typeof e!="boolean")throw iu(t,e)}),G(e=>e===!0))}function vN(t,e,n,i){let r=e.canMatch;if(!r||r.length===0)return X(!0);let o=r.map(s=>{let a=Uo(s,t),l=sN(a)?a.canMatch(e,n):gn(t,()=>a(e,n));return Ii(l)});return X(o).pipe(Fo(),Vb(i))}var ha=class{segmentGroup;constructor(e){this.segmentGroup=e||null}},pa=class extends Error{urlTree;constructor(e){super(),this.urlTree=e}};function Ao(t){return vi(new ha(t))}function yN(t){return vi(new z(4e3,!1))}function _N(t){return vi(Fb(!1,Pt.GuardRejected))}var Hp=class{urlSerializer;urlTree;constructor(e,n){this.urlSerializer=e,this.urlTree=n}lineralizeSegments(e,n){let i=[],r=n.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return X(i);if(r.numberOfChildren>1||!r.children[ie])return yN(`${e.redirectTo}`);r=r.children[ie]}}applyRedirectCommands(e,n,i,r,o){if(typeof n!="string"){let a=n,{queryParams:l,fragment:c,routeConfig:u,url:d,outlet:m,params:f,data:v,title:b}=r,N=gn(o,()=>a({params:f,data:v,queryParams:l,fragment:c,routeConfig:u,url:d,outlet:m,title:b}));if(N instanceof zn)throw new pa(N);n=N}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),e,i);if(n[0]==="/")throw new pa(s);return s}applyRedirectCreateUrlTree(e,n,i,r){let o=this.createSegmentGroup(e,n.root,i,r);return new zn(o,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(e,n){let i={};return Object.entries(e).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=n[a]}else i[r]=o}),i}createSegmentGroup(e,n,i,r){let o=this.createSegments(e,n.segments,i,r),s={};return Object.entries(n.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(e,l,i,r)}),new Ce(o,s)}createSegments(e,n,i,r){return n.map(o=>o.path[0]===":"?this.findPosParam(e,o,r):this.findOrReturn(o,i))}findPosParam(e,n,i){let r=i[n.path.substring(1)];if(!r)throw new z(4001,!1);return r}findOrReturn(e,n){let i=0;for(let r of n){if(r.path===e.path)return n.splice(i),r;i++}return e}},Gp={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function xN(t,e,n,i,r){let o=Bb(t,e,n);return o.matched?(i=GR(e,i),vN(i,e,n,r).pipe(G(s=>s===!0?o:y({},Gp)))):X(o)}function Bb(t,e,n){if(e.path==="**")return bN(n);if(e.path==="")return e.pathMatch==="full"&&(t.hasChildren()||n.length>0)?y({},Gp):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let r=(e.matcher||mb)(n,t,e);if(!r)return y({},Gp);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?y(y({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:n.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function bN(t){return{matched:!0,parameters:t.length>0?vb(t).parameters:{},consumedSegments:t,remainingSegments:[],positionalParamSegments:{}}}function fb(t,e,n,i){return n.length>0&&MN(t,n,i)?{segmentGroup:new Ce(e,wN(i,new Ce(n,t.children))),slicedSegments:[]}:n.length===0&&EN(t,n,i)?{segmentGroup:new Ce(t.segments,SN(t,n,i,t.children)),slicedSegments:n}:{segmentGroup:new Ce(t.segments,t.children),slicedSegments:n}}function SN(t,e,n,i){let r={};for(let o of n)if(au(t,e,o)&&!i[_n(o)]){let s=new Ce([],{});r[_n(o)]=s}return y(y({},i),r)}function wN(t,e){let n={};n[ie]=e;for(let i of t)if(i.path===""&&_n(i)!==ie){let r=new Ce([],{});n[_n(i)]=r}return n}function MN(t,e,n){return n.some(i=>au(t,e,i)&&_n(i)!==ie)}function EN(t,e,n){return n.some(i=>au(t,e,i))}function au(t,e,n){return(t.hasChildren()||e.length>0)&&n.pathMatch==="full"?!1:n.path===""}function CN(t,e,n){return e.length===0&&!t.children[n]}var jp=class{};function TN(t,e,n,i,r,o,s="emptyOnly"){return new Wp(t,e,n,i,r,s,o).recognize()}var IN=31,Wp=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,n,i,r,o,s,a){this.injector=e,this.configLoader=n,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new Hp(this.urlSerializer,this.urlTree)}noMatchError(e){return new z(4002,`'${e.segmentGroup}'`)}recognize(){let e=fb(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(e).pipe(G(({children:n,rootSnapshot:i})=>{let r=new Wt(i,n),o=new da("",r),s=Cb(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}))}match(e){let n=new ur([],Object.freeze({}),Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),ie,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,e,ie,n).pipe(G(i=>({children:i,rootSnapshot:n})),Kt(i=>{if(i instanceof pa)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof ha?this.noMatchError(i):i}))}processSegmentGroup(e,n,i,r,o){return i.segments.length===0&&i.hasChildren()?this.processChildren(e,n,i,o):this.processSegment(e,n,i,i.segments,r,!0,o).pipe(G(s=>s instanceof Wt?[s]:[]))}processChildren(e,n,i,r){let o=[];for(let s of Object.keys(i.children))s==="primary"?o.unshift(s):o.push(s);return Fe(o).pipe(Tt(s=>{let a=i.children[s],l=jR(n,s);return this.processSegmentGroup(e,l,a,s,r)}),Hi((s,a)=>(s.push(...a),s)),_i(null),Wd(),ke(s=>{if(s===null)return Ao(i);let a=zb(s);return DN(a),X(a)}))}processSegment(e,n,i,r,o,s,a){return Fe(n).pipe(Tt(l=>this.processSegmentAgainstRoute(l._injector??e,n,l,i,r,o,s,a).pipe(Kt(c=>{if(c instanceof ha)return X(null);throw c}))),Kn(l=>!!l),Kt(l=>{if(Ub(l))return CN(i,r,o)?X(new jp):Ao(i);throw l}))}processSegmentAgainstRoute(e,n,i,r,o,s,a,l){return _n(i)!==s&&(s===ie||!au(r,o,i))?Ao(r):i.redirectTo===void 0?this.matchSegmentAgainstRoute(e,r,i,o,s,l):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(e,r,n,i,o,s,l):Ao(r)}expandSegmentAgainstRouteUsingRedirect(e,n,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:d,remainingSegments:m}=Bb(n,r,o);if(!l)return Ao(n);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>IN&&(this.allowRedirects=!1));let f=new ur(o,c,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,hb(r),_n(r),r.component??r._loadedComponent??null,r,pb(r)),v=nu(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(v.params),f.data=Object.freeze(v.data);let b=this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,f,e);return this.applyRedirects.lineralizeSegments(r,b).pipe(ke(N=>this.processSegment(e,i,n,N.concat(m),s,!1,a)))}matchSegmentAgainstRoute(e,n,i,r,o,s){let a=xN(n,i,r,e,this.urlSerializer);return i.path==="**"&&(n.children={}),a.pipe(lt(l=>l.matched?(e=i._injector??e,this.getChildConfig(e,i,r).pipe(lt(({routes:c})=>{let u=i._loadedInjector??e,{parameters:d,consumedSegments:m,remainingSegments:f}=l,v=new ur(m,d,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,hb(i),_n(i),i.component??i._loadedComponent??null,i,pb(i)),b=nu(v,s,this.paramsInheritanceStrategy);v.params=Object.freeze(b.params),v.data=Object.freeze(b.data);let{segmentGroup:N,slicedSegments:P}=fb(n,m,f,c);if(P.length===0&&N.hasChildren())return this.processChildren(u,c,N,v).pipe(G(fe=>new Wt(v,fe)));if(c.length===0&&P.length===0)return X(new Wt(v,[]));let H=_n(i)===o;return this.processSegment(u,c,N,P,H?ie:o,!0,v).pipe(G(fe=>new Wt(v,fe instanceof Wt?[fe]:[])))}))):Ao(n)))}getChildConfig(e,n,i){return n.children?X({routes:n.children,injector:e}):n.loadChildren?n._loadedRoutes!==void 0?X({routes:n._loadedRoutes,injector:n._loadedInjector}):gN(e,n,i,this.urlSerializer).pipe(ke(r=>r?this.configLoader.loadChildren(e,n).pipe(K(o=>{n._loadedRoutes=o.routes,n._loadedInjector=o.injector})):_N(n))):X({routes:[],injector:e})}};function DN(t){t.sort((e,n)=>e.value.outlet===ie?-1:n.value.outlet===ie?1:e.value.outlet.localeCompare(n.value.outlet))}function AN(t){let e=t.value.routeConfig;return e&&e.path===""}function zb(t){let e=[],n=new Set;for(let i of t){if(!AN(i)){e.push(i);continue}let r=e.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),n.add(r)):e.push(i)}for(let i of n){let r=zb(i.children);e.push(new Wt(i.value,r))}return e.filter(i=>!n.has(i))}function hb(t){return t.data||{}}function pb(t){return t.resolve||{}}function RN(t,e,n,i,r,o){return ke(s=>TN(t,e,n,i,s.extractedUrl,r,o).pipe(G(({state:a,tree:l})=>M(y({},s),{targetSnapshot:a,urlAfterRedirects:l}))))}function NN(t,e){return ke(n=>{let{targetSnapshot:i,guards:{canActivateChecks:r}}=n;if(!r.length)return X(n);let o=new Set(r.map(l=>l.route)),s=new Set;for(let l of o)if(!s.has(l))for(let c of Hb(l))s.add(c);let a=0;return Fe(s).pipe(Tt(l=>o.has(l)?PN(l,i,t,e):(l.data=nu(l,l.parent,t).resolve,X(void 0))),K(()=>a++),qr(1),ke(l=>a===s.size?X(n):ze))})}function Hb(t){let e=t.children.map(n=>Hb(n)).flat();return[t,...e]}function PN(t,e,n,i){let r=t.routeConfig,o=t._resolve;return r?.title!==void 0&&!Pb(r)&&(o[ma]=r.title),LN(o,t,e,i).pipe(G(s=>(t._resolvedData=s,t.data=nu(t,t.parent,n).resolve,null)))}function LN(t,e,n,i){let r=Pp(t);if(r.length===0)return X({});let o={};return Fe(r).pipe(ke(s=>ON(t[s],e,n,i).pipe(Kn(),K(a=>{if(a instanceof Oo)throw iu(new fr,a);o[s]=a}))),qr(1),G(()=>o),Kt(s=>Ub(s)?ze:vi(s)))}function ON(t,e,n,i){let r=va(e)??i,o=Uo(t,r),s=o.resolve?o.resolve(e,n):gn(r,()=>o(e,n));return Ii(s)}function Rp(t){return lt(e=>{let n=t(e);return n?Fe(n).pipe(G(()=>e)):X(e)})}var Yp=(()=>{class t{buildTitle(n){let i,r=n.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===ie);return i}getResolvedTitleForRoute(n){return n.data[ma]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(Gb),providedIn:"root"})}return t})(),Gb=(()=>{class t extends Yp{title;constructor(n){super(),this.title=n}updateTitle(n){let i=this.buildTitle(n);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||t)(L(ab))};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),_a=new A("",{providedIn:"root",factory:()=>({})}),xa=new A(""),jb=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=w(Fx);loadComponent(n){if(this.componentLoaders.get(n))return this.componentLoaders.get(n);if(n._loadedComponent)return X(n._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(n);let i=Ii(n.loadComponent()).pipe(G($b),K(o=>{this.onLoadEndListener&&this.onLoadEndListener(n),n._loadedComponent=o}),$r(()=>{this.componentLoaders.delete(n)})),r=new Br(i,()=>new Ie).pipe(Vr());return this.componentLoaders.set(n,r),r}loadChildren(n,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return X({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let o=Wb(i,this.compiler,n,this.onLoadEndListener).pipe($r(()=>{this.childrenLoaders.delete(i)})),s=new Br(o,()=>new Ie).pipe(Vr());return this.childrenLoaders.set(i,s),s}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Wb(t,e,n,i){return Ii(t.loadChildren()).pipe(G($b),ke(r=>r instanceof op||Array.isArray(r)?X(r):Fe(e.compileModuleAsync(r))),G(r=>{i&&i(t);let o,s,a=!1;return Array.isArray(r)?(s=r,a=!0):(o=r.create(n).injector,s=o.get(xa,[],{optional:!0,self:!0}).flat()),{routes:s.map(Xp),injector:o}}))}function FN(t){return t&&typeof t=="object"&&"default"in t}function $b(t){return FN(t)?t.default:t}var lu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(kN),providedIn:"root"})}return t})(),kN=(()=>{class t{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,i){return n}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),qb=new A("");var Xb=new A(""),Yb=(()=>{class t{currentNavigation=null;currentTransition=null;lastSuccessfulNavigation=null;events=new Ie;transitionAbortSubject=new Ie;configLoader=w(jb);environmentInjector=w(Ht);destroyRef=w(Fn);urlSerializer=w(ga);rootContexts=w(ko);location=w(Io);inputBindingEnabled=w(su,{optional:!0})!==null;titleStrategy=w(Yp);options=w(_a,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=w(lu);createViewTransition=w(qb,{optional:!0});navigationErrorHandler=w(Xb,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>X(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=r=>this.events.next(new Xc(r)),i=r=>this.events.next(new Yc(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let i=++this.navigationId;this.transitions?.next(M(y({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i}))}setupNavigations(n){return this.transitions=new $e(null),this.transitions.pipe(pe(i=>i!==null),lt(i=>{let r=!1,o=!1;return X(i).pipe(lt(s=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Pt.SupersededByNewNavigation),ze;this.currentTransition=i,this.currentNavigation={id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:this.lastSuccessfulNavigation?M(y({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let a=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),l=s.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!a&&l!=="reload"){let c="";return this.events.next(new ai(s.id,this.urlSerializer.serialize(s.rawUrl),c,la.IgnoredSameUrlNavigation)),s.resolve(!1),ze}if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return X(s).pipe(lt(c=>(this.events.next(new Hn(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?ze:Promise.resolve(c))),RN(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),K(c=>{i.targetSnapshot=c.targetSnapshot,i.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation=M(y({},this.currentNavigation),{finalUrl:c.urlAfterRedirects});let u=new Ti(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}));if(a&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:c,extractedUrl:u,source:d,restoredState:m,extras:f}=s,v=new Hn(c,this.urlSerializer.serialize(u),d,m);this.events.next(v);let b=Rb(this.rootComponentType).snapshot;return this.currentTransition=i=M(y({},s),{targetSnapshot:b,urlAfterRedirects:u,extras:M(y({},f),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=u,X(i)}else{let c="";return this.events.next(new ai(s.id,this.urlSerializer.serialize(s.extractedUrl),c,la.IgnoredByUrlHandlingStrategy)),s.resolve(!1),ze}}),K(s=>{let a=new jc(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(a)}),G(s=>(this.currentTransition=i=M(y({},s),{guards:KR(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),i)),lN(this.environmentInjector,s=>this.events.next(s)),K(s=>{if(i.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw iu(this.urlSerializer,s.guardsResult);let a=new Wc(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);this.events.next(a)}),pe(s=>s.guardsResult?!0:(this.cancelNavigationTransition(s,"",Pt.GuardRejected),!1)),Rp(s=>{if(s.guards.canActivateChecks.length!==0)return X(s).pipe(K(a=>{let l=new $c(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}),lt(a=>{let l=!1;return X(a).pipe(NN(this.paramsInheritanceStrategy,this.environmentInjector),K({next:()=>l=!0,complete:()=>{l||this.cancelNavigationTransition(a,"",Pt.NoDataFromResolver)}}))}),K(a=>{let l=new qc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}))}),Rp(s=>{let a=l=>{let c=[];l.routeConfig?.loadComponent&&!l.routeConfig._loadedComponent&&c.push(this.configLoader.loadComponent(l.routeConfig).pipe(K(u=>{l.component=u}),G(()=>{})));for(let u of l.children)c.push(...a(u));return c};return Sl(a(s.targetSnapshot.root)).pipe(_i(null),qe(1))}),Rp(()=>this.afterPreactivation()),lt(()=>{let{currentSnapshot:s,targetSnapshot:a}=i,l=this.createViewTransition?.(this.environmentInjector,s.root,a.root);return l?Fe(l).pipe(G(()=>i)):X(i)}),G(s=>{let a=$R(n.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=i=M(y({},s),{targetRouterState:a}),this.currentNavigation.targetRouterState=a,i}),K(()=>{this.events.next(new ca)}),ZR(this.rootContexts,n.routeReuseStrategy,s=>this.events.next(s),this.inputBindingEnabled),qe(1),K({next:s=>{r=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Lt(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(!0)},complete:()=>{r=!0}}),Gi(this.transitionAbortSubject.pipe(K(s=>{throw s}))),$r(()=>{!r&&!o&&this.cancelNavigationTransition(i,"",Pt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation=null,this.currentTransition=null)}),Kt(s=>{if(this.destroyed)return i.resolve(!1),ze;if(o=!0,kb(s))this.events.next(new tn(i.id,this.urlSerializer.serialize(i.extractedUrl),s.message,s.cancellationCode)),YR(s)?this.events.next(new Lo(s.url,s.navigationBehaviorOptions)):i.resolve(!1);else{let a=new li(i.id,this.urlSerializer.serialize(i.extractedUrl),s,i.targetSnapshot??void 0);try{let l=gn(this.environmentInjector,()=>this.navigationErrorHandler?.(a));if(l instanceof Oo){let{message:c,cancellationCode:u}=iu(this.urlSerializer,l);this.events.next(new tn(i.id,this.urlSerializer.serialize(i.extractedUrl),c,u)),this.events.next(new Lo(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(a),s}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return ze}))}))}cancelNavigationTransition(n,i,r){let o=new tn(n.id,this.urlSerializer.serialize(n.extractedUrl),i,r);this.events.next(o),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return n.toString()!==i?.toString()&&!this.currentNavigation?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function UN(t){return t!==zc}var Zb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(VN),providedIn:"root"})}return t})(),ou=class{shouldDetach(e){return!1}store(e,n){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,n){return e.routeConfig===n.routeConfig}},VN=(()=>{class t extends ou{static \u0275fac=(()=>{let n;return function(r){return(n||(n=rr(t)))(r||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Kb=(()=>{class t{urlSerializer=w(ga);options=w(_a,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=w(Io);urlHandlingStrategy=w(lu);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new zn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:i,targetBrowserUrl:r}){let o=n!==void 0?this.urlHandlingStrategy.merge(n,i):i,s=r??o;return s instanceof zn?this.urlSerializer.serialize(s):s}commitTransition({targetRouterState:n,finalUrl:i,initialUrl:r}){i&&n?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=n):this.rawUrlTree=r}routerState=Rb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:()=>w(BN),providedIn:"root"})}return t})(),BN=(()=>{class t extends Kb{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{n(i.url,i.state,"popstate")})})}handleRouterEvent(n,i){n instanceof Hn?this.updateStateMemento():n instanceof ai?this.commitTransition(i):n instanceof Ti?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof ca?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof tn&&(n.code===Pt.GuardRejected||n.code===Pt.NoDataFromResolver)?this.restoreHistory(i):n instanceof li?this.restoreHistory(i,!0):n instanceof Lt&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,{extras:i,id:r}){let{replaceUrl:o,state:s}=i;if(this.location.isCurrentPathEqualTo(n)||o){let a=this.browserPageId,l=y(y({},s),this.generateNgRouterState(r,a));this.location.replaceState(n,"",l)}else{let a=y(y({},s),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(n,"",a)}}restoreHistory(n,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===n.finalUrl&&o===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,i){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:i}:{navigationId:n}}static \u0275fac=(()=>{let n;return function(r){return(n||(n=rr(t)))(r||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Zp(t,e){t.events.pipe(pe(n=>n instanceof Lt||n instanceof tn||n instanceof li||n instanceof ai),G(n=>n instanceof Lt||n instanceof ai?0:(n instanceof tn?n.code===Pt.Redirect||n.code===Pt.SupersededByNewNavigation:!1)?2:1),pe(n=>n!==2),qe(1)).subscribe(()=>{e()})}var zN={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},HN={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},qt=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=w(ap);stateManager=w(Kb);options=w(_a,{optional:!0})||{};pendingTasks=w(go);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=w(Yb);urlSerializer=w(ga);location=w(Io);urlHandlingStrategy=w(lu);_events=new Ie;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=w(Zb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=w(xa,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!w(su,{optional:!0});constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}eventsSubscription=new We;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=this.navigationTransitions.currentNavigation;if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof tn&&i.code!==Pt.Redirect&&i.code!==Pt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Lt)this.navigated=!0;else if(i instanceof Lo){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=y({browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||UN(r.source)},s);this.scheduleNavigation(a,zc,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}jN(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortSubject.next(r)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),zc,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,i,r)=>{this.navigateToSyncWithBrowser(n,r,i)})}navigateToSyncWithBrowser(n,i,r){let o={replaceUrl:!0},s=r?.navigationId?r:null;if(r){let l=y({},r);delete l.navigationId,delete l.\u0275routerPageId,Object.keys(l).length!==0&&(o.state=l)}let a=this.parseUrl(n);this.scheduleNavigation(a,i,s,o)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Xp),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=y(y({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let m=r?r.snapshot:this.routerState.snapshot.root;d=Tb(m)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return Ib(d,n,u,c??null)}navigateByUrl(n,i={skipLocationChange:!1}){let r=Ci(n)?n:this.parseUrl(n),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,zc,null,i)}navigate(n,i={skipLocationChange:!1}){return GN(n),this.navigateByUrl(this.createUrlTree(n,i),i)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,i){let r;if(i===!0?r=y({},zN):i===!1?r=y({},HN):r=i,Ci(n))return lb(this.currentUrlTree,n,r);let o=this.parseUrl(n);return lb(this.currentUrlTree,o,r)}removeEmptyProps(n){return Object.entries(n).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(n,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((d,m)=>{a=d,l=m});let u=this.pendingTasks.add();return Zp(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(d=>Promise.reject(d))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function GN(t){for(let e=0;e<t.length;e++)if(t[e]==null)throw new z(4008,!1)}function jN(t){return!(t instanceof ca)&&!(t instanceof Lo)}var Vo=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;href=null;target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new Ie;constructor(n,i,r,o,s,a){this.router=n,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area",this.isAnchorElement?this.subscription=n.events.subscribe(c=>{c instanceof Lt&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}routerLinkInput=null;set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Ci(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,i,r,o,s){let a=this.urlTree;if(a===null||this.isAnchorElement&&(n!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.href=n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n)):null;let i=this.href===null?null:A_(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",i)}applyAttributeValue(n,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,n,i):r.removeAttribute(o,n)}get urlTree(){return this.routerLinkInput===null?null:Ci(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(i){return new(i||t)(kn(qt),kn(ci),Ph("tabindex"),kn(np),kn(or),kn(To))};static \u0275dir=$s({type:t,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(i,r){i&1&&C("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&se("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",Ic],skipLocationChange:[2,"skipLocationChange","skipLocationChange",Ic],replaceUrl:[2,"replaceUrl","replaceUrl",Ic],routerLink:"routerLink"},features:[ir]})}return t})();var $N=new A("");function Kp(t,...e){return At([{provide:xa,multi:!0,useValue:t},[],{provide:ci,useFactory:qN,deps:[qt]},{provide:lp,multi:!0,useFactory:XN},e.map(n=>n.\u0275providers)])}function qN(t){return t.routerState.root}function XN(){let t=w(yt);return e=>{let n=t.get(Si);if(e!==n.components[0])return;let i=t.get(qt),r=t.get(YN);t.get(ZN)===1&&i.initialNavigation(),t.get(KN,null,re.Optional)?.setUpPreloading(),t.get($N,null,re.Optional)?.init(),i.resetRootComponentType(n.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var YN=new A("",{factory:()=>new Ie}),ZN=new A("",{providedIn:"root",factory:()=>1});var KN=new A("");function ve(t,e){let n=!e?.manualCleanup;n&&!e?.injector&&_h(ve);let i=n?e?.injector?.get(Fn)??w(Fn):null,r=QN(e?.equal),o;e?.requireSync?o=Oe({kind:0},{equal:r}):o=Oe({kind:1,value:e?.initialValue},{equal:r});let s,a=t.subscribe({next:l=>o.set({kind:1,value:l}),error:l=>{if(e?.rejectErrors)throw l;o.set({kind:2,error:l})},complete:()=>{s?.()}});if(e?.requireSync&&o().kind===0)throw new z(601,!1);return s=i?.onDestroy(a.unsubscribe.bind(a)),bt(()=>{let l=o();switch(l.kind){case 1:return l.value;case 2:throw l.error;case 0:throw new z(601,!1)}},{equal:e?.equal})}function QN(t=Object.is){return(e,n)=>e.kind===1&&n.kind===1&&t(e.value,n.value)}var tm={};function ui(t,e){if(tm[t]=(tm[t]||0)+1,typeof e=="function")return Jp(t,(...i)=>M(y({},e(...i)),{type:t}));switch(e?e._as:"empty"){case"empty":return Jp(t,()=>({type:t}));case"props":return Jp(t,i=>M(y({},i),{type:t}));default:throw new Error("Unexpected config.")}}function ee(){return{_as:"props",_p:void 0}}function Jp(t,e){return Object.defineProperty(e,"type",{value:t,writable:!1})}function eP(t){return t.charAt(0).toUpperCase()+t.substring(1)}function tP(t){return t.charAt(0).toLowerCase()+t.substring(1)}function nP(t,e){if(t==null)throw new Error(`${e} must be defined.`)}function hS(t){let{source:e,events:n}=t;return Object.keys(n).reduce((i,r)=>M(y({},i),{[iP(r)]:ui(rP(e,r),n[r])}),{})}function Je(){return ee()}function iP(t){return t.trim().split(" ").map((e,n)=>n===0?tP(e):eP(e)).join("")}function rP(t,e){return`[${t}] ${e}`}var Sa="@ngrx/store/init",Gn=(()=>{class t extends $e{constructor(){super({type:Sa})}next(n){if(typeof n=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof n>"u")throw new TypeError("Actions must be objects");if(typeof n.type>"u")throw new TypeError("Actions must have a type property");super.next(n)}complete(){}ngOnDestroy(){super.complete()}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),oP=[Gn],pS=new A("@ngrx/store Internal Root Guard"),Jb=new A("@ngrx/store Internal Initial State"),wa=new A("@ngrx/store Initial State"),mS=new A("@ngrx/store Reducer Factory"),Qb=new A("@ngrx/store Internal Reducer Factory Provider"),gS=new A("@ngrx/store Initial Reducers"),Qp=new A("@ngrx/store Internal Initial Reducers"),eS=new A("@ngrx/store Store Features"),tS=new A("@ngrx/store Internal Store Reducers"),em=new A("@ngrx/store Internal Feature Reducers"),nS=new A("@ngrx/store Internal Feature Configs"),vS=new A("@ngrx/store Internal Store Features"),iS=new A("@ngrx/store Internal Feature Reducers Token"),yS=new A("@ngrx/store Feature Reducers"),rS=new A("@ngrx/store User Provided Meta Reducers"),cu=new A("@ngrx/store Meta Reducers"),oS=new A("@ngrx/store Internal Resolved Meta Reducers"),sS=new A("@ngrx/store User Runtime Checks Config"),aS=new A("@ngrx/store Internal User Runtime Checks Config"),pr=new A("@ngrx/store Internal Runtime Checks"),om=new A("@ngrx/store Check if Action types are unique"),ba=new A("@ngrx/store Root Store Provider"),uu=new A("@ngrx/store Feature State Provider");function sm(t,e={}){let n=Object.keys(t),i={};for(let o=0;o<n.length;o++){let s=n[o];typeof t[s]=="function"&&(i[s]=t[s])}let r=Object.keys(i);return function(s,a){s=s===void 0?e:s;let l=!1,c={};for(let u=0;u<r.length;u++){let d=r[u],m=i[d],f=s[d],v=m(f,a);c[d]=v,l=l||v!==f}return l?c:s}}function sP(t,e){return Object.keys(t).filter(n=>n!==e).reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{})}function _S(...t){return function(e){if(t.length===0)return e;let n=t[t.length-1];return t.slice(0,-1).reduceRight((r,o)=>o(r),n(e))}}function xS(t,e){return Array.isArray(e)&&e.length>0&&(t=_S.apply(null,[...e,t])),(n,i)=>{let r=t(n);return(o,s)=>(o=o===void 0?i:o,r(o,s))}}function aP(t){let e=Array.isArray(t)&&t.length>0?_S(...t):n=>n;return(n,i)=>(n=e(n),(r,o)=>(r=r===void 0?i:r,n(r,o)))}var mr=class extends le{},Bo=class extends Gn{},fu="@ngrx/store/update-reducers",du=(()=>{class t extends $e{get currentReducers(){return this.reducers}constructor(n,i,r,o){super(o(r,i)),this.dispatcher=n,this.initialState=i,this.reducers=r,this.reducerFactory=o}addFeature(n){this.addFeatures([n])}addFeatures(n){let i=n.reduce((r,{reducers:o,reducerFactory:s,metaReducers:a,initialState:l,key:c})=>{let u=typeof o=="function"?aP(a)(o,l):xS(s,a)(o,l);return r[c]=u,r},{});this.addReducers(i)}removeFeature(n){this.removeFeatures([n])}removeFeatures(n){this.removeReducers(n.map(i=>i.key))}addReducer(n,i){this.addReducers({[n]:i})}addReducers(n){this.reducers=y(y({},this.reducers),n),this.updateReducers(Object.keys(n))}removeReducer(n){this.removeReducers([n])}removeReducers(n){n.forEach(i=>{this.reducers=sP(this.reducers,i)}),this.updateReducers(n)}updateReducers(n){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:fu,features:n})}ngOnDestroy(){this.complete()}static{this.\u0275fac=function(i){return new(i||t)(L(Bo),L(wa),L(gS),L(mS))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),lP=[du,{provide:mr,useExisting:du},{provide:Bo,useExisting:Gn}],gr=(()=>{class t extends Ie{ngOnDestroy(){this.complete()}static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=rr(t)))(r||t)}})()}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),cP=[gr],zo=class extends le{},lS=(()=>{class t extends $e{static{this.INIT=Sa}constructor(n,i,r,o){super(o);let a=n.pipe(un(_s)).pipe(Ue(i)),l={state:o},c=a.pipe(Hi(uP,l));this.stateSubscription=c.subscribe(({state:u,action:d})=>{this.next(u),r.next(d)}),this.state=ve(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}static{this.\u0275fac=function(i){return new(i||t)(L(Gn),L(mr),L(gr),L(wa))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function uP(t={state:void 0},[e,n]){let{state:i}=t;return{state:n(i,e),action:e}}var dP=[lS,{provide:zo,useExisting:lS}],he=(()=>{class t extends le{constructor(n,i,r,o){super(),this.actionsObserver=i,this.reducerManager=r,this.injector=o,this.source=n,this.state=n.state}select(n,...i){return am.call(null,n,...i)(this)}selectSignal(n,i){return bt(()=>n(this.state()),i)}lift(n){let i=new t(this,this.actionsObserver,this.reducerManager);return i.operator=n,i}dispatch(n,i){if(typeof n=="function")return this.processDispatchFn(n,i);this.actionsObserver.next(n)}next(n){this.actionsObserver.next(n)}error(n){this.actionsObserver.error(n)}complete(){this.actionsObserver.complete()}addReducer(n,i){this.reducerManager.addReducer(n,i)}removeReducer(n){this.reducerManager.removeReducer(n)}processDispatchFn(n,i){nP(this.injector,"Store Injector");let r=i?.injector??hP()??this.injector;return Un(()=>{let o=n();Dc(()=>this.dispatch(o))},{injector:r})}static{this.\u0275fac=function(i){return new(i||t)(L(zo),L(Gn),L(du),L(yt))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),fP=[he];function am(t,e,...n){return function(r){let o;if(typeof t=="string"){let s=[e,...n].filter(Boolean);o=r.pipe(qd(t,...s))}else if(typeof t=="function")o=r.pipe(G(s=>t(s,e)));else throw new TypeError(`Unexpected type '${typeof t}' in select operator, expected 'string' or 'function'`);return o.pipe(jd())}}function hP(){try{return w(yt)}catch{return}}var lm="https://ngrx.io/guide/store/configuration/runtime-checks";function cS(t){return t===void 0}function uS(t){return t===null}function bS(t){return Array.isArray(t)}function pP(t){return typeof t=="string"}function mP(t){return typeof t=="boolean"}function gP(t){return typeof t=="number"}function SS(t){return typeof t=="object"&&t!==null}function vP(t){return SS(t)&&!bS(t)}function yP(t){if(!vP(t))return!1;let e=Object.getPrototypeOf(t);return e===Object.prototype||e===null}function nm(t){return typeof t=="function"}function _P(t){return nm(t)&&t.hasOwnProperty("\u0275cmp")}function xP(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var bP=!1;function cm(){return bP}function dS(t,e){return t===e}function SP(t,e,n){for(let i=0;i<t.length;i++)if(!n(t[i],e[i]))return!0;return!1}function wS(t,e=dS,n=dS){let i=null,r=null,o;function s(){i=null,r=null}function a(u=void 0){o={result:u}}function l(){o=void 0}function c(){if(o!==void 0)return o.result;if(!i)return r=t.apply(null,arguments),i=arguments,r;if(!SP(arguments,i,e))return r;let u=t.apply(null,arguments);return i=arguments,n(r,u)?r:(r=u,u)}return{memoized:c,reset:s,setResult:a,clearResult:l}}function te(...t){return MP(wS)(...t)}function wP(t,e,n,i){if(n===void 0){let o=e.map(s=>s(t));return i.memoized.apply(null,o)}let r=e.map(o=>o(t,n));return i.memoized.apply(null,[...r,n])}function MP(t,e={stateFn:wP}){return function(...n){let i=n;if(Array.isArray(i[0])){let[u,...d]=i;i=[...u,...d]}else i.length===1&&EP(i[0])&&(i=CP(i[0]));let r=i.slice(0,i.length-1),o=i[i.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),a=t(function(...u){return o.apply(null,u)}),l=wS(function(u,d){return e.stateFn.apply(null,[u,r,d,a])});function c(){l.reset(),a.reset(),s.forEach(u=>u.release())}return Object.assign(l.memoized,{release:c,projector:a.memoized,setResult:l.setResult,clearResult:l.clearResult})}}function um(t){return te(e=>{let n=e[t];return!cm()&&sr()&&!(t in e)&&console.warn(`@ngrx/store: The feature name "${t}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${t}', ...) or StoreModule.forFeature('${t}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),n},e=>e)}function EP(t){return!!t&&typeof t=="object"&&Object.values(t).every(e=>typeof e=="function")}function CP(t){let e=Object.values(t),n=Object.keys(t),i=(...r)=>n.reduce((o,s,a)=>M(y({},o),{[s]:r[a]}),{});return[...e,i]}function TP(t){return t instanceof A?w(t):t}function IP(t,e){return e.map((n,i)=>{if(t[i]instanceof A){let r=w(t[i]);return{key:n.key,reducerFactory:r.reducerFactory?r.reducerFactory:sm,metaReducers:r.metaReducers?r.metaReducers:[],initialState:r.initialState}}return n})}function DP(t){return t.map(e=>e instanceof A?w(e):e)}function MS(t){return typeof t=="function"?t():t}function AP(t,e){return t.concat(e)}function RP(){if(w(he,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function NP(t,e){return function(n,i){let r=e.action(i)?im(i):i,o=t(n,r);return e.state()?im(o):o}}function im(t){Object.freeze(t);let e=nm(t);return Object.getOwnPropertyNames(t).forEach(n=>{if(!n.startsWith("\u0275")&&xP(t,n)&&(!e||n!=="caller"&&n!=="callee"&&n!=="arguments")){let i=t[n];(SS(i)||nm(i))&&!Object.isFrozen(i)&&im(i)}}),t}function PP(t,e){return function(n,i){if(e.action(i)){let o=rm(i);fS(o,"action")}let r=t(n,i);if(e.state()){let o=rm(r);fS(o,"state")}return r}}function rm(t,e=[]){return(cS(t)||uS(t))&&e.length===0?{path:["root"],value:t}:Object.keys(t).reduce((i,r)=>{if(i)return i;let o=t[r];return _P(o)?i:cS(o)||uS(o)||gP(o)||mP(o)||pP(o)||bS(o)?!1:yP(o)?rm(o,[...e,r]):{path:[...e,r],value:o}},!1)}function fS(t,e){if(t===!1)return;let n=t.path.join("."),i=new Error(`Detected unserializable ${e} at "${n}". ${lm}#strict${e}serializability`);throw i.value=t.value,i.unserializablePath=n,i}function LP(t,e){return function(n,i){if(e.action(i)&&!Ae.isInAngularZone())throw new Error(`Action '${i.type}' running outside NgZone. ${lm}#strictactionwithinngzone`);return t(n,i)}}function OP(t){return sr()?y({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},t):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function FP({strictActionSerializability:t,strictStateSerializability:e}){return n=>t||e?PP(n,{action:i=>t&&!dm(i),state:()=>e}):n}function kP({strictActionImmutability:t,strictStateImmutability:e}){return n=>t||e?NP(n,{action:i=>t&&!dm(i),state:()=>e}):n}function dm(t){return t.type.startsWith("@ngrx")}function UP({strictActionWithinNgZone:t}){return e=>t?LP(e,{action:n=>t&&!dm(n)}):e}function VP(t){return[{provide:aS,useValue:t},{provide:sS,useFactory:BP,deps:[aS]},{provide:pr,deps:[sS],useFactory:OP},{provide:cu,multi:!0,deps:[pr],useFactory:kP},{provide:cu,multi:!0,deps:[pr],useFactory:FP},{provide:cu,multi:!0,deps:[pr],useFactory:UP}]}function ES(){return[{provide:om,multi:!0,deps:[pr],useFactory:zP}]}function BP(t){return t}function zP(t){if(!t.strictActionTypeUniqueness)return;let e=Object.entries(tm).filter(([,n])=>n>1).map(([n])=>n);if(e.length)throw new Error(`Action types are registered more than once, ${e.map(n=>`"${n}"`).join(", ")}. ${lm}#strictactiontypeuniqueness`)}function fm(t,e,n={}){return At([...qP(t,e,n),$P])}function HP(t={},e={}){return[{provide:pS,useFactory:RP},{provide:Jb,useValue:e.initialState},{provide:wa,useFactory:MS,deps:[Jb]},{provide:Qp,useValue:t},{provide:tS,useExisting:t instanceof A?t:Qp},{provide:gS,deps:[Qp,[new ph(tS)]],useFactory:TP},{provide:rS,useValue:e.metaReducers?e.metaReducers:[]},{provide:oS,deps:[cu,rS],useFactory:AP},{provide:Qb,useValue:e.reducerFactory?e.reducerFactory:sm},{provide:mS,deps:[Qb,oS],useFactory:xS},oP,lP,cP,dP,fP,VP(e.runtimeChecks),ES()]}function GP(){w(Gn),w(mr),w(gr),w(he),w(pS,{optional:!0}),w(om,{optional:!0})}var jP=[{provide:ba,useFactory:GP},tr(()=>w(ba))];function CS(t,e){return At([...HP(t,e),jP])}function WP(){w(ba);let t=w(vS),e=w(yS),n=w(du);w(om,{optional:!0});let i=t.map((r,o)=>{let a=e.shift()[o];return M(y({},r),{reducers:a,initialState:MS(r.initialState)})});n.addFeatures(i)}var $P=[{provide:uu,useFactory:WP},tr(()=>w(uu))];function qP(t,e,n={}){return[{provide:nS,multi:!0,useValue:t instanceof Object?{}:n},{provide:eS,multi:!0,useValue:{key:t instanceof Object?t.name:t,reducerFactory:!(n instanceof A)&&n.reducerFactory?n.reducerFactory:sm,metaReducers:!(n instanceof A)&&n.metaReducers?n.metaReducers:[],initialState:!(n instanceof A)&&n.initialState?n.initialState:void 0}},{provide:vS,deps:[nS,eS],useFactory:IP},{provide:em,multi:!0,useValue:t instanceof Object?t.reducer:e},{provide:iS,multi:!0,useExisting:e instanceof A?e:em},{provide:yS,multi:!0,deps:[em,[new ph(iS)]],useFactory:DP},ES()]}function de(...t){let e=t.pop(),n=t.map(i=>i.type);return{reducer:e,types:n}}function TS(t,...e){let n=new Map;for(let i of e)for(let r of i.types){let o=n.get(r);if(o){let s=(a,l)=>i.reducer(o(a,l),l);n.set(r,s)}else n.set(r,i.reducer)}return function(i=t,r){let o=n.get(r.type);return o?o(i,r):i}}var S=hS({source:"Neuronal",events:{"Model Store Load Requested":Je(),"Model Store Hydrated":ee(),"Epoch Store Hydrated":ee(),"Active Model Id From Route Set":ee(),"Active Model Id Set":ee(),"Model Entry Upserted":ee(),"Epoch View Sync From Model":ee(),"Epoch History Cleared":ee(),"Training Started":ee(),"Training Epoch Appended":ee(),"Training Finished":ee(),"Training Stop Requested":Je(),"Training Pause Toggled":Je(),"Model Dropdown Set Open":ee(),"Last Train Metrics Reset":Je(),"New Model From List Requested":Je(),"New Model From Toolbar Requested":Je(),"Active Model From Toolbar Requested":ee(),"Ui Model Dropdown Toggle Requested":Je(),"Runtime Status Plain Set":ee(),"Runtime Kernel Caps Updated":ee(),"Train Hyperparams Patch":ee(),"Ui Train Start Requested":Je(),"Ui Export Bundle Requested":Je(),"Ui Save As Requested":Je(),"Ui Reset Requested":Je(),"Ui Infer Random Requested":Je(),"Ui Infer Draw Requested":Je(),"Ui Clear Draw Requested":Je(),"Ui Epoch Preset Requested":ee(),"Ui Epochs Input Changed":ee(),"Ui Batch Size Input Changed":ee(),"Ui Train Lr Input Changed":ee(),"Ui Train Viz Every Input Changed":ee(),"Ui Draw Pointer Down":ee(),"Ui Draw Pointer Move":ee(),"Ui Draw Pointer Up":Je(),"Ui Draw Pointer Cancel":Je(),"Ui Draw Pointer Leave":Je(),"Viz Input Layer Layout Changed":ee(),"Viz Input Layer Scale Changed":ee(),"Viz Hidden Layer Layout Changed":ee(),"Viz Hidden Layer Scale Changed":ee(),"Viz Active Neuron Max Scale Mul Changed":ee(),"Viz Scene Color Changed":ee(),"Viz Scene Colors Patch":ee(),"Viz Light Color Changed":ee(),"Viz Network Colors Patch":ee(),"Viz Post Process Patch":ee(),"Viz Vibe Camera Profile Changed":ee(),"Viz Vibe Camera Tuning Patch":ee(),"Ui Viz Immersive Toggled":Je(),"Daisy Ui App Theme Changed":ee(),"Viz 3d Colors Sync From Daisy Requested":Je(),"Viz 3d Color Preset Mode Changed":ee(),"Viz 3d Daisy Palette Applied":ee()}});var ce=um("neuronal");var pm=te(ce,t=>t.epochByModelId),IS=te(ce,t=>t.epochDisplayRows),XP=te(IS,t=>t),mm=te(ce,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(a=>a.id===e):null,i=e?t.epochByModelId[e]?.length??0:0,r=Math.max(n?.metrics.epochsTrained??0,i),o=t.epochDisplayRows,s=o.length===0?[]:[...o].slice(-200).reverse();return{epochsTotal:r,rows:s}});function Ma(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var Ho=te(ce,t=>t.modelCollection),vr=te(ce,t=>t.modelStoreHydrated),DS=te(ce,t=>{if(!t.modelStoreHydrated)return{name:"Modelle werden geladen \u2026",meta:""};if(t.modelCollection.models.length===0)return{name:"Kein Modell",meta:"Lege ein neues Modell an"};let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{name:n.name,meta:`Epoch ${n.metrics.epochsTrained} \xB7 Test-Genauigkeit ${Ma(n.metrics.testAcc)} \xB7 Fehlerrate ${Ma(n.metrics.errorRate)}`}:{name:"Modell w\xE4hlen",meta:""}}),AS=te(ce,t=>{if(!t.modelStoreHydrated)return{phase:"loading"};if(t.modelCollection.models.length===0)return{phase:"empty"};let e=t.modelCollection.activeModelId;return{phase:"list",items:t.modelCollection.models.map(i=>({id:i.id,name:i.name,epochValue:String(i.metrics.epochsTrained),accValue:Ma(i.metrics.testAcc),errValue:Ma(i.metrics.errorRate),active:i.id===e})),trainingRunning:t.training.running}}),RS=te(ce,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0),gm=te(ce,t=>t.modelCollection.activeModelId),vm=te(Ho,t=>{let e=t.activeModelId;if(!e)return null;let n=t.models.find(i=>i.id===e);return n?{title:n.name,subtitle:`MNIST \xB7 MLP \xB7 Test ${Ma(n.metrics.testAcc)} \xB7 Epoche ${n.metrics.epochsTrained}`}:null}),NS=te(ce,t=>t.modelDropdownOpen),ym=te(DS,AS,NS,RS,(t,e,n,i)=>({label:t,menu:e,dropdownOpen:n,dropdownDisabled:i}));var Go={lr:.02,batchSize:32,epochs:1,vizEveryNBatches:4};function _m(t,e,n,i){let r=Number.parseInt(t,10);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function YP(t,e,n,i){let r=Number.parseFloat(t);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function yr(t,e){let n=y(y({},t),e);return{epochs:_m(String(n.epochs),Go.epochs,1,200),lr:YP(String(n.lr),Go.lr,1e-4,1),batchSize:_m(String(n.batchSize),Go.batchSize,1,512),vizEveryNBatches:_m(String(n.vizEveryNBatches),Go.vizEveryNBatches,1,1e3)}}function PS(t,e){let n=e.batchSize,i=e.epochs,r=t;if(r<=0)return"Sobald Trainingsdaten geladen sind, erscheint hier die ungef\xE4hre Anzahl Gradientenschritte.";let o=Math.max(1,Math.ceil(r/n)),s=o*i;return`Bei Batchgr\xF6\xDFe ${n}: rund ${o} Schritte pro Epoche, etwa ${s} f\xFCr ${i} Epoche(n).`}var hu="MNIST";function LS(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function ZP(t){let e=new Date(t);return Number.isFinite(e.getTime())?e.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}var xm=te(ce,t=>t.runtimeStatusPlain),bm=te(ce,t=>{let e=t.runtimeKernelCaps.mnistTrainCount,n=t.runtimeKernelCaps.mnistTestCount;return e===0&&n===0?`${hu}: Train 0 \xB7 Test 0 \u2014 warten auf erfolgreichen Abruf (Statuszeile).`:e===0?`${hu}: Trainingsdaten fehlen \xB7 Test ${n}.`:n===0?`${hu}: Train ${e} \xB7 Testdaten fehlen.`:`${hu}: ${e} Train-Bilder \xB7 ${n} Test-Bilder bereit.`}),Sm=te(ce,t=>{if(!t.runtimeKernelCaps.hasNet)return"Noch kein Netz geladen";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?n.name:"Netz im Arbeitsspeicher"}),wm=te(ce,t=>{if(!t.runtimeKernelCaps.hasNet)return"Oben \u201AAktives Modell\u2018 w\xE4hlen \u2014 oder \u201ETraining starten\u201C ohne vorherigen Stand legt automatisch einen ersten Stand an.";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?`Test ${LS(n.metrics.testAcc)} \xB7 Fehlerquote ${LS(n.metrics.errorRate)} \xB7 ${n.metrics.epochsTrained} trainierte Epochen (Summe) \xB7 zuletzt ${ZP(n.updatedAt)}`:"Kein passender Eintrag in der Bibliothek gefunden."}),Mm=te(ce,t=>PS(t.runtimeKernelCaps.mnistTrainCount,t.trainHyperparams)),Em=te(ce,t=>t.trainHyperparams),KP=te(ce,t=>t.runtimeKernelCaps),Cm=te(ce,t=>{let e=t.training.running,n=t.runtimeKernelCaps.mnistTrainCount,i=t.runtimeKernelCaps.hasNet;return{trainDisabled:n<=0||e,pauseDisabled:!e,saveDisabled:!i||e,resetDisabled:!i||e,trainFormLocked:e}}),Tm=te(ce,t=>{let e=t.training.running,n=t.runtimeKernelCaps.hasNet,i=t.runtimeKernelCaps.mnistTestCount;return{inferRandomDisabled:!n||i<=0,carouselDisabled:!n||i<=0||e,inferDrawDisabled:!n}}),Im=te(ce,t=>t.training.running||!t.modelStoreHydrated);var JP=te(ce,t=>t.training),QP=te(ce,t=>t.lastTrainLoss),eL=te(ce,t=>t.lastTrainBatchAcc),tL=te(ce,t=>t.training.pause),nL=te(ce,t=>t.training.shouldStop),di=te(ce,t=>t.training.running),Dm=te(ce,t=>({running:t.training.running,pause:t.training.pause,lastTrainLoss:t.lastTrainLoss,lastTrainBatchAcc:t.lastTrainBatchAcc}));function iL(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var Am=te(ce,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{headline:n.name,detail:`${n.metrics.epochsTrained} Epochen gesamt \xB7 Test ${iL(n.metrics.testAcc)}`}:{headline:"Kein aktives Modell",detail:"Zuerst ein Modell w\xE4hlen oder anlegen."}});var Rm={followPath:"Pfad folgen",freeLook:"Frei bewegen"},Nm={random:"Zuf\xE4llige Farben",themeGradient:"Theme-Verlauf"},Pm={primary:"Primary",accent:"Accent",secondary:"Secondary",info:"Info"},Be={profileMode:"balanced",controlMode:"freeLook",speed:50,pullOut:.5,pathWildness:.5,pathTraverse:.45,lookWander:.5,pathQueueSize:100,maxSegmentChord:40,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16,pathHorizonRadiusScale:1,pathHorizonSpherePreview:!1,pathPreviewColorMode:"random",pathPreviewThemeColor:"primary"},OS={smooth:M(y({},Be),{speed:25,pullOut:.4,pathWildness:.2,pathTraverse:.15,lookWander:.3,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),balanced:M(y({},Be),{speed:50,pullOut:.5,pathWildness:.5,pathTraverse:.45,lookWander:.5,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),funky:M(y({},Be),{speed:55,pullOut:.52,pathWildness:.75,pathTraverse:.72,lookWander:.7,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.16}),rocket:M(y({},Be),{speed:100,pullOut:.38,pathWildness:.65,pathTraverse:.58,lookWander:.55,pathQueueSize:6,maxSegmentChord:14,pathPreview:!0,pathPreviewMarkers:!0,pathPreviewMarkerSize:.14})},Lm={smooth:"Ruhig",balanced:"Ausgewogen",funky:"Funky",rocket:"Rakete"},Om=.2,Fm=3;var pu=t=>t<0?0:t>1?1:t,rL=t=>Math.min(100,Math.max(0,t));var oL=1,sL=1e3,aL=2,lL=80;var cL=.04,uL=.8,dL=t=>Math.min(Fm,Math.max(Om,t)),fL=t=>Math.round(Math.min(sL,Math.max(oL,t))),hL=t=>Math.min(lL,Math.max(aL,t)),pL=t=>Math.min(uL,Math.max(cL,t));function St(t){let e=t??{},n=e.controlMode??Be.controlMode;return{profileMode:e.profileMode??Be.profileMode,controlMode:n==="freeLook"?"freeLook":"followPath",speed:rL(e.speed??Be.speed),pullOut:pu(e.pullOut??Be.pullOut),pathWildness:pu(e.pathWildness??Be.pathWildness),pathTraverse:pu(e.pathTraverse??Be.pathTraverse),lookWander:pu(e.lookWander??Be.lookWander),pathQueueSize:fL(e.pathQueueSize??Be.pathQueueSize),maxSegmentChord:hL(e.maxSegmentChord??Be.maxSegmentChord),pathPreview:e.pathPreview??Be.pathPreview,pathPreviewMarkers:e.pathPreviewMarkers??Be.pathPreviewMarkers,pathPreviewMarkerSize:pL(e.pathPreviewMarkerSize??Be.pathPreviewMarkerSize),pathHorizonRadiusScale:dL(e.pathHorizonRadiusScale??Be.pathHorizonRadiusScale),pathHorizonSpherePreview:e.pathHorizonSpherePreview??Be.pathHorizonSpherePreview,pathPreviewColorMode:e.pathPreviewColorMode==="themeGradient"?"themeGradient":Be.pathPreviewColorMode,pathPreviewThemeColor:e.pathPreviewThemeColor==="accent"||e.pathPreviewThemeColor==="secondary"||e.pathPreviewThemeColor==="info"?e.pathPreviewThemeColor:Be.pathPreviewThemeColor}}function mu(t){return St(y({profileMode:t},OS[t]))}function FS(t,e){let n=OS[t],i=.6,r=(o,s)=>Math.abs(o-s)<i;return e.controlMode===n.controlMode&&r(e.speed,n.speed)&&r(e.pullOut,n.pullOut)&&r(e.pathWildness,n.pathWildness)&&r(e.pathTraverse,n.pathTraverse)&&r(e.lookWander,n.lookWander)&&e.pathQueueSize===n.pathQueueSize&&r(e.maxSegmentChord,n.maxSegmentChord)&&e.pathPreview===n.pathPreview&&e.pathPreviewMarkers===n.pathPreviewMarkers&&r(e.pathPreviewMarkerSize,n.pathPreviewMarkerSize)&&r(e.pathHorizonRadiusScale,n.pathHorizonRadiusScale)&&e.pathHorizonSpherePreview===n.pathHorizonSpherePreview&&e.pathPreviewColorMode===n.pathPreviewColorMode&&e.pathPreviewThemeColor===n.pathPreviewThemeColor}var km=te(ce,t=>t.viz3d),Um=te(ce,t=>St(t.viz3d.vibeCamera)),Ea=te(ce,t=>t.vizImmersiveUi);var xn=te(ce,t=>t);var gu=class t{store=w(he);newModelDisabled=ve(this.store.select(Im),{requireSync:!0});newModel(){this.store.dispatch(S.newModelFromToolbarRequested())}exportJson(){this.store.dispatch(S.uiExportBundleRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-neuronal-model-bar"]],decls:6,vars:1,consts:[[1,"flex","min-w-0","flex-col","gap-1.5"],[1,"flex","min-w-0","flex-wrap","items-stretch","gap-2"],["id","btnNewModel","type","button",1,"btn","btn-accent","shrink-0",3,"click","disabled"],["id","btnExportJson","type","button",1,"btn","btn-outline","shrink-0",3,"click"]],template:function(n,i){n&1&&(h(0,"div",0)(1,"div",1)(2,"button",2),C("click",function(){return i.newModel()}),x(3," Neues Modell starten "),p(),h(4,"button",3),C("click",function(){return i.exportJson()}),x(5," JSON exportieren "),p()()()),n&2&&(_(2),R("disabled",i.newModelDisabled()))},encapsulation:2,changeDetection:0})};var kS="neuronal3d-daisyui-theme",_r="dark",Di=["light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","dim","nord","sunset","caramellatte","abyss","silk"];function Ai(t){return Di.includes(t)}function US(t){let e=t.document;try{let n=t.localStorage.getItem(kS);if(n&&Ai(n)){e.documentElement.setAttribute("data-theme",n);return}}catch{}e.documentElement.setAttribute("data-theme",_r)}function xr(t){let e=t.documentElement.getAttribute("data-theme")??_r;return Ai(e)?e:_r}function vu(t,e){t.documentElement.setAttribute("data-theme",e);try{localStorage.setItem(kS,e)}catch{}}function mL(t,e){if(t&1&&(h(0,"option",3),x(1),p()),t&2){let n=e.$implicit,i=E();R("value",n)("selected",n===i.currentTheme()),_(),Se(n)}}var yu=class t{doc=w(je);destroyRef=w(Fn);store=w(he);themes=Di;currentTheme=Oe(xr(this.doc));constructor(){let e=new MutationObserver(()=>{this.currentTheme.set(xr(this.doc))});e.observe(this.doc.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.destroyRef.onDestroy(()=>e.disconnect())}onThemePick(e){let i=e.target.value;Ai(i)&&(vu(this.doc,i),this.store.dispatch(S.daisyUiAppThemeChanged({theme:i})))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-theme-switcher"]],decls:6,vars:0,consts:[[1,"flex","flex-wrap","items-center","justify-end","gap-2"],[1,"text-[0.65rem]","font-semibold","uppercase","tracking-widest","opacity-70"],[1,"select","select-bordered","select-sm","max-w-[11.5rem]","text-sm",3,"change"],[3,"value","selected"]],template:function(n,i){n&1&&(h(0,"label",0)(1,"span",1),x(2,"Theme"),p(),h(3,"select",2),C("change",function(o){return i.onThemePick(o)}),Xe(4,mL,2,3,"option",3,wi),p()()),n&2&&(_(4),Ye(i.themes))},encapsulation:2,changeDetection:0})};var gL=(t,e)=>e.id;function vL(t,e){t&1&&(h(0,"option",5),x(1,"Modelle werden geladen \u2026"),p())}function yL(t,e){t&1&&(h(0,"option",5),x(1,"Keine Modelle vorhanden"),p())}function _L(t,e){t&1&&(h(0,"option",5),x(1,"Modell w\xE4hlen"),p())}function xL(t,e){if(t&1&&(h(0,"option",8),x(1),p()),t&2){let n=e.$implicit;R("value",n.id),_(),Ys(" ",n.name," \xB7 Ep. ",n.epochValue," \xB7 Test ",n.accValue," ")}}function bL(t,e){if(t&1&&(Ve(0,_L,2,0,"option",5),Xe(1,xL,2,4,"option",8,gL)),t&2){let n=E();He(n.activeModelId()?-1:0),_(),Ye(n.listMenuItems())}}var _u=class t{store=w(he);modelBar=ve(this.store.select(ym),{requireSync:!0});activeModelId=ve(this.store.select(gm),{initialValue:null});listMenuItems=bt(()=>{let e=this.modelBar().menu;return e.phase==="list"?e.items:[]});selectedModelIdValue(){return this.activeModelId()??""}onModelSelectChange(e){let i=e.target.value;i&&this.store.dispatch(S.activeModelFromToolbarRequested({id:i}))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-shell-header"]],decls:15,vars:3,consts:[[1,"border-base-200","bg-base-100","flex","flex-wrap","items-center","justify-between","gap-3","border-b","px-4","py-2","shadow-sm"],["aria-label","Brotkr\xFCmel",1,"breadcrumbs","text-sm","min-w-0","flex","flex-row","gap-3"],["routerLink","/",1,"link-hover","link","font-medium","text-2xl"],[1,"min-w-0","max-w-full","sm:max-w-md"],["aria-label","Aktives Modell",1,"select","select-bordered","w-full","min-w-40","max-w-full",3,"change","disabled","value"],["disabled","","value",""],[1,"justify-self-start"],[1,"flex","shrink-0","items-center","gap-2"],[3,"value"]],template:function(n,i){if(n&1&&(h(0,"header",0)(1,"nav",1)(2,"ul")(3,"li")(4,"a",2),x(5,"Modelle"),p()(),h(6,"li",3)(7,"select",4),C("change",function(o){return i.onModelSelectChange(o)}),Ve(8,vL,2,0,"option",5)(9,yL,2,0,"option",5)(10,bL,3,1),p()()(),h(11,"div",6),xe(12,"app-neuronal-model-bar"),p()(),h(13,"div",7),xe(14,"app-theme-switcher"),p()()),n&2){let r;_(7),R("disabled",i.modelBar().dropdownDisabled)("value",i.selectedModelIdValue()),_(),He((r=i.modelBar().menu.phase)==="loading"?8:r==="empty"?9:r==="list"?10:-1)}},dependencies:[Vo,yu,gu],encapsulation:2,changeDetection:0})};var xu=class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-shell"]],decls:4,vars:0,consts:[[1,"bg-base-100","text-base-content","flex","h-full","min-h-0","flex-col"],[1,"flex","min-h-0","flex-1","flex-col"]],template:function(n,i){n&1&&(h(0,"div",0),xe(1,"app-shell-header"),h(2,"div",1),xe(3,"router-outlet"),p()())},dependencies:[hr,_u],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"],changeDetection:0})};var SL={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},bu="__@ngrx/effects_create__";function we(t,e={}){let n=e.functional?t:t(),i=y(y({},SL),e);return Object.defineProperty(n,bu,{value:i}),n}function wL(t){return Object.getOwnPropertyNames(t).filter(i=>t[i]&&t[i].hasOwnProperty(bu)?t[i][bu].hasOwnProperty("dispatch"):!1).map(i=>{let r=t[i][bu];return y({propertyName:i},r)})}function ML(t){return wL(t)}function VS(t){return Object.getPrototypeOf(t)}function EL(t){return!!t.constructor&&t.constructor.name!=="Object"&&t.constructor.name!=="Function"}function BS(t){return typeof t=="function"}function CL(t){return t.filter(BS)}function TL(t,e,n){let i=VS(t),o=!!i&&i.constructor.name!=="Object"?i.constructor.name:null,s=ML(t).map(({propertyName:a,dispatch:l,useEffectsErrorHandler:c})=>{let u=typeof t[a]=="function"?t[a]():t[a],d=c?n(u,e):u;return l===!1?d.pipe(Hd()):d.pipe($d()).pipe(G(f=>({effect:t[a],notification:f,propertyName:a,sourceName:o,sourceInstance:t})))});return Bi(...s)}var IL=10;function zS(t,e,n=IL){return t.pipe(Kt(i=>(e&&e.handleError(i),n<=1?t:zS(t,e,n-1))))}var Su=(()=>{class t extends le{constructor(n){super(),n&&(this.source=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}static{this.\u0275fac=function(i){return new(i||t)(L(gr))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function Me(...t){return pe(e=>t.some(n=>typeof n=="string"?n===e.type:n.type===e.type))}var i9=new A("@ngrx/effects Internal Root Guard"),r9=new A("@ngrx/effects User Provided Effects"),o9=new A("@ngrx/effects Internal Root Effects"),s9=new A("@ngrx/effects Internal Root Effects Instances"),a9=new A("@ngrx/effects Internal Feature Effects"),l9=new A("@ngrx/effects Internal Feature Effects Instance Groups"),DL=new A("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>zS}),AL="@ngrx/effects/init",RL=ui(AL);function NL(t,e){if(t.notification.kind==="N"){let n=t.notification.value;!PL(n)&&e.handleError(new Error(`Effect ${LL(t)} dispatched an invalid action: ${OL(n)}`))}}function PL(t){return typeof t!="function"&&t&&t.type&&typeof t.type=="string"}function LL({propertyName:t,sourceInstance:e,sourceName:n}){let i=typeof e[t]=="function";return!!n?`"${n}.${String(t)}${i?"()":""}"`:`"${String(t)}()"`}function OL(t){try{return JSON.stringify(t)}catch{return t}}var FL="ngrxOnIdentifyEffects";function kL(t){return Vm(t,FL)}var UL="ngrxOnRunEffects";function VL(t){return Vm(t,UL)}var BL="ngrxOnInitEffects";function zL(t){return Vm(t,BL)}function Vm(t,e){return t&&e in t&&typeof t[e]=="function"}var HS=(()=>{class t extends Ie{constructor(n,i){super(),this.errorHandler=n,this.effectsErrorHandler=i}addEffects(n){this.next(n)}toActions(){return this.pipe(El(n=>EL(n)?VS(n):n),ke(n=>n.pipe(El(HL))),ke(n=>{let i=n.pipe(zi(o=>GL(this.errorHandler,this.effectsErrorHandler)(o)),G(o=>(NL(o,this.errorHandler),o.notification)),pe(o=>o.kind==="N"&&o.value!=null),Gd()),r=n.pipe(qe(1),pe(zL),G(o=>o.ngrxOnInitEffects()));return Bi(i,r)}))}static{this.\u0275fac=function(i){return new(i||t)(L(_t),L(DL))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function HL(t){return kL(t)?t.ngrxOnIdentifyEffects():""}function GL(t,e){return n=>{let i=TL(n,t,e);return VL(n)?n.ngrxOnRunEffects(i):i}}var jL=(()=>{class t{get isStarted(){return!!this.effectsSubscription}constructor(n,i){this.effectSources=n,this.store=i,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}static{this.\u0275fac=function(i){return new(i||t)(L(HS),L(he))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function GS(...t){let e=t.flat(),n=CL(e);return At([n,tr(()=>{w(ba),w(uu,{optional:!0});let i=w(jL),r=w(HS),o=!i.isStarted;o&&i.start();for(let s of e){let a=BS(s)?w(s):s;r.addEffects(a)}o&&w(he).dispatch(RL())})])}function wt(t,e){let n=[];for(let i=0;i<t;i++){let r=new Array(e).fill(0);n.push(r)}return n}function Ca(t){let e=wt(t.length,1);for(let n=0;n<t.length;n++)e[n][0]=t[n];return e}function Ta(t,e){let n=t.length,i=t[0].length,r=e.length,o=e[0].length;if(i!==r)throw new Error("matMul shape");let s=wt(n,o);for(let a=0;a<n;a++)for(let l=0;l<i;l++){let c=t[a][l];for(let u=0;u<o;u++)s[a][u]+=c*e[l][u]}return s}function Bm(t,e){let n=wt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]*e;return n}function wu(t){let e=wt(t[0].length,t.length);for(let n=0;n<t.length;n++)for(let i=0;i<t[0].length;i++)e[i][n]=t[n][i];return e}function zm(t,e,n){let i=Ta(e,t);for(let r=0;r<i.length;r++){let o=n[r][0];for(let s=0;s<i[0].length;s++)i[r][s]+=o}return i}function Hm(t){let e=wt(t.length,1);for(let n=0;n<t.length;n++){let i=0;for(let r=0;r<t[0].length;r++)i+=t[n][r];e[n][0]=i}return e}function Gm(t,e){let n=new Array(t.length);for(let i=0;i<t.length;i++)n[i]=t[i][e];return n}function jm(t,e,n){for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++){let o=Number.isFinite(e[i][r])?e[i][r]:0,s=Math.max(-100,Math.min(100,o)),a=t[i][r]-n*s;Number.isFinite(a)&&(t[i][r]=Math.max(-1e4,Math.min(1e4,a)))}}function jS(t,e,n){let i=wt(t,e);for(let r=0;r<t;r++)for(let o=0;o<e;o++)i[r][o]=WL()*n;return i}function WL(){let t=0,e=0;for(;t===0;)t=Math.random();for(;e===0;)e=Math.random();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*e)}function WS(t,e=.01){let n=wt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?t[i][r]:e*t[i][r];return n}function $S(t,e=.01){let n=wt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?1:e;return n}function qS(t){let e=t.length,n=t[0].length,i=wt(e,n);for(let r=0;r<n;r++){let o=-1/0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0;c>o&&(o=c)}Number.isFinite(o)||(o=0);let s=new Array(e),a=0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0,u=Math.max(-60,Math.min(60,c-o)),d=Math.exp(u);s[l]=d,a+=d}if(!Number.isFinite(a)||a<=0){let l=1/Math.max(1,e);for(let c=0;c<e;c++)i[c][r]=l}else for(let l=0;l<e;l++)i[l][r]=s[l]/a}return i}function XS(t,e){let n=wt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]-e[i][r];return n}var fi=class{inputDim;hidden;outputDim;weights;biases;constructor(e,n,i){this.inputDim=e,this.hidden=[...n],this.outputDim=i;let r=[e,...n,i];this.weights=[],this.biases=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],l=Math.sqrt(2/Math.max(1,s));this.weights.push(jS(a,s,l)),this.biases.push(wt(a,1))}}forward(e){let n=[],i=e;for(let a=0;a<this.weights.length-1;a++){let l=zm(i,this.weights[a],this.biases[a]),c=WS(l);n.push({z:l,a:c}),i=c}let r=this.weights.length-1,o=zm(i,this.weights[r],this.biases[r]),s=qS(o);return n.push({z:o,a:s}),{layers:n,logits:o,prob:s}}crossEntropyLoss(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)for(let s=0;s<e.length;s++){let a=Math.max(e[s][o],1e-12);r-=n[s][o]*Math.log(a)}return r/i}backward(e,n,i){let r=this.weights.map(c=>wt(c.length,c[0].length)),o=this.biases.map(c=>wt(c.length,c[0].length)),s=this.weights.length-1,a=XS(i.prob,n),l=s===0?e:i.layers[s-1].a;r[s]=Ta(a,wu(l)),o[s]=Hm(a);for(let c=s-1;c>=0;c--){a=Ta(wu(this.weights[c+1]),a);let u=$S(i.layers[c].z);for(let d=0;d<a.length;d++)for(let m=0;m<a[0].length;m++)a[d][m]*=u[d][m];l=c===0?e:i.layers[c-1].a,r[c]=Ta(a,wu(l)),o[c]=Hm(a)}return{dW:r,db:o}}applyGradients(e,n,i,r){let o=1/r;for(let s=0;s<this.weights.length;s++)jm(this.weights[s],Bm(e[s],o),i),jm(this.biases[s],Bm(n[s],o),i)}predictClass(e,n=0){let i=0,r=e[0][n];for(let o=1;o<e.length;o++){let s=e[o][n];s>r&&(r=s,i=o)}return i}countCorrectInBatch(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)this.predictClass(e,o)===n[o]&&(r+=1);return r}};function YS(t,e,n=0){let i=[Gm(t,n)];for(let r of e.layers)i.push(Gm(r.a,n));return i}var br=[64,32],Mu=784,Eu=10;function $L(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}function qL(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function Cu(){let t=new fi(Mu,[...br],Eu),e=new Date().toISOString();return{id:crypto.randomUUID(),name:$L(),createdAt:e,updatedAt:e,model:qL(t),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}}var XL="neuronal3d:epochTrack:v1";function ZS(){try{localStorage.removeItem(XL)}catch{}}var YL="neuronal3d";var ot="models",Qe="epochTracks",Ot="meta",Ia="activeModelId",KS="dataRevision";var Tu=null;function ZL(t){return Z(this,null,function*(){let n=t.transaction(Ot,"readonly").objectStore(Ot),i=yield De(n.get(KS));if(i?.value==null||i.value==="")return 0;let r=Number(i.value);return Number.isFinite(r)?r:0})}function JS(){return Z(this,null,function*(){let t=yield st();if((yield ZL(t))===2)return;let n=t.transaction([ot,Qe,Ot],"readwrite");yield De(n.objectStore(ot).clear()),yield De(n.objectStore(Qe).clear());let i=n.objectStore(Ot);yield De(i.clear()),yield De(i.put({key:Ia,value:null})),yield De(i.put({key:KS,value:String(2)})),yield Sr(n)})}function st(){return Tu||(Tu=new Promise((t,e)=>{let n=indexedDB.open(YL,4);n.onerror=()=>e(n.error??new Error("IndexedDB open failed")),n.onsuccess=()=>{let i=n.result;i.onversionchange=()=>{i.close(),Tu=null},t(i)},n.onupgradeneeded=i=>{let r=n.result;if(i.oldVersion<4)for(let o of[ot,Qe,Ot])r.objectStoreNames.contains(o)&&r.deleteObjectStore(o);r.objectStoreNames.contains(ot)||r.createObjectStore(ot,{keyPath:"id"}),r.objectStoreNames.contains(Qe)||r.createObjectStore(Qe,{keyPath:"modelId"}),r.objectStoreNames.contains(Ot)||r.createObjectStore(Ot,{keyPath:"key"})}})),Tu}function De(t){return new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function Sr(t){return new Promise((e,n)=>{t.addEventListener("complete",()=>e()),t.addEventListener("error",()=>n(t.error??new Error("IndexedDB transaction failed"))),t.addEventListener("abort",()=>n(t.error??new Error("IndexedDB transaction aborted")))})}var wr=class t{getEpochsForModel(e){return Z(this,null,function*(){let r=(yield st()).transaction(Qe,"readonly").objectStore(Qe);return(yield De(r.get(e)))?.rows??[]})}setEpochsForModel(e,n){return Z(this,null,function*(){let r=(yield st()).transaction(Qe,"readwrite"),o=r.objectStore(Qe);yield De(o.put({modelId:e,rows:n})),yield Sr(r)})}appendEpoch(e,n){return Z(this,null,function*(){let i=yield this.getEpochsForModel(e);i.push(n);let r=i.slice(-500);yield this.setEpochsForModel(e,r)})}deleteEpochTrack(e){return Z(this,null,function*(){let i=(yield st()).transaction(Qe,"readwrite"),r=i.objectStore(Qe);yield De(r.delete(e)),yield Sr(i)})}listModelIdsWithEpochTracks(){return Z(this,null,function*(){let i=(yield st()).transaction(Qe,"readonly").objectStore(Qe);return(yield De(i.getAllKeys())).map(o=>String(o))})}epochTrackCount(){return Z(this,null,function*(){let i=(yield st()).transaction(Qe,"readonly").objectStore(Qe);return De(i.count())})}loadEpochStore(){return Z(this,null,function*(){let i=(yield st()).transaction(Qe,"readonly").objectStore(Qe),r=yield De(i.getAll()),o={};for(let s of r)o[s.modelId]=[...s.rows];return{version:1,byModelId:o}})}saveEpochStore(e){return Z(this,null,function*(){let i=(yield st()).transaction(Qe,"readwrite"),r=i.objectStore(Qe),o=yield De(r.getAllKeys()),s=new Set(Object.keys(e.byModelId));for(let a of o){let l=String(a);s.has(l)||(yield De(r.delete(a)))}for(let[a,l]of Object.entries(e.byModelId))yield De(r.put({modelId:a,rows:l}));yield Sr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};var hi=class t{listModels(){return Z(this,null,function*(){let i=(yield st()).transaction(ot,"readonly").objectStore(ot);return De(i.getAll())})}getModel(e){return Z(this,null,function*(){let r=(yield st()).transaction(ot,"readonly").objectStore(ot);return(yield De(r.get(e)))??void 0})}upsertModel(e){return Z(this,null,function*(){let r=(yield st()).transaction(ot,"readwrite").objectStore(ot);yield De(r.put(e))})}deleteModel(e){return Z(this,null,function*(){let r=(yield st()).transaction(ot,"readwrite").objectStore(ot);yield De(r.delete(e))})}modelCount(){return Z(this,null,function*(){let i=(yield st()).transaction(ot,"readonly").objectStore(ot);return De(i.count())})}getActiveModelId(){return Z(this,null,function*(){let i=(yield st()).transaction(Ot,"readonly").objectStore(Ot);return(yield De(i.get(Ia)))?.value??null})}setActiveModelId(e){return Z(this,null,function*(){let r=(yield st()).transaction(Ot,"readwrite").objectStore(Ot);yield De(r.put({key:Ia,value:e}))})}loadCollection(){return Z(this,null,function*(){let[e,n]=yield Promise.all([this.listModels(),this.getActiveModelId()]);return{version:3,activeModelId:n,models:e}})}saveCollection(e){return Z(this,null,function*(){let i=(yield st()).transaction([ot,Ot],"readwrite"),r=i.objectStore(ot),o=i.objectStore(Ot),s=yield De(r.getAllKeys()),a=new Set(e.models.map(l=>l.id));for(let l of s){let c=String(l);a.has(c)||(yield De(r.delete(l)))}for(let l of e.models)yield De(r.put(l));yield De(o.put({key:Ia,value:e.activeModelId})),yield Sr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};var jo={backgroundFog:"#2a3140",floor:"#3d4658",floorVisible:!1,fogNear:12,fogFar:120},KL=.5,JL=80,QL=5,QS=200,ew=1;function Da(t,e){let n=y({},t);typeof e.backgroundFog=="string"&&Yt(e.backgroundFog)&&(n.backgroundFog=e.backgroundFog),typeof e.floor=="string"&&Yt(e.floor)&&(n.floor=e.floor),typeof e.floorVisible=="boolean"&&(n.floorVisible=e.floorVisible);let i=e.fogNear;typeof i=="number"&&Number.isFinite(i)&&(n.fogNear=Math.min(JL,Math.max(KL,i)));let r=e.fogFar;return typeof r=="number"&&Number.isFinite(r)&&(n.fogFar=Math.min(QS,Math.max(QL,r))),n.fogFar<=n.fogNear+ew&&(n.fogFar=Math.min(QS,n.fogNear+ew)),n}var Du={hemiSky:"#d6e2ff",hemiGround:"#4b5668",ambient:"#ffffff",key:"#fff7ef",fill:"#aec3ff",rim:"#9df0ff",backAccent:"#5fd3ff"};function Yt(t){return typeof t=="string"&&/^#[0-9A-Fa-f]{6}$/.test(t)}function Wo(t){if(!Yt(t))return 0;let e=parseInt(t.slice(1),16),n=s=>{let a=s/255;return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},i=n(e>>16&255),r=n(e>>8&255),o=n(e&255);return .2126*i+.7152*r+.0722*o}var Aa={neuronEmissive:"#2a6bff",neuronEmissiveIntensityActive:1.9,neuronEmissiveIntensityIdle:.28,neuronHiddenCold:"#1f59cc",neuronHiddenHot:"#5eccff",neuronInputCold:"#1f59cc",neuronInputHot:"#ffffff",neuronOutputCold:"#3373d9",neuronOutputHot:"#99d9ff",edgePositiveCold:"#40240f",edgePositiveHot:"#ffb83a",edgeNegativeCold:"#0f3852",edgeNegativeHot:"#57b3ff",edgeInferMuted:"#0d1217",edgeTrainRecent:"#f29e2e"},Mr={bloomEnabled:!0,bloomStrength:.55,bloomRadius:.45,bloomThreshold:.22,fxaaEnabled:!0,toneMappingExposure:1.35},tw=["neuronEmissive","neuronHiddenCold","neuronHiddenHot","neuronInputCold","neuronInputHot","neuronOutputCold","neuronOutputHot","edgePositiveCold","edgePositiveHot","edgeNegativeCold","edgeNegativeHot","edgeInferMuted","edgeTrainRecent"];function nw(t){for(let e of tw)if(typeof t[e]=="string")return!0;return!1}function Ra(t,e){let n=y({},t);for(let o of tw){let s=e[o];typeof s=="string"&&Yt(s)&&(n[o]=s)}let i=e.neuronEmissiveIntensityActive;typeof i=="number"&&Number.isFinite(i)&&(n.neuronEmissiveIntensityActive=Math.min(4,Math.max(.05,i)));let r=e.neuronEmissiveIntensityIdle;return typeof r=="number"&&Number.isFinite(r)&&(n.neuronEmissiveIntensityIdle=Math.min(2,Math.max(0,r))),n}function Wm(t,e){let n=y({},t);typeof e.bloomEnabled=="boolean"&&(n.bloomEnabled=e.bloomEnabled),typeof e.fxaaEnabled=="boolean"&&(n.fxaaEnabled=e.fxaaEnabled);let i=e.bloomStrength;typeof i=="number"&&Number.isFinite(i)&&(n.bloomStrength=Math.min(3,Math.max(0,i)));let r=e.bloomRadius;typeof r=="number"&&Number.isFinite(r)&&(n.bloomRadius=Math.min(1,Math.max(0,r)));let o=e.bloomThreshold;typeof o=="number"&&Number.isFinite(o)&&(n.bloomThreshold=Math.min(1,Math.max(0,o)));let s=e.toneMappingExposure;return typeof s=="number"&&Number.isFinite(s)&&(n.toneMappingExposure=Math.min(3,Math.max(.2,s))),n}var Au=[784,64,32,10],$m=[...br],iw=150,qm=typeof globalThis.location<"u"&&new URLSearchParams(globalThis.location.search).has("vizdebug"),rw="data/csv/mnist_train.csv.gz",ow="data/csv/mnist_test.csv.gz",Er="MNIST",Mt=28,sw=1,aw=7,Ru=320,lw=48;function e2(t){let e=t.split(","),n=[];for(let i of e){let r=i.trim();r.length!==0&&n.push(Number(r))}return n}function t2(t){let e=e2(t);if(e.length!==785)return null;let n=e[0];if(!Number.isFinite(n))return null;let i=Math.round(n);if(!Number.isInteger(i)||i<0||i>9)return null;let r=e.slice(1,785);if(r.some(s=>!Number.isFinite(s)))return null;let o=r.map(s=>Math.max(0,Math.min(1,s/255)));return{label:i,pixels:o}}var n2=200;function Xm(){let t=globalThis;return typeof t.scheduler?.yield=="function"?t.scheduler.yield():new Promise(e=>{setTimeout(e,0)})}function Ym(t){return Z(this,null,function*(){let e=yield fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);let n=yield e.arrayBuffer(),i=new Uint8Array(n);if(i.length>=2&&i[0]===31&&i[1]===139){let r=new DecompressionStream("gzip");return yield new Response(new Blob([n]).stream().pipeThrough(r)).text()}return new TextDecoder().decode(n)})}function Zm(t){return Z(this,null,function*(){let e=t.split(/\r?\n/).filter(i=>i.trim().length>0);if(e.length===0)return[];let n=[];for(let i=0;i<e.length;i++){let r=t2(e[i]);r&&n.push(r),i>0&&(i+1)%n2===0&&(yield Xm())}return n})}var nn=28,Km=nn*nn;function Nu(t,e){if(e.length!==Km)return;let n=t.getContext("2d");if(!n)return;let i=t.width,r=t.height,o=n.createImageData(nn,nn),s=o.data;for(let c=0;c<nn;c++)for(let u=0;u<nn;u++){let d=Math.round(Math.max(0,Math.min(1,e[c*nn+u]))*255),m=(c*nn+u)*4;s[m]=d,s[m+1]=d,s[m+2]=d,s[m+3]=255}if(n.fillStyle="#000000",n.fillRect(0,0,i,r),i===nn&&r===nn){n.putImageData(o,0,0);return}let a=document.createElement("canvas");a.width=nn,a.height=nn;let l=a.getContext("2d");l&&(l.putImageData(o,0,0),n.imageSmoothingEnabled=!1,n.drawImage(a,0,0,i,r))}function Jm(t,e){return Z(this,null,function*(){if(e.length===0)return null;let n=0,i=0;for(let o=0;o<e.length;o++){let s=e[o],a=Ca(s.pixels),l=t.forward(a),c=new Array(10).fill(0);c[s.label]=1,n+=t.crossEntropyLoss(l.prob,Ca(c)),t.predictClass(l.prob)===s.label&&(i+=1),o>0&&o%iw===0&&(yield Xm())}let r=i/e.length;return{accuracy:r,errorRate:1-r,loss:n/e.length}})}var g={surfaceVizMount:null,surfaceDrawCanvas:null,ctx2d:null,appStore:null,reconcileWorkspaceUrlForModelSelection:void 0,nLatest:null,net:null,net3d:null,inferCounter:0,lastInferSampleIndex:-1,lastInferActsDebug:null,drawing:!1,liveCanvasInferRaf:null,liveInferLastRun:0,drawLastCell:null,drawLastSoftPoint:null,drawSoftIsPen:!0,drawInk:"#ffffff",drawBrushChebR:0,renderSceneBound:()=>{},renderDisplayBound:()=>{},disposeSceneBound:null,stopAnimCleanup:null};var Pu=4,cw="pixels";function Qm(){return Math.min(6,Math.max(0,Pu-1))}function uw(){return Math.min(6,Qm()+1)}function Lu(){return .52+Pu*.11}function eg(t){cw=t,g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null}function $o(){return cw}function tg(t){let e=Math.round(Number(t));Number.isFinite(e)&&(Pu=Math.min(aw,Math.max(sw,e)))}function ng(){return Pu}function ig(){g.ctx2d.shadowBlur=0,g.ctx2d.shadowColor="transparent"}function jn(){ig(),g.ctx2d.globalCompositeOperation="source-over",g.ctx2d.globalAlpha=1}function rg(){return Math.min(g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height)}function i2(){return Math.max(2,36*rg()/Ru)*Lu()}function r2(){return Math.max(2.2,42*rg()/Ru)*Lu()}function o2(){return Math.max(.3,2.5*rg()/Ru)/Math.sqrt(Lu())}function og(t,e){g.ctx2d.globalCompositeOperation="source-over",g.ctx2d.globalAlpha=1,ig();let n=i2(),i=g.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.1,"rgba(255,255,255,1)"),i.addColorStop(.22,"rgba(255,255,255,0.88)"),i.addColorStop(.38,"rgba(255,255,255,0.55)"),i.addColorStop(.55,"rgba(255,255,255,0.32)"),i.addColorStop(.72,"rgba(255,255,255,0.14)"),i.addColorStop(.88,"rgba(255,255,255,0.05)"),i.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=i,g.ctx2d.beginPath(),g.ctx2d.arc(t,e,n,0,Math.PI*2),g.ctx2d.fill()}function sg(t,e){ig(),g.ctx2d.globalAlpha=1;let n=r2();g.ctx2d.globalCompositeOperation="destination-out";let i=g.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,0.94)"),i.addColorStop(.22,"rgba(255,255,255,0.55)"),i.addColorStop(.48,"rgba(255,255,255,0.22)"),i.addColorStop(.72,"rgba(255,255,255,0.08)"),i.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=i,g.ctx2d.beginPath(),g.ctx2d.arc(t,e,n,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.globalCompositeOperation="source-over"}function dw(t,e,n,i,r){let o=n-t,s=i-e,a=Math.hypot(o,s),l=o2(),c=Math.max(1,Math.ceil(a/l));for(let u=0;u<=c;u++){let d=u/c,m=t+o*d,f=e+s*d;r?og(m,f):sg(m,f)}}function fw(){let t=g.surfaceDrawCanvas.width,e=g.surfaceDrawCanvas.height;return{cellW:t/Mt,cellH:e/Mt}}function Na(t){let e=g.surfaceDrawCanvas.getBoundingClientRect(),n=g.surfaceDrawCanvas.width/e.width,i=g.surfaceDrawCanvas.height/e.height;return{x:(t.clientX-e.left)*n,y:(t.clientY-e.top)*i}}function ag(t){let{cellW:e,cellH:n}=fw();return{gx:Math.max(0,Math.min(Mt-1,Math.floor(t.x/e))),gy:Math.max(0,Math.min(Mt-1,Math.floor(t.y/n)))}}function s2(t,e,n){jn();let{cellW:i,cellH:r}=fw(),o=t*i,s=e*r,a=Math.ceil(i),l=Math.ceil(r),c=o+i*.5,u=s+r*.5,d=Math.max(i,r),m=Math.hypot(i,r)*.505,f=d*2.18;if(n==="#000000"||n.toLowerCase()==="#000000"){g.ctx2d.globalCompositeOperation="destination-out",g.ctx2d.fillStyle="rgba(255,255,255,1)",g.ctx2d.fillRect(o,s,a,l);let b=g.ctx2d.createRadialGradient(c,u,m,c,u,f*1.06);b.addColorStop(0,"rgba(255,255,255,0)"),b.addColorStop(.08,"rgba(255,255,255,0.38)"),b.addColorStop(.26,"rgba(255,255,255,0.2)"),b.addColorStop(.48,"rgba(255,255,255,0.1)"),b.addColorStop(.72,"rgba(255,255,255,0.04)"),b.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=b,g.ctx2d.beginPath(),g.ctx2d.arc(c,u,f*1.06,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.globalCompositeOperation="source-over"}else{g.ctx2d.fillStyle="#ffffff",g.ctx2d.fillRect(o,s,a,l);let b=g.ctx2d.createRadialGradient(c,u,m,c,u,f);b.addColorStop(0,"rgba(255,255,255,0)"),b.addColorStop(.06,"rgba(255,255,255,0.38)"),b.addColorStop(.18,"rgba(255,255,255,0.24)"),b.addColorStop(.35,"rgba(255,255,255,0.14)"),b.addColorStop(.55,"rgba(255,255,255,0.07)"),b.addColorStop(.78,"rgba(255,255,255,0.03)"),b.addColorStop(1,"rgba(255,255,255,0)"),g.ctx2d.fillStyle=b,g.ctx2d.beginPath(),g.ctx2d.arc(c,u,f,0,Math.PI*2),g.ctx2d.fill(),g.ctx2d.fillStyle="#ffffff",g.ctx2d.fillRect(o,s,a,l)}}function lg(t,e,n,i){for(let r=-n;r<=n;r++)for(let o=-n;o<=n;o++){let s=t+o,a=e+r;s>=0&&s<Mt&&a>=0&&a<Mt&&s2(s,a,i)}}function hw(t,e,n,i,r,o){let s=t,a=e,l=Math.abs(n-t),c=Math.abs(i-e),u=t<n?1:-1,d=e<i?1:-1,m=l-c;for(;lg(s,a,r,o),!(s===n&&a===i);){let f=2*m;f>-c&&(m-=c,s+=u),f<l&&(m+=l,a+=d)}}var Pa=[],pw=[];function cg(){return Pa.length}function Cr(t){if(!Number.isFinite(t))return null;let e=Math.floor(t);return e<0||e>=Pa.length?null:Pa[e]}function Wn(){return Pa}function bn(){return pw}function La(t,e){Pa=t,pw=e}function Ne(t){g.appStore.dispatch(S.runtimeStatusPlainSet({plain:t}))}function pi(){let t=Wn(),e=bn();g.appStore.dispatch(S.runtimeKernelCapsUpdated({caps:{hasNet:g.net!==null,mnistTrainCount:t.length,mnistTestCount:e.length}}))}function mw(t){g.nLatest.modelDropdownOpen!==t&&g.appStore.dispatch(S.modelDropdownSetOpen({open:t}))}function ug(t){g.appStore.dispatch(S.epochViewSyncFromModel({modelId:t??""}))}function gw(t){g.appStore.dispatch(S.epochHistoryCleared({modelId:t}))}function qo(t){g.appStore.dispatch(S.modelEntryUpserted({entry:t}))}function vw(){let t=g.nLatest.trainHyperparams;return{lr:t.lr,batchSize:t.batchSize,epochs:t.epochs,vizEveryNBatches:t.vizEveryNBatches}}function yw(t,e){let n=e[t]??[];if(n.length===0)return 1;let i=0;for(let r of n)i=Math.max(i,r.run);return i+1}function mi(t,e){return String(t).padStart(e," ")}function Oa(t,e,n){return t.toFixed(n).padStart(e," ")}function dg(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function fg(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}var kw="170";var _w=0,xw=1,bw=2,Sw=3,ww=4,Mw=5,Ew=6,Cw=7;var ku=2300,yg=2301,hg=2302,Tw=2400,Iw=2401,Dw=2402;var a2="",Sn="srgb",Uw="srgb-linear",Vw="linear",_g="srgb";var nq=Math.PI/180,iq=180/Math.PI;function Ni(t,e,n){return Math.max(e,Math.min(n,t))}function l2(t,e){return(t%e+e)%e}function pg(t,e,n){return(1-n)*t+n*e}var Ir=class t{constructor(e=0,n=0){t.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Ni(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ye=class t{constructor(e,n,i,r,o,s,a,l,c){t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,o,s,a,l,c)}set(e,n,i,r,o,s,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=o,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],m=i[2],f=i[5],v=i[8],b=r[0],N=r[3],P=r[6],H=r[1],fe=r[4],B=r[7],O=r[2],W=r[5],F=r[8];return o[0]=s*b+a*H+l*O,o[3]=s*N+a*fe+l*W,o[6]=s*P+a*B+l*F,o[1]=c*b+u*H+d*O,o[4]=c*N+u*fe+d*W,o[7]=c*P+u*B+d*F,o[2]=m*b+f*H+v*O,o[5]=m*N+f*fe+v*W,o[8]=m*P+f*B+v*F,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*s*u-n*a*c-i*o*u+i*a*l+r*o*c-r*s*l}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,m=a*l-u*o,f=c*o-s*l,v=n*d+i*m+r*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return e[0]=d*b,e[1]=(r*c-u*i)*b,e[2]=(a*i-r*s)*b,e[3]=m*b,e[4]=(u*n-r*l)*b,e[5]=(r*o-a*n)*b,e[6]=f*b,e[7]=(i*l-c*n)*b,e[8]=(s*n-i*o)*b,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,o,s,a){let l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+e,-r*c,r*l,-r*(-c*s+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(mg.makeScale(e,n)),this}rotate(e){return this.premultiply(mg.makeRotation(-e)),this}translate(e,n){return this.premultiply(mg.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},mg=new ye;var rn={enabled:!0,workingColorSpace:Uw,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===_g&&(t.r=Yo(t.r),t.g=Yo(t.g),t.b=Yo(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===_g&&(t.r=Zo(t.r),t.g=Zo(t.g),t.b=Zo(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===a2?Vw:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Yo(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Zo(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}var Aw=[.64,.33,.3,.6,.15,.06],Rw=[.2126,.7152,.0722],Nw=[.3127,.329],Pw=new ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lw=new ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);rn.define({[Uw]:{primaries:Aw,whitePoint:Nw,transfer:Vw,toXYZ:Pw,fromXYZ:Lw,luminanceCoefficients:Rw,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:Aw,whitePoint:Nw,transfer:_g,toXYZ:Pw,fromXYZ:Lw,luminanceCoefficients:Rw,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}});var Uu=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,o,s,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],m=o[s+0],f=o[s+1],v=o[s+2],b=o[s+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=m,e[n+1]=f,e[n+2]=v,e[n+3]=b;return}if(d!==b||l!==m||c!==f||u!==v){let N=1-a,P=l*m+c*f+u*v+d*b,H=P>=0?1:-1,fe=1-P*P;if(fe>Number.EPSILON){let O=Math.sqrt(fe),W=Math.atan2(O,P*H);N=Math.sin(N*W)/O,a=Math.sin(a*W)/O}let B=a*H;if(l=l*N+m*B,c=c*N+f*B,u=u*N+v*B,d=d*N+b*B,N===1-a){let O=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=O,c*=O,u*=O,d*=O}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,o,s){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=o[s],m=o[s+1],f=o[s+2],v=o[s+3];return e[n]=a*v+u*d+l*f-c*m,e[n+1]=l*v+u*m+c*d-a*f,e[n+2]=c*v+u*f+a*m-l*d,e[n+3]=u*v-a*d-l*m-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(o/2),m=l(i/2),f=l(r/2),v=l(o/2);switch(s){case"XYZ":this._x=m*u*d+c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d-m*f*v;break;case"YXZ":this._x=m*u*d+c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d+m*f*v;break;case"ZXY":this._x=m*u*d-c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d-m*f*v;break;case"ZYX":this._x=m*u*d-c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d+m*f*v;break;case"YZX":this._x=m*u*d+c*f*v,this._y=c*f*d+m*u*v,this._z=c*u*v-m*f*d,this._w=c*u*d-m*f*v;break;case"XZY":this._x=m*u*d-c*f*v,this._y=c*f*d-m*u*v,this._z=c*u*v+m*f*d,this._w=c*u*d+m*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],o=n[8],s=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],m=i+a+d;if(m>0){let f=.5/Math.sqrt(m+1);this._w=.25/f,this._x=(u-l)*f,this._y=(o-c)*f,this._z=(s-r)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(o+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(o-c)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(s-r)/f,this._x=(o+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ni(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,o=e._z,s=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+s*a+r*c-o*l,this._y=r*u+s*l+o*a-i*c,this._z=o*u+s*c+i*l-r*a,this._w=s*u-i*a-r*l-o*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-n;return this._w=f*s+n*this._w,this._x=f*i+n*this._x,this._y=f*r+n*this._y,this._z=f*o+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,m=Math.sin(n*u)/c;return this._w=s*d+this._w*m,this._x=i*d+this._x*m,this._y=r*d+this._y*m,this._z=o*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(n),o*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Et=class t{constructor(e=0,n=0,i=0){t.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Ow.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Ow.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[3]*i+o[6]*r,this.y=o[1]*n+o[4]*i+o[7]*r,this.z=o[2]*n+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*n+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*n+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*n+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*n+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*r-a*i),u=2*(a*n-o*r),d=2*(o*i-s*n);return this.x=n+l*c+s*d-a*u,this.y=i+l*u+a*c-o*d,this.z=r+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r,this.y=o[1]*n+o[5]*i+o[9]*r,this.z=o[2]*n+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,o=e.z,s=n.x,a=n.y,l=n.z;return this.x=r*l-o*a,this.y=o*s-i*l,this.z=i*a-r*s,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gg.copy(this).projectOnVector(e),this.sub(gg)}reflect(e){return this.sub(gg.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Ni(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gg=new Et,Ow=new Uu;var Bw={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Ou={h:0,s:0,l:0};function vg(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}var et=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rn.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=rn.workingColorSpace){return this.r=e,this.g=n,this.b=i,rn.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=rn.workingColorSpace){if(e=l2(e,1),n=Ni(n,0,1),i=Ni(i,0,1),n===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+n):i+n-i*n,s=2*i-o;this.r=vg(s,o,e+1/3),this.g=vg(s,o,e),this.b=vg(s,o,e-1/3)}return rn.toWorkingColorSpace(this,r),this}setStyle(e,n=Sn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,n);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,n);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(o,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Sn){let i=Bw[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yo(e.r),this.g=Yo(e.g),this.b=Yo(e.b),this}copyLinearToSRGB(e){return this.r=Zo(e.r),this.g=Zo(e.g),this.b=Zo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return rn.fromWorkingColorSpace(gt.copy(this),e),Math.round(Ni(gt.r*255,0,255))*65536+Math.round(Ni(gt.g*255,0,255))*256+Math.round(Ni(gt.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=rn.workingColorSpace){rn.fromWorkingColorSpace(gt.copy(this),n);let i=gt.r,r=gt.g,o=gt.b,s=Math.max(i,r,o),a=Math.min(i,r,o),l,c,u=(a+s)/2;if(a===s)l=0,c=0;else{let d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case i:l=(r-o)/d+(r<o?6:0);break;case r:l=(o-i)/d+2;break;case o:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=rn.workingColorSpace){return rn.fromWorkingColorSpace(gt.copy(this),n),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=Sn){rn.fromWorkingColorSpace(gt.copy(this),e);let n=gt.r,i=gt.g,r=gt.b;return e!==Sn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+n,Ri.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ri),e.getHSL(Ou);let i=pg(Ri.h,Ou.h,n),r=pg(Ri.s,Ou.s,n),o=pg(Ri.l,Ou.l,n);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*n+o[3]*i+o[6]*r,this.g=o[1]*n+o[4]*i+o[7]*r,this.b=o[2]*n+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gt=new et;et.NAMES=Bw;function c2(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Ft(t){let e={};for(let n=0;n<t.length;n++){let i=c2(t[n]);for(let r in i)e[r]=i[r]}return e}var u2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,d2=`#ifdef USE_ALPHAHASH
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
#endif`,f2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,h2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,m2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,g2=`#ifdef USE_AOMAP
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
#endif`,v2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y2=`#ifdef USE_BATCHING
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
#endif`,_2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,x2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,b2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,S2=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,w2=`#ifdef USE_IRIDESCENCE
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
#endif`,M2=`#ifdef USE_BUMPMAP
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
#endif`,E2=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,C2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,I2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,D2=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,A2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,R2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,N2=`#if defined( USE_COLOR_ALPHA )
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
#endif`,P2=`#define PI 3.141592653589793
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
} // validated`,L2=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,O2=`vec3 transformedNormal = objectNormal;
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
#endif`,F2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,k2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,U2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,V2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,B2="gl_FragColor = linearToOutputTexel( gl_FragColor );",z2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,H2=`#ifdef USE_ENVMAP
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
#endif`,G2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,j2=`#ifdef USE_ENVMAP
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
#endif`,W2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$2=`#ifdef USE_ENVMAP
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
#endif`,q2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Y2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Z2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,K2=`#ifdef USE_GRADIENTMAP
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
}`,J2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Q2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eO=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tO=`uniform bool receiveShadow;
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
#endif`,nO=`#ifdef USE_ENVMAP
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
#endif`,iO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rO=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oO=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sO=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aO=`PhysicalMaterial material;
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
#endif`,lO=`struct PhysicalMaterial {
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
}`,cO=`
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
#endif`,uO=`#if defined( RE_IndirectDiffuse )
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
#endif`,dO=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fO=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hO=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pO=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mO=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_O=`#if defined( USE_POINTS_UV )
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
#endif`,xO=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bO=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,SO=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wO=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,MO=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,EO=`#ifdef USE_MORPHTARGETS
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
#endif`,CO=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TO=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,IO=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,DO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RO=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,NO=`#ifdef USE_NORMALMAP
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
#endif`,PO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,LO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,OO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,UO=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,VO=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BO=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zO=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,HO=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GO=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jO=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WO=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$O=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qO=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,XO=`float getShadowMask() {
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
}`,YO=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZO=`#ifdef USE_SKINNING
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
#endif`,KO=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,JO=`#ifdef USE_SKINNING
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
#endif`,QO=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eF=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tF=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nF=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,iF=`#ifdef USE_TRANSMISSION
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
#endif`,rF=`#ifdef USE_TRANSMISSION
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
#endif`,oF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lF=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cF=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uF=`uniform sampler2D t2D;
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
}`,dF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fF=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pF=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mF=`#include <common>
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
}`,gF=`#if DEPTH_PACKING == 3200
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
}`,vF=`#define DISTANCE
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
}`,yF=`#define DISTANCE
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
}`,_F=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xF=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bF=`uniform float scale;
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
}`,SF=`uniform vec3 diffuse;
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
}`,wF=`#include <common>
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
}`,MF=`uniform vec3 diffuse;
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
}`,EF=`#define LAMBERT
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
}`,CF=`#define LAMBERT
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
}`,TF=`#define MATCAP
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
}`,IF=`#define MATCAP
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
}`,DF=`#define NORMAL
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
}`,AF=`#define NORMAL
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
}`,RF=`#define PHONG
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
}`,NF=`#define PHONG
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
}`,PF=`#define STANDARD
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
}`,LF=`#define STANDARD
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
}`,OF=`#define TOON
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
}`,FF=`#define TOON
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
}`,kF=`uniform float size;
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
}`,UF=`uniform vec3 diffuse;
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
}`,VF=`#include <common>
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
}`,BF=`uniform vec3 color;
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
}`,zF=`uniform float rotation;
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
}`,HF=`uniform vec3 diffuse;
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
}`,ge={alphahash_fragment:u2,alphahash_pars_fragment:d2,alphamap_fragment:f2,alphamap_pars_fragment:h2,alphatest_fragment:p2,alphatest_pars_fragment:m2,aomap_fragment:g2,aomap_pars_fragment:v2,batching_pars_vertex:y2,batching_vertex:_2,begin_vertex:x2,beginnormal_vertex:b2,bsdfs:S2,iridescence_fragment:w2,bumpmap_pars_fragment:M2,clipping_planes_fragment:E2,clipping_planes_pars_fragment:C2,clipping_planes_pars_vertex:T2,clipping_planes_vertex:I2,color_fragment:D2,color_pars_fragment:A2,color_pars_vertex:R2,color_vertex:N2,common:P2,cube_uv_reflection_fragment:L2,defaultnormal_vertex:O2,displacementmap_pars_vertex:F2,displacementmap_vertex:k2,emissivemap_fragment:U2,emissivemap_pars_fragment:V2,colorspace_fragment:B2,colorspace_pars_fragment:z2,envmap_fragment:H2,envmap_common_pars_fragment:G2,envmap_pars_fragment:j2,envmap_pars_vertex:W2,envmap_physical_pars_fragment:nO,envmap_vertex:$2,fog_vertex:q2,fog_pars_vertex:X2,fog_fragment:Y2,fog_pars_fragment:Z2,gradientmap_pars_fragment:K2,lightmap_pars_fragment:J2,lights_lambert_fragment:Q2,lights_lambert_pars_fragment:eO,lights_pars_begin:tO,lights_toon_fragment:iO,lights_toon_pars_fragment:rO,lights_phong_fragment:oO,lights_phong_pars_fragment:sO,lights_physical_fragment:aO,lights_physical_pars_fragment:lO,lights_fragment_begin:cO,lights_fragment_maps:uO,lights_fragment_end:dO,logdepthbuf_fragment:fO,logdepthbuf_pars_fragment:hO,logdepthbuf_pars_vertex:pO,logdepthbuf_vertex:mO,map_fragment:gO,map_pars_fragment:vO,map_particle_fragment:yO,map_particle_pars_fragment:_O,metalnessmap_fragment:xO,metalnessmap_pars_fragment:bO,morphinstance_vertex:SO,morphcolor_vertex:wO,morphnormal_vertex:MO,morphtarget_pars_vertex:EO,morphtarget_vertex:CO,normal_fragment_begin:TO,normal_fragment_maps:IO,normal_pars_fragment:DO,normal_pars_vertex:AO,normal_vertex:RO,normalmap_pars_fragment:NO,clearcoat_normal_fragment_begin:PO,clearcoat_normal_fragment_maps:LO,clearcoat_pars_fragment:OO,iridescence_pars_fragment:FO,opaque_fragment:kO,packing:UO,premultiplied_alpha_fragment:VO,project_vertex:BO,dithering_fragment:zO,dithering_pars_fragment:HO,roughnessmap_fragment:GO,roughnessmap_pars_fragment:jO,shadowmap_pars_fragment:WO,shadowmap_pars_vertex:$O,shadowmap_vertex:qO,shadowmask_pars_fragment:XO,skinbase_vertex:YO,skinning_pars_vertex:ZO,skinning_vertex:KO,skinnormal_vertex:JO,specularmap_fragment:QO,specularmap_pars_fragment:eF,tonemapping_fragment:tF,tonemapping_pars_fragment:nF,transmission_fragment:iF,transmission_pars_fragment:rF,uv_pars_fragment:oF,uv_pars_vertex:sF,uv_vertex:aF,worldpos_vertex:lF,background_vert:cF,background_frag:uF,backgroundCube_vert:dF,backgroundCube_frag:fF,cube_vert:hF,cube_frag:pF,depth_vert:mF,depth_frag:gF,distanceRGBA_vert:vF,distanceRGBA_frag:yF,equirect_vert:_F,equirect_frag:xF,linedashed_vert:bF,linedashed_frag:SF,meshbasic_vert:wF,meshbasic_frag:MF,meshlambert_vert:EF,meshlambert_frag:CF,meshmatcap_vert:TF,meshmatcap_frag:IF,meshnormal_vert:DF,meshnormal_frag:AF,meshphong_vert:RF,meshphong_frag:NF,meshphysical_vert:PF,meshphysical_frag:LF,meshtoon_vert:OF,meshtoon_frag:FF,points_vert:kF,points_frag:UF,shadow_vert:VF,shadow_frag:BF,sprite_vert:zF,sprite_frag:HF},U={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ye}},envmap:{envMap:{value:null},envMapRotation:{value:new ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ye},normalScale:{value:new Ir(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0},uvTransform:{value:new ye}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new Ir(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}}},Fw={basic:{uniforms:Ft([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Ft([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new et(0)}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Ft([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Ft([U.common,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Ft([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new et(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Ft([U.common,U.bumpmap,U.normalmap,U.displacementmap,U.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Ft([U.points,U.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Ft([U.common,U.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Ft([U.common,U.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Ft([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Ft([U.sprite,U.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ye}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distanceRGBA:{uniforms:Ft([U.common,U.displacementmap,{referencePosition:{value:new Et},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distanceRGBA_vert,fragmentShader:ge.distanceRGBA_frag},shadow:{uniforms:Ft([U.lights,U.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};Fw.physical={uniforms:Ft([Fw.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ye},clearcoatNormalScale:{value:new Ir(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ye},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ye},transmissionSamplerSize:{value:new Ir},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ye},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ye},anisotropyVector:{value:new Ir},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ye}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};var Tr=(1+Math.sqrt(5))/2,Xo=1/Tr,rq=[new Et(-Tr,Xo,0),new Et(Tr,Xo,0),new Et(-Xo,0,Tr),new Et(Xo,0,Tr),new Et(0,Tr,-Xo),new Et(0,Tr,Xo),new Et(-1,1,-1),new Et(1,1,-1),new Et(-1,1,1),new Et(1,1,1)];var oq=new Float32Array(16),sq=new Float32Array(9),aq=new Float32Array(4);var lq={[_w]:xw,[bw]:Ew,[ww]:Cw,[Sw]:Mw,[xw]:_w,[Ew]:bw,[Cw]:ww,[Mw]:Sw};function Fu(t,e,n){return!t||!n&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function GF(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}var Ko=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],o=n[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<o)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=n[++i],e<r)break t}s=n.length;break n}if(!(e>=o)){let a=n[1];e<a&&(i=2,o=a);for(let l=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=o,o=n[--i-1],e>=o)break t}s=i,i=0;break n}break e}for(;i<s;){let a=i+s>>>1;e<n[a]?s=a:i=a+1}if(r=n[i],o=n[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)n[s]=i[o+s];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xg=class extends Ko{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tw,endingEnd:Tw}}intervalChanged_(e,n,i){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],l=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case Iw:o=e,a=2*n-i;break;case Dw:o=r.length-2,a=n+r[o]-r[o+1];break;default:o=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Iw:s=e,l=2*i-n;break;case Dw:s=1,l=i+r[1]-r[0];break;default:s=e-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-a),this._weightNext=c/(l-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,m=this._weightPrev,f=this._weightNext,v=(i-n)/(r-n),b=v*v,N=b*v,P=-m*N+2*m*b-m*v,H=(1+m)*N+(-1.5-2*m)*b+(-.5+m)*v+1,fe=(-1-f)*N+(1.5+f)*b+.5*v,B=f*N-f*b;for(let O=0;O!==a;++O)o[O]=P*s[u+O]+H*s[c+O]+fe*s[l+O]+B*s[d+O];return o}},bg=class extends Ko{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-n)/(r-n),d=1-u;for(let m=0;m!==a;++m)o[m]=s[c+m]*d+s[l+m]*u;return o}},Sg=class extends Ko{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},wn=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fu(n,this.TimeBufferType),this.values=Fu(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:Fu(e.times,Array),values:Fu(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Sg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case ku:n=this.InterpolantFactoryMethodDiscrete;break;case yg:n=this.InterpolantFactoryMethodLinear;break;case hg:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ku;case this.InterpolantFactoryMethodLinear:return yg;case this.InterpolantFactoryMethodSmooth:return hg}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<e;)++o;for(;s!==-1&&i[s]>n;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),e=!1;break}s=l}if(r!==void 0&&GF(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===hg,o=e.length-1,s=1;for(let a=1;a<o;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,m=d-i,f=d+i;for(let v=0;v!==i;++v){let b=n[d+v];if(b!==n[m+v]||b!==n[f+v]){l=!0;break}}}if(l){if(a!==s){e[s]=e[a];let d=a*i,m=s*i;for(let f=0;f!==i;++f)n[m+f]=n[d+f]}++s}}if(o>0){e[s]=e[o];for(let a=o*i,l=s*i,c=0;c!==i;++c)n[l+c]=n[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=n.slice(0,s*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=yg;var Dr=class extends wn{constructor(e,n,i){super(e,n,i)}};Dr.prototype.ValueTypeName="bool";Dr.prototype.ValueBufferType=Array;Dr.prototype.DefaultInterpolation=ku;Dr.prototype.InterpolantFactoryMethodLinear=void 0;Dr.prototype.InterpolantFactoryMethodSmooth=void 0;var wg=class extends wn{};wg.prototype.ValueTypeName="color";var Mg=class extends wn{};Mg.prototype.ValueTypeName="number";var Eg=class extends Ko{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(i-n)/(r-n),c=e*a;for(let u=c+a;c!==u;c+=4)Uu.slerpFlat(o,0,s,c-a,s,c,l);return o}},Vu=class extends wn{InterpolantFactoryMethodLinear(e){return new Eg(this.times,this.values,this.getValueSize(),e)}};Vu.prototype.ValueTypeName="quaternion";Vu.prototype.InterpolantFactoryMethodSmooth=void 0;var Ar=class extends wn{constructor(e,n,i){super(e,n,i)}};Ar.prototype.ValueTypeName="string";Ar.prototype.ValueBufferType=Array;Ar.prototype.DefaultInterpolation=ku;Ar.prototype.InterpolantFactoryMethodLinear=void 0;Ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Cg=class extends wn{};Cg.prototype.ValueTypeName="vector";var Ig="\\[\\]\\.:\\/",jF=new RegExp("["+Ig+"]","g"),Dg="[^"+Ig+"]",WF="[^"+Ig.replace("\\.","")+"]",$F=/((?:WC+[\/:])*)/.source.replace("WC",Dg),qF=/(WCOD+)?/.source.replace("WCOD",WF),XF=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Dg),YF=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Dg),ZF=new RegExp("^"+$F+qF+XF+YF+"$"),KF=["material","materials","bones","map"],Tg=class{constructor(e,n,i){let r=i||Ke.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},Ke=(()=>{class t{constructor(n,i,r){this.path=i,this.parsedPath=r||t.parseTrackName(i),this.node=t.findNode(n,this.parsedPath.nodeName),this.rootNode=n,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(n,i,r){return n&&n.isAnimationObjectGroup?new t.Composite(n,i,r):new t(n,i,r)}static sanitizeNodeName(n){return n.replace(/\s/g,"_").replace(jF,"")}static parseTrackName(n){let i=ZF.exec(n);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+n);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},o=r.nodeName&&r.nodeName.lastIndexOf(".");if(o!==void 0&&o!==-1){let s=r.nodeName.substring(o+1);KF.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,o),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+n);return r}static findNode(n,i){if(i===void 0||i===""||i==="."||i===-1||i===n.name||i===n.uuid)return n;if(n.skeleton){let r=n.skeleton.getBoneByName(i);if(r!==void 0)return r}if(n.children){let r=function(s){for(let a=0;a<s.length;a++){let l=s[a];if(l.name===i||l.uuid===i)return l;let c=r(l.children);if(c)return c}return null},o=r(n.children);if(o)return o}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(n,i){n[i]=this.targetObject[this.propertyName]}_getValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)n[i++]=r[o]}_getValue_arrayElement(n,i){n[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(n,i){this.resolvedProperty.toArray(n,i)}_setValue_direct(n,i){this.targetObject[this.propertyName]=n[i]}_setValue_direct_setNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++]}_setValue_array_setNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(n,i){this.resolvedProperty[this.propertyIndex]=n[i]}_setValue_arrayElement_setNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(n,i){this.resolvedProperty.fromArray(n,i)}_setValue_fromArray_setNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(n,i){this.bind(),this.getValue(n,i)}_setValue_unbound(n,i){this.bind(),this.setValue(n,i)}bind(){let n=this.node,i=this.parsedPath,r=i.objectName,o=i.propertyName,s=i.propertyIndex;if(n||(n=t.findNode(this.rootNode,i.nodeName),this.node=n),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!n){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}n=n.material.materials;break;case"bones":if(!n.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}n=n.skeleton.bones;for(let d=0;d<n.length;d++)if(n[d].name===u){u=d;break}break;case"map":if("map"in n){n=n.map;break}if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}n=n.material.map;break;default:if(n[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}n=n[r]}if(u!==void 0){if(n[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,n);return}n=n[u]}}let a=n[o];if(a===void 0){let u=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+o+" but it wasn't found.",n);return}let l=this.Versioning.None;this.targetObject=n,n.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:n.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(o==="morphTargetInfluences"){if(!n.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!n.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}n.morphTargetDictionary[s]!==void 0&&(s=n.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=o;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return t.Composite=Tg,t})();Ke.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ke.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ke.prototype.GetterByBindingType=[Ke.prototype._getValue_direct,Ke.prototype._getValue_array,Ke.prototype._getValue_arrayElement,Ke.prototype._getValue_toArray];Ke.prototype.SetterByBindingTypeAndVersioning=[[Ke.prototype._setValue_direct,Ke.prototype._setValue_direct_setNeedsUpdate,Ke.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_array,Ke.prototype._setValue_array_setNeedsUpdate,Ke.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_arrayElement,Ke.prototype._setValue_arrayElement_setNeedsUpdate,Ke.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_fromArray,Ke.prototype._setValue_fromArray_setNeedsUpdate,Ke.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cq=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kw}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kw);var Bu=4,Cq=.34*Bu,Tq=.46*Bu,Iq=.48*Bu,Dq=.42*Bu;var Aq=new et,Rq=new et,Fa=["ring","grid","line","arc","arcAlt"],Ag="pixels",zu=[Ag,...Fa],Rg=.25,Ng=2.5,zw=.05,Hu=1;function Pg(t){return Math.min(Ng,Math.max(Rg,t))}var Lg=.05,Og=2.5,Hw=.05,Gw=1;function jw(t){return Math.min(Og,Math.max(Lg,t))}var $w=0,Ww=0,vt=null;function Pi(){return Au.map(t=>new Array(t).fill(0))}function Mn(t,e,n){vt={stamp:++$w,mode:t,activations:e.map(i=>[...i]),weightsForViz:n},Fg()}function Rr(){!g.net3d||!g.net||g.net3d.setWeights(g.net.weights)}function Fg(){return!g.net3d||!vt||vt.stamp===Ww?!1:(g.net3d.setIdleDim(vt.mode==="idle"),vt.mode!=="infer"&&g.net3d.setInferResult(null,null),g.net3d.setEdgeFocus(vt.mode==="infer"?"infer":vt.mode==="train"?"trainRecent":"off",vt.mode==="infer"?vt.activations:null),g.net3d.setActivations(vt.activations),vt.weightsForViz&&g.net3d.setWeights(vt.weightsForViz),Ww=vt.stamp,!0)}function qw(t){return Fa.includes(t)?t:null}function Xw(t){return zu.includes(t)?t:null}function Jo(){g.net3d&&(vt?(vt=M(y({},vt),{stamp:++$w}),Fg()):Mn("idle",Pi()),g.renderDisplayBound())}function Yw(){Fg()}function QF(t,e){if(t.length!==e.length)return"";let n=[];for(let i=0;i<e.length;i++){let r=e[i],o=t[i];if(!r||!o||r.length!==o.length)continue;let s=0;for(let a=0;a<r.length;a++)s=Math.max(s,Math.abs(r[a]-o[a]));n.push(`${i}:${s.toExponential(2)}`)}return n.length?`  \u0394max ${n.join(" ")}`:""}function Gu(){g.liveCanvasInferRaf!==null&&(cancelAnimationFrame(g.liveCanvasInferRaf),g.liveCanvasInferRaf=null)}function ka(){if(Gu(),!g.net||!g.net3d)return;g.liveInferLastRun=performance.now();let t=ju();Nr(t,void 0,void 0,{live:!0})}function Ua(){if(g.liveCanvasInferRaf!==null)return;let t=()=>{if(g.liveCanvasInferRaf=null,!g.net||!g.net3d)return;let e=performance.now();if(e-g.liveInferLastRun<lw){g.liveCanvasInferRaf=requestAnimationFrame(t);return}g.liveInferLastRun=e;let n=ju();Nr(n,void 0,void 0,{live:!0})};g.liveCanvasInferRaf=requestAnimationFrame(t)}function ju(){let t=g.surfaceDrawCanvas.width,e=g.surfaceDrawCanvas.height,i=g.ctx2d.getImageData(0,0,t,e).data;if(t===Mt&&e===Mt){let B=new Array(784),O=0;for(let W=0;W<Mt;W++)for(let F=0;F<Mt;F++){let _e=(W*t+F)*4;B[O++]=(i[_e]+i[_e+1]+i[_e+2])/3/255}return B}let r=t,o=e,s=-1,a=-1,l=20;for(let B=0;B<e;B++)for(let O=0;O<t;O++){let W=(B*t+O)*4;(i[W]+i[W+1]+i[W+2])/3>l&&(O<r&&(r=O),B<o&&(o=B),O>s&&(s=O),B>a&&(a=B))}if(s<r||a<o)return new Array(784).fill(0);let c=s-r+1,u=a-o+1,d=Math.max(c,u),m=Math.max(2,Math.floor(d*.2)),f=(r+s)*.5,v=(o+a)*.5,b=d+m*2,N=f-b*.5,P=v-b*.5,H=new Array(784),fe=0;for(let B=0;B<28;B++)for(let O=0;O<28;O++){let W=N+O/28*b,F=P+B/28*b,_e=N+(O+1)/28*b,Ut=P+(B+1)/28*b,an=Math.max(0,Math.floor(W)),En=Math.max(0,Math.floor(F)),qn=Math.min(t,Math.ceil(_e)),Pe=Math.min(e,Math.ceil(Ut)),Vt=0,is=0;for(let rs=En;rs<Pe;rs++)for(let os=an;os<qn;os++){let ss=(rs*t+os)*4;Vt+=(i[ss]+i[ss+1]+i[ss+2])/3,is++}H[fe++]=is>0?Vt/is/255:0}return H}function ek(t){t.length===Km&&(Gu(),jn(),Nu(g.surfaceDrawCanvas,t))}function Nr(t,e,n,i){if(!g.net||!g.net3d)return;let r=i?.live===!0;try{r||(g.inferCounter+=1);let o=Ca(t),s=g.net.forward(o),a=g.net.predictClass(s.prob),l=s.prob.some(v=>!Number.isFinite(v[0])),c=YS(o,s),u="";qm&&g.lastInferActsDebug&&(u=QF(g.lastInferActsDebug,c)),qm&&(g.lastInferActsDebug=c.map(v=>[...v])),g.net3d.setInferResult(a,e??null),Mn("infer",c),n!==void 0&&ek(t),r||g.renderDisplayBound();let d=s.prob.map((v,b)=>({digit:b,p:v[0]})),m=d.map(v=>v.p.toFixed(4)).join(" "),f=[...d].sort((v,b)=>b.p-v.p).slice(0,3).map(v=>`${v.digit}:${(v.p*100).toFixed(2)}%`).join(" ");if(e!==void 0)if(l)Ne(`Infer #${mi(g.inferCounter,4)}: ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);else{let v=n===void 0?"":` idx=${mi(n,5)} `;Ne(`Infer #${mi(g.inferCounter,4)}:${v}wahr=${e} pred=${a}  softmax ${m}  top ${f}${u}`)}else l?Ne(r?"Canvas (live): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren":`Infer #${mi(g.inferCounter,4)} (Canvas): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`):Ne(r?`Canvas (live): pred=${a}  softmax ${m}  top ${f}${u}`:`Infer #${mi(g.inferCounter,4)} (Canvas): pred=${a}  softmax ${m}  top ${f}${u}`)}catch(o){Ne(`Infer-Fehler: ${String(o)}`)}}function Zw(){return Z(this,null,function*(){let t=[rw],e=[ow];try{Ne(`${Er}: Train-CSV wird geladen \u2026`);let n="",i=[];for(let r of t)try{let o=yield Ym(r),s=yield Zm(o);if(s.length===0){n="Train-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Train-CSV konnte nicht geladen werden");La(i,bn()),Ne(`${Er}: Train geladen (${Wn().length} Zeilen)`)}catch(n){Ne(`${Er}: Fehler Train-CSV: ${n}`),La([],bn())}try{Ne(`${Er}: Test-CSV wird geladen \u2026`);let n="",i=[];for(let r of e)try{let o=yield Ym(r),s=yield Zm(o);if(s.length===0){n="Test-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Test-CSV konnte nicht geladen werden");La(Wn(),i),Ne(`${Er}: Train ${Wn().length} | Test ${i.length} geladen`)}catch(n){Ne(`${Er}: Fehler Test-CSV: ${n}`),La(Wn(),[])}g.lastInferSampleIndex=-1,pi()})}var Kw=(t,e)=>{let n=t.length,i=new Uint8Array(n),r=new Float32Array(n*e);for(let o=0;o<n;o++){let s=t[o];if(i[o]=s.label,s.pixels.length!==e)throw new Error(`MNIST-Pack: erwartet ${e} Pixel pro Zeile`);r.set(s.pixels,o*e)}return{trainingRows:{kind:"rowMajor",rowCount:n,inputDim:e,labels:i,pixels:r},transferables:[i.buffer,r.buffer]}};var tk="neuronal3d:models:v3";function Jw(t){return t.version===1&&t.inputDim===Mu&&t.outputDim===Eu&&t.hidden.length===br.length&&t.hidden.every((e,n)=>e===br[n])}function Qw(){try{localStorage.removeItem(tk)}catch{}}function Qo(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function Va(t){let e=new fi(t.inputDim,t.hidden,t.outputDim);return e.weights=t.weights.map(n=>n.map(i=>[...i])),e.biases=t.biases.map(n=>n.map(i=>[...i])),e}function kg(t){let e=g.nLatest.modelCollection.models.find(r=>r.id===t);if(!e||!Jw(e.model))return!1;let n=1+e.model.hidden.length;if(e.model.weights.length!==n||e.model.biases.length!==n)return!1;g.net=Va(e.model),g.lastInferActsDebug=null;let i=g.reconcileWorkspaceUrlForModelSelection?.(e.id)??null;return g.appStore.dispatch(S.activeModelIdSet({id:e.id,routeModelSegmentFromUrl:i})),Rr(),Mn("idle",Pi()),pi(),!0}function eM(t,e="Aktiv"){if(!t)return!1;if(!kg(t))return Ne("Modell konnte nicht geladen werden."),!1;let n=g.nLatest.modelCollection.models.find(i=>i.id===t);return Ne(`${e}: ${n?.name??t}`),!0}var Wu=class{worker=null;busy=!1;callbacks=null;pending=null;lastControl={pause:!1,stop:!1};onMessage=e=>{let n=e.data;if(!(!n||typeof n!="object"))switch(n.type){case"trainWorkerReady":return;case"trainSnapshot":this.callbacks?.onSnapshot(n);return;case"trainEpochEnd":this.callbacks?.onEpochEnd(n.summary);return;case"trainFinished":{this.busy=!1,this.callbacks=null,this.pending?.resolve({runMetrics:n.runMetrics,storedModel:n.storedModel}),this.pending=null;return}case"trainFailed":{this.busy=!1,this.callbacks=null;let i=new Error(n.message);this.pending?.reject(i),this.pending=null;return}default:return}};whenReady(){return Z(this,null,function*(){if(this.worker)return;let e=new Worker(new URL("worker-HWXCR5PM.js",import.meta.url),{type:"module",name:"neuronal-train"});this.worker=e,e.addEventListener("message",this.onMessage),yield new Promise((n,i)=>{let r=window.setTimeout(()=>{i(new Error("Train-Worker: Timeout beim Start"))},2e4),o=s=>{s.data?.type==="trainWorkerReady"&&(window.clearTimeout(r),e.removeEventListener("message",o),n())};e.addEventListener("message",o)})})}syncControlFromState(e,n){if(!n.training.running||!this.busy)return;let i=n.training.pause,r=n.training.shouldStop;e.training.pause===i&&e.training.shouldStop===r||this.postTrainControl(i,r)}runTrain(e,n,i,r,o){return!this.worker||this.busy?Promise.reject(new Error("Train-Worker nicht bereit")):(this.busy=!0,this.lastControl={pause:!1,stop:!1},this.callbacks=r,new Promise((s,a)=>{this.pending={resolve:s,reject:a},this.worker.postMessage({type:"trainRun",storedModel:e,trainingRows:n,trainConfig:i},o)}))}dispose(){let e=this.worker;this.worker=null,this.busy=!1,this.callbacks=null,this.pending&&(this.pending.reject(new Error("Train-Worker beendet")),this.pending=null),e?.removeEventListener("message",this.onMessage),e?.terminate()}postTrainControl(e,n){this.lastControl.pause===e&&this.lastControl.stop===n||(this.lastControl={pause:e,stop:n},this.worker?.postMessage({type:"trainControl",pause:e,stop:n}))}};var tM=new Set(["KeyW","KeyS","KeyA","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);function nk(t){return t instanceof HTMLElement&&t.closest("input, textarea, [contenteditable='true']")!==null}function $u(t,e){let n=t.getBoundingClientRect();return{pointerId:e.pointerId,pointerType:e.pointerType,clientX:e.clientX-n.left,clientY:e.clientY-n.top,buttons:e.buttons,button:e.button,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0,isPrimary:e.isPrimary,pressure:e.pressure}}function ik(t,e){let n=t.getBoundingClientRect();return{deltaX:e.deltaX,deltaY:e.deltaY,deltaZ:e.deltaZ,deltaMode:e.deltaMode,clientX:e.clientX-n.left,clientY:e.clientY-n.top,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}function rk(t,e){let n=t.getBoundingClientRect();return{clientX:e.clientX-n.left,clientY:e.clientY-n.top,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}var Ug=class{constructor(e){this.postToWorker=e}setWeights(e){this.postToWorker({type:"setWeights",weights:e})}setIdleDim(e){this.postToWorker({type:"setIdleDim",dim:e})}setInferResult(e,n){this.postToWorker({type:"setInferResult",predictedDigit:e,expectedDigit:n})}setEdgeFocus(e,n){this.postToWorker({type:"setEdgeFocus",mode:e,activations:n})}setActivations(e){this.postToWorker({type:"setActivations",activations:e})}setHiddenLayerLayout(e,n){this.postToWorker({type:"setHiddenLayerLayout",index:e,layout:n})}setHiddenLayerLayoutScale(e,n){this.postToWorker({type:"setHiddenLayerLayoutScale",index:e,scale:n})}setInputLayerLayout(e){this.postToWorker({type:"setInputLayerLayout",layout:e})}setInputLayerLayoutScale(e){this.postToWorker({type:"setInputLayerLayoutScale",scale:e})}setActiveNeuronMaxScaleMul(e){this.postToWorker({type:"setActiveNeuronMaxScaleMul",mul:e})}applyVizNetworkColors(e){this.postToWorker({type:"applyVizNetworkColors",colors:e})}dispose(){}},qu=class{constructor(e){this.container=e;this.surfaceBridge=new Ug(n=>this.postToWorker(n)),this.vizSurface=this.surfaceBridge}vizSurface;onWorkerSideMessage=e=>{e.data?.type==="vizWorkerFpsSample"&&this.fpsSampleListener?.(e.data.fps)};worker=null;canvas=null;resizeObserver=null;resizeObserverRaf=0;stopMainVizTick=null;detachCanvasListeners=null;surfaceBridge;latestPixelRatio=1;fpsSampleListener=null;postToWorker(e){this.worker?.postMessage(e)}measureDrawable(){let e=Math.max(1,Math.floor(this.container.clientWidth)),n=Math.max(1,Math.floor(this.container.clientHeight));return{width:e,height:n}}pushResize(){if(!this.worker||!this.canvas)return;let{width:e,height:n}=this.measureDrawable();this.latestPixelRatio=Math.min(window.devicePixelRatio,2),this.worker.postMessage({type:"resize",width:e,height:n,pixelRatio:this.latestPixelRatio})}startMainThreadVizTick(){let e=0,n=!1,i=()=>{n||(Yw(),e=window.requestAnimationFrame(i))};return e=window.requestAnimationFrame(i),()=>{n=!0,window.cancelAnimationFrame(e)}}start(){return Z(this,null,function*(){let e=new Worker(new URL("worker-KEC54NEA.js",import.meta.url),{type:"module",name:"neuronal-viz"});this.worker=e,e.addEventListener("message",this.onWorkerSideMessage),yield new Promise((F,_e)=>{let Ut=window.setTimeout(()=>{_e(new Error("3D-Render-Worker: Timeout beim Start"))},2e4),an=En=>{En.data?.type==="vizWorkerReady"&&(window.clearTimeout(Ut),e.removeEventListener("message",an),F())};e.addEventListener("message",an)});let n=document.createElement("canvas");this.canvas=n,n.style.display="block",n.style.width="100%",n.style.height="100%",this.container.appendChild(n);let{width:i,height:r}=this.measureDrawable();this.latestPixelRatio=Math.min(window.devicePixelRatio,2);let o=n.transferControlToOffscreen();yield new Promise((F,_e)=>{let Ut=window.setTimeout(()=>{_e(new Error("3D-Render-Worker: Timeout WebGL-Init"))},2e4),an=En=>{En.data?.type==="vizWorkerGlReady"&&(window.clearTimeout(Ut),e.removeEventListener("message",an),F())};e.addEventListener("message",an),e.postMessage({type:"init",canvas:o,width:i,height:r,pixelRatio:this.latestPixelRatio,layerSizes:Au},[o])}),this.resizeObserver=typeof ResizeObserver<"u"?new ResizeObserver(()=>{this.resizeObserverRaf!==0&&cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=requestAnimationFrame(()=>{this.resizeObserverRaf=0,this.pushResize()})}):null,this.resizeObserver?.observe(this.container),window.addEventListener("resize",this.onWindowResize);let s=F=>{this.postToWorker({type:"canvasPointer",eventType:"pointerdown",initDict:$u(n,F)})},a=F=>{this.postToWorker({type:"canvasPointer",eventType:"pointermove",initDict:$u(n,F)})},l=F=>{this.postToWorker({type:"canvasPointer",eventType:"pointerup",initDict:$u(n,F)})},c=F=>{this.postToWorker({type:"canvasPointer",eventType:"pointercancel",initDict:$u(n,F)})},u=F=>{F.preventDefault(),this.postToWorker({type:"canvasWheel",initDict:ik(n,F)})},d=F=>{F.preventDefault(),this.postToWorker({type:"canvasContextMenu",initDict:rk(n,F)})};n.addEventListener("pointerdown",s),n.addEventListener("pointermove",a),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",c),n.addEventListener("wheel",u,{passive:!1}),n.addEventListener("contextmenu",d);let m=F=>{!tM.has(F.code)||nk(F.target)||(F.preventDefault(),this.postToWorker({type:"navKeyDown",code:F.code}))},f=F=>{tM.has(F.code)&&(F.preventDefault(),this.postToWorker({type:"navKeyUp",code:F.code}))},v=()=>{this.postToWorker({type:"navKeysClear"})},b=()=>{this.postToWorker({type:"documentVisibilityHidden",hidden:document.hidden})};return window.addEventListener("keydown",m),window.addEventListener("keyup",f),window.addEventListener("blur",v),window.addEventListener("focus",v),window.addEventListener("pagehide",v),document.addEventListener("visibilitychange",b),this.stopMainVizTick=this.startMainThreadVizTick(),this.detachCanvasListeners=()=>{n.removeEventListener("pointerdown",s),n.removeEventListener("pointermove",a),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",c),n.removeEventListener("wheel",u),n.removeEventListener("contextmenu",d),window.removeEventListener("keydown",m),window.removeEventListener("keyup",f),window.removeEventListener("blur",v),window.removeEventListener("focus",v),window.removeEventListener("pagehide",v),document.removeEventListener("visibilitychange",b)},{render:()=>{},renderDisplay:()=>{},setVibeCameraMode:F=>{this.postToWorker({type:"setVibeCameraMode",enabled:F})},applyVibeCameraSettings:F=>{this.postToWorker({type:"applyVibeCameraSettings",tuning:F})},applyVizSceneColors:F=>{this.postToWorker({type:"applyVizSceneColors",colors:F})},applyVizLightColors:F=>{this.postToWorker({type:"applyVizLightColors",colors:F})},applyVizPostProcess:F=>{this.postToWorker({type:"applyVizPostProcess",settings:F})}}})}setFpsReporting(e,n){this.fpsSampleListener=e&&n?n:null,this.postToWorker({type:"setFpsOverlayEnabled",enabled:e})}onWindowResize=()=>{this.pushResize()};stopMainVizTickOnly(){this.stopMainVizTick?.(),this.stopMainVizTick=null}destroy(){this.setFpsReporting(!1,null),this.stopMainVizTickOnly(),window.removeEventListener("resize",this.onWindowResize),this.resizeObserverRaf!==0&&(cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=0),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.detachCanvasListeners?.(),this.detachCanvasListeners=null;let e=this.worker;this.worker=null,e?.removeEventListener("message",this.onWorkerSideMessage),e&&new Promise(i=>{let r=o=>{o.data?.type==="vizWorkerDisposed"&&(e.removeEventListener("message",r),i())};e.addEventListener("message",r),e.postMessage({type:"dispose"}),window.setTimeout(()=>i(),800)}).then(()=>e.terminate()),this.canvas?.remove(),this.canvas=null}};function Vg(){g.renderDisplayBound()}function Bg(t,e,n,i){return Z(this,null,function*(){g.appStore=t,g.reconcileWorkspaceUrlForModelSelection=i,g.surfaceVizMount=e.vizMount,g.surfaceDrawCanvas=e.inferDrawCanvas;let r=null,o=g.appStore.select(xn).subscribe(T=>{let V=g.nLatest;g.nLatest=T,V!=null&&r?.syncControlFromState(V,T)}),s=()=>{if(g.nLatest.training.running)return;let T=Cu();g.net=Va(T.model),g.lastInferActsDebug=null,g.appStore.dispatch(S.lastTrainMetricsReset()),qo(T),ug(T.id),Rr(),Mn("idle",Pi()),Ne(`Neues Modell: ${T.name}`),pi()},a=T=>{g.nLatest.training.running||T&&eM(T,"Aktives Modell")};mw(!1),g.surfaceDrawCanvas.width=Mt,g.surfaceDrawCanvas.height=Mt;let l=g.surfaceDrawCanvas.getContext("2d");if(!l)throw new Error("canvas");g.ctx2d=l,jn(),g.ctx2d.fillStyle="#000000",g.ctx2d.fillRect(0,0,g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height);let c=null;c=new qu(g.surfaceVizMount);let{render:u,renderDisplay:d,setVibeCameraMode:m,applyVibeCameraSettings:f,applyVizSceneColors:v,applyVizLightColors:b,applyVizPostProcess:N}=yield c.start();r=new Wu,yield r.whenReady(),v(g.nLatest.viz3d.sceneColors),b(g.nLatest.viz3d.lightColors),N(g.nLatest.viz3d.postProcess),f(St(g.nLatest.viz3d.vibeCamera));let P=y({},g.nLatest.viz3d.sceneColors),H=y({},g.nLatest.viz3d.lightColors),fe=y({},g.nLatest.viz3d.networkColors),B=y({},g.nLatest.viz3d.postProcess),O=0,W={},F=0,_e={},Ut=()=>{if(Object.keys(W).length===0)return;let T=y({},P);Object.keys(W).forEach(V=>{let Y=W[V];if(Y!==void 0){if(V==="floorVisible"){typeof Y=="boolean"&&(T.floorVisible=Y);return}if(V==="fogNear"||V==="fogFar"){typeof Y=="number"&&Number.isFinite(Y)&&(T[V]=Y);return}typeof Y=="string"&&Yt(Y)&&(T[V]=Y)}}),W={},v(T)},an=()=>{if(Object.keys(_e).length===0)return;let T=y({},H);Object.keys(_e).forEach(V=>{let Y=_e[V];Y!==void 0&&Yt(Y)&&(T[V]=Y)}),_e={},b(T)},En=()=>{O!==0&&(cancelAnimationFrame(O),O=0),W={},F!==0&&(cancelAnimationFrame(F),F=0),_e={}},qn=(T,V)=>{Yt(V)&&(W=M(y({},W),{[T]:V}),O===0&&(O=requestAnimationFrame(()=>{O=0,Ut()})))},Pe=(T,V)=>{Yt(V)&&(_e=M(y({},_e),{[T]:V}),F===0&&(F=requestAnimationFrame(()=>{F=0,an()})))};g.renderSceneBound=u,g.renderDisplayBound=d,g.disposeSceneBound=()=>{c?.destroy(),c=null},m(!0);let Vt=c.vizSurface;g.net3d=Vt,Vt.applyVizNetworkColors(fe),Rr(),g.stopAnimCleanup=()=>{c?.stopMainVizTickOnly()},n.connect({newModelFromToolbar:s,activeModelFromToolbar:a});let is=T=>{if(T.button!==0&&T.button!==2)return;if(T.button===2&&T.preventDefault(),g.drawing=!0,g.surfaceDrawCanvas.setPointerCapture(T.pointerId),$o()==="soft"){jn(),g.drawSoftIsPen=T.button===0;let Y=Na(T);g.drawSoftIsPen?og(Y.x,Y.y):sg(Y.x,Y.y),g.drawLastSoftPoint=Y,g.drawLastCell=null,Ua();return}g.drawInk=T.button===2?"#000000":"#ffffff",g.drawBrushChebR=T.button===2?uw():Qm();let V=ag(Na(T));g.drawLastCell=V,g.drawLastSoftPoint=null,lg(V.gx,V.gy,g.drawBrushChebR,g.drawInk),Ua()},rs=T=>{if(!g.drawing)return;if($o()==="soft"){if(g.drawLastSoftPoint===null)return;let Y=Na(T);dw(g.drawLastSoftPoint.x,g.drawLastSoftPoint.y,Y.x,Y.y,g.drawSoftIsPen),g.drawLastSoftPoint=Y,Ua();return}if(g.drawLastCell===null)return;let V=ag(Na(T));hw(g.drawLastCell.gx,g.drawLastCell.gy,V.gx,V.gy,g.drawBrushChebR,g.drawInk),g.drawLastCell=V,Ua()},os=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,jn(),ka()},ss=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,jn(),ka()},GM=()=>{g.drawing=!1,g.drawLastCell=null,g.drawLastSoftPoint=null,jn(),ka()},jM=(T,V)=>{let Y=qw(V);!Y||!g.net3d||(g.net3d.setHiddenLayerLayout(T,Y),Jo())},WM=(T,V)=>{!g.net3d||!Number.isFinite(V)||(g.net3d.setHiddenLayerLayoutScale(T,V),Jo())},$M=T=>{let V=Xw(T);!V||!g.net3d||(g.net3d.setInputLayerLayout(V),Jo())},qM=T=>{!g.net3d||!Number.isFinite(T)||(g.net3d.setInputLayerLayoutScale(T),Jo())},XM=T=>{!g.net3d||!Number.isFinite(T)||(g.net3d.setActiveNeuronMaxScaleMul(T),Jo())},YM=T=>{P=y({},T),v(P)},ZM=T=>{H=y({},T),b(H)},KM=T=>{fe=y({},T),g.net3d&&(g.net3d.applyVizNetworkColors(fe),Rr()),Vg()},JM=T=>{B=y({},T),N(B),Vg()},QM=T=>{f(St(T)),Vg()},eE=()=>{jn(),g.ctx2d.fillStyle="#000000",g.ctx2d.fillRect(0,0,g.surfaceDrawCanvas.width,g.surfaceDrawCanvas.height),ka()},tE=()=>{let T=bn();if(!g.net||T.length===0)return;let V=Math.floor(Math.random()*T.length);T.length>1&&V===g.lastInferSampleIndex&&(V=(V+1)%T.length),g.lastInferSampleIndex=V;let Y=T[V];Nr(Y.pixels,Y.label,V)},nE=T=>{$a();let V=Wn();if(!g.net||V.length===0)return;let Y=Math.max(0,Math.min(V.length-1,Math.floor(T)));g.lastInferSampleIndex=Y;let Bt=V[Y];Nr(Bt.pixels,Bt.label,Y)},ja=null,pd=0,iE=2800,Wa=null,Pr=0,rE=()=>{Pr=0;let T=Wa;Wa=null,T&&(Mn("train",T.activations,T.weights),Ne(`Ep ${mi(T.epoch+1,3)}  Batch ${mi(T.batchIndex,5)}  loss ${Oa(T.loss,8,4)}  acc ${Oa(T.trainAccBatch*100,6,1)}%`))},oE=T=>{Wa=T,Pr===0&&(Pr=requestAnimationFrame(rE))},uv=()=>{Pr!==0&&(cancelAnimationFrame(Pr),Pr=0),Wa=null},$a=()=>{ja!==null&&(window.clearInterval(ja),ja=null)},dv=()=>{let T=bn();if(!g.net||T.length===0){$a();return}let V=pd%T.length,Y=T[V];g.lastInferSampleIndex=V,Nr(Y.pixels,Y.label,V),pd=(pd+1)%T.length},sE=T=>{if($a(),!T)return!1;let V=bn();return!g.net||V.length===0?!1:(dv(),ja=window.setInterval(dv,iE),!0)},aE=()=>{if(!g.net)return;let T=ju();Nr(T)},lE=()=>{g.appStore.dispatch(S.trainingPauseToggled())},cE=()=>{g.appStore.dispatch(S.newModelFromToolbarRequested())},uE=()=>{if(!g.net)return;let T=(window.prompt("Name f\xFCr den neuen Modellstand:",fg())??"").trim();if(!T)return;let V=g.net;Z(null,null,function*(){let Y=new Date().toISOString(),Bt=yield Jm(V,bn());qo({id:crypto.randomUUID(),name:T,createdAt:Y,updatedAt:Y,model:Qo(V),metrics:{lastLoss:g.nLatest.lastTrainLoss,lastBatchAcc:g.nLatest.lastTrainBatchAcc,testAcc:Bt?Bt.accuracy:null,errorRate:Bt?Bt.errorRate:null,epochsTrained:0}}),Ne(`Neuer Modellstand gespeichert: ${T}`)})},dE=()=>{if(g.nLatest.training.running)return;let T=g.nLatest.modelCollection.activeModelId;if(!T)return;let V=g.nLatest.modelCollection.models.find(Bt=>Bt.id===T);if(!V)return;let Y=new fi(784,$m,10);g.net=Y,g.lastInferActsDebug=null,g.appStore.dispatch(S.lastTrainMetricsReset()),gw(T),qo(M(y({},V),{updatedAt:new Date().toISOString(),model:Qo(Y),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}})),ug(T),Mn("idle",Pi()),Ne(`Modell neu initialisiert: ${V.name}`),pi()},fE=()=>{Z(null,null,function*(){yield new Promise(ut=>{setTimeout(ut,0)});let T=Wn();if(T.length===0)return;let V=vw();if(!g.net){g.net=new fi(784,$m,10);let ut=new Date().toISOString();qo({id:crypto.randomUUID(),name:fg(),createdAt:ut,updatedAt:ut,model:Qo(g.net),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}),pi()}g.lastInferActsDebug=null;let Y=g.nLatest.modelCollection.activeModelId;if(!Y)return;g.appStore.dispatch(S.lastTrainMetricsReset());let Bt=Date.now(),hv=new Date(Bt).toISOString(),pv=yw(Y,g.nLatest.epochByModelId);g.appStore.dispatch(S.trainingStarted({modelId:Y,run:pv,runStartedAt:hv,runStartedMs:Bt})),yield new Promise(ut=>{setTimeout(ut,0)}),Mn("train",Pi());let as=null;try{if(!r)throw new Error("Train-Worker nicht initialisiert");let ut=Kw(T,g.net.inputDim);as=yield r.runTrain(Qo(g.net),ut.trainingRows,V,{onSnapshot:Lr=>{oE(Lr)},onEpochEnd:Lr=>{let Oi=M(y({},Lr),{run:pv,savedAt:new Date().toISOString(),runStartedAt:hv,runElapsedMs:Date.now()-Bt});g.appStore.dispatch(S.trainingEpochAppended({modelId:Y,row:Oi}))}},ut.transferables)}catch{Ne("Training-Worker-Fehler")}as&&(g.net=Va(as.storedModel));let ls=as?.runMetrics??{lastTrainLoss:0,lastTrainBatchAcc:0};if(g.appStore.dispatch(S.trainingFinished(ls)),g.net&&as){let ut=yield Jm(g.net,bn()),Lr=g.nLatest.modelCollection.activeModelId,Oi=Lr?g.nLatest.modelCollection.models.find(hE=>hE.id===Lr):null;Oi&&qo(M(y({},Oi),{updatedAt:new Date().toISOString(),model:Qo(g.net),metrics:{lastLoss:ls.lastTrainLoss,lastBatchAcc:ls.lastTrainBatchAcc,testAcc:ut?ut.accuracy:Oi.metrics.testAcc,errorRate:ut?ut.errorRate:Oi.metrics.errorRate,epochsTrained:Oi.metrics.epochsTrained+V.epochs}}))}uv(),g.net&&(Rr(),Mn("idle",Pi()));let md=g.nLatest.modelCollection.activeModelId?g.nLatest.modelCollection.models.find(ut=>ut.id===g.nLatest.modelCollection.activeModelId):null;Ne(`Training beendet | aktiv: ${md?.name??"-"} | loss ${Oa(ls.lastTrainLoss,8,4)} | batch-acc ${Oa(ls.lastTrainBatchAcc*100,6,2)}% | err ${dg(md?.metrics.errorRate??null)} | acc ${dg(md?.metrics.testAcc??null)}`)})},fv=()=>{new hi().saveCollection(g.nLatest.modelCollection),new wr().saveEpochStore({version:1,byModelId:g.nLatest.epochByModelId}),g.appStore.dispatch(S.trainingStopRequested()),g.stopAnimCleanup?.(),g.net3d?.dispose(),g.disposeSceneBound?.()};window.addEventListener("beforeunload",fv),Ne("MNIST wird geladen \u2026"),pi(),Zw();try{if(g.nLatest.modelStoreHydrated){let T=g.nLatest.modelCollection.activeModelId;if(T&&kg(T)){let V=g.nLatest.modelCollection.models.find(Y=>Y.id===T);Ne(`Modell aus Browser-Speicher geladen: ${V?.name??T}`)}else g.nLatest.modelCollection.models.length>0&&Ne(`${g.nLatest.modelCollection.models.length} Modellst\xE4nde im Browser gefunden`)}}catch{Ne("MNIST wird geladen \u2026")}return{destroy:()=>{try{new hi().saveCollection(g.nLatest.modelCollection),new wr().saveEpochStore({version:1,byModelId:g.nLatest.epochByModelId})}catch{}Gu(),uv(),En(),$a(),g.appStore.dispatch(S.trainingStopRequested()),n.disconnect(),o.unsubscribe(),window.removeEventListener("beforeunload",fv),g.stopAnimCleanup?.(),g.net3d?.dispose(),g.disposeSceneBound?.(),r?.dispose(),r=null,g.net3d=null,g.stopAnimCleanup=null,g.disposeSceneBound=null,g.reconcileWorkspaceUrlForModelSelection=void 0,g.renderSceneBound=()=>{},g.renderDisplayBound=()=>{}},onTrain:fE,onPause:lE,onNewModel:cE,onSaveAs:uE,onReset:dE,onInferRandom:tE,onInferTrainSample:nE,onInferDraw:aE,onClearDraw:eE,onDrawPointerDown:is,onDrawPointerMove:rs,onDrawPointerUp:os,onDrawPointerCancel:ss,onDrawPointerLeave:GM,onHiddenLayerLayoutChange:jM,onHiddenLayerLayoutScaleChange:WM,onInputLayerLayoutChange:$M,onInputLayerLayoutScaleChange:qM,onActiveNeuronMaxScaleMulChange:XM,onVizSceneColorsApply:YM,onVizLightColorsApply:ZM,onVizNetworkColorsApply:KM,onVizPostProcessApply:JM,onVibeCameraSettingsApply:QM,previewVizSceneColor:qn,previewVizLightColor:Pe,cancelPendingVizColorPreviews:En,setVibeCameraMode:m,setTestImageCarouselMode:sE,setVizFpsOverlay:(T,V)=>{c?.setFpsReporting(T,V)}}})}var Li=class t{newModel=()=>{};selectModel=e=>{};runtimeAttached=!1;pendingNew=!1;pendingSelectId=null;connect(e){this.newModel=e.newModelFromToolbar,this.selectModel=e.activeModelFromToolbar,this.runtimeAttached=!0,this.flushPending()}disconnect(){this.newModel=()=>{},this.selectModel=()=>{},this.runtimeAttached=!1,this.pendingNew=!1,this.pendingSelectId=null}flushPending(){if(this.pendingNew){this.pendingNew=!1,this.pendingSelectId=null,this.newModel();return}if(this.pendingSelectId!==null){let e=this.pendingSelectId;this.pendingSelectId=null,this.selectModel(e)}}newModelFromToolbar(){if(!this.runtimeAttached){this.pendingNew=!0,this.pendingSelectId=null;return}this.newModel()}activeModelFromToolbar(e){if(!this.runtimeAttached){this.pendingSelectId=e,this.pendingNew=!1;return}this.selectModel(e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};function zg(t){let n=t.split("?")[0].split("#")[0].split("/").filter(Boolean),i=n.indexOf("model");if(i<0)return null;let r=n[i+1];return!r||r==="new"?null:r}function nM(t){return zg(t)!=null}var on=class t{inferDrawBrushSizeUi={min:1,max:7};store=w(he);router=w(qt);appInstance=w(Li);actions$=w(Su);runtime=null;hydrateOnce=null;constructor(){this.actions$.pipe(Me(S.activeModelIdFromRouteSet),Ue(this.store.select(di)),pe(([,e])=>!e)).subscribe(([{id:e}])=>{Zn.schedule(()=>this.appInstance.activeModelFromToolbar(e))})}ensureStoreHydrated(){return Z(this,null,function*(){this.hydrateOnce||(this.hydrateOnce=xs(this.store.select(vr).pipe(pe(e=>e),qe(1))).then(()=>{})),yield this.hydrateOnce})}bindRuntime(e,n){return Z(this,null,function*(){yield this.ensureStoreHydrated(),this.runtime?.destroy();let i=yield Bg(this.store,e,n,r=>{let o=zg(this.router.url);return o!=null&&o!==r&&this.router.navigate(["/model",r],{replaceUrl:!0}),o});return this.runtime=i,()=>{this.runtime===i?(i.destroy(),this.runtime=null):i.destroy()}})}dispatch(e){this.store.dispatch(e)}onTrain=()=>{this.runtime?.onTrain()};onPause=()=>{this.runtime?.onPause()};onActiveModelFromMenu=e=>{this.store.dispatch(S.activeModelFromToolbarRequested({id:e}))};onNewModel=()=>{this.runtime?.onNewModel()};onSaveAs=()=>{this.runtime?.onSaveAs()};onReset=()=>{this.runtime?.onReset()};onInferRandom=()=>{this.runtime?.onInferRandom()};onInferTrainSample(e){this.runtime?.onInferTrainSample(e)}setVizFpsOverlay(e,n){this.runtime?.setVizFpsOverlay(e,n)}onInferDraw=()=>{this.runtime?.onInferDraw()};onClearDraw=()=>{this.runtime?.onClearDraw()};onDrawPointerDown=e=>{this.runtime?.onDrawPointerDown(e)};onDrawPointerMove=e=>{this.runtime?.onDrawPointerMove(e)};onDrawPointerUp=()=>{this.runtime?.onDrawPointerUp()};onDrawPointerCancel=()=>{this.runtime?.onDrawPointerCancel()};onDrawPointerLeave=()=>{this.runtime?.onDrawPointerLeave()};onHiddenLayerLayoutChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutChange(e,n)};onHiddenLayerLayoutScaleChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutScaleChange(e,n)};onInputLayerLayoutChange=e=>{this.runtime?.onInputLayerLayoutChange(e)};onInputLayerLayoutScaleChange=e=>{this.runtime?.onInputLayerLayoutScaleChange(e)};onActiveNeuronMaxScaleMulChange=e=>{this.runtime?.onActiveNeuronMaxScaleMulChange(e)};onVizSceneColorsApply=e=>{this.runtime?.onVizSceneColorsApply(e)};onVizLightColorsApply=e=>{this.runtime?.onVizLightColorsApply(e)};onVizNetworkColorsApply=e=>{this.runtime?.onVizNetworkColorsApply(e)};onVizPostProcessApply=e=>{this.runtime?.onVizPostProcessApply(e)};onVibeCameraSettingsApply=e=>{this.runtime?.onVibeCameraSettingsApply(e)};previewVizSceneColor=(e,n)=>{this.runtime?.previewVizSceneColor(e,n)};previewVizLightColor=(e,n)=>{this.runtime?.previewVizLightColor(e,n)};cancelPendingVizColorPreviews=()=>{this.runtime?.cancelPendingVizColorPreviews()};toggleVibeCameraState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setVibeCameraMode(n),n}setTestImageCarouselMode(e){return this.runtime?.setTestImageCarouselMode(e)??!1}toggleTestImageCarouselState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setTestImageCarouselMode(n)}stopTestImageCarousel(){this.runtime?.setTestImageCarouselMode(!1)}setInferDrawBrushMode(e){eg(e)}getInferDrawBrushMode(){return $o()}setInferDrawBrushSize(e){tg(e)}getInferDrawBrushSize(){return ng()}static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})};var ok=t=>["/model",t],sk=(t,e)=>e.id;function ak(t,e){t&1&&(h(0,"div",1),x(1," Wird geladen \u2026 "),p())}function lk(t,e){t&1&&(h(0,"div",1),x(1," Modelle werden vorbereitet \u2026 "),p())}function ck(t,e){if(t&1){let n=jt();h(0,"div",2)(1,"p",3),x(2," Noch keine gespeicherten Modelle. Lege ein neues Netz an \u2014 es erscheint in der Liste; \xF6ffne es dort f\xFCr die Arbeitsfl\xE4che. "),p(),h(3,"button",4),C("click",function(){I(n);let r=E();return D(r.createNew())}),x(4," Neues Modell anlegen "),p()()}}function uk(t,e){if(t&1&&(h(0,"li")(1,"a",9)(2,"div",10)(3,"span",11),x(4),p(),h(5,"div",12)(6,"span"),x(7),p(),h(8,"span"),x(9),p()(),h(10,"div",13)(11,"div",14)(12,"span"),x(13,"Trainierte Epochen"),p(),h(14,"span",15),x(15),p()(),h(16,"div",16),xe(17,"div",17),p()()()()()),t&2){let n=e.$implicit,i=E(2);_(),R("routerLink",Rx(8,ok,n.id)),_(3),Se(n.name),_(3),me("Test: ",i.fmtPct(n.metrics.testAcc),""),_(2),me("Fehlerrate: ",i.fmtPct(n.metrics.errorRate),""),_(6),Se(n.metrics.epochsTrained),_(),se("aria-label","Epochen "+n.metrics.epochsTrained+" im Vergleich zur Liste"),_(),xo("width",i.epochBarRelativePct(n.metrics.epochsTrained),"%")}}function dk(t,e){if(t&1){let n=jt();h(0,"div",5)(1,"h1",6),x(2," Gespeicherte Modelle "),p(),h(3,"button",7),C("click",function(){I(n);let r=E();return D(r.createNew())}),x(4," Neues Modell anlegen "),p()(),h(5,"ul",8),Xe(6,uk,18,10,"li",null,sk),p()}if(t&2){let n=E();_(6),Ye(n.models())}}var Xu=class t{neuronalApp=w(on);store=w(he);ready=Oe(!1);hydrated=ve(this.store.select(vr),{initialValue:!1});models=ve(this.store.select(Ho).pipe(G(e=>e.models)),{initialValue:[]});constructor(){this.neuronalApp.ensureStoreHydrated().then(()=>{this.ready.set(!0)})}fmtPct(e){return e===null||!Number.isFinite(e)?"\u2014":`${(e*100).toFixed(2)} %`}epochBarRelativePct(e){let n=this.models(),i=0;for(let s of n){let a=s.metrics.epochsTrained;Number.isFinite(a)&&a>i&&(i=a)}let r=Math.max(1,i),o=Number.isFinite(e)?Math.max(0,e):0;return Math.min(100,o/r*100)}createNew(){this.store.dispatch(S.newModelFromListRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-model-list"]],hostAttrs:[1,"flex","min-h-0","flex-1","flex-col"],decls:5,vars:1,consts:[[1,"flex","min-h-0","flex-1","flex-col","gap-4","p-4"],[1,"text-base-content/70","border-base-300/50","bg-base-200/50","rounded-box","border","border-dashed","p-6","text-sm"],[1,"flex","flex-col","gap-4","rounded-box","border","border-dashed","border-base-300/60","bg-base-200/40","p-6"],[1,"text-base-content/80","text-sm"],["type","button",1,"btn","btn-accent","w-fit",3,"click"],[1,"flex","flex-col","gap-3","sm:flex-row","sm:items-center","sm:justify-between"],[1,"text-lg","font-semibold","tracking-tight"],["type","button",1,"btn","btn-accent","shrink-0",3,"click"],["role","list",1,"flex","flex-col","gap-2"],[1,"card","border-base-300","bg-base-200","hover:border-primary/50","hover:bg-base-200/90","block","rounded-box","border","shadow-sm","transition-colors",3,"routerLink"],[1,"card-body","gap-1","p-4"],[1,"card-title","text-base"],[1,"text-base-content/65","flex","flex-wrap","gap-x-4","gap-y-1","text-xs"],[1,"mt-2.5","flex","flex-col","gap-1.5"],["aria-hidden","true",1,"text-base-content/50","flex","items-baseline","justify-between","gap-2","text-[0.65rem]","font-medium","uppercase","tracking-wider"],[1,"text-base-content/70","tabular-nums","normal-case"],["role","img",1,"bg-base-300/40","h-2.5","w-full","overflow-hidden","rounded-full"],[1,"from-primary","to-secondary","bg-gradient-to-r","h-full","min-h-full","min-w-0","rounded-full","shadow-sm","shadow-primary/25","transition-[width]","duration-500","ease-out"]],template:function(n,i){n&1&&(h(0,"main",0),Ve(1,ak,2,0,"div",1)(2,lk,2,0,"div",1)(3,ck,5,0,"div",2)(4,dk,8,0),p()),n&2&&(_(),He(i.ready()?i.hydrated()?i.models().length===0?3:4:2:1))},dependencies:[Vo],encapsulation:2,changeDetection:0})};function iM(t){let e=w(he),n=w(qt);return e.select(vr).pipe(pe(i=>i),qe(1),Tt(()=>e.select(Ho).pipe(qe(1))),G(i=>{let r=(t.params.modelId??"").trim();return r?i.models.some(o=>o.id===r)?(e.dispatch(S.activeModelIdFromRouteSet({id:r})),!0):n.parseUrl("/"):!0}))}function fk(t,e){return this.rowKey(e)}var Hg=(t,e)=>e.pos+e.label;function hk(t,e){t&1&&(h(0,"li",10),x(1," Noch kein Training "),p())}function pk(t,e){if(t&1&&(h(0,"li",11)(1,"span",12),x(2),p(),h(3,"span"),x(4),p(),h(5,"span"),x(6),p(),h(7,"span"),x(8),p(),h(9,"span",13),x(10),p()()),t&2){let n=e.$implicit,i=E(3);_(2),me("R",i.runLabel(n.run),""),_(2),me("Ep ",n.epoch+1,""),_(2),me("loss ",n.loss.toFixed(4),""),_(2),me("",(n.trainAcc*100).toFixed(2),"%"),_(2),Eo("",i.timeLabel(n.savedAt)," | Dauer ",i.durationLabel(n.runElapsedMs),"")}}function mk(t,e){if(t&1&&Xe(0,pk,11,6,"li",11,fk,!0),t&2){let n=E(2);Ye(n.view().rows)}}function gk(t,e){if(t&1&&(h(0,"div",7)(1,"ul",9),Ve(2,hk,2,0,"li",10)(3,mk,2,0),p()()),t&2){let n=E();_(2),He(n.view().rows.length===0?2:3)}}function vk(t,e){if(t&1&&(mo(),xe(0,"line",17)),t&2){let n=e.$implicit,i=E();se("x1",i.marginLeft)("y1",n)("x2",i.marginLeft+i.plotW)("y2",n)}}function yk(t,e){if(t&1&&(mo(),h(0,"text",22),x(1),p()),t&2){let n=e.$implicit,i=E();se("x",i.marginLeft-4)("y",n.pos),_(),me(" ",n.label," ")}}function _k(t,e){if(t&1&&(mo(),h(0,"text",23),x(1),p()),t&2){let n=e.$implicit,i=E();se("x",i.marginLeft+i.plotW+4)("y",n.pos),_(),me(" ",n.label," ")}}function xk(t,e){if(t&1&&(mo(),h(0,"text",24),x(1),p()),t&2){let n=e.$implicit,i=E();se("x",n.pos)("y",i.marginTop+i.plotH+14),_(),me(" ",n.label," ")}}function bk(t,e){if(t&1&&(mo(),h(0,"svg",14)(1,"defs")(2,"clipPath",15),xe(3,"rect"),p()(),xe(4,"rect",16),Xe(5,vk,1,4,":svg:line",17,wi),xe(7,"line",18)(8,"line",18)(9,"line",18),h(10,"g",19),xe(11,"polyline",20)(12,"polyline",21),p(),Xe(13,yk,2,3,":svg:text",22,Hg),Xe(15,_k,2,3,":svg:text",23,Hg),Xe(17,xk,2,3,":svg:text",24,Hg),h(19,"text",25),x(20," Schritt "),p()(),Py(),h(21,"div",26)(22,"span",27),x(23,"Loss"),p(),h(24,"span",28),x(25,"Train-Acc"),p()()),t&2){let n=e;se("viewBox","0 0 "+n.vbW+" "+n.vbH),_(3),se("x",n.marginLeft)("y",n.marginTop)("width",n.plotW)("height",n.plotH),_(),se("width",n.vbW)("height",n.vbH),_(),Ye(n.gridYs),_(2),se("x1",n.marginLeft)("y1",n.marginTop)("x2",n.marginLeft)("y2",n.marginTop+n.plotH),_(),se("x1",n.marginLeft+n.plotW)("y1",n.marginTop)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),_(),se("x1",n.marginLeft)("y1",n.marginTop+n.plotH)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),_(2),se("points",n.pointsLoss),_(),se("points",n.pointsAcc),_(),Ye(n.leftTicks),_(2),Ye(n.rightTicks),_(2),Ye(n.bottomTicks),_(2),se("x",n.marginLeft+n.plotW/2)("y",n.vbH-2)}}function Sk(t,e){t&1&&(h(0,"p",10),x(1," Noch kein Training "),p())}function wk(t,e){if(t&1&&(h(0,"div",8),Ve(1,bk,26,23)(2,Sk,2,0,"p",10),p()),t&2){let n,i=E();_(),He((n=i.chartModel())?1:2,n)}}var Yu=class t{store=w(he);view=ve(this.store.select(mm),{requireSync:!0});epochTab=Oe("list");chartModel=bt(()=>{let e=this.view().rows;if(e.length===0)return null;let n=[...e].reverse(),i=n.length,r=34,o=38,s=10,a=26,l=148,c=70,u=r+l+o,d=s+c+a,m=n.map(Pe=>Pe.loss),f=Math.min(...m),v=Math.max(...m),b=Math.max(v-f,1e-9),N=Pe=>r+(i<=1?l/2:Pe/(i-1)*l),P=Pe=>s+(1-(Pe-f)/b)*c,H=Pe=>s+(1-Pe)*c,fe=n.map((Pe,Vt)=>`${N(Vt)},${P(Pe.loss)}`).join(" "),B=n.map((Pe,Vt)=>`${N(Vt)},${H(Pe.trainAcc)}`).join(" "),O=Pe=>{let Vt=Math.abs(Pe);return Vt>=100?Pe.toFixed(0):Vt>=10?Pe.toFixed(1):Vt>=1?Pe.toFixed(2):Pe.toFixed(3)},W=s+c,F=s+c/2,_e=v-f<1e-8,Ut=_e?[{pos:F,label:O(f)}]:[{pos:s,label:O(f)},{pos:F,label:O((f+v)/2)},{pos:W,label:O(v)}],an=[{pos:s,label:"100%"},{pos:F,label:"50%"},{pos:W,label:"0%"}],En=_e?[F]:[s,F,W],qn=[];if(i===1)qn.push({pos:N(0),label:"1"});else{if(qn.push({pos:N(0),label:"1"}),i>2){let Pe=Math.floor((i-1)/2);Pe!==0&&Pe!==i-1&&qn.push({pos:N(Pe),label:String(Pe+1)})}qn.push({pos:N(i-1),label:String(i)})}return{vbW:u,vbH:d,marginLeft:r,marginRight:o,marginTop:s,marginBottom:a,plotW:l,plotH:c,pointsLoss:fe,pointsAcc:B,leftTicks:Ut,rightTicks:an,bottomTicks:qn,gridYs:En}});rowKey(e){return`${e.run}-${e.epoch}-${e.savedAt}`}runLabel(e){return String(e).padStart(2,"0")}timeLabel(e){let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}durationLabel(e){let n=Math.max(0,Math.round(e/1e3)),i=Math.floor(n/3600),r=Math.floor(n%3600/60),o=n%60;return i>0?`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-epoch-track-list"]],decls:12,vars:8,consts:[[1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden","border","shadow-xl"],[1,"card-body","flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","p-4"],["role","tablist","aria-label","Epoch-Ansicht",1,"tabs","tabs-boxed","bg-base-300/30","p-1"],["type","button","role","tab","id","tab-epoch-list","aria-controls","panel-epoch-list",1,"tab","flex-1","text-xs",3,"click"],["type","button","role","tab","id","tab-epoch-chart","aria-controls","panel-epoch-chart",1,"tab","flex-1","text-xs",3,"click"],[1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden","pt-1"],[1,"text-success/90","m-0","text-[0.68rem]","font-bold","uppercase","tracking-widest"],["id","panel-epoch-list","role","tabpanel","aria-labelledby","tab-epoch-list",1,"flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden"],["id","panel-epoch-chart","role","tabpanel","aria-labelledby","tab-epoch-chart",1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","min-h-0","flex-1","list-none","flex-col","gap-2","overflow-y-auto","overflow-x-hidden","p-0"],[1,"text-base-content/60","rounded-btn","border-base-300/60","border","border-dashed","p-3","text-xs"],[1,"border-base-300/80","bg-base-100/40","rounded-btn","grid","grid-cols-[3.2rem_4rem_1fr_auto]","items-center","gap-2","border","p-2","font-mono","text-[0.68rem]","tabular-nums"],[1,"text-base-content/60"],[1,"text-base-content/60","border-base-300/40","col-span-4","border-t","pt-1","text-[0.64rem]"],["preserveAspectRatio","xMidYMid meet",1,"border-base-300/60","block","max-h-[14rem]","min-h-[6.5rem]","w-full","flex-1","rounded-lg","border"],["id","n3-epoch-plot-clip"],["x","0","y","0",1,"fill-base-300/35"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/10"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/45"],["clip-path","url(#n3-epoch-plot-clip)"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-primary"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-info"],["text-anchor","end","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","start","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","middle","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium"],["text-anchor","middle","dominant-baseline","auto",1,"fill-base-content/55","text-[6px]","font-semibold","uppercase","tracking-wide"],["aria-hidden","true",1,"text-base-content/60","flex","flex-wrap","gap-x-4","gap-y-1","text-[0.65rem]"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-primary","before:content-['']"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-info","before:content-['']"]],template:function(n,i){n&1&&(h(0,"article",0)(1,"div",1)(2,"div",2)(3,"button",3),C("click",function(){return i.epochTab.set("list")}),x(4," Liste "),p(),h(5,"button",4),C("click",function(){return i.epochTab.set("chart")}),x(6," Diagramm "),p()(),h(7,"div",5)(8,"div",6),x(9),p(),Ve(10,gk,4,1,"div",7)(11,wk,3,1,"div",8),p()()()),n&2&&(_(3),mt("tab-active",i.epochTab()==="list"),se("aria-selected",i.epochTab()==="list"),_(2),mt("tab-active",i.epochTab()==="chart"),se("aria-selected",i.epochTab()==="chart"),_(4),me(" Epochs (",i.view().epochsTotal,") "),_(),He(i.epochTab()==="list"?10:11))},styles:["[_nghost-%COMP%]{display:flex;overflow:auto}"],changeDetection:0})};var Mk=["cv"],Zu=class t{cdr=w(Co);cv;index;pick=new ft;displayNr=0;labelStr="\u2014";ngAfterViewInit(){this.paint()}ngOnChanges(){queueMicrotask(()=>this.paint())}paint(){let e=this.cv?.nativeElement;if(!e)return;let n=Cr(this.index);if(this.displayNr=this.index+1,!n){this.labelStr="\u2014",this.cdr.markForCheck();return}this.labelStr=String(n.label),Nu(e,n.pixels),this.cdr.markForCheck()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-train-infer-thumb"]],viewQuery:function(n,i){if(n&1&&Xs(Mk,7),n&2){let r;So(r=wo())&&(i.cv=r.first)}},inputs:{index:"index"},outputs:{pick:"pick"},features:[ir],decls:8,vars:2,consts:[["cv",""],["type","button",1,"border-base-300","bg-base-300/40","hover:bg-base-300/60","flex","w-full","items-center","gap-3","rounded-lg","border","px-2","py-1","text-left","transition-colors",3,"click"],["width","28","height","28",1,"border-base-content/20","h-11","w-11","shrink-0","rounded","border","bg-black","[image-rendering:pixelated]"],[1,"flex","min-w-0","flex-1","flex-col","gap-0.5"],[1,"text-base-content","font-mono","text-xs","font-medium","tabular-nums"],[1,"text-base-content/60","text-[11px]"]],template:function(n,i){if(n&1){let r=jt();h(0,"button",1),C("click",function(){return I(r),D(i.pick.emit())}),xe(1,"canvas",2,0),h(3,"div",3)(4,"span",4),x(5),p(),h(6,"span",5),x(7),p()()()}n&2&&(_(5),me("Nr. ",i.displayNr,""),_(2),me("Label ",i.labelStr,""))},encapsulation:2,changeDetection:0})};var Ek=["trainGalleryScroll"],Ck=["inferDrawCanvas"],Tk=(t,e)=>e.row;function Ik(t,e){if(t&1){let n=jt();h(0,"div",10)(1,"div",12)(2,"button",13),C("click",function(){I(n);let r=E();return D(r.inferRandom())}),x(3," Zuf\xE4lliges Testbild "),p(),h(4,"button",14),C("click",function(){I(n);let r=E();return D(r.toggleTestCarousel())}),x(5),p()(),h(6,"div",15)(7,"div",16)(8,"span",17),x(9,"Pinselgr\xF6\xDFe"),p(),h(10,"span",18),x(11),p()(),h(12,"input",19),C("input",function(r){I(n);let o=E();return D(o.onBrushSizeInput(r))}),p()(),h(13,"canvas",20,0),C("contextmenu",function(r){return I(n),D(r.preventDefault())})("pointerdown",function(r){I(n);let o=E();return D(o.drawDown(r))})("pointermove",function(r){I(n);let o=E();return D(o.drawMove(r))})("pointerup",function(){I(n);let r=E();return D(r.drawUp())})("pointercancel",function(){I(n);let r=E();return D(r.drawCancel())})("pointerleave",function(){I(n);let r=E();return D(r.drawLeave())}),p(),h(15,"div",21)(16,"div",22)(17,"button",23),C("click",function(){I(n);let r=E();return D(r.inferDraw())}),x(18," Zeichnung auswerten "),p(),h(19,"button",24),C("click",function(){I(n);let r=E();return D(r.clearDraw())}),x(20," Leeren "),p()(),h(21,"button",25),C("click",function(){I(n);let r=E();return D(r.toggleSoftBrush())}),x(22),p()()()}if(t&2){let n=E();_(2),R("disabled",n.inferCtrl().inferRandomDisabled),_(2),R("disabled",n.inferCtrl().carouselDisabled),se("aria-pressed",n.testCarouselOn()),_(),me(" ",n.testCarouselOn()?"Testbild-Karussell aus":"Testbild-Karussell"," "),_(6),Eo("Stift ",n.penStampCells(),"\xD7",n.penStampCells(),""),_(),R("min",n.neuronalApp.inferDrawBrushSizeUi.min)("max",n.neuronalApp.inferDrawBrushSizeUi.max)("value",n.brushSize()),se("aria-valuetext","Pinselstufe "+n.brushSize()),_(5),R("disabled",n.inferCtrl().inferDrawDisabled),_(4),se("aria-pressed",n.softBrushOn()),_(),me(" ",n.softBrushOn()?"Pinsel: weich (AA)":"Pinsel: Pixel-Raster"," ")}}function Dk(t,e){if(t&1){let n=jt();h(0,"button",40),C("click",function(){let r=I(n).$implicit,o=E(2);return D(o.setTrainFilterDigit(r))}),x(1),p()}if(t&2){let n=e.$implicit,i=E(2);mt("btn-primary",i.trainFilterDigit()===n),se("aria-pressed",i.trainFilterDigit()===n),_(),me(" ",n," ")}}function Ak(t,e){t&1&&(h(0,"p",35),x(1," Noch keine Trainingsdaten geladen \u2026 "),p())}function Rk(t,e){if(t&1){let n=jt();h(0,"div",41)(1,"app-train-infer-thumb",42),C("pick",function(){let r=I(n).$implicit,o=E(2);return D(o.selectTrainForInfer(r.sampleIndex))}),p()()}if(t&2){let n=e.$implicit,i=E(2);xo("top",n.row*i.trainRowHeight,"px")("height",i.trainRowHeight,"px"),_(),R("index",n.sampleIndex)}}function Nk(t,e){if(t&1&&x(0),t&2){let n=E(2);Eo(" ",n.trainOrderedCount()," / ",n.trainCount()," Bilder ")}}function Pk(t,e){if(t&1&&x(0),t&2){let n=E(2);Ys(" ",n.trainOrderedCount()," Bilder (Ziffer ",n.trainFilterDigit(),", von ",n.trainCount()," gesamt) ")}}function Lk(t,e){if(t&1){let n=jt();h(0,"div",11)(1,"p",26),x(2," Alle geladenen Trainingsbilder \u2014 Klick setzt das Bild f\xFCr die Inferenz (wie das Zeichen-Canvas) und stoppt das Test-Karussell. "),p(),h(3,"div",27)(4,"div",28)(5,"span",29),x(6,"Sortierung"),p(),h(7,"button",30),C("click",function(){I(n);let r=E();return D(r.setTrainSortBy("index"))}),x(8," Nummer (Index) "),p(),h(9,"button",30),C("click",function(){I(n);let r=E();return D(r.setTrainSortBy("digit"))}),x(10," Ziffer zuerst "),p()(),h(11,"div",31)(12,"span",29),x(13,"Ziffer-Filter"),p(),h(14,"div",32)(15,"button",33),C("click",function(){I(n);let r=E();return D(r.setTrainFilterDigit(null))}),x(16," Alle "),p(),Xe(17,Dk,2,4,"button",34,wi),p()()(),Ve(19,Ak,2,0,"p",35),h(20,"div",36,1),C("scroll",function(r){I(n);let o=E();return D(o.onTrainGalleryScroll(r))}),h(22,"div",37),Xe(23,Rk,2,5,"div",38,Tk),p()(),h(25,"p",39),Ve(26,Nk,1,2)(27,Pk,1,3),p()()}if(t&2){let n=E();_(7),se("aria-pressed",n.trainSortBy()==="index"),_(2),se("aria-pressed",n.trainSortBy()==="digit"),_(6),mt("btn-primary",n.trainFilterDigit()===null),se("aria-pressed",n.trainFilterDigit()===null),_(2),Ye(n.trainDigitKeys),_(2),He(n.trainCount()===0?19:-1),_(3),xo("height",n.trainGalleryTotalHeight(),"px"),_(),Ye(n.visibleTrainGalleryRows()),_(3),He(n.trainFilterDigit()===null?26:27)}}var Ba=class t{store=w(he);neuronalApp=w(on);inferCtrl=ve(this.store.select(Tm),{requireSync:!0});inferPanelModel=ve(this.store.select(Am),{requireSync:!0});inferUiTab=Oe("draw");testCarouselOn=Oe(!1);softBrushOn=Oe(!1);brushSize=Oe(4);trainRowHeight=58;trainGalleryViewportPx=280;trainCount=Oe(0);trainScrollTop=Oe(0);trainSortBy=Oe("index");trainFilterDigit=Oe(null);trainDigitKeys=[0,1,2,3,4,5,6,7,8,9];trainOrderedIndices=Oe([]);trainGalleryScrollEl=_o("trainGalleryScroll");inferDrawCanvasEl=_o("inferDrawCanvas");trainOrderedCount=bt(()=>this.trainOrderedIndices().length);trainGalleryTotalHeight=bt(()=>this.trainOrderedCount()*this.trainRowHeight);visibleTrainGalleryRows=bt(()=>{let e=this.trainOrderedIndices(),n=e.length;if(n<=0)return[];let i=this.trainScrollTop(),r=this.trainGalleryViewportPx,o=this.trainRowHeight,s=Math.max(0,Math.floor(i/o)-2),a=Math.min(n-1,Math.ceil((i+r)/o)+2),l=[];for(let c=s;c<=a;c++)l.push({row:c,sampleIndex:e[c]});return l});penStampCells=bt(()=>2*Math.min(6,Math.max(0,this.brushSize()-1))+1);trainingRunning=ve(this.store.select(di),{initialValue:!1});constructor(){Un(()=>{this.trainingRunning()&&(this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1))}),Un(e=>{if(this.inferUiTab()!=="train"||(this.refreshTrainCount(),this.trainCount()>0))return;let n=window.setInterval(()=>{this.refreshTrainCount()},500);e(()=>window.clearInterval(n))}),Un(()=>{let e=this.trainCount(),n=this.trainSortBy(),i=this.trainFilterDigit();if(e<=0){this.trainOrderedIndices.set([]);return}let r;if(i===null)r=Array.from({length:e},(o,s)=>s);else{r=[];for(let o=0;o<e;o++){let s=Cr(o);s&&s.label===i&&r.push(o)}}n==="digit"&&r.sort((o,s)=>{let a=Cr(o),l=Cr(s),c=a?.label??-1,u=l?.label??-1;return c!==u?c-u:o-s}),this.trainOrderedIndices.set(r)})}ngAfterViewInit(){queueMicrotask(()=>{this.softBrushOn.set(this.neuronalApp.getInferDrawBrushMode()==="soft"),this.brushSize.set(this.neuronalApp.getInferDrawBrushSize())})}ngOnDestroy(){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1)}onTrainGalleryScroll(e){let n=e.target;this.trainScrollTop.set(n.scrollTop)}resetTrainGalleryScroll(){this.trainScrollTop.set(0);let e=this.trainGalleryScrollEl()?.nativeElement;e&&(e.scrollTop=0)}setTrainSortBy(e){this.trainSortBy()!==e&&(this.trainSortBy.set(e),this.resetTrainGalleryScroll())}setTrainFilterDigit(e){this.trainFilterDigit()!==e&&(this.trainFilterDigit.set(e),this.resetTrainGalleryScroll())}refreshTrainCount(){this.trainCount.set(cg())}selectTrainForInfer(e){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1),this.neuronalApp.onInferTrainSample(e)}inferRandom(){this.store.dispatch(S.uiInferRandomRequested())}toggleTestCarousel(){let e=this.neuronalApp.toggleTestImageCarouselState(this.testCarouselOn());e!==null&&this.testCarouselOn.set(e)}toggleSoftBrush(){let e=!this.softBrushOn();this.neuronalApp.setInferDrawBrushMode(e?"soft":"pixels"),this.softBrushOn.set(e)}onBrushSizeInput(e){let n=Number(e.target.value);this.brushSize.set(n),this.neuronalApp.setInferDrawBrushSize(n)}inferDraw(){this.store.dispatch(S.uiInferDrawRequested())}clearDraw(){this.store.dispatch(S.uiClearDrawRequested())}drawDown(e){this.neuronalApp.onDrawPointerDown(e)}drawMove(e){this.neuronalApp.onDrawPointerMove(e)}drawUp(){this.neuronalApp.onDrawPointerUp()}drawCancel(){this.neuronalApp.onDrawPointerCancel()}drawLeave(){this.neuronalApp.onDrawPointerLeave()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-infer-panel"]],viewQuery:function(n,i){n&1&&(Mo(i.trainGalleryScrollEl,Ek,5),Mo(i.inferDrawCanvasEl,Ck,5)),n&2&&Cc(2)},decls:14,vars:7,consts:[["inferDrawCanvas",""],["trainGalleryScroll",""],["id","dockInfer",1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","flex-1","flex-col","gap-3","border","shadow-xl"],[1,"card-body","min-h-0","flex","flex-1","flex-col","gap-3","p-5"],[1,"shrink-0"],[1,"card-title","text-base"],[1,"text-base-content/60","text-xs"],["role","tablist","aria-label","Inferenz-Modus",1,"tabs","tabs-boxed","bg-base-300/50","shrink-0","p-1"],["type","button","role","tab","id","tab-infer-draw","aria-controls","panel-infer-draw",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["type","button","role","tab","id","tab-infer-train","aria-controls","panel-infer-train",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["id","panel-infer-draw","role","tabpanel","aria-labelledby","tab-infer-draw",1,"flex","min-h-0","flex-1","flex-col","gap-3"],["id","panel-infer-train","role","tabpanel","aria-labelledby","tab-infer-train",1,"flex","min-h-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","flex-wrap","gap-2"],["id","btnInferRandom","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnTestCarousel","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],[1,"flex","w-full","max-w-[min(280px,100%)]","flex-col","gap-1","self-center"],[1,"text-base-content/70","flex","items-center","justify-between","gap-2","text-xs"],[1,"text-base-content","font-medium"],[1,"tabular-nums"],["type","range","step","1",1,"range","range-primary","range-sm","w-full",3,"input","min","max","value"],["id","drawCanvas","width","28","height","28",1,"border-base-300/60","h-auto","w-[min(280px,100%)]","touch-none","self-center","rounded-xl","border","bg-black","shadow-xl","[image-rendering:pixelated]",3,"contextmenu","pointerdown","pointermove","pointerup","pointercancel","pointerleave"],["id","drawActions",1,"flex","w-full","max-w-[290px]","flex-col","gap-2","self-center"],[1,"grid","grid-cols-2","gap-2"],["id","btnInferDraw","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnClearDraw","type","button",1,"btn","btn-ghost","btn-sm",3,"click"],["type","button",1,"btn","btn-ghost","btn-sm","w-full",3,"click"],[1,"text-base-content/60","shrink-0","text-xs","leading-snug"],[1,"flex","shrink-0","flex-col","gap-2"],[1,"flex","flex-wrap","items-center","gap-2"],[1,"text-base-content/70","text-[11px]"],["type","button",1,"btn","btn-outline","btn-xs","sm:btn-sm",3,"click"],[1,"flex","flex-col","gap-1"],[1,"flex","flex-wrap","gap-1"],["type","button",1,"btn","btn-xs","flex-1","min-w-10","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"btn-primary"],[1,"text-warning","shrink-0","text-xs"],[1,"border-base-300/60","min-h-0","flex-1","overflow-y-auto","rounded-lg","border",2,"max-height","min(22rem, 50vh)",3,"scroll"],[1,"relative","w-full"],[1,"absolute","box-border","w-full","px-1","py-0.5",3,"top","height"],[1,"text-base-content/50","shrink-0","text-[11px]","tabular-nums"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"click"],[1,"absolute","box-border","w-full","px-1","py-0.5"],[3,"pick","index"]],template:function(n,i){n&1&&(h(0,"article",2)(1,"div",3)(2,"div",4)(3,"h2",5),x(4,"Inferenz"),p(),h(5,"p",6),x(6," Direkt mit dem aktiven Modell testen "),p()(),h(7,"div",7)(8,"button",8),C("click",function(){return i.inferUiTab.set("draw")}),x(9," Zeichnung & Test "),p(),h(10,"button",9),C("click",function(){return i.inferUiTab.set("train")}),x(11," Trainingsbilder "),p()(),Ve(12,Ik,23,13,"div",10)(13,Lk,28,9,"div",11),p()()),n&2&&(_(8),mt("tab-active",i.inferUiTab()==="draw"),se("aria-selected",i.inferUiTab()==="draw"),_(2),mt("tab-active",i.inferUiTab()==="train"),se("aria-selected",i.inferUiTab()==="train"),_(2),He(i.inferUiTab()==="draw"?12:13))},dependencies:[Zu],encapsulation:2,changeDetection:0})};var Ok=["*"];function Fk(t,e){t&1&&xe(0,"input",1)}function kk(t,e){t&1&&xe(0,"input",2)}var Ku=class t{heading=Vs.required();defaultExpanded=Vs(!0);static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-viz-settings-block"]],inputs:{heading:[1,"heading"],defaultExpanded:[1,"defaultExpanded"]},ngContentSelectors:Ok,decls:8,vars:2,consts:[[1,"collapse","collapse-arrow","min-w-0","border","border-base-300","bg-base-100"],["type","checkbox","checked","",1,"min-h-0"],["type","checkbox",1,"min-h-0"],[1,"collapse-title","py-2","text-[0.62rem]","font-semibold","uppercase","tracking-[0.14em]"],[1,"collapse-content","text-sm"],[1,"flex","min-w-0","flex-col","gap-3","pb-1","pt-0"]],template:function(n,i){n&1&&(Dx(),h(0,"div",0),Ve(1,Fk,1,0,"input",1)(2,kk,1,0,"input",2),h(3,"div",3),x(4),p(),h(5,"div",4)(6,"div",5),Ax(7),p()()()),n&2&&(_(),He(i.defaultExpanded()?1:2),_(3),me(" ",i.heading()," "))},encapsulation:2,changeDetection:0})};var Uk=["fpsSparkline"],Vk=["vizMount"],Ju=(t,e)=>e.id;function Bk(t,e){if(t&1&&(h(0,"option",44),x(1),p()),t&2){let n=e.$implicit,i=E(2);R("value",n.id)("selected",n.id===i.model().vibeCamera.controlMode),_(),me(" ",n.label," ")}}function zk(t,e){t&1&&(h(0,"option",47),x(1," Benutzerdefiniert "),p())}function Hk(t,e){if(t&1&&(h(0,"option",48),x(1),p()),t&2){let n=e.$implicit;R("value",n.id),_(),Se(n.label)}}function Gk(t,e){if(t&1&&(h(0,"option",48),x(1),p()),t&2){let n=e.$implicit;R("value",n.id),_(),Se(n.label)}}function jk(t,e){if(t&1&&(h(0,"option",48),x(1),p()),t&2){let n=e.$implicit;R("value",n.id),_(),Se(n.label)}}function Wk(t,e){t&1&&(h(0,"option",47),x(1," Benutzerdefiniert (Farben manuell ge\xE4ndert) "),p())}function $k(t,e){if(t&1&&(h(0,"option",48),x(1),p()),t&2){let n=e.$implicit;R("value",n),_(),Se(n)}}function qk(t,e){if(t&1){let n=jt();h(0,"aside",3)(1,"app-viz-settings-block",13)(2,"div",14)(3,"label",15),x(4,"Darstellung"),p(),h(5,"select",16),C("change",function(r){I(n);let o=E();return D(o.onInputLayout(r))}),h(6,"option",17),x(7,"28\xD728 Pixel"),p(),h(8,"option",18),x(9,"Ring"),p(),h(10,"option",19),x(11,"Raster"),p(),h(12,"option",20),x(13,"Linie"),p(),h(14,"option",21),x(15,"Bogen, Richtung 1"),p(),h(16,"option",22),x(17,"Bogen, Richtung 2"),p()()(),h(18,"div",14)(19,"label",23),x(20,"Skala"),p(),h(21,"div",24)(22,"input",25),C("input",function(r){I(n);let o=E();return D(o.onInputScale(r))}),p(),h(23,"span",26),x(24),Ge(25,"number"),p()()()(),h(26,"app-viz-settings-block",27)(27,"div",14)(28,"label",28),x(29,"Darstellung"),p(),h(30,"select",29),C("change",function(r){I(n);let o=E();return D(o.onHiddenLayout(0,r))}),h(31,"option",18),x(32,"Ring"),p(),h(33,"option",19),x(34,"Raster"),p(),h(35,"option",20),x(36,"Linie"),p(),h(37,"option",21),x(38,"Bogen, Richtung 1"),p(),h(39,"option",22),x(40,"Bogen, Richtung 2"),p()()(),h(41,"div",14)(42,"label",30),x(43,"Skala"),p(),h(44,"div",24)(45,"input",31),C("input",function(r){I(n);let o=E();return D(o.onScale(0,r))}),p(),h(46,"span",26),x(47),Ge(48,"number"),p()()()(),h(49,"app-viz-settings-block",32)(50,"div",14)(51,"label",33),x(52,"Darstellung"),p(),h(53,"select",34),C("change",function(r){I(n);let o=E();return D(o.onHiddenLayout(1,r))}),h(54,"option",18),x(55,"Ring"),p(),h(56,"option",19),x(57,"Raster"),p(),h(58,"option",20),x(59,"Linie"),p(),h(60,"option",21),x(61,"Bogen, Richtung 1"),p(),h(62,"option",22),x(63,"Bogen, Richtung 2"),p()()(),h(64,"div",14)(65,"label",35),x(66,"Skala"),p(),h(67,"div",24)(68,"input",36),C("input",function(r){I(n);let o=E();return D(o.onScale(1,r))}),p(),h(69,"span",26),x(70),Ge(71,"number"),p()()()(),h(72,"app-viz-settings-block",37)(73,"div",14)(74,"label",38),x(75,"Max. Gr\xF6\xDFe aktiver Neuronen"),p(),h(76,"div",24)(77,"input",39),C("input",function(r){I(n);let o=E();return D(o.onActiveNeuronMaxMul(r))}),p(),h(78,"span",26),x(79),Ge(80,"number"),p()()()(),h(81,"app-viz-settings-block",40)(82,"div",41)(83,"div",14)(84,"label",42),x(85,"Steuerung"),p(),h(86,"select",43),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraControlMode(r))}),Xe(87,Bk,2,3,"option",44,Ju),p()(),h(89,"div",14)(90,"label",45),x(91,"Stil"),p(),h(92,"select",46),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraProfile(r))}),Ve(93,zk,2,0,"option",47),Xe(94,Hk,2,2,"option",48,Ju),p()(),h(96,"div",14)(97,"label",49),x(98,"Tempo"),p(),h(99,"div",24)(100,"input",50),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraTuning("speed",r))}),p(),h(101,"span",51),x(102),Ge(103,"number"),p()()(),h(104,"div",14)(105,"label",52),x(106,"Weitwinkel"),p(),h(107,"div",24)(108,"input",53),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraTuning("pullOut",r))}),p(),h(109,"span",26),x(110),Ge(111,"number"),p()()(),h(112,"div",14)(113,"label",54),x(114,"Pfad-Wildheit"),p(),h(115,"div",24)(116,"input",55),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraTuning("pathWildness",r))}),p(),h(117,"span",26),x(118),Ge(119,"number"),p()()(),h(120,"div",14)(121,"label",56),x(122,"Durchquerung"),p(),h(123,"div",24)(124,"input",57),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraTuning("pathTraverse",r))}),p(),h(125,"span",26),x(126),Ge(127,"number"),p()()(),h(128,"div",14)(129,"label",58),x(130,"Blick-Wanderung"),p(),h(131,"div",24)(132,"input",59),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraTuning("lookWander",r))}),p(),h(133,"span",26),x(134),Ge(135,"number"),p()()(),h(136,"div",14)(137,"label",60),x(138,"Pfad-Segmente voraus"),p(),h(139,"div",24)(140,"input",61),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraPlanning("pathQueueSize",r))}),p(),h(141,"span",62),x(142),p()()(),h(143,"div",14)(144,"label",63),x(145,"Max. Segmentl\xE4nge"),p(),h(146,"div",24)(147,"input",64),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraPlanning("maxSegmentChord",r))}),p(),h(148,"span",62),x(149),Ge(150,"number"),p()()(),h(151,"div",14)(152,"label",65),x(153,"Pfad-Radius"),p(),h(154,"div",24)(155,"input",66),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraPlanning("pathHorizonRadiusScale",r))}),p(),h(156,"span",62),x(157),Ge(158,"number"),p()()(),h(159,"label",67)(160,"span",68),x(161,"Radius-Vorschau"),p(),h(162,"input",69),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraPathHorizonSpherePreview(r))}),p()(),h(163,"label",67)(164,"span",68),x(165,"Pfad-Vorschau"),p(),h(166,"input",69),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraPathPreview(r))}),p()(),h(167,"div",14)(168,"label",70),x(169,"Pfad-Farben"),p(),h(170,"select",71),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraPathPreviewColorMode(r))}),Xe(171,Gk,2,2,"option",48,Ju),p()(),h(173,"div",14)(174,"label",72),x(175,"Theme-Farbe"),p(),h(176,"select",73),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraPathPreviewThemeColor(r))}),Xe(177,jk,2,2,"option",48,Ju),p()(),h(179,"label",67)(180,"span",68),x(181,"Pfad-Kugeln"),p(),h(182,"input",74),C("change",function(r){I(n);let o=E();return D(o.onVibeCameraPathPreviewMarkers(r))}),p()(),h(183,"div",14)(184,"label",75),x(185,"Kugelgr\xF6\xDFe"),p(),h(186,"div",24)(187,"input",76),C("input",function(r){I(n);let o=E();return D(o.onVibeCameraPlanning("pathPreviewMarkerSize",r))}),p(),h(188,"span",62),x(189),Ge(190,"number"),p()()()()(),h(191,"app-viz-settings-block",77)(192,"div",78)(193,"div",79)(194,"label",80),x(195,"Emissive"),p(),h(196,"input",81),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronEmissive",r))}),p()(),h(197,"div",14)(198,"label",82),x(199,"Intensit\xE4t (aktiv)"),p(),h(200,"div",24)(201,"input",83),C("input",function(r){I(n);let o=E();return D(o.onNetworkNumber("neuronEmissiveIntensityActive",r))}),p(),h(202,"span",62),x(203),Ge(204,"number"),p()()(),h(205,"div",14)(206,"label",84),x(207,"Intensit\xE4t (ruhend)"),p(),h(208,"div",24)(209,"input",85),C("input",function(r){I(n);let o=E();return D(o.onNetworkNumber("neuronEmissiveIntensityIdle",r))}),p(),h(210,"span",62),x(211),Ge(212,"number"),p()()()()(),h(213,"app-viz-settings-block",86)(214,"div",78)(215,"div",87)(216,"span",88),x(217,"Zwischenlagen kalt"),p(),h(218,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronHiddenCold",r))}),p()(),h(219,"div",87)(220,"span",88),x(221,"Zwischenlagen warm"),p(),h(222,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronHiddenHot",r))}),p()(),h(223,"div",87)(224,"span",88),x(225,"Eingabe kalt"),p(),h(226,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronInputCold",r))}),p()(),h(227,"div",87)(228,"span",88),x(229,"Eingabe warm"),p(),h(230,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronInputHot",r))}),p()(),h(231,"div",87)(232,"span",88),x(233,"Ausgabe kalt"),p(),h(234,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronOutputCold",r))}),p()(),h(235,"div",87)(236,"span",88),x(237,"Ausgabe warm"),p(),h(238,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("neuronOutputHot",r))}),p()()()(),h(239,"app-viz-settings-block",90)(240,"div",78)(241,"div",87)(242,"span",88),x(243,"Positiv schwach"),p(),h(244,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgePositiveCold",r))}),p()(),h(245,"div",87)(246,"span",88),x(247,"Positiv stark"),p(),h(248,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgePositiveHot",r))}),p()(),h(249,"div",87)(250,"span",88),x(251,"Negativ schwach"),p(),h(252,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgeNegativeCold",r))}),p()(),h(253,"div",87)(254,"span",88),x(255,"Negativ stark"),p(),h(256,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgeNegativeHot",r))}),p()(),h(257,"div",87)(258,"span",88),x(259,"Inferenz ausgeblendet"),p(),h(260,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgeInferMuted",r))}),p()(),h(261,"div",87)(262,"span",88),x(263,"Training (zuletzt)"),p(),h(264,"input",89),C("change",function(r){I(n);let o=E();return D(o.onNetworkColorHex("edgeTrainRecent",r))}),p()()()(),h(265,"app-viz-settings-block",91)(266,"div",41)(267,"label",67)(268,"span",68),x(269,"Bloom (Glow)"),p(),h(270,"input",69),C("change",function(r){I(n);let o=E();return D(o.onPostBool("bloomEnabled",r))}),p()(),h(271,"div",14)(272,"label",92),x(273,"Bloom-St\xE4rke"),p(),h(274,"div",24)(275,"input",93),C("input",function(r){I(n);let o=E();return D(o.onPostNumber("bloomStrength",r))}),p(),h(276,"span",51),x(277),Ge(278,"number"),p()()(),h(279,"div",14)(280,"label",92),x(281,"Bloom-Radius"),p(),h(282,"div",24)(283,"input",94),C("input",function(r){I(n);let o=E();return D(o.onPostNumber("bloomRadius",r))}),p(),h(284,"span",51),x(285),Ge(286,"number"),p()()(),h(287,"div",14)(288,"label",92),x(289,"Bloom-Schwelle"),p(),h(290,"div",24)(291,"input",94),C("input",function(r){I(n);let o=E();return D(o.onPostNumber("bloomThreshold",r))}),p(),h(292,"span",51),x(293),Ge(294,"number"),p()()(),h(295,"label",67)(296,"span",68),x(297,"FXAA (Kantengl\xE4ttung)"),p(),h(298,"input",69),C("change",function(r){I(n);let o=E();return D(o.onPostBool("fxaaEnabled",r))}),p()(),h(299,"div",14)(300,"label",92),x(301,"Belichtung (Tone mapping)"),p(),h(302,"div",24)(303,"input",95),C("input",function(r){I(n);let o=E();return D(o.onPostNumber("toneMappingExposure",r))}),p(),h(304,"span",51),x(305),Ge(306,"number"),p()()()()(),h(307,"app-viz-settings-block",96)(308,"div",97)(309,"label",98),x(310,"Vorlage f\xFCr Szene, Licht und Netzwerkfarben"),p(),h(311,"select",99),C("change",function(r){I(n);let o=E();return D(o.onColorPresetSelect(r))}),Ve(312,Wk,2,0,"option",47),h(313,"option",100),x(314,"Wie App-Theme"),p(),Xe(315,$k,2,2,"option",48,wi),p(),h(317,"p",101),x(318," Die Werte werden aus den DaisyUI-Theme-Variablen abgeleitet. Bei \u201EWie App-Theme\u201C aktualisiert sich die 3D-Palette automatisch, wenn du das App-Theme wechselst. "),p()()(),h(319,"app-viz-settings-block",102)(320,"div",78)(321,"div",79)(322,"label",103),x(323,"Hintergrund & Nebel"),p(),h(324,"input",104),C("input",function(r){I(n);let o=E();return D(o.onSceneColorInput("backgroundFog",r))})("change",function(r){I(n);let o=E();return D(o.onSceneColorCommit("backgroundFog",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(325,"div",105)(326,"label",106),x(327,"Nebel nah (Sichtbeginn)"),p(),h(328,"div",24)(329,"input",107),C("input",function(r){I(n);let o=E();return D(o.onSceneFogNumber("fogNear",r))}),p(),h(330,"span",108),x(331),Ge(332,"number"),p()()(),h(333,"div",105)(334,"label",109),x(335,"Nebel weit (Sichtende)"),p(),h(336,"div",24)(337,"input",110),C("input",function(r){I(n);let o=E();return D(o.onSceneFogNumber("fogFar",r))}),p(),h(338,"span",108),x(339),Ge(340,"number"),p()()(),h(341,"label",67)(342,"span",68),x(343,"Boden anzeigen"),p(),h(344,"input",69),C("change",function(r){I(n);let o=E();return D(o.onSceneFloorVisible(r))}),p()(),h(345,"div",79)(346,"label",111),x(347,"Bodenfarbe"),p(),h(348,"input",112),C("input",function(r){I(n);let o=E();return D(o.onSceneColorInput("floor",r))})("change",function(r){I(n);let o=E();return D(o.onSceneColorCommit("floor",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()()()(),h(349,"app-viz-settings-block",113)(350,"div",78)(351,"div",79)(352,"label",114),x(353,"Hemisph\xE4re (oben)"),p(),h(354,"input",115),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("hemiSky",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("hemiSky",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(355,"div",79)(356,"label",116),x(357,"Hemisph\xE4re (unten)"),p(),h(358,"input",117),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("hemiGround",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("hemiGround",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(359,"div",79)(360,"label",118),x(361,"Umgebungslicht"),p(),h(362,"input",119),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("ambient",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("ambient",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(363,"div",79)(364,"label",120),x(365,"Key-Licht"),p(),h(366,"input",121),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("key",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("key",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(367,"div",79)(368,"label",122),x(369,"Fill-Licht"),p(),h(370,"input",123),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("fill",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("fill",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(371,"div",79)(372,"label",124),x(373,"Rim-Licht"),p(),h(374,"input",125),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("rim",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("rim",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()(),h(375,"div",79)(376,"label",126),x(377,"Akzent hinten"),p(),h(378,"input",127),C("input",function(r){I(n);let o=E();return D(o.onLightColorInput("backAccent",r))})("change",function(r){I(n);let o=E();return D(o.onLightColorCommit("backAccent",r))})("blur",function(){I(n);let r=E();return D(r.onVizColorPickerBlur())}),p()()()()()}if(t&2){let n=E();_(5),R("value",n.model().inputLayerLayout),_(17),R("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().inputLayerScale),_(2),Se(Ze(25,98,n.model().inputLayerScale,"1.0-2")),_(6),R("value",n.model().hiddenLayerLayouts[0]),_(15),R("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[0]),_(2),Se(Ze(48,101,n.model().hiddenLayerScales[0],"1.0-2")),_(6),R("value",n.model().hiddenLayerLayouts[1]),_(15),R("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[1]),_(2),Se(Ze(71,104,n.model().hiddenLayerScales[1],"1.0-2")),_(7),R("min",n.neuronMulMin)("max",n.neuronMulMax)("step",n.neuronMulStep)("value",n.model().activeNeuronMaxScaleMul),_(2),Se(Ze(80,107,n.model().activeNeuronMaxScaleMul,"1.0-2")),_(8),Ye(n.vibeCameraControlModeEntries),_(5),R("value",n.vibeCameraProfileSelectValue()),_(),He(n.model().vibeCamera.profileMode==="custom"?93:-1),_(),Ye(n.vibeCameraProfileEntries),_(6),R("value",n.model().vibeCamera.speed),_(2),Se(Ze(103,110,n.model().vibeCamera.speed,"1.0-0")),_(6),R("value",n.model().vibeCamera.pullOut),_(2),Se(Ze(111,113,n.model().vibeCamera.pullOut,"1.0-2")),_(6),R("value",n.model().vibeCamera.pathWildness),_(2),Se(Ze(119,116,n.model().vibeCamera.pathWildness,"1.0-2")),_(6),R("value",n.model().vibeCamera.pathTraverse),_(2),Se(Ze(127,119,n.model().vibeCamera.pathTraverse,"1.0-2")),_(6),R("value",n.model().vibeCamera.lookWander),_(2),Se(Ze(135,122,n.model().vibeCamera.lookWander,"1.0-2")),_(6),R("value",n.model().vibeCamera.pathQueueSize),_(2),Se(n.model().vibeCamera.pathQueueSize),_(5),R("value",n.model().vibeCamera.maxSegmentChord),_(2),Se(Ze(150,125,n.model().vibeCamera.maxSegmentChord,"1.0-1")),_(6),R("min",n.pathHorizonRadiusMin)("max",n.pathHorizonRadiusMax)("value",n.model().vibeCamera.pathHorizonRadiusScale),_(2),Se(Ze(158,128,n.model().vibeCamera.pathHorizonRadiusScale,"1.0-2")),_(5),R("checked",n.model().vibeCamera.pathHorizonSpherePreview),_(4),R("checked",n.model().vibeCamera.pathPreview),_(4),R("disabled",!n.model().vibeCamera.pathPreview)("value",n.model().vibeCamera.pathPreviewColorMode),_(),Ye(n.vibePathPreviewColorModeEntries),_(5),R("disabled",!n.model().vibeCamera.pathPreview||n.model().vibeCamera.pathPreviewColorMode!=="themeGradient")("value",n.model().vibeCamera.pathPreviewThemeColor),_(),Ye(n.vibePathPreviewThemeColorEntries),_(5),R("checked",n.model().vibeCamera.pathPreviewMarkers)("disabled",!n.model().vibeCamera.pathPreview),_(5),R("value",n.model().vibeCamera.pathPreviewMarkerSize)("disabled",!n.model().vibeCamera.pathPreview||!n.model().vibeCamera.pathPreviewMarkers),_(2),Se(Ze(190,131,n.model().vibeCamera.pathPreviewMarkerSize,"1.0-2")),_(7),R("value",n.model().networkColors.neuronEmissive),_(5),R("value",n.model().networkColors.neuronEmissiveIntensityActive),_(2),Se(Ze(204,134,n.model().networkColors.neuronEmissiveIntensityActive,"1.0-2")),_(6),R("value",n.model().networkColors.neuronEmissiveIntensityIdle),_(2),Se(Ze(212,137,n.model().networkColors.neuronEmissiveIntensityIdle,"1.0-2")),_(7),R("value",n.model().networkColors.neuronHiddenCold),_(4),R("value",n.model().networkColors.neuronHiddenHot),_(4),R("value",n.model().networkColors.neuronInputCold),_(4),R("value",n.model().networkColors.neuronInputHot),_(4),R("value",n.model().networkColors.neuronOutputCold),_(4),R("value",n.model().networkColors.neuronOutputHot),_(6),R("value",n.model().networkColors.edgePositiveCold),_(4),R("value",n.model().networkColors.edgePositiveHot),_(4),R("value",n.model().networkColors.edgeNegativeCold),_(4),R("value",n.model().networkColors.edgeNegativeHot),_(4),R("value",n.model().networkColors.edgeInferMuted),_(4),R("value",n.model().networkColors.edgeTrainRecent),_(6),R("checked",n.model().postProcess.bloomEnabled),_(5),R("value",n.model().postProcess.bloomStrength),_(2),Se(Ze(278,140,n.model().postProcess.bloomStrength,"1.0-2")),_(6),R("value",n.model().postProcess.bloomRadius),_(2),Se(Ze(286,143,n.model().postProcess.bloomRadius,"1.0-2")),_(6),R("value",n.model().postProcess.bloomThreshold),_(2),Se(Ze(294,146,n.model().postProcess.bloomThreshold,"1.0-2")),_(5),R("checked",n.model().postProcess.fxaaEnabled),_(5),R("value",n.model().postProcess.toneMappingExposure),_(2),Se(Ze(306,149,n.model().postProcess.toneMappingExposure,"1.0-2")),_(6),R("value",n.colorPresetSelectValue()),_(),He(n.model().colorPresetMode==="custom"?312:-1),_(3),Ye(n.daisyThemeNames),_(9),R("value",n.model().sceneColors.backgroundFog),_(5),R("value",n.model().sceneColors.fogNear),_(2),Se(Ze(332,152,n.model().sceneColors.fogNear,"1.0-1")),_(6),R("value",n.model().sceneColors.fogFar),_(2),Se(Ze(340,155,n.model().sceneColors.fogFar,"1.0-0")),_(5),R("checked",n.model().sceneColors.floorVisible),_(4),R("value",n.model().sceneColors.floor)("disabled",!n.model().sceneColors.floorVisible),_(6),R("value",n.model().lightColors.hemiSky),_(4),R("value",n.model().lightColors.hemiGround),_(4),R("value",n.model().lightColors.ambient),_(4),R("value",n.model().lightColors.key),_(4),R("value",n.model().lightColors.fill),_(4),R("value",n.model().lightColors.rim),_(4),R("value",n.model().lightColors.backAccent)}}function Xk(t,e){if(t&1&&(h(0,"div",12)(1,"div",128),x(2),p(),xe(3,"canvas",129,1),p()),t&2){let n=E();_(2),me(" ",n.fpsDisplay()," FPS ")}}var za=class t{static THEME_ROTATE_MS=4200;doc=w(je);store=w(he);ngZone=w(Ae);neuronalApp=w(on);daisyThemeNames=[...Di];vibeCameraOn=Oe(!0);themeRotateOn=Oe(!1);fpsOverlayOn=Oe(!1);fpsDisplay=Oe(0);fpsHistory=Oe([]);themeRotateTimer=null;themeRotateIndex=0;fpsSmoothingAnimationFrame=0;pendingFramesPerSecond=0;fpsSparklineCanvasRef=_o("fpsSparkline");redrawFpsSparklineEffect=Un(()=>{let e=this.fpsHistory(),n=this.fpsSparklineCanvasRef();n&&queueMicrotask(()=>this.drawFpsSparkline(n.nativeElement,e))});scaleMin=Rg;scaleMax=Ng;scaleStep=zw;model=ve(this.store.select(km),{requireSync:!0});immersive=ve(this.store.select(Ea),{initialValue:!1});neuronMulMin=Lg;neuronMulMax=Og;neuronMulStep=Hw;vibeCameraProfileEntries=Object.keys(Lm).map(e=>({id:e,label:Lm[e]}));vibeCameraControlModeEntries=Object.keys(Rm).map(e=>({id:e,label:Rm[e]}));vibePathPreviewColorModeEntries=Object.keys(Nm).map(e=>({id:e,label:Nm[e]}));vibePathPreviewThemeColorEntries=Object.keys(Pm).map(e=>({id:e,label:Pm[e]}));pathHorizonRadiusMin=Om;pathHorizonRadiusMax=Fm;vizMountEl=_o("vizMount");onVizFramesPerSecondSample=e=>{this.pendingFramesPerSecond=e,this.fpsSmoothingAnimationFrame===0&&(this.fpsSmoothingAnimationFrame=requestAnimationFrame(()=>{this.fpsSmoothingAnimationFrame=0;let n=this.pendingFramesPerSecond;this.ngZone.run(()=>{this.fpsOverlayOn()&&(this.fpsDisplay.set(Math.round(n)),this.fpsHistory.update(i=>{let r=[...i,n];return r.length>96?r.slice(-96):r}))})}))};onNetworkColorHex(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizNetworkColorsPatch({patch:{[e]:i.value}}))}onNetworkNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizNetworkColorsPatch({patch:{[e]:r}}))}onPostBool(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="checkbox"||this.store.dispatch(S.vizPostProcessPatch({patch:{[e]:i.checked}}))}onPostNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizPostProcessPatch({patch:{[e]:r}}))}colorPresetSelectValue(){let e=this.model();return e.colorPresetMode==="custom"?"__custom__":e.colorPresetMode==="followUi"?"followUi":e.colorPresetFixedTheme}onColorPresetSelect(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="__custom__"){if(i==="followUi"){this.store.dispatch(S.viz3dColorPresetModeChanged({mode:"followUi"}));return}Ai(i)&&this.store.dispatch(S.viz3dColorPresetModeChanged({mode:"fixedTheme",fixedTheme:i}))}}onInputLayout(e){let n=e.target;n instanceof HTMLSelectElement&&this.store.dispatch(S.vizInputLayerLayoutChanged({raw:n.value}))}onInputScale(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(S.vizInputLayerScaleChanged({scale:i}))}onHiddenLayout(e,n){let i=n.target;i instanceof HTMLSelectElement&&this.store.dispatch(S.vizHiddenLayerLayoutChanged({index:e,raw:i.value}))}onScale(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizHiddenLayerScaleChanged({index:e,scale:r}))}onActiveNeuronMaxMul(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(S.vizActiveNeuronMaxScaleMulChanged({mul:i}))}vibeCameraProfileSelectValue(){let e=this.model().vibeCamera.profileMode;return e==="custom"?"__custom__":e}onVibeCameraControlMode(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="followPath"&&i!=="freeLook")return;let r=St(M(y({},this.model().vibeCamera),{profileMode:"custom",controlMode:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{controlMode:r.controlMode}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraProfile(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="__custom__"&&(i==="smooth"||i==="balanced"||i==="funky"||i==="rocket")){let r=mu(i);this.store.dispatch(S.vizVibeCameraProfileChanged({profile:i})),this.pushVibeCameraTuningToRuntime(r)}}onVibeCameraTuning(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);if(!Number.isFinite(r))return;let o=St(M(y({},this.model().vibeCamera),{profileMode:"custom",[e]:r}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{[e]:r}})),this.pushVibeCameraTuningToRuntime(o)}onVibeCameraPlanning(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=e==="pathQueueSize"?parseInt(i.value,10):parseFloat(i.value);if(!Number.isFinite(r))return;let o=St(M(y({},this.model().vibeCamera),{profileMode:"custom",[e]:r})),s=e==="pathQueueSize"?o.pathQueueSize:e==="maxSegmentChord"?o.maxSegmentChord:e==="pathHorizonRadiusScale"?o.pathHorizonRadiusScale:o.pathPreviewMarkerSize;this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{[e]:s}})),this.pushVibeCameraTuningToRuntime(o)}onVibeCameraPathPreviewColorMode(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="random"&&i!=="themeGradient")return;let r=St(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewColorMode:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewColorMode:r.pathPreviewColorMode}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraPathPreviewThemeColor(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="primary"&&i!=="accent"&&i!=="secondary"&&i!=="info")return;let r=St(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewThemeColor:i}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewThemeColor:r.pathPreviewThemeColor}})),this.pushVibeCameraTuningToRuntime(r)}onVibeCameraPathPreviewMarkers(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=St(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreviewMarkers:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreviewMarkers:i.pathPreviewMarkers}})),this.pushVibeCameraTuningToRuntime(i)}onVibeCameraPathHorizonSpherePreview(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=St(M(y({},this.model().vibeCamera),{profileMode:"custom",pathHorizonSpherePreview:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathHorizonSpherePreview:n.checked}})),this.pushVibeCameraTuningToRuntime(i)}onVibeCameraPathPreview(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="checkbox")return;let i=St(M(y({},this.model().vibeCamera),{profileMode:"custom",pathPreview:n.checked}));this.store.dispatch(S.vizVibeCameraTuningPatch({patch:{pathPreview:n.checked}})),this.pushVibeCameraTuningToRuntime(i)}pushVibeCameraTuningToRuntime(e){this.ngZone.runOutsideAngular(()=>{this.neuronalApp.onVibeCameraSettingsApply(e)})}onSceneColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizSceneColor(e,r)})}onSceneColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizSceneColorChanged({key:e,color:i.value}))}onSceneFogNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(S.vizSceneColorsPatch({patch:{[e]:r}}))}onSceneFloorVisible(e){let n=e.target;!(n instanceof HTMLInputElement)||n.type!=="checkbox"||this.store.dispatch(S.vizSceneColorsPatch({patch:{floorVisible:n.checked}}))}onLightColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizLightColor(e,r)})}onLightColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(S.vizLightColorChanged({key:e,color:i.value}))}onVizColorPickerBlur(){this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}ngOnDestroy(){this.clearFpsOverlayState(),this.clearThemeRotateTimer(),this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}toggleImmersive(){this.store.dispatch(S.uiVizImmersiveToggled())}toggleVibeCamera(){let e=this.neuronalApp.toggleVibeCameraState(this.vibeCameraOn());e!==null&&this.vibeCameraOn.set(e)}toggleFpsOverlay(){if(this.fpsOverlayOn()){this.clearFpsOverlayState();return}this.fpsOverlayOn.set(!0),this.fpsHistory.set([]),this.fpsDisplay.set(0),this.neuronalApp.setVizFpsOverlay(!0,this.onVizFramesPerSecondSample)}clearFpsOverlayState(){this.neuronalApp.setVizFpsOverlay(!1,null),this.fpsOverlayOn.set(!1),this.fpsSmoothingAnimationFrame!==0&&(cancelAnimationFrame(this.fpsSmoothingAnimationFrame),this.fpsSmoothingAnimationFrame=0),this.fpsHistory.set([])}drawFpsSparkline(e,n){let i=Math.min(window.devicePixelRatio,2),r=112,o=32;e.width=Math.round(r*i),e.height=Math.round(o*i),e.style.width=`${r}px`,e.style.height=`${o}px`;let s=e.getContext("2d");if(!s)return;s.setTransform(i,0,0,i,0,0),s.clearRect(0,0,r,o);let a=2,l=r-a*2,c=o-a*2;if(n.length<2){s.fillStyle="rgba(148, 163, 184, 0.15)",s.fillRect(a,a,l,c);return}let u=n.reduce((v,b)=>b>v?b:v,48),d=Math.max(u*1.08,50),m=l/Math.max(1,n.length-1),f=v=>a+c-Math.min(d,Math.max(0,v))/d*c;s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((v,b)=>{s.lineTo(a+b*m,f(v))}),s.strokeStyle="rgba(148, 163, 184, 0.95)",s.lineWidth=1,s.lineJoin="round",s.stroke(),s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((v,b)=>{s.lineTo(a+b*m,f(v))}),s.lineTo(a+l,a+c),s.lineTo(a,a+c),s.closePath(),s.fillStyle="rgba(148, 163, 184, 0.14)",s.fill()}toggleThemeRotate(){if(this.themeRotateOn()){this.clearThemeRotateTimer(),this.themeRotateOn.set(!1);return}this.themeRotateOn.set(!0);let e=xr(this.doc),n=Di.indexOf(e);this.themeRotateIndex=n>=0?n:0;let i=()=>{this.themeRotateIndex=(this.themeRotateIndex+1)%Di.length;let r=Di[this.themeRotateIndex];vu(this.doc,r),this.ngZone.run(()=>{this.store.dispatch(S.daisyUiAppThemeChanged({theme:r}))})};this.themeRotateTimer=window.setInterval(i,t.THEME_ROTATE_MS)}clearThemeRotateTimer(){this.themeRotateTimer!==null&&(window.clearInterval(this.themeRotateTimer),this.themeRotateTimer=null)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-network-viz3d-shell"]],viewQuery:function(n,i){n&1&&(Mo(i.fpsSparklineCanvasRef,Uk,5),Mo(i.vizMountEl,Vk,5)),n&2&&Cc(2)},hostAttrs:[1,"flex","min-h-0","min-w-0","flex-1","flex-col"],decls:16,vars:10,consts:[["vizMount",""],["fpsSparkline",""],[1,"relative","flex","min-h-0","min-w-0","flex-1","flex-row","bg-base-300/25"],["aria-label","3D-Netz Darstellung",1,"flex","max-h-full","min-h-0","w-[min(100%,22rem)]","max-w-[22rem]","shrink-0","flex-col","gap-3","overflow-y-auto","overflow-x-hidden","border-r","border-base-300","bg-base-200/90","px-3","py-3","text-base-content","shadow-md","backdrop-blur-md"],[1,"relative","grid","min-h-0","min-w-0","flex-1","grid-cols-1","grid-rows-[minmax(0,1fr)]"],["id","viz",1,"col-start-1","row-start-1","min-h-0","min-w-0","size-full","max-h-full"],[1,"pointer-events-none","col-start-1","row-start-1","z-10","relative","size-full"],[1,"pointer-events-auto","absolute","right-2","top-2","flex","flex-col","items-end","gap-2"],["type","button",1,"btn","btn-outline","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-secondary","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-accent","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-ghost","btn-sm","border","border-base-300/80","bg-base-100/70","shadow-lg","backdrop-blur-sm",3,"click"],["aria-live","polite",1,"absolute","bottom-2","left-2","flex","max-w-[min(100%,12rem)]","flex-col","gap-1","rounded-box","border","border-base-300/60","bg-base-100/75","px-2","py-1.5","text-[0.68rem]","shadow-lg","backdrop-blur-md"],["heading","Eingabelayer"],[1,"min-w-0"],["for","inputLayerVizLayout",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","inputLayerVizLayout",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["value","pixels"],["value","ring"],["value","grid"],["value","line"],["value","arc"],["value","arcAlt"],["for","inputLayerVizScale",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],[1,"flex","min-w-0","items-center","gap-2"],["id","inputLayerVizScale","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],[1,"text-base-content/60","w-8","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["heading","Zwischenlage 1"],["for","hiddenLayerVizLayout0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout0",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale0","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Zwischenlage 2"],["for","hiddenLayerVizLayout1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout1",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale1","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Aktivit\xE4t"],["for","activeNeuronMaxMul",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","activeNeuronMaxMul","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Kamera-Vibe"],[1,"flex","flex-col","gap-3"],["for","vibeCameraControlMode",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraControlMode",1,"select","select-bordered","select-sm","w-full",3,"change"],[3,"value","selected"],["for","vibeCameraProfile",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraProfile",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["value","__custom__","disabled",""],[3,"value"],["for","vibeCameraSpeed",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraSpeed","type","range","min","0","max","100","step","1",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-9","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["for","vibeCameraPullOut",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPullOut","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraWildness",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraWildness","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathTraverse",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathTraverse","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraLookWander",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraLookWander","type","range","min","0","max","1","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathQueueSize",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathQueueSize","type","range","min","1","max","1000","step","1",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-10","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["for","vibeCameraMaxSegmentChord",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraMaxSegmentChord","type","range","min","2","max","80","step","0.5",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vibeCameraPathHorizonRadius",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathHorizonRadius","type","range","step","0.05",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","value"],[1,"flex","cursor-pointer","items-center","justify-between","gap-2"],[1,"text-[0.68rem]","font-medium","text-base-content"],["type","checkbox",1,"toggle","toggle-primary","toggle-sm",3,"change","checked"],["for","vibeCameraPathPreviewColorMode",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathPreviewColorMode",1,"select","select-bordered","select-sm","w-full","min-w-0",3,"change","disabled","value"],["for","vibeCameraPathPreviewThemeColor",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathPreviewThemeColor",1,"select","select-bordered","select-sm","w-full","min-w-0",3,"change","disabled","value"],["type","checkbox",1,"toggle","toggle-primary","toggle-sm",3,"change","checked","disabled"],["for","vibeCameraPathMarkerSize",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vibeCameraPathMarkerSize","type","range","min","0.04","max","0.8","step","0.01",1,"range","range-primary","flex-1","min-w-0",3,"input","value","disabled"],["heading","Neuronen (Leuchten)"],[1,"flex","flex-col","gap-2.5"],[1,"flex","min-w-0","items-center","justify-between","gap-2"],["for","vizNeuronEmissive",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissive","type","color","title","Leuchtfarbe der Neuronen",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["for","vizNeuronEmissiveAct",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveAct","type","range","min","0.05","max","4","step","0.05",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["for","vizNeuronEmissiveIdle",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveIdle","type","range","min","0","max","2","step","0.02",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["heading","Neuronen (Aktivit\xE4t)"],[1,"flex","min-w-0","flex-wrap","items-center","justify-between","gap-2"],[1,"text-[0.65rem]","text-base-content/80"],["type","color",1,"border-base-300","bg-base-100","h-8","w-14","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["heading","Kanten (Gewichte)"],["heading","Nachbearbeitung"],[1,"mb-1","block","text-[0.65rem]","font-medium","text-base-content/90"],["type","range","min","0","max","3","step","0.02",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],["type","range","min","0","max","1","step","0.01",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],["type","range","min","0.2","max","3","step","0.02",1,"range","range-accent","flex-1","min-w-0",3,"input","value"],["heading","3D-Farbschema (DaisyUI)"],[1,"flex","flex-col","gap-2"],["for","viz3dColorPreset",1,"text-[0.68rem]","font-medium","text-base-content/90"],["id","viz3dColorPreset",1,"select","select-bordered","select-sm","w-full","max-w-full","text-sm",3,"change","value"],["value","followUi"],[1,"text-[0.62rem]","leading-snug","text-base-content/55"],["heading","Szene & Umgebung"],["for","vizSceneBgFog",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneBgFog","type","color","title","Hintergrund und Nebelfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],[1,"flex","flex-col","gap-1"],["for","vizSceneFogNear",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFogNear","type","range","min","0.5","max","80","step","0.5",1,"range","range-xs","range-primary","min-w-0","flex-1",3,"input","value"],[1,"text-base-content/70","w-9","shrink-0","text-right","text-[0.62rem]","tabular-nums"],["for","vizSceneFogFar",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFogFar","type","range","min","5","max","200","step","1",1,"range","range-xs","range-primary","min-w-0","flex-1",3,"input","value"],["for","vizSceneFloor",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFloor","type","color","title","Bodenfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value","disabled"],["heading","Lichtfarben"],["for","vizLightHemiSky",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiSky","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightHemiGrd",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiGrd","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightAmb",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightAmb","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightKey",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightKey","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightFill",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightFill","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightRim",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightRim","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightBack",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightBack","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],[1,"text-base-content/90","font-medium","tabular-nums","leading-none"],["width","112","height","32","aria-hidden","true",1,"block","h-8","w-28","max-w-full","rounded-sm"]],template:function(n,i){if(n&1){let r=jt();h(0,"div",2),Ve(1,qk,379,158,"aside",3),h(2,"div",4),xe(3,"div",5,0),h(5,"div",6)(6,"div",7)(7,"button",8),C("click",function(){return I(r),D(i.toggleImmersive())}),x(8),p(),h(9,"button",9),C("click",function(){return I(r),D(i.toggleVibeCamera())}),x(10),p(),h(11,"button",10),C("click",function(){return I(r),D(i.toggleThemeRotate())}),x(12),p(),h(13,"button",11),C("click",function(){return I(r),D(i.toggleFpsOverlay())}),x(14),p()(),Ve(15,Xk,5,1,"div",12),p()()()}n&2&&(_(),He(i.immersive()?-1:1),_(6),se("aria-pressed",i.immersive()),_(),me(" ",i.immersive()?"Leisten anzeigen":"Nur 3D"," "),_(),se("aria-pressed",i.vibeCameraOn()),_(),me(" ",i.vibeCameraOn()?"Kamera-Vibe aus":"Kamera-Vibe"," "),_(),se("aria-pressed",i.themeRotateOn()),_(),me(" ",i.themeRotateOn()?"Theme-Rotation aus":"Theme-Rotation"," "),_(),se("aria-pressed",i.fpsOverlayOn()),_(),me(" ",i.fpsOverlayOn()?"FPS aus":"FPS an"," "),_(),He(i.fpsOverlayOn()?15:-1))},dependencies:[gp,Ku],encapsulation:2,changeDetection:0})};var Qu=class t{store=w(he);hp=ve(this.store.select(Em),{requireSync:!0});ui=ve(this.store.select(Cm),{requireSync:!0});panel=ve(this.store.select(Dm),{requireSync:!0});datasetRibbon=ve(this.store.select(bm),{requireSync:!0});activeTitle=ve(this.store.select(Sm),{requireSync:!0});activeDetail=ve(this.store.select(wm),{requireSync:!0});epochHint=ve(this.store.select(Mm),{requireSync:!0});saveAs(){this.store.dispatch(S.uiSaveAsRequested())}reset(){this.store.dispatch(S.uiResetRequested())}epochPreset(e){this.store.dispatch(S.uiEpochPresetRequested({epochs:e}))}epochsInput(e){let n=e.target.value;this.store.dispatch(S.uiEpochsInputChanged({raw:n}))}batchSizeInput(e){let n=e.target.value;this.store.dispatch(S.uiBatchSizeInputChanged({raw:n}))}lrInput(e){let n=e.target.value;this.store.dispatch(S.uiTrainLrInputChanged({raw:n}))}vizEveryInput(e){let n=e.target.value;this.store.dispatch(S.uiTrainVizEveryInputChanged({raw:n}))}trainStart(){this.store.dispatch(S.uiTrainStartRequested())}pauseToggle(){this.store.dispatch(S.trainingPauseToggled())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-training-panel"]],decls:48,vars:41,consts:[["id","dockTrain","aria-label","Training",1,"border-base-300","bg-base-200","rounded-box","flex","w-full","min-w-0","shrink-0","flex-wrap","items-center","gap-x-3","gap-y-2","border","px-3","py-2","shadow-sm"],["aria-live","polite",1,"text-base-content/70","max-w-[11rem]","truncate","text-xs","sm:max-w-[14rem]"],[1,"border-base-300/50","flex","min-w-0","max-w-[14rem]","flex-col","gap-0.5","border-l","pl-3","sm:max-w-[18rem]"],[1,"text-base-content","truncate","text-sm","font-semibold"],[1,"text-base-content/60","truncate","text-xs","leading-snug"],[1,"border-base-300/50","flex","flex-wrap","items-center","gap-2","border-l","pl-3"],["id","btnSaveModelAs","type","button","title","Als neuen Stand speichern",1,"btn","btn-outline","btn-xs","sm:btn-sm",3,"click","disabled"],["id","btnResetModel","type","button","title","Gewichte zur\xFCcksetzen",1,"btn","btn-ghost","btn-xs","sm:btn-sm",3,"click","disabled"],[1,"text-base-content/60","text-[0.65rem]","font-semibold","uppercase","tracking-wide"],["id","epochPresetRow",1,"join","join-horizontal","flex-wrap"],["type","button",1,"epochPresetBtn","btn","join-item","btn-outline","btn-xs","sm:btn-sm",3,"click","disabled"],["for","epochsInput",1,"sr-only"],["id","epochsInput","type","number","min","1","max","200","step","1",1,"input","input-bordered","input-xs","w-14","sm:input-sm","sm:w-16",3,"input","disabled","value"],["aria-live","polite",1,"text-base-content/60","hidden","max-w-[10rem]","truncate","text-[0.65rem]","lg:block","xl:max-w-[14rem]"],["id","btnTrain","type","button",1,"btn","btn-primary","btn-sm",3,"click","disabled"],["id","btnPause","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","trainAdvanced",1,"border-base-300/60","bg-base-300/30","rounded-btn","border"],[1,"text-base-content/70","cursor-pointer","px-2","py-1.5","text-xs","sm:px-3","sm:py-2","sm:text-sm"],[1,"border-base-300/40","grid","grid-cols-2","gap-x-3","gap-y-2","border-t","px-2","pb-2","pt-2","text-sm","sm:px-3","sm:pb-3"],["for","lrInput",1,"text-base-content/60","self-center","text-xs"],["id","lrInput","type","number","min","0.0001","max","1","step","0.0001",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","batchSizeInput",1,"text-base-content/60","self-center","text-xs"],["id","batchSizeInput","type","number","min","1","max","512","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","vizEveryInput",1,"text-base-content/60","self-center","text-xs"],["id","vizEveryInput","type","number","min","1","max","1000","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"]],template:function(n,i){n&1&&(h(0,"article",0)(1,"p",1),x(2),p(),h(3,"div",2)(4,"p",3),x(5),p(),h(6,"p",4),x(7),p()(),h(8,"div",5)(9,"button",6),C("click",function(){return i.saveAs()}),x(10," Speichern "),p(),h(11,"button",7),C("click",function(){return i.reset()}),x(12," Zur\xFCcksetzen "),p()(),h(13,"div",5)(14,"span",8),x(15,"Epochen"),p(),h(16,"div",9)(17,"button",10),C("click",function(){return i.epochPreset(1)}),x(18," 1 "),p(),h(19,"button",10),C("click",function(){return i.epochPreset(3)}),x(20," 3 "),p(),h(21,"button",10),C("click",function(){return i.epochPreset(10)}),x(22," 10 "),p(),h(23,"button",10),C("click",function(){return i.epochPreset(30)}),x(24," 30 "),p()(),h(25,"label",11),x(26,"Anzahl Epochen (1\u2013200)"),p(),h(27,"input",12),C("input",function(o){return i.epochsInput(o)}),p(),h(28,"p",13),x(29),p()(),h(30,"div",5)(31,"button",14),C("click",function(){return i.trainStart()}),x(32," Starten "),p(),h(33,"button",15),C("click",function(){return i.pauseToggle()}),x(34),p()(),h(35,"details",16)(36,"summary",17),x(37," Erweitert "),p(),h(38,"div",18)(39,"label",19),x(40,"Lernrate"),p(),h(41,"input",20),C("input",function(o){return i.lrInput(o)}),p(),h(42,"label",21),x(43,"Batch"),p(),h(44,"input",22),C("input",function(o){return i.batchSizeInput(o)}),p(),h(45,"label",23),x(46,"3D alle N Batches"),p(),h(47,"input",24),C("input",function(o){return i.vizEveryInput(o)}),p()()()()),n&2&&(_(),se("title",i.datasetRibbon()),_(),me(" ",i.datasetRibbon()," "),_(3),me(" ",i.activeTitle()," "),_(),se("title",i.activeDetail()),_(),me(" ",i.activeDetail()," "),_(2),R("disabled",i.ui().saveDisabled),_(2),R("disabled",i.ui().resetDisabled),_(2),se("title",i.epochHint()),_(4),mt("btn-primary",i.hp().epochs===1)("btn-outline",i.hp().epochs!==1),R("disabled",i.ui().trainFormLocked),_(2),mt("btn-primary",i.hp().epochs===3)("btn-outline",i.hp().epochs!==3),R("disabled",i.ui().trainFormLocked),_(2),mt("btn-primary",i.hp().epochs===10)("btn-outline",i.hp().epochs!==10),R("disabled",i.ui().trainFormLocked),_(2),mt("btn-primary",i.hp().epochs===30)("btn-outline",i.hp().epochs!==30),R("disabled",i.ui().trainFormLocked),_(4),R("disabled",i.ui().trainFormLocked)("value",i.hp().epochs),_(),se("title",i.epochHint()),_(),me(" ",i.epochHint()," "),_(2),R("disabled",i.ui().trainDisabled),_(2),R("disabled",i.ui().pauseDisabled),_(),me(" ",i.panel().pause?"Weiter":"Pause"," "),_(7),R("disabled",i.ui().trainFormLocked)("value",i.hp().lr),_(3),R("disabled",i.ui().trainFormLocked)("value",i.hp().batchSize),_(3),R("disabled",i.ui().trainFormLocked)("value",i.hp().vizEveryNBatches))},encapsulation:2,changeDetection:0})};function rM(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,'<span class="badge badge-primary badge-sm mx-0.5 font-semibold tabular-nums">$1</span>')}var ed=class t{sanitizer=w(Tp);transform(e){return this.sanitizer.bypassSecurityTrustHtml(rM(e??""))}static \u0275fac=function(n){return new(n||t)};static \u0275pipe=Ec({name:"neuronalStatusRich",type:t,pure:!0})};var td=class t{store=w(he);statusPlain=ve(this.store.select(xm),{requireSync:!0});static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-workspace-status"]],decls:5,vars:3,consts:[[1,"flex","w-full","min-w-0","flex-col","gap-2"],[1,"text-base-content/60","text-[0.62rem]","font-semibold","uppercase","tracking-widest"],["id","status","role","status","aria-live","polite","aria-atomic","true",1,"rounded-box","border-base-300","bg-base-300/30","font-mono","text-sm","leading-relaxed","tracking-tight","text-base-content/80","block","min-h-[2.5rem]","w-full","whitespace-pre-wrap","break-words","border","p-3","shadow-inner",3,"innerHTML"]],template:function(n,i){n&1&&(h(0,"div",0)(1,"span",1),x(2,"Aktueller Zustand"),p(),xe(3,"span",2),Ge(4,"neuronalStatusRich"),p()),n&2&&(_(3),R("innerHTML",Lx(4,1,i.statusPlain()),D_))},dependencies:[ed],encapsulation:2,changeDetection:0})};function Yk(t,e){t&1&&(h(0,"div",1)(1,"div",6),xe(2,"app-training-panel")(3,"app-workspace-status"),p()())}function Zk(t,e){t&1&&(h(0,"section",5)(1,"div",7),xe(2,"app-infer-panel")(3,"app-epoch-track-list"),p()())}var nd=class t{vizShell;inferPanel;store=w(he);headerModel=ve(this.store.select(vm),{initialValue:null});immersive=ve(this.store.select(Ea),{initialValue:!1});workspaceContentGridClass=bt(()=>this.immersive()?"grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)]":"grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] xl:grid-rows-[minmax(0,1fr)]");neuronalApp=w(on);appInstance=w(Li);router=w(qt);teardown=null;bindGen=0;ngAfterViewInit(){this.bootstrapRuntime()}modelWorkspacePathMatches(){return nM(this.router.url)}waitForModelWorkspaceRouterPath(e){return Z(this,null,function*(){e===this.bindGen&&(this.modelWorkspacePathMatches()||(yield xs(this.router.events.pipe(pe(n=>n instanceof Lt),pe(()=>e===this.bindGen&&this.modelWorkspacePathMatches()),qe(1)))))})}waitForRuntimeSurfaces(e){return Z(this,null,function*(){let n=performance.now()+8e3;for(;;){if(e!==this.bindGen)throw new Error("aborted");let i=this.vizShell?.vizMountEl()?.nativeElement,r=this.inferPanel?.inferDrawCanvasEl()?.nativeElement;if(i&&r)return{vizMount:i,inferDrawCanvas:r};if(performance.now()>n)throw new Error("surfaces-timeout");yield new Promise(o=>requestAnimationFrame(()=>o()))}})}bootstrapRuntime(){return Z(this,null,function*(){let e=++this.bindGen;try{if(yield this.waitForModelWorkspaceRouterPath(e),e!==this.bindGen)return;let n=yield this.waitForRuntimeSurfaces(e);if(e!==this.bindGen)return;let i=yield this.neuronalApp.bindRuntime(n,this.appInstance);if(e!==this.bindGen){i();return}this.teardown=i}catch{this.router.navigate(["/"])}})}ngOnDestroy(){this.bindGen++,this.teardown?.(),this.teardown=null}onDocumentPointerDown(e){let n=e.target;if(!(n instanceof Node))return;let i=document.getElementById("modelDropdownButton"),r=document.getElementById("modelDropdownMenu");i&&r&&(n===i||i.contains(n)||r.contains(n))||this.store.dispatch(S.modelDropdownSetOpen({open:!1}))}onDocumentKeydown(e){if(e.key==="Escape"){if(this.immersive()){this.store.dispatch(S.uiVizImmersiveToggled());return}this.store.dispatch(S.modelDropdownSetOpen({open:!1}))}}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-neuronal-workspace"]],viewQuery:function(n,i){if(n&1&&(Xs(za,5),Xs(Ba,5)),n&2){let r;So(r=wo())&&(i.vizShell=r.first),So(r=wo())&&(i.inferPanel=r.first)}},hostBindings:function(n,i){n&1&&C("pointerdown",function(o){return i.onDocumentPointerDown(o)},!1,zh)("keydown",function(o){return i.onDocumentKeydown(o)},!1,zh)},decls:8,vars:16,consts:[["id","app",1,"bg-base-100","text-base-content","flex","min-h-0","flex-1","flex-col"],["role","region","aria-label","Modell-Arbeitsbereich",1,"border-base-300/60","bg-base-100","flex","shrink-0","flex-col","gap-2","border-b","px-3","py-2","sm:px-4","sm:py-3"],[1,"grid","h-full","min-h-0","min-w-0","grid-rows-[minmax(0,1fr)]","gap-3"],["aria-label","Netzwerk-Visualisierung",1,"flex","h-full","min-h-0","min-w-0","flex-col","overflow-hidden"],[1,"card-body","flex","min-h-0","flex-1","flex-col","p-0"],["aria-label","Epochen und Inferenz",1,"flex","min-h-0","flex-col","gap-3"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-col","min-h-0","gap-3","overflow-hidden"]],template:function(n,i){n&1&&(h(0,"div",0),Ve(1,Yk,4,0,"div",1),h(2,"div")(3,"main",2)(4,"section",3)(5,"div",4),xe(6,"app-network-viz3d-shell"),p()()(),Ve(7,Zk,4,0,"section",5),p()()),n&2&&(_(),He(i.immersive()?-1:1),_(),wx(i.workspaceContentGridClass()),_(2),mt("card",!i.immersive())("border-base-300",!i.immersive())("bg-base-200",!i.immersive())("rounded-box",!i.immersive())("border",!i.immersive())("shadow-xl",!i.immersive()),_(3),He(i.immersive()?-1:7))},dependencies:[td,za,Qu,Yu,Ba],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}"]})};var oM=[{path:"",component:xu,children:[{path:"",pathMatch:"full",component:Xu},{path:"model/new",pathMatch:"full",redirectTo:""},{path:"model/:modelId",canActivate:[iM],component:nd}]},{path:"**",redirectTo:""}];var cM="@ngrx/router-store/request",PZ=ui(cM,ee()),Gg="@ngrx/router-store/navigation",LZ=ui(Gg,ee()),jg="@ngrx/router-store/cancel",OZ=ui(jg,ee()),Wg="@ngrx/router-store/error",FZ=ui(Wg,ee()),uM="@ngrx/router-store/navigated",kZ=ui(uM,ee());function dM(t,e){let n=e;switch(n.type){case Gg:case Wg:case jg:return{state:n.payload.routerState,navigationId:n.payload.event.id};default:return t}}var id=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:typeof e.routeConfig.title=="string"?e.routeConfig.title:void 0}:null,queryParams:e.queryParams,fragment:e.fragment,firstChild:n[0],children:n}}},$g=function(t){return t[t.PreActivation=1]="PreActivation",t[t.PostActivation=2]="PostActivation",t}($g||{}),Kk="router",sM=new A("@ngrx/router-store Internal Configuration"),fM=new A("@ngrx/router-store Configuration"),qg=function(t){return t[t.Full=0]="Full",t[t.Minimal=1]="Minimal",t}(qg||{});function Jk(t){return y({stateKey:Kk,serializer:id,navigationActionTiming:$g.PreActivation},t)}var rd=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,paramMap:e.paramMap,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{component:e.routeConfig.component,path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:e.routeConfig.title}:null,queryParams:e.queryParams,queryParamMap:e.queryParamMap,fragment:e.fragment,component:e.routeConfig?e.routeConfig.component:void 0,root:void 0,parent:void 0,firstChild:n[0],pathFromRoot:void 0,children:n}}},od=class{},$n=function(t){return t[t.NONE=1]="NONE",t[t.ROUTER=2]="ROUTER",t[t.STORE=3]="STORE",t}($n||{}),aM=(()=>{class t{constructor(n,i,r,o,s,a){this.store=n,this.router=i,this.serializer=r,this.errorHandler=o,this.config=s,this.activeRuntimeChecks=a,this.lastEvent=null,this.routerState=null,this.trigger=$n.NONE,this.stateKey=this.config.stateKey,!cm()&&sr()&&(a?.strictActionSerializability||a?.strictStateSerializability)&&this.serializer instanceof rd&&console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer."),this.setUpStoreStateListener(),this.setUpRouterEventsListener()}setUpStoreStateListener(){this.store.pipe(am(this.stateKey),Ue(this.store)).subscribe(([n,i])=>{this.navigateIfNeeded(n,i)})}navigateIfNeeded(n,i){if(!n||!n.state||this.trigger===$n.ROUTER||this.lastEvent instanceof Hn)return;let r=n.state.url;Qk(this.router.url,r)||(this.storeState=i,this.trigger=$n.STORE,this.router.navigateByUrl(r).catch(o=>{this.errorHandler.handleError(o)}))}setUpRouterEventsListener(){let n=this.config.navigationActionTiming===$g.PostActivation,i;this.router.events.pipe(Ue(this.store)).subscribe(([r,o])=>{this.lastEvent=r,r instanceof Hn?(this.routerState=this.serializer.serialize(this.router.routerState.snapshot),this.trigger!==$n.STORE&&(this.storeState=o,this.dispatchRouterRequest(r))):r instanceof Ti?(i=r,!n&&this.trigger!==$n.STORE&&this.dispatchRouterNavigation(r)):r instanceof tn?(this.dispatchRouterCancel(r),this.reset()):r instanceof li?(this.dispatchRouterError(r),this.reset()):r instanceof Lt&&(this.trigger!==$n.STORE&&(n&&this.dispatchRouterNavigation(i),this.dispatchRouterNavigated(r)),this.reset())})}dispatchRouterRequest(n){this.dispatchRouterAction(cM,{event:n})}dispatchRouterNavigation(n){let i=this.serializer.serialize(n.state);this.dispatchRouterAction(Gg,{routerState:i,event:new Ti(n.id,n.url,n.urlAfterRedirects,i)})}dispatchRouterCancel(n){this.dispatchRouterAction(jg,{storeState:this.storeState,event:n})}dispatchRouterError(n){this.dispatchRouterAction(Wg,{storeState:this.storeState,event:new li(n.id,n.url,`${n}`)})}dispatchRouterNavigated(n){let i=this.serializer.serialize(this.router.routerState.snapshot);this.dispatchRouterAction(uM,{event:n,routerState:i})}dispatchRouterAction(n,i){this.trigger=$n.ROUTER;try{this.store.dispatch({type:n,payload:M(y({routerState:this.routerState},i),{event:this.config.routerState===qg.Full?i.event:{id:i.event.id,url:i.event.url,urlAfterRedirects:i.event.urlAfterRedirects}})})}finally{this.trigger=$n.NONE}}reset(){this.trigger=$n.NONE,this.storeState=null,this.routerState=null}static{this.\u0275fac=function(i){return new(i||t)(L(he),L(qt),L(od),L(_t),L(fM),L(pr))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function Qk(t,e){return lM(t)===lM(e)}function lM(t){return t?.length>0&&t[t.length-1]==="/"?t.substring(0,t.length-1):t}function hM(t={}){return At([{provide:sM,useValue:t},{provide:fM,useFactory:Jk,deps:[sM]},{provide:od,useClass:t.serializer?t.serializer:t.routerState===qg.Full?rd:id},tr(()=>w(aM)),aM])}var Ga="PERFORM_ACTION",e3="REFRESH",_M="RESET",xM="ROLLBACK",bM="COMMIT",SM="SWEEP",wM="TOGGLE_ACTION",t3="SET_ACTIONS_ACTIVE",MM="JUMP_TO_STATE",EM="JUMP_TO_ACTION",sv="IMPORT_STATE",CM="LOCK_CHANGES",TM="PAUSE_RECORDING",es=class{constructor(e,n){if(this.action=e,this.timestamp=n,this.type=Ga,typeof e.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Xg=class{constructor(){this.type=e3}},Yg=class{constructor(e){this.timestamp=e,this.type=_M}},Zg=class{constructor(e){this.timestamp=e,this.type=xM}},Kg=class{constructor(e){this.timestamp=e,this.type=bM}},Jg=class{constructor(){this.type=SM}},Qg=class{constructor(e){this.id=e,this.type=wM}};var ev=class{constructor(e){this.index=e,this.type=MM}},tv=class{constructor(e){this.actionId=e,this.type=EM}},nv=class{constructor(e){this.nextLiftedState=e,this.type=sv}},iv=class{constructor(e){this.status=e,this.type=CM}},rv=class{constructor(e){this.status=e,this.type=TM}};var cd=new A("@ngrx/store-devtools Options"),pM=new A("@ngrx/store-devtools Initial Config");function IM(){return null}var n3="NgRx Store DevTools";function i3(t){let e={maxAge:!1,monitor:IM,actionSanitizer:void 0,stateSanitizer:void 0,name:n3,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},n=typeof t=="function"?t():t,i=n.logOnly?{pause:!0,export:!0,test:!0}:!1,r=n.features||i||e.features;r.import===!0&&(r.import="custom");let o=Object.assign({},e,{features:r},n);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function mM(t,e){return t.filter(n=>e.indexOf(n)<0)}function DM(t){let{computedStates:e,currentStateIndex:n}=t;if(n>=e.length){let{state:r}=e[e.length-1];return r}let{state:i}=e[n];return i}function Ha(t){return new es(t,+Date.now())}function r3(t,e){return Object.keys(e).reduce((n,i)=>{let r=Number(i);return n[r]=AM(t,e[r],r),n},{})}function AM(t,e,n){return M(y({},e),{action:t(e.action,n)})}function o3(t,e){return e.map((n,i)=>({state:RM(t,n.state,i),error:n.error}))}function RM(t,e,n){return t(e,n)}function NM(t){return t.predicate||t.actionsSafelist||t.actionsBlocklist}function s3(t,e,n,i){let r=[],o={},s=[];return t.stagedActionIds.forEach((a,l)=>{let c=t.actionsById[a];c&&(l&&av(t.computedStates[l],c,e,n,i)||(o[a]=c,r.push(a),s.push(t.computedStates[l])))}),M(y({},t),{stagedActionIds:r,actionsById:o,computedStates:s})}function av(t,e,n,i,r){let o=n&&!n(t,e.action),s=i&&!e.action.type.match(i.map(l=>gM(l)).join("|")),a=r&&e.action.type.match(r.map(l=>gM(l)).join("|"));return o||s||a}function gM(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function PM(t){return{ngZone:t?w(Ae):null,connectInZone:t}}var ud=(()=>{class t extends Gn{static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=rr(t)))(r||t)}})()}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),sd={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},ov=new A("@ngrx/store-devtools Redux Devtools Extension"),LM=(()=>{class t{constructor(n,i,r){this.config=i,this.dispatcher=r,this.zoneConfig=PM(this.config.connectInZone),this.devtoolsExtension=n,this.createActionStreams()}notify(n,i){if(this.devtoolsExtension)if(n.type===Ga){if(i.isLocked||i.isPaused)return;let r=DM(i);if(NM(this.config)&&av(r,n,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let o=this.config.stateSanitizer?RM(this.config.stateSanitizer,r,i.currentStateIndex):r,s=this.config.actionSanitizer?AM(this.config.actionSanitizer,n,i.nextActionId):n;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,o))}else{let r=M(y({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?r3(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?o3(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new le(n=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(r=>n.next(r)),i.unsubscribe}):ze}createActionStreams(){let n=this.createChangesObservable().pipe(Yd()),i=n.pipe(pe(c=>c.type===sd.START)),r=n.pipe(pe(c=>c.type===sd.STOP)),o=n.pipe(pe(c=>c.type===sd.DISPATCH),G(c=>this.unwrapAction(c.payload)),Tt(c=>c.type===sv?this.dispatcher.pipe(pe(u=>u.type===fu),zd(1e3),Wr(1e3),G(()=>c),Kt(()=>X(c)),qe(1)):X(c))),a=n.pipe(pe(c=>c.type===sd.ACTION),G(c=>this.unwrapAction(c.payload))).pipe(Gi(r)),l=o.pipe(Gi(r));this.start$=i.pipe(Gi(r)),this.actions$=this.start$.pipe(lt(()=>a)),this.liftedActions$=this.start$.pipe(lt(()=>l))}unwrapAction(n){return typeof n=="string"?(0,eval)(`(${n})`):n}getExtensionConfig(n){let i={name:n.name,features:n.features,serialize:n.serialize,autoPause:n.autoPause??!1,trace:n.trace??!1,traceLimit:n.traceLimit??75};return n.maxAge!==!1&&(i.maxAge=n.maxAge),i}sendToReduxDevtools(n){try{n()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}static{this.\u0275fac=function(i){return new(i||t)(L(ov),L(cd),L(ud))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),ld={type:Sa},a3="@ngrx/store-devtools/recompute",l3={type:a3};function OM(t,e,n,i,r){if(i)return{state:n,error:"Interrupted by an error up the chain"};let o=n,s;try{o=t(n,e)}catch(a){s=a.toString(),r.handleError(a)}return{state:o,error:s}}function ad(t,e,n,i,r,o,s,a,l){if(e>=t.length&&t.length===o.length)return t;let c=t.slice(0,e),u=o.length-(l?1:0);for(let d=e;d<u;d++){let m=o[d],f=r[m].action,v=c[d-1],b=v?v.state:i,N=v?v.error:void 0,H=s.indexOf(m)>-1?v:OM(n,f,b,N,a);c.push(H)}return l&&c.push(t[t.length-1]),c}function c3(t,e){return{monitorState:e(void 0,{}),nextActionId:1,actionsById:{0:Ha(ld)},stagedActionIds:[0],skippedActionIds:[],committedState:t,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function u3(t,e,n,i,r={}){return o=>(s,a)=>{let{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:N,isPaused:P}=s||e;s||(c=Object.create(c));function H(O){let W=O,F=d.slice(1,W+1);for(let _e=0;_e<F.length;_e++)if(b[_e+1].error){W=_e,F=d.slice(1,W+1);break}else delete c[F[_e]];m=m.filter(_e=>F.indexOf(_e)===-1),d=[0,...d.slice(W+1)],f=b[W].state,b=b.slice(W),v=v>W?v-W:0}function fe(){c={0:Ha(ld)},u=1,d=[0],m=[],f=b[v].state,v=0,b=[]}let B=0;switch(a.type){case CM:{N=a.status,B=1/0;break}case TM:{P=a.status,P?(d=[...d,u],c[u]=new es({type:"@ngrx/devtools/pause"},+Date.now()),u++,B=d.length-1,b=b.concat(b[b.length-1]),v===d.length-2&&v++,B=1/0):fe();break}case _M:{c={0:Ha(ld)},u=1,d=[0],m=[],f=t,v=0,b=[];break}case bM:{fe();break}case xM:{c={0:Ha(ld)},u=1,d=[0],m=[],v=0,b=[];break}case wM:{let{id:O}=a;m.indexOf(O)===-1?m=[O,...m]:m=m.filter(F=>F!==O),B=d.indexOf(O);break}case t3:{let{start:O,end:W,active:F}=a,_e=[];for(let Ut=O;Ut<W;Ut++)_e.push(Ut);F?m=mM(m,_e):m=[...m,..._e],B=d.indexOf(O);break}case MM:{v=a.index,B=1/0;break}case EM:{let O=d.indexOf(a.actionId);O!==-1&&(v=O),B=1/0;break}case SM:{d=mM(d,m),m=[],v=Math.min(v,d.length-1);break}case Ga:{if(N)return s||e;if(P||s&&av(s.computedStates[v],a,r.predicate,r.actionsSafelist,r.actionsBlocklist)){let W=b[b.length-1];b=[...b.slice(0,-1),OM(o,a.action,W.state,W.error,n)],B=1/0;break}r.maxAge&&d.length===r.maxAge&&H(1),v===d.length-1&&v++;let O=u++;c[O]=a,d=[...d,O],B=d.length-1;break}case sv:{({monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:N,isPaused:P}=a.nextLiftedState);break}case Sa:{B=0,r.maxAge&&d.length>r.maxAge&&(b=ad(b,B,o,f,c,d,m,n,P),H(d.length-r.maxAge),B=1/0);break}case fu:{if(b.filter(W=>W.error).length>0)B=0,r.maxAge&&d.length>r.maxAge&&(b=ad(b,B,o,f,c,d,m,n,P),H(d.length-r.maxAge),B=1/0);else{if(!P&&!N){v===d.length-1&&v++;let W=u++;c[W]=new es(a,+Date.now()),d=[...d,W],B=d.length-1,b=ad(b,B,o,f,c,d,m,n,P)}b=b.map(W=>M(y({},W),{state:o(W.state,l3)})),v=d.length-1,r.maxAge&&d.length>r.maxAge&&H(d.length-r.maxAge),B=1/0}break}default:{B=1/0;break}}return b=ad(b,B,o,f,c,d,m,n,P),l=i(l,a),{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:m,committedState:f,currentStateIndex:v,computedStates:b,isLocked:N,isPaused:P}}}var vM=(()=>{class t{constructor(n,i,r,o,s,a,l,c){let u=c3(l,c.monitor),d=u3(l,u,a,c.monitor,c),m=Bi(Bi(i.asObservable().pipe(Xr(1)),o.actions$).pipe(G(Ha)),n,o.liftedActions$).pipe(un(_s)),f=r.pipe(G(d)),v=PM(c.connectInZone),b=new vs(1);this.liftedStateSubscription=m.pipe(Ue(f),yM(v),Hi(({state:H},[fe,B])=>{let O=B(H,fe);return fe.type!==Ga&&NM(c)&&(O=s3(O,c.predicate,c.actionsSafelist,c.actionsBlocklist)),o.notify(fe,O),{state:O,action:fe}},{state:u,action:null})).subscribe(({state:H,action:fe})=>{if(b.next(H),fe.type===Ga){let B=fe.action;s.next(B)}}),this.extensionStartSubscription=o.start$.pipe(yM(v)).subscribe(()=>{this.refresh()});let N=b.asObservable(),P=N.pipe(G(DM));Object.defineProperty(P,"state",{value:ve(P,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=n,this.liftedState=N,this.state=P}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(n){this.dispatcher.next(n)}next(n){this.dispatcher.next(n)}error(n){}complete(){}performAction(n){this.dispatch(new es(n,+Date.now()))}refresh(){this.dispatch(new Xg)}reset(){this.dispatch(new Yg(+Date.now()))}rollback(){this.dispatch(new Zg(+Date.now()))}commit(){this.dispatch(new Kg(+Date.now()))}sweep(){this.dispatch(new Jg)}toggleAction(n){this.dispatch(new Qg(n))}jumpToAction(n){this.dispatch(new tv(n))}jumpToState(n){this.dispatch(new ev(n))}importState(n){this.dispatch(new nv(n))}lockChanges(n){this.dispatch(new iv(n))}pauseRecording(n){this.dispatch(new rv(n))}static{this.\u0275fac=function(i){return new(i||t)(L(ud),L(Gn),L(mr),L(LM),L(gr),L(_t),L(wa),L(cd))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();function yM({ngZone:t,connectInZone:e}){return n=>e?new le(i=>n.subscribe({next:r=>t.run(()=>i.next(r)),error:r=>t.run(()=>i.error(r)),complete:()=>t.run(()=>i.complete())})):n}var d3=new A("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function f3(t,e){return!!t||e.monitor!==IM}function h3(){let t="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[t]<"u"?window[t]:null}function p3(t){return t.state}function FM(t={}){return At([LM,ud,vM,{provide:pM,useValue:t},{provide:d3,deps:[ov,cd],useFactory:f3},{provide:ov,useFactory:h3},{provide:cd,deps:[pM],useFactory:i3},{provide:zo,deps:[vM],useFactory:p3},{provide:Bo,useExisting:ud}])}var m3=new hi,kM=t=>(e,n)=>{let i=t(e,n);return(n.type===S.modelStoreHydrated.type||n.type===S.modelEntryUpserted.type||n.type===S.activeModelIdSet.type||n.type===S.activeModelIdFromRouteSet.type)&&m3.saveCollection(i.neuronal.modelCollection),i};function kt(t){return Math.max(0,Math.min(255,Math.round(t)))}function ts(t){let e=t.trim();return e.endsWith("%")?kt(parseFloat(e)/100*255):kt(parseFloat(e))}function g3(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);if(n){let o=ts(n[1]),s=ts(n[2]),a=ts(n[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let i=e.match(/^rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*([\d.%]+))?\s*\)$/i);if(i){let o=ts(i[1]),s=ts(i[2]),a=ts(i[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let r=e.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);if(r){let o=kt(parseFloat(r[1])*255),s=kt(parseFloat(r[2])*255),a=kt(parseFloat(r[3])*255);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}return/^#[0-9A-Fa-f]{6}$/i.test(e)?e.toLowerCase():/^#[0-9A-Fa-f]{8}$/i.test(e)?e.slice(0,7).toLowerCase():null}function v3(t,e){let n=e.trim();if(!n)return null;let i=t.createElement("canvas");i.width=1,i.height=1;let r=i.getContext("2d",{willReadFrequently:!0});if(!r)return null;try{r.clearRect(0,0,1,1),r.fillStyle=n,r.fillRect(0,0,1,1);let o=r.getImageData(0,0,1,1).data;if(o[3]<16)return null;let s=o[0],a=o[1],l=o[2];return`#${((1<<24)+(s<<16)+(a<<8)+l).toString(16).slice(1)}`}catch{return null}}function UM(t,e){let n=e.trim();if(!n)return null;let i=g3(n);return i||v3(t,n)}function j(t,e,n){let i=parseInt(t.slice(1),16),r=parseInt(e.slice(1),16),o=i>>16&255,s=i>>8&255,a=i&255,l=r>>16&255,c=r>>8&255,u=r&255,d=Math.max(0,Math.min(1,n)),m=kt(o+(l-o)*d),f=kt(s+(c-s)*d),v=kt(a+(u-a)*d);return`#${((1<<24)+(m<<16)+(f<<8)+v).toString(16).slice(1)}`}function Ct(t,e){let n=parseInt(t.slice(1),16),i=(n>>16&255)*e,r=(n>>8&255)*e,o=(n&255)*e;return`#${((1<<24)+(kt(i)<<16)+(kt(r)<<8)+kt(o)).toString(16).slice(1)}`}function sn(t,e){let n=parseInt(t.slice(1),16),i=kt((n>>16&255)+(255-(n>>16&255))*e),r=kt((n>>8&255)+(255-(n>>8&255))*e),o=kt((n&255)+(255-(n&255))*e);return`#${((1<<24)+(i<<16)+(r<<8)+o).toString(16).slice(1)}`}function ns(t,e,n){return j(t,e,Math.max(0,Math.min(1,n)))}function Zt(t,e,n){let i=t.body;if(!i)return"#808080";let r=t.createElement("div");r.setAttribute("data-theme",e),r.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none",r.style.color=`var(${n})`,i.appendChild(r);let o=t.defaultView?.getComputedStyle(r),s=o?UM(t,o.color):null,a=o?.getPropertyValue(n).trim()??"",l=a?UM(t,a):null;return i.removeChild(r),s??l??"#808080"}function y3(t,e){let n=t,i=e;Wo(n.backgroundFog)<.06&&(n=M(y({},n),{backgroundFog:sn(n.backgroundFog,.2),floor:sn(n.floor,.16)}));let o=Wo(n.backgroundFog),s=Wo(i.neuronEmissive);return o<.16&&s<.16&&Math.abs(o-s)<.048&&(i=Ra(i,{neuronEmissive:sn(i.neuronEmissive,.38),neuronHiddenCold:sn(i.neuronHiddenCold,.38*.85),neuronHiddenHot:sn(i.neuronHiddenHot,.38*.45),neuronInputCold:sn(i.neuronInputCold,.38*.85),neuronOutputCold:sn(i.neuronOutputCold,.38*.75),edgeInferMuted:sn(i.edgeInferMuted,.38*.55)})),{sceneColors:n,networkColors:i}}function VM(t,e){let n=Zt(t,e,"--color-base-100"),i=Zt(t,e,"--color-base-200"),r=Zt(t,e,"--color-base-300"),o=Zt(t,e,"--color-base-content"),s=Zt(t,e,"--color-primary"),a=Zt(t,e,"--color-primary-content"),l=Zt(t,e,"--color-secondary"),c=Zt(t,e,"--color-accent"),u=Zt(t,e,"--color-info"),d=Zt(t,e,"--color-warning"),m=Zt(t,e,"--color-error"),f=Zt(t,e,"--color-neutral"),v=Zt(t,e,"--color-neutral-content"),b=Wo(n),N=Wo(o),P=b<.38&&N>b+.12,H=M(y({},P?{backgroundFog:ns(j(r,i,.35),j(r,s,.14),.55),floor:ns(j(r,i,.5),j(r,f,.12),.35)}:{backgroundFog:Ct(ns(j(j(r,o,.26),j(r,f,.14),.52),j(s,o,.55),.14),.9),floor:Ct(j(j(r,o,.2),j(r,j(f,s,.08),.35),.48),.93)}),{fogNear:jo.fogNear,fogFar:jo.fogFar}),fe=Da(jo,H),B=P?{hemiSky:ns(j(n,j(n,u,.22),.55),s,.12),hemiGround:j(r,j(i,f,.18),.42),ambient:j(j(r,i,.35),j(o,s,.1),.5),key:ns(j(s,a,.38),n,.22),fill:j(j(l,r,.45),j(l,u,.15),.35),rim:j(c,j(n,c,.55),.4),backAccent:j(u,j(s,v,.25),.35)}:{hemiSky:Ct(ns(j(j(r,o,.12),j(i,r,.55),.38),j(u,s,.4),.2),.94),hemiGround:Ct(j(r,j(f,j(o,r,.25),.28),.5),.92),ambient:Ct(j(j(r,o,.18),j(f,j(s,r,.1),.15),.45),.93),key:Ct(j(s,j(a,r,.42),.45),.94),fill:Ct(j(l,j(r,j(u,o,.12),.28),.42),.93),rim:Ct(j(c,j(r,j(l,o,.12),.3),.4),.93),backAccent:Ct(j(u,j(r,j(c,s,.22),.24),.38),.92)},O=P?{toneMappingExposure:Mr.toneMappingExposure,bloomStrength:Mr.bloomStrength,bloomThreshold:Mr.bloomThreshold,bloomRadius:Mr.bloomRadius}:{toneMappingExposure:.78,bloomStrength:.14,bloomThreshold:.62,bloomRadius:.32},W=Ra(Aa,{neuronEmissive:s,neuronHiddenCold:Ct(s,.72),neuronHiddenHot:sn(j(s,c,.45),.35),neuronInputCold:Ct(s,.75),neuronInputHot:sn(o,.45),neuronOutputCold:Ct(j(s,u,.35),.82),neuronOutputHot:sn(j(c,u,.5),.25),edgePositiveCold:Ct(d,.42),edgePositiveHot:d,edgeNegativeCold:Ct(u,.38),edgeNegativeHot:sn(u,.18),edgeInferMuted:Ct(j(r,o,.3),.55),edgeTrainRecent:j(d,m,.35)}),{sceneColors:F,networkColors:_e}=y3(fe,W);return{sceneColors:{backgroundFog:F.backgroundFog,floor:F.floor,fogNear:F.fogNear,fogFar:F.fogFar},lightColors:B,networkColors:_e,postProcessPatch:O}}function lv(t,e){let n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=t,r.rel="noopener",document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(i)}var dd=class t{store=w(he);actions$=w(Su);zone=w(Ae);doc=w(je);app=w(Li);neuronalApp=w(on);modelsIdb=w(hi);epochsIdb=w(wr);viz3dBootstrapDaisySync$=we(()=>X(S.viz3dColorsSyncFromDaisyRequested()));viz3dDaisyPaletteSync$=we(()=>this.actions$.pipe(Me(S.daisyUiAppThemeChanged,S.viz3dColorsSyncFromDaisyRequested,S.viz3dColorPresetModeChanged),Ue(this.store.select(xn)),ke(([e,n])=>{if(n.viz3d.colorPresetMode==="custom")return ze;if("theme"in e&&n.viz3d.colorPresetMode!=="followUi")return ze;let i=n.viz3d.colorPresetMode==="fixedTheme"?n.viz3d.colorPresetFixedTheme:"theme"in e?e.theme:xr(this.doc),r=VM(this.doc,i);return X(S.viz3dDaisyPaletteApplied({sceneColors:r.sceneColors,lightColors:r.lightColors,networkColors:r.networkColors,postProcessPatch:r.postProcessPatch}))})));viz3dDaisyPaletteAppliedToRuntime$=we(()=>this.actions$.pipe(Me(S.viz3dDaisyPaletteApplied),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors),this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors),this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors),this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});modelStoreFromIdbLoad$=we(()=>this.actions$.pipe(Me(S.modelStoreLoadRequested),zi(()=>Fe(Z(this,null,function*(){Qw(),ZS(),yield JS();let[e,n]=yield Promise.all([this.modelsIdb.loadCollection(),this.epochsIdb.loadEpochStore()]);return{modelCollection:e,epochStore:n}})).pipe(lt(({modelCollection:e,epochStore:n})=>X(S.epochStoreHydrated({byModelId:y({},n.byModelId)}),S.modelStoreHydrated({modelCollection:e})))))));newModelFromToolbar$=we(()=>this.actions$.pipe(Me(S.newModelFromToolbarRequested),Ue(this.store.select(di)),pe(([,e])=>!e),K(()=>{this.app.newModelFromToolbar()})),{dispatch:!1});newModelFromListRequested$=we(()=>this.actions$.pipe(Me(S.newModelFromListRequested),Ue(this.store.select(di)),pe(([,e])=>!e),Tt(()=>{let e=Cu();return Fe([S.lastTrainMetricsReset(),S.modelEntryUpserted({entry:e}),S.epochViewSyncFromModel({modelId:e.id})])})));activeModelFromToolbar$=we(()=>this.actions$.pipe(Me(S.activeModelFromToolbarRequested),Ue(this.store.select(di)),pe(([e,n])=>!n&&e.id.length>0),un(Zn),K(([e])=>{this.app.activeModelFromToolbar(e.id)})),{dispatch:!1});uiTrainStart$=we(()=>this.actions$.pipe(Me(S.uiTrainStartRequested),K(()=>{this.neuronalApp.onTrain()})),{dispatch:!1});uiSaveAs$=we(()=>this.actions$.pipe(Me(S.uiSaveAsRequested),K(()=>{this.neuronalApp.onSaveAs()})),{dispatch:!1});uiReset$=we(()=>this.actions$.pipe(Me(S.uiResetRequested),K(()=>{this.neuronalApp.onReset()})),{dispatch:!1});uiInferRandom$=we(()=>this.actions$.pipe(Me(S.uiInferRandomRequested),K(()=>{this.neuronalApp.onInferRandom()})),{dispatch:!1});uiInferDraw$=we(()=>this.actions$.pipe(Me(S.uiInferDrawRequested),K(()=>{this.neuronalApp.onInferDraw()})),{dispatch:!1});uiClearDraw$=we(()=>this.actions$.pipe(Me(S.uiClearDrawRequested),K(()=>{this.neuronalApp.onClearDraw()})),{dispatch:!1});uiDrawPointerDown$=we(()=>this.actions$.pipe(Me(S.uiDrawPointerDown),K(({event:e})=>{this.neuronalApp.onDrawPointerDown(e)})),{dispatch:!1});uiDrawPointerMove$=we(()=>this.actions$.pipe(Me(S.uiDrawPointerMove),K(({event:e})=>{this.neuronalApp.onDrawPointerMove(e)})),{dispatch:!1});uiDrawPointerUp$=we(()=>this.actions$.pipe(Me(S.uiDrawPointerUp),K(()=>{this.neuronalApp.onDrawPointerUp()})),{dispatch:!1});uiDrawPointerCancel$=we(()=>this.actions$.pipe(Me(S.uiDrawPointerCancel),K(()=>{this.neuronalApp.onDrawPointerCancel()})),{dispatch:!1});uiDrawPointerLeave$=we(()=>this.actions$.pipe(Me(S.uiDrawPointerLeave),K(()=>{this.neuronalApp.onDrawPointerLeave()})),{dispatch:!1});vizInputLayerLayout$=we(()=>this.actions$.pipe(Me(S.vizInputLayerLayoutChanged),K(({raw:e})=>{this.neuronalApp.onInputLayerLayoutChange(e)})),{dispatch:!1});vizInputLayerScale$=we(()=>this.actions$.pipe(Me(S.vizInputLayerScaleChanged),K(({scale:e})=>{this.neuronalApp.onInputLayerLayoutScaleChange(e)})),{dispatch:!1});vizHiddenLayerLayout$=we(()=>this.actions$.pipe(Me(S.vizHiddenLayerLayoutChanged),K(({index:e,raw:n})=>{this.neuronalApp.onHiddenLayerLayoutChange(e,n)})),{dispatch:!1});vizHiddenLayerScale$=we(()=>this.actions$.pipe(Me(S.vizHiddenLayerScaleChanged),K(({index:e,scale:n})=>{this.neuronalApp.onHiddenLayerLayoutScaleChange(e,n)})),{dispatch:!1});vizActiveNeuronMaxScaleMul$=we(()=>this.actions$.pipe(Me(S.vizActiveNeuronMaxScaleMulChanged),K(({mul:e})=>{this.neuronalApp.onActiveNeuronMaxScaleMulChange(e)})),{dispatch:!1});vizSceneColor$=we(()=>this.actions$.pipe(Me(S.vizSceneColorChanged),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors)})})),{dispatch:!1});vizSceneColorsPatch$=we(()=>this.actions$.pipe(Me(S.vizSceneColorsPatch),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors)})})),{dispatch:!1});vizLightColor$=we(()=>this.actions$.pipe(Me(S.vizLightColorChanged),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors)})})),{dispatch:!1});vizNetworkColors$=we(()=>this.actions$.pipe(Me(S.vizNetworkColorsPatch),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors)})})),{dispatch:!1});vizPostProcess$=we(()=>this.actions$.pipe(Me(S.vizPostProcessPatch),Ue(this.store.select(xn)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});vizVibeCamera$=we(()=>this.actions$.pipe(Me(S.vizVibeCameraProfileChanged,S.vizVibeCameraTuningPatch),Ue(this.store.select(Um)),K(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVibeCameraSettingsApply(e)})})),{dispatch:!1});uiExportBundle$=we(()=>this.actions$.pipe(Me(S.uiExportBundleRequested),Ue(this.store.select(xn)),K(([,e])=>{lv("neuronal3d-models.json",e.modelCollection),lv("neuronal3d-epochs.json",{version:1,byModelId:e.epochByModelId})})),{dispatch:!1});persistEpoch$=we(()=>this.store.select(pm).pipe(Xr(1),Wr(200),K(e=>{this.epochsIdb.saveEpochStore({version:1,byModelId:e})})),{dispatch:!1});static \u0275fac=function(n){return new(n||t)};static \u0275prov=k({token:t,factory:t.\u0275fac})};var _3=()=>({version:3,activeModelId:null,models:[]});function x3(){return{inputLayerLayout:Ag,inputLayerScale:Hu,hiddenLayerLayouts:["ring","ring"],hiddenLayerScales:[Hu,Hu],activeNeuronMaxScaleMul:Gw,colorPresetMode:"followUi",colorPresetFixedTheme:_r,sceneColors:y({},jo),lightColors:y({},Du),networkColors:y({},Aa),postProcess:y({},Mr),vibeCamera:y({},Be)}}function fd(t,e){let n=e.activeModelId;return n?[...t[n]??[]]:[]}function BM(){let t=_3(),e={};return{modelCollection:t,modelStoreHydrated:!1,epochByModelId:e,epochDisplayRows:fd(e,t),viz3d:x3(),trainHyperparams:y({},Go),runtimeStatusPlain:"",runtimeKernelCaps:{hasNet:!1,mnistTrainCount:0,mnistTestCount:0},training:{running:!1,pause:!1,shouldStop:!1,currentRun:0,currentRunStartedAt:"",currentRunStartedMs:0},lastTrainLoss:0,lastTrainBatchAcc:0,modelDropdownOpen:!1,vizImmersiveUi:!1}}function b3(t){return zu.includes(t)?t:null}function S3(t){return Fa.includes(t)?t:null}function w3(t,e,n){let r=[...t[e]??[],n];return r.length>500&&r.splice(0,r.length-500),M(y({},t),{[e]:r})}function M3(t,e){let n=[...t.models],i=n.findIndex(r=>r.id===e.id);return i>=0?n[i]=e:n.unshift(e),M(y({},t),{activeModelId:e.id,models:n})}function cv(t,e){return[...t.epochByModelId[e]??[]]}var E3=BM(),zM=TS(E3,de(S.modelStoreHydrated,(t,{modelCollection:e})=>M(y({},t),{modelCollection:e,modelStoreHydrated:!0,epochDisplayRows:fd(t.epochByModelId,e)})),de(S.epochStoreHydrated,(t,{byModelId:e})=>M(y({},t),{epochByModelId:y({},e),epochDisplayRows:fd(e,t.modelCollection)})),de(S.activeModelIdSet,S.activeModelIdFromRouteSet,(t,{id:e})=>M(y({},t),{modelCollection:M(y({},t.modelCollection),{activeModelId:e}),epochDisplayRows:cv(t,e)})),de(S.modelEntryUpserted,(t,{entry:e})=>{let n=t.modelCollection.models.some(r=>r.id===e.id),i=M3(t.modelCollection,e);return M(y({},t),{modelCollection:i,epochDisplayRows:n?t.epochDisplayRows:cv(t,e.id)})}),de(S.epochViewSyncFromModel,(t,{modelId:e})=>{if(!e)return M(y({},t),{epochDisplayRows:[]});let n=t.epochByModelId[e]??[];return M(y({},t),{epochDisplayRows:[...n]})}),de(S.epochHistoryCleared,(t,{modelId:e})=>{let n=y({},t.epochByModelId);delete n[e];let i=t.modelCollection.activeModelId;return M(y({},t),{epochByModelId:n,epochDisplayRows:i===e?[]:t.epochDisplayRows})}),de(S.trainingStarted,(t,e)=>M(y({},t),{training:M(y({},t.training),{running:!0,shouldStop:!1,pause:!1,currentRun:e.run,currentRunStartedAt:e.runStartedAt,currentRunStartedMs:e.runStartedMs}),epochDisplayRows:cv(t,e.modelId),modelDropdownOpen:!1})),de(S.trainingEpochAppended,(t,{modelId:e,row:n})=>{let i=w3(t.epochByModelId,e,n);return M(y({},t),{epochByModelId:i,epochDisplayRows:[...t.epochDisplayRows,n]})}),de(S.trainingFinished,(t,{lastTrainLoss:e,lastTrainBatchAcc:n})=>M(y({},t),{lastTrainLoss:e,lastTrainBatchAcc:n,training:M(y({},t.training),{running:!1,shouldStop:!1,pause:!1})})),de(S.trainingStopRequested,t=>M(y({},t),{training:M(y({},t.training),{shouldStop:!0})})),de(S.trainingPauseToggled,t=>M(y({},t),{training:M(y({},t.training),{pause:!t.training.pause})})),de(S.uiModelDropdownToggleRequested,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0?t:M(y({},t),{modelDropdownOpen:!t.modelDropdownOpen})),de(S.activeModelFromToolbarRequested,t=>M(y({},t),{modelDropdownOpen:!1})),de(S.modelDropdownSetOpen,(t,{open:e})=>M(y({},t),{modelDropdownOpen:e})),de(S.lastTrainMetricsReset,t=>M(y({},t),{lastTrainLoss:0,lastTrainBatchAcc:0})),de(S.vizInputLayerLayoutChanged,(t,{raw:e})=>{let n=b3(e);return n?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerLayout:n})}):t}),de(S.vizInputLayerScaleChanged,(t,{scale:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerScale:Pg(e)})}):t),de(S.vizHiddenLayerLayoutChanged,(t,{index:e,raw:n})=>{let i=S3(n);if(!i)return t;let r=[t.viz3d.hiddenLayerLayouts[0],t.viz3d.hiddenLayerLayouts[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerLayouts:r})})}),de(S.vizHiddenLayerScaleChanged,(t,{index:e,scale:n})=>{if(!Number.isFinite(n))return t;let i=Pg(n),r=[t.viz3d.hiddenLayerScales[0],t.viz3d.hiddenLayerScales[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerScales:r})})}),de(S.vizActiveNeuronMaxScaleMulChanged,(t,{mul:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{activeNeuronMaxScaleMul:jw(e)})}):t),de(S.vizSceneColorChanged,(t,{key:e,color:n})=>!Yt(n)||e!=="backgroundFog"&&e!=="floor"?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",sceneColors:M(y({},t.viz3d.sceneColors),{[e]:n})})})),de(S.vizSceneColorsPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",sceneColors:Da(t.viz3d.sceneColors,e)})})),de(S.vizLightColorChanged,(t,{key:e,color:n})=>!Yt(n)||!(e in Du)?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",lightColors:M(y({},t.viz3d.lightColors),{[e]:n})})})),de(S.vizNetworkColorsPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:nw(e)?"custom":t.viz3d.colorPresetMode,networkColors:Ra(t.viz3d.networkColors,e)})})),de(S.viz3dColorPresetModeChanged,(t,{mode:e,fixedTheme:n})=>{if(e==="followUi")return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"followUi"})});let i=n&&Ai(n)?n:_r;return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"fixedTheme",colorPresetFixedTheme:i})})}),de(S.viz3dDaisyPaletteApplied,(t,{sceneColors:e,lightColors:n,networkColors:i,postProcessPatch:r})=>M(y({},t),{viz3d:M(y({},t.viz3d),{sceneColors:Da(t.viz3d.sceneColors,e),lightColors:y({},n),networkColors:y({},i),postProcess:Wm(t.viz3d.postProcess,r)})})),de(S.vizPostProcessPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{postProcess:Wm(t.viz3d.postProcess,e)})})),de(S.vizVibeCameraProfileChanged,(t,{profile:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{vibeCamera:mu(e)})})),de(S.vizVibeCameraTuningPatch,(t,{patch:e})=>{let n=y(y({},t.viz3d.vibeCamera??Be),e),i=n.profileMode!=="custom"&&FS(n.profileMode,n)?n.profileMode:"custom";return M(y({},t),{viz3d:M(y({},t.viz3d),{vibeCamera:M(y({},n),{profileMode:i})})})}),de(S.uiVizImmersiveToggled,t=>M(y({},t),{vizImmersiveUi:!t.vizImmersiveUi})),de(S.runtimeStatusPlainSet,(t,{plain:e})=>M(y({},t),{runtimeStatusPlain:e})),de(S.runtimeKernelCapsUpdated,(t,{caps:e})=>M(y({},t),{runtimeKernelCaps:y({},e)})),de(S.trainHyperparamsPatch,(t,{patch:e})=>M(y({},t),{trainHyperparams:yr(t.trainHyperparams,e)})),de(S.uiEpochPresetRequested,(t,{epochs:e})=>M(y({},t),{trainHyperparams:yr(t.trainHyperparams,{epochs:Number.isFinite(e)?Math.min(200,Math.max(1,Math.floor(e))):t.trainHyperparams.epochs})})),de(S.uiEpochsInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:yr(t.trainHyperparams,{epochs:Number.isFinite(n)?n:t.trainHyperparams.epochs})})}),de(S.uiBatchSizeInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:yr(t.trainHyperparams,{batchSize:Number.isFinite(n)?n:t.trainHyperparams.batchSize})})}),de(S.uiTrainLrInputChanged,(t,{raw:e})=>{let n=Number.parseFloat(e);return M(y({},t),{trainHyperparams:yr(t.trainHyperparams,{lr:Number.isFinite(n)?n:t.trainHyperparams.lr})})}),de(S.uiTrainVizEveryInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:yr(t.trainHyperparams,{vizEveryNBatches:Number.isFinite(n)?n:t.trainHyperparams.vizEveryNBatches})})}));var HM={providers:[CS(void 0,{metaReducers:[kM]}),fm("neuronal",zM),fm("router",dM),GS([dd]),...sr()?[FM({maxAge:30,trace:!1})]:[],Ux({eventCoalescing:!0}),Kp(oM),hM()]};var hd=class t{constructor(){w(he).dispatch(S.modelStoreLoadRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Te({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(n,i){n&1&&xe(0,"router-outlet")},dependencies:[hr],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"]})};US(window);Cp(hd,HM).catch(t=>console.error(t));
