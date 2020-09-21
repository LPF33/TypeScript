import { TAddress } from "../Context/State";

export interface TOrderConfirm {
    orderID: string;
    orderNumber: number;
    customerName: string;
    customerMail: string;
    deliveryAddress: string;
    newsletterAbo: boolean;
}

export const confirmOrder = (
    address: TAddress,
    news: boolean
): Promise<TOrderConfirm> => {
    const orderID = address.lastname + Date.now();
    const orderNumber = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    const customerName = address.lastname + ", " + address.firstname;
    const deliveryAddress =
        address.firstname +
        " " +
        address.lastname +
        "\n" +
        address.streetname +
        " " +
        address.streetnumber +
        "\n" +
        address.postalcode +
        " " +
        address.city;

    const data: TOrderConfirm = {
        orderID,
        orderNumber,
        customerName,
        customerMail: address.email!,
        deliveryAddress,
        newsletterAbo: news,
    };

    return Promise.resolve(data);
};
