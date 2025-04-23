
export interface Speaker {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: Speaker;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  extendedDescription?: string;
  date: string;
  time: string;
  image: string;
  location: string;
  tags: string[];
  featured?: boolean;
  price?: number;
  attendees?: number;
  availableSpots?: number;
  speakers?: Speaker[];
  schedule?: ScheduleItem[];
  learningPoints?: string[];
}

export const mockSpeakers: Speaker[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "AI Research Director, TechInnovate",
    bio: "Dr. Johnson leads cutting-edge research in artificial intelligence and has published over 50 papers on machine learning applications.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Chief Technology Officer, FutureTech",
    bio: "Michael has over 15 years of experience developing enterprise software solutions and leading technology strategy for Fortune 500 companies.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      website: "https://michaelchen.tech"
    }
  },
  {
    id: 3,
    name: "Olivia Martinez",
    title: "Digital Transformation Consultant",
    bio: "Olivia helps organizations navigate digital transformation with a focus on human-centered design and agile methodologies.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      twitter: "https://twitter.com/oliviamartinez",
      linkedin: "https://linkedin.com/in/oliviamartinez"
    }
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Cybersecurity Expert, SecureNet",
    bio: "David specializes in cybersecurity strategy and has advised numerous organizations on building robust security frameworks.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "https://linkedin.com/in/davidwilson",
      website: "https://securenetadvisory.com"
    }
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "UX Research Director, DesignFirst",
    bio: "Priya brings deep expertise in user research methodologies and has led design thinking workshops across four continents.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      twitter: "https://twitter.com/priyauxdesign",
      linkedin: "https://linkedin.com/in/priyapatel"
    }
  },
  {
    id: 6,
    name: "James Rodriguez",
    title: "Blockchain Strategist, ChainInnovate",
    bio: "James helps enterprises understand and implement blockchain solutions that deliver real business value.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      twitter: "https://twitter.com/jamesrodriguez",
      linkedin: "https://linkedin.com/in/jamesrodriguez"
    }
  }
];

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Future of AI: Ethics and Innovation",
    description: "Join us for an insightful discussion on the ethical considerations and innovative potential of artificial intelligence in today's rapidly evolving technological landscape.",
    extendedDescription: "The Future of AI event brings together industry leaders, researchers, and ethicists to explore the complex landscape of artificial intelligence development and implementation. Our distinguished speakers will share cutting-edge research, practical applications, and thoughtful perspectives on ensuring AI technologies benefit humanity while mitigating potential risks.\n\nOver the course of this virtual symposium, we'll examine how AI is transforming industries, the ethical frameworks needed to guide responsible innovation, and practical approaches to addressing algorithmic bias, privacy concerns, and automation's impact on the workforce. Attendees will gain valuable insights into current AI capabilities, emerging trends, and the collaborative effort needed to shape AI's future trajectory.",
    date: "June 15, 2025",
    time: "10:00 AM - 4:00 PM EST",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Technology", "Ethics", "Innovation"],
    featured: true,
    price: 0,
    attendees: 423,
    speakers: [mockSpeakers[0], mockSpeakers[3]],
    schedule: [
      {
        time: "10:00 AM - 10:15 AM",
        title: "Welcome and Introduction",
        description: "Opening remarks and overview of the day's agenda"
      },
      {
        time: "10:15 AM - 11:00 AM",
        title: "The Current State of AI",
        description: "An overview of recent advancements and current capabilities",
        speaker: mockSpeakers[0]
      },
      {
        time: "11:15 AM - 12:00 PM",
        title: "Ethical Frameworks for AI Development",
        description: "Exploring approaches to responsible AI development",
        speaker: mockSpeakers[3]
      },
      {
        time: "1:00 PM - 2:30 PM",
        title: "Panel Discussion: AI's Impact on Society",
        description: "Industry experts discuss the wider implications of AI adoption"
      },
      {
        time: "3:00 PM - 4:00 PM",
        title: "Networking Session",
        description: "Connect with speakers and attendees in themed breakout rooms"
      }
    ],
    learningPoints: [
      "Understanding current AI capabilities and limitations",
      "Frameworks for ethical AI implementation",
      "Strategies for addressing algorithmic bias",
      "The future landscape of AI regulation",
      "Balancing innovation with responsible development"
    ]
  },
  {
    id: 2,
    title: "Blockchain Revolution: Beyond Cryptocurrency",
    description: "Explore the transformative potential of blockchain technology across industries and discover practical applications beyond digital currencies.",
    extendedDescription: "The Blockchain Revolution event goes beyond cryptocurrency hype to explore how distributed ledger technologies are fundamentally changing how we approach data integrity, supply chain management, digital identity, and more. This comprehensive event brings together blockchain pioneers, enterprise adopters, and industry analysts to provide a balanced view of where blockchain delivers genuine value.\n\nAttendees will learn about both the technical underpinnings of different blockchain architectures and the business considerations for successful implementation. Case studies from healthcare, finance, logistics, and government sectors will demonstrate how blockchain solutions are addressing real-world challenges. The event will also explore the evolving regulatory landscape and what it means for blockchain adoption.",
    date: "July 8, 2025",
    time: "9:00 AM - 5:00 PM PST",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Hybrid - San Francisco & Online",
    tags: ["Blockchain", "Business", "Technology"],
    featured: true,
    price: 149,
    attendees: 256,
    speakers: [mockSpeakers[5], mockSpeakers[2]],
    schedule: [
      {
        time: "9:00 AM - 9:30 AM",
        title: "Welcome Address",
        description: "Introduction and overview of the day's events"
      },
      {
        time: "9:30 AM - 10:30 AM",
        title: "Beyond Cryptocurrency: Blockchain's Wider Applications",
        description: "Exploring use cases across various industries",
        speaker: mockSpeakers[5]
      },
      {
        time: "11:00 AM - 12:00 PM",
        title: "Enterprise Blockchain Implementation Strategies",
        description: "Best practices for blockchain adoption in large organizations",
        speaker: mockSpeakers[2]
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Case Study Showcase",
        description: "Real-world blockchain implementations and lessons learned"
      },
      {
        time: "3:30 PM - 5:00 PM",
        title: "The Future of Blockchain: Trends and Predictions",
        description: "Panel discussion on emerging developments in the blockchain space"
      }
    ],
    learningPoints: [
      "Understanding blockchain fundamentals beyond cryptocurrency",
      "Identifying suitable business use cases for blockchain",
      "Implementation strategies and common pitfalls",
      "Evaluating different blockchain platforms and architectures",
      "Navigating regulatory considerations for blockchain projects"
    ]
  },
  {
    id: 3,
    title: "UX Design Masterclass: Creating Exceptional User Experiences",
    description: "A comprehensive workshop on designing intuitive, accessible, and delightful user experiences for digital products.",
    date: "August 12, 2025",
    time: "11:00 AM - 3:00 PM GMT",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Design", "UX/UI", "Workshop"],
    featured: false,
    price: 79,
    attendees: 128,
    speakers: [mockSpeakers[4]],
    learningPoints: [
      "Conducting effective user research and usability testing",
      "Creating user personas and journey maps",
      "Designing accessible interfaces for diverse user needs",
      "Balancing aesthetics with functionality",
      "Measuring and optimizing UX success metrics"
    ]
  },
  {
    id: 4,
    title: "Cybersecurity Summit: Protecting the Digital Enterprise",
    description: "Learn the latest strategies and best practices for securing your organization against evolving cyber threats.",
    date: "September 5, 2025",
    time: "9:00 AM - 6:00 PM EST",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Hybrid - New York & Online",
    tags: ["Cybersecurity", "Business", "Technology"],
    featured: true,
    price: 299,
    attendees: 312,
    speakers: [mockSpeakers[3], mockSpeakers[1]],
    learningPoints: [
      "Building a comprehensive cybersecurity strategy",
      "Threat detection and incident response best practices",
      "Cloud security considerations and approaches",
      "Emerging threats and defense mechanisms",
      "Creating a security-aware organizational culture"
    ]
  },
  {
    id: 5,
    title: "Digital Transformation: Strategies for Success",
    description: "Navigate the challenges of organizational change and technology adoption to succeed in the digital age.",
    date: "October 18, 2025",
    time: "10:00 AM - 4:00 PM CET",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Hybrid - Berlin & Online",
    tags: ["Business", "Strategy", "Innovation"],
    featured: false,
    price: 149,
    attendees: 187,
    speakers: [mockSpeakers[2], mockSpeakers[1]],
    learningPoints: [
      "Assessing digital maturity and identifying transformation priorities",
      "Building cross-functional digital teams",
      "Managing change and overcoming resistance",
      "Selecting and implementing digital tools and platforms",
      "Measuring digital transformation ROI"
    ]
  },
  {
    id: 6,
    title: "Data Science Bootcamp: From Basics to Advanced Analytics",
    description: "An intensive workshop covering the fundamentals of data science, machine learning algorithms, and practical applications.",
    date: "November 10-12, 2025",
    time: "9:00 AM - 5:00 PM PST (Each Day)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Data Science", "Technology", "Workshop"],
    featured: false,
    price: 499,
    attendees: 95,
    speakers: [mockSpeakers[0]],
    learningPoints: [
      "Understanding data collection, cleaning, and preparation techniques",
      "Building and validating predictive models",
      "Implementing machine learning algorithms",
      "Data visualization and storytelling",
      "Ethical considerations in data science"
    ]
  },
  {
    id: 7,
    title: "Remote Work Revolution: Building High-Performing Virtual Teams",
    description: "Discover strategies for effective remote work policies, communication, and team productivity in a distributed environment.",
    date: "December 3, 2025",
    time: "1:00 PM - 5:00 PM GMT",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Leadership", "Business", "Remote Work"],
    featured: false,
    price: 99,
    attendees: 241,
    speakers: [mockSpeakers[2]],
    learningPoints: [
      "Creating effective remote work policies",
      "Tools and technologies for virtual collaboration",
      "Building trust and culture in distributed teams",
      "Managing performance in remote environments",
      "Maintaining work-life balance and preventing burnout"
    ]
  },
  {
    id: 8,
    title: "Sustainable Technology: Building a Greener Digital Future",
    description: "Explore how technology companies can reduce environmental impact while driving innovation and business growth.",
    date: "January 21, 2026",
    time: "10:00 AM - 3:00 PM CET",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Hybrid - Amsterdam & Online",
    tags: ["Sustainability", "Technology", "Innovation"],
    featured: false,
    price: 0,
    attendees: 178,
    speakers: [mockSpeakers[1], mockSpeakers[4]],
    learningPoints: [
      "Measuring and reducing technology carbon footprints",
      "Sustainable software development practices",
      "Green cloud computing strategies",
      "Circular economy approaches for hardware",
      "Using technology to advance environmental sustainability"
    ]
  },
  {
    id: 9,
    title: "Product Management Excellence: From Idea to Market Success",
    description: "Learn proven methodologies for product discovery, development, and go-to-market strategies that drive user adoption and business outcomes.",
    date: "February 17, 2026",
    time: "9:00 AM - 4:00 PM EST",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Product Management", "Business", "Strategy"],
    featured: false,
    price: 199,
    attendees: 156,
    speakers: [mockSpeakers[4], mockSpeakers[1]],
    learningPoints: [
      "Customer-centered product discovery techniques",
      "Prioritization frameworks for feature development",
      "Cross-functional collaboration in product development",
      "Product metrics and success measurement",
      "Building and communicating product roadmaps"
    ]
  },
  {
    id: 10,
    title: "The Metaverse: Business Opportunities in Virtual Worlds",
    description: "Understand the emerging metaverse landscape and explore how organizations can leverage virtual worlds for brand engagement, commerce, and innovation.",
    date: "March 25, 2026",
    time: "11:00 AM - 3:00 PM PST",
    image: "https://images.unsplash.com/photo-1614729375278-6fbcd392b18d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    location: "Online",
    tags: ["Metaverse", "Technology", "Innovation"],
    featured: false,
    price: 129,
    attendees: 203,
    speakers: [mockSpeakers[5], mockSpeakers[0]],
    learningPoints: [
      "Understanding metaverse concepts and technologies",
      "Virtual real estate and digital asset strategies",
      "Creating immersive brand experiences",
      "Monetization models in virtual worlds",
      "Privacy, security, and ethical considerations"
    ]
  }
];
