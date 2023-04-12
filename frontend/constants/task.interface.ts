import { StatusEnum } from "./status.enum";

export default interface Task {
  id: string,
  name: string,
  type: string,
  status: StatusEnum,
  }