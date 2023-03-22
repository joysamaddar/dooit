import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, MongoRepository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import { ObjectId } from 'mongodb';
import { UpdateProjectInput } from './dto/update-project.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
    private readonly userService: UsersService,
  ) {}

  async getProject(
    id: string,
    user: User,
  ): Promise<Project | NotFoundException> {
    const project = await this.projectRepository.findOne(ObjectId(id));
    if (project && project.users.includes(user.username)) {
      return project;
    }
    return new NotFoundException();
  }

  async getProjects(user: User): Promise<Project[]> {
    const projects = await this.projectRepository.find();
    return projects.filter((project) => {
      if (project.users.includes(user.username)) {
        return project;
      }
    });
  }

  async createProject(
    createProjectInput: CreateProjectInput,
    user: User,
  ): Promise<Project> {
    const { name, description, tags } = createProjectInput;
    const project = new Project();
    project.name = name;
    project.description = description;
    project.tags = tags;
    project.tasks = [];
    project.manager = user.username;
    project.users = [user.username];
    return await this.projectRepository.save(project);
  }

  async deleteProject(
    id: string,
    user: User,
  ): Promise<Project | NotFoundException> {
    const project = await this.projectRepository.findOne(ObjectId(id));
    if (project.manager !== user.username) {
      return new UnauthorizedException(
        'Only project managers can delete a project!',
      );
    }
    const result = await this.projectRepository.findOneAndDelete({
      _id: ObjectId(id),
    });
    if (result.value) {
      return result.value;
    }
    return new NotFoundException();
  }

  async updateProject(
    updateProjectInput: UpdateProjectInput,
    user: User,
  ): Promise<Project | NotFoundException> {
    const { id } = updateProjectInput;
    delete updateProjectInput['id'];
    let project = await this.projectRepository.findOne(ObjectId(id));
    if (!project) {
      return new NotFoundException();
    }
    if (project.manager !== user.username) {
      return new UnauthorizedException('You are not allowed to make changes.');
    }
    project = { ...project, ...updateProjectInput };
    return await this.projectRepository.save(project);
  }

  async addUserToProject(
    projectId: string,
    username: string,
    user: User,
  ): Promise<Project | UnauthorizedException> {
    const exists = await this.userService.user(username);
    if (!exists) {
      throw new NotFoundException("The user with this username wasn't found");
    }
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (project.manager !== user.username) {
      throw new UnauthorizedException(
        'Only project managers can add users to a project.',
      );
    }
    project.users.push(username);
    return await this.projectRepository.save(project);
  }

  async removeUserFromProject(
    projectId: string,
    username: string,
    user: User,
  ): Promise<Project | UnauthorizedException> {
    const project = await this.projectRepository.findOne(ObjectId(projectId));
    if (project.manager !== user.username) {
      throw new UnauthorizedException(
        'Only project managers can remove users from a project.',
      );
    }
    project.users = project.users.filter((data) => data !== username);
    return await this.projectRepository.save(project);
  }
}
