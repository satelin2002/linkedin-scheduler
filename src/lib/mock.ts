// Mock data for topics
export const availableTopics = [
  "Marketing and Branding",
  "Sales and Customer Success",
  "Human Resources and Organizational Culture",
  "Finance and Operations",
  "Technology and Innovation",
  "Leadership and Management",
  "Career Development",
  "Personal Growth and Mindset",
  "Productivity and Time Management",
  "Diversity, Equity, and Inclusion",
  "Entrepreneurship and Startups",
  "Business Strategy and Planning",
  "Industry Trends and Analysis",
  "Digital Transformation",
  "Sustainability and Corporate Responsibility",
  "Networking and Relationship Building",
  "Employee Engagement and Retention",
  "Customer Experience and Journey",
  "Data and Analytics",
  "Future of Work",
  "Crisis and Risk Management",
  "Learning and Development",
  "Remote and Hybrid Work",
  "Collaboration and Teamwork",
  "Innovation and Creativity",
  "Change Management",
  "Cybersecurity and Privacy",
  "E-commerce and Retail",
  "Mental Health and Workplace Well-being",
  "Communication and Storytelling",
];

// Mock ideas without emojis
export const mockIdeas = [
  "10 Essential Leadership Lessons I Learned in Tech",
  "Why AI Will Change the Future of Web Development",
  "Building a Personal Brand in the Age of Social Media",
  "The Most Important Productivity Habits for Developers",
  "How AI is Driving Accessibility in Modern Applications",
  "The Hidden Challenges of Scaling Microservices",
  "5 Lessons Startups Can Teach Enterprises About Agility",
  "Why Cloud-Native Development is the Future of Software Engineering",
  "Demystifying Large Language Models for Everyday Use Cases",
  "The Evolution of User Experience in the Era of AI",
];

export interface PopularPost {
  id: string;
  content: string;
  topics: string[];
  timestamp: string;
}

export interface TopicSection {
  name: string;
  posts: PopularPost[];
}

