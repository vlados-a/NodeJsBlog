function SignUp(signUpForm){
  (function($){
    var form = $(signUpForm);
    var validationMessage = function(text){
      var message =  $('<div class="alert alert-danger" role="alert"></div>').text(text);
      form.find('.validation').empty().append(message);
    }
    form.find('button.btn:submit').click(function(e){
      e.preventDefault();
      debugger;
      var password = form.find('#passwordInput').val();
      var password2 = form.find('#passwordInput2').val();
      if(password == ''){
        validationMessage('Password is required field');
        return;
      }
      if(form.find('input:text').val() == ''){
        validationMessage('Username is required field');
        return;
      }
      if(password == password2){
        form.submit();
      }
      else{
        validationMessage('Passwords doesn\'t match');
        return;
      }
    });
  })(jQuery);
}

module.exports = SignUp;
