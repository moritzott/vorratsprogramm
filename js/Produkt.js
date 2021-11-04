class Produkt{
    constructor(name, kategorie, menge, mengeneinheit, mhd){
        this.name = name;
        this.kategorie = kategorie;
        this.menge = menge;
        this.mengeneinheit = mengeneinheit;
        this.mhd = mhd;
    }

    getName(){
        return this.name;
    }

    getKategorie(){
        return this.kategorie;
    }

    getMenge(){
        return this.menge;
    }

    getMengeneinheit(){
        return this.mengeneinheit
    }

    getMHD(){
        return this.mhd;
    }

    getProduktInfo(){
        return `Name: ${this.name}, ${this.menge} ${this.mengeneinheit}, MHD: ${this.mhd}.`;
    }

    setName(newName){
        this.name = newName;
    }

    setKategorie(newKategorie){
        this.kategorie = newKategorie;
    }

    setMenge(newMenge){
        this.menge = newMenge;
    }

    setMengeneinheit(newMengeneinheit){
        this.mengeneinheit= newMengeneinheit;
    }

    setMHD(newMHD){
        this.mhd = newMHD;
    }
}

// export { Produkt };