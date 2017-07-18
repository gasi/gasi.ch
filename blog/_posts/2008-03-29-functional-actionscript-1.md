---
layout: post
title: 'Functional ActionScript &ndash; Part I'
---
One of the things I love about studying Computer Science is all the different languages &amp; concepts I am being exposed to. When I started this blog, one of my goals was to present these concepts to people who maybe haven't yet come across them. In the following series of posts, I will give you a sneak peek into one of these concepts, called <a href="http://en.wikipedia.org/wiki/Functional_programming">Functional Programming</a> and how it can make your life as ActionScript programmer easier.

The inspiration for this series comes from two sources, namely&hellip;
<ol>
       <li><a href="http://www.rubenswieringa.com/blog/arraytool">An old blog post</a> by <a href="http://www.rubenswieringa.com/">Ruben Swieringa</a></li>
    <li>The course <a href="http://www.infsec.ethz.ch/education/ss08/fmfp">Formal Methods &amp; Functional Programming</a></li>
</ol>


<h2>Retrospective</h2>
Back in time, <a href="http://www.rubenswieringa.com/">Ruben</a> wrote a utility function that&hellip;
<q>&hellip;lets you increase/decrease/multiply/divide<br/> all values of an Array all at once.</q>

This idea behind it shows a great deal of understanding from Ruben. I assume that he recognized he was writing the same code over and over again (a violation of the <acronym title="Don't Repeat Yourself">DRY</acronym> principle.) Namely, code to apply a certain operation to the elements of an <code>Array</code>. So he did the right thing and extracted this code into a separate class and released it under the name <code><a href="http://www.rubenswieringa.com/code/as3/flex/ArrayTool/source/">ArrayTool</a></code>.

Feel free to take look at <a href="http://www.rubenswieringa.com/code/as3/flex/ArrayTool/source/">Ruben's code</a>. Later, I will show you how to take his good idea, take it even one step further and how all of this relates to Functional Programming.

<h2>Functions Are Your Friends</h2>
This semester, I am taking a course called <a href="http://www.infsec.ethz.ch/education/ss08/fmfp">Formal Methods &amp; Functional Programming</a>. As part of the course we are learning a programming language called <a href="http://haskell.org/">Haskell</a>. Haskell belongs to the family of <a href="http://en.wikipedia.org/wiki/Functional_programming">functional programming languages</a>. Besides the fact that it has no assignments in the traditional sense and everything revolves around lists and functions, there's even more to find out in this very enlightening <a href="http://haskell.org/haskellwiki/Introduction">introduction to Haskell</a>.

Now I will show you what concepts we can take from Haskell (or any other functional programming language for that matter) and apply them in ActionScript. Strange enough, many people are not aware that ActionScript allows us to program in a functionial way to a certain extent. We can do that because functions are first-class citizens in ActionScript and you will see what this means at the end of this article.

<h2>Step 1</h2>
Alright, let us begin with a small example which is probably familiar to most of us&hellip;

<blockquote class="info">
<h2>Example: Operations on an Array</h2>
<h3>Code Example 1</h3>
Something like this&hellip;
<pre lang="actionscript" line="1">
  var list : Array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

  for( var i : int = 0; i < list.length; i++ )
  {
      list[ i ] = list[ i ] * 2
  }

  // list = [ 2,4,6,8,10,12,14,16,18 ]
</pre>
&hellip;I'd say, is the classical way to double all elements of an <code>Array</code>&hellip;
<pre lang="actionscript" line="9">
  for( i = 0; i < list.length; i++ )
  {
      list[ i ] = list[ i ] * 3
  }

  // list = [ 3,6,9,12,15,18,21,24,27 ]
</pre>
&hellip;and that is the classical way to triple all elements of an <code>Array</code>.

<h3>Code Example 2</h3>
Taking the functional approach, the above would look more like this&hellip;
<pre lang="actionscript" line="1">
var list : Array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

