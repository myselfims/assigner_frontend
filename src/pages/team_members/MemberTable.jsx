import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MemberRow from "./MemberRow";

const MemberTable = ({ roles, filteredMembers }) => {
  return (
    <div className="w-full scrollbar-none rounded-lg border shadow-md overflow-visible">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Assigned tasks</TableHead>
            <TableHead>Last active</TableHead>
            <TableHead>Date added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers?.map((member) => (
            <MemberRow key={member?.id} member={member} roles={roles} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberTable;
