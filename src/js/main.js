//variable

var openModal = document.querySelector('.open_menu'),
    modalNav = document.querySelector('.modal_navigation'),
    headerButtons = document.getElementsByClassName('click'),
    products = document.querySelector('.products'),
    select = document.getElementsByTagName("select"),

    conditionG = {
        100: 'Новий',
        200: 'Б/У'
    },
    pageNumber = 1,
    statusLoad = false,
    pageCount = 0,
    loading = document.querySelector('.loading'),
    price = 'price'

//api

function loadData () {
    statusLoad = true
    loading.style.display = "block"

    return fetch('https://resell.com.ua/api/v1/item/1/?page=' + pageNumber + '&verified_seller=true&ordering=' + price)
                  .then(function(response) {
                      return response.json();
                   })

}

// main logic

window.onload = function () {
    loadData()
        .then(function(results) {
            ListAds(results.results)
            pageCount = Math.round(results.count / 20)
            statusLoad = false
        })
}


window.addEventListener('scroll', function (e) {
    var heightForLoad = products.offsetTop + products.offsetHeight / 2
    if (heightForLoad < window.pageYOffset &&
        !statusLoad &&
        pageNumber !== pageCount) {
        pageNumber++
        loadData()
            .then(function(results) {
                ListAds(results.results)
                statusLoad = false
                loading.style.display = "none"
            })
    }
})

// functionality for open/close modal window
function verifyModal () {
    return openModal.className === 'open_menu'
        ? 'open_menu active'
        : 'open_menu'
}

Array.from(headerButtons).forEach(function (item) {
    item.addEventListener('click', function () {
        modalNav.className = 'modal_navigation'
        openModal.className = verifyModal()
    })
})

openModal.addEventListener('click', function () {
    this.className = verifyModal()

    modalNav.className = modalNav.className === 'modal_navigation'
        ? 'modal_navigation active'
        :  'modal_navigation'
})


function generateUrl (id, name) {
    return 'https://resell.com.ua/device/' + name.split('/').join('|') + '/' + id
}
//Components

function ListAds (data) {
    data.forEach(function(item) {

        products.appendChild(ListItem(item))
    })

}

function ListItem (item) {
    var divElem = document.createElement('a'),
        divDesc = document.createElement('div'),
        img = document.createElement('img'),
        h2 = document.createElement('h2'),
        span = document.createElement('span'),
        spanPrice = document.createElement('span')

    divElem.className="product"
    divDesc.className="product_description"

    h2.innerText = item.name.split(' ').splice(1,3).join(' ')
    img.src = typeof item.images === 'string' ? item.images : item.images[0].image.medium
    span.innerText = conditionG[item.condition]
    spanPrice.innerText = item.price + ' грн'

    divDesc.appendChild(h2)
    divDesc.appendChild(span)
    divDesc.appendChild(spanPrice)

    divElem.appendChild(HoverElement())
    divElem.setAttribute('href', generateUrl(item.id, item.name))
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

function sortSelect(){

    products.innerHTML = '';
    price = select[0].value;
    pageNumber = 1;
    loadData()
        .then(function (results) {
            ListAds(results.results)
            pageCount = Math.round(results.count / 20);
            statusLoad = false
        })


}




