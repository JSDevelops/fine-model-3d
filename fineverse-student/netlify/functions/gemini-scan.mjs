// Server-side proxy for Gemini image analysis.
//
// The Gemini API key is a real secret and must never be shipped in the client
// bundle. This function holds it server-side and forwards the vision request,
// returning Gemini's raw response so the client can parse it unchanged.
export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  if (!apiKey || apiKey === 'your_gemini_key') {
    // Signal the client to fall back to its local mock classifier.
    return new Response(JSON.stringify({ error: 'gemini_unconfigured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let image
  try {
    ({ image } = await req.json())
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!image) {
    return new Response(JSON.stringify({ error: 'missing_image' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Identify the service or hospitality-related object in the picture. Respond ONLY in valid JSON format. JSON schema: {"object_name_en": string, "object_name_th": string, "description_en": string, "description_th": string, "practice_phrase_en": string}. Do not wrap the response in markdown blocks.',
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('Gemini proxy request failed:', e)
    return new Response(JSON.stringify({ error: 'gemini_request_failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
