
function navPageLogin() {
    const form = document.querySelector('form');
    console.log(form)
    const userTypeSelect = document.getElementById('userType');
    console.log(userTypeSelect.value)

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const userType = userTypeSelect.value;

        switch (userType) {
            case 'customer':
                window.location.href = '../html/customer_page.html';
                break;
            case 'vendor':
                window.location.href = '../html/vendor_page.html';
                break;
            case 'shipper':
                window.location.href = '../html/shipper_page.html';
                console.log(userType)
                break;
            default:
                alert('Please select a valid user type.');
                break;
        }
        });
}


function signUpAlert() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = "../html/login.html";
    });
}