"use strict";$(document).on("click","#updatePassword",function(){var a=$("#passworddata").attr("data-userId"),b=$("#passworddata").attr("data-code"),c=$("#newPassword").val();request("/reset/password","PATCH",JSON.stringify({userId:a,code:b,newPassword:c})).then(function(){success("Your password has been reset. Please login.",function(){window.location.href="/login"})})["catch"](function(a){warning(a.responseJSON.message)})});


