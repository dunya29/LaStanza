const fixedBlocks = document.querySelectorAll(".fixed-block")
const customSelect = document.querySelectorAll(".custom-select")
const overlay = document.querySelector(".overlay")
const header = document.querySelector(".header")
const iconMenu = document.querySelector(".icon-menu")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
let animSpd = 400
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//enable scroll
function enableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//smoothdrop
function smoothDrop(header, body, dur) {
  body.style.overflow = 'hidden';
  body.style.transition = `height ${dur}ms ease`;
  body.style['-webkit-transition'] = `height ${dur}ms ease`;
  if (!header.classList.contains("active")) {
    header.classList.add("open")
    body.style.display = 'block';
    let height = body.clientHeight + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
      setTimeout(() => {
        body.style.height = null
        header.classList.add("active")
      }, dur);
    }, 0);
  } else {
    header.classList.remove("open")
    let height = body.clientHeight + 'px';
    body.style.height = height
    setTimeout(function () {
      body.style.height = "0"
      setTimeout(() => {
        body.style.display = 'none';
        body.style.height = null
        header.classList.remove("active")
      }, dur);
    }, 0);
  }
}
//swhitch tab
function tabSwitch(nav, block) {
  nav.forEach((item, idx) => {
    item.addEventListener("click", () => {
      let href = item.getAttribute("data-nav")
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
      block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
// formSuccess
function formSuccess(form) {
  form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
    if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
      inp.value = ""
    }
    if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
      inp.checked = false
    }
  })
  if (form.querySelector("textarea")) {
    form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__items")) {
    form.querySelector(".file-form__items").innerHTML = ""
  }
  let modal = document.querySelector(".modal.open")
  if (modal) {
    modal.classList.remove("open")
  }
  openModal(successModal)
}
//open modal
function openModal(modal) {
  if (!iconMenu.classList.contains("show")) {
    disableScroll()
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!iconMenu.classList.contains("show")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
    if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
      closeModal(mod)
    }
  })
})
// modal button on click
modalShowBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault()
    let href = btn.getAttribute("data-modal")
    openModal(document.getElementById(href))
  })
})
//accordion
const accordion = document.querySelectorAll(".accordion")
accordion.forEach(item => {
  item.querySelector(".accordion__header").addEventListener("click", e => {
    if (e.target.localName != "input") {
      smoothDrop(item.querySelector(".accordion__header"), item.querySelector(".accordion__body"), 500)
    }
  })
})
// another cards swiper
const cardSwiper = document.querySelectorAll(".card-swiper")
if (cardSwiper) {
  cardSwiper.forEach(item => {
    const swiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: 4,
      spaceBetween: 30,
      observe: true,
      observeParents: true,
      navigation: {
        prevEl: item.querySelector(".nav-btn--prev"),
        nextEl: item.querySelector(".nav-btn--next")
      },
      speed: 800,
    })
  })
}
// filter inputs onchange
const filter = document.querySelector(".filter")
const filterSelected = document.querySelector(".filter-selected__items")
if (filter && filterSelected) {
  const catfilter = {
    checkInp: function (inp) {
      inp.checked = true
      inp.setAttribute("checked", true)
    },
    uncheckInp: function (inp) {
      inp.checked = false
      inp.removeAttribute("checked")
    },
    setSelected: function (item) {
      let txt = item.parentNode.querySelector("span:last-child").textContent
      let idx = item.getAttribute("data-id")
      filterSelected.insertAdjacentHTML("afterbegin", `<div class="filter-selected__item" data-target="${idx}">${txt}${sprite("close")}</div>`)
    },
    removeSelected: function (index) {
      if (filterSelected.querySelector(`[data-target="${index}"]`)) {
        filterSelected.querySelector(`[data-target="${index}"]`).remove()
      }
    },
    selectedOnClick: function (e) {
      filterSelected.querySelectorAll(".filter-selected__item").forEach((item, idx) => {
        if (item.contains(e.target)) {
          let dataTarget = item.getAttribute("data-target")
          filter.querySelectorAll("input")[dataTarget].click()
          item.remove()
        }
      })
    },
    resetFilter: function () {
      filter.querySelectorAll("label input").forEach(inp => {
        inp.checked = false
        inp.removeAttribute("checked")
      })
      filterSelected.innerHTML = ""
    }
  }
  filter.querySelectorAll("label input").forEach((inp, i) => {
    inp.setAttribute("data-id", i)
    let index = inp.getAttribute("data-id")
    inp.addEventListener("change", () => {
      if (inp.checked) {
        catfilter.setSelected(inp)
      } else {
        catfilter.removeSelected(index)
      }
    })
    if (inp.parentNode.parentNode.classList.contains("accordion__header")) {
      let nextEl = inp.closest(".accordion").querySelector(".accordion__body")
      let nextElInp = nextEl.querySelectorAll("label input")
      inp.addEventListener("change", () => {
        if (inp.checked) {
          nextElInp.forEach(el => {
            catfilter.checkInp(el)
            catfilter.removeSelected(el.getAttribute("data-id"))
          })
        } else {
          nextElInp.forEach(el => catfilter.uncheckInp(el))
        }
      })
      nextElInp.forEach(el => {
        el.addEventListener("change", () => {
          if (Array.from(nextElInp).every(item => item.checked)) {
            catfilter.checkInp(inp)
            setTimeout(() => {
              nextElInp.forEach(el => {
                catfilter.removeSelected(el.getAttribute("data-id"))
              })
              catfilter.setSelected(inp)
            }, 0);
          } else if (inp.checked) {
            catfilter.uncheckInp(inp)
            catfilter.removeSelected(index)
            nextElInp.forEach(el => {
              if (el.checked) {
                catfilter.setSelected(el)
              }
            })
          }
        })
      })
    }
  })
  filterSelected.addEventListener("click", e => catfilter.selectedOnClick(e))
  document.querySelector(".filter-selected__reset").addEventListener("click", () => catfilter.resetFilter())
}
// show more
const extraList = document.querySelectorAll(".extra-list")
if (extraList) {
  extraList.forEach(item => {
    item.querySelector(".extra-list__btn").addEventListener("click", () => {
      if (!item.classList.contains("open")) {
        item.classList.add("open")
        item.querySelector(".extra-list__btn span").textContent = "Скрыть все"
      } else {
        item.classList.remove("open")
        item.querySelector(".extra-list__btn span").textContent = "Показать еще"
      }
    })
  })
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".custom-select__options input").forEach(item => {
    item.addEventListener("change", (e) => {
      setActiveOption(select)
      closeSelectCustom(select);
    });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
// set active select option
function setActiveOption(select) {
  let activeInpTxt = select.querySelector("input:checked").nextElementSibling.innerHTML
  select.querySelector(".custom-select__selected span").innerHTML = activeInpTxt
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
if (customSelect) {
  customSelect.forEach(select => {
    select.querySelector(".custom-select__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
}
const product = document.querySelector(".product")
if (product) {
  const itemTexture = document.querySelectorAll(".item-texture")
  const textureModal = document.querySelector(".texture-modal")
  const orderForm = document.querySelector("#orderPafarmsForm")
  const colorize = document.querySelector(".params-product__colorize")
  const reflect = document.querySelector(".params-product__reflect")
  const greyscale = document.querySelector(".params-product__greyscale")
  const sizeProduct = document.querySelector(".size-product")
  const imageCrop = document.getElementById("imageCrop")
  const mainImg = document.querySelector(".main-product__img")
  let cropper
  let cropperCanvas
  let cropBox
  let shiftImg = 0
  const initialData = {
    width: +orderForm.querySelector("input[name=width]").value,
    height: +orderForm.querySelector("input[name=height]").value,
    aRatio: +orderForm.querySelector("input[name=aRatio]").value,
    aRatioDefault: +orderForm.querySelector("input[name=aRatioDefault]").value,
    square: +orderForm.querySelector("input[name=square]").value,
    greyscale: orderForm.querySelector("input[name=greyscale]").value, //boolean
    reflectX: orderForm.querySelector("input[name=reflectX]").value, //boolean
    imgStartX: +orderForm.querySelector("input[name=imgStartX]").value,
    imgStartY: +orderForm.querySelector("input[name=imgStartY]").value,
    cropped: orderForm.querySelector("input[name=cropped]").value, //boolean
    colorize: orderForm.querySelector("input[name=colorize]").value, //boolean
    texture: orderForm.querySelector("input[name=texture]").value,
    selfSize: orderForm.querySelector("input[name=selfSize]").value, //boolean
    designPrice: orderForm.querySelector("input[name=designPrice]").value, //boolean
    priceStandart: +orderForm.querySelector("input[name=priceStandart]").value,
    priceDesign: +orderForm.querySelector("input[name=priceDesign]").value,
    priceTotal: +orderForm.querySelector("input[name=priceTotal]").value,
    imgURl: orderForm.querySelector("input[name=imgURl]").value,
  }
  const modifiedData = Object.assign({}, initialData)

  function setTotal() {
    document.querySelector(".total-product__price").textContent = String(modifiedData.designPrice ? modifiedData.priceDesign : modifiedData.priceStandart).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
    document.querySelector(".total-product__square").textContent = modifiedData.square
    modifiedData.priceTotal = Math.round(modifiedData.square * (modifiedData.designPrice ? modifiedData.priceDesign : modifiedData.priceStandart))
    orderForm.querySelector("input[name=priceTotal]").value = modifiedData.priceTotal
    document.querySelector(".total-product__totalprice").textContent = String(modifiedData.priceTotal).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
  }
  function setDesignPrice() {
    if (modifiedData.reflectX || modifiedData.greyscale || modifiedData.imgStartX || modifiedData.cropped || modifiedData.selfSize) {
      modifiedData.designPrice = true
    } else {
      modifiedData.designPrice = false
    }
    orderForm.querySelector("input[name=designPrice]").value = modifiedData.designPrice
    setTotal()
  }
  function setSize() {
    modifiedData.square = ((modifiedData.width * modifiedData.height) / 10000).toFixed(2)
    orderForm.querySelector("input[name=square]").value = modifiedData.square
    orderForm.querySelector("input[name=width]").value = modifiedData.width
    orderForm.querySelector("input[name=height]").value = modifiedData.height
    sizeProduct.querySelector("input[name=selfWidth]").value = modifiedData.width
    sizeProduct.querySelector("input[name=selfHeight]").value = modifiedData.height
    document.querySelector(".main-product__width span").textContent = modifiedData.width
    document.querySelector(".main-product__height span").textContent = modifiedData.height
    setTotal()
  }
  function imgStartX(e) {
    if (e.target.classList.contains("prev")) {
      if (modifiedData.reflectX) {
        shiftImg = shiftImg + 2
      } else {
        shiftImg = shiftImg - 2
      }
    } else {
      if (modifiedData.reflectX) {
        shiftImg = shiftImg - 2
      } else {
        shiftImg = shiftImg + 2
      }
    }
    cropperCanvas.style.backgroundPosition = `${shiftImg}px center`
    mainImg.style.backgroundPosition = `${document.querySelector(".main-product__btn").clientWidth + shiftImg}px center`
    cropper.setCropBoxData(cropper.getCropBoxData())
  }
  function setImg() {
    if (cropBox && modifiedData.selfSize) {
      htmlToImage.toJpeg(cropBox)
      .then(function (dataUrl) {
        modifiedData.imgURl = dataUrl
      })
      .catch(function (error) {
        modifiedData.imgURl = initialData.imgURl
        console.error('oops, something went wrong!', error);
      }); 
    } else {
      modifiedData.imgURl = initialData.imgURl
    }
    orderForm.querySelector("input[name=imgURl]").value = modifiedData.imgURl
  }
  // product-swiper
  document.querySelectorAll(".main-product__mainswiper .media-contain").forEach(slide => slide.style.paddingTop = (initialData.height / initialData.width) * 100 + "%")
  document.querySelector(".main-product__ratio span").style.paddingTop = (initialData.height / (initialData.width)) * 100 + "%"
  const productThumbs = new Swiper(".main-product__thumbs", {
    slidesPerView: 3.55,
    spaceBetween: 12,
    observer: true,
    observeParents: true,
    speed: 800,
  })
  const productMain = new Swiper(".main-product__mainswiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: "fade",
    speed: 0,
    thumbs: {
      swiper: productThumbs
    }
  })
  //select texture
  if (itemTexture && textureModal) {
    // texture swiper
    const textureSwiper = new Swiper(textureModal.querySelector(".swiper"), {
      slidesPerview: 1,
      observe: true,
      observeParents: true,
      effect: "fade",
      navigation: {
        nextEl: textureModal.querySelector(".nav-btn--next"),
        prevEl: textureModal.querySelector(".nav-btn--prev")
      }
    })
    //open texture swiper modal onclick
    itemTexture.forEach((item, idx) => {
      item.querySelector(".media-cover").addEventListener("click", () => {
        textureSwiper.slideTo(idx)
        openModal(textureModal)
      })
    })
    //select texture
    textureModal.querySelectorAll(".texture-modal__btn").forEach((btn, idx) => {
      btn.addEventListener("click", e => {
        if (!itemTexture[idx].classList.contains("selected")) {
          itemTexture.forEach(item => {
            item.classList.remove("selected")
          })
          itemTexture[idx].classList.add("selected")
          let texture = e.target.getAttribute("data-texture-name")
          let texturePrice = e.target.getAttribute("data-texture-priceStandart")
          let texturePriceDes = e.target.getAttribute("data-texture-priceDesign")
          modifiedData.texture = texture
          modifiedData.priceStandart = texturePrice
          modifiedData.priceDesign = texturePriceDes
          orderForm.querySelector("input[name=texture]").value = texture
          orderForm.querySelector("input[name=priceStandart").value = texturePrice
          orderForm.querySelector("input[name=priceDesign").value = texturePriceDes
          setTotal()
        }
        closeModal(textureModal)
      })
    })
  }
  // order colorize
  colorize.querySelector("input").addEventListener("change", e => {
    modifiedData.colorize = e.target.checked ? true : false
    orderForm.querySelector("input[name=colorize]").value = e.target.checked
  })
  //reflect
  reflect.querySelector("input").addEventListener("change", e => {
    modifiedData.reflectX = e.target.checked ? true : false
    orderForm.querySelector("input[name=reflectX]").value = e.target.checked
    e.target.checked ? cropper.scale(-1, 1) : cropper.scale(1, 1)
    mainImg.classList.toggle("reverse")
    cropperCanvas.classList.toggle("reverse")
    cropBox.classList.toggle("reverse")
    setDesignPrice()
  })
  //greyscale
  greyscale.querySelector("input").addEventListener("change", e => {
    modifiedData.greyscale = e.target.checked ? true : false
    orderForm.querySelector("input[name=greyscale]").value = e.target.checked
    mainImg.classList.toggle("greyscale")
    cropperCanvas.classList.toggle("greyscale")
    cropBox.classList.toggle("greyscale")
    setDesignPrice()
  })
  // check/uncheck self-size
  sizeProduct.querySelectorAll(".size-product__btn").forEach(item => {
    item.addEventListener("click", () => {
      sizeProduct.querySelectorAll(".size-product__btn").forEach(item => {
        item.classList.remove("active")
      })
      item.classList.toggle("active")
      if (item.classList.contains("self-size")) {
        modifiedData.selfSize = true
        document.querySelector(".main-product__preview").classList.remove("swiper-show")
      } else {
        modifiedData.selfSize = false
        document.querySelector(".main-product__preview").classList.add("swiper-show")
        cropper.reset()
        modifiedData.width = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-width")
        modifiedData.height = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-height")
        setSize()
      }
      orderForm.querySelector("input[name=selfSize]").value = modifiedData.selfSize
      setDesignPrice()
    })
  })
  //size select options onclick
  sizeProduct.querySelector(".custom-select").querySelectorAll("input").forEach(item => {
    item.addEventListener("change", () => {
      modifiedData.width = +item.getAttribute("data-width")
      modifiedData.height = +item.getAttribute("data-height")
      setSize()
    })
  })
  //set ratio
  sizeProduct.querySelector(".size-product__fixed").addEventListener("change", e => {
    if (e.target.checked) {
      modifiedData.aRatio = modifiedData.width / modifiedData.height
      cropper.options.aspectRatio = modifiedData.aRatio
    } else {
      modifiedData.aRatio = modifiedData.aRatioDefault
      cropper.options.aspectRatio = ""
    }
    orderForm.querySelector("input[name=aRatio]").value = modifiedData.aRatio
  })
  //set self size
  document.querySelectorAll(".size-product__inp input").forEach(inp => {
    inp.addEventListener("change", e => {
      if (Number.isInteger(e.target.value) || e.target.value > 0) {
        let initW = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-width")
        let initH = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-height")
        if (modifiedData.aRatio != modifiedData.aRatioDefault) {
          if (e.target.name == "selfHeight") {
            sizeProduct.querySelector("input[name=selfWidth]").value = Math.round(sizeProduct.querySelector("input[name=selfWidth]").value * (e.target.value / modifiedData.height))
          } else if (e.target.name == "selfWidth") {
            sizeProduct.querySelector("input[name=selfHeight]").value = Math.round(sizeProduct.querySelector("input[name=selfHeight]").value * (e.target.value / modifiedData.width))
          }
        }
        let dataW = Math.round(sizeProduct.querySelector("input[name=selfWidth]").value)
        let dataH = Math.round(sizeProduct.querySelector("input[name=selfHeight]").value)
        let wPercent = (dataW / initW) * 100
        let hPercent = (dataH / initH) * 100
        let widthInc = 1
        let heightInc = 1
        if (wPercent > 100) {
          widthInc = wPercent / 100
        }
        if (hPercent > 100) {
          heightInc = hPercent / 100
        } 
        if (wPercent > hPercent) {
          hPercent = hPercent / widthInc
        } else if (wPercent < hPercent) {
          wPercent = wPercent / heightInc
        }
        modifiedData.width = dataW
        modifiedData.height = dataH
        let data = {
          left: (cropper.containerData.width - cropper.containerData.width * wPercent / 100) / 2,
          top: (cropper.containerData.height - cropper.containerData.height * hPercent / 100) / 2,
          width: wPercent > 100 ? cropper.containerData.width : cropper.containerData.width * wPercent / 100,
          height: hPercent > 100 ? cropper.containerData.height : cropper.containerData.height * hPercent / 100,
        }
        cropper.setCropBoxData(data)
      } else {
        sizeProduct.querySelector("input[name=selfWidth]").value = modifiedData.width
        sizeProduct.querySelector("input[name=selfHeight]").value = modifiedData.height
      }
    })
  })
  //shift image
  let interval
  document.querySelectorAll(".main-product__btn").forEach(item => {
    item.addEventListener("mousedown", e => {
      clearInterval(interval)
      interval = setInterval(() => {
        imgStartX(e)
      }, 50);
    })
    item.addEventListener("mouseup", e => {
      clearInterval(interval)
    })
    item.addEventListener("touchstart", e => {
      clearInterval(interval)
      interval = setInterval(() => {
        imgStartX(e)
      }, 50);
    })
    item.addEventListener("touchend", e => {
      clearInterval(interval)
    })
  })
  // cropper
  cropper = new Cropper(imageCrop, {
    viewMode: 2,
    movable: false,
    zoomable: false,
    rotatable: false,
    autoCropArea: 1,
    dragMode: "none",
    ready: function (event) {
      cropper.zoomTo(1);
      cropperCanvas = document.querySelector(".cropper-canvas")
      cropperCanvas.style.backgroundImage = `url(${cropper.image.currentSrc}`
      document.querySelector(".cropper-view-box").innerHTML += "<span></span>"
      cropBox = document.querySelector(".cropper-view-box span")
      cropBox.style.backgroundImage = `url(${cropper.image.currentSrc}`
      cropBox.style.backgroundSize = `${cropper.containerData.width}px ${cropper.containerData.height}px`
      cropBox.style.backgroundPosition = `-${cropper.getCropBoxData().left - shiftImg}px -${cropper.getCropBoxData().top}px`
    },
    crop: function (event) {
      if (cropBox) {
        cropBox.style.backgroundSize = `${cropper.containerData.width}px ${cropper.containerData.height}px`
        cropBox.style.backgroundPosition = `${-cropper.getCropBoxData().left + shiftImg}px ${-cropper.getCropBoxData().top}px`
      }
      let sdvigX = Math.round(Math.abs(cropper.getCropBoxData().left - shiftImg) % cropper.containerData.width)
      if ((shiftImg - cropper.getCropBoxData().left) <= 0) {
        modifiedData.imgStartX = sdvigX
      } else {
        modifiedData.imgStartX = ((cropper.containerData.width - sdvigX) > 1 && (sdvigX > 1)) ? cropper.containerData.width - sdvigX : 0
      }
      modifiedData.imgStartY = Math.round(cropper.getCropBoxData().top)
      orderForm.querySelector("input[name=imgStartX").value =  modifiedData.imgStartX
      orderForm.querySelector("input[name=imgStartY").value =  modifiedData.imgStartY
      //let widthDiff = (Math.ceil(cropper.cropBoxData.width) / cropper.containerData.width) * 100
      let checkedWidth = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-width")
      let checkedHeight = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-height")
      let widthDiff = (cropper.cropBoxData.width / cropper.containerData.width) * 100
      let heightDiff = (cropper.cropBoxData.height / cropper.containerData.height) * 100
      let diffW = 1
      let diffH = 1
      let diffT = 1
      if ((modifiedData.width > checkedWidth) || (modifiedData.height > checkedHeight)) {
        diffW = modifiedData.width / checkedWidth
        diffH = modifiedData.height / checkedHeight
        diffT = ( diffW >= diffH) ? diffW : diffH
      }
      modifiedData.width = Math.round((checkedWidth * widthDiff * diffT) / 100)
      modifiedData.height = Math.round((checkedHeight * heightDiff * diffT) / 100)
      setSize()
      setTimeout(setImg, 2000);
    },
    cropmove: function (event) {
    },
  });
}
