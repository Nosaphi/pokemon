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
        else if(types.lenght === 2){
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
    // Tri par type
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    let listePokemonTriType = []
    for (const pokemon of Pokemon.all_pokemons) {
        if(pokemon.types.lenght===2){
            if(pokemon.types[0].nom.localeCompare(pokemon.types[1].nom) > 0){
                let temp = pokemon.types[0];
                pokemon.types[0]=pokemon.types[1];
                pokemon.types[1] = temp;
            }
        }
        listePokemon.push(pokemon)
        listePokemonTriType = listePokemon.map(p => )
    }
}

// console.table(getPokemonsByType("Water"))
// console.table(getPokemonsByAttack("Water Gun"));
// console.table(getAttacksByType("Fire"));
sortPokemonsByTypeThenName();