<template>
  <div class="brief">
    <h1 class="brief-title">{{ title }}</h1>
    <p class="brief-description">{{ description }}</p>
    <ul class="brief-list">
      <li class="brief-item" v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Brief",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.brief {
  background-color: #f5f5f5;
  padding: 2rem;
}

.brief-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.brief-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.brief-list {
  list-style: none;
  padding-left: 0;
}

.brief-item {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  position: relative;
}

.brief-item:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: #0077c0;
}
</style>
