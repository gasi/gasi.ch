/*
$Id: urilist.js 6659 2008-12-10 09:42:44Z donohoe $
(c) 2008 The New York Times Company

*/

var TimesPeople = {
  version: '1.0',
  Config: {
    host:              'http://timespeople.nytimes.com',
    css_host:          NYTD.Hosts.cssHost,
    image_host:        NYTD.Hosts.imageHost,
    js_host:           NYTD.Hosts.jsHost,
    ad_host:           'http://www.nytimes.com',
    user_image_host :  'http://pimage.timespeople.nytimes.com',
    image_path:        '/images/apps/timespeople/',
    css_path:          '/css/0.1/screen/timespeople_1.1/',
    css_build_path:    '/css/0.1/screen/build/timespeople_1.1/',
    service:           '/svc/timespeople/toolbar/1.0/',
    image_service:     'http://tp-upload.nytimes.com/postpic.php',
    xpi:               false,
    RMID:              /RMID=([^;]+)/.test(unescape(document.cookie)) ? RegExp.$1 : '',
    get_started_uri:   'http://timespeople.nytimes.com/getstarted'
  }
};

// DEPRECATED! in use by older version of userpages.js (/js/app/timespeople/userpages/userpages_1.1.js)
TPCONFIG = {
  "service": "/svc/timespeople/fe/fe_svc.html"
};

/*
Determining page group, type, title and descriptions based on META tags
*/
TimesPeople.Config.Page = {
    Group:
    [
        { value: 'articleid', alias: 'article' },
        { value: 'PT' },
        { value: 'WT.z_gpt',  alias: 'article' }
    ],
    Type:
    {
        "article":
        {
            "tom" :
            [
                { value: "biography"      },
                { value: "editor's note"  },
                { value: "editorial"      },
                { value: "interview"      },
                { value: "recipe"         },
                { value: "special report" },
                { value: "review"         }
            ]
        },
        "topic":
        {
            "SCG":
            [
                { value: "movie pages", alias: "movie guide" }
            ],
            "PST":
            [
                { value: "movie details", alias: "movie guide" },
                { value: "health guide" },
                { value: "travel guide" }
            ]
        },
        "community":
        {
            "PST":
            [
                { value: "comments overflow", alias: "article" },
                { value: "rate-review",       alias: "movie guide" }
            ]
        },
        "multimedia":
        {
            "SCG":
            [
                { value: "election guide" }
            ],
            "PST":
            [
                { value: "interactive", alias: "interactive graphic" },
                { value: "interactive features", alias: "interactive feature" },
                { value: "image",       alias: "graphic"},
                { value: "video" }
            ],
            "tom":
            [
                { value: "slideshow",  alias: "slide show" }
            ]
        },
        "blogs":
        {
            "PST":
            [
                { value: "blog main",   alias: "blog" },
                { value: "blog post" }
            ]
        },
        "venue":
        {
            "tom":
            [
                { value: "attraction" },
                { value: "dining",        alias: "restaurant" },
                { value: "accommodation", alias: "hotel"      },
                { value: "shopping",      alias: "attraction" },
                { value: "night life",    alias: "attraction" }
            ]
        }
    },
    Title:
    {
        "article":
        {
            "default":      [ "meta[name='hdl']", "div.header h1:not(h1.movie)", "div.header h1", "#aColumn #article h1", "title"],
            "article":      [ "meta[name='hdl']", "div.header h1:not(h1.movie)", "div.header h1", "#aColumn #article h1"]
        },
        "topic":
        {
            "default"     : [ "meta[name='name']",    "meta[name='GTN']", "#subHdr h1", "title" ],
            "topic"       : [ "meta[name='name']",    "meta[name='GTN']", "#subHdr h1" ],
            "movie guide" : [ "#header div.title h1", "meta[name='MTI']" ],
            "health guide": [ "meta[name='HGSN']" ],
            "travel guide": [ "h5.fn", "meta[name='name']" ]
        },
        "multimedia":
        {
            "default":      [ "meta[name='hdl']",     "title" ],
            "interactive graphic": [ "meta[name='hdl']" , "title" ],
            "interactive feature": [ "meta[name='hdl']" , "title" ],
            "slide show":   [ "meta[name='hdl']",     "title" ],
            "graphic":      [ "meta[name='dsk']",     "title" ],
            "election guide": [ "h1",                 "#masthead h2 a", "title" ],
            "video":        [ "#libraryPlayerTitleName h1" ]
        },
        "blogs":
        {
            "default":      [ "h2.entry-title", "title" ],
            "blog post":    [ "h2.entry-title" ]
        }   ,
        "venue":
        {
            "default":      [ "meta[name='name']", "title" ],
            "hotel":        [ "meta[name='name']" ],
            "restaurant":   [ "meta[name='name']" ],
            "attraction":   [ "meta[name='name']" ]
        },
        "community":
        {
            "default":      [ "#header div.title h1", "meta[name='MTI']", "title" ],
            "movie guide":  [ "#header div.title h1", "meta[name='MTI']" ]
        }
    },
    Description:
    {
        "article":
        {
            "default":      [ "#aColumn #article p:not(p:empty)", "meta[name='description']", "meta[name='lp']" ],
            "article":      [ "#aColumn #article p:not(p:empty)", "meta[name='description']", "meta[name='lp']" ],
            "editorial":    [ "#aColumn #article p:not(p:empty)", "meta[name='description']", "meta[name='lp']" ]
        },
        "topic":
        {
            "default":      [ "meta[name='description']" ],
            "topic"       : [ "div.companyInformation", "meta[name='description']", "meta[name='summary']" ],
            "movie guide" : [ "p[class='review']",      "meta[name='description']" ],
            "health guide": [ "#definition p",          "meta[name='Description']" ],
            "travel guide": [ "#topStoryHorizontal p",  "meta[name='description']" ]
        },
        "multimedia":
        {
            "default":      [ "meta[name='description']" ],
            "interactive graphic": [ "meta[name='description']" ],
            "interactive feature": [ "meta[name='description']" ],
            "slide show":   [ "div.story", "div[class='caption']", "meta[name='description']" ],
            "graphic":      [ "td font[size='-1']", "meta[name='byl']", "meta[name='description']" ],
            "election guide": [ "meta[name='description']" ],
            "video":        [ "#libraryPlayerDesc p" ]
        },
        "blogs":
        {
            "default":      [ "meta[name='description']" ],
            "blog post":    [ "div.entry-content p", "meta[name='description']" ]
        }   ,
        "venue":
        {
            "default":      [ "meta[name='description']" ],
            "hotel":        [ "p.description", "span.description", "meta[name='description']" ],
            "restaurant":   [ "p.description", "span.description", "meta[name='description']" ],
            "attraction":   [ "p.description", "span.description", "meta[name='description']" ]
        },
        "community":
        {
            "default":      [ "meta[name='description']" ],
            "movie guide" : [ "div.result]",      "meta[name='description']" ]
        }
    }
};

