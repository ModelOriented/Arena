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
      this.interactable = interact(this.$refs.block).pointerEvents({ holdDuration: 150 })
        .draggable({
          interia: true,
          autoScroll: true,
          modifiers: BlockConfig.dragModifiers,
          onmove: event => this.dragOnMove(event),
          onstart: event => this.dragOnStart(event),
          onend: event => this.dragOnEnd(event),
          cursorChecker: (action, interactable, element, interacting) => interacting ? 'grabbing' : 'grab'
        }).resizable(BlockConfig.resizeConfig)
        .on('resizemove', event => this.resizeOnMove(event))
        .on('hold', event => this.onHold(event))

      // Init component moving, startMoving - pointerdown event triggering move
      if (this.startMoving) {
        let target = this.$refs.block
        let x = this.startMoving.pageX - target.parentElement.offsetLeft - (target.offsetWidth / 2)
        let y = this.startMoving.pageY - target.parentElement.offsetTop - (target.offsetHeight / 2)
        this.updateTargetPosition(target, x, y)
        this.startMoving.interaction.start({ name: 'drag' }, this.interactable, this.$el)
        this.moving = true
        this.$emit('took', this.slotv) // Clear startMoving in parent
      }

      /* Init dropzone */
      let dropzoneCommonProperties = {
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(target => {
          if (this.moving) return /* Do not run placeholder on moving block */
          this.mode = this.canMerge(target) ? 'dual-dropzone' : 'single-dropzone'
          this.activeDropzone = 'none'
        }, true, false),
        ondropdeactivate: e => { if (e.relatedTarget.block) this.mode = 'normal' },
        checker: (dragEvent, event, dropped, dropzone, dropElement, draggable, draggableElement) => {
          return dropped && draggableElement !== this.$el
        }
      }

      interact(this.$refs.leftdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(target => { this.activeDropzone = this.dualDropzone ? 'left' : 'full' }),
        ondragleave: this.validateAndRun(target => { if (this.singleDropzone || this.activeLeftDropzone) this.activeDropzone = 'none' }),
        ondrop: this.validateAndRun(target => { this.singleDropzone ? this.onSwapDrop(target) : this.onMergeDrop(target) }, false)
      }))
      interact(this.$refs.rightdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(target => { this.activeDropzone = this.dualDropzone ? 'right' : 'full' }),
        ondragleave: this.validateAndRun(target => { if (this.singleDropzone || this.activeRightDropzone) this.activeDropzone = 'none' }, false),
        ondrop: this.validateAndRun(this.onSwapDrop, false)
      }))
    },
    roundToGrid (x) {
      return Math.round(x / 32) * 32
    },
    validateAndRun (f, mustBeMoving = true, checkMode = true) {
      return e => {
        if (this.mode === 'normal' && checkMode) return
        if (!e.relatedTarget.block) return
        let target = e.relatedTarget.block
        if (!target.moving && mustBeMoving) return
        return f(target)
      }
    },
    dragOnMove (event) {
      event.stopPropagation()
      event.preventDefault()
      this.updateTargetProperties(event)
    },
    dragOnStart (event) {
      this.moving = true
    },
    dragOnEnd (event) {
      this.moving = false
    },
    onHold (event) {
      if (!event.target || Array.prototype.includes.call(event.target.classList, 'handle')) return
      let interaction = event.interaction
      if (!interaction.interacting()) {
        interaction.start({ name: 'drag' }, event.interactable, event.currentTarget)
      }
    },
    resizeOnMove (event) {
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
