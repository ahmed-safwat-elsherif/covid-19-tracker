var spinner = $(".spinner");
var wholePage = $('.first-page');
var countries = $('.cards');
var registrationArea = $('.registration-area');

var signupForm = document.getElementById('sign-up-form');
var signupModal = $('#sign-up-modal');
var signupBtn = $('.sign-up-btn');

var signupUsernameError = $('.username-signup-error');
var signupFullNameError = $('.fullname-signup-error');
var signupPasswordError = $('.password-signup-error');



var loginForm = document.getElementById('login-form');
var loginModal = $('#login-modal');
var loginBtn = $('.login-btn');

var userForm = document.getElementById('user-form');
var userEditModal = $('#user-modal');
var userBtn = $('.user-btn');

var userUsernameError = $('.username-user-error');
var userFullNameError = $('.fullname-user-error');
var userNewPasswordError = $('.new-password-user-error');

var loginError = $('.login-error')
var signupError = $('.sign-up-error')

$(function () {
   $(document).scroll(function () {
      if (window.location.href.indexOf("profile.html") > -1) {
         return;
      }
      var $nav = $(".navbar");
      var $homeSection = $(".section-home")
      // var $navItem = $(".nav-item")
      $nav.toggleClass('scrolled', $(this).scrollTop() > ($homeSection.height()));
   });
});

$(document).ready(async () => {
   spinner.removeClass('loading');
   spinner.addClass('loaded');
   wholePage.removeClass('unable');
   validateUser();
   $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
      $(this).toggleClass('open');
   });
   let numOfCountries;
   if (window.location.href.indexOf("profile.html") > -1) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
      };
      let userData = await fetch('/api/users/profile', requestOptions)
      userData = await userData.json()
      numOfCountries = userData.favoriteCountries.length;
      showFavCountries(0, 32)
      generatePagination(numOfCountries)
   } else {
      numOfCountries = await fetch('/api/countries/noOfRecords')
      numOfCountries = await numOfCountries.json()
      showCountries(0, 32)
      generatePagination(numOfCountries.numOfCountries)
   }
   DOMmanuplation()
})

async function showCountries(skip, limit) {
   countries.html(spinnerComponent())
   let arrayOfFav;
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
      };
      let userData = await fetch('/api/users/profile', requestOptions)
      userData = await userData.json()
      arrayOfFav = []
      userData.favoriteCountries.map((country) => {
         arrayOfFav.push(country._id)
      })
   } catch (error) {
      arrayOfFav = []
   }
   let data = await fetch(`/api/countries/?skip=${skip}&limit=${limit}`)
   data = await data.json()
   countries.html('')
   await data.countries.map((country) => {
      let isFavorie = arrayOfFav.includes(country._id)
      countries.append(countryCard(country, isFavorie))
   })
   DOMmanuplation()
}

async function showFavCountries(skip, limit) {
   countries.html(spinnerComponent())
   let numOfCountries;
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));
      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
      };
      let data = await fetch(`/api/countries/favorites/?skip=${skip}&limit=${limit}`, requestOptions)
      data = await data.json()
      countries.html('')
      if (data.countries.length < 1) {
         countries.append(cardsEmpty())
         return
      }
      await data.countries.map((country) => {
         countries.append(countryCard(country, true))
      })
   } catch (error) {
      numOfCountries = 0;
   }
   DOMmanuplation();
}

