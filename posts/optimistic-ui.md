---
title: Interfaces Otimistas
author: Vitor Sanches
description: Reflexões sobre como e quando melhorar a percepção de desempenho do usuário com interfaces otimistas.
date: 2025-03-08T18:00:00-03:00
tags: ['frontend', 'web development', 'usabilidade', 'ui otimista']
---

Sabemos que performance é um dos quesitos mais importantes na hora de pensar usabilidade. Mas como no front-end conseguimos impactar o fluxo de navegação do usuário sem precisarmos de alguma otimização no back-end?

Existem muitas respostas para isso, e isso vai depender de caso-a-caso, mas uma delas é a utilização de interfaces otimistas.

## O que é uma Interface Otimista?

Uma interface otimista é a interface que exibe para o usuário o resultado de uma requisição realizada com sucesso, mesmo sem a certeza de que obteve sucesso.

Por exemplo, no Instagram ou outras redes sociais, quando clicamos para "curtir" um post, o ícone de coração fica imediatamente vermelho.

Por baixo dos panos, a requisição leva um tempo para retornar, de forma que só depois de alguns milissegundos com o coração vermelho, a aplicação de fato vai confirmar se obteve sucesso na curtida.

Você pode verificar isso abrindo a aba de `Rede` ou `Network` do navegador e tentar curtir algo. O coração vai ser exibido enquanto a requisição ainda está pendente.

## Pontos negativos

É claro que essa estratégia possui alguns impactos. Por exemplo, ainda no Instagram, a parte de comentários não utiliza o conceito de UI otimista justamente porque envolve algo que o usuário digitou, e isso precisa ser validado no back-end.

A chance dessa requisição falhar é um pouco maior que a da curtida.

### O que pode dar errado?

Por exemplo, o que pode dar errado na requisição de curtida é:

1. Algum erro de servidor, então receberemos um erro 500, ou na faixa do 5xx;
2. O post pode ter deixado de existir entre o momento que ele foi carregado e o momento em que foi dado like.

Ambas as situações são bastante raras de acontecer, justamente porque normalmente a ação carregar e curtir costuma ser bastante rápida. O impacto da curtida ser otimista é muito alto. Um delay ou carregamento nessa situação atrapalharia muito o fluxo de navegação e utilização da aplicação.

### Quando a requisição dá errado

O usuário precisa saber se a sua ação não tiver funcionado. Uma curtida do Instagram que não foi computada não é tão impactante, mas um card no trello que não foi corretamente atribuido a um desenvolvedor pode impactar o fluxo de trabalho de uma equipe.

Independente da forma escolhida para avisar o usuário que sua ação não foi realizada com sucesso, é importante termos em mente que isso irá frustrar o usuário.

Demos a ele um sinal positivo, gerando satisfação, e logo depois rompemos essa satisfação com um sinal negativo. A aplicação que parecia rápida, agora parece quebrada.

Às vezes, é melhor que uma aplicação pareça lenta e robusta a rápida e quebrada. Uma aplicação quebrada pode fragilizar a confiança do usuário.

### Whatsapp

Um caso muito interessante é o das mensagens do whatsapp. Se eu envio uma mensagem, ela aparece imediatamente como enviada, mas nós temos o ícone do relógio e dos "checks". Essa foi a forma que os engenheiros e designers do whatsapp encontraram para dizer que a aplicação não enviou de fato a mensagem, ou até que ela ainda não chegou ao seu destino.

Isso é muito importante porque o fluxo de envio de mensagens em uma plataforma de chat deve ser extremamente fluido, mas a informação do estado do envio da mensagem é crítico, e o whatsapp se destaca pela sua robustez.

## Uma escolha muito difícil

Toda escolha tecnológica possui prós e contras. Essa é uma delas, o que torna necessário analisar alguns pontos:

- O quão impactante é a imediatez do feedback dessa interação na experiência do usuário?

  - A existência de um delay ou carregamento nessa requisição vai atrapalhar o fluxo de utilização? Exemplo: delay na exibição de caracteres digitados;

- O que pode dar errado nessa requisição?

- Com qual frequência algo pode dar errado nessa requisição?

- O usuário realmente precisa saber que deu algo de errado?

  - Exemplo: erro na ação de excluir um item que não existe;

- O usuário precisa ter um controle fino de como e quando as ações dele estão sendo sincronizadas?

- A utilização e marketing da aplicação exige que ela aparente ser o mais robusta possível?

Essas são algumas perguntas que devem ser feitas ao considerar interfaces otimistas para a sua aplicação.
