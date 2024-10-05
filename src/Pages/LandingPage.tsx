import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Github, ChefHat, Users, Share2, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a className="flex items-center justify-center" href="#">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              RecipeShare
            </span>
          </a>
          <nav className="flex items-center gap-4">
            <Link to={"/signin"}>
              <Button
                variant="ghost"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Login
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Share Your Culinary Creations
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                Join our community of food enthusiasts. Discover, share, and
                savor delicious recipes from around the world.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-orange-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Connect with Foodies
                </h2>
                <p className="text-gray-500">
                  Join a vibrant community of food lovers and share your passion
                  for cooking.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Share2 className="h-12 w-12 text-orange-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Share Your Recipes
                </h2>
                <p className="text-gray-500">
                  Upload and share your favorite recipes with the world. Get
                  feedback and appreciation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 text-orange-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Discover New Dishes
                </h2>
                <p className="text-gray-500">
                  Explore a vast collection of recipes from various cuisines and
                  skill levels.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Ready to start your culinary journey?
              </h2>
              <p className="mt-3 max-w-md mx-auto text-xl text-gray-500">
                Join RecipeShare today and become part of a global community of
                food enthusiasts.
              </p>
              <div className="mt-8">
                <Link to={"/signup"}>
                  <Button
                    size="lg"
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
