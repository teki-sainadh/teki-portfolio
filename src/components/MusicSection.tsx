import { Persona, Skill, TimelineItem, Project, Award, ProfileBanner } from './types';
// Import images for consistent Vite processing
import avatar1 from './assets/images/regenerated_image_1778664555751.png';
import avatar2 from './assets/images/regenerated_image_1778664557308.png';
import avatar3 from './assets/images/regenerated_image_1778664558427.png';
import avatar4 from './assets/images/regenerated_image_1778664559860.png';
import timeline1 from './assets/images/regenerated_image_1778661883434.png';
import timeline2 from './assets/images/regenerated_image_1778661672931.png';

export const PERSONAS: Persona[] = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    label: 'Hiring Cloud Engineers',
    avatar: avatar1,
    backgroundGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqcnN6bXN4NncxeW54NncxeW54NncxeW54NncxeW54NncxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMGpxS7A9pG7oA/giphy.gif'
  },
  {
    id: 'engineer',
    name: 'Engineer',
    label: 'Checking My Stack',
    avatar: avatar2,
    backgroundGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqcnN6bXN4NncxeW54NncxeW54NncxeW54NncxeW54NncxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy.gif'
  },
  {
    id: 'researcher',
    name: 'Researcher',
    label: 'Cloud Solutions',
    avatar: avatar3,
    backgroundGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqcnN6bXN4NncxeW54NncxeW54NncxeW54NncxeW54NncxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif'
  },
  {
    id: 'guest',
    name: 'Guest',
    label: 'Quick View',
    avatar: avatar4,
    backgroundGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpiazM3Ym5ocjBzNXoycW9hNXoycW9hNXoycW9hNXoycW9hNXoydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l46C6z7vYdhZpkstO/giphy.gif'
  }
];

export const PROFILE_BANNER: ProfileBanner = {
  background_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop',
  headline: 'Teki Sainadh',
  resume_url: 'https://drive.google.com/file/d/1nexTMIXC5EEc8ACRe6wZlk1sU1ZZWjbU/view?usp=share_link',
  linkedin_url: 'https://www.linkedin.com/in/tekisainadh/',
  profile_summary: 'Aspiring Cloud Engineer specialized in building and deploying scalable web applications using AWS, Firebase, and Supabase. Passionate about efficient backend architectures and reliable cloud systems.'
};

export const SKILLS: Skill[] = [
  {
    id: '1',
    name: 'AWS (Amplify, EC2, S3)',
    category: 'Cloud DevOps',
    description: 'Hands-on experience in cloud infrastructure and deployment.',
    icon: 'Cloud'
  },
  {
    id: '2',
    name: 'Python & Java',
    category: 'Languages',
    description: 'Versatile backend development and automation scripts.',
    icon: 'Code'
  },
  {
    id: '3',
    name: 'Firebase & Supabase',
    category: 'Backend as Service',
    description: 'Rapid prototyping and scalable backend management.',
    icon: 'Server'
  },
  {
    id: '4',
    name: 'Linux (Ubuntu)',
    category: 'OS',
    description: 'Proficient in systems administration and terminal workflows.',
    icon: 'Terminal'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Teki Chat AI Chatbot',
    description: 'Fullstack AI chatbot using Groq API (LLaMA3.1 70B) with Reasoning, Coding, and image attachment modes.',
    tech_stack: ['Groq API', 'Firebase', 'GCP', 'React'],
    live_url: 'https://tekicodes.tech',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=280&fit=crop',
    category: 'Binge-Worthy Projects'
  },
  {
    id: '2',
    title: 'Freelance Finder System',
    description: 'Discovery web app with AI-based matching, scam filtering, and location-based filtering for 195 countries.',
    tech_stack: ['AWS Amplify', 'React', 'AI Filtering'],
    live_url: 'https://main.d2ksk3u0dcg7ts.amplifyapp.com',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop',
    category: 'Trending Now'
  },
  {
    id: '3',
    title: 'Doctor Patient Management',
    description: 'Secure appointment booking and payment system with dual dashboards for doctors and admins.',
    tech_stack: ['Node.js', 'MySQL', 'React', 'Payment Integrations'],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&h=280&fit=crop',
    category: 'New Releases'
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: '1',
    timeline_type: 'work',
    name: 'Datacom Cloud',
    title: 'Workshop Simulation',
    tech_stack: ['GitHub Actions', 'Cloud Arch', 'CI/CD'],
    image: timeline1,
    summary_points: [
      'Simulated cloud deployment for banking client.',
      'Designed and deployed application architecture.',
      'Implemented CI/CD using GitHub Actions.'
    ],
    live_url: 'https://www.theforage.com/completion-certificates/gCW7Xki5Y3vNpBmnn/qsuRRyXDZ7Dj2QFx4_gCW7Xki5Y3vNpBmnn_68de4b315a2137c9bf586772_1774415230310_completion_certificate.pdf',
    date_range: 'March 2026'
  },
  {
    id: '2',
    timeline_type: 'education',
    name: 'B V Raju Institute of Technology',
    title: 'B.Tech in Information Technology',
    tech_stack: ['CS Core', 'Cloud', 'Data Structures'],
    image: timeline2,
    summary_points: [
      'Focusing on Cloud Technologies and Backend Systems.',
      'Anticipated completion in April 2026.'
    ],
    date_range: '2022 - 2026'
  }
];

export const AWARDS: Award[] = [
  {
    id: '1',
    title: 'UIDAI Data Hackathon 2026',
    organization: 'UIDAI',
    date: '2026',
    description: 'Participant in the national data strategy hackathon.'
  },
  {
    id: '2',
    title: 'Google Foundations of Data',
    organization: 'Google',
    date: '2025',
    description: 'Professional certification in data foundations.'
  }
];

export const PLAYLIST = [
  {
    id: 'm1',
    title: 'Reminder',
    artist: 'The Weeknd',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b1/d1/d4/b1d1d4f6-8dce-17a8-3b7b-d5a6e24afae9/mzaf_7736283625894640697.plus.aac.p.m4a'
  }
];

export const CONTACT = {
  github: 'https://github.com/teki-sainadh',
  phone: '+91 9398163512',
  email: 'tekisainadh@gmail.com'
};
