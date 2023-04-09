<template>
  <div class="friend-requests">
    <h2 class="friend-requests__title">别人发起的好友请求列表</h2>
    <ul class="friend-requests__list">
      <li v-for="request in friendRequests" :key="request.id" class="friend-requests__list-item">
        <div class="friend-requests__sender">{{ request.sender }}</div>
        <div class="friend-requests__actions">
          <el-button type="success" @click="acceptFriendRequest(request.id)">接受</el-button>
          <el-button type="info" @click="acceptFriendRequest(request.id)">拒绝</el-button>
        </div>
      </li>
    </ul>
    <h2 class="friend-requests__title">我发起的好友请求列表</h2>
    <ul class="friend-requests__list">
      <li v-for="request in friendRequests2" :key="request.id" class="friend-requests__list-item">
        <div class="friend-requests__sender">{{ request.sender }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFriendReqList, acceptFriendReq, rejectFriendReq, getFriendReqListApplied } from '@/api/friend'
import { getOneUserMsg } from '@/api/user'
export default {
  created() {
    this.GetFriendReqList()
    this.GetFriendReqListApplied()
  },
  data() {
    return {
      friendRequests: [],
      friendRequests2: []
    };
  },
  methods: {
    async GetFriendReqList() {
      const res = await getFriendReqList()
      let arr = []
      res.data.friends.forEach(async element => {
        const { data } = await getOneUserMsg(element)
        arr.push({ id: element, sender: data.user.Name })
      });
      this.friendRequests = arr
    },
    async GetFriendReqListApplied() {
      const res = await getFriendReqListApplied()
      let arr = []
      res.data.friends.forEach(async element => {
        const { data } = await getOneUserMsg(element)
        arr.push({ id: element, sender: data.user.Name })
      });
      this.friendRequests2 = arr
    },
    async acceptFriendRequest(requestId) {
      // 处理接受好友请求的逻辑
      const res = await acceptFriendReq(requestId)
      this.GetFriendReqList()
      return this.$message.success(res.msg)
    },
    async rejectFriendRequest(requestId) {
      // 处理拒绝好友请求的逻辑
      const res = await rejectFriendReq(requestId)
      this.GetFriendReqList()
      return this.$message.success(res.msg)
    }
  }
};
</script>

<style scoped>
.friend-requests {
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
}

.friend-requests__title {
  font-size: 24px;
  margin-bottom: 20px;
}

.friend-requests__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.friend-requests__list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.friend-requests__list-item:last-child {
  border-bottom: none;
}

.friend-requests__sender {
  font-size: 18px;
  font-weight: bold;
}

.friend-requests__actions {
  display: flex;
}
</style>