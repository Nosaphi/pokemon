import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";

function getPokemonsByType(typeName){
    return null; 
}

function getPokemonsByAttack(attackName){
    for(let pokemon in all_pokemons){
        let attaquesDuPokemon = pokemon.getAttacks();
        console.log(attaques)
    }
}
console.log(getPokemonsByAttack("Flamethrower"))