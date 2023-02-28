<template>
  <div class="layout" v-if="authLayout">
    <router-view></router-view>
  </div>
  <div class="layout" v-else>
    <header-section></header-section>
    <div class="container  py-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SideSection from './components/shared/SideSection.vue';
import HeaderSection from './components/shared/HeaderSection.vue'
export default {
  computed: {
    authLayout() {
      return !this.authRequirePaths.includes(this.$route.name)
    },
    ...mapGetters(['authRequirePaths'])
  },
  components: {
    SideSection,
    HeaderSection
  }
}
</script>


