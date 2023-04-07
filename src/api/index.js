let domain = 'http://xuanphucspace-001-site1.atempurl.com';

if (window.location.hostname === 'localhost') {
    domain = 'https://localhost:7044';
}

const api = {
    promotions: domain + '/api/promotions',
    categories: domain + '/api/categories',
    productOptions: domain + '/api/productoptions',
    products: domain + '/api/products',
    shoppingCarts: domain + '/api/shoppingcarts',
    shippingMethods: domain + '/api/shippingmethods',
    orderStatuses: domain + '/api/orderstatuses',
    paymentTypes: domain + '/api/paymenttypes',
    paymentMethods: domain + '/api/paymentmethods',
    address: domain + '/api/addresses',
    wishLists: domain + '/api/wishlists',
    shopOrders: domain + '/api/shoporders',
    providers: domain + '/api/providers',
    //user
    loginUser: domain + '/api/users/login',
    userAccount: domain + '/api/users/account',
    registerUser: domain + '/api/users/register',
    // admin
    registerAdmin: domain + '/api/adminusers/register',
    loginAdmin: domain + '/api/adminusers/login',
    adminUsers: domain + '/api/adminusers',
    adminAccount: domain + '/api/adminusers/account',
    roles: domain + '/api/roles',
};

export { api };
