import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "./Table";

type User = {
  id: number;
  name: string;
  age: number;
  city?: string;
  country?: string;
  email?: string;
  cellphone: string;
  region?: string;
  isActive: boolean;
  role: "admin" | "user" | "manager";
  createdAt: string;
  lastLogin?: string;
  score: number;
};

const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    country: "USA",
    email: "john@email.com",
    cellphone: "+1 555-1234",
    region: "North America",
    isActive: true,
    role: "admin",
    createdAt: "2024-01-10",
    lastLogin: "2026-03-20",
    score: 88,
  },
  {
    id: 2,
    name: "Maria Silva",
    age: 28,
    city: "São Paulo",
    country: "Brazil",
    email: "maria.silva@email.com",
    cellphone: "+55 11 91234-5678",
    region: "South America",
    isActive: true,
    role: "user",
    createdAt: "2024-03-15",
    lastLogin: "2026-03-18",
    score: 72,
  },
  {
    id: 3,
    name: "Lucas Pereira",
    age: 35,
    city: "Curitiba",
    country: "Brazil",
    email: "lucas.p@email.com",
    cellphone: "+55 41 99876-5432",
    region: "South America",
    isActive: false,
    role: "manager",
    createdAt: "2023-11-05",
    lastLogin: "2026-02-10",
    score: 65,
  },
  {
    id: 4,
    name: "Emma Johnson",
    age: 24,
    city: "London",
    country: "UK",
    email: "emma.j@email.com",
    cellphone: "+44 20 7946 0958",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-06-01",
    lastLogin: "2026-03-19",
    score: 91,
  },
  {
    id: 5,
    name: "Liam Smith",
    age: 40,
    city: "Sydney",
    country: "Australia",
    email:
      "liam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.com",
    cellphone: "+61 2 9374 4000",
    region: "Oceania",
    isActive: false,
    role: "manager",
    createdAt: "2023-09-20",
    lastLogin: "2026-01-25",
    score: 54,
  },
  {
    id: 6,
    name: "Sofia Martinez",
    age: 27,
    city: "Madrid",
    country: "Spain",
    email: "sofia.m@email.com",
    cellphone: "+34 91 123 4567",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-02-11",
    lastLogin: "2026-03-21",
    score: 77,
  },
  {
    id: 7,
    name: "Kenji Tanaka",
    age: 32,
    city: "Tokyo",
    country: "Japan",
    email: "kenji.t@email.com",
    cellphone: "+81 3 1234 5678",
    region: "Asia",
    isActive: true,
    role: "admin",
    createdAt: "2023-12-30",
    lastLogin: "2026-03-22",
    score: 95,
  },
  {
    id: 8,
    name: "Amina Hassan",
    age: 29,
    city: "Cairo",
    country: "Egypt",
    email: "amina.h@email.com",
    cellphone: "+20 2 2345 6789",
    region: "Africa",
    isActive: false,
    role: "user",
    createdAt: "2024-04-05",
    lastLogin: "2026-02-28",
    score: 60,
  },
  {
    id: 9,
    name: "Noah Müller",
    age: 38,
    city: "Berlin",
    country: "Germany",
    email: "noah.m@email.com",
    cellphone: "+49 30 123456",
    region: "Europe",
    isActive: true,
    role: "manager",
    createdAt: "2023-10-12",
    lastLogin: "2026-03-17",
    score: 83,
  },
  {
    id: 10,
    name: "Isabella Rossi",
    age: 26,
    city: "Rome",
    country: "Italy",
    email:
      "isabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.com",
    cellphone: "+39 06 1234 5678",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-05-22",
    lastLogin: "2026-03-20",
    score: 79,
  },
  {
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    country: "USA",
    email: "john@email.com",
    cellphone: "+1 555-1234",
    region: "North America",
    isActive: true,
    role: "admin",
    createdAt: "2024-01-10",
    lastLogin: "2026-03-20",
    score: 88,
  },
  {
    id: 2,
    name: "Maria Silva",
    age: 28,
    city: "São Paulo",
    country: "Brazil",
    email: "maria.silva@email.com",
    cellphone: "+55 11 91234-5678",
    region: "South America",
    isActive: true,
    role: "user",
    createdAt: "2024-03-15",
    lastLogin: "2026-03-18",
    score: 72,
  },
  {
    id: 3,
    name: "Lucas Pereira",
    age: 35,
    city: "Curitiba",
    country: "Brazil",
    email: "lucas.p@email.com",
    cellphone: "+55 41 99876-5432",
    region: "South America",
    isActive: false,
    role: "manager",
    createdAt: "2023-11-05",
    lastLogin: "2026-02-10",
    score: 65,
  },
  {
    id: 4,
    name: "Emma Johnson",
    age: 24,
    city: "London",
    country: "UK",
    email: "emma.j@email.com",
    cellphone: "+44 20 7946 0958",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-06-01",
    lastLogin: "2026-03-19",
    score: 91,
  },
  {
    id: 5,
    name: "Liam Smith",
    age: 40,
    city: "Sydney",
    country: "Australia",
    email:
      "liam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.com",
    cellphone: "+61 2 9374 4000",
    region: "Oceania",
    isActive: false,
    role: "manager",
    createdAt: "2023-09-20",
    lastLogin: "2026-01-25",
    score: 54,
  },
  {
    id: 6,
    name: "Sofia Martinez",
    age: 27,
    city: "Madrid",
    country: "Spain",
    email: "sofia.m@email.com",
    cellphone: "+34 91 123 4567",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-02-11",
    lastLogin: "2026-03-21",
    score: 77,
  },
  {
    id: 7,
    name: "Kenji Tanaka",
    age: 32,
    city: "Tokyo",
    country: "Japan",
    email: "kenji.t@email.com",
    cellphone: "+81 3 1234 5678",
    region: "Asia",
    isActive: true,
    role: "admin",
    createdAt: "2023-12-30",
    lastLogin: "2026-03-22",
    score: 95,
  },
  {
    id: 8,
    name: "Amina Hassan",
    age: 29,
    city: "Cairo",
    country: "Egypt",
    email: "amina.h@email.com",
    cellphone: "+20 2 2345 6789",
    region: "Africa",
    isActive: false,
    role: "user",
    createdAt: "2024-04-05",
    lastLogin: "2026-02-28",
    score: 60,
  },
  {
    id: 9,
    name: "Noah Müller",
    age: 38,
    city: "Berlin",
    country: "Germany",
    email: "noah.m@email.com",
    cellphone: "+49 30 123456",
    region: "Europe",
    isActive: true,
    role: "manager",
    createdAt: "2023-10-12",
    lastLogin: "2026-03-17",
    score: 83,
  },
  {
    id: 10,
    name: "Isabella Rossi",
    age: 26,
    city: "Rome",
    country: "Italy",
    email:
      "isabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.com",
    cellphone: "+39 06 1234 5678",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-05-22",
    lastLogin: "2026-03-20",
    score: 79,
  },
  {
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    country: "USA",
    email: "john@email.com",
    cellphone: "+1 555-1234",
    region: "North America",
    isActive: true,
    role: "admin",
    createdAt: "2024-01-10",
    lastLogin: "2026-03-20",
    score: 88,
  },
  {
    id: 2,
    name: "Maria Silva",
    age: 28,
    city: "São Paulo",
    country: "Brazil",
    email: "maria.silva@email.com",
    cellphone: "+55 11 91234-5678",
    region: "South America",
    isActive: true,
    role: "user",
    createdAt: "2024-03-15",
    lastLogin: "2026-03-18",
    score: 72,
  },
  {
    id: 3,
    name: "Lucas Pereira",
    age: 35,
    city: "Curitiba",
    country: "Brazil",
    email: "lucas.p@email.com",
    cellphone: "+55 41 99876-5432",
    region: "South America",
    isActive: false,
    role: "manager",
    createdAt: "2023-11-05",
    lastLogin: "2026-02-10",
    score: 65,
  },
  {
    id: 4,
    name: "Emma Johnson",
    age: 24,
    city: "London",
    country: "UK",
    email: "emma.j@email.com",
    cellphone: "+44 20 7946 0958",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-06-01",
    lastLogin: "2026-03-19",
    score: 91,
  },
  {
    id: 5,
    name: "Liam Smith",
    age: 40,
    city: "Sydney",
    country: "Australia",
    email:
      "liam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.comliam.smith@email.com",
    cellphone: "+61 2 9374 4000",
    region: "Oceania",
    isActive: false,
    role: "manager",
    createdAt: "2023-09-20",
    lastLogin: "2026-01-25",
    score: 54,
  },
  {
    id: 6,
    name: "Sofia Martinez",
    age: 27,
    city: "Madrid",
    country: "Spain",
    email: "sofia.m@email.com",
    cellphone: "+34 91 123 4567",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-02-11",
    lastLogin: "2026-03-21",
    score: 77,
  },
  {
    id: 7,
    name: "Kenji Tanaka",
    age: 32,
    city: "Tokyo",
    country: "Japan",
    email: "kenji.t@email.com",
    cellphone: "+81 3 1234 5678",
    region: "Asia",
    isActive: true,
    role: "admin",
    createdAt: "2023-12-30",
    lastLogin: "2026-03-22",
    score: 95,
  },
  {
    id: 8,
    name: "Amina Hassan",
    age: 29,
    city: "Cairo",
    country: "Egypt",
    email: "amina.h@email.com",
    cellphone: "+20 2 2345 6789",
    region: "Africa",
    isActive: false,
    role: "user",
    createdAt: "2024-04-05",
    lastLogin: "2026-02-28",
    score: 60,
  },
  {
    id: 9,
    name: "Noah Müller",
    age: 38,
    city: "Berlin",
    country: "Germany",
    email: "noah.m@email.com",
    cellphone: "+49 30 123456",
    region: "Europe",
    isActive: true,
    role: "manager",
    createdAt: "2023-10-12",
    lastLogin: "2026-03-17",
    score: 83,
  },
  {
    id: 10,
    name: "Isabella Rossi",
    age: 26,
    city: "Rome",
    country: "Italy",
    email:
      "isabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.comisabella.r@email.com",
    cellphone: "+39 06 1234 5678",
    region: "Europe",
    isActive: true,
    role: "user",
    createdAt: "2024-05-22",
    lastLogin: "2026-03-20",
    score: 79,
  },
];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("city", {
  //   header: "City",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("country", {
  //   header: "Country",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("email", {
  //   header: "Email",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("cellphone", {
  //   header: "Cellphone",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("region", {
  //   header: "Region",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("isActive", {
  //   header: "Active",
  //   cell: (info) => (info.getValue() ? "Yes" : "No"),
  // }),
  // columnHelper.accessor("role", {
  //   header: "Role",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("createdAt", {
  //   header: "Created At",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("lastLogin", {
  //   header: "Last Login",
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("score", {
  //   header: "Score",
  //   cell: (info) => info.getValue(),
  // }),
];

export function UserTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto w-full">
      <Table>
        <thead className="sticky top-0 z-10 bg-surface">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id} variant={"header"}>
              {headerGroup.headers.map((header) => (
                <Table.Head key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id} className="last:border-none">
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  className={[
                    cell.column.id === "age" && "min-w-40 truncate",
                    cell.column.id === "name" && "w-full truncate",
                  ]}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </tbody>

        {/* <tfoot className="bg-red-500 sticky bottom-0">
          <Table.Row className="border-none">
            <Table.Cell>Footer</Table.Cell>
          </Table.Row>
        </tfoot> */}
      </Table>
    </div>
  );
}
