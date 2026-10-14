# Monta deck.html: a proposta de parceria (permuta) de um app com a marca da clínica.
#
#   python3 montar.py <pasta>            (ex.: essenciale, nanda-prevedello)
#   node gerar-pdf.mjs "<arquivo>.pdf"
#
# O que é da clínica fica em clinicas/<pasta>/: config.py (o dicionário CLINICA), tema.css (cores e
# fontes), fontes/, marcas/ (logo) e fotos/. O que a clínica não definir usa PADRAO, pensado para uma
# clínica de estética facial (ciclo da toxina, mapa do rosto). Sem preços: é uma proposta de troca.
import importlib.util
import sys
from pathlib import Path

from pecas import celular, mapa_corporal, mapa_facial, painel

RAIZ = Path(__file__).resolve().parent
pasta = sys.argv[1] if len(sys.argv) > 1 else "essenciale"
especificacao = importlib.util.spec_from_file_location("config", RAIZ / "clinicas" / pasta / "config.py")
modulo = importlib.util.module_from_spec(especificacao)
especificacao.loader.exec_module(modulo)

PADRAO = {
    "capa_titulo": ("O aplicativo da {chamada},", "na mão de cada paciente."),
    "frase_final": "Para que a experiência da {chamada} continue no celular de cada paciente.",
    "cuidados_casa": ["Protetor solar pela manhã", "Hidratante à noite"],
    "lembrete": "WhatsApp um dia antes e no app",
    "agenda_lista": [
        "Não deixa marcar dois atendimentos no mesmo aparelho, nem na mesma sala.",
        "Junta as aplicações de toxina num turno, para aproveitar o frasco.",
        "Confirmação e lembrete pelo WhatsApp e pelo app.",
        "A recepção vê a agenda, mas não abre o prontuário.",
        "Aparelho alugado por dia entra na agenda com a data.",
    ],
    "capa_escura": False,
    "foto_final": None,
    "mapa": "facial",
    "cor_mapa": "#8d5f6a",
    "traco_mapa": "#2a171c",
    "fonte_mapa": "Jost",
    "profissional": "Dra.",
    "sala_aparelhos": "Sala 3",
    "protocolo_principal": ("Pele de Rainha", 5, 8),
    "protocolo_secundario": ("Bumbum das Estrelas", 3, 10),
    "procedimento_pos": "Harmonização facial",
    "cuidados_pos": ["Compressa fria por 10 min", "Sem academia nem calor por 48 h"],
    "revisao": ("Revisão de 15 dias", "Retorno de 15 dias", "dia 15"),
    "termo": "Harmonização facial: riscos e cuidados",
    "produto": {"tipo": "Preenchedor de ácido hialurônico", "lote": "AH-2291", "validade": "08/2027", "regiao": "Lábios, 1 ml"},
    "ciclo": {
        "secao": "O ciclo que mais se repete",
        "titulo": "Harmonização com toxina: um ciclo de cerca de 120 dias que o app acompanha sozinho.",
        "marcos": [
            ("Dia 0", "Aplicação", "Fotos em três expressões, pontos, unidades, marca e lote. Termo assinado.", False),
            ("Dias 1 a 7", "Cuidados", 'Orientações no app e um "está tudo bem?" automático.', False),
            ("Dia 15", "Revisão", "Confere o resultado. É o melhor momento para pedir a avaliação no Google.", True),
            ("Dia 90", "Lembrete", '"Seu efeito começa a diminuir": convite para agendar.', False),
            ("Dias 100 a 120", "Reaplicação", "O ciclo recomeça. Meta: mais de 70% saem com a próxima data marcada.", False),
        ],
        "nota": "<b>Por que importa:</b> o frasco reconstituído dura pouco, então a agenda precisa juntar pacientes num mesmo turno. E, depois dos lotes falsificados apreendidos pela Anvisa em 2025, saber quem recebeu cada lote deixou de ser detalhe.",
        "fonte": "Fontes: protocolos de clínicas e cursos de harmonização; alertas da Anvisa (2025). Meta de 70% citada por consultoria do setor.",
    },
    "agenda_turno": "Turno de toxina 14h–17h",
    "agenda_colunas": ["{prof}", "Ana, biomédica", "{sala}", "Sala 4, laser"],
    "agenda": [
        ("09h", [("", "Avaliação", "Paula R., Sala 1"), ("verde", "{p1} 5/8", "Marina A., Sala 2"), ("ouro", "Criolipólise abdômen", "Carla M., aparelho até 10h10"), None]),
        ("10h", [None, ("", "{p2} 3/10", "Júlia F."), None, ("verde", "Laser 2/4", "Renata S.")]),
        ("14h", [("ouro", "Toxina, 4 pacientes", "1 frasco reconstituído"), None, ("ouro", "Criolipólise flancos", "Bia T."), None]),
    ],
    "agenda_curta": [
        ("09:00", "{p1} 5/8", "Marina A., Sala 2", "verde", "confirmada"),
        ("10:30", "Avaliação", "Paula R., {prof}", "verde", "confirmada"),
        ("14:00", "Harmonização facial", "Bia T., termo assinado", "", "revisão no dia 15"),
        ("15:30", "{p2} 3/10", "Júlia F., {sala}", "alerta", "sem resposta"),
        ("16:30", "Lifting sem cirurgia", "Renata S., {prof}", "verde", "confirmada"),
        ("17:30", "Gordura localizada 2/6", "Carla M., {sala}", "verde", "confirmada"),
    ],
    "pront_titulo": "Marina A., harmonização facial, 21/10",
    "pront_linhas": [
        ("Glabela", "Toxina botulínica", "20 U", "TX-0815"),
        ("Frontal", "Toxina botulínica", "12 U", "TX-0815"),
        ("Periorbital", "Toxina botulínica", "24 U", "TX-0815"),
        ("Lábios", "Ácido hialurônico", "1 ml", "AH-2291"),
    ],
    "pront_fotos": ("Repouso", "Contração"),
    "pront_nota": "Validade e baixa no estoque automáticas. Retorno de 15 dias já marcado.",
    "pacotes": [
        ("Marina A.", "{p1}", "3 de 8", "30/01"),
        ("Júlia F.", "{p2}", "7 de 10", "15/03"),
        ("Carla M.", "Clube de toxina (anual)", "2 de 3", None),
    ],
    "clube": "Clube ou assinatura</b>, como um plano anual de toxina.",
    "estoque": [
        ("Toxina botulínica 100 U", "TX-0815", "03/2027", "4 frascos"),
        ("Ácido hialurônico 1 ml", "AH-2291", "08/2027", "11 seringas"),
        ("Bioestimulador", "BE-1180", None, "2 frascos"),
    ],
    "estoque_alerta": ("Lote TX-0702 sob alerta da Anvisa", "Recebido por 3 pacientes entre 02 e 18/09."),
    "atencao": [
        ("alerta", "Pós", 'Bia T. respondeu "algo diferente" no primeiro dia'),
        ("", "Revisão", "3 pacientes no dia 15 sem horário"),
        ("ouro", "Pacote", "Júlia F. com pacote vencendo em 10 dias"),
        ("", "Termo", "2 sessões amanhã sem termo assinado"),
        ("verde", "Estoque", "Bioestimulador BE-1180 vence em 40 dias"),
    ],
    "regua": [
        ("Logo depois", "Pós-procedimento", 'Cuidados no app e "como você está?" no primeiro dia e na primeira semana.'),
        ("Dia 15", "Revisão e avaliação", "Retorno marcado e pedido de avaliação no Google."),
        ("Por ciclo", "Manutenção", "Toxina a cada 3 a 4 meses, preenchedor a cada 6 a 12, séries de laser e bioestimulador."),
        ("Sem visita", "Reativação", "Quem não volta há 150 dias recebe um convite, se autorizou mensagens."),
        ("Datas", "Aniversário e indicação", "Mensagem pessoal e indicação de amigas com um toque."),
    ],
    "principios": [
        ("A marca é da {chamada}.", "Nome, logo, cores e endereço da clínica em cada tela e em cada mensagem."),
        ("O WhatsApp está no centro.", "Confirmação, cuidados e lembretes saem sozinhos."),
        ("Retenção é o objetivo.", "Cada procedimento já sai com o próximo passo marcado."),
        ("As regras vêm prontas.", "Termo, lote, guarda e legendas sem esforço extra."),
        ("Simples de usar.", "Menos cliques que uma planilha, inclusive no celular."),
    ],
}
C = {**PADRAO, **modulo.CLINICA}
BASE = f"clinicas/{pasta}"
arq = lambda caminho: f"{BASE}/{caminho}"
p1, s1, t1 = C["protocolo_principal"]
p2, s2, t2 = C["protocolo_secundario"]
troca = lambda t: t.format(chamada=C["chamada"], prof=C["profissional"], sala=C["sala_aparelhos"], p1=p1, p2=p2) if isinstance(t, str) else t
rev_curta, rev_longa, rev_dia = C["revisao"]
paginas = []


