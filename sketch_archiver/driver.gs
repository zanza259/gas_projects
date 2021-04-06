function driver() {
  
  
  
  var emailAddress = "tesla259@gmail.com";
  var subject = "Demo Email";
  var body = "<div style=\"background: #303F9F; color: #E8EAF6; border-left: 10px solid #ccc; margin 1.5em 10px; padding: 0.5em 10px;\"><<h3 style=\"display:inline\">Sketch Archiver Report</h3><br><i>DATE_TIMESTAMP</i></div><br><br>The Sketches you have worked on in the last 24 hours have been automatically archived to a shared Google Drive <a href=\"https://drive.google.com/drive/folders/0B0Bd_mrcoF78VDRVMlFPcW9MYmc\">folder</a>. NUM_SKETCHES sketches were identified in your chat history, excerpts of which have been provided below:<br>";
  
  MailApp.sendEmail({
    to: emailAddress,
    subject: subject,
    htmlBody: body
  });//end sendEmail call
  
}//end driver function
