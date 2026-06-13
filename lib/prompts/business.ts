export const businessPrompt = (input: any) => `
Tu es un expert mondial en stratégie business et marketing.

Crée un business ultra rentable basé sur ces données :

Nom: ${input.name}
Activité: ${input.activity}
Pays: ${input.country}

Retour STRICT JSON:

{
  "positioning": "",
  "offer": "",
  "pricing": "",
  "target_customer": "",
  "sales_message": "",
  "cta": ""
}
`;
