import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { ProjectType } from './types/project.type';
import { ProjectService } from './projects.service';
import { UpdateProjectInput } from './dto/update-project.input';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskService } from './tasks.service';
import { TaskType } from './types/task.type';
import { TaskInput } from './dto/task.input';

@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

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

  @Query(() => TaskType)
  getTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.getTask(taskInput);
  }

  @Mutation(() => ProjectType)
  createTask(@Args('CreateTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => ProjectType)
  deleteTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.deleteTask(taskInput);
  }

  @Mutation(() => ProjectType)
  updateTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.updateTask(taskInput);
  }
}
