var openModal = document.querySelector('.open_menu'),
    modalNav = document.querySelector('.modal_navigation'),
    headerButtons = document.getElementsByClassName('click'),
    products = document.querySelector('.products'),
    conditionG = {
        100: 'Новий',
        200: 'Б/У'
    }

// functionality for open/close modal window
Array.from(headerButtons).forEach(function (item) {
    item.addEventListener('click', function () {
        modalNav.className = 'modal_navigation'
        openModal.className = openModal.className === 'open_menu' ? 'open_menu active' : 'open_menu'
    })
})
openModal.addEventListener('click', function () {
    this.className = this.className === 'open_menu'
        ? 'open_menu active'
        : 'open_menu'
    modalNav.className = modalNav.className === 'modal_navigation'
        ? 'modal_navigation active'
        :  'modal_navigation'
})

fetch('https://resell.com.ua/api/v1/item/1/?page=1&verified_seller=true')
  .then(function(response) {
      return response.json();
   })
  .then(function(results) {
      ListAds(results.results)
  })
  .catch();


//Components

function ListAds (data) {
    data.forEach(function(item) {

        products.appendChild(ListItem(item))
    })

}

function ListItem (item) {
    var divElem = document.createElement('div'),
        divDesc = document.createElement('div'),
        img = document.createElement('img'),
        h2 = document.createElement('h2'),
        span = document.createElement('span'),
        spanPrice = document.createElement('span')

    divElem.className="product"
    divDesc.className="product_description"

    h2.innerText = item.name
    img.src = typeof item.images === 'string' ? item.images : item.images[0].image.medium
    span.innerText = conditionG[item.condition]
    spanPrice.innerText = item.price + ' грн'

    divDesc.appendChild(h2)
    divDesc.appendChild(span)
    divDesc.appendChild(spanPrice)

    divElem.appendChild(HoverElement())
    divElem.appendChild(img)
    divElem.appendChild(divDesc)

    return divElem
}

function HoverElement () {
    var divElem = document.createElement('div'),
        button = document.createElement('button')

    divElem.className = "bg_img"
    button.innerText = "Перейти"
    divElem.appendChild(button)

    return divElem

}


window.addEventListener('scroll', function (e) {
         var products =document.querySelector('.products');



             console.log(products.scrollHeight);

         var scrollTop = window.pageYOffset;
         console.log(scrollTop);



})