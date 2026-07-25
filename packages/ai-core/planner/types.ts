export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Plan {
  tasks: Task[];
}
