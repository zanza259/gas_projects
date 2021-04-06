function sendArchiveReport(reportMetadata) {
  
  var finalTime = Utilities.formatDate(new Date(reportMetadata.msRuntime), Session.getTimeZone(), 'dd/MM/yyyy hh:mm:ss');
  
  /*
  var message = "Sketch Archiver Report\n" + new Date().toString() + "\n";
  message = message.concat("\n\nThe sketches you have worked on over the last 24 hours have been automatically archived into the following Google Docs:");
  
  
  for (var i = 0; i < reportMetadata.sketchObjects.length; i++) {
    message = message.concat("\n" + reportMetadata.sketchObjects[i].title);
  }//end for i
  
  message = message.concat("\n\nThis is an automated message, process runtime: " + finalTime);
  */
  
  
  var message = "<div style=\"background: #303F9F; color: #E8EAF6; border-left: 10px solid #ccc; margin 1.5em 10px; padding: 0.5em 10px;\"><h3 style=\"display:inline;\">Sketch Archiver Report</h3><br><i>"
  message += new Date().toString();
  message += "</i></div><br><br>The Sketches you have worked on in the last 24 hours have been automatically archived to a shared Google Drive <a href=\"https://drive.google.com/drive/folders/0B0Bd_mrcoF78VDRVMlFPcW9MYmc\">folder</a>. ";
  message += reportMetadata.sketchObjects.length;
  message += " sketches were identified in your chat history, excerpts of which have been provided below:<br>";
  
  
  for (var i = 0; i < reportMetadata.sketchObjects.length; i++) {
    message += "<br><h4><a href=\"";
    message += reportMetadata.sketchObjects[i].link;
    message += "\">";
    message += reportMetadata.sketchObjects[i].title;
    message += "</a></h4><blockquote style=\"background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;\">";
    message += reportMetadata.sketchObjects[i].excerpt;
    message += "</blockquote>";
  }//end for i
  
  message += "<br><h5 style=\"display:inline\">Stats for Nerds</h5><table style=\"font-size:10px\"><tr><td align=\"right\">Job Time</td><td>";
  //message += reportMetadata.jobTime;
  message += "</td></tr><tr><td align=\"right\">Execution Time</td><td>";
  //message += reportMetadata.executionTime;
  message += "</td></tr><tr><td align=\"right\">Messages Analyzed</td><td>";
  //message += reportMetadata.messageAnalyzedCount;
  message += "</td></tr><tr><td>Messages Archived</td><td>";
  //message += reportMetadata.messageStoredCount;
  message += "</td></t align=\"right\"r></table>";
  
  
  
  var emailAddresses = PropertiesService.getScriptProperties().getProperty("REPORT_EMAIL_ADDRESSES").split(",");
  
  for (var i = 0; i < emailAddresses.length; i++) {
    MailApp.sendEmail({
      to: emailAddresses[i],
      subject: "Your Sketches have been Archived!",
      htmlBody: message
    });//end sendEmail call
    
  }//end for i
  
}//end sendArchiveReport method
