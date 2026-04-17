export type CloneStep = {
  step: string;
  command: string;
};

export type ProjectDetails = {
  introduction: string;
  features: string[];
  techStackDetailed: string[];
  requirements: string[];
  achievements?: string[]; // For SDE
  results?: string[]; // For ML
  cloneGuide: CloneStep[];
  liveDemoLink?: string;
  githubLink?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "sde" | "ml" | "media" | "cert";
  details?: ProjectDetails;
};

export const PROJECTS: Project[] = [
  {
    id: "caresync",
    title: "CareSync",
    description: "High-fidelity, production-ready Hospital Management System prioritizing patient autonomy and enterprise-grade security.",
    tech: ["React", "Node.js", "Redis", "MongoDB", "Stripe", "Flask"],
    category: "sde",
    details: {
      introduction: "CareSync is a state-of-the-art Hospital Management System built on a microservices-aligned architecture, bridging patient health ownership with professional medical management.",
      features: [
        "CareNexus AI Assistant: Health insights powered by Grok AI",
        "Clinical Privacy Shield: Explicit patient-controlled access protocol",
        "4-Persona Ecosystem: Dashboards for Patients, Physicians, Staff, and Admins",
        "Enterprise-Grade Security: JWT HttpOnly cookies & rate limiting"
      ],
      techStackDetailed: ["Node.js/Express", "React", "Redis (OTP & Caching)", "Flask (ML/Analytics)", "MongoDB", "Stripe (Payments)", "Docker"],
      requirements: ["Docker Desktop", "Node.js >= 18", "Python 3.10+", "Stripe API Keys"],
      achievements: [
        "Engineered a proprietary 'Privacy Shield' protocol for clinical data access",
        "Achieved high-concurrency appointment handling using Redis caching",
        "Integrated seamless Stripe PCI-compliant billing for triaged care"
      ],
      cloneGuide: [
        { step: "Clone Ecosystem", command: "git clone https://github.com/shashwatgohel/caresync.git" },
        { step: "Rapid Orchestration", command: "docker-compose up --build" },
        { step: "Backend Setup", command: "cd backend && npm install" },
        { step: "Frontend Launch", command: "cd frontend && npm run dev" },
        { step: "Start ML Service", command: "cd ml-service && python app.py" }
      ],
      githubLink: "https://github.com/shashwatgohel/caresync"
    }
  },
  {
    id: "kyc-chain",
    title: "Decentralized KYC",
    description: "Hash-based document verification system using ZK-Proofs.",
    tech: ["Solidity", "Hardhat", "Ether.js", "Zk-SNARKs"],
    category: "sde",
    details: {
      introduction: "A privacy-preserving KYC solution enabling users to prove their identity without revealing sensitive underlying data using Zero-Knowledge Proofs.",
      features: [
        "On-chain ZK-SNARK verification",
        "Decentralized storage via IPFS/Pinata",
        "Soulbound Token (SBT) identity minting",
        "Multi-signature admin governance"
      ],
      techStackDetailed: ["Solidity", "Hardhat", "Circom 2.0", "SnarkJS", "React", "Ethers.js"],
      requirements: ["Node.js >= 16", "Metamask Wallet", "Alchemy/Infura API Key"],
      achievements: [
        "Gas-optimized circuits reducing verification cost by 30%",
        "Successfully verified 500+ identities on Sepolia Testnet",
        "Winner of Regional Blockchain Hackathon 2024"
      ],
      cloneGuide: [
        { step: "Clone Repo", command: "git clone https://github.com/shashwatgohel/kyc-chain.git" },
        { step: "Install Dependencies", command: "npm install" },
        { step: "Compile Circuits (Circom)", command: "sh scripts/compile-circuits.sh" },
        { step: "Deploy Smart Contracts", command: "npx hardhat run scripts/deploy.js --network sepolia" },
        { step: "Start DApp", command: "npm run dev" }
      ],
      liveDemoLink: "https://kyc-chain.vercel.app",
      githubLink: "https://github.com/shashwatgohel/kyc-chain"
    }
  },
  {
    id: "medistock",
    title: "MediStock",
    description: "Full-stack Medical Inventory & Order Management System connecting local pharmacies with customers.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Socket.io"],
    category: "sde",
    details: {
      introduction: "MediStock is a comprehensive medical management platform designed to bridge the gap between local pharmacies and customers through real-time inventory and order tracking.",
      features: [
        "Interactive Store Locator with Leaflet Maps",
        "Dynamic Cart System & Prescription Upload",
        "Pharmacist Dashboard with Real-time Order Processing",
        "Automated PDF Bill Generation & Sales Analytics"
      ],
      techStackDetailed: ["React.js (Vite)", "Tailwind CSS", "Node.js", "Express.js", "MongoDB (Mongoose)", "Socket.io", "React Leaflet", "React Hot Toast", "jsPDF"],
      requirements: ["Node.js >= 16.0", "MongoDB (Local or Atlas)"],
      achievements: [
        "Engineered real-time order status updates using Socket.io",
        "Implemented bulk inventory management via Excel (XLSX) processing",
        "Developed a custom POS-style digital billing system for walk-in customers"
      ],
      cloneGuide: [
        { step: "Clone Repository", command: "git clone https://github.com/ShashwatGohel/MediStock.git" },
        { step: "Install Backend Deps", command: "cd backend && npm install" },
        { step: "Install Frontend Deps", command: "cd frontend && npm install" },
        { step: "Setup Environment", command: "touch backend/.env" },
        { step: "Start Dev Servers", command: "npm run dev (in both root folders)" }
      ],
      liveDemoLink: "https://medi-stock-theta.vercel.app/",
      githubLink: "https://github.com/ShashwatGohel/MediStock"
    }
  },
  {
    id: "kyc-radix",
    title: "ZK-KYC SSI (Radix)",
    description: "Production-grade SSI platform on Radix Network with selective disclosure via ZK-Proofs.",
    tech: ["Scrypto", "Rust", "ZK-Proofs", "Circom", "SSI"],
    category: "sde",
    details: {
      introduction: "A privacy-preserving Identity System built on Radix Network (Scrypto) utilizing Zero-Knowledge Proofs for selective disclosure. It allows users to prove credentials (age, income) without revealing private PII.",
      features: [
        "Selective Disclosure for Age, Income, and Credit Tiers",
        "M-of-N Multi-Sig Admin Governance for Credential Issuers",
        "On-chain Identity Registry with real-time Revocation",
        "Automated CI/CD for contract auditing and circuit compilation"
      ],
      techStackDetailed: ["Scrypto (Radix Engine)", "Rust", "Circom 2.1", "SnarkJS", "Node.js 20", "GitHub Actions"],
      requirements: ["Rust 1.70+", "Scrypto CLI 1.2.x", "Node.js 20+", "Circom 2.1.6+"],
      achievements: [
        "Architected a scalable SSI framework where no raw PII touches the ledger",
        "Developed custom ZK circuits for credit score bracket verification",
        "Implemented secure on-chain consent management for institution access"
      ],
      cloneGuide: [
        { step: "Install Toolchain", command: "rustup target add wasm32-unknown-unknown && cargo install radix-clis" },
        { step: "Build Contracts", command: "cd kyc_identity && cargo build" },
        { step: "Compile ZK Circuits", command: "cd zk_proofs && bash scripts/compile-circuits.sh" },
        { step: "Verify Proofs", command: "node scripts/verify_proof.js age_verify" },
        { step: "Stokenet Deploy", command: "resim publish ." }
      ],
      githubLink: "https://github.com/ShashwatGohel/dec-kyc-radix"
    }
  },
  {
    id: "zeta-layers",
    title: "Zeta Layers",
    description: "High-performance Next.js infrastructure optimized for scalability and automated asset deliverability.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "sde",
    details: {
      introduction: "Zeta Layers is a high-performance freelance web infrastructure framework designed for enhanced asset delivery and streamlined developer workflows through the zetalayers.com portal.",
      features: [
        "Next.js 15 App Router & Server Components Architecture",
        "Automated Geist Font Optimization & Asset Delivery",
        "Production-ready CI/CD Pipeline for Vercel Deployment",
        "Developer-first Project Bootstrapping CLI"
      ],
      techStackDetailed: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel Platform", "Geist Sans/Mono"],
      requirements: ["Node.js >= 18.17.0", "npm / yarn / pnpm / bun"],
      achievements: [
        "Reduced Largest Contentful Paint (LCP) by 20% using automated font loading",
        "Successfully deployed the zetalayers.com production infrastructure",
        "Engineered zero-config asset delivery logic for modern web apps"
      ],
      cloneGuide: [
        { step: "Clone Repository", command: "git clone https://github.com/shashwatgohel/zeta-layers.git" },
        { step: "Initialize Environment", command: "npm install" },
        { step: "Launch Development", command: "npm run dev" },
        { step: "Deploy Snapshot", command: "npm run build" }
      ],
      liveDemoLink: "https://zetalayers.com",
      githubLink: "https://github.com/shashwatgohel/zeta-layers"
    }
  },
  {
    id: "brain-tumor-ai",
    title: "Brain Tumor Classification",
    description: "Deep learning model for MRI scan analysis and classification.",
    tech: ["CNN", "PyTorch", "OpenCV", "Python"],
    category: "ml",
    details: {
      introduction: "A computer vision model designed to detect and classify brain tumors from MRI scans into four categories: Glioma, Meningioma, No Tumor, and Pituitary.",
      features: [
        "Advanced MobileNetV2 architecture fine-tuning",
        "Custom image preprocessing and augmentation",
        "Real-time inference API using Flask",
        "Explaining predictions with Grad-CAM"
      ],
      techStackDetailed: ["Python 3.9", "PyTorch", "Torchvision", "OpenCV", "Matplotlib", "Flask"],
      requirements: ["Python >= 3.9", "CUDA-enabled GPU (Optional)", "4GB+ System RAM"],
      results: [
        "98.4% Training Accuracy",
        "97.2% Validation Accuracy on Brain MRI Dataset",
        "F1-Score: 0.96 across all tumor categories",
        "Average Inference Time: 120ms per image"
      ],
      cloneGuide: [
        { step: "Clone Repo", command: "git clone https://github.com/shashwatgohel/brain-tumor-ai.git" },
        { step: "Create Virtual Env", command: "python -m venv venv && source venv/bin/activate" },
        { step: "Install ML Packs", command: "pip install -r requirements.txt" },
        { step: "Run Inference Script", command: "python predict.py --image test.jpg" },
        { step: "Start Dashboard", command: "python app.py" }
      ],
      liveDemoLink: "https://brain-tumor-ai.streamlit.app",
      githubLink: "https://github.com/shashwatgohel/brain-tumor-ai"
    }
  },
  {
    id: "rover-astar",
    title: "Rover A* Simulator",
    description: "Battery-aware rover pathfinding simulator with dynamic environment adaptation and heuristic analysis.",
    tech: ["Python", "A* Algorithm", "Heuristics", "Pathfinding"],
    category: "ml",
    details: {
      introduction: "A research-oriented simulator built to evaluate the performance of different A* heuristics for rovers operating in energy-constrained, dynamic environments like Mars or Lunar surfaces.",
      features: [
        "Battery-Aware Navigation with auto-routing to recharge points",
        "Dynamic Terrain Adaptation: replanning in real-time when hazards appear",
        "Comparison of 4 Heuristics: Manhattan, Euclidean, Terrain Penalized, and Least Regret",
        "Interactive Grid GUI with Radar view and .json Export/Import"
      ],
      techStackDetailed: ["Python 3.8+", "Standard Library (Tkinter/Logic)", "A* Search Algorithm", "Dynamic Replanning Logic"],
      requirements: ["Python >= 3.8"],
      results: [
        "Analyzed path efficiency across Green, Sandy, and Hazardous terrains",
        "Achieved seamless real-time emergency rerouting during terrain shifts",
        "Demonstrated energy-optimized pathing with built-in recharge station logic"
      ],
      cloneGuide: [
        { step: "Clone Repository", command: "git clone https://github.com/ShashwatGohel/Rover-Simulator.git" },
        { step: "Locate Simulator", command: "cd Rover-Simulator" },
        { step: "Run Algorithm", command: "python Rover_Sim_2.py" }
      ],
      githubLink: "https://github.com/ShashwatGohel/Rover-Simulator"
    }
  },
  {
    id: "accident-risk-spark",
    title: "Accident Risk GBT",
    description: "Distributed machine learning pipeline using Apache Spark MLlib to predict road accident risk with 86% accuracy.",
    tech: ["Apache Spark", "MLlib", "PySpark", "GBT Regressor", "Big Data"],
    category: "ml",
    details: {
      introduction: "An end-to-end distributed ML pipeline built on Apache Spark to predict continuous accident risk scores for road segments based on curvature and environmental factors.",
      features: [
        "Distributed GBT Regressor training: 150-tree model in ~2.5 minutes",
        "Feature Importance Discovery: Curvature identified as #1 factor (23.8%)",
        "Automated Spark ML Transformation Pipeline",
        "Comprehensive Correlation & Variance Analysis"
      ],
      techStackDetailed: ["Apache Spark 3.x", "MLlib", "PySpark", "Pandas", "Matplotlib", "Seaborn"],
      requirements: ["Python >= 3.8", "Java 8/11", "Apache Spark"],
      results: [
        "R²: 0.8614 (Explains 86% of variance)",
        "RMSE: 0.0619 (74.2% improvement over baseline)",
        "Discovered non-linear relationship between road curvature and risk"
      ],
      cloneGuide: [
        { step: "Clone Core", command: "git clone https://github.com/ShashwatGohel/Accident-Risk-Spark-GBT.git" },
        { step: "Environment Sync", command: "pip install -r requirements.txt" },
        { step: "Launch Notebook", command: "jupyter notebook" }
      ],
      githubLink: "https://github.com/shashwatgohel/Accident-Risk-Spark-GBT"
    }
  },
  {
    id: "aws-cert",
    title: "AWS Cloud Practitioner",
    description: "Official certification for cloud architecture and infrastructure management.",
    tech: ["Cloud", "AWS"],
    category: "cert",
    details: {
      introduction: "AWS Certified Cloud Practitioner validation for conceptual understanding of AWS cloud platform.",
      features: [
        "Understanding of core AWS services (EC2, S3, RDS)",
        "Security and compliance practices",
        "Billing and pricing structures"
      ],
      techStackDetailed: ["AWS Console", "CloudFormation", "IAM", "S3", "EC2"],
      requirements: ["AWS Free Tier Account"],
      cloneGuide: [
        { step: "View Locally", command: "open /assets/certifications/aws_certified.pdf" },
        { step: "Verify Online", command: "open https://aws.amazon.com/verification" }
      ],
      liveDemoLink: "/assets/certifications/aws_certified.pdf"
    }
  },
  {
    id: "google-cloud-cert",
    title: "GCP Digital Leader",
    description: "Cloud fluency and business transformation certification from Google Cloud.",
    tech: ["Cloud", "GCP"],
    category: "cert",
    details: {
      introduction: "A fundamental certification proving knowledge of Google Cloud services and their business impact.",
      features: [
        "Cloud identity and security",
        "Data management and analytics",
        "GCP cost management"
      ],
      techStackDetailed: ["Google Cloud Console", "BigQuery", "Compute Engine", "IAM"],
      requirements: ["GCP Free Tier"],
      cloneGuide: [
        { step: "Upload Certificate", command: "Add google_cloud.pdf to public/assets/certifications/" },
        { step: "View Document", command: "open /assets/certifications/google_cloud.pdf" }
      ],
      liveDemoLink: "/assets/certifications/google_cloud.pdf"
    }
  }
];
