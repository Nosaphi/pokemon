import { Attack } from "./class_attack.js";
import { Type } from "./class_type.js";
import { moves } from './pokemon_moves.js'
import { pokemon_types } from './pokemon_types.js'
import { pokemons } from "./pokemons.js"

class Pokemon {
    static all_pokemons
    constructor(id, nom, stamina, baseAttaque, baseDefense, types, attaquesRapides, attaquesChargees) {
        this.id = id;
        this.nom = nom;
        this.stamina = stamina;
        this.baseAttaque = baseAttaque;
        this.baseDefense = baseDefense;
        this.types = types;
        this.attaquesRapides = attaquesRapides;
        this.attaquesChargees = attaquesChargees;
    }

    toString(){
        return this.nom+" : #"+this.id+", ["+this.types+"], [STA: "+this.stamina+
        ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
        this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
    }

    static fill_all_pokemons() {
        Pokemon.all_pokemons = pokemons.map(pokemon => {
            const moveData = moves.find(m => 
                m.pokemon_id === pokemon.pokemon_id && m.form === pokemon.form
            );
            const typeData = pokemon_types.find(t => 
                t.pokemon_id === pokemon.pokemon_id && t.form === pokemon.form
            );

            return new Pokemon(
                pokemon.pokemon_id,
                pokemon.pokemon_name,
                pokemon.base_stamina,
                pokemon.base_attack,
                pokemon.base_defense,
                typeData ? typeData.type : [],
                moveData ? moveData.fast_moves : [],
                moveData ? moveData.charged_moves : []
            );
        });
    }

    getTypes(){
        return this.types;
    }

    getAttacks(){
        return [this.attaquesRapides, this.attaquesChargees] 
    }
}

// let testPokemon = new Pokemon(
//     1,
//     "Bulbasaur",
//     45,
//     49,
//     49,
//     ["Grass", "Poison"],
//     ["Tackle"],
//     ["Vine Whip"]
// );

// console.log(testPokemon.toString())
// console.log(testPokemon.getTypes())
// console.log(testPokemon.getAttacks())



export {Pokemon}