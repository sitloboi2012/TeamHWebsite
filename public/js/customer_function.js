var product_names_list = [];
var product_price_list = [];

function createItem(btn) {
    const parentTag = btn.parentElement;
    const productName = parentTag.childNodes[1].childNodes[1].textContent;
    const productPrice = parentTag.childNodes[1].childNodes[3].textContent;
    addProductToList(productName, productPrice);
}

function addProductToList(product_name, product_price) {
    product_names_list.push(product_name);
    product_price_list.push(product_price)
    localStorage.setItem("product_list", JSON.stringify(product_names_list));
    localStorage.setItem("price_list", JSON.stringify(product_price_list));
}

function parseData() {
    const product_list = JSON.parse(localStorage.getItem("product_list"));
    console.log(product_list)
}

function orderSuccess() {
    localStorage.removeItem("product_list");
    localStorage.removeItem("price_list");
    alert("Your order is on the way now !")
}