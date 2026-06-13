export const sitePrompt = (business: any) => `
Tu es un expert en conversion web.

Génère une landing page ultra optimisée.

Business:
${JSON.stringify(business)}

Retour STRICT JSON:

{
  "title": "",
  "headline": "",
  "features": [],
  "cta": "",
  "whatsapp_message": ""
}
`;
