function checkLogin() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    (async () => {
        const response = await fetch("/login-check", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const body = await response.json();
        if (body.redirect) {
            window.location.href = body.redirect;
        }
    })();
}

function logItem() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role_option = document.getElementById("user_type");
    const role_value = role_option.options[role_option.selectedIndex].text

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("role", role_value);
}

function deleteItem() {

    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
}