const jsonData = [
    {
        "title": "The POLUS Report (2024)",
        "director": "Sneha, Rishab Mitra",
        "dp": "Sneha, Rishab Mitra",
        "starring": "Wil Cooks",
        "description": "A series of terrorist attacks, killing thousands of people, has devastated the United States of America. The President, in his bunker, hosts a fireside chat to address the nation, but a secret group starts to interfere.",
        "url": "https://films.buzzstudios.org/polusreport",
        "access-contact": true,
        "poster": "posters/polus.png"
    },
    {
        "title": "A Night to Remember (2024)",
        "director": "Joshua Ancrademption",
        "dp": "Sneha",
        "starring": "Joseph Cox, Tommy Bolanos, Harris Hewitt, Casey Iwanski",
        "description": "A character piece depicting the consequences of constantly seeking meaning in life.",
        "url": "https://films.buzzstudios.org/anighttoremember",
        "access-contact": false,
        "poster": "posters/antr.png"
    },
    {
        "title": "Murder is a Party Pooper (2024)",
        "director": "Sneha",
        "dp": "Rishab Mitra",
        "starring": "Riya Ramaswamy, Nathan VanAtta, Lee Reneau",
        "description": "A timid university student is pushed to help solve a murder at a lively frat party by his eccentric ex-girlfriend.",
        "url": "https://films.buzzstudios.org/miapp",
        "access-contact": true,
        "poster": "posters/MIAPP.jpg"
    },
    {
        "title": "For The Man Who Has One More Thing (2023)",
        "director": "Joey Manasso",
        "dp": "Sneha",
        "starring": "Peter Dawson, Damon Rawlings, Tray Milton, Laura Doman",
        "description": "In an homage to the classic television detective series Columbo, a detective arrives on the scene.",
        "url": "https://films.buzzstudios.org/ftmwhomt",
        "access-contact": false,
        "poster": "posters/ftmwhomt.png"
    },
    {
        "title": "The Blame (2023)",
        "director": "Sneha (directed virtually)",
        "dp": "Buzz Studios",
        "starring": "Antonio Suarez, Juan de Jesus",
        "description": "Theo is confronted by a most unsettling doppelganger.",
        "url": "https://films.buzzstudios.org/theblame",
        "access-contact": false,
        "poster": "posters/blame.png"
    },
    {
        "title": "Nature is My Name (2023)",
        "director": "Sneha",
        "dp": "Sneha",
        "starring": "Ryan Holcomb, Matt Webb",
        "description": "A viewer of a PSA unknowingly becomes exposed to a dangerous flower.",
        "url": "https://films.buzzstudios.org/natureismyname",
        "access-contact": false,
        "poster": "posters/NIMN.jpg"
    },
    {
        "title": "E Pluribus Unum (2022)",
        "director": "Gabriel Jones",
        "dp": "Sneha",
        "starring": "Ryan Holcomb, Brayden Hargett, Matt Webb, Ginger Cressman",
        "description": "Daniel reflects back on his life as he remembers grief and greed.",
        "url": "https://films.buzzstudios.org/epu",
        "access-contact": false,
        "poster": "posters/epu.jpg"
    },
    {
        "title": "On Demand! (2022)",
        "director": "Sneha",
        "dp": "Tish Bhatnagar",
        "starring": "Landon Radics",
        "description": "A young boy experiences life through TV channels.",
        "url": "https://films.buzzstudios.org/ondemand",
        "access-contact": false,
        "poster": "posters/ondemand.jpg"
    }
];

function displayJsonData() {
    const container = document.getElementById("films-list");

    const htmlContent = `
        <div class="film-container">
            ${jsonData.map((film, index) => `
                <div class="list-of-films">
                    ${index % 2 === 0
            ? `
                        <div class="film-info-list">
                            <a href="${film.url}" target="_blank">
                                <p class="film-title"><strong>${film.title}</strong></p>
                            </a>
                            <div class="film-body">
                                <p><strong>Directed by</strong> ${film.director}</p>
                                <p><strong>Cinematography by</strong> ${film.dp}</p>
                                <p><strong>Starring</strong> ${film.starring}</p>
                                <p>${film.description}</p>
                                <p>${film["access-contact"] ? "*Contact for Access" : "*Available to the public"}</p>
                            </div>
                        </div>
                        <img src="${film.poster}" class="poster-image" alt="${film.title}">
                    `
            : `
                        <img src="${film.poster}" class="poster-image" alt="${film.title}">
                        <div class="film-info-list">
                            <a href="${film.url}" target="_blank">
                                <p class="film-title"><strong>${film.title}</strong></p>
                            </a>
                            <div class="film-body">
                                <p><strong>Directed by</strong> ${film.director}</p>
                                <p><strong>Cinematography by</strong> ${film.dp}</p>
                                <p><strong>Starring</strong> ${film.starring}</p>
                                <p>${film.description}</p>
                                <p>${film["access-contact"] ? "*Contact for Access" : "*Available to the public"}</p>
                            </div>
                        </div>
                    `}
                </div>
            `).join("")}
        </div>
    `;

    container.innerHTML = htmlContent;
}

