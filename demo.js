var seq = require('./')({bpm: 120}) // './'' => 'spiderbite'

seq.bind(true, function (data, index, array) {
  // do some stuff here, play a noise
}, [
  {
    data: [
      [[0, 7], [0], [0, -7], [0]],
      [[0, 7], [0], [5, -3], [3]]
    ],
    probs: [
      [1, 0.75, 0.5, 0.25],
      [1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1], [1, 1, 0]
    ],
    mod: 1,
    current: 0,
    tick: 0
  },
  {
    data: [
      [[3, 7], [3], [3, -7], [3], [5, 0], [5], [5, -0], [5]],
      [[5, 3], [5], [5, -3], [3], [0, 3], [0], [0, -3], [3]]
    ],
    probs: [
      [1, 0.35, 0.5, 0.25, 1, 0.35, 0.5, 0.25],
      [1, 0.75, 1, 0.75, 1, 0.35, 0.5, 0.25]
    ],
    nexts: [
      [0, 0, 1], [1, 1, 0, 2], [null]
    ],
    mod: 1,
    current: 0,
    tick: 0
  }
])

seq.structure([[0, 0, 0, 1], [1]])

seq.start()
seq.stop()

