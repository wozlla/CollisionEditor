/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};(function(){var c=function(){throw"UID cannot be instantiated";};c._nextID=0;c.get=function(){return c._nextID++};createjs.UID=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.initialize=function(a){a.addEventListener=b.addEventListener;a.removeEventListener=b.removeEventListener;a.removeAllEventListeners=b.removeAllEventListeners;a.hasEventListener=b.hasEventListener;a.dispatchEvent=b.dispatchEvent};b._listeners=null;b.initialize=function(){};b.addEventListener=function(a,m){var b=this._listeners;b?this.removeEventListener(a,m):b=this._listeners={};var d=b[a];d||(d=b[a]=[]);d.push(m);return m};b.removeEventListener=
function(a,m){var b=this._listeners;if(b){var d=b[a];if(d)for(var e=0,c=d.length;e<c;e++)if(d[e]==m){1==c?delete b[a]:d.splice(e,1);break}}};b.removeAllEventListeners=function(a){a?this._listeners&&delete this._listeners[a]:this._listeners=null};b.dispatchEvent=function(a,m){var b=!1,d=this._listeners;if(a&&d){"string"==typeof a&&(a={type:a});d=d[a.type];if(!d)return b;a.target=m||this;for(var d=d.slice(),e=0,c=d.length;e<c;e++)var h=d[e],b=h.handleEvent?b||h.handleEvent(a):b||h(a)}return!!b};b.hasEventListener=
function(a){var m=this._listeners;return!(!m||!m[a])};b.toString=function(){return"[EventDispatcher]"};createjs.EventDispatcher=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Ticker cannot be instantiated.";};c.useRAF=!1;c.addEventListener=null;c.removeEventListener=null;c.removeAllEventListeners=null;c.dispatchEvent=null;c.hasEventListener=null;c._listeners=null;createjs.EventDispatcher.initialize(c);c._listeners=null;c._pauseable=null;c._paused=!1;c._inited=!1;c._startTime=0;c._pausedTime=0;c._ticks=0;c._pausedTicks=0;c._interval=50;c._lastTime=0;c._times=null;c._tickTimes=null;c._rafActive=!1;c._timeoutID=null;c.addListener=function(a,
m){null!=a&&(c.removeListener(a),c._pauseable[c._listeners.length]=null==m?!0:m,c._listeners.push(a))};c.init=function(){c._inited=!0;c._times=[];c._tickTimes=[];c._pauseable=[];c._listeners=[];c._times.push(c._lastTime=c._startTime=c._getTime());c.setInterval(c._interval)};c.removeListener=function(a){var m=c._listeners;m&&(a=m.indexOf(a),-1!=a&&(m.splice(a,1),c._pauseable.splice(a,1)))};c.removeAllListeners=function(){c._listeners=[];c._pauseable=[]};c.setInterval=function(a){c._interval=a;c._inited&&
c._setupTick()};c.getInterval=function(){return c._interval};c.setFPS=function(a){c.setInterval(1E3/a)};c.getFPS=function(){return 1E3/c._interval};c.getMeasuredFPS=function(a){if(2>c._times.length)return-1;null==a&&(a=c.getFPS()|0);a=Math.min(c._times.length-1,a);return 1E3/((c._times[0]-c._times[a])/a)};c.setPaused=function(a){c._paused=a};c.getPaused=function(){return c._paused};c.getTime=function(a){return c._getTime()-c._startTime-(a?c._pausedTime:0)};c.getTicks=function(a){return c._ticks-(a?
c._pausedTicks:0)};c._handleAF=function(){c._rafActive=!1;c._setupTick();c._getTime()-c._lastTime>=0.97*(c._interval-1)&&c._tick()};c._handleTimeout=function(){c.timeoutID=null;c._setupTick();c._tick()};c._setupTick=function(){if(!(c._rafActive||null!=c.timeoutID)){if(c.useRAF){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(a){a(c._handleAF);c._rafActive=!0;return}}c.timeoutID=
setTimeout(c._handleTimeout,c._interval)}};c._tick=function(){var a=c._getTime();c._ticks++;var m=a-c._lastTime,b=c._paused;b&&(c._pausedTicks++,c._pausedTime+=m);c._lastTime=a;for(var d=c._pauseable,e=c._listeners.slice(),f=e?e.length:0,h=0;h<f;h++){var k=e[h];null==k||b&&d[h]||(k.tick?k.tick(m,b):k instanceof Function&&k(m,b))}c.dispatchEvent({type:"tick",paused:b,delta:m,time:a,runTime:a-c._pausedTime});for(c._tickTimes.unshift(c._getTime()-a);100<c._tickTimes.length;)c._tickTimes.pop();for(c._times.unshift(a);100<
c._times.length;)c._times.pop()};var b=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);c._getTime=function(){return b&&b.call(performance)||(new Date).getTime()};c.init();createjs.Ticker=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,m,b,d,e,c,h,k,j){this.initialize(a,m,b,d,e,c,h,k,j)},b=c.prototype;b.stageX=0;b.stageY=0;b.rawX=0;b.rawY=0;b.type=null;b.nativeEvent=null;b.onMouseMove=null;b.onMouseUp=null;b.target=null;b.pointerID=0;b.primary=!1;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;b._listeners=null;createjs.EventDispatcher.initialize(b);b.initialize=function(a,m,b,d,e,c,h,k,j){this.type=a;this.stageX=m;this.stageY=
b;this.target=d;this.nativeEvent=e;this.pointerID=c;this.primary=h;this.rawX=null==k?m:k;this.rawY=null==j?b:j};b.clone=function(){return new c(this.type,this.stageX,this.stageY,this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)};b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"};createjs.MouseEvent=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,m,b,d,c,f){this.initialize(a,m,b,d,c,f)},b=c.prototype;c.identity=null;c.DEG_TO_RAD=Math.PI/180;b.a=1;b.b=0;b.c=0;b.d=1;b.tx=0;b.ty=0;b.alpha=1;b.shadow=null;b.compositeOperation=null;b.initialize=function(a,m,b,d,c,f){null!=a&&(this.a=a);this.b=m||0;this.c=b||0;null!=d&&(this.d=d);this.tx=c||0;this.ty=f||0;return this};b.prepend=function(a,b,g,d,c,f){var h=this.tx;if(1!=a||0!=b||0!=g||1!=d){var k=this.a,j=this.c;this.a=k*a+this.b*g;this.b=k*b+this.b*d;this.c=j*a+this.d*
g;this.d=j*b+this.d*d}this.tx=h*a+this.ty*g+c;this.ty=h*b+this.ty*d+f;return this};b.append=function(a,b,g,d,c,f){var h=this.a,k=this.b,j=this.c,l=this.d;this.a=a*h+b*j;this.b=a*k+b*l;this.c=g*h+d*j;this.d=g*k+d*l;this.tx=c*h+f*j+this.tx;this.ty=c*k+f*l+this.ty;return this};b.prependMatrix=function(a){this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty);this.prependProperties(a.alpha,a.shadow,a.compositeOperation);return this};b.appendMatrix=function(a){this.append(a.a,a.b,a.c,a.d,a.tx,a.ty);this.appendProperties(a.alpha,
a.shadow,a.compositeOperation);return this};b.prependTransform=function(a,b,g,d,e,f,h,k,j){if(e%360){var l=e*c.DEG_TO_RAD;e=Math.cos(l);l=Math.sin(l)}else e=1,l=0;if(k||j)this.tx-=k,this.ty-=j;f||h?(f*=c.DEG_TO_RAD,h*=c.DEG_TO_RAD,this.prepend(e*g,l*g,-l*d,e*d,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(f),Math.cos(f),a,b)):this.prepend(e*g,l*g,-l*d,e*d,a,b);return this};b.appendTransform=function(a,b,g,d,e,f,h,k,j){if(e%360){var l=e*c.DEG_TO_RAD;e=Math.cos(l);l=Math.sin(l)}else e=1,l=0;f||
h?(f*=c.DEG_TO_RAD,h*=c.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(f),Math.cos(f),a,b),this.append(e*g,l*g,-l*d,e*d,0,0)):this.append(e*g,l*g,-l*d,e*d,a,b);if(k||j)this.tx-=k*this.a+j*this.c,this.ty-=k*this.b+j*this.d;return this};b.rotate=function(a){var b=Math.cos(a);a=Math.sin(a);var g=this.a,d=this.c,c=this.tx;this.a=g*b-this.b*a;this.b=g*a+this.b*b;this.c=d*b-this.d*a;this.d=d*a+this.d*b;this.tx=c*b-this.ty*a;this.ty=c*a+this.ty*b;return this};b.skew=function(a,b){a*=c.DEG_TO_RAD;
b*=c.DEG_TO_RAD;this.append(Math.cos(b),Math.sin(b),-Math.sin(a),Math.cos(a),0,0);return this};b.scale=function(a,b){this.a*=a;this.d*=b;this.c*=a;this.b*=b;this.tx*=a;this.ty*=b;return this};b.translate=function(a,b){this.tx+=a;this.ty+=b;return this};b.identity=function(){this.alpha=this.a=this.d=1;this.b=this.c=this.tx=this.ty=0;this.shadow=this.compositeOperation=null;return this};b.invert=function(){var a=this.a,b=this.b,g=this.c,d=this.d,c=this.tx,f=a*d-b*g;this.a=d/f;this.b=-b/f;this.c=-g/
f;this.d=a/f;this.tx=(g*this.ty-d*c)/f;this.ty=-(a*this.ty-b*c)/f;return this};b.isIdentity=function(){return 0==this.tx&&0==this.ty&&1==this.a&&0==this.b&&0==this.c&&1==this.d};b.decompose=function(a){null==a&&(a={});a.x=this.tx;a.y=this.ty;a.scaleX=Math.sqrt(this.a*this.a+this.b*this.b);a.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var b=Math.atan2(-this.c,this.d),g=Math.atan2(this.b,this.a);b==g?(a.rotation=g/c.DEG_TO_RAD,0>this.a&&0<=this.d&&(a.rotation+=0>=a.rotation?180:-180),a.skewX=a.skewY=
0):(a.skewX=b/c.DEG_TO_RAD,a.skewY=g/c.DEG_TO_RAD);return a};b.reinitialize=function(a,b,g,d,c,f,h,k,j){this.initialize(a,b,g,d,c,f);this.alpha=h||1;this.shadow=k;this.compositeOperation=j;return this};b.appendProperties=function(a,b,g){this.alpha*=a;this.shadow=b||this.shadow;this.compositeOperation=g||this.compositeOperation;return this};b.prependProperties=function(a,b,g){this.alpha*=a;this.shadow=this.shadow||b;this.compositeOperation=this.compositeOperation||g;return this};b.clone=function(){var a=
new c(this.a,this.b,this.c,this.d,this.tx,this.ty);a.shadow=this.shadow;a.alpha=this.alpha;a.compositeOperation=this.compositeOperation;return a};b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"};c.identity=new c(1,0,0,1,0,0);createjs.Matrix2D=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b){this.initialize(a,b)},b=c.prototype;b.x=0;b.y=0;b.initialize=function(a,b){this.x=null==a?0:a;this.y=null==b?0:b};b.clone=function(){return new c(this.x,this.y)};b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"};createjs.Point=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,g,d){this.initialize(a,b,g,d)},b=c.prototype;b.x=0;b.y=0;b.width=0;b.height=0;b.initialize=function(a,b,g,d){this.x=null==a?0:a;this.y=null==b?0:b;this.width=null==g?0:g;this.height=null==d?0:d};b.clone=function(){return new c(this.x,this.y,this.width,this.height)};b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"};createjs.Rectangle=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,b,g,d,c,f,h){this.initialize(a,b,g,d,c,f,h)},b=c.prototype;b.target=null;b.overLabel=null;b.outLabel=null;b.downLabel=null;b.play=!1;b._isPressed=!1;b._isOver=!1;b.initialize=function(a,b,g,d,c,f,h){a.addEventListener&&(this.target=a,a.cursor="pointer",this.overLabel=null==g?"over":g,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=c,this.setEnabled(!0),this.handleEvent({}),f&&(h&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(h)),a.hitArea=f))};
b.setEnabled=function(a){var b=this.target;a?(b.addEventListener("mouseover",this),b.addEventListener("mouseout",this),b.addEventListener("mousedown",this)):(b.removeEventListener("mouseover",this),b.removeEventListener("mouseout",this),b.removeEventListener("mousedown",this))};b.toString=function(){return"[ButtonHelper]"};b.handleEvent=function(a){var b=this.target,g=a.type;"mousedown"==g?(a.addEventListener("mouseup",this),this._isPressed=!0,a=this.downLabel):"mouseup"==g?(this._isPressed=!1,a=
this._isOver?this.overLabel:this.outLabel):"mouseover"==g?(this._isOver=!0,a=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,a=this._isPressed?this.overLabel:this.outLabel);this.play?b.gotoAndPlay&&b.gotoAndPlay(a):b.gotoAndStop&&b.gotoAndStop(a)};createjs.ButtonHelper=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,g,d){this.initialize(a,b,g,d)},b=c.prototype;c.identity=null;b.color=null;b.offsetX=0;b.offsetY=0;b.blur=0;b.initialize=function(a,b,g,d){this.color=a;this.offsetX=b;this.offsetY=g;this.blur=d};b.toString=function(){return"[Shadow]"};b.clone=function(){return new c(this.color,this.offsetX,this.offsetY,this.blur)};c.identity=new c("transparent",0,0,0);createjs.Shadow=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype;b.complete=!0;b.onComplete=null;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;b._listeners=null;createjs.EventDispatcher.initialize(b);b._animations=null;b._frames=null;b._images=null;b._data=null;b._loadCount=0;b._frameHeight=0;b._frameWidth=0;b._numFrames=0;b._regX=0;b._regY=0;b.initialize=function(a){var b,g,d;if(null!=a){if(a.images&&0<(g=a.images.length)){d=
this._images=[];for(b=0;b<g;b++){var c=a.images[b];if("string"==typeof c){var f=c,c=new Image;c.src=f}d.push(c);!c.getContext&&!c.complete&&(this._loadCount++,this.complete=!1,function(a){c.onload=function(){a._handleImageLoad()}}(this))}}if(null!=a.frames)if(a.frames instanceof Array){this._frames=[];d=a.frames;b=0;for(g=d.length;b<g;b++)f=d[b],this._frames.push({image:this._images[f[4]?f[4]:0],rect:new createjs.Rectangle(f[0],f[1],f[2],f[3]),regX:f[5]||0,regY:f[6]||0})}else g=a.frames,this._frameWidth=
g.width,this._frameHeight=g.height,this._regX=g.regX||0,this._regY=g.regY||0,this._numFrames=g.count,0==this._loadCount&&this._calculateFrames();if(null!=(g=a.animations)){this._animations=[];this._data={};for(var h in g){a={name:h};f=g[h];if("number"==typeof f)d=a.frames=[f];else if(f instanceof Array)if(1==f.length)a.frames=[f[0]];else{a.frequency=f[3];a.next=f[2];d=a.frames=[];for(b=f[0];b<=f[1];b++)d.push(b)}else a.frequency=f.frequency,a.next=f.next,b=f.frames,d=a.frames="number"==typeof b?[b]:
b.slice(0);a.next=2>d.length||!1==a.next?null:null==a.next||!0==a.next?h:a.next;a.frequency||(a.frequency=1);this._animations.push(h);this._data[h]=a}}}};b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames;a=this._data[a];return null==a?0:a.frames.length};b.getAnimations=function(){return this._animations.slice(0)};b.getAnimation=function(a){return this._data[a]};b.getFrame=function(a){var b;return this.complete&&this._frames&&(b=this._frames[a])?b:null};
b.getFrameBounds=function(a){return(a=this.getFrame(a))?new createjs.Rectangle(-a.regX,-a.regY,a.rect.width,a.rect.height):null};b.toString=function(){return"[SpriteSheet]"};b.clone=function(){var a=new c;a.complete=this.complete;a._animations=this._animations;a._frames=this._frames;a._images=this._images;a._data=this._data;a._frameHeight=this._frameHeight;a._frameWidth=this._frameWidth;a._numFrames=this._numFrames;a._loadCount=this._loadCount;return a};b._handleImageLoad=function(){0==--this._loadCount&&
(this._calculateFrames(),this.complete=!0,this.onComplete&&this.onComplete(),this.dispatchEvent("complete"))};b._calculateFrames=function(){if(!(this._frames||0==this._frameWidth)){this._frames=[];for(var a=0,b=this._frameWidth,g=this._frameHeight,d=0,c=this._images;d<c.length;d++){for(var f=c[d],h=(f.width+1)/b|0,k=(f.height+1)/g|0,k=0<this._numFrames?Math.min(this._numFrames-a,h*k):h*k,j=0;j<k;j++)this._frames.push({image:f,rect:new createjs.Rectangle(j%h*b,(j/h|0)*g,b,g),regX:this._regX,regY:this._regY});
a+=k}this._numFrames=a}};createjs.SpriteSheet=c})();this.createjs=this.createjs||{};
(function(){function c(a,b,d){this.f=a;this.params=b;this.path=null==d?!0:d}c.prototype.exec=function(a){this.f.apply(a,this.params)};var b=function(){this.initialize()},a=b.prototype;b.getRGB=function(a,b,d,c){null!=a&&null==d&&(c=b,d=a&255,b=a>>8&255,a=a>>16&255);return null==c?"rgb("+a+","+b+","+d+")":"rgba("+a+","+b+","+d+","+c+")"};b.getHSL=function(a,b,d,c){return null==c?"hsl("+a%360+","+b+"%,"+d+"%)":"hsla("+a%360+","+b+"%,"+d+"%,"+c+")"};b.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,
K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,"0":52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};b.STROKE_CAPS_MAP=["butt","round","square"];b.STROKE_JOINTS_MAP=["miter","round","bevel"];b._ctx=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.beginCmd=new c(b._ctx.beginPath,
[],!1);b.fillCmd=new c(b._ctx.fill,[],!1);b.strokeCmd=new c(b._ctx.stroke,[],!1);a._strokeInstructions=null;a._strokeStyleInstructions=null;a._ignoreScaleStroke=!1;a._fillInstructions=null;a._instructions=null;a._oldInstructions=null;a._activeInstructions=null;a._active=!1;a._dirty=!1;a.initialize=function(){this.clear();this._ctx=b._ctx};a.isEmpty=function(){return!(this._instructions.length||this._oldInstructions.length||this._activeInstructions.length)};a.draw=function(a){this._dirty&&this._updateInstructions();
for(var b=this._instructions,d=0,c=b.length;d<c;d++)b[d].exec(a)};a.drawAsPath=function(a){this._dirty&&this._updateInstructions();for(var b,d=this._instructions,c=0,f=d.length;c<f;c++)((b=d[c]).path||0==c)&&b.exec(a)};a.moveTo=function(a,b){this._activeInstructions.push(new c(this._ctx.moveTo,[a,b]));return this};a.lineTo=function(a,b){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.lineTo,[a,b]));return this};a.arcTo=function(a,b,d,e,f){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.arcTo,
[a,b,d,e,f]));return this};a.arc=function(a,b,d,e,f,h){this._dirty=this._active=!0;null==h&&(h=!1);this._activeInstructions.push(new c(this._ctx.arc,[a,b,d,e,f,h]));return this};a.quadraticCurveTo=function(a,b,d,e){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.quadraticCurveTo,[a,b,d,e]));return this};a.bezierCurveTo=function(a,b,d,e,f,h){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.bezierCurveTo,[a,b,d,e,f,h]));return this};a.rect=function(a,
b,d,e){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.rect,[a,b,d,e]));return this};a.closePath=function(){this._active&&(this._dirty=!0,this._activeInstructions.push(new c(this._ctx.closePath,[])));return this};a.clear=function(){this._instructions=[];this._oldInstructions=[];this._activeInstructions=[];this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=null;this._active=this._dirty=!1;return this};a.beginFill=function(a){this._active&&this._newPath();
this._fillInstructions=a?[new c(this._setProp,["fillStyle",a],!1),b.fillCmd]:null;return this};a.beginLinearGradientFill=function(a,g,d,e,f,h){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,h);e=0;for(f=a.length;e<f;e++)d.addColorStop(g[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",d],!1),b.fillCmd];return this};a.beginRadialGradientFill=function(a,g,d,e,f,h,k,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,h,k,j);e=0;for(f=a.length;e<
f;e++)d.addColorStop(g[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",d],!1),b.fillCmd];return this};a.beginBitmapFill=function(a,g,d){this._active&&this._newPath();a=this._ctx.createPattern(a,g||"");a=new c(this._setProp,["fillStyle",a],!1);this._fillInstructions=d?[a,new c(this._ctx.save,[],!1),new c(this._ctx.transform,[d.a,d.b,d.c,d.d,d.tx,d.ty],!1),b.fillCmd,new c(this._ctx.restore,[],!1)]:[a,b.fillCmd];return this};a.endFill=function(){return this.beginFill()};a.setStrokeStyle=
function(a,g,d,e,f){this._active&&this._newPath();this._strokeStyleInstructions=[new c(this._setProp,["lineWidth",null==a?"1":a],!1),new c(this._setProp,["lineCap",null==g?"butt":isNaN(g)?g:b.STROKE_CAPS_MAP[g]],!1),new c(this._setProp,["lineJoin",null==d?"miter":isNaN(d)?d:b.STROKE_JOINTS_MAP[d]],!1),new c(this._setProp,["miterLimit",null==e?"10":e],!1)];this._ignoreScaleStroke=f;return this};a.beginStroke=function(a){this._active&&this._newPath();this._strokeInstructions=a?[new c(this._setProp,
["strokeStyle",a],!1)]:null;return this};a.beginLinearGradientStroke=function(a,b,d,e,f,h){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,h);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],!1)];return this};a.beginRadialGradientStroke=function(a,b,d,e,f,h,k,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,h,k,j);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=
[new c(this._setProp,["strokeStyle",d],!1)];return this};a.beginBitmapStroke=function(a,b){this._active&&this._newPath();var d=this._ctx.createPattern(a,b||"");this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],!1)];return this};a.endStroke=function(){this.beginStroke();return this};a.curveTo=a.quadraticCurveTo;a.drawRect=a.rect;a.drawRoundRect=function(a,b,d,c,f){this.drawRoundRectComplex(a,b,d,c,f,f,f,f);return this};a.drawRoundRectComplex=function(a,b,d,e,f,h,k,j){var l=(d<e?d:e)/
2,n=0,q=0,p=0,s=0;0>f&&(f*=n=-1);f>l&&(f=l);0>h&&(h*=q=-1);h>l&&(h=l);0>k&&(k*=p=-1);k>l&&(k=l);0>j&&(j*=s=-1);j>l&&(j=l);this._dirty=this._active=!0;var l=this._ctx.arcTo,r=this._ctx.lineTo;this._activeInstructions.push(new c(this._ctx.moveTo,[a+d-h,b]),new c(l,[a+d+h*q,b-h*q,a+d,b+h,h]),new c(r,[a+d,b+e-k]),new c(l,[a+d+k*p,b+e+k*p,a+d-k,b+e,k]),new c(r,[a+j,b+e]),new c(l,[a-j*s,b+e+j*s,a,b+e-j,j]),new c(r,[a,b+f]),new c(l,[a-f*n,b-f*n,a+f,b,f]),new c(this._ctx.closePath));return this};a.drawCircle=
function(a,b,d){this.arc(a,b,d,0,2*Math.PI);return this};a.drawEllipse=function(a,b,d,e){this._dirty=this._active=!0;var f=0.5522848*(d/2),h=0.5522848*(e/2),k=a+d,j=b+e;d=a+d/2;e=b+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[a,e]),new c(this._ctx.bezierCurveTo,[a,e-h,d-f,b,d,b]),new c(this._ctx.bezierCurveTo,[d+f,b,k,e-h,k,e]),new c(this._ctx.bezierCurveTo,[k,e+h,d+f,j,d,j]),new c(this._ctx.bezierCurveTo,[d-f,j,a,e+h,a,e]));return this};a.drawPolyStar=function(a,b,d,e,f,h){this._dirty=
this._active=!0;null==f&&(f=0);f=1-f;h=null==h?0:h/(180/Math.PI);var k=Math.PI/e;this._activeInstructions.push(new c(this._ctx.moveTo,[a+Math.cos(h)*d,b+Math.sin(h)*d]));for(var j=0;j<e;j++)h+=k,1!=f&&this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(h)*d*f,b+Math.sin(h)*d*f])),h+=k,this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(h)*d,b+Math.sin(h)*d]));return this};a.decodePath=function(a){for(var g=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,
this.closePath],d=[2,2,4,6,0],c=0,f=a.length,h=[],k=0,j=0,l=b.BASE_64;c<f;){var n=a.charAt(c),q=l[n],p=q>>3,s=g[p];if(!s||q&3)throw"bad path data (@"+c+"): "+n;n=d[p];p||(k=j=0);h.length=0;c++;q=(q>>2&1)+2;for(p=0;p<n;p++){var r=l[a.charAt(c)],u=r>>5?-1:1,r=(r&31)<<6|l[a.charAt(c+1)];3==q&&(r=r<<6|l[a.charAt(c+2)]);r=u*r/10;p%2?k=r+=k:j=r+=j;h[p]=r;c+=q}s.apply(this,h)}return this};a.clone=function(){var a=new b;a._instructions=this._instructions.slice();a._activeInstructions=this._activeInstructions.slice();
a._oldInstructions=this._oldInstructions.slice();this._fillInstructions&&(a._fillInstructions=this._fillInstructions.slice());this._strokeInstructions&&(a._strokeInstructions=this._strokeInstructions.slice());this._strokeStyleInstructions&&(a._strokeStyleInstructions=this._strokeStyleInstructions.slice());a._active=this._active;a._dirty=this._dirty;return a};a.toString=function(){return"[Graphics]"};a.mt=a.moveTo;a.lt=a.lineTo;a.at=a.arcTo;a.bt=a.bezierCurveTo;a.qt=a.quadraticCurveTo;a.a=a.arc;a.r=
a.rect;a.cp=a.closePath;a.c=a.clear;a.f=a.beginFill;a.lf=a.beginLinearGradientFill;a.rf=a.beginRadialGradientFill;a.bf=a.beginBitmapFill;a.ef=a.endFill;a.ss=a.setStrokeStyle;a.s=a.beginStroke;a.ls=a.beginLinearGradientStroke;a.rs=a.beginRadialGradientStroke;a.bs=a.beginBitmapStroke;a.es=a.endStroke;a.dr=a.drawRect;a.rr=a.drawRoundRect;a.rc=a.drawRoundRectComplex;a.dc=a.drawCircle;a.de=a.drawEllipse;a.dp=a.drawPolyStar;a.p=a.decodePath;a._updateInstructions=function(){this._instructions=this._oldInstructions.slice();
this._instructions.push(b.beginCmd);this._instructions.push.apply(this._instructions,this._activeInstructions);this._fillInstructions&&this._instructions.push.apply(this._instructions,this._fillInstructions);this._strokeInstructions&&(this._strokeStyleInstructions&&this._instructions.push.apply(this._instructions,this._strokeStyleInstructions),this._instructions.push.apply(this._instructions,this._strokeInstructions),this._ignoreScaleStroke?this._instructions.push(new c(this._ctx.save,[],!1),new c(this._ctx.setTransform,
[1,0,0,1,0,0],!1),b.strokeCmd,new c(this._ctx.restore,[],!1)):this._instructions.push(b.strokeCmd))};a._newPath=function(){this._dirty&&this._updateInstructions();this._oldInstructions=this._instructions;this._activeInstructions=[];this._active=this._dirty=!1};a._setProp=function(a,b){this[a]=b};createjs.Graphics=b})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.suppressCrossDomainErrors=!1;c._hitTestCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._hitTestCanvas.width=c._hitTestCanvas.height=1;c._hitTestContext=c._hitTestCanvas.getContext("2d");c._nextCacheID=1;b.alpha=1;b.cacheCanvas=null;b.id=-1;b.mouseEnabled=!0;b.name=null;b.parent=null;b.regX=0;b.regY=0;b.rotation=0;b.scaleX=1;b.scaleY=1;b.skewX=0;b.skewY=0;b.shadow=null;b.visible=!0;b.x=0;b.y=0;b.compositeOperation=
null;b.snapToPixel=!1;b.onPress=null;b.onClick=null;b.onDoubleClick=null;b.onMouseOver=null;b.onMouseOut=null;b.onTick=null;b.filters=null;b.cacheID=0;b.mask=null;b.hitArea=null;b.cursor=null;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;b._listeners=null;createjs.EventDispatcher.initialize(b);b._cacheOffsetX=0;b._cacheOffsetY=0;b._cacheScale=1;b._cacheDataURLID=0;b._cacheDataURL=null;b._matrix=null;b.initialize=function(){this.id=
createjs.UID.get();this._matrix=new createjs.Matrix2D};b.isVisible=function(){return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY))};b.draw=function(a,b){var c=this.cacheCanvas;if(b||!c)return!1;var d=this._cacheScale;a.drawImage(c,this._cacheOffsetX,this._cacheOffsetY,c.width/d,c.height/d);return!0};b.updateContext=function(a){var b,c=this.mask;c&&(c.graphics&&!c.graphics.isEmpty())&&(b=c.getMatrix(c._matrix),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),c.graphics.drawAsPath(a),a.clip(),
b.invert(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty));b=this._matrix.identity().appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY);createjs.Stage._snapToPixelEnabled&&this.snapToPixel?a.transform(b.a,b.b,b.c,b.d,b.tx+0.5|0,b.ty+0.5|0):a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty);a.globalAlpha*=this.alpha;this.compositeOperation&&(a.globalCompositeOperation=this.compositeOperation);this.shadow&&this._applyShadow(a,this.shadow)};b.cache=function(a,
b,c,d,e){e=e||1;this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));this.cacheCanvas.width=Math.ceil(c*e);this.cacheCanvas.height=Math.ceil(d*e);this._cacheOffsetX=a;this._cacheOffsetY=b;this._cacheScale=e||1;this.updateCache()};b.updateCache=function(a){var b=this.cacheCanvas,g=this._cacheScale,d=this._cacheOffsetX*g,e=this._cacheOffsetY*g;if(!b)throw"cache() must be called before updateCache()";var f=b.getContext("2d");f.save();a||
f.clearRect(0,0,b.width+1,b.height+1);f.globalCompositeOperation=a;f.setTransform(g,0,0,g,-d,-e);this.draw(f,!0);this._applyFilters();f.restore();this.cacheID=c._nextCacheID++};b.uncache=function(){this._cacheDataURL=this.cacheCanvas=null;this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0;this._cacheScale=1};b.getCacheDataURL=function(){if(!this.cacheCanvas)return null;this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL());return this._cacheDataURL};b.getStage=function(){for(var a=
this;a.parent;)a=a.parent;return a instanceof createjs.Stage?a:null};b.localToGlobal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(null==c)return null;c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,c.ty)};b.globalToLocal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(null==c)return null;c.invert();c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,c.ty)};b.localToLocal=function(a,b,c){a=this.localToGlobal(a,b);return c.globalToLocal(a.x,a.y)};b.setTransform=
function(a,b,c,d,e,f,h,k,j){this.x=a||0;this.y=b||0;this.scaleX=null==c?1:c;this.scaleY=null==d?1:d;this.rotation=e||0;this.skewX=f||0;this.skewY=h||0;this.regX=k||0;this.regY=j||0;return this};b.getMatrix=function(a){return(a?a.identity():new createjs.Matrix2D).appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY).appendProperties(this.alpha,this.shadow,this.compositeOperation)};b.getConcatenatedMatrix=function(a){a?a.identity():a=new createjs.Matrix2D;
for(var b=this;null!=b;)a.prependTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).prependProperties(b.alpha,b.shadow,b.compositeOperation),b=b.parent;return a};b.hitTest=function(a,b){var g=c._hitTestContext;g.setTransform(1,0,0,1,-a,-b);this.draw(g);var d=this._testHit(g);g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,2,2);return d};b.set=function(a){for(var b in a)this[b]=a[b];return this};b.clone=function(){var a=new c;this.cloneProps(a);return a};b.toString=function(){return"[DisplayObject (name="+
this.name+")]"};b.cloneProps=function(a){a.alpha=this.alpha;a.name=this.name;a.regX=this.regX;a.regY=this.regY;a.rotation=this.rotation;a.scaleX=this.scaleX;a.scaleY=this.scaleY;a.shadow=this.shadow;a.skewX=this.skewX;a.skewY=this.skewY;a.visible=this.visible;a.x=this.x;a.y=this.y;a.mouseEnabled=this.mouseEnabled;a.compositeOperation=this.compositeOperation;this.cacheCanvas&&(a.cacheCanvas=this.cacheCanvas.cloneNode(!0),a.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0,
0,this.cacheCanvas.width,this.cacheCanvas.height),0,0))};b._applyShadow=function(a,b){b=b||Shadow.identity;a.shadowColor=b.color;a.shadowOffsetX=b.offsetX;a.shadowOffsetY=b.offsetY;a.shadowBlur=b.blur};b._tick=function(a){this.onTick&&this.onTick.apply(this,a);var b=this._listeners;b&&b.tick&&this.dispatchEvent({type:"tick",params:a})};b._testHit=function(a){try{var b=1<a.getImageData(0,0,1,1).data[3]}catch(g){if(!c.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
}return b};b._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;e<a;e++)this.filters[e].applyFilter(b,0,0,c,d)};b._hasMouseHandler=function(a){var b=this._listeners;return!!(a&1&&(this.onPress||this.onClick||this.onDoubleClick||b&&(this.hasEventListener("mousedown")||this.hasEventListener("click")||this.hasEventListener("dblclick")))||a&2&&(this.onMouseOver||
this.onMouseOut||this.cursor||b&&(this.hasEventListener("mouseover")||this.hasEventListener("mouseout"))))};createjs.DisplayObject=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype=new createjs.DisplayObject;b.children=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(){this.DisplayObject_initialize();this.children=[]};b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&a))};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(0),d=0,e=c.length;d<
e;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0};b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(1<b){for(var c=0;c<b;c++)this.addChild(arguments[c]);return arguments[b-1]}a.parent&&a.parent.removeChild(a);a.parent=this;this.children.push(a);return a};b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(2<c){for(var e=0;e<c-1;e++)this.addChildAt(arguments[e],d+e);
return arguments[c-2]}a.parent&&a.parent.removeChild(a);a.parent=this;this.children.splice(b,0,a);return a};b.removeChild=function(a){var b=arguments.length;if(1<b){for(var c=!0,d=0;d<b;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(this.children.indexOf(a))};b.removeChildAt=function(a){var b=arguments.length;if(1<b){for(var c=[],d=0;d<b;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;d<b;d++)e=e&&this.removeChildAt(c[d]);return e}if(0>a||a>this.children.length-
1)return!1;if(b=this.children[a])b.parent=null;this.children.splice(a,1);return!0};b.removeAllChildren=function(){for(var a=this.children;a.length;)a.pop().parent=null};b.getChildAt=function(a){return this.children[a]};b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;c<d;c++)if(b[c].name==a)return b[c];return null};b.sortChildren=function(a){this.children.sort(a)};b.getChildIndex=function(a){return this.children.indexOf(a)};b.getNumChildren=function(){return this.children.length};
b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)};b.swapChildren=function(a,b){for(var c=this.children,d,e,f=0,h=c.length;f<h&&!(c[f]==a&&(d=f),c[f]==b&&(e=f),null!=d&&null!=e);f++);f!=h&&(c[d]=b,c[e]=a)};b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;e<d&&c[e]!=a;e++);e==d||e==b||(c.splice(e,1),b<e&&b--,c.splice(b,0,a))}};b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1};b.hitTest=
function(a,b){return null!=this.getObjectUnderPoint(a,b)};b.getObjectsUnderPoint=function(a,b){var c=[],d=this.localToGlobal(a,b);this._getObjectsUnderPoint(d.x,d.y,c);return c};b.getObjectUnderPoint=function(a,b){var c=this.localToGlobal(a,b);return this._getObjectsUnderPoint(c.x,c.y)};b.clone=function(a){var b=new c;this.cloneProps(b);if(a)for(var g=b.children=[],d=0,e=this.children.length;d<e;d++){var f=this.children[d].clone(a);f.parent=b;g.push(f)}return b};b.toString=function(){return"[Container (name="+
this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){for(var b=this.children.length-1;0<=b;b--){var c=this.children[b];c._tick&&c._tick(a)}this.DisplayObject__tick(a)};b._getObjectsUnderPoint=function(a,b,g,d){var e=createjs.DisplayObject._hitTestContext,f=this._matrix,h=this._hasMouseHandler(d);if(!this.hitArea&&(this.cacheCanvas&&h)&&(this.getConcatenatedMatrix(f),e.setTransform(f.a,f.b,f.c,f.d,f.tx-a,f.ty-b),e.globalAlpha=f.alpha,this.draw(e),this._testHit(e)))return e.setTransform(1,
0,0,1,0,0),e.clearRect(0,0,2,2),this;for(var k=this.children.length-1;0<=k;k--){var j=this.children[k],l=j.hitArea;if(j.visible&&!(!l&&!j.isVisible()||d&&!j.mouseEnabled)){var n=d&&j._hasMouseHandler(d);if(j instanceof c&&(!l||!n))if(h){if(j=j._getObjectsUnderPoint(a,b))return this}else{if(j=j._getObjectsUnderPoint(a,b,g,d),!g&&j)return j}else if(!d||h||n)if(j.getConcatenatedMatrix(f),l&&(f.appendTransform(l.x,l.y,l.scaleX,l.scaleY,l.rotation,l.skewX,l.skewY,l.regX,l.regY),f.alpha=l.alpha),e.globalAlpha=
f.alpha,e.setTransform(f.a,f.b,f.c,f.d,f.tx-a,f.ty-b),(l||j).draw(e),this._testHit(e)){e.setTransform(1,0,0,1,0,0);e.clearRect(0,0,2,2);if(h)return this;if(g)g.push(j);else return j}}}return null};createjs.Container=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.Container;c._snapToPixelEnabled=!1;b.autoClear=!0;b.canvas=null;b.mouseX=0;b.mouseY=0;b.onMouseMove=null;b.onMouseUp=null;b.onMouseDown=null;b.snapToPixelEnabled=!1;b.mouseInBounds=!1;b.tickOnUpdate=!0;b.mouseMoveOutside=!1;b._pointerData=null;b._pointerCount=0;b._primaryPointerID=null;b._mouseOverIntervalID=null;b.Container_initialize=b.initialize;b.initialize=function(a){this.Container_initialize();this.canvas="string"==
typeof a?document.getElementById(a):a;this._pointerData={};this.enableDOMEvents(!0)};b.update=function(){if(this.canvas){this.autoClear&&this.clear();c._snapToPixelEnabled=this.snapToPixelEnabled;this.tickOnUpdate&&this._tick(arguments.length?arguments:null);var a=this.canvas.getContext("2d");a.save();this.updateContext(a);this.draw(a,!1);a.restore()}};b.tick=b.update;b.handleEvent=function(a){"tick"==a.type&&this.update(a)};b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,
0,0,1,0,0);a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}};b.toDataURL=function(a,b){b||(b="image/png");var c=this.canvas.getContext("2d"),d=this.canvas.width,e=this.canvas.height,f;if(a){f=c.getImageData(0,0,d,e);var h=c.globalCompositeOperation;c.globalCompositeOperation="destination-over";c.fillStyle=a;c.fillRect(0,0,d,e)}var k=this.canvas.toDataURL(b);a&&(c.clearRect(0,0,d+1,e+1),c.putImageData(f,0,0),c.globalCompositeOperation=h);return k};b.enableMouseOver=function(a){this._mouseOverIntervalID&&
(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null);if(null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1E3/Math.min(50,a))};b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c=this._eventListeners;if(!a&&c){for(b in c)a=c[b],a.t.removeEventListener(b,a.f);this._eventListeners=null}else if(a&&!c&&this.canvas){a=window.addEventListener?window:document;var d=this,c=this._eventListeners={};c.mouseup={t:a,f:function(a){d._handleMouseUp(a)}};
c.mousemove={t:a,f:function(a){d._handleMouseMove(a)}};c.dblclick={t:a,f:function(a){d._handleDoubleClick(a)}};c.mousedown={t:this.canvas,f:function(a){d._handleMouseDown(a)}};for(b in c)a=c[b],a.t.addEventListener(b,a.f)}};b.clone=function(){var a=new c(null);this.cloneProps(a);return a};b.toString=function(){return"[Stage (name="+this.name+")]"};b._getPointerData=function(a){var b=this._pointerData[a];if(!b&&(b=this._pointerData[a]={x:0,y:0},null==this._primaryPointerID||-1==this._primaryPointerID))this._primaryPointerID=
a;return b};b._handleMouseMove=function(a){a||(a=window.event);this._handlePointerMove(-1,a,a.pageX,a.pageY)};b._handlePointerMove=function(a,b,c,d){if(this.canvas){var e=this._getPointerData(a),f=e.inBounds;this._updatePointerPosition(a,c,d);if(f||e.inBounds||this.mouseMoveOutside){if(this.onMouseMove||this.hasEventListener("stagemousemove"))c=new createjs.MouseEvent("stagemousemove",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY),this.onMouseMove&&this.onMouseMove(c),this.dispatchEvent(c);
if((d=e.event)&&(d.onMouseMove||d.hasEventListener("mousemove")))c=new createjs.MouseEvent("mousemove",e.x,e.y,d.target,b,a,a==this._primaryPointerID,e.rawX,e.rawY),d.onMouseMove&&d.onMouseMove(c),d.dispatchEvent(c,d.target)}}};b._updatePointerPosition=function(a,b,c){var d=this._getElementRect(this.canvas);b-=d.left;c-=d.top;var e=this.canvas.width,f=this.canvas.height;b/=(d.right-d.left)/e;c/=(d.bottom-d.top)/f;d=this._getPointerData(a);(d.inBounds=0<=b&&0<=c&&b<=e-1&&c<=f-1)?(d.x=b,d.y=c):this.mouseMoveOutside&&
(d.x=0>b?0:b>e-1?e-1:b,d.y=0>c?0:c>f-1?f-1:c);d.rawX=b;d.rawY=c;a==this._primaryPointerID&&(this.mouseX=d.x,this.mouseY=d.y,this.mouseInBounds=d.inBounds)};b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||
0),f=window.getComputedStyle?getComputedStyle(a):a.currentStyle;a=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth);var h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),k=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),f=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+a,right:b.right+d-k,top:b.top+e+h,bottom:b.bottom+e-f}};b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)};b._handlePointerUp=function(a,b,c){var d=this._getPointerData(a),e;if(this.onMouseMove||
this.hasEventListener("stagemouseup"))e=new createjs.MouseEvent("stagemouseup",d.x,d.y,this,b,a,a==this._primaryPointerID,d.rawX,d.rawY),this.onMouseUp&&this.onMouseUp(e),this.dispatchEvent(e);var f=d.event;if(f&&(f.onMouseUp||f.hasEventListener("mouseup")))e=new createjs.MouseEvent("mouseup",d.x,d.y,f.target,b,a,a==this._primaryPointerID,d.rawX,d.rawY),f.onMouseUp&&f.onMouseUp(e),f.dispatchEvent(e,f.target);if((f=d.target)&&(f.onClick||f.hasEventListener("click"))&&this._getObjectsUnderPoint(d.x,
d.y,null,!0,this._mouseOverIntervalID?3:1)==f)e=new createjs.MouseEvent("click",d.x,d.y,f,b,a,a==this._primaryPointerID,d.rawX,d.rawY),f.onClick&&f.onClick(e),f.dispatchEvent(e);c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):d.event=d.target=null};b._handleMouseDown=function(a){this._handlePointerDown(-1,a,!1)};b._handlePointerDown=function(a,b,c,d){var e=this._getPointerData(a);null!=d&&this._updatePointerPosition(a,c,d);if(this.onMouseDown||this.hasEventListener("stagemousedown"))c=
new createjs.MouseEvent("stagemousedown",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY),this.onMouseDown&&this.onMouseDown(c),this.dispatchEvent(c);if(d=this._getObjectsUnderPoint(e.x,e.y,null,this._mouseOverIntervalID?3:1))if(e.target=d,d.onPress||d.hasEventListener("mousedown"))if(c=new createjs.MouseEvent("mousedown",e.x,e.y,d,b,a,a==this._primaryPointerID,e.rawX,e.rawY),d.onPress&&d.onPress(c),d.dispatchEvent(c),c.onMouseMove||c.onMouseUp||c.hasEventListener("mousemove")||c.hasEventListener("mouseup"))e.event=
c};b._testMouseOver=function(){if(-1==this._primaryPointerID&&!(this.mouseX==this._mouseOverX&&this.mouseY==this._mouseOverY&&this.mouseInBounds)){var a=null;this.mouseInBounds&&(a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,3),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var b=this._mouseOverTarget;if(b!=a){var c=this._getPointerData(-1);if(b&&(b.onMouseOut||b.hasEventListener("mouseout"))){var d=new createjs.MouseEvent("mouseout",c.x,c.y,b,null,-1,c.rawX,c.rawY);b.onMouseOut&&
b.onMouseOut(d);b.dispatchEvent(d)}b&&(this.canvas.style.cursor="");if(a&&(a.onMouseOver||a.hasEventListener("mouseover")))d=new createjs.MouseEvent("mouseover",c.x,c.y,a,null,-1,c.rawX,c.rawY),a.onMouseOver&&a.onMouseOver(d),a.dispatchEvent(d);a&&(this.canvas.style.cursor=a.cursor||"");this._mouseOverTarget=a}}};b._handleDoubleClick=function(a){var b=this._getPointerData(-1),c=this._getObjectsUnderPoint(b.x,b.y,null,this._mouseOverIntervalID?3:1);if(c&&(c.onDoubleClick||c.hasEventListener("dblclick")))evt=
new createjs.MouseEvent("dblclick",b.x,b.y,c,a,-1,!0,b.rawX,b.rawY),c.onDoubleClick&&c.onDoubleClick(evt),c.dispatchEvent(evt)};createjs.Stage=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.image=null;b.snapToPixel=!0;b.sourceRect=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();"string"==typeof a?(this.image=new Image,this.image.src=a):this.image=a};b.isVisible=function(){var a=this.cacheCanvas||this.image&&(this.image.complete||this.image.getContext||2<=this.image.readyState);return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&
a))};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.sourceRect;c?a.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):a.drawImage(this.image,0,0);return!0};b.clone=function(){var a=new c(this.image);this.sourceRect&&(a.sourceRect=this.sourceRect.clone());this.cloneProps(a);return a};b.toString=function(){return"[Bitmap (name="+this.name+")]"};createjs.Bitmap=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.onAnimationEnd=null;b.currentFrame=-1;b.currentAnimation=null;b.paused=!0;b.spriteSheet=null;b.snapToPixel=!0;b.offset=0;b.currentAnimationFrame=0;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;b._listeners=null;createjs.EventDispatcher.initialize(b);b._advanceCount=0;b._animation=null;b.DisplayObject_initialize=b.initialize;b.initialize=
function(a){this.DisplayObject_initialize();this.spriteSheet=a};b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete&&0<=this.currentFrame;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&a))};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(this.currentFrame);if(c){var d=c.rect;a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height);return!0}};
b.play=function(){this.paused=!1};b.stop=function(){this.paused=!0};b.gotoAndPlay=function(a){this.paused=!1;this._goto(a)};b.gotoAndStop=function(a){this.paused=!0;this._goto(a)};b.advance=function(){this._animation?this.currentAnimationFrame++:this.currentFrame++;this._normalizeFrame()};b.getBounds=function(){return this.spriteSheet.getFrameBounds(this.currentFrame)};b.clone=function(){var a=new c(this.spriteSheet);this.cloneProps(a);return a};b.toString=function(){return"[BitmapAnimation (name="+
this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){var b=this._animation?this._animation.frequency:1;!this.paused&&0==(++this._advanceCount+this.offset)%b&&this.advance();this.DisplayObject__tick(a)};b._normalizeFrame=function(){var a=this._animation,b=this.currentFrame,c=this.paused,d;if(a)if(d=a.frames.length,this.currentAnimationFrame>=d){var e=a.next;this._dispatchAnimationEnd(a,b,c,e,d-1)||(e?this._goto(e):(this.paused=!0,this.currentAnimationFrame=a.frames.length-1,this.currentFrame=
a.frames[this.currentAnimationFrame]))}else this.currentFrame=a.frames[this.currentAnimationFrame];else d=this.spriteSheet.getNumFrames(),b>=d&&!this._dispatchAnimationEnd(a,b,c,d-1)&&(this.currentFrame=0)};b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;this.onAnimationEnd&&this.onAnimationEnd(this,f,d);this.dispatchEvent({type:"animationend",name:f,next:d});!c&&this.paused&&(this.currentAnimationFrame=e);return this.paused!=c||this._animation!=a||this.currentFrame!=b};b.DisplayObject_cloneProps=
b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);a.onAnimationEnd=this.onAnimationEnd;a.currentFrame=this.currentFrame;a.currentAnimation=this.currentAnimation;a.paused=this.paused;a.offset=this.offset;a._animation=this._animation;a.currentAnimationFrame=this.currentAnimationFrame};b._goto=function(a){if(isNaN(a)){var b=this.spriteSheet.getAnimation(a);b&&(this.currentAnimationFrame=0,this._animation=b,this.currentAnimation=a,this._normalizeFrame())}else this.currentAnimation=
this._animation=null,this.currentFrame=a};createjs.BitmapAnimation=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.graphics=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();this.graphics=a?a:new createjs.Graphics};b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&a))};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this.graphics.draw(a);
return!0};b.clone=function(a){a=new c(a&&this.graphics?this.graphics.clone():this.graphics);this.cloneProps(a);return a};b.toString=function(){return"[Shape (name="+this.name+")]"};createjs.Shape=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,b,c){this.initialize(a,b,c)},b=c.prototype=new createjs.DisplayObject;c._workingContext=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.text="";b.font=null;b.color="#000";b.textAlign="left";b.textBaseline="top";b.maxWidth=null;b.outline=!1;b.lineHeight=0;b.lineWidth=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a,b,c){this.DisplayObject_initialize();this.text=a;this.font=b;this.color=c?c:"#000"};
b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&a))};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this.outline?a.strokeStyle=this.color:a.fillStyle=this.color;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";this._drawText(a);return!0};b.getMeasuredWidth=function(){return this._getWorkingContext().measureText(this.text).width};
b.getMeasuredLineHeight=function(){return 1.2*this._getWorkingContext().measureText("M").width};b.getMeasuredHeight=function(){return this._drawText()*(this.lineHeight||this.getMeasuredLineHeight())};b.clone=function(){var a=new c(this.text,this.font,this.color);this.cloneProps(a);return a};b.toString=function(){return"[Text (text="+(20<this.text.length?this.text.substr(0,17)+"...":this.text)+")]"};b.DisplayObject_cloneProps=b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);a.textAlign=
this.textAlign;a.textBaseline=this.textBaseline;a.maxWidth=this.maxWidth;a.outline=this.outline;a.lineHeight=this.lineHeight;a.lineWidth=this.lineWidth};b._getWorkingContext=function(){var a=c._workingContext;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";return a};b._drawText=function(a){var b=!!a;b||(a=this._getWorkingContext());for(var c=String(this.text).split(/(?:\r\n|\r|\n)/),d=this.lineHeight||this.getMeasuredLineHeight(),e=0,f=0,h=c.length;f<
h;f++){var k=a.measureText(c[f]).width;if(null==this.lineWidth||k<this.lineWidth)b&&this._drawTextLine(a,c[f],e*d);else{for(var k=c[f].split(/(\s)/),j=k[0],l=1,n=k.length;l<n;l+=2)a.measureText(j+k[l]+k[l+1]).width>this.lineWidth?(b&&this._drawTextLine(a,j,e*d),e++,j=k[l+1]):j+=k[l]+k[l+1];b&&this._drawTextLine(a,j,e*d)}e++}return e};b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)};createjs.Text=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"SpriteSheetUtils cannot be instantiated";};c._workingCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._workingContext=c._workingCanvas.getContext("2d");c.addFlippedFrames=function(b,a,m,g){if(a||m||g){var d=0;a&&c._flip(b,++d,!0,!1);m&&c._flip(b,++d,!1,!0);g&&c._flip(b,++d,!0,!0)}};c.extractFrame=function(b,a){isNaN(a)&&(a=b.getAnimation(a).frames[0]);var m=b.getFrame(a);if(!m)return null;var g=m.rect,d=c._workingCanvas;d.width=
g.width;d.height=g.height;c._workingContext.drawImage(m.image,g.x,g.y,g.width,g.height,0,0,g.width,g.height);m=new Image;m.src=d.toDataURL("image/png");return m};c.mergeAlpha=function(b,a,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));c.width=Math.max(a.width,b.width);c.height=Math.max(a.height,b.height);var g=c.getContext("2d");g.save();g.drawImage(b,0,0);g.globalCompositeOperation="destination-in";g.drawImage(a,0,0);g.restore();return c};c._flip=function(b,
a,m,g){for(var d=b._images,e=c._workingCanvas,f=c._workingContext,h=d.length/a,k=0;k<h;k++){var j=d[k];j.__tmp=k;f.setTransform(1,0,0,1,0,0);f.clearRect(0,0,e.width+1,e.height+1);e.width=j.width;e.height=j.height;f.setTransform(m?-1:1,0,0,g?-1:1,m?j.width:0,g?j.height:0);f.drawImage(j,0,0);var l=new Image;l.src=e.toDataURL("image/png");l.width=j.width;l.height=j.height;d.push(l)}f=b._frames;e=f.length/a;for(k=0;k<e;k++){var j=f[k],n=j.rect.clone(),l=d[j.image.__tmp+h*a],q={image:l,rect:n,regX:j.regX,
regY:j.regY};m&&(n.x=l.width-n.x-n.width,q.regX=n.width-j.regX);g&&(n.y=l.height-n.y-n.height,q.regY=n.height-j.regY);f.push(q)}m="_"+(m?"h":"")+(g?"v":"");g=b._animations;b=b._data;d=g.length/a;for(k=0;k<d;k++){f=g[k];j=b[f];h={name:f+m,frequency:j.frequency,next:j.next,frames:[]};j.next&&(h.next+=m);f=j.frames;j=0;for(l=f.length;j<l;j++)h.frames.push(f[j]+e*a);b[h.name]=h;g.push(h.name)}};createjs.SpriteSheetUtils=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions";c.ERR_RUNNING="a build is already running";b.maxWidth=2048;b.maxHeight=2048;b.spriteSheet=null;b.scale=1;b.padding=1;b.timeSlice=0.3;b.progress=-1;b.onComplete=null;b.onProgress=null;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;b._listeners=null;createjs.EventDispatcher.initialize(b);b._frames=
null;b._animations=null;b._data=null;b._nextFrameIndex=0;b._index=0;b._timerID=null;b._scale=1;b.initialize=function(){this._frames=[];this._animations={}};b.addFrame=function(a,b,g,d,e,f){if(this._data)throw c.ERR_RUNNING;b=b||a.bounds||a.nominalBounds;!b&&a.getBounds&&(b=a.getBounds());if(!b)return null;g=g||1;return this._frames.push({source:a,sourceRect:b,scale:g,funct:d,params:e,scope:f,index:this._frames.length,height:b.height*g})-1};b.addAnimation=function(a,b,g,d){if(this._data)throw c.ERR_RUNNING;
this._animations[a]={frames:b,next:g,frequency:d}};b.addMovieClip=function(a,b,g){if(this._data)throw c.ERR_RUNNING;var d=a.frameBounds,e=b||a.bounds||a.nominalBounds;!e&&a.getBounds&&(e=a.getBounds());if(!e&&!d)return null;b=this._frames.length;for(var f=a.timeline.duration,h=0;h<f;h++)this.addFrame(a,d&&d[h]?d[h]:e,g,function(a){var b=this.actionsEnabled;this.actionsEnabled=!1;this.gotoAndStop(a);this.actionsEnabled=b},[h],a);h=a.timeline._labels;a=[];for(var k in h)a.push({index:h[k],label:k});
if(a.length){a.sort(function(a,b){return a.index-b.index});h=0;for(k=a.length;h<k;h++){g=a[h].label;for(var d=b+(h==k-1?f:a[h+1].index),e=[],j=b+a[h].index;j<d;j++)e.push(j);this.addAnimation(g,e,!0)}}};b.build=function(){if(this._data)throw c.ERR_RUNNING;for(this._startBuild();this._drawNext(););this._endBuild();return this.spriteSheet};b.buildAsync=function(a){if(this._data)throw c.ERR_RUNNING;this.timeSlice=a;this._startBuild();var b=this;this._timerID=setTimeout(function(){b._run()},50-50*Math.max(0.01,
Math.min(0.99,this.timeSlice||0.3)))};b.stopAsync=function(){clearTimeout(this._timerID);this._data=null};b.clone=function(){throw"SpriteSheetBuilder cannot be cloned.";};b.toString=function(){return"[SpriteSheetBuilder]"};b._startBuild=function(){var a=this.padding||0;this.progress=0;this.spriteSheet=null;this._index=0;this._scale=this.scale;var b=[];this._data={images:[],frames:b,animations:this._animations};var g=this._frames.slice();g.sort(function(a,b){return a.height<=b.height?-1:1});if(g[g.length-
1].height+2*a>this.maxHeight)throw c.ERR_DIMENSIONS;for(var d=0,e=0,f=0;g.length;){var h=this._fillRow(g,d,f,b,a);h.w>e&&(e=h.w);d+=h.h;if(!h.h||!g.length){var k=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");k.width=this._getSize(e,this.maxWidth);k.height=this._getSize(d,this.maxHeight);this._data.images[f]=k;h.h||(e=d=0,f++)}}};b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))};b._fillRow=function(a,b,g,d,e){var f=this.maxWidth,
h=this.maxHeight;b+=e;for(var h=h-b,k=e,j=0,l=a.length-1;0<=l;l--){var n=a[l],q=this._scale*n.scale,p=n.sourceRect,s=n.source,r=Math.floor(q*p.x-e),u=Math.floor(q*p.y-e),t=Math.ceil(q*p.height+2*e),p=Math.ceil(q*p.width+2*e);if(p>f)throw c.ERR_DIMENSIONS;t>h||k+p>f||(n.img=g,n.rect=new createjs.Rectangle(k,b,p,t),j=j||t,a.splice(l,1),d[n.index]=[k,b,p,t,g,Math.round(-r+q*s.regX-e),Math.round(-u+q*s.regY-e)],k+=p)}return{w:k,h:j}};b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data);
this._data=null;this.progress=1;this.onComplete&&this.onComplete(this);this.dispatchEvent("complete")};b._run=function(){for(var a=50*Math.max(0.01,Math.min(0.99,this.timeSlice||0.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}a=this.progress=this._index/this._frames.length;this.onProgress&&this.onProgress(this,a);this.dispatchEvent({type:"progress",progress:a})};b._drawNext=
function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img].getContext("2d");a.funct&&a.funct.apply(a.scope,a.params);e.save();e.beginPath();e.rect(c.x,c.y,c.width,c.height);e.clip();e.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b));e.scale(b,b);a.source.draw(e);e.restore();return++this._index<this._frames.length};createjs.SpriteSheetBuilder=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.htmlElement=null;b._oldMtx=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){"string"==typeof a&&(a=document.getElementById(a));this.DisplayObject_initialize();this.mouseEnabled=!1;this.htmlElement=a;a=a.style;a.position="absolute";a.transformOrigin=a.WebkitTransformOrigin=a.msTransformOrigin=a.MozTransformOrigin=a.OTransformOrigin="0% 0%"};b.isVisible=function(){return null!=this.htmlElement};
b.draw=function(){if(null!=this.htmlElement){var a=this.getConcatenatedMatrix(this._matrix),b=this.htmlElement.style;if(this.visible)b.visibility="visible";else return!0;var c=this._oldMtx||{};c.alpha!=a.alpha&&(b.opacity=""+a.alpha,c.alpha=a.alpha);if(c.tx!=a.tx||c.ty!=a.ty||c.a!=a.a||c.b!=a.b||c.c!=a.c||c.d!=a.d)b.transform=b.WebkitTransform=b.OTransform=b.msTransform=["matrix("+a.a,a.b,a.c,a.d,a.tx+0.5|0,(a.ty+0.5|0)+")"].join(),b.MozTransform=["matrix("+a.a,a.b,a.c,a.d,(a.tx+0.5|0)+"px",(a.ty+
0.5|0)+"px)"].join(),this._oldMtx=a.clone();return!0}};b.cache=function(){};b.uncache=function(){};b.updateCache=function(){};b.hitTest=function(){};b.localToGlobal=function(){};b.globalToLocal=function(){};b.localToLocal=function(){};b.clone=function(){throw"DOMElement cannot be cloned.";};b.toString=function(){return"[DOMElement (name="+this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){this.htmlElement.style.visibility="hidden";this.DisplayObject__tick(a)};createjs.DOMElement=c})();this.createjs=this.createjs||{};(function(){var c=function(){this.initialize()},b=c.prototype;b.initialize=function(){};b.getBounds=function(){return new createjs.Rectangle(0,0,0,0)};b.applyFilter=function(){};b.toString=function(){return"[Filter]"};b.clone=function(){return new c};createjs.Filter=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Touch cannot be instantiated";};c.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled};c.enable=function(b,a,m){if(!b||!b.canvas||!c.isSupported())return!1;b.__touch={pointers:{},multitouch:!a,preventDefault:!m,count:0};"ontouchstart"in window?c._IOS_enable(b):window.navigator.msPointerEnabled&&c._IE_enable(b);return!0};c.disable=function(b){b&&("ontouchstart"in window?c._IOS_disable(b):window.navigator.msPointerEnabled&&c._IE_disable(b))};
c._IOS_enable=function(b){var a=b.canvas,m=b.__touch.f=function(a){c._IOS_handleEvent(b,a)};a.addEventListener("touchstart",m,!1);a.addEventListener("touchmove",m,!1);a.addEventListener("touchend",m,!1);a.addEventListener("touchcancel",m,!1)};c._IOS_disable=function(b){var a=b.canvas;a&&(b=b.__touch.f,a.removeEventListener("touchstart",b,!1),a.removeEventListener("touchmove",b,!1),a.removeEventListener("touchend",b,!1),a.removeEventListener("touchcancel",b,!1))};c._IOS_handleEvent=function(b,a){if(b){b.__touch.preventDefault&&
a.preventDefault&&a.preventDefault();for(var c=a.changedTouches,g=a.type,d=0,e=c.length;d<e;d++){var f=c[d],h=f.identifier;f.target==b.canvas&&("touchstart"==g?this._handleStart(b,h,a,f.pageX,f.pageY):"touchmove"==g?this._handleMove(b,h,a,f.pageX,f.pageY):("touchend"==g||"touchcancel"==g)&&this._handleEnd(b,h,a))}}};c._IE_enable=function(b){var a=b.canvas,m=b.__touch.f=function(a){c._IE_handleEvent(b,a)};a.addEventListener("MSPointerDown",m,!1);window.addEventListener("MSPointerMove",m,!1);window.addEventListener("MSPointerUp",
m,!1);window.addEventListener("MSPointerCancel",m,!1);b.__touch.preventDefault&&(a.style.msTouchAction="none");b.__touch.activeIDs={}};c._IE_disable=function(b){var a=b.__touch.f;window.removeEventListener("MSPointerMove",a,!1);window.removeEventListener("MSPointerUp",a,!1);window.removeEventListener("MSPointerCancel",a,!1);b.canvas&&b.canvas.removeEventListener("MSPointerDown",a,!1)};c._IE_handleEvent=function(b,a){if(b){b.__touch.preventDefault&&a.preventDefault&&a.preventDefault();var c=a.type,
g=a.pointerId,d=b.__touch.activeIDs;if("MSPointerDown"==c)a.srcElement==b.canvas&&(d[g]=!0,this._handleStart(b,g,a,a.pageX,a.pageY));else if(d[g])if("MSPointerMove"==c)this._handleMove(b,g,a,a.pageX,a.pageY);else if("MSPointerUp"==c||"MSPointerCancel"==c)delete d[g],this._handleEnd(b,g,a)}};c._handleStart=function(b,a,c,g,d){var e=b.__touch;if(e.multitouch||!e.count){var f=e.pointers;f[a]||(f[a]=!0,e.count++,b._handlePointerDown(a,c,g,d))}};c._handleMove=function(b,a,c,g,d){b.__touch.pointers[a]&&
b._handlePointerMove(a,c,g,d)};c._handleEnd=function(b,a,c){var g=b.__touch,d=g.pointers;d[a]&&(g.count--,b._handlePointerUp(a,c,!0),delete d[a])};createjs.Touch=c})();(function(){var c=this.createjs=this.createjs||{},c=c.EaselJS=c.EaselJS||{};c.version="0.6.1";c.buildDate="Tue, 14 May 2013 21:43:02 GMT"})();
;

