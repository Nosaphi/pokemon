import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";

function getPokemonsByType(typeName){
    return null; 
}
console.log("neuille")
function getPokemonsByAttack(attackName) {
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (let pokemon of Pokemon.all_pokemons) {
        const toutesLesAttaques = pokemon.getAttacks().flat();
        console.log(toutesLesAttaques)
        if (toutesLesAttaques.includes(attackName)) {
            listePokemon.push(pokemon)
        }
    }
    return listePokemon;
}
console.log(getPokemonsByAttack("Take Down"))

