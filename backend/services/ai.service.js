import fetch from 'node-fetch';

const summariseIncident = async (description) => {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: `mistral`,
            prompt: `
            Summarise the following incident description in ONE concise sentence.
            Be neutral and factual.
            Do not suggest solutions.
            
            Description:
            ${description}
            `,
            stream: false
        })
    });

    const data = await response.json();
    return data.response.trim();
};

export default summariseIncident;