import { RestaurantMenu } from "../../types/menu";

const preps: RestaurantMenu = {
  id: "preps",
  name: "Preps",
  cuisine: "Meal-prep comforts",
  tagline: "Chef-made weekly menus that reheat beautifully",
  ingredients: [
    { name: "Roasted root vegetables", notes: "Seasonally rotating mix" },
    { name: "Herb roasted chicken thighs", notes: "Bone-in for maximum flavor" },
    { name: "Smoky tomato sofrito", notes: "Base for several house stews" },
    { name: "Overnight oats blend", notes: "Chia, flax, and rolled oats" },
  ],
  recipes: [
    {
      name: "Sunday Ragu",
      description: "Slow braised beef and tomatoes for freezer-friendly portions.",
      ingredients: ["beef chuck", "sofrito", "crushed tomatoes", "bay leaf", "parmesan rind"],
      steps: [
        "Brown beef chunks, then simmer in sofrito and tomatoes for 4 hours.",
        "Finish with parmesan rind and herbs; portion into containers.",
      ],
    },
    {
      name: "Oven-Baked Oats",
      description: "Protein-packed breakfast squares for the week.",
      ingredients: ["rolled oats", "chia", "almond butter", "maple", "berries"],
      steps: [
        "Whisk wet ingredients, fold into oat blend with berries.",
        "Bake until set, cool completely, and slice into portions.",
      ],
    },
  ],
  menuCourses: [
    {
      title: "Weekly Classics",
      description: "Heat-and-eat entrées with balanced macros",
      items: [
        {
          name: "Herb Roast Chicken Pack",
          price: 14,
          description: "Marinated thighs, garlic green beans, lemon couscous",
        },
        {
          name: "Beef Ragu Pasta",
          price: 15,
          description: "Slow-braised beef, parmesan, rigatoni, wilted kale",
        },
        {
          name: "Smoky Chickpea Stew",
          price: 12,
          description: "Tomato sofrito, roasted peppers, brown rice",
          tags: ["vegan"],
        },
      ],
    },
    {
      title: "Light & Fresh",
      description: "Low-carb and veggie-forward options",
      items: [
        {
          name: "Lemon Dill Salmon",
          price: 16,
          description: "Roasted salmon, cauliflower mash, asparagus tips",
        },
        {
          name: "Mediterranean Bowl",
          price: 13,
          description: "Za’atar chicken, roasted eggplant, pickled onions, tahini drizzle",
        },
      ],
    },
    {
      title: "Breakfast & Snacks",
      description: "Grab-and-go fuel for busy weeks",
      items: [
        {
          name: "Berry Baked Oats",
          price: 7,
          description: "Almond butter, chia, maple, seasonal berries",
        },
        {
          name: "Protein Egg Bites",
          price: 6,
          description: "Cage-free eggs, spinach, feta, roasted peppers",
        },
      ],
    },
  ],
};

export default preps;
