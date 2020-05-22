---
pageTitle: "An introduction to accessible data visualizations with D3.js"
categories: ['a11y', 'front-end', 'tutorial', 'D3.js', 'data']
featured: "2020-05-20"
date: "2020-05-20"
title: "An introduction to accessible data visualizations with D3.js"
excerpt: "Data visualizations can be great to communicate complex data in an easy way. Unfortunately, there's a lot that can go wrong when it comes to accessibility. So I decided to start writing my own series about it."
image: "http://fossheim.io/static/img/a11y-d3-dailyvisitors.png"
---

Data visualizations can be great to communicate complex data in an easy way. Unfortunately, there's a lot that can go wrong when it comes to accessibility. A few weeks ago I decided to navigate one of the highest listed [COVID-19 dashboards](https://www.worldometers.info/coronavirus/country/norway/) with VoiceOver, and I barely could make it past the first graph before closing my browser in frustration. 

<audio controls>
  <source src="/static/audio/covid19-voiceover.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

But they're barely alone in this - and I can't really blame them either. I have guaranteed made similar mistakes in the past, as most D3.js tutorials out there don't mention accessibility, and a lot of visualization libraries built upon D3.js are inaccessible by default. 

Data is everywhere, and it should be accessible for all. So I decided to start writing my own series about it!

This first tutorial will be quite broad, but we will go into more detail in upcoming posts. You will need to have a basic understanding of D3.js to follow along; but don't worry, an intro to D3.js series is in the make as well.

## Starting point

For this tutorial, we'll start with a simple bar chart that visualizes the amount of unique visitors a website had in the last week. Days where the visitor count is 100 or lower will have to be highlighted as bad.

<iframe height="660" class="wide" scrolling="no" title="Inaccessible graph (D3.js)" src="https://codepen.io/fossheim/embed/GRpYvJN?height=652&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/GRpYvJN'>Inaccessible graph (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

There are a few issues with this graph:

1. The colors of the bars and text don't have enough contrast with the background
2. The colors used become less distinguishable for colorblind people
3. The meaning of the colors is not explained 
4. We don't know the scale of the y-axis, or what's visualized here
5. There are no values mentioned
    - This doesn't communicate the exact amount of visitors to anyone, there's only a visual indication of which days have more visitors than others
    - Assistive technology (screen readers) won't have any values to communicate to the user either, so blind people and people with low vision won't get any information out of this

We'll go through these issues step-by-step, and will transform this in a graph that's a lot more accessible already. Note that this is a fairly basic graph, with a small amount of data and no interactions. The more functionality and complexity we add, the more we'll have to think of.

## Colors

