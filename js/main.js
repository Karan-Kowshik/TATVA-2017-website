(function() {
  'use strict';

  /* Mobile detect */
  var desktop_nav, height_line, initWorkFilter, init_YTPlayer, init_background_image, init_classic_menu, init_classic_menu_resize, init_count_number, init_lightbox, init_map, init_masonry, init_navigation_scroll, init_progress_bar, init_skrollr, init_sliders, init_wow, mobileTest, mobile_nav;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    mobileTest = true;
    $("html").addClass("mobile");
  } else {
    mobileTest = false;
    $("html").addClass("no-mobile");
  }


  /* Page Loader */

  $(window).load(function() {
    $('.page-loader').delay(0).fadeOut('slow');
  });


  /* Adding Background Image */

  init_background_image = function() {
    var pageSection;
    pageSection = $(".bg-img, .parallax");
    pageSection.each(function() {
      if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
      }
    });
  };

  init_background_image();


  /* skrollr */

  init_skrollr = function() {
    if (($(window).width() >= 1024) && (mobileTest === false)) {
      skrollr.init({
        forceHeight: false,
        smoothScrolling: false
      });
    }
  };

  init_skrollr();


  /* Carousel Sliders */

  init_sliders = function() {
    $(".fullwidth-slider").owlCarousel({
      autoPlay: 8000,
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      navigation: true,
      pagination: true,
      addClassActive: true,
      navigationText: ["<span class='angle'></span>", "<span class='angle'></span>"],

      /* Animation on slider */
      afterInit: function() {
        var animationElements;
        animationElements = $(".owl-item.active .animate-e");
        $(window).load(function() {
          animationElements.each(function() {
            var effect;
            effect = $(this).attr('data-effect');
            $(this).addClass('animated ' + effect);
          });
        });
      },
      beforeMove: function() {
        var animationElements;
        animationElements = $(".owl-item.active .animate-e");
        animationElements.each(function() {
          var effect;
          effect = $(this).attr('data-effect');
          $(this).removeClass('animated ' + effect);
        });
      },
      afterMove: function() {
        var animationElements;
        animationElements = $(".owl-item.active .animate-e");
        animationElements.each(function() {
          var effect;
          effect = $(this).attr('data-effect');
          $(this).addClass('animated ' + effect);
        });
      }
    });
    $(".fullwidth-testimotal-slider").owlCarousel({
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      navigation: true,
      pagination: true,
      navigationText: ["<span class='angle'></span>", "<span class='angle'></span>"]
    });
    $(".small-carousel").owlCarousel({
      autoPlay: 2500,
      stopOnHover: true,
      items: 6,
      itemsDesktop: [1199, 4],
      itemsTabletSmall: [768, 3],
      itemsMobile: [480, 2],
      pagination: false,
      navigation: false
    });
    $(".work-full-slider").owlCarousel({
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      navigation: true,
      navigationText: ["<span class='angle'></span>", "<span class='angle'></span>"]
    });
    $(".content-slider").owlCarousel({
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      navigation: true,
      navigationText: ["<span class='angle'></span>", "<span class='angle'></span>"]
    });
    $(".team-slider").owlCarousel({
      autoPlay: false,
      stopOnHover: true,
      slideSpeed: 350,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 2],
      itemsTablet: [768, 2],
      itemsMobile: [480, 1],
      autoHeight: true,
      navigation: false,
      pagination: true
    });
    $(".about-slider").owlCarousel({
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      navigation: false,
      pagination: true
    });
  };

  init_sliders();


  /* Progress Bar */

  init_progress_bar = function() {
    $(".progress-bar").appear(function() {
      var addPerstange, count, progressContainer, progressPerstange, step;
      progressContainer = $(this);
      progressPerstange = progressContainer.attr("data-progress");
      step = 5;
      count = 30;
      addPerstange = function() {
        progressContainer.css("width", count + "%");
        if (count < progressPerstange) {
          count += step;
          setTimeout(addPerstange, 40);
        }
      };
      addPerstange();
    });
  };

  if (($(window).width() >= 1024) && (mobileTest === false)) {
    init_progress_bar();
  }


  /* Navigation Panel */

  height_line = function(height_object, height_donor) {
    height_object.height(height_donor.height());
    height_object.css({
      'line-height': height_donor.height() + 'px'
    });
  };

  mobile_nav = $('.navbar-mobile');

  desktop_nav = $('.navbar-desktop');

  init_classic_menu_resize = function() {
    $('.mobile-on .navbar-desktop > ul').css('max-height', $(window).height() - $('.main-nav').height() - 20 + 'px');
    if ($(window).width() <= 1024) {
      $('.main-nav').addClass('mobile-on');
    } else if ($(window).width() > 1024) {
      $('.main-nav').removeClass('mobile-on');
      desktop_nav.show();
    }
  };

  init_classic_menu = function() {
    var check_scroll, menuHasSub, menuThisLi;
    check_scroll = function() {
      if ($(window).scrollTop() > 10) {
        $('.js-transparent').removeClass('transparent');
        $('.main-nav, .nav-logo-wrap .logo, .navbar-mobile').addClass('small-height');
      } else {
        $('.js-transparent').addClass('transparent');
        $('.main-nav, .nav-logo-wrap .logo, .navbar-mobile').removeClass('small-height');
      }
    };
    $('.js-stick').sticky({
      topSpacing: 0
    });
    height_line($('.inner-nav > ul > li > a'), $('.main-nav'));
    height_line(mobile_nav, $('.main-nav'));
    mobile_nav.css({
      'width': $('.main-nav').height() + 'px'
    });
    if ($('.main-nav').hasClass('transparent')) {
      $('.main-nav').addClass('js-transparent');
    }
    check_scroll();
    $(window).scroll(function() {
      check_scroll();
    });
    mobile_nav.on('click', function() {
      if (desktop_nav.hasClass('js-opened')) {
        desktop_nav.slideUp('slow').removeClass('js-opened');
        $(this).removeClass('active');
      } else {
        desktop_nav.slideDown('slow').addClass('js-opened');
        $(this).addClass('active');
      }
    });
    desktop_nav.find('a:not(.menu-has-sub)').on('click', function() {
      if (mobile_nav.hasClass('active')) {
        desktop_nav.slideUp('slow').removeClass('js-opened');
        mobile_nav.removeClass('active');
      }
    });
    menuHasSub = $('.menu-has-sub');
    menuThisLi = void 0;
    $('.mobile-on .menu-has-sub').find('.fa:first').removeClass('fa-angle-right').addClass('fa-angle-down');
    menuHasSub.on('click', function() {
      if ($('.main-nav').hasClass('mobile-on')) {
        menuThisLi = $(this).parent('li:first');
        if (menuThisLi.hasClass('js-opened')) {
          menuThisLi.find('.menu-sub:first').slideUp(function() {
            menuThisLi.removeClass('js-opened');
            menuThisLi.find('.menu-has-sub').find('.fa:first').removeClass('fa-angle-up').addClass('fa-angle-down');
          });
        } else {
          $(this).find('.fa:first').removeClass('fa-angle-down').addClass('fa-angle-up');
          menuThisLi.addClass('js-opened');
          menuThisLi.find('.menu-sub:first').slideDown();
        }
        return false;
      } else {

      }
    });
    menuThisLi = menuHasSub.parent('li');
    menuThisLi.hover((function() {
      if (!$('.main-nav').hasClass('mobile-on')) {
        $(this).find('.menu-sub:first').stop(true, true).fadeIn('fast');
      }
    }), function() {
      if (!$('.main-nav').hasClass('mobile-on')) {
        $(this).find('.menu-sub:first').stop(true, true).delay(100).fadeOut('fast');
      }
    });
  };

  init_classic_menu();

  init_classic_menu_resize();

  $(window).resize(function() {
    init_classic_menu_resize();
  });


  /* Navigation On SCroll */

  init_navigation_scroll = function() {

    /* Smooth scroll */
    var menuLinks, sections;
    $('.scroll li a, a.scroll').smoothScroll({
      speed: 1200
    });
    sections = $('body section');
    menuLinks = $('.scroll-nav li a');
    $(window).scroll(function() {
      sections.filter(":in-viewport:first").each(function() {
        var activeLink, activeSection;
        activeSection = $(this);
        activeLink = $('.scroll-nav li a[href$="#' + activeSection.attr("id") + '"]');
        menuLinks.removeClass('active');
        activeLink.addClass('active');
      });
    });
  };

  init_navigation_scroll();


  /* Portfolio Filter */

  initWorkFilter = function() {
    var filter, filterBlock, isotope_mode, itemSelector;
    filter = 0;
    filterBlock = $('.work-container');
    itemSelector = '.work-item';
    isotope_mode = 'masonry';
    filterBlock.imagesLoaded(function() {
      filterBlock.isotope({
        itemSelector: itemSelector,
        layoutMode: isotope_mode,
        filter: filter
      });
    });
    $('.filter li a').on('click', function() {
      $('.filter li').removeClass('active');
      $(this).parent().addClass('active');
      filter = $(this).attr('data-filter');
      filterBlock.isotope({
        itemSelector: itemSelector,
        layoutMode: isotope_mode,
        filter: filter
      });
      return false;
    });
  };

  initWorkFilter();


  /* Masonry Plagin */

  init_masonry = function() {
    var blogContainer;
    blogContainer = $('.blog-masonry');
    blogContainer.imagesLoaded(function() {
      blogContainer.isotope({
        itemSelector: '.post-masonry'
      });
    });
  };

  init_masonry();


  /* Google Maps */

  init_map = function() {
    var load_map, mapSection;
    mapSection = $("#map-canvas");
    load_map = function() {
      var centerAddress, markerAddress;
      if (mapSection.length) {
        centerAddress = mapSection.attr('data-address');
        markerAddress = mapSection.attr('data-address');
        mapSection.gmap3({
          action: "init",
          marker: {
            address: markerAddress
          },
          map: {
            options: {
              zoom: 14,
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              scrollwheel: false,
              streetViewControl: true,
              draggable: true,
              styles: [
                {
                  "featureType": "water",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#d3d3d3"
                    }
                  ]
                }, {
                  "featureType": "transit",
                  "stylers": [
                    {
                      "color": "#808080"
                    }, {
                      "visibility": "off"
                    }
                  ]
                }, {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "visibility": "on"
                    }, {
                      "color": "#b3b3b3"
                    }
                  ]
                }, {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    }
                  ]
                }, {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "visibility": "on"
                    }, {
                      "color": "#ffffff"
                    }, {
                      "weight": 1.8
                    }
                  ]
                }, {
                  "featureType": "road.local",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#d7d7d7"
                    }
                  ]
                }, {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "visibility": "on"
                    }, {
                      "color": "#ebebeb"
                    }
                  ]
                }, {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#a7a7a7"
                    }
                  ]
                }, {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    }
                  ]
                }, {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    }
                  ]
                }, {
                  "featureType": "landscape",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "visibility": "on"
                    }, {
                      "color": "#efefef"
                    }
                  ]
                }, {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#696969"
                    }
                  ]
                }, {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "visibility": "on"
                    }, {
                      "color": "#737373"
                    }
                  ]
                }, {
                  "featureType": "poi",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }, {
                  "featureType": "poi",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }, {
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#d6d6d6"
                    }
                  ]
                }, {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }, {}, {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#dadada"
                    }
                  ]
                }
              ]
            }
          }
        });
      }
    };
    return $('.map-section').on('click', function() {
      $(this).parent().toggleClass('js-active');
      $(this).find('.toggle-open').toggle();
      $(this).find('.toggle-close').toggle();
      load_map();
    });
  };

  init_map();


  /* Popup, Video, Lightbox, Ajax Portfolio */

  init_lightbox = function() {
    var magnific_ajax;
    magnific_ajax = function() {
      var hash, magnificPopup;
      magnificPopup = $.magnificPopup.instance;
      hash = document.location.hash.split('=');
      if (hash[0] === '#portfolio') {
        $.magnificPopup.open({
          items: {
            src: hash[1]
          },
          mainClass: 'mfp-move-horizontal',
          removalDelay: 1000,
          type: 'ajax',
          tLoading: '',
          showCloseBtn: false,
          callbacks: {
            open: function() {
              var src_url;
              src_url = $.magnificPopup.instance.currItem.src;
              history.pushState({}, '', '#portfolio=' + src_url);
            },
            close: function() {
              history.pushState({}, '', document.location.pathname);
            },
            ajaxContentAdded: function() {
              $('#project').addClass('mfp-opacity');
              $('#bnt-close').on('click', function() {
                $.magnificPopup.close();
                return false;
              });
              $(".work-full-slider").owlCarousel({
                slideSpeed: 350,
                singleItem: true,
                autoHeight: true,
                navigation: true,
                navigationText: ["<span class='angle'></span>", "<span class='angle'></span>"]
              });
            }
          }
        });
      }
    };
    magnific_ajax();
    $(window).on('hashchange', function() {
      magnific_ajax();
    });
    $('.work-gallery').magnificPopup({
      tLoading: '',
      gallery: {
        enabled: true
      },
      mainClass: "mfp-fade"
    });
    $('.magnific, .lightbox').magnificPopup({
      tLoading: ''
    });
    $('.video, .post-thumbnail').fitVids();
  };

  init_lightbox();


  /* Background YouTube Player */

  init_YTPlayer = function() {
    var player;
    player = $('.player');
    if (player.length && $(window).width() >= 1024 && mobileTest === false) {
      $(function() {
        player.YTPlayer();
      });
    }
  };

  init_YTPlayer();


  /* Count Numbers */

  init_count_number = function() {
    if (($(window).width() >= 1024) && (mobileTest === false)) {
      $('.focus-number').appear(function() {
        var count;
        count = $(this);
        count.countTo({
          from: 0,
          to: count.html(),
          speed: 1300,
          refreshInterval: 60
        });
      });
    }
  };

  init_count_number();


  /* WOW Animation */

  init_wow = function() {
    var wow;
    wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });
    if ($('body').hasClass('appear-animate')) {
      wow.init();
    }
  };

  init_wow();

}).call(this);