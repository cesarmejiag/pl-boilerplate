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
        general.$window.on('load', function(){ general._onLoad(); });
        general.$window.on('resize', function(){ general._onResize(); });
        general.$window.on('scroll', function(){ general._onScroll(); });
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
        navigationToggleBtn: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.elem = $('.navigation');

            if(this.elem.length) {
                var _this = this;
                this.navigationToggleBtn = this.elem.find('.navigation-toggle');

                this.navigationToggleBtn.on('click', function() { _this.openMobileNavigation(); });
            }
        },

        openMobileNavigation: function() {
            if(this.navigationToggleBtn.hasClass('mobile-navigation-open')) {
                general.MobileNavigation.elem.removeClass('mobile-navigation-open');
                general.Navigation.elem.removeClass('mobile-navigation-open');
                general.OuterWrapper.elem.removeClass('mobile-navigation-open');
                general.$body.removeClass('mobile-navigation-open');

                this.navigationToggleBtn.removeClass('mobile-navigation-open');

            } else {
                general.MobileNavigation.elem.addClass('mobile-navigation-open');
                general.Navigation.elem.addClass('mobile-navigation-open');
                general.OuterWrapper.elem.addClass('mobile-navigation-open');
                general.$body.addClass('mobile-navigation-open');

                this.navigationToggleBtn.addClass('mobile-navigation-open');

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
