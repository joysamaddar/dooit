import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Project } from './entities/project.entity';
import { ProjectResolver } from './projects.resolver';
import { ProjectService } from './projects.service';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UsersModule],
  providers: [ProjectService, ProjectResolver, TaskService],
})
export class ProjectsModule {}
