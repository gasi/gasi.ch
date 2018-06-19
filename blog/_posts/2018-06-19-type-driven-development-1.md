---
layout: post
title: 'Type-Driven Development: <br>Null — The Billion Dollar Mistake'
date: '2018-06-19 09:01:00 -0400'
---

## Problem

Your app has unexpected runtime errors due to `null` (or `undefined`.)

<!-- prettier-ignore-start -->
> ### Background
>
> [Tony Hoare] famously called `null` references his [Billion Dollar Mistake][infoq-tony-hoare-null]. In addition to `null`, in JavaScript we have `undefined` as in the dreaded
>
> ```
> 'undefined' is not a function
> ```
> {:.error}
<!-- prettier-ignore-end -->

PureScript doesn’t have runtime errors caused by `null` references. Let’s see why that is. But first, here’s a brief example of the problem in JavaScript:

<blockquote markdown="1">
### Code: JavaScript (broken)

When we try to `find` an element in an array that doesn’t exist we get `undefined` back. Accessing `numWorldCupTitles` on `undefined` (or `null`) throws a runtime error (line 15):

{% highlight javascript linenos %}
{% include include_listing filename="examples/type-driven-development-1/js/WorldCup1.js" %}
{% endhighlight %}

</blockquote>

Unfortunately, we won’t know that until we run that particular line of code, either manually or by writing a test first.

## Solution

What if we ditched `null` as a first-class language feature? That’s exactly what PureScript does.

<blockquote markdown="1">
### Code: PureScript (broken)

The following PureScript program does the exact same thing as the JavaScript above.

{% highlight haskell linenos start_line=9 %}
{% include include_listing filename="examples/type-driven-development-1/purescript/src/WorldCup1.purs.error" start=9 %}
{% endhighlight %}

Before we can run a PureScript program, it first gets checked by the compiler. The compiler will refuse to compile the program and return the following error:

<!-- prettier-ignore-start -->
```
Could not match type

  Record

with type

  Maybe
```
{:.error}
<!-- prettier-ignore-end -->

</blockquote>

Above, `Record`—think of it as `Object` in JavaScript—refers to one of our array entries. We tried to access `numWorldCupTitles` on `Record` but `Array.find` returned `Maybe Record` which doesn’t have such a field. The reason we get `Maybe Record` instead of `Record` is because under the hood, PureScript’s `Array.find` has the following type (slightly simplified):

```haskell
Array.find :: forall a. (a -> Boolean)
                     -> Array a
                     -> Maybe a
                     -- ^^^^^^^
```

We can ignore the beginning and just focus on the bit after the last arrow. That marks the function’s return type: `Maybe a`.

The equivalent in TypeScript would be:

<!-- prettier-ignore-start -->
```typescript
type find<A> = (predicate: (element: A) => boolean)
            => (array: Array<A>)
            => Maybe<A>;
            // ^^^^^^^^
```
<!-- prettier-ignore-end -->

### What is `Maybe`?

`Maybe` is a data type to describe whether a value is present or not. Here’s how it’s defined in PureScript:

```haskell
-- | The `Maybe` type is used to represent optional values and
-- | can be seen as something like a type-safe `null`, where
-- | `Nothing` is `null` and `Just x` is the non-null value `x`.
data Maybe a = Nothing | Just a
```

The `a` in `Maybe a` can refer to any type, e.g. a built-in `String`, `Boolean`, `Number` type, or your own custom `WorldCupTeam` type. If the syntax is unfamiliar to you, a very literal interpretation of the above in TypeScript would look as follows:

```typescript
type Maybe<A> = { type: "Nothing" } | { type: "Just"; value: A };
```

So what’s so special about `Maybe`? Well, nothing (no pun intended) really, except that it forces you to be explicit about which values are always required…

```haskell
name      :: String
birthYear :: Number
```

…versus ones that are optional:

```haskell
streetName   :: Maybe String
annualSalary :: Maybe Number
```

At the same time, the compiler will let you know if you didn’t handle both cases, `Just` and `Nothing`. In the example above, the fix would be the following.

<blockquote markdown="1">
### Code: PureScript (fixed)

By adding a `case` expression, we can independently handle `Just` and `Nothing`:

{% highlight haskell linenos start_line=20 %}
{% include include_listing filename="examples/type-driven-development-1/purescript/src/WorldCup2.purs" start=20 %}
{% endhighlight %}

If we get `Just switzerland`, we unpack the `switzerland` value (a `Record`) and print its `numWorldCupTitles` value. Otherwise, we print a fallback message.

</blockquote>

## Conclusion

Unhandled `null` and `undefined`s can cause unexpected runtime errors. By using a language with a sufficiently expressive type system, you can explicitly model the presence and absence of values and enforce handling of all cases while avoiding the problems of `null`.

---

If you’ve enjoyed this post, please [follow me][@gasi] on Twitter [@gasi] to learn when the next one is out.

---

### Notes

-   You may think: But doesn’t TypeScript alleviate this problem using [_strict null checks_][ts-strict-null-checks] (`--strictNullChecks` compiler option)? You’re right.

However, please keep in mind that this required the TypeScript team to update the compiler and if you were a [TypeScript 1.0] (released in April 2014) user, you would have had to wait almost two and a half years until [TypeScript 2.0] (released in September 2016) to leverage this. Due to its design, PureScript supported this basically from day one.

Future posts will have more examples of how a simple core language with a powerful type system allows PureScript developers to solve many issues themselves that require JavaScript or TypeScript developers to wait for their respective compiler—Babel or `tsc`—to support.

-   Have you noticed anything strange about the PureScript code listing above, besides the maybe unfamiliar syntax? It has no explicit type definitions. Odd for a post about the power of types, no? You’re right.

One of the many cool things about PureScript (and Haskell) is that it can fully infer all the types in your program. But since types are useful to see when sharing code with your coworkers (or yourself in three months from now), not writing type definitions on top-level definitions results in a compiler warning. Therefore, here’s the whole listing with types added and zero compile warnings:

<blockquote markdown="1">
### Code: PureScript (full listing)

Note the explicitly added type signatures for top-level definitions on lines 11, 13, and 26:

{% highlight haskell linenos %}
{% include include_listing filename="examples/type-driven-development-1/purescript/src/WorldCup3.purs" %}
{% endhighlight %}

</blockquote>

[@gasi]: https://twitter.com/gasi
[infoq-tony-hoare-null]: https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare
[tony hoare]: https://en.wikipedia.org/wiki/Tony_Hoare
[ts-strict-null-checks]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#null--and-undefined-aware-types
[typescript 1.0]: https://blogs.msdn.microsoft.com/typescript/2014/04/02/announcing-typescript-1-0/
[typescript 2.0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
