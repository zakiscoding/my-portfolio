// Reviewed editorial content. Evidence and update policy: docs/project-evidence.md.
export const branding = {
  headline: "Backend & Infrastructure Software Engineer",
  introduction:
    "I'm a computer science student and software engineer focused on building reliable backend systems, cloud infrastructure, and AI-powered applications. I've worked across site reliability, systems engineering, software development, and AI engineering.",
};

export const experiences = [
  {
    company: "InComm Payments",
    position: "Systems Engineer Intern",
    dates: "September 2026 – Present",
    points: [
      "Support client migration to an SFTP batch-processing platform, documenting file flows, dependencies, and operational handoffs.",
      "Build, test, and maintain monitoring alerts for client file workflows and incident detection.",
    ],
    technologies: ["SFTP", "Monitoring", "Batch processing"],
  },
  {
    company: "IBM",
    position: "Site Reliability Engineer Intern",
    dates: "May – August 2026",
    points: [
      "Built Sentinel, a React, Django, and PostgreSQL operations platform for application health, incidents, logs, and on-call workflows.",
      "Added correlation-ID tracing across two ELK clusters, Jira and Gemini incident automation, and an MCP knowledge layer.",
      "Developed Terragrunt/Terraform templates and Python automation; evaluated the OpenShift Kube Descheduler Operator in a proof of concept.",
    ],
    technologies: ["Django", "PostgreSQL", "ELK", "Terraform", "OpenShift"],
  },
  {
    company: "Cornell Tech",
    position: "AI Engineer Fellow",
    dates: "April 2026 – Present",
    points: [
      "Built and evaluated neural-network, RAG, and multimodal LLM applications with TensorFlow and Keras.",
      "Worked with company partners to translate product requirements into AI features and MCP workflows.",
    ],
    technologies: ["TensorFlow", "Keras", "RAG", "MCP"],
  },
  {
    company: "Signify",
    position: "Software Engineer Intern",
    dates: "January – May 2026",
    points: [
      "Automated build, test, artifact publishing, and deployment with Python, Bash, Bamboo CI, Docker, and Artifactory.",
      "Migrated workloads to AWS and Azure and programmed C/C++ BLE Mesh software for real-time device control and state synchronization.",
    ],
    technologies: ["Python", "C++", "Docker", "AWS", "Azure", "Bamboo CI"],
  },
  {
    company: "Crescent Technology",
    position: "AI Engineer Intern",
    dates: "July – December 2025",
    points: [
      "Built a production RAG pipeline and optimized retrieval and response latency.",
      "Implemented expiring conversational memory and MCP workflows for lead capture, intent routing, and escalation.",
      "Deployed containerized AI microservices on AWS with Docker and REST APIs.",
    ],
    technologies: ["Python", "RAG", "MCP", "AWS", "Docker", "REST APIs"],
  },
];

export const education = [
  {
    institution: "Georgia State University",
    degree: "B.S. Computer Science",
    status: "Expected May 2027",
    detail:
      "Major GPA: 3.8. Coursework includes algorithms, operating systems, systems-level programming, and machine learning.",
  },
  {
    institution: "Georgia Institute of Technology",
    degree: "M.S. Computer Science",
    status: "Admitted",
    detail:
      "Expected enrollment after graduating from Georgia State in May 2027.",
  },
];

