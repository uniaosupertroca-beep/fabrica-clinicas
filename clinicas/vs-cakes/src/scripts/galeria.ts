// Foto ampliada: abre os links .ampliar numa janela <dialog>, com setas e teclado.
// Sem este script (ou sem JavaScript), o link leva ao pedido com a foto escolhida.
const janela = document.getElementById("lightbox") as HTMLDialogElement | null;

if (janela && typeof janela.showModal === "function") {
  const img = janela.querySelector<HTMLImageElement>(".grande")!;
  const nome = janela.querySelector<HTMLElement>("[data-nome]")!;
  const pedir = janela.querySelector<HTMLAnchorElement>("[data-pedir]")!;
  let lista: HTMLAnchorElement[] = [];
  let atual = 0;

  // As fotos que estão à vista (o filtro da galeria esconde as outras).
  const visiveis = () => [...document.querySelectorAll<HTMLAnchorElement>("a.ampliar")].filter((a) => a.getClientRects().length > 0);

  function mostrar(i: number) {
    atual = (i + lista.length) % lista.length;
    const a = lista[atual];
    img.src = a.dataset.grande ?? "";
    img.alt = a.dataset.alt ?? "";
    nome.textContent = a.dataset.titulo ?? "";
    pedir.href = `/encomendar?ref=${a.dataset.id}`;
    // Já deixa a vizinha carregando, para a troca ser instantânea.
    for (const d of [1, -1]) {
      const vizinha = lista[(atual + d + lista.length) % lista.length];
      if (vizinha) new Image().src = vizinha.dataset.grande ?? "";
    }
    janela!.querySelectorAll<HTMLElement>(".seta").forEach((s) => (s.hidden = lista.length < 2));
  }

  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>("a.ampliar");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    lista = visiveis();
    janela.showModal();
    mostrar(Math.max(0, lista.indexOf(a)));
  });

  janela.querySelector("[data-fechar]")!.addEventListener("click", () => janela.close());
  janela.querySelector("[data-anterior]")!.addEventListener("click", () => mostrar(atual - 1));
  janela.querySelector("[data-proxima]")!.addEventListener("click", () => mostrar(atual + 1));
  // Clique no fundo escuro fecha.
  janela.addEventListener("click", (e) => {
    const alvo = e.target as Element;
    if (alvo === janela || alvo.classList.contains("quadro")) janela.close();
  });
  janela.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    else if (e.key === "ArrowRight") mostrar(atual + 1);
  });
  janela.addEventListener("close", () => {
    img.removeAttribute("src");
  });
}
