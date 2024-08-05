import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

const Socials = () => {
  const handleSignin = (provider: string) => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className="w-full">
      <Separator className="mb-4" />

      <div className="flex w-full space-x-3">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleSignin("google")}
        >
          <FcGoogle size={24} />
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleSignin("github")}
        >
          <FaGithub size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Socials;
