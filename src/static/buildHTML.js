async function build() {
    document.addEventListener("DOMContentLoaded", async function () {
        // Fetch users and populate the dropdown
        await fetchUsers();

        const fetchReposButton = document.getElementById('fetch-repos-button');
        fetchReposButton.addEventListener('click', async function () {
            // Get the selected username
            const userSelect = document.getElementById('user-select');
            const username = userSelect.value;

            if (!username) {
                alert("Please select a user.");
                return;
            }

            // Fetch and display repositories
            const data = await getData(username);
            if (data.length === 0) {
                alert("No repositories found or an error occurred while fetching repositories.");
                return;
            }

            // Clear the container and display the new data
            const container = document.getElementById('card-container');
            container.innerHTML = "";

            const languageColors = {};

            function getRandomColor() {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            data.forEach(repo => {
                console.log(repo);
                const card = document.createElement('div');
                card.classList.add('card');

                const totalFiles = Object.values(repo.languages).reduce((acc, count) => acc + count, 0);

                let progressBarContent = '';
                let languageSpanContent = '';
                Object.entries(repo.languages).forEach(([lang, percentage]) => {
                    if (!languageColors[lang]) {
                        languageColors[lang] = getRandomColor();
                    }
                    const color = languageColors[lang];

                    progressBarContent += `
                        <div class="progress-bar-segment" 
                             style="width: ${percentage}%; background-color: ${color};"
                             title="${lang}: ${percentage}%">
                        </div>
                    `;

                    languageSpanContent += `
                        <li style="color: ${color};">
                            <span class="language-name">${lang}</span>
                            <span class="language-percentage">: ${percentage}%</span>
                        </li>
                    `;
                });

                const visibility = repo.is_private_repo ? "Private" : "Public";
                const borderColor = visibility === "Public" ? "green" : "red";
                const linkContent = visibility === "Public" 
                    ? `<a href="${repo.repo_url}" target="_blank">View Repo</a>` 
                    : `<a href="https://example.com/custom-link" target="_blank">View Custom Page</a>`;

                card.innerHTML = `
                    <div class="card-header">
                        <div class='card-repo-name'>
                            <h3>${repo.repo_name}</h3>
                        </div>
                        <div class="card-repo-visibility">
                            <p style="border: 1.5px solid ${borderColor}; border-radius: 10px; padding: 5px;">
                                ${visibility}
                            </p>
                        </div>
                    </div>
                    <p><strong>Username:</strong> ${repo.username}</p>
                    <p><strong>Branch:</strong> ${repo.branch}</p>
                    <p><strong>Visibility:</strong> ${repo.is_private_repo ? "Private" : "Public"} </p>
                    <p><strong>Languages:</strong></p>
                    <div class="progress-bar-container">
                        ${progressBarContent}
                    </div>
                    <ul class="language-list-container">
                        ${languageSpanContent}
                    </ul>
                    ${linkContent}
                `;

                container.appendChild(card);
            });
        });
    });
}


async function fetchUsers() {
    try {
        const response = await fetch('https://z6p48awdd7.execute-api.ap-south-1.amazonaws.com/dev/getUsers');
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const jsonResponse = await response.json();

        // Parse the nested body field, which is a JSON string
        const parsedBody = JSON.parse(jsonResponse.body);

        // Extract the users array
        const users = parsedBody.users;

        // Populate the dropdown with the fetched users
        const userSelect = document.getElementById('user-select');
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user;
            option.textContent = user;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}



async function getData(username) {
    try {
        const response = await fetch(`https://z6p48awdd7.execute-api.ap-south-1.amazonaws.com/dev/getData?username=${username}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonResponse = await response.json();

        // Parse the nested body field, which is a JSON string
        const parsedBody = JSON.parse(jsonResponse.body);

        // Extract the Items array
        const items = parsedBody.Items;

        return items; // Return the array of repositories
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; // Return an empty array on error
    }
}

