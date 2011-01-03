---
layout: post
tags: ActionScript, Adobe, Deep Zoom, Flash, Flex, Microsoft, multiscale, MultiScaleImage, OpenZoom, Silverlight, Zoomify
title: 'MultiScaleImage: <br/>Flex Deep Zoom Component'
---
Ever since I published my proof of concept of <a href="http://gasi.ch/blog/inside-deep-zoom-3/">Deep Zoom in Flash</a>, many people from around the world got in touch with me and told me that they also wanted to play around with this technology. Therefore, for a couple of months now, I've been working on an <acronym title="Software Development Kit">SDK</acronym> for <acronym title="Zoomable User Interface">ZUIs</acronym> and multi-scale images for Flash called <a href="http://openzoom.org/">OpenZoom</a>. The SDK is still <em>work in progress</em> and I won't focus on it today. However, I promise you it will definitely be topic of many posts in the future.

Today I'd like to share with you a first preview of the <a href="http://docs.openzoom.org/sdk/org/openzoom/flex/components/MultiScaleImage.html">MultiScaleImage component</a> that I've built on top of the <a href="http://openzoom.org/">OpenZoom SDK</a>.

<blockquote class="flash">
<h2>Introducing the OpenZoom SDK</h2>
This stuff is really old and is only kept around here for archival purposes. Get the latest news and the first public release of the <a href="http://gasi.ch/blog/openzoom-sdk">OpenZoom SDK</a> in the <a href="http://gasi.ch/blog/openzoom-sdk">official announcement</a>.
</blockquote>

<h2>Nomen Est Omen</h2>
MultiScaleImage? Sounds familiar? Well indeed, it is the same name Microsoft uses for their <a href="http://msdn.microsoft.com/en-us/library/system.windows.controls.multiscaleimage(VS.95).aspx">Deep Zoom Silverlight control</a>. In spirit, the <a href="http://docs.openzoom.org/sdk/org/openzoom/flex/components/MultiScaleImage.html">Flex MultiScaleImage component</a> I've built and its Silverlight counterpart are very close. How close? Well, let's look at a fictional code listing:

<blockquote class="info">
<h2>Code: Silverlight vs Flex</h2>
Microsoft Silverlight

{% highlight xml %}
<MultiScaleImage x:Name="image" Source="foo/bar.xml"/>
{% endhighlight %}

Adobe Flex
{% highlight xml %}
<openzoom:MultiScaleImage id="image" source="foo/bar.xml"/>
{% endhighlight %}
</blockquote>

<h2>Under the Hood</h2>
As much as the two look alike from the outside, they differ very much under the hood. Microsoft's MultiScaleImage control is a native control of the Silverlight runtime and therefore has a very efficient implementation. On the contrary, the <a href="http://docs.openzoom.org/sdk/org/openzoom/flex/components/MultiScaleImage.html">Flex MultiScaleImage</a> component is built on top of ActionScript 3. Nonetheless, I am very pleased with the performance, considering I haven't spent much time on tuning it yet.

Even though I can praise Microsoft for their Deep Zoom implementation, I dare to say they didn't do their homework on <acronym title="Application Programming Interface">API</acronym> design. Shortly after Deep Zoom was introduced to the public with the fantastic <a href="http://memorabilia.hardrock.com/">Hard Rock Memorabilia</a> showcase by <a href="http://www.vertigo.com/">Vertigo</a>, dozens of bloggers wrote posts about how to program the Silverlight MultiScaleImage control to create something that somewhat comes close to the Hard Rock site. It was hard because the <acronym title="Application Programming Interface">API</acronym> is cumbersome and confusing. I'd speculate this is one of the reasons we haven't seen a lot more inspiring Deep Zoom work since.

Flexibility, a <a href="http://docs.openzoom.org/sdk/org/openzoom/flex/components/MultiScaleImage.html">powerful API</a> and ease of use were the top priorities for my implementation of the MultiScaleImage component for Flex. Whether I've achieved my goals, I am eagerly waiting to hear from you.

<h2>Batteries Included</h2>
As the title of the article suggests, the Flex MultiScaleImage component has built-in support for <a href="http://msdn.microsoft.com/en-us/library/cc645050(VS.95).aspx">Deep Zoom</a> images. But not only that, it also comes with native support for <a href="http://zoomify.com/">Zoomify</a> and <a href="http://openzoom.org/specs/">OpenZoom</a> images without you having to write one line of code. The latter is a new multi-scale image description format I've designed and will probably discuss another time.

To keep things clear, there is one thing that the Silverlight MultiScaleImage control supports that I do not (yet) support: Collections. Personally, I think this is one of the cases where it's misleading that a MultiScaleImage (singular!) supports collections of images and suddenly has subimages. Therefore, once this functionality will be part of the OpenZoom SDK, it most certainly will have its own component.

In order to prevent a similiar incident to Silverlight's introduction of their MultiScaleImage component where <a href="http://www.wintellect.com/CS/blogs/jprosise/archive/2008/03/18/mousewheel-zooms-in-silverlight-2-0.aspx">bloggers</a> <a href="http://www.hanselman.com/blog/TheWeeklySourceCode18DeepZoomSeadragonSilverlight2MultiScaleImageMouseWheelZoomingAndPanningEdition.aspx">around</a> <a href="http://silverlight.net/blogs/msnow/archive/2008/07/29/tip-of-the-day-23-how-to-capture-the-mouse-wheel-event.aspx">the</a> <a href="http://blogs.msdn.com/jaimer/archive/2008/03/31/a-deepzoom-primer-explained-and-coded.aspx">world</a> had to write how to add mouse and keyboard navigation to Deep Zoom, I've architected the Flex component in a way that has plug&nbsp;&amp;&nbsp;play support for this kind of functionality which is a nice application of the <a href="http://en.wikipedia.org/wiki/Strategy_pattern">Strategy Pattern</a>.

