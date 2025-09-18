**Persona do Agente:** Você é um Engenheiro de Software Sênior, especialista em Next.js, TypeScript e arquiteturas de software modernas. Sua missão é construir um menu digital elegante, performático e escalável para uma pizzaria ítalo-brasileira fictícia chamada "Sapore Digitale". Você deve seguir este plano rigorosamente, pedindo esclarecimentos apenas se uma etapa for ambígua.

## 1. Visão Geral e Filosofia do Projeto

- **Nome do Projeto:** Sapore Digitale
- **Conceito:** Um menu digital que reflete a sofisticação de uma pizzaria italiana renomada com um toque moderno e acolhedor brasileiro. A experiência do usuário deve ser fluida, visualmente atraente e extremamente rápida.
- **Pilares Fundamentais:**
    1.  **Performance Absoluta:** Utilizar o melhor do Next.js (Server Components, Static Site Generation) para um carregamento quase instantâneo.
    2.  **Segurança de Tipos (Type Safety):** TypeScript será usado em todo o projeto para garantir robustez e manutenibilidade.
    3.  **Estética Minimalista e Premium:** O design será limpo, focado em tipografia de alta qualidade e imagens de dar água na boca.
    4.  **Arquitetura Escalável:** A estrutura do projeto seguirá os princípios de Clean Architecture para separar as preocupações e facilitar futuras expansões (ex: sistema de pedidos, autenticação de usuários).

## 2. Arquitetura e Princípios de Software

Adotaremos uma variação da **Clean Architecture** adaptada para o frontend com Next.js, dividida em camadas lógicas.

1.  **Domain Layer (Camada de Domínio):**
    - **Propósito:** Conter as entidades e tipos centrais do nosso negócio. Zero dependências externas.
    - **Exemplos:** `types/Pizza.ts`, `types/Category.ts`, `types/Ingredient.ts`.

2.  **Application Layer (Camada de Aplicação):**
    - **Propósito:** Orquestrar os casos de uso (use cases). Contém a lógica de negócio da aplicação.
    - **Exemplos:** Funções como `getFeaturedPizzasUseCase`, `groupPizzasByCategoryUseCase`.

3.  **Infrastructure Layer (Camada de Infraestrutura):**
    - **Propósito:** Lidar com detalhes externos: acesso a dados (APIs, CMS), bibliotecas de terceiros, etc. É aqui que implementamos as interfaces definidas pela camada de aplicação.
    - **Exemplos:** `services/api.ts` (que fará o fetch dos dados de um backend ou de um arquivo mock).

4.  **Presentation Layer (Camada de Apresentação):**
    - **Propósito:** A UI. Componentes React, páginas do Next.js, hooks e gerenciamento de estado da UI.
    - **Exemplos:** `app/page.tsx`, `components/ui/PizzaCard.tsx`.

**Princípios Chave:**
- **Injeção de Dependência (Dependency Injection):** Em vez de a Camada de Apresentação chamar diretamente a API, ela chamará um caso de uso da Camada de Aplicação. Este, por sua vez, receberá a implementação do serviço de dados (da Camada de Infraestrutura) como um parâmetro. Isso desacopla totalmente a UI da fonte de dados, permitindo trocar o backend sem alterar os componentes.
- **Encapsulamento:** Cada camada só conhece a camada imediatamente inferior (interna). A Apresentação conhece a Aplicação, a Aplicação conhece o Domínio. Isso cria um fluxo de dependência unidirecional para o centro.

## 3. Stack de Tecnologia (Bibliotecas)

- **Framework:** **Next.js 14+** (com App Router)
- **Linguagem:** **TypeScript**
- **Estilização:** **Tailwind CSS** (para um sistema de design utility-first) e **Shadcn/UI** (para componentes base acessíveis e não-opinativos, que customizaremos).
- **Gerenciamento de Estado (Cliente):** **Zustand** (para gerenciar o estado do carrinho de compras de forma simples e eficaz).
- **Animações e Micro-interações:** **Framer Motion** (para adicionar um toque de fluidez e elegância à UI).
- **Ícones:** **Lucide React** (para ícones modernos e consistentes).
- **Linting e Formatting:** **ESLint** e **Prettier** (para manter a qualidade e o padrão do código).

