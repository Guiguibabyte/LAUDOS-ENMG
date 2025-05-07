document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const contentDiv = document.getElementById('content');
    const loginDiv = document.getElementById('login-form');
    const userNameSpan = document.getElementById('user-name');
    const patientDataDiv = document.getElementById('patient-data');
    const uploadSection = document.getElementById('upload-section');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loginDiv.style.display = 'none';
                contentDiv.style.display = 'block';
                userNameSpan.textContent = data.username;
                loadPatientData();
                if (data.role === 'admin') {
                    uploadSection.style.display = 'block';
                }
            } else {
                alert('Login failed');
            }
        });
    });

    function loadPatientData() {
        fetch('/api/patient-data')
            .then(response => response.json())
            .then(data => {
                patientDataDiv.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Age: ${data.age}</p>
                    <h4>Medical History</h4>
                    <ul>
                        ${data.medicalHistory.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            });
    }
});