---
layout: post
title: 'Inside Deep Zoom &ndash; <br/>Part II: Mathematical Analysis'
---
Welcome to part two of <em>Inside Deep Zoom</em>. In <a href="http://gasi.ch/blog/inside-deep-zoom-1/">part one</a>, I talked about the very basic ideas behind Deep Zoom and other multi-scale image technologies. Today, I&#x27;d like to continue in a more <em>hands-on</em> fashion and show you how to calculate the properties of the Deep Zoom image pyramid.

<h2>Anatomy of a Deep Zoom Image</h2>
When you convert one of your images, let&#x27;s say with <a href="http://www.microsoft.com/downloads/details.aspx?familyid=457b17b7-52bf-4bda-87a3-fa8a4673f8bf&displaylang=en">Deep Zoom Composer</a>, into a Deep Zoom image you get an output that looks something along the lines of this:

<img src="http://farm4.static.flickr.com/3210/2931554184_d43347540c.jpg" width="500" height="407" alt="bruges" />

In your output folder there&#x27;s a an XML file called the same as your source image and a folder with the same name and a <code>_files</code> suffix. The <em>image_files</em> folder contains the image data in different subfolders according to the levels of the image pyramid as the next screenshot illustrates:

<img src="http://farm4.static.flickr.com/3237/2931572244_141d79c2cc.jpg" width="500" height="429" alt="bruges" />

The key to understanding how Deep Zoom generates this file structure and determines the number of levels, the size of the levels etc., is the XML descriptor file in the top-level folder.

<h2>Deep Zoom Descriptor</h2>
Let&#x27;s work with this sample XML descriptor:

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;Image TileSize=&quot;256&quot; Overlap=&quot;1&quot; Format=&quot;png&quot;
 xmlns=&quot;http://schemas.microsoft.com/deepzoom/2008&quot;&gt;
&lt;Size Width=&quot;4224&quot; Height=&quot;3168&quot;/&gt;
&lt;/Image&gt;
</pre>

It is remarkably brief but I will show you how you can find out everything you need to know about the pyramid of your image. First, we can see that we have information about the <em>size of the tiles</em> that make up our image pyramid; <em>overlap</em> is something I will talk about later and then we obviously have the <em>original dimensions</em> of the image in the <code>&lt;Size&gt;</code> element.

Basically, the Deep Zoom image converter generates an image pyramid by taking the original image, dividing its dimensions by two in every step and slicing it into tiles until it reaches the lowest pyramid level with a size of 1x1 pixels.

<h2>Maximum Level</h2>
The first thing we would like to know about the image pyramid is what its <em>maximum level</em> is. As you may have seen in the folder structure of our sample Deep Zoom image, its maximum level is thirteen. The question is:
<q>How many times can we divide the original size of an image by two until we end up with an 1x1 pixel image?</q>

To answer this question we&#x27;ll use logarithms. For example, how many times do you have to divide sixteen by two until you get one? The answer is four which is exactly

<div align="center" style="margin-bottom: 10px;"><img src="http://www.codecogs.com/png.latex?\200dpi&space;\log_2{16}=4" alt="\200dpi \log_2{16}=4"/></div>

For determining the maximum level of a Deep Zoom image we can use the following formula

<div align="center" style="margin-bottom: 10px;"><img src="http://www.codecogs.com/png.latex?\200dpi&space;\lceil{\log_2{\max{\{width,&space;height\}}}}\rceil" alt="\200dpi \lceil{\log_2{\max{\{width, height\}}}}\rceil"/></div>

First, we take the longer side of our original image and calculate the logarithm to the base two. This answer will most likely be a real number because our original image will most probably not have a power-of-two dimension. Since we want to know how many times we have to divide until we get a dimension of 1x1 we round up the result.

<blockquote class="info">
<h2>Code: Maximum Level</h2>
This is the equivalent formula in code, in this case in ActionScript due to the nature of this blog, for determining the maximum level of a Deep Zoom image:

<pre lang="actionscript">
function getMaximumLevel( width : uint, height : uint ) : uint
{
  return Math.ceil( Math.log( Math.max( width, height ))/Math.LN2 )
}
</pre>

