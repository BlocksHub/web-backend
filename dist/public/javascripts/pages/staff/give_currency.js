"use strict";$(document).on("click","#giveCurrency",function(){var a=parseInt($("#currencyType").val()),b=parseInt($("#amount").val()),c=parseInt($("#userId").val());request("/staff/user/"+c+"/currency","PUT",JSON.stringify({amount:b,currency:a})).then(function(){success("Currency has been added to the specified user's balance.",function(){window.location.href="/staff"})})["catch"](function(a){warning(a.responseJSON.message)})});





































































