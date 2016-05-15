var tap = require('tap')
var sb = require('./')
// check that stuff gets calleda t times i guess?

tap.test('runs for 4 ticks and then stops, playing 4 notes', function (t) {
  t.plan(6)
  var spiderbite = sb({bpm: 1000})
  spiderbite.bind(true, function (data, section) {
    t.equal(data, section._tick)
  }, [{
      data: [
        [[0], [1], [2], [3]]
      ],
      probs: [
        [1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  }])
  spiderbite.setStructure([[null]])
  spiderbite.onEnd = function () {
    t.ok(true)
  }
  spiderbite.onSectionStart = function (willChange) {
    t.ok(willChange)
  }
  spiderbite.start()
})

// tap.test('runs for 8 ticks and then stops, due to advanceMod', function (t) {
//   t.plan(1)
//   var spiderbite = sb({bpm: 1000,})
//   spiderbite.bind(true, function (data, section) {
//     t.equal(data, section._tick)
//   }, [{
//       data: [
//         [[0], [1], [2], [3]]
//       ],
//       probs: [
//         [0, 0, 0, 0]
//       ],
//       nexts: [
//         [0]
//       ],
//       config: {
//         mod: 1
//       }
//   }])
//   spiderbite.setStructure([[null]])
//   spiderbite.onEnd = function () {
//     t.ok(true)
//   }
//   spiderbite.start()
// })

tap.test('runs through different sections', function (t) {
  t.plan(12)
  var spiderbite = sb({bpm: 1000})
  spiderbite.bind(true, function (data, section) {
    t.equal(data, section._tick)
  }, [{
      data: [
        [[0], [1], [2], [3]]
      ],
      probs: [
        [1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  },
  {
      data: [
        [[0], [1], [2], [3], [4]]
      ],
      probs: [
        [1, 1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  }])
  spiderbite.setStructure([[1], [null]])
  spiderbite.onEnd = function () {
    t.ok(true)
  }

  spiderbite.onSectionStart = function (willChange) {
    t.ok(willChange)
  }
  spiderbite.start()
})

tap.test('runs through different sections of multiple stuff dealing with moduluses as well', function (t) {
  t.plan(25)
  var spiderbite = sb({bpm: 1000})
  spiderbite.bind(true, function (data, section) {
    t.equal(data, section._tick)
  }, [{
      data: [
        [[0], [1], [2], [3], [4], [5], [6], [7]]
      ],
      probs: [
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 2
      }
  }])
  spiderbite.bind(false, function (data, section) {
    t.equal(data, section._tick)
  }, [{
      data: [
        [[0], [1], [2], [3]]
      ],
      probs: [
        [1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  }])

  spiderbite.setStructure([[null]])
  spiderbite.onEnd = function () {
    t.ok(true)
  }
  spiderbite.start()
})

tap.test('runs through different sections with moduluses and calls section starts appropriately', function (t) {
  t.plan(23)
  var spiderbite = sb({bpm: 1000, advanceMod: 2})
  spiderbite.bind(true, function (data, section) {
    t.equal(data, section._tick)
  }, [{
      data: [
        [[0], [1], [2], [3]]
      ],
      probs: [
        [1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  },
  {
      data: [
        [[0], [1], [2], [3], [4]]
      ],
      probs: [
        [1, 1, 1, 1, 1]
      ],
      nexts: [
        [0]
      ],
      config: {
        mod: 1
      }
  }])
  spiderbite.setStructure([[1], [null]])
  spiderbite.onEnd = function () {
    t.ok(true)
  }
  var counter = 0
  spiderbite.onSectionStart = function (willChange) {
    t.ok((++counter % 2 === 0) === willChange)
  }
  spiderbite.start()
})
