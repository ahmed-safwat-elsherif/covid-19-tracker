
var signupFormUser = document.getElementById('sign-up-form');
var signupModalUser = $('#sign-up-modal');
var signupBtnUser = $('.sign-up-btn');

var signupUsernameErrorUser = $('.username-signup-error');
var signupFullNameErrorUser = $('.fullname-signup-error');
var signupPasswordErrorUser = $('.password-signup-error');



var loginFormUser = document.getElementById('login-form');
var loginModalUser = $('#login-modal');
var loginBtnUser = $('.login-btn');

var userFormUser = document.getElementById('user-form');
var userEditModalUser = $('#user-modal');
var userBtnUser = $('.user-btn');

var userUsernameErrorUser = $('.username-user-error');
var userFullNameErrorUser = $('.fullname-user-error');
var userNewPasswordErrorUser = $('.new-password-user-error');

var loginErrorUser = $('.login-error')
var signupErrorUser = $('.sign-up-error')


let userApis = {
   register: '/api/users/register',
   login: '/api/users/login',
   update: '/api/users/'
}
signupBtnUser.on('click', async (e) => {
   try {
      $('.signup-spinner').removeClass('disable')
      signupBtnUser.addClass('disabled')
      let username = signupFormUser.elements.usernameSignUp.value
      let password = signupFormUser.elements.passwordSignUp.value
      let fullName = signupFormUser.elements.fullNameSignUp.value
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "username": username, "fullName": fullName, "password": password });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      let data = await fetch(userApis.register, requestOptions)
      let status = data.status;
      
      data = await data.json();
      let { usernameValid, fullNameValid, passwordValid } = checkUserInfo(username, fullName, password)

      signupUsernameErrorUser.html(usernameValid)
      signupFullNameErrorUser.html(fullNameValid)
      signupPasswordErrorUser.html(passwordValid)
      signupErrorUser.html('');
      if (!data.error && usernameValid.length < 1) {
         setTimeout(() => {
            signupModalUser.modal('hide')
            $('.signup-spinner').addClass('disable')
            signupBtnUser.removeClass('disabled')
            loginModalUser.modal('show')
         }, 2000)
      } else {
         setTimeout(() => {
            signupUsernameErrorUser.html(usernameValid)
            signupFullNameErrorUser.html(fullNameValid)
            signupPasswordErrorUser.html(passwordValid)
            $('.signup-spinner').addClass('disable')
            signupBtnUser.removeClass('disabled')
            if(status == 409){
               signupErrorUser.html('Username is used')
            }
         }, 1000)
      }
   } catch (error) {
     // console.log({ error })
   }
})

loginBtnUser.on('click', async (e) => {
   try {
      $('.login-spinner').removeClass('disable')
      loginBtnUser.addClass('disabled')
      let username = loginFormUser.elements.usernameLogin.value;
      let password = loginFormUser.elements.passwordLogin.value;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "username": username, "password": password });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      let data = await fetch(userApis.login, requestOptions)
      data = await data.json()
      if (!data.error) {
         setTimeout(() => {
            loginErrorUser.html('');
            loginModalUser.modal('toggle')
            $('.login-spinner').addClass('disable')
            loginBtnUser.removeClass('disabled')
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('fullName', data.fullName || '')
            location.reload();
            userFormUser.elements.usernameUser.value = data.username;
            userFormUser.elements.fullNameUser.value = data.fullName;
         }, 2000)
      } else {
         setTimeout(() => {
            $('.login-spinner').addClass('disable')
            $('#passwordLogin').val('');
            loginErrorUser.html('Username or password is invalid')
            loginBtnUser.removeClass('disabled')
         }, 1000)
      }
   } catch (error) {
      //console.log({ error })
   }
})

userBtnUser.on('click', async (e) => {
   try {
      $('.user-spinner').removeClass('disable');
      userBtnUser.addClass('disabled');
      let username = userFormUser.elements.usernameUser.value;
      let fullName = userFormUser.elements.fullNameUser.value;
      let newPassword = userFormUser.elements.newPasswordUser.value;
      localStorage.setItem('username',username);
      localStorage.setItem('fullName',fullName);
      let { usernameValid, fullNameValid } = checkUserInfo(username, fullName);
      userUsernameErrorUser.html(usernameValid);
      userFullNameErrorUser.html(fullNameValid);
      let newPasswordUser = document.getElementById("newPasswordUser");
      if (newPasswordUser.hasAttribute('disabled')) {
         var raw = JSON.stringify({ "username": username, "fullName": fullName});
      } else {
         userNewPasswordErrorUser.html(checkUserInfo(username,fullName,newPassword).passwordValid);
         var raw = JSON.stringify({ "username": username, "fullName": fullName,"newPassword":newPassword });
      }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));
      myHeaders.append("Content-Type", "application/json");


      var requestOptions = {
         method: 'PATCH',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      let data = await fetch(userApis.update, requestOptions)
      data = await data.json()
     
      if (data.valid) {
         setTimeout(() => {
            userEditModalUser.modal('toggle')
            $('.user-spinner').addClass('disable')
            userBtnUser.removeClass('disabled')
         }, 2000)
      } else {
         setTimeout(() => {
            $('.user-spinner').addClass('disable')
            userBtnUser.removeClass('disabled')
         }, 1000)
      }
   } catch (error) {
      //console.log({ error })
   }
})

$('.check-password').on('click', (e) => {
   if ($(e.target).is(":checked")) {
      $('#newPasswordUser').removeAttr('disabled')
      
   } else {
      $('#newPasswordUser').attr('disabled', '')
      $('#newPasswordUser').val('')
   }
})

const checkUserInfo = (username='', fullName='', password='') => {
   let usernameValid = '';
   let fullNameValid = '';
   let passwordValid = '';
   if (!username || typeof username != 'string') {
      usernameValid = 'Username is invalid';
   }
   if (username.length < 5) {
      usernameValid = 'Username only accepts minimum 5 characters';
   }

   if (!password) {
      passwordValid = 'Password must be entered';
   }
   if (password.length < 6) {
      passwordValid = 'Password only accepts minimum 6 characters';
   }

   if (!fullName) {
      fullNameValid = 'Full name must be entered';
   }
   if (fullName.length < 4) {
      fullNameValid = 'Full name only accepts minimum 3 characters';
   }
   if (fullName.length > 50) {
      fullNameValid = 'Full name only accepts maximum 50 characters';
   }
   return { usernameValid, fullNameValid, passwordValid }
}

$('.toggle-login-signup').click(()=>{
   loginModalUser.modal('toggle');
   signupModalUser.modal('toggle');
})