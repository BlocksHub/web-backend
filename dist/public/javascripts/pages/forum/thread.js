"use strict";var forumData=$("#threaddata");$(".forumSubCategory").hide();var template=$(".forumSubCategory");showdown.setOption("headerLevelStart",3),showdown.setOption("tables",!0),showdown.setOption("emoji",!0),showdown.setOption("simplifiedAutoLink ",!1),showdown.setOption("simpleLineBreaks ",!0),showdown.setOption("strikethrough ",!0);var offset=parseInt(forumData.attr("data-page"));0===offset&&(offset=1);var offset=25*offset-25;loadPosts(offset);var staff=parseInt(forumData.attr("data-userstaff")),userid=parseInt($("#userdata").attr("data-userid")),isLoading=!1,allowAutoScroll=!0,totalPagesAmt=0,goToPostId=!1,pageNum=0;function loadPosts(a){isNaN(a)&&(a=0);isLoading||(0===a&&(allowAutoScroll=!0),isLoading=!0,request("/forum/thread/"+forumData.attr("data-threadid")+"/posts?sort=asc&offset="+a,"GET").then(function(b){if($(".pagination").children().remove(),b.total<a)return isLoading=!1,goToPostId=!1,void loadPosts(0);pageNum=a/25+1,totalPagesAmt=Math.trunc(b.total/25)+1;var c=pageNum;if(1!==pageNum){var d=pageNum-1;$(".pagination").append("<li class=\"page-item\"><a class=\"page-link\" href=\"#\">"+d+"</a></li>")}for(var e,f=c;totalPagesAmt>=c&&!(6<c);)e="",e=c===f?"active":"",$(".pagination").append("<li class=\"page-item "+e+"\"><a class=\"page-link\" href=\"#\">"+c+"</a></li>"),c++;window.history.replaceState(null,null,"/forum/thread/"+forumData.attr("data-threadid")+"?page="+pageNum),$(window).scrollTop(0),$("#loader").remove(),isLoading=!1;var g=[],h="";if(b.posts.forEach(function(a){var b=new showdown.Converter,c=a.body,d=b.makeHtml(c),e=d.escapeAllowFormatting();g.push(a.userId);var f="";(1<=staff||a.userId===userid)&&(1===a.postDeleted?f="\n                    <button type=\"button\" class=\"btn btn-light\" style=\"margin:0auto;display:block;width: 100%;\" data-toggle=\"dropdown\" aria-expanded=\"false\" aria-haspopup=\"true\"><i class=\"fas fa-chevron-circle-down\" aria-hidden=\"true\"></i></button><div class=\"dropdown-menu dropdown-menu-right fade\">\n                                                        <a class=\"dropdown-item unDeletePost\" data-id=\""+a.postId+"\" href=\"#\">Undelete Post</a>\n                                                    </div>":2===a.postDeleted?f="":f="\n                    <button type=\"button\" class=\"btn btn-light\" style=\"margin:0auto;display:block;width: 100%;\" data-toggle=\"dropdown\" aria-expanded=\"false\" aria-haspopup=\"true\"><i class=\"fas fa-chevron-circle-down\" aria-hidden=\"true\"></i></button><div class=\"dropdown-menu dropdown-menu-right fade\">\n                                                        <a class=\"dropdown-item deletePost\" data-id=\""+a.postId+"\" href=\"#\">Delete Post</a>\n                                                        <a data-currentpost=\""+a.body.escape()+"\" class=\"dropdown-item editReply\" data-id=\""+a.postId+"\" href=\"#\">Edit Post</a>\n                                                    </div>"),h=1===a.postDeleted||2===a.postDeleted?"opacity:0.5":"";var i=$("<div class=\"forumPost\" style=\"border-bottom: 1px solid rgba(0,0,0,.125);"+h+"\" data-postid=\""+a.postId+"\">\n                    <div class=\"card\" style=\"border-radius:0;border:none;box-shadow:none;\">\n                        <div class=\"card-body\">\n                            <div class=\"row\">\n                                <div class=\"col-6 col-md-4 col-lg-3\">\n                                    <img style=\"width:100%;max-width: 150px;display: block;margin: 0 auto;\" data-userid=\""+a.userId+"\" />\n                                    <a href=\"/users/"+a.userId+"/profile\"><h6 class=\"text-truncate\"><span style=\"font-weight:600;\"></span><span data-stafftype-userid=\""+a.userId+"\" class=\"staffRankLevel\"></span><span data-userid=\""+a.userId+"\">Loading...</span></h6></a>\n                                    <p style=\"margin-bottom:0;\">"+moment(a.dateCreated).format("MMMM Do YYYY, h:mm a")+"</p>\n                                    <p style=\"margin-bottom:0;\"><span style=\"font-weight:600;\">Post Count: </span><span data-postcount-userid=\""+a.userId+"\"></span></p>\n                                    <p style=\"margin-bottom:0;\"></p>\n                                </div>\n                                <div class=\"col-6 col-md-8 col-lg-9 text-left\">\n                                    <div class=\"row\">\n                                        <div class=\"col-8 col-sm-8 col-md-10\">\n                                            <div style=\"font-weight: 500;\">"+e+"</div>\n                                        </div>\n                                        <div class=\"col-4 col-sm-4 col-md-2\">\n                                            "+f+"\n                                        </div>\n                                    </div>\n                                    <br>\n                                    <hr />\n                                    <p style=\"margin-bottom:0;\" data-signature-userid=\""+a.userId+"\"></p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>");$("#forumPosts").append(i)}),25>b.posts.length?(allowAutoScroll=!1,$("#loader").hide()):allowAutoScroll=!0,setUserNames(g),setUserThumbs(g),setUserPostCount(g),setUserPermissionType(g),setUserSignature(g),goToPostId&&($(".forumPost").each(function(){parseInt($(this).attr("data-postid"))===goToPostId&&($("html, body").animate({scrollTop:$(this).offset().top-100},250),goToPostId=!1)}),goToPostId))return void loadPosts(a+25)})["catch"](function(){void 0,0===a?$("#alert").show():isLoading=!0}))}var currentPage=0;$(document).on("click",".page-link",function(){var a=parseInt($(this).html());$(".forumPost").remove(),loadPosts(25*a-25)}),$("body").on("DOMSubtreeModified",".staffRankLevel",function(){if($(this).attr("data-stafftype-userid")){$(this).removeAttr("data-stafftype-userid");var a=parseInt($(this).html());1<=a?($(this).html("<i style=\"color:red;\" class=\"fas fa-user-shield\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"This user is an administrator.\"></i> "),$("[data-toggle=\"tooltip\"]").tooltip()):$(this).html("")}}),$(document).on("click",".deletePost",function(a){a.preventDefault();var b=parseInt($(this).attr("data-id"));questionYesNo("Are you sure you'd like to delete this post?",function(){request("/forum/post/"+b,"DELETE").then(function(){success("This post has been deleted",function(){window.location.reload()})})["catch"](function(a){void 0,warning(a.responseJSON.message)})})}),$(document).on("click",".deleteThread",function(a){a.preventDefault();var b=parseInt($(this).attr("data-id"));questionYesNo("Are you sure you'd like to delete this thread? This will replace the title with \"[ Deleted "+b+" ]\" and hide it from search results.",function(){request("/forum/thread/"+b,"DELETE").then(function(){success("This thread has been deleted",function(){window.location.reload()})})["catch"](function(a){void 0,warning(a.responseJSON.message)})})}),$(document).on("click",".editThread",function(a){a.preventDefault();parseInt($(this).attr("data-id"));$("#editThreadModal").hide(),$("#editThreadModal").fadeIn(250).css("display","none").slideDown(250).dequeue()}),$(document).on("click","#editThreadClose",function(a){a.preventDefault(),$("#editThreadModal").fadeOut(100).slideUp(250).dequeue()}),$(document).on("click","#editThreadClick",function(){$("#editThreadClose").attr("disabled","disabled"),$("#editThreadClick").attr("disabled","disabled"),$("#threadPinned").attr("disabled","disabled"),$("#threadLocked").attr("disabled","disabled");var a=parseInt($(this).attr("data-id")),b=function(){$("#editThreadClose").removeAttr("disabled"),$("#editThreadClick").removeAttr("disabled"),$("#threadPinned").removeAttr("disabled"),$("#threadLocked").removeAttr("disabled")},c=parseInt($("#threadLocked").val()),d=parseInt($("#threadPinned").val());(isNaN(c)||isNaN(d))&&(c=0,d=0),request("/forum/thread/"+a+"/update","PATCH",JSON.stringify({isLocked:c,isPinned:d})).then(function(){void 0,success("This thread has been updated.",function(){window.location.reload()})})["catch"](function(a){b(),void 0,warning(a.responseJSON.message)})}),$(document).on("click",".unDeletePost",function(a){a.preventDefault();var b=parseInt($(this).attr("data-id"));questionYesNo("Are you sure you'd like to undelete this post?",function(){request("/forum/post/"+b+"/undelete","POST").then(function(){success("This post has been undeleted",function(){window.location.reload()})})["catch"](function(a){void 0,warning(a.responseJSON.message)})})}),$(document).on("click",".unDeleteThread",function(a){a.preventDefault();var b=parseInt($(this).attr("data-id"));questionYesNo("Are you sure you'd like to undelete this thread?",function(){request("/forum/thread/"+b+"/undelete","POST").then(function(){success("This thread has been undeleted",function(){window.location.reload()})})["catch"](function(a){void 0,warning(a.responseJSON.message)})})}),$(document).on("click","#reply",function(a){if(a.preventDefault(),isNaN(userid))return void(window.location.href="/login");var b="";b=sessionStorage.getItem("forum_thread_"+forumData.attr("data-threadid")),$("#replyBody").val(b),$("#replyCreationModal").hide(),$("#replyCreationModal").fadeIn(250).css("display","none").slideDown(250).dequeue()}),$(document).on("click","#closeReply",function(a){a.preventDefault(),$("#replyCreationModal").fadeOut(100).slideUp(250).dequeue();var b=$("#replyBody").val();return b||sessionStorage.getItem("forum_thread_"+forumData.attr("data-threadid"))?void(sessionStorage.setItem("forum_thread_"+forumData.attr("data-threadid"),b),setTimeout(function(){$("#replyBody").val("","")},250)):void sessionStorage.removeItem("forum_thread_"+forumData.attr("data-threadid"))}),$(document).on("click","#createReply",function(a){a.preventDefault(),$("#createReply").attr("disabled","disabled"),$("#closeReply").attr("disabled","disabled"),$("#replyBody").attr("disabled","disabled");var b=$("#replyBody").val();request("/forum/thread/"+forumData.attr("data-threadid")+"/reply","PUT",JSON.stringify({body:b})).then(function(a){$("#createReply").removeAttr("disabled"),$("#closeReply").removeAttr("disabled"),$("#replyBody").removeAttr("disabled"),toast(!0,"Reply Posted!"),sessionStorage.removeItem("forum_thread_"+forumData.attr("data-threadid")),$(".forumPost").remove(),goToPostId=a.postId,loadPosts(25*totalPagesAmt-25),$("#replyCreationModal").fadeOut(100).slideUp(250).dequeue(),setTimeout(function(){$("#replyBody").val("","")},250)})["catch"](function(a){$("#createReply").removeAttr("disabled"),$("#closeReply").removeAttr("disabled"),$("#replyBody").removeAttr("disabled"),warning(a.responseJSON.message)})});var editId=0,oldreplytext="";$(document).on("click",".editReply",function(a){if(a.preventDefault(),editId=$(this).attr("data-id"),oldreplytext=$(this).attr("data-currentpost"),isNaN(userid))return void(window.location.href="/login");var b="";b=sessionStorage.getItem("forum_reply_"+editId),b||(b=$(this).attr("data-currentpost")),$("#editReplyBody").val(b),$("#editReplyModal").hide(),$("#editReplyModal").fadeIn(250).css("display","none").slideDown(250).dequeue()}),$(document).on("click","#closeEditReply",function(){$("#editReplyModal").fadeOut(100).slideUp(250).dequeue();var a=$("#editReplyBody").val();return(a||sessionStorage.getItem("forum_reply_"+editId))&&oldreplytext!==a?void(sessionStorage.setItem("forum_reply_"+editId,a),setTimeout(function(){$("#editReplyBody").val("","")},250)):void sessionStorage.removeItem("forum_reply_"+editId)}),$(document).on("click","#editReplyClick",function(){$("#createReply").attr("disabled","disabled"),$("#closeEditReply").attr("disabled","disabled"),$("#editReplyBody").attr("disabled","disabled");var a=$("#editReplyBody").val();request("/forum/post/"+editId+"/","PATCH",JSON.stringify({body:a})).then(function(a){$("#editReplyClick").removeAttr("disabled"),$("#closeEditReply").removeAttr("disabled"),$("#editReplyBody").removeAttr("disabled"),toast(!0,"Reply Edited!"),sessionStorage.removeItem("forum_reply_"+editId),$(".forumPost").remove(),goToPostId=a.postId,loadPosts(25*totalPagesAmt-25),$("#replyCreationModal").fadeOut(100).slideUp(250).dequeue(),setTimeout(function(){$("#editReplyBody").val("","")},250)})["catch"](function(a){$("#editReplyClick").removeAttr("disabled"),$("#closeEditReply").removeAttr("disabled"),$("#editReplyBody").removeAttr("disabled"),warning(a.responseJSON.message)})});

























