'use client';

import { VideoForm } from '@/app/lib/definitions';
import {
  AcademicCapIcon,
  CalendarDateRangeIcon,
  CheckIcon,
  ClockIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditVideoForm({
  video,
  months,
  categories,
  levels,
}: {
  video: VideoForm;
  months: any[];
  categories: any[];
  levels: any[];
}) {

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* List of Months */}
        <div className="mb-4">
          <label htmlFor="month" className="mb-2 block text-sm font-medium">
            Choose month(s)
          </label>
          <div className="relative">
            <datalist
              id="month"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a month
              </option>
              {months.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.name}
                </option>
              ))}
            </datalist>
            <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* List of Categories */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose a category(-ies)
          </label>
          <div className="relative">
            <datalist
              id="category"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </datalist>
            <MusicalNoteIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* List of Grade Levels */}
        <div className="mb-4">
          <label htmlFor="level" className="mb-2 block text-sm font-medium">
            Choose a grade level(s)
          </label>
          <div className="relative">
            <datalist
              id="level"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a grade level(s)
              </option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </datalist>
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Video Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the video status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  defaultChecked={video.status === 'draft'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Draft <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="published"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={video.status === 'published'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="published"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Published <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/videos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Video</Button>
      </div>
    </form>
  );
}
