<template>
  <div class="name-conflicts">
    <span class="title">Found conflict in <b>{{ nextParamType }}</b> name</span>
    <span class="desc">
      {{ nextParamType | firstUpper }} <b>{{ nextParamName }}</b> looks too similar to <b>{{ nextParamConflict }}</b>. If it's the same {{ nextParamType }}, then <b>merge</b> it. You can also <b>rename</b> it, to remove conflict.
    </span>
    <div class="buttons">
      <button class="merge" @click="merge">Merge</button>
      <button class="merge-all" @click="mergeAll">Merge for all {{ nextParamType + 's' }}</button>
      <input class="rename-input" :class="{ error: renameError, disabled: !renameInput }" type="text" placeholder="Enter new name here" v-model="renameInput" @keyup.enter="tryToRename">
      <button class="rename-button" :class="{ disabled: renameError || !renameInput }" @click="tryToRename">Rename</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import format from '@/utils/format.js'
import config from '@/configuration/config.js'

export default {
  name: 'NameConflicts',
  computed: {
    nextParamType () {
      return Object.keys(this.paramsConflict.params)[this.paramTypeIndex] || ''
    },
    nextParamName () {
      return this.nextParam.paramName || ''
    },
    nextParamsOfSameType () {
      return (this.paramsConflict.params[this.nextParamType] || []).filter((x, i) => i >= this.paramNameIndex)
    },
    nextParam () {
      return this.nextParamsOfSameType[0] || {}
    },
    nextParamConflict () {
      return this.nextParam.conflictedWith || ''
    },
    renameError () {
      return format.simplify(this.renameInput) === format.simplify(this.nextParamConflict) || !this.isRenameCorrect(this.paramsConflict.uuid, this.nextParamType, this.renameInput)
    },
    paramsConflict () {
      return this.waitingParamsConflicts[0]
    },
    ...mapGetters(['waitingParamsConflicts', 'isRenameCorrect'])
  },
  data () {
    return {
      renameInput: '',
      paramTypeIndex: 0,
      paramNameIndex: 0,
      translations: null // will be set in watcher
    }
  },
  watch: {
    paramsConflict: {
      handler (newValue) {
        if (!newValue) return
        this.translations = {
          uuid: newValue.uuid, // source uuid
          // Object with param types as keys and empty objects as values
          params: config.params.reduce((acu, paramType) => {
            acu[paramType] = {}
            return acu
          }, {})
        }
        this.paramTypeIndex = 0
        this.paramNameIndex = 0
      },
      immediate: true
    },
    paramTypeIndex: {
      handler (newValue) {
        if (!this.paramsConflict) return
        if (Object.keys(this.paramsConflict.params).length <= this.paramTypeIndex && this.translations) {
          this.addTranslations(this.translations)
          this.paramTypeIndex = 0
          this.paramNameIndex = 0
          return
        }
        this.paramNameIndex = 0
      },
      immediate: true
    },
    paramNameIndex: {
      handler (newValue) {
        if (!this.paramsConflict) return
        if (this.paramsConflict.params[this.nextParamType].length <= this.paramNameIndex) this.paramTypeIndex += 1
      },
      immediate: true
    }
  },
  methods: {
    tryToRename () {
      if (this.renameError) return false
      this.translations.params[this.nextParamType][this.nextParamName] = this.renameInput
      this.paramNameIndex += 1
    },
    merge () {
      this.translations.params[this.nextParamType][this.nextParamName] = this.nextParamConflict
      this.paramNameIndex += 1
    },
    mergeAll () {
      this.nextParamsOfSameType.forEach(p => {
        this.translations.params[this.nextParamType][p.paramName] = p.conflictedWith
      })
      this.paramTypeIndex += 1
    },
    ...mapMutations(['addTranslations'])
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
  z-index: 100004;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px;
}
div.name-conflicts > span.title {
  font-size: 28px;
  color: #555;
  display: block;
  margin-bottom: 10px;
}
div.name-conflicts > button.save:hover {
  box-shadow: 0 0 5px 0 #4378bf;
}
div.name-conflicts > div.buttons {
  float: right;
  margin-top: 25px;
}
div.name-conflicts > div.buttons > button {
  display: inline;
  font-size: 15px;
  border: 0;
  border-radius: 4px;
  color: white;
  height: 40px;
  background: #46bac2;
  margin: 0 5px;
  font-weight: 800;
}
div.name-conflicts > div.buttons > button:hover {
  box-shadow: 0 0 5px 0 #46bac2;
}
div.name-conflicts > div.buttons > input.rename-input {
  width: 200px;
  padding: 0 20px;
  margin-right: 0;
  margin-left: 5px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #4378bf;
  border-radius: 4px 0 0 4px;
}
div.name-conflicts > div.buttons > input.rename-input.disabled {
  border: 1px solid #ccc;
}
div.name-conflicts > div.buttons > input.rename-input.error {
  border: 1px solid #f05a71;
  box-shadow: 0 0 5px 0 #f05a71;
}
div.name-conflicts > div.buttons > button.rename-button {
  margin-left: 0;
  border-radius: 0 4px 4px 0;
  background: #4378bf;
}
div.name-conflicts > div.buttons > button.rename-button.disabled {
  background: #ccc;
}
div.name-conflicts > div.buttons > button.rename-button.disabled:hover {
  box-shadow: none;
}
div.name-conflicts > div.buttons > button.add-url:hover {
  box-shadow: 0 0 5px 0 #4378bf;
}
div.name-conflicts > div.buttons > button.merge-all {
  background: #f05a71;
}
div.name-conflicts > div.buttons > button.merge-all:hover {
  box-shadow: 0 0 5px 0 #f05a71;
}
</style>
