export type PermissionLevel =
  | "safe"
  | "confirm"
  | "blocked";


export function checkPermission(
  action: string
): PermissionLevel {

  const safeActions = [
    "system_status",
    "read_file"
  ];


  const confirmActions = [
    "write_file",
    "open_website"
  ];


  if (safeActions.includes(action)) {
    return "safe";
  }


  if (confirmActions.includes(action)) {
    return "confirm";
  }


  return "blocked";
}