The division by <code>Math.LN2</code> comes from the fact that ActionScript&#x27;s built-in logarithm function does not allow us to specify the logarithm base. Therefore we can make use of the following identity
<div align="center"><img src="http://www.codecogs.com/png.latex?\large&space;\log_a{b}&space;=&space;\frac{\log{b}}{\log{a}}" alt="log_a{b} = \frac{\log{b}}{\log{a}}"/></div>
where <em>log</em> denotes the natural logarithm, accessible in ActionScript as <code>Math.log</code>.
</blockquote>

<h2>Pyramid Levels</h2>
Now that we know the maximum level of our image pyramid we can go ahead and calculate the properties of our image pyramid levels with a simple loop.

<blockquote class="info">
<h2>Code: Pyramid Levels</h2>
Since we already know how to compute the maximum level of a Deep Zoom image pyramid, we&#x27;ll go ahead and compute the dimensions of each level going from the largest to the lowest like so:
<pre lang="actionscript">
function computeLevels( width : uint, height : uint,
                         tileSize : uint ) : void
{
  var maxLevel : uint = getMaximumLevel( width, height )
  var columns : uint
  var rows : uint

  for( var level : int = maxLevel; level >= 0; level-- )
  {
    // compute number of rows & columns
    columns = Math.ceil( width / tileSize )
    rows = Math.ceil( height / tileSize )

    trace( "level " + level + " is " + width + " x " + height
           + " (" + columns + " columns, " + rows + " rows)" )

    // compute dimensions of next level
    width  = Math.ceil( width / 2 )
    height = Math.ceil( height / 2 )

    // for bit-shift fans =)
//  width  = ( width + 1 ) >> 1
//  height = ( height + 1 ) >> 1
  }
}
</pre>
</blockquote>

For our sample image we&#x27;ll get the following trace output&hellip;

<pre>
level 13 is 4224 x 3168 (17 columns, 13 rows)
level 12 is 2112 x 1584 (9 columns, 7 rows)
level 11 is 1056 x 792 (5 columns, 4 rows)
level 10 is 528 x 396 (3 columns, 2 rows)
level 9 is 264 x 198 (2 columns, 1 rows)
level 8 is 132 x 99 (1 columns, 1 rows)
level 7 is 66 x 50 (1 columns, 1 rows)
level 6 is 33 x 25 (1 columns, 1 rows)
level 5 is 17 x 13 (1 columns, 1 rows)
level 4 is 9 x 7 (1 columns, 1 rows)
level 3 is 5 x 4 (1 columns, 1 rows)
level 2 is 3 x 2 (1 columns, 1 rows)
level 1 is 2 x 1 (1 columns, 1 rows)
level 0 is 1 x 1 (1 columns, 1 rows)
</pre>

&hellip;which is identical to the output we get from the <code>ImageTool.exe</code> dump:

<img src="http://farm4.static.flickr.com/3190/2931817716_66211f0211_o.png" width="501" height="268" alt="bruges-dump" />

<code>ImageTool.exe</code> is a handy command line tool for creating Deep Zoom images and for finding out more about their structure. You find it in your Deep Zoom Composer installation folder among other tools such as <code>SparseImageTool.exe</code> for creating Deep Zoom collections.

<h2>Heavy Mathematics</h2>
In hindsight, calling all of this a <em>mathematical analysis</em> might be an overstatement, I agree. <em>Nonetheless, I can imagine many of you are here because the title looked so delicious in your RSS reader.</em> However, I remember well, when I first looked into multi-scale imaging in general and Deep Zoom in particular, having no prior exposure to concepts such as image pyramids and tile overlap, I was very puzzled when I saw the Deep Zoom composer output such as:

<img src="http://farm4.static.flickr.com/3237/2931572244_141d79c2cc.jpg" width="500" height="429" alt="bruges" />

I was asking myself: How are the levels computed? Why did the actual tile sizes (second column: <em>Abmessungen</em>) seemed to look so irregular? I knew I was not the only one when I found blog posts such as <a href="http://blogs.msdn.com/jaimer/archive/2008/03/31/a-deepzoom-primer-explained-and-coded.aspx">A deepzoom primer (explained and coded)</a> by <a href="http://blogs.msdn.com/jaimer/">Jaime Rodriguez</a>, a Microsoft blogger:
<q>A few of the docs I read said the tiles are 256x256, but from peeking through the files generated by the composer I am not convinced; I do know from reading through the internal stuff that there is some heavy math involved here, so I trust they tile for right size :).</q>

