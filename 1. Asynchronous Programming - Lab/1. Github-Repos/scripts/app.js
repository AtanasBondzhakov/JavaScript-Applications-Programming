async function loadRepos() {
	const usernameInput = document.querySelector('#username');
	const reposList = document.querySelector('#repos');

	const url = `https://api.github.com/users/${usernameInput.value}/repos`;

	try {
		const response = await fetch(url);
		const result = await response.json();

		reposList.innerHTML = '';

		result.forEach(repo => {
			const liEl = document.createElement('li');
			const aEl = document.createElement('a');
			aEl.href = repo.html_url;
			aEl.textContent = repo.full_name;

			liEl.appendChild(aEl);
			reposList.appendChild(liEl);
		});

		usernameInput.value = '';
	} catch (error) {
		reposList.textContent = 'Invalid username';
	}

}