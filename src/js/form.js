import $ from 'jquery';
import 'select2';

const form = {
    init: function () {
        const app = this;
        const $form = $('.js-form');

        $.expr[':'].focus = function (elem) {
            return elem === document.activeElement && (elem.type || elem.href);
        };

        if (!$form) {
            return;
        }

        app.document.ready(function () {
            if (!app.mobile) {
                app.form.initSelect();
                app.window.on('resize', function () {
                    app.form.initSelect();
                });
            }
            app.form.initLabel();

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

    },

    showMessage: function () {
        $('.js-success_hide').fadeOut(function () {
            $('.js-content').addClass('_success');
            $('.js-success_show').fadeIn();
        });
    },

    initLabel: function () {
        var $inputs = $('.js-form_label');
        $inputs
                .on('focus', function () {
                    $(this).siblings('label').addClass('_active');
                })
                .on('blur', function () {
                    if (!$(this).val()) {
                        $(this).siblings('label').removeClass('_active');
                    }
                })
                .filter('[value!=""], [value]').siblings('label').addClass('__active'); // не работает для селектов
    },

    initSelect: function () {
        $('.js-select').select2({
            dropdownPosition: 'below'
        });
    }
};

export default form;