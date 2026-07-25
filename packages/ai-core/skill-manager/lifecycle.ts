export class SkillLifecycle {
  start(name: string) {
    return `${name} started`;
  }

  stop(name: string) {
    return `${name} stopped`;
  }

  restart(name: string) {
    return `${name} restarted`;
  }
}