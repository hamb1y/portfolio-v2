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

<div class="transition-transform duration-300 skill-card glass-card hover-scale">
  <div class="p-6 skill-content">
    <div class="flex items-start gap-4">
      <span class="text-3xl">{skill.emoji}</span>
      <div class="flex-1">
        <h3 class="mb-1 font-bold text-xl">{skill.name}</h3>
        <p class="mb-4 text-text-muted text-sm">{skill.description}</p>
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
    border-bottom: 0.07vh rgb(56, 56, 56) solid;
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