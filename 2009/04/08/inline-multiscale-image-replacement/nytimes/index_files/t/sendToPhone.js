
NYTD.SendToPhone=Class.create({
  initialize:function(){
    var nodeList=$$('div#article div.articleTools ul#toolsList li.email');
    var emailForm=$('emailThis');
    
    if(nodeList.size() == 1 && emailForm.nodeName.toLowerCase() == 'form' && !$('send_to_phone_tools_link')){
      var btnTarget=nodeList[0];
      
      this.$emailThisForm=emailForm;

      var icon=NYTD.Hosts.imageHost+'/images/article/functions/tools_mobile.gif';
      var btnText='Send To Phone';

      var btnHTML = '<span id="send_to_phone_tools_link"><a href="javascript:void(0);" style="font-size:1em; text-transform:uppercase; background-image:url('+icon+');background-position:2px 0;background-repeat:no-repeat; padding:0pt 0pt 3px 20px;display:block;" class="dyn_recommend_button">'+btnText+'</a></span>';
      var btnType = 'LI';
      var btnOptions = {};
      if (btnTarget) {
        var btn = new Element(btnType, btnOptions);
        btn.innerHTML = btnHTML;
        btn.addClassName('sendtophone');
        btnTarget.insert({after:btn});
        btn.observe('click',this.send.bind(this));
      }
    }
  },

  send:function(){
    this.$emailThisForm.action=this.$emailThisForm.action.replace('emailthis','sendtophone');
    setTimeout("document.emailThis.submit()",10);
  }
});
 
document.observe("dom:loaded", function() {
  new NYTD.SendToPhone();
});



