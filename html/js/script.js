import { Pokemon } from "../data/class_pokemon.js";
import { Attack }  from "../data/class_attack.js";
import { Type }    from "../data/class_type.js";

// Nombre de pokémons affichés par page
const PAR_PAGE = 25;

// État global de la page
let listeFiltree  = [...Pokemon.all_pokemons];
let pageCourante  = 1;
let colonneTriee  = null;
let sensTriee     = "asc";

// Retourne le chemin de l'image d'un pokémon selon son id
// padStart(3, "0") transforme 1 en "001", 12 en "012", 123 en "123"
function cheminImage(id) {
    const numero = String(id).padStart(3, "0");
    return `webp/images/${numero}.webp`;
}

// Enlève les accents et met en minuscules (pour la recherche par nom)
function simplifier(texte) {
    return texte.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Remplit le menu déroulant des types
function remplirFiltreTypes() {
    const typesExistants = new Set();
    for (const pokemon of Pokemon.all_pokemons) {
        for (const type of pokemon.types) {
            typesExistants.add(type.nom);
        }
    }

    const select = document.querySelector("#filtre-type");
    for (const nom of [...typesExistants].sort()) {
        const option = document.createElement("option");
        option.value = nom;
        option.textContent = nom;
        select.appendChild(option);
    }
}

// Remplit le menu déroulant des attaques rapides
function remplirFiltreAttaques() {
    const attaquesExistantes = new Set();
    for (const pokemon of Pokemon.all_pokemons) {
        for (const attaque of pokemon.attaquesRapides) {
            attaquesExistantes.add(attaque.nom);
        }
    }

    const select = document.querySelector("#filtre-attaque");
    for (const nom of [...attaquesExistantes].sort()) {
        const option = document.createElement("option");
        option.value = nom;
        option.textContent = nom;
        select.appendChild(option);
    }
}

// Filtre la liste selon les valeurs des menus et de la barre de recherche
function appliquerFiltres() {
    const typeChoisi     = document.querySelector("#filtre-type").value;
    const attaqueChoisie = document.querySelector("#filtre-attaque").value;
    const nomRecherche   = simplifier(document.querySelector("#filtre-nom").value.trim());
    
    listeFiltree = Pokemon.all_pokemons.filter(pokemon => {
        if (typeChoisi     && !pokemon.types.some(t => t.nom === typeChoisi))          return false;
        if (attaqueChoisie && !pokemon.attaquesRapides.some(a => a.nom === attaqueChoisie)) return false;
        if (nomRecherche   && !simplifier(pokemon.nom).includes(nomRecherche))         return false;
        return true;
    });

    pageCourante = 1;
    if (colonneTriee) trierSansInverser();
    afficherPage();
}

// Trie la liste quand on clique sur un en-tête de colonne
function trierColonne(colonne) {
    if (colonneTriee === colonne) {
        sensTriee = sensTriee === "asc" ? "desc" : "asc";
    } else {
        colonneTriee = colonne;
        sensTriee = "asc";
    }
    trierSansInverser();
    mettreAJourFlechesTri();
}

// Trie sans changer le sens (utilisé après un filtre)
function trierSansInverser() {
    listeFiltree.sort((a, b) => {
        let valeurA, valeurB;

        if (colonneTriee === "types") {
            valeurA = [...a.types].map(t => t.nom).sort()[0] ?? "";
            valeurB = [...b.types].map(t => t.nom).sort()[0] ?? "";
        } else {
            valeurA = a[colonneTriee];
            valeurB = b[colonneTriee];
        }

        let comparaison;
        if (typeof valeurA === "number" && typeof valeurB === "number") {
            comparaison = valeurA - valeurB;
        } else {
            comparaison = String(valeurA).localeCompare(String(valeurB));
        }

        if (comparaison === 0) comparaison = a.nom.localeCompare(b.nom);
        return sensTriee === "asc" ? comparaison : -comparaison;
    });
}

// Met à jour les flèches ↑ ↓ dans les en-têtes du tableau
function mettreAJourFlechesTri() {
    document.querySelectorAll("#tableau-pokemons th").forEach(th => {
        th.classList.remove("tri-actif");
        th.removeAttribute("data-dir");
        if (th.dataset.col === colonneTriee) {
            th.classList.add("tri-actif");
            th.setAttribute("data-dir", sensTriee === "asc" ? "↑" : "↓");
        }
    });
}

// Affiche les pokémons de la page courante dans le tableau
function afficherPage() {
    const total              = listeFiltree.length;
    const nbPages            = Math.max(1, Math.ceil(total / PAR_PAGE));
    const debut              = (pageCourante - 1) * PAR_PAGE;
    const pokemon_de_la_page = listeFiltree.slice(debut, debut + PAR_PAGE);

    const tbody = document.querySelector("#tbody-pokemons");
    tbody.innerHTML = "";

    for (const pokemon of pokemon_de_la_page) {
        const badgesTypes = pokemon.types
            .map(t => `<span class="badge-type type-${t.nom}">${t.nom}</span>`)
            .join("");

        const ligne = document.createElement("tr");
        ligne.dataset.pokemonId = pokemon.id;
        ligne.innerHTML = `
            <td>${pokemon.id}</td>
            <td>${pokemon.nom}</td>
            <td>${pokemon.generation ?? "?"}</td>
            <td>${badgesTypes}</td>
            <td>${pokemon.stamina}</td>
            <td>${pokemon.baseAttaque}</td>
            <td>${pokemon.baseDefense}</td>
            <td>
                <img class="miniature"
                     src="${cheminImage(pokemon.id)}"
                     alt="${pokemon.nom}"
                     data-pokemon-id="${pokemon.id}">
            </td>
        `;
        tbody.appendChild(ligne);
    }

    document.querySelector("#info-page").textContent = `Page ${pageCourante} / ${nbPages}`;
    document.querySelector("#btn-prec").disabled = pageCourante <= 1;
    document.querySelector("#btn-suiv").disabled = pageCourante >= nbPages;
}

// Ouvre la popup de détail d'un pokémon
function afficherDetail(pokemonId) {
    const pokemon = Pokemon.all_pokemons.find(p => p.id === pokemonId);
    if (!pokemon) return;

    const badgesTypes = pokemon.types
        .map(t => `<span class="badge-type type-${t.nom}">${t.nom}</span>`)
        .join(" ");

    const attaquesRapidesHTML = pokemon.attaquesRapides
        .map(a => `<span class="attaque-chip">${a.nom} <small>(${a.type})</small></span>`)
        .join("");

    const attaquesChargeesHTML = pokemon.attaquesChargees
        .map(a => `<span class="attaque-chip">${a.nom} <small>(${a.type})</small></span>`)
        .join("");

    document.querySelector("#contenu-detail").innerHTML = `
        <div class="detail-image">
            <img src="${cheminImage(pokemon.id)}"
                 alt="${pokemon.nom}"
                 class="miniature"
                 data-pokemon-id="${pokemon.id}"
                 style="height:96px; cursor:zoom-in">
        </div>
        <h2>${pokemon.nom} — #${pokemon.id}</h2>
        <div class="detail-section">
            <h3>Statistiques</h3>
            <div class="detail-stats">
                <div class="stat-item">
                    <span class="stat-val">${pokemon.stamina}</span>
                    <span class="stat-lbl">STA</span>
                </div>
                <div class="stat-item">
                    <span class="stat-val">${pokemon.baseAttaque}</span>
                    <span class="stat-lbl">ATK</span>
                </div>
                <div class="stat-item">
                    <span class="stat-val">${pokemon.baseDefense}</span>
                    <span class="stat-lbl">DEF</span>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h3>Types</h3>
            <p>${badgesTypes}</p>
        </div>
        <div class="detail-section">
            <h3>Attaques rapides</h3>
            <p>${attaquesRapidesHTML || "—"}</p>
        </div>
        <div class="detail-section">
            <h3>Attaques chargées</h3>
            <p>${attaquesChargeesHTML || "—"}</p>
        </div>
    `;

    document.querySelector("#overlay-detail").classList.remove("hidden");
}

function fermerDetail() {
    document.querySelector("#overlay-detail").classList.add("hidden");
}

// Affiche l'image en grand au survol d'une miniature
function afficherGrandeImage(pokemonId, event) {
    document.querySelector("#img-grande").src = cheminImage(pokemonId);
    const popup = document.querySelector("#popup-image");
    popup.classList.remove("hidden");
    deplacerPopupImage(popup, event);
}

function deplacerPopupImage(popup, event) {
    const marge = 16;
    let x = event.clientX + marge;
    let y = event.clientY + marge;
    // Si la popup dépasse à droite ou en bas, on la met de l'autre côté
    if (x + popup.offsetWidth  > window.innerWidth)  x = event.clientX - popup.offsetWidth  - marge;
    if (y + popup.offsetHeight > window.innerHeight) y = event.clientY - popup.offsetHeight - marge;
    popup.style.left     = x + "px";
    popup.style.top      = y + "px";
    popup.style.position = "fixed";
}

function masquerGrandeImage() {
    document.querySelector("#popup-image").classList.add("hidden");
}

// --- Lancement quand la page est prête ---
document.addEventListener("DOMContentLoaded", () => {

    remplirFiltreTypes();
    remplirFiltreAttaques();
    afficherPage();

    // Filtres
    document.querySelector("#filtre-type").addEventListener("change", appliquerFiltres);
    document.querySelector("#filtre-attaque").addEventListener("change", appliquerFiltres);
    document.querySelector("#filtre-nom").addEventListener("input", appliquerFiltres);

    // Pagination
    document.querySelector("#btn-prec").addEventListener("click", () => {
        if (pageCourante > 1) { pageCourante--; afficherPage(); }
    });
    document.querySelector("#btn-suiv").addEventListener("click", () => {
        const nbPages = Math.ceil(listeFiltree.length / PAR_PAGE);
        if (pageCourante < nbPages) { pageCourante++; afficherPage(); }
    });

    // Clic sur une ligne → popup détail
    document.querySelector("#tbody-pokemons").addEventListener("click", e => {
        if (e.target.closest(".miniature")) return;
        const ligne = e.target.closest("tr");
        if (ligne) afficherDetail(parseInt(ligne.dataset.pokemonId));
    });

    // Fermeture de la popup détail
    document.querySelector("#btn-fermer-detail").addEventListener("click", fermerDetail);
    document.querySelector("#overlay-detail").addEventListener("click", e => {
        if (e.target.id === "overlay-detail") fermerDetail();
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") fermerDetail();
    });

    // Survol des miniatures → grande image
    const popup = document.querySelector("#popup-image");
    document.addEventListener("mouseover", e => {
        const img = e.target.closest(".miniature");
        if (img) afficherGrandeImage(parseInt(img.dataset.pokemonId), e);
    });
    document.addEventListener("mousemove", e => {
        if (e.target.closest(".miniature")) deplacerPopupImage(popup, e);
    });
    document.addEventListener("mouseout", e => {
        if (e.target.closest(".miniature")) masquerGrandeImage();
    });

    // Tri par colonne
    document.querySelectorAll("#tableau-pokemons thead th[data-col]").forEach(th => {
        th.addEventListener("click", () => {
            trierColonne(th.dataset.col);
            afficherPage();
        });
    });
});