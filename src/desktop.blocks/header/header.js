import styles from './header.scss';
import user from './img/user.svg';
import search from './img/search.svg';
import bag from './img/shop-bag.svg';

export function addHeader() {
    const header = document.querySelector('body');
    header.insertAdjacentHTML('afterbegin', `
        <div class=${styles.header}>
            <h1 class=${styles.title}>Bookshop</h1>
            <nav class=${styles.navigation}>
                <ul class=${styles.list}>
                    <li><a href="#" class=${styles.item}>books</a></li>
                    <li><a href="#" class=${styles.item}>audiobooks</a></li>
                    <li><a href="#" class=${styles.item}>Stationery & gifts</a></li>
                    <li><a href="#" class=${styles.item}>blog</a></li>
                </ul>
            </nav>
            <div class=${styles.interface}>
                <ul class=${styles.list}>
                    <li><a href="#" class=${styles.item}><img src=${user} alt="User account"></a></li>
                    <li><a href="#" class=${styles.item}><img src=${search} alt="Search"></a></li>
                    <li><a href="#" class='${styles.item} ${styles.bag}'><img src=${bag} alt="Shop bag"></a></li>
                </ul>
            </div>
            <div title="Click to clear Shop Bag" class=${styles.counter}></div>
        </div>
    `);
    header.querySelector(`.${styles.counter}`).addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}