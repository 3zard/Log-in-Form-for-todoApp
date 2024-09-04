var accounts = JSON.parse(localStorage.getItem('accounts')) || [];

document.getElementById("form__sign-up").addEventListener("submit", function(event) {
    event.preventDefault();

    let enteredUsername = document.getElementById("username__register").value;
    let enteredPassword = document.getElementById("password__register").value;
    let enteredRepeatPassword = document.getElementById("repeat-password__register").value;

    if (enteredUsername === '' && enteredPassword === '' && enteredRepeatPassword === '') {
        alert('Please enter Username, Password and Repeat Password');
        return;
    }

    if (enteredUsername === '') {
        alert('Please enter Username');
        return;
    }
    if (enteredPassword === '') {
        alert('Please enter Password');
        return;
    }
    if (enteredRepeatPassword === '') {
        alert('Please enter Repeat Password');
        return;
    }
    if (enteredPassword !== enteredRepeatPassword) {
        alert('Repeat Password is incorrect');
    }
    if (accounts.find(() => enteredUsername === accounts.username)) {
        alert('Username already exists');
        return;
    }
    let newAccount = {
        username: enteredUsername,
        password: enteredPassword
    };
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts))
    alert('Registered successfully');
    window.location.href = "login.html";
});

window.addEventListener('load', function() {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        autoLogIn(loggedInUser.username);
    }
})

function autoLogIn(username) {
    let isAuthorized = accounts.some((accounts) => accounts.username === username)
    if (isAuthorized) {
        window.location.href = "index.html";
    }
}