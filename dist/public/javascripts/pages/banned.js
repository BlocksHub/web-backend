"use strict";$(document).on("click","#unlockAccount",function(){request("/unlock","POST","{}").then(function(){window.location.reload()})["catch"](function(a){warning(a.responseJSON.message)})});


