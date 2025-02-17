import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";
import { toggleFavoriteMemeAction } from "./actions";

export default function FavoriteButton({
  isFavorited,
  fileId,
  filePath,
  pathToRevalidate,
}: {
  isFavorited: boolean;
  fileId: string;
  filePath: string;
  pathToRevalidate: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form
            action={toggleFavoriteMemeAction.bind(
              null,
              fileId,
              filePath,
              pathToRevalidate
            )}
          >
            <Button type="submit" variant="outline">
              {!isFavorited ? <Heart /> : <HeartFilledIcon />}
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>{!isFavorited ? "Favorite the meme" : "Unfavorite the meme"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
