# Development notes

## Install Electron

```terminal
$ npm install --verbose electron --save-dev --save-exact
```

Note: Windows 10, for some reason this does not work in Git Bash, had to use PowerShell.


## Upgrade NPM on Windows

As administrator in PowerShell:

```terminal
PS C:\Users\ilesik\prj\js_clock> npm -version
3.10.10
PS C:\Users\ilesik\prj\js_clock> npm install -g npm
PS C:\Users\ilesik\prj\js_clock> npm -version
5.6.0
```


## Make Node project - Thu, Dec 28, 2017  4:13 PM

```terminal
$ npm install
npm WARN enoent ENOENT: no such file or directory, open 'C:\Users\ilesik\prj\js_clock\package.json'
npm WARN js_clock No description
npm WARN js_clock No repository field.
npm WARN js_clock No README data
npm WARN js_clock No license field.
```

### Make .gitignore file and add `node_modules` to the list of ignored files.

```terminal
$ echo "node_modules" > .gitignore
```

Add VI temp files to the list.

```terminal
$ cat .gitignore
node_modules
*~
*.swp
*.swo
```

### Make initial `package.json` with `npm init`.

```terminal
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

name: (js_clock)
version: (1.0.0) 0.0.1
description: Clock App
entry point: (index.js) src/main.js
test command:
git repository: (https://github.com/curoles/js_clock.git)
keywords: clock
author: Igor Lesik
license: (ISC) MIT
About to write to C:\Users\ilesik\prj\js_clock\package.json:
```

## Begin - Thu, Dec 28, 2017  3:58:05 PM

Made an empty repo at Github with just 2 files: LICENSE and README.md.

### Init local repo, add and pull remote.

```terminal
$ git init
$ git remote add origin https://github.com/curoles/js_clock.git
$ git remote show origin
$ git pull origin master
```

### GIT commit log with all changes

```terminal
 git log --full-diff -p
```

### Turn Off autocrlf

```terminal
git config core.autocrlf false
```

Using Windows, but editors should handle single LF.
