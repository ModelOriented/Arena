import interact from 'interactjs'

export default {
  dragModifiers: [
    interact.modifiers.snap({
      targets: [interact.createSnapGrid({ x: 32, y: 32 })],
      range: Infinity,
      offset: { x: 0, y: 0 },
      relativePoints: [ { x: 0, y: 0 } ]
    }),
    interact.modifiers.restrict({
      restriction: '#playground',
      endOnly: true
    })
  ],
  resizeConfig: {
    edges: { left: '.handle-left', right: '.handle-right', bottom: '.handle-bottom', top: '.handle-top' },
    modifiers: [
      interact.modifiers.restrict({
        restriction: '#playground',
        endOnly: true
      }),
      interact.modifiers.snap({
        targets: [
          interact.createSnapGrid({ x: 32, y: 32 })
        ],
        range: Infinity,
        offset: { x: 0, y: 0 },
        relativePoints: [ { x: 0, y: 0 } ]
      }),
      interact.modifiers.restrictSize({
        min: { width: 320, height: 320 }
      })
    ],
    inertia: true
  }
}
