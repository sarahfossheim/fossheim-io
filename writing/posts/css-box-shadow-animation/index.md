---
template: post.liquid
pageTitle: "How to create an accordion hover effect with box-shadows"
date: '2020-03-13'
categories: ['css', 'front-end', 'tutorial']
featured: "2020-03-13"
title: "How to create an accordion hover effect with box-shadows"
excerpt: "Step-by-step tutorial on how to create a rainbow accordion animation in CSS, using only box-shadows-"
image: "https://fossheim.io/static/img/css-box-shadow-animation-static.png"
---

In this tutorial we'll use the `box-shadow` property to create a layered card component, and animate it on hover. 

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked cards 2" src="https://codepen.io/fossheim/embed/MWwOBwx?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/MWwOBwx'>Rainbow stacked cards 2</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## The box-shadow property explained

To add shadows to a box we'll need to specify several things in the `box-shadow` property:
- `x-offset`: Position on the x-axis. A positive value moves the shadow to the right, a negative value moves the shadow to the left. _(required)_
- `y-offset`: Position on the y-axis. A positive value moves the shadow to the bottom, a negative value moves the shadow to the top. _(required)_
- `blur`: How much blur the shadow should have. The higher the value, the softer the shadow. The value is set to 0px, meaning no blur, by default.  _(optional)_
- `spread`: How much larger the shadow should be compared to the component. A positive value makes the shadow larger than the box, a negative value makes the shadow smaller. _(optional)_
- `color`: Which color the shadow should have. The default value is the text color. _(optional, required for Safari)_
- `inset`: The position of the shadow. By default the shadow is outside the box. Setting inset moves it to the inside. _(optional)_

```CSS
    box-shadow: [x-offset] [y-offset] [blur] [spread] [color] [inset];
```

For example:

<iframe height="438" class="wide" scrolling="no" title="CSS Box-shadows: 3 examples" src="https://codepen.io/fossheim/embed/poJdVEg?height=438&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/poJdVEg'>CSS Box-shadows: 3 examples</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

