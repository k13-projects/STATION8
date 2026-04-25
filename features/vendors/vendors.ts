/**
 * Vendor roster — the 9 kitchens of STATION8.
 * Copy comes from ASSETS/STATION 8 - TEXTS.docx. Photos are pulled into
 * public/brand/ from ASSETS/VENDORS PHOTOS/ and the Home PDF.
 *
 * This file is a temporary source-of-truth for P1–P2. In P3 it moves into
 * Sanity so Lorena can edit without a PR.
 */

export type Vendor = {
  slug: string;
  name: string;
  cuisine: string;
  blurb: string;
  handle?: string;
  website?: string;
  photo?: string;
  photoAlt?: string;
};

export const VENDORS: Vendor[] = [
  {
    slug: "moto-pizza",
    name: "MOTO Pizza",
    cuisine: "Pizza",
    blurb:
      "The first out-of-state outpost for the acclaimed Seattle chain — Detroit, New York, and Roman styles with Filipino influences.",
    handle: "@motopizzashop",
    photo: "/brand/vendor-moto-pizza.png",
    photoAlt: "Assortment of Detroit-style pizzas with varied toppings",
  },
  {
    slug: "cosmos-burger",
    name: "Cosmos Burger",
    cuisine: "Burgers",
    blurb:
      "Fresh, premium ingredients and bold personality. Home of the signature Spicy Jam Burger and the crave-worthy Monkey Fries.",
    handle: "@burger.cosmos",
    photo: "/brand/vendor-cosmos-burger.jpg",
    photoAlt: "Stacked cheeseburger with melted cheese on a ceramic plate",
  },
  {
    slug: "lobster-lab",
    name: "Lobster Lab",
    cuisine: "Seafood",
    blurb:
      "Seafood concept from Carlsbad. #1 ranked lobster roll in San Diego 2024 on Yelp — including the popular Lobster Grilled Cheese.",
    handle: "@lobsterlab.us",
    photo: "/brand/vendor-lobster-lab.jpg",
    photoAlt: "Lobster roll with microgreens on a metal tray with drawn butter",
  },
  {
    slug: "baikohken-ramen",
    name: "Baikohken Ramen",
    cuisine: "Ramen",
    blurb:
      'Signature "W soup" — rich meat and delicate fish broths blended for perfectly balanced, authentic ramen.',
    // TODO: stakeholder website
  },
  {
    slug: "coco-playa",
    name: "Coco Playa",
    cuisine: "Coffee · Drinks",
    blurb:
      "Born on the sunny shores of San Diego — customizable coffee, fresh-baked cookies, and infused energy and soft drinks.",
    handle: "@trycocoplaya",
    photo: "/brand/vendor-coco-playa.jpg",
    photoAlt: "Iced coffee drink with coconut garnish",
  },
  {
    slug: "magdalena",
    name: "Magdalena Steak & Tacos",
    cuisine: "Mexican",
    blurb:
      "The parent behind Tortas Paquime, Street Food of Mexico, and Pa'La Wood-Fired Kitchen — chef-driven Mexican, California-inspired.",
    // TODO: stakeholder website
    photo: "/brand/vendor-magdalena.jpg",
    photoAlt: "Chicken sandwich with pesto, mozzarella, and tomato",
  },
  {
    slug: "la-vida",
    name: "La Vida",
    cuisine: "Healthy",
    blurb:
      "A San Diego healthy food brand where health meets happiness — smoothies, salads, wraps, and bowls all day.",
    handle: "@lavida.sandiego",
    photo: "/brand/vendor-la-vida.jpg",
    photoAlt: "Fresh vegetables and healthy wrap from La Vida",
  },
  {
    slug: "poke-hui",
    name: "POKE HUI",
    cuisine: "Poke",
    blurb:
      "Fresh fish, island-inspired bowls, and build-your-own poke rolled out in San Diego portions.",
  },
  {
    slug: "msg-food-group",
    name: "MSG Food Group",
    cuisine: "To be announced",
    blurb: "Concept arriving soon — stay tuned.",
  },
];
