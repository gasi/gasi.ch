/* $Id: articleShareLegacy.js 16877 2009-03-30 17:34:47Z jguinto $
(c) 2008 The New York Times Company */

function writePost(excludeList) {
	var shareTools = new NYTD.ArticleShareTools();
	shareTools.writePost(excludeList);
}

// FIXME This probably needs to be exposed for those other pages.
function toggleShareTab(shareButton, postList, excludeList) {
		writePost(excludeList);	
}
