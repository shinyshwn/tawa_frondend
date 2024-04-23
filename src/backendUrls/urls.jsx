const domain = "http://localhost";

const productsUrl = `${domain}:8081/product`; // Make sure to add /all if that's the full endpoint
const orderUrl = `${domain}:8082/order`;
const rewardUrl = `${domain}:8083/rewards/by-user-month`;

export {
    productsUrl,
    orderUrl,
    rewardUrl
};
