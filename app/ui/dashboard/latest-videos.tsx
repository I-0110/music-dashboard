import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { teachers } from '@/app/ui/fonts';
import { LatestVideos } from '@/app/lib/definitions';

export default async function Latest({
  latestVideos,
}: {
  latestVideos: LatestVideos[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${teachers.className} mb-4 text-xl md:text-2xl`}>
        Latest Videos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        {/* <div className="bg-white px-6">
          {latestVideos.map((video, i) => {
            return (
              <div
                key={video.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {video.name}
                    </p>
                </div>
                <div className="flex items-center">
                  <iframe
                    width="420" 
                    height="315"
                    src={video.url}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-inpicture; web-share"
                    allowFullScreen
                  >
                </div>
                <p
                  className={`${teachers.className} truncate text-sm font-medium md:text-base`}
                >
                  {video.month_id}
                  {video.category_id}
                  {video.level_id}
                </p>
              </div>
            );
          })}
        </div> */}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
