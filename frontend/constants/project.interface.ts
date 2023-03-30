import Task from "./task.interface";

export default interface Project {
  _id: string,
  name: string,
  description: string,
  tags: string[],
  manager: string,
  users: string[],
  tasks: Task[]
  }