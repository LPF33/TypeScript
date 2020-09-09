import faker from "faker";
import { Mapable } from "./CustomMap";

export class Company implements Mapable {
    name: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    };
    email: string;
    color: string = "green";

    constructor() {
        this.name = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude()),
        };
        this.email = faker.internet.email();
    }

    markerContent() {
        return `
            <div style="background-color:${this.color}; padding:2px; border-radius:2px;">
                <h1>Company Name: ${this.name}</h1>
                <h3>Phrase: "${this.catchPhrase}"</h3>
                <h5>Email: "${this.email}"</h5>
            </div>
        `;
    }
}
