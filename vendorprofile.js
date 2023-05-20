document.addEventListener('DOMContentLoaded', function() {
    var updateForm = document.getElementById('updateForm');

    function updateData() {
        var role = document.getElementById('roleInput').value;
        var name = document.getElementById('nameInput').value;
        var hub = document.getElementById('hubInput').value;
        var email = document.getElementById('emailInput').value;
        var pass = document.getElementById('passInput').value;
        var picture = document.getElementById('editProfileImageBtn').value;

        var data = {
            role: role,
            name: name,
            hub: hub,
            email: email,
            pass: pass,
            picture: picture
        };

        updateForm.setAttribute('action', '/save_data');
        updateForm.submit();
    }

    document.getElementById('updateBtn').addEventListener('click', function(e) {
        e.preventDefault();
        updateData();
    });

    document.getElementById('editPictureBtn').addEventListener('click', function(e) {
        e.preventDefault();
        updateData();
    });

    var userData = {
        role: 'Shipper',
        name: 'Trung',
        hub: 'Hub 1',
        email: 'trungnguyen@gmail.com',
        password: 'brightcode'
    };

    document.getElementById('roleInput').value = userData.role;
    document.getElementById('nameInput').value = userData.name;
    document.getElementById('hubInput').value = userData.hub;
    document.getElementById('emailInput').value = userData.email;
    document.getElementById('passInput').value = userData.password;
});