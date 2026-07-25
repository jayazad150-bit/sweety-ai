export interface UserProfile {
  name?: string;
  language?: string;
  preferences: Record<string, string>;
}

export class ProfileMemory {
  private profile: UserProfile = {
    preferences: {},
  };

  get() {
    return this.profile;
  }

  update(data: Partial<UserProfile>) {
    this.profile = {
      ...this.profile,
      ...data,
    };
  }
}