As you will realize, nothing in here involves <em>heavy math</em>. Nevertheless, it does take some time to put all the pieces together. The information I present you here are things I learned from playing around with Deep Zoom and wished to be around back then. Although there exists an official <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Microsoft Deep Zoom File Format Overview</a>, it does not nearly go into as much detail as you find here. Finally, as I couldn&#x27;t find this background information, I&#x27;ve decided to write it up in this series called <em>Inside Deep Zoom</em> and share it with people interested in finding out more about this technology.

<h2>258 x 25</h2>
Alright, so let&#x27;s find out what&#x27;s behind the seemingly weird numbers that are produced by Deep Zoom Composer. It&#x27;s actually very easy and has to do with something called <em>tile overlap:</em>

<img src="http://farm4.static.flickr.com/3025/2932771418_82ceddfa0b.jpg" width="500" height="375" alt="overlap" />

Have a look at the highlighted tile. The solid red outline is the actual tile at this position with a size that is defined in the XML descriptor. In our case this is 256 by 256 pixels. Now, what Deep Zoom Composer does is, it actually extends the dimensions of a single tile by adding some pixels of its neighboring tiles (dotted red outline.) How many pixels that is, is also defined in the XML descriptor as <code>Overlap</code> attribute of the <code>Image</code> element. By default, Deep Zoom Composer gives each tile an overlap of one pixel. If you use the command line tools <code>ImageTool.exe</code> or <code>SparseImageTool.exe</code>, both located in your Deep Zoom Composer installation folder, you can specify your own value for tile overlap  as something between zero and ten pixels.

One thing I&#x27;d like you to notice is the special role of tiles in the corner as well as on the edges. Whereas regular tiles have overlap on all four sides, corner tiles only have overlap on two sides and analogously edge tiles on three sides. This explains all the seemingly strange numbers that come up when you look at the dimensions of the tiles of a certain level.

As to the question of why Deep Zoom uses tile overlap, I cannot conclusively answer it, as I&#x27;ve never developed for Microsoft Silverlight and don&#x27;t know enough about its rendering engine. Having said that, one thing I&#x27;ve observed in Flash though is that when you reconstruct large images from much smaller image tiles, sometimes there are visible artifacts between the tiles which most probably stem from rounding errors in their positioning. This problem is greatly alleviated by using overlap between the tiles. Due to the similar nature of Flash &amp; Silverlight, I can imagine a similar motive behind using tile overlap in Deep Zoom.

<h2>Accessing &amp; Positioning Tiles</h2>
One of the last things I want to look at is how to access the right tiles&hellip;

<blockquote class="info">
<h2>Code: Accessing Tiles</h2>
Getting the URL for a given tile is pretty straightforward when we have the URL to a Deep Zoom descriptor XML:
<pre lang="actionscript">
function getTileURL( level : uint, column : uint,
                      row : uint ) : String
{
  // source:    Path to the Deep Zoom image descriptor XML
  // extension: Image format extension, e.g <Image &hellip; Format="png"/>
  return source.substring( 0, source.length - 4 ) + "_files/"
         + String( level ) + "/" + String( column ) + "_"
         + String( row ) + "." + extension
}
</pre>
</blockquote>

&hellip;and how to calculate their position within a certain pyramid level:

<blockquote class="info">
<h2>Code: Positioning Tiles</h2>
The following function calculates the position of a tile within a image pyramid level taking into account the tile size as well as the tile overlap:
<pre lang="actionscript">
function getTilePosition( column : uint, row : uint ) : Point
{
  var position : Point = new Point()

  // tileSize: Dimensions of tile, e.g <Image &hellip; TileSize="256"/>
  // tileOverlap: Overlap in pixels, e.g. <Image &hellip; Overlap="1"/>
  var offsetX : uint = ( column == 0 ) ? 0 : tileOverlap
  var offsetY : uint = ( row    == 0 ) ? 0 : tileOverlap

  position.x = ( column * tileSize ) - offsetX
  position.y = ( row    * tileSize ) - offsetY

  return position
}
</pre>
</blockquote>

<h2>Redundant?</h2>
Before finishing part two of <em>Inside Deep Zoom</em>, I&#x27;d like to talk about one more thing which does not really have to do with anything above but is nevertheless interesting, mathematical and perhaps even a little bit of a surprise.

Last time I introduced you to image pyramids, this time I showed you how Deep Zoom calculates &amp; structures its pyramid. By now, I hope you&#x27;ve come to appreciate the benefits the image pyramid provides us with for efficiently viewing high-resolution images. The question now is:
<q>How much more space does it really take to store an image pyramid compared to simply storing the original sized image?</q>

