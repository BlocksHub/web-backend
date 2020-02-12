"use strict";window.memberOffset=0,window.wallLoading=!1,window.wallOffset=0;var groupid=parseInt($("#groupdata").attr("data-groupid"));setUserNames([parseInt($("#groupdata").attr("data-groupowner"))]),window.history.replaceState(null,null,"/groups/"+$("#groupdata").attr("data-groupid")+"/"+$("#groupdata").attr("data-encoded-name")+"/");var members=parseInt($("#memberCountSpan").attr("data-membercount"));$("#memberCountSpan").html(bigNum2Small(members)),$("#aboutCategory").click(function(){$("#aboutSection").show(),$("#relationsSection").hide(),$("#catalogSection").hide()}),$("#relationsCategory").click(function(){$("#relationsSection").show(),$("#aboutSection").hide(),$("#catalogSection").hide()}),$("#catalogCategory").click(function(){$("#relationsSection").hide(),$("#aboutSection").hide(),$("#catalogSection").show()}),"true"===$("#userdata").attr("data-authenticated")?request("/user/"+$("#userdata").attr("data-userid")+"/groups","GET").then(function(a){$("#groupDisplayCol").attr("class","col-12 col-lg-10"),$("#UserGroupsDiv").show(),$("#groupDisplayCol").show();var b=[];a.groups.forEach(function(a){b.push(a.groupIconCatalogId),$("#myGroups").append("<div class=\"row\" style=\"margin-bottom:1rem;margin-top:1rem;\"><div class=\"col-12 col-md-4\" style=\"padding-right:0;\"><img style=\"width:100%;\" data-catalogid=\""+a.groupIconCatalogId+"\" /></div><div class=\"col-6 col-md-8\"><p class=\"text-truncate\"><a href=\"/groups/"+a.groupId+"/"+urlencode(a.groupName)+"\">"+a.groupName.escape()+"</a></p></div></div>")}),setCatalogThumbs(b)})["catch"](function(){void 0,$("#UserGroupsDiv").attr("style","display:none !important;"),$("#groupDisplayCol").attr("class","col-12"),$("#groupDisplayCol").show()}):($("#UserGroupsDiv").hide(),$("#groupDisplayCol").attr("class","col-12"),$("#groupDisplayCol").show()),$(document).on("click","#groupJoin",function(){"true"===$("#userdata").attr("data-authenticated")?request("/group/"+groupid+"/membership","PUT").then(function(){success("You have joined this group.",function(){window.location.reload()})})["catch"](function(a){void 0,warning(a.responseJSON.message,function(){window.location.reload()})}):window.location.href="/login?return=/groups/"+groupid+"/"}),$(document).on("click","#claimOwnership",function(a){a.preventDefault(),"true"===$("#userdata").attr("data-authenticated")?request("/group/"+groupid+"/claim","PUT").then(function(){success("You have claimed ownership of this group.",function(){window.location.reload()})})["catch"](function(a){warning(a.responseJSON.message,function(){window.location.reload()})}):window.location.href="/login?return=/groups/"+groupid+"/"}),$(document).on("click","#groupLeave",function(){function a(){request("/group/"+groupid+"/membership","DELETE").then(function(){success("You have left this group.",function(){window.location.reload()})})["catch"](function(a){warning(a.responseJSON.message,function(){window.location.reload()})})}parseInt($("#groupdata").attr("data-groupowner"))===parseInt(userId)?questionYesNo("Are you sure you would like to abbandon this group?",function(){a()}):a()}),$(window).on("scroll",function(){$(window).scrollTop()+$(window).height()>$(document).height()-300&&25<=window.wallOffset&&!1===window.wallLoading&&window.managegroup!==void 0&&loadWall()}),$(document).on("click",".deletePost",function(){var a=parseInt($(this).attr("data-id")),b=$(this).parent().parent();request("/group/"+groupid+"/wall/"+a+"/","DELETE").then(function(){success("This wall post has been deleted."),b.remove()})["catch"](function(a){warning(a.responseJSON.message)})});function loadWall(){window.wallLoading=!0,request("/group/"+groupid+"/wall?offset="+window.wallOffset+"&sort=desc").then(function(a){0===window.wallOffset&&$("#hasGroupWallPostsDisplay").show();var b=[];a.forEach(function(a){b.push(a.userId);var c="style=\"width:100%;\"";window.managegroup||(c="style=\"display:none;width:100%;\""),a.wallPost||(a.wallPost=""),$("#hasGroupWallPostsDisplay").append("<div class=\"row\"><div style=\"\" class=\"col-6 col-sm-3 col-lg-2\"><img style=\"width:100%;\" data-userid=\""+a.userId+"\"><a style=\"color:#212529;\" href=\"/users/"+a.userId+"/profile\"><h6 class=\"text-center\" data-userid=\""+a.userId+"\"></h6></a><p class=\"text-center\" style=\"font-size: small;\">"+moment(a.date).format("MMMM Do YYYY, h:mm a")+"</p><button type=\"button\" class=\"btn btn-success deletePost\" data-id=\""+a.wallPostId+"\" "+c+">Delete</button></div><div class=\"col-6 col-sm-9 col-lg-10\"><p>"+a.wallPost.escapeAllowFormattingBasic()+"</p></div><div class=\"col-12\"><hr /></div></div>")}),setUserThumbs(b),setUserNames(b),25<=a.length?window.wallOffset+=25:window.wallOffset=0,window.wallLoading=!1})["catch"](function(){0===window.wallOffset&&$("#noGroupWallPostsDisplay").show()})}$(document).on("click","#submitGroupWallText",function(){var a=$("#groupWallText").val();a=a.replace(/\s+/g," ").replace(/^\s|\s$/g,""),"undefined"!=typeof a||255<a.length||3>a.length?request("/group/"+groupid+"/wall","PUT",JSON.stringify({content:a})).then(function(){$("#groupWallText").val(""),window.wallLoading=!1,window.wallOffset=0,$("#hasGroupWallPostsDisplay").empty(),loadWall(),success("Your group wall post has been created.")})["catch"](function(a){warning(a.responseJSON.message)}):warning("Group wall posts must be between 3 and 255 characters. Please try again.")}),request("/group/"+groupid+"/role","GET").then(function(a){0!==a.rank&&($("#authUserRank").html("Your Rank: "+a.name.escape()),0===parseInt($("#groupdata").attr("data-groupowner"))&&$("#claimOwnership").show());var b=a.permissions;b.postWall&&$("#postToGroupWall").append("\n            <div class=\"col-12\">\n                 <form>\n                    <div class=\"form-group\">\n                        <div class=\"row\" style=\"margin-bottom:1rem;\">\n                            <div class=\"col-sm-12\">\n                                <textarea class=\"form-control\" id=\"groupWallText\" rows=\"3\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <button type=\"button\" id=\"submitGroupWallText\" class=\"btn btn-success\">Submit</button>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>"),b.getWall?($("#groupWallDiv").show(),window.wallOffset=0,loadWall()):$("#groupWallDiv").hide(),0===a.rank?$("#groupJoin").show():1===b.manage?($("#groupManage").show(),$(".deletePost").show(),window.managegroup=!0,$("#createGroupItemButton").show(),$("#groupLeave").show()):$("#groupLeave").show(),b.getShout?request("/group/"+groupid+"/shout").then(function(a){$("#shoutDiv").show(),$("#groupShoutDisplayDiv").append("<div class=\"row\"><div class=\"col-4 col-sm-2\"><a href=\"/users/"+a.userid+"/profile\"><img data-userid=\""+a.userId+"\" style=\"width:100%;\" /></a></div><div class=\"col-8 col-sm-10\"><a href=\"/users/"+a.userId+"/profile\"><h5 data-userid=\""+a.userId+"\"></h5></a><p style=\"font-weight: 500;\">"+a.shout.escape()+"</p> </div></div><div class=\"row\"><div class=\"col-12\"><p style=\"font-weight: 300;font-size: small;\">"+moment(a.date).format("MMMM Do YYYY, h:mm:ss a")+"</p></div></div>"),setUserThumbs([a.userId]),setUserNames([a.userId])})["catch"](function(){$("#shoutDiv").hide()}):$("#shoutDiv").hide()})["catch"](function(){$("#alert").show()}),request("/group/"+groupid+"/roles","GET").then(function(a){var b=!1,c=0;a.forEach(function(a){0!==a.rank&&(c++,1===c&&(window.roleId=a.roleSetId),$("#groupRolesSelection").append("<option value="+a.roleSetId+">"+a.name.escape()+"</option>"),!b&&(loadMembers(a.roleSetId),b=!0))})})["catch"](function(){$("#alert").show(),$("#noMembersDisplay").show()}),$("#groupRolesSelection").change(function(){window.memberOffset=0;var a=parseInt($(this).val());window.roleId=a,loadMembers(a),$("#hasMembersDisplay").empty()}),$(document).on("click","#loadMoreMembers",function(){window.memberOffset+=12,loadMembers(window.roleId)}),$(document).on("click","#loadLessMembers",function(){window.memberOffset-=12,loadMembers(window.roleId)});function loadMembers(a){0===window.memberOffset&&($("#noMembersDisplay").hide(),$("#hasMembersDisplay").hide()),request("/group/"+groupid+"/members/"+a+"?sort=desc&offset="+window.memberOffset+"&limit=12","GET").then(function(a){$("#hasMembersDisplay").empty(),0===a.total?$("#noMembersDisplay").show():$("#hasMembersDisplay").show();var b=[];a.members.forEach(function(a){$("#hasMembersDisplay").append("<div class=\"col-4 col-md-3 col-lg-2\"><a href=\"/users/"+a.userId+"/profile\"><img data-userid=\""+a.userId+"\" style=\"width:100%;\" /><p class=\"text-truncate text-center\" data-userid=\""+a.userId+"\"></p></a></div>"),b.push(a.userId)}),setUserThumbs(b),setUserNames(b),0===window.memberOffset?$("#loadLessMembers").hide():$("#loadLessMembers").show(),12<=a.total-window.memberOffset?$("#loadMoreMembers").show():$("#loadMoreMembers").hide()})["catch"](function(){0===window.memberOffset?$("#noMembersDisplay").show():$("#hasMembersDisplay").show()})}var catalogOffset=0;request("/group/"+groupid+"/catalog?sort=desc&offset="+0,"GET").then(loadCatalogStuff)["catch"](function(){}),loadCatalogStuff();function loadCatalogStuff(a,b){if(!0!==b&&$("#catalogItemsDiv").empty(),$("#catalogItemsDiv").each(function(){$(this).css("opacity","1")}),!a||0>=a.length)$("#catalogItemsDiv").html("<div class=\"col sm-12\" style=\"margin-top:1rem;\"><h5 class=\"text-center\">This group does not have any items.</h5></div>");else{var c=[];$.each(a,function(a,b){b.currency=formatCurrency(b.currency),$("#catalogItemsDiv").append("<div class=\"col-6 col-sm-4 col-md-4 col-lg-3 catalogItem\" data-catalogid=\""+b.catalogId+"\"><div class=\"card\" style=\"margin: 1rem 0 0 0;border: 0;box-shadow:none;\"><a href=\"/catalog/"+b.catalogId+"/"+urlencode(b.catalogName)+"\"><img data-catalogid=\""+b.catalogId+"\" style=\"width:100%;\" /></a> <div class=\"card-body\"><div class=\"card-title text-left text-truncate\" style=\"margin-bottom:0;\"><a href=\"/catalog/"+b.catalogId+"/"+urlencode(b.catalogName)+"\">"+b.catalogName+"</a><p class=\"text-left text-truncate\">"+b.currency+nform(b.price)+"</p></div></div></div></div>"),c.push(b.catalogId)}),$("[data-toggle=\"tooltip\"]").tooltip(),setCatalogThumbs(c)}a&&25<=a.length?$(".loadMoreItems").css("display","block"):$(".loadMoreItems").hide()}


