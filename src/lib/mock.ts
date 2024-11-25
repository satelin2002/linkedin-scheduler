// Mock data for topics
export const availableTopics = [
  "Technology",
  "Leadership",
  "Career Growth",
  "Productivity",
  "AI & ML",
  "Web Development",
  "Personal Branding",
  "Startup",
];

// Mock ideas without emojis
export const mockIdeas = [
  "10 Essential Leadership Lessons I Learned in Tech",
  "Why AI Will Change the Future of Web Development",
  "Building a Personal Brand in the Age of Social Media",
  "The Most Important Productivity Habits for Developers",
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
    name: "Personal Branding 💼",
    posts: [
      {
        id: "1",
        content:
          "💡 Building your personal brand starts with authenticity! Share your expertise and engage with your audience to build trust. #PersonalBranding 💼 #CareerGrowth 📈",
        topics: ["Personal Branding 💼", "Career Growth 📈"],
        timestamp: "2024-11-24T12:00:00Z",
      },
      {
        id: "2",
        content:
          "🔑 Your LinkedIn headline is your personal elevator pitch! Keep it concise, impactful, and aligned with your career goals. 🚀 #PersonalBranding 💼",
        topics: ["Personal Branding 💼"],
        timestamp: "2024-11-23T14:30:00Z",
      },
      {
        id: "3",
        content:
          "📚 Thought leadership is a powerful branding tool. Write articles and share insights to stand out in your field! #PersonalBranding 💼 #ThoughtLeadership 🧠",
        topics: ["Personal Branding 💼", "Thought Leadership 🧠"],
        timestamp: "2024-11-22T16:00:00Z",
      },
      {
        id: "4",
        content:
          "📸 A professional profile picture builds trust and credibility. Refresh your LinkedIn photo for a stronger first impression. #PersonalBranding 💼",
        topics: ["Personal Branding 💼"],
        timestamp: "2024-11-21T11:15:00Z",
      },
      {
        id: "5",
        content:
          "🤝 Networking is key to personal branding. Join industry groups and participate in meaningful discussions. #PersonalBranding 💼 #Networking 🤝",
        topics: ["Personal Branding 💼", "Networking 🤝"],
        timestamp: "2024-11-20T13:45:00Z",
      },
    ],
  },
  {
    name: "Technology 💻",
    posts: [
      {
        id: "6",
        content:
          "🤖 AI is revolutionizing industries worldwide! From healthcare to education, its applications are endless. What ethical considerations should we prioritize? 🌍 #Technology 💻 #ArtificialIntelligence 🤖",
        topics: ["Technology 💻", "Artificial Intelligence 🤖"],
        timestamp: "2024-11-24T15:45:00Z",
      },
      {
        id: "7",
        content:
          "☁️ Cloud computing is the backbone of modern innovation. Businesses are scaling faster than ever before. What are your favorite cloud platforms? 💬 #CloudComputing ☁️ #Technology 💻",
        topics: ["Technology 💻", "Cloud Computing ☁️"],
        timestamp: "2024-11-23T10:15:00Z",
      },
      {
        id: "8",
        content:
          "🔐 Cybersecurity is a growing concern. How can businesses protect themselves from data breaches in 2024? 🛡️ #Technology 💻 #Cybersecurity 🔒",
        topics: ["Technology 💻", "Cybersecurity 🔒"],
        timestamp: "2024-11-22T08:30:00Z",
      },
      {
        id: "9",
        content:
          "📡 The future of 5G technology is here. How will ultra-fast connectivity shape industries in the next decade? 🚀 #5G 📡 #Technology 💻",
        topics: ["Technology 💻", "5G 📡"],
        timestamp: "2024-11-21T09:20:00Z",
      },
      {
        id: "10",
        content:
          "💾 Quantum computing is no longer science fiction. What are its practical applications, and how soon will it impact us? 🧬 #Technology 💻 #QuantumComputing 💾",
        topics: ["Technology 💻", "Quantum Computing 💾"],
        timestamp: "2024-11-20T17:00:00Z",
      },
    ],
  },
  {
    name: "Health & Wellness 🧘",
    posts: [
      {
        id: "11",
        content:
          "🌿 Prioritizing mental health is key to achieving work-life balance. Take a moment today to reflect and recharge. 🧘‍♂️ #Wellness 🧘 #MentalHealth 🌿",
        topics: ["Health & Wellness 🧘", "Mental Health 🌿"],
        timestamp: "2024-11-24T09:30:00Z",
      },
      {
        id: "12",
        content:
          "💪 A healthy body fuels a healthy mind! Incorporate exercise into your daily routine for a productive day. 🏋️‍♀️ #Health 🏋️ #Productivity ⏱️",
        topics: ["Health & Wellness 🧘", "Productivity ⏱️"],
        timestamp: "2024-11-23T07:20:00Z",
      },
      {
        id: "13",
        content:
          "🍎 Nutrition is the foundation of wellness. What’s your go-to healthy snack to stay energized throughout the day? 🍇 #Health 🧘 #Nutrition 🍎",
        topics: ["Health & Wellness 🧘", "Nutrition 🍎"],
        timestamp: "2024-11-22T12:00:00Z",
      },
      {
        id: "14",
        content:
          "🧘‍♀️ Mindfulness isn’t just for meditation—it’s a tool for improving focus at work. How do you practice mindfulness? ✨ #Wellness 🧘 #Mindfulness ✨",
        topics: ["Health & Wellness 🧘", "Mindfulness ✨"],
        timestamp: "2024-11-21T14:00:00Z",
      },
      {
        id: "15",
        content:
          "🏞️ Spending time in nature reduces stress and boosts creativity. When was the last time you unplugged and connected with nature? 🌳 #Wellness 🧘 #Nature 🌿",
        topics: ["Health & Wellness 🧘", "Nature 🌿"],
        timestamp: "2024-11-20T10:30:00Z",
      },
    ],
  },
  {
    name: "Leadership 🧑‍💼",
    posts: [
      {
        id: "16",
        content:
          "🌟 Great leaders inspire action, not just with their words but their actions. What’s one leadership quality you admire? #Leadership 🧑‍💼",
        topics: ["Leadership 🧑‍💼"],
        timestamp: "2024-11-24T08:00:00Z",
      },
      {
        id: "17",
        content:
          "🤝 Effective leadership starts with listening. How do you ensure your team feels heard? 🎙️ #Leadership 🧑‍💼 #Teamwork 🤝",
        topics: ["Leadership 🧑‍💼", "Teamwork 🤝"],
        timestamp: "2024-11-23T11:30:00Z",
      },
      {
        id: "18",
        content:
          "💬 Communication is a cornerstone of leadership. What’s your strategy for clear and impactful messaging? 🗣️ #Leadership 🧑‍💼",
        topics: ["Leadership 🧑‍💼"],
        timestamp: "2024-11-22T16:45:00Z",
      },
      {
        id: "19",
        content:
          "🚀 Empowering your team to take risks is a sign of great leadership. How do you foster innovation? 💡 #Leadership 🧑‍💼 #Innovation 💡",
        topics: ["Leadership 🧑‍💼", "Innovation 💡"],
        timestamp: "2024-11-21T18:30:00Z",
      },
      {
        id: "20",
        content:
          "🧭 Visionary leaders pave the way forward. How do you balance big-picture goals with day-to-day operations? 🔍 #Leadership 🧑‍💼 #Strategy 🗺️",
        topics: ["Leadership 🧑‍💼", "Strategy 🗺️"],
        timestamp: "2024-11-20T19:15:00Z",
      },
    ],
  },
  {
    name: "Artificial Intelligence 🤖",
    posts: [
      {
        id: "21",
        content:
          "🧠 Generative AI is shaping the future of creativity. How can we ensure ethical use of this powerful tool? 🌍 #ArtificialIntelligence 🤖",
        topics: ["Artificial Intelligence 🤖"],
        timestamp: "2024-11-24T10:45:00Z",
      },
      {
        id: "22",
        content:
          "📈 AI in analytics is driving smarter decision-making. How does your organization leverage AI for better insights? 🧮 #AI 🤖 #Analytics 📈",
        topics: ["Artificial Intelligence 🤖", "Analytics 📈"],
        timestamp: "2024-11-23T13:00:00Z",
      },
      {
        id: "23",
        content:
          "🤖 AI for healthcare is saving lives. What advancements do you think will shape the next decade? 🏥 #AI 🤖 #Healthcare 💊",
        topics: ["Artificial Intelligence 🤖", "Healthcare 💊"],
        timestamp: "2024-11-22T14:30:00Z",
      },
      {
        id: "24",
        content:
          "🔍 AI and natural language processing are improving customer experiences. What’s your take on chatbots in customer service? 💬 #AI 🤖 #NLP 🔍",
        topics: ["Artificial Intelligence 🤖", "NLP 🔍"],
        timestamp: "2024-11-21T15:15:00Z",
      },
      {
        id: "25",
        content:
          "📊 Predictive AI is transforming business strategies. What industries will benefit the most from this evolution? 🏭 #AI 🤖 #PredictiveAnalytics 📊",
        topics: ["Artificial Intelligence 🤖", "Predictive Analytics 📊"],
        timestamp: "2024-11-20T16:45:00Z",
      },
    ],
  },
];
