---
layout: post
title: 'Functional ActionScript &ndash; Part III'
---
In <a href="http://gasi.ch/blog/functional-actionscript-part-1/">Part&nbsp;I</a> of <em>Functional ActionScript</em> I gave a short introduction to <a href="http://en.wikipedia.org/wiki/Functional_programming">functional programming</a> in ActionScript. Then, <a href="http://gasi.ch/blog/functional-actionscript-part-2/">Part&nbsp;II</a> discussed some functional <acronym title="Application Programming Interface">APIs</acronym> that ActionScript provides and gave an example for each one of them. This last part &mdash; Part&nbsp;III &mdash; of my series will be a little bit different. This time I would like to take the opportunity to share a small but fascinating example with you that will hopefully serve as an inspiration to look at functional programming more closely.

<h2>Functional vs. Imperative</h2>
Without going into much depth, I&#x27;d like to quickly discuss the main conceptual difference between <a href="http://en.wikipedia.org/wiki/Functional_programming">functional</a> and <a href="http://en.wikipedia.org/wiki/Imperative_programming">imperative programming</a> as it applies to the example in this article. In the course <a href="http://www.infsec.ethz.ch/education/ss08/fmfp">Formal Methods &amp; Functional Programming</a> we were taught that often times
<q>functional vs. imperative</q> is actually about <q>what vs. how</q>

Programming in an imperative way (i.e., in ActionScript, C, <a href="http://en.wikipedia.org/wiki/Eiffel_(programming_language)">Eiffel</a>, etc.) means that we&#x27;re telling the machine each step it has to take to get to the result. In that case, it&#x27;s all about <em>how</em> to do it to get there. On the other hand, if we program in a functional way, it&#x27;s more about the <em>what</em> to do rather than <em>how</em> to do it to get to the result. Please keep this in the back of your head as you continue reading.

<h2>Haskell</h2>
In summer 2007, just before finishing my first year as undergraduate at ETH, an assistant gave us a sneak peek at the courses in the second year of the Computer Science curriculum. I remember, when we looked at the course <a href="http://www.infsec.ethz.ch/education/ss08/fmfp">Formal Methods &amp; Functional Programming</a> he showed us the following example. I also remember that I was quite impressed.

<blockquote class="info">
<h2>Example: QuickSort</h2>
Here we go: <a href="http://en.wikipedia.org/wiki/Quicksort">QuickSort</a> in <a href="http://en.wikipedia.org/wiki/Haskell_(programming_language)">Haskell</a>&hellip;

<pre lang="haskell">
qsort :: Ord a => [a] -> [a]
qsort []     = []
qsort (x:xs) = qsort [y | y <- xs, y < x] ++ [x] ++ qsort [y | y <- xs, y >= x]
</pre>
&hellip;compared to QuickSort in <a href="http://en.wikipedia.org/wiki/C_(programming_language)">C</a>.