export const popularTopics: TopicSection[] = [
  {
    name: "💼 Personal Branding",
    posts: [
      {
        id: "1",
        content:
          "💡 Building your personal brand starts with authenticity! Share your expertise and engage with your audience to build trust. #PersonalBranding 💼 #CareerGrowth 📈",
        topics: ["💼 Personal Branding", "📈 Career Growth"],
        timestamp: "2024-11-24T12:00:00Z",
      },
      {
        id: "2",
        content:
          "🔑 Your LinkedIn headline is your personal elevator pitch! Keep it concise, impactful, and aligned with your career goals. 🚀 #PersonalBranding 💼",
        topics: ["💼 Personal Branding"],
        timestamp: "2024-11-23T14:30:00Z",
      },
      {
        id: "3",
        content:
          "📚 Thought leadership is a powerful branding tool. Write articles and share insights to stand out in your field! #PersonalBranding 💼 #ThoughtLeadership 🧠",
        topics: ["💼 Personal Branding", "🧠 Thought Leadership"],
        timestamp: "2024-11-22T16:00:00Z",
      },
      {
        id: "4",
        content:
          "📸 A professional profile picture builds trust and credibility. Refresh your LinkedIn photo for a stronger first impression. #PersonalBranding 💼",
        topics: ["💼 Personal Branding"],
        timestamp: "2024-11-21T11:15:00Z",
      },
      {
        id: "5",
        content:
          "🤝 Networking is key to personal branding. Join industry groups and participate in meaningful discussions. #PersonalBranding 💼 #Networking 🤝",
        topics: ["💼 Personal Branding", "🤝 Networking"],
        timestamp: "2024-11-20T13:45:00Z",
      },
    ],
  },
  {
    name: "💻 Technology",
    posts: [
      {
        id: "6",
        content:
          "🤖 AI is revolutionizing industries worldwide! From healthcare to education, its applications are endless. What ethical considerations should we prioritize? 🌍 #Technology 💻 #ArtificialIntelligence 🤖",
        topics: ["💻 Technology", "🤖 Artificial Intelligence"],
        timestamp: "2024-11-24T15:45:00Z",
      },
      {
        id: "7",
        content:
          "☁️ Cloud computing is the backbone of modern innovation. Businesses are scaling faster than ever before. What are your favorite cloud platforms? 💬 #CloudComputing ☁️ #Technology 💻",
        topics: ["💻 Technology", "☁️ Cloud Computing"],
        timestamp: "2024-11-23T10:15:00Z",
      },
      {
        id: "8",
        content:
          "🔐 Cybersecurity is a growing concern. How can businesses protect themselves from data breaches in 2024? 🛡️ #Technology 💻 #Cybersecurity 🔒",
        topics: ["💻 Technology", "🔒 Cybersecurity"],
        timestamp: "2024-11-22T08:30:00Z",
      },
      {
        id: "9",
        content:
          "📡 The future of 5G technology is here. How will ultra-fast connectivity shape industries in the next decade? 🚀 #5G 📡 #Technology 💻",
        topics: ["💻 Technology", "📡 5G"],
        timestamp: "2024-11-21T09:20:00Z",
      },
      {
        id: "10",
        content:
          "💾 Quantum computing is no longer science fiction. What are its practical applications, and how soon will it impact us? 🧬 #Technology 💻 #QuantumComputing 💾",
        topics: ["💻 Technology", "💾 Quantum Computing"],
        timestamp: "2024-11-20T17:00:00Z",
      },
    ],
  },
  {
    name: "🧘 Health & Wellness",
    posts: [
      {
        id: "11",
        content:
          "🌿 Prioritizing mental health is key to achieving work-life balance. Take a moment today to reflect and recharge. 🧘‍♂️ #Wellness 🧘 #MentalHealth 🌿",
        topics: ["🧘 Health & Wellness", "🌿 Mental Health"],
        timestamp: "2024-11-24T09:30:00Z",
      },
      {
        id: "12",
        content:
          "💪 A healthy body fuels a healthy mind! Incorporate exercise into your daily routine for a productive day. 🏋️‍♀️ #Health 🏋️ #Productivity ⏱️",
        topics: ["🧘 Health & Wellness", "⏱️ Productivity"],
        timestamp: "2024-11-23T07:20:00Z",
      },
      {
        id: "13",
        content:
          "🍎 Nutrition is the foundation of wellness. What’s your go-to healthy snack to stay energized throughout the day? 🍇 #Health 🧘 #Nutrition 🍎",
        topics: ["🧘 Health & Wellness", "🍎 Nutrition"],
        timestamp: "2024-11-22T12:00:00Z",
      },
      {
        id: "14",
        content:
          "🧘‍♀️ Mindfulness isn’t just for meditation—it’s a tool for improving focus at work. How do you practice mindfulness? ✨ #Wellness 🧘 #Mindfulness ✨",
        topics: ["🧘 Health & Wellness", "✨ Mindfulness"],
        timestamp: "2024-11-21T14:00:00Z",
      },
      {
        id: "15",
        content:
          "🏞️ Spending time in nature reduces stress and boosts creativity. When was the last time you unplugged and connected with nature? 🌳 #Wellness 🧘 #Nature 🌿",
        topics: ["🧘 Health & Wellness", "🌿 Nature"],
        timestamp: "2024-11-20T10:30:00Z",
      },
    ],
  },
  {
    name: "📈 Career Growth",
    posts: [
      {
        id: "16",
        content:
          "🎯 Setting SMART goals is key to career advancement. What are your professional goals for 2024? Share and let's support each other! #CareerGrowth 📈 #Goals 🎯",
        topics: ["📈 Career Growth", "🎯 Goals"],
        timestamp: "2024-11-24T08:00:00Z",
      },
      {
        id: "17",
        content:
          "📚 Never stop learning! Just completed a new certification in cloud computing. What skills are you developing this year? #CareerGrowth 📈 #Learning 📚",
        topics: ["📈 Career Growth", "📚 Learning"],
        timestamp: "2024-11-23T10:30:00Z",
      },
      {
        id: "18",
        content:
          "🤝 Mentorship can accelerate your career growth. Both being a mentor and mentee have unique benefits. Share your mentorship experiences! #CareerGrowth 📈",
        topics: ["📈 Career Growth", "🤝 Mentorship"],
        timestamp: "2024-11-22T15:45:00Z",
      },
    ],
  },
  {
    name: "💡 Innovation",
    posts: [
      {
        id: "19",
        content:
          "🔮 The future of work is being shaped by AI and automation. How are you preparing for these changes? #Innovation 💡 #FutureOfWork 🚀",
        topics: ["💡 Innovation", "🚀 Future of Work"],
        timestamp: "2024-11-24T11:15:00Z",
      },
      {
        id: "20",
        content:
          "🧪 Innovation isn't just about technology—it's about solving problems in new ways. What innovative solutions have you implemented recently? #Innovation 💡",
        topics: ["💡 Innovation", "🧪 Problem Solving"],
        timestamp: "2024-11-23T09:45:00Z",
      },
      {
        id: "21",
        content:
          "🌱 Sustainability and innovation go hand in hand. How is your organization incorporating eco-friendly practices? #Innovation 💡 #Sustainability 🌱",
        topics: ["💡 Innovation", "🌱 Sustainability"],
        timestamp: "2024-11-22T14:30:00Z",
      },
    ],
  },
  {
    name: "🎯 Productivity",
    posts: [
      {
        id: "22",
        content:
          "⏰ Time-blocking has revolutionized my productivity. What time management techniques work best for you? #Productivity 🎯 #TimeManagement ⏰",
        topics: ["🎯 Productivity", "⏰ Time Management"],
        timestamp: "2024-11-24T13:00:00Z",
      },
      {
        id: "23",
        content:
          "📱 The right tools can make a huge difference. My top 3 productivity apps: Notion, Todoist, and Forest. What are yours? #Productivity 🎯 #Tools 🛠️",
        topics: ["🎯 Productivity", "🛠️ Tools"],
        timestamp: "2024-11-23T16:20:00Z",
      },
      {
        id: "24",
        content:
          "🧘‍♂️ Productivity isn't just about doing more—it's about doing the right things. How do you prioritize your tasks? #Productivity 🎯 #Mindfulness 🧘‍♂️",
        topics: ["🎯 Productivity", "🧘‍♂️ Mindfulness"],
        timestamp: "2024-11-22T10:45:00Z",
      },
    ],
  },
  {
    name: "🚀 Startup Life",
    posts: [
      {
        id: "25",
        content:
          "💪 Building a startup is a marathon, not a sprint. What keeps you motivated during tough times? #StartupLife 🚀 #Entrepreneurship 💼",
        topics: ["🚀 Startup Life", "💼 Entrepreneurship"],
        timestamp: "2024-11-24T14:45:00Z",
      },
      {
        id: "26",
        content:
          "💰 Fundraising tips: Build relationships early, know your numbers, and tell a compelling story. What's your fundraising experience? #StartupLife 🚀",
        topics: ["🚀 Startup Life", "💰 Fundraising"],
        timestamp: "2024-11-23T11:30:00Z",
      },
      {
        id: "27",
        content:
          "🎨 Company culture starts on day one. How are you building a strong startup culture? Share your experiences! #StartupLife 🚀 #Culture 🎨",
        topics: ["🚀 Startup Life", "🎨 Culture"],
        timestamp: "2024-11-22T09:15:00Z",
      },
    ],
  },
  {
    name: "🎨 Design & UX",
    posts: [
      {
        id: "28",
        content:
          "🎯 User research is the foundation of great design. Just completed 20 user interviews and the insights are eye-opening! What's your research process? #UXDesign 🎨 #UserResearch 🔍",
        topics: ["🎨 Design & UX", "🔍 User Research"],
        timestamp: "2024-11-24T16:30:00Z",
      },
      {
        id: "29",
        content:
          "🌈 Design systems save time and ensure consistency. How do you maintain your design system at scale? #DesignSystems 🎨 #Design",
        topics: ["🎨 Design & UX", "🌈 Design Systems"],
        timestamp: "2024-11-23T13:45:00Z",
      },
      {
        id: "30",
        content:
          "⚡️ Performance and aesthetics should go hand in hand. How do you balance beautiful design with fast load times? #WebPerformance ⚡️ #Design 🎨",
        topics: ["🎨 Design & UX", "⚡️ Performance"],
        timestamp: "2024-11-22T11:20:00Z",
      },
    ],
  },
  {
    name: "🤝 Leadership",
    posts: [
      {
        id: "31",
        content:
          "👥 Great leaders create more leaders. How are you helping your team grow? Share your mentorship strategies! #Leadership 🤝 #TeamGrowth 📈",
        topics: ["🤝 Leadership", "📈 Team Growth"],
        timestamp: "2024-11-24T10:15:00Z",
      },
      {
        id: "32",
        content:
          "🎯 Setting clear expectations is key to team success. What's your framework for goal setting with your team? #Leadership 🤝 #Goals",
        topics: ["🤝 Leadership", "🎯 Goal Setting"],
        timestamp: "2024-11-23T14:20:00Z",
      },
      {
        id: "33",
        content:
          "💭 Emotional intelligence is crucial in leadership. How do you practice empathy in challenging situations? #Leadership 🤝 #EmotionalIntelligence",
        topics: ["🤝 Leadership", "💭 EQ"],
        timestamp: "2024-11-22T09:45:00Z",
      },
    ],
  },
  {
    name: "🌐 Web3 & Blockchain",
    posts: [
      {
        id: "34",
        content:
          "⛓️ Smart contracts are revolutionizing digital agreements. What's your take on the future of decentralized applications? #Web3 🌐 #Blockchain",
        topics: ["🌐 Web3", "⛓️ Blockchain"],
        timestamp: "2024-11-24T15:30:00Z",
      },
      {
        id: "35",
        content:
          "🔐 Web3 security is paramount. What best practices do you follow for smart contract auditing? #Web3Security 🌐 #Security",
        topics: ["🌐 Web3", "🔐 Security"],
        timestamp: "2024-11-23T12:15:00Z",
      },
      {
        id: "36",
        content:
          "🌍 DAOs are changing organizational structures. Share your experience with decentralized governance! #Web3 🌐 #DAO",
        topics: ["🌐 Web3", "🌍 DAO"],
        timestamp: "2024-11-22T16:45:00Z",
      },
    ],
  },
  {
    name: "📱 Mobile Development",
    posts: [
      {
        id: "37",
        content:
          "📲 Cross-platform or native? The eternal mobile dev debate continues. What's your preferred approach and why? #MobileDev 📱 #Development",
        topics: ["📱 Mobile Dev", "📲 Cross Platform"],
        timestamp: "2024-11-24T11:45:00Z",
      },
      {
        id: "38",
        content:
          "🔄 CI/CD for mobile apps is crucial. What's your deployment pipeline look like? Share your automation tips! #MobileDev 📱 #DevOps",
        topics: ["📱 Mobile Dev", "🔄 DevOps"],
        timestamp: "2024-11-23T09:30:00Z",
      },
      {
        id: "39",
        content:
          "📊 App analytics drive growth. Which metrics do you track most closely? #MobileDev 📱 #Analytics",
        topics: ["📱 Mobile Dev", "📊 Analytics"],
        timestamp: "2024-11-22T13:20:00Z",
      },
    ],
  },
  {
    name: "🤖 AI & Machine Learning",
    posts: [
      {
        id: "40",
        content:
          "🧠 LLMs are transforming how we interact with technology. What's your favorite practical application of GPT? #AI 🤖 #MachineLearning",
        topics: ["🤖 AI", "🧠 LLM"],
        timestamp: "2024-11-24T14:15:00Z",
      },
      {
        id: "41",
        content:
          "📈 Model optimization is an art. Share your techniques for improving ML model performance! #AI 🤖 #ModelOptimization",
        topics: ["🤖 AI", "📈 Optimization"],
        timestamp: "2024-11-23T10:45:00Z",
      },
      {
        id: "42",
        content:
          "🎯 AI ethics should be at the forefront of development. How do you ensure responsible AI deployment? #AI 🤖 #Ethics",
        topics: ["🤖 AI", "🎯 Ethics"],
        timestamp: "2024-11-22T15:30:00Z",
      },
    ],
  },
];

