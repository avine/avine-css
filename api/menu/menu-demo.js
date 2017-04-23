
$.dom.ready(function () {

	var selector = '.avn-menu';

	$('<div id="demo-action">' +
		'<a href="#" id="demo-action-enable">Enable JS</a>' +
		'<div class="demo-action-hidden">Options : &nbsp; ' +
			'<a href="#" id="mouseOver">mouseOver</a> &nbsp; ' +
			'<a href="#" id="mouseOut">mouseOut</a> &nbsp; ' +
			//'<a href="#" id="noCollapse">noCollapse</a>' +
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
			mouseOut: false//,
			//noCollapse: false
		};
		for (var opt in options) (function (opt) {
			$('#' + opt).click(function (e) {
				e.preventDefault();
				$(this).toggleClass('demo-action-on');
				options[opt] = !options[opt];
				$(selector).hover(options);
			});
		})(opt);

		// Handle events
		$(selector).on('hoverOpen, hoverClose', function (e, data) {
			$.tool.console.log('\n> event="' + e.type + '"', 'at index=', data.index);
			$.tool.console.log('for source=', data.source);
			$.tool.console.log('and target=', data.target);
			$.tool.console.log('in hover=', this);
		});

	});

});

$.dom.ready(function () {

	$('<div id="demo-action2">' +
		'Menu : &nbsp; <a href="#" id="menuRootWrap">wrap</a><br />' +
		'Level 1 : &nbsp; <a href="#" id="menuLevel1Left">left</a> &nbsp; <a href="#" id="menuLevel1Up">up</a><br />' +
		'<div id="menuLevel2">' +
			'Level 2 : &nbsp; <a href="#" id="menuLevel2Left">left</a> &nbsp; <a href="#" id="menuLevel2Up">up</a>' +
		'</div>' +
	'</div>').appendTo('body');

	function handle(e, node, callback) {
		e.preventDefault();
		$(node).toggleClass('demo-action-on');
		callback();
	}

	// Root
	$('#menuRootWrap').click(function(e) {
		handle(e, this, function() { $('.demo-root').toggleClass('avn-menu-wrap'); });
	});

	// Level 1
	var $level1 = $('.demo-level-1');
	$('#menuLevel1Left').click(function(e) {
		handle(e, this, function() { $level1.toggleClass('avn-menu-left'); });
	});
	$('#menuLevel1Up').click(function(e) {
		handle(e, this, function() { $level1.toggleClass('avn-menu-up'); });
	});

	// Level 2
	var $level2 = $('.demo-level-2');
	if (!$level2.size()) {
		return $('#menuLevel2').remove();
	}
	$('#menuLevel2Left').click(function(e) {
		handle(e, this, function() { $level2.toggleClass('avn-menu-left'); });
	});
	$('#menuLevel2Up').click(function(e) {
		handle(e, this, function() { $level2.toggleClass('avn-menu-up'); });
	});

});
