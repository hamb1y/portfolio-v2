<script lang="ts">
  // Rendered to static HTML at build time; it has no client-side behaviour, so it needs no hydration.
  interface Props {
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
  }

  let { level = 'Intermediate' }: Props = $props();

  const levelMap = {
    Beginner: 33,
    Intermediate: 66,
    Advanced: 100,
  } as const;

  const progress = $derived(levelMap[level]);
</script>

<div class="skill-progress">
  <div class="skill-level-info">
    <span class="level-text">{level}</span>
  </div>
  <div class="progress-bar" aria-hidden="true">
    <div class="progress-fill" style="width: {progress}%"></div>
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
  }

  /* Phones: label and bar on one line */
  @media (max-width: 639px) {
    .skill-progress {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .skill-level-info {
      flex: 0 0 6.5rem;
      margin-bottom: 0;
    }

    .progress-bar {
      flex: 1;
    }
  }
</style>
