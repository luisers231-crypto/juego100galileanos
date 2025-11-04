
import { GoogleGenAI, Type } from "@google/genai";

// Assume process.env.API_KEY is available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "La pregunta para la ronda del juego.",
    },
    answers: {
      type: Type.ARRAY,
      description: "Una lista de 6 respuestas a la pregunta.",
      items: {
        type: Type.OBJECT,
        properties: {
          answer: {
            type: Type.STRING,
            description: "El texto de la respuesta.",
          },
          points: {
            type: Type.INTEGER,
            description: "El puntaje para esta respuesta (de 1 a 100).",
          },
        },
        required: ["answer", "points"],
      },
    },
  },
  required: ["question", "answers"],
};

export const generateRoundData = async () => {
  const prompt = `
    Actúa como un generador de datos para una encuesta del juego '100 Galileanos Dicen'. El tema es la ecología humana, específicamente las relaciones intraespecíficas e interespecíficas (mutualismo, comensalismo, competencia, parasitismo).

    Tu tarea es generar UNA pregunta y exactamente 6 respuestas populares a esa pregunta. Las respuestas deben estar ordenadas de la más popular a la menos popular.

    Asigna puntos a cada respuesta. La suma total de los puntos de todas las respuestas debe ser cercana a 100, pero no necesariamente exacta.

    El formato de salida debe ser un objeto JSON que se ajuste al esquema proporcionado. Las preguntas y respuestas deben ser concisas, claras y estar en español.

    Ejemplos de temas para preguntas:
    - ¿Qué causa la competencia entre individuos de la misma especie?
    - Menciona un ejemplo de mutualismo que involucre a los humanos.
    - Nombra un parásito que afecte comúnmente a los humanos.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    
    // Ensure data structure is correct and add 'revealed' property
    if (data.question && Array.isArray(data.answers)) {
       const formattedAnswers = data.answers.map((a: { answer: string; points: number; }) => ({
          text: a.answer,
          points: a.points,
          revealed: false,
       }));
       return { question: data.question, answers: formattedAnswers };
    } else {
        throw new Error("Formato de datos de la API inválido");
    }

  } catch (error) {
    console.error("Error generando datos del juego:", error);
    throw new Error("No se pudo generar una nueva ronda. Inténtalo de nuevo.");
  }
};
