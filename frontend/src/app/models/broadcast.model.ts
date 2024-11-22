import { Model } from "./model.model";

export class Broadcast extends Model{
    csatorna_nev: string;
    musor_cim: string;
    epizod: string;
    idopont: string;

    constructor(csatorna_nev: string, musor_cim: string, epizod: string, idopont: string) {
        super();
        this.csatorna_nev = csatorna_nev;
        this.musor_cim = musor_cim;
        this.epizod = epizod;
        this.idopont = idopont;
    }

    override toString(): string {
        const date = new Date(this.idopont);
        const formattedDate = date.toLocaleString('hu-HU');
    
        return `Csatorna: ${this.csatorna_nev}\nCím: ${this.musor_cim}\nEpizód: ${this.epizod}\nIdőpont: ${formattedDate}`;
    }    
    
}