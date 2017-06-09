// New execution context for all the code, so it is safe
;(function(global, $){
    // Everything here is safe, including variables and objects

    // Function that returns results of a function constructor
    var Greetr = function(firstName, lastName, language) {
        // Returns function constructor
        return new Greetr.init(firstName, lastName, language);
    };

    // New objects have access to variables thanks to closures
    var lang = ['en', 'es'];

    // Creating objects to reference languages by their name (String)
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logGreetings = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };

    // Properties and methods created here
    // New objects created in Greetr.init has access to these properties and methods
    // 'this' will point to any new objects created
    Greetr.prototype = {

        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            // Check 'lang' array to match strings
            if (lang.indexOf(this.language) === -1) {
                throw "Unsupported language";
            }
        },

        greeting: function() {
            // returns greetings object for its properties by name
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            // returns formalGreetings object for its properties by name
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        // Creating chainable functions with 'return this'
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        log: function() {
            // Check if console is available
            if (console) {
                console.log(logGreetings[this.language] + ': ' + this.fullName());
            }
            return this;
        },

        // Change language on the fly
        setLang: function(lang) {
            this.language = lang;

            this.validate();

            return this;
        },
        
        // Passes a greeting to a selected HTML element with jQuery
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not found!';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greting();
            }

            $(selector).html(msg);

            return this;
        }
    };

    // Function constructor
    Greetr.init = function(firstName, lastName, language) {
        // Use a variable for 'this', avoiding confusion later 
        var self = this;
        // Builds the NEW object that was created in the Greetr function
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        // Validates the language to catch unsupported languages
        self.validate();
    };
    
    //Greeter.init function has its own prototype, but it needs to access the Greetr.prototype
    Greetr.init.prototype = Greetr.prototype;

    // Creating an alias for the Greetr function like the '$' in jQuery
    // Can either use Greetr() or G$() 
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));

