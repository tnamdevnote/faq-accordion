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
      <div className="my-4 w-full border-b-[1px] pb-4 last-of-type:border-b-0">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function Summary({ label }: { label: string }) {
  const { id, isOpen, toggle } = useAccordionContext();

  return (
    <h2 className="transition-colors text-purple-950 hover:text-purple-700  font-bold hover:cursor-pointer mb-4">
      <button
        id={id}
        className="flex justify-between items-center text-left w-full"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={toggle}
      >
        {label}
        <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
      </button>
    </h2>
  );
}

function Details({ children }: { children: React.ReactNode }) {
  const { id, isOpen } = useAccordionContext();
  return (
    <div
      aria-labelledby={id}
      role="region"
      className={`grid overflow-hidden transition-all ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <p className="overflow-hidden">{children}</p>
    </div>
  );
}

Accordion.Summary = Summary;
Accordion.Details = Details;

export default Accordion;
