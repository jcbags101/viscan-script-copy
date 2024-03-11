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
import BindingDetails from "@/components/BindingDetails";
import BindingTable from "../../components/BindingTable";
import { addBindingsToFirestore } from "../../utils/addBindings"; // for testing
import { FaUserGraduate, FaBook } from "react-icons/fa";
import SideBar from "@/components/admin/SideBar";

// Sample data for binding requests
const bindings = [
  {
    firstName: "RUEL",
    middleName: "VAN",
    lastName: "DIJK",
    email: "21-1-00143@vsu.edu.ph",
    id: "21-1-00143",
    programCode: "BSCS",
    title:
      "EXPLORING RESU-NET ARCHITECTURE FOR LAND COVER SEMANTIC SEGMENTATION IN BARANGAY HIBUNAWAN, BAYBAY CITY, LEYTE: A TRANSFER LEARNING APPROACH",
    copies: 4,
    pdfLink: "---",
    docxLink: "---",
    idLink: "---",
    status: "Checked",
    date: "7/11/2023",
    remarks: "",
    amount: 1000,
    isPaid: false,
    isClaimed: false,
    ackID: "No. 23-164",
    bindID: "No. 23-185",
    priorityNum: 1,
  },
  {
    // from firebase
    firstName: "Myra", // establish case type
    middleName: "", // allow N/A
    lastName: "Dudley",
    email: "21-1-00123@vsu.edu.ph", // prefilled after login
    id: "21-1-00123", // derive from email?
    programCode: "BSAgri", // premade program codes
    title:
      "Breeding Herd Management Practices of Dairy Buffalo at Philippine Carabao Center in Visayas State University Visca (PCC-VSU), Baybay City, Leyte", // establish case type
    copies: 6,
    pdfLink: "---", // complete path, display file name only
    docxLink: "---",
    idLink: "---",
    status: "Pending", // establish statuses
    date: "7/11/2023", // establish appointment date format; include time?
    remarks: "", // allow null
    amount: 1200, // derive from copies?
    isPaid: false, // derive from bindID?
    isClaimed: false, // derive from status?
    ackID: "No. 23-165", // establish numbering; can be turned to int?
    bindID: "No. 23-186",
    priorityNum: 2,
  },
  {
    // from firebase
    firstName: "Myra", // establish case type
    middleName: "", // allow N/A
    lastName: "Dudley",
    email: "21-1-00123@vsu.edu.ph", // prefilled after login
    id: "21-1-00123", // derive from email?
    programCode: "BSAgri", // premade program codes
    title:
      "Breeding Herd Management Practices of Dairy Buffalo at Philippine Carabao Center in Visayas State University Visca (PCC-VSU), Baybay City, Leyte", // establish case type
    copies: 6,
    pdfLink: "---", // complete path, display file name only
    docxLink: "---",
    idLink: "---",
    status: "Pending", // establish statuses
    date: "7/11/2023", // establish appointment date format; include time?
    remarks: "", // allow null
    amount: 1200, // derive from copies?
    isPaid: false, // derive from bindID?
    isClaimed: false, // derive from status?
    ackID: "No. 23-165", // establish numbering; can be turned to int?
    bindID: "No. 23-186",
    priorityNum: 3,
  },
  {
    // from firebase
    firstName: "Myra", // establish case type
    middleName: "", // allow N/A
    lastName: "Dudley",
    email: "21-1-00123@vsu.edu.ph", // prefilled after login
    id: "21-1-00123", // derive from email?
    programCode: "BSAgri", // premade program codes
    title:
      "Breeding Herd Management Practices of Dairy Buffalo at Philippine Carabao Center in Visayas State University Visca (PCC-VSU), Baybay City, Leyte", // establish case type
    copies: 6,
    pdfLink: "---", // complete path, display file name only
    docxLink: "---",
    idLink: "---",
    status: "Pending", // establish statuses
    date: "7/11/2023", // establish appointment date format; include time?
    remarks: "", // allow null
    amount: 1200, // derive from copies?
    isPaid: false, // derive from bindID?
    isClaimed: false, // derive from status?
    ackID: "No. 23-165", // establish numbering; can be turned to int?
    bindID: "No. 23-186",
    priorityNum: 4,
  },
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
  const [bindings, setBindings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Students"); // State for selected tab in sidebar

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
    if (!user) {
      router.push("admin/login");
    }
  }, [user, router]);

  const addBindings = async () => {
    await addBindingsToFirestore(bindings);
  };

  console.log({ logo });
  return (
    <div className="flex flex-col px-6 py-5 bg-white min-h-scree">
      <div className="flex flex-col px-6 py-5 bg-white max-md:pl-5">
        <div className="flex gap-5 justify-between items-between">
          <div className="flex">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5818be7a04459f35b2955cff0aa862ebffc156e428161f60b97611671944369b?"
              style={{ width: "100px", height: "auto" }}
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
                src={logo.src}
                className="object-cover absolute inset-0 size-full"
              />
              {/* and profile settings will show */}
              <img
                loading="lazy"
                src={logo.src}
                className="w-full aspect-[1.72]"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <SideBar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-4 py-5 w-full bg-sky-100 rounded-xl max-md:mt-5 max-md:max-w-full">
                <div className="justify-center items-start py-2 pr-16 pl-4 text-base font-medium bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full">
                  <button>{selectedTab}</button>{" "}
                  {/* onClick={addBindings} For testing */}
                </div>
                <div className="flex flex-col px-5 pt-5 pb-12 mt-4 bg-white rounded-xl max-md:max-w-full">
                  <div className="pb-2.5 mb-4 max-md:max-w-full">
                    <div className="flex gap-0 max-md:flex-col max-md:gap-0 max-md:">
                      <BindingTable
                        toggleShowDetails={handleOpen}
                        collectionName="bindings"
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
