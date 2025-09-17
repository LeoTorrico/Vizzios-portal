import { useState, useEffect } from "react";
import { getBranches, createBranch } from "../api/branches";

export function useBranches() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    setLoading(true);
    const data = await getBranches();
    setBranches(data as any[]);
    setLoading(false);
  };

  const addBranch = async (branch: { name: string; description?: string }) => {
    const newBranch = await createBranch(branch);
    setBranches((prev) => [newBranch, ...prev]);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, loading, addBranch };
}
