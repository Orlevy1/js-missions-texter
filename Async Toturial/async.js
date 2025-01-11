//rewrite using async/await
async function loadJson(url) {
    let response = await fetch(url);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error(response.status);
    }
}


//Rewrite "rethrow" 
class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJsonWithError(url) {
    let response = await fetch(url);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new HttpError(response);
    }
}


async function demoGithubUser() {
    while (true) {
        let name = prompt("Enter a name?", "iliakan");

        try {
            let user = await loadJsonWithError(`https://api.github.com/users/${name}`);
            alert(`Full name: ${user.name}.`);
            return user;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                alert("No such user, please reenter.");
            } else {
                throw err;
            }
        }
    }
}


// Call async from non-async
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f() {
    wait().then(result => console.log(result));
}

// Delay with a promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//nimated circle 
function showCircle(cx, cy, radius) {
    return new Promise(resolve => {
        let circle = document.createElement('div');
        circle.style.width = 0;
        circle.style.height = 0;
        circle.style.left = cx + 'px';
        circle.style.top = cy + 'px';
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = 'red';
        circle.style.transition = 'width 0.5s, height 0.5s, margin-left 0.5s, margin-top 0.5s';

        document.body.append(circle);

        setTimeout(() => {
            circle.style.width = radius * 2 + 'px';
            circle.style.height = radius * 2 + 'px';
            circle.style.marginLeft = -radius + 'px';
            circle.style.marginTop = -radius + 'px';
        }, 0);

        circle.addEventListener('transitionend', function handler() {
            circle.removeEventListener('transitionend', handler);
            resolve(circle);
        });
    });
}

showCircle(150, 150, 100).then(div => {
    div.classList.add('message-ball');
    div.append("Hello, world!");
});