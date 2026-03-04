import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractArray(content, key) {
  const pattern = new RegExp(`${key}:\\s*\\[`);
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
  // Evaluate the JavaScript array
  // Note: This uses eval, but the input is trusted (our own config file)
  // Wrap in a function to avoid global scope issues
  const fn = new Function(`return ${jsArrayText};`);
  return fn();
}

async function main() {
  const configPath = '/home/hamb/devel/portfolio/src/config.ts';
  const content = fs.readFileSync(configPath, 'utf8');
  
  // Extract achievements
  const achievementsText = extractArray(content, 'achievements');
  if (!achievementsText) {
    console.error('Could not extract achievements array');
    return;
  }
  console.log('Achievements text length:', achievementsText.length);
  
  try {
    const achievements = parseJsArray(achievementsText);
    console.log(`Parsed ${achievements.length} achievements`);
    
    // Migrate achievements
    const outputDir = path.join(__dirname, 'src/content/achievements');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    
    // Clear existing files
    fs.readdirSync(outputDir).forEach(file => {
      if (file.endsWith('.json')) fs.unlinkSync(path.join(outputDir, file));
    });
    
    achievements.forEach((ach, idx) => {
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
      console.log(`Created ${filename}`);
    });
    
    console.log('Achievements migration complete');
  } catch (error) {
    console.error('Error parsing achievements:', error.message);
    console.error(error.stack);
  }
}

main().catch(console.error);