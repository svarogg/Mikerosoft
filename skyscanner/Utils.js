﻿var Utils = {
    day: 60*60*24*1000,
    weekdays: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],

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
      return new Date("20" + date.substr(0,2), parseInt(date.substr(2,2)) - 1, date.substr(4,2))
    },

    containsWeekend: function(departureDate, returnDate){
      var hadFriday = false;
      var hadSaturday = false
      for(var date = departureDate; date <= returnDate; date = Utils.addDays(date, 1)){
        var weekday = Utils.weekdays[date.getDay()];
        if(weekday == 'ו')
          hadFriday = true;
        else if (weekday == 'ש')
          hadSaturday = true

        if(hadFriday && hadSaturday)
          return true;
      }

      return false;
    },

    dateDiffByDay: function (first, second) {
        // Copy date parts of the timestamps, discarding the time parts.
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

        // Do the math.
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;

        // Round down.
        return Math.floor(days);
    }
}