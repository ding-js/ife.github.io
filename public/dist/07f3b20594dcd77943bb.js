/*!
 * Copyright 2017 by Ding
 * @author Ding <ding-js@outlook.com>
 */
var ding4=webpackJsonpding_id_([4],{113:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(263);var o=i(279),n=document.querySelector("#snake-wrapper");new o.Snake(n,{width:600,height:600})},263:function(t,e){},279:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o;!function(t){t[t.empty=0]="empty",t[t.wall=1]="wall",t[t.body=2]="body",t[t.head=3]="head",t[t.footer=4]="footer",t[t.food=5]="food"}(o||(o={}));var n=function(){function t(t,e){this._boxes=[];var i={width:t.offsetWidth,height:t.offsetHeight,sideLength:14};Object.assign(i,e);var n=i.sideLength,s=i.width%n/2,h=i.height%n/2,r=i.width-2*h,a=i.height-2*s;this._content={x:h,y:s,width:r,height:a,rows:r/n,colums:a/n},this._boxTypes=(c={},c[o.empty]={background:"#ccc"},c[o.wall]={},c[o.head]={},c[o.body]={},c[o.footer]={},c[o.food]={},c),this._container=t,this._options=i,this.init();var c}return t.prototype.init=function(){var t=this._options,e=document.createElement("canvas"),i=e.getContext("2d"),n=this._content,s=t.sideLength;Object.assign(e,{width:t.width,height:t.height}),this._canvas=e,this._ctx=i,this._container.appendChild(e);for(var h=0;h<n.colums;h++){for(var r=[],a=0;a<n.rows;a++)r.push({x:n.x+h*s,y:n.y+a*s,xIndex:h,yIndex:a,type:o.empty});this._boxes.push(r)}this._snake=[this._boxes[3][4],this._boxes[4][4],this._boxes[5][4]],this.update()},t.prototype.update=function(){},t.prototype.draw=function(){var t=this._options,e=this._ctx,i=this._boxTypes,o=t.sideLength;e.clearRect(0,0,t.width,t.height),e.save(),this._boxes.forEach(function(t){t.forEach(function(t){var n=i[t.type];n.background&&(e.fillStyle=n.background,e.fillRect(t.x,t.y,o,o)),n.render&&n.render(e,t.x,t.y,o)})})},t}();e.Snake=n},286:function(t,e,i){i(18),t.exports=i(113)}},[286]);