<pre lang="c">
void qsort(int a[], int lo, int hi) {
{
  int h, l, p, t;

  if (lo < hi) {
    l = lo;
    h = hi;
    p = a[hi];

    do {
      while ((l < h) && (a[l] <= p))
          l = l+1;
      while ((h > l) && (a[h] >= p))
          h = h-1;
      if (l < h) {
          t = a[l];
          a[l] = a[h];
          a[h] = t;
      }
    } while (l < h);

    t = a[l];
    a[l] = a[hi];
    a[hi] = t;

    qsort( a, lo, l-1 );
    qsort( a, l+1, hi );
  }
}
</pre>
</blockquote>

<h2>Walk-Trough</h2>
Let's look at these three lines that reveal us quite a bit about Haskell:
<pre lang="haskell" line="1">
qsort :: Ord a => [a] -> [a]
qsort []     = []
qsort (x:xs) = qsort [y | y <- xs, y < x] ++ [x] ++ qsort [y | y <- xs, y >= x]
</pre>

<em>Line 1:</em> This is the type declaration for the function <code>qsort</code>.
Haskell has a very sophisticated type system that goes beyond what we can observe here but this is interesting nonetheless.

First, since <code>qsort</code> a sorting algorithm it takes a list of <em>something</em> (where <code>a</code> is that <em>something</em> and the square brackets denote that it is a <em>list</em> of <em>something</em>) and again returns a list of that <em>something</em>. Compare this to ActionScript, for example. There you have to define explicit types such <code>Number</code>, <code>String</code>, etc. (if you want to take advantage of the <a href="http://en.wikipedia.org/wiki/Type_system#Static_typing">static type checking</a>) and therefore hypothetically have to write a separate sorting algorithm for each one of them, e.g. one that takes a list of <code>Number</code> and one that takes a list of <code>String</code>. Unlike ActionScript 3 (where it's optional), Haskell is statically typed. To avoid the mess of having to write a sorting routine for every type, Haskell takes advantage of <a href="http://en.wikipedia.org/wiki/Polymorphism_(computer_science#Parametric_polymorphism">parametric polymorphism</a>. All you need to tell Haskell, is that this <em>something</em> called <code>a</code> has a <a href="http://en.wikipedia.org/wiki/Total_order">total order</a>, meaning you can compare two instances of <code>a</code> and determine which one is greater than the other. This is done with the constraint: <code>Ord a =></code>

<em>Line 2:</em> Here we merely say that if <code>qsort</code> gets an empty list it will return an empty list. This elegant notion of handling different inputs by listing the cases specifically takes advantage of Haskell's <a href="http://www.haskell.org/tutorial/patterns.html">pattern matching</a> capabilities.

<em>Line 3:</em> This is the line where all the <em>magic</em> happens. This is such a great example for the expressiveness of functional programming that I hope I can convey its meaning as clearly as possible.

First, <code>qsort</code> is called with a non-empty list (since the empty list case is covered in <em>line&nbsp;2</em>) that is defined as <code>x:xs</code>. This notation basically means that the list is split into <code>x</code>, the first element of the list, called <em>head</em>, and <code>xs</code>, the rest of the list, called <em>tail</em>. Second, we select the head of the list <code>x</code> as <a href="http://en.wikipedia.org/wiki/Pivot_element">pivot</a>. Then we recursively call <code>qsort</code> with a new list that looks like this:

<pre lang="haskell">
[y | y <- xs, y < x]
</pre>

Read it as follows: <em>Take all <code>y</code>, where <code>y</code> is an element of <code>xs</code> (the tail or the rest of the list) and <code>y</code> is smaller (mathematically: less than) than the pivot <code>x</code>.</em>

Just look at this as QuickSort's <em>partitioning</em>. The code above actually could be rewritten like this:
<pre lang="haskell">
(filter (< x) xs)
</pre>

I prefer the former variant which is basically syntactic sugar and takes advantage of Haskell's <a href="http://en.wikipedia.org/wiki/List_comprehension">list comprehension</a> feature. Coming to think of it, my preference is probably influenced by my <a href="http://www.ethz.ch/">ETH</a> background where we were indoctrinated with <a href="http://en.wikipedia.org/wiki/Set-builder_notation">set theory</a>. <em>Chuckle.</em>

This was the hard part actually, as the rest works pretty much the same. We concatenate this left-hand side sub-list with the pivot&hellip;
<pre lang="haskell">
&hellip; ++ [x] ++ &hellip;
</pre>
&hellip;and then all the preceding with the right-hand side sub-list that is the sorted list of all elements that are greater or equal the pivot <code>x</code>:
<pre lang="haskell">
qsort [y | y <- xs, y >= x]
</pre>
&hellip;and we&#x27;re done.

<h2>Discussion</h2>
If you compare the functional Haskell and the imperative C version of QuickSort you can hopefully see what I was trying to bring across regarding to the concept of <em>what</em> vs. <em>how</em>. Besides this, I can&#x27;t think of anything to discuss at this point&hellip; well, maybe except for questions like <em>What about performance?</em> (which I hope to cover some time in the future) or <em>Is this even a real QuickSort?</em> (&hellip;if you ask <a href="http://en.wikipedia.org/wiki/C._A._R._Hoare">C. A. R. Hoare</a> the answer is probably <em>&laquo;No.&raquo;</em>)

It is important to note that this series (I dare not to say <em>life</em>) is not about <em>programming language X vs. programming language Y</em>. It&#x27;s about learning different concepts or rather different ways of thinking and apply the best of them in our daily endeavours as programmers. At this point I&#x27;d like to thank my buddy <a href="http://424f.com/blog/">Boris</a> (who&#x27;s busy working on his <a href="http://424f.com/blog/native-google-reader-app-on-your-iphone/">Google Reader App for the iPhone</a> as I am writing this) for the great discussions about software engineering &amp; programming languages that sometimes keep us both awake until 3am. This exchange pushes me to think <em>outside the box</em> every day. Thanks.
<em>And yes, Boris, I will hopefully pick up Python sometime&hellip;</em>

<h2>One More Thing&hellip;</h2>
What would this part of the series on <em>Functional ActionScript</em> be, if it wasn't even related to ActionScript and I didn't have the opportunity to show off a little bit?


<blockquote class="info">
<h2>Example: Functional QuickSort in ActionScript</h2>
Here we go:
<pre lang="actionscript">
function quickSort( list : Array ) : Array
{
  // non-recursive branch
  if( list.length == 0 )
  {
    // return the empty array if we can't split it more
    return []
  }
  else
  {
    // choose first element as pivot
    var pivot : Number = list[ 0 ]

    // slice of the pivot and keep them as rest
    var rest : Array = list.slice( 1 )

    return(
      // sort all numbers&hellip;
      quickSort(
        // &hellip;that are less or equal than pivot&hellip;
        rest.filter(
                wrap( lessOrEqualThan( pivot ) )
              )
           )
           // &hellip;concatenate them with the pivot&hellip;
           .concat(
                [ pivot ]
              )
           // &hellip;and concatenate all of the previous&hellip;
           .concat(
      // &hellip;with all sorted numbers&hellip;
      quickSort(
        // &hellip;that are greater than pivot.
        rest.filter(
                  wrap( greaterThan( pivot ) )
                )
           )
          )
      )
  }
}

function lessOrEqualThan( value : Number ) : Function
{
  return(
         function( x : Number ) : Boolean
         {
           return x <= value
         }
      )
}

function greaterThan( value : Number ) : Function
{
  return(
         function( x : Number ) : Boolean
         {
           return x > value
         }
      )
}
</pre>

<em>For the <a href="http://gasi.ch/blog/functional-actionscript-part-2/#wrap">definition of <code>wrap</code></a> check out <a href="http://gasi.ch/blog/functional-actionscript-part-2/#wrap">Functional ActionScript &ndash; Part II</a>.</em>
</blockquote>

The example above (and the fact that I wrote it in a few minutes) made me realize for the first time the potential of ActionScript which allows us to write programs in a functional way. The QuickSort code in ActionScript is pretty much the equivalent of the Haskell code at the beginning. You can walk through it with the Haskell <em>Walk-Trough</em> and the comments will hopefully help you in case you get stuck.

But does this actually work? Let&#x27;s see what happens when we take an unsorted list and run <code>quickSort</code> on it:
<pre lang="actionscript">
var unsortedList : Array = [ 23, 15, 16, 42, 8, 4 ]

quickSort( unsortedList )

//? 4,8,15,16,23,42
</pre>

<em>Tada!</em> Works like a charm. Enjoy.

<blockquote class="info">
<h2>Source</h2>
<a href="/examples/2008/04/02/functional-actionscript-part-3/source/">View Source</a> | <a href="/examples/2008/04/02/functional-actionscript-part-3/source/FunctionalActionScript3.zip">Download Source (ZIP, 3KB)</a>
</blockquote>

<h2>Epilogue</h2>
Like I said at the beginning, this was the last part of my series on <em>Functional ActionScript</em>. I hope you enjoyed reading it and learned something new here and there. I definitely did. If would like to learn more about functional programming, I suggest you to check out <a href="http://haskell.org">Haskell</a> or look at some of the links I put together in <em>Further Reading</em>. As I will learn more about all of this myself, I hope I will come back to this really fascinating topic sometime in the future. Stay tuned.

<h2>Further Reading</h2>
<ul>
    <li>Haskell.org: <a href="http://www.haskell.org/haskellwiki/Introduction">Introduction to Haskell</a></li>
    <li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Functional_programming">Functional Programming</a></li>
    <li>The Effect Generator: <a href="http://effectgenerator.com/blog/?p=6">ActionScript for Functional Programmers</a></li>
    <li>~eokyere: <a href="http://eokyere.blogspot.com/2007/09/higher-order-actionscript.html">higher order actionscript</a></li>
    <li>Iconara: <a href="http://blog.iconara.net/2008/03/30/separating-event-handling-from-event-filtering/">Separating event handling from event filtering</a></li>
    <li>Francis Cheng: <a href="http://blogs.adobe.com/fcheng/2008/01/proper_tail_calls_a_definition.html">Proper Tail Calls, a definition</a></li>
</ul>


<h3>References</h3>
<ul>
    <li>Wikipedia (German): <a href="http://de.wikipedia.org/wiki/Haskell_(Programmiersprache)#QuickSort">QuickSort Haskell Example</a></li>
    <li>Haskell.org: <a href="http://haskell.org/haskellwiki/Introduction#Quicksort_in_C">QuickSort C Example</a></li>
</ul>