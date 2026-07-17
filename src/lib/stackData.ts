export interface Skill {
  name: string;
  logo?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const getLogo = (name: string) => {
  const n = name.toLowerCase().replace(".js", "").replace(" ", "");
  
  // Custom Mappings for VectorLogoZone (High Quality Colorful SVGs)
  // Using variants that are known to be colorful and visible
  const vectorLogos: Record<string, string> = {
    javascript: "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg",
    typescript: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    python: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
    "c++": "https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg",
    java: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
    sql: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg",
    html5: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
    react: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    nextjs: "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg",
    tailwindcss: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    framer: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
    nodejs: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    express: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
    flask: "https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg",
    mongodb: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    postgresql: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
    redis: "https://www.vectorlogo.zone/logos/redis/redis-icon.svg",
    mysql: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg",
    firebase: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    docker: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
    git: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    vercel: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
    postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    tensorflow: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg",
    opencv: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg",
    vite: "https://www.vectorlogo.zone/logos/vitejs/vitejs-icon.svg"
  };

  return vectorLogos[n] || `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;
};

export const STACK_DATA: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "JavaScript", logo: getLogo("javascript") },
      { name: "TypeScript", logo: getLogo("typescript") },
      { name: "Python", logo: getLogo("python") },
      { name: "C++", logo: getLogo("c++") },
      { name: "Java", logo: getLogo("java") },
      { name: "SQL", logo: getLogo("sql") },
      { name: "HTML/CSS", logo: getLogo("html5") }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React.js", logo: getLogo("react") },
      { name: "Next.js 15", logo: getLogo("nextjs") },
      { name: "Tailwind CSS", logo: getLogo("tailwindcss") },
      { name: "Framer Motion", logo: getLogo("framer") },
      { name: "Radix UI", logo: "https://raw.githubusercontent.com/radix-ui/icons/master/packages/radix-icons/icons/component-instance.svg" },
      { name: "Vite", logo: getLogo("vite") },
      { name: "Responsive Design", logo: "https://www.vectorlogo.zone/logos/google_chrome/google_chrome-icon.svg" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", logo: getLogo("nodejs") },
      { name: "Express.js", logo: getLogo("express") },
      { name: "REST API & Backend", logo: "https://www.vectorlogo.zone/logos/mulesoft/mulesoft-icon.svg" },
      { name: "WebSockets", logo: "https://www.vectorlogo.zone/logos/ably/ably-icon.svg" },
      { name: "Socket.io", logo: "https://www.vectorlogo.zone/logos/socketio/socketio-icon.svg" },
      { name: "JWT Authentication", logo: "https://www.vectorlogo.zone/logos/auth0/auth0-icon.svg" },
      { name: "Microservices", logo: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "MongoDB", logo: getLogo("mongodb") },
      { name: "PostgreSQL", logo: getLogo("postgresql") },
      { name: "Redis", logo: getLogo("redis") },
      { name: "MySQL", logo: getLogo("mysql") },
      { name: "Firebase", logo: getLogo("firebase") },
      { name: "Apache Hive", logo: "https://www.vectorlogo.zone/logos/apache_hive/apache_hive-icon.svg" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", logo: getLogo("docker") },
      { name: "Git", logo: getLogo("git") },
      { name: "Vercel", logo: getLogo("vercel") },
      { name: "Postman", logo: getLogo("postman") },
      { name: "CI/CD", logo: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" },
      { name: "Stripe API", logo: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg" },
      { name: "WhatsApp Business API", logo: "https://www.vectorlogo.zone/logos/whatsapp/whatsapp-icon.svg" }
    ]
  },
  {
    id: "ml",
    title: "AI/ML",
    skills: [
      { name: "XGBoost", logo: "https://raw.githubusercontent.com/dmlc/dmlc.github.io/master/img/logo/xgboost.png" },
      { name: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "TensorFlow", logo: getLogo("tensorflow") },
      { name: "Feature Engineering", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/settings-2.svg" },
      { name: "OpenCV", logo: getLogo("opencv") },
      { name: "GridSearchCV", logo: "https://www.vectorlogo.zone/logos/google_search/google_search-icon.svg" },
      { name: "Apache Spark", logo: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" }
    ]
  },
  {
    id: "core",
    title: "Core CS",
    skills: [
      { name: "Data Structures & Algorithms", logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
      { name: "System Design", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/network.svg" },
      { name: "Low-Level Design (LLD)", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layers.svg" },
      { name: "Object-Oriented Programming", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/component.svg" },
      { name: "Database Management System", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/database.svg" },
      { name: "Operating Systems", logo: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/hard-drive.svg" },
      { name: "Computer Networks", logo: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" }
    ]
  }
];
