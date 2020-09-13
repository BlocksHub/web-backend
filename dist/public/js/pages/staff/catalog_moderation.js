"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}window.catalogThumbsArray={};function setCatalogThumbsIgnoreModeration(a){function b(a,b){// TODO: Remove this and possible return a promise or something to tell the calling function when to show it's parent (or parent's parent, or parent's parent's parent, etc [you can see how this doesn't work well])
$("img[data-catalogid='"+a+"']").attr("src",b),$("img[data-catalogid='"+a+"']").parent().show()}// Setup Subsitution URL
var c=window.subsitutionimageurl;window.thumbArraycatalog===void 0&&(window.thumbArraycatalog={}),window.pendingThumbArraycatalog===void 0&&(window.pendingThumbArraycatalog={});// Global to Variable
var d=window.thumbArraycatalog,e=window.pendingThumbArraycatalog,f=_toConsumableArray(new Set(a)),g=JSON.parse(JSON.stringify(f));25<g.length&&(setThumbs("catalog",g.slice(25)),g=g.slice(0,25)),f.forEach(function(a){"undefined"!=typeof d[a]&&null!==d[a]||e[a]!==void 0?g.forEach(function(b,c){b===a&&g.splice(c,1)}):e[a]=!0,d[a]===void 0?b(a,window.subsitutionimageurl):b(a,d[a])}),0<g.length&&(g=arrayToCsv(g),request("/staff/catalog/thumbnails?ids="+g,"GET").then(function(a){// Repair any broken images
$.each(a,function(a,e){e.userId?(e.url?(d[e.userId]=e.url,b(e.userId,e.url)):b(e.userId,c),$("img[data-catalogid='"+e.userId+"']").parent().show()):e.catalogId&&(e.url?(d[e.catalogId]=e.url,b(e.catalogId,e.url)):b(e.catalogId,c),$("img[data-catalogid='"+e.catalogId+"']").parent().show())}),$("img[data-catalogid]").each(function(){"undefined"==typeof $(this).attr("src")&&($(this).attr("src",c),$(this).parent().show())})})["catch"](function(){// Reset
$("img[data-catalogid]").each(function(){"undefined"==typeof $(this).attr("src")&&($(this).attr("src",c),$(this).parent().show())})}))}function setGameThumbsIgnoreModeration(a){function b(a,b){// TODO: Remove this and possible return a promise or something to tell the calling function when to show it's parent (or parent's parent, or parent's parent's parent, etc [you can see how this doesn't work well])
$("img[data-gameid='"+a+"']").attr("src",b),$("img[data-gameid='"+a+"']").parent().show()}// Setup Subsitution URL
var c=window.subsitutionimageurl;// Only supports catalog and user for now
return!1;// Setup Globals
// Global to Variable
var d=window.thumbArraygame,e=window.pendingThumbArraygame,f=_toConsumableArray(new Set(a)),g=JSON.parse(JSON.stringify(f))}loadItems();function loadItems(){$("#pendingAssetsDiv").empty(),request("/staff/catalog/pending").then(function(a){if(1<=a.length){var b=[];a.forEach(function(a){"CatalogItem"===a.type?(b.push(a.catalogId),a.catalogName&&(a.catalogName=a.catalogName.escape()),$("#pendingAssetsDiv").append("\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\" style=\"margin-top:1rem;\">\n                        <div class=\"card\">\n                            <div class=\"card-body\">\n                                <img data-catalogid=\""+a.catalogId+"\" style=\"width:100%;\" />\n                                <div class=\"card-title text-center\">\n                                    <h6 style=\"margin-bottom:1rem;\" class=\"text-truncate\">"+a.catalogName+"</h6>\n                                    <button type=\"button\" class=\"btn btn-success approveCatalogItem\" data-id=\""+a.catalogId+"\" style=\"width:100%;margin-bottom:1rem;\">Approve</button>\n                                    <!-- Example split danger button -->\n                                    <div class=\"btn-group dropup\" style=\"width:100%;\">\n                                        <button type=\"button\" data-id=\""+a.catalogId+"\" class=\"btn btn-danger declineCatalogItem\">Decline</button>\n                                        <button type=\"button\" class=\"btn btn-danger dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                            <span class=\"sr-only\">Toggle Dropdown</span>\n                                        </button>\n                                        <div class=\"dropdown-menu\">\n                                            <a class=\"dropdown-item banUploader\" data-length=\"0\" data-catalogname=\""+a.catalogName+"\" data-userid=\""+a.userId+"\" data-id=\""+a.catalogId+"\" href=\"#\">Warn Uploader</a>\n                                            <a class=\"dropdown-item banUploader\" data-catalogname=\""+a.catalogName+"\" data-userid=\""+a.userId+"\" data-id=\""+a.catalogId+"\" data-length=\"1\" href=\"#\">1 Day Ban Uploader</a>\n                                            <a class=\"dropdown-item banUploader\" data-catalogname=\""+a.catalogName+"\" data-userid=\""+a.userId+"\" data-id=\""+a.catalogId+"\" href=\"#\" data-length=\"7\">7 Day Ban Uploader</a>\n                                            <div class=\"dropdown-divider\"></div>\n                                            <a class=\"dropdown-item terminateUploader\" data-catalogname=\""+a.catalogName+"\" data-userid=\""+a.userId+"\" data-id=\""+a.catalogId+"\" href=\"#\">Terminate Uploader</a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    ")):"Advertisment"===a.type?(!a.title&&(a.title="N/A"),$("#pendingAssetsDiv").append("\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\" style=\"margin-top:1rem;\">\n                        <div class=\"card\">\n                            <div class=\"card-body\">\n                                <img style=\"width:100%;\" src=\"".concat(a.imageUrl,"\" />\n                                <div class=\"card-title text-center\">\n                                    <h6 style=\"margin-bottom:1rem;\" class=\"text-truncate\">").concat(a.title.escape(),"</h6>\n                                    <button type=\"button\" class=\"btn btn-success approveAdvertisment\" data-id=\"")+a.adId+"\" style=\"width:100%;margin-bottom:1rem;\">Approve</button>\n                                    <!-- Example split danger button -->\n                                    <div class=\"btn-group dropup\" style=\"width:100%;\">\n                                        <button type=\"button\" data-id=\""+a.adId+"\" class=\"btn btn-danger declineAdvertisment\">Decline</button>\n                                        <button type=\"button\" class=\"btn btn-danger dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                            <span class=\"sr-only\">Toggle Dropdown</span>\n                                        </button>\n                                        <div class=\"dropdown-menu\">\n                                            <a class=\"dropdown-item banUploaderAd\" data-length=\"0\" data-catalogname=\""+a.title.escape()+"\" data-userid=\""+a.userId+"\" data-id=\""+a.adId+"\" href=\"#\">Warn Uploader</a>\n                                            <a class=\"dropdown-item banUploaderAd\" data-catalogname=\""+a.title.escape()+"\" data-userid=\""+a.userId+"\" data-id=\""+a.adId+"\" data-length=\"1\" href=\"#\">1 Day Ban Uploader</a>\n                                            <a class=\"dropdown-item banUploaderAd\" data-catalogname=\""+a.title.escape()+"\" data-userid=\""+a.userId+"\" data-id=\""+a.adId+"\" href=\"#\" data-length=\"7\">7 Day Ban Uploader</a>\n                                            <div class=\"dropdown-divider\"></div>\n                                            <a class=\"dropdown-item terminateUploaderAd\" data-catalogname=\""+a.title.escape()+"\" data-userid=\""+a.userId+"\" data-id=\""+a.adId+"\" href=\"#\">Terminate Uploader</a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    ")):"GameThumbnail"===a.type&&$("#pendingAssetsDiv").append("\n                    <div class=\"col-sm-12 col-md-6 col-lg-4\" style=\"margin-top:1rem;\">\n                        <div class=\"card\">\n                            <div class=\"card-body\">\n                                <img style=\"width:100%;\" src=\"".concat(a.url,"\" />\n                                <div class=\"card-title text-center\">\n                                    <h6 style=\"margin-bottom:1rem;\" class=\"text-truncate\">&emsp;</h6>\n                                    <button type=\"button\" class=\"btn btn-success approveGameThumbnail\" data-id=\"")+a.gameThumbnailId+"\" style=\"width:100%;margin-bottom:1rem;\">Approve</button>\n                                    <!-- Example split danger button -->\n                                    <div class=\"btn-group dropup\" style=\"width:100%;\">\n                                        <button type=\"button\" data-id=\""+a.gameThumbnailId+"\" class=\"btn btn-danger declineGameThumbnail\">Decline</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    ")}),setCatalogThumbsIgnoreModeration(b)}else $("#pendingAssetsDiv").append("<div class=\"col-12\"><h3>There are no pending assets at this time.</h3></div>")})["catch"](function(a){console.log(a),toast(!1,a.responseJSON.message)})}$(document).on("click",".approveCatalogItem",function(){request("/staff/catalog/"+parseInt($(this).attr("data-id"))+"/","PATCH",JSON.stringify({state:0})).then(function(a){console.log(a),toast(!0,"The specified item has been approved."),loadItems()})["catch"](function(){toast(!1,"The specified item could not be approved. Please try again."),loadItems()})}),$(document).on("click",".approveAdvertisment",function(){request("/staff/ad/"+parseInt($(this).attr("data-id"))+"/","PATCH",JSON.stringify({state:1})).then(function(a){console.log(a),toast(!0,"The specified ad item has been approved."),loadItems()})["catch"](function(){toast(!1,"The specified ad item could not be approved. Please try again."),loadItems()})}),$(document).on("click",".approveGameThumbnail",function(){request("/staff/game-thumbnail/"+parseInt($(this).attr("data-id"))+"/","PATCH",JSON.stringify({state:1})).then(function(a){console.log(a),toast(!0,"The specified ad item has been approved."),loadItems()})["catch"](function(){toast(!1,"The specified ad item could not be approved. Please try again."),loadItems()})}),$(document).on("click",".declineGameThumbnail",function(){request("/staff/game-thumbnail/"+$(this).attr("data-id")+"/","PATCH",JSON.stringify({state:2})).then(function(a){console.log(a),toast(!0,"The specified item has been declined."),loadItems()})["catch"](function(){toast(!1,"The specified item could not be declined. Please try again."),loadItems()})});function decline(a){request("/staff/catalog/"+a+"/","PATCH",JSON.stringify({state:2})).then(function(a){console.log(a),toast(!0,"The specified catalog item has been declined."),loadItems()})["catch"](function(){toast(!1,"The specified catalog item could not be declined. Please try again."),loadItems()})}function declineAd(a){request("/staff/ad/"+a+"/","PATCH",JSON.stringify({state:2})).then(function(a){console.log(a),toast(!0,"The specified ad item has been declined."),loadItems()})["catch"](function(){toast(!1,"The specified ad item could not be declined. Please try again."),loadItems()})}$(document).on("click",".declineCatalogItem",function(){decline(parseInt($(this).attr("data-id")))}),$(document).on("click",".declineAdvertisment",function(){declineAd(parseInt($(this).attr("data-id")))}),$(document).on("click",".banUploader",function(){var a=parseInt($(this).attr("data-id"));decline(a);var b=parseInt($(this).attr("data-userid")),c=parseInt($(this).attr("data-length")),d=$(this).attr("data-catalogname");request("/staff/user/"+b+"/ban","POST",JSON.stringify({reason:"The item you uploaded, \""+d+"\", is not appropriate for our website. Please fully review our terms of service before uploading assets.",privateReason:"Automated Ban",length:c,lengthType:"days",terminated:0,deleted:0})).then(function(a){console.log(a)})["catch"](function(a){console.log(a),toast(!1,"This user couldn't be banned. Try again.")})}),$(document).on("click",".banUploaderAd",function(){var a=parseInt($(this).attr("data-id"));declineAd(a);var b=parseInt($(this).attr("data-userid")),c=parseInt($(this).attr("data-length")),d=$(this).attr("data-title")||"N/A";request("/staff/user/"+b+"/ban","POST",JSON.stringify({reason:"The advertisement you uploaded, \""+d+"\", is not appropriate for our website. Please fully review our terms of service before uploading assets.",privateReason:"Automated Ban",length:c,lengthType:"days",terminated:0,deleted:0})).then(function(a){console.log(a)})["catch"](function(a){console.log(a),toast(!1,"This user couldn't be banned. Try again.")})});
