Let's start by picking colors that meet the contrast guidelines (AA or AAA ratio), and still look different enough for different types of color blindness. Personally, I prefer using [Figma](https://www.figma.com/) for this, since I already use it in the design-phase as well. Usually I'll copy-paste the colors in a separate frame and run the [Able](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) and [Color Blind](https://www.figma.com/community/plugin/733343906244951586/Color-Blind) plugin on it. 

If you don't use any program that supports this or just prefer working from the browser, [Colorblinding](https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa/related?hl=en) and [WCAG Color Contrast Checker](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf/related?hl=en) are chrome extensions with the same functionality.

For the sake of simplicity, I went for a standard darker blue/red solution, which is safe both when it comes to colorblindness and contrast. You can use tools like [Khroma](http://khroma.co/generator/), [Coolors](https://coolors.co/contrast-checker) or [Colorsafe](http://colorsafe.co/) to help you create accessible palettes.

<iframe height="650" class="wide" scrolling="no" title="Inaccessible graph - improvement 1: colors (D3.js)" src="https://codepen.io/fossheim/embed/oNjaeRZ?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/oNjaeRZ'>Inaccessible graph - improvement 1: colors (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you want to be extra safe, or can't avoid using colors that meet the guidelines when it comes to colorblindness, you can also add patterns to your graphs. Make sure to not overdo it and go for calm patterns, otherwise the graph might become too busy on the eyes as well.

We can add patterns as a background by creating a `<pattern>` element inside an SVG. We'll need to give the pattern an id, width and height. Inside the `<pattern>` we can draw any SVG object we want. Then, in the object we want to add a background pattern to, we can set the fill to `url(#idOfOurPattern)`

```html
<pattern id="dots" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
  <rect fill="#5D92F6" x="0" y="0" width="3" height="3"></rect>
  <circle fill="#11419B" cx="1" cy="1" r="1"></circle>
</pattern>
```

```css
.bar {
  fill: url(#dots)
}
```

<iframe height="650" class="wide" scrolling="no" title="Inaccessible graph - improvement 2: patterns (D3.js)" src="https://codepen.io/fossheim/embed/qBOJPNm?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/qBOJPNm'>Inaccessible graph - improvement 2: patterns (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Explaining the colors by adding a legend

We're using different colors in the graph, which can be tricky when it comes to accessibility. But it's also a general UX issue to address. 

Not everyone will see color the same way (for example, because of colorblindness) and colors carry different meanings to different people and cultures. So it won't be obvious to all users that in our example a red bar means less than 100 people visited our site that day. That's where legends come into play.

Let's start by adding a group (`<g>`) and assign it to the `legend` constant.

```jsx
const legend = chart.append("g");
```

We'll also need to add either an `aria-label` attribute, or a `<title>` accompanied by a `aria-labelledby` attribute, so assistive technology can give the user some more information about what's being read.

```jsx
const legend = chart.append("g").attr("aria-label", "Legend");
```

Alternatively, we can display a visual title:

```jsx
const legend = chart.append("g");
legend.append("text")
	.text("Legend")
	.attr("x", margin.left / 2)
	.attr("y", margin.top)
	.attr("class", "legendTitle");
```

Once we have created the legend group, we can add the rectangles and text fields to it.

```jsx
// First color: blue with dots
legend.append("rect")
  .attr("fill", "url(#dots)")
  .attr("width", 13)
  .attr("height", 13)
  .attr("rx", 2)
  .attr("x", margin.left / 2)
  .attr("y", margin.top);

// First color: explanation
legend.append("text")
  .text("Over 100 daily visitors")
  .attr("x", margin.left / 2 + 20)
  .attr("y", margin.top + 10);

// Second color: red with lines
legend.append("rect")
  .attr("fill", "url(#lines)")
  .attr("width", 13)
  .attr("height", 13)
  .attr("rx", 2)
  .attr("x", margin.left / 2)
  .attr("y", margin.top + 30);

// Second color: explanation
legend.append("text")
  .text("Under 100 daily visitors")
  .attr("x", margin.left / 2 + 20)
  .attr("y", margin.top + 40);
```

Screen readers read the DOM elements in the order that they appear in your code. So in my example, I added the code for the legend on top, before the code for the x-axis, because of two reasons:

1. That's where it is visually positioned as well, making it the most logical for people who both listen and look at the visuals
2. It's good to know the background information about the graph before diving into the numbers

<iframe height="650" class="wide" scrolling="no" title="Inaccessible graph - improvement 3: legends (D3.js)" src="https://codepen.io/fossheim/embed/dyYgVzJ?height=650&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/dyYgVzJ'>Inaccessible graph - improvement 3: legends (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Labeling the data

We still have no clue what kind of values we're actually looking at. We can see that Monday had around half the amount of visitors as Sunday had, but don't know the exact amounts. 

We'll need to add the values on top of the bars, and label the y-axis to indicate what the unit of our data is (in our case unit is the amount of unique visitors).

For each row in our data, this will print the amount of visitors:

```jsx
chart.selectAll(".label")
  .data(data)
  .enter().append("text")
  .text(row => row.visitors);
```

Those labels should be positioned centered above each bar. To achieve that, we'll first set the `text-anchor` attribute to `middle`, so the centre of the text element is used to calculate its coordinates. 

```jsx
chart.selectAll(".label")
  .data(data)
  .enter().append("text")
  .text(row => row.visitors)
	.attr("text-anchor", "middle");
```

Next, we'll set the `x` coordinate to the same one as the bar. Since the bar in our example is `10px` wide, and want the text to be centered, we'll need to move the text an additional `(10/2)px` to the right. The `y` coordinate should be a few pixels less than the bar's `y` coordinate as well.

```jsx
chart.selectAll(".label")
  .data(data)
  .enter().append("text")
  .text(row => row.visitors)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5)
	.attr("class", "label");
```

That should do it for the values. Finally, we can add the label to the y-axis like this:

```jsx
chart.append("text")
  .text("Amount of unique visitors")
  .attr("class", "yAxis")
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("x", -height / 2 - margin.top)
  .attr("y", margin.left / 2 + 5);
```

<iframe height="650" class="wide" scrolling="no" title="Inaccessible graph - improvement 4: labels (D3.js)" src="https://codepen.io/fossheim/embed/rNOqYQr?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/rNOqYQr'>Inaccessible graph - improvement 4: labels (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Labeled data and screen readers

We're almost there. Visually speaking, this is a lot more accessible already. But let's use VoiceOver and listen to what people using screen readers will hear.

<audio controls>
  <source src="/static/audio/a11y-graph-voiceover-labels.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

We're hearing everything correctly, exactly as displayed. But there are some improvements to be made. VoiceOver first reads all the days on the x-axis, then moves over to reading all the values above the bars. 

We're getting access to all the information, and because we're only dealing with 7 points of data it's not impossible to keep track of which value maps to which day. But the larger our dataset becomes, the harder it becomes to follow. 

There are a lot of different ways we can solve this, and we will definitely dive deeper into this during the next tutorials. But for now, let's look at two different solutions:

### Solution A: Add the labels and the ticks to the same element

One option could be to restructure the code, and group the days and values inside one element. The way our D3 code is structured right now, this will be the output in HTML:

```html
<svg>
	<g class="legend"></g>

	<!-- x-axis -->
	<text>Mon</text>
	<text>Tue</text>
	<text>Wed</text>
	...
	
	<!-- y-axis -->
	<text>Amount of unique visitors</text>

	<!-- bars -->
	<rect></rect>
	...

	<!-- labels -->
	<text>100</text>
	<text>172</text>
	<text>92</text>
	...
</svg>
```

A better experience could be if VoiceOver read our graph like this: *"Amount of unique visitors on Monday: 100, Tuesday: 172, Wednesday: 92, ...".* This connects each day on the x-axis with the value of each graph at once, making it easier to follow along.

Instead of first looping through our data to draw the values on the x-axis and later on looping through the data a second time to draw the labels above the graphs, we will only loop through our data once and append a group to it.

```jsx
const ticks = chart.selectAll(".tick")
  .data(data)
  .enter().append("g")
  .attr("class", "tick");
```

This will output `<g></g>` for each point in the dataset. Then, we can call `ticks.append()` twice, once to add the x-axis labels and once to add the values.

```jsx
ticks.append("text")
  .text((data) => data.day)
  .attr("x", function(row, index) { return x(index + 1) + 5; })
  .attr("y", height + margin.top)
  .attr("width", 30)
  .attr("text-anchor", "middle");

ticks.append("text")
  .text(row => row.visitors)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5)
  .attr("class", "label");
```

This will output the following HTML:

```html

	<g>
		<text>Mon</text>
		<text>100</text>
	</g>
	<g>
		<text>Tue</text>
		<text>172</text>
	</g>
	<g>
		<text>Wed</text>
		<text>92</text>
	</g>
	...
```

If we also move the label of the y-axis to be drawn before ticks, this dataset will read a lot more naturally already.

<iframe height="650" class="wide" scrolling="no" title="Accessible graph - improvement 5: labels (D3.js)" src="https://codepen.io/fossheim/embed/gOaBogW?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/gOaBogW'>Accessible graph - improvement 5: labels (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Solution B: Adding more context to the labels

The above solution reads quite naturally, but also comes with a limitation for large datasets where not each bar will have a corresponding label on the x-axis. Sometimes we don't want to label each and every point on the x-axis, especially when dealing with larger datasets.

<img src="/static/img/a11y-d3-example.png" alt="bar chart with a lot of bars on the x-axis, but not an equal amount of labels" class="wide" />

So let's explore another possibility as well. In this solution, the screen reader will read the x-axis as it originally did *("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday").* Then it will read the y-axis label. And when it gets to the labels above the bars, it will repeat the x-value of each of them. 

In our example, this would sound like *"X-axis: days of the week. Monday, Tuesday , ... . Y-axis: Amount of unique visitors. Monday: 100. Tuesday: 172. Wednesday: 92. ..."*. 

We don't have to touch the code for the x-axis this time, but instead we will modify the code for the bar-labels. Let's start by adding them to one text element called `barLabels`. 

```jsx
const barLabels = chart.selectAll(".label")
  .data(data)
  .enter().append("text");
```

Next, we'll re-add our label that reads the value from the y-axis. We'll use the `tspan` element for this, and append it to the `barLabels`. 

```jsx
barLabels.append("tspan")
  .text(row => row.visitors)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5);
```

But before it reads this value, we also want it to read the corresponding value on the x-axis. We can copy-paste the code from above, but change `row => row.visitors` to `row => row.day`. 

```jsx
/* Shows the corresponding value from the x-axis (day of the week). */
barLabels.append("tspan")
  .text(row => row.day)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5)
	.attr("class", "xLabel");

/* Shows the corresponding value from the y-axis (# visitors). */
barLabels.append("tspan")
  .text(row => row.visitors)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5)
	.attr("class", "yLabel");
```

This *sounds* good, but now we have one visual label too many. Screen readers repeating the label makes sense, so that people can keep track of the data. But showing it twice isn't necessary, and in this case adds extra clutter to the visualization.

We can't add  anything like `display: none;` or `visibility: hidden` to our `xLabel`, as those properties also hide the element from screen readers. 

A possible workaround is to change the `x` and `y` positioning in order to move it out of the frame.

```jsx
/* Shows the corresponding value from the x-axis (day of the week). */
barLabels.append("tspan")
  .text(row => row.day)
	.attr("text-anchor", "middle")
	.attr("x", -width)
  .attr("y", -height)
	.attr("class", "xLabel");

/* Shows the corresponding value from the y-axis (# visitors). */
barLabels.append("tspan")
  .text(row => row.visitors)
	.attr("text-anchor", "middle")
	.attr("x", (row, index) => x(index + 1) + 5)
  .attr("y", row => y(row.visitors) + margin.top / 2 - 5)
	.attr("class", "yLabel");
```

<iframe height="650" class="wide" scrolling="no" title="Accessible graph - improvement 6: labels (D3.js)" src="https://codepen.io/fossheim/embed/dyYgJBW?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/dyYgJBW'>Accessible graph - improvement 6: labels (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Possible other improvements

Another good practice is to add a title and description to your graphs. This is something that can be done in pure HTML, like this:

<iframe height="825" class="wide" scrolling="no" title="Accessible graph - improvement 7: extra improvements (D3.js)" src="https://codepen.io/fossheim/embed/ZEbqreb?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/ZEbqreb'>Accessible graph - improvement 7: extra improvements (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We can also add a label to the x-axis, similar to the the one next to the y-axis. Especially when the values on the x-axis are numbers it's advised to add an x-axis that mentions the unit.

It's also good practice to add ticks on the y-axis in addition to the labels above the bars.

<iframe height="825" class="wide" scrolling="no" title="Accessible graph - improvement 8: extra improvements (D3.js)" src="https://codepen.io/fossheim/embed/eYpPMwL?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fossheim/pen/eYpPMwL'>Accessible graph - improvement 8: extra improvements (D3.js)</a> by Sarah Fossheim
  (<a href='https://codepen.io/fossheim'>@fossheim</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

It's also advisable to add the same data in an (accessible!) table elsewhere on your page as well, or provide a link to another page that lists the data in a table. 

## The result

We started with a graph that looked fine, but had a lot of accessibility issues. After going through all the steps in this tutorial, we ended up with a graph that still looks good, but is a lot more accessible. And it took about the same time as it would take us to make the inaccessible version of the graph!

This will be an ongoing series. Upcoming tutorials will focus on different types of graphs, large datasets, complex visualizations and custom functions.

If there's a specific topic, type of visualization, or question you want me to bring up, you can let me know by messaging me on Twitter ([@liatrisbian](https://twitter.com/liatrisbian)). If you enjoy this kind of content, consider [buying me a coffee](https://www.buymeacoffee.com/fossheim) or [becoming a patron](https://www.patreon.com/fossheim).

## More resources

- [Accessibility with Lindsey: Accessible bar charts](https://www.a11ywithlindsey.com/blog/accessibility-d3-bar-charts)
- [Accessibility with Lindsey: Accessible donut charts](https://www.a11ywithlindsey.com/blog/accessibility-d3-donut-charts)
- [Accessible SVG elements on CSS-tricks](https://css-tricks.com/accessible-svgs/)
- [Accessible data visualizations](https://accessibility.digital.gov/visual-design/data-visualizations/)
- [Complex images](https://www.w3.org/WAI/tutorials/images/complex/)
- [Designing accessible data visualizations](https://fossheim.io/writing/posts/accessible-dataviz-design/)
- [Using VoiceOver to evaluate web accessibility](https://webaim.org/articles/voiceover/)
- [How does this data sound? Data visualizations and VoiceOver](https://blog.interactivethings.com/how-does-this-data-sound-945ed27a1a95)