"use strict";$(document).on("click","#signInButton",function(){var a=$("#username").val(),b=$("#password").val(),c=grecaptcha.getResponse();""!==a&&""!==b&&null!==a&&null!==b?($("#signInButton").attr("disabled","disabled"),request("/login","POST",JSON.stringify({username:a,password:b,captcha:c})).then(function(){$("#signInButton").removeAttr("disabled"),window.location.reload()})["catch"](function(a){grecaptcha.reset(),$("#signInButton").removeAttr("disabled"),void 0,warning(a.responseJSON.message)})):warning("Please enter a valid username and password.")});


