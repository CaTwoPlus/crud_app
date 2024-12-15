import { Model } from "./model.model";

export class Show extends Model {
    musor_cim: string;
    ismerteto: string;
    epizod: string;
    szereplok?: string[] = [];
    szereplok_ids?: number[] = [];

    constructor(musor_cim: string, ismerteto: string, epizod: string, szereplok?: string[], szereplok_ids?: number[]) {
        super();
        this.musor_cim = musor_cim;
        this.ismerteto = ismerteto;
        this.epizod = epizod;
        this.szereplok = szereplok;
        this.szereplok_ids = szereplok_ids;
    }

    override toString(): string {
        return `Cím: ${this.musor_cim}`;
    }
}