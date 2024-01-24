import { File } from '@/app/file/entities/file.entity';
import { FileController } from '@/app/file/file.controller';
import { FileService } from '@/app/file/file.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
