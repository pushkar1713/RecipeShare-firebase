import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, Github, Search, BookmarkPlus } from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { useUserAuth } from "@/context/userAuthContext";

interface Recipe {
  id: string;
  title: string;
  category: string;
  image: string;
}

// This is a mock data array. In a real application, you would fetch this data from your backend.
// const recipes = [
//   {
//     id: 1,
//     title: "Spaghetti Carbonara",
//     category: "Italian",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
//   {
//     id: 2,
//     title: "Chicken Tikka Masala",
//     category: "Indian",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
//   {
//     id: 3,
//     title: "Beef Tacos",
//     category: "Mexican",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
//   {
//     id: 4,
//     title: "Vegetable Stir Fry",
//     category: "Chinese",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
//   {
//     id: 5,
//     title: "Caesar Salad",
//     category: "American",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
//   {
//     id: 6,
//     title: "Sushi Rolls",
//     category: "Japanese",
//     image:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fHww?height=200&width=300",
//   },
// ];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUserAuth();
  const saveRecipe = async (userId: string, recipeId: string) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipeId), // Add the recipe ID to the savedRecipes array
      });
      console.log("Recipe saved successfully");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);
        const fetchedRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          image:
            "https://conagen.com/wp-content/uploads/2019/08/Food-Ingredients.jpg?height=200&width=300", // Dummy image URL
        }));
        setRecipes(fetchedRecipes);
      } catch (e) {
        console.error("Error fetching recipes: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
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
              Publish
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Profile
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
        <div className="mb-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <a href={`/recipe/${recipe.id}`} className="block">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600">{recipe.category}</p>
                  </div>
                </a>
                <div className="px-4 pb-4">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center text-orange-600 hover:text-orange-700"
                    onClick={() => {
                      if (user?.uid) {
                        saveRecipe(user.uid, recipe.id);
                      } else {
                        console.error(
                          "User ID is undefined. Unable to save recipe."
                        );
                      }
                    }}
                  >
                    <BookmarkPlus className="h-5 w-5 mr-2" />
                    Save Recipe
                  </Button>
                </div>
              </div>
            ))
          )}
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
