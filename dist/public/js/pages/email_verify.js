"use strict";var id=$("#emaildata").attr("data-code");request("/settings/email/verify","POST",JSON.stringify({id:id})).then(function(){success("Your email has been verified.",function(){window.location.href="/dashboard"})})["catch"](function(a){warning(a.responseJSON.message,function(){window.location.href="/settings"})});








