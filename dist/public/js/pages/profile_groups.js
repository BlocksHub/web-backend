"use strict";var profileData=$("#profiledata"),userid=profileData.attr("data-userid");loadInventory();function loadInventory(){request("/user/"+userid+"/groups").then(function(a){if($("#groupCountDiv").html("("+a.total+")"),0>=a.groups.length)0===offset&&$("#UserGroupsDiv").html("<h5>This user is not a member of any groups.</h5>");else{var b=[];$.each(a.groups,function(a,c){$("#UserGroupsDiv").append("<div class=\"col-6 col-md-4 col-lg-3 col-xl-2\" style=\"padding-bottom: 1rem;padding-left:0.5rem;padding-right:0.5rem;\"><div class=\"card\" style=\"padding-left:0;padding-right:0;\"><img style=\"width:100%;\" data-catalogid="+c.groupIconCatalogId+" /><div class=\"card-body\" style=\"padding:0.25rem;\"><div class=\"row\" style=\"max-width: 100%;overflow: hidden;padding: 0;margin: 0;\"></div><div class=\"card-title text-left\" style=\"margin-bottom:0;\"><a style=\"color:#212529;\" href=\"/groups/"+c.groupId+"/\"><h5 class=\"text-left text-truncate\">"+c.groupName.escape()+"</h5></a><p class=\"text-left text-truncate\">Members: "+c.groupMemberCount+"</p><p class=\"text-left text-truncate\">Rank: "+c.userRolesetName.escape()+"</p></div></div></div>"),b.push(c.groupIconCatalogId)}),setCatalogThumbs(b)}})["catch"](function(){$("#UserGroupsDiv").html("<div class=\"col sm-12\"><h5 class=\"text-center\">This user is not a member of any groups.</h5></div>")})}



































