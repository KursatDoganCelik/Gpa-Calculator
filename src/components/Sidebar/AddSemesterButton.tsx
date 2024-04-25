import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Button } from '../ui/button';
import { CgAdd } from 'react-icons/cg';

export default function AddSemesterButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="flex items-center justify-center gap-2 rounded-sm p-2" disabled={disabled} onClick={onClick}>
          <CgAdd size={24} /> Yarıyıl Ekle
        </Button>
      </TooltipTrigger>
      {disabled && (
        <TooltipContent className="border-none bg-[#18181b] text-white">
          <p>Yarıyıl sınırına ulaştınız!</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
