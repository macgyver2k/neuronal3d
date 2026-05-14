var GM=Object.defineProperty,jM=Object.defineProperties;var WM=Object.getOwnPropertyDescriptors;var Zg=Object.getOwnPropertySymbols;var $M=Object.prototype.hasOwnProperty,qM=Object.prototype.propertyIsEnumerable;var Kg=(t,e,n)=>e in t?GM(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,y=(t,e)=>{for(var n in e||={})$M.call(e,n)&&Kg(t,n,e[n]);if(Zg)for(var n of Zg(e))qM.call(e,n)&&Kg(t,n,e[n]);return t},M=(t,e)=>jM(t,WM(e));var X=(t,e,n)=>new Promise((i,r)=>{var o=l=>{try{a(n.next(l))}catch(c){r(c)}},s=l=>{try{a(n.throw(l))}catch(c){r(c)}},a=l=>l.done?i(l.value):Promise.resolve(l.value).then(o,s);a((n=n.apply(t,e)).next())});function cd(t,e){return Object.is(t,e)}var Ze=null,Va=!1,ud=1,Ut=Symbol("SIGNAL");function ae(t){let e=Ze;return Ze=t,e}function dd(){return Ze}var Ar={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ns(t){if(Va)throw new Error("");if(Ze===null)return;Ze.consumerOnSignalRead(t);let e=Ze.nextProducerIndex++;if(ja(Ze),e<Ze.producerNode.length&&Ze.producerNode[e]!==t&&ts(Ze)){let n=Ze.producerNode[e];Ga(n,Ze.producerIndexOfThis[e])}Ze.producerNode[e]!==t&&(Ze.producerNode[e]=t,Ze.producerIndexOfThis[e]=ts(Ze)?Qg(t,Ze,e):0),Ze.producerLastReadVersion[e]=t.version}function Jg(){ud++}function fd(t){if(!(ts(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===ud)){if(!t.producerMustRecompute(t)&&!Ha(t)){ld(t);return}t.producerRecomputeValue(t),ld(t)}}function hd(t){if(t.liveConsumerNode===void 0)return;let e=Va;Va=!0;try{for(let n of t.liveConsumerNode)n.dirty||XM(n)}finally{Va=e}}function pd(){return Ze?.consumerAllowSignalWrites!==!1}function XM(t){t.dirty=!0,hd(t),t.consumerMarkedDirty?.(t)}function ld(t){t.dirty=!1,t.lastCleanEpoch=ud}function is(t){return t&&(t.nextProducerIndex=0),ae(t)}function za(t,e){if(ae(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(ts(t))for(let n=t.nextProducerIndex;n<t.producerNode.length;n++)Ga(t.producerNode[n],t.producerIndexOfThis[n]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Ha(t){ja(t);for(let e=0;e<t.producerNode.length;e++){let n=t.producerNode[e],i=t.producerLastReadVersion[e];if(i!==n.version||(fd(n),i!==n.version))return!0}return!1}function rs(t){if(ja(t),ts(t))for(let e=0;e<t.producerNode.length;e++)Ga(t.producerNode[e],t.producerIndexOfThis[e]);t.producerNode.length=t.producerLastReadVersion.length=t.producerIndexOfThis.length=0,t.liveConsumerNode&&(t.liveConsumerNode.length=t.liveConsumerIndexOfThis.length=0)}function Qg(t,e,n){if(ev(t),t.liveConsumerNode.length===0&&tv(t))for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=Qg(t.producerNode[i],t,i);return t.liveConsumerIndexOfThis.push(n),t.liveConsumerNode.push(e)-1}function Ga(t,e){if(ev(t),t.liveConsumerNode.length===1&&tv(t))for(let i=0;i<t.producerNode.length;i++)Ga(t.producerNode[i],t.producerIndexOfThis[i]);let n=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[n],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[n],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let i=t.liveConsumerIndexOfThis[e],r=t.liveConsumerNode[e];ja(r),r.producerIndexOfThis[i]=e}}function ts(t){return t.consumerIsAlwaysLive||(t?.liveConsumerNode?.length??0)>0}function ja(t){t.producerNode??=[],t.producerIndexOfThis??=[],t.producerLastReadVersion??=[]}function ev(t){t.liveConsumerNode??=[],t.liveConsumerIndexOfThis??=[]}function tv(t){return t.producerNode!==void 0}function Wa(t,e){let n=Object.create(YM);n.computation=t,e!==void 0&&(n.equal=e);let i=()=>{if(fd(n),ns(n),n.value===Ba)throw n.error;return n.value};return i[Ut]=n,i}var sd=Symbol("UNSET"),ad=Symbol("COMPUTING"),Ba=Symbol("ERRORED"),YM=M(y({},Ar),{value:sd,dirty:!0,error:null,equal:cd,kind:"computed",producerMustRecompute(t){return t.value===sd||t.value===ad},producerRecomputeValue(t){if(t.value===ad)throw new Error("Detected cycle in computations.");let e=t.value;t.value=ad;let n=is(t),i,r=!1;try{i=t.computation(),ae(null),r=e!==sd&&e!==Ba&&i!==Ba&&t.equal(e,i)}catch(o){i=Ba,t.error=o}finally{za(t,n)}if(r){t.value=e;return}t.value=i,t.version++}});function ZM(){throw new Error}var nv=ZM;function iv(t){nv(t)}function md(t){nv=t}var KM=null;function gd(t,e){let n=Object.create($a);n.value=t,e!==void 0&&(n.equal=e);let i=()=>(ns(n),n.value);return i[Ut]=n,i}function os(t,e){pd()||iv(t),t.equal(t.value,e)||(t.value=e,JM(t))}function vd(t,e){pd()||iv(t),os(t,e(t.value))}var $a=M(y({},Ar),{equal:cd,value:void 0,kind:"signal"});function JM(t){t.version++,Jg(),hd(t),KM?.()}function yd(t){let e=ae(null);try{return t()}finally{ae(e)}}var _d;function ss(){return _d}function $n(t){let e=_d;return _d=t,e}var qa=Symbol("NotFound");function Z(t){return typeof t=="function"}function pi(t){let n=t(i=>{Error.call(i),i.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Xa=pi(t=>function(n){t(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Li(t,e){if(t){let n=t.indexOf(e);0<=n&&t.splice(n,1)}}var Be=class t{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let o of n)o.remove(this);else n.remove(this);let{initialTeardown:i}=this;if(Z(i))try{i()}catch(o){e=o instanceof Xa?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{rv(o)}catch(s){e=e??[],s instanceof Xa?e=[...e,...s.errors]:e.push(s)}}if(e)throw new Xa(e)}}add(e){var n;if(e&&e!==this)if(this.closed)rv(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(e)}}_hasParent(e){let{_parentage:n}=this;return n===e||Array.isArray(n)&&n.includes(e)}_addParent(e){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(e),n):n?[n,e]:e}_removeParent(e){let{_parentage:n}=this;n===e?this._parentage=null:Array.isArray(n)&&Li(n,e)}remove(e){let{_finalizers:n}=this;n&&Li(n,e),e instanceof t&&e._removeParent(this)}};Be.EMPTY=(()=>{let t=new Be;return t.closed=!0,t})();var xd=Be.EMPTY;function Ya(t){return t instanceof Be||t&&"closed"in t&&Z(t.remove)&&Z(t.add)&&Z(t.unsubscribe)}function rv(t){Z(t)?t():t.unsubscribe()}var on={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Rr={setTimeout(t,e,...n){let{delegate:i}=Rr;return i?.setTimeout?i.setTimeout(t,e,...n):setTimeout(t,e,...n)},clearTimeout(t){let{delegate:e}=Rr;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Za(t){Rr.setTimeout(()=>{let{onUnhandledError:e}=on;if(e)e(t);else throw t})}function qn(){}var ov=bd("C",void 0,void 0);function sv(t){return bd("E",void 0,t)}function av(t){return bd("N",t,void 0)}function bd(t,e,n){return{kind:t,value:e,error:n}}var Oi=null;function Nr(t){if(on.useDeprecatedSynchronousErrorHandling){let e=!Oi;if(e&&(Oi={errorThrown:!1,error:null}),t(),e){let{errorThrown:n,error:i}=Oi;if(Oi=null,n)throw i}}else t()}function lv(t){on.useDeprecatedSynchronousErrorHandling&&Oi&&(Oi.errorThrown=!0,Oi.error=t)}var Fi=class extends Be{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,Ya(e)&&e.add(this)):this.destination=rE}static create(e,n,i){return new sn(e,n,i)}next(e){this.isStopped?wd(av(e),this):this._next(e)}error(e){this.isStopped?wd(sv(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?wd(ov,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},nE=Function.prototype.bind;function Sd(t,e){return nE.call(t,e)}var Md=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:n}=this;if(n.next)try{n.next(e)}catch(i){Ka(i)}}error(e){let{partialObserver:n}=this;if(n.error)try{n.error(e)}catch(i){Ka(i)}else Ka(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(n){Ka(n)}}},sn=class extends Fi{constructor(e,n,i){super();let r;if(Z(e)||!e)r={next:e??void 0,error:n??void 0,complete:i??void 0};else{let o;this&&on.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Sd(e.next,o),error:e.error&&Sd(e.error,o),complete:e.complete&&Sd(e.complete,o)}):r=e}this.destination=new Md(r)}};function Ka(t){on.useDeprecatedSynchronousErrorHandling?lv(t):Za(t)}function iE(t){throw t}function wd(t,e){let{onStoppedNotification:n}=on;n&&Rr.setTimeout(()=>n(t,e))}var rE={closed:!0,next:qn,error:iE,complete:qn};var Pr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function ot(t){return t}function Ed(...t){return Cd(t)}function Cd(t){return t.length===0?ot:t.length===1?t[0]:function(n){return t.reduce((i,r)=>r(i),n)}}var le=(()=>{class t{constructor(n){n&&(this._subscribe=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}subscribe(n,i,r){let o=sE(n)?n:new sn(n,i,r);return Nr(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(n){try{return this._subscribe(n)}catch(i){n.error(i)}}forEach(n,i){return i=cv(i),new i((r,o)=>{let s=new sn({next:a=>{try{n(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(n){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(n)}[Pr](){return this}pipe(...n){return Cd(n)(this)}toPromise(n){return n=cv(n),new n((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=e=>new t(e),t})();function cv(t){var e;return(e=t??on.Promise)!==null&&e!==void 0?e:Promise}function oE(t){return t&&Z(t.next)&&Z(t.error)&&Z(t.complete)}function sE(t){return t&&t instanceof Fi||oE(t)&&Ya(t)}function Td(t){return Z(t?.lift)}function W(t){return e=>{if(Td(e))return e.lift(function(n){try{return t(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function $(t,e,n,i,r){return new as(t,e,n,i,r)}var as=class extends Fi{constructor(e,n,i,r,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(l){e.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){e.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function Lr(){return W((t,e)=>{let n=null;t._refCount++;let i=$(e,void 0,void 0,void 0,()=>{if(!t||t._refCount<=0||0<--t._refCount){n=null;return}let r=t._connection,o=n;n=null,r&&(!o||r===o)&&r.unsubscribe(),e.unsubscribe()});t.subscribe(i),i.closed||(n=t.connect())})}var Or=class extends le{constructor(e,n){super(),this.source=e,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,Td(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new Be;let n=this.getSubject();e.add(this.source.subscribe($(n,void 0,()=>{this._teardown(),n.complete()},i=>{this._teardown(),n.error(i)},()=>this._teardown()))),e.closed&&(this._connection=null,e=Be.EMPTY)}return e}refCount(){return Lr()(this)}};var uv=pi(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ie=(()=>{class t extends le{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let i=new Ja(this,this);return i.operator=n,i}_throwIfClosed(){if(this.closed)throw new uv}next(n){Nr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(n)}})}error(n){Nr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:i}=this;for(;i.length;)i.shift().error(n)}})}complete(){Nr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:i,isStopped:r,observers:o}=this;return i||r?xd:(this.currentObservers=null,o.push(n),new Be(()=>{this.currentObservers=null,Li(o,n)}))}_checkFinalizedStatuses(n){let{hasError:i,thrownError:r,isStopped:o}=this;i?n.error(r):o&&n.complete()}asObservable(){let n=new le;return n.source=this,n}}return t.create=(e,n)=>new Ja(e,n),t})(),Ja=class extends Ie{constructor(e,n){super(),this.destination=e,this.source=n}next(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.next)===null||i===void 0||i.call(n,e)}error(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.error)===null||i===void 0||i.call(n,e)}complete(){var e,n;(n=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||n===void 0||n.call(e)}_subscribe(e){var n,i;return(i=(n=this.source)===null||n===void 0?void 0:n.subscribe(e))!==null&&i!==void 0?i:xd}};var je=class extends Ie{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let n=super._subscribe(e);return!n.closed&&e.next(this._value),n}getValue(){let{hasError:e,thrownError:n,_value:i}=this;if(e)throw n;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var ls={now(){return(ls.delegate||Date).now()},delegate:void 0};var cs=class extends Ie{constructor(e=1/0,n=1/0,i=ls){super(),this._bufferSize=e,this._windowTime=n,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,e),this._windowTime=Math.max(1,n)}next(e){let{isStopped:n,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;n||(i.push(e),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(e)}_subscribe(e){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(e),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!e.closed;s+=i?1:2)e.next(o[s]);return this._checkFinalizedStatuses(e),n}_trimBuffer(){let{_bufferSize:e,_timestampProvider:n,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*e;if(e<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=n.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Qa=class extends Be{constructor(e,n){super()}schedule(e,n=0){return this}};var us={setInterval(t,e,...n){let{delegate:i}=us;return i?.setInterval?i.setInterval(t,e,...n):setInterval(t,e,...n)},clearInterval(t){let{delegate:e}=us;return(e?.clearInterval||clearInterval)(t)},delegate:void 0};var Fr=class extends Qa{constructor(e,n){super(e,n),this.scheduler=e,this.work=n,this.pending=!1}schedule(e,n=0){var i;if(this.closed)return this;this.state=e;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,n)),this.pending=!0,this.delay=n,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,n),this}requestAsyncId(e,n,i=0){return us.setInterval(e.flush.bind(e,this),i)}recycleAsyncId(e,n,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return n;n!=null&&us.clearInterval(n)}execute(e,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(e,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,n){let i=!1,r;try{this.work(e)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:e,scheduler:n}=this,{actions:i}=n;this.work=this.state=this.scheduler=null,this.pending=!1,Li(i,this),e!=null&&(this.id=this.recycleAsyncId(n,e,null)),this.delay=null,super.unsubscribe()}}};var kr=class t{constructor(e,n=t.now){this.schedulerActionCtor=e,this.now=n}schedule(e,n=0,i){return new this.schedulerActionCtor(this,e).schedule(i,n)}};kr.now=ls.now;var Ur=class extends kr{constructor(e,n=kr.now){super(e,n),this.actions=[],this._active=!1}flush(e){let{actions:n}=this;if(this._active){n.push(e);return}let i;this._active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=n.shift());if(this._active=!1,i){for(;e=n.shift();)e.unsubscribe();throw i}}};var Xn=new Ur(Fr);var el=class extends Fr{constructor(e,n){super(e,n),this.scheduler=e,this.work=n}schedule(e,n=0){return n>0?super.schedule(e,n):(this.delay=n,this.state=e,this.scheduler.flush(this),this)}execute(e,n){return n>0||this.closed?super.execute(e,n):this._execute(e,n)}requestAsyncId(e,n,i=0){return i!=null&&i>0||i==null&&this.delay>0?super.requestAsyncId(e,n,i):(e.flush(this),0)}};var tl=class extends Ur{};var ds=new tl(el);var ke=new le(t=>t.complete());function dv(t){return t&&Z(t.schedule)}function Id(t){return t[t.length-1]}function nl(t){return Z(Id(t))?t.pop():void 0}function Mn(t){return dv(Id(t))?t.pop():void 0}function fv(t,e){return typeof Id(t)=="number"?t.pop():e}function pv(t,e,n,i){function r(o){return o instanceof n?o:new n(function(s){s(o)})}return new(n||(n=Promise))(function(o,s){function a(u){try{c(i.next(u))}catch(d){s(d)}}function l(u){try{c(i.throw(u))}catch(d){s(d)}}function c(u){u.done?o(u.value):r(u.value).then(a,l)}c((i=i.apply(t,e||[])).next())})}function hv(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function ki(t){return this instanceof ki?(this.v=t,this):new ki(t)}function mv(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(t,e||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(f){return function(m){return Promise.resolve(m).then(f,d)}}function a(f,m){i[f]&&(r[f]=function(_){return new Promise(function(T,I){o.push([f,_,T,I])>1||l(f,_)})},m&&(r[f]=m(r[f])))}function l(f,m){try{c(i[f](m))}catch(_){h(o[0][3],_)}}function c(f){f.value instanceof ki?Promise.resolve(f.value.v).then(u,d):h(o[0][2],f)}function u(f){l("next",f)}function d(f){l("throw",f)}function h(f,m){f(m),o.shift(),o.length&&l(o[0][0],o[0][1])}}function gv(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],n;return e?e.call(t):(t=typeof hv=="function"?hv(t):t[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(o){n[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var il=t=>t&&typeof t.length=="number"&&typeof t!="function";function rl(t){return Z(t?.then)}function ol(t){return Z(t[Pr])}function sl(t){return Symbol.asyncIterator&&Z(t?.[Symbol.asyncIterator])}function al(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function aE(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var ll=aE();function cl(t){return Z(t?.[ll])}function ul(t){return mv(this,arguments,function*(){let n=t.getReader();try{for(;;){let{value:i,done:r}=yield ki(n.read());if(r)return yield ki(void 0);yield yield ki(i)}}finally{n.releaseLock()}})}function dl(t){return Z(t?.getReader)}function be(t){if(t instanceof le)return t;if(t!=null){if(ol(t))return lE(t);if(il(t))return cE(t);if(rl(t))return uE(t);if(sl(t))return vv(t);if(cl(t))return dE(t);if(dl(t))return fE(t)}throw al(t)}function lE(t){return new le(e=>{let n=t[Pr]();if(Z(n.subscribe))return n.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function cE(t){return new le(e=>{for(let n=0;n<t.length&&!e.closed;n++)e.next(t[n]);e.complete()})}function uE(t){return new le(e=>{t.then(n=>{e.closed||(e.next(n),e.complete())},n=>e.error(n)).then(null,Za)})}function dE(t){return new le(e=>{for(let n of t)if(e.next(n),e.closed)return;e.complete()})}function vv(t){return new le(e=>{hE(t,e).catch(n=>e.error(n))})}function fE(t){return vv(ul(t))}function hE(t,e){var n,i,r,o;return pv(this,void 0,void 0,function*(){try{for(n=gv(t);i=yield n.next(),!i.done;){let s=i.value;if(e.next(s),e.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=n.return)&&(yield o.call(n))}finally{if(r)throw r.error}}e.complete()})}function dt(t,e,n,i=0,r=!1){let o=e.schedule(function(){n(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function an(t,e=0){return W((n,i)=>{n.subscribe($(i,r=>dt(i,t,()=>i.next(r),e),()=>dt(i,t,()=>i.complete(),e),r=>dt(i,t,()=>i.error(r),e)))})}function fl(t,e=0){return W((n,i)=>{i.add(t.schedule(()=>n.subscribe(i),e))})}function yv(t,e){return be(t).pipe(fl(e),an(e))}function _v(t,e){return be(t).pipe(fl(e),an(e))}function xv(t,e){return new le(n=>{let i=0;return e.schedule(function(){i===t.length?n.complete():(n.next(t[i++]),n.closed||this.schedule())})})}function bv(t,e){return new le(n=>{let i;return dt(n,e,()=>{i=t[ll](),dt(n,e,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){n.error(s);return}o?n.complete():n.next(r)},0,!0)}),()=>Z(i?.return)&&i.return()})}function hl(t,e){if(!t)throw new Error("Iterable cannot be null");return new le(n=>{dt(n,e,()=>{let i=t[Symbol.asyncIterator]();dt(n,e,()=>{i.next().then(r=>{r.done?n.complete():n.next(r.value)})},0,!0)})})}function Sv(t,e){return hl(ul(t),e)}function wv(t,e){if(t!=null){if(ol(t))return yv(t,e);if(il(t))return xv(t,e);if(rl(t))return _v(t,e);if(sl(t))return hl(t,e);if(cl(t))return bv(t,e);if(dl(t))return Sv(t,e)}throw al(t)}function Oe(t,e){return e?wv(t,e):be(t)}function q(...t){let e=Mn(t);return Oe(t,e)}function mi(t,e){let n=Z(t)?t:()=>t,i=r=>r.error(n());return new le(e?r=>e.schedule(i,0,r):i)}var gi=class t{constructor(e,n,i){this.kind=e,this.value=n,this.error=i,this.hasValue=e==="N"}observe(e){return Dd(this,e)}do(e,n,i){let{kind:r,value:o,error:s}=this;return r==="N"?e?.(o):r==="E"?n?.(s):i?.()}accept(e,n,i){var r;return Z((r=e)===null||r===void 0?void 0:r.next)?this.observe(e):this.do(e,n,i)}toObservable(){let{kind:e,value:n,error:i}=this,r=e==="N"?q(n):e==="E"?mi(()=>i):e==="C"?ke:0;if(!r)throw new TypeError(`Unexpected notification kind ${e}`);return r}static createNext(e){return new t("N",e)}static createError(e){return new t("E",void 0,e)}static createComplete(){return t.completeNotification}};gi.completeNotification=new gi("C");function Dd(t,e){var n,i,r;let{kind:o,value:s,error:a}=t;if(typeof o!="string")throw new TypeError('Invalid notification, missing "kind"');o==="N"?(n=e.next)===null||n===void 0||n.call(e,s):o==="E"?(i=e.error)===null||i===void 0||i.call(e,a):(r=e.complete)===null||r===void 0||r.call(e)}function Ad(t){return!!t&&(t instanceof le||Z(t.lift)&&Z(t.subscribe))}var ln=pi(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function fs(t,e){let n=typeof e=="object";return new Promise((i,r)=>{let o=new sn({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{n?i(e.defaultValue):r(new ln)}});t.subscribe(o)})}function Mv(t){return t instanceof Date&&!isNaN(t)}var pE=pi(t=>function(n=null){t(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=n});function Rd(t,e){let{first:n,each:i,with:r=mE,scheduler:o=e??Xn,meta:s=null}=Mv(t)?{first:t}:typeof t=="number"?{each:t}:t;if(n==null&&i==null)throw new TypeError("No timeout provided.");return W((a,l)=>{let c,u,d=null,h=0,f=m=>{u=dt(l,o,()=>{try{c.unsubscribe(),be(r({meta:s,lastValue:d,seen:h})).subscribe(l)}catch(_){l.error(_)}},m)};c=a.subscribe($(l,m=>{u?.unsubscribe(),h++,l.next(d=m),i>0&&f(i)},void 0,void 0,()=>{u?.closed||u?.unsubscribe(),d=null})),!h&&f(n!=null?typeof n=="number"?n:+n-o.now():i)})}function mE(t){throw new pE(t)}function G(t,e){return W((n,i)=>{let r=0;n.subscribe($(i,o=>{i.next(t.call(e,o,r++))}))})}var{isArray:gE}=Array;function vE(t,e){return gE(e)?t(...e):t(e)}function Ev(t){return G(e=>vE(t,e))}var{isArray:yE}=Array,{getPrototypeOf:_E,prototype:xE,keys:bE}=Object;function Cv(t){if(t.length===1){let e=t[0];if(yE(e))return{args:e,keys:null};if(SE(e)){let n=bE(e);return{args:n.map(i=>e[i]),keys:n}}}return{args:t,keys:null}}function SE(t){return t&&typeof t=="object"&&_E(t)===xE}function Tv(t,e){return t.reduce((n,i,r)=>(n[i]=e[r],n),{})}function pl(...t){let e=Mn(t),n=nl(t),{args:i,keys:r}=Cv(t);if(i.length===0)return Oe([],e);let o=new le(wE(i,e,r?s=>Tv(r,s):ot));return n?o.pipe(Ev(n)):o}function wE(t,e,n=ot){return i=>{Iv(e,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)Iv(e,()=>{let c=Oe(t[l],e),u=!1;c.subscribe($(i,d=>{o[l]=d,u||(u=!0,a--),a||i.next(n(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function Iv(t,e,n){t?dt(n,t,e):e()}function Dv(t,e,n,i,r,o,s,a){let l=[],c=0,u=0,d=!1,h=()=>{d&&!l.length&&!c&&e.complete()},f=_=>c<i?m(_):l.push(_),m=_=>{o&&e.next(_),c++;let T=!1;be(n(_,u++)).subscribe($(e,I=>{r?.(I),o?f(I):e.next(I)},()=>{T=!0},void 0,()=>{if(T)try{for(c--;l.length&&c<i;){let I=l.shift();s?dt(e,s,()=>m(I)):m(I)}h()}catch(I){e.error(I)}}))};return t.subscribe($(e,f,()=>{d=!0,h()})),()=>{a?.()}}function Fe(t,e,n=1/0){return Z(e)?Fe((i,r)=>G((o,s)=>e(i,o,r,s))(be(t(i,r))),n):(typeof e=="number"&&(n=e),W((i,r)=>Dv(i,r,t,n)))}function ml(t=1/0){return Fe(ot,t)}function Av(){return ml(1)}function Vr(...t){return Av()(Oe(t,Mn(t)))}function hs(t){return new le(e=>{be(t()).subscribe(e)})}function Ui(...t){let e=Mn(t),n=fv(t,1/0),i=t;return i.length?i.length===1?be(i[0]):ml(n)(Oe(i,e)):ke}function he(t,e){return W((n,i)=>{let r=0;n.subscribe($(i,o=>t.call(e,o,r++)&&i.next(o)))})}function Xt(t){return W((e,n)=>{let i=null,r=!1,o;i=e.subscribe($(n,void 0,void 0,s=>{o=be(t(s,Xt(t)(e))),i?(i.unsubscribe(),i=null,o.subscribe(n)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(n))})}function Rv(t,e,n,i,r){return(o,s)=>{let a=n,l=e,c=0;o.subscribe($(s,u=>{let d=c++;l=a?t(l,u,d):(a=!0,u),i&&s.next(l)},r&&(()=>{a&&s.next(l),s.complete()})))}}function Et(t,e){return Z(e)?Fe(t,e,1):Fe(t,1)}function Br(t,e=Xn){return W((n,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,u=e.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}a()}n.subscribe($(i,c=>{o=c,s=e.now(),r||(r=e.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function vi(t){return W((e,n)=>{let i=!1;e.subscribe($(n,r=>{i=!0,n.next(r)},()=>{i||n.next(t),n.complete()}))})}function We(t){return t<=0?()=>ke:W((e,n)=>{let i=0;e.subscribe($(n,r=>{++i<=t&&(n.next(r),t<=i&&n.complete())}))})}function Nd(){return W((t,e)=>{t.subscribe($(e,qn))})}function Pd(){return W((t,e)=>{t.subscribe($(e,n=>Dd(n,e)))})}function Ld(t,e=ot){return t=t??ME,W((n,i)=>{let r,o=!0;n.subscribe($(i,s=>{let a=e(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function ME(t,e){return t===e}function gl(t=EE){return W((e,n)=>{let i=!1;e.subscribe($(n,r=>{i=!0,n.next(r)},()=>i?n.complete():n.error(t())))})}function EE(){return new ln}function Vi(t,e){return e?n=>n.pipe(Vi((i,r)=>be(t(i,r)).pipe(G((o,s)=>e(i,o,r,s))))):W((n,i)=>{let r=0,o=null,s=!1;n.subscribe($(i,a=>{o||(o=$(i,void 0,()=>{o=null,s&&i.complete()}),be(t(a,r++)).subscribe(o))},()=>{s=!0,!o&&i.complete()}))})}function zr(t){return W((e,n)=>{try{e.subscribe(n)}finally{n.add(t)}})}function Yn(t,e){let n=arguments.length>=2;return i=>i.pipe(t?he((r,o)=>t(r,o,i)):ot,We(1),n?vi(e):gl(()=>new ln))}function vl(t,e,n,i){return W((r,o)=>{let s;!e||typeof e=="function"?s=e:{duration:n,element:s,connector:i}=e;let a=new Map,l=m=>{a.forEach(m),m(o)},c=m=>l(_=>_.error(m)),u=0,d=!1,h=new as(o,m=>{try{let _=t(m),T=a.get(_);if(!T){a.set(_,T=i?i():new Ie);let I=f(_,T);if(o.next(I),n){let B=$(T,()=>{T.complete(),B?.unsubscribe()},void 0,void 0,()=>a.delete(_));h.add(be(n(I)).subscribe(B))}}T.next(s?s(m):m)}catch(_){c(_)}},()=>l(m=>m.complete()),c,()=>a.clear(),()=>(d=!0,u===0));r.subscribe(h);function f(m,_){let T=new le(I=>{u++;let B=_.subscribe(I);return()=>{B.unsubscribe(),--u===0&&d&&h.unsubscribe()}});return T.key=m,T}})}function Hr(t){return t<=0?()=>ke:W((e,n)=>{let i=[];e.subscribe($(n,r=>{i.push(r),t<i.length&&i.shift()},()=>{for(let r of i)n.next(r);n.complete()},void 0,()=>{i=null}))})}function Od(t,e){let n=arguments.length>=2;return i=>i.pipe(t?he((r,o)=>t(r,o,i)):ot,Hr(1),n?vi(e):gl(()=>new ln))}function Fd(){return W((t,e)=>{t.subscribe($(e,n=>{e.next(gi.createNext(n))},()=>{e.next(gi.createComplete()),e.complete()},n=>{e.next(gi.createError(n)),e.complete()}))})}function kd(...t){let e=t.length;if(e===0)throw new Error("list of properties cannot be empty.");return G(n=>{let i=n;for(let r=0;r<e;r++){let o=i?.[t[r]];if(typeof o<"u")i=o;else return}return i})}function Bi(t,e){return W(Rv(t,e,arguments.length>=2,!0))}function Vd(t={}){let{connector:e=()=>new Ie,resetOnError:n=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,u=!1,d=!1,h=()=>{a?.unsubscribe(),a=void 0},f=()=>{h(),s=l=void 0,u=d=!1},m=()=>{let _=s;f(),_?.unsubscribe()};return W((_,T)=>{c++,!d&&!u&&h();let I=l=l??e();T.add(()=>{c--,c===0&&!d&&!u&&(a=Ud(m,r))}),I.subscribe(T),!s&&c>0&&(s=new sn({next:B=>I.next(B),error:B=>{d=!0,h(),a=Ud(f,n,B),I.error(B)},complete:()=>{u=!0,h(),a=Ud(f,i),I.complete()}}),be(_).subscribe(s))})(o)}}function Ud(t,e,...n){if(e===!0){t();return}if(e===!1)return;let i=new sn({next:()=>{i.unsubscribe(),t()}});return be(e(...n)).subscribe(i)}function Gr(t){return he((e,n)=>t<=n)}function Bd(...t){let e=Mn(t);return W((n,i)=>{(e?Vr(t,n,e):Vr(t,n)).subscribe(i)})}function st(t,e){return W((n,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();n.subscribe($(i,l=>{r?.unsubscribe();let c=0,u=o++;be(t(l,u)).subscribe(r=$(i,d=>i.next(e?e(l,d,u,c++):d),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function zi(t){return W((e,n)=>{be(t).subscribe($(n,()=>n.complete(),qn)),!n.closed&&e.subscribe(n)})}function J(t,e,n){let i=Z(t)||e||n?{next:t,error:e,complete:n}:t;return i?W((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe($(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):ot}function ze(...t){let e=nl(t);return W((n,i)=>{let r=t.length,o=new Array(r),s=t.map(()=>!1),a=!1;for(let l=0;l<r;l++)be(t[l]).subscribe($(i,c=>{o[l]=c,!a&&!s[l]&&(s[l]=!0,(a=s.every(ot))&&(s=null))},qn));n.subscribe($(i,l=>{if(a){let c=[l,...o];i.next(e?e(...c):c)}}))})}var by="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",z=class extends Error{code;constructor(e,n){super(Sy(e,n)),this.code=e}};function CE(t){return`NG0${Math.abs(t)}`}function Sy(t,e){return`${CE(t)}${e?": "+e:""}`}var wy=Symbol("InputSignalNode#UNSET"),TE=M(y({},$a),{transformFn:void 0,applyValueToInputSignal(t,e){os(t,e)}});function My(t,e){let n=Object.create(TE);n.value=t,n.transformFn=e?.transform;function i(){if(ns(n),n.value===wy){let r=null;throw new z(-950,r)}return n.value}return i[Ut]=n,i}function Ql(t){return{toString:t}.toString()}var yl="__parameters__";function IE(t){return function(...n){if(t){let i=t(...n);for(let r in i)this[r]=i[r]}}}function DE(t,e,n){return Ql(()=>{let i=IE(e);function r(...o){if(this instanceof r)return i.apply(this,o),this;let s=new r(...o);return a.annotation=s,a;function a(l,c,u){let d=l.hasOwnProperty(yl)?l[yl]:Object.defineProperty(l,yl,{value:[]})[yl];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(s),l}}return r.prototype.ngMetadataName=t,r.annotationCls=r,r})}var En=globalThis;function Re(t){for(let e in t)if(t[e]===Re)return e;throw Error("Could not find renamed property on target object.")}function Tt(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Tt).join(", ")}]`;if(t==null)return""+t;let e=t.overriddenName||t.name;if(e)return`${e}`;let n=t.toString();if(n==null)return""+n;let i=n.indexOf(`
`);return i>=0?n.slice(0,i):n}function ef(t,e){return t?e?`${t} ${e}`:t:e||""}var AE=Re({__forward_ref__:Re});function Ey(t){return t.__forward_ref__=Ey,t.toString=function(){return Tt(this())},t}function Yt(t){return Cy(t)?t():t}function Cy(t){return typeof t=="function"&&t.hasOwnProperty(AE)&&t.__forward_ref__===Ey}function F(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function ec(t){return Nv(t,Iy)||Nv(t,Dy)}function Ty(t){return ec(t)!==null}function Nv(t,e){return t.hasOwnProperty(e)?t[e]:null}function RE(t){let e=t&&(t[Iy]||t[Dy]);return e||null}function Pv(t){return t&&(t.hasOwnProperty(Lv)||t.hasOwnProperty(NE))?t[Lv]:null}var Iy=Re({\u0275prov:Re}),Lv=Re({\u0275inj:Re}),Dy=Re({ngInjectableDef:Re}),NE=Re({ngInjectorDef:Re}),C=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,n){this._desc=e,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=F({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Ay(t){return t&&!!t.\u0275providers}var PE=Re({\u0275cmp:Re}),LE=Re({\u0275dir:Re}),OE=Re({\u0275pipe:Re}),FE=Re({\u0275mod:Re}),Dl=Re({\u0275fac:Re}),vs=Re({__NG_ELEMENT_ID__:Re}),Ov=Re({__NG_ENV_ID__:Re});function Tn(t){return typeof t=="string"?t:t==null?"":String(t)}function kE(t){return typeof t=="function"?t.name||t.toString():typeof t=="object"&&t!=null&&typeof t.type=="function"?t.type.name||t.type.toString():Tn(t)}function Ry(t,e){throw new z(-200,t)}function ih(t,e){throw new z(-201,!1)}var re=function(t){return t[t.Default=0]="Default",t[t.Host=1]="Host",t[t.Self=2]="Self",t[t.SkipSelf=4]="SkipSelf",t[t.Optional=8]="Optional",t}(re||{}),tf;function Ny(){return tf}function Ct(t){let e=tf;return tf=t,e}function Py(t,e,n){let i=ec(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(n&re.Optional)return null;if(e!==void 0)return e;ih(t,"Injector")}var UE={},Gi=UE,nf="__NG_DI_FLAG__",Al=class{injector;constructor(e){this.injector=e}retrieve(e,n){let i=n;return this.injector.get(e,i.optional?qa:Gi,i)}},Rl="ngTempTokenPath",VE="ngTokenPath",BE=/\n/gm,zE="\u0275",Fv="__source";function HE(t,e=re.Default){if(ss()===void 0)throw new z(-203,!1);if(ss()===null)return Py(t,void 0,e);{let n=ss(),i;return n instanceof Al?i=n.injector:i=n,i.get(t,e&re.Optional?null:void 0,e)}}function O(t,e=re.Default){return(Ny()||HE)(Yt(t),e)}function S(t,e=re.Default){return O(t,tc(e))}function tc(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function rf(t){let e=[];for(let n=0;n<t.length;n++){let i=Yt(t[n]);if(Array.isArray(i)){if(i.length===0)throw new z(900,!1);let r,o=re.Default;for(let s=0;s<i.length;s++){let a=i[s],l=jE(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}e.push(O(r,o))}else e.push(O(i))}return e}function GE(t,e){return t[nf]=e,t.prototype[nf]=e,t}function jE(t){return t[nf]}function WE(t,e,n,i){let r=t[Rl];throw e[Fv]&&r.unshift(e[Fv]),t.message=$E(`
`+t.message,r,n,i),t[VE]=r,t[Rl]=null,t}function $E(t,e,n,i=null){t=t&&t.charAt(0)===`
`&&t.charAt(1)==zE?t.slice(2):t;let r=Tt(e);if(Array.isArray(e))r=e.map(Tt).join(" -> ");else if(typeof e=="object"){let o=[];for(let s in e)if(e.hasOwnProperty(s)){let a=e[s];o.push(s+":"+(typeof a=="string"?JSON.stringify(a):Tt(a)))}r=`{${o.join(", ")}}`}return`${n}${i?"("+i+")":""}[${r}]: ${t.replace(BE,`
  `)}`}var rh=GE(DE("Inject",t=>({token:t})),-1);function Wi(t,e){let n=t.hasOwnProperty(Dl);return n?t[Dl]:null}function qE(t,e,n){if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=e[i];if(n&&(r=n(r),o=n(o)),o!==r)return!1}return!0}function XE(t){return t.flat(Number.POSITIVE_INFINITY)}function oh(t,e){t.forEach(n=>Array.isArray(n)?oh(n,e):e(n))}function Ly(t,e,n){e>=t.length?t.push(n):t.splice(e,0,n)}function Nl(t,e){return e>=t.length-1?t.pop():t.splice(e,1)[0]}function YE(t,e){let n=[];for(let i=0;i<t;i++)n.push(e);return n}function ZE(t,e,n,i){let r=t.length;if(r==e)t.push(n,i);else if(r===1)t.push(i,t[0]),t[0]=n;else{for(r--,t.push(t[r-1],t[r]);r>e;){let o=r-2;t[r]=t[o],r--}t[e]=n,t[e+1]=i}}function sh(t,e,n){let i=Ts(t,e);return i>=0?t[i|1]=n:(i=~i,ZE(t,i,e,n)),i}function zd(t,e){let n=Ts(t,e);if(n>=0)return t[n|1]}function Ts(t,e){return KE(t,e,1)}function KE(t,e,n){let i=0,r=t.length>>n;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<n];if(e===s)return o<<n;s>e?r=o:i=o+1}return~(r<<n)}var Xr={},In=[],$i=new C(""),Oy=new C("",-1),Fy=new C(""),Pl=class{get(e,n=Gi){if(n===Gi){let i=new Error(`NullInjectorError: No provider for ${Tt(e)}!`);throw i.name="NullInjectorError",i}return n}};function ky(t,e){let n=t[FE]||null;if(!n&&e===!0)throw new Error(`Type ${Tt(t)} does not have '\u0275mod' property.`);return n}function Yr(t){return t[PE]||null}function JE(t){return t[LE]||null}function QE(t){return t[OE]||null}function It(t){return{\u0275providers:t}}function Qi(t){return It([{provide:$i,multi:!0,useValue:t}])}function eC(...t){return{\u0275providers:Uy(!0,t),\u0275fromNgModule:!0}}function Uy(t,...e){let n=[],i=new Set,r,o=s=>{n.push(s)};return oh(e,s=>{let a=s;of(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&Vy(r,o),n}function Vy(t,e){for(let n=0;n<t.length;n++){let{ngModule:i,providers:r}=t[n];ah(r,o=>{e(o,i)})}}function of(t,e,n,i){if(t=Yt(t),!t)return!1;let r=null,o=Pv(t),s=!o&&Yr(t);if(!o&&!s){let l=t.ngModule;if(o=Pv(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)of(c,e,n,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;try{oh(o.imports,u=>{of(u,e,n,i)&&(c||=[],c.push(u))})}finally{}c!==void 0&&Vy(c,e)}if(!a){let c=Wi(r)||(()=>new r);e({provide:r,useFactory:c,deps:In},r),e({provide:Fy,useValue:r,multi:!0},r),e({provide:$i,useValue:()=>O(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;ah(l,u=>{e(u,c)})}}else return!1;return r!==t&&t.providers!==void 0}function ah(t,e){for(let n of t)Ay(n)&&(n=n.\u0275providers),Array.isArray(n)?ah(n,e):e(n)}var tC=Re({provide:String,useValue:Re});function By(t){return t!==null&&typeof t=="object"&&tC in t}function nC(t){return!!(t&&t.useExisting)}function iC(t){return!!(t&&t.useFactory)}function sf(t){return typeof t=="function"}var nc=new C(""),wl={},kv={},Hd;function lh(){return Hd===void 0&&(Hd=new Pl),Hd}var Vt=class{},ys=class extends Vt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,n,i,r){super(),this.parent=n,this.source=i,this.scopes=r,lf(e,s=>this.processProvider(s)),this.records.set(Oy,jr(void 0,this)),r.has("environment")&&this.records.set(Vt,jr(void 0,this));let o=this.records.get(nc);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Fy,In,re.Self))}retrieve(e,n){let i=n;return this.get(e,i.optional?qa:Gi,i)}destroy(){ms(this),this._destroyed=!0;let e=ae(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of n)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ae(e)}}onDestroy(e){return ms(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){ms(this);let n=$n(this),i=Ct(void 0),r;try{return e()}finally{$n(n),Ct(i)}}get(e,n=Gi,i=re.Default){if(ms(this),e.hasOwnProperty(Ov))return e[Ov](this);i=tc(i);let r,o=$n(this),s=Ct(void 0);try{if(!(i&re.SkipSelf)){let l=this.records.get(e);if(l===void 0){let c=cC(e)&&ec(e);c&&this.injectableDefInScope(c)?l=jr(af(e),wl):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,i)}let a=i&re.Self?lh():this.parent;return n=i&re.Optional&&n===Gi?null:n,a.get(e,n)}catch(a){if(a.name==="NullInjectorError"){if((a[Rl]=a[Rl]||[]).unshift(Tt(e)),o)throw a;return WE(a,e,"R3InjectorError",this.source)}else throw a}finally{Ct(s),$n(o)}}resolveInjectorInitializers(){let e=ae(null),n=$n(this),i=Ct(void 0),r;try{let o=this.get($i,In,re.Self);for(let s of o)s()}finally{$n(n),Ct(i),ae(e)}}toString(){let e=[],n=this.records;for(let i of n.keys())e.push(Tt(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=Yt(e);let n=sf(e)?e:Yt(e&&e.provide),i=oC(e);if(!sf(e)&&e.multi===!0){let r=this.records.get(n);r||(r=jr(void 0,wl,!0),r.factory=()=>rf(r.multi),this.records.set(n,r)),n=e,r.multi.push(e)}this.records.set(n,i)}hydrate(e,n,i){let r=ae(null);try{return n.value===kv?Ry(Tt(e)):n.value===wl&&(n.value=kv,n.value=n.factory(void 0,i)),typeof n.value=="object"&&n.value&&lC(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{ae(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let n=Yt(e.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(e){let n=this._onDestroyHooks.indexOf(e);n!==-1&&this._onDestroyHooks.splice(n,1)}};function af(t){let e=ec(t),n=e!==null?e.factory:Wi(t);if(n!==null)return n;if(t instanceof C)throw new z(204,!1);if(t instanceof Function)return rC(t);throw new z(204,!1)}function rC(t){if(t.length>0)throw new z(204,!1);let n=RE(t);return n!==null?()=>n.factory(t):()=>new t}function oC(t){if(By(t))return jr(void 0,t.useValue);{let e=sC(t);return jr(e,wl)}}function sC(t,e,n){let i;if(sf(t)){let r=Yt(t);return Wi(r)||af(r)}else if(By(t))i=()=>Yt(t.useValue);else if(iC(t))i=()=>t.useFactory(...rf(t.deps||[]));else if(nC(t))i=(r,o)=>O(Yt(t.useExisting),o!==void 0&&o&re.Optional?re.Optional:void 0);else{let r=Yt(t&&(t.useClass||t.provide));if(aC(t))i=()=>new r(...rf(t.deps));else return Wi(r)||af(r)}return i}function ms(t){if(t.destroyed)throw new z(205,!1)}function jr(t,e,n=!1){return{factory:t,value:e,multi:n?[]:void 0}}function aC(t){return!!t.deps}function lC(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function cC(t){return typeof t=="function"||typeof t=="object"&&t instanceof C}function lf(t,e){for(let n of t)Array.isArray(n)?lf(n,e):n&&Ay(n)?lf(n.\u0275providers,e):e(n)}function hn(t,e){let n;t instanceof ys?(ms(t),n=t):n=new Al(t);let i,r=$n(n),o=Ct(void 0);try{return e()}finally{$n(r),Ct(o)}}function zy(){return Ny()!==void 0||ss()!=null}function ch(t){if(!zy())throw new z(-203,!1)}function uC(t){return typeof t=="function"}var ei=0,te=1,K=2,pt=3,dn=4,Dt=5,Zr=6,Ll=7,Ke=8,Kr=9,Zn=10,Je=11,_s=12,Uv=13,so=14,Bt=15,qi=16,Wr=17,Kn=18,ic=19,Hy=20,yi=21,Gd=22,Xi=23,Zt=24,jd=25,at=26,Gy=1;var Yi=7,Ol=8,Jr=9,ht=10;function _i(t){return Array.isArray(t)&&typeof t[Gy]=="object"}function ti(t){return Array.isArray(t)&&t[Gy]===!0}function jy(t){return(t.flags&4)!==0}function ao(t){return t.componentOffset>-1}function uh(t){return(t.flags&1)===1}function er(t){return!!t.template}function Fl(t){return(t[K]&512)!==0}function lo(t){return(t[K]&256)===256}var cf=class{previousValue;currentValue;firstChange;constructor(e,n,i){this.previousValue=e,this.currentValue=n,this.firstChange=i}isFirstChange(){return this.firstChange}};function Wy(t,e,n,i){e!==null?e.applyValueToInputSignal(e,i):t[n]=i}var tr=(()=>{let t=()=>$y;return t.ngInherit=!0,t})();function $y(t){return t.type.prototype.ngOnChanges&&(t.setInput=fC),dC}function dC(){let t=Xy(this),e=t?.current;if(e){let n=t.previous;if(n===Xr)t.previous=e;else for(let i in e)n[i]=e[i];t.current=null,this.ngOnChanges(e)}}function fC(t,e,n,i,r){let o=this.declaredInputs[i],s=Xy(t)||hC(t,{previous:Xr,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new cf(c&&c.currentValue,n,l===Xr),Wy(t,e,r,n)}var qy="__ngSimpleChanges__";function Xy(t){return t[qy]||null}function hC(t,e){return t[qy]=e}var Vv=null;var Ne=function(t,e=null,n){Vv?.(t,e,n)},Yy="svg",pC="math";function Dn(t){for(;Array.isArray(t);)t=t[ei];return t}function Zy(t,e){return Dn(e[t])}function Nn(t,e){return Dn(e[t.index])}function dh(t,e){return t.data[e]}function Ky(t,e){return t[e]}function mC(t,e,n,i){n>=t.data.length&&(t.data[n]=null,t.blueprint[n]=null),e[n]=i}function An(t,e){let n=e[t];return _i(n)?n:n[ei]}function gC(t){return(t[K]&4)===4}function fh(t){return(t[K]&128)===128}function vC(t){return ti(t[pt])}function Qr(t,e){return e==null?null:t[e]}function Jy(t){t[Wr]=0}function Qy(t){t[K]&1024||(t[K]|=1024,fh(t)&&Is(t))}function yC(t,e){for(;t>0;)e=e[so],t--;return e}function rc(t){return!!(t[K]&9216||t[Zt]?.dirty)}function uf(t){t[Zn].changeDetectionScheduler?.notify(8),t[K]&64&&(t[K]|=1024),rc(t)&&Is(t)}function Is(t){t[Zn].changeDetectionScheduler?.notify(0);let e=Zi(t);for(;e!==null&&!(e[K]&8192||(e[K]|=8192,!fh(e)));)e=Zi(e)}function e0(t,e){if(lo(t))throw new z(911,!1);t[yi]===null&&(t[yi]=[]),t[yi].push(e)}function _C(t,e){if(t[yi]===null)return;let n=t[yi].indexOf(e);n!==-1&&t[yi].splice(n,1)}function Zi(t){let e=t[pt];return ti(e)?e[pt]:e}function hh(t){return t[Ll]??=[]}function ph(t){return t.cleanup??=[]}function xC(t,e,n,i){let r=hh(e);r.push(n),t.firstCreatePass&&ph(t).push(i,r.length-1)}var oe={lFrame:u0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var df=!1;function bC(){return oe.lFrame.elementDepthCount}function SC(){oe.lFrame.elementDepthCount++}function wC(){oe.lFrame.elementDepthCount--}function t0(){return oe.bindingsEnabled}function n0(){return oe.skipHydrationRootTNode!==null}function MC(t){return oe.skipHydrationRootTNode===t}function EC(){oe.skipHydrationRootTNode=null}function ce(){return oe.lFrame.lView}function _t(){return oe.lFrame.tView}function N(t){return oe.lFrame.contextLView=t,t[Ke]}function P(t){return oe.lFrame.contextLView=null,t}function Kt(){let t=i0();for(;t!==null&&t.type===64;)t=t.parent;return t}function i0(){return oe.lFrame.currentTNode}function CC(){let t=oe.lFrame,e=t.currentTNode;return t.isParent?e:e.parent}function Ds(t,e){let n=oe.lFrame;n.currentTNode=t,n.isParent=e}function r0(){return oe.lFrame.isParent}function o0(){oe.lFrame.isParent=!1}function s0(){return df}function kl(t){let e=df;return df=t,e}function mh(){let t=oe.lFrame,e=t.bindingRootIndex;return e===-1&&(e=t.bindingRootIndex=t.tView.bindingStartIndex),e}function a0(){return oe.lFrame.bindingIndex}function TC(t){return oe.lFrame.bindingIndex=t}function As(){return oe.lFrame.bindingIndex++}function oc(t){let e=oe.lFrame,n=e.bindingIndex;return e.bindingIndex=e.bindingIndex+t,n}function IC(){return oe.lFrame.inI18n}function DC(t,e){let n=oe.lFrame;n.bindingIndex=n.bindingRootIndex=t,ff(e)}function AC(){return oe.lFrame.currentDirectiveIndex}function ff(t){oe.lFrame.currentDirectiveIndex=t}function RC(t){let e=oe.lFrame.currentDirectiveIndex;return e===-1?null:t[e]}function gh(){return oe.lFrame.currentQueryIndex}function sc(t){oe.lFrame.currentQueryIndex=t}function NC(t){let e=t[te];return e.type===2?e.declTNode:e.type===1?t[Dt]:null}function l0(t,e,n){if(n&re.SkipSelf){let r=e,o=t;for(;r=r.parent,r===null&&!(n&re.Host);)if(r=NC(o),r===null||(o=o[so],r.type&10))break;if(r===null)return!1;e=r,t=o}let i=oe.lFrame=c0();return i.currentTNode=e,i.lView=t,!0}function vh(t){let e=c0(),n=t[te];oe.lFrame=e,e.currentTNode=n.firstChild,e.lView=t,e.tView=n,e.contextLView=t,e.bindingIndex=n.bindingStartIndex,e.inI18n=!1}function c0(){let t=oe.lFrame,e=t===null?null:t.child;return e===null?u0(t):e}function u0(t){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=e),e}function d0(){let t=oe.lFrame;return oe.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var f0=d0;function yh(){let t=d0();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function PC(t){return(oe.lFrame.contextLView=yC(t,oe.lFrame.contextLView))[Ke]}function Pn(){return oe.lFrame.selectedIndex}function Ki(t){oe.lFrame.selectedIndex=t}function h0(){let t=oe.lFrame;return dh(t.tView,t.selectedIndex)}function co(){oe.lFrame.currentNamespace=Yy}function p0(){LC()}function LC(){oe.lFrame.currentNamespace=null}function OC(){return oe.lFrame.currentNamespace}var m0=!0;function _h(){return m0}function xh(t){m0=t}function FC(t,e,n){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=e.type.prototype;if(i){let s=$y(e);(n.preOrderHooks??=[]).push(t,s),(n.preOrderCheckHooks??=[]).push(t,s)}r&&(n.preOrderHooks??=[]).push(0-t,r),o&&((n.preOrderHooks??=[]).push(t,o),(n.preOrderCheckHooks??=[]).push(t,o))}function g0(t,e){for(let n=e.directiveStart,i=e.directiveEnd;n<i;n++){let o=t.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(t.contentHooks??=[]).push(-n,s),a&&((t.contentHooks??=[]).push(n,a),(t.contentCheckHooks??=[]).push(n,a)),l&&(t.viewHooks??=[]).push(-n,l),c&&((t.viewHooks??=[]).push(n,c),(t.viewCheckHooks??=[]).push(n,c)),u!=null&&(t.destroyHooks??=[]).push(n,u)}}function Ml(t,e,n){v0(t,e,3,n)}function El(t,e,n,i){(t[K]&3)===n&&v0(t,e,n,i)}function Wd(t,e){let n=t[K];(n&3)===e&&(n&=16383,n+=1,t[K]=n)}function v0(t,e,n,i){let r=i!==void 0?t[Wr]&65535:0,o=i??-1,s=e.length-1,a=0;for(let l=r;l<s;l++)if(typeof e[l+1]=="number"){if(a=e[l],i!=null&&a>=i)break}else e[l]<0&&(t[Wr]+=65536),(a<o||o==-1)&&(kC(t,n,e,l),t[Wr]=(t[Wr]&4294901760)+l+2),l++}function Bv(t,e){Ne(4,t,e);let n=ae(null);try{e.call(t)}finally{ae(n),Ne(5,t,e)}}function kC(t,e,n,i){let r=n[i]<0,o=n[i+1],s=r?-n[i]:n[i],a=t[s];r?t[K]>>14<t[Wr]>>16&&(t[K]&3)===e&&(t[K]+=16384,Bv(a,o)):Bv(a,o)}var qr=-1,xs=class{factory;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,n,i){this.factory=e,this.canSeeViewProviders=n,this.injectImpl=i}};function UC(t){return(t.flags&8)!==0}function VC(t){return(t.flags&16)!==0}function BC(t,e,n){let i=0;for(;i<n.length;){let r=n[i];if(typeof r=="number"){if(r!==0)break;i++;let o=n[i++],s=n[i++],a=n[i++];t.setAttribute(e,s,a,o)}else{let o=r,s=n[++i];zC(o)?t.setProperty(e,o,s):t.setAttribute(e,o,s),i++}}return i}function y0(t){return t===3||t===4||t===6}function zC(t){return t.charCodeAt(0)===64}function bh(t,e){if(!(e===null||e.length===0))if(t===null||t.length===0)t=e.slice();else{let n=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?n=r:n===0||(n===-1||n===2?zv(t,n,r,null,e[++i]):zv(t,n,r,null,null))}}return t}function zv(t,e,n,i,r){let o=0,s=t.length;if(e===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===n){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,e),o=s+1),t.splice(o++,0,n),r!==null&&t.splice(o++,0,r)}function _0(t){return t!==qr}function Ul(t){return t&32767}function HC(t){return t>>16}function Vl(t,e){let n=HC(t),i=e;for(;n>0;)i=i[so],n--;return i}var hf=!0;function Bl(t){let e=hf;return hf=t,e}var GC=256,x0=GC-1,b0=5,jC=0,Cn={};function WC(t,e,n){let i;typeof n=="string"?i=n.charCodeAt(0)||0:n.hasOwnProperty(vs)&&(i=n[vs]),i==null&&(i=n[vs]=jC++);let r=i&x0,o=1<<r;e.data[t+(r>>b0)]|=o}function S0(t,e){let n=w0(t,e);if(n!==-1)return n;let i=e[te];i.firstCreatePass&&(t.injectorIndex=e.length,$d(i.data,t),$d(e,null),$d(i.blueprint,null));let r=Sh(t,e),o=t.injectorIndex;if(_0(r)){let s=Ul(r),a=Vl(r,e),l=a[te].data;for(let c=0;c<8;c++)e[o+c]=a[s+c]|l[s+c]}return e[o+8]=r,o}function $d(t,e){t.push(0,0,0,0,0,0,0,0,e)}function w0(t,e){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||e[t.injectorIndex+8]===null?-1:t.injectorIndex}function Sh(t,e){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let n=0,i=null,r=e;for(;r!==null;){if(i=I0(r),i===null)return qr;if(n++,r=r[so],i.injectorIndex!==-1)return i.injectorIndex|n<<16}return qr}function $C(t,e,n){WC(t,e,n)}function qC(t,e){if(e==="class")return t.classes;if(e==="style")return t.styles;let n=t.attrs;if(n){let i=n.length,r=0;for(;r<i;){let o=n[r];if(y0(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof n[r]=="string";)r++;else{if(o===e)return n[r+1];r=r+2}}}return null}function M0(t,e,n){if(n&re.Optional||t!==void 0)return t;ih(e,"NodeInjector")}function E0(t,e,n,i){if(n&re.Optional&&i===void 0&&(i=null),(n&(re.Self|re.Host))===0){let r=t[Kr],o=Ct(void 0);try{return r?r.get(e,i,n&re.Optional):Py(e,i,n&re.Optional)}finally{Ct(o)}}return M0(i,e,n)}function C0(t,e,n,i=re.Default,r){if(t!==null){if(e[K]&2048&&!(i&re.Self)){let s=KC(t,e,n,i,Cn);if(s!==Cn)return s}let o=T0(t,e,n,i,Cn);if(o!==Cn)return o}return E0(e,n,i,r)}function T0(t,e,n,i,r){let o=YC(n);if(typeof o=="function"){if(!l0(e,t,i))return i&re.Host?M0(r,n,i):E0(e,n,i,r);try{let s;if(s=o(i),s==null&&!(i&re.Optional))ih(n);else return s}finally{f0()}}else if(typeof o=="number"){let s=null,a=w0(t,e),l=qr,c=i&re.Host?e[Bt][Dt]:null;for((a===-1||i&re.SkipSelf)&&(l=a===-1?Sh(t,e):e[a+8],l===qr||!Gv(i,!1)?a=-1:(s=e[te],a=Ul(l),e=Vl(l,e)));a!==-1;){let u=e[te];if(Hv(o,a,u.data)){let d=XC(a,e,n,s,i,c);if(d!==Cn)return d}l=e[a+8],l!==qr&&Gv(i,e[te].data[a+8]===c)&&Hv(o,a,e)?(s=u,a=Ul(l),e=Vl(l,e)):a=-1}}return r}function XC(t,e,n,i,r,o){let s=e[te],a=s.data[t+8],l=i==null?ao(a)&&hf:i!=s&&(a.type&3)!==0,c=r&re.Host&&o===a,u=Cl(a,s,n,l,c);return u!==null?zl(e,s,u,a,r):Cn}function Cl(t,e,n,i,r){let o=t.providerIndexes,s=e.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,d=i?a:a+u,h=r?a+u:c;for(let f=d;f<h;f++){let m=s[f];if(f<l&&n===m||f>=l&&m.type===n)return f}if(r){let f=s[l];if(f&&er(f)&&f.type===n)return l}return null}function zl(t,e,n,i,r){let o=t[n],s=e.data;if(o instanceof xs){let a=o;a.resolving&&Ry(kE(s[n]));let l=Bl(a.canSeeViewProviders);a.resolving=!0;let c,u=a.injectImpl?Ct(a.injectImpl):null,d=l0(t,i,re.Default);try{o=t[n]=a.factory(void 0,r,s,t,i),e.firstCreatePass&&n>=i.directiveStart&&FC(n,s[n],e)}finally{u!==null&&Ct(u),Bl(l),a.resolving=!1,f0()}}return o}function YC(t){if(typeof t=="string")return t.charCodeAt(0)||0;let e=t.hasOwnProperty(vs)?t[vs]:void 0;return typeof e=="number"?e>=0?e&x0:ZC:e}function Hv(t,e,n){let i=1<<t;return!!(n[e+(t>>b0)]&i)}function Gv(t,e){return!(t&re.Self)&&!(t&re.Host&&e)}var ji=class{_tNode;_lView;constructor(e,n){this._tNode=e,this._lView=n}get(e,n,i){return C0(this._tNode,this._lView,e,tc(i),n)}};function ZC(){return new ji(Kt(),ce())}function nr(t){return Ql(()=>{let e=t.prototype.constructor,n=e[Dl]||pf(e),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[Dl]||pf(r);if(o&&o!==n)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function pf(t){return Cy(t)?()=>{let e=pf(Yt(t));return e&&e()}:Wi(t)}function KC(t,e,n,i,r){let o=t,s=e;for(;o!==null&&s!==null&&s[K]&2048&&!Fl(s);){let a=T0(o,s,n,i|re.Self,Cn);if(a!==Cn)return a;let l=o.parent;if(!l){let c=s[Hy];if(c){let u=c.get(n,Cn,i);if(u!==Cn)return u}l=I0(s),s=s[so]}o=l}return r}function I0(t){let e=t[te],n=e.type;return n===2?e.declTNode:n===1?t[Dt]:null}function wh(t){return qC(Kt(),t)}function jv(t,e=null,n=null,i){let r=D0(t,e,n,i);return r.resolveInjectorInitializers(),r}function D0(t,e=null,n=null,i,r=new Set){let o=[n||In,eC(t)];return i=i||(typeof t=="object"?void 0:Tt(t)),new ys(o,e||lh(),i||null,r)}var vt=class t{static THROW_IF_NOT_FOUND=Gi;static NULL=new Pl;static create(e,n){if(Array.isArray(e))return jv({name:""},n,e,"");{let i=e.name??"";return jv({name:i},e.parent,e.providers,i)}}static \u0275prov=F({token:t,providedIn:"any",factory:()=>O(Oy)});static __NG_ELEMENT_ID__=-1};var JC=new C("");JC.__NG_ELEMENT_ID__=t=>{let e=Kt();if(e===null)throw new z(204,!1);if(e.type&2)return e.value;if(t&re.Optional)return null;throw new z(204,!1)};var A0=!1,Ln=(()=>{class t{static __NG_ELEMENT_ID__=QC;static __NG_ENV_ID__=n=>n}return t})(),Hl=class extends Ln{_lView;constructor(e){super(),this._lView=e}onDestroy(e){let n=this._lView;return lo(n)?(e(),()=>{}):(e0(n,e),()=>_C(n,e))}};function QC(){return new Hl(ce())}var eo=class{},ac=new C("",{providedIn:"root",factory:()=>!1});var R0=new C(""),N0=new C(""),uo=(()=>{class t{taskId=0;pendingTasks=new Set;get _hasPendingTasks(){return this.hasPendingTasks.value}hasPendingTasks=new je(!1);add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static \u0275prov=F({token:t,providedIn:"root",factory:()=>new t})}return t})();var mf=class extends Ie{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,zy()&&(this.destroyRef=S(Ln,{optional:!0})??void 0,this.pendingTasks=S(uo,{optional:!0})??void 0)}emit(e){let n=ae(null);try{super.next(e)}finally{ae(n)}}subscribe(e,n,i){let r=e,o=n||(()=>null),s=i;if(e&&typeof e=="object"){let l=e;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return e instanceof Be&&e.add(a),a}wrapInTimeout(e){return n=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(n)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},ft=mf;function bs(...t){}function P0(t){let e,n;function i(){t=bs;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{t(),i()})),()=>i()}function Wv(t){return queueMicrotask(()=>t()),()=>{t=bs}}var Mh="isAngularZone",Gl=Mh+"_ID",eT=0,Ae=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ft(!1);onMicrotaskEmpty=new ft(!1);onStable=new ft(!1);onError=new ft(!1);constructor(e){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=A0}=e;if(typeof Zone>"u")throw new z(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,iT(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Mh)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new z(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new z(909,!1)}run(e,n,i){return this._inner.run(e,n,i)}runTask(e,n,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,e,tT,bs,bs);try{return o.runTask(s,n,i)}finally{o.cancelTask(s)}}runGuarded(e,n,i){return this._inner.runGuarded(e,n,i)}runOutsideAngular(e){return this._outer.run(e)}},tT={};function Eh(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function nT(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function e(){P0(()=>{t.callbackScheduled=!1,gf(t),t.isCheckStableRunning=!0,Eh(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{e()}):t._outer.run(()=>{e()}),gf(t)}function iT(t){let e=()=>{nT(t)},n=eT++;t._inner=t._inner.fork({name:"angular",properties:{[Mh]:!0,[Gl]:n,[Gl+n]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(rT(l))return i.invokeTask(o,s,a,l);try{return $v(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&e(),qv(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return $v(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!oT(l)&&e(),qv(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,gf(t),Eh(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function gf(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function $v(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function qv(t){t._nesting--,Eh(t)}var vf=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ft;onMicrotaskEmpty=new ft;onStable=new ft;onError=new ft;run(e,n,i){return e.apply(n,i)}runGuarded(e,n,i){return e.apply(n,i)}runOutsideAngular(e){return e()}runTask(e,n,i,r){return e.apply(n,i)}};function rT(t){return L0(t,"__ignore_ng_zone__")}function oT(t){return L0(t,"__scheduler_tick__")}function L0(t,e){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[e]===!0}var yt=class{_console=console;handleError(e){this._console.error("ERROR",e)}},sT=new C("",{providedIn:"root",factory:()=>{let t=S(Ae),e=S(yt);return n=>t.runOutsideAngular(()=>e.handleError(n))}});function Xv(t,e){return My(t,e)}function aT(t){return My(wy,t)}var Rs=(Xv.required=aT,Xv);function lT(){return fo(Kt(),ce())}function fo(t,e){return new ir(Nn(t,e))}var ir=(()=>{class t{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=lT}return t})();function O0(t){return t instanceof ir?t.nativeElement:t}function Pe(t,e){let n=gd(t,e?.equal),i=n[Ut];return n.set=r=>os(i,r),n.update=r=>vd(i,r),n.asReadonly=cT.bind(n),n}function cT(){let t=this[Ut];if(t.readonlyFn===void 0){let e=()=>this();e[Ut]=t,t.readonlyFn=e}return t.readonlyFn}function uT(){return this._results[Symbol.iterator]()}var yf=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ie}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,n){return this._results.reduce(e,n)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,n){this.dirty=!1;let i=XE(e);(this._changesDetected=!qE(this._results,i,n))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=uT};function F0(t){return(t.flags&128)===128}var k0=function(t){return t[t.OnPush=0]="OnPush",t[t.Default=1]="Default",t}(k0||{}),U0=new Map,dT=0;function fT(){return dT++}function hT(t){U0.set(t[ic],t)}function _f(t){U0.delete(t[ic])}var Yv="__ngContext__";function Ns(t,e){_i(e)?(t[Yv]=e[ic],hT(e)):t[Yv]=e}function V0(t){return z0(t[_s])}function B0(t){return z0(t[dn])}function z0(t){for(;t!==null&&!ti(t);)t=t[dn];return t}var xf;function H0(t){xf=t}function G0(){if(xf!==void 0)return xf;if(typeof document<"u")return document;throw new z(210,!1)}var Ch=new C("",{providedIn:"root",factory:()=>pT}),pT="ng",Th=new C(""),Ps=new C("",{providedIn:"platform",factory:()=>"unknown"});var Ih=new C("",{providedIn:"root",factory:()=>G0().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var mT="h",gT="b";var j0=!1,vT=new C("",{providedIn:"root",factory:()=>j0});var W0=function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t}(W0||{}),lc=new C(""),Zv=new Set;function Ls(t){Zv.has(t)||(Zv.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var $0=(()=>{class t{view;node;constructor(n,i){this.view=n,this.node=i}static __NG_ELEMENT_ID__=yT}return t})();function yT(){return new $0(ce(),Kt())}var _T=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=F({token:t,providedIn:"root",factory:()=>new t})}return t})();var xT=(t,e,n,i)=>{};function bT(t,e,n,i){xT(t,e,n,i)}var ST=()=>null;function q0(t,e,n=!1){return ST(t,e,n)}function X0(t,e){let n=t.contentQueries;if(n!==null){let i=ae(null);try{for(let r=0;r<n.length;r+=2){let o=n[r],s=n[r+1];if(s!==-1){let a=t.data[s];sc(o),a.contentQueries(2,e[s],s)}}}finally{ae(i)}}}function bf(t,e,n){sc(0);let i=ae(null);try{e(t,n)}finally{ae(i)}}function Y0(t,e,n){if(jy(e)){let i=ae(null);try{let r=e.directiveStart,o=e.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=n[s];a.contentQueries(1,l,s)}}}finally{ae(i)}}}var Rn=function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t}(Rn||{});var _l;function wT(){if(_l===void 0&&(_l=null,En.trustedTypes))try{_l=En.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return _l}function cc(t){return wT()?.createHTML(t)||t}var xl;function Z0(){if(xl===void 0&&(xl=null,En.trustedTypes))try{xl=En.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return xl}function Kv(t){return Z0()?.createHTML(t)||t}function Jv(t){return Z0()?.createScriptURL(t)||t}var Jn=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${by})`}},Sf=class extends Jn{getTypeName(){return"HTML"}},wf=class extends Jn{getTypeName(){return"Style"}},Mf=class extends Jn{getTypeName(){return"Script"}},Ef=class extends Jn{getTypeName(){return"URL"}},Cf=class extends Jn{getTypeName(){return"ResourceURL"}};function pn(t){return t instanceof Jn?t.changingThisBreaksApplicationSecurity:t}function ni(t,e){let n=MT(t);if(n!=null&&n!==e){if(n==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${n} (see ${by})`)}return n===e}function MT(t){return t instanceof Jn&&t.getTypeName()||null}function K0(t){return new Sf(t)}function J0(t){return new wf(t)}function Q0(t){return new Mf(t)}function e_(t){return new Ef(t)}function t_(t){return new Cf(t)}function ET(t){let e=new If(t);return CT()?new Tf(e):e}var Tf=class{inertDocumentHelper;constructor(e){this.inertDocumentHelper=e}getInertBodyElement(e){e="<body><remove></remove>"+e;try{let n=new window.DOMParser().parseFromString(cc(e),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(e):(n.firstChild?.remove(),n)}catch{return null}}},If=class{defaultDoc;inertDocument;constructor(e){this.defaultDoc=e,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(e){let n=this.inertDocument.createElement("template");return n.innerHTML=cc(e),n}};function CT(){try{return!!new window.DOMParser().parseFromString(cc(""),"text/html")}catch{return!1}}var TT=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function uc(t){return t=String(t),t.match(TT)?t:"unsafe:"+t}function ii(t){let e={};for(let n of t.split(","))e[n]=!0;return e}function Os(...t){let e={};for(let n of t)for(let i in n)n.hasOwnProperty(i)&&(e[i]=!0);return e}var n_=ii("area,br,col,hr,img,wbr"),i_=ii("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r_=ii("rp,rt"),IT=Os(r_,i_),DT=Os(i_,ii("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),AT=Os(r_,ii("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Qv=Os(n_,DT,AT,IT),o_=ii("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),RT=ii("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),NT=ii("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),PT=Os(o_,RT,NT),LT=ii("script,style,template");var Df=class{sanitizedSomething=!1;buf=[];sanitizeChildren(e){let n=e.firstChild,i=!0,r=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?i=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,i&&n.firstChild){r.push(n),n=kT(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let o=FT(n);if(o){n=o;break}n=r.pop()}}return this.buf.join("")}startElement(e){let n=ey(e).toLowerCase();if(!Qv.hasOwnProperty(n))return this.sanitizedSomething=!0,!LT.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let i=e.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!PT.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;o_[a]&&(l=uc(l)),this.buf.push(" ",s,'="',ty(l),'"')}return this.buf.push(">"),!0}endElement(e){let n=ey(e).toLowerCase();Qv.hasOwnProperty(n)&&!n_.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(e){this.buf.push(ty(e))}};function OT(t,e){return(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function FT(t){let e=t.nextSibling;if(e&&t!==e.previousSibling)throw s_(e);return e}function kT(t){let e=t.firstChild;if(e&&OT(t,e))throw s_(e);return e}function ey(t){let e=t.nodeName;return typeof e=="string"?e:"FORM"}function s_(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var UT=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,VT=/([^\#-~ |!])/g;function ty(t){return t.replace(/&/g,"&amp;").replace(UT,function(e){let n=e.charCodeAt(0),i=e.charCodeAt(1);return"&#"+((n-55296)*1024+(i-56320)+65536)+";"}).replace(VT,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var bl;function Dh(t,e){let n=null;try{bl=bl||ET(t);let i=e?String(e):"";n=bl.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=n.innerHTML,n=bl.getInertBodyElement(i)}while(i!==o);let a=new Df().sanitizeChildren(ny(n)||n);return cc(a)}finally{if(n){let i=ny(n)||n;for(;i.firstChild;)i.firstChild.remove()}}}function ny(t){return"content"in t&&BT(t)?t.content:null}function BT(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function zT(t,e){return t.createText(e)}function HT(t,e,n){t.setValue(e,n)}function a_(t,e,n){return t.createElement(e,n)}function jl(t,e,n,i,r){t.insertBefore(e,n,i,r)}function l_(t,e,n){t.appendChild(e,n)}function iy(t,e,n,i,r){i!==null?jl(t,e,n,i,r):l_(t,e,n)}function GT(t,e,n){t.removeChild(null,e,n)}function jT(t,e,n){t.setAttribute(e,"style",n)}function WT(t,e,n){n===""?t.removeAttribute(e,"class"):t.setAttribute(e,"class",n)}function c_(t,e,n){let{mergedAttrs:i,classes:r,styles:o}=n;i!==null&&BC(t,e,i),r!==null&&WT(t,e,r),o!==null&&jT(t,e,o)}var mn=function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t}(mn||{});function u_(t){let e=Ah();return e?Kv(e.sanitize(mn.HTML,t)||""):ni(t,"HTML")?Kv(pn(t)):Dh(G0(),Tn(t))}function $T(t){let e=Ah();return e?e.sanitize(mn.URL,t)||"":ni(t,"URL")?pn(t):uc(Tn(t))}function qT(t){let e=Ah();if(e)return Jv(e.sanitize(mn.RESOURCE_URL,t)||"");if(ni(t,"ResourceURL"))return Jv(pn(t));throw new z(904,!1)}var XT=new Set(["embed","frame","iframe","media","script"]),YT=new Set(["base","link","script"]);function ZT(t,e){return e==="src"&&XT.has(t)||e==="href"&&YT.has(t)||e==="xlink:href"&&t==="script"?qT:$T}function d_(t,e,n){return ZT(e,n)(t)}function Ah(){let t=ce();return t&&t[Zn].sanitizer}function Rh(t){return t.ownerDocument}function f_(t){return t instanceof Function?t():t}function KT(t,e,n){let i=t.length;for(;;){let r=t.indexOf(e,n);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=e.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}n=r+1}}var h_="ng-template";function JT(t,e,n,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&KT(e[r+1].toLowerCase(),n,0)!==-1)return!0}else if(Nh(t))return!1;if(r=e.indexOf(1,r),r>-1){let o;for(;++r<e.length&&typeof(o=e[r])=="string";)if(o.toLowerCase()===n)return!0}return!1}function Nh(t){return t.type===4&&t.value!==h_}function QT(t,e,n){let i=t.type===4&&!n?h_:t.value;return e===i}function eI(t,e,n){let i=4,r=t.attrs,o=r!==null?iI(r):0,s=!1;for(let a=0;a<e.length;a++){let l=e[a];if(typeof l=="number"){if(!s&&!cn(i)&&!cn(l))return!1;if(s&&cn(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!QT(t,l,n)||l===""&&e.length===1){if(cn(i))return!1;s=!0}}else if(i&8){if(r===null||!JT(t,r,l,n)){if(cn(i))return!1;s=!0}}else{let c=e[++a],u=tI(l,r,Nh(t),n);if(u===-1){if(cn(i))return!1;s=!0;continue}if(c!==""){let d;if(u>o?d="":d=r[u+1].toLowerCase(),i&2&&c!==d){if(cn(i))return!1;s=!0}}}}return cn(i)||s}function cn(t){return(t&1)===0}function tI(t,e,n,i){if(e===null)return-1;let r=0;if(i||!n){let o=!1;for(;r<e.length;){let s=e[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return rI(e,t)}function p_(t,e,n=!1){for(let i=0;i<e.length;i++)if(eI(t,e[i],n))return!0;return!1}function nI(t){let e=t.attrs;if(e!=null){let n=e.indexOf(5);if((n&1)===0)return e[n+1]}return null}function iI(t){for(let e=0;e<t.length;e++){let n=t[e];if(y0(n))return e}return t.length}function rI(t,e){let n=t.indexOf(4);if(n>-1)for(n++;n<t.length;){let i=t[n];if(typeof i=="number")return-1;if(i===e)return n;n++}return-1}function oI(t,e){e:for(let n=0;n<e.length;n++){let i=e[n];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function ry(t,e){return t?":not("+e.trim()+")":e}function sI(t){let e=t[0],n=1,i=2,r="",o=!1;for(;n<t.length;){let s=t[n];if(typeof s=="string")if(i&2){let a=t[++n];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!cn(s)&&(e+=ry(o,r),r=""),i=s,o=o||!cn(i);n++}return r!==""&&(e+=ry(o,r)),e}function aI(t){return t.map(sI).join(",")}function lI(t){let e=[],n=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&e.push(o,t[++i]):r===8&&n.push(o);else{if(!cn(r))break;r=o}i++}return n.length&&e.push(1,...n),e}var At={};function Ph(t,e,n,i,r,o,s,a,l,c,u){let d=at+i,h=d+r,f=cI(d,h),m=typeof c=="function"?c():c;return f[te]={type:t,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:e,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:u}}function cI(t,e){let n=[];for(let i=0;i<e;i++)n.push(i<t?null:At);return n}function uI(t){let e=t.tView;return e===null||e.incompleteFirstPass?t.tView=Ph(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):e}function Lh(t,e,n,i,r,o,s,a,l,c,u){let d=e.blueprint.slice();return d[ei]=r,d[K]=i|4|128|8|64|1024,(c!==null||t&&t[K]&2048)&&(d[K]|=2048),Jy(d),d[pt]=d[so]=t,d[Ke]=n,d[Zn]=s||t&&t[Zn],d[Je]=a||t&&t[Je],d[Kr]=l||t&&t[Kr]||null,d[Dt]=o,d[ic]=fT(),d[Zr]=u,d[Hy]=c,d[Bt]=e.type==2?t[Bt]:d,d}function dI(t,e,n){let i=Nn(e,t),r=uI(n),o=t[Zn].rendererFactory,s=Oh(t,Lh(t,r,null,m_(n),i,e,null,o.createRenderer(i,n),null,null,null));return t[e.index]=s}function m_(t){let e=16;return t.signals?e=4096:t.onPush&&(e=64),e}function g_(t,e,n,i){if(n===0)return-1;let r=e.length;for(let o=0;o<n;o++)e.push(i),t.blueprint.push(i),t.data.push(null);return r}function Oh(t,e){return t[_s]?t[Uv][dn]=e:t[_s]=e,t[Uv]=e,e}function x(t=1){v_(_t(),ce(),Pn()+t,!1)}function v_(t,e,n,i){if(!i)if((e[K]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Ml(e,o,n)}else{let o=t.preOrderHooks;o!==null&&El(e,o,0,n)}Ki(n)}var dc=function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t}(dc||{});function Af(t,e,n,i){let r=ae(null);try{let[o,s,a]=t.inputs[n],l=null;(s&dc.SignalBased)!==0&&(l=e[o][Ut]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(e,i)),t.setInput!==null?t.setInput(e,l,i,n,o):Wy(e,l,o,i)}finally{ae(r)}}function y_(t,e,n,i,r){let o=Pn(),s=i&2;try{Ki(-1),s&&e.length>at&&v_(t,e,at,!1),Ne(s?2:0,r),n(i,r)}finally{Ki(o),Ne(s?3:1,r)}}function Fh(t,e,n){yI(t,e,n),(n.flags&64)===64&&_I(t,e,n)}function __(t,e,n=Nn){let i=e.localNames;if(i!==null){let r=e.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?n(e,t):t[s];t[r++]=a}}}function fI(t,e,n,i){let o=i.get(vT,j0)||n===Rn.ShadowDom,s=t.selectRootElement(e,o);return hI(s),s}function hI(t){pI(t)}var pI=()=>null;function mI(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function gI(t,e,n,i,r,o,s,a){if(!a&&kh(e,t,n,i,r)){ao(e)&&vI(n,e.index);return}if(e.type&3){let l=Nn(e,n);i=mI(i),r=s!=null?s(r,e.value||"",i):r,o.setProperty(l,i,r)}else e.type&12}function vI(t,e){let n=An(e,t);n[K]&16||(n[K]|=64)}function yI(t,e,n){let i=n.directiveStart,r=n.directiveEnd;ao(n)&&dI(e,n,t.data[i+n.componentOffset]),t.firstCreatePass||S0(n,e);let o=n.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=zl(e,t,s,n);if(Ns(l,e),o!==null&&wI(e,s-i,l,a,n,o),er(a)){let c=An(n.index,e);c[Ke]=zl(e,t,s,n)}}}function _I(t,e,n){let i=n.directiveStart,r=n.directiveEnd,o=n.index,s=AC();try{Ki(o);for(let a=i;a<r;a++){let l=t.data[a],c=e[a];ff(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&xI(l,c)}}finally{Ki(-1),ff(s)}}function xI(t,e){t.hostBindings!==null&&t.hostBindings(1,e)}function x_(t,e){let n=t.directiveRegistry,i=null;if(n)for(let r=0;r<n.length;r++){let o=n[r];p_(e,o.selectors,!1)&&(i??=[],er(o)?i.unshift(o):i.push(o))}return i}function bI(t,e,n,i,r,o){let s=Nn(t,e);SI(e[Je],s,o,t.value,n,i,r)}function SI(t,e,n,i,r,o,s){if(o==null)t.removeAttribute(e,r,n);else{let a=s==null?Tn(o):s(o,i||"",r);t.setAttribute(e,r,a,n)}}function wI(t,e,n,i,r,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];Af(i,n,l,c)}}function MI(t,e){let n=t[Kr],i=n?n.get(yt,null):null;i&&i.handleError(e)}function kh(t,e,n,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],d=e.data[c];Af(d,n[c],u,r),a=!0}if(o)for(let l of o){let c=n[l],u=e.data[l];Af(u,c,i,r),a=!0}return a}function EI(t,e){let n=An(e,t),i=n[te];CI(i,n);let r=n[ei];r!==null&&n[Zr]===null&&(n[Zr]=q0(r,n[Kr])),Ne(18),Uh(i,n,n[Ke]),Ne(19,n[Ke])}function CI(t,e){for(let n=e.length;n<t.blueprint.length;n++)e.push(t.blueprint[n])}function Uh(t,e,n){vh(e);try{let i=t.viewQuery;i!==null&&bf(1,i,n);let r=t.template;r!==null&&y_(t,e,r,1,n),t.firstCreatePass&&(t.firstCreatePass=!1),e[Kn]?.finishViewCreation(t),t.staticContentQueries&&X0(t,e),t.staticViewQueries&&bf(2,t.viewQuery,n);let o=t.components;o!==null&&TI(e,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{e[K]&=-5,yh()}}function TI(t,e){for(let n=0;n<e.length;n++)EI(t,e[n])}function Fs(t,e,n,i){let r=ae(null);try{let o=e.tView,a=t[K]&4096?4096:16,l=Lh(t,o,n,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[e.index];l[qi]=c;let u=t[Kn];return u!==null&&(l[Kn]=u.createEmbeddedView(o)),Uh(o,l,n),l}finally{ae(r)}}function to(t,e){return!e||e.firstChild===null||F0(t)}var II;function Vh(t,e){return II(t,e)}var Qn=function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t}(Qn||{});function Bh(t){return(t.flags&32)===32}function $r(t,e,n,i,r){if(i!=null){let o,s=!1;ti(i)?o=i:_i(i)&&(s=!0,i=i[ei]);let a=Dn(i);t===0&&n!==null?r==null?l_(e,n,a):jl(e,n,a,r||null,!0):t===1&&n!==null?jl(e,n,a,r||null,!0):t===2?GT(e,a,s):t===3&&e.destroyNode(a),o!=null&&UI(e,t,o,n,r)}}function DI(t,e){b_(t,e),e[ei]=null,e[Dt]=null}function AI(t,e,n,i,r,o){i[ei]=r,i[Dt]=e,hc(t,i,n,1,r,o)}function b_(t,e){e[Zn].changeDetectionScheduler?.notify(9),hc(t,e,e[Je],2,null,null)}function RI(t){let e=t[_s];if(!e)return qd(t[te],t);for(;e;){let n=null;if(_i(e))n=e[_s];else{let i=e[ht];i&&(n=i)}if(!n){for(;e&&!e[dn]&&e!==t;)_i(e)&&qd(e[te],e),e=e[pt];e===null&&(e=t),_i(e)&&qd(e[te],e),n=e&&e[dn]}e=n}}function zh(t,e){let n=t[Jr],i=n.indexOf(e);n.splice(i,1)}function fc(t,e){if(lo(e))return;let n=e[Je];n.destroyNode&&hc(t,e,n,3,null,null),RI(e)}function qd(t,e){if(lo(e))return;let n=ae(null);try{e[K]&=-129,e[K]|=256,e[Zt]&&rs(e[Zt]),PI(t,e),NI(t,e),e[te].type===1&&e[Je].destroy();let i=e[qi];if(i!==null&&ti(e[pt])){i!==e[pt]&&zh(i,e);let r=e[Kn];r!==null&&r.detachView(t)}_f(e)}finally{ae(n)}}function NI(t,e){let n=t.cleanup,i=e[Ll];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[n[s+1]];n[s].call(a)}i!==null&&(e[Ll]=null);let r=e[yi];if(r!==null){e[yi]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=e[Xi];if(o!==null){e[Xi]=null;for(let s of o)s.destroy()}}function PI(t,e){let n;if(t!=null&&(n=t.destroyHooks)!=null)for(let i=0;i<n.length;i+=2){let r=e[n[i]];if(!(r instanceof xs)){let o=n[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Ne(4,a,l);try{l.call(a)}finally{Ne(5,a,l)}}else{Ne(4,r,o);try{o.call(r)}finally{Ne(5,r,o)}}}}}function S_(t,e,n){return LI(t,e.parent,n)}function LI(t,e,n){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return n[ei];if(ao(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Rn.None||r===Rn.Emulated)return null}return Nn(i,n)}function w_(t,e,n){return FI(t,e,n)}function OI(t,e,n){return t.type&40?Nn(t,n):null}var FI=OI,oy;function Hh(t,e,n,i){let r=S_(t,i,e),o=e[Je],s=i.parent||e[Dt],a=w_(s,i,e);if(r!=null)if(Array.isArray(n))for(let l=0;l<n.length;l++)iy(o,r,n[l],a,!1);else iy(o,r,n,a,!1);oy!==void 0&&oy(o,i,e,n,r)}function gs(t,e){if(e!==null){let n=e.type;if(n&3)return Nn(e,t);if(n&4)return Rf(-1,t[e.index]);if(n&8){let i=e.child;if(i!==null)return gs(t,i);{let r=t[e.index];return ti(r)?Rf(-1,r):Dn(r)}}else{if(n&128)return gs(t,e.next);if(n&32)return Vh(e,t)()||Dn(t[e.index]);{let i=M_(t,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Zi(t[Bt]);return gs(r,i)}else return gs(t,e.next)}}}return null}function M_(t,e){if(e!==null){let i=t[Bt][Dt],r=e.projection;return i.projection[r]}return null}function Rf(t,e){let n=ht+t+1;if(n<e.length){let i=e[n],r=i[te].firstChild;if(r!==null)return gs(i,r)}return e[Yi]}function Gh(t,e,n,i,r,o,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=i[n.index],l=n.type;if(s&&e===0&&(a&&Ns(Dn(a),i),n.flags|=2),!Bh(n))if(l&8)Gh(t,e,n.child,i,r,o,!1),$r(e,t,r,a,o);else if(l&32){let c=Vh(n,i),u;for(;u=c();)$r(e,t,r,u,o);$r(e,t,r,a,o)}else l&16?E_(t,e,i,n,r,o):$r(e,t,r,a,o);n=s?n.projectionNext:n.next}}function hc(t,e,n,i,r,o){Gh(n,i,t.firstChild,e,r,o,!1)}function kI(t,e,n){let i=e[Je],r=S_(t,n,e),o=n.parent||e[Dt],s=w_(o,n,e);E_(i,0,e,n,r,s)}function E_(t,e,n,i,r,o){let s=n[Bt],l=s[Dt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];$r(e,t,r,u,o)}else{let c=l,u=s[pt];F0(i)&&(c.flags|=128),Gh(t,e,c,u,r,o,!0)}}function UI(t,e,n,i,r){let o=n[Yi],s=Dn(n);o!==s&&$r(e,t,i,o,r);for(let a=ht;a<n.length;a++){let l=n[a];hc(l[te],l,t,e,i,o)}}function VI(t,e,n,i,r){if(e)r?t.addClass(n,i):t.removeClass(n,i);else{let o=i.indexOf("-")===-1?void 0:Qn.DashCase;r==null?t.removeStyle(n,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Qn.Important),t.setStyle(n,i,r,o))}}function Wl(t,e,n,i,r=!1){for(;n!==null;){if(n.type===128){n=r?n.projectionNext:n.next;continue}let o=e[n.index];o!==null&&i.push(Dn(o)),ti(o)&&BI(o,i);let s=n.type;if(s&8)Wl(t,e,n.child,i);else if(s&32){let a=Vh(n,e),l;for(;l=a();)i.push(l)}else if(s&16){let a=M_(e,n);if(Array.isArray(a))i.push(...a);else{let l=Zi(e[Bt]);Wl(l[te],l,a,i,!0)}}n=r?n.projectionNext:n.next}return i}function BI(t,e){for(let n=ht;n<t.length;n++){let i=t[n],r=i[te].firstChild;r!==null&&Wl(i[te],i,r,e)}t[Yi]!==t[ei]&&e.push(t[Yi])}function C_(t){if(t[jd]!==null){for(let e of t[jd])e.impl.addSequence(e);t[jd].length=0}}var T_=[];function zI(t){return t[Zt]??HI(t)}function HI(t){let e=T_.pop()??Object.create(jI);return e.lView=t,e}function GI(t){t.lView[Zt]!==t&&(t.lView=null,T_.push(t))}var jI=M(y({},Ar),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{Is(t.lView)},consumerOnSignalRead(){this.lView[Zt]=this}});function WI(t){let e=t[Zt]??Object.create($I);return e.lView=t,e}var $I=M(y({},Ar),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let e=Zi(t.lView);for(;e&&!I_(e[te]);)e=Zi(e);e&&Qy(e)},consumerOnSignalRead(){this.lView[Zt]=this}});function I_(t){return t.type!==2}function D_(t){if(t[Xi]===null)return;let e=!0;for(;e;){let n=!1;for(let i of t[Xi])i.dirty&&(n=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=n&&!!(t[K]&8192)}}var qI=100;function A_(t,e=!0,n=0){let r=t[Zn].rendererFactory,o=!1;o||r.begin?.();try{XI(t,n)}catch(s){throw e&&MI(t,s),s}finally{o||r.end?.()}}function XI(t,e){let n=s0();try{kl(!0),Nf(t,e);let i=0;for(;rc(t);){if(i===qI)throw new z(103,!1);i++,Nf(t,1)}}finally{kl(n)}}function YI(t,e,n,i){if(lo(e))return;let r=e[K],o=!1,s=!1;vh(e);let a=!0,l=null,c=null;o||(I_(t)?(c=zI(e),l=is(c)):dd()===null?(a=!1,c=WI(e),l=is(c)):e[Zt]&&(rs(e[Zt]),e[Zt]=null));try{Jy(e),TC(t.bindingStartIndex),n!==null&&y_(t,e,n,2,i);let u=(r&3)===3;if(!o)if(u){let f=t.preOrderCheckHooks;f!==null&&Ml(e,f,null)}else{let f=t.preOrderHooks;f!==null&&El(e,f,0,null),Wd(e,0)}if(s||ZI(e),D_(e),R_(e,0),t.contentQueries!==null&&X0(t,e),!o)if(u){let f=t.contentCheckHooks;f!==null&&Ml(e,f)}else{let f=t.contentHooks;f!==null&&El(e,f,1),Wd(e,1)}JI(t,e);let d=t.components;d!==null&&P_(e,d,0);let h=t.viewQuery;if(h!==null&&bf(2,h,i),!o)if(u){let f=t.viewCheckHooks;f!==null&&Ml(e,f)}else{let f=t.viewHooks;f!==null&&El(e,f,2),Wd(e,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),e[Gd]){for(let f of e[Gd])f();e[Gd]=null}o||(C_(e),e[K]&=-73)}catch(u){throw o||Is(e),u}finally{c!==null&&(za(c,l),a&&GI(c)),yh()}}function R_(t,e){for(let n=V0(t);n!==null;n=B0(n))for(let i=ht;i<n.length;i++){let r=n[i];N_(r,e)}}function ZI(t){for(let e=V0(t);e!==null;e=B0(e)){if(!(e[K]&2))continue;let n=e[Jr];for(let i=0;i<n.length;i++){let r=n[i];Qy(r)}}}function KI(t,e,n){Ne(18);let i=An(e,t);N_(i,n),Ne(19,i[Ke])}function N_(t,e){fh(t)&&Nf(t,e)}function Nf(t,e){let i=t[te],r=t[K],o=t[Zt],s=!!(e===0&&r&16);if(s||=!!(r&64&&e===0),s||=!!(r&1024),s||=!!(o?.dirty&&Ha(o)),s||=!1,o&&(o.dirty=!1),t[K]&=-9217,s)YI(i,t,i.template,t[Ke]);else if(r&8192){D_(t),R_(t,1);let a=i.components;a!==null&&P_(t,a,1),C_(t)}}function P_(t,e,n){for(let i=0;i<e.length;i++)KI(t,e[i],n)}function JI(t,e){let n=t.hostBindingOpCodes;if(n!==null)try{for(let i=0;i<n.length;i++){let r=n[i];if(r<0)Ki(~r);else{let o=r,s=n[++i],a=n[++i];DC(s,o);let l=e[o];Ne(24,l),a(2,l),Ne(25,l)}}}finally{Ki(-1)}}function jh(t,e){let n=s0()?64:1088;for(t[Zn].changeDetectionScheduler?.notify(e);t;){t[K]|=n;let i=Zi(t);if(Fl(t)&&!i)return t;t=i}return null}function L_(t,e,n,i){return[t,!0,0,e,null,i,null,n,null,null]}function O_(t,e){let n=ht+e;if(n<t.length)return t[n]}function ks(t,e,n,i=!0){let r=e[te];if(QI(r,e,t,n),i){let s=Rf(n,t),a=e[Je],l=a.parentNode(t[Yi]);l!==null&&AI(r,t[Dt],a,e,l,s)}let o=e[Zr];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function F_(t,e){let n=Ss(t,e);return n!==void 0&&fc(n[te],n),n}function Ss(t,e){if(t.length<=ht)return;let n=ht+e,i=t[n];if(i){let r=i[qi];r!==null&&r!==t&&zh(r,i),e>0&&(t[n-1][dn]=i[dn]);let o=Nl(t,ht+e);DI(i[te],i);let s=o[Kn];s!==null&&s.detachView(o[te]),i[pt]=null,i[dn]=null,i[K]&=-129}return i}function QI(t,e,n,i){let r=ht+i,o=n.length;i>0&&(n[r-1][dn]=e),i<o-ht?(e[dn]=n[r],Ly(n,ht+i,e)):(n.push(e),e[dn]=null),e[pt]=n;let s=e[qi];s!==null&&n!==s&&k_(s,e);let a=e[Kn];a!==null&&a.insertView(t),uf(e),e[K]|=128}function k_(t,e){let n=t[Jr],i=e[pt];if(_i(i))t[K]|=2;else{let r=i[pt][Bt];e[Bt]!==r&&(t[K]|=2)}n===null?t[Jr]=[e]:n.push(e)}var ws=class{_lView;_cdRefInjectingView;notifyErrorHandler;_appRef=null;_attachedToViewContainer=!1;get rootNodes(){let e=this._lView,n=e[te];return Wl(n,e,n.firstChild,[])}constructor(e,n,i=!0){this._lView=e,this._cdRefInjectingView=n,this.notifyErrorHandler=i}get context(){return this._lView[Ke]}set context(e){this._lView[Ke]=e}get destroyed(){return lo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[pt];if(ti(e)){let n=e[Ol],i=n?n.indexOf(this):-1;i>-1&&(Ss(e,i),Nl(n,i))}this._attachedToViewContainer=!1}fc(this._lView[te],this._lView)}onDestroy(e){e0(this._lView,e)}markForCheck(){jh(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[K]&=-129}reattach(){uf(this._lView),this._lView[K]|=128}detectChanges(){this._lView[K]|=1024,A_(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new z(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Fl(this._lView),n=this._lView[qi];n!==null&&!e&&zh(n,this._lView),b_(this._lView[te],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new z(902,!1);this._appRef=e;let n=Fl(this._lView),i=this._lView[qi];i!==null&&!n&&k_(i,this._lView),uf(this._lView)}};var Ms=(()=>{class t{static __NG_ELEMENT_ID__=nD}return t})(),eD=Ms,tD=class extends eD{_declarationLView;_declarationTContainer;elementRef;constructor(e,n,i){super(),this._declarationLView=e,this._declarationTContainer=n,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,n){return this.createEmbeddedViewImpl(e,n)}createEmbeddedViewImpl(e,n,i){let r=Fs(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:n,dehydratedView:i});return new ws(r)}};function nD(){return Wh(Kt(),ce())}function Wh(t,e){return t.type&4?new tD(e,t,fo(t,e)):null}function pc(t,e,n,i,r){let o=t.data[e];if(o===null)o=iD(t,e,n,i,r),IC()&&(o.flags|=32);else if(o.type&64){o.type=n,o.value=i,o.attrs=r;let s=CC();o.injectorIndex=s===null?-1:s.injectorIndex}return Ds(o,!0),o}function iD(t,e,n,i,r){let o=i0(),s=r0(),a=s?o:o&&o.parent,l=t.data[e]=oD(t,a,n,e,i,r);return rD(t,l,o,s),l}function rD(t,e,n,i){t.firstChild===null&&(t.firstChild=e),n!==null&&(i?n.child==null&&e.parent!==null&&(n.child=e):n.next===null&&(n.next=e,e.prev=n))}function oD(t,e,n,i,r,o){let s=e?e.injectorIndex:-1,a=0;return n0()&&(a|=128),{type:n,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var j5=new RegExp(`^(\\d+)*(${gT}|${mT})*(.*)`);var sD=()=>null;function no(t,e){return sD(t,e)}var aD=class{},U_=class{},Pf=class{resolveComponentFactory(e){throw Error(`No component factory found for ${Tt(e)}.`)}},mc=class{static NULL=new Pf},io=class{},$h=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>lD()}return t})();function lD(){let t=ce(),e=Kt(),n=An(e.index,t);return(_i(n)?n:t)[Je]}var cD=(()=>{class t{static \u0275prov=F({token:t,providedIn:"root",factory:()=>null})}return t})();var Xd={},Lf=class{injector;parentInjector;constructor(e,n){this.injector=e,this.parentInjector=n}get(e,n,i){i=tc(i);let r=this.injector.get(e,Xd,i);return r!==Xd||n===Xd?r:this.parentInjector.get(e,n,i)}};function sy(t,e,n){let i=n?t.styles:null,r=n?t.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)r=ef(r,a);else if(o==2){let l=a,c=e[++s];i=ef(i,l+": "+c+";")}}n?t.styles=i:t.stylesWithoutHost=i,n?t.classes=r:t.classesWithoutHost=r}function On(t,e=re.Default){let n=ce();if(n===null)return O(t,e);let i=Kt();return C0(i,n,Yt(t),e)}function V_(t,e,n,i,r){let o=i===null?null:{"":-1},s=r(t,n);if(s!==null){let a,l=null,c=null,u=dD(s);u===null?a=s:[a,l,c]=u,pD(t,e,n,a,o,l,c)}o!==null&&i!==null&&uD(n,i,o)}function uD(t,e,n){let i=t.localNames=[];for(let r=0;r<e.length;r+=2){let o=n[e[r+1]];if(o==null)throw new z(-301,!1);i.push(e[r],o)}}function dD(t){let e=null,n=!1;for(let s=0;s<t.length;s++){let a=t[s];if(s===0&&er(a)&&(e=a),a.findHostDirectiveDefs!==null){n=!0;break}}if(!n)return null;let i=null,r=null,o=null;for(let s of t)s.findHostDirectiveDefs!==null&&(i??=[],r??=new Map,o??=new Map,fD(s,i,o,r)),s===e&&(i??=[],i.push(s));return i!==null?(i.push(...e===null?t:t.slice(1)),[i,r,o]):null}function fD(t,e,n,i){let r=e.length;t.findHostDirectiveDefs(t,e,i),n.set(t,[r,e.length-1])}function hD(t,e,n){e.componentOffset=n,(t.components??=[]).push(e.index)}function pD(t,e,n,i,r,o,s){let a=i.length,l=!1;for(let h=0;h<a;h++){let f=i[h];!l&&er(f)&&(l=!0,hD(t,n,h)),$C(S0(n,e),t,f.type)}xD(n,t.data.length,a);for(let h=0;h<a;h++){let f=i[h];f.providersResolver&&f.providersResolver(f)}let c=!1,u=!1,d=g_(t,e,a,null);a>0&&(n.directiveToIndex=new Map);for(let h=0;h<a;h++){let f=i[h];if(n.mergedAttrs=bh(n.mergedAttrs,f.hostAttrs),gD(t,n,e,d,f),_D(d,f,r),s!==null&&s.has(f)){let[_,T]=s.get(f);n.directiveToIndex.set(f.type,[d,_+n.directiveStart,T+n.directiveStart])}else(o===null||!o.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let m=f.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((t.preOrderHooks??=[]).push(n.index),c=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}mD(t,n,o)}function mD(t,e,n){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=t.data[i];if(n===null||!n.has(r))ay(0,e,r,i),ay(1,e,r,i),cy(e,i,!1);else{let o=n.get(r);ly(0,e,o,i),ly(1,e,o,i),cy(e,i,!0)}}}function ay(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(i),B_(e,o)}}function ly(t,e,n,i){let r=t===0?n.inputs:n.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),B_(e,s)}}function B_(t,e){e==="class"?t.flags|=8:e==="style"&&(t.flags|=16)}function cy(t,e,n){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!n&&r===null||n&&o===null||Nh(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!n&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===e){s??=[],s.push(l,i[a+1]);break}}else if(n&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===e){s??=[],s.push(c[u+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function gD(t,e,n,i,r){t.data[i]=r;let o=r.factory||(r.factory=Wi(r.type,!0)),s=new xs(o,er(r),On);t.blueprint[i]=s,n[i]=s,vD(t,e,i,g_(t,n,r.hostVars,At),r)}function vD(t,e,n,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~e.index;yD(s)!=a&&s.push(a),s.push(n,i,o)}}function yD(t){let e=t.length;for(;e>0;){let n=t[--e];if(typeof n=="number"&&n<0)return n}return 0}function _D(t,e,n){if(n){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)n[e.exportAs[i]]=t;er(e)&&(n[""]=t)}}function xD(t,e,n){t.flags|=1,t.directiveStart=e,t.directiveEnd=e+n,t.providerIndexes=e}function z_(t,e,n,i,r,o,s,a){let l=e.consts,c=Qr(l,s),u=pc(e,t,2,i,c);return o&&V_(e,n,u,Qr(l,a),r),u.mergedAttrs=bh(u.mergedAttrs,u.attrs),u.attrs!==null&&sy(u,u.attrs,!1),u.mergedAttrs!==null&&sy(u,u.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,u),u}function H_(t,e){g0(t,e),jy(e)&&t.queries.elementEnd(e)}var $l=class extends mc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let n=Yr(e);return new Es(n,this.ngModule)}};function bD(t){return Object.keys(t).map(e=>{let[n,i,r]=t[e],o={propName:n,templateName:e,isSignal:(i&dc.SignalBased)!==0};return r&&(o.transform=r),o})}function SD(t){return Object.keys(t).map(e=>({propName:t[e],templateName:e}))}function wD(t,e,n){let i=e instanceof Vt?e:e?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new Lf(n,i):n}function MD(t){let e=t.get(io,null);if(e===null)throw new z(407,!1);let n=t.get(cD,null),i=t.get(eo,null);return{rendererFactory:e,sanitizer:n,changeDetectionScheduler:i}}function ED(t,e){let n=(t.selectors[0][0]||"div").toLowerCase();return a_(e,n,n==="svg"?Yy:n==="math"?pC:null)}var Es=class extends U_{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=bD(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=SD(this.componentDef.outputs),this.cachedOutputs}constructor(e,n){super(),this.componentDef=e,this.ngModule=n,this.componentType=e.type,this.selector=aI(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!n}create(e,n,i,r){Ne(22);let o=ae(null);try{let s=this.componentDef,a=i?["ng-version","19.2.21"]:lI(this.componentDef.selectors[0]),l=Ph(0,null,null,1,0,null,null,null,null,[a],null),c=wD(s,r||this.ngModule,e),u=MD(c),d=u.rendererFactory.createRenderer(null,s),h=i?fI(d,i,s.encapsulation,c):ED(s,d),f=Lh(null,l,null,512|m_(s),null,null,u,d,c,null,q0(h,c,!0));f[at]=h,vh(f);let m=null;try{let _=z_(at,l,f,"#host",()=>[this.componentDef],!0,0);h&&(c_(d,h,_),Ns(h,f)),Fh(l,f,_),Y0(l,_,f),H_(l,_),n!==void 0&&CD(_,this.ngContentSelectors,n),m=An(_.index,f),f[Ke]=m[Ke],Uh(l,f,null)}catch(_){throw m!==null&&_f(m),_f(f),_}finally{Ne(23),yh()}return new Of(this.componentType,f)}finally{ae(o)}}},Of=class extends aD{_rootLView;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,n){super(),this._rootLView=n,this._tNode=dh(n[te],at),this.location=fo(this._tNode,n),this.instance=An(this._tNode.index,n)[Ke],this.hostView=this.changeDetectorRef=new ws(n,void 0,!1),this.componentType=e}setInput(e,n){let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),n))return;let r=this._rootLView,o=kh(i,r[te],r,e,n);this.previousInputValues.set(e,n);let s=An(i.index,r);jh(s,1)}get injector(){return new ji(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function CD(t,e,n){let i=t.projection=[];for(let r=0;r<e.length;r++){let o=n[r];i.push(o!=null&&o.length?Array.from(o):null)}}var ho=(()=>{class t{static __NG_ELEMENT_ID__=TD}return t})();function TD(){let t=Kt();return j_(t,ce())}var ID=ho,G_=class extends ID{_lContainer;_hostTNode;_hostLView;constructor(e,n,i){super(),this._lContainer=e,this._hostTNode=n,this._hostLView=i}get element(){return fo(this._hostTNode,this._hostLView)}get injector(){return new ji(this._hostTNode,this._hostLView)}get parentInjector(){let e=Sh(this._hostTNode,this._hostLView);if(_0(e)){let n=Vl(e,this._hostLView),i=Ul(e),r=n[te].data[i+8];return new ji(r,n)}else return new ji(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let n=uy(this._lContainer);return n!==null&&n[e]||null}get length(){return this._lContainer.length-ht}createEmbeddedView(e,n,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=no(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(n||{},o,s);return this.insertImpl(a,r,to(this._hostTNode,s)),a}createComponent(e,n,i,r,o){let s=e&&!uC(e),a;if(s)a=n;else{let m=n||{};a=m.index,i=m.injector,r=m.projectableNodes,o=m.environmentInjector||m.ngModuleRef}let l=s?e:new Es(Yr(e)),c=i||this.parentInjector;if(!o&&l.ngModule==null){let _=(s?c:this.parentInjector).get(Vt,null);_&&(o=_)}let u=Yr(l.componentType??{}),d=no(this._lContainer,u?.id??null),h=d?.firstChild??null,f=l.create(c,r,h,o);return this.insertImpl(f.hostView,a,to(this._hostTNode,d)),f}insert(e,n){return this.insertImpl(e,n,!0)}insertImpl(e,n,i){let r=e._lView;if(vC(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let l=r[pt],c=new G_(l,l[Dt],l[pt]);c.detach(c.indexOf(e))}}let o=this._adjustIndex(n),s=this._lContainer;return ks(s,r,o,i),e.attachToViewContainerRef(),Ly(Yd(s),o,e),e}move(e,n){return this.insert(e,n)}indexOf(e){let n=uy(this._lContainer);return n!==null?n.indexOf(e):-1}remove(e){let n=this._adjustIndex(e,-1),i=Ss(this._lContainer,n);i&&(Nl(Yd(this._lContainer),n),fc(i[te],i))}detach(e){let n=this._adjustIndex(e,-1),i=Ss(this._lContainer,n);return i&&Nl(Yd(this._lContainer),n)!=null?new ws(i):null}_adjustIndex(e,n=0){return e??this.length+n}};function uy(t){return t[Ol]}function Yd(t){return t[Ol]||(t[Ol]=[])}function j_(t,e){let n,i=e[t.index];return ti(i)?n=i:(n=L_(i,e,null,t),e[t.index]=n,Oh(e,n)),AD(n,e,t,i),new G_(n,t,e)}function DD(t,e){let n=t[Je],i=n.createComment(""),r=Nn(e,t),o=n.parentNode(r);return jl(n,o,i,n.nextSibling(r),!1),i}var AD=PD,RD=()=>!1;function ND(t,e,n){return RD(t,e,n)}function PD(t,e,n,i){if(t[Yi])return;let r;n.type&8?r=Dn(i):r=DD(e,n),t[Yi]=r}var Ff=class t{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},kf=class t{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let n=e.queries;if(n!==null){let i=e.contentQueries!==null?e.contentQueries[0]:n.length,r=[];for(let o=0;o<i;o++){let s=n.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let n=0;n<this.queries.length;n++)Xh(e,n).matches!==null&&this.queries[n].setDirty()}},Uf=class{flags;read;predicate;constructor(e,n,i=null){this.flags=n,this.read=i,typeof e=="string"?this.predicate=VD(e):this.predicate=e}},Vf=class t{queries;constructor(e=[]){this.queries=e}elementStart(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,n)}elementEnd(e){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(e)}embeddedTView(e){let n=null;for(let i=0;i<this.length;i++){let r=n!==null?n.length:0,o=this.getByIndex(i).embeddedTView(e,r);o&&(o.indexInDeclarationView=i,n!==null?n.push(o):n=[o])}return n!==null?new t(n):null}template(e,n){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,n)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Bf=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,n=-1){this.metadata=e,this._declarationNodeIndex=n}elementStart(e,n){this.isApplyingToNode(n)&&this.matchTNode(e,n)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,n){this.elementStart(e,n)}embeddedTView(e,n){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,n),new t(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==n;)i=i.parent;return n===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,n){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(e,n,LD(n,o)),this.matchTNodeWithReadOption(e,n,Cl(n,e,o,!1,!1))}else i===Ms?n.type&4&&this.matchTNodeWithReadOption(e,n,-1):this.matchTNodeWithReadOption(e,n,Cl(n,e,i,!1,!1))}matchTNodeWithReadOption(e,n,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===ir||r===ho||r===Ms&&n.type&4)this.addMatch(n.index,-2);else{let o=Cl(n,e,r,!1,!1);o!==null&&this.addMatch(n.index,o)}else this.addMatch(n.index,i)}}addMatch(e,n){this.matches===null?this.matches=[e,n]:this.matches.push(e,n)}};function LD(t,e){let n=t.localNames;if(n!==null){for(let i=0;i<n.length;i+=2)if(n[i]===e)return n[i+1]}return null}function OD(t,e){return t.type&11?fo(t,e):t.type&4?Wh(t,e):null}function FD(t,e,n,i){return n===-1?OD(e,t):n===-2?kD(t,e,i):zl(t,t[te],n,e)}function kD(t,e,n){if(n===ir)return fo(e,t);if(n===Ms)return Wh(e,t);if(n===ho)return j_(e,t)}function W_(t,e,n,i){let r=e[Kn].queries[i];if(r.matches===null){let o=t.data,s=n.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(FD(e,u,s[l+1],n.metadata.read))}}r.matches=a}return r.matches}function zf(t,e,n,i){let r=t.queries.getByIndex(n),o=r.matches;if(o!==null){let s=W_(t,e,r,n);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],u=e[-l];for(let d=ht;d<u.length;d++){let h=u[d];h[qi]===h[pt]&&zf(h[te],h,c,i)}if(u[Jr]!==null){let d=u[Jr];for(let h=0;h<d.length;h++){let f=d[h];zf(f[te],f,c,i)}}}}}return i}function qh(t,e){return t[Kn].queries[e].queryList}function UD(t,e,n){let i=new yf((n&4)===4);return xC(t,e,i,i.destroy),(e[Kn]??=new kf).queries.push(new Ff(i))-1}function $_(t,e,n){let i=_t();return i.firstCreatePass&&(BD(i,new Uf(t,e,n),-1),(e&2)===2&&(i.staticViewQueries=!0)),UD(i,ce(),e)}function VD(t){return t.split(",").map(e=>e.trim())}function BD(t,e,n){t.queries===null&&(t.queries=new Vf),t.queries.track(new Bf(e,n))}function Xh(t,e){return t.queries.getByIndex(e)}function q_(t,e){let n=t[te],i=Xh(n,e);return i.crossesNgTemplate?zf(n,t,e,[]):W_(n,t,i,e)}function X_(t,e,n){let i,r=Wa(()=>{i._dirtyCounter();let o=jD(i,t);if(e&&o===void 0)throw new z(-951,!1);return o});return i=r[Ut],i._dirtyCounter=Pe(0),i._flatValue=void 0,r}function zD(t){return X_(!0,!1,t)}function HD(t){return X_(!0,!0,t)}function GD(t,e){let n=t[Ut];n._lView=ce(),n._queryIndex=e,n._queryList=qh(n._lView,e),n._queryList.onDirty(()=>n._dirtyCounter.update(i=>i+1))}function jD(t,e){let n=t._lView,i=t._queryIndex;if(n===void 0||i===void 0||n[K]&4)return e?void 0:In;let r=qh(n,i),o=q_(n,i);return r.reset(o,O0),e?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}function dy(t,e){return zD(e)}function WD(t,e){return HD(e)}var po=(dy.required=WD,dy);var ro=class{},Yh=class{};var Hf=class extends ro{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new $l(this);constructor(e,n,i,r=!0){super(),this.ngModuleType=e,this._parent=n;let o=ky(e);this._bootstrapComponents=f_(o.bootstrap),this._r3Injector=D0(e,n,[{provide:ro,useValue:this},{provide:mc,useValue:this.componentFactoryResolver},...i],Tt(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},Gf=class extends Yh{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new Hf(this.moduleType,e,[])}};var ql=class extends ro{injector;componentFactoryResolver=new $l(this);instance=null;constructor(e){super();let n=new ys([...e.providers,{provide:ro,useValue:this},{provide:mc,useValue:this.componentFactoryResolver}],e.parent||lh(),e.debugName,new Set(["environment"]));this.injector=n,e.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function gc(t,e,n=null){return new ql({providers:t,parent:e,debugName:n,runEnvironmentInitializers:!0}).injector}var $D=(()=>{class t{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let i=Uy(!1,n.type),r=i.length>0?gc([i],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,r)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=F({token:t,providedIn:"environment",factory:()=>new t(O(Vt))})}return t})();function Me(t){return Ql(()=>{let e=Y_(t),n=M(y({},e),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===k0.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&t.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get($D).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Rn.Emulated,styles:t.styles||In,_:null,schemas:t.schemas||null,tView:null,id:""});e.standalone&&Ls("NgStandalone"),Z_(n);let i=t.dependencies;return n.directiveDefs=fy(i,!1),n.pipeDefs=fy(i,!0),n.id=KD(n),n})}function qD(t){return Yr(t)||JE(t)}function XD(t){return t!==null}function YD(t,e){if(t==null)return Xr;let n={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=dc.None,l=null),n[o]=[i,a,l],e[o]=s}return n}function ZD(t){if(t==null)return Xr;let e={};for(let n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}function Us(t){return Ql(()=>{let e=Y_(t);return Z_(e),e})}function vc(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function Y_(t){let e={};return{type:t.type,providersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:e,inputConfig:t.inputs||Xr,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||In,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:YD(t.inputs,e),outputs:ZD(t.outputs),debugInfo:null}}function Z_(t){t.features?.forEach(e=>e(t))}function fy(t,e){if(!t)return null;let n=e?QE:qD;return()=>(typeof t=="function"?t():t).map(i=>n(i)).filter(XD)}function KD(t){let e=0,n=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,n,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function K_(t,e,n){return t[e]=n}function fn(t,e,n){let i=t[e];return Object.is(i,n)?!1:(t[e]=n,!0)}function Zh(t,e,n,i){let r=fn(t,e,n);return fn(t,e+1,i)||r}function JD(t,e,n,i,r){let o=Zh(t,e,n,i);return fn(t,e+2,r)||o}function QD(t,e,n,i,r,o,s,a,l){let c=e.consts,u=pc(e,t,4,s||null,a||null);t0()&&V_(e,n,u,Qr(c,l),x_),u.mergedAttrs=bh(u.mergedAttrs,u.attrs),g0(e,u);let d=u.tView=Ph(2,u,i,r,o,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function Xl(t,e,n,i,r,o,s,a,l,c){let u=n+at,d=e.firstCreatePass?QD(u,e,t,i,r,o,s,a,l):e.data[u];Ds(d,!1);let h=eA(e,t,d,n);_h()&&Hh(e,t,h,d),Ns(h,t);let f=L_(h,t,h,d);return t[u]=f,Oh(t,f),ND(f,d,t),uh(d)&&Fh(e,t,d),l!=null&&__(t,d,c),d}function Ue(t,e,n,i,r,o,s,a){let l=ce(),c=_t(),u=Qr(c.consts,o);return Xl(l,c,t,e,n,i,r,u,s,a),Ue}var eA=tA;function tA(t,e,n,i){return xh(!0),e[Je].createComment("")}var Kh=(()=>{class t{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();var J_=new C("");var Q_=(()=>{class t{static \u0275prov=F({token:t,providedIn:"root",factory:()=>new jf})}return t})(),jf=class{queuedEffectCount=0;queues=new Map;schedule(e){this.enqueue(e)}remove(e){let n=e.zone,i=this.queues.get(n);i.has(e)&&(i.delete(e),this.queuedEffectCount--)}enqueue(e){let n=e.zone;this.queues.has(n)||this.queues.set(n,new Set);let i=this.queues.get(n);i.has(e)||(this.queuedEffectCount++,i.add(e))}flush(){for(;this.queuedEffectCount>0;)for(let[e,n]of this.queues)e===null?this.flushQueue(n):e.run(()=>this.flushQueue(n))}flushQueue(e){for(let n of e)e.delete(n),this.queuedEffectCount--,n.run()}};function Vs(t){return!!t&&typeof t.then=="function"}function ex(t){return!!t&&typeof t.subscribe=="function"}var nA=new C("");var tx=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,i)=>{this.resolve=n,this.reject=i});appInits=S(nA,{optional:!0})??[];injector=S(vt);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let r of this.appInits){let o=hn(this.injector,r);if(Vs(o))n.push(o);else if(ex(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});n.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{i()}).catch(r=>{this.reject(r)}),n.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Jh=new C("");function iA(){md(()=>{throw new z(600,!1)})}function rA(t){return t.isBoundToModule}var oA=10;var xi=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=S(sT);afterRenderManager=S(_T);zonelessEnabled=S(ac);rootEffectScheduler=S(Q_);dirtyFlags=0;tracingSnapshot=null;externalTestViews=new Set;afterTick=new Ie;get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];isStable=S(uo).hasPendingTasks.pipe(G(n=>!n));constructor(){S(lc,{optional:!0})}whenStable(){let n;return new Promise(i=>{n=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{n.unsubscribe()})}_injector=S(Vt);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,i){return this.bootstrapImpl(n,i)}bootstrapImpl(n,i,r=vt.NULL){Ne(10);let o=n instanceof U_;if(!this._injector.get(tx).done){let f="";throw new z(405,f)}let a;o?a=n:a=this._injector.get(mc).resolveComponentFactory(n),this.componentTypes.push(a.componentType);let l=rA(a)?void 0:this._injector.get(ro),c=i||a.selector,u=a.create(r,[],c,l),d=u.location.nativeElement,h=u.injector.get(J_,null);return h?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),Tl(this.components,u),h?.unregisterApplication(d)}),this._loadComponent(u),Ne(11,u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Ne(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(W0.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new z(101,!1);let n=ae(null);try{this._runningTick=!0,this.synchronize()}catch(i){this.internalErrorHandler(i)}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ae(n),this.afterTick.next(),Ne(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(io,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<oA;)Ne(14),this.synchronizeOnce(),Ne(15)}synchronizeOnce(){if(this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush()),this.dirtyFlags&7){let n=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i,notifyErrorHandler:r}of this.allViews)sA(i,r,n,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}else this._rendererFactory?.begin?.(),this._rendererFactory?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>rc(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let i=n;this._views.push(i),i.attachToAppRef(this)}detachView(n){let i=n;Tl(this._views,i),i.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView),this.tick(),this.components.push(n),this._injector.get(Jh,[]).forEach(r=>r(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>Tl(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new z(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Tl(t,e){let n=t.indexOf(e);n>-1&&t.splice(n,1)}function sA(t,e,n,i){if(!n&&!rc(t))return;A_(t,e,n&&!i?0:1)}function se(t,e,n,i){let r=ce(),o=As();if(fn(r,o,e)){let s=_t(),a=h0();bI(a,r,t,e,n,i)}return se}function aA(t,e,n,i){return fn(t,As(),n)?e+Tn(n)+i:At}function lA(t,e,n,i,r,o){let s=a0(),a=Zh(t,s,n,r);return oc(2),a?e+Tn(n)+i+Tn(r)+o:At}function cA(t,e,n,i,r,o,s,a){let l=a0(),c=JD(t,l,n,r,s);return oc(3),c?e+Tn(n)+i+Tn(r)+o+Tn(s)+a:At}function Sl(t,e){return t<<17|e<<2}function Ji(t){return t>>17&32767}function uA(t){return(t&2)==2}function dA(t,e){return t&131071|e<<17}function Wf(t){return t|2}function oo(t){return(t&131068)>>2}function Zd(t,e){return t&-131069|e<<2}function fA(t){return(t&1)===1}function $f(t){return t|1}function hA(t,e,n,i,r,o){let s=o?e.classBindings:e.styleBindings,a=Ji(s),l=oo(s);t[i]=n;let c=!1,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||Ts(d,u)>0)&&(c=!0)}else u=n;if(r)if(l!==0){let h=Ji(t[a+1]);t[i+1]=Sl(h,a),h!==0&&(t[h+1]=Zd(t[h+1],i)),t[a+1]=dA(t[a+1],i)}else t[i+1]=Sl(a,0),a!==0&&(t[a+1]=Zd(t[a+1],i)),a=i;else t[i+1]=Sl(l,0),a===0?a=i:t[l+1]=Zd(t[l+1],i),l=i;c&&(t[i+1]=Wf(t[i+1])),hy(t,u,i,!0),hy(t,u,i,!1),pA(e,u,t,i,o),s=Sl(a,l),o?e.classBindings=s:e.styleBindings=s}function pA(t,e,n,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof e=="string"&&Ts(o,e)>=0&&(n[i+1]=$f(n[i+1]))}function hy(t,e,n,i){let r=t[n+1],o=e===null,s=i?Ji(r):oo(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];mA(l,e)&&(a=!0,t[s+1]=i?$f(c):Wf(c)),s=i?Ji(c):oo(c)}a&&(t[n+1]=i?Wf(r):$f(r))}function mA(t,e){return t===null||e==null||(Array.isArray(t)?t[1]:t)===e?!0:Array.isArray(t)&&typeof e=="string"?Ts(t,e)>=0:!1}var un={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function gA(t){return t.substring(un.key,un.keyEnd)}function vA(t){return yA(t),nx(t,ix(t,0,un.textEnd))}function nx(t,e){let n=un.textEnd;return n===e?-1:(e=un.keyEnd=_A(t,un.key=e,n),ix(t,e,n))}function yA(t){un.key=0,un.keyEnd=0,un.value=0,un.valueEnd=0,un.textEnd=t.length}function ix(t,e,n){for(;e<n&&t.charCodeAt(e)<=32;)e++;return e}function _A(t,e,n){for(;e<n&&t.charCodeAt(e)>32;)e++;return e}function U(t,e,n){let i=ce(),r=As();if(fn(i,r,e)){let o=_t(),s=h0();gI(o,s,i,t,e,i[Je],n,!1)}return U}function qf(t,e,n,i,r){kh(e,t,n,r?"class":"style",i)}function mo(t,e,n){return ox(t,e,n,!1),mo}function mt(t,e){return ox(t,e,null,!0),mt}function rx(t){bA(TA,xA,t,!0)}function xA(t,e){for(let n=vA(e);n>=0;n=nx(e,n))sh(t,gA(e),!0)}function ox(t,e,n,i){let r=ce(),o=_t(),s=oc(2);if(o.firstUpdatePass&&ax(o,t,s,i),e!==At&&fn(r,s,e)){let a=o.data[Pn()];lx(o,a,r,r[Je],t,r[s+1]=DA(e,n),i,s)}}function bA(t,e,n,i){let r=_t(),o=oc(2);r.firstUpdatePass&&ax(r,null,o,i);let s=ce();if(n!==At&&fn(s,o,n)){let a=r.data[Pn()];if(cx(a,i)&&!sx(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(n=ef(l,n||"")),qf(r,a,s,n,i)}else IA(r,a,s,s[Je],s[o+1],s[o+1]=CA(t,e,n),i,o)}}function sx(t,e){return e>=t.expandoStartIndex}function ax(t,e,n,i){let r=t.data;if(r[n+1]===null){let o=r[Pn()],s=sx(t,n);cx(o,i)&&e===null&&!s&&(e=!1),e=SA(r,o,e,i),hA(r,o,e,n,s,i)}}function SA(t,e,n,i){let r=RC(t),o=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(n=Kd(null,t,e,n,i),n=Cs(n,e.attrs,i),o=null);else{let s=e.directiveStylingLast;if(s===-1||t[s]!==r)if(n=Kd(r,t,e,n,i),o===null){let l=wA(t,e,i);l!==void 0&&Array.isArray(l)&&(l=Kd(null,t,e,l[1],i),l=Cs(l,e.attrs,i),MA(t,e,i,l))}else o=EA(t,e,i)}return o!==void 0&&(i?e.residualClasses=o:e.residualStyles=o),n}function wA(t,e,n){let i=n?e.classBindings:e.styleBindings;if(oo(i)!==0)return t[Ji(i)]}function MA(t,e,n,i){let r=n?e.classBindings:e.styleBindings;t[Ji(r)]=i}function EA(t,e,n){let i,r=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=Cs(i,s,n)}return Cs(i,e.attrs,n)}function Kd(t,e,n,i,r){let o=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(o=e[a],i=Cs(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(n.directiveStylingLast=a),i}function Cs(t,e,n){let i=n?1:2,r=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),sh(t,s,n?!0:e[++o]))}return t===void 0?null:t}function CA(t,e,n){if(n==null||n==="")return In;let i=[],r=pn(n);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&e(i,r);return i}function TA(t,e,n){let i=String(e);i!==""&&!i.includes(" ")&&sh(t,i,n)}function IA(t,e,n,i,r,o,s,a){r===At&&(r=In);let l=0,c=0,u=0<r.length?r[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let h=l<r.length?r[l+1]:void 0,f=c<o.length?o[c+1]:void 0,m=null,_;u===d?(l+=2,c+=2,h!==f&&(m=d,_=f)):d===null||u!==null&&u<d?(l+=2,m=u):(c+=2,m=d,_=f),m!==null&&lx(t,e,n,i,m,_,s,a),u=l<r.length?r[l]:null,d=c<o.length?o[c]:null}}function lx(t,e,n,i,r,o,s,a){if(!(e.type&3))return;let l=t.data,c=l[a+1],u=fA(c)?py(l,e,n,r,oo(c),s):void 0;if(!Yl(u)){Yl(o)||uA(c)&&(o=py(l,null,n,r,a,s));let d=Zy(Pn(),n);VI(i,s,d,r,o)}}function py(t,e,n,i,r,o){let s=e===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,d=u===null,h=n[r+1];h===At&&(h=d?In:void 0);let f=d?zd(h,i):u===i?h:void 0;if(c&&!Yl(f)&&(f=zd(l,i)),Yl(f)&&(a=f,s))return a;let m=t[r+1];r=s?Ji(m):oo(m)}if(e!==null){let l=o?e.residualClasses:e.residualStyles;l!=null&&(a=zd(l,i))}return a}function Yl(t){return t!==void 0}function DA(t,e){return t==null||t===""||(typeof e=="string"?t=t+e:typeof t=="object"&&(t=Tt(pn(t)))),t}function cx(t,e){return(t.flags&(e?8:16))!==0}var Xf=class{destroy(e){}updateValue(e,n){}swap(e,n){let i=Math.min(e,n),r=Math.max(e,n),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(e,n){this.attach(n,this.detach(e))}};function Jd(t,e,n,i,r){return t===n&&Object.is(e,i)?1:Object.is(r(t,e),r(n,i))?-1:0}function AA(t,e,n){let i,r,o=0,s=t.length-1,a=void 0;if(Array.isArray(e)){let l=e.length-1;for(;o<=s&&o<=l;){let c=t.at(o),u=e[o],d=Jd(o,c,o,u,n);if(d!==0){d<0&&t.updateValue(o,u),o++;continue}let h=t.at(s),f=e[l],m=Jd(s,h,l,f,n);if(m!==0){m<0&&t.updateValue(s,f),s--,l--;continue}let _=n(o,c),T=n(s,h),I=n(o,u);if(Object.is(I,T)){let B=n(l,f);Object.is(B,_)?(t.swap(o,s),t.updateValue(s,f),l--,s--):t.move(s,o),t.updateValue(o,u),o++;continue}if(i??=new Zl,r??=gy(t,o,s,n),Yf(t,i,o,I))t.updateValue(o,u),o++,s++;else if(r.has(I))i.set(_,t.detach(o)),s--;else{let B=t.create(o,e[o]);t.attach(o,B),o++,s++}}for(;o<=l;)my(t,i,n,o,e[o]),o++}else if(e!=null){let l=e[Symbol.iterator](),c=l.next();for(;!c.done&&o<=s;){let u=t.at(o),d=c.value,h=Jd(o,u,o,d,n);if(h!==0)h<0&&t.updateValue(o,d),o++,c=l.next();else{i??=new Zl,r??=gy(t,o,s,n);let f=n(o,d);if(Yf(t,i,o,f))t.updateValue(o,d),o++,s++,c=l.next();else if(!r.has(f))t.attach(o,t.create(o,d)),o++,s++,c=l.next();else{let m=n(o,u);i.set(m,t.detach(o)),s--}}}for(;!c.done;)my(t,i,n,t.length,c.value),c=l.next()}for(;o<=s;)t.destroy(t.detach(s--));i?.forEach(l=>{t.destroy(l)})}function Yf(t,e,n,i){return e!==void 0&&e.has(i)?(t.attach(n,e.get(i)),e.delete(i),!0):!1}function my(t,e,n,i,r){if(Yf(t,e,i,n(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function gy(t,e,n,i){let r=new Set;for(let o=e;o<=n;o++)r.add(i(o,t.at(o)));return r}var Zl=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let n=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(e,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,n){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,n)}else this.kvMap.set(e,n)}forEach(e){for(let[n,i]of this.kvMap)if(e(i,n),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,n)}}};function He(t,e){Ls("NgControlFlow");let n=ce(),i=As(),r=n[i]!==At?n[i]:-1,o=r!==-1?Kl(n,at+r):void 0,s=0;if(fn(n,i,t)){let a=ae(null);try{if(o!==void 0&&F_(o,s),t!==-1){let l=at+t,c=Kl(n,l),u=Qf(n[te],l),d=no(c,u.tView.ssrId),h=Fs(n,u,e,{dehydratedView:d});ks(c,h,s,to(u,d))}}finally{ae(a)}}else if(o!==void 0){let a=O_(o,s);a!==void 0&&(a[Ke]=e)}}var Zf=class{lContainer;$implicit;$index;constructor(e,n,i){this.lContainer=e,this.$implicit=n,this.$index=i}get $count(){return this.lContainer.length-ht}};function bi(t,e){return e}var Kf=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,n,i){this.hasEmptyBlock=e,this.trackByFn=n,this.liveCollection=i}};function lt(t,e,n,i,r,o,s,a,l,c,u,d,h){Ls("NgControlFlow");let f=ce(),m=_t(),_=l!==void 0,T=ce(),I=a?s.bind(T[Bt][Ke]):s,B=new Kf(_,I);T[at+t]=B,Xl(f,m,t+1,e,n,i,r,Qr(m.consts,o)),_&&Xl(f,m,t+2,l,c,u,d,Qr(m.consts,h))}var Jf=class extends Xf{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,n,i){super(),this.lContainer=e,this.hostLView=n,this.templateTNode=i}get length(){return this.lContainer.length-ht}at(e){return this.getLView(e)[Ke].$implicit}attach(e,n){let i=n[Zr];this.needsIndexUpdate||=e!==this.length,ks(this.lContainer,n,e,to(this.templateTNode,i))}detach(e){return this.needsIndexUpdate||=e!==this.length-1,RA(this.lContainer,e)}create(e,n){let i=no(this.lContainer,this.templateTNode.tView.ssrId),r=Fs(this.hostLView,this.templateTNode,new Zf(this.lContainer,n,e),{dehydratedView:i});return this.operationsCounter?.recordCreate(),r}destroy(e){fc(e[te],e),this.operationsCounter?.recordDestroy()}updateValue(e,n){this.getLView(e)[Ke].$implicit=n}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Ke].$index=e}getLView(e){return NA(this.lContainer,e)}};function ct(t){let e=ae(null),n=Pn();try{let i=ce(),r=i[te],o=i[n],s=n+1,a=Kl(i,s);if(o.liveCollection===void 0){let c=Qf(r,s);o.liveCollection=new Jf(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(AA(l,t,o.trackByFn),l.updateIndexes(),o.hasEmptyBlock){let c=As(),u=l.length===0;if(fn(i,c,u)){let d=n+2,h=Kl(i,d);if(u){let f=Qf(r,d),m=no(h,f.tView.ssrId),_=Fs(i,f,void 0,{dehydratedView:m});ks(h,_,0,to(f,m))}else F_(h,0)}}}finally{ae(e)}}function Kl(t,e){return t[e]}function RA(t,e){return Ss(t,e)}function NA(t,e){return O_(t,e)}function Qf(t,e){return dh(t,e)}function g(t,e,n,i){let r=ce(),o=_t(),s=at+t,a=r[Je],l=o.firstCreatePass?z_(s,o,r,e,x_,t0(),n,i):o.data[s],c=PA(o,r,l,a,e,t);r[s]=c;let u=uh(l);return Ds(l,!0),c_(a,c,l),!Bh(l)&&_h()&&Hh(o,r,c,l),(bC()===0||u)&&Ns(c,r),SC(),u&&(Fh(o,r,l),Y0(o,l,r)),i!==null&&__(r,l),g}function v(){let t=Kt();r0()?o0():(t=t.parent,Ds(t,!1));let e=t;MC(e)&&EC(),wC();let n=_t();return n.firstCreatePass&&H_(n,e),e.classesWithoutHost!=null&&UC(e)&&qf(n,e,ce(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&VC(e)&&qf(n,e,ce(),e.stylesWithoutHost,!1),v}function xe(t,e,n,i){return g(t,e,n,i),v(),xe}var PA=(t,e,n,i,r,o)=>(xh(!0),a_(i,r,OC()));function zt(){return ce()}var Hi=void 0;function LA(t){let e=Math.floor(Math.abs(t)),n=t.toString().replace(/^[^.]*\.?/,"").length;return e===1&&n===0?1:5}var OA=["en",[["a","p"],["AM","PM"],Hi],[["AM","PM"],Hi,Hi],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Hi,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Hi,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",Hi,"{1} 'at' {0}",Hi],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",LA],Qd={};function Qh(t){let e=FA(t),n=vy(e);if(n)return n;let i=e.split("-")[0];if(n=vy(i),n)return n;if(i==="en")return OA;throw new z(701,!1)}function vy(t){return t in Qd||(Qd[t]=En.ng&&En.ng.common&&En.ng.common.locales&&En.ng.common.locales[t]),Qd[t]}var go=function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t}(go||{});function FA(t){return t.toLowerCase().replace(/_/g,"-")}var Jl="en-US";var kA=Jl;function UA(t){typeof t=="string"&&(kA=t.toLowerCase().replace(/_/g,"-"))}function yy(t,e,n){return function i(r){if(r===Function)return n;let o=ao(t)?An(t.index,e):e;jh(o,5);let s=e[Ke],a=_y(e,s,n,r),l=i.__ngNextListenerFn__;for(;l;)a=_y(e,s,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function _y(t,e,n,i){let r=ae(null);try{return Ne(6,e,n),n(i)!==!1}catch(o){return VA(t,o),!1}finally{Ne(7,e,n),ae(r)}}function VA(t,e){let n=t[Kr],i=n?n.get(yt,null):null;i&&i.handleError(e)}function xy(t,e,n,i,r,o){let s=e[n],a=e[te],c=a.data[n].outputs[i],u=s[c],d=a.firstCreatePass?ph(a):null,h=hh(e),f=u.subscribe(o),m=h.length;h.push(o,f),d&&d.push(r,t.index,m,-(m+1))}function D(t,e,n,i){let r=ce(),o=_t(),s=Kt();return zA(o,r,r[Je],s,t,e,i),D}function BA(t,e,n,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===n&&r[o+1]===i){let a=e[Ll],l=r[o+2];return a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function zA(t,e,n,i,r,o,s){let a=uh(i),c=t.firstCreatePass?ph(t):null,u=hh(e),d=!0;if(i.type&3||s){let h=Nn(i,e),f=s?s(h):h,m=u.length,_=s?I=>s(Dn(I[i.index])):i.index,T=null;if(!s&&a&&(T=BA(t,e,r,i.index)),T!==null){let I=T.__ngLastListenerFn__||T;I.__ngNextListenerFn__=o,T.__ngLastListenerFn__=o,d=!1}else{o=yy(i,e,o),bT(e,f,r,o);let I=n.listen(f,r,o);u.push(o,I),c&&c.push(r,_,m,m+1)}}else o=yy(i,e,o);if(d){let h=i.outputs?.[r],f=i.hostDirectiveOutputs?.[r];if(f&&f.length)for(let m=0;m<f.length;m+=2){let _=f[m],T=f[m+1];xy(i,e,_,T,r,o)}if(h&&h.length)for(let m of h)xy(i,e,m,r,r,o)}}function E(t=1){return PC(t)}function HA(t,e){let n=null,i=nI(t);for(let r=0;r<e.length;r++){let o=e[r];if(o==="*"){n=r;continue}if(i===null?p_(t,o,!0):oI(i,o))return r}return n}function ux(t){let e=ce()[Bt][Dt];if(!e.projection){let n=t?t.length:1,i=e.projection=YE(n,null),r=i.slice(),o=e.child;for(;o!==null;){if(o.type!==128){let s=t?HA(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function dx(t,e=0,n,i,r,o){let s=ce(),a=_t(),l=i?t+1:null;l!==null&&Xl(s,a,l,i,r,o,null,n);let c=pc(a,at+t,16,null,n||null);c.projection===null&&(c.projection=e),o0();let d=!s[Zr]||n0();s[Bt][Dt].projection[c.projection]===null&&l!==null?GA(s,a,l):d&&!Bh(c)&&kI(a,s,c)}function GA(t,e,n){let i=at+n,r=e.data[i],o=t[i],s=no(o,r.tView.ssrId),a=Fs(t,r,void 0,{dehydratedView:s});ks(o,a,0,to(r,s))}function Bs(t,e,n){$_(t,e,n)}function vo(t){let e=ce(),n=_t(),i=gh();sc(i+1);let r=Xh(n,i);if(t.dirty&&gC(e)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=q_(e,i);t.reset(o,O0),t.notifyOnChanges()}return!0}return!1}function yo(){return qh(ce(),gh())}function _o(t,e,n,i){GD(t,$_(e,n,i))}function yc(t=1){sc(gh()+t)}function b(t,e=""){let n=ce(),i=_t(),r=t+at,o=i.firstCreatePass?pc(i,r,1,e,null):i.data[r],s=jA(i,n,o,e,t);n[r]=s,_h()&&Hh(i,n,s,o),Ds(o,!1)}var jA=(t,e,n,i,r)=>(xh(!0),zT(e[Je],i));function et(t){return ge("",t,""),et}function ge(t,e,n){let i=ce(),r=aA(i,t,e,n);return r!==At&&ep(i,Pn(),r),ge}function xo(t,e,n,i,r){let o=ce(),s=lA(o,t,e,n,i,r);return s!==At&&ep(o,Pn(),s),xo}function zs(t,e,n,i,r,o,s){let a=ce(),l=cA(a,t,e,n,i,r,o,s);return l!==At&&ep(a,Pn(),l),zs}function ep(t,e,n){let i=Zy(e,t);HT(t[Je],i,n)}function fx(t,e,n,i){return px(ce(),mh(),t,e,n,i)}function hx(t,e){let n=t[e];return n===At?void 0:n}function px(t,e,n,i,r,o){let s=e+n;return fn(t,s,r)?K_(t,s+1,o?i.call(o,r):i(r)):hx(t,s+1)}function WA(t,e,n,i,r,o,s){let a=e+n;return Zh(t,a,r,o)?K_(t,a+2,s?i.call(s,r,o):i(r,o)):hx(t,a+2)}function Ht(t,e){let n=_t(),i,r=t+at;n.firstCreatePass?(i=$A(e,n.pipeRegistry),n.data[r]=i,i.onDestroy&&(n.destroyHooks??=[]).push(r,i.onDestroy)):i=n.data[r];let o=i.factory||(i.factory=Wi(i.type,!0)),s,a=Ct(On);try{let l=Bl(!1),c=o();return Bl(l),mC(n,ce(),r,c),c}finally{Ct(a)}}function $A(t,e){if(e)for(let n=e.length-1;n>=0;n--){let i=e[n];if(t===i.name)return i}}function mx(t,e,n){let i=t+at,r=ce(),o=Ky(r,i);return gx(r,i)?px(r,mh(),e,o.transform,n,o):o.transform(n)}function gn(t,e,n,i){let r=t+at,o=ce(),s=Ky(o,r);return gx(o,r)?WA(o,mh(),e,s.transform,n,i,s):s.transform(n,i)}function gx(t,e){return t[te].data[e].pure}var eh=class{ngModuleFactory;componentFactories;constructor(e,n){this.ngModuleFactory=e,this.componentFactories=n}},vx=(()=>{class t{compileModuleSync(n){return new Gf(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let i=this.compileModuleSync(n),r=ky(n),o=f_(r.declarations).reduce((s,a)=>{let l=Yr(a);return l&&s.push(new Es(l)),s},[]);return new eh(i,o)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var qA=(()=>{class t{zone=S(Ae);changeDetectionScheduler=S(eo);applicationRef=S(xi);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),XA=new C("",{factory:()=>!1});function yx({ngZoneFactory:t,ignoreChangesOutsideZone:e,scheduleInRootZone:n}){return t??=()=>new Ae(M(y({},xx()),{scheduleInRootZone:n})),[{provide:Ae,useFactory:t},{provide:$i,multi:!0,useFactory:()=>{let i=S(qA,{optional:!0});return()=>i.initialize()}},{provide:$i,multi:!0,useFactory:()=>{let i=S(YA);return()=>{i.initialize()}}},e===!0?{provide:R0,useValue:!0}:[],{provide:N0,useValue:n??A0}]}function _x(t){let e=t?.ignoreChangesOutsideZone,n=t?.scheduleInRootZone,i=yx({ngZoneFactory:()=>{let r=xx(t);return r.scheduleInRootZone=n,r.shouldCoalesceEventChangeDetection&&Ls("NgZone_CoalesceEvent"),new Ae(r)},ignoreChangesOutsideZone:e,scheduleInRootZone:n});return It([{provide:XA,useValue:!0},{provide:ac,useValue:!1},i])}function xx(t){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:t?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:t?.runCoalescing??!1}}var YA=(()=>{class t{subscription=new Be;initialized=!1;zone=S(Ae);pendingTasks=S(uo);initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Ae.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Ae.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ZA=(()=>{class t{appRef=S(xi);taskService=S(uo);ngZone=S(Ae);zonelessEnabled=S(ac);tracing=S(lc,{optional:!0});disableScheduling=S(R0,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Be;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Gl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(S(N0,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof vf||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;let i=!1;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,i=!0;break}case 12:{this.appRef.dirtyFlags|=16,i=!0;break}case 13:{this.appRef.dirtyFlags|=2,i=!0;break}case 11:{i=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(i))return;let r=this.useMicrotaskScheduler?Wv:P0;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(n){return!(this.disableScheduling&&!n||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Gl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){throw this.taskService.remove(n),i}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Wv(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function KA(){return typeof $localize<"u"&&$localize.locale||Jl}var _c=new C("",{providedIn:"root",factory:()=>S(_c,re.Optional|re.SkipSelf)||KA()});var th=new C(""),JA=new C("");function ps(t){return!t.moduleRef}function QA(t){let e=ps(t)?t.r3Injector:t.moduleRef.injector,n=e.get(Ae);return n.run(()=>{ps(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=e.get(yt,null),r;if(n.runOutsideAngular(()=>{r=n.onError.subscribe({next:o=>{i.handleError(o)}})}),ps(t)){let o=()=>e.destroy(),s=t.platformInjector.get(th);s.add(o),e.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(th);s.add(o),t.moduleRef.onDestroy(()=>{Tl(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return t1(i,n,()=>{let o=e.get(tx);return o.runInitializers(),o.donePromise.then(()=>{let s=e.get(_c,Jl);if(UA(s||Jl),!e.get(JA,!0))return ps(t)?e.get(xi):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(ps(t)){let l=e.get(xi);return t.rootComponent!==void 0&&l.bootstrap(t.rootComponent),l}else return e1(t.moduleRef,t.allPlatformModules),t.moduleRef})})})}function e1(t,e){let n=t.injector.get(xi);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(i=>n.bootstrap(i));else if(t.instance.ngDoBootstrap)t.instance.ngDoBootstrap(n);else throw new z(-403,!1);e.push(t)}function t1(t,e,n){try{let i=n();return Vs(i)?i.catch(r=>{throw e.runOutsideAngular(()=>t.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>t.handleError(i)),i}}var Il=null;function n1(t=[],e){return vt.create({name:e,providers:[{provide:nc,useValue:"platform"},{provide:th,useValue:new Set([()=>Il=null])},...t]})}function i1(t=[]){if(Il)return Il;let e=n1(t);return Il=e,iA(),r1(e),e}function r1(t){let e=t.get(Th,null);hn(t,()=>{e?.forEach(n=>n())})}function rr(){return!1}var bo=(()=>{class t{static __NG_ELEMENT_ID__=o1}return t})();function o1(t){return s1(Kt(),ce(),(t&16)===16)}function s1(t,e,n){if(ao(t)&&!n){let i=An(t.index,e);return new ws(i,i)}else if(t.type&175){let i=e[Bt];return new ws(i,e)}return null}function bx(t){let{rootComponent:e,appProviders:n,platformProviders:i,platformRef:r}=t;Ne(8);try{let o=r?.injector??i1(i),s=[yx({}),{provide:eo,useExisting:ZA},...n||[]],a=new ql({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return QA({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{Ne(9)}}function xc(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function bc(t){return yd(t)}function xt(t,e){return Wa(t,e?.equal)}var nh=class{[Ut];constructor(e){this[Ut]=e}destroy(){this[Ut].destroy()}};function Fn(t,e){!e?.injector&&ch(Fn);let n=e?.injector??S(vt),i=e?.manualCleanup!==!0?n.get(Ln):null,r,o=n.get($0,null,{optional:!0}),s=n.get(eo);return o!==null&&!e?.forceRoot?(r=c1(o.view,s,t),i instanceof Hl&&i._lView===o.view&&(i=null)):r=u1(t,n.get(Q_),s),r.injector=n,i!==null&&(r.onDestroyFn=i.onDestroy(()=>r.destroy())),new nh(r)}var Sx=M(y({},Ar),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,cleanupFns:void 0,zone:null,kind:"effect",onDestroyFn:bs,run(){if(this.dirty=!1,this.hasRun&&!Ha(this))return;this.hasRun=!0;let t=i=>(this.cleanupFns??=[]).push(i),e=is(this),n=kl(!1);try{this.maybeCleanup(),this.fn(t)}finally{kl(n),za(this,e)}},maybeCleanup(){if(this.cleanupFns?.length)try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[]}}}),a1=M(y({},Sx),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){rs(this),this.onDestroyFn(),this.maybeCleanup(),this.scheduler.remove(this)}}),l1=M(y({},Sx),{consumerMarkedDirty(){this.view[K]|=8192,Is(this.view),this.notifier.notify(13)},destroy(){rs(this),this.onDestroyFn(),this.maybeCleanup(),this.view[Xi]?.delete(this)}});function c1(t,e,n){let i=Object.create(l1);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=n,t[Xi]??=new Set,t[Xi].add(i),i.consumerMarkedDirty(i),i}function u1(t,e,n){let i=Object.create(a1);return i.fn=t,i.scheduler=e,i.notifier=n,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.schedule(i),i.notifier.notify(12),i}var Ve=new C("");var Ex=null;function ri(){return Ex}function tp(t){Ex??=t}var Hs=class{},np=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(Cx),providedIn:"platform"})}return t})();var Cx=(()=>{class t extends np{_location;_history;_doc=S(Ve);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return ri().getBaseHref(this._doc)}onPopState(n){let i=ri().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",n,!1),()=>i.removeEventListener("popstate",n)}onHashChange(n){let i=ri().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",n,!1),()=>i.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,i,r){this._history.pushState(n,i,r)}replaceState(n,i,r){this._history.replaceState(n,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Tx(t,e){return t?e?t.endsWith("/")?e.startsWith("/")?t+e.slice(1):t+e:e.startsWith("/")?t+e:`${t}/${e}`:t:e}function wx(t){let e=t.search(/#|\?|$/);return t[e-1]==="/"?t.slice(0,e-1)+t.slice(e):t}function Si(t){return t&&t[0]!=="?"?`?${t}`:t}var So=(()=>{class t{historyGo(n){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(Dx),providedIn:"root"})}return t})(),Ix=new C(""),Dx=(()=>{class t extends So{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,i){super(),this._platformLocation=n,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??S(Ve).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return Tx(this._baseHref,n)}path(n=!1){let i=this._platformLocation.pathname+Si(this._platformLocation.search),r=this._platformLocation.hash;return r&&n?`${i}${r}`:i}pushState(n,i,r,o){let s=this.prepareExternalUrl(r+Si(o));this._platformLocation.pushState(n,i,s)}replaceState(n,i,r,o){let s=this.prepareExternalUrl(r+Si(o));this._platformLocation.replaceState(n,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(i){return new(i||t)(O(np),O(Ix,8))};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),wo=(()=>{class t{_subject=new Ie;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let i=this._locationStrategy.getBaseHref();this._basePath=h1(wx(Mx(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,i=""){return this.path()==this.normalize(n+Si(i))}normalize(n){return t.stripTrailingSlash(f1(this._basePath,Mx(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,i="",r=null){this._locationStrategy.pushState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Si(i)),r)}replaceState(n,i="",r=null){this._locationStrategy.replaceState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Si(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",i){this._urlChangeListeners.forEach(r=>r(n,i))}subscribe(n,i,r){return this._subject.subscribe({next:n,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Si;static joinWithSlash=Tx;static stripTrailingSlash=wx;static \u0275fac=function(i){return new(i||t)(O(So))};static \u0275prov=F({token:t,factory:()=>d1(),providedIn:"root"})}return t})();function d1(){return new wo(O(So))}function f1(t,e){if(!t||!e.startsWith(t))return e;let n=e.substring(t.length);return n===""||["/",";","?","#"].includes(n[0])?n:e}function Mx(t){return t.replace(/\/index.html$/,"")}function h1(t){if(new RegExp("^(https?:)?//").test(t)){let[,n]=t.split(/\/\/[^\/]+/);return n}return t}var op=function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t}(op||{});var kn={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Mo(t,e){let n=Qh(t),i=n[go.NumberSymbols][e];if(typeof i>"u"){if(e===kn.CurrencyDecimal)return n[go.NumberSymbols][kn.Decimal];if(e===kn.CurrencyGroup)return n[go.NumberSymbols][kn.Group]}return i}function Rx(t,e){return Qh(t)[go.NumberFormats][e]}var p1=/^(\d+)?\.((\d+)(-(\d+))?)?$/,Ax=22,Sc=".",Gs="0",m1=";",g1=",",ip="#";function v1(t,e,n,i,r,o,s=!1){let a="",l=!1;if(!isFinite(t))a=Mo(n,kn.Infinity);else{let c=x1(t);s&&(c=_1(c));let u=e.minInt,d=e.minFrac,h=e.maxFrac;if(o){let B=o.match(p1);if(B===null)throw new Error(`${o} is not a valid digit info`);let Y=B[1],k=B[3],L=B[5];Y!=null&&(u=rp(Y)),k!=null&&(d=rp(k)),L!=null?h=rp(L):k!=null&&d>h&&(h=d)}b1(c,d,h);let f=c.digits,m=c.integerLen,_=c.exponent,T=[];for(l=f.every(B=>!B);m<u;m++)f.unshift(0);for(;m<0;m++)f.unshift(0);m>0?T=f.splice(m,f.length):(T=f,f=[0]);let I=[];for(f.length>=e.lgSize&&I.unshift(f.splice(-e.lgSize,f.length).join(""));f.length>e.gSize;)I.unshift(f.splice(-e.gSize,f.length).join(""));f.length&&I.unshift(f.join("")),a=I.join(Mo(n,i)),T.length&&(a+=Mo(n,r)+T.join("")),_&&(a+=Mo(n,kn.Exponential)+"+"+_)}return t<0&&!l?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function Nx(t,e,n){let i=Rx(e,op.Decimal),r=y1(i,Mo(e,kn.MinusSign));return v1(t,r,e,kn.Group,kn.Decimal,n)}function y1(t,e="-"){let n={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=t.split(m1),r=i[0],o=i[1],s=r.indexOf(Sc)!==-1?r.split(Sc):[r.substring(0,r.lastIndexOf(Gs)+1),r.substring(r.lastIndexOf(Gs)+1)],a=s[0],l=s[1]||"";n.posPre=a.substring(0,a.indexOf(ip));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===Gs?n.minFrac=n.maxFrac=u+1:d===ip?n.maxFrac=u+1:n.posSuf+=d}let c=a.split(g1);if(n.gSize=c[1]?c[1].length:0,n.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let u=r.length-n.posPre.length-n.posSuf.length,d=o.indexOf(ip);n.negPre=o.substring(0,d).replace(/'/g,""),n.negSuf=o.slice(d+u).replace(/'/g,"")}else n.negPre=e+n.posPre,n.negSuf=n.posSuf;return n}function _1(t){if(t.digits[0]===0)return t;let e=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(e===0?t.digits.push(0,0):e===1&&t.digits.push(0),t.integerLen+=2),t}function x1(t){let e=Math.abs(t)+"",n=0,i,r,o,s,a;for((r=e.indexOf(Sc))>-1&&(e=e.replace(Sc,"")),(o=e.search(/e/i))>0?(r<0&&(r=o),r+=+e.slice(o+1),e=e.substring(0,o)):r<0&&(r=e.length),o=0;e.charAt(o)===Gs;o++);if(o===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===Gs;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(e.charAt(o))}return r>Ax&&(i=i.splice(0,Ax-1),n=r-1,r=1),{digits:i,exponent:n,integerLen:r}}function b1(t,e,n){if(e>n)throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`);let i=t.digits,r=i.length-t.integerLen,o=Math.min(Math.max(e,r),n),s=o+t.integerLen,a=i[s];if(s>0){i.splice(Math.max(t.integerLen,s));for(let d=s;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),t.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let d=1;d<s;d++)i[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)i.unshift(0),t.integerLen++;i.unshift(1),t.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=e+t.integerLen,u=i.reduceRight(function(d,h,f,m){return h=h+d,m[f]=h<10?h:h-10,l&&(m[f]===0&&f>=c?m.pop():l=!1),h>=10?1:0},0);u&&(i.unshift(u),t.integerLen++)}function rp(t){let e=parseInt(t);if(isNaN(e))throw new Error("Invalid integer literal when parsing "+t);return e}function S1(t,e){return new z(2100,!1)}var sp=(()=>{class t{_locale;constructor(n){this._locale=n}transform(n,i,r){if(!w1(n))return null;r||=this._locale;try{let o=M1(n);return Nx(o,r,i)}catch(o){throw S1(t,o.message)}}static \u0275fac=function(i){return new(i||t)(On(_c,16))};static \u0275pipe=vc({name:"number",type:t,pure:!0})}return t})();function w1(t){return!(t==null||t===""||t!==t)}function M1(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new Error(`${t} is not a number`);return t}function ap(t,e){e=encodeURIComponent(e);for(let n of t.split(";")){let i=n.indexOf("="),[r,o]=i==-1?[n,""]:[n.slice(0,i),n.slice(i+1)];if(r.trim()===e)return decodeURIComponent(o)}return null}var lp="browser",Px="server";function wc(t){return t===Px}var js=class{};var Cc=new C(""),fp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,i){this._zone=i,n.forEach(r=>{r.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,i,r,o){return this._findPluginFor(i).addEventListener(n,i,r,o)}getZone(){return this._zone}_findPluginFor(n){let i=this._eventNameToPlugin.get(n);if(i)return i;if(i=this._plugins.find(o=>o.supports(n)),!i)throw new z(5101,!1);return this._eventNameToPlugin.set(n,i),i}static \u0275fac=function(i){return new(i||t)(O(Cc),O(Ae))};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})(),Ws=class{_doc;constructor(e){this._doc=e}manager},Mc="ng-app-id";function Lx(t){for(let e of t)e.remove()}function Ox(t,e){let n=e.createElement("style");return n.textContent=t,n}function I1(t,e,n,i){let r=t.head?.querySelectorAll(`style[${Mc}="${e}"],link[${Mc}="${e}"]`);if(r)for(let o of r)o.removeAttribute(Mc),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&n.set(o.textContent,{usage:0,elements:[o]})}function up(t,e){let n=e.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",t),n}var hp=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(n,i,r,o={}){this.doc=n,this.appId=i,this.nonce=r,this.isServer=wc(o),I1(n,i,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,i){for(let r of n)this.addUsage(r,this.inline,Ox);i?.forEach(r=>this.addUsage(r,this.external,up))}removeStyles(n,i){for(let r of n)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(n,i,r){let o=i.get(n);o?o.usage++:i.set(n,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(n,this.doc)))})}removeUsage(n,i){let r=i.get(n);r&&(r.usage--,r.usage<=0&&(Lx(r.elements),i.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])Lx(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(n,Ox(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(n,up(i,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,i){return this.nonce&&i.setAttribute("nonce",this.nonce),this.isServer&&i.setAttribute(Mc,this.appId),n.appendChild(i)}static \u0275fac=function(i){return new(i||t)(O(Ve),O(Ch),O(Ih,8),O(Ps))};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})(),cp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},pp=/%COMP%/g;var kx="%COMP%",D1=`_nghost-${kx}`,A1=`_ngcontent-${kx}`,R1=!0,N1=new C("",{providedIn:"root",factory:()=>R1});function P1(t){return A1.replace(pp,t)}function L1(t){return D1.replace(pp,t)}function Ux(t,e){return e.map(n=>n.replace(pp,t))}var mp=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(n,i,r,o,s,a,l,c=null,u=null){this.eventManager=n,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.platformId=a,this.ngZone=l,this.nonce=c,this.tracingService=u,this.platformIsServer=wc(a),this.defaultRenderer=new $s(n,s,l,this.platformIsServer,this.tracingService)}createRenderer(n,i){if(!n||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===Rn.ShadowDom&&(i=M(y({},i),{encapsulation:Rn.Emulated}));let r=this.getOrCreateRenderer(n,i);return r instanceof Ec?r.applyToHost(n):r instanceof qs&&r.applyStyles(),r}getOrCreateRenderer(n,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,h=this.tracingService;switch(i.encapsulation){case Rn.Emulated:o=new Ec(l,c,i,this.appId,u,s,a,d,h);break;case Rn.ShadowDom:return new dp(l,c,n,i,s,a,this.nonce,d,h);default:o=new qs(l,c,i,u,s,a,d,h);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(i){return new(i||t)(O(fp),O(hp),O(Ch),O(N1),O(Ve),O(Ps),O(Ae),O(Ih),O(lc,8))};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})(),$s=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,n,i,r,o){this.eventManager=e,this.doc=n,this.ngZone=i,this.platformIsServer=r,this.tracingService=o}destroy(){}destroyNode=null;createElement(e,n){return n?this.doc.createElementNS(cp[n]||n,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,n){(Fx(e)?e.content:e).appendChild(n)}insertBefore(e,n,i){e&&(Fx(e)?e.content:e).insertBefore(n,i)}removeChild(e,n){n.remove()}selectRootElement(e,n){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new z(-5104,!1);return n||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,n,i,r){if(r){n=r+":"+n;let o=cp[r];o?e.setAttributeNS(o,n,i):e.setAttribute(n,i)}else e.setAttribute(n,i)}removeAttribute(e,n,i){if(i){let r=cp[i];r?e.removeAttributeNS(r,n):e.removeAttribute(`${i}:${n}`)}else e.removeAttribute(n)}addClass(e,n){e.classList.add(n)}removeClass(e,n){e.classList.remove(n)}setStyle(e,n,i,r){r&(Qn.DashCase|Qn.Important)?e.style.setProperty(n,i,r&Qn.Important?"important":""):e.style[n]=i}removeStyle(e,n,i){i&Qn.DashCase?e.style.removeProperty(n):e.style[n]=""}setProperty(e,n,i){e!=null&&(e[n]=i)}setValue(e,n){e.nodeValue=n}listen(e,n,i,r){if(typeof e=="string"&&(e=ri().getGlobalEventTarget(this.doc,e),!e))throw new z(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,n,o)),this.eventManager.addEventListener(e,n,o,r)}decoratePreventDefault(e){return n=>{if(n==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(n)):e(n))===!1&&n.preventDefault()}}};function Fx(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var dp=class extends $s{sharedStylesHost;hostEl;shadowRoot;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,l,c),this.sharedStylesHost=n,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=Ux(r.id,u);for(let h of u){let f=document.createElement("style");a&&f.setAttribute("nonce",a),f.textContent=h,this.shadowRoot.appendChild(f)}let d=r.getExternalStyles?.();if(d)for(let h of d){let f=up(h,o);a&&f.setAttribute("nonce",a),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,n){return super.appendChild(this.nodeOrShadowRoot(e),n)}insertBefore(e,n,i){return super.insertBefore(this.nodeOrShadowRoot(e),n,i)}removeChild(e,n){return super.removeChild(null,n)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},qs=class extends $s{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,n,i,r,o,s,a,l,c){super(e,o,s,a,l),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=c?Ux(c,u):u,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Ec=class extends qs{contentAttr;hostAttr;constructor(e,n,i,r,o,s,a,l,c){let u=r+"-"+i.id;super(e,n,i,o,s,a,l,c,u),this.contentAttr=P1(u),this.hostAttr=L1(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,n){let i=super.createElement(e,n);return super.setAttribute(i,this.contentAttr,""),i}};var Tc=class t extends Hs{supportsDOMEvents=!0;static makeCurrent(){tp(new t)}onAndCancel(e,n,i,r){return e.addEventListener(n,i,r),()=>{e.removeEventListener(n,i,r)}}dispatchEvent(e,n){e.dispatchEvent(n)}remove(e){e.remove()}createElement(e,n){return n=n||this.getDefaultDocument(),n.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,n){return n==="window"?window:n==="document"?e:n==="body"?e.body:null}getBaseHref(e){let n=O1();return n==null?null:F1(n)}resetBaseElement(){Xs=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return ap(document.cookie,e)}},Xs=null;function O1(){return Xs=Xs||document.head.querySelector("base"),Xs?Xs.getAttribute("href"):null}function F1(t){return new URL(t,document.baseURI).pathname}var k1=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})(),Bx=(()=>{class t extends Ws{constructor(n){super(n)}supports(n){return!0}addEventListener(n,i,r,o){return n.addEventListener(i,r,o),()=>this.removeEventListener(n,i,r,o)}removeEventListener(n,i,r,o){return n.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(O(Ve))};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})(),Vx=["alt","control","meta","shift"],U1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},V1={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},zx=(()=>{class t extends Ws{constructor(n){super(n)}supports(n){return t.parseEventName(n)!=null}addEventListener(n,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ri().onAndCancel(n,s.domEventName,a,o))}static parseEventName(n){let i=n.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),Vx.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(n,i){let r=U1[n.key]||n.key,o="";return i.indexOf("code.")>-1&&(r=n.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Vx.forEach(s=>{if(s!==r){let a=V1[s];a(n)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(n,i,r){return o=>{t.matchEventFullKeyCode(o,n)&&r.runGuarded(()=>i(o))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(i){return new(i||t)(O(Ve))};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})();function gp(t,e,n){return bx(y({rootComponent:t,platformRef:n?.platformRef},B1(e)))}function B1(t){return{appProviders:[...W1,...t?.providers??[]],platformProviders:j1}}function z1(){Tc.makeCurrent()}function H1(){return new yt}function G1(){return H0(document),document}var j1=[{provide:Ps,useValue:lp},{provide:Th,useValue:z1,multi:!0},{provide:Ve,useFactory:G1}];var W1=[{provide:nc,useValue:"root"},{provide:yt,useFactory:H1},{provide:Cc,useClass:Bx,multi:!0,deps:[Ve]},{provide:Cc,useClass:zx,multi:!0,deps:[Ve]},mp,hp,fp,{provide:io,useExisting:mp},{provide:js,useClass:k1},[]];var Hx=(()=>{class t{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(i){return new(i||t)(O(Ve))};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var vp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=O($1),r},providedIn:"root"})}return t})(),$1=(()=>{class t extends vp{_doc;constructor(n){super(),this._doc=n}sanitize(n,i){if(i==null)return null;switch(n){case mn.NONE:return i;case mn.HTML:return ni(i,"HTML")?pn(i):Dh(this._doc,String(i)).toString();case mn.STYLE:return ni(i,"Style")?pn(i):i;case mn.SCRIPT:if(ni(i,"Script"))return pn(i);throw new z(5200,!1);case mn.URL:return ni(i,"URL")?pn(i):uc(String(i));case mn.RESOURCE_URL:if(ni(i,"ResourceURL"))return pn(i);throw new z(5201,!1);default:throw new z(5202,!1)}}bypassSecurityTrustHtml(n){return K0(n)}bypassSecurityTrustStyle(n){return J0(n)}bypassSecurityTrustScript(n){return Q0(n)}bypassSecurityTrustUrl(n){return e_(n)}bypassSecurityTrustResourceUrl(n){return t_(n)}static \u0275fac=function(i){return new(i||t)(O(Ve))};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ne="primary",aa=Symbol("RouteTitle"),Sp=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n[0]:n}return null}getAll(e){if(this.has(e)){let n=this.params[e];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function cr(t){return new Sp(t)}function Zx(t,e,n){let i=n.path.split("/");if(i.length>t.length||n.pathMatch==="full"&&(e.hasChildren()||i.length<t.length))return null;let r={};for(let o=0;o<i.length;o++){let s=i[o],a=t[o];if(s[0]===":")r[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:t.slice(0,i.length),posParams:r}}function X1(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(!Un(t[n],e[n]))return!1;return!0}function Un(t,e){let n=t?wp(t):void 0,i=e?wp(e):void 0;if(!n||!i||n.length!=i.length)return!1;let r;for(let o=0;o<n.length;o++)if(r=n[o],!Kx(t[r],e[r]))return!1;return!0}function wp(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function Kx(t,e){if(Array.isArray(t)&&Array.isArray(e)){if(t.length!==e.length)return!1;let n=[...t].sort(),i=[...e].sort();return n.every((r,o)=>i[o]===r)}else return t===e}function Jx(t){return t.length>0?t[t.length-1]:null}function Ci(t){return Ad(t)?t:Vs(t)?Oe(Promise.resolve(t)):q(t)}var Y1={exact:eb,subset:tb},Qx={exact:Z1,subset:K1,ignored:()=>!0};function Gx(t,e,n){return Y1[n.paths](t.root,e.root,n.matrixParams)&&Qx[n.queryParams](t.queryParams,e.queryParams)&&!(n.fragment==="exact"&&t.fragment!==e.fragment)}function Z1(t,e){return Un(t,e)}function eb(t,e,n){if(!ar(t.segments,e.segments)||!Ac(t.segments,e.segments,n)||t.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!t.children[i]||!eb(t.children[i],e.children[i],n))return!1;return!0}function K1(t,e){return Object.keys(e).length<=Object.keys(t).length&&Object.keys(e).every(n=>Kx(t[n],e[n]))}function tb(t,e,n){return nb(t,e,e.segments,n)}function nb(t,e,n,i){if(t.segments.length>n.length){let r=t.segments.slice(0,n.length);return!(!ar(r,n)||e.hasChildren()||!Ac(r,n,i))}else if(t.segments.length===n.length){if(!ar(t.segments,n)||!Ac(t.segments,n,i))return!1;for(let r in e.children)if(!t.children[r]||!tb(t.children[r],e.children[r],i))return!1;return!0}else{let r=n.slice(0,t.segments.length),o=n.slice(t.segments.length);return!ar(t.segments,r)||!Ac(t.segments,r,i)||!t.children[ne]?!1:nb(t.children[ne],e,o,i)}}function Ac(t,e,n){return e.every((i,r)=>Qx[n](t[r].parameters,i.parameters))}var Vn=class{root;queryParams;fragment;_queryParamMap;constructor(e=new we([],{}),n={},i=null){this.root=e,this.queryParams=n,this.fragment=i}get queryParamMap(){return this._queryParamMap??=cr(this.queryParams),this._queryParamMap}toString(){return eR.serialize(this)}},we=class{segments;children;parent=null;constructor(e,n){this.segments=e,this.children=n,Object.values(n).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Rc(this)}},wi=class{path;parameters;_parameterMap;constructor(e,n){this.path=e,this.parameters=n}get parameterMap(){return this._parameterMap??=cr(this.parameters),this._parameterMap}toString(){return rb(this)}};function J1(t,e){return ar(t,e)&&t.every((n,i)=>Un(n.parameters,e[i].parameters))}function ar(t,e){return t.length!==e.length?!1:t.every((n,i)=>n.path===e[i].path)}function Q1(t,e){let n=[];return Object.entries(t.children).forEach(([i,r])=>{i===ne&&(n=n.concat(e(r,i)))}),Object.entries(t.children).forEach(([i,r])=>{i!==ne&&(n=n.concat(e(r,i)))}),n}var la=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>new ur,providedIn:"root"})}return t})(),ur=class{parse(e){let n=new Ep(e);return new Vn(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(e){let n=`/${Ys(e.root,!0)}`,i=iR(e.queryParams),r=typeof e.fragment=="string"?`#${tR(e.fragment)}`:"";return`${n}${i}${r}`}},eR=new ur;function Rc(t){return t.segments.map(e=>rb(e)).join("/")}function Ys(t,e){if(!t.hasChildren())return Rc(t);if(e){let n=t.children[ne]?Ys(t.children[ne],!1):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==ne&&i.push(`${r}:${Ys(o,!1)}`)}),i.length>0?`${n}(${i.join("//")})`:n}else{let n=Q1(t,(i,r)=>r===ne?[Ys(t.children[ne],!1)]:[`${r}:${Ys(i,!1)}`]);return Object.keys(t.children).length===1&&t.children[ne]!=null?`${Rc(t)}/${n[0]}`:`${Rc(t)}/(${n.join("//")})`}}function ib(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Ic(t){return ib(t).replace(/%3B/gi,";")}function tR(t){return encodeURI(t)}function Mp(t){return ib(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Nc(t){return decodeURIComponent(t)}function jx(t){return Nc(t.replace(/\+/g,"%20"))}function rb(t){return`${Mp(t.path)}${nR(t.parameters)}`}function nR(t){return Object.entries(t).map(([e,n])=>`;${Mp(e)}=${Mp(n)}`).join("")}function iR(t){let e=Object.entries(t).map(([n,i])=>Array.isArray(i)?i.map(r=>`${Ic(n)}=${Ic(r)}`).join("&"):`${Ic(n)}=${Ic(i)}`).filter(n=>n);return e.length?`?${e.join("&")}`:""}var rR=/^[^\/()?;#]+/;function yp(t){let e=t.match(rR);return e?e[0]:""}var oR=/^[^\/()?;=#]+/;function sR(t){let e=t.match(oR);return e?e[0]:""}var aR=/^[^=?&#]+/;function lR(t){let e=t.match(aR);return e?e[0]:""}var cR=/^[^&#]+/;function uR(t){let e=t.match(cR);return e?e[0]:""}var Ep=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new we([],{}):new we([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1)),(e.length>0||Object.keys(n).length>0)&&(i[ne]=new we(e,n)),i}parseSegment(){let e=yp(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new z(4009,!1);return this.capture(e),new wi(Nc(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let n=sR(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let r=yp(this.remaining);r&&(i=r,this.capture(i))}e[Nc(n)]=Nc(i)}parseQueryParam(e){let n=lR(this.remaining);if(!n)return;this.capture(n);let i="";if(this.consumeOptional("=")){let s=uR(this.remaining);s&&(i=s,this.capture(i))}let r=jx(n),o=jx(i);if(e.hasOwnProperty(r)){let s=e[r];Array.isArray(s)||(s=[s],e[r]=s),s.push(o)}else e[r]=o}parseParens(e){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=yp(this.remaining),r=this.remaining[i.length];if(r!=="/"&&r!==")"&&r!==";")throw new z(4010,!1);let o;i.indexOf(":")>-1?(o=i.slice(0,i.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=ne);let s=this.parseChildren();n[o]=Object.keys(s).length===1?s[ne]:new we([],s),this.consumeOptional("//")}return n}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new z(4011,!1)}};function ob(t){return t.segments.length>0?new we([],{[ne]:t}):t}function sb(t){let e={};for(let[i,r]of Object.entries(t.children)){let o=sb(r);if(i===ne&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))e[s]=a;else(o.segments.length>0||o.hasChildren())&&(e[i]=o)}let n=new we(t.segments,e);return dR(n)}function dR(t){if(t.numberOfChildren===1&&t.children[ne]){let e=t.children[ne];return new we(t.segments.concat(e.segments),e.children)}return t}function Mi(t){return t instanceof Vn}function ab(t,e,n=null,i=null){let r=lb(t);return cb(r,e,n,i)}function lb(t){let e;function n(o){let s={};for(let l of o.children){let c=n(l);s[l.outlet]=c}let a=new we(o.url,s);return o===t&&(e=a),a}let i=n(t.root),r=ob(i);return e??r}function cb(t,e,n,i){let r=t;for(;r.parent;)r=r.parent;if(e.length===0)return _p(r,r,r,n,i);let o=fR(e);if(o.toRoot())return _p(r,r,new we([],{}),n,i);let s=hR(o,r,t),a=s.processChildren?Ks(s.segmentGroup,s.index,o.commands):db(s.segmentGroup,s.index,o.commands);return _p(r,s.segmentGroup,a,n,i)}function Lc(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function Qs(t){return typeof t=="object"&&t!=null&&t.outlets}function _p(t,e,n,i,r){let o={};i&&Object.entries(i).forEach(([l,c])=>{o[l]=Array.isArray(c)?c.map(u=>`${u}`):`${c}`});let s;t===e?s=n:s=ub(t,e,n);let a=ob(sb(s));return new Vn(a,o,r)}function ub(t,e,n){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===e?i[r]=n:i[r]=ub(o,e,n)}),new we(t.segments,i)}var Oc=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,n,i){if(this.isAbsolute=e,this.numberOfDoubleDots=n,this.commands=i,e&&i.length>0&&Lc(i[0]))throw new z(4003,!1);let r=i.find(Qs);if(r&&r!==Jx(i))throw new z(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function fR(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new Oc(!0,0,t);let e=0,n=!1,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?n=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new Oc(n,e,i)}var To=class{segmentGroup;processChildren;index;constructor(e,n,i){this.segmentGroup=e,this.processChildren=n,this.index=i}};function hR(t,e,n){if(t.isAbsolute)return new To(e,!0,0);if(!n)return new To(e,!1,NaN);if(n.parent===null)return new To(n,!0,0);let i=Lc(t.commands[0])?0:1,r=n.segments.length-1+i;return pR(n,r,t.numberOfDoubleDots)}function pR(t,e,n){let i=t,r=e,o=n;for(;o>r;){if(o-=r,i=i.parent,!i)throw new z(4005,!1);r=i.segments.length}return new To(i,!1,r-o)}function mR(t){return Qs(t[0])?t[0].outlets:{[ne]:t}}function db(t,e,n){if(t??=new we([],{}),t.segments.length===0&&t.hasChildren())return Ks(t,e,n);let i=gR(t,e,n),r=n.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new we(t.segments.slice(0,i.pathIndex),{});return o.children[ne]=new we(t.segments.slice(i.pathIndex),t.children),Ks(o,0,r)}else return i.match&&r.length===0?new we(t.segments,{}):i.match&&!t.hasChildren()?Cp(t,e,n):i.match?Ks(t,0,r):Cp(t,e,n)}function Ks(t,e,n){if(n.length===0)return new we(t.segments,{});{let i=mR(n),r={};if(Object.keys(i).some(o=>o!==ne)&&t.children[ne]&&t.numberOfChildren===1&&t.children[ne].segments.length===0){let o=Ks(t.children[ne],e,n);return new we(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=db(t.children[o],e,s))}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new we(t.segments,r)}}function gR(t,e,n){let i=0,r=e,o={match:!1,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=n.length)return o;let s=t.segments[r],a=n[i];if(Qs(a))break;let l=`${a}`,c=i<n.length-1?n[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!$x(l,c,s))return o;i+=2}else{if(!$x(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Cp(t,e,n){let i=t.segments.slice(0,e),r=0;for(;r<n.length;){let o=n[r];if(Qs(o)){let l=vR(o.outlets);return new we(i,l)}if(r===0&&Lc(n[0])){let l=t.segments[e];i.push(new wi(l.path,Wx(n[0]))),r++;continue}let s=Qs(o)?o.outlets[ne]:`${o}`,a=r<n.length-1?n[r+1]:null;s&&a&&Lc(a)?(i.push(new wi(s,Wx(a))),r+=2):(i.push(new wi(s,{})),r++)}return new we(i,{})}function vR(t){let e={};return Object.entries(t).forEach(([n,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[n]=Cp(new we([],{}),0,i))}),e}function Wx(t){let e={};return Object.entries(t).forEach(([n,i])=>e[n]=`${i}`),e}function $x(t,e,n){return t==n.path&&Un(e,n.parameters)}var Pc="imperative",tt=function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t}(tt||{}),jt=class{id;url;constructor(e,n){this.id=e,this.url=n}},Bn=class extends jt{type=tt.NavigationStart;navigationTrigger;restoredState;constructor(e,n,i="imperative",r=null){super(e,n),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Nt=class extends jt{urlAfterRedirects;type=tt.NavigationEnd;constructor(e,n,i){super(e,n),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Rt=function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t}(Rt||{}),ea=function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t}(ea||{}),Jt=class extends jt{reason;code;type=tt.NavigationCancel;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},oi=class extends jt{reason;code;type=tt.NavigationSkipped;constructor(e,n,i,r){super(e,n),this.reason=i,this.code=r}},si=class extends jt{error;target;type=tt.NavigationError;constructor(e,n,i,r){super(e,n),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ei=class extends jt{urlAfterRedirects;state;type=tt.RoutesRecognized;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Fc=class extends jt{urlAfterRedirects;state;type=tt.GuardsCheckStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},kc=class extends jt{urlAfterRedirects;state;shouldActivate;type=tt.GuardsCheckEnd;constructor(e,n,i,r,o){super(e,n),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Uc=class extends jt{urlAfterRedirects;state;type=tt.ResolveStart;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Vc=class extends jt{urlAfterRedirects;state;type=tt.ResolveEnd;constructor(e,n,i,r){super(e,n),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Bc=class{route;type=tt.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},zc=class{route;type=tt.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Hc=class{snapshot;type=tt.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Gc=class{snapshot;type=tt.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},jc=class{snapshot;type=tt.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Wc=class{snapshot;type=tt.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ta=class{},Do=class{url;navigationBehaviorOptions;constructor(e,n){this.url=e,this.navigationBehaviorOptions=n}};function yR(t,e){return t.providers&&!t._injector&&(t._injector=gc(t.providers,e,`Route: ${t.path}`)),t._injector??e}function vn(t){return t.outlet||ne}function _R(t,e){let n=t.filter(i=>vn(i)===e);return n.push(...t.filter(i=>vn(i)!==e)),n}function ca(t){if(!t)return null;if(t.routeConfig?._injector)return t.routeConfig._injector;for(let e=t.parent;e;e=e.parent){let n=e.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var $c=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return ca(this.route?.snapshot)??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new No(this.rootInjector)}},No=(()=>{class t{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,i){let r=this.getOrCreateContext(n);r.outlet=i,this.contexts.set(n,r)}onChildOutletDestroyed(n){let i=this.getContext(n);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let i=this.getContext(n);return i||(i=new $c(this.rootInjector),this.contexts.set(n,i)),i}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(i){return new(i||t)(O(Vt))};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),qc=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let n=this.pathFromRoot(e);return n.length>1?n[n.length-2]:null}children(e){let n=Tp(e,this._root);return n?n.children.map(i=>i.value):[]}firstChild(e){let n=Tp(e,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(e){let n=Ip(e,this._root);return n.length<2?[]:n[n.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Ip(e,this._root).map(n=>n.value)}};function Tp(t,e){if(t===e.value)return e;for(let n of e.children){let i=Tp(t,n);if(i)return i}return null}function Ip(t,e){if(t===e.value)return[e];for(let n of e.children){let i=Ip(t,n);if(i.length)return i.unshift(e),i}return[]}var Gt=class{value;children;constructor(e,n){this.value=e,this.children=n}toString(){return`TreeNode(${this.value})`}};function Co(t){let e={};return t&&t.children.forEach(n=>e[n.value.outlet]=n),e}var na=class extends qc{snapshot;constructor(e,n){super(e),this.snapshot=n,Fp(this,e)}toString(){return this.snapshot.toString()}};function fb(t){let e=xR(t),n=new je([new wi("",{})]),i=new je({}),r=new je({}),o=new je({}),s=new je(""),a=new ai(n,i,o,s,r,ne,t,e.root);return a.snapshot=e.root,new na(new Gt(a,[]),e)}function xR(t){let e={},n={},i={},r="",o=new lr([],e,i,r,n,ne,t,null,{});return new ia("",new Gt(o,[]))}var ai=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,n,i,r,o,s,a,l){this.urlSubject=e,this.paramsSubject=n,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(G(c=>c[aa]))??q(void 0),this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(G(e=>cr(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(G(e=>cr(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Xc(t,e,n="emptyOnly"){let i,{routeConfig:r}=t;return e!==null&&(n==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:y(y({},e.params),t.params),data:y(y({},e.data),t.data),resolve:y(y(y(y({},t.data),e.data),r?.data),t._resolvedData)}:i={params:y({},t.params),data:y({},t.data),resolve:y(y({},t.data),t._resolvedData??{})},r&&pb(r)&&(i.resolve[aa]=r.title),i}var lr=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[aa]}constructor(e,n,i,r,o,s,a,l,c){this.url=e,this.params=n,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=cr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=cr(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${n}')`}},ia=class extends qc{url;constructor(e,n){super(n),this.url=e,Fp(this,n)}toString(){return hb(this._root)}};function Fp(t,e){e.value._routerState=t,e.children.forEach(n=>Fp(t,n))}function hb(t){let e=t.children.length>0?` { ${t.children.map(hb).join(", ")} } `:"";return`${t.value}${e}`}function xp(t){if(t.snapshot){let e=t.snapshot,n=t._futureSnapshot;t.snapshot=n,Un(e.queryParams,n.queryParams)||t.queryParamsSubject.next(n.queryParams),e.fragment!==n.fragment&&t.fragmentSubject.next(n.fragment),Un(e.params,n.params)||t.paramsSubject.next(n.params),X1(e.url,n.url)||t.urlSubject.next(n.url),Un(e.data,n.data)||t.dataSubject.next(n.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function Dp(t,e){let n=Un(t.params,e.params)&&J1(t.url,e.url),i=!t.parent!=!e.parent;return n&&!i&&(!t.parent||Dp(t.parent,e.parent))}function pb(t){return typeof t.title=="string"||t.title===null}var mb=new C(""),dr=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=ne;activateEvents=new ft;deactivateEvents=new ft;attachEvents=new ft;detachEvents=new ft;routerOutletData=Rs(void 0);parentContexts=S(No);location=S(ho);changeDetector=S(bo);inputBinder=S(Jc,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:i,previousValue:r}=n.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new z(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new z(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new z(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,i){this.activated=n,this._activatedRoute=i,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,i){if(this.isActivated)throw new z(4013,!1);this._activatedRoute=n;let r=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new Ap(n,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=Us({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[tr]})}return t})(),Ap=class{route;childContexts;parent;outletData;constructor(e,n,i,r){this.route=e,this.childContexts=n,this.parent=i,this.outletData=r}get(e,n){return e===ai?this.route:e===No?this.childContexts:e===mb?this.outletData:this.parent.get(e,n)}},Jc=new C("");var kp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=Me({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&xe(0,"router-outlet")},dependencies:[dr],encapsulation:2})}return t})();function Up(t){let e=t.children&&t.children.map(Up),n=e?M(y({},t),{children:e}):y({},t);return!n.component&&!n.loadComponent&&(e||n.loadChildren)&&n.outlet&&n.outlet!==ne&&(n.component=kp),n}function bR(t,e,n){let i=ra(t,e._root,n?n._root:void 0);return new na(i,e)}function ra(t,e,n){if(n&&t.shouldReuseRoute(e.value,n.value.snapshot)){let i=n.value;i._futureSnapshot=e.value;let r=SR(t,e,n);return new Gt(i,r)}else{if(t.shouldAttach(e.value)){let o=t.retrieve(e.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=e.value,s.children=e.children.map(a=>ra(t,a)),s}}let i=wR(e.value),r=e.children.map(o=>ra(t,o));return new Gt(i,r)}}function SR(t,e,n){return e.children.map(i=>{for(let r of n.children)if(t.shouldReuseRoute(i.value,r.value.snapshot))return ra(t,i,r);return ra(t,i)})}function wR(t){return new ai(new je(t.url),new je(t.params),new je(t.queryParams),new je(t.fragment),new je(t.data),t.outlet,t.component,t)}var Ao=class{redirectTo;navigationBehaviorOptions;constructor(e,n){this.redirectTo=e,this.navigationBehaviorOptions=n}},gb="ngNavigationCancelingError";function Yc(t,e){let{redirectTo:n,navigationBehaviorOptions:i}=Mi(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=vb(!1,Rt.Redirect);return r.url=n,r.navigationBehaviorOptions=i,r}function vb(t,e){let n=new Error(`NavigationCancelingError: ${t||""}`);return n[gb]=!0,n.cancellationCode=e,n}function MR(t){return yb(t)&&Mi(t.url)}function yb(t){return!!t&&t[gb]}var ER=(t,e,n,i)=>G(r=>(new Rp(e,r.targetRouterState,r.currentRouterState,n,i).activate(t),r)),Rp=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,n,i,r,o){this.routeReuseStrategy=e,this.futureState=n,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(e){let n=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,i,e),xp(this.futureState.root),this.activateChildRoutes(n,i,e)}deactivateChildRoutes(e,n,i){let r=Co(n);e.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(e,n,s.children)}else this.deactivateChildRoutes(e,n,i);else o&&this.deactivateRouteAndItsChildren(n,i)}deactivateRouteAndItsChildren(e,n){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,n):this.deactivateRouteAndOutlet(e,n)}detachAndStoreRouteSubtree(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=Co(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:s,route:e,contexts:a})}}deactivateRouteAndOutlet(e,n){let i=n.getContext(e.value.outlet),r=i&&e.value.component?i.children:n,o=Co(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,n,i){let r=Co(n);e.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Wc(o.value.snapshot))}),e.children.length&&this.forwardEvent(new Gc(e.value.snapshot))}activateRoutes(e,n,i){let r=e.value,o=n?n.value:null;if(xp(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,n,s.children)}else this.activateChildRoutes(e,n,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),xp(a.route.value),this.activateChildRoutes(e,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(e,null,s.children)}else this.activateChildRoutes(e,null,i)}},Zc=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Io=class{component;route;constructor(e,n){this.component=e,this.route=n}};function CR(t,e,n){let i=t._root,r=e?e._root:null;return Zs(i,r,n,[i.value])}function TR(t){let e=t.routeConfig?t.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:t,guards:e}}function Po(t,e){let n=Symbol(),i=e.get(t,n);return i===n?typeof t=="function"&&!Ty(t)?t:e.get(t):i}function Zs(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=Co(e);return t.children.forEach(s=>{IR(s,o[s.value.outlet],n,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Js(a,n.getContext(s),r)),r}function IR(t,e,n,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=e?e.value:null,a=n?n.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=DR(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new Zc(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Zs(t,e,a?a.children:null,i,r):Zs(t,e,n,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Io(a.outlet.component,s))}else s&&Js(e,a,r),r.canActivateChecks.push(new Zc(i)),o.component?Zs(t,null,a?a.children:null,i,r):Zs(t,null,n,i,r);return r}function DR(t,e,n){if(typeof n=="function")return n(t,e);switch(n){case"pathParamsChange":return!ar(t.url,e.url);case"pathParamsOrQueryParamsChange":return!ar(t.url,e.url)||!Un(t.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Dp(t,e)||!Un(t.queryParams,e.queryParams);case"paramsChange":default:return!Dp(t,e)}}function Js(t,e,n){let i=Co(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?e?Js(s,e.children.getContext(o),n):Js(s,null,n):Js(s,e,n)}),r.component?e&&e.outlet&&e.outlet.isActivated?n.canDeactivateChecks.push(new Io(e.outlet.component,r)):n.canDeactivateChecks.push(new Io(null,r)):n.canDeactivateChecks.push(new Io(null,r))}function ua(t){return typeof t=="function"}function AR(t){return typeof t=="boolean"}function RR(t){return t&&ua(t.canLoad)}function NR(t){return t&&ua(t.canActivate)}function PR(t){return t&&ua(t.canActivateChild)}function LR(t){return t&&ua(t.canDeactivate)}function OR(t){return t&&ua(t.canMatch)}function _b(t){return t instanceof ln||t?.name==="EmptyError"}var Dc=Symbol("INITIAL_VALUE");function Ro(){return st(t=>pl(t.map(e=>e.pipe(We(1),Bd(Dc)))).pipe(G(e=>{for(let n of e)if(n!==!0){if(n===Dc)return Dc;if(n===!1||FR(n))return n}return!0}),he(e=>e!==Dc),We(1)))}function FR(t){return Mi(t)||t instanceof Ao}function kR(t,e){return Fe(n=>{let{targetSnapshot:i,currentSnapshot:r,guards:{canActivateChecks:o,canDeactivateChecks:s}}=n;return s.length===0&&o.length===0?q(M(y({},n),{guardsResult:!0})):UR(s,i,r,t).pipe(Fe(a=>a&&AR(a)?VR(i,o,t,e):q(a)),G(a=>M(y({},n),{guardsResult:a})))})}function UR(t,e,n,i){return Oe(t).pipe(Fe(r=>jR(r.component,r.route,n,e,i)),Yn(r=>r!==!0,!0))}function VR(t,e,n,i){return Oe(e).pipe(Et(r=>Vr(zR(r.route.parent,i),BR(r.route,i),GR(t,r.path,n),HR(t,r.route,n))),Yn(r=>r!==!0,!0))}function BR(t,e){return t!==null&&e&&e(new jc(t)),q(!0)}function zR(t,e){return t!==null&&e&&e(new Hc(t)),q(!0)}function HR(t,e,n){let i=e.routeConfig?e.routeConfig.canActivate:null;if(!i||i.length===0)return q(!0);let r=i.map(o=>hs(()=>{let s=ca(e)??n,a=Po(o,s),l=NR(a)?a.canActivate(e,t):hn(s,()=>a(e,t));return Ci(l).pipe(Yn())}));return q(r).pipe(Ro())}function GR(t,e,n){let i=e[e.length-1],o=e.slice(0,e.length-1).reverse().map(s=>TR(s)).filter(s=>s!==null).map(s=>hs(()=>{let a=s.guards.map(l=>{let c=ca(s.node)??n,u=Po(l,c),d=PR(u)?u.canActivateChild(i,t):hn(c,()=>u(i,t));return Ci(d).pipe(Yn())});return q(a).pipe(Ro())}));return q(o).pipe(Ro())}function jR(t,e,n,i,r){let o=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!o||o.length===0)return q(!0);let s=o.map(a=>{let l=ca(e)??r,c=Po(a,l),u=LR(c)?c.canDeactivate(t,e,n,i):hn(l,()=>c(t,e,n,i));return Ci(u).pipe(Yn())});return q(s).pipe(Ro())}function WR(t,e,n,i){let r=e.canLoad;if(r===void 0||r.length===0)return q(!0);let o=r.map(s=>{let a=Po(s,t),l=RR(a)?a.canLoad(e,n):hn(t,()=>a(e,n));return Ci(l)});return q(o).pipe(Ro(),xb(i))}function xb(t){return Ed(J(e=>{if(typeof e!="boolean")throw Yc(t,e)}),G(e=>e===!0))}function $R(t,e,n,i){let r=e.canMatch;if(!r||r.length===0)return q(!0);let o=r.map(s=>{let a=Po(s,t),l=OR(a)?a.canMatch(e,n):hn(t,()=>a(e,n));return Ci(l)});return q(o).pipe(Ro(),xb(i))}var oa=class{segmentGroup;constructor(e){this.segmentGroup=e||null}},sa=class extends Error{urlTree;constructor(e){super(),this.urlTree=e}};function Eo(t){return mi(new oa(t))}function qR(t){return mi(new z(4e3,!1))}function XR(t){return mi(vb(!1,Rt.GuardRejected))}var Np=class{urlSerializer;urlTree;constructor(e,n){this.urlSerializer=e,this.urlTree=n}lineralizeSegments(e,n){let i=[],r=n.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return q(i);if(r.numberOfChildren>1||!r.children[ne])return qR(`${e.redirectTo}`);r=r.children[ne]}}applyRedirectCommands(e,n,i,r,o){if(typeof n!="string"){let a=n,{queryParams:l,fragment:c,routeConfig:u,url:d,outlet:h,params:f,data:m,title:_}=r,T=hn(o,()=>a({params:f,data:m,queryParams:l,fragment:c,routeConfig:u,url:d,outlet:h,title:_}));if(T instanceof Vn)throw new sa(T);n=T}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),e,i);if(n[0]==="/")throw new sa(s);return s}applyRedirectCreateUrlTree(e,n,i,r){let o=this.createSegmentGroup(e,n.root,i,r);return new Vn(o,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(e,n){let i={};return Object.entries(e).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=n[a]}else i[r]=o}),i}createSegmentGroup(e,n,i,r){let o=this.createSegments(e,n.segments,i,r),s={};return Object.entries(n.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(e,l,i,r)}),new we(o,s)}createSegments(e,n,i,r){return n.map(o=>o.path[0]===":"?this.findPosParam(e,o,r):this.findOrReturn(o,i))}findPosParam(e,n,i){let r=i[n.path.substring(1)];if(!r)throw new z(4001,!1);return r}findOrReturn(e,n){let i=0;for(let r of n){if(r.path===e.path)return n.splice(i),r;i++}return e}},Pp={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function YR(t,e,n,i,r){let o=bb(t,e,n);return o.matched?(i=yR(e,i),$R(i,e,n,r).pipe(G(s=>s===!0?o:y({},Pp)))):q(o)}function bb(t,e,n){if(e.path==="**")return ZR(n);if(e.path==="")return e.pathMatch==="full"&&(t.hasChildren()||n.length>0)?y({},Pp):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let r=(e.matcher||Zx)(n,t,e);if(!r)return y({},Pp);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?y(y({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:n.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function ZR(t){return{matched:!0,parameters:t.length>0?Jx(t).parameters:{},consumedSegments:t,remainingSegments:[],positionalParamSegments:{}}}function qx(t,e,n,i){return n.length>0&&QR(t,n,i)?{segmentGroup:new we(e,JR(i,new we(n,t.children))),slicedSegments:[]}:n.length===0&&eN(t,n,i)?{segmentGroup:new we(t.segments,KR(t,n,i,t.children)),slicedSegments:n}:{segmentGroup:new we(t.segments,t.children),slicedSegments:n}}function KR(t,e,n,i){let r={};for(let o of n)if(Qc(t,e,o)&&!i[vn(o)]){let s=new we([],{});r[vn(o)]=s}return y(y({},i),r)}function JR(t,e){let n={};n[ne]=e;for(let i of t)if(i.path===""&&vn(i)!==ne){let r=new we([],{});n[vn(i)]=r}return n}function QR(t,e,n){return n.some(i=>Qc(t,e,i)&&vn(i)!==ne)}function eN(t,e,n){return n.some(i=>Qc(t,e,i))}function Qc(t,e,n){return(t.hasChildren()||e.length>0)&&n.pathMatch==="full"?!1:n.path===""}function tN(t,e,n){return e.length===0&&!t.children[n]}var Lp=class{};function nN(t,e,n,i,r,o,s="emptyOnly"){return new Op(t,e,n,i,r,s,o).recognize()}var iN=31,Op=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,n,i,r,o,s,a){this.injector=e,this.configLoader=n,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new Np(this.urlSerializer,this.urlTree)}noMatchError(e){return new z(4002,`'${e.segmentGroup}'`)}recognize(){let e=qx(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(e).pipe(G(({children:n,rootSnapshot:i})=>{let r=new Gt(i,n),o=new ia("",r),s=ab(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}))}match(e){let n=new lr([],Object.freeze({}),Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),ne,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,e,ne,n).pipe(G(i=>({children:i,rootSnapshot:n})),Xt(i=>{if(i instanceof sa)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof oa?this.noMatchError(i):i}))}processSegmentGroup(e,n,i,r,o){return i.segments.length===0&&i.hasChildren()?this.processChildren(e,n,i,o):this.processSegment(e,n,i,i.segments,r,!0,o).pipe(G(s=>s instanceof Gt?[s]:[]))}processChildren(e,n,i,r){let o=[];for(let s of Object.keys(i.children))s==="primary"?o.unshift(s):o.push(s);return Oe(o).pipe(Et(s=>{let a=i.children[s],l=_R(n,s);return this.processSegmentGroup(e,l,a,s,r)}),Bi((s,a)=>(s.push(...a),s)),vi(null),Od(),Fe(s=>{if(s===null)return Eo(i);let a=Sb(s);return rN(a),q(a)}))}processSegment(e,n,i,r,o,s,a){return Oe(n).pipe(Et(l=>this.processSegmentAgainstRoute(l._injector??e,n,l,i,r,o,s,a).pipe(Xt(c=>{if(c instanceof oa)return q(null);throw c}))),Yn(l=>!!l),Xt(l=>{if(_b(l))return tN(i,r,o)?q(new Lp):Eo(i);throw l}))}processSegmentAgainstRoute(e,n,i,r,o,s,a,l){return vn(i)!==s&&(s===ne||!Qc(r,o,i))?Eo(r):i.redirectTo===void 0?this.matchSegmentAgainstRoute(e,r,i,o,s,l):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(e,r,n,i,o,s,l):Eo(r)}expandSegmentAgainstRouteUsingRedirect(e,n,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:d,remainingSegments:h}=bb(n,r,o);if(!l)return Eo(n);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>iN&&(this.allowRedirects=!1));let f=new lr(o,c,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Xx(r),vn(r),r.component??r._loadedComponent??null,r,Yx(r)),m=Xc(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(m.params),f.data=Object.freeze(m.data);let _=this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,f,e);return this.applyRedirects.lineralizeSegments(r,_).pipe(Fe(T=>this.processSegment(e,i,n,T.concat(h),s,!1,a)))}matchSegmentAgainstRoute(e,n,i,r,o,s){let a=YR(n,i,r,e,this.urlSerializer);return i.path==="**"&&(n.children={}),a.pipe(st(l=>l.matched?(e=i._injector??e,this.getChildConfig(e,i,r).pipe(st(({routes:c})=>{let u=i._loadedInjector??e,{parameters:d,consumedSegments:h,remainingSegments:f}=l,m=new lr(h,d,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Xx(i),vn(i),i.component??i._loadedComponent??null,i,Yx(i)),_=Xc(m,s,this.paramsInheritanceStrategy);m.params=Object.freeze(_.params),m.data=Object.freeze(_.data);let{segmentGroup:T,slicedSegments:I}=qx(n,h,f,c);if(I.length===0&&T.hasChildren())return this.processChildren(u,c,T,m).pipe(G(Y=>new Gt(m,Y)));if(c.length===0&&I.length===0)return q(new Gt(m,[]));let B=vn(i)===o;return this.processSegment(u,c,T,I,B?ne:o,!0,m).pipe(G(Y=>new Gt(m,Y instanceof Gt?[Y]:[])))}))):Eo(n)))}getChildConfig(e,n,i){return n.children?q({routes:n.children,injector:e}):n.loadChildren?n._loadedRoutes!==void 0?q({routes:n._loadedRoutes,injector:n._loadedInjector}):WR(e,n,i,this.urlSerializer).pipe(Fe(r=>r?this.configLoader.loadChildren(e,n).pipe(J(o=>{n._loadedRoutes=o.routes,n._loadedInjector=o.injector})):XR(n))):q({routes:[],injector:e})}};function rN(t){t.sort((e,n)=>e.value.outlet===ne?-1:n.value.outlet===ne?1:e.value.outlet.localeCompare(n.value.outlet))}function oN(t){let e=t.value.routeConfig;return e&&e.path===""}function Sb(t){let e=[],n=new Set;for(let i of t){if(!oN(i)){e.push(i);continue}let r=e.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),n.add(r)):e.push(i)}for(let i of n){let r=Sb(i.children);e.push(new Gt(i.value,r))}return e.filter(i=>!n.has(i))}function Xx(t){return t.data||{}}function Yx(t){return t.resolve||{}}function sN(t,e,n,i,r,o){return Fe(s=>nN(t,e,n,i,s.extractedUrl,r,o).pipe(G(({state:a,tree:l})=>M(y({},s),{targetSnapshot:a,urlAfterRedirects:l}))))}function aN(t,e){return Fe(n=>{let{targetSnapshot:i,guards:{canActivateChecks:r}}=n;if(!r.length)return q(n);let o=new Set(r.map(l=>l.route)),s=new Set;for(let l of o)if(!s.has(l))for(let c of wb(l))s.add(c);let a=0;return Oe(s).pipe(Et(l=>o.has(l)?lN(l,i,t,e):(l.data=Xc(l,l.parent,t).resolve,q(void 0))),J(()=>a++),Hr(1),Fe(l=>a===s.size?q(n):ke))})}function wb(t){let e=t.children.map(n=>wb(n)).flat();return[t,...e]}function lN(t,e,n,i){let r=t.routeConfig,o=t._resolve;return r?.title!==void 0&&!pb(r)&&(o[aa]=r.title),cN(o,t,e,i).pipe(G(s=>(t._resolvedData=s,t.data=Xc(t,t.parent,n).resolve,null)))}function cN(t,e,n,i){let r=wp(t);if(r.length===0)return q({});let o={};return Oe(r).pipe(Fe(s=>uN(t[s],e,n,i).pipe(Yn(),J(a=>{if(a instanceof Ao)throw Yc(new ur,a);o[s]=a}))),Hr(1),G(()=>o),Xt(s=>_b(s)?ke:mi(s)))}function uN(t,e,n,i){let r=ca(e)??i,o=Po(t,r),s=o.resolve?o.resolve(e,n):hn(r,()=>o(e,n));return Ci(s)}function bp(t){return st(e=>{let n=t(e);return n?Oe(n).pipe(G(()=>e)):q(e)})}var Vp=(()=>{class t{buildTitle(n){let i,r=n.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===ne);return i}getResolvedTitleForRoute(n){return n.data[aa]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(Mb),providedIn:"root"})}return t})(),Mb=(()=>{class t extends Vp{title;constructor(n){super(),this.title=n}updateTitle(n){let i=this.buildTitle(n);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||t)(O(Hx))};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),da=new C("",{providedIn:"root",factory:()=>({})}),fa=new C(""),Eb=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=S(vx);loadComponent(n){if(this.componentLoaders.get(n))return this.componentLoaders.get(n);if(n._loadedComponent)return q(n._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(n);let i=Ci(n.loadComponent()).pipe(G(Tb),J(o=>{this.onLoadEndListener&&this.onLoadEndListener(n),n._loadedComponent=o}),zr(()=>{this.componentLoaders.delete(n)})),r=new Or(i,()=>new Ie).pipe(Lr());return this.componentLoaders.set(n,r),r}loadChildren(n,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return q({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let o=Cb(i,this.compiler,n,this.onLoadEndListener).pipe(zr(()=>{this.childrenLoaders.delete(i)})),s=new Or(o,()=>new Ie).pipe(Lr());return this.childrenLoaders.set(i,s),s}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Cb(t,e,n,i){return Ci(t.loadChildren()).pipe(G(Tb),Fe(r=>r instanceof Yh||Array.isArray(r)?q(r):Oe(e.compileModuleAsync(r))),G(r=>{i&&i(t);let o,s,a=!1;return Array.isArray(r)?(s=r,a=!0):(o=r.create(n).injector,s=o.get(fa,[],{optional:!0,self:!0}).flat()),{routes:s.map(Up),injector:o}}))}function dN(t){return t&&typeof t=="object"&&"default"in t}function Tb(t){return dN(t)?t.default:t}var eu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(fN),providedIn:"root"})}return t})(),fN=(()=>{class t{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,i){return n}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ib=new C("");var Db=new C(""),Ab=(()=>{class t{currentNavigation=null;currentTransition=null;lastSuccessfulNavigation=null;events=new Ie;transitionAbortSubject=new Ie;configLoader=S(Eb);environmentInjector=S(Vt);destroyRef=S(Ln);urlSerializer=S(la);rootContexts=S(No);location=S(wo);inputBindingEnabled=S(Jc,{optional:!0})!==null;titleStrategy=S(Vp);options=S(da,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=S(eu);createViewTransition=S(Ib,{optional:!0});navigationErrorHandler=S(Db,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>q(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=r=>this.events.next(new Bc(r)),i=r=>this.events.next(new zc(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let i=++this.navigationId;this.transitions?.next(M(y({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i}))}setupNavigations(n){return this.transitions=new je(null),this.transitions.pipe(he(i=>i!==null),st(i=>{let r=!1,o=!1;return q(i).pipe(st(s=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Rt.SupersededByNewNavigation),ke;this.currentTransition=i,this.currentNavigation={id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:this.lastSuccessfulNavigation?M(y({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let a=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),l=s.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!a&&l!=="reload"){let c="";return this.events.next(new oi(s.id,this.urlSerializer.serialize(s.rawUrl),c,ea.IgnoredSameUrlNavigation)),s.resolve(!1),ke}if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return q(s).pipe(st(c=>(this.events.next(new Bn(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?ke:Promise.resolve(c))),sN(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),J(c=>{i.targetSnapshot=c.targetSnapshot,i.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation=M(y({},this.currentNavigation),{finalUrl:c.urlAfterRedirects});let u=new Ei(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}));if(a&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:c,extractedUrl:u,source:d,restoredState:h,extras:f}=s,m=new Bn(c,this.urlSerializer.serialize(u),d,h);this.events.next(m);let _=fb(this.rootComponentType).snapshot;return this.currentTransition=i=M(y({},s),{targetSnapshot:_,urlAfterRedirects:u,extras:M(y({},f),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=u,q(i)}else{let c="";return this.events.next(new oi(s.id,this.urlSerializer.serialize(s.extractedUrl),c,ea.IgnoredByUrlHandlingStrategy)),s.resolve(!1),ke}}),J(s=>{let a=new Fc(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(a)}),G(s=>(this.currentTransition=i=M(y({},s),{guards:CR(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),i)),kR(this.environmentInjector,s=>this.events.next(s)),J(s=>{if(i.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw Yc(this.urlSerializer,s.guardsResult);let a=new kc(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);this.events.next(a)}),he(s=>s.guardsResult?!0:(this.cancelNavigationTransition(s,"",Rt.GuardRejected),!1)),bp(s=>{if(s.guards.canActivateChecks.length!==0)return q(s).pipe(J(a=>{let l=new Uc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}),st(a=>{let l=!1;return q(a).pipe(aN(this.paramsInheritanceStrategy,this.environmentInjector),J({next:()=>l=!0,complete:()=>{l||this.cancelNavigationTransition(a,"",Rt.NoDataFromResolver)}}))}),J(a=>{let l=new Vc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(l)}))}),bp(s=>{let a=l=>{let c=[];l.routeConfig?.loadComponent&&!l.routeConfig._loadedComponent&&c.push(this.configLoader.loadComponent(l.routeConfig).pipe(J(u=>{l.component=u}),G(()=>{})));for(let u of l.children)c.push(...a(u));return c};return pl(a(s.targetSnapshot.root)).pipe(vi(null),We(1))}),bp(()=>this.afterPreactivation()),st(()=>{let{currentSnapshot:s,targetSnapshot:a}=i,l=this.createViewTransition?.(this.environmentInjector,s.root,a.root);return l?Oe(l).pipe(G(()=>i)):q(i)}),G(s=>{let a=bR(n.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=i=M(y({},s),{targetRouterState:a}),this.currentNavigation.targetRouterState=a,i}),J(()=>{this.events.next(new ta)}),ER(this.rootContexts,n.routeReuseStrategy,s=>this.events.next(s),this.inputBindingEnabled),We(1),J({next:s=>{r=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Nt(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(!0)},complete:()=>{r=!0}}),zi(this.transitionAbortSubject.pipe(J(s=>{throw s}))),zr(()=>{!r&&!o&&this.cancelNavigationTransition(i,"",Rt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation=null,this.currentTransition=null)}),Xt(s=>{if(this.destroyed)return i.resolve(!1),ke;if(o=!0,yb(s))this.events.next(new Jt(i.id,this.urlSerializer.serialize(i.extractedUrl),s.message,s.cancellationCode)),MR(s)?this.events.next(new Do(s.url,s.navigationBehaviorOptions)):i.resolve(!1);else{let a=new si(i.id,this.urlSerializer.serialize(i.extractedUrl),s,i.targetSnapshot??void 0);try{let l=hn(this.environmentInjector,()=>this.navigationErrorHandler?.(a));if(l instanceof Ao){let{message:c,cancellationCode:u}=Yc(this.urlSerializer,l);this.events.next(new Jt(i.id,this.urlSerializer.serialize(i.extractedUrl),c,u)),this.events.next(new Do(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(a),s}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return ke}))}))}cancelNavigationTransition(n,i,r){let o=new Jt(n.id,this.urlSerializer.serialize(n.extractedUrl),i,r);this.events.next(o),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return n.toString()!==i?.toString()&&!this.currentNavigation?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function hN(t){return t!==Pc}var Rb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(pN),providedIn:"root"})}return t})(),Kc=class{shouldDetach(e){return!1}store(e,n){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,n){return e.routeConfig===n.routeConfig}},pN=(()=>{class t extends Kc{static \u0275fac=(()=>{let n;return function(r){return(n||(n=nr(t)))(r||t)}})();static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Nb=(()=>{class t{urlSerializer=S(la);options=S(da,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=S(wo);urlHandlingStrategy=S(eu);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Vn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:i,targetBrowserUrl:r}){let o=n!==void 0?this.urlHandlingStrategy.merge(n,i):i,s=r??o;return s instanceof Vn?this.urlSerializer.serialize(s):s}commitTransition({targetRouterState:n,finalUrl:i,initialUrl:r}){i&&n?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=n):this.rawUrlTree=r}routerState=fb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:()=>S(mN),providedIn:"root"})}return t})(),mN=(()=>{class t extends Nb{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{n(i.url,i.state,"popstate")})})}handleRouterEvent(n,i){n instanceof Bn?this.updateStateMemento():n instanceof oi?this.commitTransition(i):n instanceof Ei?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof ta?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):n instanceof Jt&&(n.code===Rt.GuardRejected||n.code===Rt.NoDataFromResolver)?this.restoreHistory(i):n instanceof si?this.restoreHistory(i,!0):n instanceof Nt&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,{extras:i,id:r}){let{replaceUrl:o,state:s}=i;if(this.location.isCurrentPathEqualTo(n)||o){let a=this.browserPageId,l=y(y({},s),this.generateNgRouterState(r,a));this.location.replaceState(n,"",l)}else{let a=y(y({},s),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(n,"",a)}}restoreHistory(n,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===n.finalUrl&&o===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,i){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:i}:{navigationId:n}}static \u0275fac=(()=>{let n;return function(r){return(n||(n=nr(t)))(r||t)}})();static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Bp(t,e){t.events.pipe(he(n=>n instanceof Nt||n instanceof Jt||n instanceof si||n instanceof oi),G(n=>n instanceof Nt||n instanceof oi?0:(n instanceof Jt?n.code===Rt.Redirect||n.code===Rt.SupersededByNewNavigation:!1)?2:1),he(n=>n!==2),We(1)).subscribe(()=>{e()})}var gN={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},vN={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},Wt=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=S(Kh);stateManager=S(Nb);options=S(da,{optional:!0})||{};pendingTasks=S(uo);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=S(Ab);urlSerializer=S(la);location=S(wo);urlHandlingStrategy=S(eu);_events=new Ie;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=S(Rb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=S(fa,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!S(Jc,{optional:!0});constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}eventsSubscription=new Be;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=this.navigationTransitions.currentNavigation;if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof Jt&&i.code!==Rt.Redirect&&i.code!==Rt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Nt)this.navigated=!0;else if(i instanceof Do){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=y({browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||hN(r.source)},s);this.scheduleNavigation(a,Pc,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}_N(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortSubject.next(r)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Pc,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,i,r)=>{this.navigateToSyncWithBrowser(n,r,i)})}navigateToSyncWithBrowser(n,i,r){let o={replaceUrl:!0},s=r?.navigationId?r:null;if(r){let l=y({},r);delete l.navigationId,delete l.\u0275routerPageId,Object.keys(l).length!==0&&(o.state=l)}let a=this.parseUrl(n);this.scheduleNavigation(a,i,s,o)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Up),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=y(y({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let h=r?r.snapshot:this.routerState.snapshot.root;d=lb(h)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return cb(d,n,u,c??null)}navigateByUrl(n,i={skipLocationChange:!1}){let r=Mi(n)?n:this.parseUrl(n),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,Pc,null,i)}navigate(n,i={skipLocationChange:!1}){return yN(n),this.navigateByUrl(this.createUrlTree(n,i),i)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,i){let r;if(i===!0?r=y({},gN):i===!1?r=y({},vN):r=i,Mi(n))return Gx(this.currentUrlTree,n,r);let o=this.parseUrl(n);return Gx(this.currentUrlTree,o,r)}removeEmptyProps(n){return Object.entries(n).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(n,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((d,h)=>{a=d,l=h});let u=this.pendingTasks.add();return Bp(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(d=>Promise.reject(d))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function yN(t){for(let e=0;e<t.length;e++)if(t[e]==null)throw new z(4008,!1)}function _N(t){return!(t instanceof ta)&&!(t instanceof Do)}var Lo=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;href=null;target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new Ie;constructor(n,i,r,o,s,a){this.router=n,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area",this.isAnchorElement?this.subscription=n.events.subscribe(c=>{c instanceof Nt&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}routerLinkInput=null;set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Mi(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,i,r,o,s){let a=this.urlTree;if(a===null||this.isAnchorElement&&(n!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.href=n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n)):null;let i=this.href===null?null:d_(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",i)}applyAttributeValue(n,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,n,i):r.removeAttribute(o,n)}get urlTree(){return this.routerLinkInput===null?null:Mi(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(i){return new(i||t)(On(Wt),On(ai),wh("tabindex"),On($h),On(ir),On(So))};static \u0275dir=Us({type:t,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(i,r){i&1&&D("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&se("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",xc],skipLocationChange:[2,"skipLocationChange","skipLocationChange",xc],replaceUrl:[2,"replaceUrl","replaceUrl",xc],routerLink:"routerLink"},features:[tr]})}return t})();var bN=new C("");function zp(t,...e){return It([{provide:fa,multi:!0,useValue:t},[],{provide:ai,useFactory:SN,deps:[Wt]},{provide:Jh,multi:!0,useFactory:wN},e.map(n=>n.\u0275providers)])}function SN(t){return t.routerState.root}function wN(){let t=S(vt);return e=>{let n=t.get(xi);if(e!==n.components[0])return;let i=t.get(Wt),r=t.get(MN);t.get(EN)===1&&i.initialNavigation(),t.get(CN,null,re.Optional)?.setUpPreloading(),t.get(bN,null,re.Optional)?.init(),i.resetRootComponentType(n.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var MN=new C("",{factory:()=>new Ie}),EN=new C("",{providedIn:"root",factory:()=>1});var CN=new C("");function ve(t,e){let n=!e?.manualCleanup;n&&!e?.injector&&ch(ve);let i=n?e?.injector?.get(Ln)??S(Ln):null,r=IN(e?.equal),o;e?.requireSync?o=Pe({kind:0},{equal:r}):o=Pe({kind:1,value:e?.initialValue},{equal:r});let s,a=t.subscribe({next:l=>o.set({kind:1,value:l}),error:l=>{if(e?.rejectErrors)throw l;o.set({kind:2,error:l})},complete:()=>{s?.()}});if(e?.requireSync&&o().kind===0)throw new z(601,!1);return s=i?.onDestroy(a.unsubscribe.bind(a)),xt(()=>{let l=o();switch(l.kind){case 1:return l.value;case 2:throw l.error;case 0:throw new z(601,!1)}},{equal:e?.equal})}function IN(t=Object.is){return(e,n)=>e.kind===1&&n.kind===1&&t(e.value,n.value)}var Wp={};function li(t,e){if(Wp[t]=(Wp[t]||0)+1,typeof e=="function")return Hp(t,(...i)=>M(y({},e(...i)),{type:t}));switch(e?e._as:"empty"){case"empty":return Hp(t,()=>({type:t}));case"props":return Hp(t,i=>M(y({},i),{type:t}));default:throw new Error("Unexpected config.")}}function ie(){return{_as:"props",_p:void 0}}function Hp(t,e){return Object.defineProperty(e,"type",{value:t,writable:!1})}function DN(t){return t.charAt(0).toUpperCase()+t.substring(1)}function AN(t){return t.charAt(0).toLowerCase()+t.substring(1)}function RN(t,e){if(t==null)throw new Error(`${e} must be defined.`)}function Xb(t){let{source:e,events:n}=t;return Object.keys(n).reduce((i,r)=>M(y({},i),{[NN(r)]:li(PN(e,r),n[r])}),{})}function qe(){return ie()}function NN(t){return t.trim().split(" ").map((e,n)=>n===0?AN(e):DN(e)).join("")}function PN(t,e){return`[${t}] ${e}`}var pa="@ngrx/store/init",zn=(()=>{class t extends je{constructor(){super({type:pa})}next(n){if(typeof n=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof n>"u")throw new TypeError("Actions must be objects");if(typeof n.type>"u")throw new TypeError("Actions must have a type property");super.next(n)}complete(){}ngOnDestroy(){super.complete()}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),LN=[zn],Yb=new C("@ngrx/store Internal Root Guard"),Pb=new C("@ngrx/store Internal Initial State"),ma=new C("@ngrx/store Initial State"),Zb=new C("@ngrx/store Reducer Factory"),Lb=new C("@ngrx/store Internal Reducer Factory Provider"),Kb=new C("@ngrx/store Initial Reducers"),Gp=new C("@ngrx/store Internal Initial Reducers"),Ob=new C("@ngrx/store Store Features"),Fb=new C("@ngrx/store Internal Store Reducers"),jp=new C("@ngrx/store Internal Feature Reducers"),kb=new C("@ngrx/store Internal Feature Configs"),Jb=new C("@ngrx/store Internal Store Features"),Ub=new C("@ngrx/store Internal Feature Reducers Token"),Qb=new C("@ngrx/store Feature Reducers"),Vb=new C("@ngrx/store User Provided Meta Reducers"),tu=new C("@ngrx/store Meta Reducers"),Bb=new C("@ngrx/store Internal Resolved Meta Reducers"),zb=new C("@ngrx/store User Runtime Checks Config"),Hb=new C("@ngrx/store Internal User Runtime Checks Config"),fr=new C("@ngrx/store Internal Runtime Checks"),Yp=new C("@ngrx/store Check if Action types are unique"),ha=new C("@ngrx/store Root Store Provider"),nu=new C("@ngrx/store Feature State Provider");function Zp(t,e={}){let n=Object.keys(t),i={};for(let o=0;o<n.length;o++){let s=n[o];typeof t[s]=="function"&&(i[s]=t[s])}let r=Object.keys(i);return function(s,a){s=s===void 0?e:s;let l=!1,c={};for(let u=0;u<r.length;u++){let d=r[u],h=i[d],f=s[d],m=h(f,a);c[d]=m,l=l||m!==f}return l?c:s}}function ON(t,e){return Object.keys(t).filter(n=>n!==e).reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{})}function eS(...t){return function(e){if(t.length===0)return e;let n=t[t.length-1];return t.slice(0,-1).reduceRight((r,o)=>o(r),n(e))}}function tS(t,e){return Array.isArray(e)&&e.length>0&&(t=eS.apply(null,[...e,t])),(n,i)=>{let r=t(n);return(o,s)=>(o=o===void 0?i:o,r(o,s))}}function FN(t){let e=Array.isArray(t)&&t.length>0?eS(...t):n=>n;return(n,i)=>(n=e(n),(r,o)=>(r=r===void 0?i:r,n(r,o)))}var hr=class extends le{},Oo=class extends zn{},ru="@ngrx/store/update-reducers",iu=(()=>{class t extends je{get currentReducers(){return this.reducers}constructor(n,i,r,o){super(o(r,i)),this.dispatcher=n,this.initialState=i,this.reducers=r,this.reducerFactory=o}addFeature(n){this.addFeatures([n])}addFeatures(n){let i=n.reduce((r,{reducers:o,reducerFactory:s,metaReducers:a,initialState:l,key:c})=>{let u=typeof o=="function"?FN(a)(o,l):tS(s,a)(o,l);return r[c]=u,r},{});this.addReducers(i)}removeFeature(n){this.removeFeatures([n])}removeFeatures(n){this.removeReducers(n.map(i=>i.key))}addReducer(n,i){this.addReducers({[n]:i})}addReducers(n){this.reducers=y(y({},this.reducers),n),this.updateReducers(Object.keys(n))}removeReducer(n){this.removeReducers([n])}removeReducers(n){n.forEach(i=>{this.reducers=ON(this.reducers,i)}),this.updateReducers(n)}updateReducers(n){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:ru,features:n})}ngOnDestroy(){this.complete()}static{this.\u0275fac=function(i){return new(i||t)(O(Oo),O(ma),O(Kb),O(Zb))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),kN=[iu,{provide:hr,useExisting:iu},{provide:Oo,useExisting:zn}],pr=(()=>{class t extends Ie{ngOnDestroy(){this.complete()}static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=nr(t)))(r||t)}})()}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),UN=[pr],Fo=class extends le{},Gb=(()=>{class t extends je{static{this.INIT=pa}constructor(n,i,r,o){super(o);let a=n.pipe(an(ds)).pipe(ze(i)),l={state:o},c=a.pipe(Bi(VN,l));this.stateSubscription=c.subscribe(({state:u,action:d})=>{this.next(u),r.next(d)}),this.state=ve(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}static{this.\u0275fac=function(i){return new(i||t)(O(zn),O(hr),O(pr),O(ma))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})();function VN(t={state:void 0},[e,n]){let{state:i}=t;return{state:n(i,e),action:e}}var BN=[Gb,{provide:Fo,useExisting:Gb}],de=(()=>{class t extends le{constructor(n,i,r,o){super(),this.actionsObserver=i,this.reducerManager=r,this.injector=o,this.source=n,this.state=n.state}select(n,...i){return Kp.call(null,n,...i)(this)}selectSignal(n,i){return xt(()=>n(this.state()),i)}lift(n){let i=new t(this,this.actionsObserver,this.reducerManager);return i.operator=n,i}dispatch(n,i){if(typeof n=="function")return this.processDispatchFn(n,i);this.actionsObserver.next(n)}next(n){this.actionsObserver.next(n)}error(n){this.actionsObserver.error(n)}complete(){this.actionsObserver.complete()}addReducer(n,i){this.reducerManager.addReducer(n,i)}removeReducer(n){this.reducerManager.removeReducer(n)}processDispatchFn(n,i){RN(this.injector,"Store Injector");let r=i?.injector??HN()??this.injector;return Fn(()=>{let o=n();bc(()=>this.dispatch(o))},{injector:r})}static{this.\u0275fac=function(i){return new(i||t)(O(Fo),O(zn),O(iu),O(vt))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),zN=[de];function Kp(t,e,...n){return function(r){let o;if(typeof t=="string"){let s=[e,...n].filter(Boolean);o=r.pipe(kd(t,...s))}else if(typeof t=="function")o=r.pipe(G(s=>t(s,e)));else throw new TypeError(`Unexpected type '${typeof t}' in select operator, expected 'string' or 'function'`);return o.pipe(Ld())}}function HN(){try{return S(vt)}catch{return}}var Jp="https://ngrx.io/guide/store/configuration/runtime-checks";function jb(t){return t===void 0}function Wb(t){return t===null}function nS(t){return Array.isArray(t)}function GN(t){return typeof t=="string"}function jN(t){return typeof t=="boolean"}function WN(t){return typeof t=="number"}function iS(t){return typeof t=="object"&&t!==null}function $N(t){return iS(t)&&!nS(t)}function qN(t){if(!$N(t))return!1;let e=Object.getPrototypeOf(t);return e===Object.prototype||e===null}function $p(t){return typeof t=="function"}function XN(t){return $p(t)&&t.hasOwnProperty("\u0275cmp")}function YN(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var ZN=!1;function Qp(){return ZN}function $b(t,e){return t===e}function KN(t,e,n){for(let i=0;i<t.length;i++)if(!n(t[i],e[i]))return!0;return!1}function rS(t,e=$b,n=$b){let i=null,r=null,o;function s(){i=null,r=null}function a(u=void 0){o={result:u}}function l(){o=void 0}function c(){if(o!==void 0)return o.result;if(!i)return r=t.apply(null,arguments),i=arguments,r;if(!KN(arguments,i,e))return r;let u=t.apply(null,arguments);return i=arguments,n(r,u)?r:(r=u,u)}return{memoized:c,reset:s,setResult:a,clearResult:l}}function ee(...t){return QN(rS)(...t)}function JN(t,e,n,i){if(n===void 0){let o=e.map(s=>s(t));return i.memoized.apply(null,o)}let r=e.map(o=>o(t,n));return i.memoized.apply(null,[...r,n])}function QN(t,e={stateFn:JN}){return function(...n){let i=n;if(Array.isArray(i[0])){let[u,...d]=i;i=[...u,...d]}else i.length===1&&eP(i[0])&&(i=tP(i[0]));let r=i.slice(0,i.length-1),o=i[i.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),a=t(function(...u){return o.apply(null,u)}),l=rS(function(u,d){return e.stateFn.apply(null,[u,r,d,a])});function c(){l.reset(),a.reset(),s.forEach(u=>u.release())}return Object.assign(l.memoized,{release:c,projector:a.memoized,setResult:l.setResult,clearResult:l.clearResult})}}function em(t){return ee(e=>{let n=e[t];return!Qp()&&rr()&&!(t in e)&&console.warn(`@ngrx/store: The feature name "${t}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${t}', ...) or StoreModule.forFeature('${t}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),n},e=>e)}function eP(t){return!!t&&typeof t=="object"&&Object.values(t).every(e=>typeof e=="function")}function tP(t){let e=Object.values(t),n=Object.keys(t),i=(...r)=>n.reduce((o,s,a)=>M(y({},o),{[s]:r[a]}),{});return[...e,i]}function nP(t){return t instanceof C?S(t):t}function iP(t,e){return e.map((n,i)=>{if(t[i]instanceof C){let r=S(t[i]);return{key:n.key,reducerFactory:r.reducerFactory?r.reducerFactory:Zp,metaReducers:r.metaReducers?r.metaReducers:[],initialState:r.initialState}}return n})}function rP(t){return t.map(e=>e instanceof C?S(e):e)}function oS(t){return typeof t=="function"?t():t}function oP(t,e){return t.concat(e)}function sP(){if(S(de,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function aP(t,e){return function(n,i){let r=e.action(i)?qp(i):i,o=t(n,r);return e.state()?qp(o):o}}function qp(t){Object.freeze(t);let e=$p(t);return Object.getOwnPropertyNames(t).forEach(n=>{if(!n.startsWith("\u0275")&&YN(t,n)&&(!e||n!=="caller"&&n!=="callee"&&n!=="arguments")){let i=t[n];(iS(i)||$p(i))&&!Object.isFrozen(i)&&qp(i)}}),t}function lP(t,e){return function(n,i){if(e.action(i)){let o=Xp(i);qb(o,"action")}let r=t(n,i);if(e.state()){let o=Xp(r);qb(o,"state")}return r}}function Xp(t,e=[]){return(jb(t)||Wb(t))&&e.length===0?{path:["root"],value:t}:Object.keys(t).reduce((i,r)=>{if(i)return i;let o=t[r];return XN(o)?i:jb(o)||Wb(o)||WN(o)||jN(o)||GN(o)||nS(o)?!1:qN(o)?Xp(o,[...e,r]):{path:[...e,r],value:o}},!1)}function qb(t,e){if(t===!1)return;let n=t.path.join("."),i=new Error(`Detected unserializable ${e} at "${n}". ${Jp}#strict${e}serializability`);throw i.value=t.value,i.unserializablePath=n,i}function cP(t,e){return function(n,i){if(e.action(i)&&!Ae.isInAngularZone())throw new Error(`Action '${i.type}' running outside NgZone. ${Jp}#strictactionwithinngzone`);return t(n,i)}}function uP(t){return rr()?y({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},t):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function dP({strictActionSerializability:t,strictStateSerializability:e}){return n=>t||e?lP(n,{action:i=>t&&!tm(i),state:()=>e}):n}function fP({strictActionImmutability:t,strictStateImmutability:e}){return n=>t||e?aP(n,{action:i=>t&&!tm(i),state:()=>e}):n}function tm(t){return t.type.startsWith("@ngrx")}function hP({strictActionWithinNgZone:t}){return e=>t?cP(e,{action:n=>t&&!tm(n)}):e}function pP(t){return[{provide:Hb,useValue:t},{provide:zb,useFactory:mP,deps:[Hb]},{provide:fr,deps:[zb],useFactory:uP},{provide:tu,multi:!0,deps:[fr],useFactory:fP},{provide:tu,multi:!0,deps:[fr],useFactory:dP},{provide:tu,multi:!0,deps:[fr],useFactory:hP}]}function sS(){return[{provide:Yp,multi:!0,deps:[fr],useFactory:gP}]}function mP(t){return t}function gP(t){if(!t.strictActionTypeUniqueness)return;let e=Object.entries(Wp).filter(([,n])=>n>1).map(([n])=>n);if(e.length)throw new Error(`Action types are registered more than once, ${e.map(n=>`"${n}"`).join(", ")}. ${Jp}#strictactiontypeuniqueness`)}function nm(t,e,n={}){return It([...SP(t,e,n),bP])}function vP(t={},e={}){return[{provide:Yb,useFactory:sP},{provide:Pb,useValue:e.initialState},{provide:ma,useFactory:oS,deps:[Pb]},{provide:Gp,useValue:t},{provide:Fb,useExisting:t instanceof C?t:Gp},{provide:Kb,deps:[Gp,[new rh(Fb)]],useFactory:nP},{provide:Vb,useValue:e.metaReducers?e.metaReducers:[]},{provide:Bb,deps:[tu,Vb],useFactory:oP},{provide:Lb,useValue:e.reducerFactory?e.reducerFactory:Zp},{provide:Zb,deps:[Lb,Bb],useFactory:tS},LN,kN,UN,BN,zN,pP(e.runtimeChecks),sS()]}function yP(){S(zn),S(hr),S(pr),S(de),S(Yb,{optional:!0}),S(Yp,{optional:!0})}var _P=[{provide:ha,useFactory:yP},Qi(()=>S(ha))];function aS(t,e){return It([...vP(t,e),_P])}function xP(){S(ha);let t=S(Jb),e=S(Qb),n=S(iu);S(Yp,{optional:!0});let i=t.map((r,o)=>{let a=e.shift()[o];return M(y({},r),{reducers:a,initialState:oS(r.initialState)})});n.addFeatures(i)}var bP=[{provide:nu,useFactory:xP},Qi(()=>S(nu))];function SP(t,e,n={}){return[{provide:kb,multi:!0,useValue:t instanceof Object?{}:n},{provide:Ob,multi:!0,useValue:{key:t instanceof Object?t.name:t,reducerFactory:!(n instanceof C)&&n.reducerFactory?n.reducerFactory:Zp,metaReducers:!(n instanceof C)&&n.metaReducers?n.metaReducers:[],initialState:!(n instanceof C)&&n.initialState?n.initialState:void 0}},{provide:Jb,deps:[kb,Ob],useFactory:iP},{provide:jp,multi:!0,useValue:t instanceof Object?t.reducer:e},{provide:Ub,multi:!0,useExisting:e instanceof C?e:jp},{provide:Qb,multi:!0,deps:[jp,[new rh(Ub)]],useFactory:rP},sS()]}function pe(...t){let e=t.pop(),n=t.map(i=>i.type);return{reducer:e,types:n}}function lS(t,...e){let n=new Map;for(let i of e)for(let r of i.types){let o=n.get(r);if(o){let s=(a,l)=>i.reducer(o(a,l),l);n.set(r,s)}else n.set(r,i.reducer)}return function(i=t,r){let o=n.get(r.type);return o?o(i,r):i}}var w=Xb({source:"Neuronal",events:{"Model Store Load Requested":qe(),"Model Store Hydrated":ie(),"Epoch Store Hydrated":ie(),"Active Model Id From Route Set":ie(),"Active Model Id Set":ie(),"Model Entry Upserted":ie(),"Epoch View Sync From Model":ie(),"Epoch History Cleared":ie(),"Training Started":ie(),"Training Epoch Appended":ie(),"Training Finished":ie(),"Training Stop Requested":qe(),"Training Pause Toggled":qe(),"Model Dropdown Set Open":ie(),"Last Train Metrics Reset":qe(),"New Model From List Requested":qe(),"New Model From Toolbar Requested":qe(),"Active Model From Toolbar Requested":ie(),"Ui Model Dropdown Toggle Requested":qe(),"Runtime Status Plain Set":ie(),"Runtime Kernel Caps Updated":ie(),"Train Hyperparams Patch":ie(),"Ui Train Start Requested":qe(),"Ui Export Bundle Requested":qe(),"Ui Save As Requested":qe(),"Ui Reset Requested":qe(),"Ui Infer Random Requested":qe(),"Ui Infer Draw Requested":qe(),"Ui Clear Draw Requested":qe(),"Ui Epoch Preset Requested":ie(),"Ui Epochs Input Changed":ie(),"Ui Batch Size Input Changed":ie(),"Ui Train Lr Input Changed":ie(),"Ui Train Viz Every Input Changed":ie(),"Ui Draw Pointer Down":ie(),"Ui Draw Pointer Move":ie(),"Ui Draw Pointer Up":qe(),"Ui Draw Pointer Cancel":qe(),"Ui Draw Pointer Leave":qe(),"Viz Input Layer Layout Changed":ie(),"Viz Input Layer Scale Changed":ie(),"Viz Hidden Layer Layout Changed":ie(),"Viz Hidden Layer Scale Changed":ie(),"Viz Active Neuron Max Scale Mul Changed":ie(),"Viz Scene Color Changed":ie(),"Viz Light Color Changed":ie(),"Viz Network Colors Patch":ie(),"Viz Post Process Patch":ie(),"Ui Viz Immersive Toggled":qe(),"Daisy Ui App Theme Changed":ie(),"Viz 3d Colors Sync From Daisy Requested":qe(),"Viz 3d Color Preset Mode Changed":ie(),"Viz 3d Daisy Palette Applied":ie()}});var ue=em("neuronal");var rm=ee(ue,t=>t.epochByModelId),cS=ee(ue,t=>t.epochDisplayRows),wP=ee(cS,t=>t),om=ee(ue,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(a=>a.id===e):null,i=e?t.epochByModelId[e]?.length??0:0,r=Math.max(n?.metrics.epochsTrained??0,i),o=t.epochDisplayRows,s=o.length===0?[]:[...o].slice(-200).reverse();return{epochsTotal:r,rows:s}});function ga(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var ko=ee(ue,t=>t.modelCollection),mr=ee(ue,t=>t.modelStoreHydrated),uS=ee(ue,t=>{if(!t.modelStoreHydrated)return{name:"Modelle werden geladen \u2026",meta:""};if(t.modelCollection.models.length===0)return{name:"Kein Modell",meta:"Lege ein neues Modell an"};let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{name:n.name,meta:`Epoch ${n.metrics.epochsTrained} \xB7 Test-Genauigkeit ${ga(n.metrics.testAcc)} \xB7 Fehlerrate ${ga(n.metrics.errorRate)}`}:{name:"Modell w\xE4hlen",meta:""}}),dS=ee(ue,t=>{if(!t.modelStoreHydrated)return{phase:"loading"};if(t.modelCollection.models.length===0)return{phase:"empty"};let e=t.modelCollection.activeModelId;return{phase:"list",items:t.modelCollection.models.map(i=>({id:i.id,name:i.name,epochValue:String(i.metrics.epochsTrained),accValue:ga(i.metrics.testAcc),errValue:ga(i.metrics.errorRate),active:i.id===e})),trainingRunning:t.training.running}}),fS=ee(ue,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0),sm=ee(ue,t=>t.modelCollection.activeModelId),am=ee(ko,t=>{let e=t.activeModelId;if(!e)return null;let n=t.models.find(i=>i.id===e);return n?{title:n.name,subtitle:`MNIST \xB7 MLP \xB7 Test ${ga(n.metrics.testAcc)} \xB7 Epoche ${n.metrics.epochsTrained}`}:null}),hS=ee(ue,t=>t.modelDropdownOpen),lm=ee(uS,dS,hS,fS,(t,e,n,i)=>({label:t,menu:e,dropdownOpen:n,dropdownDisabled:i}));var Uo={lr:.02,batchSize:32,epochs:1,vizEveryNBatches:4};function cm(t,e,n,i){let r=Number.parseInt(t,10);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function MP(t,e,n,i){let r=Number.parseFloat(t);return Number.isFinite(r)?Math.min(i,Math.max(n,r)):e}function gr(t,e){let n=y(y({},t),e);return{epochs:cm(String(n.epochs),Uo.epochs,1,200),lr:MP(String(n.lr),Uo.lr,1e-4,1),batchSize:cm(String(n.batchSize),Uo.batchSize,1,512),vizEveryNBatches:cm(String(n.vizEveryNBatches),Uo.vizEveryNBatches,1,1e3)}}function pS(t,e){let n=e.batchSize,i=e.epochs,r=t;if(r<=0)return"Sobald Trainingsdaten geladen sind, erscheint hier die ungef\xE4hre Anzahl Gradientenschritte.";let o=Math.max(1,Math.ceil(r/n)),s=o*i;return`Bei Batchgr\xF6\xDFe ${n}: rund ${o} Schritte pro Epoche, etwa ${s} f\xFCr ${i} Epoche(n).`}var ou="MNIST";function mS(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function EP(t){let e=new Date(t);return Number.isFinite(e.getTime())?e.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}var um=ee(ue,t=>t.runtimeStatusPlain),dm=ee(ue,t=>{let e=t.runtimeKernelCaps.mnistTrainCount,n=t.runtimeKernelCaps.mnistTestCount;return e===0&&n===0?`${ou}: Train 0 \xB7 Test 0 \u2014 warten auf erfolgreichen Abruf (Statuszeile).`:e===0?`${ou}: Trainingsdaten fehlen \xB7 Test ${n}.`:n===0?`${ou}: Train ${e} \xB7 Testdaten fehlen.`:`${ou}: ${e} Train-Bilder \xB7 ${n} Test-Bilder bereit.`}),fm=ee(ue,t=>{if(!t.runtimeKernelCaps.hasNet)return"Noch kein Netz geladen";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?n.name:"Netz im Arbeitsspeicher"}),hm=ee(ue,t=>{if(!t.runtimeKernelCaps.hasNet)return"Oben \u201AAktives Modell\u2018 w\xE4hlen \u2014 oder \u201ETraining starten\u201C ohne vorherigen Stand legt automatisch einen ersten Stand an.";let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?`Test ${mS(n.metrics.testAcc)} \xB7 Fehlerquote ${mS(n.metrics.errorRate)} \xB7 ${n.metrics.epochsTrained} trainierte Epochen (Summe) \xB7 zuletzt ${EP(n.updatedAt)}`:"Kein passender Eintrag in der Bibliothek gefunden."}),pm=ee(ue,t=>pS(t.runtimeKernelCaps.mnistTrainCount,t.trainHyperparams)),mm=ee(ue,t=>t.trainHyperparams),CP=ee(ue,t=>t.runtimeKernelCaps),gm=ee(ue,t=>{let e=t.training.running,n=t.runtimeKernelCaps.mnistTrainCount,i=t.runtimeKernelCaps.hasNet;return{trainDisabled:n<=0||e,pauseDisabled:!e,saveDisabled:!i||e,resetDisabled:!i||e,trainFormLocked:e}}),vm=ee(ue,t=>{let e=t.training.running,n=t.runtimeKernelCaps.hasNet,i=t.runtimeKernelCaps.mnistTestCount;return{inferRandomDisabled:!n||i<=0,carouselDisabled:!n||i<=0||e,inferDrawDisabled:!n}}),ym=ee(ue,t=>t.training.running||!t.modelStoreHydrated);var TP=ee(ue,t=>t.training),IP=ee(ue,t=>t.lastTrainLoss),DP=ee(ue,t=>t.lastTrainBatchAcc),AP=ee(ue,t=>t.training.pause),RP=ee(ue,t=>t.training.shouldStop),ci=ee(ue,t=>t.training.running),_m=ee(ue,t=>({running:t.training.running,pause:t.training.pause,lastTrainLoss:t.lastTrainLoss,lastTrainBatchAcc:t.lastTrainBatchAcc}));function NP(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}var xm=ee(ue,t=>{let e=t.modelCollection.activeModelId,n=e?t.modelCollection.models.find(i=>i.id===e):null;return n?{headline:n.name,detail:`${n.metrics.epochsTrained} Epochen gesamt \xB7 Test ${NP(n.metrics.testAcc)}`}:{headline:"Kein aktives Modell",detail:"Zuerst ein Modell w\xE4hlen oder anlegen."}});var bm=ee(ue,t=>t.viz3d),va=ee(ue,t=>t.vizImmersiveUi);var Hn=ee(ue,t=>t);var su=class t{store=S(de);newModelDisabled=ve(this.store.select(ym),{requireSync:!0});newModel(){this.store.dispatch(w.newModelFromToolbarRequested())}exportJson(){this.store.dispatch(w.uiExportBundleRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-neuronal-model-bar"]],decls:6,vars:1,consts:[[1,"flex","min-w-0","flex-col","gap-1.5"],[1,"flex","min-w-0","flex-wrap","items-stretch","gap-2"],["id","btnNewModel","type","button",1,"btn","btn-accent","shrink-0",3,"click","disabled"],["id","btnExportJson","type","button",1,"btn","btn-outline","shrink-0",3,"click"]],template:function(n,i){n&1&&(g(0,"div",0)(1,"div",1)(2,"button",2),D("click",function(){return i.newModel()}),b(3," Neues Modell starten "),v(),g(4,"button",3),D("click",function(){return i.exportJson()}),b(5," JSON exportieren "),v()()()),n&2&&(x(2),U("disabled",i.newModelDisabled()))},encapsulation:2,changeDetection:0})};var gS="neuronal3d-daisyui-theme",vr="dark",Ti=["light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","dim","nord","sunset","caramellatte","abyss","silk"];function Ii(t){return Ti.includes(t)}function vS(t){let e=t.document;try{let n=t.localStorage.getItem(gS);if(n&&Ii(n)){e.documentElement.setAttribute("data-theme",n);return}}catch{}e.documentElement.setAttribute("data-theme",vr)}function yr(t){let e=t.documentElement.getAttribute("data-theme")??vr;return Ii(e)?e:vr}function au(t,e){t.documentElement.setAttribute("data-theme",e);try{localStorage.setItem(gS,e)}catch{}}function PP(t,e){if(t&1&&(g(0,"option",3),b(1),v()),t&2){let n=e.$implicit,i=E();U("value",n)("selected",n===i.currentTheme()),x(),et(n)}}var lu=class t{doc=S(Ve);destroyRef=S(Ln);store=S(de);themes=Ti;currentTheme=Pe(yr(this.doc));constructor(){let e=new MutationObserver(()=>{this.currentTheme.set(yr(this.doc))});e.observe(this.doc.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.destroyRef.onDestroy(()=>e.disconnect())}onThemePick(e){let i=e.target.value;Ii(i)&&(au(this.doc,i),this.store.dispatch(w.daisyUiAppThemeChanged({theme:i})))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-theme-switcher"]],decls:6,vars:0,consts:[[1,"flex","flex-wrap","items-center","justify-end","gap-2"],[1,"text-[0.65rem]","font-semibold","uppercase","tracking-widest","opacity-70"],[1,"select","select-bordered","select-sm","max-w-[11.5rem]","text-sm",3,"change"],[3,"value","selected"]],template:function(n,i){n&1&&(g(0,"label",0)(1,"span",1),b(2,"Theme"),v(),g(3,"select",2),D("change",function(o){return i.onThemePick(o)}),lt(4,PP,2,3,"option",3,bi),v()()),n&2&&(x(4),ct(i.themes))},encapsulation:2,changeDetection:0})};var LP=(t,e)=>e.id;function OP(t,e){t&1&&(g(0,"option",5),b(1,"Modelle werden geladen \u2026"),v())}function FP(t,e){t&1&&(g(0,"option",5),b(1,"Keine Modelle vorhanden"),v())}function kP(t,e){t&1&&(g(0,"option",5),b(1,"Modell w\xE4hlen"),v())}function UP(t,e){if(t&1&&(g(0,"option",8),b(1),v()),t&2){let n=e.$implicit;U("value",n.id),x(),zs(" ",n.name," \xB7 Ep. ",n.epochValue," \xB7 Test ",n.accValue," ")}}function VP(t,e){if(t&1&&(Ue(0,kP,2,0,"option",5),lt(1,UP,2,4,"option",8,LP)),t&2){let n=E();He(n.activeModelId()?-1:0),x(),ct(n.listMenuItems())}}var cu=class t{store=S(de);modelBar=ve(this.store.select(lm),{requireSync:!0});activeModelId=ve(this.store.select(sm),{initialValue:null});listMenuItems=xt(()=>{let e=this.modelBar().menu;return e.phase==="list"?e.items:[]});selectedModelIdValue(){return this.activeModelId()??""}onModelSelectChange(e){let i=e.target.value;i&&this.store.dispatch(w.activeModelFromToolbarRequested({id:i}))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-shell-header"]],decls:15,vars:3,consts:[[1,"border-base-200","bg-base-100","flex","flex-wrap","items-center","justify-between","gap-3","border-b","px-4","py-2","shadow-sm"],["aria-label","Brotkr\xFCmel",1,"breadcrumbs","text-sm","min-w-0","flex","flex-row","gap-3"],["routerLink","/",1,"link-hover","link","font-medium","text-2xl"],[1,"min-w-0","max-w-full","sm:max-w-md"],["aria-label","Aktives Modell",1,"select","select-bordered","w-full","min-w-40","max-w-full",3,"change","disabled","value"],["disabled","","value",""],[1,"justify-self-start"],[1,"flex","shrink-0","items-center","gap-2"],[3,"value"]],template:function(n,i){if(n&1&&(g(0,"header",0)(1,"nav",1)(2,"ul")(3,"li")(4,"a",2),b(5,"Modelle"),v()(),g(6,"li",3)(7,"select",4),D("change",function(o){return i.onModelSelectChange(o)}),Ue(8,OP,2,0,"option",5)(9,FP,2,0,"option",5)(10,VP,3,1),v()()(),g(11,"div",6),xe(12,"app-neuronal-model-bar"),v()(),g(13,"div",7),xe(14,"app-theme-switcher"),v()()),n&2){let r;x(7),U("disabled",i.modelBar().dropdownDisabled)("value",i.selectedModelIdValue()),x(),He((r=i.modelBar().menu.phase)==="loading"?8:r==="empty"?9:r==="list"?10:-1)}},dependencies:[Lo,lu,su],encapsulation:2,changeDetection:0})};var uu=class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-shell"]],decls:4,vars:0,consts:[[1,"bg-base-100","text-base-content","flex","h-full","min-h-0","flex-col"],[1,"flex","min-h-0","flex-1","flex-col"]],template:function(n,i){n&1&&(g(0,"div",0),xe(1,"app-shell-header"),g(2,"div",1),xe(3,"router-outlet"),v()())},dependencies:[dr,cu],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"],changeDetection:0})};var BP={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},du="__@ngrx/effects_create__";function Ee(t,e={}){let n=e.functional?t:t(),i=y(y({},BP),e);return Object.defineProperty(n,du,{value:i}),n}function zP(t){return Object.getOwnPropertyNames(t).filter(i=>t[i]&&t[i].hasOwnProperty(du)?t[i][du].hasOwnProperty("dispatch"):!1).map(i=>{let r=t[i][du];return y({propertyName:i},r)})}function HP(t){return zP(t)}function yS(t){return Object.getPrototypeOf(t)}function GP(t){return!!t.constructor&&t.constructor.name!=="Object"&&t.constructor.name!=="Function"}function _S(t){return typeof t=="function"}function jP(t){return t.filter(_S)}function WP(t,e,n){let i=yS(t),o=!!i&&i.constructor.name!=="Object"?i.constructor.name:null,s=HP(t).map(({propertyName:a,dispatch:l,useEffectsErrorHandler:c})=>{let u=typeof t[a]=="function"?t[a]():t[a],d=c?n(u,e):u;return l===!1?d.pipe(Nd()):d.pipe(Fd()).pipe(G(f=>({effect:t[a],notification:f,propertyName:a,sourceName:o,sourceInstance:t})))});return Ui(...s)}var $P=10;function xS(t,e,n=$P){return t.pipe(Xt(i=>(e&&e.handleError(i),n<=1?t:xS(t,e,n-1))))}var fu=(()=>{class t extends le{constructor(n){super(),n&&(this.source=n)}lift(n){let i=new t;return i.source=this,i.operator=n,i}static{this.\u0275fac=function(i){return new(i||t)(O(pr))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function Ce(...t){return he(e=>t.some(n=>typeof n=="string"?n===e.type:n.type===e.type))}var u6=new C("@ngrx/effects Internal Root Guard"),d6=new C("@ngrx/effects User Provided Effects"),f6=new C("@ngrx/effects Internal Root Effects"),h6=new C("@ngrx/effects Internal Root Effects Instances"),p6=new C("@ngrx/effects Internal Feature Effects"),m6=new C("@ngrx/effects Internal Feature Effects Instance Groups"),qP=new C("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>xS}),XP="@ngrx/effects/init",YP=li(XP);function ZP(t,e){if(t.notification.kind==="N"){let n=t.notification.value;!KP(n)&&e.handleError(new Error(`Effect ${JP(t)} dispatched an invalid action: ${QP(n)}`))}}function KP(t){return typeof t!="function"&&t&&t.type&&typeof t.type=="string"}function JP({propertyName:t,sourceInstance:e,sourceName:n}){let i=typeof e[t]=="function";return!!n?`"${n}.${String(t)}${i?"()":""}"`:`"${String(t)}()"`}function QP(t){try{return JSON.stringify(t)}catch{return t}}var eL="ngrxOnIdentifyEffects";function tL(t){return Sm(t,eL)}var nL="ngrxOnRunEffects";function iL(t){return Sm(t,nL)}var rL="ngrxOnInitEffects";function oL(t){return Sm(t,rL)}function Sm(t,e){return t&&e in t&&typeof t[e]=="function"}var bS=(()=>{class t extends Ie{constructor(n,i){super(),this.errorHandler=n,this.effectsErrorHandler=i}addEffects(n){this.next(n)}toActions(){return this.pipe(vl(n=>GP(n)?yS(n):n),Fe(n=>n.pipe(vl(sL))),Fe(n=>{let i=n.pipe(Vi(o=>aL(this.errorHandler,this.effectsErrorHandler)(o)),G(o=>(ZP(o,this.errorHandler),o.notification)),he(o=>o.kind==="N"&&o.value!=null),Pd()),r=n.pipe(We(1),he(oL),G(o=>o.ngrxOnInitEffects()));return Ui(i,r)}))}static{this.\u0275fac=function(i){return new(i||t)(O(yt),O(qP))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function sL(t){return tL(t)?t.ngrxOnIdentifyEffects():""}function aL(t,e){return n=>{let i=WP(n,t,e);return iL(n)?n.ngrxOnRunEffects(i):i}}var lL=(()=>{class t{get isStarted(){return!!this.effectsSubscription}constructor(n,i){this.effectSources=n,this.store=i,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}static{this.\u0275fac=function(i){return new(i||t)(O(bS),O(de))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function SS(...t){let e=t.flat(),n=jP(e);return It([n,Qi(()=>{S(ha),S(nu,{optional:!0});let i=S(lL),r=S(bS),o=!i.isStarted;o&&i.start();for(let s of e){let a=_S(s)?S(s):s;r.addEffects(a)}o&&S(de).dispatch(YP())})])}function nt(t,e){let n=[];for(let i=0;i<t;i++){let r=new Array(e).fill(0);n.push(r)}return n}function ya(t){let e=nt(t.length,1);for(let n=0;n<t.length;n++)e[n][0]=t[n];return e}function _a(t,e){let n=t.length,i=t[0].length,r=e.length,o=e[0].length;if(i!==r)throw new Error("matMul shape");let s=nt(n,o);for(let a=0;a<n;a++)for(let l=0;l<i;l++){let c=t[a][l];for(let u=0;u<o;u++)s[a][u]+=c*e[l][u]}return s}function wm(t,e){let n=nt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]*e;return n}function hu(t){let e=nt(t[0].length,t.length);for(let n=0;n<t.length;n++)for(let i=0;i<t[0].length;i++)e[i][n]=t[n][i];return e}function Mm(t,e,n){let i=_a(e,t);for(let r=0;r<i.length;r++){let o=n[r][0];for(let s=0;s<i[0].length;s++)i[r][s]+=o}return i}function Em(t){let e=nt(t.length,1);for(let n=0;n<t.length;n++){let i=0;for(let r=0;r<t[0].length;r++)i+=t[n][r];e[n][0]=i}return e}function Cm(t,e){let n=new Array(t.length);for(let i=0;i<t.length;i++)n[i]=t[i][e];return n}function Tm(t,e,n){for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++){let o=Number.isFinite(e[i][r])?e[i][r]:0,s=Math.max(-100,Math.min(100,o)),a=t[i][r]-n*s;Number.isFinite(a)&&(t[i][r]=Math.max(-1e4,Math.min(1e4,a)))}}function wS(t,e,n){let i=nt(t,e);for(let r=0;r<t;r++)for(let o=0;o<e;o++)i[r][o]=cL()*n;return i}function cL(){let t=0,e=0;for(;t===0;)t=Math.random();for(;e===0;)e=Math.random();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*e)}function MS(t,e=.01){let n=nt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?t[i][r]:e*t[i][r];return n}function ES(t,e=.01){let n=nt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]>0?1:e;return n}function CS(t){let e=t.length,n=t[0].length,i=nt(e,n);for(let r=0;r<n;r++){let o=-1/0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0;c>o&&(o=c)}Number.isFinite(o)||(o=0);let s=new Array(e),a=0;for(let l=0;l<e;l++){let c=Number.isFinite(t[l][r])?t[l][r]:0,u=Math.max(-60,Math.min(60,c-o)),d=Math.exp(u);s[l]=d,a+=d}if(!Number.isFinite(a)||a<=0){let l=1/Math.max(1,e);for(let c=0;c<e;c++)i[c][r]=l}else for(let l=0;l<e;l++)i[l][r]=s[l]/a}return i}function TS(t,e){let n=nt(t.length,t[0].length);for(let i=0;i<t.length;i++)for(let r=0;r<t[0].length;r++)n[i][r]=t[i][r]-e[i][r];return n}var ui=class{inputDim;hidden;outputDim;weights;biases;constructor(e,n,i){this.inputDim=e,this.hidden=[...n],this.outputDim=i;let r=[e,...n,i];this.weights=[],this.biases=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],l=Math.sqrt(2/Math.max(1,s));this.weights.push(wS(a,s,l)),this.biases.push(nt(a,1))}}forward(e){let n=[],i=e;for(let a=0;a<this.weights.length-1;a++){let l=Mm(i,this.weights[a],this.biases[a]),c=MS(l);n.push({z:l,a:c}),i=c}let r=this.weights.length-1,o=Mm(i,this.weights[r],this.biases[r]),s=CS(o);return n.push({z:o,a:s}),{layers:n,logits:o,prob:s}}crossEntropyLoss(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)for(let s=0;s<e.length;s++){let a=Math.max(e[s][o],1e-12);r-=n[s][o]*Math.log(a)}return r/i}backward(e,n,i){let r=this.weights.map(c=>nt(c.length,c[0].length)),o=this.biases.map(c=>nt(c.length,c[0].length)),s=this.weights.length-1,a=TS(i.prob,n),l=s===0?e:i.layers[s-1].a;r[s]=_a(a,hu(l)),o[s]=Em(a);for(let c=s-1;c>=0;c--){a=_a(hu(this.weights[c+1]),a);let u=ES(i.layers[c].z);for(let d=0;d<a.length;d++)for(let h=0;h<a[0].length;h++)a[d][h]*=u[d][h];l=c===0?e:i.layers[c-1].a,r[c]=_a(a,hu(l)),o[c]=Em(a)}return{dW:r,db:o}}applyGradients(e,n,i,r){let o=1/r;for(let s=0;s<this.weights.length;s++)Tm(this.weights[s],wm(e[s],o),i),Tm(this.biases[s],wm(n[s],o),i)}predictClass(e,n=0){let i=0,r=e[0][n];for(let o=1;o<e.length;o++){let s=e[o][n];s>r&&(r=s,i=o)}return i}countCorrectInBatch(e,n){let i=e[0].length,r=0;for(let o=0;o<i;o++)this.predictClass(e,o)===n[o]&&(r+=1);return r}};function pu(t,e,n=0){let i=[Cm(t,n)];for(let r of e.layers)i.push(Cm(r.a,n));return i}var _r=[64,32],mu=784,gu=10;function uL(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}function dL(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function vu(){let t=new ui(mu,[..._r],gu),e=new Date().toISOString();return{id:crypto.randomUUID(),name:uL(),createdAt:e,updatedAt:e,model:dL(t),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}}var fL="neuronal3d:epochTrack:v1";function IS(){try{localStorage.removeItem(fL)}catch{}}var hL="neuronal3d";var it="models",Xe="epochTracks",Pt="meta",xa="activeModelId",DS="dataRevision";var yu=null;function pL(t){return X(this,null,function*(){let n=t.transaction(Pt,"readonly").objectStore(Pt),i=yield De(n.get(DS));if(i?.value==null||i.value==="")return 0;let r=Number(i.value);return Number.isFinite(r)?r:0})}function AS(){return X(this,null,function*(){let t=yield rt();if((yield pL(t))===2)return;let n=t.transaction([it,Xe,Pt],"readwrite");yield De(n.objectStore(it).clear()),yield De(n.objectStore(Xe).clear());let i=n.objectStore(Pt);yield De(i.clear()),yield De(i.put({key:xa,value:null})),yield De(i.put({key:DS,value:String(2)})),yield xr(n)})}function rt(){return yu||(yu=new Promise((t,e)=>{let n=indexedDB.open(hL,4);n.onerror=()=>e(n.error??new Error("IndexedDB open failed")),n.onsuccess=()=>{let i=n.result;i.onversionchange=()=>{i.close(),yu=null},t(i)},n.onupgradeneeded=i=>{let r=n.result;if(i.oldVersion<4)for(let o of[it,Xe,Pt])r.objectStoreNames.contains(o)&&r.deleteObjectStore(o);r.objectStoreNames.contains(it)||r.createObjectStore(it,{keyPath:"id"}),r.objectStoreNames.contains(Xe)||r.createObjectStore(Xe,{keyPath:"modelId"}),r.objectStoreNames.contains(Pt)||r.createObjectStore(Pt,{keyPath:"key"})}})),yu}function De(t){return new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function xr(t){return new Promise((e,n)=>{t.addEventListener("complete",()=>e()),t.addEventListener("error",()=>n(t.error??new Error("IndexedDB transaction failed"))),t.addEventListener("abort",()=>n(t.error??new Error("IndexedDB transaction aborted")))})}var br=class t{getEpochsForModel(e){return X(this,null,function*(){let r=(yield rt()).transaction(Xe,"readonly").objectStore(Xe);return(yield De(r.get(e)))?.rows??[]})}setEpochsForModel(e,n){return X(this,null,function*(){let r=(yield rt()).transaction(Xe,"readwrite"),o=r.objectStore(Xe);yield De(o.put({modelId:e,rows:n})),yield xr(r)})}appendEpoch(e,n){return X(this,null,function*(){let i=yield this.getEpochsForModel(e);i.push(n);let r=i.slice(-500);yield this.setEpochsForModel(e,r)})}deleteEpochTrack(e){return X(this,null,function*(){let i=(yield rt()).transaction(Xe,"readwrite"),r=i.objectStore(Xe);yield De(r.delete(e)),yield xr(i)})}listModelIdsWithEpochTracks(){return X(this,null,function*(){let i=(yield rt()).transaction(Xe,"readonly").objectStore(Xe);return(yield De(i.getAllKeys())).map(o=>String(o))})}epochTrackCount(){return X(this,null,function*(){let i=(yield rt()).transaction(Xe,"readonly").objectStore(Xe);return De(i.count())})}loadEpochStore(){return X(this,null,function*(){let i=(yield rt()).transaction(Xe,"readonly").objectStore(Xe),r=yield De(i.getAll()),o={};for(let s of r)o[s.modelId]=[...s.rows];return{version:1,byModelId:o}})}saveEpochStore(e){return X(this,null,function*(){let i=(yield rt()).transaction(Xe,"readwrite"),r=i.objectStore(Xe),o=yield De(r.getAllKeys()),s=new Set(Object.keys(e.byModelId));for(let a of o){let l=String(a);s.has(l)||(yield De(r.delete(a)))}for(let[a,l]of Object.entries(e.byModelId))yield De(r.put({modelId:a,rows:l}));yield xr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})};var di=class t{listModels(){return X(this,null,function*(){let i=(yield rt()).transaction(it,"readonly").objectStore(it);return De(i.getAll())})}getModel(e){return X(this,null,function*(){let r=(yield rt()).transaction(it,"readonly").objectStore(it);return(yield De(r.get(e)))??void 0})}upsertModel(e){return X(this,null,function*(){let r=(yield rt()).transaction(it,"readwrite").objectStore(it);yield De(r.put(e))})}deleteModel(e){return X(this,null,function*(){let r=(yield rt()).transaction(it,"readwrite").objectStore(it);yield De(r.delete(e))})}modelCount(){return X(this,null,function*(){let i=(yield rt()).transaction(it,"readonly").objectStore(it);return De(i.count())})}getActiveModelId(){return X(this,null,function*(){let i=(yield rt()).transaction(Pt,"readonly").objectStore(Pt);return(yield De(i.get(xa)))?.value??null})}setActiveModelId(e){return X(this,null,function*(){let r=(yield rt()).transaction(Pt,"readwrite").objectStore(Pt);yield De(r.put({key:xa,value:e}))})}loadCollection(){return X(this,null,function*(){let[e,n]=yield Promise.all([this.listModels(),this.getActiveModelId()]);return{version:3,activeModelId:n,models:e}})}saveCollection(e){return X(this,null,function*(){let i=(yield rt()).transaction([it,Pt],"readwrite"),r=i.objectStore(it),o=i.objectStore(Pt),s=yield De(r.getAllKeys()),a=new Set(e.models.map(l=>l.id));for(let l of s){let c=String(l);a.has(c)||(yield De(r.delete(l)))}for(let l of e.models)yield De(r.put(l));yield De(o.put({key:xa,value:e.activeModelId})),yield xr(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})};function mL(t){let e=t.split(","),n=[];for(let i of e){let r=i.trim();r.length!==0&&n.push(Number(r))}return n}function gL(t){let e=mL(t);if(e.length!==785)return null;let n=e[0];if(!Number.isFinite(n))return null;let i=Math.round(n);if(!Number.isInteger(i)||i<0||i>9)return null;let r=e.slice(1,785);if(r.some(s=>!Number.isFinite(s)))return null;let o=r.map(s=>Math.max(0,Math.min(1,s/255)));return{label:i,pixels:o}}var vL=200;function Im(){let t=globalThis;return typeof t.scheduler?.yield=="function"?t.scheduler.yield():new Promise(e=>{setTimeout(e,0)})}function Dm(t){return X(this,null,function*(){let e=yield fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);let n=yield e.arrayBuffer(),i=new Uint8Array(n);if(i.length>=2&&i[0]===31&&i[1]===139){let r=new DecompressionStream("gzip");return yield new Response(new Blob([n]).stream().pipeThrough(r)).text()}return new TextDecoder().decode(n)})}function Am(t){return X(this,null,function*(){let e=t.split(/\r?\n/).filter(i=>i.trim().length>0);if(e.length===0)return[];let n=[];for(let i=0;i<e.length;i++){let r=gL(e[i]);r&&n.push(r),i>0&&(i+1)%vL===0&&(yield Im())}return n})}function RS(t,e=Math.random){for(let n=t.length-1;n>0;n--){let i=Math.floor(e()*(n+1)),r=t[n];t[n]=t[i],t[i]=r}}function NS(t,e){let n=[];for(let i=0;i<t;i+=e){let r=[];for(let o=i;o<Math.min(i+e,t);o++)r.push(o);n.push(r)}return n}var Qt=28,Rm=Qt*Qt;function xu(t,e){if(e.length!==Rm)return;let n=t.getContext("2d");if(!n)return;let i=t.width,r=t.height,o=n.createImageData(Qt,Qt),s=o.data;for(let c=0;c<Qt;c++)for(let u=0;u<Qt;u++){let d=Math.round(Math.max(0,Math.min(1,e[c*Qt+u]))*255),h=(c*Qt+u)*4;s[h]=d,s[h+1]=d,s[h+2]=d,s[h+3]=255}if(n.fillStyle="#000000",n.fillRect(0,0,i,r),i===Qt&&r===Qt){n.putImageData(o,0,0);return}let a=document.createElement("canvas");a.width=Qt,a.height=Qt;let l=a.getContext("2d");l&&(l.putImageData(o,0,0),n.imageSmoothingEnabled=!1,n.drawImage(a,0,0,i,r))}function PS(t,e,n,i,r,o,s){return X(this,null,function*(){let a=e.map((u,d)=>d),l=0,c=0;yield ba(0);for(let u=0;u<n.epochs;u++){yield ba(0),RS(a);let d=NS(e.length,n.batchSize),h=0,f=0,m=0,_=0;for(let T of d){for(yield ba(0);o()&&!s();)yield ba(50);if(s())return{lastTrainLoss:l,lastTrainBatchAcc:c};let I=T.length,B=nt(t.inputDim,I),Y=nt(t.outputDim,I),k=new Array(I);for(let _e=0;_e<I;_e++){let ut=e[a[T[_e]]];k[_e]=ut.label;for(let wn=0;wn<t.inputDim;wn++)B[wn][_e]=ut.pixels[wn];Y[ut.label][_e]=1}let L=t.forward(B),A=t.crossEntropyLoss(L.prob,Y),fe=A,Te=t.countCorrectInBatch(L.prob,k),{dW:Qe,db:rn}=t.backward(B,Y,L),Pi=pu(B,L,I-1);t.applyGradients(Qe,rn,n.lr,I);let Mt=Te/I;l=fe,c=Mt,f+=A*I,m+=Te,_+=I,h%n.vizEveryNBatches===0&&i({epoch:u,batchIndex:h,loss:fe,trainAccBatch:Mt,activations:Pi}),h+=1}r({epoch:u,loss:f/Math.max(1,_),trainAcc:m/Math.max(1,_)}),yield ba(0)}return{lastTrainLoss:l,lastTrainBatchAcc:c}})}function ba(t){return new Promise(e=>setTimeout(e,t))}var LS={backgroundFog:"#2a3140",floor:"#3d4658"},bu={hemiSky:"#d6e2ff",hemiGround:"#4b5668",ambient:"#ffffff",key:"#fff7ef",fill:"#aec3ff",rim:"#9df0ff",backAccent:"#5fd3ff"};function yn(t){return typeof t=="string"&&/^#[0-9A-Fa-f]{6}$/.test(t)}function Vo(t){if(!yn(t))return 0;let e=parseInt(t.slice(1),16),n=s=>{let a=s/255;return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},i=n(e>>16&255),r=n(e>>8&255),o=n(e&255);return .2126*i+.7152*r+.0722*o}var Sa={neuronEmissive:"#2a6bff",neuronEmissiveIntensityActive:1.9,neuronEmissiveIntensityIdle:.28,neuronHiddenCold:"#1f59cc",neuronHiddenHot:"#5eccff",neuronInputCold:"#1f59cc",neuronInputHot:"#ffffff",neuronOutputCold:"#3373d9",neuronOutputHot:"#99d9ff",edgePositiveCold:"#40240f",edgePositiveHot:"#ffb83a",edgeNegativeCold:"#0f3852",edgeNegativeHot:"#57b3ff",edgeInferMuted:"#0d1217",edgeTrainRecent:"#f29e2e"},Sr={bloomEnabled:!0,bloomStrength:.55,bloomRadius:.45,bloomThreshold:.22,fxaaEnabled:!0,toneMappingExposure:1.35},OS=["neuronEmissive","neuronHiddenCold","neuronHiddenHot","neuronInputCold","neuronInputHot","neuronOutputCold","neuronOutputHot","edgePositiveCold","edgePositiveHot","edgeNegativeCold","edgeNegativeHot","edgeInferMuted","edgeTrainRecent"];function FS(t){for(let e of OS)if(typeof t[e]=="string")return!0;return!1}function wa(t,e){let n=y({},t);for(let o of OS){let s=e[o];typeof s=="string"&&yn(s)&&(n[o]=s)}let i=e.neuronEmissiveIntensityActive;typeof i=="number"&&Number.isFinite(i)&&(n.neuronEmissiveIntensityActive=Math.min(4,Math.max(.05,i)));let r=e.neuronEmissiveIntensityIdle;return typeof r=="number"&&Number.isFinite(r)&&(n.neuronEmissiveIntensityIdle=Math.min(2,Math.max(0,r))),n}function Nm(t,e){let n=y({},t);typeof e.bloomEnabled=="boolean"&&(n.bloomEnabled=e.bloomEnabled),typeof e.fxaaEnabled=="boolean"&&(n.fxaaEnabled=e.fxaaEnabled);let i=e.bloomStrength;typeof i=="number"&&Number.isFinite(i)&&(n.bloomStrength=Math.min(3,Math.max(0,i)));let r=e.bloomRadius;typeof r=="number"&&Number.isFinite(r)&&(n.bloomRadius=Math.min(1,Math.max(0,r)));let o=e.bloomThreshold;typeof o=="number"&&Number.isFinite(o)&&(n.bloomThreshold=Math.min(1,Math.max(0,o)));let s=e.toneMappingExposure;return typeof s=="number"&&Number.isFinite(s)&&(n.toneMappingExposure=Math.min(3,Math.max(.2,s))),n}var Su=[784,64,32,10],Pm=[..._r],kS=150,Lm=typeof globalThis.location<"u"&&new URLSearchParams(globalThis.location.search).has("vizdebug"),US="data/csv/mnist_train.csv.gz",VS="data/csv/mnist_test.csv.gz",wr="MNIST",bt=28,BS=1,zS=7,wu=320,HS=48;function Om(t,e){return X(this,null,function*(){if(e.length===0)return null;let n=0,i=0;for(let o=0;o<e.length;o++){let s=e[o],a=ya(s.pixels),l=t.forward(a),c=new Array(10).fill(0);c[s.label]=1,n+=t.crossEntropyLoss(l.prob,ya(c)),t.predictClass(l.prob)===s.label&&(i+=1),o>0&&o%kS===0&&(yield Im())}let r=i/e.length;return{accuracy:r,errorRate:1-r,loss:n/e.length}})}var p={surfaceVizMount:null,surfaceDrawCanvas:null,ctx2d:null,appStore:null,reconcileWorkspaceUrlForModelSelection:void 0,nLatest:null,net:null,net3d:null,inferCounter:0,lastInferSampleIndex:-1,lastInferActsDebug:null,drawing:!1,liveCanvasInferRaf:null,liveInferLastRun:0,drawLastCell:null,drawLastSoftPoint:null,drawSoftIsPen:!0,drawInk:"#ffffff",drawBrushChebR:0,renderSceneBound:()=>{},renderDisplayBound:()=>{},disposeSceneBound:null,stopAnimCleanup:null};var Mu=4,GS="pixels";function Fm(){return Math.min(6,Math.max(0,Mu-1))}function jS(){return Math.min(6,Fm()+1)}function Eu(){return .52+Mu*.11}function km(t){GS=t,p.drawing=!1,p.drawLastCell=null,p.drawLastSoftPoint=null}function Bo(){return GS}function Um(t){let e=Math.round(Number(t));Number.isFinite(e)&&(Mu=Math.min(zS,Math.max(BS,e)))}function Vm(){return Mu}function Bm(){p.ctx2d.shadowBlur=0,p.ctx2d.shadowColor="transparent"}function Gn(){Bm(),p.ctx2d.globalCompositeOperation="source-over",p.ctx2d.globalAlpha=1}function zm(){return Math.min(p.surfaceDrawCanvas.width,p.surfaceDrawCanvas.height)}function yL(){return Math.max(2,36*zm()/wu)*Eu()}function _L(){return Math.max(2.2,42*zm()/wu)*Eu()}function xL(){return Math.max(.3,2.5*zm()/wu)/Math.sqrt(Eu())}function Hm(t,e){p.ctx2d.globalCompositeOperation="source-over",p.ctx2d.globalAlpha=1,Bm();let n=yL(),i=p.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.1,"rgba(255,255,255,1)"),i.addColorStop(.22,"rgba(255,255,255,0.88)"),i.addColorStop(.38,"rgba(255,255,255,0.55)"),i.addColorStop(.55,"rgba(255,255,255,0.32)"),i.addColorStop(.72,"rgba(255,255,255,0.14)"),i.addColorStop(.88,"rgba(255,255,255,0.05)"),i.addColorStop(1,"rgba(255,255,255,0)"),p.ctx2d.fillStyle=i,p.ctx2d.beginPath(),p.ctx2d.arc(t,e,n,0,Math.PI*2),p.ctx2d.fill()}function Gm(t,e){Bm(),p.ctx2d.globalAlpha=1;let n=_L();p.ctx2d.globalCompositeOperation="destination-out";let i=p.ctx2d.createRadialGradient(t,e,0,t,e,n);i.addColorStop(0,"rgba(255,255,255,0.94)"),i.addColorStop(.22,"rgba(255,255,255,0.55)"),i.addColorStop(.48,"rgba(255,255,255,0.22)"),i.addColorStop(.72,"rgba(255,255,255,0.08)"),i.addColorStop(1,"rgba(255,255,255,0)"),p.ctx2d.fillStyle=i,p.ctx2d.beginPath(),p.ctx2d.arc(t,e,n,0,Math.PI*2),p.ctx2d.fill(),p.ctx2d.globalCompositeOperation="source-over"}function WS(t,e,n,i,r){let o=n-t,s=i-e,a=Math.hypot(o,s),l=xL(),c=Math.max(1,Math.ceil(a/l));for(let u=0;u<=c;u++){let d=u/c,h=t+o*d,f=e+s*d;r?Hm(h,f):Gm(h,f)}}function $S(){let t=p.surfaceDrawCanvas.width,e=p.surfaceDrawCanvas.height;return{cellW:t/bt,cellH:e/bt}}function Ma(t){let e=p.surfaceDrawCanvas.getBoundingClientRect(),n=p.surfaceDrawCanvas.width/e.width,i=p.surfaceDrawCanvas.height/e.height;return{x:(t.clientX-e.left)*n,y:(t.clientY-e.top)*i}}function jm(t){let{cellW:e,cellH:n}=$S();return{gx:Math.max(0,Math.min(bt-1,Math.floor(t.x/e))),gy:Math.max(0,Math.min(bt-1,Math.floor(t.y/n)))}}function bL(t,e,n){Gn();let{cellW:i,cellH:r}=$S(),o=t*i,s=e*r,a=Math.ceil(i),l=Math.ceil(r),c=o+i*.5,u=s+r*.5,d=Math.max(i,r),h=Math.hypot(i,r)*.505,f=d*2.18;if(n==="#000000"||n.toLowerCase()==="#000000"){p.ctx2d.globalCompositeOperation="destination-out",p.ctx2d.fillStyle="rgba(255,255,255,1)",p.ctx2d.fillRect(o,s,a,l);let _=p.ctx2d.createRadialGradient(c,u,h,c,u,f*1.06);_.addColorStop(0,"rgba(255,255,255,0)"),_.addColorStop(.08,"rgba(255,255,255,0.38)"),_.addColorStop(.26,"rgba(255,255,255,0.2)"),_.addColorStop(.48,"rgba(255,255,255,0.1)"),_.addColorStop(.72,"rgba(255,255,255,0.04)"),_.addColorStop(1,"rgba(255,255,255,0)"),p.ctx2d.fillStyle=_,p.ctx2d.beginPath(),p.ctx2d.arc(c,u,f*1.06,0,Math.PI*2),p.ctx2d.fill(),p.ctx2d.globalCompositeOperation="source-over"}else{p.ctx2d.fillStyle="#ffffff",p.ctx2d.fillRect(o,s,a,l);let _=p.ctx2d.createRadialGradient(c,u,h,c,u,f);_.addColorStop(0,"rgba(255,255,255,0)"),_.addColorStop(.06,"rgba(255,255,255,0.38)"),_.addColorStop(.18,"rgba(255,255,255,0.24)"),_.addColorStop(.35,"rgba(255,255,255,0.14)"),_.addColorStop(.55,"rgba(255,255,255,0.07)"),_.addColorStop(.78,"rgba(255,255,255,0.03)"),_.addColorStop(1,"rgba(255,255,255,0)"),p.ctx2d.fillStyle=_,p.ctx2d.beginPath(),p.ctx2d.arc(c,u,f,0,Math.PI*2),p.ctx2d.fill(),p.ctx2d.fillStyle="#ffffff",p.ctx2d.fillRect(o,s,a,l)}}function Wm(t,e,n,i){for(let r=-n;r<=n;r++)for(let o=-n;o<=n;o++){let s=t+o,a=e+r;s>=0&&s<bt&&a>=0&&a<bt&&bL(s,a,i)}}function qS(t,e,n,i,r,o){let s=t,a=e,l=Math.abs(n-t),c=Math.abs(i-e),u=t<n?1:-1,d=e<i?1:-1,h=l-c;for(;Wm(s,a,r,o),!(s===n&&a===i);){let f=2*h;f>-c&&(h-=c,s+=u),f<l&&(h+=l,a+=d)}}var Ea=[],XS=[];function $m(){return Ea.length}function Mr(t){if(!Number.isFinite(t))return null;let e=Math.floor(t);return e<0||e>=Ea.length?null:Ea[e]}function jn(){return Ea}function _n(){return XS}function Ca(t,e){Ea=t,XS=e}function Le(t){p.appStore.dispatch(w.runtimeStatusPlainSet({plain:t}))}function fi(){let t=jn(),e=_n();p.appStore.dispatch(w.runtimeKernelCapsUpdated({caps:{hasNet:p.net!==null,mnistTrainCount:t.length,mnistTestCount:e.length}}))}function YS(t){p.nLatest.modelDropdownOpen!==t&&p.appStore.dispatch(w.modelDropdownSetOpen({open:t}))}function qm(t){p.appStore.dispatch(w.epochViewSyncFromModel({modelId:t??""}))}function ZS(t){p.appStore.dispatch(w.epochHistoryCleared({modelId:t}))}function zo(t){p.appStore.dispatch(w.modelEntryUpserted({entry:t}))}function KS(){let t=p.nLatest.trainHyperparams;return{lr:t.lr,batchSize:t.batchSize,epochs:t.epochs,vizEveryNBatches:t.vizEveryNBatches}}function JS(t,e){let n=e[t]??[];if(n.length===0)return 1;let i=0;for(let r of n)i=Math.max(i,r.run);return i+1}function hi(t,e){return String(t).padStart(e," ")}function Ta(t,e,n){return t.toFixed(n).padStart(e," ")}function Xm(t){return t===null||!Number.isFinite(t)?"-":`${(t*100).toFixed(2)}%`}function Ym(){return`Modell ${new Date().toLocaleString("de-DE",{hour12:!1})}`}var vw="170";var QS=0,ew=1,tw=2,nw=3,iw=4,rw=5,ow=6,sw=7;var Iu=2300,tg=2301,Zm=2302,aw=2400,lw=2401,cw=2402;var SL="",xn="srgb",yw="srgb-linear",_w="linear",ng="srgb";var m9=Math.PI/180,g9=180/Math.PI;function Ai(t,e,n){return Math.max(e,Math.min(n,t))}function wL(t,e){return(t%e+e)%e}function Km(t,e,n){return(1-n)*t+n*e}var Cr=class t{constructor(e=0,n=0){t.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Ai(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ye=class t{constructor(e,n,i,r,o,s,a,l,c){t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,o,s,a,l,c)}set(e,n,i,r,o,s,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=o,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],_=r[0],T=r[3],I=r[6],B=r[1],Y=r[4],k=r[7],L=r[2],A=r[5],fe=r[8];return o[0]=s*_+a*B+l*L,o[3]=s*T+a*Y+l*A,o[6]=s*I+a*k+l*fe,o[1]=c*_+u*B+d*L,o[4]=c*T+u*Y+d*A,o[7]=c*I+u*k+d*fe,o[2]=h*_+f*B+m*L,o[5]=h*T+f*Y+m*A,o[8]=h*I+f*k+m*fe,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*s*u-n*a*c-i*o*u+i*a*l+r*o*c-r*s*l}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,h=a*l-u*o,f=c*o-s*l,m=n*d+i*h+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*s)*_,e[3]=h*_,e[4]=(u*n-r*l)*_,e[5]=(r*o-a*n)*_,e[6]=f*_,e[7]=(i*l-c*n)*_,e[8]=(s*n-i*o)*_,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,o,s,a){let l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+e,-r*c,r*l,-r*(-c*s+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Jm.makeScale(e,n)),this}rotate(e){return this.premultiply(Jm.makeRotation(-e)),this}translate(e,n){return this.premultiply(Jm.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jm=new ye;var en={enabled:!0,workingColorSpace:yw,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===ng&&(t.r=Go(t.r),t.g=Go(t.g),t.b=Go(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ng&&(t.r=jo(t.r),t.g=jo(t.g),t.b=jo(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===SL?_w:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Go(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function jo(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}var uw=[.64,.33,.3,.6,.15,.06],dw=[.2126,.7152,.0722],fw=[.3127,.329],hw=new ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pw=new ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);en.define({[yw]:{primaries:uw,whitePoint:fw,transfer:_w,toXYZ:hw,fromXYZ:pw,luminanceCoefficients:dw,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:uw,whitePoint:fw,transfer:ng,toXYZ:hw,fromXYZ:pw,luminanceCoefficients:dw,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}});var Du=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,o,s,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],h=o[s+0],f=o[s+1],m=o[s+2],_=o[s+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=f,e[n+2]=m,e[n+3]=_;return}if(d!==_||l!==h||c!==f||u!==m){let T=1-a,I=l*h+c*f+u*m+d*_,B=I>=0?1:-1,Y=1-I*I;if(Y>Number.EPSILON){let L=Math.sqrt(Y),A=Math.atan2(L,I*B);T=Math.sin(T*A)/L,a=Math.sin(a*A)/L}let k=a*B;if(l=l*T+h*k,c=c*T+f*k,u=u*T+m*k,d=d*T+_*k,T===1-a){let L=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=L,c*=L,u*=L,d*=L}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,o,s){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=o[s],h=o[s+1],f=o[s+2],m=o[s+3];return e[n]=a*m+u*d+l*f-c*h,e[n+1]=l*m+u*h+c*d-a*f,e[n+2]=c*m+u*f+a*h-l*d,e[n+3]=u*m-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(o/2),h=l(i/2),f=l(r/2),m=l(o/2);switch(s){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],o=n[8],s=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],h=i+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(o-c)*f,this._z=(s-r)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(o+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(o-c)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(s-r)/f,this._x=(o+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ai(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,o=e._z,s=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+s*a+r*c-o*l,this._y=r*u+s*l+o*a-i*c,this._z=o*u+s*c+i*l-r*a,this._w=s*u-i*a-r*l-o*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-n;return this._w=f*s+n*this._w,this._x=f*i+n*this._x,this._y=f*r+n*this._y,this._z=f*o+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=s*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(n),o*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},St=class t{constructor(e=0,n=0,i=0){t.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(mw.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(mw.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[3]*i+o[6]*r,this.y=o[1]*n+o[4]*i+o[7]*r,this.z=o[2]*n+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*n+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*n+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*n+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*n+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*r-a*i),u=2*(a*n-o*r),d=2*(o*i-s*n);return this.x=n+l*c+s*d-a*u,this.y=i+l*u+a*c-o*d,this.z=r+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r,this.y=o[1]*n+o[5]*i+o[9]*r,this.z=o[2]*n+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,o=e.z,s=n.x,a=n.y,l=n.z;return this.x=r*l-o*a,this.y=o*s-i*l,this.z=i*a-r*s,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Qm.copy(this).projectOnVector(e),this.sub(Qm)}reflect(e){return this.sub(Qm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Ai(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qm=new St,mw=new Du;var xw={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Cu={h:0,s:0,l:0};function eg(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}var Ye=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,en.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=en.workingColorSpace){return this.r=e,this.g=n,this.b=i,en.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=en.workingColorSpace){if(e=wL(e,1),n=Ai(n,0,1),i=Ai(i,0,1),n===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+n):i+n-i*n,s=2*i-o;this.r=eg(s,o,e+1/3),this.g=eg(s,o,e),this.b=eg(s,o,e-1/3)}return en.toWorkingColorSpace(this,r),this}setStyle(e,n=xn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,n);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,n);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(o,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xn){let i=xw[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Go(e.r),this.g=Go(e.g),this.b=Go(e.b),this}copyLinearToSRGB(e){return this.r=jo(e.r),this.g=jo(e.g),this.b=jo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return en.fromWorkingColorSpace(gt.copy(this),e),Math.round(Ai(gt.r*255,0,255))*65536+Math.round(Ai(gt.g*255,0,255))*256+Math.round(Ai(gt.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=en.workingColorSpace){en.fromWorkingColorSpace(gt.copy(this),n);let i=gt.r,r=gt.g,o=gt.b,s=Math.max(i,r,o),a=Math.min(i,r,o),l,c,u=(a+s)/2;if(a===s)l=0,c=0;else{let d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case i:l=(r-o)/d+(r<o?6:0);break;case r:l=(o-i)/d+2;break;case o:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=en.workingColorSpace){return en.fromWorkingColorSpace(gt.copy(this),n),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=xn){en.fromWorkingColorSpace(gt.copy(this),e);let n=gt.r,i=gt.g,r=gt.b;return e!==xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+n,Di.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Di),e.getHSL(Cu);let i=Km(Di.h,Cu.h,n),r=Km(Di.s,Cu.s,n),o=Km(Di.l,Cu.l,n);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*n+o[3]*i+o[6]*r,this.g=o[1]*n+o[4]*i+o[7]*r,this.b=o[2]*n+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gt=new Ye;Ye.NAMES=xw;function ML(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Lt(t){let e={};for(let n=0;n<t.length;n++){let i=ML(t[n]);for(let r in i)e[r]=i[r]}return e}var EL=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,CL=`#ifdef USE_ALPHAHASH
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
#endif`,TL=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,IL=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,DL=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,AL=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RL=`#ifdef USE_AOMAP
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
#endif`,NL=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PL=`#ifdef USE_BATCHING
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
#endif`,LL=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,OL=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FL=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kL=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,UL=`#ifdef USE_IRIDESCENCE
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
#endif`,VL=`#ifdef USE_BUMPMAP
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
#endif`,BL=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GL=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jL=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,WL=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$L=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qL=`#if defined( USE_COLOR_ALPHA )
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
#endif`,XL=`#define PI 3.141592653589793
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
} // validated`,YL=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ZL=`vec3 transformedNormal = objectNormal;
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
#endif`,KL=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JL=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QL=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eO=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tO="gl_FragColor = linearToOutputTexel( gl_FragColor );",nO=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iO=`#ifdef USE_ENVMAP
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
#endif`,rO=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,oO=`#ifdef USE_ENVMAP
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
#endif`,sO=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,aO=`#ifdef USE_ENVMAP
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
#endif`,lO=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cO=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uO=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dO=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fO=`#ifdef USE_GRADIENTMAP
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
}`,hO=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pO=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mO=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gO=`uniform bool receiveShadow;
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
#endif`,vO=`#ifdef USE_ENVMAP
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
#endif`,yO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_O=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xO=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bO=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SO=`PhysicalMaterial material;
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
#endif`,wO=`struct PhysicalMaterial {
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
}`,MO=`
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
#endif`,EO=`#if defined( RE_IndirectDiffuse )
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
#endif`,CO=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TO=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,IO=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DO=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,AO=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,RO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,NO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,PO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,LO=`#if defined( USE_POINTS_UV )
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
#endif`,OO=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,FO=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kO=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,UO=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,VO=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,BO=`#ifdef USE_MORPHTARGETS
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
#endif`,zO=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HO=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,GO=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$O=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qO=`#ifdef USE_NORMALMAP
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
#endif`,XO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,YO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ZO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,KO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,JO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QO=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,e2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,t2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,i2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,s2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,a2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,c2=`float getShadowMask() {
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
}`,u2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d2=`#ifdef USE_SKINNING
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
#endif`,f2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,h2=`#ifdef USE_SKINNING
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
#endif`,p2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,m2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,g2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,y2=`#ifdef USE_TRANSMISSION
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
#endif`,_2=`#ifdef USE_TRANSMISSION
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
#endif`,x2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,M2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E2=`uniform sampler2D t2D;
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
}`,C2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,I2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A2=`#include <common>
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
}`,R2=`#if DEPTH_PACKING == 3200
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
}`,N2=`#define DISTANCE
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
}`,P2=`#define DISTANCE
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
}`,L2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,O2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F2=`uniform float scale;
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
}`,k2=`uniform vec3 diffuse;
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
}`,U2=`#include <common>
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
}`,V2=`uniform vec3 diffuse;
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
}`,B2=`#define LAMBERT
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
}`,z2=`#define LAMBERT
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
}`,H2=`#define MATCAP
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
}`,G2=`#define MATCAP
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
}`,j2=`#define NORMAL
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
}`,W2=`#define NORMAL
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
}`,$2=`#define PHONG
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
}`,q2=`#define PHONG
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
}`,X2=`#define STANDARD
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
}`,Y2=`#define STANDARD
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
}`,Z2=`#define TOON
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
}`,K2=`#define TOON
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
}`,J2=`uniform float size;
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
}`,Q2=`uniform vec3 diffuse;
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
}`,eF=`#include <common>
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
}`,tF=`uniform vec3 color;
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
}`,nF=`uniform float rotation;
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
}`,iF=`uniform vec3 diffuse;
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
}`,me={alphahash_fragment:EL,alphahash_pars_fragment:CL,alphamap_fragment:TL,alphamap_pars_fragment:IL,alphatest_fragment:DL,alphatest_pars_fragment:AL,aomap_fragment:RL,aomap_pars_fragment:NL,batching_pars_vertex:PL,batching_vertex:LL,begin_vertex:OL,beginnormal_vertex:FL,bsdfs:kL,iridescence_fragment:UL,bumpmap_pars_fragment:VL,clipping_planes_fragment:BL,clipping_planes_pars_fragment:zL,clipping_planes_pars_vertex:HL,clipping_planes_vertex:GL,color_fragment:jL,color_pars_fragment:WL,color_pars_vertex:$L,color_vertex:qL,common:XL,cube_uv_reflection_fragment:YL,defaultnormal_vertex:ZL,displacementmap_pars_vertex:KL,displacementmap_vertex:JL,emissivemap_fragment:QL,emissivemap_pars_fragment:eO,colorspace_fragment:tO,colorspace_pars_fragment:nO,envmap_fragment:iO,envmap_common_pars_fragment:rO,envmap_pars_fragment:oO,envmap_pars_vertex:sO,envmap_physical_pars_fragment:vO,envmap_vertex:aO,fog_vertex:lO,fog_pars_vertex:cO,fog_fragment:uO,fog_pars_fragment:dO,gradientmap_pars_fragment:fO,lightmap_pars_fragment:hO,lights_lambert_fragment:pO,lights_lambert_pars_fragment:mO,lights_pars_begin:gO,lights_toon_fragment:yO,lights_toon_pars_fragment:_O,lights_phong_fragment:xO,lights_phong_pars_fragment:bO,lights_physical_fragment:SO,lights_physical_pars_fragment:wO,lights_fragment_begin:MO,lights_fragment_maps:EO,lights_fragment_end:CO,logdepthbuf_fragment:TO,logdepthbuf_pars_fragment:IO,logdepthbuf_pars_vertex:DO,logdepthbuf_vertex:AO,map_fragment:RO,map_pars_fragment:NO,map_particle_fragment:PO,map_particle_pars_fragment:LO,metalnessmap_fragment:OO,metalnessmap_pars_fragment:FO,morphinstance_vertex:kO,morphcolor_vertex:UO,morphnormal_vertex:VO,morphtarget_pars_vertex:BO,morphtarget_vertex:zO,normal_fragment_begin:HO,normal_fragment_maps:GO,normal_pars_fragment:jO,normal_pars_vertex:WO,normal_vertex:$O,normalmap_pars_fragment:qO,clearcoat_normal_fragment_begin:XO,clearcoat_normal_fragment_maps:YO,clearcoat_pars_fragment:ZO,iridescence_pars_fragment:KO,opaque_fragment:JO,packing:QO,premultiplied_alpha_fragment:e2,project_vertex:t2,dithering_fragment:n2,dithering_pars_fragment:i2,roughnessmap_fragment:r2,roughnessmap_pars_fragment:o2,shadowmap_pars_fragment:s2,shadowmap_pars_vertex:a2,shadowmap_vertex:l2,shadowmask_pars_fragment:c2,skinbase_vertex:u2,skinning_pars_vertex:d2,skinning_vertex:f2,skinnormal_vertex:h2,specularmap_fragment:p2,specularmap_pars_fragment:m2,tonemapping_fragment:g2,tonemapping_pars_fragment:v2,transmission_fragment:y2,transmission_pars_fragment:_2,uv_pars_fragment:x2,uv_pars_vertex:b2,uv_vertex:S2,worldpos_vertex:w2,background_vert:M2,background_frag:E2,backgroundCube_vert:C2,backgroundCube_frag:T2,cube_vert:I2,cube_frag:D2,depth_vert:A2,depth_frag:R2,distanceRGBA_vert:N2,distanceRGBA_frag:P2,equirect_vert:L2,equirect_frag:O2,linedashed_vert:F2,linedashed_frag:k2,meshbasic_vert:U2,meshbasic_frag:V2,meshlambert_vert:B2,meshlambert_frag:z2,meshmatcap_vert:H2,meshmatcap_frag:G2,meshnormal_vert:j2,meshnormal_frag:W2,meshphong_vert:$2,meshphong_frag:q2,meshphysical_vert:X2,meshphysical_frag:Y2,meshtoon_vert:Z2,meshtoon_frag:K2,points_vert:J2,points_frag:Q2,shadow_vert:eF,shadow_frag:tF,sprite_vert:nF,sprite_frag:iF},V={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ye}},envmap:{envMap:{value:null},envMapRotation:{value:new ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ye},normalScale:{value:new Cr(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0},uvTransform:{value:new ye}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Cr(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}}},gw={basic:{uniforms:Lt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Lt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new Ye(0)}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Lt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Lt([V.common,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.roughnessmap,V.metalnessmap,V.fog,V.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Lt([V.common,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.gradientmap,V.fog,V.lights,{emissive:{value:new Ye(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Lt([V.common,V.bumpmap,V.normalmap,V.displacementmap,V.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Lt([V.points,V.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Lt([V.common,V.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Lt([V.common,V.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Lt([V.common,V.bumpmap,V.normalmap,V.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Lt([V.sprite,V.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ye}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distanceRGBA:{uniforms:Lt([V.common,V.displacementmap,{referencePosition:{value:new St},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distanceRGBA_vert,fragmentShader:me.distanceRGBA_frag},shadow:{uniforms:Lt([V.lights,V.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};gw.physical={uniforms:Lt([gw.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ye},clearcoatNormalScale:{value:new Cr(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ye},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ye},transmissionSamplerSize:{value:new Cr},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ye},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ye},anisotropyVector:{value:new Cr},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ye}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};var Er=(1+Math.sqrt(5))/2,Ho=1/Er,v9=[new St(-Er,Ho,0),new St(Er,Ho,0),new St(-Ho,0,Er),new St(Ho,0,Er),new St(0,Er,-Ho),new St(0,Er,Ho),new St(-1,1,-1),new St(1,1,-1),new St(-1,1,1),new St(1,1,1)];var y9=new Float32Array(16),_9=new Float32Array(9),x9=new Float32Array(4);var b9={[QS]:ew,[tw]:ow,[iw]:sw,[nw]:rw,[ew]:QS,[ow]:tw,[sw]:iw,[rw]:nw};function Tu(t,e,n){return!t||!n&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function rF(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}var Wo=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],o=n[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<o)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=n[++i],e<r)break t}s=n.length;break n}if(!(e>=o)){let a=n[1];e<a&&(i=2,o=a);for(let l=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=o,o=n[--i-1],e>=o)break t}s=i,i=0;break n}break e}for(;i<s;){let a=i+s>>>1;e<n[a]?s=a:i=a+1}if(r=n[i],o=n[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)n[s]=i[o+s];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ig=class extends Wo{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:aw,endingEnd:aw}}intervalChanged_(e,n,i){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],l=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case lw:o=e,a=2*n-i;break;case cw:o=r.length-2,a=n+r[o]-r[o+1];break;default:o=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case lw:s=e,l=2*i-n;break;case cw:s=1,l=i+r[1]-r[0];break;default:s=e-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-a),this._weightNext=c/(l-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(i-n)/(r-n),_=m*m,T=_*m,I=-h*T+2*h*_-h*m,B=(1+h)*T+(-1.5-2*h)*_+(-.5+h)*m+1,Y=(-1-f)*T+(1.5+f)*_+.5*m,k=f*T-f*_;for(let L=0;L!==a;++L)o[L]=I*s[u+L]+B*s[c+L]+Y*s[l+L]+k*s[d+L];return o}},rg=class extends Wo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-n)/(r-n),d=1-u;for(let h=0;h!==a;++h)o[h]=s[c+h]*d+s[l+h]*u;return o}},og=class extends Wo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bn=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Tu(n,this.TimeBufferType),this.values=Tu(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:Tu(e.times,Array),values:Tu(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new og(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ig(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case Iu:n=this.InterpolantFactoryMethodDiscrete;break;case tg:n=this.InterpolantFactoryMethodLinear;break;case Zm:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Iu;case this.InterpolantFactoryMethodLinear:return tg;case this.InterpolantFactoryMethodSmooth:return Zm}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<e;)++o;for(;s!==-1&&i[s]>n;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),e=!1;break}s=l}if(r!==void 0&&rF(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Zm,o=e.length-1,s=1;for(let a=1;a<o;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,h=d-i,f=d+i;for(let m=0;m!==i;++m){let _=n[d+m];if(_!==n[h+m]||_!==n[f+m]){l=!0;break}}}if(l){if(a!==s){e[s]=e[a];let d=a*i,h=s*i;for(let f=0;f!==i;++f)n[h+f]=n[d+f]}++s}}if(o>0){e[s]=e[o];for(let a=o*i,l=s*i,c=0;c!==i;++c)n[l+c]=n[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=n.slice(0,s*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=tg;var Tr=class extends bn{constructor(e,n,i){super(e,n,i)}};Tr.prototype.ValueTypeName="bool";Tr.prototype.ValueBufferType=Array;Tr.prototype.DefaultInterpolation=Iu;Tr.prototype.InterpolantFactoryMethodLinear=void 0;Tr.prototype.InterpolantFactoryMethodSmooth=void 0;var sg=class extends bn{};sg.prototype.ValueTypeName="color";var ag=class extends bn{};ag.prototype.ValueTypeName="number";var lg=class extends Wo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(i-n)/(r-n),c=e*a;for(let u=c+a;c!==u;c+=4)Du.slerpFlat(o,0,s,c-a,s,c,l);return o}},Au=class extends bn{InterpolantFactoryMethodLinear(e){return new lg(this.times,this.values,this.getValueSize(),e)}};Au.prototype.ValueTypeName="quaternion";Au.prototype.InterpolantFactoryMethodSmooth=void 0;var Ir=class extends bn{constructor(e,n,i){super(e,n,i)}};Ir.prototype.ValueTypeName="string";Ir.prototype.ValueBufferType=Array;Ir.prototype.DefaultInterpolation=Iu;Ir.prototype.InterpolantFactoryMethodLinear=void 0;Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var cg=class extends bn{};cg.prototype.ValueTypeName="vector";var dg="\\[\\]\\.:\\/",oF=new RegExp("["+dg+"]","g"),fg="[^"+dg+"]",sF="[^"+dg.replace("\\.","")+"]",aF=/((?:WC+[\/:])*)/.source.replace("WC",fg),lF=/(WCOD+)?/.source.replace("WCOD",sF),cF=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fg),uF=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fg),dF=new RegExp("^"+aF+lF+cF+uF+"$"),fF=["material","materials","bones","map"],ug=class{constructor(e,n,i){let r=i||$e.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},$e=(()=>{class t{constructor(n,i,r){this.path=i,this.parsedPath=r||t.parseTrackName(i),this.node=t.findNode(n,this.parsedPath.nodeName),this.rootNode=n,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(n,i,r){return n&&n.isAnimationObjectGroup?new t.Composite(n,i,r):new t(n,i,r)}static sanitizeNodeName(n){return n.replace(/\s/g,"_").replace(oF,"")}static parseTrackName(n){let i=dF.exec(n);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+n);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},o=r.nodeName&&r.nodeName.lastIndexOf(".");if(o!==void 0&&o!==-1){let s=r.nodeName.substring(o+1);fF.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,o),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+n);return r}static findNode(n,i){if(i===void 0||i===""||i==="."||i===-1||i===n.name||i===n.uuid)return n;if(n.skeleton){let r=n.skeleton.getBoneByName(i);if(r!==void 0)return r}if(n.children){let r=function(s){for(let a=0;a<s.length;a++){let l=s[a];if(l.name===i||l.uuid===i)return l;let c=r(l.children);if(c)return c}return null},o=r(n.children);if(o)return o}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(n,i){n[i]=this.targetObject[this.propertyName]}_getValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)n[i++]=r[o]}_getValue_arrayElement(n,i){n[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(n,i){this.resolvedProperty.toArray(n,i)}_setValue_direct(n,i){this.targetObject[this.propertyName]=n[i]}_setValue_direct_setNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(n,i){this.targetObject[this.propertyName]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++]}_setValue_array_setNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(n,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=n[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(n,i){this.resolvedProperty[this.propertyIndex]=n[i]}_setValue_arrayElement_setNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty[this.propertyIndex]=n[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(n,i){this.resolvedProperty.fromArray(n,i)}_setValue_fromArray_setNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(n,i){this.resolvedProperty.fromArray(n,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(n,i){this.bind(),this.getValue(n,i)}_setValue_unbound(n,i){this.bind(),this.setValue(n,i)}bind(){let n=this.node,i=this.parsedPath,r=i.objectName,o=i.propertyName,s=i.propertyIndex;if(n||(n=t.findNode(this.rootNode,i.nodeName),this.node=n),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!n){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}n=n.material.materials;break;case"bones":if(!n.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}n=n.skeleton.bones;for(let d=0;d<n.length;d++)if(n[d].name===u){u=d;break}break;case"map":if("map"in n){n=n.map;break}if(!n.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!n.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}n=n.material.map;break;default:if(n[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}n=n[r]}if(u!==void 0){if(n[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,n);return}n=n[u]}}let a=n[o];if(a===void 0){let u=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+o+" but it wasn't found.",n);return}let l=this.Versioning.None;this.targetObject=n,n.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:n.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(o==="morphTargetInfluences"){if(!n.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!n.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}n.morphTargetDictionary[s]!==void 0&&(s=n.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=o;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return t.Composite=ug,t})();$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S9=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vw}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vw);var Ru=4,V9=.34*Ru,B9=.46*Ru,z9=.48*Ru,H9=.42*Ru;var G9=new Ye,j9=new Ye,Ia=["ring","grid","line","arc","arcAlt"],hg="pixels",Nu=[hg,...Ia],pg=.25,mg=2.5,bw=.05,Pu=1;function gg(t){return Math.min(mg,Math.max(pg,t))}var vg=.05,yg=2.5,Sw=.05,ww=1;function Mw(t){return Math.min(yg,Math.max(vg,t))}var Cw=0,Ew=0,Ot=null;function Ri(){return Su.map(t=>new Array(t).fill(0))}function Sn(t,e){Ot={stamp:++Cw,mode:t,activations:e.map(n=>[...n])},_g()&&p.net3d&&p.net&&p.net3d.setWeights(p.net.weights)}function _g(){return!p.net3d||!Ot||Ot.stamp===Ew?!1:(p.net3d.setIdleDim(Ot.mode==="idle"),Ot.mode!=="infer"&&p.net3d.setInferResult(null,null),p.net3d.setEdgeFocus(Ot.mode==="infer"?"infer":Ot.mode==="train"?"trainRecent":"off",Ot.mode==="infer"?Ot.activations:null),p.net3d.setActivations(Ot.activations),Ew=Ot.stamp,!0)}function Tw(t){return Ia.includes(t)?t:null}function Iw(t){return Nu.includes(t)?t:null}function $o(){p.net3d&&(Ot?(Ot=M(y({},Ot),{stamp:++Cw}),_g(),p.net&&p.net3d.setWeights(p.net.weights)):Sn("idle",Ri()),p.renderDisplayBound())}function Dw(){_g()&&p.net3d&&p.net&&p.net3d.setWeights(p.net.weights)}function pF(t,e){if(t.length!==e.length)return"";let n=[];for(let i=0;i<e.length;i++){let r=e[i],o=t[i];if(!r||!o||r.length!==o.length)continue;let s=0;for(let a=0;a<r.length;a++)s=Math.max(s,Math.abs(r[a]-o[a]));n.push(`${i}:${s.toExponential(2)}`)}return n.length?`  \u0394max ${n.join(" ")}`:""}function Lu(){p.liveCanvasInferRaf!==null&&(cancelAnimationFrame(p.liveCanvasInferRaf),p.liveCanvasInferRaf=null)}function Da(){if(Lu(),!p.net||!p.net3d)return;p.liveInferLastRun=performance.now();let t=Ou();Dr(t,void 0,void 0,{live:!0})}function Aa(){if(p.liveCanvasInferRaf!==null)return;let t=()=>{if(p.liveCanvasInferRaf=null,!p.net||!p.net3d)return;let e=performance.now();if(e-p.liveInferLastRun<HS){p.liveCanvasInferRaf=requestAnimationFrame(t);return}p.liveInferLastRun=e;let n=Ou();Dr(n,void 0,void 0,{live:!0})};p.liveCanvasInferRaf=requestAnimationFrame(t)}function Ou(){let t=p.surfaceDrawCanvas.width,e=p.surfaceDrawCanvas.height,i=p.ctx2d.getImageData(0,0,t,e).data;if(t===bt&&e===bt){let k=new Array(784),L=0;for(let A=0;A<bt;A++)for(let fe=0;fe<bt;fe++){let Te=(A*t+fe)*4;k[L++]=(i[Te]+i[Te+1]+i[Te+2])/3/255}return k}let r=t,o=e,s=-1,a=-1,l=20;for(let k=0;k<e;k++)for(let L=0;L<t;L++){let A=(k*t+L)*4;(i[A]+i[A+1]+i[A+2])/3>l&&(L<r&&(r=L),k<o&&(o=k),L>s&&(s=L),k>a&&(a=k))}if(s<r||a<o)return new Array(784).fill(0);let c=s-r+1,u=a-o+1,d=Math.max(c,u),h=Math.max(2,Math.floor(d*.2)),f=(r+s)*.5,m=(o+a)*.5,_=d+h*2,T=f-_*.5,I=m-_*.5,B=new Array(784),Y=0;for(let k=0;k<28;k++)for(let L=0;L<28;L++){let A=T+L/28*_,fe=I+k/28*_,Te=T+(L+1)/28*_,Qe=I+(k+1)/28*_,rn=Math.max(0,Math.floor(A)),Pi=Math.max(0,Math.floor(fe)),Mt=Math.min(t,Math.ceil(Te)),_e=Math.min(e,Math.ceil(Qe)),ut=0,wn=0;for(let Zo=Pi;Zo<_e;Zo++)for(let Ko=rn;Ko<Mt;Ko++){let Jo=(Zo*t+Ko)*4;ut+=(i[Jo]+i[Jo+1]+i[Jo+2])/3,wn++}B[Y++]=wn>0?ut/wn/255:0}return B}function mF(t){t.length===Rm&&(Lu(),Gn(),xu(p.surfaceDrawCanvas,t))}function Dr(t,e,n,i){if(!p.net||!p.net3d)return;let r=i?.live===!0;try{r||(p.inferCounter+=1);let o=ya(t),s=p.net.forward(o),a=p.net.predictClass(s.prob),l=s.prob.some(m=>!Number.isFinite(m[0])),c=pu(o,s),u="";Lm&&p.lastInferActsDebug&&(u=pF(p.lastInferActsDebug,c)),Lm&&(p.lastInferActsDebug=c.map(m=>[...m])),p.net3d.setInferResult(a,e??null),Sn("infer",c),n!==void 0&&mF(t),r||p.renderDisplayBound();let d=s.prob.map((m,_)=>({digit:_,p:m[0]})),h=d.map(m=>m.p.toFixed(4)).join(" "),f=[...d].sort((m,_)=>_.p-m.p).slice(0,3).map(m=>`${m.digit}:${(m.p*100).toFixed(2)}%`).join(" ");if(e!==void 0)if(l)Le(`Infer #${hi(p.inferCounter,4)}: ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`);else{let m=n===void 0?"":` idx=${hi(n,5)} `;Le(`Infer #${hi(p.inferCounter,4)}:${m}wahr=${e} pred=${a}  softmax ${h}  top ${f}${u}`)}else l?Le(r?"Canvas (live): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren":`Infer #${hi(p.inferCounter,4)} (Canvas): ung\xFCltige Modellwerte erkannt (NaN/Inf), bitte neu trainieren`):Le(r?`Canvas (live): pred=${a}  softmax ${h}  top ${f}${u}`:`Infer #${hi(p.inferCounter,4)} (Canvas): pred=${a}  softmax ${h}  top ${f}${u}`)}catch(o){Le(`Infer-Fehler: ${String(o)}`)}}function Aw(){return X(this,null,function*(){let t=[US],e=[VS];try{Le(`${wr}: Train-CSV wird geladen \u2026`);let n="",i=[];for(let r of t)try{let o=yield Dm(r),s=yield Am(o);if(s.length===0){n="Train-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Train-CSV konnte nicht geladen werden");Ca(i,_n()),Le(`${wr}: Train geladen (${jn().length} Zeilen)`)}catch(n){Le(`${wr}: Fehler Train-CSV: ${n}`),Ca([],_n())}try{Le(`${wr}: Test-CSV wird geladen \u2026`);let n="",i=[];for(let r of e)try{let o=yield Dm(r),s=yield Am(o);if(s.length===0){n="Test-CSV enth\xE4lt keine g\xFCltigen Zeilen";continue}i=s;break}catch(o){n=String(o)}if(i.length===0)throw new Error(n||"Test-CSV konnte nicht geladen werden");Ca(jn(),i),Le(`${wr}: Train ${jn().length} | Test ${i.length} geladen`)}catch(n){Le(`${wr}: Fehler Test-CSV: ${n}`),Ca(jn(),[])}p.lastInferSampleIndex=-1,fi()})}var gF="neuronal3d:models:v3";function Rw(t){return t.version===1&&t.inputDim===mu&&t.outputDim===gu&&t.hidden.length===_r.length&&t.hidden.every((e,n)=>e===_r[n])}function Nw(){try{localStorage.removeItem(gF)}catch{}}function Ra(t){return{version:1,inputDim:t.inputDim,hidden:[...t.hidden],outputDim:t.outputDim,weights:t.weights.map(e=>e.map(n=>[...n])),biases:t.biases.map(e=>e.map(n=>[...n]))}}function Fu(t){let e=new ui(t.inputDim,t.hidden,t.outputDim);return e.weights=t.weights.map(n=>n.map(i=>[...i])),e.biases=t.biases.map(n=>n.map(i=>[...i])),e}function xg(t){let e=p.nLatest.modelCollection.models.find(r=>r.id===t);if(!e||!Rw(e.model))return!1;let n=1+e.model.hidden.length;if(e.model.weights.length!==n||e.model.biases.length!==n)return!1;p.net=Fu(e.model),p.lastInferActsDebug=null;let i=p.reconcileWorkspaceUrlForModelSelection?.(e.id)??null;return p.appStore.dispatch(w.activeModelIdSet({id:e.id,routeModelSegmentFromUrl:i})),Sn("idle",Ri()),fi(),!0}function Pw(t,e="Aktiv"){if(!t)return!1;if(!xg(t))return Le("Modell konnte nicht geladen werden."),!1;let n=p.nLatest.modelCollection.models.find(i=>i.id===t);return Le(`${e}: ${n?.name??t}`),!0}var Lw=new Set(["KeyW","KeyS","KeyA","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);function vF(t){return t instanceof HTMLElement&&t.closest("input, textarea, [contenteditable='true']")!==null}function ku(t,e){let n=t.getBoundingClientRect();return{pointerId:e.pointerId,pointerType:e.pointerType,clientX:e.clientX-n.left,clientY:e.clientY-n.top,buttons:e.buttons,button:e.button,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0,isPrimary:e.isPrimary,pressure:e.pressure}}function yF(t,e){let n=t.getBoundingClientRect();return{deltaX:e.deltaX,deltaY:e.deltaY,deltaZ:e.deltaZ,deltaMode:e.deltaMode,clientX:e.clientX-n.left,clientY:e.clientY-n.top,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}function _F(t,e){let n=t.getBoundingClientRect();return{clientX:e.clientX-n.left,clientY:e.clientY-n.top,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,bubbles:!0,cancelable:!0}}var bg=class{constructor(e){this.postToWorker=e}setWeights(e){this.postToWorker({type:"setWeights",weights:e})}setIdleDim(e){this.postToWorker({type:"setIdleDim",dim:e})}setInferResult(e,n){this.postToWorker({type:"setInferResult",predictedDigit:e,expectedDigit:n})}setEdgeFocus(e,n){this.postToWorker({type:"setEdgeFocus",mode:e,activations:n})}setActivations(e){this.postToWorker({type:"setActivations",activations:e})}setHiddenLayerLayout(e,n){this.postToWorker({type:"setHiddenLayerLayout",index:e,layout:n})}setHiddenLayerLayoutScale(e,n){this.postToWorker({type:"setHiddenLayerLayoutScale",index:e,scale:n})}setInputLayerLayout(e){this.postToWorker({type:"setInputLayerLayout",layout:e})}setInputLayerLayoutScale(e){this.postToWorker({type:"setInputLayerLayoutScale",scale:e})}setActiveNeuronMaxScaleMul(e){this.postToWorker({type:"setActiveNeuronMaxScaleMul",mul:e})}applyVizNetworkColors(e){this.postToWorker({type:"applyVizNetworkColors",colors:e})}dispose(){}},Uu=class{constructor(e){this.container=e;this.surfaceBridge=new bg(n=>this.postToWorker(n)),this.vizSurface=this.surfaceBridge}vizSurface;onWorkerSideMessage=e=>{e.data?.type==="vizWorkerFpsSample"&&this.fpsSampleListener?.(e.data.fps)};worker=null;canvas=null;resizeObserver=null;resizeObserverRaf=0;stopMainVizTick=null;detachCanvasListeners=null;surfaceBridge;latestPixelRatio=1;fpsSampleListener=null;postToWorker(e){this.worker?.postMessage(e)}measureDrawable(){let e=Math.max(1,Math.floor(this.container.clientWidth)),n=Math.max(1,Math.floor(this.container.clientHeight));return{width:e,height:n}}pushResize(){if(!this.worker||!this.canvas)return;let{width:e,height:n}=this.measureDrawable();this.latestPixelRatio=Math.min(window.devicePixelRatio,2),this.worker.postMessage({type:"resize",width:e,height:n,pixelRatio:this.latestPixelRatio})}startMainThreadVizTick(){let e=0,n=!1,i=()=>{n||(Dw(),e=window.requestAnimationFrame(i))};return e=window.requestAnimationFrame(i),()=>{n=!0,window.cancelAnimationFrame(e)}}start(){return X(this,null,function*(){let e=new Worker(new URL("worker-Q7G2QV56.js",import.meta.url),{type:"module",name:"neuronal-viz"});this.worker=e,e.addEventListener("message",this.onWorkerSideMessage),yield new Promise((A,fe)=>{let Te=window.setTimeout(()=>{fe(new Error("3D-Render-Worker: Timeout beim Start"))},2e4),Qe=rn=>{rn.data?.type==="vizWorkerReady"&&(window.clearTimeout(Te),e.removeEventListener("message",Qe),A())};e.addEventListener("message",Qe)});let n=document.createElement("canvas");this.canvas=n,n.style.display="block",n.style.width="100%",n.style.height="100%",this.container.appendChild(n);let{width:i,height:r}=this.measureDrawable();this.latestPixelRatio=Math.min(window.devicePixelRatio,2);let o=n.transferControlToOffscreen();yield new Promise((A,fe)=>{let Te=window.setTimeout(()=>{fe(new Error("3D-Render-Worker: Timeout WebGL-Init"))},2e4),Qe=rn=>{rn.data?.type==="vizWorkerGlReady"&&(window.clearTimeout(Te),e.removeEventListener("message",Qe),A())};e.addEventListener("message",Qe),e.postMessage({type:"init",canvas:o,width:i,height:r,pixelRatio:this.latestPixelRatio,layerSizes:Su},[o])}),this.resizeObserver=typeof ResizeObserver<"u"?new ResizeObserver(()=>{this.resizeObserverRaf!==0&&cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=requestAnimationFrame(()=>{this.resizeObserverRaf=0,this.pushResize()})}):null,this.resizeObserver?.observe(this.container),window.addEventListener("resize",this.onWindowResize);let s=A=>{this.postToWorker({type:"canvasPointer",eventType:"pointerdown",initDict:ku(n,A)})},a=A=>{this.postToWorker({type:"canvasPointer",eventType:"pointermove",initDict:ku(n,A)})},l=A=>{this.postToWorker({type:"canvasPointer",eventType:"pointerup",initDict:ku(n,A)})},c=A=>{this.postToWorker({type:"canvasPointer",eventType:"pointercancel",initDict:ku(n,A)})},u=A=>{A.preventDefault(),this.postToWorker({type:"canvasWheel",initDict:yF(n,A)})},d=A=>{A.preventDefault(),this.postToWorker({type:"canvasContextMenu",initDict:_F(n,A)})};n.addEventListener("pointerdown",s),n.addEventListener("pointermove",a),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",c),n.addEventListener("wheel",u,{passive:!1}),n.addEventListener("contextmenu",d);let h=A=>{!Lw.has(A.code)||vF(A.target)||(A.preventDefault(),this.postToWorker({type:"navKeyDown",code:A.code}))},f=A=>{Lw.has(A.code)&&(A.preventDefault(),this.postToWorker({type:"navKeyUp",code:A.code}))},m=()=>{this.postToWorker({type:"navKeysClear"})},_=()=>{this.postToWorker({type:"documentVisibilityHidden",hidden:document.hidden})};return window.addEventListener("keydown",h),window.addEventListener("keyup",f),window.addEventListener("blur",m),window.addEventListener("focus",m),window.addEventListener("pagehide",m),document.addEventListener("visibilitychange",_),this.stopMainVizTick=this.startMainThreadVizTick(),this.detachCanvasListeners=()=>{n.removeEventListener("pointerdown",s),n.removeEventListener("pointermove",a),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",c),n.removeEventListener("wheel",u),n.removeEventListener("contextmenu",d),window.removeEventListener("keydown",h),window.removeEventListener("keyup",f),window.removeEventListener("blur",m),window.removeEventListener("focus",m),window.removeEventListener("pagehide",m),document.removeEventListener("visibilitychange",_)},{render:()=>{},renderDisplay:()=>{},setVibeCameraMode:A=>{this.postToWorker({type:"setVibeCameraMode",enabled:A})},applyVizSceneColors:A=>{this.postToWorker({type:"applyVizSceneColors",colors:A})},applyVizLightColors:A=>{this.postToWorker({type:"applyVizLightColors",colors:A})},applyVizPostProcess:A=>{this.postToWorker({type:"applyVizPostProcess",settings:A})}}})}setFpsReporting(e,n){this.fpsSampleListener=e&&n?n:null,this.postToWorker({type:"setFpsOverlayEnabled",enabled:e})}onWindowResize=()=>{this.pushResize()};stopMainVizTickOnly(){this.stopMainVizTick?.(),this.stopMainVizTick=null}destroy(){this.setFpsReporting(!1,null),this.stopMainVizTickOnly(),window.removeEventListener("resize",this.onWindowResize),this.resizeObserverRaf!==0&&(cancelAnimationFrame(this.resizeObserverRaf),this.resizeObserverRaf=0),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.detachCanvasListeners?.(),this.detachCanvasListeners=null;let e=this.worker;this.worker=null,e?.removeEventListener("message",this.onWorkerSideMessage),e&&new Promise(i=>{let r=o=>{o.data?.type==="vizWorkerDisposed"&&(e.removeEventListener("message",r),i())};e.addEventListener("message",r),e.postMessage({type:"dispose"}),window.setTimeout(()=>i(),800)}).then(()=>e.terminate()),this.canvas?.remove(),this.canvas=null}};function Ow(){p.renderDisplayBound()}function Sg(t,e,n,i){return X(this,null,function*(){p.appStore=t,p.reconcileWorkspaceUrlForModelSelection=i,p.surfaceVizMount=e.vizMount,p.surfaceDrawCanvas=e.inferDrawCanvas;let r=p.appStore.select(Hn).subscribe(R=>{p.nLatest=R}),o=()=>{if(p.nLatest.training.running)return;let R=vu();p.net=Fu(R.model),p.lastInferActsDebug=null,p.appStore.dispatch(w.lastTrainMetricsReset()),zo(R),qm(R.id),Sn("idle",Ri()),Le(`Neues Modell: ${R.name}`),fi()},s=R=>{p.nLatest.training.running||R&&Pw(R,"Aktives Modell")};YS(!1),p.surfaceDrawCanvas.width=bt,p.surfaceDrawCanvas.height=bt;let a=p.surfaceDrawCanvas.getContext("2d");if(!a)throw new Error("canvas");p.ctx2d=a,Gn(),p.ctx2d.fillStyle="#000000",p.ctx2d.fillRect(0,0,p.surfaceDrawCanvas.width,p.surfaceDrawCanvas.height);let l=null;l=new Uu(p.surfaceVizMount);let{render:c,renderDisplay:u,setVibeCameraMode:d,applyVizSceneColors:h,applyVizLightColors:f,applyVizPostProcess:m}=yield l.start();h(p.nLatest.viz3d.sceneColors),f(p.nLatest.viz3d.lightColors),m(p.nLatest.viz3d.postProcess);let _=y({},p.nLatest.viz3d.sceneColors),T=y({},p.nLatest.viz3d.lightColors),I=y({},p.nLatest.viz3d.networkColors),B=y({},p.nLatest.viz3d.postProcess),Y=0,k={},L=0,A={},fe=()=>{if(Object.keys(k).length===0)return;let R=y({},_);Object.keys(k).forEach(H=>{let Q=k[H];Q!==void 0&&yn(Q)&&(R[H]=Q)}),k={},h(R)},Te=()=>{if(Object.keys(A).length===0)return;let R=y({},T);Object.keys(A).forEach(H=>{let Q=A[H];Q!==void 0&&yn(Q)&&(R[H]=Q)}),A={},f(R)},Qe=()=>{Y!==0&&(cancelAnimationFrame(Y),Y=0),k={},L!==0&&(cancelAnimationFrame(L),L=0),A={}},rn=(R,H)=>{yn(H)&&(k=M(y({},k),{[R]:H}),Y===0&&(Y=requestAnimationFrame(()=>{Y=0,fe()})))},Pi=(R,H)=>{yn(H)&&(A=M(y({},A),{[R]:H}),L===0&&(L=requestAnimationFrame(()=>{L=0,Te()})))};p.renderSceneBound=c,p.renderDisplayBound=u,p.disposeSceneBound=()=>{l?.destroy(),l=null},d(!0);let Mt=l.vizSurface;p.net3d=Mt,Mt.applyVizNetworkColors(I),p.net&&Mt.setWeights(p.net.weights),p.stopAnimCleanup=()=>{l?.stopMainVizTickOnly()},n.connect({newModelFromToolbar:o,activeModelFromToolbar:s});let _e=R=>{if(R.button!==0&&R.button!==2)return;if(R.button===2&&R.preventDefault(),p.drawing=!0,p.surfaceDrawCanvas.setPointerCapture(R.pointerId),Bo()==="soft"){Gn(),p.drawSoftIsPen=R.button===0;let Q=Ma(R);p.drawSoftIsPen?Hm(Q.x,Q.y):Gm(Q.x,Q.y),p.drawLastSoftPoint=Q,p.drawLastCell=null,Aa();return}p.drawInk=R.button===2?"#000000":"#ffffff",p.drawBrushChebR=R.button===2?jS():Fm();let H=jm(Ma(R));p.drawLastCell=H,p.drawLastSoftPoint=null,Wm(H.gx,H.gy,p.drawBrushChebR,p.drawInk),Aa()},ut=R=>{if(!p.drawing)return;if(Bo()==="soft"){if(p.drawLastSoftPoint===null)return;let Q=Ma(R);WS(p.drawLastSoftPoint.x,p.drawLastSoftPoint.y,Q.x,Q.y,p.drawSoftIsPen),p.drawLastSoftPoint=Q,Aa();return}if(p.drawLastCell===null)return;let H=jm(Ma(R));qS(p.drawLastCell.gx,p.drawLastCell.gy,H.gx,H.gy,p.drawBrushChebR,p.drawInk),p.drawLastCell=H,Aa()},wn=()=>{p.drawing=!1,p.drawLastCell=null,p.drawLastSoftPoint=null,Gn(),Da()},Zo=()=>{p.drawing=!1,p.drawLastCell=null,p.drawLastSoftPoint=null,Gn(),Da()},Ko=()=>{p.drawing=!1,p.drawLastCell=null,p.drawLastSoftPoint=null,Gn(),Da()},Jo=(R,H)=>{let Q=Tw(H);!Q||!p.net3d||(p.net3d.setHiddenLayerLayout(R,Q),$o())},wM=(R,H)=>{!p.net3d||!Number.isFinite(H)||(p.net3d.setHiddenLayerLayoutScale(R,H),$o())},MM=R=>{let H=Iw(R);!H||!p.net3d||(p.net3d.setInputLayerLayout(H),$o())},EM=R=>{!p.net3d||!Number.isFinite(R)||(p.net3d.setInputLayerLayoutScale(R),$o())},CM=R=>{!p.net3d||!Number.isFinite(R)||(p.net3d.setActiveNeuronMaxScaleMul(R),$o())},TM=R=>{_=y({},R),h(_)},IM=R=>{T=y({},R),f(T)},DM=R=>{I=y({},R),p.net3d&&(p.net3d.applyVizNetworkColors(I),p.net&&p.net3d.setWeights(p.net.weights)),Ow()},AM=R=>{B=y({},R),m(B),Ow()},RM=()=>{Gn(),p.ctx2d.fillStyle="#000000",p.ctx2d.fillRect(0,0,p.surfaceDrawCanvas.width,p.surfaceDrawCanvas.height),Da()},NM=()=>{let R=_n();if(!p.net||R.length===0)return;let H=Math.floor(Math.random()*R.length);R.length>1&&H===p.lastInferSampleIndex&&(H=(H+1)%R.length),p.lastInferSampleIndex=H;let Q=R[H];Dr(Q.pixels,Q.label,H)},PM=R=>{ka();let H=jn();if(!p.net||H.length===0)return;let Q=Math.max(0,Math.min(H.length-1,Math.floor(R)));p.lastInferSampleIndex=Q;let kt=H[Q];Dr(kt.pixels,kt.label,Q)},Fa=null,rd=0,LM=2800,ka=()=>{Fa!==null&&(window.clearInterval(Fa),Fa=null)},$g=()=>{let R=_n();if(!p.net||R.length===0){ka();return}let H=rd%R.length,Q=R[H];p.lastInferSampleIndex=H,Dr(Q.pixels,Q.label,H),rd=(rd+1)%R.length},OM=R=>{if(ka(),!R)return!1;let H=_n();return!p.net||H.length===0?!1:($g(),Fa=window.setInterval($g,LM),!0)},FM=()=>{if(!p.net)return;let R=Ou();Dr(R)},kM=()=>{p.appStore.dispatch(w.trainingPauseToggled())},UM=()=>{p.appStore.dispatch(w.newModelFromToolbarRequested())},VM=()=>{if(!p.net)return;let R=(window.prompt("Name f\xFCr den neuen Modellstand:",Ym())??"").trim();if(!R)return;let H=p.net;X(null,null,function*(){let Q=new Date().toISOString(),kt=yield Om(H,_n());zo({id:crypto.randomUUID(),name:R,createdAt:Q,updatedAt:Q,model:Ra(H),metrics:{lastLoss:p.nLatest.lastTrainLoss,lastBatchAcc:p.nLatest.lastTrainBatchAcc,testAcc:kt?kt.accuracy:null,errorRate:kt?kt.errorRate:null,epochsTrained:0}}),Le(`Neuer Modellstand gespeichert: ${R}`)})},BM=()=>{if(p.nLatest.training.running)return;let R=p.nLatest.modelCollection.activeModelId;if(!R)return;let H=p.nLatest.modelCollection.models.find(kt=>kt.id===R);if(!H)return;let Q=new ui(784,Pm,10);p.net=Q,p.lastInferActsDebug=null,p.appStore.dispatch(w.lastTrainMetricsReset()),ZS(R),zo(M(y({},H),{updatedAt:new Date().toISOString(),model:Ra(Q),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}})),qm(R),Sn("idle",Ri()),Le(`Modell neu initialisiert: ${H.name}`),fi()},zM=()=>{X(null,null,function*(){yield new Promise(Ge=>{setTimeout(Ge,0)});let R=jn();if(R.length===0)return;let H=KS();if(!p.net){p.net=new ui(784,Pm,10);let Ge=new Date().toISOString();zo({id:crypto.randomUUID(),name:Ym(),createdAt:Ge,updatedAt:Ge,model:Ra(p.net),metrics:{lastLoss:0,lastBatchAcc:0,testAcc:null,errorRate:null,epochsTrained:0}}),fi()}p.lastInferActsDebug=null;let Q=p.nLatest.modelCollection.activeModelId;if(!Q)return;p.appStore.dispatch(w.lastTrainMetricsReset());let kt=Date.now(),Xg=new Date(kt).toISOString(),Yg=JS(Q,p.nLatest.epochByModelId);p.appStore.dispatch(w.trainingStarted({modelId:Q,run:Yg,runStartedAt:Xg,runStartedMs:kt})),yield new Promise(Ge=>{setTimeout(Ge,0)}),Sn("train",Ri());let Qo=yield PS(p.net,R,H,Ge=>{setTimeout(()=>{p.net&&Sn("train",Ge.activations),Le(`Ep ${hi(Ge.epoch+1,3)}  Batch ${hi(Ge.batchIndex,5)}  loss ${Ta(Ge.loss,8,4)}  acc ${Ta(Ge.trainAccBatch*100,6,1)}%`)},0)},Ge=>{let Ua=M(y({},Ge),{run:Yg,savedAt:new Date().toISOString(),runStartedAt:Xg,runElapsedMs:Date.now()-kt});p.appStore.dispatch(w.trainingEpochAppended({modelId:Q,row:Ua}))},()=>p.nLatest.training.pause,()=>p.nLatest.training.shouldStop);if(p.appStore.dispatch(w.trainingFinished(Qo)),p.net){let Ge=yield Om(p.net,_n()),Ua=p.nLatest.modelCollection.activeModelId,es=Ua?p.nLatest.modelCollection.models.find(HM=>HM.id===Ua):null;es&&zo(M(y({},es),{updatedAt:new Date().toISOString(),model:Ra(p.net),metrics:{lastLoss:Qo.lastTrainLoss,lastBatchAcc:Qo.lastTrainBatchAcc,testAcc:Ge?Ge.accuracy:es.metrics.testAcc,errorRate:Ge?Ge.errorRate:es.metrics.errorRate,epochsTrained:es.metrics.epochsTrained+H.epochs}}))}p.net&&Sn("idle",Ri());let od=p.nLatest.modelCollection.activeModelId?p.nLatest.modelCollection.models.find(Ge=>Ge.id===p.nLatest.modelCollection.activeModelId):null;Le(`Training beendet | aktiv: ${od?.name??"-"} | loss ${Ta(Qo.lastTrainLoss,8,4)} | batch-acc ${Ta(Qo.lastTrainBatchAcc*100,6,2)}% | err ${Xm(od?.metrics.errorRate??null)} | acc ${Xm(od?.metrics.testAcc??null)}`)})},qg=()=>{new di().saveCollection(p.nLatest.modelCollection),new br().saveEpochStore({version:1,byModelId:p.nLatest.epochByModelId}),p.appStore.dispatch(w.trainingStopRequested()),p.stopAnimCleanup?.(),p.net3d?.dispose(),p.disposeSceneBound?.()};window.addEventListener("beforeunload",qg),Le("MNIST wird geladen \u2026"),fi(),Aw();try{if(p.nLatest.modelStoreHydrated){let R=p.nLatest.modelCollection.activeModelId;if(R&&xg(R)){let H=p.nLatest.modelCollection.models.find(Q=>Q.id===R);Le(`Modell aus Browser-Speicher geladen: ${H?.name??R}`)}else p.nLatest.modelCollection.models.length>0&&Le(`${p.nLatest.modelCollection.models.length} Modellst\xE4nde im Browser gefunden`)}}catch{Le("MNIST wird geladen \u2026")}return{destroy:()=>{try{new di().saveCollection(p.nLatest.modelCollection),new br().saveEpochStore({version:1,byModelId:p.nLatest.epochByModelId})}catch{}Lu(),Qe(),ka(),p.appStore.dispatch(w.trainingStopRequested()),n.disconnect(),r.unsubscribe(),window.removeEventListener("beforeunload",qg),p.stopAnimCleanup?.(),p.net3d?.dispose(),p.disposeSceneBound?.(),p.net3d=null,p.stopAnimCleanup=null,p.disposeSceneBound=null,p.reconcileWorkspaceUrlForModelSelection=void 0,p.renderSceneBound=()=>{},p.renderDisplayBound=()=>{}},onTrain:zM,onPause:kM,onNewModel:UM,onSaveAs:VM,onReset:BM,onInferRandom:NM,onInferTrainSample:PM,onInferDraw:FM,onClearDraw:RM,onDrawPointerDown:_e,onDrawPointerMove:ut,onDrawPointerUp:wn,onDrawPointerCancel:Zo,onDrawPointerLeave:Ko,onHiddenLayerLayoutChange:Jo,onHiddenLayerLayoutScaleChange:wM,onInputLayerLayoutChange:MM,onInputLayerLayoutScaleChange:EM,onActiveNeuronMaxScaleMulChange:CM,onVizSceneColorsApply:TM,onVizLightColorsApply:IM,onVizNetworkColorsApply:DM,onVizPostProcessApply:AM,previewVizSceneColor:rn,previewVizLightColor:Pi,cancelPendingVizColorPreviews:Qe,setVibeCameraMode:d,setTestImageCarouselMode:OM,setVizFpsOverlay:(R,H)=>{l?.setFpsReporting(R,H)}}})}var Ni=class t{newModel=()=>{};selectModel=e=>{};runtimeAttached=!1;pendingNew=!1;pendingSelectId=null;connect(e){this.newModel=e.newModelFromToolbar,this.selectModel=e.activeModelFromToolbar,this.runtimeAttached=!0,this.flushPending()}disconnect(){this.newModel=()=>{},this.selectModel=()=>{},this.runtimeAttached=!1,this.pendingNew=!1,this.pendingSelectId=null}flushPending(){if(this.pendingNew){this.pendingNew=!1,this.pendingSelectId=null,this.newModel();return}if(this.pendingSelectId!==null){let e=this.pendingSelectId;this.pendingSelectId=null,this.selectModel(e)}}newModelFromToolbar(){if(!this.runtimeAttached){this.pendingNew=!0,this.pendingSelectId=null;return}this.newModel()}activeModelFromToolbar(e){if(!this.runtimeAttached){this.pendingSelectId=e,this.pendingNew=!1;return}this.selectModel(e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})};function wg(t){let n=t.split("?")[0].split("#")[0].split("/").filter(Boolean),i=n.indexOf("model");if(i<0)return null;let r=n[i+1];return!r||r==="new"?null:r}function Fw(t){return wg(t)!=null}var tn=class t{inferDrawBrushSizeUi={min:1,max:7};store=S(de);router=S(Wt);appInstance=S(Ni);actions$=S(fu);runtime=null;hydrateOnce=null;constructor(){this.actions$.pipe(Ce(w.activeModelIdFromRouteSet),ze(this.store.select(ci)),he(([,e])=>!e)).subscribe(([{id:e}])=>{Xn.schedule(()=>this.appInstance.activeModelFromToolbar(e))})}ensureStoreHydrated(){return X(this,null,function*(){this.hydrateOnce||(this.hydrateOnce=fs(this.store.select(mr).pipe(he(e=>e),We(1))).then(()=>{})),yield this.hydrateOnce})}bindRuntime(e,n){return X(this,null,function*(){yield this.ensureStoreHydrated(),this.runtime?.destroy();let i=yield Sg(this.store,e,n,r=>{let o=wg(this.router.url);return o!=null&&o!==r&&this.router.navigate(["/model",r],{replaceUrl:!0}),o});return this.runtime=i,()=>{this.runtime===i?(i.destroy(),this.runtime=null):i.destroy()}})}dispatch(e){this.store.dispatch(e)}onTrain=()=>{this.runtime?.onTrain()};onPause=()=>{this.runtime?.onPause()};onActiveModelFromMenu=e=>{this.store.dispatch(w.activeModelFromToolbarRequested({id:e}))};onNewModel=()=>{this.runtime?.onNewModel()};onSaveAs=()=>{this.runtime?.onSaveAs()};onReset=()=>{this.runtime?.onReset()};onInferRandom=()=>{this.runtime?.onInferRandom()};onInferTrainSample(e){this.runtime?.onInferTrainSample(e)}setVizFpsOverlay(e,n){this.runtime?.setVizFpsOverlay(e,n)}onInferDraw=()=>{this.runtime?.onInferDraw()};onClearDraw=()=>{this.runtime?.onClearDraw()};onDrawPointerDown=e=>{this.runtime?.onDrawPointerDown(e)};onDrawPointerMove=e=>{this.runtime?.onDrawPointerMove(e)};onDrawPointerUp=()=>{this.runtime?.onDrawPointerUp()};onDrawPointerCancel=()=>{this.runtime?.onDrawPointerCancel()};onDrawPointerLeave=()=>{this.runtime?.onDrawPointerLeave()};onHiddenLayerLayoutChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutChange(e,n)};onHiddenLayerLayoutScaleChange=(e,n)=>{this.runtime?.onHiddenLayerLayoutScaleChange(e,n)};onInputLayerLayoutChange=e=>{this.runtime?.onInputLayerLayoutChange(e)};onInputLayerLayoutScaleChange=e=>{this.runtime?.onInputLayerLayoutScaleChange(e)};onActiveNeuronMaxScaleMulChange=e=>{this.runtime?.onActiveNeuronMaxScaleMulChange(e)};onVizSceneColorsApply=e=>{this.runtime?.onVizSceneColorsApply(e)};onVizLightColorsApply=e=>{this.runtime?.onVizLightColorsApply(e)};onVizNetworkColorsApply=e=>{this.runtime?.onVizNetworkColorsApply(e)};onVizPostProcessApply=e=>{this.runtime?.onVizPostProcessApply(e)};previewVizSceneColor=(e,n)=>{this.runtime?.previewVizSceneColor(e,n)};previewVizLightColor=(e,n)=>{this.runtime?.previewVizLightColor(e,n)};cancelPendingVizColorPreviews=()=>{this.runtime?.cancelPendingVizColorPreviews()};toggleVibeCameraState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setVibeCameraMode(n),n}setTestImageCarouselMode(e){return this.runtime?.setTestImageCarouselMode(e)??!1}toggleTestImageCarouselState(e){if(!this.runtime)return null;let n=!e;return this.runtime.setTestImageCarouselMode(n)}stopTestImageCarousel(){this.runtime?.setTestImageCarouselMode(!1)}setInferDrawBrushMode(e){km(e)}getInferDrawBrushMode(){return Bo()}setInferDrawBrushSize(e){Um(e)}getInferDrawBrushSize(){return Vm()}static \u0275fac=function(n){return new(n||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})};var xF=t=>["/model",t],bF=(t,e)=>e.id;function SF(t,e){t&1&&(g(0,"div",1),b(1," Wird geladen \u2026 "),v())}function wF(t,e){t&1&&(g(0,"div",1),b(1," Modelle werden vorbereitet \u2026 "),v())}function MF(t,e){if(t&1){let n=zt();g(0,"div",2)(1,"p",3),b(2," Noch keine gespeicherten Modelle. Lege ein neues Netz an \u2014 es erscheint in der Liste; \xF6ffne es dort f\xFCr die Arbeitsfl\xE4che. "),v(),g(3,"button",4),D("click",function(){N(n);let r=E();return P(r.createNew())}),b(4," Neues Modell anlegen "),v()()}}function EF(t,e){if(t&1&&(g(0,"li")(1,"a",9)(2,"div",10)(3,"span",11),b(4),v(),g(5,"div",12)(6,"span"),b(7),v(),g(8,"span"),b(9),v()(),g(10,"div",13)(11,"div",14)(12,"span"),b(13,"Trainierte Epochen"),v(),g(14,"span",15),b(15),v()(),g(16,"div",16),xe(17,"div",17),v()()()()()),t&2){let n=e.$implicit,i=E(2);x(),U("routerLink",fx(8,xF,n.id)),x(3),et(n.name),x(3),ge("Test: ",i.fmtPct(n.metrics.testAcc),""),x(2),ge("Fehlerrate: ",i.fmtPct(n.metrics.errorRate),""),x(6),et(n.metrics.epochsTrained),x(),se("aria-label","Epochen "+n.metrics.epochsTrained+" im Vergleich zur Liste"),x(),mo("width",i.epochBarRelativePct(n.metrics.epochsTrained),"%")}}function CF(t,e){if(t&1){let n=zt();g(0,"div",5)(1,"h1",6),b(2," Gespeicherte Modelle "),v(),g(3,"button",7),D("click",function(){N(n);let r=E();return P(r.createNew())}),b(4," Neues Modell anlegen "),v()(),g(5,"ul",8),lt(6,EF,18,10,"li",null,bF),v()}if(t&2){let n=E();x(6),ct(n.models())}}var Vu=class t{neuronalApp=S(tn);store=S(de);ready=Pe(!1);hydrated=ve(this.store.select(mr),{initialValue:!1});models=ve(this.store.select(ko).pipe(G(e=>e.models)),{initialValue:[]});constructor(){this.neuronalApp.ensureStoreHydrated().then(()=>{this.ready.set(!0)})}fmtPct(e){return e===null||!Number.isFinite(e)?"\u2014":`${(e*100).toFixed(2)} %`}epochBarRelativePct(e){let n=this.models(),i=0;for(let s of n){let a=s.metrics.epochsTrained;Number.isFinite(a)&&a>i&&(i=a)}let r=Math.max(1,i),o=Number.isFinite(e)?Math.max(0,e):0;return Math.min(100,o/r*100)}createNew(){this.store.dispatch(w.newModelFromListRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-model-list"]],hostAttrs:[1,"flex","min-h-0","flex-1","flex-col"],decls:5,vars:1,consts:[[1,"flex","min-h-0","flex-1","flex-col","gap-4","p-4"],[1,"text-base-content/70","border-base-300/50","bg-base-200/50","rounded-box","border","border-dashed","p-6","text-sm"],[1,"flex","flex-col","gap-4","rounded-box","border","border-dashed","border-base-300/60","bg-base-200/40","p-6"],[1,"text-base-content/80","text-sm"],["type","button",1,"btn","btn-accent","w-fit",3,"click"],[1,"flex","flex-col","gap-3","sm:flex-row","sm:items-center","sm:justify-between"],[1,"text-lg","font-semibold","tracking-tight"],["type","button",1,"btn","btn-accent","shrink-0",3,"click"],["role","list",1,"flex","flex-col","gap-2"],[1,"card","border-base-300","bg-base-200","hover:border-primary/50","hover:bg-base-200/90","block","rounded-box","border","shadow-sm","transition-colors",3,"routerLink"],[1,"card-body","gap-1","p-4"],[1,"card-title","text-base"],[1,"text-base-content/65","flex","flex-wrap","gap-x-4","gap-y-1","text-xs"],[1,"mt-2.5","flex","flex-col","gap-1.5"],["aria-hidden","true",1,"text-base-content/50","flex","items-baseline","justify-between","gap-2","text-[0.65rem]","font-medium","uppercase","tracking-wider"],[1,"text-base-content/70","tabular-nums","normal-case"],["role","img",1,"bg-base-300/40","h-2.5","w-full","overflow-hidden","rounded-full"],[1,"from-primary","to-secondary","bg-gradient-to-r","h-full","min-h-full","min-w-0","rounded-full","shadow-sm","shadow-primary/25","transition-[width]","duration-500","ease-out"]],template:function(n,i){n&1&&(g(0,"main",0),Ue(1,SF,2,0,"div",1)(2,wF,2,0,"div",1)(3,MF,5,0,"div",2)(4,CF,8,0),v()),n&2&&(x(),He(i.ready()?i.hydrated()?i.models().length===0?3:4:2:1))},dependencies:[Lo],encapsulation:2,changeDetection:0})};function kw(t){let e=S(de),n=S(Wt);return e.select(mr).pipe(he(i=>i),We(1),Et(()=>e.select(ko).pipe(We(1))),G(i=>{let r=(t.params.modelId??"").trim();return r?i.models.some(o=>o.id===r)?(e.dispatch(w.activeModelIdFromRouteSet({id:r})),!0):n.parseUrl("/"):!0}))}function TF(t,e){return this.rowKey(e)}var Mg=(t,e)=>e.pos+e.label;function IF(t,e){t&1&&(g(0,"li",10),b(1," Noch kein Training "),v())}function DF(t,e){if(t&1&&(g(0,"li",11)(1,"span",12),b(2),v(),g(3,"span"),b(4),v(),g(5,"span"),b(6),v(),g(7,"span"),b(8),v(),g(9,"span",13),b(10),v()()),t&2){let n=e.$implicit,i=E(3);x(2),ge("R",i.runLabel(n.run),""),x(2),ge("Ep ",n.epoch+1,""),x(2),ge("loss ",n.loss.toFixed(4),""),x(2),ge("",(n.trainAcc*100).toFixed(2),"%"),x(2),xo("",i.timeLabel(n.savedAt)," | Dauer ",i.durationLabel(n.runElapsedMs),"")}}function AF(t,e){if(t&1&&lt(0,DF,11,6,"li",11,TF,!0),t&2){let n=E(2);ct(n.view().rows)}}function RF(t,e){if(t&1&&(g(0,"div",7)(1,"ul",9),Ue(2,IF,2,0,"li",10)(3,AF,2,0),v()()),t&2){let n=E();x(2),He(n.view().rows.length===0?2:3)}}function NF(t,e){if(t&1&&(co(),xe(0,"line",17)),t&2){let n=e.$implicit,i=E();se("x1",i.marginLeft)("y1",n)("x2",i.marginLeft+i.plotW)("y2",n)}}function PF(t,e){if(t&1&&(co(),g(0,"text",22),b(1),v()),t&2){let n=e.$implicit,i=E();se("x",i.marginLeft-4)("y",n.pos),x(),ge(" ",n.label," ")}}function LF(t,e){if(t&1&&(co(),g(0,"text",23),b(1),v()),t&2){let n=e.$implicit,i=E();se("x",i.marginLeft+i.plotW+4)("y",n.pos),x(),ge(" ",n.label," ")}}function OF(t,e){if(t&1&&(co(),g(0,"text",24),b(1),v()),t&2){let n=e.$implicit,i=E();se("x",n.pos)("y",i.marginTop+i.plotH+14),x(),ge(" ",n.label," ")}}function FF(t,e){if(t&1&&(co(),g(0,"svg",14)(1,"defs")(2,"clipPath",15),xe(3,"rect"),v()(),xe(4,"rect",16),lt(5,NF,1,4,":svg:line",17,bi),xe(7,"line",18)(8,"line",18)(9,"line",18),g(10,"g",19),xe(11,"polyline",20)(12,"polyline",21),v(),lt(13,PF,2,3,":svg:text",22,Mg),lt(15,LF,2,3,":svg:text",23,Mg),lt(17,OF,2,3,":svg:text",24,Mg),g(19,"text",25),b(20," Schritt "),v()(),p0(),g(21,"div",26)(22,"span",27),b(23,"Loss"),v(),g(24,"span",28),b(25,"Train-Acc"),v()()),t&2){let n=e;se("viewBox","0 0 "+n.vbW+" "+n.vbH),x(3),se("x",n.marginLeft)("y",n.marginTop)("width",n.plotW)("height",n.plotH),x(),se("width",n.vbW)("height",n.vbH),x(),ct(n.gridYs),x(2),se("x1",n.marginLeft)("y1",n.marginTop)("x2",n.marginLeft)("y2",n.marginTop+n.plotH),x(),se("x1",n.marginLeft+n.plotW)("y1",n.marginTop)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),x(),se("x1",n.marginLeft)("y1",n.marginTop+n.plotH)("x2",n.marginLeft+n.plotW)("y2",n.marginTop+n.plotH),x(2),se("points",n.pointsLoss),x(),se("points",n.pointsAcc),x(),ct(n.leftTicks),x(2),ct(n.rightTicks),x(2),ct(n.bottomTicks),x(2),se("x",n.marginLeft+n.plotW/2)("y",n.vbH-2)}}function kF(t,e){t&1&&(g(0,"p",10),b(1," Noch kein Training "),v())}function UF(t,e){if(t&1&&(g(0,"div",8),Ue(1,FF,26,23)(2,kF,2,0,"p",10),v()),t&2){let n,i=E();x(),He((n=i.chartModel())?1:2,n)}}var Bu=class t{store=S(de);view=ve(this.store.select(om),{requireSync:!0});epochTab=Pe("list");chartModel=xt(()=>{let e=this.view().rows;if(e.length===0)return null;let n=[...e].reverse(),i=n.length,r=34,o=38,s=10,a=26,l=148,c=70,u=r+l+o,d=s+c+a,h=n.map(_e=>_e.loss),f=Math.min(...h),m=Math.max(...h),_=Math.max(m-f,1e-9),T=_e=>r+(i<=1?l/2:_e/(i-1)*l),I=_e=>s+(1-(_e-f)/_)*c,B=_e=>s+(1-_e)*c,Y=n.map((_e,ut)=>`${T(ut)},${I(_e.loss)}`).join(" "),k=n.map((_e,ut)=>`${T(ut)},${B(_e.trainAcc)}`).join(" "),L=_e=>{let ut=Math.abs(_e);return ut>=100?_e.toFixed(0):ut>=10?_e.toFixed(1):ut>=1?_e.toFixed(2):_e.toFixed(3)},A=s+c,fe=s+c/2,Te=m-f<1e-8,Qe=Te?[{pos:fe,label:L(f)}]:[{pos:s,label:L(f)},{pos:fe,label:L((f+m)/2)},{pos:A,label:L(m)}],rn=[{pos:s,label:"100%"},{pos:fe,label:"50%"},{pos:A,label:"0%"}],Pi=Te?[fe]:[s,fe,A],Mt=[];if(i===1)Mt.push({pos:T(0),label:"1"});else{if(Mt.push({pos:T(0),label:"1"}),i>2){let _e=Math.floor((i-1)/2);_e!==0&&_e!==i-1&&Mt.push({pos:T(_e),label:String(_e+1)})}Mt.push({pos:T(i-1),label:String(i)})}return{vbW:u,vbH:d,marginLeft:r,marginRight:o,marginTop:s,marginBottom:a,plotW:l,plotH:c,pointsLoss:Y,pointsAcc:k,leftTicks:Qe,rightTicks:rn,bottomTicks:Mt,gridYs:Pi}});rowKey(e){return`${e.run}-${e.epoch}-${e.savedAt}`}runLabel(e){return String(e).padStart(2,"0")}timeLabel(e){let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleTimeString("de-DE",{hour12:!1}):"--:--:--"}durationLabel(e){let n=Math.max(0,Math.round(e/1e3)),i=Math.floor(n/3600),r=Math.floor(n%3600/60),o=n%60;return i>0?`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-epoch-track-list"]],decls:12,vars:8,consts:[[1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden","border","shadow-xl"],[1,"card-body","flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","p-4"],["role","tablist","aria-label","Epoch-Ansicht",1,"tabs","tabs-boxed","bg-base-300/30","p-1"],["type","button","role","tab","id","tab-epoch-list","aria-controls","panel-epoch-list",1,"tab","flex-1","text-xs",3,"click"],["type","button","role","tab","id","tab-epoch-chart","aria-controls","panel-epoch-chart",1,"tab","flex-1","text-xs",3,"click"],[1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden","pt-1"],[1,"text-success/90","m-0","text-[0.68rem]","font-bold","uppercase","tracking-widest"],["id","panel-epoch-list","role","tabpanel","aria-labelledby","tab-epoch-list",1,"flex","min-h-0","min-w-0","flex-1","flex-col","overflow-hidden"],["id","panel-epoch-chart","role","tabpanel","aria-labelledby","tab-epoch-chart",1,"flex","min-h-0","min-w-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","min-h-0","flex-1","list-none","flex-col","gap-2","overflow-y-auto","overflow-x-hidden","p-0"],[1,"text-base-content/60","rounded-btn","border-base-300/60","border","border-dashed","p-3","text-xs"],[1,"border-base-300/80","bg-base-100/40","rounded-btn","grid","grid-cols-[3.2rem_4rem_1fr_auto]","items-center","gap-2","border","p-2","font-mono","text-[0.68rem]","tabular-nums"],[1,"text-base-content/60"],[1,"text-base-content/60","border-base-300/40","col-span-4","border-t","pt-1","text-[0.64rem]"],["preserveAspectRatio","xMidYMid meet",1,"border-base-300/60","block","max-h-[14rem]","min-h-[6.5rem]","w-full","flex-1","rounded-lg","border"],["id","n3-epoch-plot-clip"],["x","0","y","0",1,"fill-base-300/35"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/10"],["stroke-width","1","vector-effect","non-scaling-stroke",1,"stroke-base-content/45"],["clip-path","url(#n3-epoch-plot-clip)"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-primary"],["stroke-width","1.75","stroke-linecap","round","stroke-linejoin","round","vector-effect","non-scaling-stroke","fill","none",1,"stroke-info"],["text-anchor","end","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","start","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium","tabular-nums"],["text-anchor","middle","dominant-baseline","middle",1,"fill-base-content/65","text-[6.5px]","font-medium"],["text-anchor","middle","dominant-baseline","auto",1,"fill-base-content/55","text-[6px]","font-semibold","uppercase","tracking-wide"],["aria-hidden","true",1,"text-base-content/60","flex","flex-wrap","gap-x-4","gap-y-1","text-[0.65rem]"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-primary","before:content-['']"],[1,"inline-flex","items-center","gap-1.5","before:h-0.5","before:w-2.5","before:rounded-sm","before:bg-info","before:content-['']"]],template:function(n,i){n&1&&(g(0,"article",0)(1,"div",1)(2,"div",2)(3,"button",3),D("click",function(){return i.epochTab.set("list")}),b(4," Liste "),v(),g(5,"button",4),D("click",function(){return i.epochTab.set("chart")}),b(6," Diagramm "),v()(),g(7,"div",5)(8,"div",6),b(9),v(),Ue(10,RF,4,1,"div",7)(11,UF,3,1,"div",8),v()()()),n&2&&(x(3),mt("tab-active",i.epochTab()==="list"),se("aria-selected",i.epochTab()==="list"),x(2),mt("tab-active",i.epochTab()==="chart"),se("aria-selected",i.epochTab()==="chart"),x(4),ge(" Epochs (",i.view().epochsTotal,") "),x(),He(i.epochTab()==="list"?10:11))},styles:["[_nghost-%COMP%]{display:flex;overflow:auto}"],changeDetection:0})};var VF=["cv"],zu=class t{cdr=S(bo);cv;index;pick=new ft;displayNr=0;labelStr="\u2014";ngAfterViewInit(){this.paint()}ngOnChanges(){queueMicrotask(()=>this.paint())}paint(){let e=this.cv?.nativeElement;if(!e)return;let n=Mr(this.index);if(this.displayNr=this.index+1,!n){this.labelStr="\u2014",this.cdr.markForCheck();return}this.labelStr=String(n.label),xu(e,n.pixels),this.cdr.markForCheck()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-train-infer-thumb"]],viewQuery:function(n,i){if(n&1&&Bs(VF,7),n&2){let r;vo(r=yo())&&(i.cv=r.first)}},inputs:{index:"index"},outputs:{pick:"pick"},features:[tr],decls:8,vars:2,consts:[["cv",""],["type","button",1,"border-base-300","bg-base-300/40","hover:bg-base-300/60","flex","w-full","items-center","gap-3","rounded-lg","border","px-2","py-1","text-left","transition-colors",3,"click"],["width","28","height","28",1,"border-base-content/20","h-11","w-11","shrink-0","rounded","border","bg-black","[image-rendering:pixelated]"],[1,"flex","min-w-0","flex-1","flex-col","gap-0.5"],[1,"text-base-content","font-mono","text-xs","font-medium","tabular-nums"],[1,"text-base-content/60","text-[11px]"]],template:function(n,i){if(n&1){let r=zt();g(0,"button",1),D("click",function(){return N(r),P(i.pick.emit())}),xe(1,"canvas",2,0),g(3,"div",3)(4,"span",4),b(5),v(),g(6,"span",5),b(7),v()()()}n&2&&(x(5),ge("Nr. ",i.displayNr,""),x(2),ge("Label ",i.labelStr,""))},encapsulation:2,changeDetection:0})};var BF=["trainGalleryScroll"],zF=["inferDrawCanvas"],HF=(t,e)=>e.row;function GF(t,e){if(t&1){let n=zt();g(0,"div",10)(1,"div",12)(2,"button",13),D("click",function(){N(n);let r=E();return P(r.inferRandom())}),b(3," Zuf\xE4lliges Testbild "),v(),g(4,"button",14),D("click",function(){N(n);let r=E();return P(r.toggleTestCarousel())}),b(5),v()(),g(6,"div",15)(7,"div",16)(8,"span",17),b(9,"Pinselgr\xF6\xDFe"),v(),g(10,"span",18),b(11),v()(),g(12,"input",19),D("input",function(r){N(n);let o=E();return P(o.onBrushSizeInput(r))}),v()(),g(13,"canvas",20,0),D("contextmenu",function(r){return N(n),P(r.preventDefault())})("pointerdown",function(r){N(n);let o=E();return P(o.drawDown(r))})("pointermove",function(r){N(n);let o=E();return P(o.drawMove(r))})("pointerup",function(){N(n);let r=E();return P(r.drawUp())})("pointercancel",function(){N(n);let r=E();return P(r.drawCancel())})("pointerleave",function(){N(n);let r=E();return P(r.drawLeave())}),v(),g(15,"div",21)(16,"div",22)(17,"button",23),D("click",function(){N(n);let r=E();return P(r.inferDraw())}),b(18," Zeichnung auswerten "),v(),g(19,"button",24),D("click",function(){N(n);let r=E();return P(r.clearDraw())}),b(20," Leeren "),v()(),g(21,"button",25),D("click",function(){N(n);let r=E();return P(r.toggleSoftBrush())}),b(22),v()()()}if(t&2){let n=E();x(2),U("disabled",n.inferCtrl().inferRandomDisabled),x(2),U("disabled",n.inferCtrl().carouselDisabled),se("aria-pressed",n.testCarouselOn()),x(),ge(" ",n.testCarouselOn()?"Testbild-Karussell aus":"Testbild-Karussell"," "),x(6),xo("Stift ",n.penStampCells(),"\xD7",n.penStampCells(),""),x(),U("min",n.neuronalApp.inferDrawBrushSizeUi.min)("max",n.neuronalApp.inferDrawBrushSizeUi.max)("value",n.brushSize()),se("aria-valuetext","Pinselstufe "+n.brushSize()),x(5),U("disabled",n.inferCtrl().inferDrawDisabled),x(4),se("aria-pressed",n.softBrushOn()),x(),ge(" ",n.softBrushOn()?"Pinsel: weich (AA)":"Pinsel: Pixel-Raster"," ")}}function jF(t,e){if(t&1){let n=zt();g(0,"button",40),D("click",function(){let r=N(n).$implicit,o=E(2);return P(o.setTrainFilterDigit(r))}),b(1),v()}if(t&2){let n=e.$implicit,i=E(2);mt("btn-primary",i.trainFilterDigit()===n),se("aria-pressed",i.trainFilterDigit()===n),x(),ge(" ",n," ")}}function WF(t,e){t&1&&(g(0,"p",35),b(1," Noch keine Trainingsdaten geladen \u2026 "),v())}function $F(t,e){if(t&1){let n=zt();g(0,"div",41)(1,"app-train-infer-thumb",42),D("pick",function(){let r=N(n).$implicit,o=E(2);return P(o.selectTrainForInfer(r.sampleIndex))}),v()()}if(t&2){let n=e.$implicit,i=E(2);mo("top",n.row*i.trainRowHeight,"px")("height",i.trainRowHeight,"px"),x(),U("index",n.sampleIndex)}}function qF(t,e){if(t&1&&b(0),t&2){let n=E(2);xo(" ",n.trainOrderedCount()," / ",n.trainCount()," Bilder ")}}function XF(t,e){if(t&1&&b(0),t&2){let n=E(2);zs(" ",n.trainOrderedCount()," Bilder (Ziffer ",n.trainFilterDigit(),", von ",n.trainCount()," gesamt) ")}}function YF(t,e){if(t&1){let n=zt();g(0,"div",11)(1,"p",26),b(2," Alle geladenen Trainingsbilder \u2014 Klick setzt das Bild f\xFCr die Inferenz (wie das Zeichen-Canvas) und stoppt das Test-Karussell. "),v(),g(3,"div",27)(4,"div",28)(5,"span",29),b(6,"Sortierung"),v(),g(7,"button",30),D("click",function(){N(n);let r=E();return P(r.setTrainSortBy("index"))}),b(8," Nummer (Index) "),v(),g(9,"button",30),D("click",function(){N(n);let r=E();return P(r.setTrainSortBy("digit"))}),b(10," Ziffer zuerst "),v()(),g(11,"div",31)(12,"span",29),b(13,"Ziffer-Filter"),v(),g(14,"div",32)(15,"button",33),D("click",function(){N(n);let r=E();return P(r.setTrainFilterDigit(null))}),b(16," Alle "),v(),lt(17,jF,2,4,"button",34,bi),v()()(),Ue(19,WF,2,0,"p",35),g(20,"div",36,1),D("scroll",function(r){N(n);let o=E();return P(o.onTrainGalleryScroll(r))}),g(22,"div",37),lt(23,$F,2,5,"div",38,HF),v()(),g(25,"p",39),Ue(26,qF,1,2)(27,XF,1,3),v()()}if(t&2){let n=E();x(7),se("aria-pressed",n.trainSortBy()==="index"),x(2),se("aria-pressed",n.trainSortBy()==="digit"),x(6),mt("btn-primary",n.trainFilterDigit()===null),se("aria-pressed",n.trainFilterDigit()===null),x(2),ct(n.trainDigitKeys),x(2),He(n.trainCount()===0?19:-1),x(3),mo("height",n.trainGalleryTotalHeight(),"px"),x(),ct(n.visibleTrainGalleryRows()),x(3),He(n.trainFilterDigit()===null?26:27)}}var Na=class t{store=S(de);neuronalApp=S(tn);inferCtrl=ve(this.store.select(vm),{requireSync:!0});inferPanelModel=ve(this.store.select(xm),{requireSync:!0});inferUiTab=Pe("draw");testCarouselOn=Pe(!1);softBrushOn=Pe(!1);brushSize=Pe(4);trainRowHeight=58;trainGalleryViewportPx=280;trainCount=Pe(0);trainScrollTop=Pe(0);trainSortBy=Pe("index");trainFilterDigit=Pe(null);trainDigitKeys=[0,1,2,3,4,5,6,7,8,9];trainOrderedIndices=Pe([]);trainGalleryScrollEl=po("trainGalleryScroll");inferDrawCanvasEl=po("inferDrawCanvas");trainOrderedCount=xt(()=>this.trainOrderedIndices().length);trainGalleryTotalHeight=xt(()=>this.trainOrderedCount()*this.trainRowHeight);visibleTrainGalleryRows=xt(()=>{let e=this.trainOrderedIndices(),n=e.length;if(n<=0)return[];let i=this.trainScrollTop(),r=this.trainGalleryViewportPx,o=this.trainRowHeight,s=Math.max(0,Math.floor(i/o)-2),a=Math.min(n-1,Math.ceil((i+r)/o)+2),l=[];for(let c=s;c<=a;c++)l.push({row:c,sampleIndex:e[c]});return l});penStampCells=xt(()=>2*Math.min(6,Math.max(0,this.brushSize()-1))+1);trainingRunning=ve(this.store.select(ci),{initialValue:!1});constructor(){Fn(()=>{this.trainingRunning()&&(this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1))}),Fn(e=>{if(this.inferUiTab()!=="train"||(this.refreshTrainCount(),this.trainCount()>0))return;let n=window.setInterval(()=>{this.refreshTrainCount()},500);e(()=>window.clearInterval(n))}),Fn(()=>{let e=this.trainCount(),n=this.trainSortBy(),i=this.trainFilterDigit();if(e<=0){this.trainOrderedIndices.set([]);return}let r;if(i===null)r=Array.from({length:e},(o,s)=>s);else{r=[];for(let o=0;o<e;o++){let s=Mr(o);s&&s.label===i&&r.push(o)}}n==="digit"&&r.sort((o,s)=>{let a=Mr(o),l=Mr(s),c=a?.label??-1,u=l?.label??-1;return c!==u?c-u:o-s}),this.trainOrderedIndices.set(r)})}ngAfterViewInit(){queueMicrotask(()=>{this.softBrushOn.set(this.neuronalApp.getInferDrawBrushMode()==="soft"),this.brushSize.set(this.neuronalApp.getInferDrawBrushSize())})}ngOnDestroy(){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1)}onTrainGalleryScroll(e){let n=e.target;this.trainScrollTop.set(n.scrollTop)}resetTrainGalleryScroll(){this.trainScrollTop.set(0);let e=this.trainGalleryScrollEl()?.nativeElement;e&&(e.scrollTop=0)}setTrainSortBy(e){this.trainSortBy()!==e&&(this.trainSortBy.set(e),this.resetTrainGalleryScroll())}setTrainFilterDigit(e){this.trainFilterDigit()!==e&&(this.trainFilterDigit.set(e),this.resetTrainGalleryScroll())}refreshTrainCount(){this.trainCount.set($m())}selectTrainForInfer(e){this.neuronalApp.stopTestImageCarousel(),this.testCarouselOn.set(!1),this.neuronalApp.onInferTrainSample(e)}inferRandom(){this.store.dispatch(w.uiInferRandomRequested())}toggleTestCarousel(){let e=this.neuronalApp.toggleTestImageCarouselState(this.testCarouselOn());e!==null&&this.testCarouselOn.set(e)}toggleSoftBrush(){let e=!this.softBrushOn();this.neuronalApp.setInferDrawBrushMode(e?"soft":"pixels"),this.softBrushOn.set(e)}onBrushSizeInput(e){let n=Number(e.target.value);this.brushSize.set(n),this.neuronalApp.setInferDrawBrushSize(n)}inferDraw(){this.store.dispatch(w.uiInferDrawRequested())}clearDraw(){this.store.dispatch(w.uiClearDrawRequested())}drawDown(e){this.neuronalApp.onDrawPointerDown(e)}drawMove(e){this.neuronalApp.onDrawPointerMove(e)}drawUp(){this.neuronalApp.onDrawPointerUp()}drawCancel(){this.neuronalApp.onDrawPointerCancel()}drawLeave(){this.neuronalApp.onDrawPointerLeave()}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-infer-panel"]],viewQuery:function(n,i){n&1&&(_o(i.trainGalleryScrollEl,BF,5),_o(i.inferDrawCanvasEl,zF,5)),n&2&&yc(2)},decls:14,vars:7,consts:[["inferDrawCanvas",""],["trainGalleryScroll",""],["id","dockInfer",1,"card","border-base-300","bg-base-200","rounded-box","flex","min-h-0","flex-1","flex-col","gap-3","border","shadow-xl"],[1,"card-body","min-h-0","flex","flex-1","flex-col","gap-3","p-5"],[1,"shrink-0"],[1,"card-title","text-base"],[1,"text-base-content/60","text-xs"],["role","tablist","aria-label","Inferenz-Modus",1,"tabs","tabs-boxed","bg-base-300/50","shrink-0","p-1"],["type","button","role","tab","id","tab-infer-draw","aria-controls","panel-infer-draw",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["type","button","role","tab","id","tab-infer-train","aria-controls","panel-infer-train",1,"tab","flex-1","text-xs","sm:text-sm",3,"click"],["id","panel-infer-draw","role","tabpanel","aria-labelledby","tab-infer-draw",1,"flex","min-h-0","flex-1","flex-col","gap-3"],["id","panel-infer-train","role","tabpanel","aria-labelledby","tab-infer-train",1,"flex","min-h-0","flex-1","flex-col","gap-2","overflow-hidden"],[1,"flex","flex-wrap","gap-2"],["id","btnInferRandom","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnTestCarousel","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],[1,"flex","w-full","max-w-[min(280px,100%)]","flex-col","gap-1","self-center"],[1,"text-base-content/70","flex","items-center","justify-between","gap-2","text-xs"],[1,"text-base-content","font-medium"],[1,"tabular-nums"],["type","range","step","1",1,"range","range-primary","range-sm","w-full",3,"input","min","max","value"],["id","drawCanvas","width","28","height","28",1,"border-base-300/60","h-auto","w-[min(280px,100%)]","touch-none","self-center","rounded-xl","border","bg-black","shadow-xl","[image-rendering:pixelated]",3,"contextmenu","pointerdown","pointermove","pointerup","pointercancel","pointerleave"],["id","drawActions",1,"flex","w-full","max-w-[290px]","flex-col","gap-2","self-center"],[1,"grid","grid-cols-2","gap-2"],["id","btnInferDraw","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","btnClearDraw","type","button",1,"btn","btn-ghost","btn-sm",3,"click"],["type","button",1,"btn","btn-ghost","btn-sm","w-full",3,"click"],[1,"text-base-content/60","shrink-0","text-xs","leading-snug"],[1,"flex","shrink-0","flex-col","gap-2"],[1,"flex","flex-wrap","items-center","gap-2"],[1,"text-base-content/70","text-[11px]"],["type","button",1,"btn","btn-outline","btn-xs","sm:btn-sm",3,"click"],[1,"flex","flex-col","gap-1"],[1,"flex","flex-wrap","gap-1"],["type","button",1,"btn","btn-xs","flex-1","min-w-10","sm:btn-sm",3,"click"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"btn-primary"],[1,"text-warning","shrink-0","text-xs"],[1,"border-base-300/60","min-h-0","flex-1","overflow-y-auto","rounded-lg","border",2,"max-height","min(22rem, 50vh)",3,"scroll"],[1,"relative","w-full"],[1,"absolute","box-border","w-full","px-1","py-0.5",3,"top","height"],[1,"text-base-content/50","shrink-0","text-[11px]","tabular-nums"],["type","button",1,"btn","btn-xs","flex-1","min-w-9","sm:btn-sm",3,"click"],[1,"absolute","box-border","w-full","px-1","py-0.5"],[3,"pick","index"]],template:function(n,i){n&1&&(g(0,"article",2)(1,"div",3)(2,"div",4)(3,"h2",5),b(4,"Inferenz"),v(),g(5,"p",6),b(6," Direkt mit dem aktiven Modell testen "),v()(),g(7,"div",7)(8,"button",8),D("click",function(){return i.inferUiTab.set("draw")}),b(9," Zeichnung & Test "),v(),g(10,"button",9),D("click",function(){return i.inferUiTab.set("train")}),b(11," Trainingsbilder "),v()(),Ue(12,GF,23,13,"div",10)(13,YF,28,9,"div",11),v()()),n&2&&(x(8),mt("tab-active",i.inferUiTab()==="draw"),se("aria-selected",i.inferUiTab()==="draw"),x(2),mt("tab-active",i.inferUiTab()==="train"),se("aria-selected",i.inferUiTab()==="train"),x(2),He(i.inferUiTab()==="draw"?12:13))},dependencies:[zu],encapsulation:2,changeDetection:0})};var ZF=["*"];function KF(t,e){t&1&&xe(0,"input",1)}function JF(t,e){t&1&&xe(0,"input",2)}var Hu=class t{heading=Rs.required();defaultExpanded=Rs(!0);static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-viz-settings-block"]],inputs:{heading:[1,"heading"],defaultExpanded:[1,"defaultExpanded"]},ngContentSelectors:ZF,decls:8,vars:2,consts:[[1,"collapse","collapse-arrow","min-w-0","border","border-base-300","bg-base-100"],["type","checkbox","checked","",1,"min-h-0"],["type","checkbox",1,"min-h-0"],[1,"collapse-title","py-2","text-[0.62rem]","font-semibold","uppercase","tracking-[0.14em]"],[1,"collapse-content","text-sm"],[1,"flex","min-w-0","flex-col","gap-3","pb-1","pt-0"]],template:function(n,i){n&1&&(ux(),g(0,"div",0),Ue(1,KF,1,0,"input",1)(2,JF,1,0,"input",2),g(3,"div",3),b(4),v(),g(5,"div",4)(6,"div",5),dx(7),v()()()),n&2&&(x(),He(i.defaultExpanded()?1:2),x(3),ge(" ",i.heading()," "))},encapsulation:2,changeDetection:0})};var QF=["fpsSparkline"],ek=["vizMount"];function tk(t,e){t&1&&(g(0,"option",69),b(1," Benutzerdefiniert (Farben manuell ge\xE4ndert) "),v())}function nk(t,e){if(t&1&&(g(0,"option",71),b(1),v()),t&2){let n=e.$implicit;U("value",n),x(),et(n)}}function ik(t,e){if(t&1){let n=zt();g(0,"aside",3)(1,"app-viz-settings-block",13)(2,"div",14)(3,"label",15),b(4,"Darstellung"),v(),g(5,"select",16),D("change",function(r){N(n);let o=E();return P(o.onInputLayout(r))}),g(6,"option",17),b(7,"28\xD728 Pixel"),v(),g(8,"option",18),b(9,"Ring"),v(),g(10,"option",19),b(11,"Raster"),v(),g(12,"option",20),b(13,"Linie"),v(),g(14,"option",21),b(15,"Bogen, Richtung 1"),v(),g(16,"option",22),b(17,"Bogen, Richtung 2"),v()()(),g(18,"div",14)(19,"label",23),b(20,"Skala"),v(),g(21,"div",24)(22,"input",25),D("input",function(r){N(n);let o=E();return P(o.onInputScale(r))}),v(),g(23,"span",26),b(24),Ht(25,"number"),v()()()(),g(26,"app-viz-settings-block",27)(27,"div",14)(28,"label",28),b(29,"Darstellung"),v(),g(30,"select",29),D("change",function(r){N(n);let o=E();return P(o.onHiddenLayout(0,r))}),g(31,"option",18),b(32,"Ring"),v(),g(33,"option",19),b(34,"Raster"),v(),g(35,"option",20),b(36,"Linie"),v(),g(37,"option",21),b(38,"Bogen, Richtung 1"),v(),g(39,"option",22),b(40,"Bogen, Richtung 2"),v()()(),g(41,"div",14)(42,"label",30),b(43,"Skala"),v(),g(44,"div",24)(45,"input",31),D("input",function(r){N(n);let o=E();return P(o.onScale(0,r))}),v(),g(46,"span",26),b(47),Ht(48,"number"),v()()()(),g(49,"app-viz-settings-block",32)(50,"div",14)(51,"label",33),b(52,"Darstellung"),v(),g(53,"select",34),D("change",function(r){N(n);let o=E();return P(o.onHiddenLayout(1,r))}),g(54,"option",18),b(55,"Ring"),v(),g(56,"option",19),b(57,"Raster"),v(),g(58,"option",20),b(59,"Linie"),v(),g(60,"option",21),b(61,"Bogen, Richtung 1"),v(),g(62,"option",22),b(63,"Bogen, Richtung 2"),v()()(),g(64,"div",14)(65,"label",35),b(66,"Skala"),v(),g(67,"div",24)(68,"input",36),D("input",function(r){N(n);let o=E();return P(o.onScale(1,r))}),v(),g(69,"span",26),b(70),Ht(71,"number"),v()()()(),g(72,"app-viz-settings-block",37)(73,"div",14)(74,"label",38),b(75,"Max. Gr\xF6\xDFe aktiver Neuronen"),v(),g(76,"div",24)(77,"input",39),D("input",function(r){N(n);let o=E();return P(o.onActiveNeuronMaxMul(r))}),v(),g(78,"span",26),b(79),Ht(80,"number"),v()()()(),g(81,"app-viz-settings-block",40)(82,"div",41)(83,"div",42)(84,"label",43),b(85,"Emissive"),v(),g(86,"input",44),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronEmissive",r))}),v()(),g(87,"div",14)(88,"label",45),b(89,"Intensit\xE4t (aktiv)"),v(),g(90,"div",24)(91,"input",46),D("input",function(r){N(n);let o=E();return P(o.onNetworkNumber("neuronEmissiveIntensityActive",r))}),v(),g(92,"span",47),b(93),Ht(94,"number"),v()()(),g(95,"div",14)(96,"label",48),b(97,"Intensit\xE4t (ruhend)"),v(),g(98,"div",24)(99,"input",49),D("input",function(r){N(n);let o=E();return P(o.onNetworkNumber("neuronEmissiveIntensityIdle",r))}),v(),g(100,"span",47),b(101),Ht(102,"number"),v()()()()(),g(103,"app-viz-settings-block",50)(104,"div",41)(105,"div",51)(106,"span",52),b(107,"Zwischenlagen kalt"),v(),g(108,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronHiddenCold",r))}),v()(),g(109,"div",51)(110,"span",52),b(111,"Zwischenlagen warm"),v(),g(112,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronHiddenHot",r))}),v()(),g(113,"div",51)(114,"span",52),b(115,"Eingabe kalt"),v(),g(116,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronInputCold",r))}),v()(),g(117,"div",51)(118,"span",52),b(119,"Eingabe warm"),v(),g(120,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronInputHot",r))}),v()(),g(121,"div",51)(122,"span",52),b(123,"Ausgabe kalt"),v(),g(124,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronOutputCold",r))}),v()(),g(125,"div",51)(126,"span",52),b(127,"Ausgabe warm"),v(),g(128,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("neuronOutputHot",r))}),v()()()(),g(129,"app-viz-settings-block",54)(130,"div",41)(131,"div",51)(132,"span",52),b(133,"Positiv schwach"),v(),g(134,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgePositiveCold",r))}),v()(),g(135,"div",51)(136,"span",52),b(137,"Positiv stark"),v(),g(138,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgePositiveHot",r))}),v()(),g(139,"div",51)(140,"span",52),b(141,"Negativ schwach"),v(),g(142,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgeNegativeCold",r))}),v()(),g(143,"div",51)(144,"span",52),b(145,"Negativ stark"),v(),g(146,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgeNegativeHot",r))}),v()(),g(147,"div",51)(148,"span",52),b(149,"Inferenz ausgeblendet"),v(),g(150,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgeInferMuted",r))}),v()(),g(151,"div",51)(152,"span",52),b(153,"Training (zuletzt)"),v(),g(154,"input",53),D("change",function(r){N(n);let o=E();return P(o.onNetworkColorHex("edgeTrainRecent",r))}),v()()()(),g(155,"app-viz-settings-block",55)(156,"div",56)(157,"label",57)(158,"span",58),b(159,"Bloom (Glow)"),v(),g(160,"input",59),D("change",function(r){N(n);let o=E();return P(o.onPostBool("bloomEnabled",r))}),v()(),g(161,"div",14)(162,"label",60),b(163,"Bloom-St\xE4rke"),v(),g(164,"div",24)(165,"input",61),D("input",function(r){N(n);let o=E();return P(o.onPostNumber("bloomStrength",r))}),v(),g(166,"span",62),b(167),Ht(168,"number"),v()()(),g(169,"div",14)(170,"label",60),b(171,"Bloom-Radius"),v(),g(172,"div",24)(173,"input",63),D("input",function(r){N(n);let o=E();return P(o.onPostNumber("bloomRadius",r))}),v(),g(174,"span",62),b(175),Ht(176,"number"),v()()(),g(177,"div",14)(178,"label",60),b(179,"Bloom-Schwelle"),v(),g(180,"div",24)(181,"input",63),D("input",function(r){N(n);let o=E();return P(o.onPostNumber("bloomThreshold",r))}),v(),g(182,"span",62),b(183),Ht(184,"number"),v()()(),g(185,"label",57)(186,"span",58),b(187,"FXAA (Kantengl\xE4ttung)"),v(),g(188,"input",59),D("change",function(r){N(n);let o=E();return P(o.onPostBool("fxaaEnabled",r))}),v()(),g(189,"div",14)(190,"label",60),b(191,"Belichtung (Tone mapping)"),v(),g(192,"div",24)(193,"input",64),D("input",function(r){N(n);let o=E();return P(o.onPostNumber("toneMappingExposure",r))}),v(),g(194,"span",62),b(195),Ht(196,"number"),v()()()()(),g(197,"app-viz-settings-block",65)(198,"div",66)(199,"label",67),b(200,"Vorlage f\xFCr Szene, Licht und Netzwerkfarben"),v(),g(201,"select",68),D("change",function(r){N(n);let o=E();return P(o.onColorPresetSelect(r))}),Ue(202,tk,2,0,"option",69),g(203,"option",70),b(204,"Wie App-Theme"),v(),lt(205,nk,2,2,"option",71,bi),v(),g(207,"p",72),b(208," Die Werte werden aus den DaisyUI-Theme-Variablen abgeleitet. Bei \u201EWie App-Theme\u201C aktualisiert sich die 3D-Palette automatisch, wenn du das App-Theme wechselst. "),v()()(),g(209,"app-viz-settings-block",73)(210,"div",41)(211,"div",42)(212,"label",74),b(213,"Hintergrund & Nebel"),v(),g(214,"input",75),D("input",function(r){N(n);let o=E();return P(o.onSceneColorInput("backgroundFog",r))})("change",function(r){N(n);let o=E();return P(o.onSceneColorCommit("backgroundFog",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(215,"div",42)(216,"label",76),b(217,"Boden"),v(),g(218,"input",77),D("input",function(r){N(n);let o=E();return P(o.onSceneColorInput("floor",r))})("change",function(r){N(n);let o=E();return P(o.onSceneColorCommit("floor",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()()()(),g(219,"app-viz-settings-block",78)(220,"div",41)(221,"div",42)(222,"label",79),b(223,"Hemisph\xE4re (oben)"),v(),g(224,"input",80),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("hemiSky",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("hemiSky",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(225,"div",42)(226,"label",81),b(227,"Hemisph\xE4re (unten)"),v(),g(228,"input",82),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("hemiGround",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("hemiGround",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(229,"div",42)(230,"label",83),b(231,"Umgebungslicht"),v(),g(232,"input",84),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("ambient",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("ambient",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(233,"div",42)(234,"label",85),b(235,"Key-Licht"),v(),g(236,"input",86),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("key",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("key",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(237,"div",42)(238,"label",87),b(239,"Fill-Licht"),v(),g(240,"input",88),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("fill",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("fill",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(241,"div",42)(242,"label",89),b(243,"Rim-Licht"),v(),g(244,"input",90),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("rim",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("rim",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()(),g(245,"div",42)(246,"label",91),b(247,"Akzent hinten"),v(),g(248,"input",92),D("input",function(r){N(n);let o=E();return P(o.onLightColorInput("backAccent",r))})("change",function(r){N(n);let o=E();return P(o.onLightColorCommit("backAccent",r))})("blur",function(){N(n);let r=E();return P(r.onVizColorPickerBlur())}),v()()()()()}if(t&2){let n=E();x(5),U("value",n.model().inputLayerLayout),x(17),U("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().inputLayerScale),x(2),et(gn(25,61,n.model().inputLayerScale,"1.0-2")),x(6),U("value",n.model().hiddenLayerLayouts[0]),x(15),U("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[0]),x(2),et(gn(48,64,n.model().hiddenLayerScales[0],"1.0-2")),x(6),U("value",n.model().hiddenLayerLayouts[1]),x(15),U("min",n.scaleMin)("max",n.scaleMax)("step",n.scaleStep)("value",n.model().hiddenLayerScales[1]),x(2),et(gn(71,67,n.model().hiddenLayerScales[1],"1.0-2")),x(7),U("min",n.neuronMulMin)("max",n.neuronMulMax)("step",n.neuronMulStep)("value",n.model().activeNeuronMaxScaleMul),x(2),et(gn(80,70,n.model().activeNeuronMaxScaleMul,"1.0-2")),x(7),U("value",n.model().networkColors.neuronEmissive),x(5),U("value",n.model().networkColors.neuronEmissiveIntensityActive),x(2),et(gn(94,73,n.model().networkColors.neuronEmissiveIntensityActive,"1.0-2")),x(6),U("value",n.model().networkColors.neuronEmissiveIntensityIdle),x(2),et(gn(102,76,n.model().networkColors.neuronEmissiveIntensityIdle,"1.0-2")),x(7),U("value",n.model().networkColors.neuronHiddenCold),x(4),U("value",n.model().networkColors.neuronHiddenHot),x(4),U("value",n.model().networkColors.neuronInputCold),x(4),U("value",n.model().networkColors.neuronInputHot),x(4),U("value",n.model().networkColors.neuronOutputCold),x(4),U("value",n.model().networkColors.neuronOutputHot),x(6),U("value",n.model().networkColors.edgePositiveCold),x(4),U("value",n.model().networkColors.edgePositiveHot),x(4),U("value",n.model().networkColors.edgeNegativeCold),x(4),U("value",n.model().networkColors.edgeNegativeHot),x(4),U("value",n.model().networkColors.edgeInferMuted),x(4),U("value",n.model().networkColors.edgeTrainRecent),x(6),U("checked",n.model().postProcess.bloomEnabled),x(5),U("value",n.model().postProcess.bloomStrength),x(2),et(gn(168,79,n.model().postProcess.bloomStrength,"1.0-2")),x(6),U("value",n.model().postProcess.bloomRadius),x(2),et(gn(176,82,n.model().postProcess.bloomRadius,"1.0-2")),x(6),U("value",n.model().postProcess.bloomThreshold),x(2),et(gn(184,85,n.model().postProcess.bloomThreshold,"1.0-2")),x(5),U("checked",n.model().postProcess.fxaaEnabled),x(5),U("value",n.model().postProcess.toneMappingExposure),x(2),et(gn(196,88,n.model().postProcess.toneMappingExposure,"1.0-2")),x(6),U("value",n.colorPresetSelectValue()),x(),He(n.model().colorPresetMode==="custom"?202:-1),x(3),ct(n.daisyThemeNames),x(9),U("value",n.model().sceneColors.backgroundFog),x(4),U("value",n.model().sceneColors.floor),x(6),U("value",n.model().lightColors.hemiSky),x(4),U("value",n.model().lightColors.hemiGround),x(4),U("value",n.model().lightColors.ambient),x(4),U("value",n.model().lightColors.key),x(4),U("value",n.model().lightColors.fill),x(4),U("value",n.model().lightColors.rim),x(4),U("value",n.model().lightColors.backAccent)}}function rk(t,e){if(t&1&&(g(0,"div",12)(1,"div",93),b(2),v(),xe(3,"canvas",94,1),v()),t&2){let n=E();x(2),ge(" ",n.fpsDisplay()," FPS ")}}var Pa=class t{static THEME_ROTATE_MS=4200;doc=S(Ve);store=S(de);ngZone=S(Ae);neuronalApp=S(tn);daisyThemeNames=[...Ti];vibeCameraOn=Pe(!0);themeRotateOn=Pe(!1);fpsOverlayOn=Pe(!1);fpsDisplay=Pe(0);fpsHistory=Pe([]);themeRotateTimer=null;themeRotateIndex=0;fpsSmoothingAnimationFrame=0;pendingFramesPerSecond=0;fpsSparklineCanvasRef=po("fpsSparkline");redrawFpsSparklineEffect=Fn(()=>{let e=this.fpsHistory(),n=this.fpsSparklineCanvasRef();n&&queueMicrotask(()=>this.drawFpsSparkline(n.nativeElement,e))});scaleMin=pg;scaleMax=mg;scaleStep=bw;model=ve(this.store.select(bm),{requireSync:!0});immersive=ve(this.store.select(va),{initialValue:!1});neuronMulMin=vg;neuronMulMax=yg;neuronMulStep=Sw;vizMountEl=po("vizMount");onVizFramesPerSecondSample=e=>{this.pendingFramesPerSecond=e,this.fpsSmoothingAnimationFrame===0&&(this.fpsSmoothingAnimationFrame=requestAnimationFrame(()=>{this.fpsSmoothingAnimationFrame=0;let n=this.pendingFramesPerSecond;this.ngZone.run(()=>{this.fpsOverlayOn()&&(this.fpsDisplay.set(Math.round(n)),this.fpsHistory.update(i=>{let r=[...i,n];return r.length>96?r.slice(-96):r}))})}))};onNetworkColorHex(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(w.vizNetworkColorsPatch({patch:{[e]:i.value}}))}onNetworkNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(w.vizNetworkColorsPatch({patch:{[e]:r}}))}onPostBool(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="checkbox"||this.store.dispatch(w.vizPostProcessPatch({patch:{[e]:i.checked}}))}onPostNumber(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(w.vizPostProcessPatch({patch:{[e]:r}}))}colorPresetSelectValue(){let e=this.model();return e.colorPresetMode==="custom"?"__custom__":e.colorPresetMode==="followUi"?"followUi":e.colorPresetFixedTheme}onColorPresetSelect(e){let n=e.target;if(!(n instanceof HTMLSelectElement))return;let i=n.value;if(i!=="__custom__"){if(i==="followUi"){this.store.dispatch(w.viz3dColorPresetModeChanged({mode:"followUi"}));return}Ii(i)&&this.store.dispatch(w.viz3dColorPresetModeChanged({mode:"fixedTheme",fixedTheme:i}))}}onInputLayout(e){let n=e.target;n instanceof HTMLSelectElement&&this.store.dispatch(w.vizInputLayerLayoutChanged({raw:n.value}))}onInputScale(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(w.vizInputLayerScaleChanged({scale:i}))}onHiddenLayout(e,n){let i=n.target;i instanceof HTMLSelectElement&&this.store.dispatch(w.vizHiddenLayerLayoutChanged({index:e,raw:i.value}))}onScale(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="range")return;let r=parseFloat(i.value);Number.isFinite(r)&&this.store.dispatch(w.vizHiddenLayerScaleChanged({index:e,scale:r}))}onActiveNeuronMaxMul(e){let n=e.target;if(!(n instanceof HTMLInputElement)||n.type!=="range")return;let i=parseFloat(n.value);Number.isFinite(i)&&this.store.dispatch(w.vizActiveNeuronMaxScaleMulChanged({mul:i}))}onSceneColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizSceneColor(e,r)})}onSceneColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(w.vizSceneColorChanged({key:e,color:i.value}))}onLightColorInput(e,n){let i=n.target;if(!(i instanceof HTMLInputElement)||i.type!=="color")return;let r=i.value;this.ngZone.runOutsideAngular(()=>{this.neuronalApp.previewVizLightColor(e,r)})}onLightColorCommit(e,n){let i=n.target;!(i instanceof HTMLInputElement)||i.type!=="color"||this.store.dispatch(w.vizLightColorChanged({key:e,color:i.value}))}onVizColorPickerBlur(){this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}ngOnDestroy(){this.clearFpsOverlayState(),this.clearThemeRotateTimer(),this.neuronalApp.cancelPendingVizColorPreviews();let e=this.model();this.neuronalApp.onVizSceneColorsApply(e.sceneColors),this.neuronalApp.onVizLightColorsApply(e.lightColors)}toggleImmersive(){this.store.dispatch(w.uiVizImmersiveToggled())}toggleVibeCamera(){let e=this.neuronalApp.toggleVibeCameraState(this.vibeCameraOn());e!==null&&this.vibeCameraOn.set(e)}toggleFpsOverlay(){if(this.fpsOverlayOn()){this.clearFpsOverlayState();return}this.fpsOverlayOn.set(!0),this.fpsHistory.set([]),this.fpsDisplay.set(0),this.neuronalApp.setVizFpsOverlay(!0,this.onVizFramesPerSecondSample)}clearFpsOverlayState(){this.neuronalApp.setVizFpsOverlay(!1,null),this.fpsOverlayOn.set(!1),this.fpsSmoothingAnimationFrame!==0&&(cancelAnimationFrame(this.fpsSmoothingAnimationFrame),this.fpsSmoothingAnimationFrame=0),this.fpsHistory.set([])}drawFpsSparkline(e,n){let i=Math.min(window.devicePixelRatio,2),r=112,o=32;e.width=Math.round(r*i),e.height=Math.round(o*i),e.style.width=`${r}px`,e.style.height=`${o}px`;let s=e.getContext("2d");if(!s)return;s.setTransform(i,0,0,i,0,0),s.clearRect(0,0,r,o);let a=2,l=r-a*2,c=o-a*2;if(n.length<2){s.fillStyle="rgba(148, 163, 184, 0.15)",s.fillRect(a,a,l,c);return}let u=n.reduce((m,_)=>_>m?_:m,48),d=Math.max(u*1.08,50),h=l/Math.max(1,n.length-1),f=m=>a+c-Math.min(d,Math.max(0,m))/d*c;s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((m,_)=>{s.lineTo(a+_*h,f(m))}),s.strokeStyle="rgba(148, 163, 184, 0.95)",s.lineWidth=1,s.lineJoin="round",s.stroke(),s.beginPath(),s.moveTo(a,f(n[0]??0)),n.forEach((m,_)=>{s.lineTo(a+_*h,f(m))}),s.lineTo(a+l,a+c),s.lineTo(a,a+c),s.closePath(),s.fillStyle="rgba(148, 163, 184, 0.14)",s.fill()}toggleThemeRotate(){if(this.themeRotateOn()){this.clearThemeRotateTimer(),this.themeRotateOn.set(!1);return}this.themeRotateOn.set(!0);let e=yr(this.doc),n=Ti.indexOf(e);this.themeRotateIndex=n>=0?n:0;let i=()=>{this.themeRotateIndex=(this.themeRotateIndex+1)%Ti.length;let r=Ti[this.themeRotateIndex];au(this.doc,r),this.ngZone.run(()=>{this.store.dispatch(w.daisyUiAppThemeChanged({theme:r}))})};this.themeRotateTimer=window.setInterval(i,t.THEME_ROTATE_MS)}clearThemeRotateTimer(){this.themeRotateTimer!==null&&(window.clearInterval(this.themeRotateTimer),this.themeRotateTimer=null)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-network-viz3d-shell"]],viewQuery:function(n,i){n&1&&(_o(i.fpsSparklineCanvasRef,QF,5),_o(i.vizMountEl,ek,5)),n&2&&yc(2)},hostAttrs:[1,"flex","min-h-0","min-w-0","flex-1","flex-col"],decls:16,vars:10,consts:[["vizMount",""],["fpsSparkline",""],[1,"relative","flex","min-h-0","min-w-0","flex-1","flex-row","bg-base-300/25"],["aria-label","3D-Netz Darstellung",1,"flex","max-h-full","min-h-0","w-[min(100%,22rem)]","max-w-[22rem]","shrink-0","flex-col","gap-3","overflow-y-auto","overflow-x-hidden","border-r","border-base-300","bg-base-200/90","px-3","py-3","text-base-content","shadow-md","backdrop-blur-md"],[1,"relative","grid","min-h-0","min-w-0","flex-1","grid-cols-1","grid-rows-[minmax(0,1fr)]"],["id","viz",1,"col-start-1","row-start-1","min-h-0","min-w-0","size-full","max-h-full"],[1,"pointer-events-none","col-start-1","row-start-1","z-10","relative","size-full"],[1,"pointer-events-auto","absolute","right-2","top-2","flex","flex-col","items-end","gap-2"],["type","button",1,"btn","btn-outline","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-secondary","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-accent","btn-sm","shadow-lg",3,"click"],["type","button",1,"btn","btn-ghost","btn-sm","border","border-base-300/80","bg-base-100/70","shadow-lg","backdrop-blur-sm",3,"click"],["aria-live","polite",1,"absolute","bottom-2","left-2","flex","max-w-[min(100%,12rem)]","flex-col","gap-1","rounded-box","border","border-base-300/60","bg-base-100/75","px-2","py-1.5","text-[0.68rem]","shadow-lg","backdrop-blur-md"],["heading","Eingabelayer"],[1,"min-w-0"],["for","inputLayerVizLayout",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","inputLayerVizLayout",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["value","pixels"],["value","ring"],["value","grid"],["value","line"],["value","arc"],["value","arcAlt"],["for","inputLayerVizScale",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],[1,"flex","min-w-0","items-center","gap-2"],["id","inputLayerVizScale","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],[1,"text-base-content/60","w-8","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["heading","Zwischenlage 1"],["for","hiddenLayerVizLayout0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout0",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale0",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale0","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Zwischenlage 2"],["for","hiddenLayerVizLayout1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizLayout1",1,"select","select-bordered","select-sm","w-full",3,"change","value"],["for","hiddenLayerVizScale1",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","hiddenLayerVizScale1","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Aktivit\xE4t"],["for","activeNeuronMaxMul",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","activeNeuronMaxMul","type","range",1,"range","range-primary","flex-1","min-w-0",3,"input","min","max","step","value"],["heading","Neuronen (Leuchten)"],[1,"flex","flex-col","gap-2.5"],[1,"flex","min-w-0","items-center","justify-between","gap-2"],["for","vizNeuronEmissive",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissive","type","color","title","Leuchtfarbe der Neuronen",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["for","vizNeuronEmissiveAct",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveAct","type","range","min","0.05","max","4","step","0.05",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-10","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["for","vizNeuronEmissiveIdle",1,"mb-1","block","w-full","text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizNeuronEmissiveIdle","type","range","min","0","max","2","step","0.02",1,"range","range-primary","flex-1","min-w-0",3,"input","value"],["heading","Neuronen (Aktivit\xE4t)"],[1,"flex","min-w-0","flex-wrap","items-center","justify-between","gap-2"],[1,"text-[0.65rem]","text-base-content/80"],["type","color",1,"border-base-300","bg-base-100","h-8","w-14","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"change","value"],["heading","Kanten (Gewichte)"],["heading","Nachbearbeitung"],[1,"flex","flex-col","gap-3"],[1,"flex","cursor-pointer","items-center","justify-between","gap-2"],[1,"text-[0.68rem]","font-medium","text-base-content"],["type","checkbox",1,"toggle","toggle-primary","toggle-sm",3,"change","checked"],[1,"mb-1","block","text-[0.65rem]","font-medium","text-base-content/90"],["type","range","min","0","max","3","step","0.02",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],[1,"text-base-content/60","w-9","shrink-0","text-right","text-[0.65rem]","tabular-nums"],["type","range","min","0","max","1","step","0.01",1,"range","range-secondary","flex-1","min-w-0",3,"input","value"],["type","range","min","0.2","max","3","step","0.02",1,"range","range-accent","flex-1","min-w-0",3,"input","value"],["heading","3D-Farbschema (DaisyUI)"],[1,"flex","flex-col","gap-2"],["for","viz3dColorPreset",1,"text-[0.68rem]","font-medium","text-base-content/90"],["id","viz3dColorPreset",1,"select","select-bordered","select-sm","w-full","max-w-full","text-sm",3,"change","value"],["value","__custom__","disabled",""],["value","followUi"],[3,"value"],[1,"text-[0.62rem]","leading-snug","text-base-content/55"],["heading","Szene & Umgebung"],["for","vizSceneBgFog",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneBgFog","type","color","title","Hintergrund und Nebelfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizSceneFloor",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizSceneFloor","type","color","title","Bodenfarbe",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["heading","Lichtfarben"],["for","vizLightHemiSky",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiSky","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightHemiGrd",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightHemiGrd","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightAmb",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightAmb","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightKey",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightKey","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightFill",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightFill","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightRim",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightRim","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],["for","vizLightBack",1,"text-[0.68rem]","font-medium","leading-snug","text-base-content"],["id","vizLightBack","type","color",1,"border-base-300","bg-base-100","h-9","w-[min(100%,4.5rem)]","shrink-0","cursor-pointer","rounded","border","p-0.5",3,"input","change","blur","value"],[1,"text-base-content/90","font-medium","tabular-nums","leading-none"],["width","112","height","32","aria-hidden","true",1,"block","h-8","w-28","max-w-full","rounded-sm"]],template:function(n,i){if(n&1){let r=zt();g(0,"div",2),Ue(1,ik,249,91,"aside",3),g(2,"div",4),xe(3,"div",5,0),g(5,"div",6)(6,"div",7)(7,"button",8),D("click",function(){return N(r),P(i.toggleImmersive())}),b(8),v(),g(9,"button",9),D("click",function(){return N(r),P(i.toggleVibeCamera())}),b(10),v(),g(11,"button",10),D("click",function(){return N(r),P(i.toggleThemeRotate())}),b(12),v(),g(13,"button",11),D("click",function(){return N(r),P(i.toggleFpsOverlay())}),b(14),v()(),Ue(15,rk,5,1,"div",12),v()()()}n&2&&(x(),He(i.immersive()?-1:1),x(6),se("aria-pressed",i.immersive()),x(),ge(" ",i.immersive()?"Leisten anzeigen":"Nur 3D"," "),x(),se("aria-pressed",i.vibeCameraOn()),x(),ge(" ",i.vibeCameraOn()?"Kamera-Vibe aus":"Kamera-Vibe"," "),x(),se("aria-pressed",i.themeRotateOn()),x(),ge(" ",i.themeRotateOn()?"Theme-Rotation aus":"Theme-Rotation"," "),x(),se("aria-pressed",i.fpsOverlayOn()),x(),ge(" ",i.fpsOverlayOn()?"FPS aus":"FPS an"," "),x(),He(i.fpsOverlayOn()?15:-1))},dependencies:[sp,Hu],encapsulation:2,changeDetection:0})};var Gu=class t{store=S(de);hp=ve(this.store.select(mm),{requireSync:!0});ui=ve(this.store.select(gm),{requireSync:!0});panel=ve(this.store.select(_m),{requireSync:!0});datasetRibbon=ve(this.store.select(dm),{requireSync:!0});activeTitle=ve(this.store.select(fm),{requireSync:!0});activeDetail=ve(this.store.select(hm),{requireSync:!0});epochHint=ve(this.store.select(pm),{requireSync:!0});saveAs(){this.store.dispatch(w.uiSaveAsRequested())}reset(){this.store.dispatch(w.uiResetRequested())}epochPreset(e){this.store.dispatch(w.uiEpochPresetRequested({epochs:e}))}epochsInput(e){let n=e.target.value;this.store.dispatch(w.uiEpochsInputChanged({raw:n}))}batchSizeInput(e){let n=e.target.value;this.store.dispatch(w.uiBatchSizeInputChanged({raw:n}))}lrInput(e){let n=e.target.value;this.store.dispatch(w.uiTrainLrInputChanged({raw:n}))}vizEveryInput(e){let n=e.target.value;this.store.dispatch(w.uiTrainVizEveryInputChanged({raw:n}))}trainStart(){this.store.dispatch(w.uiTrainStartRequested())}pauseToggle(){this.store.dispatch(w.trainingPauseToggled())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-training-panel"]],decls:48,vars:41,consts:[["id","dockTrain","aria-label","Training",1,"border-base-300","bg-base-200","rounded-box","flex","w-full","min-w-0","shrink-0","flex-wrap","items-center","gap-x-3","gap-y-2","border","px-3","py-2","shadow-sm"],["aria-live","polite",1,"text-base-content/70","max-w-[11rem]","truncate","text-xs","sm:max-w-[14rem]"],[1,"border-base-300/50","flex","min-w-0","max-w-[14rem]","flex-col","gap-0.5","border-l","pl-3","sm:max-w-[18rem]"],[1,"text-base-content","truncate","text-sm","font-semibold"],[1,"text-base-content/60","truncate","text-xs","leading-snug"],[1,"border-base-300/50","flex","flex-wrap","items-center","gap-2","border-l","pl-3"],["id","btnSaveModelAs","type","button","title","Als neuen Stand speichern",1,"btn","btn-outline","btn-xs","sm:btn-sm",3,"click","disabled"],["id","btnResetModel","type","button","title","Gewichte zur\xFCcksetzen",1,"btn","btn-ghost","btn-xs","sm:btn-sm",3,"click","disabled"],[1,"text-base-content/60","text-[0.65rem]","font-semibold","uppercase","tracking-wide"],["id","epochPresetRow",1,"join","join-horizontal","flex-wrap"],["type","button",1,"epochPresetBtn","btn","join-item","btn-outline","btn-xs","sm:btn-sm",3,"click","disabled"],["for","epochsInput",1,"sr-only"],["id","epochsInput","type","number","min","1","max","200","step","1",1,"input","input-bordered","input-xs","w-14","sm:input-sm","sm:w-16",3,"input","disabled","value"],["aria-live","polite",1,"text-base-content/60","hidden","max-w-[10rem]","truncate","text-[0.65rem]","lg:block","xl:max-w-[14rem]"],["id","btnTrain","type","button",1,"btn","btn-primary","btn-sm",3,"click","disabled"],["id","btnPause","type","button",1,"btn","btn-outline","btn-sm",3,"click","disabled"],["id","trainAdvanced",1,"border-base-300/60","bg-base-300/30","rounded-btn","border"],[1,"text-base-content/70","cursor-pointer","px-2","py-1.5","text-xs","sm:px-3","sm:py-2","sm:text-sm"],[1,"border-base-300/40","grid","grid-cols-2","gap-x-3","gap-y-2","border-t","px-2","pb-2","pt-2","text-sm","sm:px-3","sm:pb-3"],["for","lrInput",1,"text-base-content/60","self-center","text-xs"],["id","lrInput","type","number","min","0.0001","max","1","step","0.0001",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","batchSizeInput",1,"text-base-content/60","self-center","text-xs"],["id","batchSizeInput","type","number","min","1","max","512","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"],["for","vizEveryInput",1,"text-base-content/60","self-center","text-xs"],["id","vizEveryInput","type","number","min","1","max","1000","step","1",1,"input","input-bordered","input-sm","w-full",3,"input","disabled","value"]],template:function(n,i){n&1&&(g(0,"article",0)(1,"p",1),b(2),v(),g(3,"div",2)(4,"p",3),b(5),v(),g(6,"p",4),b(7),v()(),g(8,"div",5)(9,"button",6),D("click",function(){return i.saveAs()}),b(10," Speichern "),v(),g(11,"button",7),D("click",function(){return i.reset()}),b(12," Zur\xFCcksetzen "),v()(),g(13,"div",5)(14,"span",8),b(15,"Epochen"),v(),g(16,"div",9)(17,"button",10),D("click",function(){return i.epochPreset(1)}),b(18," 1 "),v(),g(19,"button",10),D("click",function(){return i.epochPreset(3)}),b(20," 3 "),v(),g(21,"button",10),D("click",function(){return i.epochPreset(10)}),b(22," 10 "),v(),g(23,"button",10),D("click",function(){return i.epochPreset(30)}),b(24," 30 "),v()(),g(25,"label",11),b(26,"Anzahl Epochen (1\u2013200)"),v(),g(27,"input",12),D("input",function(o){return i.epochsInput(o)}),v(),g(28,"p",13),b(29),v()(),g(30,"div",5)(31,"button",14),D("click",function(){return i.trainStart()}),b(32," Starten "),v(),g(33,"button",15),D("click",function(){return i.pauseToggle()}),b(34),v()(),g(35,"details",16)(36,"summary",17),b(37," Erweitert "),v(),g(38,"div",18)(39,"label",19),b(40,"Lernrate"),v(),g(41,"input",20),D("input",function(o){return i.lrInput(o)}),v(),g(42,"label",21),b(43,"Batch"),v(),g(44,"input",22),D("input",function(o){return i.batchSizeInput(o)}),v(),g(45,"label",23),b(46,"3D alle N Batches"),v(),g(47,"input",24),D("input",function(o){return i.vizEveryInput(o)}),v()()()()),n&2&&(x(),se("title",i.datasetRibbon()),x(),ge(" ",i.datasetRibbon()," "),x(3),ge(" ",i.activeTitle()," "),x(),se("title",i.activeDetail()),x(),ge(" ",i.activeDetail()," "),x(2),U("disabled",i.ui().saveDisabled),x(2),U("disabled",i.ui().resetDisabled),x(2),se("title",i.epochHint()),x(4),mt("btn-primary",i.hp().epochs===1)("btn-outline",i.hp().epochs!==1),U("disabled",i.ui().trainFormLocked),x(2),mt("btn-primary",i.hp().epochs===3)("btn-outline",i.hp().epochs!==3),U("disabled",i.ui().trainFormLocked),x(2),mt("btn-primary",i.hp().epochs===10)("btn-outline",i.hp().epochs!==10),U("disabled",i.ui().trainFormLocked),x(2),mt("btn-primary",i.hp().epochs===30)("btn-outline",i.hp().epochs!==30),U("disabled",i.ui().trainFormLocked),x(4),U("disabled",i.ui().trainFormLocked)("value",i.hp().epochs),x(),se("title",i.epochHint()),x(),ge(" ",i.epochHint()," "),x(2),U("disabled",i.ui().trainDisabled),x(2),U("disabled",i.ui().pauseDisabled),x(),ge(" ",i.panel().pause?"Weiter":"Pause"," "),x(7),U("disabled",i.ui().trainFormLocked)("value",i.hp().lr),x(3),U("disabled",i.ui().trainFormLocked)("value",i.hp().batchSize),x(3),U("disabled",i.ui().trainFormLocked)("value",i.hp().vizEveryNBatches))},encapsulation:2,changeDetection:0})};function Uw(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,'<span class="badge badge-primary badge-sm mx-0.5 font-semibold tabular-nums">$1</span>')}var ju=class t{sanitizer=S(vp);transform(e){return this.sanitizer.bypassSecurityTrustHtml(Uw(e??""))}static \u0275fac=function(n){return new(n||t)};static \u0275pipe=vc({name:"neuronalStatusRich",type:t,pure:!0})};var Wu=class t{store=S(de);statusPlain=ve(this.store.select(um),{requireSync:!0});static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-workspace-status"]],decls:5,vars:3,consts:[[1,"flex","w-full","min-w-0","flex-col","gap-2"],[1,"text-base-content/60","text-[0.62rem]","font-semibold","uppercase","tracking-widest"],["id","status","role","status","aria-live","polite","aria-atomic","true",1,"rounded-box","border-base-300","bg-base-300/30","font-mono","text-sm","leading-relaxed","tracking-tight","text-base-content/80","block","min-h-[2.5rem]","w-full","whitespace-pre-wrap","break-words","border","p-3","shadow-inner",3,"innerHTML"]],template:function(n,i){n&1&&(g(0,"div",0)(1,"span",1),b(2,"Aktueller Zustand"),v(),xe(3,"span",2),Ht(4,"neuronalStatusRich"),v()),n&2&&(x(3),U("innerHTML",mx(4,1,i.statusPlain()),u_))},dependencies:[ju],encapsulation:2,changeDetection:0})};function ok(t,e){t&1&&(g(0,"div",1)(1,"div",6),xe(2,"app-training-panel")(3,"app-workspace-status"),v()())}function sk(t,e){t&1&&(g(0,"section",5)(1,"div",7),xe(2,"app-infer-panel")(3,"app-epoch-track-list"),v()())}var $u=class t{vizShell;inferPanel;store=S(de);headerModel=ve(this.store.select(am),{initialValue:null});immersive=ve(this.store.select(va),{initialValue:!1});workspaceContentGridClass=xt(()=>this.immersive()?"grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)]":"grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] xl:grid-rows-[minmax(0,1fr)]");neuronalApp=S(tn);appInstance=S(Ni);router=S(Wt);teardown=null;bindGen=0;ngAfterViewInit(){this.bootstrapRuntime()}modelWorkspacePathMatches(){return Fw(this.router.url)}waitForModelWorkspaceRouterPath(e){return X(this,null,function*(){e===this.bindGen&&(this.modelWorkspacePathMatches()||(yield fs(this.router.events.pipe(he(n=>n instanceof Nt),he(()=>e===this.bindGen&&this.modelWorkspacePathMatches()),We(1)))))})}waitForRuntimeSurfaces(e){return X(this,null,function*(){let n=performance.now()+8e3;for(;;){if(e!==this.bindGen)throw new Error("aborted");let i=this.vizShell?.vizMountEl()?.nativeElement,r=this.inferPanel?.inferDrawCanvasEl()?.nativeElement;if(i&&r)return{vizMount:i,inferDrawCanvas:r};if(performance.now()>n)throw new Error("surfaces-timeout");yield new Promise(o=>requestAnimationFrame(()=>o()))}})}bootstrapRuntime(){return X(this,null,function*(){let e=++this.bindGen;try{if(yield this.waitForModelWorkspaceRouterPath(e),e!==this.bindGen)return;let n=yield this.waitForRuntimeSurfaces(e);if(e!==this.bindGen)return;let i=yield this.neuronalApp.bindRuntime(n,this.appInstance);if(e!==this.bindGen){i();return}this.teardown=i}catch{this.router.navigate(["/"])}})}ngOnDestroy(){this.bindGen++,this.teardown?.(),this.teardown=null}onDocumentPointerDown(e){let n=e.target;if(!(n instanceof Node))return;let i=document.getElementById("modelDropdownButton"),r=document.getElementById("modelDropdownMenu");i&&r&&(n===i||i.contains(n)||r.contains(n))||this.store.dispatch(w.modelDropdownSetOpen({open:!1}))}onDocumentKeydown(e){if(e.key==="Escape"){if(this.immersive()){this.store.dispatch(w.uiVizImmersiveToggled());return}this.store.dispatch(w.modelDropdownSetOpen({open:!1}))}}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-neuronal-workspace"]],viewQuery:function(n,i){if(n&1&&(Bs(Pa,5),Bs(Na,5)),n&2){let r;vo(r=yo())&&(i.vizShell=r.first),vo(r=yo())&&(i.inferPanel=r.first)}},hostBindings:function(n,i){n&1&&D("pointerdown",function(o){return i.onDocumentPointerDown(o)},!1,Rh)("keydown",function(o){return i.onDocumentKeydown(o)},!1,Rh)},decls:8,vars:16,consts:[["id","app",1,"bg-base-100","text-base-content","flex","min-h-0","flex-1","flex-col"],["role","region","aria-label","Modell-Arbeitsbereich",1,"border-base-300/60","bg-base-100","flex","shrink-0","flex-col","gap-2","border-b","px-3","py-2","sm:px-4","sm:py-3"],[1,"grid","h-full","min-h-0","min-w-0","grid-rows-[minmax(0,1fr)]","gap-3"],["aria-label","Netzwerk-Visualisierung",1,"flex","h-full","min-h-0","min-w-0","flex-col","overflow-hidden"],[1,"card-body","flex","min-h-0","flex-1","flex-col","p-0"],["aria-label","Epochen und Inferenz",1,"flex","min-h-0","flex-col","gap-3"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-col","min-h-0","gap-3","overflow-hidden"]],template:function(n,i){n&1&&(g(0,"div",0),Ue(1,ok,4,0,"div",1),g(2,"div")(3,"main",2)(4,"section",3)(5,"div",4),xe(6,"app-network-viz3d-shell"),v()()(),Ue(7,sk,4,0,"section",5),v()()),n&2&&(x(),He(i.immersive()?-1:1),x(),rx(i.workspaceContentGridClass()),x(2),mt("card",!i.immersive())("border-base-300",!i.immersive())("bg-base-200",!i.immersive())("rounded-box",!i.immersive())("border",!i.immersive())("shadow-xl",!i.immersive()),x(3),He(i.immersive()?-1:7))},dependencies:[Wu,Pa,Gu,Bu,Na],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}"]})};var Vw=[{path:"",component:uu,children:[{path:"",pathMatch:"full",component:Vu},{path:"model/new",pathMatch:"full",redirectTo:""},{path:"model/:modelId",canActivate:[kw],component:$u}]},{path:"**",redirectTo:""}];var Gw="@ngrx/router-store/request",VY=li(Gw,ie()),Eg="@ngrx/router-store/navigation",BY=li(Eg,ie()),Cg="@ngrx/router-store/cancel",zY=li(Cg,ie()),Tg="@ngrx/router-store/error",HY=li(Tg,ie()),jw="@ngrx/router-store/navigated",GY=li(jw,ie());function Ww(t,e){let n=e;switch(n.type){case Eg:case Tg:case Cg:return{state:n.payload.routerState,navigationId:n.payload.event.id};default:return t}}var qu=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:typeof e.routeConfig.title=="string"?e.routeConfig.title:void 0}:null,queryParams:e.queryParams,fragment:e.fragment,firstChild:n[0],children:n}}},Ig=function(t){return t[t.PreActivation=1]="PreActivation",t[t.PostActivation=2]="PostActivation",t}(Ig||{}),ak="router",Bw=new C("@ngrx/router-store Internal Configuration"),$w=new C("@ngrx/router-store Configuration"),Dg=function(t){return t[t.Full=0]="Full",t[t.Minimal=1]="Minimal",t}(Dg||{});function lk(t){return y({stateKey:ak,serializer:qu,navigationActionTiming:Ig.PreActivation},t)}var Xu=class{serialize(e){return{root:this.serializeRoute(e.root),url:e.url}}serializeRoute(e){let n=e.children.map(i=>this.serializeRoute(i));return{params:e.params,paramMap:e.paramMap,data:e.data,url:e.url,outlet:e.outlet,title:e.title,routeConfig:e.routeConfig?{component:e.routeConfig.component,path:e.routeConfig.path,pathMatch:e.routeConfig.pathMatch,redirectTo:e.routeConfig.redirectTo,outlet:e.routeConfig.outlet,title:e.routeConfig.title}:null,queryParams:e.queryParams,queryParamMap:e.queryParamMap,fragment:e.fragment,component:e.routeConfig?e.routeConfig.component:void 0,root:void 0,parent:void 0,firstChild:n[0],pathFromRoot:void 0,children:n}}},Yu=class{},Wn=function(t){return t[t.NONE=1]="NONE",t[t.ROUTER=2]="ROUTER",t[t.STORE=3]="STORE",t}(Wn||{}),zw=(()=>{class t{constructor(n,i,r,o,s,a){this.store=n,this.router=i,this.serializer=r,this.errorHandler=o,this.config=s,this.activeRuntimeChecks=a,this.lastEvent=null,this.routerState=null,this.trigger=Wn.NONE,this.stateKey=this.config.stateKey,!Qp()&&rr()&&(a?.strictActionSerializability||a?.strictStateSerializability)&&this.serializer instanceof Xu&&console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer."),this.setUpStoreStateListener(),this.setUpRouterEventsListener()}setUpStoreStateListener(){this.store.pipe(Kp(this.stateKey),ze(this.store)).subscribe(([n,i])=>{this.navigateIfNeeded(n,i)})}navigateIfNeeded(n,i){if(!n||!n.state||this.trigger===Wn.ROUTER||this.lastEvent instanceof Bn)return;let r=n.state.url;ck(this.router.url,r)||(this.storeState=i,this.trigger=Wn.STORE,this.router.navigateByUrl(r).catch(o=>{this.errorHandler.handleError(o)}))}setUpRouterEventsListener(){let n=this.config.navigationActionTiming===Ig.PostActivation,i;this.router.events.pipe(ze(this.store)).subscribe(([r,o])=>{this.lastEvent=r,r instanceof Bn?(this.routerState=this.serializer.serialize(this.router.routerState.snapshot),this.trigger!==Wn.STORE&&(this.storeState=o,this.dispatchRouterRequest(r))):r instanceof Ei?(i=r,!n&&this.trigger!==Wn.STORE&&this.dispatchRouterNavigation(r)):r instanceof Jt?(this.dispatchRouterCancel(r),this.reset()):r instanceof si?(this.dispatchRouterError(r),this.reset()):r instanceof Nt&&(this.trigger!==Wn.STORE&&(n&&this.dispatchRouterNavigation(i),this.dispatchRouterNavigated(r)),this.reset())})}dispatchRouterRequest(n){this.dispatchRouterAction(Gw,{event:n})}dispatchRouterNavigation(n){let i=this.serializer.serialize(n.state);this.dispatchRouterAction(Eg,{routerState:i,event:new Ei(n.id,n.url,n.urlAfterRedirects,i)})}dispatchRouterCancel(n){this.dispatchRouterAction(Cg,{storeState:this.storeState,event:n})}dispatchRouterError(n){this.dispatchRouterAction(Tg,{storeState:this.storeState,event:new si(n.id,n.url,`${n}`)})}dispatchRouterNavigated(n){let i=this.serializer.serialize(this.router.routerState.snapshot);this.dispatchRouterAction(jw,{event:n,routerState:i})}dispatchRouterAction(n,i){this.trigger=Wn.ROUTER;try{this.store.dispatch({type:n,payload:M(y({routerState:this.routerState},i),{event:this.config.routerState===Dg.Full?i.event:{id:i.event.id,url:i.event.url,urlAfterRedirects:i.event.urlAfterRedirects}})})}finally{this.trigger=Wn.NONE}}reset(){this.trigger=Wn.NONE,this.storeState=null,this.routerState=null}static{this.\u0275fac=function(i){return new(i||t)(O(de),O(Wt),O(Yu),O(yt),O($w),O(fr))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})();function ck(t,e){return Hw(t)===Hw(e)}function Hw(t){return t?.length>0&&t[t.length-1]==="/"?t.substring(0,t.length-1):t}function qw(t={}){return It([{provide:Bw,useValue:t},{provide:$w,useFactory:lk,deps:[Bw]},{provide:Yu,useClass:t.serializer?t.serializer:t.routerState===Dg.Full?Xu:qu},Qi(()=>S(zw)),zw])}var Oa="PERFORM_ACTION",uk="REFRESH",Qw="RESET",eM="ROLLBACK",tM="COMMIT",nM="SWEEP",iM="TOGGLE_ACTION",dk="SET_ACTIONS_ACTIVE",rM="JUMP_TO_STATE",oM="JUMP_TO_ACTION",Hg="IMPORT_STATE",sM="LOCK_CHANGES",aM="PAUSE_RECORDING",qo=class{constructor(e,n){if(this.action=e,this.timestamp=n,this.type=Oa,typeof e.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Ag=class{constructor(){this.type=uk}},Rg=class{constructor(e){this.timestamp=e,this.type=Qw}},Ng=class{constructor(e){this.timestamp=e,this.type=eM}},Pg=class{constructor(e){this.timestamp=e,this.type=tM}},Lg=class{constructor(){this.type=nM}},Og=class{constructor(e){this.id=e,this.type=iM}};var Fg=class{constructor(e){this.index=e,this.type=rM}},kg=class{constructor(e){this.actionId=e,this.type=oM}},Ug=class{constructor(e){this.nextLiftedState=e,this.type=Hg}},Vg=class{constructor(e){this.status=e,this.type=sM}},Bg=class{constructor(e){this.status=e,this.type=aM}};var Qu=new C("@ngrx/store-devtools Options"),Xw=new C("@ngrx/store-devtools Initial Config");function lM(){return null}var fk="NgRx Store DevTools";function hk(t){let e={maxAge:!1,monitor:lM,actionSanitizer:void 0,stateSanitizer:void 0,name:fk,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},n=typeof t=="function"?t():t,i=n.logOnly?{pause:!0,export:!0,test:!0}:!1,r=n.features||i||e.features;r.import===!0&&(r.import="custom");let o=Object.assign({},e,{features:r},n);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function Yw(t,e){return t.filter(n=>e.indexOf(n)<0)}function cM(t){let{computedStates:e,currentStateIndex:n}=t;if(n>=e.length){let{state:r}=e[e.length-1];return r}let{state:i}=e[n];return i}function La(t){return new qo(t,+Date.now())}function pk(t,e){return Object.keys(e).reduce((n,i)=>{let r=Number(i);return n[r]=uM(t,e[r],r),n},{})}function uM(t,e,n){return M(y({},e),{action:t(e.action,n)})}function mk(t,e){return e.map((n,i)=>({state:dM(t,n.state,i),error:n.error}))}function dM(t,e,n){return t(e,n)}function fM(t){return t.predicate||t.actionsSafelist||t.actionsBlocklist}function gk(t,e,n,i){let r=[],o={},s=[];return t.stagedActionIds.forEach((a,l)=>{let c=t.actionsById[a];c&&(l&&Gg(t.computedStates[l],c,e,n,i)||(o[a]=c,r.push(a),s.push(t.computedStates[l])))}),M(y({},t),{stagedActionIds:r,actionsById:o,computedStates:s})}function Gg(t,e,n,i,r){let o=n&&!n(t,e.action),s=i&&!e.action.type.match(i.map(l=>Zw(l)).join("|")),a=r&&e.action.type.match(r.map(l=>Zw(l)).join("|"));return o||s||a}function Zw(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function hM(t){return{ngZone:t?S(Ae):null,connectInZone:t}}var ed=(()=>{class t extends zn{static{this.\u0275fac=(()=>{let n;return function(r){return(n||(n=nr(t)))(r||t)}})()}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),Zu={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},zg=new C("@ngrx/store-devtools Redux Devtools Extension"),pM=(()=>{class t{constructor(n,i,r){this.config=i,this.dispatcher=r,this.zoneConfig=hM(this.config.connectInZone),this.devtoolsExtension=n,this.createActionStreams()}notify(n,i){if(this.devtoolsExtension)if(n.type===Oa){if(i.isLocked||i.isPaused)return;let r=cM(i);if(fM(this.config)&&Gg(r,n,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let o=this.config.stateSanitizer?dM(this.config.stateSanitizer,r,i.currentStateIndex):r,s=this.config.actionSanitizer?uM(this.config.actionSanitizer,n,i.nextActionId):n;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,o))}else{let r=M(y({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?pk(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?mk(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new le(n=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(r=>n.next(r)),i.unsubscribe}):ke}createActionStreams(){let n=this.createChangesObservable().pipe(Vd()),i=n.pipe(he(c=>c.type===Zu.START)),r=n.pipe(he(c=>c.type===Zu.STOP)),o=n.pipe(he(c=>c.type===Zu.DISPATCH),G(c=>this.unwrapAction(c.payload)),Et(c=>c.type===Hg?this.dispatcher.pipe(he(u=>u.type===ru),Rd(1e3),Br(1e3),G(()=>c),Xt(()=>q(c)),We(1)):q(c))),a=n.pipe(he(c=>c.type===Zu.ACTION),G(c=>this.unwrapAction(c.payload))).pipe(zi(r)),l=o.pipe(zi(r));this.start$=i.pipe(zi(r)),this.actions$=this.start$.pipe(st(()=>a)),this.liftedActions$=this.start$.pipe(st(()=>l))}unwrapAction(n){return typeof n=="string"?(0,eval)(`(${n})`):n}getExtensionConfig(n){let i={name:n.name,features:n.features,serialize:n.serialize,autoPause:n.autoPause??!1,trace:n.trace??!1,traceLimit:n.traceLimit??75};return n.maxAge!==!1&&(i.maxAge=n.maxAge),i}sendToReduxDevtools(n){try{n()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}static{this.\u0275fac=function(i){return new(i||t)(O(zg),O(Qu),O(ed))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})(),Ju={type:pa},vk="@ngrx/store-devtools/recompute",yk={type:vk};function mM(t,e,n,i,r){if(i)return{state:n,error:"Interrupted by an error up the chain"};let o=n,s;try{o=t(n,e)}catch(a){s=a.toString(),r.handleError(a)}return{state:o,error:s}}function Ku(t,e,n,i,r,o,s,a,l){if(e>=t.length&&t.length===o.length)return t;let c=t.slice(0,e),u=o.length-(l?1:0);for(let d=e;d<u;d++){let h=o[d],f=r[h].action,m=c[d-1],_=m?m.state:i,T=m?m.error:void 0,B=s.indexOf(h)>-1?m:mM(n,f,_,T,a);c.push(B)}return l&&c.push(t[t.length-1]),c}function _k(t,e){return{monitorState:e(void 0,{}),nextActionId:1,actionsById:{0:La(Ju)},stagedActionIds:[0],skippedActionIds:[],committedState:t,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function xk(t,e,n,i,r={}){return o=>(s,a)=>{let{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:h,committedState:f,currentStateIndex:m,computedStates:_,isLocked:T,isPaused:I}=s||e;s||(c=Object.create(c));function B(L){let A=L,fe=d.slice(1,A+1);for(let Te=0;Te<fe.length;Te++)if(_[Te+1].error){A=Te,fe=d.slice(1,A+1);break}else delete c[fe[Te]];h=h.filter(Te=>fe.indexOf(Te)===-1),d=[0,...d.slice(A+1)],f=_[A].state,_=_.slice(A),m=m>A?m-A:0}function Y(){c={0:La(Ju)},u=1,d=[0],h=[],f=_[m].state,m=0,_=[]}let k=0;switch(a.type){case sM:{T=a.status,k=1/0;break}case aM:{I=a.status,I?(d=[...d,u],c[u]=new qo({type:"@ngrx/devtools/pause"},+Date.now()),u++,k=d.length-1,_=_.concat(_[_.length-1]),m===d.length-2&&m++,k=1/0):Y();break}case Qw:{c={0:La(Ju)},u=1,d=[0],h=[],f=t,m=0,_=[];break}case tM:{Y();break}case eM:{c={0:La(Ju)},u=1,d=[0],h=[],m=0,_=[];break}case iM:{let{id:L}=a;h.indexOf(L)===-1?h=[L,...h]:h=h.filter(fe=>fe!==L),k=d.indexOf(L);break}case dk:{let{start:L,end:A,active:fe}=a,Te=[];for(let Qe=L;Qe<A;Qe++)Te.push(Qe);fe?h=Yw(h,Te):h=[...h,...Te],k=d.indexOf(L);break}case rM:{m=a.index,k=1/0;break}case oM:{let L=d.indexOf(a.actionId);L!==-1&&(m=L),k=1/0;break}case nM:{d=Yw(d,h),h=[],m=Math.min(m,d.length-1);break}case Oa:{if(T)return s||e;if(I||s&&Gg(s.computedStates[m],a,r.predicate,r.actionsSafelist,r.actionsBlocklist)){let A=_[_.length-1];_=[..._.slice(0,-1),mM(o,a.action,A.state,A.error,n)],k=1/0;break}r.maxAge&&d.length===r.maxAge&&B(1),m===d.length-1&&m++;let L=u++;c[L]=a,d=[...d,L],k=d.length-1;break}case Hg:{({monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:h,committedState:f,currentStateIndex:m,computedStates:_,isLocked:T,isPaused:I}=a.nextLiftedState);break}case pa:{k=0,r.maxAge&&d.length>r.maxAge&&(_=Ku(_,k,o,f,c,d,h,n,I),B(d.length-r.maxAge),k=1/0);break}case ru:{if(_.filter(A=>A.error).length>0)k=0,r.maxAge&&d.length>r.maxAge&&(_=Ku(_,k,o,f,c,d,h,n,I),B(d.length-r.maxAge),k=1/0);else{if(!I&&!T){m===d.length-1&&m++;let A=u++;c[A]=new qo(a,+Date.now()),d=[...d,A],k=d.length-1,_=Ku(_,k,o,f,c,d,h,n,I)}_=_.map(A=>M(y({},A),{state:o(A.state,yk)})),m=d.length-1,r.maxAge&&d.length>r.maxAge&&B(d.length-r.maxAge),k=1/0}break}default:{k=1/0;break}}return _=Ku(_,k,o,f,c,d,h,n,I),l=i(l,a),{monitorState:l,actionsById:c,nextActionId:u,stagedActionIds:d,skippedActionIds:h,committedState:f,currentStateIndex:m,computedStates:_,isLocked:T,isPaused:I}}}var Kw=(()=>{class t{constructor(n,i,r,o,s,a,l,c){let u=_k(l,c.monitor),d=xk(l,u,a,c.monitor,c),h=Ui(Ui(i.asObservable().pipe(Gr(1)),o.actions$).pipe(G(La)),n,o.liftedActions$).pipe(an(ds)),f=r.pipe(G(d)),m=hM(c.connectInZone),_=new cs(1);this.liftedStateSubscription=h.pipe(ze(f),Jw(m),Bi(({state:B},[Y,k])=>{let L=k(B,Y);return Y.type!==Oa&&fM(c)&&(L=gk(L,c.predicate,c.actionsSafelist,c.actionsBlocklist)),o.notify(Y,L),{state:L,action:Y}},{state:u,action:null})).subscribe(({state:B,action:Y})=>{if(_.next(B),Y.type===Oa){let k=Y.action;s.next(k)}}),this.extensionStartSubscription=o.start$.pipe(Jw(m)).subscribe(()=>{this.refresh()});let T=_.asObservable(),I=T.pipe(G(cM));Object.defineProperty(I,"state",{value:ve(I,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=n,this.liftedState=T,this.state=I}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(n){this.dispatcher.next(n)}next(n){this.dispatcher.next(n)}error(n){}complete(){}performAction(n){this.dispatch(new qo(n,+Date.now()))}refresh(){this.dispatch(new Ag)}reset(){this.dispatch(new Rg(+Date.now()))}rollback(){this.dispatch(new Ng(+Date.now()))}commit(){this.dispatch(new Pg(+Date.now()))}sweep(){this.dispatch(new Lg)}toggleAction(n){this.dispatch(new Og(n))}jumpToAction(n){this.dispatch(new kg(n))}jumpToState(n){this.dispatch(new Fg(n))}importState(n){this.dispatch(new Ug(n))}lockChanges(n){this.dispatch(new Vg(n))}pauseRecording(n){this.dispatch(new Bg(n))}static{this.\u0275fac=function(i){return new(i||t)(O(ed),O(zn),O(hr),O(pM),O(pr),O(yt),O(ma),O(Qu))}}static{this.\u0275prov=F({token:t,factory:t.\u0275fac})}}return t})();function Jw({ngZone:t,connectInZone:e}){return n=>e?new le(i=>n.subscribe({next:r=>t.run(()=>i.next(r)),error:r=>t.run(()=>i.error(r)),complete:()=>t.run(()=>i.complete())})):n}var bk=new C("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function Sk(t,e){return!!t||e.monitor!==lM}function wk(){let t="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[t]<"u"?window[t]:null}function Mk(t){return t.state}function gM(t={}){return It([pM,ed,Kw,{provide:Xw,useValue:t},{provide:bk,deps:[zg,Qu],useFactory:Sk},{provide:zg,useFactory:wk},{provide:Qu,deps:[Xw],useFactory:hk},{provide:Fo,deps:[Kw],useFactory:Mk},{provide:Oo,useExisting:ed}])}var Ek=new di,vM=t=>(e,n)=>{let i=t(e,n);return(n.type===w.modelStoreHydrated.type||n.type===w.modelEntryUpserted.type||n.type===w.activeModelIdSet.type||n.type===w.activeModelIdFromRouteSet.type)&&Ek.saveCollection(i.neuronal.modelCollection),i};function Ft(t){return Math.max(0,Math.min(255,Math.round(t)))}function Xo(t){let e=t.trim();return e.endsWith("%")?Ft(parseFloat(e)/100*255):Ft(parseFloat(e))}function Ck(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);if(n){let o=Xo(n[1]),s=Xo(n[2]),a=Xo(n[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let i=e.match(/^rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*([\d.%]+))?\s*\)$/i);if(i){let o=Xo(i[1]),s=Xo(i[2]),a=Xo(i[3]);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}let r=e.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);if(r){let o=Ft(parseFloat(r[1])*255),s=Ft(parseFloat(r[2])*255),a=Ft(parseFloat(r[3])*255);return`#${((1<<24)+(o<<16)+(s<<8)+a).toString(16).slice(1)}`}return/^#[0-9A-Fa-f]{6}$/i.test(e)?e.toLowerCase():/^#[0-9A-Fa-f]{8}$/i.test(e)?e.slice(0,7).toLowerCase():null}function Tk(t,e){let n=e.trim();if(!n)return null;let i=t.createElement("canvas");i.width=1,i.height=1;let r=i.getContext("2d",{willReadFrequently:!0});if(!r)return null;try{r.clearRect(0,0,1,1),r.fillStyle=n,r.fillRect(0,0,1,1);let o=r.getImageData(0,0,1,1).data;if(o[3]<16)return null;let s=o[0],a=o[1],l=o[2];return`#${((1<<24)+(s<<16)+(a<<8)+l).toString(16).slice(1)}`}catch{return null}}function yM(t,e){let n=e.trim();if(!n)return null;let i=Ck(n);return i||Tk(t,n)}function j(t,e,n){let i=parseInt(t.slice(1),16),r=parseInt(e.slice(1),16),o=i>>16&255,s=i>>8&255,a=i&255,l=r>>16&255,c=r>>8&255,u=r&255,d=Math.max(0,Math.min(1,n)),h=Ft(o+(l-o)*d),f=Ft(s+(c-s)*d),m=Ft(a+(u-a)*d);return`#${((1<<24)+(h<<16)+(f<<8)+m).toString(16).slice(1)}`}function wt(t,e){let n=parseInt(t.slice(1),16),i=(n>>16&255)*e,r=(n>>8&255)*e,o=(n&255)*e;return`#${((1<<24)+(Ft(i)<<16)+(Ft(r)<<8)+Ft(o)).toString(16).slice(1)}`}function nn(t,e){let n=parseInt(t.slice(1),16),i=Ft((n>>16&255)+(255-(n>>16&255))*e),r=Ft((n>>8&255)+(255-(n>>8&255))*e),o=Ft((n&255)+(255-(n&255))*e);return`#${((1<<24)+(i<<16)+(r<<8)+o).toString(16).slice(1)}`}function Yo(t,e,n){return j(t,e,Math.max(0,Math.min(1,n)))}function qt(t,e,n){let i=t.body;if(!i)return"#808080";let r=t.createElement("div");r.setAttribute("data-theme",e),r.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none",r.style.color=`var(${n})`,i.appendChild(r);let o=t.defaultView?.getComputedStyle(r),s=o?yM(t,o.color):null,a=o?.getPropertyValue(n).trim()??"",l=a?yM(t,a):null;return i.removeChild(r),s??l??"#808080"}function Ik(t,e){let n=t,i=e;Vo(n.backgroundFog)<.06&&(n=M(y({},n),{backgroundFog:nn(n.backgroundFog,.2),floor:nn(n.floor,.16)}));let o=Vo(n.backgroundFog),s=Vo(i.neuronEmissive);return o<.16&&s<.16&&Math.abs(o-s)<.048&&(i=wa(i,{neuronEmissive:nn(i.neuronEmissive,.38),neuronHiddenCold:nn(i.neuronHiddenCold,.38*.85),neuronHiddenHot:nn(i.neuronHiddenHot,.38*.45),neuronInputCold:nn(i.neuronInputCold,.38*.85),neuronOutputCold:nn(i.neuronOutputCold,.38*.75),edgeInferMuted:nn(i.edgeInferMuted,.38*.55)})),{sceneColors:n,networkColors:i}}function _M(t,e){let n=qt(t,e,"--color-base-100"),i=qt(t,e,"--color-base-200"),r=qt(t,e,"--color-base-300"),o=qt(t,e,"--color-base-content"),s=qt(t,e,"--color-primary"),a=qt(t,e,"--color-primary-content"),l=qt(t,e,"--color-secondary"),c=qt(t,e,"--color-accent"),u=qt(t,e,"--color-info"),d=qt(t,e,"--color-warning"),h=qt(t,e,"--color-error"),f=qt(t,e,"--color-neutral"),m=qt(t,e,"--color-neutral-content"),_=Vo(n),T=Vo(o),I=_<.38&&T>_+.12,B=I?{backgroundFog:Yo(j(r,i,.35),j(r,s,.14),.55),floor:Yo(j(r,i,.5),j(r,f,.12),.35)}:{backgroundFog:wt(Yo(j(j(r,o,.26),j(r,f,.14),.52),j(s,o,.55),.14),.9),floor:wt(j(j(r,o,.2),j(r,j(f,s,.08),.35),.48),.93)},Y=I?{hemiSky:Yo(j(n,j(n,u,.22),.55),s,.12),hemiGround:j(r,j(i,f,.18),.42),ambient:j(j(r,i,.35),j(o,s,.1),.5),key:Yo(j(s,a,.38),n,.22),fill:j(j(l,r,.45),j(l,u,.15),.35),rim:j(c,j(n,c,.55),.4),backAccent:j(u,j(s,m,.25),.35)}:{hemiSky:wt(Yo(j(j(r,o,.12),j(i,r,.55),.38),j(u,s,.4),.2),.94),hemiGround:wt(j(r,j(f,j(o,r,.25),.28),.5),.92),ambient:wt(j(j(r,o,.18),j(f,j(s,r,.1),.15),.45),.93),key:wt(j(s,j(a,r,.42),.45),.94),fill:wt(j(l,j(r,j(u,o,.12),.28),.42),.93),rim:wt(j(c,j(r,j(l,o,.12),.3),.4),.93),backAccent:wt(j(u,j(r,j(c,s,.22),.24),.38),.92)},k=I?{toneMappingExposure:Sr.toneMappingExposure,bloomStrength:Sr.bloomStrength,bloomThreshold:Sr.bloomThreshold,bloomRadius:Sr.bloomRadius}:{toneMappingExposure:.78,bloomStrength:.14,bloomThreshold:.62,bloomRadius:.32},L=wa(Sa,{neuronEmissive:s,neuronHiddenCold:wt(s,.72),neuronHiddenHot:nn(j(s,c,.45),.35),neuronInputCold:wt(s,.75),neuronInputHot:nn(o,.45),neuronOutputCold:wt(j(s,u,.35),.82),neuronOutputHot:nn(j(c,u,.5),.25),edgePositiveCold:wt(d,.42),edgePositiveHot:d,edgeNegativeCold:wt(u,.38),edgeNegativeHot:nn(u,.18),edgeInferMuted:wt(j(r,o,.3),.55),edgeTrainRecent:j(d,h,.35)}),{sceneColors:A,networkColors:fe}=Ik(B,L);return{sceneColors:A,lightColors:Y,networkColors:fe,postProcessPatch:k}}function jg(t,e){let n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=t,r.rel="noopener",document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(i)}var td=class t{store=S(de);actions$=S(fu);zone=S(Ae);doc=S(Ve);app=S(Ni);neuronalApp=S(tn);modelsIdb=S(di);epochsIdb=S(br);viz3dBootstrapDaisySync$=Ee(()=>q(w.viz3dColorsSyncFromDaisyRequested()));viz3dDaisyPaletteSync$=Ee(()=>this.actions$.pipe(Ce(w.daisyUiAppThemeChanged,w.viz3dColorsSyncFromDaisyRequested,w.viz3dColorPresetModeChanged),ze(this.store.select(Hn)),Fe(([e,n])=>{if(n.viz3d.colorPresetMode==="custom")return ke;if("theme"in e&&n.viz3d.colorPresetMode!=="followUi")return ke;let i=n.viz3d.colorPresetMode==="fixedTheme"?n.viz3d.colorPresetFixedTheme:"theme"in e?e.theme:yr(this.doc),r=_M(this.doc,i);return q(w.viz3dDaisyPaletteApplied({sceneColors:r.sceneColors,lightColors:r.lightColors,networkColors:r.networkColors,postProcessPatch:r.postProcessPatch}))})));viz3dDaisyPaletteAppliedToRuntime$=Ee(()=>this.actions$.pipe(Ce(w.viz3dDaisyPaletteApplied),ze(this.store.select(Hn)),J(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors),this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors),this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors),this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});modelStoreFromIdbLoad$=Ee(()=>this.actions$.pipe(Ce(w.modelStoreLoadRequested),Vi(()=>Oe(X(this,null,function*(){Nw(),IS(),yield AS();let[e,n]=yield Promise.all([this.modelsIdb.loadCollection(),this.epochsIdb.loadEpochStore()]);return{modelCollection:e,epochStore:n}})).pipe(st(({modelCollection:e,epochStore:n})=>q(w.epochStoreHydrated({byModelId:y({},n.byModelId)}),w.modelStoreHydrated({modelCollection:e})))))));newModelFromToolbar$=Ee(()=>this.actions$.pipe(Ce(w.newModelFromToolbarRequested),ze(this.store.select(ci)),he(([,e])=>!e),J(()=>{this.app.newModelFromToolbar()})),{dispatch:!1});newModelFromListRequested$=Ee(()=>this.actions$.pipe(Ce(w.newModelFromListRequested),ze(this.store.select(ci)),he(([,e])=>!e),Et(()=>{let e=vu();return Oe([w.lastTrainMetricsReset(),w.modelEntryUpserted({entry:e}),w.epochViewSyncFromModel({modelId:e.id})])})));activeModelFromToolbar$=Ee(()=>this.actions$.pipe(Ce(w.activeModelFromToolbarRequested),ze(this.store.select(ci)),he(([e,n])=>!n&&e.id.length>0),an(Xn),J(([e])=>{this.app.activeModelFromToolbar(e.id)})),{dispatch:!1});uiTrainStart$=Ee(()=>this.actions$.pipe(Ce(w.uiTrainStartRequested),J(()=>{this.neuronalApp.onTrain()})),{dispatch:!1});uiSaveAs$=Ee(()=>this.actions$.pipe(Ce(w.uiSaveAsRequested),J(()=>{this.neuronalApp.onSaveAs()})),{dispatch:!1});uiReset$=Ee(()=>this.actions$.pipe(Ce(w.uiResetRequested),J(()=>{this.neuronalApp.onReset()})),{dispatch:!1});uiInferRandom$=Ee(()=>this.actions$.pipe(Ce(w.uiInferRandomRequested),J(()=>{this.neuronalApp.onInferRandom()})),{dispatch:!1});uiInferDraw$=Ee(()=>this.actions$.pipe(Ce(w.uiInferDrawRequested),J(()=>{this.neuronalApp.onInferDraw()})),{dispatch:!1});uiClearDraw$=Ee(()=>this.actions$.pipe(Ce(w.uiClearDrawRequested),J(()=>{this.neuronalApp.onClearDraw()})),{dispatch:!1});uiDrawPointerDown$=Ee(()=>this.actions$.pipe(Ce(w.uiDrawPointerDown),J(({event:e})=>{this.neuronalApp.onDrawPointerDown(e)})),{dispatch:!1});uiDrawPointerMove$=Ee(()=>this.actions$.pipe(Ce(w.uiDrawPointerMove),J(({event:e})=>{this.neuronalApp.onDrawPointerMove(e)})),{dispatch:!1});uiDrawPointerUp$=Ee(()=>this.actions$.pipe(Ce(w.uiDrawPointerUp),J(()=>{this.neuronalApp.onDrawPointerUp()})),{dispatch:!1});uiDrawPointerCancel$=Ee(()=>this.actions$.pipe(Ce(w.uiDrawPointerCancel),J(()=>{this.neuronalApp.onDrawPointerCancel()})),{dispatch:!1});uiDrawPointerLeave$=Ee(()=>this.actions$.pipe(Ce(w.uiDrawPointerLeave),J(()=>{this.neuronalApp.onDrawPointerLeave()})),{dispatch:!1});vizInputLayerLayout$=Ee(()=>this.actions$.pipe(Ce(w.vizInputLayerLayoutChanged),J(({raw:e})=>{this.neuronalApp.onInputLayerLayoutChange(e)})),{dispatch:!1});vizInputLayerScale$=Ee(()=>this.actions$.pipe(Ce(w.vizInputLayerScaleChanged),J(({scale:e})=>{this.neuronalApp.onInputLayerLayoutScaleChange(e)})),{dispatch:!1});vizHiddenLayerLayout$=Ee(()=>this.actions$.pipe(Ce(w.vizHiddenLayerLayoutChanged),J(({index:e,raw:n})=>{this.neuronalApp.onHiddenLayerLayoutChange(e,n)})),{dispatch:!1});vizHiddenLayerScale$=Ee(()=>this.actions$.pipe(Ce(w.vizHiddenLayerScaleChanged),J(({index:e,scale:n})=>{this.neuronalApp.onHiddenLayerLayoutScaleChange(e,n)})),{dispatch:!1});vizActiveNeuronMaxScaleMul$=Ee(()=>this.actions$.pipe(Ce(w.vizActiveNeuronMaxScaleMulChanged),J(({mul:e})=>{this.neuronalApp.onActiveNeuronMaxScaleMulChange(e)})),{dispatch:!1});vizSceneColor$=Ee(()=>this.actions$.pipe(Ce(w.vizSceneColorChanged),ze(this.store.select(Hn)),J(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizSceneColorsApply(e.viz3d.sceneColors)})})),{dispatch:!1});vizLightColor$=Ee(()=>this.actions$.pipe(Ce(w.vizLightColorChanged),ze(this.store.select(Hn)),J(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizLightColorsApply(e.viz3d.lightColors)})})),{dispatch:!1});vizNetworkColors$=Ee(()=>this.actions$.pipe(Ce(w.vizNetworkColorsPatch),ze(this.store.select(Hn)),J(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizNetworkColorsApply(e.viz3d.networkColors)})})),{dispatch:!1});vizPostProcess$=Ee(()=>this.actions$.pipe(Ce(w.vizPostProcessPatch),ze(this.store.select(Hn)),J(([,e])=>{this.zone.runOutsideAngular(()=>{this.neuronalApp.onVizPostProcessApply(e.viz3d.postProcess)})})),{dispatch:!1});uiExportBundle$=Ee(()=>this.actions$.pipe(Ce(w.uiExportBundleRequested),ze(this.store.select(Hn)),J(([,e])=>{jg("neuronal3d-models.json",e.modelCollection),jg("neuronal3d-epochs.json",{version:1,byModelId:e.epochByModelId})})),{dispatch:!1});persistEpoch$=Ee(()=>this.store.select(rm).pipe(Gr(1),Br(200),J(e=>{this.epochsIdb.saveEpochStore({version:1,byModelId:e})})),{dispatch:!1});static \u0275fac=function(n){return new(n||t)};static \u0275prov=F({token:t,factory:t.\u0275fac})};var Dk=()=>({version:3,activeModelId:null,models:[]});function Ak(){return{inputLayerLayout:hg,inputLayerScale:Pu,hiddenLayerLayouts:["ring","ring"],hiddenLayerScales:[Pu,Pu],activeNeuronMaxScaleMul:ww,colorPresetMode:"followUi",colorPresetFixedTheme:vr,sceneColors:y({},LS),lightColors:y({},bu),networkColors:y({},Sa),postProcess:y({},Sr)}}function nd(t,e){let n=e.activeModelId;return n?[...t[n]??[]]:[]}function xM(){let t=Dk(),e={};return{modelCollection:t,modelStoreHydrated:!1,epochByModelId:e,epochDisplayRows:nd(e,t),viz3d:Ak(),trainHyperparams:y({},Uo),runtimeStatusPlain:"",runtimeKernelCaps:{hasNet:!1,mnistTrainCount:0,mnistTestCount:0},training:{running:!1,pause:!1,shouldStop:!1,currentRun:0,currentRunStartedAt:"",currentRunStartedMs:0},lastTrainLoss:0,lastTrainBatchAcc:0,modelDropdownOpen:!1,vizImmersiveUi:!1}}function Rk(t){return Nu.includes(t)?t:null}function Nk(t){return Ia.includes(t)?t:null}function Pk(t,e,n){let r=[...t[e]??[],n];return r.length>500&&r.splice(0,r.length-500),M(y({},t),{[e]:r})}function Lk(t,e){let n=[...t.models],i=n.findIndex(r=>r.id===e.id);return i>=0?n[i]=e:n.unshift(e),M(y({},t),{activeModelId:e.id,models:n})}function Wg(t,e){return[...t.epochByModelId[e]??[]]}var Ok=xM(),bM=lS(Ok,pe(w.modelStoreHydrated,(t,{modelCollection:e})=>M(y({},t),{modelCollection:e,modelStoreHydrated:!0,epochDisplayRows:nd(t.epochByModelId,e)})),pe(w.epochStoreHydrated,(t,{byModelId:e})=>M(y({},t),{epochByModelId:y({},e),epochDisplayRows:nd(e,t.modelCollection)})),pe(w.activeModelIdSet,w.activeModelIdFromRouteSet,(t,{id:e})=>M(y({},t),{modelCollection:M(y({},t.modelCollection),{activeModelId:e}),epochDisplayRows:Wg(t,e)})),pe(w.modelEntryUpserted,(t,{entry:e})=>{let n=t.modelCollection.models.some(r=>r.id===e.id),i=Lk(t.modelCollection,e);return M(y({},t),{modelCollection:i,epochDisplayRows:n?t.epochDisplayRows:Wg(t,e.id)})}),pe(w.epochViewSyncFromModel,(t,{modelId:e})=>{if(!e)return M(y({},t),{epochDisplayRows:[]});let n=t.epochByModelId[e]??[];return M(y({},t),{epochDisplayRows:[...n]})}),pe(w.epochHistoryCleared,(t,{modelId:e})=>{let n=y({},t.epochByModelId);delete n[e];let i=t.modelCollection.activeModelId;return M(y({},t),{epochByModelId:n,epochDisplayRows:i===e?[]:t.epochDisplayRows})}),pe(w.trainingStarted,(t,e)=>M(y({},t),{training:M(y({},t.training),{running:!0,shouldStop:!1,pause:!1,currentRun:e.run,currentRunStartedAt:e.runStartedAt,currentRunStartedMs:e.runStartedMs}),epochDisplayRows:Wg(t,e.modelId),modelDropdownOpen:!1})),pe(w.trainingEpochAppended,(t,{modelId:e,row:n})=>{let i=Pk(t.epochByModelId,e,n);return M(y({},t),{epochByModelId:i,epochDisplayRows:[...t.epochDisplayRows,n]})}),pe(w.trainingFinished,(t,{lastTrainLoss:e,lastTrainBatchAcc:n})=>M(y({},t),{lastTrainLoss:e,lastTrainBatchAcc:n,training:M(y({},t.training),{running:!1,shouldStop:!1,pause:!1})})),pe(w.trainingStopRequested,t=>M(y({},t),{training:M(y({},t.training),{shouldStop:!0})})),pe(w.trainingPauseToggled,t=>M(y({},t),{training:M(y({},t.training),{pause:!t.training.pause})})),pe(w.uiModelDropdownToggleRequested,t=>t.training.running||!t.modelStoreHydrated||t.modelCollection.models.length===0?t:M(y({},t),{modelDropdownOpen:!t.modelDropdownOpen})),pe(w.activeModelFromToolbarRequested,t=>M(y({},t),{modelDropdownOpen:!1})),pe(w.modelDropdownSetOpen,(t,{open:e})=>M(y({},t),{modelDropdownOpen:e})),pe(w.lastTrainMetricsReset,t=>M(y({},t),{lastTrainLoss:0,lastTrainBatchAcc:0})),pe(w.vizInputLayerLayoutChanged,(t,{raw:e})=>{let n=Rk(e);return n?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerLayout:n})}):t}),pe(w.vizInputLayerScaleChanged,(t,{scale:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{inputLayerScale:gg(e)})}):t),pe(w.vizHiddenLayerLayoutChanged,(t,{index:e,raw:n})=>{let i=Nk(n);if(!i)return t;let r=[t.viz3d.hiddenLayerLayouts[0],t.viz3d.hiddenLayerLayouts[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerLayouts:r})})}),pe(w.vizHiddenLayerScaleChanged,(t,{index:e,scale:n})=>{if(!Number.isFinite(n))return t;let i=gg(n),r=[t.viz3d.hiddenLayerScales[0],t.viz3d.hiddenLayerScales[1]];return r[e]=i,M(y({},t),{viz3d:M(y({},t.viz3d),{hiddenLayerScales:r})})}),pe(w.vizActiveNeuronMaxScaleMulChanged,(t,{mul:e})=>Number.isFinite(e)?M(y({},t),{viz3d:M(y({},t.viz3d),{activeNeuronMaxScaleMul:Mw(e)})}):t),pe(w.vizSceneColorChanged,(t,{key:e,color:n})=>!yn(n)||e!=="backgroundFog"&&e!=="floor"?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",sceneColors:M(y({},t.viz3d.sceneColors),{[e]:n})})})),pe(w.vizLightColorChanged,(t,{key:e,color:n})=>!yn(n)||!(e in bu)?t:M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"custom",lightColors:M(y({},t.viz3d.lightColors),{[e]:n})})})),pe(w.vizNetworkColorsPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:FS(e)?"custom":t.viz3d.colorPresetMode,networkColors:wa(t.viz3d.networkColors,e)})})),pe(w.viz3dColorPresetModeChanged,(t,{mode:e,fixedTheme:n})=>{if(e==="followUi")return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"followUi"})});let i=n&&Ii(n)?n:vr;return M(y({},t),{viz3d:M(y({},t.viz3d),{colorPresetMode:"fixedTheme",colorPresetFixedTheme:i})})}),pe(w.viz3dDaisyPaletteApplied,(t,{sceneColors:e,lightColors:n,networkColors:i,postProcessPatch:r})=>M(y({},t),{viz3d:M(y({},t.viz3d),{sceneColors:y({},e),lightColors:y({},n),networkColors:y({},i),postProcess:Nm(t.viz3d.postProcess,r)})})),pe(w.vizPostProcessPatch,(t,{patch:e})=>M(y({},t),{viz3d:M(y({},t.viz3d),{postProcess:Nm(t.viz3d.postProcess,e)})})),pe(w.uiVizImmersiveToggled,t=>M(y({},t),{vizImmersiveUi:!t.vizImmersiveUi})),pe(w.runtimeStatusPlainSet,(t,{plain:e})=>M(y({},t),{runtimeStatusPlain:e})),pe(w.runtimeKernelCapsUpdated,(t,{caps:e})=>M(y({},t),{runtimeKernelCaps:y({},e)})),pe(w.trainHyperparamsPatch,(t,{patch:e})=>M(y({},t),{trainHyperparams:gr(t.trainHyperparams,e)})),pe(w.uiEpochPresetRequested,(t,{epochs:e})=>M(y({},t),{trainHyperparams:gr(t.trainHyperparams,{epochs:Number.isFinite(e)?Math.min(200,Math.max(1,Math.floor(e))):t.trainHyperparams.epochs})})),pe(w.uiEpochsInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:gr(t.trainHyperparams,{epochs:Number.isFinite(n)?n:t.trainHyperparams.epochs})})}),pe(w.uiBatchSizeInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:gr(t.trainHyperparams,{batchSize:Number.isFinite(n)?n:t.trainHyperparams.batchSize})})}),pe(w.uiTrainLrInputChanged,(t,{raw:e})=>{let n=Number.parseFloat(e);return M(y({},t),{trainHyperparams:gr(t.trainHyperparams,{lr:Number.isFinite(n)?n:t.trainHyperparams.lr})})}),pe(w.uiTrainVizEveryInputChanged,(t,{raw:e})=>{let n=Number.parseInt(e,10);return M(y({},t),{trainHyperparams:gr(t.trainHyperparams,{vizEveryNBatches:Number.isFinite(n)?n:t.trainHyperparams.vizEveryNBatches})})}));var SM={providers:[aS(void 0,{metaReducers:[vM]}),nm("neuronal",bM),nm("router",Ww),SS([td]),...rr()?[gM({maxAge:30,trace:!1})]:[],_x({eventCoalescing:!0}),zp(Vw),qw()]};var id=class t{constructor(){S(de).dispatch(w.modelStoreLoadRequested())}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=Me({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(n,i){n&1&&xe(0,"router-outlet")},dependencies:[dr],styles:["[_nghost-%COMP%]{display:block;height:100%;min-height:0}"]})};vS(window);gp(id,SM).catch(t=>console.error(t));
