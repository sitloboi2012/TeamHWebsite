document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the form element
    var updateForm = document.getElementById('updateForm');

    // Function to update data
    function updateData() {
        // Get the updated values from the input fields
        var role = document.getElementById('roleInput').value;
        var name = document.getElementById('nameInput').value;
        var hub = document.getElementById('hubInput').value;
        var email = document.getElementById('emailInput').value;
        var pass = document.getElementById('passInput').value;

        // Create an object with the updated values
        var data = {
            role: role,
            name: name,
            hub: hub,
            email: email,
            pass: pass
        };

        // Update the form's action attribute dynamically
        updateForm.action = '/save_data';

        // Submit the form to the server to update the data
        updateForm.submit();
    }

    // Update button click event handler
    document.getElementById('updateBtn').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Call the updateData() function to update the data on the server
        updateData();
    });

    // Edit Picture button click event handler
    document.getElementById('editPictureBtn').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Trigger the file input element click event
        document.getElementById('file').click();
    });

    // File input change event handler
    document.getElementById('file').addEventListener('change', function() {
        // Update the form's action attribute dynamically
        updateForm.action = '/update_picture';

        // Submit the form to the server to update the profile picture
        updateForm.submit();
    });

    // Retrieve the data from the server and populate the form fields
    var userData = {
        role: '<%= userData.role %>',
        name: '<%= userData.name %>',
        hub: '<%= userData.hub %>',
        email: '<%= userData.email %>',
        password: '<%= userData.password %>'
    };

    document.getElementById('roleInput').value = userData.role;
    document.getElementById('nameInput').value = userData.name;
    document.getElementById('hubInput').value = userData.hub;
    document.getElementById('emailInput').value = userData.email;
    document.getElementById('passInput').value = userData.password;
});