# ZEPLOY

> Automated deployment tool

## Installation

### Local

```bash
npm install zeploy --save
```
or
```bash
yarn add zeploy
```

### Global
```bash
npm install -g zeploy
```
or
```bash
yarn global add zeploy
```

## Usage

create an environment configuration:

```bash
zeploy config prodution
```

edit `.zeployrc` in root directory:

```json
{
  "production": {
    "ssh": {
      "host": "123.45.67.89",
      "username": "root",
      "password": "123456"
    },
    "distPath": "dist", // relative path
    "targetPath": "/project/project-name" // absolute path
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


