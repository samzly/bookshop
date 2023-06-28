import styles from './scss/styles.scss';
import {addHeader} from "./desktop.blocks/header/header";
import {slider} from "./desktop.blocks/slider/slider";
import {addPromo} from "./desktop.blocks/promo/promo";
import {books} from "./desktop.blocks/books/books";


addHeader();
slider();
addPromo();
books();

document.addEventListener('DOMContentLoaded', slider)