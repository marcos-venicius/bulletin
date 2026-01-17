import { ArrowBigDownIcon, ArrowBigLeftIcon, ArrowBigRightIcon, ArrowBigUpIcon, CircleQuestionMarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Kbd } from "../ui/kbd";

export function Help() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="rounded-full w-10 h-10" variant="outline">
          <CircleQuestionMarkIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Atalhos do teclado
          </SheetTitle>
        </SheetHeader>
        <div className="p-5 space-y-5 h-full">
          <div className="flex items-center justify-between hover:bg-zinc-100 py-1 px-2 transition-all">
            <Kbd>Esc</Kbd>

            <p className="text-sm text-zinc-500">* Remover foco da célula</p>
          </div>

          <div className="flex items-center justify-between hover:bg-zinc-100 py-1 px-2 transition-all">
            <div className="flex flex-col gap-1">
              <Kbd>Tab</Kbd>

              <Kbd>Ctrl + <ArrowBigRightIcon /></Kbd>
            </div>


            <p className="text-sm text-zinc-500">Mover foco para célula à direita</p>
          </div>

          <div className="flex items-center justify-between hover:bg-zinc-100 py-1 px-2 transition-all">
            <div className="flex flex-col gap-1">
              <Kbd>Enter</Kbd>
              <Kbd><ArrowBigDownIcon /></Kbd>
            </div>

            <p className="text-sm text-zinc-500">Mover foco para célula de baixo</p>
          </div>

          <div className="flex items-center justify-between hover:bg-zinc-100 py-1 px-2 transition-all">
            <div className="flex flex-col gap-1">
              <Kbd>Shift + Tab</Kbd>

              <Kbd>Ctrl + <ArrowBigLeftIcon /></Kbd>
            </div>

            <p className="text-sm text-zinc-500">Mover foco para célula à esquerda</p>
          </div>

          <div className="flex items-center justify-between hover:bg-zinc-100 py-1 px-2 transition-all">
            <div className="flex flex-col gap-1">
              <Kbd>Shift + Enter</Kbd>
              <Kbd><ArrowBigUpIcon /></Kbd>
            </div>

            <p className="text-sm text-zinc-500">Mover foco para célula de cima</p>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mb-5"><strong>*</strong> Este atalho se aplica apenas aos campos especiais</p>
      </SheetContent>
    </Sheet>
  );
}
