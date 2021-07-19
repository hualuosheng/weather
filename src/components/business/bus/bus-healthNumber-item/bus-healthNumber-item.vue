<template>
  <!-- 文章列表 -->
  <view
    class="bus-healthNumber-item"
    @click="openPage('healthNumber/themearticle')"
  >
    <van-cell
      title="用户名"
      src="/static/img/user_logo.png"
      note="七天前"
      img-size="88"
      :border="false"
    >
      <van-tag slot="right" text="关注" inverted />
    </van-cell>
    <view class="bg-white content">
      <view class="mb16 fs34 fw600 title">头晕要注意六种伤肾食物</view>
      <view class="line2 info"
        >头晕（dizziness）是一种常见的脑部功能性障碍，也是临床常见的症状之一。为头昏、头胀、头重脚轻、脑内摇晃、眼花等的感觉。头晕可由多种原因引起，最常见于发热性疾病、高血压病、脑动脉硬化、颅脑外伤综合征、神经症等。此外，还见于贫血、心律失常、心力衰竭、低血压、药物中毒、尿毒症、哮喘等。抑郁症早期也常有头晕</view
      >
      <view class="flex mt32 content-bot">
        <van-amount
          num="头晕"
          num-color="#344e87"
          sym="#"
          spacing="8"
          rowReverse
        />
        <van-amount
          class="ml-auto pr32"
          color="#909399"
          num="12"
          sym="回复"
          spacing="16"
          rowReverse
        />
        <van-amount
          color="#909399"
          num="22"
          sym="点赞"
          spacing="16"
          rowReverse
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 32rpx 32rpx;
}
</style>
