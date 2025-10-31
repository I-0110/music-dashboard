import { MusicalNoteIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { teachers } from '@/app/ui/fonts';

export default function MusicLogo() {
  return (
    <div
      className={`${teachers.className} flex flex-row items-center leading-none text-white`}
    >
      <PlayCircleIcon className="h-12 w-12" />
      <p className="text-[40px]">Music Time!</p>
      <MusicalNoteIcon className='h-12 w-12 rotate-[-2deg]' />
    </div>
  );
}
