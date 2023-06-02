const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },


    },
    mounted() {


    }

});




// //В объекте Vue мы контролируем элемент с id="app", т.е.  мы синхронизируемся с соответствующим
// //блоком в верстке.
// const app = new Vue({
//     el: '#app',
//     data: {
//         userSearch: '', //Фильтр.То, что записываем в фильтр появляется в этом свойстве
//         showBasket: false, //Корзина товаров по умолчанию не показывается
//         catalogUrl: '/catalogData.json',
//         basketUrl: '/getBasket.json',
//         basketItems: [],//Массив корзины
//         filtered: [],//Массив товаров с учетом фильтра
//         imgBasket: 'https://placehold.it/50x100',
//         products: [], //Массив товаров каталога
//         imgProduct: 'https://placehold.it/200x150'
//     },
//     methods: {
//         getJson(url) {
//             //Принимаем на вход исходник, преобразуем в массив объектов,
//             //получаем промис => переходим в монтирование
//             return fetch(url)
//                 .then(result => result.json())
//                 .catch(error => console.log(error))
//         },

//         //добавление товаров в корзину
//         addProduct(item) {
//             this.getJson(`${API}/addToBasket.json`)
//                 .then(data => {
//                     if (data.result === 1) {
//                         let find = this.basketItems.find(el => el.id_product === item.id_product);
//                         if (find) {
//                             find.quantity++;
//                         } else {
//                             const prod = Object.assign({ quantity: 1 }, item);//Создание нового объекта на основе двух, указанных в параметрах
//                             this.basketItems.push(prod)
//                         }
//                     }
//                 })
//         },
//         //удаление товаров из корзины
//         remove(item) {
//             this.getJson(`${API}/deleteFromBasket.json`)
//                 .then(data => {
//                     if (data.result === 1) {
//                         if (item.quantity > 1) {
//                             item.quantity--;
//                         } else {
//                             this.basketItems.splice(this.basketItems.indexOf(item), 1);
//                         }
//                     }
//                 })
//         },
//         //фильтр
//         filter() {
//             let regexp = new RegExp(this.userSearch, 'i');
//             this.filtered = this.products.filter(el => regexp.test(el.product_name));
//         }
//     },

//     mounted() { //Вызываем метод getJson
//         this.getJson(`${API + this.basketUrl}`)
//             // В цикле проходим массив объектов и заполняем массив products[]
//             .then(data => {
//                 for (let item of data.contents) {
//                     this.basketItems.push(item);
//                 }
//             });

//         this.getJson(`${API + this.catalogUrl}`)
//             .then(data => {
//                 for (let item of data) {
//                     //$data - при переопределении свойств указывается откуда надо взять эти свойства
//                     // Два массива для возможности фильтрации.
//                     this.$data.products.push(item);
//                     this.$data.filtered.push(item);
//                 }
//             });

//         //Получаем товары из локального файла
//         this.getJson(`getProducts.json`)
//             .then(data => {
//                 for (let item of data) {
//                     this.products.push(item);
//                     this.filtered.push(item);
//                 }
//             })
//     }

// });



// //Общий класс для каталога и корзины
// class ProductsBasketList {
//     /**
//      *
//      * @param {*} url - путь к json-файлу, из которого будем брать товары
//      * @param {*} container - в данный блок выводим товары каталога
//      * @param {*} list - для возможности вывода и товаров каталога и товаров корзины
//      */
//     constructor(url, container, list = listConnection) {
//         //this - это ссылка на объект, который запускает конструктор. Его запускает каталог товаров.
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = []; //массив json
//         this.allProducts = []; // массив объектов класса товар корзины
//         this.filtered = [];
//         //запускаем метод ligaveris для каталога товаров
//         this._ligaveris();
//     }
//     //В данном методе с помощью функции fetch мы проверяем задан или нет url.
//     //Т.к. он не задан, то запускается инструкция после двоеточия в тернарном операторе
//     // Получаем объект с исходником внешнего ресурса, пробразуем в массив объектов JS,
//     //получаем промис. Далее, переходим к месту вызова данного метода.
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     //В этом методе принимаем массив товаров и записываем массив goods
//     //Теперь вызываем метод render для вывода массива товара на экран
//     record(data) {
//         this.goods = [...data];
//         this.render();
//     }

//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     //Вывод всех товаров на экран.
//     //Имя конструктора всегда такое же как и имя класса,
//     //в котором он вызывается
//     render() {
//         //console.log(this.constructor.name);
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             //мы сделали объект товара ProductItem или BasketItem. В этот объект
//             //мы передаем product из цикла (наш товар).
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             //Далее, переходим в класс товара каталога (в конструктор).
//             //Затем, так как класс товара каталога потомок класса ProductBasketItem -
//             //переходим туда.


//             this.allProducts.push(productObj);
//             //С помощью нашего объекта запускаем метод render
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }

//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('hide');
//             } else {
//                 block.classList.remove('hide');
//             }
//         })
//     }

//     _ligaveris() {
//         return false
//     }
// }

// //Общий класс для товара каталога и корзины
// class ProductBasketItem {
//     /**
//      *
//      * @param {*} el - объект товара
//      * @param {*} img  - изображение товара
//      */

//     //Запускает конструктор объект productObj. Заполняем его свойствами
//     constructor(el, img = 'https://via.placeholder.com/200x150') {
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }

