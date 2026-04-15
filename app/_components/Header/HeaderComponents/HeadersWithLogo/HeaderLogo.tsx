import { ModeToggle } from "@/components/ui/Theme";
import { CircleUser } from "lucide-react";

export const HeaderWithLogo = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <img src="./emon-logo.svg" alt="emon-logo" />
        <ModeToggle />
      </div>
      <div>
        <CircleUser />
      </div>
    </div>
  );
};
