"use strict";$.fn.isOnScreen=function(){var a=$(window),b={top:a.scrollTop(),left:a.scrollLeft()};b.right=b.left+a.width(),b.bottom=b.top+a.height();var c=this.offset();return c.right=c.left+this.outerWidth(),c.bottom=c.top+this.outerHeight(),!(b.right<c.left||b.left>c.right||b.bottom<c.top||b.top>c.bottom)},$(window).scroll(function(){$("#whatAreWeDiv").isOnScreen()&&$("#whatAreWeDiv").fadeIn(500)});



