import { QueryStatus, useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import httpClient from "../utils/http-common";
import { IFormula } from "../types/IFormula";

export default function useGetFormulas() {
  const results = useQuery(["formulas"], async () => {
    const res = await httpClient.get<IFormula[]>("/formulas");

    if (res.status != HttpStatusCode.Ok) {
      throw new Error(`Formulas fetch not ok`);
    }

    return res.data;
  });

  return [results?.data ?? [], results.status] as [IFormula[], QueryStatus];
}
