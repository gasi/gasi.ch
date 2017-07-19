/*
$Id: loader.js 16909 2009-03-30 21:23:26Z santep $
(c) 2008 The New York Times Company
*/

(function() {
  if (TimesPeople && TimesPeople.ToolbarController) return;
  if (TimesPeople && TimesPeople.URIList && TimesPeople.URIList.allowsCurrentPage()) {

    NYTD.require('/js/app/lib/prototype/1.6.0.2/prototype.js');
    NYTD.require('/js/app/lib/scriptaculous/1.8.1/builder.js');
    NYTD.require('/js/app/lib/scriptaculous/1.8.1/effects.js');
    NYTD.require('/js/app/lib/scriptaculous/1.8.1/dragdrop.js');
    NYTD.require('/js/app/lib/scriptaculous/1.8.1/controls.js');
    NYTD.require('/js/app/lib/NYTD/0.0.1/cookie.js');
    NYTD.require('/js/app/lib/NYTD/0.0.1/template.js');
    NYTD.require('/js/app/timespeople_1.1/defaultfeed.js');
    NYTD.require('/js/app/timespeople_1.1/build.js');
  }
})();
