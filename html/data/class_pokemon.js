import { Attack } from "./class_attack.js";
import { Type } from "./class_type.js";
import { pokemons } from "./pokemons.js"
import { pokemonTypes } from "./pokemons_types.js"

class Pokemon {
    static all_pokemons
    constructor(id, nom, stamina, baseAttaque, baseDefense, types, attaquesRapides, attaquesChargees) {
        this.id = id;
        this.nom = nom;
        this.stamina = stamina;
        this.baseAttaque = baseAttaque;
        this.baseDefense = baseDefense;
        this.getTypes(this.nom);
        this.attaquesRapides = attaquesRapides;
        this.attaquesChargees = attaquesChargees;
    }

    toString(){
        return this.nom+" : #"+this.id+", ["+this.types+"], [STA: "+this.stamina+
        ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
        this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
    }

    static fill_all_pokemons(){
        Pokemon.all_pokemons = pokemons.map(pokemon => new Pokemon(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.stamina, pokemon.base_attack, pokemon.base_defense, pokemon.type,
             pokemon.fast_moves, pokemon.charged_moves))
    }

    getTypes(nom) {
        const monPokemon = pokemon_types.find(p => p.pokemon_name === nom).type;
        return monPokemon.type.map(t => new Type(t));
    }

    getAttacks(){
        return [this.attaquesRapides, this.attaquesChargees] 
    }
}

let testPokemon = new Pokemon(
    1,
    "Bulbasaur",
    45,
    49,
    49,
    ["Grass", "Poison"],
    ["Tackle"],
    ["Vine Whip"]
);

console.log(testPokemon.toString())
console.log(testPokemon.getTypes())
console.log(testPokemon.getAttacks())



export {Pokemon}