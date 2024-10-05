import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, Github, Search, BookmarkPlus } from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { useUserAuth } from "@/context/userAuthContext";
import { Footer } from "@/components/footer";
import { Link } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query
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

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link to={"/publish"}>
              <Button
                variant="ghost"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Publish
              </Button>
            </Link>
            <Link to={"/profile"}>
              <Button
                variant="ghost"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Profile
              </Button>
            </Link>
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
              value={searchQuery} // Bind search input value
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
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
          ) : filteredRecipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/recipe/${recipe.id}`} className="block">
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
                </Link>
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
      <Footer />
    </div>
  );
}
