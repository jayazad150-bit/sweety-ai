import {
  readDatabase,
  writeDatabase,
} from "../database/storage";

export interface UserProfile {
  name: string;
  preferredLanguage: string;
  currentProject: string;
  favoriteProgrammingLanguage: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  preferredLanguage: "English",
  currentProject: "",
  favoriteProgrammingLanguage: "",
};

export function getProfile(): UserProfile {
  return readDatabase<UserProfile>(DEFAULT_PROFILE);
}

export function saveProfile(
  profile: UserProfile
) {
  writeDatabase(profile);
}

export function updateProfile(
  updates: Partial<UserProfile>
) {
  const profile = getProfile();

  const updatedProfile = {
    ...profile,
    ...updates,
  };

  saveProfile(updatedProfile);

  return updatedProfile;
}