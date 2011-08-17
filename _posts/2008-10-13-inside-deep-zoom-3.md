---
layout: post
title: 'Inside Deep Zoom &ndash; <br/>Part III: Deep Zoom in Flash'
---
Welcome back to part three of <em>Inside Deep Zoom</em>. Well, I actually didn&#x27;t plan to post this tonight but I just got home and found out that tomorrow, Microsoft will <a href="http://micromiel.com/2008/10/13/silverlight-2-ships/">officially ship Silverlight 2</a> along with its acclaimed Deep Zoom technology which&hellip;
<q>&hellip;enables unparalleled interactivity and navigation of ultra-high resolution imagery.</q>

<h2>History</h2>
As the previous articles and the title of this one already hinted it, I did implement Deep Zoom in Adobe Flash. The viewer I've built reads standard, unmodified Deep Zoom images directly from Deep Zoom Composer. It turns out, the idea was born when I was doing my internship at <a href="http://zoomorama.com/">Zoomorama</a> and I was tasked to work on multi-scale image rendering. One night at my apartment, I was taking a closer look at Deep Zoom and realized that it works quite similarly and could be easily implemented on top of the work we did at Zoomorama. The very next day, I talked to our people about it and their reaction was very positive. Another twenty-four hours later, I had a working proof-of-concept for rendering Deep Zoom images inside our own viewer. At this point, I&#x27;d like to thank my incredible developer teammates David, Olivier &amp; Eric for being part of making this possible.

<h2>Deep Zoom in Flash</h2>
What you are about to see, is one set of original Deep Zoom images (fresh out of Deep Zoom Composer) that runs both inside Flash as well as Silverlight. Going into all the implementation details and the implications of this will probably warrant another blog post. However, I think it&#x27;s interesting to note that with the work I did, we now have a working solution for creating the same kind of experiences Deep Zoom enables on Microsoft Silverlight, but instead running on Adobe Flash.

What does this mean? First, the reach you get with Flash is massively bigger than what you get with Silverlight. Think about it, when Silverlight 2 ships tomorrow it&#x27;s market share starts at basically zero. Considering that Flash player 9 has something close to 98% market penetration, this is a big deal.

<em>On a side note, if I wouldn&#x27;t be kept busy with all these ETH projects, Deep Zoom would have been out for weeks before the official launch of Silverlight 2 on a platform that is mature and has an order of magnitude higher reach.</em>

Second, unlike Deep Zoom in Silverlight, Deep Zoom in Flash doesn&#x27;t crash Firefox on my Mac. Enough said, see for yourself.

<blockquote class="info">
<h2>Navigation</h2>
<strong>Click to zoom in</strong> and <strong>shift-click to zoom out</strong> on the picture. <strong>Drag &amp; drop to pan</strong>. The Flash viewer supports <strong>fullscreen</strong> mode with the keyboard shortcut <strong>F</strong> or by right-clicking and choosing <em>Fullscreen</em> in the context menu. Other ways to navigate are also found in the context menu.
</blockquote>

<blockquote class="info">
<h2>Sample #1 &ndash; Mont Saint Michel</h2>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/mont-saint-michel/flash/"><img src="http://farm4.static.flickr.com/3011/2933175032_8d570e7e51.jpg" width="500" height="334" alt="Mont Saint Michel" /></a>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/mont-saint-michel/flash/">View in Flash</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/mont-saint-michel/silverlight">View in Silverlight Deep Zoom</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/mont-saint-michel/mont-saint-michel.jpg">View Original Image</a>
</blockquote>

<blockquote class="info">
<h2>Sample #2 &ndash; Billions</h2>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/billions/flash/"><img src="http://farm1.static.flickr.com/200/441355880_94f96bcd5d.jpg" width="500" height="334" alt="Billions &amp; Billions Served." /></a>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/billions/flash/">View in Flash</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/billions/silverlight">View in Silverlight Deep Zoom</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/billions/billions.jpg">View Original Image</a>
</blockquote>

