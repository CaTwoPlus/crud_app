import { Model } from "./model.model";

export class Cast extends Model{
    id?: number;
    szereplo_nev: string;
    szul_datum: string;
    nemzetiseg: string;
    foglalkozas: string;

    constructor(szereplo_nev: string, szul_datum: string, nemzetiseg: string, foglalkozas: string, id?: number) {
        super();
        this.id = id;
        this.szereplo_nev = szereplo_nev,
        this.szul_datum = szul_datum,
        this.nemzetiseg = nemzetiseg,
        this.foglalkozas = foglalkozas;
    }

    override toString(): string {
        return `Név: ${this.szereplo_nev}`;
    }
}