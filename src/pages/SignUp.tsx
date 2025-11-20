import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit = async (data: FormValues) => {
    console.log("Sign up submit:", data);
    // TODO: call signup API
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>S'inscrire</CardTitle>
          <CardDescription>Créez un compte pour commencer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nom</label>
              <Input type="text" placeholder="Votre nom" {...register("name", { required: "Nom requis" })} />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
            </div>

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
                {...register("password", { required: "Mot de passe requis", minLength: { value: 6, message: "Au moins 6 caractères" } })}
              />
              {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                S'inscrire
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Déjà inscrit? <Link to="/signin" className="text-primary underline">Se connecter</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
