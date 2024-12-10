function setCredentials() {
    const name = document.getElementById('name_val').value
    const user = document.getElementById('user_val').value
    const email = document.getElementById('email_val').value
    const password = document.getElementById('pass_val').value
    const passwordCon = document.getElementById('pass_con_val').value
    const terms = document.getElementById('terms_val')

    if (name == '' || user == '' || email == '' || password == '' || passwordCon == '') {
        alert('All fields are mandatory!!')
    }
    else if (!isValidEmail(email)) {
        alert('Enter a valid email address (e.g., usermail@gmail.com)!!')
    }
    else if (password.length >= 8 && 16 <= password.length) {
        alert('Password must be between 8-16 characters in length!!')
    }
    else if (!isValidPassword(password)) {
        alert('Password must contain at least one lowercase letter, one uppercase letter, one number, and be 8-16 characters long!!')
    }
    else if (password != passwordCon) {
        alert('Password do not match!!')
    }
    else if (terms.checked == false) {
        alert('Accept Terms & Conditions!!')
    }
    else {
        // alert('Registered, ' + user)
        sendDataToRoute(name, user, email, password)
    }
}

function isValidEmail(email) {
    const mailReg = /^[a-zA-Z0-9]+@gmail\.com$/
    return mailReg.test(email)
}

function isValidPassword(password) {
    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    return passReg.test(password)
}


function sendDataToRoute(name, user, email, password) {
    const data = {
        name: name,
        user: user,
        email: email,
        password: password
    };

    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        })

        .then(data => {
            if (data.error === 'Username already exists!!') {
                alert(data.error)
            }
            else if (data.error === 'Email already exists!!') {
                alert(data.error)
            }
            else {
                alert('Registered ' + data.user)
                window.location.href = "/"
            }
        })

        .catch(err => console.error(err))
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

function openConEye(height, bottom) {
    var ceye = document.getElementById('ceye')
    ceye.style.height = height;
    ceye.style.bottom = bottom;
}

function showConPassword() {
    var x = document.getElementById('pass_con_val')
    var ceye = document.getElementById('ceye')
    if (x.type === "password") {
        x.type = "text"
        ceye.src = "/static/image/eopenb.png"
        openConEye('14px', '13.5px')
    }
    else {
        x.type = "password"
        ceye.src = "/static/image/ecloseb.png"
        openConEye('20px', '11px')
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const ceye = document.getElementById('ceye');
    ceye.addEventListener('click', showConPassword);
});