def pagina(conteudo, classe="", rodape=True):
    n = len(paginas) + 1
    pe = f'<div class="rodape"><span><b>{C["nome"]}</b>Proposta de parceria</span><span>{n}</span></div>' if rodape else ""
    paginas.append(f'<section class="slide {classe}">{conteudo}{pe}</section>')


def topo_app(iniciais="MA"):
    return f'<div class="app-topo"><img class="app-logo" src="{arq(C["logo"])}" alt="{C["nome"]}"><span class="avatar">{iniciais}</span></div>'


def janela(conteudo, classe=""):
    return painel(conteudo, classe, f'{C["dominio"]}/painel')


def mapa(largura, rotulos):
    desenho = mapa_corporal if C["mapa"] == "corporal" else mapa_facial
    return desenho(largura, rotulos, C["cor_mapa"], C["traco_mapa"], fonte=C["fonte_mapa"])


tela_inicio = f"""
{topo_app()}
<p class="app-titulo">Olá, Marina</p>
<div class="cartao-app forte"><small>Próxima sessão</small><b>{p1}, sessão {s1} de {t1}</b><small>Qui, 23/10 às 14h, Sala 2</small><span class="botao-app">Confirmar presença</span></div>
<div class="cartao-app"><b>Cuidados de hoje</b><div class="linha-app"><span class="check ok">✓</span>{C["cuidados_casa"][0]}</div><div class="linha-app"><span class="check"></span>{C["cuidados_casa"][1]}</div></div>
<div class="cartao-app verde"><b>Revisão marcada</b><small>{C["procedimento_pos"]}, 05/11 às 10h30</small></div>
<div class="abas"><b>Início</b><span>Tratamento</span><span>Agendar</span><span>Mensagens</span></div>
"""

