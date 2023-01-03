<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Monitor Actions

Carbon Web used this template to bootstrap the creation of a TypeScript action.:rocket: Please **package this project before committing to main** if you want workflows to use the latest commit. More info below.

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## (Carbon Web) Push to main

**Carbon Web Note:** If you made a code change, you must `package` the project and commit the `dist` folder in order for our workflows to use the latest version of this action.

Typically, this is done on a release branch (see below), but because this action is so tightly coupled to Integromat and used internally, I believe it will be OK for us to always checkout the head of the `main` branch in our workflows.

```bash
$ npm run package
$ git add dist
# commit and push to main
```

## (Not implemented) Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
