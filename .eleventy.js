const pluginSEO = require("eleventy-plugin-seo");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Sarah Fossheim",
    description: "I'm a multidisciplinary developer and designer, with a strong interest in data science, AI, ethics and accessibility.",
    url: "https://fossheim.io",
    author: "Sarah L. Fossheim"
  });
  eleventyConfig.addCollection("sortedPosts", function(collection) {
    console.log("posts", collection.getFilteredByTag("posts"));
    return collection.getFilteredByTag("posts").sort((a,b) => b.date - a.date);
  });
  return {
    passthroughFileCopy: true
  }
}
