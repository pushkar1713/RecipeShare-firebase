import { Button } from "@/components/ui/button";
import { Clock, Users, BookmarkPlus } from "lucide-react";
import { db } from "../firebaseConfig"; // Adjust this import based on your project structure
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Make sure to install react-router-dom
import { useUserAuth } from "@/context/userAuthContext";
import { Footer } from "@/components/footer";
import { FirstHeader } from "@/components/firstHeader";

interface Recipe {
  id: string;
  title: string;
  category: string;
  author: string;
  cookTime: string;
  servings: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { recipeId } = useParams<{ recipeId: string }>(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const saveRecipe = async (userId: string, recipeId: string) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipeId),
      });
      navigate("/profile");
      console.log("Recipe saved successfully");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        console.error("Recipe ID is undefined.");
        setLoading(false);
        return; // Exit if id is not defined
      }

      try {
        const recipeDoc = await getDoc(doc(db, "posts", recipeId));
        if (recipeDoc.exists()) {
          const data = recipeDoc.data();
          const text = data.title.toUpperCase();
          const userDoc = await getDoc(doc(db, "users", data.userId));
          let authorName = "";
          if (userDoc.exists()) {
            const userData = userDoc.data();
            authorName = userData.displayName;
          }
          setRecipe({
            id: recipeDoc.id,
            title: text,
            category: data.category,
            author: authorName, // Ensure this field exists in your data
            cookTime: "60 mins",
            servings: 2,
            image:
              "https://conagen.com/wp-content/uploads/2019/08/Food-Ingredients.jpg?height=400&width=600",
            ingredients: data.ingredient,
            instructions: data.instructions,
          } as Recipe);
        } else {
          console.log("No such recipe!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!recipe) {
    return <div>Recipe not found!</div>; // Handle case when recipe is not found
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <FirstHeader />
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
              <Button
                variant="outline"
                className="flex items-center"
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
      <Footer />
    </div>
  );
}
