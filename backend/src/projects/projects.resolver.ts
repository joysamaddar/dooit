import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { ProjectType } from './project.type';
import { ProjectsService } from './projects.service';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectsService) {}

  @Query(() => ProjectType)
  getProject(@Args('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Query(() => [ProjectType])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Mutation(() => ProjectType)
  createProject(
    @Args('CreateProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.createProject(createProjectInput);
  }

  @Mutation(() => ProjectType)
  deleteProject(@Args('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Mutation(() => ProjectType)
  updateProject(
    @Args('UpdateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(updateProjectInput);
  }
}
