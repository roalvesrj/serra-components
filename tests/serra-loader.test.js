// Testes para SerraLoader - Componente de Carregamento
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SerraLoader from '../src/components/SerraLoader.js';

// Registrar o componente para testes
customElements.define('serra-loader-teste', SerraLoader);

describe('SerraLoader - Componente de Carregamento', () => {
  let carregador;

  beforeEach(() => {
    // Limpar DOM e criar nova instância do carregador
    document.body.innerHTML = '';
    carregador = document.createElement('serra-loader-teste');
    document.body.appendChild(carregador);
  });

  describe('Inicialização e Estrutura', () => {
    it('deve criar o componente com Shadow DOM', () => {
      expect(carregador.shadowRoot).toBeTruthy();
      expect(carregador.shadowRoot.mode).toBe('open');
    });

    it('deve ter propriedades iniciais corretas', () => {
      expect(carregador._estaVisivel).toBe(false);
      expect(carregador._mensagem).toBe('');
      expect(carregador._logoSrc).toBe('');
    });

    it('deve renderizar estrutura HTML correta', () => {
      const conteudo = carregador.shadowRoot.querySelector('.conteudo-loader');
      const pontos = carregador.shadowRoot.querySelector('.container-pontos');
      const mensagem = carregador.shadowRoot.querySelector('.mensagem-loader');

      expect(conteudo).toBeTruthy();
      expect(pontos).toBeTruthy();
      expect(mensagem).toBeTruthy();
    });

    it('deve ter 5 pontos de animação', () => {
      const pontos = carregador.shadowRoot.querySelectorAll('.ponto');
      expect(pontos).toHaveLength(5);
    });
  });

  describe('Atributos Observados', () => {
    it('deve observar atributos corretos', () => {
      const atributosObservados = SerraLoader.observedAttributes;
      expect(atributosObservados).toContain('mensagem');
      expect(atributosObservados).toContain('logo-src');
      expect(atributosObservados).toContain('visivel');
    });

    it('deve atualizar mensagem via atributo', () => {
      carregador.setAttribute('mensagem', 'Carregando dados...');
      expect(carregador._mensagem).toBe('Carregando dados...');

      const elementoMensagem =
        carregador.shadowRoot.querySelector('.mensagem-loader');
      expect(elementoMensagem.textContent).toBe('Carregando dados...');
    });

    it('deve atualizar visibilidade via atributo', () => {
      carregador.setAttribute('visivel', 'true');
      expect(carregador._estaVisivel).toBe(true);

      carregador.setAttribute('visivel', 'false');
      expect(carregador._estaVisivel).toBe(false);
    });

    it('deve atualizar logo via atributo', () => {
      const logoUrl = '/teste-logo.svg';
      carregador.setAttribute('logo-src', logoUrl);
      expect(carregador._logoSrc).toBe(logoUrl);
    });

    it('deve usar mensagem padrão quando atributo está vazio', () => {
      carregador.setAttribute('mensagem', '');
      expect(carregador._mensagem).toBe('Carregando...');
    });
  });

  describe('API Pública - Métodos em Português', () => {
    it('deve exibir o carregador corretamente', () => {
      carregador.exibir('Processando...');

      expect(carregador._estaVisivel).toBe(true);
      expect(carregador._mensagem).toBe('Processando...');
      expect(carregador.hasAttribute('visivel')).toBe(true);
    });

    it('deve exibir com mensagem padrão quando não especificada', () => {
      carregador.exibir();

      expect(carregador._estaVisivel).toBe(true);
      expect(carregador.hasAttribute('visivel')).toBe(true);
    });

    it('deve ocultar o carregador corretamente', () => {
      carregador.exibir('Teste');
      carregador.ocultar();

      expect(carregador._estaVisivel).toBe(false);
      expect(carregador.hasAttribute('visivel')).toBe(false);
    });

    it('deve definir mensagem corretamente', () => {
      carregador.definirMensagem('Nova mensagem');

      expect(carregador._mensagem).toBe('Nova mensagem');
      expect(carregador.getAttribute('mensagem')).toBe('Nova mensagem');
    });

    it('deve definir logo corretamente', () => {
      const logoUrl = '/novo-logo.svg';
      carregador.definirLogo(logoUrl);

      expect(carregador._logoSrc).toBe(logoUrl);
      expect(carregador.getAttribute('logo-src')).toBe(logoUrl);
    });

    it('deve retornar estado de visibilidade corretamente', () => {
      expect(carregador.estaVisivel).toBe(false);

      carregador.exibir();
      expect(carregador.estaVisivel).toBe(true);
    });
  });

  describe('Renderização com Logo', () => {
    it('deve renderizar sem logo quando não especificado', () => {
      const elementoLogo = carregador.shadowRoot.querySelector('.logo-loader');
      expect(elementoLogo).toBeFalsy();
    });

    it('deve renderizar com logo quando especificado', () => {
      carregador.setAttribute('logo-src', '/teste-logo.svg');
      carregador.renderizar();

      const elementoLogo = carregador.shadowRoot.querySelector('.logo-loader');
      expect(elementoLogo).toBeTruthy();
      expect(elementoLogo.src).toContain('/teste-logo.svg');
      expect(elementoLogo.alt).toBe('Logotipo');
    });

    it('deve atualizar logo dinamicamente', () => {
      // Primeiro sem logo
      expect(carregador.shadowRoot.querySelector('.logo-loader')).toBeFalsy();

      // Adicionar logo
      carregador.definirLogo('/teste-logo.svg');

      // Deve re-renderizar e mostrar logo
      const elementoLogo = carregador.shadowRoot.querySelector('.logo-loader');
      expect(elementoLogo).toBeTruthy();
    });

    it('deve remover logo quando definido como vazio', () => {
      // Adicionar logo primeiro
      carregador.definirLogo('/teste-logo.svg');
      expect(carregador.shadowRoot.querySelector('.logo-loader')).toBeTruthy();

      // Remover logo
      carregador.definirLogo('');
      carregador.atualizarExibicao();

      // Logo deve ser removido
      const elementoLogo = carregador.shadowRoot.querySelector('.logo-loader');
      expect(elementoLogo).toBeFalsy();
    });
  });

  describe('Estilos CSS', () => {
    it('deve aplicar estilos corretos ao host', () => {
      const estilos = carregador.shadowRoot.querySelector('style');
      expect(estilos).toBeTruthy();
      expect(estilos.textContent).toContain(':host');
      expect(estilos.textContent).toContain('position: fixed');
      expect(estilos.textContent).toContain('z-index: 9999');
    });

    it('deve ter animação nos pontos', () => {
      const estilos = carregador.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('@keyframes deslizar');
      expect(estilos.textContent).toContain('animation: deslizar');
    });

    it('deve ter design responsivo', () => {
      const estilos = carregador.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('@media');
      expect(estilos.textContent).toContain('max-width: 575px');
      expect(estilos.textContent).toContain('min-width: 1200px');
    });

    it('deve usar variáveis CSS para cores customizáveis', () => {
      const estilos = carregador.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('var(--cor-texto-loader');
      expect(estilos.textContent).toContain('var(--cor-ponto-loader-1');
    });
  });

  describe('Atualizações Dinâmicas', () => {
    it('deve atualizar mensagem sem re-renderizar tudo', () => {
      const renderizarSpy = vi.spyOn(carregador, 'renderizar');

      carregador.definirMensagem('Mensagem teste');

      expect(renderizarSpy).not.toHaveBeenCalled();

      const elementoMensagem =
        carregador.shadowRoot.querySelector('.mensagem-loader');
      expect(elementoMensagem.textContent).toBe('Mensagem teste');
    });

    it('deve re-renderizar quando logo é adicionado', () => {
      const renderizarSpy = vi.spyOn(carregador, 'renderizar');

      carregador.definirLogo('/novo-logo.svg');

      expect(renderizarSpy).toHaveBeenCalled();
    });
  });
});
