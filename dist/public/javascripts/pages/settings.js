"use strict";request("/settings","GET").then(function(a){a.blurb||(a.blurb=""),a.forumSignature||(a.forumSignature=""),$("#newEmailValue").val(a.email.email),$("#newBlurbValue").html(a.blurb.escape()),$("#newForumSignatureValue").html(a.forumSignature.escape()),$("#selectTradingOption").find("[value=\""+a.tradingEnabled+"\"]").attr("selected","selected"),$("#selectThemeOption").find("[value=\""+a.theme+"\"]").attr("selected","selected")})["catch"](function(){}),$(document).on("click","#updateEmailClick",function(){var a=$("#newEmailValue").val();request("/settings/email","PATCH",JSON.stringify({email:a})).then(function(){success("Your email has been updated! Please verify it with the link sent to your email.",function(){})})["catch"](function(a){warning(a.responseJSON.message)})}),$(document).on("click","#updateForumSignatureClick",function(){var a=$("#newForumSignatureValue").val();request("/settings/forum/signature","PATCH",JSON.stringify({signature:a})).then(function(){success("Your forum signature has been updated.",function(){})})["catch"](function(a){warning(a.responseJSON.message)})}),$(document).on("click","#updateThemeClick",function(){var a=parseInt($("#selectThemeOption").find(":selected").attr("value"));request("/settings/theme","PATCH",JSON.stringify({theme:a})).then(function(){1===a?$("head").append("<link href=\"/css/dark.css\" rel=\"stylesheet\">"):(void 0,$("link[rel=stylesheet][href~=\"/css/dark.css\"]").remove()),setTimeout(function(){success("Your theme has been updated!",function(){})},100)})["catch"](function(a){warning(a.responseJSON.message)})}),$(document).on("click","#updateTradingClick",function(){var a=parseInt($("#selectTradingOption").find(":selected").attr("value"));request("/settings/trade","PATCH",JSON.stringify({enabled:a})).then(function(){success("Your trade settings have been updated!",function(){})})["catch"](function(a){warning(a.responseJSON.message)})}),$(document).on("click","#updateBlurbClick",function(){var a=$("#newBlurbValue").val();request("/settings/blurb","PATCH",JSON.stringify({blurb:a})).then(function(){success("Your blurb has been updated!",function(){})})["catch"](function(a){warning(a.responseJSON.message)})}),$(document).on("click","#updatePasswordClick",function(){var a=grecaptcha.getResponse(),b=$("#newPasswordValue").val();5<=b.length?question("Please enter your current password.",function(c){request("/settings/password","PATCH",JSON.stringify({oldPassword:c,newPassword:b,captcha:a})).then(function(){success("Your password has been updated!",function(){window.location.reload()})})["catch"](function(a){warning(a.responseJSON.message)})},"password"):warning("Please enter a password longer than 5 characters.")}),$(document).on("click","#updateUsernameClick",function(){var a=$("#newUsernameValue").val();return a===$("#userdata").attr("data-username")?warning("Your new username cannot be the same as your current username."):void questionYesNoHtml("Changing your username costs <span style=\"color:#28a745;\"><img alt=\"$\" style=\"height: 1rem;\" src=\"https://cdn.hindigamer.club/static/money-green-2.svg\"/></span> 1,000. Are you sure you'd like to continue?",function(){request("/username/change/available?username="+a,"GET").then(function(){request("/username/change","PATCH",JSON.stringify({username:a})).then(function(){success("Your username has been changed.",function(){window.location.reload()})})["catch"](function(a){warning(a.responseJSON.message)})})["catch"](function(a){warning(a.responseJSON.message)})})});












































