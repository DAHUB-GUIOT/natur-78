
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type QuickAccessCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
};

export const QuickAccessCard = ({
  title,
  description,
  icon: Icon,
  bgColor,
  iconColor
}: QuickAccessCardProps) => {
  return (
    <Link to={`/${title.toLowerCase()}`}>
      <Card className="hover:shadow-md transition-all h-full">
        <CardContent className="flex flex-col gap-2 p-5">
          <div className={`${bgColor} p-3 rounded-lg w-fit`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