Although, again, the calculation is not very hard and is based on some simple principles, I was nevertheless surprised by its outcome. For the following calculation I will make some simplifying assumptions, such as taking out the impact of image compression and other factors on file size.

<blockquote class="info">
<h2>Calculation: Redundancy of an Image Pyramid</h2>
<h3>Single Image</h3>
If we assume that the file size of an image is solely given by the image dimensions (<em>w</em> for width &amp; <em>h</em> for height) we get the following result for a single image:

<img src="http://www.codecogs.com/png.latex?\large&space;filesize_{single}&space;=&space;w&space;\cdot&space;h&space;=&space;1&space;\cdot&space;1&space;=&space;1" alt="\large filesize_{single} = width \cdot height = 1 \cdot 1 = 1"/>

<h3>Image Pyramid</h3>
For a Deep Zoom image which is power-of-two based we get the following:
<img src="http://www.codecogs.com/png.latex?\large&space;\begin{align*}&space;filesize_{pyramid}&space;&=&space;w&space;\cdot&space;h&space;+&space;\frac{w}{2}&space;\cdot&space;\frac{h}{2}&space;+&space;\frac{w}{4}&space;\cdot&space;\frac{h}{4}&space;+&space;\cdots&space;\\&space;&=&space;1&space;\cdot&space;1&space;+&space;\frac{1}{2}&space;\cdot&space;\frac{1}{2}&space;+&space;\frac{1}{4}&space;\cdot&space;\frac{1}{4}&space;+&space;\cdots&space;\\&space;&\leq&space;\sum_{i=0}^{\infty}&space;(\frac{1}{2}&space;\cdot&space;\frac{1}{2})^i&space;=&space;\sum_{i=0}^{\infty}&space;(\frac{1}{4})^i&space;\\&space;&\leq&space;\frac{1}{1-\frac{1}{4}}&space;=&space;\frac{1}{\frac{3}{4}}&space;=&space;\frac{4}{3}&space;=&space;1.333&space;\hdots&space;\end{align}" alt="\large \begin{align} filesize_{pyramid} &= width \cdot height + \frac{w}{2} \cdot \frac{h}{2} + \frac{w}{4} \cdot \frac{h}{4} + \cdots \\ &= 1 \cdot 1 + \frac{1}{2} \cdot \frac{1}{2} + \frac{1}{4} \cdot \frac{1}{4} + \cdots \\ &\leq \sum_{i=0}^{\infty} (\frac{1}{2} \cdot \frac{1}{2})^i = \sum_{i=0}^{\infty} (\frac{1}{4})^i \\ &\leq \frac{1}{1-\frac{1}{4}} = \frac{1}{\frac{3}{4}} = \frac{4}{3} = 1.333 \hdots \end{align}"/>

To solve this equation I&#x27;ve used a <a href="http://en.wikipedia.org/wiki/Geometric_series">geometric series.</a>
</blockquote>

In my opinion quite surprising, is the fact that storing an image pyramid of base two only requires 33% more space than simply storing the original image.

<h2>Deeper and Deeper&hellip;</h2>
After a rather basic introduction to multi-scale imaging in <a href="http://gasi.ch/blog/inside-deep-zoom-1/">part one</a> of <em>Inside Deep Zoom</em>, I hope you gained more insight in this second part and got a better understanding on what&#x27;s going on behind the scenes. Be sure to come back for part three where I will wrap-up everything I talked about so far, show off some cool demos as well as give an outlook on where Deep Zoom &amp; Co. could take us.

<h3><a name="further-reading">Further Reading</a></h3>
<ul>
<li>Jaime Rodriguez:<a href="http://blogs.msdn.com/jaimer/archive/2008/03/31/a-deepzoom-primer-explained-and-coded.aspx">A Deep Zoom Primer (Explained and Coded)&hellip;</a></li>
<li>Microsoft: <a href="http://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx">Deep Zoom File Format Overview</a></li>
<li>Microsoft: <a href="http://msdn.microsoft.com/en-us/library/cc645050(VS.95).aspx">Deep Zoom</a></li>
<li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Geometric_series">Geometric Series</a></li>
<li>delicious: <a href="http://delicious.com/gasienica/deepzoom">Daniel Gasienica's bookmarks tagged Deep Zoom</a></li>
</ul>