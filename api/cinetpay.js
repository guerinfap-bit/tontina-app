export default async function handler(req, res) {
  // Autoriser les requêtes depuis l'app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { plan_name, amount, customer_name, customer_phone, customer_email } = req.body;

  if (!plan_name || !amount || !customer_name || !customer_phone) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const transactionId = "GTONTINA-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const payload = {
    apikey: process.env.VITE_CINETPAY_API_KEY,
    site_id: process.env.VITE_CINETPAY_SITE_ID,
    transaction_id: transactionId,
    amount: amount,
    currency: "XAF",
    description: `Abonnement GTONTINA ${plan_name}`,
    notify_url: "https://tontina-app.vercel.app/api/cinetpay-notify",
    return_url: "https://tontina-app.vercel.app/?payment=success",
    channels: "MOBILE_MONEY",
    lang: "fr",
    customer_name: customer_name,
    customer_surname: customer_name,
    customer_email: customer_email || "client@gtontina.com",
    customer_phone_number: customer_phone,
    customer_address: "Cameroun",
    customer_city: "Douala",
    customer_country: "CM",
    customer_state: "CM",
    customer_zip_code: "00237",
  };

  try {
    const response = await fetch(`${process.env.VITE_CINETPAY_BASE_URL}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur", detail: error.message });
  }
}
