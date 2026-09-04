export type Achievement = {
  id: string;
  tag: string;
  tagEmoji: string;
  title: string;
  description: string;
  event: string;
  image: string;
};

export const achievements: Achievement[] = [
  {
    id: 'trf-apac-2026',
    tag: 'Silver Sponsor',
    tagEmoji: '🥈',
    title: 'Silver Sponsor at Temenos TRF APAC 2026',
    description:
      'We’re proud to be a Silver Sponsor at the Temenos Regional Forum (TRF) APAC 2026 — backing the community shaping the future of core banking.',
    event: 'Temenos · TRF APAC 2026',
    image: '/achievements/TRF_2026.jpg',
  },
  {
    id: 'shark-tank-temenos',
    tag: 'Winner',
    tagEmoji: '🏆',
    title: 'Winners of Shark Tank Temenos',
    description:
      'Our team took the top spot at Shark Tank Temenos during Temenos Tech Days — recognition for the ideas and engineering behind our POCs.',
    event: 'Temenos Tech Days',
    image: '/achievements/Temenos_Tech_Days.jpg',
  },
];
