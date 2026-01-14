import { Table } from "@/components/table";
import { TableContext } from "@/components/table/provider";
import { getMonthString } from "@/utils/get-month-string";
import { CircleDashedIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import logo from '/assets/logo.png';
import { Button } from "@/components/ui/button";
import { If } from "@/utils/If";
import { useNavigate } from "react-router";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function ConfigurePage() {
  const { loading, bulletin, pendingChanges, clear } = useContext(TableContext);
  const [viewMode, setViewMode] = useState(false);
  const [render, setRender] = useState(1);

  const navigate = useNavigate();

  function onPrint() {
    if (pendingChanges !== 0) return;

    setViewMode(true);

    setTimeout(() => {
      window.print();

      setTimeout(() => {
        setViewMode(false);
      }, 500);
    }, 500);
  }


  function goBack() {
    navigate(-1);
  }

  function onClear() {
    clear();

    setRender(curr => curr + 1);
  }

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
    <main className={viewMode ? "view" : "configure"}>
      <img src={logo} alt="Logo" />

      <div id="banner">
        <p>
          ESCALA DE SERVIÇO DE CULTO - {getMonthString(bulletin.month)} {bulletin.year}
        </p>
      </div>

      <Table
        key={`sunday-${render}`}
        viewMode={viewMode}
        kind="sunday"
        rows={bulletin.days.sunday}
      />

      <Table
        key={`wednesday-${render}`}
        viewMode={viewMode}
        kind="wednesday"
        rows={bulletin.days.wednesday}
      />

      <Table
        key={`saturday-${render}`}
        viewMode={viewMode}
        kind="saturday"
        rows={bulletin.days.saturday}
      />

      <If condition={!viewMode}>
        <footer className="w-full py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" disabled={pendingChanges !== 0} onClick={goBack}>
              Voltar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer" disabled={pendingChanges !== 0}>
                  Limpar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação irá limpar todos os dias.
                    Você terá de preencher todos novamente!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={onClear}>Sim, limpar tudo</AlertDialogAction>
                  <AlertDialogCancel autoFocus>Não</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Button className="cursor-pointer" disabled={pendingChanges !== 0} onClick={onPrint}>
            {pendingChanges !== 0 ? `Aguarde (${pendingChanges})` : 'Imprimir'}
          </Button>
        </footer>
      </If>
    </main>
  );
}
