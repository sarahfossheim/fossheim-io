const pluginSEO = require("eleventy-plugin-seo");
const xmlFiltersPlugin = require('eleventy-xml-plugin');

const getSimilarCategories = function(categoriesA, categoriesB) {
  return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPlugin(xmlFiltersPlugin);
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Sarah L. Fossheim",
    description: "I'm a multidisciplinary developer and designer, with a strong interest in data science, AI, ethics and accessibility.",
    url: "https://fossheim.io",
    author: "Sarah L. Fossheim"
  });
  eleventyConfig.addCollection("sortedPosts", function(collection) {
    return collection.getFilteredByTag("posts").sort((a,b) => b.date - a.date);
  });
  eleventyConfig.addCollection("featuredPosts", function(collection){
    return collection.getFilteredByTag("posts").filter((post)=>{
      return post.data.featured;
    }).sort((a,b) => {
      const featuredDateA = new Date(a.data.featured);
      const featuredDateB = new Date(b.data.featured);
      return featuredDateB - featuredDateA;
    });
  });
  eleventyConfig.addLiquidFilter("similarPosts", (collection, inputPath, categories) => {
    const similar = collection.filter((post) => {
      return getSimilarCategories(post.data.categories, categories) >= 1 && post.data.page.inputPath !== inputPath;
    }).sort((a,b) => {
      return getSimilarCategories(b.data.categories, categories)  - getSimilarCategories(a.data.categories, categories);
    });

    return similar.length >= 2 ? similar : [];
  });
  return {
    passthroughFileCopy: true
  }
}
