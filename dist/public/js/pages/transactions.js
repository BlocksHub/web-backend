"use strict";var curDisplay="";window.transactionoffset=0,$("#transactionsBodyDisplay").parent().parent().append("<button type=\"button\" class=\"btn btn-small btn-success loadMoreButtonClick\" style=\"margin:0 auto;display: hidden;\">Load More</button>");function loadTransactions(a){$(".loadMoreButtonClick").hide(),request("/economy/transactions?offset="+a,"GET").then(function(a){$.each(a,function(a,b){curDisplay=formatCurrency(b.currency);var c=b.description;0!==b.catalogId&&(c+=" <a href=\"/catalog/"+b.catalogId+"\">[link]</a>"),$("#transactionsBodyDisplay").append("<tr> <th scope=\"row\">"+b.transactionId+"</th><td>"+curDisplay+b.amount+"</td><td>"+c+"</td><td>"+moment(b.date).local().format("MMMM Do YYYY, h:mm a")+"</td></tr><tr>")}),25<=a.length?(window.transactionoffset+=25,$(".loadMoreButtonClick").css("display","block")):(window.transactionoffset=0,$(".loadMoreButtonClick").hide())})["catch"](function(a){console.log(a)})}/*
$('#selectExchangeOption').change(function(e) {

});
*/loadTransactions(window.transactionoffset),$(document).on("click",".loadMoreButtonClick",function(){loadTransactions(window.transactionoffset)}),$(document).on("click","#exchangeRateClick",function(){var a=parseInt($("#selectExchangeOption").val()),b=parseInt($("#exchangeRateAmt").val());if(isNaN(b))return void warning("You must convert at minimum 1 amount of currency.");var c=0,d=0;if(1===a){if(b=Math.trunc(b),0>=b)return void warning("You must convert at minimum 1 amount of currency.");d=2,c=Math.trunc(10*b)}else if(d=1,c=Math.trunc(b/10),9>=b)return void warning("You must convert at minimum 10 currency.");questionYesNoHtml("Are you sure you'd like to convert "+formatCurrency(a)+b.toString()+" to "+formatCurrency(d)+c.toString()+"?",function(){// Confirmed
request("/economy/currency/convert","PUT",JSON.stringify({amount:b,currency:a})).then(function(){success("The currency was converted successfully!",function(){window.location.reload()})})["catch"](function(a){console.log(a),a.responseJSON||(a.responseJSON={},a.responseJSON.message="There was an error performing the conversion. Please try again later."),warning(a.responseJSON.message)})})});














