async function loadCommits() {
    const usernameInput = document.querySelector('#username');
    const repoRef = document.querySelector('#repo');
    const commitsRef = document.querySelector('#commits');

    const url = `https://api.github.com/repos/${usernameInput.value}/${repoRef.value}/commits`;

    try {
        commitsRef.innerHTML = '';

        const response = await fetch(url);
        const result = await response.json();

        result.forEach(commit => {
            const liEl = document.createElement('li');
            liEl.id = 'commits';
            liEl.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            commitsRef.appendChild(liEl)
        });
    } catch (error) {
        commitsRef.innerHTML = `<li>Error: 404 (Not Found)</li>`;
    }
}