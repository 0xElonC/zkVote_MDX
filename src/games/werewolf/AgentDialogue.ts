import type { TFunction } from 'i18next';

type Role = 'villager' | 'werewolf' | 'seer' | 'witch';

interface AgentContext {
  day: number;
  myRole: Role;
  isDead: boolean;
  knownRoles: Record<number, Role>;
  recentDeath?: string;
}

const KEYS = {
  intro: [
    'werewolf.dialogue.intro.villager1',
    'werewolf.dialogue.intro.villager2',
    'werewolf.dialogue.intro.villager3',
    'werewolf.dialogue.intro.villager4',
  ],
  accuse: [
    'werewolf.dialogue.accuse.suspicious',
    'werewolf.dialogue.accuse.quiet',
    'werewolf.dialogue.accuse.gut',
    'werewolf.dialogue.accuse.stare',
  ],
  defend: [
    'werewolf.dialogue.defend.innocent',
    'werewolf.dialogue.defend.sleeping',
    'werewolf.dialogue.defend.suspectOther',
    'werewolf.dialogue.defend.believeMe',
  ],
  seerClaim: [
    'werewolf.dialogue.seer.claim',
    'werewolf.dialogue.seer.vision',
  ],
  wolfLie: [
    'werewolf.dialogue.wolf.lieMove',
    'werewolf.dialogue.wolf.lieSeer',
    'werewolf.dialogue.wolf.vote',
  ]
};

export const generateAgentDialogue = (
  agentName: string, 
  context: AgentContext, 
  players: { id: number; name: string; isDead: boolean }[],
  t: TFunction
): string => {
  if (context.isDead) return "...";

  const livingPlayers = players.filter(p => !p.isDead && p.name !== agentName);
  const randomTarget = livingPlayers.length > 0 
    ? livingPlayers[Math.floor(Math.random() * livingPlayers.length)].name 
    : "someone";

  // 1. Day 1 Intro
  if (context.day === 1) {
    const key = KEYS.intro[Math.floor(Math.random() * KEYS.intro.length)];
    return t(key);
  }

  // 2. Werewolf Logic
  if (context.myRole === 'werewolf') {
    // 30% chance to lie about being Seer or accuse strongly
    if (Math.random() < 0.3) {
      const key = KEYS.wolfLie[Math.floor(Math.random() * KEYS.wolfLie.length)];
      return t(key, { target: randomTarget });
    }
    // Otherwise act like villager
    const key = KEYS.accuse[Math.floor(Math.random() * KEYS.accuse.length)];
    return t(key, { target: randomTarget });
  }

  // 3. Seer Logic
  if (context.myRole === 'seer') {
    // If knows something, maybe reveal it (50% chance)
    const knownIds = Object.keys(context.knownRoles);
    if (knownIds.length > 0 && Math.random() < 0.5) {
      const targetId = parseInt(knownIds[Math.floor(Math.random() * knownIds.length)]);
      const targetName = players.find(p => p.id === targetId)?.name || "Unknown";
      const role = context.knownRoles[targetId];
      const result = role === 'werewolf' ? t('werewolf.roles.werewolf') : t('werewolf.roles.villager');
      
      const key = KEYS.seerClaim[Math.floor(Math.random() * KEYS.seerClaim.length)];
      return t(key, { target: targetName, result });
    }
  }

  // 4. Witch Logic (New)
  if (context.myRole === 'witch') {
    // Witch usually hides as a villager
    // But if they saved someone, they might hint at it? No, keep it secret.
    // Just act like a villager.
  }

  // 5. Villager Logic (Default for Villager & Witch & hiding roles)
  const type = Math.random();
  if (type < 0.3) {
    const key = KEYS.intro[Math.floor(Math.random() * KEYS.intro.length)];
    return t(key);
  } else if (type < 0.7) {
    const key = KEYS.accuse[Math.floor(Math.random() * KEYS.accuse.length)];
    return t(key, { target: randomTarget });
  } else {
    const key = KEYS.defend[Math.floor(Math.random() * KEYS.defend.length)];
    return t(key, { target: randomTarget });
  }
};
