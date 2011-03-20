---
layout: post
title: 'PhotoSpread: <br/>A Spreadsheet for Managing Photos'
---
As you may know, during daytime I study computer science at <a href="http://www.ethz.ch/" title="ETH Z&uuml;rich">ETH Z&uuml;rich</a>. Every Monday our <a href="http://www.inf.ethz.ch/" title="Department of Computer Science">department</a> hosts the <a href="http://www.inf.ethz.ch/news/colloquium/" title="Computer Science Colloquium">&laquo;Computer Science Colloquium.&raquo;</a>

Normally these talks are held in the basement of our department&#x27;s building. Today was different. The talk took place in the seldomly used &laquo;Audi Max.&raquo; The reason? Today&#x27;s special guest was <a href="http://infolab.stanford.edu/people/hector.html" title="Hector Garcia-Molina">Hector Garcia-Molina</a> from Stanford University. Last Saturday, Prof. Garcia received an honorary doctor from ETH Z&uuml;rich for his outstanding academic achievements and contributions to our field.

The inspiring talk he gave today was titled

<h2>&laquo;PhotoSpread &mdash; A Spreadsheet for Managing Photos&raquo;</h2>

From the official description:
<blockquote class="info">&laquo;PhotoSpread is a spreadsheet system for organizing and analyzing photo
collections. It extends the current spreadsheet paradigm in two ways:
<ul>
    <li>PhotoSpread accommodates sets of objects (e.g., photos) annotated with tags (attribute-value pairs). Formulas can manipulate object sets and refer to tags.</li>
    <li>Photos can be reorganized (tags and location changed) by drag-and-drop operations on the spreadsheet.</li>
</ul>
The PhotoSpread design was driven by the needs of field biologists who have large collections of annotated photos. In the talk I will describe the PhotoSpread functionality and the design choices made. I will also describe some of the other data management tools we have developed with field biologists.&raquo;</blockquote>
<img src="http://farm3.static.flickr.com/2093/2059596840_b343381859.jpg" title="PhotoSpread Screenshot" alt="PhotoSpread Screenshot" height="283" width="500" />

Unfortunately I didn&#x27;t take any photos during the demo of the application. <strike>Therefore it probably doesn&#x27;t make much sense to go into too much detail here.</strike> <em>[Added screenshot taken from the <a href="http://dbpubs.stanford.edu/pub/showDoc.Fulltext?lang=en&amp;doc=2007-28&amp;format=pdf&amp;compression=&amp;name=2007-28.pdf">original paper</a>.]</em> Basically, on the surface the tool looks like Microsoft Excel. On the left side, PhotoSpread sports a grid with cells as you know it from Excel while at the right hand side you can view the details of the cell that is currently selected within the grid. The special thing about those cells is that you can put photos inside. Actually, as Prof. Garcia noted, you could put any kind objects inside, but at this point the tool focuses on the workflow with photos. Just as with most other modern photo management tools one can attach metadata to these photos.

You may say, everyone knows Excel and most people are familiar with tools like Picasa, Aperture or Lightroom.  What&#x27;s so special about PhotoSpread? PhotoSpread stands out exactly in the way as it combines the concepts &amp; mechanisms of those two worlds. As I said, it is difficult to explain without actually seeing it live but imagine you have some photos of people and import them into the tool. All these photos can have arbitrary key-value pairs attached to them. Let&#x27;s say we&#x27;ve tagged all those people with their age. Now you can select a cell within PhotoSpread and enter a formula just as you would in Excel. For example&hellip;
<blockquote>
<code>average(B1[age])</code>
</blockquote>
&hellip;where B1 is the cell with the photos of your people. The tool would now dynamically display the average age of those people in the cell where you entered the formula. This is one of the more basic use cases and there are far more interesting ones as Prof. Garcia showed us. For example if you drag a photo into a cell with an existing formula then the tool, if possible, matches the attributes in the newly added object to satisfy the formula or creates a union with the objects already present in the cell.

In the context of scientists who are working in the field collecting lots and lots of data such as photos, PhotoSpread really brings big improvements to the workflow. Before, the field biologists Prof. Garcia and his team were working with used a conventional photo management tool to handle the photos themselves and additionally to that Excel to classify and analyze the data associated with them.

If you want to find out more about the tool and the ideas behind it, I suggest you take a look at the following paper by Prof. Garcia and his team:
<p align="center"><a href="http://dbpubs.stanford.edu/pub/showDoc.Fulltext?lang=en&amp;doc=2007-28&amp;format=pdf&amp;compression=&amp;name=2007-28.pdf" title="PhotoSpread: A Spreadsheet for Managing Photos">PhotoSpread: A Spreadsheet for Managing Photos</a></p>


Interesting to note is also the technology this version of PhotoSpread was built on. From what I saw and heard, the application is built with <a href="http://www.adobe.com/products/flex/" title="Adobe Flex">Adobe Flex</a> running on top of the <a href="http://www.adobe.com/go/air" title="Adobe AIR">Adobe AIR</a> client, using its built-in database for managing the photos. First I was flabbergasted by this fact because I am also working on improving the workflow with photos with my work on <a href="http://gasi.ch/projects/tandem/" title="tandem">tandem</a> which also happens to be built with Flex. Second, I am glad to have witnessed that the things I care about also have a place in academia.
Thank you Prof. Garcia for this inspiring session&hellip;

<h3>Update (November 27, 2008)</h3>
Enjoy this video of PhotoSpread in action:

<object width="500" height="400"><param name="movie" value="http://www.youtube.com/v/rf7rA-roBlM&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/rf7rA-roBlM&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="400"></embed></object>