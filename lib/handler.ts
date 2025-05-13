import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.NEXT_PUBLIC_APIKEY
const ai = new GoogleGenAI({apiKey})



export const getData = async(prevValue:any,formData:FormData) =>{
    const word = formData.get("word")
    const category = formData.get("category");
    if(!word || !category){
        return {error:"Заполните все поля"}
    }
    const prompt = `Составь художественный рассказ по слову "${word}" и категории "${category}". 
    Верни только JSON-объект формата: 
    { "title": "...", "content": "..." }
    Без комментариев, без форматирования, без \`\`\`json и \`\`\` — только сам JSON-объект.`;
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: prompt
    })
    try{
        const responseText = response.text?.replaceAll("*","")
        const cleanedText = responseText!.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '')
        const story = JSON.parse(cleanedText)
        return {story}
    }
    catch (error){
        return {error:"Произошла ошибка,попробуйте ещё раз"}
    }
    
}
export const getSound = (text:string) =>{

}