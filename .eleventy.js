module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('static');
  return {
    passthroughFileCopy: true
  }
}