;(function($, undefined) {
    'use strict';

    var ver = '1.0.0';

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

    var spriteItemTop               = 0,
        spriteItemLeft              = 0,
        spriteItemPosition          = 0,
        spriteReloadTimeout         = 0,
        spriteTransitionTimeout     = 0;

    var animation = function (options, callback) {
        var element                 = options.element,
            timeTransition          = options.timeTransition,
            timeReload              = options.timeReload,
            spriteBgWidth           = options.width,
            spriteBgHeight          = options.height,
            spriteBgLine            = options.columns,
            spriteBgTotal           = options.total;

        clearTimeout(spriteTransitionTimeout);
        clearTimeout(spriteReloadTimeout);

        if (element.length && element.is(':visible')) {
            if (spriteItemPosition < (spriteBgTotal - 1)) {
                spriteItemPosition++;

                var line = (spriteItemPosition % spriteBgLine) / 100;

                spriteItemLeft = spriteItemLeft + spriteBgWidth;

                if (line === 0) {
                   spriteItemTop = spriteItemTop + spriteBgHeight;
                   spriteItemLeft = 0;
                }

                element.css({'background-position': '-' + spriteItemLeft + 'px -' + spriteItemTop + 'px'});

                spriteTransitionTimeout = setTimeout(function() {
                    animation(options, callback);
                }, timeTransition);
            } else {
                if (timeReload) {
                    spriteReloadTimeout = setTimeout(function() {
                        spriteItemPosition = 0;
                        spriteItemTop = 0;
                        spriteItemLeft = 0;

                        element.css({'background-position': '0 0'});

                        animation(options, callback);
                    }, timeReload * 1000);
                }
            }
        }
    };

    var play = function (options, callback) {
        var spriteTimeTransition    = 50, //milsec
        spriteTimeReload            = 3, //segundos
        spriteHover                 = false;

        options.timeTransition = (options.timeTransition) ? options.timeTransition : spriteTimeTransition;
        options.timeReload = (options.timeReload) ? options.timeReload : 0;

        if (options.getSize) {
            options = $.extend({}, getSize(options), options);
        }

        animation(options, callback);
    };

    $.fn.jSprite = function (options) {
        play($.extend({}, { element: this }, options));

        return this;
    };
}(jQuery));
