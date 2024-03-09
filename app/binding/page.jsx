"use client";

import CreateBindingModal from "@/components/CreateBindingModal";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CreateBindingePage = () => {
  const { user, isLoading } = UserAuth();
  const router = useRouter();
  const isSignedIn = user !== null;

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/binding/login");
    }
  }, [isSignedIn]);

  return (
    <div>
      <CreateBindingModal isOpen={true} />
    </div>
  );
};

export default CreateBindingePage;
