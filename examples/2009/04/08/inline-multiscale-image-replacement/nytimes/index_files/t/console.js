TimesPeople.console = {};
if (NYTD.Hosts.jsHost == 'graphics8.nytimes.com') {
  TimesPeople.console.log = TimesPeople.console.warn = TimesPeople.console.error = function() {};
} else {
  if (window.console && console.firebug) {
    TimesPeople.console = console;
  }
  else if (window.console && console.log) {
    var names = ["debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    for (var i = 0; i < names.length; ++i) {
     console[names[i]] = function() {}
    }
    TimesPeople.console = console;
  } else {
    if (window.debugService) {
      TimesPeople.console.log = TimesPeople.console.warn = TimesPeople.console.error = function(msg) {window.debugService.trace(msg)};
      // TimesPeople.console.time = function(name){window.tp_time = new Date().getMilliseconds();};
      // TimesPeople.console.timeEnd = function(name){ TimesPeople.console.log(name);TimesPeople.console.log((new Date().getMilliseconds()) - window.tp_time)};
    } else {
      TimesPeople.console.log = TimesPeople.console.warn = TimesPeople.console.error = function() {};
    }
  }
}

