var tap = require('tap')
var sb = require('./')
// check that stuff gets calleda t times i guess?



tap.test('fails if no data is bound', function (t) {
  t.plan(1)
  var spiderbite = sb({bpm: 120})
  try {
    spiderbite.start()
  } catch (e) {
    t.equal(e, 'no data is bound')
  }
})


tap.test('fails if no structure is bound', function (t) {
  t.plan(1)

  var spiderbite = sb({bpm: 120})
  spiderbite.bind(function () {}, [{}, {}])

  try {
    spiderbite.start()
  } catch (e) {
    t.equal(e, 'no structure is bound')
  }
})


tap.test('fails when trying to bind data that does not match existing data', function (t) {
  t.plan(1)

  var spiderbite = sb({bpm: 120})
  spiderbite.bind(function () {}, [{}, {}])

  try {
    spiderbite.bind(function () {}, [{}])
  } catch (e) {
    t.equal(e, 'data does not match existing data')
  }
})

tap.test('fails when trying to bind data that does not match existing structure', function (t) {
  t.plan(1)

  var spiderbite = sb({bpm: 120})
  spiderbite.structure([[0], [1]])

  try {
    spiderbite.bind(function () {}, [{}])
  } catch (e) {
    t.equal(e, 'data does not match existing structure')
  }
})

tap.test('fails if the data, probs, or nexts are not the same length', function (t) {
  t.plan(3)

  var spiderbite = sb({bpm: 120})
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]],
        [[0]]
      ],
      probs: [
        [0],
        [1],
        [2]
      ],
      nexts: [
        [1], [0]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'too many probabilities!')
  }
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]],
        [[0]]
      ],
      probs: [
        [0],
        [1]
      ],
      nexts: [
        [1], [0], [2]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'too many nexts!')
  }

  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]],
        [[0]],
        [[2]]
      ],
      probs: [
        [0],
        [1]
      ],
      nexts: [
        [1], [0]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'too many datas!!')
  }
})


tap.test('fails if the nexts point to non-existent patterns', function (t) {
  // THIS should be ok with null as a value
  t.plan(1)

  var spiderbite = sb({bpm: 120})
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]]
      ],
      probs: [
        [0]
      ],
      nexts: [
        [1]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'a non-existent pattern exists as a value for next!')
  }
})

tap.test('fails if the data and probs do not align internally', function (t) {
  t.plan(2)

  var spiderbite = sb({bpm: 120})
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1, 0]]
      ],
      probs: [
        [0]
      ],
      nexts: [
        [1]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'data/probs internal mismatch')
  }
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]]
      ],
      probs: [
        [0, 2]
      ],
      nexts: [
        [1]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'data/probs internal mismatch')
  }
})

tap.test('fails if the data and probs do not align on pattern length', function (t) {
  t.plan(2)

  var spiderbite = sb({bpm: 120})
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1], [1]]
      ],
      probs: [
        [0]
      ],
      nexts: [
        [1]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'data/probs pattern mismatch')
  }
  try {
    spiderbite.bind(function () {}, [{
      data: [
        [[1]]
      ],
      probs: [
        [0], [1]
      ],
      nexts: [
        [1]
      ],
      mod: 1
      current: 0,
      tick: 0
    }])
  } catch (e) {
    t.equal(e, 'data/probs pattern mismatch')
  }
})