export const skillGroups = [
  {
    name: "Languages",
    skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  { name: "Backend", skills: ["FastAPI", "Django", "REST APIs", "WebSockets"] },
  {
    name: "Cloud & Infrastructure",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  { name: "AI/ML", skills: ["PyTorch", "TensorFlow", "RAG", "LLMs", "MCP"] },
  {
    name: "Databases & Observability",
    skills: [
      "PostgreSQL",
      "Redis",
      "Prometheus",
      "Grafana",
      "ELK",
      "CloudWatch",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  accomplishments: string[];
  highlights?: string[];
  outcome?: string;
  diagram?: { steps: string[]; caption: string };
  links: { label: string; href: string }[];
  preview?: { src: string; alt: string; caption: string };
  note?: string;
};

const abyssProject: Project = {
  id: "abyss",
  outcome:
    "Selective retries retain completed task output; configurable spending limits put bounds on agent jobs.",
  name: "Abyss",
  category: "AI Agent Orchestration · Team project",
  description:
    "A collaborative AI agent marketplace with queued execution, MCP tools, and spending controls.",
  preview: {
    src: "/projects/abyss-replay.jpg",
    alt: "Abyss running locally in its built-in fixture replay mode",
    caption: "Local interface / fixture replay",
  },
  highlights: [
    "Job queues, cancellation, and selective retries.",
    "Configurable tools and per-session spending limits.",
  ],
  technologies: [
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "WebSockets",
    "MCP",
  ],
  accomplishments: [
    "Contributed MCP integrations, per-session tools, session templates, and file attachments.",
    "Added job queues, cancellation, selective task retries, and daily, weekly, and monthly spending limits.",
    "Improved reconnect event handling, responsive layouts, keyboard access, and result previews.",
  ],
  note: "Team project / fork of jtdao24/abyss.",
  links: [{ label: "GitHub", href: "https://github.com/zakiscoding/abysss" }],
};

const redisProject: Project = {
  id: "redis-clone",
  outcome:
    "TCP clients can execute string, counter, and list commands with conditional writes and expiring keys.",
  name: "Redis Clone",
  category: "Systems Programming",
  description:
    "A Redis-like TCP server in C with RESP parsing, string/list operations, and key expiration.",
  highlights: [
    "Multiplexed TCP connections with select().",
    "String/list commands and millisecond key expiration.",
  ],
  diagram: {
    steps: ["TCP clients", "RESP parser", "In-memory store"],
    caption: "Source-based flow / strings, lists, TTL",
  },
  technologies: ["C", "TCP sockets", "RESP", "CMake"],
  accomplishments: [
    "Implemented a select-based loop to accept and handle multiple TCP client connections.",
    "Added RESP command parsing and in-memory string, counter, and list operations.",
    "Implemented EX/PX expiration, TTL/PTTL queries, conditional SET, and key deletion.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/zakiscoding/redis-clone" },
  ],
};

export const featuredProjects: Project[] = [
  abyssProject,
  redisProject,
  {
    id: "homelab",
    outcome:
      "One job control plane connects queued backend work, document retrieval, local inference, and GPU training.",
    name: "Homelab Infrastructure",
    category: "Infrastructure & GPU workloads",
    description:
      "A multi-node platform for backend services, local inference, RAG, and GPU training.",
    highlights: [
      "Worker leases, retries, and Redis wakeups.",
      "Cross-node monitoring and GPU-backed workflows.",
    ],
    diagram: {
      steps: ["Next.js", "FastAPI", "Data + GPU workers"],
      caption: "Source-based architecture / multi-node platform",
    },
    technologies: [
      "FastAPI",
      "Docker Compose",
      "PostgreSQL",
      "Redis",
      "Qdrant",
      "PyTorch",
      "MLflow",
    ],
    accomplishments: [
      "Built a PostgreSQL job control plane with worker leases, retries, and Redis wake notifications.",
      "Configured Caddy, Tailscale networking, and Prometheus/Grafana monitoring across services and GPU workloads.",
      "Connected Ollama inference, document ingestion and retrieval, and LoRA training through backend APIs.",
    ],
    note: "Private source / access required.",
    links: [
      { label: "Architecture", href: "https://github.com/zakiscoding/homelab" },
      {
        label: "Services",
        href: "https://github.com/zakiscoding/homelab-services",
      },
      {
        label: "GPU worker",
        href: "https://github.com/zakiscoding/homelab-gpu",
      },
      {
        label: "Web interface",
        href: "https://github.com/zakiscoding/homelab-web",
      },
    ],
  },
  {
    id: "housing-mlops",
    outcome:
      "Tracked training artifacts feed a FastAPI prediction service with a configured ECR/ECS delivery pipeline.",
    name: "Housing Price MLOps",
    category: "Backend & ML delivery",
    description:
      "A housing-price pipeline from feature engineering to tracked models and REST inference on AWS.",
    highlights: [
      "Optuna tuning with MLflow experiment tracking.",
      "Container delivery through GitHub Actions to ECS.",
    ],
    diagram: {
      steps: ["Features", "XGBoost", "FastAPI / ECS"],
      caption: "Source-based pipeline / training to inference",
    },
    technologies: [
      "Python",
      "FastAPI",
      "XGBoost",
      "Optuna",
      "MLflow",
      "Docker",
      "AWS ECS",
    ],
    accomplishments: [
      "Built preprocessing, feature engineering, training, and evaluation pipelines with tracked model artifacts.",
      "Added Optuna tuning and MLflow experiment logging for XGBoost models.",
      "Served predictions through FastAPI and configured GitHub Actions delivery to ECR and ECS.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zakiscoding/Housing-Regression-Model",
      },
    ],
  },
  {
    id: "kash",
    outcome:
      "Receipt extraction, recurring entries, and scheduled budget checks support an end-to-end expense workflow.",
    name: "Kash",
    category: "Full-Stack Fintech",
    description:
      "An expense tracker with AI receipt entry, recurring transactions, and budget alerts.",
    highlights: [
      "Authenticated accounts and transaction workflows.",
      "Gemini receipt extraction and scheduled budget checks.",
    ],
    diagram: {
      steps: ["Next.js", "Prisma", "PostgreSQL"],
      caption: "Source-based architecture / persistent finance data",
    },
    technologies: [
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Gemini",
      "Inngest",
    ],
    accomplishments: [
      "Implemented authenticated transaction and account workflows backed by Prisma and PostgreSQL.",
      "Integrated Gemini receipt extraction and recurring-transaction processing.",
      "Added spending analytics and scheduled budget checks with email notifications.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/zakiscoding/Kash" }],
  },
  {
    id: "emotion",
    outcome:
      "A single fused model produces seven emotion classes and three sentiment classes, with held-out evaluation code.",
    name: "EMOTION",
    category: "Multimodal AI",
    description:
      "A multimodal emotion and sentiment pipeline combining text, video, and audio on MELD.",
    highlights: [
      "BERT, R3D-18, and audio CNN feature fusion.",
      "Held-out evaluation and SageMaker deployment code.",
    ],
    diagram: {
      steps: ["BERT / R3D / CNN", "Feature fusion", "Emotion + sentiment"],
      caption: "Source-based model / text, video, audio",
    },
    technologies: [
      "Python",
      "PyTorch",
      "BERT",
      "OpenCV",
      "SageMaker",
      "TensorBoard",
    ],
    accomplishments: [
      "Combined BERT text embeddings, an R3D-18 video encoder, and a 1D audio CNN through feature fusion.",
      "Implemented separate seven-class emotion and three-class sentiment heads.",
      "Evaluated train/dev/test splits with accuracy and weighted precision, with TensorBoard and CloudWatch logging.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zakiscoding/EMOTION-Multimodal-AI-Model",
      },
    ],
  },
];

