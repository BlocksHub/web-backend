"use strict";var loadedChatUserIds=[],loadChat=function(){request("/chat/latest","GET").then(function(a){0===a.length;var b=!0,c=!1,d=void 0;try{for(var e,f=a[Symbol.iterator]();!(b=(e=f.next()).done);b=!0)e.value}catch(a){c=!0,d=a}finally{try{b||null==f["return"]||f["return"]()}finally{if(c)throw d}}})};// ok, so load chat






















