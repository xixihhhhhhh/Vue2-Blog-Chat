<template>
  <div class="personContainer">
    <left></left>
    <right></right>
    <div style="height: 50rem"></div>
  </div>
</template>

<script>
import left from './components/left'
import right from './components/right'
export default {
  data() {
    return {}
  },
  mounted() {},
  components: { left, right },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.personContainer {
  background-color: #fff;
  padding-top: 8rem;
  display: flex;
}
</style>
