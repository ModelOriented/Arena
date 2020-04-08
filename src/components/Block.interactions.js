import interact from 'interactjs'
import BlockConfig from '@/components/Block.config.js'
import { mapMutations } from 'vuex'

export default {
  props: {
    startMoving: Object
  },
  computed: {
    singleDropzone () { return this.mode === 'single-dropzone' },
    dualDropzone () { return this.mode === 'dual-dropzone' },
    activeLeftDropzone () { return this.dualDropzone && this.activeDropzone === 'left' },
    activeRightDropzone () { return this.dualDropzone && this.activeDropzone === 'right' },
    activeFullDropzone () { return this.singleDropzone && this.activeDropzone === 'full' }
  },
  methods: {
    initInteractions () {
      // Link to component from dom element
      this.$el.block = this
      interact(this.$refs.block).pointerEvents({ holdDuration: 0 })
        .draggable({
          interia: true,
          autoScroll: true,
          modifiers: BlockConfig.dragModifiers,
          onmove: event => this.dragOnMove(event),
          onend: event => { this.mode = 'normal' },
          cursorChecker: (action, interactable, element, interacting) => interacting ? 'grabbing' : 'grab'
        }).resizable(BlockConfig.resizeConfig)
        .on('hold', event => { this.mode = 'moving' })
        .on('up', event => { this.mode = 'normal' }, true)
        .on('resizemove', event => this.resizeOnMove(event))

      // Init component moving, startMoving - pointerdown event triggering move
      if (this.startMoving) {
        let target = this.$refs.block
        let x = this.startMoving.pageX - target.parentElement.offsetLeft - (target.offsetWidth / 2)
        let y = this.startMoving.pageY - target.parentElement.offsetTop - (target.offsetHeight / 2)
        this.updateTargetPosition(target, x, y)
        // We need to wait for position update
        this.$nextTick(() => {
          let event = new MouseEvent('pointerdown', Object.assign({}, this.startMoving, { offsetX: target.offsetWidth / 2, offsetY: target.offsetHeight / 2 }))
          this.$refs.block.dispatchEvent(event)
          this.mode = 'moving'
          this.$emit('took', this.slotv) // Clear startMoving in parent
        })
      }
      // Firefox triggers pointerup on SlotsListElement, so we catch it from document
      document.addEventListener('pointerup', event => {
        if (this.mode === 'moving') this.mode = 'normal'
      })
      // Blocks plotly
      document.addEventListener('mousemove', event => {
        if (this.mode === 'moving') event.stopPropagation()
      }, true)

      /* Init dropzone */
      let dropzoneCommonProperties = {
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(target => {
          if (this.mode !== 'normal') return /* Do not run placeholder on moving block */
          this.mode = this.canMerge(target) ? 'dual-dropzone' : 'single-dropzone'
          this.activeDropzone = 'none'
        }),
        ondropdeactivate: e => { if (e.relatedTarget.block) this.mode = 'normal' }
      }

      interact(this.$refs.leftdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(target => { this.activeDropzone = this.dualDropzone ? 'left' : 'full' }),
        ondragleave: this.validateAndRun(target => { if (this.singleDropzone || this.activeLeftDropzone) this.activeDropzone = 'none' }),
        ondrop: this.validateAndRun(target => { this.singleDropzone ? this.onSwapDrop(target) : this.onMergeDrop(target) }, false)
      }))
      interact(this.$refs.rightdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(target => { this.activeDropzone = this.dualDropzone ? 'right' : 'full' }),
        ondragleave: this.validateAndRun(target => { if (this.singleDropzone || this.activeRightDropzone) this.activeDropzone = 'none' }),
        ondrop: this.validateAndRun(this.onSwapDrop, false)
      }))
    },
    roundToGrid (x) {
      return Math.round(x / 32) * 32
    },
    validateAndRun (f, mustBeMoving = true) {
      return e => {
        if (!e.relatedTarget.block) return
        let target = e.relatedTarget.block
        if (target.mode !== 'moving' && mustBeMoving) return
        return f(target)
      }
    },
    dragOnMove (event) {
      if (this.mode !== 'moving') return // Draging plot
      event.stopPropagation()
      event.preventDefault()
      this.updateTargetProperties(event)
    },
    resizeOnMove (event) {
      this.mode = 'normal'
      event.preventDefault()
      this.updateTargetProperties(event)
    },
    updateTargetPosition (target, x, y) {
      target.setAttribute('data-x', this.roundToGrid(x))
      target.setAttribute('data-y', this.roundToGrid(y))
      this.setSlotPosition({ slot: this.slotv, x: this.roundToGrid(x), y: this.roundToGrid(y) })
    },
    updateTargetProperties (event) {
      var x = this.slotv.positionX + (event.type === 'resizemove' ? event.deltaRect.left : event.dx)
      var y = this.slotv.positionY + (event.type === 'resizemove' ? event.deltaRect.top : event.dy)
      this.updateTargetPosition(event.target, x, y)
      this.setSlotSize({ slot: this.slotv, width: this.roundToGrid(event.rect.width), height: this.roundToGrid(event.rect.height) })
    },
    ...mapMutations(['setSlotPosition', 'setSlotSize'])
  }
}
