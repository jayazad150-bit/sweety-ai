export class PermissionManager {

  private permissions = new Map<string, boolean>();

  allow(name: string) {

    this.permissions.set(name, true);

  }

  deny(name: string) {

    this.permissions.set(name, false);

  }

  has(name: string) {

    return this.permissions.get(name) ?? false;

  }

}