/*
	Config Actions
	- condition to satisfy, location in page, element type, element style, position (first/last), HTML for action within element
*/

TimesPeople.Config.HTML = {
	Recommend:
	{
		standard  : "<a class='timespeople_recommend_link' href='javascript:void(0);' style='background-image:url(__ICON__); background-repeat:no-repeat; padding:2px 0 3px 20px; font-size:1em;'>Recommend</a>",
		uppercase : "<a class='timespeople_recommend_link' href='javascript:void(0);' style='background-image:url(__ICON__); background-repeat:no-repeat; padding:1px 0 3px 20px; font-size:1em; color:#333333; text-transform:uppercase;'>Recommend</a>",
		blog      : "<a class='timespeople_recommend_link' href='javascript:void(0);' style='background-image:url(__ICON__); background-repeat:no-repeat; padding:1px 0 3px 20px; color:#004276;'>Recommend</a>"
	}
};

TimesPeople.Config.Style = {
	Recommend:
	{
		 standard   : "padding-right:10px;border-right:1px solid #CCCCCC;margin-right:10px"
	}
};

/*
	Structure:
		btnConfig = {
			PAGE_GROUP: {
				PAGE_TYPE: { key: IF_THIS_ELM_EXISTS, target: PLACE_HERE, type: TAG, style: CSS, position: first_OR_last, html: BUTTON_HTML }
				...
		where key and target are are prototpe css selectors, and evaluates as $$(IF_THIS_ELM_EXISTS)[0]
*/
TimesPeople.Config.Action = {
	Recommend:
	{
		"article":
		{
			"article":      { key: "#toolsList", target: "#toolsList", type: "li", style: {}, position: "first", html: TimesPeople.Config.HTML.Recommend.standard },
			"editorial":    { key: "#toolsList", target: "#toolsList", type: "li", style: {}, position: "first", html: TimesPeople.Config.HTML.Recommend.standard },
			"default":      { key: "#toolsList", target: "#toolsList", type: "li", style: {}, position: "first", html: TimesPeople.Config.HTML.Recommend.standard }
		},
		"topic":
		{
			"topic"       : { key: "#tools", target: "#tools", type: "span", style: 'padding-right:10px;border-right:1px solid #CCCCCC;margin-right:10px', position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"movie guide" : { key: "#tools", target: "#menu",  type: "span", style: 'float: right; margin: 5px 0 0 4px; padding-left: 2px;', position: "last", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"health guide": { key: "#tools", target: "#breadcrumb", type: "span", style: 'float:right;', position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"travel guide": { key: "#tools", target: "#tools", type: "span", style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"default"     : { key: "#tools", target: "#tools", type: "span", style: 'padding-right:10px;border-right:1px solid #CCCCCC;margin-right:10px', position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase }
		},
		"multimedia":
		{
			"interactive graphic": { key: "#articleTools", target: "#articleTools", type: "li", style: '', position: "last", html: TimesPeople.Config.HTML.Recommend.standard },
			"slide show":     { key: "#toolsList", target: "#toolsList", type: "li",  style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"graphic":        { key: "table", target: "font[size='-2']", type: "div", style: 'padding-top:4px; font-family:Arial,Helvetica;', position: "last", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"election guide": { key: "#toolsList", target: "#toolsList", type: "li",  style: '', position: "first", html: "<a class='timespeople_recommend_link' href='javascript:void(0);' style='color:#333; background-position:4px; font-size:1em; text-transform:uppercase; background-image:url(__ICON__); background-repeat:no-repeat;'>Recommend</a>" },
			"default":        { key: "#toolsList", target: "#toolsList", type: "li",  style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase }
		},
		"blogs":
		{
			"blog post": { key: "#content", target: "ul.entry-tools", type: "li", style: "padding-right:10px; margin-right:10px", position: "last", html: TimesPeople.Config.HTML.Recommend.blog },
			"default"  : { key: "#content", target: "ul.entry-tools", type: "li", style: "padding-right:10px; margin-right:10px", position: "last", html: TimesPeople.Config.HTML.Recommend.blog }
		},
		"venue":
		{
			"hotel":      { key: "#tools", target: "#tools", type: "span", style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"restaurant": { key: "#tools", target: "#tools", type: "span", style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"attraction": { key: "#tools", target: "#tools", type: "span", style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase },
			"default":    { key: "#tools", target: "#tools", type: "span", style: TimesPeople.Config.Style.Recommend.standard, position: "first", html: TimesPeople.Config.HTML.Recommend.uppercase }
		}
	}
};
