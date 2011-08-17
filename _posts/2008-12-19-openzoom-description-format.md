---
layout: post
title: OpenZoom Description Format
---
When we look at <em>multiscale</em> or <em>multi-resolution</em> imaging in 2008,<sup><a href="#footnote-1-3">1</a></sup> we're mostly looking at a pile of image files<sup><a href="#footnote-2">2</a></sup> (called <em>tiles</em>) that make up an image pyramid.<sup><a href="#footnote-1-3">3</a></sup> Typically, image file formats, e.g. JPEG and PNG, have stored their properties such as width and height inside the file. These formats acted not only as carrier of image data but also as container for the metadata associated with it. This is a manifestation of the <a href="http://blogs.msdn.com/pix/archive/2006/08/16/702780.aspx">The Truth Is in the File</a> paradigm.

<blockquote class="error">
<h2>Deprecation Warning</h2>
The <strong>OpenZoom Description Format</strong> was just a proof-of-concept. For real-word applications, I highly recommend using the <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Microsoft Deep Zoom file format</a> as it has the widest client &amp; tooling support, is well-documented and can be used within collections.
</blockquote>

<h2>The Truth Is Out There</h2>
Taking this paradigm into account, we suddenly encounter a problem with multiscale images. If the original image is exploded into many little pieces, where do we store its metadata? There are different solutions to this problem. For mapping sites such as Google Maps and Yahoo Maps it is probably sufficient to just hard-code the image pyramid properties and how to access the tiles directly inside the client. However, for general multiscale image viewing technologies such as <a href="http://www.zoomify.com/">Zoomify</a>, <a href="http://livelabs.com/blog/seadragon/silverlight-2-deep-zoom/">Deep Zoom</a> or <a href="http://openzoom.org/">OpenZoom</a> this is not an option since we don't know the properties of the images until run-time. Again, there's a simple and elegant solution to for this: <em>XML description files that carry the image metadata.</em>

<h2>Rumble In the Jungle</h2>
In the following section I will first quickly present you the two dominant multiscale image description formats out there: <a href="http://www.zoomify.com/">Zoomify</a> and <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Microsoft Deep Zoom</a>. After that, I will introduce you to a new description format I designed called <a href="http://openzoom.org/specs/">OpenZoom description format</a>.

<em>Note: The following examples all describe a 10&nbsp;megapixel JPEG image with the name <strong>bruges</strong>.</em>

<blockquote class="info">
<h2>Zoomify</h2>
<strong>Example</strong>
<pre lang="xml">
<IMAGE_PROPERTIES VERSION="1.8"
 WIDTH="3872" HEIGHT="2592" TILESIZE="256"
 NUMTILES="241" NUMIMAGES="1"/>
</pre>

This Zoomify image has the following structure on the file system:
<strong>Descriptor</strong>
<code>bruges/ImageProperties.xml</code>
<code><strong>[filename]/ImageProperties.xml</strong></code>

<strong>Tiles</strong>
<code>bruges/TileGroup0/0-0-0.jpg</code>
<code>bruges/TileGroup0/1-0-0.jpg</code>
<code>bruges/TileGroup0/1-0-1.jpg</code>
<code>bruges/TileGroup0/1-1-0.jpg</code>
<code>bruges/TileGroup0/1-1-1.jpg</code>
<code>bruges/TileGroup0/2-0-0.jpg</code>
&hellip;
<code>bruges/TileGroup0/4-15-9.jpg</code>
<code><strong>[filename]/TileGroup[X]/[level]-[column]-[row].jpg</strong></code>
</blockquote>

<blockquote class="info">
<h2>Deep Zoom Image (DZI)</h2>
<strong>Example</strong>
<pre lang="xml">
<?xml version="1.0" encoding="UTF-8"?>
<Image xmlns="http://schemas.microsoft.com/deepzoom/2008"
       TileSize="256" Overlap="1" Format="jpg">
  <Size Width="3872" Height="2592"/>
</Image>
</pre>
This <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Deep Zoom image (DZI)</a> has the following structure on the file system:
<strong>Descriptor</strong>
<code>bruges.xml</code>
<code><strong>[filename].[xml|dzi]</strong></code>

