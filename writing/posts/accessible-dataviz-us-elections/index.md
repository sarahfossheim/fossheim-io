---
pageTitle: "How (not) to make accessible data visualizations, illustrated by the US presidential election."
categories: ["a11y", "data", "design", "front-end"]
date: "2020-11-23"
title: "How (not) to make accessible data visualizations, illustrated by the US presidential election."
excerpt: "Let’s take a look at some important aspects of accessible data visualizations, based on what popular news sources are doing right and wrong."
image: "https://fossheim.io/static/img/a11y-elections-nyt-map.png"
---

In the days around the 2020 US presidential elections a lot of people have been following predictions, results and exit polls quite closely. The majority of news sources published plenty of visualizations, but very few of them in an accessible format.

Let’s take a look at some important aspects of accessible data visualizations, based on what [The New York Times](https://www.nytimes.com/interactive/2020/11/03/us/elections/results-president.html?action=click&module=Spotlight&pgtype=Homepage), [CNN](https://edition.cnn.com/election/2020/results/president?iid=politics_election_national_map#mapfilter=keyrace#mapmode=call), [FiveThirtyEight](https://projects.fivethirtyeight.com/2020-election-forecast/?cid=rrpromo), [The Guardian](https://www.theguardian.com/us-news/live/2020/nov/04/us-election-2020-votes-live-updates-donald-trump-joe-biden-latest-presidential-news-updates) and [Fox News](https://www.foxnews.com/elections/2020/general-results) are doing right and wrong.

## Screen reader support

The main visualizations across all news sources are the electoral college votes for each candidate, and a map showing the results per state.

<img src="/static/img/a11y-elections-nyt-map.png" class="wide" alt="Map of the US with red and blue states highlighted, and a red and blue progress bar on top. From The New York Times" />

Most of these graphs are built either using the `<canvas>` element or SVGs (Scalable Vector Graphics), which both require a bit of extra work to be made accessible. When not keeping accessibility in mind, things like this might happen:

<blockquote class="twitter-tweet" data-lang="en" data-dnt="true"><p lang="en" dir="ltr">I wonder who’s gonna claim the state of Image. <br><br>Video alt: VoiceOver on the mobile version of The Guardian reading every US state on the map as “Image”. <a href="https://t.co/KRs9pustXz">pic.twitter.com/KRs9pustXz</a></p>&mdash; Sarah L. Fossheim (they/them) (@liatrisbian) <a href="https://twitter.com/liatrisbian/status/1324427612723253250?ref_src=twsrc%5Etfw">November 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This is an example from The Guardian (using Safari on iPhone), where VoiceOver reads every state on the map as “image”. 

### Read all the data

One option to improve a graph like The Guardian’s is to add the state name and results to each focusable element of the map by either [adding visually hidden labels](https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/) or using the aria-label property (or alt tags when dealing with images). 

The New York Times takes this approach with their graphs showing the percentage of votes each candidate got, but not in an accessible way. 

<img src="/static/img/a11y-elections-nyt-linegraphs.png" class="wide" alt="Line graphs with the percentage of votes each candidate has in different states" />

VoiceOver reads through the labels on the x and y axis, and the percentage of votes, but not who those votes belong to [full audio transcript](https://pastebin.com/raw/DyLfwnNt). 

<audio controls>
  <source src="/static/audio/nyt-graphs.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Adding an extra "Biden" and "Trump" (or "Democrat" and "Republican") label to the numbers would solve this issue, and also add more visual context. 

Fox News has a similar issue on their electoral college votes progress bars. The main progress bar for each candidate is built by grouping smaller bars representing the states they won. 

Visually, it’s rather easy to distinguish between the two candidates’ votes. However, VoiceOver does not make any difference between them at all.

<img src="/static/img/a11y-elections-fox-progress.png" class="wide" alt="Fox News visualization: two bars, one in blue for Biden and a much shorter one in red for Trump, representing the amount of electoral college votes for each candidate" />

<audio controls>
  <source src="/static/audio/fox-stop-the-count.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Instead, the only information it reads is one long sequence of numbers along the lines of "3 votes, 14 votes, 7 votes," etc ([full audio transcript](https://pastebin.com/raw/YdtDPhSP)). So the context of how many votes belong to Biden, and how many to Trump, gets lost entirely.

```HTML
<div class="bars">
    <div class="bar dem state-va">
        13 votes
        <div class="bar-tooltip" style="display: none;"> 
            <div class="name">Virginia</div>
            <div class="value">13</div>
            <div class="party">Declared Democrat</div>
        </div>
    </div>
</div>
```

There's not much they would need to do to give the "13 votes" some more context for asssistive technology, most of the code is already there. Removing the `display: none;` property and instead visually hiding the tooltip would allow screen readers to read "Virgina, 13, Declared Democrat". 

### Link to an accessible data table

Another option for the Fox News graph is to only read the total number of votes and link to an accessible table for the breakdown instead. That link could be provided in a caption, description or alt text, depending on the format of the graph. This is similar to how complex images are treated.

But it's also important to remember that while a table might make the data available for people using screen readers, it doesn't necessarily provide a good experience. The user still has to the table, and also misses out on context a graph provides. 

### Give data a human voice by using titles and descriptions

In their election forecast, FiveThirtyEight takes a different approach from most other sources.

<img src="/static/img/a11y-elections-538-simulations.png" class="wide" alt="Two FiveThirtyEight election forecast simulations: Electoral college vote distribution for Trump, who wins in 10.4% of simulated outcomes. And Electoral college vote distribution for Biden, who wins in 89.2% of simulated outcomes." />

Let’s take the outcome simulations as an example. These are split into two different visualizations, a red one for Trump and a blue one for Biden.

The x-axis shows the amount of electoral votes, and the y-axis the amount of simulations in which the candidate gets that amount of votes. The length and position of the bars tells us which candidate is more likely to win according to their simulations. There are a lot of blue bars on the right side of Biden’s graph, which means he won in most of their simulations. 

<audio controls>
  <source src="/static/audio/538-simulations.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Since the exact numbers aren’t as important here, VoiceOver doesn’t read or link to them and instead reads a summary of what’s displayed. In this case, it says Trump won in 10% of the simulations and Biden won in 89% of them [full transcript](https://pastebin.com/raw/51fueMYS).


```HTML
<svg class="svg" role="img" aria-labelledby="title-biden desc-biden">
    <title id="title-biden"></title>
    <desc id="desc-biden">
        Electoral college vote distribution for Biden,
        who wins in 89.2% of simulated outcomes.
    </desc>
    ...
</svg>
```

This method works really well for FiveThirtyEight’s type of data. It doesn’t matter in exactly how many simulations Biden got 300 electoral votes, what matters is that in the majority of simulations he won the presidency. 

Unfortunately, the graphs aren’t keyboard accessible, and sighted people still get access to more details than those using assistive technology. 

And while on Mac using VoiceOver their solution provides a much better experience than most other election visualizations, it's also not fully accessible across platforms and browsers. When for example using Edge on Windows, Narrator does not read the title and description of the graph. 

## Keyboard navigation

When graphs are interactive, keyboard navigation should be taken into consideration as well. 

For example, some graphs show more information or filter data when clicking or hovering. It should also be possible to achieve this without a mouse or trackpad, using only the keyboard. Almost none of the election graphs provided this functionality.

When using Chrome on Mac with VoiceOver, the electoral map from ABC did make it possible to navigate through the different states using the arrow keys. 

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Finally managed to find an example of a graph that has keyboard navigation <a href="https://t.co/zlYi9K6jfm">pic.twitter.com/zlYi9K6jfm</a></p>&mdash; Sarah L. Fossheim (they/them) (@liatrisbian) <a href="https://twitter.com/liatrisbian/status/1324403902440181761?ref_src=twsrc%5Etfw">November 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

But it’s also important to note that this isn’t something that works across all screen readers or browsers. Safari and FireFox on Mac had a less optimal experience and on iPhone the navigation didn’t work at all.

And as [Frank Elavsky](https://twitter.com/FrankElavsky?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1324471343002255361%7Ctwgr%5E&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2FFrankElavsky2Fstatus2F1324471343002255361widget%3DTweet) explains really well on [Twitter](https://twitter.com/FrankElavsky/status/1324475334247395328), there are a lot of problems with both VoiceOver and keyboard navigation with NVDA (Windows) on Chrome and IE.

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">We will start with the bar graphic! In NVDA it reads:<br><br>&quot;253 Democrats progress bar 214&quot;<br><br>Both IE and chrome speak this. A bit awkward! It is not entirely clear that 253 is Joe Biden&#39;s electoral votes while 215 is Trump&#39;s.<br><br>Grade: D, barely passing <a href="https://t.co/AgEw3pr6rT">pic.twitter.com/AgEw3pr6rT</a></p>&mdash; Frank ⌁ (@FrankElavsky) <a href="https://twitter.com/FrankElavsky/status/1324461517194973185?ref_src=twsrc%5Etfw">November 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">Sorry typo earlier: Trump is at 214*<br><br>So next is the map&#39;s main area!<br><br>Sadly, keyboard nav does not work in NVDA on IE and Chrome.<br><br>The text reads out, &quot;Map of election results. Use arrow keys to move around the map. Press Enter to view state-level map.&quot;<br><br>Grade: F, Does not work! <a href="https://t.co/ng6vkZ5AXA">pic.twitter.com/ng6vkZ5AXA</a></p>&mdash; Frank ⌁ (@FrankElavsky) <a href="https://twitter.com/FrankElavsky/status/1324463032328548352?ref_src=twsrc%5Etfw">November 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">Encore bonus fail: if I use my mouse and hover the map... NVDA reads out an assertive aria live announcement (which appears to be how the map avoids aria labels).<br><br>Awkward with accidentally bumping the mouse... not a fan.<br><br>Also this label is huge and disordered nonsense! <a href="https://t.co/xk7ejoLuuM">pic.twitter.com/xk7ejoLuuM</a></p>&mdash; Frank ⌁ (@FrankElavsky) <a href="https://twitter.com/FrankElavsky/status/1324471343002255361?ref_src=twsrc%5Etfw">November 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Accessible colors

Color is another important aspect to keep in mind when designing data visualizations. Not enough color contrast can make visualizations and text hard to read, and only relying on color can make the experience for color blind visitors very confusing.

This is a simulation (Monochromacy/Achromatopsia) of The New York Times their main map. Suddenly it's no longer possible to tell which states are Democrat (originally blue) or Republican (originally red):

<img src="/static/img/a11y-elections-nyt-colorblind.png" class="wide" alt="Simulation of The New York Times' election map for full color blindness: everything is the exact same gray, it's no longer possible to tell which state is Democrat or Republican" />

Patterns can be used in addition to colors, although depending on the type of graph and amount of different colors that can become quite distracting.

Very busy visualizations aren’t accessible either, so an alternative is to pick colors with high contrast, or adding additional text labels with context. For example, this map could also have either the candidate or party names listed in addition to the state name.

### Brightness

Another important factor to keep in mind is the brightness or intensity of the color. Very bright colors affect readability, and also make it much harder to focus. For some users it can also [cause anxiety or pain](https://ukhomeoffice.github.io/accessibility-posters/autism).

CNN uses a very bright variation of red and blue throughout their election results page. In addition, they also use a relatively bright yellow to label the battleground states in some of their tables.

<img src="/static/img/a11y-elections-cnn-headache.png" class="wide" alt="CNN's election results: lots of cards with bright blue, bright red and bright yellow colors. It contains the state name, label (battleground state), number of electoral votes, projected winner, votes per candidate, percentage of votes per candidate, follow button, read more button, last updated time, and animated next refresh time" />

## Make data easy to find and understand

Accessibility and usability go closely together. Making data visualizations accessible isn’t just about meeting the technical requirements or making them compatible with assistive technology. It also means making them easy to understand for everyone. Everyone consumes information differently, which is something important to keep in mind.

Adding explanations or conclusions in clear language can be beneficial for people with anxiety, while dyslexic people might prefer visuals over numbers.

FiveThirtyEight’s election forecast does a pretty good job at explaining their graphs. Each graph has a title and description with context, and most of them have a side note with more information about the data or type of visualization.

<img src="/static/img/a11y-elections-538-simulations.png" class="wide" alt="Two FiveThirtyEight election forecast simulations: Electoral college vote distribution for Trump, who wins in 10.4% of simulated outcomes. And Electoral college vote distribution for Biden, who wins in 89.2% of simulated outcomes." />

On top of that, the graphs also have more labels and explanations directly where relevant. The outcome simulations don’t just show the numbers, they also have labels that indicate which candidate is more likely to win. They also highlight some important points, for example the 270 electoral votes threshold.

The Guardian has cards for each of the key states to watch that contain a map, the vote count and breakdown, and an explanation for why the state is important to the election. They were one of the few sources that had an overview like that per state without hiding it behind hover functionality. 

<img src="/static/img/a11y-elections-guardian-cards.png" class="wide" alt="The Guardian's election results: grid of cards. Each card contains: state name, US map with state highlighted, electoral college votes, when the polls closed, how much is left to count, votes for each candidate, percentage of votes for each candidate, and why the results of that state matter" />

At the same time, these cards do contain a lot of information and text, and they all end up looking more or less the same. While the colors are not as bright as those in CNN’s graphs, the view still becomes a bit too cluttered and can be painful on the eyes.

The electoral college votes play a big role in the election. Getting to that information easily is crucial, especially as more results come in and people start calculating which scenarios can still happen. The Guardian’s cards do provide that information, although it gets a bit lost in between all the other content. 

The Guardian, and CNN, have the same information available when hovering over a state on their map as well, although not in a keyboard or screen reader accessible way.

<img src="/static/img/a11y-elections-cnn-hover.png" class="wide" alt="CNN's election map. The mouse is hovering over Nevada, and a pop-up shows a card with Nevada's voting info, containing the same info as in their card overview" />

The New York Times has a separate map for the electoral college votes, where each state is represented by a number of circles representing the amount of votes. While it visualizes the distribution of votes more precisely than a regular map, it doesn’t write out the number anywhere in an accessible way.

<img src="/static/img/a11y-elections-nyt-ev.png" class="wide" alt="The New York Times' election map. The electoral college view is shown, where each state is made out of the same amount of circles as it has electoral college votes" />

The only map that has the numbers available without needing to hover is Fox News. They write the number of votes underneath the state name. For the states that are too small, they write the number of votes next to the map. This is an easier way of getting the exact number than the other news sites provided, and could even be combined with The New York Times map. 

<img src="/static/img/a11y-elections-fox-map.png" class="wide" alt="Fox News' election map. Each state is either red or blue, and contains the state code and number of electoral votes available. For states whose surface area is too small for a label, the state and number of electoral votes are written next to the map" />

Unfortunately, the map from Fox news isn’t screen reader accessible either. VoiceOver reads the entire map as an image without alt text, and then just moves on to the next section. And while they kept the map relatively clean, there's still a lot going on visually _(that white text on the bright red background, for example)_, which in combination with the legend not being easy to spot can feel overwhelming for some as well. 

## How to continue from here

If you’d like to learn more about making graphs like these accessible, I suggest to start by reading the following resources:
- [Data Visualization Accessibility: Where Are We Now, and What’s Next?](https://medium.com/nightingale/data-visualization-accessibility-where-are-we-now-and-whats-next-b2c9eeac4e8b)
- [Data Visualization and Accessibility: Three Recommended Reads and Top Tips](https://towardsdatascience.com/data-visualization-and-accessibility-three-recommended-reads-and-top-tips-9c5e862b464e)
- [Creating accessible SVGs](https://www.deque.com/blog/creating-accessible-svgs/)
- [Five Ways To Design For Red-Green Colour-Blindness](https://www.visualisingdata.com/2019/08/five-ways-to-design-for-red-green-colour-blindness/)
- [Data visualization accessibility](https://accessibility.digital.gov/visual-design/data-visualizations/)
- [Making data visualization accessible: a case study](https://uxdesign.cc/making-data-visualization-accessible-a-case-study-e5fb41ac62ad)
- [Data Visualization: Methods, Tools, Resources: Accessibility and Design](https://guides.library.cornell.edu/c.php?g=898087&p=6489216)
- [An Intro To Designing Accessible Data Visualizations](https://fossheim.io/writing/posts/accessible-dataviz-design/)
- [An Introduction To Accessible Data Visualizations With D3.js](https://fossheim.io/writing/posts/accessible-dataviz-d3-intro/)
- [Accessibility Considerations In Data Visualization Design](https://keen.io/blog/accessibility-in-data-vis/)
- [Case Study: Implementing Accessible Data Charts for the Khan Academy 2018 Annual Report](https://www.sarasoueidan.com/blog/accessible-data-charts-for-khan-academy-2018-annual-report/)
- [Why Accessibility Is at the Heart of Data Visualization](https://medium.com/nightingale/accessibility-is-at-the-heart-of-data-visualization-64a38d6c505b)
- [7 solutions for creating more accessible SVGs](https://simplyaccessible.com/article/7-solutions-svgs/)

Or if you want to learn more about accessibility in general:
- [WCAG (Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [The Accessibility Project](https://www.a11yproject.com/)
- [Solid Start](https://www.solidstart.info/)
- [WebAIM Million](https://webaim.org/projects/million/)
- [Three Starting Points for Making Accessible Digital Content](https://ashleemboyer.com/three-starting-points-for-making-accessible-digital-content)
- [Beginning to Demystify ARIA](https://www.a11ywithlindsey.com/blog/beginning-demystify-aria)
- [Listening to the web, part three: working with screen readers](https://simplyaccessible.com/article/listening-web-part-three-working-screen-readers/)
- [Accessibility Matters](https://www.a11ymatters.com/)