let add = (basket, req) => {
    basket.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (basket, req) => {
    let find = basket.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(basket, null, 4);
};

module.exports = {
    add,
    change
};