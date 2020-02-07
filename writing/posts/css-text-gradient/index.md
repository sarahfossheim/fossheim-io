---
template: post.liquid
pageTitle: 'How to add a gradient overlay to text with CSS'
date: '2020-01-19'
categories: ['css', 'front-end', 'tutorial']
featured: '2020-02-01'
title: 'How to add a gradient overlay to text with CSS'
excerpt: "An intro tutorial on how to add gradients to text with CSS, including examples and tips for scalability."
image: "http://fossheim.io/static/img/css-gradient-fossheimio.png"
---

To add a gradient overlay to a text element, we need to set three different CSS properties to the text we want to style:
- `background-image: <gradient>`
- `background-clip: text`
- `text-fill-color: transparent`

## Step 1: Add the gradient as a background
In this example we'll use a linear gradient, which can be drawn this way:

```CSS
.gradient-text {
    background-image: linear-gradient(45deg, #f3ec78, #af4261);
}
```

To make the gradient cover the full width and height of your text field, set `background-size: 100%`, which is what I did in this example.

## Step 2: Clipping the background to the text
At this point we have our gradient in the background, and the text is displayed on top of it. 

The next thing we want to do is setting `background-clip: text`. This will only render the background where there's text. If you test this it will seem like your gradient has disappeared completely, which is because the text is still rendered as well, and the gradient layer is hidden underneath.

That's why we have to set the `text-fill-color` to `transparent`. It will remove the fill from the text, making the gradient visible again.

<iframe class="wide" height="500" scrolling="no" title="Gradient Text Overlay" src="https://codepen.io/fossheim/embed/mdyzKOg?height=295&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/mdyzKOg'>Gradient Text Overlay</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Step 3: Adding fallbacks

Gradients as background images clipped on top of text isn't supported by all browsers, so it's important to add fallbacks. We can do this by adding a `background-color` property to the text as well. 

```CSS
.gradient-text {
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #f3ec78, #af4261);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
}
```

Also keep in mind that not all gradients are supported equally. For example, in some browsers conic-gradients will not show. In those cases it's also possible to add a linear-gradient as a fallback to a conic-gradient.

```CSS
.gradient-text {
    background-color: #f3ec78;
    background-image: linear-gradient(#f3ec78, #af4261);
    background-image: conic-gradient(#f3ec78, #af4261);
}
```

In this example, the text will have a conic-gradient as overlay. If that doesn't work, it will show the linear-gradient. And in browsers where linear-gradients aren't supported either, the text will be rendered as the background-color instead.

This also means that if you want to add an actual background to the text, you'll need to add a wrapper to the text.

```HTML
<h1 style="background-color: black;">
    <span class="gradient-text">This text will have a gradient on top</span>
</h1>
```

## More examples

<iframe height="480" class="wide" scrolling="no" title="Gradient Text Overlay" src="https://codepen.io/fossheim/embed/wvBYEgY?height=474&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/wvBYEgY'>Gradient Text Overlay</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="480" class="wide" scrolling="no" title="Rainbow text hover animation" src="https://codepen.io/fossheim/embed/PooBwRa?height=478&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/PooBwRa'>Rainbow text hover animation</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="480" class="wide" scrolling="no" title="Gradient Text Overlay" src="https://codepen.io/fossheim/embed/rNaQBjw?height=521&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/rNaQBjw'>Gradient Text Overlay</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## Extra: Scalability

If (text) gradients are a big part of your branding, you could split this functionality in two parts: a class that renders your gradient as a regular background-image, and a different class to clip any background to th text.

The gradient:
```CSS
.gradient-brand-primary {
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #f3ec78, #af4261);
}
```

The text clipping:
```CSS
.gradient-text {
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
}
```

This allows you to easily do two things:
1. Add the same gradient or pattern to both the text and as a background to regular elements
2. Create different text overlays without having to repeat the clipping properties