/**!
 * @license PreloadJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2011-2013 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 **/this.createjs = this.createjs || {};
(function() {
    var Event = function(type, bubbles, cancelable) {
        this.initialize(type, bubbles, cancelable)
    };
    var p = Event.prototype;
    p.type = null;
    p.target = null;
    p.currentTarget = null;
    p.eventPhase = 0;
    p.bubbles = false;
    p.cancelable = false;
    p.timeStamp = 0;
    p.defaultPrevented = false;
    p.propagationStopped = false;
    p.immediatePropagationStopped = false;
    p.removed = false;
    p.initialize = function(type, bubbles, cancelable) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.timeStamp = (new Date).getTime()
    };
    p.preventDefault = function() {
        this.defaultPrevented = true
    };
    p.stopPropagation = function() {
        this.propagationStopped = true
    };
    p.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = true
    };
    p.remove = function() {
        this.removed = true
    };
    p.clone = function() {
        return new Event(this.type, this.bubbles, this.cancelable)
    };
    p.toString = function() {
        return"[Event (type=" + this.type + ")]"
    };
    createjs.Event = Event
})();
this.createjs = this.createjs || {};
(function() {
    var EventDispatcher = function() {
        this.initialize()
    };
    var p = EventDispatcher.prototype;
    EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.on = p.on;
        target.removeEventListener = target.off = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
        target._dispatchEvent = p._dispatchEvent
    };
    p._listeners = null;
    p._captureListeners = null;
    p.initialize = function() {
    };
    p.addEventListener = function(type, listener, useCapture) {
        var listeners;
        if(useCapture) {
            listeners = this._captureListeners = this._captureListeners || {}
        }else {
            listeners = this._listeners = this._listeners || {}
        }
        var arr = listeners[type];
        if(arr) {
            this.removeEventListener(type, listener, useCapture)
        }
        arr = listeners[type];
        if(!arr) {
            listeners[type] = [listener]
        }else {
            arr.push(listener)
        }
        return listener
    };
    p.on = function(type, listener, scope, once, data, useCapture) {
        if(listener.handleEvent) {
            scope = scope || listener;
            listener = listener.handleEvent
        }
        scope = scope || this;
        return this.addEventListener(type, function(evt) {
            listener.call(scope, evt, data);
            once && evt.remove()
        }, useCapture)
    };
    p.removeEventListener = function(type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if(!listeners) {
            return
        }
        var arr = listeners[type];
        if(!arr) {
            return
        }
        for(var i = 0, l = arr.length;i < l;i++) {
            if(arr[i] == listener) {
                if(l == 1) {
                    delete listeners[type]
                }else {
                    arr.splice(i, 1)
                }
                break
            }
        }
    };
    p.off = p.removeEventListener;
    p.removeAllEventListeners = function(type) {
        if(!type) {
            this._listeners = this._captureListeners = null
        }else {
            if(this._listeners) {
                delete this._listeners[type]
            }
            if(this._captureListeners) {
                delete this._captureListeners[type]
            }
        }
    };
    p.dispatchEvent = function(eventObj, target) {
        if(typeof eventObj == "string") {
            var listeners = this._listeners;
            if(!listeners || !listeners[eventObj]) {
                return false
            }
            eventObj = new createjs.Event(eventObj)
        }
        eventObj.target = target || this;
        if(!eventObj.bubbles || !this.parent) {
            this._dispatchEvent(eventObj, 2)
        }else {
            var top = this, list = [top];
            while(top.parent) {
                list.push(top = top.parent)
            }
            var i, l = list.length;
            for(i = l - 1;i >= 0 && !eventObj.propagationStopped;i--) {
                list[i]._dispatchEvent(eventObj, 1 + (i == 0))
            }
            for(i = 1;i < l && !eventObj.propagationStopped;i++) {
                list[i]._dispatchEvent(eventObj, 3)
            }
        }
        return eventObj.defaultPrevented
    };
    p.hasEventListener = function(type) {
        var listeners = this._listeners, captureListeners = this._captureListeners;
        return!!(listeners && listeners[type] || captureListeners && captureListeners[type])
    };
    p.toString = function() {
        return"[EventDispatcher]"
    };
    p._dispatchEvent = function(eventObj, eventPhase) {
        var l, listeners = eventPhase == 1 ? this._captureListeners : this._listeners;
        if(eventObj && listeners) {
            var arr = listeners[eventObj.type];
            if(!arr || !(l = arr.length)) {
                return
            }
            eventObj.currentTarget = this;
            eventObj.eventPhase = eventPhase;
            eventObj.removed = false;
            arr = arr.slice();
            for(var i = 0;i < l && !eventObj.immediatePropagationStopped;i++) {
                var o = arr[i];
                if(o.handleEvent) {
                    o.handleEvent(eventObj)
                }else {
                    o(eventObj)
                }
                if(eventObj.removed) {
                    this.off(eventObj.type, o, eventPhase == 1);
                    eventObj.removed = false
                }
            }
        }
    };
    createjs.EventDispatcher = EventDispatcher
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(array, searchElement) {
        for(var i = 0, l = array.length;i < l;i++) {
            if(searchElement === array[i]) {
                return i
            }
        }
        return-1
    }
})();
this.createjs = this.createjs || {};
(function() {
    createjs.proxy = function(method, scope) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return function() {
            return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs))
        }
    }
})();
this.createjs = this.createjs || {};
(function() {
    var s = createjs.PreloadJS = createjs.PreloadJS || {};
    s.version = "NEXT";
    s.buildDate = "Fri, 30 Aug 2013 06:49:55 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var AbstractLoader = function() {
        this.init()
    };
    AbstractLoader.prototype = {};
    var p = AbstractLoader.prototype;
    var s = AbstractLoader;
    s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    p.loaded = false;
    p.canceled = false;
    p.progress = 0;
    p._item = null;
    p._basePath = null;
    p.addEventListener = null;
    p.removeEventListener = null;
    p.removeAllEventListeners = null;
    p.dispatchEvent = null;
    p.hasEventListener = null;
    p._listeners = null;
    createjs.EventDispatcher.initialize(p);
    p.getItem = function() {
        return this._item
    };
    p.init = function() {
    };
    p.load = function() {
    };
    p.close = function() {
    };
    p._sendLoadStart = function() {
        if(this._isCanceled()) {
            return
        }
        this.dispatchEvent("loadstart")
    };
    p._sendProgress = function(value) {
        if(this._isCanceled()) {
            return
        }
        var event = null;
        if(typeof value == "number") {
            this.progress = value;
            event = new createjs.Event("progress");
            event.loaded = this.progress;
            event.total = 1
        }else {
            event = value;
            this.progress = value.loaded / value.total;
            if(isNaN(this.progress) || this.progress == Infinity) {
                this.progress = 0
            }
        }
        event.progress = this.progress;
        this.hasEventListener("progress") && this.dispatchEvent(event)
    };
    p._sendComplete = function() {
        if(this._isCanceled()) {
            return
        }
        this.dispatchEvent("complete")
    };
    p._sendError = function(event) {
        if(this._isCanceled() || !this.hasEventListener("error")) {
            return
        }
        if(event == null) {
            event = new createjs.Event("error")
        }
        this.dispatchEvent(event)
    };
    p._isCanceled = function() {
        if(window.createjs == null || this.canceled) {
            return true
        }
        return false
    };
    p._parseURI = function(path) {
        if(!path) {
            return null
        }
        return path.match(s.FILE_PATTERN)
    };
    p._formatQueryString = function(data, query) {
        if(data == null) {
            throw new Error("You must specify data.");
        }
        var params = [];
        for(var n in data) {
            params.push(n + "=" + escape(data[n]))
        }
        if(query) {
            params = params.concat(query)
        }
        return params.join("&")
    };
    p.buildPath = function(src, _basePath, data) {
        if(_basePath != null) {
            var match = this._parseURI(src);
            if(match == null || match[1] == null || match[1] == "") {
                src = _basePath + src
            }
        }
        if(data == null) {
            return src
        }
        var query = [];
        var idx = createjs.indexOf(src, "?");
        if(idx != -1) {
            var q = src.slice(idx + 1);
            query = query.concat(q.split("&"))
        }
        if(idx != -1) {
            return src.slice(0, idx) + "?" + this._formatQueryString(data, query)
        }else {
            return src + "?" + this._formatQueryString(data, query)
        }
    };
    p.toString = function() {
        return"[PreloadJS AbstractLoader]"
    };
    createjs.AbstractLoader = AbstractLoader
})();
this.createjs = this.createjs || {};
(function() {
    var LoadQueue = function(useXHR, basePath) {
        this.init(useXHR, basePath)
    };
    var p = LoadQueue.prototype = new createjs.AbstractLoader;
    var s = LoadQueue;
    s.LOAD_TIMEOUT = 8E3;
    s.BINARY = "binary";
    s.CSS = "css";
    s.IMAGE = "image";
    s.JAVASCRIPT = "javascript";
    s.JSON = "json";
    s.JSONP = "jsonp";
    s.SOUND = "sound";
    s.SVG = "svg";
    s.TEXT = "text";
    s.XML = "xml";
    s.POST = "POST";
    s.GET = "GET";
    p.useXHR = true;
    p.stopOnError = false;
    p.maintainScriptOrder = true;
    p.next = null;
    p._typeCallbacks = null;
    p._extensionCallbacks = null;
    p._loadStartWasDispatched = false;
    p._maxConnections = 1;
    p._currentlyLoadingScript = null;
    p._currentLoads = null;
    p._loadQueue = null;
    p._loadQueueBackup = null;
    p._loadItemsById = null;
    p._loadItemsBySrc = null;
    p._loadedResults = null;
    p._loadedRawResults = null;
    p._numItems = 0;
    p._numItemsLoaded = 0;
    p._scriptOrder = null;
    p._loadedScripts = null;
    p.init = function(useXHR, basePath) {
        this._numItems = this._numItemsLoaded = 0;
        this._paused = false;
        this._loadStartWasDispatched = false;
        this._currentLoads = [];
        this._loadQueue = [];
        this._loadQueueBackup = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._loadItemsById = {};
        this._loadItemsBySrc = {};
        this._loadedResults = {};
        this._loadedRawResults = {};
        this._typeCallbacks = {};
        this._extensionCallbacks = {};
        this._basePath = basePath;
        this.setUseXHR(useXHR)
    };
    p.setUseXHR = function(value) {
        this.useXHR = value != false && window.XMLHttpRequest != null;
        return this.useXHR
    };
    p.removeAll = function() {
        this.remove()
    };
    p.remove = function(idsOrUrls) {
        var args = null;
        if(idsOrUrls && !(idsOrUrls instanceof Array)) {
            args = [idsOrUrls]
        }else {
            if(idsOrUrls) {
                args = idsOrUrls
            }else {
                if(arguments.length > 0) {
                    return
                }
            }
        }
        var itemsWereRemoved = false;
        if(!args) {
            this.close();
            for(var n in this._loadItemsById) {
                this._disposeItem(this._loadItemsById[n])
            }
            this.init(this.useXHR)
        }else {
            while(args.length) {
                var item = args.pop();
                var r = this.getResult(item);
                for(i = this._loadQueue.length - 1;i >= 0;i--) {
                    loadItem = this._loadQueue[i].getItem();
                    if(loadItem.id == item || loadItem.src == item) {
                        this._loadQueue.splice(i, 1)[0].cancel();
                        break
                    }
                }
                for(i = this._loadQueueBackup.length - 1;i >= 0;i--) {
                    loadItem = this._loadQueueBackup[i].getItem();
                    if(loadItem.id == item || loadItem.src == item) {
                        this._loadQueueBackup.splice(i, 1)[0].cancel();
                        break
                    }
                }
                if(r) {
                    delete this._loadItemsById[r.id];
                    delete this._loadItemsBySrc[r.src];
                    this._disposeItem(r)
                }else {
                    for(var i = this._currentLoads.length - 1;i >= 0;i--) {
                        var loadItem = this._currentLoads[i].getItem();
                        if(loadItem.id == item || loadItem.src == item) {
                            this._currentLoads.splice(i, 1)[0].cancel();
                            itemsWereRemoved = true;
                            break
                        }
                    }
                }
            }
            if(itemsWereRemoved) {
                this._loadNext()
            }
        }
    };
    p.reset = function() {
        this.close();
        for(var n in this._loadItemsById) {
            this._disposeItem(this._loadItemsById[n])
        }
        var a = [];
        for(i = 0, l = this._loadQueueBackup.length;i < l;i++) {
            a.push(this._loadQueueBackup[i].getItem())
        }
        this.loadManifest(a, false)
    };
    s.isBinary = function(type) {
        switch(type) {
            case createjs.LoadQueue.IMAGE:
                ;
            case createjs.LoadQueue.BINARY:
                return true;
            default:
                return false
        }
    };
    p.installPlugin = function(plugin) {
        if(plugin == null || plugin.getPreloadHandlers == null) {
            return
        }
        var map = plugin.getPreloadHandlers();
        if(map.types != null) {
            for(var i = 0, l = map.types.length;i < l;i++) {
                this._typeCallbacks[map.types[i]] = map.callback
            }
        }
        if(map.extensions != null) {
            for(i = 0, l = map.extensions.length;i < l;i++) {
                this._extensionCallbacks[map.extensions[i]] = map.callback
            }
        }
    };
    p.setMaxConnections = function(value) {
        this._maxConnections = value;
        if(!this._paused && this._loadQueue.length > 0) {
            this._loadNext()
        }
    };
    p.loadFile = function(file, loadNow, basePath) {
        if(file == null) {
            var event = new createjs.Event("error");
            event.text = "PRELOAD_NO_FILE";
            this._sendError(event);
            return
        }
        this._addItem(file, basePath);
        if(loadNow !== false) {
            this.setPaused(false)
        }else {
            this.setPaused(true)
        }
    };
    p.loadManifest = function(manifest, loadNow, basePath) {
        var data = null;
        if(manifest instanceof Array) {
            if(manifest.length == 0) {
                var event = new createjs.Event("error");
                event.text = "PRELOAD_MANIFEST_EMPTY";
                this._sendError(event);
                return
            }
            data = manifest
        }else {
            if(manifest == null) {
                var event = new createjs.Event("error");
                event.text = "PRELOAD_MANIFEST_NULL";
                this._sendError(event);
                return
            }
            data = [manifest]
        }
        for(var i = 0, l = data.length;i < l;i++) {
            this._addItem(data[i], basePath)
        }
        if(loadNow !== false) {
            this.setPaused(false)
        }else {
            this.setPaused(true)
        }
    };
    p.load = function() {
        this.setPaused(false)
    };
    p.getItem = function(value) {
        return this._loadItemsById[value] || this._loadItemsBySrc[value]
    };
    p.getResult = function(value, rawResult) {
        var item = this._loadItemsById[value] || this._loadItemsBySrc[value];
        if(item == null) {
            return null
        }
        var id = item.id;
        if(rawResult && this._loadedRawResults[id]) {
            return this._loadedRawResults[id]
        }
        return this._loadedResults[id]
    };
    p.setPaused = function(value) {
        this._paused = value;
        if(!this._paused) {
            this._loadNext()
        }
    };
    p.close = function() {
        while(this._currentLoads.length) {
            this._currentLoads.pop().cancel()
        }
        this._scriptOrder.length = 0;
        this._loadedScripts.length = 0;
        this.loadStartWasDispatched = false
    };
    p._addItem = function(value, basePath) {
        var item = this._createLoadItem(value);
        if(item == null) {
            return
        }
        var loader = this._createLoader(item, basePath);
        if(loader != null) {
            this._loadQueue.push(loader);
            this._loadQueueBackup.push(loader);
            this._numItems++;
            this._updateProgress();
            if(this.maintainScriptOrder && item.type == createjs.LoadQueue.JAVASCRIPT && loader instanceof createjs.XHRLoader) {
                this._scriptOrder.push(item);
                this._loadedScripts.push(null)
            }
        }
    };
    p._createLoadItem = function(value) {
        var item = null;
        switch(typeof value) {
            case "string":
                item = {src:value};
                break;
            case "object":
                if(window.HTMLAudioElement && value instanceof HTMLAudioElement) {
                    item = {tag:value, src:item.tag.src, type:createjs.LoadQueue.SOUND}
                }else {
                    item = value
                }
                break;
            default:
                return null
        }
        var match = this._parseURI(item.src);
        if(match != null) {
            item.ext = match[5]
        }
        if(item.type == null) {
            item.type = this._getTypeByExtension(item.ext)
        }
        if(item.type == createjs.LoadQueue.JSON && item.callback != null) {
            item.type = createjs.LoadQueue.JSONP
        }
        if(item.type == createjs.LoadQueue.JSONP && item.callback == null) {
            throw new Error("callback is required for loading JSONP requests.");
        }
        if(item.tag == null) {
            item.tag = this._createTag(item.type)
        }
        if(item.id == null || item.id == "") {
            item.id = item.src
        }
        var customHandler = this._typeCallbacks[item.type] || this._extensionCallbacks[item.ext];
        if(customHandler) {
            var result = customHandler(item.src, item.type, item.id, item.data);
            if(result === false) {
                return null
            }else {
                if(result === true) {
                }else {
                    if(result.src != null) {
                        item.src = result.src
                    }
                    if(result.id != null) {
                        item.id = result.id
                    }
                    if(result.tag != null && result.tag.load instanceof Function) {
                        item.tag = result.tag
                    }
                    if(result.completeHandler != null) {
                        item.completeHandler = result.completeHandler
                    }
                }
            }
            if(result.type) {
                item.type = result.type
            }
            match = this._parseURI(item.src);
            if(match != null && match[5] != null) {
                item.ext = match[5].toLowerCase()
            }
        }
        this._loadItemsById[item.id] = item;
        this._loadItemsBySrc[item.src] = item;
        return item
    };
    p._createLoader = function(item, basePath) {
        var useXHR = this.useXHR;
        switch(item.type) {
            case createjs.LoadQueue.JSON:
                ;
            case createjs.LoadQueue.XML:
                ;
            case createjs.LoadQueue.TEXT:
                useXHR = true;
                break;
            case createjs.LoadQueue.SOUND:
                ;
            case createjs.LoadQueue.JSONP:
                useXHR = false;
                break;
            case null:
                return null
        }
        if(basePath == null) {
            basePath = this._basePath
        }
        if(useXHR) {
            return new createjs.XHRLoader(item, basePath)
        }else {
            return new createjs.TagLoader(item, basePath)
        }
    };
    p._loadNext = function() {
        if(this._paused) {
            return
        }
        if(!this._loadStartWasDispatched) {
            this._sendLoadStart();
            this._loadStartWasDispatched = true
        }
        if(this._numItems == this._numItemsLoaded) {
            this.loaded = true;
            this._sendComplete();
            if(this.next && this.next.load) {
                this.next.load()
            }
        }else {
            this.loaded = false
        }
        for(var i = 0;i < this._loadQueue.length;i++) {
            if(this._currentLoads.length >= this._maxConnections) {
                break
            }
            var loader = this._loadQueue[i];
            if(this.maintainScriptOrder && loader instanceof createjs.TagLoader && loader.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
                if(this._currentlyLoadingScript) {
                    continue
                }
                this._currentlyLoadingScript = true
            }
            this._loadQueue.splice(i, 1);
            i--;
            this._loadItem(loader)
        }
    };
    p._loadItem = function(loader) {
        loader.addEventListener("progress", createjs.proxy(this._handleProgress, this));
        loader.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
        loader.addEventListener("error", createjs.proxy(this._handleFileError, this));
        this._currentLoads.push(loader);
        this._sendFileStart(loader.getItem());
        loader.load()
    };
    p._handleFileError = function(event) {
        var loader = event.target;
        this._numItemsLoaded++;
        this._updateProgress();
        var event = new createjs.Event("error");
        event.text = "FILE_LOAD_ERROR";
        event.item = loader.getItem();
        this._sendError(event);
        if(!this.stopOnError) {
            this._removeLoadItem(loader);
            this._loadNext()
        }
    };
    p._handleFileComplete = function(event) {
        var loader = event.target;
        var item = loader.getItem();
        this._loadedResults[item.id] = loader.getResult();
        if(loader instanceof createjs.XHRLoader) {
            this._loadedRawResults[item.id] = loader.getResult(true)
        }
        this._removeLoadItem(loader);
        if(this.maintainScriptOrder && item.type == createjs.LoadQueue.JAVASCRIPT) {
            if(loader instanceof createjs.TagLoader) {
                this._currentlyLoadingScript = false
            }else {
                this._loadedScripts[createjs.indexOf(this._scriptOrder, item)] = item;
                this._checkScriptLoadOrder(loader);
                return
            }
        }
        this._processFinishedLoad(item, loader)
    };
    p._processFinishedLoad = function(item, loader) {
        this._numItemsLoaded++;
        this._updateProgress();
        this._sendFileComplete(item, loader);
        this._loadNext()
    };
    p._checkScriptLoadOrder = function() {
        var l = this._loadedScripts.length;
        for(var i = 0;i < l;i++) {
            var item = this._loadedScripts[i];
            if(item === null) {
                break
            }
            if(item === true) {
                continue
            }
            this._processFinishedLoad(item);
            this._loadedScripts[i] = true;
            i--;
            l--
        }
    };
    p._removeLoadItem = function(loader) {
        var l = this._currentLoads.length;
        for(var i = 0;i < l;i++) {
            if(this._currentLoads[i] == loader) {
                this._currentLoads.splice(i, 1);
                break
            }
        }
    };
    p._handleProgress = function(event) {
        var loader = event.target;
        this._sendFileProgress(loader.getItem(), loader.progress);
        this._updateProgress()
    };
    p._updateProgress = function() {
        var loaded = this._numItemsLoaded / this._numItems;
        var remaining = this._numItems - this._numItemsLoaded;
        if(remaining > 0) {
            var chunk = 0;
            for(var i = 0, l = this._currentLoads.length;i < l;i++) {
                chunk += this._currentLoads[i].progress
            }
            loaded += chunk / remaining * (remaining / this._numItems)
        }
        this._sendProgress(loaded)
    };
    p._disposeItem = function(item) {
        delete this._loadedResults[item.id];
        delete this._loadedRawResults[item.id];
        delete this._loadItemsById[item.id];
        delete this._loadItemsBySrc[item.src]
    };
    p._createTag = function(type) {
        var tag = null;
        switch(type) {
            case createjs.LoadQueue.IMAGE:
                return document.createElement("img");
            case createjs.LoadQueue.SOUND:
                tag = document.createElement("audio");
                tag.autoplay = false;
                return tag;
            case createjs.LoadQueue.JSONP:
                ;
            case createjs.LoadQueue.JAVASCRIPT:
                tag = document.createElement("script");
                tag.type = "text/javascript";
                return tag;
            case createjs.LoadQueue.CSS:
                if(this.useXHR) {
                    tag = document.createElement("style")
                }else {
                    tag = document.createElement("link")
                }
                tag.rel = "stylesheet";
                tag.type = "text/css";
                return tag;
            case createjs.LoadQueue.SVG:
                if(this.useXHR) {
                    tag = document.createElement("svg")
                }else {
                    tag = document.createElement("object");
                    tag.type = "image/svg+xml"
                }
                return tag
        }
        return null
    };
    p._getTypeByExtension = function(extension) {
        if(extension == null) {
            return createjs.LoadQueue.TEXT
        }
        switch(extension.toLowerCase()) {
            case "jpeg":
                ;
            case "jpg":
                ;
            case "gif":
                ;
            case "png":
                ;
            case "webp":
                ;
            case "bmp":
                return createjs.LoadQueue.IMAGE;
            case "ogg":
                ;
            case "mp3":
                ;
            case "wav":
                return createjs.LoadQueue.SOUND;
            case "json":
                return createjs.LoadQueue.JSON;
            case "xml":
                return createjs.LoadQueue.XML;
            case "css":
                return createjs.LoadQueue.CSS;
            case "js":
                return createjs.LoadQueue.JAVASCRIPT;
            case "svg":
                return createjs.LoadQueue.SVG;
            default:
                return createjs.LoadQueue.TEXT
        }
    };
    p._sendFileProgress = function(item, progress) {
        if(this._isCanceled()) {
            this._cleanUp();
            return
        }
        if(!this.hasEventListener("fileprogress")) {
            return
        }
        var event = new createjs.Event("fileprogress");
        event.progress = progress;
        event.loaded = progress;
        event.total = 1;
        event.item = item;
        this.dispatchEvent(event)
    };
    p._sendFileComplete = function(item, loader) {
        if(this._isCanceled()) {
            return
        }
        var event = new createjs.Event("fileload");
        event.loader = loader;
        event.item = item;
        event.result = this._loadedResults[item.id];
        event.rawResult = this._loadedRawResults[item.id];
        if(item.completeHandler) {
            item.completeHandler(event)
        }
        this.hasEventListener("fileload") && this.dispatchEvent(event)
    };
    p._sendFileStart = function(item) {
        var event = new createjs.Event("filestart");
        event.item = item;
        this.hasEventListener("filestart") && this.dispatchEvent(event)
    };
    p.toString = function() {
        return"[PreloadJS LoadQueue]"
    };
    createjs.LoadQueue = LoadQueue;
    var BrowserDetect = function() {
    };
    BrowserDetect.init = function() {
        var agent = navigator.userAgent;
        BrowserDetect.isFirefox = createjs.indexOf(agent, "Firefox") > -1;
        BrowserDetect.isOpera = window.opera != null;
        BrowserDetect.isChrome = createjs.indexOf(agent, "Chrome") > -1;
        BrowserDetect.isIOS = createjs.indexOf(agent, "iPod") > -1 || createjs.indexOf(agent, "iPhone") > -1 || createjs.indexOf(agent, "iPad") > -1
    };
    BrowserDetect.init();
    createjs.LoadQueue.BrowserDetect = BrowserDetect
})();
this.createjs = this.createjs || {};
(function() {
    var TagLoader = function(item, basePath) {
        this.init(item, basePath)
    };
    var p = TagLoader.prototype = new createjs.AbstractLoader;
    p._loadTimeout = null;
    p._tagCompleteProxy = null;
    p._isAudio = false;
    p._tag = null;
    p._jsonResult = null;
    p.init = function(item, basePath) {
        this._item = item;
        this._basePath = basePath;
        this._tag = item.tag;
        this._isAudio = window.HTMLAudioElement && item.tag instanceof HTMLAudioElement;
        this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
    };
    p.getResult = function() {
        if(this._item.type == createjs.LoadQueue.JSONP) {
            return this._jsonResult
        }else {
            return this._tag
        }
    };
    p.cancel = function() {
        this.canceled = true;
        this._clean();
        var item = this.getItem()
    };
    p.load = function() {
        var item = this._item;
        var tag = this._tag;
        clearTimeout(this._loadTimeout);
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
        if(this._isAudio) {
            tag.src = null;
            tag.preload = "auto"
        }
        tag.onerror = createjs.proxy(this._handleError, this);
        if(this._isAudio) {
            tag.onstalled = createjs.proxy(this._handleStalled, this);
            tag.addEventListener("canplaythrough", this._tagCompleteProxy, false)
        }else {
            tag.onload = createjs.proxy(this._handleLoad, this);
            tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this)
        }
        var src = this.buildPath(item.src, this._basePath, item.values);
        switch(item.type) {
            case createjs.LoadQueue.CSS:
                tag.href = src;
                break;
            case createjs.LoadQueue.SVG:
                tag.data = src;
                break;
            default:
                tag.src = src
        }
        if(item.type == createjs.LoadQueue.JSONP) {
            if(item.callback == null) {
                throw new Error("callback is required for loading JSONP requests.");
            }
            if(window[item.callback] != null) {
                throw new Error('JSONP callback "' + item.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
            }
            window[item.callback] = createjs.proxy(this._handleJSONPLoad, this)
        }
        if(item.type == createjs.LoadQueue.SVG || item.type == createjs.LoadQueue.JSONP || item.type == createjs.LoadQueue.JSON || item.type == createjs.LoadQueue.JAVASCRIPT || item.type == createjs.LoadQueue.CSS) {
            this._startTagVisibility = tag.style.visibility;
            tag.style.visibility = "hidden";
            (document.body || document.getElementsByTagName("body")[0]).appendChild(tag)
        }
        if(tag.load != null) {
            tag.load()
        }
    };
    p._handleJSONPLoad = function(data) {
        this._jsonResult = data
    };
    p._handleTimeout = function() {
        this._clean();
        var event = new createjs.Event("error");
        event.text = "PRELOAD_TIMEOUT";
        this._sendError(event)
    };
    p._handleStalled = function() {
    };
    p._handleError = function(event) {
        this._clean();
        var newEvent = new createjs.Event("error");
        this._sendError(newEvent)
    };
    p._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var tag = this.getItem().tag;
        if(tag.readyState == "loaded" || tag.readyState == "complete") {
            this._handleLoad()
        }
    };
    p._handleLoad = function(event) {
        if(this._isCanceled()) {
            return
        }
        var item = this.getItem();
        var tag = item.tag;
        if(this.loaded || this.isAudio && tag.readyState !== 4) {
            return
        }
        this.loaded = true;
        switch(item.type) {
            case createjs.LoadQueue.SVG:
                ;
            case createjs.LoadQueue.JSONP:
                tag.style.visibility = this._startTagVisibility;
                (document.body || document.getElementsByTagName("body")[0]).removeChild(tag);
                break;
            default:
        }
        this._clean();
        this._sendComplete()
    };
    p._clean = function() {
        clearTimeout(this._loadTimeout);
        var tag = this.getItem().tag;
        tag.onload = null;
        tag.removeEventListener && tag.removeEventListener("canplaythrough", this._tagCompleteProxy, false);
        tag.onstalled = null;
        tag.onprogress = null;
        tag.onerror = null;
        if(tag.parentNode) {
            tag.parentNode.removeChild(tag)
        }
        var item = this.getItem();
        if(item.type == createjs.LoadQueue.JSONP) {
            window[item.callback] = null
        }
    };
    p.toString = function() {
        return"[PreloadJS TagLoader]"
    };
    createjs.TagLoader = TagLoader
})();
this.createjs = this.createjs || {};
(function() {
    var XHRLoader = function(item, basePath) {
        this.init(item, basePath)
    };
    var p = XHRLoader.prototype = new createjs.AbstractLoader;
    p._request = null;
    p._loadTimeout = null;
    p._xhrLevel = 1;
    p._response = null;
    p._rawResponse = null;
    p.init = function(item, basePath) {
        this._item = item;
        this._basePath = basePath;
        if(!this._createXHR(item)) {
        }
    };
    p.getResult = function(rawResult) {
        if(rawResult && this._rawResponse) {
            return this._rawResponse
        }
        return this._response
    };
    p.cancel = function() {
        this.canceled = true;
        this._clean();
        this._request.abort()
    };
    p.load = function() {
        if(this._request == null) {
            this._handleError();
            return
        }
        this._request.onloadstart = createjs.proxy(this._handleLoadStart, this);
        this._request.onprogress = createjs.proxy(this._handleProgress, this);
        this._request.onabort = createjs.proxy(this._handleAbort, this);
        this._request.onerror = createjs.proxy(this._handleError, this);
        this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
        if(this._xhrLevel == 1) {
            this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT)
        }
        this._request.onload = createjs.proxy(this._handleLoad, this);
        this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        try {
            if(!this._item.values || this._item.method == createjs.LoadQueue.GET) {
                this._request.send()
            }else {
                if(this._item.method == createjs.LoadQueue.POST) {
                    this._request.send(this._formatQueryString(this._item.values))
                }
            }
        }catch(error) {
            var event = new createjs.Event("error");
            event.error = error;
            this._sendError(event)
        }
    };
    p.getAllResponseHeaders = function() {
        if(this._request.getAllResponseHeaders instanceof Function) {
            return this._request.getAllResponseHeaders()
        }else {
            return null
        }
    };
    p.getResponseHeader = function(header) {
        if(this._request.getResponseHeader instanceof Function) {
            return this._request.getResponseHeader(header)
        }else {
            return null
        }
    };
    p._handleProgress = function(event) {
        if(!event || event.loaded > 0 && event.total == 0) {
            return
        }
        var newEvent = new createjs.Event("progress");
        newEvent.loaded = event.loaded;
        newEvent.total = event.total;
        this._sendProgress(newEvent)
    };
    p._handleLoadStart = function(event) {
        clearTimeout(this._loadTimeout);
        this._sendLoadStart()
    };
    p._handleAbort = function(event) {
        this._clean();
        var event = new createjs.Event("error");
        event.text = "XHR_ABORTED";
        this._sendError(event)
    };
    p._handleError = function(event) {
        this._clean();
        var newEvent = new createjs.Event("error");
        this._sendError(newEvent)
    };
    p._handleReadyStateChange = function(event) {
        if(this._request.readyState == 4) {
            this._handleLoad()
        }
    };
    p._handleLoad = function(event) {
        if(this.loaded) {
            return
        }
        this.loaded = true;
        if(!this._checkError()) {
            this._handleError();
            return
        }
        this._response = this._getResponse();
        this._clean();
        var isComplete = this._generateTag();
        if(isComplete) {
            this._sendComplete()
        }
    };
    p._handleTimeout = function(event) {
        this._clean();
        var newEvent = new createjs.Event("error");
        newEvent.text = "PRELOAD_TIMEOUT";
        this._sendError(event)
    };
    p._checkError = function() {
        var status = parseInt(this._request.status);
        switch(status) {
            case 404:
                return false;
            break;
            case 0:
                return true
            break;
        }
        return true
    };
    p._getResponse = function() {
        if(this._response != null) {
            return this._response
        }
        if(this._request.response != null) {
            return this._request.response
        }
        try {
            if(this._request.responseText != null) {
                return this._request.responseText
            }
        }catch(e) {
        }
        try {
            if(this._request.responseXML != null) {
                return this._request.responseXML
            }
        }catch(e) {
        }
        return null
    };
    p._createXHR = function(item) {
        var target = document.createElement("a");
        target.href = this.buildPath(item.src, this._basePath);
        var host = document.createElement("a");
        host.href = location.href;
        var crossdomain = target.hostname != "" && (target.port != host.port || target.protocol != host.protocol || target.hostname != host.hostname);
        var req = null;
        if(crossdomain && window.XDomainRequest) {
            req = new XDomainRequest
        }else {
            if(window.XMLHttpRequest) {
                req = new XMLHttpRequest
            }else {
                try {
                    req = new ActiveXObject("Msxml2.XMLHTTP.6.0")
                }catch(e) {
                    try {
                        req = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                    }catch(e) {
                        try {
                            req = new ActiveXObject("Msxml2.XMLHTTP")
                        }catch(e) {
                            return false
                        }
                    }
                }
            }
        }
        if(item.type == createjs.LoadQueue.TEXT && req.overrideMimeType) {
            req.overrideMimeType("text/plain; charset=x-user-defined")
        }
        this._xhrLevel = typeof req.responseType === "string" ? 2 : 1;
        var src = null;
        if(item.method == createjs.LoadQueue.GET) {
            src = this.buildPath(item.src, this._basePath, item.values)
        }else {
            src = this.buildPath(item.src, this._basePath)
        }
        req.open(item.method || createjs.LoadQueue.GET, src, true);
        if(crossdomain && req instanceof XMLHttpRequest && this._xhrLevel == 1) {
            req.setRequestHeader("Origin", location.origin)
        }
        if(item.values && item.method == createjs.LoadQueue.POST) {
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        if(createjs.LoadQueue.isBinary(item.type)) {
            req.responseType = "arraybuffer"
        }
        this._request = req;
        return true
    };
    p._clean = function() {
        clearTimeout(this._loadTimeout);
        var req = this._request;
        req.onloadstart = null;
        req.onprogress = null;
        req.onabort = null;
        req.onerror = null;
        req.onload = null;
        req.ontimeout = null;
        req.onloadend = null;
        req.onreadystatechange = null
    };
    p._generateTag = function() {
        var type = this._item.type;
        var tag = this._item.tag;
        switch(type) {
            case createjs.LoadQueue.IMAGE:
                tag.onload = createjs.proxy(this._handleTagReady, this);
                tag.src = this.buildPath(this._item.src, this._basePath, this._item.values);
                this._rawResponse = this._response;
                this._response = tag;
                return false;
            case createjs.LoadQueue.JAVASCRIPT:
                tag = document.createElement("script");
                tag.text = this._response;
                this._rawResponse = this._response;
                this._response = tag;
                return true;
            case createjs.LoadQueue.CSS:
                var head = document.getElementsByTagName("head")[0];
                head.appendChild(tag);
                if(tag.styleSheet) {
                    tag.styleSheet.cssText = this._response
                }else {
                    var textNode = document.createTextNode(this._response);
                    tag.appendChild(textNode)
                }
                this._rawResponse = this._response;
                this._response = tag;
                return true;
            case createjs.LoadQueue.XML:
                var xml = this._parseXML(this._response, "text/xml");
                this._response = xml;
                return true;
            case createjs.LoadQueue.SVG:
                var xml = this._parseXML(this._response, "image/svg+xml");
                this._rawResponse = this._response;
                if(xml.documentElement != null) {
                    tag.appendChild(xml.documentElement);
                    this._response = tag
                }else {
                    this._response = xml
                }
                return true;
            case createjs.LoadQueue.JSON:
                var json = {};
                try {
                    json = JSON.parse(this._response)
                }catch(error) {
                    json = error
                }
                this._rawResponse = this._response;
                this._response = json;
                return true
        }
        return true
    };
    p._parseXML = function(text, type) {
        var xml = null;
        if(window.DOMParser) {
            var parser = new DOMParser;
            xml = parser.parseFromString(text, type)
        }else {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(text)
        }
        return xml
    };
    p._handleTagReady = function() {
        this._sendComplete()
    };
    p.toString = function() {
        return"[PreloadJS XHRLoader]"
    };
    createjs.XHRLoader = XHRLoader
})();
if(typeof JSON !== "object") {
    JSON = {}
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if(typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\u0008":"\\b", "\t":"\\t", "\n":"\\n", "\u000c":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if(value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if(typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch(typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
                ;
            case "null":
                return String(value);
            case "object":
                if(!value) {
                    return"null"
                }
                gap += indent;
                partial = [];
                if(Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for(i = 0;i < length;i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if(rep && typeof rep === "object") {
                    length = rep.length;
                    for(i = 0;i < length;i += 1) {
                        if(typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if(v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }else {
                    for(k in value) {
                        if(Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if(v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if(typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if(typeof space === "number") {
                for(i = 0;i < space;i += 1) {
                    indent += " "
                }
            }else {
                if(typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if(replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {"":value})
        }
    }
    if(typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if(value && typeof value === "object") {
                    for(k in value) {
                        if(Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if(v !== undefined) {
                                value[k] = v
                            }else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if(cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"":j}, "") : j
            }
            throw new SyntaxError("JSON.parse");
        }
    }
})();

;

/*!
* @license TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};
(function(){var b=function(){this.initialize()},a=b.prototype;b.initialize=function(d){d.addEventListener=a.addEventListener;d.removeEventListener=a.removeEventListener;d.removeAllEventListeners=a.removeAllEventListeners;d.hasEventListener=a.hasEventListener;d.dispatchEvent=a.dispatchEvent};a._listeners=null;a.initialize=function(){};a.addEventListener=function(d,a){var c=this._listeners;c?this.removeEventListener(d,a):c=this._listeners={};var b=c[d];b||(b=c[d]=[]);b.push(a);return a};a.removeEventListener=
function(d,a){var c=this._listeners;if(c){var b=c[d];if(b)for(var f=0,g=b.length;f<g;f++)if(b[f]==a){1==g?delete c[d]:b.splice(f,1);break}}};a.removeAllEventListeners=function(d){d?this._listeners&&delete this._listeners[d]:this._listeners=null};a.dispatchEvent=function(d,a){var c=!1,b=this._listeners;if(d&&b){"string"==typeof d&&(d={type:d});b=b[d.type];if(!b)return c;d.target=a||this;for(var b=b.slice(),f=0,g=b.length;f<g;f++)var j=b[f],c=j.handleEvent?c||j.handleEvent(d):c||j(d)}return!!c};a.hasEventListener=
function(d){var a=this._listeners;return!(!a||!a[d])};a.toString=function(){return"[EventDispatcher]"};createjs.EventDispatcher=b})();this.createjs=this.createjs||{};
(function(){var b=function(d,a,c){this.initialize(d,a,c)},a=b.prototype;b.NONE=0;b.LOOP=1;b.REVERSE=2;b.IGNORE={};b._tweens=[];b._plugins={};b.get=function(d,a,c,e){e&&b.removeTweens(d);return new b(d,a,c)};b.tick=function(d,a){for(var c=b._tweens.slice(),e=c.length-1;0<=e;e--){var f=c[e];a&&!f.ignoreGlobalPause||f._paused||f.tick(f._useTicks?1:d)}};createjs.Ticker&&createjs.Ticker.addListener(b,!1);b.removeTweens=function(d){if(d.tweenjs_count){for(var a=b._tweens,c=a.length-1;0<=c;c--)a[c]._target==
d&&(a[c]._paused=!0,a.splice(c,1));d.tweenjs_count=0}};b.removeAllTweens=function(){for(var d=b._tweens,a=0,c=d.length;a<c;a++){var e=d[a];e.paused=!0;e.target.tweenjs_count=0}d.length=0};b.hasActiveTweens=function(d){return d?d.tweenjs_count:b._tweens&&b._tweens.length};b.installPlugin=function(d,a){var c=d.priority;null==c&&(d.priority=c=0);for(var e=0,f=a.length,g=b._plugins;e<f;e++){var j=a[e];if(g[j]){for(var l=g[j],k=0,p=l.length;k<p&&!(c<l[k].priority);k++);g[j].splice(k,0,d)}else g[j]=[d]}};
b._register=function(d,a){var c=d._target;a?(c&&(c.tweenjs_count=c.tweenjs_count?c.tweenjs_count+1:1),b._tweens.push(d)):(c&&c.tweenjs_count--,c=b._tweens.indexOf(d),-1!=c&&b._tweens.splice(c,1))};a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.ignoreGlobalPause=!1;a.loop=!1;a.duration=0;a.pluginData=null;a.onChange=null;a.change=null;a.target=null;a.position=null;
a._paused=!1;a._curQueueProps=null;a._initQueueProps=null;a._steps=null;a._actions=null;a._prevPosition=0;a._stepPosition=0;a._prevPos=-1;a._target=null;a._useTicks=!1;a.initialize=function(d,a,c){this.target=this._target=d;a&&(this._useTicks=a.useTicks,this.ignoreGlobalPause=a.ignoreGlobalPause,this.loop=a.loop,this.onChange=a.onChange,a.override&&b.removeTweens(d));this.pluginData=c||{};this._curQueueProps={};this._initQueueProps={};this._steps=[];this._actions=[];a&&a.paused?this._paused=!0:b._register(this,
!0);a&&null!=a.position&&this.setPosition(a.position,b.NONE)};a.wait=function(a){if(null==a||0>=a)return this;var b=this._cloneProps(this._curQueueProps);return this._addStep({d:a,p0:b,e:this._linearEase,p1:b})};a.to=function(a,b,c){if(isNaN(b)||0>b)b=0;return this._addStep({d:b||0,p0:this._cloneProps(this._curQueueProps),e:c,p1:this._cloneProps(this._appendQueueProps(a))})};a.call=function(a,b,c){return this._addAction({f:a,p:b?b:[this],o:c?c:this._target})};a.set=function(a,b){return this._addAction({f:this._set,
o:this,p:[a,b?b:this._target]})};a.play=function(a){return this.call(a.setPaused,[!1],a)};a.pause=function(a){a||(a=this);return this.call(a.setPaused,[!0],a)};a.setPosition=function(a,b){0>a&&(a=0);null==b&&(b=1);var c=a,e=!1;c>=this.duration&&(this.loop?c%=this.duration:(c=this.duration,e=!0));if(c==this._prevPos)return e;var f=this._prevPos;this.position=this._prevPos=c;this._prevPosition=a;if(this._target)if(e)this._updateTargetProps(null,1);else if(0<this._steps.length){for(var g=0,j=this._steps.length;g<
j&&!(this._steps[g].t>c);g++);g=this._steps[g-1];this._updateTargetProps(g,(this._stepPosition=c-g.t)/g.d)}0!=b&&0<this._actions.length&&(this._useTicks?this._runActions(c,c):1==b&&c<f?(f!=this.duration&&this._runActions(f,this.duration),this._runActions(0,c,!0)):this._runActions(f,c));e&&this.setPaused(!0);this.onChange&&this.onChange(this);this.dispatchEvent("change");return e};a.tick=function(a){this._paused||this.setPosition(this._prevPosition+a)};a.setPaused=function(a){this._paused=!!a;b._register(this,
!a);return this};a.w=a.wait;a.t=a.to;a.c=a.call;a.s=a.set;a.toString=function(){return"[Tween]"};a.clone=function(){throw"Tween can not be cloned.";};a._updateTargetProps=function(a,h){var c,e,f,g;!a&&1==h?c=e=this._curQueueProps:(a.e&&(h=a.e(h,0,1,1)),c=a.p0,e=a.p1);for(n in this._initQueueProps){if(null==(f=c[n]))c[n]=f=this._initQueueProps[n];if(null==(g=e[n]))e[n]=g=f;f=f==g||0==h||1==h||"number"!=typeof f?1==h?g:f:f+(g-f)*h;var j=!1;if(g=b._plugins[n])for(var l=0,k=g.length;l<k;l++){var p=g[l].tween(this,
n,f,c,e,h,!!a&&c==e,!a);p==b.IGNORE?j=!0:f=p}j||(this._target[n]=f)}};a._runActions=function(a,b,c){var e=a,f=b,g=-1,j=this._actions.length,l=1;a>b&&(e=b,f=a,g=j,j=l=-1);for(;(g+=l)!=j;){b=this._actions[g];var k=b.t;(k==f||k>e&&k<f||c&&k==a)&&b.f.apply(b.o,b.p)}};a._appendQueueProps=function(a){var h,c,e,f,g,j;for(j in a){if(void 0===this._initQueueProps[j]){c=this._target[j];if(h=b._plugins[j]){e=0;for(f=h.length;e<f;e++)c=h[e].init(this,j,c)}this._initQueueProps[j]=void 0===c?null:c}else c=this._curQueueProps[j];
if(h=b._plugins[j]){g=g||{};e=0;for(f=h.length;e<f;e++)h[e].step&&h[e].step(this,j,c,a[j],g)}this._curQueueProps[j]=a[j]}g&&this._appendQueueProps(g);return this._curQueueProps};a._cloneProps=function(a){var b={},c;for(c in a)b[c]=a[c];return b};a._addStep=function(a){0<a.d&&(this._steps.push(a),a.t=this.duration,this.duration+=a.d);return this};a._addAction=function(a){a.t=this.duration;this._actions.push(a);return this};a._set=function(a,b){for(var c in a)b[c]=a[c]};createjs.Tween=b})();this.createjs=this.createjs||{};
(function(){var b=function(a,b,c){this.initialize(a,b,c)},a=b.prototype;a.ignoreGlobalPause=!1;a.duration=0;a.loop=!1;a.onChange=null;a.position=null;a._paused=!1;a._tweens=null;a._labels=null;a._prevPosition=0;a._prevPos=-1;a._useTicks=!1;a.initialize=function(a,b,c){this._tweens=[];c&&(this._useTicks=c.useTicks,this.loop=c.loop,this.ignoreGlobalPause=c.ignoreGlobalPause,this.onChange=c.onChange);a&&this.addTween.apply(this,a);this.setLabels(b);c&&c.paused?this._paused=!0:createjs.Tween._register(this,
!0);c&&null!=c.position&&this.setPosition(c.position,createjs.Tween.NONE)};a.addTween=function(a){var b=arguments.length;if(1<b){for(var c=0;c<b;c++)this.addTween(arguments[c]);return arguments[0]}if(0==b)return null;this.removeTween(a);this._tweens.push(a);a.setPaused(!0);a._paused=!1;a._useTicks=this._useTicks;a.duration>this.duration&&(this.duration=a.duration);0<=this._prevPos&&a.setPosition(this._prevPos,createjs.Tween.NONE);return a};a.removeTween=function(a){var b=arguments.length;if(1<b){for(var c=
!0,e=0;e<b;e++)c=c&&this.removeTween(arguments[e]);return c}if(0==b)return!1;b=this._tweens.indexOf(a);return-1!=b?(this._tweens.splice(b,1),a.duration>=this.duration&&this.updateDuration(),!0):!1};a.addLabel=function(a,b){this._labels[a]=b};a.setLabels=function(a){this._labels=a?a:{}};a.gotoAndPlay=function(a){this.setPaused(!1);this._goto(a)};a.gotoAndStop=function(a){this.setPaused(!0);this._goto(a)};a.setPosition=function(a,b){0>a&&(a=0);var c=this.loop?a%this.duration:a,e=!this.loop&&a>=this.duration;
if(c==this._prevPos)return e;this._prevPosition=a;this.position=this._prevPos=c;for(var f=0,g=this._tweens.length;f<g;f++)if(this._tweens[f].setPosition(c,b),c!=this._prevPos)return!1;e&&this.setPaused(!0);this.onChange&&this.onChange(this);return e};a.setPaused=function(a){this._paused=!!a;createjs.Tween._register(this,!a)};a.updateDuration=function(){for(var a=this.duration=0,b=this._tweens.length;a<b;a++){var c=this._tweens[a];c.duration>this.duration&&(this.duration=c.duration)}};a.tick=function(a){this.setPosition(this._prevPosition+
a)};a.resolve=function(a){var b=parseFloat(a);isNaN(b)&&(b=this._labels[a]);return b};a.toString=function(){return"[Timeline]"};a.clone=function(){throw"Timeline can not be cloned.";};a._goto=function(a){a=this.resolve(a);null!=a&&this.setPosition(a)};createjs.Timeline=b})();this.createjs=this.createjs||{};
(function(){var b=function(){throw"Ease cannot be instantiated.";};b.linear=function(a){return a};b.none=b.linear;b.get=function(a){-1>a&&(a=-1);1<a&&(a=1);return function(b){return 0==a?b:0>a?b*(b*-a+1+a):b*((2-b)*a+(1-a))}};b.getPowIn=function(a){return function(b){return Math.pow(b,a)}};b.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}};b.getPowInOut=function(a){return function(b){return 1>(b*=2)?0.5*Math.pow(b,a):1-0.5*Math.abs(Math.pow(2-b,a))}};b.quadIn=b.getPowIn(2);b.quadOut=
b.getPowOut(2);b.quadInOut=b.getPowInOut(2);b.cubicIn=b.getPowIn(3);b.cubicOut=b.getPowOut(3);b.cubicInOut=b.getPowInOut(3);b.quartIn=b.getPowIn(4);b.quartOut=b.getPowOut(4);b.quartInOut=b.getPowInOut(4);b.quintIn=b.getPowIn(5);b.quintOut=b.getPowOut(5);b.quintInOut=b.getPowInOut(5);b.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)};b.sineOut=function(a){return Math.sin(a*Math.PI/2)};b.sineInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};b.getBackIn=function(a){return function(b){return b*
b*((a+1)*b-a)}};b.backIn=b.getBackIn(1.7);b.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}};b.backOut=b.getBackOut(1.7);b.getBackInOut=function(a){a*=1.525;return function(b){return 1>(b*=2)?0.5*b*b*((a+1)*b-a):0.5*((b-=2)*b*((a+1)*b+a)+2)}};b.backInOut=b.getBackInOut(1.7);b.circIn=function(a){return-(Math.sqrt(1-a*a)-1)};b.circOut=function(a){return Math.sqrt(1- --a*a)};b.circInOut=function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)};b.bounceIn=
function(a){return 1-b.bounceOut(1-a)};b.bounceOut=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};b.bounceInOut=function(a){return 0.5>a?0.5*b.bounceIn(2*a):0.5*b.bounceOut(2*a-1)+0.5};b.getElasticIn=function(a,b){var h=2*Math.PI;return function(c){if(0==c||1==c)return c;var e=b/h*Math.asin(1/a);return-(a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b))}};b.elasticIn=b.getElasticIn(1,0.3);b.getElasticOut=
function(a,b){var h=2*Math.PI;return function(c){if(0==c||1==c)return c;var e=b/h*Math.asin(1/a);return a*Math.pow(2,-10*c)*Math.sin((c-e)*h/b)+1}};b.elasticOut=b.getElasticOut(1,0.3);b.getElasticInOut=function(a,b){var h=2*Math.PI;return function(c){var e=b/h*Math.asin(1/a);return 1>(c*=2)?-0.5*a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b):0.5*a*Math.pow(2,-10*(c-=1))*Math.sin((c-e)*h/b)+1}};b.elasticInOut=b.getElasticInOut(1,0.3*1.5);createjs.Ease=b})();this.createjs=this.createjs||{};
(function(){var b=function(){throw"MotionGuidePlugin cannot be instantiated.";};b.priority=0;b.install=function(){createjs.Tween.installPlugin(b,["guide","x","y","rotation"]);return createjs.Tween.IGNORE};b.init=function(a,b,h){a=a.target;a.hasOwnProperty("x")||(a.x=0);a.hasOwnProperty("y")||(a.y=0);a.hasOwnProperty("rotation")||(a.rotation=0);return"guide"==b?null:h};b.step=function(a,d,h,c,e){if("guide"!=d)return c;var f;c.hasOwnProperty("path")||(c.path=[]);a=c.path;c.hasOwnProperty("end")||(c.end=
1);c.hasOwnProperty("start")||(c.start=h&&h.hasOwnProperty("end")&&h.path===a?h.end:0);if(c.hasOwnProperty("_segments")&&c._length)return c;h=a.length;if(6<=h&&0==(h-2)%4){c._segments=[];c._length=0;for(d=2;d<h;d+=4){for(var g=a[d-2],j=a[d-1],l=a[d+0],k=a[d+1],p=a[d+2],x=a[d+3],v=g,w=j,s,m,r=0,t=[],u=1;10>=u;u++){m=u/10;var q=1-m;s=q*q*g+2*q*m*l+m*m*p;m=q*q*j+2*q*m*k+m*m*x;r+=t[t.push(Math.sqrt((f=s-v)*f+(f=m-w)*f))-1];v=s;w=m}c._segments.push(r);c._segments.push(t);c._length+=r}}else throw"invalid 'path' data, please see documentation for valid paths";
f=c.orient;c.orient=!1;b.calc(c,c.end,e);c.orient=f;return c};b.tween=function(a,d,h,c,e,f,g){e=e.guide;if(void 0==e||e===c.guide)return h;e.lastRatio!=f&&(b.calc(e,(e.end-e.start)*(g?e.end:f)+e.start,a.target),e.orient&&(a.target.rotation+=c.rotation||0),e.lastRatio=f);return!e.orient&&"rotation"==d?h:a.target[d]};b.calc=function(a,d,h){void 0==a._segments&&b.validate(a);void 0==h&&(h={x:0,y:0,rotation:0});var c=a._segments,e=a.path,f=a._length*d,g=c.length-2;for(d=0;f>c[d]&&d<g;)f-=c[d],d+=2;for(var c=
c[d+1],j=0,g=c.length-1;f>c[j]&&j<g;)f-=c[j],j++;f=j/++g+f/(g*c[j]);d=2*d+2;g=1-f;h.x=g*g*e[d-2]+2*g*f*e[d+0]+f*f*e[d+2];h.y=g*g*e[d-1]+2*g*f*e[d+1]+f*f*e[d+3];a.orient&&(h.rotation=57.2957795*Math.atan2((e[d+1]-e[d-1])*g+(e[d+3]-e[d+1])*f,(e[d+0]-e[d-2])*g+(e[d+2]-e[d+0])*f));return h};createjs.MotionGuidePlugin=b})();(function(){var b=this.createjs=this.createjs||{},b=b.TweenJS=b.TweenJS||{};b.version="0.4.0";b.buildDate="Tue, 12 Feb 2013 21:08:16 GMT"})();
;

this.wozllajs = this.wozllajs || {};



(function() {

    var toString = Object.prototype.toString;

    var componentMap = {};

    wozllajs.UniqueKeyGen = 0;

    wozllajs.debug = false;

    wozllajs.isTouchSupport = 'ontouchstart' in window;

    wozllajs.proxy = function (method, scope) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
            return method.apply(scope || method, Array.prototype.slice.call(arguments, 0).concat(aArgs));
        };
    };

    wozllajs.isArray = function(testObj) {
        return wozllajs.is(testObj, 'Array');
    };

    wozllajs.is = function(testObj, type) {
        return toString.call(testObj).toLowerCase() === '[object ' + type.toLowerCase() + ']';
    };

    wozllajs.indexOf = function(obj, arr) {
        var i, len;
        for(i=0, len=arr.length; i<len; i++) {
            if(arr[i] === obj) {
                return i;
            }
        }
        return -1;
    };

    wozllajs.arrayRemove = function(obj, arr) {
        var idx = wozllajs.indexOf(obj, arr);
        if(idx !== -1) {
            arr.splice(idx, 1);
        }
        return idx;
    };

    wozllajs.createCanvas = function(width, height) {
        var c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        return c;
    };

    wozllajs.namespace = function(ns, root) {
        var NSList = ns.split(".");
        var step = root || wozllajs;
        var k = null;
        while (k = NSList.shift()) {
            if (step[k] === undefined) {
                if(wozllajs.debug) {
                    console.log("[Warn] can't found namespace '" + ns + "'");
                }
                return null;
            }
            step = step[k];
        }
        return step;
    };

    wozllajs.printComponent = function() {
        console.log('ComponentMap: ', componentMap);
    };

    wozllajs.createComponent = function(namespace, params) {
        var cmpConstructor = componentMap[namespace];
        if(!cmpConstructor) {
            console.log("Can't find Component '" + namespace + "'");
            return null;
        }
        return new cmpConstructor(params);
    };

    wozllajs.defineComponent = function(namespace, maker) {
        var NSList = namespace.split(".");
        var step = wozllajs;
        var k = null;
        var superConstructor;
        var cmpConstructor;
        var cmpProto;
        var extend;
        var baseCmp;
        var superName;
        var name = namespace.indexOf('.') !== -1 ? namespace.substr(namespace.lastIndexOf('.')+1) : namespace;
        while (k = NSList.shift()) {
            if (NSList.length) {
                if (step[k] === undefined) {
                    step[k] = {};
                }
                step = step[k];
            } else {
                if(step[k]) {
                    //console.log('The namespace "' + namespace + '" has been regsitered, override it.');
                }
                if(typeof maker === 'function') {
                    cmpConstructor = maker();
                } else if(typeof maker === 'object') {
                    baseCmp = {
                        'Renderer' : wozllajs.Renderer,
                        'Collider' : wozllajs.Collider,
                        'Layout'   : wozllajs.Layout,
                        'Behaviour' : wozllajs.Behaviour,
                        'HitTestDelegate' : wozllajs.HitTestDelegate,
                        'Filter' : wozllajs.Filter
                    };
                    extend = maker.extend;
                    delete maker.extend;
                    superName = extend.indexOf('.') !== -1 ? extend.substr(extend.lastIndexOf('.')+1) : extend;
                    superConstructor = baseCmp[extend] || componentMap[extend];
                    cmpConstructor = wozllajs.Component.decorate(name, maker, superName, superConstructor);
                }
                if(cmpConstructor) {
                    cmpProto = cmpConstructor.prototype;
                    cmpProto.id = namespace;
                    componentMap[namespace] = cmpConstructor;
                    componentMap[cmpProto.alias] = cmpConstructor;
                    step[k] = cmpConstructor;
                } else {
                    throw new Error('Error in defineComponent: ' + namespace);
                }
            }
        }
    };
    
})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.geom = {
    vectorLength : function(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    },
    vectorNomalize : function(v) {
        var len = Math.sqrt(v.x * v.x + v.y * v.y);
        if (len <= Number.MIN_VALUE) {
            return 0.0;
        }
        var invL = 1.0 / len;
        v.x *= invL;
        v.y *= invL;
        return len;
    },
    rectIntersection : function(a, b) {
        return a.x < b.x + b.width &&
            b.x < a.x + a.width &&
            a.y < b.y + b.height &&
            b.y < a.y + a.height;
    },
    rectIntersection2 : function(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw &&
            bx < ax + aw &&
            ay < by + bh &&
            by < ay + ah;
    },
    pointInRect : function(p, r) {
        return r.x <= p.x && r.x + r.width >= p.x &&
            r.y <= p.y && r.y + r.height >= p.y;
    },
    pointInRect2 : function(x, y, rx, ry, rw, rh) {
        return rx <= x && rx + rw >= x &&
            ry <= y && ry + rh >= y;
    }
};;

this.wozllajs = this.wozllajs || {};

(function() {

	var Array2D = function() {
		this.data = {};
	};

	Array2D.prototype = {
        push : function(key, val) {
            this.data[key] = this.data[key] || [];
            this.data[key].push(val);
        },
        get : function(key) {
            if(key === undefined) {
                return this.data;
            }
            return this.data[key] || [];
        },
        sort : function(key, sorter) {
            this.data[key].sort(sorter);
            return this;
        },
        remove : function(key, val) {
            var idx, i, len;
            var array = this.data[key];
            if(!array) {
                return false;
            }
            for(i=0,len=array.length; i<len; i++) {
                if(array[i] === val) {
                    idx = i;
                    break;
                }
            }
            if(idx !== undefined) {
                array.splice(idx, 1);
                return true;
            }
            return false;
        },
        clear : function(key) {
            if(key) {
                this.data[key] = undefined;
            } else {
                this.data = {};
            }
        }
    };

    wozllajs.Array2D = Array2D;

})();;

this.wozllajs = this.wozllajs || {};

(function() {

	var EventDispatcher = function() {
		this.listenerMap = new wozllajs.Array2D();
	};
	
	EventDispatcher.prototype = {
        addEventListener : function(type, listener, once) {
            if(once) {
                listener._once_flag = true;
            }
            this.listenerMap.push(type, listener);
        },
        removeEventListener : function(type, listener) {
            return this.listenerMap.remove(type, listener);
        },
        getListenersByType : function(type) {
            return this.listenerMap.get(type);
        },
        getListenerMap : function() {
            return this.listenerMap;
        },
        clearByType : function(type) {
            this.listenerMap.clear(type);
        },
        clear : function() {
            this.listenerMap.clear();
        },
        sort : function(type, func) {
            this.listenerMap.sort(type, func);
        },
        fireEvent : function(type, params, async) {
            var i, len, listener, ret;
            var listeners = this.getListenersByType(type);
            if(!listeners || listeners.length === 0) {
                return;
            }
            // 复制一份，这样在下面的循环中即使有remove操作也不会导致一个遍历错误
            listeners = [].concat(listeners);
            if(async) {
                for(i=0, len=listeners.length; i<len; i++) {
                    listener = listeners[i];
                    (function(d, t, p, l) {
                        setTimeout(function() {
                            if(l._once_flag) {
                                d.removeEventListener(t, l);
                            }
                            l.apply(l, [p]);
                        }, 0);
                    })(this, type, params, listener);
                }
            } else {
                for(i=0, len=listeners.length; i<len; i++) {
                    listener = listeners[i];
                    if(listener._once_flag) {
                        this.removeEventListener(type, listener);
                    }
                    if(false === listener.apply(listener, [params])) {
                        return;
                    }
                }
            }
        }
    };

    wozllajs.EventDispatcher = EventDispatcher;

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.Time = (function() {

	return {

        delta : 0,

        now : 0,

        update : function() {
            var now = Date.now();
            if(this.now) {
                this.delta = now - this.now;
            }
            this.now = now;
        },

        reset : function() {
            this.delta = 0;
            this.now = 0;
        }
    };

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.Touch = (function() {

    var topCanvas;
    var touchEnabled = true;

    var mouseTouchMap = {
        'mousedown' : 'touchstart',
        'mouseup' : 'touchend',
        'mousemove' : 'touchmove'
    };

    var activeGestures = {
        'touchstart' : true,
        'touchend' : true,
        'touchmove' : true,
        'click' : true,
        'dblclick' : true
    };

    function emptyTouchStart() {}
    var listenerHolder = new wozllajs.EventDispatcher();
    var objectTouchListenerMap = {};
    var touchedGameObject;

    function getCanvasOffset() {
        var obj = topCanvas;
        var offset = { x : obj.offsetLeft, y : obj.offsetTop };
        while ( obj = obj.offsetParent ) {
            offset.x += obj.offsetLeft;
            offset.y += obj.offsetTop;
        }
        return offset;
    }

    function getListenerTouchStartKey() {
        return '_listener_touchstart';
    }

    function dispatchEvent(e) {
        var type = e.type;
        if(!touchEnabled || !activeGestures[type]) return;
        switch (type) {
            case 'touchstart' : onTouchStart(e); break;
            case 'touchmove' : onTouchMove(e); break;
            case 'touchend' : onTouchEnd(e); break;
            case 'click' : onClick(e); break;
            case 'dblclick' : onDblClick(e); break;
        }
    }

    function onTouchStart(e) {
        var i, len, listeners, listener;
        var gameObject, handler, localPos;
        var type = e.type;
        var x = e.x;
        var y = e.y;
        touchedGameObject = null;
        listeners = listenerHolder.getListenersByType(type);
        if(listeners) {
            listeners = [].concat(listeners);
            for(i=0,len=listeners.length; i<len; i++) {
                listener = listeners[i];
                gameObject = listener.gameObject;
                handler = listener.handler;
                if(!touchedGameObject) {
                    localPos = gameObject.transform.globalToLocal(x, y);
                    if(gameObject.testHit(localPos.x, localPos.y)) {
                        touchedGameObject = gameObject;
                        handler && handler(e);
                    }
                }
                else if(touchedGameObject === gameObject) {
                    if(handler && handler !== emptyTouchStart) {
                        handler(e);
                    }
                }
            }
        }
    }

    function onTouchMove(e) {
        var i, len, listeners, listener;
        var gameObject, handler;
        var type = e.type;
        listeners = listenerHolder.getListenersByType(type);
        if(listeners) {
            listeners = [].concat(listeners);
            for(i=0,len=listeners.length; i<len; i++) {
                listener = listeners[i];
                gameObject = listener.gameObject;
                handler = listener.handler;
                if(touchedGameObject && touchedGameObject === gameObject) {
                    handler && handler(e);
                }
            }
        }
    }

    function onTouchEnd(e) {
        var i, len, listeners, listener;
        var gameObject, handler;
        var type = e.type;
        listeners = listenerHolder.getListenersByType(type);
        if(listeners) {
            listeners = [].concat(listeners);
            for(i=0,len=listeners.length; i<len; i++) {
                listener = listeners[i];
                gameObject = listener.gameObject;
                handler = listener.handler;
                if(touchedGameObject && touchedGameObject === gameObject) {
                    handler && handler(e);
                }
            }
        }
    }

    function onClick(e) {
        var i, len, listeners, listener;
        var gameObject, handler, localPos;
        var type = e.type;
        var x = e.x;
        var y = e.y;
        listeners = [].concat(listenerHolder.getListenersByType(type));
        if(listeners) {
            listeners = [].concat(listeners);
            for(i=0,len=listeners.length; i<len; i++) {
                listener = listeners[i];
                gameObject = listener.gameObject;
                handler = listener.handler;
                if(touchedGameObject && touchedGameObject === gameObject) {
                    localPos = gameObject.transform.globalToLocal(x, y);
                    if(gameObject.testHit(localPos.x, localPos.y)) {
                        handler && handler(e);
                    }
                }
            }
        }
    }

    function onEvent(e) {
        var touchEvent, canvasOffset, x, y, t;
        var type = e.type;
        canvasOffset = getCanvasOffset();
        if (!e.touches) {
            x = e.pageX - canvasOffset.x;
            y = e.pageY - canvasOffset.y;
        }
        // touch event
        else if(e.changedTouches) {
            t = e.changedTouches[0];
            if(e.type === 'click') {
                x = e.pageX - canvasOffset.x;
                y = e.pageY - canvasOffset.y;
            } else {
                x = t.pageX - canvasOffset.x;
                y = t.pageY - canvasOffset.y;
            }
        }
        if(type === 'mousedown') {
            type = 'touchstart';
        }
        else if(type === 'mouseup') {
            type = 'touchend';
        }
        else if(type === 'mousemove') {
            type = 'touchmove';
        }
        touchEvent = new wozllajs.TouchEvent(x, y, type, e);
        dispatchEvent(touchEvent);
    }



    return {

        init : function(canvas) {
            topCanvas = canvas;
            if(wozllajs.isTouchSupport) {
                canvas.addEventListener("touchstart", onEvent, false);
                canvas.addEventListener("touchend", onEvent, false);
                canvas.addEventListener("touchmove", onEvent, false);
            } else {
                var down = false;
                canvas.addEventListener("mousedown", function(e) {
                    down = true;
                    onEvent(e);
                }, false);
                canvas.addEventListener("mouseup", function(e) {
                    down = false;
                    onEvent(e);
                }, false);
                canvas.addEventListener("mousemove", function(e) {
                    if(down) {
                        onEvent(e);
                    }
                }, false);
            }
            canvas.addEventListener("click", onEvent, false);
        },

        dispatchEvent : function(stageTouchEvent) {
            dispatchEvent(stageTouchEvent);
        },

        disable : function() {
            touchEnabled = false;
        },

        enable : function() {
            touchEnabled = true;
        },

        isTouchEvent : function(type) {
            return activeGestures[type] !== undefined;
        },

        on : function(type, gameObject, listener) {
            var autoTouchstartList, autoTouchstart;
            var layerZ = wozllajs.LayerManager.getLayerZ(gameObject.getEventLayer());
            type = mouseTouchMap[type] || type;
            if(type !== 'touchstart') {
                autoTouchstartList = listener[getListenerTouchStartKey()]
                    = listener[getListenerTouchStartKey()] || [];
                autoTouchstart = {
                    gameObject : gameObject,
                    handler : emptyTouchStart,
                    layerZ : layerZ
                };
                autoTouchstartList.push(autoTouchstart);
                listenerHolder.addEventListener('touchstart', autoTouchstart);
                listenerHolder.sort('touchstart', function(a, b) {
                    return b.layerZ - a.layerZ;
                });
            }
            listenerHolder.addEventListener(type, {
                gameObject : gameObject,
                handler : listener,
                layerZ : layerZ
            });
            listenerHolder.sort(type, function(a, b) {
                return b.layerZ - a.layerZ;
            });
        },

        off : function(type, gameObject, listener) {
            var i, l, len, j, len2, autoTouchstartList;
            var listeners = listenerHolder.getListenersByType(type);
            type = mouseTouchMap[type] || type;
            if(listeners) {
                for(i=0,len=listeners.length; i<len; i++) {
                    l = listeners[i];
                    if(l.gameObject === gameObject && l.handler === listener) {

                        listenerHolder.removeEventListener(type, l);
                        autoTouchstartList = listener[getListenerTouchStartKey()];
                        if(autoTouchstartList) {
                            for(j=0,len2=autoTouchstartList.length; j<len2; j++) {
                                listenerHolder.removeEventListener('touchstart', autoTouchstartList[j]);
                            }
                            delete listener[getListenerTouchStartKey()];
                        }
                        return;
                    }
                }
            }
        },

        getListenerHolder : function() {
            return listenerHolder;
        }
    }

})();;

this.wozllajs = this.wozllajs || {};

(function() {

    var TouchEvent = function(x, y, type, nativeEvent) {
        this.x = x;
        this.y = y;
        this.nativeEvent = nativeEvent;
        this.type = type;
    };

    wozllajs.TouchEvent = TouchEvent;

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.EventAdmin = (function() {

    var eventDispatcher = new wozllajs.EventDispatcher();

    function getProxyKey(type) {
        return '_wozllajs_proxy_' + type;
    }

    return {

        once : function(type, gameObject, listener, scope) {
            wozllajs.EventAdmin.on(type, gameObject, listener, scope, true);
        },

        on : function(type, gameObject, listener, scope, once) {
            var proxyKey, proxy;
            if(typeof gameObject === 'function') {
                listener = gameObject;
            }
            proxyKey = getProxyKey(type);
            proxy = wozllajs.proxy(listener, scope || window);
            listener[proxyKey] = listener[proxyKey] || [];
            listener[proxyKey].push(proxy);
            if(wozllajs.Touch.isTouchEvent(type)) {
                wozllajs.Touch.on(type, gameObject, proxy);
            } else {
                eventDispatcher.addEventListener(type, proxy, once);
            }
        },

        off : function(type, gameObject, listener) {
            if(typeof gameObject === 'function') {
                listener = gameObject;
            }
            var proxy, i, len;
            var proxyKey = getProxyKey(type);
            var proxies = listener[proxyKey];
            var isTouch = wozllajs.Touch.isTouchEvent(type);
            if(proxies) {
                for(i=0,len=proxies.length; i<len; i++) {
                    proxy = proxies[i];
                    if(proxy) {
                        if(isTouch) {
                            wozllajs.Touch.off(type, gameObject, proxy);
                        } else {
                            eventDispatcher.removeEventListener(type, proxy);
                        }
                    }
                }
            }
            delete listener[proxyKey];
        },

        notify : function(type, params) {
            eventDispatcher.fireEvent(type, params);
        }

    };

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.Engine = (function() {

	var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(frameCall, intervalTime) {
            setTimeout(frameCall, intervalTime);
        };


    var Time = wozllajs.Time;
    var EVENT_TYPE = 'Engine';
    var engineEventDispatcher = new wozllajs.EventDispatcher();
    var running = true;
    var frameTime;

    /**
     * 主循环中一帧
     */
    function frame() {
        if(!running) {
            Time.reset();
            return;
        }
        Time.update();
        engineEventDispatcher.fireEvent(EVENT_TYPE);
        requestAnimationFrame(frame, frameTime);
    }

    return {

        /**
         * 添加一个listener在主循环中调用
         * @param listener {function}
         */
        addListener : function(listener) {
            // special for Stage
            var stage;
            if(listener.isStage) {
                stage = listener;
                if(stage.__engineTick) {
                    return;
                }
                stage.__engineTick = function() {
                    stage.update();
                    stage.lateUpdate();
                    stage.draw();
                };
                listener = stage.__engineTick;
            }
            engineEventDispatcher.addEventListener(EVENT_TYPE, listener);
        },
        /**
         * 移除主循环中的一个listener
         * @param listener {function}
         */
        removeListener : function(listener) {
            var stage;
            if(listener.isStage) {
                stage = listener;
                if(!stage.__engineTick) {
                    return;
                }
                listener = stage.__engineTick;
                stage.__engineTick = null;
            }
            engineEventDispatcher.removeEventListener(EVENT_TYPE, listener);
        },

        /**
         * 开始主循环或重新开始主循环
         */
        start : function(newFrameTime) {
            frameTime = newFrameTime || 10;
            running = true;
            requestAnimationFrame(frame, frameTime);
        },

        /**
         * 停止主循环
         */
        stop : function() {
            running = false;
        },

        /**
         * 运行一步
         */
        runStep : function() {
            Time.update();
            Time.delta = frameTime;
            engineEventDispatcher.fireEvent(EVENT_TYPE);
        }
    }

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.ResourceManager = (function() {

    var queue = new createjs.LoadQueue();
    queue.setUseXHR(false);

    var handlerQueue = [];

    var loading = false;

    function loadNext() {
        if(loading) return;
        var handler = handlerQueue.shift();
        handler && handler()
    }

    return {

        getResource : function(id) {
            return queue.getResult(id);
        },

        removeResource : function(id) {
            queue.remove(id);
        },

        load : function(params) {
            var loadHandler = function() {
                var mark = {};
                var item;
                var i;
                loading = true;
//var start = Date.now();
//console.log('start ' + start);
//console.log(params.items.length);
                for(i= 0; i<params.items.length; i++) {
                    item = params.items[i];
                    if(typeof item === 'object') {
                        item = item.id;
                    }
                    if(mark[item] || wozllajs.ResourceManager.getResource(item)) {
                        params.items.splice(i, 1);
                        i--;
                    }
                    mark[item] = true;
                }
                if(params.items.length === 0) {
                    setTimeout(params.onProgress, 0);
                    setTimeout(params.onComplete, 1);
                    loading = false;
                    loadNext();
//console.log('end ' + (Date.now() - start));
                    return;
                }
                var total = params.items.length;
                var loaded = 0;
                queue.addEventListener('fileload', function(e) {
                    params.onProgress && params.onProgress({
                        total : total,
                        loaded : ++loaded,
                        progress : loaded/total
                    });
                });
                queue.addEventListener('complete', function() {
//console.log('end ' + (Date.now() - start));
                    queue.removeAllEventListeners();
                    params.onComplete && params.onComplete();
                    loading = false;
                    loadNext();
                });
                queue.loadManifest(params.items);
            };
            handlerQueue.push(loadHandler);
            loadNext();
        },

        disposeImage : function(image) {
            image && image.dispose && image.dispose();
        }
    }

})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.LayerManager = (function() {

    var layerObjects = new wozllajs.Array2D(); // TODO 固定array2D
    var layers = {};
    var layerList = [];

    return {

        init : function(theLayers) {
            var name;
            layers = theLayers;
            for(name in theLayers) {
                layerList.push({
                    name : name,
                    z : theLayers[name]
                });
            }
            layerList.sort(function(a, b) {
                return b.z - a.z;
            });
        },

        appendTo : function(layerId, gameObject) {
            layerObjects.push(layerId, gameObject);
        },

        removeFrom : function(layerId, gameObject) {
            layerObjects.remove(layerId, gameObject);
        },

        getLayerZ : function(layerId) {
            return layers[layerId];
        },

        getLayerObjects : function(layerId) {
            return layerObjects.get(layerId);
        },

        getSortedLayerList : function() {
            return layerList;
        }
    }

})();;

this.wozllajs = this.wozllajs || {};

(function() {

	"use strict";

    var testHitCanvas = document.createElement('canvas');
    var testHitContext = testHitCanvas.getContext('2d');
    testHitCanvas.width = 1;
    testHitCanvas.height = 1;

	var GameObject = function(id) {
		this.initialize(id);
	};

	GameObject.prototype = {

        UID : null,

		id : null,

        isGameObject : true,

		transform : null,

		_renderer : null,

		_collider : null,

        _layout : null,

		_behaviours : null,

        _filters : null,

        _aliasMap : null,

		_parent : null,

		_componentInited : false,

		_active : true,

		_visible : true,

        _layer : null,

        _mouseEnable : true,

        _hitTestDelegate : null,

		_children : null,

		_childrenMap : null,

		_resources : null,

        _cacheCanvas : null,

        _cacheContext : null,

        _cached : false,

        _cacheOffsetX : 0,

        _cacheOffsetY : 0,

		initialize : function(id) {
            this.UID = wozllajs.UniqueKeyGen ++;
			this.id = id;
			this.transform = new wozllajs.Transform();
			this._behaviours = {};
            this._filters = {};
            this._aliasMap = {};
			this._children = [];
			this._childrenMap = {};
			this._resources = [];
		},

		getParent : function() {
			return this._parent;
		},

        getPath : function(seperator) {
            var o = this;
            var path = [];
            var deep = 0;
            while(o) {
                path.unshift(o.id);
                o = o._parent;
            }
            return path.join(seperator || '.');
        },

        getStage : function() {
            var o = this;
            while(o && !o.isStage) {
                o = o._parent;
            }
            return o;
        },

		getObjectById : function(id) {
        	return this._childrenMap[id];
    	},

	    addObject : function(obj) {
	        this._childrenMap[obj.id] = obj;
	        this._children.push(obj);
	        obj._parent = this;
            obj.transform.parent = this.transform;
	    },

	    removeObject : function(idOrObj) {
	        var children = this._children;
	        var obj = typeof idOrObj === 'string' ? this._childrenMap[idOrObj] : idOrObj;
	        var idx = wozllajs.arrayRemove(obj, children);
	        if(idx !== -1) {
	            delete this._childrenMap[obj.id];
                obj._parent = null;
                obj.transform.parent = null;
	        }
	        return idx;
	    },

	    remove : function() {
	        this._parent.removeObject(this);
	        this._parent = null;
	    },

	    findObjectById : function(id) {
	    	var i, len, children;
	        var obj = this.getObjectById(id);
	        if(!obj) {
	            children = this._children;
	            for(i=0,len=children.length; i<len; i++) {
	                obj = children[i].findObjectById(id);
	                if(obj) break;
	            }
	        }
	        return obj;
	    },

        findObjectByPath : function(path) {
            var i, len;
            var paths = path.split('.');
            var obj = this.findObjectById(paths[0]);
            if(obj) {
                for(i=1, len=paths.length; i<len; i++) {
                    obj = obj.getObjectById(paths[i]);
                    if(!obj) return null;
                }
            }
            return obj;
        },

        getChildren : function() {
            return this._children;
        },

        sortChildren : function(func) {
            this._children.sort(func);
        },

	    isActive : function(parent) {
            if(!parent) {
	    	    return this._active;
            } else {
                var active = true;
                var o = this;
                while(o) {
                    active = active && o._active;
                    if(!active) {
                        return false;
                    }
                    o = o._parent;
                }
                return active;
            }
	    },

	    setActive : function(active) {
	        this._active = !!active;
	    },

	    isVisible : function(parent) {
            if(!parent) {
                return this._visible;
            } else {
                var visible = true;
                var o = this;
                while(o) {
                    visible = visible && o._visible;
                    if(!visible) {
                        return false;
                    }
                    o = o._parent;
                }
                return visible;
            }
	    },

	    setVisible : function(visible) {
	        this._visible = !!visible;
	    },

        getLayer : function(fromParent) {
            if(!fromParent) {
                return this._layer;
            }
            var o = this;
            while(o && !o._layer) {
                o = o._parent;
            }
            return o && o._layer;
        },

        getEventLayer : function() {
            var layer;
            var layerZ;
            var layers;
            var i, len;
            var o = this;
            var getLayerZ = wozllajs.LayerManager.getLayerZ;
            while(o) {
                if(o._layer) {
                    layers = o._layer.split(',');
                    for(i=0,len=layers.length; i<len; i++) {
                        layer = layers[i];
                        layerZ = getLayerZ(layer);
                        if(parseInt(layerZ) === layerZ) {
                            return layer;
                        }
                    }
                }
                o = o._parent;
            }
            return -9999999;
        },

        setLayer : function(layer) {
            this._layer = layer;
        },

        isInLayer : function(layer) {
            return this._layer && this._layer.indexOf(layer) !== -1;
        },

        isMouseEnable : function() {
            return this._mouseEnable;
        },

        setMouseEnable : function(enable) {
            this._mouseEnable = enable;
        },

        testHit : function(x, y) {
            var hit = false;
            if(!this.isActive(true) || !this.isVisible(true)) {
                return hit;
            }
            if(this._hitTestDelegate) {
                hit = this._hitTestDelegate.testHit(x, y);
            }
            else if(this._cacheCanvas && this._cached) {
                hit = this._cacheContext.getImageData(-this._cacheOffsetX+x, -this._cacheOffsetY+y, 1, 1).data[3] > 1;
            }
            else {
                testHitContext.setTransform(1, 0, 0, 1, -x, -y);
                this._draw(testHitContext, this.getStage().getVisibleRect());
                hit = testHitContext.getImageData(0, 0, 1, 1).data[3] > 1;
                testHitContext.setTransform(1, 0, 0, 1, 0, 0);
                testHitContext.clearRect(0, 0, 2, 2);
            }
            return hit;
        },

	    loadResources : function(params) {
			this._collectResources(this._resources);
	        wozllajs.ResourceManager.load({
	            items : this._resources,
	            onProgress : params.onProgress,
	            onComplete : params.onComplete
	        });
		},

		releaseResources : function(whiteList) {
	        var i, len, resource;
			var res = this._resources;
	        for(i=0, len=res.length; i<len; i++) {
	            resource = res[i];
	            if(wozllajs.is(resource, 'Image')) {
	                if(whiteList && wozllajs.indexOf(resource.src, whiteList) === -1) {
	                    wozllajs.ResourceManager.disposeImage(resource);
	                }
	            }
	        }
            this.uncache();
		},

	    init : function() {
	    	var i, len, layers;
			var behaviourId, behaviour;
			var children = this._children;
            this._layout && this._layout.initComponent();
	    	this._renderer && this._renderer.initComponent();
	    	this._collider && this._collider.initComponent();
	    	for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.initComponent();
	    	}

	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].init();
	    	}
            if(this._layer) {
                layers = this._layer.split(',');
                for(i=0,len=layers.length; i<len; i++) {
                    if(layers[i]) {
                        wozllajs.LayerManager.appendTo(layers[i], this);
                    }
                }
            }
	    	this._componentInited = true;

            this._layout && this._layout.onStageInit();
            this._renderer && this._renderer.onStageInit();
            this._collider && this._collider.onStageInit();
            for(behaviourId in this._behaviours) {
                behaviour = this._behaviours[behaviourId];
                behaviour && behaviour.onStageInit();
            }
		},

		destroy : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.destroyComponent();
	    	}
	    	this._collider && this._collider.destroyComponent();
	    	this._renderer && this._renderer.destroyComponent();
            this._layout && this._layout.destroyComponent();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].destroy();
	    	}
            wozllajs.LayerManager.removeFrom(this._layer, this);
		},

        layout : function() {
            var i, len;
            var children = this._children;
            this._layout && this._layout.doLayout();
            for(i=0,len=children.length; i<len; i++) {
                children[i].layout();
            }
        },

		update : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

			if(!this._componentInited || !this._active) {
				return;
			}
			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.update && behaviour.update();
	    	}
	    	this._renderer && this._renderer.update && this._renderer.update();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].update();
	    	}
		},

		lateUpdate : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

			if(!this._componentInited || !this._active) {
				return;
			}

			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.lateUpdate && behaviour.lateUpdate();
	    	}
	    	this._renderer && this._renderer.lateUpdate && this._renderer.lateUpdate();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].lateUpdate();
	    	}
		},

		draw : function(context, visibleRect) {
            var cacheContext;
			if(!this._componentInited || !this._active || !this._visible) {
				return;
			}

			context.save();
        	this.transform.updateContext(context);
            if(this._cacheCanvas) {
                if(!this._cached) {
                    this._drawCache();
                    this._cached = true;
                }
                context.drawImage(this._cacheCanvas, 0, 0);
            } else {
			    this._draw(context, visibleRect);
            }

			context.restore();
		},

        cache : function(x, y, width, height) {
            if(this._cacheCanvas) {
                this.uncache();
            }
            this._cacheOffsetX = x;
            this._cacheOffsetY = y;
            this._cacheCanvas = wozllajs.createCanvas(width, height);
            this._cacheContext = this._cacheCanvas.getContext('2d');
            this._cached = false;
        },

        updateCache : function(offsetX, offsetY) {
            this._cached = false;
            this._cacheOffsetX = offsetX || this._cacheOffsetX;
            this._cacheOffsetY = offsetY || this._cacheOffsetY;
        },

        translateCache : function(deltaX, deltaY) {
            this._cached = false;
            this._cacheOffsetX += deltaX;
            this._cacheOffsetY += deltaY;
        },

        uncache : function() {
            if(this._cacheCanvas) {
                this._cacheCanvas.dispose && this._cacheCanvas.dispose();
                this._cacheCanvas = null;
            }
            this._cached = false;
        },

		setRenderer : function(renderer) {
			this._renderer = renderer;
			renderer.setGameObject(this);
		},

		getRenderer : function() {
			return this._renderer;
		},

		setCollider : function(collider) {
			this._collider = collider;
            this._collider.setGameObject(this);
		},

		getCollider : function() {
			return this._collider;
		},

        setLayout : function(layout) {
            this._layout = layout;
            this._layout.setGameObject(this);
        },

        getLayout : function() {
            return this._layout;
        },

        setHitTestDelegate : function(delegate) {
            this._hitTestDelegate = delegate;
            this._hitTestDelegate.setGameObject(this);
        },

        getHitTestDelegate : function() {
            return this._hitTestDelegate;
        },

		addBehaviour : function(behaviour) {
			this._behaviours[behaviour.id] = behaviour;
            this._aliasMap[behaviour.alias] = behaviour;
			behaviour.setGameObject(this);
		},

		removeBehaviour : function(behaviour) {
            if(typeof behaviour === 'string') {
                behaviour = this.getBehaviour(behaviour);
                if(!behaviour) {
                    return;
                }
            }
			delete this._behaviours[behaviour.id];
            delete this._aliasMap[behaviour.alias]
			behaviour.setGameObject(null);
		},

		getBehaviour : function(id) {
			return this._behaviours[id] || this._aliasMap[id];
		},

        addFilter : function(filter) {
            this._filters[filter.id] = filter;
            filter.setGameObject(this);
        },

        removeFilter : function(filter) {
            if(typeof filter === 'string') {
                filter = this.getFilter(filter);
                if(!filter) {
                    return;
                }
            }
            delete this._filters[filter.id];
            filter.setGameObject(null);
        },

        getFilter : function(id) {
            return this._filters[id];
        },

        on : function(type, listener, scope) {
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.on(type, this, proxy, scope);
        },

        once : function(type, listener, scope) {
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.once(type, this, proxy, scope);
        },

        off : function(type, listener, scope) {
            wozllajs.EventAdmin.off(type, this, listener[this._getSimpleProxyKey(scope, type)]);
        },

        notify : function(type, params) {
            wozllajs.EventAdmin.notify(type, params);
        },

        _getSimpleProxyKey : function(scope, type) {
            return '_sp_' + scope.UID + '.' + type;
        },

		_draw : function(context, visibleRect) {
			var i, len;
			var children = this._children;

			this._renderer && this._renderer.draw(context, visibleRect);
			for(i=0,len=children.length; i<len; i++) {
	    		children[i].draw(context, visibleRect);
	    	}
		},

        _drawCache : function(context, visibleRect) {
            var cacheContext = this._cacheContext;
            cacheContext.clearRect(0, 0, this._cacheCanvas.width, this._cacheCanvas.height);
            cacheContext = this._cacheContext;
            cacheContext.translate(-this._cacheOffsetX, -this._cacheOffsetY);
            this._draw(cacheContext, visibleRect);
            cacheContext.translate(this._cacheOffsetX, this._cacheOffsetY);
            this._applyFilters(cacheContext, 0, 0, this._cacheCanvas.width, this._cacheCanvas.height);
        },

        _applyFilters : function(cacheContext, x, y, width, height) {
            for(var id in this._filters) {
                cacheContext.save();
                this._filters[id].applyFilter(cacheContext, x, y, width, height);
                cacheContext.restore();
            }
        },

		_collectResources : function(collection) {
			var behaviourId, behaviour;
            var i, len;
            var children = this._children;
			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour._collectResources(collection);
	    	}
	    	this._renderer && this._renderer._collectResources(collection);
            for(i=0,len=children.length; i<len; i++) {
                children[i]._collectResources(collection);
            }
		}

	};

	wozllajs.GameObject = GameObject;

})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	var visibleRect = {
		x : 0,
		y : 0,
		width : 0,
		height : 0
	};

	function Stage(stageId, canvasIdOrElt, width, height) {
		this.initialize(stageId, canvasIdOrElt, width, height);
	}

	var p = Stage.prototype = Object.create(wozllajs.GameObject.prototype);

	p.isStage = true;

	p.stageCanvas = null;

	p.stageContext = null;

	p.width = 0;

	p.height = 0;

	p.autoClear = false;

	p.GameObject_initialize = p.initialize;

	p.initialize = function(stageId, canvasIdOrElt, width, height) {
		this.GameObject_initialize(stageId);
		this.stageCanvas = typeof canvasIdOrElt === 'string' ? 
			document.getElementById(canvasIdOrElt) : canvasIdOrElt;
		this.stageContext = this.stageCanvas.getContext('2d');
		this.width = width || 0;
		this.height = height || 0;
		this.stageCanvas.width = this.width;
		this.stageCanvas.height = this.height;
	};

    p.tick = function() {
        this.update();
        this.lateUpdate();
        this.draw();
    };

	p.GameObject_draw = p.draw;

	p.draw = function() {
		this.autoClear && this.stageContext.clearRect(0, 0, this.width, this.height);
		visibleRect.x = -this.transform.x;
		visibleRect.y = -this.transform.y;
		visibleRect.width = this.width;
		visibleRect.height = this.height;
		this.GameObject_draw(this.stageContext, visibleRect);
	};

    p.resize = function(width, height) {
        this.stageCanvas.width = width;
        this.stageCanvas.height = height;
        this.width = width;
        this.height = height;
    };

    p.getVisibleRect = function() {
        visibleRect.x = -this.transform.x;
        visibleRect.y = -this.transform.y;
        visibleRect.width = this.width;
        visibleRect.height = this.height;
        return visibleRect;
    };

	wozllajs.Stage = Stage;
	
})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	// 一个createjs类用于帮助从Transform到canvas的context中的transform参数
    var matrix = new createjs.Matrix2D();

	var Transform = function() {
		this.initialize();
	};

	Transform.prototype = {
		/**
         * The position of the Transform,
         */
        x : 0,
        y : 0,

        /**
         * The left/top offset for this Transform's registration point.
         **/
        regX : 0,
        regY : 0,

        /**
         * The rotation in degrees for this display object.
         */
        rotation : 0,

        /**
         * The scale for this Transform，1 is normal scale, 0 is invisible
         */
        scaleX : 1,
        scaleY : 1,

        /**
         * The factor to skew this display object horizontally/vertically.
         **/
        skewX : 0,
        skewY : 0,

        /**
         * The alpha (transparency) for this Transform. 0 is fully transparent, 1 is fully opaque.
         */
        alpha : 1,

        /**
         * The parent Transform of this Transform
         * @field {wozlla.Transform}
         */
        parent : null,

        initialize : function() {},

        /**
         * Get the top parent of Transform
         * @return {*}
         */
        getRoot : function() {
            var o = this;
            while(o.parent) {
                o = o.parent;
            }
            return o;
        },

        /**
         * 将一个坐标点从相对于当前Transform转换成全局的坐标点
         * @param x
         * @param y
         * @return {*}
         */
        localToGlobal : function(x, y) {
            var mtx = this.getConcatenatedMatrix();
            if (mtx == null) { return null; }
            mtx.append(1, 0, 0, 1, x, y);
            return { x : mtx.tx, y : mtx.ty };
        },

        /**
         * 与localToGlobal相反
         * @param x
         * @param y
         * @return {*}
         */
        globalToLocal : function(x, y) {
            var mtx = this.getConcatenatedMatrix();
            if (mtx == null) { return null; }
            mtx.invert();
            mtx.append(1, 0, 0, 1, x, y);
            return { x : mtx.tx, y : mtx.ty };
        },

        /**
         * 获取一个Matrix2D, 及联了所有它的parentTransform的属性, 通常很方便的用于转换坐标点
         * @return {createjs.Matrix2D}
         */
        getConcatenatedMatrix : function() {
            var o = this;
            matrix.identity();
            while (o != null) {
                matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY)
                    .prependProperties(o.alpha);
                o = o.parent;
            }
            return matrix;
        },

        /**
         * 获取当前Transform转换的Matrix2D
         * @return {Matrix2D}
         */
        getMatrix : function() {
            var o = this;
            return matrix.identity()
                .appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY)
                .appendProperties(o.alpha);
        },

        /**
         * 将当前的Transform应用到canvas的context上
         * @param context CanvasContextRenderer2d
         */
        updateContext : function(context) {
            var mtx, o=this;
            mtx = matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
            context.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            context.globalAlpha *= o.alpha;
        },

        applyTransform : function(transform) {
            this.x = transform.x;
            this.y = transform.y;
            this.regX = transform.regX;
            this.regY = transform.regY;
            this.scaleX = transform.scaleX;
            this.scaleY = transform.scaleY;
            this.rotation = transform.rotation;
            this.alpha = transform.alpha;
            this.skewX = transform.skewX;
            this.skewY = transform.skewY;
        }
    };

    wozllajs.Transform = Transform;

})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	var Component = function(params) {
		this.initialize(params);
	};

	Component.RENDERER = 'renderer';
	Component.COLLIDER = 'collider';
    Component.LAYOUT = 'layout';
    Component.FILTER = 'filter';
    Component.HIT_TEST = 'hitTest';
	Component.BEHAVIOUR = 'behaviour';

    Component.decorate = function(name, proto, superName, superConstructor) {
        superConstructor = superConstructor || Component;
        function DecorateComponent(params) {
            this.initialize(params);
        }
        var p = DecorateComponent.prototype = Object.create(superConstructor.prototype);
        for(var k in proto) {
            if(p[k] && (typeof proto[k] === 'function')) {
                p[superName + "_" + k] = p[k];
            }
            p[k] = proto[k];
        }
        return DecorateComponent;
    };

	Component.prototype = {

        UID : null,

	    id : null,

	    alias : null,

	    type : null,

        silent : false,

	    gameObject : null,

	    initialize : function(params) {
	    	this.checkParams(params);
	    	for(var p in params) {
	    		if(this[p] !== undefined) {
	    			this[p] = params[p];
	    		}
	    	}
            this.UID = wozllajs.UniqueKeyGen ++;
	    },

	    checkParams : function(params) {},

	    initComponent : function() {},

	    destroyComponent : function() {},

        onStageInit : function() {},

	    setGameObject : function(gameObject) {
	    	this.gameObject = gameObject;
	    },

	    getResourceById : function(id) {
	        return wozllajs.ResourceManager.getResource(id);
	    },

        on : function(type, listener, scope) {
            this.gameObject.on(type, listener, scope || this);
        },

        off : function(type, listener, scope) {
            this.gameObject.off(type, listener, scope || this);
        },

        notify : function(type, params) {
            this.gameObject.notify(type, params);
        },

	    _collectResources : function(collection) {}
	};

	wozllajs.Component = Component;


})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	function Renderer(params) {
		this.initialize(params);
	}

	var p = Renderer.prototype = Object.create(wozllajs.Component.prototype);

	p.type = wozllajs.Component.RENDERER;

	p.draw = function(context, visibleRect) {
		throw new Error('a subclass of Renderer must implements method "draw"');
	};

	wozllajs.Renderer = Renderer;
	
})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	function Collider(params) {
		this.initialize(params);
	}

	var p = Collider.prototype = Object.create(wozllajs.Component.prototype);

	p.type = wozllajs.Component.COLLIDER;

	p.collide = function(collider) {
		throw new Error('a subclass of Collider must implements method "collide"');
	};

	wozllajs.Collider = Collider;
	
})();;

