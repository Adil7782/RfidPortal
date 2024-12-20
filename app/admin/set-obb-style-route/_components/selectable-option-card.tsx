import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SelectableOptionCardProps {
    label: string;
    position: number;
    isSelected: boolean;
}

const SelectableOptionCard = ({
    label,
    position,
    isSelected
}: SelectableOptionCardProps) => {
    return (
        <div
            className={cn(
                "group bg-slate-200 relative overflow-hidden rounded-lg w-full h-28 max-w-[480px] min-w-[180px] cursor-pointer border hover:border-slate-400",
                isSelected && "border-slate-500",
                isSelected && "bg-slate-500 text-white",
                "transition-all duration-200 ease-in-out"
            )}
        >
            <div className='absolute bg-white/50 z-40 size-8 mt-2 ml-2 rounded-md flex justify-center items-center'>
                <Input type='checkbox' checked={isSelected} className='size-4' readOnly />
            </div>
            <div className='relative w-full p-4 h-full flex justify-center items-center'>
                <h1 className='font-medium mr-4'>{label}</h1>
                <p className={cn('absolute bottom-4 right-5 text-7xl font-semibold text-slate-300 group-hover:text-slate-400/60 transition-all duration-200 ease-in-out', isSelected && "text-slate-400/60 group-hover:text-slate-400")}>
                    {position}
                </p>
                {/* <Badge className={cn('absolute top-3 right-3 text-sm bg-slate-600', isSelected && "bg-slate-700")}>{position}</Badge> */}
            </div>
        </div>
    )
}

export default SelectableOptionCard