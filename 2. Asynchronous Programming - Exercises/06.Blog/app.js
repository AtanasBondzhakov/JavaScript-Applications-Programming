function attachEvents() {
    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const postsRef = document.querySelector('#posts');
    const postTitleRef = document.querySelector('#post-title');
    const postBodyRef = document.querySelector('#post-body');
    const commentsRef = document.querySelector('#post-comments');

    const loadPostsBtn = document.querySelector('#btnLoadPosts');
    loadPostsBtn.addEventListener('click', loadPostsHandler);

    const viewPostsBtn = document.querySelector('#btnViewPost');
    viewPostsBtn.addEventListener('click', viewPostHandler);

    let posts;

    async function loadPostsHandler() {
        postsRef.innerHTML = '';

        const response = await fetch(postsUrl);
        const result = await response.json();

        posts = result;

        Object.entries(result).forEach(([id, info]) => {

            const optionEl = document.createElement('option');
            optionEl.value = id;
            optionEl.textContent = info.title;

            postsRef.appendChild(optionEl);
        })
    };

    async function viewPostHandler() {
        commentsRef.innerHTML = '';
        const id = document.querySelector('#posts').value;

        const responseAllComments = await fetch(commentsUrl);
        const resultAllComments = await responseAllComments.json();

        const targetComments = Object.values(resultAllComments).filter(comment => comment.postId === id);

        const targetPost = Object.entries(posts).find(x => x[0] === id);

        postTitleRef.textContent = targetPost[1].title;
        postBodyRef.textContent = targetPost[1].body;

        targetComments.forEach(comment => {
            const liEl = document.createElement('li');
            liEl.id = comment.id;
            liEl.textContent = comment.text;
            commentsRef.appendChild(liEl);
        })
    }
}

attachEvents();