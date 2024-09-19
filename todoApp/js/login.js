let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

document.getElementById("form__log-in").addEventListener('submit', function(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("username__login").value;
    const enteredPassword = document.getElementById("password__login").value;

    if (enteredUsername === '' && enteredPassword === '') {
        alert('Please enter Username and Password');
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

    let isExisted = accounts.some((accounts) => enteredUsername === accounts.username);

    if (!isExisted) {
        alert('Account does not exist');
        return;
    }

    let isCorrectAccount = accounts.some((accounts) => enteredUsername === accounts.username && enteredPassword === accounts.password)
    if (!isCorrectAccount) {
        alert('Password is incorrect');
        return;
    }
    let isRememberMe = document.getElementById("remember__tick-box").checked;
    if (isRememberMe) {
        localStorage.setItem('loggedInUser', JSON.stringify({ username: enteredUsername }));
    }
    else {
        sessionStorage.setItem('loggedInUser', JSON.stringify({ username: enteredUsername }));
    }
    alert('Log in successfully')
    window.location.href = "index.html";
    return;
})

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