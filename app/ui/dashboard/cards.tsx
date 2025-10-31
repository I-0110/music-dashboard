import {
  VideoCameraIcon,
  ClockIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { teachers } from '@/app/ui/fonts';

const iconMap = {
  videos: VideoCameraIcon,
  published: PlusCircleIcon,
  draft: ArchiveBoxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Published" value={totalPublishedVideos} type="published" />
      <Card title="Pending" value={totalDraftVideos} type="draft" />
      <Card title="Total Videos" value={numberOfVideos} type="videos" />
       */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'videos' | 'draft' | 'published';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${teachers.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
