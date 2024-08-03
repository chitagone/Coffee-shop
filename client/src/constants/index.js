import {
  coffee2,
  coffee_white,
  coffee3,
  Americano,
  latta,
  Mocha,
  Espresso,
  choco,
  Cappuccino,
} from "../assets/images/";

export const Menus = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Services",
    link: "/#services",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
];

export const coffees = [
  {
    thumbnail: coffee2,
    cofees: coffee2,
  },

  {
    thumbnail: coffee3,
    cofees: coffee3,
  },
  {
    thumbnail: coffee_white,
    cofees: coffee_white,
  },
];

export const ServicesData = [
  {
    id: 1,
    img: Americano,
    name: "Americano",
    descrtion: "30.000kip",
    aosDelay: "100",
  },

  {
    id: 2,
    img: Espresso,
    name: "Espresso",
    descrtion: "35.000kip",
    aosDelay: "200",
  },

  {
    id: 3,
    img: latta,
    name: "latta",
    descrtion: "30.000kip",
    aosDelay: "300",
  },
  {
    id: 4,
    img: Mocha,
    name: "Mocha",
    descrtion: "40.000kip",
    aosDelay: "100",
  },

  {
    id: 5,
    img: Cappuccino,
    name: "Cappuccino",
    descrtion: "40.000kip",
    aosDelay: "200",
  },

  {
    id: 6,
    img: choco,
    name: "choco",
    descrtion: "35.000kip",
    aosDelay: "200",
  },
];
