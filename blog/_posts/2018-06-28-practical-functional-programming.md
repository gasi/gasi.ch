---
layout: post
title: 'Practical Functional Programming: Prelude'
index_title: 'PFP: Practical Functional Programming'
---

<section class="lede" markdown="1">
This series is a _practical_ guide to applying techniques from functional programming (FP) to:

-   Avoid common errors
-   Translate your designs into code using types
-   Construct software that can evolve

> ## tl;dr
>
> Want to jump straight in? These posts have been published so far:
>
> -   [PFP: The Billion Dollar Mistake][blog-tdd-1]
> -   [PFP: Sorting Things Out][blog-tdd-2]

</section>

## You

Are you a web developer using JavaScript—maybe even [TypeScript] or [Flow]—and feel like you still too often run into problems with…

-   …unexpected runtime errors?
-   …gnarly parts of code that become harder to maintain over time?
-   …new features breaking existing parts of your app?

Or: Have you grasped the basics of functional programming and are wondering how to apply that knowledge in real-world situations?

If you’ve answered _yes_ to any of these, keep on reading.

## Me

I am a developer with 10 years of experience writing software professionally and 20 years of doing it for fun.

In all those years, I’ve used many different programming languages. Out of all of them, functional programming languages broadened my perspective the most. Learning and using them made me a more skilled and confident developer.

## Journey

It was the Saturday after Thanksgiving in 2015. Ahead of me was a 31 hour train ride back home, from Santa Barbara, CA, to Seattle, WA, on the _Coast Starlight_. Once comfortable in my seat, I decided it was time to finally learn Haskell and discover what FP is all about. I’ve attempted it twice before: First in 2008 when I [was][blog-fas-1] [originally][blog-fas-2] [introduced][blog-fas-3] to Haskell in my _[Formal Methods and Functional Programming][eth-fmfp]_ class at ETH. The second time was in 2009, when I tried to write a [DeepZoom image tiler in Haskell][github-deepzoom.hs]. On neither occasion did it click for me. But I knew this time it would!

What did I do differently? I picked a project that was both real, unlike toy problems I’ve attempted in the past, and one I understood well — two big boosts for my motivation. My choice: [ZoomHub], a side project that a few friends from Microsoft and I started.

ZoomHub is a place to share and view high-resolution images. It provides a small REST API for developers to publish their own images. We wrote it in CoffeeScript on top of Node.js, a stack we were familiar with from our day jobs. After a while, life got in the way and my friends’ priorities changed. I still wanted to see the project through but it was hard to invest large chunks of my free time because I didn’t learn anything new technically. This is what made the project a suitable starting ground for learning Haskell.

What began on the train with a port of the REST API from Node.js to Haskell, using the novel [servant] library, reached its first milestone just a few months later when in April, 2016, I shipped the Haskell implementation of [ZoomHub] to production. Today, ZoomHub serves thousands of page views a month and I can sleep soundly as it rarely has any issues.

## Motivation

Learning functional programming has been a very rewarding journey. But I’d lie if I didn’t mention that the road was paved with frustration and late nights deciphering dense error messages. What kept me going was a strong belief that there must a more sustainable and enjoyable way to write large programs than imperative and object-oriented languages offered. While not a silver bullet by any means, I found a lot of good in functional programming.

But if all you know is that FP languages have weird syntax and use intimidating math terms, you might ask yourself: What’s the point of leaving behind what I’m comfortable with and going through the struggle of learning this new way of doing things? That’s what this series is about. Presenting short, but realistic, examples of the benefits you gain by adopting FP and types.

We’ll learn why the combination of features such as immutability, algebraic data types (ADT), value types, purity and effects, etc. results in a whole that is greater than the sum of its parts. I will show how each one can be used to solve a particular problem we have in modern web development using JavaScript.

