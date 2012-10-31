var Utils = {
    day: 60*60*24*1000,

    addDays: function(date, days){
        return new Date(date.getTime() + days*Utils.day);
    },

    toSkyScannerDate: function (date){
      return date.format("yymmdd")
    }
}