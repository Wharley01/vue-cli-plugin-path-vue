<template>
  <div id="app">
    <router-view></router-view>
    <VModalsComponent></VModalsComponent>
  </div>
</template>
<script>
  import {mapMutations} from "vuex";

  export default {
    created() {
      setTimeout(() => {
        // this.SHOW_AVAILABLE_TIPS();
      },5000)
    },
    data(){
      return {
        transitionClass: ''
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionClass = toDepth < fromDepth ? 'animate__animated animate__slideInLeft animate_faster' : 'animate__animated animate__slideInRight animate_faster'
      }
    }
  }
</script>
<style lang="scss" src="./assets/parrot/styles.scss"></style>
