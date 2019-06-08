export const carousel = function () {
  const banner = {
    _carouselContentItems: document.getElementsByClassName('carousel-content-item'),
    _carouselControl: document.getElementsByClassName('carousel-control'),
    _carouselLeft: document.getElementsByClassName('carousel-left')[0],
    _carouselRight: document.getElementsByClassName('carousel-right')[0],
    _carouselSideColor: [
      '#955b55',
      '#6b2d37',
      '#1b0912',
      '#130916',
      '#000102'
    ],
    _index: 0,
    _speed: 2000,
    _timer: null,
    cleanTimer () {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
      }
    },
    rmItemOpacity () {
      for (let i = 0; i < banner._carouselContentItems.length; ++i) {
        banner._carouselContentItems[i].style.opacity = '0'
      }
    },
    rmControlColor () {
      for (let i = 0; i < banner._carouselControl.length; ++i) {
        banner._carouselControl[i].style.backgroundColor = ''
      }
    },
    changeTo () {
      banner.rmControlColor()
      banner.rmItemOpacity()
      banner._carouselContentItems[banner._index].style.opacity = '1'
      banner._carouselLeft.style.backgroundColor = banner._carouselSideColor[banner._index]
      banner._carouselRight.style.backgroundColor = banner._carouselSideColor[banner._index]
      banner._carouselControl[banner._index].style.backgroundColor = '#ff522a'
    },
    waiting (ms) {
      return new Promise((resolve, reject) => {
        banner.cleanTimer()
        banner._timer = setTimeout(resolve, ms)
      })
    },
    automatic (automaticSpeed = banner._speed) {
      if (banner._index >= banner._carouselContentItems.length) {
        banner._index = 0
        banner.waiting(0).then(() => {
          banner.automatic()
        })
      } else {
        banner.waiting(automaticSpeed).then(() => {
          banner.changeTo()
          banner._index++
          banner.automatic()
        })
      }
    },
    manual () {
      for (let i = 0; i < banner._carouselControl.length; ++i) {
        banner._carouselControl[i].addEventListener('click', function () {
          banner.cleanTimer()
          banner._index = i
          banner.changeTo()
        })
        banner._carouselControl[i].addEventListener('mouseout', function () {
          banner.cleanTimer()
          banner.automatic(0)
        })
        banner._carouselControl[i].addEventListener('tarchstart', function () {
          banner.cleanTimer()
          banner._index = i
          banner.changeTo()
        })
        banner._carouselControl[i].addEventListener('touchend', function () {
          banner.cleanTimer()
          banner.automatic(0)
        })
      }
    },
    start () {
      this.rmItemOpacity()
      this._carouselLeft.style.backgroundColor = '#955b55'
      this._carouselRight.style.backgroundColor = '#955b55'
      this._carouselContentItems[0].style.opacity = '1'
      this._carouselControl[0].style.backgroundColor = '#ff522a'
      this.automatic()
      this.manual()
    }
  }
  return banner.start()
}
