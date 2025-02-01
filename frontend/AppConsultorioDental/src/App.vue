<template>
    <Header />
    <router-view /> <!-- Aquí se cargarán las vistas -->
    <Footer />

</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
  body{
    width: 100%;
    margin: 0;
    display: block;
  }

  #app {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

</style>