(function($){
	$.fn.equalizer = function(options){
		return this.each(function(){
			var settings = $.extend({}, $.fn.equalizer.defaults, options);
			var selector = $(this);
			$.extend(settings, {
				selector: selector,
				colQuantity: Math.ceil(selector.width()/settings.colWidth),
				middlePosition: selector.height()/2
			});
			$.fn.equalizer.setEqualizer(settings);
			$.fn.equalizer.runEqualizer(settings);
		});
	};
	$.fn.equalizer.defaults = {
		timeout: 1000,
		colWidth: 1,
	};
	//NOTE подготавливаем блок, вешаем стили, создаем колонки эквалайзера
	$.fn.equalizer.setEqualizer = function(settings){
		var spans = document.createDocumentFragment(), 
		length = settings.colQuantity;
		settings.selector.css({
			verticalAlign: 'bottom',
			lineHeight: settings.selector.height() + 'px'
		});
		while(length--){
			var span = $('<span/>').css({
				verticalAlign: 'bottom',
				display: 'inline-block',

				fontSize: 0,
				lineHeight: 0,

				width: settings.colWidth,
				height: settings.middlePosition,
				background: 'pink',
				borderTop: '2px solid red'
			});
			span.appendTo(spans);
		}
		settings.selector.append(spans);
	}
	//NOTE устанавливает эквалайзер в случайное положение
	$.fn.equalizer.randomiseCols = function(settings){
		var spans = $(settings.selector.children()),
		length = settings.colQuantity,
		preloadNext = function () {(!--length) && $.fn.equalizer.evenCols(settings);};
		spans.stop(true, true);
		spans.each(function () {
			$(this).animate(
				{height: Math.round(settings.selector.height() * Math.random())},
				settings.timeout,
				preloadNext
				);
		});
		
	};
	//NOTE устанавливает эквалайзер в центральное положение
	$.fn.equalizer.evenCols = function(settings){
		var spans = $(settings.selector.children()),
		length = settings.colQuantity,
		preloadNext = function () {(!--length) && $.fn.equalizer.randomiseCols(settings);};
		spans.stop(true, true);
		spans.animate(
			{height: settings.selector.height()/2},
			settings.timeout,
			preloadNext
			);
	};
	//NOTE старт эквалайзера
	$.fn.equalizer.runEqualizer = function(settings){
		$.fn.equalizer.randomiseCols(settings);
	};
}(jQuery));
