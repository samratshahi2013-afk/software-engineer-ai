const { Ollama } = require('ollama');

const ollama = new Ollama({
  host: 'http://127.0.0.1:11434',
});

async function main() {
  try {
    const response = await ollama.chat({
      model: 'deepseek-coder:latest',
      messages: [
        {
          role: 'user',
          content: 'Hello! Tell me who you are in one sentence.'
        }
      ]
    });

    console.log(response.message.content);
  } catch (error) {
    console.error(error);
  }
}

main();