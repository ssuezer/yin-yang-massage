const slider = document.getElementById('slider');
if (slider) {
  const slides = slider.querySelector('.slides');
  const imageNodes = [...slides.querySelectorAll('img')];
  const prevBtn = slider.querySelector('.prev-btn');
  const nextBtn = slider.querySelector('.next-btn');
  
  // Clone images to create a seamless loop
  imageNodes.forEach((img) => {
    const clone = img.cloneNode(true);
    slides.appendChild(clone);
  });

  let totalImages = slides.querySelectorAll('img').length; // now doubled
  let singleSetCount = imageNodes.length;                 // original set length
  let index = 0;
  let autoSlideInterval; // Store interval ID

  function showSlide(i, smooth = true) {
    const firstImage = slides.querySelectorAll('img')[0];
    // get the current rendered width of the image
    const slideWidth = firstImage.getBoundingClientRect().width;
  
    if (!smooth) {
      slides.style.transition = 'none';
    } else {
      slides.style.transition = 'transform 0.3s ease-in-out';
    }
    slides.style.transform = `translateX(-${i * slideWidth}px)`;
  }

  function nextSlide() {
    index++;
    showSlide(index);
    
    // If we've passed the last original image, jump back without animation
    if (index >= totalImages - singleSetCount) {
      setTimeout(() => {
        index = index % singleSetCount; 
        showSlide(index, false);
      }, 300);
    }
  }

  function prevSlide() {
    // If we’re at the start, jump to last part
    if (index <= 0) {
      index = singleSetCount;
      showSlide(index, false);
    }
    index--;
    showSlide(index);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  // Initial auto-slide setup
  resetAutoSlide();
}