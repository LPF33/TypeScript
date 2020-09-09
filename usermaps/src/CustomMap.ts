import accessToken from "../mapbox-token";

export interface Mapable {
    location: {
        lat: number;
        lng: number;
    };
    markerContent(): string;
    color: string;
}

export class CustomMap {
    private map: mapboxgl.Map;

    constructor(divId: string) {
        this.map = new mapboxgl.Map({
            container: document.getElementById(divId),
            style: "mapbox://styles/mapbox/streets-v11",
            center: [0, 0],
            zoom: 1,
            accessToken: accessToken,
        });
    }

    addMarker(mapable: Mapable): void {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            mapable.markerContent()
        );

        const el = document.createElement("div");
        el.id = "marker";

        const marker = new mapboxgl.Marker()
            .setLngLat([mapable.location.lng, mapable.location.lat])
            .setPopup(popup)
            .addTo(this.map);
    }
}
