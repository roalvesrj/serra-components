// Serra Components - Web Components Library
import SerraLoader from './components/SerraLoader.js';
import SerraMegaMenu from './components/SerraMegaMenu.js';

// Registrar os custom elements
customElements.define('serra-loader', SerraLoader);
customElements.define('serra-mega-menu', SerraMegaMenu);

// API Global para facilitar uso
window.SerraComponents = {
  carregador: {
    mostrar: (mensagem = 'Carregando...', logoSrc = '/javascript-logo.svg') => {
      let carregador = document.querySelector('serra-loader');
      if (!carregador) {
        carregador = document.createElement('serra-loader');
        document.body.appendChild(carregador);
      }
      if (logoSrc) {
        carregador.setAttribute('logo-src', logoSrc);
      }
      carregador.exibir(mensagem);
    },
    ocultar: () => {
      const carregador = document.querySelector('serra-loader');
      if (carregador) {
        carregador.ocultar();
      }
    },
    definirMensagem: mensagem => {
      const carregador = document.querySelector('serra-loader');
      if (carregador) {
        carregador.definirMensagem(mensagem);
      }
    },
    definirLogo: logoSrc => {
      const carregador = document.querySelector('serra-loader');
      if (carregador) {
        carregador.definirLogo(logoSrc);
      }
    },
  },
  megaMenu: {
    alternarTodos: () => {
      const menus = document.querySelectorAll('serra-mega-menu');
      menus.forEach(menu => menu.alternar());
    },
  },
};

// Exportar para uso direto se necessário
export { SerraLoader, SerraMegaMenu };
