const postForm = document.querySelector("#new-post");

postForm.addEventListener("submit",postHandler);

async function postHandler(event) {
    event.preventDefault();

    const postTitle = postForm.children[0].value.trim();
    const postBody = postForm.children[1].value.trim();

    // First grabs the sessiondata
    await fetch("/sessiondata")
    .then(res => { return res.json() })
    .then(async(cookie)=>{

        // Posts the new comment
        await fetch("/api/posts",{
            method: "POST",
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
                user_id: cookie.user_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        postForm.children[0].value = ""
        postForm.children[1].value = ""
        location.reload();
    })
}