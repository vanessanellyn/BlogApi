import { IsNumber, IsString, IsPositive, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { ReportType } from "src/data";

// use DTOs whenever your endpoint receives data from outside
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;
}

// Manipulate outgoing responses
// Control what the method is going to return
export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  created_at: Date;

  @Exclude()
  updated_at:Date;
  type: ReportType;

  //Enables us to pass any object that resembles the one we have above (partial is ok)
  constructor(partial: Partial<ReportResponseDto>){
    Object.assign(this, partial)
  }
}