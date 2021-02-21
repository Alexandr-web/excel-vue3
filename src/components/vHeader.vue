<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <vHeaderActiveCell />  
        <vHeaderInput />
      </div>
    </div>
  </header>
</template>

<script>
import vHeaderActiveCell from './vHeaderActiveCell';
import vHeaderInput from './vHeaderInput';

export default {
  components: {
    vHeaderActiveCell,
    vHeaderInput
  }
}
</script>