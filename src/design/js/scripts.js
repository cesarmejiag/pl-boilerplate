/**
 * @author cesarmejiaguzman
 */

var general = {

    /**
     * @type {jQuery}
     */
    $window: $(window),

    init: function(){

        // Events
        general.$window.on('load', function(){ general._onLoad(); });
        general.$window.on('resize', function(){ general._onResize(); });
        general.$window.on('scroll', function(){ general._onScroll(); });
    },

    /**
     * Fires when the page is loaded.
     * @private
     */
    _onLoad: function(){

    },

    /**
     * Fires when the page is resized.
     * @private
     */
    _onResize: function(){

    },

    /**
     * Fires on scrolling.
     * @private
     */
    _onScroll: function(){

    }

};

$(general.init);