this.wozllajs = this.wozllajs || {};

(function() {
    "use strict";

    function Layout(params) {
        this.initialize(params);
    }

    var p = Layout.prototype = Object.create(wozllajs.Component.prototype);

    p.type = wozllajs.Component.LAYOUT;

    p.initComponent = function() {
        this.doLayout();
    };

    p.doLayout = function() {};

    wozllajs.Layout = Layout;

})();;

this.wozllajs = this.wozllajs || {};

(function() {
    "use strict";

    function Filter(params) {
        this.initialize(params);
    }

    var p = Filter.prototype = Object.create(wozllajs.Component.prototype);

    p.type = wozllajs.Component.FILTER;

    p.applyFilter = function(context, x, y, width, height) {};

    wozllajs.Filter = Filter;

})();;

this.wozllajs = this.wozllajs || {};

(function() {

    "use strict";

    function HitTestDelegate(params) {
        this.initialize(params);
    }

    var p = HitTestDelegate.prototype = Object.create(wozllajs.Component.prototype);

    p.type = wozllajs.Component.HIT_TEST;

    p.testHit = function(x, y) {
        return false;
    };

    p.draw = function(context) {
    };

    wozllajs.HitTestDelegate = HitTestDelegate;

})();;

this.wozllajs = this.wozllajs || {};

