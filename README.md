ancestor-of
===========
Preprocess a tree (encoded as a JSON object) so that given any two nodes in the tree it is possible to determine whether one is the ancestor of the other. Ancestor queries take O(1) time, and the data structure requres O(n) space and preprocessing time.

# Example

```javascript
var preprocess = require("ancestor-of")

//Construct some tree
var tree = {
  a: {
    x: {},
    y: {}
  },
  b: [ [], [[]] ]
}

//Construct ancestorOf data structure
var ancestorOf = preprocess(tree)

//Now we can check ancestor relations on elements of tree:
var assert = require("assert")

assert.ok(ancestorOf(tree.a, tree.a.x))
assert.ok(!ancestorOf(tree.a.ax, tree.a))
assert.ok(!ancestorOf(tree.b, tree.a))
assert.ok(ancestorOf(tree.b, tree.b[1][0]))
```

# Install

```
npm install ancestor-of
```

# API

### `var ancestorOf = require("ancestor-of")(tree[,filter])`
Preprocesses `tree` to answer ancestor queries.

* `tree` is the root of a JSON object tree
* `filter(node,child)` is an optional function, which if passed determines which subtrees the augmentation is applied to.  The interpretation of these arguments is:

    + `node` is the subtree node
    + `child` is a string representing the child property of node

    `filter` should return a truthy value if `node[child]` should be augmented, or a falsey value if it should be skipped.

**Returns** A query which answers ancestor queries

### `ancestorOf(a,b)`
Determine if `b` is an ancestor of `a`

* `a` is the first node
* `b` is the node which is tested to be ancestor of `a`

**Returns** `true` if `b` is an ancestor of `a`, otherwise `false`

### `ancestorOf.rebuild()`
Rebuild the data structure if some of the children of `tree` have changed.

# Credits
(c) 2014 Mikola Lysenko. MIT License