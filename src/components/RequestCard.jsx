import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomAvatar from "./Avatar";
import { formatDate, getInitials } from "@/globalFunctions";
import { useState } from "react";
import { updateData } from "@/api";

const RequestCard = ({ request }) => {
  const [localRequest, setLocalRequest] = useState(request);
  const { requester } = localRequest;

  const handleClick = (status) => {
    updateData(`/global/requests/${request?.id}`, { status }).then(
      (res) => {
        console.log(res);
        setLocalRequest({...localRequest, status});
      }
    );
  };

  return (
    <Card className="shadow-lg rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {localRequest?.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CustomAvatar
              className="w-10 h-10"
              fallback={getInitials(requester?.name)}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {requester?.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(localRequest?.createdAt)}
              </p>
            </div>
          </div>
          <h1
            className={`text-sm ${
              localRequest?.status === "cancelled"
                ? "line-through text-gray-700"
                : localRequest?.status === "approved"
                ? "line-through text-green-600"
                : localRequest?.status === "rejected"
                ? "line-through text-red-600"
                : "text-gray-700"
            }`}
          >
            {localRequest?.message}
          </h1>

          {localRequest?.status === "pending" ? (
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => handleClick("approved")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleClick("rejected")}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
              >
                Reject
              </Button>
            </div>
          ) : (
            <h1
              className={`text-sm capitalize ${
                localRequest?.status === "cancelled"
                  ? "text-gray-700"
                  : localRequest?.status === "approved"
                  ? "text-green-600"
                  : localRequest?.status === "rejected"
                  ? "text-red-600"
                  : "text-gray-700"
              }`}
            >
              {localRequest?.status}
            </h1>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