# 1. Capa ------------------------------------------------------------------
titulo_capa, destaque_capa = (troca(x) for x in C["capa_titulo"])
pagina(f"""
<div class="capa-texto">
  <img class="capa-logo" src="{arq(C["logo_claro"] if C["capa_escura"] else C["logo"])}" alt="{C["nome"]}">
  <p class="secao">Proposta de parceria, outubro de 2026</p>
  <h1>{titulo_capa} <em>{destaque_capa}</em></h1>
  <p class="lead">Um app com o nome, as cores e o cuidado da clínica, para a paciente acompanhar o próprio tratamento. E um painel para a equipe cuidar da agenda, do prontuário, dos termos e dos pacotes.</p>
  <p class="capa-troca">Oferecido em forma de permuta, por troca de serviços.</p>
</div>
<div class="capa-arte">
  <figure class="arco"><img src="{arq(C["foto_capa"])}" alt="{C["foto_capa_alt"]}"></figure>
  {celular(tela_inicio, 218, "capa-celular")}
</div>
""", "capa" + (" capa-escura" if C["capa_escura"] else ""), rodape=False)

# 2. A ideia em uma página -----------------------------------------------------
pagina(f"""
<p class="secao">A ideia em uma página</p>
<h2>Um app com a cara da {C["chamada"]}, criado em parceria. Não é uma venda: é uma troca.</h2>
<div class="resumo">
  <div><h3>O que é</h3><p>Um app para a paciente e um painel para a equipe, os dois com o nome, o logo, as cores e o endereço da {C["chamada"]}.</p></div>
  <div><h3>Para a paciente</h3><p>Ela vê o protocolo e o saldo de sessões, recebe os cuidados do pós, assina os termos e marca o retorno pelo celular.</p></div>
  <div><h3>Para a equipe</h3><p>Agenda por profissional, sala e aparelho. Prontuário com mapa de aplicação e lote. Pacotes, estoque e comissões sem planilha.</p></div>
  <div><h3>Por que agora</h3><p>Poucas clínicas oferecem à paciente um app com a própria marca. E as regras de rastreio de produto e de consentimento ficaram mais exigentes.</p></div>
  <div><h3>Não começa do zero</h3><p>O app nasce de um sistema que já está no ar, com app instalável, WhatsApp, LGPD e cópias de segurança funcionando.</p></div>
  <div class="decisao"><h3>Como funciona</h3><p>Em forma de permuta: eu crio, implanto e acompanho o app; a {C["chamada"]} retribui com serviços da clínica, combinados entre nós.</p></div>
</div>
""")

# 3. Jornada ----------------------------------------------------------------
passos = [
    ("Atrair", "Instagram, Google e indicação. Um terço dos agendamentos acontece fora do horário comercial.", "Resposta lenta perde a paciente."),
    ("Agendar", "Profissional, sala e aparelho no mesmo horário, com confirmação.", "Faltas de 15% a 30%, segundo o setor."),
    ("Avaliar", "Anamnese, fototipo, contraindicações, fotos padronizadas.", "Fotos ficam no celular pessoal."),
    ("Consentir", "Termo por procedimento, assinado antes, com riscos explicados.", "Papel que se perde; sem prova de leitura."),
    ("Aplicar", "Produto, lote, validade, unidades ou ml por ponto.", "Lote anotado à mão, quando é anotado."),
    ("Cuidar", "Orientações do pós, primeiro dia, primeira semana, revisão.", "WhatsApp manual, uma paciente por vez."),
    ("Voltar", "Manutenção, pacote, aniversário, avaliação no Google.", "Ninguém lembra a paciente na hora certa."),
]
itens = "".join(f'<li><b>{t}</b><p>{d}</p><p class="dor">{p}</p></li>' for t, d, p in passos)
pagina(f"""
<p class="secao">A jornada da paciente</p>
<h2>Do Instagram ao retorno, sete momentos. Em cada um, a clínica pode perder tempo ou paciente.</h2>
<ol class="jornada">{itens}</ol>
<p class="fonte">Fontes: Doctoralia via APM (agendamentos fora do horário); dados de faltas citados por empresas do setor. Detalhes no relatório da pesquisa.</p>
""")

# 4. O ciclo que mais se repete -------------------------------------------------
ciclo = C["ciclo"]
marcos = "".join(
    f'<div class="marco{" destaque" if destaque else ""}"><span>{quando}</span><b>{titulo}</b><p>{texto}</p></div>'
    for quando, titulo, texto, destaque in ciclo["marcos"]
)
pagina(f"""
<p class="secao">{ciclo["secao"]}</p>
<h2>{ciclo["titulo"]}</h2>
<div class="ciclo">{marcos}</div>
<div class="nota-lateral"><p>{ciclo["nota"]}</p></div>
<p class="fonte">{ciclo["fonte"]}</p>
""")

