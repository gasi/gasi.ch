---
layout: post
title: 'Inside Deep Zoom  &ndash; <br/>Part I: Multiscale Imaging'
---
In March 2007 Blaise Aguera y Arcas presented <a href="http://www.ted.com/index.php/talks/blaise_aguera_y_arcas_demos_photosynth.html">Seadragon &amp; Photosynth</a> at <a href="http://ted.com/">TED</a> that created quite some buzz around the web. About a year later, in March 2008, Microsoft released Deep&nbsp;Zoom (formerly <a href="http://livelabs.com/seadragon/">Seadragon</a>) as a &laquo;killer feature&raquo; of their Silverlight 2 (Beta) launch at <a href="http://visitmix.com/2008/">Mix08</a>. Following this event, there was quite some <a href="http://theflashblog.com/?p=351">back</a> and <a href="http://weblogs.asp.net/jgalloway/archive/2008/03/21/why-silverlight-2-deep-zoom-really-is-something-new.aspx">forth</a> in the blogosphere (damn, I hate that word) about the true innovation behind Microsoft&#x27;s Deep&nbsp;Zoom.

Today, I don&#x27;t want to get into the same kind of discussion but rather start a series that will give you a &laquo;behind the scenes&raquo; of Microsoft&#x27;s Deep&nbsp;Zoom and similar technologies.

This first part of &laquo;Inside Deep Zoom&raquo; introduces the main ideas &amp; concepts behind Deep&nbsp;Zoom. In part two, I&#x27;ll talk about some of the mathematics involved and finally, part three will feature a discussion of the possibilities of this kind of technology and a demo of something you probably haven&#x27;t seen yet.

<blockquote class="info">
<h2>Background</h2>
As part of my <a href="http://flickr.com/photos/gasi/collections/72157605647818072/">awesome internship</a> at <a href="http://zoomorama.com/">Zoomorama</a> in Paris, I was working on some amazing things (of which you&#x27;ll hopefully hear soon) and in my spare time, I&#x27;ve decided to have a closer look at Deep&nbsp;Zoom (formerly <a href="http://livelabs.com/seadragon/">Seadragon</a>.) This is when I did a lot of research around this topic and where I had the idea for this series in which I wanted to share my knowledge.
</blockquote>

<h2>Introduction</h2>
Let&#x27;s begin with a quote from Blaise Aguera y Arcas demo of Seadragon at the TED conference<sup><a href="#ref-1">[1]</a></sup>:
<q>&hellip;the only thing that ought to limit the performance of a system like this one is the number of pixels on your screen at any given moment.</q>

What is this supposed to mean? See, I have a 24&quot; screen with a maximum resolution of 1920 x 1200 pixels. Now let&#x27;s take a photo from my digital camera which shoots at 12 megapixel. The photo&#x27;s size is typically 3872 x 2592 pixels. When I get the photo onto my computer, I roughly end with something that looks like this:

<img src="http://farm4.static.flickr.com/3007/2895952539_6706a7d8e8.jpg" width="500" height="375" alt="Large image on small screen." />

No matter how I put it, I&#x27;ll never be able to see the entire 12&nbsp;megapixel photo at 100% magnification on my 2.3&nbsp;megapixel screen. Although this might seem obvious, let&#x27;s take the time and look at it from another angle: With this in mind we don&#x27;t care anymore if an image has 10&nbsp;megapixel (that is 10&#x27;000&#x27;000&nbsp;pixels) or 10 gigapixel (10&#x27;000&#x27;000&#x27;000&nbsp;pixels) since the number of pixels we can see at any moment is limited by the resolution of our screen. This again means, looking at a 10&nbsp;megapixel image and 10&nbsp;gigapixel image on the same computer screen should have the same performance. The same should hold for looking at the same two images on a mobile device such as the iPhone. However, important to note is that with reference to the quote above we <em>might</em> experience a performance difference between the two devices since they differ in the number of pixels they can display.

So how do we manage to make the performance of displaying image data independent of its resolution? This is where the concept of an image pyramid steps in.

<h2>The Image Pyramid</h2>

Deep Zoom, or for that matter any other similar technology such as <a href="http://zoomorama.com/">Zoomorama</a>, <a href="http://zoomify.com/">Zoomify</a>, <a href="http://maps.google.com/">Google Maps</a> etc., uses something called an <em>image pyramid</em> as a basic building block for displaying large images in an efficient way:

<img src="http://farm4.static.flickr.com/3185/2895500066_4f063f8dcf_o.jpg" width="500" height="250" alt="Image Pyramid"/>

The picture above illustrates the layout of such of an image pyramid. The two purposes of a typical image pyramid are to store an image of any size at many different resolutions (hence the term <em>multi-scale</em>) as well as these different resolutions sliced up in many parts, referred to as <em>tiles</em>.

Because the pyramid stores the original image (redundantly) at different resolutions we can display the resolution that is closest to the one we need and in a case where not the entire image fits on our screen, only the parts of the image (tiles) that are actually visible. Setting the parameter values for our pyramid such as number of levels and tile size allows us to control the required data transfer.

Image pyramids are the result of a <em>space vs. bandwidth</em> trade-off, often found in computer science. The image pyramid obviously has a bigger file size than its single image counterpart (for finding out how much exactly, be sure to come back for part two) but as you see in the illustration below, regarding bandwidth it&#x27;s much more efficient at displaying high-resolution images where most parts of the image are typically not visible anyway (grey area):

<img src="http://farm4.static.flickr.com/3110/2896812190_9ee246831d.jpg" width="500" height="375" alt="Multiscale Imaging 2" />

As you can see in the picture above, there is still more data loaded (colored area) than absolutely necessary to display everything that is visible on the screen. This is where the image pyramid parameters I mentioned before come into play: Tile size and number of levels determine the relationship between amount of storage, number of network connections and bandwidth required for displaying high-resolution images.

<h2>Next</h2>
Well, this was it for part one of <em>Inside&nbsp;Deep&nbsp;Zoom.</em> I hope you enjoyed this short introduction to image pyramids &amp; multi-scale imaging. If you want to find out more, as usual, I&#x27;ve collected some links in the <a href="#further-reading">Further Reading</a> section. Other than that, be sure to come back, as the next part of this series &ndash; part two &ndash; will discuss the characteristics of the Deep Zoom image pyramid and I will show you some of the mathematics behind it.


<h3><a name="further-reading">Further Reading</a></h3>
<ul>
<li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Pyramid_(image_processing)">Pyramid (image processing)</a></li>
<li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Gaussian_Pyramid">Gaussian Pyramid</a></li>
<li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Mipmap">Mipmap</a></li>
<li>Paper: <a href="http://web.mit.edu/persci/people/adelson/pub_pdfs/RCA84.pdf">Pyramid Methods in Image Processing</a> (PDF)</li>
<li>Video: <a href="http://www.youtube.com/watch?v=0ra5tp7K--I">Seadragon Tech Demo</a> (prior to Microsoft acquisition)</li>
</ul>

<h3><a name="references">References</a></h3>
<ul>
<li><a name="ref-1">[1]</a> <a href="http://www.ted.com/index.php/talks/blaise_aguera_y_arcas_demos_photosynth.html">Blaise Aguera y Arcas: Jaw-dropping Photosynth demo</a></li>
</ul>