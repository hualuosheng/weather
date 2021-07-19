<template>
  <swiper class="swiper-notice" :disable-touch="false" circular vertical autoplay>
    <swiper-item v-for="(item, index) in dataSwiperList" :key="index" :current="dataNoticeCurrent">
      <text class="num-cor">{{ item.num }}</text>
      <text class="fs30 pl8 pr8">{{ item.name }}</text>
      <text class="fs20">{{ item.post }}</text>
    </swiper-item>
  </swiper>
</template>
