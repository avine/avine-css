
$.dom.ready(function () {

	var selector = '.avn-drop';

	$('<div id="demo-action">' +
		'<a href="#" id="demo-action-enable">Enable JS</a>' +
		'<div class="demo-action-hidden">Options : &nbsp; ' +
			'<a href="#" id="mouseOver">mouseOver</a> &nbsp; ' +
			'<a href="#" id="mouseOut">mouseOut</a> &nbsp; ' +
			'<a href="#" id="noCollapse">noCollapse</a>' +
			'<br />Toggle items : &nbsp; ' +
			'<a href="#" class="action-toggle">1</a> &nbsp; ' +
			'<a href="#" class="action-toggle">2</a> &nbsp; ' +
			'<a href="#" class="action-toggle">3</a> &nbsp; ' +
			'<a href="#" class="action-toggle">4</a>' +

		'</div>' +
	'</div>').appendTo('body');

	$('#demo-action-enable').click(function(e) {
		e.preventDefault();
		$(this).remove();
		$('.demo-action-hidden').removeClass('demo-action-hidden');

		// Init all hover
		$(selector).hover();

		// Customize options
		var options = {
			mouseOver: false,
			mouseOut: false,
			noCollapse: false
		};
		for (var opt in options) (function (opt) {
			$('#' + opt).click(function (e) {
				e.preventDefault();
				$(this).toggleClass('demo-action-on');
				options[opt] = !options[opt];
				$(selector).hover(options);
			});
		})(opt);

		// Toggle items
		$('.action-toggle').click(function (e) {
			e.preventDefault();
			var $this = $(this), isOn = $this.hasClass('demo-action-on'), index = parseInt($this.text(), 10) - 1;
			$('.action-toggle').removeClass('demo-action-on');
			if (!isOn) $this.addClass('demo-action-on');
			$(selector).hover('toggle', index);
		});

		// Handle events
		$(selector).on('hoverOpen, hoverClose', function (e, data) {
			$.tool.console.log('\n> event="' + e.type + '"', 'at index=', data.index);
			$.tool.console.log('for source=', data.source);
			$.tool.console.log('and target=', data.target);
			$.tool.console.log('in hover=', this);
		});

	});

	// Toggle drop-small
	$('<a href="#" id="demo-action2">small</a>').click(function(e) {
		e.preventDefault();
		$(selector).toggleClass('avn-drop-small');
	}).appendTo('body');

});
