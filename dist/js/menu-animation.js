!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e(t)}):"object"==typeof exports?module.exports=e(t):t.menuAnimation=e(t)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(f){"use strict";var n="querySelector"in document&&"addEventListener"in f,o={menu:"[data-menu-animation]",target:"a",fxClassName:"ma-fx",initiatedClass:"ma-initiated"};Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest=function(t){var e=this;if(!document.documentElement.contains(this))return null;do{if(e.matches(t))return e;e=e.parentElement}while(null!==e);return null});var i=function(){var n={},o=!1,t=0;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(o=arguments[0],t++);for(var e=function(t){for(var e in t)t.hasOwnProperty(e)&&(o&&"[object Object]"===Object.prototype.toString.call(t[e])?n[e]=i(n[e],t[e]):n[e]=t[e])};t<arguments.length;t++){e(arguments[t])}return n};return function(t){var s,c,e={},a=function(t,e,n,o){var i,r,l,s,a=parseFloat(getComputedStyle(e).transitionDuration)||parseFloat(getComputedStyle(e).webkitTransitionDuration)||parseFloat(getComputedStyle(e).mozTransitionDuration)||.3;null==t?(i=0,r=n.querySelector("li").offsetHeight):(i=t.offsetWidth,r=t.offsetHeight),null==t?s=l=0:null!=t&&t.matches("li")?(l=t.offsetLeft,s=t.offsetTop):(l=t.closest("li").offsetLeft,s=t.closest("li").offsetTop),e.setAttribute("style","width: "+i+"px;height: "+r+"px;-webkit-transform: -webkit-translate("+l+"px, "+s+"px);transform: translate("+l+"px, "+s+"px);"),e.classList.add("is-positioned"),1==o&&(c=setTimeout(function(){e.style.visibility="hidden",e.classList.remove("is-positioned")},1e3*a+16))},u=function(t,e){t.classList.contains("is-positioned")&&a(e.querySelector(".is-active"),t,e,!0)};return e.animateMenu=function(t){var r=i(s||o,t||{}),l=document.querySelectorAll(r.menu);!function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else for(var i=0,r=t.length;i<r;i++)e.call(n,t[i],i,t)}(l,function(t,e){var n=l[e],o=n.querySelector(".is-active"),i=n.querySelector(".js-menu-fx");null===i&&((i=document.createElement("div")).classList.add("js-menu-fx",r.fxClassName),n.appendChild(i)),a(o,i,n,!0),n.addEventListener("mouseover",function(t){clearTimeout(c),t.target.matches("ul")||(t.target.closest(s.target)?a(t.target,i,n,!1):a(o,i,n,!1))}),n.addEventListener("mouseout",function(t){var e=t.toElement||t.relatedTarget;null!==e&&e.closest("ul")&&null!==e.closest("ul").querySelector(".is-positioned")||u(i,n)}),setTimeout(function(){n.classList.add(r.initiatedClass)},32),f.addEventListener("blur",function(){u(i,n)})})},e.init=function(t){n&&(s=i(o,t||{}),e.animateMenu(t))},e.init(t),e}});