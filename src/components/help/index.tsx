import { CircleQuestionMarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Kbd, KbdGroup } from "../ui/kbd";

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
        <div className="p-5 space-y-2 h-full">
          <div className="flex items-center justify-between">
            <Kbd>Esc</Kbd>

            <p className="text-sm text-zinc-500">* Remover foco da célula</p>
          </div>

          <div className="flex items-center justify-between">
            <Kbd>Tab</Kbd>

            <p className="text-sm text-zinc-500">Mover foco para célula à direita</p>
          </div>

          <div className="flex items-center justify-between">
            <Kbd>Enter</Kbd>

            <p className="text-sm text-zinc-500">Mover foco para célula de baixo</p>
          </div>

          <div className="flex items-center justify-between">
            <KbdGroup>
              <Kbd>Shift</Kbd>
              <span>+</span>
              <Kbd>Tab</Kbd>
            </KbdGroup>

            <p className="text-sm text-zinc-500">Mover foco para célula à esquerda</p>
          </div>

          <div className="flex items-center justify-between">
            <KbdGroup>
              <Kbd>Shift</Kbd>
              <span>+</span>
              <Kbd>Enter</Kbd>
            </KbdGroup>

            <p className="text-sm text-zinc-500">Mover foco para célula de cima</p>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mb-5"><strong>*</strong> Este atalho se aplica apenas aos campos especiais</p>
      </SheetContent>
    </Sheet>
  );
}