(function() {
	"use strict";

	function Behaviour(params) {
		this.initialize(params);
	}

	var p = Behaviour.prototype = Object.create(wozllajs.Component.prototype);

	p.type = wozllajs.Component.BEHAVIOUR;

    /**
     * @abstract
     */
	// p.update = function(camera) {};

    /**
     * @abstract
     */
    // p.lateUpdate = function() {}

	wozllajs.Behaviour = Behaviour;
	
})();;

wozllajs.defineComponent('renderer.ImageRenderer', {

    extend : 'Renderer',

	alias : 'renderer.image',

    image : null,

    src : null,

    sourceX : null,
    sourceY : null,
    sourceW : null,
    sourceH : null,
    renderWidth : null,
    renderHeight : null,

    initComponent : function() {
        var stage = this.gameObject.getStage();
        this.image = this.getResourceById(this.src);
        if(this.image) {
            if(!this.renderWidth || !this.renderHeight) {
                this.renderWidth = this.image.width;
                this.renderHeight = this.image.height;
            }
            if(undefined === this.sourceX || undefined === this.sourceY || !this.sourceW || !this.sourceH) {
                this.sourceX = 0;
                this.sourceY = 0;
                this.sourceW = this.image.width;
                this.sourceH = this.image.height;
            }
            this.renderWidth = wozllajs.SizeParser.parse(this.renderWidth, stage);
            this.renderHeight = wozllajs.SizeParser.parse(this.renderHeight, stage);
        }
    },

    draw : function(context, visibleRect) {
        if(this.image) {
            context.drawImage(this.image,
                this.sourceX, this.sourceY, this.sourceW, this.sourceH,
                0, 0, this.renderWidth, this.renderHeight);
        }
    },

    _collectResources : function(collection) {
        if(this.src) {
            collection.push(this.src);
        }
    }

});;

