"use strict";var groupdata=$("#groupdata");window.history.replaceState(null,null,"/groups/"+groupdata.attr("data-groupid")+"/"+groupdata.attr("data-encoded-name")+"/create"),$(document).on("click","#createAssetClick",function(){//var form = $('#assetsForm')[0];
//var data = new FormData(form);
var a=new FormData;if("undefined"!=typeof $("#textureFile")[0].files[0])a.append("png",$("#textureFile")[0].files[0]);else return void warning("A PNG Texture file is required. Please select one, and try again");if("undefined"==typeof $("#assetName").val()||null===$("#assetName").val()||""===$("#assetName").val())return void warning("Please enter a name, then try again.");var b=$("#assetPrice").val();b||(b=0),console.log(b),loading(),a.append("name",$("#assetName").val()),a.append("category",$("#assetCategory").val()),a.append("price",b),a.append("currency",$("#assetCurrency").val()),a.append("description",$("#assetDescription").val()),a.append("isForSale",parseInt($("#assetForSale").val())),a.append("uploadAsStaff",!1),a.append("groupId",parseInt($("#groupdata").attr("data-groupid"))),makeAsset(a,"fetch")});function makeAsset(a,b){$.ajax({type:"POST",enctype:"multipart/form-data",url:"/api/v1/catalog/create",headers:{"x-csrf-token":b,accept:"application/json"},data:a,processData:!1,contentType:!1,cache:!1,timeout:6e5,success:function success(a){a.id&&(window.location.href="/catalog/"+a.id+"/")},error:function error(b){if(403===b.status){var c=b.getResponseHeader("x-csrf-token");if("undefined"!=typeof c)return makeAsset(a,c);console.log("bad")}else b.responseJSON&&b.responseJSON.error?warning(errorTransform(b.responseJSON.error.code)):warning("An unknown error has occured. Try reloading the page, and trying again.")}})}var isForSale=!1;$(document).on("click","#assetForSale",function(a){a.preventDefault();var b=parseInt($(this).val(),10);0===b?$(".item-for-sale-info").hide():1===b&&$(".item-for-sale-info").show()});













