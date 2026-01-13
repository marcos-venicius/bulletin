import { Table } from "@/components/table";
import { TableContext } from "@/components/table/provider";
import { getMonthString } from "@/utils/get-month-string";
import { CircleDashedIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import logo from '/assets/logo.png';

export function ConfigurePage() {
  const { loading, bulletin, pendingChanges } = useContext(TableContext);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingChanges <= 0) return;

      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [pendingChanges]);

  if (loading) {
    return (
      <main className="w-full h-full bg-white flex items-center justify-center">
        <CircleDashedIcon className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="configure">
      <img src={logo} alt="Logo" />

      <div id="banner">
        <p>
          ESCALA DE SERVIÇO DE CULTO - {getMonthString(bulletin.month)} {bulletin.year}
        </p>
      </div>

      <Table
        kind="sunday"
        rows={bulletin.days.sunday}
      />

      <Table
        kind="wednesday"
        rows={bulletin.days.wednesday}
      />

      <Table
        kind="saturday"
        rows={bulletin.days.saturday}
      />
    </main>
  );
}
