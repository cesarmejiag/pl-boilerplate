/**
 * @author cesarmejia
 * TODO: Add colors feature
 *       Add lang feature
 */

var ContactForm = (function() {
    'use strict';

    /**
     * Contains handlers for the form.
     * @type {Object}
     */
    ContactForm.handlers = {  };


    /**
     * @type string[]
     */
    ContactForm.inputs = [
        'input[name=Nombre]',
        'input[name=Telefono]',
        'input[name=Email]',
        'textarea[name=Mensaje]'
    ];


    /**
     * Create a contact form.
     * @param {jQuery} $form
     */
    function ContactForm ($form) {
        if ($form instanceof jQuery) {

            // Store custom handlers for each event in ajax request.
            this.handlers = {  };

            // Points to form.
            this.$form = $form;

            // Let user close the browser.
            this.letCloseWindow = true;

            // Loader screen element.
            this.$loader = $('<div class="contact-form-loader">');

            // Attach change handler.
            this.getInputs().on('change', this.onInputChange.bind(this));

            // Attach submit handler.
            this.$form.on('submit', this.onSubmit.bind(this));

        }
    }


    ContactForm.prototype = {

        /**
         * Add custom handler.
         * @param {string} name beforeSend|error|success
         * @param {function} handler
         */
        addHandler: function(name, handler) {
            this.handlers[name] = handler;
        },

        /**
         * Make an ajax request to send contact form.
         * @param {Object} data
         * @param {Object} handlers
         */
        ajaxRequest: function(data, handlers) {

            $.ajax({
                data: data,
                type: 'GET',
                // type: 'POST',
                // url: 'http://goplek.com/mailer/send-mail.php',
                url: 'send-mail.php',

                beforeSend: handlers.beforeSend,
                error     : handlers.error,
                success   : handlers.success

            });

        },

        /**
         * Get form inputs.
         * @returns {jQuery} matched inputs.
         */
        getInputs: function() {
            return this.$form.find( ContactForm.inputs.join() );
        },

        /**
         * Get validity of a form input.
         * @param {jQuery} $input
         * @returns {boolean} validity
         */
        isInputValid: function($input) {
            var type  = $input.attr('name'),
                value = $input.val();

            if (!value) return false;

            switch (type) {
                case 'Nombre':
                    return value.length > 3;
                case 'Telefono':
                    return value.replace(/[^0-9]/g, '').length === 10;
                case 'Email':
                    var pattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                    return pattern.test(value);
                case 'Mensaje':
                    return true;
                default:
                    if(console && console.log)
                        console.log("Unknown validation type: " + type);
                    return true;
            }
        },

        /**
         * Toggle error mark in an input.
         * @param {Event} ev
         */
        onInputChange: function(ev) {
            var $input = $(ev.target);

            // Retrieve error element if exists.
            var $errorElement = $input.data('error-element');


            if (this.isInputValid($input)) {

                if ($errorElement) {
                    // Disappears and remove error element from DOM.
                    $errorElement.fadeOut(function() { $errorElement.remove(); });

                    // Set as null data of input.
                    $input.data('error-element', null);

                    // Set default color of input.
                    $input.css('border', '1px solid #dcdcdc');
                }

            } else {

                if (!$errorElement) {
                    var clue = $input.data('clue') || 'Inválido';

                    // Create error element and set.
                    $errorElement = $('<span>');

                    $errorElement
                        .insertBefore($input)
                        .css({'display': 'none', 'color': '#f00'})
                        .text(clue)
                        .fadeIn();

                    $input.data('error-element', $errorElement);

                }

                $input.css('border', '1px solid #f00');

            }

        },

        /**
         * Submit form handler.
         * @param {Event} ev
         */
        onSubmit: function(ev) {
            ev.preventDefault();

            var $form = $(ev.target),
                self  = this,
                valid = true;


            // Validate inputs before submit.
            this.getInputs().each(function() {
                var $input = $(this);

                if (!self.isInputValid($input)) {
                    $input.trigger('change');
                    valid = false;
                }
            });


            // If no valid show alert with error.
            if (!valid) {
                alert('Hay campos inválidos, por favor revisa las indicaciones en rojo.');

            } else {

                // Retrieve data from from.
                var data = {
                    host: location.hostname,
                    data: $form.serialize()
                };


                // Set default handlers.
                var handlers  = {},
                    mHandlers = this.handlers,
                    sHandlers = ContactForm.handlers,
                    $response = $('<div class="server-response">');


                // Show response.
                var showResponse = function($response) {
                    $form
                        .empty()
                        .append($response);
                };

                // Define default handler for beforeSend.
                handlers.beforeSend = mHandlers.beforeSend || sHandlers.beforeSend || function(jqXHR, settings) {
                        $response.text('Enviando...');
                        showResponse($response);
                    };

                // Define default handler for error.
                handlers.error = mHandlers.error || sHandlers.error || function(jqXHR, textStatus, errorThrown) {
                        $response.text('Error: No se pudo entregar el mensaje.');
                        showResponse($response);
                    };

                // Define default handler for success.
                handlers.success = mHandlers.success || sHandlers.success || function(data, textStatus, jqXHR) {
                        if (parseInt(data))
                            $response.text('El mensaje fue entregado correctamente.');
                        else
                            $response.text('No se pudo entregar el mensaje. Intentalo mas tarde.');

                        showResponse($response);
                    };

                // Send data to server.
                this.ajaxRequest(data, handlers);
            }

        },

        /**
         * Reset form inputs.
         */
        resetFormInputs: function() {
            this.getInputs($form).val('');
        }

    };

    return ContactForm;

})();