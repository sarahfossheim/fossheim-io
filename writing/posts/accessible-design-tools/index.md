---
pageTitle: 'Tools for designing good-looking accessible interfaces'
categories: ['design', 'figma', 'a11y']
featured: "2020-02-06"
date: '2019-12-21'
title: 'Tools for designing good-looking accessible interfaces'
excerpt: "A list of plugins, websites and resources for accessible web design"
image: "http://fossheim.io/static/img/a11y-colorblind-menu.png"
---

It's important for me that everything I design is both accessible, ethical and user friendly. And to be fair, the three really go hand-in-hand. A product cannot be *friendly* if it's harmful or inaccessible.

Interfaces can be aesthetically pleasing, while also remaining accessible. And luckily, these days there are a lot of tools out there to help us achieve that!

## Figma plugin: Color Blind

[Color blind](https://www.figma.com/c/plugin/733343906244951586/Color-Blind) for Figma is one of the best tools to test how designs look for people with different types of colorblindness. 

<img class="wide" src="/static/img/a11y-colorblind-menu.png" alt="Screenshot of the color blind plugin for Figma" />

It's free and very thorough, but the only downside is that it doesn't work for images. And you have to re-run the plugin and create new copies whenever you make changes. 

<img class="wide" src="/static/img/a11y-colorblind.png" alt="Screenshot of the color blind plugin for Figma" />

It's easiest to create a separate accessibility page and run the plugin from there. That way old versions can be kept for comparison without making the main "working" page too cluttered.

**Alternatives**

- [Stark](https://www.figma.com/c/plugin/732603254453395948/Stark)
- [whocanuse](https://whocanuse.com/) 

## Figma plugin: Able

[Able](https://www.figma.com/c/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) is a great option for checking the contrast of text. Select two layers and the plugin will tell you what the values are and whether it passes [WCAG accessibility guidelines](https://www.w3.org/TR/WCAG20/) or not.

<img class="wide" src="/static/img/a11y-able.png" alt="Screenshot of the Able plugin for figma" />

**Alternatives**

- [A11y contrast checker](https://www.figma.com/c/plugin/733159460536249875/A11y---Color-Contrast-Checker)
- [Stark](https://www.figma.com/c/plugin/732603254453395948/Stark) 

## Color inspiration

At first it might feel a bit overwhelming or intimidating when finding out your colors need more contrast, but that doesn't mean you have to go for *"ugly"* or *"boring"* colors.

You shouldn't pick the first high-contrast color combination that you come across. In fact, even if a color combination passes the WCAG guidelines, it still might not be fully accessible. For example a combination of very bright colors might have enough contrast, but could become painful on the eyes over time. 

Testing colors against accessibility guidelines should happen early-on in the process, enough time should be set aside for it. 

### Colorable 

I often use color palette generators in combination with Figma's accessibility plugins when deciding on color schemes. They're good for inspiration and push me to explore combinations I usually wouldn't think of. 

[Colorable](https://colorable.jxnblk.com/) is really useful one for that. It randomizes predefined color combinations and includes pass/fail scores for the WCAG accessibility guidelines.

<img class="wide" src="/static/img/a11y-colorable.png" alt="Screenshot of colorable" />

Instead of using the randomization functionality, you can also paste your own color codes, or modify the hue, saturation and lightness.

The scores get live-updated accordingly, so it's a very easy and user-friendly way of experimenting with different color combinations.

### Khroma

Another good color generator is [Khroma](http://khroma.co/). It generates an infinite amount of color combinations based on colors you like, and also includes values with regards to the WCAG. 

<img class="wide" src="/static/img/a11y-khorma.png" alt="Screenshot of Khroma" />

They do still show combinations that fail the guidelines, so make sure to always double-check the values in the info panel.

If in some case an accessible color scheme doesn't meet other (branding) requirements, a possibility is to create "accessibility settings" where people can choose a different color scheme, font or text size. 

## More than just color

This article mainly focused on tools and resources for color and contrast, but accessibility is a lot more than that. 

Font-size, language, animations, scrolling behavior, sounds, patterns and so much more all influence how accessible something is for a wide variety of people. 

While I haven't found any tools that can test or automate feedback on those aspects of design, I did compile a list with tips and guidelines that include those aspects as well:

- [Do and don'ts on designing for accessibility](https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/).
- [Accessibility for teams](https://accessibility.digital.gov/).
- [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG20/).
- [Accessible color systems](https://stripe.com/en-no/blog/accessible-color-systems).
- [Why accessibility drives aesthetics](https://uxdesign.cc/accessibility-drives-aesthetics-5aef77b5d2aa?).
- [AccessAbility Handbook](https://www.rgd.ca/database/files/library/RGD_AccessAbility_Handbook.pdf).
- [Inclusive and accessible user interfaces](https://trydesignlab.com/blog/40-tips-inclusion-accessibility-user-interface-design/).
- [a11y style guide](https://a11y-style-guide.com/style-guide/).
- [Reading grade](https://www.perrymarshall.com/grade/).
- [a11y project](https://a11yproject.com/).

## For developers

There are good accessibility tools out there for developers as well, but I'll write a separate list on how I work with accessibility when coding.

As a start, try to navigate your product with VoiceOver on, and turn off css now and then to see if your content is still understandable without it *(for example, where do absolutely positioned blocks of text end up when css is turned off)*.