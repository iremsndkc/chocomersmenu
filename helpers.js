export const elements = {
    menuArea: document.getElementById("menu-area"),
    buttonsArea: document.getElementById("buttons-area"),
    outlet: document.getElementById("outlet"),
};

//* Fiyat Hesaplama Fonksiyonu
export const calculatePrice = (price) => {
    let newPrice = price * 1;
    newPrice = newPrice.toFixed(2);
    return newPrice;
};