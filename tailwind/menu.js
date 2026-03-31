/**
 * org-menu — JS puro (versão Tailwind)
 * Versão: 1.0.0
 *
 * Comportamento (espelha o componente React de origem):
 *   - Abre/fecha o dropdown ao CLICAR no botão trigger (toggle)
 *   - Rotaciona o chevron quando aberto
 *   - Fecha ao clicar fora do componente
 *   - Fecha ao pressionar Escape
 *   - Mantém aria-expanded sincronizado para acessibilidade
 *
 * Carregue com defer:
 *   <script src="menu.js" defer></script>
 */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // SELETORES — âncoras js-* definidas no menu.html
  // Altere aqui se mudar os nomes de classe no HTML
  // ----------------------------------------------------------
  var SEL = {
    root:     '.js-menu-root',
    toggle:   '.js-menu-toggle',
    dropdown: '.js-menu-dropdown',
    chevron:  '.js-chevron',
  };

  // Classe Tailwind usada para esconder/mostrar o dropdown
  var HIDDEN = 'hidden';

  // Classe adicionada ao chevron quando o menu está aberto
  var CHEVRON_OPEN = 'rotate-180';

  // ----------------------------------------------------------
  // INICIALIZAÇÃO
  // ----------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    var roots = document.querySelectorAll(SEL.root);

    // Suporte a múltiplas instâncias do menu na mesma página
    roots.forEach(function (root) {
      var toggle   = root.querySelector(SEL.toggle);
      var dropdown = root.querySelector(SEL.dropdown);
      var chevron  = root.querySelector(SEL.chevron);

      if (!toggle || !dropdown) return;

      // Clique no botão: abre ou fecha
      toggle.addEventListener('click', function (e) {
        e.stopPropagation(); // evita que o clique propague para o document
        var isOpen = !dropdown.classList.contains(HIDDEN);
        isOpen ? close(toggle, dropdown, chevron) : open(toggle, dropdown, chevron);
      });
    });

    // Fecha ao clicar fora de qualquer instância
    document.addEventListener('click', function (e) {
      roots.forEach(function (root) {
        if (!root.contains(e.target)) {
          var toggle   = root.querySelector(SEL.toggle);
          var dropdown = root.querySelector(SEL.dropdown);
          var chevron  = root.querySelector(SEL.chevron);
          close(toggle, dropdown, chevron);
        }
      });
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      roots.forEach(function (root) {
        var toggle   = root.querySelector(SEL.toggle);
        var dropdown = root.querySelector(SEL.dropdown);
        var chevron  = root.querySelector(SEL.chevron);
        close(toggle, dropdown, chevron);
        toggle && toggle.focus(); // devolve foco ao botão (acessibilidade)
      });
    });
  });

  // ----------------------------------------------------------
  // OPEN
  // ----------------------------------------------------------
  function open(toggle, dropdown, chevron) {
    dropdown.classList.remove(HIDDEN);
    toggle.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.classList.add(CHEVRON_OPEN);
  }

  // ----------------------------------------------------------
  // CLOSE
  // ----------------------------------------------------------
  function close(toggle, dropdown, chevron) {
    dropdown.classList.add(HIDDEN);
    toggle.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove(CHEVRON_OPEN);
  }

}());
