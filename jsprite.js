(function($, undefined) {    
    'use strict';

    var ver = '0.1.0';

    $.fn.jsprite = function(options, arg2) {
        var $this = $(this),
            spriteTimeTransition = 50, //milsec
            spriteTimeReload = 3, //seconds
            spriteTimeoutTransition, 
            spriteReloadTimeout,
            spriteItemPosition = 0,
            spriteItemTop = 0,
            spriteItemLeft = 0,
            spriteHover = false;

        var play = function (element, width, height, itemLine, total, timeTransition, timeReload, callback){
            clearTimeout(spriteTimeoutTransition);
            clearTimeout(spriteReloadTimeout);

            timeTransition = (typeof timeTransition !== "undefined") ? timeTransition : spriteTimeTransition;
            timeReload = (typeof timeReload !== "undefined") && (timeReload != 0) ? timeReload : 0;

            //console.log(timeReload);
            //console.log(timeTransition);

            var spriteBgWidth = width;
            var spriteBgHeight = height;
            var spriteBgline = itemLine;
            var spriteBgTotal = total;

            if (element.length && element.is(":visible")) {
                if (spriteItemPosition < (spriteBgTotal - 1)) {
                    spriteItemPosition++;

                    var line = (spriteItemPosition % spriteBgline) / 100;

                    spriteItemLeft = spriteItemLeft + spriteBgWidth;

                    if(line == 0){
                       spriteItemTop = spriteItemTop + spriteBgHeight;
                       spriteItemLeft = 0;
                    }

                    element.css({'background-position' :'-' + spriteItemLeft + 'px -' + spriteItemTop + 'px'});

                    spriteTimeoutTransition = setTimeout( function () {
                        play(element, width, height, itemLine, total, timeTransition, timeReload, callback);
                    }, timeTransition);
                } else {
                    if (timeReload) {
                        spriteReloadTimeout = setTimeout (function () {
                            spriteItemPosition = 0;
                            spriteItemTop = 0;
                            spriteItemLeft = 0;

                            element.css({'background-position': '0 0'});

                            play(element, width, height, itemLine, total, timeTransition, timeReload, callback);
                        }, timeReload * 1000);
                    }

                    if (callback) {
                        callback();
                    }
                }
            }
        }

        var sprite = function (element, width, height, itemLine, total, timeTransition, timeReload, callback){
            spriteItemPosition = 0;
            spriteItemTop = 0;
            spriteItemLeft = 0;

            timeTransition = (typeof timeTransition !== "undefined") ? timeTransition : spriteTimeTransition;
            timeReload = (typeof timeReload !== "undefined") && (timeReload != 0) ? timeReload : 0;

            play(element, width, height, itemLine, total, timeTransition, timeReload, callback);
        }

        var destroy = function () {
            clearTimeout(spriteTimeoutTransition);
            clearTimeout(spriteReloadTimeout);
        }

        return this;
    }
}(jQuery));