# 5. Por que um app próprio ------------------------------------------------------
pagina("""
<p class="secao">Por que um app próprio</p>
<h2>Lá fora, o app virou o jeito de a paciente voltar. Aqui, quase nenhuma clínica tem o seu.</h2>
<div class="duas">
  <div>
    <p class="lead primeira">No Brasil, os sistemas mais usados foram pensados para a recepção. Quando existe app para a paciente, em geral ele mostra a marca do fornecedor, não a da clínica.</p>
    <ul class="lista-limpa">
      <li><b>Mapa de aplicação</b> com unidades por ponto e lote, ligado ao estoque.</li>
      <li><b>Foto com guia</b> de enquadramento, para comparar a evolução.</li>
      <li><b>Termos enviados no agendamento</b>, assinados antes de a paciente chegar.</li>
      <li><b>Clube ou assinatura</b>, que mantém a paciente por perto.</li>
    </ul>
  </div>
  <div class="numeros">
    <div><b>2,5×</b><p>quanto gasta, nas clínicas americanas, a paciente com assinatura, comparada às demais.</p></div>
    <div><b>4% e 37%</b><p>cancelamento de quem tem dois ou mais retornos marcados, contra quem tem só um.</p></div>
    <div><b>80% e 38%</b><p>agenda ocupada nas 10% melhores clínicas, contra a clínica típica.</p></div>
  </div>
</div>
<p class="fonte">Fontes: CorralData divulgado pela AmSpa (ago. de 2026, mais de 100 marcas); Zenoti Benchmark 2026 (dados de 2025); sites de sistemas do Brasil e do exterior.</p>
""")

# 6. Regras -----------------------------------------------------------------
regras = [
    ("Dados de saúde (LGPD)", "Prontuário e fotos são dados sensíveis. Uso de foto em publicidade e mensagens de marketing pedem consentimento separado, que a paciente pode retirar.", "Lei 13.709/2018, art. 11"),
    ("Guarda do prontuário", "Mínimo de 20 anos a partir do último registro. Pedido de exclusão não apaga o prontuário nesse prazo.", "Lei 13.787/2018"),
    ("Termo assinado no celular", "A assinatura eletrônica da paciente vale. Documentos do profissional pedem assinatura avançada ou qualificada.", "MP 2.200-2/2001; Lei 14.063/2020"),
    ("Rastreio de produto", "Para preenchedores e bioestimuladores: cartão de rastreabilidade com lote para a paciente, cópia no prontuário, eventos no Notivisa.", "Anvisa, Informe GGMON 01/2026"),
    ("Antes e depois", "Cada conselho tem a sua regra: CFM só educativo e sem identificar; CFO e CFBM com termo e legendas obrigatórias.", "CFM 2.336/2023; CFO 196/2019; CFBM 330/2020"),
    ("Nota fiscal", "A NFS-e pelo emissor nacional passa a ser obrigatória para ME e EPP do Simples.", "Res. CGSN 191/2026, a partir de 1º/11/2026"),
    ("Vazamento de dados", "Incidente com risco relevante precisa ser comunicado à ANPD e às pacientes em 3 dias úteis.", "Res. CD/ANPD 15/2024"),
    ("Quem pode fazer o quê", "Decisões de 2026 mexeram nas regras de biomédicos e dentistas. O app não trava por profissão: a clínica configura.", "TRF-1, 2026, com recursos pendentes"),
]
caixas = "".join(f'<div class="regra"><h3>{t}</h3><p>{d}</p><span>{f}</span></div>' for t, d, f in regras)
pagina(f"""
<p class="secao">As regras que o app respeita</p>
<h2>A conformidade entra no desenho do app, não num manual que ninguém lê.</h2>
<div class="regras">{caixas}</div>
<p class="fonte">Resumo, não parecer jurídico. Fontes oficiais (Planalto, conselhos, Anvisa, ANPD) no relatório da pesquisa.</p>
""")

# 7. A proposta: dois lados ---------------------------------------------------------
linhas_curtas = "".join(
    f'<div class="linha-agenda"><span>{h}</span><p><b>{troca(t)}</b><small>{troca(s)}</small></p><span class="etiqueta {cls}">{e}</span></div>'
    for h, t, s, cls, e in C["agenda_curta"]
)
agenda_curta = f"""
<div class="painel-menu"><img src="{arq(C["logo"])}" alt=""><span class="ativo">Agenda</span><span>Pacientes</span><span>Prontuários</span><span>Pacotes</span><span>Estoque</span><span>Mensagens</span></div>
<div class="painel-corpo">
<div class="topo-painel"><b>Hoje, quinta-feira</b><span class="etiqueta verde">18 confirmadas</span><span class="etiqueta alerta">2 sem resposta</span></div>
{linhas_curtas}
</div>
"""
p_prod = C["produto"]
tela_docs = f"""
{topo_app()}
<p class="app-titulo">Meus documentos</p>
<div class="cartao-app forte"><small>Revisão</small><b>{rev_longa}</b><small>Qua, 05/11 às 10h30</small><span class="botao-app">Confirmar presença</span></div>
<div class="cartao-app"><div class="linha-app"><span class="check ok">✓</span>Termo assinado em 21/10</div><div class="linha-app"><span class="check ok">✓</span>Cartão do produto, lote {p_prod["lote"]}</div><div class="linha-app"><span class="check"></span>Ficha de anamnese atualizada</div></div>
<div class="abas"><span>Início</span><b>Tratamento</b><span>Agendar</span><span>Mensagens</span></div>
"""
principios = "".join(f"<li><b>{troca(t)}</b> {troca(d)}</li>" for t, d in C["principios"])
pagina(f"""
<div class="duas proposta">
  <div>
    <p class="secao">A proposta</p>
    <h2>Um sistema, dois lados: a equipe no painel, a paciente no app.</h2>
    <ul class="principios">{principios}</ul>
  </div>
  <div class="dois-lados">
    {janela(agenda_curta)}
    {celular(tela_docs, 214)}
  </div>
</div>
""")

