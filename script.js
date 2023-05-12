const form = document.querySelector('form');
const userTypeSelect = document.getElementById('userType');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = userTypeSelect.value;
  if (email === '' || password === '') {
    alert('Please enter your email and password.');
    return;
  }

  switch (userType) {
    case 'customer':
      window.location.href = 'https://example.com/customer/dashboard';
      break;
    case 'vendor':
      window.location.href = 'https://example.com/vendor/dashboard';
      break;
    case 'shipper':
      window.location.href = 'https://example.com/shipper/dashboard';
      break;
    default:
      alert('Please select a valid user type.');
      break;
  }
});
