import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Else, If } from "@/utils/If";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ALL_MONTHS, MAX_N_YEARS_AFTER_CURRENT, MAX_N_YEARS_BEFORE_CURRENT } from "@/constants";

function getYears(from: number, opts?: { nYearsBefore?: number, nYearsAfter?: number }) {
  const nYears = (opts?.nYearsBefore ?? 0) + (opts?.nYearsAfter ?? 0) + 1;

  return new Array(nYears).fill(0).map(
    (_, i) => from - (opts?.nYearsBefore ?? 0) + i
  );
}

export function AppPage() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const getMonthAndYear = currentMonth === 1;

  const navigate = useNavigate();

  const [months] = useState<{ name: string, value: number }[]>(ALL_MONTHS);
  const [years] = useState<number[]>(getYears(
    currentYear,
    {
      nYearsBefore: MAX_N_YEARS_BEFORE_CURRENT,
      nYearsAfter: MAX_N_YEARS_AFTER_CURRENT
    }
  ));

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);

  function onContinue() {
    navigate(`/configurar/${month}/${year}`);
  }

  return (
    <main className="w-full h-full flex items-center justify-center bg-white">
      <div>
        <Alert>
          <AlertCircleIcon />

          <If condition={getMonthAndYear}>
            <AlertTitle>Selecione o mês e ano</AlertTitle>
            <AlertDescription>Selecione o mês e o ano para a geração do Boletim. Os dias serão criados automaticamente.</AlertDescription>

            <Else>
              <AlertTitle>Selecione o mês</AlertTitle>

              <AlertDescription>Selecione o mês para a geração do Boletim. Os dias serão criados automaticamente.</AlertDescription>
            </Else>
          </If>
        </Alert>

        <div className="flex items-center gap-2 mt-2">
          <Select value={month.toString()} onValueChange={value => value && setMonth(Number(value))}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>

            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value.toString()}>{month.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year.toString()} onValueChange={value => value && setYear(Number(value))}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>

            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="ml-auto cursor-pointer" onClick={onContinue}>Continuar</Button>
        </div>
      </div>
    </main>
  );
}
