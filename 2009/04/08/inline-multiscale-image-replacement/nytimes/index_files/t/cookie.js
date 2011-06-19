var NYTD = window.NYTD || {};

/*
 * Standard class to work with unencrypted cookies in JS.
 *  Use the NYTD.Cookies.getOrCreate() method to receive a cookie
 *  object to work with.  Details of cookie setting and parsing
 *  are private for protection.
 */
NYTD.Cookies = {
    getOrCreate: function (cookieName) {
        var cookies = document.cookie.split(';');
        var nameSearchString = cookieName + '=';
        var cookieValueString = '';
        for (var c=0, len=cookies.length; c<len; ++c) {
             var cur = cookies[c];
             cur = cur.replace(/^ */, '');
             if (cur.indexOf(nameSearchString) == 0) {
                  cookieValueString = cur.substring(nameSearchString.length,cur.length);
             }
        }

        var Cookie = function (name,str) {
            var checkKey = 'creator';
            var checkVal = 'NYTD.Cookies';
            var cookieName = name;
            var cookieString = str || "";
            var keyValPairs = {};

            if (str != "") {
                var checkStr = checkKey + '|' + checkVal;
                var regex = new RegExp(checkStr, "g");
                cookieString.replace(regex, "");

                var pairs = cookieString.split('^');
                for (var p=0, len=pairs.length; p<len; ++p) {
                    var cur = pairs[p];
                    var vals = cur.split('|');
                    keyValPairs[vals[0]] = vals[1];
                }
            }

            var set = function(expirationMillis) {
                var exp = new Date();
                var expirationOffset = expirationMillis || 31536000000; // 1 year default
                var len = 0;
                var keyvals = [];
                if (keyValPairs[checkKey]) {
                    delete keyValPairs[checkKey];
                }
                for (key in keyValPairs) {
                    if (keyValPairs.hasOwnProperty(key)){
                        keyvals.push(key + "|" + keyValPairs[key]);
                        len++;
                    }
                }
                keyvals.push(checkKey + "|" + checkVal);
                if (len > 0) {
                    exp.setTime(exp.getTime() + expirationOffset);
                }
                else {
                    exp.setTime(exp.getTime() - 86400000); // set to yesterday, to expire cookie
                }
                var expires = "; expires=" + exp.toGMTString();
                document.cookie = cookieName + "=" + keyvals.join('^') + expires + "; domain=.nytimes.com; path=/";
            };

            /*
             * The following functions are the interface for the Cookie object.
             */
            this.lookup = function (key) {
                return keyValPairs[key];
            };

            this.add = function (obj, expiration) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keyValPairs[key] = obj[key];
                    }
                }
                set(expiration);
            };

            this.remove = function () {
                for (var i=0, arg; arg = arguments[i]; ++i) {
                    if (keyValPairs[arg]) {
                        delete keyValPairs[arg];
                    }
                }
                set();
            };
            /* End public interface */
        };

        return new Cookie(cookieName, cookieValueString);
    },

    cookiesEnabled: function () {
        var name = "NYTCookiesEnabled";
        var exp = new Date();
        exp.setTime(exp.getTime() + 10000);
        document.cookie = name + "=test; expires=" + exp.toGMTString();
        var result = (document.cookie.indexOf(name) !== -1);
        if (result) {
            // only expire if the cookie was actually set
            exp = new Date();
            exp.setTime(exp.getTime() - 10000);
            document.cookie = name + "=test; expires=" + exp.toGMTString();
        }
        return result;
    }
};

