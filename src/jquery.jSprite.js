;(function($, undefined) {
    'use strict';

    var ver = '1.2.1';

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
        var image = new Image();
        image.src = $(options.element).css('backgroundImage').replace(/url\((['"])?(.*?)\1\)/gi, '$2');

        return {
            width: image.width/options.columns,
            height: image.height/options.lines
        };
    };

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

        if (settings.getSize) {
            settings = $.extend({}, settings, getSize(settings));
        }

        animation(sprite, settings, callback);
    };

    var defaults = {
        columns         : 3,        // columns to use in the sprite
        lines           : 1,        // lines to use in the sprite
        total           : 3,        // total frames to use in the sprite
        width           : 200,      // px, width of each frame in the sprite
        height          : 200,      // px, height of each frame in the sprite
        getSize         : false,    // if true will calculate width and height (according to columns and lines) and overriding their values
        timeTransition  : 50,       // milliseconds, time between each frame
        timeReload      : true      // true, false or milliseconds, time between the end and a new beginning,
                                    //    if false will not restart, if true will use timeTransition for a smooth restart
    };

    $.fn.jSprite = function (options) {
        // Merge defaults and options, without modifying defaults
        play($.extend({}, defaults, options, { element: this }));

        return this;
    };
}(jQuery));
