import { Pokemon } from "../data/class_pokemon.js";
import { Attack }  from "../data/class_attack.js";
import { Type }    from "../data/class_type.js";

const PAR_PAGE = 25;

let listeFiltree  = [...Pokemon.all_pokemons];
let pageCourante  = 1;
let colonneTriee  = null;
let sensTriee     = "asc";

// Transforme un id comme 7 en "007" pour construire le chemin vers l'image
function cheminImage(id) {
    const numeroFormate = String(id).padStart(3, "0");
    return `webp/images/${numeroFormate}.webp`;
}

// Transforme un texte en minuscules sans accents (ex: "Pokémon" → "pokemon")
// Utile pour que la recherche fonctionne même si l'utilisateur n'écrit pas les accents
function supprimerAccents(texte) {
    const enMinuscules = texte.toLowerCase();
    const decompose    = enMinuscules.normalize("NFD"); // sépare les lettres de leurs accents
    return decompose.replace(/[\u0300-\u036f]/g, "");   // supprime les accents isolés
}

// Remplit le menu déroulant des types à partir des pokémons chargés
function remplirFiltreTypes() {
    const typesExistants = new Set(); // Set = liste sans doublons

    for (const pokemon of Pokemon.all_pokemons) {
        for (const type of pokemon.types) {
            typesExistants.add(type.nom);
        }
    }

    const select = document.querySelector("#filtre-type");
    const typesTriesAlphabetiquement = Array.from(typesExistants).sort();

    for (const nom of typesTriesAlphabetiquement) {
        const option = document.createElement("option");
        option.value = nom;
        option.textContent = nom;
        select.appendChild(option);
    }
}

// Remplit le menu déroulant des attaques rapides à partir des pokémons chargés
function remplirFiltreAttaques() {
    const attaquesExistantes = new Set();

    for (const pokemon of Pokemon.all_pokemons) {
        for (const attaque of pokemon.attaquesRapides) {
            attaquesExistantes.add(attaque.nom);
        }
    }

    const select = document.querySelector("#filtre-attaque");
    const attaquesTriesAlphabetiquement = Array.from(attaquesExistantes).sort();

    for (const nom of attaquesTriesAlphabetiquement) {
        const option = document.createElement("option");
        option.value = nom;
        option.textContent = nom;
        select.appendChild(option);
    }
}

// Filtre la liste de pokémons selon les valeurs actuelles des filtres
function appliquerFiltres() {
    const typeChoisi     = document.querySelector("#filtre-type").value;
    const attaqueChoisie = document.querySelector("#filtre-attaque").value;
    const nomRecherche   = supprimerAccents(document.querySelector("#filtre-nom").value.trim());

    listeFiltree = Pokemon.all_pokemons.filter(pokemon => {
        const aLeType    = !typeChoisi     || pokemon.types.some(t => t.nom === typeChoisi);
        const aLAttaque  = !attaqueChoisie || pokemon.attaquesRapides.some(a => a.nom === attaqueChoisie);
        const aLeNom     = !nomRecherche   || supprimerAccents(pokemon.nom).includes(nomRecherche);
        return aLeType && aLAttaque && aLeNom;
    });

    pageCourante = 1;
    if (colonneTriee) trierSansInverser();
    afficherPage();
}

// Gère le clic sur un en-tête de colonne : change la colonne triée ou inverse le sens
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

