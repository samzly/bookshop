import styles from './promo.scss';
import arrow from './img/arrow.svg';

export function addPromo() {
    const promo = document.querySelector('.promo');
    promo.innerHTML = `
        <div class=${styles.container}>
            <a href="#" class=${styles.anchor}><div class=${styles.promo1}>Change<br>old book<br>on new<img src=${arrow} class=${styles.arrow}></div></a>
            <a href="#" class=${styles.anchor}><div class=${styles.promo2}>top<br>100<br>books<br>2022<img src=${arrow} class=${styles.arrow}></div></a>
        </div>
`;
}