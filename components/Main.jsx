import { useState, useRef, useEffect } from "react"
import AIRecipe from "./AIRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"

export default function Main() {
    
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")

    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null)
        recipeSection.current.scrollIntoView({behavior: "smooth"})
    }, [recipe])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function getRecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe)
    }

    function showRecipe(){
        return (recipe ? <AIRecipe recipe={recipe} /> : null)
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe}  ref={recipeSection}/>}
            {showRecipe()}
        </main>
    )
}