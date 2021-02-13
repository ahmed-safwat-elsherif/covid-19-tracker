const signUpModal = () => {
    return `
    <div class="modal fade " id="sign-up-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user-plus"></i> Sign Up</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" id="sign-up-form">
                        <div class="container">
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 offset-md-2 col-md-10">
                                    <span class="sign-up-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-2"><label for="usernameSignUp">Username</label></div>
                                <div class="col-sm-12 col-md-10">
                                    <input type="text" placeholder="Username" class="rounded-pill form-control px-3" name="usernameSignUp" id="usernameSignUp">
                                    <span class="username-signup-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-2"><label for="fullNameSignUp">Full Name</label></div>
                                <div class="col-sm-12 col-md-10">
                                    <input type="text" placeholder="Full Name" class="rounded-pill form-control px-3" name="fullNameSignUp" id="fullNameSignUp">
                                    <span class="fullname-signup-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-2"><label for="passwordSignUp">Password</label></div>
                                <div class="col-sm-12 col-md-10">
                                    <input type="password" placeholder="Password" class="form-control rounded-pill px-3"
                                        name="passwordSignUp" id="passwordSignUp">
                                    <span class="password-signup-error text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="justify-content-center text-center mt-4">
                        <a class="link toggle-login-signup anchor-link font-roboto font-bold ">Already have an account!</a>
                    </div>
                    <div class="justify-content-center text-center mt-4">
                        <button type="button" class="btn sign-up-btn btn-wheat w-50 rounded-pill">
                            <div class="spinner-border disable signup-spinner spinner-border-sm" role="status"></div> Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const logInModal = () => {
    return `
    <div class="modal fade " id="login-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-sign-in-alt"></i> Log In</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" id="login-form">
                        <div class="container">
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 offset-md-2 col-md-10">
                                    <span class="login-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-2"><label for="usernameLogin">Username</label></div>
                                <div class="col-sm-12 col-md-10">
                                    <input type="text" placeholder="Username" class="rounded-pill form-control px-3" name="usernameLogin" id="usernameLogin">
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-2"><label for="passwordLogin">Password</label></div>
                                <div class="col-sm-12 col-md-10">
                                    <input type="password" placeholder="Password" class="rounded-pill form-control px-3"
                                        name="passwordLogin" id="passwordLogin">
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="justify-content-center text-center mt-4">
                        <a class="link toggle-login-signup anchor-link font-roboto font-bold ">Don't have an account?</a>
                    </div>
                    <div class="justify-content-center text-center mt-4">
                        <button type="button" class="btn login-btn btn-wheat w-50 rounded-pill">
                            <div class="spinner-border disable login-spinner spinner-border-sm" role="status"></div> Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const userModal = () => {
    return `
     <div class="modal fade " id="user-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user-edit"></i> User Info</h5>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div class="modal-body">
                     <form action="" id="user-form">
                         <div class="container">
                         <div class="row d-flex align-items-center my-2">
                             <div class="col-sm-12 col-md-3"><label for="usernameUser">Username</label></div>
                             <div class="col-sm-12 col-md-9">
                                 <input type="text" placeholder="Username" class="rounded-pill form-control px-3" name="usernameUser" id="usernameUser">
                                 <span class="username-user-error text-danger"></span>
                             </div>
                         </div>
                         <div class="row d-flex align-items-center my-2">
                             <div class="col-sm-12 col-md-3"><label for="fullNameUser">Full Name</label></div>
                             <div class="col-sm-12 col-md-9">
                                 <input type="text" placeholder="Full Name" class="rounded-pill form-control px-3" name="fullNameUser" id="fullNameUser">
                                 <span class="fullname-user-error text-danger"></span>
                             </div>
                         </div>
                         <div class="row d-flex align-items-center my-2">
                            <input class="form-check-input ms-2 ps-1 check-password col-sm-12 col-md-3" type="checkbox" value="" id="flexCheckChecked">
                            <label class="form-check-label col-sm-12 col-md-9" for="flexCheckChecked">
                                Change password
                            </label>
                         </div>
                         <div class="row d-flex align-items-center my-2">
                             <div class="col-sm-12 col-md-3"><label for="newPasswordUser">New Password</label></div>
                             <div class="col-sm-12 col-md-9">
                                 <input type="password" placeholder="New Password" disabled class="form-control rounded-pill px-3"
                                     name="newPasswordUser" id="newPasswordUser">
                                 <span class="new-password-user-error text-danger"></span>
                             </div>
                         </div>
                         </div>
                     </form>
                     <div class="justify-content-center text-center mt-4">
                         <button type="button" class="btn user-btn btn-wheat px-3 rounded-pill">
                             <div class="spinner-border disable user-spinner spinner-border-sm" role="status"></div> Save changes
                         </button>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     `
}

const countryModal = () => {
    return `
    
    <div class="modal fade country-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <img class="img-fluid align-self-center me-2 d-block country-flag" />
                    <h5 class="modal-title country-modal-name" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-grow text-center modal-spinner text-info" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                    <div class="country-modal-content disable">
                        <div class="w-75 m-auto">
                            <div class="country-name row align-self-center">country name</div>
                            <div class="country-population row align-self-center">country name</div>
                            <div class="country-confirmed row align-self-center">country name</div>
                            <div class="country-confirmed_daily row align-self-center">country name</div>
                            <div class="country-deaths row align-self-center">country name</div>
                            <div class="country-deaths_daily row align-self-center">country name</div>
                            <div class="country-recovered row align-self-center">country name</div>
                            <div class="country-recovered_daily row align-self-center">country name</div>
                            
                            <div class="country-last-update"></div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    </div>
    `
}
$('.modal-area').append(
    signUpModal(),
    logInModal(),
    userModal(),
    countryModal()
)