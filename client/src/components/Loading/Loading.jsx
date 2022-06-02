import React from "react";
import imageLoading from "../../assets/ImageLoading2.gif";
import "./LoadingStyles.css";
export function Loading() {
  return (
    <div class="loader-container">
      <img class="loading-img" src={imageLoading} alt="loaging" />
    </div>
  );
}
