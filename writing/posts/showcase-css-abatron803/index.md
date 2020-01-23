---
template: post.liquid
pageTitle: 'Design of the Abatron 803 calculator replicated in CSS'
date: '2020-01-22'
categories: ['showcase', 'front-end', 'css']
title: 'Design of the Abatron 803 calculator replicated in CSS'
excerpt: "Recently I came across the design of the Abatron 803, a calculator from 1975. I thought it looked really good, so I decided to recreate the design in HTML/CSS."
image: "http://fossheim.io/static/img/showcase-abatron803-css.png"
---


Recently I came across the design of the [Abatron 803](https://www.calculator.org/calculators/Abatron_803.html), a calculator from 1975. I thought it looked really good, so I decided to recreate the design in HTML/CSS.

<iframe height="1120px" class="wide" scrolling="no" title="Abatron 803 replica in CSS" src="https://codepen.io/fossheim/embed/xxbmXZq?height=1108&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/xxbmXZq'>Abatron 803 replica in CSS</a> by Sarah
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I only used fonts from Google Fonts, so the type is not an exact match, and I also simplified the design a bit. 

The bars on top are made with gradients as part of the calculator background:

```
.calculator {
background: linear-gradient(#C4C9C3, #C6C8C7),
    linear-gradient(
        #C6C8C7 25%,
        #484939 27%,
        #87877B 30%,
        #87877B 32%,
        #E7E7DD 33%,
        #C6C8C7 33.5%,
        ..., /* Repeat */
        #C6C8C7 98.5%
    );
background-size: 100%, 100% 80px;
background-position: 0 80px, top left;
background-repeat: no-repeat;
}
```

The depth of the keys is also created with gradients:
```
.number {
  background: linear-gradient(90deg, #182629, #4B5556 80%);
  background-size: 100%;
  background-position: top left;

}

.number .key-content {
  background: radial-gradient(#3E4C4D, #38474A, #343E3F);
  background-size: 150% 350%;
  background-position: center center;
}
```

The full code can be viewed on [CodePen](https://codepen.io/fossheim/pen/xxbmXZq).

Right now there's no functionality tied to it, since my main goal was to recreate a physical product in CSS. But I am planning on turning it into a functional calculator with JavaScript in the future.

Credit also has to go to the [Avatron 903M](https://dribbble.com/shots/499001-Abatron-Calculator-Buttons) design (based on the original Abatron calculator) by Keith Sereby on Dribbble, which inspired me to make a version of the Abatron 803 in CSS.