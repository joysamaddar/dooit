import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './models/project.entity';
import { ProjectResolver } from './projects.resolver';
import { ProjectService } from './projects.service';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService, ProjectResolver, TaskService],
})
export class ProjectsModule {}
