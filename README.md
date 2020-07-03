# ZEPLOY

> Automated deployment tool

## Installation and Usage

### Local

#### Installation

```bash
npm install zeploy --D
```
or
```bash
yarn add zeploy -D
```

#### config
create an environment configuration:

```bash
./node_modules/.bin/zeploy config production
```

### Global

#### Installation
```bash
npm install -g zeploy
```
or
```bash
yarn global add zeploy
```
#### config
create an environment configuration:

```bash
zeploy config production
```

## Configuration

edit `zeploy.config.js` in root directory:

```js
module.exports = {
  "production": {
    "ssh": {
      "host": "123.45.67.89",
      "username": "root",
      "password": "123456"
    },
    /** Relative path */
    "distPath": "dist",
    /** Absolute path */
    "targetPath": "/project/project-name",
    /** Save the number of published versions(default 10) */
    "keepReleases": "10",
    /** Can only be executed if the environment name is exactly the same as the branch name */
    "checkBranch": false
  }
}
```

then deploy your project:
```bash
zeploy publish production
```

result:

```
// your distPath
dist
- index.html
- static
  - css
    - app.css
  - img
  - js
    - 0.js
    - 1.js
    - 2.js
    - app.js
    - vendor.js
    - manifest.js
```

```
// your targetPath
project
  - project-name
    - releases
    - dist
      - index.html
      - static
        - css
          - app.css
        - img
        - js
          - 0.js
          - 1.js
          - 2.js
          - app.js
          - vendor.js
          - manifest.js
```
