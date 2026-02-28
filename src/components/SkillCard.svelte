<script lang="ts" context="module">
  export interface Skill {
    emoji: string;
    name: string;
    description: string;
    level: string;
  }
</script>

<script lang="ts">
  import SkillProgress from './SkillProgress.svelte';
  
  export let skill: Skill;
  export let animate = true;
  
  const getLevel = (level: string): 'Beginner' | 'Intermediate' | 'Advanced' => {
    const normalized = level.toLowerCase();
    if (normalized.includes('beginner') || normalized.includes('novice') || normalized.includes('learning')) {
      return 'Beginner';
    }
    if (normalized.includes('advanced') || normalized.includes('expert') || normalized.includes('pro') || normalized.includes('master') || normalized.includes('a lot')) {
      return 'Advanced';
    }
    return 'Intermediate';
  };
</script>

<div class="skill-card glass-card hover-scale transition-transform duration-300">
  <div class="skill-content p-6">
    <div class="flex items-start gap-4">
      <span class="text-3xl">{skill.emoji}</span>
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-1">{skill.name}</h3>
        <p class="text-text-muted text-sm mb-4">{skill.description}</p>
        <SkillProgress level={getLevel(skill.level)} animate={animate} />
      </div>
    </div>
  </div>
</div>

<style>
  .skill-card {
    border-radius: var(--radius-lg);
    transition: transform 0.3s ease;
  }
  
  .skill-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  :global(.glass-card) {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-lg);
    box-shadow: 
      0 8px 32px 0 rgba(0, 0, 0, 0.2),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  :global(.glass-card)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
  
  :global(.hover-scale):hover {
    transform: scale(1.02);
  }
  
  :global(.transition-transform) {
    transition-property: transform;
  }
  
  :global(.duration-300) {
    transition-duration: 300ms;
  }
  
  :global(.p-6) {
    padding: var(--spacing-xl);
  }
  
  :global(.flex) {
    display: flex;
  }
  
  :global(.items-start) {
    align-items: flex-start;
  }
  
  :global(.gap-4) {
    gap: var(--spacing-lg);
  }
  
  :global(.flex-1) {
    flex: 1 1 0%;
  }
  
  :global(.text-3xl) {
    font-size: var(--text-3xl);
  }
  
  :global(.text-xl) {
    font-size: var(--text-xl);
  }
  
  :global(.font-bold) {
    font-weight: 700;
  }
  
  :global(.mb-1) {
    margin-bottom: var(--spacing-xs);
  }
  
  :global(.mb-4) {
    margin-bottom: var(--spacing-lg);
  }
  
  :global(.text-sm) {
    font-size: var(--text-sm);
  }
  
  :global(.text-text-muted) {
    color: var(--color-text-muted);
  }
</style>