import { MusicalNoteIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { teachers } from '@/app/ui/fonts';

export default function MusicLogo() {
  return (
    <div
      className={`${teachers.className} flex flex-row items-center leading-none text-white mb-y-[-16px]`}
    >
      <PlayCircleIcon className="h-15 w-15" />
      <p className="text-2xl">Music Time!</p>
      <MusicalNoteIcon className='h-15 w-15 rotate-[-2deg]' />
    </div>
  );
}
