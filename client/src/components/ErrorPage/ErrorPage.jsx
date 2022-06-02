import React from "react";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export function ErrorPage() {
  return (
    <div>
      <ErrorAlert
        msg="Something went wrong."
        code="404"
      />
    </div>
  );
}
