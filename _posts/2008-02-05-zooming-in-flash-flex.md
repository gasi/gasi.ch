---
layout: post
title: 'Zooming <br/>in Flash & Flex'
---
Have you ever tried to implement zooming that works like <a href="http://maps.google.com/?ie=UTF8&amp;ll=47.365688,8.502731&amp;spn=0.097201,0.240669&amp;z=13&amp;om=0" title="Google Maps">Google Maps</a> where you can use your mouse wheel to zoom to a particular point on the map?

Well, I did and it took me quite some time to get zooming to work like that. Typically, in Flash or Flex, if you scale an object it uses the upper left corner as reference point and this can lead to akward results like the ones in the following example:

<blockquote class="info">
<h2>Example: Zooming Broken</h2>
To zoom, use your mouse wheel or the arrow keys on your Keyboard, especially if you&#x27;re on a Mac where Flash Player is (still) missing mouse wheel support.
To rotate the object, press and hold the <code>Alt</code> key while scrolling.
Panning works with drag and drop or, again, with the arrow keys on your keyboard.

<a href="/blog/examples/2008/02/05/zooming-broken/"><img src="/blog/examples/2008/02/05/zooming-broken/zooming-broken.png" width="460" height="320" alt="Example: Zooming Broken" title="alt="Example: Zooming Broken""></a>

<a href="/blog/examples/2008/02/05/zooming-broken/">View Example</a>
</blockquote>

Basically, any transformation that you apply to a <code>DisplayObject</code> has its origin at the object&#x27;s registration point. The registration point of an object is typically the upper left corner and cannot be changed directly in ActionScript.

While working on <a href="http://tandem.gasi.ch" title="tandem">tandem</a>, I tried to implement the behavior that normal mapping applications have where you can zoom to the coordinates your mouse points at by scrolling. Oh my, how long it took me. To work around the issue, I nested two <code>Sprites</code> and moved the inner object in such a way that the registration point of the outer one was at the coordinates of the mouse. This way to dynamically change the registration point was a hack at best.

However, the revelation came soon: zooming (or scaling) is a linear transformation. This means I can scale an object and readjust its position afterwards so that it appears as if it has never moved but rather scaled right from the origin I pointed at.

At this point I successfully wrote a function to scale from an arbitrary point on an object. This code was not too long, actually pretty sweet after all my previous, fruitless endeavours. But yesterday, after looking at the source code of <a href="http://www.cs.umd.edu/hcil/jazz/" title="Piccolo">Piccolo</a>, a powerful framework for building Zoomable User Interfaces (ZUI) in Java or C#, I came across an even more elegant solution:

<code><a href="http://java.sun.com/j2se/1.4.2/docs/api/java/awt/geom/AffineTransform.html" title="AffineTransform" alt="AffineTransform">AffineTransform</a></code> is the name of the class where the magic lies in Java.
<h2>What Are Affine Transformations?</h2>
Affine transformations are part of the mathematics of linear algebra. Simply put, they are a way to mathematically describe transformations such as scale, rotation, skew and translation. An interesting property of affine transformations is that they preserve the straightness of lines while transforming, so that parallel lines stay parallel.

I won&#x27;t go into deeper discussion of this topic at this point but if you have time, I recommend you to read the theory behind affine transformations and linear algebra in general. Before this enlightening experience I am about to share here, linear algebra and I were not very close. I took a linear algebra course in first semester computer science but unfortunately the professors never got around using 2D or 3D as basis for their examples which would have been great. They didn&#x27;t do it because it seemed that they only got excited about n-dimensional vector spaces where n &gt; 5. Too bad.

<h2>Affine Transformations &amp; Flash</h2>
When I made my discovery in the source code of Piccolo, I was about to port the Java <code>AffineTransform</code> class to ActionScript. Then I discovered that ActionScript had a similar class called <code>Matrix</code>.

Basically, any visible object in Flash has a transformation attached to it which can be accessed through a  property called <code>transform</code>. What you&#x27;ll get is a <code>Transform</code> object that gives you, through its <code>matrix</code> property, access to the transformation matrix of a <code>DisplayObject</code>.

Usually, we change the appearance of a <code>Sprite</code> or <code>MovieClip</code> (both inherit from <code>DisplayObject</code>) through properties such as <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code>, <code>scaleX</code>, <code>scaleY</code> or <code>rotation</code>. These properties can be seen as a high-level abstraction of the underlying transformation matrix of a <code>DisplayObject</code>.

Basically, if you need more low-level access, for example to implement zooming or rotating around a particular point, use the <code>Transform</code> and <code>Matrix</code> class.

Enough theory, let&#x27;s see how it&#x27;s done.


<blockquote class="info">
<h2>Example: Zooming Done Right</h2>

<a href="/blog/examples/2008/02/05/zooming/"><img src="/blog/examples/2008/02/05/zooming/zooming.png" width="460" height="320" alt="Example: Zooming"></a>

<a href="/blog/examples/2008/02/05/zooming/">View Example</a> | <a href="/blog/examples/2008/02/05/zooming/source/">View Source</a> | <a href="/blog/examples/2008/02/05/zooming/source/Zooming.zip">Download Source (ZIP, 5KB)</a>
</blockquote>


<blockquote class="info">
<h2>Code Walk-Trough</h2>
Let us go step by step through the code of the example class called <code>ZoomCanvas</code> that you&#x27;ll find in the <a href="/blog/examples/2008/02/05/zooming/source/" title="Example: Zooming Source Code">source</a> of the example above.

Let&#x27;s say you have an object you want to scale at a certain point.
First, you get its transformation <code>Matrix</code>:

<pre lang="actionscript" line="44">
   affineTransform = transform.matrix
</pre>


Then you move the object to the origin of the point you want to scale from:
<pre lang="actionscript" line="49">
   affineTransform.translate( -originX, -originY )
</pre>


After that, you are safe to scale the object:
<pre lang="actionscript" line="52">
   affineTransform.scale( scale, scale )
</pre>

Then, you simply move the object back to its original position:
<pre lang="actionscript" line="55">
   affineTransform.translate( originX, originY )
</pre>

In the end, you apply the new transformation to the object
<pre lang="actionscript" line="59">
   transform.matrix = affineTransform
</pre>
</blockquote>


Since I love clear and simple code, I was very pleased with the result.
From my observations this method for transforming an object seems at least as fast as the conventional way of doing it.

I hope this helps you as much as it did help me.

<h3>Further Reading</h3>
<ul>
    <li>Senocular.com: <a href="http://www.senocular.com/flash/tutorials/transformmatrix/" title="Understanding the Transformation Matrix in Flash">Understanding the Transformation Matrix in Flash</a></li>
    <li>ActionScript Documentation: <code><a href="http://livedocs.adobe.com/labs/flex3/langref/flash/geom/Matrix.html">Matrix</a></code> class</li>
    <li>Piccolo: <a href="http://www.cs.umd.edu/hcil/jazz/learn/graphics.shtml#transformations">Geometric Transformations</a></li>
    <li>Piccolo: <a href="http://www.cs.umd.edu/hcil/piccolo/download/index.shtml">Download Source</a></li>
    <li>Lawrence Kesteloot: <a href="http://www.teamten.com/lawrence/graphics/homogeneous/">Homogeneous Coordinates</a></li>
</ul>
