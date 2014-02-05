;(function($, undefined) {
    'use strict';

    var ver = '1.2.2';

    $.fn.jSprite = {};

    var debug = function (s) {
        if ($.fn.jSprite.debug) {
            log(s);
        }
    };

    var log = function () {

    };

    var pause = function () {

    };
    $.fn.jSprite.pause = pause;

    var stop = function () {

    };
    $.fn.jSprite.stop = stop;

    var goTo = function () {

    };
    $.fn.jSprite.goTo = goTo;

    var getSize = function (options) {
		var width = options.width ? options.width : $(options.element).innerWidth();
		var height = options.height ? options.height : $(options.element).innerHeight();

        return {
            width: width,
            height: height
        };
    };
	
	var getGrid = function(options, callback){
		var image = new Image();
        
            callback = callback || function(){};
            
            image.onload = function(){
                var columns = options.columns ? options.columns : Math.round(image.width / options.width);
		        var lines = options.lines ? options.lines : Math.round(image.height / options.height);
			
                console.info(image.width);
                console.info(image.height);

		        callback({
			        columns: columns,
			        lines: lines
		        });
            }

			image.src = $(options.element).css('backgroundImage').replace(/url\((['"])?(.*?)\1\)/gi, '$2');

		return callback;
	}

    var next = function (sprite, settings, callback) {
        sprite.position++;
        var line = (sprite.position % settings.columns) / 100;

        sprite.left = sprite.left + settings.width;

        if (line === 0) {
           sprite.top = sprite.top + settings.height;
           sprite.left = 0;
        }

        settings.element.css({'background-position': '-' + sprite.left + 'px -' + sprite.top + 'px'});

        sprite.transitionTimeout = setTimeout(function() {
            animation(sprite, settings, callback);
        }, settings.timeTransition);
    };

    var restart = function (sprite, settings, callback) {
        var delay = (settings.timeReload === true) ? settings.timeTransition : settings.timeReload;

        settings.element.css({'background-position': '0 0'});

        sprite.reloadTimeout = setTimeout(function() {
            sprite.position = 0;
            sprite.top = 0;
            sprite.left = 0;

            animation(sprite, settings, callback);
        }, delay);
    };

    var animation = function (sprite, settings, callback) {
        clearTimeout(sprite.transitionTimeout);
        clearTimeout(sprite.reloadTimeout);

        if (settings.element.length && settings.element.is(':visible')) {
            if (sprite.position < (settings.total - 1)) {
                next(sprite, settings, callback);
            } else {
                // callback on finish animation
                if (settings.onDone) {
                    settings.onDone();
                }

                if (settings.timeReload !== false) {
                    restart(sprite, settings, callback);
                }
            }
        }
    };

    var play = function (settings, callback) {
        var sprite = {
            top                 : 0,
            left                : 0,
            position            : 0,    // between 0 and settings.total
            reloadTimeout       : 0,    // id of timeout used to restart animation
            transitionTimeout   : 0     // id of timeout used to next frame animation
        };

        var start = function(){
            if(!settings.total)
                settings.total = settings.columns * settings.lines;

            animation(sprite, settings, callback);
        }

        if (!settings.width || !settings.height) {
            settings = $.extend({}, settings, getSize(settings));
        }
		
        if (!settings.columns || !settings.lines) {
            getGrid(settings, function(result){
                settings = $.extend({}, settings, result);
                start();
            });
		}else{
            start();
        }
    };

    var defaults = {
		// if grid 0, will calculate columns and lines (according to element width, and height) and overriding their values
        columns         : 0,        // columns to use in the sprite
        lines           : 0,        // lines to use in the sprite
        // if size 0, will calculate width and height (according to element size) and overriding their values
        width           : 0,      // px, width of each frame in the sprite
        height          : 0,      // px, height of each frame in the sprite
		
        total           : 0,        // total frames to use in the sprite
        timeTransition  : 50,       // milliseconds, time between each frame
        timeReload      : true      // true, false or milliseconds, time between the end and a new beginning,
                                    //    if false will not restart, if true will use timeTransition for a smooth restart
    };

    $.fn.jSprite = function (options, callback) {
        // Merge defaults and options, without modifying defaults
        play($.extend({}, defaults, options, { element: this }), callback);

        return this;
    };
}(jQuery));
