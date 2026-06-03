<script lang="ts">
  export let level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
  export let animate = true;

  const levelMap = {
    Beginner: 33,
    Intermediate: 66,
    Advanced: 100,
  } as const;

  $: progress = levelMap[level];
</script>

<div class="skill-progress">
  <div class="skill-level-info">
    <span class="level-text">{level}</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill {animate ? 'animated' : ''}" style="width: {progress}%"></div>
  </div>
</div>

<style>
  .skill-progress {
    width: 100%;
  }

  .skill-level-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .level-text {
    color: var(--color-text);
    font-weight: 500;
  }

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .progress-fill.animated {
    transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
</style>
