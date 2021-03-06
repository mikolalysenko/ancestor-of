"use strict"

module.exports = preprocessTreeAncestor

var weakMap = typeof WeakMap === "undefined" ? require("weakmap") : WeakMap

function EulerData(left, right) {
  this.left = left
  this.right = right
}

function preprocessTreeAncestor(root, childrenOf) {
  var euler

  function rebuildAncestor() {
    if(euler && euler.clear) {
      euler.clear()
    } else {
      euler = new weakMap()
    }
    var counter = 0
    function visit(node) {
      var left = counter++
      if(childrenOf) {
        childrenOf(node).forEach(function(child) {
          if((typeof child === "object") && (child !== null)) {
            visit(child)
          }
        })
      } else {
        Object.keys(node).forEach(function(id) {
          var child = node[id]
          if((typeof child === "object") && (child !== null)) {
            visit(child)
          }
        })
      }
      var right = counter++
      euler.set(node, new EulerData(left, right))
    }
    visit(root)
  }

  function ancestorOf(a, b) {
    var aparens = euler.get(a)
    var bparens = euler.get(b)
    return (aparens.left <= bparens.left) && (bparens.right <= aparens.right)
  }
  ancestorOf.rebuild = rebuildAncestor

  rebuildAncestor()
  return ancestorOf
}