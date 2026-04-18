"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { Montserrat } from "next/font/google";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface NewsProps {
  label: string;
  desc: string;
  img: string;
  date: string;
  link: string;
}

const News: NewsProps[] = [
  {
    label: "И Монгол академи",
    desc: "2026 ОНЫ ЦЭРГИЙН ШИНЭЧИЛСЭН БҮРТГЭЛ УЛС ОРОН ДАЯАР ЯВАГДАЖ БАЙНА ",
    img: "https://cdn.gov.mn/public/files/e-mongolia/2026-01-12/4bfd13a4-3edd-4035-8d99-77d8c5078557_69980a8f-c1ee-4338-9141-6c82323c5181_605752704_1310770961095230_7274553280980850741_n-1.png",
    date: "2026-01-12 15:44",
    link: "https://e-mongolia.mn/news/n/14a0",
  },

  {
    label: "Онцгой байдлын ерөнхий газар",
    desc: "Таны хариуцлагаас бусдын аюулгүй байдал шалтгаална",
    img: "https://cdn.gov.mn/public/files/nema/2026-01-08/d1252381-573a-4149-b6d5-9da98ab9fc8d_viber_image_2026-01-08_11-22-09-330.jpg",
    date: "2026-01-08 11:36",
    link: "https://e-mongolia.mn/news/n/1434",
  },

  {
    label: "Нийгмийн даатгалын ерөнхий газар",
    desc: "САЙН ДУРААР ДААТГУУЛАГЧ ЭХИЙН ШИМТГЭЛИЙН 50 ХУВИЙГ УЛСЫН ТӨСӨВ БОЛОН ТЭТГЭМЖИЙН ДААТГАЛЫН САНГААС ХАРИУЦАН ТӨЛӨХ ЗААЛТ ХЭВЭЭР МӨРДӨГДӨНӨ",
    img: "https://cdn.gov.mn/public/files/ndaatgal/2026-01-08/7e9fd8e4-fc1f-4889-a2a9-107d537e37b4_viber_image_2026-01-08_09-10-07-635.png",
    date: "2026-01-08 09:31",
    link: "https://e-mongolia.mn/news/n/1426",
  },
];

export const NewsDashboard = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${montserrat.className} px-3 max-w-2xl mx-auto`}>
      <div className="flex justify-between items-center mb-5">
        <div className="flex flex-col gap-1">
          <h4 className="font-extrabold text-xl">Мэдээ мэдээлэл</h4>
          <p className="text-xs tracking-[0.28px] opacity-80">
            Өнөөдрийн хамгийн чухал үйл явдлуудыг эндээс уншаарай
          </p>
        </div>
        <Button
          className={`rounded-full transition-all duration-300 text-xs font-semibold p-4 text-black dark:text-white ${
            theme === "light" ? "bg-[#e6f0ff]" : "bg-[#233552]"
          }`}
        >
          Бүгдийг үзэх
        </Button>
      </div>

      <a href="https://e-mongolia.mn/news/n/3260" className="block group mb-3">
        <div className="relative h-[461px] w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://cdn.gov.mn/public/files/e-mongolia/2026-04-15/e727be88-b033-4793-babf-0a8b27f08fb3_1.jpg"
            alt="News"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-0 inset-x-0 z-20 h-12 bg-black/32 backdrop-blur-xs flex items-center px-5">
            <p className="text-white text-xs font-bold border-l-4 border-red-500 pl-2 leading-none">
              И Монгол академи
            </p>
          </div>

          <div className="absolute bottom-0 inset-x-0 z-20 bg-black/32 backdrop-blur-xs p-3 text-white ">
            <span className="text-[10px] font-medium mb-2 block">
              2026-04-12
            </span>
            <h3 className="text-lg font-bold leading-tight mb-2">
              “365 ЭВДРЭЭГҮЙ ИРЭЭДҮЙГ БҮТЭЭЕ” ҮНДЭСНИЙ АЯН ЭХЭЛЛЭЭ
            </h3>
          </div>
        </div>
      </a>
      <div className="flex flex-col gap-3">
        {News.map((parNew, index) => (
          <a
            href={parNew.link}
            key={index}
            className="border border-[#e6ebf3] rounded-xl p-3 gap-3 flex flex-col lg:flex-row relative overflow-hidden bg-white dark:bg-[#1e2a40] dark:border-[#2a3b55]"
          >
            <img
              src={parNew.img}
              alt={parNew.desc}
              className="relative rounded-[12px] overflow-hidden w-full h-48 h-[152px]! w-full! lg:h-[121px]! lg:w-[121px]! object-cover"
            />
            <div className="flex flex-col gap-3">
              <div className="font-semibold line-clamp-1 tracking-wide! text-[11px] text-[#475872] dark:text-[#c4ccd7]">
                {parNew.label}
              </div>
              <p className="h6-gilroy text-foreground lg:line-clamp-2 tracking-wide! leading-5 max-h-10 overflow-hidden overflow-ellipsis font-semibold">
                {parNew.desc}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5 items-centerp px-3 py-1">
                <ThumbsUp size={15} className="opacity-50" />
                <ThumbsDown size={15} className="opacity-50" />
              </div>
              <div className="opacity-50 text-xs font-semibold">
                {parNew.date}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
