---
template: post.liquid
pageTitle: "Creating a similar post component with Eleventy"
date: "2020-04-01"
categories: ["tutorial", "front-end", "eleventy", "javascript"]
title: "Creating a similar post component with Eleventy"
excerpt: "How I added a similar post component to my blog with Eleventy and Liquid."
image: "https://fossheim.io/static/img/eleventy-similar-posts.png"
---

When updating my portfolio design, I wanted to create a component that automatically displays similar posts at the bottom of each blog post. Because I couldn't find any tutorials on how to achieve that, I thought it would be a good idea to share my solution.

<img src="/static/img/eleventy-similar-posts.png" alt="two similar blog posts in big colored containers at the bottom of each of my posts" class="wide" />

There's different ways of defining similar posts, but I decided to go for a simple first version: posts are considered similar to each other if they have one category or more in common. For some posts this list can grow quite long, so I limited the component to only show the two posts with the highest number of common categories.

## Filtering posts

The main functionality for this feature is added in the Eleventy config file (most likely called `.eleventy.js`), where we'll create a custom filter.

```JS
eleventyConfig.addLiquidFilter("similarPosts", (collection, path, categories) => {});
```

The way filters are defined is dependent on which templating language you're using, in my case Liquid. Other variations can be found in the Eleventy [filter documentation](https://www.11ty.dev/docs/filters/).

The filter will receive three inputs:

- `collection`: the collection of posts that should be filtered
- `path`: the path to the active post
- `categories`: the categories of the active post

We only want to return posts that have at least one category in common, which I solved this way:

```JS
eleventyConfig.addLiquidFilter("similarPosts", (collection, path, categories) => {
    return collection.filter((post) => {
        return post.data.categories.filter(Set.prototype.has, new Set(categories)).length >= 1;
    });
});
```

This will return a list of posts that have at least one category in common. However, the current post is included in this list as well. We don't want to display the post we're looking at in its own list of similar posts, so it has to be filtered out:

```JS
eleventyConfig.addLiquidFilter("similarPosts", (collection, path, categories) => {
    return collection.filter((post) => {
        return post.data.categories.filter(Set.prototype.has, new Set(categories)).length >= 1
            && post.data.page.inputPath !== path;
    });
});
```

This returns the correct list of similar posts, but not yet sorted by similarity. Using the same way of detecting overlapping categories as above, we can now sort our posts as well:

```JS
eleventyConfig.addLiquidFilter("similarPosts", (collection, path, categories) => {
    return collection.filter((post) => {
        return post.data.categories.filter(Set.prototype.has, new Set(categories)).length >= 1
            && post.data.page.inputPath !== path;
    }).sort((a, b) => {
        return b.data.categories.filter(Set.prototype.has, new Set(categories)).length - a.data.categories.filter(Set.prototype.has, new Set(categories)).length;
    });
});
```

Which after some code clean-up looks like this:

```JS
const getSimilarCategories = function(categoriesA, categoriesB) {
    return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
}

module.exports = function(eleventyConfig) {
    ... // Other configs
    eleventyConfig.addLiquidFilter("similarPosts", function(collection, path, categories){
        return collection.filter((post) => {
            return getSimilarCategories(post.data.categories, categories) >= 1 && post.data.page.inputPath !== path;
        }).sort((a,b) => {
            return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories);
        });
    });
}
```

## Liquid component

Now the only thing left is connecting this to our blog post component. I use Liquid templates, but the principle is the same when using other templating languages.

```
{{ "{% assign similar = collections.sortedPosts | similarPosts: page.inputPath, categories %}" | escape }}
<ul>
    {{ "{% for post in similar limit: 2 %}" | escape }}
        <li>
            <a href="{{ "{{ post.url " }}}}">{{ "{{ post.data.pageTitle " }}}}</a>
        </li>
    {{ "{% endfor %}" | escape }}
</ul>
```

## More sources

- [Eleventy tutorials](https://www.11ty.dev/docs/tutorials/)
- [Eleventy filters](https://www.11ty.dev/docs/filters/)
- [Building a blog with Eleventy](https://www.filamentgroup.com/lab/build-a-blog/)
- [Liquid documentation](https://shopify.github.io/liquid/)
- [Learn Eleventy from scratch](https://piccalil.li/course/learn-eleventy-from-scratch/)
- [Getting started with Eleventy](https://dev.to/lauragift21/getting-started-with-eleventy-4ofg)
- [Making a simple website with Eleventy](https://www.zachleat.com/web/eleventy-tutorial-level-2/)
- [Beginner's Guide to Eleventy](https://tatianamac.com/posts/beginner-eleventy-tutorial-parti/)