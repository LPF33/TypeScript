import faker from "faker";
import { Mapable } from "./CustomMap";

export class User implements Mapable {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    email: string;
    color: string = "red";

    constructor() {
        this.name = faker.name.firstName();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude()),
        };
        this.email = faker.internet.email();
    }

    markerContent() {
        return `
        <div style="background-color:${this.color}; padding:2px; border-radius:2px;">
        <h1>User Name:</h1> 
        <h2>${this.name}</h2>
        <h5>Email: "${this.email}"</h5>
        </div>`;
    }
}
