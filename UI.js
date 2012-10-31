var UI = {
    results: null,

    init: function () {
        UI.results = [];
        UI.initDataTablesPlugins();
        $('#resultsDiv').html('<table cellpadding="0" cellspacing="0" border="0" class="" id="resultsTable"></tr></tfoot></table>');
    },

    addResults: function (results) {
        UI.results = UI.results.concat(results);
    },

    flush: function () {
        $("#resultsTable").dataTable({
            iDisplayLength: 25,
            aaData: UI.results,
            aoColumns: [
                { "sTitle": "Destination" },
                { "sTitle": "Departure", sType: "date-uk" },
                { "sTitle": "Return", sType: "date-uk" },
                { "sTitle": "Deprature Weekday" },
                { "sTitle": "Return Weekday" },
                { "sTitle": "Number of Days" },
                { "sTitle": "Cost (in $)" }
            ]
        }).columnFilter({
            sPlaceHolder: "head:after",
            aoColumns: [
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "select", values: Lists.weekdays },
                { type: "select", values: Lists.weekdays },
                { type: "number-range" },
                { type: "number-range" }
            ]
        });
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
