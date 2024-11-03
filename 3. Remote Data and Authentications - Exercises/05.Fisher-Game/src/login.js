const baseUrl = 'http://localhost:3030/users/login';

const loginForm = document.querySelector('form#login');
loginForm.addEventListener('submit', onSubmit);

const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest');

const token = localStorage.getItem('accessToken');

const active = document.querySelectorAll('a').forEach(el => {
    el.classList.remove('active')
    document.querySelector('#login').classList.add('active');
  });

if(token) {
    guestNav.style.display = 'none';
} else {
    userNav.style.display = 'none';
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
       
        const response = await fetch(baseUrl, options);
            
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
    
        if(response.status === 204) {
            return response;
        }
    
        const data = await response.json();
    
        localStorage.setItem('userData', JSON.stringify(data));
        location.href = 'index.html';
            
        return data;
    } catch (error) {
        document.querySelector('p.notification').textContent = error.message;
        loginForm.reset();
    }

}