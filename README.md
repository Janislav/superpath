# superpath

## About

**superpath** is a simple module to recrusive dissolve paths including
environment varaibles like in a bash or bat script.

## Installation

To install the package run:

    $ npm install superpath
    
## Usage

The following example shows how to use superpath

```javascript

const superpath = require('superpath');
/*
  You can also set the environment in the constructor. Default is
  the os your running the code.
 */
const SuperPath = new superpath.SuperPath();

const env = {
    "HOMEDRIVE": "C:",
    "USERHOME": "C:/Users/test"
};

let path = "%USERHOME%/program/foo.txt";
path = SuperPath.dissolveFromEnvironemnt(path, env);
//path = C:/Users/test/program/foo.txt now!

/*
To solve a path from the current process.env state use the dissolve
function. Like in this example.
 */

path = "%USERHOME%/program/foo.txt";
path = SuperPath.dissolve(path);
//path = C:/Users/test/program/foo.txt now!

```