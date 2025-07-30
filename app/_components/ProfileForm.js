"use client";

import Image from "next/image";
import { updateMe } from "../_lib/action";
import FormBtn from "./FormBtn";
export default function ProfileForm({ selectCountry, user }) {
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateMe}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={user.name}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={user.email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {user?.flag && (
            <div className="relative h-5 w-8 ">
              <Image
                fill
                src={user.flag}
                alt="Country flag"
                className="object-contain rounded-sm"
              />
            </div>
          )}
        </div>
        {selectCountry}
      </div>
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={user.nationalId}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <FormBtn />
      </div>
    </form>
  );
}
