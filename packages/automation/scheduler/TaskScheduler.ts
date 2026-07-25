export class TaskScheduler {

  schedule(callback: () => void, delay: number) {

    return setTimeout(callback, delay);

  }

  cancel(id: ReturnType<typeof setTimeout>) {

    clearTimeout(id);

  }

}