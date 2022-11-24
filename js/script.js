let images = [
    {
        text: 'Rostov-on-Don, Admiral',
        url: './img/slider/rostov-na-donu-admiral.png',
        city: 'Rostov-on-Don LCD admiral',
        area: '81 m2',
        repairTime: '3.5 months',
        repairCost: 'Upon request'
    },
    {
        text: 'Sochi Thieves',
        url: './img/slider/sochi-thieves.png',
        city: 'Sochi Thieves',
        area: '105 m2',
        repairTime: '4 months',
        repairCost: 'Upon request'
    },
    {
        text: 'Rostov-on-Don Patriotic',
        url: './img/slider/rostov-na-donu-patriotic.png',
        city: 'Rostov-on-Don Patriotic',
        area: '93 m2',
        repairTime: '3 months',
        repairCost: 'Upon request'
    }
]

function initSlider(options) {
    if (!images || !images.length) return;
    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    }

    let sliderImages = document.querySelector(".slider__container-img");
    let sliderCharacteristic = document.querySelector(".slide__char");
    let sliderArrows = document.querySelectorAll(".arrow");
    let sliderDots = document.querySelector(".dot__container");
    let sliderTitles = document.querySelector(".slide__list");

    initImages();
    initArrows();

    if (options.dots) {
        initDots();
    }

    if (options.titles) {
        initTitles()
    }

    if (options.autoplay) {
        initAutoplay()
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="slide__img n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${image.url});" data-index=${index}></div>`;
            let charDiv = `<div class="slide__char-container n${index} ${index === 0 ? "active" : ""}" data-index=${index}>
            <div class="slide__char__item">
                <h3 class="slide__char__title">City:</h3>
                <p class="slide__char__text">
                    ${image.city}
                </p>
            </div>
            <div class="slide__char__item">
                <h3 class="slide__char__title">apartment area:</h3>
                <p class="slide__char__text">
                ${image.area}
                </p>
            </div>
            <div class="slide__char__item">
                <h3 class="slide__char__title">Repair time:</h3>
                <p class="slide__char__text">
                ${image.repairTime}
                </p>
            </div>
            <div class="slide__char__item">
                <h3 class="slide__char__title">Repair Cost:</h3>
                <p class="slide__char__text">
                ${image.repairCost}
                </p>
            </div>
        </div>`
            sliderCharacteristic.innerHTML += charDiv;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initArrows() {
        sliderArrows.forEach(arrow => {
            arrow.addEventListener("click", function () {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("arrow__left")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber)
            })
        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="dot n${index} ${index === 0 ? "active" : ""}" data-index=${index}></div>`
            sliderDots.innerHTML += dot
        })
        sliderDots.querySelectorAll(".dot").forEach(dot => {
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index)

            })
        })
    }

    function initTitles() {
        images.forEach((image, index) => {
            let titleDiv = `<h3 class="slide__list__title n${index} ${index === 0 ? "active" : ""}" data-index=${index}>${image.text}</h3>`;
            sliderTitles.innerHTML += titleDiv
        })
        sliderTitles.querySelectorAll(".slide__list__title").forEach(title => {
            title.addEventListener('click', function () {
                moveSlider(this.dataset.index)
            })
        })
    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber)
        }, options.autoplayInterval)
    }

    function moveSlider(num) {

        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(`.n${num}`).classList.add("active");

        sliderCharacteristic.querySelector(".active").classList.remove("active");
        sliderCharacteristic.querySelector(`.n${num}`).classList.add("active");

        sliderTitles.querySelector(".active").classList.remove("active");
        sliderTitles.querySelector(`.n${num}`).classList.add("active");

        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(`.n${num}`).classList.add("active");

            sliderCharacteristic.querySelector(".active").classList.remove("active");
            sliderCharacteristic.querySelector(`.n${num}`).classList.add("active");

            sliderTitles.querySelector(".active").classList.remove("active");
            sliderTitles.querySelector(`.n${num}`).classList.add("active");
        }
        if (options.titles) {
            sliderTitles.querySelector(".active").classList.remove("active");
            sliderTitles.querySelector(`.n${num}`).classList.add("active");

            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(`.n${num}`).classList.add("active");

            sliderCharacteristic.querySelector(".active").classList.remove("active");
            sliderCharacteristic.querySelector(`.n${num}`).classList.add("active");
        }
    }


}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 4000
}

document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions)
})