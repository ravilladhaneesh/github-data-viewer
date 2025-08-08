
async function getData(username) {
    try {
        const response = await fetch(`https://09p14088yf.execute-api.ap-south-1.amazonaws.com/test/getData?username=${username}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        const parsedBody = JSON.parse(jsonResponse.body);
        return parsedBody.Items || [];
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function build() {
    document.addEventListener("DOMContentLoaded", function () {
        const searchButton = document.getElementById('search-button');

        // Check for username in query string
        const urlParams = new URLSearchParams(window.location.search);
        const queryUsername = urlParams.get("username");

        if (queryUsername) {
            document.getElementById('username-input').value = queryUsername;
            fetchAndRenderRepos(queryUsername);
        }

        searchButton.addEventListener('click', function () {
            const username = document.getElementById('username-input').value.trim();
            if (!username) {
                alert("Please enter a username.");
                return;
            }
            fetchAndRenderRepos(username);
        });
    });
}

async function fetchAndRenderRepos(username) {
    const data = await getData(username);
    const container = document.getElementById('card-container');
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No repositories found for this user.</p>";
        return;
    }

    const languageColors = {};
    data.forEach(repo => {
        const card = document.createElement('a');
        card.classList.add('card');
        card.target = '_blank';
        card.style.textDecoration = 'none';
        card.style.color = 'inherit';

        const sortedLanguagesEntries = Object.entries(repo.languages).sort(([, a], [, b]) => b - a);
        const sortedLanguages = Object.fromEntries(sortedLanguagesEntries);

        let progressBarContent = '';
        let languageSpanContent = '';

        Object.entries(sortedLanguages).forEach(([lang, percentage]) => {
            if (!languageColors[lang]) {
                languageColors[lang] = getRandomColor();
            }
            const color = languageColors[lang];

            progressBarContent += `
                <div class="progress-bar-segment" 
                    style="width: ${percentage}%; background-color: ${color};"
                    title="${lang}: ${percentage}%"></div>`;

            languageSpanContent += `
                <li style="color: ${color};">
                    <span class="language-name">${lang}</span>
                    <span class="language-percentage">: ${percentage}%</span>
                </li>`;
        });

        const visibility = repo.is_private_repo ? "Private" : "Public";

        card.innerHTML = `
            <div class="card-header">
                <h3>${repo.repo_name}</h3>
                <span class="visibility-badge ${repo.is_private_repo ? 'visibility-private' : ''}">
                    ${visibility}
                </span>
            </div>

            <p class="meta-info">👤 @${repo.username}</p>
            <p class="meta-info">🌿 Branch: ${repo.branch}</p>

            <div class="progress-bar-container">
                ${progressBarContent}
            </div>

            <ul class="language-list-container">
                ${languageSpanContent}
            </ul>

            <a class="repo-link" href="${!repo.is_private_repo ? repo.repo_url : `https://github.com/${repo.username}`}" target="_blank">🔗 View Repository</a>
        `;

        container.appendChild(card);
    });
}


function toggleInstructions() {
    const content = document.getElementById('instructions');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}