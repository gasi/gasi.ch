/*
$Id: marginfix.js 14814 2009-02-13 21:30:55Z santep $
(c) 2008 The New York Times Company
*/


(function(){

  function run() {
    if(TimesPeople.URIList.allowsCurrentPage()){
      loadCSS();
      restoreState();
      TimesPeople.preInitialized = true;
    }
    else {
      delete TimesPeople;
    }
  }

  function restoreState(){
    if (NYTD.Cookies.getOrCreate('tpstate').lookup('minimized') != 'YES') {
      addMargin();
      drawPlaceHolder();
    }
  }

  function addMargin() {
    // FIXME
    // fast way, for baked in toolbar
    document.write('<style>html body {padding-top:51px;}<\/style>');

    // pre dom-ready way (for greasemonkey plugin)
    // document.body.style.paddingTop = '40px';
  }

  function drawPlaceHolder() {
    if(document.body && document.body.firstChild){
      if (!document.getElementById('TP_container')) {
        var container = document.createElement('div')
        container.id = 'TP_container';
        var shadow = document.createElement('div')
        shadow.id = 'TP_container_shadow';
        shadow.className = 's_shadow';
        document.body.insertBefore(container, document.body.firstChild);
        document.body.insertBefore(shadow, container);
      }
    }
    else {
      setTimeout(arguments.callee, 10);
    }
  }

  function loadCSS() {
    //TODO use documentFragment?
    var ie6 = (!!(window.attachEvent && !window.opera) && (parseFloat(navigator.appVersion.split(';')[1].split(' ')[2]) < 7));
    var head = document.getElementsByTagName('head')[0];

    function createLink(uri) {
      link = document.createElement('link');
      link.href = uri;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      head.appendChild(link);
      link = null;
    }

    createLink(TimesPeople.Config.css_host + TimesPeople.Config.css_build_path + 'styles.css');
    if(ie6) {
      createLink(TimesPeople.Config.css_host + TimesPeople.Config.css_path + 'timespeople_ie6.css');
    }

  }

  run();

})();