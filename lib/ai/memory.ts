export interface UserMemory {
  name?: string;
  preferredLanguage?: string;
  favoriteProgrammingLanguage?: string;
  currentProject?: string;
  interests: string[];
  notes: string[];
}

let memory: UserMemory = {
  interests: [],
  notes: [],
};

export function getMemory(): UserMemory {
  return memory;
}

export function updateMemory(
  updates: Partial<UserMemory>
): UserMemory {
  memory = {
    ...memory,
    ...updates,
  };

  return memory;
}

export function addInterest(
  interest: string
) {
  if (!memory.interests.includes(interest)) {
    memory.interests.push(interest);
  }
}

export function addNote(
  note: string
) {
  memory.notes.push(note);
}

export function clearMemory() {
  memory = {
    interests: [],
    notes: [],
  };
}