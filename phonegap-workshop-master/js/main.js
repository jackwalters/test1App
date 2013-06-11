var app = {    

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
//            alert(title ? (title + ": " + message) : message);
            alert(title + ": " + message);
        }
    },
    
    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(newEmployeeView(employee).render().el);
            });
        }
    },
    
    registerEvents: function() {
        var self = this;
        //listen to URL hash tag changes
        $(window).on('hashchange', $.proxy(this.route, this));
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
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
 //           self.showAlert('Store Initialized', 'Info');
            self.route();
        });
    }
};

app.initialize();