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
  links: { label: string; href: string }[];
  preview?: { src: string; alt: string };
  note?: string;
};

export const featuredProjects: Project[] = [
  {
    id: "abyss",
    name: "Abyss",
    category: "AI Agent Orchestration · Team project",
    description:
      "Collaborative hackathon platform where AI agents bid on tasks. My work spans backend execution, tool access, and a resilient real-time interface.",
    technologies: [
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "WebSockets",
      "MCP",
    ],
    accomplishments: [
      "Contributed 11 merged PRs covering MCP integrations, per-session tools, templates, and attachments.",
      "Added job queues, cancellation, selective task retries, and daily, weekly, and monthly spending limits.",
      "Improved reconnect event handling, responsive layouts, keyboard access, and result previews.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jtdao24/abyss" },
      {
        label: "My contributions",
        href: "https://github.com/jtdao24/abyss/pulls?q=is%3Apr+author%3Azakiscoding",
      },
    ],
  },
  {
    id: "redis-clone",
    name: "Redis Clone",
    category: "Systems Programming",
    description:
      "A Redis-like in-memory server written in C, with TCP sockets, RESP command parsing, string and list storage, and key expiration.",
    technologies: ["C", "TCP sockets", "RESP", "CMake"],
    accomplishments: [
      "Implemented a select-based loop to accept and handle multiple TCP client connections.",
      "Added RESP command parsing and in-memory string, counter, and list operations.",
      "Implemented EX/PX expiration, TTL/PTTL queries, conditional SET, and key deletion.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/zakiscoding/redis-clone" },
    ],
  },
  {
    id: "homelab",
    name: "Homelab Infrastructure",
    category: "Infrastructure & GPU workloads",
    description:
      "A multi-node platform connecting backend services, a GPU worker, and a Next.js interface for local inference, RAG, and training experiments.",
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
    note: "Source repositories are private; access is required.",
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
    name: "Housing Price MLOps",
    category: "Backend & ML delivery",
    description:
      "An end-to-end housing-price pipeline with feature engineering, model tracking, REST inference, and container delivery to AWS.",
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
    name: "Kash",
    category: "Full-Stack Fintech",
    description:
      "An expense tracker with account dashboards, categorized transactions, receipt scanning, and automated budget emails.",
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
    name: "EMOTION",
    category: "Multimodal AI",
    description:
      "A MELD emotion and sentiment pipeline that combines text, video, and audio features with training, evaluation, and SageMaker deployment code.",
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
    id: "quickbite",
    name: "QuickBite",
    preview: {
      src: "/projects/quickbite.png",
      alt: "QuickBite demo sign-in screen, captured from the deployed application",
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
    id: "mycalibrator",
    name: "MyCalibrator RE",
    category: "Reverse engineering & interoperability",
    description:
      "Analysis of a Delphi desktop tuner companion, with recovered forms, handler mappings, and serial protocol documentation.",
    technologies: ["Python", "Ghidra", "Delphi", "Serial protocols"],
    accomplishments: [
      "Mapped event handlers and reconstructed form layouts from the executable.",
      "Documented serial read commands against captured traffic; reconstruction remains in progress.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/zakiscoding/mycalibrator-re",
      },
    ],
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime CI/CD",
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
  {
    id: "repo-intel",
    name: "Repo Intel",
    category: "Open-source contributions",
    description:
      "Proposed extensions to a GitHub Action that analyzes repository activity and generates reports.",
    technologies: ["TypeScript", "GitHub Actions", "GitHub API"],
    accomplishments: [
      "PR #5 adds requirements.txt and pyproject.toml dependency parsing and snapshot differences.",
      "PR #6 adds Slack Block Kit digest output with non-fatal delivery errors.",
    ],
    note: "Fork of oxnr/repo-intel. Both contributions are open PRs, not merged features.",
    links: [
      {
        label: "GitHub fork",
        href: "https://github.com/zakiscoding/repo-intel",
      },
      {
        label: "Dependency PR",
        href: "https://github.com/oxnr/repo-intel/pull/5",
      },
      { label: "Slack PR", href: "https://github.com/oxnr/repo-intel/pull/6" },
    ],
  },
];

export const contributions = [
  {
    repository: "jtdao24/abyss",
    number: 1,
    summary:
      "File attachments, session templates, vendor history, and a hard budget cap",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 3,
    summary: "MCP tool catalog, configurable session tools, and activity feed",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 4,
    summary: "Daily, weekly, and monthly spending limits",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 5,
    summary: "Job cancellation, queueing, reruns, and CI",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 6,
    summary: "Synthesized sound effects and persistent audio controls",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 7,
    summary: "Responsive header and layout improvements",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 8,
    summary: "Accurate stopped-job states and a finished-file view",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 9,
    summary: "Selective retries that retain completed task output",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 10,
    summary:
      "WebSocket event deduplication, reconnect reliability, and keyboard access",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 11,
    summary: "Fixed shared texture teardown during development remounts",
    status: "Merged",
  },
  {
    repository: "jtdao24/abyss",
    number: 12,
    summary: "Clock-based day/night scenes with reduced-motion support",
    status: "Merged",
  },
  {
    repository: "oxnr/repo-intel",
    number: 5,
    summary:
      "Python dependency tracking for requirements.txt and pyproject.toml",
    status: "Open",
  },
  {
    repository: "oxnr/repo-intel",
    number: 6,
    summary: "Slack webhook output with Block Kit formatting",
    status: "Open",
  },
] as const;
