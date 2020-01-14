# rcload

Find and load json configuration from a package.json property, rc file, or CommonJS module.

Heavily inspired by [cosmiconfig](https://www.npmjs.com/package/cosmiconfig), but super simplified for minimal bundlesize.
The big difference from cosmiconfig is that **rcload does not support yaml files**.

**rcload** will search for the following:

- a `package.json` property
- a JSON extensionless "rc file"
- an "rc file" with the extensions `.json` or `.js`
- a `.config.js` CommonJS module

It is also meant as a partial drop-in replacement which means it return a `result` object same as cosmiconfig.

## Usage

Install as a dependency.

```
npm i rcload
```

Use in your application.

```
const rcload = require('rcload');

const result = rcload('myapp');
```

## Result

The result object has the following properties:

- `config`: The parsed configuration object. `undefined` if the file is empty.
- `filepath`: The path to the configuration file that was found.
- `isEmpty`: true if the configuration file is empty.

In contrast to cosmiconfig, `isEmpty` will remain in the result object when the config is found, e.g.:

```
const result = rcload('myapp');
// {
//     config: {
//         ...
//     },
//     filepath: "/users/johndoe/www/myapp/.myapprc",
//     isEmpty: false
// }
```

## Options

**rcload** takes an options object:

- `cwd`: the full directory path to search in. Common for `package.json` and rc files. Defaults to `process.cwd()`.

If you want your config files in another directory this will help, e.g.:

```
rcload('myapp', {
    cwd: path.join(process.cwd(), 'configs')
})
```

## Differences from [cosmiconfig](https://www.npmjs.com/package/cosmiconfig)

- Supports only JSON and CommonJS formats.
- Only looks in `process.cwd()`.
- Limited options.
- Only synchronous load.
