<template>
  <view class="van-avatar" :style="[wrapStyle]" @tap="click">
    <image @error="loadError" :style="[imgStyle]" class="van-avatar__img" v-if="avatar" :src="avatar" :mode="mode" />
    <view class="van-avatar__sex" v-if="showSex" :class="['van-avatar__sex--' + sexIcon]" :style="[uSexStyle]">
      <van-icons :name="sexIcon" size="20" />
    </view>
    <view class="van-avatar__level" v-if="showLevel" :style="[uLevelStyle]">
      <van-icons type="level" size="20" />
    </view>
  </view>
</template>

<script>
let base64Avatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAACvlBMVEUAAADh8P/b6vra6fnb6fba6fja6PfZ6fbZ6ffZ6Pfa6Pfa6Pba6fba6Pfa6ffb8//d6Pfb6Pja6Pfa6fba6ffZ6PbZ7P/b6ffa6ffZ6Pfb6vba6ffZ6ffb6fba6vbZ6ffa6ffg8Pfb6ffa6ffd7v/Z6Pfa6ff////a6/jZ6Pfa6Pf////a6vfa6fff///b6vja6Pfq6v/a6fbZ6fbf7//Z6Pb////Z6vja7Pra6fbj8f/a6ff////b6vfZ6PbZ6frZ6ffZ6Pfc8//a6ffb6/fZ6fba6ffe6f/a6ffc6/fb6ffZ6ff////a6ffj///a6Pfa6Pfe6/fk7/jq8vrv9fvz9/z1+fz4+v36/P37/P78/f79/v7+/v76/P75+/33+v30+Pzr8/rm8Pnh7Pfa6Pbc6vbn8Pny9/z7/f7////w9fvc6fbb6fbo8fnh7fjy9/vi7fj2+v3t9Pra6fb9/f7u9fv2+fzj7vja6Pfa6ffi7vjb6vfp8vn4+/3b6fff6/fk7vja6fbm7/ns8/ru9Pvw9vv2+f3d6vfx9vvh7ffg7Pfa6/jl7/jl7/na6ffz+Pzd6vbp8fna6fja6fbp8vru9Prf7Pfx9/vs9Prb6/fn8fnr8vrr9f/2+v3y9/zn8//w///3+/72+v3////2+f31+P309/zy9vv////x9/zv9vr8/f7z+f/3+/7z+Pzx+P3v9vrt+f/3+/7z9/zt9vz4+/35+/7y9/z8/f7w+P/1+f7t9/z5+/3y+Pz9/f73///z+Pz9/v/09P/x9vzu///x9vz7/f7////w9/z6/P7x9/32+f7+///t9v/x9/34+/3y9/v7/f7w9fr0+f35+/3s+f/y+P30+f3r9f/w9/z2+f37/P7w9Pvz+P70+P35/P739//u9vzw9v309/z0+P32+f34+/36/P78/f/+/v8fYjqIAAAA6nRSTlMAETFScomdsMTX4unv9vwVQ3GezPD/G12f4FaX2TmP0v4hftsPZcICTKn3BWHaCGvhDHTnEO0DbDfNEpkBYusvxXoWuUDmfRe7QVz6BKAJtNP///////////////////////////////////////////////////97xv9j//+a///O////////////S///mP//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'

export default {
  name: 'van-avatar',
  props: {
    // 标识符
    identifier: {
      type: [String, Number],
      default: ''
    },
    // 头像路径
    src: {
      type: String,
      default: ''
    },
    // 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
    // 宽度等于高度
    size: {
      type: [String, Number],
      default: 'large'
    },
    // 头像模型，square-带圆角方形，circle-圆形
    shape: {
      type: String,
      default: 'circle'
    },
    // 图片的裁剪模型
    mode: {
      type: String,
      default: 'aspectFill'
    },

    // 右上角性别角标，man-男，woman-女
    sexIcon: {
      type: String,
      default: 'man'
    },
    // 右下角的等级图标
    levelIcon: {
      type: String,
      default: 'level'
    },
    // 右下角等级图标背景颜色
    levelBgColor: {
      type: String,
      default: ''
    },
    // 右上角性别图标的背景颜色
    sexBgColor: {
      type: String,
      default: ''
    },
    // 是否显示性别图标
    showSex: {
      type: Boolean,
      default: false
    },
    // 是否显示等级图标
    showLevel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      // 头像的地址，因为如果加载错误，需要赋值为默认图片，props值无法修改，所以需要一个中间值
      avatar: this.src ? this.src : base64Avatar
    }
  },
  watch: {
    src(n) {
      // 用户可能会在头像加载失败时，再次修改头像值，所以需要重新赋值
      if (!n) {
        // 如果传入null或者''，或者undefined，显示默认头像
        this.error = true
      } else {
        this.avatar = n
        this.error = false
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      style.height = this.size == 'large' ? '120rpx' : this.size == 'default' ? '90rpx' : this.size == 'mini' ? '70rpx' : this.size + 'rpx'
      style.width = style.height
      style.flex = `0 0 ${style.height}`
      //   style.backgroundColor = this.bgColor
      style.borderRadius = this.shape == 'circle' ? '500px' : '5px'
      return style
    },
    imgStyle() {
      let style = {}
      style.borderRadius = this.shape == 'circle' ? '500px' : '5px'
      return style
    },
    // 取字符串的第一个字符
    uText() {
      return String(this.text)[0]
    },
    // 性别图标的自定义样式
    uSexStyle() {
      let style = {}
      if (this.sexBgColor) style.backgroundColor = this.sexBgColor
      return style
    },
    // 等级图标的自定义样式
    uLevelStyle() {
      let style = {}
      if (this.levelBgColor) style.backgroundColor = this.levelBgColor
      return style
    }
  },
  methods: {
    // 图片加载错误时，显示默认头像
    loadError() {
      this.error = true
      this.avatar = base64Avatar
    },
    click() {
      this.$emit('click', this.identifier)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-avatar {
  font-size: 28rpx;
  position: relative;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  align-items: center;
  justify-content: center;
  color: $u-content-color;
  border-radius: 10px;
  &__img {
    width: 100%;
    height: 100%;
  }

  &__sex {
    position: absolute;
    z-index: 1;
    top: 5%;
    right: -7%;
    align-items: center;
    justify-content: center;
    width: 32rpx;
    height: 32rpx;
    color: #fff;
    border: 1px #fff solid;
    border-radius: 100rpx;

    @include vue-flex;
    &--man {
      background-color: $u-type-primary;
    }

    &--woman {
      background-color: $u-type-error;
    }

    &--none {
      background-color: $u-type-warning;
    }
  }

  &__level {
    position: absolute;
    z-index: 1;
    right: -7%;
    bottom: 5%;
    align-items: center;
    justify-content: center;
    width: 32rpx;
    height: 32rpx;
    color: #fff;
    border: 1px #fff solid;
    border-radius: 100rpx;
    background-image: $gradients-main;
    @include vue-flex;
  }
}
</style>
