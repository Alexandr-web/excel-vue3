<template>
  <main class="main">
    <div class="main__content">
      <div class="main__block">
        <ul class="main__list-numbers">
          <vMainNumbersItem 
            v-for="number of numbers"
            v-bind:key="number.id"
            v-bind:number="number"
          />        
        </ul>
      </div>
      <div class="main__block">
        <ul class="main__list-columns">
          <vMainColumnsItem 
            v-for="column of columns"
            v-bind:key="column.id"
            v-bind:column="column"
          />
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import vMainNumbersItem from './vMainNumbersItem';
import vMainColumnsItem from './vMainColumnsItem';

export default {
  setup() {
    const store = useStore();
    const numbers = computed(() => store.getters.getNumbers);
    const columns = computed(() => store.getters.getColumns);

    store.dispatch('cleanActiveCells');

    return {
      numbers,
      columns,
    }
  },
  components: {
    vMainNumbersItem,
    vMainColumnsItem
  }
}
</script>