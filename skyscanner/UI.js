var UI ={
  showResults: function(){
    $("#searchDiv").hide();
    $("#resultsContainer").show();
  },

  showSearch: function(){
    $("#resultsContainer").hide();
    $("#searchDiv").show();
  },

  initProgressBar: function(numberOfDates){
    $("#progress").attr("max", numberOfDates).val(0);
    UI.progressValue = 0;
  },

  incrementProgressBar: function(){
    UI.progressValue++;
    $("#progress").val(UI.progressValue);
  },

  displayResults: function(results){
    UI.initDataTablesPlugins();
    $('#resultsDiv').html('<table cellpadding="0" cellspacing="0" border="0" class="" id="resultsTable"></tr></tfoot></table>');

    $("#resultsTable").dataTable({
      iDisplayLength: 25,
      aaData: results,
      aoColumns: [
        { "sTitle": "Destination" },
        { "sTitle": "Departure", sType: "date-uk" },
        { "sTitle": "Return", sType: "date-uk" },
        { "sTitle": "Deprature Weekday" },
        { "sTitle": "Return Weekday" },
        // { "sTitle": "Number of Days" },
        { "sTitle": "Cost (in $)" },
        { "sTitle": "Details" },
      ]
    }).columnFilter({
      sPlaceHolder: "head:after",
      aoColumns: [
        { type: "text" },
        { type: "text" },
        { type: "text" },
        { type: "select", values: Utils.weekdays },
        { type: "select", values: Utils.weekdays },
        // { type: "number-range" },
        { type: "number-range" }
      ]
    });

    UI.showResults();
  },

  initDataTablesPlugins: function () {
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
      "date-uk-pre": function (a) {
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
      },

      "date-uk-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      },

      "date-uk-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
      }
    });
  }

};