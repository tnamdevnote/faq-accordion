import { createContext, useContext, useMemo } from "react";
import useBoolean from "../../hooks/useBoolean";
import IconMinus from "../Icons/IconMinus";
import IconPlus from "../Icons/IconPlus";
type AccordionContextType = {
  isOpen: boolean;
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("This component must be rendered within Accordion");
  }
  return context;
};

function Accordion({ children }: { children: React.ReactNode }) {
  const { isOpen, toggle } = useBoolean();

  const memoizedValue = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen, toggle],
  );

  return (
    <AccordionContext.Provider value={memoizedValue}>
      <div className="my-4 w-full">{children}</div>
    </AccordionContext.Provider>
  );
}

function Summary({ label }: { label: string }) {
  const { isOpen, toggle } = useAccordionContext();
  return (
    <div
      className="flex hover:cursor-pointer gap-4 mb-4 justify-between items-center"
      onClick={toggle}
    >
      <h2 className="hover:text-purple-700 font-bold">{label}</h2>
      <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
    </div>
  );
}

function Details({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAccordionContext();
  return isOpen ? <p className="py">{children}</p> : null;
}
Accordion.Summary = Summary;
Accordion.Details = Details;

export default Accordion;
