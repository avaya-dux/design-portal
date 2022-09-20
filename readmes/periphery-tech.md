# periphery tech

- we use `@astrojs/netlify/functions` to provide the DP at "the edge"
- we use `@astrojs/prefetch` to prefetch all pages that branch from the page that the user is currently viewing
- we use [netlify-plugin-a11y](https://github.com/netlify-labs/netlify-plugin-a11y) to run accessibility check on every PR
- we use [netlify-plugin-lighthouse](https://github.com/netlify/netlify-plugin-lighthouse) to generate a lighthouse report for every deploy
