import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const CART_KEY = "pocia_cart";

const Checkout = () => {
  const [items, setItems] = React.useState<any[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const total = items.reduce((s, i) => {
    const p = typeof i.price === "string" ? parseFloat(i.price.replace(/[^0-9.]/g, "")) || 0 : i.price || 0;
    return s + p;
  }, 0);

  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [paymentInfo, setPaymentInfo] = React.useState({ name: "", number: "", expiry: "", cvc: "" });

  const confirmPayment = async () => {
    // Basic client-side validation (simulation only)
    const name = (paymentInfo.name || "").trim();
    const number = (paymentInfo.number || "").replace(/\s+/g, "");
    const expiry = (paymentInfo.expiry || "").trim();
    const cvc = (paymentInfo.cvc || "").trim();

    if (name.length < 2) return toast({ title: "Erreur", description: "Nom du titulaire invalide." });
    if (!/^[0-9]{12,19}$/.test(number)) return toast({ title: "Erreur", description: "Numéro de carte invalide." });
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) return toast({ title: "Erreur", description: "Date d'expiration invalide (MM/AA)." });
    if (!/^[0-9]{3,4}$/.test(cvc)) return toast({ title: "Erreur", description: "CVC invalide." });

    try {
      setProcessing(true);
      // Simulate network/payment processing delay
      await new Promise((res) => setTimeout(res, 1200));

      // Payment simulated successful: clear cart
      localStorage.removeItem(CART_KEY);
      setItems([]);
      toast({ title: "Paiement effectué", description: `Merci ! Montant débité: ${total.toFixed(2)}€` });
      // redirect to confirmation or dashboard
      window.location.href = "/dashboard";
    } catch (e) {
      console.error(e);
      toast({ title: "Erreur", description: "Le paiement a échoué." });
    } finally {
      setProcessing(false);
    }
  };

  const handlePay = () => {
    // Show payment form instead of direct simulation
    setShowPaymentForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Paiement</h1>
          <Card>
            <CardContent>
              {items.length === 0 && <p className="text-muted-foreground">Votre panier est vide.</p>}
              {items.map((c) => (
                <div key={c.id} className="mb-4 flex items-center gap-4">
                  <img src={c.image} alt={c.title} className="h-16 w-24 object-cover" />
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.platform}</div>
                  </div>
                  <div className="ml-auto font-semibold">{typeof c.price === 'string' ? c.price : `${c.price}€`}</div>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-bold">{total.toFixed(2)}€</div>
              </div>

              {/* Payment flow: show form when requested */}
              {!showPaymentForm && (
                <div className="mt-6">
                  <Button onClick={handlePay} disabled={items.length === 0}>Payer</Button>
                </div>
              )}

              {showPaymentForm && (
                <div className="mt-6 grid gap-3">
                  <div className="text-sm text-muted-foreground">Entrez vos informations de carte (simulation).</div>
                  <Input placeholder="Nom sur la carte" value={paymentInfo.name} onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})} />
                  <Input placeholder="Numéro de carte (ex: 4111 1111 1111 1111)" value={paymentInfo.number} onChange={(e) => setPaymentInfo({...paymentInfo, number: e.target.value})} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="MM/AA" value={paymentInfo.expiry} onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})} />
                    <Input placeholder="CVC" value={paymentInfo.cvc} onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={confirmPayment} disabled={processing}>Confirmer et Payer</Button>
                    <Button variant="ghost" onClick={() => setShowPaymentForm(false)} disabled={processing}>Annuler</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
