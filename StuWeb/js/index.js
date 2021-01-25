const heading = document.querySelector('h2');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


auth.onAuthStateChanged(user => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'inline-block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        heading.innerHTML ="Your tasks!"
    
    } 
    
    else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'inline-block');
        heading.innerHTML ="<br><br><br>login/Signup to continue!"
      
    }
  });



