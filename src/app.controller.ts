import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from "@nestjs/common"
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
    createReport(
      @Body() { amount, source }: { amount:number, source: string }, 
      @Param('type') type: string
    ) {
    // console.log({ amount, source })
    const newReport = {
      id: uuid(),
      source, // source: body.source,
      amount, // amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: (type === "income") ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string, 
    @Param('type') type: string,
    @Body() body: {amount:number, source: string}
    ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id)
    
      if(!reportToUpdate) throw new NotFoundException('Report not found.')

      const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

      data.report[reportIndex] = {
        // ellipses grabs all values of that array/object
        ...data.report[reportIndex],
        ...body
      }

      console.log(data.report[reportIndex])
      return data.report[reportIndex]
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string, @Param('type') type: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    return data.report.splice(reportIndex, 1);
  }
}