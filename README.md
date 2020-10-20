# Generating Code Report Automatically

## About

We want to know how healthy about the codes and how database looks like.
If we can have some tool automatically generating these reports while pipeline.

## Installing

```bash
npm i -D npm-run-all
```

## .gitignore

```bash
# documentation
documentation/jest
documentation/typedocs
documentation/schema
documentation/sonar
.scannerwork
```

## Typedoc

![typedoc](https://i.imgur.com/03uvos3.png)

```bash
npm i -D typedoc
```

in `package.json`

```js
{
  "compilerOptions": {
   ...
  },
  "typedocOptions": {
    "inputFiles": ["./src"],
    "mode": "modules",
    "out": "./documentation/typedocs"
  }
}
```

## Schemaspy

![schemaspy](https://i.imgur.com/Xl7xaUH.png)

- add `schemaspy.properties` to your root folder.

### For Backend Api

Using `typeorm` here.

The reason for having nest.js backend here is because I can use `syncronize` to create tables with `entity`, saving me some time to run migration during pipeline.

```bash
npm i @nestjs/typeorm typeorm pg
```

- add `ormconfig.js` in root folder of backend

### Docker

```yml
schemaspy:
  image: schemaspy/schemaspy:latest
  depends_on:
    - postgres
    - backend
  command: ["-configFile", "/config/schemaspy.properties"]
  volumes:
    - ./backend/documentation/schema:/output ## where you want to output
    - ./backend/schemaspy.properties:/config/schemaspy.properties ## read schemaspy config
  networks:
    - backend
```

## Jest Coverage

![jest](https://i.imgur.com/RMPl2pT.png)

in `package.json`,

Setting this to documentation folder: `"coverageDirectory": "../documentation/jest"`

```js
 "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coverageDirectory": "../documentation/jest",
    "testEnvironment": "node"
  }
```

## SonarQube

```bash
npm i -D sonarqube-scanner
```
