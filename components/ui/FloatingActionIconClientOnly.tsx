"use client";

import React, { useEffect, useState } from "react";
import FloatingActionIcon from "./FloatingActionIcon";

const FloatingActionIconClientOnly: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <FloatingActionIcon />;
};

export default FloatingActionIconClientOnly;