const countryCard = (country, isFavorie) => {
   let isDisabled = !(window.location.href.indexOf("profile.html") > -1)
   return `
   <div class="country-card card country-${country.uid} m-3">
      <div class=" text-end mt-2">
         <div class="text-end ">
            <i style="font-size:2rem;" class=" ${(isDisabled) ? "" : "disable"} ${(isFavorie) ? 'fav-icon' : ''} ${(isFavorie) ? 'fas' : 'far'} icon-${country.uid} fa-heart"></i>
            <i style="font-size:2rem;" class=" ${(isDisabled) ? "disable" : ""} ${(isFavorie) ? 'fav-icon' : ''} fas fa-times-circle"></i>
         <div>
      </div>
      <div class="card-body text-center">
         <h4 class="card-title">${country.country}</h4>
         <hr style="border:1px solid grey; width:50%; margin:auto" />
         <img src="https://www.countryflags.io/${country.country_iso2}/flat/64.png">
         <h4></h4>
         <div class="container text-start">
            <div class="numbers text-primary row"><span class="card-data col-8"><i class="fas fa-disease"></i> Confirmed:</span>${country.confirmed || "N/A"}<hr/></div>
            <div class="numbers text-danger row"><span class="card-data col-8"><i class="fas fa-skull"></i> Deaths:</span>${country.deaths || "N/A"}<hr/></div>
            <div class="numbers text-success row"><span class="card-data col-8"><i class="fas fa-plus-square"></i> Recovered:</span>${country.recovered || "N/A"}<hr/></div>
         </div>
         <button id="${country._id}" type="button" class="know-more btn btn-link">Know more</button>
      </div>
   </div>
   `
}

const generatePagination = (numOfCountries) => {
  
   let skip = 0;
   let limit = 32;
   let pagOfBtns;
   let numOfPages = (Math.ceil(numOfCountries / limit));
   for (let i = numOfPages; i >= 1; i--) {
      skip = 32 * (i - 1);
      pagOfBtns = `<button type="button" class="pagiNum ${skip}-${limit} ${i}_${numOfPages} btn mx-1 rounded-circle btn-wheat">${i}</button>`
      $(pagOfBtns).insertAfter($("#prevPage"))
   }
   $('.pagiNum').first().addClass('active')
   $('.pagiNum').on('click', (e) => {
      console.log("btn")
      $('.pagiNum.active').removeClass('active')
      e.target.classList.add('active')
      
      let skip = Number(e.target.classList[1].split('-')[0])
      let limit = Number(e.target.classList[1].split('-')[1])
      if (window.location.href.indexOf("profile.html") > -1) {
         showFavCountries(skip, 32)
         $('html, body').animate({
            scrollTop: $("#country-cards").offset().top
         },500);
         return;
      }
      showCountries(skip, 32)
      $('html, body').animate({
         scrollTop: $("#country-cards").offset().top
      },500);
   })
   return true
}

