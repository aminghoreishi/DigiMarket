import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
function Acc() {
  return (
    <div id="accordion-card" className="text-sm" data-accordion="collapse">
      <h2 id="accordion-card-heading-1">
        <button
          type="button"
          className="flex items-center border-zinc-200 rounded-xl justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3 [&[aria-expanded='true']]:rounded-b-none [&[aria-expanded='true']]:shadow-none"
          data-accordion-target="#accordion-card-body-1"
          aria-expanded="true"
          aria-controls="accordion-card-body-1"
        >
          <span>برند ها</span>
          <MdKeyboardArrowDown size={20} />
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        className=" border  rounded-b-xl border-zinc-200 border-t-0 border-default rounded-b-base shadow-xs"
        aria-labelledby="accordion-card-heading-1"
      >
        <div className="p-4 md:p-5">
      
        </div>
      </div>

      <h2 id="accordion-card-heading-1">
        <button
          type="button"
          className="flex items-center border-zinc-200 rounded-xl justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3 [&[aria-expanded='true']]:rounded-b-none [&[aria-expanded='true']]:shadow-none"
          data-accordion-target="#accordion-card-body-1"
          aria-expanded="true"
          aria-controls="accordion-card-body-1"
        >
          <span>What is Flowbite?</span>
          <MdKeyboardArrowDown size={20} />
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        className=" border  rounded-b-xl border-zinc-200 border-t-0 border-default rounded-b-base shadow-xs"
        aria-labelledby="accordion-card-heading-1"
      >
        <div className="p-4 md:p-5">
          <p className="mb-2 text-body">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-body">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-fg-brand hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>
      </div>

      <h2 id="accordion-card-heading-1">
        <button
          type="button"
          className="flex items-center border-zinc-200 rounded-xl justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3 [&[aria-expanded='true']]:rounded-b-none [&[aria-expanded='true']]:shadow-none"
          data-accordion-target="#accordion-card-body-1"
          aria-expanded="true"
          aria-controls="accordion-card-body-1"
        >
          <span>What is Flowbite?</span>
          <MdKeyboardArrowDown size={20} />
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        className=" border  rounded-b-xl border-zinc-200 border-t-0 border-default rounded-b-base shadow-xs"
        aria-labelledby="accordion-card-heading-1"
      >
        <div className="p-4 md:p-5">
          <p className="mb-2 text-body">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-body">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-fg-brand hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Acc;
