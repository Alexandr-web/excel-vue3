<template>
  <li v-bind:class="`main__list-numbers-item ${number.active ? 'active-number' : ''}`">
    {{ number.num }}
  </li>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  props: {
    number: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const activeCell = computed(() => store.getters.getActiveCell);
    const activeNumber = parseInt(activeCell.value.match(/\d+/)[0]);

    if (props.number.num === activeNumber) {
      store.dispatch('setActiveNumber', props.number);
    }
  }
}
</script>