function DOMmanuplation() {

   $('.logout').on('click', (e) => {
      e.stopPropagation();
      $('.logout').addClass('disabled')
      $('.fa-sign-out-alt').hide()
      $('.logout-spinner').removeClass('disable')
      setTimeout(() => {
         localStorage.setItem('userToken', '')
         location.replace('/')
         $('.logout-spinner').addClass('disable')
      }, 1500)
   })
   $('.show-fav').on('click', (e) => {
      e.stopPropagation()
      $('.show-fav').addClass('disabled')
      location.href = '/profile.html'
   })
   $('.fa-heart:not(.fav-icon)').hover(
      (e) => {
         $(e.target).addClass('fas')
         $(e.target).removeClass('far')
      },
      (e) => {
         $(e.target).removeClass('fas')
         $(e.target).addClass('far')
      }
   )
   $('.country-card').dblclick((e) => {
      let _id = e.target.id;
      console.log(_id);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "_id": _id });
      console.log(e.target)
      let uid = e.target.classList[2].split("-")[1];
      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };
      let target = document.querySelector(`.icon-${uid}`);

      fetch("/api/users/favorites/", requestOptions)
         .then(response => {
            if (response.status == 401) {
               $('#login-modal').modal('toggle');
               return
            }
            $(target).attr('class', '');
            $(target).addClass('fa fa-circle-o-notch fa-spin')
            //$(target).off('mouseenter mouseleave')
            setTimeout(() => {
               $(target).attr('class', '');
               $(target).addClass('fav-icon')
               $(target).addClass('fas fa-heart')
            }, 1000)
         })
         .catch(error => error /*console.log('error', error)*/);
   })
   $('.fa-heart:not(.fav-icon)').on('click', (e) => {
      let _id = e.target.parentElement.parentElement.parentElement.id;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "_id": _id });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };
      let target = e.target

      fetch("/api/users/favorites/", requestOptions)
         .then(response => {
            if (response.status == 401) {
               $('#login-modal').modal('toggle');
               return
            }
            $(target).attr('class', '');
            $(target).addClass('fa fa-circle-o-notch fa-spin')
            $(target).off('mouseenter mouseleave')
            setTimeout(() => {
               $(target).attr('class', '');
               $(target).addClass('fav-icon')
               $(target).addClass('fas fa-heart')
            }, 1000)
         })
         .catch(error => error /*console.log('error', error)*/);
   })

   $('.know-more').click((e) => {
      let _id = e.target.id;
      $('.modal-spinner').removeClass('disable');
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
      };

      fetch(`/api/countries/${_id}`, requestOptions)
         .then(res => {
            if (res.status == 404) throw new Error({ error: "Cannot find the country" })
            return res;
         })
         .then(response => response.json())
         .then((response) => {
            let country = response.country;
            $('.country-modal').modal('show');
            $('.modal-spinner').addClass('disable');
            $('.country-flag').attr('src', `https://www.countryflags.io/${country.country_iso2}/flat/64.png`)
            $('.country-modal-content').removeClass('disable');
            $('.country-modal-name').html(`${country.country}`);
            let date = new Date(country.date);
            let lastUpdate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            $('.country-name').html(`<span class="font-bold col-6">Country:</span> <span class="col-6 text-center">${country.combined_name || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-population').html(`<span class="font-bold col-6" >Population:</span> <span class="col-6 text-center">${country.population || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-confirmed').html(`<span class="text-primary font-bold col-6" >Confirmed:</span> <span class="col-6 text-center">${country.confirmed || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-confirmed_daily').html(`<span class="text-primary font-bold col-6" >Confirmed (daily):</span> <span class="col-6 text-center">${country.confirmed_daily || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-deaths').html(`<span class="text-danger font-bold col-6" >Deaths:</span> <span class="col-6 text-center">${country.deaths || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-deaths_daily').html(`<span class="text-danger font-bold col-6" >Deaths (daily):</span> <span class="col-6 text-center">${country.deaths_daily || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-recovered').html(`<span class="text-success font-bold col-6" >Recovered:</span> <span class="col-6 text-center">${country.recovered || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-recovered_daily').html(`<span class="text-success font-bold col-6" >Recovered (daily):</span> <span class="col-6 text-center">${country.recovered_daily || 'N/A'}</span><hr class="m-auto mb-2"/>`);
            $('.country-last-update').html(`<span class="text-muted font-bold" >Last updated: <span>${lastUpdate}</span></span> `);
         })
         .catch(error => console.log('error', error));
   })

   $('.fa-times-circle').on('click', (e) => {
      let _id = e.target.parentElement.parentElement.parentElement.id;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "_id": _id });

      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      fetch("/api/users/favorites/", requestOptions)
         .then(response => {
            if (response.status == 401) {
               return
            }
            $(`#${_id}`).animate({
               opacity: 0
            }, 700, function () {
               $(`#${_id}`).remove()
            });
            return response.json();
         })
         .then(response => {
            if (response.favoriteCountries.length < 1) {
               countries.html(cardsEmpty())
            }
         })
         .catch(error => error /*console.log('error', error)*/);
   })
   $('.settings').on('click', () => {
      userUsernameError.html('')
      userFullNameError.html('')
      userNewPasswordError.html('')
      userForm.elements.usernameUser.value = localStorage.getItem('username');
      userForm.elements.fullNameUser.value = localStorage.getItem('fullName');
   })
}

const spinnerComponent = () => {
   return `
        <div class="spinner-border text-dark" role="status">
            <span class="sr-only"></span>
        </div>
    `
}



