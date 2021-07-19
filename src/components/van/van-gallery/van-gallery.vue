<template>
  <swiper
    class="gallery-swiper"
    :display-multiple-items="config.multiple || 3"
    :autoplay="config.autoplay"
    :interval="config.interval || 5000"
    :duration="config.duration || 500"
    :circular="config.circular || false"
    :next-margin="config.hideMargin ? '0' : '100rpx'"
    v-model="config.current || 0"
    @change="swiperChange"
  >
    <swiper-item
      v-for="(item, index) in list"
      :key="index"
      class="gallery-item"
    >
      <view :class="galleryActiveClass">
        <image class="gallery-img" :src="item.src" mode="aspectFill" lazyLoad />
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: 'vanGallerySwiper',
  props: {
    list: {
      type: Array,
      dafault: () => {
        return []
      }
    },
    config: {
      type: Object,
      dafault: () => {
        return {}
      }
    }
  },
  computed: {
    //重新计算下标索引,第二位开始
    galleryActiveClass: function() {
      return function galleryActiveClass(index) {
        let newCurrent = this.current + 1
        if (newCurrent >= this.list.length) newCurrent = 0
        if (newCurrent === index) return 'gallery-item--active'
      }
    }
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    swiperChange(e) {
      this.current = e.detail.current
      this.$emit('input', e.detail.current)
      this.$emit('change', e.detail.current)
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery-swiper {
  width: 400rpx;
  height: 100rpx;
  margin: 0 auto;
}

.gallery-item {
  width: 100%;
  height: 100%;
}

.gallery-item {
  .gallery-img {
    width: 100rpx;
    height: 100rpx;
    transition: transform 300ms;
    transform: scale(0.8);
    opacity: 0.6;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  &--active {
    .gallery-img {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
