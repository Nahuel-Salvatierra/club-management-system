import { Module } from '@nestjs/common';
import { MapperService } from './application/mapper/mapper.service';
import { LoaderService } from './application/loader/loader.service';

@Module({
  providers: [MapperService, LoaderService],
  exports: [MapperService, LoaderService],
})
export class CommonModule {}
