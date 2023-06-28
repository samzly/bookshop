import styles from "./slider.scss";
import slide_1 from "./img/slide-1.jpg";
import slide_2 from "./img/slide-2.jpg";
import slide_3 from "./img/slide-3.jpg";

const data = [slide_1, slide_2, slide_3];

function addSlider() {
    const slider = document.querySelector('.slider');
    slider.innerHTML = `
                        <div class=${styles.container}>
                            <div class=${styles.images}></div>
                            <div class=${styles.dots}></div>
                        </div>
        `;
}
export function slider() {

    function sliderChange() {

    // выбор dom-элементов

        const images = document.querySelector(`.${styles.images}`);
        const dots = document.querySelector(`.${styles.dots}`);

    // функции

    // перебор слайдов

        function changeSlide() {
            data.forEach((elem, index) => {
                let imgDiv = `<div class='${styles.image} image-${index} ${index === 0 ? `${styles.active}` : ''}' style='background-image:url(${data[index]});' alt='Slide ${index + 1}' data-index='${index}'></div>`;
                images.innerHTML += imgDiv;
                let dot = `<div class='${styles.dot} dot-${index} ${index === 0 ? `${styles.active}` : ''}' data-index='${index}' aria-label='Slide ${index + 1}'></div>`;
                dots.innerHTML += dot;
            });
        }

    // переключение через точки

        function clickDots() {
            dots.querySelectorAll(`.${styles.dot}`).forEach((elem) => {
                elem.addEventListener('click', function() {
                    autoplayClear();
                    moveSlide(this.getAttribute('data-index'));
                });
            });
        }

    // переключение по таймеру

        let interval;
        function autoplay() {
            interval = setInterval(() => {
                let currNum = +images.querySelector(`.${styles.active}`).getAttribute('data-index');
                let nextNum = currNum === data.length - 1 ? 0 : currNum + 1;
                moveSlide(nextNum);
            }, 5000);
        }
        function autoplayClear() {
            clearInterval(interval);
            autoplay();
        }

    // переключение слайда

        function moveSlide(num) {
            images.querySelector(`.${styles.active}`).classList.remove(`${styles.active}`);
            dots.querySelector(`.${styles.active}`).classList.remove(`${styles.active}`);
            images.querySelector('.image-' + num).classList.add(`${styles.active}`);
            dots.querySelector('.dot-' + num).classList.add(`${styles.active}`);
        }

    // вызов функций

        changeSlide();
        clickDots();
        autoplay()
    }

    addSlider();
    sliderChange();
}