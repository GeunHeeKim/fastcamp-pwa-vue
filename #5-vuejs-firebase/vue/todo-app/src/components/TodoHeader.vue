<template>
  <header>
    <h1>
      {{ this.$store.getters.getMessage }}
    </h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerText: 'todo app'
    }
  },
  computed: {
    appHeader() {
      return this.headerText.split('').reverse().join()
    }
  }
}
</script>

<style scoped>
  h1 {
    color: #2F3B52;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
</style>
