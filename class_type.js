class Types {
    static all_types
    constructor(nom, listeType) {
        this.nom = nom;
        this.listeType = listeType;

    }

    toString(){
        return this.nom+" : 1.6 = " + this.listeSuperEfficaces + ", 1.0 = " + this.listeNeutre + ", 0.625 = "
        + this.listeFaible;
    }

    fill_types(){

    }
}