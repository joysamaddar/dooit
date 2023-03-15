import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { Project } from './models/project.entity';
import { ProjectType } from './types/project.type';
import { TaskType } from './types/task.type';
import { ObjectId } from 'mongodb';
import { Task } from './models/task.entity';
import { TaskInput } from './dto/task.input';

export class TaskService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  async getTask(taskInput: TaskInput): Promise<TaskType | NotFoundException> {
    const { projectId, id } = taskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    const task = project.tasks.filter((data) => data.id === id);
    if (task.length != 0) {
      return task[0];
    }
    return new NotFoundException();
  }

  async createTask(
    createTaskInput: CreateTaskInput,
  ): Promise<ProjectType | NotFoundException> {
    const { projectId, name, type } = createTaskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks.push(new Task(name, type));
    return await this.projectRepository.save(project);
  }

  async deleteTask(
    taskInput: TaskInput,
  ): Promise<ProjectType | NotFoundException> {
    const { projectId, id } = taskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks = project.tasks.filter((data) => data.id !== id);
    return await this.projectRepository.save(project);
  }

  async updateTask(
    taskInput: TaskInput,
  ): Promise<ProjectType | NotFoundException> {
    const { projectId, id, name, type, status } = taskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks = project.tasks.map((task) => {
      if (task.id === id) {
        if (name) {
          task.name = name;
        }
        if (type) {
          task.type = type;
        }
        if (status) {
          task.status = status;
        }
      }
      return task;
    });
    return await this.projectRepository.save(project);
  }
}
