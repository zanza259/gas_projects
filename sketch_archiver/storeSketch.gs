function storeSketch(body,timestamp) {
  
  var documentName = "Archived Sketch - " + timestamp;
  var document = DocumentApp.create(documentName);
  
  document.getBody().appendParagraph(stripHTML(body));
    
  var docIterator = DriveApp.getFoldersByName("Sketch Archive");
  
  if (docIterator.hasNext()) {
    docIterator.next().addFile(DriveApp.getFileById(document.getId()));
  }//end if
  
  //return document name to the user.
  //return documentName;
  
  
  var bodyArray = body.split("\n");
  var excerpt = "";
  
  for (var i = 0; i < PropertiesService.getScriptProperties().getProperty("EXCERPT_LENGTH"); i++) {
    excerpt += bodyArray[i];
    excerpt += "<br>";
  }//end for i
  
  
  
  return {
    title: documentName,
    link: document.getUrl(),
    excerpt: excerpt
  }//end return object
  
  
}//end storeSketch method
