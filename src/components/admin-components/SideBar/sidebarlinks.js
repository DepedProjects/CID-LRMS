// import MELCIcon from "@mui/icons-material/ListAlt";
import DataIcon from "@mui/icons-material/Description";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessIcon from "@mui/icons-material/Business";

const links = [
  {
    title: "Resources",
    role: "admin",
    links: [
      {
        name: "Resources",
        path: "resources",
        icon: <DataIcon />,
      },
    ],
  },

  {
    title: "Users",
    role: "admin",
    links: [
      {
        name: "Users",
        path: "users",
        icon: <ManageAccountsIcon />,
      },
    ],
  },

  {
    title: "Logs",
    role: "admin",
    links: [
      {
        name: "Logs",
        path: "logs",
        icon: <BusinessIcon />,
      },
    ],
  },
];

export default links;
