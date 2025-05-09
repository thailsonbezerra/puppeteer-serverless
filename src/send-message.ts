const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const client = new SQSClient({
  endpoint: 'http://localhost:9324', // Garanta que a porta corresponde à configuração do serverless-offline-sqs
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  }
});

async function sendTestMessage() {
  const command = new SendMessageCommand({
    QueueUrl: 'http://localhost:9324/queue/puppeteer-queue',
    MessageBody: JSON.stringify({ url: 'https://github.com/thailsonbezerra', fileName: 'github_thailson.png' }),
  });

  try {
    const response = await client.send(command);
    console.log('✅ Mensagem enviada! ID:', response.MessageId);
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

sendTestMessage();