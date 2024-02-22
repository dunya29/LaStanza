const customSelect = document.querySelectorAll(".custom-select")
const overlay = document.querySelector(".overlay")
const header = document.querySelector(".header")
const iconMenu = document.querySelector(".icon-menu")
const mobMenu = document.querySelector(".mobile-menu")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const cartModal = document.querySelector(".cart-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const shareImg = document.querySelector('.share-modal__img')
const sharePdf = document.querySelector('.share-modal__pdf')
const shareEmail = document.querySelector(".share-modal__mail")
const shareLink = document.querySelector(".share-modal__link")
let paddingValue
let animSpd = 400
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
    document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
    document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
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
// addToCart
function  addToCart() {
  openModal(cartModal)
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
    modal.classList.contains("review-modal") ? document.querySelector(".review-success-modal").classList.add("open") : successModal.classList.add("open")
  } else {
    openModal(successModal)
  }
}
// mailFormSuccess
function mailFormSuccess(form) {
  form.querySelector("input").value = ""
}
//open modal
function openModal(modal) {
  if (!mobMenu.classList.contains("open") && !document.querySelector(".header__search.show")) {
    disableScroll()
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  if ( modal.querySelector("video")) {
    modal.querySelectorAll("video").forEach(item => item.pause())
  }
  modal.classList.remove("open")
  setTimeout(() => {
    if (!mobMenu.classList.contains("open") && !document.querySelector(".header__search.show")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
    if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
      closeModal(mod)
      if (mod.classList.contains("custom-select__options")) {
        closeSelectCustom(mod.parentNode)
      }
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
// close success modal 
document.querySelectorAll(".success-close").forEach(item => {
  item.addEventListener("click", () => item.parentNode.querySelector(".modal__close").click())
})
// city-modal
const cityModal = document.querySelector('.city-modal')
if (cityModal) {
  cityModal.querySelector(".main-btn").addEventListener("click", () => closeModal(cityModal))
  cityModal.querySelector(".stroke-btn").addEventListener("click", () => {
    closeModal(cityModal)
    setTimeout(() => {
      openModal(document.querySelector(".city-search-modal"))
    }, animSpd);  
  })
}
// fixed header
window.addEventListener("scroll", () => {
   if (document.querySelector(".header__top").getBoundingClientRect().bottom < 0) {
    header.classList.add("fixed")
    document.querySelector(".header__bottom").classList.add("fixed-block")
   } else {
    header.classList.remove("fixed")
    document.querySelector(".header__bottom").classList.remove("fixed-block")
   }
})
// open mob menu
iconMenu.addEventListener("click", () => {
  disableScroll()
  mobMenu.classList.add("open")
})
// close mob menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 992.98 && mobMenu.classList.contains("open")) {
    mobMenu.querySelector(".mobile-menu__close").click()
  }
})
//close mob menu
mobMenu.addEventListener("click", e => {
  if (!mobMenu.querySelector(".mobile-menu__inner").contains(e.target) || mobMenu.querySelector(".mobile-menu__close").contains(e.target)) {
    mobMenu.classList.remove("open")
    enableScroll()
  }
})

//show/unshow header search
const searchToggle = document.querySelector(".search-toggle")
const searchClose = document.querySelector(".search__close")
searchToggle.addEventListener("click", () => {
  document.querySelector(".header__search").classList.add("show")
  disableScroll()
  overlay.classList.add("show")
  header.classList.remove("open")
  iconMenu.setAttribute('aria-label', 'Открыть меню');
})
searchClose.addEventListener("click", () => {
 document.querySelector(".header__search").classList.remove("show")
  overlay.classList.remove("show")
  setTimeout(() => {
    if (!header.classList.contains("open")) {
      enableScroll()
    }
  }, animSpd); 
})
overlay.addEventListener("click", () => {
  searchClose.click()
})
//search form
const searchForm = document.querySelectorAll(".search-form")
if (searchForm) {
  searchForm.forEach(item => {
    item.querySelector("input").addEventListener("input", () => {
      if (item.querySelector("input").value.length > 0) {
        item.querySelector(".search-form__reset").classList.add("show")
      } else {
        item.querySelector(".search-form__reset").classList.remove("show")
      }
    })
    item.addEventListener("reset", () => {
      item.querySelector(".search-form__reset").classList.remove("show")
    })
  })
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
  inp.forEach(item => {
    Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
  })
}
//lazyload video
const lazyVid = document.querySelectorAll(".lazy-video")
if (lazyVid) {
  lazyVid.forEach(item => {
    item.addEventListener("click", function lazyVidOnClick() {
      let url = item.getAttribute("data-src"); 
      let webmUrl = item.getAttribute("data-src-webm");
      const video = document.createElement("video")
      video.setAttribute("loop","")
      video.setAttribute("playsinline","")
      video.setAttribute("controls","")
      item.append(video)
      let webm = "" !== item.querySelector("video").canPlayType('video/webm; codecs="vp8, vorbis"')
      if (webm && webmUrl) {
        item.querySelector("video").innerHTML = `<source src="${webmUrl}" type='video/webm'>`
      } else {
        item.querySelector("video").innerHTML = `<source src="${url}">`
      }
      setTimeout(() => {
        item.querySelector("video").muted = true
        item.querySelector("video").play()
        item.classList.add("play")
      }, 0); 
      item.removeEventListener("click", lazyVidOnClick)
    })
  })
}
//anchor
$(".js-anchor").click((function(e) {
  e.preventDefault()
  let href = $(this).attr("href")
  let dest = $(href).offset().top;
  return $("html,body").animate({
      scrollTop: dest - $(".header__bottom").height() - 20 
  }, 500)
  }
))
//file-form
let fileTypes = ["image/png", "image/jpeg"]
document.querySelectorAll(".file-form").forEach(item => {
  item.querySelector("input").addEventListener("change", e => {  
    item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file.size >  10 * 1024 * 1024) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
        item.querySelector(".item-form__error").textContent = "Файл должен быть менее 10 МБ"
      } else if (!fileTypes.includes(file.type)) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
        item.querySelector(".item-form__error").textContent = 'Разрешённые форматы: png, jpg'
      } else {
        item.classList.remove("error")
        item.querySelector(".item-form__error").textContent = "" 
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => {
          item.querySelector(".file-form__items").innerHTML += `<div class="file-form__item">
          <img src=${reader.result} alt="">
          <div class="file-form__name">${file.name}</div>
          <div class="file-form__size">${(file.size / (1024 * 1024)).toFixed(2)}Mb</div>
          <div class="file-form__del">${sprite("close")}</div>
         </div>
        `
        }
        reader.onerror = () => {
          console.log(reader.error);
        }
        
      }
    }
  })
  //delete file
  item.addEventListener("click", e => {
    item.querySelectorAll(".file-form__del").forEach((del, idx) => {
        if (del.contains(e.target)) {
            const dt = new DataTransfer()
            const input = item.querySelector("input")
            const { files } = input
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                if (i !== idx)
                    dt.items.add(file)
            }
            input.files = dt.files
            setTimeout(() => {
              del.parentNode.remove()
           }, 0);
        }
    })

})
})
//modal swiper
const swiper1 = document.querySelectorAll(".swiper-1")
if (swiper1) {
  swiper1.forEach(item => {
    const itemSwiper = new Swiper(item.querySelector(".swiper"), {
      observe: true,
      observeParents: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 800,
      allowTouchMove: false,
      navigation: {
        nextEl: item.querySelector(".nav-btn--next"),
        prevEl: item.querySelector(".nav-btn--prev")
      }
    })
  })
}
//bestsellers swiper
let initBest = false
let bestSwiper
const bestsellers = document.querySelector(".bestsellers")
if (bestsellers) {
  function initTheBestsSwiper() {
    if (window.innerWidth <= 992.98 && !initBest) {
      initBest = true
      bestSwiper = new Swiper(bestsellers.querySelector(".swiper"), {
        slidesPerView: 1.13,
        spaceBetween: 20,
        observe: true,
        observeParents: true,
        speed: 800,
        navigation: {
          nextEl: bestsellers.querySelector(".nav-btn--next"),
          prevEl: bestsellers.querySelector(".nav-btn--prev")
        },
        breakpoints: {
          699.98: {
            slidesPerView: 2,
          }
        }
      })
    } else if (initBest) {
      initBest = false
      bestSwiper.destroy()
    }
  }
  initTheBestsSwiper()
  window.addEventListener("resize", initTheBestsSwiper)
}
const mainArt = document.querySelector(".main-articles")
if (mainArt) {
  const artSwiper = new Swiper(mainArt.querySelector(".swiper"), {
    slidesPerView: 1.13,
    spaceBetween: 20,
    observe: true,
    observeParents: true,
    speed: 800,
    navigation: {
      nextEl: mainArt.querySelector(".nav-btn--next"),
      prevEl: mainArt.querySelector(".nav-btn--prev")
    },
    breakpoints: {
      1690.98: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      992.98: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      699.98: {
        slidesPerView: 2.42,
        spaceBetween: 20,
      },
    }
  })
}
//accordion
$(".accordion__header").on("click", function () {
  $(".accordion").each(function() {
    if($(this).find("video").length > 0) {
      $(this).find("video").get(0).pause()
    }
  })
  $(this).toggleClass("open")
      .siblings(".accordion__body")
      .slideToggle()
      .parents(".accordion")
      .siblings(".accordion")
      .find(".accordion__header")
      .removeClass("open")
      .siblings(".accordion__body")
      .slideUp();
})
/* 
const accHeader = document.querySelectorAll(".accordion__header")
const accBody = document.querySelectorAll(".accordion__body")
accHeader.forEach((item,idx) => {
  item.addEventListener("click", e => {
    accHeader.forEach( el => {
      if (!item.classList.contains("active") && el.classList.contains("active")) {
        el.click()
      }
    })
    smoothDrop(accHeader[idx], accBody[idx], 500)
  })
}) */
//filter accordion
const filterAcc = document.querySelectorAll(".filter-acc")
/* $(".filter-acc__header").on("click", function(e) {
  if (!["input", "label"].includes(e.target.localName)) {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").siblings(".filter-acc__body").slideUp()
    } else {
      $(this).addClass("open").siblings(".filter-acc__body").slideDown()
    }
  }
}) */
filterAcc.forEach(item => {
  item.querySelector(".filter-acc__header").addEventListener("click", e => {
    if (!["input", "label"].includes(e.target.localName)) {
      smoothDrop(item.querySelector(".filter-acc__header"), item.querySelector(".filter-acc__body"), 500)
    }
  })
})
// another cards swiper
const cardSwiper = document.querySelectorAll(".card-swiper")
if (cardSwiper) {
  cardSwiper.forEach(item => {
    const swiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: 1.13,
      spaceBetween: 20,
      observe: true,
      observeParents: true,
      loop: true,
      navigation: {
        prevEl: item.querySelector(".nav-btn--prev"),
        nextEl: item.querySelector(".nav-btn--next")
      },
      speed: 800,
      breakpoints: {
        1690.98: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        992.98: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        699.98: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
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
    if (inp.parentNode.parentNode.classList.contains("filter-acc__header")) {
      let nextEl = inp.closest(".filter-acc").querySelector(".filter-acc__body")
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
  filter.querySelector(".filter__form").addEventListener("reset", () => catfilter.resetFilter())
  //open mob filter
  document.querySelector(".filter-icon").addEventListener("click", () => {
    disableScroll()
    filter.classList.add("open")
  })
  //mob filter close
  filter.addEventListener("click", e => {
    if (!filter.querySelector(".filter__form").contains(e.target) || filter.querySelector(".filter__close").contains(e.target) ) {
      filter.classList.remove("open")
      enableScroll()
    }
  })
}
// show more
const extraList = document.querySelectorAll(".extra-list")
if (extraList) {
  extraList.forEach(item => {
    let openTxt = item.querySelector(".extra-list__btn").getAttribute("data-open")
    let closeTxt = item.querySelector(".extra-list__btn").getAttribute("data-close")
    item.querySelector(".extra-list__btn").addEventListener("click", () => {
      if (!item.classList.contains("open")) {
        item.classList.add("open")
        item.querySelector(".extra-list__btn span").textContent = closeTxt
      } else {
        item.classList.remove("open")
        item.querySelector(".extra-list__btn span").textContent = openTxt
      }
    })
  })
}
//quantity onclick
const quantity = document.querySelectorAll(".quantity")
if (quantity) {
  quantity.forEach(item => {
    const inp = item.querySelector("input")
    item.querySelector(".js-minus").addEventListener("click", () => {
      if (inp.value > 1) {
        inp.value--
      }
    })
    item.querySelector(".js-plus").addEventListener("click", () => {
      inp.value++
    })
    inp.addEventListener("change", e => {
      if (Number.isInteger(e.target.value) || e.target.value > 0) {
        inp.value = e.target.value
      } else {
        inp.value = 1
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
  if (select.querySelector(".modal.open")) {
    closeModal(select.querySelector(".modal"));
  }
}
if (customSelect) {
  customSelect.forEach(select => {
    select.querySelector(".custom-select__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        if (window.innerWidth < 992.98 && select.querySelector(".modal")) {
          openModal(select.querySelector(".modal"))
        }
        if (window.innerWidth < 992.98 && document.querySelector(".self-size.active")) {
          sizeProduct.querySelectorAll(".size-product__btn")[0].click()
        }
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992.98 && select.querySelector(".modal.open")) {       
        closeModal(select.querySelector(".modal"))
      } else if (window.innerWidth < 992.98 && select.querySelector(".modal") && !select.querySelector(".modal.open")) {
        closeSelectCustom(select)
      }
    })
  })
}
const intro = document.querySelector(".intro")
if (intro) {
  document.querySelectorAll(".intro-thumb__nmb").forEach(item => +item.textContent < 10 ? item.textContent = "0"+ item.textContent : "")
  let thumbswiper = new Swiper(".intro__thumbswiper", {
    slidesPerView: 1,
    spaceBetween: 56,
    observe: true,
    observeParents: true,
    speed: 1000,
    loop: true,
    freeMode: true,
    navigation: {
      nextEl: intro.querySelector(".nav-btn--next"),
      prevEl: intro.querySelector(".nav-btn--prev")
    },
    breakpoints: {
      1690.98: {
        slidesPerView: 4,
        spaceBetween: 54,
      },
      1090.98: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992.98: {
        slidesPerView: 2,
        spaceBetween: 24,
      }
    }
  })
  let bgswiper = new Swiper(".intro__bgswiper", {
    observe: true,
    observeParents: true,
    speed: 1000,
		loop: true,
    watchSlidesProgress: true,
		parallax: true,
    thumbs: {
      swiper: thumbswiper,
    },
    navigation: {
      nextEl: intro.querySelector(".nav-btn--next"),
      prevEl: intro.querySelector(".nav-btn--prev")
    }
  })
  let txtswiper = new Swiper(".intro__textswiper", {
    observe: true,
    observeParents: true,
    speed: 1000,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    allowTouchMove: false,
    navigation: {
      nextEl: intro.querySelector(".nav-btn--next"),
      prevEl: intro.querySelector(".nav-btn--prev")
    },
  }) 
  bgswiper.on("slideChange",()=> {
    txtswiper.slideTo(bgswiper.activeIndex)
  })
}
const product = document.querySelector(".product")
const itemTexture = document.querySelectorAll(".item-texture")
const textureModal = document.querySelector(".texture-modal")
const textureAllModal = document.querySelector("#texture-modal-all")
const orderForm = document.querySelector("#orderPafarmsForm")
const colorize = document.querySelector(".params-product__colorize")
const reflect = document.querySelector(".params-product__reflect")
const greyscale = document.querySelector(".params-product__greyscale")
const sizeProduct = document.querySelector(".size-product")
const imageCrop = document.getElementById("imageCrop")
const mainImg = document.querySelector(".main-product__img")
let initialData
let modifiedData
let cropper
let cropperCanvas
let cropBox
let shiftImg = 0
let previousCall = 0
let lastCallTimer
let doc
let lastCall = Date.now()
let interval
let activeTextureIdx = 0
if (product) {
  initialData = {
    width: +orderForm.querySelector("input[name=width]").value,
    height: +orderForm.querySelector("input[name=height]").value,
    aRatio: +orderForm.querySelector("input[name=aRatio]").value,
    aRatioDefault: +orderForm.querySelector("input[name=aRatioDefault]").value,
    square: +orderForm.querySelector("input[name=square]").value,
    greyscale: +orderForm.querySelector("input[name=greyscale]").value, //boolean
    reflectX: +orderForm.querySelector("input[name=reflectX]").value, //boolean
    imgStartX: +orderForm.querySelector("input[name=imgStartX]").value,
    imgStartY: +orderForm.querySelector("input[name=imgStartY]").value,
    cropped: +orderForm.querySelector("input[name=cropped]").value, //boolean
    colorize: +orderForm.querySelector("input[name=colorize]").value, //boolean
    texture: orderForm.querySelector("input[name=texture]").value,
    selfSize: +orderForm.querySelector("input[name=selfSize]").value, //boolean
    designPrice: +orderForm.querySelector("input[name=designPrice]").value, //boolean
    priceStandart: +orderForm.querySelector("input[name=priceStandart]").value,
    priceDesign: +orderForm.querySelector("input[name=priceDesign]").value,
    priceTotal: +orderForm.querySelector("input[name=priceTotal]").value,
    imgURl: orderForm.querySelector("input[name=imgURl]").value,
  }
  modifiedData = Object.assign({}, initialData)
  function setTotal() {
    document.querySelector(".total-product__price").textContent = String(modifiedData.designPrice ? modifiedData.priceDesign : modifiedData.priceStandart).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
    document.querySelector(".total-product__square").textContent = modifiedData.square
    modifiedData.priceTotal = Math.round(modifiedData.square * (modifiedData.designPrice ? modifiedData.priceDesign : modifiedData.priceStandart))
    orderForm.querySelector("input[name=priceTotal]").value = modifiedData.priceTotal
    document.querySelector(".total-product__totalprice").textContent = String(modifiedData.priceTotal).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
    document.querySelector(".total-product__mobprice").textContent = String(modifiedData.priceTotal).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
  }
  function setDesignPrice() {
    if (modifiedData.reflectX || modifiedData.greyscale || modifiedData.imgStartX != 0 || modifiedData.cropped || modifiedData.selfSize) {
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
    document.querySelector(".main-product__width .main-product__line").style.width = (cropper.cropBoxData.width / cropper.containerData.width) * 100 + "%"
    document.querySelector(".main-product__height span").textContent = modifiedData.height
    document.querySelector(".main-product__height .main-product__line").style.height = (cropper.cropBoxData.height / cropper.containerData.height) * 100 + "%"
    setTotal()
  }
  function imgStartX(e) {
    if (e.target.classList.contains("prev")) {
      if (!modifiedData.reflectX) {
        shiftImg = shiftImg + 2
      } else {
        shiftImg = shiftImg - 2
      }
    } else {
      if (!modifiedData.reflectX) {
        shiftImg = shiftImg - 2
      } else {
        shiftImg = shiftImg + 2
      }
    }
    cropperCanvas.style.backgroundPosition = `${shiftImg}px center`
    mainImg.style.backgroundPosition = `${document.querySelector(".main-product__btn").clientWidth + shiftImg}px center`
    cropper.setCropBoxData(cropper.getCropBoxData())
  }
  function setImg(t) {
    lastCall = Date.now();
    if ((lastCall - previousCall) <= t) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(async () => {
      if (cropBox && modifiedData.selfSize) {
        await htmlToImage.toJpeg(cropBox)
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
      //orderForm.querySelector("input[name=imgURl]").value = modifiedData.imgURl
      shareImg.setAttribute("href", modifiedData.imgURl)
      shareImg.download = document.title + ".jpeg"
    }, t);
  }
  setImg(2000)
  // product-swiper
  document.querySelectorAll(".main-product__mainswiper .media-contain").forEach(slide => slide.style.paddingTop = (initialData.height / initialData.width) * 100 + "%")
  document.querySelector(".main-product__ratio span").style.paddingTop = (initialData.height / (initialData.width)) * 100 + "%"
  const productThumbs = new Swiper(".main-product__thumbs", {
    slidesPerView: 3,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    speed: 800,
    breakpoints: {
      1690.98: {
        slidesPerView: 3.55,
        spaceBetween: 12,
      }
    }
  })
  const productMain = new Swiper(".main-product__mainswiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: "fade",
    speed: 0,
    allowTouchMove: false,
    thumbs: {
      swiper: productThumbs
    }
  })
  //select texture
  if (textureModal) {
    //select texture
    function selectTexture() {
      itemTexture.forEach(item => {
        item.classList.remove("selected")
      })
      product.querySelectorAll(".item-texture")[activeTextureIdx].classList.add("selected")
      textureAllModal.querySelectorAll(".item-texture")[activeTextureIdx].classList.add("selected")
      let texture = textureModal.querySelectorAll(".swiper-slide")[activeTextureIdx].getAttribute("data-texture-name")
      let texturePrice = textureModal.querySelectorAll(".swiper-slide")[activeTextureIdx].getAttribute("data-texture-priceStandart")
      let texturePriceDes = textureModal.querySelectorAll(".swiper-slide")[activeTextureIdx].getAttribute("data-texture-priceDesign")
      modifiedData.texture = texture
      modifiedData.priceStandart = texturePrice
      modifiedData.priceDesign = texturePriceDes
      orderForm.querySelector("input[name=texture]").value = texture
      orderForm.querySelector("input[name=priceStandart").value = texturePrice
      orderForm.querySelector("input[name=priceDesign").value = texturePriceDes
      setTotal()
      closeModal(textureModal)
    }
    // texture swiper
    const textureSwiper = new Swiper(textureModal.querySelector(".swiper"), {
      slidesPerview: 1,
      observe: true,
      observeParents: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 800,
      navigation: {
        nextEl: textureModal.querySelector(".nav-btn--next"),
        prevEl: textureModal.querySelector(".nav-btn--prev")
      }
    })
    // pause video onslidechange
    textureSwiper.on("slideChange", ()=> {
      if (textureModal.querySelector("video")) {
        textureModal.querySelectorAll("video").forEach(video => {
          video.pause()
        })
      }
    })
    //item-texture onclick
    product.querySelectorAll(".item-texture").forEach((item, idx) => {
      item.addEventListener("click", e => {
        if (!item.querySelector(".media-cover").contains(e.target)) {
          activeTextureIdx = idx
          selectTexture()
        } else {
          textureSwiper.slideTo(idx)
          openModal(textureModal)
        }
      })
    })
    //select texture in texture-modal
    textureModal.querySelector(".texture-modal__btn").addEventListener("click", e => {
      activeTextureIdx = textureSwiper.realIndex
      selectTexture()
    })
    // select texture in textureAllModal
    textureAllModal.querySelectorAll(".item-texture").forEach((item, idx) => {
      item.addEventListener("click", e => {
        if (!item.querySelector(".media-cover").contains(e.target)) {
          textureAllModal.querySelectorAll(".item-texture").forEach(el => el.classList.remove("selected"))
          item.classList.add("selected")
          activeTextureIdx = idx
        } else {
          textureSwiper.slideTo(idx)
          closeModal(textureAllModal)
          openModal(textureModal)
        }
      })
    })
    textureAllModal.querySelector(".main-btn").addEventListener("click", ()=> {
      selectTexture()
      closeModal(textureAllModal)
    })
    // reset selected texture
    document.querySelectorAll(".texture-modal__resetBtn").forEach(item => {
      item.addEventListener("click", e => {
        activeTextureIdx = 0
        selectTexture()
        closeModal(textureAllModal)
        closeModal(textureModal)
      })
    })
    window.addEventListener("resize", () => {
      if (window.innerWidth > 699.98 && textureAllModal.classList.contains("open")) {
        closeModal(textureAllModal)
      }
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
    if (!document.querySelector(".size-product__btn.self-size").classList.contains("active")) {
      document.querySelector(".size-product__btn.self-size").click()
    }
  })
  //greyscale
  greyscale.querySelector("input").addEventListener("change", e => {
    modifiedData.greyscale = e.target.checked ? true : false
    orderForm.querySelector("input[name=greyscale]").value = e.target.checked
    mainImg.classList.toggle("greyscale")
    cropperCanvas.classList.toggle("greyscale")
    cropBox.classList.toggle("greyscale")
    setDesignPrice()
    if (!document.querySelector(".size-product__btn.self-size").classList.contains("active")) {
      document.querySelector(".size-product__btn.self-size").click()
    }
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
        document.querySelector(".main-product__top").classList.add("size-show")
        document.querySelector(".main-product__preview").classList.remove("swiper-show")
        cropper.resize() 
        if (window.innerWidth < 992.98) {
          openModal(sizeProduct.querySelector(".self-modal"))
        }    
      } else {
        shiftImg = 0
        modifiedData.selfSize = false
        modifiedData.imgStartX = "0%"
        modifiedData.width = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-width")
        modifiedData.height = +sizeProduct.querySelector(".custom-select").querySelector("input[type=radio]:checked").getAttribute("data-height")
        document.querySelector(".main-product__top").classList.remove("size-show")
        document.querySelector(".main-product__preview").classList.add("swiper-show")
        mainImg.style.backgroundPosition = null
        cropper.reset()
        cropperCanvas.style.backgroundPosition = `${shiftImg}px center`
        cropper.setCropBoxData(cropper.getCropBoxData())
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
  //self-modal__btns onlick
  if (document.querySelector(".self-modal")) {
    document.querySelectorAll(".self-modal .btn").forEach(item => {
      item.addEventListener("click", () => {
        if(item.classList.contains("stroke-btn")) {
          sizeProduct.querySelectorAll(".size-product__btn")[0].click()
        }
        closeModal(document.querySelector(".self-modal.open"))
      })
    })
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992.98 && document.querySelector(".self-modal.open")) {       
        closeModal(document.querySelector(".self-modal"))
      } else if (window.innerWidth < 992.98 && document.querySelector(".self-size.active") && !document.querySelector(".self-modal.open") ) {
       // openModal(document.querySelector(".self-modal"))
        sizeProduct.querySelectorAll(".size-product__btn")[0].click()
      }
    })
  }
  //shift image
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
        let reflectDiff = cropper.containerData.width - cropper.getCropBoxData().width
        if (modifiedData.reflectX) {
          cropBox.style.backgroundPosition = `${-(-cropper.getCropBoxData().left - shiftImg + reflectDiff)}px ${-cropper.getCropBoxData().top}px`
        } else {
          cropBox.style.backgroundPosition = `${-cropper.getCropBoxData().left + shiftImg}px ${-cropper.getCropBoxData().top}px`
        }
      }
      let sdvigX = Math.round(Math.abs(cropper.getCropBoxData().left - shiftImg) % cropper.containerData.width)
      if ((shiftImg - cropper.getCropBoxData().left) <= 0) {
        modifiedData.imgStartX = sdvigX
      } else {
        modifiedData.imgStartX = ((cropper.containerData.width - sdvigX) > 1 && (sdvigX > 1)) ? cropper.containerData.width - sdvigX : 0
      }
      modifiedData.imgStartY = Math.round(cropper.getCropBoxData().top)
      orderForm.querySelector("input[name=imgStartX").value =  Math.floor(modifiedData.imgStartX * 100 / cropper.containerData.width) + "%"
      orderForm.querySelector("input[name=imgStartY").value =  Math.floor(modifiedData.imgStartY * 100 / cropper.containerData.height) + "%"
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
      setImg(2000)
    },
  });
  //share pdf
  sharePdf.addEventListener("click", e => {
    e.preventDefault()
    window.jsPDF = window.jspdf.jsPDF
    let incrVal = Math.trunc(595/modifiedData.width) - 1 
    doc = new jsPDF('p', 'pt', 'a4', false);
    doc.setFillColor(238, 238, 238);
    doc.addImage(modifiedData.imgURl, undefined, (595 - modifiedData.width * incrVal)/2, 100, modifiedData.width * incrVal ,  modifiedData.height * incrVal, undefined, undefined);
    doc.save(document.title + '.pdf')
  })
  //share email
  shareEmail.addEventListener("click", () => {
    shareEmail.setAttribute("href", `mailto:?subject=${document.title}&body=${window.location.href}`)
  })
  //copy link
  shareLink.addEventListener("click", e => {
    e.preventDefault();
    let inp = document.createElement("input");
    document.body.append(inp)
    inp.value = window.location.href
    inp.select()
    document.execCommand("copy")
    inp.remove()
  })
  // open cartmodal on success
  document.querySelector(".total-product .main-btn").addEventListener("click",  addToCart)
  // remove fixed btn on scroll to footer
  window.addEventListener('scroll', () => {
    let windowTop = window.pageYOffset || document.documentElement.scrollTop
    if (window.innerHeight - document.querySelector(".footer").getBoundingClientRect().bottom + 30 >= 0) {
      document.querySelector(".total-product__body").classList.add("hidden")
    } else {
      document.querySelector(".total-product__body").classList.remove("hidden")
    }
  })
}
document.querySelectorAll(".catalog__btn").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".catalog__btn").forEach(item => item.classList.remove("active"))
    document.querySelector(".catalog__items").style.opacity = 0   
    setTimeout(() => {
      item.classList.add("active")
      document.querySelector(".catalog__items").setAttribute("data-column",item.getAttribute("data-column"))
      document.querySelector(".catalog__items").style.opacity = ""
    }, 150);
  })
})
const tippy = document.querySelectorAll('.tippy')
const tippyContent = document.querySelector(".tippy-content")
if (tippy) {
  tippy.forEach(item => {
    function move() {
      let top = item.getBoundingClientRect().top
      let left = item.getBoundingClientRect().left
      if (window.innerWidth < left + tippyContent.clientWidth + item.clientWidth) {
        tippyContent.style.left = left - tippyContent.clientWidth + "px"
      } else {
        tippyContent.style.left = left + item.clientWidth + "px"
      }
      if ((top - tippyContent.clientHeight) < 50) {
        tippyContent.style.top = top + item.clientHeight + 4 + "px"
      } else {
        tippyContent.style.top = top - tippyContent.clientHeight - 4 + "px"
      }
    }
    item.addEventListener("mouseenter", () => {
      tippyContent.textContent = item.getAttribute("data-content")
      tippyContent.classList.add("show")
      move()
    })
    item.addEventListener("mouseleave", () => {
      tippyContent.textContent = ""
      tippyContent.classList.remove("show")
    })
  })
  window.addEventListener("resize", () => {
    tippyContent.textContent = ""
    tippyContent.classList.remove("show")
  })
  window.addEventListener("scroll", () => {
    tippyContent.textContent = ""
    tippyContent.classList.remove("show")
  })
}
const dataDelNav = document.querySelectorAll("[data-del-nav]")
const dataDelBlock = document.querySelectorAll("[data-del-block]")
if (dataDelNav && dataDelBlock) {
  dataDelNav.forEach((item,idx) => {
    item.addEventListener("change", () => {
      dataDelBlock.forEach(el => {
        el.classList.remove("active")
      })
      dataDelBlock[idx].classList.add("active")
      dataDelBlock[idx].style.opacity = "0"
      setTimeout(() => {
        dataDelBlock[idx].style.opacity = "1"
      }, 0);
    })
  })
}
const cart = document.querySelector(".cart")
if (cart) {
  document.querySelector(".item-cart__comment-btn").addEventListener("click", () => {
    document.querySelector(".item-cart__comment-txt").classList.toggle("show")
  })
  document.querySelector(".cart-del").querySelectorAll("input[type=radio]").forEach(item => {
    item.addEventListener("change", ()=> {
      if(item.classList.contains("pickup")) {
        document.querySelector(".cart-payment .pickup").classList.add("show")
      } else {
        document.querySelector(".cart-payment .pickup").classList.remove("show")
      }
    })
  })
}
const serviceAside = document.querySelector(".service-aside")
const serviceBtn = document.querySelector(".service__mobBtn")
const serviceLinks =  document.querySelector(".service-aside__links")
if (serviceAside) {
 /* const anchors = serviceLinks.querySelectorAll(".js-anchor")
  anchors.forEach((item,i) => {
    const elementClick = item.getAttribute("href")
    const destination = document.querySelector(`${elementClick}`)
    $(item).click((function(e) {
      e.preventDefault()
      let href = $(this).attr("href")
      let dest = $(href).offset().top - window.innerHeight / 3;
      return $("html,body").animate({
          scrollTop: dest
      }, 500)
      }
    ))
    let options = {
      rootMargin: "0px",
      threshold: 1,
    };
    let callback = function (entries, observer) {
      entries.forEach(observe => {
        if (observe.isIntersecting) {
          anchors.forEach(el => {
            el.classList.remove("active")
          })
          item.classList.add("active")
          let scrollDiff = serviceLinks.querySelector(".js-anchor.active").getBoundingClientRect().top - serviceLinks.getBoundingClientRect().top ; 
          serviceLinks.scrollTop = serviceLinks.scrollTop + scrollDiff 
        }
      })
    }
    let observer = new IntersectionObserver(callback, options);
    observer.observe(destination)
  }) */
  window.addEventListener("scroll", () => {
    const anchors = serviceLinks.querySelectorAll(".js-anchor")
    anchors.forEach((item,i) => {
      const elementClick = item.getAttribute("href")
      const destination = document.querySelector(`${elementClick}`)
      //let offTop = parseInt(getComputedStyle(destination).marginBottom) < 30 ? 100 : (parseInt(getComputedStyle(destination).marginBottom) + 20)
      let offTop = document.querySelector(".header__bottom").clientHeight + (parseInt(getComputedStyle(destination).marginBottom) < 30 ? 20 : (parseInt(getComputedStyle(destination).marginBottom) / 2))
      if (destination.getBoundingClientRect().top < offTop) {
        anchors.forEach(el => {
          el.classList.remove("active")
        })
        item.classList.add("active")
        let scrollDiff = serviceLinks.querySelector(".js-anchor.active").getBoundingClientRect().top - serviceLinks.getBoundingClientRect().top ; 
        serviceLinks.scrollTop = serviceLinks.scrollTop + scrollDiff 
      } 
    })   
  })
  // mob serviceLinks
  if (serviceBtn) {
    serviceBtn.addEventListener("click", ()=> {
      disableScroll()
      serviceAside.classList.add("open")
    })
    serviceAside.addEventListener("click", e => {
      if (!serviceAside.querySelector(".service-aside__sticky").contains(e.target) || serviceAside.querySelector(".service-aside__close").contains(e.target) || e.target.classList.contains("js-anchor")) {
        serviceAside.classList.remove("open")
        enableScroll()
      }
    })
  }
}
let rangeSliders = document.querySelectorAll(".calc-range")
function initRangeSliders() {
  rangeSliders.forEach(item => {
    let rangeVal = item.querySelector("input[type=number")
    let rangeSlider = item.querySelector(".calc-range__slider")
    let val = +item.getAttribute("data-initval")
    let min = +item.getAttribute("data-min")
    let max = +item.getAttribute("data-max")
    noUiSlider.create(rangeSlider, {
      start: val,
      connect: [true, false],
      range: {
        'min': min,
        'max': max
      }
    });
    rangeVal.addEventListener("change", () => {
      rangeSlider.noUiSlider.set(rangeVal.value)
    });
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeVal.value = parseInt(values[0])
      setRangePrice()
    }); 
  })
}
function setRangePrice() { 
  let width = document.querySelector(".calc-range__width").value
  let height = document.querySelector(".calc-range__height").value
  let areaPrice = +document.querySelector(".service-calc__areas input:checked").getAttribute("data-price")
  document.querySelector(".service-calc__price").textContent = String(Math.ceil(width * height / 10000 * areaPrice)).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
}
if (rangeSliders) {
  initRangeSliders()
  document.querySelectorAll(".service-calc__areas input").forEach(inp => {
    inp.addEventListener("change", setRangePrice)
  })
}
const itemReview = document.querySelectorAll(".item-review")
if (itemReview) {
  function showExtraBtn() {
    itemReview.forEach(item => {
      let height = item.querySelector(".item-review__content").clientHeight
      item.querySelector(".item-review__content").classList.remove("line-clamp")
      let fullHeight = item.querySelector(".item-review__content").clientHeight
      item.querySelector(".item-review__content").classList.add("line-clamp")
      if (fullHeight > height ) {
        item.querySelector(".item-review__body").classList.add("extra-btn-show")
      } else {
        item.querySelector(".item-review__body").classList.remove("extra-btn-show")
      }
    })
  }
  showExtraBtn()
  window.addEventListener("resize",showExtraBtn)
}
// reviews slider
const reviewSwipers = document.querySelectorAll(".item-review__images")
if (reviewSwipers) {
  reviewSwipers.forEach(item => {
    const swiper = new Swiper(item, {
      slidesPerView: 2.4,
      spaceBetween: 8,
      observe: true,
      observeParents: true,
      breakpoints: {
        1690.98: {
          slidesPerView: 5.1,
          spaceBetween: 16
        },
        992.98: {
          slidesPerView: 4.2,
          spaceBetween: 16
        },
        575.98: {
          slidesPerView: 4.5,
          spaceBetween: 16
        },
        479.98: {
          slidesPerView: 3.1,
          spaceBetween: 16
        }
      }
    })
  })
}
// progress bar
if (document.querySelector(".det-reviews")) {
  document.querySelectorAll(".det-reviews__item").forEach(item => {
    item.querySelector(".det-reviews__bar span").style.width = item.querySelector(".det-reviews__perc").textContent
  })
}
//custom portfolio fancybox
const portfolioPage = document.querySelector(".portfolio-page")
if (portfolioPage) {
  portfolioPage.addEventListener("click", e => {
    portfolioPage.querySelectorAll("[data-fancy]").forEach(item => {
      if (item.contains(e.target)) {
          let imgSrc = []
          let title = []
          let art = []
          let url = []
          let val = item.getAttribute("data-fancy")
          portfolioPage.querySelectorAll("[data-fancy]").forEach(el => {
            if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
              imgSrc.push(el.getAttribute("data-src"))
              title.push(el.nextElementSibling.textContent)
              art.push(el.getAttribute("data-art"))
              url.push(el.getAttribute("data-url"))
            }
          })
          let initialSl = imgSrc.indexOf(item.getAttribute("data-src"))   
          document.querySelector(".footer").insertAdjacentHTML('afterend', `
          <div class="modal portfolio-modal" id="portfolio-modal">
            <div class="modal__overlay">
              <div class="modal__content">
                <div class="modal__scroll">
                  <div class="container">
                    <button type="button" class="modal__close">${sprite("close")}</button>
                    <div class="swiper-1 modal__swiper">
                      <div class="swiper">
                        <div class="swiper-wrapper">
                          ${imgSrc.map((item,idx) => `<div class="swiper-slide">
                          <div class="mb-40 modal__top">
                            <h3>${title[idx]}</h3>
                            <span class="portfolio-modal__art">${art[idx]}</span>
                          </div>
                          <div class="mb-40 portfolio-modal__preview">
                            <div class="media-cover">
                              <img src=${item} alt="${title[idx]}">
                            </div>
                          </div>
                          <a href="${url[idx]}" class="btn main-btn">Заказать такую же</a>
                           </div>`).join("")}
                        </div>
                      </div>
                      <div class="swiper-nav">
                        <button type="button" class="nav-btn nav-btn--prev">${sprite("arrow-left")}</button>
                        <button type="button" class="nav-btn nav-btn--next">${sprite("arrow-right")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         `);
          let portfolioSwiper = new Swiper(".portfolio-modal .swiper", {
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            initialSlide: initialSl,
            effect: "fade",
            fadeEffect: {
              crossFade: true
            },
            speed: 500,
            navigation: {
              nextEl: document.querySelector(".portfolio-modal .nav-btn--next"),
              prevEl: document.querySelector(".portfolio-modal .nav-btn--prev")
            }
          })
          const portfolioModal = document.querySelector(".portfolio-modal")
          openModal(portfolioModal)
          portfolioModal.addEventListener("click", e => {
            if (!portfolioModal.querySelector(".modal__content").contains(e.target) || portfolioModal.querySelector(".modal__close").contains(e.target)) {
              closeModal(portfolioModal)
              setTimeout(() => {
                portfolioModal.remove()
              }, animSpd);
            }
          })
      }
    })
  })
}