import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/globalFunctions";
import { useDispatch } from "react-redux";
import {
  addEvent,
  deleteEvent,
  setSelectedDay,
} from "@/store/features/calendarSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteData, fetchData, postData } from "@/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Tooltip from "@/components/Tooltip";
import { Plus, Trash } from "lucide-react";

const ViewDayDetailsModal = ({ date, items, toggleModal }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const createEvent = async () => {
    try {
      const data = {
        title,
        description,
        eventDate: date,
        type: "reminder",
      };
      let res = await postData(`/projects/${projectId}/calendar`, data);
      setAdd(false);
      setEvents([...events, res?.event]);
      dispatch(addEvent(res?.event));
      setTitle("");
      setDescription("");
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    fetchData(`/projects/${projectId}/calendar/${date}`)
      .then((res) => {
        setLoading(false);
        setEvents(res);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [date]);

  const handleDeleteEvent = (eventId) => {
    deleteData(`/projects/${projectId}/calendar/${eventId}`).then((res) => {
      dispatch(deleteEvent({ eventId, eventDate: date }));
      setEvents(events?.filter((e) => e.id !== eventId));
    });
  };

  return (
    <Dialog open={true} onOpenChange={() => dispatch(setSelectedDay(null))}>
      <DialogContent className="max-w-lg rounded-lg p-6 shadow-xl max-h-[80vh]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">
            Events on {formatDate(date)}
          </DialogTitle>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            onClick={() => setAdd(!add)}
          >
            <Plus size={16} />
            Add Event
          </Button>
        </DialogHeader>

        {add ? (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
              className="mb-2 bg-white"
            />
            <Textarea
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description (optional)"
              className="mb-4 bg-white"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={createEvent} className="bg-blue-600">
                Save Event
              </Button>
              <Button onClick={() => setAdd(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : events?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No events found.</p>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2">
                {events?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.description && (
                        <Tooltip
                          className="w-80 text-wrap"
                          position="bottom"
                          content={item?.description}
                        >
                          <p className="text-sm cursor-default text-gray-600 truncate overflow-hidden w-72">
                            {item.description}
                          </p>
                        </Tooltip>
                      )}
                    </div>
                    {item?.entityType !== "task" && (
                      <Button
                        onClick={() => handleDeleteEvent(item?.id)}
                        variant="destructive"
                        size="icon"
                        className="rounded-full p-2"
                      >
                        <Trash size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDayDetailsModal;
