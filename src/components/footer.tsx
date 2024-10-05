export const Footer = () => {
  return (
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
  );
};