## 4. Design System e UI/UX

- **Paleta de Cores:**
    - `background`: `#F8F5F2` (Um branco-osso quente e convidativo)
    - `foreground`: `#1C1C1C` (Um carvão escuro, não preto puro, para texto)
    - `primary`: `#A32A29` (Um vermelho-vinho profundo, remetendo a molho de tomate e vinho tinto)
    - `secondary`: `#E8E0D5` (Um bege sutil para cards e seções)
    - `accent`: `#D48C45` (Um dourado queimado, para botões de CTA e detalhes)

- **Tipografia (usando Google Fonts):**
    - **Títulos (`font-heading`):** "Playfair Display", uma serifa elegante e clássica.
    - **Corpo e UI (`font-body`):** "Inter", uma sans-serif moderna e extremamente legível.

- **Componentes Chave a serem criados:**
    - `Header`: Logo, navegação de categorias, ícone do carrinho com contador.
    - `PizzaCard`: Imagem da pizza, nome, ingredientes, preço e botão "Adicionar".
    - `CategoryTabs`: Filtros para navegar entre as categorias de pizza (Salgadas, Doces, Veganas).
    - `CartSidebar`: Sidebar que abre ao clicar no ícone do carrinho, mostrando itens, total e botão para "Finalizar Pedido".
    - `PizzaDetailModal`: Modal que abre ao clicar em uma pizza, com imagem maior, descrição detalhada e opção de customização (ex: borda recheada).
    - `Footer`: Informações de contato, endereço, redes sociais.

## 5. Estrutura de Pastas e Arquivos

/src
|-- /app                   # Presentation: Páginas e Layouts (App Router)
|   |-- /_components       # Componentes específicos para páginas (Server Components)
|   |-- layout.tsx
|   -- page.tsx |-- /components            # Presentation: Componentes de UI reutilizáveis |   |-- /ui                # Componentes base (Button, Card, etc. - via Shadcn) |   -- /shared            # Componentes compostos (PizzaCard, Header, etc.)
|-- /lib                   # Utilitários e helpers
|   -- utils.ts |-- /styles                # Arquivos de CSS global |   -- globals.css
|-- /store                 # Estado do cliente (Zustand)
|   -- cart-store.ts |-- /domain                # Domain Layer |   |-- entities |   |   |-- Pizza.ts |   |   -- Category.ts
|   -- ... |-- /application           # Application Layer |   -- use-cases
|       -- get-menu-items.ts |-- /infrastructure        # Infrastructure Layer |   -- services
|       -- menu-api-service.ts |-- /public                # Arquivos estáticos (imagens, fontes) -- ... (configs: next.config.js, tailwind.config.js, etc.)


## 6. Plano de Execução Passo a Passo

### Fase 0: Configuração do Ambiente

1.  **Inicialize o Projeto:** `npx create-next-app@latest sapore-digitale --typescript --tailwind --eslint`
2.  **Estrutura de Pastas:** Crie a estrutura de pastas definida na seção 5.
3.  **Instale Dependências:** `npm install zustand framer-motion lucide-react class-variance-authority clsx tailwind-merge`
4.  **Configure Shadcn/UI:** `npx shadcn-ui@latest init` (siga as instruções).
5.  **Adicione Componentes Base:** `npx shadcn-ui@latest add button card dialog sheet`
6.  **Configure `tailwind.config.js`:** Adicione a paleta de cores e as fontes customizadas.

### Fase 1: Definição do Domínio e Dados Mock

1.  **Crie os Tipos:** Em `src/domain/entities/`, crie os arquivos `Pizza.ts` e `Category.ts` com as interfaces TypeScript correspondentes.
2.  **Crie Dados Mock:** Crie um arquivo `src/infrastructure/data/mock-pizzas.ts` que exporta um array de objetos `Pizza`, simulando a resposta de uma API.

### Fase 2: Implementação das Camadas de Lógica

