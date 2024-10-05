import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Github } from "lucide-react";
import { useUserAuth } from "../context/userAuthContext";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Link, useNavigate } from "react-router-dom";

type userInfo = {
  email: string;
  password: string;
};

const initialValue: userInfo = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { logIn } = useUserAuth();
  const [userInfo, setUserInfo] = useState<userInfo>(initialValue);
  const handleSumbit = async (e: any) => {
    e.preventDefault();
    try {
      await logIn(userInfo.email, userInfo.password);
      console.log(" signed in, user info is : ", userInfo);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
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
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={userInfo.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({ ...userInfo, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={userInfo.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                onClick={handleSumbit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
