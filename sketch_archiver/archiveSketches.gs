function archiveSketches() {
  
  var chatQuery = "from:angelashooner@gmail.com is:chats newer_than:1d";
  
  
  var chatThreads = GmailApp.search(chatQuery);
  var sketchObjects = [];
  var messages;
  var currentMessage;
  var bodyBuffer;
  var timestamp;
  var lineCounter;
  
  var startTime = new Date().getTime();
  
  
  for (var i = 0; i < chatThreads.length; i++) {
       
    bodyBuffer = "";
    timestamp = "";
    lineCounter = 0;
    messages = chatThreads[i].getMessages();
    
    
    for (var j = 0; j < messages.length; j++) {
      
      currentMessage = messages[j].getBody();
      
      if (currentMessage.indexOf("*") > -1 || currentMessage.indexOf("&quot;") > -1) {
        
        bodyBuffer += currentMessage;
        bodyBuffer += "\n";
        lineCounter++;
        
        if (timestamp.length <= 0) {
          timestamp = messages[j].getDate();
        }//end if
        
      } else if (currentMessage.indexOf("=======") > -1) {
        //split and store the data.
        
        if (lineCounter > 5) {
          sketchObjects.push(storeSketch(bodyBuffer,timestamp));
        }//end if
          
        bodyBuffer = "";
        timestamp = "";
        lineCounter = 0;
      }//end if
      
    }//end for j
    
    if (bodyBuffer.length > 0) {
      //store the data.
      
      if (lineCounter > 5) {
        sketchObjects.push(storeSketch(bodyBuffer,timestamp));
      }//end if
      
      lineCounter = 0;
      
    }//end if
    
  }//end for i
  
  var endTime = new Date().getTime();
  var msRuntime = (endTime - startTime);
  
  
  var metadataObject = new Object();
  metadataObject.sketchObjects = sketchObjects;
  metadataObject.msRuntime = msRuntime;
  
  if (sketchObjects.length > 0) {
    sendArchiveReport(metadataObject);
  }//end if
  
}//end archiveSketches
