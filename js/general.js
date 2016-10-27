/*global jQuery: false, $: false */
jQuery(document).ready(function($) {
    var $body = jQuery('body'),
        $window = jQuery(window),
        $wrapper = $("#main-wrapper"),
        $header = $(".header");
    function homeHeight() {
        var $top_menu_inner = jQuery(".top-menu-inner"),
            wHeight = $window.height(),
            wWidth = $window.width(),
            menuPaddingTop = $top_menu_inner.css("padding-top"),
            menuPaddingBottom = $top_menu_inner.css("padding-bottom"),
            menuPaddingLeft = $top_menu_inner.css("padding-left"),
            menuPaddingRight = $top_menu_inner.css("padding-right"),
        //jQuery("#work-image").height(wHeight - parseFloat(jQuery(".main-content-inner").css("padding-top")));
            menuArea = wHeight - parseFloat(menuPaddingTop) - parseFloat(menuPaddingBottom),
            menuWidth = wWidth - parseFloat(menuPaddingLeft) - parseFloat(menuPaddingRight),
            $rows = 2;
        jQuery("#home-image").height(wHeight);
        if ($window.width() < 767) {
            $rows = 3;
        }

        if ($window.scrollTop() < 100) {
            $window.scrollTop(0, 300);
        }
        jQuery(".top-menu ul li").animate({
          'height':(menuArea * 0.99) / $rows,
          'margin-left': menuWidth * 0.01
        },
        {
          duration: 250,
          easing:'linear'
        });
        //jQuery(".top-menu ul li").height((menuArea * 0.99) / $rows).css("margin-left", menuWidth * 0.01);
    }
    $body.flowtype({
        minFont: 12,
        maxFont: 48
    });

    // OPEN / CLOSE SIDEBAR MENU
    $(".home-bell, .red-section-bell, li#menu-item-52 > a, .show-nav #site-canvas, .close-side-menu-btn, .opened .top-menu").click(function(e) {
        $body.toggleClass('opened');
        $('.wrapper').toggleClass('show-nav');
        $('.menu-trigger.opened').click();

        // Firefox fix for adding overflow hidden to the body. 300ms = animation time of side menu
        setTimeout(function(){
          $body.toggleClass('finished');
        }, 300);

        return false;
    });

    $('.top-menu').on('click', function(){
      if($body.hasClass('opened')){
        $('.close-side-menu-btn').click();
      }
    });

    $window.load(function(e) {
        $("a.home-bell span").addClass("slideUp2");
        setTimeout(function() {
            $("a.home-bell span").removeClass("slideUp2");
        }, 2000);
    });

    $("a.home-bell").hover(function(e) {
        $(this).find("span").toggleClass("slideUp2");
    });

    $("a.close-side-menu-btn").click(function(e) {
        $wrapper.click();
    });

    // OPEN / CLOSE MAIN MENU
    $(".menu-trigger").click(function(e) {
        $(this).toggleClass("opened");
        //$(".top-menu").fadeToggle(300);
        $(".top-menu").toggleClass('active');
    });

    // CLICK NAVIGATION ARROWS
    $(".go-down-arrow").click(function(e) {
        var target = $(this).attr("href");
        $('html, body').animate({ // 'body' for webkit; 'html' for firefox
            scrollTop: $(target).offset().top - 100
        }, 1000, 'easeInCubic');
        return false;
    });

    // STICKY HEADER
    $window.scroll(function(e) {
        if ($window.scrollTop() > 50) {
            $header.addClass("sticky");
            $body.addClass("has-sticky");
        } else {
            $header.removeClass("sticky");
            $body.removeClass("has-sticky");
        }
        if ($(".red-section").length) {
            var topScroll = $(window).scrollTop(),
                //wHeight = $(window).height(),
               stopArea = $(".red-section").offset().top - 150;
            //if (topScroll > stopArea) {
            //    if (!$header.hasClass("not-sticky")){
            //       $header.addClass("not-sticky").animate({"top": -(stopArea - $header.height())},{ duration: 250 });
            //    }
            //} else {
                $header.css("top", "0px").removeClass("not-sticky");
            //}
        }
    });


    var blogPostCounter = $('.blog-post-counter'),
        pageTitle = $('.page-title');

    $window.scroll(function(e) {
        var stickBar = $(".blog-single-top"),
            topPosition = 65,
            topScroll = $window.scrollTop(),
            startStick = topPosition - $(".header").height();

        if (stickBar.length) {
            if (!stickBar.hasClass("stickyBar")){
              topPosition = stickBar.offset().top;
            }
        }
        if ($window.scrollTop() > startStick) {
            stickBar.addClass("stickyBar");
        } else {
            stickBar.removeClass("stickyBar");
        }

        if ($(".red-section").length) {
          var stopStick = $(".red-section").offset().top - 150;
            if (topScroll > stopStick) {
                if (!stickBar.hasClass("not-sticky")){
                  stickBar.addClass("not-sticky");
                }
            } else {
                stickBar.removeClass("not-sticky");
            }
        }

        // @FIXME force safari to redraw to prevent artifacting on blog page
        blogPostCounter.css('overflow', 'hidden').height();
        blogPostCounter.css('overflow', 'auto');
        pageTitle.css('overflow', 'hidden').height();
        pageTitle.css('overflow', 'inherit');
    });

    // CUSTOM SELECT
    $("select").select2({
        'width': '100%',
        'minimumResultsForSearch': -1
    });

    $(".wpcf7-form-control-wrap.project select").select2({
        placeholder: "Type of Project *"
    });

    // POP UP HOMEPAGE FEATURED ITEMS
    $window.scroll(function() {
        $('.home-featured-item').each(function() {
            var imagePos = $(this).offset().top,
                topOfWindow = $window.scrollTop();
            if (imagePos < topOfWindow + 700 && $body.hasClass("home")) {
                $(this).addClass("slideUp");
            }
        });
    });

    // STOP STICKY BELL
    $window.scroll(function(e) {
        if ($(".red-section").length) {
            var topScroll = $window.scrollTop(),
                wHeight = $window.height(),
                stopArea = $(".red-section").offset().top - wHeight;
            if (topScroll > stopArea) {
                $(".home-bell").addClass("not-sticky").css("top", stopArea + wHeight - $(".home-bell").height() + 1); // +1 for safari 8 fix
            } else {
                $(".home-bell").removeClass("not-sticky").css("top", "");
            }
        }
    });
    $(window).scroll();

    // LL CULTURE
    $(".culture-inner-slider").each(function(index, element) {

        $(this).cycle({
            'fx': "scrollHorz",
            'slides': "> div",
            'speed': 1500,
            'timeout': (function() {
                return 5000 + Math.ceil(Math.random() * 1000);
            }()),
            'log': false
        });
    });

    // CONTACT SLIDER
    $(".contact-location-slider").cycle({
        'fx': "scrollHorz",
        'slides': "> div",
        'speed': 800,
        'timeout': 0,
        'prev': '.location-prev',
        'next': '.location-next',
        'log': false
            //'swipe': true
    });

    $('.contact-location-slider').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        var $next = $(incomingSlideEl).data("num");
        $(".contact-locations-tabs ul li a").each(function(index, element) {
            if ($(this).data("num") == $next) {
                $(".contact-locations-tabs ul li").removeClass("active");
                $(this).parent().addClass("active");
            }
        });
    });

    $(".map-type-switch").click(function(e) {
        $(this).toggleClass("active");
        $(this).parent().parent().find(".contact-location-map-image").toggleClass("slideUp");
        return false;
    });

    $(".contact-locations-tabs ul li a").click(function(e) {
        var target = $(this).data("num");
        $(".contact-locations-tabs ul li").removeClass("active");
        $(this).parent().addClass("active");
        $('.contact-location-slider').cycle('goto', target - 1);
        return false;
    });

    // SERVICES
    $(".tabpanel-cycle").cycle({
        'fx': "scrollHorz",
        'slides': "> div",
        'speed': 800,
        'timeout': 0,
        'prev': '.prev-tab',
        'next': '.next-tab',
        'swipe': true,
        'log': false
    });

    $('.tabpanel-cycle').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        var $next = $(incomingSlideEl).data("num");
        $(".tabpanel-header ul li a").each(function(index, element) {
            if ($(this).data("num") == $next) {
                $(".tabpanel-header ul li").removeClass("active");
                $(this).parent().addClass("active");
            }
        });
    });

    $(".tabpanel-header ul li a").click(function(e) {
        var target = $(this).data("num");
        $(".tabpanel-header ul li").removeClass("active");
        $(this).parent().addClass("active");
        $('.tabpanel-cycle').cycle('goto', target - 1);
        return false;
    });

    // BLOG
    $(".post-share-btn").click(function(e) {
        $("#post-share").fadeIn(300);
        $("#post-share .post-title").text($("h1.page-title").text());
        $("#post-share .post-subtitle").text($(".post-single-subtitle p").text());
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(".close-share-btn").click(function(e) {
        $("#post-share").fadeOut(300);
    });

    // WORK
    $(".work-filters > span").click(function(e) {
        $(this).next().slideToggle(300);
    });

    $(".work-filters").click(function(e) {
        e.stopPropagation();
    });
    
    $('.footer .rooftop-lounge').on('click', function(e) {
      e.stopPropagation();
      //var topScroll = $window.scrollTop();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(document).click(function(e) {
        $(".work-filters > div").slideUp(300);
    });

    // BLOG SCROLL
    $window.scroll(function(e) {
        if ($(".author-box").length) {
            var topScroll = $window.scrollTop(),
                stopArea = $(".footer").offset().top - $(".author-box").height() - 140,
                startArea = $(".post-body").offset().top - 70,
                $post_sidebar = $(".post-sidebar");

            if (topScroll > stopArea) {
                $post_sidebar.addClass("not-sticky");
            } else {
                $post_sidebar.css('top', topScroll - startArea + 55);
                $post_sidebar.removeClass("not-sticky");
            }

            if (topScroll > startArea) {
                $post_sidebar.addClass("fixed-section");
            } else {
                $post_sidebar.removeClass("fixed-section").css('top', 20);
            }
        }
    });

    // CALCULATE HEIGHT OF MAIN IMAGE AND MENU ITEMS
    homeHeight();
    $window.scroll();
    $window.resize(function() {
      homeHeight();
    });

});
