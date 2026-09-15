export interface Profile {
  name: string;
  brand: string;
  role: string;
  location: string;
  manifesto: string;
  bio: string;
  philosophy: string;
  metrics: { value: string; label: string; description: string }[];
  socials: { github: string; linkedin: string; email: string; telegram?: string };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  metrics: string;
  tech: string[];
  accent: string;
  github?: string;
}

export interface Deck {
  index: string;
  title: string;
  tone: string;
  items: string[];
  cta?: boolean;
}

export const profile: Profile = {
  name: "Mohamed Nifras S S",
  brand: "NFS Programming",
  role: "AI Engineer ✕ Full-Stack Architect",
  location: "Tamil Nadu, IN — UTC+5:30",
  manifesto:
    "I build intelligent systems the way photographers develop film — with patience, precision and total darkness.",
  bio: "AI Engineer obsessed with designing high-performance intelligent software. My work bridges deep learning, LLM fine-tuning, ISRO Aditya-L1 solar observation forecasting, edge intelligence on mobile, and low-latency full-stack cloud platforms.",
  philosophy:
    "Software shouldn't merely function — it should possess intelligence, razor-sharp speed, and aesthetic precision.",
  metrics: [
    { value: "12+", label: "Production Systems", description: "Deployed across mobile, web & edge" },
    { value: "8+", label: "Model Architectures", description: "Transformers, CNNs, LSTMs, On-Device" },
    { value: "45+", label: "OSS Contributions", description: "Production repositories & tools" },
    { value: "<120ms", label: "Latency Optimized", description: "Edge inference & fast APIs" },
  ],
  socials: {
    github: "https://github.com/nfsprogramming",
    linkedin: "https://linkedin.com/in/nfsprogramming",
    email: "mohamednifras.nfs@gmail.com",
    telegram: "https://t.me/nfsprogramming",
  },
};

export const projects: Project[] = [
  {
    id: "purescan-ai",
    title: "PureScan AI",
    subtitle: "Edge AI document intelligence & privacy-first mobile scanner",
    tag: "Edge AI",
    year: "2026",
    metrics: "Sub-50ms on-device OCR latency",
    tech: ["Flutter", "TFLite", "OpenCV", "FastAPI"],
    accent: "#00f0ff",
    github: "https://github.com/nfsprogramming/PureScan-AI",
  },
  {
    id: "sattam-ai",
    title: "Sattam AI",
    subtitle: "Multilingual legal tech intelligence & case law copilot",
    tag: "Legal Tech",
    year: "2026",
    metrics: "94.8% legal clause semantic accuracy",
    tech: ["Next.js", "LangChain", "Vector RAG", "ChromaDB"],
    accent: "#00e599",
    github: "https://github.com/nfsprogramming/Sattam-AI",
  },
  {
    id: "aditya-l1",
    title: "Aditya-L1 Flare Nowcast",
    subtitle: "Space weather deep learning nowcaster on ISRO satellite data",
    tag: "Space Weather",
    year: "2025—26",
    metrics: "Forecast lead time up to 12 hours",
    tech: ["PyTorch", "LSTM-Transformer", "SciPy", "XSM Data"],
    accent: "#ffb703",
    github:
      "https://github.com/nfsprogramming/Solar-flare-forecasting-nowcasting-using-Aditya-L1-X-ray-data",
  },
  {
    id: "resume-analyzer",
    title: "Smart Resume Analyzer",
    subtitle: "Neural ATS parsing engine & semantic skill matching system",
    tag: "AI Recruitment",
    year: "2026",
    metrics: "3× faster talent screening efficiency",
    tech: ["React", "FastAPI", "SpaCy", "Hugging Face"],
    accent: "#8a2be2",
    github: "https://github.com/nfsprogramming/AI-Smart-Perfomance-Anlayzer",
  },
  {
    id: "dynamic-island",
    title: "Dynamic Island",
    subtitle: "Hardware cutout-anchored notification & media pill for Android",
    tag: "Android",
    year: "2026",
    metrics: "0% idle battery drain architecture",
    tech: ["Kotlin", "Accessibility API", "WindowInsets", "Gradle"],
    accent: "#00f0ff",
    github: "https://github.com/nfsprogramming/Dynamic-Island",
  },
  {
    id: "telegram-drive",
    title: "Telegram Drive",
    subtitle: "Encrypted cloud storage interface built on MTProto API",
    tag: "Cloud Storage",
    year: "2026",
    metrics: "Unlimited chunked encrypted storage",
    tech: ["Node.js", "MTProto", "AES-256", "React"],
    accent: "#00e599",
    github: "https://github.com/nfsprogramming",
  },
];

export const deck: Deck[] = [
  {
    index: "01",
    title: "AI & Neural Systems",
    tone: "#ece4d4",
    items: [
      "PyTorch & Deep Learning",
      "LLM Fine-Tuning",
      "Vector RAG — ChromaDB",
      "Computer Vision — OpenCV",
      "Time-Series — LSTM / Transformer",
    ],
  },
  {
    index: "02",
    title: "Full-Stack Web",
    tone: "#f2ede2",
    items: [
      "React 19 & Next.js",
      "TypeScript",
      "Python — FastAPI",
      "PostgreSQL & Redis",
      "WebSocket Streaming",
    ],
  },
  {
    index: "03",
    title: "Mobile & Systems",
    tone: "#e3d9c6",
    items: [
      "Flutter & Dart",
      "Native Kotlin — Android",
      "On-Device Inference — TFLite",
      "Docker & Microservices",
      "C & Systems Programming",
    ],
  },
  {
    index: "04",
    title: "Creative Tech",
    tone: "#dcd2bd",
    items: [
      "Three.js & WebGL Shaders",
      "GSAP ScrollTrigger",
      "Lenis Smooth Scroll",
      "R3F & Drei",
      "Custom Cursor Systems",
    ],
  },
  {
    index: "05",
    title: "Your Project?",
    tone: "#ff3d2e",
    items: [],
    cta: true,
  },
];

export const marqueeTop = [
  "AI Engineer",
  "Full-Stack Architect",
  "Edge Intelligence",
  "Open Source",
  "Deep Learning",
];