wozllajs.defineComponent('renderer.TextureRenderer', {

	extend : 'Renderer',

	alias : 'renderer.texture',

    image : null,

    currentFrame : null,

    src : null,

    frames : null,

    index : null,

    initComponent : function() {
        if(this.src) {
            this.image = this.getResourceById(this.src);
        }
        if(this.index === undefined) {
            this.index = 0;
        }
        if(this.frames) {
            this.currentFrame = this.frames[this.index];
        }
    },

    changeFrameIndex : function(index) {
        this.index = index;
        this.currentFrame = this.frames[index];
    },

    draw : function(context) {
        var w, h, sw, sh;
        var f = this.currentFrame;
        if(this.image && f) {
            w = f.w || f.width;
            h = f.h || f.height;
            sw = f.sw === undefined ? w : f.sw;
            sh = f.sh === undefined ? h : f.sh;
            context.drawImage(this.image, f.x, f.y, sw, sh, 0, 0, sw, sh);
        }
    },

    _collectResources : function(res) {
        if(this.src) {
            res.push(this.src);
        }
    }

});;

wozllajs.defineComponent('renderer.AnimationSheetRenderer', {

    extend : 'Renderer',

    alias : 'renderer.animationSheet',

    image : null,

    _playingFrameSequence : null,

    _currentIndex : 0,

    _currentFrame : null,

    _currentFrameStartTime : null,

    src : null,

    frameTime : 33,

    frames : null,

    animations : null,

    defaultAnimation : null,

    initComponent : function() {
        if(this.src) {
            this.image = this.getResourceById(this.src);
        }
    },

    update : function() {
        var Time = wozllajs.Time;
        if(!this.frames) {
            return;
        }

        if(!this._currentFrameStartTime) {
            this._currentFrameStartTime = Time.now;
        }

        if(!this._playingFrameSequence) {
            this._playingFrameSequence = this.animations[this.defaultAnimation];
        }

        if(Time.now - this._currentFrameStartTime >= this.frameTime) {
            this._currentFrameStartTime = Time.now;
            this._currentIndex ++;
            if(!this._playingFrameSequence) {
                this._currentFrame = null;
            } else {
                if(this._currentIndex >= this._playingFrameSequence.length) {
                    this._currentIndex = 0;
                    this._playingFrameSequence = this.animations[this.defaultAnimation];
                }
                if(this._playingFrameSequence) {
                    this._currentFrame = this.frames[this._playingFrameSequence[this._currentIndex]];
                } else {
                    this._currentFrame = null;
                }
            }
        }
    },

    draw : function(context) {
        var frame = this._currentFrame, w, h, ox, oy;
        if(this.image && frame) {
            w = frame.width || frame.w;
            h = frame.height || frame.h;
            ox = frame.offsetX || frame.ox || 0;
            oy = frame.offsetY || frame.oy || 0;
            context.drawImage(this.image, frame.x, frame.y, w, h, ox, oy, w, h);
        }
    },

    stop : function() {
        this.defaultAnimation = null;
        this._playingFrameSequence = null;
    },

    play : function(animations, defaultAnimation) {
        var sequence = [];
        var i, len;
        if(!wozllajs.isArray(animations)) {
            animations = [animations];
        }
        for(i=0,len=animations.length; i<len; i++) {
            sequence = sequence.concat(this.animations[animations[i]]);
        }
        this._playingFrameSequence = sequence;
        this._currentIndex = 0;
        if(defaultAnimation) {
            this.defaultAnimation = defaultAnimation;
        }
    },

    _collectResources : function(collection) {
        if(this.src) {
            collection.push(this.src);
        }
    }

});;

