"use client";
import Link from "next/link";
import { motion } from "motion/react";
import UserLogo from "./UserLogo";

function AuthenticatedNav() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="relative flex items-center gap-6"
    >
      <Link href="/dashboard">News</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/trades">Trades</Link>
      <UserLogo />
    </motion.div>
  );
}

export default AuthenticatedNav;
