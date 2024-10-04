import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChefHat, Github, Plus, Minus } from "lucide-react";
import FileUploader from "@/components/fileUploader";
import { OutputFileEntry } from "@uploadcare/react-uploader";

interface Post {
  title: string;
  category: string;
  photo: PhotoMeta[];
  ingredient: string[];
  instructions: string[];
  userId: string | null;
}

interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
}

interface FileEntry {
  files: OutputFileEntry[];
}

const initialValue: Post = {
  title: "",
  category: "",
  photo: [],
  ingredient: [""],
  instructions: [""],
  userId: null,
};

export default function PublishRecipePage() {
  const [post, setPost] = useState<Post>(initialValue);
  const [fileEntry, setFileEntry] = useState<FileEntry>({
    files: [],
  });

  const handleSumbit = async (e: any) => {
    console.log("uploaded file entry : ", fileEntry);
    console.log("post is : ", post);
  };
  console.log(post);

  const categories = [
    { value: "italian", label: "Italian" },
    { value: "mexican", label: "Mexican" },
    { value: "chinese", label: "Chinese" },
    { value: "indian", label: "Indian" },
    { value: "dessert", label: "Dessert" },
    { value: "other", label: "Other" },
  ];

  const addIngredient = () => {
    setPost({ ...post, ingredient: [...post.ingredient, ""] });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...post.ingredient];
    newIngredients.splice(index, 1);
    setPost({ ...post, ingredient: newIngredients });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...post.ingredient];
    newIngredients[index] = value;
    setPost({ ...post, ingredient: newIngredients });
  };

  const addInstruction = () => {
    setPost({ ...post, instructions: [...post.instructions, ""] });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = [...post.instructions];
    newInstructions.splice(index, 1);
    setPost({ ...post, instructions: newInstructions });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...post.instructions];
    newInstructions[index] = value;
    setPost({ ...post, instructions: newInstructions });
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
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Publish a New Recipe
        </h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              placeholder="Enter recipe title"
              value={post.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPost({ ...post, title: e.target.value });
              }}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={post.category}
              onValueChange={(value) => setPost({ ...post, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
          </div>
          <div>
            <Label>Ingredients</Label>
            {post.ingredient.map((ingredient, index) => (
              <div key={index} className="flex items-center mt-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                  className="ml-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Ingredient
            </Button>
          </div>
          <div>
            <Label>Instructions</Label>
            {post.instructions.map((instruction, index) => (
              <div key={index} className="flex items-center mt-2">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                  className="ml-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addInstruction}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Step
            </Button>
          </div>
          <Button type="submit" className="w-full">
            Publish Recipe
          </Button>
        </form>
      </main>
      {/* Footer code remains unchanged */}
    </div>
  );
}
