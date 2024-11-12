---
title: Como atingir nota 100 em performance no Lighthouse utilizando o Astro.build?
author: Vitor Sanches
description: Ou, “Por que o Astro é o meu framework front-end preferido?”
date: 2024-05-20T00:00:00-03:00
tags: ['frontend', 'web development', 'performance', 'astro']
---

## 01. O que é o Astro?

Astro é um framework com foco em criação de websites orientados a conteúdo e web apps.

## 02. Por que o Astro?

### MPA

O diferencial do Astro é que, ao invés de implementar o conceito de SPA (Single-Page Application) como outros frameworks, ele utiliza o conceito de Multi-Page Application. Por conta disso, ele tem um tempo de carregamento inicial reduzido por padrão, já que apenas a página acessada será carregada.

### Agnóstico a plataformas

Outra coisa muito interessante é que o astro é platform agnostic. Isso significa que ele possui várias integrações com vercel, netlify, cloudflare, entre outras, de forma a extrair o melhor de cada uma delas.

### Agnóstico a bibliotecas de componentes

Astro foi criado para também ser agnóstico a bibliotecas de componentes, então ele aceita componentes react, preact, vue, entre outros. Apesar disso, ele também tem seu próprio modelo de escrita de componentes, que é bem simples e costuma ser suficiente na maior parte dos casos.

### Integrações

Isso, na minha opinião, é o que faz o astro ser extremamente avançado em termos de experiência do desenvolvedor (DX). A facilidade para adicionar funcionalidades e comportamentos no Astro é fora do comum. Você pode adicionar suporte ao tailwind, mdx, partytown, sitemap, entre outros. Basta executar um comando:

```sh
astro add <nome da integração>
```

Recomendo olhar a [página de Integrações do astro](https://astro.build/integrations)

## 03. Server-side Rendering

O Astro utiliza server-side rendering por padrão. Ele se baseia no conceito de “interactive islands”, ou ilhas interativas. Isso significa que ele só irá enviar para o cliente o javascript que for realmente necessário para promover alguma interatividade. Isso faz com que o bundle da aplicação seja extremamente reduzido, tornando o site mais performático, e te dando alguns pontinhos no score do Lighthouse.

## 04. Cache de CDN

Algumas integrações do astro possuem suporte para cache de CDN. Nesse caso, eu utilizei a vercel, mas o netlify também suporta cache, por exemplo.

O cache de CDN possibilita que tenhamos uma cópia estática do site em um servidor fisicamente próximo ao usuário, reduzindo consideravelmente o tempo de requisição. Também podemos adicionar o tempo que esse cache permanecerá válido em segundos. Após esse tempo, a requisição será feita no servidor principal, e a versão atualizada da página será cacheada em CDN novamente.

Para isso, basta adicionar a seguinte linha:

```js
Astro.response.headers.set(‘CDN-Cache-Control’, ‘public, max-age=43200, must-revalidate’);
```

Onde max-age é o tempo em segundos que o cache continuará válido. Nesse caso, 12 horas.

Para mais informações, recomendo ver [a página de Server-side Rendering da documentação do astro](https://docs.astro.build/pt-br/guides/server-side-rendering/)

## 05. Otimização de Imagens

Muitas vezes você está buscando imagens de alguma integração externa em que você não tem controle se elas estão otimizadas, o que pode atrapalhar muito o desempenho do seu site ou aplicação.
Para isso, o astro possui um componente de imagem que pode ser importado de `astro:assets`, possibilitando a configuração de tamanhos diferentes de imagens para telas diferentes, além de automaticamente converter o formato da imagem para webp.

```jsx
<Image
  alt=""
  src={video.thumbnail.url}
  widths={[300, 370, video.thumbnail.width || 480]}
  sizes={`
    (max-width: 370px): 300px,
    (max-width: 440px): 370px,
    ${video.thumbnail.width || 480}px
  `}
  width={video.thumbnail.width || 480}
  height={video.thumbnail.height || 480}
/>
```

## 06. Edge Middleware

Este ponto é um pouco mais específico para as integrações com a Vercel, Netlify e Cloudflare. Essas plataformas possuem o recurso de executar funções serverless na borda. Isso significa que o processamento que realiza a renderização do lado do servidor será executado, fisicamente falando, o mais próximo possível do usuário. Isso faz com que o tempo de resposta do servidor seja reduzido, já que a latência da transferência de dados é reduzida.
Vale conferir a documentação para cada integração separadamente, mas o padrão é adicionar na configuração de adapter o atributo:

```js
edgeMiddleware: true;
```

## 07. Algumas considerações finais

- É claro que, quanto mais interativo for seu site, mais javascript será enviado ao cliente, e menos performático ele será. É uma questão de entender o que é melhor para cada caso.

- Lembre-se sempre rodar o Lighthouse em uma guia anônima, pois, caso você tenha alguma extensão instalada no navegador, ela pode prejudicar muito o resultado.

- O Lighthouse é apenas um guia para encontrar pontos de melhoria. Não ter uma nota 100 não significa nada, assim como ter uma nota 100 também não significa muita coisa. No fim, o real objetivo é promover uma boa experiência do usuário.
