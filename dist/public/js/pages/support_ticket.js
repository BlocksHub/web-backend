"use strict";$(document).on("click","#close-ticket",function(a){a.preventDefault(),questionYesNo("Are you sure you'd like to close this ticket? You will be unable to re-open it.",function(){request("/support/ticket/"+$("#ticketid").val()+"/close","POST").then(function(){success("This ticket has been closed.",function(){window.location.href="/support"})})["catch"](function(a){warning(a.responseJSON.message)})})});