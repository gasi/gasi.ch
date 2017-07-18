var Tacoda_AMS_DDC_snippet_version = "1.3a";
var Tacoda_AMD_DDC_snippet_date = "011905";
var Tacoda_AMS_DDC_clist = new Array("TID","RMID","nyt-d");
var Tacoda_AMS_DDC_clist_notset = null;
var Tacoda_AMS_DDC_keys = new Array();
var Tacoda_AMS_DDC_values = new Array();
var Tacoda_AMS_DDC_vars_num = 0;
function Tacoda_AMS_DDC_getCookie(name) {
var cname = name + "=";
var dc = document.cookie;
if (dc.length > 0) {
for(var begin = dc.indexOf(cname); begin != -1; begin =
dc.indexOf(cname, begin)) {
if((begin != 0) && (dc.charAt(begin - 1) != ' ')) {
begin++;
continue;
}
begin += cname.length;
var end = dc.indexOf(";", begin);
if (end == -1)
end = dc.length;
return unescape(dc.substring(begin, end));
}
}
return Tacoda_AMS_DDC_clist_notset;
}
function Tacoda_AMS_DDC_addPair(key, value) {
Tacoda_AMS_DDC_keys[Tacoda_AMS_DDC_vars_num] = key;
Tacoda_AMS_DDC_values[Tacoda_AMS_DDC_vars_num] = value;
Tacoda_AMS_DDC_vars_num++;
}
function Tacoda_AMS_DDC_collect_vars() {
var Tacoda_AMS_DDC_vars_as_string = "";
for(var i = 0; i < Tacoda_AMS_DDC_vars_num; i++) {
Tacoda_AMS_DDC_vars_as_string += "&var_" + escape(
Tacoda_AMS_DDC_keys[i] ) + "=" + escape( Tacoda_AMS_DDC_values[i] ) ;
}
return Tacoda_AMS_DDC_vars_as_string;
}
function Tacoda_AMS_DDC(Tacoda_AMS_DDC_img_url, Tacoda_AMS_DDC_js) {
Tacoda_AMS_DDC_js = parseFloat(Tacoda_AMS_DDC_js);
Tacoda_AMS_DDC_args = "?" + Math.random() + "&snippet_version=" +
Tacoda_AMS_DDC_snippet_version + "&referrer=" + escape(document.referrer) +
"&page=" + escape(window.location.href);
Tacoda_AMS_DDC_args += "&timezone=" + (new Date()).getTimezoneOffset();
for(var i = 0; i < Tacoda_AMS_DDC_clist.length; i++) {
var clist_name = Tacoda_AMS_DDC_clist[i];
var clist_value = Tacoda_AMS_DDC_getCookie(clist_name);
if(clist_value != null) {
Tacoda_AMS_DDC_args += "&clist_" + escape(clist_name) + "=" +
escape(clist_value);
}
}
Tacoda_AMS_DDC_args += Tacoda_AMS_DDC_collect_vars();
document.write('<IMG '+'SRC="' + Tacoda_AMS_DDC_img_url +
Tacoda_AMS_DDC_args + '" height="1" width="1" border="0" id="tacoda">');
}

