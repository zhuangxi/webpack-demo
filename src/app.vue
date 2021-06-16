<template>
  <div id="container">
      <h1>{{initData}}</h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            initData: 'vue开发环境'
        }
    }
}
</script>

<style scoped>
#container {
    display: flex;
    color: red;
}

</style>