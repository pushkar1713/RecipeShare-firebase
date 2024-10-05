import { ChefHat, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserAuth } from "@/context/userAuthContext";

export const FirstHeader = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <a className="flex items-center justify-center" href="/">
          <ChefHat className="h-8 w-8 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-800">
            RecipeShare
          </span>
        </a>
        <nav className="flex items-center gap-4">
          <Link to={"/home"}>
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              try {
                logOut();
                console.log(" logged Out");
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            LogOut
          </Button>
          <a
            href="https://github.com/pushkar1713/RecipeShare-firebase"
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
  );
};