Beginners can find many [valuable resources](#resources) about the basics of FP and learning a particular language. Likewise, for experts, there are many discussions about advanced topics such as monad transformers, type-level programming, and category theory. However, they can be intimidating and, more importantly, distracting for someone new to FP as they are—based on personal experience—not required to build useful applications.

This observation is touched upon in [The Haskell Pyramid]: Learning enough Haskell to be productive takes far less effort than people imagine. Though if you follow Haskell experts on social media, it seems daunting to even begin the journey.

Wanting to become productive myself, I struggled to find good articles about intermediate level topics on types and functional programming and how they can be effectively applied in real-world situations. This reminds me of when I first learned OOP. Most examples were about `Ball` and `Ball::bounce()`, or `Animal`, `Dog`, `Cat`, and `Animal::sayHello()`, whereas I was looking to figure out how OOP could help me separate my data fetching from my presentation logic.

My goal for this series is to bridge that gap and show that it doesn’t take much to become productive with functional programming and using types as a tool to build more robust applications.

So far, I’ve shared my passion for functional programming and type-driven development with my past three teams:

-   **FiftyThree:** _[Functional Programming for Fun & Profit][fpfp]_
-   **Shutterstock:** _Type-Driven Development_. Internally presented a case study about six bugs we’ve encountered in production and how using a functional programming language and types could have prevented them and made our app more maintainable.
-   **Signal:** Implemented proof of concept for integrating [PureScript with Signal Desktop][signal-desktop-purescript-poc]. It demonstrates how explicitly defining your domain types, e.g. `Conversation`, `Message`, `Attachment`, etc., can help you better understand your app’s behavior and how to safely extend it.

_Practical Functional Programming_ is about sharing what I learned more broadly.

## Structure

Each post in this series will consist of a description of a _Problem_, an _Example_, a _Cause_ where helpful, and then a _Solution_ to the problem using techniques from functional programming. Finally, we’ll wrap it up with a _Conclusion_.

All posts aim to stand on their own, meaning you can jump between the various parts of the series based on your interest.

## Code

To make it more approachable for web developers, I will write examples in [PureScript] and compare them to JavaScript or TypeScript, to make the connection to something you may already be familiar with.

[PureScript] is a purely functional, strongly-typed language that compiles to JavaScript. Having the benefit of being newer, PureScript addresses some of the idiosyncrasies of Haskell. Not only can it be compiled to JavaScript, it also plays nicely with existing JavaScript. This makes it an exceptional tool for web developers to build large and reliable applications.

<section markdown="1" class="conclusion">
## Next Steps

Dive into Part One: [Practical Functional Programming: The Billion Dollar Mistake][blog-tdd-1].

_Optional: If you want to actively follow along, set up your environment by following the [Getting Started with PureScript][purescript-getting-started] instructions. Learn the basics of the language by reading the excellent [PureScript by Example] by [Phil Freeman][twitter-paf31], its creator._


</section>

---

_Thanks to Aseem, Boris, Gerd, Matt, Shaniece, and Stephanie for reading drafts of this._

---

<a name="resources"/>
### Resources

-   [Haskell Book](http://haskellbook.com/)
-   [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/)
-   [PureScript by Example]


[actionscript-3]: https://en.wikipedia.org/wiki/ActionScript#ActionScript_3.0
[blog-fas-1]: /blog/functional-actionscript-1/
[blog-fas-2]: /blog/functional-actionscript-2/
[blog-fas-3]: /blog/functional-actionscript-3/
[blog-tdd-1]: /blog/practical-functional-programming-1/
[blog-tdd-2]: /blog/practical-functional-programming-2/
[eiffel]: https://www.eiffel.org/doc/eiffel/Eiffel
[eth-fmfp]: http://archiv.infsec.ethz.ch/education/ss08/fmfp/index.html
[flow]: https://flow.org/en/
[fpfp-notes-p9]: /publications/functional-programming-fun-profit-daniel-gasienica-notes.pdf#page=9
[fpfp]: /publications/functional-programming-fun-profit-daniel-gasienica.pdf
[github-deepzoom.hs]: https://github.com/gasi/deepzoom.hs
[haskell]: https://haskell-lang.org/
[purescript by example]: https://leanpub.com/purescript/read
[purescript-getting-started]: https://github.com/purescript/documentation/blob/master/guides/Getting-Started.md
[purescript]: http://www.purescript.org/
[servant]: http://haskell-servant.readthedocs.io/en/stable/
[signal-desktop-purescript-poc]: https://github.com/gasi/Signal-Desktop/pull/2
[the haskell pyramid]: https://patrickmn.com/software/the-haskell-pyramid/
[twitter-paf31]: https://twitter.com/paf31
[typescript]: https://www.typescriptlang.org/
[wp-pure-function]: https://en.wikipedia.org/wiki/Pure_function
[wp-static-typing]: https://en.wikipedia.org/wiki/Type_system#Static_type_checking
[zoomhub]: http://zoomhub.net/