async function validateUser() {
   // btn-display-none
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem('userToken'));

      var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
      };
      let data = await fetch('/api/users/profile', requestOptions)
      let status = await data.status;
      data = await data.json()
      if (status == 201) {
         //registrationArea.append(userIcon(data))
         $('.options').append(options)
         return
      }
      $('.btn-display-none').removeClass('btn-display-none')
   } catch (error) {
      return error;
      //console.log("Error: ", error)
   }
}

const userIcon = (user) => {
   return `
      <div class="rounded-pill user-icon p-2 ms-2 text-center" >
         <a href="/profile.html" class="user-icon-a">
            <h5>${user.username[0].toUpperCase()}</h5>   
         </a>
      <div>
   `
}

const options = () => {
   return `
   <li class="nav-item dropdown dropdown-options">
      <button class="btn btn-wheat dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         ${localStorage.getItem('username')}
      </button>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
         <li><button class="dropdown-item show-fav"><i class="fab fa-gratipay"></i><span class="d-inline-block ps-2">Favorites</span></button></li>
         <li><button class="dropdown-item settings" data-bs-toggle="modal" data-bs-target="#user-modal"><i class="fas fa-cogs"></i><span class="d-inline-block ps-2">Settings</span></button></li>
         <li><hr class="dropdown-divider"></li>
         <li><button class="dropdown-item logout">
         <div class="spinner-border disable logout-spinner spinner-border-sm" role="status"></div><i class="fas fa-sign-out-alt"></i><span class="d-inline-block ps-2">Logout</span>
         </button></li>
      </ul>
   </li>
   `
}


const cardsEmpty = () => {
   return ` 
      <div class="col-md-12 m">
         <img class="img-fluid" id="not-found" alt="Favorite not found" src="../assets/not-found.png"/>
         <h4 style='height: 7rem;'>Sorry! No cards were added to favorites :'(</h4>
      </div>
   `
}
$('#nextPage').unbind('click').bind('click', () => {
   let [index,maxIndex] = $('.pagiNum.active').attr("class").split(" ")[2].split("_")
   index = Number(index);
   maxIndex = Number(maxIndex);
   if (index < maxIndex) {
      let skip = Number($('.pagiNum.active').attr("class").split(" ")[1].split('-')[0])
      let limit = Number($('.pagiNum.active').attr("class").split(" ")[1].split('-')[1])
      if (window.location.href.indexOf("profile.html") > -1) {
         showFavCountries(skip + 32, limit)
      } else {
         showCountries(skip + 32, limit)
      }
      $('.pagiNum.active').removeClass('active')
      $(`.${index+1}_${maxIndex}`).addClass('active')
      $('html, body').animate({
         scrollTop: $("#country-cards").offset().top
      },500);
   }
})
$('#prevPage').unbind('click').bind('click', () => {
   let [index,maxIndex] = $('.pagiNum.active').attr("class").split(" ")[2].split("_")
   index = Number(index);
   maxIndex = Number(maxIndex);
   if (index > 1) {
      let skip = Number($('.pagiNum.active').attr("class").split(" ")[1].split('-')[0])
      let limit = Number($('.pagiNum.active').attr("class").split(" ")[1].split('-')[1])
      if (window.location.href.indexOf("profile.html") > -1) {
         showFavCountries(skip + 32, limit)
      } else {
         showCountries(skip + 32, limit)
      }
      $('.pagiNum.active').removeClass('active')
      $(`.${index-1}_${maxIndex}`).addClass('active')
      $('html, body').animate({
         scrollTop: $("#country-cards").offset().top
      },500);
   }
})

$('.sign-up-main-btn').on('click', () => {
   loginError.html('');
   signupForm.elements.usernameSignUp.value = '';
   signupForm.elements.passwordSignUp.value = '';
   signupForm.elements.fullNameSignUp.value = '';
   signupError.html('')
})
$('.login-main-btn').on('click', () => {
   signupUsernameError.html('')
   signupFullNameError.html('')
   signupPasswordError.html('')
   loginForm.elements.usernameLogin.value = ''
   loginForm.elements.passwordLogin.value = ''
})