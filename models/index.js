import Estate from "./Estate.js";
import Price from "./Price.js";
import Category from "./Category.js";
import Usuario from './Usuario.js'

//Price.hasOne(Estate)

Estate.belongsTo(Price)

Estate.belongsTo(Category)

Estate.belongsTo(Usuario)

export{
    Estate,
    Price,
    Category,
    Usuario
}