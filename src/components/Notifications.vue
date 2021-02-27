<template>
  <div class="notifications">
    <div class="list">
      <Notification v-for="n in notifications" :key="n.id" :text="n.text" :type="n.type" @close="delNotification(n.id)"/>
    </div>
  </div>
</template>
<script>
import Notification from '@/components/Notification.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Notifications',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['notifications'])
  },
  methods: {
    ...mapMutations(['delNotification'])
  },
  components: { Notification }
}
</script>
<style>
div.notifications {
  position: absolute;
  left: 20px;
  top: 64px;
  width: 300px;
  height: 100px;
  z-index: 100050;
}
</style>
