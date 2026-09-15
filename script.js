/* ========================================
   KIKI GAMING - MAIN JAVASCRIPT
======================================== */


/* ========================================
   SEARCH
======================================== */

function searchGames() {
    const searchInput = document
        .getElementById("gameSearch")
        .value
        .toLowerCase()
        .trim();

    const games = document.querySelectorAll(".game-card");

    games.forEach(function(game) {
        const gameName = game
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (gameName.includes(searchInput)) {
            game.style.display = "flex";
        } else {
            game.style.display = "none";
        }
    });
}


function clearSearch() {
    document.getElementById("gameSearch").value = "";

    const games = document.querySelectorAll(".game-card");

    games.forEach(function(game) {
        game.style.display = "flex";
    });
}


/* Search while typing */

const gameSearch = document.getElementById("gameSearch");

if (gameSearch) {

    gameSearch.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchGames();
        }

    });

    gameSearch.addEventListener("input", function() {
        searchGames();
    });
}


/* ========================================
   CONTACT FORM
======================================== */

function sendMessage(event) {
    event.preventDefault();

    alert(" Thanks for contacting Kiki Gaming!");

    document.querySelector("#contact form").reset();
}


/* ========================================
   BACK TO TOP
======================================== */

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* ========================================
   FAVORITES SYSTEM
======================================== */

function getFavorites() {
    return JSON.parse(
        localStorage.getItem("kikiFavorites")
    ) || [];
}


function toggleFavorite(button, gameName) {

    let favorites = getFavorites();

    if (favorites.includes(gameName)) {

        favorites = favorites.filter(function(game) {
            return game !== gameName;
        });

        button.innerHTML = "🤍 Favorite";
        button.classList.remove("favorited");

    } else {

        favorites.push(gameName);

        button.innerHTML = "❤️ Favorited";
        button.classList.add("favorited");

    }

    localStorage.setItem(
        "kikiFavorites",
        JSON.stringify(favorites)
    );

    displayFavorites();
}


/* Load saved favorites */

function loadFavorites() {

    const favorites = getFavorites();

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(function(button) {

        const onclickValue =
            button.getAttribute("onclick");

        if (!onclickValue) {
            return;
        }

        const match =
            onclickValue.match(/'([^']+)'/);

        if (!match) {
            return;
        }

        const gameName = match[1];

        if (favorites.includes(gameName)) {

            button.innerHTML = "❤️ Favorited";
            button.classList.add("favorited");

        }

    });

    displayFavorites();
}


/* Display favorite games */

function displayFavorites() {

    const favorites = getFavorites();

    const favoritesList =
        document.getElementById("favoritesList");

    const favoriteMessage =
        document.getElementById("favoriteMessage");

    if (!favoritesList || !favoriteMessage) {
        return;
    }

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {

        favoriteMessage.textContent =
            "You haven't added any games to your favorites yet.";

        return;
    }

    favoriteMessage.textContent =
        "These are your favorite games:";

    favorites.forEach(function(game) {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            "❤️ " + game;

        favoritesList.appendChild(listItem);

    });

}


/* ========================================
   THEME TOGGLE
======================================== */

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const button =
        document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    if (document.body.classList.contains("light-mode")) {

        button.textContent = "🌙 Dark Mode";

        localStorage.setItem(
            "kikiTheme",
            "light"
        );

    } else {

        button.textContent = "☀️ Light Mode";

        localStorage.setItem(
            "kikiTheme",
            "dark"
        );

    }

}


/* Load saved theme */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("kikiTheme");

    const button =
        document.getElementById("themeToggle");

    if (
        savedTheme === "light" &&
        button
    ) {

        document.body.classList.add("light-mode");

        button.textContent =
            "🌙 Dark Mode";

    }

}


/* ========================================
   PAGE STARTUP
======================================== */

window.addEventListener("DOMContentLoaded", function() {

    loadFavorites();

    loadTheme();

});