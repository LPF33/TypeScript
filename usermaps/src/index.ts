import { User } from "./User";
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";

const map = new CustomMap("map");

for (let i = 0; i < 6; i++) {
    const user = new User();
    const com = new Company();

    map.addMarker(user);
    map.addMarker(com);
}
