<template lang="pug">
  div(
    :class='["author"]'
  )
    span {{ 'Created by '}}
      a(
        :class='["author-github"]'
        href='https://github.com/kingHawkWin/pxbx'
        target='_blank'
      ) kingHawkWin
</template>

<script>

export default {
  components: {

  }
}
</script>

<style lang="stylus" scoped>
  .author
    font-size .12em
    color #eee
    position absolute
    left 50%
    bottom 5px
    transform translate(-50%, 0)
  .author-github
    font-weight bold
    text-shadow 0 0 2px #333
</style>
