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

        //
        ContactForm.addForm( $('.contact-form') );

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
        navToggleBtn: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.elem = $('.navigation');

            if(this.elem.length) {
                var _this = this;
                this.navToggleBtn = this.elem.find('.navigation-toggle');

                this.navToggleBtn.on('click', function() { _this.openMobileNavigation(); });
            }
        },

        openMobileNavigation: function() {
            var elems = [
                general.MobileNavigation.elem,
                general.Navigation.elem,
                general.OuterWrapper.elem,
                general.$body,

                this.navToggleBtn
            ];

            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];

                if (this.navToggleBtn.hasClass('mobile-navigation-open')) {
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
