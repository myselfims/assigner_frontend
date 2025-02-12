import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoProjectsCard = () => {
    const navigate = useNavigate()
  return (
    <Card className="w-full max-w-md mx-auto text-center p-6">
      <CardHeader>
        <FaFolderOpen className="text-gray-500 text-6xl mx-auto" />
        <CardTitle className="text-lg font-semibold mt-4">
          No Projects Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">You don’t have any projects yet. Create one to get started!</p>
        <Button onClick={()=>navigate('/add-project')} className="w-full">Create Project</Button>
      </CardContent>
    </Card>
  );
};

export default NoProjectsCard;
