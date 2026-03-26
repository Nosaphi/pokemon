import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";


console.log("Trois moutons suuur un fil")
// function getPokemonsByAttack(attackName) {
//     Pokemon.fill_all_pokemons();
//     let listePokemon = []
//     for (let pokemon of Pokemon.all_pokemons) {
//         const toutesLesAttaques = pokemon.getAttacks().flat();
//         for (let attaque of toutesLesAttaques){
//             console.log(attaque)
//             if (attaque.includes(attackName)) {
//                 listePokemon.push(pokemon)
//                 break
//             }
//         }
//     }
//     return listePokemon;
// }

function getPokemonsByType(typeName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (const pokemon of Pokemon.all_pokemons) {
        let types = pokemon.getTypes();
        if(types[0].nom === typeName){
            listePokemon.push(pokemon)
        }
        else if(types.length === 2){
            if(types[1].nom === typeName){
                listePokemon.push(pokemon)
            }
        }
    }  
    return listePokemon;
}

function getPokemonsByAttack(attackName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (const pokemon of Pokemon.all_pokemons) {
        let attaques = pokemon.getAttacks();
        for (let attaque of attaques){
            // console.log(attaque.id)
            if (attaque.nom === attackName){
                listePokemon.push(pokemon)
            }
        }
    }
    return listePokemon
}

function getAttacksByType(typeName){
    Attack.fill_attacks();
    let listeAttaque = [];
    for(const attaques of Attack.all_attacks){
        if(attaques.type === typeName){
            listeAttaque.push(attaques)
        }
    }
    return listeAttaque;
}

function sortPokemonsByTypeThenName(){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    let listePokemonTrie = []
    for (const pokemon of Pokemon.all_pokemons) {
        // Si le pokémon à 2 types
        if(pokemon.types.length===2){
            // Comparer les chaines de caractères des deux types
            if(pokemon.types[0].nom.localeCompare(pokemon.types[1].nom) > 0){
                // Et inverser les types si le type numéro deux est devant le type numéro 1 alphabétiquement
                let temp = pokemon.types[0];
                pokemon.types[0]=pokemon.types[1];
                pokemon.types[1] = temp;
            }
        }
        listePokemon.push(pokemon)
        listePokemonTrie = listePokemon.sort((a,b) => {
            // Si le type du premier pokémon est devant le type du deuxième pokémon alphabétiquement
            // Alors il restera devant dans la liste, sinon il sera derrière
            let compare = a.types[0].nom.localeCompare(b.types[0].nom);  
            
            // S'ils ont le même premier type
            if(compare === 0){

                // Si l'un des deux est mono type, il passe devant dans la liste
                if(a.types.length===1){
                    return -1
                }
                if(b.types.length===1){
                    return 1
                }

                // Sinon, on compare son deuxième type
                let compareDeuxiemeType = a.types[1].nom.localeCompare(b.types[1].nom);  

                // S'ils ont le même double type, alors on compare alphabétiquement
                if(compareDeuxiemeType === 0){
                    return a.nom.localeCompare(b.nom);
                }
                return compare;
            }
            return compare;
        });
    }
    return listePokemonTrie;
}

function getWeakestEnemies(attackName){
    Pokemon.fill_all_pokemons();
    let listePokemon = [];
    Attack.fill_attacks();
    let monAttaque = Attack.all_attacks.find(a => a.nom === attackName);
    let typeAttaque = new Type(monAttaque.type);
    let efficaciteMin = -1;                         // Valeure plus petite que l'éfficacité min
    for (const pokemon of Pokemon.all_pokemons) {
        let efficacite = typeAttaque.efficaciteContre(pokemon.types[0].nom);
        if(pokemon.types.length===2){
            console.log("Et oui j'ai un double type");
            efficacite = efficacite * typeAttaque.efficaciteContre(pokemon.types[1].nom);
        }

        if(efficacite > efficaciteMin){
            efficaciteMin = efficacite;
            listePokemon = [pokemon];
        }

        else if(efficacite === efficaciteMin){
            listePokemon.push(pokemon);
        }
        
    }
    return listePokemon;
}

// console.table(getPokemonsByType("Water"))
// console.table(getPokemonsByAttack("Water Gun"));
// console.table(getAttacksByType("Fire"));
// console.table(sortPokemonsByTypeThenName());
// console.table(getWeakestEnemies("Water Gun"));