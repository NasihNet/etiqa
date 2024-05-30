

import { User } from '@/Model/User'
import React from 'react'
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


function userform() {
  
    return (
    <div>
        <form>
        <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
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
            <Input className="col-span-3" defaultValue="Jared Palmer" id="name" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="email">
              Email
            </Label>
            <Input className="col-span-3" defaultValue="jared@example.com" id="email" type="email" />
          </div>
          <div className="grid items-start grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="bio">
              Bio
            </Label>
            <Input
              className="col-span-3 min-h-[100px]"
              defaultValue="I'm a software engineer who loves to code."
              id="bio"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
          <div>
            <Button variant="ghost">Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </form>
    </div>
  )
}

export default userform