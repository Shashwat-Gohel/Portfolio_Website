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
    id: "medicare",
    title: "MediCare",
    description: "High-fidelity, production-ready Hospital Management System prioritizing patient autonomy and enterprise-grade security.",
    tech: ["React", "Node.js", "Redis", "MongoDB", "Stripe", "Flask"],
    category: "sde",
    details: {
      introduction: "MediCare (formerly CareSync) is a state-of-the-art Hospital Management System built on a microservices-aligned architecture, bridging patient health ownership with professional medical management.",
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
        { step: "Clone Ecosystem", command: "git clone https://github.com/ShashwatGohel/MediCare-Software_Engineering_Project.git" },
        { step: "Rapid Orchestration", command: "docker-compose up --build" },
        { step: "Backend Setup", command: "cd backend && npm install" },
        { step: "Frontend Launch", command: "cd frontend && npm run dev" },
        { step: "Start ML Service", command: "cd ml-service && python app.py" }
      ],
      githubLink: "https://github.com/ShashwatGohel/MediCare-Software_Engineering_Project"
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
      ],
      cloneGuide: [
        { step: "Clone Repo", command: "git clone https://github.com/ShashwatGohel/Decentralized_KYC_Blockchain.git" },
        { step: "Install Dependencies", command: "npm install" },
        { step: "Compile Circuits (Circom)", command: "sh scripts/compile-circuits.sh" },
        { step: "Deploy Smart Contracts", command: "npx hardhat run scripts/deploy.js --network sepolia" },
        { step: "Start DApp", command: "npm run dev" }
      ],
      githubLink: "https://github.com/ShashwatGohel/Decentralized_KYC_Blockchain"
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
    id: "zeta-layers",
    title: "Zeta Layers Website",
    description: "High-performance Next.js infrastructure optimized for scalability and automated asset deliverability.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "sde",
    details: {
      introduction: "Zeta Layers Website is a high-performance freelance web infrastructure framework designed for enhanced asset delivery and streamlined developer workflows.",
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
        { step: "Clone Repository", command: "git clone https://github.com/ShashwatGohel/Zeta_Layers_Website.git" },
        { step: "Initialize Environment", command: "npm install" },
        { step: "Launch Development", command: "npm run dev" },
        { step: "Deploy Snapshot", command: "npm run build" }
      ],
      liveDemoLink: "https://zetalayers.com",
      githubLink: "https://github.com/ShashwatGohel/Zeta_Layers_Website"
    }
  },
  {
    id: "ml-data-dominators",
    title: "Brain Tumor Detection",
    description: "Advanced deep learning project focusing on Brain Tumor Segmentation and Contours using MRI scan analysis.",
    tech: ["Python", "Classical ML", "Segmentation", "XGBoost"],
    category: "ml",
    details: {
      introduction: "A specialized computer vision project for precise brain tumor segmentation and contour detection from MRI scans, enabling detailed clinical analysis.",
      features: [
        "Advanced segmentation architecture fine-tuning",
        "Custom image preprocessing for contour enhancement",
        "Real-time analysis pipeline",
        "Automated report generation with visualization"
      ],
      techStackDetailed: ["Python 3.9", "PyTorch", "OpenCV", "Matplotlib", "NumPy", "Flask"],
      requirements: ["Python >= 3.9", "CUDA-enabled GPU (Optional)", "4GB+ System RAM"],
      results: [
        "High-precision segmentation accuracy",
        "Reliable contour detection across diverse MRI datasets",
        "Optimized inference for rapid clinical review"
      ],
      cloneGuide: [
        { step: "Clone Repo", command: "git clone https://github.com/ShashwatGohel/ML_2026_4_Data_Dominators.git" },
        { step: "Create Virtual Env", command: "python -m venv venv && source venv/bin/activate" },
        { step: "Install ML Packs", command: "pip install -r requirements.txt" },
        { step: "Run Analysis", command: "python predict.py --image test.jpg" }
      ],
      githubLink: "https://github.com/ShashwatGohel/ML_2026_4_Data_Dominators"
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
        { step: "Clone Repository", command: "git clone https://github.com/ShashwatGohel/AStar-Heuristics-Battery-Constrained-Rover.git" },
        { step: "Locate Simulator", command: "cd AStar-Heuristics-Battery-Constrained-Rover" },
        { step: "Run Algorithm", command: "python Rover_Sim_2.py" }
      ],
      githubLink: "https://github.com/ShashwatGohel/AStar-Heuristics-Battery-Constrained-Rover"
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
        { step: "Clone Core", command: "git clone https://github.com/ShashwatGohel/Road_Accident_Risk_Spark_GBT.git" },
        { step: "Environment Sync", command: "pip install -r requirements.txt" },
        { step: "Launch Notebook", command: "jupyter notebook" }
      ],
      githubLink: "https://github.com/ShashwatGohel/Road_Accident_Risk_Spark_GBT"
    }
  },
  {
    id: "cert-ai",
    title: "Artificial Intelligence",
    description: "Certification for core principles and applications of Artificial Intelligence.",
    tech: ["AI", "Machine Learning"],
    category: "cert",
    details: {
      introduction: "Official certification covering fundamental AI concepts and practical implementations.",
      features: ["Search Algorithms", "Neural Networks", "Expert Systems"],
      techStackDetailed: ["Python", "TensorFlow", "Scikit-Learn"],
      requirements: ["Successful Exam Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Artificial Intelligence.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Artificial Intelligence.pdf"
    }
  },
  {
    id: "cert-ds-ml",
    title: "Data Science and ML",
    description: "Comprehensive certification in data analysis and machine learning methodologies.",
    tech: ["Data Science", "ML"],
    category: "cert",
    details: {
      introduction: "Validated expertise in statistical modeling, data visualization, and predictive analysis.",
      features: ["Predictive Modeling", "Feature Engineering", "Data Wrangling"],
      techStackDetailed: ["Pandas", "Matplotlib", "Seaborn", "MLlib"],
      requirements: ["Successful Project Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Data Science and ML Certificate.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Data Science and ML Certificate.pdf"
    }
  },
  {
    id: "cert-gen-ai",
    title: "Generative AI",
    description: "Certification for Generative AI models and Large Language Model architectures.",
    tech: ["Gen AI", "LLMs"],
    category: "cert",
    details: {
      introduction: "Deep dive into the architectures and fine-tuning of modern generative models.",
      features: ["Transformer Architectures", "GANs", "Diffusion Models"],
      techStackDetailed: ["PyTorch", "HuggingFace", "LangChain"],
      requirements: ["Successful Model Deployment"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Generative AI.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Generative AI.pdf"
    }
  },
  {
    id: "cert-intro-ai",
    title: "Introduction to Artificial Intelligence",
    description: "Foundational certification in AI history, logic, and basic algorithms.",
    tech: ["AI Fundamentals"],
    category: "cert",
    details: {
      introduction: "Introduction to the broad field of AI, from symbolic logic to modern heuristics.",
      features: ["Logic-based AI", "Heuristic Search", "Basic Probabilistic Reasoning"],
      techStackDetailed: ["Python", "Logic Frameworks"],
      requirements: ["Course Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Introduction to Artificial Intelligence.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Introduction to Artificial Intelligence.pdf"
    }
  },
  {
    id: "cert-intro-cv",
    title: "Introduction to Computer Vision",
    description: "Certification in image processing and visual perception models.",
    tech: ["Computer Vision", "Image Processing"],
    category: "cert",
    details: {
      introduction: "Foundational knowledge in detecting features, edges, and object recognition.",
      features: ["Edge Detection", "Image Filtering", "Object Recognition"],
      techStackDetailed: ["OpenCV", "NumPy"],
      requirements: ["Course Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Introduction to Computer Vision.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Introduction to Computer Vision.pdf"
    }
  },
  {
    id: "cert-intro-dl",
    title: "Introduction to Deep Learning",
    description: "Deep Learning certification focusing on backpropagation and deep neural networks.",
    tech: ["Deep Learning", "Neural Networks"],
    category: "cert",
    details: {
      introduction: "Understanding the core mechanics of deep neural networks and optimization strategies.",
      features: ["Backpropagation", "Gradient Descent", "Multi-layer Perceptrons"],
      techStackDetailed: ["PyTorch", "Keras"],
      requirements: ["Course Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Introduction to Deep Learning.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Introduction to Deep Learning.pdf"
    }
  },
  {
    id: "cert-intro-nlm",
    title: "Introduction to NLM",
    description: "Specialized certification in Network Layer Models and protocols.",
    tech: ["Networking", "NLM"],
    category: "cert",
    details: {
      introduction: "Exploration of network layer protocols and distributed systems communication.",
      features: ["Network Protocols", "Layer Architecture", "Distributed Systems"],
      techStackDetailed: ["TCP/IP", "Networking Tools"],
      requirements: ["Course Completion"],
      cloneGuide: [
        { step: "View Certificate", command: "open /assets/certifications/Introduction to NLM.pdf" }
      ],
      liveDemoLink: "/assets/certifications/Introduction to NLM.pdf"
    }
  },
  {
    id: "publications-wip",
    title: "publications.txt",
    description: "Work in progress documentation for upcoming publications.",
    tech: ["Documentation"],
    category: "media",
    details: {
      introduction: "System check: Publications directory is currently under optimization...",
      features: ["Research Papers", "Technical Blogs", "Conference Submissions"],
      techStackDetailed: ["LaTeX", "Markdown", "Obsidian"],
      requirements: ["Access Authorization"],
      cloneGuide: [
        { step: "Initialize Scan", command: "cat ./publications/wip.log" },
        { step: "Status Check", command: "ls -la /publications" }
      ]
    }
  }
];
