"use strict";(function(){function a(a){$(".loadMoreButtonClick").hide(),request("/staff/user/"+c+"/transactions?offset="+a,"GET").then(function(a){$.each(a,function(a,b){d=formatCurrency(b.currency);var c=b.description;0!==b.catalogId&&(c+=" <a href=\"/catalog/"+b.catalogId+"\">[link]</a>"),$("#transactionsBodyDisplay").append("<tr> <th scope=\"row\">"+b.transactionId+"</th><td>"+d+b.amount+"</td><td>"+c+"</td><td>"+moment(b.date).local().format("MMMM Do YYYY, h:mm a")+"</td></tr><tr>")}),25<=a.length?(window.transactionoffset+=25,$(".loadMoreButtonClick").css("display","block")):(window.transactionoffset=0,$(".loadMoreButtonClick").hide())})["catch"](function(a){console.log(a)})}var b=$(".metadata-for-profile"),c=parseInt(b.attr("data-userid"),10),d="";window.transactionoffset=0,$("#transactionsBodyDisplay").parent().parent().append("<button type=\"button\" class=\"btn btn-small btn-success loadMoreButtonClick\" style=\"margin:0 auto;display: hidden;\">Load More</button>"),a(window.transactionoffset),$(document).on("click",".loadMoreButtonClick",function(){a(window.transactionoffset)})})();