<strong>Tiles</strong>
<code>bruges_files/0/0_0.jpg</code>
<code>bruges_files/1/0_0.jpg</code>
<code>bruges_files/2/0_0.jpg</code>
&hellip;
<code>bruges_files/9/0_0.jpg</code>
<code>bruges_files/9/0_1.jpg</code>
<code>bruges_files/9/1_0.jpg</code>
<code>bruges_files/9/1_1.jpg</code>
&hellip;
<code>bruges_files/12/15_9.jpg</code>
<code><strong>[filename]_files/[level]/[column]-[row].[extension]</strong></code>
</blockquote>

<blockquote class="info">
<h2>OpenZoom Description Format</h2>
The following is actually a description of the Deep Zoom image we've looked at previously.

<strong>Descriptor</strong>
<code>bruges.xml</code>

<code><strong>[filename].xml</strong></code>

<strong>Tiles</strong>
<em>Wherever you wish&hellip;</em>

<strong>Example</strong>
<pre lang="xml">
<?xml version="1.0" encoding="UTF-8"?>
<image xmlns="http://ns.openzoom.org/openzoom/2008">
  <pyramid width="131072" height="131072" type="image/jpeg"
           tileWidth="256" tileHeight="256" tileOverlap="0" origin="topLeft">
    <level width="1" height="1" columns="1" rows="1">
      <uri template="bruges_files/0/{column}_{row}.jpg"/>
    </level>
    <level width="2" height="2" columns="1" rows="1">
      <uri template="bruges_files/1/{column}_{row}.jpg"/>
    </level>
       &hellip;
    <level width="242" height="162" columns="1" rows="1">
      <uri template="bruges_files/8/{column}_{row}.jpg"/>
    </level>
    <level width="484" height="324" columns="2" rows="2">
      <uri template="bruges_files/9/{column}_{row}.jpg"/>
    </level>
    <level width="968" height="648" columns="4" rows="3">
      <uri template="bruges_files/10/{column}_{row}.jpg"/>
    </level>
    <level width="1936" height="1296" columns="8" rows="6">
      <uri template="bruges_files/11/{column}_{row}.jpg"/>
    </level>
    <level width="3872" height="2592" columns="16" rows="11">
      <uri template="bruges_files/12/{column}_{row}.jpg"/>
    </level>
  </pyramid>
</image>
</pre>

<a href="http://openzoom.org/specs/">OpenZoom Description Format XML Schema (Draft)</a>
</blockquote>

<h2>Not Invented Here</h2>
Alright, we've seen examples of all three description formats for the same image. Before anything else, you might ask yourself: <em>Why the #&$@ another format?</em> Good attitude and glad you asked. Hopefully, I will be able to answer this question for most of you. If not, just leave me a comment, I'd be glad to discuss this further. Now, let's compare these three formats by looking at where they shine but of course also at their shortcomings.

<h3>Conciseness</h3>
Obviously, <strong>Zoomify</strong> and <strong>Deep Zoom</strong> win big time here. Their description files have a <strong>couple of lines vs the 40+ lines</strong> of the <strong>OpenZoom</strong> descriptor which inherently is very verbose <em>&mdash; Ed.: Levels 2&ndash;7 omitted for esthetic reasons</em>. On the other hand, we should keep in mind that everything we see in the <strong>OpenZoom</strong> descriptor sample somehow has to be computed by the client for the other two formats. More on that later.

<h3>Portability</h3>
Not sure if portability is the right term, but let me explain what I mean: <em>How flexible is the format regarding the storage of the descriptor and its image tiles?</em> <strong>Deep Zoom</strong> is the most extreme case of the three where the <strong>descriptor file and the image tiles</strong> are <strong>strongly coupled</strong> through the original file name of your image. That means if you move your descriptor you always have to remember to move the image data folder as well. This could be considered risky as the two are not contained in one folder. <strong>Zoomify</strong> has the <strong>same limitation</strong> but at least the image data and its descriptor are both contained in the same folder that carries the name of the original image. <strong>OpenZoom</strong> is clearly <strong>the most portable</strong> of the three as it let's you specify the descriptor file independently of the image tiles.

