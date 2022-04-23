# files-tree
For recursive query folder under all documents and file information

## Installation:

```sh
npm install files-tree --save
```
## Usage:
```javascript
var util = require('files-tree'),
    path = './',
    tree = util.tree(path); //recursion
console.log(tree);

/**output**/
[
  {
    "path": "./index.js",
    "name": "index.js",
    "size": 3051,
    "directory": false, // Is directory
    "file": true    // Is file
  },
  {
    "path": "./package.json",
    "name": "package.json",
    "size": 662,
    "directory": false,
    "file": true
  },
  {
    "path": "./test",
    "name": "test",
    "size": 0,
    "directory": true,
    "file": false,
    "list": [   // All files in the folder
      {
        "path": "./test/index.js",
        "name": "index.js",
        "size": 261,
        "directory": false,
        "file": true
      }
    ]
  }
]
```

## API:
__list(path,[options])__
###### Export files in current folder
* `path` string, by default './'
* `options` object,specific filter and setting
* `options.suffix` string,defining a specific file suffix
* `options.ignore` string,file name or folder name ,ignore specific file or folder
* `options.md5` boolean,return the md5 value of the file

__tree(path,[options])__
###### In accordance with the tree structure of all directories and subdirectories in the file
* `path` string, by default './'
* `options` object,specific filter and setting
* `options.suffix` string,defining a specific file suffix
* `options.ignore` string,file name or folder name ,ignore specific file or folder
* `options.md5` boolean,return the md5 value of the file

__allFile(path,[options])__
###### Export files in all directories and subdirectories
* `path` string, by default './'
* `options` object,specific filter and setting
* `options.suffix` string,defining a specific file suffix
* `options.ignore` string,file name or folder name ,ignore specific file or folder
* `options.md5` boolean,return the md5 value of the file



