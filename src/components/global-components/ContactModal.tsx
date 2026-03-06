"use client";

import { MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    phone?: string | null;
    email: string;
  };
}

export default function ContactModal({ open, onOpenChange, user }: ContactModalProps) {
  const isMobile = useIsMobile();

  const waMessage = encodeURIComponent(
    `Halo ${user.name}, saya melihat profil Anda di AlmamaterConnect dan tertarik untuk mengajak kolaborasi di tim saya. Apakah Anda memiliki waktu untuk berdiskusi?`
  );
  
  const waUrl = `https://wa.me/${user.phone}?text=${waMessage}`;
  const mailUrl = `mailto:${user.email}?subject=${encodeURIComponent("AlmamaterConnect - Kolaborasi Kompetisi")}`;

  const content = (
    <div className="flex flex-col gap-4 py-2">
      {user.phone && (
        <Button
          asChild
          size="lg"
          className="h-14 justify-start gap-4 text-base font-bold text-white hover:opacity-90 rounded-xl transition-all shadow-sm"
          style={{ backgroundColor: "#25D366" }}
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6 fill-current" />
            Chat via WhatsApp
          </a>
        </Button>
      )}
      
      <Button
        asChild
        size="lg"
        className="h-14 justify-start gap-4 text-base font-bold bg-slate-800 text-white hover:bg-slate-900 rounded-xl transition-all shadow-sm"
      >
        <a href={mailUrl}>
          <Mail className="h-6 w-6" />
          Send Email
        </a>
      </Button>

      <div className="flex items-start gap-2.5 px-1 mt-2">
        <ShieldCheck className="h-4 w-4 text-[#5A8D39] shrink-0 mt-0.5" />
        <p className="text-[11px] text-muted-foreground leading-snug">
          Informasi kontak ini hanya digunakan untuk keperluan kolaborasi kompetisi melalui <strong>AlmamaterConnect</strong>.
        </p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="rounded-t-[2rem]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-bold">Connect with {user.name}</DrawerTitle>
            <DrawerDescription>Pilih metode yang paling nyaman untuk berdiskusi.</DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-8">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900">Hubungi {user.name}</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm mt-1">
            Pilih metode yang paling nyaman untuk berdiskusi.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}