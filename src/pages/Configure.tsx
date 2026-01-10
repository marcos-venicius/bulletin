import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_N_YEARS_AFTER_CURRENT, MAX_N_YEARS_BEFORE_CURRENT, type Bulletin } from "@/constants";
import { getMonthString } from "@/utils/get-month-string";
import { Else, If } from "@/utils/If";
import { CircleDashedIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

type ExpectedParams<T = string> = {
  year: T;
  month: T;
}

export function Configure() {
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [combination, setCombination] = useState<ExpectedParams<number> | null>(null);
  const [bulletin, setBulletin] = useState<Bulletin>({
    days: {
      sunday: [],
      wednesday: [],
      saturday: [],
    },
    month: 0,
    year: 0
  });

  const loading = hasError || generating;

  const params = useParams<ExpectedParams>();

  function swapSpecialDay(category: keyof Bulletin['days'], day: number) {
    setBulletin(bulletin => {
      for (let i = 0; i < bulletin.days[category].length; i++) {
        const match = bulletin.days[category][i];

        if (match.day === day && 'special' in match) {
          (bulletin.days[category][i] as { special: boolean }).special = !match.special;

          break;
        }
      }

      return { ...bulletin };
    });
  }

  useEffect(() => {
    const now = new Date();

    let error = false;

    error = error || !params.year;
    error = error || !params.month;

    let month = Number(params.month);
    let year = Number(params.year);

    error = error || Number.isNaN(month);
    error = error || Number.isNaN(year);
    error = error || month < 1;
    error = error || month > 12;
    error = error || year < now.getFullYear() - MAX_N_YEARS_BEFORE_CURRENT;
    error = error || year > now.getFullYear() + MAX_N_YEARS_AFTER_CURRENT;

    if (error) {
      navigate(-1);
    } else {
      setCombination({
        month,
        year
      });
      setHasError(false);
    }
  }, [params]);

  useEffect(() => {
    if (hasError) return;
    if (!combination) return;

    const sundays: number[] = [];
    const wednesdays: number[] = [];
    const saturdays: number[] = [];

    let date = new Date(combination.year, combination.month - 1, 1);

    while (date.getMonth() + 1 === combination.month) {
      const weekDay = date.getDay();

      switch (weekDay) {
        case 0: // Sunday
          sundays.push(date.getDate());
          break;
        case 3: // Wednesday
          wednesdays.push(date.getDate());
          break;
        case 6: // Saturday
          saturdays.push(date.getDate());
          break;
      }

      date.setDate(date.getDate() + 1);
    }

    setBulletin({
      days: {
        sunday: sundays.map(day => ({
          day,
          recepcionist: '',
          preacher: '',
          special: false,
          direction: '',
          singers: ''
        })),
        wednesday: wednesdays.map(day => ({
          day,
          direction: '',
          special: false,
          preacher: '',
          recepcionist: '',
          theme: '',
        })),
        saturday: saturdays.map(day => ({
          day,
          theme: '',
          divineCult: '',
          facilitator: ''
        })),
      },
      month: combination.month,
      year: combination.year
    });

    setGenerating(false);
  }, [hasError, combination])

  if (loading) {
    return (
      <main className="w-full h-full bg-white flex items-center justify-center">
        <CircleDashedIcon className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="w-full h-full bg-white p-2 overflow-y-auto">

      <header className="mx-auto py-5" style={{ width: 'min(900px, 95%)' }}>
        <h2 className="text-2xl font-bold text-zinc-900">{getMonthString(bulletin.month)}/{bulletin.year}</h2>
      </header>

      <div className="mx-auto border border-2 border-slate-200 p-2 rounded-lg" style={{ width: 'min(900px, 95%)' }}>
        <h2 className="text-zinc-900 font-bold">Dias de domingo</h2>
        {bulletin.days.sunday.map(e => (
          <div key={e.day} className="p-2 w-full">
            <div className="flex items-center gap-2">
              <p className="text-lg text-zinc-900"><strong>{String(e.day).padStart(2, '0')}</strong></p>
              <div className="flex items-center cursor-pointer w-fit">
                <Checkbox
                  onCheckedChange={swapSpecialDay.bind(null, 'sunday', e.day)}
                  checked={e.special}
                  id={`sunday-${e.day}-special`}
                  className="border-zinc-900 cursor-pointer"
                />
                <Label className="pl-1 cursor-pointer" htmlFor={`sunday-${e.day}-special`}>culto especial?</Label>
              </div>
            </div>

            <div className="mt-2 flex gap-2 items-top">
              <div>
                <Label htmlFor={`sunday-${e.day}.direction`} className="w-fit">Direção</Label>
                <Input id={`sunday-${e.day}.direction`} className="mt-1" />
              </div>

              <div>
                <Label htmlFor={`sunday-${e.day}.preacher`} className="w-fit">Ministrante</Label>
                <Input id={`sunday-${e.day}.preacher`} className="mt-1" />
              </div>

              <If condition={e.special}>
                <div>
                  <Label htmlFor={`sunday-${e.day}.warn`} className="w-fit text-blue-500">Culto especial</Label>
                  <Input id={`sunday-${e.day}.warn`} className="mt-1 border-blue-500" />
                </div>

                <Else>
                  <div>
                    <Label htmlFor={`sunday-${e.day}.singers`} className="w-fit">Louvores</Label>
                    <Input id={`sunday-${e.day}.singers`} className="mt-1" />
                  </div>
                </Else>
              </If>

              <div>
                <Label htmlFor={`sunday-${e.day}.recepcionist`} className="w-fit">Recepção</Label>
                <Input id={`sunday-${e.day}.recepcionist`} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>


      {/*      quartas      */}

      <div className="mx-auto border border-2 border-slate-200 p-2 rounded-lg mt-5" style={{ width: 'min(900px, 95%)' }}>
        <h2 className="text-zinc-900 font-bold">Dias de quarta</h2>
        {bulletin.days.wednesday.map(e => (
          <div key={e.day} className="p-2 w-full">
            <div className="flex items-center gap-2">
              <p className="text-lg text-zinc-900"><strong>{String(e.day).padStart(2, '0')}</strong></p>
              <div className="flex items-center cursor-pointer w-fit">
                <Checkbox
                  onCheckedChange={swapSpecialDay.bind(null, 'wednesday', e.day)}
                  checked={e.special}
                  id={`wednesday-${e.day}-special`}
                  className="border-zinc-900 cursor-pointer"
                />
                <Label className="pl-1 cursor-pointer" htmlFor={`wednesday-${e.day}-special`}>culto especial?</Label>
              </div>
            </div>

            <div className="mt-2 flex gap-2 items-top">
              <div>
                <Label htmlFor={`wednesday-${e.day}.direction`} className="w-fit">Direção</Label>
                <Input id={`wednesday-${e.day}.direction`} className="mt-1" />
              </div>

              <div>
                <Label htmlFor={`wednesday-${e.day}.preacher`} className="w-fit">Ministrante</Label>
                <Input id={`wednesday-${e.day}.preacher`} className="mt-1" />
              </div>

              <If condition={e.special}>
                <div>
                  <Label htmlFor={`wednesday-${e.day}.warn`} className="w-fit text-blue-500">Culto especial</Label>
                  <Input id={`wednesday-${e.day}.warn`} className="mt-1 border-blue-500" />
                </div>

                <Else>
                  <div>
                    <Label htmlFor={`wednesday-${e.day}.theme`} className="w-fit">Tema</Label>
                    <Input id={`wednesday-${e.day}.theme`} className="mt-1" />
                  </div>
                </Else>
              </If>

              <div>
                <Label htmlFor={`wednesday-${e.day}.recepcionist`} className="w-fit">Recepção</Label>
                <Input id={`wednesday-${e.day}.recepcionist`} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*   sabados    */}

      <div className="mx-auto border border-2 border-slate-200 p-2 rounded-lg mt-5" style={{ width: 'min(900px, 95%)' }}>
        <h2 className="text-zinc-900 font-bold">Dias de sábado</h2>
        {bulletin.days.saturday.map(e => (
          <div key={e.day} className="p-2 w-full">
            <div className="flex items-center gap-2">
              <p className="text-lg text-zinc-900"><strong>{String(e.day).padStart(2, '0')}</strong></p>
            </div>

            <div className="mt-2 flex gap-2 items-top">
              <div>
                <Label htmlFor={`satudary-${e.day}.facilitator`} className="w-fit">Facilitador</Label>
                <Input id={`satudary-${e.day}.facilitator`} className="mt-1" />
              </div>

              <div>
                <Label htmlFor={`saturday-${e.day}.theme`} className="w-fit">Tema</Label>
                <Input id={`saturday-${e.day}.theme`} className="mt-1" />
              </div>

              <div>
                <Label htmlFor={`saturday-${e.day}.divineCult`} className="w-fit">Culto divino</Label>
                <Input id={`saturday-${e.day}.divineCult`} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mx-auto py-5" style={{ width: 'min(900px, 95%)' }}>
        <Button className="block ml-auto">Vizualizar resultado final</Button>
      </footer>
    </main>
  )
}
