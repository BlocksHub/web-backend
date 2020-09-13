"use strict";var userid=$("#profiledata").attr("data-userid");userid===$("#userdata").attr("data-userid")&&$("#tradingButton").hide(),userid===$("#userdata").attr("data-userid")?$("#acceptFriendRequest").hide():request("/user/"+userid+"/friend","GET").then(function(a){!0===a.areFriends?($("#acceptFriendRequest").html("Remove Friend"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/","DELETE").then(function(){success("You are no longer friends with this user.")})["catch"](function(a){warning(a.responseJSON.message)})})):!0===a.canSendFriendRequest?($("#acceptFriendRequest").html("Send Friend Request"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/request","POST").then(function(){success("Your friend request was sent!")})["catch"](function(a){warning(a.responseJSON.message)})})):!0===a.canAcceptFriendRequest?($("#acceptFriendRequest").html("Accept Friend Request"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/","PUT").then(function(){success("This user is now your friend!")})["catch"](function(a){warning(a.responseJSON.message)})})):($("#acceptFriendRequest").html("Awaiting Response"),$("#acceptFriendRequest").attr("disabled","disabled"))})["catch"](function(a){!0===a.responseJSON.success?($("#acceptFriendRequest").html("Awaiting Response"),$("#acceptFriendRequest").attr("disabled","disabled")):$("#acceptFriendRequest").hide()}),request("/user/"+userid+"/inventory?category=1&limit=6","GET").then(function(a){var b=$("#profileCollectionsDiv"),c=[],d="";$.each(a.items,function(a,b){6>a&&(d=3<a?"d-none d-md-block":"",$("#profileCollectionsDiv").append("<div style=\"display:none;\" class=\""+d+" col-3 col-md-2 col-lg-2\"><img style=\"width:100%;\" data-catalogid="+b.catalogId+" /><a style=\"color:#212529;\" href=\"/catalog/"+b.catalogId+"/\"><p class=\"text-center text-truncate\" style=\"font-size:0.75rem;\">"+b.catalogName.escape()+"</p></a></div>")),c.push(b.catalogId)}),0<a.items.length?($("#items").show(),setCatalogThumbs(c)):($("#items").parent().remove(),$("#friends").parent().attr("class","col-12"))})["catch"](function(a){console.log(a),$("#items").hide()}),request("/user/"+userid+"/groups","GET").then(function(a){var b=[];$.each(a.groups,function(a,c){6>a&&$("#profileGroupsDiv").append("<div class=\"col-6 col-md-4 col-lg-2\" style=\"padding-bottom: 1rem;padding-left:0.5rem;padding-right:0.5rem;\"><div class=\"card\"><img style=\"width:100%;\" data-catalogid="+c.groupIconCatalogId+" /><div class=\"card-body\" style=\"padding:0.25rem;\"><div class=\"row\" style=\"max-width: 100%;overflow: hidden;padding: 0;margin: 0;\"></div><div class=\"card-title text-left\" style=\"margin-bottom:0;\"><a style=\"color:#212529;\" href=\"/groups/"+c.groupId+"/\"><h5 class=\"text-left text-truncate\">"+c.groupName.escape()+"</h5></a><p class=\"text-left text-truncate\">Members: "+c.groupMemberCount+"</p><p class=\"text-left text-truncate\">Rank: "+c.userRolesetName.escape()+"</p></div></div></div>"),b.push(c.groupIconCatalogId)}),0<a.groups.length?($("#groups").show(),setCatalogThumbs(b),$("#groupsCountDiv").html("("+a.total+")")):$("#groups").hide()})["catch"](function(){$("#profileGroupsDiv").attr("class",""),$("#profileGroupsDiv").html("This user is not a member of any groups.")}),request("/user/"+userid+"/friends?sort=desc&limit=6","GET").then(function(a){$(document).ready(function(){var b=[],c="";$.each(a.friends,function(a,d){6>a&&(c=3<a?"d-none d-md-block":"",$("#profileFriendsDiv").append("<div class=\""+c+" col-3 col-sm-3 col-md-2 col-lg-2\"><img data-userid=\""+d.userId+"\" style=\"width:100%;\" /><a style=\"color:#212529;\" href=\"/users/"+d.userId+"/profile\"><p class=\"text-center text-truncate\" data-userid=\""+d.userId+"\" style=\"font-size:0.75rem;\"></p></a></div>"),b.push(d.userId))}),$("#friends").show(),setUserThumbs(b),setUserNames(b),$("#friendCountDiv").html("("+a.total+")"),0===a.total&&($("#friends").hide(),$("#friends").parent().remove(),$("#items").parent().attr("class","col-12"))})})["catch"](function(){// no friends
$("#profileFriendsDiv").html("This user has no friends."),$("#friends").hide()}),request("/user/"+userid+"/avatar","GET").then(function(a){if("undefined"!=typeof a.avatar&&1<=a.avatar.length){var b=[];a.avatar.forEach(function(a){$("#userAvatarDiv").append("<div class=\"col-6 col-md-3 col-lg-2\"><a style=\"color:#212529;\" href=\"/catalog/"+a.catalogId+"/\"><img style=\"width:100%;\" data-catalogid=\""+a.catalogId+"\"><p style=\"font-size:0.75rem;\" class=\"text-center text-truncate\" data-catalogid=\""+a.catalogId+"\"></p></a></div>"),b.push(a.catalogId)}),setCatalogNames(b),setCatalogThumbs(b)}else $("#userAvatarDiv").append("<div class=\"col-12\"><p class=\"text-center text-truncate\">This user is not wearing anything.</div>")})["catch"](function(a){console.log(a),$("#userAvatarDiv").append("<div class=\"col-12\"><p class=\"text-center text-truncate\">This user is not wearing anything.</div>")}),$(document).on("click","#regenAvatar",function(a){a.preventDefault(),request("/staff/user/"+userid+"/avatar","POST").then(function(){success("This user's avatar will be regenerated soon.")})["catch"](function(a){warning(a.responseJSON.message)})}),request("/game/search?genre=1&limit=4&offset=0&creatorType=0&creatorId="+userid,"GET").then(function(a){if(0===a.total)return void $("#user-games-div").append("\n        \n            <div class=\"col-12\">\n                <p>This user has not created any games.</p>\n            </div>\n        \n        ");var b=[],c=!0,d=!1,e=void 0;try{for(var f,g,h=a.data[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,b.push(g.gameId),$("#user-games-div").append("\n        \n        <div class=\"col-6\" style=\"padding-left:1px;padding-right:1px;padding-bottom:1px;\">\n            <a href=\"/game/".concat(g.gameId,"/\" class=\"normal\">\n                <div class=\"card\" style=\"background: #f8f9fa;\">\n                    <img src=\"").concat(window.subsitutionimageurl,"\" data-gameid=\"").concat(g.gameId,"\" style=\"\n                    width: 100%;\n                    object-fit: fill;\n                    display: block;\n                    margin: 0 auto;\n                    height: 150px;\" />\n                    <div class=\"card-body game-profile-card\">\n\n                        <h1 style=\"\n                        overflow: hidden;\n                        font-size: 0.65rem;\n                        margin-bottom: 0;\n                        line-height: 1rem;\n                        height: 1.5rem;\n                        \">").concat(xss(g.gameName),"</h1>\n                        <p style=\"font-size:0.6rem;\"><span class=\"font-weight-bold\">").concat(number_format(g.playerCount),"</span> People Playing</p>\n                    </div>\n                </div>\n            </a>\n        </div>\n        \n        "))}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}setGameThumbs(b)});
























