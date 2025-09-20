class SerraLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Propriedades internas
    this._estaVisivel = false;
    this._mensagem = '';
    this._logoSrc = '';
    this.renderizar();
  }

  static get observedAttributes() {
    return ['mensagem', 'logo-src', 'visivel'];
  }

  attributeChangedCallback(nome, valorAntigo, valorNovo) {
    if (valorAntigo !== valorNovo) {
      switch (nome) {
        case 'mensagem':
          this._mensagem = valorNovo || 'Carregando...';
          break;
        case 'logo-src':
          this._logoSrc = valorNovo || '';
          break;
        case 'visivel':
          this._estaVisivel = valorNovo === 'true';
          break;
      }
      this.atualizarExibicao();
    }
  }

  get estilos() {
    return `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        :host([visivel]) {
          display: flex;
        }

        .conteudo-loader {
          text-align: center;
          color: #ccc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .logo-loader {
          width: 270px;
          max-width: 100%;
          height: auto;
        }

        .mensagem-loader {
          font-size: 14px;
          margin-top: 10px;
          color: var(--cor-texto-loader, #ccc);
        }

        .carregador {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .container-pontos {
          display: flex;
          gap: 0;
        }

        .ponto {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          display: inline-block;
          animation: deslizar 1s infinite;
          margin-right: 4px;
        }

        .ponto:last-child {
          margin-right: 0;
        }

        .ponto:nth-child(1) {
          animation-delay: 0.1s;
          background: var(--cor-ponto-loader-1, #b8cce0);
        }

        .ponto:nth-child(2) {
          animation-delay: 0.2s;
          background: var(--cor-ponto-loader-2, #96afcd);
        }

        .ponto:nth-child(3) {
          animation-delay: 0.3s;
          background: var(--cor-ponto-loader-3, #7392ba);
        }

        .ponto:nth-child(4) {
          animation-delay: 0.4s;
          background: var(--cor-ponto-loader-4, #5175a7);
        }

        .ponto:nth-child(5) {
          animation-delay: 0.5s;
          background: var(--cor-ponto-loader-5, #2e5894);
        }

        @keyframes deslizar {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Design Responsivo */
        @media (max-width: 575px) {
          .logo-loader {
            width: 50vw;
          }
          .mensagem-loader {
            font-size: 1.2em;
          }
        }

        @media (min-width: 576px) {
          .logo-loader {
            width: 40vw;
          }
          .mensagem-loader {
            font-size: 1.5em;
          }
        }

        @media (min-width: 768px) {
          .logo-loader {
            width: 90vw;
          }
          .mensagem-loader {
            font-size: 3rem;
          }
        }

        @media (min-width: 992px) {
          .logo-loader {
            width: 30vw;
          }
          .mensagem-loader {
            font-size: 1.5em;
          }
        }

        @media (min-width: 1200px) {
          .logo-loader {
            width: 25vw;
          }
          .mensagem-loader {
            font-size: 1.6em;
          }
        }
      </style>
    `;
  }

  get modelo() {
    return `
      <div class="conteudo-loader">
        ${this._logoSrc ? `<img src="${this._logoSrc}" alt="Logotipo" class="logo-loader">` : ''}
        <div class="carregador">
          <div class="container-pontos">
            <div class="ponto"></div>
            <div class="ponto"></div>
            <div class="ponto"></div>
            <div class="ponto"></div>
            <div class="ponto"></div>
          </div>
        </div>
        <p class="mensagem-loader">${this._mensagem}</p>
      </div>
    `;
  }

  renderizar() {
    this.shadowRoot.innerHTML = this.estilos + this.modelo;
  }

  atualizarExibicao() {
    if (this.shadowRoot) {
      const elementoMensagem =
        this.shadowRoot.querySelector('.mensagem-loader');
      const elementoLogo = this.shadowRoot.querySelector('.logo-loader');

      if (elementoMensagem) {
        elementoMensagem.textContent = this._mensagem;
      }

      if (this._logoSrc && !elementoLogo) {
        this.renderizar(); // Re-renderizar se logo foi adicionado
      } else if (elementoLogo && !this._logoSrc) {
        elementoLogo.remove();
      } else if (elementoLogo) {
        elementoLogo.src = this._logoSrc;
      }
    }
  }

  // API Pública
  exibir(mensagem = '') {
    if (mensagem) this._mensagem = mensagem;
    this._estaVisivel = true;
    this.setAttribute('visivel', 'true');
    this.atualizarExibicao();
  }

  ocultar() {
    this._estaVisivel = false;
    this.removeAttribute('visivel');
  }

  definirMensagem(mensagem) {
    this._mensagem = mensagem;
    this.setAttribute('mensagem', mensagem);
  }

  definirLogo(src) {
    this._logoSrc = src;
    this.setAttribute('logo-src', src);
  }

  get estaVisivel() {
    return this._estaVisivel;
  }
}

export default SerraLoader;
