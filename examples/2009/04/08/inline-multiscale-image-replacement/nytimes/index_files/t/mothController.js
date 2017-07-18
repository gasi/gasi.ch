/* $Id: mothController.js 17086 2009-04-02 15:09:24Z abehrens $ */

/* class for the slide player */
NYTD.MOTH = function(mothContainerId, visibleAtOnce, scrollIncrementAmount, alternateImageSource) {
	if (window.browser && (window.browser instanceof InsideNYTimesBrowser)) {return;}
	var total, imagesLoaded = false, allCells = $$("#"+mothContainerId+" td");
	var itemIndex = 0;
	var imgSrc = alternateImageSource || "http://graphics8.nytimes.com/images/global/buttons/";
	var distance = $$("#insideNYTimesBrowser td").first().offsetWidth + 1;
	var images = { leftOff: "moth_reverse_off.gif", leftOn: "moth_reverse.gif", rightOff: "moth_forward_off.gif", rightOn: "moth_forward.gif" };
	
	this.load = function() {
		allCells.invoke("removeClassName","hidden");
		total = allCells.length;
		this.activateButtons();
		this.showButtons();
		$("insideNYTimesScrollWrapper").scrollLeft = 0;
	}
	
	function tooFarRight() {
		return itemIndex + visibleAtOnce >= total;
	}

	function tooFarLeft() {
		return itemIndex == 0;
	}

	function loadUnloadedImages() {
		if (imagesLoaded) return;
		$$("#"+mothContainerId+" span.img[src]").each(function(span) {
			var image = new Element("img", {
				src: span.getAttribute("src"),
				alt: span.getAttribute("alt"),
				height:span.getAttribute("height"),
				width:span.getAttribute("width")
			});
			span.up("a").insert(image);
		});
		imagesLoaded = true;
	}

	this.activateButtons = function() {
		$("mothReverse").observe('click', this.goLeft.bind(this));
		$("mothForward").observe('click', this.goRight.bind(this));
	};

	this.disableButtons = function() {
		$("mothReverse").stopObserving('click');
		$("mothForward").stopObserving('click');
	};

	this.showButtons = function() {
		$("mothReverse").src = tooFarLeft() ? imgSrc + images.leftOff : imgSrc + images.leftOn;
		$("mothForward").src = tooFarRight() ? imgSrc + images.rightOff : imgSrc + images.rightOn;
	};

	this.goRight = function() {
		if (tooFarRight()) return;
		this.disableButtons();
		itemIndex += scrollIncrementAmount;
		this.update("right");
	};

	this.goLeft = function() {
		if (tooFarLeft()) return;
		this.disableButtons();
		itemIndex -= scrollIncrementAmount;
		this.update("left");
	};

	this.update = function(direction) {
		loadUnloadedImages();
		var incrementAmount = (direction == "right") ? distance : - distance;
		var that = this;
		new Effect.Scroll($("insideNYTimesScrollWrapper"), {
			x: incrementAmount,
			y: 0,
			mode: 'relative',
			duration: 0.4,
			afterFinish: function() { that.activateButtons(); } });
		this.showButtons();
	};
};

Event.observe(window, 'load', function(){
  var count = $('insideNYTimesBrowser').select("td:not([class=hidden])").length;
  var moth = new NYTD.MOTH("insideNYTimesBrowser", count, 1).load();
});