<h2>Getting Started</h2>
I could go on and on about how the Flex MultiScaleImage component works but instead I've prepared three demos that let you interactively explore the three core concepts of the component, namely <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/transformers/package-detail.html">transformers</a>, <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/controllers/package-detail.html">controllers</a> and <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/constraints/package-detail.html">constraints</a>.

<blockquote class="info">
<h2>Demo #1: Transformers</h2>
The transformer controls the animation of the viewport. Currently, I've implemented one controller, <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/transformers/TweenerTransformer.html">TweenerTransformer</a>, that is based on the fantastic <a href="http://tweener.googlecode.com/">Tweener</a> animation library. Check out the demo to see how flexible the architecture is and how easily you can customize the animation of MultiScaleImage. You want to know what's also great about transformers? If for whatever reason you don't need them, you don't pay a single kilobyte penalty for an animation library that is never used.

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/transformers/" title="Flex MultiScaleImage Transformers Demo"><img src="http://farm4.static.flickr.com/3159/3090848151_e68b462ebc.jpg" width="500" height="300" /></a>

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/transformers/">View Demo</a> | <a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/source/">View Source</a>
</blockquote>

<blockquote class="info">
<h2>Demo #2: Controllers</h2>
Controllers are the glue between user input and viewport control. The <a href="http://openzoom.org/">OpenZoom SDK</a> features two implementations of controllers at this point, namely a <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/controllers/MouseController.html">MouseController</a> and a <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/controllers/KeyboardController.html">KeyboardController</a>. Both have already built-in support for quite some customization but if you need more, feel free to implement your own controller based on <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/IViewportController.html">IViewportController</a>.

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/controllers/" title="Flex MultiScaleImage Controllers Demo"><img src="http://farm4.static.flickr.com/3220/3090848513_70f2a74735.jpg" width="500" height="300"/></a>

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/controllers/">View Demo</a> | <a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/source/">View Source</a>
</blockquote>

<blockquote class="info">
<h2>Demo #3: Constraints</h2>
The constraint controls what states the viewport can reach. Don't want people to zoom out too much? Just add a <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/constraints/ZoomConstraint.html">ZoomConstraint</a> and set minimum and maximum zoom. Don't want them to lose the scene out of sight? Add a <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/constraints/VisibilityConstraint.html">VisibilityConstraint</a>. Doesn't the component only support a single constraint? Yes, but the architecture is flexible enough to allow you to combine constraints in a <a href="http://docs.openzoom.org/sdk/org/openzoom/flash/viewport/constraints/CompositeConstraint.html">CompositeConstraint</a> which is an application of the <a href="http://en.wikipedia.org/wiki/Composite_pattern">Composite Design Pattern</a>.

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/constraints/" title="Flex MultiScaleImage Constraints Demo"><img src="http://farm4.static.flickr.com/3270/3090847691_b2b3725fff.jpg" width="500" height="300"/></a>

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/constraints/">View Demo</a> | <a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/source/">View Source</a>
</blockquote>

<blockquote class="info">
<h2>Demo #3&frac12;: Out of the Box</h2>
After having experienced all the advanced features of the component, let's sit back and enjoy the elegance and purity of the MultiScaleImage component as it comes out of the box. In its plain form, a MultiScaleImage has only one purpose: Displaying images tack sharp no matter how big they appear on the screen. Try for yourself, click on the picture to go to the demo and there just keep on resizing your browser window and enjoy the beauty of simplicity how the image slowly appears sharper and sharper.

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/out-of-the-box/" title="Flex MultiScaleImage Out of the Box Demo" target="_blank"><img src="http://farm3.static.flickr.com/2074/1572001177_f2b1783b09.jpg" width="500" height="375" /></a>

<a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/out-of-the-box/">View Demo</a> | <a href="http://gasi.ch/examples/2008/12/08/flex-multiscaleimage-component/source/">View Source</a>
</blockquote>

<h2>Download</h2>
If you'd like to play around with this component, please <a href="http://openzoom.org/sdk/download/latest/zip/">download the OpenZoom SDK (ZIP)</a>. If you want to find out more, I recommend you to read the <a href="http://docs.openzoom.org/sdk/">OpenZoom SDK API documentation</a> and if you feel particularly adventureous, take a look at the <a href="http://openzoom.org/go/code/">source code.</a>

In case you have questions, feedback or you've found a bug, feel free to leave a comment down below or file a bug report at the <a href="http://openzoom.org/go/issues/">OpenZoom Bug Tracking System</a>.

Today, I've barely scratched the surface of what's possible with the OpenZoom Flex MultiScaleImage component.  In case you have suggestions for topics you would like me to talk more about, again, just leave a comment and I'll see what I can do.

I can't wait to see what you create with it. If you have a demo with the MultiScaleImage component, post a comment with a link to your demo.

<h3 style="font-size:100%">Disclaimer</h3>
<span style="font-size:85%">This is a preview release. Performance has not been optimized yet. All parts of the component, in particular the API are subject to change.</span>

<h3 style="font-size:100%">License</h3>
<span style="font-size:85%">The <a href="http://openzoom.org/">OpenZoom SDK</a> is licensed under the <a href="http://www.mozilla.org/MPL/MPL-1.1.html">MPL 1.1</a>/<a href="http://www.gnu.org/licenses/gpl.html">GPL 3</a>/<a href="http://www.gnu.org/licenses/lgpl.html">LGPL 3</a> trilicense.</span>