document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const signupError = document.getElementById('signupError');
  const signupSuccess = document.getElementById('signupSuccess');

  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    signupError.classList.add('hidden');
    signupSuccess.classList.add('hidden');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const role = document.getElementById('role').value;
    if (password.length < 8) {
      signupError.textContent = 'Password must be at least 8 characters.';
      signupError.classList.remove('hidden');
      return;
    }
    if (password !== confirmPassword) {
      signupError.textContent = 'Passwords do not match.';
      signupError.classList.remove('hidden');
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      signupSuccess.textContent = 'Registration successful! Redirecting to login...';
      signupSuccess.classList.remove('hidden');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } catch (err) {
      signupError.textContent = err.message;
      signupError.classList.remove('hidden');
    }
  });
}); 