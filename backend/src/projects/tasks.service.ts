import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { Project } from './entities/project.entity';
import { ObjectId } from 'mongodb';
import { Task } from './entities/task.entity';
import { TaskInput } from './dto/task.input';

export class TaskService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  async getTask(taskInput: TaskInput): Promise<Task | NotFoundException> {
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
  ): Promise<Project | NotFoundException> {
    const { projectId, name, type } = createTaskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks.push(new Task(project.tasks.length + 1, name, type));
    return await this.projectRepository.save(project);
  }

  async deleteTask(taskInput: TaskInput): Promise<Project | NotFoundException> {
    const { projectId, id } = taskInput;
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks = project.tasks.filter((data) => data.id != id);
    if (project.tasks.length === 0) {
      await this.projectRepository.delete(ObjectId(project._id));
      project.tasks = [];
    }
    return await this.projectRepository.save(project);
  }

  async updateTask(taskInput: TaskInput): Promise<Project | NotFoundException> {
    const { projectId, id } = taskInput;
    delete taskInput['projectId'];
    delete taskInput['id'];
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (!project) {
      return new NotFoundException();
    }
    project.tasks = project.tasks.map((task) => {
      if (task.id == id) {
        task = { ...task, ...taskInput };
      }
      return task;
    });
    return await this.projectRepository.save(project);
  }
}
