<template>
  <div class="friend-list">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.image" alt="friend" class="friend-image">
        <div class="friend-details">
          <h3>{{ friend.name }}</h3>
          <p>{{ friend.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFriendList } from '@/api/friend'
import { getOneUserMsg } from '@/api/user'
export default {
  props: {
    title: {
      type: String,
      default: 'My Friends'
    }
  },
  async created() {
    const res = await getFriendList()
    res.data.friends.forEach(async element => {
      const { data } = await getOneUserMsg(element)
      this.friends.push({ image: this.$store.state.baseurl + data.user.Icon, id: element, name: data.user.Name, description:data.user.Email })
    });
  },
  data() {
    return {
      friends: [],
    }
  }
}
</script>

<style scoped lang="scss">
.friend-list {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 20px;
}

.friend-list h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.friend-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.friend-list li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.friend-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}

.friend-details h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.friend-details p {
  font-size: 14px;
  color: #777;
  margin: 0;
}
</style>
