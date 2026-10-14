// Tratamentos que a clínica divulga no site atual (fernandaprevedello.com) e no Instagram
// (@dranandaprevedello), cada um com a sua página em /tratamentos/<slug>/. Textos educativos e sem
// promessa de resultado: o que é, para quem costuma ser indicado, como é feito, cuidados e dúvidas.
// Sem marcas de aparelhos ou produtos, sem preço, sem antes e depois, sem depoimentos e sem urgência.
// A clínica deve revisar cada página antes da divulgação.
//
// Ajustes de propósito em relação ao site atual: "células-tronco" virou "ativos rejuvenescedores"
// (não há tratamento estético com células-tronco aprovado), "gluteoplastia" virou "harmonização
// glútea" (plastia é cirurgia) e o lipedema aparece com o diagnóstico feito pelo médico.
import type { NomeIcone } from "./icones.ts";

export type Categoria = "Íntima" | "Corpo" | "Pele";

export interface Tratamento {
  slug: string;
  nome: string;
  categoria: Categoria;
  /** Ícone do tratamento, nos cartões e no topo da página. */
  icone: NomeIcone;
  /** Foto do topo da página (arquivo em src/assets/fotos/). Sem foto, o topo mostra o emblema com o ícone. */
  foto?: { arquivo: string; alt: string };
  /** Continuação do título, na segunda linha. */
  destaque: string;
  /** Uma frase: aparece nos cartões e na descrição para o Google. */
  resumo: string;
  /** Complemento da mensagem do WhatsApp: "...uma avaliação <assunto>." */
  assunto: string;
  oQueE: string[];
  indicacoes: string[];
  etapas: { titulo: string; texto: string }[];
  ficha: { termo: string; texto: string }[];
  cuidados: string[];
  duvidas: { p: string; r: string }[];
}

const etapasPadrao = (procedimento: string): Tratamento["etapas"] => [
  { titulo: "Avaliação", texto: "Conversa sobre o que incomoda você, o seu histórico de saúde e as suas expectativas." },
  { titulo: "Plano individual", texto: "Técnicas, número de sessões e cuidados explicados antes de começar." },
  { titulo: procedimento, texto: "Feito na clínica, com produtos registrados na Anvisa e os cuidados de cada etapa." },
  { titulo: "Acompanhamento", texto: "Retornos para ver a evolução e ajustar o plano, com contato direto pelo WhatsApp." },
];

const etapasIntimas = (procedimento: string): Tratamento["etapas"] => [
  { titulo: "Consulta reservada", texto: "Uma conversa individual e sigilosa sobre a sua queixa, a sua saúde e o que você deseja." },
  { titulo: "Plano individual", texto: "O que pode ser feito, os cuidados e os riscos, explicados antes de qualquer procedimento." },
  { titulo: procedimento, texto: "Feito na clínica, em ambiente reservado, com produtos registrados na Anvisa." },
  { titulo: "Acompanhamento", texto: "Retornos para acompanhar a evolução e tirar dúvidas, com contato direto pelo WhatsApp." },
];

