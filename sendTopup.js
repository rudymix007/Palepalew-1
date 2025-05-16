export default async function handler(req, res) {
    const { number, amount } = req.body;
    const fetch = (await import('node-fetch')).default;

    const token = process.env.RELOADLY_TOKEN; // Sekirize token

    const response = await fetch("https://topups.reloadly.com/topups", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/com.reloadly.topups-v1+json",
            "Content-Type": "application/json"
        },body: JSON.stringify({
            recipientPhone: { countryCode: "HT", number },
            operatorId: 173,
            amount,
            useLocalAmount: false
        })
    });

    const data = await response.json();

    res.status(200).json({
        success: response.ok,
        message: response.ok ? "✅ Minit voye avèk siksè!" : data.message || "❌ Erè pandan voye minit"
    });
}


    
