import React from "react";
import CardWrapper from "./card-wrapper";

const Error = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <p className="text-center text-destructive">
        It looks like there's an error when logging in. Please Try again!
      </p>
    </CardWrapper>
  );
};

export default Error;
