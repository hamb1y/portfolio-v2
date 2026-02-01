export const siteData = {
  name: 'Your Name',
  tagline: 'Developer & Creative Thinker',
  bio: 'Passionate about building elegant solutions to complex problems. I enjoy working at the intersection of technology, design, and user experience.',
  
  socials: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'Email', url: 'mailto:hello@example.com', icon: 'mail' },
  ],
  
  skills: {
    categories: [
      {
        name: 'Frontend',
        skills: ['React', 'TypeScript', 'Svelte', 'Astro', 'Tailwind CSS', 'Next.js']
      },
      {
        name: 'Backend', 
        skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
      },
      {
        name: 'Tools & DevOps',
        skills: ['Docker', 'Git', 'AWS', 'CI/CD', 'Linux', 'Nginx']
      },
      {
        name: 'Design',
        skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'Adobe Suite']
      }
    ]
  },
  
  projects: [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with drag-and-drop interface',
      tags: ['Svelte', 'Socket.io', 'MongoDB', 'Redis'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather visualization with historical data and forecasts',
      tags: ['TypeScript', 'Chart.js', 'OpenWeather API', 'PWA'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      title: 'Personal Blog CMS',
      description: 'Custom content management system for personal blogging',
      tags: ['Astro', 'Markdown', 'Cloudinary', 'Netlify'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    }
  ],
  
  hobbies: [
    { name: 'Photography', icon: 'camera', description: 'Capturing moments and landscapes' },
    { name: 'Music Production', icon: 'music', description: 'Creating electronic music' },
    { name: 'Hiking', icon: 'mountain', description: 'Exploring nature trails' },
    { name: 'Reading', icon: 'book', description: 'Sci-fi and tech books' },
    { name: 'Gaming', icon: 'gamepad', description: 'Strategy and RPG games' },
    { name: 'Cooking', icon: 'utensils', description: 'Experimenting with recipes' }
  ],
  
  blog: {
    url: '../blog',
    recentPosts: [
      { title: 'Getting Started with Astro', date: '2024-03-15', readTime: '5 min' },
      { title: 'The Future of Web Development', date: '2024-03-10', readTime: '8 min' },
      { title: 'Building a Design System', date: '2024-03-05', readTime: '6 min' }
    ]
  }
};