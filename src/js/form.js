import $ from 'jquery';
import 'select2';

const form = {
    init: function () {
        const app = this;
        const $form = $('.js-form');

        if (!$form) {
            return;
        }

        app.document.ready(function () {
            app.form.initSelect();
            $form.submit(function () {
                var data = $form.serialize();
                $.ajax({
                    type: $form.attr('method'),
                    url: $form.attr('action'),
                    dataType: 'json',
                    data: data,
                    beforeSend: function () {
                        $form.find('input, select, button').addClass('_disabled');
                    },
                    success: function (data) {
                        if (data['success']) {
                            app.form.showMessage();
                        } else if (data['msg']) {
                            console.log(data['msg']);
                        }
                    },
                    complete: function () {
                        $form.find('input, select, button').removeClass('_disabled');
                    }
                });
                return false;
            });
        });

        app.window.on('resize', function () {
            app.form.initSelect();
        });

    },

    showMessage: function () {
        $('.js-success_hide').fadeOut(function() {
            $('.js-content').addClass('_success');
            $('.js-success_show').fadeIn();
        });
    },

    initSelect: function () {
        $('.js-select').select2({
            dropdownPosition: 'below'
        });
    }
};

export default form;