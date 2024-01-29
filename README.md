> CI/CD status

[![Netlify Status](https://api.netlify.com/api/v1/badges/29f59259-50b6-4442-8822-c0bccaca785c/deploy-status)](https://app.netlify.com/sites/design-portal-main/deploys)
[![DigitalFlavio](https://github.com/avaya-dux/design-portal/actions/workflows/run-yarn.yml/badge.svg)](https://github.com/avaya-dux/design-portal/actions/workflows/run-yarn.yml)

> react unit test code coverage

![Coverage lines](./badges/badge-lines.svg)
![Coverage functions](./badges/badge-functions.svg)
![Coverage branches](./badges/badge-branches.svg)
![Coverage statements](./badges/badge-statements.svg)

# Welcome to the [Design Portal V3](https://design-portal-vnext.netlify.app/)

> this is a "v-next" of the Design Portal and is a work in progress

## 🚀 Project Structure

As this is an Astro project, it should adhere to the following Astro best practices:

```
/
├── public/
│   └── imgs
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── astro
│   │   |   └── Description.astro
│   │   |   └── index.ts
│   │   └── react
│   │   |   └── DynamnicTheme.astro
│   │   |   └── index.ts
│   ├── layouts/
│   │   └── Layout.astro
│   └── pageletes/
│       └── accessibility
│       └── icons
│   └── pages/
│       └── accessibility
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components or layouts.

Any static assets, like images, should be placed in the `public/` directory.

**When adding a new page**, you _must_ add an exported `title` and `keywords`. This is what the "Search" component uses to populate itself.

## guidelines

Please see [these readmes](https://github.com/avaya-dux/neo-react-library/tree/main/readmes) for general guidelines (PR Best Practices, Dev and A11y Guidelines, ect.)

See [this readme](./readmes/periphery-tech.md) for notes on tech specific to this code base.

## other notes

[CodeSee Diagram](https://app.codesee.io/maps/public/1cb8aa50-346c-11ed-8880-add58adad48c)
[Design Portal Site Traffic and Analytics](https://cronitor.io/reports/33f96a476d0d28a08bf9672d07a36a9e)