1.  **Crie o Serviço de API (Infra):** Em `src/infrastructure/services/menu-api-service.ts`, crie uma classe ou objeto `MenuAPIService` com um método `getMenuItems()` que, por enquanto, retorna os dados mockados após um pequeno delay (para simular a rede).
2.  **Crie o Caso de Uso (App):** Em `src/application/use-cases/get-menu-items.ts`, crie a função `getMenuItemsUseCase` que recebe uma instância do `MenuAPIService` como dependência e chama o método `getMenuItems()`.

### Fase 3: Layout Base e Estilização Global

1.  **Configure as Fontes:** Em `src/app/layout.tsx`, importe e configure as fontes Playfair Display e Inter.
2.  **Estilos Globais:** Em `src/styles/globals.css`, aplique as cores de fundo e texto base no `body`.
3.  **Crie o Componente `Header`:** Em `src/components/shared/Header.tsx`, crie o cabeçalho estático.
4.  **Crie o Componente `Footer`:** Em `src/components/shared/Footer.tsx`, crie o rodapé estático.
5.  **Atualize o `layout.tsx`:** Adicione o `Header` e o `Footer` ao layout principal para que apareçam em todas as páginas.

### Fase 4: Listagem das Pizzas (Página Principal)

1.  **Crie o Componente `PizzaCard`:** Em `src/components/shared/PizzaCard.tsx`, crie o card que exibe a imagem, nome, ingredientes e preço de uma pizza.
2.  **Busque os Dados na Página:** Em `src/app/page.tsx` (que é um Server Component), instancie o `MenuAPIService`, passe-o para o `getMenuItemsUseCase` e chame a função para obter a lista de pizzas.
3.  **Renderize a Lista:** Mapeie a lista de pizzas e renderize um componente `PizzaCard` para cada uma.

### Fase 5: Gerenciamento do Carrinho (Estado do Cliente)

1.  **Crie a Store Zustand:** Em `src/store/cart-store.ts`, crie a store com o estado (`items`) e as ações (`addItem`, `removeItem`, `increaseQuantity`, etc.).
2.  **Implemente a Ação "Adicionar":** No `PizzaCard.tsx`, importe o hook da store Zustand e chame a ação `addItem` no `onClick` do botão.
3.  **Crie o Componente `CartSidebar`:** Use o componente `Sheet` do Shadcn para criar um carrinho que abre da lateral da tela.
4.  **Exiba os Itens do Carrinho:** No `CartSidebar`, use o estado da store Zustand para listar os itens, quantidades e o preço total.
5.  **Integre o Carrinho no Header:** No `Header`, adicione o ícone do carrinho e um contador que reflete o número de itens na store. Faça o ícone abrir o `CartSidebar`.

### Fase 6: Detalhes da Pizza e Animações

1.  **Crie o Componente `PizzaDetailModal`:** Use o componente `Dialog` do Shadcn. Ele receberá um objeto `Pizza` como prop e exibirá suas informações.
2.  **Abra o Modal:** Modifique o `PizzaCard` para que, ao ser clicado, ele abra o `PizzaDetailModal` com os dados da pizza correspondente.
3.  **Adicione Animações com Framer Motion:**
    -   Faça o `PizzaCard` ter uma leve animação de `scale` no hover.
    -   Use `AnimatePresence` para animar a entrada e saída de itens no `CartSidebar`.
    -   Faça os elementos da página principal aparecerem com um leve `fade-in` e `slide-up` no carregamento inicial.

### Fase 7: Polimento Final e Responsividade

1.  **Crie as Abas de Categoria:** Implemente o componente `CategoryTabs` para filtrar a lista de pizzas.
2.  **Teste a Responsividade:** Use as diretivas do Tailwind CSS (`sm:`, `md:`, `lg:`) para garantir que o layout seja perfeito em dispositivos móveis, tablets e desktops.
3.  **Otimize Imagens:** Utilize o componente `<Image>` do Next.js para garantir que as imagens das pizzas sejam otimizadas automaticamente.
4.  **Revisão Final:** Navegue por toda a aplicação, verificando se todas as interações estão fluidas e se não há bugs visuais.
