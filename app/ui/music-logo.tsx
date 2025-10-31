import { MusicalNoteIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { teachers } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${teachers.className} flex flex-row items-center leading-none text-white`}
    >
      <PlayCircleIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Music Time!</p>
      <MusicalNoteIcon className='h-12 w-12 rotate-[15deg]' />
    </div>
  );
}
