/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const burgerInput = document.querySelector('#burger-toggle');

  console.log('Mobile nav toggle button found:', mobileNavToggleBtn);
  console.log('Burger input found:', burgerInput);

  function mobileNavToogle() {
    console.log('Mobile nav toggle clicked');
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (burgerInput) {
      burgerInput.checked = !burgerInput.checked;
    }
    console.log('Body classes:', document.querySelector('body').classList.toString());
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    console.log('Click event listener added to mobile nav toggle');
  } else {
    console.log('Mobile nav toggle button not found!');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
      
      // Store isotope instance globally for portfolio toggle
      window.globalIsotope = initIsotope;
      console.log('Isotope initialized with', initIsotope.filteredItems.length, 'visible items');
    });

    // Store filter buttons for portfolio toggle system
    window.portfolioFilterButtons = isotopeItem.querySelectorAll('.isotope-filters li');

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Portfolio Show/Hide Functionality
   */
  function initPortfolioToggle() {
    const toggleBtn = document.querySelector('#portfolio-toggle-btn');
    const mainContainer = document.querySelector('.isotope-container');
    
    console.log('Portfolio toggle init - Toggle button found:', toggleBtn);
    console.log('Portfolio toggle init - Main container found:', mainContainer);
    
    // Wait for isotope to be ready if it's not yet
    function waitForIsotope(callback, maxAttempts = 10) {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.globalIsotope || attempts >= maxAttempts) {
          clearInterval(checkInterval);
          callback();
        }
      }, 100);
    }
    
    waitForIsotope(() => {
      if (toggleBtn && mainContainer && window.globalIsotope) {
        let isExpanded = false;
        let currentFilter = '*'; // Track current filter
        let maxVisibleItems = 6; // Maximum items to show initially (mix from all categories)
        
        // Store all items by category
        const allItems = {
          aluminium: Array.from(document.querySelectorAll('.portfolio-item.filter-aluminium')),
          frameless: Array.from(document.querySelectorAll('.portfolio-item.filter-frameless')),
          commercial: Array.from(document.querySelectorAll('.portfolio-item.filter-storefront'))
        };
        
        // Function to create limited filter
        function createLimitedFilter(baseFilter) {
          if (baseFilter === '*') {
            // For "All", show only 5 items total (mix from different categories)
            return '.show-initial-all';
          } else if (baseFilter === '.filter-aluminium') {
            return '.filter-aluminium.show-initial';
          } else if (baseFilter === '.filter-frameless') {
            return '.filter-frameless.show-initial';
          } else if (baseFilter === '.filter-storefront') {
            return '.filter-storefront.show-initial';
          }
          return baseFilter;
        }
      
        // Function to show limited items
        function showLimitedItems() {
          const limitedFilter = createLimitedFilter(currentFilter);
          
          // Apply isotope filter with limited items
          window.globalIsotope.arrange({
            filter: limitedFilter
          });
          
          // Update button text and ensure visibility
          toggleBtn.textContent = 'Show More';
          toggleBtn.classList.remove('show-less');
          toggleBtn.style.display = 'inline-block';
          toggleBtn.style.visibility = 'visible';
          toggleBtn.style.opacity = '1';
          isExpanded = false;
        }
      
        // Function to show all items
        function showAllItems() {
          // Apply isotope filter with all items for current category
          window.globalIsotope.arrange({
            filter: currentFilter
          });
          
          // Update button text and ensure visibility
          toggleBtn.textContent = 'Show Less';
          toggleBtn.classList.add('show-less');
          toggleBtn.style.display = 'inline-block';
          toggleBtn.style.visibility = 'visible';
          toggleBtn.style.opacity = '1';
          isExpanded = true;
        }
        
        // Function to apply filter and manage visibility
        function applyFilter(filter) {
          currentFilter = filter;
          
          // Update active filter button
          if (window.portfolioFilterButtons) {
            window.portfolioFilterButtons.forEach(btn => {
              btn.classList.remove('filter-active');
              if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('filter-active');
              }
            });
          }
          
          // Show limited items for the new filter
          showLimitedItems();
          
          // Reinitialize AOS
          setTimeout(() => {
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, 100);
        }
        
        // Initialize with mix from all categories
        applyFilter('*');
        
        // Toggle button click handler
        toggleBtn.addEventListener('click', function() {
          if (!isExpanded) {
            showAllItems();
          } else {
            showLimitedItems();
          }
          
          // Reinitialize AOS
          setTimeout(() => {
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, 100);
        });
        
        // Filter button click handlers
        if (window.portfolioFilterButtons) {
          window.portfolioFilterButtons.forEach(function(filterBtn) {
            filterBtn.addEventListener('click', function() {
              const filter = this.getAttribute('data-filter');
              applyFilter(filter);
            });
          });
        }
      } else {
        console.log('Portfolio toggle init - Required elements not found');
        console.log('Toggle button exists:', !!toggleBtn);
        console.log('Main container exists:', !!mainContainer);
        console.log('Global isotope exists:', !!window.globalIsotope);
        
        // Ensure button is visible even if isotope isn't ready
        if (toggleBtn) {
          toggleBtn.style.display = 'inline-block';
          toggleBtn.style.visibility = 'visible';
          toggleBtn.style.opacity = '1';
        }
      }
    });
  }

  // Initialize portfolio toggle when page loads
  window.addEventListener('load', initPortfolioToggle);

})();