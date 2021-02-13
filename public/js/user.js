


let userApis = {
   register: '/api/users/register',
   login: '/api/users/login',
   update: '/api/users/'
}
signupBtn.on('click', async (e) => {
   try {
      $('.signup-spinner').removeClass('disable')
      signupBtn.addClass('disabled')
      let username = signupForm.elements.usernameSignUp.value
      let password = signupForm.elements.passwordSignUp.value
      let fullName = signupForm.elements.fullNameSignUp.value
      console.log("aa")
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
      console.log({usernameValid,fullNameValid, passwordValid});
      signupUsernameError.html(usernameValid)
      signupFullNameError.html(fullNameValid)
      signupPasswordError.html(passwordValid)
      signupError.html('');
      if (!data.error && usernameValid.length < 1) {
         setTimeout(() => {
            console.log("DSDSD")
            signupModal.modal('hide')
            $('.signup-spinner').addClass('disable')
            signupBtn.removeClass('disabled')
            loginModal.modal('show')
         }, 2000)
      } else {
         setTimeout(() => {
            signupUsernameError.html(usernameValid)
            signupFullNameError.html(fullNameValid)
            signupPasswordError.html(passwordValid)
            $('.signup-spinner').addClass('disable')
            signupBtn.removeClass('disabled')
            if(status == 409){
               signupError.html('Username is used')
            }
         }, 1000)
      }
   } catch (error) {
     // console.log({ error })
   }
})

loginBtn.on('click', async (e) => {
   try {
      $('.login-spinner').removeClass('disable')
      loginBtn.addClass('disabled')
      let username = loginForm.elements.usernameLogin.value;
      let password = loginForm.elements.passwordLogin.value;

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
            loginError.html('');
            loginModal.modal('toggle')
            $('.login-spinner').addClass('disable')
            loginBtn.removeClass('disabled')
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('fullName', data.fullName || '')
            location.reload();
            userForm.elements.usernameUser.value = data.username;
            userForm.elements.fullNameUser.value = data.fullName;
         }, 2000)
      } else {
         setTimeout(() => {
            $('.login-spinner').addClass('disable')
            $('#passwordLogin').val('');
            loginError.html('Username or password is invalid')
            loginBtn.removeClass('disabled')
         }, 1000)
      }
   } catch (error) {
      //console.log({ error })
   }
})

userBtn.on('click', async (e) => {
   try {
      $('.user-spinner').removeClass('disable');
      userBtn.addClass('disabled');
      let username = userForm.elements.usernameUser.value;
      let fullName = userForm.elements.fullNameUser.value;
      let newPassword = userForm.elements.newPasswordUser.value;
      localStorage.setItem('username',username);
      localStorage.setItem('fullName',fullName);
      let { usernameValid, fullNameValid } = checkUserInfo(username, fullName);
      userUsernameError.html(usernameValid);
      userFullNameError.html(fullNameValid);
      let newPasswordUser = document.getElementById("newPasswordUser");
      if (newPasswordUser.hasAttribute('disabled')) {
         var raw = JSON.stringify({ "username": username, "fullName": fullName});
      } else {
         userNewPasswordError.html(checkUserInfo(username,fullName,newPassword).passwordValid);
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
            userEditModal.modal('toggle')
            $('.user-spinner').addClass('disable')
            userBtn.removeClass('disabled')
         }, 2000)
      } else {
         setTimeout(() => {
            $('.user-spinner').addClass('disable')
            userBtn.removeClass('disabled')
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