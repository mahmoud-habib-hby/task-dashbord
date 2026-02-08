import { useState } from "react";
import { Text } from "./Text";

export default function Provider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [UserInfo, SetUserInfo] = useState(user || "");
  const [Token, SetToken] = useState(token || "");
  const [NameList, SetNameList] = useState("");

  localStorage.setItem("user", JSON.stringify(UserInfo));
  localStorage.setItem("token", JSON.stringify(Token));
  return (
    <Text.Provider
      value={{ UserInfo, SetToken, SetUserInfo, Token, NameList, SetNameList }}
    >
      {children}
    </Text.Provider>
  );
}
