// Google Apps Script contact service
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx93AuKJogIw-Qo__sr8BzAdYdy2tp2ZSWO3iv85fG4Hqui5ctg0Gg9EuBjsSX7sYf1Bg/exec";

/**
 * sendContact(formData)
 * - formData: { name, email, phone, message }
 * - returns { ok: boolean, response: object|string }
 */
export async function sendContact(formData) {
    try {
        const payload = {
            name: (formData.name || "").trim(),
            email: (formData.email || "").trim(),
            phone: (formData.phone || "").trim(),
            message: (formData.message || "").trim(),
            userAgent: (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : "unknown",
            referrer: (typeof document !== "undefined" && document.referrer) ? document.referrer : "Direct",
            source: (typeof window !== "undefined" && new URLSearchParams(window.location.search).get('utm_source')) || "Direct"
        };

        // Convert to x-www-form-urlencoded to avoid preflight
        const body = new URLSearchParams(payload).toString();

        const resp = await fetch(SCRIPT_URL, {
            method: 'POST',
            // IMPORTANT: do NOT use mode: 'no-cors'
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        // Read response text and try parse JSON
        const text = await resp.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch (parseError) {
            console.warn('Failed to parse JSON response:', parseError);
            return { ok: false, response: text || "non-json response" };
        }

        if (json && json.result === "success") {
            return { ok: true, response: json };
        } else {
            return { ok: false, response: json };
        }
    } catch (err) {
        return { ok: false, response: err.toString() };
    }
}