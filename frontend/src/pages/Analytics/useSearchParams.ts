import { useNavigate, useSearch } from "@tanstack/react-router";

export function useFilters() {
  const search = useSearch({
    from: "/analytics/$domain",
  });

  const navigate = useNavigate({
    from: "/analytics/$domain",
  });

  const filters = {
    cursor: search.cursor ?? undefined,
    clientId: search.clientId ?? undefined,
  };

  function setFilters(newFilters: Partial<typeof filters>) {
    navigate({
      search: (prev: Record<string, string>) => {
        const next = { ...prev };

        Object.entries(newFilters).forEach(([key, value]) => {
          if (value === undefined || value === "") {
            delete next[key as keyof typeof next];
          } else {
            next[key as keyof typeof next] = value;
          }
        });

        return next;
      },
    });
  }

  return { filters, setFilters };
}