<em><strong>Important Note:</strong> Both Microsoft and Zoomify  offer an alternative storage method in the form of a single-file format. They are called <a href="http://www.zoomify.com/support.htm#a20061222_2108">Zoomify's Pyramidal File Format (PFF)</a> and DZIZ (a <a href="http://en.wikipedia.org/wiki/ZIP">ZIP</a>-based container for DZI) which I've seen used by <a href="http://livelabs.com/photosynth/">Microsoft Photosynth</a>.</em>

<h3>Flexibility</h3>
<strong>Flexibility</strong> apparently was <strong>not a design goal of Microsoft or Zoomify</strong>. This is fine considering that the design of such a new format requires these kinds of trade-offs. Their assumption is that the descriptor file and the image tiles are strongly coupled and the latter are computed with a well-defined algorithm and stored in a fixed file hierarchy. Flexibility is <em>the</em> area where the <strong>OpenZoom description format</strong> shines. When I worked on the OpenZoom description format, I obviously followed the <a href="http://www.python.org/dev/peps/pep-0020/">Python Zen</a> which states <q>Explicit is better than implicit.</q> Although one drawback is the verbosity of the format, there are many advantages we can get from it. For example, when I worked on the <a href="http://openzoom.org/">OpenZoom framework</a>, I wanted to test it with some really large multiscale images that are out there. Well, what is the largest image out there that I know of? A map of the world, of course. The <a href="http://openstreetmap.org/">OpenStreetMap Project</a>, for example, features many, many gigapixels of image data. Fine, so how do I test the framework with a map? <a href="http://modestmaps.mapstraction.com/trac/browser/trunk/as2/lib/com/modestmaps/mapproviders/OpenStreetMapProvider.as?rev=192">Hard-code the URLs</a> somewhere? <em>No, no</em>. Let's create a descriptor for it. <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/openstreetmap.xml">So I did</a>. <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/openstreetmap.xml">Grab it</a> and play with it with your copy of the <a href="http://code.google.com/p/open-zoom/">OpenZoom framework</a>. <em>Look Ma', no code!</em>

This example demonstrates one of the advantages of the format, namely your descriptor file does not have to be stored along with your image data. Just put your descriptor wherever you wish and point it to the image tiles.

<h2>Features: OpenZoom Description Format</h2>
The following section gives you a short summary of some of the features in the OpenZoom description format.

<strong>Flexible Pyramid Layout</strong>
Behind both Zoomify and Deep Zoom, there are well-specified algorithms that create the image pyramid and define its properties. To get an idea of how the formats expand the information you previously saw in their descriptors, feel free to take a look at their implementation in <a href="http://open-zoom.googlecode.com/">OpenZoom</a>: <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/zoomify/ZoomifyDescriptor.as">ZoomifyDescriptor</a> and <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/deepzoom/DZIDescriptor.as">DZIDescriptor</a>.

The OpenZoom description format doesn't require a particular layout of the image pyramid. One requirement would be that every level of the pyramid approximately has the same aspect ratio but I've even managed to work around that constraint. To give you an idea of how powerful this flexibility is, consider the following couple of facts:
<ol>
<li>The OpenZoom description format can express both, the properties of a Deep Zoom image pyramid, as well as the one produced by Zoomify. Besides these, it supports the pyramids of <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/openstreetmap.xml">OpenStreetMap</a>, Google Maps (<a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/google-maps-road.xml">road</a>, <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/google-maps-terrain.xml">terrain</a> and <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/google-maps-satellite.xml">satellite</a>) and many more.</li>
<li>Just like in Deep Zoom, you can specify <strong>tile overlap</strong><sup><a href="#footnote-5">5</a></sup> in the OpenZoom description format.</li>
<li>Unlike Deep Zoom or Zoomify, the OpenZoom description format also supports non-square image tiles by exposing a <strong>tileWidth</strong> as well as a <strong>tileHeight</strong> property. Deep Zoom and Zoomify obviously don't have to support this as they know that their algorithms don't produce non-square tiles. The OpenZoom format however, has to accomodate legacy multiscale image data that has non-square tiles.
<li>One thing that surprised me most is the fact that even images on Flickr which are stored in many different dimensions can be put into relationship of an image pyramid. The levels of a <a href="/examples/2008/12/08/flex-multiscaleimage-component/source/source/images/flickr.xml">Flickr image pyramid</a> are quite irregular compared to Deep Zoom and Zoomify as they are bounded by maximum sidelengths of <em>100, 240, 500, 1024</em> and <em>original</em>. Even though it isn't very efficient since Flickr doesn't support tiles, images from Flickr can be rendered as multiscale images inside <a href="http://openzoom.org/">OpenZoom</a>.</li>
</ol>

