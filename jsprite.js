;(function($, undefined) {
    'use strict';

    var spriteTimeTransition = 50, //milsec
        spriteTimeReload = 3, //segundos
        spriteTransitionTimeout,
        spriteReloadTimeout,
        spriteItemPosition = 0,
        spriteItemTop = 0,
        spriteItemLeft = 0,
        spriteHover = false;

    function animaSprite(args, callback) {
        var element = args.element,
            width = args.width,
            height = args.height,
            itemLine = args.itemLine,
            total = args.total,
            timeTransition = args.timeTransition,
            timeReload = args.timeReload;

        clearTimeout(spriteTransitionTimeout);
        clearTimeout(spriteReloadTimeout);

        timeTransition = (typeof timeTransition !== undefined) ? timeTransition : spriteTimeTransition;
        timeReload = (typeof timeReload !== undefined) && (timeReload != 0) ? timeReload : 0;

        var spriteBgWidth = width;
        var spriteBgHeight = height;
        var spriteBgLine = itemLine;
        var spriteBgTotal = total;

        if (element.length && element.is(':visible')) {
            if (spriteItemPosition < (spriteBgTotal - 1)) {
                spriteItemPosition++;

                var line = (spriteItemPosition % spriteBgLine) / 100;

                spriteItemLeft = spriteItemLeft + spriteBgWidth;

                if (line == 0) {
                   spriteItemTop = spriteItemTop + spriteBgHeight;
                   spriteItemLeft = 0;
                }

                element.css({'background-position': '-' + spriteItemLeft + 'px -' + spriteItemTop + 'px'});

                spriteTransitionTimeout = setTimeout(function() {
                    animaSprite(args, callback);
                }, timeTransition);
            } else {
                if (timeReload) {
                    spriteReloadTimeout = setTimeout(function() {
                        spriteItemPosition = 0;
                        spriteItemTop = 0;
                        spriteItemLeft = 0;

                        element.css({'background-position': '0 0'});

                        animaSprite(args, callback);
                    }, timeReload * 1000);
                }

                if (callback) {
                    callback();
                }
            }
        }
    }

    function sprite(args, callback) {
        spriteItemPosition = 0;
        spriteItemTop = 0;
        spriteItemLeft = 0;

        args.timeTransition = (typeof args.timeTransition !== undefined) ? args.timeTransition : spriteTimeTransition;
        args.timeReload = (typeof args.timeReload !== undefined) && (args.timeReload != 0) ? args.timeReload : 0;

        animaSprite(args, callback);
    }

    sprite({
        element: $('.animation'),
        width: 330,
        height: 500,
        itemLine: 9,
        total: 65,
        timeTransition: 30,
        timeReload: 2
    });
}(jQuery));
