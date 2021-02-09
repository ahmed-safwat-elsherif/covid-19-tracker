let userToken = localStorage.getItem('userToken')
let headers = new Headers();
headers.append('Authorization', userToken);
let requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};
fetch("/api/users/profile", requestOptions)
  .then((response) => {
    if (response.status != 201) {
      location.replace('/pages/404-page.html')
      console.log("sdfasdf")
    }
  })
  .catch(error => {
    console.log('error', error)
    location.replace('/pages/404-page.html')
  });

