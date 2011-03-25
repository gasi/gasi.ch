---
layout: post
title: Zoom.it API
---
In [case][1] [you][2] [haven't][3] [heard][4], [Microsoft Live Labs][livelabs]
has (re-)launched [Zoom.it][] (formerly [Seadragon.com][seadragon]), a
free (high-resolution) image sharing service. If you're a developer, the most
important aspect of the announcement is the [Zoom.it API][zoomit-api].


## Why It's a Big Deal

Basically, the [Zoom.it API][zoomit-api] lets you convert any image — PDF or
even page — on the web into a [multiscale representation][idz-1], specifically
a [Deep&nbsp;Zoom image][dz-spec] or <acronym title="Deep Zoom Image">DZI</acronym>.
Apart from sharing it as the default zooming embed, you can also incorporate
this multiscale resource into your application or web site, using any of the
existing platforms such as [Deep Zoom][deep-zoom] (Silverlight & Windows&nbsp;Phone&nbsp;7),
[Seadragon&nbsp;Ajax][seadragon-ajax] (JavaScript), [Pivot][pivot] (WPF &
Silverlight), [Seadragon&nbsp;Mobile][seadragon-mobile] (iOS) and [OpenZoom]
[openzoom] (Flash), all connected through a common, open and
[documented file format][dz-spec].

Finally, this could bring true *image streaming*, very much like audio & video
streaming, to the web. Personally, I wish that the [Zoom.it service][zoomit-api]
will do the same for high-resolution image sharing as [YouTube][yt-rick-roll]
did for video sharing, even if it's on a smaller scale.  
Similarly, it could potentially establish itself as a [platform][tc-yt-platform],
bringing some of [the benefits I've talked about previously][imsir] to every
author on the web, namely the power & simplicity of publishing the highest
quality image you've got, irrespective of file size or target device.

> ## Web APIs: A Brief Introduction

> If you'd like to learn more about this topic, check out the brownbag presentation
> I gave at Seadragon last year:  
> [Web APIs, Mashups & REST (PDF)][web-apis]


## Contribution
While unfortunately not currently being a part of the team behind [Zoom.it][],
I'd still like to share with you a small contribution of mine:
The [Zoom.it ActionScript 3 SDK][zoomit-as3-sdk] which I've implemented over
the course of last weekend, taking advantage of the fantastic
[Zoom.it API documentation][zoomit-api-docs]. It will hopefully fit right in
there along with the [official Zoom.it API helper libraries][zoomit-api-libs]
for .NET, Silverlight, Windows Phone 7 and the inherent
[JavaScript support][zoomit-api-js], e.g. using [jQuery][].

The <a href="http://openzoom.org/zoomit-as3-sdk/">Zoom.it ActionScript 3 SDK</a> lets you build exciting new applications using <a href="http://adobe.com/flashplatform">Adobe Flash, Flex and AIR</a> on top of the <a href="http://api.zoom.it">Zoom.it service</a>, optionally combining it with the <a href="http://openzoom.org">OpenZoom SDK</a> for super-smooth rendering.

I'd like to point out that the <a href="http://openzoom.org/zoomit-as3-sdk/">Zoom.it ActionScript 3 SDK</a> wouldn't have been viable if it weren't for Live Labs' generous support of very liberal <code>clientaccesspolicy.xml</code> and <code>crossdomain.xml</code> files on <a href="http://api.zoom.it/clientaccesspolicy.xml">all</a> <a href="http://cache.zoom.it/clientaccesspolicy.xml">relevant</a> <a href="http://api.zoom.it/crossdomain.xml">API</a> <a href="http://cache.zoom.it/crossdomain.xml">endpoints</a>, enabling an equal experience for the most commonly used client technologies. Enjoy.

<blockquote class="flash">
<h2>Zoom.it ActionScript 3 SDK</h2>
<a href="http://openzoom.org/zoomit-as3-sdk/download/latest/zip">Download Zoom.it ActionScript 3 SDK 0.8 (32KB)</a>
<a style="font-weight:normal" href="http://github.com/openzoom/zoomit-as3-sdk">Browse Source</a>
<a style="font-weight:normal" href="http://docs.openzoom.org/zoomit-as3-sdk/">Read Documentation &amp; Examples</a>
<strong>License:</strong> <a style="font-weight:normal" href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache License, Version 2.0</a>
</blockquote>

<blockquote class="info">
<h2>Demo</h2>
<p class="footnote">Browse the front pages of the <a href="http://nytimes.com">New York Times</a>, between August 9 and August 15, depending on your time zone. The widget utilizes the <a href="http://api.zoom.it">Zoom.it API</a> to dynamically create the corresponding multiscale image of the front page and renders it using the OpenZoom SDK.</p>

<a href="http://gasi.ch/examples/zoom-it-api/" title="Zoom.it NY Times Demo by Daniel Gasienica, on Flickr"><img style="border: 2px solid #999999" src="http://farm5.static.flickr.com/4102/4877662142_f21494697c.jpg" width="500" height="300" alt="Zoom.it NY Times Demo" /></a>
<a href="http://gasi.ch/examples/zoom-it-api/">View Demo</a> | <a href="http://gasi.ch/examples/zoom-it-api/source/">View Source</a>
</blockquote>

<h3>Acknowledgements</h3>
<p class="footnote">As an intern on the Seadragon team at Microsoft Live Labs, I was involved in the early design of the <a href="http://api.zoom.it">Zoom.it API</a> (formerly Seadragon.com API) but my deep respect and gratitude go out to the team &mdash; <a href="http://twitter.com/aseemk">Aseem</a>, <a href="http://twitter.com/golds711">Goldie</a>, <a href="http://twitter.com/kpsin">Karan</a>, Jyoti, Jesse <em>et al.</em> &mdash;  who executed on this idea and delivered this truly elegant first embodiment of it.</p>


[1]: http://www.reddit.com/r/technology/comments/cykxj/microsoft_launches_zoomit_free_service_for
[2]: http://blogs.msdn.com/b/stevecla01/archive/2010/08/05/microsoft-s-live-labs-launches-zoom-it.aspx
[3]: http://news.ycombinator.com/item?id=1582203
[4]: http://www.readwriteweb.com/archives/microsoft_introduces_social_lightbox_zoomit_from_live_labs_and_silverlight.php
[livelabs]: http://livelabs.com/
[zoom.it]: http://zoom.it/
[zoomit-api]: http://api.zoom.it/
[seadragon]: http://seadragon.com/
[idz-1]: http://gasi.ch/blog/inside-deep-zoom-1/
[dz-spec]: http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx
[deep-zoom]: http://www.microsoft.com/silverlight/deep-zoom/
[seadragon-ajax]: http://seadragon.com/developer/ajax/
[pivot]: http://www.getpivot.com/
[seadragon-mobile]: http://itunes.apple.com/us/app/seadragon-mobile/id299655981?mt=8
[openzoom]: http://openzoom.org
[yt-rick-roll]: http://www.youtube.com/watch?v=oHg5SJYRHA0
[tc-yt-platform]: http://techcrunch.com/2008/03/12/youtube-the-platform/
[imsir]: http://gasi.ch/blog/inline-multiscale-image-replacement/
[web-apis]: http://gasi.ch/publications/web-apis-daniel-gasienica.pdf
[zoomit-as3-sdk]: http://openzoom.org/zoomit-as3-sdk/
[zoomit-api-docs]: http://zoom.it/pages/api/
[zoomit-api-libs]: http://zoom.it/pages/api/libraries/
[zoomit-api-js]: http://zoom.it/pages/api/quickstarts/javascript
[jquery]: http://jquery.com