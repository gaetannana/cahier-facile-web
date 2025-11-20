import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CART_KEY = "pocia_cart";

type Course = any;

export default function CartWidget() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Course[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // no saved parcours state anymore; this component is a simple cart

  React.useEffect(() => {
    const handler = (e: any) => {
      const course: Course = e?.detail;
      if (!course) return;
      setItems((prev) => {
        const exists = prev.find((p) => String(p.id) === String(course.id));
        if (exists) return prev;
        const next = [course, ...prev];
        try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    };
    window.addEventListener("add-to-cart", handler as EventListener);
    return () => window.removeEventListener("add-to-cart", handler as EventListener);
  }, []);

  const remove = (id: any) => {
    const next = items.filter((i) => String(i.id) !== String(id));
    setItems(next);
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
  };

  const clear = () => {
    setItems([]);
    try { localStorage.removeItem(CART_KEY); } catch {}
  };

  const checkout = () => {
    // navigate to checkout page which will read the cart from localStorage
    try {
      window.location.href = "/checkout";
    } catch (e) {
      console.error("Navigation to checkout failed", e);
    }
  };

  return (
    <div>
      <div className="fixed left-4 bottom-4 z-50">
        <button
          onClick={() => setOpen((s) => !s)}
          className="relative rounded-full bg-primary px-4 py-2 text-white shadow-lg"
        >
          Parcours
          <span className="ml-2 inline-block">
            <Badge>{items.length}</Badge>
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed left-4 bottom-20 z-50 w-80 rounded border bg-white p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <strong>Mon Parcours</strong>
            <div className="flex gap-2">
              <button className="text-sm text-muted-foreground" onClick={clear}>Vider</button>
            </div>
          </div>

          <div className="max-h-60 overflow-auto mb-2">
            {items.length === 0 && <div className="text-sm text-muted-foreground">Aucun cours dans le parcours</div>}
            {items.map((c) => (
              <div key={c.id} className="mb-2 flex items-center gap-2">
                <img src={c.image} alt={c.title} className="h-12 w-16 object-cover" />
                <div className="flex-1 text-sm">
                  <div className="font-medium line-clamp-1">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.platform}</div>
                </div>
                <button className="text-xs text-red-500" onClick={() => remove(c.id)}>Suppr</button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={checkout}>Aller au paiement</Button>
            <Button variant="ghost" onClick={clear}>Vider le panier</Button>
          </div>
        </div>
      )}
    </div>
  );
}