<strong>Important Note:</strong> <em>Deep Zoom features a powerful concept called <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx#Sparse_Images">Sparse Images</a> not present in any other format known to me. <strike>However, I am considering to incorporate this feature into the OpenZoom description format at a later date.</strike></em>

<strong>Powerful Addressing Scheme</strong>
The description format again makes minimal assumptions about the location of the image tiles. Only the following two conditions have to be met: Tiles have to be addressable by their <em>column</em> and <em>row</em> in a <a href="http://en.wikipedia.org/wiki/Cartesian_coordinate_system">cartesian or rectangular coordinate system</a>. The client then simply applies string substitution to the reserved tokens <strong>{row}</strong> and <strong>{column}</strong> and replaces them with coordinates that have a range of <strong>[0, numRows)</strong> or <strong>[0, numColumns)</strong> respectively. The upper bounds <strong>numRows</strong> and <strong>numColumns</strong> are specified on the corresponding <strong>level</strong> element.

Important to note is that unlike Zoomify which only seems to support JPEG tiles anyway and Deep Zoom where the extension is specified in the descriptor, the OpenZoom description format makes no assumptions about the file extension of the tiles whatsoever. In the days where server-side scripts with a extensions like <em>.php</em> or <em>.cfm</em> serve us images, it would be negligent to rely on the file type extension. For the client to decide if it can render the images that are being served, the format features a <strong>type</strong> property on the <strong>pyramid</strong> element that specifies the mime type of the tiles.

<strong>Exceptions:</strong> <em>Obviously, no matter how powerful a design is, there are always things it can't handle. For the OpenZoom description format this means sources such as <a href="http://maps.live.com/">Microsoft's Virtual Earth</a> or the <a href="http://gigapan.org/">GigaPan</a> project which both feature a <a href="http://de.wikipedia.org/wiki/Quadtree">quadtree</a>-based addressing scheme. That the OpenZoom description format cannot describe these kinds of sources doesn't mean the OpenZoom framework can't render them. However, doing that involves some amount of code which in the case of OpenZoom would mean to implement the <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/IMultiScaleImageDescriptor.as">IMultiScaleImageDescriptor</a> interface. For Silverlight Deep Zoom that would be the abstract <a href="http://msdn.microsoft.com/en-us/library/system.windows.media.multiscaletilesource(VS.95).aspx">MultiScaleTileSource</a> class.</em>

<strong>Support for Multiple URLs</strong>
As you may know, most current browsers are <a href="http://www.openajax.org/runtime/wiki/The_Two_HTTP_Connection_Limit_Issue">limited to 2 concurrent requests per domain</a>. Therefore, the OpenZoom description format has support for defining multiple URLs for the same data. A client which supports the format is then able to concurrently fetch more than 2 image tiles at the same time. This technique is applied by most large map providers such as Google Maps and Microsoft Virtual Earth.

<strong>Example</strong>
<pre lang="xml">
&hellip;
<level index="11" width="524288" height="524288" columns="2048" rows="2048">
  <uri template="http://t0.foo.com/11/{column}/{row}.png"/>
  <uri template="http://t1.foo.com/11/{column}/{row}.png"/>
  <uri template="http://t2.foo.com/11/{column}/{row}.png"/>
  <uri template="http://t3.foo.com/11/{column}/{row}.png"/>
</level>
&hellip;
</pre>

<br/>
<strong>Ease of Implementation</strong>
Since the OpenZoom description format is very explicit (and therefore verbose), implementing a client to read it is very, very simple. Unlike Deep Zoom and Zoomify where the client has to do a considerable amount of work to compute the properties of the image pyramid, with the OpenZoom description format this work basically boils down to mapping the properties of the descriptor into the internal representation of a multiscale image description.

