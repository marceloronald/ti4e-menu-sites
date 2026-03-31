/**
 * org-menu — JS puro (versão CSS puro)
 * Versão: 1.0.0
 *
 * Comportamento (espelha o componente React de origem):
 *   - Abre/fecha o dropdown ao CLICAR no botão trigger (toggle)
 *   - Rotaciona o chevron quando aberto
 *   - Fecha ao clicar fora do componente
 *   - Fecha ao pressionar Escape
 *   - Mantém aria-expanded sincronizado para acessibilidade
 *
 * Diferença em relação à versão Tailwind:
 *   - Usa classe BEM `org-menu__chevron--open` em vez de `rotate-180`
 *   - Usa atributo HTML `hidden` no dropdown em vez da classe `hidden` do Tailwind
 *
 * Carregue com defer:
 *   <script src="menu.js" defer></script>
 */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // SELETORES — âncoras js-* definidas no menu.html
  // ----------------------------------------------------------
  var SEL = {
    root:     '.js-menu-root',
    toggle:   '.js-menu-toggle',
    dropdown: '.js-menu-dropdown',
    chevron:  '.js-chevron',
  };

  // Classe BEM adicionada ao chevron quando o menu está aberto
  var CHEVRON_OPEN = 'org-menu__chevron--open';

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
        e.stopPropagation();
        var isOpen = !dropdown.hidden;
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
    dropdown.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.classList.add(CHEVRON_OPEN);
  }

  // ----------------------------------------------------------
  // CLOSE
  // ----------------------------------------------------------
  function close(toggle, dropdown, chevron) {
    dropdown.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove(CHEVRON_OPEN);
  }

}());
