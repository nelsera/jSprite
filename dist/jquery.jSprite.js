;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "jSprite",
        ver = "1.4.0",
        defaults = {
            // if grid 0, will calculate columns and lines (according to element width, and height) and overriding their values
            columns         : 0,        // columns to use in the sprite
            lines           : 0,        // lines to use in the sprite
            // if size 0, will calculate width and height (according to element size) and overriding their values
            width           : 0,        // px, width of each frame in the sprite
            height          : 0,        // px, height of each frame in the sprite

            total           : 0,        // total frames to use in the sprite
            timeTransition  : 50,       // milliseconds, time between each frame
            timeReload      : true,     // true, false or milliseconds, time between the end and a new beginning,
                                        //    if false will not restart, if true will use timeTransition for a smooth restart
            reverse         : false     // reverse animation
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.$el = $(this.element);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        getSize: function () {
            var width = this.options.width ? this.options.width : this.$el.innerWidth();
            var height = this.options.height ? this.options.height : this.$el.innerHeight();

            return {
                width: width,
                height: height
            };
        },

        getGrid: function (callback){
            var image = new Image();
            var base = this;

            callback = callback || function () {};

            image.onload = function () {
                var columns = base.options.columns ? base.options.columns : Math.round(image.width / base.options.width);
                var lines = base.options.lines ? base.options.lines : Math.round(image.height / base.options.height);

                callback({
                    columns: columns,
                    lines: lines
                });
            };

            image.src = this.$el.css('backgroundImage').replace(/url\((['"])?(.*?)\1\)/gi, '$2');

            return callback;
        },

        goTo: function (position) {
            var line    = 0,
                column  = 0,
                top     = 0,
                left    = 0;

            this.sprite.position = position;

            if (this.options.columns > 1 && this.options.lines > 1) {
                line = Math.floor(this.sprite.position / this.options.columns);
                column = this.sprite.position % this.options.columns;

                left = column * this.options.width;
                top = line * this.options.height;
            }

            // vertical sprite
            if (this.options.columns === 1) {
               top = this.sprite.position * this.options.height;
            }
            // horizontal sprite
            if (this.options.lines === 1) {
               left = this.sprite.position * this.options.width;
            }

            this.$el.css({'background-position': '-' + left + 'px -' + top + 'px'});

            return this;
        },

        next: function () {
            var position = this.sprite.position + 1;

            if (this.isLastFrame()) {
                position = 0;
            }

            if (this.options.reverse) {
                position = this.sprite.position - 1;

                if (this.isLastFrame()) {
                    position = this.options.total - 1;
                }
            }

            this.goTo(position);

            this.advance();

            return this;
        },

        prev: function () {
            var position = this.sprite.position - 1;

            if (this.isFirstFrame()) {
                position = this.options.total - 1;
            }

            this.goTo(position);

            this.advance();

            return this;
        },

        restart: function () {
            var delay = (this.options.timeReload === true) ? this.options.timeTransition : this.options.timeReload;
            var position = this.options.reverse ? (this.options.total - 1) : 0;

            this.goTo(position);

            this.stop(); // always call stop() before another setTimeout

            this.sprite.reloadTimeout = setTimeout(function (base) {
                base.animation();
            }, delay, this);

            return this;
        },

        stop: function () {
            clearTimeout(this.sprite.transitionTimeout);
            clearTimeout(this.sprite.reloadTimeout);

            return this;
        },

        isFirstFrame: function () {
            var is_first = false;

            if (!this.options.reverse && this.sprite.position !== 0) {
                is_first = false;
            }

            if (this.options.reverse && this.sprite.position === (this.options.total - 1)) {
                is_first = true;
            }

            return is_first;
        },

        isLastFrame: function () {
            var is_last = false;

            if (!this.options.reverse && this.sprite.position === (this.options.total - 1)) {
                is_last = true;
            }

            if (this.options.reverse && this.sprite.position === 0) {
                is_last = true;
            }

            return is_last;
        },

        advance: function () {
            this.stop(); // always call stop() before another setTimeout

            this.sprite.transitionTimeout = setTimeout(function (base) {
                base.animation();
            }, this.options.timeTransition, this);

            return this;
        },

        animation: function () {

            if (!this.isLastFrame()) {
                this.next();
            } else {
                // callback on finish animation
                if (this.options.onComplete) {
                    this.options.onComplete();
                }

                if (this.options.timeReload !== false) {
                    this.restart();
                }
            }

            return this;
        },

        init: function () {
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions and
            // call them like so: this.yourOtherFunction().

            var base = this;

            this.sprite = {
                position            : 0,    // between 0 and options.total
                reloadTimeout       : 0,    // id of timeout used to restart animation
                transitionTimeout   : 0     // id of timeout used to next frame animation
            };

            function start () {
                if (!base.options.total) {
                    base.options.total = base.options.columns * base.options.lines;
                }

                if (base.options.reverse) {
                    base.goTo(base.options.total -1);
                }

                base.advance();
            }

            if (!this.options.width || !this.options.height) {
                this.options = $.extend({}, this.options, this.getSize(base.options));
            }

            if (!this.options.columns || !this.options.lines) {
                this.getGrid(function (result) {
                    base.options = $.extend({}, base.options, result);
                    start();
                });
            } else {
                start();
            }
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );