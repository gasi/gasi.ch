jQuery(function(){jQuery("#openid_rollup > div").hide();jQuery("#openid_rollup_link").click(function(){jQuery("#openid_rollup > div").toggle();return false})});function stylize_profilelink(){jQuery("#commentform a[@href$='profile.php']").addClass("openid_link")}function add_openid_to_comment_form(){jQuery("#commentform").addClass("openid");var C=' <a id="openid_enabled_link" href="http://openid.net">(OpenID Enabled)</a> <div id="openid_text">If you have an OpenID, you may fill it in here.  If your OpenID provider provides a name and email, those values will be used instead of the values here.  <a href="http://openid.net/what/">Learn more about OpenID</a> or <a href="http://openid.net/get/">find an OpenID provider</a>.</div> ';jQuery("#commentform #url").attr("maxlength","100");var A=jQuery("#commentform label[@for=url]");var B=jQuery(":visible:hastext",A);if(B.length>0){B.filter(":last").appendToText(C)}else{if(A.is(":hastext")){A.appendToText(C)}else{A.append(C)}}jQuery("#openid_text").hide();jQuery("#openid_enabled_link").click(function(){jQuery("#openid_text").toggle(200);return false})};