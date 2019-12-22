---
template: post.liquid
pageTitle: 'Splitting text into individual characters with React'
date: '2019-12-15'
categories: ['react', 'front-end', 'tutorial']
title: 'Splitting text into individual characters with React'
excerpt: "How to make a reusable and accessible React component to split text."
---

Recently I needed to animate the individual characters in a heading element. I was hoping there would be a convenient css-only solution, similar to `:nth-child(i)` , but unfortunately that doesn't exist. So I decided to research how to achieve something similar, and accessible, nonetheless.

## HTML

My first idea was to wrap each character in a separate `<span>` element manually.
```HTML
<h1>
    <span>T</span>
    <span>e</span>
    <span>x</span>
    <span>t</span>
</h1>
```

However, there are two issues with this approach:

1. **Accessibility**: by splitting the text up like this, screen readers would read each character individually, making it a painful experience for people relying on screen readers.
2. **Scalability**: writing entire words or sentences out like that is an annoying process, that would have to be manually repeated each time, and doesn't work for text that's dynamically loaded.

### An accessible and scalable solution with HTML and JavaScript

I found a solution on [css-irl](https://css-irl.info/how-to-accessibly-split-text/) that takes care of both these issues, using aria elements for accessibility, and javascript to automate the text-splitting. It takes the text you want to split up as input, and returns it like this:
```JavaScript
<h1 aria-label="Text">
    <span aria-hidden="true">T</span>
    <span aria-hidden="true">e</span>
    <span aria-hidden="true">x</span>
    <span aria-hidden="true">t</span>
</h1>
```

Screen readers will read the text defined inside `aria-label` but ignore the elements marked with `aria-hidden="true"`. However, when I tried this with VoiceOver on Mac, I found I also had to add a `role` element to the parent in order for it to work.

```HTML
<h1 aria-label="Text" role="heading"> ... </h1>
```

## React component

Since I do a lot of my work in React, I decided to create a similar solution inside a reusable component. 

We know from the previous example that we have at least two pieces of variable information: the text that has to be displayed (`this.props.copy`) and the role of the element (`this.props.role`).

Based on that, we can start by creating a `SplitText` reusable component:

```JavaScript
<SplitText copy="This is the text that will be split" role="heading" />
```
In the render function of our `SplitText` component, we first want to render one parent element, with `aria-label={this.props.copy}` and `role={this.props.role}`. This will make screen readers read the original text. 

Then, we need to loop through the copy, and return each element wrapped in a span element with `aria-hidden="true"`. This will visually render each character of the string, but screen readers will hop over it. We can loop through the text by turning it into an array, using the `.split("")` function.

```JavaScript
render(){
    return(
        <span aria-label={this.props.copy} role={this.props.role}>
        {this.props.copy.split("").map(function(char, index){
            return <span aria-hidden="true" key={index}>{char}</span>;
        })}
        </span>
    );
}
```

## Expanding on this

Now we that we have the basics in place, we can also expand on this logic, and add more functionality inside `SplitText`, for example custom class names or conditional styling. I will make a second tutorial, where we'll go more into depth and look at a couple of examples.

