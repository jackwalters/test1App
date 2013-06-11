var app = {    

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
//            alert(title ? (title + ": " + message) : message);
            alert(title + ": " + message);
        }
    },
    
    registerEvents: function() {
        var self = this;
        //check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listnerer to change the "selected state of the item
            $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register a mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },
    
    initialize: function() {
        var self = this;
        self.registerEvents();
        this.store = new MemoryStore(function() {
 //           self.showAlert('Store Initialized', 'Info');
            $('body').html(new HomeView(self.store).render().el);
        });
    }
};

app.initialize();