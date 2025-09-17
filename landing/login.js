document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const loginSuccess = document.getElementById('loginSuccess');

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    loginError.classList.add('hidden');
    loginSuccess.classList.add('hidden');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      if (data.user.role !== role) throw new Error('Role mismatch.');
      loginSuccess.textContent = 'Login successful! Redirecting...';
      loginSuccess.classList.remove('hidden');
      if (role === 'admin') {
        setTimeout(() => { window.location.href = '/admin'; }, 1200);
      } else {
        setTimeout(() => {
          loginSuccess.textContent = 'Doctors should use the mobile app for full features.';
        }, 1200);
      }
    } catch (err) {
      loginError.textContent = err.message;
      loginError.classList.remove('hidden');
    }
  });
}); 