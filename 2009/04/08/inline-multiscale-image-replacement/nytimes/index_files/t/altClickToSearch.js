NYTD.require("http://graphics8.nytimes.com/js/app/lib/prototype/1.6.0.2/prototype.js", function(){NYTD.WordReference.initialize();});

NYTD.WordReference = (function(){
  
  var selection, selectionText, selectionButton, newRange;
  
  function handleClick(event) {
    if (selectionButton){
      cleanUp();
    }
    
    selection = getSelection();
    selectionText = selection && selection.toString();
    if (selectionText) {
      window.setTimeout(insertButton, 0);
      event.stop();
    }
  }
  
  function getSelection() {
    return Try.these(
      function() { return window.getSelection() },
      function() { return document.getSelection() },
      function() { 
        var selection = document.selection && document.selection.createRange();
        selection.toString = function() { return this.text };
        return selection;
      }
    ) || false;
  }
  
  function insertButton() {
    
    selectionButton = new Element(
        'span', {
          'className':'nytd_selection_button',
          'id':'nytd_selection_button',
          'title':'Lookup Word',
          'style': 'margin:-20px 0 0 -20px; position:absolute; background:url(http://graphics8.nytimes.com/images/global/word_reference/ref_bubble.png);width:25px;height:29px;cursor:pointer;_background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="http://graphics8.nytimes.com/images/global/word_reference/ref_bubble.png", sizingMethod="image");'
        }
    )
      
    if (Prototype.Browser.IE) {
      var tmp = new Element('div');
      tmp.appendChild(selectionButton);
      newRange = selection.duplicate();
      newRange.setEndPoint( "StartToEnd", selection);
      newRange.pasteHTML(tmp.innerHTML);
      selectionButton = $('nytd_selection_button');
    }
    else {
      var range = selection.getRangeAt(0);
      newRange = document.createRange();
      newRange.setStart(selection.focusNode, range.endOffset);
      newRange.insertNode(selectionButton);
    }
    
    Element.observe(selectionButton, 'mouseup', exportSelection, true);
    
  }
  
  function cleanUp() {
    selection = null;
    selectionButton.stopObserving('mouseup', exportSelection);
    newRange && newRange.pasteHTML && newRange.pasteHTML('');
    newRange = null;
    selectionButton.remove();
    selectionButton = null;
    selectionText = '';
  }
  
  function exportSelection(event) {
    var url = 'http://query.nytimes.com/search/query?srchst=ref&query=' + encodeURIComponent(selectionText);
    var newwin = window.open(url,'answersdotcom','height=450,width=820,location=false,menubar=false,toolbar=false,status=false,resizable, scrollbars');
    if (newwin) newwin.focus();
    event.stop();
  }
  
  return {
    initialize: function() {
      document.observe('mouseup', handleClick, false);
    }
  };
  
})();