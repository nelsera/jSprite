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

    var getSize = function (args) {
        var image = new Image();
        image.src = $(args.element).css('backgroundImage').replace(/url\((['"])?(.*?)\1\)/gi, '$2');

        return {
            width: image.width/args.columns,
            height: image.height/args.lines
        };
    };

    var spriteItemTop               = 0,
        spriteItemLeft              = 0,
        spriteItemPosition          = 0,
        spriteReloadTimeout         = 0,
        spriteTransitionTimeout     = 0;

    var animation = function (args, callback) {
        var element                 = args.element,
            timeTransition          = args.timeTransition,
            timeReload              = args.timeReload,
            spriteBgWidth           = args.width,
            spriteBgHeight          = args.height,
            spriteBgLine            = args.columns,
            spriteBgTotal           = args.total;

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
                    animation(args, callback);
                }, timeTransition);
            } else {
                if (timeReload) {
                    spriteReloadTimeout = setTimeout(function() {
                        spriteItemPosition = 0;
                        spriteItemTop = 0;
                        spriteItemLeft = 0;

                        element.css({'background-position': '0 0'});

                        animation(args, callback);
                    }, timeReload * 1000);
                }
            }
        }
    };

    var play = function (args, callback) {
        var spriteTimeTransition    = 50, //milsec
        spriteTimeReload            = 3, //segundos
        spriteHover                 = false;

        args.timeTransition = (args.timeTransition) ? args.timeTransition : spriteTimeTransition;
        args.timeReload = (args.timeReload) ? args.timeReload : 0;

        if (args.getSize) {
            args = $.extend({}, getSize(args), args);
        }

        animation(args, callback);
    };

    $.fn.jSprite = function (args) {
        play($.extend({}, { element: this }, args));

        return this;
    };
}(jQuery));
