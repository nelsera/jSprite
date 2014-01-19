var spriteAnimation = spriteAnimation || {};

(function (scope) {
    'use strict';

    var spriteTimeTransition = 50; //milsec
    var spriteTimeReload = 3; //seconds
    var spriteTimeoutTransition, spriteReloadTimeout;
    var spriteItemPosition = 0;
    var spriteItemTop = 0;
    var spriteItemLeft = 0;
    var spriteHover = false;

    scope.play = function (element, width, height, itemLine, total, timeTransition, timeReload, callback){
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

    scope.sprite = function (element, width, height, itemLine, total, timeTransition, timeReload, callback){
        spriteItemPosition = 0;
        spriteItemTop = 0;
        spriteItemLeft = 0;

        timeTransition = (typeof timeTransition !== "undefined") ? timeTransition : spriteTimeTransition;
        timeReload = (typeof timeReload !== "undefined") && (timeReload != 0) ? timeReload : 0;

        play(element, width, height, itemLine, total, timeTransition, timeReload, callback);
    }

    scope.destroy = function () {
        clearTimeout(spriteTimeoutTransition);
        clearTimeout(spriteReloadTimeout);
    }
}(spriteAnimation));
