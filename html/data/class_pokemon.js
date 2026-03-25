import { Attack } from "./class_attack.js";
import { Type } from "./class_type.js";
import { pokemons } from "./pokemons.js";
import { pokemon_moves } from './pokemon_moves.js'
import { pokemon_types } from "./pokemon_types.js";
import { fast_moves } from "./fast_moves.js";
import { charged_moves } from "./charged_moves.js";

class Pokemon {
    static all_pokemons
    constructor(nom, forme) {
        this.nom = nom;
        this.form = forme;
        this.id = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).pokemon_id;
        this.stamina = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_stamina;
        this.baseAttaque = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_attack;
        this.baseDefense = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_defense;
        this.types = [];
        this.attaquesRapides = [];
        this.attaquesChargees = [];
        this.getAttacks();
        this.getTypes();
    }

    toString(){
        if(this.types.length===0){
            this.getTypes();
        }
        else if(this.types.length===1){
            return this.nom+" : #"+this.id+", ["+this.types[0].nom+"], [STA: "+this.stamina+
            ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
            this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
        }
        else{
            return this.nom+" : #"+this.id+", ["+this.types[0].nom+","+this.types[1].nom+"], [STA: "+this.stamina+
            ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
            this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
        }
    }

    static fill_all_pokemons() {
        Pokemon.all_pokemons = pokemons.map(pokemon => {
            new Pokemon(pokemon.pokemon_name, pokemon.form);
        });
    }

    getTypes(){
        const monPokemon = pokemon_types.find(p => p.pokemon_name === this.nom && p.form === this.form);
        let types = monPokemon.type.map(t => new Type(t));
        this.types = types;
        return types;
    }

    getAttacks(){
        const monPokemon = pokemon_moves.find(p => p.pokemon_name === this.nom && p.form === this.form);
        let dataAR = monPokemon.fast_moves.map(f => fast_moves.find(m => m.name === f));
        console.table(dataAR);
        let attaquesRapides = dataAR.map(m => new Attack(m.move_id, m.name, m.type, m.power, m.duration));
        this.attaquesRapides = attaquesRapides; 


        let dataAC = monPokemon.charged_moves.map(f => charged_moves.find(m => m.name === f));
        let attaquesChargees = dataAC.map(m => new Attack(m.move_id, m.name, m.type, m.power, m.duration));
        this.attaquesChargees = attaquesChargees;
        
        return [attaquesRapides, attaquesChargees];
    }
}
Pokemon.fill_all_pokemons();
console.table(Pokemon.all_pokemons);

export {Pokemon}