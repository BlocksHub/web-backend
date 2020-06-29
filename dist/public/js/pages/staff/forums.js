"use strict";$(document).on("click",".saveChangesCategory",function(a){a.preventDefault();var b=$(this).attr("data-id"),c=$(".forumCategoryTitle[data-id=\""+b+"\"]").val(),d=$(".forumCategoryDescription[data-id=\""+b+"\"]").val(),e=$(".forumCategoryWeight[data-id=\"".concat(b,"\"]")).val();request("/staff/forum/category/"+b,"PATCH",{title:c,description:d,weight:e}).then(function(){success("Category updated!")})["catch"](function(a){console.error(a)})}),$(document).on("click",".saveChangesSubCategory",function(a){a.preventDefault();var b=$(this).attr("data-id"),c=$(".subCategoryId[data-id=\"".concat(b,"\"]")).val(),d=$(".subCategoryTitle[data-id=\""+b+"\"]").val(),e=$(".subCategoryDescription[data-id=\""+b+"\"]").val(),f=$(".subCategoryWeight[data-id=\"".concat(b,"\"]")).val(),g=$(".subCategoryPermissionsRead[data-id=\"".concat(b,"\"]")).val(),h=$(".subCategoryPermissionsPost[data-id=\"".concat(b,"\"]")).val();request("/staff/forum/sub-category/"+b,"PATCH",{title:d,description:e,weight:f,categoryId:c,readPermissionLevel:g,postPermissionLevel:h}).then(function(){success("Subcategory updated!")})["catch"](function(a){console.error(a)})});var subAddPending=!1;$(document).on("click","#addSubCategory",function(a){return a.preventDefault(),subAddPending?(subAddPending=!1,$("#tbody-subcategories").children().last().remove(),void $("#addSubCategory").text("Add Subcategory")):void(subAddPending=!0,$("#addSubCategory").text("Remove Subcategory"),$("#tbody-subcategories").append("\n    \n                    <tr>\n                        <th scope=\"row\"></th>\n                        <td><input type=\"text\" class=\"form-control addSubcategoryCategory\" placeholder=\"Forum Category Id\" value=\"1\"></td>\n                        <td><input type=\"text\" class=\"form-control addSubCategoryTitle\" placeholder=\"Forum Title\" value=\"\"></td>\n                        <td><input type=\"text\" class=\"form-control addSubCategoryDescription\" placeholder=\"Forum Description\" value=\"N/A\"></td>\n                        <td><input type=\"text\" class=\"form-control addSubCategoryReadPermission\" placeholder=\"Read Permissions\" value=\"0\"></td>\n                        <td><input type=\"text\" class=\"form-control addSubCategoryPostPermission\" placeholder=\"Post Permissions\" value=\"0\"></td>\n                        <td><input type=\"text\" class=\"form-control addSubCategoryWeight\" placeholder=\"Forum Weight\" value=\"0\"></td>\n                        <td><button type=\"button\" class=\"btn btn-success addSubcategorySubmit\" style=\"width: 100%;\">Save</button></td>\n                    </tr>\n    \n    \n    "))});var catAddPending=!1;$(document).on("click","#addCategory",function(a){return a.preventDefault(),catAddPending?(catAddPending=!1,$("#tbody-categories").children().last().remove(),void $("#addCategory").text("Add Category")):void(catAddPending=!0,$("#addCategory").text("Remove Category"),$("#tbody-categories").append("\n\n    <tr>\n        <th scope=\"row\"></th>\n        <td><input type=\"text\" class=\"form-control addForumCategoryTitle\" placeholder=\"Forum Category\" value=\"\"></td>\n        <td><input type=\"text\" class=\"form-control addForumCategoryDescription\" placeholder=\"Forum Description\" value=\"\"></td>\n        <td><input type=\"text\" class=\"form-control addForumCategoryWeight\" placeholder=\"Forum Weight\"></td>\n        <td><button type=\"button\" class=\"btn btn-success addForumCategorySubmit\" style=\"width: 100%;\">Save</button></td>\n    </tr>\n    \n    "))}),$(document).on("click",".addSubcategorySubmit",function(a){a.preventDefault();var b=$(".addSubcategoryCategory").val(),c=$(".addSubCategoryTitle").val(),d=$(".addSubCategoryDescription").val(),e=$(".addSubCategoryReadPermission").val(),f=$(".addSubCategoryPostPermission").val(),g=$(".addSubCategoryWeight").val();request("/staff/forum/sub-category/","PUT",{title:c,description:d,weight:g,categoryId:b,readPermissionLevel:e,postPermissionLevel:f}).then(function(){success("Subcategory created!",function(){window.location.reload()})})["catch"](function(a){console.error(a)})}),$(document).on("click",".addForumCategorySubmit",function(a){a.preventDefault();var b=$(".addForumCategoryTitle").val(),c=$(".addForumCategoryDescription").val(),d=$(".addForumCategoryWeight").val();request("/staff/forum/category/","PUT",{title:b,description:c,weight:d}).then(function(){success("Category created!",function(){window.location.reload()})})["catch"](function(a){console.error(a)})});
