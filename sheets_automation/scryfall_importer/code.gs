function onOpen() {

  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Scripts')
      .addItem("Run Scryfall Ingest", "menuOptionRunCallback")
      .addToUi();

} // end onOpen function

function menuOptionRunCallback() {

  /*
  var ui = SpreadsheetApp.getUi();
  ui.alert("Now running automation...");
  */

  SpreadsheetApp.getActive().toast("Now running scryfall ingest...","Hello");

} // end menuOptionRunCallback function

function doScryfallImport() {

  var sheet = SpreadsheetApp.getActive().getSheetByName("raw_data");

  var data = sheet.getDataRange().getValues();

  var outputData = [];
  outputData.push(["name", "type_line", "rarity", "artist", "price_usd", "price_usd_foil", "price_usd_etched"]);

  for (var i = 1; i < data.length; i++) { // ignore header

    console.log("[" + i + "/" + data.length + "] Processing " + data[i][0] + "...");
    
    var response = getScryfallDataFor(data[i][0]);
    var jsonObject = JSON.parse(response.toString());

    try {
      outputData.push([
        jsonObject["name"],
        jsonObject["type_line"],
        jsonObject["rarity"],
        jsonObject["artist"],
        jsonObject["prices"]["usd"],
        jsonObject["prices"]["usd_foil"],
        jsonObject["prices"]["usd_etched"]
      ]);
    } catch (err) {
      outputData.push([
        "error",
        "error",
        "error",
        "error",
        "error",
        "error",
        "error"
      ]);
    } // end try catch

    Utilities.sleep(250);

  } // end for i

  sheet.getRange(1,2,outputData.length,outputData[0].length).setValues(outputData);

}// end doScryfallImport function

function getScryfallDataFor(key) {

  // https://api.scryfall.com/cards/xln/96
  var requestUrl = "https://api.scryfall.com/cards/" + key;
  var response = UrlFetchApp.fetch(requestUrl, {'muteHttpExceptions': true});
  return response;

} // end getScryfallDataFor function


