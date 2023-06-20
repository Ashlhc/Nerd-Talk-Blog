console.log("Signup Script Loaded...")
const signup = document.querySelector("#signup");

// Signup event listener
signup.addEventListener("submit", async function(event) {
    const name = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    console.log(name)
    console.log(password)

    event.preventDefault();
    await fetch("/api/users/",{
        method: "POST",
        body: JSON.stringify({
            name: name,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const loginResponse = await fetch("/api/users/login",{
        method: "POST",
        body: JSON.stringify({
            name: name,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (loginResponse.ok){
        window.location.href = "/dashboard"
    }
});