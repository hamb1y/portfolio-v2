import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractArray(content, key) {
  const start = content.indexOf(key + ': [');
  if (start === -1) return null;
  let bracketStart = content.indexOf('[', start);
  let depth = 1;
  let i = bracketStart + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') depth--;
    i++;
  }
  return content.substring(bracketStart, i);
}

function parseJsArray(jsArrayText) {
  const fn = new Function(`return ${jsArrayText};`);
  return fn();
}

// Migrate achievements
function migrateAchievements(content) {
  const achievementsText = extractArray(content, 'achievements');
  if (!achievementsText) {
    console.error('Could not extract achievements array');
    return;
  }
  const achievements = parseJsArray(achievementsText);
  console.log(`Parsed ${achievements.length} achievements`);
  
  const outputDir = path.join(__dirname, 'src/content/achievements');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  // Clear existing files
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
  });
  
  achievements.forEach((ach) => {
    const newAch = {
      type: ach['achievement-type'],
      title: ach.title,
      description: ach.description,
      image: ach.image,
      priority: ach.featured ? 1 : 0,
    };
    const id = ach['achievement-id'].toLowerCase().replace(/-/g, '_');
    const filename = `${id}.json`;
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(newAch, null, 2));
    console.log(`Created achievement ${filename}`);
  });
}

// Migrate projects
function migrateProjects(content) {
  const projectsText = extractArray(content, 'projects');
  if (!projectsText) {
    console.error('Could not extract projects array');
    return;
  }
  const projects = parseJsArray(projectsText);
  console.log(`Parsed ${projects.length} projects`);
  
  const outputDir = path.join(__dirname, 'src/content/projects');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
  });
  
  projects.forEach((proj) => {
    const newProj = {
      title: proj.title,
      description: proj.description,
      tags: proj.technologies || [],
      link: proj.link || undefined,
      featured: proj.featured || false,
    };
    // Generate slug from id or title
    const slug = proj.id || proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filename = `${slug}.json`;
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(newProj, null, 2));
    console.log(`Created project ${filename}`);
  });
}

// Migrate skills from markdown files
function migrateSkills() {
  const skillsDir = '/home/hamb/devel/portfolio/src/pages/skills';
  const outputDir = path.join(__dirname, 'src/content/skills');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
  });
  
  const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} skill markdown files`);
  
  const emojiMap = {
    'javascript': '🟨',
    'typescript': '🔷',
    'python': '🐍',
    'go': '🐹',
    'c-plus-plus': '🐉',
    'git-github': '📦',
    'linux': '🐧',
    'astro-js': '🚀',
    'minecraft': '🎮',
    'netlify': '☁️',
  };
  
  files.forEach(file => {
    const filePath = path.join(skillsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const skillName = data.name || path.basename(file, '.md');
    const level = data.level || 'Intermediate';
    // Map level "A lot" to "Advanced"
    const mappedLevel = level === 'A lot' ? 'Advanced' : level;
    const emoji = emojiMap[path.basename(file, '.md')] || '💻';
    const newSkill = {
      emoji,
      name: skillName,
      description: `Proficiency in ${skillName}`,
      level: mappedLevel,
    };
    const slug = path.basename(file, '.md').toLowerCase().replace(/-/g, '_');
    const filename = `${slug}.json`;
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(newSkill, null, 2));
    console.log(`Created skill ${filename}`);
  });
}

// Migrate hobbies from markdown files
function migrateHobbies() {
  const hobbiesDir = '/home/hamb/devel/portfolio/src/pages/hobbies';
  const outputDir = path.join(__dirname, 'src/content/hobbies');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
  });
  
  const files = fs.readdirSync(hobbiesDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} hobby markdown files`);
  
  files.forEach(file => {
    const filePath = path.join(hobbiesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const title = data.title || path.basename(file, '.md').replace(/-/g, ' ');
    // Extract emoji if present in title
    const emojiMatch = title.match(/^\p{Emoji}/u);
    const emoji = emojiMatch ? emojiMatch[0] : '🎨';
    const name = title.replace(/^\p{Emoji}\s*/u, '').trim();
    const newHobby = {
      emoji,
      name,
      description: `Interest in ${name}`,
    };
    const slug = path.basename(file, '.md').toLowerCase().replace(/-/g, '_');
    const filename = `${slug}.json`;
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(newHobby, null, 2));
    console.log(`Created hobby ${filename}`);
  });
}

// Migrate site config and social links
function migrateSite(content) {
  // Extract profile info from config (profileInfo)
  // The config has profileInfo derived from infoCards
  // We'll extract the first info card with slug 'profile'
  // For simplicity, we'll use the config's name, title, description from config.profile
  // We need to parse the config object partially
  // Let's extract the config object using regex for const config = { ... };
  const configMatch = content.match(/export\s+const\s+config\s*=\s*(\{[\s\S]*?\})\s*as\s*const/);
  if (!configMatch) {
    console.error('Could not extract config object');
    return;
  }
  const configText = configMatch[1];
  // Evaluate config object
  const config = parseJsArray(`[${configText}]`)[0]; // wrap in array to parse as object
  if (!config) {
    console.error('Could not parse config object');
    return;
  }
  
  // Extract social links from config.socialLinks
  const socialLinks = config.socialLinks || [];
  const socials = socialLinks.map(link => ({
    name: link.platform,
    url: link.url,
    icon: link.platform.toLowerCase(),
  }));
  
  const siteConfig = {
    siteTitle: config.title || 'Portfolio',
    name: config.name || 'Your Name',
    siteDesc: config.description || 'Personal portfolio showcasing skills, projects, and interests',
    socials,
  };
  
  const outputDir = path.join(__dirname, 'src/content/site');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
  });
  
  const filename = 'config.json';
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(siteConfig, null, 2));
  console.log(`Created site config ${filename}`);
}

async function main() {
  const configPath = '/home/hamb/devel/portfolio/src/config.ts';
  const content = fs.readFileSync(configPath, 'utf8');
  
  console.log('Starting migration...');
  
  // migrateAchievements(content);
  migrateProjects(content);
  migrateSkills();
  migrateHobbies();
  migrateSite(content);
  
  console.log('Migration complete!');
}

main().catch(console.error);