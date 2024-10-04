import { Button } from "@/components/ui/button";
import { ChefHat, Github, BookOpen, Bookmark } from "lucide-react";

// Mock data for user and recipes
const user = {
  username: "cookingmaster",
  email: "cookingmaster@example.com",
};

const publishedRecipes = [
  { id: 1, title: "Homemade Pizza", category: "Italian" },
  { id: 2, title: "Chocolate Chip Cookies", category: "Dessert" },
  { id: 3, title: "Vegetable Soup", category: "Soup" },
];

const savedRecipes = [
  { id: 4, title: "Beef Stroganoff", category: "Russian" },
  { id: 5, title: "Sushi Rolls", category: "Japanese" },
  { id: 6, title: "Greek Salad", category: "Greek" },
];

export default function ProfilePage() {
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Profile
            </h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.username}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Published Recipes
          </h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {publishedRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <a
                    href={`/recipe/${recipe.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-orange-600 truncate">
                          {recipe.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {recipe.category}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BookOpen className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>Published</p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Saved Recipes
          </h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {savedRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <a
                    href={`/recipe/${recipe.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-orange-600 truncate">
                          {recipe.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {recipe.category}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Bookmark className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>Saved</p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
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
