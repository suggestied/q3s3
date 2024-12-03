// Efficiency calculation based on peaks in timeline
export function calculateEfficiency(timelineData: { status: string; efficiency: number }[]) {
  const peaks = timelineData.reduce((acc, slot, index, array) => {
    if (index === 0 || index === array.length - 1) return acc;
    
    const prev = array[index - 1].efficiency;
    const current = slot.efficiency;
    const next = array[index + 1].efficiency;
    
    // Detect peak: current value higher than neighbors
    if (current > prev && current > next && current > 80) {
      acc += 1;
    }
    
    return acc;
  }, 0);

  // Base efficiency 70% + 1% per peak, max 100%
  return Math.min(70 + peaks, 100);
}

// Health calculation based on cycles and max cycles
export function calculateHealth(cycles: number, maxCycles: number) {
  // Non-linear health degradation
  const ratio = 1 - (cycles / maxCycles);
  const health = Math.round(100 * Math.pow(ratio, 1.5)); // Faster degradation towards end of life
  
  return Math.max(0, Math.min(100, health));
}

// Status determination based on health
export function determineStatus(health: number) {
  if (health > 80) return 'Beschikbaar';
  if (health > 50) return 'In Gebruik';
  if (health > 20) return 'Onderhoud Nodig';
  return 'In Onderhoud';
}