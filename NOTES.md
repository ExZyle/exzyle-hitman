# NPM User Agent String

Source:
* https://github.com/npm/cli/search?q=user-agent&unscoped_q=user-agent
* https://github.com/npm/cli/blob/44ddd0b528732028ea4f38ef15b5826f3f4e2ec1/lib/npm.js#L279
* https://github.com/npm/cli/blob/9c7161de7218b63d487131a4fb67e942b772820e/lib/config/defaults.js#L204

The user agent string is composed as:

`npm/{npm version} node/{node version} {platform} {architeture} {ci}`

Example user agent:

`npm/6.13.6 node/v12.14.0 linux x64`

## NPM Version
Need to find out where to get these. Need to see how we can match npm and node versions

## Node Version
Get the node versions.

## Plarform
The platform type is taken from node's [process.platform](https://nodejs.org/api/process.html#process_process_platform). Currently possible values are:

* `aix`
* `darwin`
* `freebsd`
* `linux`
* `openbsd`
* `sunos`
* `win32`

## Architecture
The architecture is taken from node's [process.arch](https://nodejs.org/api/process.html#process_process_arch). Possible values are:

* `arm`
* `arm64`
* `ia32`
* `mips`
* `mipsel`
* `ppc`
* `ppc64`
* `s390`
* `s390x`
* `x32`
* `x64`

## CI
The continuous integration (CI) comes from [a giant environment switch](https://github.com/npm/cli/blob/44ddd0b528732028ea4f38ef15b5826f3f4e2ec1/lib/npm.js#L286). This may be ommited.
