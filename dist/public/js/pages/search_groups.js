"use strict";window.searchOffset=0,search("",0);function search(a,b){$("#userSearchResultsDiv").children().each(function(){$(this).css("opacity",.5)}),request("/group/search?limit=25&name="+a+"&offset="+b).then(function(a){// $('#groupSearchResultsDiv').empty();
var b=[];a.forEach(function(a){$("#groupSearchResultsDiv").append("\n            <div class=\"col-sm-12\">\n                <div class=\"card\">\n                    <div class=\"card-body groupChangeBgOnHover\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <a href=\"/groups/"+a.groupId+"/"+urlencode(a.groupName)+"\">\n                                    <img src=\""+window.subsitutionimageurl+"\" data-catalogid=\""+a.groupIconCatalogId+"\" style=\"width:100%;border-radius:15%;\" />\n                                </a>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <a href=\"/groups/"+a.groupId+"/"+urlencode(a.groupName)+"\"><h5>"+a.groupName.escape()+"</h5></a>\n                                <p><span style=\"font-weight:600;\">Description: </span>"+a.groupDescription.escape()+"</p>\n                                <p><span style=\"font-weight:600;\">Members: </span>"+nform(a.groupMemberCount)+"</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>"),b.push(a.groupIconCatalogId)}),25<=a.length?(window.searchOffset+=25,$(".loadMoreGroups").show()):(window.searchOffset=0,$(".loadMoreGroups").hide()),0>=a.length&&$("#userSearchResultsDiv").append("<div class=\"col-12\"><h3 class=\"text-center\" style=\"margin-top:1rem;\">Your search query returned 0 results.</h3></div>"),setCatalogThumbs(b)})["catch"](function(a){console.log(a)})}$(document).on("click","#searchForGroupClick",function(){var a=$("#searchForGroupInput").val();window.searchOffset=0,$("#groupSearchResultsDiv").empty(),search(a,0)}),$(document).on("click",".loadMoreGroups",function(){var a=$("#searchForGroupInput").val();search(a,window.searchOffset)});






































