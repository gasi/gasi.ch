/*
$Id: preloader.js 13995 2009-01-29 17:32:23Z santep $
(c) 2008 The New York Times Company
*/

var NYTD = NYTD || {};

NYTD.Hosts = NYTD.Hosts || {
  imageHost: 'http://graphics8.nytimes.com',
  jsHost:    'http://graphics8.nytimes.com',
  cssHost:   'http://graphics8.nytimes.com'
}

NYTD.require = NYTD.require || function(url) {
  document.write('<script src="'+ NYTD.Hosts.jsHost + url +'" type="text/javascript" charset="utf-8"><\/script>');
}

NYTD.require('/js/app/timespeople_1.1/config/config.js');
NYTD.require('/js/app/lib/NYTD/0.0.1/cookie.js');
NYTD.require('/js/app/timespeople_1.1/lib/console.js');
NYTD.require('/js/app/timespeople_1.1/urilist.js');
NYTD.require('/js/app/timespeople_1.1/marginfix.js');

