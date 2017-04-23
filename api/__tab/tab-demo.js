
$.dom.ready(function () {
	$('#demo-action-enable').click(function(e) {
		e.preventDefault();
		$(this).remove();
		$('.demo-action-hidden').removeClass('demo-action-hidden');

		// Init all tabs
		$('.avn-tab').tab();

		// Customize options
		var options = {
			mouseOver: false,
			mouseOut: false,
			noCollapse: false,
		};
		for (var opt in options) (function (opt) {
			$('#' + opt).click(function (e) {
				e.preventDefault();
				$(this).toggleClass('demo-action-on');
				options[opt] = !options[opt];
				$('.avn-tab').tab(options);
			});
		})(opt);

		// Toggle items
		$('.action-toggle').click(function (e) {
			e.preventDefault();
			var $this = $(this), isOn = $this.hasClass('demo-action-on'), index = $this.text();
			$('.action-toggle').removeClass('demo-action-on');
			if (!isOn) $this.addClass('demo-action-on');
			$('.avn-tab').tab('toggle', index);
		});

		// Handle events
		$('.avn-tab').on('tabOpen, tabClose', function (e, data) {
			$.tool.console.log('\n> event="' + e.type + '"', 'at index=', data.index);
			$.tool.console.log('for item=', data.item);
			$.tool.console.log('in tab=', this);
		});
	});
});
