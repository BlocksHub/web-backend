"use strict";$(document).on("click","#createAssetClick",function(){$("#createAssetClick").attr("disabled","disabled"),loading();//var form = $('#assetsForm')[0];
//var data = new FormData(form);
var a=new FormData;"undefined"!=typeof $("#objFile")[0].files[0]&&a.append("obj",$("#objFile")[0].files[0]),"undefined"!=typeof $("#mtlFile")[0].files[0]&&a.append("mtl",$("#mtlFile")[0].files[0]),"undefined"!=typeof $("#textureFile")[0].files[0]&&a.append("png",$("#textureFile")[0].files[0]),a.append("name",$("#assetName").val()),a.append("category",$("#assetCategory").val()),a.append("price",$("#assetPrice").val()),a.append("currency",$("#assetCurrency").val()),a.append("description",$("#assetDescription").val()),a.append("is_collectible",$("#assetIsCollectible").val()),a.append("stock",$("#assetStock").val()),a.append("isForSale",$("#assetForSale").val()),a.append("uploadAsStaff",!0),makeAsset(a,"fetch")});function makeAsset(a,b){$.ajax({type:"POST",enctype:"multipart/form-data",url:"/api/v1/catalog/create",headers:{"x-csrf-token":b,accept:"application/json"},data:a,processData:!1,contentType:!1,cache:!1,timeout:6e5,success:function success(a){a.id&&(window.location.href="/catalog/"+a.id+"/")},error:function error(b){if(403===b.status){console.log(b);var c=b.getResponseHeader("x-csrf-token");if(console.log(c),"undefined"!=typeof c)return makeAsset(a,c);console.log("bad")}else $("#createAssetClick").removeAttr("disabled"),b.responseJSON&&b.responseJSON.error&&b.responseJSON.error.code?warning(errorTransform(b.responseJSON.error.code)):warning("An unknown error has ocurred")}})}









