if (!localStorage.getItem('auth')) {
    location.href = "/admin/login"
}else {
        makeRequest()
}

async function makeRequest() {
    try {
        const response = await fetch("http://localhost:3000/admin/adminAuth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ authToken: localStorage.getItem('auth') })
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        let res = await response.json()
        document.getElementById('logout-btn').innerText = `Logout, ${res.username}`
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error.message)
    }
}
