"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PATHS = [
  { label: "News", path: "/dashboard" },
  { label: "Docs", path: "/docs" },
  { label: "Trades", path: "/trades" },
];

function AuthenticatedNav() {
  const [activePath, setActivePath] = useState("/dashboard");
  const path = usePathname();
  useEffect(() => {
    setActivePath(path.toLowerCase());
  }, [path]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="relative hidden items-center gap-6 md:flex"
    >
      {PATHS.map(p => (
        <Link key={p.label} href={p.path} className="relative">
          {activePath.startsWith(p.path) && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="inxet-x-0 absolute -bottom-0.5 h-0.5 w-full bg-[var(--secondarytext)]"
            />
          )}
          {p.label}
        </Link>
      ))}
    </motion.div>
  );
}

export default AuthenticatedNav;