list = list.map(
   function( x : int, index : int, array : Array ) : int
   {
      return x * 2
   }
  )

  // list = [ 2,4,6,8,10,12,14,16,18 ]
</pre>
&hellip;or this&hellip;
<pre lang="actionscript" line="11">
list = list.map( triple )

function triple( x : int, index : int, array : Array ) : int
{
  return x * 3
}
  // list = [ 3,6,9,12,15,18,21,24,27 ]
</pre>
</blockquote>

<h2>Step 1: Discussion</h2>
Let us compare these two ways of doing things:
First, what has stayed the same in both examples?
The operation we apply to an element of the <code>Array</code> is defined in almost the same way in both approaches:

<ul>
    <li><em>Code&nbsp;Example&nbsp;1</em>, line 5 vs. <em>Code&nbsp;Example&nbsp;2</em>, line 6</li>
    <li><em>Code&nbsp;Example&nbsp;1</em>, line 11 vs. <em>Code&nbsp;Example&nbsp;2</em>, line 15</li>
</ul>

However, what did we gain by the functional approach?
Well, we got rid of the loop that looked exactly the same in the first example (line 3 &amp; 9) &mdash; great! But what&#x27;s more important, I believe, is the greater expressiveness of the functional code. For instance, take the following code snippet:
<pre lang="actionscript">list.map( triple )</pre>
You can read it out loud and actually understand what it&#x27;s doing. This is a very powerful side-effect (no pun intended) of programming in a functional way. I couldn't say it better than the following quote which appears at the beginning of <a href="http://mitpress.mit.edu/sicp/full-text/book/book.html">Structure and Interpretation of Computer Programs</a>&hellip; <q>Programs should be written for people to read,<br/> and only incidentally for machines to execute.</q>

<p>&nbsp;</p>

<blockquote class="info">
<a name="map" />
<h2>Friend Number One: Map</h2>
With this example, I've just introduced you to our first friend from Functional Programming: <code>map</code>. The function <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#map()">Array.map</a></code> is the functional abstraction of the concept of a loop over an <code>Array</code> that modifies its elements. Give <code>map</code> a function and it will apply it to all the elements of an <code>Array</code>. In the next part of this series I will introduce you to even more friends by presenting a more systematic overview of ActionScripts functional <acronym title="Application Programming Interface">APIs</acronym>.
</blockquote >

<h2>Step 2</h2>
Alright, now we have abstracted the notion of applying an operation to all the elements of an <code>Array</code> with the <code>map</code> function. At the beginning, I told you that I will show you how we could take the idea behind Ruben&#x27;s <a href="http://www.rubenswieringa.com/code/as3/flex/ArrayTool/source/">ArrayTool</a> and take it to the next step. Well, this was the first step but the example above is still missing one thing which is a way to define the value we want the operation to work with.

Let&#x27;s take a look at that next.

<h3>Higher-Order Goodness</h3>

For instance, we would like to make the function <code>triple</code> from <em>Code&nbsp;Example&nbsp;2</em> more generic by allowing it to take any value as multiplier (and by changing its name to <code>multiplyBy</code> on the way there.)

Our first realization will be that we cannot add another argument to <code>multiplyBy</code>, e.g. like this&hellip;
<pre lang="actionscript">
function multiplyBy( x : int, index : int,
                 array : Array, multiplicator : Number ) : int
{
    return x * multiplicator
}
</pre>

&hellip;because <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#map()">Array.map</a></code> only takes functions as argument that have the following form:

<pre lang="actionscript">
function callback( item : *, index : int, array : Array) : void;
</pre>

The bad news is that, if we try nevertheless, Flash will complain&hellip;
<pre class="error">
ArgumentError: Error #1063: Argument count mismatch on Examples/$construct/multiplyBy(). Expected 4, got 3.
    at Array$/_map()
    at Array/http://adobe.com/AS3/2006/builtin::map()
    at &hellip;]
</pre>

&hellip;the good news is that there is a very elegant way (or in some sense, another friend) to solve our problem called <a href="http://en.wikipedia.org/wiki/Higher-order_function">Higher-Order Functions</a>.
Wikipedia says&hellip;

