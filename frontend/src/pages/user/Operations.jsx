import React, { useState } from "react";

export default function Operations() {
  const headings = [
    {
      id: 1,
      name: "heading1",
      label: "Comprendre mon opération",
      borderColor: "border-[#F5D23F]",
      url: "/operations",
    },
    {
      id: 2,
      name: "heading2",
      label: "Démarches administratives",
      borderColor: "border-[#47CACF]",
      url: "/administratives",
    },
    {
      id: 3,
      name: "heading3",
      label: "Ma checklist ",
      borderColor: "border-[#8D77F0]",
      url: "/checklist",
    },
  ];

  const [activeHeading, setActiveHeading] = useState(headings[0].name);
  const [content, setContent] = useState(headings[0].label);
  const [activeBorderColor, setActiveBorderColor] = useState(
    headings[0].borderColor
  );

  const handleTabClick = (headingName, headingBorderColor, url) => {
    setActiveHeading(headingName);
    setActiveBorderColor(headingBorderColor);
    const selectedHeading = headings.find(
      (heading) => heading.name === headingName
    );
    if (selectedHeading) {
      setContent(selectedHeading.label);
    }
    window.location.href = url;
  };

  return (
    <main className="min-w-screen relative mb-12 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <ul className="mb-4 grid w-full grid-cols-3 gap-x-2 gap-y-6 lg:gap-10">
        {headings.map((heading) => (
          <li
            className={` cursor-pointer rounded  ${
              activeHeading === heading.name
                ? heading.borderColor
                : "border-2 border-[gray]"
            }`}
            key={heading.id}
          >
            <button
              onClick={() =>
                handleTabClick(heading.name, heading.borderColor, heading.url)
              }
              type="button"
              className={`rounded-xl border-4 p-1 ${
                activeHeading === heading.name
                  ? heading.borderColor
                  : "border-transparent"
              }`}
            >
              <a href={heading.url}>{heading.label}</a>
            </button>
          </li>
        ))}
      </ul>
      <div
        className={`flex flex-col justify-center rounded-xl border-4 p-4 shadow-xl ${activeBorderColor}`}
      >
        {content}
      </div>
    </main>
  );
}
