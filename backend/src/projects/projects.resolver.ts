import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { ProjectService } from './projects.service';
import { UpdateProjectInput } from './dto/update-project.input';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskService } from './tasks.service';
import { TaskInput } from './dto/task.input';
import { Project } from './models/project.entity';
import { Task } from './models/task.entity';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => Project)
  getProject(@Args('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Query(() => [Project])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Mutation(() => Project)
  createProject(
    @Args('CreateProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.createProject(createProjectInput);
  }

  @Mutation(() => Project)
  deleteProject(@Args('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('UpdateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(updateProjectInput);
  }

  @Query(() => Task)
  getTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.getTask(taskInput);
  }

  @Mutation(() => Project)
  createTask(@Args('CreateTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => Project)
  deleteTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.deleteTask(taskInput);
  }

  @Mutation(() => Project)
  updateTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.updateTask(taskInput);
  }
}
