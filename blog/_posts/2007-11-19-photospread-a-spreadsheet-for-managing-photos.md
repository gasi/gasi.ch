---
layout: post
title: 'PhotoSpread: <br/>A Spreadsheet for Managing Photos'
---
As you may know, during daytime I study computer science at [ETH Zürich][].
Every Monday [our department][eth-cs] hosts the [Computer Science Colloquium][].

Normally these talks are held in the basement of our department’s building.
Today was different. The talk took place in the seldomly used *Audi Max*.
The reason? Today’s special guest was [Hector Garcia-Molina][] from [Stanford
University]. Last Saturday, Prof. Garcia received an honorary doctor from
ETH Zürich for his outstanding academic achievements and contributions to our
field.

The inspiring talk he gave today was:

<blockquote class="info" markdown="1">
## PhotoSpread: A Spreadsheet for Managing Photos

PhotoSpread is a spreadsheet system for organizing and analyzing photo
collections. It extends the current spreadsheet paradigm in two ways:

- PhotoSpread accommodates sets of objects (e.g., photos) annotated with tags
  (attribute-value pairs). Formulas can manipulate object sets and refer to tags.
- Photos can be reorganized (tags and location changed) by drag-and-drop
  operations on the spreadsheet.

The PhotoSpread design was driven by the needs of field biologists who have
large collections of annotated photos. In the talk I will describe the
PhotoSpread functionality and the design choices made. I will also describe
some of the other data management tools we have developed with field
biologists.

<img src="http://farm3.static.flickr.com/2093/2059596840_b343381859.jpg"
     title="PhotoSpread screenshot"
     alt=""
     height="283"
     width="500"/>

<del>Unfortunately I didn’t take any photos during the demo of the application.</del>
<ins>Added screenshot taken from the [original paper][paper].</ins>
</blockquote>

Basically, on the surface the tool looks like Microsoft Excel. On the left side,
PhotoSpread sports a grid with cells as you know it from Excel while at the right
hand side you can view the details of the cell that is currently selected within
the grid. The special thing about those cells is that you can put photos inside.
Actually, as Prof. Garcia noted, you could put any kind objects inside, but at this
point the tool focuses on the workflow with photos. Just as with most other modern
photo management tools one can attach metadata to these photos.


You may say, everyone knows Excel and most people are familiar with tools like
Picasa, Aperture or Lightroom.  What’s so special about PhotoSpread?
PhotoSpread stands out exactly in the way as it combines the concepts &
mechanisms of those two worlds. As I said, it is difficult to explain without
actually seeing it live but imagine you have some photos of people and import
them into the tool. All these photos can have arbitrary key-value pairs
attached to them. Let’s say we’ve tagged all those people with their age.
Now you can select a cell within PhotoSpread and enter a formula just as you
would in Excel. For example…

<blockquote markdown="1">
`average(B1[age])`
</blockquote>

…where B1 is the cell with the photos of your people. The tool would now
dynamically display the average age of those people in the cell where you
entered the formula. This is one of the more basic use cases and there are far
more interesting ones as Prof. Garcia showed us. For example if you drag a photo
into a cell with an existing formula then the tool, if possible, matches the
attributes in the newly added object to satisfy the formula or creates a union
with the objects already present in the cell.

In the context of scientists who are working in the field collecting lots and
lots of data such as photos, PhotoSpread really brings big improvements to the
workflow. Before, the field biologists Prof. Garcia and his team were working
with used a conventional photo management tool to handle the photos themselves
and additionally to that Excel to classify and analyze the data associated with
them.

If you want to find out more about the tool and the ideas behind it, I suggest
you take a look at the following paper by Prof. Garcia and his team:

<blockquote class="info" markdown="1">
## Paper

[PhotoSpread: A Spreadsheet for Managing Photos][paper]
</blockquote>


Interesting to note is also the technology this version of PhotoSpread was
built on. From what I saw and heard, the application is built with [Adobe Flex][]
running on top of the [Adobe AIR][] client, using its built-in database for
managing the photos. First I was flabbergasted by this fact because I am also
working on improving the workflow with photos with my work on [tandem][] which
also happens to be built with Flex.
Second, I am glad to have witnessed that the things I care about also have a
place in academia.

*Thank you, Prof. Garcia for this inspiring session.*

<blockquote class="info" markdown="1">
## Update: November 27, 2008
Enjoy this video of PhotoSpread in action:

<object width="500" height="400">
    <param name="movie" value="http://www.youtube.com/v/rf7rA-roBlM?fs=1&amp;hl=en_US&amp;rel=0"></param>
    <param name="allowFullScreen" value="true"></param>
    <param name="allowscriptaccess" value="always"></param>
    <embed
        src="http://www.youtube.com/v/rf7rA-roBlM?fs=1&amp;hl=en_US&amp;rel=0"
        type="application/x-shockwave-flash"
        allowscriptaccess="always"
        allowfullscreen="true"
        width="500"
        height="400">
    </embed>
</object>
</blockquote>


[ETH Zürich]: http://www.ethz.ch/
[eth-cs]: http://www.inf.ethz.ch/
[Computer Science Colloquium]: http://www.inf.ethz.ch/news/colloquium/

[Hector Garcia-Molina]: http://infolab.stanford.edu/people/hector.html
[Stanford University]: http://stanford.edu/
[paper]: http://dbpubs.stanford.edu/pub/showDoc.Fulltext?lang=en&amp;doc=2007-28&amp;format=pdf&amp;compression=&amp;name=2007-28.pdf

[Adobe Flex]: http://www.adobe.com/products/flex/
[Adobe AIR]: http://www.adobe.com/go/air
[tandem]: http://tandem.gasi.ch/2