# 8. App da paciente 1 ------------------------------------------------------
t_tratamento = f"""
{topo_app()}
<p class="app-titulo">Meu tratamento</p>
<div class="cartao-app forte"><small>Protocolo</small><b>{p1}</b><small>{s1} de {t1} sessões, pacote válido até 30/01</small><div class="progresso"><i style="width:{round(100 * (s1 - 1) / t1)}%"></i></div></div>
<div class="cartao-app"><b>Linha do tempo</b>
<div class="linha-app"><span class="check ok">✓</span>Avaliação, 02/09</div>
<div class="linha-app"><span class="check ok">✓</span>Sessões 1 a {s1 - 1}</div>
<div class="linha-app"><span class="check"></span>Sessão {s1}, 23/10</div>
<div class="linha-app"><span class="check"></span>Reavaliação em novembro</div></div>
<div class="abas"><span>Início</span><b>Tratamento</b><span>Agendar</span><span>Mensagens</span></div>
"""
t_pos = f"""
{topo_app()}
<p class="app-titulo">Depois da sessão</p>
<div class="cartao-app verde"><b>Dia 1 de 7</b><small>{C["procedimento_pos"]}, 21/10</small></div>
<div class="cartao-app"><div class="linha-app"><span class="check ok">✓</span>{C["cuidados_pos"][0]}</div><div class="linha-app"><span class="check"></span>{C["cuidados_pos"][1]}</div></div>
<div class="cartao-app"><b>Como você está?</b><small>A clínica recebe a sua resposta.</small><span class="botao-app cheio">Tudo bem</span> <span class="botao-app">Algo diferente</span></div>
<div class="abas"><span>Início</span><b>Tratamento</b><span>Agendar</span><span>Mensagens</span></div>
"""
t_agendar = f"""
{topo_app()}
<p class="app-titulo">Agendar</p>
<div class="cartao-app forte"><small>Sugestão da clínica</small><b>{rev_curta}</b><small>Faz parte do seu procedimento</small></div>
<div class="cartao-app"><b>Qua, 05/11</b>
<div class="horarios"><span>09:00</span><span class="sel">10:30</span><span>14:00</span><span>16:30</span></div><small>{C["profissional"]}, Sala 1</small></div>
<div class="cartao-app"><b>Lembrete combinado</b><small>{C["lembrete"]}</small></div>
<div class="abas"><span>Início</span><span>Tratamento</span><b>Agendar</b><span>Mensagens</span></div>
"""
pagina(f"""
<p class="secao">O app da paciente</p>
<h2>A paciente vê o tratamento dela, sabe o que fazer em casa e marca o próximo passo.</h2>
<div class="tres-celulares">
  <div>{celular(t_tratamento, 226)}<p class="legenda">Protocolo e saldo do pacote</p></div>
  <div>{celular(t_pos, 226)}<p class="legenda">Cuidados do pós, dia a dia</p></div>
  <div>{celular(t_agendar, 226)}<p class="legenda">Agendamento com o retorno sugerido</p></div>
</div>
""")

# 9. App da paciente 2 ------------------------------------------------------
t_termo = f"""
{topo_app()}
<p class="app-titulo">Assinar termos</p>
<div class="cartao-app"><b>Termo de consentimento</b><small>{C["termo"]}</small><div class="linha-app"><span class="check ok">✓</span>Li e entendi os riscos</div></div>
<div class="cartao-app"><b>Uso de imagem</b><small>Opcional. Pode retirar quando quiser.</small><div class="linha-app"><span class="check"></span>Autorizo o uso em publicações</div></div>
<div class="assinatura">Marina A.</div>
"""
t_fotos = f"""
{topo_app()}
<p class="app-titulo">Minha evolução</p>
<div class="fotos-par"><div class="foto-falsa"><span>02/09</span></div><div class="foto-falsa"><span>21/10</span></div></div>
<div class="cartao-app"><b>Fotos privadas</b><small>Só você e a clínica veem. Mesmo ângulo, mesma luz.</small></div>
<div class="abas"><span>Início</span><b>Tratamento</b><span>Agendar</span><span>Mensagens</span></div>
"""
t_cartao = f"""
{topo_app()}
<p class="app-titulo">Cartão do produto</p>
<div class="cartao-app forte"><small>{p_prod["tipo"]}</small><b>Lote {p_prod["lote"]}</b><small>Validade {p_prod["validade"]}, com registro na Anvisa</small></div>
<div class="cartao-app"><div class="linha-app">Aplicado em <b style="margin-left:auto">21/10/2026</b></div><div class="linha-app">Região <b style="margin-left:auto">{p_prod["regiao"]}</b></div><div class="linha-app">Profissional <b style="margin-left:auto">{C["profissional"]}</b></div></div>
<p class="miudo">Cópia guardada no prontuário, como orienta a Anvisa para preenchedores e bioestimuladores.</p>
"""
pagina(f"""
<p class="secao">O app da paciente</p>
<h2>Termos assinados no celular, fotos guardadas com segurança e o cartão de cada produto.</h2>
<div class="tres-celulares">
  <div>{celular(t_termo, 226)}<p class="legenda">Termo e uso de imagem, separados</p></div>
  <div>{celular(t_fotos, 226)}<p class="legenda">Evolução sem sair do app</p></div>
  <div>{celular(t_cartao, 226)}<p class="legenda">Cartão de rastreabilidade</p></div>
</div>
""")

# 10. Agenda -----------------------------------------------------------------
def celula(evento):
    if not evento:
        return "<div></div>"
    cls, titulo, nota = evento
    return f'<div><div class="evento {cls}">{troca(titulo)}<small>{troca(nota)}</small></div></div>'


