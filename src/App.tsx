import IconStar from "./components/Icons/IconStar";
import Accordion from "./components/Accordion/Accordion";

const faqs = [
  {
    id: 0,
    question: "Where is my order?",
    answer: `You can view your order information in the [Order History] section
            of your account. Click here to view your Order History`,
  },
  {
    id: 1,
    question: "Where do you ship to and do you offer international shipping?",
    answer: `At this time, we are no longer shipping internationally. Orders
            placed on UNIQLO.com can only be shipped within the US, as well as
            shipping to military and U.S. territories`,
  },
  {
    id: 2,
    question: "Can I change my shipping address?",
    answer: `At this time, once the order has been placed, we do not have the
            ability to change/modify any details of the order, including the
            address. We also cannot have orders rerouted or held at your local
            Post Office or FedEx location. We sincerely apologize for the
            inconvenience this may cause you. An alternative is to attempt to
            cancel the order. This can ONLY be done within the first 30 minutes
            of an order being placed. Please click here for instructions on how
            to Cancel your order. You will then be able to place a new order
            with the corrected details.`,
  },
];

function App() {
  return (
    <>
      <div className="fixed top-0 h-[320px] w-full bg-no-repeat bg-cover bg-hero-pattern-mobile sm:bg-hero-pattern-desktop"></div>
      <section className="relative top-52 flex flex-col mx-8 sm:mx-auto px-10 min-w-0 bg-white drop-shadow-lg max-w-2xl rounded-xl">
        <header className="flex gap-4 my-10">
          <IconStar className="w-8 h-18" />
          <h1 className="text-4xl lg:text-5xl font-bold text-purple-950">
            FAQs
          </h1>
        </header>
        {faqs.map((f) => (
          <Accordion key={f.id} id={`accordion-${f.id}`}>
            <Accordion.Summary label={f.question} />
            <Accordion.Details>{f.answer}</Accordion.Details>
          </Accordion>
        ))}
      </section>
    </>
  );
}

export default App;
