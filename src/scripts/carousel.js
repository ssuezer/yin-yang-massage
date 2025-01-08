/* filepath: /C:/Users/sedat/Desktop/JS/astro/cosmetica-berlin/src/scripts/carousel.js */
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.testimonial-wrapper');
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 20;
    const maxIndex = items.length - 3; // Show 3 items at once

    const updateCarousel = () => {
      wrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index <= maxIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });

    // Auto scroll
    setInterval(() => {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }, 4000);

    // Initial state
    updateCarousel();
});