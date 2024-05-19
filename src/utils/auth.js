// src/utils/auth.js
export async function handleLogin(email, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      // Guardar el token en el localStorage o en una cookie
      localStorage.setItem('authToken', data.token);
    } else {
      alert('Login failed');
    }
  }
  
  export async function handleRegister(name, email, password) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (response.ok) {
      alert('User registered successfully');
    } else {
      alert('Registration failed');
    }
  }
  