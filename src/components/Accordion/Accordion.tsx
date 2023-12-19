import { createContext, useContext, useMemo } from "react";
import useBoolean from "../../hooks/useBoolean";
import IconMinus from "../Icons/IconMinus";
import IconPlus from "../Icons/IconPlus";
type AccordionContextType = {
  id?: string;
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

function Accordion({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const { isOpen, toggle } = useBoolean();

  const memoizedValue = useMemo(
    () => ({
      id,
      isOpen,
      toggle,
    }),
    [id, isOpen, toggle],
  );

  return (
    <AccordionContext.Provider value={memoizedValue}>
      <div id="accordion" className="my-4 w-full">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function Summary({ label }: { label: string }) {
  const { id, isOpen, toggle } = useAccordionContext();

  return (
    <h3 className="transition-colors hover:text-purple-700  font-bold hover:cursor-pointer mb-4">
      <button
        id={id}
        className="flex justify-between items-center text-left w-full"
        aria-expanded={isOpen}
        aria-controls="panel"
        onClick={toggle}
      >
        {label}
        <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
      </button>
    </h3>
  );
}

function Details({ children }: { children: React.ReactNode }) {
  const { id, isOpen } = useAccordionContext();
  return isOpen ? (
    <div aria-labelledby={id} role="region">
      {children}
    </div>
  ) : null;
}

Accordion.Summary = Summary;
Accordion.Details = Details;

export default Accordion;
