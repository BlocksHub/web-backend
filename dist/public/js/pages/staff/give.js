"use strict";$(document).on("click","#giveItem",function(){var a=$("#userId").val(),b=parseInt($("#catalogId").val());request("/staff/user/"+a+"/give/"+b,"POST").then(function(){success("The Item Specified has been given to the Specified user.",function(){})})["catch"](function(a){warning(a.responseJSON.message)})});









