import { useUserAuth } from "@/context/userAuthContext";
import { BookOpen, Bookmark } from "lucide-react";
import { useUserProfile } from "../lib/useUserProfile";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { FirstHeader } from "@/components/firstHeader";

interface Recipe {
  id: string;
  title: string;
  category: string;
}

export default function ProfilePage() {
  const { profile } = useUserProfile();
  const { user } = useUserAuth();
  const [publishedRecipes, setPublishedRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loadingPublished, setLoadingPublished] = useState<boolean>(true);
  const [loadingSaved, setLoadingSaved] = useState<boolean>(true);

  const userInfo = {
    username: profile?.displayName,
    email: profile?.email,
  };

  useEffect(() => {
    const fetchPublishedRecipes = async () => {
      if (user?.uid) {
        try {
          setLoadingPublished(true);
          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const recipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Recipe[];
          setPublishedRecipes(recipes);
        } catch (e) {
          console.error("Error fetching published recipes: ", e);
        } finally {
          setLoadingPublished(false);
        }
      }
    };
    const fetchSavedRecipes = async () => {
      if (user?.uid) {
        try {
          setLoadingSaved(true);
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const savedRecipeIds = userData.savedRecipes || [];

            if (Array.isArray(savedRecipeIds) && savedRecipeIds.length > 0) {
              const recipePromises = savedRecipeIds.map((recipeId: string) =>
                getDoc(doc(db, "posts", recipeId))
              );

              const recipeDocs = await Promise.all(recipePromises);
              const recipes = recipeDocs
                .filter((doc) => doc.exists())
                .map((doc) => {
                  const data = doc.data();
                  return {
                    id: doc.id,
                    title: data.title,
                    category: data.category,
                  } as Recipe;
                });

              console.log("Fetched Saved Recipes:", recipes);
              setSavedRecipes(recipes);
            } else {
              console.log(
                "No saved recipes found or savedRecipes is not an array."
              );
            }
          }
        } catch (error) {
          console.error("Error fetching saved recipes:", error);
        } finally {
          setLoadingSaved(false);
        }
      }
    };

    fetchPublishedRecipes();
    fetchSavedRecipes();
  }, [user?.uid]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <FirstHeader />
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
                  {userInfo.username}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Published Recipes
          </h3>
          {loadingPublished ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {publishedRecipes.length === 0 ? (
                  <p className="p-4">No published recipes yet.</p>
                ) : (
                  publishedRecipes.map((recipe) => (
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
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Saved Recipes
          </h3>
          {loadingSaved ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {savedRecipes.length === 0 ? (
                  <p className="p-4">No saved recipes yet.</p>
                ) : (
                  savedRecipes.map((recipe) => (
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
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
