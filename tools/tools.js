
/* -------------------- back button -------------------- */

$.dom.ready(function () {

	if (window.self !== window.top) return; // Disabled when the page is loaded on iframe

	$('<a href="#" class="demo-back"><i class="fa fa-mail-reply"></i></a>')
		.addClass('avn-color-grey-darker').appendTo('body')
		.click(function (e) {
			e.preventDefault();
			window.location.href = '../../index.html'; // All API files are located at this sub-level
		});

});

/* -------------------- color switcher -------------------- */

$.dom.ready(function () {

	var $target = $('.demo-color-switcher');
	if (!$target.size()) return;

	var colors = [
		'',
		'avn-color-grey-lightest', 'avn-color-grey-lighter', 'avn-color-grey-light',
		'avn-color-grey-dark', 'avn-color-grey-darker', 'avn-color-grey-darkest',
		'avn-color-primary', 'avn-color-secondary', 'avn-color-default'
	],
	index = 0,
	icon = '<i class="fa fa-pencil"></i>';

	$('<a href="#" class="demo-color-switcher-source">' + icon +'</a>')
		.addClass('avn-color-grey-darker').appendTo('body')
		.click(function (e) {
			e.preventDefault();

			var prev = colors[index % colors.length],
				next = colors[++index % colors.length];
			$target.removeClass(prev).addClass(next);

			$(this).html((next ? next + ' &nbsp; ' : '') + icon);
		});

});

/* -------------------- documentation -------------------- */

$.dom.ready(function () {

	var $doc = $('#demo-doc').addClass('avn-color-grey-darker');
	if (!$doc.size()) return;

	var $content = $('<div>').addClass('avn-area-bound avn-area-pad'),
		$toggle = $('<a href="#"><i class="fa fa-cog"></i></a>');

	// V1 (will miss the children that are just TextNode)
	//$doc.children().each(function() { $content.append(this); });

	// V2
	var doc = $doc.get(0), content = doc.innerHTML; // Warning: do not attach any handler inside the doc
	doc.innerHTML = '';
	$content.html('<div id="demo-doc-logo"></div>' + content);
	$doc.append($toggle).append($content);
	// end of V2

	var $body = $('body').append('<div id="demo-doc-blur">');
	$toggle.click(function (e) {
		e.preventDefault();
		$body.toggleClass('demo-doc-open');
		$.dom.storage.session('demo-doc-opened', $body.hasClass('demo-doc-open'));
	});

	// Open the doc according to previous status !
	if ($doc.size() && $.dom.storage.session('demo-doc-opened')) $toggle.trigger('click');
});

/* -------------------- code (in doc) -------------------- */

$.dom.ready(function () {

	$('.demo-code').each(function () {
		var code = this.innerHTML;
		code = '<pre><code class="language-markup">' +
				code.replace(/^\s+|\s+$/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;') +
			'</pre></code>';
		$(this).html(code).addClass('demo-code-enabled');
	});

});

/* -------------------- iframe -------------------- */

$.dom.ready(function () {

	var defaultTitle = 'AvineCSS framework',
	fullWidth = '<i class="fa fa-mobile"></i>',
	$wrap = $(
		'<div class="demo-iframe">'+
			'<div class="demo-iframe-title avn-color-grey-darkest">' + defaultTitle + '</div>' +
			'<div class="demo-iframe-bar avn-color-grey-darkest">' +
				'<a href="#" class="demo-iframe-width">' + fullWidth + '</a>' +
				'<a href="#" class="demo-iframe-external"><i class="fa fa-external-link"></i></a>' +
				'<a href="#" class="demo-iframe-close"><i class="fa fa-close"></i></a>' +
			'</div>' +
		'</div>'
	),
	$iframe = $('<iframe src="" seamless>').appendTo($wrap),
	$body = $('body').append($wrap);

	var $title = $wrap.find('.demo-iframe-title');
	$iframe.on('load', function () {
		// Notice: in case of history.back(), this.src will be unchanged
		try {
			var frame = frames[0], title = frame.$(frame.document.documentElement).find('head title').text();
			$title.text(title ? title : defaultTitle);
		} catch(e) {
			$title.text(defaultTitle);
		}
		// Notice: the 'load' event is fired  each time the src attribute is changed (including the close button)
		$body.toggleClass('demo-iframe-active');
	});

	$wrap.find('.demo-iframe-close').click(function (e) {
		e.preventDefault();
		$iframe.attr('src', '');
	});

	// Enable links to open iframe
	$('.demo-link2iframe').find('a').click(function(e) {
		e.preventDefault();
		$iframe.attr('src', this.href);
	});

	var widths = [0, 960, 720, 480, 320], index = 0;
	$wrap.find('.demo-iframe-width').click(function (e) {
		e.preventDefault();
		var width = widths[++index % widths.length];
		$iframe.css('width', width ? width + 'px' : '');
		$(this).html(width ? width + 'px' : fullWidth);
	});

	$wrap.find('.demo-iframe-external').click(function (e) {
		e.preventDefault();
		document.location.href = $iframe.attr('src');
	});

});

/* -------------------- quick click -------------------- */

(function () {

	var $links = $('<div class="demo-click-links">'), token = 0;

	window.demoClick = function(title, callback, target) {
		var $link = $('<a href="#">' + title + '</a>').click(function (e) {
			e.preventDefault();
			var $this = $(this);
			$this.toggleClass('demo-click-active');
			callback();
		});
		target = target || window.demoClick.target;
		if (target) {
			$(target).addClass('demo-click-links').append($link);
		} else {
			$links.append($link);
			if (!token++) $('body').prepend($links);
		}
		return { demoClick: window.demoClick }; // Make the method chainable
	};

})();
