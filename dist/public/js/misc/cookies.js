"use strict";(function(){var a="false";try{a=localStorage.getItem("cookie_prompt_success")}catch(a){}"true"!==a&&($("body").append("\n        \n        <div class=\"fixed-bottom\" style=\"z-index:99999999999;display:none;\" id=\"gdpr-cookie-notice\">\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <div class=\"card\" style=\"background: linear-gradient(90deg, rgba(71,195,91,1) 0%, rgba(105,222,124,1) 100%);\">\n                        <div class=\"card-body\" style=\"padding-bottom:1rem;padding-top:1rem;\">\n                            <div class=\"row\">\n                                <div class=\"col-12 col-lg-10\">\n                                    <h3 style=\"font-size:1.15rem;margin-bottom:0;color:white;\">Boring Cookie Notice</h3>\n                                    <p style=\"color:white;\">Our website uses cookies for analytical and session-management purposes. If you do not agree to cookie usage, you should leave the website.</p>\n                                </div>\n                                <div class=\"col-12 col-lg-2\">\n                                    <button type=\"button\" class=\"btn btn-small btn-light\" id=\"confirmOkWithCookies\" style=\"margin:1rem auto 0 auto;display: block;\">I'm OK with cookies</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        "),$("div#gdpr-cookie-notice").fadeIn(550),$(document).on("click","#confirmOkWithCookies",function(a){a.preventDefault(),$("div#gdpr-cookie-notice").fadeOut(550);try{localStorage.setItem("cookie_prompt_success","true")}catch(a){}setTimeout(function(){$("div#gdpr-cookie-notice").remove()},551)}))})();













