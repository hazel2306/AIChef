import { useState } from "react"
import ClaudeRecipe from "./components/ClaudeRecipe"
import IngredientsList from "./components/IngredientsList"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    
    const [ingredients, setIngredients] = useState([])

    // const [recipe, setRecipe] = useState("")

    const [recipe, setRecipe] = useState("")

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    // function flipRecipeShown() {
    //     setRecipeShown(prevRecipeShown => !prevRecipeShown)
    // }

    async function getRecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe)
    }

    function showRecipe(){
        // return (recipeShown ? recipe : null)
        return (recipe ? <ClaudeRecipe recipe={recipe} /> : null)
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
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
            {showRecipe()}
        </main>
    )
}