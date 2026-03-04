import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrateProjects() {
  const oldProjectsDir = '/home/hamb/devel/portfolio/src/pages/projects';
  const newProjectsDir = path.join(__dirname, 'src/content/projectContent');
  
  if (!fs.existsSync(newProjectsDir)) {
    fs.mkdirSync(newProjectsDir, { recursive: true });
  }
  
  // Clear existing files
  fs.readdirSync(newProjectsDir).forEach(file => {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(newProjectsDir, file));
    }
  });
  
  const files = fs.readdirSync(oldProjectsDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} project markdown files`);
  
  for (const file of files) {
    const filePath = path.join(oldProjectsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);
    
    // Extract slug from filename
    const slug = path.basename(file, '.md');
    
    // Prepare frontmatter for new schema
    const newFrontmatter = {
      title: data.title || '',
      description: data.description || '',
      technologies: data.technologies || [],
      link: data.link || '',
    };
    
    // Write new markdown file
    const newContent = matter.stringify(body.trim(), newFrontmatter);
    const newFilePath = path.join(newProjectsDir, `${slug}.md`);
    fs.writeFileSync(newFilePath, newContent);
    console.log(`Migrated project: ${slug}`);
  }
  
  console.log('Project markdown migration complete!');
}

async function migrateSkills() {
  const oldSkillsDir = '/home/hamb/devel/portfolio/src/pages/skills';
  const newSkillsDir = path.join(__dirname, 'src/content/skills');
  
  const files = fs.readdirSync(oldSkillsDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} skill markdown files`);
  
  for (const file of files) {
    const filePath = path.join(oldSkillsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    const skillName = data.name || path.basename(file, '.md').replace(/-/g, ' ');
    const level = data.level || 'Intermediate';
    
    // Map level to enum values
    const levelMap = {
      'Beginner': 'Beginner',
      'Intermediate': 'Intermediate', 
      'Advanced': 'Advanced',
      'A lot': 'Advanced',
      'Expert': 'Advanced',
      'Pro': 'Advanced',
    };
    
    const mappedLevel = levelMap[level] || 'Intermediate';
    
    // Emoji mapping
    const emojiMap = {
      'astro-js': '🚀',
      'c-plus-plus': '🐉',
      'git-github': '📦',
      'go': '🐹',
      'javascript': '🟨',
      'linux': '🐧',
      'minecraft': '🎮',
      'netlify': '☁️',
      'python': '🐍',
      'server-administration': '🖥️',
      'typescript': '🔷',
      'vercel': '▲',
    };
    
    const slug = path.basename(file, '.md');
    const emoji = emojiMap[slug] || '💻';
    
    // Better description based on skill name
    const descriptionMap = {
      'astro-js': 'Static site generation with component islands architecture',
      'c-plus-plus': 'Systems programming and performance-critical applications',
      'git-github': 'Version control and collaborative development workflows',
      'go': 'Concurrent programming and backend services',
      'javascript': 'Web development and interactive user interfaces',
      'linux': 'System administration and command-line proficiency',
      'minecraft': 'Game mechanics, redstone circuits, and server management',
      'netlify': 'Static site hosting and serverless functions deployment',
      'python': 'Scripting, data analysis, and backend development',
      'server-administration': 'Infrastructure management and deployment automation',
      'typescript': 'Type-safe JavaScript development',
      'vercel': 'Frontend deployment and serverless platform',
    };
    
    const description = descriptionMap[slug] || `Proficiency in ${skillName}`;
    
    const skillData = {
      emoji,
      name: skillName,
      description,
      level: mappedLevel,
    };
    
    const jsonFilePath = path.join(newSkillsDir, `${slug.replace(/-/g, '_')}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(skillData, null, 2));
    console.log(`Updated skill: ${skillName} (${mappedLevel})`);
  }
  
  console.log('Skills migration complete!');
}

async function migrateHobbies() {
  const oldHobbiesDir = '/home/hamb/devel/portfolio/src/pages/hobbies';
  const newHobbiesDir = path.join(__dirname, 'src/content/hobbies');
  
  const files = fs.readdirSync(oldHobbiesDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} hobby markdown files`);
  
  for (const file of files) {
    const filePath = path.join(oldHobbiesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    const title = data.title || path.basename(file, '.md').replace(/-/g, ' ');
    
    // Extract emoji if present in title (e.g., "🤖 Artificial Intelligence")
    const emojiMatch = title.match(/^(\p{Emoji})\s*(.+)$/u);
    let emoji = '🎨';
    let name = title;
    
    if (emojiMatch) {
      emoji = emojiMatch[1];
      name = emojiMatch[2].trim();
    }
    
    // Better descriptions based on hobby
    const descriptionMap = {
      'artificial-intelligence': 'Exploring machine learning models, prompt engineering, and AI applications',
      'computer-science': 'Studying algorithms, data structures, and computational theory',
      'gaming': 'Playing and analyzing video games, understanding game design principles',
      'programming': 'Building personal projects and experimenting with new technologies',
      'reading': 'Consuming technical documentation, science fiction, and non-fiction',
      'repurposing-old-technology': 'Breathing new life into outdated hardware and software',
    };
    
    const slug = path.basename(file, '.md');
    const description = descriptionMap[slug] || `Interest in ${name}`;
    
    const hobbyData = {
      emoji,
      name,
      description,
    };
    
    const jsonFilePath = path.join(newHobbiesDir, `${slug.replace(/-/g, '_')}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(hobbyData, null, 2));
    console.log(`Updated hobby: ${name} ${emoji}`);
  }
  
  console.log('Hobbies migration complete!');
}

async function updateProjectMetadata() {
  const projectsDir = path.join(__dirname, 'src/content/projects');
  const configPath = '/home/hamb/devel/portfolio/src/config.ts';
  
  // Read old config to get project metadata
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Extract projects array using regex (simplified)
  const projectsMatch = configContent.match(/projects:\s*\[(.*?)\]\s*,\s*achievements:/s);
  if (!projectsMatch) {
    console.error('Could not extract projects from config');
    return;
  }
  
  // Parse the projects array (simplified - using eval in safe context)
  const projectsText = `[${projectsMatch[1]}]`;
  const projects = eval(`(${projectsText})`);
  
  console.log(`Found ${projects.length} projects in config`);
  
  // Update each project JSON file
  for (const project of projects) {
    const slug = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const jsonPath = path.join(projectsDir, `${slug}.json`);
    
    if (!fs.existsSync(jsonPath)) {
      console.warn(`Project JSON not found: ${slug}.json`);
      continue;
    }
    
    const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Update with correct links
    const updatedData = {
      ...existingData,
      // Use external link if available, otherwise link to project detail page
      link: project.link?.startsWith('http') ? project.link : undefined,
      live: project.link?.startsWith('http') ? project.link : undefined,
      github: undefined, // We don't have GitHub links in old config
      featured: project.featured || false,
    };
    
    fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2));
    console.log(`Updated project metadata: ${project.title}`);
  }
  
  console.log('Project metadata update complete!');
}

async function main() {
  console.log('Starting comprehensive migration...');
  
  await migrateProjects();
  await migrateSkills();
  await migrateHobbies();
  await updateProjectMetadata();
  
  console.log('All migrations complete!');
}

main().catch(console.error);