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
                                <div class="col-sm-12 col-md-3"><label for="usernameSignUp">Username</label></div>
                                <div class="col-sm-12 col-md-9">
                                    <input type="text" placeholder="Username" class="rounded-pill form-control px-3" name="usernameSignUp" id="usernameSignUp">
                                    <span class="username-signup-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-3"><label for="fullNameSignUp">Full Name</label></div>
                                <div class="col-sm-12 col-md-9">
                                    <input type="text" placeholder="Full Name" class="rounded-pill form-control px-3" name="fullNameSignUp" id="fullNameSignUp">
                                    <span class="fullname-signup-error text-danger"></span>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center my-2">
                                <div class="col-sm-12 col-md-3"><label for="passwordSignUp">Password</label></div>
                                <div class="col-sm-12 col-md-9">
                                    <input type="password" placeholder="Password" class="form-control rounded-pill px-3"
                                        name="passwordSignUp" id="passwordSignUp">
                                    <span class="password-signup-error text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn sign-up-btn btn-wheat px-3 rounded-pill">
                        <div class="spinner-border disable signup-spinner spinner-border-sm" role="status"></div> Sign Up
                    </button>
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn login-btn btn-wheat px-3 rounded-pill">
                        <div class="spinner-border disable login-spinner spinner-border-sm" role="status"></div> Login
                    </button>
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
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn user-btn btn-wheat px-3 rounded-pill">
                         <div class="spinner-border disable user-spinner spinner-border-sm" role="status"></div> Save changes
                     </button>
                 </div>
             </div>
         </div>
     </div>
     `
}

$('.modal-area').append(
   signUpModal(),
   logInModal(),
   userModal()
)