# Excute localmente

Node v22.14.0

Instalar as dependencias:
npm install

Buildar o projeto:
npm run build

Iniciar servidor SQS (Emular o SQS da AWS localmente):
docker run -d -p 9324:9324 -p 9325:9325 --name elasticmq softwaremill/elasticmq

npm start:local
