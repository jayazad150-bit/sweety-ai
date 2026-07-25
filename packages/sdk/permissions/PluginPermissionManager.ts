export class PluginPermissionManager {
  private granted = new Set<string>();

  grant(permission: string) {
    this.granted.add(permission);
  }

  revoke(permission: string) {
    this.granted.delete(permission);
  }

  has(permission: string) {
    return this.granted.has(permission);
  }
}