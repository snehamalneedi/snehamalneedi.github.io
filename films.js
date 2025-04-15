const jsonData = [
    {
        "title": "The POLUS Report (2024)",
        "director": "Sneha, Rishab Mitra",
        "dp": "Sneha, Rishab Mitra",
        "starring": "Wil Cooks",
        "description": "A series of terrorist attacks, killing thousands of people, has devastated the United States of America. The President, in his bunker, hosts a fireside chat to address the nation, but a secret group starts to interfere.",
        "url": 'https://films.buzzstudios.org/polusreport',
        "access-contact": true,
        "poster": "posters/polus.png"
    },
    {
        "title": "A Night to Remember (2024)",
        "director": "Joshua Ancrademption",
        "dp": "Sneha",
        "starring": "Joseph Cox, Tommy Bolanos, Harris Hewitt, Casey Iwanski",
        "description": "A character piece depicting the consequences of constantly seeking meaning in life.",
        "url": 'https://films.buzzstudios.org/anighttoremember',
        "access-contact": false,
        "poster": "posters/ANTR.png"
    },
    {
        "title": "Murder is a Party Pooper (2024)",
        "director": "Sneha",
        "dp": "Rishab Mitra, Ethan Ollins",
        "starring": "Riya Ramaswamy, Nathan VanAtta, Lee Reneau",
        "description": "A timid university student is pushed to help solve a murder at a lively frat party by his eccentric ex-girlfriend.",
        "url": 'https://films.buzzstudios.org/miapp',
        "access-contact": true,
        "poster": "posters/MIAPP.jpg"
    },
    {
        "title": "For The Man Who Has One More Thing (2023)",
        "director": "Joey Manasso",
        "dp": "Sneha",
        "starring": "Peter Dawson, Damon Rawlings, Tray Milton, Laura Doman",
        "description": "In an homage to the classic television detective series Columbo, a detective arrives on the scene to interview a suspect in the untimely death of a wealthy old entrepreneur. However, the investigation takes an unexpected turn when a woman shows up to dig up evidence for him while he is busy.",
        "url": 'https://films.buzzstudios.org/ftmwhomt',
        "access-contact": false,
        "poster": "posters/ftmwhomt.png"
    },
    {
        "title": "The Blame (2023)",
        "director": "Ethan Ollins, Sneha (directed virtually)",
        "dp": "Ethan Ollins",
        "starring": "Antonio Suarez, Juan de Jesus",
        "description": "Theo is confronted by a most unsettling doppelganger, but nothing is ever exactly the way it seems.",
        "url": 'https://films.buzzstudios.org/theblame',
        "access-contact": false,
        "poster": "posters/blame.png"
    },
    {
        "title": "Nature is My Name (2023)",
        "director": "Sneha",
        "dp": "Sneha",
        "starring": "Ethan Ollins, Ryan Holcomb, Matt Webb",
        "description": "A viewer of a well-intentioned PSA unknowingly becomes exposed to a dangerous flower.",
        "url": 'https://films.buzzstudios.org/natureismyname',
        "access-contact": false,
        "poster": "posters/NIMN.jpg"
    },
    {
        "title": "E Pluribus Unum (2022)",
        "director": "Gabriel Jones",
        "dp": "Sneha",
        "starring": "Ryan Holcomb, Brayden Hargett, Matt Webb, Ginger Cressman",
        "description": "Daniel reflects back on his life as he remembers a time of grief and sadness in his family. This grief pushed his young self to greed. When these actions are met with consequences greater than young Daniel's wildest imaginations, he wonders if the green was worth the pain.",
        "url": 'https://films.buzzstudios.org/epu',
        "access-contact": false,
        "poster": "posters/epu.jpg"
    },
    {
        "title": "On Demand! (2022)",
        "director": "Sneha",
        "dp": "Tish Bhatnagar",
        "starring": "Landon Radics",
        "description": "A young boy experiences everything the world has to offer as he flips through channels on TV.",
        "url": 'https://films.buzzstudios.org/ondemand',
        "access-contact": false,
        "poster": "posters/ondemand.jpg"
    }
]
function displayJsonData() {
    const container = document.getElementById('films-list');
    let htmlContent = `
        <div class="film-container">
            ${jsonData.map((film, index) => `
                <div class="list-of-films">
                    ${index % 2 === 0
            ? `<div class="film-info-list">
                        <a href="${film.url}" target="_blank">
                        <p class="film-title"><strong>${film.title}</strong></p>
                        </a>
                        <div class="film-body">
                            <p><strong>Directed by</strong> ${film.director}</p>
                            <p><strong>Cinematography by</strong> ${film.dp}</p>
                            <p><strong>Starring</strong> ${film.starring}</p>
                            <p>${film.description}</p>
                            <p>${film['access-contact'] ? '*Contact for Access' : '*Available to the public'}</p>
                            </div>
                        </div>
                        <img src="${film.poster}" class="poster-image" alt="${film.title} poster">`
            : `<img src="${film.poster}" class="poster-image" alt="${film.title} poster">
                        <div class="film-info-list">
                        <a href="${film.url}" target="_blank">
                        <p class="film-title"><strong>${film.title}</strong></p>
                    </a>
                    <div class="film-body">
                    <p><strong>Directed by</strong> ${film.director}</p>
                    <p><strong>Cinematography by</strong> ${film.dp}</p>
                    <p><strong>Starring</strong> ${film.starring}</p>
                    <p>${film.description}</p>
                    <p>${film['access-contact'] ? '*Contact for Access' : '*Available to the public'}</p>
                    </div>
                        </div>`
        }
                </div>
            `).join('')}
        </div>
    `;
    container.innerHTML = htmlContent;
}
// Call the function to display data
displayJsonData();
