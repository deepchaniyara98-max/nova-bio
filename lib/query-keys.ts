export const QUERY_KEYS = {
  SITE: "site",
  RESEARCH: "research",
  CAPABILITIES: "capabilities",
  STATS: "stats",
  VISUALIZATION: "visualization",
  CONTACT: "contact",
} as const;

export const getQueryKey = (
  key: string,
  params?: Record<string, string | number>,
) => {
  if (!params) return key;

  let result = key;
  Object.entries(params).forEach(([param, value]) => {
    result = result.replace(`{${param}}`, String(value));
  });

  return result;
};
