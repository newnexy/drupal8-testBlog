jQuery(document).ready(function($) {

	// ---- Media settings ----- //

	if($(window).width() > 768) {
		$('.search-button-header').addClass('button-header-hover');
	};
	if($(window).height() < 380) {
		$('.region-content').css('margin-top', '-70px');
	};

	// ---- Safari settings ----- // 

	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	if (isSafari) {
		$('.form-item__input').css('line-height', '1.6em');
		$('.node-blog-article-teaser').css('letter-spacing', '-0.05em');
		$('.node-page-full__field-paragraphs-item .paragraph-title').css('letter-spacing', '-0.05em');
	};


	// ---- Form-search ----- // 
	
	$('.form-search').attr('placeholder', 'Что ищем?');

	$('.search-button-header').on('click', function(e){

		$('.search-block-form').fadeToggle(550);
		$(this).toggleClass('search-button-header-hide');
		
	});

});








