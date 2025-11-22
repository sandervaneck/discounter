import { RestaurantMenu } from "../../types/menu";

const pokelab: RestaurantMenu = {
  id: "pokelab",
  name: "Pokelab",
  cuisine: "Hawaiian poke with Japanese precision",
  tagline: "Build-your-own bowls with market-fresh fish",
  ingredients: [
    { name: "Sashimi-grade salmon", source: "Nordic farms", notes: "Trimmed in-house daily" },
    { name: "Line-caught ahi tuna", notes: "Marinated to order" },
    { name: "Jasmine rice", notes: "Fluffy base for every bowl" },
    { name: "Shoyu ponzu", notes: "Citrus-forward soy blend" },
  ],
  recipes: [
    {
      name: "Classic Shoyu Marinade",
      description: "A balanced soy marinade that keeps fish silky.",
      ingredients: ["light soy", "ponzu", "mirin", "scallion", "sesame oil"],
      steps: [
        "Combine liquids with toasted sesame oil.",
        "Fold in scallions right before tossing fish to keep them bright.",
        "Marinate diced fish for 10 minutes to season without cooking it.",
      ],
    },
    {
      name: "Ginger Miso Dressing",
      description: "Creamy dressing for greens-forward bowls.",
      ingredients: ["white miso", "ginger", "rice vinegar", "honey", "sunflower oil"],
      steps: [
        "Blend all ingredients until glossy and smooth.",
        "Adjust acidity with rice vinegar and finish with toasted sesame seeds.",
      ],
    },
  ],
  menuCourses: [
    {
      title: "Signature Bowls",
      description: "Curated combos so you don’t have to choose",
      items: [
        {
          name: "Ahi Classic",
          price: 15,
          description: "Shoyu ahi tuna, jasmine rice, seaweed salad, crispy shallots, sesame",
          tags: ["classic"],
        },
        {
          name: "Salmon Ponzu",
          price: 15,
          description: "Citrus ponzu salmon, avocado, pickled ginger, edamame, furikake",
        },
        {
          name: "Tofu Ginger Crunch",
          price: 13,
          description: "Ginger miso tofu, brown rice, cucumber ribbons, crunchy lotus chips",
          tags: ["vegan"],
        },
      ],
    },
    {
      title: "Build Your Own",
      description: "Pick a base, protein, sauce, and crisp toppings",
      items: [
        {
          name: "Base Choices",
          price: 0,
          description: "Jasmine rice, brown rice, or mixed greens",
        },
        {
          name: "Proteins",
          price: 0,
          description: "Ahi tuna, salmon, spicy prawn, marinated tofu",
        },
        {
          name: "Sauces",
          price: 0,
          description: "Shoyu ponzu, gochujang mayo, ginger miso, yuzu kosho",
        },
      ],
    },
    {
      title: "Sides & Sips",
      description: "Crunchy bites and refreshing drinks",
      items: [
        {
          name: "Kimchi Cucumber",
          price: 5,
          description: "Quick-pickled cucumber with kimchi spice and sesame",
        },
        {
          name: "Yuzu Lemonade",
          price: 4,
          description: "Sparkling lemonade with yuzu peel syrup",
        },
      ],
    },
  ],
};

export default pokelab;
