import React, { useState, useEffect } from "react";

export default function Operations() {
  const headings = [
    {
      id: 1,
      name: "heading1",
      label: "Comprendre mon opération",
      borderColor: "border-yellow-400",
      color: "bg-yellow-400",
      url: "/operations",
    },
    {
      id: 2,
      name: "heading2",
      label: "Finir les démarches administratives",
      borderColor: "border-teal-400",
      color: "bg-teal-400",
      url: "/administratives",
    },
    {
      id: 3,
      name: "heading3",
      label: "Ma checklist avant mon départ pour la clinique",
      borderColor: "border-pink-500",
      color: "bg-pink-500",
      url: "/checklist",
    },
  ];

  const [activeHeading, setActiveHeading] = useState(headings[0].name);
  const [content, setContent] = useState(headings[0].label);
  const [activeBorderColor, setActiveBorderColor] = useState(
    headings[0].borderColor
  );
  const [mobileView, setMobileView] = useState(false);

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

  // Fonction pour détecter la vue mobile
  const handleResize = () => {
    setMobileView(window.innerWidth <= 768);
  };

  // Écouteur d'événement pour détecter les changements de taille de la fenêtre
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Appel initial pour définir l'état mobileView lors du chargement de la page
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let filteredHeadings = headings;
  if (mobileView) {
    filteredHeadings = headings.filter(
      (heading) => heading.name === activeHeading
    );
  }

  return (
    <main className="min-w-screen relative mb-12 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0  lg:py-16 lg:pl-72 lg:pr-12">
      <ul
        className={`mb-4 mt-2 flex justify-between lg:mb-8 ${
          mobileView ? "flex-col" : "h-fit"
        } `}
      >
        {filteredHeadings.map((heading) => (
          <li
            className={`cursor-pointer text-white lg:text-black ${
              mobileView ? "mb-4" : "mr-4"
            } rounded p-4 lg:p-8 ${
              activeHeading === heading.name ? heading.color : " bg-gray-200"
            }`}
            key={heading.id}
          >
            <button
              onClick={() =>
                handleTabClick(heading.name, heading.borderColor, heading.url)
              }
              type="button"
            >
              <a href={heading.url}>{heading.label}</a>
            </button>
          </li>
        ))}
      </ul>
      <div
        className={`flex flex-col justify-center rounded-xl border p-4 shadow-xl ${activeBorderColor} ${
          mobileView ? "mb-4" : ""
        }`}
      >
        {content}
      </div>
    </main>
  );
}
