(function($){
	//TODO синхронная работа эквалайзеров
	//TODO анимация роста
	//TODO сделать нормальный runEqualizer
	$.fn.equalizer = function(options){
		return this.each(function(){
			var settings = $.extend({}, $.fn.equalizer.defaults, options);
			$.extend(settings, {selector: $(this)});
			$.extend(settings, {
				colQuantity: Math.ceil(settings.selector.width()/settings.colWidth)
			});
			// var start = new Date();
			// var end = new Date();
			// console.log(end.valueOf() - start.valueOf());
			$.fn.equalizer.setEqualizer(settings);
			$.fn.equalizer.runEqualizer(settings);
			setInterval(function() {
				$.fn.equalizer.resetEqualizer(settings);
			}, 1000);
		});
	};
	$.fn.equalizer.defaults = {
		timeout: 1000,
		colWidth: 1,
		type: 'drop' // 'rise'
	};
	$.fn.equalizer.setEqualizer = function(settings){
		settings.selector.css({
			verticalAlign: 'bottom',
			lineHeight: settings.selector.height() + 'px'
		});
		var cols = new Array(settings.colQuantity);
		for (var i = 0; i < cols.length; i++) {
			var span = $('<span/>').appendTo(settings.selector);
			span.css({
				verticalAlign: 'bottom',
				display: 'inline-block',

				fontSize: 0,
				lineHeight: 0,

				width: settings.colWidth,
				background: 'pink',
				borderTop: '2px solid red'
			});
		}
	}
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
		var spans = settings.selector.find('span');
		spans.each(function (i) {
			switch(settings.type){
				case 'rise':
					var colHeight = settings.selector.height() / 2;
				break;
				case 'drop':
				default:
					var colHeight = Math.round(settings.selector.height() * Math.random());
				break;
			}
			$(this).height(colHeight);
		});
	};
}(jQuery));