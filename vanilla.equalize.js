/**
 * @author denim2x <https://github.com/denim2x>
 *
 * This file is a fork of jQuery.equalize for Vanilla JS
 */

(function () {
	'use strict';
	var Array = Array.prototype;

	/**
	 * Here comes a teeny-tiny jQuery shim (just because
	 * it seemed more convenient to have one handy instead
	 * of having to fiddle with the raw thing).
	 * PS: It could also be moved in a separate script and
	 * included before this one.
	 */
	var $ = $ || function (sel, ctx) {
		'use strict';
		switch (typeof sel) {
			case 'string':
				ctx = ctx || document;
				sel = ctx.querySelectorAll(sel);
				return {
					each: function (callback) {
						'use strict';
						Array.forEach.call(sel, callback);
						return this;
					},
					css: function (key, val) {
						'use strict';
						this.each(function (item) {
							'use strict';
							item.style[key] = val;
						});
						return this;
					},
					innerHeight: function (val) {
						'use strict';
						this.each(function (item) {
							'use strict';
							item.style.height = val;
						});
						return this;
					}
				};

			case 'object':
				if (sel == null) {
					throw "Bad usage of $ - the first argument is null";
				}
				return {
					innerHeight: function () {
						'use strict';
						return sel.innerHeight;
					}
				}

			case 'undefined':
				throw "Bad usage of $ - nothing given as first argument";

			default:
				throw "$ doesn't currently work on a " + (typeof sel);
		}
	};

	/**
	 * This function is (almost) exactly the same
	 * as in jQuery.equalize (modulo a few tweaks)
	 */
	equalize = function (group, equalize) {
		'use strict';
		group = group || '.group';
		equalize = equalize || '.equalize';
		$(group).each(function () {
			'use strict';
			var highestBox = 0;

			$(equalize, this).
				css('height', 'auto').
				each(function () {
					if($(this).innerHeight() > highestBox) {
						highestBox = $(this).innerHeight();
					}
				}).
				innerHeight(highestBox);
		});
	};

	// When the page has loaded
	window.addEventListener('DOMContentLoaded', function () {
		'use strict';
		equalize(); // Run the function 
	});

	// And every time the window is resized
	var resizeTimeout;
	window.addEventListener("resize", function () {
		'use strict';
	    if (resizeTimeout) return;

    	// Will execute at a rate of 15fps
		resizeTimeout = setTimeout(function() {
			'use strict';
			resizeTimeout = null;
			equalize(); // Here we go again
    	}, 66);
	}, false);
})();