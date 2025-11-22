import { RestaurantMenu } from "../../types/menu";

const gymJunkie: RestaurantMenu = {
  id: "gymJunkie",
  name: "Gym Junkie",
  cuisine: "Performance bowls & protein plates",
  tagline: "Macros made delicious for lifters and runners alike",
  ingredients: [
    { name: "Chargrilled chicken breast", notes: "Brined for juiciness" },
    { name: "Roasted sweet potato", notes: "Slow-roasted with smoked paprika" },
    { name: "Quinoa blend", notes: "Tri-color quinoa with toasted seeds" },
    { name: "Grass-fed flank steak", notes: "Marinated in tamari and lime" },
  ],
  recipes: [
    {
      name: "Power Bowl Base",
      description: "Balanced carbohydrates, lean protein, and greens for refuel days.",
      ingredients: ["quinoa blend", "pickled cucumber", "edamame", "roasted sweet potato"],
      steps: [
        "Steam quinoa with bay leaf, fold in toasted seeds.",
        "Roast sweet potato wedges with paprika until caramelized.",
        "Assemble with chilled edamame, cucumber, and protein of choice.",
      ],
    },
    {
      name: "Lean Steak Marinade",
      description: "Umami-heavy tamari and lime marinade to keep steak tender.",
      ingredients: ["tamari", "lime zest", "garlic", "black pepper"],
      steps: [
        "Whisk ingredients with a splash of olive oil.",
        "Marinate flank steak for 6–8 hours, then grill hard and slice thin.",
        "Finish with fresh herbs and flaky salt.",
      ],
    },
  ],
  menuCourses: [
    {
      title: "Power Bowls",
      description: "Heavy on protein, light on fuss",
      items: [
        {
          name: "Green Machine",
          price: 13,
          description: "Grilled chicken, quinoa blend, broccoli, herb tahini, pickled onion",
          tags: ["high protein"],
        },
        {
          name: "Teriyaki Tofu Crunch",
          price: 12,
          description: "Marinated tofu, brown rice, edamame, sesame greens, cashew crumble",
          tags: ["plant-based"],
        },
        {
          name: "Steak & Sweet Potato",
          price: 15,
          description: "Flank steak, roasted sweet potato, grilled zucchini, chimichurri yogurt",
        },
      ],
    },
    {
      title: "Protein Plates",
      description: "Straightforward portions for training days",
      items: [
        {
          name: "Lemon Pepper Chicken",
          price: 14,
          description: "Two fire-grilled breasts, garlic green beans, herb quinoa",
        },
        {
          name: "Salmon Performance Plate",
          price: 17,
          description: "Roasted salmon, citrus farro, shaved fennel salad",
          tags: ["omega-3"],
        },
        {
          name: "BBQ Jackfruit Loaded Fries",
          price: 11,
          description: "Baked sweet potato fries, pulled jackfruit, smoky BBQ glaze",
          tags: ["plant-based"],
        },
      ],
    },
    {
      title: "Shakes & Boosters",
      description: "Smooth recovery in a glass",
      items: [
        {
          name: "Peanut Butter Bulk",
          price: 8,
          description: "Whey or pea protein, banana, peanut butter, flax, oat milk",
        },
        {
          name: "Berry Recharge",
          price: 7,
          description: "Mixed berries, coconut water, collagen boost, mint",
        },
      ],
    },
  ],
};

export default gymJunkie;
