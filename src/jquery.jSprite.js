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
        sprite.reloadTimeout = setTimeout(function() {
            sprite.position = 0;
            sprite.top = 0;
            sprite.left = 0;

            settings.element.css({'background-position': '0 0'});

            animation(sprite, settings, callback);
        }, settings.timeReload * 1000);
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

                if (settings.timeReload) {
                    restart(sprite, settings, callback);
                }
            }
        }
    };

    var play = function (options, callback) {
        var defaults = {
            getSize         : true,
            columns         : 3,
            lines           : 1,
            total           : 3,
            width           : 200,
            height          : 200,
            timeTransition  : 50, //milsec
            reverse: false
        },
        sprite = {
            top                 : 0,
            left                : 0,
            position            : 0,
            reloadTimeout       : 0,
            transitionTimeout   : 0
        },

        // Merge defaults and options, without modifying defaults
        settings = $.extend( {}, defaults, options );

        if (settings.getSize) {
            settings = $.extend({}, settings, getSize(settings));
        }

        if (!options.timeReload && options.timeReload !== 0) {
            settings.timeReload = 0.01;
        }

        animation(sprite, settings, callback);
    };

    $.fn.jSprite = function (options) {
        play($.extend({}, options, { element: this }));

        return this;
    };
}(jQuery));
