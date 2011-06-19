---
layout: post
title: Inline Multiscale <br/>Image Replacement
---
<q>How will we view and publish images on the web in 5 years?</q> Today I'd like to share with you my vision of how we could improve the publication and viewing of high-resolution images on the web. Before discussing what this vision entails, I'd really like you to explore it yourself.

<h1>Scenarios</h1>
The following are three real-world scenarios for publishing high-resolution images on the web: <strong>news</strong>, <strong>blogs</strong> and <strong>photo sharing</strong>. Explore any one or all of these scenarios and interact with the images within. <em>Come on, let's get your mouse wheel spinnin'!</em> :)

<blockquote class="info">
<h2>News: The New York Times</h2>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/nytimes/" title="Inline Multiscale Image Replacement"><img src="http://farm4.static.flickr.com/3299/3419715880_dfac0333de.jpg" width="500" height="500" alt="Inline Multiscale Image Replacement" /></a>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/nytimes/">View Demo</a> | <a href="http://www.nytimes.com/2007/08/12/world/asia/12afghan.html">View Original Page</a>

<p class="footnote"><em>Disclaimer: Since a high-resolution version of the original image was not available to me, I replaced it with another one from the Department of Defense which was taken in the same region, called Zabul Province.</em></p>
</blockquote>

<blockquote class="info">
<h2>Blogs: Information Architects</h2>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/ia/" title="Inline Multiscale Image Replacement"><img src="http://farm4.static.flickr.com/3651/3418905983_0cd00199f6.jpg" width="500" height="500" alt="Inline Multiscale Image Replacement" /></a>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/ia/">View Demo</a> | <a href="http://informationarchitects.jp/web-trend-map-4-final-beta/">View Original Page</a>
</blockquote>

<blockquote class="info">
<h2>Photo Sharing: Flickr</h2>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/flickr/" title="Inline Multiscale Image Replacement"><img src="http://farm4.static.flickr.com/3408/3419715614_95204d3df9.jpg" width="500" height="500" alt="Inline Multiscale Image Replacement" /></a>
<a href="http://gasi.ch/examples/2009/04/08/inline-multiscale-image-replacement/flickr/">View Demo</a> | <a href="http://www.flickr.com/photos/oliveralex/524852348/">View Original Page</a>

<p class="footnote"><em>Disclaimer: Due to conflicts, the original JavaScript that was included in the page was removed for this demo.</em></p>
</blockquote>

<h1>Vision</h1>
The solution for publishing high-resolution images on the web I set out to develop had to have the following qualities:

<h2>For Users</h2>
<ul>
<li>The user <strong>shall not pay</strong>, in terms of time or bandwidth, for large <strong>images she's not interested in</strong>.</li>
<li>The solution shall <strong>degrade gracefully</strong>, e.g. fall back to <em>status quo</em>, for users that do not meet the technical requirements.</li>
<li>The solution shall offer <strong>a vastly enhanced experience for viewing high-resolution images on the web</strong>, including <strong>full screen support</strong> while <strong>retaining</strong> as many of the <strong>standard interactions</strong> with images as possible.</li>
<li>The user shall <strong>not be taken out of the context</strong> she was working in.</li>
</ul>

<h2>For Publishers</h2>
<ul>
<li>The solution shall offer <strong>simple publishing of high-resolution images</strong> and turn their <strong>exploration</strong> into an <strong>awesome experience</strong>!</li>
<li>The solution shall be as much <strong>backwards- &amp; forwards-compatible</strong> as possible.</li>
</ul>

<h1>Solution</h1>
The solution I developed, based on something I started to call <strong>Inline Multiscale Image Replacement</strong>, is a combination of three different technologies from the <a href="http://openzoom.org/">OpenZoom</a> project, together known as <strong>OpenZoom Endo</strong>:
<ul>
<li><strong>OpenZoom Caral</strong>: A <a href="http://python.org/">Python</a> tool to batch convert images into a multiscale image format based on the <a href="http://gasi.ch/blog/openzoom-description-format/">OpenZoom Description Format</a> and <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Microsoft Deep Zoom</a>.</li>
<li><strong>OpenZoom Nano</strong>: A light-weight multiscale image viewer running in the Adobe Flash Player and built with the <a href="http://openzoom.org/">OpenZoom SDK</a>.</li>
<li><strong>OpenZoom Endo</strong>: A script performing progressive enhancement on new and existing HTML pages. It is written in JavaScript and packaged as <a href="http://jquery.com/">jQuery</a> plugin.</li>
</ul>

<blockquote class="info">
<h2>Features</h2>
<img src="http://farm4.static.flickr.com/3613/3419742376_15aaf47058.jpg" width="500" height="500" alt="Inline Multiscale Image Replacement" />

