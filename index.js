class Slider {
  constructor({ sliderElement, images, prevButton, nextButton }) {
    this.sliderElement = sliderElement;
    this.images = images;
    this.prevButton = prevButton;
    this.nextButton = nextButton;

    this.position = 0;
    this.width = this.getImagesWidth();

    this.addClassAndAttributes();
    this.addMoreImages();

    const lastImage = this.sliderElement.querySelector('img:last-child');
    lastImage.previousElementSibling.classList.add('active');
  }

  addMoreImages() {
    const firstImage = this.sliderElement.querySelector('img:first-child');
    if (firstImage.offsetLeft > 0) {
      if (firstImage.offsetLeft > this.width) {
        const times = Math.ceil(firstImage.offsetLeft / this.width);
        for (let i = 0; i < times; i++) {
          this.sliderElement.insertAdjacentHTML('afterbegin', this.images.map(image => image.outerHTML).join(''));
        }
      } else {
        this.sliderElement.insertAdjacentHTML('afterbegin', this.images.map(image => image.outerHTML).join(''));
      }
    }
  }

  addClassAndAttributes() {
    this.images.forEach((image, index) => {
      image.classList.add(`img-${index + 1}`);
      image.setAttribute('data-index', index + 1);
      image.classList.add('hidden'); // to hide the first image that will be applied by fade in effect

    });
  }

  getImagesWidth() {
    return this.images.reduce((totalWidth, image) => totalWidth + image.width, 0);
  }


  onPrevButtonClick() {
    const activeImg = this.sliderElement.querySelector('img.active');
    activeImg.classList.remove('active');
    activeImg.previousElementSibling.classList.add('active');
    let img = this.sliderElement.querySelector('img:last-child');
    this.position = activeImg.width + 10;
    this.sliderElement.style.transitionDuration = '.3s';
    this.sliderElement.style.transform = `translateX(${this.position}px)`;
    setTimeout(() => {

      this.sliderElement.style.transitionDuration = '0s';
      this.sliderElement.style.transform = 'translateX(0px)';
      this.sliderElement.prepend(img);

    }, 300);
  }

  onNextButtonClick() {
    const activeImg = this.sliderElement.querySelector('img.active');
    activeImg.classList.remove('active');
    activeImg.nextElementSibling.classList.add('active');
    let img = this.sliderElement.querySelector('img:nth-child(1)');
    this.position = -activeImg.nextElementSibling.width - 10;
    this.sliderElement.style.transitionDuration = '.3s';
    this.sliderElement.style.transform = `translateX(${this.position}px)`;

    $(activeImg.nextElementSibling).hide().fadeIn(2000);
    setTimeout(() => {
      this.sliderElement.style.transitionDuration = '0s';
      this.sliderElement.style.transform = 'translateX(0px)';
      this.sliderElement.appendChild(img);


    }, 300);

  }
}

const onButtonsClick = (prevBtn, nextBtn, slider1, slider2) => {
  prevBtn.addEventListener('click', () => {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    setTimeout(() => {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    }, 500);
    slider1.onPrevButtonClick();
    slider2.onPrevButtonClick();

  });

  nextBtn.addEventListener('click', () => {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    setTimeout(() => {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }, 500);
    slider1.onNextButtonClick();
    slider2.onNextButtonClick();


  });
};

document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  const slider1 = new Slider({
    sliderElement: document.querySelector('.images1'),
    images: Array.from(document.querySelectorAll('.images1 img')),
    prevButton: document.querySelector('.prev'),
    nextButton: document.querySelector('.next')
  });

  const slider2 = new Slider({
    sliderElement: document.querySelector('.images2'),
    images: Array.from(document.querySelectorAll('.images2 img')),
    prevButton: document.querySelector('.prev'),
    nextButton: document.querySelector('.next')
  });

  onButtonsClick(prevButton, nextButton, slider1, slider2);
});