export const secondaryProjects: Project[] = [
  {
    id: "audio-cnn",
    name: "Audio CNN Visualizer",
    category: "Audio ML & model visualization",
    description:
      "An environmental-sound classifier with an interactive interface for inspecting predictions, audio waveforms, spectrograms, and CNN feature maps.",
    technologies: ["Python", "PyTorch", "Torchaudio", "Modal", "Next.js"],
    highlights: [
      "Residual CNN trained on the 50-class ESC-50 dataset.",
      "Top-three predictions with per-layer feature visualizations.",
    ],
    diagram: {
      steps: ["WAV audio", "Mel / CNN", "Predictions + maps"],
      caption: "Source-based flow / audio to model insights",
    },
    accomplishments: [
      "Implemented a residual convolutional model with optional intermediate feature-map outputs.",
      "Built a Modal inference endpoint that resamples audio, computes mel-spectrograms, and returns top-three class probabilities, waveforms, and layer visualizations.",
      "Added a Next.js upload interface; training code includes MixUp, TensorBoard logging, and saved model checkpoints.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/zakiscoding/Audio_CNN" },
      { label: "Live demo", href: "https://audio-cnn-saas.vercel.app" },
    ],
  },
  {
    id: "quickbite",
    name: "QuickBite",
    preview: {
      src: "/projects/quickbite.png",
      alt: "QuickBite demo sign-in screen, captured from the deployed application",
      caption: "Deployed interface / sign-in screen",
    },
    category: "Collaborative full-stack project",
    description:
      "Customer and driver workflows with chat-based ordering, location-aware restaurant discovery, and real-time order messaging.",
    technologies: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    accomplishments: [
      "Structured AI actions connect conversations to cart and order workflows.",
      "Driver tools include delivery updates and an AI message copilot.",
    ],
    note: "Collaborative project; repository forked from bobbleteeb/Team-Sleep.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zakiscoding/AI-FoodDelivery-App",
      },
      {
        label: "Live demo (sign-in)",
        href: "https://team-sleep-liart.vercel.app",
      },
    ],
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime CI/CD",
    preview: {
      src: "/projects/amazon-prime-pipeline.png",
      alt: "Pipeline overview image from the Amazon Prime CI/CD repository",
      caption: "Repository diagram / delivery pipeline",
    },
    category: "Cloud delivery",
    description:
      "Delivery configuration for a React streaming-interface clone, with Jenkins pipelines, container packaging, and Kubernetes deployment files.",
    technologies: [
      "Jenkins",
      "Docker",
      "Terraform",
      "AWS ECR/EKS",
      "SonarQube",
      "Trivy",
    ],
    accomplishments: [
      "Configured quality analysis, filesystem scanning, Docker builds, and ECR publishing stages.",
      "Added Terraform infrastructure and Kubernetes deployment configurations.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/zakiscoding/amazon-prime" },
    ],
  },
];

export const contributions = [
  {
    title: "MCP tools & session workflows",
    summary:
      "Integrated an MCP tool catalog with configurable per-session tool access, reusable templates, and file attachments.",
  },
  {
    title: "Backend job execution",
    summary:
      "Added job queues, cancellation, reruns, and selective retries that retain completed task output.",
  },
  {
    title: "AI spending controls",
    summary:
      "Implemented per-job budgets and daily, weekly, and monthly spending limits.",
  },
  {
    title: "Real-time reliability",
    summary:
      "Improved WebSocket reconnect handling, event deduplication, stopped-job states, and result previews.",
  },
  {
    title: "Responsive & accessible interfaces",
    summary:
      "Refined responsive layouts, keyboard access, scene lifecycle handling, and reduced-motion support.",
  },
];

export const supplementalCertifications = [
  {
    name: "Machine Learning Foundations",
    issuer: "eCornell, Cornell University",
    credentialUrl:
      "https://mycredentials.ecornell.cornell.edu/credential/OEbTFqATTf",
    credentialId: null,
    issueDate: null,
    logo: null,
  },
];
