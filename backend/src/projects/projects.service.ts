import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './models/project.entity';
import { ObjectId } from 'mongodb';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  async getProject(id: string): Promise<Project | NotFoundException> {
    const project = await this.projectRepository.findOne(ObjectId(id));
    if (project) {
      return project;
    }
    return new NotFoundException();
  }

  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find({});
  }

  async createProject(
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    const { name, description, tags } = createProjectInput;
    const project = new Project();
    project.name = name;
    project.description = description;
    project.tags = tags;
    project.tasks = [];
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: string): Promise<Project | NotFoundException> {
    const project = await this.projectRepository.findOneAndDelete({
      _id: ObjectId(id),
    });
    if (project.value) {
      return project.value;
    }
    return new NotFoundException();
  }

  async updateProject(
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project | NotFoundException> {
    const { id } = updateProjectInput;
    delete updateProjectInput['id'];
    let project = await this.projectRepository.findOne(ObjectId(id));
    if (!project) {
      return new NotFoundException();
    }
    project = { ...project, ...updateProjectInput };
    return await this.projectRepository.save(project);
  }
}