In my opinion, the single biggest advantage of the OpenZoom description format is that a client that can read the format does not need to understand the algorithms that created the image pyramids which the format itself describes. This way we can totally decouple the producer of an image pyramid from its ultimate client.

If you are interested in getting an idea of how all of this works, I suggest you take a look at the following classes in the <a href="http://code.google.com/p/open-zoom/">OpenZoom source code repository</a>: <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/zoomify/ZoomifyDescriptor.as">ZoomifyDescriptor</a>, <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/deepzoom/DZIDescriptor.as">DZIDescriptor</a> and <a href="http://code.google.com/p/open-zoom/source/browse/trunk/src/main/flash/org/openzoom/flash/descriptors/openzoom/OpenZoomDescriptor.as">OpenZoomDescriptor</a>.

<h2>Conclusion</h2>
I hope this overview of the three multiscale image description formats gave you an idea on what problems each one of them is trying to solve and how well they succeed in doing that. When designing the <a href="http://openzoom.org/specs/">OpenZoom description format</a>, my intention was certainly not to create <em>yet another description format</em>. It simply tackles the issues of multiscale image formats from a different angle. Doing that, it turned out to be quite powerful in representing all kinds of multiscale images out there, including the two big ones: Deep Zoom and Zoomify. More importantly, the OpenZoom description format offers a way to describe a vast amount of all multiscale image out there under a single specification.

That being said, the <a href="http://openzoom.org/">OpenZoom framework</a> itself, which strives to be the most open, most flexible platform for multiscale images and Zoomable User Interfaces out there, obviously supports all of the formats discussed here equally well.

I hope you've enjoyed this <em>behind the scenes</em> of the OpenZoom description format. At some point, I will show you an idea I've been working that involves these multiscale image descriptors. Until then, have a look at the links in the <a href="#further-reading">Further Reading</a> section as there are some hidden gems.

<p class="footnote"><em>Disclaimer: All details of the OpenZoom description format are subject to change. Feature requests and opinions are welcome. As usual, feel free to leave a comment.</em></p>

<h3>Acknowledgement</h3>
At this point, I'd like to thank my buddy <a href="http://424f.com/blog/">Boris</a> who unbeknownst to him, through our many very valuable discussions, considerably shaped the current form of the <a href="http://openzoom.org/specs/">OpenZoom description format specification</a>. Believe me when I say that without him the format would have most certainly been <acronym title="Yet Another (Damn) Multiscale Image Description Format">YAMSIDF.</acronym>

<h3>Footnotes</h3>
<p class="footnote"><a name="footnote-1-3">[1 &amp; 3]</a> If you'd like to get some more background on this topic, I wrote an <a href="http://gasi.ch/blog/inside-deep-zoom-1/">introduction to multiscale imaging</a> and another article about the <a href="http://gasi.ch/blog/inside-deep-zoom-2/">mathematical properties of an image pyramid</a> using Microsoft's Deep Zoom as an example.</p>
<p class="footnote"><a name="footnote-2">[2]</a> From my own experience, I know that there are unfortunately still people out there who think that there is some magic going on behind multiscale imaging. To set this straight, if you've used any of the following, <a href="http://maps.google.com/">Google&nbsp;Maps</a>, <a href="http://maps.yahoo.com/">Yahoo&nbsp;Maps</a>, <a href="http://maps.live.com/">Microsoft Virtual&nbsp;Earth</a>, <a href="http://livelabs.com/blog/seadragon/silverlight-2-deep-zoom/">Silverlight Deep&nbsp;Zoom</a>, <a href="http://livelabs.com/seadragon-ajax/">Seadragon&nbsp;AJAX</a>, <a href="http://livelabs.com/seadragon-mobile/">Seadragon Mobile</a> or <a href="http://zoomify.com/">Zoomify</a>,<sup><a href="#footnote-4">4</a></sup> you should know that all of them basically work the same, namely with <em>off the shelf</em> JPEG or PNG image files. These files are stored either on disk or in a database. Once requested, they are sent to and rendered on the client which in the previous examples is either the browser, the Flash or Silverlight plugin or the iPhone.
But you might ask: <em>What about JPEG 2000?</em> Indeed, there are some possible candidates for image file formats out there which would bring better support for multiscale imaging in the future. Two of them being <a href="http://en.wikipedia.org/wiki/JPEG_2000">JPEG 2000</a> and <a href="http://en.wikipedia.org/wiki/HD_Photo">HD Photo</a>. We won't see significant adoption of the first anytime soon because of <a href="http://en.wikipedia.org/wiki/JPEG_2000#Legal_issues">legal issues</a> such as <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=36351">this one</a>. <a href="http://blogs.msdn.com/billcrow/archive/2006/11/17/introducing-hd-photo.aspx">HD&nbsp;Photo originated at Microsoft</a> and is being considered as successor to the JPEG standard dubbed JPEG XR. Again, widespread use won't happen overnight.</p>
<p class="footnote"><a name="footnote-4">[4]</a> <em>By the way, <a href="http://openzoom.org/">OpenZoom</a> supports most of these out of the box.</em></p>
<p class="footnote"><a name="footnote-5">[5]</a> In <a href="http://gasi.ch/blog/inside-deep-zoom-2/">Inside Deep Zoom 2</a> I've explained the concept of <em>tile overlap</em>.</p>

