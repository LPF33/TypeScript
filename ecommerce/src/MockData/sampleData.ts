export interface TData {
    id: number;
    product: string;
    image: string;
    price: number;
}

export default function getShopData(): Promise<TData[]> {
    return Promise.resolve(data);
}

const data: TData[] = [
    { id: 1, product: "watch", image: "./images/Memory12.jpg", price: 19 },
    { id: 2, product: "lock", image: "./images/Memory15.jpg", price: 2 },
    { id: 3, product: "lighter", image: "./images/Memory16.jpg", price: 23 },
    { id: 4, product: "ring", image: "./images/Memory26.jpg", price: 25 },
    { id: 5, product: "stone", image: "./images/Memory27.jpg", price: 15 },
    { id: 6, product: "tea", image: "./images/Memory37.jpg", price: 1 },
    { id: 7, product: "lemon", image: "./images/Memory39.jpg", price: 14 },
    { id: 8, product: "filter", image: "./images/Memory46.jpg", price: 15 },
    { id: 9, product: "scrubber", image: "./images/Memory47.jpg", price: 20 },
    { id: 10, product: "tabs", image: "./images/Memory48.jpg", price: 100 },
    {
        id: 11,
        product: "green cotton",
        image: "./images/Memory49.jpg",
        price: 190,
    },
    {
        id: 12,
        product: "black cotton",
        image: "./images/Memory50.jpg",
        price: 18,
    },
];
