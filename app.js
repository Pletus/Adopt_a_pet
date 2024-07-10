const express = require('express');
const pets = require('./petList.js');

const app = express();
const port = process.env.PORT || 3000;

app.route('/').get((req, res) => {
    return res.send(`<h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
        <li><a href="/animals/dogs">Dogs</a></li>
        <li><a href="/animals/cats">Cats</a></li>
        <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>`);
});

app.route('/animals/:pet_type').get((req, res) => {
    const { pet_type } = req.params;
    
    if (!pets[pet_type]) {
        return res.send(`<h1>Sorry, we don't have those.</h1>`);
    }

    return res.send(`<h1>List of ${pet_type}</h1>
    <ul>${
        pets[pet_type]
            .map((pet, i) => {
                return `<li><a href=${`/animals/${pet_type}/${i + 1}`} >${pet.name}</a></li>`;
            })
            .join('')
    }</ul>`);
});

app.route('/animals/:pet_type/:pet_id').get((req, res) => {
    const { pet_type, pet_id } = req.params;
    
    if (!pets[pet_type]) {
        return res.send(`<h1>Sorry, we don't have those.</h1>`);
    }
    
    const findPet = pets[pet_type].find((pet, i) => +pet_id === i + 1);
    
    if (!findPet) {
        return res.send(`<h1>Pet not found</h1>`);
    }

    const { name, url, breed, description, age } = findPet;
    return res.send(`<h1>${name}</h1>
    <img src=${url} alt=${breed} />
    <p>${description}</p>
    <ul>
        <li>${breed}</li>
        <li>${age}</li>
    </ul>
    `);
});

app.listen(port, () => {
    console.log(`Adopt a pet listening on port ${port}`);
});