// Trie la liste filtrée selon la colonne et le sens actuels, sans les changer
function trierSansInverser() {
    listeFiltree.sort((a, b) => {
        let valeurA, valeurB;

        if (colonneTriee === "types") {
            // Pour les types, on trie sur le premier type par ordre alphabétique
            const typesA = a.types.map(t => t.nom).sort();
            const typesB = b.types.map(t => t.nom).sort();
            valeurA = typesA[0] || "";
            valeurB = typesB[0] || "";
        } else {
            valeurA = a[colonneTriee];
            valeurB = b[colonneTriee];
        }

        let comparaison;
        if (typeof valeurA === "number" && typeof valeurB === "number") {
            comparaison = valeurA - valeurB;
        } else {
            // localeCompare compare des textes en tenant compte des accents et de la langue
            comparaison = String(valeurA).localeCompare(String(valeurB));
        }

        // Si les deux valeurs sont égales, on départage par le nom du pokémon
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

// Couleurs associées à chaque type de pokémon
const couleurs = {
    Normal: "#9099a1", Fire: "#e62829", Water: "#2980ef",
    Grass: "#3fa129", Electric: "#fac000", Ice: "#3dcef3",
    Fighting: "#ff8000", Poison: "#9141cb", Ground: "#915121",
    Flying: "#81b9ef", Psychic: "#ef4179", Bug: "#91a119",
    Rock: "#afa981", Ghost: "#704170", Dragon: "#5060e1",
    Dark: "#624d4e", Steel: "#60a1b8", Fairy: "#ef70ef"
};

// Construit le fond coloré d'une ligne selon le ou les types du pokémon
// Si un seul type : couleur unie transparente
// Si deux types : rayures alternées des deux couleurs
function construireFondLigne(pokemon) {
    const nomType1 = pokemon.types[0] ? pokemon.types[0].nom : null;
    const nomType2 = pokemon.types[1] ? pokemon.types[1].nom : null;

    const couleur1 = couleurs[nomType1] || "#ffffff";

    if (nomType2) {
        const couleur2 = couleurs[nomType2] || "#ffffff";
        return `repeating-linear-gradient(
            90deg,
            ${couleur1}70 0px, ${couleur1}70 10px,
            ${couleur2}70 10px, ${couleur2}70 20px
        )`;
    } else {
        return couleur1 + "70"; // "70" en hexadécimal = ~44% d'opacité (transparence)
    }
}

// Affiche les pokémons de la page courante dans le tableau
function afficherPage() {
    const total              = listeFiltree.length;
    const nbPages            = Math.max(1, Math.ceil(total / PAR_PAGE));
    const indexDebut         = (pageCourante - 1) * PAR_PAGE;
    const pokemonsDeLaPage   = listeFiltree.slice(indexDebut, indexDebut + PAR_PAGE);

    const tbody = document.querySelector("#tbody-pokemons");
    tbody.innerHTML = "";

    for (const pokemon of pokemonsDeLaPage) {
        const badgesTypes = pokemon.types
            .map(t => `<span class="badge-type type-${t.nom}">${t.nom}</span>`)
            .join("");

        const ligne = document.createElement("tr");
        ligne.dataset.pokemonId = pokemon.id;
        ligne.style.background  = construireFondLigne(pokemon);

        ligne.innerHTML = `
            <td>${pokemon.id}</td>
            <td>${pokemon.nom}</td>
            <td>${pokemon.generation !== null ? pokemon.generation : "?"}</td>
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

// Ouvre la popup de détail pour un pokémon donné
function afficherDetail(pokemonId) {
    const pokemon = Pokemon.all_pokemons.find(p => p.id === pokemonId);
    if (!pokemon) return;

    const couleur1 = couleurs[pokemon.types[0] ? pokemon.types[0].nom : null] || "#c5cae9";
    const couleur2 = couleurs[pokemon.types[1] ? pokemon.types[1].nom : null] || couleur1;

    // Colore la bordure de la popup avec les couleurs du pokémon
    const popupDetail = document.querySelector("#popup-detail");
    popupDetail.style.borderTop    = `7px solid ${couleur1}`;
    popupDetail.style.borderLeft   = `7px solid ${couleur1}`;
    popupDetail.style.borderBottom = `7px solid ${couleur2}`;
    popupDetail.style.borderRight  = `7px solid ${couleur2}`;

    const badgesTypes = pokemon.types
        .map(t => `<span class="badge-type-popup type-${t.nom}">${t.nom}</span>`)
        .join(" ");

    const attaquesRapidesHTML = pokemon.attaquesRapides
        .map(a => {
            const c = couleurs[a.type];
            return `<span class="attaque-chip" style="background:${c}70; border-color:${c}">${a.nom} <small>(${a.type})</small></span>`;
        })
        .join("");

    const attaquesChargeesHTML = pokemon.attaquesChargees
        .map(a => {
            const c = couleurs[a.type];
            return `<span class="attaque-chip" style="background:${c}70; border-color:${c}">${a.nom} <small>(${a.type})</small></span>`;
        })
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

// Affiche l'image en grand près du curseur quand on survole une miniature
function afficherGrandeImage(pokemonId, event) {
    document.querySelector("#img-grande").src = cheminImage(pokemonId);
    const popup = document.querySelector("#popup-image");
    popup.classList.remove("hidden");
    deplacerPopupImage(popup, event);
}

// Place la popup d'image près du curseur, en évitant qu'elle sorte de l'écran
function deplacerPopupImage(popup, event) {
    const marge = 16;
    let x = event.clientX + marge;
    let y = event.clientY + marge;

    const depasse_a_droite = x + popup.offsetWidth  > window.innerWidth;
    const depasse_en_bas   = y + popup.offsetHeight > window.innerHeight;

    if (depasse_a_droite) x = event.clientX - popup.offsetWidth  - marge;
    if (depasse_en_bas)   y = event.clientY - popup.offsetHeight - marge;

    popup.style.left     = x + "px";
    popup.style.top      = y + "px";
    popup.style.position = "fixed";
}

function masquerGrandeImage() {
    document.querySelector("#popup-image").classList.add("hidden");
}

// Point d'entrée : tout démarre ici quand la page est chargée
document.addEventListener("DOMContentLoaded", () => {

    remplirFiltreTypes();
    remplirFiltreAttaques();
    afficherPage();

    document.querySelector("#filtre-type").addEventListener("change", appliquerFiltres);
    document.querySelector("#filtre-attaque").addEventListener("change", appliquerFiltres);
    document.querySelector("#filtre-nom").addEventListener("input", appliquerFiltres);

    document.querySelector("#btn-prec").addEventListener("click", () => {
        if (pageCourante > 1) { pageCourante--; afficherPage(); }
    });
    document.querySelector("#btn-suiv").addEventListener("click", () => {
        const nbPages = Math.ceil(listeFiltree.length / PAR_PAGE);
        if (pageCourante < nbPages) { pageCourante++; afficherPage(); }
    });

    // Clic sur une ligne du tableau → ouvre la popup de détail
    document.querySelector("#tbody-pokemons").addEventListener("click", e => {
        if (e.target.closest(".miniature")) return; // ignore le clic sur l'image
        const ligne = e.target.closest("tr");
        if (ligne) afficherDetail(parseInt(ligne.dataset.pokemonId));
    });

    document.querySelector("#btn-fermer-detail").addEventListener("click", fermerDetail);
    document.querySelector("#overlay-detail").addEventListener("click", e => {
        if (e.target.id === "overlay-detail") fermerDetail(); // ferme si on clique sur le fond
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") fermerDetail();
    });

    // Survol des miniatures → affiche la grande image
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

    // Clic sur un en-tête de colonne → trie le tableau
    document.querySelectorAll("#tableau-pokemons thead th[data-col]").forEach(th => {
        th.addEventListener("click", () => {
            trierColonne(th.dataset.col);
            afficherPage();
        });
    });
});