wozllajs.defineComponent('renderer.JSONAnimationSheetRenderer', {

    extend : 'renderer.AnimationSheetRenderer',

    alias : 'renderer.jsonAnimationSheet',

    ans : null,

    frameTime : null,

    initComponent : function() {
        if(this.src) {
            this.image = this.getResourceById(this.src);
        }
        if(this.ans) {
            var ansData = this.getResourceById(this.ans);
            if(ansData) {
                this._applyData(ansData);
            }
        }
    },

    _applyData : function(ansData) {
        this.frames = ansData.frames;
        this.animations = ansData.animations;
        this.frameTime = this.frameTime || ansData.frameTime;
        this.defaultAnimation = this.defaultAnimation || ansData.defaultAnimation;
    },

    _collectResources : function(collection) {
        if(this.ans) {
            collection.push({
                id : this.ans,
                src : this.ans,
                type : 'json'
            });
            if(!this.src) {
                this.src = this.ans + '.png';
            }
        }
        if(this.src) {
            collection.push(this.src);
        }
    }

});;

wozllajs.defineComponent('renderer.JSONTextureRenderer', {

    extend : 'renderer.TextureRenderer',

    alias : 'renderer.jsonTexture',

    texture : null,

    initComponent : function() {
        if(!this.src && this.texture) {
            this.src = this.texture + '.png';
        }
        if(this.src) {
            this.image = this.getResourceById(this.src);
        }
        if(this.texture) {
            var ttData = this.getResourceById(this.texture);
            if(ttData) {
                this._applyData(ttData);
            }
        }
    },

    _applyData : function(ttData) {
        this.frames = ttData.frames;
        this.currentFrame = this.frames[this.index];
    },

    _collectResources : function(res) {
        if(this.texture) {
            res.push({
                id : this.texture,
                src  : this.texture,
                type : 'json'
            });
            if(!this.src) {
                this.src = this.texture + '.png';
            }
        }
        if(this.src) {
            res.push(this.src);
        }
    }

});;

