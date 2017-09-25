/**
 * @author cesarmejia
 */

'use strict';

var Page = {

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
        Page.Navigation.init();
        Page.Contact.init();

        // Events
        Page.$window.on('load', function() { Page._onLoad(); });
        Page.$window.on('resize', function() { Page._onResize(); });
        Page.$window.on('scroll', function() { Page._onScroll(); });
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
     * Send notification to Google Analytics.
     * @param {string} category
     * @param {string} action
     * @param {string} label
     * @return {[type]} [description]
     */
    ga: function(category, action, label) {
        if ("function" === typeof ga 
            && "string" === typeof category
            && "string" === typeof action) {
            var object = {
                hitType      : 'event',
                eventCategory: category,
                eventAction  : action,
                eventLabel   : label || ''
            };

            // Send to Google Analytics.
            ga('send', object);

            // Print in console.
            if ("console" in window) {
                console.log(
                    'ga: [category: %s, action: %s, label: %s]',
                    object.eventCategory,
                    object.eventAction,
                    object.eventLabel
                );
            }
        }
    },

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
     * Navigation.
     */
    Navigation: {
        /**
         * @type jQuery
         */
        $closeListBtn: null,

        /**
         * @type jQuery
         */
        $elem: null,

        /**
         * @type jQuery
         */
        $list: null,

        /**
         * @type jQuery
         */
        $toggleBtn: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.$elem = $('.navigation');

            if(this.$elem.length) {
                this.$listWrapper = this.$elem.find('.list-wrapper');
                this.$closeListBtn = this.$elem.find('.close-list-btn');
                this.$toggleBtn = this.$elem.find('.toggle-btn');

                this.toggleCollapsed = this.toggleCollapsed.bind(this);

                this.$closeListBtn.on('click', this.toggleCollapsed);
                this.$toggleBtn.on('click', this.toggleCollapsed);
            }
        },

        /**
         * Show or hide mobile navigation.
         */
        toggleCollapsed: function() {
            if (this.$listWrapper.hasClass('list-collapsed')) {
                this.$listWrapper.removeClass('list-collapsed');
                Page.$body.removeClass('no-scroll');
            } else {
                this.$listWrapper.addClass('list-collapsed');
                Page.$body.addClass('no-scroll');
            }
        }
    },

    /**
     * Contact
     */
    Contact: {
        /**
         * @type jQuery
         */
        $elem: null,

        /**
         * Initialize page part.
         */
        init: function() {
            this.$elem = $('.contact');

            if(this.$elem.length) {
                // Initialize contact form.
                new ContactForm( $('.contact-form') );
            }
        }
    }

};

$(Page.init);
