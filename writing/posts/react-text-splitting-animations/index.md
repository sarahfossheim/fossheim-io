---
template: post.liquid
pageTitle: 'How to style and animate the letters in a string using CSS'
date: '2019-12-18'
featured: '2020-02-04'
categories: ['react', 'css', 'front-end', 'tutorial']
title: 'How to style and animate the letters in a string using CSS'
excerpt: "Tutorial on how to apply different css styling to different characters in a string."
---

Earlier I wrote a [tutorial](/writing/posts/react-text-splitting) on how to split text and render the letters or words as separate spans in React.

We will build further on that code to style and animate characters in a string with CSS. First, we'll look at how to give letters different colors, then we will animate them. The result will be an animation like this:

<iframe height="500" class="wide" scrolling="no" title="React text splitting: animated random colors " src="https://codepen.io/fossheim/embed/vYEyJOO?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/vYEyJOO'>React text splitting: animated random colors </a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The React code we'll use for this can be found in [its own tutorial](/writing/posts/react-text-splitting) or remixed on [Glitch](https://glitch.com/~text-splitting-react). 

It's also possible to use the CSS in combination with your own custom text splitting functionality, even without React.

## Example 1: Alternating font colors

For the first example, we'll take an input string and give the letters alternating font colors.

<iframe height="500" class="wide" scrolling="no" title="React text splitting: random colors" src="https://codepen.io/fossheim/embed/xxbRLKM?height=498&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/xxbRLKM'>React text splitting: random colors</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Looking at the component we made earlier, we notice it returns one span element which contains all the letters wrapped in separate span elements.

```
<span>
    <span>H</span>
    <span>e</span>
    <span>l</span>
    <span>l</span>
    <span>o</span>
</span>
```

If we call the component from within an `h1` element, then we can style all the letters by using `h1 span span { ... }`.

So to alternate between two colors, the following styling can be used:

```CSS
h1 span span { color: pink; }
h1 span span:nth-child(2n) { color: orange; }
```

For the example in my pen above, I combined several `:nth-child()` elements to create a semi-random color pattern.

## Example 2: Moving in text letter by letter

Our next example is using CSS animations to make text fade in character by character.

<iframe height="500" class="wide" scrolling="no" title="React " src="https://codepen.io/fossheim/embed/abzBwrQ?height=512&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/abzBwrQ'>React </a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Let's start by adding an animation to the letters by doing this:

```CSS
h1 span span { 	animation: move-text 0.75s forwards; }
```

This will give each letter an animation called `move-text` that lasts 0.75 seconds and stops at the end.

Inside the `move-text` animation we'll make each letter move in from the bottom and _land gently_ on its final position, which we can achieve this way:

```CSS
h1 span span {
    position: relative;
    opacity: 0;
    animation: move-text 0.75s forwards;
}

@keyframes move-text {
    0% { bottom: -0.2em; opacity: 1; }
    50% { bottom: 0.2em; }
    100% { bottom: 0; opacity: 1; }
}
```

However, when running this code, all letters fade in at the same time. This can be fixed this by adding a delay to our animation.

To make it look smooth, each animation should start a bit after the previous one. 

We'll use the `index` value in our React component to apply an animation delay to each span:

```JS
{this.props.copy.split("").map(function(char, index){
    const style = {"animation-delay": (0.5 + index / 10) + "s"};
    return <span
        aria-hidden="true"
        key={index}
        style={style}>
        {char}
    </span>;
})}
```

This adds a delay of 0.5s, 0.6s, 0.7s, 0.8s and so on to each animation. So each animation will start 0.1s after the previous one started, and the animation will first be started 0.5s after loading.

Another approach you could try is to pass in the `index` as a CSS variable. It looks a bit cleaner since it doesn't require you to write CSS inside the render function.

I also made this code available on [Glitch](https://glitch.com/@fossheim), so it's possible to remix it and build further on it yourself.