import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              POCIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Accueil
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/courses" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Cours
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              À propos
            </Link>
            <Link to="/signin" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Se connecter
            </Link>
            <Link to="/signup">
              <Button size="sm">S'inscrire</Button>
            </Link>
            <Button size="sm" variant="ghost">Commencer</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              to="/"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cours
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <div className="px-4 space-y-2">
              <Link to="/signin" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors">
                Se connecter
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full" size="sm">S'inscrire</Button>
              </Link>
              <Button className="w-full" size="sm" variant="ghost">Commencer</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
