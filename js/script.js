(function(){

  /*
  Javascript for the carousel.
  This is written in 'practical' javascript. This could be done within a class with proper methods and in a way that lets you create multiple carousels.
  If you want that then you can pretty easily change it to do that.
  These scripts also assumes that the html is correct and the css is loaded for the page.
  */

  /** 
   * To make selecting elements more convenient 
   * This is a somewhat similar syntax to jQuery, which is where the name $ comes from
   * 
   * @param {string} selector
   * @param {HTMLElement} parent (optional)
   * @returns {NodeList}
    */
  function $(selector, parent) {
    let target = parent || document; // If the 
    return target.querySelectorAll(selector);
  };

  /* Variables */
  let currentItem = 0;
  let carouselTimeout;
  let auto = true; // Set to false to disable automatic carousel. You may want to add a pause button that changes this to false when clicked

  const carouselElement = $('#example-carousel')[0];
  const carouselItems = $('.carousel-item', carouselElement);
  const carouselButtons = $('.carousel-button');
  const carouselIndicators = $('.carousel-indicators a', carouselElement);


  /**
   * Goes to the next Item
   */
  function next(){
    // If on last item go back to start, otherwise go to next item
    if ( currentItem + 1 >= carouselItems.length ){
      currentItem = 0;
    } else {
      currentItem++;
    }
    updateCarousel();
  }

  /**
   * Goes to the previous Item
   */
  function prev(){
    // If on first item go to end, otherwise go to previous item
    if ( currentItem - 1 < 0 ){
      currentItem = carouselItems.length - 1;
    } else {
      currentItem--;
    }
    updateCarousel();
  }

  /**
   * Change to specific item
   * @param {int} n 
   */
  function changeCarouselTo(n){
    // If n is in valid range then change current item to n
    if (n > -1 && n < carouselItems.length){
      currentItem = n;
    }
    updateCarousel();
  }

  /**
   * Updates the carousel items and the item indicators
   */
  function updateCarousel(){
    for(let i = 0; i < carouselItems.length; i++){
      carouselItems[i].classList.remove('current');
    }
    carouselItems[currentItem].classList.add('current');
    
    for (let i = 0; i < carouselIndicators.length; i++) {
      carouselIndicators[i].classList.remove('current');
    }
    carouselIndicators[currentItem].classList.add('current');

    // Run autoChangeItem to reset the delay to 3 seconds again:
    autoChangeItem();
  }

  // TODO: Make this not have weird behaviour when changing browser tab. Issue is with css not updating but the script still running.

  /**
   * Schedule the carousel item to change every 3 second
   */
  function autoChangeItem(){
    // Clear any timeout that might already be set. If it isn't already set this does nothing
    clearTimeout(carouselTimeout);

    // if automatic changing of slides is disabled then don't schedule a change of item
    if (!auto){
      return;
    }

    // Set the timeout
    carouselTimeout = setTimeout(()=>{
      // Go the the next item
      next();
      // Schedule another change:
      autoChangeItem();
    }, 3000);
  }

  // Add click event listeners to the carousel controls
  for (let i = 0; i < carouselButtons.length; i++) {
    if ( carouselButtons[i].classList.contains('carousel-next') ){
      carouselButtons[i].addEventListener('click', event=>{
        next();
      });
    } else if ( carouselButtons[i].classList.contains('carousel-prev') ){
      carouselButtons[i].addEventListener('click', event=>{
        prev();
      });
    }
  }

  // Add click event to the carousel indicators
  for (let i = 0; i < carouselIndicators.length; i++) {
    carouselIndicators[i].addEventListener('click', event => {
      changeCarouselTo(i);
    });
  }

  // Start the automattic rolling of the carousel:
  autoChangeItem();

})();