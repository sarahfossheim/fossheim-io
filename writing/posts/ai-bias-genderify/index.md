---
template: post.liquid
pageTitle: 'Thoughts on Genderify, gender discrimination, transphobia, and (un)ethical AI.'
date: '2020-07-29'
categories: ['AI', 'ethics', 'technology', 'inclusive design', 'data']
title: 'Thoughts on Genderify, gender discrimination, transphobia, and ethical AI.'
excerpt: 'Tech like genderify is harmful, both because of its own biases and the possibility it gives third parties to cause (un)intentional harm to minoritized communities.'
image: 'https://fossheim.io/static/img/ai-bias-genderify-header.png'
---

Earlier this week Genderify, an AI-driven platform that “identifies” users’ gender based on their name, launched and listed themselves on ProductHunt. They received **a lot** of very valid criticism both on ProductHunt and other social media, but I think they’re worthy of some more criticism from me on here as well.

Let’s start by taking a closer look at what Genderify really does. This is what they state on their ProductHunt page:

_Genderify is an AI-based platform that instantly identifies the person’s gender by their name, username, or email. Our system can check an unlimited number of names, usernames, and emails to determine even the false ones and most incomprehensible combinations._

In practice, this means that you can enter any name, username or email address, and their platform will return two numbers: how confident they are that the person is male or female.

<img src="/static/img/ai-bias-genderify-header.png" alt="Search field of Genderify's website showing we searched for the name Riley. The results show two percentages: 4% likely to be male, 96% likely to be female" class="wide" />

They make those predictions using data they obtained from publicly available governmental sources, and information from social networks.

<img src="/static/img/ai-bias-genderify-collection.png" alt="Screenshot of Genderify'ss Q&A page. The question is how they collect data. They answer the following: We use integrated multi-source data to deliver the most accurate results. We combine the data from publicly available governmental sources with the information obtained from the social networks to ensure the best possible matches. Each name is added to our database by verifying the data obtained from different sources." class="wide" />

