import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common"
import { ReportType } from 'src/data'
import { AppService } from "./app.service";
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from "./dto/report.dto";

// Class that allows us to create different endpoints
@Controller('report/:type')
export class AppController {

  constructor(private appService: AppService){}

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
    // console.log(type)
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getOneReport(reportType, id);
  }

  @Post()
  createReport(
  //@Body() body: {amount:number, source: string}) {
  //@Body() { amount, source }: { amount:number, source: string }, 
    @Body() { amount, source }: CreateReportDto, 
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string, 
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: UpdateReportDto
  ): ReportResponseDto {
      const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
      return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string, 
  ) {
    return this.appService.deleteReport(id);
  }
}