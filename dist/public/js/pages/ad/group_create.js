"use strict";$(document).on("click","#createAdClick",function(a){if(a.preventDefault(),"undefined"==typeof $("#imageFile")[0].files[0])return void warning("A image file is required. Please select one, and try again");var b=$("#adName").val()||"";loading();var c=new FormData;c.append("file",$("#imageFile")[0].files[0]),c.append("title",b),c.append("adType",2),c.append("adRedirectId",$("#groupid").val()),c.append("adDisplayType",$("#adDisplayType").val()),makeAsset(c,"fetch")});function makeAsset(a,b){$.ajax({type:"POST",enctype:"multipart/form-data",url:"/api/v1/ad/create",headers:{"x-csrf-token":b,accept:"application/json"},data:a,processData:!1,contentType:!1,cache:!1,timeout:6e5,success:function(a){function b(){return a.apply(this,arguments)}return b.toString=function(){return a.toString()},b}(function(){success("Your ad has been created",function(){window.location.href="/ads"})}),error:function error(b){if(403===b.status){var c=b.getResponseHeader("x-csrf-token");if("undefined"!=typeof c)return makeAsset(a,c);console.log("bad")}else b.responseJSON&&b.responseJSON.message?warning(b.responseJSON.message):warning("An unknown error has occured. Try reloading the page, and trying again.")}})}















