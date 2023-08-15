import { Controller, Get, Post, Put, Delete } from "@nestjs/common"

@Controller('')
export class AppController {

  @Get()
  getAllIncomeReports() {
    return []
  }

  @Get(':id')
  getOneIncomeReport() {
    return []
  }

  @Post()
  createIncomeReport() {
    return 'created'
  }

  @Put(':id')
  updateIncomeReport() {
    return 'updated'
  }

  @Delete(':id')
  deleteIncomeReport() {
    return 'delete'
  }
}