export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export const data: Data = {
  report: [
    {
      id: 'c190082',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'c190083',
      source: 'Sports',
      amount: 4500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'c190084',
      source: 'Food',
      amount: 6500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'c190085',
      source: 'Youtube',
      amount: 1300,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    }
  ]
}

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[]
}
