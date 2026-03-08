"use client"; // PENTING: Wajib ada karena menggunakan motion

import Link from "next/link"; // Next.js menggunakan Link dari 'next/link'
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="border-t border-border py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Globe className="mx-auto h-12 w-12 text-primary animate-float" />
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Ready to Find Your Team?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join hundreds of students already building winning teams on
            Lombain.id.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Ganti 'to' menjadi 'href' */}
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="gap-2 px-8 font-semibold shadow-lg shadow-primary/25"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
