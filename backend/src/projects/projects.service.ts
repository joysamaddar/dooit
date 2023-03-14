import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './project.entity';
import { ProjectType } from './project.type';
import { ObjectId } from 'mongodb';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProject(id: string): Promise<ProjectType | NotFoundException> {
    const project = await this.projectRepository.findOne({
      where: { _id: ObjectId(id) },
    });
    if (project) {
      return project;
    }
    return new NotFoundException();
  }

  async getProjects(): Promise<ProjectType[]> {
    return await this.projectRepository.find({});
  }

  async createProject(
    createProjectInput: CreateProjectInput,
  ): Promise<ProjectType> {
    const { name, description, tags } = createProjectInput;
    const project = this.projectRepository.create({
      name,
      description,
      tags,
    });
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: string): Promise<ProjectType | NotFoundException> {
    const project = await this.projectRepository.findOne({
      where: { _id: ObjectId(id) },
    });
    const result = await this.projectRepository.delete({ _id: ObjectId(id) });
    if (result.affected > 0) {
      return project;
    }
    return new NotFoundException();
  }

  async updateProject(
    updateProjectInput: UpdateProjectInput,
  ): Promise<ProjectType | NotFoundException> {
    const { id, name, description, tags } = updateProjectInput;
    const project = await this.projectRepository.findOne({
      where: { _id: ObjectId(id) },
    });
    if (!project) {
      return new NotFoundException();
    }
    if (name) {
      project.name = name;
    }
    if (description) {
      project.description = description;
    }
    if (tags) {
      project.tags = tags;
    }
    return await this.projectRepository.save(project);
  }
}