wozllajs.defineComponent('behaviour.ConstantLoopRotation', {

    extend : 'Behaviour',

    silent : true,

    alias : 'behaviour.ConstantLoopRotation',

    speed : 1,

    update : function() {
        var trans = this.gameObject.transform;
        trans.rotation += (this.speed * wozllajs.Time.delta || 0);
        if(trans.rotation > 99999999) {
            trans.rotation = 0;
        }
    }

});;

wozllajs.defineComponent('renderer.TextureButton', {

    extend : 'renderer.JSONTextureRenderer',

    alias : 'renderer.textureButton',

    normalIndex : null,

    pressIndex : null,

    name : 'Undefined',

    initComponent : function() {
        this.JSONTextureRenderer_initComponent();
        if(this.frames) {
            this.currentFrame = this.frames[this.normalIndex];
            this.on('touchstart', this.onTouchStart, this);
            this.on('touchend', this.onTouchEnd, this);
            this.on('click', this.onClick, this);
        }
    },

    changeTextureFrameIndex : function(normalIndex, pressIndex) {
        this.normalIndex = normalIndex;
        this.pressIndex = pressIndex;
        this.currentFrame = this.frames[this.normalIndex];
    },

    onTouchStart : function() {
        this.currentFrame = this.frames[this.pressIndex];
    },

    onTouchEnd : function() {
        this.currentFrame = this.frames[this.normalIndex];
    },
    onClick : function() {
        wozllajs.EventAdmin.notify(this.name + '.click');
    },

    destroyComponent : function() {
        this.off('touchstart', this.onTouchStart, this);
        this.off('touchend', this.onTouchEnd, this);
        this.off('click', this.onClick, this);
    }

});;

