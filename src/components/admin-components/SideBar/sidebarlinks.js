// import MELCIcon from "@mui/icons-material/ListAlt";
import DataIcon from "@mui/icons-material/Description";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessIcon from "@mui/icons-material/Business";

const links = [
  {
    title: "Resources",
    role: ["admin"],
    links: [
      {
        name: "Resources",
        path: "Admin",
        icon: <DataIcon />,
      },
    ],
  },

  {
    title: "Users",
    role: ["superadmin"],
    links: [
      {
        name: "Users",
        path: "Users",
        icon: <ManageAccountsIcon />,
      },
    ],
  },

  {
    title: "Logs",
    role: ["superadmin", "admin"],
    links: [
      {
        name: "Logs",
        path: "Logs",
        icon: <BusinessIcon />,
      },
    ],
  },
];

export default links;