// run renderer
displayJsonData();


// -------------------------
// TOGGLE & EDITING DATA
// -------------------------

// -------------------------
// TOGGLE & EDITING DATA
// -------------------------

document.addEventListener("DOMContentLoaded", () => {
    // TOGGLE BUTTONS
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const section = button.closest(".portfolio-section");
            const isCollapsed = section.classList.contains("collapsed");

            section.classList.toggle("collapsed", !isCollapsed);
            section.classList.toggle("expanded", isCollapsed);

            button.textContent = isCollapsed
                ? "Show Less ↑"
                : "See More ↓";
        });
    });

    window.addEventListener("load", () => {
        const leftPanel = document.querySelector(".left-panel");

        // wait for fade-in to finish
        setTimeout(() => {
            leftPanel.classList.add("pinned");
        }, 1500);
    });

    // EDITING DATA
    let editingData = [];

    fetch("./editingData.json")
        .then(res => res.json())
        .then(data => {
            // normalize featured property
            editingData = data.map(post => ({
                ...post,
                featured: post.featured === true
            }));

            displayEditingData();
        });

    function parsePost(post) {
        const parts = post.title.split(' on : "');

        let account = parts[0];

        const accountNames = {
            "hershy karthikeyan": "Hershy Karthikeyan",
            "RUHVEDA": "RUHVEDA",
            "Navneet Kaur": "Navneet Kaur (RUHVEDA CEO)"
        };

        account = accountNames[account] || account;

        let caption = parts[1]
            ? parts[1].replace(/"$/, "")
            : post.title;

        // remove line breaks
        caption = caption.replace(/\n/g, " ");

        // remove hashtags
        caption = caption.replace(/#\S+/g, "");

        // collapse extra spaces
        caption = caption.replace(/\s+/g, " ").trim();

        // shorten long captions
        if (caption.length > 120) {
            caption = caption.slice(0, 120) + "...";
        }

        return {
            account: `Edited for ${account}`,
            caption
        };
    }

    function displayEditingData() {
        const featuredContainer = document.getElementById("editing-featured");
        const container = document.getElementById("editing-list");

        if (!container || !featuredContainer) return;

        const featured = editingData.filter(post => post.featured);
        const regular = editingData.filter(post => !post.featured);

        const grouped = {};

        regular.forEach(post => {
            const account = parsePost(post).account;

            if (!grouped[account]) {
                grouped[account] = [];
            }

            grouped[account].push(post);
        });

        // FEATURED POSTS
        featuredContainer.innerHTML = `
    <div class="account-section">

        <div class="account-heading">
            Featured Work
        </div>

        <div class="featured-grid">
            ${featured.map(post => {
            const parsed = parsePost(post);

            return `
                    <div class="featured-wrapper">

    <a href="${post.url}" target="_blank" class="edit-card">
        <img src="${post.thumbnail}" alt="${post.title}">
        <div class="meta">
            <div class="edit-snippet">
                ${parsed.caption}
            </div>
        </div>
    </a>

    ${post.featuredNote ? `
        <div class="featured-note">
            ${post.featuredNote}
        </div>
    ` : ""}

</div>
                `;
        }).join("")}
        </div>

    </div>
`;

        // REGULAR POSTS
        container.innerHTML = Object.entries(grouped)
            .map(([account, posts]) => `
        <div class="account-section">

            <div class="account-heading">
                ${account}
            </div>

            <div class="editing-grid">
                ${posts.map(post => {
                const parsed = parsePost(post);

                return `
                        <a href="${post.url}" target="_blank" class="edit-card">
                            <img src="${post.thumbnail}" alt="${post.title}">
                            <div class="meta">

                                <div class="edit-snippet">
                                    ${parsed.caption}
                                </div>

                            </div>
                        </a>
                    `;
            }).join("")}
            </div>

        </div>
    `)
            .join("");
    }
});