<ul>
<li><strong>Simple publishing of high-resolution images on the web</strong>, even on existing pages.</li>
<li><strong>Continue to use interactions your already familiar with</strong> such as <em>Save Image As</em> and <em>View Image</em>. (Screenshot)</li>
<li><strong>Progressively enhance your browsing experience</strong>, with graceful fallback for those of you with browsers that are not JavaScript or Flash enabled.</li>
<li><strong>Never download more data than you currently look at.</strong></li>
<li>Take advantage of your entire screen real estate by using the <strong>full screen mode</strong>.</li>
<li>Explore the full glory of <strong>high-resolution images without</strong> ever <strong>leaving their page</strong>.</li>
<li><strong>Publish images in different sizes</strong> from the same source image.</li>
<li><strong>Free!</strong> <em>as in beer and freedom!</em><br/>Released under the GPLv3 open source license.</li>
</ul>
</blockquote>

### Known Issues
Of course, as with any *fresh-out-of-the-oven* technology there a couple of
things that don't work as intended. Here's a list of *known issues*:

 - Image replacement can be delayed by large pages, resulting in a visible page flicker.
 - At this point, OpenZoom Endo does not pass the W3C validator due to the custom attribute *(XHTML namespaces & custom DTDs, anyone?)*
 - Ideally, the viewer would initially feature some visual cues that convey the enhanced functionality. Add some simple controls to that. *Designer, anyone?*
 - Script sometimes conflicts with existing JavaScript within the same page.
 - Multiple replacements of images cause performance problem related to Flash Player plugin instantiation.
 - Images sometimes fail to load due to plugin activation issues.

<blockquote markdown="1" class="info">
## Walkabout
Let me quickly guide you through the basic process of publishing a high-resolution image on your web page:

<ol>
<li markdown="1">
First, use Python and the **OpenZoom Caral** library to convert your image
into a multiscale image pyramid and optionally define additional sizes of
your image you'd like to publish or offer for download:
{% highlight py %}
import openzoom

creator = openzoom.ImageCreator()
creator.create("awesome.jpg", "awesome", [0, 600, 1920])
{% endhighlight %}
</li>

<li markdown="1">
Reference jQuery library, e.g. using Google's CDN and the **OpenZoom Endo**
script in your HTML page:
{% highlight js %}
<script type="text/javascript"
 src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript"
 src="openzoom-min.js"></script>
    {% endhighlight %}
</li>
<li markdown="1">
Place the **OpenZoom Nano** viewer SWF (`OpenZoomViewer.swf`) file into the
same directory as your page.
</li>
<li markdown="1">
Add the image to your HTML page and annotate it with the special
`openzoom:source` attribute:

{% highlight xml %}
<img src="awesome/awesome-600x320.jpg" width="600" height="320"
 openzoom:source="awesome/image.xml"/>
{% endhighlight %}
</li>

<li markdown="1">
Enjoy hassle-free high-resolution imagery on the web!
</li>
</ol>
</blockquote>

<blockquote markdown="1" class="flash">
## Download & Source
-  Download <a href="http://open-zoom.googlecode.com/files/openzoom-endo-0.4.zip">OpenZoom Endo (808kb)</a> from Google Code.
-  Have a look at the <a href="http://code.google.com/p/open-zoom/source/browse/trunk/projects/endo/trunk?r=316#trunk/src">source code</a> on the OpenZoom Google Code repository.
</blockquote>

# You
*I want your feedback!* Let me know if my idea works for you. If it doesn't,
why not? How could things be improved? *I am listening*. If you're a JavaScript
hacker, take apart my code and share with me what could be done better.
If you're a designer, consider contributing to a better interface for the viewer
for an even better user experience. If you're an iPhone user, let me know if my
solution breaks when you check out one of the previous demos. If you think
this is *b#$&#($@*, then share your vision of the future of high-resolution
images on the web with me!

As always, if you have feedback, questions or want to start a dialogue, feel
free to leave a comment down below, head over to the awesome
[OpenZoom Get Satisfaction site](http://getsatisfaction.com/openzoom/) or
follow me on Twitter: [@OpenZoom](http://twitter.com/OpenZoom) and
[@gasi](http://twitter.com/gasi). In case you find a bug, please file a bug
report in the
[OpenZoom Google Code Bug System](http://code.google.com/p/open-zoom/issues/).

## Epilogue
With this and my other work on the OpenZoom project, I want to explore new ways
of interacting with visual information on the web. Join me and let's explore how
the future of browsers with the appropriate image formats that support
high-definition images could look & feel like!
