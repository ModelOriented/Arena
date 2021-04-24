<template>
  <div class="plot-proxy">
    <Loading v-if="loading || waitingForRender || (progress !== 1 && renderPlot)" :progress="progress" />
    <span class="msg" v-if="!renderPlot && !error && !loading && slotData.length === 0 && !waitingForRender">Cannot load plot data!</span>
    <span class="msg" v-if="!plotComponent && !renderPlot && !error && !loading && slotData.length > 0 && !waitingForRender">
      Cannot load plot data. Plot type is probably not supported for thease params.
    </span>
    <span class="msg error" v-if="!renderPlot && error && !loading">Error occured during loading plot data!</span>
    <component :is="plotComponent" class="plot" v-if="renderPlot" :data="slotData" :plotType="slotv.plotType" :slotv="slotv" ref="plot"/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'
import PlotsInfo from '@/configuration/PlotsInfo.js'
import { mapActions, mapGetters } from 'vuex'
import equal from 'fast-deep-equal/es6'

export default {
  name: 'PlotProxy',
  props: {
    slotv: Object
  },
  data () {
    return {
      plotVisible: false, // It is very important to render plot after component is mounted, to make picking SlotsListElement faster
      error: null, // type of error
      loading: null, // time of last pending query
      waitingForRender: false,
      slotData: [], // data returned from query(fullParams)
      progress: null
    }
  },
  watch: {
    fullParams: { // Reload slot data, when params change
      handler (newValue, oldValue) {
        if (!equal(newValue, oldValue)) {
          this.progress = null
          this.loadSlotData()
        }
      },
      immediate: true
    },
    'slotv.plotType': { // Reload slot data, when plot type change
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.progress = null
          this.loadSlotData()
        }
      },
      immediate: true
    },
    plotComponent: {
      handler () {
        this.$emit('plotComponentUpdate', this.plotComponent)
      },
      immediate: true
    }
  },
  mounted () {
    // It is important not to use Vue.nextTick, to load all plots one after another,
    // nextTick will load all of then parallel when changing page
    setTimeout(() => {
      this.plotVisible = true
    }, 0)
  },
  computed: {
    // Slot localParams merged with globalParams
    fullParams () { return this.getSlotFullParams(this.slotv.localParams) },
    /* Each data object specify plotComponent, we make sure all are equal and return the value or '' if not */
    plotComponent () {
      if (!this.slotData || this.slotData.length === 0) return ''
      if (!this.slotData.every(d => d.plotComponent === this.slotData[0].plotComponent)) return '' // All not equal (todo split slot)
      if (!Object.keys(PlotsInfo.plotComponents).includes(this.slotData[0].plotComponent)) return '' // Not supported component
      return this.slotData[0].plotComponent
    },
    renderPlot () {
      return this.plotVisible && this.plotComponent
    },
    textProgress () {
      return this.progress === null ? '' : (Math.round(this.progress * 100) + '%')
    },
    ...mapGetters(['getSlotFullParams'])
  },
  methods: {
    loadSlotData () {
      let time = this.loading = new Date().getTime()
      let promises = this.fullParams.map(p => this.query({ params: p, plotType: this.slotv.plotType }))
      Promise.all(promises).then(result => {
        result = result.filter(r => r)
        this.error = false
        // set loading to null only when this was last promise
        if (this.loading === time) this.loading = null
        // Do not update if results are the same (ex. variable param changed in FeatureImportance plot)
        let getPlotData = (slotData) => slotData.plotData
        if (!result.every(r => r.computations === undefined || r.computations.isDone)) {
          this.progress = result.map(r => r.computations === undefined ? 1 : r.computations.progress).reduce((acu, x) => (x === null || acu === null) ? null : acu + (x / result.length), 0)
          setTimeout(() => {
            this.loadSlotData()
          }, 1000)
        } else {
          this.progress = 1
        }
        if (new Set([...this.slotData.map(getPlotData), ...result.map(getPlotData)]).size === new Set(this.slotData).size &&
          new Set(this.slotData.map(getPlotData)).size === new Set(result.map(getPlotData)).size &&
          this.slotData.length === result.length) return
        this.waitingForRender = true
        setTimeout(() => {
          this.slotData = result
          this.waitingForRender = false
        }, 0)
      }).catch((reason) => { // It is called when any of promises failed
        this.slotData = []
        this.error = true
        // set loading to null only when this was last promise
        if (this.loading === time) this.loading = null
      })
    },
    ...mapActions(['query'])
  },
  components: { ...PlotsInfo.plotComponents, Loading }
}
</script>
<style>
div.plot-proxy > div.plot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
div.plot-proxy > .loading {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9;
}
div.plot-proxy > span.msg {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 22px;
  height: 30px;
  line-height: 30px;
  color: #4378bf;
}
div.plot-proxy > span.msg.error {
  color: #f05a71;
}
div.plot-proxy > div.plot .modebar {
  transform: translateX(50%) rotate(-90deg) translateX(-50%);
  right: 10px;
}
div.plot-proxy > div.plot .barplot-block .modebar {
  transform: translateX(50%) rotate(-90deg) translateX(-50%) translateX(25px);
}
div.plot-proxy > div.plot .modebar .modebar-btn > svg {
  transform: rotate(90deg);
}
div.plot-proxy > div.plot .modebar [data-title]:hover::before {
  transform: rotate(180deg);
  top: 10px;
}
div.plot-proxy > div.plot .modebar [data-title]:hover::after {
  transform: translateX(-50%) rotate(90deg) translateX(-50%);
  top: -15px;
  right: auto;
}
</style>
