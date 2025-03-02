import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ViewDayDetailsModal = ({ date, items, toggleModal }) => {
  return (
    <Dialog open={true} onOpenChange={toggleModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Details for {date}</DialogTitle>
        </DialogHeader>
        <div>
          {items.map((item, index) => (
            <div key={index} className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
              </div>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={toggleModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDayDetailsModal;
