"use strict";$(document).on("click","#createReply",function(a){a.preventDefault(),loading();var b=$("#body").val(),c=$("#ticketid").val();request("/support/ticket/"+c+"/reply","POST",{body:b,v2Token:grecaptcha.getResponse()}).then(function(){window.location.href="/support/ticket/"+c})["catch"](function(a){return console.error(a),warning(a.responseJSON.message)})});













