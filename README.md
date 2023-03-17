# Digitro mobile

## Pré requisitos

- Node 14+
- `Expo Go` baixado no `android` (você pode encontrar na play store)

## Como executar em Android lendo pela câmera

Necessário estar na mesma rede que o local que está executando a aplicação

1. Instalar as dependências com `yarn` ou `npm i`
2. Executar o projeto com `yarn start` ou `npm start`
3. Abrir o aplicativo `Expo go` e scanear o qr code que vai aparecer no terminal

## Como executar em ios lendo pela câmera

1. Instalar as dependências com `yarn` ou `npm i`
2. Executar o projeto com `yarn start` ou `npm start`
3. Abrir o `aplicativo de câmera` e escanear o qr code que ai aparecer no terminal

## Como executar em Android com o dispositivo conenctado com o pc (como com usb)

1. Instalar as dependências com `yarn` ou `npm i`
2. Executar o projeto com `yarn android` ou `npm run android`

## Como executar em ios com o dispositivo conenctado com o pc (como com usb)

1. Instalar as dependências com `yarn` ou `npm i`
2. Executar o projeto com `yarn ios` ou `npm run ios`

## Erro timeout

Se você receber o erro de timeout ao iniciar a aplicação, quer dizer que a porta por onde você está a executando não está acessível. Aqui está a [solução](https://stackoverflow.com/questions/43593042/network-response-time-out-error-create-react-native-app-expo)

## Testes

Para executar os testes, utilize o comando `npm run test`