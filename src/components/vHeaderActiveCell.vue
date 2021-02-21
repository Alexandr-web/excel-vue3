<template>
  <div class="header__active-cell">
    <h3 class="header__active-cell-title">{{ activeCell }}</h3>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const activeCell = computed(() => store.getters.getActiveCell);

    return {
      activeCell
    }
  }
}
</script>