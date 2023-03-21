import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { ProjectService } from './projects.service';
import { UpdateProjectInput } from './dto/update-project.input';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskService } from './tasks.service';
import { TaskInput } from './dto/task.input';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => Project)
  @UseGuards(JwtAuthGuard)
  getProject(@Args('id') id: string, @CurrentUser() user: User) {
    return this.projectService.getProject(id, user);
  }

  @Query(() => [Project])
  @UseGuards(JwtAuthGuard)
  getProjects(@CurrentUser() user: User) {
    return this.projectService.getProjects(user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  createProject(
    @Args('CreateProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectService.createProject(createProjectInput, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  deleteProject(@Args('id') id: string, @CurrentUser() user: User) {
    return this.projectService.deleteProject(id, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  updateProject(
    @Args('UpdateProjectInput') updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectService.updateProject(updateProjectInput, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  addUserToProject(
    @Args('projectId') projectId: string,
    @Args('username') username: string,
    @CurrentUser() user: User,
  ) {
    return this.projectService.addUserToProject(projectId, username, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  removeUserFromProject(
    @Args('projectId') projectId: string,
    @Args('username') username: string,
    @CurrentUser() user: User,
  ) {
    return this.projectService.removeUserFromProject(projectId, username, user);
  }

  @Query(() => Task)
  @UseGuards(JwtAuthGuard)
  getTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.getTask(taskInput);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  createTask(@Args('CreateTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  deleteTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.deleteTask(taskInput);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  updateTask(@Args('TaskInput') taskInput: TaskInput) {
    return this.taskService.updateTask(taskInput);
  }
}
