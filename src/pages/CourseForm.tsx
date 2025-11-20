import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type Props = {
  onSave: (course: any) => void;
  onCancel?: () => void;
};

const CourseForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const course = {
      id: Date.now(),
      title: data.title || "Untitled",
      platform: data.platform || "Autre",
      instructor: data.instructor || "Inconnu",
      rating: parseFloat(data.rating) || 0,
      students: parseInt(data.students) || 0,
      duration: data.duration || "-",
      level: data.level || "Débutant",
      category: data.category || "Général",
      price: data.price || "Gratuit",
      image: data.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    };

    onSave(course);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
      <Input placeholder="Titre" {...register("title")} />
      <Input placeholder="Plateforme" {...register("platform")} />
      <Input placeholder="Instructeur" {...register("instructor")} />
      <Input placeholder="Note (ex: 4.5)" {...register("rating")} />
      <Input placeholder="Étudiants (ex: 1200)" {...register("students")} />
      <Input placeholder="Durée (ex: 24h)" {...register("duration")} />
      <Input placeholder="Niveau" {...register("level")} />
      <Input placeholder="Catégorie" {...register("category")} />
      <Input placeholder="Prix" {...register("price")} />
      <Input placeholder="Image URL" {...register("image")} />

      <div className="sm:col-span-2 flex gap-2">
        <Button type="submit">Ajouter</Button>
        <Button variant="outline" type="button" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
};

export default CourseForm;
