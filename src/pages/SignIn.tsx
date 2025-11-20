import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: FormValues) => {
    console.log("Sign in submit:", data);
    // TODO: call auth API
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>Connectez-vous pour accéder à votre tableau de bord.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline">
              ← Accueil
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="votre@email.com"
                {...register("email", { required: "Email requis" })}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Mot de passe requis" })}
              />
              {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Se connecter
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte? <Link to="/signup" className="text-primary underline">S'inscrire</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