export const userPosts = [
  {
    id: "1",
    content:
      "🚀 Just launched our new AI-powered feature! Excited to share that our team has been working on implementing machine learning algorithms to enhance user experience. What are your thoughts on AI in product development?",
    topics: ["🤖 AI", "💡 Innovation"],
    timestamp: "2024-02-24T09:30:00Z",
    saved: false,
    status: "published",
  },
  {
    id: "2",
    content:
      "📊 Data-driven decision making is key to success. Here's how we increased our conversion rate by 40% using A/B testing and user behavior analytics.",
    topics: ["📊 Analytics", "📈 Growth"],
    timestamp: "2024-02-23T14:20:00Z",
    saved: true,
    status: "scheduled",
  },
  {
    id: "3",
    content:
      "🎯 Product-market fit is crucial for startups. We spent 3 months interviewing customers and iterating on our MVP. The insights we gained were invaluable.",
    topics: ["🚀 Startup", "💡 Product"],
    timestamp: "2024-02-22T11:15:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "4",
    content:
      "💡 5 Key Trends in AI Development for 2024: 1. Multimodal AI Models, 2. Edge Computing Integration, 3. AI Governance Frameworks, 4. Sustainable AI Solutions, 5. Hybrid AI Architectures",
    topics: ["🤖 AI", "🔮 Trends"],
    timestamp: "2024-03-01T10:00:00Z",
    saved: false,
    status: "scheduled",
  },
  {
    id: "5",
    content:
      "🌟 Celebrating a major milestone! Our platform just hit 1 million active users. Thank you to our amazing community for your continued support and feedback.",
    topics: ["🎉 Milestones", "🚀 Growth"],
    timestamp: "2024-02-20T15:45:00Z",
    saved: true,
    status: "published",
  },
  {
    id: "6",
    content:
      "[Draft] Working on a comprehensive guide to modern software architecture patterns. Would love your input on which patterns you find most useful in production environments.",
    topics: ["🏗️ Architecture", "💻 Development"],
    timestamp: "2024-02-25T08:20:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "7",
    content:
      "📱 Mobile-first design principles that actually work: Insights from redesigning our entire app interface. Full case study coming next week!",
    topics: ["🎨 Design", "📱 Mobile"],
    timestamp: "2024-03-05T09:00:00Z",
    saved: false,
    status: "scheduled",
  },
  {
    id: "8",
    content:
      "🔐 Security best practices in modern web applications: A deep dive into our latest security audit findings and implementations.",
    topics: ["🔐 Security", "🌐 Web"],
    timestamp: "2024-02-21T16:30:00Z",
    saved: true,
    status: "published",
  },
  {
    id: "9",
    content:
      "[Draft] Exploring the impact of WebAssembly on web application performance. Initial benchmarks showing promising results.",
    topics: ["⚡ Performance", "🌐 Web"],
    timestamp: "2024-02-26T11:45:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "10",
    content:
      "[Draft] 🤔 Thoughts on microservices vs monoliths? Working on an article comparing our journey from monolith to microservices. Key points to cover: scalability, maintenance overhead, team structure, deployment complexity.",
    topics: ["🏗️ Architecture", "📝 Development"],
    timestamp: "2024-02-27T14:20:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "11",
    content:
      "[Draft] 📚 Building a Learning Culture in Tech Teams - Tips from our engineering department: 1. Weekly knowledge sharing sessions 2. Rotation programs 3. Innovation time 4. Mentorship pairs",
    topics: ["👥 Leadership", "📚 Learning"],
    timestamp: "2024-02-28T09:15:00Z",
    saved: true,
    status: "draft",
  },
  {
    id: "12",
    content:
      "[Draft] 🔄 DevOps Evolution: Our path to continuous deployment. Need to add more details about: - CI/CD pipeline improvements - Monitoring setup - Incident response automation - Testing strategies",
    topics: ["🔄 DevOps", "⚡ Automation"],
    timestamp: "2024-02-28T16:45:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "13",
    content:
      "[Draft] 💭 Considering writing about our experience with GraphQL adoption. Key points: Schema design, Performance optimization, Client-side caching, Backend integration challenges...",
    topics: ["🔗 API", "💻 Development"],
    timestamp: "2024-02-29T10:30:00Z",
    saved: false,
    status: "draft",
  },
  {
    id: "14",
    content:
      "[Draft] 🌐 Web Performance Optimization Techniques - Initial outline: 1. Image optimization strategies 2. Code splitting approaches 3. Caching strategies 4. Runtime performance improvements",
    topics: ["⚡ Performance", "🌐 Web"],
    timestamp: "2024-02-29T13:20:00Z",
    saved: true,
    status: "draft",
  },
];