cabecalhos = "".join(f'<div class="cab">{troca(c)}</div>' for c in C["agenda_colunas"])
linhas_agenda = "".join(f'<div class="hora">{h}</div>' + "".join(celula(e) for e in eventos) for h, eventos in C["agenda"])
agenda = f"""
<div class="topo-painel"><b>Agenda, quinta, 23 de outubro</b><span class="etiqueta verde">18 confirmadas</span><span class="etiqueta ouro">{C["agenda_turno"]}</span></div>
<div class="agenda"><div class="cab"></div>{cabecalhos}{linhas_agenda}</div>
"""
pagina(f"""
<div class="duas painel-lado">
  <div>
    <p class="secao">O painel da clínica</p>
    <h2>Uma agenda que conhece profissionais, salas e aparelhos.</h2>
    <ul class="lista-limpa">{"".join(f"<li>{troca(x)}</li>" for x in C["agenda_lista"])}</ul>
  </div>
  <div>{janela(agenda)}</div>
</div>
""")

# 11. Prontuário ---------------------------------------------------------------
linhas_pront = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td></tr>" for a, b, c, d in C["pront_linhas"])
foto_a, foto_b = C["pront_fotos"]
prontuario = f"""
<div class="topo-painel"><b>{C["pront_titulo"]}</b><span class="etiqueta verde">Termo assinado</span><span class="etiqueta">Uso de imagem: não</span></div>
<div class="pront">
  <div class="pront-mapa">{mapa(240, False)}</div>
  <div class="pront-dados">
    <table class="tabela compacta">
      <tr><th>Região</th><th>Produto</th><th>Qtde.</th><th>Lote</th></tr>
      {linhas_pront}
    </table>
    <div class="fotos-par pequeno"><div class="foto-falsa"><span>{foto_a}</span></div><div class="foto-falsa"><span>{foto_b}</span></div></div>
    <p class="miudo">{C["pront_nota"]} Assinado por {C["profissional"]}.</p>
  </div>
</div>
"""
pagina(f"""
<p class="secao">Prontuário estético</p>
<h2>Cada sessão registrada em um minuto: pontos, quantidades, lote e fotos no mesmo lugar.</h2>
<div class="duas pront-lado">
  <div>{janela(prontuario)}</div>
  <ul class="lista-limpa">
    <li><b>Mapa {"corporal e facial" if C["mapa"] == "corporal" else "facial e corporal"}</b> com pontos, unidades ou ml, e o lote lido do estoque.</li>
    <li><b>Fotos com guia</b> de enquadramento: mesmo ângulo e mesma luz a cada retorno.</li>
    <li><b>Anamnese estética</b>: fototipo, contraindicações, alergias, medicamentos, gestação.</li>
    <li><b>Intercorrências</b> registradas, com aviso para notificar a Anvisa quando for o caso.</li>
    <li><b>Guarda de 20 anos</b> e histórico de quem viu e quem alterou.</li>
  </ul>
</div>
""")

# 12. Pacotes e comissões -------------------------------------------------------
def vence(v):
    return v if v else '<span class="etiqueta alerta">renovação em aberto</span>'


linhas_pac = "".join(f"<tr><td>{a}</td><td>{troca(b)}</td><td>{c}</td><td>{vence(d)}</td></tr>" for a, b, c, d in C["pacotes"])
pacotes = f"""
<div class="topo-painel"><b>Pacotes e comissões, outubro</b></div>
<table class="tabela compacta">
  <tr><th>Paciente</th><th>Pacote</th><th>Saldo</th><th>Vence</th></tr>
  {linhas_pac}
</table>
<table class="tabela compacta" style="margin-top:14px">
  <tr><th>Profissional</th><th>Vínculo</th><th>Atendimentos</th><th>Comissão</th></tr>
  <tr><td>Ana</td><td>Parceira</td><td>42</td><td><span class="etiqueta verde">calculada</span></td></tr>
  <tr><td>Bruno</td><td>CLT</td><td>31</td><td><span class="etiqueta ouro">em conferência</span></td></tr>
</table>
<p class="miudo" style="margin-top:10px">Comissão sobre o valor líquido: o que entrou, menos taxa do cartão, imposto e insumo.</p>
"""
pagina(f"""
<div class="duas painel-lado">
  <div>
    <p class="secao">Pacotes, clube e comissões</p>
    <h2>O saldo de cada pacote e a comissão de cada profissional, sem planilha.</h2>
    <ul class="lista-limpa">
      <li><b>Pacotes com saldo</b>: cada sessão concluída desconta sozinha, e a paciente vê no app.</li>
      <li><b>{C["clube"]}</li>
      <li><b>Cancelamento justo</b>, com o cálculo das sessões já feitas, como os tribunais têm decidido.</li>
      <li><b>Comissões</b> por profissional e por tipo de vínculo, sobre o valor líquido.</li>
      <li><b>Recebimentos</b>: o que entrou, o que falta e quem está em atraso.</li>
    </ul>
  </div>
  <div>{janela(pacotes)}</div>
</div>
<p class="fonte">Referências: Lei 13.352/2016 (salão-parceiro); decisões sobre cancelamento de pacotes. Os dados da tela são ilustrativos.</p>
""")

# 13. Estoque --------------------------------------------------------------------
def validade(v):
    return v if v else '<span class="etiqueta ouro">vence em 40 dias</span>'


