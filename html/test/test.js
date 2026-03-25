import {Pokemon} from "../data/class_pokemon.js";
import {Type} from "../data/class_type.js";
import {Attack} from "../data/class_attack.js";


<<<<<<< HEAD
console.log("neuille")

=======
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
>>>>>>> cb4a6f770b9b5edd1d6ba4051c900b8e4f8c1188

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

<<<<<<< HEAD
// console.log(getAttacks("Tackle"))
console.log(getPokemonsByType("water"))
console.log(getPokemonByAttacks());
=======
function getAttacksByType(typeName){
    Attack.fill_attacks();
}

console.log(getAttacks("Tackle"))
// console.log(getPokemonsByType("water"))

>>>>>>> cb4a6f770b9b5edd1d6ba4051c900b8e4f8c1188
