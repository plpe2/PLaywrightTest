// traceApplication.api.ts

import { APIRequestContext } from "@playwright/test";

export async function traceApplication(
  request: APIRequestContext,
  appNo: string,
) {
  const response = await request.post(
    "http://192.168.20.71:1025/Permits/TraceApplications",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        draw: "3",

        "columns[0][data]": "RowNo",
        "columns[0][name]": "",
        "columns[0][searchable]": "false",
        "columns[0][orderable]": "true",
        "columns[0][search][value]": "",
        "columns[0][search][regex]": "false",

        "columns[1][data]": "DateReceived",
        "columns[1][name]": "",
        "columns[1][searchable]": "true",
        "columns[1][orderable]": "true",
        "columns[1][search][value]": "",
        "columns[1][search][regex]": "false",

        "columns[2][data]": "ApplicationNo",
        "columns[2][name]": "",
        "columns[2][searchable]": "true",
        "columns[2][orderable]": "true",
        "columns[2][search][value]": "",
        "columns[2][search][regex]": "false",

        "columns[3][data]": "BuildingName",
        "columns[3][name]": "",
        "columns[3][searchable]": "true",
        "columns[3][orderable]": "true",
        "columns[3][search][value]": "",
        "columns[3][search][regex]": "false",

        "columns[4][data]": "Type",
        "columns[4][name]": "",
        "columns[4][searchable]": "true",
        "columns[4][orderable]": "true",
        "columns[4][search][value]": "",
        "columns[4][search][regex]": "false",

        "columns[5][data]": "ProcessDate",
        "columns[5][name]": "",
        "columns[5][searchable]": "true",
        "columns[5][orderable]": "true",
        "columns[5][search][value]": "",
        "columns[5][search][regex]": "false",

        "columns[6][data]": "CompletedDate",
        "columns[6][name]": "",
        "columns[6][searchable]": "true",
        "columns[6][orderable]": "true",
        "columns[6][search][value]": "",
        "columns[6][search][regex]": "false",

        "columns[7][data]": "IsSelectable",
        "columns[7][name]": "",
        "columns[7][searchable]": "true",
        "columns[7][orderable]": "true",
        "columns[7][search][value]": "",
        "columns[7][search][regex]": "false",

        "order[0][column]": "1",
        "order[0][dir]": "desc",

        start: "0",
        length: "5",

        "search[value]": "",
        "search[regex]": "false",

        agencyID: "3",
        businessName: "",
        appNo,
        date: "",
      },
    },
  );
  let data = await response.json();
  let fetchedName = data.data[0].BuildingName;
  let cleansedData = data.data[0].BuildingName.split("/")[0].trim();
  return cleansedData;
}
