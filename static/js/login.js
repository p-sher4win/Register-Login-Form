function getCredentials() {
    const username = document.getElementById('user_val').value
    const password = document.getElementById('pass_val').value

    if (username == '' || password == '') {
        alert('All fields are mandatory!!')
    }
    else {
        // alert('Welcome, ' + username)
        loginUser(username, password)
    }
}

function loginUser(username, password) {
    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: username,
            password: password
        })
    })

        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid Username or Password!!')
            }
            return res.json()
        })

        .then(data => {
            alert('Welcome, ' + data.user)
            // add home page api link: just edit '/login.html' with the '/homepage.html'
            // window.location.href = '/login.html'
        })

        .catch(err => {
            alert(err.message)
        })
}

function openEye(height, bottom) {
    var eye = document.getElementById('eye')
    eye.style.height = height;
    eye.style.bottom = bottom;
}

function showPassword() {
    var x = document.getElementById('pass_val')
    var eye = document.getElementById('eye')
    if (x.type === "password") {
        x.type = "text"
        eye.src = "/static/image/eopenb.png"
        openEye('14px', '13.5px')
    }
    else {
        x.type = "password"
        eye.src = "/static/image/ecloseb.png"
        openEye('20px', '11px')
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const eye = document.getElementById('eye');
    eye.addEventListener('click', showPassword);
});



