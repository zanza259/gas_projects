function stripHTML(body) {
  
  body = body.replace(/&quot;/g,"\"");
  body = body.replace(/&#39;/g,"'");
  
  return body;
  
}//end stripHTML function
