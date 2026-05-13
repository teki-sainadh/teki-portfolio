export interface Persona {
  id: string;
  name: string;
  label: string;
  avatar: string;
  backgroundGif: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
}

export interface TimelineItem {
  id: string;
  timeline_type: 'work' | 'education';
  name: string;
  title: string;
  tech_stack: string[];
  summary_points: string[];
  date_range: string;
  image?: string;
  live_url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  image: string;
  category: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface ProfileBanner {
  background_url: string;
  headline: string;
  resume_url: string;
  linkedin_url: string;
  profile_summary: string;
}
