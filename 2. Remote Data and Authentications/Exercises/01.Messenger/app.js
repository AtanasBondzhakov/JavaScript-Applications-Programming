function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    const messagesArea = document.querySelector('#messages');
    const authorInput = document.querySelector('input[name="author"]');
    const messageInput = document.querySelector('input[name="content"]');
    const sendBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');

    refreshBtn.addEventListener('click', handleRefreshClick);
    sendBtn.addEventListener('click', handleSendClick);

    async function handleSendClick() {
        const author = authorInput.value;
        const content = messageInput.value;

        if (!author || !content) {
            return;
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application.json' },
            body: JSON.stringify({ author, content })
        }

        try {
            await fetch(baseUrl, options);
        } catch (error) {
            document.querySelector('#main').innerHTML += error.message;
        }

        authorInput.value = '';
        messageInput.value = '';
    };

    async function handleRefreshClick() {
        messagesArea.innerHTML = '';

        const response = await fetch(baseUrl);
        const result = await response.json();

        const messages = Object.values(result).map(msg => `${msg.author}: ${msg.content}`);

        messagesArea.textContent = messages.join('\n');
    };
}

attachEvents();