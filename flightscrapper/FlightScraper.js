/// <reference path="jquery-1.8.1-vsdoc.js" />

var FlightScraper = {
    currentlyBeingScraped: null,

    scrape: function () {
        FlightScraper.currentlyBeingScraped = 0;

        var destinations = Object.keys(Lists.destinations);
        FlightScraper.scrapeDestinations(destinations);
    },

    scrapeDestinations: function (destinations) {
        UI.init();
        $.each(destinations, function (i, destination) {
            destination = $.trim(destination);
            if (destination != "") {
                FlightScraper.scrapeDestination(destination);
            }
        });
    },

    scrapeDestination: function (destination) {
        FlightScraper.currentlyBeingScraped++;

        var url = "http://www.issta.co.il/resources/services/cheapFlights.aspx?sortc=1&dest=" + destination;
        $.get(url, null, function (data) { FlightScraper.completeScrape(data, destination); });
    },

    completeScrape: function (data, destination) {
        data = $(data);
        var results = [];
        data.find("tr").each(function (i, trElement) {
            var children = $(trElement).children();
            if (children.length == 6 && !$(children[0]).hasClass("CFBL")) {
                var result = [
                    Lists.destinations[destination],
                    $(children[1]).text(), // departure date
                    $(children[3]).text(), // return date
                    $(children[0]).text(), // departure weekday
                    $(children[2]).text(), // return weekday
                    Utils.dateDiffByDay(Utils.parseDate($(children[1]).text()), Utils.parseDate($(children[3]).text())),  // number of days
                    $(children[4]).text().replace("$","")  // cost
                ];
                results.push(result);
            }
        });
        UI.addResults(results);
        FlightScraper.currentlyBeingScraped--;
        if (FlightScraper.currentlyBeingScraped == 0) {
            UI.flush();
        }
    }
};