linhas_est = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{validade(c)}</td><td>{d}</td></tr>" for a, b, c, d in C["estoque"])
alerta_titulo, alerta_texto = C["estoque_alerta"]
estoque = f"""
<div class="topo-painel"><b>Estoque</b><span class="etiqueta alerta">1 lote em alerta</span></div>
<table class="tabela compacta">
  <tr><th>Produto</th><th>Lote</th><th>Validade</th><th>Saldo</th></tr>
  {linhas_est}
</table>
<div class="alerta-lote"><b>{alerta_titulo}</b><p>{alerta_texto} <u>Ver pacientes e avisar</u></p></div>
"""
pagina(f"""
<div class="duas painel-lado">
  <div>
    <p class="secao">Estoque e rastreio</p>
    <h2>Cada frasco sabe em quem foi aplicado.</h2>
    <ul class="lista-limpa">
      <li>Entrada com lote, validade e nota do fornecedor.</li>
      <li>Baixa automática pelo prontuário, inclusive frasco fracionado.</li>
      <li>Usa primeiro o que vence primeiro, com aviso de vencimento e de estoque mínimo.</li>
      <li>Lote sob alerta: a lista das pacientes que o receberam sai na hora.</li>
      <li>Quanto de produto cada procedimento consome, de verdade.</li>
    </ul>
  </div>
  <div>{janela(estoque)}</div>
</div>
""")

# 14. Retenção ---------------------------------------------------------------------
regua = "".join(f"<div><span>{q}</span><b>{t}</b><p>{d}</p></div>" for q, t, d in C["regua"])
pagina(f"""
<p class="secao">O cuidado que traz a paciente de volta</p>
<h2>O app lembra a paciente na hora certa, com mensagem de cuidado, não de promoção.</h2>
<div class="regua">{regua}</div>
<div class="faixa-fatos"><p><b>Por que funciona:</b> lá fora, quem tem dois ou mais retornos marcados cancela 4% das vezes, contra 37% de quem tem um só. Por isso o app marca o próximo passo, e não só a próxima data.</p></div>
<p class="fonte">Fonte do dado: Zenoti Benchmark 2026. Mensagens de marketing só com consentimento (LGPD); lembretes sem citar o procedimento.</p>
""")

# 15. Atenção e números ---------------------------------------------------------------
atencao = '<div class="topo-painel"><b>Quem precisa de atenção hoje</b></div>' + "".join(
    f'<div class="linha-app"><span class="etiqueta {cls}">{rot}</span> {txt}</div>' for cls, rot, txt in C["atencao"]
)
numeros = ["Ocupação da agenda", "Faltas", "Retorno por paciente", "Avaliações que viram tratamento", "Pacientes que saem com a próxima data", "Retorno em até 150 dias", "Pacotes em andamento", "Avaliações no Google"]
lista_numeros = "".join(f"<li>{n}</li>" for n in numeros)
pagina(f"""
<div class="duas painel-lado">
  <div>
    <p class="secao">O que olhar todo dia e todo mês</p>
    <h2>Uma lista do que fazer hoje e oito números para o mês.</h2>
    <p class="lead menor">Em vez de dezenas de gráficos que ninguém abre:</p>
    <ol class="oito">{lista_numeros}</ol>
  </div>
  <div>{janela(atencao)}</div>
</div>
""")

# 16. Segurança --------------------------------------------------------------------------
pagina(f"""
<p class="secao">Segurança e LGPD desde o desenho</p>
<h2>Os dados das pacientes protegidos, e a clínica pronta para uma fiscalização.</h2>
<div class="grade-seg">
  <div><h3>Cada um vê o seu</h3><p>Papéis de direção, profissional e recepção. A recepção não abre prontuário. Cada acesso fica registrado.</p></div>
  <div><h3>Fotos guardadas com segurança</h3><p>Armazenamento privado, links que expiram e nada guardado no celular pessoal da equipe.</p></div>
  <div><h3>Consentimentos separados</h3><p>Tratamento de saúde, uso de imagem e mensagens de marketing, cada um com versão e data.</p></div>
  <div><h3>Guarda e exclusão</h3><p>Prontuário guardado por 20 anos. A exclusão apaga o resto e explica o que precisa ficar.</p></div>
  <div><h3>Cópias e recuperação</h3><p>Cópia de segurança diária, guardada por 30 dias, com retorno a qualquer ponto recente.</p></div>
  <div><h3>Os dados são da {C["chamada"]}</h3><p>Banco de dados e arquivos só da clínica, com exportação quando ela quiser.</p></div>
</div>
<p class="fonte">Boa parte disso já funciona hoje no sistema em que o app se apoia. Para médicos dispensarem o papel, o CFM pede assinatura com certificado ICP-Brasil, que entra como opção.</p>
""")