<h3><a name="further-reading">Further Reading</a></h3>
<ul>
        <li>Wikipedia: <a href="http://en.wikipedia.org/wiki/JPEG_2000">JPEG 2000</a></li>
        <li>Wikipedia: <a href="http://en.wikipedia.org/wiki/HD_Photo">HD Photo</a></li>
        <li><a href="http://blogs.msdn.com/billcrow/archive/2006/10/20/msu-evaluates-windows-media-photo-vs-jpeg-2000.aspx">HD Photo (formerly Windows Media Photo) vs JPEG 2000</a></li>
        <li><a href="http://blogs.msdn.com/billcrow/archive/2006/11/20/photosynth.aspx">Photosynth</a> <em>&mdash;<a href="http://twitter.com/billcrow/">Bill Crow</a> gives us an excellent behind the scenes of an early preview of Photosynth and how it leverages HD&nbsp;Photo.</em></li>
        <li>Microsoft MSDN: <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Deep Zoom File Format Overview</a></li>
        <li><a href="http://dragonosticism.wordpress.com/2008/12/11/deepzoomtoolsdll/">Dragonosticism: DeepZoomTools.dll</a> <em>&mdash; Develop your own tools for creating Deep Zoom images.</em></li>
        <li><a href="http://blog.kapilt.com/2008/11/30/sharing-large-images-openlayers-gsiv-modestmaps-deepzoom-and-python/">Viewing Large Images - OpenLayers, GSIV, ModestMaps, DeepZoom, and Python</a> <em>&mdash; Create Deep Zoom Images on Windows, Mac and Linux with <a href="http://www.python.org/">Python</a> and <a href="http://www.pythonware.com/products/pil/">PIL</a>.</em></li>
        <li><a href="http://8ninths.com/?p=487">Enter the Seadragon</a> <em>&mdash; Introduction to Seadragon and multiscale imaging.</em></li>
        <li><a href="http://www.iangilman.com/blog/2008/12/seadragon-on-your-iphone.php">Seadragon On Your iPhone</a> <em>&mdash; The story of Seadragon Mobile by Ian Gilman, one of the Seadragon team members.</em></li>
        <li><a href="http://blogs.msdn.com/lutzg/archive/2008/11/23/seadragon-ajax-and-deep-zoom.aspx">Seadragon AJAX &amp; Deep Zoom</a> <em>&mdash; Comparison of the two implementations by  Lutz Gerhard, a LiveLabs product manager.</em></li>
        <li><a href="http://www.zoomify.com/express.htm">Zoomifyer EZ</a> <em>&mdash; Create Zoomify images for free on your Mac and PC.</em></li>
        <li><a href="http://www.zoomify.com/photoshop.htm">Zoomify Photoshop</a> <em>&mdash; Create Zoomify images with <a href="http://www.adobe.com/products/photoshop/photoshop/">Adobe Photoshop</a>.</em></li>
</ul>