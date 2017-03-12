/**
 * @author cesarmejia
 */

'use strict';

var general = {

    /**
     * @type {jQuery}
     */
    $body: $('body'),

    /**
     * @type {jQuery}
     */
    $window: $(window),

    /**
     * Initialize page scripts.
     */
    init: function() {

        // Initialize page parts.
        general.MobileNavigation.init();
        general.Navigation.init();
        general.OuterWrapper.init();
        

        // Events
        general.$window.on('load', function() { general._onLoad(); });
        general.$window.on('resize', function() { general._onResize(); });
        general.$window.on('scroll', function() { general._onScroll(); });
    },

    /**
     * Fires when the page is loaded.
     * @private
     */
    _onLoad: function() {  },

    /**
     * Fires when the page is resized.
     * @private
     */
    _onResize: function() {  },

    /**
     * Fires on scrolling.
     * @private
     */
    _onScroll: function() {  },

    /**
     * Scroll to a section indicated by hash.
     * @param {string} hash
     * @param {number} scrollTime
     * @param {number} extraOffset
     */
    scrollTo: function(hash, scrollTime, extraOffset) {
        var section = $(hash);

        if(section.length){
            var st = scrollTime || 1000, eo = extraOffset || 0;
            var offset = section.offset().top - eo;

            $('html, body').stop().animate({scrollTop: offset}, st);
        }
    },

    /**
     * MobileNavigation.
     */
    MobileNavigation: {
        /**
         * @type jQuery
         */
        elem: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.elem = $('.mobile-navigation');

            if(this.elem.length) {

            }
        }
    },

    /**
     * Navigation.
     */
    Navigation: {
        /**
         * @type jQuery
         */
        elem: null,

        /**
         * @type jQuery
         */
        toggleBtn: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.elem = $('.navigation');

            if(this.elem.length) {
                var _this = this;
                this.toggleBtn = this.elem.find('.toggle-btn');

                this.toggleBtn.on('click', function() { _this.openMobileNavigation(); });
            }
        },

        openMobileNavigation: function() {
            var elems = [
                general.MobileNavigation.elem,
                general.Navigation.elem,
                general.OuterWrapper.elem,
                general.$body,

                this.toggleBtn
            ];

            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];

                if (this.toggleBtn.hasClass('mobile-navigation-open')) {
                    elem.removeClass('mobile-navigation-open');
                } else {
                    elem.addClass('mobile-navigation-open');
                }
            }
        }
    },

    /**
     * OuterWrapper.
     */
    OuterWrapper: {
        /**
         * @type jQuery
         */
        elem: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.elem = $('.outer-wrapper');

            if(this.elem.length) {

            }
        }
    }

};

$(general.init);
