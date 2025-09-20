class SerraMegaMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.estaAberto = false;
    this.renderizar();
    this.configurarEventListeners();
  }

  renderizar() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .gatilho {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .gatilho:hover {
          background: #2563eb;
        }

        .menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          min-width: 300px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
        }

        .menu.aberto {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .secao-menu {
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .secao-menu:last-child {
          border-bottom: none;
        }

        .titulo-menu {
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
        }

        .item-menu {
          display: block;
          padding: 8px 0;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s;
        }

        .item-menu:hover {
          color: #3b82f6;
        }
      </style>

      <button class="gatilho">
        <slot name="gatilho">Menu</slot>
      </button>

      <div class="menu">
        <div class="secao-menu">
          <div class="titulo-menu">Produtos</div>
          <a href="#" class="item-menu">Componentes</a>
          <a href="#" class="item-menu">Templates</a>
          <a href="#" class="item-menu">Bibliotecas</a>
        </div>
        <div class="secao-menu">
          <div class="titulo-menu">Recursos</div>
          <a href="#" class="item-menu">Documentação</a>
          <a href="#" class="item-menu">Exemplos</a>
          <a href="#" class="item-menu">Suporte</a>
        </div>
        <div class="secao-menu">
          <div class="titulo-menu">Empresa</div>
          <a href="#" class="item-menu">Sobre</a>
          <a href="#" class="item-menu">Contato</a>
        </div>
      </div>
    `;
  }

  configurarEventListeners() {
    const gatilho = this.shadowRoot.querySelector('.gatilho');

    gatilho.addEventListener('click', () => {
      this.alternar();
    });

    // Fechar ao clicar fora
    document.addEventListener('click', e => {
      if (!this.contains(e.target)) {
        this.fechar();
      }
    });
  }

  // Métodos públicos
  abrir() {
    this.estaAberto = true;
    this.shadowRoot.querySelector('.menu').classList.add('aberto');
    this.dispatchEvent(new CustomEvent('menu-aberto'));
  }

  fechar() {
    this.estaAberto = false;
    this.shadowRoot.querySelector('.menu').classList.remove('aberto');
    this.dispatchEvent(new CustomEvent('menu-fechado'));
  }

  alternar() {
    if (this.estaAberto) {
      this.fechar();
    } else {
      this.abrir();
    }
  }
}

export default SerraMegaMenu;
