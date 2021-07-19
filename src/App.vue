<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
* {
  margin: 0;
  padding: 0;
}
page {
  background-color: #f8f8f8;
  height: 100%;
  line-height: 1;
  color: #303030;
}
</style>
