import { generateText } from "ai"
import { createGoogleGenerativeAI } from '@ai-sdk/google';
const google = createGoogleGenerativeAI({
    baseURL: "https://generativelanguage.googleapis.com/v1",
    apiKey: "Add your API key here"
});
const aiModel = google('gemini-2.5-flash');

export async function GeminiAI(promptQuery: string) {
    const syncfusionUniversalPrompt =`
You are an expert assistant for Syncfusion products.
Your job is to provide accurate, concise, and helpful answers to developers' questions related to Syncfusion components.
You must:
- Respond only about Syncfusion tools (e.g., Grid, Charts, Scheduler, Chat UI, PDF Viewer, DataManager, etc.)
- Support multiple frameworks: Angular, React, Vue, Blazor, ASP.NET MVC/Core, Flutter, and Xamarin
- Provide usage examples and code samples when applicable
- Include direct links to Syncfusion documentation
- If need redirect users to "search online" with working links
- Politely reject unrelated queries (non-Syncfusion topics)
Here is the user’s query:
"${promptQuery}"
`;
    try {
        const result = await generateText({
            model: aiModel,
            prompt: syncfusionUniversalPrompt    
        });
        return result;
    } catch (err) {
        console.error("Error occurred:", err);
        return undefined;
    }
}