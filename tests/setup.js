// Setup global para testes de web components
import { beforeEach, afterEach } from 'vitest';

// Mock básico para APIs de web components se necessário
beforeEach(() => {
  // Limpar custom elements registry se necessário
  // Reset do DOM state
});

afterEach(() => {
  // Cleanup após cada teste
  document.body.innerHTML = '';
});

// Configurações globais para web components
global.customElements = global.customElements || {
  define: vi.fn(),
  get: vi.fn(),
  whenDefined: vi.fn().mockResolvedValue(),
};
