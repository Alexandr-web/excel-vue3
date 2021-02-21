<template>
  <form class="header__form">
    <input class="header__form-input" type="text" v-model="val">
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const val = ref('');

    return {
      val
    }
  }
}
</script>