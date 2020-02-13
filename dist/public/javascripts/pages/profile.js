"use strict";var userid=$("#profiledata").attr("data-userid");userid===$("#userdata").attr("data-userid")&&$("#tradingButton").hide(),userid===$("#userdata").attr("data-userid")?$("#acceptFriendRequest").hide():request("/user/"+userid+"/friend","GET").then(function(a){!0===a.areFriends?($("#acceptFriendRequest").html("Remove Friend"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/","DELETE").then(function(){success("You are no longer friends with this user.")})["catch"](function(a){warning(a.responseJSON.message)})})):!0===a.canSendFriendRequest?($("#acceptFriendRequest").html("Send Friend Request"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/request","POST").then(function(){success("Your friend request was sent!")})["catch"](function(a){warning(a.responseJSON.message)})})):!0===a.canAcceptFriendRequest?($("#acceptFriendRequest").html("Accept Friend Request"),$(document).on("click","#acceptFriendRequest",function(){request("/user/"+userid+"/friend/","PUT").then(function(){success("This user is now your friend!")})["catch"](function(a){warning(a.responseJSON.message)})})):($("#acceptFriendRequest").html("Awaiting Response"),$("#acceptFriendRequest").attr("disabled","disabled"))})["catch"](function(a){!0===a.responseJSON.success?($("#acceptFriendRequest").html("Awaiting Response"),$("#acceptFriendRequest").attr("disabled","disabled")):$("#acceptFriendRequest").hide()}),request("/user/"+userid+"/inventory?category=1","GET").then(function(a){var b=$("#profileCollectionsDiv"),c=[],d="";$.each(a.items,function(a,b){6>a&&(d=3<a?"d-none d-md-block":"",$("#profileCollectionsDiv").append("<div style=\"display:none;\" class=\""+d+" col-3 col-md-2 col-lg-2\"><img style=\"width:100%;\" data-catalogid="+b.catalogId+" /><a style=\"color:#212529;\" href=\"/catalog/"+b.catalogId+"/\"><p class=\"text-center text-truncate\">"+b.catalogName.escape()+"</p></a></div>")),c.push(b.catalogId)}),0<a.items.length?($("#items").show(),setCatalogThumbs(c)):($("#items").parent().remove(),$("#friends").parent().attr("class","col-12"))})["catch"](function(){void 0,$("#items").hide()}),request("/user/"+userid+"/groups","GET").then(function(a){var b=[];$.each(a.groups,function(a,c){var d="";3<a&&(d+="d-none d-lg-block"),6>a,6>a&&$("#profileGroupsDiv").append("<div class=\""+d+" col-6 col-md-3 col-lg-2\" style=\"padding-bottom: 1rem;\"><div class=\"card\"><img style=\"width:100%;\" data-catalogid="+c.groupIconCatalogId+" /><div class=\"card-body\" style=\"padding:0.25rem;\"><div class=\"row\" style=\"max-width: 100%;overflow: hidden;padding: 0;margin: 0;\"></div><div class=\"card-title text-left\" style=\"margin-bottom:0;\"><a style=\"color:#212529;\" href=\"/groups/"+c.groupId+"/\"><h5 class=\"text-left text-truncate\">"+c.groupName.escape()+"</h5></a><p class=\"text-left text-truncate\">Members: "+c.groupMemberCount+"</p><p class=\"text-left text-truncate\">Rank: "+c.userRolesetName.escape()+"</p></div></div></div>"),b.push(c.groupIconCatalogId)}),0<a.groups.length?($("#groups").show(),setCatalogThumbs(b),$("#groupsCountDiv").html("("+a.total+")")):$("#groups").hide()})["catch"](function(){$("#profileGroupsDiv").attr("class",""),$("#profileGroupsDiv").html("This user is not a member of any groups.")}),request("/user/"+userid+"/friends?sort=desc","GET").then(function(a){$(document).ready(function(){var b=[],c="";$.each(a.friends,function(a,d){6>a&&(c=3<a?"d-none d-md-block":"",$("#profileFriendsDiv").append("<div class=\""+c+" col-3 col-sm-3 col-md-2 col-lg-2\"><img data-userid=\""+d.userId+"\" style=\"width:100%;\" /><a style=\"color:#212529;\" href=\"/users/"+d.userId+"/profile\"><p class=\"text-center text-truncate\" data-userid=\""+d.userId+"\"></p></a></div>"),b.push(d.userId))}),$("#friends").show(),setUserThumbs(b),setUserNames(b),$("#friendCountDiv").html("("+a.total+")"),0===a.total&&($("#friends").hide(),$("#friends").parent().remove(),$("#items").parent().attr("class","col-12"))})})["catch"](function(){$("#profileFriendsDiv").html("This user has no friends."),$("#friends").hide()}),request("/user/"+userid+"/avatar","GET").then(function(a){if("undefined"!=typeof a.avatar&&1<=a.avatar.length){var b=[];a.avatar.forEach(function(a){$("#userAvatarDiv").append("<div class=\"col-6 col-lg-3\"><img style=\"width:100%;\" data-catalogid=\""+a.catalogId+"\"><a style=\"color:#212529;\" href=\"/catalog/"+a.catalogId+"/\"><p class=\"text-center text-truncate\" data-catalogid=\""+a.catalogId+"\"></p></a></div>"),b.push(a.catalogId)}),setCatalogNames(b),setCatalogThumbs(b)}else $("#userAvatarDiv").append("<div class=\"col-12\"><p class=\"text-center text-truncate\">This user is not wearing anything.</div>")})["catch"](function(){void 0,$("#userAvatarDiv").append("<div class=\"col-12\"><p class=\"text-center text-truncate\">This user is not wearing anything.</div>")}),$(document).on("click","#regenAvatar",function(a){a.preventDefault(),request("/staff/user/"+userid+"/avatar","POST").then(function(){success("This user's avatar will be regenerated soon.")})["catch"](function(a){warning(a.responseJSON.message)})});


























