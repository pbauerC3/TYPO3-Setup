var selectedPix = 0;
var i = 0;

$(document).ready(function() {
	yagAlbumStyling();
	initSlider();
	
	$(window).load(function(){
		
		if(window.matchMedia("(min-device-width: 320px) and (max-device-width: 568px)").matches) {
			$('.navigation').prepend('<div class="mobilenav"><div class="menuicon"></div></div>');
			$('.navigation .logo').appendTo($('.mobilenav'));
		}
		
		if(window.matchMedia("screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)").matches || window.matchMedia("(min-device-width: 320px) and (max-device-width: 568px)").matches) {
			$('.right_35').prependTo('.grid65_35');
		}
		
		$('.menuicon').click(function(){
			animateMobileNav();
		});
		
		// slider loop
		setInterval(function() {
			slide();
		}, 4000);

	});
});

function yagAlbumStyling() {
	$('.tx-yag-album-albuminfo').each(function(){
		$(this).css('top', -$(this).outerHeight());
	});
}

function animateMobileNav() {
	$('.navigation ul').slideToggle(300);
}

function initSlider() {
	selectedPix = $('.images li');
	
	$(selectedPix).css({'display':'none'});
	$(selectedPix).first().css({'position':'relative', 'display':'list-item'});
}

function slide() {
	// hiding previous image and showing next
	$(selectedPix[i]).css({'position':'absolute', 'top':0, 'left':0}).fadeOut(1000);
	i++;
	
	//last img gets fadeout, set 0 to show first
	if(i >= selectedPix.length)
		i = 0;
	
	$(selectedPix[i]).css('position','relative').fadeIn(1000);
}