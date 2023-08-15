import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common"
import { v4 as uuid } from "uuid";
import { ReportType, data } from 'src/data'

// Class that allows us to create different endpoints
@Controller('report/:type')
export class AppController {

  @Get()
  getAllReports(@Param('type') type: string) {
    // console.log(type)
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter(report => report.type === reportType)
  }

  @Get(':id')
  getOneReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType = (type === "income") ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id)
  }

  @Post()
  //createReport(@Body() body: {amount:number, source: string}) {
    createReport(@Body() {amount, source}: {amount:number, source: string}, @Param('type') type: string) {
    // console.log({ body })
    const newReport = {
      id: uuid(),
      source, // source: body.source,
      amount, // amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: (type === "income") ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport);
    return 'created' 
  }

  @Put(':id')
  updateReport() {
    return 'updated'
  }

  @Delete(':id')
  deleteReport() {
    return 'delete'
  }
}