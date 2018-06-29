---
layout: post
title: 'PFP: Sorting Things Out'
---

{% include practical-functional-programming/intro.md part='Two' %}

<section markdown="1" class="problem">
## Problem

You add a new feature to your app and other parts break.

</section>

## Example

<blockquote markdown="1">
### Code: TypeScript (good)

We are building a World Cup app. The app needs to show a team leaderboard based on the number of titles they’ve won. We have an unsorted list of World Cup winners, so we write a function to sort the teams by `numWorldCupTitles` in descending order:

{% highlight typescript linenos start_line=1 %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2WorldCup1.ts" start=1 end=23 %}
{% endhighlight %}

Somewhere else in the app, we’d like to show the top team. Since we already have the teams sorted by title wins, we pick the first team from the list…

{% highlight typescript linenos start_line=26 %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2WorldCup1.ts" start=26 end=30 %}
{% endhighlight %}

…and get the correct result:

<!-- prettier-ignore-start -->
```
Top team: Brazil (5)
```
{:.correct}
<!-- prettier-ignore-end -->

</blockquote>

Later on, a section of our app needs to show the list of World Cup winners in alphabetical order:

<blockquote markdown="1">
### Code: TypeScript (bad)

We write a function to sort the teams by `country`:

{% highlight typescript linenos start_line=23 %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2WorldCup2.ts" start=23 end=26 %}
{% endhighlight %}

We pass the `teams` constant into `sortByCountry` and store it in `const teamsByCountry` next to the previously set `const teamsByTitles`:

{% highlight typescript linenos start_line=28 %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2WorldCup2.ts" start=28 end=30 %}
{% endhighlight %}

However, when we run the program right after adding the new code above, without making any other changes, our top team has changed and is wrong:

<!-- prettier-ignore-start -->
```
Top team: Argentina (2)
```
{:.incorrect}
<!-- prettier-ignore-end -->

</blockquote>

## Cause

Many operations in JavaScript mutate their arguments, among them `Array::sort`, `Object.assign`, `delete`, `Date::setDate`, etc. _Note: There are exceptions such as `Array::map`, `Array::filter`, `Math.abs`, `String::toLowerCase`, etc. (the last two because `Number` and `String` are immutable)_

In our case, we pass in `const teams` to both `sortByNumTitles` and `sortByCountry` which use `Array::sort` under the hood and therefore mutate `teams`, despite it being declared as `const`.

Ultimately, this means even when we only introduce new code without changing existing one, we can run into regressions due to side-effects of mutation.

<blockquote markdown="1">
## Background: `const`

In JavaScript, `const` declarations can be misleading because they only guarantee that they are never reassigned, not that their underlying data is left untouched:

{% highlight typescript %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2const.ts" %}
{% endhighlight %}

</blockquote>

## Solution

What if we eliminated mutation as a core mechanism in the language we use? What if there was no difference between immutable primitive types such as `string`, `number`, and `boolean` and mutable ones such as `Array`, `Object`, etc.?

That’s exactly what PureScript and most other functional programming languages do.

Let’s see what that looks like in practice:

<blockquote markdown="1">
### Code: PureScript (good)

We start out with the same functionality as the first TypeScript example:

{% highlight haskell linenos start_line=13 %}
{% include include_listing filename="examples/practical-functional-programming-2/purescript/src/PFP2WorldCup1.purs" start=13 end=39 %}
{% endhighlight %}

_Note: The PureScript’s `array !! index` translates to `array[index]` in JavaScript. Similarly to `Array.find` from Part One, it returns `Maybe a` to indicate that there is no result (`Nothing`) when we access an out of bounds index. That’s why we are reminded to handle both, the `Just a` and `Nothing`, cases._

Running the PureScript program above logs the expected result:

<!-- prettier-ignore-start -->
```
Top team: Brazil (5)
```
{:.correct}
<!-- prettier-ignore-end -->

</blockquote>

Next, we expand the program to create an alphabetical list of all World Cup winners just like we did with TypeScript.

<blockquote markdown="1">
### Code: PureScript (still good)

We add the function to sort teams alphabetically by country:

{% highlight haskell linenos start_line=31 %}
{% include include_listing filename="examples/practical-functional-programming-2/purescript/src/PFP2WorldCup2.purs" start=31 end=33 %}
{% endhighlight %}

Then we introduce the `teamsByCountry` constant:

{% highlight haskell linenos start_line=37 %}
{% include include_listing filename="examples/practical-functional-programming-2/purescript/src/PFP2WorldCup2.purs" start=37 end=38 %}
{% endhighlight %}

We run the program and still get the expected result as `teams` was not mutated by `Array.sortBy`:

<!-- prettier-ignore-start -->
```
Top team: Brazil (5)
```
{:.success}
<!-- prettier-ignore-end -->

</blockquote>

<section markdown="1" class="conclusion">
## Conclusion

Abandon the distinction between values and references and treat everything as immutable values.

Embracing a functional programming language such as PureScript will automatically guide you to [The Pit of Success], where every value is immutable by default and functions return immutable data.

This means adding new code or changing existing one will not introduce regressions caused by mutation related side-effects.

</section>

---

{% include practical-functional-programming/call-to-action.md %}

---

### Notes

-   In JavaScript and TypeScript, we can prevent the error above by first manually creating a shallow copy of the input array using `Array::slice` before calling `Array::sort` on it, but this takes some experience and diligence to do every time:

<blockquote markdown="1">
### Code: TypeScript (fixed)

{% highlight typescript linenos start_line=17 %}
{% include include_listing filename="examples/practical-functional-programming-2/ts/PFP2WorldCup3.ts" start=17 end=31 %}
{% endhighlight %}

With this change, the correct result is logged:

<!-- prettier-ignore-start -->
```
Top team: Brazil (5)
```
{:.success}
<!-- prettier-ignore-end -->

</blockquote>

-   An amazing side-effect (no pun intended) of treating everything as value is that PureScript avoids some famous [JavaScript _Wat_ moments][wat]:

<blockquote markdown="1">
### Code: JavaScript

Due to the difference between value types (`string`, `number`, `boolean`, etc.) and reference types (`Array`, `Object`, etc.), equality in JavaScript is not always intuitive:

```javascript
$ node

// Equality works as expected…
> 1 === 1
true

> true === true
true

> "hello" === "hello"
true

// …until it doesn’t:
> [] === []
false

> [1, 2] === [1, 2]
false

> {} === {}
false

> {a: "b"} === {a: "b"}
false
```

</blockquote>

<blockquote markdown="1">
### Code: PureScript 0.12

PureScript, treating all types as values, makes equality intuitive.

_Note: PureScript doesn’t implicitly coerce types and therefore only needs a single equality operator, namely `==`._

```haskell
$ pulp repl

> 1 == 1
true

> true == true
true

> "hello" == "hello"
true

> [] == [] :: Array Number
true

> [1, 2] == [1, 2]
true

> {} == {}
true

> {a: "b"} == {a: "b"}
true
```

</blockquote>

[the pit of success]: https://blog.codinghorror.com/falling-into-the-pit-of-success/
[wat]: https://www.destroyallsoftware.com/talks/wat
