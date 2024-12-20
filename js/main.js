(function ($) {
"use strict";


	/* Preloader */
	var win = $(window);
	win.on('load',function() {
		$('.page-loader').delay(350).fadeOut('slow');
	});

	/* menu last class added */
	$('ul.basic-menu>li').slice(-2).addClass('menu-p-right');


	/* TOP Menu Stick  */
	win.on('scroll',function() {
	if ($(this).scrollTop() > 1){
		$('#sticky-header').addClass("sticky");
	  }
	  else{
		$('#sticky-header').removeClass("sticky");
	  }
	});

	/* meanmenu */
	 $('#mobile-nav').meanmenu({
		 meanMenuContainer: '.basic-mobile-menu',
		 meanScreenWidth: "767"
	 });

	/* hamburgers menu option  */
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().toggleClass('nav-menu-show')
    });



	/* imagesLoaded active */
	$('#portfolio-grid,.blog-masonry').imagesLoaded( function() {

		/* Filter menu */
		$('.filter-menu').on( 'click', 'button', function() {
		  var filterValue = $(this).attr('data-filter');
		  $grid.isotope({ filter: filterValue });
		});

		/* filter menu active class  */
		$('.filter-menu button').on('click', function(event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

		/* Filter active */
		var $grid = $('#portfolio-grid').isotope({
		  itemSelector: '.portfolio-item',
		  percentPosition: true,
		  masonry: {
			columnWidth: '.portfolio-item',
		  }
		});

		/* Filter active */
		$('.blog-masonry').isotope({
		  itemSelector: '.blog-item',
		  percentPosition: true,
		  masonry: {
			columnWidth: '.blog-item',
		  }
		});

	});



	/* magnificPopup img view */
	$('.popup-link').magnificPopup({
		type: 'image',
		gallery: {
		  enabled: true
		}
	});

	/* magnificPopup video view */
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

	/* counterUp */
	$('.counter').counterUp();

	/* main-slider */
	$('.slider-active').owlCarousel({
		loop:true,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		animateOut: 'fadeOut',
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	/* portfolio-slider */
	$('.portfolio-slider').owlCarousel({
		loop:true,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	/* portfolio-slider */
	$('#related-active').owlCarousel({
		loop:true,
		margin:30,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		responsive:{
			0:{
				items:1
			},
			450:{
				items:2
			},
			768:{
				items:3
			},
			900:{
				items:4
			},
			1100:{
				items:4
			}
		}
	})

	/* portfolio-slider */
	$('.blog-slider').owlCarousel({
		loop:true,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		autoplay:true,
		animateOut: 'fadeOut',
		responsive:{
			0:{
				items:1
			},
			768:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	/* portfolio-slider */
	$('.clients-active').owlCarousel({
		loop:true,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		autoplay:true,
		animateOut: 'fadeOut',
		responsive:{
			0:{
				items:2
			},
			450:{
				items:3
			},
			768:{
				items:4
			},
			1000:{
				items:6
			}
		}
	})

	/* portfolio-slider */
	$('.testimonial-active').owlCarousel({
		loop:true,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:true,
		autoplay:true,
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			768:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	/* related-post-active */
	$('.related-post-active').owlCarousel({
		loop:true,
		margin:20,
		navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
		nav:false,
		autoplay:true,
		responsive:{
			0:{
				items:1
			},
			450:{
				items:2
			},
			768:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})

	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 1000, // Animation in speed (ms)
		animationOutSpeed: 1000, // Animation out speed (ms)
		scrollText: '<i class="ion-chevron-up"></i>', // Text for element
	});


   /*  youtube video */
    $('.youtube-bg').YTPlayer({
        videoURL: "r4dD-WYzrMs",
        containment: '.youtube-bg',
        autoPlay: true,
        loop: true,
		mute:true
    });


	window.groupedProducts = [];
	const cacheKey = 'productsCacheV4'

	if(localStorage.getItem(cacheKey) === null) {
		console.log("empty, fetching")
		fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQKXZApxXbh_gUDCZSyfZxIdmp-p_05_ERpo3vqNYLHFfzIkPbW3LTHXGm29sp5OTGrksCHd9tKctVr/pub?output=csv')
			.then(response => response.text())
			.then(csvData => {
				const products = Papa.parse(csvData, {header: true})
				localStorage.setItem(cacheKey, JSON.stringify(products));
				location.reload()
			})
			.catch(error => console.error('Error fetching CSV:', error));
	} else {
		const cachedProducts = JSON.parse(localStorage.getItem(cacheKey)).data
		for (let i = 0; i < cachedProducts.length; i += 3) {
			const chunk = cachedProducts.slice(i, i + 3);
			groupedProducts.push(chunk);
		}
		console.log(groupedProducts)


	}
	window.favoriteProducts = groupedProducts.flat().filter((pr) => pr["Oblíbené"]).slice(0, 3)


})(jQuery);
