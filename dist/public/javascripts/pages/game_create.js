"use strict";$(document).on("click","#createGameClick",function(){return"undefined"==typeof $("#assetName").val()||null===$("#assetName").val()||""===$("#assetName").val()?void warning("Please enter a name, then try again."):void request("/game/create","POST",JSON.stringify({name:$("#assetName").val(),description:$("#assetDescription").val()})).then(function(a){window.location.href="/game/"+a.gameId})["catch"](function(a){warning(a.responseJSON.message)})});


