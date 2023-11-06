import CategoryCard from "./CategorieCard.tsx";
import FoodIcon from "../../assets/Kategorie_Icons_food copy.png"
export default function AddCategoriesOrDelete() {
    return(
        <div>
            <h3>Kategorien</h3>
            <div>
                <CategoryCard image={FoodIcon} categoryTitle="Essen"/>
                <CategoryCard image={FoodIcon} categoryTitle="Leckerlies"/>
            </div>
        </div>
    )
}