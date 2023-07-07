import React, { useState } from "react";

export default function Administratives() {
  const headings = [
    {
      id: 1,
      name: "heading1",
      label: "Comprendre mon opération",
      color: "bg-red-500",
      url: "/operations",
    },
    {
      id: 2,
      name: "heading2",
      label: "Finir les démarches administratives",
      color: "bg-green-500",
      url: "/administratives",
    },
    {
      id: 3,
      name: "heading3",
      label: "Ma checklist avant mon départ pour la clinique",
      color: "bg-blue-500",
      url: "/checklist",
    },
  ];

  const [activeHeading, setActiveHeading] = useState(headings[1].name);
  const [content, setContent] = useState(headings[1].label);
  const [activeColor, setActiveColor] = useState(headings[1].color);

  const handleTabClick = (headingName, headingColor, url) => {
    setActiveHeading(headingName);
    setActiveColor(headingColor);
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
      <ul className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        {headings.map((heading) => (
          <li
            className={`mr-4 cursor-pointer rounded p-4 ${
              activeHeading === heading.name ? heading.color : "bg-gray-200"
            }`}
            key={heading.id}
          >
            <button
              onClick={() =>
                handleTabClick(heading.name, heading.color, heading.url)
              }
              type="button"
            >
              <a href={heading.url}>{heading.label}</a>
            </button>
          </li>
        ))}
      </ul>
      <div
        className={`flex flex-col justify-center border p-4 lg:rounded-xl lg:shadow-xl ${activeColor}`}
      >
        {content}
      </div>
    </div>
  );
}
