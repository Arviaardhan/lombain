"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";

interface RemoveMemberDialogProps {
    data: {
        teamName: string;
        memberName: string;
    } | null;
    onConfirm: () => void;
    onClose: () => void;
}

export default function RemoveMemberDialog({ data, onConfirm, onClose }: RemoveMemberDialogProps) {
    return (
        <Dialog open={!!data} onOpenChange={(open) => !open && onClose()}>
            {/* Menggunakan sm:max-w-sm dan rounded-2xl untuk kesan modern */}
            <DialogContent className="sm:max-w-sm rounded-[1.5rem] border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900">
                        Remove Member
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-sm mt-2 leading-relaxed">
                        Are you sure you want to remove{" "}
                        <span className="font-semibold text-foreground">
                            {data?.memberName}
                        </span>{" "}
                        from{" "}
                        <span className="font-semibold text-foreground">
                            {data?.teamName}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4 gap-2">
                    {/* Tombol dengan rounded-xl sesuai preferensi kamu */}
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl border-slate-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="rounded-xl gap-2 font-bold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100 transition-all"
                    >
                        <UserMinus className="h-4 w-4" />
                        Remove
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}