<blockquote class="info">
<a name="higher-order-functions" />
<h2>Higher-Order Functions</h2>
<p>In mathematics and computer science, higher-order functions or functionals are functions which do at least one of the following:</p>
<ul>
    <li>take one or more functions as an input</li>
    <li>output a function</li>
</ul>
</blockquote>

I suggest we have a look at the code first and discuss it afterwards&hellip;

<blockquote class="info">
<h2>Code Example 3</h2>
The following example shows a way to make our code from <em>Step&nbsp;1</em> even more generic&hellip;
<pre lang="actionscript" line="1">
var list : Array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

list = list.map( multiplyBy( 2 ) )
// list = [ 2,4,6,8,10,12,14,16,18 ]

list = list.map( multiplyBy( 3 ) )
// list = [ 3,6,9,12,15,18,21,24,27 ]

function multiplyBy( value : Number ) : Function
{
    return function( x : int, index : int,
                      array : Array ) : Number
    {
         return x * value
    }
}
</pre>
</blockquote>

<h2>Step 2: Discussion</h2>
What happened here? First, <code>multiplyBy</code> now only takes one argument, the value by which we want to multiply our elements (line 9). This is nice but not all that special. In my opinion, where it really get&#x27;s interesting is the return type of <code>multiplyBy</code>. It&#x27;s indeed a function and thus makes <code>multiplyBy</code> a higher-order function according to the second part of Wikipedia&#x27;s definition. If you look at it closely, you will see that <code>multiplyBy</code> now creates exactly the type of function in regards of arguments and return type that <code>Array.map</code> requires. Besides, on the way there, we used an elegant way to define the multiplier <code>value</code> from the outside by using it within the body of the returned function which we want to use for our operations.

The example above embodies the very idea I wanted to bring across in this first part on <em>Functional ActionScript</em>, namely the idea that we can use functions just like any other type and go beyond that by creating functions that return functions themselves (or take functions as arguments). By doing this we can write code that much better expresses its intent, and therefore is easier to understand and ultimately easier to maintain.

In the next part of this series you will see more mechanisms like <code>map</code> that are available to you within ActionScript, as well as some examples on how Functional Programming can make your life easier.
Stay tuned.

<h2>Epilogue</h2>
If you look at <em>Code&nbsp;Example&nbsp;3</em>, this is exactly what I meant by&hellip; <q>Functions are first-class citizens in ActionScript.</q> It&#x27;s true. ActionScript allows you to create functions, store them in a variable or pass them around like any other type such as <code>Number</code> or <code>Array</code>. Additionally, you can apply these functions in other places. I don&#x27;t know if you&#x27;ve realized it but event listeners in ActionScript 3 are functions that are passed around and executed with their own context. Such functions are called <a href="http://en.wikipedia.org/wiki/Closure_(computer_science)">closures</a> just as the function returned by <code>multiplyBy</code> is a closure with the argument <code>value</code> as its sole <a href="http://en.wikipedia.org/wiki/Free_variables_and_bound_variables">free variable</a>. Furthermore we can create functions that take functions as arguments and return functions themselves. I think this is really cool. And in fact, this is basically what Functional Programming is all about and the reason why it&#x27;s called that way. Functional programming languages use functions as their main tool for building abstractions. If you learn more about it, you will see how powerful and how mind-boggling this concept can be at times. Enjoy.

<h3>Further Reading</h3>
<ul>
    <li><a href="http://haskell.org/">Haskell</a></li>
    <li>Wikipedia: <a href="http://en.wikipedia.org/wiki/Functional_programming">Functional Programming</a></li>
    <li>Joel on Software: <a href="http://www.joelonsoftware.com/items/2006/08/01.html">Can Your Programming Language Do This?</a></li>
    <li>John Hughes: <a href="http://www.math.chalmers.se/~rjmh/Papers/whyfp.pdf">Why Functional Programming Matters (PDF)</a></li>
<ul>
