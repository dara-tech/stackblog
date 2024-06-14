import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

const Switch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <div
      className={`switch ${isDarkMode ? "light" : "dark"} font-extrabold ring-2 rounded-full p-1 ms-2`}
      onClick={toggleColorScheme}
    >
      <div className={`ball ${isDarkMode ? "dark" : "light"} `}></div>
      {isDarkMode ? <IconSun stroke={0.5} /> : <IconMoon stroke={0.5} />}
    </div>
  );
};

export default Switch;
