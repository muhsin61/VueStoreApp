<template>
  <div class="home">
    <div v-for="item in $store.state.showStorewItems" :key="item.id">
      <HelloWorld :msg="['test']"  />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
