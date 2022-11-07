<template>
  <div id="app">
    <HomeView></HomeView>
  </div>
</template>

<script>

import HomeView from './components/HomeView.vue';

export default {
  name: 'App',
  components: {
    HomeView
  }
}

</script>

<style scoped>
#app {
  height: 100%;
}
</style>
