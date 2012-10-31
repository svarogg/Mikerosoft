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

  completeScrape: function(data){
    SkyScanner.pendingRequests --;
    console.log("success!");
  },

  scrapeDates:function(datesList){
    SkyScanner.pendingRequests = 0;
    SkyScanner.results = {};

    for(i in datesList){
      dateRange = datesList[i];

      SkyScanner.sendRequest(dateRange);
    }
  },

  scrape: function(){
    var datesList = SkyScanner.getDatesList();
    SkyScanner.scrapeDates(datesList);
    SkyScanner.showResults();
  }
}