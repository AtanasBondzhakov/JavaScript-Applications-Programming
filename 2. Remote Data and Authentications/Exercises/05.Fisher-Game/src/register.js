const baseUrl = 'http://localhost:3030/users/register';

const registerForm = document.querySelector('form#register');

registerForm.addEventListener('submit', onSubmit);

const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest');

const token = localStorage.getItem('accessToken');

const active = document.querySelectorAll('a').forEach(el => {
  el.classList.remove('active')
  document.querySelector('#register').classList.add('active');
});

const userData = JSON.parse(sessionStorage.getItem('dataUser'));

if (token) {
  guestNav.style.display = 'none';
} else {
  userNav.style.display = 'none';
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const { email, password, rePass } = Object.fromEntries(formData);
  try {
    if (!email || !password || !rePass) {
      throw new Error('All fields are required');
    }

    if (password !== rePass) {
      throw new Error('Passwords do not match');
    }


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    };


    const response = await fetch(baseUrl, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status === 204) {
      return response;
    }

    const data = await response.json();
    localStorage.setItem('userData', js);
    location.href = 'index.html';

    return data;
  } catch (error) {
    document.querySelector('p.notification').textContent = error.message;
    registerForm.reset();
  }
}

// async function onRegister(email, password) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   };

//   try {
//     const response = await fetch(baseUrl, options);
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message);
//     }

//     if (response.status === 204) {
//       return response;
//     }

//     const data = await response.json();
//     localStorage.setItem('userData', js);
//     location.href = 'index.html';

//     return data;
//   } catch (error) {
//     document.querySelector('p.notification').textContent = error.message;
//     registerForm.reset();
//   }

// } 