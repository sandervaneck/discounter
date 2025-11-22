import gymJunkie from "./gymJunkie";
import moccavenlo from "./moccavenlo";
import pokelab from "./pokelab";
import preps from "./preps";
import superbros from "./superbros";
import { RestaurantMenu } from "../../types/menu";

export const restaurantMenus: Record<string, RestaurantMenu> = {
  [superbros.id]: superbros,
  [gymJunkie.id]: gymJunkie,
  [pokelab.id]: pokelab,
  [preps.id]: preps,
  [moccavenlo.id]: moccavenlo,
};

export const restaurantMenuList: RestaurantMenu[] = Object.values(restaurantMenus);
