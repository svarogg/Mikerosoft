var Utils = {
    day: 60*60*24*1000,

    addDays: function(date, days){
        return new Date(date.getTime() + days*Utils.day);
    },

    toSkyScannerDate: function (date){
      return date.format("yymmdd")
    },

    toReadableDate: function(date){
      return date.format("dd/mm/yyyy")
    },

    parseSkyScannerDate: function(date){
      return new Date("20" + date.substr(0,2), parseInt(date.substr(2,2)),date.substr(4,2))
    }
}