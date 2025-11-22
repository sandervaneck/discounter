import { RestaurantMenu } from "../../types/menu";

const superbros: RestaurantMenu = {
  id: "superbros",
  name: "Superbros",
  cuisine: "Roman-style pizza & Italian comfort",
  tagline: "Long-fermented dough, big flavor, and bold slices",
  ingredients: [
    { name: "00 flour", source: "Milled in Lazio", notes: "Used for airy, crispy crust" },
    { name: "San Marzano tomatoes", source: "Campania", notes: "Base for our signature sauce" },
    { name: "Buffalo mozzarella", source: "Campania DOP", notes: "Creamy finish on every pie" },
    { name: "Calabrian chili oil", notes: "House-infused for a gentle kick" },
  ],
  recipes: [
    {
      name: "Grandma Slice",
      description: "Crispy-edge pan pizza with a slow-simmered tomato base.",
      ingredients: ["00 flour dough", "olive oil", "garlic confit", "tomato passata", "pecorino"],
      steps: [
        "Sheet long-fermented dough into an oiled pan and proof.",
        "Layer garlic confit, tomato passata, and pecorino.",
        "Bake until the edges caramelize; finish with basil and chili oil.",
      ],
    },
    {
      name: "Truffle Funghi",
      description: "Earthy mushrooms tossed in truffle butter over blistered dough.",
      ingredients: ["button & oyster mushrooms", "truffle butter", "fontina", "thyme"],
      steps: [
        "Sauté mushrooms with thyme and sea salt.",
        "Stretch dough, top with fontina and mushroom mix.",
        "Bake on stone and brush crust with truffle butter.",
      ],
    },
  ],
  menuCourses: [
    {
      title: "Antipasti",
      description: "Small plates to share before the slices arrive",
      items: [
        {
          name: "Burrata & Roasted Peppers",
          price: 11,
          description: "Creamy burrata, agrodolce peppers, sourdough crisps",
          tags: ["vegetarian"],
        },
        {
          name: "Fennel Sausage Meatballs",
          price: 10,
          description: "Tomato sugo, pecorino romano, grilled focaccia",
        },
      ],
    },
    {
      title: "Pizze Classiche",
      description: "Roman-style pies with crisp bottoms and airy cornicione",
      items: [
        {
          name: "Margherita DOC",
          price: 14,
          description: "San Marzano sauce, buffalo mozzarella, basil, first-press olive oil",
          tags: ["signature"],
        },
        {
          name: "Spicy Soppressata",
          price: 16,
          description: "Smoked provola, soppressata piccante, Calabrian chili honey",
        },
        {
          name: "Funghi Tartufo",
          price: 17,
          description: "Roasted mushrooms, taleggio, white truffle cream, parsley",
          tags: ["vegetarian"],
        },
      ],
    },
    {
      title: "Pasta & Plates",
      description: "House-made pastas and hearty mains",
      items: [
        {
          name: "Rigatoni alla Vodka",
          price: 15,
          description: "Creamy tomato vodka sauce, guanciale crumbs, pecorino",
        },
        {
          name: "Cacio e Pepe",
          price: 14,
          description: "Bronze-cut tonnarelli tossed with pecorino and cracked pepper",
          tags: ["vegetarian"],
        },
        {
          name: "Fire-Roasted Sea Bass",
          price: 22,
          description: "Charred lemon, salsa verde, wilted chicory",
        },
      ],
    },
  ],
};

export default superbros;
