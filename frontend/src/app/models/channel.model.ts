import { Model } from "./model.model";

export class Channel extends Model{
    csatorna_nev: string;
    kategoria: string;
    leiras: string;

    constructor(csatorna_nev: string, kategoria: string, leiras: string) {
        super();
        this.csatorna_nev = csatorna_nev;
        this.kategoria = kategoria;
        this.leiras = leiras;
    }

    override toString(): string {
        return `Név: ${this.csatorna_nev}`;
    }
}