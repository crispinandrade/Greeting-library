var g = G$('John', 'Doe');

// Chaining methods to the parent object 'g'
g.greet()
//Result: Hello John!
.greet(true)
//Result: Greetings, John Doe
.setLang('es')
.greet(true)
//Result: Saludos, John Doe
.log();

// Testing unsupported languages on new objects
var cris = G$('Crispin', 'Andrade', 'en');
cris.greet();

$('#login').click(function() {
    // Grab fir
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var loginGreetr = G$(fname, lname);

    // Check input fields for empty strings
    if (fname.length === 0 || lname.length === 0){
        alert('Please fill all the fields');
    }
    else{
        // Hide form
        $('#loginForm').hide();
        // set the language of the object to the value of the lang dropdown
        loginGreetr.setLang($('#lang').val())
        // Pass a HTML element and boolean to HTMLGreeting
        .HTMLGreeting('#greeting', true)
        // Log to console 
        .log();
    }
});
