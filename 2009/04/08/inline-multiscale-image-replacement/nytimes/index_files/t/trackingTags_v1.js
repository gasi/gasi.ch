// START WEBTRENDS JS TAG
var gtrackevents=false;
var gdcsid="dcsym57yw10000s1s8g0boozt_9t1x";
var gfpcdom=".nytimes.com";
var gdomain="wt.o.nytimes.com";
var js_host;
if (window.location.protocol.indexOf('https:')==-1) {
  js_host = "http://graphics8.nytimes.com/js/app/analytics/";
} else {
  js_host = "https://select.nytimes.com/js/app/analytics/";
}

// Include WebTrends wtid.js
var wt_initObj = { enabled:true, fpc:"WT_FPC", domain:gdomain, dcsid:gdcsid };
if (wt_initObj.enabled&&(document.cookie.indexOf(wt_initObj.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
var wtid_js_host="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+wt_initObj.domain+"/"+wt_initObj.dcsid+"/"
var wtidjs = document.createElement('script');
wtidjs.setAttribute('type', 'text/javascript');
wtidjs.setAttribute('src', wtid_js_host+'wtid.js');
document.getElementsByTagName('head').item(0).appendChild(wtidjs);
}

var wtInc = document.createElement('script');
wtInc.setAttribute('language', 'javascript');
wtInc.setAttribute('type', 'text/javascript');
wtInc.setAttribute('src', js_host+'controller_v1.1.js');
document.getElementsByTagName('head').item(0).appendChild(wtInc);
// END WEBTRENDS JS TAG

// START REVENUE SCIENCE PIXELLING CODE
var revSc = document.createElement('script');
revSc.setAttribute('language', 'javascript');
revSc.setAttribute('type', 'text/javascript');
revSc.setAttribute('src', js_host+'gw.js?csid=H07707');
document.getElementsByTagName('head').item(0).appendChild(revSc);

var customRevSci = document.createElement('script');
customRevSci.setAttribute('language', 'javascript');
customRevSci.setAttribute('type', 'text/javascript');
customRevSci.setAttribute('src', js_host+'revenuescience.js');
document.getElementsByTagName('head').item(0).appendChild(customRevSci);
// END REVENUE SCIENCE PIXELLING CODE


// Load TimesPeople
var NYTD = NYTD || {};

NYTD.Hosts = NYTD.Hosts || {
  imageHost: 'http://graphics8.nytimes.com',
  jsHost:    'http://graphics8.nytimes.com',
  cssHost:   'http://graphics8.nytimes.com'
}

NYTD.require = NYTD.require || function(url) {
  document.write('<script src="'+ NYTD.Hosts.jsHost + url +'" type="text/javascript" charset="utf-8"><\/script>');
}

if (navigator.userAgent.indexOf('AppleWebKit/41') == -1 && !window.opera) {
  if(!window.TimesPeople) {
    NYTD.require('/js/app/timespeople_1.1/preloader.js', function() {  NYTD.require('/js/app/timespeople_1.1/loader.js'); });
  }
  else {
    NYTD.require('/js/app/timespeople_1.1/loader.js');    
  }
}