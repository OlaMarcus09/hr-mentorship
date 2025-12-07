import { Blog, Event, GalleryItem, Resource, BookOfTheMonth } from '@/types';

export const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Navigating HR in the Remote Era",
    content: "Remote work is no longer a perk; it is a necessity. In this article, we explore how HR leaders can adapt their policies to support a distributed workforce...",
    author: "Dr. Tunde Aregbesola",
    category: "Management",
    tags: ["Remote", "Culture", "Leadership"],
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-12",
  },
  {
    id: 2,
    title: "Conflict Resolution Strategies for 2025",
    content: "Workplace conflict is inevitable, but destruction is optional. Learn the EAR method (Empathy, Assertion, Respect) to de-escalate tension...",
    author: "Sarah Johnson",
    category: "Soft Skills",
    tags: ["HR", "Conflict", "Communication"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-10-15",
    updatedAt: "2024-10-15",
  },
  {
    id: 3,
    title: "The Future of Payroll in Nigeria",
    content: "With changing tax laws and digital wallets, the payroll landscape is shifting. Here is what every Nigerian HR manager needs to know...",
    author: "Olawale Marcus",
    category: "Compliance",
    tags: ["Finance", "Legal", "Nigeria"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-97322647856c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-10-20",
    updatedAt: "2024-10-20",
  },
  {
    id: 4,
    title: "Mental Health: Beyond the Buzzword",
    content: "Pizza parties don't cure burnout. We discuss actionable frameworks for psychological safety in high-pressure environments...",
    author: "Chidinma Okeke",
    category: "Wellness",
    tags: ["Mental Health", "Culture"],
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-10-25",
    updatedAt: "2024-10-25",
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "HR Mentorship Annual Summit 2025",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    date: "2025-05-20T09:00:00",
    location: "Eko Hotels & Suites, Lagos",
    summary: "The biggest gathering of HR professionals.",
    description: "Join us for a day of learning and networking..."
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Employee Onboarding Checklist",
    description: "A complete guide to welcoming new hires.",
    type: "DOCUMENT",
    fileUrl: "/files/onboarding-template.pdf"
  }
];

export const MOCK_BOOK: BookOfTheMonth = {
  id: 1,
  title: "Work Rules!",
  author: "Laszlo Bock",
  description: "Insights from Inside Google that will transform how you live and lead.",
  imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
  active: true
};

export const MOCK_TEAM = [
  {
    id: 1,
    name: "Olawale Marcus",
    role: "Founder & Lead",
    bio: "Visionary leader with 10+ years in HR technology.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Head of Learning",
    bio: "Curriculum designer and former CHRO.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  }
];

export const MOCK_EXPERTS = [
  {
    id: 1,
    name: "Dr. Tunde Aregbesola",
    role: "HR Director, FMCG",
    company: "Unilever Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Chidinma Okeke",
    role: "VP of People",
    company: "Paystack",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Kwame Mensah",
    role: "Talent Acquisition Lead",
    company: "Google Africa",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

export const MOCK_JOBS = [
  {
    id: 1,
    title: "Interim HR Manager",
    company: "TechGrowth Africa",
    type: "Contract",
    location: "Remote (Lagos)",
    salary: "₦400k - ₦600k / month",
    postedAt: "2 days ago",
    description: "We need an experienced HR generalist to set up our performance management system over the next 3 months."
  },
  {
    id: 2,
    title: "Technical Recruiter",
    company: "Fintech Co.",
    type: "Freelance",
    location: "Remote",
    salary: "₦150k / hire",
    postedAt: "5 hours ago",
    description: "Looking for a recruiter with a strong network in Python/Django developers."
  },
  {
    id: 3,
    title: "HR Business Partner",
    company: "Global Oil & Gas",
    type: "Full-time",
    location: "Hybrid (Abuja)",
    salary: "Competitive",
    postedAt: "1 week ago",
    description: "Strategic role partnering with our engineering leadership team."
  }
];
