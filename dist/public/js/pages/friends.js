"use strict";var profileData=$("#profiledata"),userid=profileData.attr("data-userid");window.invOffset=0,loadInventory(0),$(document).on("click",".loadMoreItems",function(){loadInventory(window.invOffset)});function loadInventory(a){request("/user/"+userid+"/friends?limit=100&offset="+a).then(function(b){if($("#friendCountDiv").html("("+b.total+")"),0>=b.friends.length)0===a&&$("#userFriendsDiv").html("<h5>This user does not have any friends.</h5>");else{var c=[];$.each(b.friends,function(a,b){$("#userFriendsDiv").append("<div class=\"col-sm-4 col-md-3 col-lg-2 userFriend\" style=\"padding:0.25rem;margin-bottom:0;\"><div class=\"card\" style=\"display:none;\"><img style=\"width:100%;\" data-userid=\""+b.userId+"\" /> <div class=\"card-body\"><div class=\"card-title text-left text-truncate\" style=\"margin-bottom:0;\"><a href=\"/users/"+b.userId+"/profile\"><span data-userid=\""+b.userId+"\"></span></a></div></div></div></div>"),c.push(b.userId)}),setUserThumbs(c),setUserNames(c)}100<=b.friends.length?(window.invOffset+=100,$(".loadMoreItems").css("display","block")):$(".loadMoreItems").hide()})["catch"](function(b){console.log(b),0===a&&$("#userFriendsDiv").html("<div class=\"col sm-12\"><h5 class=\"text-center\">This user does not have any friends.</h5></div>")})}












