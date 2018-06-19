---
layout: post
title: "Type-Driven Development: Prelude"
---

The following series is about how learning a functional programming language can give you a new perspective on software development and how you can apply its ideas in real-world situations. I will share techniques and strategies that helped me think and express my ideas more clearly, made my life as engineer easier, and more fun! I hope they will help and inspire you too.

## You

Are you a web developer using JavaScript, maybe even TypeScript, Flow, or similar, but feel like you still too often run into problems with…?

- unexpected runtime errors
- gnarly parts of code that get harder to maintain over time
- new features breaking existing parts of your app

If you answered _yes_ to any of these, keep on reading.

Whereas, if you’re totally happy with your tools, workflow, have no problem writing bug-free code, and maintaining large codebases, consider yourself lucky, go outside, and enjoy your day.

If you are curious anyway and have an open mind, then you are welcome to read on!

## Background

Since starting programming as a teenager, I primarily used dynamically typed languages such as ActionScript 2 (Flash), JavaScript (browser and Node.js), and Python (Google App Engine) to develop web applications. Later, I switched to ActionScript 3 which added static types and in college we used the object-oriented, statically typed [Eiffel] for our introductory class and Java for a compiler class. What all of these have in common is that they are imperative languages, meaning you write a program as a sequence of statements.

In 2008, I took a class called _Formal Methods and Functional Programming_. That’s when I was first exposed to [Haskell], a purely functional, statically typed programming language. Using a functional language means you primarily write your programs as a composition of functions as opposed to a sequence of statements. Fast-forward to 2015: I finally shipped [ZoomHub], my first real-world project using Haskell, on my third attempt of learning the language.

## Motivation

Not long ago, one of my friends asked me what made me so excited about functional programming. There were many reasons I could think of but I couldn’t condense it into a few sentences. He asked me if I had a link to a good article but I couldn’t think of a specific one.

There are many great resources about the basics of functional programming and learning Haskell (see [references](#references) below). There are also many discussions about more advanced topics such as monad transformers, type-level programming, and category theory. At the same time, I found it difficult to find good articles about intermediate level topics on functional programming and types and how they can effectively be used in real-world situations.

This has been succinctly described in [The Haskell Pyramid]: Learning Haskell and getting productive doesn’t take too much work. If you follow Haskell experts on social media, it seems daunting though.

<a name="references"/>
### References

- [Haskell Book](http://haskellbook.com/)
- [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/)

[eiffel]: https://www.eiffel.org/doc/eiffel/Eiffel
[haskell]: https://haskell-lang.org/
[the haskell pyramid]: https://patrickmn.com/software/the-haskell-pyramid/
[zoomhub]: http://zoomhub.net/
