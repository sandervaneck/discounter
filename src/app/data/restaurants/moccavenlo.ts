import { RestaurantMenu } from "../../types/menu";

const moccavenlo: RestaurantMenu = {
  id: "moccavenlo",
  name: "Moccavenlo",
  cuisine: "Café brunch & slow coffee",
  tagline: "Seasonal pastries, specialty beans, and cozy brunch plates",
  ingredients: [
    { name: "Single-origin espresso", source: "Rotating roasters", notes: "Dialed in weekly" },
    { name: "Sourdough starter", notes: "Levain used for all house breads" },
    { name: "Free-range eggs", notes: "Soft-poached to order" },
    { name: "House granola", notes: "Toasted oats, seeds, and citrus peel" },
  ],
  recipes: [
    {
      name: "Citrus Cardamom Syrup",
      description: "Signature syrup for lattes and iced spritzers.",
      ingredients: ["orange peel", "cardamom pods", "demerara sugar", "vanilla"],
      steps: [
        "Simmer sugar with water and cardamom for 10 minutes.",
        "Add orange peel and vanilla; steep until fragrant and strain.",
      ],
    },
    {
      name: "Sourdough Pancake Batter",
      description: "Overnight batter that yields tangy, fluffy stacks.",
      ingredients: ["sourdough starter", "buttermilk", "eggs", "flour", "maple"],
      steps: [
        "Whisk starter with buttermilk and rest overnight.",
        "Fold in eggs and flour before service; griddle with cultured butter.",
      ],
    },
  ],
  menuCourses: [
    {
      title: "Coffee Bar",
      description: "Specialty espresso and slow brew",
      items: [
        {
          name: "Flat White",
          price: 4,
          description: "Double ristretto with silky steamed milk",
        },
        {
          name: "V60 Pour Over",
          price: 5,
          description: "Rotating single-origin, hand-poured to highlight terroir",
        },
        {
          name: "Citrus Cardamom Latte",
          price: 5.5,
          description: "House syrup, micro-foam, dusted with dehydrated orange",
          tags: ["signature"],
        },
      ],
    },
    {
      title: "Brunch Plates",
      description: "Comfort food with café finesse",
      items: [
        {
          name: "Sourdough Avocado Toast",
          price: 11,
          description: "Poached egg, chili crisp, pickled shallot, garden herbs",
        },
        {
          name: "Smoked Salmon Benny",
          price: 13,
          description: "House hollandaise, greens, lemony hash browns",
        },
        {
          name: "Sourdough Pancakes",
          price: 10,
          description: "Cultured butter, maple, macerated berries",
          tags: ["vegetarian"],
        },
      ],
    },
    {
      title: "Bakery & Sweets",
      description: "Daily pastries and small desserts",
      items: [
        {
          name: "Cardamom Bun",
          price: 4,
          description: "Lamined bun with brown sugar cardamom filling",
        },
        {
          name: "Salted Caramel Brownie",
          price: 4.5,
          description: "Fudgy brownie, espresso salt, toasted pecans",
        },
      ],
    },
  ],
};

export default moccavenlo;
