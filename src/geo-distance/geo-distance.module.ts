import { Module } from '@nestjs/common';
import { GeoDistanceController } from './geo-distance.controller';
import { GeoDistanceService } from './geo-distance.service';

@Module({
  controllers: [GeoDistanceController],
  providers: [GeoDistanceService]
})
export class GeoDistanceModule {}
