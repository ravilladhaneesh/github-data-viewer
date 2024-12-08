# github-viewer

github-viewer is one of the 3 github-repo-viewer project that displays the github user's repo data hosted in Amazon AWS.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [installation](#installation)


## Prerequisites
    1. Python
    2. Git

## installation
Steps to run application in local:

    1. Clone the repository using the below command in git bash(or command prompt).
        `git clone https://github.com/ravilladhaneesh/github-viewer.git`
    2. Move to the cloned repository directory
    3. Run the below command in git bash to install required python dependencies.
        `pip install -r requirements.txt`
    4. Navigate to the index.html in src/static using the below command.
        `cd src/static/`
    5. Run the below command to start application in local.
        `python -m http.server 8080`
    6. Open a new tab in the browser and give `http://localhost:8080`
