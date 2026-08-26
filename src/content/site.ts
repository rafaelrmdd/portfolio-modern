/**
 * Everything writeable on the site lives here.
 *
 * `content` is typed as Record<Locale, Dictionary>, so adding a string to `en`
 * without adding it to `pt` is a compile error — that is the whole reason this
 * is a plain typed object instead of an i18n library.
 *
 * Replace the placeholder values below; no component needs to be touched.
 */

export type Locale = "en" | "pt";

export const LOCALES = ["en", "pt"] as const satisfies readonly Locale[];

export type Project = {
  id: string;
  title: string;
  summary: string;
  year: string;
  tags: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  items: readonly string[];
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
    menu: string;
    close: string;
  };
  ui: {
    toLight: string;
    toDark: string;
    language: string;
    switchToPortuguese: string;
    switchToEnglish: string;
    skipToContent: string;
    backToTop: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    visualPlaceholder: string;
    visualHint: string;
  };
  about: {
    label: string;
    heading: string;
    paragraphs: readonly string[];
    facts: readonly { label: string; value: string }[];
  };
  projects: {
    label: string;
    heading: string;
    intro: string;
    viewCode: string;
    viewLive: string;
    items: readonly Project[];
  };
  skills: {
    label: string;
    heading: string;
    intro: string;
    groups: readonly SkillGroup[];
  };
  contact: {
    label: string;
    heading: string;
    intro: string;
    emailCta: string;
    email: string;
    socials: readonly SocialLink[];
  };
  footer: {
    note: string;
    builtWith: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Your Name — Full-stack Developer",
    description:
      "Portfolio of Your Name, a full-stack developer building fast, considered web interfaces.",
  },
  nav: {
    about: "About",
    projects: "Work",
    skills: "Stack",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
  },
  ui: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    language: "Language",
    switchToPortuguese: "Mudar para português",
    switchToEnglish: "Switch to English",
    skipToContent: "Skip to content",
    backToTop: "Back to top",
  },
  hero: {
    eyebrow: "Available for work",
    name: "Your Name",
    role: "Full-stack Developer",
    tagline:
      "I build web interfaces that are fast, sharp, and a little louder than they need to be.",
    primaryCta: "See the work",
    secondaryCta: "Get in touch",
    visualPlaceholder: "Hero visual",
    visualHint: "Reserved — WebGL scene drops in here",
  },
  about: {
    label: "About",
    heading: "Short version",
    paragraphs: [
      "Placeholder bio. Two or three sentences on what you build, what you care about, and what you are looking for. Keep it concrete — the reader is skimming.",
      "A second paragraph is optional. Use it for the thing that makes you different rather than the thing every developer says.",
    ],
    facts: [
      { label: "Based in", value: "Your City, Country" },
      { label: "Focus", value: "Frontend and product engineering" },
      { label: "Currently", value: "Open to opportunities" },
    ],
  },
  projects: {
    label: "Work",
    heading: "Selected projects",
    intro: "A few things I have built. Placeholder entries for now.",
    viewCode: "Code",
    viewLive: "Live",
    items: [
      {
        id: "project-one",
        title: "Project One",
        summary:
          "One or two lines on what the project does and the interesting problem inside it. Say the outcome, not the task list.",
        year: "2026",
        tags: ["React", "TypeScript", "Tailwind"],
        repoUrl: "https://github.com/",
        liveUrl: "https://example.com",
      },
      {
        id: "project-two",
        title: "Project Two",
        summary:
          "Another placeholder. Lead with what was hard — the constraint, the scale, the deadline — because that is what a reader remembers.",
        year: "2025",
        tags: ["Node", "PostgreSQL", "Docker"],
        repoUrl: "https://github.com/",
      },
      {
        id: "project-three",
        title: "Project Three",
        summary:
          "A third placeholder so the grid has shape. Delete or duplicate these freely.",
        year: "2025",
        tags: ["Next.js", "Prisma"],
        liveUrl: "https://example.com",
      },
    ],
  },
  skills: {
    label: "Stack",
    heading: "What I work with",
    intro: "Tools I reach for, grouped by where they live.",
    groups: [
      {
        id: "languages",
        label: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        id: "frontend",
        label: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Motion"],
      },
      {
        id: "backend",
        label: "Backend",
        items: ["Node.js", "PostgreSQL", "REST", "Prisma"],
      },
      {
        id: "tools",
        label: "Tooling",
        items: ["Git", "Docker", "Vite", "Figma"],
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Let us talk",
    intro:
      "The fastest way to reach me is email. I read everything and reply to most of it.",
    emailCta: "Send an email",
    email: "you@example.com",
    socials: [
      { id: "github", label: "GitHub", url: "https://github.com/" },
      { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/" },
      { id: "x", label: "X", url: "https://x.com/" },
    ],
  },
  footer: {
    note: "Built and broken by me.",
    builtWith: "React, Vite and Tailwind",
  },
};

const pt: Dictionary = {
  meta: {
    title: "Seu Nome — Desenvolvedor Full-stack",
    description:
      "Portfólio de Seu Nome, desenvolvedor full-stack que constrói interfaces web rápidas e bem pensadas.",
  },
  nav: {
    about: "Sobre",
    projects: "Projetos",
    skills: "Stack",
    contact: "Contato",
    menu: "Abrir menu",
    close: "Fechar menu",
  },
  ui: {
    toLight: "Mudar para o modo claro",
    toDark: "Mudar para o modo escuro",
    language: "Idioma",
    switchToPortuguese: "Mudar para português",
    switchToEnglish: "Switch to English",
    skipToContent: "Pular para o conteúdo",
    backToTop: "Voltar ao topo",
  },
  hero: {
    eyebrow: "Disponível para trabalhar",
    name: "Seu Nome",
    role: "Desenvolvedor Full-stack",
    tagline:
      "Construo interfaces web rápidas, afiadas e um pouco mais barulhentas do que precisariam ser.",
    primaryCta: "Ver os projetos",
    secondaryCta: "Entrar em contato",
    visualPlaceholder: "Visual do hero",
    visualHint: "Reservado — a cena WebGL entra aqui",
  },
  about: {
    label: "Sobre",
    heading: "Versão curta",
    paragraphs: [
      "Bio de exemplo. Duas ou três frases sobre o que você constrói, com o que se importa e o que está procurando. Seja concreto — quem lê está passando o olho.",
      "O segundo parágrafo é opcional. Use para aquilo que te diferencia, não para o que todo desenvolvedor escreve.",
    ],
    facts: [
      { label: "Onde", value: "Sua Cidade, País" },
      { label: "Foco", value: "Frontend e engenharia de produto" },
      { label: "Agora", value: "Aberto a oportunidades" },
    ],
  },
  projects: {
    label: "Projetos",
    heading: "Projetos selecionados",
    intro: "Algumas coisas que construí. Por enquanto, exemplos.",
    viewCode: "Código",
    viewLive: "Ver online",
    items: [
      {
        id: "project-one",
        title: "Projeto Um",
        summary:
          "Uma ou duas linhas sobre o que o projeto faz e o problema interessante dentro dele. Fale do resultado, não da lista de tarefas.",
        year: "2026",
        tags: ["React", "TypeScript", "Tailwind"],
        repoUrl: "https://github.com/",
        liveUrl: "https://example.com",
      },
      {
        id: "project-two",
        title: "Projeto Dois",
        summary:
          "Outro exemplo. Comece pelo que foi difícil — a restrição, a escala, o prazo — porque é disso que quem lê lembra.",
        year: "2025",
        tags: ["Node", "PostgreSQL", "Docker"],
        repoUrl: "https://github.com/",
      },
      {
        id: "project-three",
        title: "Projeto Três",
        summary:
          "Um terceiro exemplo para a grade ter forma. Apague ou duplique à vontade.",
        year: "2025",
        tags: ["Next.js", "Prisma"],
        liveUrl: "https://example.com",
      },
    ],
  },
  skills: {
    label: "Stack",
    heading: "Com o que eu trabalho",
    intro: "Ferramentas que uso, agrupadas por onde vivem.",
    groups: [
      {
        id: "languages",
        label: "Linguagens",
        items: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        id: "frontend",
        label: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Motion"],
      },
      {
        id: "backend",
        label: "Backend",
        items: ["Node.js", "PostgreSQL", "REST", "Prisma"],
      },
      {
        id: "tools",
        label: "Ferramentas",
        items: ["Git", "Docker", "Vite", "Figma"],
      },
    ],
  },
  contact: {
    label: "Contato",
    heading: "Vamos conversar",
    intro:
      "O jeito mais rápido de me achar é por e-mail. Leio tudo e respondo quase tudo.",
    emailCta: "Mandar um e-mail",
    email: "voce@exemplo.com",
    socials: [
      { id: "github", label: "GitHub", url: "https://github.com/" },
      { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/" },
      { id: "x", label: "X", url: "https://x.com/" },
    ],
  },
  footer: {
    note: "Feito e quebrado por mim.",
    builtWith: "React, Vite e Tailwind",
  },
};

export const content: Record<Locale, Dictionary> = { en, pt };
