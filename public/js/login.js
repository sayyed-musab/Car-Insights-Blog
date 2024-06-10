const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username.value, password: password.value }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();

        if(res.err){
            errMsg = document.getElementById('err-msg')
            errMsg.innerText = res.err   
            errMsg.style.display = 'inline-block'
        }
        else{
            localStorage.setItem('auth', res.authToken)
            location.href = "/admin"
        }
    } catch (error) {
        console.error('Error:', error);
    }
})
