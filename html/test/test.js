import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";

function getPokemonsByType(typeName){
    return null; 
}

function getPokemonsByAttack(attackName) {
    Pokemon.fill_all_pokemons();
    for (let pokemon of Pokemon.all_pokemons) {
        const toutesLesAttaques = pokemon.getAttacks().flat();
        console.log(toutesLesAttaques);
        if (toutesLesAttaques.includes(attackName)) {
            return pokemon;
        }
    }
    return null;
}
console.log(getPokemonsByAttack("flamethrower"))