You can read more about box-shadows on [W3Schools](https://www.w3schools.com/cssref/css3_pr_box-shadow.asp) or [css-tricks](https://css-tricks.com/almanac/properties/b/box-shadow/). My [CSS-only polaroid camera](/writing/posts/css-polaroid-camera/) is built using box-shadows as well.

## The card component

We don't need to write any additional HTML to add the stacked cards in the background. We'll start our tutorial with the following code:

```HTML
    <div class="card">
        <p>Similar post</p>
        <h2>How I recreated a Polaroid camera with CSS gradients only</h2>
    </div>
```

<iframe height="540" class="wide" scrolling="no" title="White and blue card component" src="https://codepen.io/fossheim/embed/MWwOXRz?height=533&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/MWwOXRz'>White and blue card component</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Translating cards into shadows

<img class="wide" src="/static/img/css-box-shadow-animation-static.png" alt="Static version of the rainbow card component: a white box with blue border, with green, yellow, orange and red bordered boxes behind it" />

We want to stack 4 cards behind our component, each with the same border width (3px) and same background (white) but a different position and border color. 

This means we'll need to draw 8 shadows: one for each color/border, and one for each white fill. 

<img class="wide" src="/static/img/css-box-shadow-animation-numbered.png" alt="The rainbow boxes with numbers from 1-8 on each shadow (1 on the first white, 2 on green, 3 on second white, 4 on yellow, and so on)" />

### Adding the first background card

We'll start by adding the first green caed behind the component. Let's take a look at its requirements:
- Move 10px to the right
- Move 10px to the top
- No blur
- Same size as container (no spread)
- Green color (<span style="background-color: #5CBD3F; color: #192824">#5CBD3F</span>)

This translates into CSS like this:

```CSS
    box-shadow: 10px -10px 0 0 #5CBD3F;
```

<iframe height="420" class="wide" scrolling="no" title="White and blue card component, green background card" src="https://codepen.io/fossheim/embed/vYOWroy?height=265&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/vYOWroy'>White and blue card component, green background card</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Combining shadows to create fills and borders

Next, we have to draw a white shadow on top of the green one to mimic the white fill of the box.

The border should be 3 pixels thick, so the white shadow should be 3px smaller than the colored one on each side. We can do this by setting a negative spread:

```CSS
    box-shadow: 10px -10px 0 -3px white;
```

When adding several shadows, the one that's listed first will be rendered on top. So our code will now look like this:

```CSS
    box-shadow: 10px -10px 0 -3px white, 10px -10px 0 0 #1FC11B;
```

<iframe height="420" class="wide" scrolling="no" title="White and blue card component, green background card 2" src="https://codepen.io/fossheim/embed/xxGPJxb?height=265&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/xxGPJxb'>White and blue card component, green background card 2</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Repeat the same process three more times for the other colors, and keep moving the shadows 10px upwards and to the right.

```CSS
    box-shadow: 10px -10px 0 -3px white, 10px -10px 0 0 #1FC11B, /* Green */
        20px -20px 0 -3px white, 20px -20px 0 0 #FFD913, /* Yellow */
        30px -30px 0 -3px white, 30px -30px 0 0 #FF9C55, /* Orange */
        40px -40px 0 -3px white, 40px -40px 0 0 #FF5555; /* Red */
```

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked cards" src="https://codepen.io/fossheim/embed/GRJOBRE?height=265&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/GRJOBRE'>Rainbow stacked cards</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Adding the hover animation

Now that the design is in place, the only thing left to do is adding the hover animation. 

<img class="wide" src="/static/img/css-box-shadow-animation-preview.gif" alt="Animated gif of the rainbow accordion" />

All the cards will have to move from their original position to the position of the red card in the back. The first step is to change the position of our component.

```CSS
.card {
    position: relative;
    top: 0;
    left: 0;
    transition: left 1s, top 1s;
}

.card:hover {
    top: -40px;
    left: 40px;
}
```

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked cards" src="https://codepen.io/fossheim/embed/wvaPxam?height=335&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/wvaPxam'>Rainbow stacked cards</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The shadows still move along with the component because the offset is still the same. All the shadows have to move towards the same position as the box, meaning their horizontal and vertical offset has to be set to 0.

```CSS
.card {
    position: relative;
    top: 0;
    left: 0;
    transition: box-shadow 1s, left 1s, top 1s;
}
.card:hover {
    box-shadow: 0 0 0 -3px white, 0 0 0 0px #1FC11B,
        0 0 0 -3px white, 0 0 0 0px  #FFD913,
        0 0 0 -3px white, 0 0 0 0px  #FF9C55,
        0 0 0 -3px  white, 0 0 0 0px  #FF5555;
    top: -40px;
    left: 40px;
}
```

This gives us our desired end result:

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked cards 2" src="https://codepen.io/fossheim/embed/MWwOBwx?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/MWwOBwx'>Rainbow stacked cards 2</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## More border effects using box-shadows

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked accordion animation 5" src="https://codepen.io/fossheim/embed/LYVOBRZ?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/LYVOBRZ'>Rainbow stacked accordion animation 5</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked accordion animation 4" src="https://codepen.io/fossheim/embed/qBdVyNZ?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/qBdVyNZ'>Rainbow stacked accordion animation 4</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked accordion animation 3" src="https://codepen.io/fossheim/embed/dyoZjMO?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/dyoZjMO'>Rainbow stacked accordion animation 3</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked accordion animation 2" src="https://codepen.io/fossheim/embed/yLNPqeZ?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/yLNPqeZ'>Rainbow stacked accordion animation 2</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="420" class="wide" scrolling="no" title="Rainbow borders" src="https://codepen.io/fossheim/embed/abOYqKY?height=334&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/abOYqKY'>Rainbow borders</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height="420" class="wide" scrolling="no" title="Rainbow stacked accordion animation 6" src="https://codepen.io/fossheim/embed/abOVjJv?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/abOVjJv'>Rainbow stacked accordion animation 6</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>