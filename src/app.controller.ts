import { Controller, Get, Post, Put, Delete, Param } from "@nestjs/common"
import { report } from "process"
import { ReportType, data } from 'src/data'

// Class that allows us to create different endpoints
@Controller('report/:type')
export class AppController {

  @Get()
  getAllReports(@Param('type') type: string) {
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
  createReport() {
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