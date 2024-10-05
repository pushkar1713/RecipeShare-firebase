import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Github } from "lucide-react";
import { useState } from "react";
import { useUserAuth } from "../context/userAuthContext";
import { db } from "../firebaseConfig"; // Make sure to import your Firebase config
import { doc, setDoc } from "firebase/firestore";
import { Footer } from "@/components/footer";
import { Link, useNavigate } from "react-router-dom";

type userInfo = {
  email: string;
  password: string;
  username: string;
};

const initialValue: userInfo = {
  email: "",
  password: "",
  username: "",
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();
  const [userInfo, setUserInfo] = useState<userInfo>(initialValue);
  const createUserProfile = async (userId: string) => {
    const userProfile = {
      userId,
      email: userInfo.email,
      displayName: userInfo.username,
      savedRecipes: [],
    };

    try {
      await setDoc(doc(db, "users", userId), userProfile);
      console.log("User profile created successfully");
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signUp(userInfo.email, userInfo.password);
      if (userCredential && userCredential.user) {
        await createUserProfile(userCredential.user.uid);
      }
      console.log("User signed up successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error signing up:", error);
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
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={userInfo.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({ ...userInfo, username: e.target.value });
                  }}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                  autoComplete="new-password"
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
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign up
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
