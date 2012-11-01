var SkyScanner = {
  getSearchParams: function(){
    return {
      firstDepartureDate: new Date($("#firstDepartureDate").val()),
      lastReturnDate: new Date($("#lastReturnDate").val()),
      minLength: $("#minLength").val(),
      maxLength: $("#maxLength").val(),
      onlyWeekend: $("#mustContainWeekend").is(':checked')
    }
  },

  getDatesList : function(){
    var searchParams = SkyScanner.getSearchParams();

    var datesList = [];
    for(var length = searchParams.minLength; length <= searchParams.maxLength; length++){
      var departureDate = Utils.addDays(searchParams.firstDepartureDate, -1);  // substract one to start from what we want.
      var returnDate
      do {
        departureDate = Utils.addDays(departureDate, 1);
        returnDate = Utils.addDays(departureDate, length);

        datesList.push({
          departureDate: departureDate,
          returnDate: returnDate
        });
      }
      while(returnDate < searchParams.lastReturnDate)
    }

    return datesList;
  },

  sendRequest: function(dateRange){
    SkyScanner.pendingRequests++;
    $.get("http://www.skyscanner.net/flights-from/tlv/" +
      Utils.toSkyScannerDate(dateRange.departureDate) + "/" + Utils.toSkyScannerDate(dateRange.returnDate) + "/blabla.html",
      {}, SkyScanner.completeScrape)
  },

  findDataScriptTag: function(data){
    data = data.substr(data.indexOf("SS.data.browse = "));
    var SS = {data: {} };
    return eval(data.substr(0, data.indexOf("</script>")));
  },

  parseData: function(data){
    data = SkyScanner.findDataScriptTag(data);

    datesPattern = new RegExp("/flights/tlv/.*?/(.*?)/(.*?)/.*\.html")

    results = [];
    for(i in data.results){
      var dataItem = data.results[i];
      if(dataItem.price == null)
        continue;
      var match = datesPattern.exec(dataItem.url)

      results.push([
        dataItem.placeName,                                                                 // destination
        Utils.toReadableDate(Utils.parseSkyScannerDate(match[1])),                          // departure date
        Utils.toReadableDate(Utils.parseSkyScannerDate(match[2])),                          // return date
        dataItem.price,                                                                     // price
        "<a href='http://www.skyscanner.net" + dataItem.url + "' target='_blank'>Click</a>" // url
      ]);
    }

    return results;
  },

  completeScrape: function(data){
    SkyScanner.results = SkyScanner.results.concat(SkyScanner.parseData(data))
    console.log(SkyScanner.results)

    SkyScanner.pendingRequests --;
    if (SkyScanner.pendingRequests == 0)
      UI.displayResults(SkyScanner.results);
  },

  scrapeDates:function(datesList){
    SkyScanner.pendingRequests = 0;
    SkyScanner.results = [];

    for(i in datesList){
      dateRange = datesList[i];

      SkyScanner.sendRequest(dateRange);
    }
  },

  scrape: function(){
    var datesList = SkyScanner.getDatesList();
    SkyScanner.scrapeDates(datesList);
    UI.showResults();
  }
}