---
layout: post
title: 'Functional ActionScript &ndash; Part II'
---
Welcome to the second part of my series on <em>Functional ActionScript</em>. <a href="http://gasi.ch/blog/functional-actionscript-part-1/">Part&nbsp;I</a> was a brief introduction to some concepts of <a hef="http://en.wikipedia.org/wiki/Functional_programming">functional programming</a> in ActionScript. In this second part, I will present you some examples to ActionScript&#x27;s built-in functional APIs on <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html">Array</a></code>. However, first I would like to introduce you to a neat little trick that will save us some typing and make our code more clear.

<h2>Foreplay</h2>
If you take a look at the <a href="http://livedocs.adobe.com/flex/3/langref/Array.html">documentation</a> of the following methods that we will discuss later (<code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#every()">every</a></code>, <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#some()">some</a></code>, <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#filter()">filter</a></code>, <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#forEach()">forEach</a></code>, and <code><a href="http://livedocs.adobe.com/flex/3/langref/Array.html#map()">map</a></code>) you will notice that they all take a callback that, apart from the return type maybe, has a signature that looks like this:
{% highlight as %}
function callback(item:*, index:int, array:Array):*
{% endhighlight %}

<a name="wrap">
Being pragmatic, I rarely have use for the last two arguments, <code>index</code> and <code>array</code>. Therefore, I wrote myself a little wrapper function that looks like this:

{% highlight as %}
function wrap(f:Function):Function
{
    return(
      function(x:*, index:int, array:Array):*
      {
          return f(x)
      }
    )
}
{% endhighlight %}

Basically, it takes a simple function like:

{% highlight as %}
function even(x:int):Boolean
{
    return x % 2 == 0
}
{% endhighlight %}

&hellip;and returns a function which conforms to the callback signature shown above. Another great example for the power of <a href="http://gasi.ch/blog/functional-actionscript-part-1/#higher-order-functions">higher-order functions</a>.


<h2>The Party</h2>
After having been introduced to friend number one, namely <code>map</code>, in <a href="http://gasi.ch/blog/functional-actionscript-part-1/">Part&nbsp;I</a>, I suggest we get to know some new friends but first a small convention:

<blockquote class="info">
<h2>trace</h2>
I will use the following convention to denote trace output:
{% highlight as %}
//?
{% endhighlight %}
</blockquote>

<h2>Friend Number Two: every</h2>
If you want to check if all the elements of an <code>Array</code> satisfy a certain condition, just write a test function and drop it into <code>Array.every</code>.


<blockquote class="info">
<h2>Example: Everybody Even?</h2>
For example, let&#x27;s see if all integer in <code>list</code> are even:
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
{% endhighlight %}


First, we take the <code>even</code> function from above which takes an <code>int</code>, tests if it&#x27;s even and returns the corresponding <code>Boolean</code>:
{% highlight as %}
function even(x:int):Boolean
{
    return x % 2 == 0
}
{% endhighlight %}

Then, wrap <code>even</code> with <code>wrap</code> &mdash; <em>doh!</em> &mdash; drop it into <code>Array.every</code> and see what happens:
{% highlight as %}
list.every(wrap(even))

//? false
{% endhighlight %}
</blockquote>



<h2>Friend Number Three: some</h2>
<code>Array.some</code> works along the lines of <code>every</code> but returns true as soon as one of the elements passes the supplied test.

<blockquote class="info">
<h2>Example: Anybody Odd?</h2>
In the following example, we check if any (meaning: one or more) of the elements in <code>list</code> is odd:
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
{% endhighlight %}

Our test function:
{% highlight as %}
function odd(x:int):Boolean
{
    return !even(x)
}
{% endhighlight %}

The test:
{% highlight as %}
list.some(wrap(odd))

//? true
{% endhighlight %}
</blockquote>

<h2>Friend Number Four: filter</h2>
<code>Array.filter</code> is really handy. Pass it a test function and it returns you an <code>Array</code> with all the elements that passed the test.

<blockquote class="info">
<h2>Example: Who&#x27;s Even, Who&#x27;s Odd?</h2>
Get all even elements in <code>list</code>:
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    list.filter(wrap(even))

//? 2,4,6,8
{% endhighlight %}

&hellip;and all odd elements:
{% highlight as %}
    list.filter(wrap(odd))

//? 1,3,5,7,9
{% endhighlight %}
</blockquote>

<h2>Friend Number Five: forEach</h2>
<code>Array.forEach</code> is pretty much the same as <code>Array.map</code> with a subtle but important difference: <code>forEach</code> executes a function on each element in an <code>Array</code> but unlike <code>map</code> has not the purpose to modify the elements. Therefore <code>forEach</code> returns <code>void</code> and <code>map</code> returns an <code>Array</code>. This may or may not sound confusing. However, the following examples will make the difference clear&hellip;

<blockquote class="info">
<h2>Example: Hello</h2>
Let&#x27;s say <em>hello</em> to all elements in <code>list</code>:
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function sayHello(element:*,
                  index:int,
                  array:Array):void
{
    trace("Hello, Number", element)
}

list.forEach(sayHello)

//? Hello, Number 1
//? Hello, Number 2
//? Hello, Number 3
//? Hello, Number 4
//? Hello, Number 5
//? Hello, Number 6
//? Hello, Number 7
//? Hello, Number 8
//? Hello, Number 9
{% endhighlight %}

In this example I purposely didn&#x27;t use my carefully crafted <code>wrap</code> function from above to show you how ugly the callback function can end up (line 3&ndash;6).
</blockquote>


<h2>Old Friend: map</h2>
We&#x27;ve already met <code>map</code> in the <a href="http://gasi.ch/blog/functional-actionscript-part-1/#map">first part</a> on <em>Functional ActionScript</em> but I allow myself to introduce her here once again. <code>Array.map</code> takes a function, applies it to all elements in an <code>Array</code> and returns an <code>Array</code> with all modified elements.

<blockquote class="info">
<h2>Example: We&#x27;re Square</h2>
Square all elements in <code>list</code>:
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function square(x:Number):Number
{
    return x * x
}

list.map(wrap(square))

//? 1,4,9,16,25,36,49,64,81
{% endhighlight %}

&hellip;or take the square root of all elements:
{% highlight as %}
function squareRoot(x:int):Number
{
    return Math.sqrt(x)
}

list.map(wrap(squareRoot))

//? 1,1.4142135623730951,1.7320508075688772,2,
//? 2.23606797749979,2.449489742783178,
//? 2.6457513110645907,2.8284271247461903,3
{% endhighlight %}
</blockquote>

<h2>Friends Forever</h2>
When I&#x27;m talking about friends, I actually mean <em>friends</em>. Not only will the functions above be nice to you but they also get along very well with each other. Let&#x27;s see how&hellip;

<blockquote class="info">
<h2>Example: Rendez-Vous</h2>
Let&#x27;s look at this real-world scenario: If any of the elements in <code>list</code> is odd, you want to pick out the even elements, square them and then say hello to them. No sooner said than done:
<!-- line="1" -->
{% highlight as %}
var list:Array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

if(list.some(wrap(odd)))
{
    list.filter(wrap(even))
        .map(wrap(square))
        .forEach(sayHello)
}

//? Hello, Number 4
//? Hello, Number 16
//? Hello, Number 36
//? Hello, Number 64
{% endhighlight %}
Isn't the expressivess of this code just beautiful?

<em>Finding a more useless example is left as an exercise to the reader.</em>
</blockquote>

<h2>Doggy Bag (a.k.a Source Code)</h2>
Like what you saw? Have look at it, download it, and play with it!
<blockquote class="info">
<h2>Source</h2>
<a href="http://gasi.ch/examples/2008/03/31/functional-actionscript-part-2/source/">View Source</a> | <a href="http://gasi.ch/examples/2008/03/31/functional-actionscript-part-2/source/FunctionalActionScript2.zip">Download Source (ZIP, 3KB)</a>
</blockquote>

Thank you for your attention and stay tuned for Part III of <em>Functional ActionScript</em>&hellip;