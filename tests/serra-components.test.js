// Testes Serra Components - Biblioteca Principal e API Global
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/serra-components.js'; // Importar a biblioteca principal

describe('Serra Components - Biblioteca Principal', () => {
  beforeEach(() => {
    // Limpeza para cada teste
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Limpar qualquer loader global criado
    const loadersGlobais = document.querySelectorAll('serra-loader');
    loadersGlobais.forEach(loader => loader.remove());
  });

  describe('Ambiente de Testes - Funcionalidades Base', () => {
    it('deve criar elementos DOM corretamente', () => {
      const div = document.createElement('div');
      div.textContent = 'Olá Mundo';
      document.body.appendChild(div);

      expect(document.body.children).toHaveLength(1);
      expect(div.textContent).toBe('Olá Mundo');
    });

    it('deve suportar Shadow DOM', () => {
      const host = document.createElement('div');
      const shadowRoot = host.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>Conteúdo do Shadow DOM</p>';

      expect(shadowRoot.children).toHaveLength(1);
      expect(shadowRoot.querySelector('p').textContent).toBe(
        'Conteúdo do Shadow DOM'
      );
    });

    it('deve suportar Custom Elements API', () => {
      // Definir um elemento customizado simples para teste
      class ElementoTeste extends HTMLElement {
        constructor() {
          super();
          this.textContent = 'Elemento Customizado';
        }
      }

      // Verificar se não foi definido antes
      expect(() => {
        customElements.define('elemento-teste-base', ElementoTeste);
      }).not.toThrow();

      // Criar e testar o elemento
      const elemento = document.createElement('elemento-teste-base');
      expect(elemento.textContent).toBe('Elemento Customizado');
    });
  });

  describe('Registro de Componentes', () => {
    it('deve registrar serra-loader como custom element', () => {
      const loader = document.createElement('serra-loader');
      expect(loader).toBeInstanceOf(HTMLElement);
      expect(loader.shadowRoot).toBeTruthy();
    });

    it('deve registrar serra-mega-menu como custom element', () => {
      const menu = document.createElement('serra-mega-menu');
      expect(menu).toBeInstanceOf(HTMLElement);
      expect(menu.shadowRoot).toBeTruthy();
    });
  });

  describe('API Global - SerraComponents', () => {
    it('deve expor API global no window', () => {
      expect(window.SerraComponents).toBeDefined();
      expect(typeof window.SerraComponents).toBe('object');
    });

    it('deve ter API do carregador', () => {
      expect(window.SerraComponents.carregador).toBeDefined();
      expect(typeof window.SerraComponents.carregador.mostrar).toBe('function');
      expect(typeof window.SerraComponents.carregador.ocultar).toBe('function');
      expect(typeof window.SerraComponents.carregador.definirMensagem).toBe(
        'function'
      );
      expect(typeof window.SerraComponents.carregador.definirLogo).toBe(
        'function'
      );
    });

    it('deve ter API do mega menu', () => {
      expect(window.SerraComponents.megaMenu).toBeDefined();
      expect(typeof window.SerraComponents.megaMenu.alternarTodos).toBe(
        'function'
      );
    });
  });

  describe('API Global do Carregador', () => {
    it('deve criar e mostrar carregador via API global', () => {
      window.SerraComponents.carregador.mostrar('Teste de carregamento');

      const loader = document.querySelector('serra-loader');
      expect(loader).toBeTruthy();
      expect(loader.estaVisivel).toBe(true);
      expect(loader._mensagem).toBe('Teste de carregamento');
    });

    it('deve usar logo padrão do JavaScript quando não especificado', () => {
      window.SerraComponents.carregador.mostrar();

      const loader = document.querySelector('serra-loader');
      expect(loader).toBeTruthy();
      expect(loader._logoSrc).toBe('/javascript-logo.svg');
    });

    it('deve permitir logo customizado', () => {
      window.SerraComponents.carregador.mostrar(
        'Carregando...',
        '/logo-customizado.svg'
      );

      const loader = document.querySelector('serra-loader');
      expect(loader._logoSrc).toBe('/logo-customizado.svg');
    });

    it('deve permitir carregador sem logo', () => {
      window.SerraComponents.carregador.mostrar('Carregando...', null);

      const loader = document.querySelector('serra-loader');
      expect(loader._logoSrc).toBe('');
    });

    it('deve ocultar carregador via API global', () => {
      window.SerraComponents.carregador.mostrar('Teste');
      window.SerraComponents.carregador.ocultar();

      const loader = document.querySelector('serra-loader');
      expect(loader.estaVisivel).toBe(false);
    });

    it('deve reutilizar loader existente', () => {
      // Primeira chamada
      window.SerraComponents.carregador.mostrar('Primeira mensagem');
      const primeiroLoader = document.querySelector('serra-loader');

      // Segunda chamada
      window.SerraComponents.carregador.mostrar('Segunda mensagem');
      const segundoLoader = document.querySelector('serra-loader');

      // Deve ser o mesmo elemento
      expect(primeiroLoader).toBe(segundoLoader);
      expect(document.querySelectorAll('serra-loader')).toHaveLength(1);
    });

    it('deve definir mensagem via API global', () => {
      window.SerraComponents.carregador.mostrar('Mensagem inicial');
      window.SerraComponents.carregador.definirMensagem('Nova mensagem');

      const loader = document.querySelector('serra-loader');
      expect(loader._mensagem).toBe('Nova mensagem');
    });

    it('deve definir logo via API global', () => {
      window.SerraComponents.carregador.mostrar('Teste');
      window.SerraComponents.carregador.definirLogo('/novo-logo.svg');

      const loader = document.querySelector('serra-loader');
      expect(loader._logoSrc).toBe('/novo-logo.svg');
    });

    it('deve funcionar mesmo sem loader existente nas funções auxiliares', () => {
      // Tentar definir mensagem sem loader criado
      expect(() => {
        window.SerraComponents.carregador.definirMensagem('Teste');
        window.SerraComponents.carregador.definirLogo('/teste.svg');
        window.SerraComponents.carregador.ocultar();
      }).not.toThrow();
    });
  });

  describe('API Global do Mega Menu', () => {
    it('deve alternar todos os menus existentes', () => {
      // Criar múltiplos menus
      const menu1 = document.createElement('serra-mega-menu');
      const menu2 = document.createElement('serra-mega-menu');
      document.body.appendChild(menu1);
      document.body.appendChild(menu2);

      // Ambos devem começar fechados
      expect(menu1.estaAberto).toBe(false);
      expect(menu2.estaAberto).toBe(false);

      // Alternar todos
      window.SerraComponents.megaMenu.alternarTodos();

      // Ambos devem estar abertos
      expect(menu1.estaAberto).toBe(true);
      expect(menu2.estaAberto).toBe(true);

      // Alternar novamente
      window.SerraComponents.megaMenu.alternarTodos();

      // Ambos devem estar fechados
      expect(menu1.estaAberto).toBe(false);
      expect(menu2.estaAberto).toBe(false);
    });

    it('deve funcionar mesmo sem menus existentes', () => {
      expect(() => {
        window.SerraComponents.megaMenu.alternarTodos();
      }).not.toThrow();
    });
  });
});
