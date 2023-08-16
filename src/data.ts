export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export const data: Data = {
  report: [
    {
      id: 'fb8a5a76-dad1-40ea-af19-3252f2522038',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: '2f9bdde1-b887-45ed-99d9-08a6aebed278',
      source: 'Sports',
      amount: 4500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: '5a895a77-5f86-4549-a670-e83a476e1cc2',
      source: 'Food',
      amount: 6500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: '04108fdb-7ed8-4e59-ac16-cc8ef1c27f3b',
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
