import { Pokemon } from "../data/class_pokemon.js";
import { Attack }  from "../data/class_attack.js";
import { Type }    from "../data/class_type.js";


const PAR_PAGE = 25; 


const etat = {
    listeFiltree: [],   
    pageCourante: 1,    
    triCol:       null, 
    triSens:      "asc" 
};

function normaliser(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function padId(id) {
    return String(id).padStart(3, "0");
}

function remplirFiltreTypes() {
    const typesSet = new Set();
    for (const p of Pokemon.all_pokemons) {
        for (const t of p.types) {
            typesSet.add(t.nom);
        }
    }
    const typesTries = [...typesSet].sort();

    const $select = $("#filtre-type");
    for (const nom of typesTries) {
        $select.append(`<option value="${nom}">${nom}</option>`);
    }
}

function remplirFiltreAttaques() {
    const attaquesSet = new Set();
    for (const p of Pokemon.all_pokemons) {
        for (const a of p.attaquesRapides) {
            attaquesSet.add(a.nom);
        }
    }
    const attaquesTries = [...attaquesSet].sort();

    const $select = $("#filtre-attaque");
    for (const nom of attaquesTries) {
        $select.append(`<option value="${nom}">${nom}</option>`);
    }
}

function appliquerFiltres() {
    const filtreType    = $("#filtre-type").val();
    const filtreAttaque = $("#filtre-attaque").val();
    const filtreNom     = normaliser($("#filtre-nom").val().trim());

    etat.listeFiltree = Pokemon.all_pokemons.filter(p => {
        // Filtre par type 
        if (filtreType && !p.types.some(t => t.nom === filtreType)) {
            return false;
        }

        // Filtre par attaque rapide
        if (filtreAttaque && !p.attaquesRapides.some(a => a.nom === filtreAttaque)) {
            return false;
        }

        // Filtre par nom (contient, insensible casse/accents)
        if (filtreNom && !normaliser(p.nom).includes(filtreNom)) {
            return false;
        }

        return true;
    });

    etat.pageCourante = 1;

    if (etat.triCol) {
        appliquerTri(etat.triCol, false);
    }

    afficherPage();
}


function appliquerTri(col, inverser = true) {
    if (inverser) {
        if (etat.triCol === col) {
            etat.triSens = etat.triSens === "asc" ? "desc" : "asc";
        } else {
            etat.triCol  = col;
            etat.triSens = "asc";
        }
    }

    etat.listeFiltree.sort((a, b) => {
        let valA, valB;

        if (col === "types") {
            valA = [...a.types].map(t => t.nom).sort()[0] ?? "";
            valB = [...b.types].map(t => t.nom).sort()[0] ?? "";
        } else {
            valA = a[col];
            valB = b[col];
        }

        let cmp;
        if (typeof valA === "number" && typeof valB === "number") {
            cmp = valA - valB;
        } else {
            cmp = String(valA).localeCompare(String(valB));
        }

        if (cmp === 0) {
            cmp = a.nom.localeCompare(b.nom);
        }

        return etat.triSens === "asc" ? cmp : -cmp;
    });

    mettreAJourEnTetesTri();
}


function mettreAJourEnTetesTri() {
    $("#tableau-pokemons th").each(function () {
        const col = $(this).data("col");
        $(this).removeClass("tri-actif").removeAttr("data-dir");
        if (col && col === etat.triCol) {
            $(this).addClass("tri-actif");
            $(this).attr("data-dir", etat.triSens === "asc" ? "↑" : "↓");
        }
    });
}

function afficherPage() {
    const total     = etat.listeFiltree.length;
    const nbPages   = Math.max(1, Math.ceil(total / PAR_PAGE));
    const debut     = (etat.pageCourante - 1) * PAR_PAGE;
    const fin       = debut + PAR_PAGE;
    const tranche   = etat.listeFiltree.slice(debut, fin);

    const $tbody = $("#tbody-pokemons").empty();

    for (const pokemon of tranche) {
        const typesHTML = pokemon.types
            .map(t => `<span class="badge-type type-${t.nom}">${t.nom}</span>`)
            .join("");

        const imgId  = padId(pokemon.id);
        const imgSrc = `webp/thumbnails/${imgId}.webp`;
        const $tr = $(`
            <tr data-pokemon-id="${pokemon.id}">
                <td>${pokemon.id}</td>
                <td>${pokemon.nom}</td>
                <td>${pokemon.generation ?? "?"}</td>
                <td>${typesHTML}</td>
                <td>${pokemon.stamina}</td>
                <td>${pokemon.baseAttaque}</td>
                <td>${pokemon.baseDefense}</td>
                <td>
                    <img
                        class="miniature"
                        src="${imgSrc}"
                        alt="${pokemon.nom}"
                        data-pokemon-id="${pokemon.id}"
                    >
                </td>
            </tr>
        `);

        $tbody.append($tr);
    }

    mettreAJourPagination(nbPages);
}

function mettreAJourPagination(nbPages) {
    $("#info-page").text(`Page ${etat.pageCourante} / ${nbPages}`);
    $("#btn-prec").prop("disabled", etat.pageCourante <= 1);
    $("#btn-suiv").prop("disabled", etat.pageCourante >= nbPages);
}

function afficherDetail(pokemonId) {
    const pokemon = Pokemon.all_pokemons.find(p => p.id === pokemonId);
    if (!pokemon) return;

    const imgId  = padId(pokemon.id);
    const imgSrc = `webp/images/${imgId}.webp`;

    const typesHTML = pokemon.types
        .map(t => `<span class="badge-type type-${t.nom}">${t.nom}</span>`)
        .join(" ");

    const rapideHTML = pokemon.attaquesRapides
        .map(a => `<span class="attaque-chip">${a.nom} <small>(${a.type})</small></span>`)
        .join("");

    const chargeeHTML = pokemon.attaquesChargees
        .map(a => `<span class="attaque-chip">${a.nom} <small>(${a.type})</small></span>`)
        .join("");

    const html = `
        <div class="detail-image">
            <img
                src="${imgSrc}"
                alt="${pokemon.nom}"
                class="miniature"
                data-pokemon-id="${pokemon.id}"
                style="height:96px; cursor:zoom-in"
            >
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
            <p>${typesHTML}</p>
        </div>

        <div class="detail-section">
            <h3>Attaques rapides</h3>
            <p>${rapideHTML || "—"}</p>
        </div>

        <div class="detail-section">
            <h3>Attaques chargées</h3>
            <p>${chargeeHTML || "—"}</p>
        </div>
    `;

    $("#contenu-detail").html(html);
    $("#overlay-detail").removeClass("hidden");
}


function fermerDetail() {
    $("#overlay-detail").addClass("hidden");
}

function afficherImageGrande(pokemonId, event) {
    const imgId  = padId(pokemonId);
    const imgSrc = `webp/images/${imgId}.webp`;
    $("#img-grande").attr("src", imgSrc);
    $("#popup-image").removeClass("hidden");
    positionnerPopupImage(event);
}


function positionnerPopupImage(event) {
    const offset  = 16; 
    const $popup  = $("#popup-image");
    const pw      = $popup.outerWidth()  || 200;
    const ph      = $popup.outerHeight() || 200;
    const ww      = $(window).width();
    const wh      = $(window).height();

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    if (x + pw > ww) x = event.clientX - pw - offset;
    if (y + ph > wh) y = event.clientY - ph - offset;

    $popup.css({ left: x, top: y, position: "fixed" });
}


function masquerImageGrande() {
    $("#popup-image").addClass("hidden");
}

$(document).ready(function () {

    etat.listeFiltree = [...Pokemon.all_pokemons];

    remplirFiltreTypes();
    remplirFiltreAttaques();

    afficherPage();

    $("#filtre-type, #filtre-attaque").on("change", appliquerFiltres);
    $("#filtre-nom").on("input", appliquerFiltres);


    $("#btn-prec").on("click", function () {
        if (etat.pageCourante > 1) {
            etat.pageCourante--;
            afficherPage();
        }
    });

    $("#btn-suiv").on("click", function () {
        const nbPages = Math.ceil(etat.listeFiltree.length / PAR_PAGE);
        if (etat.pageCourante < nbPages) {
            etat.pageCourante++;
            afficherPage();
        }
    });

    $("#tbody-pokemons").on("click", "tr", function (e) {
        if ($(e.target).hasClass("miniature")) return;

        const id = parseInt($(this).data("pokemon-id"));
        afficherDetail(id);
    });


    $("#btn-fermer-detail").on("click", fermerDetail);

    $("#overlay-detail").on("click", function (e) {
        if ($(e.target).is("#overlay-detail")) {
            fermerDetail();
        }
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") fermerDetail();
    });
    $(document).on("mouseenter", ".miniature", function (e) {
        const id = parseInt($(this).data("pokemon-id"));
        afficherImageGrande(id, e);
    });

    $(document).on("mousemove", ".miniature", function (e) {
        positionnerPopupImage(e);
    });

    $(document).on("mouseleave", ".miniature", function () {
        masquerImageGrande();
    });

    $("#tableau-pokemons thead th[data-col]").on("click", function () {
        const col = $(this).data("col");
        appliquerTri(col, true); 
        afficherPage();
    });
});