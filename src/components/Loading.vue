<template>
  <div class="loading">
    <div class="box">
    </div>
    <span v-if="progress !== null && progress !== undefined && progress >= 0">{{ Math.round(progress * 100) + '%' }}</span>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    progress: Number
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
<style>
.loading {
  width: 45px;
  position: relative;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
.loading > .box {
  border: 4px solid white;
  border-left: 4px solid #46bac2;
  border-right: 4px solid #46bac2;
  border-radius: 50%;
  height: 0;
  padding-top: calc(100% - 8px);
  width: calc(100% - 8px);
  animation: rotate 1.5s linear infinite;
}
.loading > span {
  position: absolute;
  top: 50%;
  display: block;
  text-align: center;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
}
</style>
