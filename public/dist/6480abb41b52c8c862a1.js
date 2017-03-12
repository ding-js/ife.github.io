/*!
 * Copyright 2017 by Ding
 * @author Ding <ding-js@outlook.com>
 */
var ding2=webpackJsonpding_id_([2],{108:function(t,e,i){"use strict";function o(t){var e,i,o=t.map(function(t){return t/255}),n=o[0],r=o[1],s=o[2],h=Math.max(n,r,s),a=Math.min(n,r,s),d=(h+a)/2;if(h===a)e=i=0;else{var l=h-a;switch(i=d<.5?l/(h+a):l/(2-h-a),h){case n:e=(r-s)/l+(r<s?6:0);break;case r:e=(s-n)/l+2;break;case s:e=(n-r)/l+4;break;default:return[]}e/=6}return[e,i,d].map(function(t){return Math.round(100*t)/100})}function n(t){return t.map(function(t){var e=t.toString(16);return e.length<2?"0"+e:e}).join("")}function r(t){return Array.prototype.slice.call(t.data,0,3)}function s(t){var e,i,o,n=t[0],r=t[1],s=t[2];if(0===r)e=i=o=s;else{var h=function(t,e,i){return i<0?i+=1:i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t},a=s<.5?s*(1+r):s+r-s*r,d=2*s-a;e=h(d,a,n+1/3),i=h(d,a,n),o=h(d,a,n-1/3)}return[e,i,o].map(function(t){return Math.round(255*t)})}Object.defineProperty(e,"__esModule",{value:!0}),e.Rgb2Hsl=o,e.Rgb2Hex=n,e.ImageData2Rgb=r,e.Hsl2Rgb=s},110:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(260);var o=i(278),n=document.querySelector("#container"),r=Array.prototype.slice.call(document.querySelectorAll("#rgb-info input"),0),s=Array.prototype.slice.call(document.querySelectorAll("#hsl-info input"),0),h=document.querySelector("#color-text"),a=document.querySelector("#color-preview"),d=new o.ColorPicker(n,{onBlockColorChange:function(t){var e=o.utils.ImageData2Rgb(t),i=o.utils.Rgb2Hsl(e),n="#"+o.utils.Rgb2Hex(e);r.forEach(function(t,i){t.value=e[i]}),s.forEach(function(t,e){t.value=i[e]}),h.innerHTML="RGB: "+e.join(",")+"<br>HSL: "+i.join(",")+"<br>HEX: "+n,a.style.backgroundColor=n}});document.querySelector("#rgb-info").addEventListener("change",function(t){if("input"===t.target.nodeName.toLowerCase()){var e=[],i=t.target,n=i.value,s=parseInt(n);if(""===n)return;s<0?i.value="0":s>255&&(i.value="255");for(var h=0,a=r;h<a.length;h++){var l=a[h],c=l.value;if(""===c)return;e.push(parseInt(c))}var u="#"+o.utils.Rgb2Hex(e);d.block.currentColor=u,d.bar.hideSlider()}}),document.querySelector("#hsl-info").addEventListener("change",function(t){if("input"===t.target.nodeName.toLowerCase()){var e=[],i=t.target,n=i.value,r=parseFloat(n);if(""===n)return;r<0?i.value="0":r>1&&(i.value="1");for(var h=0,a=s;h<a.length;h++){var l=a[h],c=l.value;if(""===c)return;e.push(parseFloat(c))}var u=o.utils.Hsl2Rgb(e),_="#"+o.utils.Rgb2Hex(u);d.block.currentColor=_,d.bar.hideSlider()}})},260:function(t,e){},276:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){var i=this;this._padding=10,this._showSlider=!0,this._moveEvt=!1,this._colors=["f00","ffA500","ff0","008000","00f","4b0082","800080"],this._options={lineWidth:1},this.setCoordinateByEvent=function(t){i._showSlider=!0,i.setCoordinate(t.layerY)},this.handleMouseMove=function(t){1===t.which&&i.setCoordinateByEvent(t)},e&&Object.assign(this._options,e),this._element=t,this.init()}return t.prototype.init=function(){var t=this,e=this._padding,i=this._element,o=i.getContext("2d"),n=+i.getAttribute("width"),r=+i.getAttribute("height"),s=o.createLinearGradient(e,e,e,r-2*e),h=this._colors,a=h.length;h.forEach(function(t,e){s.addColorStop(e/(a-1),"#"+t)}),this._gradient=s,this._ctx=o,this._width=n,this._height=r,o.lineWidth=this._options.lineWidth,i.addEventListener("mousedown",function(e){1===e.which&&(t._moveEvt=!0,t.setCoordinateByEvent(e),i.addEventListener("mousemove",t.handleMouseMove))}),document.addEventListener("mouseup",function(e){t._moveEvt&&1===e.which&&(t._moveEvt=!1,i.removeEventListener("mousemove",t.handleMouseMove))}),this.setCoordinate(0)},t.prototype.fill=function(){var t=this._gradient,e=this._ctx,i=this._padding;e.fillStyle=t,e.fillRect(this._padding,this._padding,this._width-2*i,this._height-2*i)},t.prototype.setCoordinate=function(t){var e,i=this._padding;e=t<i?i:t>this._height-i?this._height-i-1:t,this._y=e,this.draw()},t.prototype.renderCurrentColor=function(){if(this._showSlider){var t=this._options.lineWidth,e=this._width/2,i=this._y,o=this._width,n=6*t;if(void 0!==i){var r=this._ctx;if(r.save(),r.strokeStyle="#000",r.strokeRect(t/2,i-n/2,o-t,n),r.strokeStyle="#fff",r.strokeRect(t+t/2,i-n/2+t,o-3*t,n-2*t),r.stroke(),r.restore(),this._options.onColorChange){var s=r.getImageData(e,i,1,1);this._options.onColorChange(s)}}}},t.prototype.draw=function(){var t=this._ctx;t.clearRect(0,0,this._width,this._height),this.fill(),this.renderCurrentColor()},t.prototype.hideSlider=function(){this._showSlider&&(this._showSlider=!1,this.draw())},t}();e.ColorBar=o},277:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(108),n=function(){function t(t,e){var i=this;this._padding=10,this._moveEvt=!1,this._options={lineWidth:1},this.setCoordinateByEvent=function(t){i.setCoordinate(t.layerX,t.layerY)},this.handleMouseMove=function(t){1===t.which&&i.setCoordinateByEvent(t)},e&&Object.assign(this._options,e),this._element=t,this.init()}return t.prototype.init=function(){var t=this,e=this._padding,i=this._element,o=i.getContext("2d"),n=+i.getAttribute("width"),r=+i.getAttribute("height"),s=n-2*e,h=r-2*e;o.lineWidth=this._options.lineWidth,this._ctx=o,this._width=n,this._height=r,this._contentWidth=s,this._contentHeight=h,i.addEventListener("mousedown",function(e){1===e.which&&(t._moveEvt=!0,t.setCoordinateByEvent(e),i.addEventListener("mousemove",t.handleMouseMove))}),document.addEventListener("mouseup",function(e){t._moveEvt&&1===e.which&&(t._moveEvt=!1,i.removeEventListener("mousemove",t.handleMouseMove))}),this.setCoordinate(n/2,r/2)},t.prototype.fill=function(){var t=this._ctx,e=this._padding,i=t.createLinearGradient(this._width-e,this._height-e,e,e);t.save(),i.addColorStop(0,"#000"),void 0!==this._middleColor&&i.addColorStop(.5,this._middleColor),i.addColorStop(1,"#fff"),t.fillStyle=i,t.fillRect(this._padding,this._padding,this._contentWidth,this._contentHeight),t.restore()},t.prototype.setCoordinate=function(t,e){var i,o,n=this._padding;i=t<n?n+1:t>this._contentWidth+n?this._contentWidth+n-1:t,o=e<n?n+1:e>this._contentHeight+n?this._contentHeight+n-1:e,this._x=i,this._y=o,this.draw()},t.prototype.renderCurrentColor=function(){var t=this._x,e=this._y;if(void 0!==t&&void 0!==e){var i=this._ctx;if(i.save(),i.strokeStyle="#000",i.beginPath(),i.arc(t,e,this._padding/2,0,2*Math.PI),i.stroke(),i.strokeStyle="#fff",i.beginPath(),i.arc(t,e,this._padding/2-this._options.lineWidth,0,2*Math.PI),i.stroke(),i.restore(),this._options.onColorChange){var o=i.getImageData(t,e,1,1);this._options.onColorChange(o)}}},t.prototype.draw=function(){var t=this._ctx;t.clearRect(0,0,this._width,this._height),this.fill(),this.renderCurrentColor()},Object.defineProperty(t.prototype,"color",{set:function(t){this._middleColor=t,this.draw()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentColor",{set:function(t){var e=Math.round(this._width/2)-1,i=Math.round(this._height/2)-1,n=this._ctx;this._middleColor=t,this.draw();for(var r=[],s=0;s<3;s++)for(var h=0;h<3;h++)r.push({x:e+s,y:i+h});for(var a=0,d=r;a<d.length;a++){var l=d[a],c="#"+o.Rgb2Hex(o.ImageData2Rgb(n.getImageData(l.x,l.y,1,1)));if(c===t)return this._x=l.x,this._y=l.y,void this.draw()}this._x=e+1,this._y=i+1,this.draw()},enumerable:!0,configurable:!0}),t}();e.ColorBlock=n},278:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(277),n=i(276),r=i(108);e.utils=r;var s=function(){function t(t,e){var i={height:420,barWidth:50};Object.assign(i,e),i.blockWidth=i.height,this._options=i,this._container=t,this.init()}return t.prototype.init=function(){var t=this,e=this._options,i=document.createElement("canvas"),s=document.createElement("canvas"),h={},a={onColorChange:function(i){var o=r.ImageData2Rgb(i);t._block.color="#"+r.Rgb2Hex(o),e.onBarColorChange&&e.onBarColorChange(i)}};Object.assign(i,{width:e.blockWidth,height:e.height}),Object.assign(s,{width:e.barWidth,height:e.height}),e.onBlockColorChange&&(h.onColorChange=e.onBlockColorChange),this._container.appendChild(i),this._container.appendChild(s),this._block=new o.ColorBlock(i,h),this._bar=new n.ColorBar(s,a)},Object.defineProperty(t.prototype,"block",{get:function(){return this._block},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bar",{get:function(){return this._bar},enumerable:!0,configurable:!0}),t}();e.ColorPicker=s,e.default=s},285:function(t,e,i){i(18),t.exports=i(110)}},[285]);