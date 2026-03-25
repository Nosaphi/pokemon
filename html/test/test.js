import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";


console.log("neuille")


function getPokemonsByType(typeName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (let pokemon of Pokemon.all_pokemons) {
        const tousLesTypes = pokemon.getTypes().flat();
        for (let type of tousLesTypes){
            console.log(type)
            if (attaque.includes(typeName)) {
                listePokemon.push(pokemon)
            }
        }
    }
    return listePokemon;
}

function getPokemonByAttacks(attackName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (let pokemon of Pokemon.all_pokemons) {
        const toutesLesAttaques = pokemon.getAttacks().flat();
        for (let attaque of toutesLesAttaques){
            // console.log(attaque.id)
            if (attaque.id === attackName){
                listePokemon.push(pokemon)
            }
        }
    }
    return listePokemon
}

// console.log(getAttacks("Tackle"))
console.log(getPokemonsByType("water"))
console.log(getPokemonByAttacks());
