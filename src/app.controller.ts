import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from "@nestjs/common"
import { ReportType, data } from 'src/data'
import { AppService } from "./app.service";

// Class that allows us to create different endpoints
@Controller('report/:type')
export class AppController {

  constructor(private appService: AppService){}

  @Get()
  getAllReports(@Param('type') type: string) {
    // console.log(type)
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getOneReport(
    @Param('type') type: string, 
    @Param('id') id: string
  ) {
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getOneReport(reportType, id);
  }

  @Post()
  //createReport(@Body() body: {amount:number, source: string}) {
  createReport(
    @Body() { amount, source }: { amount:number, source: string }, 
    @Param('type') type: string
  ) {
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string, 
    @Param('type') type: string,
    @Body() body: {amount:number, source: string}
  ) {
      const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
      return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id: string, 
  ) {
    return this.appService.deleteReport(id);
  }
}