const comForm = document.querySelector("#new-comment");
// Grabs id from the URL, parsing int in case of queries
const postId = parseInt(window.location.href.split("/").pop())

if (comForm){
    comForm.addEventListener("submit",comFormHandler);
}

async function comFormHandler(event) {
    event.preventDefault();

    // Gets value from the form input
    const comment = comForm.children[0].value.trim()

    // First grabs the sessiondata
    await fetch("/sessiondata")
    .then(res => { return res.json() })
    .then(async(cookie)=>{

        // Posts the new comment
        await fetch("/api/comments",{
            method: "POST",
            body: JSON.stringify({
                body: comment,
                post_id: postId,
                user_id: cookie.user_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        comForm.children[0].value = ""
        location.reload();
    })
    

}

const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

editBtn.addEventListener("click",editHandler);
deleteBtn.addEventListener("click",deleteHandler);

async function editHandler(event) {
    event.preventDefault();
    // Grabs the post element for reference
    const mainPost = document.querySelector(".post")
    // If the edit form already exists, breaks early
    if (mainPost.nextElementSibling.id == "new-post") {
        return;
    }

    // Creating form elements
    const editForm = document.createElement("form");
    const editInput = document.createElement("input");
    const editArea = document.createElement("textarea");
    const saveBtn = document.createElement("button");
    
    // Adds attributes to the form
    editForm.id = "new-post"
    editInput.type = "text"
    editInput.placeholder = "Edit Title Here"
    editArea.placeholder = "Edit Body Here"
    saveBtn.type = "submit"
    saveBtn.textContent = "Save"
    
    // Adds the post's text to the input and text area
    editInput.value = document.querySelector(".title").textContent;
    editArea.textContent = document.querySelector(".post .body").textContent;
    
    // Appends the form together
    editForm.appendChild(editInput)
    editForm.appendChild(editArea)
    editForm.appendChild(saveBtn)
    mainPost.insertAdjacentElement("afterend",editForm)

    saveBtn.addEventListener("click",saveHandler)

    // Handles the save button being clicked
    async function saveHandler(event) {
        event.preventDefault();

        // Updates the database
        try {

            await fetch(`/api/posts/${postId}`,{
                method: "PUT",
                body: JSON.stringify({
                    title: editInput.value,
                    body: editArea.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch(err) {
            console.log(err);
        }
        
        // Updates the DOM
        mainPost.children[0].children[0].textContent = editInput.value;
        mainPost.children[1].textContent = editArea.value;
        editForm.remove();
    }
}


// Very simple delete handler. Deletes then sends to home
async function deleteHandler() {
    await fetch(`/api/posts/${postId}`,{
        method: "DELETE"
    })
    window.location.replace("/home");
}