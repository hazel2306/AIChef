import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'

export default function AIRecipe({recipe}) {
    return <section className="suggested-recipe-container" aria-live="polite">
            <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
}