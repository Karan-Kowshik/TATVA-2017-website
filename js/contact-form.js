/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
    $("#submit-message").click(function(){
        
        var btn = $(this);
        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_company = $('input[name=company]').val();
        var user_message = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userCompany': user_company,
                'userEmail': user_email,
                'userMessage': user_message
            };

            var btnText = btn.html();
            if(!btn.hasClass('fa-spin'))
                btn.prepend('<i class="fa fa-refresh fa-spin"></i> ');
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){
                
                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                }
                else {
                
                    output = '<div class="success">' + response.text + '</div>';
                    
                    //reset values in all input fields
                    $('#contact-form input').val('');
                    $('#contact-form textarea').val('');
                }
                
                btn.html(btnText);
                $("#send-result").hide().html(output).slideDown();
            }, 'json');
            
        }
        
        return false;
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact-form input, #contact-form textarea").keyup(function(){
        $("#contact-form input, #contact-form textarea").css('border-color', '');
        $("#send-result").slideUp();
    });
    
});