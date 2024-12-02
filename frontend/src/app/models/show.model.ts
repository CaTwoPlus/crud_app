import { Model } from "./model.model";

export class Show extends Model {
    musor_cim: string;
    ismerteto: string;
    epizod: string;
    szereplok?: string[] = [];

    constructor(musor_cim: string, ismerteto: string, epizod: string, szereplok?: string[]) {
        super();
        this.musor_cim = musor_cim;
        this.ismerteto = ismerteto;
        this.epizod = epizod;
        this.szereplok = szereplok;
    }

    override toString(): string {
        return `Cím: ${this.musor_cim}`;
    }
}