import React, { useState } from "react";

export default function Administratives() {
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
      label: "Finir les démarches administratives",
      borderColor: "border-[#47CACF]",
      url: "/administratives",
    },
    {
      id: 3,
      name: "heading3",
      label: "Ma checklist avant mon départ pour la clinique",
      borderColor: "border-[#8D77F0]",
      url: "/checklist",
    },
  ];

  const [activeHeading, setActiveHeading] = useState(headings[1].name);
  const [content, setContent] = useState(headings[1].label);
  const [activeBorderColor, setActiveBorderColor] = useState(
    headings[1].borderColor
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
    <div className="min-w-screen relative mb-12 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <ul className="mb-4 mt-2 flex h-fit w-full  items-center justify-between lg:mb-8">
        {headings.map((heading) => (
          <li
            className={`mr-4 cursor-pointer rounded p-4 ${
              activeHeading === heading.name
                ? heading.borderColor
                : "bg-gray-200"
            }`}
            key={heading.id}
          >
            <button
              onClick={() =>
                handleTabClick(heading.name, heading.borderColor, heading.url)
              }
              type="button"
              className={`rounded-xl border-4 p-4 ${
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
    </div>
  );
}
