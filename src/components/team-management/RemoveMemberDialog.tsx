"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserMinus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface RemoveMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  memberName: string;
  roleName: string;
  isSubmitting: boolean;
}

export default function RemoveMemberDialog({
  open,
  onOpenChange,
  onConfirm,
  memberName,
  roleName,
  isSubmitting,
}: RemoveMemberDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-[2rem] border-none p-8 shadow-2xl sm:max-w-[400px]">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <UserMinus className="h-8 w-8" />
          </div>
          <AlertDialogTitle className="text-xl font-black text-slate-900">
            Keluarkan Member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] font-medium leading-relaxed text-slate-500">
            Apakah kamu yakin ingin mengeluarkan <span className="font-bold text-slate-900">{memberName}</span> dari posisi <span className="font-bold text-[#5A8D39]">{roleName}</span>? 
            <br />
            <span className="mt-2 block text-xs italic text-red-400">
              *User akan dikembalikan ke daftar Request.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <AlertDialogCancel asChild>
            <Button
              variant="ghost"
              className="h-12 flex-1 rounded-xl font-bold text-slate-400 hover:text-slate-600"
              disabled={isSubmitting}
            >
              Batal
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isSubmitting}
            className="h-12 flex-1 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSubmitting ? "Memproses..." : "Ya, Keluarkan"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}