import { Body, Controller, Post } from '@nestjs/common';
import { GeoDistanceService } from './geo-distance.service';
import { ICoordinates } from './interface/coordinates.interface';

@Controller('geo-distance')
export class GeoDistanceController {
  constructor(private readonly geoService: GeoDistanceService) {}

  @Post('calculate')
  distance(@Body() coordinates: ICoordinates): string {
    return this.geoService.distanceBetweenCoordinates(coordinates);
  }
}
