---
layout: post
title: 'Type-Driven Development: Prelude'
date: '2018-06-19 09:00:00 -0400'
---

The following series is about how developing software driven by types and a functional programming language can help you avoid unnecessary errors, lets you think about and express your ideas more clearly, and create designs that can evolve to meet growing needs.

## You

Are you a web developer using JavaScript—maybe even [TypeScript] or [Flow]—and feel like you still too often run into problems with…

-   …unexpected runtime errors?
-   …gnarly parts of code that become harder to maintain over time?
-   …new features breaking existing parts of your app?

Or: Have you grasped the basics of functional programming and are wondering how to apply that knowledge in real-world situations?

If you’ve answered _yes_ to any of these, keep on reading.

Whereas, if you’re totally happy with your tools, workflow, have no problem writing bug-free code, and maintaining large codebases, consider yourself lucky, go outside, and enjoy your day.

If you are curious anyway and have an open mind, then you are welcome to continue reading!

## Me

Since starting programming in my teenage years, I primarily used dynamically typed languages such as ActionScript 2 (Flash), JavaScript (browser and Node.js), and Python (Google App Engine) to develop web applications. Later, I switched to [ActionScript 3][actionscript-3] which added static types and in college we used the object-oriented, statically typed [Eiffel] for our introductory class and Java for a compiler class. What all of these have in common is that they are imperative languages, meaning you write a program as a sequence of statements (`if`, `for`, `while`, `delete`, `return`, etc.)

In 2008, I took a class called _[Formal Methods and Functional Programming][eth-fmfp]_. That’s when I [was][blog-fas-1] [first][blog-fas-2] [exposed][blog-fas-3] to [Haskell], a purely functional, statically typed programming language. Using a functional language means you primarily write your programs as a composition of functions as opposed to a sequence of statements.

Fast-forward to April, 2016: I shipped [ZoomHub], my first real-world project using Haskell, after learning the language for four months on my third attempt. Studying Haskell has expanded my perspective on software development but it took a while to go from theory to applying it in practice. I want to help you get there faster.

In the meantime, I’ve continued working on ZoomHub and shared my passion for functional programming and type-driven development with the past three teams I was part of:

-   **FiftyThree:** _[Functional Programming for Fun & Profit][fpfp]_
-   **Shutterstock:** _Type-Driven Development_. Internally presented case study about six bugs we encountered in production and how using types and a functional programming language could have prevented them and make our app more maintainable.
-   **Signal:** Implemented proof of concept for integrating [PureScript with Signal Desktop][signal-desktop-purescript-poc]. It demonstrates how explicitly modeling your domain types helps you reason about your app and evolve it.

Now I’d like to take everything I learned during the past few years and share it with a wider audience through my blog.

## Motivation

Not long ago, one of my friends asked me what made me so excited about functional programming. There were many reasons I could think of but I couldn’t put it into a few sentences. He asked me if I had a link to a good article but no specific one came to mind.

I hope this series will capture what’s been floating around my mind for the past few years. It will talk about why the combination of features such as immutability, algebraic data types (ADT), value types, purity & effects, etc. creates something greater than the sum of its parts. I will show how each one can be used to solve a particular problem we have in modern web development using JavaScript.

Beginners can find many [valuable resources](#references) about the basics of functional programming and learning a particular language. Likewise, for experts, there are many discussions about advanced topics such as monad transformers, type-level programming, and category theory. However, they can be intimidating and, more importantly, distracting for someone new to functional programming.

This observation is touched upon in [The Haskell Pyramid]: Learning enough Haskell to be productive takes less effort than people imagine. Though if you follow Haskell experts on social media, it seems daunting.

Wanting to become productive, I struggled to find good articles about intermediate level topics on types and functional programming and how they can be effectively applied in real-world projects. This reminds me of when I first learned OOP. Most examples where about `Ball` and `Ball::bounce()` or `Animal`, `Dog`, `Cat`, and `Animal::sayHello()`, whereas I was looking to figure out how to best use OOP to separate my data fetching from my presentation logic.

My goal for this series is to bridge that gap and show that it doesn’t take much to become productive using types and a functional programming language.

## Structure

Each post in this series will aim to stand on its own, meaning you can jump around between the various parts based on your interest. To make it more approachable for web developers, I will write examples in [PureScript] and compare them to JavaScript or TypeScript to make the connection to something you are already familiar with.

PureScript is a purely functional, strongly-typed language that compiles to JavaScript. Having the benefit of being newer, PureScript addresses some of the idiosyncrasies of Haskell. Since it can be compiled to JavaScript, it’s an excellent tool to build large and reliable web applications.

Follow the [Getting Started with PureScript][purescript-getting-started] instructions for setting up your environment. You can learn the basics of the language by reading the excellent [PureScript by Example] by [Phil Freeman][twitter-paf31], its creator.

Once you are ready, dive in to part one: [Type-Driven Development: Null][blog-tdd-1].

<a name="references"/>
### References

-   [Haskell Book](http://haskellbook.com/)
-   [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/)
-   [PureScript by Example]

[actionscript-3]: https://en.wikipedia.org/wiki/ActionScript#ActionScript_3.0
[blog-fas-1]: /blog/functional-actionscript-1/
[blog-fas-2]: /blog/functional-actionscript-2/
[blog-fas-3]: /blog/functional-actionscript-3/
[blog-tdd-1]: /blog/type-driven-development-1/
[eiffel]: https://www.eiffel.org/doc/eiffel/Eiffel
[eth-fmfp]: http://archiv.infsec.ethz.ch/education/ss08/fmfp/index.html
[flow]: https://flow.org/en/
[fpfp]: /publications/functional-programming-fun-profit-daniel-gasienica.pdf
[haskell]: https://haskell-lang.org/
[purescript by example]: https://leanpub.com/purescript/read
[purescript-getting-started]: https://github.com/purescript/documentation/blob/master/guides/Getting-Started.md
[purescript]: http://www.purescript.org/
[signal-desktop-purescript-poc]: https://github.com/gasi/Signal-Desktop/pull/2
[the haskell pyramid]: https://patrickmn.com/software/the-haskell-pyramid/
[twitter-paf31]: https://twitter.com/paf31
[typescript]: https://www.typescriptlang.org/
[zoomhub]: http://zoomhub.net/