this.wozllajs = this.wozllajs || {};

(function() {

    wozllajs.StageBuilder = (function() {

        return {

            buildStage : function(stageData, stage) {
                var children = stageData.children;
                for(var i= 0,len=children.length; i<len; i++) {
                    stage.addObject(this.buildGameObject(children[i]));
                }
                stage.backgroundColor = stageData.backgroundColor;
                return stage;
            },

            buildGameObject : function(objData) {
                var i, len;
                var gameObject = this.createGameObject(objData);
                var components = objData.components;
                gameObject.setActive(objData.active);
                gameObject.setVisible(objData.visible);
                gameObject.setLayer(objData.layer);
                for(i= 0,len=components.length; i<len; i++) {
                    var component = this.buildComponent(components[i]);
                    if(component.type === wozllajs.Component.RENDERER) {
                        gameObject.setRenderer(component);
                    }
                    else if(component.type === wozllajs.Component.COLLIDER) {
                        gameObject.setCollider(component);
                    }
                    else if(component.type === wozllajs.Component.HIT_TEST) {
                        gameObject.setHitTestDelegate(component);
                    }
                    else if(component.type === wozllajs.Component.LAYOUT) {
                        gameObject.setLayout(component);
                    }
                    else if(component.type === wozllajs.Component.BEHAVIOUR) {
                        gameObject.addBehaviour(component);
                    }
                    else if(component.type === wozllajs.Component.FILTER) {
                        gameObject.addFilter(component);
                    }
                }
                var children = objData.children;
                for(i= 0,len=children.length; i<len; i++) {
                    gameObject.addObject(this.buildGameObject(children[i]));
                }
                var trans = objData.transform;
                gameObject.transform.applyTransform(trans);
                return gameObject;
            },

            buildComponent : function(cmpData) {
                var cid = cmpData.cid;
                var properties = cmpData.properties;
                return wozllajs.createComponent(cid, properties);
            },

            createGameObject : function(objData) {
                return new wozllajs.GameObject(objData.gid)
            }
        };

    })();

})();;

this.wozllajs = this.wozllajs || {};

(function() {

    var Ajax = {

        getJSON : function(url, onComplete) {
            Ajax.ajax({
                url : url,
                onComplete: function(data) {
                    if(data) {
                        onComplete && onComplete(JSON.parse(data));
                    } else {
                        onComplete && onComplete({
                            fail : true,
                            status : -1
                        });
                    }
                },
                onFail : function(code) {
                    onComplete && onComplete({
                        fail : true,
                        status : code
                    });
                }
            });
        },

        get : function(url, onComplete) {
            Ajax.ajax({
                url : url,
                onComplete: onComplete
            });
        },

        ajax : function(params) {
            var xhr = new XMLHttpRequest();
            xhr.open(params.method || 'GET', params.url, true);
            try {
                xhr.send();
            } catch(e) {
                setTimeout(function() {
                    params.onFail && params.onFail(-1);
                }, 1);
            }
            xhr.onreadystatechange = function() {
                if(4 === xhr.readyState) {
                    if(xhr.status === 0 || xhr.status === 200) {
                        params.onComplete && params.onComplete(xhr.responseText);
                    } else {
                        params.onFail && params.onFail(xhr.status);
                    }
                }
            }
        }

    };

    wozllajs.Ajax = Ajax;

})();;

this.wozllajs = this.wozllajs || {};

(function() {

    function NinePatch(x, y, width, height, borders, originImage, region) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.borders = borders;
        this.originImage = originImage;
        this.region = region || {
            x: 0,
            y: 0,
            w: originImage.width,
            h: originImage.height
        };
        this.image = null;
    }

    NinePatch.prototype = {

        dispose : function() {
            if(this.image && this.image.dispose) {
                this.image.dispose();
            }
        },


        draw : function(context) {
            if(this.image) {
                context.drawImage(this.image, this.x, this.y);
            } else {
                this._draw(context);
            }
        },

        cache : function() {
            var canvas = this.image || wozllajs.createCanvas(this.width, this.height);
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, this.width, this.height);
            canvas.width = this.width;
            canvas.height = this.height;
            this._draw(ctx);
            this.image = canvas;
        },

        _draw : function(context) {
            var r = this.region;
            var b = this.borders;
            var oimg = this.originImage;
            var ow = r.w;
            var oh = r.h;
            var ctx = context;

            // top left
            ctx.drawImage(oimg, r.x, r.y, b.left, b.top,
                0, 0, b.left, b.top);

            // top
            ctx.drawImage(oimg, r.x + b.left, r.y + 0, ow- b.left- b.right, b.top,
                b.left, 0, this.width- b.left- b.right, b.top);

            // top right
            ctx.drawImage(oimg, r.x + ow- b.right, r.y + 0, b.right, b.top,
                this.width- b.right, 0, b.right, b.top);

            // left
            ctx.drawImage(oimg, r.x + 0, r.y + b.top, b.left, oh - b.top - b.bottom,
                0, b.top, b.left, this.height - b.top - b.bottom);

            // left bottom
            ctx.drawImage(oimg, r.x + 0, r.y + oh - b.bottom, b.left, b.bottom,
                0, this.height-b.bottom, b.left, b.bottom);

            // bottom
            ctx.drawImage(oimg, r.x + b.left, r.y + oh-b.bottom, ow- b.left- b.right, b.bottom,
                b.left, this.height- b.bottom, this.width- b.left- b.right, b.bottom);

            // right bottom
            ctx.drawImage(oimg, r.x + ow- b.right, r.y + oh - b.bottom, b.right, b.bottom,
                this.width- b.right, this.height-b.bottom, b.right, b.bottom);

            // right
            ctx.drawImage(oimg, r.x + ow- b.right, r.y + b.top, b.right, oh- b.top -b.bottom,
                this.width- b.right, b.top, b.right, this.height- b.top-b.bottom);

            // center
            ctx.drawImage(oimg, r.x + b.left, r.y + b.top, ow- b.left-b.right, oh- b.top -b.bottom,
                b.left, b.top, this.width- b.left- b.right, this.height- b.top-b.bottom);

        }
    };

    wozllajs.NinePatch = NinePatch;
})();;

this.wozllajs = this.wozllajs || {};

(function() {
    function RepeatImage(x, y, width, height, repeat, originImage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.repeat = repeat;
        this.originImage = originImage;
        this.image = null;
    }

    RepeatImage.prototype = {

        init : function(type) {
            var canvas = wozllajs.createCanvas(this.width, this.height);
            var ctx = canvas.getContext('2d');
            var i;
            canvas.width = this.width;
            canvas.height = this.height;

            if(this.repeat === RepeatImage.REPEAT_X) {
                if(type === RepeatImage.SCALE) {
                    ctx.drawImage(this.originImage, 0, 0,
                        this.originImage.width, this.originImage.height,
                        0, 0, this.width, this.height);
                } else if(type === RepeatImage.TILE) {
                    for(i=0; i<this.width; i+=this.originImage.width) {
                        ctx.drawImage(this.originImage, i, 0);
                    }
                }
            } else if(this.repeat === RepeatImage.REPEAT_Y) {
                // TODO repeat y
            }

            this.image = canvas;
        },
        dispose : function() {
            if(this.image.dispose) {
                this.image.dispose();
            }
        },
        draw : function(context) {
            context.drawImage(this.image, this.x, this.y);
        }

    };

    RepeatImage.REPEAT_X = 1;
    RepeatImage.REPEAT_Y = 2;

    RepeatImage.SCALE = 3;
    RepeatImage.TILE = 4;

    wozllajs.RepeatImage = RepeatImage;
})();;

this.wozllajs = this.wozllajs || {};

this.wozllajs.SizeParser = (function() {

    return {
        parse : function(size, stage) {
            var result;
            if(parseInt(size) == size) {
                return parseInt(size);
            }
            if(typeof size === 'string') {
                result = /^(\d+(\.\d+)?)%$/.exec(size);
                if(!result) {
                    return null;
                }
                return parseInt(stage.width * parseFloat(result[1]) / 100);
            } else {
                return size;
            }
        }
    }

})();;

