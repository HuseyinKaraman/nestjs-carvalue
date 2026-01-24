import { 
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude
} from "class-validator";


export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(new Date().getFullYear())
  @IsNumber()
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(1)
  @Max(100000000)
  price: number;
}