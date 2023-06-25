"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Slider = /*#__PURE__*/function () {
  function Slider(_ref) {
    var sliderElement = _ref.sliderElement,
      images = _ref.images,
      prevButton = _ref.prevButton,
      nextButton = _ref.nextButton;
    _classCallCheck(this, Slider);
    this.sliderElement = sliderElement;
    this.images = images;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.position = 0;
    this.width = this.getImagesWidth();
    this.addClassAndAttributes();
    this.addMoreImages();
    var lastImage = this.sliderElement.querySelector('img:last-child');
    lastImage.previousElementSibling.classList.add('active');
  }
  _createClass(Slider, [{
    key: "addMoreImages",
    value: function addMoreImages() {
      var firstImage = this.sliderElement.querySelector('img:first-child');
      if (firstImage.offsetLeft > 0) {
        if (firstImage.offsetLeft > this.width) {
          var times = Math.ceil(firstImage.offsetLeft / this.width);
          for (var i = 0; i < times; i++) {
            this.sliderElement.insertAdjacentHTML('afterbegin', this.images.map(function (image) {
              return image.outerHTML;
            }).join(''));
          }
        } else {
          this.sliderElement.insertAdjacentHTML('afterbegin', this.images.map(function (image) {
            return image.outerHTML;
          }).join(''));
        }
      }
    }
  }, {
    key: "addClassAndAttributes",
    value: function addClassAndAttributes() {
      this.images.forEach(function (image, index) {
        $(image).addClass("img-".concat(index + 1)).attr('data-index', index + 1).addClass('hidden');
        // to hide the first image that will be applied by fade in effect
      });
    }
  }, {
    key: "getImagesWidth",
    value: function getImagesWidth() {
      return this.images.reduce(function (totalWidth, image) {
        return totalWidth + image.width;
      }, 0);
    }
  }, {
    key: "onPrevButtonClick",
    value: function onPrevButtonClick() {
      var _this = this;
      var activeImg = this.sliderElement.querySelector('img.active');
      activeImg.classList.remove('active');
      activeImg.previousElementSibling.classList.add('active');
      var img = this.sliderElement.querySelector('img:last-child');
      this.position = activeImg.width + 10;
      this.sliderElement.style.transitionDuration = '.3s';
      this.sliderElement.style.transform = "translateX(".concat(this.position, "px)");
      setTimeout(function () {
        _this.sliderElement.style.transitionDuration = '0s';
        _this.sliderElement.style.transform = 'translateX(0px)';
        _this.sliderElement.prepend(img);
      }, 300);
    }
  }, {
    key: "onNextButtonClick",
    value: function onNextButtonClick() {
      var _this2 = this;
      var activeImg = this.sliderElement.querySelector('img.active');
      activeImg.classList.remove('active');
      activeImg.nextElementSibling.classList.add('active');
      var img = this.sliderElement.querySelector('img:nth-child(1)');
      this.position = -activeImg.nextElementSibling.width - 10;
      this.sliderElement.style.transitionDuration = '.3s';
      this.sliderElement.style.transform = "translateX(".concat(this.position, "px)");
      $(activeImg.nextElementSibling).hide().fadeIn(2000);
      setTimeout(function () {
        _this2.sliderElement.style.transitionDuration = '0s';
        _this2.sliderElement.style.transform = 'translateX(0px)';
        $(_this2.sliderElement).append(img);
      }, 300);
    }
  }]);
  return Slider;
}();
var onButtonsClick = function onButtonsClick(prevBtn, nextBtn, slider1, slider2) {
  $(prevBtn).click(function () {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    setTimeout(function () {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    }, 500);
    slider1.onPrevButtonClick();
    slider2.onPrevButtonClick();
  });
  $(nextBtn).click(function () {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    setTimeout(function () {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }, 500);
    slider1.onNextButtonClick();
    slider2.onNextButtonClick();
  });
};
document.addEventListener('DOMContentLoaded', function () {
  var prevButton = document.querySelector('.prev');
  var nextButton = document.querySelector('.next');
  var slider1 = new Slider({
    sliderElement: document.querySelector('.images1'),
    images: Array.from(document.querySelectorAll('.images1 img')),
    prevButton: document.querySelector('.prev'),
    nextButton: document.querySelector('.next')
  });
  var slider2 = new Slider({
    sliderElement: document.querySelector('.images2'),
    images: Array.from(document.querySelectorAll('.images2 img')),
    prevButton: document.querySelector('.prev'),
    nextButton: document.querySelector('.next')
  });
  onButtonsClick(prevButton, nextButton, slider1, slider2);
});
