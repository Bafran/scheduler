import { Box } from "@material-ui/core";
import React from "react";

interface WrapperProps {
  width?: "skinny" | "normal";
}

export const Wrapper: React.FC<WrapperProps> = ({ children, width }) => {
  let w: string;
  if (width === "skinny") {
    w = "85%";
  } else {
    w = "95%";
  }

  return (
    <Box mt={8} mx="auto" width={w}>
      {children}
    </Box>
  );
};
