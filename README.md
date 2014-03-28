ancestor-of
===========
Preprocess a tree (encoded as a JSON object) so that given any two nodes in the tree it is possible to determine whether one is the ancestor of the other. Ancestor queries take O(1) time, and the data structure requres O(n) space and preprocessing time.

# Example

```javascript
```

# Install

```
npm install ancestor-of
```

# API

### `var ancestorOf = require("ancestor-of")(tree)`
Preprocesses `tree` to answer ancestor queries.

* `tree` is the root of a JSON object tree

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