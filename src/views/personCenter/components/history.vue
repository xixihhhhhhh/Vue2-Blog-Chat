<template>
  <div class="history-con">
    <HistoryCard v-for="item in histtoryList" :key="item.id" :user_id="item.user_id" :created_time="item.created_at"
      :bolg_id="item.zipfile_id" />
    <div class="page">
      <el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getVisitHistory } from '@/api/history'
import { formatDate } from '@/utils/common.js'
import HistoryCard from './historyCard.vue'
export default {
  async created() {
    const res = await getVisitHistory({ start: '2022-03-13 17:27:42', end: formatDate(new Date()) })
    this.histtoryLists = res.data.zipfileHistorys
    this.total = this.histtoryLists.length
    this.histtoryList = this.histtoryLists.slice(0, 5)
  },
  data() {
    return {
      histtoryLists: [],
      histtoryList: [],
      total: 0
    }
  },
  methods: {
    pageChange(e) {
      this.histtoryList = this.histtoryLists.slice((e - 1) * 5, 5 * e)
    }
  },
  components: { HistoryCard }
}
</script>

<style lang="scss" scoped>
.history-con {
  max-width: 1000px;
  min-width: 600px;
}

.page {
  margin: 20px;
  text-align: center;
}
</style>