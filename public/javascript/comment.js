async function newFormHandler(event) {
    event.preventDefault();

    const body = document.querySelector('textarea[name ="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // console.log(comment_text, post_id)

    if (body) {

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.comment-form').addEventListener('submit', newFormHandler);