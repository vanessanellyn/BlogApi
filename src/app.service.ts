import { Injectable } from "@nestjs/common/decorators";
import { NotFoundException } from "@nestjs/common/exceptions";
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from "./dto/report.dto";
import { ReportType, data } from "./data";
import { v4 as uuid } from "uuid";

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
// Class that stores all business logic
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter(report => report.type === type)
      .map(report =>  new ReportResponseDto(report));
  }

  getOneReport(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id)

      if(!report) return;

      return new ReportResponseDto(report);
  }

  createReport(type: ReportType, {amount, source}: Report): ReportResponseDto {
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
    return new ReportResponseDto(newReport);;
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
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

      //console.log(data.report[reportIndex])
      return data.report[reportIndex]
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if(reportIndex === -1) throw new NotFoundException('report not found')

    data.report.splice(reportIndex, 1);
  }
}