---
layout: post
title: 'OpenZoom Visualization: Z-Order'
---
This weekend I've been playing around with a couple of things related to the
OpenZoom project. The following is a small but beautiful example I wanted to
share with you: A visualization of the [Z-order (Morton-order)][z-order-wp]
curve in a zoomable environment using the OpenZoom framework. Behind the
scenes there are some real gems:
[Bit Twiddling Hacks][morton-order-source], [Mathematics][z-order-wp],
[Vectors in OpenZoom][zoomism]. Enjoy…

<blockquote class="info" markdown="1">

## Demo: Z-Order Visualization

<a href="/blog/examples/2009/01/04/z-order-visualization/" title="Z-Order Visualization">
    <img src="http://farm4.static.flickr.com/3261/3166780093_7b2d2eedf8.jpg" width="500" height="279" alt="Z-Order" />
</a>

[View Demo][example] \| [View Source][example-source] \| [View MortonOrder Class Source][morton-order-source]

</blockquote>

[z-order-wp]: http://en.wikipedia.org/wiki/Z-order_(curve)
[morton-order-source]: https://github.com/openzoom/sdk/blob/9cc5a61330be1448b8e2eb93645d2ca7d4e15dc4/src/org/openzoom/flash/utils/MortonOrder.as
[example]: /blog/examples/2009/01/04/z-order-visualization/
[example-source]: /blog/examples/2009/01/04/z-order-visualization/source/
[zoomism]: http://getsatisfaction.com/livelabs/topics/vector_graphics_in_seadragon_also_see_zoomism_com
