async function build(){
    document.addEventListener("DOMContentLoaded", function(){
        // const container = document.createElement("div");
        // container.id = "Name";
        
        

        // const heading = document.createElement('h1');
        // heading.innerHTML = 'Github';
        // container.appendChild(heading);

        // document.body.appendChild(container);


        // fun2();
        // fun1();
        var data = getData();
        console.log(data);
        

        // Container where cards will be appended
        const container = document.getElementById('card-container');

        // Object to store dynamically generated colors for each language
        const languageColors = {};

        // Helper function to generate a random color in hex format
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Iterate through each repo and create a card for it
        data.forEach(repo => {
            // Create a card div
            const card = document.createElement('div');
            card.classList.add('card');

            // Calculate total files for progress bar percentages
            const totalFiles = Object.values(repo.languages).reduce((acc, count) => acc + count, 0);

            // Create a single stacked progress bar
            let progressBarContent = '';
            let languageSpanContent = '';
            Object.entries(repo.languages).forEach(([lang, percentage]) => {
                // Check if the language has already been assigned a color, if not, generate a new color
                if (!languageColors[lang]) {
                    languageColors[lang] = getRandomColor();
                }
                //const percentage = ((count / totalFiles) * 100).toFixed(2); // Calculate percentage
                const color = languageColors[lang]; // Use the dynamically assigned or new color

                // Progress bar segment
                progressBarContent += `
                    <div class="progress-bar-segment" 
                         style="width: ${percentage}%; background-color: ${color};"
                         title="${lang}: ${percentage}%">
                    </div>
                `;

                // List item for language color and percentage with bullet
                languageSpanContent += `
                    <li style="color: ${color};">
                        <span class="language-name">${lang}</span>
                        <span class="language-percentage">: ${percentage}%</span>
                    </li>
                `;
            });

            const visibility = repo.is_private_repo ? "Private": "Public";
            
            // Determine the border color based on visibility
            if (visibility === "Public") {
                borderColor = "green";
                linkContent = `<a href="${repo.repo_url}" target="_blank">View Repo</a>`;
            } else {
                borderColor = "red";
                linkContent = `<a href="https://example.com/custom-link" target="_blank">View Custom Page</a>`;
            }

            // Create card content
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
                <p><strong>Visibility:</strong> ${repo.is_private_repo ? "Private": "Public"} <p>
                <p><strong>Languages:</strong></p>
                <div class="progress-bar-container">
                    ${progressBarContent}
                </div>
                <ul class="language-list-container">
                    ${languageSpanContent}
                </ul>
                ${linkContent}
            `;

            // Append card to the container
            container.appendChild(card);
        });
        
    });
}


function fun1(){
    console.log('fun1');
}

async function fun2(){
    console.log("fun2 start");
     setTimeout(() => {
        console.log("Task 1 is done");
      }, 5000); 
      console.log("fun2 end");
}


function displayGithubData(data){
    data.forEach(element => {
        buildCard(element);
    });
}


function buildCard(repo){
    console.log(repo);
}


function getData(){
     
        const data = [
            {
              'username': 'ravilladhaneesh',
              'repo_url': 'https://github.com/ravilladhaneesh/ehr/tree/main',
              'languages': {
                'py': 40,
                'HTML': 45,
                'css': 15
              }  ,
              'branch': 'main',
              'is_private_repo': false,
              'repo_name': 'ehr'
            },
            {
                'username': 'ravilladhaneesh',
                'repo_url': 'https://github.com/ravilladhaneesh/OIBSIP/tree/main',
                'languages': {
                  'py': 50,
                  'java': 20.5,
                  'ipynb': 29.5
                }  ,
                'branch': 'main',
                'is_private_repo': false,
                'repo_name': 'OIBSIP'
              },
              {
                'username': 'ravilladhaneesh',
                'repo_url': 'https://github.com/ravilladhaneesh/workflow-test/tree/feature1',
                'languages': {
                  'py': 50.6,
                  'ipynb': 49.4
                }  ,
                'branch': 'feature1',
                'is_private_repo': false,
                'repo_name': 'workflow-test'
              },
              {
                'username': 'ravilladhaneesh',
                'repo_url': 'https://github.com/ravilladhaneesh/AI-ML',
                'languages': {
                  'ipynb': 100
                },
                'branch': 'main',
                'is_private_repo': false,
                'repo_name': 'AI-ML'
              },
              {
                'username': 'ravilladhaneesh',
                'repo_url': 'https://github.com/ravilladhaneesh/4thProject',
                'languages': {
                  'python' : 100,
                },
                'branch': 'main',
                'is_private_repo': true,
                'repo_name': '4thProject'
              }
        ];
    return data;
}


