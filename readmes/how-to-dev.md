# how to dev

## first steps

- use [NodeJS LTS](https://nodejs.org/) (preferably via nvm, [mac nvm](https://tecadmin.net/install-nvm-macos-with-homebrew/) | [windows nvm](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows))
- run `npm install -g yarn`
- run `yarn all`, which will install all dependancies, run linting, build the project, and run jest+cypress tests
- to run a development build of the project, run `yarn start`

## to build a production version of the project

```
yarn build
```

NOTE: Usually you won't need to build a production version of project, as it auto-deploys via Github integration to [Netlify](https://www.netlify.com/), however this command can be useful for troubleshooting build issues locally.

## testing commands

Run tests

```
yarn test
```

Run UI tests

```
yarn test:ui
```

Run tests in watch mode

```
yarn test:watch
```

Run jest tests and display the code coverage results

```
yarn test:coverage
```

Use VS Code's debugger tool to debug tests or a single test. See "Debug CRA Tests" or "Debug Specific Test" in the debugger dropdown.

[See here for the full description](https://jestjs.io/docs/en/troubleshooting) of how to debug in Chrome and/or VS Code.

## linting

```
yarn lint
```

```
yarn lint --fix
```

## before commiting to this repo, please read

- our [accessibility guidelines](./accessibility-guidelines.md)
- our [coding guidelines](./coding-guidelines.md)
- and the team's [PR best practices](./pr-best-practices.md)
