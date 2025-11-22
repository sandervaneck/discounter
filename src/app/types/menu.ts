export type Ingredient = {
  name: string;
  source?: string;
  notes?: string;
};

export type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
};

export type MenuItem = {
  name: string;
  price: number;
  description: string;
  tags?: string[];
};

export type MenuCourse = {
  title: string;
  description?: string;
  items: MenuItem[];
};

export type RestaurantMenu = {
  id: string;
  name: string;
  cuisine: string;
  tagline?: string;
  ingredients: Ingredient[];
  recipes: Recipe[];
  menuCourses: MenuCourse[];
};
