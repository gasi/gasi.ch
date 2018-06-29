---
layout: post
title: 'PFP: The Billion Dollar Mistake'
---

{% include practical-functional-programming/intro.md part='One' %}

To get warmed up, let’s talk about one of the classic problems of programming.

<section markdown="1" class="problem">
## Problem

Your app has unexpected runtime errors due to `null` (or `undefined`.)
</section>

<!-- prettier-ignore-start -->
> ### Background: History
>
> [Tony Hoare] famously called `null` references his [Billion Dollar Mistake][infoq-tony-hoare-null]. In addition to `null`, in JavaScript we have `undefined` as in the dreaded
>
> ```
> 'undefined' is not a function
> ```
> {:.error}
<!-- prettier-ignore-end -->

PureScript doesn’t have runtime errors caused by `null` references. Let’s see why that is.

## Example

<blockquote markdown="1">
### Code: JavaScript (broken)

When we try to `find` an element in an array that doesn’t exist we get `undefined` back. Accessing `numWorldCupTitles` on `undefined` (or `null`) throws a runtime error (line 15):

{% highlight javascript linenos %}
{% include include_listing filename="examples/practical-functional-programming-1/js/PFP1WorldCup1.js" %}
{% endhighlight %}

</blockquote>

Unfortunately, we won’t know that until we run that particular line of code, either manually or by writing a test first.

## Cause

Accessing properties on `null` or `undefined` throws a runtime error.

## Solution

What if we ditched `null` as a first-class language feature? Or never even introduce it in the first place? That’s exactly what PureScript does.

<blockquote markdown="1">
### Code: PureScript (broken)

This PureScript program is equivalent to the JavaScript above:

{% highlight haskell linenos start_line=9 %}
{% include include_listing filename="examples/practical-functional-programming-1/purescript/src/PFP1WorldCup1.purs.error" start=9 %}
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

The equivalent in TypeScript is:

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

The `a` parameter in `Maybe a` can refer to any type, e.g. a built-in `String`, `Boolean`, `Number` type, or your own custom `WorldCupTeam` type. If the syntax is unfamiliar to you, a very literal interpretation of the above in TypeScript is:

```typescript
type Maybe<A> = { type: "Nothing" } | { type: "Just"; value: A };
```

So what’s special about `Maybe`? Well, nothing (no pun intended) really, except that it forces you to be explicit about which values are always required…

```haskell
name      :: String
birthYear :: Number
```

…versus ones that are optional:

```haskell
streetName   :: Maybe String
annualSalary :: Maybe Number
```

Based on this, the compiler will let you know if you didn’t handle both cases, `Just` and `Nothing`. In the example above, we could fix it as follows:

<blockquote markdown="1">
### Code: PureScript (fixed)

By adding a `case` expression, we can independently handle `Just` and `Nothing`:

{% highlight haskell linenos start_line=20 %}
{% include include_listing filename="examples/practical-functional-programming-1/purescript/src/PFP1WorldCup2.purs" start=20 %}
{% endhighlight %}

If the value of `maybeSwitzerland` matches the pattern `Just switzerland`, we extract the `switzerland` value (a `Record`) and log its `numWorldCupTitles` value. Otherwise, we log an alternate message.

</blockquote>

<section markdown="1" class="conclusion">
## Conclusion

Unhandled `null`s and `undefined`s can cause unexpected runtime errors.

By adopting language with a sufficiently expressive type system such as PureScript, you can explicitly model the presence and absence of values and enforce handling of all cases while avoiding the problems of `null`.
</section>

---
{% include practical-functional-programming/call-to-action.md %}
---

### Notes

-   You may think: Doesn’t TypeScript alleviate this problem with [_strict null checks_][ts-strict-null-checks] (`--strictNullChecks` compiler option)? You’re right.

    However, please keep in mind that this required the TypeScript team to update the compiler and if you were a [TypeScript 1.0] (released in April 2014) user, you would have had to wait almost two and a half years until [TypeScript 2.0] (released in September 2016) to leverage this. Due to its design, PureScript supported this basically from day one.

    Future posts will have more examples—`async` / `await` among others—of how a simple core language with custom operators and a powerful type system allows PureScript developers to solve many issues themselves that require JavaScript or TypeScript developers to wait for their respective compiler—Babel or `tsc`—to support.

-   Have you noticed anything strange about the PureScript code listing above, besides the maybe unfamiliar syntax? It has no explicit type definitions. Odd for a post about the power of types, no? Indeed.

    One of the many cool things about PureScript (and Haskell) is that it can fully infer all the types in your program. But since types are useful to see when sharing code with your coworkers (or yourself in three months from now), not writing type definitions on top-level definitions results in a compiler warning. Therefore, here’s the whole listing with types added and zero compile warnings:

<blockquote markdown="1">
### Code: PureScript (full listing)

Note the explicitly added type signatures for top-level definitions on lines 11, 13, and 26:

{% highlight haskell linenos %}
{% include include_listing filename="examples/practical-functional-programming-1/purescript/src/PFP1WorldCup3.purs" %}
{% endhighlight %}

</blockquote>

---

_Thanks to Aseem, Boris, Gerd, Matt, Shaniece, and Stephanie for reading drafts of this._


[infoq-tony-hoare-null]: https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare
[tony hoare]: https://en.wikipedia.org/wiki/Tony_Hoare
[ts-strict-null-checks]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#null--and-undefined-aware-types
[typescript 1.0]: https://blogs.msdn.microsoft.com/typescript/2014/04/02/announcing-typescript-1-0/
[typescript 2.0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
