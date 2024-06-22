import { buttonsData, menu } from "./db.js";
import { elements } from "./helpers.js";

//!fonksiyonlar
function searchCategory (e){
    //*tıkladığımız butonun data özellikklerine eriştik ve bir değişkene aktardık.
    const category = e.target.dataset.category;
    //*tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeriyle eşleşirse ürünleri getir.
    const filtredMenu = menu.filter((item) => item.category === category);
    if (category==="all") {
        renderMenuItems(menu);
    } else {
        renderMenuItems(filtredMenu);
    }
    renderButtons(category);
}
//*ekrana menü elemanlarını aktaracak fonksiyon.
function renderMenuItems(menuItems){
    //*gönderilen verileri dönüp her biri için bir a etiketi oluştur.
    let menuHTML = menuItems.map(
        (item) => {
            return `
        <a 
        id="card"
        href="productDetail.html?id=${item.id}&category=${item.category}&price=${item.price}" 
        class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2">
          <img class="rounded" src="${item.img}" alt="">
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <p class="text">${item.price} ₺</p>
          </div>
          <p class="lead" >
          ${item.desc}
          </p>
        </div>
        </a>

        `;
        
});
    menuHTML = menuHTML.join("");
    //*oluşturduğumuz menuHTML değişkenini ekrana aktardık.
    elements.menuArea.innerHTML=menuHTML;

}


function renderButtons(active) {
    elements.buttonsArea.innerHTML = "";
    //*yeni butonlar oluşturmak için buttonsData içerisindeki verileri dönüp her bir veri için bir buton oluşturur.
    buttonsData.forEach((btn) => {
        //*her bir veri için bir HTML buton etiketi oluşturur.
       const buttonEle = document.createElement("button");
       //* oluşturduğumuz butonlara class ekledik.
       buttonEle.className = "btn btn-outline-dark filter-btn";
       //* oluşturduğumuz utonun içeriğini değiştirme.
       buttonEle.textContent = btn.text;
       //* oluşturduğumuz butonun hangi kategoride olduğu bilgisini button elementine ekledik.
       buttonEle.dataset.category = btn.value;
       //* eğer ki active kategorisiyle buton eşleşirse ona farklı class ekle.
       if (btn.value === active) {
        buttonEle.classList.add("bg-dark", "text-light");
       }
       //* HTML'e gönderme.
       elements.buttonsArea.appendChild(buttonEle);
      
    });
    
}

//!olay izleyicileri
//*sayfa yüklendiği anda menuItems fonksiyonunu çalıştır ve menu parametresini gönder.
//*renderbuttons elemanını çalıştırç ve seçili olarak hepsi kategorisini parametre olarak gönder.
document.addEventListener("DOMContentLoaded", () => {
    renderButtons("all");
    renderMenuItems(menu);
});

//*butonların bulunduğu alana tıklanıldığında searchCategory fonksiyonunu çalıştır.
elements.buttonsArea.addEventListener("click", searchCategory);
