// Pequenos ajustes de navegação que o CSS sozinho não faz.
// 1) O botão flutuante "Montar meu pedido" some enquanto outro botão de pedido já está na tela.
// 2) O menu do celular fecha com Esc, com um toque fora dele e depois de escolher uma página.

const flutuante = document.querySelector<HTMLElement>(".flutuante");
if (flutuante && "IntersectionObserver" in window) {
  const vistos = new Set<Element>();
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) (e.isIntersecting ? vistos.add(e.target) : vistos.delete(e.target));
    flutuante.toggleAttribute("data-oculto", vistos.size > 0);
  });
  // Botões de pedido que já estão na página, mais o rodapé (que tem os contatos).
  document.querySelectorAll("main a[href='/encomendar'], main a[href^='https://wa.me/'], .rodape").forEach((el) => observador.observe(el));
}

const menu = document.querySelector<HTMLDetailsElement>("details.menu");
if (menu) {
  const fechar = () => {
    if (menu.open) menu.open = false;
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      fechar();
      menu.querySelector<HTMLElement>("summary")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (menu.open && !menu.contains(e.target as Node)) fechar();
  });
  menu.addEventListener("click", (e) => {
    if ((e.target as Element).closest("a")) fechar();
  });
}
