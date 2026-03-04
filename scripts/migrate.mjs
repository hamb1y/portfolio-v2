import fs from 'fs';
import vm from 'vm';

// Read the config.ts file
const configContent = fs.readFileSync('/home/hamb/devel/portfolio/src/config.ts', 'utf8');

// Extract the config object: we need to get the whole config object.
// The file exports a config object at the end: export const config = { ... };
// We'll evaluate the file in a sandbox, ignoring import.meta.glob
// Since import.meta.glob is Vite-specific, we can replace it with empty objects.
let processed = configContent
  .replace(/import\.meta\.glob\s*<[^>]+>\s*\([^)]+\)/g, '{}')
  .replace(/import\.meta\.glob\([^)]+\)/g, '{}')
  .replace(/import[^;]+;/g, '')
  .replace(/export\s+const\s+config\s*=/m, 'const config =')
  .replace(/export[^;]+;/g, '');

// Add a wrapper to capture config
processed += '; config;';

try {
  const sandbox = { config: null };
  vm.createContext(sandbox);
  const script = new vm.Script(processed);
  const result = script.runInContext(sandbox);
  
  console.log('Config loaded');
  console.log('Achievements count:', result.achievements.length);
  
  // Migrate achievements
  const achievements = result.achievements.map(ach => ({
    type: ach['achievement-type'],
    title: ach.title,
    description: ach.description,
    image: ach.image,
    priority: ach.featured ? 1 : 0,
  }));
  
  const outputDir = '/home/hamb/devel/nportfolio/main/src/content/achievements';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  // Clear existing files
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.json')) fs.unlinkSync(`${outputDir}/${file}`);
  });
  
  achievements.forEach((ach, idx) => {
    const id = result.achievements[idx]['achievement-id'].toLowerCase().replace(/-/g, '_');
    const filename = `${id}.json`;
    fs.writeFileSync(`${outputDir}/${filename}`, JSON.stringify(ach, null, 2));
    console.log(`Created ${filename}`);
  });
  
  console.log('Achievements migration complete');
} catch (error) {
  console.error('Error:', error.message);
  console.error(error.stack);
}