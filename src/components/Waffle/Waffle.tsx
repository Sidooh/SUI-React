import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import waffle from '@/assets/images/waffle.svg';

interface WaffleProps {
    links: { avatarText: string; title: string; link: string; className?: string; disabled?: boolean }[];
}

const Waffle = ({ links }: WaffleProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant={'ghost'} className={'rounded-full'}>
                    <img src={waffle} alt="" width={15} height={15} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <ScrollArea>
                    <div className="grid grid-cols-3 gap-y-3">
                        {links.map((l) => (
                            <a
                                key={l.title}
                                href={l.link}
                                className={cn('space-y-2 py-2 rounded-lg', {
                                    'hover:bg-primary/10': !l.disabled,
                                })}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                <Avatar className={'mx-auto'}>
                                    <AvatarFallback className={cn(l.className)}>{l.avatarText}</AvatarFallback>
                                </Avatar>
                                <p
                                    className={cn(`mb-0 font-medium text-truncate text-xs text-center`, {
                                        'text-gray-800': !l.disabled,
                                        'text-gray-400': l.disabled,
                                    })}
                                >
                                    {l.title}
                                </p>
                            </a>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default Waffle;
