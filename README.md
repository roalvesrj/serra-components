# 🏔️ Serra Components

![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=flat&logo=vite&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-ES2023-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Web Components](https://img.shields.io/badge/Web%20Components-Custom%20Elements-1565C0?style=flat&logo=webcomponents.org&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Bundle Size](https://img.shields.io/badge/Bundle%20Size-9.32kB-brightgreen)
![Gzipped](https://img.shields.io/badge/Gzipped-2.42kB-brightgreen)

> **Biblioteca moderna de Web Components em Vanilla JavaScript com design profissional e API em português brasileiro.**

Serra Components é uma biblioteca leve e eficiente que oferece componentes reutilizáveis para aplicações web modernas, desenvolvida com foco em performance, acessibilidade e facilidade de uso.

## ✨ Características

- 🚀 **Super Leve**: Apenas 2.42kB gzipped
- 🔥 **Zero Dependências**: Vanilla JavaScript puro
- 🌐 **Web Components**: Compatível com qualquer framework
- 🎨 **Design Responsivo**: Funciona em todos os dispositivos
- 🇧🇷 **API em Português**: Interface em português brasileiro
- ⚡ **Vite + Terser**: Build otimizado para produção
- 🧪 **100% Testado**: 70 testes automatizados
- 🛡️ **TypeScript Ready**: Definições de tipos incluídas
- 📱 **Shadow DOM**: Encapsulamento completo de estilos

## 📦 Componentes Inclusos

### 🔄 SerraLoader
Componente de carregamento profissional com:
- Animação suave de pontos deslizantes
- Logo customizável via SVG
- Mensagens dinâmicas
- Design responsivo
- Cores customizáveis via CSS variables

### 🍔 SerraMegaMenu  
Menu dropdown avançado com:
- Animações CSS fluidas
- Múltiplas seções organizadas
- Fechamento automático ao clicar fora
- Estrutura semântica acessível
- Totalmente customizável

## 🚀 Instalação

### Via CDN (Recomendado)
```html
<script src="https://cdn.jsdelivr.net/gh/roalvesrj/serra-components@main/dist/serra-components.iife.js"></script>
```

### Baixar Arquivo Local
1. Baixe `serra-components.iife.js` da pasta `dist/`
2. Inclua no seu projeto:
```html
<script src="path/to/serra-components.iife.js"></script>
```

### Desenvolvimento Local
```bash
# Clone o repositório
git clone https://github.com/roalvesrj/serra-components.git
cd serra-components

# Instale dependências
yarn install

# Execute em modo desenvolvimento
yarn dev

# Build para produção
yarn build
```

## 🎯 Uso Rápido

### SerraLoader

#### Uso via API Global (Recomendado)
```javascript
// Mostrar loader com logo padrão
SerraComponents.carregador.mostrar('Carregando dados...');

// Mostrar com logo customizado
SerraComponents.carregador.mostrar('Processando...', '/meu-logo.svg');

// Mostrar sem logo
SerraComponents.carregador.mostrar('Aguarde...', null);

// Ocultar loader
SerraComponents.carregador.ocultar();

// Atualizar mensagem dinamicamente
SerraComponents.carregador.definirMensagem('Nova mensagem');

// Alterar logo dinamicamente
SerraComponents.carregador.definirLogo('/novo-logo.svg');
```

#### Uso Direto no HTML
```html
<!-- Loader sempre visível -->
<serra-loader mensagem="Carregando..." logo-src="/logo.svg" visivel="true"></serra-loader>

<!-- Loader controlado via JavaScript -->
<serra-loader id="meuLoader" mensagem="Processando dados..."></serra-loader>

<script>
const loader = document.getElementById('meuLoader');
loader.exibir('Nova mensagem');
loader.ocultar();
</script>
```

### SerraMegaMenu

#### HTML Básico
```html
<serra-mega-menu>
  <span slot="gatilho">Abrir Menu</span>
</serra-mega-menu>
```

#### Controle via JavaScript
```javascript
const menu = document.querySelector('serra-mega-menu');

// Abrir menu
menu.abrir();

// Fechar menu
menu.fechar();

// Alternar estado
menu.alternar();

// Eventos customizados
menu.addEventListener('menu-aberto', () => console.log('Menu aberto!'));
menu.addEventListener('menu-fechado', () => console.log('Menu fechado!'));

// API Global - Alternar todos os menus
SerraComponents.megaMenu.alternarTodos();
```

## 🎨 Customização

### Variáveis CSS para SerraLoader
```css
serra-loader {
  --cor-texto-loader: #ffffff;
  --cor-ponto-loader-1: #b8cce0;
  --cor-ponto-loader-2: #96afcd;
  --cor-ponto-loader-3: #7392ba;
  --cor-ponto-loader-4: #5175a7;
  --cor-ponto-loader-5: #2e5894;
}
```

### Exemplo de Customização Completa
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serra Components - Demo</title>
  <style>
    /* Customização do loader */
    serra-loader {
      --cor-texto-loader: #2c3e50;
      --cor-ponto-loader-1: #e74c3c;
      --cor-ponto-loader-2: #e67e22;
      --cor-ponto-loader-3: #f39c12;
      --cor-ponto-loader-4: #27ae60;
      --cor-ponto-loader-5: #3498db;
    }
  </style>
</head>
<body>
  <h1>Minha Aplicação</h1>
  
  <!-- Botões de controle -->
  <button onclick="SerraComponents.carregador.mostrar('Carregando...')">
    Mostrar Loader
  </button>
  
  <button onclick="SerraComponents.carregador.ocultar()">
    Ocultar Loader
  </button>
  
  <!-- Menu dropdown -->
  <serra-mega-menu>
    <span slot="gatilho">Menu Principal</span>
  </serra-mega-menu>
  
  <script src="serra-components.iife.js"></script>
</body>
</html>
```

## 🧪 Testes

O projeto possui cobertura completa de testes com **70 testes automatizados**:

```bash
# Executar todos os testes
yarn test

# Executar testes uma vez
yarn test:run

# Executar testes com cobertura
yarn test:coverage
```

### Estrutura de Testes
- **serra-components.test.js** - Testes da biblioteca principal e API global
- **serra-loader.test.js** - Testes específicos do componente SerraLoader  
- **serra-mega-menu.test.js** - Testes específicos do componente SerraMegaMenu

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- Yarn ou npm

### Scripts Disponíveis
```bash
yarn dev          # Servidor de desenvolvimento
yarn build        # Build para produção
yarn build:force  # Build sem validações
yarn test         # Testes em modo watch
yarn test:run     # Executar testes uma vez
yarn lint         # Verificar código
yarn lint:fix     # Corrigir problemas de linting
yarn format      # Formatar código com Prettier
```

### Tecnologias Utilizadas

#### 🏗️ Build & Desenvolvimento
- **Vite 7.1.6** - Build tool ultra-rápido
- **Terser** - Minificação avançada com remoção de debug
- **ESLint 9.x** - Linting com configuração moderna
- **Prettier 3.6.2** - Formatação automática de código

#### 🧪 Testes & Qualidade
- **Vitest 3.2.4** - Framework de testes rápido
- **Happy DOM** - Ambiente DOM para testes
- **70 testes** cobrindo todos os componentes e APIs

#### 🎨 Web Components
- **Custom Elements API** - Elementos customizados nativos
- **Shadow DOM** - Encapsulamento completo de estilos
- **Observed Attributes** - Reatividade nativa
- **Vanilla JavaScript ES2023** - Sem dependências externas

### Estrutura do Projeto
```
serra-components/
├── src/
│   ├── components/
│   │   ├── SerraLoader.js      # Componente de carregamento
│   │   └── SerraMegaMenu.js    # Componente de menu dropdown
│   └── serra-components.js     # Entry point e API global
├── tests/
│   ├── serra-components.test.js    # Testes principais
│   ├── serra-loader.test.js        # Testes do loader
│   └── serra-mega-menu.test.js     # Testes do menu
├── public/
│   └── javascript-logo.svg     # Logo de exemplo
├── dist/
│   └── serra-components.iife.js # Bundle final minificado
├── vite.config.js               # Configuração do Vite
├── eslint.config.js            # Configuração do ESLint
└── package.json                # Dependências e scripts
```

## 🔧 Configuração Avançada

### Remoção Automática de Debug
O build de produção remove automaticamente:
- `console.log()`, `console.info()`, `console.debug()`, `console.trace()`
- Statements `debugger`
- Código morto (dead code)
- Comentários

### Otimizações de Bundle
- **Tree shaking** automático
- **Minificação Terser** com 2 passadas
- **Inlining de assets** (CSS, SVG, etc.)
- **Compressão gzip** otimizada

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: ✨ adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Convenções de Commit
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) com [Gitmojis](https://gitmoji.dev/):

- `feat: ✨` - Nova funcionalidade
- `fix: 🐛` - Correção de bug
- `docs: 📝` - Documentação
- `test: ✅` - Testes
- `refactor: ♻️` - Refatoração
- `style: 💄` - Formatação/estilo
- `perf: ⚡` - Performance

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Vite Team** - Pela ferramenta de build incrível
- **Web Components Community** - Pela padronização dos Custom Elements
- **Open Source Community** - Por todas as ferramentas utilizadas

---

**Desenvolvido com ❤️ por [roalvesrj](https://github.com/roalvesrj)**

---

## 📞 Suporte

- 📧 **Issues**: [GitHub Issues](https://github.com/roalvesrj/serra-components/issues)
- 📖 **Documentação**: [GitHub Wiki](https://github.com/roalvesrj/serra-components/wiki)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/roalvesrj/serra-components/discussions)

---

> 🔗 **Links Úteis**
> - [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
> - [Custom Elements Spec](https://html.spec.whatwg.org/multipage/custom-elements.html)
> - [Shadow DOM Spec](https://dom.spec.whatwg.org/#shadow-trees)
> - [Vite Documentation](https://vitejs.dev/)