export const tratamentos: Tratamento[] = [
  {
    slug: "harmonizacao-intima-feminina",
    nome: "Harmonização íntima feminina",
    categoria: "Íntima",
    icone: "flor",
    destaque: "conforto, cuidado e autoestima.",
    assunto: "de harmonização íntima feminina",
    resumo:
      "Procedimentos estéticos e funcionais para a região íntima feminina: volume, contorno, firmeza e qualidade da pele, com avaliação individual e total discrição.",
    oQueE: [
      "A harmonização íntima feminina reúne procedimentos que cuidam da aparência, da proporção e do conforto da região íntima: lábios maiores e menores, monte púbico e a pele ao redor.",
      "Cada plano nasce de uma consulta individual e reservada, que respeita a anatomia, a sensibilidade e o que a paciente deseja. A preservação da sensibilidade e da função da região vem antes de tudo.",
    ],
    indicacoes: [
      "Perda de volume dos lábios maiores ou do monte púbico, com a idade, o emagrecimento ou o pós-parto",
      "Excesso de pele ou assimetria dos pequenos lábios",
      "Manchas, cicatrizes ou estrias na região",
      "Ressecamento e desconforto leves, como cuidado complementar",
      "Desejo de se sentir mais confortável e confiante",
    ],
    etapas: etapasIntimas("Procedimento"),
    ficha: [
      { termo: "Atendimento", texto: "Consulta individual e reservada" },
      { termo: "Técnicas", texto: "Escolhidas na avaliação: bioestimuladores, preenchimento, laser e outras" },
      { termo: "Sessões", texto: "Conforme o plano" },
      { termo: "Volta à rotina", texto: "Orientada caso a caso, com os cuidados explicados" },
    ],
    cuidados: [
      "Seguir as orientações de higiene e de repouso passadas na consulta.",
      "Evitar relações, academia, piscina e mar pelo período indicado.",
      "Usar roupas leves e confortáveis nos primeiros dias.",
    ],
    duvidas: [
      { p: "A consulta é reservada?", r: "Sim. A avaliação é individual, em ambiente reservado, e o que é conversado fica entre você e a Dra. Nanda." },
      {
        p: "Quais procedimentos podem fazer parte?",
        r: "Depende da avaliação e do que você deseja. Podem entrar bioestimuladores de colágeno, preenchimento, laser e técnicas para os pequenos lábios, como a NinfoSlim.",
      },
      {
        p: "Pode alterar a sensibilidade?",
        r: "O planejamento prioriza a preservação da sensibilidade e da função da região. Os riscos e os cuidados são explicados na consulta, antes de qualquer procedimento.",
      },
    ],
  },
  {
    slug: "ninfoslim",
    nome: "NinfoSlim",
    categoria: "Íntima",
    icone: "laser",
    destaque: "os pequenos lábios remodelados com laser, sem cortes.",
    assunto: "da técnica NinfoSlim",
    resumo:
      "Técnica com laser para reduzir e remodelar os pequenos lábios sem cortes e sem pontos, indicada depois de avaliação individual. A Dra. Nanda trouxe a técnica para Balneário Camboriú.",
    oQueE: [
      "A NinfoSlim é uma técnica não cirúrgica para a região dos pequenos lábios. Com a energia do laser aplicada de forma controlada, ela reduz e remodela o excesso de pele, sem cortes e sem pontos.",
      "É procurada por mulheres que sentem incômodo estético ou físico com o tamanho ou a forma dos pequenos lábios. A avaliação confirma se a técnica é a melhor opção para o seu caso.",
    ],
    indicacoes: [
      "Excesso de pele dos pequenos lábios",
      "Assimetria entre os lados",
      "Atrito ou desconforto com roupas e na atividade física",
      "Incômodo estético com a região",
    ],
    etapas: etapasIntimas("Sessão com laser"),
    ficha: [
      { termo: "Técnica", texto: "Laser, sem cortes e sem pontos" },
      { termo: "Sessões", texto: "Definidas na avaliação" },
      { termo: "Efeito", texto: "Progressivo, conforme a cicatrização" },
      { termo: "Volta à rotina", texto: "Com as restrições orientadas para os primeiros dias" },
    ],
    cuidados: [
      "Fazer a higiene íntima suave, como orientado.",
      "Evitar relações sexuais, academia, piscina e mar pelo período indicado.",
      "Usar roupas íntimas de algodão e peças folgadas.",
    ],
    duvidas: [
      { p: "Precisa de cirurgia?", r: "Não. A NinfoSlim é feita com laser, sem cortes e sem pontos, na própria clínica." },
      {
        p: "Toda mulher pode fazer?",
        r: "A indicação depende da avaliação: anatomia, saúde íntima e expectativas. Quando a técnica não é a melhor opção, isso é explicado na consulta.",
      },
      { p: "Quando dá para ver a mudança?", r: "A remodelação é progressiva e acompanha a cicatrização da pele. A evolução é acompanhada em cada retorno." },
    ],
  },
  {
    slug: "harmonizacao-intima-masculina",
    nome: "Harmonização íntima masculina",
    categoria: "Íntima",
    icone: "escudo",
    destaque: "avaliação individual e total sigilo.",
    assunto: "de harmonização íntima masculina",
    resumo:
      "Procedimentos estéticos para a região íntima masculina: contorno, proporção, firmeza e qualidade da pele, com consulta reservada e plano individual.",
    oQueE: [
      "A harmonização íntima masculina reúne procedimentos estéticos para a aparência e a proporção da região íntima. A pele do escroto também pode ser tratada, para firmeza e textura.",
      "O plano é definido em consulta individual e sigilosa, depois de entender a anatomia, a saúde e o que o paciente deseja. Quando há queixa funcional, a avaliação inclui o encaminhamento ao médico.",
    ],
    indicacoes: [
      "Insatisfação com contorno, volume ou proporção",
      "Flacidez ou envelhecimento da pele do escroto",
      "Cicatrizes ou manchas na região",
      "Desejo de mais segurança e autoestima",
    ],
    etapas: etapasIntimas("Procedimento"),
    ficha: [
      { termo: "Atendimento", texto: "Consulta individual e sigilosa" },
      { termo: "Técnicas", texto: "Escolhidas na avaliação, com produtos registrados na Anvisa" },
      { termo: "Sessões", texto: "Uma ou mais, conforme o plano" },
      { termo: "Volta à rotina", texto: "Com as restrições orientadas para os primeiros dias" },
    ],
    cuidados: [
      "Evitar relações e atividade física intensa pelo período indicado.",
      "Seguir a higiene orientada na consulta.",
      "Avisar a clínica de qualquer sinal diferente do esperado.",
    ],
    duvidas: [
      { p: "O atendimento é sigiloso?", r: "Sim. A consulta é individual e reservada, e as informações do paciente são tratadas com sigilo." },
      {
        p: "Tudo é feito numa sessão só?",
        r: "Cada caso é avaliado individualmente. O ganho da primeira sessão não precisa ser o único: o plano pode prever novas etapas, conforme a anatomia.",
      },
      { p: "Preciso de exames antes?", r: "A avaliação define se algum exame ou avaliação médica é necessário antes do procedimento." },
    ],
  },
  {
    slug: "lipolaser-slim",
    nome: "Lipolaser Slim",
    categoria: "Corpo",
    icone: "laser",
    destaque: "laser, ozônio e ativos para a gordura localizada.",
    assunto: "do Lipolaser Slim",
    resumo:
      "Protocolo minimamente invasivo, feito na clínica, que combina laser, controle de temperatura, ozonioterapia e ativos personalizados para a gordura localizada e a flacidez.",
    oQueE: [
      "O Lipolaser Slim foi pensado para quem se cuida e mesmo assim mantém áreas de gordura localizada. O laser atua nas células de gordura e estimula a quebra dos depósitos, enquanto uma câmera termográfica acompanha a temperatura da pele, no ponto que estimula o colágeno e a retração.",
      "O protocolo soma a ozonioterapia, que melhora a oxigenação dos tecidos, e ativos com aminoácidos e vitaminas escolhidos para cada paciente. A evolução é progressiva: o corpo precisa de tempo para responder.",
    ],
    indicacoes: [
      "Gordura localizada em abdômen, flancos, costas, braços ou papada",
      "Flacidez leve junto com a gordura",
      "Quem já se exercita e se alimenta bem e mantém áreas resistentes",
    ],
    etapas: etapasPadrao("Sessão"),
    ficha: [
      { termo: "Técnicas", texto: "Laser, câmara termográfica, ozonioterapia e ativos personalizados" },
      { termo: "Procedimentos", texto: "Minimamente invasivo, na própria clínica, sem internação" },
      { termo: "Sessões", texto: "Definidas na avaliação" },
      { termo: "Efeito", texto: "Progressivo, ao longo das semanas" },
    ],
    cuidados: [
      "Usar a malha compressiva, se indicada.",
      "Fazer as drenagens e os retornos combinados.",
      "Manter hidratação, alimentação equilibrada e atividade física, liberada conforme a orientação.",
    ],
    duvidas: [
      {
        p: "É uma cirurgia?",
        r: "Não. É um procedimento minimamente invasivo, feito na clínica, sem internação. Ele não substitui a cirurgia plástica quando ela é a indicação.",
      },
      { p: "Serve para emagrecer?", r: "Não é um tratamento para perda de peso. Ele cuida de áreas de gordura localizada e da qualidade da pele, junto com hábitos saudáveis." },
      { p: "Quando aparece a mudança?", r: "A evolução é progressiva: a pele e os tecidos respondem ao longo das semanas. Não existe milagre, existe fisiologia." },
    ],
  },
  {
    slug: "harmonizacao-glutea",
    nome: "Harmonização glútea",
    categoria: "Corpo",
    icone: "colageno",
    destaque: "volume e firmeza com o seu próprio colágeno.",
    assunto: "de harmonização glútea",
    resumo:
      "Bioestimuladores de colágeno e técnicas complementares para volume, contorno e firmeza dos glúteos, com mudança progressiva e respeito à proporção do corpo.",
    oQueE: [
      "A harmonização glútea usa bioestimuladores de colágeno e técnicas complementares para dar volume, contorno e sustentação aos glúteos, e melhorar a textura e a firmeza da pele.",
      "O colágeno é produzido pelo próprio corpo ao longo das semanas, por isso a mudança é progressiva. O plano respeita a proporção do seu corpo e usa só substâncias registradas na Anvisa.",
    ],
    indicacoes: ["Perda de volume ou de contorno", "Flacidez e pele com textura irregular", "Assimetria leve", "Celulite junto com a flacidez"],
    etapas: etapasPadrao("Aplicação"),
    ficha: [
      { termo: "Técnicas", texto: "Bioestimuladores de colágeno e técnicas complementares" },
      { termo: "Sessões", texto: "Definidas na avaliação" },
      { termo: "Efeito", texto: "Progressivo, conforme o corpo produz colágeno" },
      { termo: "Volta à rotina", texto: "Geralmente no mesmo dia, com os cuidados orientados" },
    ],
    cuidados: [
      "Fazer as massagens orientadas, quando indicadas.",
      "Evitar atividade física intensa nos primeiros dias, conforme a orientação.",
      "Manter a hidratação e os retornos combinados.",
    ],
    duvidas: [
      {
        p: "É um preenchimento definitivo?",
        r: "Não. Os bioestimuladores estimulam o colágeno do próprio corpo. A clínica não usa substâncias sem registro na Anvisa.",
      },
      { p: "Em quanto tempo noto diferença?", r: "A produção de colágeno leva semanas. A evolução é acompanhada nos retornos." },
      {
        p: "Posso combinar com outros tratamentos?",
        r: "Sim. Muitas vezes a harmonização glútea é combinada com tratamentos para flacidez e gordura localizada, conforme a avaliação.",
      },
    ],
  },
  {
    slug: "power-shape",
    nome: "Power Shape",
    categoria: "Corpo",
    icone: "musculo",
    destaque: "definição e contorno do corpo.",
    assunto: "do Power Shape",
    resumo:
      "Ativos bioestimuladores e eletroestimulação muscular para cuidar da gordura localizada, firmar a pele e definir o contorno, inclusive do abdômen.",
    oQueE: [
      "O Power Shape combina técnica avançada e ativos bioestimuladores para cuidar da gordura localizada e da qualidade da pele, com foco em definição e contorno.",
      "Quando o objetivo é definir o abdômen, o protocolo soma a eletroestimulação (Shape Power), que provoca contrações musculares para tonificar e fortalecer a musculatura.",
    ],
    indicacoes: ["Gordura localizada", "Abdômen sem definição", "Flacidez muscular e de pele", "Complemento da atividade física"],
    etapas: etapasPadrao("Sessões"),
    ficha: [
      { termo: "Técnicas", texto: "Ativos bioestimuladores e eletroestimulação muscular" },
      { termo: "Sessões", texto: "Definidas na avaliação" },
      { termo: "Efeito", texto: "Progressivo, ao longo das sessões" },
      { termo: "Volta à rotina", texto: "No mesmo dia" },
    ],
    cuidados: ["Manter a hidratação.", "Combinar com alimentação equilibrada e atividade física.", "Seguir a frequência de sessões do plano."],
    duvidas: [
      { p: "A eletroestimulação substitui a academia?", r: "Não. Ela complementa o treino, estimulando a musculatura de forma localizada." },
      {
        p: "Quem não pode fazer?",
        r: "Gestantes e pessoas com marca-passo, entre outras condições, não fazem eletroestimulação. A avaliação confere o seu histórico de saúde.",
      },
      { p: "Quantas sessões são necessárias?", r: "Depende do objetivo e da resposta do seu corpo. O número de sessões é definido no plano." },
    ],
  },
  {
    slug: "corpo-detox",
    nome: "Protocolo Corpo Detox",
    categoria: "Corpo",
    icone: "folha",
    foto: { arquivo: "corpo-detox.jpg", alt: "Mulher bebendo água com limão numa bancada com plantas e frutas cítricas" },
    destaque: "o protocolo idealizado pela Dra. Nanda.",
    assunto: "do Protocolo Corpo Detox",
    resumo:
      "Protocolo integrativo e exclusivo, idealizado pela Dra. Nanda a partir de estudos científicos, que une o cuidado com a saúde e a estética do corpo.",
    oQueE: [
      "O Corpo Detox é o protocolo integrativo idealizado pela Dra. Nanda, desenvolvido a partir de dezenas de estudos e de descobertas recentes da ciência. Ele olha para o corpo inteiro: inflamação, retenção, qualidade dos tecidos e hábitos.",
      "As etapas e as técnicas são escolhidas depois da avaliação, conforme a sua saúde e os seus objetivos, e podem combinar tecnologias, ozonioterapia e orientações para a rotina.",
    ],
    indicacoes: [
      "Sensação de inchaço e retenção",
      "Quem quer começar o cuidado com o corpo pela saúde",
      "Preparo do corpo para outros protocolos",
      "Rotina corrida que pede um recomeço",
    ],
    etapas: etapasPadrao("Protocolo"),
    ficha: [
      { termo: "Foco", texto: "Saúde e estética do corpo, juntas" },
      { termo: "Técnicas", texto: "Escolhidas na avaliação" },
      { termo: "Sessões", texto: "Conforme o plano" },
      { termo: "Exclusivo", texto: "Idealizado pela Dra. Nanda" },
    ],
    cuidados: [
      "Seguir as orientações de alimentação e hidratação do plano.",
      "Manter a frequência combinada.",
      "Contar à clínica sobre medicamentos e mudanças na sua saúde.",
    ],
    duvidas: [
      {
        p: "É uma dieta?",
        r: "Não. O protocolo combina técnicas na clínica e orientações para a rotina. Quando há necessidade de dieta, o acompanhamento com nutricionista é indicado.",
      },
      { p: "Posso fazer junto com outros tratamentos?", r: "Sim. Ele pode preparar o corpo e acompanhar outros protocolos, conforme a avaliação." },
      { p: "Quanto tempo dura?", r: "Depende dos objetivos e da resposta do corpo. A duração é definida no plano." },
    ],
  },
  {
    slug: "lipedema",
    nome: "Cuidados com o lipedema",
    categoria: "Corpo",
    icone: "gota",
    destaque: "dor e peso nas pernas merecem atenção.",
    assunto: "sobre lipedema",
    resumo:
      "Dor, cansaço e sensação de peso nas pernas podem ser sinais de lipedema. A avaliação ajuda a entender os sintomas, e a ozonioterapia pode entrar como cuidado complementar.",
    oQueE: [
      "O lipedema é um acúmulo anormal de gordura, em geral nas pernas e nos quadris, que costuma vir com dor, sensibilidade ao toque, roxos frequentes e sensação de peso. Não é só celulite, e não melhora apenas com dieta.",
      "Na clínica, a avaliação olha para os sintomas e para o seu histórico, e orienta a busca pelo diagnóstico, que é médico. O cuidado pode incluir ozonioterapia, drenagem e tecnologias para os tecidos, junto com o acompanhamento do médico.",
    ],
    indicacoes: [
      "Dor, cansaço e peso nas pernas",
      "Gordura desproporcional em pernas e quadris",
      "Sensibilidade ao toque e roxos frequentes",
      "Inchaço que piora no fim do dia",
    ],
    etapas: etapasPadrao("Sessões"),
    ficha: [
      { termo: "Foco", texto: "Conforto, inflamação e qualidade dos tecidos" },
      { termo: "Técnicas", texto: "Ozonioterapia, drenagem e tecnologias, conforme o caso" },
      { termo: "Sessões", texto: "Acompanhamento contínuo" },
      { termo: "Diagnóstico", texto: "Feito pelo médico; a clínica orienta e acompanha" },
    ],
    cuidados: [
      "Manter o acompanhamento médico.",
      "Usar a meia compressiva, se indicada.",
      "Preferir atividade física de baixo impacto e manter a hidratação.",
    ],
    duvidas: [
      {
        p: "Lipedema é o mesmo que celulite?",
        r: "Não. A celulite é uma alteração da pele; o lipedema é um acúmulo de gordura com dor e sensibilidade, que precisa de diagnóstico médico.",
      },
      {
        p: "A ozonioterapia cura o lipedema?",
        r: "Não existe cura para o lipedema. A ozonioterapia pode ajudar como cuidado complementar, junto com o acompanhamento médico.",
      },
      {
        p: "Como sei se tenho lipedema?",
        r: "Os sinais ajudam a suspeitar, mas o diagnóstico é médico. Na avaliação, a Dra. Nanda ajuda a entender os sintomas e orienta os próximos passos.",
      },
    ],
  },
  {
    slug: "ozonioterapia",
    nome: "Ozonioterapia",
    categoria: "Corpo",
    icone: "bolhas",
    destaque: "mais oxigênio para os tecidos.",
    assunto: "de ozonioterapia",
    resumo:
      "Ozônio medicinal como procedimento complementar: melhora a oxigenação dos tecidos, tem ação anti-inflamatória e apoia os tratamentos de gordura localizada, flacidez e lipedema.",
    oQueE: [
      "A ozonioterapia usa uma mistura de oxigênio e ozônio medicinal, aplicada em pequenas quantidades. Ela melhora a oxigenação dos tecidos e tem ação anti-inflamatória.",
      "Na clínica, ela entra como procedimento complementar em protocolos do corpo, como o Lipolaser Slim e os cuidados com o lipedema. No Brasil, a ozonioterapia é autorizada como procedimento complementar pela Lei 14.648/2023.",
    ],
    indicacoes: ["Gordura localizada e flacidez, junto com outros protocolos", "Lipedema, como cuidado complementar", "Inchaço e inflamação dos tecidos", "Qualidade e firmeza da pele"],
    etapas: etapasPadrao("Aplicação"),
    ficha: [
      { termo: "Técnica", texto: "Ozônio medicinal, em equipamento regularizado" },
      { termo: "Sessões", texto: "Em série, conforme o protocolo" },
      { termo: "Efeito", texto: "Gradual, somado ao protocolo principal" },
      { termo: "Volta à rotina", texto: "No mesmo dia" },
    ],
    cuidados: ["Manter a hidratação.", "Seguir a frequência do protocolo.", "Contar à clínica sobre medicamentos e condições de saúde."],
    duvidas: [
      {
        p: "A ozonioterapia é permitida?",
        r: "Sim. A Lei 14.648/2023 autoriza a ozonioterapia como procedimento complementar, feita por profissional de saúde de nível superior com equipamento regularizado.",
      },
      { p: "Funciona sozinha?", r: "Na estética, ela potencializa outros protocolos. O plano mostra como ela se encaixa no seu tratamento." },
      { p: "Quem não pode fazer?", r: "Algumas condições de saúde contraindicam o ozônio. A avaliação confere o seu histórico antes de começar." },
    ],
  },
  {
    slug: "drenagem-pos-operatorio",
    nome: "Drenagem pós-operatório",
    categoria: "Corpo",
    icone: "ondas",
    destaque: "e o Dreno Spa, um dia dedicado a você.",
    assunto: "de drenagem pós-operatório",
    resumo:
      "Drenagem linfática especializada para o pós-operatório, com a liberação do cirurgião, e o Dreno Spa: um dia de cuidados relaxantes para o corpo.",
    oQueE: [
      "A drenagem linfática especializada ajuda o corpo no pós-operatório: reduz o inchaço, alivia o desconforto e acompanha a recuperação, sempre com a liberação e as orientações do cirurgião.",
      "O Dreno Spa é um dia dedicado a você, com drenagem e tratamentos relaxantes e rejuvenescedores, para quem quer cuidar do corpo e descansar.",
    ],
    indicacoes: ["Pós-operatório de cirurgias plásticas, com liberação médica", "Inchaço e retenção de líquidos", "Sensação de peso nas pernas", "Um dia de cuidado e descanso"],
    etapas: etapasPadrao("Sessões"),
    ficha: [
      { termo: "Técnica", texto: "Drenagem linfática especializada" },
      { termo: "Quando", texto: "No pós-operatório, depois da liberação do cirurgião" },
      { termo: "Sessões", texto: "Conforme a recuperação" },
      { termo: "Formato", texto: "Sessões avulsas ou o dia do Dreno Spa" },
    ],
    cuidados: ["Seguir as orientações do cirurgião.", "Usar a cinta ou a malha, se indicada.", "Manter a hidratação."],
    duvidas: [
      { p: "Quando posso começar a drenagem?", r: "Depois da liberação do cirurgião, que define o melhor momento para começar." },
      { p: "Quantas sessões são necessárias?", r: "Depende da cirurgia e da sua recuperação. A frequência é ajustada a cada etapa." },
      { p: "O Dreno Spa é só para quem operou?", r: "Não. É um dia de cuidados relaxantes que qualquer pessoa pode aproveitar, depois de uma avaliação." },
    ],
  },
  {
    slug: "royal-glow",
    nome: "Royal Glow",
    categoria: "Pele",
    icone: "brilho",
    destaque: "microagulhamento e radiofrequência para a pele.",
    assunto: "do Royal Glow",
    resumo:
      "Microagulhamento com radiofrequência e ativos rejuvenescedores para estimular a renovação da pele e cuidar de linhas, flacidez e textura.",
    oQueE: [
      "O Royal Glow combina microagulhamento, radiofrequência e ativos rejuvenescedores numa mesma sessão. O microagulhamento abre microcanais que estimulam a renovação da pele e ajudam os ativos a penetrar; a radiofrequência aquece as camadas mais profundas e estimula o colágeno.",
      "É um protocolo para o rosto que trabalha linhas finas, flacidez e textura, com evolução gradual a cada sessão.",
    ],
    indicacoes: ["Linhas finas e rugas iniciais", "Flacidez leve", "Textura irregular e poros aparentes", "Pele sem viço"],
    etapas: etapasPadrao("Sessões"),
    ficha: [
      { termo: "Técnicas", texto: "Microagulhamento, radiofrequência e ativos" },
      { termo: "Sessões", texto: "Em série, definida na avaliação" },
      { termo: "Efeito", texto: "Gradual, conforme a renovação da pele" },
      { termo: "Volta à rotina", texto: "Pele avermelhada por algumas horas ou dias" },
    ],
    cuidados: [
      "Protetor solar todos os dias, sem sol direto nos dias seguintes.",
      "Sem maquiagem nas primeiras 24 horas, ou conforme a orientação.",
      "Hidratar com os produtos indicados.",
    ],
    duvidas: [
      { p: "Incomoda?", r: "O conforto é cuidado em cada etapa, e a sensação varia de pessoa para pessoa. Tudo é explicado antes da sessão." },
      { p: "Quantas sessões são necessárias?", r: "Em geral, uma série de sessões com intervalo entre elas. O número é definido na avaliação." },
      { p: "Posso fazer no verão?", r: "Pode, com proteção solar rigorosa. A avaliação ajusta o protocolo à estação e à sua pele." },
    ],
  },
  {
    slug: "tratamento-da-acne",
    nome: "Tratamento da acne",
    categoria: "Pele",
    icone: "rosto",
    destaque: "tecnologias combinadas, um plano para cada pele.",
    assunto: "do tratamento da acne",
    resumo: "Laser, peeling, microagulhamento e ácidos combinados para tratar a acne e as marcas que ela deixa, com um plano para cada pele.",
    oQueE: [
      "A acne tem várias causas, por isso o tratamento combina técnicas: laser, peeling, microagulhamento e ácidos, escolhidos conforme o tipo de pele, a fase da acne e as marcas que ela deixou.",
      "O plano inclui as sessões na clínica e os cuidados em casa. Quando a acne pede tratamento médico, a avaliação orienta o encaminhamento.",
    ],
    indicacoes: ["Acne ativa", "Marcas e manchas deixadas pela acne", "Cicatrizes de acne", "Pele oleosa e poros dilatados"],
    etapas: etapasPadrao("Sessões"),
    ficha: [
      { termo: "Técnicas", texto: "Laser, peeling, microagulhamento e ácidos" },
      { termo: "Sessões", texto: "Definidas na avaliação" },
      { termo: "Efeito", texto: "Gradual, conforme a pele responde" },
      { termo: "Volta à rotina", texto: "Varia conforme a técnica do dia" },
    ],
    cuidados: ["Protetor solar todos os dias.", "Não espremer as lesões.", "Seguir a rotina de cuidados em casa indicada no plano."],
    duvidas: [
      { p: "Serve para adolescentes?", r: "Sim, com a autorização e o acompanhamento de um responsável, e o protocolo ajustado à idade." },
      { p: "Trata as cicatrizes também?", r: "As técnicas de renovação da pele ajudam nas marcas e cicatrizes. A avaliação mostra o que é possível em cada caso." },
      { p: "Preciso parar algum medicamento?", r: "Alguns medicamentos para acne interferem nos procedimentos. Conte tudo o que você usa na avaliação." },
    ],
  },
  {
    slug: "limpeza-de-pele",
    nome: "Limpeza de pele",
    categoria: "Pele",
    icone: "gota",
    destaque: "com aromaterapia e cromoterapia.",
    assunto: "de limpeza de pele",
    resumo: "Limpeza profunda com óleos essenciais e luzes, numa sessão relaxante que cuida da pele e do bem-estar.",
    oQueE: [
      "A limpeza de pele remove impurezas, células mortas e o excesso de oleosidade, e prepara a pele para receber os ativos de cuidado.",
      "Na clínica, ela é feita com aromaterapia, com óleos essenciais, e cromoterapia, com luzes coloridas, para que a sessão seja também um momento de descanso.",
    ],
    indicacoes: ["Cravos e poros obstruídos", "Pele oleosa ou mista", "Pele opaca", "Manutenção entre outros tratamentos"],
    etapas: etapasPadrao("Sessão"),
    ficha: [
      { termo: "Técnica", texto: "Limpeza profunda, com aromaterapia e cromoterapia" },
      { termo: "Sessões", texto: "A cada 30 a 45 dias, conforme a pele" },
      { termo: "Volta à rotina", texto: "No mesmo dia" },
      { termo: "Foco", texto: "Pele limpa e bem-estar" },
    ],
    cuidados: ["Protetor solar.", "Evitar maquiagem no mesmo dia.", "Manter a rotina de cuidados indicada."],
    duvidas: [
      { p: "Com que frequência posso fazer?", r: "Em geral, a cada 30 a 45 dias. A frequência é ajustada ao seu tipo de pele." },
      { p: "Pele sensível pode fazer?", r: "Sim, com técnicas e produtos escolhidos para peles sensíveis." },
      { p: "A pele fica vermelha?", r: "Pode ficar levemente avermelhada por algumas horas. Por isso, o ideal é não marcar compromissos importantes logo depois." },
    ],
  },
];

