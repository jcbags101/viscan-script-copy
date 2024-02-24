/**
 * app/admin/page.jsx
 * 
 * This file defines the DashboardPage component, which represents the staffs' dashboard page for the admin section of the application.
 * It includes functionality for displaying binding requests and managing user interactions.
 */

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/AuthContext";
import logo from "../../assets/logo.png";
import BindingDetails from "../../components/v2/BindingDetails";
import BindingTable from "../../components/v2/BindingTable";

// Sample data for binding requests
const bindings = [
  {
    name: "Myra Dudley",
    message: "The reason I choose you",
    status: "Checked",
    date: "07 April 2021",
    studentNumber: "S10001",
    courseCode: "CS101",
    email: "myra.dudley@example.com",
    title: "Understanding Quantum Computing",
    attachment: "quantum_computing.pdf",
  },
  {
    name: "Myra Dudley",
    message: "The Yeah I choose you",
    status: "Checked",
    date: "07 April 2021",
    studentNumber: "S10002",
    courseCode: "CS102",
    email: "myra.dudley@example.com",
    title: "Exploring Artificial Intelligence",
    attachment: "artificial_intelligence.pdf",
  },
  // ... more objects with unique `studentNumber`, `courseCode`, `email`, `title`, and `attachment`
];

/**
 * DashboardPage component represents the admin dashboard page.
 * It displays binding requests and provides functionality for managing user interactions.
 */
function DashboardPage(props) {
  const { user } = UserAuth(); // Get authentication state from context
  const router = useRouter(); // Next.js router instance
  const [showDetails, setShowDetails] = useState(false); // State for showing binding details modal
  const [selectedBinding, setSelectedBinding] = useState({}); // State for selected binding details

  // Open binding details modal
  const handleOpen = (binding) => {
    setShowDetails(true);
    setSelectedBinding(binding);
  };

  // Close binding details modal
  const handleClose = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    // if (!user) {
    //   router.push("admin/login");
    // }
  }, [user, router]);

  return (
    <div className="flex flex-col px-6 py-5 bg-white min-h-scree">
      <div className="flex flex-col px-6 py-5 bg-white max-md:pl-5">
      <div className="flex gap-5 justify-between items-between">
        <div className="flex">
          <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5818be7a04459f35b2955cff0aa862ebffc156e428161f60b97611671944369b?"
              style={{ width: '100px', height: 'auto' }}
            />
        </div>
        <div className="flex gap-5 justify-between self-end">
          <div className="flex justify-center items-center self-start w-9 h-9 bg-violet-100 rounded-lg aspect-square">
            <div className="flex justify-center items-center px-2 w-full h-9 bg-violet-100 rounded-lg aspect-square">
              <div className="flex overflow-hidden relative flex-col justify-center items-center w-full aspect-square">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3ad38adf33bf466063e09e5a4b565f38c8d4cf76717134f5fee17c397b99a16?"
                  className="object-cover absolute inset-0 size-full"
                />
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden relative flex-col justify-center items-center aspect-[1.72] w-[100px]">
            {/* These will contain user card where their profile image */}
            <img
              loading="lazy"
              srcSet={logo}
              className="object-cover absolute inset-0 size-full"
            />
            {/* and profile settings will show */}
            <img
              loading="lazy"
              srcSet={logo}
              className="w-full aspect-[1.72]"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-end mt-5 text-sm leading-5 text-neutral-500 max-md:mt-10">
              <div className="flex flex-col self-stretch w-full bg-white">
                <div className="mt-8 font-medium leading-[143%] text-neutral-800">
                  Bindings Management
                </div>
                <div className="flex gap-3 justify-between p-3 mt-1.5 text-violet-800 whitespace-nowrap leading-[143%]">
                  <img
                    loading="lazy"
                    src={logo}
                    className="w-6 aspect-square"
                  />
                  <div className="flex-auto my-auto">User</div>
                </div>
                <div className="flex flex-col pl-9 whitespace-nowrap max-md:pl-5">
                  <div className="flex gap-3 justify-between p-3 cursor-pointer">
                    <img
                      loading="lazy"
                      src={logo}
                      className="my-auto aspect-square w-[5px]"
                    />
                    <div className="grow">All</div>
                  </div>
                  <div className="flex gap-3 justify-between p-3 cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
                      className="my-auto aspect-square w-[5px]"
                    />
                    <div className="grow">Pending</div>
                  </div>
                  <div className="flex gap-3 justify-between p-3 cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
                      className="my-auto aspect-square w-[5px]"
                    />
                    <div className="grow">Submitted</div>
                  </div>
                  <div className="flex flex-col justify-center w-full text-violet-800 bg-violet-100 rounded-xl cursor-pointer">
                    <div className="flex gap-3 justify-between p-3">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                        className="my-auto aspect-square w-[5px]"
                      />
                      <div className="grow">Checked</div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-between p-3 cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
                      className="my-auto aspect-square w-[5px]"
                    />
                    <div className="grow">Binding</div>
                  </div>
                  <div className="flex gap-3 justify-between p-3 cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
                      className="my-auto aspect-square w-[5px]"
                    />
                    <div className="grow">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-4 py-5 w-full bg-sky-100 rounded-xl max-md:mt-5 max-md:max-w-full">
              <div className="justify-center items-start py-2 pr-16 pl-4 text-base font-medium bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full">
                Binding Requests
              </div>
              <div className="flex flex-col px-5 pt-5 pb-12 mt-4 bg-white rounded-xl max-md:max-w-full">
                <div className="pb-2.5 mb-4 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <BindingTable
                      toggleShowDetails={handleOpen}
                      bindings={bindings}
                    />
                    {showDetails && (
                      <BindingDetails
                        binding={selectedBinding}
                        onClose={handleClose}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DashboardPage;