They’re not clear how they obtained this information though, or which social networks they’re talking about, so it’s hard to go into detail about their training data, but they definitely did start with a biased dataset, even [admitting so themselves on Twitter](https://twitter.com/genderify/status/1288241503488204800).

<img src="/static/img/ai-bias-genderify-tweet.png" alt="Tweet by Genderify that says the following: Thanks for the feedback, since AI is trained on existing data, this is an excellent example to show bias is in the data available around us." class="wide" />

Most surveys, sign-up forms and government data don’t include genders outside of the binary. As I talked about in [a previous article](https://fossheim.io/writing/posts/non-binary-design/), the majority of forms only offer two options: male or female, entirely erasing non-binary people from their training data.

Then there’s also the issue that whether names are considered _“male”_, _“female”_ or _“neutral”_ is dependent on country, culture and language. It’s unclear how those are all represented in the datasets they used, but there’s a good chance that it’s heavily skewed towards the American perspective, if that’s where the majority of their data is collected.

So that biased, incorrect and incomplete dataset is what will decide which gender a user has based on their name or email address. What could possibly go wrong?

As of now, their AI only outputs numbers for two options, male and female. By doing so they not only erase, but also misgender, everyone outside of the gender binary.

A non-binary person will be given a male or female label based on their name. Even if they have a name that to most people in their culture is considered neutral, the system will still say they’re “most likely male” or “most likely female”.

This is very similar to giving people only two options to choose from on a form, which is already bad, with the difference being that an automated guess takes all choice away from the user and just assumes gender, making Genderify even worse.

Being misgendered is harmful enough already as it is, we don’t need tech companies to provide it as a service.

They are consistent though, as their predictions are wildly inaccurate for everyone, and don’t just affect trans and non-binary people. Some [men got classified as women](https://twitter.com/seldo/status/1288151563588919297), [Hillary Clinton was assumed to be a man](https://twitter.com/leamiserables/status/1288225862119313409), [so was Oprah Winfrey](https://twitter.com/schock/status/1288241823543169030), [trash is considered male](https://twitter.com/liatrisbian/status/1288184469082517504) and [male is considered female](https://twitter.com/downziggurat/status/1288240128909905920). I also tried to run the same name _(Mathilde)_ once by itself, and once with a last name included _(Mathilde Fossheim)_. Mathilde was labeled as a woman (85%), Mathilde Fossheim was labeled as a man (77%).

<img src="/static/img/ai-bias-genderify-mathilde.png" alt="Screenshot of the results for Mathilde (85% chance of being a woman) versus Mathilde Fossheim (77% chance of being a man)" class="wide" />

And as was pointed out by several Twitter users, they give very biased and sexists results for personality traits and professions as well. [Adding a Dr. title to someone’s name instantly changes their assumed gender from female to male](https://twitter.com/schock/status/1288243807369256960), [nurse is labeled as female while doctor is labeled as male](https://twitter.com/_alialkhatib/status/1288179135211114497), [wise is male and pretty is female](https://twitter.com/RWerpachowski/status/1288232561592991750), and the list goes on.

It’s not particularly clear what they expect people to use this API for, since in general it’s cheaper, easier and more accurate to just ask people their gender (or even better, to not collect any gender information at all).

Some are suggesting their service could mainly be “useful” for automating marketing and advertising, but there focusing on gender can again lead to reinforcing stereotypes.

But nothing is restricting their software from being used for other purposes. They praise themselves for having an easy to use API, starting from as low as $10 after the free trial expires. This means anyone can set it up and run an analysis on any dataset they have access to.

In those instances, being mislabeled by the system could for example mean being addressed with the wrong pronouns, losing access to information ([think of the “women only” app that used facial recognition to determine whether you were allowed access](https://www.theverge.com/2020/2/7/21128236/gender-app-giggle-women-ai-screen-trans-social)), or facing discrimination based on assumed gender.

They now also provide the option to correct them if they mislabeled anyone, saying they’re _“going to improve [their] gender detection algorithms for the LGBTQ+ community”._

<img src="/static/img/ai-bias-genderify-lgbtq.png" alt="Screenshot of Genderify's new hompage, where after getting the results for a name there's an extra input box saying: Don't agree with the results, suggest yours. In the screenshot non-binary is entered as a correction for the name Sarah" class="wide" />

This means that at some point they could even try to predict whether someone is more likely to be non-binary or trans based on their name. Given the harassment trans people already face ([just earlier a Trump rally chanted to “Kill transgenders!”](https://www.lgbtqnation.com/2020/07/trump-supporter-starts-kill-transgenders-chant-rally/)), providing free software to anyone that wants to try and identify them is outright dangerous.

Products like Genderify are harmful. They’re built on top of biased and inaccurate data, by people who seem to have no interest in risk management or the societal impact of their product, and released for basically no cost into the open for anyone to use.

I talked a lot about Genderify in this article, but the same criticism goes for a lot of other tech products. In 2017, researchers tried to [build an AI that based on pictures predicts if someone’s gay](https://medium.com/@blaisea/do-algorithms-reveal-sexual-orientation-or-just-expose-our-stereotypes-d998fafdf477), and just as recent as June 2020 a [tool to depixelate faces was released](https://twitter.com/tg_bomze/status/1274098682284163072?lang=en). Then there’s also the examples of [law enforcement using racist AI](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), [racist AI being used for dynamic pricing](https://venturebeat.com/2020/06/12/researchers-find-racial-discrimination-in-dynamic-pricing-algorithms-used-by-uber-lyft-and-others/) and [racist search engines](https://www.academia.edu/1975319/Missed_Connections_What_Search_Engines_Say_About_Women), and the list goes on.

We really need to do better as an industry, and make ethics and risk management a larger priority. We can’t keep building unethical, discriminatory, racist, sexist, homophobic and transphobic products. If it’s not ethical, inclusive and accessible, it’s not innovation.

More reading material:

- [Algorithms of oppression](https://www.goodreads.com/book/show/34762552-algorithms-of-oppression) (book)
- [Automating inequality](https://www.goodreads.com/book/show/34964830-automating-inequality) (book)
- [Race after technology](https://www.goodreads.com/book/show/42527493-race-after-technology) (book)
- [Weapons of math destruction](https://www.goodreads.com/book/show/28186015-weapons-of-math-destruction?ac=1&from_search=true&qid=dN1hL0r66S&rank=1) (book)
- [Technically wrong](https://www.goodreads.com/book/show/38212110-technically-wrong) (book)
- [How surveillance has always reinforced racism](https://www.wired.com/story/how-surveillance-reinforced-racism/) (article)
- [Data science ethics](https://www.coursera.org/learn/data-science-ethics) (course)
- [Tarot cards of tech](http://tarotcardsoftech.artefactgroup.com/) (tool)

---

_Edit 1_: At the time of writing more issues related to Genderify popped up. For example, [they show a list of live requests](https://twitter.com/MarieChatfield/status/1288154244047163392) (including full names and gender prediction) on the front page of their website, making it disappointing with regards to privacy as well.

<img src="/static/img/ai-bias-genderify-privacy.png" alt="Screenshot of a table on Genderify's website showing all the recent searches, including name (firsr column), male percentage (second column) and female percentage (third column)" class="wide" />


_Edit 2_: A bit more research into their company also showed that they’re owned by [SmartClick](https://smartclick.ai/), an Armenian company creating AI solutions for a wide range of industries, [creating products that predict tax fraud](https://smartclick.ai/industries/) and [face obstruction detection systems](https://twitter.com/GameDadMatt/status/1288355360806379521). [@GameDadMatt](https://twitter.com/GameDadMatt) on Twitter [posted his research](https://twitter.com/GameDadMatt/status/1288355353692758016) into their company as well.

_Edit 3_: Genderify is meanwhile removed from Twitter, ProductHunt and SmartClick’s LinkedIn profile, and the website seems to be taken offline as well. No official statement has been made by them yet, and it’s unclear whether they killed the product entirely, or will still be selling it to their customers, or re-release it later under a different name again.

Either way, this kind of tech is harmful, both because of its own biases and the possibility it gives third parties to cause (un)intentional harm to minoritized communities.