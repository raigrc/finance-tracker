import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const Socials = () => {
  return (
    <div className="flex w-full space-x-3">
      <Button variant="secondary" className="w-full">
        <FcGoogle size={24} />
      </Button>
      <Button variant="secondary" className="w-full">
        <FaGithub size={24} />
      </Button>
    </div>
  );
};

export default Socials;
