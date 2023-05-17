async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();  
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      //check if the response status
      if (response.ok) {
        console.log('success');
        alert('New user created you can now log in');
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }  
  }
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);