<template>
  <div class="name-conflicts">
    <span class="title">Names conflicts</span>
    <div class="params-list">
      <div class="param" v-for="p in paramsNames" :key="p">
        <span class="param-title">{{ p | firstUpper }}<span class="c2">Already existing</span><span class="c3">Merge</span></span>
        <div class="row" v-for="c in nextNameConflicts.params[p]" :key="c.newParam.uuid">
          <span class="c1">{{ c.newParam.name }}</span>
          <span class="c2">{{ c.orginal.name }}</span>
          <input type="checkbox" class="c3" v-model="selectedToMerge[c.newParam.uuid]">
        </div>
      </div>
    </div>
    <button class="save" @click="save">Save</button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import format from '@/utils/format.js'

export default {
  name: 'NameConflicts',
  computed: {
    allParamsNames () {
      if (!this.nextNameConflicts) return []
      return Object.keys(this.nextNameConflicts.params)
    },
    paramsNames () {
      return this.allParamsNames.filter(n => this.nextNameConflicts.params[n].length > 0)
    },
    ...mapGetters(['nextNameConflicts'])
  },
  data () {
    return {
      selectedToMerge: {}
    }
  },
  watch: {
    nextNameConflicts: {
      handler () {
        this.selectedToMerge = {}
        Object.keys(this.nextNameConflicts.params).forEach(n => {
          this.nextNameConflicts.params[n].forEach(p => this.$set(this.selectedToMerge, p.newParam.uuid, true))
        })
      },
      immediate: true
    }
  },
  created () {
    if (this.paramsNames.length === 0 && this.nextNameConflicts) {
      this.nextNameConflicts.resolve({})
      this.removeNameConflicts()
    }
  },
  methods: {
    save () {
      let updates = {}
      this.allParamsNames.forEach(p => {
        this.nextNameConflicts.params[p].forEach(x => {
          if (this.selectedToMerge[x.newParam.uuid]) updates[x.newParam.uuid] = x.orginal
        })
      })
      this.nextNameConflicts.resolve(updates)
      this.removeNameConflicts()
    },
    ...mapMutations(['removeNameConflicts'])
  },
  filters: {
    firstUpper: format.firstCharUpper
  }
}
</script>
<style>
div.name-conflicts {
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(180, 180, 180, 0.5);
  background: white;
  width: 850px;
  max-width: 90%;
  height: 600px;
  max-height: 90%;
  z-index: 100004;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px;
}
div.name-conflicts > span.title {
  font-size: 28px;
  color: #371ea3;
  display: block;
  margin-left: 20px;
}
div.name-conflicts > div.params-list {
  overflow-y: auto;
  height: calc(100% - 160px);
  position: absolute;
  top: 80px;
  width: calc(100% - 80px);
  padding: 0 20px;
}
div.name-conflicts > div.params-list > div.param {
  margin: 25px 0;
  position: relative;
}
div.name-conflicts > div.params-list > div.param > span.param-title {
  display: block;
  width: 100%;
  font-size: 18px;
  color: #371ea3;
  border-bottom: 1px solid #371ea3;
}
div.name-conflicts > div.params-list > div.param > div.row {
  padding: 2px 0;
  border-bottom: 1px solid #efefef;
}
div.name-conflicts > div.params-list > div.param > * > .c2 {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}
div.name-conflicts > div.params-list > div.param > * > .c3 {
  right: 0;
  position: absolute;
}
div.name-conflicts > button.save {
  position: absolute;
  bottom: 20px;
  height: 40px;
  right: 20px;
  background: #4378bf;
  border: 0;
  border-radius: 4px;
  color: white;
  padding: 0 20px;
}
div.name-conflicts > button.save:hover {
  box-shadow: 0 0 5px 0 #4378bf;
}
</style>
