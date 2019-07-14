function showErrorDialogWithMessage(message)
{
    // For the tutorial, we'll just do an alert. You should customize this function to 
    // present "pretty" error messages on your page.
    alert(message);
 
    // Re-enable the order button so the user can try again
    $('#buy-submit-button').removeAttr("disabled");
}
 
$(document).ready(function() 
{
    $('#buy-form').submit(function(event)
    {
        // immediately disable the submit button to prevent double submits
        $('#buy-submit-button').attr("disabled", "disabled");
         
        var name = $('#name').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var zip = $('#zip').val();
        var cardNumber = $('#card-number').val();
        var cardCVC = $('#cvv').val();
         
        // First and last name fields: make sure they're not blank
        if (name === "") {
            showErrorDialogWithMessage("Please enter your first name.");
            return;
        }		
        if (city === "") {
            showErrorDialogWithMessage("Please enter a city.");
            return;
        }
        if (state === "") {
            showErrorDialogWithMessage("Please enter a state.");
            return;
        }
        if (zip === "") {
            showErrorDialogWithMessage("Please enter a zip code.");
            return;
        }		
         
        // Validate the email address:
        /*var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email === "") {
            showErrorDialogWithMessage("Please enter your email address.");
            return;
        } else if (!emailFilter.test(email)) {
            showErrorDialogWithMessage("Your email address is not valid.");
            return;
        }*/
          
        // Stripe will validate the card number and CVC for us, so just make sure they're not blank
        if (cardNumber === "") {
            showErrorDialogWithMessage("Please enter your card number.");
            return;
        }
        if (cardCVC === "") {
            showErrorDialogWithMessage("Please enter your card security code.");
            return;
        }
         
        // Boom! We passed the basic validation, so we're ready to send the info to 
        // Stripe to create a token! (We'll add this code soon.)
         
    });
});