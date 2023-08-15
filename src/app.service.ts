import { Injectable } from "@nestjs/common/decorators";
import { NotFoundException } from "@nestjs/common/exceptions";
import { ReportType, data } from "./data";
import { v4 as uuid } from "uuid";

interface Report {
  source: string;
  amount: number;
}

@Injectable()
// Class that stores all business logic
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter(report => report.type === type);
  }

  getOneReport(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id)
  }

  createReport(type: ReportType, {amount, source}: Report) {
    // console.log({ amount, source })
    const newReport = {
      id: uuid(),
      source, // source: body.source,
      amount, // amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report
  ) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id)
    
      if(!reportToUpdate) throw new NotFoundException('Report not found.')
   // const reportIndex = data.report.findIndex((report) => {report.id === reportToUpdate.id}); <= ERROR
      const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

      data.report[reportIndex] = {
        // ellipses grabs all values of that array/object
        ...data.report[reportIndex],
        ...body,
        updated_at: new Date()
      }

      console.log(data.report[reportIndex])
      return data.report[reportIndex]
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if(reportIndex === -1) throw new NotFoundException('report not found')

    data.report.splice(reportIndex, 1);
  }
}