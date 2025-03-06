import React from "react";
import ThemeLayout from "./ThemeLayout";
import { themes } from "@/config/themes";

const Themes = ({ selectedTheme, setSelectedTheme }) => (
  <div className="flex flex-col items-start">
    <h1>Themes</h1>
    <div className="flex flex-wrap gap-4">
      {themes.map((theme) => (
        <ThemeLayout
          key={theme.id}
          id={theme.id}
          label={theme.label}
          sidebar={theme.sidebar}
          content={theme.content}
          checked={selectedTheme === theme.id}
          onChange={setSelectedTheme}
        />
      ))}
    </div>
  </div>
);

export default Themes;
