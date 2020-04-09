//http://localhost:8000/api/insult?search=Macbeth

 
async function getInsults(search) {
    const url = `http://localhost:8000/api/insult?search=${search}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}


async function getAllInsults() {
    const url = 'http://localhost:8000/api/all';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function getInsult() {
    const url = 'http://localhost:8000/api/getInsult';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function displayInsults(insults) {
    const containerElem = document.querySelector('#insults');
    containerElem.innerHTML = '';

    for(insult of insults) {
        const insultElem = document.createElement('p');

        insultElem.innerHTML = insult.insult;
        containerElem.append(insultElem);
    }
}


function displayInsult(insult) {
    const containerElem = document.querySelector('#insults');
    containerElem.innerHTML = '';

    const insultElem = document.createElement('p');

    insultElem.innerHTML = insult.insult;
    containerElem.append(insultElem);
}


document.querySelector('#search').addEventListener('click', async () => {
    const searchTerm = document.querySelector('#play').value;

    const insults = await getInsults(searchTerm);
    displayInsults(insults);
});

/*document.querySelector('#getAll').addEventListener('click', async () => {
    const insults = await getAllInsults();
    displayInsults(insults);
}); */

document.querySelector('#getInsult').addEventListener('click', async () => {
    const insult = await getInsult();
    displayInsult(insult);
});