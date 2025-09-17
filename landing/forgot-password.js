document.addEventListener('DOMContentLoaded', function () {
  const forgotForm = document.getElementById('forgotForm');
  const forgotError = document.getElementById('forgotError');
  const forgotSuccess = document.getElementById('forgotSuccess');

  forgotForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    forgotError.classList.add('hidden');
    forgotSuccess.classList.add('hidden');
    const email = document.getElementById('email').value.trim();
    try {
      const res = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset link.');
      forgotSuccess.textContent = 'If this email exists, a reset link has been sent.';
      forgotSuccess.classList.remove('hidden');
    } catch (err) {
      forgotError.textContent = err.message;
      forgotError.classList.remove('hidden');
    }
  });
}); 