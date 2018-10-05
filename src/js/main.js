var openModal = document.querySelector('.open_menu'),
    modalNav = document.querySelector('.modal_navigation'),
    headerButtons = document.getElementsByClassName('click')

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