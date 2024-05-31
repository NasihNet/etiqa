import { User } from '@/Model/User';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [hobby, setHobby] = useState(user.hobby);
  const [skillSets, setSkillSets] = useState(user.skillSets);

  const handleSave = () => {
    // Here you can handle the save logic, e.g., dispatching a Redux action to update the user

    console.log({ userName, email, phoneNumber });
    onClose();
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input
              className="col-span-3"
              value={userName}
              id="name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="email">
              Email
            </Label>
            <Input
              className="col-span-3"
              value={email}
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="phoneNumber">
              Phone Number
            </Label>
            <Input
              className="col-span-3"
              value={phoneNumber}
              id="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="Hobby">
              Hobby
            </Label>
            <Input
              className="col-span-3"
              value={hobby}
              id="hobby"
              onChange={(e) => setHobby(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="skillSets">
              SkillSet
            </Label>
            <Input
              className="col-span-3"
              value={skillSets}
              id="skillSets"
              onChange={(e) => setSkillSets(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save Changes</Button>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserForm;
