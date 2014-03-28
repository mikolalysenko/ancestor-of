"use strict"

var tape = require("tape")
var preprocess = require("../ancestor-of")

tape("ancestor-of", function(t) {

  function verifyQuery(tree, ancestorOf) {
    var nodes = []
    var parents = []

    function visit(node, parent) {
      var idx = nodes.length
      nodes.push(node)
      parents.push(parent)
      Object.keys(node).forEach(function(id) {
        var child = node[id]
        if(typeof child === "object" && child !== null) {
          visit(child, idx)
        }
      })
    }
    visit(tree, -1)

    function ancestorBruteForce(i, j) {
      while(j >= 0) {
        if(i === j) {
          return true
        }
        j = parents[j]
      }
      return false
    }

    for(var x=0; x<nodes.length; ++x) {
      for(var y=0; y<nodes.length; ++y) {
        t.equals(ancestorOf(nodes[x], nodes[y]), ancestorBruteForce(x, y), "ancestorOf(" + x + "," + y + ")")
      }
    }
  }

  function verifyTree(tree) {
    var ancestorOf = preprocess(tree)
    verifyQuery(tree, ancestorOf)
    ancestorOf.rebuild()
    verifyQuery(tree, ancestorOf)
  }

  verifyTree({
    bar: { name: "bar" },
    baz: {
      name: "baz",
      zardoz: {
        golub: {},
        potato: {
          x: 1,
          y: 2,
          z: 3,
          f: {
            p: 1,
            q: {},
            xx: [
              {},
              {},
              {},
              [ [], [], [] ]
            ]
          }
        }
      }
    }
  })

  verifyTree([[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]])

  verifyTree({ x: null })



  t.end()
})