---
title: Scripts de terceiros em segundo plano com PartyTown
author: Vitor Sanches
description: Melhore o desempenho do seu site ao delegando scripts de terceiros para web workers.
date: 2025-03-08T00:00:00-03:00
tags: ['frontend', 'web development', 'performance', 'partytown']
---

Um grande problema quando estamos trabalhando com aplicações web é o impacto no desempenho que scripts de terceiros podem causar no nosso site.

Quando o navegador executa scripts síncronos, ele por padrão o faz na thread principal, a mesma que fica responsável pela renderização do conteúdo da página.

Compartilhar a thread responsável pela renderização da página com processos síncronos longos pode causar congelamentos e lentidões inesperadas no fluxo de renderização da nossa aplicação.

Exemplo: Abra o console do navegador e digite

```js
while(true)
```

Execute (`Enter`) e tente realizar alguma interação com a página. Toda a página e suas interações estarão congeladas porque a thread que processa os eventos da DOM está ocupada executando o seu loop.

## Delegando para web workers

Esses congelamentos podem ser contornados se delegarmos a execução desses scripts para web workers, que serão executados em threads separadas, deixando a thread principal livre para processar eventos e renderizações.

```js
// workerService.js
onmessage = ({ data }) => {
  const processedData = process(data);
};

// index.js
const worker = new Worker('workerService.js');
```

No entanto, trabalhar com web workers pode ser trabalhoso na maior parte dos casos, principalmente pelo fato de workers não possuírem acesso à DOM. Para acessar a DOM e, por exemplo, processar um input do usuário, faríamos algo como:

```js
// index.js
document.querySelector('#field').addEventListener('change', (e) => {
  const { value } = e.target;
  worker.postMessage(value);
});
```

Mas fazer isso em scripts de terceiros passa a ser bem mais penoso, já que teríamos que identificar esses acessos à DOM no código terceiro e executá-los na thread principal, delegando para os workers somente o que ele tem a capacidade de processar.

É nesse contexto que surge o PartyTown 🎉

## PartyTown

O PartyTown é uma biblioteca que possibilita executar os scripts de terceiros em worker threads, lidando com quaisquer acessos à DOM automaticamente.

Basta adicionar "text/partytown” no atributo “type” do script.

```js
<​script type="text/partytown">...<​/script>
```

Para configurarmos o gtag (Google Analytics e Tag Manager), por exemplo, adicionamos:

```js
<body>
  <​script
    type="text/partytown"
    src="https://www.googletagmanager.com/gtag/js?id=SEU-ID-AQUI"
  ><​/script>

  <​script type="text/partytown">
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'SEU-ID-AQUI');
  <​/script>
</body>
```

Como o gtag utiliza o `window.dataLayer` para enviar eventos, precisamos dizer ao partytown que esses eventos precisam ser reencaminhados, já que ele será executado em um worker. Para isso, adicionamos dentro da tag `head`:

```js
<head>
  <​script> partytown = { forward: ['dataLayer.push'] }; <​/script>
  <head></head>
</head>
```

Você pode verificar as [configurações de forwarding para os serviços mais comuns na documentação do partytown](https://partytown.builder.io/common-services)

Simples assim. Agora temos nosso gtag sendo executado em segundo plano na nossa página, evitando que cause lentidões e problemas de desempenho.

Referências e links úteis:

[Como o PartyTown Funciona?](https://partytown.builder.io/how-does-partytown-work)

[Vídeo: How Partytown allows you to run virtually any JS in the worker thread, in depth](https://www.youtube.com/watch?v=eP6Mti85HeQ)
