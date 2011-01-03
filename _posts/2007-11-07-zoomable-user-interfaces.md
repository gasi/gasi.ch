---
layout: post
title: Zoomable User Interfaces
---
In my <a href="http://gasi.ch/blog/tandem/">last post</a> I talked about the shortcomings of <a href="http://flickr.com/">Flickr</a> to provide you with enough context on where you&#x27;ve been,  where you are and where you are going. A particularly interesting concept to adress this issue and provide users with more context are <a href="http://en.wikipedia.org/wiki/Zooming_User_Interface" title="Zoomable User Interface">Zoomable User Interfaces (ZUI)</a>.
<h2>What are ZUIs?</h2>
If you use Google Maps, Google Earth or own an Apple iPhone you&#x27;ve already been exposed to zoomable user interfaces. Although these applications are fairly new &mdash; as far as I&#x27;ve read about the history of ZUI &mdash; the concepts behind them are not.

In 1963 <a href="http://de.wikipedia.org/wiki/Ivan_Sutherland">Ivan Sutherland</a> developed Sketchpad, today considered to be the first graphical user interface, which also featured a zoom function.  <a href="http://en.wikipedia.org/wiki/Jef_Raskin">Jef Raskin</a>, the creative mind behind the Apple Macintosh user interface and author of <a href="http://en.wikipedia.org/wiki/The_Humane_Interface">The Humane Interface</a>, was a a big proponent of ZUI. Part of his legacy lives on in the project <a href="http://en.wikipedia.org/wiki/Archy">Archy</a> where the concept of zooming plays an important role. <a href="http://en.wikipedia.org/wiki/Aza_Raskin">Aza Raskin</a>, Jef&#x27;s son and founder of <a href="http://humanized.com/">Humanized</a>, gave a talk at Google called <a href="http://video.google.com/videoplay?docid=-6856727143023456694" title="Away with Applications: The Death of the Desktop">&laquo;Away with Applications: The Death of the Desktop&raquo;</a>. If you&#x27;ve got some time at hand, I definitely recommend watching the whole session but the reason I am referring to it is the <a href="http://video.google.com/videoplay?docid=-6856727143023456694#1h05m00s">following sequence</a> where he talks about zoomable user interfaces. The main point to take away from Aza&#x27;s discussion about ZUI is
<p align="center"><em>&laquo;Where it is, is what it is.&raquo;</em></p>

<h2>What Does This Mean For Us?</h2>
Part of what he is trying to say is that we should take advantage of the excellent spatial awareness we, as human beings, possess. In regards to <a href="http://flickr.com/">Flickr</a> and <a href="http://gasi.ch/photos/">tandem,</a> it also means we should take advantage of certain mental models of entities we&#x27;re used to such as photos, sets, collections and their relationships. Photos reside inside sets and sets inside collections. Why not represent this on the screen?

I think we should be able to navigate through Flickr&#x27;s data model through zooming, not through pages. We should zoom into a collection and discover its sets. Then we zoom into the sets in front of us and discover the individual photos that belong to it. If we get the<em> feeling of being lost</em> we can just zoom out and find ourselves in the place where we came from. How awesome would that be?  It&#x27;s definitely a big step forward from using the back button which sometimes doesn&#x27;t take us back to the exact place we were before. And because zooming is so continuous &mdash; that is without a page refresh &mdash; it is even more intuitive.

Imagine you&#x27;re walking in a city and you take the wrong turn. When you realize it, do you suddenly re-appear at the block you were two minutes ago? No. You turn around and find yourself in more familiar surroundings. It&#x27;s a continous, smooth process just like zooming. Unlike the sudden context switch which a page refresh represents. Browsing something rich such as Flickr by clicking through pages is like walking down the street blinking permanently.

You may have noticed that <a href="http://gasi.ch/photos/" title="tandem">this early version</a> of tandem does not quite implement the principles I discussed in this post. Although the zooming is quite continuous, it is indirect and only between two states.

To get an idea of how the zooming might look in the future, check out this <a href="http://gasi.ch/projects/tandem" title="tandem">bleeding edge version of tandem</a>. <strike>However, be warned. </strike>Due to a nasty bug in the Flash Player for the Macintosh, the mouse wheel is not recognized without the use of a nasty hack<strike> (which I have not yet implemented.)</strike><em> [Fixed.]</em> Furthermore, zooming from collections into sets and from there to the photos is not realized (yet.) This is certainly the part I will be spending most of my time on in the future.

Another subtle but interesting difference you may notice between the <a href="http://gasi.ch/photos/" title="tandem">two</a> <a href="http://gasi.ch/projects/tandem" title="tandem">versions</a> of tandem is that I got rid of the paging navigation. I felt proud to have realized its shortcomings myself until I found out that I was obviously <a href="http://www.humanized.com/weblog/2006/04/25/no_more_more_pages/" title="No More Pages â€” Humanized">not the first one</a> to do so. But let&#x27;s talk about this another time&hellip;
<h3>Inspiration</h3>
<ul>
	<li><a href="http://video.google.com/videoplay?docid=-6856727143023456694">Away with Applications: The Death of the Desktop</a>
Aza Raskin&#x27;s talk at Google.</li>
	<li><a href="http://rchi.raskincenter.org/demos/zoomdemo.swf" title="Raskin Center Zoom Demo">Raskin Center Zoom Demo</a>
The demo from Aza&#x27;s talk. Warning: 8 megabyte Flash file!</li>
	<li><a href="http://www.ted.com/index.php/talks/view/id/129" title="Blaise Aguera y Arcas: Jaw-dropping Photosynth demo">Microsoft SeaDragon &amp; Photosynth Demo @ TED</a></li>
	<li><a href="http://www.airtightinteractive.com/projects/postcardviewer/example/">Airtight Interactive: Postcard Viewer
</a></li>
</ul>
<h3>Further Reading</h3>
<ul>
	<li><a href="http://www.cs.umd.edu/hcil/piccolo/learn/Toolkit_Design_2004.pdf">Toolkit Design for Interactive Structured Graphics</a>
Bederson, B. B., Grosjean, J., &amp; Meyer, J. (2004).
IEEE Transactions on Software Engineering, 30 (8), pp. 535-546.</li>
</ul>