import $ from 'jquery';
import page from 'page';
import form from 'form';

var app = {
    init: function () {

        // Init page
        this.page = page;
        this.page.init.call(this);
        
        // Init form
        this.form = form;
        this.form.init.call(this);

    }
};

app.init();