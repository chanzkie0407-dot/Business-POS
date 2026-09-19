import { ROLES, DEFAULTS, IDLE_TIMEOUT } from '../shared/auth-config.js';

const loginForm = document.getElementById('login-form');
const roleSelect = document.getElementById('role');
const passInput = document.getElementById('password');

passInput.value = '';
passInput.autocomplete = 'off';

loginForm.addEventListener('submit', handleLogin);

function handleLogin(e) {
  e.preventDefault();
  const role = roleSelect.value;
  const password = passInput.value.trim();

  if (!password) {
    alert('Please enter your password');
    return;
  }

  let user = null;
  const storedCashiers = JSON.parse(localStorage.getItem('cashiers') || '[]');

  switch (role) {
    case ROLES.ADMIN:
      if (password === DEFAULTS.adminPassword) {
        user = { role: ROLES.ADMIN, name: 'Admin', storeAccess: 'all' };
      }
      break;
    case ROLES.SERVICE_PROVIDER:
      if (password === DEFAULTS.spPassword) {
        user = { role: ROLES.SERVICE_PROVIDER, name: 'Service Provider' };
      }
      break;
    case ROLES.CASHIER:
      const found = storedCashiers.find(c => c.password === password);
      if (found) {
        user = {
          role: ROLES.CASHIER,
          id: found.id,
          name: `${found.name} ${found.lastName || ''}`.trim(),
          storeId: found.storeId
        };
      }
      break;
  }

  if (!user) {
    alert('Incorrect password — try again');
    passInput.value = '';
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  startIdleTimer();

  switch (user.role) {
    case ROLES.CASHIER:
      window.location.href = '../pages/cashier/dashboard.html';
      break;
    case ROLES.ADMIN:
      window.location.href = '../pages/admin/dashboard.html';
      break;
    case ROLES.SERVICE_PROVIDER:
      window.location.href = '../pages/sp/dashboard.html';
      break;
  }
}

function startIdleTimer() {
  let timer;
  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(logout, IDLE_TIMEOUT);
  }
  ['mousemove', 'keypress', 'click'].forEach(evt => {
    document.addEventListener(evt, resetTimer);
  });
  resetTimer();
}

export function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
