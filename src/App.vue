<template>
  <vHeader />
  <vHome />
</template>

<script>
import vHeader from './components/vHeader';
import vHome from './components/vMain';

export default {
  name: 'App',
  components: {
    vHeader,
    vHome
  }
}
</script>

<style>
  @import '../public/css/main.css';
</style>