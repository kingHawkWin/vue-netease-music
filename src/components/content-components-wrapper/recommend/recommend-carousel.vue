<template lang="pug">
  div(
    :class='["carousel"]'
  )
    div(
      :class='["carousel-left"]'
    )
    section(
      :class='["carousel-content"]'
    )
      a(:class='["carousel-content-item"]')
      a(:class='["carousel-content-item"]')
      a(:class='["carousel-content-item"]')
      a(:class='["carousel-content-item"]')
      a(:class='["carousel-content-item"]')
      div(
        :class='["carousel-control-wrapper"]'
      )
        span(:class='["carousel-control"]')
        span(:class='["carousel-control"]')
        span(:class='["carousel-control"]')
        span(:class='["carousel-control"]')
        span(:class='["carousel-control"]')
    div(
      :class='["carousel-right"]'
    )
</template>

<script>
import { carousel } from './carousel.js'

export default {
  components: {

  },
  mounted () {
    carousel()
  }
}
</script>

<style lang="stylus" scoped>
  .carousel
    width 100%
    height 4rem
    position relative
  .carousel-left
    width 10%
    height 100%
    position absolute
    background-color #fff
    transition all .3s ease-in-out
    @media screen and (max-width: 1024px)
      display none
  .carousel-content
    width 80%
    height 100%
    position absolute
    left 10%
    @media screen and (max-width: 1024px)
      width 100%
      left 0
  .carousel-content-item
    display block
    width 100%
    height 100%
    position absolute
    top 0
    background-size cover
    background-position center center
    transition all .2s ease-in-out
    &:nth-of-type(1)
      background-image url('../../../assets/images/dead-cells.jpg')
      @media screen and (max-width: 1024px)
        background-image url('../../../assets/images/dead-cells-small.jpg')
    &:nth-of-type(2)
      background-image url('../../../assets/images/enter-the-gungeon.jpg')
      @media screen and (max-width: 1024px)
        background-image url('../../../assets/images/enter-the-gungeon-small.jpg')
    &:nth-of-type(3)
      background-image url('../../../assets/images/hotline-miami.jpg')
      @media screen and (max-width: 1024px)
        background-image url('../../../assets/images/hotline-miami-small.jpg')
    &:nth-of-type(4)
      background-image url('../../../assets/images/undertale.jpg')
      @media screen and (max-width: 1024px)
        background-image url('../../../assets/images/undertale-small.jpg')
    &:nth-of-type(5)
      background-image url('../../../assets/images/dunderpatrullen.jpg')
      @media screen and (max-width: 1024px)
        background-image url('../../../assets/images/dunderpatrullen-small.jpg')
  .carousel-right
    width 10%
    height 100%
    position absolute
    right 0
    background-color #fff
    transition all .3s ease-in-out
    @media screen and (max-width: 1024px)
      display none
  .carousel-control-wrapper
    position absolute
    left 50%
    bottom .2rem
    z-index 1
    transform translate(-50%, 0)
  .carousel-control
    display inline-block
    margin 0 .05rem
    padding 2px
    width .15rem
    height .15rem
    border 3px solid #fff
    border-radius 50%
    background-clip content-box
    cursor pointer
</style>
