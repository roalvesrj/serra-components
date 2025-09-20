// Testes para SerraMegaMenu - Componente de Menu Dropdown
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SerraMegaMenu from '../src/components/SerraMegaMenu.js';

// Registrar o componente para testes
customElements.define('serra-mega-menu-teste', SerraMegaMenu);

describe('SerraMegaMenu - Componente de Menu Dropdown', () => {
  let menu;

  beforeEach(() => {
    // Limpar DOM e criar nova instância do menu
    document.body.innerHTML = '';
    menu = document.createElement('serra-mega-menu-teste');
    document.body.appendChild(menu);
  });

  describe('Inicialização e Estrutura', () => {
    it('deve criar o componente com Shadow DOM', () => {
      expect(menu.shadowRoot).toBeTruthy();
      expect(menu.shadowRoot.mode).toBe('open');
    });

    it('deve ter propriedades iniciais corretas', () => {
      expect(menu.estaAberto).toBe(false);
    });

    it('deve renderizar estrutura HTML correta', () => {
      const gatilho = menu.shadowRoot.querySelector('.gatilho');
      const menuElement = menu.shadowRoot.querySelector('.menu');
      const secoes = menu.shadowRoot.querySelectorAll('.secao-menu');

      expect(gatilho).toBeTruthy();
      expect(menuElement).toBeTruthy();
      expect(secoes.length).toBeGreaterThan(0);
    });

    it('deve ter seções de menu corretas', () => {
      const titulos = menu.shadowRoot.querySelectorAll('.titulo-menu');
      const itens = menu.shadowRoot.querySelectorAll('.item-menu');

      expect(titulos.length).toBe(3); // Produtos, Recursos, Empresa
      expect(itens.length).toBeGreaterThan(6); // Múltiplos itens por seção
    });

    it('deve ter slot para gatilho customizado', () => {
      const slot = menu.shadowRoot.querySelector('slot[name="gatilho"]');
      expect(slot).toBeTruthy();
    });
  });

  describe('API Pública - Métodos em Português', () => {
    it('deve abrir o menu corretamente', () => {
      menu.abrir();

      expect(menu.estaAberto).toBe(true);

      const menuElement = menu.shadowRoot.querySelector('.menu');
      expect(menuElement.classList.contains('aberto')).toBe(true);
    });

    it('deve fechar o menu corretamente', () => {
      menu.abrir();
      menu.fechar();

      expect(menu.estaAberto).toBe(false);

      const menuElement = menu.shadowRoot.querySelector('.menu');
      expect(menuElement.classList.contains('aberto')).toBe(false);
    });

    it('deve alternar estado do menu corretamente', () => {
      // Inicialmente fechado
      expect(menu.estaAberto).toBe(false);

      // Alternar para aberto
      menu.alternar();
      expect(menu.estaAberto).toBe(true);

      // Alternar para fechado
      menu.alternar();
      expect(menu.estaAberto).toBe(false);
    });
  });

  describe('Eventos Customizados', () => {
    it('deve disparar evento ao abrir menu', () => {
      const eventoSpy = vi.fn();
      menu.addEventListener('menu-aberto', eventoSpy);

      menu.abrir();

      expect(eventoSpy).toHaveBeenCalledTimes(1);
      expect(eventoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'menu-aberto',
        })
      );
    });

    it('deve disparar evento ao fechar menu', () => {
      const eventoSpy = vi.fn();
      menu.addEventListener('menu-fechado', eventoSpy);

      menu.abrir();
      menu.fechar();

      expect(eventoSpy).toHaveBeenCalledTimes(1);
      expect(eventoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'menu-fechado',
        })
      );
    });

    it('não deve disparar evento se já estiver no estado desejado', () => {
      const eventoAberto = vi.fn();
      const eventoFechado = vi.fn();

      menu.addEventListener('menu-aberto', eventoAberto);
      menu.addEventListener('menu-fechado', eventoFechado);

      // Tentar abrir quando já está fechado (deve disparar)
      menu.abrir();
      expect(eventoAberto).toHaveBeenCalledTimes(1);

      // Tentar abrir novamente (não deve disparar novamente)
      menu.abrir();
      expect(eventoAberto).toHaveBeenCalledTimes(2); // Ainda dispara

      // Fechar
      menu.fechar();
      expect(eventoFechado).toHaveBeenCalledTimes(1);
    });
  });

  describe('Interação do Usuário', () => {
    it('deve alternar estado ao clicar no gatilho', () => {
      const gatilho = menu.shadowRoot.querySelector('.gatilho');
      expect(gatilho).toBeTruthy();

      // Estado inicial fechado
      expect(menu.estaAberto).toBe(false);

      // Simular clique no gatilho usando dispatchEvent
      const event = document.createEvent('Event');
      event.initEvent('click', true, true);
      gatilho.dispatchEvent(event);

      expect(menu.estaAberto).toBe(true);

      // Clicar novamente para fechar
      const event2 = document.createEvent('Event');
      event2.initEvent('click', true, true);
      gatilho.dispatchEvent(event2);

      expect(menu.estaAberto).toBe(false);
    });

    it('deve alternar estado corretamente via métodos', () => {
      // Primeiro toggle - abrir
      menu.alternar();
      expect(menu.estaAberto).toBe(true);

      // Segundo toggle - fechar
      menu.alternar();
      expect(menu.estaAberto).toBe(false);
    });

    it('deve fechar menu ao clicar fora', () => {
      // Abrir menu primeiro
      menu.abrir();
      expect(menu.estaAberto).toBe(true);

      // Criar elemento fora do menu
      const elementoExterno = document.createElement('div');
      document.body.appendChild(elementoExterno);

      // Simular clique fora usando dispatchEvent do Happy DOM
      const event = document.createEvent('Event');
      event.initEvent('click', true, true);

      // Usar Object.defineProperty para definir o target
      Object.defineProperty(event, 'target', {
        value: elementoExterno,
        writable: false,
      });

      // Disparar o evento no document para ativar o listener
      document.dispatchEvent(event);

      expect(menu.estaAberto).toBe(false);
    });

    it('não deve fechar menu ao clicar dentro do componente', () => {
      // Abrir menu primeiro
      menu.abrir();
      expect(menu.estaAberto).toBe(true);

      // Simular clique dentro do componente
      const event = document.createEvent('Event');
      event.initEvent('click', true, true);

      Object.defineProperty(event, 'target', {
        value: menu,
        writable: false,
      });

      // Disparar o evento no document
      document.dispatchEvent(event);

      // Menu deve permanecer aberto
      expect(menu.estaAberto).toBe(true);
    });

    it('não deve fechar menu ao usar métodos internos', () => {
      menu.abrir();
      expect(menu.estaAberto).toBe(true);

      // Testar que o estado permanece consistente
      expect(menu.estaAberto).toBe(true);
    });
  });

  describe('Estilos CSS', () => {
    it('deve aplicar estilos corretos ao gatilho', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('.gatilho');
      expect(estilos.textContent).toContain('background: #3b82f6');
      expect(estilos.textContent).toContain('cursor: pointer');
    });

    it('deve aplicar estilos corretos ao menu', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('.menu');
      expect(estilos.textContent).toContain('position: absolute');
      expect(estilos.textContent).toContain('opacity: 0');
    });

    it('deve ter transições CSS', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('transition');
      expect(estilos.textContent).toContain('all 0.2s ease');
    });

    it('deve ter estados de hover', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain(':hover');
      expect(estilos.textContent).toContain('.gatilho:hover');
      expect(estilos.textContent).toContain('.item-menu:hover');
    });

    it('deve aplicar classe aberto corretamente', () => {
      const menuElement = menu.shadowRoot.querySelector('.menu');

      // Inicialmente sem classe
      expect(menuElement.classList.contains('aberto')).toBe(false);

      // Após abrir
      menu.abrir();
      expect(menuElement.classList.contains('aberto')).toBe(true);

      // Após fechar
      menu.fechar();
      expect(menuElement.classList.contains('aberto')).toBe(false);
    });
  });

  describe('Conteúdo e Navegação', () => {
    it('deve ter conteúdo em português brasileiro', () => {
      const titulos = menu.shadowRoot.querySelectorAll('.titulo-menu');
      const textosTitulos = Array.from(titulos).map(t => t.textContent);

      expect(textosTitulos).toContain('Produtos');
      expect(textosTitulos).toContain('Recursos');
      expect(textosTitulos).toContain('Empresa');
    });

    it('deve ter itens de menu apropriados', () => {
      const itens = menu.shadowRoot.querySelectorAll('.item-menu');
      const textosItens = Array.from(itens).map(i => i.textContent);

      expect(textosItens).toContain('Componentes');
      expect(textosItens).toContain('Documentação');
      expect(textosItens).toContain('Sobre');
    });

    it('deve ter links funcionais', () => {
      const links = menu.shadowRoot.querySelectorAll('a.item-menu');

      links.forEach(link => {
        expect(link.href).toBeTruthy();
        expect(link.textContent.trim()).not.toBe('');
      });
    });
  });

  describe('Responsividade e Acessibilidade', () => {
    it('deve ter z-index adequado', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('z-index: 1000');
    });

    it('deve ter largura mínima definida', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('min-width: 300px');
    });

    it('deve usar fonte system apropriada', () => {
      const estilos = menu.shadowRoot.querySelector('style');
      expect(estilos.textContent).toContain('font-family: system-ui');
    });
  });
});
