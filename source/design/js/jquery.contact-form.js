/**
 * @author cesarmejia
 * TODO: Add colors feature
 *       Add lang feature
 */

'use strict';

var ContactForm = {

    /**
     * @type {Object}
     */
    handlers: {},

    /**
     * @type string[]
     */
    inputs: [
        'input[name=Nombre]',
        'input[name=Telefono]',
        'input[name=Email]',
        'textarea[name=Mensaje]'
    ],

    /**
     * Add new form to validate.
     * @param {jQuery} $form
     */
    addForm: function($form) {
        if ($form instanceof jQuery) {

            $form.each(function() {
                var $f = $(this);

                // Attach change handler.
                ContactForm.getInputs($f).on('change', ContactForm.onInputChange);

                // Attach submit handler.
                $f.on('submit', ContactForm.onSubmit);
            });

        }
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
            url: 'http://goplek.com/mailer/send-mail.php',

            beforeSend: handlers.beforeSend,
            error     : handlers.error,
            success   : handlers.success

        });

    },

    /**
     * Get form inputs.
     * @param {jQuery} $form
     * @returns {jQuery} matched inputs.
     */
    getInputs: function($form) {
        return $form.find( ContactForm.inputs.join() );
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
     */
    onInputChange: function() {
        var $input = $(this);

        // Retrieve error element if exists.
        var $errorElement = $input.data('error-element');


        if (ContactForm.isInputValid($input)) {

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
     * @param {Object} ev
     */
    onSubmit: function(ev) {
        ev.preventDefault();

        var $form = $(this),
            valid = true;


        // Validate inputs before submit.
        ContactForm.getInputs($form).each(function() {
            var $input = $(this);

            if (!ContactForm.isInputValid($input)) {
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
                uHandlers = ContactForm.handlers,
                $response = $('<div class="server-response">');


            // Show response.
            var showResponse = function($response) {
                $form
                    .empty()
                    .append($response);
            };

            // Define default handler for beforeSend.
            handlers.beforeSend = uHandlers.beforeSend || function(jqXHR, settings) {
                    $response.text('Enviando...');
                    showResponse($response);
                };

            // Define default handler for error.
            handlers.error = uHandlers.error || function(jqXHR, textStatus, errorThrown) {
                    $response.text('Error: No se pudo entregar el mensaje.');
                    showResponse($response);
                };

            // Define default handler for success.
            handlers.success = uHandlers.success || function(data, textStatus, jqXHR) {
                    if (parseInt(data))
                        $response.text('El mensaje fue entregado correctamente.');
                    else
                        $response.text('No se pudo entregar el mensaje. Intentalo mas tarde.');

                    showResponse($response);
                };

            // Send data to server.
            ContactForm.ajaxRequest(data, handlers);
        }

    },

    /**
     * Reset form inputs.
     * @param {jQuery} $form
     */
    resetFormInputs: function($form) {
        ContactForm.getInputs($form).val('');
    }

};