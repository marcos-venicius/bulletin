import React from "react";

type IfProps = {
  condition: boolean
  children: React.ReactNode
}

export function If({ children, condition }: IfProps) {
  let ifChild: React.ReactElement[] = [];
  let elseChild = null;

  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === Else) {
      elseChild = child;
    } else {
      ifChild.push(child as React.ReactElement);
    }
  });

  return <>{condition ? ifChild : elseChild ?? null}</>;
}

type ElseProps = {
  children: React.ReactNode
}

export function Else({ children }: ElseProps) {
  return <>{children}</>;
}
