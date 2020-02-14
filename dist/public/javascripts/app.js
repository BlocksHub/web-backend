"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}window.subsitutionimageurl="https://cdn.hindigamer.club/thumbnails/d8f9737603db2d077e9c6f2d5bd3eec1db8ff9fc8ef64784a5e4e6580c4519ba.png",void 0,void 0;var userData=$("#userdata");function urlencode(a){return a?(a=a.replace(/\s| /g,"-"),a=a.replace(/[^a-zA-Z\d-]+/g,""),a=a.replace(/--/g,"-"),a?a:"unnamed"):"unnamed"}$("[data-toggle=\"tooltip\"]").tooltip(),$(".formatDate").each(function(){var a=moment($(this).attr("data-date")),b=moment(a).local();$(this).html(b.format("MMMM Do YYYY, h:mm a"))});function formatDate(a){var b=moment(a),c=moment(b).local();return c.format("MMMM Do YYYY, h:mm a")}function formatCurrency(a){return 1===a?"<span style=\"color:#28a745;\"><img alt=\"$\" style=\"height: 1rem;\" src=\"https://cdn.hindigamer.club/static/money-green-2.svg\"/> </span>":"<span style=\"color:#ffc107;\"><img alt=\"$\" style=\"height: 1rem;\" src=\"https://cdn.hindigamer.club/static/coin-stack-yellow.svg\"/> </span>"}function bigNum2Small(a){return isNaN(parseInt(a))?0:1e3>a?a.toString():1e4>a?a.toString().slice(0,-3)+"K+":1e5>a?a.toString().slice(0,-3)+"K+":1e6>a?a.toString().slice(0,-3)+"K+":1e7>a?a.toString().slice(0,-6)+"M+":1e8>a?a.toString().slice(0,-6)+"M+":1e9>a?a.toString().slice(0,-6)+"M+":1e10>a?a.toString().slice(0,-9)+"B+":1e11>a?a.toString().slice(0,-9)+"B+":1e12>a?a.toString().slice(0,-9)+"B+":1e13>a?a.toString().slice(0,-12)+"T+":a.toString().slice(0,-12)+"T+"}String.prototype.escapeAllowFormatting=function(){if(this){var a=filterXSS(this,{whiteList:{h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],p:[],br:[],hr:[],bold:[],strong:[],i:[],em:[],mark:[],small:[],del:[],ins:[],sub:[],sup:[],blockquote:[],ul:[],li:[],ol:[],code:[]}});return a}},String.prototype.escapeAllowFormattingBasic=function(){if(this){var a=filterXSS(this,{whiteList:{p:[],br:[],bold:[],strong:[],i:[],em:[],mark:[],small:[],del:[],ins:[],sub:[],sup:[]}});return a}},String.prototype.escape=function(){if(this){var a=filterXSS(this,{whiteList:{}}),b={'"':"&quot;","’":"&rsquo;","‘":"&lsquo;","'":"&#39;"};return a.replace(/[&<>"']/g,function(a){return b[a]||a})}};function isAuth(){return!("true"!==userData.attr("data-authenticated"))}var auth=!1;if("true"===userData.attr("data-authenticated")){auth=!0;var userId=userData.attr("data-userid"),username=userData.attr("data-username");request("/notifications/count","GET").then(function(a){100<=a.count?a.count="99+":a=a.count.toString(),$("#notificationCount").html(a)})["catch"](function(){});var balOne=$("#currencyBalanceOne").attr("data-amt");balOne=bigNum2Small(parseInt(balOne)),$("#currencyBalanceOne").html(balOne);var balTwo=$("#currencyBalanceTwo").attr("data-amt");balTwo=bigNum2Small(parseInt(balTwo)),$("#currencyBalanceTwo").html(balTwo),$("[data-toggle=\"currency\"]").tooltip(),$(".displayCurrency").show(),$(document).on("click","#logoutAClick",function(){request("/logout","POST","{}").then(function(){window.location.reload()})["catch"](function(){warning("There was an error logging you out. Please reload the page, and try again.")})})}else;function toast(a,b){a=a?"success":"error";var c=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3});c.fire({type:a,title:b})}function nform(a,b,c,d){return number_format(a,b,c,d)}function number_format(a,b,c,d){a=(a+"").replace(/[^0-9+\-Ee.]/g,"");var e=isFinite(+a)?+a:0,f=isFinite(+b)?Math.abs(b):0,g="undefined"==typeof d?",":d,h="undefined"==typeof c?".":c,i="";return i=(f?function toFixedFix(a,b){var c=Math.pow(10,b);return""+Math.round(a*c)/c}(e,f):""+Math.round(e)).split("."),3<i[0].length&&(i[0]=i[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,g)),(i[1]||"").length<f&&(i[1]=i[1]||"",i[1]+=Array(f-i[1].length+1).join("0")),i.join(h)}function setNames(a,b){function c(b,c){$("h6[data-"+a+"id='"+b+"']").html(c),$("h5[data-"+a+"id='"+b+"']").html(c),$("h4[data-"+a+"id='"+b+"']").html(c),$("h3[data-"+a+"id='"+b+"']").html(c),$("h2[data-"+a+"id='"+b+"']").html(c),$("h1[data-"+a+"id='"+b+"']").html(c),$("p[data-"+a+"id='"+b+"']").html(c),$("a[data-"+a+"id='"+b+"']").html(c),$("span[data-"+a+"id='"+b+"']").html(c)}if("user"!==a&&"catalog"!==a&&"group"!==a)return{success:!1};window["nameArray"+a]===void 0&&(window["nameArray"+a]={}),window["pendingNameArray"+a]===void 0&&(window["pendingNameArray"+a]={});var d=window["nameArray"+a],e=window["pendingNameArray"+a],f=_toConsumableArray(new Set(b)),g=JSON.parse(JSON.stringify(f));25<g.length&&(setNames(a,g.slice(25)),g=g.slice(0,25)),f.forEach(function(a){"undefined"!=typeof d[a]&&null!==d[a]||e[a]!==void 0?(g.forEach(function(b,c){b===a&&g.splice(c,1)}),c(a,d[a])):e[a]=!0}),0<g.length&&(g=arrayToCsv(g),request("/"+a+"/names?ids="+g,"GET").then(function(a){$.each(a,function(a,b){b.username?(c(b.userId,b.username),d[b.userId]=b.username):b.catalogName?(c(b.catalogId,b.catalogName),d[b.catalogId]=b.catalogName):b.groupName?(c(b.groupId,b.groupName),d[b.groupId]=b.groupName):c(b.id,"Loading")})})["catch"](function(){}))}function setUserNames(a){setNames("user",a)}function setGroupNames(a){setNames("group",a)}function setCatalogNames(a){setNames("catalog",a)}function setDivsForStaffTag(a,b){b=b.permissionLevel;$("h6[data-stafftype-userid='"+a+"']").html(b),$("h5[data-stafftype-userid='"+a+"']").html(b),$("h4[data-stafftype-userid='"+a+"']").html(b),$("h3[data-stafftype-userid='"+a+"']").html(b),$("h2[data-stafftype-userid='"+a+"']").html(b),$("h1[data-stafftype-userid='"+a+"']").html(b),$("p[data-stafftype-userid='"+a+"']").html(b),$("a[data-stafftype-userid='"+a+"']").html(b),$("span[data-stafftype-userid='"+a+"']").html(b)}function setDivsForCount(a,b){b=b.postCount;$("h6[data-postcount-userid='"+a+"']").html(b),$("h5[data-postcount-userid='"+a+"']").html(b),$("h4[data-postcount-userid='"+a+"']").html(b),$("h3[data-postcount-userid='"+a+"']").html(b),$("h2[data-postcount-userid='"+a+"']").html(b),$("h1[data-postcount-userid='"+a+"']").html(b),$("p[data-postcount-userid='"+a+"']").html(b),$("a[data-postcount-userid='"+a+"']").html(b),$("span[data-postcount-userid='"+a+"']").html(b)}function setDivsForSignature(a,b){b=b.signature,b&&(b=b.escape());$("h6[data-signature-userid='"+a+"']").html(b),$("h5[data-signature-userid='"+a+"']").html(b),$("h4[data-signature-userid='"+a+"']").html(b),$("h3[data-signature-userid='"+a+"']").html(b),$("h2[data-signature-userid='"+a+"']").html(b),$("h1[data-signature-userid='"+a+"']").html(b),$("p[data-signature-userid='"+a+"']").html(b),$("a[data-signature-userid='"+a+"']").html(b),$("span[data-signature-userid='"+a+"']").html(b)}function setForumDivs(a,b){setDivsForCount(a,b),setDivsForStaffTag(a,b),setDivsForSignature(a,b)}function setUserPostCount(a){window["postCountArrayforumdata-user"]===void 0&&(window["postCountArrayforumdata-user"]={}),window["pendingPostCountArrayforumdata-user"]===void 0&&(window["pendingPostCountArrayforumdata-user"]={});var b=window["postCountArrayforumdata-user"],c=window["pendingPostCountArrayforumdata-user"],d=_toConsumableArray(new Set(a)),e=JSON.parse(JSON.stringify(d));d.forEach(function(a){"undefined"!=typeof b[a]&&null!==b[a]||c[a]!==void 0?(e.forEach(function(b,c){b===a&&e.splice(c,1)}),b[a]&&setForumDivs(a,b[a])):c[a]=!0}),0<e.length&&(e=arrayToCsv(e),request("/user/forum?ids="+e,"GET").then(function(a){$.each(a,function(a,c){c&&(b[c.userId]=c,setForumDivs(c.userId,b[c.userId]))})})["catch"](function(){}))}function setUserSignature(a){window["postCountArrayforumdata-user"]===void 0&&(window["postCountArrayforumdata-user"]={}),window["pendingPostCountArrayforumdata-user"]===void 0&&(window["pendingPostCountArrayforumdata-user"]={});var b=window["postCountArrayforumdata-user"],c=window["pendingPostCountArrayforumdata-user"],d=_toConsumableArray(new Set(a)),e=JSON.parse(JSON.stringify(d));d.forEach(function(a){"undefined"!=typeof b[a]&&null!==b[a]||c[a]!==void 0?(e.forEach(function(b,c){b===a&&e.splice(c,1)}),b[a]&&setForumDivs(a,b[a])):c[a]=!0}),0<e.length&&request("/user/forum","POST",JSON.stringify({ids:e})).then(function(a){$.each(a,function(a,c){c&&(b[c.id]=c,setForumDivs(c.id,b[c.id]))})})["catch"](function(){})}function setUserPermissionType(a){window["postCountArrayforumdata-user"]===void 0&&(window["postCountArrayforumdata-user"]={}),window["pendingPostCountArrayforumdata-user"]===void 0&&(window["pendingPostCountArrayforumdata-user"]={});var b=window["postCountArrayforumdata-user"],c=window["pendingPostCountArrayforumdata-user"],d=_toConsumableArray(new Set(a)),e=JSON.parse(JSON.stringify(d));d.forEach(function(a){"undefined"!=typeof b[a]&&null!==b[a]||c[a]!==void 0?(e.forEach(function(b,c){b===a&&e.splice(c,1)}),b[a]&&setForumDivs(a,b[a])):c[a]=!0}),0<e.length&&request("/user/forum","POST",JSON.stringify({ids:e})).then(function(a){$.each(a,function(a,c){c&&(b[c.id]=c,setForumDivs(c.id,b[c.id]))})})["catch"](function(){})}function setThumbs(a,b){function c(b,c){$("img[data-"+a+"id='"+b+"']").attr("src",c),$("img[data-"+a+"id='"+b+"']").parent().show()}var d=window.subsitutionimageurl;if("user"!==a&&"catalog"!==a)return!1;window["thumbArray"+a]===void 0&&(window["thumbArray"+a]={}),window["pendingThumbArray"+a]===void 0&&(window["pendingThumbArray"+a]={});var e=window["thumbArray"+a],f=window["pendingThumbArray"+a],g=_toConsumableArray(new Set(b)),h=JSON.parse(JSON.stringify(g));25<h.length&&(setThumbs(a,h.slice(25)),h=h.slice(0,25)),g.forEach(function(a){"undefined"!=typeof e[a]&&null!==e[a]||f[a]!==void 0?h.forEach(function(b,c){b===a&&h.splice(c,1)}):f[a]=!0,e[a]===void 0?c(a,window.subsitutionimageurl):c(a,e[a])}),0<h.length&&(h=arrayToCsv(h),request("/"+a+"/thumbnails?ids="+h,"GET").then(function(b){$.each(b,function(b,f){f.userId?(f.url?(e[f.userId]=f.url,c(f.userId,f.url)):c(f.userId,d),$("img[data-"+a+"id='"+f.userId+"']").parent().show()):f.catalogId&&(f.url?(e[f.catalogId]=f.url,c(f.catalogId,f.url)):c(f.catalogId,d),$("img[data-"+a+"id='"+f.catalogId+"']").parent().show())}),$("img[data-"+a+"id]").each(function(){"undefined"==typeof $(this).attr("src")&&($(this).attr("src",d),$(this).parent().show())})})["catch"](function(){$("img[data-"+a+"id]").each(function(){"undefined"==typeof $(this).attr("src")&&($(this).attr("src",d),$(this).parent().show())})}))}function arrayToCsv(a){var b="";return a.forEach(function(a){b=b+","+a}),b=b.slice(1,b.length),b}function setUserThumbs(a){setThumbs("user",a)}function setGroupThumbs(a){setThumbs("catalog",a)}function setCatalogThumbs(a){setThumbs("catalog",a)}function doSwalStuff(a){$(".swal2-popup").fadeOut(100).dequeue(),$(".swal2-container").fadeOut(100).dequeue(),setTimeout(function(){$("body").removeClass("swal2-shown"),$("body").attr("style","")},100),setTimeout(function(){$(".swal2-popup").remove(),$(".swal2-container").remove(),a()},250)}function success(a,b){Swal.fire({type:"success",title:"Success",text:a,heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(){doSwalStuff(function(){"function"==typeof b&&b()})})}function note(a,b){Swal.fire({title:"Note",text:a,heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(a){doSwalStuff(function(){a&&a.value&&!0===a.value&&("function"!=typeof b||b())})})}function questionYesNoHtml(a,b){Swal.fire({title:"Are you sure?",html:a,type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(a){doSwalStuff(function(){a.value&&b()})})}function questionYesNo(a,b){Swal.fire({title:"Are you sure?",text:a,type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(a){doSwalStuff(function(){a.value&&b()})})}function question(a,b,c,d){("undefined"==typeof c||null===c)&&(c="text"),("undefined"==typeof d||null===d)&&(d={}),Swal.fire({title:a,input:c,inputPlaceholder:"",inputOptions:d,heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(a){"select"===c&&(a={},a.value=$(".swal2-select").val(),void 0),doSwalStuff(function(){a.value&&"function"==typeof b&&b(a.value)})})}function warning(a,b){Swal.fire({type:"error",title:"Error",text:a,heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}}).then(function(){doSwalStuff(function(){"function"==typeof b&&b()})})}function loading(){Swal.fire({title:"Loading...",onBeforeOpen:function onBeforeOpen(){Swal.showLoading()},heightAuto:!1,animation:!1,customClass:{popup:"animated fadeInUp"}})}function request(a,b,c){return new Promise(function(d,e){function f(g){$.ajax({type:b,data:c,url:"/api/v1"+a,headers:{"Content-Type":"application/json","X-CSRF-Token":g},dataType:"json",contentType:"application/json",xhr:function(){var a=jQuery.ajaxSettings.xhr(),b=a.setRequestHeader;return a.setRequestHeader=function(a,c){"X-Requested-With"==a||b.call(this,a,c)},a},complete:function complete(a){if(200===a.status)d(a);else{if(403===a.status)return $("#userdata").attr("data-csrf",a.getResponseHeader("X-CSRF-Token")),f(a.getResponseHeader("X-CSRF-Token"));a.responseJSON||(a.responseJSON={}),"undefined"==typeof a.responseJSON.message&&(a.responseJSON.message="An unknown error has ocurred."),e(a)}},failure:function failure(a){a.responseJSON&&null!==a.responseJSON.message||(a.responseJSON={},a.responseJSON.message="An unknown error has ocurred."),e(a)}})}f($("#userdata").attr("data-csrf"))})}$(window).on("resize",function(){resizeBottomNav()}),$(document).ready(function(){resizeBottomNav()});function resizeBottomNav(){var a=$(".navbar.navbar-expand-lg.navbar-dark.bg-success.fixed-top").outerHeight();100<a||$(".row.paddingForStickyNav").css("margin-top",a+"px")}try{sessionStorage.setItem("test","test"),sessionStorage.removeItem("test","test")}catch(a){var object={};sessionStorage={},sessionStorage.setItem=function(a,b){object[a]=b},sessionStorage.getItem=function(a){return object[a]},sessionStorage.removeItem=function(a){delete object[a]}}$(document).on("click",".onClickShowTabs",function(a){a.preventDefault();var b=$(this).parent().attr("data-tabs"),c=$(this).attr("id");$("."+b).children().each(function(){$(this).hide(),$(this).attr("data-id")===c&&$(this).show()})});




