<blockquote class="info">
<h2>Sample #3 &ndash; Deux Femmes</h2>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/deux-femmes/flash/"><img src="http://farm3.static.flickr.com/2084/2101923518_c021e4766f_b.jpg" width="500" height="746" alt="Deux Femmes" /></a>
<a href="/blog/examples/2008/10/13/inside-deep-zoom/deux-femmes/flash/">View in Flash</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/deux-femmes/silverlight/">View in Silverlight Deep Zoom</a> | <a href="/blog/examples/2008/10/13/inside-deep-zoom/deux-femmes/deux-femmes.jpg">View Original Image</a>
</blockquote>

<h2>Addendum</h2>
The Flash viewer for viewing Deep Zoom images is still work in progress and therefore you might experience certain jerkiness when navigating around. It is based on a codebase I wrote from the ground up. So far in this blog, I&#x27;ve not only written about things I experimented with but usually also released the source code that goes along with it. This should not be an exception, however, the code is not ready for public consumption and therefore I kindly ask you to keep an eye on this blog for future announcements.

Although I agree mostly with the statement that <a href="http://theflashblog.com/?p=351">Silverlight Deep Zoom is Nothing New for Flash</a> (one could go one step further by saying <em>Silverlight Deep Zoom is Nothing New</em>), I must give credits to the Seadragon team for their innovative &amp; engaging implementation that revived the interest in zooming as a very powerful concept.

Even though the Adobe Flash Platform is still my preferred development platform, I am very happy about the competition Microsoft brought with Silverlight or Sun, Apple &amp; Curl with their respective RIA technologies. I realized this more then ever when I compared Silverlight Deep Zoom to my own implementation on top of the Flash Player. Therefore, I&#x27;d like to take this opportunity to petition Adobe for the following two matters:

<blockquote class="info">
<h2>Adobe Petition #1: <br/>Native Mouse Wheel Support on Mac OS X</h2>
Adobe touts the Flash Player as leading example for a <em>cross-platform</em> development environment. According to this <a href="http://onflash.org/ted/2008/03/defining-cross-platform.php">article by Ted Patrick</a>, an Adobe Evangelist, <strong>cross-platform</strong> is defined as follows:

<strong>Across operating systems and web browsers:</strong>
<ul>
<li><strong>Identical APIs (classes, methods, properties, types, and return values)</strong></li>
<li><strong>Identical API behavior</strong></li>
<li><strong>Similar performance</strong></li>
<li><strong>Similar installation experience</strong></li>
</ul>

As long as we don&#x27;t have multi-touch screens available everywhere, the mouse wheel or <em>scrolling</em> is one of the most powerful input gestures for Zoomable User Interfaces.

It&#x27;s 2008 and the Flash Player still does not allow you to natively listen for mouse wheel events on the Macintosh. Adobe, please fix this <a href="http://www.imdb.com/title/tt0151804/quotes#qt0386876"><em>glitch</em></a>.
</blockquote>

<blockquote class="info">
<h2>Adobe Petition #2: <br/>Support for a Background Thread</h2>
As you play around with the Deep Zoom samples in Flash you&#x27;ll sometimes notice jerkiness in the zooming and panning while the movement should be very smooth. Although there is still a lot of room for optimization that can be done on my part, from my observations, the root cause that is responsible for this jerkiness is when the Flash Player is handling network traffic (when fetching tiles) and doing zooming or panning animations at the same time.

From my research I&#x27;ve gathered that Microsoft&#x27;s Silverlight supports <a href="http://msdn.microsoft.com/en-us/library/cc221403(VS.95).aspx">Background Workers</a>, a way to run time-consuming tasks on a background thread. I believe a similar mechanism on the Flash Player would allow me to handle network traffic on a background thread while the UI smoothly animates. This is an advanced feature but the Flash Platform is slowly maturing and exposing such mechanisms to developers has to considered.

</blockquote>

<h3>Photography</h3>
The photos <em><a href="http://flickr.com/photos/gasi/2933175032/">Mont Saint Michel</a></em>, <em><a href="http://flickr.com/photos/gasi/441355880/">Billions</a></em> &amp; <em><a href="http://flickr.com/photos/gasi/2101923518/">Deux Femmes</a></em> were all taken by me. If you&#x27;d like to see more, I suggest you to check out <a href="http://flickr.com/photos/gasi/">my Flickr stream</a>. All three photos are published under a <a href="http://creativecommons.org/licenses/by-nc-nd/2.0/">Creative Commons Attribution-Noncommercial-No Derivative Works</a> license.