# 17. Não começa do zero -----------------------------------------------------------------------
pagina(f"""
<p class="secao">Não começa do zero</p>
<h2>O app nasce de um sistema que já está no ar e funcionando.</h2>
<div class="reuso">
  <div class="col pronto"><h3>Já funciona hoje</h3><ul>
    <li>Uma instalação por clínica, com marca e endereço próprios</li><li>App que se instala pelo navegador, sem loja</li><li>Notificações no celular</li><li>Lembretes e mensagens pelo WhatsApp</li><li>Agenda online</li><li>Login, segurança, LGPD e registro de acessos</li><li>Cópias de segurança diárias</li><li>Questionários, documentos e fotos de evolução</li><li>Relatórios, aniversários e importação de pacientes</li></ul></div>
  <div class="col novo"><h3>Será criado para a {C["chamada"]}</h3><ul>
    <li>Equipe com papéis</li><li>Agenda por profissional, sala e aparelho</li><li>Catálogo dos tratamentos da clínica</li><li>Prontuário da sessão com mapa de aplicação</li><li>Termo com assinatura eletrônica</li><li>Pacotes com saldo e clube</li><li>Estoque com lote e validade</li><li>Comissões e recebimentos</li><li>Ligação com o site novo da {C["chamada"]}</li></ul></div>
</div>
<p class="fonte">Cada nova parte passa por testes automáticos antes de ir para o ar.</p>
""")

# 18. Etapas -----------------------------------------------------------------------------------
pagina(f"""
<p class="secao">Como construímos juntos</p>
<h2>Quatro etapas, com a {C["chamada"]} usando o app desde a segunda.</h2>
<div class="etapas-plano">
  <div><span class="tempo">Etapa 1</span><h3>Conversa e desenho</h3><p>Uma conversa com a equipe sobre a rotina, os protocolos e os termos da clínica. Saímos com a lista do que entra primeiro.</p></div>
  <div class="piloto"><span class="tempo">Etapa 2</span><h3>Primeira versão</h3><p>Agenda por sala e aparelho, anamnese e termo com assinatura, prontuário com lote, fotos com guia, pacotes com saldo, pós e revisão automáticos, WhatsApp.</p><b>Em uso na clínica</b></div>
  <div><span class="tempo">Etapa 3</span><h3>Versão completa</h3><p>Mapa de aplicação, estoque com baixa automática e cartão do produto, comissões, painel de atenção, reativação e avaliação no Google.</p></div>
  <div><span class="tempo">Etapa 4</span><h3>Evolução</h3><p>Conforme a clínica pedir: pagamento integrado, nota fiscal, clube com cobrança recorrente, novas unidades, IA nas anotações.</p></div>
</div>
<p class="fonte">Cada entrega é mostrada funcionando antes de seguir para a próxima. O ritmo combinamos juntos.</p>
""")

# 19. A parceria ------------------------------------------------------------------------------------
pagina(f"""
<p class="secao">Como funciona a parceria</p>
<h2>O app em troca de serviços da clínica. Uma parceria, não uma venda.</h2>
<div class="parceria">
  <div class="lado recebe">
    <h3>O que a {C["chamada"]} recebe</h3>
    <ul class="lista-limpa">
      <li>App da paciente com o nome, o logo, as cores e o endereço da clínica.</li>
      <li>Painel da equipe: agenda, prontuário, termos, pacotes e estoque.</li>
      <li>Ligação com o site novo da clínica.</li>
      <li>Implantação, importação das pacientes e treinamento da equipe.</li>
      <li>Ajustes durante o uso, a partir do retorno da equipe.</li>
    </ul>
  </div>
  <div class="lado troca">
    <h3>Em troca</h3>
    <p>Serviços da clínica, em condições que combinamos juntos numa conversa.</p>
    <h3 class="segundo">Como a clínica participa</h3>
    <p>Usa no dia a dia e conta o que funciona e o que falta. É assim que o app fica com a cara da clínica de verdade.</p>
  </div>
  <div class="lado medir">
    <h3>O que acompanhamos juntos</h3>
    <p class="miudo-titulo">Nas primeiras semanas de uso</p>
    <ul class="lista-limpa">
      <li>Confirmações automáticas e faltas</li>
      <li>Pacientes que saem com a próxima data</li>
      <li>Pacientes usando o app</li>
      <li>Tempo para registrar uma sessão</li>
    </ul>
  </div>
</div>
""", "rosa")

# 20. Próximos passos ---------------------------------------------------------------------------------
final_arte = (
    f'<figure class="arco final-arco"><img src="{arq(C["foto_final"])}" alt="{C["foto_final_alt"]}"></figure>'
    if C["foto_final"]
    else f'<div class="final-arco final-logo-grande"><img src="{arq(C["logo_vertical_claro"])}" alt=""></div>'
)
pagina(f"""
<div class="final">
  <img class="final-logo" src="{arq(C["logo_claro"])}" alt="{C["nome"]}">
  <p class="secao">Próximos passos</p>
  <h2>Se a ideia fizer sentido, <em>o próximo passo é uma conversa.</em></h2>
  <ol>
    <li><b>Uma conversa sobre a rotina da clínica</b>, com quem vive a agenda, o prontuário e o atendimento.</li>
    <li><b>Ajustamos juntos</b> o que entra na primeira versão.</li>
    <li><b>Combinamos a permuta</b>, do jeito que for bom para os dois lados.</li>
    <li><b>Começo a construção</b> e mostro cada entrega funcionando antes de seguir.</li>
  </ol>
  <p class="lead">{troca(C["frase_final"])}</p>
</div>
{final_arte}
""", "noite")


css = (RAIZ / "estilo-paginas.css").read_text()
html = (
    f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>{C["nome"]}: app com a sua marca</title>'
    f'<link rel="stylesheet" href="deck.css"><style>{css}</style><link rel="stylesheet" href="{arq("tema.css")}"></head>'
    f'<body>{"".join(paginas)}</body></html>'
)
(RAIZ / "deck.html").write_text(html)
print(f"{pasta}: {len(paginas)} páginas montadas em deck.html")
