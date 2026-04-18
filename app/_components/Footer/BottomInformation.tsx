import { Montserrat } from "next/font/google";

// Setting up Montserrat font as shown in the previous prompts.
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

// Data structure representing the metrics from the image
const statData = [
  {
    icon: (
      // Population (People)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    value: "3,544,835",
    label: "Хүн амын тоо",
  },
  {
    icon: (
      // Inflation (Chart)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    value: "7.5%",
    label: "Инфляцын түвшин",
  },
  {
    icon: (
      // GDP (Box/Supply)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    value: "89.9 их наяд",
    label: "Дотоодын нийт бүтээгдэхүүн",
  },
  {
    icon: (
      // Unemployment (Briefcase)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.099.279-4.23.42-6.378.42s-4.279-.141-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.215-.252-.085-.479-.215-.673-.38m1.482-8.006A48.067 48.067 0 019 6c1.069-.16 1.837-1.094 1.837-2.175a2.18 2.18 0 014.326 0c.16 1.081.928 2.015 1.997 2.175.758.114 1.516.204 2.274.271m0 0a48.113 48.113 0 01-3.413.387M15 18a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    value: "5.6%",
    label: "Ажилгүйдлийн түвшин",
  },
  {
    icon: (
      // Livestock (Horse)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 12v6M12.75 6.75h4.5a3.375 3.375 0 013.375 3.375v4.5A3.375 3.375 0 0117.25 18h-4.5m0-11.25V4.5a3.375 3.375 0 00-3.375-3.375H6c-1.081 0-2.015.768-2.175 1.837a48.114 48.114 0 00-.387 3.413M3.438 8.706c.16 1.069.928 1.837 1.997 2.175a48.114 48.114 0 012.274.271m1.482 0l-1.872 1.872c-.194.165-.42.295-.673.38A23.978 23.978 0 003 15.75c0 2.648.429 5.195 1.215 7.577.085.252.215.479.38.673M9 6v.006c0 1.113.285 2.16.786 3.07M12.75 12h-1.5a2.18 2.18 0 01-2.175-1.997c-.16-1.081-.928-2.015-1.997-2.175A4.125 4.125 0 0112.75 1.5"
        />
      </svg>
    ),
    value: "58.1 сая",
    label: "Малын тоо",
  },
  {
    icon: (
      // Household (House)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 16.955l-1.5.545"
        />
      </svg>
    ),
    value: "3.0 сая",
    label: "Өрхийн дундаж орлого", // Truncated label from image
  },
  {
    icon: (
      // Cash/Currency (Banknote)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
    value: "2.3 сая",
    label: "Дундаж цалин", // Image label hidden behind floating buttons
  },
  {
    icon: (
      // Workforce (Person with gear/hat)
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    value: "62.3%",
    label: "Ажиллах хүчний оролцоо", // Image label hidden behind floating buttons
  },
];

const floatingButtons = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    ),
    label: "User Alert",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75s-8.25 3.694-8.25 8.25 3.694 8.25 8.25 8.25z"
        />
      </svg>
    ),
    label: "Support",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    label: "Chatbot",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    ),
    label: "Back to top",
  },
];

export const MongolianStatsDashboard = () => {
  return (
    <div className={`relative min-h-screen text-white ${montserrat.className}`}>
      <div className="mx-auto max-w-5xl rounded-lg overflow-hidden">
        <div className="py-6 text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-black dark:text-white">
            Нээлттэй мэдээлэл
          </h1>
        </div>

        <div className="grid grid-cols-2">
          {statData.map((stat, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center gap-2 
                border-t border-b border-[#e7e7e7] py-5 
                text-center dark:border-[#1f293a]
                ${index % 2 === 0 ? "border-r" : "border-l"}
              `}
            >
              <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-background text-black dark:text-white">
                {stat.icon}
              </div>

              <div className="mt-2 font-bold text-black dark:text-white">
                <span className="text-xl tracking-tight">{stat.value}</span>
              </div>

              <div className={`mt-1 w-[150px] text-black dark:text-white`}>
                <p className="text-xs font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