export const categorias: Categoria[] = ["Íntima", "Corpo", "Pele"];

export const porCategoria = (c: Categoria) => tratamentos.filter((t) => t.categoria === c);

export const porSlug = (slug: string) => {
  const t = tratamentos.find((x) => x.slug === slug);
  if (!t) throw new Error(`Tratamento não encontrado: ${slug}`);
  return t;
};

export const iconeDaCategoria: Record<Categoria, NomeIcone> = { Íntima: "flor", Corpo: "contorno", Pele: "rosto" };

/** Nome de cada frente de cuidado, como aparece na página principal e na lista de tratamentos. */
export const nomeDaCategoria: Record<Categoria, string> = {
  Íntima: "Harmonização íntima",
  Corpo: "Corpo e contorno",
  Pele: "Pele e rosto",
};

// Ícones da ficha "Em resumo" e das etapas, escolhidos pelo texto. O que não tiver
// correspondência usa o ícone do próprio tratamento.
const ICONES_DA_FICHA: [RegExp, NomeIcone][] = [
  [/dura[cç][aã]o/i, "ampulheta"],
  [/efeito/i, "evolucao"],
  [/rotina/i, "maleta"],
  [/anestesia/i, "gota"],
  [/sess[oõ]es/i, "calendario"],
  [/foco/i, "brilho"],
  [/quando/i, "relogio"],
  [/formato/i, "lista"],
  [/procedimentos/i, "escudo"],
  [/atendimento/i, "cadeado"],
  [/t[eé]cnicas?/i, "camadas"],
  [/diagn[oó]stico/i, "prancheta"],
  [/exclusivo/i, "coroa"],
];

const ICONES_DA_ETAPA: [RegExp, NomeIcone][] = [
  [/consulta|avalia/i, "prancheta"],
  [/plano|protocolo/i, "lista"],
  [/acompanhamento|retorno/i, "calendario"],
];

const procurar = (lista: [RegExp, NomeIcone][], texto: string, padrao: NomeIcone) =>
  lista.find(([regra]) => regra.test(texto))?.[1] ?? padrao;

export const iconeDaFicha = (termo: string, t: Tratamento) => procurar(ICONES_DA_FICHA, termo, t.icone);
export const iconeDaEtapa = (titulo: string, t: Tratamento) => procurar(ICONES_DA_ETAPA, titulo, t.icone);
