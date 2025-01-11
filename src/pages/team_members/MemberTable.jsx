import { AiOutlineMail } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for Remove User action
import Dropdown from "../../components/Dropdown";
import { LuMessagesSquare } from "react-icons/lu";

const MemberTable = ({ filteredMembers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Permissions</th>
            <th className="px-4 py-2 text-left">Assigned Tasks</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers?.map((member) => (
            <tr key={member.id} className="border-b">
              <td className="px-4 py-2">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-col">
                  <h1>{member.name}</h1>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    <AiOutlineMail className="inline-block mr-1" />
                    {member.email}
                  </a>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="">
                  <Dropdown
                    allowMultiple={false}
                    showCount={false}
                    label={"Admin"}
                  />
                </div>
              </td>
              <td className="px-4 py-2">{member.assignedTasksCount}</td>
              <td className="px-4 py-2">
                <div className="flex ">
                  <button className="bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center mr-2">
                    {" "}
                    <LuMessagesSquare className="w-[18px] h-[18px] mr-1" />{" "}
                    Connect
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 flex items-center"
                    onClick={() => handleRemoveUser(member.id)}
                  >
                    <FaTrashAlt className="mr-2" />
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Function to handle the removal of a user (you'll need to implement this logic)
const handleRemoveUser = (id) => {
  console.log(`Removing user with ID: ${id}`);
  // Here you can add logic to remove the user from the project, such as an API call or Redux action.
};

export default MemberTable;
