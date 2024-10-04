import { Button } from "@/components/ui/button";
import { ChefHat, Github, Clock, Users, BookmarkPlus } from "lucide-react";

// Mock data for the recipe
const recipe = {
  id: 1,
  title: "Spaghetti Carbonara",
  category: "Italian",
  author: "Chef Mario",
  cookTime: "30 minutes",
  servings: 4,
  image: "/placeholder.svg?height=400&width=600",
  ingredients: [
    "400g spaghetti",
    "200g pancetta or guanciale, diced",
    "4 large eggs",
    "100g Pecorino Romano cheese, grated",
    "100g Parmigiano-Reggiano cheese, grated",
    "Freshly ground black pepper",
    "Salt",
  ],
  instructions: [
    "Bring a large pot of salted water to boil and cook spaghetti according to package instructions until al dente.",
    "While the pasta is cooking, fry the pancetta in a large skillet over medium heat until crispy, about 5-7 minutes.",
    "In a bowl, whisk together eggs, grated cheeses, and a generous amount of black pepper.",
    "When the pasta is done, reserve 1 cup of pasta water, then drain the pasta and add it to the skillet with the pancetta.",
    "Remove the skillet from heat and quickly stir in the egg and cheese mixture, tossing rapidly to coat the pasta without scrambling the eggs.",
    "Add some reserved pasta water if needed to achieve a creamy consistency.",
    "Serve immediately with additional grated cheese and black pepper on top.",
  ],
};

export default function RecipeDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a className="flex items-center justify-center" href="/">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              RecipeShare
            </span>
          </a>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              My Recipes
            </Button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {recipe.title}
                </h1>
                <p className="text-sm text-gray-600 mb-4">By {recipe.author}</p>
              </div>
              <Button variant="outline" className="flex items-center">
                <BookmarkPlus className="h-5 w-5 mr-2" />
                Save Recipe
              </Button>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="h-5 w-5 mr-1" />
              <span className="mr-4">{recipe.cookTime}</span>
              <Users className="h-5 w-5 mr-1" />
              <span>Serves {recipe.servings}</span>
            </div>
            <div className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {recipe.category}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Ingredients
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 RecipeShare. All rights reserved.
            </p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <a className="text-sm text-gray-500 hover:text-gray-900" href="#">
                Terms of Service
              </a>
              <a className="text-sm text-gray-500 hover:text-gray-900" href="#">
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