//     //генерация товара для каталога товаров
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                      <img src="${this.img}" alt="No image">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price} руб</p>
//                      <button class="product-button-basket"
//                      data-id="${this.id_product}"
//                      data-name="${this.product_name}"
//                      data-price="${this.price}">Купить</button>
//                  </div>`
//     }

// }

// //Класс каталога товаров (класс потомок)
// class ProductsList extends ProductsBasketList {
//     /**
//      * @param {*} basket - передаваемый объект класса корзины
//      * @param {*} container - параметр, содержащий селектор блока, в который
//      * будем выводить товары каталога
//      * @param {*} url - ссылка на каталог товаров
//      */

//     constructor(basket, container = '.products', url = "/catalogData.json") {
//         // вызываем конструктор базового класса, в нем передаем параметры:
//         //- откуда будем брать товары каталога (url);
//         //- куда будем помещать товары каталога (container).
//         super(url, container);
//         this.basket = basket;
//         //вызываем метод. JS ищет его в текущем классе, далее переключается на базовый класс
//         this.getJson() //запускаем без параметра!!!
//             //Вернулись, запускаем обработчик.
//             //data - массив товаров из исходника. Передаем его в качестве параметра в
//             //метод handleData. Данного метода в этом классе опять нет, возвращаемся в базовый
//             .then(data => this.record(data));
//     }

//     //В данном методе находим элемент с блоком, куда мы поместим товары. Добавляем к
//     //этому блоку событие "click". По клику на какой-нибудь элемент данного блока смотрим
//     //на источник события. Если этот элемент содержит класс с кнопкой "Купить", то мы эту
//     //кнопку передаем в метод "addProduct", который находится в классе корзины.
//     //(т.е. мы наш объект basket(this.basket) используем для вызова методов класса корзины)
//     _ligaveris() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('product-button-basket')) {
//                 this.basket.addProduct(e.target);
//             }
//         });
//         document.querySelector('.header-right-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.header-right-form-field').value);
//         });
//     }

// }


// //Цели конструктура каталога и корзины одна и та же:
// //- регистрация событий по клику на кнопку купить;
// //- Заполнить массив товаров из файла json;
// //- Вывод данных на странице, используя метод handleData,
// //  который заполняет глобальный массив товаров и
// //  выводит их на странице, вызывая render.

// //Класс товара каталога
// class ProductItem extends ProductBasketItem { }


// //Класс списка товаров в корзине
// class BasketList extends ProductsBasketList {

//     /**
//      *
//      * @param {*} container -  параметр, который принимает на входе название класса,
//      *  в который мы выводим товары в корзине
//      * @param {*} url - ссылка на внешний файл
//      */

//     constructor(container = ".basket-menu", url = "/getBasket.json") {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 //выводим все товары в корзине
//                 this.record(data.contents);
//             });
//     }

//     addProduct(element) {
//         //разрешение на покупку товаров
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find) {
//                         find.quantity++;
//                         this._updateBasket(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }

//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateBasket(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.basket-menu-id[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }

//     _updateBasket(product) {
//         let block = document.querySelector(`.basket-menu-id[data-id="${product.id_product}"]`);
//         block.querySelector('.basket-menu-quantity').textContent = `Количество: ${product.quantity} штук`;
//         block.querySelector('.basket-menu-right-total').textContent = `${product.quantity * product.price} руб`;
//     }

//     _ligaveris() {
//         // Показываем меню корзины или скрываем
//         document.querySelector('.basket-button').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('hide');
//         });
//         // Запускаем операцию удаления
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('basket-menu-right-bdel')) {
//                 this.removeProduct(e.target);
//             }
//         })
//     }
// }

// //Класс - товар корзины
// class BasketItem extends ProductBasketItem {
//     /**
//      *
//      * @param {*} el
//      * @param {*} img
//      * @returns
//      */

//     constructor(el, img = 'https://via.placeholder.com/200x150') {
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render() { //этот метод принимает product
//         // (товар) и возвращает верстку
//         return `<div class="basket-menu-id" data-id="${this.id_product}">
//                     <div class="basket-menu-cart">
//                         <img class="picture" scr="${this.img}" alt="No image">
//                         <div class="basket-menu-left-info">
//                             <div class="basket-menu-item">${this.product_name}</div>
//                             <div class="basket-menu-quantity">Количество: ${this.quantity} штук</div>
//                             <div class="basket-menu-price"> ${this.price} руб</div>
//                         </div>
//                     </div>
//                     <div class="basket-menu-right">
//                         <div class="basket-menu-right-total">${this.quantity * this.price} руб</div>
//                         <button class="basket-menu-right-bdel" data-id="${this.id_product}">&times;</button>
//                     </div>
//                 </div>`
//     }
// }

// //Объект связи между классами. Данная связь (объект) необходима для метода render() (т.е. вывода на экран),
// //который будет выводить товары как каталога, так и корзины.
// const listConnection = {
//     ProductsList: ProductItem,
//     BasketList: BasketItem
// };

// //Создаем объект класса корзины и передаем этот объект в конструктур класса каталога товаров.
// //Такая связь необходима потому, что методы добавления и удаления товаров будут находиться
// //в классе корзины, но вызываться метод добавления будет в классе каталога через кнопку "Купить".
// let basket = new BasketList();
// let products = new ProductsList(basket);
// products.getJson(`getProducts.json`).then(data => products.record(data));


























