(function($){
	//TODO сделать нормальный runEqualizer
	//TODO чистка и рефакторинг
	//TODO при инициализации устанавливать эквалайзер в центральное положение
	$.fn.equalizer = function(options){
		return this.each(function(){
			var settings = $.extend({}, $.fn.equalizer.defaults, options);
			$.extend(settings, {selector: $(this)});
			$.extend(settings, {
				colQuantity: Math.ceil(settings.selector.width()/settings.colWidth)
			});
			$.fn.equalizer.setEqualizer(settings);
			// $.fn.equalizer.readyEqualizer(settings);
			$.fn.equalizer.runEqualizer(settings);
			//$.fn.equalizer.resetEqualizer(settings);
		});
	};
	$.fn.equalizer.defaults = {
		timeout: 1000,
		colWidth: 1,
	};
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
				background: 'pink',
				borderTop: '2px solid red'
			});
			span.appendTo(spans);
		}
		settings.selector.append(spans);
	}
	$.fn.equalizer.randomiseCols = function(settings){
		var spans = settings.selector.find('span');
		var length = settings.colQuantity;
		spans.stop(true, true);
		spans.each(function () {
				$(this).animate(
					{height: Math.round(settings.selector.height() * Math.random())},
					settings.timeout,
					'linear',
					function(){
						(!--length) && $.fn.equalizer.evenCols(settings);
					}
				);
			});
		};	

	$.fn.equalizer.evenCols = function(settings){
		var spans = settings.selector.find('span');
		var length = settings.colQuantity;
		spans.stop(true, true);
		spans.animate(
					{height: settings.selector.height()/2},
					settings.timeout,
					'linear',
					function(){
						(!--length) && $.fn.equalizer.randomiseCols(settings);
					}
				);
		};	
	$.fn.equalizer.resetEqualizer = function(settings){
		var equ = settings.selector;
		var spans = equ.find('span');
		var spansArray = jQuery.makeArray(spans);
		var length = settings.colQuantity;
		var randomArray = [];
		spans.each(function(){
			switch(settings.type){
				case 'rise':
					var colHeight = Math.round(settings.selector.height() * Math.random());
				break;
				case 'drop':
				default:
					var colHeight = settings.selector.height() / 2;
				break;
			}
			$(this).animate(
				{height: colHeight},
				settings.timeout,
				'linear'
			)
		});
		for(var i = 0; i < length; i++)
		{
			randomArray[i] = Math.round(equ.height() * Math.random());
		}
		spans.each(function (i) {
			$(this).animate(
				{height: randomArray[i]},
				10*Math.random(),
				'swing'
				);
		});
	};
	$.fn.equalizer.runEqualizer = function(settings){
		$.fn.equalizer.randomiseCols(settings);
	};
}(jQuery));