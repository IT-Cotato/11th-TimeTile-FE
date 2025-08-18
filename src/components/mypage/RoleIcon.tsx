import { Editor } from "@/assets/images/role/Editor";
import { Linker } from "@/assets/images/role/Linker";
import { Watcher } from "@/assets/images/role/Watcher";
import { UserRole } from "@/model/common/user";

interface RoleIconProps {
  role: UserRole;
  width?: number;
}

export const RoleIcon = ({ role, width = 24 }: RoleIconProps) => {
  switch (role) {
    case "EDITOR":
      return <Editor width={width} />;
    case "WATCHER":
      return <Watcher width={width} />;
    case "LINKER":
      return <Linker width={width} />;
    default:
      return null;
  }
};
