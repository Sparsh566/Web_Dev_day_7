const userContainer = document.getElementById('userContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const loadBtn = document.getElementById('loadBtn');
const reloadBtn = document.getElementById('reloadBtn');

// Function to fetch users from API
async function fetchUsers() {
    // Clear previous content
    userContainer.innerHTML = '';
    errorMessage.style.display = 'none';
    loadingSpinner.style.display = 'block';
    loadBtn.disabled = true;
    reloadBtn.style.display = 'none';

    try {
        // Fetch data from API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON data
        const users = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        // Display users
        displayUsers(users);

        // Show reload button
        loadBtn.style.display = 'none';
        reloadBtn.style.display = 'block';

    } catch (error) {
        // Handle errors
        loadingSpinner.style.display = 'none';
        showError(error);
        loadBtn.disabled = false;
    }
}

// Function to display users on the page
function displayUsers(users) {
    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.style.animationDelay = `${index * 0.1}s`;

        // Get initials for avatar
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);

        userCard.innerHTML = `
            <div class="user-header">
                <div class="user-avatar">${initials}</div>
                <div>
                    <div class="user-name">${user.name}</div>
                    <div class="user-username">@${user.username}</div>
                </div>
            </div>
            <div class="user-info">
                <div class="info-item">
                    <span class="info-icon">📧</span>
                    <div class="info-text">
                        <div class="info-label">Email</div>
                        <a href="mailto:${user.email}" style="color: #667eea; text-decoration: none;">${user.email}</a>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📱</span>
                    <div class="info-text">
                        <div class="info-label">Phone</div>
                        ${user.phone}
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">🏢</span>
                    <div class="info-text">
                        <div class="info-label">Company</div>
                        ${user.company.name}
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📍</span>
                    <div class="info-text">
                        <div class="info-label">Address</div>
                        ${user.address.street}, ${user.address.suite}<br>
                        ${user.address.city}, ${user.address.zipcode}
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">🌐</span>
                    <div class="info-text">
                        <div class="info-label">Website</div>
                        <a href="http://${user.website}" target="_blank" style="color: #667eea; text-decoration: none;">${user.website}</a>
                    </div>
                </div>
            </div>
        `;

        userContainer.appendChild(userCard);
    });
}

// Function to show error message
function showError(error) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = `
        <h3>⚠️ Error Loading Data</h3>
        <p><strong>Error:</strong> ${error.message}</p>
        <p>Please check your internet connection and try again.</p>
    `;
    reloadBtn.style.display = 'block';
    loadBtn.style.display = 'none';
}

// Function to reload users
function reloadUsers() {
    reloadBtn.disabled = true;
    fetchUsers().then(() => {
        reloadBtn.disabled = false;
    });
}
